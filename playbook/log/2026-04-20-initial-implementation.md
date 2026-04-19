# 2026-04-20 Initial Implementation

## Decision

Implement Half Size as two buttons:

- Toolbar/sidebar button, type `1`, for opening the ratio configuration screen
  in NOTE and DOC.
- Lasso-toolbar button, type `2`, for resizing the active selection in NOTE and
  DOC without opening the plugin UI.

## SDK Path

The resize action uses:

1. `PluginCommAPI.getLassoRect()`
2. Center-based proportional rectangle scaling
3. `PluginCommAPI.resizeLassoRect(nextRect)`
4. `PluginCommAPI.setLassoBoxState(0)` as a best-effort visibility refresh

## Constraint

The ratio is stored in JS module state for the current PluginHost session. It
returns to the default 50% after PluginHost restarts. Avoided native
persistence for the first build because the priority is validating
`resizeLassoRect` behavior on hardware.

## Final Hardening

- Use serialized JSON button names so the SDK receives the shape expected for
  localizable labels.
- Guard the resize listener so it only handles the lasso-toolbar button press.
- Bumped to `0.1.1` / `versionCode=2` before final device upload so the device
  can distinguish the hardened build from the first test package.
