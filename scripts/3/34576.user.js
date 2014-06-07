// ==UserScript==
// @name           HatebuComment on LDR
// @namespace      http://d.hatena.ne.jp/ABCbo/
// @include        http://reader.livedoor.com/reader/
// ==/UserScript==
// LastUpdate 2013.02.28

(function() {
  // ショートカットキーの設定
  const GET_COMMENT_KEY  = 'm';
  const TITLE_MODE_KEY   = 'x';
  const OPEN_BACKGROUND  = 'n';
  const OPEN_HATEBU_PAGE = 'h';
  var w = unsafeWindow;
  // 記事ID、コメント挿入ID、一覧表示前のスクロール位置、前クラス名・ID
  var ID = ULID = POS = PREV = PREVID = '';
  // JSONとRSSそれぞれのコメント取得が完了したかチェック
  var jsonDone = rssDone = false;
  var jsonArray = rssArray = [];

  with(w) {
    /* register_hookのタイミング{
       // LDRを開いたとき（左から早い順）
       BEFORE_INIT, AFTER_INIT, BEFORE_CONFIGLOAD, AFTER_CONFIGLOAD
       BEFORE_SUBS_LOAD, AFTER_INIT_GUIDE, AFTER_SUBS_LOAD
       // フィードを開くたび
       BEFORE_PRINTFEED, AFTER_PRINTFEED
       // ウィンドウサイズ変更時
       WINDOW_RESIZE
       // フィードリスト更新時
       BEFORE_SUBS_LOAD, AFTER_SUBS_LOAD
       // 設定画面（メニューの「その他」＞「設定変更」）を開いたとき
       AFTER_INIT_CONFIG
       // 以下は不明
       COMPLATE_PRINTFEED, AFTER_LOAD, BEFORE_UNLOAD, AFTER_INIT_MANAGE
       BEFORE_ANYKEYDOWN, AFTER_ANYKEYDOWN }*/
    
    // アクセス時一度だけの処理
    register_hook('AFTER_INIT', function() {
      // キーボードイベントの追加
      // コメント取得(キーボード)
      Keybind.add(GET_COMMENT_KEY, function() {
        ID = get_active_item(true).id;
        // タイトル一覧だった場合は、コメント表示⇔タイトル一覧で切り替える
        if (document.body.className != '') {
          PREV = document.body.className;
          toggleTitleMode();
        } else {
          document.body.className = PREV ? PREV : '';
          PREV = '';
        }
        getComment();
      });
      
      // タイトルのみを一覧表示する
      Keybind.add(TITLE_MODE_KEY, function() {
        ID = get_active_item(true).id;
        PREV = '';
        // 本文を表示状態に変更する
        removeClass($("right_body"), "compact");
        toggleTitleMode();
        focusEntry();
      });
      
      // 背面タブで開いて次の記事に移動
      Keybind.add(OPEN_BACKGROUND, function() {
        var item = get_active_item(true);
        if (!item) return;
        // unsafeWindowからGM_～を利用するための処理
        window.setTimeout(function() {
          GM_openInTab(item.link);
        }, 0);
        Control.go_next();
      });
      
      // はてブページを開く
      Keybind.add(OPEN_HATEBU_PAGE, function() {
        var link = get_active_item(true).link.replace(/#/, "%23");
        if (link) window.open("http://b.hatena.ne.jp/entry/" + link);
      });
    });
    
    // フィードを開くたびに毎回（描画開始前）
    register_hook('BEFORE_PRINTFEED', function(feed) {
      // authorにはてブ数などを追加
      feed.items.forEach(function(item) {
        var link = item.link.replace(/#/g, '%23');
        var author = item.author;
        var id = item.id;
        var base = 'http://b.hatena.ne.jp/entry/';
        /* 2009.11.26あたりからauthorが空白でなくnullになるケースが出てきた
        らしい。author == nullだとダメで === nullで判定できた */
        if (author === null || !/hatebu_get_comment/.test(author)) {
          var hatebu_image = '&nbsp;'
            + '<span class="hatebu_link">'
            + '<span class="view_content' + id + '" '
            + 'title="この記事のコメントを見る">＞</span>'
            + '<a href="' + base + link + '">'
            + '<img style="border:none;" src="' + base + 'image/' + link + '">'
            + '</a></span>'
            + '<span class="' + id + ' hatebu_get_comment" '
            + 'title="コメント表示">▼表示</span>'
            + '<span id="container_' + id + '"></span>'
            + '<span class="' + id + ' hatebu_get_comment" '
            + 'title="コメント表示" style="display:none;">▼表示</span>'
          item.author = author + hatebu_image;
        }
      });
    });
    
    // 描画開始後
    register_hook('AFTER_PRINTFEED', function() {
      /* ホイールスクロールで最後の記事までスクロール可能にする */
      setStyle("scroll_padding",
        {height: $("right_container").offsetHeight + "px"});
      
      // マウスイベントの追加
      var addEvent = setInterval(function() {
        // 最後の記事まで表示されたのを確認してからイベントを追加する
        var nodes = XPATH("//*[contains(concat(' ', @class, ' '), ' item ')]");
        if (contain(nodes[nodes.length - 1].className, "last")) {
          // コメント取得(マウス)
          var nodes = XPATH('//span[contains(@class, "hatebu_get_comment")]');
          nodes.forEach(function(node) {
            node.addEventListener('click', function() {
              ID = this.className.replace(/^(\d+?) .*$/, "$1");
              PREV = '';
              getComment();
            }, false);
          });
          
          /* 「＞」クリックで、その記事にフォーカスを当て本文も表示する */
          var nodes = XPATH('//*[contains(@class, "view_content")]');
          nodes.forEach(function(node) {
            node.addEventListener('click', function(e) {
              // 移動前のスクロール状態
              POS = $('right_container').scrollTop;
              // 移動先の記事ID
              ID = this.className.replace(/view_content(.*)$/, "$1");
              PREV = document.body.className;
              toggleTitleMode();
              // 本文を表示状態に変更する
              removeClass($("right_body"), "compact");
              focusEntry();
              // ↓本文表示と同時にコメント取得も行う場合はコメントを外す
              //getComment();
              // クリックした位置にタイトル一覧に戻す「＞」を表示する
              $('onlyTitle').style.cssText += 'left: ' + (e.clientX - 5) + 'px;'
                + 'top: ' + (e.clientY - 7) + 'px;';
              $('onlyTitle').style.display = 'block';
            }, false);
          });
          clearInterval(addEvent);
        }
      }, 200);
      // 次のフィードに移動したら「＞」を隠す
      $('onlyTitle').style.display = 'none';
    });
    
    // 関数のまとめ
    // タイトルのみ表示を切り替える
    function toggleTitleMode() {
      PREVID = '';
      if (document.body.className != 'only_title') {
        document.body.className = 'only_title';
        $('onlyTitle').style.display = 'none';
      } else {
        document.body.className = '';
      }
    }
    
    //矢印切り替え
    function toggleArrow(mode) {
      var nodes = XPATH(
        "//span[contains(concat(' ', @class, ' '), ' " + ID + " ')]");
      for (var i = 0, node; node = nodes[i]; i++) {
        if (mode == 'show') {
          node.innerHTML = '▲隠す';
          node.title = 'コメントを隠す';
          node.style.display = 'inline';
        } else {
          node.innerHTML = '▼表示';
          node.title = 'コメント表示';
          if (i == 1) node.style.display = 'none';
        }
      }
    }
    
    // コメント切り替え
    function toggleComment() {
      focusEntry();
      var elem = $(ULID);
      if (PREV) {
        elem.style.display = '';
      } else if (elem.style.display != 'none') {
        elem.style.display = 'none';
        toggleArrow('hide');
      } else {
        elem.style.display = '';
        toggleArrow('show');
      }
    }
    
    // スクロールして記事にフォーカス
    function focusEntry(old) {
      if (old) {
        Control.scroll_to_px(POS + 2);
        return;
      }
      var elem = $('container_' + ID);
      Control.scroll_to_px(
        elem.parentNode.parentNode.parentNode.offsetTop + 2);
    }
    
    // コメント挿入用の要素を作成
    function beginAppend() {
      var elem = $('container_' + ID);
      var ul = document.createElement('ul');
      ul.className = 'hatebu';
      ul.id = ULID;
      elem.appendChild(ul);
    }
    
    // コメント取得の前処理
    function getComment() {
      if (PREVID == '') PREVID = ID;
      if (PREVID != ID) {
        document.body.className = '';
        PREV = '';
      }
      PREVID = ID;
      
      var item = get_item_info(ID);
      ULID = 'hatebu_' + ID;
      if ($(ULID)) {
        toggleComment();
      } else {
        jsonDone = rssDone = false;
        beginAppend();
        focusEntry();
        window.setTimeout(function() {
          getJSON(item.link);
          getRSS(item.link);
          message('コメント読み込み中...');
        }, 0);
        var timer = setInterval(function() {
          if (jsonDone && rssDone) {
            message('読み込み完了');
            var li = document.createElement('li');
            li.className = 'line_one';
            li.innerHTML = 'コメントのあるはてブ数 : ';
            if (jsonArray.length >= rssArray.length) {
              li.innerHTML += jsonArray.length + '(json) >= '
                + rssArray.length + '(rss) なのでjsonの結果を表示';
              var ARRAY = jsonArray;
            } else {
              li.innerHTML += rssArray.length + '(rss) >= '
                + jsonArray.length + '(json) なのでrssの結果を表示';
              var ARRAY = rssArray;
            }
            var place = $(ULID);
            place.appendChild(li);
            if (ARRAY.length == 0) {
              noComment();
            } else {
              for (var i in ARRAY) {
                var li = document.createElement('li');
                li.innerHTML = ARRAY[i];
                place.appendChild(li);
              }
            }
            toggleArrow('show');
            clearInterval(timer);
          }
        }, 200);
      }
    }
    
    function XPATH(expression) {
      var nodes = document.evaluate(expression, document, null, 4, null);
      var array = [];
      while (node = nodes.iterateNext()) {
        array.push(node);
      }
      if (array.length == 0) {
        GM_log("xpath error : " + expression);
      } else {
        return array;
      }
    }
    
    // コメントがない場合
    function noComment() {
      var li = document.createElement('li');
      li.innerHTML = "No Comment.";
      $(ULID).appendChild(li);
    }
    
    // 要素の追加
    // ?で表示されるショートカットキー一覧に設定したキーを追加する
    var tr = document.createElement('table');
    tr.innerHTML = "<tr><th>コメント取得 / 切り替え:</th>"
      + "<td><kbd>" + GET_COMMENT_KEY + "</kbd></td>"
      + "<th>タイトルモードの切り替え:</th>"
      + "<td><kbd>" + TITLE_MODE_KEY + "</kbd></td>"
      + "<th>背面タブで開く:</th>"
      + "<td><kbd>" + OPEN_BACKGROUND + "</kbd></td>"
      + "<th>はてブページを開く:</th>"
      + "<td><kbd>" + OPEN_HATEBU_PAGE + "</kbd></td>";
    $("keyhelp").insertBefore(tr, $("keybind_table"));
    
    // スタイルの設定
    var style = document.createElement('style');
    style.innerHTML = '.hatebu {'
      + 'border-top:1px dashed LightGray; border-bottom:1px dashed '
      + 'LightGray; list-style-type:circle; background-color:#EDF1FD;}'
      + '.hatebu li {margin-bottom: 3px; border-top:1px dotted LightGray;}'
      + '.line_one {border:none !important;}'
      + '.hatebu span.tags a {font-size: 85%; color:RoyalBlue; '
      + 'text-decoration:none;}'
      + '.date {font-size: 85%; color:Gray;}'
      + '.hatebu_get_comment {cursor: pointer !important; font-size: 13px;}'
      + '.hatebu_count {font-size: 13px;}'
      // タイトルのみを表示するためのスタイル
      + '.only_title .item_footer, .only_title .item_body {display: none;}'
      + '.only_title .item_buttons {visibility: hidden;}'
      + '.only_title .item_buttons *[id^="pin_"] {'
      + 'visibility: visible; position: absolute; right: 0px;}'
      + '.only_title .item_title {height: 20px !important; overflow: hidden; '
      + 'padding: 0 !important; position: relative; left: 60px; '
      + 'margin-right: 70px !important;}'
      + '.only_title .item_info {visibility: hidden; height: 0px; '
      + 'padding: 0 !important;}'
      + '.only_title .hatebu_link {position: absolute; left: 0px; '
      + 'visibility: visible;}'
      + '.only_title .hatebu_link span {position: relative; top: -18px;}'
      + '.only_title .hatebu_link img {position: relative; top: -15px;}'
      + '.hatebu_link > span {visibility: hidden;}'
      + '.only_title .hatebu_link > span {visibility: visible;}'
      + '.only_title #onlyTitle {display: none;}'
      + '#message_box {margin-left: 70px;}';
    document.body.appendChild(style);
    
    // マウスで本文の表示を切り替える
    var elem = document.createElement('li');
    elem.id = 'toggleContent';
    elem.title = '本文の表示 / 非表示の切替';
    elem.innerHTML = '本文';
    $("control_buttons_ul").appendChild(elem);
    $("toggleContent").addEventListener('click', function() {
      // LDRの関数
      Control.compact()
    }, false);
    
    // マウスでタイトル一覧表示を切り替える
    var elem = document.createElement('li');
    elem.id = 'toggleTitle';
    elem.title = 'タイトルのみ表示の切替';
    elem.innerHTML = 'タイトル';
    $("control_buttons_ul").appendChild(elem);
    $("toggleTitle").addEventListener('click', function() {
      ID = get_active_item(true).id;
      toggleTitleMode();
      focusEntry();
    }, false);
    
    // タイトル一覧表示に戻す「＞」
    var elem = document.createElement('span');
    elem.id = 'onlyTitle';
    elem.title = 'タイトル一覧に戻る';
    elem.innerHTML = '＞';
    elem.style.position = 'absolute';
    document.body.appendChild(elem);
    $("onlyTitle").addEventListener('click', function() {
      toggleTitleMode();
      focusEntry(true);
    }, false);
  }//with(w)
  
  // unsafeWindow内ではGM_xmlhttpRequestは使えない
  // JSONでコメント取得
  function getJSON(link) {
    // 関連エントリのないjsonliteの方が軽い
    GM_xmlhttpRequest({
      method:"GET",
      url: 'http://b.hatena.ne.jp/entry/jsonlite/?url='
        + encodeURIComponent(link),
      onload:function(xhr) {
        var json = eval("(" + xhr.responseText + ")"); 
        //レスポンスの処理
        jsonArray = [];
        if (!json) return jsonDone = true;
        json.bookmarks.forEach(function(user) {
          var name = user.user;
          if (user.comment.length > 0) {
            var date = getDate(user.timestamp);
            var Date = date.replace(/^(....)(..)(..)/, "($1/$2/$3)");
            jsonArray.push('<span class="date">' + Date + '</span>'
              + ' <img src="http://www.hatena.ne.jp/users/'
              + name.substring(0,2)
              + '/' + name + '/profile_s.gif">'
              + ' <a href="http://b.hatena.ne.jp/' + name + '/' + date
              + '#bookmark-' + json.eid + '">' + name + '</a>'
              + ' <span class="tags">'
              + user.tags.map(function(x){
                return '<a href="http://b.hatena.ne.jp/' + name + '/'
                  + x + '/">' + x + '</a>' 
              }).join(', ')
              + '</span> ' + user.comment);
          }
        });
        jsonDone = true;
      }
    });
  }
  
  // jsonでなぜか結果がほとんど帰ってこないケースがあるので
  // RSSでも取得できるようにする
  function getRSS(link, place) {
    GM_xmlhttpRequest({
      method:"GET",
      url: "http://b.hatena.ne.jp/entry/rss/" + link,
      onload:function(res) {
        rssArray = [];
        var r = res.responseText.match(/<item rdf:about(\s|.)+?<\/item>/mg);
        if (!r) {
          return rssDone = true;
        }
        for (var i = 0, j = 0; i < r.length; i++) {
          var str = '';
          var tags = r[i].match(/<dc:subject>(.*?)<\/dc:subject>/g);
          r[i].match(/<title>(.*?)<\/title>(?:\s|.)+?<link>(.*?)<\/link>(?:\s|.)+?<description>(.*?)<\/description>(?:\s|.)+?<dc:date>(....)-(..)-(..).(..:..:..)/);
          var name = RegExp.$1;
          var link = RegExp.$2;
          var comment = RegExp.$3;
          if (comment.length > 0) {
            var Date = '(' + RegExp.$4 + '/'
              + RegExp.$5 + '/' + RegExp.$6 + ')';
            str = '<span class="date">' + Date + '</span>'
                + ' <img src="http://www.hatena.ne.jp/users/'
                + name.substring(0,2) + '/' + name + '/profile_s.gif">'
                + ' <a href="' + link+ '">' + name + '</a>'
                + ' <span class="tags">';
            if (tags) {
              var tmp = new Array();
              for (var n in tags) {
                var tag = tags[n].replace(/<\/?dc:subject>/g, "");
                tmp.push('<a href="http://b.hatena.ne.jp/' + name + '/'
                     + tag + '/">' + tag + '</a>');
              }
              str += tmp.join(', ');
            }
            str += '</span>' + comment;
            rssArray.push(str);
          }
        }
        rssDone = true;
      }
    });
  }
  
  function getDate(timestamp) {
    var date = new Date(timestamp);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    if (m < 10) m = "0" + m;
    if (d < 10) d = "0" + d;
    return y.toString() + m.toString() + d.toString();
  }
})();