// #########################      A Greasemonkey script that restores
// # Google Cleanup Script #    Google's "classic" user interface to
// #########################    its former glory.
// 
// --------------------------------------------------------------------
//  Copyright © 2011-2012 Alexander Rosenberg. All Rights Reserved
// --------------------------------------------------------------------
// 
//  This is a Greasemonkey user script. To install this script, you
//  need Greasemonkey version 0.3 or later. To get Greasemonkey, or
//  for more information go to http://greasemonkey.mozdev.org/
//  Greasemonkey is a Mozilla Firefox add-on that allows users to
//  make on-the-fly changes to HTML web page content through the use
//  of JavaScript. Greasemonkey scripts can add new functions to web
//  pages, fix rendering bugs, combine data from multiple webpages,
//  or perform numerous other functions.
// 
// --------------------------------------------------------------------
// 
// ## Greasemonkey Metadata ###########################################
// ==UserScript==
// @name          Google Cleanup Script
// @namespace     http://myjumbledweb.com/
// @description   Restore Google's "classic" user interface.
// @include       http*://google.*/*
// @include       http*://*.google.*/*
// @exclude       
// @version       1.9f
// @history       1.9f Addition: this script now automatically sets cookie to use original layout
// @history       1.9f Addition: added sidebar icon for the new Applications search mode
// @history       1.9f Addition/Revision: sidebar icon of active search mode now has blue background 
// @history       1.9f Bugfix: fixed code to restore the Google logo on the search results page
// @history       1.9f Bugfix: removed empty space underneath the search box
// @history       1.9e Bugfix/Revision: change of "Web" to "Search" in the navbar (1/6/2012)
// @history       1.9d Bugfix: fixed positioning issue on hp when Google Instant is disabled
// @history       1.9d Bugfix/Revision: fixed sidebar when viewport is at least 1250px wide
// @history       1.9d several other minor bugfixes and revisions
// @history       1.9c Minor Addition: hide the blue "start sharing on Google+" bar
// @history       1.9b Minor Bugfix: Corrected left margin of sidbar search options
// @history       1.9  Addition: this script now restores the appearance of iGoogle
// @history       1.9  Addition/Revision: restore original order of result items
// @history       1.9  Addition: restore "Advanced Search" link under the search button
// @history       1.9  Minor Addition: restore appearance of Google Profiles page
// @history       1.9  Addition/Revision: extended Google service detection
// @history       1.9  Bugfix/Revision: fixed the appearance of the homepage footer
// @history       1.9  Bugfix/Revision: fixed the sidebar on the search results page
// @history       1.9  Bugfix/Revision: fixed the help center page layout
// @history       1.9  shortened revision history (complete change log on userscripts.org)
// @history       1.9  several other minor bugfixes and revisions
// @history       1.8f Critical Bugfix: change in Google footer caused the script to fail
// @history       1.8e Addition: restore the Google Help Center page layout
// @history       1.8e Bugfix: once again fixed placement of "Change Background" link
// @history       1.8d Major Bugfix: restore the appearance of the Google sign-in page
// @history       1.8c Bugfix: Fixed the link color of the selected tab in the navbar
// @history       1.8  Major Addition: restore appearance of Google news and sign-in page
// @history       1.8  Bugfix: fixed placement of the "Change Background" link on homepage
// @history       1.8  Bugfix: fixed display of blue search button on the Google blogs hp
// @history       1.7g Critical Bugfix: fixed footer code that caused entire script to fail
// @history       1.7f Addition: put back the "cached" and "similar" links
// @history       1.7e Bugfix/Revision: fixed layout issues in Google Images
// @history       1.7e Revision: extended Google service detection
// @history       1.7  Revision: script now restores the icons to the sidebar
// @history       1.7  Revision: extended/broadened site compatibility with Google services
// @history       1.7  Revision: added multilingual support for Google service detection
// @history       1.7  Bugfix/Revision: Instant hp layout now used on local Google sites
// @history       1.6g Bugfix/Revision: use standard hp layout for special Google logos
// @history       1.6e Bugfix/Revision: fixed compatibility with www.google.com.au
// @history       1.6c Revision: search results page no longer has centered layout
// @history       1.6  Major Revisions: code substancially rewritten
// @history       1.6  Major Bufix: introduced workaround for bug #1320
// @history       1.5  Bugfix/Revision: XMLHttpRequest readystate detection
// @history       1.4c Bugfix: Google UK homepage now displays properly
// @history       1.4  Major Bugfix: script now works properly with Google Instant
// @history       1.2  New Feature: restore colorful sidebar icons
// @history       1.1  Integrated navbar restoration script.
// @history       1.00 Initial release
// ==/UserScript==
// ####################################################################

if (typeof(GM_log) == "function") {GM_log('Google Cleanup GreaseMonkey Script Loaded');}

/* Uncomment the following line to make this script work in GreaseKit for Safari */
// if (typeof(unsafeWindow)!="object") {var unsafeWindow = window;}

function log(msg,level) {
	if (typeof(GM_log) == "function")
	{
		GM_msg = '[Google Cleanup]: '+msg;
		
		if (level == 'info') {
			GM_log(GM_msg,0);
		}
		else if (level == 'warn') {
			GM_log(GM_msg,1);
		}
		else if (level == 'error' | level == 'exception') {
			GM_log(GM_msg,2);
		}
		else if (typeof(level) == "string") {
			GM_log(level+' '+GM_msg);
		}
		else {GM_log(GM_msg);}
	}
	else if (typeof(console) == "object")
	{
		if (level == 'debug') {
			console.debug(msg);
		}
		else if (level == 'info') {
			console.info(msg);
		}
		else if (level == 'warn') {
			console.warn(msg);
		}
		else if (level == 'error') {
			console.error(msg);
		}
		else if (level == 'exception') {
			console.exception(msg);
		}
		else if (typeof(level) == "string") {
			console.log(level+': '+msg);
		}
		else {console.log(msg);}
	}
}

function getElementsByClassName(classname,node)
{	if (node == null) {node = document;}
	// use native implementation if available
	if (node.getElementsByClassName)
	{return node.getElementsByClassName(classname);}
	else
	{	return (  // Dustin Diaz method
		function getElementsByClass(searchClass,node)
		{	var classElements = [], // same as: new Array()
				els = node.getElementsByTagName("*"),
				pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
			for (i=0, j=0; i<els.length; i++)
			{
				if (pattern.test(els[i].className))
				{classElements[j] = els[i]; j++;}
			}
			return classElements;
		} )(classname,node);
	}
}

function hasHash() {	// (added in 1.7)
    return (document.location.hash != "");
}

function parseGetVars(qString) {
	var getVars = new Array();
	var pairs = qString.split(/\&/);
	for (var i in pairs) {
		var nameVal = pairs[i].split(/\=/);
		getVars[nameVal[0].toLowerCase()] = nameVal[1];
	}	
	return getVars;
}

function addStyle(newStyle) {
	if (typeof(GM_addStyle) == "function") {
		GM_addStyle(newStyle); return;
	}
    var styleElement = document.getElementById('style_js');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.id = 'style_js';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    styleElement.appendChild(document.createTextNode(newStyle));
}

function nextElem(node) {
	return (node.nextSibling) ? ( (node.nextSibling.nodeType != 1) ? nextElem(node.nextSibling) : node.nextSibling ) : null;
}

function prevElem(node) {
	return (node.previousSibling) ? ( (node.previousSibling.nodeType != 1) ? prevElem(node.previousSibling) : node.previousSibling ) : null;
}

function firstSubElem(node) {
	return (node.firstChild) ? ( (node.firstChild.nodeType != 1) ? nextElem(node.firstChild) : node.firstChild ) : null;
}

function removeClass(className,node) {
	if (node.className == className) {node.removeAttribute('class');}
	else {node.className = node.className.replace(className,'');}
}

function hasClassName(className,node) {
	return node.className.toLowerCase().split(/\s/).indexOf(className.toLowerCase()) >= 0;
}

function isSet(expr) {return (typeof(expr)!="undefined" && expr!=null);}


/*** Restore the Google products bar / Navbar (http://userscripts.org/scripts/show/105768) ***/
addStyle(
	  'span#gbi5 {'
    + '    background: url("//ssl.gstatic.com/gb/images/b_8d5afc09.png") repeat scroll -6px -22px transparent;'
    + '    height: 17px;'
    + '    width: 16px;'
    + '}'
    + 'a.gbz0l span.gbtb2 {'
    + '    border-top-color: #1A54E1 !important;'
    + '}'
    + 'div#gbz a.gbzt, div#gbz a.gbgt, div#gbg a.gbgt {'
    + '    color: #3366CC !important;'
    + '}'
    + 'a.gbz0l span.gbts {'
    + '    color: #363636;'
    + '}'
    + 'a.gbzt-hvr, a.gbzt:focus, a.gbgt-hvr, a.gbgt:focus {'
    + '    background-color: transparent;'
    + '    background-image: url("//ssl.gstatic.com/gb/images/b_8d5afc09.png");'
    + '    background-position: 0 -102px;'
    + '    background-repeat: repeat-x;'
    + '}'
    + 'div#gbx3, div#gbx4 {'
    + '    background-color: #FFFFFF;'
    + '    background-image: url("//ssl.gstatic.com/gb/images/b_8d5afc09.png");'
    + '    background-position: 0 -138px;'
    + '    background-repeat: repeat-x;'
    + '    border-bottom: 1px solid #EDEDED;'
    + '}'
    + 'div#mngb div#gbx4 {'
    + '    border-bottom: 1px solid #EDEDED;'
    + '}'
    + 'li.gbtb span.gbts {'
    + '    background: url("//ssl.gstatic.com/gb/images/b_8d5afc09.png") repeat scroll 0 -22px transparent;'
    + '    padding: 29px 0 0;'
    + '    width: 1px;'
    + '}'
);

// Hide the blue "Click here to start sharing on Google+" bar
addStyle(
	  '.mngb .gb {'
	+ '    height: auto;'
	+ '}'
	+ '.mngb .gb .mgmhppd {'
	+ '    display: none;'
	+ '}'
);

/*** Restore Search Box Border Colors ***/
addStyle(
      '#lst-ib:hover, #lst-ib.lst-d-f, #lst-ib.lst-d-f:hover, .lst-d-f .lst-tbb,'
	+ '.lst-d-f.lst-tbb, #sftab:hover .lst-tbb, #sftab.lst-d-f:hover .lst-tbb {'
    + '    border-color: #C0C0C0 #D9D9D9 #D9D9D9 #D9D9D9 !important;'
    + '}'
    + 'div.lst-d {'
    + '    -moz-box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.05) inset;'
    + '}'
    + 'div.lst-d:hover {'
    + '    -moz-box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1) inset;'
    + '}'
    + 'table.lst-t {'
    + '    background: none transparent;'
    + '}'
);

// Correct Navbar Menu's List-Item Spacing
addStyle(
      '.gbmt {'
    + '    padding: 0px 12px 0px 8px;'
    + '}'
    + '.gbmc {'
    + '    padding: 3px 0px;'
    + '}'
    + '.gbmh {'
    + '    margin: 3px 0px;'
    + '}'
);

// Remove Gray/whitesmoke BG from Google services
addStyle(
	  'div#kd-googlebar, div.sfbgg, body.streamlined-header-1 div.header-logo, div.header-logo, div.c-cb-V {'
	+ '    background: none repeat scroll 0 0 #FFFFFF;'
	+ '    border-top: 0px none;'
	+ '    border-bottom: 0px none;'
	+ '}'
);

