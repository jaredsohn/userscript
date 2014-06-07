// ==UserScript==
// @name           D-Addicts Hovering
// @namespace      http://modsyn.com/scripts
// @include        http://www.d-addicts.com/*
// ==/UserScript==

(function() {

	window.addEventListener('load',function(){lload();},false) ;

	lload = function() {
		var ifr = document.evaluate( "//iframe", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null ) ;
		console.log( "Found " + ifr.snapshotLength + " iframes" ) ;
		for( var i=0;i<ifr.snapshotLength;i++ ) {
			var _ifr = ifr.snapshotItem(i) ;
			_ifr.parentNode.removeChild(_ifr) ;
		}
		deco_table() ;
	}

	deco_table = function() {
		var tds = document.evaluate( "//*[@class='forumline']/tbody/tr/td",document,null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		console.log( tds.snapshotLength + " nodes found!" ) ;
		for( var i=0;i<tds.snapshotLength;i++ ) {
			var it = tds.snapshotItem(i) ;
			mark_mo_event(it) ;
			mark_umo_event(it) ;
		}
		/***
		$$(".forumline td").each( function(it) { 
			Event.observe(it,'mouseover',function(ev) {
				it.up().getElementsBySelector("td").each( function(_it) {
					_it.style.backgroundColor = 'yellow' ;
				}) ;
			});

			Event.observe(it,'mouseout',function(ev) {
				it.up().getElementsBySelector("td").each( function(_it) {
					_it.style.backgroundColor = getComputedStyle(_it.up().next().down(),null).backgroundColor ;
				}) ;
			});
		}) ;
		***/
	}

	mark_mo_event = function(it) {
			it.addEventListener('mouseover', function(event) {
				var rowc = it.parentNode.getElementsByTagName("td") ;
				for( var x=0;x<rowc.length;x++ ) {
					try {
						var _tclone = rowc[x].parentNode.nextSibling || rowc[x].parentNode.previousSibling ;
						if( _tclone == undefined || _tclone.toString().indexOf("Text")>=0 )
							return ;
						rowc[x].style.backgroundColor = 'yellow' ;
					} catch( err ) {
						console.log( err.toString() ) ;
					}
				}
				//console.log( "Moused over an element!" ) ;
			}, false ) ;
	}

	mark_umo_event = function(it) {
		it.addEventListener('mouseout', function(event) {
			var rowc = it.parentNode.getElementsByTagName("td") ;
			for( var x=0;x<rowc.length;x++ ) {
				var _tclone = rowc[x].parentNode.nextSibling || rowc[x].parentNode.previousSibling ;
				if( _tclone != undefined && _tclone.toString().indexOf("Text")<=0 )
					rowc[x].style.backgroundColor = getComputedStyle( _tclone.getElementsByTagName("td")[0],null).backgroundColor ;
			}
		}, false) ;
	}

}) () ;