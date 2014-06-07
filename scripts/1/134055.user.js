// ==UserScript==
// @name		MassiveFap
// @author		Ryan Thaut
// @description	A complete ImageFap.com gallery conversion script featuring customization options and multiple viewing modes.
// @namespace	http://userscripts.org/users/49075
// @include		http://*imagefap.com/*
// @version		1.5.1.2
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_registerMenuCommand
// @grant		GM_addStyle
// ==/UserScript==



/*	===== Integration =====
	This is where the initial/basic eventListeners are added.
*/
window.addEventListener('load', init, false);
document.addEventListener('DOMContentLoaded', init, false);



/*	===== Global Variables =====
	Changing these is a terrible idea; they are NOT for configuration
*/
var loaded = false;
var images = [];
var head, body, title, addFavLink;
var author = {name: '', url: ''};
var activeImage = (parseInt(getHashParam('image'), 10) - 1) || 0;
var totalImages = 0;
var hotkeys = [
		{
			action:	displayHelp,
			codes:	[191],
			keys:	'?',
			label:	'Display Help',
			modif:	{altKey: false, ctrlKey: false, metaKey: false, shiftKey: true}
		},
		{
			action:	displayAbout,
			codes:	[65],
			keys:	'a',
			label:	'Display About',
			modif:	{altKey: false, ctrlKey: false, metaKey: false, shiftKey: false}
		},
		{
			action:	toggleFullScreen,
			codes:	[70],
			keys:	'f',
			label:	'Toggle Full Screen',
			modif:	{altKey: false, ctrlKey: false, metaKey: false, shiftKey: false}
		},
		{
			action:	switchGalleryMode,
			codes:	[71],
			keys:	'g',
			label:	'Switch Gallery Mode',
			modif:	{altKey: false, ctrlKey: false, metaKey: false, shiftKey: false}
		},
		{
			action:	changeSettings,
			codes:	[83],
			keys:	's',
			label:	'Change Settings',
			modif:	{altKey: false, ctrlKey: false, metaKey: false, shiftKey: false}
		},
		{
			action:	toggleThumbs,
			codes:	[84],
			keys:	't',
			label:	'Change Thumbnails',
			modif:	{altKey: false, ctrlKey: false, metaKey: false, shiftKey: false}
		},
		{
			action:	hideDialog,
			codes:	[27],
			keys:	'esc',
			label:	'Hide Dialog Window',
			modif:	{altKey: false, ctrlKey: false, metaKey: false, shiftKey: false}
		},
		{
			action:	prevImage,
			codes:	[37, 38],
			keys:	'&larr; &uarr;',
			label:	'Previous Image',
			modif:	{altKey: false, ctrlKey: false, metaKey: false, shiftKey: false}
		},
		{
			action:	nextImage,
			codes:	[39, 40],
			keys:	'&rarr; &darr;',
			label:	'Next Image',
			modif:	{altKey: false, ctrlKey: false, metaKey: false, shiftKey: false}
		},
		{
			action:	toggleAutoplay,
			codes:	[32],
			keys:	'[space]',
			label:	'Start/Stop Autoplay',
			modif:	{altKey: false, ctrlKey: false, metaKey: false, shiftKey: false}
		}
	];
var settings = {
		'autoplay':	{
			name:	'autoplayDelay',
			label:	'Auto Play Delay',
			hint:	'in seconds',
			type:	'integer',
			size:	3,
			min:	0,
			max:	null,
			def:	2
		},
		'inifiteScrolling':		{
			name:	'inifiteScrolling',
			label:	'Infinite Scrolling',
			type:	'boolean',
			def:	true
		},
		'mode':		{
			name:	'galleryMode',
			label:	'Gallery Mode',
			type:	'select',
			opts:	['scrolling', 'slideshow'],
			def:	'scrolling'
		},
		'pagination':	{
			name:	'imageLimit',
			label:	'Pagination Limit',
			hint:	'use <b>0</b> to disable',
			type:	'integer',
			size:	3,
			min:	0,
			max:	null,
			def:	50
		},
		'preloading':	{
			name:	'preloadingEnabled',
			label:	'Image Preloading',
			type:	'boolean',
			def:	true
		},
		'theme':		{
			name:	'theme',
			label:	'Gallery Theme',
			type:	'select',
			opts:	['default', 'classic', 'green', 'blue'],
			def:	'default'
		},
		'thumbnails':	{
			name:	'showThumbs',
			label:	'Show Thumbnails',
			type:	'boolean',
			def:	true
		},
		'thumbnailsSize':	{
			name:	'thumbnailsSize',
			label:	'Thumbnails Size',
			type:	'select',
			opts:	['small', 'medium', 'large'],
			def:	'medium'
		}
	};

// objects for features that need multiple settings and calculated properties
var autoplay = {
		active: false,
		count:	parseInt(GM_getValue(settings.autoplay.name, settings.autoplay.def), 10),
		delay:	parseInt(GM_getValue(settings.autoplay.name, settings.autoplay.def), 10),
		paused: false,
		timer:	undefined
	};
var pagination = {
		append: GM_getValue(settings.inifiteScrolling.name, settings.inifiteScrolling.def),
		active:	false,
		limit:	parseInt(GM_getValue(settings.pagination.name, settings.pagination.def), 10),
		page:	parseInt(getHashParam('page'), 10) || 1
	};
var preloading = {
		active: GM_getValue(settings.preloading.name, settings.preloading.def),
		done:	false,
		pos:	activeImage
	};

/*	===== Base64 Encoded Images =====
	I would rather not link to external images, but doing this is not a whole lot better.
*/
const blank = {
		image:	"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
		width:	1,
		height:	1
	};

const loading = {
		image:	"data:image/gif;base64," +
				"R0lGODlhGAAYAPYAACIiIiUlJSoqKi8vLzExMTk5OUFBQUhISE9PT1lZWWdnZ2pqam1tbXt7e35+foKCgo" +
				"uLi4yMjJGRkZubm5ycnKmpqa6urrS0tCYmJikpKTMzMzY2Njo6OkBAQEREREtLS01NTVNTU1ZWVl9fX2Zm" +
				"ZmhoaG5ubnBwcHp6en19fYSEhIqKio+Pj5CQkJaWlpmZmZ6enqOjo6SkpKioqK+vr7Kysra2ticnJy4uLj" +
				"IyMj09PUNDQ0dHR0pKSlxcXGBgYGlpaXFxcXd3d4CAgIeHh4iIiI2NjZeXl6KiorOzsz8/P0ZGRlBQUFhY" +
				"WH9/f4WFhYmJibGxsSsrKzU1Naenp7W1tSgoKElJSUxMTJWVlZiYmAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
				"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
				"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/i1NYWRlIGJ5IEtyYX" +
				"NpbWlyYSBOZWpjaGV2YSAod3d3LmxvYWRpbmZvLm5ldCkAIfkEAAoA/wAsAAAAABgAGAAABf8gII5kUBRk" +
				"qo6BKEiSIAbtOg7NIg7TJAOLxsAmIkwqBoCgNzRUJgSiKHF5BJa+wOOSsA2iSsgFgRUgLpAfYThrUBKyg0" +
				"VCcDgIEstBmaA0agELFRcRBwIMCgJXAQoMAgdiFQs1ACZbFgyUI4cWVQWaMwgSCjYLEgiaVwIDAgIEPyqu" +
				"rayKBRIUuBQOsCkCDrg9Eie3E7gOoCy/ucJXtLI2sq2tqaKkKwqnyJYXmLwzDJ0PBpSBgxCGDAuKV40BBx" +
				"EXkoBucAByEXV3eXsCfX8jBMAIEEOmmBlCatiooGJlCQVFW7pIMYIEAI8JTZ6A8ZLDRY8fQRTaoOFCQoQf" +
				"JKUGpDDxSUoIACH5BAAKAP8ALAAAAAAYABgAAAb/QIBwCMAMMRsNcckscpSAwUtlbDY/s5OQM1sJMR+Oda" +
				"iBxTaATi0l9MhWmWZcWLKVAJ+adsCqJZocKwlGGzIvAyE2JAAmNihVS1g1KEonNiIfLiAgNC9oABofGJAe" +
				"LTYvIBwjGhgZGCIwIAAbJTAyYkQDJjQwUEQaHCYyNjInUJB4IlYjNjAln6AqKyknJCDIvyIDSxwvMzU2Ni" +
				"5zTSAhHx1PQhobHR/nYxku4TUzLrhkIr5LGCAkJylWqPBFC4aNEVYwHami4cSwGCbULdkAg4aJbUS4OEMD" +
				"AoaIVqBGcADxwkaLDkQyfICy4QWNDyA0ibChRQOKerKYYEBhwwQAPhI2QgwwgwZDghX4iCSowWKbpQ8/7Q" +
				"xxpXPFDJQAUtBAuSHGi32ArhVRQQPXiRlQx/BT4QKjhg7Y1IJKaiUIACH5BAAKAP8ALAAAAAAYABgAAAf/" +
				"gACCg4SCNzkChYqFHEAcghtHQYuUAD4XQII9SUKDiZWQFUeJPkk+gjpEPYs9PzcAN0JJq7KrORIXP4o3RB" +
				"dCOAAhnDdGFRsCQ8OLOrhFGzlIRjlDRDhASUXAlNMXRzo7HDcCOBxIRxuCHD6Pg68CQUirhTw6OCFDSJgA" +
				"70I+PRvkKPGAcSHJEUcAchy5ULBCNkocjAjpkaPdhh4+hBgZ8mkRjleVDlVCJtHfMU88NLJTlKNIhSQwj1" +
				"RsdAQmDB4QcVzMGCQRkAtIhoTAoUMeIR5IgHwCCUBdOACRkHDAIeAGBx47ag6pSElAkSRAcBTZagRGjg1F" +
				"LkjQsShWEo4bNCoYcRsCAA4hF4p0HFRKArpNnQAb8seqCFtLpuweMQZKUMdagn6eakwoyLl0CCm3y8G0Ui" +
				"AAIfkEAAoA/wAsAAAAABgAGAAAB/+AAIKDgzc3hYSJioJNUByCHFBNi5QACjaTAE02JZWDSgOCS1FOgk5R" +
				"S4IDSotKMU+hAxQUA7K0AANPMayJuTawAKc7O6S4Kr+hir6wTTFMTDFNy8mLvkIDG4YbA0LIik0KS7FCCI" +
				"oI17hLCpM3UDZRFCrSlANNKhRRNiqGHE1O+DE2UNoQA56TJhwODRqwA4FCRTcQ7KDWq+HDRBEnAnjY71+U" +
				"gAMLUjj4qN07Ck/mVbOHzwaUQ+DE4SJnDt0AdZkIWcOmjZs+ir2e/Gz2LNqAYyqAqhKaNFiUHaNKHf2pyB" +
				"UwW7VmxVKxq1WyqKZQqeLlqQQmRjYUePrmCJKktRAFC11MFAgAIfkEAAoA/wAsAAAAABgAGAAAB/+AAIKD" +
				"gzc5N4SJiopBR1OCHEAci4lSg0JVPYJAVT6Ugz1FSoI+nQBSR1SPAIiLpS05AD1RQgA8UUOINz6aijeYuV" +
				"MVRr9VIQADQlFErZVEVUA5RUM5RjADU0VVRqODHD4ciFNHSBwDNzccO0owVUKxhJxUQiEDSjyKPEhAA4OW" +
				"AJGOVKkCY8eidNh6+BAC5N+pHkKMTFo0oEiFKAOPwCuUw2GlIUaE8JoiTmHEIR4JGWomKIfAgRWK9FvEwU" +
				"iQHg6lBBHZY8qAiYp2tItyRJKgZlKAIMGXiIeSASGGUIGWKMeQKkd27Hgk5ScSR5DAEeLQokoRnzBgDSmS" +
				"g5PMg886hPQL4e6GkQokrwphCepHqyFR8CnTlKPsj0+QqByxVMoTACVFen0qBURQD3eFEEMyCmBcEM2IV3" +
				"4KBAAh+QQACgD/ACwAAAAAGAAYAAAH/4AAgoOEORwBg4iEi4wBKlo5goaKjIMcWIKOFRyCJhVXlYNWKxUe" +
				"gik1HQAbMTAboYMJNSwDACc2oCU2JaKhASg2JgAkNiEDMDGvAQkrnJlXkataNFhYWlciNicBOSg1n4MdFT" +
				"Alr1gwIgFW3COXWjYtHZQ5JzE2Micc0YQbMDQmtRhtKAHDxo9QIjAlYpRDxL5FAUKQOJFihYpIhjpcCXGF" +
				"0iIrWWzU+JaFA4csFWrYsJHFI6EAWERc6bABo4oVKU6QCOFyUMOALwnFDPXDBrlXjAaYoAHjoSQOJ2TcO/" +
				"HQQwsbWrBw+JFDXQARMDANhFFBlSAsMmqgeGXChsysWEtoaEGao6MlFgkQsYIxIBsJAG1R9BRkZZAuXli0" +
				"ARjAokYCWJKQveJAI4UgDxVWFIZ1pcIJQRwyIwpwxRmsAB2iDdCiYjDkRPogBwIAOw==",
		width:	36,
		height:	36
	};



