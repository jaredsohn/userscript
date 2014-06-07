// Link title user script
// version 0.02 Beta
// Richard H. Tingstad
//
// Prompts for a URL, then uses it to get the title of the page and writes 
// <a href="url" title="title">title</a> into comment field.
// Activate by pressing Ctrl+Shift+N
// Can be used on many sites, not just wordpress.com. Add when needed.
//
// ==UserScript==
// @name           Link title
// @namespace      http://drop.by
// @description    Inserts a link into comment field with title fetched from link url.
// @include        http://*.wordpress.com/*
// ==/UserScript==
(function () {
var isCtrl = false;
var isShift = false;
var c = document.getElementById('comment');
c.addEventListener('keyup', globalKeyUp, 'true');
c.addEventListener('keydown', globalKeyDown, 'true');
function globalKeyDown(e){
	if(e.keyCode == 17) isCtrl = true;
	else if (e.keyCode == 16) isShift = true;
}
function globalKeyUp(e) {
if(e.keyCode == 16) {
	isShift = false;
	return;
}
if(e.keyCode == 17) {
	isCtrl = false;
	return;
}
if (!isCtrl || !isShift || e.keyCode != 78) { // Ctrl + Shift + N
	return;
}
var s = prompt('URL to get title from:');
if (s == null || s == '') return;
//Now that we have the url we can get the title:
if(s.indexOf('://') < 0){
 s = 'http://' + s;
}
GM_xmlhttpRequest({
  method:'GET',
  url:s,
  headers:{
    'User-Agent':'Mozilla/5.0 (compatible) Greasemonkey',
    'Accept':'application/atom+xml,application/xml,text/xml'
  },
  onload:function(response) {
    var resp = response.status;
    if (response.status == 200){
     resp = response.responseText;
     var lower = resp.toLowerCase();
     resp = resp.substring(lower.indexOf('<title>')+7,lower.indexOf('</title>'));
    }
    c.value += '<a href="'+s+'" title="'+resp+'">'+resp+'</a>';
  }
});
}
}
)();