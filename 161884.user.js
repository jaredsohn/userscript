// ==UserScript==
// @name           Japanese Links for MAL
// @namespace      http://userscripts.org/users/92143
// @version        3.1
// @description    Displays Japanese for anime/manga info links on myanimelist.net. Hovering on a link will reveal original content, along with related anime/manga info. This script downloads cached lists from dropbox.com. 
// @match          http://myanimelist.net/*.php*
// @match          http://myanimelist.net/profile/*
// @match          http://myanimelist.net/animelist/*
// @match          http://myanimelist.net/mangalist/*
// @match          http://myanimelist.net/anime/*
// @match          http://myanimelist.net/manga/*
// @match          http://myanimelist.net/forum/*
// @match          http://myanimelist.net/people/*
// @match          http://myanimelist.net/character/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require        https://gist.github.com/raw/53eefc586bbbf5ab167f/hover.v5.js
// @require        https://gist.github.com/raw/5512e8e8f3db6712ee64/jString.js
// @require        https://gist.github.com/raw/de762f2331c799598bf8/jListener_with_currentTarget.js
// @require        https://gist.github.com/raw/e8741ba668bdbb193602/mal_api.js
// @resource       ANIME_CACHE http://dl.dropbox.com/u/112209727/anime_ja.txt
// @resource       MANGA_CACHE http://dl.dropbox.com/u/112209727/manga_ja.txt
// @grant          GM_xmlhttpRequest
// @grant          GM_getResourceText
// ==/UserScript==

var titles;
var inquiryPrefix;
var aInquiryPrefix;
var mInquiryPrefix;
var interval;
var id;
var timer;
var aCachedTitles;
var mCachedTitles;
var titlesStartIndex;
var titlesEndIndex;

init();
addStyle();
addHover(document.body);
storeCachedJapanese(aCachedTitles, mCachedTitles, 0, titles.length);
setTimeout(function() {addUnpaginationListener();}, 2000);

function init()
{	
	titles = [];
	id = 0;
	timer = '';
	
	aInquiryPrefix = "http://myanimelist.net/anime/";
	mInquiryPrefix = "http://myanimelist.net/manga/";
	
	aCachedTitles = parseCache(GM_getResourceText('ANIME_CACHE'));
	mCachedTitles = parseCache(GM_getResourceText('MANGA_CACHE'));
	titlesStartIndex = 0;
	titlesEndIndex = 0;
}

function handleChange(event)
{
	var node = event.target;
	if (node.nodeType == 3)
	{
		hovertitle = node.parentNode.getElementsByClassName('hovertitle')[0];
		
		var hoverinfoNode = getHoverinfoNode(hovertitle, 5);
		if (hoverinfoNode != null)
		{
			var japanese = hoverinfoNode.getAttribute('original');
		}
		
		if (hovertitle != null)
		{
			replaceText(hovertitle);
		}
		return;
	}
	else if (node.getAttribute('class') == 'hoverinfo')
	{
		hovertitle = node.getElementsByClassName('hovertitle')[0];
		
		var hoverinfoNode = getHoverinfoNode(hovertitle, 5);
		if (hoverinfoNode != null)
		{
			var japanese = hoverinfoNode.getAttribute('original');
		}				
		
		if (hovertitle != null)
		{
			replaceText(hovertitle);
		}
		
		return;
	}
	else
	{
		hovertitle = node.parentNode.getElementsByClassName('hovertitle')[0];
		
		var hoverinfoNode = getHoverinfoNode(hovertitle, 5);
		if (hoverinfoNode != null)
		{
			var japanese = hoverinfoNode.getAttribute('original');
		}
		
		if (hovertitle != null)
		{
			replaceText(hovertitle);
		}
	}
}