// Restore Link and Text Styles
addStyle(
	  '.a, cite, cite a:link, cite a:visited, .cite, .cite:link, #mbEnd cite b, #tads cite b, #tadsto cite b, #ans > i, .bc a:link {'
	+ '    color: #0E774A;'		// Restore Cite Color
	+ '    font-style: normal;'
	+ '}'
	+ '#gsr a:active, #srp a:active, a.fl:active, .fl a:active, .gl a:active {'
	+ '    color: #CC1111;'		// Restore Active Link Color
	+ '}'
	+ 'a.fl:link, span.flc a, .f span.vshid a, span.gl a.fl {'
	+ '    color: #4272DB;'
	+ '}'
	+ '.flt, a.flt, .gl a:link, a.mblink, .mblink b {'
	+ '    color: #4272DB;'
	+ '}'
	+ '.osl a, .gl a, #tsf a, a.mblink, a.gl, a.fl, .slk a, .bc a, .flt, a.flt u,'
	+ '.oslk a, #tads .ac a, #rhs .ac a, .blg a, #appbar a, span.vshid a {'
	+ '    text-decoration: none;'
	+ '}'
	+ '.osl a:hover, .gl a:hover, #tsf a:hover, a.mblink:hover, a.gl:hover, .slk a:hover,'
	+ '.bc a:hover, .flt:hover, .flt:hover u, a.fl:hover, span.vshid a:hover, .oslk a:hover,'
	+ '.tbotu:hover, #tads .ac a:hover, #tadsb .ac a:hover, #rhs .ac a:hover, .blg a:hover {'
	+ '    text-decoration: underline;'
	+ '}'
	+ 'div.osl {'
	+ '    margin: 1px 0px;'
	+ '}'
	+ 'a, .sub-header .lt a, .sub-header .lt a:visited, .thumbnail .source,'
	+ '#pagination .next a, #pagination .prev a, #pagination .next a:visited,'
	+ '#pagination .prev a:visited, #personalize a:visited, .footer .links a,'
	+ '.notify a:visited {'
	+ '    color: #1111CC;'
	+ '}'
	+ '.story .title .titletext, .esc .esc-lead-article-title .titletext,'
	+ '.esc .esc-lead-article-title a, .gsid-BNB .titletext {'
	+ '    text-decoration: underline;'
	+ '}'
	+ '.blended-wrapper .title, .esc .esc-lead-article-title,'
	+ '.top-stories-section .blended-wrapper-first .esc-lead-article-title {'
	+ '    font-size: 16px;'
	+ '    line-height: 18px;'
	+ '}'
	+ 'body.streamlined-header-1 a[href]:link {'
	+ '    color: #1155CC;'
	+ '}'
	+ 'body.streamlined div.footer-nav-streamlined a:link,'
	+ 'body.streamlined div.footer-nav-streamlined a:visited {'
	+ '    color: #0000CC;'
	+ '    text-decoration: underline;'
	+ '}'
);

// Restore the "cached" and "similar" links
addStyle(
	  'ol#rso span.vshid {'
	+ '    display: inline;'
	+ '}'
	+ 'ol#rso span.vshid:before {'
	+ '    content: "\\00A0-\\00A0";'
	+ '}'
);

// Change hover color of Google Search Suggestions
addStyle(
	  '#gac_scont .gac_b, #gac_scont .gac_b td.gac_c, #gac_scont .gac_b td.gac_d, tr.gssb_i {'
	+ '    background: none repeat scroll 0 0 #EFF3FB;'
	+ '}'
);

// Change hover color of menu-items
addStyle(
	  'div.goog-menuitem-highlight, div.goog-menuitem-hover,'
	+ 'div#anchorman-edition-menu div.goog-menuitem-highlight {'
	+ '    background-color: #EFF3FB;'
	+ '    border-color: #EFF3FB;'
	+ '}'
	+ 'td.menulist-highLight {'
	+ '    background-color: #EFF3FB;'
	+ '}'
	+ 'body div.kdDdItem:hover,'
	+ 'body #gear_menu .gbkc.gbmtc:hover,'
	+ 'body #gear_menu .gbe.gbmtc:hover,'
	+ 'body #gear_menu .gbnd.gbmtc:hover {'
	+ '    background-color: #EFF3FB !important;'
	+ '}'
	// SafeSearch Menu Items
	+ 'div.ab_dropdown li.ab_dropdownitem:hover {'
	+ '    background-color: #EFF3FB;'
	+ '}'
);

// hide google appbar
addStyle(
	  'div#subform_ctrl {'
	+ '    display: none;'
	+ '}'
	+ 'div#appbar {'
	+ '    font-size: 11px;'
	+ '    max-width: 695px;'
	+ '    min-height: 26px;'
	+ '    height: auto;'
	+ '    border-bottom: none;'
	+ '    margin-left: 176px;'
	+ '    margin-right: 272px;'
	+ '    padding-top: 3px;'
	+ '}'
	+ 'div.kd-appbar {'
	+ '    border-bottom: 0px none;'
	+ '}'
	+ 'div#appbar div#ab_name, div.kd-appname-wrapper, div#kd-appname, div.kd-appname {'
	+ '    display: none;'
	+ '}'
	+ 'div#appbar div#sbfrm_l {'
	+ ''
	+ '}'
	+ 'div#appbar div div#resultStats {'
	+ '    color: #000000;'
	+ '    font-size: 11px;'
	+ '    margin-left: 0px;'
	+ '    overflow: hidden;'
	+ '    position: static;'
	+ '    top: auto;'
	+ '    white-space: nowrap;'
	+ '}'
	+ 'div#appbar ol#ab_ctls {'
	+ '    display: none;'
	+ '}'
	+ 'div#appbar_b {'
	+ '    display: none;'
	+ '}'
	+ '.kd-appbar #appbar.appbar-wrapper {'
	+ '    margin-left: 192px;'
	+ '    margin-right: 16px;'
	+ '    max-width: none;'
	+ '}'
);

// restore Google's familiar header-bar
addStyle(
	  'div.mgc-background {'
	+ '    -moz-box-shadow: none;'
	+ '    border-bottom: 0px none;'
	+ '}'
	+ 'div.mgc-background div.mgc {'
	+ '    background-color: #FFFFFF;'
	+ '    border-bottom: 0px none;'
	+ '}'
	+ 'div.mgc-background div.mgc a[href]:hover {'
	+ '    text-decoration: underline;'
	+ '}'
	+ 'body.streamlined-header-1 div.header-bar {'
	+ '    background: none repeat scroll 0 0 #EBEFF9;'
	+ '    border-top: 1px solid #6B90DA;'
	+ '    border-bottom: 0px none;'
	+ '    clear: both;'
	+ '    height: 20px;'
	+ '    width: auto;'
	+ '    overflow: visible;'
	+ '    margin: 0.1em 0.85em 0.6em 0.6em;'
	+ '    padding: 0.2em 0.6em;'
	+ '}'
	+ 'body.streamlined-header-1 div.header-bar h1 {'
	+ '    font-size: 1.2em;'
	+ '}'
	+ 'body.streamlined-header-1 div.header-bar h1 a:link,'
	+ 'body.streamlined-header-1 div.header-bar h1 a:visited {'
	+ '    font-size: 1em;'
	+ '    text-decoration: none;'
	+ '}'
	+ 'body.streamlined-header-1 div.header-bar h1,'
	+ 'body.streamlined-header-1 div.header-bar h1 a:link,'
	+ 'body.streamlined-header-1 div.header-bar h1 a:visited {'
	+ '    color: #000000;'
	+ '    float: left;'
	+ '    font-weight: bold;'
	+ '    margin: 0px;'
	+ '    padding: 0px;'
	+ '    white-space: nowrap;'
	+ '}'
	+ 'div#yarnball {'
	+ '    margin-top: 0px;'
	+ '}'
	+ 'body.streamlined-header-1 div.header-wrapper div.optg-searchbox {'
	+ '    margin-top: 0px;'
	+ '    position: relative;'
	+ '    top: -80px;'
	+ '    pointer-events: none;'
	+ '}'
	+ 'body.streamlined-header-1 div.header-wrapper div.optg-searchbox form#search-form div.searchbox-background {'
	+ '    pointer-events: auto;'
	+ '}'
	// restore module headers
	+ 'body div.module h2 {'
	+ '    background: none repeat scroll 0 0 #EBEFF9;'
	+ '    font-size: 1em;'
	+ '    font-weight: bold;'
	+ '    margin: 0 -0.5em 0.5em -1em;'
	+ '    padding: 0.3em 0.5em;'
	+ '}'
);

// restore the Google News sub-headers
addStyle(
	  'div.sub-header div.basic-title,'
	+ '.rt-col .sub-header .basic-title,'
	+ '.column2 .sub-header .basic-title {'
	+ '    height: auto;'
	+ '    background-color: #EBEFF9;'
	+ '    padding: 2px 4px;'
	+ '    border-bottom: 0px none;'
	+ '}'
	+ '.sub-header .basic-title h2.text,'
	+ '#mc-wrapper .basic-title h2.text {'
	+ '    display: block;'
	+ '    font-size: 100%;'
	+ '    font-weight: bold;'
	+ '    line-height: 16px;'
	+ '    margin: 0px;'
	+ '    padding: 2px 0px 2px 1px;'
	+ '}'
	+ 'div.sub-header div.basic-title span.title {'
	+ '    font-weight: bold;'
	+ '}'
	+ 'div.sub-header + div.esc-separator {'
	+ '    opacity: 0 !important;'
	+ '}'
);

// format the help page layout
addStyle(
	  'div.wrapper div.mgc-background div.mgc,'
	+ 'body.streamlined-header-1 div.header-bar,'
	+ 'body.streamlined div.footer-nav-streamlined {'
	+ '    max-width: none;'
	+ '}'
	+ '.header-wrapper > .header-bar > h1:after {'
	+ '    display: none;'
	+ '}'
	+ 'body td.left-col-siblings {'
	+ '    font-size: 12px;'
	+ '    padding: 0px 10px 0px 1em;'
	+ '}'
	+ 'h4.sibling-leftnav-title {'
	+ '    margin: 0px;'
	+ '    padding: 0px;'
	+ '}'
	+ 'h4.sibling-leftnav-title a:hover, li.leftnav-sibling a:hover {'
	+ '    background-color: #EFF3FB;'
	+ '}'
	+ 'ul.leftnav li.nav_link_on,'
	+ 'ul.leftnav li.nav_link_on a:link,'
	+ 'ul.leftnav li.nav_link_on a:visited,'
	+ 'ul.leftnav-siblings li.leftnav-sibling.current,'
	+ 'ul.leftnav-siblings li.leftnav-sibling.current a:link,'
	+ 'ul.leftnav-siblings li.leftnav-sibling.current a:visited {'
	+ '    color: #0000CC;'
	+ '    font-weight: bold;'
	+ '    background-color: #EFF3FB;'
	+ '}'
	+ 'div.left-mod-container {'
	+ '    background-color: #EFF3FB;'
	+ '}'
	+ 'body.streamlined-3 div.main-content-container {'
	+ '    max-width: 1110px;'
	+ '    width: 100%;'
	+ '}'
	+ 'div.inner_content {'
	+ '    padding: 0px;'
	+ '}'
	+ 'body form.contact_form table.survey-scale tr.survey-ratings_row th {'
	+ '    background: none #EFF3FB;'
	+ '}'
	+ 'div.pog div.eqp-pane-wrapper, div.pog div.eqp-pane-footer {'
	+ '    background-color: #EBEFF9;'
	+ '}'
	+ 'body.streamlined-3 td.right-column {'
	+ '    padding-top: 0px;'
	+ '}'
	+ 'body.streamlined-3 td.right-column div.module {'
	+ '    margin-top: 0px;'
	+ '}'
	+ 'body div.additional_resources_wrapper {'
	+ '    border-top: 1px solid #DEE7F7;'
	+ '}'
	+ 'body div.footer-nav-streamlined,'
	+ 'body.streamlined div.footer-nav-streamlined {'
	+ '    border-top: 1px solid #DEE7F7;'
	+ '    color: #000000;'
	+ '    margin: 0.9em;'
	+ '    padding: 1em 0 0;'
	+ '    text-align: center;'
	+ '}'
);

// Format the Google Profiles page
addStyle(
	  'div.c-r-V {'
	+ '    border-top: 0px none;'
	+ '}'
	+ 'div#content div.oK {'
	+ '    background-color: #FFFFFF;'
	+ '    border: 1px solid #D3E1F9;'
	+ '}'
);

