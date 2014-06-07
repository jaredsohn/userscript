// ==UserScript==
// @name           lu.scio.us +
// @namespace      lu.scio.us
// @include        http://lu.scio.us/hentai/albums/*
// @description	   Adds a new, easier to use interface when viewing an album. Also allows downloading of the entire album with downThemAll!
// @version			1.1
// ==/UserScript==

function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
// Start Code


// Global Vars
var loadedf = false;
var loadedr = false;
var title = 'undefined';
var author = 'undefined';
var desc = 'undefined';
var imagesize = 'n';
var curindex = 0;
var cache = [];
var setupDownload = true;
var developing = true;
var imagecount = -1;
var curimagecount = -1;
var keeprunning = true;
var body = -1;
var skipr = true;
var skipf = true;
var origbody;

// Setup debug functions
function dPrint(string) {
	if (developing) console.log(string);
}
function dObject(object) {
	if (developing) console.debug(object);
}


$ = unsafeWindow.jQuery;
$('<div id="loading"></div>').css({
	position: 'absolute',
	left: '50%',
	top: '50%'
}).appendTo('body');
$('<img src=""').css({
	width: 300,
	height: 300,
	padding: 20,
	margin: "-170px 0 0 -170px",
	'z-index': 61000,
	'background': '#ccc'
}).appendTo('#download');
// First, we design out new layout...
$('#background_layer, #background_layer2, #top_wrapper').css('display', 'none');
$('<div id="cudiv"></div>').css({
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	overflow: 'auto',
	position: 'absolute',
	'z-index': 60000
}).prependTo('body');
// Now throw in the top bar
$('<div id="cudivi"></div>').css({
	top: 0,
	left: 0,
	width: '100%',
	height: '30px',
	color: '#fff',
	position: 'absolute',
	background: "url('/hentai/images/reddawn/background.jpg')"
}).appendTo('#cudiv');
$('<div id="cuhead"></div>').css({
	margin: 'auto',
	width: '1000px',
	'text-align': 'left'
}).appendTo('#cudivi');
$('<div id="cuheadl" style="float: left; width: 250px;"></div>').appendTo('#cuhead');
$('<div id="cuheadr" style="margin-left: 250px;"></div>').appendTo('#cuhead');
$('<span style="color: #E3A460; font-weight: bold; font-size: 18pt;">LU.</span>').appendTo('#cuheadl');
$('<span style="color: #DD0A41; font-weight: bold; font-size: 18pt;">SCIO.</span>').appendTo('#cuheadl');
$('<span style="color: #E3A460; font-weight: bold; font-size: 18pt;">US. &nbsp &nbsp </span>').appendTo('#cuheadl');
$('<span style="float: right;"><a href="http://lu.scio.us/">Home</a> - <a href="http://lu.scio.us/hentai/">Hentai</a> - <a href="#">Fetishes</a>' +
	'<br /><a href="http://forum.lu.scio.us">Forum</a> - <a href="http://lu.scio.us/userlink/all">Links</a></span>')
	.appendTo('#cuheadr');
