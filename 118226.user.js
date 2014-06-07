// ==UserScript==
// @name           Gismeteo shit free
// @namespace      gm
// @author         @govori_da
// @website        http://twitter.com/govori_da
// @description    Makes Gismeteo weather pages shit free
// @include        http://www.gismeteo.ru/city/legacy/*
// @include        http://www.gismeteo.ru/city/hourly/*
// @include        http://www.gismeteo.ru/city/daily/*
// @include        http://www.gismeteo.ru/city/weekly*
// @include        http://www.gismeteo.ru/city/busy/*
// @include        http://www.gismeteo.ru/city/gm/*
// ==/UserScript==



var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');

            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;

            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }



    function letsJQuery() {
        var $weather = $('div[id="weather-old"], div[id="weather-hourly"], div[id="weather-daily"], div[id="weather-weekly"], div[id="weather-busy"], div[id="geomagnetic"]');
		$('body').prepend($weather);
		$weather.css('margin', '50px auto').css('float','none');
        $('body script, body #page').each(function($i){
			$(this).remove();
		})
    }
