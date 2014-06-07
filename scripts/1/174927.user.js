// ==UserScript==
// @id             www.youtube.com-371ab6c0-44ab-174d-b652-7932f838ebb5@scriptish
// @name           Youtube-Embed
// @version        1.1.1
// @namespace      
// @author         Akshay
// @description    Load the embed version of a Youtube video
// @include        https://www.youtube.com/watch?v*
// @run-at         document-end
// @grant          GM_registerMenuCommand
// @grant          GM_enableMenuCommand
// ==/UserScript==

GM_enableMenuCommand(GM_registerMenuCommand("Embedify!", function() {
    url = document.URL;
    new_url = url.replace("watch?v=", "embed/");
    window.history.back();
    window.open(new_url);
    }
));