/*	===== Core Functions =====
	Where the magic happens...
*/

/* Crawls the normal gallery page and finds all thumbnail images
 * @return	Array	locations of all thumbnail images
 */
function findImages() {
	var imgs = document.getElementById('gallery').getElementsByTagName('img');
	var thumbRegex = /(.*\/images\/thumb\/.*)\/(.*)$/i;

	var count = 0;
	var image;
	var ret = [];
	for (var i = 0; i < imgs.length; i++) {
		if (thumbRegex.test(imgs[i].src)) {
			image = {
				id: 	imgs[i].src.split('/').pop().split('.')[0],
				pos: 	count++,
				thumb: 	imgs[i].src,
				full: 	imgs[i].src.replace('thumb', 'full')
			};
			ret.push(image);
		}
	}

	totalImages = ret.length;
	return ret;
}

/* Sets the global variables needed for pagination in other functions
 */
function initPagination() {
	initSetting('pagination');

	// reset pagination object properties to default
	pagination = {
		append: settings.inifiteScrolling.value,
		active:	(settings.mode.value === 'slideshow'),
		limit:	parseInt(settings.pagination.value, 10),
		page:	parseInt(getHashParam('page'), 10) || 1
	};

	if ((pagination.limit <= 0) || (settings.mode.value === 'slideshow')) {
		// in slideshow mode pagination is handled as if it is disabled
		pagination.active = false;
		pagination.limit = totalImages;
		pagination.page = 1;
	} else {
		pagination.active = true;
		if (!pagination.page || (pagination.page < 1))
			pagination.page = 1;
	}
	
	// ensure the user is on the correct page
	var page = findImagePage();
	if (page !== pagination.page) {
		setHashParam('page', page);
		pagination.page = page;
	}
}

/* Finds the page number that the active image should be on
 * @param	Int		(Optional) The number of the image to find (default: value of activeImage internal variable)
 * @return	Int		The page number containing the active image
 */
function findImagePage(pos) {
	if ((typeof activeImage === 'undefined') || !activeImage || (activeImage <= 0))
		return 1;
	
	return parseInt(((activeImage / pagination.limit) + 1), 10);
}

/* Returns the images that will be used on the current page
 * @param	Array	Objects representing all images from the original gallery
 * @return	Array	Multi-dimensional array of objects representing all images on each page
 */
function paginateImages(imgs) {
	// if images have been paginated previously, they must first be un-paginated
	if (typeof imgs[0] === 'object' && typeof imgs[0][0] === 'object')
		imgs = resetImages(imgs);

	var page = 0;
	var ret = [];
	for (var i = 0; i < imgs.length; i++) {
		if (typeof ret[page] === 'undefined')
			ret[page] = [];
		ret[page].push(imgs[i]);

		if (((i + 1) % pagination.limit) === 0)
			page++;
	}
	return ret;
}

/* Flattens a paginated multi-dimensional array of images
 * @param	Array	Multi-dimensional array of objects representing all images on multiple page
 * @return	Array	Multi-dimensional array of objects representing all images on one page
 */
function resetImages(imgs) {
	var ret = [];
	for (var i = 0; i < imgs.length; i++) {
		for (var j = 0; j < imgs[i].length; j++) {
			ret.push(imgs[i][j]);
		}
	}
	// if the supplied array was only 1-dimensional, then the new array will be empty
	if (ret.length === 0)
		ret = imgs;
	return ret;
}

/* Loads the next "page" of images in Infinite Scrolling mode
 * Updates the position text and the pagination links
 */
function loadNextPage() {
	if (pagination.page < images.length) {
		pagination.page++;
		showNotification('Loading images from page ' + pagination.page);

		updatePosition(undefined, (pagination.limit * pagination.page), undefined, undefined);
		updatePagination(pagination.page);

		populateScrollingGallery(images[(pagination.page - 1)], false);
		populateThumbnails(images[(pagination.page - 1)], false);

		setHashParam('page', pagination.page);
	} else {
		var loader = document.getElementById('loader');
		if (loader)
			loader.parentNode.removeChild(loader);
	}
}

/* Generates HTML for the help dialog
 * @return	String	HTML to be placed in the dialog
 */
function getAbout() {
	var about = '';
	about += '<p>' + GM_info.script.name + ' v' + GM_info.script.version + '. Automatic script updates are ' + ((GM_info.scriptWillUpdate) ? 'enabled' : 'disabled') + '. </p>';
	about += '<p>' + GM_info.script.description + '</p>';

	return about;
}

/* Generates HTML for the help dialog
 * @return	String	HTML to be placed in the dialog
 */
function getHelp() {
	var help = '';
	help += '<table>';
	help += '<tr><th></th><th>Hotkeys</th></tr>';
	for (var h in hotkeys)
		help += '<tr><td class="key"><b>' + hotkeys[h].keys + '</b></td><td class="command">' + hotkeys[h].label + '</td></tr>';
	
	help += '</table>';

	return help;
}

/* Generates the DOM objects needed for the thumbnail images
 * @param	Array	The objects of all images to be displayed
 * @param	Bool	(Optional) If the existing thumbnails should be removed (default: false)
 */
function populateThumbnails(imgs, reset) {
	reset = (typeof reset === "undefined") ? false : reset;

	var thumbs = document.getElementById('thumbnails');
	if (!thumbs)
		return false;

	if (reset)
		thumbs.innerHTML = '';
	thumbs.className = settings.thumbnailsSize.value;

	var img, link;
	for (var i = 0; i < imgs.length; i++) {
		img = document.createElement('img');
		img.src = imgs[i].thumb;

		link = document.createElement('a');
		link.addEventListener('click', clickThumbnail);
		link.className = 'thumbnail';
		link.id = 'thumb_' + imgs[i].pos;
		link.rel = imgs[i].pos;
		link.appendChild(img);

		thumbs.appendChild(link);
	}
}

/* Generates the DOM objects needed for the scrolling mode
 * @param	Array	The objects of all images to be displayed
 * @param	Bool	(Optional) If the existing gallery images should be removed (default: false)
 */
function populateScrollingGallery(imgs, reset) {
	reset = (typeof reset === "undefined") ? false : reset;
	
	var gallery = document.getElementById('gallery');
	if (!gallery)
		return false;

	if (reset)
		gallery.innerHTML = '';

	var container, img, link;
	for (var i = 0; i < imgs.length; i++) {
		img = document.createElement('img');
		img.alt = '';
		img.rel = imgs[i].pos;
		img.src = imgs[i].full;

		link = document.createElement('a');
		link.className = 'image';
		link.href = imgs[i].full;
		link.id = 'full_' + (((pagination.page - 1) * pagination.limit) + i);
		link.appendChild(img);

		container = document.createElement('p');
		container.appendChild(link);

		gallery.appendChild(container);
	}

	if (pagination.append && (imgs.length < totalImages)) {
		var loader = document.getElementById('loader');
		if (!loader) {
			loader = document.createElement('a');
			loader.id = 'loader'
			loader.innerHTML = 'Load Next Page of Images';
			loader.addEventListener('click', loadNextPage);
		}
		gallery.appendChild(loader);
	}
}

/* Generates the DOM objects needed for the slideshow mode
 * @param	Object	The object representing the active image 
 */
function buildSlideshowGallery(active) {
	var gallery = document.getElementById('gallery');
	if (!gallery)
		return false;

	gallery.innerHTML = '';

	var prev = document.createElement('a');
	prev.addEventListener('click', prevImage);
	prev.id = 'prev';
	prev.className = 'nav';
	prev.innerHTML = '<span class="arrow"><</span>';

	var next = document.createElement('a');
	next.addEventListener('click', nextImage);
	next.id = 'next';
	next.className = 'nav';
	next.innerHTML = '<span class="arrow">></span>';

	var img = document.createElement('img');
	img.alt = '';
	img.id = 'slideshowImage';
	img.src = active.full;

	var link = document.createElement('a');
	link.className = 'image';
	link.href = active.full;
	link.id = 'slideshowLink';
	link.appendChild(img);

	gallery.appendChild(link);
	gallery.appendChild(prev);
	gallery.appendChild(next);

	// resize the slideshow area
	resizeSlideshowGallery();
}

/* Resizes the DOM object containing the slideshow image to accomodate non-fixed header and footer sizes
 */
function resizeSlideshowGallery() {
	var content = document.getElementById('content');
	if (!content)
		return false;
	
	// header
	var header = document.getElementById('header');
	content.style.top = (header) ? header.offsetHeight + 'px' : '';
	
	// footer
	var footer = document.getElementById('footer');
	content.style.bottom = (footer) ? footer.offsetHeight + 'px' : '';
}

/* Generates the DOM objects for the header of rebuilt pages
 */
