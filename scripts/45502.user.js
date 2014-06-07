// ==UserScript==
// @name           Mouseover Twitpic for Twitter
// @namespace      Umakanthan Chandran ( cumakt@gmail.com)
// @description    View Twitpic pictures in Twitter itself
// @include        http://twitter.com/*
// @include        http://search.twitter.com/*
// ==/UserScript==

function findPosX(obj){var curleft = 0;if(obj.offsetParent) while(1) { curleft += obj.offsetLeft; if(!obj.offsetParent) break; obj = obj.offsetParent;}else if(obj.x) curleft += obj.x;return curleft; } 
function findPosY(obj){var curtop = 0;if(obj.offsetParent)while(1){curtop += obj.offsetTop;if(!obj.offsetParent)break;obj = obj.offsetParent;}else if(obj.y)curtop += obj.y;return curtop;}
  
var hrefLinks = document.getElementsByTagName('a');
var preview = parent.document.createElement('div');			
preview.setAttribute('id','twitPreview');
preview.style.display = 'none';
parent.document.body.appendChild(preview);
for (i = 0; i < hrefLinks.length; i++) {
	 var link = hrefLinks[i].getAttribute('href')
	 var a = hrefLinks[i];
	 if (link != null && link.search("twitpic") != -1)  {		
		a.addEventListener( 'mouseover', function() {
			link = this.href;
		 	code = link.substr(link.lastIndexOf("/") + 1, link.length);			 	
			var imgLink = document.createElement('img');
			img= "http://twitpic.com/show/mini/" + code;
			twitPreview.style.display = 'block';			
			imgLink.src = img;			
			twitPreview = document.getElementById('twitPreview');					
			twitPreview.setAttribute('style', 'font-size: 12px; font-family: Verdana;border: 3px solid #B3BECB;position:absolute;left:'+ findPosX(this) +'px;top:'+ findPosY(this) +'px; background:#DDE1E5;min-height:'+75+'px;min-width:'+75+'px;');			
			twitPreview.appendChild(imgLink);
		},false);  
		a.addEventListener( 'mouseout', function() {
			twitPreview = document.getElementById('twitPreview');
			twitPreview.innerHTML = '';
			twitPreview.style.display = 'none';	
		},false);  
	}
}	

