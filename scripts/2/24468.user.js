// ==UserScript==
// @name           Summer of Code sorter
// @namespace      code.google.com/soc/
// @include        http://code.google.com/soc/2008/plone/open.html
// ==/UserScript==
var cells, subs, title, ts;
var proto = document.createElement('script');
proto.type = 'text/javascript';
proto.src = 'http://www.kryogenix.org/code/browser/sorttable/sorttable.js';
document.getElementsByTagName('head')[0].appendChild(proto);
var ths = document.evaluate("//th", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var tab = document.createElement('table');
var theadw = document.createElement('thead');
var thead = document.createElement('tr');
theadw.appendChild(thead);
var elemtitle = document.createElement('th');
elemtitle.innerHTML = "Title";
var elemlm = document.createElement('th');
elemlm.innerHTML = "Last modified";
var elemstu = document.createElement('th');
elemstu.innerHTML = "Student";
var elemmen = document.createElement('th');
elemmen.innerHTML = "Mentor";
var elemsc = document.createElement('th');
elemsc.innerHTML = "Score";
thead.appendChild(elemtitle);
thead.appendChild(elemlm);
thead.appendChild(elemstu);
thead.appendChild(elemmen);
thead.appendChild(elemsc);
tab.appendChild(theadw);
var tbody = document.createElement('tbody');
tab.appendChild(tbody);
mn = ths.snapshotItem(3).parentNode.parentNode;
mn.style.display = "none";
mn.parentNode.parentNode.insertBefore(tab, mn.parentNode);
var applications = document.evaluate("//tr[@class='listapp']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
tab.className = 'sortable applist';
for (var i = 0; i < applications.snapshotLength; i++) {
    app = applications.snapshotItem(i);
    cells = app.getElementsByTagName('td');
    subs = cells[0].getElementsByTagName('table')[0].getElementsByTagName('tr');
    title = subs[0].getElementsByTagName('td')[0];
    ts = subs[1].getElementsByTagName('td')[0];
    cells[0].innerHTML = title.innerHTML;
    var elem = document.createElement('td');
    elem.innerHTML = ts.innerHTML;
    cells[1].parentNode.insertBefore(elem, cells[1]);
    tbody.appendChild(app);

}