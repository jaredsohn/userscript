// ==UserScript==
// @name        MOD_Seiga
// @namespace   https://github.com/segabito/
// @description ニコニコ静画のUIをいじる
// @include     http://seiga.nicovideo.jp/seiga/*
// @include     http://seiga.nicovideo.jp/tag/*
// @include     http://seiga.nicovideo.jp/illust/*
// @include     http://lohas.nicoseiga.jp/o/*
// @version     0.2.21
// @grant       none
// ==/UserScript==

// ver 0.2.20
// ver 0.2.21
// - 新バージョンに対応

// ver 0.2.13
// - クリップの向きが変わったので、クリップメニューの位置を設定できるようにした

// ver 0.2.12
// - コメント一覧で一番下のコメントが見きれる問題二を勝手に直す
// - タグ検索時にキーワード検索フォームに自動でタグのテキストを入れる

// ver 0.2.11
// - コメント中の動画・静画IDやURLへのリンクに対応
// - 春画でも説明文のURL自動リンクに対応
// - 切れないサムネをAutopagerizeに対応

// ver 0.2.10
// - ヘッダ固定の時の自動スクロール修正
// - タグ検索時にカウンターが常時表示されるように変更
// - ページ下側の投稿者アイコンを隠す設定 (右上だけあればいい人用)

// ver 0.2.9
// - 動画タイトルの位置に自動スクロールする対応
// - おもにwindows等、縦ホイールしかない環境で横スクロールしやすくする。Firefoxでうまくいかない
// - ウィンドウ幅が狭いときはページ一番上に戻るボタンを出さなくする設定

// ver 0.2.8
// - クリップボタンの位置を上にしてみる
// - 右上の投稿者アイコンを大きくしてみる

// ver 0.2.7
// - 全画面表示時に画像クリックでズームが切り替わる対応

// ver 0.2.6
// - サムネイルがカットされなくする対応をタグ検索とイラストトップにも適用

// ver 0.2.5
// - サムネイルがカットされなくする対応。 設定で無効にも出来ます

// ver 0.2.4
// - 右カラム広告のせいで無駄に横スクロールが発生しているのを勝手に直す

// ver 0.2.3
// - 市場を近づけた

// ver 0.2.2
// - ホバーしなくてもタイトルと説明文が出るように

// ver 0.2.1
// - タグを説明文の下・説明文の右に置けるように

// ver 0.2.0
// - 動かなくなっていたのでとりあえずまた動くようにした

// ver 0.1.0
// - 設定パネルを追加
// - 投稿者を右上に出せるようにした

// ver 0.0.2
// - ホバーしなくてもタイトルと説明文が出るように
// - 見えないところでタグが増殖していたのを修正

// ver 0.0.1 最初のバージョン

