// ==UserScript==
// @name        ニコニコ動画　読み込み割合を表示
// @namespace   http://userscripts.org/users/497722
// @description シークバー詐欺にさよならバイバイ。ページタイトルに動画の読み込み割合を表示します。
// @include     http://www.nicovideo.jp/watch/*
// @grant       none
// @version     1.4.0
// ==/UserScript==

// ページタイトルに表示するアイディアは下記スクリプトより
// http://userscripts.org/scripts/show/50859 （Nico load ratio）


(function() {

  "use strict";

  var timerId
    , doc = document
    , mode
    , finishLoading = false
    

  var e = doc.getElementById("flvplayer") || doc.getElementById("external_nicoplayer")

    // Qはプレイヤーの準備が遅い
  var init = function() {
    if (!e) {
      console.log("yet") // 安全のために消さないで置く
      setTimeout(init, 3000)
      return
    }
    else {
      //console.log("ready")
      showRatio()

      if(doc.getElementById("external_nicoplayer")) {
        var connector = WatchApp.ns.init.PlayerInitializer.playerAreaConnector
        // Qwatchの連続再生・動画リスト対策
        connector.addEventListener('onVideoChangeStatusUpdated', function(ev) {
          if(!ev){ //2回あるので後の方だけ. 1回目は戻り値がtrue,　2回目はfalse
            clearInterval(timerId)
            //console.log("video changed")
            showRatio()
          }
        }, false);
        // 100%から戻した場合 for Qwatch
        connector.addEventListener('onVideoSeeked', function() {
          if(finishLoading && e.ext_getLoadedRatio() !== 1){
            finishLoading = false
            clearInterval(timerId)
            showRatio()
          }
        }, false);
      }

    }
  }

  init()


  function showRatio() {
    // プレイヤーの判別とか
    if(doc.getElementById("flvplayer")) {
      var title = Video.title
        , target = doc.getElementById("player_bottom_textlink")
        , targetIns = target.childNodes[4]
      mode = "Hara"
    } else {
      var title = WatchApp.namespace.model.player.NicoPlayerConnector.playerInitializeModel.flashVars.videoDetail.title
        , target = doc.getElementById("commentDefaultHeader")
        , targetIns = target.childNodes[1]
      mode = "Qwatch"
    }


    // 100%から戻した場合のシークバー詐欺対策. for Hara 手動だよ´ω`)
    if(mode === "Hara") {
      if (!doc.getElementById("getratioagain")) {
        var input = doc.createElement("input");
        input.id = 'getratioagain';
        input.type = 'button';
        input.value = "Re%";
        input.title = "動画読み込み割合再表示"
        input.style.display = "none";
        input.style.border = "none";
        input.style.background = "none";
        input.style.cursor = "pointer";

        input.addEventListener('click', function() {
          showRatio();
          input.style.display = "none";
        }, false);
        target.insertBefore(input, targetIns);
      } else {
        doc.getElementById("getratioagain").style.display = "none"
      }
    }

    // -----------------------------
    // 表示処理
    timerId = setInterval(function() {
      var load = e.ext_getLoadedRatio()
        , loaded = load * 100 | 0;
      doc.title = "(" + loaded + "%...) " + title;
      if (loaded === 100) {
        // console.log("finish loading")
        clearInterval(timerId);
        doc.title = "[fin] " + title;
        finishLoading = true
        if(mode === "Hara") { 
          var gra = doc.getElementById("getratioagain");
          if (gra.style.display == "none") gra.style.display = "";
        }
      }
    }, 7000);


  } // end showRatio


})()