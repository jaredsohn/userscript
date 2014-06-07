// ==UserScript==
// @name        clien highlight words
// @namespace   http://www.clien.net/
// @description 특정 단어에 형광펜 효과를 줍니다.
// @version     1.0.1
// @require     http://code.jquery.com/jquery-latest.js
// @include     http://www.clien.net/cs2/bbs/board.php?bo_table=*
// @include     http://clien.net/cs2/bbs/board.php?bo_table=*
// ==/UserScript==

// ...script by NuRi

// 데이터 정리
var clien_highlightlist_key = "clien_highlight_list";
var clien_highlightwordlist_key = "clien_highlight_word_list";
var highlightlist = {};
var highlightwordlist = [];
if (typeof(GM_getValue(clien_highlightlist_key)) != 'undefined') eval("highlightlist={"+GM_getValue(clien_highlightlist_key)+"}");
if (typeof(GM_getValue(clien_highlightwordlist_key)) != 'undefined') eval("highlightwordlist=[" + GM_getValue(clien_highlightwordlist_key) + "]");

// constants
var validWord = /^\".+\"$/;

/*
// call jQuery
var s = document.createElement('script'); 
s.src = 'http://jquery.com/src/jquery-latest.js';
s.type = 'text/javascript';
document.getElementsByTagName('body')[0].appendChild(s);
*/

// 리스트 관리
function addToHighlightList(item) {
	if (item.match(validWord)) {
		highlightwordlist.push(escape(item.slice(1, item.length-1).toLowerCase()));
	} else 
		highlightlist[item] = " ";
  saveData();
  setTimeout(highlightWord, 250);
}

function removeFromHighlightList(item) {
	if (item.match(validWord)) {
		var index = -1;
		for (var i = 0; i < highlightwordlist.length; i++) {
			var text = item.slice(1, item.length-1).toLowerCase();
			text = escape(text);
			if (highlightwordlist[i].match(text)) {
				index = i;
				break;
			}
		}
		if (-1 != index) highlightwordlist.splice(index, 1);
	}
	else if (highlightlist[item]) highlightlist[item] = null;
  saveData();
}

function saveData() {
  GM_setValue(clien_highlightlist_key, cfg2str());
  GM_setValue(clien_highlightwordlist_key, wordcfg2str());
}

function cfg2str() {
  var str = '';
  for (name in highlightlist) if (highlightlist[name]) str += "\""+ name + "\":\"" + highlightlist[name] + "\",";
  return str;
}

function wordcfg2str() {
	var str = "";
	for (var i = 0; i < highlightwordlist.length ; i++) {
		str += (str.length > 0) ? ", \"" : "\"";
		str += highlightwordlist[i] + "\"";
	}
	return str;
}

// 메뉴 처리
function menu_command_add(e) {
  var name = prompt("관심법을 발동할 항목을 입력해 주세요.\n입력 방법은 비기전수 메뉴를 참조하세요.");
  if (name && name.match(validWord)) {
    addToHighlightList(name);
  } else {
    alert("대상 지정이 잘못되었습니다.");
  }
}

function menu_command_remove(e) {
  var name = prompt("관심법을 풀 항목을 입력해 주세요.\n입력 방법은 비기 전수를 참조하세요.");
  if (name && name.match(validWord)) removeFromHighlightList(name);
}

function menu_command_list(e) {
  var str = cfg2str();
  var str2 = wordcfg2str();
  alert("넌 이미 주목됐다.\n" + str.split(",").join("\n").replace(/(\":|\")/g, "") + "\n"+ unescape(str2.split(",").join("\n")));
}

function menu_command_help(e) {
  var str = "관심법 안내\n\n특정 단어 강조는 \"강조할 단어\"";
  alert(str);
}

GM_registerMenuCommand("클리앙 관심법 : 더하기", menu_command_add);
GM_registerMenuCommand("클리앙 관심법 : 빼기", menu_command_remove);
GM_registerMenuCommand("클리앙 관심법 : 목록 보기", menu_command_list);
GM_registerMenuCommand("클리앙 관심법 : 비기 전수", menu_command_help);

// 목록제거
function highlightWord() {
    jQuery = unsafeWindow['jQuery'];
    if (typeof(jQuery) == 'undefined') {
    	return;
    }
	jQuery.noConflict();

	for (var i=0;i < highlightwordlist.length; i++) {
      var str = jQuery.trim(unescape(highlightwordlist[i]));
      if (str.length > 0) {
      	var search = "td.post_subject a:contains('" + str + "')";
        jQuery(search).each(function() {
        	var htmlStr = jQuery(this).html();
        	var replacedStr = htmlStr.replace(str, "<span style='background-color:#FFFF00;color: #000;font-size:1.2em;'>" + str + "</span>");
        	jQuery(this).html(replacedStr);
        });
      }
	}
}

//addJQuery(letsJQuery);

function addMyEvent(obj, event, handler){
	if(obj.addEventListener){
		obj.addEventListener(event,handler,false);
	}
	else if(obj.attachEvent){
		obj.attachEvent("on"+event,handler);
	}
	else{
		obj["on"+event]=handler;
	}
}

addMyEvent(window, 'load', highlightWord);