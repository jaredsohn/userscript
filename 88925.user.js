// ==UserScript==
// @id             bookmarks-collages-to-album
// @name           Bookmarks & Collages To Album Pages
// @namespace      hateradio)))
// @author         hateradio
// @version        1.2
// @description    Directly go to an album page.
// @include        http*://*what.cd/bookmarks.php*
// @include        http*://*what.cd/collages.php*
// @match          http://what.cd/bookmarks.php*
// @match          https://ssl.what.cd/bookmarks.php*
// @match          http://what.cd/collages.php*
// @match          https://ssl.what.cd/collages.php*
// ==/UserScript==

var redirs = {
	reg:/#group_(\d+)/,
	url:parent.location.protocol === 'https:' ? 's://ssl.' : '://',
	init:function(){
		this.url = 'http'+this.url+'what.cd/torrents.php?id=';
		this.arr();
	},
	e:document.getElementById('content').getElementsByTagName('a'),
	arr:function(){
		var i = 0, e, href, n;
		for(i; i < this.e.length; i++){ e = this.e[i];
			href = e.toString(); // e.href;
			if(n = href.match(this.reg)){
				e.href = this.url+encodeURIComponent(n[1]);
			}
		}
	}
};
redirs.init();