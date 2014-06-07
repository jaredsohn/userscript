 /*
 httpbegone -- strip example "http://" out of web forms so you can
     paste your own full URL in
 0.1
 2005-04-21
 Copyright (c) 2005, Rich Lafferty <rich+sourceplease@lafferty.ca>
 Released under the BSD license
 http://www.opensource.org/licenses/bsd-license.php

 -----------------------------------------------------------------------

 This is a Greasemonkey user script.

 To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
 Then restart Firefox and revisit this script.
 Under Tools, there will be a new menu item to "Install User Script".
 Accept the default configuration and install.

 To uninstall, go to Tools/Manage User Scripts, select "HTTP-Be-Gone",
 and click Uninstall.

 */

 // ==UserScript==
 // @name        HTTP-Be-Gone
 // @namespace   http://www.lafferty.ca/software/greasemonkey/
 // @description Removes example "http://" from form fields, so pasting a URL doesn't get you 'http://http://'
 // @include     *
 // ==/UserScript==

 (function() {

 var i=document.getElementsByTagName('a');

 for (var j=0; j < i.length; j++)
 {
         i[j].href.replace("http://","https://");
 }

})();
