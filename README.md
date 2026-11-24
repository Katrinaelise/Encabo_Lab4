# CvSU Mini Store – Lab 4: Live Search and Filter

React (Vite) mini product catalog with a debounced search, category filter, price sorting,
a result counter, an empty state, and a dynamic browser tab title.

## Guide Questions

**1. Why two states, `searchText` and `debouncedSearch`, instead of one?**
`searchText` must update on every keystroke so the input stays responsive and shows exactly what the user typed.
`debouncedSearch` only updates after the user pauses for 300 ms, and it is the value used for filtering.
With one state, the list would be re-filtered on every keystroke; with two, typing stays instant while filtering waits for the pause.

**2. What would happen without a cleanup function in the debounce effect?**
Every keystroke would start a new `setTimeout` without cancelling the earlier ones. Each timer would still fire,
so `debouncedSearch` would be updated once per keystroke (just delayed by 300 ms), and the list would flicker through
old values. That defeats the purpose of debouncing. The cleanup (`clearTimeout`) cancels the previous timer, so only the
final pause in typing triggers an update.

**3. Purpose of the dependency array**
It tells React which values the effect depends on, so the effect re-runs only when one of them changes.
- `[]` (empty): the effect runs only once, after the first render.
- Left out completely: the effect runs after every render, which can cause unnecessary work or even infinite loops if the effect sets state.

**4. Why avoid sorting the original `products` array directly?**
`.sort()` mutates the array in place. Mutating the original data breaks React's rule that data should not be changed directly,
can cause bugs (the "Default" order would be lost forever once sorted), and can lead to unexpected behaviour elsewhere in the app.
Sorting a copy (`[...products]`) keeps the original intact so "Default" and "Clear Filters" always work.

**5. Store the filtered list in state, or calculate it during render?**
Calculate it during render. The filtered list is derived from `debouncedSearch`, `category`, and `sortOrder`, so storing it
would duplicate data and require extra code (and effects) to keep it in sync, which invites bugs where the list and the filters disagree.
Calculating it each render means it is always correct and the code stays simpler.
