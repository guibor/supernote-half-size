# Half Size design

`index.js` registers the configuration and lasso actions. `App.tsx` edits the
persistent ratio, while `src/ratio.ts` normalizes and stores it.
`resizeCurrentSelection()` checks file-write permission, reads the active
rectangle, scales it around its center, updates the lasso, and guards against
parallel presses. `scaleRectFromCenter()` performs the geometry validation;
`ensurePermissions()` owns current SDK permission checks and requests.
