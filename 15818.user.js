// ==UserScript==
// @name           NicoClip
// @namespace      http://userscripts.org/scripts/show/15818
// @description    ニコニコ動画にはてなブックマークと連携したマイリスト機能を追加します。
// @include        http://www.nicovideo.jp/watch/*
// @include        http://de.nicovideo.jp/watch/*
// @include        http://es.nicovideo.jp/watch/*
// @include        http://tw.nicovideo.jp/watch/*
// @author         Nao Iizuka <iizuka@kyu-mu.net>
// ==/UserScript==
// 
// はてなログイン状態のCookieが有効である必要があります。
// hatenaBookmarkTag 変数を変えれば登録するタグを変更できます。
// プレイリスト取得ははてなブックマークのRSSを使います。
// すでにブックマーク済のものはタグを追加して登録します。
// はてなのサーバの関係でプレイリストに最新の動画が出ないことがあります。
// 勝手に機能追加希望です。
//
// 2008-11-26
//  * はてブリニューアルに伴いAtomフィードがタグで絞れなくなったのでRSSを使うように変更

var SCRIPT_VERSION = "2009-07-02";
var SCRIPT_URL     = "http://userscripts.org/scripts/show/15818";
var DEBUG          = false;

var d = document;

var NicoClip = function() {
  this.hatenaBookmarkTag = 'nicoclip'; // はてなブックマークで付けるタグ
//  this.hatenaHost = 'http://bbeta.hatena.ne.jp/'; // こちらはたぶんキャッシュなし
  this.hatenaHost = 'http://b.hatena.ne.jp/';
  // boxDiv.scrollHeight-boxDiv.scrollTopがこれ未満になったら次のページをロード
  this.scrollThreshold = 400;

  this.isPlaylistVisible = false; // いまプレイリストを表示中かどうか
  this.hatenaUsername = null; // はてなユーザー名
  this.videoCount = 0; // 今何件のリストを表示しているか
  this.isWaitingPlaylist = false; // XHRで次のフィードをロード中かどうか
  this.window = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
};

// はてなへのログインを促すメッセージを表示する
NicoClip.prototype.showPleaseLoginMessage = function() {
  this.showStatus('はてなに<a target="_blank" href="https://www.hatena.ne.jp/login?location=' + encodeURIComponent(this.hatenaHost) + '">ログイン</a>してください');
};

// はてなブックマークのタグ別ページへのリンクを文字列で返す
NicoClip.prototype.makeNicoClipLink = function() {
  var msg = [];
  if (this.hatenaUsername) {
    msg[msg.length] = ['<a target="_blank" href="',this.hatenaHost,this.hatenaUsername,'/',this.hatenaBookmarkTag,'/">'].join('');
  }
  msg[msg.length] = 'NicoClip';
  if (this.hatenaUsername) {
    msg[msg.length] = '</a>';
  }
  return msg.join('');
};

// プレイリスト下部にメッセージを表示する
NicoClip.prototype.showBoxStatus = function(msg) {
  this.boxStatusDiv.innerHTML = msg;
};

// ステータス表示部（Show/Hideボタンの隣）にメッセージを表示する
NicoClip.prototype.showStatus = function(msg) {
  d.getElementById('nicoclip_status').innerHTML = msg;
};

// プレイリストの下端付近までスクロールされたので
// 次のRSSをロードする
NicoClip.prototype.loadNextPage = function() {
  if (this.isWaitingPlaylist) { // 別のXHR待ちの場合は何もしない
    return;
  }
  if (this.nextRSSURL) { // 次ページあり
    if (DEBUG) {
      console.log('loadNextPage: ' + this.nextRSSURL);
    }
    var self = this;
    this.isWaitingPlaylist = true; // 簡易ロック
    // ロード中の画像を表示
    this.showBoxStatus('<img src="http://www.nicovideo.jp/img/watch/tool_loading.gif" height="24"> 次の20件を取得中...');
    // XHR: http://b.hatena.ne.jp/user/rss?of=20&tag=nicoclip
    var requestURL = [this.nextRSSURL,'&',new Date().getTime()].join('');
    GM_xmlhttpRequest({
      method: 'GET',
      url:    requestURL,
      onload: function(resp){
        self.parsePage_playlistFeed.apply(self, [resp, requestURL, true]);
        self.isWaitingPlaylist = false; // ロック解除
      }
    });
  } else { // 今表示されているのが最後のページ
    if (DEBUG) {
      console.log('No more page');
    }
    this.showBoxStatus('__END__');
  }
};

