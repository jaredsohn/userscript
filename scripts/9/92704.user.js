// ==UserScript==
// @name           Undertexter -> OtherSearchsites
// @namespace      Something
// @description    Goes directly to a searchlink on another site.
// @include        http://www.undertexter.se/*
// @version        0.5
// ==/UserScript==
//


var menuTitle = "Search On"

var urlList = [
    {title: 'Thepiratebay', url: 'http://thepiratebay.org/search/%s'},
    {title: 'Torrentz',      url: 'http://www.torrentz.com/search?f=%s'},
    {title: 'Flixster',     url: 'http://www.flixster.com/?q=%s'}
];
var urlList2 = [
    {title2: 'IMDB',     url2: 'http://www.imdb.com/find?q=%s2&s=all'},
    {title2: 'Youtube',     url2: 'http://www.youtube.com/results?search_query=%s2+trailer'}
];

var xpath = '//h2[contains(@class, "chapter")]';
var xpath2 = '//h1[contains(@class, "chapter")]';
var title = document.evaluate(xpath, document, null, XPathResult.STRING_TYPE, null);
var title2 = document.evaluate(xpath2, document, null, XPathResult.STRING_TYPE, null);
var t     = encodeURIComponent(title.stringValue.trim());
var t2     = encodeURIComponent(title2.stringValue.trim());
xpath     = '//img[contains(@oncontextmenu, "return false") and contains(@width, "107")]/..';
var menuLocation = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var elMenu       = menuLocation.snapshotItem(0).parentNode;
var elMenuItem   = menuLocation.snapshotItem(0);
var elHeading    = document.createElement('b');
elHeading.innerHTML = menuTitle;
elHeading.className = "rightlinkheader";
elMenu.insertBefore(elHeading, elMenuItem);
for(var i in urlList) {
    var a       = document.createElement('a');
    a.href      = urlList[i].url.replace('%s',t);
    a.innerHTML = '@' + urlList[i].title;
    var myDiv       = document.createElement('div');
	myDiv.setAttribute('style', 'align:right; display:block; width:100px; float:right; font-size:9px;');
    //myDiv.className = 'addthis_button_compact';
    myDiv.appendChild(a);
    elMenu.insertBefore(myDiv, elMenuItem);
}
for(var i in urlList2) {
    var a       = document.createElement('a');
    a.href      = urlList2[i].url2.replace('%s2',t2);
    a.innerHTML = '@' + urlList2[i].title2;
    var myDiv       = document.createElement('div');
	myDiv.setAttribute('style', 'align:right; display:block; width:100px; float:right; font-size:9px;');
    myDiv.appendChild(a);
    elMenu.insertBefore(myDiv, elMenuItem);
}