// ==UserScript==
// @name         Douban Search for Resource
// @namespace    http://xydonkey.blogbus.com/
// @include       http://movie.douban.com/subject/*
// @include       http://music.douban.com/subject/*
// @include       http://book.douban.com/subject/*
// @description  v0.1 - When you surving an item, this script will show an icon in the top right corner. On mouse over the search links for Verycd ,Xunlei and Google are shown.v0.2 change search icon, change @include address due to Douban.com adopts new structure
// under GPL 3.0 Lisence.
// ==/UserScript==

/*

  Author:  Xiao Yang
  Contact: xiaoyang0304@gmail.com
  Date:    July 20th 2007

*/

//get the title
var keyword=document.getElementsByTag("h1")[0].firstElementChild.innerHTML;;

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

addGlobalStyle('#myDouban { position: fixed; z-index: 32767; top: 0; right: 0; padding: 0 0 0 64px; min-height: 64px; background: 2px 2px url("http://help.grassroots.org/files/seo.png") no-repeat; }');

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
mySearch.innerHTML += '<a target="_blank" href=http://www.google.com/search?q='+ encodeURIComponent(keyword) +'>'+ 'Search for ' + keyword +' in Google</a>';
;
