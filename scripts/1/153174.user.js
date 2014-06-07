// ==UserScript==
// @name        Adultmult enhances
// @namespace   http://adultmult.ru/
// @include        http://adultmult.ru/*
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require     http://flesler-plugins.googlecode.com/files/jquery.scrollTo-1.4.3.1-min.js
// ==/UserScript==
// Copyright Nagaev Maksim  <nagaev.maksim@gmail.com>

function UrlExists(url) {
  var http = new XMLHttpRequest();
  http.open('HEAD', url, false);
  http.send();
  return http.status!=404;
}

var nextEpisodeUrl = location.href.replace(/([0-9]{3,3})\.html$/gi, function(all, num ){return (num*1+1)+".html"});

var prevEpisodeUrl = location.href.replace(/([0-9]{3,3})\.html$/gi, function(all, num ){return (num*1-1)+".html"});


var nextSeasonUrl = location.href.replace(/(.*)([0-9]{1,1})[0-9]{2,2}\.html$/gi, function(all, start, season, episod ){return start+(season*1+1)+".html"});

var prevSeasonUrl = location.href.replace(/(.*)([0-9]{1,1})[0-9]{2,2}\.html$/gi, function(all, start, season, episod ){return start+(season*1-1)+".html"});

var nextSeasonUrl2 = location.href.replace(/(.*)([0-9]{1,1})[0-9]{2,2}\.html$/gi, function(all, start, season, episod ){return start+(season*1+1)+"s.html"});

var prevSeasonUrl2 = location.href.replace(/(.*)([0-9]{1,1})[0-9]{2,2}\.html$/gi, function(all, start, season, episod ){return start+(season*1-1)+"s.html"});



var nextEpisodeElem = $('<a href="#">Следущая серия</a>').attr('href', nextEpisodeUrl )
var prevEpisodeElem = $('<a href="#">Предыдущая серия</a>').attr('href', prevEpisodeUrl )

var nextSeasonElem = $('<a href="#">Следущий сезон</a>').attr('href', nextSeasonUrl )
var prevSeasonElem = $('<a href="#">Предыдущий сезон</a>').attr('href', prevSeasonUrl )

var nextSeasonElem2 = $('<a href="#">Следущий сезон</a>').attr('href', nextSeasonUrl2 )
var prevSeasonElem2 = $('<a href="#">Предыдущий сезон</a>').attr('href', prevSeasonUrl2 )


if($('.pluso').length == 0) {
    $('p[align="center"]:last').before('<div class="pluso"></div>');
}

if(UrlExists(prevEpisodeUrl)){
	prevEpisodeElem.insertBefore('.pluso');
} else if(UrlExists(prevSeasonUrl)){ 
	prevSeasonElem.insertBefore('.pluso');
} else if(UrlExists(prevSeasonUrl2)){ 
	prevSeasonElem2.insertBefore('.pluso');
}

$('<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>').insertBefore('.pluso');

if(UrlExists(nextEpisodeUrl)){
	nextEpisodeElem.insertBefore('.pluso');
} else if(UrlExists(nextSeasonUrl)){ 
	nextSeasonElem.insertBefore('.pluso');
} else if(UrlExists(nextSeasonUrl2)){ 
	nextSeasonElem2.insertBefore('.pluso');
}

$('<br><br>').insertBefore('.pluso');

if($('div object embed').length) 
	$.scrollTo($('div object embed'));
else
	$.scrollTo($('iframe').get(0));