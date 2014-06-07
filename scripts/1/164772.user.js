// ==UserScript==
// @name		    MPGH Full Thread Previewer
// @namespace 		psychotic/fullthreadprev
// @description 	Able to see the full original post while browsing the forum.
// @grant           GM_addStyle
// @include  		*/showthread.php*
// @version  		1.0.0
// ==/UserScript==

function getPage(e){if(window.XMLHttpRequest){xmlhttp=new XMLHttpRequest}else{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")}xmlhttp.open("GET",e,false);xmlhttp.send();var t=document.implementation.createHTMLDocument("MPGH Thread");t.documentElement.innerHTML=xmlhttp.responseText;return t}function loadPreview(e){var t=getPage(tidElements[e].href);var n=document.createElement("div");if(!t.body.getElementsByClassName("postbody")[0]){n.innerHTML=t.body.querySelectorAll('div[id^="postbody"]')[0].innerHTML}else{n.innerHTML=t.body.getElementsByClassName("postbody")[0].innerHTML}n.style.border="2px solid #4e3c66";n.style.margin="5px";n.style.padding="6px";n.style.boxShadow="0px 0px 5px 4px #1E1E1E";tidParents[e].parentNode.insertBefore(n,tidParents[e].nextSibling)}var tidElements=document.body.querySelectorAll('a[id^=".title.threadtitle"]');tidParents=new Array;for(var i=0;i<tidElements.length;i++){tidParents[i]=tidElements[i].parentNode;var newSpan=document.createElement("span");newSpan.innerHTML="▼";newSpan.style.color="#82209b";newSpan.style.fontSize="16px";newSpan.style.marginLeft="7px";newSpan.style.cursor="pointer";newSpan.id=i;tidParents[i].appendChild(newSpan);tidParents[i].addEventListener("click",function(e){ele=e.srcElement;loadPreview(e.target.id);ele.parentNode.removeChild(ele)},false)}









