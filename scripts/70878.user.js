
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
// @name          Wykop, szybki zakop
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Wykop, szybki zakop
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
		
		var a_jvote = $('.options a.jvote');

		if(a_jvote.length > 0) {

			a_jvote.each( function() { 
			
				var href_dig = $(this).attr('href');
				
				var id = eval($(this).attr('class').split(' ')[1]);

				var ul = $('<ul class="slide-list"></ul>');
				var url_title = 'xxx';
				var li_z = $('<li><a title="#" href="#"><span><em>zakop</em></span></a></li>');
				var ul_bury = $('<ul class=\'jbury {id:'+id+'}\'></ul>');
				ul_bury.append($('<li class="{reason:1}"><a href="http://www.wykop.pl/link/bury/'+id+'/'+url_title+'/-1/'+id+'/idReason,1,log_ref_0,link,log_ref_m_0,index"><span>duplikat</span></a></li>'));
				ul_bury.append($('<li class="{reason:2}"><a href="http://www.wykop.pl/link/bury/'+id+'/'+url_title+'/-1/'+id+'/idReason,2,log_ref_0,link,log_ref_m_0,index"><span>spam</span></a></li>'));
				ul_bury.append($('<li class="{reason:3}"><a href="http://www.wykop.pl/link/bury/'+id+'/'+url_title+'/-1/'+id+'/idReason,3,log_ref_0,link,log_ref_m_0,index"><span>informacja nieprawdziwa</span></a></li>'));
				ul_bury.append($('<li class="{reason:4}"><a href="http://www.wykop.pl/link/bury/'+id+'/'+url_title+'/-1/'+id+'/idReason,4,log_ref_0,link,log_ref_m_0,index"><span>treść nieodpowiednia</span></a></li>'));
				ul_bury.append($('<li class="{reason:5}"><a href="http://www.wykop.pl/link/bury/'+id+'/'+url_title+'/-1/'+id+'/idReason,5,log_ref_0,link,log_ref_m_0,index"><span>nie nadaje się</span></a></li>'));
				
				li_z.append(ul_bury);
				ul.append(li_z);
				
				var el1 = $(this).parent().parent().parent();
				el1.append('<div style="clear:both">');
				el1.append(ul);
				

			});

			$(".jbury li").click(function () {
				var c = unsafeWindow.www_base + "ajax/link/bury/type," + $(this).metadata().reason + ",link," + $(this).parent().metadata().id + ",hash," + unsafeWindow.hash;
				var ul_bury = $(this).parents('.jbury');
				$.getJSON(c, {}, function (d) {
					if (d.error) {
						alert(d.error);
						return
					}
					//$(".jbury").parent().parent().fadeOut(150).html('<a href="#" title="#"><span><em>zakopane</em></span></a>').fadeIn(150)
					ul_bury.parent().parent().fadeOut(150).html('<a href="#" title="#"><span><em>zakopane</em></span></a>').fadeIn(150)
				});
				return false
			});
			
		}

			

    }
	
	

