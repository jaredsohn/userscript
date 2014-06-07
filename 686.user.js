//5/23/2005 7:55AM JGD reviewed.  No warranty expressed or implied.
// CustomizeJyxo v0.2 BETA
// Add links to other web search sites for [http://jyxo.cz Jyxo.cz] search engine (search engine focused mainly on Czech web) - some Czech ones as well as worldwide.
//
// Known issues:
// - Morfeo has problems with special characters (Morfeo is in windows-1250 while other Czech sites used are in iso latin 2) - some conversion could be added later.
//
// --------------------------------------------------------------------
//
//
//    INSTALLATION INSTRUCTIONS
//
//    This is a Greasemonkey user script.
//
//    To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
//    Install and then restart Firefox and revisit this script.
//
//    Under Tools, there will be a new menu item to "Install User Script".
//    Accept the default configuration and install.
//
//    To uninstall, go to Tools/Manage User Scripts,
//    select "CustomizeJyxo", and click Uninstall.
//
//
// --------------------------------------------------------------------
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
// http://www.gnu.org/copyleft/gpl.html
// 
// 2005-03-14 Copyright (c) 2005, Mark Pilgrim, http://diveintomark.org/projects/butler/
// 2005-03-16 Copyright (c) 2005, Daniel Wieselberg
// 2005-05-17 Filip made a clone of CustomizeGoogle script made by Mark Pilgrim, Daniel Wieselberg (copyrights above)
// 2005-05-17 Copyright (c) 2005, Filip Gallat

//
// ==UserScript==
// @name            CustomizeJyxo
// @namespace       http://www.customizejyxo.com/
// @description     Link to competitors from Jyxo search results
// @include         http*://jyxo.*/*
// @include         http*://www.jyxo.*/*
// ==/UserScript==
(function() {
    var CustomizeJyxoServices = {
    	/**
    	 * Create the search links to other search engines
    	 * @param q string - the search string to search for
    	 * @return string - html code with links to other search engines
    	 */
	_otherWebSearches: function(q) {
	    var q_utf8 = encodeURIComponent(q);
	    var s = '';
	    s += '<a href="http://morfeo.centrum.cz/index.php?q=' + q + '&mt=2&tt=2&mts=1&sec=mor">Morfeo</a><br/>';
	    s += '<a href="http://search.seznam.cz/search.cgi?w=' + q + '">Seznam</a><br/>';
	    s += '<a href="http://www.root.cz/vyhledavani/?qs=' + q + '&search=Hledej&kde%5Bvsude%5D=1">Root</a><br/>';
	    s += '<a href="http://www.google.com/search?q=' + q_utf8 + '&hl=en"">Google</a><br/>';
	    s += '<a href="http://search.yahoo.com/search?p=' + q_utf8 + '&ei=UTF-8">Yahoo</a><br/>';
	    s += '<a href="http://web.ask.com/web?q=' + q_utf8 + '">Ask Jeeves</a><br/>';
	    s += '<a href="http://www.alltheweb.com/search?q=' + q_utf8 + '&cs=utf-8">AllTheWeb</a><br/>';
	    s += '<a href="http://s.teoma.com/search?q=' + q_utf8 + '">Teoma</a><br/>';
	    s += '<a href="http://search.msn.com/results.aspx?q=' + q_utf8 + '">MSN</a><br/>';
	    s += '<a href="http://search.lycos.com/default.asp?query=' + q_utf8 + '">Lycos</a><br/>';
	    s += '<a href="http://www.technorati.com/cosmos/search.html?url=' + q_utf8 + '">Technorati</a><br/>';
	    s += '<a href="http://www.feedster.com/search.php?q=' + q_utf8 + '">Feedster</a><br/>';
	    s += '<a href="http://www.bloglines.com/search?t=1&amp;q=' + q_utf8 + '">Bloglines</a><br/>';
	    s += '<a href="http://www.altavista.com/web/results?q=' + q_utf8 + '">Altavista</a>'; 
	    return s;
	},
    };
    /**
     * Add the search links to other search engines into jyxo (to the left green box)
     */
    var CustomizeJyxo = {
	addOtherWebSearches: function() {
	    var header = document.evaluate("//div[@id='helper']/div[@class='helpermain']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	    if (!header) {
            	_log("Header (html to add the search links to) was not found on the page - no search links added.");
	    	return;
	    }

            // NOTE: jyxo.cz can conatin one or two form which have (both when there are both of them) name="f" 
            // This is not according to the standards but the user script must take it into account !!!
            var forms = document.f;
            var q;
            // get the class name; typeof() returns just "object" for everything and is useless
            var className = document.f.constructor.toString();
            _log("className: " + className);

            if ( "[NodeList]" == className ) {
            	// there are more forms - take the first
            	_log("there are more forms - take the first");
            	q = document.f[0].s.value;
            } else if ( "[HTMLFormElement]" == className ) {
            	// there is just one form - take it
            	_log("there is just one form - take it");
            	q = document.f.s.value;
            }

            if (!q) {
            	_log("Query string is empty - no search links added.");
            	return;
            }
	    
	    // create the html to be added
	    var s = '<br><b>Hledej na:</b><br>';
	    s += CustomizeJyxoServices._otherWebSearches(q);
	    s += "<br/>";
	    header.innerHTML = header.innerHTML + s;
	},
    };


    var DEBUG = 0;
    // call the main function and add the search links into left box
    CustomizeJyxo.addOtherWebSearches();

    
    function _log(s) {
        if (DEBUG) GM_log(s);
    }
    
    //}, false);
})();