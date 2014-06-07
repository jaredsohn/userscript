// Swedvdr Search	1.0

// ==UserScript==
// @name          Swedvdr Search
// @namespace     http://determinist.org/greasemonkey/
// @description   Searches both regular torrents, archives and requests. 1.0

// @include       http://swedvdr.org/*
// @include       http://www.swedvdr.org/*

// ==/UserScript==

/*

Description

Changelog:

2006-12-11	1.0
	* Release
	
*/

/*
 BEGIN LICENSE BLOCK
Copyright (C) 2005 Arvid Jakobsson

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://www.gnu.org/licenses/gpl.html
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK
*/

function xpath(query, context, doc) {
	context = context ? context : document;
	doc = doc ? doc : document;

	return doc.evaluate(query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function foreachxp(xp, fc, context, doc) {
	var els = xpath(xp, context, doc);
	if (els) {
		for (var i = 0; el = els.snapshotItem(i); i++) {
			fc(el);
		}
	}
}

function xpathOne(query, context, doc) {
	return xpath(query, context, doc).snapshotItem(0);
}

function removeWithXP(query, context) {
	var els, el, i;
	
	els = xpath(query, context);
	for (i = 0; el = els.snapshotItem(i); i++)
		el.parentNode.removeChild(el);
}

function $(id) {
	return document.getElementById(id);
}

function txtNode (txt) {
	return document.createTextNode(txt);
}

function newEl(type) {
	return document.createElement(type);
}

function createEl(elObj, parent) {
	var el = document.createElement(elObj.n);
	if (elObj.a) {
		attributes = elObj.a;
		for (var key in attributes) {
			if (typeof(attributes[key]) == 'string') {
				if (key.charAt(0) == '@')
					el.setAttribute(key.substring(1), attributes[key]);
				else 
					el[key] = attributes[key];
			}
		}
	}
	if (elObj.c) {
		elObj.c.forEach(function (v, i, a) { createEl(v, el); });
	}
	if (parent)
		parent.appendChild(el);

	return el;
}

function getComputedStyleProp(elem, prop) {
	return document.defaultView.getComputedStyle(elem, null).getPropertyValue(prop);
}

function serializeForm(frm) {
	var paramArr = new Array();
	
	for (var i = 0; inp = frm.elements[i]; i++) {
		var name, val;
		if ((name = inp.getAttribute('name')) && (val = inp.value)) {
			var type = inp.getAttribute('type');
			
			if (type == 'checkbox') 
				val = (val == 'on' ? 1 : 0);

			paramArr.push(name + "=" + val);
		}
	}
	
	var str = paramArr.join('&');
	return str;
}

function deserializeForm(frm, str) {
	var str = str.split('&');
	GM_log(str);
	for (var i = 0; i < str.length; i++) {
		var set = str[i];
		set = set.split('=');
		GM_log(set);
		var inp = frm.elements.namedItem(set[0]);
		GM_log(inp);
		var type = inp.getAttribute('type');
		if (type == 'checkbox') 
			inp.val = (set[1] == '1' ? 'on' : 'off');		
		else
			inp.value = set[1];
	}
}

function checkbox(name, selected) {
	selected = (selected != null ? (selected ? 'true': 'false') : 'true');
	return {n: 'input', a: {type: 'checkbox', 'name': name, id: name, 'checked': selected }};
}

function label(lfor, text) {
	return {n: 'label', a: {'@for': lfor, textContent: text}};
}	

function addMenuLink(name, action, beforeName) {
	var navRow = xpathOne("//tr[td[@class='navigation']]");

	var newMenuCell = newEl('td');
	newMenuCell.setAttribute('class', 'navigation');
	newMenuCell.setAttribute('align', 'center');

	var newMenuCellLink = newEl('a');
	newMenuCellLink.textContent = name;
	newMenuCellLink.setAttribute('href', 'javascript:;');
	newMenuCellLink.addEventListener('click', action, true);

	newMenuCell.appendChild(newMenuCellLink);
	if (beforeName) {
		var insertBefore = xpathOne("./td[a[text()='" + beforeName + "']]", navRow);
		if (insertBefore) 		
			navRow.insertBefore(newMenuCell, insertBefore);
		else 
			GM_log('addMenuLink: couldnt find node of insertion');
	}
	else {
		GM_log('no index');
		navRow.appendChild(newMenuCell);
	}
}

function addSearchHook() {
	addMenuLink('Sök', showInterface, 'Forum');
}

function showInterface() {
	var body = xpathOne("/html/body/table[@class='mainouter']/tbody/tr[2]/td[@class='outer']");	

	//content
	body.innerHTML = ""; //clean canvas...
	body.setAttribute('id', 'maininner');	

	var areaFormInputs = [
		checkbox('c1'), label('c1', 'PAL'),
		checkbox('c2'), label('c2', 'CUSTOM SWESUB'),
		checkbox('c3'), label('c3', 'Endast med DTS-ljudspår'),
		checkbox('c4'), label('c4', 'PAL XXX'),
		checkbox('c6'), label('c6', 'TV'),
		checkbox('c7'), label('c7', 'MVDVDR'),
		checkbox('c5'), label('c5', 'Övrigt'),

		{
			n: 'select', 
			a: {'name': 'incldead'},
			c: [
				{n:'option', a: {value: '0', textContent: 'Aktiva'}},
				{n:'option', a: {value: '1', textContent: 'Inklusive döda'}},
				{n:'option', a: {value: '2', textContent: 'Endast döda'}}
			]
		},

		label('search', 'Sök: '),
		{n: 'input', a: {type: 'text', name: 'search'}},
		{n: 'input', a: {type: 'submit', id: 'searchButton', value: 'Ok!'}}
//		{n: 'input', a: {type: 'submit', id: 'testSerializer', value: 'serialize/deserialize!'}}
	];

	var typeFormInputs = [
		checkbox('browse'), label('browse', 'Nya torrents'),
		checkbox('archive'), label('archive', 'Arkiv'),
		checkbox('requests'), label('requests', 'Requests'),
	];

	searchPanel = createEl(
		{
			n: 'div', 
			a: {id: 'searchpanel'}, 
			c: [
				{
					n: 'div',
					c: [{n: 'form', a: {'@name': 'searchtype'}, c: typeFormInputs}]
				},
				{
					n: 'div',
					c: [{n: 'form', a: {'@name': 'searcharea', id: 'searcharea'}, c: areaFormInputs}]
				}
			]
		},
		body
	);

	//style
	GM_addStyle('div#searchpanel * { margin-right: 4px; }');
	GM_addStyle('div#searchpanel form { margin-bottom: 7px; }');

	//behaviour
	$('searcharea').addEventListener('submit', doSearch, true);
//	$('testSerializer').addEventListener('click', testSerializer, true);

}

function testSerializer(e) {
	e.stopPropagation();
	e.preventDefault();

	var frm = $('searcharea');
	var str = serializeForm(frm);
	GM_log('serializing ' + str);

	e.target.removeEventListener('click', testSerializer, true);

	e.target.addEventListener('click', function (event) {
		event.stopPropagation();
		event.preventDefault();
		GM_log('deserializing ' + str);
		deserializeForm(frm, str);	
		event.target.addEventListener('click', testSerializer, true);
		
	}, true);
}

function doSearch(event) {
	event.stopPropagation();
	event.preventDefault();

	var serializedForm = serializeForm($('searcharea'));
	if ($('browse').checked) {
		getBrowse(serializedForm);
	}
	if ($('archive').checked) {
		getArchive(serializedForm);
	}
	if ($('requests').checked) {
		var searchString = xpathOne("//form[@id='searcharea']/input[@name='search']").value;
		getRequests(searchString);
	}

	

}

function checkBrowseAndArchError(doc) {
	var errmsg = xpath("//table[@class='mainouter']/tbody/tr[2]/td[@class='outer']/h2[2]", doc, doc);
	if (errmsg.snapshotLength == 1) {
		return errmsg.snapshotItem(0);
	}
	else 
		return false;
}

function getBrowse(searchParams) {
	var searchurl = 'http://' + location.host + '/browse.php?' + searchParams;
	getResults('browseRes', searchurl, 'Nya torrents', checkBrowseAndArchError);
}

function getArchive(searchParams) {
	var searchurl = 'http://' + location.host + '/req.php?' + searchParams;
	getResults('archiveRes', searchurl, 'Arkiv', checkBrowseAndArchError);
}

function checkRequestsError(doc) {
	var errmsg = xpathOne("//table[@class='mainouter']/tbody/tr[2]/td[@class='outer']/b", doc, doc);
	if (errmsg && errmsg.textContent.match(/Din sökning på ".*?" gav inga resultat./)) {
		return errmsg;
	}
	else 
		return false;
}

function getRequests(searchParams) {
	var searchurl = 'http://' + location.host + '/requests.php?reqtxt=' + searchParams;
	getResults('requestRes', searchurl, 'Requests', checkRequestsError);
}

function getResults(resdivid, searchurl, name, checkError) {
//	GM_log('> getResults');
	var main = $('maininner');

	var resdiv = $(resdivid);
	if (resdiv) {
		resdiv.parentNode.removeChild(resdiv);
	}

	resdiv = createEl(
		{
			n: 'div', 
			a: {id:resdivid, '@class': 'resdiv'},
			c: [{n: 'h2', a: {textContent: name}}]
		}		
	, main);
	
//	GM_log('fetching ' + searchurl);

	GM_xmlhttpRequest({
		method: 'GET',
		url: searchurl,
		headers: {
		   'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		   'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
//			GM_log('getResults onload=' + responseDetails.status);
			if (responseDetails.status == 200) {
				var iframe = parseWithIFrame(responseDetails.responseText);
				var doc = iframe.contentDocument;

				var errmsg = checkError(doc);
				if (errmsg)
					resdiv.appendChild(errmsg)
				else {
					var resTableXPath = "//table[@class='mainouter']/tbody/tr[2]/td[@class='outer']/table[not(@class='main')]";
					var resTable = xpathOne(resTableXPath, doc, doc);

					resdiv.appendChild(resTable);
				}

				iframe.parentNode.removeChild(iframe);
				alignResDivs();
			}
		}
	});
}

function alignResDivs() {
	var resdivs = xpath("//div[@class='resdiv']/*[2]");
	var widest = 0;
	for (var i = 0; i < resdivs.snapshotLength; i++) {
		var resdiv = resdivs.snapshotItem(i);
		if (resdiv.nodeName != 'TABLE') continue;

		var width = getComputedStyleProp(resdiv, 'width');
//		GM_log("width" + i + ": " + width);
		width = width.match(/(\d+)px/);
		
		if (width && width[1]*1 > widest)
			widest = width[1]*1;
	}

	if (widest != 0) {
//		GM_log('setting all resdivs to width=' + widest);
		for (var i = 0; i < resdivs.snapshotLength; i++) {
			resdivs.snapshotItem(i).style.width = widest + 'px';
		}
	}
}
	

function parseWithIFrame(responseText) {
	var hiddenIFrame = document.createElement('iframe');
	hiddenIFrame.setAttribute('src', "about:blank");
	hiddenIFrame.style.display = 'none';
	document.body.appendChild(hiddenIFrame);
	
	responseText = responseText.replace(/<[\s]*\/?[\s]*html[\s]*>/g, ''); 
	hiddenIFrame.contentDocument.documentElement.innerHTML = responseText;
	return hiddenIFrame;
}

addSearchHook();
