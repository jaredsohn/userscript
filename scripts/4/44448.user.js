// ==UserScript==
// @name           Scroll To Top/Bottom Of Page
// @namespace      http://userscripts.org/users/23652
// @description    Adds a link to scroll to the top or bottom of the current page
// @include        http://*
// @include        https://*
// @copyright      JoeSimmons
// @version        1.0.4
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

if(!parent || parent.location!=location) return;

function gotop() {
scroll(0, 0);
}

function gobottom() {
scroll(0, document.body.scrollHeight);
}

var div = document.createElement("div"),
	top = document.createElement("a"),
	bottom = document.createElement("a");
div.setAttribute("style", "color: #000000; background: #FFFFFF; font-size: 12px; font-family: arial; position: fixed; bottom: 0; left: 0; padding: 3px; z-index: 99999;");
top.href = "javascript:void(0);";
bottom.href = "javascript:void(0);";
top.addEventListener("click", gotop, false);
bottom.addEventListener("click", gobottom, false);
top.setAttribute("style", "color:#000; font:12px arial;");
bottom.setAttribute("style", "color:#000; font:12px arial;");
top.textContent = "Top";
bottom.textContent = "Bottom";
div.appendChild(document.createTextNode("Scroll To: "));
div.appendChild(top);
div.appendChild(document.createTextNode(" "));
div.appendChild(bottom);
document.body.appendChild(div);