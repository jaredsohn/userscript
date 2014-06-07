// ==UserScript==
// @name           FLASH LEARNING
// @version        0.89.6
// @namespace      http://munologue.com/gm/flashlearning/
// @include        http://*
// @description    Learning English while browsing.
// ==/UserScript==


// This script based on FLSH KEY.
// http://userscripts.org/scripts/show/11996


(function() {
  if (window.parent != window.self) return;
  var note = GM_getValue("note");
  note = note ? eval("(" + note + ")") : {};

  GM_addStyle(<><![CDATA[
    #FLASH_LEARNING{
    position : fixed;
    font-weight: bold;
    line-height: 1.2;
    z-index : 10000;
    padding : 0.3em 0.5em;
    background-color : #ffed53;
    color : #000;
    -moz-border-radius: 0.2em;
    -moz-opacity: 0.9;
    min-width : 1em;
    text-align : center;
    }
    #FLASH_LEARNING_description {
    font-size: 80%;
    font-weight: normal;
    }

    #FLASH_LEARNING_myNote {
    background-color: #E4F2FF;
    -moz-border-radius: 0.3em;
    -moz-opacity: 0.9;
    width: 65%;
    padding: 5px;
    margin: 5px;
    border-right: 2px solid #ccc;
    border-bottom: 2px solid #ccc;
    position: fixed;
    z-index: 9999;
    right: 0;
    bottom: 0;
    text-align: center;
    line-height: 1.1;
    }
    #FLASH_LEARNING_bar {
    font-size: 10px;
    font-weight: bold;
    color: #81BCE9;
    text-align: left;
    }
    #FLASH_LEARNING_title {
    width: 80%;
    float: left;
    }
    #FLASH_LEARNING_closeButton {
    float: right;
    text-align: right;
    width: 20%;
    padding-bottom: 2px;
    }
    #FLASH_LEARNING_closeButton button {
    font-size: 9px;
    }

    #FLASH_LEARNING_textArea {
    clear: both;
    border-top: 2px solid #999;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    border-left: 2px solid #999;
    -moz-border-radius: 0.4em;
    width: 96%;
    height: 74%;
    margin: 2px 0 4px 0;
    padding: 4px;
    white-space: pre;
    overflow: auto;
    line-height: 1.4;
    }
    #FLASH_LEARNING_textArea:focus {
    -moz-opacity: 1;
    background-color: #FFFFE0;
    color: #000;
    }
    #FLASH_LEARNING_footer {
    font-size: 70%;
    color: #666;
    }
    #FLASH_LEARNING_footer select {
    border: 1px solid #666;
    font-size: 90%;
    }
    .FLASH_LEARNING_button {
    font-size: 12px;
    color: #666;
    background-color: #fff;
    -moz-border-radius: 0.3em;
    border: 1px solid #81BCE9;
    width: 3em;
    margin: 0 3px;
    }
    .FLASH_LEARNING_button:hover {
    background-color: #eee;
    }

    #FLASH_LEARNING_help {
    position: absolute;
    z-index: 10000;
    width: 200px;
    top: 20px;
    right: 10px;
    margin: 8px 4px;
    padding: 2px;
    background-color: #ffffe0;
    color: #000;
    font-size: 80%;
    border-top: solid 1px #666;
    border-right: solid 1px #333;
    border-bottom: solid 1px #333;
    border-left: solid 1px #666;
    -moz-border-radius: 0.4em;
    -moz-opacity: 0.9;
    text-align: left;
    }
    ]]></>);

  GM_registerMenuCommand("FLASH LEARNING - note", winToggle);
  var myNote;

  var flashWord = {
  time: 0,
  i: 0,
  b: "",
  X: "",
  Y: "",
    timer: "",
  option: (function() {
    var opt = GM_getValue("option");
    return opt ? eval("(" + opt + ")") : {};
  })(),
  words: shuffle(keys(note)),
  escape: /html|textarea|input|a|form|select|option|img|button|embed/i,
  show: function(e){
    var elm = e.target;
    flashWord.X = e.clientX, flashWord.Y = e.clientY;
    if (e.button != 0 || window.getSelection().toString() || elm.tagName.search(flashWord.escape) != -1) return;
    if (flashWord.b == 2) {
      flashWord.b = e.button;
      return;
    }
    flashWord.time = new Date().getTime() - flashWord.time;
    if (flashWord.time >= 3000) return;
    flashWord.showCard(flashWord.words[flashWord.i] || "--");
    flashWord.i++;
    if (flashWord.i >= flashWord.words.length) {
      flashWord.i = 0;
      note = GM_getValue("note") ? eval("(" + GM_getValue("note") + ")") : {};
      flashWord.words = shuffle(keys(note));
    }
  },
  showCard: function(w) {
    clearTimeout(flashWord.timer);
    var k = HTMLescape(w);
    var v = HTMLescape(note[w]);
    var fs = v ? (k.split(/\s/).length >= 3 || v.split(/,\s/).length >= 3 || v.length >= 12) : (k.split(/\s/).length >= 3);
    flash.style.fontSize = fs ? "220%" : "600%";
    flash.innerHTML = k && v ? k + '<div id="FLASH_LEARNING_description">' + v + "<\/div>": k;
    show(flash);
    flashWord.Position();
    flashWord.timer = setTimeout(function() {
      hide(flash);}, flashWord.time >= 550 ? 1200 : 600 + flashWord.time || 50);
  },
  Position: function() {
    var pos = flashWord.option.Position || "center";
    var fs = flash.style;
    fs.top = "", fs.right = "", fs.bottom = "", fs.left = "", fs.margin = "";
    fs.border = "1px solid #333";
    switch (pos) {
    case "center":
      fs.marginLeft = (-(flash.offsetWidth/2)) + "px";
      fs.marginTop = (-(flash.offsetHeight/2)) + "px";
      fs.borderTop = "2px solid #000";
      fs.borderRight = "4px solid #333";
      fs.borderBottom = "4px solid #333";
      fs.borderLeft = "2px solid #000";
      fs.top = "50%";
      fs.left = "50%";
      fs.marginRight ="1em";
      fs.marginBottom = "1em";
      break;
    case "upperLeft":
      fs.border = "1px solid #333";
      fs.top = "5px";
      fs.left = "5px";
      fs.margin = "0";
      fs.fontSize = "16px";
      break;
    case "upperRight":
      fs.top = "5px";
      fs.right = "5px";
      fs.margin = "0";
      fs.fontSize = "16px";
      break;
    case "lowerLeft":
      fs.bottom = "5px";
      fs.left = "5px";
      fs.margin = "0";
      fs.fontSize = "16px";
      break;
    case "lowerRight":
      fs.bottom = "5px";
      fs.right = "5px";
      fs.margin = "0";
      fs.fontSize = "16px";
      break;
    case "cursor":
      fs.fontSize = "16px";
      var X = ((window.innerWidth - flashWord.X) <= flash.offsetWidth * 1.5) ?
        window.innerWidth - flash.offsetWidth - 20 : flashWord.X + 15;
      var Y = ((window.innerHeight - flashWord.Y) <= flash.offsetHeight * 1.5) ?
        window.innerHeight - flash.offsetHeight - 20 : flashWord.Y + 15;
      fs.top = Y + "px";
      fs.left = X + "px";
      break;
    }
  }
  }

  function openNote() {
    var result = [];
    for (var k in note) {
      if (k) result.push(k + (note[k] ? "  " + note[k] : ""));
    }
    $("FLASH_LEARNING_textArea").value = result.join("\n");
  }


  function saveNote() {
    var data = $("FLASH_LEARNING_textArea").value;
    if (!data) {
      if (!flashWord.words.length) return;
      var conf = confirm("すべて削除しますか？");
      if (!conf) {
        openNote();
        return;
      } else {
        note = {};
      }
    }
    data = data.split(/[\r\n]+/g);
    for (var i = 0, l = data.length; i < l; i++) {
      var a = data[i].split(/\t+|\s{2,}/);
      var k = "", v = "";
      if (a[0]) k = a[0].replace(/^\s+|\s+$/, "");
      if (a[1]) v = a[1].replace(/^\s+|\s+$/, "");
      if (k) {
        if (k in note && note[k] != v) v = note[k] + ", " + v;
          note[k] = v || "";
        }
    }
    GM_setValue("note", note.toSource());
    flashWord.words = shuffle(keys(note));
    signal();
  }

  function help() {
    var h = $("FLASH_LEARNING_help");
    h.style.display = h.style.display == "none" ? "block" : "none";
  }


  function makeWin() {
    myNote = E("div", {id: "FLASH_LEARNING_myNote"});
    myNote.append(
      E("div", {id: "FLASH_LEARNING_bar"}).append(
        E("div", {id: "FLASH_LEARNING_title"}).appendText(
          "FLASH LEARNING - note"),
        E("div", {id: "FLASH_LEARNING_closeButton"}).append(
          E("button",
            {"class": "FLASH_LEARNING_button", title: "help"}).appendText("?").addEvent(
              "click", help),
          E("button",
            {"class": "FLASH_LEARNING_button", title: "閉じる"}
            ).appendText("X").addEvent("click", function() {myNote.toggle();})
          )
        ),
      E("textarea",
        {id: "FLASH_LEARNING_textArea", cols: "20", rows: "8"}, {height: Math.ceil(window.innerHeight / 2.5) + "px"}),
      E("div", {id: "FLASH_LEARNING_footer"}).append(
        E("button", {id: "FLASH_LEARNING_save", "class": "FLASH_LEARNING_button", title: "ノートを保存"}).appendText("save").addEvent(
          "click", saveNote),
        E("button", {"class": "FLASH_LEARNING_button", title: "入力内容をクリア"}).appendText("clear").addEvent(
          "click", function() {
            var t = $("FLASH_LEARNING_textArea");
            t.value = "";
            t.focus();
          }),
        E("span").appendText("表示位置: "),
        E("select", {id: "FLASH_LEARNING_option"}).append(
          E("option", {value: "center"}).appendText("中央"),
          E("option", {value: "upperLeft"}).appendText("左上"),
          E("option", {value: "upperRight"}).appendText("右上"),
          E("option", {value: "lowerLeft"}).appendText("左下"),
          E("option", {value: "lowerRight"}).appendText("右下"),
          E("option", {value: "cursor"}).appendText("カーソル")
          ).addEvent("change", function(e) {
            flashWord.option.Position = e.target.value;
            GM_setValue("option", flashWord.option.toSource());
          })
        ),
      E("div", {id: "FLASH_LEARNING_help"}, {display: "none"}).appendText("一行毎に表示されます。英単語と意味は\r\n空白二つ以上で区切るようにしてください。")
      ).appendToBody();
    var opt = $("FLASH_LEARNING_option").childNodes;
    var pos = flashWord.option.Position || "center";
    for (var i = 0; i < opt.length; i++) {
      if (opt[i].value == pos) {
        opt[i].selected = "selected";
        break;
      }
    }
  }


  function winToggle() {
    myNote ? myNote.toggle() : makeWin();
    setTimeout(function() {openNote();}, 200);
  }

  var flash = document.createElement('div');
  flash.id = 'FLASH_LEARNING';
  hide(flash);
  document.body.appendChild(flash);

  document.addEventListener('keydown', function(e) {
    if (/TEXTAREA|INPUT/.test(e.target.tagName)) return;
    if (String.fromCharCode(e.keyCode) == "N") winToggle();
  }, false);
  document.addEventListener("contextmenu", function(e) {
    flashWord.b = e.button;}, false);
  document.addEventListener("mousedown", function() {
    flashWord.time = new Date().getTime();}, false);
  document.addEventListener("mouseup", flashWord.show, false);
  window.addEventListener("resize", function() {
    if (!$("FLASH_LEARNING_textArea")) return;
    $("FLASH_LEARNING_textArea").style.height = Math.ceil(window.innerHeight / 2.5) + "px";
  }, false);

  // ----[Utility]-------------------------------------------------

  function $(id) {
    return document.getElementById(id);
  }

  function hide(target){
    target.style.display='none';
  }

  function show(target, style){
    target.style.display=(style || '');
  }

  // http://la.ma.la/blog/diary_200608300350.htm
  function shuffle(a) {
    var i = a.length;
    while(i){
      var j = Math.floor(Math.random()*i);
      var t = a[--i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function keys(obj) {
    var result = [];
    for (var k in obj) {
      result.push(k);
    }
    return result;
  }

  // HTML escape
  function HTMLescape(str) {
    if (!str || typeof str != "string") return;
    return str.replace(/([<>&\"])/g, function(m0,m1){return {"<":"&lt;",">":"&gt;",'"':"&quot;",'&':"&amp;"}[m1];});
  }

  function signal() {
    var t = $("FLASH_LEARNING_textArea");
    var s = t.style;
    var bc = s.backgroundColor;
    var count = 0;
    var id = setInterval(function() {
      s.backgroundColor = "#81BCE9";
      setTimeout(function() {s.backgroundColor = bc;}, 250);
      count++;
      if (count >= 2) clearInterval(id);
    }, 500);
  }

  function log() {
    console.log.apply(console, Array.slice(arguments))
    }


  function E(tag, attr, css) {
    if (window == this || !this.init) return new E(tag, attr, css);
    return this.init(tag, attr, css);
  }

  E.prototype.init = function(tag, attr, css) {
    if (tag) this.elm = document.createElement(tag);
    if (attr) this.setAttr(attr);
    if (css) this.setStyle(css);
    return this;
  }
  E.prototype.setAttr = function(attr) {
    for (var k in attr) {
      if (k == "className") {
        this.elm.className = attr[k];
        continue;
      }
      this.elm.setAttribute(k, attr[k]);
    }
    return this;
  }
  E.prototype.setStyle = function(css) {
    var style = this.elm.style;
    for (var k in css) {
      style[k] = css[k];
    }
    return this;
  }

  E.prototype.appendToBody = function() {
    document.body.appendChild(this.elm);
  }
  E.prototype.append = function(elm) {
    var frg = document.createDocumentFragment();
    for (var i = 0, l = arguments.length; i < l; i++) {
      var e = arguments[i];
      if (e.append) e = e.elm;
      frg.appendChild(e);
    }
    this.elm.appendChild(frg);
    return this;
  }
  E.prototype.appendText = function(text) {
    this.elm.appendChild(document.createTextNode(text));
    return this;
  }
  E.prototype.addEvent = function(type, func) {
    this.elm.addEventListener(type, func, false);
    return this;
  }
  E.prototype.toggle = function(s) {
    this.elm.style.display = this.elm.style.display == "none" ? s || "" : "none";
  }


})();