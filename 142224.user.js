// ==UserScript==
// @name        Forum Listing Link
// @description Adds a link to the parent forum listing to the bottom of the thread
// @namespace   net.entensity.ForumListingLink
// @include     http://forums.entensity.net/showthread.php?t=*
// @include     http://forums.entensity.net/showthread.php?p=*
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @version     1.2
// ==/UserScript==

// Add button to the page
var navbits = $('#breadcrumb>.floatcontainer>li[class=navbit]>a');
var link = $(navbits[navbits.length - 1]).attr('href');
$('#showthread_navpopup>a[class=textcontrol]').after(" <a href='" + link + "' class='textcontrol'>Home</a>");

// Add breadcrumb to bottom
var breadcrumb = $('#breadcrumb').clone();
$('.blockfoot.actionbuttons').append(breadcrumb);

// Disable Quick Navigation bar
//$('div.navpopupmenu.popupmenu.nohovermenu').attr('style', 'display:none;');