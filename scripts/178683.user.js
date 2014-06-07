// ==UserScript==
// @name           s-DoubanMovieSearch 
// @namespace      s-DoubanMovieSearch
// @description    豆瓣电影下载,网上抠的代码.感谢原作者
// @version        0.20130507
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
	    var keyword2 = encodeURIComponent( keyword1 );/*movieTitle完整片名|keyword1中文片名|keyword2把字符串作为 URI 组件进行编码*/
		jQuery('#info').append('<div><span class="pl">下载链接:</span> <a href="http://donkey4u.com/search/' + keyword1 + '" target="_balnk"> Donkey4u </a>/<a href="http://btdigg.org/search?info_hash=&q=' + keyword1 + '" target="_balnk"> BTDigg </a>/<a href="http://bt.shousibaocai.com/?s=' + keyword1 + '" target="_balnk"> 磁力 </a>/<a href="http://oabt.org/?topic_title=' + keyword1 + '" target="_balnk"> OABT </a>/<a href="http://www.fangying.tv/category/key_' + keyword2 + '" target="_balnk"> 放映TV </a> /<a href="http://www.yes80.net/SearchPlayFile.aspx?' + keyword2 + '" target="_balnk"> QVOD </a>/<a href="http://www.9skb.com/?k=' + keyword2 + '" target="_balnk"> 91KB </a>/ <a href="http://www.yyets.com/php/search/index?keyword=' + keyword1 + '" target="_balnk"> 人人  </a>/<a href="http://torrentz.eu/search?f=' + keyword1 + '" target="_balnk"> Torrentz </a> / <a href="http://torrentproject.com/?t=' + movieTitle + '" target="_balnk">  TorrentProject</a>/<a href="http://shooter.cn/search/' + keyword1 + '" target="_balnk"> 射手字幕 </a><div>');
    }
 catch (e) { }
}
addJQuery(main);
