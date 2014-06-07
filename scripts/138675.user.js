// ==UserScript==
// @name			Something Awful Image Fixes
// @namespace		SA
// @description		Simpler image handling on Something Awful. Prevents images from breaking out of tables, turns "tiny" image and imgur thumbnails into their larger sized counterparts, wraps imgur images with links to the unmolested original image.
// @include			http://forums.somethingawful.com/*
// @version			1.0.2
// @grant			GM_openInTab
// @run-at			document-end
// @icon			http://forums.somethingawful.com/favicon.ico
// ==/UserScript==

var Util = {
	imgurFix: function(image) {
		var src = image.getAttribute('src');

		// Skip non-imgur images:
		if (/i\.imgur\.com/.test(src) === false) return;

		var bits,
			identity,
			extension,
			url;

		// Parse the URL:
		bits = /\/(.{5}|.{7})[hls]?\.(jpg|png|gif)/i.exec(src);

		if (!bits) return;

		identity = bits[1];
		extension = bits[2].toLowerCase();

		// Change image source:
		src = extension === 'gif'
			? 'http://i.imgur.com/' + identity + '.' + extension
			: 'http://i.imgur.com/' + identity + 'h.' + extension;
		url = 'http://i.imgur.com/' + identity + '.' + extension;

		var link = document.createElement('a'),
			parent = image.parentNode;

		image.setAttribute('src', src);
		link.setAttribute('href', url);
		parent.replaceChild(link, image);
		link.appendChild(image);
	},

	imageStyleFix: function(image, first) {
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

		if (image.clientWidth > 60 || image.clientHeight > 60) {
			image.style.display = 'inline-block';
			image.style.marginBottom = '5px';
			image.style.marginTop = '5px';
			image.style.maxWidth = '100%';
		}
	}
};

try {
	var forEach = Array.prototype.forEach;
	var posts = document.querySelectorAll('table.post'),
		images = document.querySelectorAll('td.postbody img, td.userinfo img'),
		timages = document.querySelectorAll('td.postbody img.timg'),
		tcontainers = document.querySelectorAll('td.postbody span.timg_container');

	// Fix post table styles:
	forEach.call(posts, function(post) {
		post.style.tableLayout = 'fixed';
	});

	// Apply fixes for individual images:
	forEach.call(images, function(image) {
		Util.imgurFix(image);
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