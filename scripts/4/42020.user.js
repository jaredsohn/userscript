// ==UserScript==
// @name           VN UnThumber
// @namespace      sd.vn
// @description    Makes VN post thumbnails larger, corrects aspect ratio, and previews other image links
// @include        http://vnboards.ign.com/*
// ==/UserScript==

/* 
By Arc_DT of AC Friends. Come visit us. You can't be any worse than the people we already have.

I have a fairly unique name, so I don't like to toss it around casually. In case I'd ever need to prove this was my work,
here's a Sha1 hash of my full name:

199ff211819355809c2df61565412c63c13a774e
*/

window.addEventListener("load",function(e){
	var MAXWIDTH='500px',MAXHEIGHT='500px';
	var cells=document.getElementsByTagName('td');
	for(var j=0;j<cells.length;j++)if(cells[j].className=='BoardRowB'){// Scan only message body cells
		var anchors=cells[j].getElementsByTagName('a');
		for(var i=0;i<anchors.length;i++){
			var url,imgs=anchors[i].getElementsByTagName('img');
			if(imgs.length)url=''+imgs[0].src;//Scan links for images or image URLs
			else url=''+anchors[i].innerHTML;
			if(url.match(/\.jpg$/i)||url.match(/\.jpeg$/i)||url.match(/\.png$/i)||url.match(/\.gif$/i)){// Only parse image URLs. Sorry, tinyurl.
				while(anchors[i].firstChild)anchors[i].removeChild(anchors[i].firstChild);// Gut the link before we rebuild it
				var img=document.createElement('img');
				img.src=url;
				img.style.maxWidth=MAXWIDTH;
				img.style.maxHeight=MAXHEIGHT;
				img.alt='';// Because I believe in accessibility
				anchors[i].appendChild(img);
				}
			}
		}
	},false);

