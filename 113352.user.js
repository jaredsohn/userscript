// ==UserScript==
// @name Read
// @include http*
// @date 2010-1-22
// ==/UserScript==

function genericOnClick(info, tab) {
  window.open ("http://www.douban.com/subject_search?search_text="+encodeURI(info.selectionText) ) 
}

// Create Douban Search selection context menu item
var contexts = ["selection"];
var id = chrome.contextMenus.create({"title": "用豆瓣搜索" , "contexts":["selection"],
                                       "onclick": genericOnClick});
console.log("'" + context + "' item:" + id);