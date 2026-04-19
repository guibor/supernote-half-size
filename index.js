/**
 * @format
 */

import {AppRegistry, Image} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {getScaleRatio, ratioToScale} from './src/ratio';

import {NativeUIUtils, PluginCommAPI, PluginManager} from 'sn-plugin-lib';

AppRegistry.registerComponent(appName, () => App);

PluginManager.init();

const CONFIG_BUTTON_ID = 100;
const RESIZE_SELECTION_BUTTON_ID = 200;
const ICON_URI = Image.resolveAssetSource(require('./assets/icon.png')).uri;
const ALL_LASSO_DATA_TYPES = [0, 1, 2, 3, 4, 5];

let isResizing = false;

PluginManager.registerButton(1, ['NOTE', 'DOC'], {
  id: CONFIG_BUTTON_ID,
  name: 'Half Size',
  icon: ICON_URI,
  showType: 1,
});

PluginManager.registerButton(2, ['NOTE', 'DOC'], {
  id: RESIZE_SELECTION_BUTTON_ID,
  name: 'Half Size',
  icon: ICON_URI,
  editDataTypes: ALL_LASSO_DATA_TYPES,
  showType: 0,
});

PluginManager.registerButtonListener({
  onButtonPress: event => {
    if (event.id !== RESIZE_SELECTION_BUTTON_ID) {
      return;
    }

    resizeCurrentSelection().catch(error => {
      console.error('[half-size] unexpected resize failure', error);
    });
  },
});

async function resizeCurrentSelection() {
  if (isResizing) {
    return;
  }

  isResizing = true;
  try {
    if (typeof PluginCommAPI.resizeLassoRect !== 'function') {
      throw new Error(
        'This plugin requires sn-plugin-lib with PluginCommAPI.resizeLassoRect.',
      );
    }

    const rectRes = await PluginCommAPI.getLassoRect();
    if (!rectRes?.success || !rectRes.result) {
      throw new Error(
        rectRes?.error?.message ?? 'No active lasso selection was found.',
      );
    }

    const ratio = getScaleRatio();
    const nextRect = scaleRectFromCenter(rectRes.result, ratioToScale(ratio));
    const resizeRes = await PluginCommAPI.resizeLassoRect(nextRect);
    if (!resizeRes?.success || resizeRes.result === false) {
      throw new Error(
        resizeRes?.error?.message ?? 'Unable to resize the active selection.',
      );
    }

    const showRes = await PluginCommAPI.setLassoBoxState?.(0);
    if (showRes && !showRes.success) {
      console.warn(
        '[half-size] selection resized but lasso show state failed',
        showRes.error,
      );
    }

    console.log('[half-size] resized lasso selection', {
      ratio,
      before: rectRes.result,
      after: nextRect,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[half-size] resize failed', error);
    await showDialog(`Half Size failed:\n${message}`);
  } finally {
    isResizing = false;
  }
}

function scaleRectFromCenter(rect, scale) {
  const left = Number(rect.left ?? 0);
  const top = Number(rect.top ?? 0);
  const right = Number(rect.right ?? 0);
  const bottom = Number(rect.bottom ?? 0);
  const width = right - left;
  const height = bottom - top;

  if (
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width <= 1 ||
    height <= 1
  ) {
    throw new Error('The active lasso rectangle is too small or invalid.');
  }

  const centerX = left + width / 2;
  const centerY = top + height / 2;
  const nextWidth = Math.max(1, width * scale);
  const nextHeight = Math.max(1, height * scale);

  return {
    left: Math.round(centerX - nextWidth / 2),
    top: Math.round(centerY - nextHeight / 2),
    right: Math.round(centerX + nextWidth / 2),
    bottom: Math.round(centerY + nextHeight / 2),
  };
}

async function showDialog(message) {
  if (typeof NativeUIUtils?.showRattaDialog !== 'function') {
    console.warn('[half-size]', message);
    return;
  }

  await NativeUIUtils.showRattaDialog(message, 'OK', '', false);
}
