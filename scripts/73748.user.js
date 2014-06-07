// ==UserScript==
// @name           DotNgalih Image
// @description    Bypass ads and show the image only.
// @version        0.2.3
// @include        http://dot.ngalih.com/*
// @include        http://*.imagevenue.com/img.php?*
// ==/UserScript==

var needImgTag = false;
var domain = location.hostname.match('[^\.]+\.(be|com|de|gr|net|no|org|pl|ro|ru|su|to|us)$');

function evalNodes(path) {
	return document.evaluate(path, document, null, 9, null);
}

if (domain) {
	switch (domain[0]) {
		case 'ngalih.com':
			var cont = evalNodes('//div[@class="entry"]').singleNodeValue;
			var matches = cont.innerHTML.match(/var downloadlink = '(.+)';/);
			location.href = matches[1];
			break;
		case 'imagevenue.com':
			img = document.getElementById('thepic');
			break;			
	}
}

if (img || imgURL) {
	if (img && !imgURL) imgURL = (img.src ? img.src : img.href);
	if (needImgTag) {
		var scripts = document.getElementsByTagName('script');
		while (scripts && scripts.length) {
			scripts[0].parentNode.removeChild(scripts[0]);
		}
		document.getElementsByTagName('html')[0].innerHTML = '<html><head><title>' + document.location.href.replace(/^.+\/(.+)$/, '$1') + '</title></head><body><img id="idImage" alt="" src="' + imgURL + '"></body></html>';
		document.getElementById('idImage').addEventListener('load', function () { ibv = new EmbededView(); }, false);
		document.getElementById('idImage').addEventListener('click', function (event) { if (ibv) ibv.onClick(event); }, false);
	}
	else {
		location.replace(imgURL);
	}
}

function EmbededView () {
	this.image  = document.getElementById('idImage');
	this.scaled = true;
	this.margin = 8;

	this.originalWidth  = this.image.width;
	this.originalHeight = this.image.height;

	this.image.setAttribute('style', 'float: left; margin: ' + this.margin + 'px;');
	this.scaled = !this.scaled;
	this.onClick(null);
}

EmbededView.prototype.onClick = function (event) {
	if (this.scaled) {
		var scrollX, scrollY;

		if (event) {
			scrollX = Math.max(0, Math.round ((event.pageX - this.image.offsetLeft) * (this.originalWidth  / this.image.width)  - window.innerWidth  / 2 + this.margin));
			scrollY = Math.max(0, Math.round ((event.pageY - this.image.offsetTop)  * (this.originalHeight / this.image.height) - window.innerHeight / 2 + this.margin));
		}

		this.image.width  = this.originalWidth;
		this.image.height = this.originalHeight;

		if (event) {
			window.scroll(scrollX, scrollY);
		}

		this.scaled = false;
	}
	else {
		var windowWidth  = window.innerWidth  - this.margin * 2;
		var windowHeight = window.innerHeight - this.margin * 2;

		if ((this.originalWidth > windowWidth) || (this.originalHeight > windowHeight)) {
			if (this.originalWidth / this.originalHeight < windowWidth / windowHeight) {
				this.image.height = windowHeight;
				this.image.width  = windowHeight * this.originalWidth / this.originalHeight;
			}
			else {
				this.image.width  = windowWidth;
				this.image.height = windowWidth * this.originalHeight / this.originalWidth;
			}
			this.scaled = true;
		}
		else {
			this.image.width  = this.originalWidth;
			this.image.height = this.originalHeight;
		}
	}

	this.image.style.cursor = ((this.originalWidth <= windowWidth) && (this.originalHeight <= windowHeight)) ? 'default' : ((this.scaled) ? '-moz-zoom-in' : '-moz-zoom-out');
}
