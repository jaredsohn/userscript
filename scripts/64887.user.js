///////////////////////////////////////////////////////////////////////////////
//
// Greasemonkey YUI Test Example (YUI 3)
// Version 1.0, 2009-12-24
// Coded by Maarten van Egmond.  See namespace URL below for contact info.
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name        Greasemonkey YUI Test Example (YUI 3)
// @namespace   http://userscripts.org/users/64961
// @author      Maarten
// @version     1.0
// @description v1.0: Shows how to set up YUI Test (YUI 3) for use with Greasemonkey scripts.
// @include     http://userscripts.org/
// @require     http://yui.yahooapis.com/combo?3.0.0/build/yui/yui-min.js&3.0.0/build/oop/oop-min.js&3.0.0/build/event-custom/event-custom-min.js&3.0.0/build/attribute/attribute-min.js&3.0.0/build/event/event-base-min.js&3.0.0/build/pluginhost/pluginhost-min.js&3.0.0/build/dom/dom-min.js&3.0.0/build/node/node-min.js&3.0.0/build/event/event-delegate-min.js&3.0.0/build/event/event-focus-min.js&3.0.0/build/base/base-min.js&3.0.0/build/classnamemanager/classnamemanager-min.js&3.0.0/build/widget/widget-min.js&3.0.0/build/dump/dump-min.js&3.0.0/build/substitute/substitute-min.js&3.0.0/build/console/console-min.js&3.0.0/build/plugin/plugin-min.js&3.0.0/build/console/console-filters-min.js&3.0.0/build/json/json-min.js&3.0.0/build/event-simulate/event-simulate-min.js&3.0.0/build/test/test-min.js
// @resource    yuiCss http://yui.yahooapis.com/combo?3.0.0/build/widget/assets/skins/sam/widget.css&3.0.0/build/console/assets/skins/sam/console.css&3.0.0/build/console/assets/skins/sam/console-filters.css
// ==/UserScript==
//
///////////////////////////////////////////////////////////////////////////////

// Satisfy JSLint.
/*global document, GM_addStyle, GM_getResourceText, YUI */

// Add the YUI CSS to the head tag.
GM_addStyle(GM_getResourceText("yuiCss"));

// Add the SAM skin to the body tag.
document.body.setAttribute("class",
        document.body.getAttribute("class") + " yui-skin-sam");

YUI({ logInclude: { TestRunner: true } }).use("test", "console-filters", function (Y) {

    // Add the tests.
    Y.Test.Runner.add(new Y.Test.Case({
        name: "Sample Test",

        testNumPopularScripts: function () {
            var table = document.getElementsByTagName('table')[0],
                trElts = table.getElementsByTagName('tr'),
                num = trElts.length - 1;   // minus header row
            Y.Assert.areEqual(15, num, "#popular scripts should be 15");
        }
    }));

    // Show the YUI Logger console.
    new Y.Console({
        newestOnTop: false,
        plugins: [ Y.Plugin.ConsoleFilters ]
    }).render();

    // Run the tests.
    Y.Test.Runner.run();
});

///////////////////////////////////////////////////////////////////////////////

