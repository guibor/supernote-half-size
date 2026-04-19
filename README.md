# Supernote Half Size

Half Size is a small Supernote plugin that resizes the active lasso selection
proportionally. The default ratio is 50%, hence the name.

It uses the current `sn-plugin-lib` `PluginCommAPI.resizeLassoRect(rect)` API.
That API requires an existing lasso context, so this plugin only acts on an
active selection.

## What It Does

- Adds a `Half Size` configuration button to the NOTE and DOC toolbar/sidebar.
- Adds a `Half Size` action button to the NOTE and DOC lasso toolbar.
- Reads the active lasso rectangle with `PluginCommAPI.getLassoRect()`.
- Scales that rectangle from its center using the configured ratio.
- Calls `PluginCommAPI.resizeLassoRect(nextRect)` to resize the selected
  content proportionally.

## What It Does Not Do

- It does not create a selection for you; draw/select with lasso first.
- It does not resize across pages.
- It does not persist ratio changes across PluginHost restarts yet.

## Build

```sh
npm install
npm run typecheck
npm run build:plugin
```

The package is written to:

```text
build/outputs/supernote_half_size.snplg
```

Copy the `.snplg` file to `MyStyle/` on the Supernote, then install it from
Settings -> Apps -> Plugins.

## Implementation Notes

The core path is in `index.js`:

```js
const rect = await PluginCommAPI.getLassoRect();
const nextRect = scaleRectFromCenter(rect.result, ratioToScale(getScaleRatio()));
await PluginCommAPI.resizeLassoRect(nextRect);
```

Supernote SDK details are tracked in `playbook/ENGINEERING.md`.
