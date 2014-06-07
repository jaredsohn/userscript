// ==UserScript==
// @name grepoSkipReportAnimation
// @author wBw
// @license Do what you want!
// @namespace wBs_
// @include http://*.grepolis.*/game/report*
// @description Automatic skip of animations in reports.
// ==/UserScript==

(function () {

var uW;
if (typeof unsafeWindow === 'object'){
uW = unsafeWindow;
} else {
uW = window;
}

//get jQuery
var $ = uW.jQuery;

//add a console function
var l = function (msg)
{
if ( GM_log )
GM_log( msg );
}


var rv = uW.ReportViewer;
if (rv && rv.elm.report_classic )
{
// Because of some hard coded delays a real "fast forward" is not possible. So skip it all.

// Needed??
rv.conf.delay_after_intro= 0;
rv.conf.delay_animate = 0;
rv.conf.delay_next_round= 0;
rv.conf.duration_fade_frame= 0;
rv.conf.duration_fade_units= 0;

// Needed??
rv.animateUnit = function() {};
rv.animateDef = function() {};
rv.animateAtt = function() {};


rv.reset();
rv.elm.report_modern.hide();
rv.elm.report_classic.show();
l("Skipped.");
}
else
l("No animated Report");

// TODO: Add Button to re-play animation.


}()); 