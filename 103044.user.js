// ==UserScript==
// @name		Show Just Image 2 Core
// @description	A library for Show Just Image
// @version		1.0
// @author		timendum, n5zhkyln
// @exclude		*
// @license		GPL v3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==


if (typeof usoCheckup != "undefined") {
	//ok
} else {
	usoCheckup = {enabled: false};
}

var needImgTag = false;
var centerImg = false;
var dontFitImg = false;
var showUrl = false;
var titleEmbededView;

var img, imgURL;
var ibv, EmbededView, viewImageSHI;

// helper
var hId = function(id){ return document.getElementById(id); };
var hXP = function(pat) { return document.evaluate(pat, document, null, 9, null).singleNodeValue; };
var hXPV = function(pat) { return hXP(pat).value; };
// getter
var byId = function(id){ img = document.getElementById(id) || img; return img; };
var byXP = function(pat) { img = hXP(pat) || img; return img; };
var byXPV = function(pat) { imgURL = hXPV(pat) || imgURL; return imgURL; };

var timedSearchImage = function(searchImageF) {
	var timeFunction = function() {
		searchImageF();
		if (!img && !imgURL) {
			setTimeout(timeFunction, 200);
		} else {
			viewImageSHI();
		}
	};
	setTimeout(timeFunction, 200);
};


var preferences = "0000";
if (typeof GM_getValue != 'undefined') {
	var preferences = GM_getValue('pref', preferences) || preferences;
	showUrl = preferences.substr(3,1) === "1";
	dontFitImg = preferences.substr(2,1) === "1";
	centerImg = preferences.substr(1,1) === "1";
	needImgTag = preferences.substr(0,1) === "1" || centerImg || dontFitImg;
}

function printPreferencesControls() {
	var descBody = hId('full_description');
	var beforeElem = hXP('//div[@id="full_description"]/h3[1]');
	if (typeof GM_setValue === 'undefined' || descBody === null || beforeElem === null) {
		return;
	}
	
	var needE = function() {
		var ids = ['sjicenter', 'sjifit'],
		isNeeded = false,
		i = 0;
		for (; i < ids.length ; i++) {
			var elem = hId(ids[i]);
			if (elem && elem.checked) {
				isNeeded = true;
				break;
			}
		}
		
		var sjiembed = hId('sjiembed');
		
		if (isNeeded) {
			if (!sjiembed.disabled) {
				sjiembed.setAttribute('orig', sjiembed.checked);
			}
			sjiembed.disabled = true;
			sjiembed.checked = true;
		} else {
			sjiembed.disabled = false;
			sjiembed.checked = (sjiembed.getAttribute('orig') === "true");
		}
	},
	createCheckbox = function(id, checked, listener, textLabel) {
		var divRow = document.createElement('div');
		var input = document.createElement('input');
		input.setAttribute('id', id);
		input.setAttribute('type','checkbox');
		input.checked = checked;
		input.setAttribute('orig', checked);
		input.addEventListener('change', listener, false);
		divRow.appendChild(input);
		var label = document.createElement('label');
		label.setAttribute('for', id);
		label.appendChild(document.createTextNode(' ' + textLabel));
		divRow.appendChild(label);
		return divRow;
	};
	
	var title = document.createElement('h3');
	title.appendChild(document.createTextNode("Preferences"));
	descBody.insertBefore(title,beforeElem);
	
	var toggleE = function() {
		var checked = hId('sjiembed').checked;
		preferences = (checked ? "1" : "0") + preferences.substr(1);
		GM_setValue('pref', preferences);
	};
	descBody.insertBefore(
		createCheckbox(
			'sjiembed',
			needImgTag,
			toggleE,
			'Always embed images'
		),
		beforeElem
	);
	var toggleC = function() {
		var checked = hId('sjicenter').checked;
		needE();
		preferences = preferences.substr(0, 1) + (checked ? "1" : "0") + preferences.substr(2);
		GM_setValue('pref', preferences);
	};
	descBody.insertBefore(
		createCheckbox(
			'sjicenter',
			centerImg,
			toggleC,
			'Always center images'
		),
		beforeElem
	);
	var toggleF = function() {
		var checked = hId('sjifit').checked;
		needE();
		preferences = preferences.substr(0, 2) + (checked ? "1" : "0");
		GM_setValue('pref', preferences);
	};
	descBody.insertBefore(
		createCheckbox(
			'sjifit',
			dontFitImg,
			toggleF,
			'Don\'t fit images by default'
		),
		beforeElem
	);
	var toggleU = function() {
		var checked = hId('usoEnab').checked;
		usoCheckup.enabled = checked;
	};
	descBody.insertBefore(
		createCheckbox(
			'usoEnab',
			usoCheckup.enabled,
			toggleU,
			'Enable auto-update'
		),
		beforeElem
	);
	var toggleS = function() {
		var checked = hId('showUrl').checked;
		preferences = preferences.substr(0, 3) + (checked ? "1" : "0");
		GM_setValue('pref', preferences);
	};
	descBody.insertBefore(
		createCheckbox(
			'showUrl',
			showUrl,
			toggleS,
			'Show url for embedded images'
		),
		beforeElem
	);
	
	descBody.insertBefore(document.createElement('p'),beforeElem);
	needE();
}

