// ==UserScript==
// @name           Mangafox Ajax Preloader
// @namespace      Joel Spadin
// @description    Preloads all the pages in a chapter and overrides the page changing controls for immediate page turns
// @include        http://www.mangafox.com/manga/*
// @version        1.4
// ==/UserScript==

// Some elements of this script are adapted from techniques used by sillymokona
// in the One Manga Full Chapter Loader userscript.

// Limit execution to mangafox for Opera.
if (window.location.href.indexOf('http://www.mangafox.com/manga/') != -1) {

/* Begin Settings */
var useStorage = /*@Cache pages@bool@*/true/*@*/;							//use web storage to cache image urls
var persistStorage = /*@Keep cache across sessions@bool@*/true/*@*/;		//use localStorage instead of sessionStorage
var storageExpiration = /*@Days to keep@int@*/2/*@*/ * 24*60*60*1000		//length of time to keep chapters in persistent storage (ms)

var showReloadChapter = /*@Show reload chapter button@bool@*/true/*@*/;		//shows a 'Reload Chapter' button on the right
var showReloadPage = /*@Show reload page button@bool@*/true/*@*/;			//shows a 'Reload Page' button on the right
var blockAllAds = /*@Block all ads@bool@*/false/*@*/;						//removes bottom ads
var autoEnlarge = /*@Automatically enlarge big pages@bool@*/true/*@*/;		//automatically enlarges big pages
var resetScrollOnPageChange = /*@Scroll on change@bool@*/true/*@*/;			//scrolls to a certain position when the page changes
var resetScrollTarget = /*@Reset scroll to (top|bar|blocks|page|viewer)@string@*/'blocks'/*@*/;		
																			//sets where the page scrolls to on page changes
																			//	"top" : the top of the page
																			//	"bar" : the navigation bar
																			//	"blocks" : the progress blocks
																			//	"page" : the manga page (image)
																			//	"viewer" : the header above the manga page

var blockBorderColor = "transparent";		//progress indicator border color
var blockUnloadedColor = "red";				//color of requested page
var blockLoadingColor = "#b0c4de";			//color of loading page
var blockDoneColor = "#4a7193";				//color of loaded page
var blockFailedColor = "purple";			//color of failed page
var blockCurrentColor = "#00054a";			//color of current page
var blockSize = "12px";						//size of progress indicator blocks
var blockRadius = "3px";					//corner radius of progress indicator blocks
var blockMargin = "1px";					//spacing between progress indicator blocks
/* End Settings */
	


var pageImages = [];
var defaultWidth = 728;
var preloadingPage = -1;
var waitingForPage = -1;
var highlightedPage = -1;
var pageChanged = false;
var changesApplied = false;
var doneLoading = false;
var pageSelect;
var pageSelect2;
var prevButton;
var prevButton2;
var nextButton;
var nextButton2;

var isOpera = window.opera;
var isFirefox = !isOpera;

var storageName;
var jsStorage;
var shortenFolder;
var shortenRegex = /http:\/\/img(\d+\.\w+\.\w+)\.mangafox\.com\/store\/manga\/(\d+\/(?:\d+-)\d+(?:\.\d+))\/compressed\/(.+)\.(\w+)/;
var expandRegex = /(.+):(.+):(.+)/;
var chapterRegex = /^(.+?)\//;


if (isOpera) {
	//Remove the Google Analytics calls for the top ad (or all ads if asked to)
	window.opera.addEventListener('BeforeScript', function (e) {
		e.element.text = e.element.text.replace(/GA_googleAddSlot\([^)]*?TOP[^)]*?\);/g, '');
		
		if (!blockAllAds)
			return;
		
		e.element.text = e.element.text.replace(/G[AS]_google\w+\([^)]*?\);/g, '');
	}
	, false);
	
	// Override page changing functions
	window.opera.defineMagicFunction('change_page', changePage);
	window.opera.defineMagicFunction('next_page', nextPage);
	window.opera.defineMagicFunction('previous_page', previousPage);
	
	// After series_url is set, all required variables are in place, 
	// so we can start before the page is fully loaded.
	window.opera.defineMagicVariable("series_url", function(curVal) {
		return curVal;
	}, function (newVal) {
		applyChanges();
	});
	
	addEventListener("DOMContentLoaded", function (e) {
		// If the defineMagicVariable didn't work for some reason, 
		// start loaded when DOM content is finished being loaded.
		applyChanges();
	}
	, false);
	
	
}
else if (window.top == window.self) {
	//synchronize/override functions between page and GM
	var previous_chapter = unsafeWindow.previous_chapter;
	var next_chapter = unsafeWindow.next_chapter;
	var enlarge = unsafeWindow.enlarge;
	
	if (useStorage)
		unsafeWindow.removeChapter = this.removeChapter;
	
	//get variables from page
	var current_chapter = unsafeWindow.current_chapter;
	var current_page = unsafeWindow.current_page;
	var total_pages = unsafeWindow.total_pages;
	var image_width = unsafeWindow.image_width;
	var series_name = unsafeWindow.series_name;
	
	//for some reason, the mere presence of series_url in global scope,
	//even though it's not being changed, makes defineMagicVariable fail. 
	function hideSeriesUrlFromOpera() {
		series_url = unsafeWindow.series_url;
	}
	hideSeriesUrlFromOpera();
}

