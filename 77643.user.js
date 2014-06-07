// ==UserScript==
// @name Kingdom Saga Helper
// @namespace http://userscripts.org/scripts/show/77643
// @description キングダムサーガを遊びやすくする
// @include http://ksgame*.gamania.co.jp/*/*
// @compatibilityBrowser Firefox 3.5+, Chrome 4+
// @compatibilityGameVer 1.0.0.0
// @version 2010.06.23
// ==/UserScript==

(function() {

var t = new Date(), id = function(s) {return document.getElementById(s);}
var webkit = (navigator.userAgent.toLowerCase().match(/webkit/)) ? true : false;
if (typeof localStorage != "object" && typeof globalStorage == "object")
  localStorage = globalStorage[location.host];

// CSS追加
var css = function() {
  return escape("\
    .kshelper_lvup {color: #600;}\
    #kshelper_chatcount {position: relative; float: left; top: -26px; left: 100px; font-weight: bold;}\
    #kshelper_memo {position: absolute; top: 2px; width: 600px; z-index: 777;}\
    #kshelper_textarea {width: 100%; height: 15em; padding: 5px; opacity: 0.9;}\
    #kshelper_mapmemo {position: absolute; top: 2px; width: 600px; z-index: 778;}\
    #kshelper_maptextarea {width: 100%; height: 15em; padding: 5px; opacity: 0.9; background-Color: #FFD;}\
    #kshelper_areainfo {position: absolute; z-index: 788; background: rgba(100%, 100%, 100%, 0.8); padding: 4px 8px; max-width: 90%;}\
    #kshelper_memo, #kshelper_mapmemo, #kshelper_areainfo {border-width: 1px; border-style: solid; border-color: #FFF #666 #666 #FFF;}\
    #kshelper_textarea, #kshelper_maptextarea {border: none;}\
    #kshelper_pctable {margin-top: 2em; border-collapse: collapse;}\
    #kshelper_npctable tr:nth-child(n+3) > td:nth-child(n+3), #kshelper_pctable tr:nth-child(n+3) > td:nth-child(n+3) {text-align: right;}\
    #kshelper_npctable tr:nth-child(n+3) > td:nth-child(2), #kshelper_pctable tr:nth-child(n+3) > td:nth-child(2) {width:10em;}\
    #kshelper_npctable tr:nth-child(n+3) > td:nth-child(3), #kshelper_pctable tr:nth-child(n+3) > td:nth-child(3) {width: 5ex;}\
    #kshelper_npctable tr:nth-child(n+3) > td:nth-child(n+4), #kshelper_pctable tr:nth-child(n+3) > td:nth-child(n+4) {width: 7ex;}\
    .kshelper_tableheader td {text-align: center;}\
    .kshelper_tabletotal td {border-top: 1px solid gray !important;}\
  ");
}
var link = document.createElement("link");
link.rel = "stylesheet";
link.href = "data:text/css," + css();
link.id = "kshelper_style";
document.getElementsByTagName("head")[0].appendChild(link);

// ページタイトルを変更
var n = 0, title = activeTab = "";
var reg = /^ks_profile$|^ks_alliance$|^ks_report$|^ks_message$/;
var e1 = document.evaluate("id('table2')/tbody/tr/td/table/tbody/tr", document, null, 7, null);
var e2 = document.evaluate("id('ks_mainArea')/h2", document, null, 9, null).singleNodeValue;
for (var i = 0, a, node; i < e1.snapshotLength; i++) {
  node = e1.snapshotItem(i).childNodes[1];
  if (node && Number(node.textContent) > 0) {
    n += Number(node.textContent);
  } else n++;
  // タスクの×アイコンを押したとき確認ダイアログを表示
  a = node.firstChild;
  if (a && a.tagName == "A" && a.href && /cancel\?/.test(a.href)) {
    var s = node.nextSibling.nextSibling.textContent;
    s = (s) ? "タスク「" + s + "」" : "このタスク";
    a.href = 'javascript:if(confirm("' + s + 'をキャンセルしますか？")){location.href="'+a.href+'";}';
  }
}
if (n > 0) title = "【" + n + "】 ";
if (e2 && e2.textContent) {
  if (reg.test(e2.className)) {
    var e3 = document.evaluate("id('ks_mainArea')//div[@class='ks_contents']/div/form/ul", document, null, 9, null).singleNodeValue;
    if (e3) var e4 = document.evaluate("id('ks_mainArea')//div[@class='ks_contents']/div/form/ul/li", document, null, 7, null);
    else var e4 = document.evaluate("id('ks_mainArea')//div[@class='ks_contents']/div/ul/li", document, null, 7, null);
    if (e4) {
      reg = /_now$/;
      for (var i = 0, flag = true; i < e4.snapshotLength; i++) {
        if (reg.test(e4.snapshotItem(i).className)) {
          activeTab = e4.snapshotItem(i).firstChild.textContent;
          title += activeTab + " - " + e2.textContent + " - ";
          flag = false;
          break;
        }
      }
      if (flag) title += e2.textContent + " - ";
    } else title += e2.textContent + " - ";
  } else {
    var e3 = document.evaluate("id('ks_mainArea')//div[@class='ks_contents']/div/h3", document, null, 9, null).singleNodeValue;
    if (e2.className == "ks_map") e2.textContent = "地域図";
    if (e3) title += e3.textContent + " - " + e2.textContent + " - ";
    else title += e2.textContent + " - ";
  }
}
document.title = title + document.title;

// 発生タスクの終了日時をツールチップで表示
for (var i = 1, e, hm, ho, mi, se; i <= e1.snapshotLength; i++) {
  e = eval('id("timer' + i + '")');
  if (! e || ! e.textContent) continue;
  hm = e.textContent.slice(0, e.textContent.lastIndexOf(":"));
  ho = Number(hm.slice(0, hm.indexOf(":")));
  mi = Number(hm.slice(hm.indexOf(":")+1));
  se = Number(e.textContent.slice(e.textContent.lastIndexOf(":")+1));
  e.title = new Date(t.getTime() + ho * 60 * 60 * 1000 + mi * 60 * 1000 + se * 1000).toString();
}

// 資源が倉庫の保管容量をオーバーしてしまう日時を表示
for (var i = 4, h = [], m = []; i > 0; i--) {
  var e = document.evaluate("id('l" + i + "')", document, null, 9, null).singleNodeValue;
  if (!e || ! e.innerHTML) continue;
  var now = Number(e.innerHTML.slice(0, e.innerHTML.indexOf("/")));
  var max = Number(e.innerHTML.slice(e.innerHTML.indexOf("/")+1));
  var p = document.createElement("p");
  if (e.title > 0) var d = new Date(t.getTime() + ((max - now) / Math.abs(e.title) * 60 * 60 * 1000));
  else var d = new Date(t.getTime() + (now / Math.abs(e.title) * 60 * 60 * 1000));
  p.className = "ks_txt_10";
  p.title = d.toString();
  p.innerHTML = (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.toLocaleTimeString();
  var hour = (d.getTime() - t.getTime()) / 1000 / 60 / 60;
  if (e.title <= 0) p.style.color = "#c0c";
  else if (hour < 6) p.style.color = "#c00";
  else if (hour < 12) p.style.color = "#630";
  else if (hour < 18) p.style.color = "#333";
  else p.style.color = "#060";
  e.parentNode.appendChild(p);
  h.push(e.title);
  m.push(now);
}

// 建築や開拓するのに資源が足りないとき、必要分がそろう日時を表示
var e1 = document.evaluate("//table[@class='ks_nonborder']", document, null, 7, null);
for (var i1 = 1; i1 <= e1.snapshotLength; i1++) {
  var e = document.evaluate("(//table[@class='ks_nonborder'])[" + i1 + "]/tbody/tr/td", document, null, 7, null);
  for (var i2 = 0; i2 < e.snapshotLength; i2++) {
    if (h[i2] && m[i2] && ! isNaN(e.snapshotItem(i2).textContent)) {
      var n = Number(e.snapshotItem(i2).textContent);
      if (n <= m[i2]) continue;
      var y = new Date(t.getTime() + (n - m[i2]) / h[i2] * 60 * 60 * 1000);
      var div = document.createElement("div");
      div.className = "kshelper_lvup";
      div.title = y.toString();
      div.innerHTML = '<div>' + (y.getMonth() + 1) + '/' + y.getDate() + '</div><div>' + y.toLocaleTimeString() + '</div>';
      e.snapshotItem(i2).appendChild(div);
    }
  }
}

// ギルドボード
if (id("ks_chatArea")) {
  // 入力文字数をカウントして66文字以上は発言できないように
  var div = document.createElement("div");
  div.id = "kshelper_chatcount";
  id("TitleName").appendChild(div);
  id("message").addEventListener("keydown", function(ev) {
    var elm = id("kshelper_chatcount");
    if (! elm) return;
    for( var i = c = n = 0, m = 65; i < this.value.length; i++) {
      c = this.value.charCodeAt(i);
      m = (c < 256 || (c >= 0xff61 && c <= 0xff9f)) ? m - 1 : m - 2;
    }
    if (m < 0 && e.keyCode == 13) ev.preventDefault();
  }, false);
  id("message").addEventListener("keyup", function() {
    var elm = id("kshelper_chatcount");
    var btn = id("fbtn_ok");
    if (! elm || ! btn) return;
    for( var i = c = n = 0, m = 65; i < this.value.length; i++) {
      c = this.value.charCodeAt(i);
      m = (c < 256 || (c >= 0xff61 && c <= 0xff9f)) ? m - 1 : m - 2;
    }
    if (m < 0) {
      btn.disabled = true;
      btn.src = "/images/main/chat_btn_g.jpg";
    } else {
      btn.disabled = false;
      btn.src = "/images/main/chat_btn.jpg"
    }
    if (m <= 5) elm.style.color = "#f66";
    else if (m <= 10) elm.style.color = "#fa6";
    else elm.style.color = "#aaa";
    elm.innerHTML = (m < 65) ? m : '';
  }, false);
  // マウスホイールでスクロールできるように
  var scroll = function(e) {
    var ch = id("div_chat").offsetHeight;
    var ct = n = id("div_chat").offsetTop;
    var sh = id("scrollbar").offsetHeight;
    var bh = id("scrollbarbackground").offsetHeight;
    if (webkit) n = ct + e.wheelDeltaY / 2;
    else if (e.axis == 2) n = ct - e.detail * 10;
      if (n - bh < -ch) n = -ch + bh;
      else if (n > 0) n = 0;
      var b = -(n / (ch - bh)) * (bh -sh);
      id("div_chat").style.top = n + "px";
      id("scrollbar").style.top = b + "px";
      e.preventDefault();
  }
  if (webkit) id("div_chat").addEventListener("mousewheel", scroll, false);
  else id("div_chat").addEventListener("DOMMouseScroll", scroll, false);
  // ページを開いたとき、名前の後にある「の発言」を削除
   var e = document.evaluate("id('div_chat')/p/span[@class='ks_blue']", document, null, 7, null);
  for (i = 0; i < e.snapshotLength; i++) {
    e.snapshotItem(i).textContent = e.snapshotItem(i).textContent.replace(/の発言：$/, "：");
  }
}

// メモ
if (id("ks_logo") && typeof localStorage != "undefined") {
  var timerM, timerMm, div = document.createElement("div");
  div.id = "kshelper_memo";
  div.style.display = "none";
  div.innerHTML = '<textarea id="kshelper_textarea"></textarea>';
  if (document.body) document.body.appendChild(div);
  var map = document.evaluate("//div[@class='ks_images ks_txt_M ks_map']", document, null, 9, null).singleNodeValue;
  var div = document.createElement("div");
  div.id = "kshelper_areainfo";
  div.style.display = "none";
  if (document.body) document.body.appendChild(div);
  var div = document.createElement("div");
  div.id = "kshelper_mapmemo";
  div.style.display = "none";
  div.innerHTML = '<textarea id="kshelper_maptextarea"></textarea>';
  if (document.body) document.body.appendChild(div);
  var memo = id("kshelper_memo");
  var mapmemo = id("kshelper_mapmemo");
  var ta = id("kshelper_textarea");
  var mta = id("kshelper_maptextarea");
  var ai = id("kshelper_areainfo");
  var loadMemo = function() {
    return localStorage.getItem("kingdomSagaHelper_memo");
  }
  var saveMemo = function() {
    localStorage.setItem("kingdomSagaHelper_memo", ta.value);
  }
  var showMemo = function() {
    if (mapmemo.style.display == "block") {
      saveMapmemo();
      mapmemo.style.display = "none";
    }
    ta.value = loadMemo();
    memo.style.left = (id("ks_container").offsetLeft + 315) + "px";
    memo.style.display = "block";
    ta.scrollTop = ta.scrollHeight - ta.clientHeight;
    ta.focus();
    timerM = setInterval(saveMemo, 30000);
  }
  var hideMemo = function() {
    saveMemo();
    memo.style.display = "none";
    clearInterval(timerM);
  }
  var loadMapmemo = function() {
    return (localStorage.getItem("kingdomSagaHelper_mapmemo")) ? localStorage.getItem("kingdomSagaHelper_mapmemo").split("\n").sort().join("\n") : "";
  }
  var saveMapmemo = function() {
    localStorage.setItem("kingdomSagaHelper_mapmemo", mta.value);
    if (e2 && e2.className == "ks_map" && ! e3 && ! e4 && id("karte")) {
      info = mta.value.split("\n").reverse();
      refreshAreamemo();
    }
  }
  var showMapmemo = function() {
    if (memo.style.display == "block") {
      saveMemo();
      memo.style.display = "none";
    }
    mta.value = loadMapmemo();
    mapmemo.style.left = (id("ks_container").offsetLeft + 315) + "px";
    mapmemo.style.display = "block";
    mta.scrollTop = mta.scrollHeight - mta.clientHeight;
    mta.focus();
    timerMm = setInterval(saveMapmemo, 30000);
  }
  var hideMapmemo = function() {
    saveMapmemo();
    mapmemo.style.display = "none";
    clearInterval(timerMm);
  }
  var shortDate = function() {
    var mo = new Date().getMonth() + 1;
    var da = new Date().getDate();
    var ho = new Date().getHours();
    var mi = new Date().getMinutes();
    if (mo < 10) mo = "0" + mo;
    if (da < 10) da = "0" + da;
    if (ho < 10) ho = "0" + ho;
    if (mi < 10) mi = "0" + mi;
    return mo + "/" + da + " " + ho + ":" + mi;
  }
  var info = (loadMapmemo()) ? loadMapmemo().split("\n").reverse() : [];
  // 左上のロゴをクリックしてメモ欄を表示
  id("ks_logo").addEventListener("click", function(ev) {
    if (ev.ctrlKey || ev.shiftKey) {
      if (mapmemo.style.display == "none") showMapmemo();
      else hideMapmemo();
    } else {
      if (memo.style.display == "none" && mapmemo.style.display == "none") showMemo();
      else if (memo.style.display == "none" && mapmemo.style.display == "block") hideMapmemo();
      else hideMemo();
    }
  }, false);
  // 地域図のエリア表示ページで…
  if (e2 && e2.className == "ks_map" && ! e3 && ! e4 && id("karte")) {
    var showAreaInfo = function(i, x, y) {
      var t, x1, x2, y1, y2, s = "(" + x + "/" + y + ")";
      var show = function(c) {
        ai.innerHTML = c;
        ai.style.top = (map.offsetTop - 20) + "px";
        ai.style.left = (map.offsetLeft + id("ks_container").offsetLeft) + "px";
        ai.style.display = "block";
      }
      if (x && y) {
        if(i.some(function(a) {
          if (a.indexOf(s) == 0) {
            t = a;
            return true;
          }
        })) show(t);
        else hideAreaInfo();
      } else {
        t = [];
        i.forEach(function(a) {
          if (/^\(-?\d+\/-?\d+\)/.test(a)) {
            x1 = a.slice(1, a.indexOf("/"));
            y1 = a.slice(a.indexOf("/")+1, a.indexOf(")"));
            if (x1 != x2 || y1 != y2) {
              x2 = x1;
              y2 = y1;
              t.push(a);
            }
          }
        });
        show(t.join("<br>"));
      }
    }
    var hideAreaInfo = function() {
      ai.style.display = "none";
      ai.innerHTML = null;
    }
    var infoN = [], infoW = [], infoS = [], infoE = [], infoC = [];
    var cX = Number(id("x").textContent);
    var cY = Number(id("y").textContent);
    var refreshAreamemo = function() {
      infoN = [], infoW = [], infoS = [], infoE = [], infoC = [];
      cX = Number(id("x").textContent);
      cY = Number(id("y").textContent);
      info.forEach(function(a) {
        if (/^\(-?\d+\/-?\d+\)/.test(a)) {
          var x = a.slice(1, a.indexOf("/"));
          var y = a.slice(a.indexOf("/")+1, a.indexOf(")"));
          if (x >= cX - 3 && x <= cX + 3 && y >= cY + 4 && y <= cY + 10)
            infoN.push(a);
          else if (x >= cX - 3 && x <= cX + 3 && y <= cY - 4 && y >= cY - 10)
            infoS.push(a);
          else if (x >= cX + 4 && x <= cX + 10 && y >= cY - 3 && y <= cY + 3)
            infoW.push(a);
          else if (x <= cX - 4 && x >= cX - 10 && y >= cY - 3 && y <= cY + 3)
            infoE.push(a);
          else if (x >= cX - 3 && x <= cX + 3 && y >= cY - 3 && y <= cY + 3)
            infoC.push(a);
        }
      });
    }
    refreshAreamemo();
    // キーを押したとき…
    document.addEventListener("keyup", function(ev) {
      var an = id("area_name").textContent.replace(/自然エリア\s\-\s/, "");
      if (an != "-" && ! ev.target.tagName.match(/^input|^textarea/i)) {
        // Wキーでマウスカーソル上の座標や地名をメモ欄に追記
        if (ev.keyCode == 87) {
          if (mapmemo.style.display == "none") showMapmemo();
          mta.value += (mta.value ? "\n" : "") + "(" + id("x").textContent + "/" + id("y").textContent + ") [" + an + "] " + shortDate() + " ";
          mta.scrollTop = mta.scrollHeight - mta.clientHeight;
          mta.focus();
        }
      }
    }, false);
    // マウスカーソルを合わせたとき
    id("karte").addEventListener("mouseover", function(ev) {
      // エリア
      if (/^a_\d_\d/.test(ev.target.id)) {
        showAreaInfo(info, id("x").textContent, id("y").textContent);
      // 7エリア移動ボタン
      } else if (/^ma_n\dp7$/.test(ev.target.id)) {
        if (cX != Number(id("x").textContent) || cY != Number(id("y").textContent))
          refreshAreamemo();
        if(ev.target.id == "ma_n1p7" && ev.target.title == "北")
          showAreaInfo(infoN);
        else if(ev.target.id == "ma_n2p7" && ev.target.title == "東")
          showAreaInfo(infoW);
        else if(ev.target.id == "ma_n3p7" && ev.target.title == "南")
          showAreaInfo(infoS);
        else if(ev.target.id == "ma_n4p7" && ev.target.title == "西")
          showAreaInfo(infoE);
        else if(ev.target.id == "ma_n3p7" && ev.target.title == "自分の村")
          showAreaInfo(infoC);
      }
    }, false);
    id("karte").addEventListener("mouseout", function() {
      hideAreaInfo();
    }, false);
  // 地域図のエリア詳細ページを開いたとき
  } else if (e2 && e2.className == "ks_map" && e3 && e3.textContent.match(/（\-?\d+\/\-?\d+）$/)) {
    var con = e3.textContent;
    var n = con.slice(0, con.lastIndexOf("（")).replace(/自然エリア\s\-\s/, "");
    var x = con.slice(con.lastIndexOf("（") + 1, con.lastIndexOf("/"));
    var y = con.slice(con.lastIndexOf("/") + 1, con.lastIndexOf("）"));
    if (! info.some(function(a) {
      if (/^\(\-?\d+\/\-?\d+\)\s\[[^\]]+\]/.test(a)) {
        var xx = a.slice(a.indexOf("(") + 1, a.indexOf("/"));
        var yy = a.slice(a.indexOf("/") + 1, a.indexOf(")"));
        if (x == xx && y == yy) return true;
      }
    })) {
      var str = (localStorage.getItem("kingdomSagaHelper_mapmemo") ? localStorage.getItem("kingdomSagaHelper_mapmemo") + "\n" : "") + "(" + x + "/" + y + ") [" + n + "] ";
      localStorage.setItem("kingdomSagaHelper_mapmemo", str);
    }
  // 都市図の指令所ページで攻撃もしくは強襲を確定したとき
  } else if (e2 && e2.className == "ks_village" && e3 && e3.textContent.match(/^指令所/)) {
    var h4 = document.evaluate("//div[@class='ks_contents_village']/form/h4", document, null, 9, null).singleNodeValue;
    var con = document.evaluate("//div[@class='ks_contents_village']/form/table[1]/tbody/tr/td/strong", document, null, 9, null).singleNodeValue;
    var btn = document.evaluate("//div[@class='ks_contents_village']/form/div/input", document, null, 9, null).singleNodeValue;
    var tX = document.evaluate("//div[@class='ks_contents_village']/form/table[2]/tbody/tr/td[2]/strong", document, null, 9, null).singleNodeValue;
    var tY = document.evaluate("//div[@class='ks_contents_village']/form/table[2]/tbody/tr/td[5]/strong", document, null, 9, null).singleNodeValue;
    if (h4 && h4.textContent == "出兵内容" && con && con.textContent.match(/攻撃|強襲/) && tX && tY) {
      btn.addEventListener("click", function(ev) {
        if (tX.textContent && tY.textContent) {
          var inf = (loadMapmemo()) ? loadMapmemo().split("\n") : [];
          if (! inf.some(function(a, i) {
            if (/^\(\-?\d+\/\-?\d+\)\s\[[^\]]+\]/.test(a)) {
              var xx = a.slice(a.indexOf("(") + 1, a.indexOf("/"));
              var yy = a.slice(a.indexOf("/") + 1, a.indexOf(")"));
              var nam = a.slice(a.indexOf("[") + 1, a.indexOf("]"));
              if (tX.textContent == xx && tY.textContent == yy) {
                var str = "(" + tX.textContent + "/" + tY.textContent + ") [" + nam + "] " + shortDate() + " " + con.textContent + " ";
                if (/^\(\-?\d+\/\-?\d+\)\s\[[^\]]+\]\s$/.test(a))
                  inf.splice(i, 1, str);
                else inf.push(str);
                return true;
              }
            }
          })) {
            inf.push("(" + tX.textContent + "/" + tY.textContent + ") " + shortDate() + " " + con.textContent + " ");
          }
          localStorage.setItem("kingdomSagaHelper_mapmemo", inf.join("\n"));
        }
      }, false);
    }
  }
}