$('<span id="cutitle">Please wait, were loading your content ^^</span><br />').appendTo('#cuheadr');
$('<span id="cudesc">...</span>').appendTo('#cuheadr');
// Make our left thumbnail display
$('<div id="cuthumbs"><div style="text-align: center; font-weight: bold;">Thumbnails</div></div>').css({
	position: 'absolute',
	color: '#fff',
	left: 0,
	top: 30,
	bottom: 0,
	width: 140,
	padding: 5,
	overflow: 'auto',
	background: "url('/hentai/images/reddawn/background.jpg') -29px 0px"
}).appendTo('#cudiv');
$('<div id="cumain"><img style="height: 100%; display: block; margin: auto;" src="" alt="loading, please wait"></div>').css({
	position: 'absolute',
	color: '#fff',
	left: 150,
	top: 30,
	bottom: 0,
	right: 0,
	padding: 5,
	background: "#fff"
}).appendTo('#cudiv');
$('<div id="progressoo"></div>').css({
	position: 'absolute',
	'z-index': 60500,
	left: '50%',
	top: '50%'
}).appendTo('body');
$('<div id="progresso"></div>').css({
	width: 400,
	height: 20,
	border: '1px solid #5595A7',
	margin: "-10px 0 0 -200px",
	color: "#fff",
	'background': "#fff"
}).appendTo('#progressoo');
$('<div id="progress"></div>').css({
	width: '0%',
	height: '100%',
	background: '#42AEC2'
}).appendTo('#progresso');

	
// Now were going to add an invisible div, to hold all of our pictures.
$('<div style="display: none;" id="cupicurls"></div>').appendTo('body');
// Grab the title and byline
title = $('.album_title').text();
author = $('.byline a');
desc = $('.album_excerpt').text();
// Remove the scrolling of the body...


function parseImages(ignore) {
	// Now our storage technique is going to be this...
	// We take this page, grab the previous and next links. If there is no previous, continue on.
	// For each image, depending on its direction, prepend or append to the div "holders".
	// These holders will have data written to them to maintain the order of the images.
	
	// IF IGNORE IS 0, we go both ways, 1 we go back, 2 we go forward.
	
	// This is an important class. If we see that were not on an actual image, but in a gallery, we need to take a different route...
	if (ignore == 0) {
		var sourceurl = $('a:contains(View fullsize)', body).attr('href');
		if (typeof sourceurl != 'undefined') {
			if (body == -1) {
				$.ajax({async: false, url: '#', success: function(data) {body = data;}});
			}
			// This is an image in the gallery, continue
			addUrl(sourceurl, true);
			// Now for the progress, grab the number of images
			imagecount = $('.picturenav div:first li:first', body).text().replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			dPrint("Image count string found, its " + imagecount);
			imagecount = parseFloat(imagecount.substr(imagecount.lastIndexOf(' ')+1))-1;
			dPrint("Got the album count, its " + imagecount);
			dPrint("Viewing image in album, first image: " + sourceurl);
			origbody = body;
		} else {
			// This is not an image in the gallery, we assume its the thumbnails of it. Try to load that!
			var sourceurl = $('.thumbs li:first a', body).attr('href');
			dPrint("Viewing thumbnails, found first image: " + sourceurl);
			// Now load the new starting image into our script
			if (typeof sourceurl != 'undefined') {
				$.ajax({async: false, url: sourceurl, success: function(data) {body = data;}});
				parseImages(0);
			} else {
				dPrint('There was an error starting from the gallery view...');
			}
			return; // TODO: REMOVE, FOR TESTING PURPOSES ONLY
		}
	} else if (ignore == 1) {
		// Were trying to go backwards now...
		if (skipr) {
			skipr = false;
			var previouspreurl = $('div.picturenav div:eq(0) ul li:eq(1) a', origbody).attr('href');
			if (typeof previouspreurl != 'undefined') {
				// Now we load this page, and repeat (setting ignore to 1, cause we are going backwards)
				$.ajax({async: false, url: previouspreurl, success: function(data) {body = data;}});
			} else {
				loadedr = true;
			}
			return;
		}
		var previousurl = $('div.picturenav div:eq(0) ul li:eq(1) a', body).attr('href');
		// The next if statment makes sure its not the first image (value of 0), and then adds the image to our list at the beginning.
		addUrl($('a:contains(View fullsize)', body).attr('href'), true);
		if (typeof previousurl != 'undefined') {
			// Now we load this page, and repeat (setting ignore to 1, cause we are going backwards)
			$.ajax({async: false, url: previousurl, success: function(data) {body = data;}});
		} else
			loadedr = true; // Adds a flag to the script to say that we can go backwards anymore
	} else if (ignore == 2) {
		if (skipf) {
			skipf = false;
			var nextpreurl = $('div.picturenav div:eq(0) ul li:eq(2) a', origbody).attr('href');
			if (typeof nextpreurl != 'undefined') {
				// Now we load this page, and repeat (setting ignore to 1, cause we are going backwards)
				$.ajax({async: false, url: nextpreurl, success: function(data) {body = data;}});
			} else {
				loadedr = true;
			}
			return;
		}
		// Were trying to go forwards now...
		var nexturl = $('div.picturenav div:eq(0) ul li:eq(2) a', body).attr('href');
		addUrl($('a:contains(View fullsize)', body).attr('href'), false);
		if (typeof nexturl != 'undefined') {
			// Now we load this page, and repeat (setting ignore to 1, cause we are going backwards)
			$.ajax({async: false, url: nexturl, success: function(data) {body = data;}});
		} else
			loadedf = true; // Adds a flag to the script to say that we can go forward anymore
	}
	// If everythings done loading, we now start generating the display
	if (loadedf && loadedr) {
		createDisplay();
	}
}

