// ==UserScript==
// @name           pcberza.rs ads drop
// @namespace      pcberza_rs_ads_drop
// @description    pcberza.rs ads drop
// @include        http://pcberza.rs/komponente/*
// @include        http://pcberza.rs/racunari/*
// @include        http://pcberza.rs/laptop/*
// @include        http://pcberza.rs/tehnika/*
// @include        http://pcberza.rs/foto/*
// @include        http://pcberza.rs/telefoni/*
// ==/UserScript==
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
        if (typeof unsafeWindow.jQuery == 'undefined')
		{
            window.setTimeout(GM_wait, 100);
        } else {
			var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement, GM_JQ = document.createElement('script');
			GM_JQ.type = 'text/javascript';
			GM_JQ.id = 'ads_remove';

			GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
			
			document.getElementById('ads_remove').innerHTML = 'var tables = $("table"); $(tables[0]).remove();$(tables[1]).remove();$(tables[4]).remove();$(tables[5]).remove();$(tables[7]).find("td:first").next().remove();'+
			'var bdy = $(tables[7]).find("td:first").find("table"); $(bdy[1]).remove(); $(bdy[2]).width("100%"); $($(bdy[2]).find("tr")[1]).find("td:first").remove().next().remove(); $(".adresa").width("110px");$(".din").width("70px");$(".tbprice_date").width("40px");$(".naziv").width("643px");$(".box, .box_title").width("100%");'+
			'$(".empty2,.empty5,.empty10").remove(); $(".pt-mid").height("32px");';
		}
    }

// All your GM code must be inside this function
    function letsJQuery()
	{
		
    }