// プレイリストがスクロールされたときに呼ばれる
NicoClip.prototype.onScroll = function(e) {
  var div = d.getElementById('nicoclip_playlist');
  if (!div) {
    return;
  }
  if (DEBUG) {
    console.log('scroll: ' + (div.scrollHeight - div.scrollTop));
  }
  // 一定の位置までスクロールされたら次のページをロードする
  if (div.scrollHeight - div.scrollTop < this.scrollThreshold) {
    this.loadNextPage();
  }
};

// プレイリスト情報（videos）を新たに表示する
NicoClip.prototype.showPlaylistData = function(videos) {
  if (DEBUG) {
    console.log('showPlaylistData');
  }
  this.hideFlashAd();
  this.videoCount = 0; // 今何件プレイリストに表示しているか
  var self = this;
  // 編集／削除リンク作成
  var editDiv = d.createElement('div');
  var closeLink = d.createElement('a');
  closeLink.setAttribute('style', 'float:right;margin-right:5px;color:white;text-decoration:none');
  closeLink.setAttribute('href', 'javascript:void(0)');
  closeLink.addEventListener('click', function(e){self.hidePlaylist()}, false);
  var editAnchor = d.createElement('a');
  editAnchor.appendChild(d.createTextNode('編集／削除'));
  editAnchor.setAttribute('target', '_blank');
  editAnchor.setAttribute('style', 'font-size:small;color:white;text-decoration:none');
  editAnchor.setAttribute('href', [this.hatenaHost,this.hatenaUsername,'/',this.hatenaBookmarkTag,'/'].join(''));
  editDiv.appendChild(closeLink);
  closeLink.innerHTML = '&times;';
  editDiv.appendChild(editAnchor);
  // 動画一覧表示部
  var boxDiv = d.createElement('div');
  this.boxDiv = boxDiv;
  boxDiv.setAttribute('id', 'nicoclip_playlist');
  boxDiv.setAttribute('style', 'overflow:auto;text-align:left;margin-left:100px;height:240px;margin-top:5px;margin-bottom:5px');
  boxDiv.addEventListener('scroll', function(e){self.onScroll.apply(self,[e]);}, false);
  // プレイリストロードステータス表示部
  var boxStatusDiv = d.createElement('div');
  this.boxStatusDiv = boxStatusDiv;
  boxStatusDiv.setAttribute('id', 'nicoclip_playlist_status');
  boxStatusDiv.setAttribute('style', 'font-size:small;margin-bottom:3px');
  // videosの内容をthis.boxDivに追加する
  this.appendPlaylistData(videos);
  var div = d.getElementById('overlay');
  // 初回実行時はoverlayのdivを構築する
  if (!div) {
    div = d.createElement('div');
    d.body.appendChild(div);
    div.id = 'overlay';
    var divStyle = div.style;
    divStyle.color = 'white';
    divStyle.display = 'block';
    divStyle.position = 'absolute';
    divStyle.left = '100px';
    divStyle.top = '90px';
    divStyle.width = '80%';
    divStyle.textAlign = 'center';
    divStyle.zIndex = 1000;
    divStyle.backgroundColor = '#555555';
    divStyle.MozOpacity = .85;
    divStyle.opacity = .85;
  }
  div.innerHTML = '';
  div.appendChild(editDiv);
  div.appendChild(boxDiv);
  div.appendChild(boxStatusDiv);
  div.style.display = 'block';
};

// プレイリスト情報（videos）をプレイリスト（this.boxDiv）に追加していく
NicoClip.prototype.appendPlaylistData = function(videos) {
  if (DEBUG) {
    console.log('appendPlaylistData');
  }
  for (var i = 0; i < videos.length; i++) {
    this.videoCount++;
    var anchor = d.createElement('a');
    anchor.setAttribute('style', 'font-size:small;color:white;text-decoration:none');
    anchor.setAttribute('href', videos[i]['link']);
    if (videos[i]['image']) { // 動画のサムネイル
      var img = d.createElement('img');
      img.setAttribute('width', '47');
      img.setAttribute('style', 'float:left;margin-right:5px');
      img.setAttribute('src', videos[i]['image']);
      anchor.appendChild(img);
    }
    anchor.appendChild(d.createTextNode([this.videoCount,'. ',videos[i]['title'],' [',videos[i]['date'],']'].join('')));
    var br = d.createElement('br');
    br.setAttribute('style', 'clear:left');
    this.boxDiv.appendChild(anchor);
    this.boxDiv.appendChild(br);
  }
};