function replaceText(node)
{
	if (node == null)
	{
		return;
	}
	
	if (node.getAttribute('class') == 'hovertitle')
	{
		var hoverinfoNode = getHoverinfoNode(node, 5);
		if (hoverinfoNode == null)
		{
			return;
		}
		
		var originalText = hoverinfoNode.getAttribute('original');
		if (originalText != null)
		{
			var replacement = document.createElement('font');
			replacement.setAttribute('style', 'background-color: #2E51A2');
			$(replacement).text(originalText);
			
			if (replacement.innerHTML.trim() != node.innerHTML.trim())
			{
				node.innerHTML = '';
				node.appendChild(replacement);
			}
		}
	}
}

function sendRequest(url, titleIndex)
{
	MalApi.seriesByUrl(url, function(data) {
		if(data && data['other_titles'] && data['other_titles']['japanese']) {
			storeJapanese(data['other_titles']['japanese'], titleIndex);
		}
		else {
			storeJapanese('', titleIndex);
		}
	});
}

function storeCachedJapanese(aCachedTitles, mCachedTitles, titlesStartIndex, titlesEndIndex) {
	var batchSize = 10;
	var i = titlesStartIndex;
	function batchProcess() 
	{
		var count = batchSize;
		while (count-- && i < titlesEndIndex) 
		{
			var inquiryType = titles[i].getAttribute('rel').charAt(0);
			var inquiryId = titles[i].getAttribute('rel').substr(1);
			japanese = (inquiryType == 'a')?aCachedTitles[inquiryId]:mCachedTitles[inquiryId];
			
			if (japanese)
			{
				storeJapanese(japanese, i);
			}
			//cache miss
			else
			{
				inquiryPrefix = (inquiryType == 'a') ? aInquiryPrefix : mInquiryPrefix;
				var inquiry = inquiryPrefix + inquiryId;
				sendRequest(inquiry, i);
			}
			
			i++;
		}
		if (i < titlesEndIndex) 
		{
			setTimeout(batchProcess, 10);
		}
	}
	
	batchProcess();
	
}

function storeJapanese(japanese, titleIndex)
{
	if (typeof japanese != 'undefined' && String(japanese).trim() != '')
	{
		var hoverinfoTriggerNode;
		hoverinfoTriggerNode = titles[titleIndex].parentNode.getElementsByClassName('hoverinfo_trigger')[0];
		if (null == hoverinfoTriggerNode)
		{
			hoverinfoTriggerNode = nextElementSibling(titles[titleIndex].parentNode);
		}
		
		if (hoverinfoTriggerNode != null)
		{ 
			hoverinfoTriggerClass = hoverinfoTriggerNode.getAttribute('class')
			if (hoverinfoTriggerClass != null && hoverinfoTriggerClass.contains('hoverinfo_trigger'))
			{
				if (hoverinfoTriggerNode.getAttribute('original') != null)
				{
					hoverinfoTriggerNode.innerHTML = hoverinfoTriggerNode.innerHTML.replace(titles[titleIndex].getAttribute('original'), String(japanese).trim());
				}
				else
				{
					hoverinfoTriggerNode.innerHTML = String(japanese).trim();
				}
			}
		}
	}
}

function getHoverinfoNode(node, maxLevel)
{
	if (node && maxLevel > 0)
	{
		if (node.getAttribute('class') != 'hoverinfo')
		{
			return getHoverinfoNode(node.parentNode, maxLevel - 1);
		}
		
		return node;
	}
	
	return null;
}

