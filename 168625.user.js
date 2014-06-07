// ==UserScript==
// @name        Tascachat
// @author      darkarrow
// @description Tasca
// @version     1.0
// @grant       none
// @include     *uni114.ogame.com.pt*
// ==/UserScript==
var div=document.createElement("div");
div.id="chatdiv";
div.style.paddingTop="500";

var iframe = document.createElement("iframe");
iframe.id = "chat_iframe";
iframe.src = "http://www.yourshoutbox.com/shoutbox/start.php?key=410254447";
iframe.height = 500;
iframe.width = 650;
iframe.noResize = false;
div.appendChild(iframe);

document.body.appendChild(div);