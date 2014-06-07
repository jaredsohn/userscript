// ==UserScript==
// @name           MantisAddSearchLinks
// @namespace      jim
// @include        http://192.168.1.23/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// ==/UserScript==

$(function(){
    var cssObj = {
	'background-color' : '#9090E0',
	'font-size' : '10px',
	'padding' : '3px',
	'border-radius' : '4px',
	'text-decoration' : 'none',
	'color' : '#FFF'
    }
    $(this).css(cssObj);
	links = '&nbsp;&nbsp;<a class="links" href="http://192.168.1.23/search.php?project_id=5&status_id=50&sticky_issues=on&sortby=last_updated&dir=DESC&hide_status_id=-2">Assigned</a>'
	links += '&nbsp;&nbsp;<a class="links" href="http://192.168.1.23/search.php?project_id=5&status_id=50&handler_id=16&sticky_issues=on&sortby=last_updated&dir=DESC&hide_status_id=-2">Bob</a>'
	links += '&nbsp;&nbsp;<a class="links" href="http://192.168.1.23/search.php?project_id=5&status_id=50&handler_id=17&sticky_issues=on&sortby=last_updated&dir=DESC&hide_status_id=-2">Setin</a>'
	links += '&nbsp;&nbsp;<a class="links" href="http://192.168.1.23/search.php?project_id=5&status_id=50&handler_id=14&sticky_issues=on&sortby=last_updated&dir=DESC&hide_status_id=-2">Benz</a>'
	$('td[class="login-info-left"]').append(links);
	$('a[class="links"]').css(cssObj);
})