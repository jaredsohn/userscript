// ==UserScript==
// @name           Puzzcore Link replace
// @namespace      reniris
// @version        1.2
// @description    Puzzcore Link replace
// @include        http://www.puzzcore.com/*
// ==/UserScript==

(function(){
	if(document.URL.indexOf("/pzl/") != -1)
		PzlToGamePage();
	else
		DirectGamePage('//div[@class="pzl-search-result"]/div[@class="pzl-search-result-in"]/div[@class="unit"]/div[@class="img" or @class="title"]');
	
	function DirectGamePage(xpath,target){
		var all = GetXpath(xpath);
		for( var i=0; i<all.snapshotLength; i++){
			var a = all.snapshotItem(i).getElementsByTagName("a");
			for ( var j=0; j<a.length; j++ ) {
				SetTitleComment(a[j]);

				if(all.snapshotItem(i).className == "img")
					a[j].href = a[j].href.replace("/pzl/","/game/");

				if(target == undefined)
					a[j].target = "_blank";
			}
		}
	}

	function PzlToGamePage(){
		var all = GetXpath('//div[@id="pzl-detail-l"]');
		for( var i=0; i<all.snapshotLength; i++){
			var a = all.snapshotItem(i).getElementsByTagName("a");
			for ( var j=0; j<a.length; j++ ) {
				a[j].removeAttribute('onClick');
				a[j].href = document.URL.replace("/pzl/","/game/");
			}
		}
		DirectGamePage('//div[@id="pzl-related"]/div[@class="list"]/div[@class="unit"]/div[@class="img" or @class="title"]',"_self");
	}

	function GetXpath(query) {
		return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}

	function ParseHTML(text) {
		var createHTMLDocument = function() {
			var xsl = (new DOMParser()).parseFromString(
				['<?xml version="1.0"?>',
				 '<stylesheet version="1.0" xmlns="http://www.w3.org/1999/XSL/Transform">',
				 '<output method="html"/>',
				 '</stylesheet>'].join("\n"), "text/xml");

			var xsltp = new XSLTProcessor();
			xsltp.importStylesheet(xsl);
			var doc = xsltp.transformToDocument(
				document.implementation.createDocument("", "", null));
			return doc;
		};

		var doc = createHTMLDocument();
		var range = doc.createRange();
		doc.appendChild(doc.createElement("html"));
		range.selectNodeContents(doc.documentElement);
		doc.documentElement.appendChild(
			range.createContextualFragment(text));
		return doc;
	}

	function SetTitleComment(a){
		GM_xmlhttpRequest({
			method:"GET", 
			url:a.href,
			onload:function(res){
				var doc = ParseHTML(res.responseText);
				var meta = doc.getElementsByName('description');
				if(meta[0].content.length > 0 && !meta[0].content.match(/^[ 　\t]*$/i))
					a.title = meta[0].content;
				GM_log(meta[0].content.match(/^[ 　\t]*$/i) + ' ' + meta[0].content);
			}
		});
	}
})();