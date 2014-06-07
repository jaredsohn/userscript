// ==UserScript==
// @name           Filtering in wikipedia tables
// @description    Remove all rows with some name of product from all "comparison" tables
// @namespace      skyboy
// @require  http://userscripts.org/scripts/source/44063.user.js
// @include        http://en.wikipedia.org/wiki/*
// @include        http://ru.wikipedia.org/wiki/*
// ==/UserScript==

function showAllRows() {
 $$('table.wikitable th.table-rh').getParent('tr').setStyle('display', 'table-row');
}
function hideSelectedRows(filterFunction) {
 $$('table.wikitable th.table-rh').filter(filterFunction).getParent('tr').setStyle('display', 'none');
}
$$('th.table-rh').getParent('tr').each(function(tr) {tr.grab(new Element('td').grab(
new Element('a', {'class': 'remove-this-from-all', 'text': '×'}).addEvent('click', function() {
 var name = this.getParent('tr').getElement('th.table-rh').get('text');
 hideSelectedRows(function(el) {return el.get('text') == name;});
})
)); });
