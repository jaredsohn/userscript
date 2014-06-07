// ==UserScript==
// @name           MozillaZine Forums Page Jumper
// @namespace      http://zoolcar9.lhukie.net/mozilla/userscripts/
// @description    Allow you to jump to a specific page
// @include        http://forums.mozillazine.org/viewforum.php?*
// ==/UserScript==

// Last updated: 2008-01-09

(function() {
  var table = document.getElementsByTagName('table')[3];
  var nav = table.getElementsByTagName('tr')[0].getElementsByTagName('td')[1];
  if(nav.lastChild.firstChild.nodeValue.match(/\d+/))
    var maxPage = parseInt(nav.lastChild.firstChild.nodeValue);
  else
    var maxPage = parseInt(nav.lastChild.previousSibling.previousSibling.firstChild.nodeValue);

  var jumper = document.createElement('a');
  jumper.name = 'jumper';
  jumper.style.cursor = 'pointer';
  jumper.style.color= '#066';
  jumper.addEventListener('click', function() {
    GM_log(maxPage + ", " + typeof maxPage)
    var page = prompt('Please enter a page number between 1 and ' + maxPage);
    if(!page) return;
    if(page && (page.match(/\d+/)) && (page != 0) && page < (maxPage + 1)) {
      var n = (page - 1) * 30;
      location.href = location.href.substring(0,44) + location.href.match(/f\=\d+/) + '&topicdays=0&start=' + n;
    }
  }, false);

  jumper.appendChild(nav.firstChild);
  nav.insertBefore(jumper, nav.firstChild);

})();