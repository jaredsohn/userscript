// ==UserScript==
// @name        Kill FB Sponsored Events
// @namespace   FBKADS
// @include     *.facebook.*
// @grant       none
// @version     1
// ==/UserScript==
function K(){var e=document.getElementById("home_stream");if(e){var t=e.childNodes;for(var n=0;n<t.length;n++){if(t[n].className.indexOf("uiStreamStoryAttachmentOnly")!==-1){t[n].style.display="none"}}}}window.addEventListener("load",K());(function(e){XMLHttpRequest.prototype.open=function(t,n,r,i,s){this.addEventListener("readystatechange",function(){K()},0);e.call(this,t,n,r,i,s)}})(XMLHttpRequest.prototype.open)