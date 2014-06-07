// ==UserScript==
// @name ComMOd (2.0)
// @namespace ClayZB
// @description Fix the "Support Team" to be "Global Support Team" again. Also labels the commies for what they truly are.
// @include http://if.invisionfree.com/*
// ==/UserScript==

$ = unsafeWindow.jQuery;
jQ_ready();
$("#stats_legend a.member[href=http://if.invisionfree.com/online/?g=8]").html('<strong><span style="color:#555;">Teh Smelleh Groupies</span></strong>');
function jQ_ready() {
$("dl.user_info dd:contains('Support Team')").html('Teh Smelleh Groupies');
$("select[name=group] option:contains('Support Team')").html('Teh Smelleh Groupies');
$("#stats_legend a.member[href=http://if.invisionfree.com/online/?g=7]").html('<strong><span style="color:#F05B78;">Most Awesome Peeps ever</span></strong>');
$("dl.user_info dd:contains('Community Team')").html('Most Awesome Peeps ever');
$("select[name=group] option:contains('Community Team')").html('Most Awesome Peeps ever');
$("a.member strong span:contains('Aaron')").add("a.member strong span:contains('Tim')").add("a.member strong span:contains('Clay')").add("a.member strong span:contains('Lindsey')").add("a.member strong span:contains('ElementalAlchemist')").attr('style','color:#F05B78;');
$("a.member strong span:contains('Ben')").add("a.member strong span:contains('Tony')").add("a.member strong span:contains('Jory')").add("a.member strong 

span:contains('Pete B')").add("a.member strong span:contains('Jonathan')").add("a.member strong span:contains('Nicolas')").attr('style','color:#555;');
}