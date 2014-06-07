// ==UserScript==
// @id             what-artist-album-link
// @name           What.CD : Artist - Album Link
// @namespace      hateradio)))
// @author         hateradio
// @version        1.5
// @description    Get a BBCode block with links for your posts.
// @homepage       http://userscripts.org/scripts/show/99298
// @updateURL      http://userscripts.org/scripts/source/99298.meta.js
// @screenshot     http://i.min.us/imphZw.png
// @include        http*://*what.cd/torrents.php?id=*
// @updated        09 May 2012
// @since          01 Apr 2011
// @license        Creative Commons
// @grant          none
// ==/UserScript==

var link = {
	s : document.getElementsByClassName('sidebar')[0],
	h : document.getElementsByTagName('h2')[0],
	i : /torrents\.php\?id\=(\d+)/,
	ins : function(){
		if(this.i.test(document.baseURI)){
			this.id = RegExp.lastParen;
			var s, d, T = '[torrent]'+this.id+'[/torrent]';
			
			s = this.s.getElementsByClassName('box')[0].cloneNode(false);
			s.className = 'box';
			s.id = 'bblink';
			
			d = document.createElement('div');
			d.textContent = 'Link';
			d.className = 'head';
			s.appendChild(d);
			
			d = document.createElement('input');
			d.setAttribute('readonly','readonly');
			d.setAttribute('style','width: 90% !important; display: block; margin: 3px auto');
			d.value = T;
			d.addEventListener('click', this.click, false);
			s.appendChild(d);
			this.s.appendChild(s);
			
			this.h.addEventListener('dblclick', this.dbl, false);
		}
	},
	click:function(){
		this.select();
		try{
			GM_setClipboard(this.value);
		}catch(e){}
	},
	dbl: function(){
		document.location.hash = '#bblink';
	}
};

link.ins();