// ==UserScript==
// @name		Girls of Desire
// @author		Harry Keogh
// @description	A complete Girls Of Desire gallery conversion script
// @namespace	http://userscripts.org/users/harryk
// @include		http://*girlsofdesire.org/*
// @version		1.0.0
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_registerMenuCommand
// @grant		GM_addStyle
// ==/UserScript==



/*	===== Integration =====
	This is where the initial/basic eventListeners are added.
	GreaseMonkey menus also get added here.
*/
window.addEventListener('load', init, false);
GM_registerMenuCommand('[' + GM_info.script.name + '] Help', displayHelp);
GM_registerMenuCommand('[' + GM_info.script.name + '] About', displayAbout);
GM_registerMenuCommand('[' + GM_info.script.name + '] Settings', changeSettings);



/*	===== Global Variables =====
	Changing these is a terrible idea; they are NOT for configuration
*/
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
		'expandingPagination':	{
			name:	'expandingPaginationEnabled',
			label:	'Expanding Pagination',
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
		'thumbnails':	{
			name:	'showThumbs',
			label:	'Show Thumbnails',
			type:	'boolean',
			def:	true
		}
	};
var mode = GM_getValue(settings.mode.name, settings.mode.def);
var autoplay = {
		active: false,
		count:	parseInt(GM_getValue(settings.autoplay.name, settings.autoplay.def), 10),
		delay:	parseInt(GM_getValue(settings.autoplay.name, settings.autoplay.def), 10),
		paused: false,
		timer:	undefined
	};
var pagination = {
		active:	false,
		expand:	GM_getValue(settings.expandingPagination.name, settings.expandingPagination.def),
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

	var ret = [];
	for (var i = 0; i < imgs.length; i++) {
		if (thumbRegex.test(imgs[i].src)) {
			ret.push(imgs[i].src);
		}
	}

	totalImages = ret.length;
	return ret;
}

/* Sets the global variables needed for pagination in other functions
 */
function initPagination(imgs) {
	// reset pagination settings to default; needed for gallery mode switching
	pagination = {
		active:	(mode == 'slideshow'),
		expand: GM_getValue(settings.expandingPagination.name, settings.expandingPagination.def),
		limit:	parseInt(GM_getValue(settings.pagination.name, settings.pagination.def), 10),
		page:	parseInt(getHashParam('page'), 10) || 1
	};

	if ((pagination.limit <= 0) || (mode == 'slideshow')) {
		// in slideshow mode pagination is handled as if it is disabled
		pagination.active = false;
		pagination.limit = totalImages;
		pagination.page = 1;
	} else {
		if (pagination.expand && ((pagination.limit / totalImages) >= 0.9)) {
			pagination.active = false;
			pagination.limit = totalImages;
			pagination.page = 1;
		} else {
			pagination.active = true;
			if (!pagination.page || (pagination.page < 1))
				pagination.page = 1;
		}
	}
	
	// ensure the user is on the correct page
	var page = checkPage();
	if (page !== pagination.page) {
		setHashParam('page', page);
		pagination.page = page;
	}
}

/* Returns the page number that the active image is on
 * Used for when pagination settings are changed or when switching gallery modes
 */
function checkPage() {
	if ((typeof activeImage === 'undefined') || !activeImage || (activeImage <= 0))
		return 1;
	
	return parseInt(((activeImage / pagination.limit) + 1), 10);
}

/* Returns the images that will be used on the current page
 * @param	Array	locations of all images from the original gallery
 * @return	Array	locations of all images for the current page
 */
function paginateImages(imgs) {
	if (pagination.active) {
		var lowerLimit = (pagination.limit * (pagination.page - 1));
		var upperLimit = (lowerLimit + pagination.limit);
		if (upperLimit > totalImages)
			upperLimit = totalImages;

		return imgs.slice(lowerLimit, upperLimit);
	} else {
		return imgs;
	}
}

/* Generates the minimum CSS needed for the rebuilt pages
 * @return	String	CSS to be placed in <style> tags
 */
