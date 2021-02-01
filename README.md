# jedisearch

Using a public Star Wars API, assemble a simple React project that allows for users to search for characters and the planets they’re from.

Requirements:

Implement a search box that will query the Star Wars API (https://swapi.dev/), and allow the user to enter a search query and see the results underneath. The app should then return a list of characters that match that query.

1. Implement a search box: The user can type into a search box. The search should be automatically executed as the user types (i.e. do not implement a Search button).
While the new results are loading, any previous results should continue to be shown, in addition to a “Loading” text displayed beneath the search box. Include basic error handling

2. Get the search results: The user can type into a search box. The search should be automatically executed as the user types (i.e. do not implement a Search button).
While the new results are loading, any previous results should continue to be shown, in addition to a “Loading” text displayed beneath the search box.

3. Track and show the total number of requests: Track and display the total number of requests to the API, since the page was first loaded/rendered, that were used to yield the result.

4. Cache and normalize the results: Track and display the total number of requests to the API, since the page was first loaded/rendered, that were used to yield the result.
 In addition to caching the search results, please also normalize the cache by each character.
 
5. Auto-focus the search box: When the page mounts, the search box should be focused so that the user can start typing immediately.
