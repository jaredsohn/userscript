// ==UserScript==
// @name               Popeen Town on The-West
// @namespace      Popeen
// @description       andrar lite bilder. Edit some pictures.
// @include            *the-west*/game.php
// ==/UserScript==



var z=document.createElement("link");
with(z) {
	href="http://www.freewebs.com/popeen/ovrigt/t-w.css";
	type="text/css";
	rel="stylesheet";
	media="screen";
}
document.body.previousSibling.appendChild(z);

