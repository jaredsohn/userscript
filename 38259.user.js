// MovieOnTop user script
// version 0.3 BETA!
// 2008-12-18
// ==UserScript==
// @name          	MovieOnTop
// @description	Reddit userscript. Movies are no longer shown between the articles list when you click 'watch' but are placed on top of it. Movie box is now draggable.
// @include       	http://www.reddit.com/*
// @include       	http://*.reddit.com/*
// @include       	http://reddit.com/*
// ==/UserScript==

var head, style, div, script;

head = document.getElementsByTagName('head')[0];

//add CSS for the main movie box DIV
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '#escher{display:none;position:fixed;left:300px;top:100px;background-color:#CEE3F8;border:5px solid #CEE3F8;}';
head.appendChild(style);

//add main movie box DIV plus its innerHTML (flash movie object html is added later by rewritten reddit function view_embeded_media)
div = document.createElement('DIV');
div.id = 'escher';
div.innerHTML = '<table style="width:100%;cursor:move;" onmousemove="javascript:escherMouseMove(event);return false;" onmousedown="javascript:escherMouseDown(event);return false;"><tr><td style="float:left;"><img alt="videos" src="http://static.reddit.com/reddit.com.header.png" width="90px" height="30px"/></td><td style="cursor:default;background-color:#EFF7FF;color:#369;font-weight:bold;text-align:right;float:right;" onclick="javascript:show_media(null)">CLOSE</td></tr></table></div><div style="color:black;">loading...</div>';
document.body.appendChild(div);

//add rewritten reddit function view_embeded_media plus code that makes moviebox draggable
script = document.createElement('script');
script.type = "text/javascript";
script.innerHTML = 'function show_media(media_link){var e=document.getElementById("escher");if(media_link==null){e.style.display="none";e.childNodes[1].innerHTML="<P>Loading...</P>";}else{e.childNodes[1].innerHTML=$.unsafe(media_link);e.style.display="block";}}var escherGrip = false;var escherOldMouseX = 0;var escherOldMouseY = 0;function escherMouseDown(event){escherOldMouseX = event.pageX?event.pageX:event.clientX + document.body.scrollLeft;escherOldMouseY = event.pageY?event.pageY:event.clientY + document.body.scrollTop;escherGrip=true;}function escherMouseMove(event){var moviebox=null,dMX=0,dMY=0,newMouseX=0,newMouseY=0;var newleft=0,newtop=0;if(escherGrip){newMouseX = event.pageX?event.pageX:event.clientX + document.body.scrollLeft;newMouseY = event.pageY?event.pageY:event.clientY + document.body.scrollTop;dMX = newMouseX - escherOldMouseX;dMY = newMouseY - escherOldMouseY;escherOldMouseX = newMouseX;escherOldMouseY = newMouseY;moviebox = document.getElementById("escher");newleft = moviebox.offsetLeft + dMX;newtop = moviebox.offsetTop + dMY;moviebox.style.left = ""+newleft+"px";moviebox.style.top = ""+newtop+"px";}}';
head.appendChild(script);
document.body.setAttribute("onmouseup","escherGrip=false;return false;");
document.body.setAttribute("onmousemove","escherMouseMove(event);return false;");