// ==UserScript==
// @name		douban_to_donkey4u
// @namespace		douban_to_donkey4u
// @version		0.2
// @include		http://movie.douban.com/*
// author		udonmai@gmail.com
// 2012-09-19		inition
// ==/UserScript==

var $ = function(selector){
	return document.querySelectorAll(selector);
}

!function(){
    
    var s = $('span[property="v:itemreviewed"]')[0].childNodes[0]; 
    s = s.textContent.split(" ")[0];
    var link = "http://donkey4u.com/search/" + s;

    var htmlstr = document.createElement("span");
    htmlstr.innerHTML = "<a class='collect_btn colbutt ll' style='color: #000; font: 12px Arial,Helvetica,sans-serif; letter-spacing: 0px !important;' href='"+ link +"'><span>去 donkey4u 看看</span></a>";
        
    var par = $('#interest_sect_level')[0];
    var tar = $('.a_stars')[0];
    par.insertBefore(htmlstr, tar);
    
}();