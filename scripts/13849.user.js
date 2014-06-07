// ==UserScript==
// @name           Click Reader
// @version        0.21
// @namespace      http://munologue.com/gm/clickreader/
// @include        http://*
// @description    Twitter Reader
// ==/UserScript==

// This script based on FLSH KEY.
// http://userscripts.org/scripts/show/11996


(function() {
  if (window.parent != window.self) return;

  GM_addStyle(<><![CDATA[
    #CLICK_READER{
    position : fixed;
    font-size: 220%;
    font-weight: bold;
    line-height: 1.4;
    top: 50%;
    left: 50%;
    z-index : 1000;
    padding : 0.4em;
    background-color : #444;
    color : #fff;
    -moz-border-radius: 0.4em;
    -moz-opacity: 0.9;
    border-top: 1px solid #ccc;
    border-right: 2px solid #000;
    border-bottom: 2px solid #000;
    border-left: 1px solid #ccc;
    width: 50%;
    min-width: 1em;
    text-align: center;
    }
    #CLICK_READER_user {
    font-size: 80%;
    font-weight: normal;
    color: #fff;
    }
    ]]></>);


  var flashCard = {
  i: 0,
  b: "",
  status: [],
  escape: /html|textarea|input|a|form|select|option|img|button|embed/i,
  timeout: "",
  show: function(e){
    var elm = e.target;
    if (!e.keyCode) {
      if (e.button != 0 || window.getSelection().toString() || elm.tagName.search(flashCard.escape) != -1) return;
      if (flashCard.b == 2) {
        flashCard.b = e.button;
        return;
      }
    }
    if (flashCard.status[flashCard.i]) {
      flashCard.showCard(flashCard.status[flashCard.i]);
      flashCard.i++;
      if (flashCard.i >= flashCard.status.length) {
        flashCard.i = 0;
        flashCard.status =[];
        loadFriendsTimeline();
      }
    }
  },
  showCard: function(t) {
    clearTimeout(flashCard.timeout);
    var k = HTMLescape(t.text);
    var v = HTMLescape(t.user);
    flash.innerHTML = k && v ? k + '<div id="CLICK_READER_user">' + v + "<\/div>": k;
    show(flash);
    flash.style.marginLeft = (-(flash.offsetWidth / 2)) + "px";
    flash.style.marginTop = (-(flash.offsetHeight / 2)) + "px";
  },
  hide: function(t) {
    t = typeof t == "number" ? t : 650;
    flashCard.timeout = setTimeout(function() {
      hide(flash);}, t);
  }
  }

  function loadFriendsTimeline() {
    GM_xmlhttpRequest({
    method: "POST",
    url: "http://twitter.com/statuses/friends_timeline.json",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
      },
    onload: function(res) {
      var response = eval("(" + res.responseText + ")");
      for (var i = 0; i < response.length; i++) {
        var r = response[i];
        var statuses = {};
        statuses.text = r.text;
        statuses.user = r.user.screen_name;
        flashCard.status.push(statuses);
      }
    },
    onerror: function(res) {
      flashCard.showCard("error");
      flashCard.hide();
    }
    });
  }

  var flash = document.createElement('div');
  flash.id = 'CLICK_READER';
  hide(flash);
  document.body.appendChild(flash);
  flash.addEventListener("mouseover", function() {
    clearTimeout(flashCard.timeout);
    document.addEventListener("click", flashCard.show, false);
    removeEvent();
  }, false);
  flash.addEventListener("mouseout", function() {
    flashCard.hide();
    document.removeEventListener("click", flashCard.show, false);
    addEvent();
  }, false);

  document.addEventListener("dblclick", function(e) {
      loadFriendsTimeline();
      document.addEventListener("contextmenu", function(e) {
        flashCard.b = e.button;}, false);
      addEvent();
  }, false);

  function addEvent() {
    document.addEventListener("mousedown", flashCard.show, false);
    document.addEventListener("mouseup", flashCard.hide, false);
  }

  function removeEvent() {
    document.removeEventListener("mousedown", flashCard.show, false);
    document.removeEventListener("mouseup", flashCard.hide, false);
  }

  // ----[Utility]-------------------------------------------------

  function hide(target){
    target.style.display='none';
  }

  function show(target, style){
    target.style.display=(style || '');
  }

  // HTML escape
  function HTMLescape(str) {
    if (!str || typeof str != "string") return;
    return str.replace(/([<>&\"])/g, function(m0,m1){return {"<":"&lt;",">":"&gt;",'"':"&quot;",'&':"&amp;"}[m1];});
  }



})();