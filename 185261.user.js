// ==UserScript==
// @name           Facebook Element Hider
// @description    Hides Sponsored Ads and other elements.
// @version        1.5
// @homepage       https://userscripts.org/scripts/show/185261
// @updateURL      https://userscripts.org/scripts/source/185261.meta.js
// @downloadURL    https://userscripts.org/scripts/source/185261.user.js
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==
/*
        Original Code by Matthias Dailey (Script: YouTube Element Hider) (Great work, dude!)
        Re-purposed by Akio Crimson "DreamPhreak" for Facebook Element Hider.
        
        A script that hides certain elements of Facebook pages, like sponsored ads and the like.
*/

if ( self == top )
if (document) {
        var cssSelectorsHidden = [
        "#rightCol",                // Entire right column "Reminders, people you may know, and ads".
        //".ego_column",              // Sponsored Ads
        //".ego_column",              // Recommended Pages
        //".egoOrganicColumn",        // Recommended Pages
        //".rhcFooterWrap",           // Copyright Footer on right side
        ".escapeHatchMinimal",      // People you may know on profile page
        "._4__g",                   // People you may know on profile page
        "#pageFooter"               // Footer on very bottom of site (About, Create Ad, etc + Facebook copyright line)
        ];
        var cssHideSidebar = cssSelectorsHidden.join(", ") + " {display: none;}";
        var styleHideSidebar = document.createElement("style");
        styleHideSidebar.appendChild(document.createTextNode(cssHideSidebar));
        document.body.appendChild(styleHideSidebar);
}