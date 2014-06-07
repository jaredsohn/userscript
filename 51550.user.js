// ==UserScript==
// @name           Rotoworld Display Hidden Content
// @namespace      castaban.com
// @include        http://*rotoworld*
// ==/UserScript==

var prof;
          prof = document.getElementById('spp');
          prof.childNodes[0].rows[0].cells[0].style.fontSize='13';
          //prof.childNodes[0].rows[0].cells[0].style.fontWeight='bold';
          prof.childNodes[0].rows[0].cells[0].style.color='purple';
          var strong = document.createElement('B');
          //prof.parentNode.insertBefore(strong, prof);
          prof.style.display='';
          //prof.style.fontWeight='bold ! important';
          //prof.style.fontSize='15 ! important';
          //window.addEventListener(
          //    'load',
          //    function() { document.getElementById('spp').style.display='' },
          // //   true);
          