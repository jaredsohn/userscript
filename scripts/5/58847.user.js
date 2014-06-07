// ==UserScript==
// @name           collectr.net - make sortable results table 
// @namespace      ak
// @include        http://collectr.net/*
// ==/UserScript==

function addGlobalStyle(css) { 
  var head, style;
  head = document.getElementsByTagName('head')[0]; 
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css; 
  head.appendChild(style);
}

function addJS(js) {
  var script = document.createElement('script');
  script.src = js;
  document.getElementsByTagName('head')[0].appendChild(script);
}

addJS('http://www.kryogenix.org/code/browser/sorttable/sorttable.js');
addJS('http://www.mattkruse.com/javascript/date/date.js');

if(unsafeWindow.$$ != undefined && (c = unsafeWindow.$$('div.content').first())) {
  table = new unsafeWindow.Element('table', {class: 'ak sortable'});
  tbody = new unsafeWindow.Element('tbody');
  row = new unsafeWindow.Element('tr');
  row.newTH = function(text) {
    row.insert(new unsafeWindow.Element('th', {class: 'match'}).insert(
      new unsafeWindow.Element('a', {href: '#', title: 'Click to sort', onclick: 'return false;'}).insert(text)));
    return row;
  };
  row.newTH("Name").newTH("Site").newTH("Hoster").newTH("Datum");
  tbody.insert(row);
  unsafeWindow.$$('.results li').each(function(elem) {
    // Werte ermitteln
    parts = elem.innerHTML.split("<br>");
    match = parts[0].replace(/<big>(.*)<\/big>/, "$1");
    innerparts = parts[1].split("<small>");
    site = innerparts[0];
    parts[1].search(/<small>(.*)<\/small>/);
    inner2parts = RegExp.$1.split(String.fromCharCode(8212));
    hoster = inner2parts[0];
    datetime = inner2parts[1];
    // Zeile und Zellen bauen
    row = new unsafeWindow.Element('tr');
    row.insert(new unsafeWindow.Element('td', {class: 'match'}).insert(match));
    row.insert(new unsafeWindow.Element('td', {class: 'site'}).insert(site));
    row.insert(new unsafeWindow.Element('td', {class: 'hoster'}).insert(hoster));
    row.insert(new unsafeWindow.Element('td', {class: 'datetime'}).insert(datetime));
    // Zeile anhängen
    tbody.insert(row);
  });
  table.insert(tbody);
  c.insert({top: table});
  unsafeWindow.$$('div.content div, h1.related, ul.results').each(function(elem) { elem.remove(); });
  addGlobalStyle('table.ak td.datetime { white-space: nowrap; }');
  addGlobalStyle('table.ak td.site, table.ak td.hoster, table.ak td.datetime { font-size:smaller; }');
  addGlobalStyle('table.ak a { color: black; }');
  addGlobalStyle('table.ak a:hover { background:transparent none repeat scroll 0 0; color: black; text-decoration: underline; }');
  addGlobalStyle('table.ak img { margin-right:4px; vertical-align:middle; }');
  window.setTimeout('window.sorttable.init', 1000);
  window.setTimeout("$$('table.ak td.datetime').each(function(elem) { var d = getDateFromFormat(elem.innerHTML.trim(), 'd.M.y @ H:m'); var customDate = formatDate(new Date(d), 'yyyyMMddHHmmss'); elem.setAttribute('sorttable_customkey', customDate); })", 1000);
}

