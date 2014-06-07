// ==UserScript==
// @name           Decode it!
// @namespace      http://userscripts.org/users/26666
// @include        http://dean.edwards.name/packer/
// @description    Decode Base62 encoded strings.
// ==/UserScript==
var _=document.getElementById("decode-script");_.removeAttribute("disabled");_.addEventListener("click",function(){this.removeAttribute("disabled")},false);var $=document.getElementById("output");$.removeAttribute("readonly")