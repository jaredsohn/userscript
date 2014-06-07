// ==UserScript==
// @name       RYM: Add Dropdown Menus
// @version    0.7
// @match      http://rateyourmusic.com/*
// @match      https://rateyourmusic.com/*
// @copyright  2012+, AnniesBoobs, improved by Sharifi
// ==/UserScript==


var $ = unsafeWindow.jQuery; 

$("#navtop").css('zIndex', 1); 

var communityMenu = '<li class="dropmenu">'; 
communityMenu += '<a href="/boards/board_id=1">Music</a><a href="/boards/board_id=9">Polls/Games/Surveys</a>'; 
communityMenu += '<a href="/boards/board_id=2">Site Board</a><a href="/boards/board_id=3">Film</a>'; 
communityMenu += '<a href="/boards/board_id=6">Off Topic</a>'; 
communityMenu += '<a href="/boards/board_id=11">Off Topic: Political</a>'; 
communityMenu += '<a href="/boards/board_id=9999">Video Games</a></li>'; 

var chartMenu = '<li class="dropmenu">'; 
chartMenu += '<a href="/charts/top/album/2014">2014 albums</a>'; 
chartMenu += '<a href="/charts/top/single/2014">2014 singles</a>'; 
chartMenu += '<a href="/films/chart">film charts</a>'; 
chartMenu += '<a href="/films/chart?year=2014">2014 films</a></li>'; 

$('#navtop li:nth-child(4)').addClass('topmenu').css('height', '30px').append(chartMenu); 
$('#navtop li:nth-child(5)').addClass('topmenu').css('height', '30px').append(communityMenu); 


GM_addStyle('li.topmenu li.dropmenu {  visibility: hidden; }'); 
GM_addStyle('li.dropmenu {  display: none; position: absolute; z-index: 1; font-size: 0.8em!important; background: #555!important; opacity:0.9;}'); 
GM_addStyle('li.topmenu:hover li.dropmenu {visibility: visible;}'); 