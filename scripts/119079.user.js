// ==UserScript==
// @name           CTA Post Creator
// @namespace      http://advcta.site.nfoservers.com/gmpost.html
// @resource       jQuery        http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// @resource       jQueryUI      http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.1/jquery-ui.min.js
// @include        http://web3.castleagegame.com/castle_ws/battle_monster.php?*
// @include        http://web3.castleagegame.com/castle_ws/festival_battle_monster.php?*
// @include        http://75.126.76.147/castle/battle_monster.php?*
// @include        http://75.126.76.147/castle/festival_battle_monster.php?*
// @include        http://web.castleagegame.com/castle/battle_monster.php?*
// @include        http://web.castleagegame.com/castle/festival_battle_monster.php?*
// ==/UserScript==

var css = "position:absolute;"
+ "z-index:9999; "
+ "top: 0; "
+ "left: 0; "
+ "border: 1; "
+ "margin: 0; "
+ "padding: 0; "
+ "overflow: hidden;"
+ "color: black;"
+ "Width: 450px;"
+ "Height: 350px;";

var iframe = document.createElement("iframe");
iframe.setAttribute("style", css);

// The about:blank page becomes a blank(!) canvas to modify
iframe.src = "http://advcta.site.nfoservers.com/gmpost2.htm";

document.body.appendChild(iframe);

// Make sure Firefox initializes the DOM before we try to use it.
iframe.addEventListener(
"load",

function() {
var doc = iframe.contentDocument;
doc.body.style.background = "white";
doc.body.innerHTML = "";
iframe.style.width = '700';
iframe.style.height = '450';
},

false
); 


