(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class Ajax{

  _returnFunction(xhttp){
    if (xhttp.readyState == 4 && xhttp.status == 200){
      let res = xhttp.responseText
      try{ res = JSON.parse(res) }catch(e){}
      return res
    }else if(xhttp.readyState == 4 && xhttp.status != 200 && xhttp.status != 0){
      return ({
        "response": this.responseText,
        "error": `The server returned a ${this.status} error status`,
        "code": this.status
      })
    }
  }
  
  get(url, cb){
    
    if(cb){
      let xhttp = new XMLHttpRequest()
      
      xhttp.onreadystatechange = () => {
        let res = this._returnFunction(xhttp)
        if(res) return cb(res)
      }
      
      xhttp.open("GET", url, true)
      xhttp.send()
    }else{
      return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest()
        
        xhttp.onreadystatechange = () => {
          let res = this._returnFunction(xhttp)
          if (res) resolve(res)
        }
        
        xhttp.open("GET", url, true)
        xhttp.send()
      })
    }
  }
  
  post(url, data, cb){
    
    //if callback available, callback
    if(cb){
      let xhttp = new XMLHttpRequest()
      
      xhttp.onreadystatechange = () => {
        let res = this._returnFunction(xhttp)
        if(res) return cb(res)
      }
      
      let form = new FormData()
      let keys = Object.keys(data)
      
      keys.forEach(key => {
      form.append(key, data[key])
      })
      
      xhttp.open("POST", url, true)
      xhttp.send(form)
    }else{
      //else return a promise
      return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest()
        
        xhttp.onreadystatechange = () => {
          let res = this._returnFunction(xhttp)
          if (res) resolve(res)
        }
        
        let form = new FormData()
        let keys = Object.keys(data)
        
        keys.forEach(key => {
        form.append(key, data[key])
        })
        
        xhttp.open("POST", url, true)
        xhttp.send(form)
      })
    }
  }
}

module.exports = (new Ajax())

},{}],2:[function(require,module,exports){
window.Ajax = require("./ajax.js")

},{"./ajax.js":1}]},{},[2]);
