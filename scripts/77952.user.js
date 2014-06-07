// ==UserScript==
// @name kinopoisk Downloader
// @description kinopoisk.ru
// @include	http://kinopoisk.ru/level/1/film/*
// @include	http://www.kinopoisk.ru/level/1/film/*
// @require	http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

imgs = "http://sites.google.com/site/forenu/home/";

movie = $(".moviename-big").parent().parent().parent().find("span").html(); // en
if ( movie == '' )
	movie = $(".moviename-big").html(); // ru
	
//year = $("table .info td:eq(1) a").html();
//movie = movie + ' ' + year;

link1 = '<a target="_blank" title="RuTracker.org" href="http://rutracker.org/forum/tracker.php?nm='+movie+'"><img src="'+imgs+'rutracker.png"></a>';
link2 = '<a target="_blank" title="DragMe.tv" href="http://dragme.tv/search/?text='+movie+'"><img src="'+imgs+'dragme.png"></a>';
link3 = '<a target="_blank" title="KazTorka.org" href="http://kaztorka.org/search?torrentName='+movie+'"><img src="'+imgs+'kaztorka.png"></a>';
link4 = '<a target="_blank" title="Torrentino.ru" href="http://www.torrentino.ru/search?search='+movie+'"><img src="'+imgs+'torrentino.png"></a>';
link5 = '<a target="_blank" title="KinoZal.tv" href="http://kinozal.tv/browse.php?s='+movie+'"><img src="'+imgs+'kinozal.png"></a>';
link6 = '<a target="_blank" title="TFile.ru" href="http://tfile.ru/forum/ssearch.php?q='+movie+'"><img src="'+imgs+'tfile.png"></a>';
link7 = '<a target="_blank" title="RuTor.org" href="http://rutor.org/search/'+movie+'"><img src="'+imgs+'rutor.png"></a>';
link8 = '<a target="_blank" title="NNM-Club.ru" href="http://nnm-club.ru/forum/tracker.php?nm='+movie+'"><img src="'+imgs+'nnm-club.png"></a>';


post = '<br><div class="torrents">' + link1 + link2 + link3 + link4 + '<br>' +link5 + link6 + link7 + link8 + '</div>';

$("img[width='120']").parent().after( post );

$(".torrents").css({"padding-left":"9px","padding-top":"9px"});
$(".torrents a").css({"margin":"3px"});
$(".torrents a img").css({"border":"0"});

//http://habrahabr.ru/blogs/p2p/79835/