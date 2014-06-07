// ==UserScript==
// @name        Nicorenizer
// @namespace   https://github.com/segabito/
// @description ニコレナイザー   動画プレイヤー上でニコれなくするやつ Chrome用
// @include     http://www.nicovideo.jp/watch/*
// @version     0.1.3
// @grant       none
// ==/UserScript==

// ver 0.1.2
// - Watch It Laterと併用時、動画選択画面でのダブルクリックでフルスクリーンにならないのを修正

// ver 0.1.0 最初のバージョン

(function() {
  var monkey = (function(){
    'use strict';


    if (!window.WatchApp || !window.WatchJsApi) {
      return;
    }

    window.Nicorenizer = {};

    window.WatchApp.mixin(window.Nicorenizer, {
      initialize: function() {
        this._watchInfoModel      = window.WatchApp.ns.init.CommonModelInitializer.watchInfoModel;
        this._playerAreaConnector = window.WatchApp.ns.init.PlayerInitializer.playerAreaConnector;
        this._nicoPlayerConnector = window.WatchApp.ns.init.PlayerInitializer.nicoPlayerConnector;
        this._videoExplorer       = window.WatchApp.ns.init.VideoExplorerInitializer.videoExplorer;

        this.initializeUserConfig();
        this.initializeShield();

        this.initializePlayerApp();

        this.initializeCss();
      },
      addStyle: function(styles, id) {
        var elm = document.createElement('style');
        elm.type = 'text/css';
        if (id) { elm.id = id; }

        var text = styles.toString();
        text = document.createTextNode(text);
        elm.appendChild(text);
        var head = document.getElementsByTagName('head');
        head = head[0];
        head.appendChild(elm);
        return elm;
      },
      initializeCss: function() {
        var __css__ = (function() {/*

          #nicorenaiShield {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 85px;
            z-index: 9950;
            cursor: none;
          }

          #nicorenaiShield.disable, #nicorenaiShield.disableTemp {
            display: none !important;
          }

          #nicorenaiShield.debug {
            background: red; opacity: 0.5;
          }

          #nicorenaiShield.initialized {
            display: block;
          }

          #nicorenaiShield.showCursor {
            cursor: crosshair; {* 現在有効である事をわかりやすくするためにcrosshair。本当はオリジナルのカーソルを用意したいところ *}
          }

          body.setting_panel #nicorenaiShield, body.videoErrorOccurred #nicorenaiShield,
          body.setting_panel #nicorenaiShield, body.videoErrorOccurred #nicorenaiShieldToggle {
            display: none;
          }

          body.videoExplorer #content:not(.w_adjusted) #nicorenaiShield {
            {* 動画選択画面ではクリックで解除させるために邪魔なので消す *}
            {* ただしWatch It Lterの検索モードでは有効にする *}
            display: none;
          }

          #nicorenaiShieldToggle {
            position: absolute;
            z-index: 9951;
            top:  10px;
            left: 10px;
            border-color: blue;
            opacity: 0;
            cursor: pointer;
            transition: opacity 0.5s ease;
            padding: 4px 8px;
          }

          #nicorenaiShieldToggle.disable, #nicorenaiShieldToggle.disableTemp  {
            border-color: black;
          }

          #nicorenaiShieldToggle.debug {
            opacity: 1 !important;
          }

          #nicorenaiShieldToggle.initialized:hover, #nicorenaiShieldToggle.show, #nicorenaiShieldToggle.disableTemp  {
            opacity: 1;
            transition: none;
          }

          #nicorenaiShieldToggle:after {
            content: ':ON';
          }
          #nicorenaiShieldToggle.disable:after, #nicorenaiShieldToggle.disableTemp:after {
            content: ':OFF';
          }


        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/\{\*/g, '/*').replace(/\*\}/g, '*/');

        this.addStyle(__css__, 'NicorenizerCss');
      },
      initializeUserConfig: function() {
        var prefix = 'Nicorenizer_';
        var conf = {};
        this.config = {
          get: function(key) {
            try {
              if (window.localStorage.hasOwnProperty(prefix + key)) {
                return JSON.parse(window.localStorage.getItem(prefix + key));
              }
              return conf[key];
            } catch (e) {
              return conf[key];
            }
          },
          set: function(key, value) {
            window.localStorage.setItem(prefix + key, JSON.stringify(value));
          }
        };
      },
      initializeShield: function() {
        var nicoPlayerConnector = this._nicoPlayerConnector;
        var playerAreaConnector = this._playerAreaConnector;
        var videoExplorer       = this._videoExplorer;
        var nicoPlayer = $("#external_nicoplayer")[0];
        var $shield = $('<div id="nicorenaiShield"></div>');
        var $toggle = $('<button id="nicorenaiShieldToggle">シールド</botton>');

        var click = function(e) {
          // TODO: YouTubeみたいに中央に停止/再生マーク出す？
          if (e.button !== 0) return;
          //var $shield = $(this).addClass('showCursor');
          var status = nicoPlayer.ext_getStatus();
          if (status === 'playing') {
            nicoPlayerConnector.stopVideo();
          } else {
            nicoPlayerConnector.playVideo();
          }
        };
        var dblclick = function(e) {
          if (e.button !== 0) return;
          e.preventDefault(); e.stopPropagation();

          if (videoExplorer.isOpen()) {
            videoExplorer.changeState(false);
            window.WatchJsApi.player.changePlayerScreenMode('browserFull');
          } else
          if ($('body').hasClass('full_with_browser')) {
            window.WatchJsApi.player.changePlayerScreenMode('notFull');
          } else {
            window.WatchJsApi.player.changePlayerScreenMode('browserFull');
          }
        };

        var cursorHideTimer = null;
        var mousemove = function() {
          $shield.addClass('showCursor');
          if (cursorHideTimer) {
            window.clearTimeout(cursorHideTimer);
            cursorHideTimer = null;
          }
          cursorHideTimer = window.setTimeout(function() {
            $shield.off('mousemove', mousemove);
            $shield.removeClass('showCursor');
            window.setTimeout(function() { $shield.on('mousemove', mousemove); }, 500);
          }, 3000);
        };

        var mousedown = function(e) {
          if (e.button === 0) return;
          // 左ボタン以外でクリックされたら5秒間だけシールドを解除するよ
          e.preventDefault(); e.stopPropagation();

          $shield.addClass('disableTemp');
          $toggle.addClass('disableTemp');

          $toggle
            .css('opacity', 1)
            .animate({'opacity': 0.3}, 5000, function() { $toggle.css('opacity', ''); });
          window.setTimeout(function() {
            $toggle.removeClass('disableTemp');
            $shield.removeClass('disableTemp');
            $toggle.css('opacity', '');
          }, 5000);
        };

        var toggleDisable = function(f, showButtonTemporary) {
          var isDisable = $toggle.toggleClass('disable', f).hasClass('disable');
          $shield.toggleClass('disable', isDisable);

          if (showButtonTemporary) { // 状態が変わった事を通知するために一時的に表示する
            $toggle.addClass('show');
            window.setTimeout(function() { $toggle.removeClass('show'); }, 2000);
          }
        };

        // 最初に再生開始されるまでは表示しない。 ローカルストレージ～が出たときにクリックできるようにするため。
        // でも自動再生にしてると詰む。
        playerAreaConnector.addEventListener(
          'onVideoStarted', function() {
            $shield.addClass('initialized'); $toggle.addClass('initialized');
            toggleDisable(false);
          }
        );

        // 再生後メニューがクリックできないのも困るので無効化する
        playerAreaConnector.addEventListener(
          'onVideoEnded', function() {
            toggleDisable(true, true);
          }
        );
        playerAreaConnector.addEventListener(
          'onVideoSeeked', function(vpos, b, c) {
            // もう一度再生する場合など
            if (parseInt(vpos, 10) === 0) toggleDisable(false);
          }
        );
        $shield//.addClass('debug')
          .on('click'   ,  click)
          .on('dblclick',  dblclick)
          .on('mousedown', mousedown)
          .on('mousemove', mousemove);

        $toggle//.addClass('debug')
          .attr('title', 'クリックで無効化ON/OFF')
          .on('click', toggleDisable);



        $('#external_nicoplayer').after($shield).after($toggle);

      },
      initializePlayerApp: function() {
        // 実装が漏れててエラーが出てるっぽいのを修正
        // フルスクリーン時に動画プレイヤー以外にフォーカスがある時に出る
        var np = window.PlayerApp.ns.player.Nicoplayer.getInstance();
        var ep = $('#external_nicoplayer')[0];
        if (!np.ext_getVolume) {
          np.ext_getVolume = function()  { return ep.ext_getVolume(); };
        }
        if (!np.ext_setVolume) {
          np.ext_setVolume = function(v) { ep.ext_setVolume(v); };
        }
        if (!np.ext_getStatus) {
          np.ext_getStatus = function()  { return ep.ext_getStatus(); };
        }
      }
    });

    if (window.PlayerApp) {
      (function() {
        var watchInfoModel = WatchApp.ns.model.WatchInfoModel.getInstance();
        if (watchInfoModel.initialized) {
          window.Nicorenizer.initialize();
        } else {
          var onReset = function() {
            watchInfoModel.removeEventListener('reset', onReset);
            window.setTimeout(function() {
              watchInfoModel.removeEventListener('reset', onReset);
              window.Nicorenizer.initialize();
            }, 0);
          };
          watchInfoModel.addEventListener('reset', onReset);
        }
      })();
    }


  });

  var script = document.createElement("script");
  script.id = "NicorenizerLoader";
  script.setAttribute("type", "text/javascript");
  script.setAttribute("charset", "UTF-8");
  script.appendChild(document.createTextNode("(" + monkey + ")()"));
  document.body.appendChild(script);

})();
