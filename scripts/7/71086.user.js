// ==UserScript==
// @name          DumbPix
// @description   Removes garbage from DumpPix.com and displays the image only. Based on "Show Just Image".
// @version       0.0.1
// @license       GPL v3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include       http://dumppix.com/viewer.php?*
// @include       http://*.dumppix.com/viewer.php?*
// @history	      0.0.1 (March 10, 2010) First release
// ==/UserScript==

if (typeof usoCheckup != 'undefined') {
	usoCheckup.strings();
	usoCheckup.widgets('query');
	usoCheckup.widgets('toggle');
}

var needImgTag = false;
var img, imgURL;
var ibv;

img = document.getElementById('dispImg');

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

// End of script
