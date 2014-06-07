// ==UserScript==
// @name			Something Awful Image Madness
// @namespace		SA
// @description		Prototype of suggested fixes to how images are handled on Something Awful.
// @include			http://forums.somethingawful.com/*
// @version			1.0.1
// @grant			GM_openInTab
// @icon			http://forums.somethingawful.com/favicon.ico
// ==/UserScript==

var MaxImagePixels = 1920000;

var Util = {
	imgurFix: function(image) {
		var src = image.getAttribute('src'),
			url = src;

		// Skip non-imgur images:
		if (/i\.imgur\.com/.test(src) === false) return;

		// Change image source:
		if (/\/.{5}[s]?\.(jpg|png|gif)/.test(src)) {
			src = src.replace(/(\/.{5})[s]?\.(jpg|png|gif)/, '$1l.$2');
		}

		// Change link destination:
		if (/\/.{5}[ls]?\.(jpg|png|gif)/.test(url)) {
			url = url.replace(/(\/.{5})[ls]?\.(jpg|png|gif)/, '$1.$2');
		}

		var link = document.createElement('a'),
			parent = image.parentNode;

		image.setAttribute('src', src);
		link.setAttribute('href', url);
		parent.replaceChild(link, image);
		link.appendChild(image);
	},

	imageStyleFix: function(image, first) {
		// This is a nasty hack:
		if ((typeof first) == 'undefined') {
			// Apply to images while they load:
			var refresh = setInterval(function() {
				Util.imageStyleFix(image, false);
			}, 20);

			// Always apply one image has loaded:
			image.onload = function() {
				clearInterval(refresh);
				Util.imageStyleFix(image, false);
			};
		}

		// Already handled:
		if (image.getAttribute('data-autosize') == 'yes') return;

		image.setAttribute('data-autosize', 'yes');

		// Complain to the user that they really fucking suck:
		if (
			image.clientWidth > 1200
			|| image.clientWidth * image.clientHeight >= MaxImagePixels
		) {
			var wrapper = image.ownerDocument.createElement('span');

			wrapper.setAttribute('class', 'too-large');
			image.parentNode.replaceChild(wrapper, image);
			wrapper.appendChild(image);
		}

		// Force the image to an appropriate size:
		if (image.clientWidth > 60 || image.clientHeight > 60) {
			var wrapper = image.ownerDocument.createElement('span');

			wrapper.setAttribute('class', 'autosize');
			image.parentNode.replaceChild(wrapper, image);
			wrapper.appendChild(image);
		}
	}
};

try {
	var forEach = Array.prototype.forEach;
	var posts = document.querySelectorAll('table.post'),
		images = document.querySelectorAll('td.postbody img, td.userinfo img'),
		timages = document.querySelectorAll('td.postbody img.timg'),
		tcontainers = document.querySelectorAll('td.postbody span.timg_container');

	// Insert custom styles:
	var styles = document.createElement('style');
	document.documentElement.appendChild(styles);

	styles.setAttribute('type', 'text/css');
	styles.appendChild(document.createTextNode(
		'span.autosize,\
		span.autosize img,\
		span.too-large,\
		span.too-large img {\
			display: inline-block;\
			margin-bottom: 5px;\
			margin-top: 5px;\
			max-width: 100%;\
		}\
		span.too-large {\
			border: 5px solid red;\
			-moz-box-sizing: border-box;\
			-webkit-box-sizing: border-box;\
			box-sizing: border-box;\
			margin-bottom: 5px;\
			margin-top: 5px;\
			position: relative;\
		}\
		span.too-large:after,\
		span.too-large:before {\
			background: red;\
			color: white;\
			content: "Why do you got to suck so much? Resize this image or face an untimely meeting with The Moderator.";\
			cursor: default;\
			display: block;\
			left: -5px;\
			padding: 10px;\
			position: absolute;\
			right: -5px;\
			text-align: center;\
		}\
		span.too-large:after {\
			bottom: -5px;\
		}\
		span.too-large:before {\
			top: -5px;\
		}\
		span.too-large img {\
			margin-bottom: 0;\
			margin-top: 0;\
		}'
	));

	// Fix post table styles:
	forEach.call(posts, function(post) {
		post.style.tableLayout = 'fixed';
	});

	// Apply fixes for individual images:
	forEach.call(images, function(image) {
		//Util.imgurFix(image);
		Util.imageStyleFix(image);
	});

	// Disable tiny images:
	forEach.call(timages, function(image) {
		image.setAttribute('class', '');
	});

	forEach.call(tcontainers, function(container) {
		var image = container.querySelector('img'),
			link = container.querySelector('a');

		image.setAttribute('height', '');
		image.setAttribute('width', '');
		container.parentNode.replaceChild(link, container);
	});
}

catch (e) {
	console.log("Exception: " + e.name + " Message: " + e.message);
}