function buildHeader() {
	var header = document.getElementById('header');
	if (!header)
		return false;

	header.innerHTML = '';
	
	// logo
	var logo = document.createElement('a');
	logo.href = window.location.protocol + '//' + window.location.host;
	logo.id = 'logo';
	logo.innerHTML = '<span class="image">Image</span><span class="fap">Fap</span>';
	header.appendChild(logo);
	
	// heading
	var heading = document.createElement('h2');
	heading.id = 'heading';
	heading.innerHTML = '"<span class="title">' + stripslashes(title) + '</span>"';
	if (author.name && author.url)
		heading.innerHTML += ' <small>by</small> <a href="' + author.url + '">' + unescape(stripslashes(author.name)) + '</a>';
	header.appendChild(heading);
	
	// description
	if (desc) {
		var description = document.createElement('p');
		description.id = 'description';
		description.innerHTML = stripslashes(desc);
		header.appendChild(description);

		// if the description spans multiple lines, left-align the text
		if (description.offsetHeight > 16)
			description.style.textAlign = 'left';
	}

	// sub-heading
	var subheading = document.createElement('p');
	header.appendChild(subheading);
	// sub-heading > position
	var position = document.createElement('span');
	position.className = settings.mode.value;
	position.id = 'position';
	subheading.appendChild(position);
	// sub-heading > spacer
	var separator = document.createElement('span');
	separator.innerHTML = ' | ';
	subheading.appendChild(separator);
	// sub-heading > "toggle thumbnails" link
	var toggle = document.createElement('a');
	toggle.addEventListener('click', toggleThumbs);
	toggle.innerHTML = 'Toggle Thumbnails';
	subheading.appendChild(toggle);
	// sub-heading > spacer
	var separator = document.createElement('span');
	separator.innerHTML = ' | ';
	subheading.appendChild(separator);
	// sub-heading > "change settings" link
	var openSettings = document.createElement('a');
	openSettings.addEventListener('click', changeSettings);
	openSettings.innerHTML = 'Change Settings';
	subheading.appendChild(openSettings);
	
	// pagination
	if (settings.mode.value === 'scrolling' && pagination.active)
		buildPagination('header');
	
	// search form
	var form = document.createElement('form');
	form.id = 'search';
	form.method = 'POST';
	form.action = window.location.protocol + '//' + window.location.host + '/gallery.php';
	header.appendChild(form);
	// search form > text input
	var search = document.createElement('input');
	search.type = 'text';
	search.value = 'Enter search term(s)...';
	search.name = 'search';
	search.addEventListener('focus', function() { if (this.value === 'Enter search term(s)...') this.value = ''; });
	search.addEventListener('blur', function() { if (this.value === '') this.value = 'Enter search term(s)...'; });
	form.appendChild(search);
	// search form > submit button
	var submit = document.createElement('input');
	submit.type = 'submit';
	submit.value = 'Search';
	submit.name = 'submit';
	form.appendChild(submit);
}

/* Generates the DOM objects for the footer of rebuilt pages
 */
function buildFooter() {
	var footer = document.getElementById('footer');
	if (!footer)
		return false;

	footer.innerHTML = '';
	
	footer.appendChild(addFavLink);
	
	if (settings.mode.value === 'scrolling' && pagination.active)
		buildPagination('footer');
	
	buildInfo();
	buildAutoplay();
}

/* Updates the HTML for the position of the current image(s) within the gallery
 * @param	Int		(Optional) The lower limit image number (default: use existing value from DOM)
 * @param	Int		(Optional) The upper limit image number (default: use existing value from DOM)
 * @param	Int		(Optional) The total image number (default: use existing value from DOM)
 * @param	Int		(Optional) The active image number (default: use existing value from DOM)
 */
function updatePosition(lower, upper, total, active) {
	var position = document.getElementById('position');
	if (!position)
		return false;
	
	if (position.className !== settings.mode.value) {
		position.className = settings.mode.value;
		position.innerHTML = '';
	}

	if (settings.mode.value === 'scrolling') {
		if (position.innerHTML === undefined || position.innerHTML === '')
			position.innerHTML = 'Viewing image(s) <span id="position_lower">' + lower + '</span>-<span id="position_upper">' + upper + '</span> of <span id="position_total">' + total + '</span>';
		
		lower = (typeof lower === "undefined") ? parseInt(document.getElementById('position_lower').innerHTML, 10) : lower;
		upper = (typeof upper === "undefined") ? parseInt(document.getElementById('position_upper').innerHTML, 10) : upper;
		total = (typeof total === "undefined") ? parseInt(document.getElementById('position_total').innerHTML, 10) : total;
		if (upper > totalImages)
			upper = totalImages;
		document.getElementById('position_lower').innerHTML = lower;
		document.getElementById('position_upper').innerHTML = upper;
		document.getElementById('position_total').innerHTML = total;
	} else if (settings.mode.value === 'slideshow') {
		if (position.innerHTML === undefined || position.innerHTML === '')
			position.innerHTML = 'Viewing image <span id="position_active">' + lower + '</span> of <span id="position_total">' + total + '</span>';

		active = (typeof active === "undefined") ? parseInt(document.getElementById('position_active').innerHTML, 10) : active;
		total = (typeof total === "undefined") ? parseInt(document.getElementById('position_total').innerHTML, 10) : total;
		document.getElementById('position_active').innerHTML = active;
		document.getElementById('position_total').innerHTML = total;
	}
}

/* Generates the DOM objects for the pagination of rebuilt gallery pages
 * @param	String	The ID of the DOM object of which to insert the pagination controls
 */
function buildPagination(location) {
	var container = document.getElementById(location);
	if (!container)
		return false;
	
	var pages = Math.ceil(totalImages / pagination.limit);
	
	if (pages <= 1)
		return false;
		
	var wrapper = document.createElement('div');
	wrapper.className = 'pagination';

	// previous page
	var prev = document.createElement('a');
	prev.innerHTML = '&laquo; Prev';
	if (pagination.page > 1) {
		prev.addEventListener('click', clickPagination);
		prev.rel = (pagination.page - 1);
	} else {
		prev.className = 'disabled';
	}
	wrapper.appendChild(prev);

	// individual pages
	var link, lower, upper;
	for (var i = 1; i <= pages; i++) {
		link = document.createElement('a');
		link.rel = i;
		
		lower = (pagination.limit * (i - 1) + 1);
		upper = (i < pages) ? (pagination.limit * i) : totalImages;
		link.innerHTML = (lower === upper) ? lower : lower + '-' + upper;

		if (i === pagination.page) {
			link.className = 'current';
		} else {
			link.addEventListener('click', clickPagination);
		}
		wrapper.appendChild(link);
	}

	// next page
	var next = document.createElement('a');
	next.innerHTML = 'Next &raquo;';
	if (pagination.page < pages) {
		next.addEventListener('click', clickPagination);
		next.rel = (pagination.page + 1);
	} else {
		next.className = 'disabled';
	}
	wrapper.appendChild(next);

	container.appendChild(wrapper);
}

/* Updates the pagination controls
 * @param	Int		The number of the current page
 * @param	Bool	(Optional) If all pagination controls should be reset (default: false)
 */
function updatePagination(page, reset) {
	reset = (typeof reset === "undefined") ? false : reset;

	var containers = document.getElementsByClassName('pagination');
	if (containers.length === 0)
		return false;

	var links, rel;
	for (var i = 0; i < containers.length; i++) {
		links = containers[i].getElementsByTagName('a');

		// first handle all of the inner links (i.e. the numbered ones)
		if (reset) {
			// this is for when a page is loaded by itself
			// activate the target link and reset all of the other links to default
			for (var j = 1; j < (links.length - 1); j++) {
				if (j === page) {
					links[j].className = 'current';
					links[j].removeEventListener('click', clickPagination);
				} else {
					links[j].className = '';
					links[j].addEventListener('click', clickPagination);
				}
			}
		} else {
			// this is for when a page is appended
			// simply activate the target link
			links[page].className = 'current';
			links[page].removeEventListener('click', clickPagination);
		}

		// the first link is the "Prev" link, which needs to point to the page BEFORE the current page
		var prev = links[0];
		if (prev.nextSibling && prev.nextSibling.className === 'current') {
			prev.rel = page;
			prev.className = 'disabled';
			prev.removeEventListener('click', clickPagination);
		} else {
			prev.rel = (page - 1);
			prev.className = trim(links[0].className.replace('disabled', ''));
			prev.addEventListener('click', clickPagination);
		}

		// the last link is the "Next" link, which needs to point to the page AFTER the current page
		var next = links[(links.length - 1)];
		if (next.previousSibling && next.previousSibling.className === 'current') {
			next.rel = page;
			next.className = 'disabled';
			next.removeEventListener('click', clickPagination);
		} else {
			next.rel = (page + 1);
			next.className = trim(next.className.replace('disabled', ''));
			next.addEventListener('click', clickPagination);
		}
	}
}

/* Generates the DOM objects for the information text at the bottom of the footer
 */
function buildInfo() {
	var footer = document.getElementById('footer');
	if (!footer)
		return false;
	
	var info = document.createElement('p');
	info.id = 'info';

	// "about" link
	var about = document.createElement('a');
	about.addEventListener('click', displayAbout);
	about.innerHTML = GM_info.script.name + ' v' + GM_info.script.version;
	info.appendChild(about);

	// spacer
	var separator = document.createElement('span');
	separator.innerHTML = ' | ';
	info.appendChild(separator);

	// "help" link
	var help = document.createElement('a');
	help.addEventListener('click', displayHelp);
	help.innerHTML = 'Help (?)';
	info.appendChild(help);

	// spacer
	var separator = document.createElement('span');
	separator.innerHTML = ' | ';
	info.appendChild(separator);

	// "settings" link
	var openSettings = document.createElement('a');
	openSettings.addEventListener('click', changeSettings);
	openSettings.innerHTML = 'Settings';
	info.appendChild(openSettings);

	footer.appendChild(info);
}

/* Generates the DOM objects for the autoplay indicator in the footer
 */
function buildAutoplay() {
	var footer = document.getElementById('footer');
	if (!footer)
		return false;
	
	var autoplay = document.createElement('div');
	autoplay.id = 'autoplay';
	if (settings.mode.value === 'scrolling') {
		var disabled = document.createElement('span');
		disabled.innerHTML = 'Autoplay is only available in slideshow mode';
		autoplay.appendChild(disabled);
	} else if (settings.mode.value === 'slideshow') {
		// autoplay counter
		var counter = document.createElement('span');
		counter.id = 'counter';
		counter.innerHTML = (autoplay.count > 0) ? 'Advancing image in ' + autoplay.count + ' seconds' : 'Autoplay is disabled';
		autoplay.appendChild(counter);

		// spacer
		var separator = document.createElement('span');
		separator.innerHTML = ' | ';
		autoplay.appendChild(separator);
		
		// autplay control link
		var control = document.createElement('a');
		control.addEventListener('click', toggleAutoplay);
		control.id = 'control';
		control.innerHTML = 'Start Autoplay';
		autoplay.appendChild(control);
	}

	footer.appendChild(autoplay);
}

