// ==UserScript==
// Changelog:
  document, null, 0, null).iterateNext().href.match(/\?t\=\d+/);
var main = document.getElementById('main');
    .getElementsByTagName('tr')[1].getElementsByTagName('td')[1],

  var maxPage = navs[0].lastChild.firstChild.nodeValue;
else
  var maxPage = navs[0].lastChild.previousSibling.previousSibling.firstChild.nodeValue;

for(var i = 0; i < navs.length; i++) {
  jumper.name = 'jumper';
  jumper.style.cursor = 'pointer';
  jumper.style.color = '#066';
  jumper.addEventListener('click', function() {
    var page = prompt('Please enter a page number between 1 and ' + maxPage);
    if(!page) return;
    if(page && (page.match(/\d+/)) && (page != 0) && page < (maxPage + 1)) {
      var n = (page - 1) * 15;
      location.href = location.href.substring(0,43) + topicID + '&postdays=0&postperpage=15&start=' + n;
    }
  }, false);

  jumper.appendChild(nav.firstChild);
  nav.insertBefore(jumper, nav.firstChild);
}