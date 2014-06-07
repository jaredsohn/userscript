// ==UserScript==
// @name           Apache directory indices to Slaenko Xtractor
// @namespace      http://henrik.nyh.se
// @description    Adds a link in the top right of Apache directory indices, to view that directory with Slaenko Xtractor, a (Swedish language) web tool that displays all images linked to.
// @include        *
// ==/UserScript==

// Locate the header

var header = document.getElementsByTagName('h1')[0];

// Strip newlines, linefeeds and HTML

var headerContents = header.innerHTML.replace(/(<.*?>|[\r\n]+)/g, '');

// Don't bother if this isn't a directory index

if (headerContents.indexOf('Index of /') != 0)  // indexOf Index of! <3
	return;

// OLD: These properties can be assumed to identify the page as an Apache directory index containing images
//var altDIR = document.evaluate("//IMG[@alt='[DIR]']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
//var altIMG = document.evaluate("//IMG[@alt='[IMG]']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

// Now bother

// Create, style and add elements

var p = document.createElement('p');

var link = document.createElement('a');
var img = document.createElement('img');

img.src = 'http://henrik.nyh.se/x/favicon.ico';
img.style.border = '0';
img.style.position = 'relative';
img.style.top = '2px';
img.style.paddingRight = '1px';

link.href = 'http://henrik.nyh.se/x/' + window.location.href;
link.appendChild(img);
link.appendChild(document.createTextNode('l'+unescape('%E4')+'nko'));

link.style.color = '#EEE';
link.style.textDecoration = 'none';
link.style.padding = '0.3em';
link.style.display = 'block';

p.appendChild(link);

p.style.padding = '0';
p.style.margin = '0.5em';

p.style.border = '1px solid darkred';
p.style.backgroundColor = '#000';

p.style.position = 'absolute';
p.style.top = '0';
p.style.right = '0';

link.target = '_blank';  // Comment out this line if you don't want to open Slaenko in a new window/tab

// Juggle into the right location
header.parentNode.insertBefore(p, header);
header.parentNode.insertBefore(header, p);