/* Clears out and re-initializes the DOM with the basic HTML needed for the gallery
 */
function initDOM() {
	document.removeChild(document.getElementsByTagName('html')[0]);
	
	var html = document.createElement('html');
	head = document.createElement('head');
	body = document.createElement('body');
	html.appendChild(head);
	html.appendChild(body);
	document.appendChild(html);
	
	head.innerHTML = '<title>' + stripslashes(title) + '</title>';

	// build the basic HTML structure to prevent missing elements
	body.innerHTML = '<div id="header"></div><div id="content"><div id="gallery"></div></div><div id="footer"></div>'
}

/* Registers the GreaseMonkey Menu commands
 * Must be run after the gallery page is initially built
 */
function initMenuCommands() {
	GM_registerMenuCommand('[' + GM_info.script.name + '] Help', displayHelp);
	GM_registerMenuCommand('[' + GM_info.script.name + '] About', displayAbout);
	GM_registerMenuCommand('[' + GM_info.script.name + '] Settings', changeSettings);
}

/* Rebuilds the actual gallery page piece by piece
 */
function rebuildGalleryPage() {
	hideDialog();
	// re-initialize all settings and feature packages
	initSettings();
	initAutoplay();
	initPagination();
	initPreloading();

	// manually remove existing CSS and apply the chosen theme's CSS
	var styles = head.getElementsByTagName('style');
	for (var i = 0; i < styles.length; i++) {
		head.removeChild(styles[i]);
	}
	GM_addStyle(getCSS());
	
	// paginate the images using current pagination settings
	images = paginateImages(images);
	
	// header
	var header = document.getElementById('header');
	if (!header) {
		header = document.createElement('div');
		header.id = 'header';
		body.appendChild(header);
	}
	buildHeader();

	// thumbnails
	var thumbs = document.getElementById('thumbs');
	if (!thumbs) {
		thumbs = document.createElement('div');
		thumbs.id = 'thumbnails';
		header.appendChild(thumbs);
	}

	// content (gallery wrapper)
	var content = document.getElementById('content');
	if (!content) {
		content = document.createElement('div');
		content.id = 'content';
		body.appendChild(content);
	}

	// main gallery
	var gallery = document.getElementById('gallery');
	if (!gallery) {
		gallery = document.createElement('div');
		gallery.id = 'gallery';
		content.appendChild(gallery);
	}

	// footer
	var footer = document.getElementById('footer');
	if (!footer) {
		footer = document.createElement('div');
		footer.id = 'footer';
		body.appendChild(footer);
	}
	buildFooter();
	
	// populate the thumbnails
	if (settings.thumbnails.value === false)
		thumbs.style.display = 'none';
	if (settings.mode.value === 'slideshow')
		thumbs.addEventListener('DOMMouseScroll', scrollThumbs, false);
	populateThumbnails(images[(pagination.page - 1)], true);
	
	// populate the gallery
	if (settings.mode.value === 'scrolling') {
		gallery.style.marginBottom = (footer.offsetHeight + 10) + 'px';
		body.className = 'scrolling';
		var lower = ((pagination.limit * (pagination.page-1)) + 1);
		var upper = (pagination.limit * pagination.page);
		updatePosition(lower, upper, totalImages, undefined);
		populateScrollingGallery(images[(pagination.page - 1)], true);
	} else if (settings.mode.value === 'slideshow') {
		body.className = 'slideshow';
		updatePosition(undefined, undefined, totalImages, activeImage);
		buildSlideshowGallery(images[(pagination.page - 1)][activeImage]);
		refreshNavigation();
	}
	
	// remove the page hash for slideshow mode
	if (settings.mode.value === 'slideshow')
		unsetHashParam('page');

	// show the active image, unless it is the first image of a scrolling gallery
	if ((settings.mode.value === 'slideshow') || (activeImage > 0))
		showImage();
	
	// start preloading images if preloading is enabled
	if ((settings.mode.value === 'slideshow') && preloading.active)
		preloadImage();
}

/* main function; executes functionality based on page (via URL)
 * Redirects to the one-page version of galleries (if not already in one-page mode)
 */
function init() {
	// prevent the initilization function from running multiple times
	if (loaded) {
		return false;
	} else {
		loaded = true;
	}

	var loc = window.location.href;
	if ((loc.indexOf('/gallery/') !== -1) || (loc.indexOf('/pictures/') !== -1)) {
		// this is a gallery page; make sure it is in "One Page" mode and then go to work
		if (loc.indexOf('view') === -1) {
			window.location.href += ((loc.indexOf('?') === -1) ? '?' : '&') + 'view=2';
		} else {
			// populate the global variables from the original gallery page
			title = document.title;
			if (title)
				title = trim(title.replace('Porn pics of ', '').replace(' (Page 1)', ''));

			var links = document.getElementsByTagName('a');
			if (links) {
				var i = 0;
				for (var i = 0; i < links.length; i++) {
					if (links[i].href.indexOf('profile.php?') !== -1) {
						author.name = links[i].href.split('=')[1];
						author.url	= links[i].href;
						break;
					}
				}
			}

			desc = document.getElementById('cnt_description');
			if (desc)
				desc = trim(desc.textContent);

			addFavLink = document.getElementById('favorites_container');

			// FINALLY! grab the images, build the gallery, enable the hotkeys, and listen for changes to settings
			images = findImages();
			initDOM();
			rebuildGalleryPage();
			initMenuCommands();
			checkSettings();	// must run after the gallery page is built (otherwise the notification gets wiped out)
			document.addEventListener('keydown', onKeyDown, false);
			window.addEventListener('focus', onWindowFocus, false);
			window.addEventListener('scroll', onWindowScroll, false);
            window.addEventListener('mozfullscreenchange', onFullScreenChange, false);
            window.addEventListener('webkitfullscreenchange', onFullScreenChange, false);
		}
	} else {
		// this might be a page with links to galleries; change all of the links to galleries to "One Page" mode
		var links = document.getElementsByTagName('a');
		if (links) {
			for (var i = 0; i < links.length; i++) {
				if ((links[i].href.indexOf('gallery') !== -1) || (links[i].href.indexOf('pictures') !== -1)) {
					links[i].href += ((links[i].href.indexOf('?') === -1) ? '?' : '&') + 'view=2';
				}
			}
		}
	}
}

/* Toggles visibility of the navigational arrows by adding/removing a "disabled" class
 */
function refreshNavigation() {
	var nav = document.getElementsByClassName('nav');
	for (var i = 0; i < nav.length; i++) {
		nav[i].className = trim(nav[i].className.replace('disabled',''));
	}

	if (activeImage === 0) {
		var prev = document.getElementById('prev');
		if (prev)
			prev.className += ' disabled';
	} else if (activeImage === (pagination.limit - 1)) {
		var next = document.getElementById('next');
		if (next)
			next.className += ' disabled';
	}
}

/* Handles the click event for the pagination links
 * @param	Event	The click event
 */
function clickPagination(evt) {
	if (this.rel) {
		var page = parseInt(this.rel, 10);
		activeImage = (((page - 1) * pagination.limit) + 1);
		unsetHashParam('image');
		updatePagination(page, true);
		goToPage(page);
	}
}

/* Sets the values needed to change pages and rebuilds the gallery for the specified page
 * @param	Int		The number of the page to display
 */
function goToPage(page) {
	pagination.page = page;

	var lower = ((pagination.limit * (pagination.page-1)) + 1);
	var upper = (pagination.limit * pagination.page);

	setHashParam('page', page);
	setHashParam('image', lower);

	updatePosition(lower, upper, totalImages, undefined);

	populateScrollingGallery(images[(page - 1)], true);
	populateThumbnails(images[(page - 1)], true);

	window.scrollTo(0, 0);
}

/* Captures mouse scrolling on the thumbnails and scrolls the images horizontally
 * @param	Event	mouse wheel scroll event
 */
function scrollThumbs(evt){
	if (!evt)
		evt = this;
	evt.preventDefault();	// prevent vertical scrolling on the page

	var delta = (evt.detail) ? evt.detail : 0;
	window.document.getElementById('thumbnails').scrollLeft += (delta * 10);

	evt.returnValue = false;
}

/* Sets the active image based on the thumbnail image that was clicked
 * Expects to be executed as a click event for a DOM object with a "rel" value
 * @param	Event	The click event
 */
function clickThumbnail(evt) {	
	if (this.rel)
		activeImage = parseInt(this.rel, 10);
	showImage();
}

/* Sets the active image to the next image
 * Ensures the active image is not the last one already
 */
function nextImage() {
	if (settings.mode.value === 'slideshow' && autoplay.active) {
		autoplay.count = autoplay.delay;
	}
	
	if (activeImage < ((pagination.page * pagination.limit) - 1)) {
		activeImage++;
		showImage();
	}
}

/* Sets the active image to the previous image
 * Ensures the active image is not the first one already
 */
function prevImage() {
	if (settings.mode.value === 'slideshow' && autoplay.active) {
		stopAutoplay();
	}
	
	if (activeImage > ((pagination.page - 1) * pagination.limit)) {
		activeImage--;
		showImage();
	}
}

/* Sets the internal activeImage pointer and sets the image hash parameter
 * Activates the correct thumbnail for the active image
 * @param	Int		(Optional) The number of the active image (default: value of activeImage internal variable)
 */
function setActiveImage(pos) {
	pos = (typeof pos === "undefined") ? activeImage : pos;

	setHashParam('page', findImagePage());
	setHashParam('image', (pos + 1));
	showActiveThumb(pos);
}

/* Highlights the thumbnail corresponding to the current image
 * and scrolls it into view in slideshow mode
 * @param	Int		(Optional) The number of the active image (default: value of activeImage internal variable)
 */
function showActiveThumb(pos) {
    pos = (typeof pos === "undefined") ? activeImage : pos;
    
	var thumbs = document.getElementsByClassName('thumbnail');
	for (var i = 0; i < thumbs.length; i++) {
		thumbs[i].className = trim(thumbs[i].className.replace('active',''));
	}

    var thumb = document.getElementById('thumb_' + pos);
    if (thumb) {
        thumb.className += ' active';
        if (settings.mode.value === 'slideshow')
            thumb.scrollIntoView();
    }
}

/* Displays/navigates to the "active" image
 * In scrolling mode, this simply scrolls the page up/down to the active image,
 * but in slideshow mode, this shows the active image and hides the others
 * @param	Int		(Optional) The number of the active image (default: value of activeImage internal variable)
 */
