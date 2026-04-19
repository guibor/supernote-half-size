import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {PluginManager} from 'sn-plugin-lib';
import {
  DEFAULT_RATIO,
  MAX_RATIO,
  MIN_RATIO,
  getScaleRatio,
  setScaleRatio,
} from './src/ratio';

const PRESET_RATIOS = [25, 50, 75, 100, 125];

function App(): React.JSX.Element {
  const [ratio, setRatio] = useState(getScaleRatio());

  const applyRatio = (nextRatio: number) => {
    setRatio(setScaleRatio(nextRatio));
  };

  const handleClose = () => {
    PluginManager.closePluginView();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f4e8" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.kicker}>SELECTION SCALE</Text>
          <Text style={styles.title}>Half Size</Text>
          <Text style={styles.body}>
            Lasso-select content in NOTE or DOC, then tap the Half Size lasso
            button. The active lasso selection is resized proportionally around
            its center.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Current ratio</Text>
          <Text style={styles.ratio}>{ratio}%</Text>
          <Text style={styles.muted}>
            Default is {DEFAULT_RATIO}%. Changes apply to this PluginHost
            session; after a restart the plugin returns to the default.
          </Text>
        </View>

        <View style={styles.stepperRow}>
          <Pressable
            accessibilityRole="button"
            style={styles.stepButton}
            onPress={() => applyRatio(ratio - 5)}>
            <Text style={styles.stepText}>-5</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            style={styles.stepButton}
            onPress={() => applyRatio(ratio + 5)}>
            <Text style={styles.stepText}>+5</Text>
          </Pressable>
        </View>

        <View style={styles.presets}>
          {PRESET_RATIOS.map(preset => {
            const selected = preset === ratio;
            return (
              <Pressable
                accessibilityRole="button"
                key={preset}
                style={[styles.preset, selected && styles.presetSelected]}
                onPress={() => applyRatio(preset)}>
                <Text
                  style={[
                    styles.presetText,
                    selected && styles.presetTextSelected,
                  ]}>
                  {preset}%
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.footer}>
          Allowed range: {MIN_RATIO}% to {MAX_RATIO}%. Use the lasso toolbar
          button for the actual resize action; this screen only configures the
          ratio.
        </Text>

        <Pressable
          accessibilityRole="button"
          style={styles.closeButton}
          onPress={handleClose}>
          <Text style={styles.closeText}>Close</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f4e8',
  },
  content: {
    flexGrow: 1,
    padding: 26,
  },
  header: {
    marginTop: 18,
    marginBottom: 22,
  },
  kicker: {
    color: '#6f6758',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.8,
    marginBottom: 8,
  },
  title: {
    color: '#111111',
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 12,
  },
  body: {
    color: '#28241d',
    fontSize: 16,
    lineHeight: 23,
  },
  card: {
    backgroundColor: '#fffdf7',
    borderColor: '#d8cfbd',
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    marginBottom: 18,
  },
  cardLabel: {
    color: '#6f6758',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  ratio: {
    color: '#111111',
    fontSize: 56,
    fontWeight: '900',
    marginVertical: 4,
  },
  muted: {
    color: '#514a3f',
    fontSize: 14,
    lineHeight: 20,
  },
  stepperRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  stepButton: {
    alignItems: 'center',
    backgroundColor: '#111111',
    borderRadius: 18,
    flex: 1,
    paddingVertical: 16,
  },
  stepText: {
    color: '#fffdf7',
    fontSize: 20,
    fontWeight: '800',
  },
  presets: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 18,
  },
  preset: {
    borderColor: '#111111',
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  presetSelected: {
    backgroundColor: '#111111',
  },
  presetText: {
    color: '#111111',
    fontSize: 15,
    fontWeight: '800',
  },
  presetTextSelected: {
    color: '#fffdf7',
  },
  footer: {
    color: '#514a3f',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 22,
  },
  closeButton: {
    alignItems: 'center',
    borderColor: '#111111',
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 14,
  },
  closeText: {
    color: '#111111',
    fontSize: 16,
    fontWeight: '800',
  },
});

export default App;
