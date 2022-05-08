class Ajax{

  constructor(){
    throw Error("Failed initiate Ajax. It's a static class!")
  }

  static _returnFunction(xhttp){
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
  
  static _setHeaders(xhttp, data){
    let keys = Object.keys(data)
    keys.forEach(key => {
      xhttp.setRequestHeader(key, data[key])
    })
  }
  
  static _makeQueryString(obj){
    let keys = Object.keys(obj)
    let query = ""
    keys.forEach(key => {
      if(keys.indexOf(key) == (keys.length - 1)){
        query += `${key}=${data.queries[key]}`
      }else{
        query += `${key}=${data.queries[key]}&`
      }
    })
    return query
  }
  
  static _makePostQuery(data){
    //if data.type is undefined
    //use FormData
    //else if type is json
    //use JSON.stringify
    //else pass as raw string with custom headers
    let query
    if(!data.type || (((data.type != "json") && data.type) && data.headers)){
      query = new FormData()
      let q = data.queries ? data.queries : data
      let keys = Object.keys(q)
      keys.forEach(key => {
        query.append(key, q[key])
      })
    }else if(data.type == "json"){
      query = JSON.stringify(data.queries)
    }else{
      query = this._makeQueryString(data.queries)
    }
    return query
  }
  
  /*
  * @string url
  * @object args2
  * @function args3 
  */
  static get(url){
  
    let cb, data
    
    //if 2nd param
    //set it to a variable according to its type
    if(arguments.length == 2){
      if(typeof(arguments[1]) == "function") cb = arguments[1]
      else data = arguments[1]
    }
    
    //if length is 3
    //2nd is data object
    //3rd is callback
    if(arguments.length == 3){
      data = arguments[1]
      cb = arguments[2]
    }
    
    //if data and data.queries available
    //make and add query string
    if((data ? data.queries : 0)) url += "?" + this._makeQueryString(data.queries)
    url = encodeURI(url)
    
    if(cb){
      let xhttp = new XMLHttpRequest()
      
      xhttp.onreadystatechange = () => {
        let res = this._returnFunction(xhttp)
        if(res) return cb(res)
      }
      
      xhttp.open("GET", url, true)
      if((data ? data.headers : 0)) this._setHeaders(xhttp, data.headers)
      xhttp.send()
      
    }else{
      return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest()
        
        xhttp.onreadystatechange = () => {
          let res = this._returnFunction(xhttp)
          if (res) resolve(res)
        }
        
        xhttp.open("GET", url, true)
        //if data and data.headers available
        //set headers
        if((data ? data.headers : 0)) this._setHeaders(xhttp, data.headers)
        xhttp.send()
      })
    }
  }
  
  
  static post(url, data, cb){
  
    if(cb){
      let xhttp = new XMLHttpRequest()
      
      xhttp.onreadystatechange = () => {
        let res = this._returnFunction(xhttp)
        if(res) return cb(res)
      }
      
      let query = this._makePostQuery(data)
      
      xhttp.open("POST", url, true)
      
      if((data ? data.headers : 0)) this._setHeaders(xhttp, data.headers)
      if (data.type == "json") this._setHeaders(xhttp, {"Content-Type": "application/json"})
      
      xhttp.send(query)
    }else{
      //else return a promise
      return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest()
        
        xhttp.onreadystatechange = () => {
          let res = this._returnFunction(xhttp)
          if (res) resolve(res)
        }
        
        let query = this._makePostQuery(data)

        xhttp.open("POST", url, true)
        
        if((data ? data.headers : 0)) this._setHeaders(xhttp, data.headers)
        if (data.type == "json") this._setHeaders(xhttp, {"Content-Type": "application/json"})

        xhttp.send(query)
      })
    }
  }
}

export default Ajax