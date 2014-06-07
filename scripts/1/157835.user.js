// ==UserScript==
// @id             www.youtube.com-7512ad00-94eb-4913-979c-9b5ab102a27b@n/a
// @name           YouTube: threaded comments by default
// @version        1.0
// @namespace      n/a
// @author         nanquan
// @description    
// @include        *.youtube.com/all_comments?v=*
// @run-at         document-start
// ==/UserScript==

var a = document.URL;

if (a.search("&threaded=1")==-1)
{
    a = a+"&threaded=1"
    window.location = a;
}