// format the news page layout
addStyle(
	  'div#main-wrapper, #main-wrapper.a2 {'
	+ '    padding-right: 8px;'
	+ '}'
	+ 'div.search {'
	+ '    padding-left: 6px;'
	+ '}'
	+ 'div#page-header {'
	+ '    padding: 10px 0px 0px 0px;'
	+ '    position: relative;'
	+ '    white-space: nowrap;'
	+ '}'
	+ 'div#search-web-button {'
	+ '    display: inline-block;'
	+ '}'
	+ 'td#table-spacer-cell {'
	+ '    width: 0px;'
	+ '}'
	+ 'div.blended-section div.focused-story {'
	+ '    background-color: #CCD5F1;'
	+ '}'
	+ '.blended-section .focused-story .anchorman-blended-story {'
	+ '    opacity: 0.9999;'
	+ '}'
	+ '.blended-wrapper, .blended-section .esc-wrapper {'
	+ '    -moz-border-radius: 1px 1px 2px 2px;'
	+ '    background-color: #FFFFFF;'
	+ '    border-bottom: 1px solid #C9D7F1;'
	+ '    margin-top: 0px;'
	+ '    padding: 1px 2px;'
	+ '}'
	+ '.anchorman-blended-story, .esc-wrapper .anchorman-blended-story {'
	+ '    background-color: #FFFFFF;'
	+ '    clear: left;'
	+ '    overflow: hidden;'
	+ '    padding: 3px 3px 0px 3px;'
	+ '}'
	+ 'div.esc-separator {'
	+ '    display: block;'
	+ '    opacity: 1 !important;'
	+ '    background-color: #C9D7F1 !important;'
	+ '    margin: -1px 0px 0px 0px;'
	+ '}'
	+ '.esc .floating-extension-wrapper {'
	+ '    border-left: 1px solid #C9D7F1;'
	+ '}'
	+ 'div.gsid-POG div.personalization-video-pane {'
	+ '    background-color: #EBEFF9;'
	+ '}'
);

// restore the left navigation sidebar in Google News
addStyle(
	  'div#left-nav-wrapper {'
	+ '    display: block;'
	+ '}'
	+ '.pinning-enabled div#left-nav-wrapper {'
	+ '    overflow: hidden;'
	+ '    padding: 1px 16px 16px 0;'
	+ '}'
	+ '*.sel {'
	+ '    color: inherit;'
	+ '    font-weight: bold;'
	+ '}'
	+ '.nav-items .nav-item .topic a, .nav-items .nav-item .topic a:visited {'
	+ '    color: #1111CC;'
	+ '}'
	+ 'body a.persistentblue, body a.persistentblue:visited {'
	+ '    color: #1111CC;'
	+ '}'
	+ 'img.chip, .rect {'
	+ '    display: block;'
	+ '}'
	+ 'div.browse-sidebar ul.nav-items li,'
	+ 'div.browse-sidebar ul.nav-items li.nav-item,'
	+ 'div.browse-sidebar .item, .sidebar .browse-links li {'
	+ '    color: black;'
	+ '    font-size: 13px;'
	+ '    margin-left: 12px;'
	+ '    padding: 3px 4px;'
	+ '}'
	+ '.pinning-enabled .centered .main-content-with-gutter-wrapper,'
	+ '.pinning-enabled .a2 .centered .main-content-with-gutter-wrapper {'
	+ '    margin-left: 170px;'
	+ '    padding-right: 0px;'
	+ '}'
);

// Google Plus
addStyle(
	// Header Text
	  'div.yta {'
	+ '    color: #CF4236;'
	+ '}'
	// Section Seperator
	+'div.Dda, div.Kda {'
	+ '    border-top: 1px solid #DEE7F7;'
	+ '}'
	/*** Google+ Home Layout ***/
	// Right Column Seperators
	+ 'div.c-Ob-FA, div.HT, div.c-ge-Hl-mc-Y, div.Vp, div.EZ {'
	+ '    border-bottom: 1px solid #DEE7F7;'
	+ '}'
	// Message Box
	+ 'div.QMq2X {'
	+ '    background-color: #EBEFF9;'
	+ '    border: 1px solid #C9D7F1;'
	+ '}'
	// Message Box Shadow
	+ 'div.ehSshd, div.xgF7nb {'
	+ '    border-top: 8px solid #C1CCD6;'
	+ '}'
	+ 'div.c-r-P-V-wk-Eb {'
	+ '    border-color: transparent #DEE7F7 #DEE7F7 #DEE7F7;'
	+ '}'
	+ 'div.GLQTuc, div.in {'
	+ '    border-top: 1px solid #DEE7F7;'
	+ '}'
	// Section Seperator
	+ 'div.yzXpu {'
	+ '    background-color: #C9D7F1;' 
	+ '}'
	+ 'div.la-Bi-r-V {'
	+ '    border-left: 1px solid #C9D7F1;'
	+ '}'
	+ 'div.la-Bi-P-V {'
	+ '    border-bottom: 1px solid #C9D7F1;'
	+ '}'
	// Google+ Stream Sidebar
	+ 'a.tg3b4c:hover, div.nfkPhe:hover {'
	+ '    background-color: #EDF1FF;'
	+ '}'
	// Info Box
	+ 'div.xoa {'
	+ '    background-color: #EBEFF9;'
	+ '}'
	// Google+ account header
	+ 'div.la-Bi-cb-V {'
	+ '    background: -moz-linear-gradient(center top , #FEFEFE, #F2F4F9) repeat scroll 0 0 transparent;'
	+ '    border-bottom: 1px solid #C1CCD6;'
	+ '}'
);

if (isSet(document.getElementById('gbqlw'))) {
	document.cookie="PREF=ID=:U=88e8716486ff1e5d:FF=0:LD=en:CR=2:TM=1322688084:LM=1322688085:S=McEsyvcXKMiVfGds; path=/; domain=.google.com";
	window.location.reload();
}

var url = window.location.href;
var getVars = parseGetVars(unescape(url).substring(unescape(url).indexOf('?')+1));	// query string
var hashVars = parseGetVars(unescape(url).substring(unescape(url).indexOf('#')+1));	// fragment identifier
var host = window.location.hostname;
var subdomain = host.substring(0,host.lastIndexOf('.',host.lastIndexOf('.')-1));

var gbts = document.getElementsByClassName('gbts');
var i = 0; while (isSet(gbts[i]) && gbts[i].innerHTML!='Search') {i++;}
if (isSet(gbts[i]) && gbts[i].innerHTML=='Search') {gbts[i].innerHTML = 'Web'}

/* determine the current mode */
var gb = document.getElementById('gb');  // Google Navbar
var gbz0l = (isSet(gb))?getElementsByClassName('gbz0l',gb)[0]:null;
var m = (isSet(gbz0l))?nextElem(firstSubElem(gbz0l)).innerHTML.toLowerCase():null;
var mode;

	/* Check the Subdomain */
