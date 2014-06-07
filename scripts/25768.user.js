// GMoviesLink1
// version 1.0
// Julio2007 - Gabriel Gasparolo, modified by vtwin0001
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "GMoviesLinks", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          GMoviesLink1
// @namespace     http://gasparolo.com/
// @description Adds links to download subtitles from opensubtitles and get NZBs ... Añade links para obtener subtitulos de opensubtitles y archivos NZB
// @include        http://*.imdb.com/*title*
// @include        http://imdb.com/*title*
// @include http://*.thepiratebay.org/*
// @include http://thepiratebay.org/*
// @include http://*.subdivx.com/*
// ==/UserScript==

var CONSTANTS = {
	OPEN:	0,
	IMDB: 	1,
	NWZL:	2,
	BINT:	3,
	NZB1:	4,
	NZB2:	5
};

function Prettifier( css ) {
	var header = document.getElementsByTagName('head');
	var node = document.createElement('style');
	node.type = 'text/css';
	node.innerHTML = css;
	if( header ) header[0].appendChild(node);  
}

function newLinkAnchor( href, text, title) {
	var aLink = document.createElement('a');
	aLink.href = href;
	aLink.style.marginLeft = "6px";
	aLink.style.marginRight = "6px";
	aLink.title = title;
	aLink.innerHTML = text;
	return aLink;
}

function newLinkTable( href, text, title ) {
	var cell = document.createElement('div');
	cell.className = "gLinksCell";
	cell.id = "gLinksCell" + text;
	var anchor = document.createElement('a');
	anchor.className = "gLinksAnchor";
	anchor.href = href;
	anchor.title = title;
	anchor.innerHTML = text;
	cell.appendChild( anchor );
	return cell;
}

function createLinksArray( title, newLink ) {
	var linksArray = new Array();
	
	linksArray[ CONSTANTS.OPEN ] = newLink(
		"http://www.opensubtitles.com/en/search2/sublanguageid-all/moviename-" + title,
		"OPEN",
		"opensubtitles.com"
		);
		
	linksArray[ CONSTANTS.IMDB ] = newLink (
		"http://www.google.com/search?btnI=I%27m+Feeling+Lucky&q=imdb+" + title,
		"IMDB",
		"imdb.com"
		);

	linksArray[ CONSTANTS.NZB2 ] = newLink(
		"http://binsearch.info/?q="+ title +" &max=250&adv_age=&server=2",
		"NZB2",
		"images.google.com"
		);

	linksArray[ CONSTANTS.NZB1 ] = newLink (
		"http://binsearch.info/?q="+ title +" &max=250&adv_age=&server=",
		"NZB1",
		"binsearch.info"
		);
		
	linksArray[ CONSTANTS.NWZL ] = newLink (
		"http://www.newzleech.com/posts/?retention90=&search=" + title,
		"NWZL",
		"newzleech.com"
		);
		
	linksArray[ CONSTANTS.BINT ] = newLink (
		"http://www.bintube.com/Default.aspx?__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=%2FwEPDwUKLTMzNTUyNzQ2MGRkfMzT7P4TAlxNeQpcjYr5XFsdH%2Fw%3D&q="+ title +" &i=1&browse=&w=&opt=&ctl00%24ContentPlaceHolder1%24sgroup=&ctl00%24ContentPlaceHolder1%24asmGroup%24hdnSelectedValue=&a=200&b=0&r=25",
		"BINT",
		"bintube.com"
		);

	return linksArray;
}