// 地域図の自然エリアページで、味方の攻撃力と敵NPCの防御力を表示
if (e2 && e2.className == "ks_map" && e3 && e3.textContent.match(/自然エリア\s\-\s\d+%/)) {
  var npc = [
    {name: "スライム", defF: "25", defC: "20"},
    {name: "蒼旗盗賊団", defF: "35", defC: "40"},
    {name: "ヴァンパイアバット", defF: "40", defC: "60"},
    {name: "アナコンダ", defF: "66", defC: "50"},
    {name: "シルヴァーファング", defF: "70", defC: "33"},
    {name: "サーベルタイガー", defF: "80", defC: "70"},
    {name: "グリズリー", defF: "140", defC: "200"},
    {name: "オーガ", defF: "380", defC: "240"},
    {name: "ジャイアント", defF: "170", defC: "150"},
    {name: "ドラゴン", defF: "440", defC: "520"}
  ];
  var human = [
    {name: "ファイター", atk: "40", type: "f"},
    {name: "クロスボウ", atk: "33", type: "f"},
    {name: "ウィザード", atk: "75", type: "f"},
    {name: "スカウト", atk: "1", type: "f"},
    {name: "ナイト", atk: "110", type: "c"},
    {name: "パラディン", atk: "135", type: "c"},
    {name: "バッテリング・ラム", atk: "80", type: "f"},
    {name: "カタパルト", atk: "85", type: "f"},
    {name: "貴族", atk: "1", type: "f"},
    {name: "冒険者", atk: "1", type: "f"}
  ];
  var elf = [
    {name: "アーチャー", atk: "15", type: "f"},
    {name: "ロングボウ", atk: "65", type: "f"},
    {name: "シャーマン", atk: "60", type: "f"},
    {name: "フォレストウィンド", atk: "1", type: "f"},
    {name: "フォレストナイト", atk: "15", type: "c"},
    {name: "フォレストガード", atk: "105", type: "c"},
    {name: "ツリーフォーク", atk: "55", type: "f"},
    {name: "シルフィード", atk: "70", type: "f"},
    {name: "族長", atk: "1", type: "f"},
    {name: "吟遊詩人", atk: "1", type: "f"}
  ];
  var dwarf = [
    {name: "クラブウォーリア", atk: "65", type: "f"},
    {name: "プレートウォーリア", atk: "55", type: "f"},
    {name: "アックスウォーリア", atk: "94", type: "f"},
    {name: "トンネラー", atk: "5", type: "f"},
    {name: "アックスライダー", atk: "50", type: "c"},
    {name: "ランブルライダー", atk: "145", type: "c"},
    {name: "ゴーレム", atk: "65", type: "f"},
    {name: "フライングゴーレム", atk: "62", type: "f"},
    {name: "長老", atk: "1", type: "f"},
    {name: "パイオニア", atk: "1", type: "f"}
  ];
  var e = document.evaluate("id('screen')//table[@class='ks_borderb']/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr", document, null, 7, null);
  var e1 = e.snapshotItem(0);
  e1.parentNode.parentNode.id = "kshelper_npctable";
  for (var i=n=num=def1=def2=0, ss; i<e.snapshotLength; i++) {
    ss = e.snapshotItem(i);
    if (! ss || ! ss.childNodes[3] || ! ss.childNodes[5]) continue;
    npc.forEach(function(a) {
      if (a.name == ss.childNodes[3].textContent) {
        num += Number(ss.childNodes[5].textContent);
        var td = document.createElement("td");
        n = Number(a.defF) * Number(ss.childNodes[5].textContent);
        e.snapshotItem(i).appendChild(td);
        td.innerHTML = n;
        def1 += n;
        var td = document.createElement("td");
        n = Number(a.defC) * Number(ss.childNodes[5].textContent);
        td.innerHTML = n;
        def2 += n;
        e.snapshotItem(i).appendChild(td);
      }
    });
  }
  var tr = document.createElement("tr");
  tr.className = "kshelper_tableheader";
  e1.parentNode.insertBefore(tr, e1);
  e1.parentNode.firstChild.innerHTML = '<td rowspan="2"></td><td rowspan="2">敵ユニット名</td><td rowspan="2">数</td><td colspan="2">防御力</td>';
  var tr = document.createElement("tr");
  tr.className = "kshelper_tableheader";
  e1.parentNode.insertBefore(tr, e1);
  e1.parentNode.childNodes[1].innerHTML = '<td>対歩兵</td><td>対騎兵</td>';
  var tr = document.createElement("tr");
  tr.className = "kshelper_tabletotal";
  e1.parentNode.appendChild(tr);
  e1.parentNode.lastChild.innerHTML = '<td></td><td style="text-align:center;">合計</td><td>' + num + '</td><td>' + def1 + '</td><td>' + def2 + '</td>';
  var e = document.evaluate("id('table3')/tbody/tr/td/table/tbody/tr", document, null, 7, null);
  if (e && e.snapshotLength > 0) {
    var table = document.createElement("table");
    table.id = "kshelper_pctable";
    e1.parentNode.parentNode.parentNode.appendChild(table);
    var table = id("kshelper_pctable");
    var html = '<tbody><tr class="kshelper_tableheader"><td rowspan="2"></td><td rowspan="2">味方ユニット名</td><td rowspan="2">数</td><td colspan="2">攻撃力</td></tr><tr class="kshelper_tableheader"><td>歩兵</td><td>騎兵</td></tr>'
    for (var i=n=num=atk1=atk2=0, ss, img, s, race=[]; i < e.snapshotLength; i++) {
      ss = e.snapshotItem(i);
      if (! ss || ! ss.childNodes[3] || ! ss.childNodes[5]) continue;
      img = ss.childNodes[1].innerHTML;
      s = ss.childNodes[3].textContent;
      n = Number(ss.childNodes[5].textContent);
      num += n;
      if (i ==0) {
        human.forEach(function(a) {
          if (a.name == s) race = human;
        });
        elf.forEach(function(a) {
          if (a.name == s) race = elf;
        });
        dwarf.forEach(function(a) {
          if (a.name == s) race = dwarf;
        });
      }
      race.forEach(function(a) {
        if (a.name == s) {
          html += '<tr><td>' + img + '</td><td>' + s + '</td><td>' + n + '</td>';
          if (a.type == "c") {
            html += '<td></td><td>' + Number(a.atk) * n + '</td></tr>';
            atk2 += Number(a.atk) * n;
          } else {
            html += '<td>' + Number(a.atk) * n + '</td><td></td></tr>';
            atk1 += Number(a.atk) * n;
          }
        }
      });
    }
    html += '<tr class="kshelper_tabletotal"><td></td><td style="text-align:center;">合計</td><td>' + num + '</td><td>' + atk1 + '</td><td>' + atk2 + '</td></tr></tbody>';
    table.innerHTML = html;
    var div = document.createElement("div");
    div.style.marginTop = "1em";
    table.parentNode.appendChild(div);
    table.parentNode.lastChild.textContent = '※ 上記の攻撃力に、マスターの攻撃指揮力や兵士の武器レベルなどによる補正は含まれていません。';
  }
}

