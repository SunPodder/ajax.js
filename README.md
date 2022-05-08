# Ajax.js

A **XMLHTTPRequest** wraper for the browser. Works with both, promises and callback function.

## Load Ajax.js with script tag
```html
<script src="https://sunpodder.github.com/ajax.js/dist/ajax.min.js" ></script>
```

## Or use ES6 import
```javascript
import Ajax from "@sunpodder/ajax"
```

## GET Request
```javascript
//An Ajax object is now available in the window
Ajax.get(
  "https://google.com",
  response => document.write(response)
)
```

## POST Request
```javascript
Ajax.post(
  "https://yourpostapi.com/api",
  //pass your request parameters as an object
  {
    name: "Ajax",
    post: true,
    get: false
  },
  data => document.write(data)
)
```

## Using promises
```javascript
//Just ignore the callback function and use a promise instead

//GET Request
Ajax.get("https://google.com")
.then(data => document.write(data)

//POST Request
Ajax.post(
  "https://yourpostapi.com/api",
  //pass your request parameters as an object
  {
    name: "Ajax",
    post: true,
    get: false
  })
.then(...)
```

## You can also set custom headers and data types to meet your needs.

**Ajax.js** automatically detects if you have passed additional headers or type or just your query object, it works according to it.

Just slightly modify the data object with properties `queries`, `headers` and `type`. If you don't want to use these just avoid these as above.

```javascript
Ajax.post(
  "https://yourpostapi.com",
  {
    queries: {
      name: "Sun",
      age: 17
    },
    headers: {
      JWT: "just a random string"
    },
    type: "json"
  }
).then(...)
```

For **GET** requests
```javascript
Ajax.get(
  "https://google.com",
  //you can now pass an data object here
  //same the post requrests
  //you can also pass queries here instead of hardcode the url
   {
    queries: {
      name: "Sun",
      age: 17
    },
    headers: {
      JWT: "just a random string"
    }
  }
).then(...)
```

**NOTE:** Ajax.js automatically parses your response if it's a valid *JSON* or else it will just return it as plain text.
