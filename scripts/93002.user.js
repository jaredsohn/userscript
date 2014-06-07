// ==UserScript==
// @name           DAMtomo TSV Generator
// @namespace      http://rimpei.org
// @description    DAM★とものマイページ・プロフィールページで、表示中のDAMコンテンツりれき（ランバトと精密採点DXのみで確認）をページ最下部にTSV形式で表示します。
// @include        http://www.clubdam.com/app/damtomo/MyPage.do
// @include        http://www.clubdam.com/app/damtomo/member/info/Profile.do?damtomoId=*
// ==/UserScript==

// http://www.otchy.net/20090120/first-five-lines-of-greasemonkey/
var d = document;
var $ = function(id) { return d.getElementById(id); }
var $x = function(xp) { return d.evaluate(xp, d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }
var $a = function(xp) { var r = d.evaluate(xp, d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); var a=[]; for(var i=0; i<r.snapshotLength; i++){ a.push(r.snapshotItem(i)); } return a; }
var $e = function(e,t,f) { if (!e) return; e.addEventListener(t, f, false); }

function tsv() {
  var headerParts = [];
  var lines = [];

  var tables = $a("id('DamHistory')/div[@style='display: block;']//table");

  for (var i = 0; i < tables.length; i++) {
    var rows = tables[i].rows;

    var lineParts = [];

    for (var j = 0; j < rows.length; j++) {
      var head = rows[j].cells[0].textContent;
      var body = rows[j].cells[1].textContent;

      if (head == "印刷用画面") continue;

      if (/曲名 ?\/ ?歌手名/.test(head)) {
        if (i == 0)
          headerParts.push("曲名", "歌手名");
        if (body.match(/^(.*[^ ]) ?\/ ?([^ ].*)$/)) {
          lineParts.push(RegExp.$1, RegExp.$2);
        } else {
          lineParts.push(body, "---");
        }
      } else {
        if (i == 0)
          headerParts.push(head);
        lineParts.push(body.replace(/ *(位|点|回|秒|\/ 100?)$/, ""));
      }
    }

    lines.push(lineParts.join("\t"));
  }

  var pre = $("tsv");
  if (!pre) {
    pre = d.createElement("pre");
    pre.id = "tsv";
    pre.style.fontSize = "10px";
    $("tsvBox").appendChild(pre);

    pre.innerHTML = headerParts.join("\t") + "\n";
  }

  lines.reverse();
  pre.innerHTML += lines.join("\n") + "\n";
}

var div = d.createElement("div");
div.id = "tsvBox"
div.style.textAlign = "left";

var input = d.createElement("input");
input.type = "button";
input.value = "Generate TSV";
input.addEventListener("click", function(e) { tsv(); }, false);

div.appendChild(input);
d.body.appendChild(div);
