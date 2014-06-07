//
// ==UserScript==
// @name          Dirty Share Buttons
// @author        crea7or
// @namespace     http://dirty.ru/
// @include       http://dirty.ru/comments/*
// @include       http://www.dirty.ru/comments/*
// @version        1.0.1
// ==/UserScript==

var divTags = document.querySelector('div.h-ads_comments_page');
if ( divTags )
{
	var divPost = document.querySelector('div.dt');
	var postText;
	if (typeof (divPost.innerText) != 'undefined')
	{
		postText = divPost.innerText;
	}
	else
	{
		postText = divPost.textContent;
	}
	var postTextLen = postText.length;
	if (postTextLen > 120)
	{
		postTextLen = 120;
	}
	postText = postText.slice(0, postTextLen);
	var dashPos = document.location.href.indexOf('#');
	var linkWithoutNew = document.location.href;
	if (dashPos > 0)
	{
		linkWithoutNew = linkWithoutNew.slice(0, dashPos);
	}
	linkWithoutNew = linkWithoutNew.replace("www.", "");

	var divMain = document.createElement('div');
	divMain.setAttribute('style', 'padding-top: 10px;');

	var divElem = document.createElement('div');
	divElem.setAttribute('class', 'addthis_toolbox addthis_default_style');
	divElem.setAttribute('addthis:url', linkWithoutNew);
	divElem.setAttribute('addthis:title', postText);
	var aElem = document.createElement('a');
	aElem.setAttribute('class', 'addthis_button_facebook_like');
	aElem.setAttribute('fb:like:layout', 'button_count');
	divElem.appendChild(aElem);
	aElem = document.createElement('a');
	aElem.setAttribute('class', 'addthis_button_tweet');
	divElem.appendChild(aElem);
	aElem = document.createElement('a');
	aElem.setAttribute('class', 'addthis_counter addthis_pill_style');
	divElem.appendChild(aElem);
	divMain.appendChild(divElem);
	var scriptElem = document.createElement('script');
	scriptElem.setAttribute('type', 'text/javascript');
	scriptElem.textContent = 'var addthis_config = {"data_track_clickback":true};';
	divMain.appendChild(scriptElem);
	scriptElem = document.createElement('script');
	scriptElem.setAttribute('type', 'text/javascript');
	scriptElem.setAttribute('src', 'http://s7.addthis.com/js/250/addthis_widget.js#username=dirty3');
	divMain.appendChild(scriptElem);

	divTags.appendChild(divMain);
}