// 特殊訓練所ページで「解任」をクリックしたとき確認ダイアログを表示
if (e2 && e2.className == "ks_village" && e3 && e3.textContent.match(/^特殊訓練所/)) {
  var e = document.evaluate("//a[contains(@href, '/hero/removal')]", document, null, 7, null);
  for (var i = 0; i < e.snapshotLength; i++) {
    e.snapshotItem(i).href = 'javascript:if(confirm("解任したマスターは消失して二度と復活できませんが、本当に解任しますか？")){location.href="'+e.snapshotItem(i).href+'";}';
  }
}

// 市場ページで輸送可能な残り輸送資源量を表示
if (e2 && e2.className == "ks_village" && e3 && e3.textContent.match(/^市場/)) {
  var e = document.evaluate("//table[@class='ks_borderb']/tbody/tr/td[2]", document, null, 9, null).singleNodeValue;
  var max = 0, r = ["r1", "r2", "r3", "r4"];
  if (e.textContent) max = Number(e.textContent.match(/商人：\d+/)[0].match(/\d+/)[0]) * Number(e.textContent.match(/運搬数：\d+/)[0].match(/\d+/)[0]);
  var e = document.evaluate("//div[@class='ks_contents_village']/form/div/h4", document, null, 9, null).singleNodeValue;
  var title = e.textContent;
  var check = function() {
    var n = max;
    r.forEach(function(a) {
      if (id(a).value > 0)
        n -= id(a).value;
    });
    e.textContent = title + " ( " + n + " )";
    e.style.color = (n < 0) ? "red" : null;
  }
  r.forEach(function(a) {
    if (id(a)) {
      id(a).addEventListener("keyup", check, false);
      id(a).addEventListener("change", check, false);
      id(a).nextSibling.nextSibling.addEventListener("click", check, false);
      id(a).parentNode.parentNode.childNodes[1].childNodes[2].addEventListener("click", check, false);
    }
  });
  check();
}

// ギルド専用ページの攻防記録で、自然エリア以外の領地名をリンク化
if (e2 && e2.className == "ks_alliance" && activeTab == "攻防記録") {
  var r = ["report_1", "report_2", "report_3"];
  r.forEach(function(a) {
    var e = document.evaluate("id('" +a + "')/tbody/tr/td[2]", document, null, 7, null);
    for (var i = 0, s = ""; i < e.snapshotLength; i++) {
      var s = e.snapshotItem(i).textContent;
      if (s && s != "自然エリア") {
        e.snapshotItem(i).innerHTML = '<a href="http://' + document.domain + '/ranking/village?search_by_ranking=&search_by_name=' + encodeURIComponent(s) + '&search.x=0&search.y=0&search=search">' + s + '</a>';
      }
    }
  });
}

})();