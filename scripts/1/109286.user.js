// MegaReg
// Version 2.1
// Feb 16, 2014
// Copyright (c) 2011 USA, Lone Hood (TM)
// Released under the GNU General Public License, version 3 (GPL-3.0)
// https://gnu.org/licenses/gpl-3.0.txt
//
// --------------------------------------------------------------------
//
// Changes in this version:
//
// Added IMDB and Tomato ratings
//
// added a link to mobile IMDB site
//
// Autoclicks FileNuke & UploadC pages 
// to get you straight to your videos!
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: 
// https://addons.mozilla.org/en-US/firefox/addon/748
//
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "MegaReg", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          MegaReg
// @namespace     Doyousketch2
// @description   Various enhancements for video sites
//
// @grant GM_info
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_xmlhttpRequest
// @grant GM_registerMenuCommand
//
// @include       http://www.primewire.ag*
// @include       *1channel.*
// @include       *megaupload.com/*
// @include       *firedrive.com/*
// @include       *sockshare.com/*
// @include       *videoweed.es/*
// @include       *novamov.com/*
// @include       *movshare.net/*
// @include       *ufliq.com/*
// @include       *movpod.in/*
// @include       *daclips.in/*
// @include       *gorillavid.in/*
// @include       *gorillavid.com/*
// @include       *filenuke.com/*
// @include       *uploadc.com/*
// @include       *nosvideo.com/?v=*
// @include       *shortform.com/*
// @include       *letmewatchthis.*
// @include       *watchthisletme.com/*
// @include       http://www2.zshares.net/video*
//
// @include       *m2pub.co*
// @include       *ads.adk2.co*
// @include       http://ad.directrev.co*
// @include       https://cinabliss.co*
// @include       https://cinechest.co*
// @include       https://cinahub.co*
// @include       https://cinapalace.co*
// @include       https://cinaplay.co*
// @include       https://123vidz.co*
// @include       https://myflixhd.co*
// @include       https://newflixhd.co*
// @include       https://filmzhub.co*
// @include       https://filmlair.co*
// @include       https://flix123.co*
// @include       https://flix247.co*
// @include       https://flixden.co*
// @include       https://flixjunky.co*
// @include       https://flixattic.co*
// @include       https://hdreelz.co*
// @include       https://megaflix.ne*
// @include       https://5starvidz.co*
// @include       https://247vidz.co*
// @include       https://247filmz.co*
// @include       https://vidzstar.co*
// @include       https://vidzplay.co*
// @include       https://www.quibids.com*
// @include       https://quickfilmz.co*
// @include       https://reelzhot.co*
// @include       http://www.itshd.co*
// @include       http://www.adcash.co*
// @include       http://ads.affbuzzads.co*
// @include       http://ads.pushplay.co*
// @include       http://ads.cineble.co*
// @include       http://ads.cinamuse.co*
// @include       http://ads.cinemaden.co*
// @include       http://ads.filmlush.co*
// @include       http://ads.movielush.co*
// @include       http://ads.moviease.co*
// @include       http://ads.reelvidz.co*
// @include       http://ads.reelhd.co*
// @include       http://ads.flixaddict.co*
// @include       http://www.reduxmediia.co*
// @include       http://www.webtrackerplus.co*
//
// @require       http://sizzlemctwizzle.com/109286.js
// @require       http://code.jquery.com/jquery-1.7.1.min.js
//
// ==/UserScript==
// Redirects old and fake links back to the main site to keep you safe
if (window.location.hostname.match('www.letmewatchthis.*|letmewatchthis.*|www.watchthisletme.*|watchthisletme.*|www.1channel.*|1channel.*')) {
    window.location = ('http://www.primewire.ag')
};
//=======================================
// LetMeWatchThis | 1channel | PrimeWire
//=======================================
if (window.location.hostname.match('www.primewire.ag')) {
    // Remove error message
    // $('div.error_message') .remove();
    // Remove ads
    $('div.col2 iframe') .remove();
    // Remove HD Sponsor links
    $('span.version_host script:contains("HD Sponsor")') .parent() .parent() .parent() .parent() .remove();
    // Dim background
    $('html body') .css('background-color', '#444466');
    $('div.col1') .css('background-color', '#AAAABB');
    $('div#first.actual_tab table.movie_version') .css('background-color', '#DDDDFF');
    $('div.col2') .css('background-color', '#DDDDFF');
    $('div.movie_info table tbody tr td span.movie_info_actors a') .css('color', '#004499');
    $('div.index_item a') .css('color', '#000022');
    $('div.col1 h1.titles span') .css('background-color', '#444466');
    $('div.download_link') .css('color', '#555555');
    $('h1.titles') .css('background', 'url(null)');
    $('h1.titles') .css('background-color', '#303050');
    $('div.main_body') .css('background', 'url(null)');
    $('div.footer') .css('background', 'url(null)');
    $('div.featured_movie_item a') .css('background', '#101030');
    // Make font more readable
    $('div.logged_links a') .css('color', '#882200');
    $('div.episode_prev_next a') .css('color', '#882200');
    $('span.help_link a') .css('color', '#882200');
    $('div.movie_info table tbody tr td:contains("Title")') .next() .wrap('<b></b>');
    // Users online
    $('div.users_online h3') .css('color', '#006600');
    $('div.users_online h3 span') .css('color', '#004400');
    $('div.users_online span.online_normal a') .css('color', '#0022CC');
    // Fix header
    $('html body') .css('background-image', 'url(null)');
    $('#search_term.box') .css('width', '200px');
    $('div.nav_tabs') .css('width', '420px');
    $('div.header_search') .css('width', '250px');
    // Nudge censorship link over
    $('div.header a') .css('right', '225px');
    $('div.header a') .css('top', '2px');
    $('div.header a') .css('height', '15px');
    // Enlarge PutLocker/FireDrive links so it's easier to find
    $('span.version_host script:contains("putlocker.com")') .parent() .css('font-size', '15px');
    $('span.version_host script:contains("putlocker.com")') .parent() .parent() .prev() .css('font-size', '17px');
    $('span.version_host script:contains("firedrive.com")') .parent() .css('font-size', '15px');
    $('span.version_host script:contains("firedrive.com")') .parent() .parent() .prev() .css('font-size', '18px');
    // Enlarge SockShare link so it's easier to find
    $('span.version_host script:contains("sockshare.com")') .parent() .css('font-size', '15px');
    $('span.version_host script:contains("sockshare.com")') .parent() .parent() .prev() .css('font-size', '17px');
    // Enlarge GorillaVid links so it's easier to find
    $('span.version_host script:contains("gorillavid.in")') .parent() .css('font-size', '15px');
    $('span.version_host script:contains("gorillavid.in")') .parent() .parent() .prev() .css('font-size', '18px');
    $('span.version_host script:contains("gorillavid.com")') .parent() .css('font-size', '15px');
    $('span.version_host script:contains("gorillavid.com")') .parent() .parent() .prev() .css('font-size', '18px');
    // Enlarge MovPod link so it's easier to find
    $('span.version_host script:contains("movpod.in")') .parent() .css('font-size', '16px');
    $('span.version_host script:contains("movpod.in")') .parent() .parent() .prev() .css('font-size', '18px');
    // Enlarge DaClips link so it's easier to find
    $('span.version_host script:contains("daclips.in")') .parent() .css('font-size', '16px');
    $('span.version_host script:contains("daclips.in")') .parent() .parent() .prev() .css('font-size', '18px');
    // Enlarge FileNuke link so it's easier to find
    $('span.version_host script:contains("filenuke.com")') .parent() .css('font-size', '15px');
    $('span.version_host script:contains("filenuke.com")') .parent() .parent() .prev() .css('font-size', '18px');
    // Enlarge UploadC link so it's easier to find
    $('span.version_host script:contains("uploadc.com")') .parent() .css('font-size', '15px');
    $('span.version_host script:contains("uploadc.com")') .parent() .parent() .prev() .css('font-size', '18px');
    // Enlarge NosVideo link so it's easier to find
    $('span.version_host script:contains("nosvideo.com")') .parent() .css('font-size', '14px');
    $('span.version_host script:contains("nosvideo.com")') .parent() .parent() .prev() .css('font-size', '18px');
    //
    // Views are an important indicator of a good link
    $('span.report_broken') .css('font-size', '9px') .parent() .css('width', '60');
    $('span.version_veiws') .css('font-size', '13px') .css('color', 'black') .parent() .css('width', '85');
    if (window.location.pathname.length > 1) {
       $('h1.titles:contains("Watch Featured Movies")') .appendTo('div.col2') .css('margin', '12px 8px') .css('padding', '0');
       $('div.featured_movies') .appendTo('div.col2') .css('margin', '0 20px 14px');
       $('.featured_movie_item') .css('width', 'auto');
       $('.featured_movie_item') .css('margin', '6px');
       $('.featured_movie_item a') .css('padding', '8px 12px');
       // IMDB mobile link
       $('div.mlink_imdb a') .clone() .attr('id', 'mobileIMDB') .insertAfter('div.mlink_imdb a');
       $('div.mlink_splitter:first') .clone() .insertAfter('div.mlink_imdb a:first');
       $('a#mobileIMDB') .attr('href', $('a#mobileIMDB') .attr('href') .replace('www','m') .replace('\/\?ref_=fn_a',''));
       // IMDB rating
       $('a#mobileIMDB') .clone() .attr('id', 'IMDB_id') .attr('width', '0px') .attr('height', '0px') .insertAfter('div.footer_left');
       $('a#IMDB_id') .attr('href', $('a#IMDB_id') .attr('href') .replace('http:\/\/m.imdb.com\/title\/',''));
       $('div.movie_info_actions iframe') .replaceWith('<a class="omdbRating">');

       var imdbId = $('a#IMDB_id') .attr('href');
       GM_xmlhttpRequest({
       method: "GET",
       url: "http://www.omdbapi.com/?i=" + imdbId + "&tomatoes=true",
       onload: function(response) {
          var omdbData = response.responseText;
          var omdbJSON = eval("(" + omdbData + ")");
		
       omdbRating = omdbJSON.imdbRating;
       omdbVotes = omdbJSON.imdbVotes;
       toMeter = omdbJSON.tomatoMeter;
           $('a.omdbRating') .text('Rating: ' + omdbRating + ' - - Votes: ' + omdbVotes + ' - - TomatoMeter: ' + toMeter);
       }
       });
    };
    // Fix page links
    $('div.pagination span') .next() .clone() .text('Next >') .insertBefore('div.pagination a:last') .css('font-size', 'larger') .css('font-weight', 'bold') .css('color', '#882200');
    $('div.pagination span') .prev() .clone() .text('< Prev') .insertAfter('div.pagination a:first') .css('font-size', 'larger') .css('font-weight', 'bold') .css('color', '#882200');
    // Add "Back to list" link
    $('div.stage_navigation h1.titles span a:first') .clone() .text('Back to List') .insertBefore('div.episode_prev_next a:contains(Next)') .after(' | ') .css('color', '#882200');
    // Click anywhere to close "Report Broken" windows
    $('div.ok_message:contains("Report has been sent")') .parents() .click(function() {
       window.close();
       });
};
//=======================
// PutLocker / FireDrive
//=======================
if (window.location.hostname.match('www.firedrive.com|firedrive.com')) {
    // Dim background
    $('body') .css('background-color', '#000');
    $('div.fdva_container') .css('background', '-moz-linear-gradient(83deg, #000 65%, #000080)');
    $('.external_top_bg') .css('background', '#000');
    $('.standalone_footer_container') .css('background-color', '#000');
    // increase "Continue to file..."
    $('div.fdva_text_wrap a.continue') .css('font-size', '28px');
    $('div.fdva_text_wrap a.continue') .css('color', '#f3a637');
    // Remove ads
    $('div#fdvabox div') .remove();
    // Autoclick
    $('div.fdva_text_wrap a.continue') .delay(800) .click();
    $('div#video_fdva a#play_video') .click();
};
//===========
// SockShare
//===========
if (window.location.hostname.match('www.sockshare.com|sockshare.com')) {
    // Dim background
    $('html body') .css('background-color', '#444444');
    $('div.site-body') .css('background-color', '#222222');
    $('div.item_confirm_page table.choose_speed tbody tr th') .css('background-color', '#999999');
    $('div.item_confirm_page') .css('background-color', '#333333');
    $('div.item_confirm_page h3') .css('background-color', '#777777');
    // Remove ad
    $('div.ad_728x90_top') .remove();
    // Remove table
    $('div.item_confirm_page table.choose_speed tbody tr:gt(0)') .remove();
    $('div.item_confirm_page table.choose_speed tbody tr th:gt(1)') .remove();
    $('div.item_confirm_page table.choose_speed tbody tr th:lt(1)') .remove();
    // Lights off
    $('#buttonWrapper') .css('width', '200px');
    $('#lightsOff') .css('font-size', '18px');
};
//===========
// VideoWeed
//===========
if (window.location.hostname.match('www.videoweed.es')) {
    // Dim background
    $('html body') .css('background', 'url(null)');
    $('html body') .css('background-color', '#112211');
    // Reduce top
    $('div#content') .css('margin-top', '5px');
    $('div#content div:first') .remove();
    $('table#playerpageads_table') .css('margin-top', '10px');
    // Remove ads
    $('#playerpageads_table tbody tr td:gt(0)') .remove();
    $('noscript') .remove();
    $('div#aad') .remove();
    $('div#content style:eq(0)') .remove();
    $('div#playerpage div:eq(0)') .remove();
    $('a:contains(Premium)') .remove();
};
//=========
// NovaMov
//=========
if (window.location.hostname.match('www.novamov.com')) {
    // Dim background
    $('html, body') .css('background-color', '#000000');
    $('div#content_block.clear') .css('background-color', '#003344');
    $('div#footer.clear') .css('background', 'url(null)');
    $('div#v_tab1.v_tab.blockborder') .css('background-color', '#336677');
    $('div#menu') .css('background', '#112233');
    $('#menu ul li a:link') .css('text-shadow', '1px 1px #000000');
    $('div#logo a img,div.last a.video_tab') .css('opacity', '0.6');
    // Reduce top
    $('div#header') .css('height', '125px');
    $('div#logo') .css('padding-top', '7px');
    // Remove ads
    $('div.top_banner') .remove();
    $('noscript') .remove();
    $('div#aad') .remove();
    $('div.span-30') .remove();
    $('body span embed') .remove();
    $('a:contains(Premium)') .remove();
    // Center vid
    $('.span-60') .css('float', 'none');
    $('.span-60') .css('width', 'auto');
    $('.span-58') .css('float', 'none');
    $('.span-58') .css('width', 'auto');
    $('div#v_tab1 h3') .css('text-align', 'center');
    $('div#v_tab1 p') .css('text-align', 'center');
};
//==========
// MovShare
//==========
if (window.location.hostname.match('www.movshare.net')) {
    // Dim box
    $('div#content_1.content') .css('background-color', '#446688');
    $('div.tabbed_area ul.tabs li a.active') .css('background-color', '#334455');
};
//========
// zShare
//========
if (window.location.hostname.match('www2.zshares.net|zshares.net')) {
    // Dim background
    $('div#main') .css('background', 'none repeat scroll 0 0 #000000');
    $('html body') .css('background', 'none repeat scroll 0 0 #333333');
    $('div#footer') .css('background', 'none repeat scroll 0 0 #000000');
    // Remove ads
    $('div#main div:gt(0) div:lt(3)') .remove();
    $('div#main div:gt(0) div:gt(0)') .remove();
    $('div#footer div') .remove();
    // Remove popup
};
//========
// MovPod
//========
if (window.location.hostname.match('www.movpod.in|movpod.in')) {
    // Dim background
    $('div#h-bg-1 div.h-bg-in') .css('background', 'black');
    $('.c1-box') .css('background', 'black');
    $('div#h-bg-1') .css('background', '#222222');
    $('div#height-all') .css('background', '#222222');
    $('ul#menu-main') .css('background', 'none');
    // Remove Ads
    $('div.ads_3col') .remove();
    // Fix download block
    $('div#pre-download-block') .css('margin-top', '0px');
};
//=========
// DaClips
//=========
if (window.location.hostname.match('www.daclips.in|daclips.in')) {
    // Dim header
    $('div#header-glow') .css('background', '-moz-linear-gradient(top, black 12%, #000080 82%, black 100%)');
    $('div#header-bg') .css('background', '-moz-linear-gradient(top, black 8%, #000080 58%, black 85%)');
    $('.btn') .css('background', '#222222');
    // Dim background
    $('div#h-bg-1 div.h-bg-in') .css('background', 'black');
    $('.c1-box') .css('background', 'black');
    $('div#h-bg-1') .css('background', '#222222');
    $('div#height-all') .css('background', '#222222');
    $('ul#menu-main') .css('background', 'none');
    // Dim footer
    $('div#footer-glow') .css('background', '-moz-linear-gradient(top, black 5%, #000080 41%, black 90%)');
    // Remove Ads
    $('div.ads_3col') .remove();
    $('frameset frame:first head') .remove();
    // Fix download block
    $('div#pre-download-block') .css('margin-top', '0px');
};
//============
// GorillaVid
//============
if (window.location.hostname.match('(www.|ads.)?gorillavid.in')) {
    // Dim header
    $('div#header-glow') .css('background', '-moz-linear-gradient(top, black 12%, #DB6200 82%, black 100%)');
    $('div#header-bg') .css('background', '-moz-linear-gradient(top, black 8%, #DB6200 58%, black 85%)');
    $('.btn') .css('background', '#222222');
    // Dim background
    $('div#h-bg-1 div.h-bg-in') .css('background', 'black');
    $('.c1-box') .css('background', 'black');
    $('div#h-bg-1') .css('background', '#222222');
    $('div#height-all') .css('background', '#222222');
    $('ul#menu-main') .css('background', 'none');
    // Dim footer
    $('div#footer-glow') .css('background', '-moz-linear-gradient(top, black 5%, #DB6200 41%, black 90%)');
    // Remove Ads
    $('div.ads_3col') .remove();
    $('div#midroll-div') .remove();
    $('frameset frame:first head') .remove();
    // Fix download block
    $('div#pre-download-block') .css('margin-top', '0px');
};
//==========
// FileNuke
//==========
if (window.location.hostname.match('(www.)?filenuke.com')) {
    // Remove Ads
    $('center#cent center a') .remove();
    // $('div#player_ads').remove();
    $('div.pop_block_login.pop_block') .remove();
    $('script[src^="http://www.reduxmediia.com"]') .remove();
    // $('frameset frame:first head script') .remove();
    // Dim background
    $('body') .css('background', '#202020');
    // Shrink header
    $('div.t_Download-file') .remove();
    $('div.column-l') .css('padding-top', '2px');
    $('div.column-l') .css('width', '500px');
    $('div.filename-row') .css('padding', '0px 0px 3px 3px');
    $('div.column-r') .css('padding-top', '2px');
    $('div#header-block1 div.wrap') .css('min-height', '28px');
    // Reduce table size
    $('center#cent table') .css('width', '800px');
    $('td.download0-line-1') .css('width', '170px');
    $('td.download0-line-2') .css('width', '170px');
    $('td.download0-line-3') .css('width', '170px');
    $('td.download0-line-1-2') .css('width', '50px');
    $('td.download0-line-2-1') .css('width', '50px');
    $('td.download0-line-3-1') .css('width', '50px');
    $('td.download0-line-3-3') .css('width', '50px');
    $('input.btn-big2-2') .css('font-size', '30px');
    $('input.btn-big2-2') .css('color', '#ff5300');
    // Scoot video left
    $('div#content center') .first() .remove();
    $('div#container.content-full') .css('padding-top', '0px');
    $('div#container.content-full div.wrap') .css('width', '800px');
    // Fix play button location
    $('a#vid_play') .css('margin-top', '0px');
    // Autoclick
    $('input.btn-big2-2') .delay(800) .click();
    $('a#vid_play') .delay(800) .click();
};
//==========
// UploadC
//==========
if (window.location.hostname.match('(www.)?uploadc.com')) {
    // Dim background
    $('body') .css('background', '#202020');
    $('div#footer') .css('background', '-moz-linear-gradient(top, #202020 10%, #E5F7FF 16%, #0c2961 23%, black)');
    $('td.mainbody') .css('background', '-moz-linear-gradient(top, #E5F7FF, #0c2961 3%, black 80%)');
    $('td.mainbody') .css('border-color', '-moz-use-text-color black');
    // Highlight Slow button
    $('input#ipcount') .css('font-size', '18px');
    $('input#prebut') .css('font-size', '10px');
    $('input#prebut') .css('background', '#505050');
    $('input#prebut') .parent() .parent() .css('background', '-moz-linear-gradient(top, #0c2961, black)');
    // Brighten title background so you can read it
    $('span.file_label') .parent() .css('font-size', '18px');
    $('span.file_label') .parent() .css('background', '#E5F7FF');
    $('a#f-logo img') .parent() .css('border', '2px solid black');
    // Enlarge error message
    $('div#content center b center:contains("This file has been removed due to")') .css('font-size', '22px') .parent() .parent() .children('div.relative') .css('height', '100px') .css('margin', '20px');
    // Autoclick
    $('input#ipcount') .delay(800) .click();
};
//==========
// NosVideo
//==========
if (window.location.hostname.match('nosvideo.com')) {
    // Dim background
    $('body') .css('background', '-moz-linear-gradient(top, black, #0c2961)');
    $('div#header') .css('background', 'black');
    $('div#timerBlocksads') .css('background', '-moz-linear-gradient(top, black, #0c2961)');
    // Shrink header
    $('div#otherMenu') .css('height', '40px');
    $('div#header') .css('height', '150px');
    // Nudge logo down
    $('div#logo') .clone() .attr('id', 'newLogo') .appendTo('div#timerBlocksads:first');
    $('div#header div#logo') .remove();
    $('div#newLogo') .css('margin', '65px');
    // Remove ads
    $('div#pf') .remove();
};
//============
// Remove ads
//============
$('a[href^="http://ads."]') .remove();
$('script[src^="http://ads."]') .remove();
$('a[href^="http://www.adcash.com"]') .remove();
$('script[src^="http://www.adcash.com"]') .remove();
$('a[href^="http://creative.m2pub.com"]') .remove();
$('script[src^="http://creative.m2pub.com"]') .remove();
if (window.location.hostname.match('(www.|ad.|ads.|creative.|s.)?(123vidz|247filmz|247vidz|5starvidz|adcash|adk2|affbuzzads|cinabliss|cinahub|cinamuse|cinapalace|cinaplay|cineble|cinechest|cinemaden|directrev|filmlair|filmlush|filmzhub|flix123|flix247|flixaddict|flixattic|flixden|flixjunky|hdreelz|itshd|m2pub|megaflix|moviease|movielush|myflixhd|newflixhd|pushplay|quibids|quickfilmz|reduxmediia|reelhd|reelvidz|reelzhot|vidzplay|vidzstar|webtrackerplus)(.co|.ne)')) {
    window.close();
};
