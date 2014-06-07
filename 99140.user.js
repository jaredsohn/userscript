// ==UserScript==
// @name HabraDraft
// @namespace HabraDraft
// @author DileSoft
// @include http://habrahabr.ru/add/*
// ==/UserScript==

var myLocalStorage;
if (typeof unsafeWindow != 'undefined') {
	myLocalStorage = unsafeWindow.localStorage;
}
else {
	myLocalStorage = localStorage;
}

function getValue(key) {
	var value = myLocalStorage[key];
	return ( value && (value != 'undefined') ) ? value : '';
}
function setValue(key, value) {
	myLocalStorage[key] = value;
}

window.addEventListener('load', function()
	{
		if (document.referrer.match(/habrahabr\.ru\/add\//).length > 0)
		{
			if (document.getElementsByName('title')[0])
			{
				document.getElementsByName('title')[0].value = getValue('title');
			}
			if (document.getElementsByName('topic_question[1][title]')[0])
			{
				document.getElementsByName('topic_question[1][title]')[0].value = getValue('title');
			}
			if (document.getElementsByName('text')[0])
			{
				document.getElementsByName('text')[0].value = getValue('text');
			}
			if (document.getElementsByName('topic_question[1][answer][1]')[0])
			{
				document.getElementsByName('topic_question[1][answer][1]')[0].value = getValue('text');
			}
			if (document.getElementsByName('tags_string')[0])
			{
				document.getElementsByName('tags_string')[0].value = getValue('tags_string');
			}
			if (document.getElementsByName('blog_id')[0])
			{
				document.getElementsByName('blog_id')[0].selectedIndex = getValue('blog');
			}
		}
	}
, false);

window.addEventListener('unload', function()
	{
		if (document.getElementsByName('title')[0])
		{
			setValue('title',document.getElementsByName('title')[0].value);
		}
		if (document.getElementsByName('topic_question[1][title]')[0])
		{
			setValue('title',document.getElementsByName('topic_question[1][title]')[0].value);
		}
		if (document.getElementsByName('text')[0])
		{
			setValue('text', document.getElementsByName('text')[0].value);
		}
		if (document.getElementsByName('topic_question[1][answer][1]')[0])
		{
			setValue('text', document.getElementsByName('topic_question[1][answer][1]')[0].value);
		}
		if (document.getElementsByName('tags_string')[0])
		{
			setValue('tags_string', document.getElementsByName('tags_string')[0].value);
		}
		if (document.getElementsByName('blog_id')[0])
		{
			setValue('blog', document.getElementsByName('blog_id')[0].selectedIndex);
		}
	}
, false);