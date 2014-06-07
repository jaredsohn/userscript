// ==UserScript==
// @name           Asianet broadband login screen ad remover

// @description    Removes the iframe on the ad pages

// @include        https://*.adlkerala.*

// ==/UserScript==

var images = document.getElementsByTagName('img');
for (var n = images.length; n--> 0;) {
  var img = images[n];
  img.setAttribute("src", "");
}
document.body.innerHTML = document.body.innerHTML.replace(/<iframe.*?>/gmi, '');
GM_addStyle((<><![CDATA[
   .brd { display:none }
.style2{background:none}
tr td{background:none}
   p{display:none}
img{display:none!important}
marquee{display:none}
div{display:none}
font{display:none}
body{background-color:#EEEEEE; margin:0 auto !important;width:500px}
]]></>).toString());