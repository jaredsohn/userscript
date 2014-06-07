// ==UserScript==
// @name           Tunaranch Twitter Spam Report
// @namespace      *.twitter.com
// @description    Makes it easier to report spam to twitter
// @include        https://twitter.com/*
// @exclude       http://twitter.com/
// @exclude        http://twitter.com/home*
// @exclude        https://twitter.com/home*
// ==/UserScript==

//Variant of @nullvariable's script

$ = unsafeWindow.jQuery;  
//console.log( $('p') );  

var twitterspam_user = $("meta[name='page-user-screen_name']").attr("content");
var twitterspam_reportspam_link = 'http://twitter.com/home/?status=d+spam+@' + twitterspam_user + '+is+spam';

$(document).ready(function() {
   $("ul[class='sidebar-actions']").append("<li><a style='color: grey;' href=\"" + twitterspam_reportspam_link + "\">report as spam</a></strong></li>");
});