// XHR用: RSSフィードがロードされた時
// http://b.hatena.ne.jp/user/rss?tag=nicoclip
// http://b.hatena.ne.jp/user/rss?of=20&tag=nicoclip
NicoClip.prototype.parsePage_playlistFeed = function(resp, url, doAppend) {
  if (DEBUG) {
    console.log('resp: ' + resp.responseText);
  }
  if (resp.responseText.indexOf('<!DOCTYPE') != -1) { // はてなサーバ障害など
    if (doAppend) {
      this.showBoxStatus('ロードに失敗しました');
    } else {
      this.showStatus('ロードに失敗しました');
    }
    return;
  }
  var itemFrom;
  if (/of=(\d+)/.test(url)) { // 2ページ目以降にいる場合
    itemFrom = parseInt(RegExp.$1) + 20;
  } else { // 最初のページにいる場合
    itemFrom = 20;
  }
  this.nextRSSURL = this.hatenaHost + this.hatenaUsername + '/rss?of='
    + itemFrom + '&tag=' + this.hatenaBookmarkTag;
  // <item> を探していってvideosに格納する
  var doc = new DOMParser().parseFromString(resp.responseText, 'application/xml');
  var entries = doc.getElementsByTagName('item');
  var entriesNum = entries.length;
  var videos = [];
  for (var i = 0; i < entriesNum; i++) {
    var title = (entries[i].getElementsByTagName('title'))[0].firstChild.nodeValue;
    title = title.replace(/^ニコニコ動画\(.*?\)\s*‐/, '');       // RC2/RC
    title = title.replace(/‐ニコニコ動画\(.*?\)$/, '');          // RC2
    title = title.replace(/^ニコニコ動画(?:γ|\(.*?\)) \| /, ''); // gamma
    // あとでcreateTextNodeするのでエンティティを解除
    title = title.replace('&lt;', '<');
    title = title.replace('&gt;', '>');
    title = title.replace('&quot;', '"');
    title = title.replace('&amp;', '&');
    if (DEBUG) {
      console.log('title: ' + title);
    }
    var link = (entries[i].getElementsByTagName('link'))[0].firstChild.nodeValue;
    var date = (entries[i].getElementsByTagName('dc:date'))[0].firstChild.nodeValue;
    date = date.replace('T', ' ').replace('+09:00', '').replace(/:\d{2}$/, '');
    var image;
    var re = /^http:\/\/[^.]+\.nicovideo\.jp\/watch\/../;
    if (re.test(link)) {
      image = ['http://tn-skr.smilevideo.jp/smile?i=', link.replace(re, '')].join('');
    }
    var video = {
      'title': title,
      'link' : link,
      'date' : date,
      'image': image
    };
    videos[videos.length] = video;
  }
  this.showStatus('');
  if (doAppend) { // プレイリストの次20件をロードした時は追加するだけ
    this.appendPlaylistData(videos);
  } else { // プレイリストを新たにロードした時
    this.showPlaylistData(videos);
  }
  this.isPlaylistVisible = true;
  if (videos.length == 0) { // フィード中に1件もなかった
    this.showBoxStatus('__END__');
  } else {
    this.showBoxStatus('');
  }
};

// プレイリストデータを新たにロードして表示する
NicoClip.prototype.updatePlaylist = function() {
  if (DEBUG) {
    console.log('updatePlaylist');
  }
  // 初回実行時ははてなユーザー名を取得してからupdatePlaylist()をやり直す
  if (this.hatenaUsername == null) {
    this.getHatenaUsername(this.updatePlaylist, []);
    return;
  }
  var msg = [this.makeNicoClipLink(), 'を取得中...'].join('');
  this.showStatus(msg);
  var requestURL = [this.hatenaHost,this.hatenaUsername,'/rss?tag=',this.hatenaBookmarkTag,'&',new Date().getTime()].join('');
  if (DEBUG) {
    console.log('RSS URL: ' + requestURL);
  }
  var self = this;
  // http://b.hatena.ne.jp/user/rss?tag=nicoclip
  GM_xmlhttpRequest({
    method: 'GET',
    url:    requestURL,
    onload: function(resp){self.parsePage_playlistFeed.apply(self, [resp, requestURL, false]);}
  });
};