function addLinksTable( regExp, getTitle ) {
	var anchor, cell;
	var titleElements = document.evaluate( regExp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	
	for (var i = 0; i < titleElements.snapshotLength; i++) {
		var titleElement = titleElements.snapshotItem( i );
		var title = getTitle( titleElement );
		
		if ( title ) {
			var links = createLinksArray( title, newLinkTable );
			var tt = document.createElement('div');
			tt.id = "gLinksTable";
			if( window.location.host.match( /imdb\.com/i ) ) {
				tt.appendChild( links[ CONSTANTS.NWZL ]  );
			} else {
				if( window.location.host.match( /thepiratebay\.org/i ) ) {
					tt.appendChild( links[ CONSTANTS.IMDB ]  );
				}
			}
			tt.appendChild( links[ CONSTANTS.OPEN ] );
			tt.appendChild( links[ CONSTANTS.BINT ] );
			tt.appendChild( links[ CONSTANTS.NZB1 ] );
			tt.appendChild( links[ CONSTANTS.NZB2 ] );
			titleElement.parentNode.insertBefore( tt, titleElement );
		}
	}	
}

function addLinks( regExp, getTitle ) {
	var titleElements = document.evaluate( regExp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	
	for (var i = 0; i < titleElements.snapshotLength; i++) {
		var titleElement = titleElements.snapshotItem( i );
		var title = getTitle( titleElement );
		var links = createLinksArray( title, newLinkAnchor );
		var span = document.createElement('span');
		span.style.marginTop = "10px";
		span.appendChild(document.createTextNode('['));
		if( window.location.host.match( /imdb\.com/i ) ) {
			span.appendChild( links[ CONSTANTS.NWZL ] );
		} else {
			if( window.location.host.match( /thepiratebay\.org/i ) ) {
				span.appendChild( links[ CONSTANTS.IMDB ] );
			}
		}
		span.appendChild(document.createTextNode('|'));
		span.appendChild( links[ CONSTANTS.OPEN ] );
		span.appendChild(document.createTextNode('|'));
		span.appendChild( links[ CONSTANTS.BINT ] );
		span.appendChild(document.createTextNode('|'));
		span.appendChild( links[ CONSTANTS.NZB1 ] );
		span.appendChild(document.createTextNode('|'));
		span.appendChild( links[ CONSTANTS.NZB2 ] );
		span.appendChild(document.createTextNode('] '));
		titleElement.parentNode.insertBefore( span, titleElement );
	}
}

function getTitleIMDB( titleElement ) {
	var title = titleElement.innerHTML.replace(/<[^>]+>/g, '');
	title = title.replace(/(\([^\)]+\))/g, ''); 
	title = title.replace(/^\s+|\s+$/g, ''); 
	title = title.replace(/ +/g,"+");
	return title;
}


function getTitleNWZL( titleElement ) {
    var name = titleElement.firstChild.nodeValue;
	
	if ( name.match( /(DVD|TELESYNC|TELECINE|CAM|XVID|DIVX|PROPER|iNTERNAL|LIMITED|STV|SCREENER|S?VCD|UNRATED|COMPLETE)/i ) ) { 
	    name = name.replace(/[\.\-_]/g," ").replace(/\[.*/,'');
	    name = name.replace(/ (DVD|TELESYNC|TELECINE|CAM|XVID|DIVX|PROPER|iNTERNAL|LIMITED|STV|SCREENER|S?VCD|UNRATED|COMPLETE).*/i,'');
	    name = name.replace(/( TS| Festival| WS).*/, '');
		name = name.replace(/ +/g,"+");
		return name;
	} else {
		return null;
	}	
}

function NWZLPrettifier() {
	var css = "#adbrite-banner, #sky-banner, #tp_frame1, .ad, .ads, .noborder, .spons-link {";
	css += "display: none !important;";
	css += "}";
	css += "#main-content, #detailsouterframe, #comments .comment, #details p, .nfo {";
    css += "width: auto !important;";
    css += "margin-left: 10pt !important;";
    css += "margin-right: 10pt !important;";
	css += "}";
	Prettifier( css );
}

function gTablePrettifier() {
	var css = "";
	css += "#gLinksTable { background-color: #ffffff !important; border: 1px solid #989898 !important; padding: 0px !important; margin: 0px; height: 16px !important; width: 151px !important; }";
	css += ".gLinksCell a { border: 0px none !important; font-family: Arial !important; font-size: 8px !important; font-weight: bold !important; color: #ffffff !important; text-decoration: none !important; }";
	css += ".gLinksCell a:visit { text-decoration: none !important; }";
	css += ".gLinksCell a:hover { text-decoration: none !important; }";
	css += ".gLinksCell a:link { text-decoration: none !important; }";
	css += ".gLinksCell { display: block !important; position: relative; border: 0px solid #989898 !important; width: 28px !important; height: 14px !important; padding: 0px !important; margin: 1px !important; text-align:center; }";
	css += "#gLinksCellNWZL { background-color: #a0a060; top: 0px; left: 0px;}";
	css += "#gLinksCellIMDB { background-color: #f0d000; top: 0px; left: 0px;}";
	css += "#gLinksCellOPEN { background-color: #ddc0c0; top: -15px; left: 30px;}";
	css += "#gLinksCellBINT { background-color: #afafaf; top: -30px; left: 60px;}";
	css += "#gLinksCellNZB1 { background-color: #c0c0c0; top: -45px; left: 90px;}";
	css += "#gLinksCellNZB2 { background-color: #c0c0ff; top: -60px; left: 120px;}";
	Prettifier( css );
}

//--- Comienza Procesamiento de P?ginas

gTablePrettifier();

if( window.location.host.match( /imdb\.com/i ) ) {
	addLinksTable( '//div[@id = "tn15title"]/h1', getTitleIMDB );
};

if( window.location.host.match( /newzleech\.com/i ) ) {
	NWZLPrettifier();
	addLinksTable( '//a[@class="detLink"]', getTitleNWZL );
};

if( window.location.host.match( /subdivx\.com/i ) ) {
	var axxoLinks = document.evaluate( '//tr/td/font/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	for( var j = 0; j < axxoLinks.snapshotLength; j++ ) {
		var downloadComments = axxoLinks.snapshotItem( j );
		if( downloadComments.innerHTML.match( /aXXo/i ) ) {
			var axxoCell = downloadComments.parentNode.parentNode;
			axxoCell.style.backgroundColor  = "#ffffa0";
		} else {
			if( downloadComments.innerHTML.match( /DvdRip/i ) ) {
				var axxoCell = downloadComments.parentNode.parentNode;
				axxoCell.style.backgroundColor  = "rgb(255,200,145)";
			}
		}
	}
};

