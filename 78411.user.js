// ==UserScript==
// @name           DGS reorder submit buttons and message textbox
// @namespace      http://softwareslave.com
// @description    DGS reorder submit buttons and message textbox
// @include        http://www.dragongoserver.net/game.php?g=*&a=domove*
// ==/UserScript==

var form = document.getElementsByClassName('MessageForm')[0].firstChild;
var nodes = form.childNodes;
form.innerHTML = '<tr class="Submit">'+nodes[1].innerHTML+'</tr><tr class="Back">'+nodes[2].innerHTML+'</tr><tr class="Message">'+nodes[0].innerHTML+'</tr>';