// 右上広告を消す
NicoClip.prototype.hideFlashAd = function() {
  var container = d.getElementById('rotation_anime_container');
  if (container)
    container.parentNode.style.visibility = 'hidden';
};

// 右上広告を表示
NicoClip.prototype.showFlashAd = function() {
  var container = d.getElementById('rotation_anime_container');
  if (container)
    container.parentNode.style.visibility = 'visible';
};

// プレイリストを隠す
NicoClip.prototype.hidePlaylist = function() {
  d.getElementById('overlay').style.display = 'none';
  this.showFlashAd();
  this.isPlaylistVisible = false;
};

// プレイリストの表示／非表示を切り替える
NicoClip.prototype.toggleShow = function() {
  if (DEBUG) {
    console.log('toggleShow(): isPlaylistVisible:' + this.isPlaylistVisible);
  }
  if (this.isPlaylistVisible) { // プレイリストが表示されている=>隠す
    this.hidePlaylist();
  } else { // プレイリストが表示されていない=>表示する
    this.updatePlaylist(); // 新たにプレイリストを取得して表示
  }
};

// はてなユーザー名を取得する
NicoClip.prototype.getHatenaUsername = function(callback, args) {
  if (typeof args == 'undefined' || args == null) {
    args = [];
  }
  if (DEBUG) {
    console.log('getHatenaUsername');
  }
  this.showStatus('はてなユーザー名を取得中...');
  var self = this;
  // はてなログインページを開いてみる
  // ログインされていればユーザー名が取得可能
  GM_xmlhttpRequest({
    method: 'GET',
    url:    'http://www.hatena.ne.jp/login',
    onload: function(resp) {
      var datastr = resp.responseText;
      if (/href="\/([^/]*)\/">プロフィール</.test(resp.responseText)) {
        self.hatenaUsername = RegExp.$1;
        if (DEBUG) {
          console.log('username: ' + self.hatenaUsername);
        }
        if (typeof callback == 'function') {
          callback.apply(self, args);
        }
      } else {
        self.showPleaseLoginMessage();
      }
    }
  });
};

// XHR用: はてなブックマークの登録終了ページがロードされた時
NicoClip.prototype.parsePage_add = function(resp) {
  if (DEBUG) {
    console.log('success');
  }
  var datastr = resp.responseText;
  // ユーザー名を取得
  if (datastr.match(/Hatena\.id\s*=\s*'([^']+)'/)) {
    this.hatenaUsername = RegExp.$1;
  }
  // ステータス表示メッセージ
  var msg = [this.makeNicoClipLink(), 'に登録しました'].join('');
  this.showStatus(msg);
  // プレイリスト表示中なら内容を更新する
  if (this.isPlaylistVisible) {
    this.updatePlaylist();
  }
};

