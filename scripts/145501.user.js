// ==UserScript==
// @id             langFilterCairoDockForum
// @name           language filter for treads in glx-dock forums
// @version        1.0
// @namespace      
// @author         Ohad Cohen
// @description    language filter for treads in glx-dock forums
// @include        http://www.glx-dock.org/bg_forum.php?f=*
// @run-at         document-end
// ==/UserScript==

var LANGS="en";

var threads=document.getElementsByClassName("area_table")[0].getElementsByTagName("tr");
for(var tr=1;tr<threads.length;tr++)
    if(threads[tr].innerHTML.indexOf("/"+LANGS+".png")<0 &&
            threads[tr].innerHTML.indexOf("images/languages")>0)//show threads with no language too
        threads[tr].style.display="none";