//extra initialization stuff for FF.
function init() {
	if (isFirefox && window.top == window.self) {
		//synchronize/override functions between page and GM
		unsafeWindow.change_page = unsafeWindow.changePage = changePage;
		unsafeWindow.next_page = unsafeWindow.nextPage = nextPage;
		unsafeWindow.previous_page = unsafeWindow.previousPage = previousPage;
		unsafeWindow.imageLoaded = imageLoaded;
		unsafeWindow.reloadPage = reloadPage;
		unsafeWindow.removeChapter = removeChapter;
	
		applyChanges();
		pageSelect.selectedIndex = pageSelect2.selectedIndex = current_page - 1;
	}
}

function applyChanges() {
	//Ignore pages that aren't manga chapters
	if (typeof(current_page) == 'undefined')
			return;
		
	//Ignore if called twice
	if (changesApplied)
		return;
	changesApplied = true;
		
	//Setup page
	findElements();
	rewriteEvents();
	insertStyles();
	removeAds();
	buildTopBar();
	highlightPage(current_page);
	
	//Auto enlarge image
	if (autoEnlarge && image_width > defaultWidth)
		enlarge();
	
	initStorage();	

	//Load pages
	preloadImage(1);
}

function findElements() {
	var doc = isFirefox ? unsafeWindow.document : document;

	//Find top buttons and page dropdown
	var bar = doc.getElementById("top_bar");
	bar = bar.getElementsByTagName("div")[0];
	
	var links = bar.getElementsByTagName("a");
	prevButton = links[0];
	nextButton = links[1];
	
	var temp = bar.getElementsByTagName("div")[0];
	pageSelect = temp.getElementsByTagName("select")[0];

	//Find bottom buttons and page dropdown
	bar = doc.getElementById("bottom_bar");
	bar = bar.getElementsByTagName("div")[0];
	
	links = bar.getElementsByTagName("a");
	prevButton2 = links[0];
	nextButton2 = links[1];
	
	temp = bar.getElementsByTagName("div")[0];
	pageSelect2 = temp.getElementsByTagName("select")[0];
}

