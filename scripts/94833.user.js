// BetterBlaze
// version 0.1 BETA!
// 2011-01-03
// Copyright (c) 2010, Brian Fegter
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "BetterBlaze", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          BetterBlaze
// @namespace     http://wordpresskitchen.com/greasemonkey/
// @description   Hides next story popups when viewing comments and moves the comment box above the comments list.
// @include       http://www.theblaze.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

/* Remove Next Story */
$('#nextStory').remove();

/* Remove Ads */
//$('.inline-ad, .ad, .one-third > a, .one-third > object, .one-third > iframe, #blogadslot, #google_ads_frame1_anchor, .frontpagead').remove();

/* Add Latest Comment Link */
$('.navigation:first').each(function(){
    var navText = $(this).text();
    var navNew = navText.split('of ');
    var latest = navNew[1].trim();
    var link = $('link[rel=canonical]').attr('href');

    if(latest != 1){
        $(this).prepend('<a class="left red button" style="margin-right:10px;" href="'+link+'comment-page-'+latest+'/#comments">Latest Comments</a>')
    }
});

/* Move Comment area To Top */
var blazeComments = document.getElementById('respond');
  
function prependElement(parentID,child)
{
    parent=document.getElementById(parentID);
    parent.insertBefore(child,parent.childNodes[0]);
}

if (blazeComments) {
    prependElement('comments',blazeComments)
}

/* Reverse Comment Order Per Page */
$('ul.comments li').each(function(){
    $(this).prependTo($(this).parent());
});

/* Clean up Comment Area */
$('ul.comments li.comment').css({'padding-top':'0px', 'font-size':'11px', 'padding-bottom':'10px'});
$('ul.comments p').css({'margin-bottom':'10px', 'font-size':'12px' });
$('ul.comments li a.report').css('margin-top', '0');
$('.report').css({'text-decoration' : 'none', 'color':'#b4b4b4'});

/* Front Page Cleanup */
$('li.story').css({'padding-bottom':'25px'});
$('li.story h5').css({'font-size':'27px', 'color':'#505050'});
$('.stories-title').remove();

/* Blog Cleanup */
$('#blogHeader .title-wrap').remove();