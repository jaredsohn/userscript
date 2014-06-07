
// Wikimedia ContribBlock
// Copyright (c) 2007, Chabacano
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Wikimedia ContribBlock", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Wikimedia ContribBlock
// @namespace     http://es.wikipedia.org/wiki/user:Chabacano
// @description   Appends block logs to user's contributions pages of wikimedia
// @include       *.wikipedia.org/wiki/Special:Contributions/*
// @include       *.wikipedia.org/w/index.php?title=Special:Contributions*
// @include       http://es.wikipedia.org/wiki/Especial:Contributions/*
// @include	  http://es.wikipedia.org/w/index.php?title=Especial:Contributions*
// @include       http://de.wikipedia.org/wiki/Spezial:Beitr%C3%A4ge/*
// @include	  http://de.wikipedia.org/w/index.php?title=Spezial:Beitr%C3%A4ge*
// @include       http://commons.wikimedia.org/wiki/Special:Contributions/*
// @include       http://commons.wikimedia.org/w/index.php?title=Special:Contributions*
// ==/UserScript==

if (!GM_xmlhttpRequest) {
  alert('Please update Greasemonkey or disable this script!');
  return;
}

var bc = document.getElementById('bodyContent');
cont_url=window.location.href
var tokens = cont_url.split("/");
var tokens2 = tokens.pop().split("=");
user=tokens2.pop();

if (bc) {
	var box=document.getElementById('contentSub');	
	var footer=document.getElementById('printfooter');	
	if(box){
	
		GM_xmlhttpRequest({
			method: 'GET',
			url: "http://"+window.location.host+"/w/index.php?title=Special:Log&type=block&page=User:"+user,
			//headers: { 'Useragent': 'Mozilla/4.0 (compatible) Greasemonkey'},
			onload: function(responseDetails) {
			    	var xmlstring=responseDetails.responseText;
				dp=new DOMParser();
				var xmlobject = dp.parseFromString(xmlstring.replace(/&nbsp/g, ""), "text/xml");
				
				if (/^http:\/\/de\.wikipedia\.org\//.test(window.location.href)) {
					var xmlobject = dp.parseFromString(xmlstring.replace(/<\/p><p>/g,""), "text/xml");
				}
				xs=new XMLSerializer();
				var bc2 = xmlobject.getElementById('bodyContent');
				var ul2 = bc2.getElementsByTagName('ul');
				if (/^http:\/\/en\.wikipedia\.org\//.test(window.location.href)) {
					str=xs.serializeToString(ul2[1]);
				}else{
					str=xs.serializeToString(ul2[0]);
				}
				var ul = bc.getElementsByTagName('ul');
				var par = bc.getElementsByTagName('p');
				var blocks = document.createElement("div");
				blocks.innerHTML = '<div id="bodyContent" style="border: 1px solid #CCC; background-color:#FEE;" >' + str + '</div>';
    				par[1].parentNode.insertBefore(blocks,par[1].nextSibling);

			}
		});
	}
}
