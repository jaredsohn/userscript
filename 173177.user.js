// ==UserScript==
// @name        Nico HeatMap
// @namespace   https://github.com/segabito/
// @description コメントの盛り上がり状態をシンプルにグラフ表示。 GINZA用
// @include     http://www.nicovideo.jp/watch/*
// @version     1.1.2
// @grant       none
// ==/UserScript==


// ver1.0.2
// GINZAでプレーヤーのサイズが微妙に変わったのに合わせた

// TODO: 他にもなんか直そうと思ってたけど思い出せない。思い出したらやる

(function() {
  var monkey =
  (function() {
    'use strict';
    if (!window.WatchApp || !window.WatchJsApi) {
      return;
    }

    var $ = window.jQuery, WatchApp = window.WatchApp;

    var config =  (function() {
      var prefix = 'NicoHeatMap_';
      var conf = {
        heatMapPosition: 'default',
        heatMapDisplayMode: 'hover'
      };
      return {
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
    })();

    var $settingPanel = (function(config) {
        var $menu   = $('<li class="nicoHeatMapSettingMenu"><a href="javascript:;" title="NicoHeatMapの設定変更">NicoHeatMap設定</a></li>');
        var $panel  = $('<div id="nicoHeatMapSettingPanel" />');//.addClass('open');
//        var $button = $('<button class="toggleSetting playerBottomButton">設定</botton>');

//        $button.on('click', function(e) {
//          e.stopPropagation(); e.preventDefault();
//          $panel.toggleClass('open');
//        });

        $menu.find('a').on('click', function() { $panel.toggleClass('open'); });

        var __tpl__ = (function() {/*
          <div class="panelHeader">
          <h1 class="windowTitle">NicoHeatMapの設定</h1>
          <p>設定はリロード後に反映されます</p>
          <button class="close" title="閉じる">×</button>
          </div>
          <div class="panelInner">
            <div class="item" data-setting-name="heatMapDisplayMode" data-menu-type="radio">
              <h3 class="itemTitle">HeatMapの表示</h3>
              <label><input type="radio" value="&quot;always&quot;">常時表示</label>
              <label><input type="radio" value="&quot;hover&quot;">ホバー時のみ</label>
            </div>

            <div class="item" data-setting-name="heatMapPosition" data-menu-type="radio">
              <h3 class="itemTitle">HeatMapの位置</h3>
              <label><input type="radio" value="&quot;bottom&quot;">プレイヤー下</label>
              <label><input type="radio" value="&quot;default&quot;">標準</label>
            </div>

          </div>
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/\{\*/g, '/*').replace(/\*\}/g, '*/');
        $panel.html(__tpl__);
        $panel.find('.item').on('click', function(e) {
          var $this = $(this);
          var settingName = $this.attr('data-setting-name');
          var value = JSON.parse($this.find('input:checked').val());
          console.log('seting-name', settingName, 'value', value);
          config.set(settingName, value);
        }).each(function(e) {
          var $this = $(this);
          var settingName = $this.attr('data-setting-name');
          var value = config.get(settingName);
          $this.addClass(settingName);
          $this.find('input').attr('name', settingName).val([JSON.stringify(value)]);
        });
        $panel.find('.close').click(function() {
          $panel.removeClass('open');
        });


//        $('#playerAlignmentArea').append($button);
        $('#siteHeaderRightMenuFix').after($menu);
        $('body').append($panel);

        return $panel;
    })(config);

    var addStyle = function(styles, id) {
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
    };

    var __css__ = (function() {/*
      #nicoHeatMapContainer {
        position: absolute; z-index: 200;
        bottom: 0px; left: 0;
        width: 672px;
        background: #000; height: 6px;
        overflow: hidden;
        display: none;
      }
      .size_normal #nicoHeatMapContainer {
        width: 898px;
      }
      .oldTypeCommentInput #nicoHeatMapContainer {
        bottom: 29px;
      }
      #content:hover #nicoHeatMapContainer, #nicoHeatMapContainer.displayAlways {
        display: block;
      }
      #nicoHeatMapContainer.displayAlways {
        cursor: pointer;
      }
      #nicoHeatMapContainer.playerBottom {
        bottom: -6px;
      }

      {* 全画面・小画面・検索画面では非表示 *}
      body.full_with_browser #content #nicoHeatMapContainer,
      body.size_small        #content #nicoHeatMapContainer,
      body.videoSelection    #content #nicoHeatMapContainer
      {
        display: none;
      }

      #nicoHeatMap {
        position: absolute; top: 0; left: 0;
        transform-origin: 0 0 0;-webkit-transform-origin: 0 0 0;
        transform: scaleX(6.72);-webkit-transform: scaleX(6.72);
      }

      .size_normal #nicoHeatMap {
        transform: scaleX(8.98); -webkit-transform: scaleX(8.98);
      }

      .nicoHeatMapSettingMenu a {
        font-weight: bolder;
        white-space: nowrap;
      }
      #nicoHeatMapSettingPanel {
        position: fixed;
        bottom: 2000px; right: 8px;
        z-index: -1;
        width: 500px;
        background: #f0f0f0; border: 1px solid black;
        padding: 8px;
        transition: bottom 0.4s ease-out;
      }
      #nicoHeatMapSettingPanel.open {
        display: block;
        bottom: 8px;
        box-shadow: 0 0 8px black;
        z-index: 10000;
      }
      #nicoHeatMapSettingPanel .close {
        position: absolute;
        cursor: pointer;
        right: 8px; top: 8px;
      }
      #nicoHeatMapSettingPanel .panelInner {
        background: #fff;
        border: 1px inset;
        padding: 8px;
        min-height: 300px;
        overflow-y: scroll;
        max-height: 500px;
      }
      #nicoHeatMapSettingPanel .panelInner .item {
        border-bottom: 1px dotted #888;
        margin-bottom: 8px;
        padding-bottom: 8px;
      }
      #nicoHeatMapSettingPanel .panelInner .item:hover {
        background: #eef;
      }
      #nicoHeatMapSettingPanel .windowTitle {
        font-size: 150%;
      }
      #nicoHeatMapSettingPanel .itemTitle {
      }
      #nicoHeatMapSettingPanel label {

      }
      #nicoHeatMapSettingPanel small {
        color: #666;
      }
      #nicoHeatMapSettingPanel .expert {
        margin: 32px 0 16px;
        font-size: 150%;
        background: #ccc;
      }

    */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/\{\*/g, '/*').replace(/\*\}/g, '*/');
    addStyle(__css__, 'nicoHeatMapCSS');


    var CommentList = function() { this.initialize.apply(this, arguments); };
    CommentList.prototype = {
      initialize: function(WatchApp) {
        this._WatchApp = WatchApp;
        this._commentPanelViewController = WatchApp.ns.init.PlayerInitializer.commentPanelViewController;
      },
      getComments: function() {
        var comments = [];
        var commentPanelViewController = this._commentPanelViewController;
        var activeListName = commentPanelViewController.commentListModel.getListName();
        var list = commentPanelViewController.commentLists;

        for (var i = 0; i < list.length; i++) {
          if (list[i].listName === activeListName) {
            comments = list[i].comments;
            break;
          }
          var ct = list[i].comments;
          comments = (comments.length < ct.length) ? ct : comments;
        }
        return comments;
      }
    };

    var HeatMapModel = function() { this.initialize.apply(this, arguments); };
    HeatMapModel.prototype = {
      _nicoplayer: null,
      _WatchApp:   null,
      _resolution: 100,
      initialize: function(params) {
        this._view       = params.view;
        this._nicoplayer = params.nicoplayer;
        this._resolution = params.resolution || 100;
        this._WatchApp   = params.WatchApp;
        this._commentList = new CommentList(this._WatchApp);
      },
      update: function() {
        var map = this._getHeatMap(this._commentList.getComments(), this._getDuration());
        this._view.update(map);
      },
      reset: function() {
        this._view.reset();
      },
      _getDuration: function() {
        return this._nicoplayer.ext_getTotalTime(); // watchInfoModelよりたぶん正確
      },
      _getHeatMap: function(comments, duration) {
        var map = new Array(Math.max(Math.min(this._resolution, Math.floor(duration)), 1)), i = map.length; while(i > 0) map[--i] = 0;
        var ratio = duration > map.length ? (map.length / duration) : 1;

        for (i = comments.length - 1; i >= 0; i--) {
          var pos = comments[i].vpos , mpos = Math.min(Math.floor(pos * ratio / 1000), map.length -1);
          map[mpos]++;
        }

        return map;
      }
    };

    var HeatMapView = function() { this.initialize.apply(this, arguments); };
    HeatMapView.prototype = {
      _canvas:  null,
      _context: null,
      _palette: null,
      _width: 100,
      _height: 12,
      initialize: function(params) {
        this._width  = params.width;
        this._height = params.height;

        this._initializePalette();
        this._initializeCanvas(params);
      },
      _initializePalette: function() {
        this._palette = [];
        for (var c = 0; c < 256; c++) {
          var
            r = Math.floor((c > 127) ? (c / 2 + 128) : 0),
            g = Math.floor((c > 127) ? (255 - (c - 128) * 2) : (c * 2)),
            b = Math.floor((c > 127) ? 0 : (255  - c * 2));
          this._palette.push('rgb(' + r + ', ' + g + ', ' + b + ')');
        }
      },
      _initializeCanvas: function(params) {
        var $container = $('<div id="nicoHeatMapContainer" />');
        $container.on('dblclick', function(e) { // ダブルクリックしたら固定表示にする(オマケ)
          e.preventDefault();
          e.stopPropagation();
          $(this).toggleClass('displayAlways');
        });

        if (config.get('heatMapDisplayMode') === 'always') {
          $container.addClass('displayAlways');
        }
        if (config.get('heatMapPosition') === 'bottom') {
          $container.addClass('playerBottom');
        }

        this._canvas        = document.createElement('canvas');
        this._canvas.id     = 'nicoHeatMap';
        this._canvas.width  = this._width;
        this._canvas.height = this._height;
        $container.append(this._canvas);
        $(params.target).append($container);

        this._context = this._canvas.getContext('2d');

        this.reset();
      },
      reset: function() {
        this._context.fillStyle = this._palette[0];
        this._context.beginPath();
        this._context.fillRect(0, 0, this._width, this._height);
      },
      update: function(map) {

        // 一番コメント密度が高い所を100%として相対的な比率にする
        // 赤い所が常にピークになってわかりやすいが、
        // コメントが一カ所に密集している場合はそれ以外が薄くなってしまうのが欠点
        var max = 0, i;
        // -4 してるのは、末尾にコメントがやたら集中してる事があるのを集計対象外にするため (ニコニ広告に付いてたコメントの名残？)
        for (i = Math.max(map.length - 4, 0); i >= 0; i--) max = Math.max(map[i], max);

        if (max > 0) {
          var rate = 255 / max;
          for (i = map.length - 1; i >= 0; i--) {
            map[i] = Math.min(255, Math.floor(map[i] * rate));
          }
        } else {
          return;
        }

        var
          scale = map.length >= this._width ? 1 : (this._width / Math.max(map.length, 1)),
          blockWidth = (this._width / map.length) * scale,
          context = this._context;

        for (i = map.length - 1; i >= 0; i--) {
          context.fillStyle = this._palette[parseInt(map[i], 10)] || this._palette[0];
          context.beginPath();
          context.fillRect(i * scale, 0, blockWidth, this._height);
        }
      }
    };

    var HeatMapController = function() { this.initialize.apply(this, arguments); };
    HeatMapController.prototype = {
      _commentReady: false,
      _videoready:   false,
      _updated:      false,
      _model:        null,
      _view:         null,
      _nicoplayer:   null,
      initialize: function(params) {
        var
          $ = params.$, window = params.window,
          pac = params.WatchApp.ns.init.PlayerInitializer.playerAreaConnector,
          onCommentListInitialized = function() {
            window.setTimeout($.proxy(function() {
              this._commentReady = true;
              this.update();
            }, this), 1000);
          },
          onVideoInitialized       = function() {
            if (!this._nicoplayer) {
              this._nicoplayer = document.getElementById(params.playerId);
              this._initializeHeatMap(params);
            }
            this._videoReady = true;
            this.update();
          };

        pac.addEventListener('onCommentListInitialized',   $.proxy(onCommentListInitialized, this));
        pac.addEventListener('onVideoInitialized',         $.proxy(onVideoInitialized      , this));
        pac.addEventListener('onVideoChangeStatusUpdated', $.proxy(this.reset              , this));
      },
      _initializeHeatMap: function(params) {
        this._view  = new HeatMapView({
          target:     params.target,
          width:      params.width,
          height:     params.height
        });
        this._model = new HeatMapModel({
          view:       this._view,
          nicoplayer: this._nicoplayer,
          resolution: params.width,
          WatchApp:   params.WatchApp
        });
      },
      update: function() {
        if (!this._commentReady || !this._videoReady || this._updated) return;
        try {
          this._updated = true;
          this._model.update();
        } catch(e) {
          console.log('%cException: ', 'color: white; background: red;', e);
          console.trace();
        }
      },
      reset: function() {
        this._model.reset();
        this._commentReady = this._videoReady = this._updated = false;
      }
    };

    var initialize = function() {
      window.NicoHeatMap = new HeatMapController({
        WatchApp: WatchApp,
        resolution: 100,
        width: 100,
        height: 12,
        target: '#nicoplayerContainerInner',
        playerId: 'external_nicoplayer',
        $: $,
        window: window
      });
    }

    if (window.PlayerApp) {
      (function() {
        var watchInfoModel = WatchApp.ns.model.WatchInfoModel.getInstance();
        if (watchInfoModel.initialized) {
          initialize();
        } else {
          var onReset = function() {
            watchInfoModel.removeEventListener('reset', onReset);
            window.setTimeout(function() {
              watchInfoModel.removeEventListener('reset', onReset);
              initialize();
            }, 0);
          };
        }
      })();
    }



  }); // end of monkey

  var gm = document.createElement('script');
  gm.id = 'nicoHeatMapScript';
  gm.setAttribute("type", "text/javascript");
  gm.setAttribute("charset", "UTF-8");
  gm.appendChild(document.createTextNode("(" + monkey + ")(window)"));
  document.body.appendChild(gm);

})();
