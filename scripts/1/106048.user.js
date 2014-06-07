// Bing Translator
// version 0.1 BETA!
// 2005−04−22
// Copyright (c) 2005, Brock Adams
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Bing Tanslator", and click Uninstall.
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// ==UserScript==
// @name bing
// @namespace http://feedlover.com
// @description Bing Translator
// @include *
// @exclude 
// ==/UserScript==
//--- Load the library.
var D           = document;
var appTarg     = D.getElementsByTagName ('head')[0]
var jsNode      = D.createElement ('script');

jsNode.src      = 'http://dict.bing.com.cn/cloudwidget/Scripts/Generated/BingTranslate_Selection_ShowIcon.js';
jsNode.addEventListener ("load", initBingTranslatorOnDelay, false);

appTarg.appendChild (jsNode);


//--- Allow some time for the library to initialize after loading.
function initBingTranslatorOnDelay () {
    setTimeout (initBingTranslator, 666);
}

//--- Call the library's start-up function, if any. Note needed use of unsafeWindow.
function initBingTranslator () {
    unsafeWindow.BingCW.Init ( {
        AppID:              "GM Foo",
        MachineTranslation: true,
        WebDefinition:      true
    } );
}
