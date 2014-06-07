/*
            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                    Version 2, December 2004

 Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. You just DO WHAT THE FUCK YOU WANT TO.

*/

// ==UserScript==
// @name            USO: Add link to add a new script
// @namespace       http://userstyles.org/users/12
// @version         0.0
// @author          LouCypher
// @license         WTFPL
// @include         *://userscripts.org/home/scripts
// @include         *://userscripts.org/users/*
// @match           *://userscripts.org/home/scripts
// @match           *://userscripts.org/users/*
// ==/UserScript==

(function() { // function wrapper for Opera UserJS
  var upload = document.querySelector("a[href='/scripts/new']");
  if (!upload) return;

  var img = upload.querySelector("img");
  if (img) {
    upload.parentNode.insertBefore(img, upload);
    img.parentNode.insertBefore(document.createTextNode(" "), upload);
  }

  var add = document.createElement("a");
  add.setAttribute("href", "/scripts/new?form=true");
  add.textContent = "Add";

  upload.textContent = "upload";
  upload.parentNode.appendChild(document.createTextNode(" a new script"));
  upload.parentNode.insertBefore(add, upload);
  upload.parentNode.insertBefore(document.createTextNode(" or "), upload);

})()
