// ==UserScript==
// @id             what-toggle-minimal-stats
// @name           What.CD: Minimal Mod Toggle userinfo_stats visibility
// @namespace      soundsofthem)))
// @author         soundsofthem
// @version        0.5
// @description    Hide user_info stats on minimal mod stylsheet.
// @updateURL      https://userscripts.org/scripts/source/105151.meta.js
// @include        http*://*what.cd/*

// @match          *://*.what.cd/*

// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js

// @updated        21 NOV 2013
// @since          20 NOV 2013
// ==/UserScript==

GM_setValue('lastuse', (GM_getValue('lastuse', 0) + 1));
var stats = $('#userinfo_stats');
if(GM_getValue('hidden', false) == true) {
	stats.css('margin-left', stats.outerWidth());
}

$('#wrapper').append('<div id="toggle_holder" style="position: fixed; width: 50px; bottom: 0; left: 0;'
                   + 'padding-top: 200px; padding-right: 120px; z-index: 200;"><button id="stats_toggle"'
                   + 'type="button" style="position: absolute; background: #5af; border-bottom: 20px solid #5af !important;'
                   + 'border-right: 0; border-left: 0; border-top: 0; height: 28px;'
                   + 'width: 50px; left: 0; bottom: 0;">&nbsp;&nbsp;</button></div>');

stats.prepend('<li>&nbsp;</li>');
stats.css('opacity', '.9','!important');

if(GM_getValue('hidden', false) == true) {
    switch(GM_getValue('lastuse', 0))
    {
        case 0: $('#stats_toggle').css('opacity', .8); break;
        case 1: $('#stats_toggle').css('opacity', .6); break;
        case 2: $('#stats_toggle').css('opacity', .5); break;
       	case 3: $('#stats_toggle').css('opacity', .5); break;
        case 4: $('#stats_toggle').css('opacity', .3); break;
        default: $('#stats_toggle').css('opacity', .1); break;
    }
    $('#toggle_holder').hover(function() {
        $('#stats_toggle').animate({
            opacity: 1
        }, 200); },
        function() {
        $('#stats_toggle').animate({
            opacity: .5
    	}, 200);
	});
}

if(GM_getValue('hidden', false) == false) {
$('#stats_toggle').css('opacity', .4);
$('#toggle_holder').hover( function() {
    $('#stats_toggle').animate({
            opacity: 1
    }, 200); },
    function() {
    $('#stats_toggle').animate({
            opacity: .4
    }, 200);
});
}

$('#stats_toggle').click(function() {
GM_setValue('lastuse', 0);
stats.animate({
  marginLeft: parseInt(stats.css('marginLeft'),10) == 0 ?
    (stats.outerWidth()) :
    0
}, 300);
$('#stats_toggle').css('opactity', 1);
if (GM_getValue("hidden", false) == true) {
    GM_setValue("hidden", false);
}
else {
   GM_setValue("hidden", true);
}
});