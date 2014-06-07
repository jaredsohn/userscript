// ==UserScript==
// @name          YouTube - Layout (Faded)
// @description   YouTube - (Clean) Layout: is a greasemonkey script modifying the YouTube video player (page) to only display the video (of all formats, and domains), unless you hover over the non-displayed objects which will automatically show them until you move the cursor of the area.
// @include        *youtube.*/watch?v=*
// @exclude        *.ytimg.com*
// @copyright   ScriptDeveloper
// @version     1.2
// ==/UserScript==

GM_addStyle ("*{opacity: .75; } *:hover{opacity: 100; }");