// ==UserScript==
// @name           Unpaginate Seti@Home results
// @namespace      http://userscripts.org/users/71563
// @description    Unpaginate Seti@Home results
// @author         http://userscripts.org/users/326
// @co-author      http://userscripts.org/users/28612
// @include        http://setiathome.berkeley.edu/results.php?*
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// ==/UserScript==

// function unpaginate(items, next, pane)

unpaginate('//th[contains(text(),"Task ID")]/../../..//tr',
           '//a[contains(text(),"Next 20")]',
           '//center//a[contains(text(),"Next 20")]/..');