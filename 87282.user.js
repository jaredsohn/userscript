//GC SwissMaps
//Copyright (c) 2010+ c-dev.ch
//Released under the GPL license
//http://www.gnu.org/copyleft/gpl.html
//Thanks to swissgeocache and swissgeocache.ch for inspiration

// ==UserScript==
// @name		GC SwissMaps
// @namespace	http://www.c-dev.ch/
// @version 	9.9.9
// @date	 	12.11.2011
// @author		neisgei
// @description	Erweitert die Cache-Detail geocaching.com-Seiten um Swissgrid und Dezimalkoordinaten. Zusaetzlich werden Links zu diversen Schweizerkarten angezeigt.
// @include		http://*.geocaching.com/*
// @require		http://gcxxxxx.appspot.com/static/jquery-gm-1.4.2.min.js
// @require		http://www.c-dev.ch/geocaching/greasemonkey/gcswissmaps/jquery-ui-1.8.5.custom.min.js

// @require		http://cloud.github.com/downloads/enriquez/ezpz-tooltip/jquery.ezpz_tooltip.js 
// ==/UserScript==

$ = jQuery.noConflict(true);

InsertAlert();

function InsertAlert(){
    var html_test = '<div class="ui-widget"><div class="ui-state-error ui-corner-all" style=" padding: 0 .7em;"><p style="font-size: 150%;"><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>'+
                    '<strong>WICHTIG!</strong> GC SwissMaps wird nicht mehr weiterentwickelt und durch GeoMaps ersetzt</p><p><b>Bitte deinstallieren sie GC SwissMaps</b> und verwenden sie das neue nachfolger Script <b>GeoMaps</b>. '+
                    '<br /><a href="http://www.c-dev.ch/geomaps/" target="_blank" style="font-size: 150%;">GeoMaps kann hier heruntergeladen werden...</a></p>'+
                    '<div  style="margin-bottom: 10px"><span id="closeAlert"><a href="#"><span class="ui-icon ui-icon-close"  style="float: left; margin-right: .3em;"></span>Schliessen</a> </span>'+
                    '&nbsp;&nbsp;<input id="showAgain" type="checkbox" value="" />Heute nicht mehr anzeigen (Sie werden einen Tag lang nicht mehr auf die neue Version hingewiesen)</div></div></div>'

    var closed = GM_getValue('SUC_reminder_close', false);
    if(!closed)
    {
        $('body').children(':first').prepend(html_test);
    }
    else
    {
        GM_log((parseInt(GM_getValue('SUC_last_reminder')) + 86400000 + ' -- ' + parseInt(new Date().getTime())));
        if ((parseInt(GM_getValue('SUC_last_reminder', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms) 86400000
        {
            GM_setValue('SUC_reminder_close', false);
            GM_setValue('SUC_last_reminder', new Date().getTime()+'');
            $('body').children(':first').prepend(html_test);
        }
    }

    $('#closeAlert').click(function(){
       if($('#showAgain').is(':checked')) {
            GM_setValue('SUC_reminder_close', true);
        }
       $('.ui-widget').hide();
    });
}