function insertStyles() {
	var rules = [

	".page #top_under_bar {\
		clear: both;\
		border: 1px solid #ababab;\
		border-top: none;\
		border-bottom: none;\
		background: url('http://cdn.mangafox.com/media/search.left.png') no-repeat -1px bottom,\
					url('http://cdn.mangafox.com/media/search.center.png') repeat-x center bottom,\
					url('http://cdn.mangafox.com/media/search.right.png') no-repeat right bottom #f5f5f5;\
		border-bottom-left-radius: 8px;\
		border-bottom-right-radius: 8px;\
		padding: 4px 8px 6px;\
	}",
	"#status {\
		text-align: left;\
		margin-left: 0;\
		margin-right: auto;\
	}",
	".status {\
		display: inline-block;\
		background-color: " + blockUnloadedColor + ";\
		border: 1px solid " + blockBorderColor + ";\
		background-clip: padding-box;\
		border-radius: " + blockRadius + ";\
		height: " + blockSize + ";\
		width: " + blockSize + ";\
		margin: 1px " + blockMargin + " 1px 0;\
	}",
	".status.loading {\
		background-color: " + blockLoadingColor + ";\
	}",
	".status.done {\
		background-color: " + blockDoneColor + ";\
	}",
	".status.fail, #reset {\
		background-color: " + blockFailedColor + " !important;\
	}",
	".status.current, #reload {\
		background-color: " + blockCurrentColor + ";\
	}",
	"#buttons {\
		float: right;\
		margin-left: 4px;\
	}",
	];

	//apply styles
	if (isFirefox) {
		//Replace stuff with -moz-stuff, then add styling rules
		for (i = 0; i < rules.length; i++) {
			rules[i] = rules[i].replace(
				/border(?:(-bottom|-top)-(left|right))?-radius/gi,
				'-moz-border-radius$1$2');
			rules[i] = rules[i].replace('background-clip', '-moz-background-clip');
			rules[i] = rules[i].replace('padding-box', 'padding');
			GM_addStyle(rules[i]);
		}
	}
	else {
		var style = document.createElement("style");
		style.type = "text/css";
		for (var i = 0; i < rules.length; i++)
			style.innerHTML += rules[i] + "\n";
		
		var head = document.getElementsByTagName("head")[0];
		head.appendChild(style);
	}
}

function removeAds() {
	//remove top ad
	var ad = document.getElementById("topad");
	ad.parentNode.removeChild(ad);
	
	if (blockAllAds) {
		//Since applyChanges() gets called before bottom ads are loaded in 
		//Opera, remove them on load
		if (isOpera)
			addEventListener("load", removeBottomAds, false);
		else
			removeBottomAds();
	}
	
	//remove the top ad section by shortening the top divs
	var topBarIds = [ "top_left_bar", "top_center_bar", "top_right_bar" ];
	for(var i in topBarIds) {
		var bar = document.getElementById(topBarIds[i]);
		if (bar)
			bar.style.height = "50px";
	}
}

function removeBottomAds() {
	var ad = document.getElementById("bottom_ads");
	ad.parentNode.removeChild(ad);
}

function buildTopBar() {
	//add a div below the top var and before the spacer div
	var bar = document.getElementById("top_right_bar");
	var spacer = bar.nextSibling;
	var parent = bar.parentNode;
	
	var div = document.createElement("div");
	div.id = "top_under_bar";
	
	var status = document.createElement("div");
	status.id = "status";
	
	var pages = document.createElement('div');
	pages.id = 'pages';
	
	//place page status blocks in the new div
	for (var i = 1; i <= total_pages; i++) {
		var block = document.createElement("a");
		block.className = "status";
		block.id = "status_" + i;
		block.title = 'page ' + i;
		
		block.href = "javascript:void(0)";
		block.setAttribute("onclick", "changePage(" + i + ")");

		pages.appendChild(block);
	}
	

	var buttons = document.createElement('div');
	buttons.id = 'buttons';

	// Build 'Reload chapter' button.
	if (useStorage && showReloadChapter) {
		var reset = document.createElement('a');
		reset.className = 'status';
		reset.id = 'reset';
		reset.title = 'Reload chapter';
		reset.href = "javascript:void(0)";
		reset.setAttribute('onclick', "removeChapter(); window.location.reload()");
		buttons.appendChild(reset);
	}

	// Build 'Reload page' button.
	if (showReloadPage) {
		var reload = document.createElement('a');
		reload.className = 'status';
		reload.id = 'reload';
		reload.title = 'Reload image';
		reload.href = "javascript:void(0)";
		reload.setAttribute('onclick', 'reloadPage();');
		reload.setAttribute('ondblclick', 'reloadPage(true)');
		buttons.appendChild(reload);
	}

	status.appendChild(buttons);
	status.appendChild(pages);
	div.appendChild(status);
	
	parent.insertBefore(div, spacer);
}



