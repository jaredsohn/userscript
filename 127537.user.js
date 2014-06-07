// ==UserScript==
// @name	e-dfc USERSCRIPT
// @version	1.2
// @author	antman
// @description naprawia to co nienaprawialne
// @include	http://e-dfc.tk/gallery.php?album=*&photo=*
// ==/UserScript==


function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://code.jquery.com/jquery-latest.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}


function main() {

$('div[class=logo]').remove();

GM_addStyle("" + <><![CDATA[
	div.main { padding-top: 10px !important; }]]></>); 

}


addJQuery(main);