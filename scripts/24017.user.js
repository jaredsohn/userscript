// ==UserScript==
// @name         Douban Search for TXT-books
// @namespace    http://xydonkey.blogbus.com/
// @include       http://www.douban.com/subject/*
// @description  When you surving an item, this script will show an icon in the top right corner. On mouse over the search links for Verycd ,Xunlei, Google and TXT-books Searcher(via Google Custom Search) are shown. Based on http://userscripts.org/scripts/show/10789
// under GPL 3.0 Lisence.
// ==/UserScript==

/*

  Author:  Xiao Yang
  Contact: xiaoyang.tt@gmail.com
  Date:    July 20th 2007

  Update: Yuancheng Yang
  Contact: koji1986@gmail.com
  Site: http://yangyc.com
  
*/

//get the title
var head1 = document.evaluate(
    '//h1',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
var keyword=head1.snapshotItem(0).firstChild.nodeValue;

//add css
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#myDouban { position: fixed; z-index: 32767; top: 0; right: 0; padding: 0 0 0 20px; min-height: 20px; background: 2px 2px url("chrome://browser/skin/Search-glass.png") no-repeat; }');

addGlobalStyle('#myDouban:hover { padding: 0; }');
addGlobalStyle('#myDouban > div { display: none; }');
addGlobalStyle('#myDouban:hover > div { display: block; padding: 1px 0; background: #f8f8f8; -moz-border-radius: 0 0 0 10px; border: solid #ccc; border-width: 0 0 1px 1px; }');
addGlobalStyle('#myDouban a { display: block; margin: 4px 0; padding: 0 10px; font-family: "Verdana"; font-size: 11px; line-height: 14px; font-weight: normal; color: #669; text-decoration: underline; text-align: left; background: #f8f8f8; border: 0; }');
addGlobalStyle('#myDouban a:hover { color: #f66; }');

//create new element
	var myDouban = document.createElement('div');
	myDouban.setAttribute('id', 'myDouban');
	document.body.appendChild(myDouban);

	var mySearch = document.createElement('div');
	myDouban.appendChild(mySearch);

//verycd
mySearch.innerHTML += '<a target="_blank" href=http://find.verycd.com/folders/'+ encodeURIComponent(keyword) +'>'+ 'Search for ' + keyword +' in VeryCD</a>';

//xunlei
mySearch.innerHTML += '<a target="_blank" href=http://www.gougou.com/search?search=' + encodeURIComponent(keyword) +'>'+ 'Search for ' + keyword +' in XunLei</a>';

//google
mySearch.innerHTML += '<a target="_blank" href=http://www.google.cn/search?q='+ encodeURIComponent(keyword) +'>'+ 'Search for ' + keyword +' in Google</a>';

//BUAA.lib
mySearch.innerHTML += '<a target="_blank" href=http://202.112.134.140:8080/opac/openlink.php?strText='+ encodeURIComponent(keyword) +'&doctype=ALL&strSearchType=title&match_flag=forward&displaypg=20&sort=CATA_DATE&orderby=desc&showmode=list&location=ALL>'+ 'Search for ' + keyword +' in BUAA.lib</a>';

//txt books Google custom search
mySearch.innerHTML += '<a target="_blank" href=http://www.google.com/cse?cx=000763885410988186558%3A_7dk1wtajug&q='+ encodeURIComponent(keyword) +'&sa=Search&cof=FORID%3A0&ie=utf-8&oe=utf-8>'+ 'Search for ' + keyword +' in Txt-books Searcher</a>';;