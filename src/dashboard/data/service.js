export function fetchPosts() {
  return fetch('https://jsonplaceholder.typicode.com/posts').then(response =>
    response.json(),
  );
}

export function fetchTodos() {
  return fetch('https://jsonplaceholder.typicode.com/todos').then(response =>
    response.json(),
  );
}
