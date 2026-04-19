# Supernote Half Size — Project Playbook

> Single source of truth for what this project should do and for whom.

## Purpose

- Problem this project solves: Supernote users sometimes need to shrink or
  enlarge selected handwritten or document content proportionally without
  manually dragging resize handles.
- Who it serves: Supernote users working with diagrams, pasted snippets,
  handwritten notes, or DOC annotations that need quick proportional scaling.
- Desired outcome: after a lasso selection is active, one lasso-toolbar tap
  resizes that selection to the configured ratio, defaulting to 50%.

## Scope

- In scope: NOTE and DOC lasso-selection resizing using
  `PluginCommAPI.resizeLassoRect`; configurable ratio screen; clean
  installable `.snplg` package; public-friendly README and playbook.
- Out of scope: creating selections automatically, cross-page resizing,
  arbitrary non-proportional transforms, element deletion, export, or sync.
- Success criteria: lasso-select content, tap `Half Size` in the lasso toolbar,
  and the selected content scales proportionally around its center.

## Milestones

- Near term: validate lasso resize behavior on-device with the current
  Supernote preview build.
- Next: decide whether the ratio setting should gain native persistence.
- Later: add a release artifact and short demo instructions after device
  validation.

## Open questions

- Does `resizeLassoRect` behave consistently for mixed selections containing
  strokes, text boxes, links, images, titles, and geometry?
- Does DOC expose all desired lasso selection types through the same resize
  path as NOTE?
