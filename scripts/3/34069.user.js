// ==UserScript==
// @name           Nicopediaholic Test
// @namespace      http://dic.nicovideo.jp/u/530068/
// @description    Script for Nicopediaholic Test
// @include        http://dic.nicovideo.jp/a/%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AF%E3%83%8B%E3%82%B3%E3%83%8B%E3%82%B3%E5%A4%A7%E7%99%BE%E7%A7%91%E4%B8%AD%E6%AF%92%E3%81%A7%E3%81%97%E3%82%87%E3%81%86%E3%81%8B%E3%83%86%E3%82%B9%E3%83%88
// ==/UserScript==

// 仕様
// ・リビジョン80745以外では動かないかも
// ・エキストラボーナスは0点扱い
// ・はい・いいえの代わりにOK・キャンセル

function getInnerText(e) {
  if (e.innerText == undefined) {
    return e.textContent;
  } else {
    return e.innerText;
  }
}

function setInnerText(e, t) {
  if (e.innerText == undefined) {
    e.textContent = t;
  } else {
    e.innerText = t;
  }
}

var ol = document.getElementsByTagName('ol')[0];
var lis = ol.getElementsByTagName('li');
var i;
for (i = 0; i < lis.length; ++i) {
  var text = getInnerText(lis[i]);
  var m = text.match('(-?[0-9]+)\u70B9');
  var point = '0';
  if (m != null && m[1] != undefined) {
    point = m[1];
  }
  var checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.name = point;
  checkBox.className = 'holicScore';
  lis[i].insertBefore(checkBox, lis[i].firstChild);
}

function calcScore () {
  var inputs = document.getElementsByTagName('input');
  var i;
  var score = 0;
  for (i = 0; i < inputs.length; ++i) {
    if (inputs[i].className == 'holicScore') {
      if (inputs[i].checked) {
        score += parseInt(inputs[i].name);
      }
    }
  }
  setInnerText(document.getElementById('holicScoreValue'), score + '\u70B9');
}


var scoreBtn = document.createElement('input');
scoreBtn.type = 'button';
scoreBtn.value = '\u63A1\u70B9';
try {
  scoreBtn.addEventListener('click', calcScore, true);
} catch (e) {
  scoreBtn.onclick = calcScore;
}

var scoreValue = document.createElement('span');
scoreValue.id = 'holicScoreValue';
scoreValue.appendChild(document.createTextNode('\u672A\u63A1\u70B9'))

var scoreBox = document.createElement('p');
scoreBox.appendChild(scoreBtn);
scoreBox.appendChild(scoreValue);

ol.parentNode.insertBefore(scoreBox, ol.nextSibling);