function showImage(pos) {
	pos = (typeof pos === "undefined") ? activeImage : pos;

	setActiveImage(pos);
	
	if (settings.mode.value === 'scrolling') {
		var target = document.getElementById('full_' + pos);
		if (target)
			target.scrollIntoView();
	} else if (settings.mode.value === 'slideshow') {
		var link = document.getElementById('slideshowLink');
		var img	 = document.getElementById('slideshowImage');

		if (link && img) {
			showNotification("Loading image " + (pos + 1), 1000);
			// first blank out the current image and link target from the previous image
			// then use a slight delay to set the next image and link target;
			// this causes the loading animation to be played while the image is loaded;
			// if the delay is removed, the previous image will remain visible until the new image is loaded
			// without any indication that the image has changed and the next image is loading
			img.src = link.href = '';
			setTimeout(function() { img.src = link.href = images[pagination.page-1][pos].full; }, 500);
			
			// always remove the autoplay function from load, and then re-add again if autoplay is still enabled
			img.removeEventListener('load', startAutoplay);
			if (autoplay.active && !autoplay.paused) {
				img.addEventListener('load', startAutoplay);
			}

			updatePosition(undefined, undefined, totalImages, (pos + 1));
			refreshNavigation();
		
			if (preloading.active && !preloading.done && (preloading.pos < activeImage))
				preloading.pos = activeImage;
		}
	}
}

/* Event handler for keypresses
 * Used to handle hotkeys
 * @param	Event	The keypress event
 */
function onKeyDown(evt) {
	if (!evt)
		evt = this;
	
	if ((evt.target.nodeName === 'INPUT') || (evt.target.nodeName === 'SELECT') || (evt.target.nodeName === 'TEXTAREA'))
		return false;
	
	var correct = true,
		hotkey;
	for (var h in hotkeys) {
		hotkey = hotkeys[h];
		for (var c in hotkey.codes) {
			if (evt.keyCode === hotkey.codes[c]) {
				for (var m in hotkey.modif) {
					correct = (evt[m] === hotkey.modif[m]) ? correct : false;
				}
				if (correct) {
					evt.preventDefault();
					return (typeof hotkey.action === 'function') ? hotkey.action.call() : eval(hotkey.action);
				}
			}
		}
	}
}

/* Event handler for window scroll
 * Used to update the active image when manually scrolling in the scrolling gallery
 * and to determine if the next page of images should be loaded
 * @param	Event	The scroll event
 */
function onWindowScroll(evt) {
	if (settings.mode.value === 'scrolling') {
		var imgs = document.getElementById('gallery').getElementsByTagName('img');
		var target = 0;
		
		// loop backwards through the images until the currently visible image is found
		for (var i = (imgs.length - 1); i >= 0; i--) {
			var current = imgs[i].offsetTop;
			var pos = document.body.scrollTop;
			if (pos >= current) {
				target = parseInt(imgs[i].rel, 10);
				break;
			}
		}

		// only update the active image if it changed
		if (target !== activeImage) {
			activeImage = target;
			setActiveImage();
		}

		if (pagination.append) {
			var last = imgs[(imgs.length - 1)];
			if ((last.offsetTop - window.innerHeight) <= window.pageYOffset) {
				loadNextPage();
			}
		}
	}
}

/* Event handler for window focus
 * Used to monitor setting changes and refresh the gallery when needed
 * @param	Event	The focus event
 */
function onWindowFocus(evt) {
	var prevMode = settings.mode.value;
	var prevPagination = settings.pagination.value;
	initSettings();

	var refresh = false;

	var thumbs = document.getElementById('thumbnails');
	if (thumbs) {
		// thumbnails can be toggled without rebuilding the entire gallery page
		thumbs.className = settings.thumbnailsSize.value;
		thumbs.style.display = (settings.thumbnails.value === true) ? 'block' : 'none';
		if (settings.mode.value === 'slideshow')
			resizeSlideshowGallery();
	}

	if (prevMode !== settings.mode.value) {
		// current gallery mode does not match the stored preferences
		refresh = true;
	}
	
	if (settings.mode.value === 'scrolling') {
		if (prevPagination !== settings.pagination.value) {
			// current gallery pagination does not match the stored preferences
			refresh = true;
		}
	}
	
	if (refresh)
		rebuildGalleryPage();
}

/* Displays the about dialog
 */
function displayAbout() {
	showDialog(getAbout(), 'About');
}

/* Displays the help dialog
 */
function displayHelp() {
	showDialog(getHelp(), 'Help');
}

/* Re-initialize the autoplay settings
 */
function initAutoplay() {
	if (autoplay.timer)
		window.clearTimeout(autoplay.timer);

	initSetting('autoplay');

	// reset autoplay object properties to default
	autoplay = {
		active: false,
		count:	parseInt(settings.autoplay.value, 10),
		delay:	parseInt(settings.autoplay.value, 10),
		paused: false,
		timer:	undefined
	};
}

/* Starts the autoplay used timer for advancing to the next image
 * If the delay is not set correctly, the user is prompted to set it
 */
function startAutoplay() {
	if (autoplay.delay > 1000) {
		// the delay is likely in milliseconds, so convert it to seconds and save
		autoplay.delay /= 1000;
		GM_setValue(settings.autoplay.name, autoplay.delay);
		initAutoplay();
	}
	
	if (autoplay.delay < 0) {
		// the delay is invalid; inform the user
		var buttons = {0: {text: 'Change Settings', action: changeSettings}};
		showDialog('<p>The current value for the ' + settings.autoplay.label + ' is not valid.', 'Invalid ' + settings.autoplay.label, buttons);
	} else {
		autoplay.count = autoplay.delay;
		if (activeImage < totalImages) {
			autoplayTimer();
		} else {
			stopAutoplay();
		}
	}
}

/* Stops the autoplay timer used for advancing to the next image
 */
function stopAutoplay() {
	window.clearTimeout(autoplay.timer);
	autoplay.active = false;
	autoplay.count = autoplay.delay;
	
	var counter = document.getElementById('counter');
	if (counter)
		counter.innerHTML = 'Autoplay is disabled';
		
	var control = document.getElementById('control');
	if (control)
		control.innerHTML = 'Start Autoplay';
}

/* Pauses the autoplay timer
 */
function pauseAutoplay() {
	var counter = document.getElementById('counter');
	if (counter)
		counter.innerHTML = 'Autoplay is paused';
		
	var control = document.getElementById('control');
	if (control)
		control.innerHTML = 'Resume Autoplay';
	
	autoplay.paused = true;
	window.clearTimeout(autoplay.timer);
}

/* Resumes the autoplay timer
 */
function resumeAutoplay() {
	var counter = document.getElementById('counter');
	if (counter)
		counter.innerHTML = 'Resuming autoplay...';
		
	var control = document.getElementById('control');
	if (control)
		control.innerHTML = 'Pause Autoplay';
	
	autoplay.paused = false;
	autoplayTimer();
}

/* Starts the counter indicator for advancing to the next image
 */
function autoplayTimer() {
	window.clearTimeout(autoplay.timer);
	
	var counter = document.getElementById('counter');
	if (!counter)
		return false;

	if (activeImage < (totalImages - 1)) {
		if (autoplay.count > 0) {
			autoplay.timer = window.setTimeout(autoplayTimer, 1000);
			counter.innerHTML = 'Advancing image in <b>' + autoplay.count + '</b> seconds';
		} else {
			counter.innerHTML = 'Loading image...';
			nextImage();
		}
		autoplay.count--;
	} else {
		counter.innerHTML = 'End of gallery';
	}
}

/* Toggles autoplay (start and pause/resume)
 */
function toggleAutoplay() {
	autoplay.active = !autoplay.active;
	if (autoplay.active) {
		resumeAutoplay();
	} else {
		pauseAutoplay();
	}
}

/* Toggles the slideshow mode for gallery pages
 * A dialog is shown after toggling to allow the user to apply the change immediately
 * @param	Bool	(Optional) If a nofitication should be displayed (default: true)
 */
function switchGalleryMode(notify) {
	notify = (typeof notify === "undefined") ? true : notify;

	if (settings.mode.value === 'slideshow')
		GM_setValue(settings.mode.name, 'scrolling');
	else if (settings.mode.value === 'scrolling')
		GM_setValue(settings.mode.name, 'slideshow');
	initSetting('mode');

	if (notify) {
		var buttons = {0: {text: 'Apply Change Now', action: rebuildGalleryPage}, 1: {text: 'Close', action: hideDialog}};
		showDialog('<p>Gallery mode has been changed to ' + settings.mode.value + '.</p>', 'Gallery Mode', buttons);
	}
}

/* Toggles visibilty on thumbnails and stores the preference
 */
function toggleThumbs() {
	GM_setValue(settings.thumbnails.name, !GM_getValue(settings.thumbnails.name, settings.thumbnails.def));
	initSetting('thumbnails');

	var visible = settings.thumbnails.value;
	
	var thumbs = document.getElementById('thumbnails');
	if (thumbs) {
		var thumbsHeight = thumbs.offsetHeight;
		thumbs.style.display = (visible) ? 'block' : 'none';
		showNotification('Thumbnails are now ' + ((visible) ? 'visible' : 'hidden'), 1000);
	
		if (settings.mode.value === 'slideshow') {
			resizeSlideshowGallery();
		} else if (settings.mode.value === 'scrolling') {
			if (visible) {
				// scroll the window up to the top of the page when thumbnails are visible
				window.scrollTo(0, 0);
			} else {
				// attempt to prevent the page from scrolling too much when thumbnails are hidden
				window.scrollTo(0, (window.pageYOffset - thumbsHeight - 10));
			}
		}
	}
}

/* Re-initialize the preloading settings
 */
function initPreloading() {
	initSetting('preloading');

	// reset autoplay object properties to default
	var preloading = {
		active: settings.preloading.value,
		done:	false,
		pos:	activeImage
	};
}

/* Preloads the next image in slideshow mode
 * Will be called continuously until the last image is loaded
 */
function preloadImage() {
	if (!preloading.active)
		return false;
	
	if (preloading.pos < (totalImages - 1)) {
		preloading.pos++;
		showNotification("Preloading image " + (preloading.pos + 1), 1000);
		var preloader = new Image();
		preloader.src = images[pagination.page-1][preloading.pos].full;
		preloader.addEventListener('load', preloadImage);
	} else {
		preloading.done = true;
	}
}

/* Toggles full screen view in supported browsers
 * Full screen view is only available in slideshow mode
 */
function toggleFullScreen() {
	if (settings.mode.value !== 'slideshow')
		return false;
	
    var target = document.getElementById('content');
	if (!document.mozFullScreenElement && !document.webkitFullscreenElement) {
		if (target.mozRequestFullScreen) {
			target.mozRequestFullScreen();
		} else if (target.webkitRequestFullscreen) {
			target.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		}
	} else {
		if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		}
	}
}

/* Event handler for fullscreen enter/exit
 * Used to move the thumbnails container into the c#ontent container in fullscreen mode
 * and back to the #header container when not in fullscreen mode
 * @param   Event   fullscreenchange event
 */
function onFullScreenChange(evt) {
    if (document.mozFullScreenElement === null || document.webkitFullscreenElement === null) {
        document.getElementById('header').appendChild(document.getElementById('thumbnails'));
        resizeSlideshowGallery();
    } else {
        document.getElementById('content').appendChild(document.getElementById('thumbnails'));
    }
}



/*	===== Dialog Functions =====
	Rather than using boring alert() and prompt() boxes, which are finicky in Greasemonkey,
	this script creates a div, styled with CSS, to replicate that functionality.
*/

