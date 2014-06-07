// ==UserScript==
// @name          Last.fm Ad Remover
// @author         Sepehr Lajevardi
// @namespace  http://lajevardi.persiangig.ir/code/gm/
// @description	The code will remove all ads includnig google ads in last.fm. (Multilanguage)
// @identifier      http://userscripts.org/scripts/source/23922.user.js
// @version        0.2
// @include        http*://*last.fm/*
// @include        http*://*lastfm.de/*
// @include        http*://*lastfm.es/*
// @include        http*://*lastfm.fr/*
// @include        http*://*lastfm.it/*
// @include        http*://*lastfm.pl/*
// @include        http*://*lastfm.se/*
// @include        http*://*lastfm.ru/*
// @include        http*://*lastfm.jp/*
// @include        http*://*lastfm.com.tr/*
// @include        http*://*lastfm.com.br/*
// ==/UserScript==

 // To Update Automatically
  var theScript = { //Script Meta Data
				name: "Last.fm Ad Remover",
				namespace: "http://lajevardi.persiangig.com/code/gm/",
				description: "The code will remove all ads includnig google ads in last.fm. (Multilanguage)",
				identifier: "http://userscripts.org/scripts/show/21681",
				version: "0.2",		
				date: (new Date(2008, 4 - 1, 30))
				.valueOf()
			 }
  
  try {
				 window.addEventListener("load", function (){ 
							try{
										 (unsafeWindow || window.wrappedJSObject || window)
											.UserScriptUpdates.requestAutomaticUpdates(theScript); //Passing Script Meta Data
									 } catch (ex) {} }, false);
				} catch (ex) {}
				
	//Adding CSS style to remove ads			
 var css = "#LastAd_TopRight, #footer_ads, #LastAd_Top, #LastAd_Mid{display:none !important;}";
  if (typeof GM_addStyle != "undefined") //Using Greasemonkey API
	    GM_addStyle(css);
  else if (typeof addStyle != "undefined") 
							addStyle(css);
  else { //Adding manually.
					var heads = document.getElementsByTagName("head");
					if (heads.length > 0) {
							var node = document.createElement("style");
							node.type = "text/css";
							node.appendChild(document.createTextNode(css));
							heads[0].appendChild(node); 
						}
					}
