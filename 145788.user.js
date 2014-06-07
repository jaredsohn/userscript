// ==UserScript==
// @name xz
// @author Outku
// @description
// @create
// @lastmodified
// @namespace http://userscripts.org/users/Rabbit
// @updateURL
// @version
// @include
// ==/UserScript==
function cancelError() {return true;}onerror=cancelError;
function enableMouse(){if (event != null){event.returnValue=true;event.cancelBubble=false;}return true;}
function doEnableMouse(obj){obj.onmousedown=enableMouse;obj.onmouseup=enableMouse;obj.onmousemove=enableMouse;obj.oncontextmenu=enableMouse;obj.onselectstart=enableMouse;obj.ondragstart=enableMouse;obj.onbeforecopy=enableMouse;obj.oncopy=enableMouse;obj.onselect=enableMouse;}
function doDocument(doc){doEnableMouse(doc);doEnableMouse(doc.body);var frs=doc.frames;if (frs != null && frs.length>0){for (var i=0; i < frs.length; i++){doDocument(frs[i].document);}}}
doDocument(document);