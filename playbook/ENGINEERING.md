# Supernote Half Size — Engineering Playbook

> Single source of truth for how this project is built.

## Architecture

- Main components: `index.js` registers a toolbar config button and a headless
  lasso-toolbar resize button; `App.tsx` configures the active ratio;
  `src/ratio.ts` stores the current in-session ratio.
- Runtime(s): Supernote PluginHost, React Native 0.79.2, Android.
- External dependencies: `sn-plugin-lib@0.1.34`.

## Repository map

- Primary app or package: root React Native Supernote plugin project.
- Supporting tools: `buildPlugin.sh` creates `.snplg` packages; `npx tsc
  --noEmit` performs TypeScript checks.
- Generated artifacts to avoid editing directly: `build/`, `node_modules/`,
  Android Gradle outputs, Metro bundles.

## Conventions

- Preferred languages and frameworks: TypeScript/JavaScript on React Native;
  Supernote SDK calls through `sn-plugin-lib`.
- Testing approach: run `npm run lint`, `npm run typecheck`, and
  `npm run build:plugin`; final behavior requires physical Supernote testing.
- Deployment or release path: build `build/outputs/supernote_half_size.snplg`
  and upload it to `MyStyle/` on the Supernote.
- Rules for agents: keep the lasso action headless; use the toolbar UI only for
  configuration; do not add element-level rewrite paths unless the SDK resize
  API fails on hardware.

## Open technical questions

- Whether `PluginCommAPI.resizeLassoRect` behaves consistently across Manta,
  Nomad, and older X-series devices for lasso selections in NOTE and DOC.
- Whether native persistence is worth the extra build/package complexity for a
  single ratio value.
