// ==UserScript==
// @name           showsearchtext
// @namespace      tmb
// @include        http*://*themixingbowl.org/torrent/*
// @include        http*://*tmb.dj/torrent/*
// @exclude	   http*://*themixingbowl.org/torrent/view/*
// @exclude        http*://*tmb.dj/torrent/view/*
// ==/UserScript==


var imgs = document.getElementById('torrentnav').getElementsByTagName('img');
for (var i = 0, l = imgs.length; i < l; i++) {
  switch(imgs[i].alt)
  {
	case '':
	 break;
	case 'Set as default':
	 imgs[i].src =''; 
	 imgs[i].style.padding = '1px 5px 1px 5px';
	 imgs[i].style.background = '#E8EFF7';
	 break;
	default:
	 imgs[i].src =''; 
	 imgs[i].style.padding = '1px 5px 1px 5px';
	 imgs[i].style.background = '#F5F8FB';
  }
}
 
document.getElementById('torrentnav').style.listStylePosition = "inside";