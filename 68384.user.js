// ==UserScript==
// @name          User Search
// @namespace     All of humanity
// @description   Causes the search for User by default instead of Halo 3 Gamertags
// @include       http://*bungie.net/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

var $searchBar_Status = '{"logEntries":[{"Type":4,"Index":"0","Data":{"defaultButtonIndex":1}},{"Type":4,"Index":"0","Data":{"text":"Users"}}]}';
var $input = $("#ctl00_dashboardNav_searchMini_RadToolBar_Search_ClientState").attr('value', $searchBar_Status);
$("span.rtbSplBtnActivator img").attr('src', '/images/base_struct_images/search/bungienetuser.gif');
	$('a.rtbWrap').click(function(){
		var $icon = $('.rtbItem img').attr('src');
		alert($icon.html());
		$("span.rtbSplBtnActivator img").attr('src', $icon);
	});
