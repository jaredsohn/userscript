// ==UserScript==
// @name        btn colour alternator
// @namespace   enforcer
// @include     http*://broadcasthe.net/torrents.php?*id=*
// @version     1
// @grant       none
// ==/UserScript==

var bgcol = "#272A2E" //change your colour here, get hex codes from http://www.colorpicker.com/

var gt = document.querySelectorAll(".group_torrent")

for(i = 0; i < gt.length; i += 2) {
	gt[i].className += " mod2";
	gt[i].parentNode.rows[ gt[i].rowIndex + 1 ].className += " mod2";
	}
		
var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = ".mod2 { background-color: "+ bgcol + " !important }";
document.head.appendChild(css);
