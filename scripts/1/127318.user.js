// ==UserScript==
// @name           Hide Zynga Zbar
// @description    Hides the Zbar for various games
// @namespace      Hazado
// @include        /(.*)\.(zynga|farmville)\.com(.*)/
// @require        http://userscripts.org/scripts/source/123889.user.js
// @version		   1.1
// ==/UserScript==

(function(){

	//an array of possible container id's. Exact id's only please.
	var zbar=["zbarContainer","zbar","zbar_takeoverContainer","closeableMOTD.noticebox","MOTD.noticebox","ad","promotionalBarContainer.promoBar","saleDialog"];
	//an array of known games that contain a like widget we want to hide. Please keep in lower case to keep the widget killer function working
	var games=["pioneertrail","cityville","hidden-chronicles","farmville","castleville","mafiawars2","cafe-world","adventureworld","empiresandallies"];


	//function to get the very top ancestor element just below the document.body node of any passed element e
	var ancestorBelowBody=function(e){
		try{
			if (e.parent==document.body) return e;
			else return ancestorBelowBody(e.parent);
		}catch(x){return null;}
	};
	
	//kill zbars with higher level css classes so it can't come back

	//merges the zbar array, making css selectors for each entry, and appending a css class to the document to hide the offending elements
	addGlobalStyle(
		"#"+zbar.join(", #")+" {display:none !important;}\n"+
		".HIDE {display:none !important;}\n"
	); 



	//hide "like" widgets with style at their highest node not being the body, repeat after an interval to catch delayed load widgets

	//select all iframes containing a like widget, then run a function on each to inspect what game it may be for, and hide offending game widgets
	var hideWidgets=function(){
		if (!window) return;
		forNodes(".//iframe[contains(@src,'facebook.com/plugins/like.php?')]",{node:document.body},function(e){
			for (var g=0,glen=games.length; g<glen; g++) if (e.src.toLowerCase().contains(games[g])){
				var topParent = ancestorBelowBody(e);
				(topParent||e).className=(topParent||e).className.addWord("HIDE");
				break;
			}
		});
	};
	
	var hideTwitter=function(){
		if (!window) return;
		forNodes(".//iframe[contains(@src,'platform.twitter.com/widgets/')]",{node:document.body},function(e){
			for (var g=0,glen=games.length; g<glen; g++) if (e.src.toLowerCase().contains(games[g])){
				var topParent = ancestorBelowBody(e);
				(topParent||e).className=(topParent||e).className.addWord("HIDE");
				break;
			}
		});
	};

	window.setInterval(hideWidgets,5000);
	window.setInterval(hideTwitter,8000);

})();