(function() {
  var monkey = (function(){
    'use strict';
    var $ = window.jQuery;


    window.MOD_Seiga = {
      initialize: function() {
        this.initializeUserConfig();
        var path = location.pathname;
        if (path.indexOf('/seiga/') === 0) {
          this.initializeSeigaView();
        } else
        if (path.indexOf('/illust/') === 0 && path.indexOf('ranking') < 0) {
          this.initializeIllustTop();
        } else
        if (path.indexOf('/tag/') === 0) {
          this.initializeTagSearch();
        } else
        if (path.indexOf('/o/') === 0) {
          this.initializeFullView();
        }

      },
      initializeSeigaView: function() {
        if ($('#content').length > 0) {
          this.initializeBaseLayout();

          this.initializeScrollTop();
          this.initializeDescription();
          this.initializeCommentLink();
          this.initializeThumbnail();
          this.initializePageTopButton();
          this.initializeKnockout();

          this.initializeOther();
          this.initializeSettingPanel();

          $('body').addClass('MOD_Seiga_View');
          this.initializeCss();
        } else {
          // 春画っぽい。説明文の自動リンクだけやる
          this.initializeDescription();
        }

      },
      initializeIllustTop: function() {
        this.initializeThumbnail();
        this.initializeSettingPanel();

        this.initializePageTopButton();
        $('body').addClass('MOD_Seiga_Top');
        this.initializeCss();
      },
      initializeTagSearch: function() {
        this.initializeThumbnail();
        this.initializeSettingPanel();

        this.initializePageTopButton();
        setTimeout(function() {
          var $search = $('#bar_search');
          if (
            $search.val() === 'イラストを検索' ||
            $search.val() === '春画を検索') {
            $search.val($('#ko_tagwatch_min').attr('data-query')).addClass('edited').css({color: '#000'});
          }
        }, 1000);
        $('body').addClass('MOD_Seiga_TagSearch');
        this.initializeCss();
      },
      initializeFullView: function() {
        $('body').addClass('MOD_Seiga_FullView');
        this.initializeFullscreenImage();
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
        var __common_css__ = (function() {/*
          .MOD_SeigaSettingMenu a {
            font-weight: bolder; color: darkblue !important;
          }
          #MOD_SeigaSettingPanel {
            position: fixed;
            bottom: 2000px; right: 8px;
            z-index: -1;
            width: 500px;
            background: #f0f0f0; border: 1px solid black;
            padding: 8px;
            transition: bottom 0.4s ease-out;
            text-align: left;
          }
          #MOD_SeigaSettingPanel.open {
            display: block;
            bottom: 8px;
            box-shadow: 0 0 8px black;
            z-index: 10000;
          }
          #MOD_SeigaSettingPanel .close {
            position: absolute;
            cursor: pointer;
            right: 8px; top: 8px;
          }
          #MOD_SeigaSettingPanel .panelInner {
            background: #fff;
            border: 1px inset;
            padding: 8px;
            min-height: 300px;
            overflow-y: scroll;
            max-height: 500px;
          }
          #MOD_SeigaSettingPanel .panelInner .item {
            border-bottom: 1px dotted #888;
            margin-bottom: 8px;
            padding-bottom: 8px;
          }
          #MOD_SeigaSettingPanel .panelInner .item:hover {
            background: #eef;
          }
          #MOD_SeigaSettingPanel .windowTitle {
            font-size: 150%;
          }
          #MOD_SeigaSettingPanel .itemTitle {
          }
          #MOD_SeigaSettingPanel label {
            margin-right: 12px;
          }
          #MOD_SeigaSettingPanel small {
            color: #666;
          }
          #MOD_SeigaSettingPanel .expert {
            margin: 32px 0 16px;
            font-size: 150%;
            background: #ccc;
          }

          .comment_info .mod_link, .description .otherSite {
            text-decoration: underline;
            font-weight: bolder;
          }

          {* 画面が狭いときに操作不能になる部分などを直す *}

          .MOD_Seiga.mod_underXGA .comment_all .comment_all_inner .illust_main .illust_side .illust_comment .comment_list {
            position: fixed;
            right: 25px;
            top: 105px; bottom: 105px; overflow-y: auto;
          }
          .MOD_Seiga.mod_underXGA .comment_all .comment_all_inner .illust_main .illust_side .illust_comment .comment_list .text {
            margin: 0 16px 0 0;
          }
          .MOD_Seiga.mod_underXGA .comment_all .comment_all_inner .illust_main .illust_side .illust_comment .res .inner {
            position: fixed;
            bottom: 0; right: 5px;
          }
          .MOD_Seiga.mod_underXGA .comment_all .comment_all_header .control{
            position: fixed; top: 35px; right: 25px; {* 横幅が狭いと閉じるを押せない問題の対応 *}
          }
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/\{\*/g, '/*').replace(/\*\}/g, '*/');

        var __css__ = (function() {/*


        {* マイページや投稿へのリンクがあっても、すぐ上にniconico共通のヘッダーがあるのでいらないと思う。ということで省スペース優先で消す。*}
        #header { background: #fff; }
        #header .sg_global_bar {
          display: none;
        }
        #header_cnt { width: 1004px; }

        {* サムネのホバー調整 *}
        .list_item_cutout.middle {
          height: 154px;
          text-align: center;
        }
        .list_item_cutout.middle a {
          height: 100%;
          overflow: visible;
        }
        .list_item_cutout.middle a .illust_info, .list_item_cutout.middle a .illust_info:hover {
          bottom: 0;
        }

        {* サムネのカットなくすやつ。 *}
        .list_item_cutout.mod_no_trim  .thum img {
          display: none;
        }


        .list_item_cutout.mod_no_trim  .thum {
          display: block;
          width: 100%;
          height: calc(100% - 40px);
          background-repeat: no-repeat;
          background-position: center center;
          background-size: contain;
          -moz-background-size: contain;
          -webkit-background-size: contain;
          -o-background-size: contain;
          -ms-background-size: contain;
         }

        .list_item.mod_no_trim  .thum img {
          display: none;
        }

        .list_item.mod_no_trim  .thum {
          display: block;
          width: 100%;
          height: 0;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: contain;
          -moz-background-size: contain;
          -webkit-background-size: contain;
          -o-background-size: contain;
          -ms-background-size: contain;
        }
        .MOD_Seiga_View .list_item.mod_no_trim  .thum {
        }
        .list_item.mod_no_trim .thum:hover, .list_item_cutout.mod_no_trim .thum:hover {
          background-size: cover;
        }

        .MOD_Seiga_Top .list_item_cutout.mod_no_trim  .thum {
          height: calc(100% - 50px);
        }
        .MOD_Seiga_Top .list_item_cutout.mod_no_trim a {
          height: 100%;
          width: 100%;
        }
        .MOD_Seiga_Top .list_item_cutout.mod_no_trim.large a .illust_info {
          bottom: 0px !important;
          background-color: rgba(60, 60, 60, 1);
          padding: 10px 40px;
        }
        .MOD_Seiga_Top .list_item_cutout.mod_no_trim.large {
          width: 190px;
          height: 190px;
        }
        .MOD_Seiga_Top .rank_box .item_list.mod_no_trim .more_link a {
          width: 190px;
        }

        {* タグ検索時、カウンタなどが常時見えるように修正 *}
        .MOD_Seiga_TagSearch .list_item.large a .illust_count {
          opacity: 1;
        }
        .MOD_Seiga_TagSearch .list_item.large a {
          height: 321px;
        }
        .MOD_Seiga_TagSearch .list_item.large {
          height: 351px;
        }

        {* タイトルと説明文・投稿者アイコンだけコンクリートの地面に置いてあるように感じたので絨毯を敷いた *}
        .MOD_Seiga .im_head_bar .inner {
          background-color: #FFFFFF;
          border-color: #E8E8E8;
          border-radius: 5px;
          border-style: solid;
          border-width: 0 0 1px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
          display: block;
          margin-top: 20px;
          {*margin-bottom: 20px;*}
          margin-left: auto;
          margin-right: auto;
          padding: 15px;
          position: relative;
          width: 974px;
        }


        {* タグの位置調整 *}
        .illust_main .mod_tag-top.illust_sub_info {
          padding-bottom: 25px;
          padding-top: 0;
        }


        .illust_sub_info.mod_tag-description-bottom {
          margin-top: 15px;
        }
        .im_head_bar .illust_tag h2 {
          float: left;
          font-size: 116.7%;
          line-height: 120%;
          margin: 4px 10px 0 -2px;
          overflow: hidden;
        }
        .im_head_bar .illust_sub_info  input#tags {
          margin-bottom: 15px;
          margin-top: 5px;
          padding: 4px 10px;
          width: 280px;
        }
        .im_head_bar .illust_sub_info ul li.btn {
          bottom: 15px;
          position: absolute;
          right: 15px;
        }

        {* タグ右上 *}
        .description.mod_tag-description-right {
          float: left;
        }
        .illust_sub_info.mod_tag-description-right {
          width: 300px;
          float: right;
          margin: 0;
        }
        .mod_tag-description-right .tag {
          background: none repeat scroll 0 0 rgba(0, 0, 0, 0);
          border: medium none;
          margin: 0;
        }
        .mod_tag-description-right .tag a {
          padding: 0 5px;
        }
        .mod_tag-description-right .tag li {
        }
        .mod_tag-description-right .tag li a {
          padding: 0 5px 0 0;
          border: 0;
        }
        .im_head_bar .illust_sub_info.mod_tag-description-right ul li.btn.active {
        }
        {* 右下だと被ることがあるので仕方なく *}
        .im_head_bar .illust_sub_info.mod_tag-description-right ul li.btn {
          display: inline-block;
          position: relative;
          bottom: auto; right: auto;
        }

        #ichiba_box {
          width: 1004px;
          margin: 0 auto 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
        }

        #content.illust { padding: 0; }

        #related_info .ad_tag { display: none;}

        {* 右カラム広告のせいで無駄に横スクロールが発生しているのを修正 *}
        .related_info .sub_info_side {
          overflow-x: hidden;
        }


        .illust_main .illust_side .clip.mod_top {
          padding: 10px 10px 0;
        }


        .MOD_Seiga_FullView #content.illust_big .illust_view_big {
          margin: 0 auto;
        }

        .MOD_Seiga_FullView .control {
          position: absolute;
          right: 0;
          top: 0;
          z-index: 1000;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .MOD_Seiga_FullView:hover .control {
          opacity: 1;
        }

        .MOD_Seiga_FullView .illust_view_big img {
          {*transform: scale(1); -webkit-transform: scale(1);
          transition: transform 0.3s ease, -webkit-transform 0.3s ease;*}
        }

        .MOD_Seiga_FullView:not(.mod_noScale) .illust_view_big img {
          position: absolute;
          top: 0;
          left: 0;
                  transform-origin: 0 0 0;
          -webkit-transform-origin: 0 0 0;
        }

        .MOD_Seiga_FullView.mod_contain {
          overflow: hidden;
        }
        .MOD_Seiga_FullView.mod_cover {
        }
        .MOD_Seiga_FullView.mod_contain .illust_view_big img,
        .MOD_Seiga_FullView.mod_cover   .illust_view_big img {
          {*display: none;*}
        }

        .MOD_Seiga_FullView             .illust_view_big {
          background-repeat: no-repeat;
          background-position: center center;
        }
        .MOD_Seiga_FullView.mod_contain .illust_view_big {
          background-size: contain;
        }
        .MOD_Seiga_FullView.mod_cover   .illust_view_big {
          background-size: cover;
        }

        #pagetop.mod_hide { display: none !important; }

        #ko_watchlist_info.mod_hide { display: none !important; }


*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/\{\*/g, '/*').replace(/\*\}/g, '*/');


          this.addStyle(__common_css__);

        if (this.config.get('applyCss')) {
          this.addStyle(__css__);
        }
      },
      initializeUserConfig: function() {
        var prefix = 'MOD_Seiga_';
        var conf = {
          applyCss: true,
          topUserInfo: true,
          tagPosition: 'description-bottom',
          noTrim: true,
          hidePageTopButton: true,
          clipPosition: 'bottom',
          hideBottomUserInfo: false
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
      initializeBaseLayout: function() {
        var $description = $('#content .description, #content .discription').addClass('description');
        $('.controll').addClass('control');
//        var $illust_main = $('.illust_main:first').detach();
//        $('#detail .illust_info:first').after($illust_main);

//        var tagPos = this.config.get('tagPosition');
//        if (tagPos !== 'default') {
//          var $subInfo = $('#detail .illust_sub_info').detach();
//          if (tagPos === 'top') {
//            $subInfo.addClass('mod_tag-top');
//            $('#detail .detail_inner .illust_wrapper .inner').before($subInfo);
//          } else
//          if (tagPos === 'description-bottom' || tagPos === 'description-right') {
//            $subInfo.addClass('mod_tag-' + tagPos);
//            $('.description').addClass('mod_tag-' + tagPos);
//            $description.after($subInfo);
//          }
//        }

        $('#related_info').after($('#ichiba_box'));

//        if (this.config.get('clipPosition') === 'top') {
//          $('#ko_comment').before($('#ko_clip').addClass('mod_top'));
//        }

        if (this.config.get('hideBottomUserInfo') === true) {
          $('#ko_watchlist_info').addClass('mod_hide');
        }


//        if (this.config.get('topUserInfo')) {
//          var $watchlist_info = $('#ko_watchlist_info').detach();
//          $('#detail .discription, #detail .discription').addClass('topUserInfo').before($watchlist_info);
//        }
      },
      initializeScrollTop: function() {
        var $document = $(document), $body = $('body'); //, $bar = $('#bar');

        var reset = this.resetScrollTop = function() {
          var nofix = $body.hasClass('nofix');
          var commonHeaderHeight = nofix ? 0 : 36; //$bar.outerHeight();
          $document.scrollTop(Math.max(
            $document.scrollTop(),
            $('#content .im_head_bar').offset().top -commonHeaderHeight
          ));
        };
        setTimeout(reset, 100);
        reset();
      },
      initializeDescription: function() {
        var $description = $('#content .description, #content .discription, .illust_user_exp');
        if ($description.length < 1) { return; }
        var html = $description.html();

        // 説明文中のURLの自動リンク
        var linkmatch = /<a.*?<\/a>/, links = [], n;
        html = html.split('<br />').join(' <br /> ');
        while ((n = linkmatch.exec(html)) !== null) {
          links.push(n);
          html = html.replace(n, ' <!----> ');
        }
        html = html.replace(/(https?:\/\/[\x21-\x3b\x3d-\x7e]+)/gi, '<a href="$1" target="_blank" class="otherSite">$1</a>');
        for (var i = 0, len = links.length; i < len; i++) {
          html = html.replace(' <!----> ', links[i]);
        }
        html = html.split(' <br /> ').join('<br />');

        var $desc = $('<div>' +  html + '</div>');
        $description.empty().append($desc);

      },
      initializeCommentLink: function() {
        var videoReg = /((sm|nm|so)\d+)/g;
        var seigaReg = /(im\d+)/g;
        var bookReg  = /((bk|mg)\d+)/g;
        var urlReg   = /(https?:\/\/[\x21-\x3b\x3d-\x7e]+)/gi;

        var autoLink = function(text) {
          text = text
            .replace(videoReg, '<a href="//www.nicovideo.jp/watch/$1" class="video mod_link">$1</a>')
            .replace(seigaReg, '<a href="/seiga/$1" class="illust mod_link">$1</a>')
            .replace(bookReg,  '<a href="/watch/$1" class="book mod_link">$1</a>')
            .replace(urlReg,   '<a href="$1" target="_blank" class="otherSite mod_link">$1</a>');
          return text;
        };
        var commentLink = function(selector) {
          $(selector).each(function() {
            var $this = $(this);
            var html = $this.html(), linked = autoLink(html);
            if (html !== linked) {
              $this.html(linked);
            }
            $this.addClass('mod_linked');
          });
        };

        setTimeout(function() {
          commentLink('#comment_list .comment_info .text:not(.mod_linked)');
          var updateTimer = null;
          document.body.addEventListener('DOMNodeInserted', function(e) {
            if (e.target.className && e.target.className.indexOf('comment_list_item') >= 0) {
              if (updateTimer) {
                updateTimer = clearTimeout(updateTimer);
              }
              updateTimer = setTimeout(function() {
                updateTimer = clearTimeout(updateTimer);
                commentLink('#comment_list .comment_info .text:not(.mod_linked)');
                //var $text = $(e.target).find('.text');
                //if (!$text.hasClass('mod_linked')) $text.html(autoLink($text.text())).addClass('mod_linked');
              }, 100);
            }
          });

        }, 100);
      },
      initializeThumbnail: function() {
        if (this.config.get('noTrim') !== true) { return; }

        var treg = /^(http:\/\/lohas.nicoseiga.jp\/+thumb\/+.\d+)([a-z\?]*)/;
        var noTrim = function() {
          $('.list_item_cutout, #main .list_item:not(.mod_no_trim)').each(function() {
            var $this = $(this);
            var $thum = $this.find('.thum');
            var $img  = $thum.find('img');
            var src   = $img.attr('src') || '';
            if ($thum.length * $img.length < 1 || !treg.test(src)) return;
            // TODO: 静画のサムネの種類を調べる
            var url = RegExp.$1 + 'q?';//RegExp.$2 === 't' ? src : RegExp.$1 + 'q?';
            $thum.css({'background-image': 'url("' + url + '")'});
            $this.addClass('mod_no_trim');
          });
        };
        noTrim();
        document.body.addEventListener('AutoPagerize_DOMNodeInserted', function() {
          setTimeout(function() {
            noTrim();
          }, 500);
        });
      },
      initializePageTopButton: function() {
        var config = this.config;
        var updatePageTopButtonVisibility = function() {
          if (config.get('hidePageTopButton') !== true) { return; }
          var threshold = 1004 + 180; // ボディ幅 + おおまかなボタン幅
          var innerWidth = $(window).innerWidth();
          $('#pagetop').toggleClass('mod_hide', $(window).innerWidth() < threshold);
          $('body').toggleClass('mod_underXGA', innerWidth < 1024);
        };
        updatePageTopButtonVisibility();
        $(window).on('resize', updatePageTopButtonVisibility);
      },
      initializeKnockout: function() {
      },
      initializeOther: function() {
        $('body').addClass('MOD_Seiga');
      },
      initializeSettingPanel: function() {
        var $menu   = $('<li class="MOD_SeigaSettingMenu"><a href="javascript:;" title="MOD_Seigaの設定変更">MOD_Seiga設定</a></li>');
        var $panel  = $('<div id="MOD_SeigaSettingPanel" />');//.addClass('open');
        var $button = $('<button class="toggleSetting playerBottomButton">設定</botton>');

        $button.on('click', function(e) {
          e.stopPropagation(); e.preventDefault();
          $panel.toggleClass('open');
        });

        var config = this.config;
        $menu.find('a').on('click', function() { $panel.toggleClass('open'); });

        var __tpl__ = (function() {/*
          <div class="panelHeader">
          <h1 class="windowTitle">MOD_Seigaの設定</h1>
          <p>設定はリロード後に反映されます</p>
          <button class="close" title="閉じる">×</button>
          </div>
          <div class="panelInner">
            <!--<div class="item" data-setting-name="topUserInfo" data-menu-type="radio">
              <h3 class="itemTitle">投稿者情報を右上に移動 </h3>
              <label><input type="radio" value="true" > する</label>
              <label><input type="radio" value="false"> しない</label>
            </div>-->

            <div class="item" data-setting-name="noTrim" data-menu-type="radio">
              <h3 class="itemTitle">サムネイルの左右カットをやめる </h3>
              <label><input type="radio" value="true" >やめる</label>
              <label><input type="radio" value="false">やめない</label>
            </div>

            <div class="item" data-setting-name="hidePageTopButton" data-menu-type="radio">
              <h3 class="itemTitle">ウィンドウ幅が狭いときはページトップに戻るボタンを隠す</h3>
              <label><input type="radio" value="true" >隠す</label>
              <label><input type="radio" value="false">隠さない</label>
            </div>

            <div class="item" data-setting-name="hideBottomUserInfo" data-menu-type="radio">
              <h3 class="itemTitle">ページ下側の投稿者情報を隠す</h3>
              <small>右上だけでいい場合など</small><br>
              <label><input type="radio" value="true" >隠す</label>
              <label><input type="radio" value="false">隠さない</label>
            </div>

            <div class="item" data-setting-name="clipPosition" data-menu-type="radio">
              <h3 class="itemTitle">クリップ登録メニューの位置(旧verのみ)</h3>
              <label><input type="radio" value="&quot;top&quot;" >上</label>
              <label><input type="radio" value="&quot;bottom&quot;">下</label>
            </div>
            <!--
            <div class="item" data-setting-name="tagPosition" data-menu-type="radio">
              <h3 class="itemTitle">タグの位置(旧verのみ) </h3>
              <label><input type="radio" value="&quot;description-bottom&quot;">説明文の下</label>
              <label><input type="radio" value="&quot;description-right&quot;">説明文の右</label>
              <label><input type="radio" value="&quot;top&quot;">画像の上</label>
              <label><input type="radio" value="&quot;default&quot;">画像の下(標準)</label>
            </div>
            -->

            <div class="expert">
              <h2>上級者向け設定</h2>
            </div>
            <div class="item" data-setting-name="applyCss" data-menu-type="radio">
              <h3 class="itemTitle">MOD_Seiga標準のCSSを使用する</h3>
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


        $('#siteHeaderRightMenuFix').after($menu);
        $('body').append($panel);
      },
      initializeFullscreenImage: function() {
        var $body = $('body'), $container = $('.illust_view_big'), $img = $container.find('img'), scale = 1;
        var width = $img.outerWidth, height = $img.outerHeight();
        var $window = $(window);
        $('.controll').addClass('control');

        var clearCss = function() {
          $body.removeClass('mod_contain').removeClass('mod_cover').removeClass('mod_noScale');
          $container.css({width: '', height: ''});
          $img.css({'transform': '', '-webkit-transform': '', top: '', left: ''});
        };
        var contain = function() {
          clearCss();
          $body.addClass('mod_contain');
          scale = Math.min(
            $window.innerWidth() / $img.outerWidth(),
            $window.innerHeight() / $img.outerHeight()
          );
          scale = Math.min(scale, 10);
          $img.css({
            'transform':         'scale(' + scale + ')',
            '-webkit-transform': 'scale(' + scale + ')',
            'left':  ($window.innerWidth()  - $img.outerWidth()  * scale) / 2 + 'px',
            'top':   ($window.innerHeight() - $img.outerHeight() * scale) / 2 + 'px'
          });
          $container.width($window.innerWidth());
          $container.height($window.innerHeight());
//          $container.css('background-image', 'url("' + $img.attr('src') + '")');

        };
        var cover = function() {
          clearCss();
          $body.addClass('mod_cover').css('overflow', 'scroll');
          scale = Math.max(
            $window.innerWidth() / $img.outerWidth(),
            $window.innerHeight() / $img.outerHeight()
          );
          scale = Math.min(scale, 10);
          $img.css({
            'transform':         'scale(' + scale + ')',
            '-webkit-transform': 'scale(' + scale + ')',
          });
          // ウィンドウサイズの計算にスクロールバーの幅を含めるための措置 おもにwindows用
          $body.css('overflow', '');
        };
        var noScale = function() {
          clearCss();
          $body.addClass('mod_noScale');
          scale = 1;
          $container.css('background-image', '');
        };

        var onclick = function(e) {
          if (e.button > 0) { return; }
          // TODO: クリックした位置が中心になるようにスクロール
          if ($body.hasClass('mod_noScale')) {
            contain();
          } else
          if ($body.hasClass('mod_contain')) {
            cover();
          } else {
            noScale();
          }
        };
        var update = function() {
          if ($body.hasClass('mod_contain')) {
            contain();
          } else
          if ($body.hasClass('mod_cover')) {
            cover();
          }
        };

        contain();
        $img.on('click', onclick);
        $window.on('resize', update);
        $img.on('load.MOD_Seiga', function() {
          update();
          $img.off('load.MOD_Seiga');
        });

        var hasWheelDeltaX = false;

        // おもにwindows等、縦ホイールしかない環境で横スクロールしやすくする
        // Firefoxでうまくいかない
        $(document).on('mousewheel', function(e) {
          var delta = 0;

          if ($body.hasClass('mod_contain')) { return; }

          if (document.body.scrollHeight > window.innerHeight) { return; }

          if (hasWheelDeltaX) { return; }

          if (!e.originalEvent) { return; }
          var oe = e.originalEvent;

          if (typeof oe.wheelDelta === 'number') {
            if (typeof oe.wheelDeltaX === 'number' && oe.wheelDeltaX !== 0) {
              hasWheelDeltaX = true;
              return; // ホイールで横スクロールできる環境だとかえって邪魔なのでなにもしない
            }

            delta = e.originalEvent.wheelDelta / Math.abs(e.originalEvent.wheelDelta);
          }
          if (delta === 0) return;

          e.preventDefault();
          e.stopPropagation();

          var scrollLeft = $body.scrollLeft() - (delta * $window.innerWidth() / 10);
          $body.scrollLeft(Math.max(scrollLeft, 0));
        });
      }
    };

    window.MOD_Seiga.initialize();

  });

  var script = document.createElement("script");
  script.id = "MOD_SeigaLoader";
  script.setAttribute("type", "text/javascript");
  script.setAttribute("charset", "UTF-8");
  script.appendChild(document.createTextNode("(" + monkey + ")()"));
  document.body.appendChild(script);

})();