/* Generates the DOM elements for the dialog boxes
 */
function buildDialog() {
	var dialog = document.getElementById('dialogBox');
	if (dialog) {
		resetDialog();
		return;
	}

	dialog = document.createElement('div');
	dialog.id = 'dialogBox';
	dialog.innerHTML = '<h3 id="dialogTitle"></h3><div id="dialogMessage"></div><div id="dialogButtons"></div>';

	var closeButton = document.createElement('a');
	closeButton.addEventListener('click', hideDialog, false);
	closeButton.id = 'dialogClose';
	closeButton.innerHTML = '&#10006;';
	dialog.appendChild(closeButton);

	var dialogContainer = document.createElement('div');
	dialogContainer.addEventListener('click', function(e) { hideDialog(e, true); }, false);
	dialogContainer.id = 'dialogContainer';
	dialogContainer.style.display = 'none';
	dialogContainer.appendChild(dialog);
	body.appendChild(dialogContainer);
}

/* Hides the dialog box
 * @param	Event	The click event
 * @param	Bool	(Optional) If true, will only hide the dialog if the target of the click event is the dialogContainer
 */
function hideDialog(e, containerOnly) {
	containerOnly = (typeof containerOnly === "undefined") ? false : containerOnly;
	if (containerOnly && (typeof e !== "undefined") && (e.target.id !== 'dialogContainer'))
		return false;

	var dialogContainer = document.getElementById('dialogContainer');
	if (dialogContainer)
		dialogContainer.style.display = 'none';
}

/* Vertically centers the dialog box on the screen
 */
function positionDialog() {
	var dialogBox		 = document.getElementById('dialogBox');
	var dialogContainer	 = document.getElementById('dialogContainer');

	dialogContainer.style.display = 'block';
    var top = ((window.innerHeight / 2) - (dialogBox.offsetHeight / 2) - 20);
	dialogBox.style.top = (top < 0) ? '0' : top + 'px';

    dialogContainer.scrollTop = 0;
}

/* Clears out the contents of the dialog box
 */
function resetDialog() {
	document.getElementById('dialogTitle').innerHTML = '';
	document.getElementById('dialogMessage').innerHTML = '';
	document.getElementById('dialogButtons').innerHTML = '';
}

/* Preloads the next image in slideshow mode
 * Will be called continuously until the last image is loaded
 * @param	String	The HTML content of the dialog box
 * @param	String	(Optional) A title for the dialog box (always prefixed with '[Script Name]')
 * @param	Object	(Optional) An object representing the buttons to display and their actions (default: close button)
 */
function showDialog(content, title, buttons) {
	buttons = (typeof buttons === "undefined") ? {0: {text: 'Close', action: hideDialog}} : buttons;
	title = (typeof title === "undefined") ? '' : title;

	buildDialog();

	var dialogContainer = document.getElementById('dialogContainer');
	var titleContainer = document.getElementById('dialogTitle');
	var messageContainer = document.getElementById('dialogMessage');
	var buttonContainer = document.getElementById('dialogButtons');

	titleContainer.innerHTML = '[<b>' + GM_info.script.name + '</b>] ' + title;
	messageContainer.innerHTML = content;

	var btn;
	for (var button in buttons) {
		btn = document.createElement('button');
		btn.addEventListener('click', buttons[button].action, false);
		btn.innerHTML = buttons[button].text;
		if(button == 0)
			btn.className = 'default';
		buttonContainer.appendChild(btn);
	}

	positionDialog();

	buttonContainer.childNodes[0].focus();
}



/*	===== Notication Message Functions =====
	The are notification messages that display in the lower right corner and are
	automatically removed after a short duration without needing user interaction.
*/

/* Generates and displays a notification message
 * @param	String	The notification message text
 * @param	Int		(Optional) The delay (in milliseconds) before the message should be hidden (default: 5000)
 * @param	Int		(Optional) The duration (in milliseconds) over which the message should fade (default: 100)
 * @return	Object	The DOM object of the created notification
 */
function showNotification(text, delay, duration) {
	delay = (typeof delay === "undefined") ? 5000 : delay;

	var notificationContainer = document.getElementById('notificationContainer');
	if (!notificationContainer) {
		notificationContainer = document.createElement('div');
		notificationContainer.id = 'notificationContainer';
		document.getElementById('content').appendChild(notificationContainer);
	}
	notificationContainer.style.bottom = (document.getElementById('footer').offsetHeight + 10) + 'px';

	var notifications = notificationContainer.getElementsByClassName('notification');

	var notification = document.createElement('div');
	notification.className = 'notification';
	notification.id = 'notification' + notifications.length;
	notification.innerHTML = text;

	if (notifications.length > 0) {
		notificationContainer.insertBefore(notification, notifications[0]);
	} else {
		notificationContainer.appendChild(notification);
	}

	if (delay > 0)
		setTimeout(function() { hideNotification(notification, duration); }, delay);

	return notification;
}

/* Fades a notification message out and then removes it
 * @param	Object	The notification message to hide
 * @param	Int		(Optional) The duration (in milliseconds) over which the message should fade (default: 100)
 */
function hideNotification(notification, duration) {
	duration = (typeof duration === "undefined") ? 100 : duration;

	if (!notification)
		return false;

	notification.style.opacity = 1;
	var timer = setInterval(function() {
		notification.style.opacity -= 0.1
		if (notification.style.opacity <= 0) {
			notification.parentNode.removeChild(notification);
			clearInterval(timer);
		}
	}, duration);
}


/*	===== Setting Functions =====
	Functions used for working with the individual settings in bulk
*/

/* Saves the values for all settings from the Settings Form Dialog Box
 * Verifies values are valid based on criteria of the individual settings (min, max, etc.)
 */
function applySettings() {
	var setting, field, value;
	for (s in settings) {
		setting = settings[s];
		if (setting && (typeof setting === 'object')) {
			value = null;
			field = document.getElementById('setting-' + s);
			if (field) {
				switch (setting.type) {
					case 'integer':
						value = parseInt(field.value, 10);
                        if (isNaN(value)) {
                            var buttons = {0: {text: 'Try Again', action: changeSettings}};
                            showDialog('<p>A numeric value must be provided for <b>' + setting.label + '</b>.</p>', 'Error', buttons);
                            return false;
                        }
						if ((typeof setting.min !== 'undefined') && (setting.min !== null) && (value < setting.min)) {
							var buttons = {0: {text: 'Try Again', action: changeSettings}};
							showDialog('<p>The value provided (<span class="error">' + value + '</span>) for <b>' + setting.label + '</b> must be greater than or equal to <b>' + setting.min + '</b>.</p>', 'Error', buttons);
							return false;
						}
						if ((typeof setting.max !== 'undefined') && (setting.max !== null) && (value > setting.max)) {
							var buttons = {0: {text: 'Try Again', action: changeSettings}};
							showDialog('<p>The value provided for (<span class="error">' + value + '</span>) <b>' + setting.label + '</b> must be less than or equal to <b>' + setting.max + '</b>.</p>', 'Error', buttons);
							return false;
						}
						break;
					case 'select':
						value = field.options[field.selectedIndex].value;
						break;
					case 'boolean':
						value = field.checked;
						break;
                    default:
                        value = field.value;
                        break;
				}
			}
			if (value !== null) {
				settings[s].value = value;
			}
		}
	}
	saveSettings();
	var buttons = {0: {text: 'Apply Changes Now', action: rebuildGalleryPage}, 1: {text: 'Close', action: hideDialog}};
	showDialog('<p>Your changes have been saved successfully!</p>', 'Success', buttons);
}

/* Checks if settings have been saved for the current script version.
 * For new installs, a notice is displayed forcing the user to save the settings for the first time;
 * for updates, the user can view the settings or dismiss the notice.
 */
function checkSettings() {
	var lastSavedVersion = GM_getValue('lastSavedVersion', false);
	if (!lastSavedVersion) {
		var buttons = {0: {text: 'Continue', action: changeSettings}};
		showDialog('<p>Since this is your first time using ' + GM_info.script.name + ', you need to view (and modify) the settings to meet your needs.</p><p>Note that all settings have a default value set already for your convenience; you can simply click the "Save Settings" button on the next dialog box to continue.', 'First Run', buttons);
	} else if (lastSavedVersion !== GM_info.script.version) {
		GM_setValue('lastSavedVersion', GM_info.script.version);
		var buttons = {0: {text: 'Change Settings', action: changeSettings}, 1: {text: 'Close', action: hideDialog}};
		showDialog('<p>The version of this script has changed from ' + lastSavedVersion + ' to ' + GM_info.script.version + '. There may be new settings for you to utilize.', 'Version Change', buttons);
	}
}

/* Initializes all settings from saved preferences
 * Uses the default values for settings that have not yet been saved
 */
function initSettings() {
	for (s in settings) {
		initSetting(s)
	}
}

/* Initializes the specified setting from saved preferences
 * Uses the default value for settings that have not yet been saved
 * @param	String	name (key) of the setting to initialize
 */
function initSetting(s) {
	if (settings[s] && (typeof settings[s] === 'object')) {
		if (settings[s].name)
			settings[s].value = GM_getValue(settings[s].name, settings[s].def);
		
		if (settings[s].type === 'integer')
			settings[s].value = parseInt(settings[s].value, 10);
		else if ((settings[s].type === 'select') && (settings[s].opts.indexOf(settings[s].value) === -1))
			settings[s].value = settings[s].def;
	}
}

/* Generates the HTML for the Settings Form that will be displayed via dialog box
 */
function changeSettings() {
	initSettings();
	var setting;
	var html = '<form id="settingsForm">';
	for (s in settings) {
		setting = settings[s];
		if (setting && (typeof setting === 'object')) {
			html += '<fieldset><legend>' + setting.label + '</legend>';
			switch (setting.type) {
				case 'integer':
				case 'text':
					html += '<label for="setting-' + s + '">Enter a value for the ' + setting.label;
					if (setting.hint)
						html += ' (' + setting.hint + ')';
					html += ':<br/><span class="default">Default value: <b>' + setting.def + '</b></span></label>';
					html += '<input type="text" id="setting-' + s + '" name="' + s + '" value="' + setting.value + '" size="' + setting.size + '" maxlength="' + setting.size + '"/>';
					break;
				case 'select':
					html += '<label for="setting-' + s + '">Select a value for the ' + setting.label;
					if (setting.hint)
						html += ' (' + setting.hint + ')';
					html += ':<br/><span class="default">Default value: <b>' + capitalize(setting.def) + '</b></span></label>';
					html += '<select id="setting-' + s + '" name="' + s + '">';
					for (opt in setting.opts) {
						html += '<option value="' + setting.opts[opt] + '"' + ((setting.value === setting.opts[opt]) ? ' selected="selected"' : '') + '>' + capitalize(setting.opts[opt]) + '</option>';
					}
					html += '</select>';
					break;
				case 'boolean':
					html += '<input type="checkbox" id="setting-' + s + '" name="' + s + '" value="true"' + ((setting.value) ? ' checked="checked"' : '') + '/>';
					html += '<label for="setting-' + s + '">Enable ' + setting.label;
					if (setting.hint)
						html += ' (' + setting.hint + ')';
					html += '<br/><span class="default">Default value: <b>' + ((setting.def) ? 'Enabled' : 'Disabled') + '</b></span></label>';
					break;
			}
			html += '</fieldset>';
		}
	}
	showDialog(html, 'Settings', {0: {text: 'Save Settings', action: applySettings}, 1: {text: 'Cancel', action: hideDialog}});
}

