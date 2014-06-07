// ==UserScript==
// @id             Archiver replace
// @name           Archiver replace
// @version        1.0
// @namespace      
// @author         nopetw
// @description    
// @include        http://*/archiver/?tid-*
// @include        http://*/archiver/tid-*
// @include        http://*/simply/?tid-*
// @run-at         document-start
// ==/UserScript==

url = document.location.href;
url = url.replace('archiver/?tid-', 'viewthread.php?tid=');
url = url.replace('archiver/tid-', 'viewthread.php?tid=');
url = url.replace('simply/?tid-', 'viewthread.php?tid=');
url = url.replace('.html','')
url = url.replace('-mod-0','')
document.location.href = url;