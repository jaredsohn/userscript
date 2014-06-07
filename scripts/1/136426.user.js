// ==UserScript==
// @name       Youtuber
// @namespace  http://allise.net/
// @version    0.1
// @description  Trasforma i link ai video di youtube in player del video stesso.
// @match      http://community.eu.playstation.com/*
// @copyright  2012+, Remedy Memory, aka Lady R or llfezll
// ==/UserScript==


$("a[href^='http://www.youtube.com'], a[href^='https://www.youtube.com']").html( function() { 
    var link = $(this).attr("href");
    id = link.match(/v=([^&]+)/)[1]
	$(this).html("<iframe width='560' height='315' src='http://www.youtube.com/embed/" + id + "' frameborder='0' allowfullscreen></iframe>");
	$(this).children("iframe").unwrap();
});
