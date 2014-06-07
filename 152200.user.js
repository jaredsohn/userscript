// ==UserScript==
// @name        Ultoo Poll 2 chintanpatel.in
// @namespace   http://chintanpatel.in/labs/ultoopoll2.user.js
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @include     http://ultoo.in/*
// @include     http://www.ultoo.in/*
// @include     http://ultoo.in/*
// @version     1
// ==/UserScript==
$(function(){
		var link = $(".button a").attr('href');
		window.location.href = link;
		//document.forms["form1"].submit();
});