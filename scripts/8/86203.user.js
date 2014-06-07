// ==UserScript==
// @name 7LandsCleanup
// @author Mahaf
// @description Optimiert Anzeige in 7Lands
// @include http://*.sevenlands.*
// @exclude http://*forum*sevenlands*
// ==/UserScript==

var back = document.getElementById('top');
back.style.height = '50px';
var body = document.getElementById('root');
body.style.background = '#000 url(/images/page/body_background.jpg) no-repeat center 26px';
var arrow = document.getElementById('no_motivation');
if (arrow) {
	arrow.parentNode.removeChild(arrow);
}