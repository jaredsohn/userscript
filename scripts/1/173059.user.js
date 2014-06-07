// ==UserScript==
// @name        SmartNicorepo
// @namespace   https://github.com/segabito/
// @description ニコレポの「投稿」以外をデフォルトで折りたたむ ＆ お気に入りユーザーに最終更新を表示
// @include     http://www.nicovideo.jp/my/*
// @include     http://www.nicovideo.jp/user/*
// @include     http://www.nicovideo.jp/my/fav/user
// @version     2.0.1
// @grant       none
// ==/UserScript==

(function() {
  var monkey =
  (function() {
    var $ = window.jQuery;

    function addStyle(styles, id) {
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
    }

    var __nicorepocss__ = (function() {/*
      .nicorepo .log.log-user-video-upload {
        background: #ffe;
      }
      .nicorepo .log.log-user-video-upload .log-target-thumbnail ,.nicorepo .log.log-user-seiga-image-upload .log-target-thumbnail {
        width: auto; margin-left: -30px;
      }
      .nicorepo .log.log-user-video-upload .video , .nicorepo .log.log-user-seiga-image-upload .seiga_image {
        height: auto !important; width: 130px !important; margin-top: 0px;
      }
      #nicorepo .timeline > .log {
        max-height: 500px;
        transition: max-height 0.4s ease-in-out;
      }
      #nicorepo.show-upload-only .timeline > .log:not(.log-user-video-upload):not(.log-user-seiga-image-upload):not(.log-user-register-chblog) {
        max-height: 22px;
        overflow: hidden;
      }
      #nicorepo .timeline > .log:not(.log-user-video-upload):not(.log-user-seiga-image-upload):not(.log-user-register-chblog):hover {
        max-height: 500px;
        overflow: hidden;
        transition: max-height 0.4s ease-in-out 0.8s;
      }
      .toggleUpload {
        position: absolute; top: 32px; right: 32px; font-weight: bolder; cursor: pointer; color: #888; padding: 8px;
        z-index: 1000;
        box-shadow: 2px 2px 2px #333;
      }
      .toggleUpload.bottom {
        top: auto; right: 32px; bottom: 32px;
      }
      .show-upload-only .toggleUpload {
        color: red;
      }
      .toggleUpload:after {
        content: ': OFF';
      }
      .show-upload-only .toggleUpload:after {
        content: ': ON';
      }

     */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/\{\*/g, '/*').replace(/\*\}/g, '*/');

    var __favusercss__ = (function() {/*

      #favUser .outer.updating {
      }
      #favUser .outer.updating * {
        cursor: wait;
      }
      #favUser .outer.done .showNicorepo {
        display: none;
      }

      #favUser .nicorepo {
        color: #800;
        clear: both;
        margin-bottom: 24px;
      }
      #favUser .uploadVideoList, #favUser .seigaUserPage {
        font-size: 80%;
        margin-left: 16px;
      }

      #favUser .nicorepo.fail {
        color: #800;
        clear: both;
        margin-left: 64px;
      }


      #favUser .nicorepo.success {
        padding: 8px;
        overflow: auto;
        border: 1px inset;
        max-height: 300px;
      }

      .nicorepo .log-target-thumbnail,
      .nicorepo .log-target-info {
        display: inline-block;
        vertical-align: middle;
      }
      .nicorepo .log-target-thumbnail .imageContainer {
        width: 64px;
        height: 48px;
        background-color: #fff;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        transition: 0.2s width ease 0.4s, 0.2s height ease 0.4s;
      }
      .nicorepo .log-target-thumbnail .imageContainer:hover {
        width: 128px;
        height: 96px;
      }
      .nicorepo .log-target-info .time {
        display: block;
        font-size: 80%;
        color: black;
      }
      .nicorepo .log-target-info .logComment {
        display: block;
        font-size: 80%;
        color: black;
      }
      .nicorepo .log-target-info .logComment:before {
        content: '「';
      }
      .nicorepo .log-target-info .logComment:after {
        content: '」';
      }
      .nicorepo .log-target-info a {
        display: inline-block;
        min-width: 100px;
      }
      .nicorepo .log-target-info a:hover {
        background: #ccf;
      }


      .nicorepo .log.log-user-video-round-number-of-view-counter {
        display: none;
      }

      .nicorepo .log-content {
        margin: 4px 8px;
        position: relative;
      }
      .nicorepo .log-footer {
        position: absolute;
        top: 0;
        left: 138px;
      }
      .nicorepo .log-footer a {
        font-size: 80%;
        color: black;
      }

      .nicorepo .log .time:after {
        background: #888;
        color: #fff;
        border-radius: 4px;
        display: inline-block;
        padding: 2px 4px;
      }
      .nicorepo .log.log-user-register-chblog    .time:after,
      .nicorepo .log.log-user-video-upload       .time:after,
      .nicorepo .log.log-user-seiga-image-upload .time:after {
        content: '投稿';
        background: #866;
      }

      .nicorepo .log.log-user-mylist-add-blomaga .time:after,
      .nicorepo .log.log-user-mylist-add         .time:after  {
        content: 'マイリスト';
      }
      .nicorepo .log.log-user-live-broadcast     .time:after  {
        content: '放送';
      }
      .nicorepo .log.log-user-seiga-image-clip   .time:after  {
        content: 'クリップ';
      }
      .nicorepo .log.log-user-video-review       .time:after  {
        content: 'レビュー';
      }
      .nicorepo .log.log-user-uad-advertise      .time:after  {
        content: '広告';
      }

      .nicorepo .log.log-user-video-upload {
        background: #ffe;
      }

      .nicorepo .log.log-user-video-upload .log-target-thumbnail,
      .nicorepo .log.log-user-seiga-image-upload .log-target-thumbnail {
      }
      .nicorepo .log.log-user-video-upload .video,
      .nicorepo .log.log-user-seiga-image-upload .seiga_image {
      }


      .nicorepo .log-author,
      .nicorepo .log-body,
      .nicorepo .log-res,
      .nicorepo .log-comment,
      .nicorepo .log-footer {
        display: none !important;
      }
    */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/\{\*/g, '/*').replace(/\*\}/g, '*/');

     window.SmartNicorepo = {
       model: {},
       util: {},
       initialize: function() {
         if (location.pathname === '/my/fav/user') {
           this.initializeFavUser();
         } else {
           this.initializeNicorepo();
         }
       },
       initializeNicorepo: function() {
         addStyle(__nicorepocss__, 'nicorepoCss');
         $('#nicorepo')
           .toggleClass('show-upload-only')
           .dblclick(function() { $('#nicorepo').toggleClass('show-upload-only'); });

         var $button = $('<button class="toggleUpload">投稿だけ表示</button>').click(
           function() {
             $('#nicorepo').toggleClass('show-upload-only');
           }
         );

         $('.timeline>*:first').before($button);
         $('.timeline>*:last').before($button.clone(true).addClass('bottom'));
       },
       initializeFavUser: function() {
         addStyle(__favusercss__, 'favUserCss');
//         this.loadFavUserList()
//           .then($.proxy(function(watchitems) {
//              console.log('%c ok:',   'background: #8f8;', watchitems.length);
//
//              this._itemList = new window.SmartNicorepo.model.WatchItemList(watchitems);
//
//              console.log('item list', this._itemList.getSortedItems());
//
//           }, this));
          $('.posRight .arrow').each(function(i, elm) {
            var $elm = $(elm), $lnk = $elm.clone();
            $lnk.html('<span></span> ニコレポを表示&nbsp;').addClass('showNicorepo');
            $elm.before($lnk);
          });

          $('.outer .section a').each(function(i, elm) {
            var $elm = $(elm), href = $elm.attr('href');
            if (href.match(/\/(\d+)$/)) {
              var userId = RegExp.$1;
              var $video = $('<a class="uploadVideoList">動画一覧</a>')
                .attr('href', '/user/' + userId + '/video');
              var $seiga = $('<a class="seigaUserPage">静画一覧</a>')
                .attr('href', 'http://seiga.nicovideo.jp/user/illust/' + userId);
              $elm.after($seiga).after($video);
            }
          });

          var getClearBusy = function($elm) {
            return function() {
              $elm.removeClass('updating').addClass('done');
            };
          };

          $('#favUser .showNicorepo').on('click', $.proxy(function(e) {
            e.preventDefault();
            e.stopPropagation();
            var $elm = $(e.target);
            var userId = $elm.attr('data-nico-nicorepolistid');
            if (!userId) { return; }
            var $outer = $elm.closest('.outer');
            if ($outer.hasClass('updating')) {
              return;
            }

            var clearBusy = getClearBusy($outer);
            $outer.addClass('updating');
            window.setTimeout(clearBusy, 3000);

            this.loadNicorepo(userId, $outer).then(clearBusy, clearBusy);

          }, this));
       },
       loadNicorepo: function(userId, $container) {
         // http://www.nicovideo.jp/user/[userId]/top?innerPage=1
         var url = 'http://www.nicovideo.jp/user/' + userId + '/top?innerPage=1';

         var fail = function(msg) {
           var $fail = $('<div class="nicorepo fail">' + msg + '</div>');
           $container.append($fail);
           autoScrollIfNeed($fail);
         };

         // ニコレポが画面の一番下よりはみ出していたら見える位置までスクロール
         var autoScrollIfNeed = function($target) {
            var
              scrollTop = $('html').scrollTop(),
              targetOffset = $target.offset(),
              clientHeight = $(window).innerHeight(),
              clientBottom = scrollTop + clientHeight,
              targetBottom = targetOffset.top + $target.outerHeight();

            if (targetBottom > clientBottom) {
              $('html').animate({
                scrollTop: scrollTop + $target.outerHeight()
              }, 500);
            }
         };

         var success = function($dom, $logBody) {
            var $result = $('<div class="nicorepo success" />');
            var $img = $logBody.find('img'), $log = $logBody.find('.log');
            $img.each(function() {
              var $this = $(this), $parent = $this.parent();
              var lazyImg = $this.attr('data-src');
              if (lazyImg) {
                var $imageContainer = $('<div class="imageContainer"/>');
                $imageContainer.css('background-image', 'url(' + lazyImg + ')');
                $this.before($imageContainer);
                $this.remove();
              }
              if (window.WatchItLater) {
                var href = $parent.attr('href');
                if (href) {
                  $parent.attr('href', href.replace('http://www.nicovideo.jp/watch/', 'http://nico.ms/'));
                }
              }
            });
            $logBody.each(function() {
              var $this = $(this), time = $this.find('time:first').text(), logComment = $this.find('.log-comment').text();

              $this.find('.log-target-info>*:first')
                .before($('<span class="time">' + time + '</span>'));
              if (logComment) {
                $this.find('.log-target-info')
                  .append($('<span class="logComment">' + logComment + '</span>'));
              }
            });

            $result.append($logBody);
            $container.append($result);
            $result.scrollTop(0);

            autoScrollIfNeed($result);
         };

         return $.ajax({
           url: url,
           timeout: 30000
         }).then(
          function(resp) {
            var
              $dom = $(resp),
              // 欲しいのはそのユーザーの「行動」なので、
              // xx再生やスタンプみたいなのはいらない
              $logBody = $dom.find('.log:not(.log-user-video-round-number-of-view-counter):not(.log-user-action-stamp):not(.log-user-live-video-introduced)');
            if ($logBody.length < 1) {
              fail('ニコレポが存在しないか、取得に失敗しました');
            } else {
              success($dom, $logBody);
            }
          },
          function() {
            fail('ニコレポの取得に失敗しました');
          });

      },
      loadFavUserList: function() {
         var def = new $.Deferred();
         // このAPIのupdate_timeが期待していた物と違ったのでボツ
         // create_timeとupdate_timeはどちらも同じ値が入ってるだけだった。(なんのためにあるんだ?)
         //
         $.ajax({
           url: 'http://www.nicovideo.jp/api/watchitem/list',
           timeout: 30000,
           complete: function(resp) {
             var json;
             try {
               json = JSON.parse(resp.responseText);
             } catch (e) {
               console.log('%c parse error: ', 'background: #f88', e);
               return def.reject('json parse error');
             }

             if (json.status !== 'ok') {
               console.log('%c status error: ', 'background: #f88', json.status);
               return def.reject('status error', json.status);
             }
             return def.resolve(json.watchitem);
           },
           error: function(req, status, thrown) {
             if (status === 'parsererror') {
               return;
             }
             console.log('%c ajax error: ' + status, 'background: #f88', thrown);
             return def.reject(status);
           }
         });
         return def.promise();
       }

     };


     window.SmartNicorepo.model.WatchItem = function() { this.initialize.apply(this, arguments); };
     window.SmartNicorepo.model.WatchItem.prototype = {
       initialize: function(seed) {
         this._seed = seed;
         this.itemType = seed.item_type || '1';
         this.itemId   = seed.item_id || '';
         if (typeof seed.item_data === 'object') {
           var data = seed.item_data;
           this.userId       = data.id;
           this.nickname     = data.nickname;
           this.thumbnailUrl = data.thumbnail_url;
         }
         var now = (new Date()).getTime();
         this.createTime = new Date(seed.create_time ? seed.create_time * 1000 : now);
         this.updateTime = new Date(seed.update_time ? seed.update_time * 1000 : now);
       }
     };

     window.SmartNicorepo.model.WatchItemList = function() { this.initialize.apply(this, arguments); };
     window.SmartNicorepo.model.WatchItemList.prototype = {
       initialize: function(watchItems) {
         this._seed = watchItems;
         this._items = {};
         this._itemArray = [];
         for (var i = 0, len = watchItems.length; i < len; i++) {
           var item = new window.SmartNicorepo.model.WatchItem(watchItems[i]);
           this._items[item.userId] = item;
           this._itemArray.push(item);
         }
       },
       getItem: function(userId) {
         return this._items[userId];
       },
       getSortedItems: function() {
         var result = this._itemArray.concat();
         result.sort(function(a, b) {
           return (a.updateTime < b.updateTime) ? 1 : -1;
         });
         return result;
       }
     };

     window.SmartNicorepo.initialize();

   }); // end of monkey

    var gm = document.createElement('script');
    gm.id = 'smartNicorepoScript';
    gm.setAttribute("type", "text/javascript");
    gm.setAttribute("charset", "UTF-8");
    gm.appendChild(document.createTextNode("(" + monkey + ")(window)"));
    document.body.appendChild(gm);

})();
