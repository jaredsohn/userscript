// ==UserScript==
// @name           Mangafox Sort Bookmarks
// @namespace      http://userscripts.org/scripts/show/13333
// @include        http://www.mangafox.com/bookmark/*
// ==/UserScript==

if (location.href.indexOf('reloaded')==-1) location.replace(location.href+'?reloaded');
var ttl = document.evaluate('//th[@class="no"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var lst = document.evaluate('//table[@id="listing"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.childNodes[1];
var lobj = new Array(lst.childNodes.length/2 -1);
for (var i=0; i<lobj.length; ++i) lobj[i] = new Array(5);
var j = 0;

var td = new Date();
var yd = new Date();
yd.setDate(yd.getDate()-1);
for (var i=2; i<lst.childNodes.length; i+=2)
{
lobj[j][0] = lst.childNodes[i];
lobj[j][1] = lobj[j][0].childNodes[1].childNodes[3].innerHTML;
lobj[j][2] = lobj[j][0].childNodes[3].innerHTML.match(/<\/a> on (.*)/)[1];
lobj[j][3] = lobj[j][0].childNodes[5].innerHTML;
lobj[j][4] = lobj[j][0].childNodes[7].innerHTML;
lobj[j][0] = lobj[j][0].innerHTML;


for (var k=2; k<5; k++)
{
if (lobj[j][k] == "Today") lobj[j][k] = td.getTime();
else if (lobj[j][k] == "Yesterday") lobj[j][k] = yd.getTime();
else lobj[j][k] = Date.parse(lobj[j][k]);
}

if (lobj[j][2] > lobj[j][3]) lobj[j][0] = lobj[j][0].replace(/<td/ig, "<td style='background-color:#FC9'");

j++;
}

customSort(1);

//somehow i couldn't get a forloop to work here...
ttl.snapshotItem(0).addEventListener("click",function() {customSort(0);},false);
ttl.snapshotItem(1).addEventListener("click",function() {customSort(1);},false);
ttl.snapshotItem(2).addEventListener("click",function() {customSort(2);},false);
ttl.snapshotItem(3).addEventListener("click",function() {customSort(3);},false);

addStyle('th.no {text-decoration: underline !important; cursor:pointer !important;}');

function customSort(n)
{

if (n == 0) lobj.sort(sBN);
else if (n == 1) lobj.sort(sBC);
else if (n == 2) lobj.sort(sBA);
else if (n == 3) lobj.sort(sBD);
var k = 0;
for (var i=2; i<lst.childNodes.length; i+=2)
{
lst.childNodes[i].innerHTML = lobj[k][0];
k++;
}

}

function sBN(a, b) 
{
if (a[1] > b[1]) return 1;
if (a[1] < b[1]) return -1;
return 0;
}

function sBC(a, b) 
{
if (a[2] > b[2]) return -1;
if (a[2] < b[2]) return 1;

if (a[3] > b[3]) return 1;
if (a[3] < b[3]) return -1;

if (a[1] > b[1]) return 1;
if (a[1] < b[1]) return -1;
return 0;
}

function sBA(a, b) 
{
if (a[3] > b[3]) return -1;
if (a[3] < b[3]) return 1;

if (a[1] > b[1]) return 1;
if (a[1] < b[1]) return -1;
return 0;
}

function sBD(a, b) 
{
if (a[4] > b[4]) return -1;
if (a[4] < b[4]) return 1;

if (a[1] > b[1]) return 1;
if (a[1] < b[1]) return -1;
return 0;
}


function addStyle(css) {
    var head, style;
    head = document.evaluate('//head', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}