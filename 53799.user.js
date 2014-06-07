// ==UserScript==
// @name           Strip phpBB titles
// @namespace      http://userscripts.org/users/86900
// @description    Strips "View topic" from page titles
// @include        */viewtopic.php*
// ==/UserScript==

t = document.title;

if (t.indexOf('View topic - ') != -1)
{
i = t.indexOf('View topic - ');
document.title = t.substring(i + 13);
}
else if (t.indexOf(' :: ') != -1)
{
i = t.indexOf(' :: ');
document.title = t.substring(i + 3);
}
else
{
i = t.indexOf(' - ');
document.title = t.substring(i + 3);
}