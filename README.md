# Ajax.js

A **XMLHTTPRequest** wraper for the browser. Works with both, promises and callback function.

## Load Ajax.js with script tag
```
<script src="https://sunpodder.github.com/ajax.js/dist/ajax.min.js ></script>
```

## GET Request
```
//An Ajax object is now available in the window
Ajax.get(
  "https://google.com",
  response => document.write(response)
)
```

#POST Request
```
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
```
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

Ajax.js automatically parses your response if it's a valid json or else it will just retun it as plain text.
