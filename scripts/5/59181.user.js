// ==UserScript==
// @name           HatenaQuestionCustomizer
// @namespace      hatena
// @description    Customize HatenaQuestion
// @version        1.0.1
// @include        http://q.hatena.ne.jp/*
// ==/UserScript==

// 人力検索の質問ページの機能をカストマイズする。
// 1. 回答内容の表示・非表示を画面上で切り替えられるようにする。
// 2. 初期表示において、特定のIDの回答内容を非表示にできる。非表示にしたいIDをDEFAULT_HIDE_IDに登録すること。
// 3. イメージ付きの質問ページの場合、縮小イメージへのマウスオーバーによりリンク先イメージを表示する。

// -------- 修正履歴 -----------
// 2009-10-05 新規
// 2009-10-06 アンケートでもイメージ表示できるように修正

// 非表示ID
var DEFAULT_HIDE_ID = [
];

var ID_PREFIX = "status-change-button-";
var ID_IMG_CLASS = "question-img";
var HATENA_QUESTION_PREFIX = "http://q.hatena.ne.jp";
var MARK_SIZE = "1em";
var DELTA = 5;
var MARGIN_SIZE = '10px';
var BORDER_STYLE = 'solid';
var BORDER_COLOR = 'blue';
var BORDER_SIZE = '5px';
var OPEN_MARK = " 曰 ";
var CLOSE_MARK = " 田 ";
var imgFrame = null;

function contains(group,elem) {
  for (var i = 0, n = group.length; i < n; i++) {
    if (group[i] == elem) {
      return true;
    }
  }
  return false;
}
function isTarget(event) {
  var src = event.target;
  if (src.nodeName.toUpperCase() == 'SPAN' && src.id.length > ID_PREFIX.length && src.id.substr(0,ID_PREFIX.length) == ID_PREFIX) {
    return true;
  }
  else {
    return false;
  }
}
function isTargetImage(event) {
  var src = event.target;
  if (src.nodeName.toUpperCase() == 'IMG' && src.className == ID_IMG_CLASS) {
    return true;
  }
  else {
    return false;
  }
}
function show(id) {
    bodies[id].style.display = 'block';
    footers[id].style.display = 'block';
}
function hide(id) {
    bodies[id].style.display = 'none';
    footers[id].style.display = 'none';
}

// リンク先イメージパスの取得
var quesHeads = document.getElementsByClassName("question-header","h1",document);
var imgPath = null;
loop:
for (var i = 0, n = quesHeads.length; i < n; i++) {
  var children = quesHeads.item(i).childNodes;
  for (var j = 0 , m = children.length; j < m; j++) {
    if (children[j].tagName == "A") {
      var href = children[j].getAttribute("href");
      if (href.match(/\.(jpg|png|gif|bmp)$/i)) {
        imgPath = href;
        var imgs = children[j].getElementsByTagName("img");
        for (var k = 0, p = imgs.length; k < p; k++) {
          imgs[k].setAttribute('class',ID_IMG_CLASS);
        }
        break loop;
      }
    }
  }
}
if (imgPath) {
  // 本イメージ用div作成
  imgFrame = document.createElement("img");
  var imgUrl = HATENA_QUESTION_PREFIX + imgPath
  imgFrame.setAttribute("src",imgUrl);
  imgFrame.style.position = "absolute";
  imgFrame.style.marginLeft = MARGIN_SIZE;
  imgFrame.style.marginRight = MARGIN_SIZE;
  imgFrame.style.marginTop = MARGIN_SIZE;
  imgFrame.style.marginBottom = MARGIN_SIZE;
  imgFrame.style.borderStyle = BORDER_STYLE;
  imgFrame.style.borderColor = BORDER_COLOR;
  imgFrame.style.borderWidth = BORDER_SIZE;
  var body = document.getElementById("body");
  body.appendChild(imgFrame);
  imgFrame.style.display = 'none';
}

// 対象ページ(人力検索質問ページ)の場合のみ、切り替えを行う
var ansList = document.getElementById("read_answer_list");
if (ansList != null) {
  var answers  = document.getElementsByClassName("answer","div");
  var titles  = document.getElementsByClassName("answer-title","h3",ansList);
  var numbers  = document.getElementsByClassName("answer-number","a",ansList);
  var bodies  = document.getElementsByClassName("answer-body","div",ansList);
  var footers  = document.getElementsByClassName("answer-footer","div",ansList);
  var userNames  = document.getElementsByClassName("answer-user-name","span",ansList);

  for (var id = answers.length-1; id >= 0; id--) {
    var userAs = userNames[id].getElementsByTagName("a");
    var userName = userAs[0].textContent ;
    var parent = answers[id].parentNode;
    var toggleNode = document.createElement("span");
    var nodeMark = null;
    if (contains(DEFAULT_HIDE_ID,userName)) {
      nodeMark = CLOSE_MARK;
      titles[id].insertBefore(toggleNode,numbers[id]);
      hide(id);
    }
    else {
      nodeMark = OPEN_MARK;
      titles[id].insertBefore(toggleNode,numbers[id]);
    }
    toggleNode.innerHTML = nodeMark;
    toggleNode.id = ID_PREFIX+id;
    toggleNode.style.fontSize = MARK_SIZE;
  }

  // 回答内容の表示・非表示切替のためのハンドラを登録
  document.addEventListener('click', function(event) {
    if (isTarget(event)) {
      var id = event.target.id.substr(ID_PREFIX.length);
      if (event.target.innerHTML == OPEN_MARK) {
        hide(id);
        event.target.innerHTML = CLOSE_MARK;
      }
      else {
        show(id);
        event.target.innerHTML = OPEN_MARK;
      }
    }
    else {
    }
  }, true);
}

// リンク先イメージ取得のためのハンドラを登録
document.addEventListener('mouseover', function(event) {
  if (isTargetImage(event)) {
    if (imgFrame) {
      imgFrame.style.left = event.pageX - imgFrame.width - DELTA;
      imgFrame.style.top = event.pageY + DELTA;
      imgFrame.style.display = 'block';
    }
  }
}, true);
document.addEventListener('mouseout', function(event) {
  if (isTargetImage(event)) {
    if (imgFrame) {
      imgFrame.style.display = 'none';
    }
  }
}, true);

