// ==UserScript==
// @run-at document-start
// @id             Google URL Cleaner
// @name           Google URL Cleaner
// @namespace      
// @description    Clean google search URL
// @include        http*://www.google.tld/search?*
// @include        http*://www.google.tld/*hp?*
// @include        http*://translate.google.tld*?*
// @version        2.8.5
// ==/UserScript==
(function(doc) {
var oldurl = document.URL.replace("?", "?&"); // Puts "&" after "?" so matches always work.
var domain = oldurl.match(/https?:\/\/(translate|www).google.(.+?)\?/g);
var q = String(oldurl.match(/\&q\=[^&]*/g)).replace(/\%20/g,"+")||""; // search terms
var tbm = oldurl.match(/\&tbm\=[^&]*/g)||""; // Type of search (eg image, video).
var tbs = oldurl.match(/\&tbs\=[^&]*/g)||""; // Search options.
var cr = oldurl.match(/\&cr\=[^&]*/g)||""; // Country
var biw = "&biw="+window.innerWidth; // Window width (standard image search goes into infinite loop if you try and remove these)
var bih = "&bih="+window.innerHeight; // Window height
var sout = oldurl.match(/\&sout\=1/g)||""; // Basic image search
var start = oldurl.match(/\&start\=[1-9][0-9]*/g)||""; // for results in another page
var newurl = (tbm!="&tbm=isch") ? domain+tbm+tbs+cr+start+q : (sout=="") ? domain+biw+bih+tbm+tbs+q : domain+tbm+tbs+sout+start+q;
newurl = newurl.replace("?&", "?").replace("hp?null","hp?");
if (newurl != document.URL) location.replace(newurl);
})(document);