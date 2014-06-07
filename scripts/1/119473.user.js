// ==UserScript==
// @name           cnews-quote++
// @namespace      opensci.ru/org100h
// @description    related: cnews.ru | Allow add 1-by-1 citations from the same forums page in reply form
// @include        http://live.cnews.ru/forum/*
// ==/UserScript==

/*
CHANGELOG
=========

Version 1.00 - 0:20 01.12.2011
     -  Initial revision

*/

(function() {
var temp 				=	document.evaluate("//div[contains(@class, 'postcolor')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
							if (temp==null) {
								return;
							}
var obj_ta 				=	document.evaluate("//textarea[@name='Post']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);

var testD				=	function(event) {
							var sel = window.getSelection();
							var selText = sel.toString();
							var count = sel.rangeCount;
							var temp = sel.anchorNode;
							temp = temp.parentNode;
							var i=0;
							while (!((temp.className == 'postcolor') || (i == 8) || temp==null)) {
								temp = temp.parentNode;
								i++;
							}
							if (i==8 || temp==null) {
							alert("Ничего не вставлено в форму ответа.\n\nПревышен лимит глубины поиска тела сообщения.\nВозможно, текст был выделен _не_ в сообщении?");
							return;
							}
							obj_ta.focus();
							var rng = document.getSelection();
							var arr = temp.id.split ("-");
							var paramPost = arr[0] + "='" + arr[1] + "'";
							var paramName = "name='" + temp.parentNode.parentNode.parentNode.firstChild.firstElementChild.childNodes[1].firstChild.text + "' ";
							var paramDate="date=' ' ";
							var quoteTaged ="[quote " + paramName + paramDate + paramPost + "]" + selText + "[/quote]" + "\n\n";
							obj_ta.value += quoteTaged;
							};
var init				=	function() {
							GM_log("Enter init...");
                        	var btn = document.createElement('input');
							btn.setAttribute('id', 'btn_quote_pp');
                        	btn.setAttribute('type', 'button');
                        	btn.setAttribute('value', '++');
                        	btn.addEventListener('click', testD, false);
                        	btn.style.position = 'fixed';
                        	btn.style.top = '32px';
                        	btn.style.right = '0px';
                        	btn.style.zIndex = '0999';
                        	var bdys = document.getElementsByTagName('body');
                        	bdys[0].appendChild(btn);
							};
  var addon_style = document.createElement('style');
      addon_style.setAttribute('type', "text/css");
      addon_style.appendChild(document.createTextNode("#btn_quote_pp {border: 2px solid red; font-size: 1.7em; font-weight: 800; background-color: #8B9BBA;} "));
  var addon_head = addon_title = 0;
  try {
    if (addon_head = document.getElementsByTagName('head')[0]) {
      addon_head.appendChild(addon_style);
    } else if (addon_title = document.getElementByTagName('title')[0])
      addon_title.parentNode.insertBefore(addon_style, addon_title);
  } catch(e) {}
init();
})();