// ==UserScript==
// @name        clien block black words
// @namespace   http://www.clien.net/
// @description 보고 싶지 않은 글제목을 가려 줍니다.
// @version     1.0.1
// @require http://code.jquery.com/jquery-latest.js
// @include     http://www.clien.net/cs2/bbs/board.php?bo_table=*
// @include     http://clien.net/cs2/bbs/board.php?bo_table=*
// ==/UserScript==

// ...script by NuRi

// 데이터 정리
var clien_blacklist_key = "clien_mugansim_list";
var clien_blackwordlist_key = "clien_mugansim_word_list";
var blacklist = {};
var blackwordlist = [];
if (typeof(GM_getValue(clien_blacklist_key)) != 'undefined') eval("blacklist={"+GM_getValue(clien_blacklist_key)+"}");
if (typeof(GM_getValue(clien_blackwordlist_key)) != 'undefined') eval("blackwordlist=[" + GM_getValue(clien_blackwordlist_key) + "]");

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
function addToBlackList(item) {
	if (item.match(validWord)) {
		blackwordlist.push(escape(item.slice(1, item.length-1).toLowerCase()));
	} else 
		blacklist[item] = " ";
  saveData();
  setTimeout(hideSubject, 250);
}

function removeFromBlackList(item) {
	if (item.match(validWord)) {
		var index = -1;
		for (var i = 0; i < blackwordlist.length; i++) {
			var text = item.slice(1, item.length-1).toLowerCase();
			text = escape(text);
			if (blackwordlist[i].match(text)) {
				index = i;
				break;
			}
		}
		if (-1 != index) blackwordlist.splice(index, 1);
	}
	else if (blacklist[item]) blacklist[item] = null;
  saveData();
}

function saveData() {
  GM_setValue(clien_blacklist_key, cfg2str());
  GM_setValue(clien_blackwordlist_key, wordcfg2str());
}

function cfg2str() {
  var str = '';
  for (name in blacklist) if (blacklist[name]) str += "\""+ name + "\":\"" + blacklist[name] + "\",";
  return str;
}

function wordcfg2str() {
	var str = "";
	for (var i = 0; i < blackwordlist.length ; i++) {
		str += (str.length > 0) ? ", \"" : "\"";
		str += blackwordlist[i] + "\"";
	}
	return str;
}

// 메뉴 처리
function menu_command_add(e) {
  var name = prompt("무념무상을 발동할 항목을 입력해 주세요.\n입력 방법은 비기전수 메뉴를 참조하세요.");
  if (name && name.match(validWord)) {
    addToBlackList(name);
  } else {
    alert("대상 지정이 잘못되었습니다.");
  }
}

function menu_command_remove(e) {
  var name = prompt("무념무상을 풀 항목을 입력해 주세요.\n입력 방법은 비기 전수를 참조하세요.");
  if (name && name.match(validWord)) removeFromBlackList(name);
}

function menu_command_list(e) {
  var str = cfg2str();
  var str2 = wordcfg2str();
  alert("넌 이미 무시됐다.\n" + str.split(",").join("\n").replace(/(\":|\")/g, "") + "\n"+ unescape(str2.split(",").join("\n")));
}

function menu_command_help(e) {
  var str = "무념무상 안내\n\n특정 단어 차단은 \"차단할 단어\"";
  alert(str);
}

GM_registerMenuCommand("클리앙 무념무상 : 더하기", menu_command_add);
GM_registerMenuCommand("클리앙 무념무상 : 빼기", menu_command_remove);
GM_registerMenuCommand("클리앙 무념무상 : 목록 보기", menu_command_list);
GM_registerMenuCommand("클리앙 무념무상 : 비기 전수", menu_command_help);

// 목록제거
function hideSubject() {
    jQuery = unsafeWindow['jQuery'];
    if (typeof(jQuery) == 'undefined') {
    	return;
    }
	jQuery.noConflict();
	for (var i=0;i < blackwordlist.length; i++) {
      var str = jQuery.trim(unescape(blackwordlist[i]));
      if (str.length > 0) {
      	var search = "td.post_subject a:contains('" + str + "')";
        jQuery(search).css({
              'text-align': 'right',
              'color': 'white',
              'a:hover': 'color:#FF00FF'
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

addMyEvent(window, 'load', hideSubject);