function createDisplay() {
	$('#background_layer, #background_layer2, #top_wrapper').remove();
	$('<div id="faux-download"></div>').appendTo('body');
	var counter = 1;
	$('#cupicurls div').each(function () {
		var string = (counter < 1000 ? '0' : '') + (counter < 100 ? '0' : '') + (counter < 10 ? '0' : '') + counter;
		$("<a></a>").attr('href', $('.f', this).text()).text(string).appendTo('#faux-download');
		counter++;
	});
	$('#progressoo').css('display', 'none');
	$('#cutitle').html('<b>' + title + '</b> by ').append(author);
	$('#cudesc').html('<i>' + desc + '</i>');
	$('#cupicurls div').each(function () {
		var url = $('.t', this).text();
		$('<img src="'+url+'" alt="thumbnail" />').css({
			display: 'block',
			margin: '5px auto 5px auto',
			cursor: 'pointer'
		}).bind('click', function () {
			$('#cumain img').attr('src', $('#cupicurls div:eq(' + ($(this).index()-1) + ') .' + imagesize).text());
			curindex = $(this).index()-1;
		}).appendTo('#cuthumbs');
		var cacheImage = document.createElement('img');
		cacheImage.src = $('#cupicurls div:eq(' + ($(this).index()-1) + ') .' + imagesize).text();
		cache.push(cacheImage);
	});
	$('#cumain img').attr('src', $('#cupicurls div:eq(0) .' + imagesize).text());
	$(document).keypress(function(event) {
		if (event.keyCode == 37) { // right
			if (curindex - 1 >= 0 && curindex - 1 < $('#cupicurls div').size()) {
				curindex -= 1;
				$('#cumain img').attr('src', $('#cupicurls div:eq(' + curindex + ') .' + imagesize).text());
			}
		}
		if (event.keyCode == 39) { // left
			if (curindex + 1 >= 0 && curindex + 1 < $('#cupicurls div').size()) {
				curindex += 1;
				$('#cumain img').attr('src', $('#cupicurls div:eq(' + curindex + ') .' + imagesize).text());
			}
		}
		if (event.keyCode == 38) { // up (Switch to fullimage)
			$('#cusize').trigger('click');
		}
		if (event.keyCode == 40) { // up (Switch to fullimage)
			$('#cureload').trigger('click');
		}
	});
	$('<a id="cusize" href="#">Change to full size</div>').click(function () {
		if (imagesize == 'n') {
			imagesize = 'f';
			$('#cumain img').attr('src', $('#cupicurls div:eq(' + curindex + ') .' + imagesize).text());
			$(this).text('Change to normal size');
		} else {
			imagesize = 'n';
			$('#cumain img').attr('src', $('#cupicurls div:eq(' + curindex + ') .' + imagesize).text());
			$(this).text('Change to full size');
		}
		return false
	}).css({
		position: 'absolute',
		top: 5,
		right: 5,
		cursor: 'pointer'
	}).appendTo('#cumain');
	$('<a id="cureload" href="#">Reload Image</div>').click(function () {
		$('#cupicurls div:eq(' + curindex + ') .' + imagesize).text($('#cupicurls div:eq(' + curindex + ') .' + imagesize).text() + "?r=" + Math.round(new Date().getTime() / 1000));
		$('#cumain img').attr('src', $('#cupicurls div:eq(' + curindex + ') .' + imagesize).text());
		
		return false
	}).css({
		position: 'absolute',
		top: 20,
		right: 5,
		cursor: 'pointer'
	}).appendTo('#cumain');
	$('<a id="cureload" href="#">Download Images</div>').click(function () {
		downloadThemAll();
	}).css({
		position: 'absolute',
		top: 35,
		right: 5,
		cursor: 'pointer'
	}).appendTo('#cumain');
}