function addHover(range)
{
	if (showInfo) {
		$(range).find('a[href*="myanimelist.net/anime/"], a[href^="/anime/"], a[href^="anime/"]' + 
		', a[href*="myanimelist.net/anime.php?id="], a[href^="/anime.php?id="], a[href^="anime.php?id="]')
		.addClass('hoverinfo_trigger').removeAttr('title').each(function() {
			var re = /anime(\/|\.php\?id\=)(\d+)/;
			var href= $(this).attr('href');
			var m = re.exec(href);
			var animeId;
			if(m && m[2]) {
				animeId = parseInt(m[2]);
				var divrel=  "a"+animeId;
				var divinfo= "a"+"info"+id;
				var divid=   "a"+"area"+(id++);
				var arel=    "#"+divinfo;
				var aid=     "#"+divid;
				
				//do not show popup for subsections of series info page (e.g. Details, Reviews, etc)
				if (
					location.href.contains('/' + animeId) 
					|| 
					location.href.contains('?id=' + animeId)
				)
				{
					$(this).removeClass('hoverinfo_trigger');
					return;
				}
				
				var originalText;
				var textNodesCount;
				var textNodes = $(this).find(':not(:has(*))');
				var textsNodeCount = $(this).find(':not(:has(*))').length;
				if (textsNodeCount == 0)
				{
					originalText = $(this).text();
				}
				else if (textsNodeCount == 1)
				{
					originalText = textNodes[0].textContent;
				}
				//unlikely; may not be needed
				else
				{
					originalText = textNodes[0].textContent;
				}
				if (originalText != '')
				{
					var outerDiv = document.createElement('div');
					outerDiv.setAttribute('id', divid);
					outerDiv.setAttribute('style', 'display:inline-block;');
					var innerDiv = document.createElement('div');
					innerDiv.setAttribute('id', divinfo);
					innerDiv.setAttribute('class', 'hoverinfo');
					innerDiv.setAttribute('rel', divrel);
					innerDiv.setAttribute('original', originalText);
					outerDiv.appendChild(innerDiv);
					$(this).attr('rel',arel).attr("id",aid).before(outerDiv);
				}
			}
		});

		$(range).find('a[href*="myanimelist.net/manga/"], a[href^="/manga/"], a[href^="manga/"]' + 
		', a[href*="myanimelist.net/manga.php?id="], a[href^="/manga.php?id="], a[href^="manga.php?id="]')
		.addClass('hoverinfo_trigger').removeAttr('title').each(function() {
			var re = /manga(\/|\.php\?id\=)(\d+)/;
			var href= $(this).attr('href');
			var m = re.exec(href);
			var mangaId;
			if(m && m[2]) {
				mangaId = parseInt(m[2]);
				var divrel=  "m"+mangaId;
				var divinfo= "m"+"info"+id;
				var divid=   "m"+"area"+(id++);
				var arel=    "#"+divinfo;
				var aid=     "#"+divid;
				
				//do not show popup for subsections of series info page (e.g. Details, Reviews, etc)
				if (
					location.href.contains('/' + mangaId) 
					|| 
					location.href.contains('?id=' + mangaId)
				)
				{
					$(this).removeClass('hoverinfo_trigger');
					return;
				}
				
				var originalText;
				var textNodesCount;
				var textNodes = $(this).find(':not(:has(*))');
				var textsNodeCount = $(this).find(':not(:has(*))').length;
				if (textsNodeCount == 0)
				{
					originalText = $(this).text();
				}
				else if (textsNodeCount == 1)
				{
					originalText = textNodes[0].textContent;
				}
				//unlikely; may not be needed
				else
				{
					originalText = textNodes[0].textContent;
				}
				if (originalText != '')
				{
					var outerDiv = document.createElement('div');
					outerDiv.setAttribute('id', divid);
					outerDiv.setAttribute('style', 'display:inline-block;');
					var innerDiv = document.createElement('div');
					innerDiv.setAttribute('id', divinfo);
					innerDiv.setAttribute('class', 'hoverinfo');
					innerDiv.setAttribute('rel', divrel);
					innerDiv.setAttribute('original', originalText);
					outerDiv.appendChild(innerDiv);
					$(this).attr('rel',arel).attr("id",aid).before(outerDiv);
				}
			}
		});	
	}
	
	$('a[class*="hoverinfo_trigger"]').hoverIntent({
		sensitivity: 1, // number = sensitivity threshold (must be 1 or higher)
	interval: 200, // number = milliseconds for onMouseOver polling interval
	over: showInfo, // function = onMouseOver callback (required)
	timeout: 300, // number = milliseconds delay before onMouseOut
	out: hideInfo // function = onMouseOut callback (required)
	});
	
	titlesStartIndex = titles.length;
	titles.push.apply(titles, range.getElementsByClassName('hoverinfo'));
	titlesEndIndex = titles.length;
	for (var i = titlesStartIndex; i < titlesEndIndex; i++)
	{
		jAddEventListener(titles[i], 'DOMNodeInserted', handleChange, 20);
	}
}

