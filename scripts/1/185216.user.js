// ==UserScript==
// @name           fotostrana
// @version        0.0.2
// @date           2012-11-06
// @author         denis.omsk@bk.ru 
// @description    Test script
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.6/jquery-ui.min.js
//
// @include        http://fotostrana.ru/*
// ==/UserScript==

var simv=jQuery.noConflict();
simv(document).ready(function()
{
	fsrating.views.buyViewsPopup.open();

});