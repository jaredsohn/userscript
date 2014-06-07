// ==UserScript==
// @name          LinuxDevices col killer
// @namespace     http://www.wuonm.com/wiki/GmUs
// @description	  Remove columns in the sides of the page
// @include       http://linuxdevices.com/news/*
// @include       http://linuxdevices.com/articles/*
// @include       http://www.linuxdevices.com/news/*
// @include       http://www.linuxdevices.com/articles/*
// ==/UserScript==

//
// $Id: linuxdevices.user.js,v 1.4 2005/03/29 16:18:56 wuonm Exp $
//

(function(){
	function search_tag_by_attr_value( tag, attr, value ){
        var els = document.getElementsByTagName( tag );
		for( var i=0; i<els.length; i++ ){
			var el = els[i];
			if ( el[attr].indexOf(value) != -1 ){
				return el;
			}
		}
	}
	function find_ancestor_by_tag( elem, tag ){
		var safety = 99;
		var p;
		tag = tag.toLowerCase();
		while( safety > 0 ){
			p = elem.parentNode;
			if ( elem.parentNode.tagName.toLowerCase() == tag ){
				return elem.parentNode;
			}
			else {
				elem = elem.parentNode;
			}
			safety--;
		}
		return null;
	}
	var killme;
	// left column
	killme = find_ancestor_by_tag( search_tag_by_attr_value("IMG", "src", "ld-vote.jpg"), "TABLE" );
	killme = find_ancestor_by_tag( killme, "TD" );
	if ( killme ) killme.parentNode.removeChild( killme );
	// right column
	killme = find_ancestor_by_tag( search_tag_by_attr_value("IMG", "src", "xml.gif"), "TABLE" );
	killme = find_ancestor_by_tag( killme, "TD" );
	if ( killme ) killme.parentNode.removeChild( killme );
})();