function makeXmlHttpRequest(url, callback, error) {
	if (isFirefox && false) {
		GM_xmlhttpRequest( {
			method : "GET", 
			url : url, 
			onload : callback, 
			onerror : error
		});
	}
	else {
		//not a complete implementation, I just need responseText
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == 4)
			{
				if (xmlhttp.status >= 200 && xmlhttp.status < 300)
					callback( {responseText : xmlhttp.responseText} );
				if (xmlhttp.status < 200 || xmlhttp.status >= 300)
					error( {status : xmlhttp.status, statusText : xmlhttp.statusText} );
			}
		}
		try {
			xmlhttp.open("GET", url);
		} catch (e) {
			error( {status : xmlhttp.status, statusText : xmlhttp.statusText} );
		}
		xmlhttp.send(null);
	}
}



function preloadImage(page, reload) {
	//Stop when all pages are loaded
	if (page > total_pages) {
		preloadComplete();
		return;
	}
		
	//If page is stored in localStorage, use that, otherwise if this is still the
	//original page, pull the source out of the current image
	var src;
	if (!reload)
		src = getStoredImageSrc(page);

	if (!src && !pageChanged && page == current_page)
		src = document.getElementById("image").src;
	
	if (src) {
		var img = new Image();
		img.src = src;
		setImage(page, img);
		//load the next page
		if (!doneLoading)
			preloadImage(page + 1);
	}
	else {
		//source of image is another page.  request it.
		var url = "http://" + document.domain + series_url + '/' + current_chapter + '/' + page + '.html';
		preloadingPage = page;
		makeXmlHttpRequest(url, preloadImageResponse, preloadImageFailure);
	}
}

function preloadImageResponse(response) {
	//Find the image source
	var pattern = new RegExp('<img.+?src="(http://.+?/store/manga/[^"]+?)".+?>', 'i' );
	var match = pattern.exec(response.responseText);
	
	if (!match)
		failImage(preloadingPage);
	else
	{
		var img = new Image();
		img.src = match[1];
		setImage(preloadingPage, img);
	}
	//load the next page
	if (!doneLoading)
		preloadImage(preloadingPage + 1);
}

function preloadImageFailure(response) {
	failImage(preloadingPage);
	if (!doneLoading)
		preloadImage(preloadingPage + 1);
}

function preloadComplete() {
	doneLoading = true;
	removeOldChapters();
}



function setImage(i, img) {
	//Store the image
	pageImages[i] = img;
	//Set the status block to indicate the page is loading
	var block = document.getElementById("status_" + i);
	block.className += " loading";
	//Add an event handler to change the status when the page is done loading
	img.setAttribute("onload", "imageLoaded(" + i + ")");
	
	//If we are waiting for this page to be loaded, switch to it
	if (waitingForPage == i) 
		changePage(waitingForPage);
	
	setStoredImageSrc(i, img.src);
}

function failImage(i) {
	pageImages[i] = null;
	//Set the status block to indicate the page failed to load
	var block = document.getElementById("status_" + i);
	block.className += " fail";
	
	removeStoredImageSrc(i);
}

function imageLoaded(i) {
	//Set the status block to indicate the page finished loading
	var block = document.getElementById("status_" + i);
	block.className = block.className.replace(/\s*loading/, " done");
}


function highlightPage(page) {
	if (page == highlightedPage)
		return;
	
	//Remove the highlight from the last highlighted page and set it on the new one
	var last = document.getElementById("status_" + highlightedPage);
	var current = document.getElementById("status_" + page);
	
	if (last)
		last.className = last.className.replace(/\s*current/, '');
	if (current)
		current.className += " current";
	highlightedPage = page;
}


function changePage(page) {
	//If called from page selector dropdown, get the page
	if (typeof(page) == 'object')
		page = page.options[page.selectedIndex].value;
	
	//Ignore invalid pages
	if (page < 1 || page > total_pages)
		return;
	
	if (pageImages[page] === null) {
		//page failed to load
		alert("Failed to load page " + page + ".  Try refreshing the page.");
		return;
	}

	if (page != current_page)
		pageChanged = true;

	//change the page
	current_page = page;
	if (isFirefox)
		unsafeWindow.current_page = current_page;
	
	//update dropdowns and highlighted block
	pageSelect.selectedIndex = pageSelect2.selectedIndex = current_page - 1;
	highlightPage(current_page);
	
	//If image request has not completed, wait until it has finished
	if (typeof(pageImages[page]) == 'undefined')
		waitingForPage = page;
	else {
		//change the image
		var img = document.getElementById("image");
		img.src = pageImages[current_page].src;
		
		//un-enlarge the image if necessary
		resetSize();

		//set image_width so enlarge() will work properly
		if (isFirefox)
			unsafeWindow.image_width = image_width = pageImages[current_page].width;
		else
			image_width = pageImages[current_page].width;

		//Automatically enlarge big pages
		if (autoEnlarge && image_width > defaultWidth)
			enlarge();
		
		//scroll to the top
		if (resetScrollOnPageChange)
			resetScroll();
	}
}

