// ==UserScript==
// @name           Garrysmod.org Enhancer.
// @namespace      powback
// @description    Makes garrysmod.com allow more user-friendly browsing.
// @include        http://www.garrysmod.org/downloads/*
// ==/UserScript==

//config:
iconsize = '245'

var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://powback.com/gmod/gmod.css';
cssNode.media = 'screen';
cssNode.title = 'dynamicLoadedSheet';
document.getElementsByTagName("head")[0].appendChild(cssNode);

function findPosX(obj){var curleft = 0;if(obj.offsetParent) while(1) { curleft += obj.offsetLeft; if(!obj.offsetParent) break; obj = obj.offsetParent;}else if(obj.x) curleft += obj.x;return curleft; } 
function findPosY(obj){var curtop = 0;if(obj.offsetParent)while(1){curtop += obj.offsetTop;if(!obj.offsetParent)break;obj = obj.offsetParent;}else if(obj.y)curtop += obj.y;return curtop;}
  
var hrefLinks = document.getElementsByTagName('a');
var preview = parent.document.createElement('div');			
preview.setAttribute('id','garryPreview');
preview.style.display = 'none';
parent.document.body.appendChild(preview);
for (i = 0; i < hrefLinks.length; i++) {
	 var link = hrefLinks[i].getAttribute('href')
	 var a = hrefLinks[i];
	 if (link != null && link.search("&id=") != -1)  {		
		a.addEventListener( 'mouseover', function() {
			link = this.href;
		 	code = link.substr(link.lastIndexOf("id=") + 3, link.length);			 	
			var imgLink = document.createElement('img');
			img= "http://s3.garrysmod.org/img/dl/" + code + "_1.jpg";
			img2= "http://s3.garrysmod.org/img/dl/" + code + "_2.jpg";
			img3= "http://s3.garrysmod.org/img/dl/" + code + "_3.jpg";
			garryPreview.style.display = 'block';			
			imgLink.src = img;			
			garryPreview = document.getElementById('garryPreview');					
			//garryPreview.setAttribute('style', 'font-size: 12px; font-family: Verdana;position:absolute;left:'+ findPosX(this) +'px;top:'+ findPosY(this) +'px;');			
			garryPreview.setAttribute('style', '');			
			
			newImg = document.createElement('div');
			newImg.innerHTML='<img src="' + img + '" width="' + iconsize +'" onerror="this.style.width=\'0px\'" style="max-height: 250px;"><img src="' + img2 + '" width="' + iconsize + '" onerror="this.style.width=\'0px\'" style="max-height: 250px;"><img src="' + img3 + '" width="' + iconsize + '" onerror="this.style.width=\'0px\'" style="max-height: 250px;">';  
			garryPreview.appendChild(newImg);
		},false);  
		a.addEventListener( 'mouseout', function() {
			garryPreview = document.getElementById('garryPreview');
			garryPreview.innerHTML = '';
			garryPreview.style.display = 'none';	
		},false);  
	}
}