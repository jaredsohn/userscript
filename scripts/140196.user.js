// ==UserScript==
// @name         Facebook notifications favicon
// @description  Show the number of Facebook notifications in the favicon
// @include      http://*.facebook.com/*
// @include      https://*.facebook.com/*
// ==/UserScript==

// Display the notification number in the favicon
// Modified from http://remysharp.com/2010/08/24/dynamic-favicons/
var img = document.createElement('img');
var notif = document.createElement('img');
notif.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAJCAYAAACbtcTcAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wHDgEJG6GyxUUAAACoSURBVDjL3VTBEYAgDGs5/7qEbqHD4xa6hE6AL7mSayn+OPtqKSmJQfha50Qdx7Sf7HBk7l1ES3BKKYu4t4WIiMZ4FDn2rL2yb2Gw79UtEXCzHPL25HCsLfIo8q1lbpHVyI/xyGfIPItoGYBCa8K1Wq59xaNTyDF4VmkgzRnLOc3p2pfXnEIsihxQubSsdqdrB3lX1MJYeE1o8WP/4XUKvROc9pO9F/YBZ+2YWpja+rcAAAAASUVORK5CYII=";
img.crossOrigin = ''; // Prevent security error ( http://blog.chromium.org/2011/07/using-cross-domain-images-in-webgl-and.html )
function updateFavicon() {
	var canvas = document.createElement('canvas'),
			ctx, link = document.getElementById('favicon').cloneNode(true);
	if (canvas.getContext) {
		canvas.height = canvas.width = 16; // set the size
		ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0);
		// Draw notification number
		var ncount=
				Number(document.getElementById('requestsCountValue').textContent) +        // Friend requests
				Number(document.getElementById('mercurymessagesCountValue').textContent) + // Messages
				Number(document.getElementById('notificationsCountValue').textContent);     // Notifications
		if (ncount > 90) {
			ctx.drawImage(notif,40,0,9,9,16-9,0,9,9); // Infinity
		} else if (ncount > 0) {
			ctx.drawImage(notif,40,0,2,9,16-1,0,1,9); // End cap
			ctx.drawImage(notif,(ncount%10)*4,0,4,9,16-5,0,4,9); // Low digit
			if (ncount > 9) {
				ctx.drawImage(notif,parseInt(ncount/10)*4,0,4,9,16-9,0,4,9); // high digit
				ctx.drawImage(notif,40,0,2,9,16-11,0,2,9); // end cap
			} else {
				ctx.drawImage(notif,40,0,2,9,16-7,0,2,9); // end cap
			}
		}
		// Set the favicon
		link.href = canvas.toDataURL('image/png');
		document.body.appendChild(link);
	}
}
img.onload = function () { // once the image has loaded
	var flink=window.document.createElement("link");
	flink.id="favicon";
	flink.rel="icon";
	flink.type="image/png";
	flink.href="/favicon.png";
	window.document.head.appendChild(flink);
	updateFavicon();
	window.setInterval(updateFavicon,15000);
}
img.src="/favicon.ico";