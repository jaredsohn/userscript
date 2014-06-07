// ==UserScript==
// @name           NicoClip::Import
// @namespace      http://userscripts.org/scripts/show/16525
// @include        http://www.nicovideo.jp/mylist/*
// @include        http://de.nicovideo.jp/mylist/*
// @include        http://es.nicovideo.jp/mylist/*
// @include        http://tw.nicovideo.jp/mylist/*
// @description    マイリストをNicoClipにインポートします
// @author         Nao Iizuka <iizuka@kyu-mu.net>
// ==/UserScript==
// 
// NicoClipと一緒に使います
// マイリスト画面に登録ボタンを出現させます
// 大変わかりにくいソースですみませんです

var SCRIPT_VERSION = "2009-07-02";
var SCRIPT_URL     = "http://userscripts.org/scripts/show/16525";
var DEBUG          = false;

var d = document;
var console = unsafeWindow.console;

var NicoClip = function() {
  this.hatenaBookmarkTag = 'nicoclip'; // はてなブックマークで付けるタグ
  this.hatenaHost = 'http://b.hatena.ne.jp/'; // はてなブックマークのサーバ
  // 全動画をインポートするXHR実行のインターバル (ms)
  this.importVideoInterval = 500;
  // 全動画に対して登録されているか確認するXHR実行のインターバル (ms)
  this.checkStatusInterval = 100;

  this.hatenaUsername = null; // はてなユーザー名
  this.isOwnMyList = false; // 自分のマイリストかどうか
  this.currentIndex = 0; // 今何番目の動画をインポートしているか
  this.currentCheckIndex = 0; // 今何番目の動画の登録状態をチェックしているか
  this.abortChecking = false; // 確認処理を中止するフラグ
};

// はてなユーザー名を取得する
NicoClip.prototype.getHatenaUsername = function(callback) {
  if (DEBUG) {
    console.log('getHatenaUsername');
  }
  var self = this;
  // はてなログインページを開いてみる
  // ログインされていればユーザー名が取得可能
  GM_xmlhttpRequest({
    method: 'GET',
    url:    'http://www.hatena.ne.jp/login',
    onload: function(resp) {
      if (/href="\/([^/]*)\/">プロフィール</.test(resp.responseText)) {
        self.hatenaUsername = RegExp.$1;
        if (DEBUG) {
          console.log('username: ' + self.hatenaUsername);
        }
        if (typeof callback == 'function') {
          callback.apply(self, [true]);
        }
      } else {
        if (DEBUG) {
          console.log('はてなにログインしていません');
        }
        callback.apply(self, [false]);
      }
    }
  });
};

// 次の動画をインポートする
// 全動画をインポートする際にsetTimeout()で呼ばれる
NicoClip.prototype.importNextVideo = function() {
  if (DEBUG) {
    console.log('importNextVideo: ' + this.currentIndex);
  }
  if (this.currentIndex < this.urls.length) {
    var i = this.currentIndex;
    var button = this.buttons[i];
    button.value = '登録中...';
    this.importVideo(this.urls[i], function(state) {
        if (state == 'DONE') {
          button.value = '登録完了';
        } else if (state == 'BOOKMARKED') {
          button.value = '登録済';
        } else {
          button.value = state;
        }
    });
    this.currentIndex++;
    var self = this;
    setTimeout(function() {self.importNextVideo.apply(self, [])}, this.importVideoInterval);
  }
};

// 全動画をインポートする
NicoClip.prototype.importAllVideos = function() {
  if (DEBUG) {
    console.log('importAllVideos: ');
  }
  this.abortChecking = true;
  if (!this.trElems) {
    this.trElems = d.getElementById('mylists').getElementsByTagName('tr');
  }
  this.currentIndex = 0;
  if (DEBUG) {
    console.log('import start: ' + this.urls.length + ' urls');
  }
  this.importNextVideo();
};

// XHR用: はてなブックマークの登録終了ページがロードされた時
// 最終的に function callback(msg) が呼ばれる。msgは以下の通り。
//  BOOKMARKED  登録済の場合
//  DONE        登録が完了した場合
NicoClip.prototype.parsePage_add = function(resp, callback) {
  if (DEBUG) {
    console.log('success');
  }
  if (callback) {
    callback.apply(this, ['DONE']);
  }
};

