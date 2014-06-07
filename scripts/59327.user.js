// ==UserScript==
// @name           HatenaQuestionListCustomizer
// @namespace      hatena
// @description    Customize HatenaQuestionList
// @version        1.0
// @include        http://q.hatena.ne.jp/list
// ==/UserScript==

// 人力検索の質問一覧の機能をカストマイズする。
// 1. 初期表示において、特定のIDの質問内容を固定文字列に置き換える。
//    見たければリンクをクリックして質問ページを見てください。
//    非表示にしたいIDをDEFAULT_HIDE_IDに登録すること。

// -------- 修正履歴 -----------
// 2009-10-08 新規

// 非表示ID
var DEFAULT_HIDE_ID = [
];

var CLOSE_MARK = 'c';
var OPEN_MARK = 'o';
var HIDE_TEXT = "(非表示)";

function contains(group,elem) {
  for (var i = 0, n = group.length; i < n; i++) {
    if (group[i] == elem) {
      return true;
    }
  }
  return false;
}
function createWrapper(elem,mark) {
  var wrapper = document.createElement("span");
  for (var id = 0, num = elem.childNodes.length; id < num; id++) {
    var child = elem.childNodes[id];
    var cloneChild = null;
    switch (typeof child) {
      case 'string':
        cloneChild = document.createTextNode(child);
        break;
      default:
        cloneChild = child.cloneNode(true);
        // 非表示IDならば固定文字列で置き換える
        if (child.tagName == 'A' && mark == CLOSE_MARK) {
            cloneChild.textContent = HIDE_TEXT;
        }
        break;
    }
    wrapper.appendChild(cloneChild);
  }
  return wrapper;
}
// 処理開始
var qlt = document.getElementsByClassName("questionlisttable","table");
var container = qlt[0];
var questionCells = document.getElementsByClassName("questioncell","td",container);
var userCells = document.getElementsByClassName("usercell","td",container);
var questionWrappers = [];
for (var id = 0, cellNum = userCells.length; id < cellNum; id++) {
  var userAs = userCells[id].getElementsByTagName("a");
  var userName = userAs[0].textContent;
  var mark = contains(DEFAULT_HIDE_ID,userName)?CLOSE_MARK:OPEN_MARK;

  // Wrapperの作成
  var questionWrapper = createWrapper(questionCells[id],mark);
  questionWrappers.push(questionWrapper);
  for (var n = questionCells[id].childNodes.length-1; n >= 0; n--) {
    questionCells[id].removeChild(questionCells[id].childNodes[n]);
  }
  questionCells[id].appendChild(questionWrapper);
}

