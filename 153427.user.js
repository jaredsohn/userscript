// ==UserScript==
// @name Serienjunkies.org Download Links Grabber
// @description Adds a container with all grabbed download links at the bottom right
// @namespace http://serienjunkies.org/#grabber
// @include http://serienjunkies.org/*
// @homepageURL http://userscripts.org/scripts/show/ID
// @updateURL https://userscripts.org/scripts/source/ID.meta.js
// @author USERNAME
// @version 0.0.16
// @date 2012-12-05
// @license MIT License
// @run-at document-end
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery ( callback ) {
	var script = document.createElement ( "script" );
	//script.setAttribute ( "src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js" );
	script.setAttribute ( "src", "//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js" );
	script.addEventListener ( 'load', function () {
		var script = document.createElement ( "script" );
		script.textContent = "window.jQ = jQuery.noConflict ( true ); ( " + callback.toString() + " ) ();";
		document.body.appendChild ( script );
	}, false );
	document.body.appendChild ( script );
}

function serienjunkies_grabber () {
	var sjlgoc = {
		hoster: 'open / close hoster : ' ,
		all: 'open / close all hosters' ,
		maximum_timeout: 15 ,
		current_timeout: 0 ,
		timeout: 5000 ,
		debug: false
	};
	if ( window.navigator.language == 'de' || window.navigator.language == 'de-DE' ) {
		sjlgoc.hoster = '&Ouml;ffne / Schlie&szlig;e Hoster : ';
		sjlgoc.all = '&Ouml;ffne / Schlie&szlig;e alle Hoster';
	}
	
	var serienjunkies_link_grabber = function () {
		// if ( sjlgoc.debug ) console && console.log ( 'serienjunkies_link_grabber () start' );
		// returns link object
		// postid.headline;
		// postis.links.[hoster] = array link list
		var start = false ,
			start_i = 0 ,
			p_i = ''
			cl = '' ,
			a_search = 'http://download.serienjunkies.org/' ,
			downloads = {} ,
			headline = '';
		jQ ( '.post-content p' ).each ( function ( p_index ) {
			if ( this.hasOwnProperty ( 'className' ) || this.className ) {
				if ( this.className ) {
					if ( this.className == 'qsep' ) {
						// if ( sjlgoc.debug ) console && console.warn ( 'P ref: ' + p_index, 'className found ', this );
						start = true;
						p_i = p_index;
						downloads[p_i] = {};
						downloads[p_i]['headline'] = this.innerHTML;
						downloads[p_i]['links'] = {};
						
					}
				}
			}
			if ( start ) {
				// if ( sjlgoc.debug ) console && console.log ( jQ ( this ).children ( ) );
				jQ ( this ).children ( ).each ( function ( c_index ) {
					if ( this.hasOwnProperty ( 'className' ) || this.className ) {
						if ( this.className ) {
							if ( this.className == 'download_main' ) {
								// if ( sjlgoc.debug ) console && console.log ( 'C ref: ' + p_i, 'c: ' + c_index, 'p: ' + p_index, this );
								jQ ( this ).children ( ).each ( function ( a_index ) {
									if ( this.nodeName == 'A' ) {
										if ( this.href.indexOf ( a_search ) != -1 ) {
											// if ( sjlgoc.debug ) console && console.log ( 'A ref: ' + p_i, 'a: ' + a_index, 'c: ' + c_index, 'p: ' + p_index, this );
											if ( !downloads[p_i]['links'][this.innerHTML] ) {
												downloads[p_i]['links'][this.innerHTML] = [];
											}
											downloads[p_i]['links'][this.innerHTML].push ( this.href );
										}
									}
									jQ ( this ).children ( ).each ( function ( aa_index ) {
										if ( this.nodeName == 'A' ) {
											if ( this.href.indexOf ( a_search ) != -1 ) {
												// if ( sjlgoc.debug ) console && console.log ( 'A ref: ' + p_i, 'aa: ' + aa_index, 'a: '+ a_index, 'c: ' + c_index, 'p: ' + p_index, this );
												if ( !downloads[p_i]['links'][this.innerHTML] ) {
													downloads[p_i]['links'][this.innerHTML] = [];
												}
												downloads[p_i]['links'][this.innerHTML].push ( this.href );
											}
										}
									} );
									// if ( sjlgoc.debug ) console && console.log ( this );
								} );
								
							}
						}
					}
				} );
				// if ( sjlgoc.debug ) downloads[p_index]['links'].push( link );
			}
			// if ( sjlgoc.debug ) console && console.log ( p_index, this );
		} );
		// if ( sjlgoc.debug ) console && console.log ( 'serienjunkies_link_grabber () end' );
		return downloads;
	}
	// test needed?
	//if ( typeof serienjunkies_link_grabber == 'function' ) {
	//	var downloads = serienjunkies_link_grabber ();
	//	if ( downloads ) {
	//		console && console.log ( 'downloads' );
	//		console && console.log ( downloads );
	//	}
	//}
	// var serienjunkies_link_grabber = function () END OF FUNCTION
	
	var serienjunkies_headline_grabber = function () {
		// returns the headline from the current page
		// if ( sjlgoc.debug ) console && console.log ( 'serienjunkies_headline_grabber () start' );
		var headline = '';
		if ( typeof jQ != 'undefined' ) {
			jQ ( 'h2' ).each ( function ( index ) {
				// if ( sjlgoc.debug ) console && console.log ( index, ' ', this );
				//for ( t in this ) {
				//	console && console.log ( t, typeof this[t], this[t] );
				//}
				if ( this.hasOwnProperty ( 'previousElementSibling' ) || this.previousElementSibling ) {
					if ( this.previousElementSibling.nodeName == 'P' ) {
						if ( this.previousElementSibling.className == 'post-title' ) {
							headline = this.innerHTML;
						}
					}
				}
			} );
		} else {
			var h2 = document.getElementsByTagName ( 'h2' );
			if ( h2 ) {
				if ( h2.length ) {
					if ( h2[0] ) {
						if ( h2[0].hasOwnProperty ( 'innerHTML' ) || h2[0].innerHMTL ) {
							headline = h2[0].innerHTML;
						}
					}
				}
			}
		}
		// if ( sjlgoc.debug ) console && console.log ( 'serienjunkies_headline_grabber () end' );
		return headline;
	}
	// tests needed?
	//if ( typeof serienjunkies_headline_grabber == 'function' ) {
	//	var headline = serienjunkies_headline_grabber ();
	//	if ( headline ) {
	//		console && console.log ( 'headline :' );
	//		console && console.log ( headline );
	//	}
	//}
	// var serienjunkies_headline_grabber = function () END OF FUNCTION
	
	if ( typeof jQ !== 'undefined' ) {
		// if ( sjlgoc.debug ) console && console.log ( 'serienjunkies_grabber () start' );
		var headline = serienjunkies_headline_grabber ();
		var downloads = serienjunkies_link_grabber ();
		var html = '';
		if ( downloads ) {
			var d_i = 1;
			for ( d in downloads ) {
				if ( downloads[d].headline.length && Object.keys ( downloads[d].links ).length ) {
					var backgroundColor = ( d_i % 2 ) ? 'background-color: #FFFFFF;' : 'background-color: #F4F4F4;';
					var borderRadius = ( d_i % 2 ) ? '' : ' -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px;';
					html += '<div id="grabber_box_' + d + '" style="' + backgroundColor + borderRadius + ' padding-left: 5px; padding-right: 5px; padding-bottom: 0.5em; margin-bottom: 0.5em;">' + "\n";
						html += '<div id="grabber_headline_' + d + '" class="grabber_headline" style="margin-bottom: 0.5em; margin-top: 0.5em;">' + downloads[d].headline + '</div>' + "\n"; // headline
						html += '<span id="grabber_open_' + d + '" class="grabber_open" style="cursor: pointer; color: gray;" onclick="jQ ( \'.grabber_hoster_' + d + '\' ).slideToggle ( \'slow\' );">' + sjlgoc.all + '</span><br />' + "\n";
						html += '<div id="grabber_content_' + d + '" class="grabber_content">' + "\n";
						var l_i = 1;
						for ( l in downloads[d].links ) {
							if ( downloads[d].links[l] ) {
								if ( downloads[d].links[l].length ) {
									var l_clean = l.replace ( '.', '-' );
									var l_color = ( l_i % 2 ) ? 'color: darkgray;' : 'color: gray;';
									html += '<div id="grabber_hoster_' + d + '_' + l_clean + '" style="maring-bottom: 1em;">';
										html += '<span onclick="jQ ( \'#grabber_hoster_' + d + '_' + l_clean + '_content\' ).slideToggle ( \'slow\' );" style="cursor: pointer; ' + l_color + ' margin-bottom: 1em;">' + l + '</span>' + "\n";
										html += '<div id="grabber_hoster_' + d + '_' + l_clean + '_content" class="grabber_hoster_' + d + '" style="display: none; margin-bottom: 1em; text-align: left;">' + "\n";
										for ( link in downloads[d].links[l] ) {
											html += '<a href="' + downloads[d].links[l][link] + '" class="grabber_link">' + downloads[d].links[l][link] + '</a>' + "<br />\n";
										}
										html += '</div>' + "\n";
									html += '</div>' + "\n";
									l_i++;
								}
							}
						}
						html += '</div>'; // content
					html += '</div>'; // box
					d_i++;
				}
			}
		}
		if ( html ) {
			var html = '<div id="grabber" style="background-color: white; border: 1px solid black; -webkit-border-radius: 10px; -webkit-border-bottom-right-radius: 0; -moz-border-radius: 10px; -moz-border-radius-bottomright: 0; border-radius: 10px; border-bottom-right-radius: 0; border: 1px solid black; border-right-width: 0px; border-bottom-width: 0px; bottom: 0px; display: none; max-height: 80%; margin: 0; right: 0px; position: fixed; padding: 0; padding-left: 10px; padding-right: 10px; margin: 0; overflow: auto; padding: 10px; max-width: 80%; min-width: 300px;">' + "\n" + '<div class="grabber_title" style="border: 1px solid #000000; background-color: #F4F4F4; border-bottom-color: gray;">' + headline + '</div>' + "\n" + html + "\n" + '<div class="grabber_title" style="border: 1px solid #000000; background-color: #F4F4F4; border-bottom-color: gray;">' + headline + '</div>' + "\n" + '</div>' + "\n" + '<div id="grabber_button" style="bottom: 10px; cursor: pointer; right: 0px;  background-color: white; -webkit-border-radius: 10px; -moz-border-radius: 10px; border-radius: 10px; margin-right: 12px; padding-left: 10px; padding-right: 10px; position: fixed; border: 1px solid silver;" onclick="jQ ( \'#grabber\' ).toggle ();">GRABBER</div>' + "\n";
			jQ ( 'body' ).append ( html );
		}
		// if ( sjlgoc.debug ) console && console.log ( 'serienjunkies_grabber () end', headline, downloads );
	} else {
		/*
		if ( sjlgoc.current_timeout < sjlgoc.maximum_timeout ) {
			sjlgoc.current_timeout++;
			window.setTimeout ( "serienjunkies_grabber()", sjlgoc.timeout );
			// if ( sjlgoc.debug ) console && console.log ( 'retry in 5 seconds' );
		} 
		else 
		*/
		if ( typeof console !== 'undefined' ) {
			console && console.log ( 'maximum timeout reached' );
		}
	}
}

console && console.log ( 'typeof serienjunkies_grabber : ', typeof serienjunkies_grabber );
console && console.log ( 'typeof serienjunkies_headline_grabber : ', typeof serienjunkies_headline_grabber );
console && console.log ( 'typeof serienjunkies_link_grabber : ', typeof serienjunkies_link_grabber );

// load jQuery and execute the main function
addJQuery ( serienjunkies_grabber );

// if ( sjlgoc.debug ) console && console.log ( 'Serienjunkies.org Download Links Grabber END' );