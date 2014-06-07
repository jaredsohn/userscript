// ==UserScript==
// @name       RealEstate.com.au CleanUp
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Cleans up realestate.com.au
// @match      http://www.realestate.com.au/buy/*
// @copyright  2014+, Roger Wee
// ==/UserScript==
$('html').append('<style type="text/css">body.rui-leaderboard-layout { padding-top: 0px !important; } .map-bottom-ads, .footer_links, .search-form, .searchForm, #resBar, .rui-header {display: none; } </style>');
var h = $(document).height();
$('#mapContainer').height(h);
$('#sideContainer').height(h);