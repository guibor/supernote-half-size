# Reddit Announcement Draft

Subreddit: `r/Supernote_dev`

Title:

```text
Half Size: a tiny Supernote plugin for proportional lasso resizing
```

Body:

```markdown
Hi everyone,

I made a small Supernote plugin called **Half Size**:

https://github.com/guibor/supernote-half-size

It does one thing: after you lasso-select content, tap **Half Size** in the lasso toolbar and the active selection is resized proportionally around its center. The default ratio is 50%, and there is also a toolbar/sidebar configuration screen for changing the ratio before you use it.

I have tested the `v0.1.1` build on my Supernote and it is working well for the basic lasso-resize flow.

Why I built it:

- Sometimes pasted snippets, diagrams, or handwritten groups are just too large.
- Drag-resizing a selection manually is possible, but not very exact.
- The newer `sn-plugin-lib` exposes `PluginCommAPI.resizeLassoRect(rect)`, which makes proportional selection resizing simple enough for a tiny focused plugin.

What it does:

- NOTE and DOC toolbar/sidebar button for configuring the ratio.
- NOTE and DOC lasso toolbar button for applying the resize.
- Defaults to 50%, with presets for 25%, 50%, 75%, 100%, and 125%, plus +/- 5% controls.
- Uses the active lasso rectangle and scales it from the center.

What it does *not* do:

- It does not create a lasso selection for you.
- It does not resize across multiple pages.
- It does not persist the ratio after PluginHost restarts yet; it returns to 50%.
- It does not have an element-by-element fallback yet; this build intentionally tests the native `resizeLassoRect` path.

The implementation is intentionally small so other plugin developers can inspect it or adapt the pattern. The core flow is:

1. `PluginCommAPI.getLassoRect()`
2. Calculate a center-preserving rectangle at the configured ratio.
3. `PluginCommAPI.resizeLassoRect(nextRect)`
4. Best-effort `PluginCommAPI.setLassoBoxState(0)` to keep the resized selection visible.

I would still be interested in feedback on how `resizeLassoRect` behaves with mixed selections, especially in DOC and with selections containing images or text boxes.
```
