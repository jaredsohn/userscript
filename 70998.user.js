
// Wykop, szybki zakop
// version 0.1 BETA!
// 
// Copyright (c) 2010 uterpendragon1
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.

//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          brakujace zakopy
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   brakujace zakopy
// @include       http://*.wykop.pl/*
// ==/UserScript==


//var console = unsafeWindow.console;

// Add jQuery
    /*
	var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);
	*/

// Check if jQuery's loaded
    /*
	function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();
	*/

	$ = unsafeWindow.jQuery; 
	letsJQuery();
	
// All your GM code must be inside this function
		function letsJQuery() {

	
			var options_panel = $('ul.options:not(:has(li.digin)):has(a.jvote)');
			
			if(options_panel.length > 0 ) {
				
				options_panel.each( function() {
					
					var znalezisko_url = $(this).find('li.comments a').attr('href');
					
					var op_panel = $(this);
					//var znalezisko_details_panel = $('<div></div>').load(znalezisko_url+' ul.tabs');
					$('<div></div>').load(znalezisko_url+' #body-container', function() {
						
						var zakopy = $($(this).find('ul.tabs li')[3]).find('strong').html();
						var ul_slide_list = $(this).find('#content-entry .slide-list');
						ul_slide_list.addClass('jbury');
						ul_slide_list.find('ul.jbury').removeClass('jbury');
						ul_slide_list.find('a em').html('zakop (<strong>'+zakopy+'</strong>)');
						var li_digin = $('<li class="digin"></li>');
						li_digin.append('<span class="slash">|</span>');
						li_digin.append(ul_slide_list);

						li_digin.find('.jbury >li>a').toggle(function () {
							$(this).next().show();
							return false
						}, function () {
							$(this).next().hide();
							return false
						});
						
						$(op_panel.find('li')[0]).after(li_digin);
						
						li_digin.find("ul li").click(function () {
							var c = unsafeWindow.www_base + "ajax/link/bury/type," + $(this).metadata().reason + ",link," + $(this).parent().metadata().id + ",hash," + unsafeWindow.hash;
							var d = $(this);
							$.getJSON(c, {}, function (e) {
								if (e.error) {
									alert(e.error);
									return
								}
								d.parent().parent().fadeOut(150).html('<a href="#" title="#"><span><em>zakopane</em></span></a>').fadeIn(150).css("background", "")
							});
							return false
						});

					});
			
					
				} );
			
			}

			
		}


	
	

