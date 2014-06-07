// ==UserScript==
// @name        Least I Could Do Fixer
// @namespace   http://www.brooksworks.com/
// @description Make the comic the home page
// @include     http://www.leasticoulddo.com/
// @exclude     http://www.leasticoulddo.com/comic/*
// @version     2013.4.26
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

$(function(){
	
	var comiclink = $('a#feature-comic').attr('href');
	var comicdate = comiclink.substring(comiclink.length-9,comiclink.length-1);
	var comicyear = comicdate.substring(0,4);
	var comicmonth = comicdate.substring(4,6);
	
	var comichtml = '<div class="beginnings" id="comic-wrap"><div id="comic" style="margin:0 75px 50px;"><div id="comic-img"><a href="'+comiclink+'"><img title="'+comicdate+'" alt="'+comicdate+'" src="http://licd.com/wp-content/uploads/'+comicyear+'/'+comicmonth+'/'+comicdate+'.gif"></a></div><div class="clear"></div></div><div class="clear"></div></div>';
	
	$('#header').after(comichtml);
	
});