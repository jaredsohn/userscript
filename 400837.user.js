// ==UserScript==
// @name Zoom Image
// @author Vasil Dinkov
// @namespace http://vadikom.com/tools/zoom-image-greasemonkey-user-script/
// @version 2.0
// @description Allows zooming of individual images using a popup toolbar.
// @exclude http://maps.google.*/*
// @browsers Opera 9.5+, Firefox 3.0+, Google Chrome 2+
// ==/UserScript==

(function () {

// === User Configuration ===
var
	zoomFactorClick = 1.5,		// zoom in/out by this factor each time
	zoomFactorMouseWheel = 1.2,	// just hover the toolbar (any button) and use the wheel
	showTimeout = 1.2,		// seconds
	minimalImageWidth = 60,		// minimal width of the images the toolbar is activated for
	minimalImageHeight = 50,	// minimal height of the images the toolbar is activated for
	opacity = 0.80,			// opacity for the toolbar
	fade = false,			// use fade animation when showing the toolbar
	darkStyle = false,		// use dark style for the toolbar
	zIndexFix = true;		// try to keep the zoomed image on top of other elements on the page


// === Code ===
var toolbars = {}, images, image;

var Toolbar = function(name, className) {
	this.name = name;
	this.className = className;
	this.elm = document.createElement('div');
	this.buttons = {};
	this.showAniInt = 0;
	this.showTimeout = 0;
	this.init();
}
Toolbar.prototype = {
	init: function() {
		toolbars[this.name] = this;
		this.elm.className = this.className;
		var self = this;
		this.elm.addEventListener('mouseout', function(e) { self.mouseout(e); }, false);
		this.elm.addEventListener('DOMMouseScroll', function(e) { self.mousewheel(e); }, false);
		this.elm.addEventListener('mousewheel', function(e) { self.mousewheel(e); }, false);
		document.getElementsByTagName('body')[0].appendChild(this.elm);
	},
	show: function() {
		if (this.showTimeout)
			return;
		var self = this;
		this.showTimeout = setTimeout(function() {
			var clientRect = image.getBoundingClientRect(),
				scrollX = window.pageXOffset + 4, // add some pixels for aesthetics :)
				scrollY = window.pageYOffset + 4,
				left = clientRect.left + scrollX + image.clientLeft,
				top = clientRect.top + scrollY + image.clientTop,
				elmStyle = self.elm.style;
			if (left < scrollX)
				left = scrollX;
			if (top < scrollY)
				top = scrollY;
			elmStyle.left = left + 'px';
			elmStyle.top = top + 'px';
			elmStyle.opacity = fade ? 0.1 : opacity;
			elmStyle.display = 'block';
			if (fade)
				self.showAniInt = setInterval(function() {
					var currOpacity = parseFloat(elmStyle.opacity);
					if (currOpacity + 0.1 >= opacity) {
						elmStyle.opacity = opacity;
						clearInterval(self.showAniInt);
					} else {
						elmStyle.opacity = currOpacity + 0.1;
					}
				}, 30);
			if (image._originalProps.position == 'static') {
				var imageStyle = image.style;
				imageStyle.position = 'relative';
				imageStyle.zIndex = 1;
			}
		}, showTimeout * 1000);
	},
	hide: function() {
		if (this.showAniInt) {
			clearInterval(this.showAniInt);
			this.showAniInt = 0;
		}
		if (this.showTimeout) {
			clearTimeout(this.showTimeout);
			this.showTimeout = 0;
		}
		var elmStyle = this.elm.style;
		elmStyle.display = 'none';
		elmStyle.opacity = 0;
		if (image._originalProps.position == 'static')
			image.style.position = 'static';
	},
	mouseover: function(e) {
		image = e.target;
		if (!image._originalProps) {
			image._originalProps = {
				width: parseInt(DOM.getStyle(image, 'width')),
				height: parseInt(DOM.getStyle(image, 'height'))
			}
			if (zIndexFix && DOM.getStyle(image, 'position') == 'static')
				image._originalProps.position = 'static';
		}
		this.show();
	},
	mouseout: function(e) {
		if (!e.relatedTarget || e.relatedTarget != image && e.relatedTarget != this.elm && e.relatedTarget.parentNode != this.elm)
			this.hide();
	},
	mousewheel: function(e) {
		var delta = e.wheelDelta || -e.detail,
			imageStyle = image.style,
			width = parseInt(DOM.getStyle(image, 'width')),
			height = parseInt(DOM.getStyle(image, 'height'));
		if (delta < 0) {
			imageStyle.width = width / zoomFactorMouseWheel + 'px';
			imageStyle.height = height / zoomFactorMouseWheel + 'px';
		} else {
			imageStyle.width = width * zoomFactorMouseWheel + 'px';
			imageStyle.height = height * zoomFactorMouseWheel + 'px';
		}
		e.preventDefault();
		return false;
	},
	addButton: function(button) {
		this.buttons[button.name] = button;
		this.elm.appendChild(button.elm);
	},
	removeButton: function(name) {
		var button = this.buttons[name];
		if (button) {
			button.disable();
			this.elm.removeChild(button.elm);
			delete this.buttons[name];
		}
	},
	getButtonByName: function(name) {
		return this.buttons[name] || null;
	}
}

var Button = function(name, className, title, contentHTML, handlers) {
	this.name = name;
	this.className = className;
	this.title = title;
	this.handlers = {
		mouseover: function() {
			DOM.addClass(this, 'hover');
		},
		mouseout: function() {
			DOM.removeClass(this, 'hover');
			DOM.removeClass(this, 'down');
		},
		mousedown: function() {
			DOM.addClass(this, 'down');
		},
		mouseup: function() {
			DOM.removeClass(this, 'down');
		}
	};
	for (var i in handlers)
		this.handlers[i] = handlers[i];
	this.contentHTML = contentHTML;
	this.elm = document.createElement('span');
	this.init();
}
Button.prototype = {
	init: function(button) {
		this.elm.className = this.className;
		this.elm.setAttribute('title', this.title);
		if (this.contentHTML)
			this.elm.innerHTML = this.contentHTML;
		this.enable();
	},
	disable: function() {
		for (var i in this.handlers)
			this.elm.removeEventListener(i, this.handlers[i], false);
		DOM.addClass(this.elm, 'disabled');
	},
	enable: function() {
		for (var i in this.handlers)
			this.elm.addEventListener(i, this.handlers[i], false);
		DOM.removeClass(this.elm, 'disabled');
	},
	hide: function() {
		this.elm.style.display = 'none';
	},
	show: function() {
		this.elm.style.display = '';
	}
}

var DOM = {
	addCSS: function(cssText) {
		var style = document.createElement('style');
		style.setAttribute('type', 'text/css');
		style.setAttribute('media', 'screen,projection');
		style.appendChild(document.createTextNode(cssText));
		document.getElementsByTagName('head')[0].appendChild(style);
	},
	hasClass: function(elm, className) {
		return (' ' + elm.className + ' ').indexOf(' ' + className + ' ') > -1;
	},
	addClass: function(elm, className) {
		if (this.hasClass(elm, className))
			return;
		var c = elm.className;
		elm.className = (c ? c + ' ' : '') + className;
	},
	removeClass: function(elm, className) {
		if (!this.hasClass(elm, className))
			return;
		elm.className = (' ' + elm.className).replace(' ' + className, '').substring(1);
	},
	getStyle: function(elm, prop) {
		return window.getComputedStyle(elm, null).getPropertyValue(prop);
	}
}

// === Hook the images ===
images = document.getElementsByTagName('img');
for (var i = 0; image = images[i++]; ) {
	if (parseInt(DOM.getStyle(image, 'width')) >= minimalImageWidth && parseInt(DOM.getStyle(image, 'height')) >= minimalImageHeight) {
		image.addEventListener('mouseover', function(e) { zoomToolbar.mouseover(e); }, false);
		image.addEventListener('mousemove', function(e) { zoomToolbar.mouseover(e); }, false);
		image.addEventListener('mouseout', function(e) { zoomToolbar.mouseout(e); }, false);
		image.addEventListener('mousewheel', function() { zoomToolbar.hide(); }, false);
		image.addEventListener('DOMMouseScroll', function() { zoomToolbar.hide(); }, false);
	}
}

// === Add the CSS to the document ===
DOM.addCSS('\
	.zoom-image-toolbar {\
		display:none;\
		position:absolute;\
		width:auto;\
		height:auto;\
		border:0;\
		border-radius:20px;\
		-webkit-border-radius:20px;\
		-moz-border-radius:20px;\
		background-color:#fff;\
		box-shadow:0 1px 3px rgba(0, 0, 0, 0.3);\
		-webkit-box-shadow:0 1px 3px rgba(0, 0, 0, 0.3);\
		-moz-box-shadow:0 1px 3px rgba(0, 0, 0, 0.3);\
		z-index:100;\
	}\
	.zoom-image-toolbar span {\
		display:block;\
		float:left;\
		outline:none;\
		margin:1px;\
		border:0;\
		border-radius:20px;\
		-webkit-border-radius:20px;\
		-moz-border-radius:20px;\
		font:10px/12px "Lucida Sans Unicode",arial,sans-serif;\
		text-decoration:none;\
		background-color:#fff;\
		background-repeat:no-repeat;\
		background-position:center center;\
		color:#555;\
		width:14px;\
		height:14px;\
		cursor:default;\
	}\
	.zoom-image-toolbar span.hover {\
		background-color:#ccc;\
	}\
	.zoom-image-toolbar span.down {\
		box-shadow:inset 0 1px 0 rgba(0, 0, 0, 0.3);\
		-moz-box-shadow:inset 0 1px 0 rgba(0, 0, 0, 0.3);\
		background-color:#999;\
		color:#fff;\
	}\
	.zoom-image-toolbar span.disabled {\
		opacity:0.5 !important;\
	}\
	.zoom-image-toolbar span.zoom-in-button {\
		background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAABlBMVEVVVVX////1urmyAAAAAnRSTlP/AOW3MEoAAAAeSURBVHjaYmBEAgyYHAYGwhwGKMDkEGkADhcABBgAI/QAdQc9G64AAAAASUVORK5CYII=");\
	}\
	.zoom-image-toolbar span.down.zoom-in-button {\
		background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAABlBMVEXy8vL////jGPreAAAAAnRSTlP/AOW3MEoAAAAeSURBVHjaYmBEAgyYHAYGwhwGKMDkEGkADhcABBgAI/QAdQc9G64AAAAASUVORK5CYII=");\
	}\
	.zoom-image-toolbar span.zoom-out-button {\
		background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAABlBMVEVVVVX////1urmyAAAAAnRSTlP/AOW3MEoAAAAYSURBVHjaYmBEAgzkcRigAJNDmdEAAQYAJ5wAgdXvhVYAAAAASUVORK5CYII=");\
	}\
	.zoom-image-toolbar span.down.zoom-out-button {\
		background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAABlBMVEXy8vL////jGPreAAAAAnRSTlP/AOW3MEoAAAAYSURBVHjaYmBEAgzkcRigAJNDmdEAAQYAJ5wAgdXvhVYAAAAASUVORK5CYII=");\
	}\
	.zoom-image-toolbar span.reset-button {\
		background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAABlBMVEVVVVX////1urmyAAAAAnRSTlP/AOW3MEoAAAAoSURBVHjaYmBEAgwYHAYkDgMShwECsHDAyuAcRhQOIxoHh6UwABBgACP7AHdy3jk4AAAAAElFTkSuQmCC");\
	}\
	.zoom-image-toolbar span.down.reset-button {\
		background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAABlBMVEXy8vL////jGPreAAAAAnRSTlP/AOW3MEoAAAAoSURBVHjaYmBEAgwYHAYkDgMShwECsHDAyuAcRhQOIxoHh6UwABBgACP7AHdy3jk4AAAAAElFTkSuQmCC");\
	}\
	.zoom-image-toolbar span.text-button {\
		width:auto;\
		padding:0 3px;\
	}\
');

if (darkStyle)
	DOM.addCSS('\
		.zoom-image-toolbar {\
			background-color:#000;\
		}\
		.zoom-image-toolbar span {\
			background-color:#000;\
			color:#fff;\
		}\
		.zoom-image-toolbar span.hover {\
			background-color:#555;\
		}\
		.zoom-image-toolbar span.down {\
			background-color:#ccc;\
			color:#555;\
		}\
		.zoom-image-toolbar span.zoom-in-button {\
			background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAABlBMVEXy8vL////jGPreAAAAAnRSTlP/AOW3MEoAAAAeSURBVHjaYmBEAgyYHAYGwhwGKMDkEGkADhcABBgAI/QAdQc9G64AAAAASUVORK5CYII=");\
		}\
		.zoom-image-toolbar span.down.zoom-in-button {\
			background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAABlBMVEVVVVX////1urmyAAAAAnRSTlP/AOW3MEoAAAAeSURBVHjaYmBEAgyYHAYGwhwGKMDkEGkADhcABBgAI/QAdQc9G64AAAAASUVORK5CYII=");\
		}\
		.zoom-image-toolbar span.zoom-out-button {\
			background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAABlBMVEXy8vL////jGPreAAAAAnRSTlP/AOW3MEoAAAAYSURBVHjaYmBEAgzkcRigAJNDmdEAAQYAJ5wAgdXvhVYAAAAASUVORK5CYII=");\
		}\
		.zoom-image-toolbar span.down.zoom-out-button {\
			background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAABlBMVEVVVVX////1urmyAAAAAnRSTlP/AOW3MEoAAAAYSURBVHjaYmBEAgzkcRigAJNDmdEAAQYAJ5wAgdXvhVYAAAAASUVORK5CYII=");\
		}\
		.zoom-image-toolbar span.reset-button {\
			background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAABlBMVEXy8vL////jGPreAAAAAnRSTlP/AOW3MEoAAAAoSURBVHjaYmBEAgwYHAYkDgMShwECsHDAyuAcRhQOIxoHh6UwABBgACP7AHdy3jk4AAAAAElFTkSuQmCC");\
		}\
		.zoom-image-toolbar span.down.reset-button {\
			background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAABlBMVEVVVVX////1urmyAAAAAnRSTlP/AOW3MEoAAAAoSURBVHjaYmBEAgwYHAYkDgMShwECsHDAyuAcRhQOIxoHh6UwABBgACP7AHdy3jk4AAAAAElFTkSuQmCC");\
		}\
	');

// === Create the toolbar and buttons ===
var zoomToolbar = new Toolbar('zoomToolbar', 'zoom-image-toolbar'),
	zoomInButton = new Button('zoomInButton', 'zoom-in-button', 'Zoom In', '', {
		click: function() {
			var imageStyle = image.style,
				width = parseInt(DOM.getStyle(image, 'width')),
				height = parseInt(DOM.getStyle(image, 'height'));
			imageStyle.width = width * zoomFactorClick + 'px';
			imageStyle.height = height * zoomFactorClick + 'px';
		}
	}),
	zoomOutButton = new Button('zoomOutButton', 'zoom-out-button', 'Zoom Out', '', {
		click: function() {
			var imageStyle = image.style,
				width = parseInt(DOM.getStyle(image, 'width')),
				height = parseInt(DOM.getStyle(image, 'height'));
			imageStyle.width = width / zoomFactorClick + 'px';
			imageStyle.height = height / zoomFactorClick + 'px';
		}
	}),
	resetButton = new Button('resetButton', 'reset-button', 'Reset Image Size', '', {
		click: function() {
			var imageStyle = image.style;
			imageStyle.width = image._originalProps.width + 'px';
			imageStyle.height = image._originalProps.height + 'px';
			zoomToolbar.hide();
		}
	});
zoomToolbar.addButton(zoomInButton);
zoomToolbar.addButton(zoomOutButton);
zoomToolbar.addButton(resetButton);


/* You can add more custom buttons if you like - here are some that are disabled by default */

/*
var openButton = new Button('openButton', 'text-button', 'Open Image in New Window', 'open', {
	click: function() {
		window.open(image.src);
		zoomToolbar.hide();
	}
});
zoomToolbar.addButton(openButton);
*/

/*
var sizeButton = new Button('sizeButton', 'text-button', 'Show Image Dimensions', 'size', {
	click: function() {
		alert('Original Dimensions: ' + image._originalProps.width + ' x ' + image._originalProps.height + ' pixels');
		zoomToolbar.hide();
	}
});
zoomToolbar.addButton(sizeButton);
*/

})();