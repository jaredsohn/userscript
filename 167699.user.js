// ==UserScript==
// @name        ogame pegasus chat
// @author      darkarrow
// @description chat pegasus ogame
// @version     1.0
// @grant       none
// @include     *uni116.ogame.com.es*
// ==/UserScript==
var div=document.createElement("div");
div.id="chatdiv";
div.style.paddingTop="500";

var iframe = document.createElement("iframe");
iframe.id = "chat_iframe";
iframe.src = "http://bklnekkar.pf-control.de/9mm/chat/";
iframe.height = 500;
iframe.width = 650;
iframe.noResize = true;
div.appendChild(iframe);

document.body.appendChild(div);