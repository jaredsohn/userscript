// ==UserScript==
// @id           stackoverflowRemoveTagXs@erikvold.com
// @name         StackOverflow Remove X's Beside Tags
// @namespace    stackoverflowRemoveTagXs
// @include      http://stackoverflow.com*
// @include      https://stackoverflow.com*
// @datecreated  2010-07-19
// @lastupdated  2010-07-19
// @version      0.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  This userscript will remove the redunant x's beside tag names in StackOverflow's right nav.
// ==/UserScript==

(function(d){
  window.addEventListener("DOMNodeInserted", function(e){
    var classes = e.target.getAttribute('class');
    if (/(^|\s)delete\-tag(\s|$)/.test(classes)) {
      var ele = e.target;
      ele.parentNode.removeChild(ele);
    }
  }, false);
})(document);