function isElement(o) {
	try {
		//for Firefox, Opera and Chrome
		return o instanceof HTMLElement;
	}
	catch(e){
		//for IE7
		return (typeof o==="object") &&
		(o.nodeType===1) && 
		(typeof o.style === "object") &&
		(typeof o.ownerDocument ==="object");
	}
}

function addStyle() 
{
	addCss('.dark_text, .dark_text:hover,.dark_text:visited {color: #444444; font-weight: bold; }');
	addCss('.hoverinfo {display: none; position: absolute; background-image:url(http://cdn.myanimelist.net/images/getinfo_topleft.png); background-repeat:no-repeat; width: 392px; height: 279px; text-align: left; font-size: 11px; color: #000000; z-index: 100; }');
	addCss('.hovertitle,  .hovertitle a, .hovertitle a:visited, .hovertitle a:hover, .hovertitle a:active {color: #fff !important; font-size: 12px; font-weight: bold; }');
	addCss('.hoverinfo_ie6 {display: none; position: absolute; background-image:url(http://cdn.myanimelist.net/images/getinfo_topleft.gif); background-repeat:no-repeat; width: 392px; height: 279px; text-align: left; font-size: 11px; color: #000000; z-index: 100; }');
}

function addCss(cssString) { 
	var head = document.getElementsByTagName('head')[0];
	if (head == null)
	{
		return;
	}
	var newCss = document.createElement('style'); 
	newCss.type = "text/css"; 
	newCss.innerHTML = cssString; 
	head.appendChild(newCss); 
}

function nextElementSibling(e) {
	do { 
		e = e.nextSibling;
	} 
	while(e && e.nodeType !== 1);
		return e;
}

function previousElementSibling(e) {
	do { 
		e = e.previousSibling;
	} 
	while(e && e.nodeType !== 1);
		return e;
}

function addUnpaginationListener() {
	var contentElement = document.getElementById('content');
	if (contentElement) {
		jAddEventListener(contentElement, 'DOMNodeInserted', unpaginationHandler);
	}
}

function containsElementWithTag(elements, tagName) {
	if (typeof elements.length !== 'undefined' && typeof tagName === 'string') {
		for (var i = 0; i < elements.length; i++) {
			if (elements[i].tagName.toLowerCase() == tagName.toLowerCase()) {
				return true;
			}
		}	
	}
	
	return false;
}

function unpaginationHandler(event) {
	if (
		typeof event.target.tagName !== 'undefined' && 
		event.target.tagName.toLowerCase() == 'table'
	) {
		var firstElement = event.target.getElementsByTagName('td')[0];
		if (typeof firstElement !== 'undefined') {
			addHover(firstElement.parentNode.parentNode);
			unpaginationLoop(titlesStartIndex, titlesEndIndex);
		}
	}
}

function unpaginationLoop(titlesStartIndex, titlesEndIndex) {
	if (mCachedTitles != '') {
		storeCachedJapanese(aCachedTitles, mCachedTitles, titlesStartIndex, titlesEndIndex);
	}
	else {
		setTimeout(
			function() { 
				unpaginationLoop(titlesStartIndex, titlesEndIndex);
			}, 
			2000
		);
	}
}

function parseCache(cacheText) {
	if (cacheText && cacheText.trim && !cacheText.trim().startsWith('<html>')) {
		return cacheText.split("\n");
	}
	//dropbox error
	return [];
}
