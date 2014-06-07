// ==UserScript==
// @name           mitx-wiki-goodies
// @namespace      thomasloch
// @version        0.14
// @description    Add some extra features to the wiki
// @include        https://6002x.mitx.mit.edu/wiki/*
// ==/UserScript==

/*

MITx Wiki Goodies
-----------------

Add some extra features to the wiki.

View page:
- table of contents with linked anchors to the page
- better style sheet for source code blocks
- better style sheet for headings
- better style sheet for wiki tables

Edit page:
- show/hide cheatsheet buttons so the entry field can be enlarged to cover
  the entire page width
- monospaced font for the entry box makes working with tables much easier

History page:
- put history diffs into scrolling boxes to make the history pages
  easier to read
- colored diffs

Note: During development, the script appears to have occasionally prevented
formulas on wiki pages from rendering properly. The problem seems to be fixed
now, but the exact cause has not been established. If you are experiencing
any issues in that direction (that disappear when you disable the script
temporarily) please file a bug report!

FIXME: Clicking on an anchor seems to sometimes do funny things to the section
header element that makes the edit/history buttons disappear. They can be
recovered by removing the anchor from the URL and reloading the page.

*/

unsafeWindow.console.log('Wiki initializing... ');

function startswith(haystack, needle) {
	return( haystack.substr(0, needle.length) == needle )
}

