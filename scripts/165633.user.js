// ==UserScript==
// @name        Instapaper Readability-like dark theme
// @namespace   instaDarkReadability
// @description Makes the Instapaper text view dark theme more like the dark theme of Readability (colors, margins).
// @include     *instapaper.com/text*
// @include     *instapaper.com/read*
// @grant       GM_addStyle
// @version     1
// ==/UserScript==


// background color of body
GM_addStyle("body.darkmode, body.darkmode #titlebar h1 { background-color: #323A40 !important; }");

// background color of toolbar
GM_addStyle("div#controlbar_container { background-color: #2E373C !important; }");

// width
GM_addStyle("body.medwidthmode { max-width: 705px !important; }");

// text color
GM_addStyle("body.darkmode h1, body.darkmode div#story { color: #D6DBDF !important; }");