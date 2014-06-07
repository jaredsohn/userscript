// ==UserScript==
// @name           Jpager mangareader mobile
// @version        0.13
// @namespace      
// @author         stansmith
// @description    autopager written in  jquery for browsers like opera mobile. lots of specific sites optimizations.
// @include        http://www.mangareader.net/*
// @run-at         document-end   
// @require        http://code.jquery.com/jquery-1.8.2.min.js
// @require        http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js
// @updateURL        https://userscripts.org/scripts/source/158384.meta.js
// @downloadURL      https://userscripts.org/scripts/source/158384.user.js
// @copyright      2013+, stansmith
// ==/UserScript==
/*
 * jpager
 *
 * GPL license.
 *
 * only for mobile browser. only tested on opera mobile emulator.
 * 
 */
//
var Cpage = window.location.href;
//
function cleanPage() {
//
//code to expand pictures on mangareader
//        
        if (Cpage.indexOf('mangareader.net') >= 0)  {
		    $('#zoomer,div[class=zoomimg zoombottom]').remove();
            $('div#imgholder').css({'text-align' : 'center','width' : 'auto'});
            $('img#img').css({'width' : 'auto','height' : 'auto','border-width' : '5px','border-style' : 'solid','border-color' : 'black','display':'block','margin-left':'auto','margin-right':'auto'});
        }
//
};
//
function Pload() { 

    $(window).data('ajaxready', false);
	
	var Linkref = $('#imgholder a').last().attr('href');
	
	if (Linkref == undefined) return;
	
    var d1 = document.createElement('div');
   
    d1.id = "div_" + new Date().getTime().toString();
    
    $('#imgholder').last().append(d1);
	
	var nlink = 'http://www.mangareader.net' + Linkref;
   
	$(d1).load(nlink+' #imgholder', function(){
	
		$(this).trigger('create');
		
		cleanPage();

		$(window).data('ajaxready', true);
		
	});

};
//
//
$(window).scroll(function() {
		
    if ($('body').offset().top + $('body').height() <= $(document).scrollTop() + $(window).height()*2) {
	          
            if ($(window).data('ajaxready') == false) return;
     
            Pload();
		}
});
//
//
$(document).ready(function() {

// junk removal
if (Cpage.indexOf('mangareader.net') >= 0)  {
	$('#bottomchapter,#adfooter,#wrapper_footer,#prefetchimg,#adtop,#adbottomright2').remove();
}

// load first page
 Pload();
    
});
//