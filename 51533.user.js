// ==UserScript==
// @name           Cope's Distributing - Large Thumbnail
// @namespace      http://jobson.us
// @description    The thumnails on Cope's site are pretty much worthless, this replaces them with the full image.
// @include        http://www.copesdistributing.net/product_info.php?*
// ==/UserScript==

var console = null;

var cope = {
	Init: function() {
		console = unsafeWindow.console ? unsafeWindow.console : null;

		if (!document.getElementsByClassName('prod_info')) return;
		
		var prod_info = document.getElementsByClassName('prod_info')[0].getElementsByTagName('tbody')[0];
		
		var pic = prod_info.getElementsByTagName('img');		
		
		var fullPics = [];
		
		for (var i=0;i<pic.length;i++) {
			fullPics.push(pic[i].src);
		}		
		
		while (prod_info.childNodes.length>0) prod_info.removeChild(prod_info.childNodes[0]);
		
		var tr = document.createElement('tr');
		var td = document.createElement('td');
		
		tr.appendChild(td);
		
		for (var i=0;i<fullPics.length;i++) {
			var img = document.createElement('img');
				img.src = fullPics[i];
			//	img.setAttribute('width','475');
				img.addEventListener('load',cope.imgload,false);
			td.appendChild(img);
			
			td.appendChild(document.createElement('br'));
		}
		
		prod_info.appendChild(tr);
		
	},
	imgload: function() {
		var maxW = 475;
		if (this.width > maxW) {
			this.setAttribute('width',maxW);
		}
	}
};

setTimeout(cope.Init,500);