// XHR用: 登録確認ページ
// 最終的に function callback(msg) が呼ばれる。msgは以下の通り。
//  BOOKMARKED  登録済の場合
//  DONE        登録が完了した場合
NicoClip.prototype.parsePage_confirm = function(resp, callback) {
  if (DEBUG) {
    console.log('parsePage_confirm');
  }
  var datastr = resp.responseText;
  if (datastr.indexOf('<form id="add-form"') == -1) { // はてなにログインしていない
    this.addHatenaLoginLink();
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
  for (var i = 0, l = inputs.length; i < l; i++) {
    var inputType = inputs[i].getAttribute('type');
    if (inputType == 'text' || inputType == 'hidden') {
      var name = inputs[i].getAttribute('name');
      var value = inputs[i].getAttribute('value');
      // hatenaBookmarkTagを追加
      if (name == 'comment') {
        var tagIndex = value.indexOf('[' + this.hatenaBookmarkTag + ']');
        // タグが先頭にないとタグ別ページに出てこないことがあったけど今は直ってるっぽい
        if (tagIndex != -1) { // タグがすでにある
          callback.apply(this, ['BOOKMARKED']);
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
    onload:  function(resp) {self.parsePage_add.apply(self, [resp, callback]);}
  });
  responseHTML = null;
};

// urlに指定された動画をインポートする
// 最終的に function callback(msg) が呼ばれる。msgは以下の通り。
//  BOOKMARKED  登録済の場合
//  DONE        登録が完了した場合
NicoClip.prototype.importVideo = function(url, callback) {
  if (DEBUG) {
    console.log('importVideo: ' + url);
  }
  var self = this;
  GM_xmlhttpRequest({
    method:'GET',
    url:this.hatenaHost+this.hatenaUsername+'/add.confirm?url='+encodeURIComponent(url)+'&'+new Date().getTime(),
    onload:function(details) { self.parsePage_confirm.apply(self, [details, callback]); }
  });
};

// XHR用: はてブ登録確認ページ
// 最終的に function callback(state) が呼ばれる。stateは以下の通り。
//  NEW  未登録の場合
//  BOOKMARKED  登録済の場合
NicoClip.prototype.parsePage_checkStatus = function(resp, callback) {
  if (DEBUG) {
    console.log('parsePage_checkStatus');
  }
  if (this.abortChecking) { // チェック中止フラグが立っていたら終了
    if (DEBUG) {
      console.log('Abort cheking: checkStatus');
    }
    return;
  }
  var datastr = resp.responseText;
  if (datastr.indexOf('<form id="add-form"') == -1) { // はてなにログインしていない
    this.addHatenaLoginLink();
    return;
  }
  if (datastr.indexOf('ブックマークに追加') != -1) {
    callback.apply(this, ['NEW']);
    return;
  }
  var responseHTML = d.createElement('div');
  responseHTML.innerHTML = datastr;
  var editForm = (responseHTML.getElementsByTagName('form'))[1];
  if (!editForm) {
    return;
  }
  var inputs = editForm.getElementsByTagName('input');
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
          if (callback) {
            callback.apply(this, ['BOOKMARKED']);
          }
          return;
        }
        break;
      }
    }
  }
  // まだ登録されていない
  if (callback) {
    callback.apply(this, ['NEW']);
  }
};

// videoURLに指定された動画が登録されているかどうか確認する
// 最終的に function callback(state) が呼ばれる。stateは以下の通り。
//  NEW  未登録の場合
//  BOOKMARKED  登録済の場合
NicoClip.prototype.checkStatus = function(videoURL, callback) {
  if (DEBUG) {
    console.log('checkStatus: ' + videoURL);
  }
  var self = this;
  GM_xmlhttpRequest({
    method:'GET',
    url:this.hatenaHost+this.hatenaUsername+'/add.confirm?url='+encodeURIComponent(videoURL)+'&'+new Date().getTime(),
    onload:function(details) { self.parsePage_checkStatus.apply(self, [details, callback]); }
  });
};

// 次の動画の登録状態を確認する
NicoClip.prototype.checkNextStatus = function() {
  if (DEBUG) {
    console.log('checkNextStatus: ' + this.currentCheckIndex);
  }
  if (this.abortChecking) { // チェック中止フラグが立っていたら終了
    if (DEBUG) {
      console.log('Abort checking: checkNextStatus');
    }
    return;
  }
  if (this.currentCheckIndex < this.urls.length) {
    var i = this.currentCheckIndex;
    var self = this;
    this.buttons[i].value = '確認中...';
    this.checkStatus(this.urls[i], function(state) {
        if (state == 'BOOKMARKED') {
          self.buttons[i].value = '登録済';
        } else if (state == 'NEW') {
          self.buttons[i].value = 'Add';
        } else {
          self.buttons[i].value = state;
        }
    });
    this.currentCheckIndex++;
    setTimeout(function() {self.checkNextStatus.apply(self, [])}, this.checkStatusInterval);
  }
};

// 全動画の登録状態を確認する
NicoClip.prototype.checkAllStatus = function() {
  if (!this.trElems) {
    this.trElems = d.getElementById('mylists').getElementsByTagName('tr');
  }
  this.currentCheckIndex = 0;
  if (DEBUG) {
    console.log('checking ' + this.urls.length + ' urls');
  }
  this.checkNextStatus();
};

