// ==UserScript==
// @name           noMoreArchiver
// @description  --
// @include        http://*/archiver/?tid-*
// @include        http://*/archiver/tid-*
// @version        1.0.1
// ==/UserScript==

url = document.location.href;
url = url.replace('archiver/?tid-', 'viewthread.php?tid=');
url = url.replace('archiver/tid-', 'viewthread.php?tid=');
url = url.replace('.html','')
document.location.href = url;