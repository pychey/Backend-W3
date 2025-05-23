## Q1: What challenges did you face when using the native http module that Express.js helped you solve?

**Key Challenges Solved by Express:**

- **Complex Route Handling**: Native HTTP requires manual URL parsing and switch/if-else statements for routing
- **Manual Data Parsing**: Form data must be manually collected from chunks and parsed
- **Repetitive Headers**: Each response needs explicit `writeHead()` calls for status codes and headers
- **No Middleware Support**: Cross-cutting concerns like logging and authentication require manual implementation
- **Error Handling**: No built-in error handling mechanism

## Q2: How does Express simplify route handling compared to the native HTTP server?

**Express Simplifications:**

- **Declarative Routes**: Clean API with `app.get()`, `app.post()` instead of switch statements
- **Method-Specific Routing**: Automatic HTTP method handling without manual checks
- **Built-in Response Helpers**: Methods like `res.send()`, `res.json()` eliminate boilerplate
- **Route Parameters**: Support for dynamic routes like `/users/:id`
- **Automatic Status Codes**: Default 200 status, easy to change with `res.status()`

## Q3: What does middleware mean in Express, and how would you replicate similar behavior using the native module?

**Middleware in Express:**
Functions that execute during the request-response cycle with access to `req`, `res`, and `next()`. They can:
- Execute code before/after route handlers
- Modify request/response objects
- End the request-response cycle
- Chain multiple functions together

**Express Middleware Example:**
```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
```

**Native HTTP Replication:**
You'd need to manually create a middleware system:
```javascript
const middlewares = [];

function use(middleware) {
  middlewares.push(middleware);
}

function handleRequest(req, res) {
  let index = 0;
  function next() {
    const middleware = middlewares[index++];
    if (middleware) middleware(req, res, next);
  }
  next();
}
```