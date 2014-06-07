// ==UserScript==
// @name           UserScripts.org Simple View
// @namespace      http://userscripts.org/people/14536
// @description    Simplifies the tables showing scripts on UserScripts.org
// @include        http*://userscripts.org/*scripts*
// @include        http*://userscripts.org/*/favorites*
// @include        http*://userscripts.org/tags/*
// @include        http*://userscripts.org/scripts/search*q=*
// @author         Vaughan Chandler
// ==/UserScript==

// Last updated 2009-09-28

function $x(xpath,root){return document.evaluate(xpath,(root?root:document),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}
function $x1(xpath,root){return document.evaluate(xpath,(root?root:document),null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;}

var table = $x1('//table[@class="wide forums"]');
var simplified = false;

// If you want to have the script run automatically either add #simple to the end of the URL or uncomment the following line
//simplify();

if (!simplified && table) {
	
	if (window.location.href.indexOf('#simple') != -1) {

		// Run the script automatically
		simplify();

	} else {

		// Add a link to run the script manually
		var link = document.createElement('a');
		link.innerHTML = 'Simplify<br /><br />';
		link.style.textDecoration = "underline";
		link.style.cursor = 'pointer';
		link.addEventListener('click', simplify, true);
		table.parentNode.insertBefore(link, table);

	}
	
}

function simplify() {
	
	// Don't run more than once
	if (simplified || !table) { return; }
	simplified = true;
	
	// Handle ratings
	var elms = $x('//table[@class="wide forums"]//span[@class="rating"]//span[@class="number"]');
	for (var i=0; i<elms.snapshotLength; i++) {
		var number = (Math.round(elms.snapshotItem(i).innerHTML*10)/10) + '';
		if (number.length==1) { number = number + '.0'; }
		number = number + ' Stars';
		try {
			var reviews = elms.snapshotItem(i).parentNode.parentNode.getElementsByTagName('a')[0];
			reviews.style.display='none';
			elms.snapshotItem(i).innerHTML = '<a href="' + (reviews.href) + '">' + number + '</a>';
		} catch(x) { elms.snapshotItem(i).innerHTML = number; }
	}
	
	// Hide paragraphs and images; show ratings as numbers
	var style = 'table.wide.forums p, table.wide.forums span.stars, table.wide.forums img { display:none; }'+
				'table.wide.forums span.rating, table.wide.forums span.number { display:inline; background:none; }';
	GM_addStyle(style.replace(/;/g, ' !important;'));
	
	// Hide the edit/update column on your script management page
	if (window.location.href.indexOf('home/scripts')!=-1) {
		var elms = $x('//table[@class="wide forums"]//tr//td[2] | //table[@class="wide forums"]//tr//th[2]');
		for (var i=0; i<elms.snapshotLength; i++) {
			elms.snapshotItem(i).parentNode.removeChild(elms.snapshotItem(i));
		}
	}
	
}
