// ==UserScript==
// @name           4chan Easy Crosslink
// @description    Converts mentions of 4chan boards into clickable links. Only works on 4chan.
// @include        http://boards.4chan.org/*
// @icon           http://dl.dropbox.com/u/7046011/img/logo.png
// ==/UserScript==

var boards = new Array("/a/", "/b/", "/c/", "/d/", "/e/", "/f/", "/g/", "/gif/", "/h/", "/hr/", "/k/", "/m/", "/o/", "/p/", "/r/", "/s/", "/t/", "/u/", "/v/", "/w/", "/wg/", "/i/", "/ic/", "/r9k/", "/cm/", "/y/", "/3/", "/adv/", "/an/", "/cgl/", "/ck/", "/co/", "/diy/", "/fa/", "/fit/", "/hc/", "/int/", "/jp/", "/lit/", "/mu/", "/n/", "/po/", "/pol/", "/sci/", "/soc/", "/sp/", "/tg/", "/toy/", "/trv/", "/tv/", "/vp/", "/x/", "/rs/", "/vg/", "/mlp/");
var descriptions = new Array("Anime & Manga", "Random", "Anime/Cute", "Hentai/Alternative", "Ecchi", "Flash", "Technology", "Animated GIF", "Hentai", "High Resolution", "Weapons", "Mecha", "Auto", "Photo", "Request", "Sexy Beautiful Women", "Torrents", "Yuri", "Video Games", "Anime/Wallpapers", "Wallpapers/General", "Oekaki", "Artwork/Critique", "ROBOT9001", "Cute/Male", "Yaoi", "3DCG", "Advice", "Animals & Nature", "Cosplay & EGL", "Food & Cooking", "Comics & Cartoons", "Do-It-Yourself", "Fashion", "Health & Fitness", "Hardcore", "International", "Otaku Culture", "Literature", "Music", "Transportation", "Papercraft & Origami", "Politically Incorrect", "Science & Math", "Social", "Sports", "Traditional Games", "Toys", "Travel", "Television & Film", "Pok&eacute;mon", "Paranormal", "Rapidshares", "Video Game Generals", "Pony");
var posts = document.getElementsByTagName('blockquote')

for (var cnt = 0; cnt < posts.length; cnt++) {
	for (var i = 0; i < boards.length; i++) {
		var currentBoard = boards[i];
		var currentDescription = descriptions[i];
		var re = new RegExp(currentBoard,"gi");
		posts[cnt].innerHTML = posts[cnt].innerHTML.replace(re, '<a href="http://boards.4chan.org'+currentBoard+'" alt="'+currentBoard+' - '+currentDescription+'" title="'+currentBoard+' - '+currentDescription+'">'+currentBoard+'</a>');
	}
}