function reloadPage(redownload) {
	if (redownload) {
		pageImages[current_page] = null;
		var block = document.getElementById('status_' + current_page);
		block.className = 'status';
		preloadImage(current_page, true);
		waitingForPage = current_page;
		return;
	}

	var img = document.getElementById('image');
	img.src = img.src.replace(/$|\?.+$/, '?' + Math.floor(Math.random() * 10000));
	img.setAttribute("onload", "imageLoaded(" + current_page + ")");
	pageImages[current_page].src = img.src;
}

function resetScroll() {
	var target;
	var offset = 0;
	switch (resetScrollTarget)
	{
		case "viewer":
		case "page":
			target = "viewer"; 
			break;
		case "top":
			target = "body"; 
			break;
		case "blocks":
			target = "top_under_bar"; 
			offset = 2;
			break;
		case "bar":
			target = "top_bar"; 
			break;
		default:
			alert('"' + resetScrollTarget + '" is not a valid option.'); 
			break;
	}
	
	var a = document.getElementById(target);
	if (resetScrollTarget == "page")
		a = a.childNodes[3];
		
	var y = offset;
	while (a != null) {
		y += a.offsetTop;
		a = a.offsetParent;
	}
	window.scrollTo(0, y);
}

function previousPage() {
    if (current_page <= 1) 
		previous_chapter();
    else 
        changePage(current_page - 1);
    return false;
}

function nextPage() {
    if (current_page >= total_pages) 
        next_chapter();
    else 
        changePage(current_page + 1);
}
   
function resetSize() {
	var doc = isFirefox ? unsafeWindow.document : document;
	
	var a = doc.getElementById("viewer");
	var b = doc.getElementById("image");
	a.setStyle("width", defaultWidth + 12);
	b.setStyle("width", defaultWidth);
}


function rewriteEvents() {
	//rewrite event handlers and hrefs for buttons and dropdowns
	prevButton.href = prevButton2.href = nextButton.href = nextButton2.href = 
		"javascript:void(0);";

	prevButton.setAttribute("onclick", "previousPage()");
	prevButton2.setAttribute("onclick", "previousPage()");
	nextButton.setAttribute("onclick", "nextPage()");
	nextButton2.setAttribute("onclick", "nextPage()");

	if (isOpera)
		pageSelect.onchange = pageSelect2.onchange = 
			"changePage(this.selectedIndex + 1)";
}



function initStorage() {
	if (!supportsStorage()) {
		useStorage = false;
		return;
	}
	
	storageName = series_name + "/" + current_chapter + "/";
	
	//build a jsStorage object that uses either local or session storage based
	//on user prefs
	if (persistStorage)
		jsStorage = {
			getItem: function (key) {return localStorage.getItem(key);},
			setItem: function(key, value) {localStorage.setItem(key, value);},
			removeItem: function(key) {localStorage.removeItem(key);}
		}
	else
		jsStorage = {
			getItem: function (key) {return sessionStorage.getItem(key);},
			setItem: function(key, value) {sessionStorage.setItem(key, value);},
			removeItem: function(key) {sessionStorage.removeItem(key);}
		}
		
	addChapterEntry();
}

function supportsStorage() {
	if ((persistStorage && localStorage) ||
		(!persistStorage && sessionStorage))
		return true;
	return false;
}

function findIndex(chapterName) {
	var i = 0;
	while (true) {
		var name = jsStorage.getItem('_index' + i);
		if (name === null)
			return null;
		if (name == chapterName)
			return i;
		i++;
	}
}

