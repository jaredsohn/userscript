// ==UserScript==
// @name           Compact OGame
// @description    Makes many of the pages on OGame smaller.
// @include        http://*.ogame.*/game/index.php?page=*
// @version 1.51
// ==/UserScript==

var Compact = function(){

GM_addStyle((<><![CDATA[
#overview #planet { height: 145px; overflow: hidden }
#planetOptions { position: relative; top: -30px; }
#planetdata { margin: 20px 5px 0px 0px }
#shipyard div.detail_screen div.pic { height: 110px; width: 200px; background: none }
#station div.detail_screen div.pic, #station-moon div.detail_screen div.pic { height:110px; width:200px; background: none }
#resources div.detail_screen div.pic { height:110px; width:200px; background: none }
#defense div.detail_screen div.pic { height:110px; width:200px; background: none }
#research div.detail_screen div.pic { height:110px; width:200px; background: none }
div.detail_screen {background-color: #000000; background-image: none}
div.detail_screen.small {background-color: #000000; background-image: none}
#defense div.detail_screen {background-color: #000000; background-image: none}
#research div.detail_screen {background-color: #000000; background-image: none}
#shipyard div.detail_screen {background-color: #000000; background-image: none}
a.build-it, a.build-it_disabled { right: 5px }
#costs { height:35px; z-index:5000 }
li.techtree { left:0px; background: none}
li.techtree a span.pic, li.demolish a span.pic, li.techtree a span.disabled, li.demolish a span.disabled { background: none; display:inline }
li.techtree a, li.demolish a {height:0px; width:0px}
div#action { padding:20px 0px }
.detail_screen #action li.techtree, .detail_screen #action li.demolish { top:6px }
li.techtree, li.demolish { text-align:left; height:10px }
.detail_screen #content { height:170px }
#research .c-left, #research .c-right {height:0px}
#research #planet {height:210px}
#resources .c-left, #resources .c-right {height:0px}
#resources #planet {height:210px}
#station .c-left, #station .c-right, #station-moon .c-left, #station-moon .c-right {height:0px}
#station #planet, #station-moon #planet {height:210px}
#shipyard .c-left, #shipyard .c-right {height:0px}
#shipyard #planet {height:216px}
#defense .c-left, #defense .c-right {height:0px}
#defense #planet {height:210px}
.c-left {background:none}
.c-right {background:none}
#planet div#slot01.slot {top:145px; left:425px; background: none; z-index:5000}
#detail #description .display {margin-top:0px}
#fleet2 #planet, #fleet1 #planet, #fleet3 #planet {height:40px}
#movement #planet {height:40px}
#messages #planet {height:40px}
#alliance #planet {height:40px}
div#description p {margin:0px}
#resources div.detail_screen div#description p {width:627px}
#description .breakrocket {top:-40px; left:325px}
]]></>).toString());

}

Compact();
