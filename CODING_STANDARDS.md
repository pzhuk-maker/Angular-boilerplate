# Angular Coding Standards

These standards align with the official Angular Style Guide and should be used for new code in this repo.

## Goals
- Keep features cohesive and focused on a single responsibility
- Prefer clarity over cleverness; keep templates simple and typed code strict
- Favor composition (components/services) over inheritance and utility blobs

## Project layout
- Organize code by feature under `src/app`, keeping shared items in clearly named folders such as `shared/`
- Keep root config files (`app.config.ts`, `app.routes.ts`) minimal; push feature concerns into feature folders
- Co-locate component `.ts`, `.html`, and `.scss` files; avoid large multi-purpose files

## Naming
- Use kebab-case file names with Angular suffixes: `feature-name.component.ts`, `.service.ts`, `.directive.ts`, `.pipe.ts`, `.guard.ts`, `.resolver.ts`
- Classes/interfaces/types use PascalCase; selectors are kebab-case and prefixed with `app-` (or the chosen project prefix)
- Observable variables end with `$`; signal variables end with `Signal`

## Components & templates
- Generate components with Angular CLI; prefer standalone components with explicit `imports` and `providers`
- Default change detection to `ChangeDetectionStrategy.OnPush` unless you have a reason not to
- Keep components lean: inputs/outputs for data flow, delegate logic to services; avoid overusing `any`
- Use typed `@Input()` and `@Output()` with clear names; avoid two-way binding unless it simplifies a form use case
- Prefer `async` pipe for Observables; when manual subscription is necessary, clean up with `takeUntilDestroyed()`
- Use `trackBy` with `*ngFor` for lists; move complex expressions from templates into the component class
- Avoid directly mutating input objects; emit new references to keep change detection predictable

## Services & data
- Provide services with `providedIn: 'root'` (or the smallest feature scope needed); keep them single-purpose
- Use `HttpClient` with typed responses; centralize HTTP error handling and retry logic
- Avoid shared mutable state; expose readonly Observables or signals for consumers

## Routing
- Use feature-based routing with lazy loading (`loadComponent`/`loadChildren`) for non-trivial features
- Keep route configuration arrays `const` and co-located with the feature they serve
- Guard navigation with dedicated guards/resolvers instead of ad-hoc logic inside components

## RxJS & signals
- Prefer higher-level operators (`switchMap`, `combineLatest`, `map`) to transform streams; handle errors with `catchError`
- Keep subscriptions short-lived and scoped; favor `firstValueFrom` only for one-off imperative needs
- Use signals for local state that drives templates; derive/combine signals instead of imperatively mutating multiple fields

## Styles
- Use component-scoped styles; avoid global styles except for design tokens and resets
- Prefer `:host`/`::ng-deep` sparingly; avoid deep selectors that leak styles between features
- Keep utility classes consistent; avoid inline styles except for dynamic values

## Testing
- Cover components and services with unit tests using `TestBed` and Angular testing utilities
- Test DOM interactions via harnesses or `fixture.debugElement` queries instead of brittle CSS selectors when possible
- Mock HTTP with `provideHttpClientTesting()`/`HttpTestingController`; avoid hitting real services in unit tests

## Accessibility & UX
- Provide accessible names/roles for interactive controls; wire up keyboard interactions and focus management
- Use Angular forms with validation messages that announce errors; prefer semantic HTML elements

## Tooling & formatting
- Follow the repo's Prettier and EditorConfig settings; keep imports ordered and remove unused symbols
- Use Angular CLI schematics for new files to keep code consistent with the framework defaults

## Documentation
- Update README or feature-level `README.md` files when behavior, APIs, or public contracts change