// 各動画の横に登録ボタンを追加
NicoClip.prototype.insertAddButton = function() {
  if (DEBUG) {
    console.log('insertAddButton');
  }
  if (!this.trElems) {
    this.trElems = d.getElementById('mylists').getElementsByTagName('tr');
  }
  var self = this;
  this.buttons = [];
  this.urls = [];
  var index = 0;
  for (var i = 0; i < this.trElems.length; i++) {
    var tdElems = this.trElems[i].getElementsByTagName('td');
    if (tdElems.length != 2) {
      this.isOwnMyList = true;
    }
    var aElems = this.trElems[i].getElementsByTagName('a');
    if (aElems.length == 0) {
      continue;
    }
    var link = aElems[0].getAttribute('href');
    this.urls[index] = 'http://www.nicovideo.jp/' + link;
    var tdElem = d.createElement('td');
    var addButton = d.createElement('input');
    this.buttons[index] = addButton;
    tdElem.setAttribute('align', 'right');
    this.trElems[i].appendChild(tdElem);
    addButton.setAttribute('type', 'button');
    addButton.setAttribute('class', 'submit');
    addButton.setAttribute('value', '登録');
    addButton.setAttribute('nicoclip_button_index', index);
    addButton.addEventListener('click', function(e) {
        var src = this;
        src.value = '登録中...';
        var buttonIndex = this.getAttribute('nicoclip_button_index');
        if (DEBUG) {
          console.log('buttonIndex: ' + buttonIndex);
        }
        self.importVideo.apply(self, [self.urls[buttonIndex], function(state) {
          if (state == 'DONE') {
            src.value = '登録完了';
          } else if (state == 'BOOKMARKED') {
            src.value = '登録済';
          } else {
            src.value = state;
          }
        }]);
    }, false);
    tdElem.appendChild(addButton);
    index++;
  }
};

// 「はてなにログインしてください」と表示
NicoClip.prototype.addHatenaLoginLink = function() {
  if (DEBUG) {
    console.log('addHatenaLoginLink');
  }
  var sortform = d.getElementById('sortform');
  if (sortform && !d.getElementById('nicoclip_hatenalogin')) {
    var buttonTR = (sortform.getElementsByTagName('tr'))[0];
    var buttonTD = d.createElement('td');
    buttonTD.setAttribute('id', 'nicoclip_hatenalogin');
    buttonTD.setAttribute('class', 'TXT12');
    buttonTD.setAttribute('align', 'right');
    buttonTD.setAttribute('style', 'padding-left:5px');
    var anchor = d.createElement('a');
    anchor.setAttribute('href', 'https://www.hatena.ne.jp/login?location=http%3A%2F%2Fb.hatena.ne.jp%2F');
    anchor.setAttribute('target', '_blank');
    anchor.appendChild(d.createTextNode('ログイン'));
    var strong = d.createElement('strong');
    strong.setAttribute('style', 'color:red');
    buttonTD.appendChild(strong);
    strong.appendChild(d.createTextNode('NicoClip >> はてなに'));
    strong.appendChild(anchor);
    strong.appendChild(d.createTextNode('してください'));
    buttonTR.appendChild(buttonTD);
  }
};

// マイリストページに登録ボタンを追加
NicoClip.prototype.addImportButton = function() {
  if (DEBUG) {
    console.log('addImportButton');
  }
  var buttonTD = d.createElement('td');
  buttonTD.setAttribute('class', 'TXT12');
  buttonTD.setAttribute('align', 'right');
  var sortform = d.getElementById('sortform');
  if (sortform) {
    var buttonTR = (sortform.getElementsByTagName('tr'))[0];
    var buttonInput = d.createElement('input');
    buttonInput.setAttribute('type', 'button');
    buttonInput.setAttribute('class', 'submit');
    buttonInput.setAttribute('value', 'すべてをNicoClipにインポート');
    buttonInput.setAttribute('style', 'margin-left:5px;margin-right:3px');
    var anchor = d.createElement('a');
    anchor.setAttribute('href', [this.hatenaHost, this.hatenaUsername, '/', this.hatenaBookmarkTag, '/'].join(''));
    anchor.setAttribute('target', '_blank');
    anchor.appendChild(d.createTextNode('>> 確認'));
    var self = this;
    buttonInput.addEventListener('click', function(e) {self.importAllVideos.apply(self, [])}, false);
    buttonTD.appendChild(buttonInput);
    buttonTD.appendChild(anchor);
    buttonTR.appendChild(buttonTD);
    if (DEBUG) {
      console.log('isOwnMyList: ' + this.isOwnMyList);
    }
    // 自分のマイリストでなければ
//    if (!this.isOwnMyList) {
      // Addボタンを追加
      this.insertAddButton();
      // 全動画の登録状態を確認
      this.checkAllStatus();
//    }
  }
};

var myclip = new NicoClip();
// はてなユーザー名を取得
myclip.getHatenaUsername(function(isLoggedIn) {
  if (isLoggedIn) { // ログインしていれば
    // インポートボタンを追加
    myclip.addImportButton();
  } else {
    // はてなにログインしてください
    myclip.addHatenaLoginLink();
  }
});
