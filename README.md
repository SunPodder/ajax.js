# Ajax.js

A **XMLHTTPRequest** wraper for the browser. Works with both, promises and callback function.

## Load Ajax.js with script tag
```html
<script src="https://sunpodder.github.io/ajax.js/dist/ajax.min.js" ></script>
```

## GET Request
```javascript
//An Ajax object is now available in the window
Ajax.get(
  "https://google.com",
  response => document.write(response)
)
```

#POST Request
```javascript
Ajax.post(
  "https://yourpostapi.com/api",
  /*
    pass your request parameters as an object
  */
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
  /*
    pass your request parameters as an object
  */
  {
    name: "Ajax",
    post: true,
    get: false
  })
.then(data => document.write(data))
```

**NOTE:** Ajax.js automatically parses your response if it's a valid *JSON* or else it will just return it as plain text.
