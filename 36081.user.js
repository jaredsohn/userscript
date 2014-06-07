// ==UserScript==
// @author		tomasz.frelik (at) gmail.com
// @namespace	http://frelo.enzo.pl/userscript
// @name		IMDB -> amazon.com link fix
// @description	Fixes non-working "buy it at amazon" link at IMDB pages. Takes you to title search results in Movies & TV.
// @include		http://*imdb.com/*
// ==/UserScript==

// ********************************************************************
// LICENSE
// You are allowed (and encouraged) to use and redistribute this script 
// in original form. To use or redistribute the script after any 
// modifications, or any derivatives of this script, you need a written
// consent from the author.
// ********************************************************************

String.prototype.trim = function() {
    return this.replace( /^\s*|\s*$/g, '' );
}

imdb_monkey = {

	vars: {
		//title_pattern: "//div[@id='tn15title']//h1",
		title_pattern: "//h1",
		buy_at_amazon_pattern: "//a[@class='linkasbutton-secondary']",
		buy_at_amazon_anchor_text: "buy it at amazon"	
	}, 

	main: function() {

		var candidate_links = document.evaluate( this.vars.buy_at_amazon_pattern, document, null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

		for ( var i = 0; i < candidate_links.snapshotLength; i++ ) {
			var l = candidate_links.snapshotItem( i );
			var anchor_text = l.innerHTML;
			if ( anchor_text.toLowerCase() == this.vars.buy_at_amazon_anchor_text ) {
				title = this.get_title();
				var amazon_href = "http://www.amazon.com/gp/search?ie=UTF8&keywords=" + title + "&tag=imdb-title-20&index=dvd";
				l.href = amazon_href;
			}
		}
	},

	get_title: function() {
		var title_h1 = document.evaluate( this.vars.title_pattern, document, null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
		var h1 = title_h1.snapshotItem( 0 );
		var title = h1.firstChild;
		return title.nodeValue.trim();
	}
}

imdb_monkey.main();