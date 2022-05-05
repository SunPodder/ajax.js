import Ajax from "../../src/ajax.js"

Ajax.get("https://google.com")
.then(res => document.write(res))
