// ==UserScript==
// @name          Google Reader Header Fix
// @description   Resizes the new Google Reader header for optimal feed reading space.
// @include       http://www.google.com/reader/view/*
// @include       https://www.google.com/reader/view/*
// @match         http://www.google.com/reader/view/*
// @match         https://www.google.com/reader/view/*
// @exclude       http://www.example.org/foo
// @version       0.2
// @icon          http://www.google.com/reader/view/reader/ui/3068170011-app-icon-64.png
// ==/UserScript==

GM_addStyle("#top-bar { height: 40px !important; } #search { padding: 5px 0 !important; } #logo { top: 45% !important; } #lhn-add-subscription-section { height: 40px !important; } #viewer-header { height: 40px !important; }");

/*
document.write("<style>#top-bar { height: 40px !important; } #search { padding: 5px 0 !important; } #logo { top: 45% !important; } #lhn-add-subscription-section { height: 40px !important; } #viewer-header { height: 40px !important; }</style>");
*/