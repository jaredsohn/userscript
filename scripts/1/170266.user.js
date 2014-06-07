// ==UserScript==
// @name          Fix google search links
// @namespace     https://github.com/matthewpucc
// @version       0.3
// @updateURL     https://raw.github.com/matthewpucc/FTFY/master/GoogleSearch/pwn.js
// @description   Prevents google from hijacking clicks and converting it to google tracking. 
//                This will disable the block this site ability.
// @include       https://encrypted.google.com/search*
// @copyright     2012+, matthewpucc, Beerware
// ==/UserScript==

/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * matthewpucc wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return
 * ----------------------------------------------------------------------------
 */

(function() {
  var lameness = document.querySelectorAll('h3.r');
  for (var i = 0; i < lameness.length; i++) {
    var a = lameness[i].childNodes[0];

    if (a && a.attributes && a.attributes.onmousedown) {
      delete a.attributes.onmousedown;
    }

    a.onmousedown = function (e) {
      e.preventDefault();
      e.stopPropagation();
    };
  }
})();