function addChapterEntry() {
	if (!useStorage || !persistStorage)
		return;

	var i = findIndex(storageName);
	if (i === null) {
		//find last stored element
		for (i = 0; jsStorage.getItem("_index" + i) !== null; i++) ;
		
		jsStorage.setItem("_index" + i, storageName);
	}
	
	jsStorage.setItem(storageName + "time", new Date().toString());
}

function removeOldChapters()
{
	if (!useStorage || !persistStorage)
		return;
	
	var i = 0;
	while (true)
	{
		var chapterName = jsStorage.getItem("_index" + i);
		if (chapterName === null)
			break;
		
		var chapterTime = new Date(jsStorage.getItem(chapterName + "time")).getTime();
		var currentTime = new Date().getTime();
		if (chapterTime + storageExpiration < currentTime)
		{
			//Chapter is expired.  remove it.
			//don't delete the current chapter!
			if (chapterName != storageName)
				removeChapter(i);
		}
		
		i++;
	}
}

function removeChapter(index)
{
	if (!useStorage || !persistStorage)
		return;
	
	var chapterName;
	if (typeof(index) === 'undefined') {
		chapterName = storageName;
		index = findIndex(chapterName);
	}
	else
		chapterName = jsStorage.getItem('_index' + index);
	//chapterName = chapterName || storageName;
	
	//remove pages
	for (var i = 1; jsStorage.getItem(chapterName + i) !== null; i++)
		jsStorage.removeItem(chapterName + i);
	
	//remove time
	jsStorage.removeItem(chapterName + "time");
	
	//remove folder name
	jsStorage.removeItem(chapterName + "folder");
	
	jsStorage.removeItem(chapterName + "index");
	jsStorage.removeItem("_index" + index);
	
	var i = parseInt(index) + 1;
	while (true)
	{
		//shift down indexes of all chapters stored after this one
		var shiftName = jsStorage.getItem("_index" + i);
		if (shiftName === null)
			break;
		
		jsStorage.setItem("_index" + (i - 1), shiftName);
		jsStorage.removeItem("_index" + i);
		
		i++;
	}
}

function getStoredImageSrc(page)
{
	if (!useStorage)
		return null;
	
	var val = jsStorage.getItem(storageName + page);
	if (val == "undefined")
	{
		jsStorage.removeItem(storageName + page);
		return null;
	}
	return expandUrl(val);
}

function setStoredImageSrc(page, src)
{
	if (!useStorage)
		return;
	
	jsStorage.setItem(storageName + page, shortenUrl(src));
}

function removeStoredImageSrc(page)
{
	if (!useStorage)
		return;
	
	jsStorage.removeItem(storageName + page);
}

function shortenUrl(url)
{
	var match = url.match(shortenRegex);
	if (!match)
		return url;
	
	var server = match[1];
	var folder = match[2];
	var file = match[3];
	var ext = match[4];
	
	switch (ext)
	{
		case "jpg":ext = "j";break;
		case "jpeg":ext = "e";break;
		case "png":ext = "p";break;
		case "gif":ext = "g";break;
		//O_o  Read down the column.  That was completely unintentional.
	}
	
	if (typeof(shortenFolder) == 'undefined')
	{
		shortenFolder = folder;
		jsStorage.setItem(storageName + "folder", folder);
	}
	
	url = server + ":" + file + ":" + ext;
	
	match = storageName.match(chapterRegex);
	if (match)
		url = url.replace(match[1] + "_", "@");
	
	return url;
}

function expandUrl(url)
{
	if (!url)
		return url;
	
	var match = url.match(expandRegex);
	if (!match)
		return url;
	
	var server = match[1];
	var file = match[2];
	var ext = match[3];
	
	switch (ext)
	{
		case "j":ext = "jpg";break;
		case "e":ext = "jpeg";break;
		case "p":ext = "png";break;
		case "g":ext = "gif";break;
	}
	
	if (typeof(shortenFolder) == 'undefined')
		shortenFolder = jsStorage.getItem(storageName + "folder");
	
	
	url = "http://img" + server + ".mangafox.com/store/manga/" + shortenFolder + 
		"/compressed/" + file + "." + ext;
	
	match = storageName.match(chapterRegex);
	if (match)
		url = url.replace("@", match[1] + "_");
	
	return url;
}

init();
}