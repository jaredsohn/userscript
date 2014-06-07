// ==UserScript==
// @name           What.CD Forums: Remove GIF Avatars
// @description    This script replaces GIFs with the default What avatar. Clicking on these replaced avatars will display the original.
// @namespace      http://hateradio.co.cc/
// @include        http*://*what.cd/forums.php?*viewthread*
// @include        http*://*what.cd/torrents.php?*
// @version        2.0
// @update         May 30 2011
// @since          Oct 29 2010
// ==/UserScript==

var gif = {
	img : document.getElementById('content').getElementsByTagName('img'),
	ava : '/static/common/avatars/default.png',
	reg : /\.gif/,
	now : function(){
		var x;
		for(x in this.img) {
			if( this.img[x].parentNode && this.img[x].parentNode.getAttribute('class') === 'avatar' && this.reg.test(this.img[x].src) ) {
				this.img[x].title = this.img[x].src;
				this.img[x].src = this.ava;
				this.img[x].addEventListener('click', gif.on, false);
				this.img[x].setAttribute('style','cursor:pointer;opacity: .9;');
			}
		}
	},
	on : function(e){
		e = e.target;
		e.src = e.src === e.title ? gif.ava : e.title;
	}
};
gif.now();