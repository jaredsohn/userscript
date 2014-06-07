// ==UserScript==
// @name        GistFilterTag
// @description Allow you to filter yours gist by tag
// @id          me.zilliox.GistFilterTag
// @homepageURL http://userscripts.org/scripts/show/126558
// @supportURL  http://userscripts.org/scripts/discuss/126558
// @updateURL   http://userscripts.org/scripts/source/126558.meta.js
// @version     2012.02.24
// @author      tzilliox
// @namespace   http://zilliox.me
// @include     https://gist.github.com/*
// ==/UserScript==

(function(){
	var execute = function(){

		// Can I start the filter sidebar ?
		var is_filter_activate = function() {
			var path = window.location.href.split('/').slice(3).join('/');
			return ( path !== '' && path.indexOf('/') == -1 && isNaN( path ) );
		}

		// Parse files description to get keyword
		var parse_keywords = function( prefix, min_length ) {
			var tags = {tags_index:[]};
			// Is it a valid keyword ?
			var is_a_good_word = function( word ) {
				return (
					word !== 'tags_index' &&
					word.substr( 0, prefix.length ) == prefix && 
					word.substr( -3 ) !== '...' &&
					word.substr( 0, 7 ) !== 'http://' &&
					word.length > prefix.length + min_length &&
					word.length < 20
				);
			}
			// Parse
			$( '.info span:nth-child(2)' ).each( function( index ){
				var words = this.innerHTML.toLowerCase().split(' ');
				for ( var i=0; i<words.length; i++ ) {
					if ( is_a_good_word( words[ i ] ) ) {
						if ( typeof tags[ words[ i ] ] == 'undefined' ) {
							tags[ words[ i ] ] = [];
							tags[ 'tags_index' ][ tags[ 'tags_index' ].length  ] = words[ i ];
						}
						tags[ words[ i ] ][ tags[ words[ i ] ].length ] = index;
					}
				}
			});
			// Order tag by occurence inverse
			var order_tag = function ( a, b ) {
				return tags[ b ].length - tags[ a ].length;
			}
			tags['tags_index'].sort( order_tag );
			return tags;
		}
		
		if ( is_filter_activate() ) {
			var tags = parse_keywords( '#', 1 );
			var info_text = 'You see the #tag of the gist description';
			if ( tags['tags_index'].length == 0 ) {
				tags = parse_keywords( '', 4 );
				info_text = 'You see the word of the gist description, there is no #tag.';
			}

			var secondary = $( '.secondary');
			if ( secondary.length == 0 ) {
				secondary = $('<div class="secondary"></div>').insertBefore('.main');
			}
			var tag_list = $('<div id="revisions"><h3>Filter by tag</h3><ul></ul><em>'+info_text+'</em></div>').appendTo( secondary ).find('ul');
			for ( var i in tags['tags_index'] ) {
				tag_list.append( $('<li><label><input type="checkbox" data-tag="'+tags['tags_index'][i]+'"/> '+tags['tags_index'][i]+' ('+tags[tags['tags_index'][i]].length+')</label></li>') );
			}
			tag_list.click( function(){
				var files;
				$(this).find('input').each(function(){
					if ( $(this).is(':checked') ) {
						var tag = this.getAttribute( 'data-tag' );
						if ( typeof files == 'undefined' ) {
							files = tags[tag].slice( 0 );
						} else {
							for ( i=0; i<files.length; i++ ) {
								if ( tags[tag].indexOf( files[i] ) == -1 ) {
									files.splice(i, 1);
						                        i--;
								}
							}
						}
					}
				});

				if ( typeof files != 'undefined' ) {
					$( '#files .file' ).hide();
					var selector = [];
					for ( var i=0; i<files.length; i++ ) {
						selector[ selector.length ] = '#files .file:nth-child('+(files[i]+1)+')';
					}
					$( selector.join( ', ' ) ).show();
				} else {
					$( '#files .file' ).show();
				}
			});
		}
	};
	// Add the script
	var script = document.createElement("script");
	script.setAttribute( 'type', 'text/javascript' );
	script.innerHTML = '(' + execute.toString() + ')();';
	document.head.appendChild(script);
})();
