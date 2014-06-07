// ==UserScript==
// @name           Douban Movie Download Search +
// @namespace      Douban Movie Download Search +
// @description    Douban Movie Download Search +
// @version        0.20130213
// @include        http://movie.douban.com/subject/*
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "about:blank");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.head.appendChild(script);
    }, false);
    document.head.appendChild(script);
}

function main() {
    try {
    	var movieTitle = jQuery('h1 span:eq(0)').text();
		var title = $('html head title').text();
	    var keyword1 = title.replace( '(豆瓣)', '' ).trim();
	    var keyword2 = encodeURIComponent( keyword1 );
		jQuery('#info').append('<div><span class="pl">下载链接:</span> <a href="http://simplecd.me/search/entry/?query=' + keyword1 + '" target="_balnk">SimpleCD</a> / <a href="https://www.google.com/search?ie=UTF-8&q=' + movieTitle + '+MiniSD" target="_balnk">Google MiniSD</a> / <a href="http://www.yyets.com/php/search/index?keyword=' + keyword1 + '" target="_balnk">人人影视</a>/<a href="http://donkey4u.com/search/' + movieTitle + '" target="_balnk">Donkey4u</a><br><span class="pl">字幕链接:</span> <a href="http://shooter.cn/search/' + movieTitle + '" target="_balnk">Shooter</a><div>');
    }
    catch (e) { }
}
addJQuery(main);