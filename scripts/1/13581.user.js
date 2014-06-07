// ==UserScript==
// @name           orkutSmily
// @namespace      http://userscripts.org/users/34766
// @description    Turns your bare smily to emoticons :) when you write scraps and/or reply to scraps. Supports all smilies listed in "scrap tips" section.
// @include        http://www.orkut.com/*
// ==/UserScript==

window.addEventListener('load', startScript, false);

function startScript()
{
	var container = document.getElementById('scrapInputContainer');
	var els = getElementsByClass('btn', container, 'a');
	var code = "var txt = document.getElementById('scrapText'); txt.value = txt.value.replace(/8\\)/g, '[8)]'); txt.value = txt.value.replace(/:\\(/g, '[:(]'); txt.value = txt.value.replace(/:x/g, '[:x]'); txt.value = txt.value.replace(/:\\)/g, '[:)]'); txt.value = txt.value.replace(/;\\)/g, '[;)]'); txt.value = txt.value.replace(/:D/g, '[:D]'); txt.value = txt.value.replace(/:o/g, '[:o]'); txt.value = txt.value.replace(/:P/g, '[:P]'); txt.value = txt.value.replace(/\\/\\)/g, '[/)]');";
	var tmp = code + els[0].getAttribute('onclick');
	els[0].setAttribute('onclick', tmp);
	
	for (var i = 1; i < 50; i++)
	{
		var container = document.getElementById('scrap_' + i);
		if (container == undefined)
		{
			break;
		}
		
		var els = getElementsByClass('btn', container, 'a');
		var code = "var txt = document.getElementById('scrapText_' + " + i + "); txt.value = txt.value.replace(/8\\)/g, '[8)]'); txt.value = txt.value.replace(/:\\(/g, '[:(]'); txt.value = txt.value.replace(/:x/g, '[:x]'); txt.value = txt.value.replace(/:\\)/g, '[:)]'); txt.value = txt.value.replace(/;\\)/g, '[;)]'); txt.value = txt.value.replace(/:D/g, '[:D]'); txt.value = txt.value.replace(/:o/g, '[:o]'); txt.value = txt.value.replace(/:P/g, '[:P]'); txt.value = txt.value.replace(/\\/\\)/g, '[/)]');";
		var tmp = code + els[0].getAttribute('onclick');
		els[0].setAttribute('onclick', tmp);
	}
}

function getElementsByClass(searchClass,node,tag)
{
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++)
	{
		if ( pattern.test(els[i].className) )
		{
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

