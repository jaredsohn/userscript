// ==UserScript==
// @name           Disable Hatena Keywords
// @description    Disables Hatena keyword anchers. Ancher nodes will be replaced with span nodes.
// @version        1.1.0
// @author         Shinya <shinya.kawano.404@gmail.com>
// @namespace      http://code404.org/
// @homepage       http://userscripts.org/scripts/show/11328
// @id             Disable-Hatena-Keywords@code404.org
// @run-at         document-end
// @license        GPL license
// @include        http://d.hatena.ne.jp/*
// @include        http://*g.hatena.ne.jp/*
// @include        http://anond.hatelabo.jp/*
// @include        http://*.hatenablog.com/*
// @include        http://*.hatenablog.jp/*
// @include        http://*.hateblo.jp/*
// @include        http://*.hatenadiary.com/*
// @include        http://*.hatenadiary.jp/*
// @exclude        http://d.hatena.ne.jp/keyword*
// @exclude        http://*g.hatena.ne.jp/keyword*
// ==/UserScript==

/*== Copyright by Original Script ==============*/
// Copyright (C) 2005, temp_h.
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

//
// Therefore, the license of this script is under the GPL, too.
//

(function(){
	disableHatenaKeywords();
	
	function disableHatenaKeywords(elm){
		var element = elm || document;
		var kwNodes = document.evaluate(
			'(/descendant::A[attribute::class = "keyword"]|/descendant::A[attribute::class = "okeyword"])',
			element, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
		);
		for(var i = 0, l = kwNodes.snapshotLength; i < l; i++){
			var n = kwNodes.snapshotItem(i);
			var r = document.createElement("span");
			r.className = "keyword";
			for(var j = 0, len = n.childNodes.length; j < len; j++){
				r.appendChild(n.childNodes[j].cloneNode(true));
			}
			n.parentNode.replaceChild(r, n);
		}
	}
	
	// Autopagerize
	var boot = function(){
		window.wrappedJSObject.AutoPagerize.addFilter(function(docs){
			 console.log(docs[0]);
			 disableHatenaKeywords(docs[0]);
		});
	};
	
	if(window.AutoPagerize){
		boot();
	}else{
		window.addEventListener("GM_AutoPagerizeLoaded", boot, false);
	}
})();