/* Saves the current value for each setting to local storage
 */
function saveSettings() {
	var setting;
	for (s in settings) {
		setting = settings[s];
		if (setting && (typeof setting === 'object'))
			GM_setValue(setting.name, setting.value);
	}
	initSettings();
	GM_setValue('lastSavedVersion', GM_info.script.version);
}



/*	===== String Functions =====
	Utility functions for manipulating strings
*/

/* Escapes quotes and double-quotes in a string
 * @param	String	The string to escape
 * @return	String	The escaped string
 */
function addslashes(str) {
	return str.replace(/\\/g,'\\\\').replace(/\'/g,'\\\'').replace(/\"/g,'\\"').replace(/\0/g,'\\0');
}

/* Unescapes quotes and double-quotes in a string
 * @param	String	The escaped string
 * @return	String	The string to escape
 */
function stripslashes(str) {
	return str.replace(/\\'/g,'\'').replace(/\\"/g,'"').replace(/\\0/g,'\0').replace(/\\\\/g,'\\');
}

/* Removes leading and trailing whitepsace from a string
 * @param	String	The string to trim
 * @return	String	The trimmed string
 */
function trim(str) {
	return str.replace(/^\s+|\s+$/g,'');
}

/* Capitalizes the first character of a string
 * @param	String	The string to capitalize
 * @return	String	The capitalized string
 */
function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}



/*	===== Hash Parameter Functions =====
	Utility functions for setting and retrieving data from the URL location hash
*/

/* Returns all key/value pairs stored in the location hash
 * @return	Object	The location hash parameters indexed by key name
 */
function getHashParams() {
	var params = window.location.hash.replace('#!','').split('/');
	var ret = [];
	for (var i = 0; i < params.length; i = i + 2) {
		if (params[(i + 1)] && params[(i + 2)])
			ret[params[(i + 1)]] = params[(i + 2)];
	}
	return ret;
}

/* Returns the value of the supplied hash key
 * @param	String	The name of the hash key
 * @return	String	The value of the hash key
 */
function getHashParam(key) {
	var params = getHashParams();
	return params[key] || undefined;
}

/* Sets the value of the supplied hash key
 * @param	String	The name of the hash key
 * @param	String	The value of the hash key
 */
function setHashParam(key, val) {
	var hashString = '#!';
	var params = getHashParams();
	params[key] = val;
	for (key in params) {
		hashString += '/' + key + '/' + params[key];
	}
	history.replaceState(null, null, hashString);
}

/* Removes a hash key/value pair from the location hash
 * @param	String	The name of the hash key
 */
function unsetHashParam(key) {
	var current = getHashParam(key);
	if (typeof current !== 'undefined')
		history.replaceState(null, null, window.location.hash.replace('/' + key + '/' + current, ''));
}



/*	===== Gallery CSS =====
	The CSS for the rebuilt gallery page with theme support
*/

/* Generates the CSS used for the rebuilt gallery page
 * @param	String	(Optional) Additional CSS
 * @return	String	The CSS for the rebuilt gallery page
 */
function getCSS(css) {
	css = (typeof css === "undefined") ? '' : css;

	initSettings('theme');
	switch(getHashParam('theme') || settings.theme.value) {
		case 'blue':
			var bg1 	= '#060D1A';
			var bg2 	= '#03060D';
			var fg1 	= '#557799';
			var fg2 	= '#557799';
			var links 	= '#AABBCC';
			var accent1	= '#6699CC';
			var accent2	= '#6699CC';
			break;

		case 'classic':
			var bg1		= '#FFFFFF';
			var bg2		= '#3366CC';
			var fg1 	= '#666666';
			var fg2 	= '#AACCEE';
			var links 	= '#AACCEE';
			var accent1	= '#3366CC';
			var accent2	= '#FFFFFF';
			break;

		case 'green':
			var bg1		= '#FFFFFF';
			var bg2		= '#222222';
			var fg1 	= '#888888';
			var fg2 	= '#888888';
			var links 	= '#AAAAAA';
			var accent1	= '#33AA00';
			var accent2	= '#66CC33';
			break;

		case 'default':
		default:
			var bg1		= '#222222';
			var bg2		= '#111111';
			var fg1 	= '#888888';
			var fg2 	= '#888888';
			var links 	= '#AAAAAA';
			var accent1	= '#3380CC';
			var accent2	= '#3380CC';
			break;
	}

	/* Darkens a color by a specified amount
	 * @param	String	The RGB hex color code
	 * @param	Int		The amount (decimal-format pertentage) by which to darken the color
	 * @return	String	The color code for the darkened color
	 */
	function darken(color, amount) {
		color = splitColor(color);
		var ret = [];
		for (var i = 0; i < color.length; i++) {
			ret[i] = (color[i] - Math.ceil(255 * amount));

			if (ret[i] < 0)
				ret[i] = 0;
			if (ret[i] > 255)
				ret[i] = 255;

			ret[i] = ret[i].toString(16);
			if (ret[i].length < 2)
				ret[i] = '0' + ret[i];
		}
		return '#' + ret.join('').toUpperCase();
	}

	/* Lightens a color by a specified amount
	 * @param	String	The RGB hex color code
	 * @param	Int		The amount (decimal-format pertentage) by which to lighten the color
	 * @return	String	The color code for the lightened color
	 */
	function lighten(color, amount) {
		color = splitColor(color);
		var ret = [];
		for (var i = 0; i < color.length; i++) {
			ret[i] = (color[i] + Math.ceil(255 * amount));

			if (ret[i] < 0)
				ret[i] = 0;
			if (ret[i] > 255)
				ret[i] = 255;

			ret[i] = ret[i].toString(16);
			if (ret[i].length < 2)
				ret[i] = '0' + ret[i];
		}
		return '#' + ret.join('').toUpperCase();
	}

	/* Converts a color code into a usable array for math-based functions
	 * @param	String	The RGB hex color code
	 * @return	Int[]	The array containing the decimal values of each color
	 */
	function splitColor(color) {
		color = color.replace('#', '');

		var offset = Math.floor(color.length / 3);
		var ret = [];
		for (var i = 0; i < color.length; i+=offset) {
			ret.push(parseInt(color.substring(i, (i + offset)), 16));
		}
		return ret;
	}	

	/* Returns the CSS for a vertical background gradient (with vendor-specific prefixes)
	 * @param	String	The RGB hex color code of the top color
	 * @param	String	The RGB hex color code of the bottom color
	 * @return	String	The CSS for the background gradient
	 */
	function gradient(top, bottom) {
		var ret = '';
		ret += 'background: -moz-linear-gradient(top, ' + top + ' 0%, ' + bottom + ' 100%);';
		ret += 'background: -webkit-linear-gradient(top, ' + top + ' 0%, ' + bottom + ' 100%);';
		return ret;
	}

	/* Returns the CSS for rounded corners (with vendor-specific prefixes)
	 * @param	String	The radius value (syntax: '#px' or '#px #px #px #px')
	 * @return	String	The CSS for the rounded corners
	 */
	function borderRadius(radius) {
		radius = 'border-radius: ' + radius;
		// returns: -moz-border-radius: <radius>; -webkit-border-radius: <radius>; border-radius: <radius>;
		return '-moz-' + radius + '; ' + '-webkit-' + radius + '; ' + radius + ';';
	}

	/* Returns the CSS for box shadows (with vendor-specific prefixes)
	 * @param	String	The shadow value (syntax: '#px #px [#px] [#px] color [inset]')
	 * @return	String	The CSS for the box shadows
	 */
	function boxShadow(shadow) {
		shadow = 'box-shadow: ' + shadow;
		// returns: -moz-box-shadow: <shadow>; -webkit-box-shadow: <shadow>; box-shadow: <shadow>;
		return '-moz-' + shadow + '; ' + '-webkit-' + shadow + '; ' + shadow + ';';
	}

	// basics
	css += '* { -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; margin: 0; padding: 0; }';
	css += 'body { background-color: ' + bg1 + '; color: ' + fg1 + '; font: 13px Helvetica, Arial, sans-serif; }';
	css += 'a { color: ' + links + '; cursor: pointer; text-decoration: underline; }';
	css += 'a:hover, a:hover { color: ' + lighten(links, 0.133) + '; text-decoration: none; }';
	css += 'p { margin: 0 0 10px; }';
	css += 'table { font: 13px Helvetica, Arial, sans-serif; margin: auto; width: 100%; }';

	// layout
	css += '#header { background-color: ' + bg2 + '; border-bottom: 1px solid ' + lighten(bg1, 0.066) + '; color: '+ fg2 + '; padding: 10px 0 0; text-align: center; }';
	css += '.scrolling #header { margin-bottom: 10px; }';
	css += '.slideshow #header { min-height: 60px; position: fixed; top: 0; width: 100%; z-index: 2; }';
	css += '#header .title { color: ' + accent2 + '; }';
	css += '#header small { font-variant: small-caps; }';
	css += '#header p { margin: 10px 0; }';
	css += '#header #description { margin: 10px auto; max-width: 60%; text-align: center; }';
	css += '#search { position: absolute; right: 10px; top: 10px; }';
	css += '#footer { background-color: ' + bg2 + '; border-top: 1px solid ' + lighten(bg1, 0.066) + '; color: '+ fg2 + '; min-height: 60px; padding: 10px 0; position: relative; text-align: center; }';
	css += '.scrolling #footer { margin-top: 10px; position: fixed; bottom: 0; left: 0; right: 0; }';
	css += '.slideshow #footer { bottom: 0; height: 60px; position: fixed; width: 100%; z-index: 2; }';
	css += '#favorites_container { height: 40px; line-height: 40px; margin-bottom: 0 !important; position: absolute; left: 25px; bottom: 10px; }';
	css += '#autoplay { height: 20px; line-height: 20px; position: absolute; right: 25px; bottom: 20px; }';
	css += '#info { font-size: 11px; margin: 10px 0 0; }';

	// logo
	css += '#logo { text-decoration: none; position: absolute; left: 10px; top: 10px; }';
    css += '#logo span { font: 18px "Comic Sans MS"; padding: 0 2px; }';
    css += '#logo .image { background-color: ' + bg1 + '; color: ' + accent1 + '; }';
    css += '#logo:hover .image { background-color: ' + accent1 + '; color: ' + bg1 + '; }';
    css += '#logo .fap { background-color: ' + accent1 + '; color: ' + bg1 + '; }';
    css += '#logo:hover .fap { background-color: ' + bg1 + '; color: ' + accent1 + '; }';
	
	// forms
	css += 'form { margin: 0 0 10px; }';
	css += 'input[type="text"], select { background: ' + bg1 + '; border: 1px solid ' + fg1 + '; color: ' + fg1 + '; margin-right: 5px; padding: 5px; }';
	css += 'input[type="text"]:focus, select:focus { border-color: ' + accent1 + '; color: ' + fg1 + '; }';
	css += 'button, input[type="button"], input[type="submit"] { background: ' + lighten(bg2, 0.066) + '; ' + gradient(lighten(bg2, 0.133), lighten(bg2, 0.066)) + '; border: 1px solid ' + lighten(bg2, 0.200) + '; ' + borderRadius('5px') + ' color: ' + links + '; cursor: pointer; margin-left: 5px; padding: 5px; ' + boxShadow('0 0 0 1px ' + bg2) + '; }';
	css += 'button:hover, input[type="button"]:hover, input[type="submit"]:hover { ' + gradient(lighten(bg2, 0.200), lighten(bg2, 0.066)) + '; border: 1px solid ' + lighten(bg2, 0.266) + '; color: ' + lighten(links, 0.066) + '; }';
	css += 'button:focus, input[type="button"]:focus, input[type="submit"]:focus { ' + gradient(lighten(bg2, 0.266), lighten(bg2, 0.066)) + '; border: 2px solid ' + lighten(bg2, 0.333) + '; color: ' + lighten(links, 0.133) + '; padding: 4px; }';
	
	css += '#favorites_container input[type="button"], button.default, input[type="submit"] { border: 1px solid ' + accent1 + '; color: ' + lighten(links, 0.133) + '; }';
	css += '#favorites_container input[type="button"]:hover, button.default:hover, input[type="submit"]:hover { border: 1px solid ' + lighten(accent1, 0.066) + '; color: ' + lighten(links, 0.200) + '; }';
	css += '#favorites_container input[type="button"]:focus, button.default:focus, input[type="submit"]:focus { border: 2px solid ' + lighten(accent1, 0.066) + '; color: ' + lighten(links, 0.266) + '; padding: 4px; }';

	// pagination
	css += '.pagination { margin: 0; }';
	css += '.pagination a { border: 1px solid ' + darken(links, 0.133) + '; color: ' + darken(links, 0.133) + '; display: inline-block; margin: 0 2px 10px; padding: 2px 6px; text-decoration: none; }';
	css += '.pagination a:hover { border-color: ' + links + '; color: ' + links + '; display: inline-block; margin: 0 2px; padding: 2px 6px; text-decoration: none; }';
	css += '.pagination a.current { border: 1px solid ' + accent2 + '; color: ' + accent2 + '; }';
	css += '.pagination a.disabled { border: 1px solid ' + darken(fg2, 0.266) + '; color: ' + darken(fg2, 0.133) + '; cursor: default; display: inline-block; margin: 0 2px; padding: 2px 6px; }';

	// thumbnails
	css += '#thumbnails { margin-bottom: 10px; text-align: center; z-index: 2; }';
	css += '#thumbnails .thumbnail { border: 1px solid ' + darken(links, 0.133) + '; display: inline-block; margin: 2px; padding: 4px; vertical-align: middle; }';
	css += '#thumbnails .thumbnail:hover { border-color: ' + links + '; }';
	css += '#thumbnails .thumbnail.active { border: 2px solid ' + accent2 + '; padding: 3px; }';
	css += '#thumbnails.small img { max-height: 100px; }';
	css += '#thumbnails.medium img { max-height: 150px; }';
	css += '#thumbnails.large img { max-height: 200px; }';
	css += '.slideshow #thumbnails { background-color: ' + bg2 + '; padding-bottom: 10px; overflow-y: hidden; width: 100%; white-space: nowrap; }';
	css += '.slideshow #thumbnails .thumbnail { margin: 0 5px; }';

	// gallery basics
	css += '#gallery { position: relative; text-align: center; }';
	css += '#gallery .image img { background: url("' + loading.image + '") no-repeat center; border: 1px solid ' + darken(links, 0.133) + '; padding: 4px; }';
	css += '#gallery .image:hover img { border-color: ' + accent1 + '; }';

	// scrolling gallery
	css += '.scrolling #gallery { max-width: 100%; }';
	css += '.scrolling #gallery .image img { display: inline-block; max-width: 98%; min-height: ' + loading.height + 'px; min-width: ' + loading.width + 'px; }';

	css += '#loader { background: ' + lighten(bg2, 0.066) + '; ' + gradient(lighten(bg2, 0.133), lighten(bg2, 0.066)) + '; border: 1px solid ' + accent1 + '; border-radius: 5px; ' + boxShadow('0 0 0 1px ' + bg2) + '; color: ' + lighten(links, 0.133) + '; display: inline-block; margin-top: 10px; padding: 8px 16px; text-decoration: none; }';
	css += '#loader:hover { ' + gradient(lighten(bg2, 0.200), lighten(bg2, 0.066)) + '; border-color: ' + lighten(accent1, 0.066) + '; color: ' + lighten(links, 0.200) + '; }';

	// slideshow gallery
	css += '.slideshow #content { bottom: 81px; left: 0; padding: 10px; position: absolute; right: 0; top: 81px; }';
	css += '.slideshow #gallery { height: 100%; width: 100%; overflow: hidden; }';
	css += '.slideshow #gallery .image img { bottom: 0; left: 0; margin: auto; max-height: 100%; max-width: 100%; position: absolute; right: 0; top: 0; }';
	css += '.slideshow #gallery .nav { background-position: center center; background-repeat: no-repeat; color: #FFFFFF; display: block; text-decoration: none; opacity: 0.5; position: absolute; top: 5px; bottom: 5px; height: 100%; width: 160px; z-index: 1; }';
	css += '.slideshow #gallery .nav.disabled { display: none; }';
	css += '.slideshow #gallery #next { min-height: 60px; min-width: 60px; right: 5px; }';
	css += '.slideshow #gallery #prev { min-height: 60px; min-width: 60px; left: 5px; }';
	css += '.slideshow #gallery .arrow { display: block; font-size: 120px; height: 160px; line-height: 160px; margin-top: -80px; position: relative; text-align: center; text-shadow: 0 0 5px #000000, 0 0 20px #FFFFFF; top: 50%; }';
	css += '.slideshow #gallery .nav:hover { background-color: rgba(0,0,0,0.5); opacity: 1.0; }';
	
	// full screen:: WebKit
    css += ':-webkit-full-screen { background-color: #000000; }';
	css += '#content:-webkit-full-screen { padding: 0; top: 0 !important; bottom: 0 !important; height: 100%; width: 100%; }';
	css += '#content:-webkit-full-screen .nav { border-radius: 40px; height: 160px; margin-top: -80px; top: 50%; }';
    css += '#content:-webkit-full-screen .image img { border: 0; padding: 0; }';
	css += '#content:-webkit-full-screen #thumbnails { background-color: #000000; position: absolute; top: 0; }';
    // full screen:: Mozilla
    css += '#content:-moz-full-screen { padding: 0; top: 0 !important; bottom: 0 !important; height: 100%; width: 100%; }';
    css += '#content:-moz-full-screen .nav { border-radius: 40px; height: 160px; margin-top: -80px; top: 50%; }';
    css += '#content:-moz-full-screen .image img { border: 0; padding: 0; }';
    css += '#content:-moz-full-screen #thumbnails { background-color: #000000; position: absolute; top: 0; }';

	// add to favorites
	css += '#favorites_container table { width: auto; }';

	// notification messages
	css += '#notificationContainer { bottom: 70px; position: fixed; right: 10px; }';
	css += '.notification { background: rgba(0, 0, 0, 0.8); border: 1px solid rgba(255, 255, 255, 0.2); ' + borderRadius('5px') + '; color: rgba(255, 255, 255, 0.5); display: block; font-size: 11px; margin-top: 10px; padding: 9px; }';

	// dialog box layout
	css += '#dialogContainer { background: rgba(0,0,0,0.8); display: block; text-align: center; position: fixed; top: 0; bottom: 0; left: 0; right: 0; z-index: 3; overflow-y: auto; }';
	css += '#dialogBox { background: ' + bg1 + '; border: 1px solid ' + lighten(bg2, 0.200) + '; ' + boxShadow('0 0 20px 0 #000000') + '; color: ' + fg1 + '; display: inline-block; margin: 20px auto; min-width: 300px; text-align: left; position: relative; z-index: 10; }';
	css += '#dialogClose { border-left: 1px solid ' + lighten(bg2, 0.200) + '; color: ' + links + '; font-size: 14px; line-height: 28px; position: absolute; right: 0; text-align: center; text-decoration: none; top: 0; width: 30px; }';
	css += '#dialogClose:hover { color: ' + lighten(links, 0.200) + '; }';
	css += '#dialogTitle { background: ' + bg1 + '; ' + gradient(lighten(bg2, 0.066), bg2) + '; border-bottom: 1px solid ' + lighten(bg2, 0.200) + '; color: ' + links + '; display: block; margin: 0; padding: 5px 10px; }';
	css += '#dialogTitle b { color: ' + accent2 + '; }';
	css += '#dialogMessage { display: block; padding: 10px; }';
	css += '#dialogButtons { clear: both; display: block; padding: 10px; text-align: right; }';

	// dialog box content
	css += '#dialogMessage table { margin: 0; }';
	css += '#dialogMessage table th { color: ' + accent1 + '; font-size: 14px; text-align: left; }';
	css += '#dialogMessage table b { color: ' + lighten(accent1, 0.066) + '; }';
	css += '#dialogMessage table td.name { padding-right: 5%; text-align: right; width: 20%; }';
	css += '#dialogMessage table td.key { text-align: center; width: 25%; }';

	// dialog box form elements
	css += '#dialogBox #settingsForm { width: 820px }';
	css += '#dialogBox .error { color: #C43131; font-weight: bold; }';
	css += '#dialogBox button { margin-right: 5px; }';
	css += '#dialogBox fieldset { border: 0; border-bottom: 1px solid ' + lighten(bg2, 0.200) + '; margin: 0 0 15px; padding-bottom: 10px; min-width: 400px; }';
	css += '#dialogBox fieldset:nth-child(1n) { float: left; }';
	css += '#dialogBox fieldset:nth-child(2n) { float: right; }';
	css += '#dialogBox legend { color: ' + accent1 + '; font-weight: bold; margin-bottom: 10px; }';
	css += '#dialogBox label { float: left; line-height: 20px; }';
	css += '#dialogBox label b { color: ' + accent1 + '; }';
	css += '#dialogBox label span.default { font-size: 11px; font-variant: small-caps; }';
	css += '#dialogBox input[type="text"], #dialogBox select { float: right; }';
	css += '#dialogBox input[type="checkbox"] { float: left; margin: 4px 10px 0 ; }';

	// insert the line breaks automatically before returning
	return css.replace(/}/g, "}\n");
}