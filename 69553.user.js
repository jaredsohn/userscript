// ==UserScript==
// @name          Nico Number Linkify
// @namespace     http://userscripts.org/users/86496
// @description   Turn nico serial number (eg. "sm395860") into clikable links.
// @include       http://*
// @include       https://*
// ==/UserScript==

// modded hzhbest
// original script "Linkify ting (exclude emails)" @copyright  JoeSimmons, Anthony Lieuallen, Adam

(function(){
var regex = /(sm|nm)\d{1,8}/g, space_regex=/ /g, http_regex=/^https?\:\/\//i, txt=/\.txt$/i;

var black_tags = ["a", "script", "style", "textarea", "title", "option", "pre"+(txt.test(location.href)?"allowTxt":""), "code"];
var path_Find = ".//text()[not(parent::" + black_tags.join(" or parent::") +")]";

textNodes = document.evaluate(path_Find, document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(var i=0, item; (item=textNodes.snapshotItem(i)); i++){
	
	var itemText = item.nodeValue;
	
	if(regex.test(itemText)){
		var span_BOX = document.createElement("span");
		var lastLastIndex = 0;
		regex.lastIndex = 0;
		for(var myArray = null; myArray = regex.exec(itemText);){
			var link_ify = myArray[0];
			span_BOX.appendChild(document.createTextNode(itemText.substring(lastLastIndex, myArray.index)));
			var href = link_ify.replace(space_regex,"").toLowerCase(),
				text = (link_ify.indexOf(" ")==0)?link_ify.substring(1):link_ify;
			href="http://www.nicovideo.jp/watch/"+href;
			var a_linkify = document.createElement("a");
			a_linkify.setAttribute("href", href);
			a_linkify.setAttribute("target", "_blank"); // open in a new window/tab
			a_linkify.setAttribute('style', 'border-top: 1px dotted #666;border-bottom: 1px dotted #666;color:inherit !important;')
			a_linkify.appendChild(document.createTextNode(text));
			span_BOX.appendChild(a_linkify);
			lastLastIndex = regex.lastIndex;
		}
		span_BOX.appendChild(document.createTextNode(itemText.substring(lastLastIndex)));
		item.parentNode.replaceChild(span_BOX, item);
	}
}
})();