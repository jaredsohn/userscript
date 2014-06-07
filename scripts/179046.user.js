// ==UserScript==
// @name        ShinjukuWatch
// @namespace   https://github.com/segabito/
// @description 新しい原宿　略して新宿
// @include     http://www.nicovideo.jp/watch/*
// @include     http://www.nicovideo.jp/mylist_add/video/*
// @version     1.4.1
// @grant       none
// ==/UserScript==

// 1.4.0
// - ウィンドウサイズに合わせてプレイヤーを大きくする機能を追加 (中画面は変わらない)

// 1.3.20
// - オススメタブだけ有効にするモードを追加 (WatchItLaterやCustomGinzaWatchと併用する用途など)

// 1.3.19
// - 本家の仕様変更で再生終了時にフルスクリーン解除されるようになったのでShinjukuWatch側の処理を削除

// ver1.3.18
// ver1.3.17
// - 本家の仕様変更に対応

// ver1.3.16
// - ニコメンドまわりのコード除去

// ver1.3.15
// - 初回起動時に操作パネルの位置をリセットしない設定を追加(上級者用)

// ver1.3.13
// - ヘッダ開閉を少しわかりやすく

// ver1.3.12
// - 本家側の仕様変更との競合でマイリスト連続再生が動かなくなっていたのを対応
// - コメントの表示非表示状態を記憶するようにした

// ver1.3.11
// - なんか増えてたソーシャルボタンを非表示化 する設定を追加

// ver1.3.10
// - 微妙なレイアウト崩れを調整

// ver1.3.9
// - 本家の内部仕様変更に対応
// - Mac版Chromeで初回だけマイリストメニューが見えない問題の暫定対処

// ver1.3.8
// - 自動スクロールが若干軽くなったかも

// ver1.3.7
// - 本家の仕様変更に対応

// ver1.3.6
// - 動画選択画面の中央揃え

// ver1.3.4
// - 動画選択画面一列表示の時マイリストコメントが出るようにした
// - 動画選択画面のサムネを原寸大表示

// ver1.3.3
// - 動画説明文中のURLを自動リンク

// ver1.3.2
// - 動画切り換え時にスクロール位置がずれてしまう問題の改善
// - プレイリストを自動で消さない設定の追加
// - 初回ロードにも常に関連動画をロードする設定の追加 (デフォルトはオフ)
// - その他細かい挙動修正

// ver1.3.1
// - ブラウザ全画面時にコメント入力欄と操作パネルを自動で隠す設定を追加

// ver1.3.0
// - 設定パネルを追加
// - ShinjukuWatchのCSSを適用しないようにする設定を追加。他のuserstyleと併用できます

// ver1.2.5
// - 本家の微妙なCSS変更に対応と今後の布石

// ver1.2.4
// - フルスクリーン解除したときプレーヤーが真ん中に来るようにする (GINZAだとページの一番上に飛ばされる)
// - (あまり使う人いないと思うけど)プレイリスト・タグつき全画面表示にした時の細かな不具合を修正
// - プレイリスト・タグつき全画面表示にニュースを消す・プレイリストを自動最小化
// - ?ref=xxx というパラメータ付きのURLでアクセスしたとき、自動で?ref=xxxを除去 (これがあるとブラウザの既読リンクがわからなくなるため)
// - ニコニコニュースの通信を切ってみる

// ver1.2.3
// - タイプミスでタグ受信無効化が出来てなかった

// ver1.2.2
// - コメントパネルの上に再生数表示

// ver1.2.1
// - マイリストの連続再生から飛んできたときは、プレイリストを消さない

// ver1.2.0
// - GINZA対応

// ver1.1.1
// - レイアウトの崩れを修正
// - WatchItLaterから、背景ダブルクリックで動画の位置にスクロールを移植

// ver1.1.0
// - 動画が切り替わる時にオススメ動画一覧を更新
// - テレビちゃんメニューのスライドをなくした


// ver1.0.0 最初のバージョン

