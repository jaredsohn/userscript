// ==UserScript==
// @name         Github Auto Reload Graph
// @namespace    githubAutoReloadGraph
// @include      /https?:\/\/github\.com\/[^\/]*\/[^\/]*\/network([\?#].*)?/i
// @include      http://github.com/*/*/network*
// @match        http://github.com/*/*/network*
// @datecreated  2010-03-07
// @lastupdated  2010-05-16
// @updateURL http://userscripts.org/scripts/source/70826.user.js
// @version      0.1.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  This userscript will automatically reload the network graph page when the graph has new data available.
// ==/UserScript==

(function(d){
	var notice = d.evaluate("//div[contains(@class,'notice') and contains(@class,'out_of_date')]",d,null,9,null).singleNodeValue;
	if(!notice) return;

	var mainFunc = function(){
		if(notice.getAttribute("class").match(/up_to_date/i)){
			window.location.replace( window.location.href );
		}
	}

	notice.addEventListener( "DOMAttrModified", mainFunc,false );
	mainFunc();
})(document);