function viewImageSHI() {
	if (img || imgURL) {
		if (img && !imgURL) {
			imgURL = (img.src || img.href);
		}
		if (imgURL) {
			if (needImgTag) {
				var scripts = document.getElementsByTagName('script');
				while (scripts && scripts.length) {
					scripts[0].parentNode.removeChild(scripts[0]);
				}
				titleEmbededView = titleEmbededView || document.location.href.replace(/^.+\/(.+) $/, '$1');
				var docElem = document.documentElement;
				// clean html
				while (docElem.attributes.item(0)) {
					docElem.attributes.removeNamedItem(docElem.attributes.item(0).name);
				}
				while (docElem.children[0]) {
					docElem.removeChild(document.documentElement.children[0]);
				}
				// create
				var head = document.createElement('head');
				var title = document.createElement('title');
				title.appendChild(document.createTextNode(titleEmbededView));
				head.appendChild(title);
				docElem.appendChild(head);
				var body = document.createElement('body');
				docElem.appendChild(body);
				if (showUrl) {
					var par = document.createElement('p');
					var anch = document.createElement('a');
					anch.href = imgURL;
					anch.appendChild(document.createTextNode(imgURL));
					par.appendChild(anch);
					body.appendChild(par);
				}
				var image;
				if (imgURL.substr(imgURL.length-4) == '.svg') {
					image = document.createElement('object');
					image.data = imgURL;
					image.type= "image/svg+xml";
				} else {
					image = document.createElement('img');
					image.src = imgURL;
				}
				image.id = "idImage";
				body.appendChild(image);
				
				hId('idImage').addEventListener('load', function () { ibv = new EmbededView(); }, true);
				hId('idImage').addEventListener('click', function (event) { if (ibv) ibv.onClick(event); }, true);
				
				var favicon = hXP('//link[@rel="shortcut icon"]');
				if (favicon) {
					favicon.parentNode.removeChild(favicon);
				}
				favicon = document.createElement("link");
				favicon.type = "image/x-icon";
				favicon.rel = "shortcut icon";
				favicon.href = imgURL;
				document.head.appendChild(favicon);
			} else {
				location.replace(imgURL);
			}
		}
	}

	function EmbededView () {
		this.image = hId('idImage');
		this.scaled = !dontFitImg;
		this.margin = 8;

		this.originalWidth = this.image.naturalWidth || this.image.width;
		this.originalHeight = this.image.naturalHeight || this.image.height;

		if (centerImg) {
			this.image.setAttribute('style', 'display: block; margin: ' + this.margin + 'px auto');
			if (hId('urlImage')) {
				hId('urlImage').setAttribute('style','text-align: center;');
			}
		} else {
			this.image.setAttribute('style', 'float: left; margin: ' + this.margin + 'px;');
		}
		this.scaled = !this.scaled;
		this.onClick(null);
		this.chrom = (navigator.userAgent.toLowerCase().indexOf('chrom') > 0);
	}

	EmbededView.prototype.onClick = function (event) {
		var windowWidth  = window.innerWidth  - this.margin * 2;
		var windowHeight = window.innerHeight - this.margin * 2;
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
		} else {
			if ((this.originalWidth > windowWidth) || (this.originalHeight > windowHeight)) {
				if (this.originalWidth / this.originalHeight < windowWidth / windowHeight) {
					this.image.height = windowHeight;
					this.image.width  = windowHeight * this.originalWidth / this.originalHeight;
				} else {
					this.image.width  = windowWidth;
					this.image.height = windowWidth * this.originalHeight / this.originalWidth;
				}
				this.scaled = true;
			} else {
				this.image.width  = this.originalWidth;
				this.image.height = this.originalHeight;
			}
		}
		this.image.style.cursor = ((this.originalWidth <= windowWidth) && (this.originalHeight <= windowHeight)) ? 'default' : ((this.scaled) ? (this.chrom ? '-webkit-zoom-in' : '-moz-zoom-in') : (this.chrom ? '-webkit-zoom-out' : '-moz-zoom-out'));
	};
}