function getCSS() {
	var css = '';

	// basics
	css += '* { -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; margin: 0; padding: 0; }';
	css += 'body { background-color: #222222; color: #888888; font: 13px Helvetica, Arial, sans-serif; }';
	css += 'a { color: #3168C4; cursor: pointer; text-decoration: none; }';
	css += 'a:hover, a:hover b { color: #888888; }';
	css += 'b { color: #3168C4; }';
	css += 'p { margin: 0 0 10px; }';
	css += 'table { font: 13px Helvetica, Arial, sans-serif; margin: auto; width: 100%; }';

	// layout
	css += '#header { background-color: #111111; border-bottom: 1px solid #444444; padding: 10px 0; text-align: center; }';
	css += '.scrolling #header { margin-bottom: 10px; }';
	css += '.slideshow #header { min-height: 60px; position: fixed; top: 0; width: 100%; z-index: 2; }';
	css += '#header .title { color: #3168C4; }';
	css += '#header p { margin: 10px 0; }';
	css += '#logo { position: absolute; left: 10px; top: 10px; }';
	css += '#search { position: absolute; right: 10px; top: 10px; }';
	css += '#footer { background-color: #111111; border-top: 1px solid #444444; padding: 10px 0; position: relative; text-align: center; }';
	css += '.scrolling #footer { margin-top: 10px; }';
	css += '.slideshow #footer { bottom: 0; min-height: 40px; position: fixed; width: 100%; z-index: 2; }';
	css += '#favorites_container { height: 40px; line-height: 40px; margin-bottom: 0 !important; position: absolute; left: 25px; bottom: 10px; }';
	css += '#autoplay { height: 20px; line-height: 20px; position: absolute; right: 25px; bottom: 20px; }';
	css += '#info { font-size: 11px; }';
	
	// forms
	css += 'form { margin: 0 0 10px; }';
	css += 'input[type="text"] { background: #FFFFFF; border: 1px solid #222222; color: #222222; margin-right: 5px; padding: 5px; }';
	css += 'select { margin-right: 5px; padding: 5px; }';
	css += 'button, input[type="button"], input[type="submit"] { background: #333333; background: -moz-linear-gradient(top, #333333 0%, #222222 100%); background: -webkit-linear-gradient(top, #333333 0%, #222222 100%); border: 1px solid #444444; border-radius: 5px; -moz-border-radius: 5px; -webkit-border-radius: 5px; color: #CCCCCC; cursor: pointer; margin-left: 5px; padding: 5px; -moz-box-shadow: 0 0 0 1px #111111; -webkit-box-shadow: 0 0 0 1px #111111; box-shadow: 0 0 0 1px #111111; }';
	css += 'button:hover, input[type="button"]:hover, input[type="submit"]:hover { background: #222222; background: -moz-linear-gradient(top, #444444 0%, #222222 100%); background: -webkit-linear-gradient(top, #444444 0%, #222222 100%); border-color: #555555; color: #FFFFFF; }';
	css += 'button:focus, input[type="button"]:focus, input[type="submit"]:focus { background: -moz-linear-gradient(top, #222222 0%, #444444 100%); background: -webkit-linear-gradient(top, #222222 0%, #444444 100%); border-color: #444444; color: #CCCCCC; }';
	
	css += 'button.default, button[type="submit"], input[type="submit"] { border-color: #3168C4; }';
	css += 'button.default:hover, button[type="submit"]:hover, input[type="submit"]:hover { border-color: #5E8BD7; }';
	css += 'button.default:focus, button[type="submit"]:focus, input[type="submit"]:focus { border-color: #244D91; }';

	// pagination
	css += '.pagination { margin: 10px 0; }';
	css += '.pagination a { border: 1px solid #666666; color: #666666; display: inline-block; margin: 0 2px; padding: 2px 6px; text-decoration: none; }';
	css += '.pagination a:hover { border-color: #888888; color: #AAAAAA; display: inline-block; margin: 0 2px; padding: 2px 6px; text-decoration: none; }';
	css += '.pagination a.current { border: 1px solid #3168C4; color: #3168C4; display: inline-block; margin: 0 2px; padding: 2px 6px; }';
	css += '.pagination a.disabled { border: 1px solid #444444; color: #444444; display: inline-block; margin: 0 2px; padding: 2px 6px; }';

	// thumbnails
	css += '#thumbnails { margin: 0; text-align: center; z-index: 2; }';
	css += '.scrolling #thumbnails {  }';
	css += '.slideshow #thumbnails { background-color: #111111; height: 137px; overflow-y: hidden; width: 100%; white-space: nowrap; }';
	css += '#thumbnails .thumbnail { border: 1px solid #666666; display: inline-block; 100px; padding: 4px; }';
	css += '.slideshow #thumbnails .thumbnail { margin: 0 5px; }';
	css += '.scrolling #thumbnails .thumbnail { margin: 2px; }';
	css += '#thumbnails .thumbnail:hover { border-color: #AAAAAA; }';
	css += '#thumbnails .thumbnail img { max-height: 100px; }';
	css += '#thumbnails .active { border: 2px solid #3168C4; padding: 3px; }';

	// gallery basics
	css += '#gallery { position: relative; text-align: center; }';
	css += '#gallery .image img { background: url("' + loading.image + '") no-repeat center; border: 1px solid #666666; padding: 4px; }';
	css += '#gallery .image:hover img { border-color: #AAAAAA; }';

	// scrolling gallery
	css += '.scrolling #gallery { max-width: 100%; }';
	css += '.scrolling #gallery .image img { display: inline-block; max-width: 98%; min-height: ' + loading.height + 'px; min-width: ' + loading.width + 'px; }';

	// slideshow gallery
	css += '.slideshow #content { bottom: 81px; left: 0; padding: 10px; position: absolute; right: 0; top: 81px; }';
	css += '.slideshow #gallery { height: 100%; width: 100%; overflow: hidden; }';
	css += '.slideshow #gallery .image img { bottom: 0; left: 0; margin: auto; max-height: 100%; max-width: 100%; position: absolute; right: 0; top: 0; }';
	css += '.slideshow #gallery .nav { background-position: center center; background-repeat: no-repeat; color: #FFFFFF; display: block; opacity: 0.5; position: absolute; top: 5px; bottom: 5px; height: 100%; width: 160px; z-index: 1; }';
	css += '.slideshow #gallery .nav.disabled { display: none; }';
	css += '.slideshow #gallery #next { min-height: 60px; min-width: 60px; right: 5px; }';
	css += '.slideshow #gallery #prev { min-height: 60px; min-width: 60px; left: 5px; }';
	css += '.slideshow #gallery .arrow { display: block; font-size: 120px; height: 160px; line-height: 160px; margin-top: -80px; position: relative; text-align: center; text-shadow: 0 0 5px #000000, 0 0 20px #FFFFFF; top: 50%; }';
	css += '.slideshow #gallery .nav:hover { background-color: rgba(0,0,0,0.5); opacity: 1.0; }';
	
	// full screen:: WebKit
    css += ':-webkit-full-screen{ background-color: #000000; }';
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

	// dialog box layout
	css += '#dialogContainer { background: rgba(0,0,0,0.8); display: block; text-align: center; position: fixed; top: 0; bottom: 0; left: 0; right: 0; z-index: 3; overflow-y: auto; }';
	css += '#dialogBox { background: #222222; border: 1px solid #444444; box-shadow: 0 0 20px #000000; color: #CCCCCC; display: inline-block; margin: 0 auto; min-width: 300px; text-align: left; position: relative; z-index: 10; }';
	css += '#dialogClose { border-left: 1px solid #444444; color: #888888; font-size: 14px; line-height: 30px; position: absolute; right: 0; text-align: center; top: 0; width: 30px; }';
	css += '#dialogClose:hover { color: #FFFFFF; }';
	css += '#dialogTitle { background: #222222; background: -moz-linear-gradient(top, #333333 0%, #222222 100%); background: -webkit-linear-gradient(top, #333333 0%, #222222 100%); border-bottom: 1px solid #444444; display: block; margin: 0; padding: 5px 10px; }';
	css += '#dialogMessage { display: block; padding: 10px; }';
	css += '#dialogButtons { display: block; padding: 10px; text-align: right; }';

	// dialog box content
	css += '#dialogMessage table { margin: 0; }';
	css += '#dialogMessage table th { color: #CCCCCC; font-size: 14px; text-align: left; }';
	css += '#dialogMessage table b { color: #5E8BD7; }';
	css += '#dialogMessage table td.name { padding-right: 5%; text-align: right; width: 20%; }';
	css += '#dialogMessage table td.key { text-align: center; width: 25%; }';

	// dialog box form elements
	css += '#dialogBox .error { color: #C43131; font-weight: bold; }';
	css += '#dialogBox button { margin-right: 5px; }';
	css += '#dialogBox fieldset { border: 0; border-bottom: 1px solid #444444; margin: 10px 0 15px; padding-bottom: 10px; min-width: 400px; }';
	css += '#dialogBox legend { margin-bottom: 10px; }';
	css += '#dialogBox label { float: left; line-height: 20px; }';
	css += '#dialogBox label span.def { font-size: 1spx; }';
	css += '#dialogBox input[type="text"], #dialogBox select { float: right; }';
	css += '#dialogBox input[type="checkbox"] { float: left; margin: 4px 10px 0 ; }';
	css += '#promptError { color: #FFFFFF; margin-left: 10px; text-shadow: 0 0 1px #FF0000; }';

	return css;
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

/* Creates the DOM objects needed for the thumbnail images of the rebuilt gallery page
 * @param	Array	locations of all images for the current page
 */
function buildThumbnails(imgs) {
	var thumbs = document.getElementById('thumbnails');
	if (!thumbs)
		return false;

	var img, link;
	for (var i = 0; i < imgs.length; i++) {
		img = document.createElement('img');
		img.src = imgs[i];

		link = document.createElement('a');
		link.addEventListener('click', clickThumbnail);
		link.className = 'thumbnail';
		link.id = 'thumb_' + (((pagination.page - 1) * pagination.limit) + i);
		link.rel = (((pagination.page - 1) * pagination.limit) + i);
		link.appendChild(img);

		thumbs.appendChild(link);
	}
}

/* Creates the DOM objects needed for the scrolling mode of the rebuilt gallery page
 * @param	Array	locations of all images for the current page
 */
function buildScrollingGallery(imgs) {
	var gallery = document.getElementById('gallery');
	if (!gallery)
		return false;

	var container, img, link;
	for (var i = 0; i < imgs.length; i++) {
		img = document.createElement('img');
		img.alt = '';
		img.src = imgs[i].replace('thumb', 'full');

		link = document.createElement('a');
		link.className = 'image';
		link.href = imgs[i].replace('thumb', 'full');
		link.id = 'full_' + (((pagination.page - 1) * pagination.limit) + i);
		link.appendChild(img);

		container = document.createElement('p');
		container.appendChild(link);

		gallery.appendChild(container);
	}
}

/* Creates the DOM objects needed for the slideshow mode of the rebuilt gallery page
 * @param	Array	locations of all images for the current page
 */
function buildSlideshowGallery(imgs) {
	var gallery = document.getElementById('gallery');
	if (!gallery)
		return false;

	var src = imgs[activeImage];

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
	img.src = src.replace('thumb', 'full');

	var link = document.createElement('a');
	link.className = 'image';
	link.href = src.replace('thumb', 'full');
	link.id = 'slideshowLink';
	link.appendChild(img);

	gallery.appendChild(link);
	gallery.appendChild(prev);
	gallery.appendChild(next);

	// resize the slideshow area
	resizeSlideshowGallery();
}

/* Resizes the DOM object containing the slideshow image to accomodate dynamic header and footer sizes
 */
function resizeSlideshowGallery() {
	var content = document.getElementById('content');
	
	// header
	var header = document.getElementById('header');
	if (content && header)
		content.style.top = (header.offsetHeight);
	
	// footer
	var footer = document.getElementById('footer');
	if (content && footer)
		content.style.bottom = footer.offsetHeight;
}

/* Generates the DOM objects for the header of rebuilt pages
 */
function buildHeader() {
	var header = document.getElementById('header');
	if (!header)
		return false;
	
	var logo = document.createElement('a');
	logo.href = window.location.protocol + '//' + window.location.host;
	logo.id = 'logo';
	logo.innerHTML = '<img src="' + window.location.protocol + '//' + window.location.host + '/img/logo.gif" alt="ImageFap.com">';
	header.appendChild(logo);
	
	var heading = document.createElement('h2');
	heading.id = 'heading';
	heading.innerHTML = '"<span class="title">' + stripslashes(title) + '</span>"';
	if (author.name && author.url)
		heading.innerHTML += ' <small>by</small> <a href="' + author.url + '">' + unescape(stripslashes(author.name)) + '</a>';
	header.appendChild(heading);
	
	if (desc) {
		var description = document.createElement('p');
		description.id = 'description';
		description.innerHTML = stripslashes(desc);
		header.appendChild(description);
	}
	
	buildPosition('header');
	
	if (mode == 'scrolling' && pagination.active)
		buildPagination('header');
	
	// search form
	var form = document.createElement('form');
	form.id = 'search';
	form.method = 'POST';
	form.action = window.location.protocol + '//' + window.location.host + '/gallery.php';
	
	var search = document.createElement('input');
	search.type = 'text';
	search.value = 'Enter search term(s)...';
	search.name = 'search';
	search.addEventListener('focus', function() { if (this.value == 'Enter search term(s)...') this.value = ''; });
	search.addEventListener('blur', function() { if (this.value == '') this.value = 'Enter search term(s)...'; });
	form.appendChild(search);
	
	var submit = document.createElement('input');
	submit.type = 'submit';
	submit.value = 'Search';
	submit.name = 'submit';
	form.appendChild(submit);
	
	header.appendChild(form);
}

/* Generates the DOM objects for the footer of rebuilt pages
 */
function buildFooter() {
	var footer = document.getElementById('footer');
	if (!footer)
		return false;
	
	footer.appendChild(addFavLink);
	
	buildPosition('footer');
	
	if (mode == 'scrolling' && pagination.active)
		buildPagination('footer');
	
	buildInfo();
	buildAutoplay();
}

/* Generates the HTML for the position of the current image(s) within the gallery
 * @param	String	the ID of the DOM object to insert the position into
 */
function buildPosition(location) {
	var container = document.getElementById(location);
	if (!container)
		return false;
	
	var text = document.createElement('span');
	text.id = 'position_' + location + '_text';
	if (mode == 'scrolling') {
		if (!pagination.active || ((pagination.limit * pagination.page) > totalImages)) {
			text.innerHTML = 'Displaying images ' + (pagination.limit * (pagination.page - 1) + 1) + '-' + totalImages + ' of ' + totalImages;
		} else {
			text.innerHTML = 'Displaying images ' + (pagination.limit * (pagination.page - 1) + 1) + '-' + (pagination.limit * pagination.page) + ' of ' + totalImages;
		}
	} else if (mode == 'slideshow') {
		text.innerHTML = 'Viewing image ' + (activeImage + 1) + ' of ' + totalImages;
	}
	var position = document.createElement('p');
	position.id = 'position_' + location;
	position.appendChild(text);

	// spacer
	var separator = document.createElement('span');
	separator.innerHTML = ' | ';
	position.appendChild(separator);
	
	// "toggle thumbnails" link
	var toggle = document.createElement('a');
	toggle.addEventListener('click', toggleThumbs);
	toggle.innerHTML = 'Toggle Thumbnails';
	position.appendChild(toggle);

	// spacer
	var separator = document.createElement('span');
	separator.innerHTML = ' | ';
	position.appendChild(separator);
	
	// "change settings" link
	var settings = document.createElement('a');
	settings.addEventListener('click', changeSettings);
	settings.innerHTML = 'Change Settings';
	position.appendChild(settings);
	
	container.appendChild(position);
}

/* Generates the DOM objects for the pagination of rebuilt gallery pages
 * @param	String	the ID of the DOM object to insert the pagination into
 */
function buildPagination(location) {
	var container = document.getElementById(location);
	if (!container)
		return false;
	
	var pages = Math.ceil(totalImages / pagination.limit);
	
	if (pages <= 1)
		return false;
		
	var wrapper = document.createElement('p');
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
	var link;
	for (var i = 1; i<=pages; i++) {
		link = document.createElement('a');
		link.innerHTML = i;
		if (i == pagination.page) {
			link.className = 'current';
		} else {
			link.addEventListener('click', clickPagination);
			link.rel = i;
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

/* Generates the DOM objects for the information text at the bottom of the footer
 */
function buildInfo() {
	var footer = document.getElementById('footer');
	if (!footer)
		return false;
	
	var info = document.createElement('div');
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
	var settings = document.createElement('a');
	settings.addEventListener('click', changeSettings);
	settings.innerHTML = 'Settings';
	info.appendChild(settings);

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
	if (mode == 'scrolling') {
		var disabled = document.createElement('span');
		disabled.innerHTML = 'Autoplay is only available in slideshow mode';
		autoplay.appendChild(disabled);
	} else if (mode == 'slideshow') {
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

/* Clears out and re-initializes the DOM
 * Also adds the title and CSS, as they do not change when once the gallery is first loaded
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
	GM_addStyle(getCSS());
}

/* Rebuilds the actual gallery page piece by piece
 */
function rebuildGalleryPage() {
	// reset global variable from preferences
	mode = GM_getValue(settings.mode.name, settings.mode.def);
	
	// reset pagination from preferences
	initPagination();
	var imgs = paginateImages(images);
		
	// reset autoplay from settings
	initAutoplay();
	
	body.innerHTML = '';
	
	// header
	var header = document.createElement('div');
	header.id = 'header';
	body.appendChild(header);
	buildHeader();

	// thumbnails
	var thumbs = document.createElement('div');
	thumbs.id = 'thumbnails';
	header.appendChild(thumbs);
	buildThumbnails(imgs);
	if (!GM_getValue(settings.thumbnails.name, settings.thumbnails.def))
		thumbs.style.display = 'none';
	if (mode == 'slideshow')
		thumbs.addEventListener('DOMMouseScroll', scrollThumbs, false);

	// content
	var content = document.createElement('div');
	content.id = 'content';
	body.appendChild(content);

	// main gallery
	var gallery = document.createElement('div');
	gallery.id = 'gallery';
	content.appendChild(gallery);

	// footer
	var footer = document.createElement('div');
	footer.id = 'footer';
	body.appendChild(footer);
	buildFooter();
	
	// populate the gallery
	if (mode == 'scrolling') {
		body.className = 'scrolling';
		buildScrollingGallery(imgs);
	} else if (mode == 'slideshow') {
		body.className = 'slideshow';
		buildSlideshowGallery(imgs);
		refreshNavigation(imgs);
	}
	
	// remove the page hash for slideshow mode
	if (mode == 'slideshow')
		unsetHashParam('page');

	// show the active image, unless it is the first image of a scrolling gallery
	if ((mode == 'slideshow') || (activeImage > 0))
		showImage();
	
	// start preloading images, if desired
	if ((mode == 'slideshow') && preloading.active)
		preloadImage();
}

/* Primary function; executes functionality based on page (via URL)
 * Redirects in certain scenarios
 */
function init() {
	var loc = window.location.href;
	if ((loc.indexOf('/gallery/') !== -1) || (loc.indexOf('/pictures/') !== -1)) {
		// this is a gallery page; make sure it is in "One Page" mode and then go to work
		if (loc.indexOf('view') == -1) {
			window.location.href += ((loc.indexOf('?') == -1) ? '?' : '&') + 'view=2';
		} else {
			// populate the variables that might be empty or require addt'l logic
			title = document.title;
			if (title)
				title = title.replace('Porn pics of ', '').replace(' (Page 1)', '');

			var links = document.getElementsByTagName('a');
			if (links) {
				var i = 0;
				for (var i = 0; i < links.length; i++) {
					if ((links[i].href.indexOf('profile') !== -1) && !(author.name && author.url)) {
						author.name = links[i].href.split('=')[1];
						author.url	= links[i].href;
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
			initSettings();
			rebuildGalleryPage();
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
					links[i].href += ((links[i].href.indexOf('?') == -1) ? '?' : '&') + 'view=2';
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

	if (activeImage == 0) {
		var prev = document.getElementById('prev');
		if (prev)
			prev.className += ' disabled';
	} else if (activeImage == (pagination.limit - 1)) {
		var next = document.getElementById('next');
		if (next)
			next.className += ' disabled';
	}
}

/* Handles the click event for the pagination links
 */
function clickPagination(evt) {
	if (this.rel) {
		var page = parseInt(this.rel, 10);
		activeImage = (((page - 1) * pagination.limit) + 1);
		unsetHashParam('image');
		goToPage(page);
	}
}

/* Sets the values needed to change pages and rebuilds the gallery for the specified page
 * @param	Int		page number
 */
function goToPage(page) {
	setHashParam('page', page);
	rebuildGalleryPage();
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
	if (mode == 'slideshow' && autoplay.active) {
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
	if (mode == 'slideshow' && autoplay.active) {
		stopAutoplay();
	}
	
	if (activeImage > ((pagination.page - 1) * pagination.limit)) {
		activeImage--;
		showImage();
	}
}

/* Highlights the thumbnail corresponding to the current image
 * and sets the image hash parameter
 */
function setActiveImage(pos) {
	pos = pos || activeImage;
	
	var thumbs = document.getElementsByClassName('thumbnail');
	for (var i = 0; i < thumbs.length; i++) {
		thumbs[i].className = trim(thumbs[i].className.replace('active',''));
	}
	
	var thumb = document.getElementById('thumb_' + pos);
	if (thumb) {
		thumb.className += ' active';
		if (mode == 'slideshow')
			thumb.scrollIntoView();
	}

	setHashParam('image', (pos + 1));
}

/* Displays/navigates to the "active" image
 * In scrolling mode, this simply scrolls the page up/down to the active image,
 * but in slideshow mode, this shows the active image and hides the others
 * @param	Integer	(Optional) the ID of the image to show
 */
function showImage(pos) {
	pos = pos || activeImage;
	setActiveImage(pos);
	
	if (mode == 'scrolling') {
		var target = document.getElementById('full_' + pos);
		if (target)
			target.scrollIntoView();
	} else if (mode == 'slideshow') {
		var link = document.getElementById('slideshowLink');
		var img	 = document.getElementById('slideshowImage');

		if (link && img) {
			img.src = link.href = '';
			setTimeout(function() { img.src = link.href = images[pos].replace('thumb', 'full'); }, 500);
			
			// always remove the autoplay function from load, and then re-add when needed
			img.removeEventListener('load', startAutoplay);
			if (autoplay.active && !autoplay.paused) {
				img.addEventListener('load', startAutoplay);
			}

			var containers = ['header', 'footer'];
			for(var i = 0; i < containers.length; i++) {
				var container = document.getElementById('position_' + containers[i] + '_text');
				if (container)
					container.innerHTML = 'Viewing image ' + (pos + 1) + ' of ' + totalImages;
			}
			refreshNavigation();
		
			if (preloading.active && !preloading.done)
				preloading.pos = activeImage;
		}
	}
}

/* Event handler for keypresses
 * Used to handle hotkeys
 * @param	Event	keypress event
 */
function onKeyDown(evt) {
	if (!evt)
		evt = this;
	
	if ((evt.target.nodeName == 'INPUT') || (evt.target.nodeName == 'SELECT') || (evt.target.nodeName == 'TEXTAREA'))
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
 * @param	Event	scroll event
 */
function onWindowScroll(evt) {
	if (mode == 'scrolling') {
		var images = document.getElementById('gallery').getElementsByTagName('img');
		var target = 0;
		
		// loop backwards through the images until the currently visible image is found
		for (var i = (images.length - 1); i>=0; i--) {
			var current = parseInt(images[i].offsetTop, 10);
			var pos = parseInt(document.body.scrollTop, 10);
			if (pos >= current) {
				target = i;
				break;
			}
		}
		
		target += ((pagination.page - 1) * pagination.limit);
		
		// only update the active image if it changed
		if (target !== activeImage) {
			activeImage = target;
			setActiveImage();
		}
	}
}

/* Event handler for window focus
 * Used to monitor setting changes and refresh the gallery when needed
 * @param	Event	focus event
 */
function onWindowFocus(evt) {
	var refresh = false;

	var thumbs = document.getElementById('thumbnails');
	if (thumbs) {
		// thumbnails can be toggled without rebuilding the entire gallery page
		thumbs.style.display = GM_getValue(settings.thumbnails.name, settings.thumbnails.def) ? 'block' : 'none';
		if (mode == 'slideshow')
			resizeSlideshowGallery();
	}
	
	if (mode !== GM_getValue(settings.mode.name, settings.mode.def)) {
		// current gallery mode does not match the stored preferences
		refresh = true;
	}
	
	if ((mode == 'scrolling') && (pagination.limit !== parseInt(GM_getValue(settings.pagination.name, settings.pagination.def), 10))) {
		// current gallery pagination does not match the stored preferences
		// only applies in scrolling gallery mode
		refresh = true;
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

/* Reset the autoplay settings to default
 * Primarilly used to reload changes to the delay setting
 */
function initAutoplay() {
	if (autoplay.timer)
		window.clearTimeout(autoplay.timer);
	
	autoplay = {
		active: false,
		count:	parseInt(GM_getValue(settings.autoplay.name, settings.autoplay.def), 10),
		delay:	parseInt(GM_getValue(settings.autoplay.name, settings.autoplay.def), 10),
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
		initSettings();
	}
	
	if (autoplay.delay < 0) {
		// the delay is invalid; inform the user
		var buttons = {0: {text: 'Change Settings', action: changeSettings}};
		showDialog('<p>The current value for the ' + settings.autoplay.label + ' is not valid.', 'Invalid ' + settings.autoplay.label, buttons);
	} else {
		autoplay.count = autoplay.delay;
		if (activeImage < (pagination.limit - 1)) {
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
	if (autoplay.count > 0) {
		autoplay.timer = window.setTimeout(autoplayTimer, 1000);
		counter.innerHTML = 'Advancing image in <b>' + autoplay.count + '</b> seconds';
	} else {
		counter.innerHTML = 'Loading image...';
		nextImage();
	}
	autoplay.count--;
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
 * A dialog is shown after toggling to notify the user
 * @param	Booelan	(Optional) If a nofitication should be displayed (default: true)
 */
function switchGalleryMode(notify) {
	notify = notify || true;
	if (mode == 'slideshow')
		GM_setValue(settings.mode.name, 'scrolling');
	else if (mode == 'scrolling')
		GM_setValue(settings.mode.name, 'slideshow');
	initSettings();

	if (notify) {
		var buttons = {0: {text: 'Apply Change Now', action: rebuildGalleryPage}, 1: {text: 'Close', action: hideDialog}};
		showDialog('<p>Gallery mode has been changed to ' + GM_getValue(settings.mode.name, settings.mode.def) + '.</p>', 'Gallery Mode', buttons);
	}
}

/* Toggles visibilty on thumbnails and stores the preference
 */
function toggleThumbs() {
	GM_setValue(settings.thumbnails.name, !GM_getValue(settings.thumbnails.name, settings.thumbnails.def));
	initSettings();

	var visible = GM_getValue(settings.thumbnails.name, settings.thumbnails.def);
	
	var thumbs = document.getElementById('thumbnails');
	if (thumbs) {
		thumbs.style.display = (visible) ? 'block' : 'none';
	}
	
	if (mode == 'slideshow') {
		resizeSlideshowGallery();
	} else if (mode == 'scrolling') {
		if (visible)
			window.scrollTo(0, 0);
		else
			showImage();
	}
}

/* Preloads the next image in slideshow mode
 * Will be called continuously until the last image is loaded
 */
function preloadImage() {
	if (!preloading.active)
		return false;
	
	if (preloading.pos < ((pagination.page * pagination.limit) - 1)) {
		preloading.pos++;
		var preloader = new Image();
		preloader.src = images[preloading.pos].replace('thumb', 'full');
		preloader.addEventListener('load', preloadImage);
	} else {
		preloading.done = true;
	}
}

/* Toggles full screen view in supported browsers
 * Full screen view is only available in slideshow mode
 */
function toggleFullScreen() {
	if (mode !== 'slideshow')
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
	closeButton.id = 'dialogClose';
	closeButton.innerHTML = '&#10006;';
	closeButton.addEventListener('click', hideDialog, false);
	dialog.appendChild(closeButton);

	var dialogContainer = document.createElement('div');
	dialogContainer.id = 'dialogContainer';
	dialogContainer.style.display = 'none';
	dialogContainer.appendChild(dialog);
	body.appendChild(dialogContainer);
}

/* Hides the dialog box
 */
function hideDialog() {
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
	dialogBox.style.top = ((window.innerHeight / 2) - (dialogBox.offsetHeight / 2)) + 'px';
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
 * @param	String	(Optional) A title for the dialog box (always prefixed with '[Script Name'])
 * @param	Object	(Optional) An object representing the buttons to display and their actions (default: close button)
 */
function showDialog(content, title, buttons) {
	buildDialog();

	buttons = buttons || {0: {text: 'Close', action: hideDialog}};
	title = title || '';

	var dialogContainer = document.getElementById('dialogContainer');
	var titleContainer = document.getElementById('dialogTitle');
	var messageContainer = document.getElementById('dialogMessage');
	var buttonContainer = document.getElementById('dialogButtons');

	titleContainer.innerHTML = '[' + GM_info.script.name + '] ' + title;
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
					case 'text':
						value = parseInt(field.value, 10);
						break;
					case 'select':
						value = field.options[field.selectedIndex].value;
						break;
					case 'boolean':
						value = field.checked;
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
	if (!GM_getValue('lastSavedVersion')) {
		var buttons = {0: {text: 'Continue', action: changeSettings}};
		showDialog('<p>Since this is your first time using ' + GM_info.script.name + ', you need to view (and modify) the settings to meet your needs.</p><p>Note that all settings have a default value set already for your convenience; you can simply click the "Save Settings" button on the next dialog box to continue.', 'First Run', buttons);
	} else if (GM_getValue('lastSavedVersion') !== GM_info.script.version) {
		GM_setValue('lastSavedVersion', GM_info.script.version);
		var buttons = {0: {text: 'Change Settings', action: changeSettings}, 1: {text: 'Close', action: hideDialog}};
		showDialog('<p>The version of this script has changed from ' + GM_getValue('lastSavedVersion') + ' to ' + GM_info.script.version + '. There may be new settings for you to utilize.', 'Version Change', buttons);
	}
}

/* Sets the value for all available settings from saved preferences
 * Uses the default value for settings that have not yet been saved to local storage
 */
function initSettings() {
	var setting;
	for (s in settings) {
		setting = settings[s];
		if (setting && (typeof setting === 'object')) {
			if (setting.name)
				setting.value = GM_getValue(setting.name, setting.def);
			
			if (setting.type == 'integer')
				setting.value = parseInt(setting.value, 10);
			else if ((setting.type == 'select') && (setting.opts.indexOf(setting.value) == -1))
				setting.value = setting.def;
		}
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
			html += '<fieldset><legend><b>' + setting.label + '</b></legend>';
			switch (setting.type) {
				case 'integer':
				case 'text':
					html += '<label for="setting-' + s + '">Enter a value for the ' + setting.label;
					if (setting.hint)
						html += ' (' + setting.hint + ')';
					html += ':<br/><span class="def">Default value: <b>' + setting.def + '</b></span></label>';
					html += '<input type="text" id="setting-' + s + '" name="' + s + '" value="' + setting.value + '" size="' + setting.size + '" maxlength="' + setting.size + '"/>';
					break;
				case 'select':
					html += '<label for="setting-' + s + '">Select a value for the ' + setting.label;
					if (setting.hint)
						html += ' (' + setting.hint + ')';
					html += ':<br/><span class="def">Default value: <b>' + capitalize(setting.def) + '</b></span></label>';
					html += '<select id="setting-' + s + '" name="' + s + '">';
					for (opt in setting.opts) {
						html += '<option value="' + setting.opts[opt] + '"' + ((setting.value == setting.opts[opt]) ? ' selected="selected"' : '') + '>' + capitalize(setting.opts[opt]) + '</option>';
					}
					html += '</select>';
					break;
				case 'boolean':
					html += '<input type="checkbox" id="setting-' + s + '" name="' + s + '" value="true"' + ((setting.value) ? ' checked="checked"' : '') + '/>';
					html += '<label for="setting-' + s + '">Enable ' + setting.label;
					if (setting.hint)
						html += ' (' + setting.hint + ')';
					html += '<br/><span class="def">Default value: <b>' + ((setting.def) ? 'Enabled' : 'Disabled') + '</b></span></label>';
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



/*	===== Misc Functions =====
	This is where everything else ends up.
*/

function addslashes(str) {
	return str.replace(/\\/g,'\\\\').replace(/\'/g,'\\\'').replace(/\"/g,'\\"').replace(/\0/g,'\\0');
}

function stripslashes(str) {
	return str.replace(/\\'/g,'\'').replace(/\\"/g,'"').replace(/\\0/g,'\0').replace(/\\\\/g,'\\');
}

function trim(str) {
	return str.replace(/^\s+|\s+$/g,'');
}

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/* Returns all key/value pairs stored in the location hash
 * @return	Object	location hash parameters indexed by key name
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
 * @param	String	name of the hash key
 * @return	String	value of the hash key
 */
function getHashParam(key) {
	var params = getHashParams();
	return params[key] || undefined;
}

/* Sets the value of the supplied hash key
 * @param	String	name of the hash key
 * @param	String	value of the hash key
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
 * @param	String	name of the hash key
 */
function unsetHashParam(key) {
	var current = getHashParam(key);
	if (typeof current !== 'undefined')
		history.replaceState(null, null, window.location.hash.replace('/' + key + '/' + current, ''));
}