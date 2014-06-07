// ==UserScript==
// @name           Gaia Online - Fix My Gaia
// @author         Awesomolocity (http://www.awesomolocity.site40.net)
// @description    Fixes the new My Gaia page on GaiaOnline to make it look better.
// @include        http://gaiaonline.com/mygaia/
// @include        http://www.gaiaonline.com/mygaia/
// @include        http://gaiaonline.com/mygaia
// @include        http://www.gaiaonline.com/mygaia
// @require        http://sizzlemctwizzle.com/updater.php?id=80906
// @version        1.0.5
// ==/UserScript==

//Function allows for cross-browser support. (Excluding IE; it sucks)
function addGlobalStyle(css){
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if(!head){
		return;
	}
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}
addGlobalStyle('div#grid_ad{display: none ! important;}'+
	'#bd .suggested {margin:3px 0 10px;}'+
	'#gaia_content .friend_statuses{max-height: 185px; overflow-x: hidden; overflow-y: auto;}'+
	'#gaia_content .datafeeds ul, #gaia_content .datafeeds li {max-height: 175px; overflow-x: hidden; overflow-y: auto;}'+
	'div#feed_goldguy {display: none ! important}'+
	'#bd .mystats{margin:30px 0 0;}'+
	'.overview #my_choc {display: none ! important;}'+
	'.suggested{display: none !important;}');