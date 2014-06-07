// ==UserScript==
// @name           Flickriver
// @namespace      http://www.flickriver.com/
// @description    Flickriver large images
// @include        http://www.flickriver.com/*
// ==/UserScript==

function increaseImgSize() {
	var img = document.getElementsByTagName('img');
	for ( var i in img ) {
		if ( img[i].className == 'photo-panel-img' ) {
			img[i].className += ' done'; 
			var src = img[i].src;
			var id = img[i].id;
			if ( !src.match(/_b\.jpg$/) ) {
				var image = new Image();
				image.addEventListener("load", function() { 
						if ( this.width == 1024 || this.height == 1024 ) {
							document.getElementById(id).src = this.src; 
						} else {
							var newnode = document.createElement('div');
							newnode.style.fontSize = '8pt';
							newnode.innerHTML = 'no highres available';
							document.getElementById(id).parentNode.parentNode.appendChild(newnode); 
						}
					}, false);
				image.src = src.replace(/\.jpg$/, '_b.jpg');
				return;
			}
		}
	}
}

window.setInterval(function(){increaseImgSize();},100);
