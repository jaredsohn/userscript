// ==UserScript==  
// @name           Facebook Recent News Feed by Default  
// @version        1.6  
// @description    Automatically changes facebook's url to show your Most Recent news feed by default instead of the Top Stories.  
// @include        /^https?://www\.facebook\.com/?$/  
// @exclude        /^https?://www\.facebook\.com/.*\?sk=h_chr*/  
// @run-at         document-start  
// ==/UserScript==  

location.href=location.href.replace("https://www.facebook.com/"," https://www.facebook.com/?sk=h_chr );  
