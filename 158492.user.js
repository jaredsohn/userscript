// ==UserScript==
// @description メダルチャンスなどの景品の獲得状況を棒にする
// @name imas cg reward bar
// @namespace http://userscripts.org/users/59751
// @include http://sp.pf.mbga.jp/12008305/*
// ==/UserScript==

(function() {
  if (location.href.indexOf("%2Fevent_assault_reward_chance%2F") < 0 &&
      location.href.indexOf("%2Fevent_date_box_reward") < 0)
    return;
  // 画像付きの景品
  hoge(document.querySelectorAll('.large')); // 「1 / 2」 の 1
  // 画像無しの景品(シャッターチャンス)
  hoge(document.querySelectorAll('span[style="font-size:medium;"]'));
})();

function hoge(elements) {
  for (var i = 0; i < elements.length; ++i) {
    var e = elements[i];
    var rest = e.textContent;
    var total = e.nextSibling.textContent.match(/(\d+)/)[1]; // 「/ 2」
    var bar = createBar(total - rest, total);
    e.parentNode.appendChild(bar);
  }
}

function createBar(count, total) {
  var width = 100;
  var height = 8;

  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext('2d');

  // 全体をグラデーションで塗る
  ctx.strokeStyle = "white";
  var g = ctx.createLinearGradient(0, 0, width, 0);
  g.addColorStop(0, '#ff9933');
  g.addColorStop(1, 'yellow');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, width, height);
  // 右側を黒で塗る
  if (count < total) {
    ctx.fillStyle = "black";
    var x = count / total * width;
    ctx.fillRect(x, 0, width-x, height);
  }
  // 枠を書く
  ctx.strokeStyle = "white";
  ctx.strokeRect(0.5, 0.5, width-1, height-1); // このようにしないとぼける

  return canvas;
}
