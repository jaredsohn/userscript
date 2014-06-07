// ==UserScript==
// @name           Neopets - Sort Caption Competition entries
// @description    Sorts Caption Competition entries by number of votes.
// @include        http://www.neopets.com/*
// @match          http://www.neopets.com/*
// ==/UserScript==

var e = document.createElement('script');
e.type = "text/javascript";
e.textContent = ''+
'/* This part is only needed because the first caption is not in a <p>block. */'+
'try {'+
'	var firstCaption = $(\'td.content center + b\')[0];'+
''+
'	if (typeof firstCaption != "undefined") {'+
'		var content = $(\'td.content\')[0];'+
'		var regexp = new RegExp(\'(\' + firstCaption.outerHTML + \'[\\\\s\\\\S]*?)<p\', \'mi\');'+
''+
'		if (firstCaption = content.innerHTML.match(regexp)[1]) {'+
'			/* Remove the inline text */'+
'			content.innerHTML = content.innerHTML.replace(firstCaption, \'\');'+
''+
'			/* And put everything back as a <p> */'+
'			var p = document.createElement(\'p\');'+
'			p.innerHTML = firstCaption;'+
'			content.appendChild(p);'+
'		}'+
'	}'+
'} catch (e) {'+
'  console.log(e.name + \': \' + e.message);'+
'}'+
''+
'/* Make sure each <p> selected is one that contains a caption. */'+
'entryFilter = function () {'+
'	if (this.innerText.match(/\\d votes so far/)) {'+
'		return true;'+
'	}'+
'	return false;'+
'};'+
''+
'var entries = $(\'td.content p\').filter(entryFilter);'+
''+
'entries.sort(function (a, b) {'+
'	var r = +0;'+
'	$.each([a, b], function (i, e) {'+
'		/* Match is guaranteed by the filter, so get the number of votes and pass it to the sort. */'+
'		e = $(e).text().match(/(\\d+) votes so far/)[1];'+
''+
'		/* Magic. */'+
'		r += (i) ? ~~e : ~~-e;'+
'	});'+
'	return r;'+
'});'+
''+
'/* Remove all captions from the page. */'+
'$(\'td.content p\').filter(entryFilter).each(function () {'+
'	$(this).remove();'+
'});'+
''+
'/* Add them back from the sorted list. */'+
'$.each(entries, function (i, e) {'+
'	$(\'td.content\').append(e);'+
'});'+
'';
document.body.appendChild(e);