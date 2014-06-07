// ==UserScript==
// @name        OT Filter
// @namespace   n/a
// @description Filter certain threads on OT
// @include     http://forums.offtopic.com/forumdisplay.php?f=11
// @version     1
// @grant       none
// ==/UserScript==

// get all threads
var threads = document.getElementsByTagName('tr');

// iterate over each thread, if it has an nws tag, hide it
for(i = 0; i < threads.length; i++)
{    
    if(threads[i].innerHTML.indexOf("nws") != -1) 
    {
        threads[i].style.visibility = 'collapse'; // works better than 'hidden'
    }
}