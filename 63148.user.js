// ==UserScript==
// @name           ECU SpringerLink Redirect
// @namespace      troynt+springerlink-redirect@gmail.com
// @include        http://www.springerlink.com/content/*/
// ==/UserScript==

cur_location = unsafeWindow.location + ''
window.location = cur_location.replace('http://www.springerlink.com/content/','http://www.springerlink.com.jproxy.lib.ecu.edu/content/')