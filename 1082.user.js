// ==UserScript==
// @name          Sage collapser
// @namespace     http://www.wuonm.com/blog/wiki/GreaseMonkeyUserScripts
// @description	  Modify the behaviour of the Sage RSS reader. Collapse all the items. Click in the title shows it. Click in the body text hide it and all the previous items up to the top of the page.
// @include       *sage*
// ==/UserScript==
//
// $Id: sage.user.js,v 1.5 2005/06/20 16:13:18 wuonm Exp $
//

(function(){

	function find_thing( elem, tag, rship ){
		var safety = 99;
		var p;
		tag = tag.toLowerCase();

		while( safety > 0 ){
			p = elem[rship];
			if ( p && p.tagName && p.tagName.toLowerCase() == tag ){
				return elem[rship];
			}
			else {
				elem = elem[rship];
			}
			safety--;
		}
		return null;
	}
	function find_ancestor_by_tag( elem, tag ){
		return find_thing( elem, tag, "parentNode" );
	}
	function find_sibling_by_tag( elem, tag ){
		return find_thing( elem, tag, "nextSibling" );
	}

	var xpath = "//h2[@class='item-title']";
	var res = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var e, cnt;
	for (e = 0; e < res.snapshotLength; e++) {
		var tag = res.snapshotItem( e );

		var taglink = tag.getElementsByTagName( "a" )[0];
		var d = taglink.cloneNode( true );
		d.innerHTML = "go";

		// show
		taglink.setAttribute( "href", "javascript:var div=document.getElementById('DESC" + e + "');div.style.display=div.style.display=='none'?'block':'none';void(0==0);" );

		tag.appendChild( document.createTextNode(' < ') );
		tag.appendChild( d );
		tag.appendChild( document.createTextNode(' > ') );
		tag.parentNode.setAttribute( "id", "IDESC" + e ); 
		tag.parentNode.style.width="90%";
		tag.normalize();
	}
	xpath = "//h2[@class='item-title']";
	res = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (e = 0; e < res.snapshotLength; e++) {
		div = res.snapshotItem( e )
		div = find_sibling_by_tag( div, "div" );
		if ( div && div.className == "item-desc" ){
			div.setAttribute( "id", "DESC" + e );
			div.style.display = "none";
			div.addEventListener( "click", function( ev, e ){
				var dv = find_ancestor_by_tag( ev.target, "DIV" );
				if ( dv && dv.id.indexOf("DESC") == 0 ){
					dv = find_ancestor_by_tag( dv, "DIV" );
				}
				if ( dv && dv.id.match(/IDESC(\d+)/) ){
					var n = parseInt( RegExp.$1 );
					var k;
					for(var i=n; i>=0; i--){
						k = document.getElementById("IDESC"+i);
						if ( k ){
							k.style.display = "none";
						}
						else{
							break;
						}
					}

				}
				window.scroll(0,0);
			}, false );
		}
	}
	// hide google ads
	xpath = "//a[contains(@href,'googleadservices')]";
	res = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var lk;
	for (e = 0; e < res.snapshotLength; e++) {
		lk = find_ancestor_by_tag( res.snapshotItem( e ), "TABLE" );
		if ( lk ) {
			lk.style.display = "none";
		}
	}
}
)();