(function() {
  var monkey = (function(){
    'use strict';

    window.Shinjuku = {
      ns: {
        loader: {}
      }
    };

    if (!window.WatchApp) {
      if (location.href.indexOf('/mylist_add/video') >= 0) {
        (function() {
        if (window.name === 'nicomylistadd') return;

        var $ = window.jQuery;
        $('body,table,img,td').css({border:0, margin:0, padding:0, background: 'transparent', overflow: 'hidden'});
        $('#main_frm').css({background: 'transparent', paddig: 0, borderRadius: 0}).addClass('mylistPopupPanel');
        $('h1:first').hide();
        $('table').css({marginTop: '100px'});

        if ($('#edit_description').length < 1) {
          $('#main_frm .font12:first').css({position: 'absolute', margin: 0, top: 0, left: 0, bottom: 0, padding: 0, color: 'red', fontSize: '8pt'});
          // ログインしてないぽい
          return;
        }

        $('#box_success').css({position: 'absolute', top: 0, left: 0});
        $('#box_success h1').css({color: 'black', fontSize: '8pt', padding: 0});
        $('td').css({padding: 0});
        $('table:first').css({width: '200px'});
        $('table:first td.main_frm_bg').css({height: '20px'});
        $('table:first table:first').hide();

        $('select')
          .css({
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            fontSize: '11pt',
            border: 0, margin: 0, 'border-radius': '4px 0 0 4px',
            width: '100px'
          })
          .addClass('mylistSelect')
          .find('option[value=new]').remove();
        $('select')[0].selectedIndex = $('select')[0].options.length - 1;
        $('#select_group option:last')[0].innerHTML = 'とりあえずマイリスト';

        var submit = document.createElement("input");
        submit.className = 'mylistAdd';
        submit.type  = "submit";
        submit.value = "登録";
        $(submit)
          .css({
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '50px',
            fontSize: '10pt',
            margin: 0, 'border-radius': '0 4px 4px 0', 'border-width': '1px',
            cursor: 'pointer'
          });
        $('select')[0].parentNode.appendChild(submit);

        $('#edit_description').hide();

        window.document.documentElement.scrollTop  = 0;
        window.document.documentElement.scrollLeft = 0;


        $('body, html').scrollTop(0);

        window.close = function() {
          window.setTimeout(function() { window.location.replace(window.location); }, 3000);
          return;
        };
        window.alert = function() {
          // TODO: document.writeやめる
          document.write('<span style="position:absolute;top:0;left:0;font-size:8pt;color:red;">' + arguments[0] + '</span>');
        };
        })();
      }
      return;
    }

    window.Shinjuku.ns.loader.RelatedVideo = function() { this.initialize.apply(this, arguments); };
    window.Shinjuku.ns.loader.RelatedVideo.prototype = {
      initialize: function() {
      },
      load: function(watchId) {
        var def = new $.Deferred();
        var timeoutTimer = null;

        window.WatchApp.ns.init.VideoExplorerInitializer.relatedVideoAPILoader.load(
          {'video_id': watchId},
          function(err, result) {
            if (timeoutTimer) {
              window.clearTimeout(timeoutTimer);
              timeoutTimer = null;
            }
            if (err !== null) {
              return def.reject({message: '通信に失敗しました(1)', status: 'fail', err: err});
            }
            return def.resolve(result);
          }
        );

        timeoutTimer = window.setTimeout(function() {
          if (timeoutTimer) {
            def.reject({message: '通信に失敗しました(2)', status: 'fail', err: 'timeout'});
          }
        }, 30 * 1000);

        return def.promise();
      }
    };

    window.Shinjuku.ns.NicoplayerResizer = function() { this.initialize.apply(this, arguments); };

    window.Shinjuku.ns.NicoplayerResizer.prototype = {
      initialize: function() {
        this._customStyleElement = null;
        this._lastCssName = null;

        window.setTimeout($.proxy(function() {
          this._updateStyle();
          this._toggleSize(true);
        }, this), 0);

        $(window).on('resize',
          window._.debounce(
            $.proxy(function() {
              this._updateStyle();
            },
          this),
        500));
      },
      _getCssTemplate: function() {
         var tpl = (function() {/*
           body.size_normal.w_size_custom:not(.videoExplorer):not(.full_with_browser) #playerAlignmentArea
           { width: {$alignmentAreaWidth}px; }
           body.size_normal.w_size_custom:not(.videoExplorer):not(.full_with_browser) .w_wide #playerAlignmentArea
           { width: {$alignmentAreaWideWidth}px; }

           body.size_normal.w_size_custom:not(.videoExplorer):not(.full_with_browser) #nicoplayerContainer {
             height: {$playerHeight}px !important;
           }
           body.size_normal.w_size_custom:not(.videoExplorer):not(.full_with_browser) #playerNicoplayer
           { width: {$playerWidth}px !important;}

           body.size_normal.w_size_custom:not(.videoExplorer):not(.full_with_browser) #external_nicoplayer
           { width: {$playerWidth}px !important; height: {$playerHeight}px !important; }

           body.size_normal.w_size_custom:not(.videoExplorer):not(.full_with_browser) #nicoHeatMapContainer {
             width: {$playerWidth}px !important;
           }
           body.size_normal.w_size_custom:not(.videoExplorer):not(.full_with_browser) #nicoHeatMap {
             transform: scaleX({$heatMapScale}); -webkit-transform: scaleX({$heatMapScale});
           }
           body.size_normal.w_size_custom:not(.videoExplorer):not(.full_with_browser) #smart_music_kiosk {
             -webkit-transform: scaleX({$songriumScale}); -webkit-transform-origin: 0 0;
           }

           body.size_normal.w_size_custom:not(.videoExplorer):not(.full_with_browser) #inspire_category {
            left: {$songriumCategoryLeft}px !important;
           }
           body.w_size_custom:not(.full_with_browser):not(.videoExplorer) #playlist {
             margin: -10px auto 0; width: {$alignmentAreaWidth}px;
           }

           */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/\{\*/g, '/*').replace(/\*\}/g, '*/');
        return tpl;
      },
      _isFixedHeader: function() {
        return !$('body').hasClass('nofix');
      },
      _isNormalPlayerMode: function() {
        var $body = $('body');
        if ($body.hasClass('full_with_browser') ||
            $body.hasClass('videoExplorer')) {
          return false;
        }
        return true;
      },
      _getPlayerTabWidth: function() {
        return 326 + 10; // (conf.wideCommentPanel ? PLAYER_TAB_WIDTH_WIDE : PLAYER_TAB_WIDTH);
      },
      _getPlayerTabMargin: function() {
        return 0;
      },
      _getPlayerHorizontalMargin: function() {
        return 1.05; // 両端に 2.5% x 2 のマージンがある
      },
      _getProfileSet: function() {
        return {
          'WQHD':   [2560, 1440],
          '1080p':  [1920, 1080],
          'HD+':    [1600,  900],
          'WXGA+':  [1400,  810],
          'WXGA':   [1366,  768],
          '720p':   [1280,  720],
          'WSVGA+': [1152,  648],
          'WSVGA':  [1024,  576],
          'QHD':    [ 960,  540],
          'WVGA':   [ 854,  480]
//          'WVGA-':  [ 720,  720 / 16 * 9],
//          'VGA-':   [ 640,  360],
//          'VGA--':  [ 480,  480 / 16 * 9],
//          'VGA---': [ 512,  512 / 16 * 9]
        };
      },
      _getTargetSize: function(targetWidth, targetHeight) {
         var CONTROL_HEIGHT = 46, INPUT_HEIGHT = 30;
         var SONGRIUM_WIDTH = 898;

         var plWidth  = Math.round(targetWidth * this._getPlayerHorizontalMargin());
         var plHeight = targetHeight + CONTROL_HEIGHT + INPUT_HEIGHT;
         var alWidth  = plWidth + this._getPlayerTabWidth();
         return {
           playerWidth:            plWidth,
           playerHeight:           plHeight,
           alignmentAreaWidth:     alWidth,
           heatMapScale:           plWidth / 100,
           songriumScale:          plWidth / SONGRIUM_WIDTH,
           songriumCategoryLeft:   plWidth + 32
         };
      },
      _suggestProfile: function() {
         var iw = $(window).innerWidth(), ih = $(window).innerHeight();
         var hh = (this._isFixedHeader() ? $("#siteHeader").outerHeight() : 0);
         iw -= this._getPlayerTabWidth();
         iw -= this._getPlayerTabMargin();
         var profileSet = this._getProfileSet();

         ih -= hh;
         for (var v in profileSet) {
           var w = profileSet[v][0], h = profileSet[v][1];
           if (w * this._getPlayerHorizontalMargin() <= iw && h <= ih) {
             return {w: w, h: h, name: v};
           }
         }
         return null;
      },
      _generateCss: function() {
        var profile = this._suggestProfile();

        if (!profile) return {css: '', profile: ''};
        var ts = this._getTargetSize(profile.w, profile.h);
        var css = this._getCssTemplate();

        for (var v in ts) {
          css = css.split('{$' + v + '}').join(ts[v]);
        }
        return {css: css, profile: profile};
      },
      _updateStyle: function() {
        if (!this._isNormalPlayerMode()) {
          return;
        }

        var result = this._generateCss();
        var css = result.css, profile = result.profile, name = profile.name;

        //if (!name) { return; }
        console.log('%cプレイヤーサイズ: ' + profile.name, 'background: lightgreen;');

        if (this._lastCssName === name) {
          return;
        }
        this._lastCssName = name;
        if (this._customStyleElement) {
          console.log('A');
          this._customStyleElement.innerHTML = css;
        } else {
          console.log('B');
          this._customStyleElement = window.Shinjuku.addStyle(css, 'customPlayerSize');
        }
      },
      _toggleSize: function(v) {
        if (typeof v === 'boolean') {
          $('body').toggleClass('w_size_custom', v);
        } else {
          $('body').toggleClass('w_size_custom');
        }
      }
    };

    window.WatchApp.mixin(window.Shinjuku, {
      initialize: function() {
        window.console.time('init Shinjuku');
        if (window.WatchApp && window.WatchJsApi) { // WatchAppだけだとコメント編集画面にも来てしまうため
          this.initializeUserConfig();
          this._watchInfoModel      = window.WatchApp.ns.init.CommonModelInitializer.watchInfoModel;
          this._playerAreaConnector = window.WatchApp.ns.init.PlayerInitializer.playerAreaConnector;
          this._nicoPlayerConnector = window.WatchApp.ns.init.PlayerInitializer.nicoPlayerConnector;

           if (this.config.get('osusumeOnly') || window.WatchItLater) {
            this.initializeOsusumeOnly();
          } else {
            this.initializeShinjuku();
          }
        }
        window.console.timeEnd('init Shinjuku');
      },
      initializeShinjuku: function() {
        this.initializeTag();
        this.initializeNicoru();
        this.initializeVideoExplorer();
        this.initializePlayerTab();
        this.initializeIchiba();
        this.initializeOsusume();
        this.initializePlaylist();
        this.initializeScroll();
        this.initializeQuickMylistFrame();
        this.initializeVideoCounter();
        this.initializeScreenMode();
        this.initializeVideoDescription();
        this.initializeSettingPanel();
        this.initializeCommentVisibility();
        this.initializePlayerResizer();
        this.initializeOther();

        this.initializeCss();
      },
      initializeOsusumeOnly: function() {
        this._isOsusumeOnly = true;
        this.initializePlayerTab();
        this.initializeOsusume();
        this.initializeSettingPanel();
        this.initializeCss();
//        this.osusumeController.refresh();
//        $('body').addClass('Shinjuku');
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
        var __common_css__ = (function() {/*
          {* ページの初期化中に横スクロールバーが出るのがうざい *}
          body:not(.Shinjuku) { overflow-x: hidden; }

          .osusumeContainer {
            position: absolute;
                      top: 8px; right: 8px; bottom: 8px; left: 8px; padding: 4px;
            border: 1px solid #000;
            overflow-y: scroll;
            overflow-x: hidden;
          }
          .panel_ads_shown .osusumeContainer {
            bottom: 0px;
          }
          .osusumeContainer li  {
            position: relative;
            margin-bottom: 8px;
            padding: 4px;
            border-bottom: 1px solid #ccc;
            text-align: left;
          }
          .osusumeContainer li a:visited {
            color: purple;
          }

          .osusumeContainer .currentVideoRelated {
            background: #fff;
            font-weight: bolder;
          }

          .osusumeContainer .previousOsusume {
            margin-top: 64px;
            background: #ccc;
          }

          .osusumeContainer .thumbnail img {
            float: left; width: 64px; height: 48px;
            margin-right: 4px;
          }
          .osusumeContainer li p  {
            clear: both; font-size: 80%;
            text-align: center;
          }
          .osusumeContainer li .posted {
            display: block;
            font-size: 80%;
          }
          .osusumeContainer li .title {
            font-size: 80%;
          }
          .osusumeContainer li .count  {
            font-weight: bolder;
            margin-right: 8px;
          }
          .osusumeContainer li:after {
            content: ''; clear: both;
          }

          .osusumeContainer .nextPlayButton {
            display: none;
          }

          .osusumeContainer.withWatchItLater .nextPlayButton {
            position: absolute;
            display: inline-block;
            width: 30px;
            height: 30px;
            right: 0;
            bottom: 0;
            background: url(http://res.nimg.jp/img/watch_q9/icon_nextplay.png);
            z-index: 100;
            cursor: pointer;
            text-indent: -999em;
            overflow: hidden;
            -webkit-transform: scale(1.0); transform: scale(1.0);
          }
          .osusumeContainer.withWatchItLater .nextPlayButton:hover {
            -webkit-transform: scale(1.5); transform: scale(1.5);
          }
          .osusumeContainer.withWatchItLater .nextPlayButton:active {
            -webkit-transform: scale(1.2); transform: scale(1.2);
          }



          .quickMylistFrame {
            position: fixed;
            left: -9999px;
          }
          .quickMylistFrame.updating {
            position: fixed !important;
            left: -9999px;
            opacity: 0;
            visibility: hidden;
            z-index: -1;
          }

          #videoHeader .videoCounter {
            display: none;
          }

          #playerAlignmentArea .playerBottomButton {
            display: none;
          }

          .shinjukuSettingMenu a {
            font-weight: bolder;
          }
          #shinjukuSettingPanel {
            position: fixed;
            bottom: 2000px; right: 8px;
            z-index: -1;
            width: 500px;
            background: #f0f0f0; border: 1px solid black;
            padding: 8px;
            transition: bottom 0.4s ease-out;
          }
          #shinjukuSettingPanel.open {
            display: block;
            bottom: 8px;
            box-shadow: 0 0 8px black;
            z-index: 10000;
          }
          #shinjukuSettingPanel .close {
            position: absolute;
            cursor: pointer;
            right: 8px; top: 8px;
          }
          #shinjukuSettingPanel .panelInner {
            background: #fff;
            border: 1px inset;
            padding: 8px;
            min-height: 300px;
            overflow-y: scroll;
            max-height: 500px;
          }
          #shinjukuSettingPanel .panelInner .item {
            border-bottom: 1px dotted #888;
            margin-bottom: 8px;
            padding-bottom: 8px;
          }
          #shinjukuSettingPanel .panelInner .item:hover {
            background: #eef;
          }
          #shinjukuSettingPanel .windowTitle {
            font-size: 150%;
          }
          #shinjukuSettingPanel .itemTitle {
          }
          #shinjukuSettingPanel label {

          }
          #shinjukuSettingPanel small {
            color: #666;
          }
          #shinjukuSettingPanel .expert {
            margin: 32px 0 16px;
            font-size: 150%;
            background: #ccc;
          }

          {* ニュース消す *}
          #content.noNews #textMarquee {
            display: none !important;
          }
          {* ブラウザ画面でプレイリスト・タグ出すモードでニュースはいらない *}
          body.full_with_browser:not(.full_and_mini) .noNews #playerAlignmentArea{
            margin-bottom: -37px;
          }
          {* ニコるを消す *}
          .noNicoru .nicoru-button{
            left: -9999; display: none !important;
          }
          .noNicoru .menuOpened #videoMenuTopList li.videoMenuListNicoru .nicoru-button{
            display: block !important;
          }
          .noNicoru #videoTagContainer .tagInner #videoHeaderTagList li {
            margin: 0 18px 4px 0;
          }



          {* 真・browserFullモード *}
          body.full_with_browser.hideCommentInput #nicoplayerContainerInner {
            {* コメント入力欄は動画上表示にするのではなく、画面外に押し出す事によって見えなくする *}
            margin-top: -10px; margin-bottom: -30px;
          }

          #playerContainer      { height: auto !important; }
          #videoTagContainerPin { display: none !important; } {* タグを固定しているか4行以上の時に現われるピン *}

          .column1 .itemMylistComment {
            font-size: 85%; color: #666; display: none;
            color: #400; border: 1px solid #ccc; padding: 0 4px 0px; line-height: 130%; border-radius: 4px;
          }
          .column1 .itemMylistComment:before {
            content: 'マイリストコメント ';
            background: #ccc; border-radius: 0 0 8px 0; display: inline-block; margin: 0 4px 4px -4px; padding: 2px;
          }
          .column1 .itemMylistComment:after {
            content: '';
          }

          .w_noHover {
            pointer-events: none !important;
          }

          {* ソーシャルボタン *}
          .area-JP .panel_ads_shown #playerTabContainer.w_noSocial.has_panel_ads .playerTabContent {
            bottom: 80px;
          }
          .area-JP                  #playerTabContainer.w_noSocial               .playerTabContent {
            bottom: 4px;
          }
          #playerTabContainer.w_noSocial .playerTabAds {
            bottom: 0;
          }
          #playerTabContainer.w_noSocial .socialButtons{
            display: none;
          }
          .w_noSocial .nicoSpotAds {
            bottom: 8px;
          }

          #playerTabContainer.osusumeTab .playerTabHeader .playerTabItem {
            width: 108px;
          }

          button::-moz-focus-inner {
            border: 0px;
          }

        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/\{\*/g, '/*').replace(/\*\}/g, '*/');

        var __css__ = (function() {/*
          #videoHeaderDetail h2 {
            letter-spacing: -1px; {* たまに最後の1文字だけ改行されるのを防ぐ *}
          }
          {*body.Shinjuku #videoHeaderDetail {
            width: calc(100% - 326px);
          }*}
          #topVideoInfo .videoDescription{
            border: 1px solid #cccccc;
            border-radius: 4px 4px 4px 4px;
            padding: 4px;
            width: 662px; {* プレーヤーの幅合わせ *}
            {* max-height: 200px; *}
            overflow-y: auto;
            font-size: 12px;
          }
          body.size_normal #topVideoInfo .videoDescription {
            width: 888px;
          }
          #videoTagContainer .tagInner #videoHeaderTagList li .tagControlContainer,
          #videoTagContainer .tagInner #videoHeaderTagList li .tagControlEditContainer {
            padding: 1px 0;
          }
          body:not(.full_with_browser).size_medium #videoTagContainer {
            width: 672px; min-width: 672px; padding-right: 0;
          }
          body:not(.full_with_browser).size_normal #videoTagContainer {
            width: 898px; min-width: 898px; padding-right: 0;
          }
          body #videoTagContainer .tagInner #videoTagContainerPin.active {
            display: none !important;
          }

          {* 余白の除去 *}
          body:not(.full_with_browser):not(.videoExplorer) #playerContainerWrapper { margin-top: -20px; }
          #videoHeader #videoHeaderDetail {
            margin-top: 0 !important;
          }
          #videoHeader .videoDetailExpand {
            height: auto !important;
            padding: 4px 8px 0;
            min-height: 32px;
          }
          #videoTagContainer { height: auto !important; }
          body:not(.full_with_browser) #videoTagContainer .tagInner {
            height: auto !important;
            bottom: 0px;
            position: absolute;
            min-height: 48px;
          }
          #videoTagContainer .tagInner #videoHeaderTagList .toggleTagEdit {
            height: auto; width: 72px; padding: 2px 4px;
          }
          #videoTagContainer .tagInner #videoHeaderTagList .toggleTagEditInner {
            line-height: 22px; white-space: nowrap;
          }
          body:not(.full_with_browser) #content #videoTagContainer .tagInner #videoHeaderTagList {
            padding-left: 85px;
          }
          .videoMenuToggle {
            transform-origin: 100% 100%; -webkit-transform-origin: 100% 100%;
            transform: scale(0.7); -webkit-transform: scale(0.7);
          }
          .videoMenuToggle .tooltipOuter {
            display: none !important;
          }
          .videoDetailToggleButton {
            cursor: pointer;
          }

          {* タイトルクリックでヘッダが開閉できるのをわかりやすく *}
          .videoDetailToggleButton:hover {
            text-decoration: underline;
          }
          .videoDetailToggleButton:hover:after {
            content: '▼';
            position: absolute;
            width: 32px;
            height: 20px;
            top: 0;
            bottom: 0;
            right: -32px;
            margin: auto;
            color: #888;
            font-size: 80%;
          }
          .infoActive .videoDetailToggleButton:hover:after {
            content: '▲';
          }

          .toggleDetailExpand, .shortVideoInfo {
            display: none !important;
          }
          #videoDetailInformation .videoMainInfoContainer {
            border-top: none; padding-top: 0; {* 説明文のほうに枠線つけたのでいらなそう *}
          }
          #topVideoInfo .ch_prof, #topVideoInfo .userProfile {
            width: 314px; {* コメントパネルの直線上と合わせる *}
            min-height: 77px;
            border-radius: 4px;
          }
          #topVideoInfo .ch_prof .symbol img, #topVideoInfo .userProfile .usericon{
            width: 64px; height: 64px; margin-top: 5px;
          }
          .userProfile .userIconContainer {
            width: 72px;
          }
          .userProfile .profile {
            width: 242px; margin-top: 5px;
          }
          #topVideoInfo .parentVideoInfo {
            width: 314px;
            border-radius: 4px;
          }
          body.channel .ch_prof .info {
            padding-left: 74px;
          }
          {* ソーシャル関連リンクをコメントパネル幅に合わせる *}
          ul.socialLinks li.socialLinkTwitter  { width: 108px; }
          ul.socialLinks li.socialLinkGoogle   { width:  63px; }
          ul.socialLinks li.socialLinkFacebook { width: 106px; }


          #content #topVideoInfo .videoMainInfoContainer{
            padding: 0;
          }
          #content #videoDetailInformation{
            border-top: 0;
            margin-bottom: -12px;
          }
          #content .videoInformation{
            margin: -4px 0;
          }
          #content #topVideoInfo .videoStats {
            margin: 4px 0 0;
          }
          #content #topVideoInfo .videoInfoLeft {
            margin: 4px 0 -10px;
          }

          body:not(.videoExplorer) #videoExplorerExpand { display: none; }
          body:not(.full_with_browser):not(.videoExplorer) #content:not(.s_showPlaylist) #playlist{
            position: absolute; top: -9999px;
          }
          body:not(.full_with_browser):not(.videoExplorer) #playlist {
            margin: -10px auto 0; width: 1008px;
          }
          body:not(.full_with_browser):not(.videoExplorer).size_normal #playlist {
            width: 1234px;
          }
          #videoHeaderMenu .searchContainer { margin-top: 1px; }

          #outline .sidebar {
            float: none !important;
            width: auto !important;
            position: relative !important;
            clear: both !important;
            height: 256px;
          }
          #outline .sidebar>div:not(#playerBottomAd):not(#videoReviewBottomAd) {
            display: none;
          }
          #outline #playerBottomAd, #outline #videoReviewBottomAd {
            position: absolute !important;

            overflow: hidden;
            width: 300px !important; height: 256px !important;
            top:    auto !important;
            bottom:    0 !important;
            margin: 0 !important;
          }
          #outline #playerBottomAd {
            left:  0    !important;
            right: auto !important;
          }
          #outline #videoReviewBottomAd {
            left:  auto !important;
            right:    0 !important;
          }


          {* 背景色 *}
          body { background: #f4f4f4; transition: background 1s ease 1s; }
          #outline { background: none !important; }
          body.Shinjuku,body.Shinjuku { background: #fff; } {* Ginza Grayから真のHarajuku Whiteへの回帰 *}
          body #playerContainerWrapper { background: none; }

          {* 下半身いっぱいを市場表示 *}
                           #outline .main                   { width: 1008px; }
                           #outline #ichibaMain             { width: 1008px; margin: auto; text-align: center;}
                           #outline .outer                  { width: 1008px; }
          body.size_normal #outline .main                   { width: 1234px; }
          body.size_normal #outline #ichibaMain             { width: 1234px; margin: auto;}
          body.size_normal #outline .outer                  { width: 1234px; }
          body #ichibaMain dl {
            height: 380px; overflow: hidden;
            display: inline-block; float: none;
            text-align: left;
            vertical-align: top;
          }
          #ichibaMain #ichibaMainFooter .commandArea2 {
            display: none; {* 変な位置に表示されてみっともないので *}
          }
          body.size_medium #ichibaMain dl {
            margin:0  9px 30px;
          }
          body.size_normal #ichibaMain dl {
            margin:0 10px 30px;
          }
          body #ichibaMain dt {
            height: 60px;
          }
          #outline #ichibaMain .rowJustify { display: none; }
          #outline #ichibaMain #ichibaMainFooter {
            clear: both;
          }

          #footer { z-index: 1;}

          {* テレビちゃんメニュー スライドをやめる *}
          body #videoHeader #videoMenuWrapper{
            position: absolute; width: 324px; height: auto !important;
            opacity: 0;
            transition: opacity 0.4s ease;
            right: 0px;
          }
          body #videoHeader.menuOpened #videoMenuWrapper{
            z-index: 1000 !important;
            border: 1px solid #000;
            background: white;
            box-shadow: 0px 0px 4px #000;
            top: 98px;
            bottom: auto;
            opacity: 1;
          }
          body #videoHeader.infoActive.menuOpened #videoMenuWrapper{
            top: auto;
            bottom: 48px;
          }
          body #videoHeader #videoMenuWrapper .defmylistButton, body #videoHeader #videoMenuWrapper .mylistButton {
            display: none !important;
          }
          body #videoHeader #videoMenuTopList{
            position: relative;
            width: auto;
          }
          body #videoHeader.menuOpened #videoMenuWrapper .videoMenuList{
            display: inline-block;
            width: 60px;
          }
          body #videoHeader.menuOpened .videoShareLinks .socialLinkFacebook{
            position: fixed; top: -9999px;
            visibility: hidden; pointer-events: none !important;
          }

          {* テレビちゃんメニューのスライド殺す *}
          body #videoHeader.menuOpened #videoMenuWrapper {
            margin-bottom: 0;
          }
          body #videoHeader.menuOpened #videoHeaderDetail {
            margin-top: 0px;
          }

          body.Shinjuku:not(.videoExplorer):not(.setting_panel):not(.full_with_browser)    #content.noNews              #playerTabWrapper {
            height: auto !important; position: absolute;
          }
          body.size_medium:not(.videoExplorer):not(.setting_panel):not(.full_with_browser) #content.noNews              #playerTabWrapper {
            bottom: 0px;
          }
          body.size_medium:not(.videoExplorer):not(.setting_panel):not(.full_with_browser) #content.noNews .appli_panel #playerTabWrapper {
            bottom:  19px;
          }
          body.size_normal:not(.videoExplorer):not(.setting_panel):not(.full_with_browser) #content.noNews              #playerTabWrapper {
            bottom: 0px;
          }
          body.size_normal:not(.videoExplorer):not(.setting_panel):not(.full_with_browser) #content.noNews .appli_panel #playerTabWrapper {
            bottom: 18px;
          }
          body.size_medium:not(.videoExplorer):not(.setting_panel):not(.full_with_browser) #content.noNews #playerAlignmentArea              #playerTabContainer {
            bottom: 0px;
          }
          body.size_medium:not(.videoExplorer):not(.setting_panel):not(.full_with_browser) #content.noNews #playerAlignmentArea .appli_panel #playerTabContainer {
            bottom: 19px;
          }
          body.size_normal:not(.videoExplorer):not(.setting_panel):not(.full_with_browser) #content.noNews #playerAlignmentArea              #playerTabContainer {
            bottom:  0px;
          }
          body.size_normal:not(.videoExplorer):not(.setting_panel):not(.full_with_browser) #content.noNews #playerAlignmentArea .appli_panel #playerTabContainer {
            bottom: 19px;
          }

          #playerTabWrapper.w_videoInfo #playerTabContainer, #playerTabWrapper.w_ichiba #playerTabContainer, #playerTabWrapper.w_review #playerTabContainer {
            bottom: 0px !important;
          }
          body:not(.videoExplorer):not(.setting_panel):not(.full_with_browser) #content.noNews #playerTabWrapper.w_videoInfo,
          body:not(.videoExplorer):not(.setting_panel):not(.full_with_browser) #content.noNews #playerTabWrapper.w_ichiba,
          body:not(.videoExplorer):not(.setting_panel):not(.full_with_browser) #content.noNews #playerTabWrapper.w_review
          {
            height: auto !important; position: absolute; bottom: 2px;
          }
          body:not(.videoExplorer):not(.setting_panel):not(.full_with_browser) #content.noNews #playerCommentPanel {
            height: 100% !important;
          }
          body:not(.videoExplorer):not(.setting_panel):not(.full_with_browser) #content.noNews #playerContainer.appli_panel #appliPanel {
            bottom: -18px !important;
          }
          body:not(.videoExplorer):not(.setting_panel):not(.full_with_browser) #content.noNews #playerContainer {
            height: auto;
          }

          .Shinjuku .quickMylistFrame {
            position: absolute;
            bottom: 13px;
            top: auto;
            left: auto;
            right: 44px;
            width: 150px;
            height: 21px;
            border: 1px solid #ccc;
            background: #e7e7e7;
            border-radius: 4px;
            padding: 8px 4px;
          }
          .Shinjuku .quickMylistFrame:hover {
          }

          {* プレイリスト・タグ入り全画面の時に消すの忘れてた。 けどやっぱり便利そうなので残す事にした。 *}
          body.full_with_browser.Shinjuku:not(.full_and_mini) .quickMylistFrame{
            top: 0; right: 0; padding: 4px 4px;
          }

          #videoInfo, #videoReview {
            display: none !important;
          }

          body:not(.videoExplorer):not(.full_with_browser).Shinjuku #playerAlignmentArea .playerBottomButton {
            display: block;
          }

          #playerAlignmentArea .playerBottomButton {
            position: absolute;
            bottom: -20px;
            height: 28px;
            border: 1px outset #888;
            border-radius: 0 0 8px 8px;
            cursor: pointer;
            color: #333;
            transition: box-shadow 0.4s ease-out;
            background: #fff;
          }
          #playerAlignmentArea .playerBottomButton:hover {
            box-shadow: 1px 1px 1px #888;
            bottom: -25px;
          }
          #content.s_showPlaylist #playerAlignmentArea .playerBottomButton {
            bottom: -185px;
          }
          #content.s_showPlaylist #playerAlignmentArea .playerBottomButton:hover {
            bottom: -190px;
          }

          #playerAlignmentArea .playerBottomButton:after {
            content: ' ▼';
          }
          #content.s_showPlaylist #playerAlignmentArea .togglePlaylist:after {
            content: ' ▲';
          }

          #playerAlignmentArea .openVideoExplorer {
            left: 120px;
            width: 64px;
          }
          #playerAlignmentArea .togglePlaylist {
            left: 0px;
            width: 120px;
          }
          #playerAlignmentArea .toggleSetting {
            left: auto;
            right: 0px;
            width: 64px;
          }

          #wallImageContainer, #content.w_flat_white #wallImageContainer,
          #chipWallList,       #content.w_flat_white #chipWallList  {
          }
          {* なんで左に移動するのか？ それは、このアイコンのせいで横スクロールバーが出るのが嫌だから *}
          #content #chipWallList {
            right: auto; left: -42px;
          }
          {* Harajuku Whiteって言ってるけどどう見てもGinza Gray です。 *}
          .wallAlignmentArea img[src$="harajuku_white.png"], #wallImageContainer div[style*="harajuku_white.png"] {
            display: none !important;
          }
          .wallAlignmentArea.image2 {
            display: none !important;
          }
          body:not(.videoExplorer):not(.full_with_browser) #content #playerContainer.oldTypeCommentInput.controll_panel {
            min-height: 461px;
          }
          body #wallImageContainer {
            bottom: 10px;
            top: 10px;
            height: auto;
          }

          #videoHeader .videoCounter {
            position: absolute;
            right: 208px; bottom: 11px;
            width: 116px;
            font-size: 10px;
            line-height: 130%;
          }
          body:not(.videoExplorer):not(.full_with_browser).Shinjuku #videoHeader .videoCounter {
            display: block;
          }
          #videoHeader .videoCounter li span {
            font-weight: bolder; float: right;
            transition: color 1s ease;
          }
          #videoHeader .videoCounter li span.update {
            color: #888;
            transition: none;
          }

          .videoDescription .otherSite {
            font-weight: bolder;
          }


          {* 動画選択画面のサムネを4:3にする *}
          body.videoExplorer #videoExplorer.squareThumbnail .column4 .item {
            text-align: center;
          }

          body.videoExplorer #videoExplorer.squareThumbnail .item .thumbnailContainer,
          body.videoExplorer #videoExplorer.squareThumbnail .item .thumbnailContainer .link {
            width: 130px; height: 100px;
            background-color: transparent !important;
          }
          body.videoExplorer #videoExplorer.squareThumbnail .item .thumbnailContainer {
            padding: 0 15px;
          }
          body.videoExplorer #videoExplorer.squareThumbnail .item .thumbnailContainer .thumbnail {
            max-width: 130px; height: auto; top: 0; left: 0
          }
          body.videoExplorer #videoExplorer.squareThumbnail .item .thumbnailContainer img.playingIcon {
            top: 50%; left: 50%;
          }

          body.videoExplorer #videoExplorer.squareThumbnail .uadFrame {
            width: 130px; height: 100px;
            background-size: 100% 100%;
          }

          .squareThumbnail .uadTagRelated .default .itemList .item .imageContainer {
            width: 130px; height: 100px;
          }

          .squareThumbnail .uadTagRelated .default .itemList .item .imageContainer .videoTitleContainer {
            width: 130px;
            text-align: center;
          }
          #videoExplorer.squareThumbnail .uadTagRelated {
            margin-bottom: 30px;
          }

          .squareThumbnail .uadTagRelated .default .itemList .item .imageContainer .itemImageWrapper .itemImage {
            width: 130px; height: auto; top: 0; left: 0;
          }
          .squareThumbnail .uadTagRelated .default .itemList .item .imageContainer .itemImageWrapper {
            width: 130px; height: 100px;
          }
          .uadTagRelated .emptyItem .emptyMessageContainer {
            width: 130px; height: 100px;
          }
          .videoExplorerBody .videoExplorerContent .contentItemList .item .thumbnailContainer .nextPlayButton,
          .videoExplorerBody .videoExplorerContent .suggestVideo    .item .thumbnailContainer .nextPlayButton {
            right: 17px;
            transition: transform 0.1s ease; -webkit-transition: -webkit-transform 0.1s ease;
          }
          .nextPlayButton {
            transform: scale(1.5); -webkit-transform: scale(1.5);
          }
          .sideVideoInfo .nextPlayButton:hover {
            -webkit-transform: scale(1.5); transform: scale(1.5);
          }
          .nextPlayButton:active, .sideVideoInfo .nextPlayButton:active {
            -webkit-transform: scale(1.2); transform: scale(1.2);
          }
          .videoExplorerBody .videoExplorerContent .contentItemList .item .column1 .createdTime {
            padding-left: 15px;
          }

          {* ポイントが無いときは表示しない *}
          .item:not(.silver):not(.gold) .uadContainer {
            display: none !important;
          }

          #nicoSpotAd>button, #content.panel_ads_shown #leftPanelAd>button{
             transform: scale(1.5); -webkit-transform: scale(1.5);
          }


          {* 動画選択画面のセンタリング *}
          body.videoExplorer #bottomContentTabContainer {
            width: 1008px;
            margin: auto;
          }
          body.size_small.no_setting_panel.videoExplorer #playlist {
            width: 708px;
            margin: auto;
            box-shadow: none;
          }
          body.size_small.no_setting_panel.videoExplorer.content-fix #playlist{
            min-width: 708px;
          }
          body.size_small.no_setting_panel.videoExplorer #playerContainerWrapper{
            right: calc(50% + 204px);
            left: auto;
            box-shadow: none;
          }
          .videoExplorerContent {
            padding: 20px 4px 20px 8px;
          }

          #videoHeaderMenu .searchContainer {
            padding: 0 0 0 5px;
            right: 0;
          }
          .searchContainer .searchText a {
            border-radius: 4px 0 0 4px;
          }
          .searchContainer .searchText button {
            border-radius: 0 4px 4px 0;
          }


          .item.thumbnailLoadSuccess .noImage, #videoExplorer.squareThumbnail .item .thumbnail {
            display: none !important;
          }
          #videoExplorer .thumbnailContainer {
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center center;
          }
          #videoExplorer .item .thumbnailContainer {
            width: 130px; height: 100px;
          }

          #videoExplorer .uadFrame {
            width: 130px; height: 100px;
            background-size: 100% 100%;
          }
          #videoExplorer .uadTagRelated .default .itemList .item .imageContainer {
            width: 130px; height: 100px;
          }


          {* たまに初期化中に縦にびろーんとなってる犯人がfacebookアイコン *}
          body:not(.Shinjuku) #videoHeader .videoShareLinks .socialLinkFacebook{
            position: fixed; top: -9999px; overflow: hidden;
          }


        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/\{\*/g, '/*').replace(/\*\}/g, '*/');

        this.addStyle(__common_css__);
        if (this.config.get('applyCss') && !this.config.get('osusumeOnly')) {
          this.addStyle(__css__);
        }
      },
      initializeUserConfig: function() {
        var prefix = 'Shinjuku_';
        var conf = {
          noNews: true,
          noNicoru: true,
          dblclickAutoScroll: true,
          autoScroll: true,
          hideControlInFull: true,
          autoClearPlaylist: true,
          autoLoadRelatedVideo: false,
          hideCommentPanelSocialButtons: true,
          forceOldTypeControlPanel: true,
          commentVisible: true,
          osusumeOnly: false,
          applyCss: true,
          autoResizePlayer: false
        };
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
      initializeTag: function() {
        // タグ自動更新キャンセラー
        window.WatchApp.ns.model.player.NicoPlayerConnector.onTagDataReceived = function() {};

        // タグ領域のピン留め
        window.WatchApp.ns.init.TagInitializer.tagViewController.tagViewPinStatus.changeStatus(true);

       //  var $a = $('.toggleTagEditInner a').detach();
       //  $('.toggleTagEditInner').empty().append($a);
      },
      initializeNicoru: function() {
        if (this.config.get('noNicoru')) {
          // ニコる数を取得するためにコメントパネルがめちゃくちゃ重くなってるのを改善 (Chromeだとあまり変わらない)
          window.WatchApp.ns.model.player.NicoPlayerConnector.getCommentNicoruCount = function() { return 0; };
          $('body').addClass('noNicoru');
        }
      },
      initializeVideoExplorer: function() {
        var self = this;
        var explorer   = window.WatchApp.ns.init.VideoExplorerInitializer.videoExplorer;
        var controller = window.WatchApp.ns.init.VideoExplorerInitializer.videoExplorerController;
        var isSearchMode = function() {
          return explorer.isOpen();
        };

        controller.showDeflist_org         = controller.showDeflist;
        controller.showMylist_org          = controller.showMylist;
        controller.showOtherUserVideos_org = controller.showOtherUserVideos;
        controller.showOwnerVideo_org      = controller.showOwnerVideo;
        controller.searchVideo_org         = controller.searchVideo;
        controller.showDeflist = $.proxy(function() {
          if (!isSearchMode()) {
            location.href = "/my/mylist";
            return;
          }
          this.showDeflist_org();
        }, controller);
        controller.showMylist = $.proxy(function(id) {
          if (!isSearchMode()) {
            location.href = "/mylist/" + id;
            return;
          }
          this.showMylist_org(id);
        }, controller);
        controller.showOtherUserVideos = $.proxy(function(id, name) {
          if (!isSearchMode()) {
            location.href = "/user/" + id;
            return;
          }
          this.showOtherUserVideos_org(id, name);
        }, controller);
        controller.showOwnerVideo = $.proxy(function() {
          if (!isSearchMode()) {
            location.href = "/user/" + self._watchInfoModel.uploaderInfo.id;
            return;
          }
          this.showOwnerVideo_org();
        }, controller);
        controller.searchVideo = $.proxy(function(word, type) {
          if (!isSearchMode()) {
            location.href = (type === 'tag' ? 'tag' : 'search') + "/" + encodeURIComponent(word);
            return;
          }
          this.searchVideo_org(word, type);
        }, controller);


        // 動画表示のテンプレート拡張
        var $template = $('<div/>').html(window.WatchApp.ns.init.VideoExplorerInitializer.videoExplorerView._contentListView._$view.find('.videoItemTemplate').html());
        $template.find('.column1')
           .find('.descriptionShort').after($('<p class="itemMylistComment mylistComment"/>'))
        window.WatchApp.ns.init.VideoExplorerInitializer.videoExplorerView._contentListView._$view.find('.videoItemTemplate').html($template.html());
        $template = null;

        // 動画情報表示処理の拡張
        var ItemView = window.WatchApp.ns.components.videoexplorer.view.content.item.AbstractVideoContentItemView;
        ItemView.prototype.update_org = ItemView.prototype.update;
        ItemView.prototype.update = function() {
          var item = this._item, $item = this._$item;
          this.update_org(item);

          // 動画情報表示をゴリゴリいじる場所
          if (item._mylistComment) { // マイリストコメント
            $item.find('.itemMylistComment').css({display: 'block'});
          }

          this._$item.find('.thumbnailContainer')
            .css('background-image', 'url(' + this._$thumbnail.attr('src') + ')');


        };
        ItemView = null;
        $('#videoExplorer').addClass('squareThumbnail');



        var $openVideoExplorer = $('<button class="openVideoExplorer playerBottomButton">検索</botton>');
        $openVideoExplorer.on('click', function(e) {
          e.stopPropagation(); e.preventDefault();
          WatchApp.ns.init.VideoExplorerInitializer.expandButtonView.open();
          //explorer.openByCurrentCondition();
        });
        $('#playerAlignmentArea').append($openVideoExplorer);
        $openVideoExplorer = null;
      },
      initializePlayerTab: function() {
        var tab = window.WatchApp.ns.init.PlayerInitializer.playerTab;
        tab.reload = $.proxy(function() {
          this.$contents = this.$items = null;
          this._getTabItems().off('click').on('click', $.proxy(this._onClickTabItem, this));
        }, tab);

        (function() {
          var $playerTab = $('#playerTabContainer').addClass('osusumeTab');
          var $tabHeader = $('<th data-nico-tab-target="osusume" class="playerTabItem osusume">オススメ</th>');
          var $tabBody   = $('<div id="osusumePanelContainer" class="playerTabContentItem osusume"></div>');

          $playerTab.find('.playerTabHeader tr').append($tabHeader);
          $playerTab.find('.playerTabContent').append($tabBody);

          tab.reload();
        })();
      },
      initializeOsusume: function() {

        // 動画が切り替わるたびに関連動画(オススメ)をリロードする
        // でもYouTubeみたいに中身が全部入れ替わる方式だと「他に見たい奴もあったのに」を回収できなくて嫌
        // なので、n件までたまっていく方式にする
        var template = [
          '<li class="%class%">',
            '<a href="%protocol%//%host%/watch/%videoId%" class="thumbnail"><img src="%thumbnail%"></a>',
            '%posted%',
            '<a href="%protocol%//%host%/watch/%videoId%" class="title">%title%</a>',
            '<div class="nextPlayButton" title="次に再生" onclick="WatchItLater.WatchController.insertVideoToPlaylist(\'%videoId%\')">次に再生</div>',
            '<p>再: <span class="count">%view%</span>',
            'コメ: <span class="count">%num_res%</span>',
            'マイ: <span class="count">%mylist%</span></p>',
          '</li>',
        ''].join('');
        var relatedVideo   = new window.Shinjuku.ns.loader.RelatedVideo({});
        var watchInfoModel = this._watchInfoModel;
        var MAX_ITEMS = 100;

        template = template
          .split('%protocol%').join(location.protocol)
          .split('%host%').join(location.host);

        var osusumeController = this.osusumeController = {
          items: [],
          $container: $('<div class="osusumeContainer" />'),
          initialize: function() {
            $('#nicommentPanelContainer, #osusumePanelContainer').prepend(this.$container);
            this.$container.on('dblclick', function() {
              $(this).animate({scrollTop: 0}, 400);
            }).on('scroll', function() {
              if (window.WatchItLater && window.WatchItLater.popup) {
                window.WatchItLater.popup.hidePopup();
              }
            });
          },
          add: function(item) {
            item.baseId = watchInfoModel.v; // どの動画の関連だったか
            this.items.unshift(item);
            this.items.length = Math.min(this.items.length, 150);
          },
          addPlaylistItem: function(item) {
            if (!item._hasData) return;
            this.add({
              id:             item.id,
              first_retrieve: item.firstRetrieve,
              thumbnail_url:  item.thumbnailUrl,
              num_res:        item.numRes,
              mylist_counter: item.mylistCounter,
              view_counter:   item.viewCounter,
              title:          item.title
            });
          },
          clear: function() {
            this.items.length = 0;
          },
          refresh: function() {
            var uniq = {}, count = 0, items = this.items;
            var watchId = watchInfoModel.v;

            var view = ['<ul>'];
            for (var i = 0, len = items.length; i < len; i++) {
              var item = items[i], id = item.id;

              if (uniq[id] || watchId === id) continue;
              uniq[id] = true;
              if (++count > MAX_ITEMS) break;
              var itemView = template
                .split('%videoId%')  .join(item.id)
                .split('%thumbnail%').join(item.thumbnail_url)
                .split('%view%')     .join(item.view_counter)
                .split('%num_res%')  .join(item.num_res)
                .split('%mylist%')   .join(item.mylist_counter)
                .split('%title%')    .join(item.title)
                .split('%posted%')   .join(
                    typeof item.first_retrieve === 'string' ?
                      '<span class="posted">' + item.first_retrieve.replace(/(\d+)-/g, '$1/') + ' 投稿</span>' :
                      ''
                )
                .split('%class%')    .join(item.baseId === watchId ? 'currentVideoRelated' : 'otherVideoRelated');
              view.push(itemView);
            }
            view.push('</ul>');

            this.$container
              .html(view.join(''))
              .scrollTop(0)
              .toggleClass('withWatchItLater', typeof window.WatchItLater === 'object')
              .on('click', '.thumbnail img', function(e) {
                if (!window.WatchItLater) { return; }
                if (!e.target.src) { return; }
                e.preventDefault();
                e.stopPropagation();
                WatchItLater.WatchController.showLargeThumbnail(e.target.src);
              })
              .find('.otherVideoRelated:first')
              .addClass('first')
              .before($('<li class="previousOsusume">前の動画のオススメ</li>'));
          }
        };

        osusumeController.initialize();

        var update = function() {
          relatedVideo.load(watchInfoModel.v).then(function(result) {
            var items = result.list;
            for (var i = items.length - 1; i >= 0; i--) {
              if (items[i].type === 0 /* video */) osusumeController.add(items[i]);
            }
            osusumeController.refresh();
          }, function() {
            osusumeController.refresh();
          });
        };

        // 再生開始時にタブがコメントに変わるのはザッピングに邪魔なので切る
        try {
          window.WatchApp.ns.init.PlayerInitializer.playerTab.playerAreaConnector.removeEventListener(
            'onVideoStarted',
            window.WatchApp.ns.init.PlayerInitializer.playerTab._onVideoStarted);
          window.WatchApp.ns.init.PlayerInitializer.playerTab.playerAreaConnector.removeEventListener(
            'onVideoEnded',
            window.WatchApp.ns.init.PlayerInitializer.playerTab._onVideoEnded);
        } catch (e) {
          console.log('仕様変わった? ', e);
        }


        this._playerAreaConnector.addEventListener('onFirstVideoInitialized', $.proxy(function() {
          if (this.config.get('autoLoadRelatedVideo') || this._isOsusumeOnly) {
            update();
          }
          watchInfoModel.addEventListener('reset', function() {
            update();
          });
        }, this));
      },
      initializePlaylist: function() {
        this.playlistController = {
          _playlist: window.WatchApp.ns.init.PlaylistInitializer.playlist,
          isContinuous: function() { // 連続再生中か？
            return this._playlist.isContinuous();
          },
          toggle: function(v) {
            if (typeof v === 'boolean') {
              $('#content').toggleClass('s_showPlaylist', v);
            } else {
              $('#content').toggleClass('s_showPlaylist');
            }
          },
          getItems: function() {
            return this._playlist.currentItems.concat();
          },
          clear: function() {
            var x = this.getItems(), items = [], i, currentItem = null;
            for (i = 0; i < x.length; i++) {
              if (x[i]._isPlaying) {
                currentItem = x[i];
                items.unshift(x[i]);
              }
            }
            this.setItems(items, currentItem);
          },
          setItems: function(items, currentItem) {
            var playlist = this._playlist;
            playlist.reset(
              items,
              'Shinjuku',
              playlist.type,
              playlist.option
            );
            if (currentItem) { playlist.playingItem = currentItem; }
            else { playlist.playingItem = items[0]; }
          }
        };

        var items = this.playlistController.getItems();

        //if (location.href.indexOf('mylist_mode=playlist') >= 0) { // 本家の仕様変更でこの判別ができなくなった
        try {
          if (this.playlistController.isContinuous()) {
            // マイリストページなどから「連続再生」で飛んできた場合はプレイリストを消さない
            this.playlistController.toggle(true);
          } else {
            // プレイリストを空にする事で、プレーヤー上の「次の動画」「前の動画」ボタンを無効化して誤爆を防ぐことができる
            if (this.config.get('autoClearPlaylist')) {
              this.playlistController.clear();
            }
          }
        } catch (e) {
          console.log('本家の仕様変わったかも');
        }

        // 通信回数を減らすため、
        // 動画ページを開いた初回だけはrelatedVideoAPIではなく、プレイリストにあった動画をオススメにつっこむ。
        // 投稿日時が取得できないのが難点
        if (items.length > 0) {
          for (var i = items.length - 1; i >= 0; i--) {
            this.osusumeController.addPlaylistItem(items[i]);
          }
          this.osusumeController.refresh();
        }

        var $togglePlaylist = $('<button class="togglePlaylist playerBottomButton">プレイリスト</botton>');
        $togglePlaylist.on('click', $.proxy(function(e) {
          e.stopPropagation(); e.preventDefault();
          this.playlistController.toggle();
        }, this));
        $('#playerAlignmentArea').append($togglePlaylist);
        $togglePlaylist = null;

      },
      initializeIchiba: function() {
      },
      initializeScroll: function() {
        // プレーヤーの位置に自動スクロール
        var scrollToPlayer = function() {
          var $body = $('body'), isContentFix = $body.hasClass('content-fix');
          $body.removeClass('content-fix').addClass('w_noHover');
          var $pc = $('#playerContainer'), $vt = $('#videoTagContainer');
          var h = $pc.outerHeight() + $vt.outerHeight();
          var innerHeight = $(window).height();

          if (innerHeight > h  + 200 && !$body.hasClass('videoExplorer')) {
          // 縦幅に余裕がある時はプレーヤーが画面中央に来るように
            var top = Math.max(($vt.offset().top + h / 2) - innerHeight / 2, 0);

            $('body, html').animate({scrollTop: top}, 400);
          } else {
            // 縦解像度がタグ+プレイヤーより大きいならタグの開始位置、そうでないならプレイヤーの位置にスクロール
            // ただし、該当部分が画面内に納まっている場合は、勝手にスクロールするとかえってうざいのでなにもしない
            var topElement = innerHeight >= h ? '#videoTagContainer, #playerContainer' : '#playerContainer';
            WatchApp.ns.util.WindowUtil.scrollFitMinimum(topElement, 400);
          }

          $(window).scrollLeft(0);
          $body.toggleClass('content-fix', isContentFix);
          setTimeout(function() {
            $body.removeClass('w_noHover');
          }, 600);
        };
        this.scrollToPlayer = scrollToPlayer;

        this._playerAreaConnector.addEventListener('onFirstVideoInitialized', $.proxy(function() {
          if (!$('#videoHeader').hasClass('infoActive')) {
            // ヘッダを閉じてる時はなにもしない
            return;
          }
          if (this.config.get('autoScroll')) {
            scrollToPlayer();
          }
        }, this));

        $('html').on('dblclick', $.proxy(function(e) {
          if (!this.config.get('dblclickAutoScroll')) return;
          var $target = $(e.target);
          if ($target.hasClass('videoDescription')) return;
          scrollToPlayer();
        }, this));

        // CSS忍者より。スクロール中にマウスイベントを無効化することで動作を軽くするらしい。
        // しかし、 Firefox等では「画面内にFlashPlayerが見えているか」のほうがスクロールの重さを左右するっぽくて、
        // GINZAではあまり効果が感じられない。(ということは、動画選択画面で再生だけ止めてもあんまり軽くならない？)
        // 副作用として、スクロール中の誤クリックでリンクを踏んでしまうのを抑止する効果も得られる
        (function() {
          var $body = $('body');
          var hoverRestore = function() {
            $body.removeClass('w_noHover');
          };
          var onScroll = function() {
            if (!$body.hasClass('w_noHover')) {
              $body.addClass('w_noHover');
            }
          };

          $(document)
            .on('scroll', onScroll)
            .on('scroll', window._.debounce(hoverRestore, 500));
        })();

        (function(watchInfoModel) {
          // 動画切り換え時にページの一番上までスクロールするようになったのを強引に阻止する
          // TODO: 動画プレイヤー位置の保持
         window.WatchApp.ns.model.state.WatchPageRouter.getInstance()._scroll = function() {};

         var beforePlayerOffsetTop = 0, $playerAlignmentArea = $('#playerAlignmentArea');
         var beforeReset = function() {
            beforePlayerOffsetTop = $playerAlignmentArea.offset().top;
         };
         var afterReset = function() {
           var diff = $playerAlignmentArea.offset().top - beforePlayerOffsetTop;
           var scrollTop = $(window).scrollTop();
           $(window).scrollTop(scrollTop + diff);
         };

         // プレイヤーが画面に入るまで自動再生されなくなったのに対抗
         window.WatchApp.ns.util.WindowUtil.checkInview = function() { return true; };

         watchInfoModel.addEventListener('beforeReset', beforeReset);
         watchInfoModel.addEventListener('afterReset',  afterReset);
        })(this._watchInfoModel);


      },
      initializeQuickMylistFrame: function() {
        // ニコニコ動画(RC2) までプレイヤーの右上にあったマイリストメニューを復活させる
        // 昔はマイリスト登録が1クリックだったのにどうしてこうなった？

        var $iframe = $('<iframe class="quickMylistFrame" />'), watchInfoModel = this._watchInfoModel;

        var update = function() {
          $iframe.addClass('updating');
          var videoId = watchInfoModel.v;
          $iframe[0].contentWindow.location.replace("/mylist_add/video/" + videoId);
        };

        var isFirst = true;

        $iframe.load(function() {
          window.setTimeout(function() {
            $iframe.addClass('updating').removeClass('updating');
            var ua = window.navigator.userAgent.toLowerCase();
            // TODO: Mac版Chromeで初回だけ表示されない(あるのに見えない)問題の確実な直し方を調査
            if (isFirst && ua.indexOf('mac') >= 0 && ua.indexOf('chrome') >= 0) {
              //console.log('Mac chrome...');
              window.setTimeout(function() { $iframe.hide(); },  1000);
              window.setTimeout(function() { $iframe.show(); }, 10000);
            }
            isFirst = false;
          }, 500);
        });

        $iframe.css({position: 'fixed', top: '-9999px', bottom: 'auto'});
        $('#videoHeader').append($iframe);
        update();

        this._playerAreaConnector.addEventListener('onFirstVideoInitialized', $.proxy(function() {
          $iframe.css({position: '', top: '', bottom: ''});
          watchInfoModel.addEventListener('reset', function() {
            update();
          });
        }, this));
      },
      initializeVideoCounter: function() {
        var watchInfoModel      = this._watchInfoModel;
        var playerAreaConnector = this._playerAreaConnector;
        var addComma            = window.WatchApp.ns.util.StringUtil.addComma;
        var counter             = {viewCount: 0, commentCount: 0, mylistCount: 0};
        var $videoCounter = $([
            '<div class="videoCounter">',
              '<ul>',
                '<li class="view">再生:         <span class="viewCount"   ></span></li>',
                '<li class="comment">コメント:  <span class="commentCount"></span></li>',
                '<li class="mylist">マイリスト: <span class="mylistCount" ></span></li>',
              '</ul>',
            '</div>'
          ].join(''));

        var update = function(counter) {
          $videoCounter
            .find('.viewCount'   ).text(addComma(counter.viewCount   )).end()
            .find('.commentCount').text(addComma(counter.commentCount)).end()
            .find('.mylistCount' ).text(addComma(counter.mylistCount ));
        };
        var blink = function(target) {
          var $target = $videoCounter.find(target).addClass('update');
          window.setTimeout(function() {
            $target.removeClass('update');
          }, 100);
        };

        update(watchInfoModel);

        $('.quickMylistFrame').before($videoCounter);

        watchInfoModel.addEventListener('reset', function() {
          counter.viewCount    = watchInfoModel.viewCount;
          counter.commentCount = watchInfoModel.commentCount;
          counter.mylistCount  = watchInfoModel.mylistCount;
          update(counter);
        });
        playerAreaConnector.addEventListener('onWatchCountUpdated', function(c) {
          var diff = c - counter.viewCount;
          if (diff === 0) return;
          counter.viewCount    = c;
          update(counter);
          blink('.viewCount');
        });
        playerAreaConnector.addEventListener('onCommentCountUpdated', function(c) {
          var diff = c - counter.commentCount;
          if (diff === 0) return;
          counter.commentCount = c;
          update(counter);
          blink('.commentCount');
        });
        playerAreaConnector.addEventListener('onMylistCountUpdated', function(c) {
          var diff = c - counter.mylistCount;
          if (diff === 0) return;
          counter.mylistCount  = c;
          update(counter);
          blink('.mylistCount');
        });

      },
      initializeScreenMode: function() {
        var lastScreenMode = '', self = this, config = this.config;
        var npc = this._nicoPlayerConnector;

        var onScreenModeChange = function(sc) {
          var mode = sc.mode;
          if (mode === 'browserFull' && lastScreenMode !== mode) {
            // フル画面時プレイリストを閉じる
            $('#content').find('.browserFullPlaylistClose:visible').click();
            if (config.get('hideControlInFull')) {
              $('body').addClass('hideCommentInput');
              npc.playerConfig.set({oldTypeCommentInput: true, oldTypeControlPanel: false});
            }
          } else
          if (lastScreenMode === 'browserFull' && mode !== 'browserFull') {

            // ウォールのせい?でheightが当たったままになるバグから回復
            $('#playerContainerSlideArea').css({height: ''});
            if (config.get('hideControlInFull')) {
              $('body').removeClass('hideCommentInput');
              npc.playerConfig.set({oldTypeCommentInput: true, oldTypeControlPanel: true});
            }

            // 解除のたびにスクロール位置が一番上になってしまうので、いい感じの場所にする
            window.setTimeout(function() { self.scrollToPlayer(true); }, 200);

          }
          lastScreenMode = mode;
        };

        this._playerAreaConnector.addEventListener('onFirstVideoInitialized', $.proxy(function() {
          // フルスクリーンのまま別タブで開いたり、
          // フルスクリーンのままFlashPlayerが落ちたりすると操作パネルが動画上に行ったままになってしまうので戻す。
          // TODO: 自分で操作パネルを動画上に設定してる人を考慮するかどうか
          if (config.get('forceOldTypeControlPanel') == true) {
            npc.playerConfig.set({oldTypeCommentInput: true, oldTypeControlPanel: true});
          }
        }, this));
        window.WatchApp.ns.init.PlayerInitializer.playerScreenMode.addEventListener('change', onScreenModeChange);
      },
      initializeSettingPanel: function() {
        var $menu   = $('<li class="shinjukuSettingMenu"><a href="javascript:;" title="ShinjukuWatchの設定変更">Shinjuku設定</a></li>');
        var $panel  = $('<div id="shinjukuSettingPanel" />');//.addClass('open');
        var $button = $('<button class="toggleSetting playerBottomButton">設定</botton>');

        $button.on('click', function(e) {
          e.stopPropagation(); e.preventDefault();
          $panel.toggleClass('open');
        });

        var config = this.config;
        $menu.find('a').on('click', function() { $panel.toggleClass('open'); });

        var __tpl__ = (function() {/*
          <div class="panelHeader">
          <h1 class="windowTitle">ShinjukuWatchの設定</h1>
          <p>設定はリロード後に反映されます</p>
          <button class="close" title="閉じる">×</button>
          </div>
          <div class="panelInner">
            <div class="item" data-setting-name="autoScroll" data-menu-type="radio">
              <h3 class="itemTitle">自動で動画プレーヤーの位置にスクロール</h3>
              <label><input type="radio" value="true" >する</label>
              <label><input type="radio" value="false">しない</label>
            </div>
            <div class="item" data-setting-name="dblclickAutoScroll" data-menu-type="radio">
              <h3 class="itemTitle">背景ダブルクリックでプレーヤーの位置にスクロール</h3>
              <label><input type="radio" value="true" >する</label>
              <label><input type="radio" value="false">しない</label>
            </div>
            <div class="item" data-setting-name="autoResizePlayer" data-menu-type="radio">
              <h3 class="itemTitle">ウィンドウに合わせてプレイヤーサイズを大きくする</h3>
              <p>※ 中画面は変わりません。 ニコニコニュースは表示できなくなります。</p>
              <label><input type="radio" value="true" >する</label>
              <label><input type="radio" value="false">しない</label>
            </div>
            <div class="item" data-setting-name="hideControlInFull" data-menu-type="radio">
              <h3 class="itemTitle">ブラウザ全画面時にコメント入力欄と操作パネルを隠す</h3>
              <label><input type="radio" value="true" >する</label>
              <label><input type="radio" value="false">しない</label>
            </div>
            <div class="item" data-setting-name="noNews" data-menu-type="radio">
              <h3 class="itemTitle">ニコニコニュースを消す</h3>
              <label><input type="radio" value="true" >消す</label>
              <label><input type="radio" value="false">消さない</label>
            </div>
            <div class="item" data-setting-name="noNicoru" data-menu-type="radio">
              <h3 class="itemTitle">ニコるを消す</h3>
              <label><input type="radio" value="true" >消す</label>
              <label><input type="radio" value="false">消さない</label>
            </div>
            <div class="item" data-setting-name="hideCommentPanelSocialButtons" data-menu-type="radio">
              <h3 class="itemTitle">コメントパネルのソーシャルボタン</h3>
              <label><input type="radio" value="true" >消す</label>
              <label><input type="radio" value="false">消さない</label>
            </div>


            <div class="expert">
              <h2>上級者向け設定</h2>
            </div>
            <div class="item" data-setting-name="autoClearPlaylist" data-menu-type="radio">
              <h3 class="itemTitle">初回ロード時にプレイリストの中身を空にする</h3>
              <small>空にする事によって「前の動画」「次の動画」ボタンが無効になり、誤クリックしなくなります</small><br>
              <label><input type="radio" value="true" >する</label>
              <label><input type="radio" value="false">しない</label>
            </div>
            <div class="item" data-setting-name="autoLoadRelatedVideo" data-menu-type="radio">
              <h3 class="itemTitle">初回ロード時も常に関連動画をロードする</h3>
              <small>通信を減らすため、通常は「しない」のままが推奨です</small><br>
              <label><input type="radio" value="true" >する</label>
              <label><input type="radio" value="false">しない</label>
            </div>
            <div class="item" data-setting-name="forceOldTypeControlPanel" data-menu-type="radio">
              <h3 class="itemTitle">起動時に操作パネルの位置をリセットする</h3>
              <small>操作パネルを動画プレイヤー上に設定している場合はオフにしてください</small><br>
              <label><input type="radio" value="true" >する</label>
              <label><input type="radio" value="false">しない</label>
            </div>
            <div class="item" data-setting-name="osusumeOnly" data-menu-type="radio">
              <h3 class="itemTitle">オススメタブの機能だけを使う</h3>
              <small>他のスクリプトにオススメタブだけ欲しい場合など</small><br>
              <label><input type="radio" value="true" > する</label>
              <label><input type="radio" value="false"> しない</label>
            </div>
             <div class="item" data-setting-name="applyCss" data-menu-type="radio">
              <h3 class="itemTitle">ShinjukuWatch標準のCSSを使用する</h3>
              <small>他のuserstyleを使用する場合は「しない」を選択してください</small><br>
              <label><input type="radio" value="true" > する</label>
              <label><input type="radio" value="false"> しない</label>
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


        $('#playerAlignmentArea').append($button);
        $('#siteHeaderRightMenuFix').after($menu);
        $('body').append($panel);


      },
      initializeVideoDescription: function() {
        var onclick = function(e) {
          if (e.button !== 0 || e.metaKey || e.shiftKey || e.altKey || e.ctrlKey) return true;
          if (e.target.tagName !== 'A') return;

          var $target = $(e.target), text = $target.text();
          if (text.match(/^mylist\/(\d+)/)) {
            e.preventDefault(); e.stopPropagation();
            window.WatchApp.ns.init.VideoExplorerInitializer.videoExplorerController.showMylist(RegExp.$1);
          } else
          if ($target.hasClass('seekTime')) {
            e.preventDefault(); e.stopPropagation();
            var data = $target.attr('data-seekTime').split(":"), vpos = (data[0] * 60 + parseInt(data[1], 10)) * 1000;
            window.WatchApp.ns.init.PlayerInitializer.nicoPlayerConnector.seekVideo(vpos);
          }
        };
        // 動画説明文中のURLの自動リンク
        var update = $.proxy(function() {
          var html = this._watchInfoModel.description;
          if (this._watchInfoModel.isChannelVideo()) return; // チャンネル動画は自前でリンク貼ってるので何もしない
          var linkmatch = /<a.*?<\/a>/, links = [], n;
          html = html.split('<br />').join(' <br /> ');
          while ((n = linkmatch.exec(html)) !== null) {
            links.push(n);
            html = html.replace(n, ' <!----> ');
          }
          html = html.replace(/\((https?:\/\/[\x21-\x3b\x3d-\x7e]+)\)/gi, '( $1 )');
          html = html.replace(/(https?:\/\/[\x21-\x3b\x3d-\x7e]+)/gi, '<a href="$1" target="_blank" class="otherSite">$1</a>');
          for (var i = 0, len = links.length; i < len; i++) {
            html = html.replace(' <!----> ', links[i]);
          }
          html = html.split(' <br /> ').join('<br />');
          var $desc = $('<div>' +  html + '</div>').on('click', onclick);
          $('#topVideoInfo .videoDescription').empty().append($desc);
          $('#videoInfo    .videoDescription').empty().append($desc.clone(true));

        }, this);
        var up = function() { window.setTimeout(function() { update(); }, 1000); };

        up();

        this._watchInfoModel.addEventListener('reset', up);
      },
      initializeCommentVisibility: function() {
        var nicoPlayer = this._nicoPlayerConnector;

        var commentVisible = function(v) {
          if (typeof v === 'boolean') {
            nicoPlayer.playerConfig.set({commentVisible: v});
          } else {
            var pc = nicoPlayer.playerConfig.get();
            return pc.commentVisible;
          }
        };

        var saveVisibility = $.proxy(function() {
          this.config.set('commentVisible', commentVisible());
        }, this);

        var onFirstVideoInit = $.proxy(function() {
          commentVisible(this.config.get('commentVisible'));
          $(window).on('beforeunload.ShinjukuWatch', saveVisibility);
        }, this);

        this._playerAreaConnector.addEventListener('onFirstVideoInitialized', onFirstVideoInit);

      },
      initializePlayerResizer: function() {
        if (this.config.get('autoResizePlayer')) {
          this._playerResizer = new window.Shinjuku.ns.NicoplayerResizer();
          this._playerResizer.initialize();
        }
      },
      initializeOther: function() {
        // $('#content').removeClass('panel_ads_shown'); // コメントパネルの広告消すやつ
        $('.videoDetailExpand h2').addClass('videoDetailToggleButton');

        // ヘッダとコンテンツツリーの位置を入れ替える お気に入り登録ボタンが効かなくなる模様
        //$('.userProfile:first').after($('.parentVideoInfo:first').detach());
        //$('.hiddenUserProfile').after($('.userProfile:first').detach());


        var refreshTitle = function() {
          window.setTimeout(function() {
            document.title = document.title.replace(/ニコニコ動画:GINZA$/, 'ニコニコ動画(新宿)');
          }, 1000);
        };
        refreshTitle();

        this._watchInfoModel.addEventListener('reset', function() {
          refreshTitle();
        });

        if (this.config.get('noNews') === true || this.config.get('autoResizePlayer') === true) {
          $('#content').addClass('noNews'); // ニュース消す
          // 通信を止める
          var tmi = window.WatchApp.ns.init.TextMarqueeInitializer;
          tmi.textMarqueeItemList.list.length = 0;
          tmi.textMarqueeItemDispatcher.stop();
          tmi.textMarqueeItemDispatcher.start = function() {};
        }
        if (this.config.get('hideCommentPanelSocialButtons') === true) {
          $('#playerTabContainer').addClass('w_noSocial');
        }


        this._playerAreaConnector.addEventListener('onFirstVideoInitialized', function() {
          $('body').addClass('Shinjuku');

          // ?ref=がついてるせいで未読既読のリンクの色が変わらなくなる問題の対策
          // 自分のマイリストから飛んできた場合の ?group_id=xxxも消すべきか？は迷うところ
          // これとは別にリンク側の?ref=も除去する必要があるが、単体のスクリプトが既に存在するので省略
          if (location.href.indexOf('?ref=') >= 0) {
            window.history.replaceState('', '', location.href.split('?')[0]);
          }
        });
      }


    });

    if (window.PlayerApp) {
      (function() {
        var watchInfoModel = WatchApp.ns.model.WatchInfoModel.getInstance();
        if (watchInfoModel.initialized) {
          window.Shinjuku.initialize();
        } else {
          var onReset = function() {
            watchInfoModel.removeEventListener('reset', onReset);
            window.setTimeout(function() {
              watchInfoModel.removeEventListener('reset', onReset);
              window.Shinjuku.initialize();
            }, 0);
          };
          watchInfoModel.addEventListener('reset', onReset);
        }
      })();
    }


  });

  var script = document.createElement("script");
  script.id = "ShinjukuLoader";
  script.setAttribute("type", "text/javascript");
  script.setAttribute("charset", "UTF-8");
  script.appendChild(document.createTextNode("(" + monkey + ")()"));
  document.body.appendChild(script);

})();
