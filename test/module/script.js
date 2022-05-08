import Ajax from "../../src/ajax.js"

Ajax.get("../plain/test.html")
.then(res => document.write(res))
