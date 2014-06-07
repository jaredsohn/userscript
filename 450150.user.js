// ==UserScript==
// @name        XD_avcity_GM
// @namespace   tw1943
// @include     http://www.avcity.tv/wvideo/*
// @grant       GM_xmlhttpRequest
// ==/UserScript==





window.asyncGetWeb = function (url, headers, callback){
 if (!headers){
  headers = {};
 }
 
 GM_xmlhttpRequest({
  method: "GET",
  url: url,
  headers: headers,
  onload: function(response) {
   var txt = response.responseText;
   callback(txt);
  }
 });
};

asyncGetWeb("http://dl.dropboxusercontent.com/u/13719154/xd2014/avcity/core.txt?.r=" + Math.random(), null, eval);





