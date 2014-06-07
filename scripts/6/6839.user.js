// ==UserScript==
// @name           Yahoo! Mail Mailto Anywhere...
// @namespace      http://userscripts.org/people/18549
// @source     http://userscripts.org/scripts/show/6839
// @description    Force mailto links to open with Yahoo! Mail
// @include        *
// @version        0.1
// @date           2006-12-21
// @creator        Abdoulaye CAMARA <acamarabox-forum@yahoo.com>
// ==/UserScript==
//
// **COPYRIGHT NOTICE**
// 
// Copyright (C) 2005 and onwards  Abdoulaye CAMARA
// 
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// The GNU General Public License is available by visiting
//   http://www.gnu.org/copyleft/gpl.html
// or by writing to
//   Free Software Foundation, Inc.
//   51 Franklin Street, Fifth Floor
//   Boston, MA  02110-1301
//   USA
// 
// **END COPYRIGHT NOTICE**
//
//
// -------------------------------------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts, select this script,
// and click Uninstall.
//
// -------------------------------------------------------------------------------------------------

function setYahooMailTo()
{
	var allLinks, 
		thisLink,
		thisHref,
		YMComposeUrlPrefix ;

	allLinks = document.evaluate(
	    '//a[@href]',
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null) ;

	YMComposeUrlPrefix = 'http://compose.mail.yahoo.com/ym/Compose?To=' ;

	for (var i = 0; i < allLinks.snapshotLength; i++) 
	{
	    thisLink = allLinks.snapshotItem(i) ;
	    
		hrefStr    = '' ;
		thisHref   = [] ;
		isMailTo   = thisLink.href.substr(0, 6).toLowerCase() == 'mailto' ;
		hasMail    = thisLink.href.indexOf('@') ;
		
		if (isMailTo && !(hasMail < 0) )
		{
			posHrefStr    = thisLink.href.indexOf(':') ;
			hrefStr       = thisLink.href.substr(posHrefStr + 1) ;
			hasOptions    = hrefStr.indexOf('?') ;
			
			thisHref[0]   = hasOptions < 0 ? hrefStr.substr(0) : hrefStr.substring(0, hasOptions) ;
			thisHref[1]   = hasOptions < 0 ? '' : hrefStr.substr(hasOptions + 1) ;
			
			thisLink.href = YMComposeUrlPrefix + thisHref.join('&') ;
		}
	}	
}

try
{
	window.addEventListener(
		'load',
		function () { setYahooMailTo() ; },
		true
	);
}
catch (ex) { alert(ex) ; }
