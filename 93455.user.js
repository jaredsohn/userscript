// ==UserScript==
// @name           LD19 Wider Entry Listing
// @namespace      http://codebad.com/greasemonkey
// @description    Widens the narrow column to make better good looking and readability
// @include        http://www.ludumdare.com/compo/ludum-dare-19/?action=misc_links
// ==/UserScript==
(function(){
  document.getElementById('page').style.width = '1200px';
  document.getElementById('content').style.width = '100%';
  var table = document.getElementById('compo2').getElementsByTagName('table')[0];
  var trs = table.getElementsByTagName('tr');
  function stripe() {
    var counter = 0;
    for (var i=1; i<trs.length; i++) {
      var tr = trs[i];
      if (tr.style.display != 'none')
        tr.style.backgroundColor = counter++%2==0?'#ddddff':'';
    }
  }
  stripe();
  var filterBox = document.createElement('div');
  filterBox.innerHTML = '<input type=text> &lt;--- Type in this box to filter the rows in the table';
  table.parentNode.insertBefore(filterBox, table);
  filterBox = filterBox.firstChild;
  var lastSearch = '';
  setInterval(function() {
    var search = filterBox.value.toLowerCase();
    if (lastSearch == search)
      return;
    lastSearch = search;
    var hi='';
    for (var i=1; i<trs.length; i++) {
      var tr = trs[i];
      hi = tr.style.display = !search || tr.innerHTML.toLowerCase().indexOf(search) >= 0 ? '':'none';
    }
    stripe();
  }, 500);
})()