// XHR用: はてなブックマークの登録確認ページがロードされた時
// http://b.hatena.ne.jp/add?mode=confirm&url=http%3A//www.nicovideo.jp/watch/sm500873
NicoClip.prototype.parsePage_confirm = function(resp) {
  if (DEBUG) {
    console.log('parsePage_confirm');
  }
  var datastr = resp.responseText;
  if (datastr.indexOf('<form id="add-form"') == -1) { // はてなにログインしていない
    this.showPleaseLoginMessage();
    return;
  }
  // OK、登録作業開始
  // POSTするデータを構築するためすべての <input> の値を得る
  var responseHTML = d.createElement('div');
  responseHTML.innerHTML = datastr;
  var editForm = (responseHTML.getElementsByTagName('form'))[1];
  if (!editForm) {
    alert('[error] フォームが見つかりません。NicoClipの最新版があればアップデートで直るかもしれません。');
    return;
  }
  var inputs = editForm.getElementsByTagName('input');
  var params = [];
  for (var i = 0; i < inputs.length; i++) {
    var inputType = inputs[i].getAttribute('type');
    if (inputType == 'text' || inputType == 'hidden') {
      var name = inputs[i].getAttribute('name');
      var value = inputs[i].getAttribute('value');
      // hatenaBookmarkTagを追加
      if (name == 'comment') {
        var tagIndex = value.indexOf('[' + this.hatenaBookmarkTag + ']');
        // タグが先頭にないとタグ別ページに出てこないことがあったけど今は直ってるっぽい
        if (tagIndex != -1) { // タグがすでにある
          var msg = [this.makeNicoClipLink(), 'に登録済です'].join('');
          this.showStatus(msg);
          return;
        } else { // タグがまだない
          value = '['+this.hatenaBookmarkTag+']'+value;
        }
      }
      params[params.length] = [name,'=',encodeURIComponent(value)].join('');
    }
  }
  var postBody = params.join('&');
  var self = this;
  // 登録実行
  GM_xmlhttpRequest({
    method:  'POST',
    url:     this.hatenaHost + this.hatenaUsername + '/add.edit',
    headers: {'Content-type': 'application/x-www-form-urlencoded'},
    data:    postBody,
    onload:  function(resp){self.parsePage_add.apply(self, [resp]);}
  });
};

// videoURLをプレイリストに追加する
NicoClip.prototype.addVideo = function(videoURL) {
  var msg = [this.makeNicoClipLink(), 'に登録中...'].join('');
  this.showStatus(msg);
  // 初回実行時ははてなユーザー名を取得してからやり直す
  if (this.hatenaUsername == null) {
    this.getHatenaUsername(arguments.callee, [videoURL]);
    return;
  }
  var self = this;
  // http://b.hatena.ne.jp/add?mode=confirm&url=http%3A//www.nicovideo.jp/watch/sm500873
  var requestURL = [this.hatenaHost,this.hatenaUsername,'/add.confirm?url=',encodeURIComponent(videoURL),'&',new Date().getTime()].join('');
  GM_xmlhttpRequest({
    method: 'GET',
    url:    requestURL,
    onload: function(resp){self.parsePage_confirm.apply(self, [resp]);}
  });
};

// 今開いてるページをプレイリストに追加する
NicoClip.prototype.addThisVideo = function() {
  this.addVideo(this.window.location.href);
};

// プレイリストから削除する
NicoClip.prototype.removeVideo = function(videoURL) {
  // 未実装
};

// ページ内に Add, Show/Hide ボタンを追加する
NicoClip.prototype.addButton = function() {
  // previousTDの直後にボタン等を追加する
  var previousTD = d.getElementById('mymemory_add_form').parentNode;
  if (!previousTD) {
    if (DEBUG) {
      console.log('previousTD was not found');
    }
    return;
  }
  var self = this;
  var buttonTD = d.createElement('td'); // ボタン用TD
  var status = d.createElement('span'); // ステータス表示部
  status.setAttribute('id', 'nicoclip_status');
  status.setAttribute('class', 'TXT12');
  status.style.marginLeft = '.5em';
  var addButton = d.createElement('input'); // Add ボタン
  addButton.setAttribute('type', 'button');
  addButton.setAttribute('id', 'nicoclip_add_submit');
  addButton.setAttribute('class', 'submit');
  addButton.setAttribute('value', 'Add');
  addButton.setAttribute('style', 'margin-left:3px');
  addButton.addEventListener('click', function(e){self.addThisVideo()}, false);
  var getButton = d.createElement('input'); // Show/Hide ボタン
  getButton.setAttribute('type', 'button');
  getButton.setAttribute('id', 'nicoclip_get_submit');
  getButton.setAttribute('class', 'submit');
  getButton.setAttribute('value', 'Show/Hide');
  getButton.setAttribute('style', 'margin-left:3px');
  getButton.addEventListener('click', function(e){self.toggleShow()}, false);
  buttonTD.appendChild(addButton);
  buttonTD.appendChild(getButton);
  buttonTD.appendChild(status);
  previousTD.parentNode.insertBefore(buttonTD, previousTD.nextSibling);
};

// main
var myclip = new NicoClip();
// Add, Show/Hide ボタンをページに追加
myclip.addButton();
