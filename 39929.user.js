// ==UserScript==
// @name           Twitter Spam Report
// @namespace      *.twitter.com
// @description    Makes it easier to report spam to twitter
// @include        https://twitter.com/*
// @include        http://twitter.com/*
// @exclude        http://twitter.com/home*
// @exclude        https://twitter.com/home*
// ==/UserScript==

//http://twitter.com/home/?status=@nullvariable+is+the+coolest!

$ = unsafeWindow.jQuery;  
console.log( $('p') );  

var twitterspam_user = $("h2").text().replace(/ /g,'');
//twitterspam_user.html(twitterspam_user($("a").remove()).html);
var twitterspam_reportspam_link = 'http://twitter.com/home/?status=d+spam+@' + twitterspam_user + '+is+spam';

//alert(twitterspam_user);
$(document).ready(function() {
   $("#footer > ul").append("<li><strong><a href=\"" + twitterspam_reportspam_link + "\">Report Spam</a></strong></li>");
   
 });