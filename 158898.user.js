// ==UserScript==
// @name        mrtzcmp3
// @namespace    http://userscripts.org/users/goodgy
// @description mrtzcmp3 anti iMesh button
// @include     http://www.mrtzcmp3.net/D?*
// @include     http://www.mrtzcmp3.net/L?*
// @include     http://www.mrtzcmp3.net/*
// @include     http://mrtzcmp3.net/D?*
// @include     http://mrtzcmp3.net/L?*
// @include     http://mrtzcmp3.net/*
// @include     http://*.mrtzcmp3.net/D?*
// @include     http://*.mrtzcmp3.net/L?*
// @include     http://*.mrtzcmp3.net/*
// @version     1
// ==/UserScript==

// globals
var $ = unsafeWindow.jQuery;
var console = unsafeWindow.console;
// Make button on main page direct download
var directdownload = 1;
// Delete advertisements and imesh button
var deleteadvert = 1;
// Automaticly show bitrate
var showbitrate = 1;

// Listen and Download page //

// set imesh button no
$('input').attr('checked', 0);
// delete advertisements
$("img[src*='images/im/dutch.gif']").css('display', 'none');
// make table bigger
$('#macTable').css('width','50%');
// a href maken van logo
$('img[src="logoy.gif"]').wrap('<a href="javascript:document.location(-1);"><img src="logoy.gif"></a>');
if(deleteadvert === 1){
// delete HR in table
$('td[colspan=10]').css('display', 'none');
// hide imesh button
$('input[id=]').css('display', 'none');
// hide imesh text
$('span[style*="color:silver"]').css('display', 'none');
}else{
// show HR in table
$('td[colspan=10]').css('display', 'block');
// show imesh button
$('input[id=]').css('display', 'block');
// show imesh text
$('span[style*="color:silver"]').css('display', 'block');
}
// hide share buttons
$('div[class="addthis_toolbox addthis_floating_style addthis_32x32_style"]').css('display', 'none');

// main page //

// show bitrate
if(showbitrate === 1){
$('span[id*="bitrate_"] a:first-child').each(function( index ) {
  $(this).click();
});	
}
// direct download
if(directdownload === 1){
$('a[href*="D?"]' ).click( function (gsighs) {
gsighs.preventDefault();
var url = $(this).attr('href');
var equalPosition = url.indexOf('?');
var number = url.substring(equalPosition + 1); //Split the string and get the number
var equalPosition2 = url.indexOf('_');
var number2 = url.substring(equalPosition2); //Split the string and get the number
number=number.replace(number2,'');
document.location="http://www.mrtzcmp3.net/"+number+".mrtzcmp3";
});
}
// delete blue tr
$('td[bgcolor="#9AC0CD"]').css('display', 'none');
$('td[bgcolor="#50A6C2"]').css('display', 'none');
$('td[bgcolor="#ADD8E6"]').css('display', 'none');