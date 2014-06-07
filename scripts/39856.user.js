// ==UserScript==

// @name           Hot Channel Image Enlarger
// @namespace      Panda
// @description    Enlarge the Detail Images for http://www.hotchannel.com.hk.

// @include        http://www.hotchannel.com.hk/tc/product_list.php?*
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.toString().replace(/width=\"120\" height=\"90\"/g,"");