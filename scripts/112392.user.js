// ==UserScript==
// @name           Schulterglatze.de - Kameraden Online
// @namespace      schulterglatze
// @description    Zeigt auf jeder Seite in einer Box an, welcher Kamerad gerade online ist.
// @include        www.schulterglatze.de
// ==/UserScript==

var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 1000);
			
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }
	
	function rmv(){
		alert("sds");
	}


// All your GM code must be inside this function
    function letsJQuery() {
	
	$('body').append('<div id="smallProfil" class="fo" style="height:212px;position:fixed;top:1px;right:1px;z-index:999"></div>');
	$('.fo').append('<div class="smallProfilDG">Kameraden online</div>');
	$('.fo').append('<div class="smallProfilAttribute"></div>');
	$('.fo .smallProfilAttribute').load('http://www.schulterglatze.de/stammakte/kameraden #kameraden');
	$('.fo .smallProfilAttribute').css("padding-left","4px");
	
	var fo = $('.fo').outerWidth();
	var offset = $('#wrapper').offset().left;
	if(offset<fo){
	$('.fo').css("display","none");
	} else {
	$('.fo').css("display","inline-block");
	}

	$(window).resize(function(){
	var fo = $('.fo').outerWidth();
	var offset = $('#wrapper').offset().left;
	if(offset<fo){
	$('.fo').css("display","none");
	} else {
	$('.fo').css("display","inline-block");
	}
	});
	function rmv(){
	$('.fo .vorzeigesoldat').remove();
	$('.fo table').css({"width":"220px","font-size":"12px"});
	$('.fo thead').remove();
	$('.fo tbody tr').each(function(){
		$(this).children('td').eq(2).remove();
		$(this).children('td').last().remove();
		$(this).children('.mitte').eq(0).css("width","25px");
	});
	}
	window.setTimeout(rmv, 2000);
	}