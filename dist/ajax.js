(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class Ajax{
  get(url, cb){
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200){
        let res = this.responseText
        try{ res = JSON.parse(res) }catch(e){}
        return cb(res)
      }
    }
    xhttp.open("GET", url, true)
    xhttp.send()
  }
  
  post(url, data, cb){
    let xhttp = new XMLHttpRequest()
    
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200){
        let res = this.responseText
        try{res = JSON.parse(res)}catch(e){}
        return cb(res)
      }
    }
    
    let form = new FormData()
    let keys = Object.keys(data)
    
    keys.forEach(key => {
      form.append(key, data[key])
    })
    
    
    xhttp.open("POST", url, true)
    xhttp.send(form)
  }
}

module.exports = Ajax
},{}],2:[function(require,module,exports){
const ajax = require("./ajax.js")
  
window.Ajax = new ajax()
},{"./ajax.js":1}]},{},[2]);
