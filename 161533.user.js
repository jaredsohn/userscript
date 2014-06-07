// ==UserScript==
// @name           Hovering English Titles for MAL
// @version        2.16
// @description    Displays (non-romaji) English titles for hovering anime/manga info on myanimelist.net. This script downloads cached lists from dropbox.com and uses mal-api.com as backup. Will NOT work with other English scripts on user lists.
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
// @require        http://userscripts.org/scripts/source/161549.user.js
// @resource       ANIME_CACHE http://dl.dropbox.com/u/112209727/anime_en.txt
// @resource       MANGA_CACHE http://dl.dropbox.com/u/112209727/manga_en.txt
// @grant          GM_xmlhttpRequest
// @grant          GM_getResourceText
// ==/UserScript==

var titles = [];
var inquiryPrefix;
var timer;
var aInquiryPrefix;
var mInquiryPrefix;
var interval;
var id = 0;

if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function(s) {
    return this.slice(0, s.length) == s;
  };
}

addStyle();
addHover();
init();
storeCachedEnglish(GM_getResourceText('ANIME_CACHE'), GM_getResourceText('MANGA_CACHE'));

function init()
{
	titles = document.getElementsByClassName('hoverinfo');
	
	aInquiryPrefix = "http://mal-api.com/anime/";
	mInquiryPrefix = "http://mal-api.com/manga/";
	timer = '';
	
	for (var i = 0; i < titles.length; i++)
	{
		titles[i].addEventListener('DOMNodeInserted', changeHandler, false);
	}
}

function handleChange(node)
{
		var hovertitle;
		if (node.nodeType == 3)
		{
			hovertitle = node.parentNode.getElementsByClassName('hovertitle')[0];
			
			var hoverinfoNode = getHoverinfoNode(hovertitle, 5);
			if (hoverinfoNode != null)
			{
				var english = hoverinfoNode.getAttribute('en');
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
				var english = hoverinfoNode.getAttribute('en');
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
				var english = hoverinfoNode.getAttribute('en');
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
			
		var english = hoverinfoNode.getAttribute('en');
		if (english == null)
		{
			if (hoverinfoNode.getAttribute('missing') != 'en')
			{
				hoverinfoNode.setAttribute('missing', 'en');
			}
			
			return;
		}
		
		var m = node.innerHTML.trim().match(/\(\d{4}\)$/);
		if (m != null)
		{	
			var replacement = document.createElement('font');
			replacement.setAttribute('style', 'background-color: #2E51A2');
			$(replacement).text(english + ' ' + m[0]);

			if (replacement.innerHTML.trim() != node.innerHTML.trim())
			{
				node.innerHTML = '';
				node.appendChild(replacement);
			}
		}
		else
		{
			var replacement = document.createElement('font');
			replacement.setAttribute('style', 'background-color: #2E51A2');
			$(replacement).text(english);

			if (replacement.innerHTML.trim() != node.innerHTML.trim())
			{
				node.innerHTML = '';
				node.appendChild(replacement);
			}
		}
	}
}

function changeHandler(event)
{
    if (typeof timer == 'number')
    {
        clearTimeout(timer);
        timer = '';
    }
    timer = setTimeout(function() { 
			handleChange(event.target);}, 20);
}

function sendRequest(url, titleIndex) 
{
	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		onload: function(response) {
			var t = response.responseText.trim();
			if (!t || t.startsWith('<html>'))
			{
				//mal-api.com server error
				storeEnglish('', titleIndex);
				return;
			}
			
			var jsonObj = JSON && JSON.parse(response.responseText) || $.parseJSON(response.responseText);
			if 
			(
				typeof jsonObj.other_titles == 'undefined' 
				|| 
				typeof jsonObj.other_titles.english == 'undefined'
			)
			{
				storeEnglish('', titleIndex);
			}
			else
			{
				var english = jsonObj.other_titles.english.join(', ');
				storeEnglish(english, titleIndex);
			}
		}
	});
}

function storeCachedEnglish(aText, mText)
{
	var aCachedTitles = parseCache(aText)
	var mCachedTitles = parseCache(mText)
	
	var batchSize = 10;
	var i = 0;
	function batchProcess() 
	{
		var count = batchSize;
		while (count-- && i < titles.length) 
		{
			var inquiryType = titles[i].getAttribute('rel').charAt(0);
			var inquiryId = titles[i].getAttribute('rel').substr(1);
			english = (inquiryType == 'a')?aCachedTitles[inquiryId]:mCachedTitles[inquiryId];
			
			if (english)
			{
				storeEnglish(english, i);
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
		if (i < titles.length) 
		{
			setTimeout(batchProcess, 10);
		}
	}
	
	batchProcess();
	
}

function storeEnglish(english, titleIndex)
{
	if (typeof english != 'undefined' && String(english).trim() != '')
	{
		if (typeof titleIndex == 'number')
		{
			titles[titleIndex].setAttribute('en', String(english).split('; ')[0].trim());
			if (titles[titleIndex].getAttribute('missing') == 'en')
			{
				titles[titleIndex].setAttribute('missing', 'none');
				replaceText(titles[titleIndex].getElementsByClassName('hovertitle')[0]);
			}	
		}
		else if (isElement(titleIndex))
		{
			titleIndex.setAttribute('en', String(english).split('; ')[0].trim());
			if (titleIndex.getAttribute('missing') == 'en')
			{
				titleIndex.setAttribute('missing', 'none');
				replaceText(titleIndex.getElementsByClassName('hovertitle')[0]);
			}	
		}
	}
}

function getHoverinfoNode(node, maxLevel)
{
	if (null != node && maxLevel > 0)
	{
		if (node.getAttribute('class') != 'hoverinfo')
		{
			return getHoverinfoNode(node.parentNode, maxLevel - 1);
		}
		
		return node;
	}
	
	return null;
}

function addHover()
{
	if (showInfo) {
		$('a[href*="myanimelist.net/anime/"], a[href^="/anime/"], a[href^="anime/"], a[href*="anime.php?id="]').addClass('hoverinfo_trigger').removeAttr('title').each(function() {
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
				var outerDiv = document.createElement('div');
				outerDiv.setAttribute('id', divid)
				outerDiv.setAttribute('style', 'display:inline-block;');
				var innerDiv = document.createElement('div');
				innerDiv.setAttribute('id', divinfo)
				innerDiv.setAttribute('class', 'hoverinfo')
				innerDiv.setAttribute('rel', divrel)
				outerDiv.appendChild(innerDiv);
				$(this).attr('rel',arel).attr("id",aid).before(outerDiv);
			}
		});

		$('a[href*="myanimelist.net/manga/"], a[href^="/manga/"], a[href^="manga/"], a[href*="manga.php?id="]').addClass('hoverinfo_trigger').removeAttr('title').each(function() {
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
				
				var outerDiv = document.createElement('div');
				outerDiv.setAttribute('id', divid)
				outerDiv.setAttribute('style', 'display:inline-block;');
				var innerDiv = document.createElement('div');
				innerDiv.setAttribute('id', divinfo)
				innerDiv.setAttribute('class', 'hoverinfo')
				innerDiv.setAttribute('rel', divrel)
				outerDiv.appendChild(innerDiv);
				
				$(this).attr('rel',arel).attr("id",aid).before(outerDiv);
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

function parseCache(cacheText) {
	if (cacheText && cacheText.trim && !cacheText.trim().startsWith('<html>')) {
		return cacheText.split("\n");
	}
	//dropbox error
	return [];
}