if ((mode = (subdomain=='')				? null :
		   ((subdomain=='www')			? null :
		   ((subdomain=='images')		? 'images' :
		   ((subdomain=='video')		? 'videos' :
		   ((subdomain=='news')			? ((!(/\/search/).test(url)||((/\/search/).test(url)&&(hashVars['tbm']=='nws'||getVars['tbm']=='nws')))?'news':null) :
		   ((subdomain=='maps')			? 'maps' :
		   ((subdomain=='mail')			? 'gmail' :
		   ((subdomain=='books')		? ((/\/ebooks/).test(url) ? 'ebookstore' : 'books') :
		   ((subdomain=='patents')		? 'patents' :
		   ((subdomain=='checkout')		? 'checkout' :
		   ((subdomain=='scholar')		? 'scholar' :
		   ((subdomain=='blogsearch')	? 'blogs' :
		   ((subdomain=='sites')		? 'sites' :
		   ((subdomain=='groups')		? 'groups' :
		   ((subdomain=='earth')		? 'earth' :
		   ((subdomain=='chrome')		? 'chrome' :
		   ((subdomain=='voice')		? 'voice' :
		   ((subdomain=='talk')			? 'talk' :
		   ((subdomain=='buzz')			? 'buzz' :
		   ((subdomain=='plus')			? '+' :
		   ((subdomain=='plusone')		? '+1' :
		   ((subdomain=='profiles')		? 'profiles' :
		   ((subdomain=='accounts')		? 'accounts' :
		   ((subdomain=='sketchup')		? 'sketchup' :
		   ((subdomain=='picasaweb')	? 'picasa' :
		   ((subdomain=='music')		? 'music' :
		   ((subdomain=='knol')			? 'knol' :
		   ((subdomain=='investor')		? 'investor relations' :
		   ((subdomain=='support')		? 'enterprise support' :
		   ((subdomain=='code')			? 'code' :
		   ((subdomain=='labs')			? 'labs' :
		    null))))))))))))))))))))))))))))))
) && isSet(mode)) {log('location detected from subdomain','debug');}
else if (
	/* Check the URL */
	(mode = (/\/search/).test(url)				? null :
		   ((/\/webhp/).test(url)				? null :
		   ((/\/imghp/).test(url)				? 'images' :
		   ((/\/nwshp/).test(url)				? 'news' :
		   ((/\/maps/).test(url)				? 'maps' :
		   ((/\/prdhp/).test(url)				? 'shopping' :		// Product Search
		   ((/\/mail\//).test(url)				? 'gmail' :
		   ((/\/bkshp/).test(url)				? 'books' :
		   ((/\/books/).test(url)				? 'books' :
		   ((/\/finance/).test(url)				? 'finance' :
		   ((/\/schhp/).test(url)				? 'scholar' :
		   ((/\/blogsearch/).test(url)			? 'blogs' :
		   ((/\/sites\//).test(url)				? 'sites' :
		   ((/\/alerts/).test(url)				? 'alerts' :
		   ((/\/grphp/).test(url)				? 'groups' :
		   ((/\/checkout\//).test(url)			? 'checkout' :
		   ((/\/earth\//).test(url)				? 'earth' :
		   ((/\/places\//).test(url)			? 'about places' :
		   ((/\/chrome\//).test(url)			? 'chrome' :
		   ((/\/webstore\//).test(url)			? 'chrome web store' :
		   ((/\/latitude\//).test(url)			? 'latitude' :
		   ((/\/fusiontables\//).test(url)		? 'fusion tables' :
		   ((/\/trends/).test(url)				? 'trends' :
		   ((/\/voice\//).test(url)				? 'voice' :
		   ((/\/talk\//).test(url)				? 'talk' :
		   ((/\/\buzz/).test(url)				? 'buzz' :
		   ((/\/\+1\//).test(url)				? '+1' :
		   ((/\/\ig/).test(url)					? 'iGoogle' :		// Personalized Homepage
		   ((/\/\preferences/).test(url)		? 'preferences' :	// search settings
		   ((/\/language_tools/).test(url)		? 'language tools' :
		   ((/\/webmasters\//).test(url)		? 'webmaster tools' :
		   ((/\/submityourcontent\//).test(url)	? 'submit your content' :
		   ((/\/mapmaker/).test(url)			? 'mapmaker' :
		   ((/\/history\//).test(url)			? 'history' :		// Web History
		   ((/\/psearch/).test(url)				? 'psearch' :		// Previous Search
		   ((/\/sitesearch\//).test(url)		? 'site search' :
		   ((/\/cse/).test(url)					? 'custom search' :
		   ((/\/commercesearch\//).test(url)	? 'commerce search' :
		   ((/\/mobile\//).test(url)			? 'mobile' :
		   ((/\/accounts\//).test(url)			? ((/\/ServiceLogin/).test(url) ? 'service sign-in' : ((/\/TOS/) ? 'tos' : 'accounts')) :
		   ((/\/support\//).test(url)			? (/\/forum/.test(url)?'help forums':(/\/chromeos\//.test(url)?'chrome os help':'help center')) :
		   ((/\/fb\/forms\/chromeossubscribe\//).test(url) ? 'chrome os mailing list' :
		   ((/\/fb\/forms\/trademark\//).test(url) ? 'report tm' :
		   ((/\/help\//).test(url)				? 'features' :		// Search Features
		   ((/\/options\//).test(url)			? 'services' :		// Services & Tools	/ Products
		   ((/\/toolbar\//).test(url)			? 'toolbar' :
		   ((/\/ads\/publisher\//).test(url)	? 'publisher' :		// Google for Publishers
		   ((/\/ads\//).test(url)				? 'ads' :			// Advertising Programs
		   ((/\/adsense\//).test(url)			? 'adsense' :
		   ((/\/adwords\//).test(url)			? 'adwords'+((/\/express\//).test(url)?' express':'') :
		   ((/\/doubleclick\//).test(url)		? 'doubleclick' :
		   ((/\/dfp\//).test(url)				? 'doubleclick for publishers' :
		   ((/\/chromebook\//).test(url)		? 'chromebook' :
		   ((/\/nexus\//).test(url)				? ((/\/s\//).test(url) ? 'nexus s' : 'galaxy nexus') :
		   ((/\/offers\//).test(url)			? 'offers' :
		   ((/\/apps\//).test(url)				? 'apps for business' :
		   ((/\/services\//).test(url)			? 'buisness solutions' :
		   ((/\/enterprise\//).test(url)		? 'enterprise' :
		   ((/\/educators\//).test(url)			? 'educators' :		// Google for Educators
		   ((/\/diversity\//).test(url)			? 'diversity' :		// Diversity and Inclusion
		   ((/\/apis\//).test(url)				? 'code' :
		   ((/\/logos\//).test(url)				? 'logos' :
		   ((/\/about\/products\//).test(url)	? 'products' :		// All Google Products
		   ((/\/tools\/feedback\//).test(url)	? 'feedback' :
		   ((/\/press\//).test(url)				? 'press' :			// News from Google
		   ((/\/contact\//).test(url)			? 'contact us' :
		   ((/\/jobs\//).test(url)				? ((/\/students\//).test(url) ? 'students' : 'jobs') :
		   ((/\/permissions\//).test(url)		? 'permissions' :
		   ((/\/privacy\//).test(url)			? 'privacy center' :
		   ((/\/about\//).test(url)				? (/\/corporate\//.test(url)?(/\/company\//.test(url)?'company':'corporate info'):'about') :
		   null)))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
) && isSet(mode)) {
	log('location detected from url','debug');
	if (mode=='service sign-in' && (service = getVars['service']) && isSet(service) && (
		/* Check the query string service parameter */
		mode = (service == 'mail')		   ? 'gmail' :
			  ((service == 'cprose')	   ? 'custom search' :
			  ((service == 'friendview')   ? 'latitude' :
			  ((service == 'cl')		   ? 'calendar' :
			  ((service == 'lh2')		   ? 'photos' :		// Picasa
			  ((service == 'jotspot')	   ? 'sites' :
			  ((service == 'fusiontables') ? 'fusion tables' :
			  ((service == 'blogger')	   ? 'blogger' :
			  ((service == 'orkut')		   ? 'orkut' :
			  ((service == 'health')	   ? 'health' :
			  ((service == 'sierra')	   ? 'checkout' :
			  ((service == 'datasummary')  ? 'dashboard' :
			  ((service == 'places')	   ? 'places' :
			  ((service == 'lbc')		   ? 'places for business' :
			  ((service == 'adsense')	   ? 'adsense' :
			  ((service == 'adwords')	   ? 'adwords' :
			  mode)))))))))))))))
	) && mode!='service sign-in') {log('service detected from query string\'s service parameter','debug'); mode+=' sign-in';}
}
else if (((tbm = hashVars['tbm']) || (tbm = getVars['tbm'])) && isSet(tbm) && (
	/* Tab Mode */
	mode = (tbm=='isch'	) ? 'images' :
		  ((tbm=='vid'	) ? 'videos' :
		  ((tbm=='nws'	) ? 'news search' :
		  ((tbm=='shop'	) ? 'shopping' :
		  ((tbm=='bks'	) ? 'books' :
		  ((tbm=='blg'	) ? 'blogs' :
		  ((tbm=='rcp'	) ? 'recipes' :
		  ((tbm=='pts'	) ? 'patents' :
		  null)))))))
) && isSet(mode)) {log('location detected from tbm parameter');}
else if (isSet(m) && (
	/* check selected tab in Google Bar (minified to conserve space) */
	mode = (m=='web'||m=='la web'||m=='nettet'||m=='ウェブ')?'web':((m=='images'||m=='imágenes'||m=='immagini'||m=='bilder'||m=='billeder'||
			m=='obrázky'||m=='画像')?'images':((m=='videos'||m=='video'||m=='vídeos'||m=='vidéos'||m=='videa'||m=='動画')?'videos':((m=='maps'||
			m=='mapy'||m=='kort'||m=='地図')?'maps':((m=='news'||m=='noticias'||m=='actualités'||m=='zprávy'||m=='ニュース')?'news':((m=='shopping'
			||m=='ショッピング')?'shopping':((m=='translate'||m=='traductor'||m=='traduttore'||m=='traduction'||m=='oversæt'||m=='übersetzer'||
			m=='překladač'||m=='翻訳')?'translate':((m=='books'||m=='libros'||m=='livres'||m=='libri'||m=='bücher'||m=='knihy'||m=='書籍')?'books'
			:((m=='gmail'||m=='google mail')?'gmail':((m=='scholar'||m=='google scholar'||m=='académico')?'scholar':m)))))))))
) && isSet(mode)) {log('location detected from selected tab in navbar');}
else if (((tab = hashVars['tab']) || (tab = getVars['tab'])) && isSet(tab) && tab.length==2) {
	/* Check the Query String "Tab" Parameter
	 *  the tab parameter consists of two letters:
	 *  first:	indicates previous location; referring google service
	 *  second:	indicates the current location/service	 
	 */
	var tab_mode = tab.charAt(1).toLowerCase();
	mode = (tab_mode == 'w') ? 'web' :		// web, patents
		  ((tab_mode == 'i') ? 'images' :
		  ((tab_mode == 'v') ? 'videos' :
		  ((tab_mode == 'l') ? 'maps' :
		  ((tab_mode == 'n') ? 'news' :
		  ((tab_mode == 'f') ? 'shopping' :	// frogle
		  ((tab_mode == 't') ? 'translate' :
		  ((tab_mode == 'p') ? 'books' :
		  ((tab_mode == 'e') ? 'finance' :
		  ((tab_mode == 's') ? 'scholar' :
		  ((tab_mode == 'b') ? 'blogs' :
		  ((tab_mode == '1') ? 'youtube' :
		  ((tab_mode == 'c') ? 'calendar' :
		  ((tab_mode == 'q') ? 'photos' :
		  ((tab_mode == 'o') ? 'documents' :
		  ((tab_mode == 'y') ? 'reader' :
		  ((tab_mode == '3') ? 'sites' :
		  ((tab_mode == 'g') ? 'groups' :
		  ((tab_mode == 'x') ? '+you' :
		  null))))))))))))))))));
	log('location detected via tab parameter');
}
if (!isSet(mode)) {log('Unknown Google Service','error');}
else {
	mode_display_name =
	  ((mode == 'web')			? 'Google Web Search' :
	  ((mode == 'preferences')	? 'Google Preferences (Search Settings)' :
	  ((mode == 'shopping')		? 'Google Shopping (Product Search)' :
	  ((mode == 'publishers')	? 'Google for Publishers' :
	  ((mode == 'educators')	? 'Google for Educators' :
	  'Google '+mode)))));
	log('Location is '+mode_display_name,'info');
}

var hplogo =  document.getElementById('hplogo');
var logocont = document.getElementById('logocont');
log(hplogo ? 'hplogo was detected' : 'hplogo was not found','info');

var gsr = document.getElementById('gsr');
var lga = document.getElementById('lga');
var searchform = document.getElementById('searchform');
var tsf = document.getElementById('tsf');
var instant = isSet(gsr) && isSet(gsr_first = firstSubElem(gsr)) && gsr_first.innerHTML.indexOf('turn off Google Instant')!=-1
			  || isSet(searchform) && isSet(prevElem(searchform)) && prevElem(searchform).innerHTML.indexOf('turn off Google Instant')!=-1;
log(instant ? 'Google instant is enabled' : 'Google instant is disabled','info');

var jhp = getElementsByClassName('jhp')[0];
var lst_ib = document.getElementById('lst-ib');
var hp_instant_layout = (isSet(lst_ib) && (lst_ib.parentNode.className!='ds') && (hasClassName('gsfi',lst_ib) || (hasClassName('gsib_a',lst_ib.parentNode.parentNode) || lst_ib.getAttribute('title')=='Search' && lst_ib.size=='41') || (lst_ib.style.borderStyle=="none") || (isSet(jhp) && (jhp.id=='searchform' || jhp.tagName=='div'))));
log((hp_instant_layout) ? 'detected the hp instant layout' : 'did not detect the hp instant layout','info');

if (hplogo)	// If the homepage is loaded (main logo is present)
{ /* Customize Homepage */
	// Correct Logo and Search Box Spacing
	if (isSet(lga)) {
		lga.removeAttribute('style');
		if (firstSubElem(lga).tagName.toLowerCase() == 'div') {firstSubElem(lga).style.padding = '0px';}
		if (!isSet(document.getElementById('lgpd'))) {
			var lgpd = document.createElement('br');
			lgpd.id = 'lgpd';
			lgpd.setAttribute('clear','all');
			lga.parentNode.insertBefore(lgpd,lga);
		}
		var lga_nextElem = nextElem(lga);
		if (lga_nextElem.tagName.toLowerCase() == 'div') {lga_nextElem.style.height = '126px';}
	}
	if (hplogo) {
		hplogo.style.padding = '28px 0pt 14px 0pt';
		hplogo.style.backgroundPosition = '0% 28px';
	}
	
	if (!hp_instant_layout)
	{
		// Correct the Search-Box's Padding
		addStyle('.lst {padding: 1px 7px !important;}');
	}
	else
	{	/* Correct the hompage layout */
		var tsf_p = getElementsByClassName('tsf-p')[0];
		if (isSet(tsf_p)) {tsf_p.style.padding = '0px';}
		
		// Use standard page layout when Google uses a different logo
		var hplogo_bg = hplogo.style.backgroundImage;
		if ( !((hplogo.width=='275' && hplogo.height=='95') || (hplogo.style.width=='275px' && hplogo.style.height=='95px'))
			 && !(  (/\/images\/srpr\/logo\dw\.(png|gif)/).test(hplogo.src) || (/\/images\/srpr\/logo\dw\.(png|gif)/).test(hplogo_bg)
				 || (/\/logos\/201\d\/logo-hp\.(png|gif)/).test(hplogo.src) || (/\/logos\/201\d\/logo-hp\.(png|gif)/).test(hplogo_bg) )) {
			if (!(/as_qdr=all/).test(document.location.href)) {
				if ((/\?(.*)=(.*)/).test(document.location.href)) {
					window.location.replace(window.location+"&as_qdr=all");
				} else {window.location.replace(window.location+"?as_qdr=all");}
			}
		}
		// Position the tsf (Top Search Form)
		else if (isSet(tsf) && tsf.name == 'f') {
			addStyle(
				  'div#searchform {'
				+ '    padding-bottom: 0px;'
				+ '}'
				+ '#als, #prm br {display: none;}'
				+ 'div#searchform.jhp form#tsf {'
				+ '    height: 0px; overflow: visible;'
				+ '}'
				+ '#searchform.jhp #tsf td div#sfopt {'
				+ '    display: none;'
				+ '}'
			);
			tsf.style.width = 'auto';
			tsf.style.minWidth = '817px';
			tsf.style.maxWidth = '1181px';
			tsf.style.position = 'relative';
			if (prevElem(searchform)!=lga) {
				tsf.style.top = '-92px';
			}
			tsf.style.padding = '0px';
		}
	}
	
	try {
	
	// Remove the "Advanced Search" and "Translation Tools" entries from the pull-down menu
	var adv_srch = nextElem(nextElem(firstSubElem(firstSubElem(firstSubElem(document.getElementById('gbd5'))))));
	var trans_tool = nextElem(adv_srch);
	adv_srch.parentNode.removeChild(adv_srch);
	trans_tool.parentNode.removeChild(trans_tool);
	
	// Restore the "Advanced Search" and "Translation Tools" links to the right of the search box
	if (hp_instant_layout) {
		var sb_table = firstSubElem(nextElem(logocont));
		var sb_table_firstElem = firstSubElem(sb_table);
	}
	var ctr_td = (!hp_instant_layout && isSet(source = document.getElementsByName('source')[0])) ? source.parentNode : ((isSet(sb_table_firstElem)) ? ( (sb_table_firstElem.tagName == 'tbody') ? firstSubElem(firstSubElem(firstSubElem(sb_table_firstElem))) : firstSubElem(firstSubElem(sb_table_firstElem)) ) : null );
	if (isSet(ctr_td)) {
		var ltd = document.createElement('td');
		var rtd = document.createElement('td');
		if (hp_instant_layout) {ctr_td.removeAttribute('width');}
		ltd.id = 'ltd';
		ltd.setAttribute('width','25%');
		ltd.innerHTML = '&nbsp;';
		rtd.id = 'rtd';
		rtd.className = 'fl sblc';
		rtd.width ='25%';
		rtd.align = 'left';
		rtd.setAttribute('nowrap','')
		rtd.innerHTML = '<a href="/advanced_search?hl=en">Advanced search</a><a href="/language_tools?hl=en">Language tools</a>';
		ctr_td.parentNode.insertBefore(ltd,ctr_td);
		ctr_td.parentNode.appendChild(rtd);
	}
	
	} catch(e) {unsafeWindow.console.log(e);}
	
	addStyle('.ctr-p {margin: 0 auto; min-width: 817px;}');
	
	// Style the search buttons
	addStyle(
		  'span.lsbb input.lsb {'
		+ '    border: medium none;'
		+ '    margin: 0px;'
		+ '}'
		+ 'span.lsbb input.lsb, div.jsb center input[type="submit"],'
		+ '.jhp input[type="submit"], .gssb_c input, .gac_bt input {'
		+ '    background: url("/images/srpr/nav_logo73.png") repeat scroll center bottom transparent;'
		+ '    color: #000000;'
		+ '    cursor: pointer;'
		+ '    font: 15px arial,sans-serif;'
		+ '    height: 30px;'
		+ '    outline: 0px none;'
		+ '    vertical-align: top;'
		+ '}'
		+ 'input[type="submit"].lsb:hover {'
		+ '    border: 0px none;'
		+ '}'
		+ 'div.jsb center input[type="submit"],'
		+ '.jhp input[type="submit"], .gssb_c input, .gac_bt input {'
		+ '    border-color: #CCCCCC #999999 #999999 #CCCCCC;'
		+ '    border-style: solid;'
		+ '    border-width: 1px;'
		+ '    height: 30px;'
		+ '    margin: 7px 5px;'
		+ '}'
		+ 'form {'
		+ '    margin: 0px;'
		+ '}'
		+ 'form[name="f"] {'
		+ '    margin-bottom: 20px;'
		+ '    margin-top: 18px;'
		+ '}'
	);
	
	/*** Correct Footer ***/
	var footer = document.getElementById('footer');
	if (isSet(footer)) {footer.innerHTML = '<center id="fctr" style="opacity: 1;"><div style="font-size: 10pt;"><div style="margin: 19px auto; text-align: center;" id="fll"><a href="http://www.google.com/intl/en/ads/">Advertising&nbsp;Programs</a><a href="http://www.google.com/services/">Business Solutions</a><a href="http://www.google.com/intl/en/about.html">About Google</a></div></div><p style="color: rgb(118, 118, 118); font-size: 8pt;">&copy; 2011 - <a href="http://www.google.com/intl/en/privacy.html">Privacy</a></p></center><div id="flci"><a id="cp-sol" href="javascript:void(0)">Change background image</a></div>';}
	addStyle(
		  '#footer a {'
		+ '    color: #2200C1;'
		+ '    margin: 0px;'
		+ '}'
		+ '.ftl, #fll a {'
		+ '    display: inline-block;'
		+ '    margin: 0px 12px;'
		+ '}'
		+ '#fll {'
		+ '    display: block;'
		+ '}'
		+ 'body #footer > div {'
		+ '    border: 0px none;'
		+ '    padding-top: 3px;'
		+ '    width: auto;'
		+ '}'
		+ '#ftby a#cp-sol, #flci a#cp-sol, div#cpNavTextWrapper {'
		+ '    position: fixed !important;'
		+ '    bottom: 0px;'
		+ '    left: 0px;'
		+ '    padding: 12px;'
		+ '}'
	);
}

var reposition_tsf = function (e,r,u,d) {
	if (u) {
		var key = (e.which) ? e.which : e.keyCode;
		if (!(key==8 || key==13 || key==32 || key==46 || (key>=48 && key<=57) 
			|| key==59 || (key>=65 && key<=90) || (key>=96 && key<=111) 
			|| (key>=186 && key<=192) || (key>=219 && key<=223) || key==226))
		{if((!r && key!=27) || r) {return false;}}
	}
	if (r) { try {
		var ltd = document.getElementById('ltd');
		var rtd = document.getElementById('rtd');
		if(isSet(ltd)) ltd.parentNode.removeChild(ltd);
		if(isSet(rtd)) rtd.parentNode.removeChild(rtd);
		// Position the tsf (Top Search Form)
		var tsf = document.getElementById('tsf');
		var tsf_p = getElementsByClassName('tsf-p')[0];
		var searchform = (document.getElementById('searchform')) ? document.getElementById('searchform')
																 : document.getElementById('sfcnt');
		var subform_ctrl = document.getElementById('subform_ctrl');	// contains result-stats
		var sfbg = getElementsByClassName('sfbg nojsv')[0];	// search-form gray bg
		var logocont = document.getElementById('logocont');
		var srch_bx_cnt = nextElem(logocont);
		var srch_bx = firstSubElem(srch_bx_cnt);
		var sftab = document.getElementById('sftab');
		var main = document.getElementById('main');
		main.style.maxWidth = '1219px';
		searchform.style.margin = '17px 0px 0px 0px';
		searchform.style.maxWidth = '1219px';
		searchform.style.minWidth = '780px';
		searchform.style.position = 'static';
		if (isSet(sfbg)) {sfbg.parentNode.removeChild(sfbg);}	// remove the search form's gray background
		logocont.style.float = 'left';
		logocont.style.margin = '-7px 0px 0px 0px';
		logocont.style.padding = '0px 18px 0px 12px';
		srch_bx_cnt.id = 'qbc';		// query box container
		srch_bx_cnt.style.padding = '0px 0px 2px 0px';
		srch_bx_cnt.style.margin = '0px 272px 2px 168px';
		srch_bx_cnt.style.maxWidth = '711px';
		srch_bx.style.padding = '8px 0px 0px 0px';
		tsf.style.width = 'auto';
		tsf.position = 'static';
		tsf.style.top = 'auto';
		tsf.style.maxWidth = '1144px';
		tsf.style.minWidth = '910px';
		tsf_p.style.marginRight = '0px';
		tsf_p.style.maxWidth = 'none';
		if (mode!='images') {
			tsf.style.margin = '0px auto';
		}
		sftab.parentNode.parentNode.parentNode.style.borderBottom = '0px none';
		getElementsByClassName('tsf-p')[0].style.padding = '0px';
		document.getElementById('sblsbb').style.margin = '0px';
		if ( isSet(subform_ctrl) && isSet(subform_ctrl.firstChild)
		  && isSet(subform_ctrl.firstChild.nextSibling) ) {
			subform_ctrl.style.display = 'block';
			if (mode=='images') {
				subform_ctrl.style.marginRight = '269px';
				subform_ctrl.style.minWidth = '469px';
				subform_ctrl.style.minHeight = '0px';
				subform_ctrl.style.height = '0px';
				subform_ctrl.style.overflow = 'visible';
			}
		}
		window.scrollTo(0,0);
	} catch(e) {log(e,'warn'); log('endGroup'); return false;} }
	var sflas = document.getElementById('sflas');	// Search Form Link Advanced Search
	if (isSet(sflas) && sflas.parentNode.id == 'bfl') {
		var ksfcccl = document.createElement('div');
		ksfcccl.className = 'ksfcccl';
		ksfcccl.innerHTML = '<div style="float: right;" class="ksfccl"></div>';
		var nossln = document.getElementById('nossln');
		if (isSet(nossln) && nossln.innerHTML=='')
		{nossln.parentNode.insertBefore(ksfcccl,nossln); nossln.parentNode.removeChild(nossln);}
		else if (isSet(subform_ctrl)) {subform_ctrl.parentNode.insertBefore(ksfcccl,subform_ctrl);}
		var ksfccl = getElementsByClassName('ksfccl',ksfcccl)[0];
		ksfccl.appendChild(sflas);
	}
	if (typeof(d)=="number" && d>0) {	// delay
		window.setTimeout(hide_sform,200);
		window.setTimeout(adjust_sidebar,d);
		window.setTimeout(relocate_url,d);
	}
	else {
		hide_sform();
		adjust_sidebar();
		relocate_url();
	}
	return true;
};


if (mode=='images') {
	addStyle(
		+ '.sfbgg {'
		+ '    background: none repeat scroll 0 0 #FFFFFF;'
		+ '    border-bottom: 0px none;'
		+ '    height: 71px;'
		+ '}'
	);
	if (getVars['sout']=='1') {
		addStyle(
			  'html body {'
			+ '    max-width: 1219px;'
			+ '}'
			+ 'table#mn {'
			+ '    margin: 0px auto;'
			+ '    max-width: 1144px;'
			+ '    min-width: 780px;'
			+ '    width: auto;'
			+ '    table-layout: auto;'
			+ '}'
			+ 'table#mn > tbody > tr > td, table#mn > tr > td {'
			+ '    width: auto;'
			+ '}'
			+ 'form#tsf, div#subform_ctrl {'
			+ '    max-width: 711px;'
			+ '}'
			+ 'table#mn div#subform_ctrl {'
			+ '    display:block;'
			+ '}'
			+ 'table#mn #leftnav {'
			+ '    margin-left: 0px;'
			+ '    width: 151px !important;'
			+ '    padding-left: 4px;'
			+ '    padding-top: 3px;'
			+ '}'
			+ '.mitem {'
			+ '    width: 143px;'
			+ '}'
			+ 'a.fl, .flc a {'
			+ '    white-space: nowrap;'
			+ '}'
		);
	}
}


if (mode == 'web' || mode=='images' || mode == 'videos' || mode == 'news search' || mode=='books' || mode=='blogs' || mode=='recipes' || mode=='shopping')
{
	if (instant)
	{
		var XMLHttpRequest = (isSet(unsafeWindow.XMLHttpRequest.prototype)) ? unsafeWindow.XMLHttpRequest
			/* else if (!isSet(unsafeWindow.XMLHttpRequest.prototype)) */	: unsafeWindow.XMLHttpRequest.wrappedJSObject;
		
		// track Google's XMLHttpRequests to determine when results have loaded
		(function(open) {
			XMLHttpRequest.prototype.open = function(method, url, async, user, pass)
			{
				this.addEventListener("readystatechange", function() {
					if (this.readyState == 4 && this.status == 200) {
						log('this.readyState == 4 && this.status == 200 => true','success');
						window.setTimeout(hide_sform,200);
						window.setTimeout(relocate_url,500);
						window.setTimeout(adjust_sidebar,100);
					}
				}, false);
				if (async == undefined) {async = true;}
				open.call(this, method, url, async, user, pass);
			};
		})(XMLHttpRequest.prototype.open);
		
		if (mode != 'shopping')
		{
			var lst_ib = document.getElementById('lst-ib');	// Input-Bar
			if (!lst_ib) {log('lst-ib was not found','error');}
			
			if (typeof(lst_ib.addEventListener) == "function")
			{
				if (!hp_instant_layout && instant) {
					lst_ib.addEventListener('keydown',function (e) {
						var key = (e.which) ? e.which : e.keyCode;
						if (key==13)
						{
							window.setTimeout(function(){reposition_tsf(0,1,0,500)},500);
							lst_ib.addEventListener('keydown',function (e) {
								var key = (e.which) ? e.which : e.keyCode;
								if (key==13) {reposition_tsf(0,0,0,200);}
							},false);
							this.removeEventListener('keydown',arguments.callee,false);
						}
					},false);
				}
				else {
					lst_ib.addEventListener('keydown',function (e) {
						if (reposition_tsf(e,1,1,500))
						{
							lst_ib.addEventListener('keydown',function (e) {
								var key = (e.which) ? e.which : e.keyCode;
								if (key==13) {reposition_tsf(0,0,0,200);}
							},false);
							this.removeEventListener('keydown',arguments.callee,false);
						}
					},false);
				}
			}
			else {log('event listener could not be attached','exception');}
		}
		var count = 0;
		window.setTimeout(function tsf_fix() {
			if (!isSet(document.getElementById('hplogo')))
			{count = undefined; reposition_tsf(0,1,0);}
			else if (!(count>3))
			{count++; window.setTimeout(tsf_fix,450);}
		},150);
	} else {
		/* Add Input-Bar Keydown Event Listener */
		if (mode != 'shopping')
		{
			if (!isSet(lst_ib)) {log('lst-ib was not found','warn');}
			
			log('About to attach event listener to lst_ib','debug');
			// Adds an event listener that removes itself after it has fired once
			if (isSet(lst_ib) && typeof(lst_ib.addEventListener) == "function") {
				lst_ib.addEventListener('keydown',function (e) {
					log('lst_ib keydown event fired','info');
					key = (e.which) ? e.which : e.keyCode;
					if (key==13) {
						window.setTimeout(function(){reposition_tsf(0,1,0,500)},500);
						lst_ib.addEventListener('keydown',function (e) {
							log('lst_ib keydown event fired','info');
							key = (e.which) ? e.which : e.keyCode;
							if (key==13) {reposition_tsf(0,0,0,200);}
						},false);
						this.removeEventListener('keydown',arguments.callee,false);
					}
				},false);
			}
			else {log('event listener could not be attached','exception');}
		}
	}
}
else if (isSet(tsf) && mode=='images' && !(getVars['sout']=='1' && mode=='images'))
{
	var XMLHttpRequest = (isSet(unsafeWindow.XMLHttpRequest.prototype)) ? unsafeWindow.XMLHttpRequest
		/* else if (!isSet(unsafeWindow.XMLHttpRequest.prototype)) */	: unsafeWindow.XMLHttpRequest.wrappedJSObject;
	
	// track Google's XMLHttpRequests to determine when results have loaded
	(function(open) {
		XMLHttpRequest.prototype.open = function(method, url, async, user, pass)
		{
			if ((/\/search\?/).test(url))
			{
				log('(/\/search\?/).test(url) => true;  attaching \'readystatechange\' event listener to XMLHttpRequest call','debug');
				this.addEventListener("readystatechange", function() { if (this.readyState == 4 && this.status == 200) {
					log('this.readyState==4 && this.status==200 => true','success');
					reposition_tsf(0,1,0);
					gsr_logo_fix();
				} }, false);
			}
			if (async == undefined) {async = true;}
			open.call(this, method, url, async, user, pass);
		};
	})(XMLHttpRequest.prototype.open);
}


if ((!hplogo || instant) && !(getVars['sout']=='1' && mode=='images'))
{
	// Remove the search form's grey background
	var sfbg = getElementsByClassName('sfbg nojsv')[0];
	if (sfbg) {sfbg.parentNode.removeChild(sfbg);}
	addStyle('#logo img {background: none transparent;} #logo {font-size: 0; color: transparent;}');
	
	if (mode=='web' || mode=='images' || mode=='videos' || mode=='news search' || mode=='shopping' || mode=='books' || mode=='blogs' || mode=='recipes' || mode=='patents')
	{
		var sform = document.getElementById('sform');	// remaining legacy search-form element
		if (isSet(sform) && !isSet(sform.firstChild)) {
			addStyle('#sform {display: none;}');
		}
		
		function hide_sform() {
			var sform = document.getElementById('sform');	// remaining legacy search-form element
			return (isSet(sform) && !isSet(sform.firstChild) && (sform.style.display='none')=='none');
		}
		
		// Fix the pages's layout spacing
		addStyle(
			  '#arcntc {'
			+ '    margin-bottom: 0px;'
			+ '}'
			+ '.ksfcccl {'
			+ '    min-height: 0.01%;'
			+ '    min-width: 910px;'
			+ '    width: auto;'
			+ '}'
			+ '.ksfccl {'
			+ '    margin-right: 265px;'
			+ '    z-index: 200;'
			+ '}'
			+ 'div.sfcc {'
			+ '    width: auto;'
			+ '    max-width: none;'
			+ '}'
			+ '#subform_ctrl {'
			+ '    font-size: 11px;'
			+ '    margin-left: 176px;'
			+ '    margin-right: 269px;'
			+ '    max-width: 703px;'
			+ '    min-height: 26px;'
			+ '    padding-top: 1px;'
			+ '}'
			+ '#leftnav, #cnt.big #leftnav {'
			+ '    margin-left: 0px;'
			+ '    width: 151px !important;'
			+ '    padding-left: 4px;'
			+ '    padding-top: 3px;'
			+ '    position: absolute !important;'
			+ '    top: 0px !important;'
			+ '}'
			+ '#center_col {'
			+ '    border-left: 1px solid #D3E1F9;'
			+ '    clear: both;'
			+ '}'
			+ '#center_col, #foot, #cnt.big #center_col, #cnt.big #foot {'
			+ '    margin-left: 159px;'
			+ '    padding: 0 8px;'
			+ '}'
			+ '#main #cnt, #cnt {'
			+ '    margin: 0 auto;'
			+ '    max-width: 1144px;'
			+ '    min-width: 780px;'
			+ '    padding-top: 0px;'
			+ '}'
			+ 'div#topstuff p.sp_cnt {'
			+ '    margin-top: 0px;'
			+ '}'
		);
		
		if (mode=='images' && getVars['sout']!='1') {
			addStyle('#rcnt {margin-top: 35px;}');
		} else {
			addStyle('#rcnt {margin-top: 0px;}');
		}
		
		function gsr_logo_fix() {
			// Adjust the search-results-page logo
			var logo = document.getElementById('logo');
			if (logo != null) {
				var logo_img = firstSubElem(logo);
				if (logo_img != null && logo_img.tagName.toLowerCase() == 'img' && logo_img.src.search(/nav_logo\d{2,3}\.png/i) != -1)
				{
					logo_img.src = 'http://www.google.com/images/srpr/nav_logo73.png';
					logo_img.width = '167';
					logo_img.height = '288';
					logo_img.style.position = 'absolute';
					logo_img.style.left = '0px';
					logo_img.style.top = '-41px';
					logo.style.height = '49px';
					logo.style.width = '137px';
					addStyle('#logo {margin: 9px 0px 0px 0px;}');
				}
			}
		}
		gsr_logo_fix();
	}
	
	// Restore the sidebar's layout
	addStyle(
		  '.tbos, .tbots, .tbotu {'
		+ '    color: #000000;'
		+ '}'
		+ '.msel {'		// Selected Mode
		+ '    color: #FFFFFF;'
		+ '    font-weight: bold;'
		+ '    background-color: #3366fe;'
		+ '}'
		+ 'li.msel div.kls, li.mitem a.kl,'
		+ '#cnt.big li.msel div.kls, #cnt.big li.mitem a.kl {'
		+ '    border: 0px none;'
		+ '    padding: 0px;'
		+ '}'
		+ '.mitem {'	// Mode Items
		+ '    margin-bottom: 2px;'
		+ '}'
		+ '.mitem, #showmodes {'
		+ '    font-size: 15px;'
		+ '    line-height: 25px;'
		+ '}'
		+ 'li.mitem.msel:hover, li.msel div.kls:hover {'
		+ '    background-color: #1A54E1;'
		+ '}'
		+ 'li.mitem:hover, li.mitem a.kl:hover, #showmodes:hover {'
		+ '    background-color: #EFF3FB;'
		+ '}'
		+ '#leftnav h2 {'
		+ '    color: #000000;'
		+ '    font-weight: bold;'
		+ '}'
		+ '.mitem > .kl, #ms > .kl {'
		+ '    color: #2200C1;'
		+ '}'
		+ '.mitem > .kl, #ms > .kl, .msel {'
		+ '    font-size: 15px;'
		+ '}'
		+ '#lc a, .tbou > a.q, #tbpi, #tbtro,'
		+ '#swr a, #set_location_section a,'
		+ '#prc_opt, .tbtctlabel, .tbt label {'
		+ '    color: #2200C1;'
		+ '}'
		+ '.micon {'	// Mode Icons
		+ '    background-image: url("http://www.google.com/images/srpr/nav_logo73.png");'
		+ '    float: left;'
		+ '    height: 19px;'
		+ '    margin-right: 6px;'
		+ '    margin-top: 2px;'
		+ '    outline: none;'
		+ '    width: 19px;'
		+ '}'
		+ '#showmodes .micon {'		// Show More Modes Icon
		+ '    background-position: -150px -114px;'
		+ '}'
		+ '.open #showmodes .micon {'
		+ '    background-position: -131px -114px;'
		+ '}'
	);
	
	/*** Correct the left margin of the sidbar's modes and search options ***/
	addStyle(
		  'div.lhshdr {'
		+ '    left: auto !important;'
		+ '}'
		+ '.mitem, #showmodes {'		// Mode Items, Show More Modes Link
		+ '    padding-left: 8px !important;'
		+ '}'
		+ '#showmodes .micon {'			// Show More Modes Icon
		+ '    height: 17px;'
		+ '    margin-left: 1px;'
		+ '    margin-right: 7px;'
		+ '    width: 17px;'
		+ '}'
		+ '#leftnav #bms,'				// Below Mode Section
		+ '#cnt.big #leftnav #bms {'
		+ '    margin-left: 0px;'
		+ '}'
		+ '.lnsep {'					// Line Seperator
		+ '    margin: 14px 4px 14px 0px;'
		+ '    border-bottom: 1px solid #C9D7F1;'
		+ '}'
		+ '#leftnav div#lc {'			// Location Container
		+ '    margin-left: 0px !important;'
		+ '}'
		+ 'ul.tbd, .tbd {'				// Toolbelt
		+ '    margin-bottom: 14px;'
		+ '}'
		+ 'ul.tbt, .tbt {'				// Toolbelt Section
		+ '    margin-left: 0px;'
		+ '    margin-bottom: 14px !important;'
		+ '}'
		+ 'a#tbpi {'					// Toggle Search Tools Link
		+ '    margin-left: 8px !important;'
		+ '    display: inline !important;'
		+ '}'
	);
	addStyle(
		  '#showmodes span#showmodes_icon {'
		+ '    display: block;'
		+ '    background-position: -150px -114px;'
		+ '    background-image: url("http://www.google.com/images/srpr/nav_logo73.png");'
		+ '}'
		+ '.open #showmodes span#showmodes_icon {'
		+ '    background-position: -131px -114px;'
		+ '}'
		+ '#showmodes .micon {'
		+ '    display: none;'
		+ '}'
	);
	addStyle(
		// Everything icon
		  'li.msel div.kls span.micon[style~="background-position:"][style~="0"][style~="-132px;"] {'
		+ '    background-position: -20px -132px !important;'
		+ '}'
		// Images icon
		+ 'li.msel div.kls span.micon[style~="background-position:"][style~="-40px"][style~="-132px;"] {'
		+ '    background-position: -60px -132px !important;'
		+ '}'
		// Videos Icon
		+ 'li.msel div.kls span.micon[style~="background-position:"][style~="-80px"][style~="-132px;"] {'
		+ '    background-position: -100px -132px !important;'
		+ '}'
		// News Icon
		+ 'li.msel div.kls span.micon[style~="background-position:"][style~="-120px"][style~="-132px;"] {'
		+ '    background-position: -140px -132px !important;'
		+ '}'
		// Shopping Icon
		+ 'li.msel div.kls span.micon[style~="background-position:"][style~="-120px"][style~="-152px;"] {'
		+ '    background-position: -140px -152px !important;'
		+ '}'
		// Books Icon
		+ 'li.msel div.kls span.micon[style~="background-position:"][style~="-40px"][style~="-152px;"] {'
		+ '    background-position: -60px -152px !important;'
		+ '}'
		// Places Icon
		+ 'li.msel div.kls span.micon[style~="background-position:"][style~="-80px"][style~="-152px;"] {'
		+ '    background-position: -100px -152px !important;'
		+ '}'
 		// Blogs Icon
		+ 'li.msel div.kls span.micon[style~="background-position:"][style~="0"][style~="-152px;"] {'
		+ '    background-position: -20px -152px !important;'
		+ '}'
 		// Realtime Icon
		+ 'li.msel div.kls span.micon[style~="background-position:"][style~="-40px"][style~="-172px;"] {'
		+ '    background-position: -60px -172px !important;'
		+ '}'
		// Discussions Icon
		+ 'li.msel div.kls span.micon[style~="background-position:"][style~="0"][style~="-172px;"] {'
		+ '    background-position: -20px -172px !important;'
		+ '}'
		// Recipes Icon
		+ 'li.msel div.kls span.micon[style~="background-position:"][style~="-120px"][style~="-172px;"] {'
		+ '    background-position: -140px -172px !important;'
		+ '}'
		// Patents Icon
		+ 'li.msel div.kls span.micon[style~="url(\\"http://www.google.com/images/srpr/icons/patents.png\\")"] {'
		+ '    background-position: -20px 0px !important;'
		+ '}'
	);
	function adjust_sidebar()
	{
		var lc = document.getElementById('lc');		// "Location" Section
		var swr = document.getElementById('swr');	// "Something Different" Section
		var tbpi = document.getElementById('tbpi');
		var tbt = getElementsByClassName('tbt',document.getElementById('tbd'));	// Toolbelt Sections
		
		if (lc) {lc.style.marginLeft = '25px';}
		if (tbpi) {tbpi.style.marginLeft = '33px';}
		if (swr) {
			prevElem(swr).style.color = '#000000';
			prevElem(swr).style.marginLeft = '0px';
			swr.style.marginLeft = '8px';
		}
		// Restore the sidebar's icons
		log('now restoring the sidebar icons','info');
		var mitems = getElementsByClassName('mitem',document.getElementById('ms'));	// mode items
		var showmodes = document.getElementById('showmodes');
		
		if (isSet(showmodes) && !isSet(document.getElementById('showmodes_icon'))) {
			var micon = document.createElement('span');
			micon.id = 'showmodes_icon';
			micon.className = 'micon';
			showmodes.insertBefore(micon,firstSubElem(showmodes));
		}
		
		var maps_icon = "data:image/png;base64,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";
		var flights_icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAARtJREFUeNqs1DFLw1AUBeCA0MnJSSh0KgScHM8g9AcUCp0KrsKZ+gNcnZyETl2dBH+AIHR1cip0EgpynAShk1AQCnF5gcvzvryUOrwh3JsvyT2XFKCKA04JagGqArU+BLoA9R2gCtT7f0EVqNu62AX1AmoGahKu94GWoI7rhllUrEB9gHoENQV1ZqCtA52AKmrsymmKz6YJslgBqgfqIQMmoRizM1lmoHUMpTD76Z8J7M27pwkbZOZ42hYbtAjk0sNGoIZmtzxo5ezW3MN2puGrIf5r5wF/sDmonxbxd0KKdW2XWo2+s2Ne/MOoZ9QUwNg0vibCeTI9N7k0n0PjFtSRU++bOd/lsHPTXCbebpJaDe/ch5mV+/znfgcAVvitmo1naBQAAAAASUVORK5CYII=";
		var apps_icon = "data:image/png;base64,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";
		
		for (m=0; m<mitems.length; m++)
		{
			var childElem = firstSubElem(mitems[m]);
			
			if (isSet(childElem) && hasClassName('kl',childElem) || hasClassName('kls',childElem)) {
				var kl_text = childElem.innerHTML;	// mode link text
				var icon =	// mode icon
					((kl_text == 'Everything'	) ? '<span style="background-position: 0px -132px;" class="micon"></span>' :
					((kl_text == 'Images'		) ? '<span style="background-position: -40px -132px;" class="micon"></span>' :
					((kl_text == 'Maps'			) ? '<span style="background-image:url(\''+maps_icon+'\'); background-position: 0px 0px" class="micon"></span>' :
					((kl_text == 'Videos'		) ? '<span style="background-position: -80px -132px;" class="micon"></span>' :
					((kl_text == 'News'			) ? '<span style="background-position: -120px -132px;" class="micon"></span>' :
					((kl_text == 'Shopping'		) ? '<span style="background-position: -120px -152px;" class="micon"></span>' :
					((kl_text == 'Books'		) ? '<span style="background-position: -40px -152px;" class="micon"></span>' :
					((kl_text == 'Places'		) ? '<span style="background-position: -80px -152px;" class="micon"></span>' :
					((kl_text == 'Blogs'		) ? '<span style="background-position: 0px -152px;" class="micon"></span>' :
					((kl_text == 'Realtime'		) ? '<span style="background-position: -40px -172px;" class="micon"></span>' :
					((kl_text == 'Discussions'	) ? '<span style="background-position: 0px -172px;" class="micon"></span>' :
					((kl_text == 'Flights'		) ? '<span style="background-image:url(\''+flights_icon+'\'); background-position: 0px 0px" class="micon"></span>' :
					((kl_text == 'Recipes'		) ? '<span style="background-position: -120px -172px;" class="micon"></span>' :
					((kl_text == 'Applications'	) ? '<span style="background-image:url(\''+apps_icon+'\'); background-position: 0px 0px" class="micon"></span>' :	// [+] in 1.9f
					((kl_text == 'Patents'		) ? '<span style="background:url(\'http://www.google.com/images/srpr/icons/patents.png\') 0px 0px;" class="micon"></span>' :
					'')))))))))))))));	if (icon=='') {log('mode link text did not match','warn');}
				
				childElem.innerHTML = icon + kl_text;	// Place the icon in the mode item
			} else {log('mitem child element did not match','warn')};
		}
		
		// Change the color of the Toolbelt Option Section's Header-text
		for (s=0; s<tbt.length; s++) {
			for (i=0; i<tbt[s].childNodes.length; i++) {
				child = tbt[s].childNodes.item(i);
				if (child.nodeType == 1 && child.tagName.toLowerCase() == 'li') {
					if ( child.style.color.toLowerCase() == 'rgb(209, 72, 54)'
						 || child.style.color.toUpperCase() == '#D14836'  ) {
						child.style.color = '#000000';
					} break;
				}
			}
		}
	}
	
	// adjust spacing of search results
	var center_col = document.getElementById('center_col');
	var g = getElementsByClassName('g',center_col);
	for (c=0; c<g.length; c++) {
		if (g[c].style.marginBottom != '') {g[c].style.marginBottom = '10px';}
	}
	addStyle(
		  'li.g {'
		+ '    margin-bottom: 18px;'
		+ '}'
		+ '.mbl {'
		+ '    margin-top: 5px;'
		+ '}'
	);
	
	function relocate_url()
	{ try {
		// Place the url below the search text
		var center_col = document.getElementById('center_col');
		var res_ts_tbl = getElementsByClassName('ts',center_col);	// table with class "ts"
		var res_st_spn = getElementsByClassName('st',center_col);	// span with class "st" (snippet text)
		var rbt_divs = getElementsByClassName('rbt',center_col);												// [+] in 1.9
		var osl_divs = getElementsByClassName('osl',center_col);	// divs with class "osl" (other science links)	// [+] in 1.9
		var bl_spans = getElementsByClassName('bl',center_col);		// "Show stock quote for <ticker> - Filter"	// [+] in 1.9
		var res_text = res_ts_tbl;
		var myPrevElem;
		
		for (l=0; l<5; l++) {
			for (i=0; i<res_text.length; i++) {
				myPrevElem = prevElem(res_text[i]);
				while (isSet(myPrevElem) && !(hasClassName('kv',myPrevElem) || hasClassName('kvm',myPrevElem)))
				{myPrevElem = prevElem(myPrevElem);}
				if (isSet(myPrevElem) && (hasClassName('kv',myPrevElem) || hasClassName('kvm',myPrevElem)))
				{res_text[i].parentNode.insertBefore(res_text[i],myPrevElem);}
			}
			if (l==0) {res_text = res_st_spn;}
			else if (l==1) {res_text = rbt_divs;}
			else if (l==2) {res_text = osl_divs;}
			else if (l==3) {res_text = bl_spans;}
		}
	} catch(e) {log(e,'warn');} }
	
	if (!instant && (mode=='web' || mode=='images' || mode=='videos' || mode=='news search' || mode=='recipes' || mode=='patents')) {
		reposition_tsf(0,1,0);
	}
	else if (mode=='maps') {
		// Hide the loading message
		addStyle('div.messagehtml#loadmessagehtml {display:none;}');
		
		// Remove Gray Background
		addStyle(
			  'div#search div.skunk-head {'
			+ '    padding-top: 1px;'
			+ '}'
			+ 'div#search div.skunk-head, div#search div.cntrl {'
			+ '    background-color: #FFFFFF;'
			+ '    border-top: 0px none;'
			+ '}'
			+ 'div#search div.cntrl {'
			+ '    padding: 15px 0px 15px 0px;'
			+ '}'
			+ 'div#search div.q_d_container {'
			+ '    -moz-box-shadow: 0px 1px 1px rgba(0,0,0,0.1) inset;'
			+ '}'
		);
	}
	else if (mode=='news') {
		var glogo = (kd_appswitcher = document.getElementById('kd-appswitcher')) ? firstSubElem(kd_appswitcher) : null ;
		if (glogo != null) {
			glogo.removeAttribute('class');
			glogo.innerHTML = '<img width="171" height="40" alt="Google News" src="http://www.gstatic.com/news/img/logo/en_us/news.gif">';
			addStyle(
				  'div#kd-googlebar {'
				+ '    overflow: visible;'
				+ '    border-color: #FFFFFF;'
				+ '    border-style: solid;'
				+ '    border-width: 2px 2px 0px 2px;'
				+ '}'
				+ 'div#kd-appswitcher {'
				+ '    border: 1px solid #FFFFFF;'
				+ '}'
				+ 'div#page-header div#kd-appswitcher img {'
				+ '    margin-top: 8px;'
				+ '}'
			);
		}
	}
	else if (mode=='blogs') {
		addStyle(
			  'div#sbds.ds div#sblsbb.kpbb input[name="btnG"], .tsf-p .lsb:active {'
			+ '    box-sizing: border-box;'
			+ '    -moz-box-sizing: border-box;'
			+ '    -webkit-box-sizing: border-box;'
			+ '    padding: 0px;'
			+ '    margin: 0px;'
			+ '    border: 0px none;'
			+ '    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDJCNEUwNzM4OTY0MTFFMEE0MDNEODlCOThCNUNBOTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDJCNEUwNzQ4OTY0MTFFMEE0MDNEODlCOThCNUNBOTgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MkI0RTA3MTg5NjQxMUUwQTQwM0Q4OUI5OEI1Q0E5OCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MkI0RTA3Mjg5NjQxMUUwQTQwM0Q4OUI5OEI1Q0E5OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Po7ONFMAAADISURBVHjanFJBCsIwEFzrF7z04h9E/Efx5MEHePHmr4T6hFLwF6G/sKW0lLixEwh1AtGB6SaZne22G7HWCrhT1sqXneHiE+fC6BcX5Wg5RujU7CoPSDTKs3KLaHA+sA7co0JCE2mvgV4xcwuxiJgL6C0zTxDziDmHPi21TER6mbEXDn/efykYT8o316ztQzAm93dPyg2iCUZ2/WfOIe7M7DtwN6pDYof9LVZAYldvwZIVSDXTApmk46h8BPv16vP631D6Ym8BBgAsamp63yCdlAAAAABJRU5ErkJggg==") no-repeat center center transparent;'
			+ '    color: transparent;'
		);
	}
	else if (mode=='accounts') {
		var link_google = document.getElementById('link-google');
		var link_signup = document.getElementById('link-signup');
		if (isSet(link_google)) {
			link_google.href = 'https://www.google.com/accounts/';
			var accnts_logo = firstSubElem(link_google);
			accnts_logo.alt = 'Google Accounts';
			accnts_logo.src = 'https://www.google.com/intl/en/images/logos/accounts_logo.png';
		}
		if (isSet(link_signup)) {
			removeClass('g-button-red',link_signup);
			link_signup.style.textDecoration ='none';
		}
		addStyle(
			  '.sign-in {'
			+ '    width: 300px;'
			+ '    border: 1px solid #C3D9FF;'
			+ '    margin-top: 12px;'
			+ '}'
			+ '.signin-box {'
			+ '    border: 3px solid #FFFFFF;'
			+ '    margin: 0px;'
			+ '    text-align: center;'
			+ '    background: none repeat scroll 0px 0px #e8eefa;'
			+ '}'
			+ '.signin-box, .accountchooser-box {'
			+ '    padding: 15px 25px;'
			+ '}'
			+ '.signin-box h2 {'
			+ '    height: auto;'
			+ '    font-size: 0px;'
			+ '    margin: 0px 0px 0.46em 0px;'
			+ '}'
			+ '.signin-box:before {'
			+ '    content: "Sign in with your ";'
			+ '}'
			+ '.signin-box h2 strong:after {'
			+ '    content: "\\00A0 Account";'
			+ '}'
			+ '.signin-box h2 strong {'
			+ '    box-sizing: border-box;'
			+ '    -moz-box-sizing: border-box;'
 			+ '    -webkit-box-sizing: border-box;'
			+ '    position: static;'
			+ '    top: auto;'
			+ '    right: auto;'
			+ '    width: auto;'
			+ '    height: 25px;'
			+ '    padding: 4px 0px 0px 61px;'
			+ '    margin: 3px 0px 8px 0px;'
			+ '    font-size: 16px;'
			+ '    background: url("https://www.google.com/accounts/google_transparent.gif") no-repeat transparent;'
			+ '}'
			+ '.signin-box label {'
			+ '    text-align: right;'
			+ '}'
			+ '.signin-box strong.email-label,'
			+ '.signin-box strong.passwd-label {'
			+ '    width: auto;'
			+ '    display: inline-block;'
			+ '    margin: 0.5em 0px 0px 0px;'
			+ '}'
			+ '.signin-box strong.email-label:after,'
			+ '.signin-box strong.passwd-label:after {'
			+ '    content: ":\\00A0";'
			+ '}'
			+ '.signin-box input[type="text"],'
			+ '.signin-box input[type="password"] {'
			+ '    height: 25px;'
			+ '    width: auto;'
			+ '    float: right;'
			+ '    font-size: 13px;'
			+ '}'
			+ '/* Swap the places of the "stayed signed in" checkbox and the "Sign in" button */'
			+ '.signin-box input[type="submit"] {'
			+ '    float: right;'
			+ '    margin: 0 1em 16px;'
			+ '}'
			+ '.signin-box label.remember {'
			+ '    margin: 9px 0 26px;'
			+ '}'
			+ 'a {'
			+ '    text-decoration: underline;'
			+ '}'
			+ 'a img {'
			+ '    border: 0px none;'
			+ '}'
			+ 'div.google-header-bar {'
			+ '    height: auto;'
			+ '    border-bottom: 0px none;'
			+ '    background-color: #FFFFFF;'
			+ '}'
			+ '.sign-in + .product-info .product-headers {'
			+ '    display: none;'
			+ '}'
			+ '.features p.title {'
			+ '    position: relative;'
			+ '}'
			+ '.features p.title:before {'
			+ '    display: block;'
			+ '    position: absolute;'
			+ '    left: -48px;'
			+ '    width: 35px;'
			+ '    height: 35px;'
			+ '    content: "";'
			+ '}'
			+ 'div.announce-bar {'
			+ '    display: none;'
			+ '}'
			+ 'div.google-footer-bar {'
			+ '    border-top: 0px none;'
			+ '}'
			+ '.google-footer-bar .footer ul,'
			+ 'div.footer, div.footer ul li {'
			+ '    float: none;'
			+ '    max-width: none;'
			+ '    padding: 0px;'
			+ '    color: #666666;'
			+ '    font-size: 13px;'
			+ '    text-align: center;'
			+ '}'
			+ 'div.footer ul li + li:before {'
			+ '    content: " - ";'
			+ '}'
		);
	}
	else if (mode=='iGoogle') {
		var addGadgets = document.getElementById('addGadgets');
		removeClass('kdButtonRed',addGadgets);
		addStyle(
			  '#footerwrap, .footerwrap, html body {'
			+ '    background-color: #ECF4FD;'
			+ '}'
			+ 'div#nhdrwrap {'
			+ '    background-color: white;'
			+ '}'
			+ 'div.kdRoundedContainer {'
			+ '    border-style: solid none none none !important;'
			+ '}'
			+ 'table.G-CT {'
			+ '    border-collapse: separate;'
			+ '}'
			// Style the First-time Dialog
			+ '#box, #box.G-P1, div.G-P1, #box.G-C2, div.G-C2 {'
			+ '    border: 3px solid #3366CC;'
			+ '    font-family: Arial;'
			+ '    font-size: 12px;'
			+ '    margin: 0px auto;'
			+ '    padding: 0px;'
			+ '    position: relative;'
			+ '    top: 15px;'
			+ '    width: 778px;'
			+ '    z-index: 90;'
			+ '}'
			+ '#box_heading, #box_heading.G-H2, div.G-H2, #box_heading.G-K2, div.G-K2 {'
			+ '    background: none #598EDD;'
			+ '    color: #FFFFFF;'
			+ '    font-size: 16px;'
			+ '    font-weight: bolder;'
			+ '    line-height: 20px;'
			+ '    margin: 0px;'
			+ '    padding: 5px;'
			+ '    text-align: left;'
			+ '}'
			+ '#box_body, #box_body.G-L1, div.G-L1 {'
			+ '    background: none #FFFFFF;'
			+ '    padding: 8px;'
			+ '}'
			+ 'div.section_heading, div.G-F2 {'
			+ '    color: #000000;'
			+ '    font-size: 12px;'
			+ '    font-weight: bold;'
			+ '    margin-bottom: 0px;'
			+ '    padding-bottom: 4px;'
			+ '}'
			+ 'a.G-B2 {'
			+ '    width: 30px;'
			+ '    height: 30px;'
			+ '    background-image: url("http://img0.gmodules.com/ig/images/close_white.gif");'
			+ '    opacity: 1;'
			+ '}'
			+ '#categories, #categories.G-D2, div.G-D2 {'
			+ '    padding: 4px; 0px 8px 0px;'
			+ '}'
			+ 'div.G-B2, div.G-E2 {'	// Separator Line
			+ '    border-bottom: 1px solid #E5ECF9;'
			+ '}'
			+ '#box.G-C2 + div.G-P1 {'
			+ '    display: none;'
			+ '}'
			// promo message
			+ 'div#set_homepage_msg, div.promo_ag {'
			+ '    background-color: #ECF4FD !important;'
			+ '    border: 1px solid #C5D7EF !important;'
			+ '}'
			// Style the theme selector
			+ 'div#indi {'
			+ '    background: none #FFFFFF !important;'
			+ '    border: 4px solid #C3D9FF !important;'
			+ '    color: #000000;'
			+ '    font-size: 13px;'
			+ '    overflow: hidden;'
			+ '    padding: 0px;'
			+ '    position: relative;'
			+ '    z-index: 0px;'
			+ '}'
			+ 'div#indi td.indi_search_cell {'
			+ '    background-color: #FFFFFF;'
			+ '}'
			// Fix the sidebar
			+ 'td.kdSidebarHolder, td.G-AT {'
			+ '    background-color: #ECF4FD;'
			+ '    border: 0px none;'
			+ '    position: relative;'
			+ '    width: 134px;'
			+ '}'
			+ 'div.toggleLeftNavContainer {'
			+ '    border-right: 0px none;'
			+ '    height: auto;'
			+ '    margin-bottom: 8px !important;'
			+ '    position: relative;'
			+ '}'
			+ 'body div.kdSidebar, div.kdSidebar.G-HY {'
			+ '    float: none;'
			+ '    padding: 0px 16px;'
			+ '    width: auto;'
			+ '}'
			+ 'div.selectedTab div.kdTabTitle, div.selectedTab div.G-D- {'
			+ '    color: #000000;'
			+ '}'
			+ 'div.kdGadgetTitle, div.selectedTab div.G-BY {'
			+ '    color: #224499 !important;'
			+ '}'
			+ 'div.kdSidebar > hr.G-B-, div.kdSidebar > hr.G-E- {'	// Seperator Line
			+ '    border-bottom: 1px solid #FFFFFF !important;'
			+ '    border-top: 1px solid #C5D7EF;'
			+ '    margin-left: -4px !important;'
			+ '    width: 114px !important;'
			+ '}'
			+ 'div.popupContent table.kdDdBox {'
			+ '    left: 33px;'
			+ '    position: relative;'
			+ '}'
			// Module container
			+ 'td.kdMainContainer, td#col2.topbotborder {'
			+ '    border-bottom: 1px solid #C3D9FF;'
			+ '    border-top: 1px solid #C3D9FF;'
			+ '    padding: 3px 0px 0px 0px;'
			+ '}'
			// Style the new module settings button
			+ 'div.G-FQ {'
			+ '    background-color: transparent !important;'
			+ '}'
			+ 'div.kdOuterchrome:hover div.kdIconBox {'
			+ '    background-image: none;'
			+ '}'
			// Style module borders
			+ 'div.kdOuterchrome, div.kdOuterchrome:hover {'
			+ '    border: 0px none !important;'
			+ '}'
			+ 'div.kdGadgetOuterBox {'
			+ '    border-style: solid !important;'
			+ '}'
			+ 'div.G-PP, div.G-HQ, div.G-BQ, div.G-CQ, div.modboxin, div.modboxin_s {'
			+ '    border-color: #C5D7EF;'
			+ '    border-width: 1px 1px 0px 1px;'
			+ '    border-bottom-style: none;'
			+ '}'
			// Fix the module rounded corners
			+ 'div.kdGadgetTopRounded, b.rnd_modtitle,'
			+ 'div.kdGadgetBottomRounded, b.rnd_modboxin {'
			+ '    display: inline;'
			+ '}'
			+ 'div.kdOuterchrome:hover div.kdGadgetBottomRounded {'
			+ '    height: auto;'
			+ '    left: 0px;'
			+ '    top: auto;'
			+ '    bottom: -4px;'
			+ '    position: absolute;'
			+ '    z-index: -1;'
			+ '}'
			+ 'div.fullCurve0, b.rnd1, b.rnd1_max_top {'
			+ '    background: none repeat scroll 0 50% #BDCAD8;'
			+ '    border-width: 0px;'
			+ '    height: 1px;'
			+ '    margin: 0px 4px;'
			+ '}'
			+ 'div.fullCurve1, b.rnd2, b.rnd2_max_top {'
			+ '    border-width: 0px 2px;'
			+ '    height: 1px;'
			+ '    margin: 0px 2px;'
			+ '}'
			+ 'div.fullCurve2, b.rnd3, b.rnd3_max_top {'
			+ '    border-width: 0 1px;'
			+ '    height: 2px;'
			+ '    margin: 0px 1px;'
			+ '}'
			+ 'div.kdGadgetTopRounded div.fullCurve1,'
			+ 'div.kdGadgetTopRounded div.fullCurve2,'
			+ 'b.rnd_modtitle b.rnd2, b.rnd_modtitle b.rnd3 {'
			+ '    background: none repeat scroll 0 50% #D4E6FC;'
			+ '}'
			+ 'div.fullCurve1, div.fullCurve2, b.rnd2, b.rnd3 {'
			+ '    background: none repeat scroll 0 50% #FFFFFF;'
			+ '    border-color: #BDCAD8;'
			+ '}'
			+ 'div.fullCurve0, b.rnd1, b.rnd1_max_top,'
			+ 'div.fullCurve1, b.rnd2, b.rnd2_max_top,'
			+ 'div.fullCurve2, b.rnd3, b.rnd3_max_top {'
			+ '    border-style: solid;'
			+ '    display: block;'
			+ '    font-size: 1px;'
			+ '    line-height: 1px;'
			+ '    overflow: hidden;'
			+ '}'
			// Style the module title boxes
			+ 'div.titleBox, .modtitle, .modtitle_s, .gititle {'
			+ '    background-color: #D4E6FC !important;'
			+ '}'
			+ 'div.titleBox, .modtitle, .modtitle_s {'
			+ '    border-left: 1px solid #C5D7EF !important;'
			+ '    border-right: 1px solid #C5D7EF !important;'
			+ '    border-style: none solid !important;'
			+ '    color: #3366CC !important;'
			+ '    font-size: 12px !important;'
			+ '    font-weight: bold;'
			+ '    height: 20px !important;'
			+ '    line-height: 19px !important;'
			+ '    overflow: hidden;'
			+ '    padding: 0px 7px 2px 7px !important;'
			+ '}'
			+ 'div.titleBox .modtitle {'
			+ '    position: relative;'
			+ '    z-index: 1;'
			+ '}'
			+ 'div.footerwrap {'
			+ '    border-top: 0px none !important;'
			+ '}'
		);
	}
	else if (mode=='preferences') {
		// restore the Google preferences header-bar
		addStyle(
			  'div.sfbgg {'
			+ '    display: inline-block;'
			+ '    margin-left: 20px;'
			+ '    vertical-align: middle;'
			+ '    width: auto;'
			+ '}'
			+ 'div.sfbgg a#logo {'
			+ '    left: auto;'
			+ '}'
			+ 'div.appbar {'
			+ '    position: absolute;'
			+ '    right: 0px;'
			+ '    left: 145px;'
			+ '    top: 52px;'
			+ '    background: none #E5ECF9;'
			+ '    border-top: 1px solid #3366CC;'
			+ '    border-bottom: 0px none;'
			+ '    color: #000000;'
			+ '    font-size: 1.1em;'
			+ '    font-family: arial,sans-serif;'
			+ '    font-weight: bolder;'
			+ '    line-height: 19px;'
			+ '    height: 22px;'
			+ '    width: auto;'
			+ '    overflow: visible;'
			+ '    margin: 0px 8px;'
			+ '    padding: 0em 0.3em;'
			+ '}'
			+ '.appbar_b {'
			+ '    border-bottom: 0px none;'
			+ '    background: none #E5ECF9;'
			+ '    margin: 0px 8px;'
			+ '    height: 28px;'
			+ '}'
			// Sections
			+ 'div#srhSec, div#srhSec > div.sect {'
			+ '    border-width: 1px;'
			+ '    border-style: solid;'
			+ '    border-color: #CBDCED;'
			+ '}'
			+ 'div#srhSec > div.sect {'
			+ '    padding-left: 4px;'
			+ '}'
		);
		
		var appbar = getElementsByClassName('appbar')[0];
		if (isSet(appbar) && appbar.innerHTML=='Search Settings') {
			appbar.innerHTML = 'Preferences';
		} else {log('(isSet(appbar) && appbar.innerHTML==\'Search Settings\') => false','warn');}
	}
}