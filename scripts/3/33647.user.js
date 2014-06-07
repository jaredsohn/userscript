// ==UserScript==
// @name           FEMA to Commons
// @namespace      www.prism.gatech.edu/~mflaschen3/
// @description    Assists in transfering PD FEMA images to Wikimedia Commons by creating a link with pre-filled paramaters
// @include        http://www.photolibrary.fema.gov/photolibrary/*
// @include        http://www.fema.gov/photolibrary/*
// ==/UserScript==

/*  Copyright (C) 2008 Matthew Flaschen <matthew DOT flaschen AT gatech DOT edu>

 This program is free software; you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation; either version 2 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License along
 with this program; if not, write to the Free Software Foundation, Inc.,
 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

function trim(str)
{
	return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function pad(str, n) {
	str = String(str);
	while (str.length < n) {
		str = '0' + str;
	}

	return str;
}

function copyToCommonsURL()
{
	var wpDestFile = document.evaluate("concat(//div[@id='column-d']/h1, '.jpg')", document, null, XPathResult.STRING_TYPE, null).stringValue;

	var photodetail = document.getElementById("photodetail");
	var photoinfo2 = photodetail.getElementsByTagName("div")[4];

	var desc = trim(photodetail.getElementsByTagName("div")[3].firstChild.nodeValue);

	var date = new Date(document.getElementById("photodetail").getElementsByTagName("div")[4].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[0].firstChild.nodeValue);

	var month = pad(date.getMonth() + 1, 2);
	var day = pad(date.getDate(), 2);

	var wpUploadDescription = "{{Information\n" +
		"|Description=" + desc.substring(0, desc.lastIndexOf(".") + 1) + "\n" +
		"|Source=" + "[" + window.location.href + " FEMA Photo Library]\n" +
		"|Date=" + date.getFullYear() + "-" + month + "-" + day + "\n" +
		"|Author=" + trim(desc.substring(desc.lastIndexOf(".") + 1)) + "\n" +
		"|Permission={{PD-USGov-FEMA}}\n" +
		"}}";

	var url = "http://commons.wikimedia.org/wiki/Special:Upload?wpDestFile=" + encodeURIComponent(wpDestFile) + "&wpUploadDescription=" + encodeURIComponent(wpUploadDescription);

	return url;
}

var link = document.createElement("a");
link.appendChild(document.createTextNode("» Wikimedia Commons Helper"));
link.setAttribute("href", copyToCommonsURL());

var innerTD = document.evaluate("//td[a[contains(@href, '/original')]]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
innerTD.appendChild(document.createElement("br"));
innerTD.appendChild(link);
