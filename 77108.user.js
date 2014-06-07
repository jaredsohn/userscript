// ==UserScript==
// @name                    SUPINFO Linux Lab ads kicker
// @namespace               http://userscripts.org/scripts/show/86392
// @namespace               http://www.maisdisdonc.com/
// @description             Remove the Microsoft or SUPINFO ads banner on the SUPINFO Linux Lab website.
// @version                 1.1.1
// @date                    05:10 20/09/2010
// @author                  Merimac
// @include                 http://www.labo-linux.org/*
// @license                 Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License
// @license                 http://creativecommons.org/licenses/by-nc-sa/3.0/deed.fr
// ==/UserScript==

// getElementById Helper : http://wiki.greasespot.net/GetElementById_Helper
function $() {
  if (arguments.length==1) {
    return document.getElementById(arguments[0]);
  }

  var result=[], i=0, el;
  while(el=document.getElementById(arguments[i++])) {
    result.push(el);
  }

  return result;
}

// Remove boxe by giving it's Id
function removeElementById() {
  var result, i = 0;
  while (result = $(arguments[i++])) {
    result.parentNode.removeChild(result);
  }
}

window.addEventListener(
  'load',
  function() {
    removeElementById('page_decoration');
  },
  true);