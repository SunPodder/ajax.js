class Ajax{

  constructor(){
    throw Error("Failed to create instance of a static class. (Ajax)")
  }

  static _returnFunction(xhttp){
    if (xhttp.readyState == 4 && xhttp.status == 200){
      let res = xhttp.responseText;
      try{ res = JSON.parse(res); }catch(e){}
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
    let keys = Object.keys(data);
    keys.forEach(key => {
      xhttp.setRequestHeader(key, data[key]);
    });
  }
  
  static _makeQueryString(obj){
    let keys = Object.keys(obj);
    let query = "";
    keys.forEach(key => {
      if(keys.indexOf(key) == (keys.length - 1)){
        query += `${key}=${data.queries[key]}`;
      }else {
        query += `${key}=${data.queries[key]}&`;
      }
    });
    return query
  }
  
  static _makePostQuery(data){
    /*
    * if type is json
    * use JSON.stringify
    * else pass as raw string
    * default is formdata
    */
    let query;
    if(data.type != "json"){
      query = new FormData();
      let q = data.queries ? data.queries : data;
      let keys = Object.keys(q);
      keys.forEach(key => {
        query.append(key, q[key]);
      });
    }else if(data.type == "json"){
      query = JSON.stringify(data.queries);
    }else {
      query = this._makeQueryString(data.queries);
    }
    return query
  }
  
  /*
  * @string url
  * @object data (queries, headers)
  * @function cb
  */
  static get(url){
  
    let cb, data;
    let args = [...arguments];
    
    args.forEach(arg => {
      if(typeof(arg) == "function") cb = arg;
      else data = arg;
    });
    
    //if data and data.queries available
    //make and add query string
    if((data ? data.queries : 0)) url += "?" + this._makeQueryString(data.queries);
    url = encodeURI(url);
    
    if(cb){
      let xhttp = new XMLHttpRequest();
      
      xhttp.onreadystatechange = () => {
        let res = this._returnFunction(xhttp);
        if(res) return cb(res)
      };
      
      xhttp.open("GET", url, true);
      if((data ? data.headers : 0)) this._setHeaders(xhttp, data.headers);
      xhttp.send();
      
    }else {
      return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = () => {
          let res = this._returnFunction(xhttp);
          if (res) resolve(res);
        };
        
        xhttp.open("GET", url, true);
        if((data ? data.headers : 0)) this._setHeaders(xhttp, data.headers);
        xhttp.send();
      })
    }
  }
  
  
  static post(url, data, cb){
  
    if(cb){
      let xhttp = new XMLHttpRequest();
      
      xhttp.onreadystatechange = () => {
        let res = this._returnFunction(xhttp);
        if(res) return cb(res)
      };
      
      let query = this._makePostQuery(data);
      
      xhttp.open("POST", url, true);
      
      if((data ? data.headers : 0)) this._setHeaders(xhttp, data.headers);
      if (data.type == "json") this._setHeaders(xhttp, {"Content-Type": "application/json"});
      
      xhttp.send(query);
    }else {
      //else return a promise
      return new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = () => {
          let res = this._returnFunction(xhttp);
          if (res) resolve(res);
        };
        
        let query = this._makePostQuery(data);

        xhttp.open("POST", url, true);
        
        if((data ? data.headers : 0)) this._setHeaders(xhttp, data.headers);
        if (data.type == "json") this._setHeaders(xhttp, {"Content-Type": "application/json"});

        xhttp.send(query);
      })
    }
  }
}

window.Ajax = Ajax;
