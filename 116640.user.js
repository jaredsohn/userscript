// ==UserScript==
// @id             ubuntuforums remove signatures
// @name           ubuntuforums remove signatures
// @version        1.0
// @namespace      daemonicky
// @author         daemonicky
// @description    
// @include        http://ubuntuforums.org/showthread.php*
// @run-at         document-end
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

//$("html > body > div > div").remove();
$('div[class="vbclean_msgtext"]').not("[id]").remove();
