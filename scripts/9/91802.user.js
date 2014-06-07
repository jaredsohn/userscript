// ==UserScript==
// @name           Maximize Map
// @namespace      http://d.hatena.ne.jp/ABCbo/
// @description    地図の表示領域を最大化させる
// @include        http://maps.google.co.jp/*
// @include        http://map.yahoo.co.jp/*
// ==/UserScript==

// greasemonkeyでjQueryを使う記述。
// http://www.otchy.net/20091104/use-jquery-on-greasemonkey/からコピペ
(function(d, func) {
  var check = function() {
    if (typeof unsafeWindow.jQuery == 'undefined') return false;
    func(unsafeWindow.jQuery); return true;
  }
  if (check()) return;
  var s = d.createElement('script');
  s.type = 'text/javascript';
  s.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js';
  d.getElementsByTagName('head')[0].appendChild(s);
  (function() {
    if (check()) return;
    setTimeout(arguments.callee, 100);
  })();
})(document, function($) {
  // ここにメインの処理を書く
  /* jQueryで実現できない機能があるので、その対処
     ・$("#id").trigger('click')としても、マップの最大化ができない。
     ・$("#id").dispatchEventは使えないのでgetElementById()が必要
  */
  function BYID(id) {
    return (elem = document.getElementById(id)) ? elem : false;
  }
  function EVENT(type) {
    var event = document.createEvent('MouseEvents');
    event.initEvent(type, true, true);
    return event;
  }
  
  var url = top.location.href;
  switch(true) {
    // グーグルマップ。自動的にパネルを非表示にする
    case /maps.google.(com|co.jp)/.test(url):
      $("head").append("<style type='text/css'>"
        // 検索フォームの表示/非表示を切り替えられるようにする
        + "#header {display: none;}"
        + "#header * {"
        + "  z-index: 100 !important;"
        + "  background-color: #fff;"
        + "  color: #000;"
        + "}"
        // 地図部分を最大化
        + "#page {"
        + "  position: fixed !important;"
        + "  top: 0px !important;"
        + "  height: 100% !important;"
        + "  width: 100%;"
        + "  z-index: 99 !important;"
        + "}"
        // 検索窓切り替えボタン
        + "#add_buttons * {"
        + "  z-index: 100;"
        + "  position: absolute;"
        + "  top: 4px;"
        + "  width: 110px;"
        + "  padding: 0 5px;"
        + "  background-color: #fff;"
        + "  border: 1px solid #000;"
        + "}"
        + "#search_map {right: 210px;}"
        + "#change_map {right: 100px; display: none;}"
        // 余計な部分を非表示に
        // #copyrightを非表示にすると、検索時のスクロールがおかしくなる
        + "#gbar *, #guser, #mclip {display: none;}"
        + "#gb {visibility: hidden;}"
        + "</style>");
      $("#print").before('<div id="add_buttons">'
        + '<input type="button" id="search_map" value="Show Form" />'
        + '<input type="button" id="change_map" title="表示している場所を'
        + 'Yahoo!地図で開く" value="Yahoo!地図" /></div>');
        var start = new Date().getTime();
        var timer = window.setInterval(function() {
          if ((new Date().getTime() - start) >= 10 * 1000) {
            window.clearInterval(timer);
          }
          if (BYID("panelarrow2").title == 'パネルを隠す') {
            BYID("panelarrow2").dispatchEvent(EVENT('click'));
          }
        }, 1000);
      
      // マウスオーバーでメニューを表示
      $("#add_buttons").hover(
        function() {$("#change_map").show();},
        function() {$("#change_map").hide();}
      );
      
      // 検索フォームの表示を切り替える。
      $("#search_map").click(function() {
        $("#header").toggle();
        if ($(this).val() == 'Show Form') {
          $(this).val('Hide Form');
          $("#q_d").focus().select();
        } else {
          $(this).val('Show Form');
        }
      });
      
      /* googleマップ内でさらに検索をしたときにパネルが再表示されるので、
         再度非表示にして、検索ボックスも隠す
         一度消したあと再表示されるケースがあるので、10秒間チェックする
       */
      $("#q-sub").click(function() {
        $("#search_map").trigger('click');
        var start = new Date().getTime();
        var timer = window.setInterval(function() {
          if ((new Date().getTime() - start) >= 10 * 1000) {
            window.clearInterval(timer);
          }
          if (BYID("panelarrow2").title == 'パネルを隠す') {
            BYID("panelarrow2").dispatchEvent(EVENT('click'));
          }
        }, 1000);
      });
      
      // ウェブ履歴のサジェストを選んだ場合の処理
      // 未完成。フォームも隠れないし、パネルも隠れない。
      $("#hm td").each(function(e) {
        e.click(function() {
          GM_log('click');
          $("#q-sub").trigger('click');
        });
      });
      
      // 現在地をYahoo!地図で開く
      $("#change_map").click(function() {
        var m = unsafeWindow.gApplication.getMap().getCenter();
        window.open("http://map.yahoo.co.jp/pl?type=scroll&mode=map"
          + "&pointer=on&datum=wgs&fa=ks&layout=full"
          + "&lat="+m["Rk"].toFixed(6)+"&lon="+m["De"].toFixed(6));
      });
      break;
    
    // Yahoo地図。
    case /map.yahoo.co.jp/.test(url):
      var start = new Date().getTime();
      var timer = window.setInterval(function() {
        if ((new Date().getTime() - start) >= 10 * 1000) {
          window.clearInterval(timer);
        }
        if ($("#full-button").attr('class') == 'subclose') {
          $("#map").toggleClass('mini');
          BYID("fullclose").dispatchEvent(EVENT('click'));
        }
      }, 1000);
      // ブラウザ表示領域の高さ
      var height = document.documentElement.clientHeight;
      $("head").append("<style type='text/css'>"
        + "#adcm, #adcm_full {display: none !important;}"
        // 検索窓切り替えボタン
        + "#add_buttons * {"
        + "  z-index: 100;"
        + "  position: absolute;"
        + "  top: 4px;"
        + "  width: 110px;"
        + "  padding: 0 5px;"
        + "  background-color: #fff;"
        + "  border: 1px solid #000;"
        + "}"
        + "#search_map {right: 210px;}"
        + "#change_map {right: 100px; display: none;}"
        // 検索フォームだけ表示できるようにする
        + "#header {"
        + "  display: none;"
        + "  position: absolute !important;"
        + "  top: -100px;"
        + "}"
        + ".yschbx {"
        + "  display: none;"
        + "  position: absolute !important;"
        + "  top:100px;"
        + "  z-index: 100;"
        + "}"
        + ".yschbx form {background-color: #fff;}"
        + "#other_area {"
        + "  background-color: #fff;"
        + "  border: 1px solid #000;"
        + "}"
        // 無効な住所時のポップアップを全面に出す
        + "#modal{z-index:101 !important;}"
        // 地図部分。サイドパネルの有無で高さを変える
        + "#map               {height: " + height + "px !important;}"
        + "#map.mini          {height: " + (height - 25) + "px !important;}"
        + "</style>");
      $("html:first body").append('<div id="add_buttons">'
        + '<input type="button" id="search_map" value="Show Form" />'
        + '<input type="button" id="change_map" title="表示している場所を'
        + 'Googleマップで開く" value="Googleマップ" /></div>');
      
      // マウスオーバーでメニューを表示
      $("#add_buttons").hover(
        function() {$("#change_map").show();},
        function() {$("#change_map").hide();}
      );
      
      // 検索フォームの表示を切り替える
      $("#search_map").click(function() {
        if ($(this).val() == 'Show Form') {
          $(this).val('Hide Form');
          $("#header").show();
          $(".yschbx").show();
          $("#stxb").focus().select();
        } else {
          $(this).val('Show Form');
          $("#header").hide();
          $(".yschbx").hide();
        }
      });
      
      // 検索を実行したらフォームを隠す
      $("#exec").click(function() {
        $("#search_map").trigger('click');
      });
      
      // パネル表示の切り替え
      $("#fullclose").click(function() {
        $("#map").toggleClass('mini');
      });
      
      // 現在地をGoogleマップで開く
      $("#change_map").click(function() {
        var m = unsafeWindow.$m.url.current().match(/lat=(.*?)&lon=(.*?)&/);
        window.open("http://maps.google.co.jp/maps?f=q&source=s_q&hl=ja"
          + "&geocode=&ll="+m[1]+","+m[2]);
      });
      break;
  }
});
