// ==UserScript==
// @name        GistBlocksLink
// @description	Add a bl.ocks.org link on gist
// @id          me.zilliox.GistBlocksLink
// @homepageURL	http://userscripts.org/scripts/show/126410
// @supportURL  http://userscripts.org/scripts/discuss/126410
// @updateURL   http://userscripts.org/scripts/source/126410.meta.js
// @version     2012.12.20
// @author      tzi
// @namespace   http://zilliox.me
// @include     https://gist.github.com/*
// ==/UserScript==

(function() {
	var settings = { 
		selectors: {
			repository_id: 'a.js-current-repository',
			index_file: '#file-index-html',
			menu: 'ul.menu.gisttabs',
		}
	};
	var execute = function( settings ){
		var repository_id = false;
	
		(function(){
			if ( get_repository_id( ) && has_html_index( ) ) {
				add_blocks_link( );
			}
		})();
	
		function get_repository_id( ) {
			var link = document.querySelector( settings.selectors.repository_id );
			if ( link && link.href ) {
				repository_id = link.getAttribute( 'href' ).slice( 1 );
				return true;
			}
			return false;
		}
	
		function has_html_index( ) {
			var index = document.querySelector( settings.selectors.index_file );
			return ( index != null );
		}
	
		function add_blocks_link( ) {
			var menu = document.querySelector( settings.selectors.menu );
			if ( menu != null ) {
				menu.innerHTML += '<li><a href="http://bl.ocks.org/' + repository_id + '" target="_blank">Bl.ocks.org</a></li>';
			}
		}
	}
	var script = document.createElement( 'script' );
	script.innerHTML = '(' + execute.toString() + ')( ' + JSON.stringify( settings ) + ');';
	document.head.appendChild( script );
})();