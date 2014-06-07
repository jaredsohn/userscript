// ==UserScript==
// @name             KeepVid Interface Tidy Up
// @author           Jake McMahon
// @date             May 16, 2006
// @namespace        http://userscripts.org/
// @include          http://keepvid.com/
// @exclude          
// ==/UserScript==

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];	
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}
//add css
addGlobalStyle('.referrer_container { display: none ! important; }');
addGlobalStyle('.info_container { display: none ! important; }');
addGlobalStyle('.welcome_container { display: none ! important; }');
addGlobalStyle('body { padding-top:10%; }');

(function()
{
	// Get array of elements named 'div'
	var allLinks = document.getElementsByTagName('div');
	
	// Go through array assigning CSS display properties
	allLinks[10].style.display = "none";
	allLinks[22].style.display = "none";
}) ();

(function()
{
	// Get array of elements named 'img'
	var linky = document.getElementsByTagName('img');
	
	// Go through array assigning CSS display properties
	linky[1].style.display = "none";
}) ();
