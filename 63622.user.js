///////////////////////////////////////////////////////////////////////////////
//
// Greasemonkey YUI Test Example (YUI 2)
// Version 1.1, 2009-12-24
// Coded by Maarten van Egmond.  See namespace URL below for contact info.
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name        Greasemonkey YUI Test Example (YUI 2)
// @namespace   http://userscripts.org/users/64961
// @author      Maarten
// @version     1.1
// @description v1.1: Shows how to set up YUI Test (YUI 2) for use with Greasemonkey scripts.
// @include     http://userscripts.org/
// @require     http://yui.yahooapis.com/combo?2.8.0r4/build/yahoo-dom-event/yahoo-dom-event.js&2.8.0r4/build/logger/logger-min.js&2.8.0r4/build/yuitest/yuitest-min.js
// @resource    yuiCss http://yui.yahooapis.com/combo?2.8.0r4/build/logger/assets/skins/sam/logger.css&2.8.0r4/build/yuitest/assets/skins/sam/yuitest.css
// ==/UserScript==
//
///////////////////////////////////////////////////////////////////////////////

// Satisfy JSLint.
/*global document, GM_addStyle, GM_getResourceText, YAHOO */

// Add the YUI CSS to the head tag.
GM_addStyle(GM_getResourceText("yuiCss"));

// Add the SAM skin to the body tag.
document.body.setAttribute("class",
        document.body.getAttribute("class") + " yui-skin-sam");

// Show the YUI Logger console.
new YAHOO.tool.TestLogger(); 

// Adjust font size of YUI Logger console so we can read it.
// (May not be needed when run against sites other than userscripts.org.)
document.body.getElementsByTagName('div')[0].setAttribute('style', 'font-size: 100%');

// Add the tests.
YAHOO.tool.TestRunner.add(new YAHOO.tool.TestCase({
    name: "Sample Test",

    testNumPopularScripts: function () {
        var table = document.getElementsByTagName('table')[0],
            trElts = table.getElementsByTagName('tr'),
            num = trElts.length - 1;   // minus header row
        YAHOO.util.Assert.areEqual(15, num, "#popular scripts should be 15");
    }
}));

// Run the tests.
YAHOO.tool.TestRunner.run();

///////////////////////////////////////////////////////////////////////////////

