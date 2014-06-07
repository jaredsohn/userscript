// ==UserScript==
// @name           Hide TVTropes threads
// @namespace      http://userscripts.org/users/254761
// @description    Hides unwanted threads in the conversation list on the TVTropes fora.
// @include        http://tvtropes.org/pmwiki/conversations.php*
// ==/UserScript==

//Names of threads go here.  If the name of the thread has quotation marks in it, make sure to put a backslash before each.

var thread_names=["Thread Title #1", "Thread Title #2"];


var links=document.getElementsByTagName("a");
for (i in links)
{
for (h in thread_names)
{if (links[i].innerHTML==thread_names[h])
{links[i].parentNode.parentNode.style.display="none";}}
}