// This is a crude workaround to fix suspected undefined behaviour that may
// interfere with the formula rendering script
window.setTimeout(function() {



if(startswith(document.location.pathname, '/wiki/view')) {
	unsafeWindow.console.log('Wiki loading (view mode)... ');

	// inject some extra CSS classes
	var head = document.getElementsByTagName('head')[0];
	var style = document.createElement('style');
	head.appendChild(style);

	// heading colors (border, background):
	// rgb(237, 223, 170) rgb(246, 239, 212)
	// rgb(255, 200, 180)
	var color_border = 'rgb(237, 223, 170)';
	var color_background = 'rgb(246, 239, 212)';
	var color_sourcecode = 'rgb(180, 200, 255)';

	style.innerHTML =
		'div.tocbar {padding-left: 10px;} ' +
		'a.toclink_h1 {display: block; font-weight: bold; text-decoration: underline; ' +
			'font-size: 100%;  padding-top: 10px;} ' + 
		'a.toclink_h2 {display: block; font-weight: bold; text-decoration: none; ' + 
			'font-size: 80%; padding-top: 10px; padding-left: 25px;} ' +
		'p > code {border: 1px dashed ' + color_sourcecode + ';} ' +
		'pre {border: 2px dashed ' + color_sourcecode + '; ' +
			'border-left: 5px solid ' + color_sourcecode + '; ' + 
			'padding: 5px; padding-left: 15px;} ' +

		'section.wiki-body table {border-spacing: 0.25em; border: 2px solid ' + color_border + ';} ' +
		'section.wiki-body table th {padding: 0.45em; border: 2px solid ' + color_border + '; ' +
			'background-color: ' + color_background + '; ' +
			'text-decoration: underline; font-weight: bold;} ' +
		'section.wiki-body table td {padding: 0.25em; border: 1px solid ' + color_border + ';} ' +

		'section.wiki-body h1 {text-decoration: underline;} ' +
		'section.wiki-body div#wiki_article h1 {border-top: 2px solid ' + color_border + ';} ' +
		'section.wiki-body div#wiki_article h2 {font-style: italic; margin-bottom: 0.25em;} ' +
/**/
	'';


	// create toc area and add it to index bar
	var indexbar = document.getElementById('wiki_panel');

	var toc_heading = document.createElement("h2");
	toc_heading.setAttribute('style', 'border-bottom-style: none; box-shadow: none;');
	toc_heading.innerHTML = 'Table of Contents';
	indexbar.appendChild(toc_heading);

	var toc_area = document.createElement("div");
	toc_area.setAttribute('class', 'tocbar');
	indexbar.appendChild(toc_area);


	var headings = document.getElementById('wiki_article').childNodes;
	for(var h, j = 0; (h = headings[j]) != null; j++) {
		if( (h.nodeName != 'H1') && (h.nodeName != 'H2') ) continue;

		var level = h.nodeName.toLowerCase();
		//unsafeWindow.console.log(level + ': ' + h.innerHTML);

		// create TOC entry
		var toc_entry = document.createElement("a");
		toc_entry.setAttribute('href', '#tocanchor_' + j);
		toc_entry.setAttribute('class', 'toclink_' + level);
		toc_entry.innerHTML = h.innerHTML;
		toc_area.appendChild(toc_entry);

		// create anchor
		var toc_anchor = document.createElement("a");
		toc_anchor.setAttribute('name', 'tocanchor_' + j);
		h.appendChild(toc_anchor);

	}
/**/

} else if(startswith(document.location.pathname, '/wiki/edit/')) {
	unsafeWindow.console.log('Wiki loading (edit mode)... ');

	// inject some extra CSS classes
	var head = document.getElementsByTagName('head')[0];
	var style = document.createElement('style');
	head.appendChild(style);

	style.innerHTML =
		'textarea#id_contents {font-family: monospace; font-size: 80%;}' +
		'div#wiki_edit_instructions {width: 30%; padding: 3px;' + 
			'background-color: white; border: 1px dashed rgb(180, 200, 255);}' +
	'';

	var cheatsheet = document.getElementById('wiki_edit_instructions');

	var toggle_cheatsheet = document.createElement("a");
	toggle_cheatsheet.setAttribute('href', '#');
	toggle_cheatsheet.setAttribute('id', 'toggle_cheatsheet');
	toggle_cheatsheet.innerHTML = '(hide cheatsheet)';
	toggle_cheatsheet.onclick = function() {
		var win = document.getElementById('wiki_edit_instructions');
		var tcs = document.getElementById('toggle_cheatsheet');
		if(win.style.display == 'none') {
			win.style.display = 'block';
			tcs.innerHTML = '(hide cheatsheet)';
		} else {
			win.style.display = 'none';
			tcs.innerHTML = '(show cheatsheet)';
		}
	};
	cheatsheet.parentNode.insertBefore(toggle_cheatsheet, cheatsheet);

} else if(startswith(document.location.pathname, '/wiki/history/')) {
	unsafeWindow.console.log('Wiki loading (history mode)... ');

	// inject some extra CSS classes
	var head = document.getElementsByTagName('head')[0];
	var style = document.createElement('style');
	head.appendChild(style);

	style.innerHTML =
		'div.scrollingbox {width: 100%; height: 100px; ' +
			'overflow: auto; padding:4px; border: 1px solid black;}' +
		'div.diff_added     {background-color: rgb(220, 255, 220);}' +
		'div.diff_removed   {background-color: rgb(255, 220, 220);}' +
		'div.diff_reference {background-color: rgb(230, 230, 230); color: rgb(140, 140, 140);}' +
	'';

	var diff_indicator_offs = "\n          ".length;

	// add scrolling boxes to all the diffs
	var diffs = document.getElementsByTagName('td');
	for(var d, j = 0; (d = diffs[j]) != null; j++) {
		if(d.className != 'diff') continue;

		var scrollbox = document.createElement("div");
		scrollbox.setAttribute('class', 'scrollingbox');

		var difflines = d.childNodes;
		var diffentries = Array();
		var entry = Array();
		for(var h, k = 0; (h = difflines[k]) != null; k++) {
			if(h.nodeName == 'BR') {
				diffentries.push(entry);
				entry = Array();
			} else {
				entry.push(h);
			}
		}
		if(entry.length != 0) diffentries.push(entry);

		for(var h, k = 0; (h = diffentries[k]) != null; k++) {
			entry = document.createElement("div");
			for(var x, l = 0; (x = h[l]) != null; l++) {
				entry.appendChild(x);
			}

			var ind = entry.childNodes[0].data.substr(diff_indicator_offs, 1);
			if(ind == '+') {
				entry.setAttribute('class', 'diff_added');
			} else if(ind == '-') {
				entry.setAttribute('class', 'diff_removed');
			} else {
				entry.setAttribute('class', 'diff_reference');
			}

			scrollbox.appendChild(entry);
		}

//		scrollbox.innerHTML = d.innerHTML;
		d.innerHTML = '';
		d.appendChild(scrollbox);

		//break;
	}
}


}, 500); // setTimeout();