function downloadThemAll() {
	if (setupDownload) {
		$('<div id="download"></div>').css({
			position: 'absolute',
			'z-index': 61000,
			left: '50%',
			top: '50%'
		}).appendTo('body');
		$('<div id="downloadi">To download this entire album, follow these steps...<br /><br />' +
			'<b>Step one</b><br />If you dont have it already, go and download <a href="https://addons.mozilla.org/en-US/firefox/addon/201/">downThemAll!</a>.<br /><br />' +
			'<b>Step two</b><br />After restarting, <span style="text-decoration: line-through;">make sure this window is open! (It will now work without it opened!).</span><br /><br /> ' +
			'<b>Step three</b><br />Open up downThemAll!, and on the links tab, check the Images (jpg, png, ...) option.<br /><br />' + 
			'<b>Step four</b><br /><b>VERY IMPORTANT</b>, unless you want all these pages out of order, set the renaming mask to *text*.*ext*<br /><br />' + 
			'<b>Final step</b><br />Choose where to save it, and hit start!<br /><br /></div>').css({
			width: 300,
			height: 350,
			padding: 20,
			margin: "-195px 0 0 -170px",
			color: "#fff",
			'background': "url('/hentai/images/reddawn/background.jpg')"
		}).appendTo('#download');
		$('<a href="#">(close)</a>').click(function () {
			$('#download').css('display', 'none');
		}).appendTo('#downloadi');
		setupDownload = false;
	}
	$('#download').css('display', 'block');
}

// Generates a url for either a normal image or a thumb (true for second parameter means norm)
function makeUrl(url, norm) {
	if (typeof url != "undefined")
		return url.substr(0, url.lastIndexOf('/')+1) + (norm ? 'normal__' : 'thumb_100_') + url.substr(url.lastIndexOf('/')+1)
	else
		dPrint("An attempt at making an undefined url was attempted...");
}
function addUrl(imgUrl, prev) {
	if (typeof imgUrl != 'undefined') {
		// This now takes the fullscreen image url, and makes a normal image url out of it
		var norm = makeUrl(imgUrl, true);
		// This now takes the fullscreen image url, and makes a thumbnail image url out of it
		var thumb = makeUrl(imgUrl, false);
		if (prev) $('<div><span class="f">'+imgUrl+'</span><span class="n">'+norm+'</span><span class="t">'+thumb+'</span></div>').prependTo('#cupicurls');
		else $('<div><span class="f">'+imgUrl+'</span><span class="n">'+norm+'</span><span class="t">'+thumb+'</span></div>').appendTo('#cupicurls');
		var progress = (++curimagecount/imagecount)*398;
		$('#progress').css('width', progress + 'px');
	} else {
		dPrint("An attempt at adding an undefined url was attempted...");
	}
}


// Now for the main section, and loops
body = $(document);
parseImages(0);
while (!loadedr) {
	parseImages(1);
}
while (!loadedf) {
	parseImages(2);
}




// End code
	}
}

// Adding jQuery :p

(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();