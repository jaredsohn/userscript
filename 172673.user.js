// ==UserScript==
// @name    Feedeen Full Feed
// @description  Feedeenでアイテム記事の全文を表示します。
// @id         FeedeenFullFeed
// @homepage   http://userscripts.org/scripts/show/172673
// @namespace  http://userscripts.org/scripts/show/172673
// @updateURL  http://userscripts.org/scripts/show/172673.meta.js
// @include    http://feedeen.com/d
// @grant    GM_addStyle
// @grant    GM_log
// @grant    GM_openInTab
// @grant    GM_registerMenuCommand
// @grant    GM_setClipboard
// @grant    GM_xmlhttpRequest
// @version    0.21
// ==/UserScript==

// Based on "Feedly Full Feed"    : http://userscripts.org/scripts/show/171868
// Based on "InoReader Full Feed" : https://userscripts.org/scripts/show/172238
// Thanks fxwiki : http://fxwiki.blog63.fc2.com/

(function() {
// == [CSS] =====================================
var CSS = [
  '.fd_itemlist .expanded .fd_sitename img { border: none; vertical-align: text-top; }',
  '.fd_itemlist .expanded .fd_sitename span a { margin: 0 3px; }',
  '.fd_itemlist .expanded .clear { font-size: inherit !important; height: auto !Important; width: auto !important; }',
  '.gm_fullfeed_loading { border-color: limegreen !important; }',
  '.gm_fullfeed_loaded * { position: static !important; }',
  '.gm_fullfeed_opened { border-color: gold !important; }',
  '.gm_fullfeed_ap_on { color: #009900; }',
  '.gm_fullfeed_ap_off { color: #990000; }',
  '.gm_fullfeed_pager { margin: 3em 0; }',
  '.gm_fullfeed_pager hr { margin-bottom: 5px; }',
  '.gm_fullfeed_pager_differenthost { margin-left: 2em; font-weight: bold; }',
  '.gm_fullfeed_entry_url { font-size: 80%; }',
  '.gm_fullfeed_hidden { display: none; }',
  '#gm_fullfeed_message { position: fixed; top: 4px; right: 250px; z-index: 90900; color: black; background-color: #FFEEAA; box-shadow: 1px 1px 2px #CCCCCC; padding: 4px 8px; }',
  '.gm_fullfeed_warning { background-color: #FF9999 !important; }',
  '.gm_fullfeed_checked { margin-right: 4px; }',
  '.gm_fullfeed_checked_icon { color: white; font-size: 0.8em; margin-left: 0.5em; padding: 0 4px; text-decoration:none; cursor: pointer; position: relative; top: 0.3em; vertical-align: top; border-radius: 3px; box-shadow: 1px 1px 2px #CCCCCC; }',
  '.gm_fullfeed_checked_icon:active { box-shadow: none; }',
  '.gm_fullfeed_checked_icon_info { background: #FFCC00; background: linear-gradient(top, #FFCC00, #FF9900); border: 1px solid #EE8800; }',
  '.gm_fullfeed_checked_icon_info:hover { background: #FFEE00; background: linear-gradient(top, #FFEE00, #FFBB00); border: 1px solid #EEAA00; }',
  '.gm_fullfeed_checked_icon_noinfo { background: #CCCCCC; background: linear-gradient(top, #CCCCCC, #999999); border: 1px solid #888888; }',
  '.gm_fullfeed_checked_icon_noinfo:hover { background: #EEEEEE; background: linear-gradient(top, #EEEEEE, #BBBBBB); border: 1px solid #AAAAAA; }',
  '.gm_fullfeed_checked_icon_next { background: #77CC77; background: linear-gradient(top, #77CC77, #55AA55); border: 1px solid #449944; }',
  '.gm_fullfeed_checked_icon_next:hover { background: #99EE99; background: linear-gradient(top, #99EE99, #77CC77); border: 1px solid #66BB66; }',
  '.gm_fullfeed_checked_icon_nonext { background: #BBEEBB; background: linear-gradient(top, #BBEEBB, #99CC99); border: 1px solid #88BB88; }',
  '.gm_fullfeed_checked_icon_nonext:hover { background: #DDFFDD; background: linear-gradient(top, #DDFFDD, #BBEEBB); border: 1px solid #AADDAA; }',
  '.gm_fullfeed_checked_icon_as_next { background: #7777CC; background: linear-gradient(top, #7777CC, #5555AA); border: 1px solid #444499; }',
  '.gm_fullfeed_checked_icon_as_next:hover { background: #9999EE; background: linear-gradient(top, #9999EE, #7777CC); border: 1px solid #6666BB; }',
  '.gm_fullfeed_checked_icon_as_nonext { background: #BBBBEE; background: linear-gradient(top, #BBBBEE, #9999CC); border: 1px solid #8888BB; }',
  '.gm_fullfeed_checked_icon_as_nonext:hover { background: #DDDDFF; background: linear-gradient(top, #DDDDFF, #BBBBEE); border: 1px solid #AAAADD; }',
  '.gm_fullfeed_socialicon { font-size: 12px; vertical-align: middle; }',
  '#gm_fullfeed_settings { background-color: #FFCC66; z-index: 90000; position: absolute; top: 8px; left: 8px; padding: 4px; width: 600px; border-radius: 4px; }',
  '#gm_fullfeed_settings input[type="text"], #gm_fullfeed_settings textarea { padding: 2px; }',
  '#gm_fullfeed_settings textarea { background-color: white; }',
  '#gm_fullfeed_settings fieldset { border: 1px solid #FFCC66; margin: 4px 2px; background: none !important; }',
  '#gm_fullfeed_settings-header { padding: 0 4px 8px 4px; }',
  '#gm_fullfeed_settings-header_title { font-size: 120%; font-weight: bold; }',
  '#gm_fullfeed_settings-header_title a { color: #224488; text-decoration: none; }',
  '#gm_fullfeed_settings-header_button { font-size: 90%; float: right; }',
  '#gm_fullfeed_settings-header input { margin: 0 4px; width: 7em; }',
  '#gm_fullfeed_settings-tab { overflow: auto; margin: 0; }',
  '#gm_fullfeed_settings-tab .selected { padding: 4px 8px 6px 8px; background-color: #FFF7D7; color: black; text-decoration: none; }',
  '.gm_fullfeed_settings-title { float: left; padding: 4px 8px; margin: 0; color: #224488; cursor: pointer; text-decoration: underline; font-size: 100%; }',
  '#gm_fullfeed_settings-list { background-color: #FFF7D7; padding: 8px 4px 4px 4px; margin: 0; border-radius: 0 0 4px 4px; }',
  '#gm_fullfeed_settings-footer { text-align: right; padding: 4px; }',
  '.gm_fullfeed_settings-footer input { margin: 0 4px; }',
  '#gm_fullfeed_settings-ok { padding: 0 2em; }',
  '#gm_fullfeed_settings-general_key, #gm_fullfeed_settings-general_apheight { width: 7ex; text-align: center; margin-right: 1ex; ime-mode: disabled !important; }',
  '#gm_fullfeed_settings-general_keyhelpicon { margin-left: 1em; }',
  '#gm_fullfeed_settings-general_keyhelpbody { margin-top: 0.5em; display: none; }',
  '#gm_fullfeed_settings-general_cantdisplay { margin-bottom: 0.5em; }',
  '#gm_fullfeed_settings-general_notread { width: 536px; margin-bottom: 0.8em;}',
  '#gm_fullfeed_settings-siteinfo div { margin: 0 0 1em 0; }',
  '.gm_fullfeed_settings-siteinfo_link { color: #224488; padding: 0 0.5em; cursor: pointer; }',
  '#gm_fullfeed_settings-siteinfo .selected { color: black; border-bottom: medium solid #FFCC66; }',
  '#gm_fullfeed_settings-siteinfo fieldset { display: none; }',
  '#gm_fullfeed_settings-siteinfo textarea { width: 560px; height: 10em; }',
  '.gm_fullfeed_settings-autoload_title { width: 450px; margin-right: 8px; }',
  '.gm_fullfeed_settings-autoload_list { width: 560px; height: 8em; margin-top: 8px; }',
  '#gm_fullfeed_settings-siteinfo_disableitemlist { width: 560px; overflow: hidden; white-space: nowrap; }',
  '#gm_fullfeed_settings-etc button { margin: 0 4px; letter-spacing: 1px; }',
  '.gm_fullfeed_siteinfourl_list fieldset { background-color: #FFF7D7; }',
  '#gm_fullfeed_settings-security input[type="text"], #gm_fullfeed_settings-etc input[type="text"] { width: 560px; }',
  '.gm_fullfeed_twitter, .gm_fullfeed_delicious, .gm_fullfeed_facebook, .gm_fullfeed_hatena { position: relative; top: -2px; padding: 2px 4px; }',
  '.gm_fullfeed_twitter img, .gm_fullfeed_delicious img, .gm_fullfeed_facebook img, .gm_fullfeed_hatena img { width: 16px; height: 16px; }',
  '.gm_fullfeed_twitter span, .gm_fullfeed_delicious span, .gm_fullfeed_facebook span, .gm_fullfeed_hatena span { padding: 0px 3px; }',
  '.gm_fullfeed_twitter1 span { color: #33CCFF !important; }',
  '.gm_fullfeed_twitter2 span { color: #22AAFF !important; }',
  '.gm_fullfeed_twitter3 span { color: #1188FF !important; }',
  '.gm_fullfeed_twitter4 span { color: #0066FF !important; }',
  '.gm_fullfeed_delicious span { color: white !important; }',
  '.gm_fullfeed_delicious1 span { background-color: #73ADFF !important; }',
  '.gm_fullfeed_delicious2 span { background-color: #5592E9 !important; }',
  '.gm_fullfeed_delicious3 span { background-color: #3274D0 !important; }',
  '.gm_fullfeed_delicious4 span { background-color: #2261A0 !important; }',
  '.gm_fullfeed_hatena1 span { color: #FF6563 !important; background-color: #FFF0F0 !important; }',
  '.gm_fullfeed_hatena2 span { color: #FF4444 !important; background-color: #FFEEEE !important; }',
  '.gm_fullfeed_hatena3 span { color: #FF2222 !important; background-color: #FFDDDD !important; }',
  '.gm_fullfeed_hatena4 span { color: #FF0000 !important; background-color: #FFCCCC !important; }'
].join('');

// == [Locale] ==================================
var locale_ja = [
  '全文を読み込み中…',
  '全文を読み込み中… Auto Search…',
  '全文を読み込み中… 完了',
  'サイト情報が古いか間違っているため、全文を表示できません',
  '次のページを読み込み中…',
  '次のページを読み込み中… 完了',
  '最後のページを読み込み中… 完了',
  '次のページは見つかりません',
  '読み込みをブロックしました',
  'すでに全文を読み込みました',
  '全文を表示するための情報が見つからないため、新しいタブで開きました',
  'キャッシュをリセットしています…',
  'キャッシュをリセットしています… 完了',
  'ポップアップできません',
  'エラー：サーバーからキャッシュを読み込めませんでした',
  'キャッシュをリセットしますか？',
  'キャッシュを消去しますか？',
  'エラー：JSONPはサポートしていません',
  '全文読み込み',
  'はてなブックマーク',
  'livedoor クリップ',
  '設定',
  'キャンセル',
  'ショートカットキー',
  'キー',
  'キーコード',
  'Auto Load 切替',
  'autoPagerize 切替',
  '設定欄を表示',
  'キャッシュリセット',
  'Full Feed URL',
  'AutoPagerize URL',
  'Full Feed ユーザーSITE_INFO',
  'AutoPagerize ユーザーSITE_INFO',
  '次のページを読み込み中… Auto Search… 完了',
  '最後のページを読み込み中… Auto Search… 完了',
  'ホワイトリスト',
  'フィードタイトル (正規表現)',
  '追加',
  'ホワイトリスト/ブラックリストに追加',
  'クリック',
  '次のページを読み込む',
  'noscriptタグ内のコンテンツを表示',
  '自動的に全文を読み込むアイテム',
  'すべて',
  'ホワイトリストのみ',
  'なし',
  '全文を読み込まないアイテム (正規表現)',
  '読み込まない代わりに新しいタブで開く',
  '新しいタブで開きました',
  'デバッグログ',
  '全文を読み込み中… Auto Search… 完了',
  'インラインフレームを取り除く',
  'エラー：dom.storage.enabledをtrueに設定してください',
  'お待ちください…',
  'ソーシャルアイコンを表示',
  'Yahoo!ブックマーク',
  'Buzzurl [バザール]',
  'FC2ブックマーク',
  '警告：次ページを継ぎ足してもよろしいですか？\n\n今のページ：',
  '\n次のページ：',
  '次ページを継ぎ足しません',
  '次ページの継ぎ足しを許可するURL (正規表現)',
  '次ページの継ぎ足しを禁止するURL (正規表現)',
  'サイト情報がなくても全文の読み込みを試みる',
  '表示を許可するインラインフレームのソースURL (正規表現)',
  '設定をエクスポートしてクリップボードへコピーしますか？',
  'クリップボードへコピーしました',
  '設定をエクスポートしました。\n以下の文字列をコピーしてください\n\n',
  'エクスポートした文字列を入力してください',
  '設定をインポートしました',
  'インポートできません',
  '設定をリセットしますか？',
  '設定をリセットしました',
  'サイト情報が見つからないため全文を表示できません',
  '全文を表示できないときは新しいタブで開く',
  'ブラックリスト',
  'ブラックリスト以外'
];
var locale_en = [
  'Loading Full Feed...',
  'Loading Full Feed... Auto Search...',
  'Loading Full Feed... Done',
  'This site info is unmatched to this entry',
  'Loading next page...',
  'Loading next page... Done',
  'Loading last page... Done',
  'Next page is not found',
  'Blocked loading full story',
  'This entry has been already loaded',
  'Information to display full story is not found, Opened in new tab',
  'Resetting cache. Please wait...',
  'Resetting cache. Please wait... Done',
  'Cannot popup',
  'Cache Request Error',
  'Reset cache?',
  'Delete cache?',
  'Error: not support JSONP',
  'read full story',
  'Hatena Bookmark',
  'livedoor clip',
  'Settings',
  'Cancel',
  'shortcut key',
  'key',
  'key code',
  'change Auto Load',
  'change autoPagerize',
  'view settings',
  'reset cache',
  'Full Feed URL',
  'AutoPagerize URL',
  'Full Feed user SITE_INFO',
  'AutoPagerize user SITE_INFO',
  'Loading next page... Auto Search... Done',
  'Loading last page... Auto Search... Done',
  'Whitelist',
  'Feed title (regular expression)',
  'Add',
  'Add whitelist/blacklist',
  'Click',
  'Loading next page',
  'Display content in noscript tags',
  'Read full story automatically',
  'All',
  'Whitelist only',
  'None',
  'Item which does not read full story (regular expression)',
  'Instead of not reading, open in new tab',
  'Opened in new tab',
  'Debug log',
  'Loading Full Feed... Auto Search... Done',
  'Remove iframe',
  'Error: Please set "dom.storage.enabled" in "true".',
  'Wait...',
  'Display social icon',
  'Yahoo! JAPAN Bookmarks',
  'Buzzurl',
  'FC2 Bookmark',
  'Warning: Add the next page?\n\nreading page: ',
  '\nnext page: ',
  'Do not add the next page',
  'URL to allow the addition of the next page (regular expression)',
  'URL to deny the addition of the next page (regular expression)',
  'Try loading full story without a site info',
  'The source URL of the inline frame to display (regular expression)',
  'Export settings and copy it to clipboard?',
  'Copied it to clipboard',
  'Exported settings.\nPlease copy the following character string\n\n',
  'Please input the character string that exported',
  'Imported settings',
  'Cannot import',
  'Reset settings?',
  'Reset settings',
  'Site info to display full story is not found',
  'Open in new tab if cannot display full story',
  'blacklist',
  'Except blacklist'
];
var loc = (window.navigator.language === 'ja') ? locale_ja : locale_en;

// == [Application] =============================
try { if (typeof localStorage !== 'object') return window.alert(loc[53]); }
catch(e) { return window.alert(loc[53]); }
var $id = function(id) { return document.getElementById(id); };
var $ids = function(id) { return $id('gm_fullfeed_settings-' + id); };

var FullFeed = function(info, c, flag) {
//console.log('FullFeed function');
  state = 'ready';
  this.itemInfo = c;
  this.info = info;
  this.requestURL = this.itemInfo.itemURL;
  var u = this.requestURL;
  if (/^http:\/\/rd\.yahoo\.co\.jp\/rss\/l\/.+/.test(u)) {
    if (/\/\*\-http/.test(u))
      this.requestURL = decodeURIComponent(u.slice(u.indexOf('*-http')+2));
    else if (/\/\*http/.test(u))
      this.requestURL = decodeURIComponent(u.slice(u.indexOf('*http')+1));
  }
    this.itemInfo.item_body = returnFdExpanded().querySelector('.fd_body');
//console.log(this.itemInfo.item_body);
  var encode = this.info.enc || document.characterSet;
  if (flag === 'next' && this.itemInfo.innerContents) {
  this.itemInfo.innerContents.className.split(/\s+/).some(function(i) {
      if (!/^entry|^gm_|^http/.test(i)) {
        encode = i;
        return true;
      }
    });
  }
  this.mime = 'text/html; charset=' + encode;
  if (flag === 'search') this.request('HEAD', c);
  else this.request('GET', c);
  if (debugLog) {
    try {
      GM_log(new Date());
       GM_log('Item Title: ' + c.item.title);
      GM_log('Item URL: ' + c.item.url);
      GM_log('Feed URL: ' + c.feed.url);
      GM_log('FullFeed URL: ' + info.url);
      GM_log('FullFeed XPath: ' + info.xpath);
      GM_log('FullFeed Encode: ' + info.enc);
      GM_log(this.info);
    } catch(e) {}
  }
};

FullFeed.prototype.request = function(m, c) {
//console.log('request:');
  if (!this.requestURL) return;
  state = 'request';
  var self = this;
  var retry = 0;
  var opt = {
    method: m,
    url: this.requestURL,
    overrideMimeType: this.mime,
    onerror: function() {
      state = null;
      self.requestError.apply(self, ['Request Error']);
    },
    onload: function(res) {
      if ((res.status >= 301 && res.status <= 303) || res.status === 307) {
        try {
          opt.url = /\sLocation:\s+(\S+)/.exec(res.responseHeaders)[1];
          GM_xmlhttpRequest(opt);
          return;
        } catch(er) {
          state = null;
          self.requestError.apply(self, ['Request Error : ' + res.status]);
          return;
        }
      } else if (res.status === 200) {
        if (res.finalUrl) opt.url = this.requestURL = res.finalUrl;
        readingPageUrl = c.innerContents.className.split(/\s+/).filter(function(i) {
          return new RegExp(/^http/).test(i);
        }).slice(-1);
        readingPageUrl = (readingPageUrl.length) ? readingPageUrl.toString() : opt.url;
        var cset = /content-type:\s?\S+\s?charset=\S+/i.exec(res.responseHeaders);
        if (cset) cset = cset[0].slice(cset[0].lastIndexOf('=') + 1);
        if (opt.method === 'GET') {
          if (cset && !new RegExp(cset, 'i').test(self.info.enc) && retry < 2) {
            self.info.enc = cset;
            opt.overrideMimeType = 'text/html; charset=' + cset;
            GM_xmlhttpRequest(opt);
            retry ++;
          } else {
            var h1 = readingPageUrl.split('/')[2], h2 = opt.url.split('/')[2];
            var re = new RegExp(st.allownexturl, 'i');
            if (h1 === h2 || (st.allownexturl && re.test(readingPageUrl)))
              self.requestLoad.call(self, res, c);
            else if (window.confirm(loc[59] + readingPageUrl + loc[60] + opt.url))
              self.requestLoad.call(self, res, c);
            else self.requestEnd(c, false, true);
          }
        } else if (opt.method === 'HEAD') {
          if (cset && st.autosearch) {
            self.info.enc = cset;
            opt.method = 'GET';
            opt.overrideMimeType = 'text/html; charset=' + cset;
            message(loc[1], -1);
            loadingStyle('add', c.articleContainer);
            GM_xmlhttpRequest(opt);
          } else {
            state = null;
            if (st.cantdisplay) {
              message(loc[10], 2000);
              loadingStyle('open', c.articleContainer);
              window.setTimeout(function() {
                GM_openInTab(opt.url, true);
              }, 10);
              window.setTimeout(function() {
                loadingStyle('remove', c.articleContainer);
              }, 1000);
            } else message(loc[74], 3000);
          }
        }
      } else {
        state = null;
        var stat = (res.status) ? ' : ' + res.status : '';
        self.requestError.apply(self, ['Request Error' + stat]);
      }
    }
  };
  if (opt.method === 'HEAD') message(loc[54], -1);
  else if (opt.method === 'GET') {
    message(loc[0], -1);
    loadingStyle('add', c.articleContainer);
  }
  if (opt.url.indexOf('http:') !== 0 && this.info.base)
    opt.url = pathToURL(this.info.base, opt.url);
  GM_xmlhttpRequest(opt);
};

FullFeed.prototype.requestLoad = function(res, c) {
  state = 'loading';
  var text = res.responseText;
  var html = createHTMLDocumentByString(text);
  var tmpElm = (this.info.xpath) ? getElementsByXPath(this.info.xpath, html) : null;
  if (tmpElm) {
    var doc, tmpNode = document.createDocumentFragment().appendChild(document.createElement('div'));
    try {
      doc = document.cloneNode(false);
      doc.appendChild(doc.importNode(document.documentElement, false));
    } catch(e) {
      doc = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
    }
    try {
      tmpNode = doc.adoptNode(tmpNode);
    } catch(e) {
      tmpNode = doc.importNode(tmpNode, true);
    }
    tmpElm.forEach(function(elm) {
      tmpNode.appendChild(elm);
    });
    if (tmpNode.innerHTML) text = tmpNode.innerHTML;
  }
  ['head', 'isindex', 'link', 'script', 'style', 'title'].forEach(function(t) {
    var r = new RegExp('<(?:!--\\s*)?' + t + '(?:\\s[^>]+?)?>[\\S\\s]*?<\\/' + t + '\\s*>', 'gi');
    text = text.replace(r, '');
  });
  var re = /(<[^>]+?[\s"'])(?:on(?:(?:un)?load|(?:dbl)?click|mouse(?:down|up|over|move|out)|key(?:press|down|up)|focus|blur|submit|reset|select|change)|submit|target|usemap)\s*=\s*(?:"(?:\\"|[^"])*"?|'(\\'|[^'])*'?|[^\s>]+(?=[\s>]|<\w))(?=[^>]*?>|<\w|\s*$)/gi;
  while (re.test(text)) {
    text = text.replace(re, '$1');
  }
  if (st.noscripttag) text = text.replace(/<noscript(?:\s[^>]+?)?>([\S\s]*?)<\/noscript\s*>/gi, '<div>$1</div>');
  else text = text.replace(/<noscript(?:\s[^>]+?)?>([\S\s]*?)<\/noscript\s*>/gi, '');
  var htmldoc = createHTMLDocumentByString(text);
  if (st.iframetag) {
    var iframe = getElementsByXPath('//iframe', htmldoc);
    if (iframe) iframe.forEach(function(a) {
      if (!st.allowiframeurl || (a.src && !new RegExp(st.allowiframeurl).test(a.src))) a.parentNode.removeChild(a);
    });
  }
  removeXSSRisks(htmldoc);
  if (res.finalUrl) this.requestURL = res.finalUrl;
  relativeToAbsolutePath(htmldoc, this.requestURL);
  var self = this, entry;
  FullFeed.documentFilters.forEach(function(filter) {
    filter(htmldoc, this.requestURL, this.info);
  });
  try {
    entry = getElementsByXPath('//html/child::node()', htmldoc);
  } catch(er1) {
    message(er1, 5000, 'warning');
    return;
  }
  if (!tmpElm) {
    if (st.autosearch) {
      if (debugLog) try { GM_log('Auto Search'); } catch(er2) {}
      message(loc[1], -1);
      entry = searchEntry(htmldoc);
    } else {
      state = null;
      window.setTimeout(function() {
        GM_openInTab(self.requestURL, true);
      }, 10);
      window.setTimeout(function() {
        loadingStyle('remove', c.articleContainer);
      }, 1000);
      return message(loc[10], 2000);
    }
  }
  if (entry) {
	console.log('entry: ' + entry);
	console.log(c.innerContents);
    if (!hasClass(c.innerContents, 'gm_fullfeed_loaded')) {
		console.log('gmfullfeedloadedいない！けす！');
      this.removeEntry();
	 } else {
		console.log('gmfullfeedloadedいない！');
		console.log(c.innerContents);
	}
    entry = this.addEntry(entry, c);
    if (!tmpElm && st.autosearch) this.requestEnd(c, true);
    else this.requestEnd(c);
  } else {
    state = null;
    this.requestError(loc[3]);
  }
};

FullFeed.prototype.requestEnd = function(c, as, halt) {
//console.log('requestEnd:');
  state = 'loaded';
  window.setTimeout(function() {
    state = 'wait';
  }, 1000);
  loadingStyle('remove', c.articleContainer);
  addClass(c.innerContents, this.info.enc || document.characterSet);
  removeClass(c.innerContents, 'entry-body-empty');
  addClass(c.innerContents, 'gm_fullfeed_loaded');
  toggleClass(c.innerContents, this.requestURL);
  var el = returnFdExpanded() .querySelector('span.gm_fullfeed_checked_icon'); // Feedeen
  FullFeed.checkNextPage(c.innerContents);
  if (c.innerContents.className.split(/\s+/).filter(function(i) {
    return new RegExp(/^http/).test(i);
  }).length > 1) {
    if (nextPageLink) {
     if (as) message(loc[34], 3000);
     else message(loc[5]); 
    } else {
      if (as) message(loc[35], 3000);
      else message(loc[6]);
      if (el) {
        removeClass(el, 'gm_fullfeed_checked_icon_next');
        removeClass(el, 'gm_fullfeed_checked_icon_as_next');
        if (as) addClass(el, 'gm_fullfeed_checked_icon_as_nonext');
        else addClass(el, 'gm_fullfeed_checked_icon_nonext');
        el.title = 'Ctrl+' + loc[40] + ' : ' + loc[39];
      }
    }
  } else {
    if (as) message(loc[51], 3000);
    else message(loc[2]);
    if (el) {
      removeClass(el, 'gm_fullfeed_checked_icon_info');
      removeClass(el, 'gm_fullfeed_checked_icon_noinfo');
      if (nextPageLink) {
        if (as) addClass(el, 'gm_fullfeed_checked_icon_as_next');
        else addClass(el, 'gm_fullfeed_checked_icon_next');
        el.title = loc[40] + ' : ' + loc[41] + ' / Ctrl+' + loc[40] + ' : ' + loc[39];
        if (st.autopagerize) {
          window.setTimeout(function() {
            FullFeed.checkScroll();
          }, 2000);
        }
      } else {
        if (as) addClass(el, 'gm_fullfeed_checked_icon_as_nonext');
        else addClass(el, 'gm_fullfeed_checked_icon_nonext');
        el.title = 'Ctrl+' + loc[40] + ' : ' + loc[39];
      }
    }
  }
  if (halt) message(loc[61], 3000);
};

FullFeed.checkScroll = function() {
//console.log('checkScroll');
  if (!nextPageLink || (state && (state !== 'loaded' && state !== 'wait'))) return;
  window.clearTimeout(scrollInterval);
  scrollInterval = window.setTimeout(function() {
	var e1 = document.querySelector('#main-loading').parentNode;
	var e2 = returnFdExpanded();

    if (!e1 || !e2) return;
    var remain = e2.offsetTop + nextPageLink.offsetTop - nextPageLink.offsetHeight - e1.offsetHeight - e1.scrollTop;
    if (remain < st.apheight) {
      nextPageLink = null;
      initFullFeed();
    }
  }, 100);
};

FullFeed.checkNextPage = function(con) {
  var con2 = con.cloneNode(true);
  var aClass = con.className.split(/\s+/);
  var finalUrl = aClass[aClass.length - 1];
  var c = new getCurrentItem();
  var bMatch;
  var check = function(data, flag) {
    var nextEl, nextEl2;
    if (data.some(function(info) {
      if (info.url && info.url.length <= 12 && !/^\^?https?/i.test(info.url)) {
        if (new RegExp('^://', 'i').test(info.url)) info.url = '^https?' + info.url;
        else if (new RegExp('^//', 'i').test(info.url)) info.url = '^https?:' + info.url;
        else info.url = '^https?://' + info.url;
      }
      if (!bMatch && new RegExp(info.url).test(finalUrl) && info.url.length > 12) {
        var elms, elms2, bCache, bList, nextLink = info.nextLink;
        if (nextLink) nextLink = nextLink.replace(/id\(([^)]+)\)/g, '//*[@id=$1]');
        if (nextLink) {
          elms2 = getElementsByXPath(nextLink, con2);
          elms = getElementsByXPath(nextLink, con);
        }
        if (!elms2) elms2 = getElementsByXPath('//a[@rel="next"]', con2);
        if (!elms) elms = getElementsByXPath('//a[@rel="next"]', con);
        if (elms2 && elms2.length > 0) nextEl2 = elms2[elms2.length - 1];
        if (elms && elms.length > 0 && nextEl2 && nextEl2.href) {
          var arr = [];
          for (var i=0,j=elms.length; i<j; i++) {
            if (nextEl2.href === elms[i].href) arr.push(elms[i]);
          }
          nextEl = (arr.length) ? arr[arr.length - 1] : elms[elms.length - 1];
        }
        if (nextEl2 && finalUrl !== nextEl2.href) {
          if (flag === 'cache') {
            if (userCacheListAP.some(function(u) {
              if (u === c.feed.url) {
                return true;
              }
            })) {
              userCacheAP.some(function(u) {
                if (u === info) {
                  bMatch = true;
                  return true;
                }
              });
            }
          } else bMatch = true;
          if (flag === 'full') {
            if (userCacheListAP.some(function(u) {
              if (u === c.feed.url) {
                bList = true;
                return true;
              }
            })) {
              userCacheAP.some(function(u) {
                if (u === info) {
                  bCache = true;
                  return true;
                }
              });
            }
            if (!bCache) {
              delete info.exampleUrl;
              delete info.insertBefore;
              userCacheAP.push(info);
              try {
                localStorage.setItem('FeedeenFullFeed_userCacheAP', JSON.stringify(userCacheAP));
                if (!bList) {
                  userCacheListAP.push(c.feed.url);
                  localStorage.setItem('FeedeenFullFeed_userCacheListAP', JSON.stringify(userCacheListAP));
                }
              } catch(er) {}
            }
          }
          return true;
        } else return false;
      } else return false;
    })) nextPageLink = (nextEl) ? nextEl : null;
  };
  check(userSiteInfoAP, 'set');
  if (!bMatch) check(userCacheAP, 'cache');
  if (!bMatch) {
    siteInfoAP.some(function(ctx) {
      if (cacheAPInfo[ctx.url]) {
        check(cacheAPInfo[ctx.url].info, 'full');
        if (bMatch) return true;
      }
    });
  }
  if (bMatch && nextPageLink && st.denynexturl) {
    var re = new RegExp(st.denynexturl, 'i');
    if (re.test(nextPageLink.href)) nextPageLink = null;
  }
};

FullFeed.prototype.requestError = function(e) {
  state = null;
  message('Error: ' + e, 5000, 'warning');
  loadingStyle('remove', this.itemInfo.articleContainer);
  addClass(this.itemInfo.innerContents, 'gm_fullfeed_error');
};

FullFeed.prototype.removeEntry = function() {
  if (this.itemInfo && this.itemInfo.item_body) {
    while (this.itemInfo.item_body.firstChild) {
      this.itemInfo.item_body.removeChild(this.itemInfo.item_body.firstChild);
    }
  }
};

FullFeed.prototype.addEntry = function(entry, c) {
console.log('addEntry!');
  var url = this.requestURL || c.itemURL;
  var ic = (c.innerContents.id) ? $id(c.innerContents.id) : c.innerContents;
  var div = document.createElement('div');
  if (ic && ic.hasChildNodes()) {
    div.className = 'gm_fullfeed_pager';
    var http = c.innerContents.className.split(/\s+/).filter(function(i) {
      return new RegExp(/^http/).test(i);
    });
    var host = (readingPageUrl.split('/')[2] !== url.split('/')[2]) ? '<span class="gm_fullfeed_pager_differenthost">( ' + readingPageUrl.split('/')[2] + ' &rarr; ' + url.split('/')[2] + ' )</span>' : '';
    div.innerHTML = '<hr />page: <a href="' + url + '" target="_blank">' + (http.length + 1) + '</a>' + host;
    ic.appendChild(div);
  } else {
    div.className = 'gm_fullfeed_entry_url';
    div.innerHTML = '<a href="' + url + '" class="bluelink" target="_blank">' + url + '</a>';
    try {
      if (ic) ic.parentNode.insertBefore(div, ic);
    } catch(er) {
      message('Error: ' + er, 5000, 'warning');
    }
  }
  return entry.map(function(i) {
    var pe = document.importNode(i, true);
    if (ic) ic.appendChild(pe);
    return pe;
  });
};

FullFeed.resetCache = function() {
  message(loc[11], -1);
  var getSiteinfo = function(data, flag) {
    data.forEach(function(ctx) {
      var opt = {
        method: 'get',
        url: ctx.url,
        ignoreCache: true,
        onload: function(res) {
          if (res.status === 200) {
            if (flag) {
              FullFeed.setCache(res, ctx, 'cache');
              getSiteinfo(siteInfoAP);
            } else FullFeed.setCache(res, ctx, 'cacheAP', true);
          } else message(loc[14] + ' (' + res.status + ')', 5000, 'warning');
        },
        onerror: function() {
          message(loc[14], 5000, 'warning');
        }
      };
      GM_xmlhttpRequest(opt);
    });
  };
  getSiteinfo(siteInfo, true);
};

FullFeed.removeCache = function() {
  if (window.confirm(loc[16])) {
    localStorage.removeItem('FeedeenFullFeed_cache');
    localStorage.removeItem('FeedeenFullFeed_cacheAP');
    localStorage.removeItem('FeedeenFullFeed_userCache');
    localStorage.removeItem('FeedeenFullFeed_userCacheAP');
    localStorage.removeItem('FeedeenFullFeed_userCacheList');
    localStorage.removeItem('FeedeenFullFeed_userCacheListAP');

    cacheInfo = {}; cacheAPInfo = {};
    userCache = []; userCacheAP = [];
    userCacheList = []; userCacheListAP = [];
  }
};

FullFeed.setCache = function(res, ctx, item, flag) {
  var info = [];
  switch (ctx.format.toUpperCase()) {
    case 'JSONP':
      message(loc[17], 5000, 'warning');
      break;
    case 'JSON':
      try {
        info = JSON.parse(res.responseText)
          .sort(function(a, b) {
            a = new Date(a.updated_at).getTime();
            b = new Date(b.updated_at).getTime();
            if (!isNaN(a) && !isNaN(b))
              return new Date(b).getTime() - new Date(a).getTime();
            else return b;
          })
          .map(function(i) { return i.data; })
          .sort(function(lhs, rhs) { return rhs.priority - lhs.priority; });
      } catch(er1) {}
      break;
  }
  if (info.length > 0) {
    if (item === 'cache') {
      cacheInfo[ctx.url] = {
        url: ctx.url,
        info: info
      };
      try {
        localStorage.setItem('FeedeenFullFeed_cache', JSON.stringify(cacheInfo));
      } catch(er2) {
        if (er2 && er2.name && er2.message) window.alert(er2.name + '\n' + er2.message);
      }
      localStorage.removeItem('FeedeenFullFeed_userCache');
      localStorage.removeItem('FeedeenFullFeed_userCacheList');
      userCache = [];
      userCacheList = [];
    } else if (item === 'cacheAP') {
      cacheAPInfo[ctx.url] = {
        url: ctx.url,
        info: info
      };
      try {
        localStorage.setItem('FeedeenFullFeed_cacheAP', JSON.stringify(cacheAPInfo));
      } catch(er3) {
        if (er3 && er3.name && er3.message) window.alert(er3.name + '\n' + er3.message);
      }
      localStorage.removeItem('FeedeenFullFeed_userCacheAP');
      localStorage.removeItem('FeedeenFullFeed_userCacheListAP');
      userCacheAP = [];
      userCacheListAP = [];
    }
    if (flag) {
      message(loc[12], 5000);
    }
  }
};

FullFeed.getCache = function(key) {
  var js = '{}';
  if (localStorage.getItem('FeedeenFullFeed_' + key))
    js = localStorage.getItem('FeedeenFullFeed_' + key);

  else if (/^cache.+/.test(key)) FullFeed.resetCache();
  else if (/^user.+/.test(key)) js = '[]';
  try {
    return JSON.parse(js);
  } catch(er) {
    if (/^user.+/.test(key)) return [];
    else return {};
  }
};

FullFeed.saveSettings = function() {
  try {
    localStorage.setItem('FeedeenFullFeed_settings', JSON.stringify(st));
  } catch(er) {
    window.alert('Error: Save Settings');
  }
};

FullFeed.loadSettings = function(data) {
  if (data === 'reset') st = {};
  else if (data) st = data;
  else {
    st = {};
    try {
      if (localStorage.getItem('FeedeenFullFeed_settings'))
        st = JSON.parse(localStorage.getItem('FeedeenFullFeed_settings'));
    } catch(er1) {}
  }
  var notA = function(a) {
    return (Object.prototype.toString.call(a) !== '[object Array]') ? true : false;
  };
  var notB = function(a) {
    return (typeof a !== 'boolean') ? true : false;
  };
  var notN = function(a) {
    return (typeof a !== 'number') ? true : false;
  };
  var notS = function(a) {
    return (typeof a !== 'string') ? true : false;
  };
  if (notS(st.allowiframeurl)) st.allowiframeurl = '';
  if (notS(st.allownexturl)) st.allownexturl = '';
  if (notN(st.apheight) || st.apheight < 200 || st.apheight > 2000) st.apheight = 500;
  if (notN(st.autoload) || st.autoload < 0 || st.autoload > 3) st.autoload = 2;
  if (notA(st.autoloadfeed)) st.autoloadfeed = [];
  if (notB(st.autopagerize)) st.autopagerize = true;
  if (notB(st.autosearch)) st.autosearch = true;
  if (notB(st.cantdisplay)) st.cantdisplay = false;
  if (isFinite(st.basekey)) st.basekey = +st.basekey;
  else if (typeof st.basekey === 'string' && st.basekey.length === 1) st.basekey = st.basekey.toUpperCase();
  else st.basekey = 'Z';
  if (notS(st.denynexturl)) st.denynexturl = '';
  if (notA(st.disableitem)) st.disableitem = [];
  if (notB(st.iframetag)) st.iframetag = true;
  if (notB(st.noscripttag)) st.noscripttag = true;
  if (notA(st.notloadfeed)) st.notloadfeed = [];
  if (notS(st.notread)) st.notread = '';
  if (notB(st.openitem)) st.openitem = false;
  if (notS(st.replacefullfeedurl)) st.replacefullfeedurl = '';
  if (notB(st.socialicon)) st.socialicon = true;
  if (notB(st.socialbuzzurl)) st.socialbuzzurl = false;
  if (notB(st.socialdelicious)) st.socialdelicious = false;
  if (notB(st.socialfacebook)) st.socialfacebook = false;
  if (notB(st.socialfc2)) st.socialfc2 = false;
  if (notB(st.socialhatena)) st.socialhatena = false;
  if (notB(st.sociallivedoor)) st.sociallivedoor = false;
  if (notB(st.twitter)) st.socialtwitter = true;
  if (notB(st.socialyahoo)) st.socialyahoo = false;
  try {
    siteInfo = JSON.parse(st.siteinfo);
  } catch(er2) {
    siteInfo = [{"format": "JSON", "url": "http://wedata.net/databases/LDRFullFeed/items.json"}];
    st.siteinfo = JSON.stringify(siteInfo);
  }
  try {
    siteInfoAP = JSON.parse(st.siteinfoap);
  } catch(er3) {
    siteInfoAP = [{"format": "JSON", "url": "http://wedata.net/databases/AutoPagerize/items.json"}];
    st.siteinfoap = JSON.stringify(siteInfoAP);
  }
  try {
    userSiteInfo = JSON.parse(st.usersiteinfo);
  } catch(er4) {
    userSiteInfo = [{"url": "", "xpath": "", "type": "", "enc": ""}];
    st.usersiteinfo = JSON.stringify(userSiteInfo);
  }
  try {
    userSiteInfoAP = JSON.parse(st.usersiteinfoap);
  } catch(er5) {
    userSiteInfoAP = [{"url": "", "nextLink": "", "pageElement": ""}];
    st.usersiteinfoap = JSON.stringify(userSiteInfoAP);
  }
};

FullFeed.createSettings = function() {
  var div = document.createElement('div');
  div.id = 'gm_fullfeed_settings';
  div.style.display = 'none';
  div.innerHTML = '<div id="gm_fullfeed_settings-header"><span id="gm_fullfeed_settings-header_title"><a href="https://userscripts.org/scripts/show/171868" target="_blank">Feedeen Full Feed ' + loc[21] + '</a></span><span id="gm_fullfeed_settings-header_button"><input type="button" id="gm_fullfeed_settings-ok" value="OK"><input type="button" id="gm_fullfeed_settings-cancel" value="' + loc[22] + '"></span></div><div id="gm_fullfeed_settings-tab"></div><ul id="gm_fullfeed_settings-list"></ul>';
  document.body.appendChild(div);
  var list = [
    {tab: 'General', id: 'general', body: '<fieldset><legend>' + loc[23] + '</legend>' + loc[18] + ' : <input type="text" id="gm_fullfeed_settings-general_key"><span id="gm_fullfeed_settings-general_keydesc"></span><a href="javascript:void(0);" id="gm_fullfeed_settings-general_keyhelpicon">[ ? ]</a><div id="gm_fullfeed_settings-general_keyhelpbody">' + loc[26] + ' : Ctrl+ (' + loc[18] + ') ' + loc[24] + '<br>' + loc[27] + ' : Shift+ (' + loc[18] + ') ' + loc[24] + '<br>' + loc[28] + ' : Ctrl+Shift+ (' + loc[18] + ') ' + loc[24] + '<br>' + loc[29] + ' : Alt+Ctrl+Shift+ (' + loc[18] + ') ' + loc[24] + '</div></fieldset><fieldset><legend>' + loc[18] + '</legend><label><input type="checkbox" id="gm_fullfeed_settings-general_autopagerize">' + loc[41] + '</label><label> ( <input type="text" id="gm_fullfeed_settings-general_apheight">px )</label><br><label><input type="checkbox" id="gm_fullfeed_settings-general_autosearch">' + loc[64] + '</label><br><label><input type="checkbox" id="gm_fullfeed_settings-general_cantdisplay">' + loc[75] + '</label><fieldset><legend>' + loc[47] + ' : </legend><input type="text" id="gm_fullfeed_settings-general_notread"><br><label><input type="checkbox" id="gm_fullfeed_settings-general_openitem">' + loc[48] + '</label></fieldset></fieldset>'},
    {tab: 'SITE INFO', id: 'siteinfo', body: '<div><span id="gm_fullfeed_settings-siteinfo_fullfeed_link" class="gm_fullfeed_settings-siteinfo_link">FF URL</span><span id="gm_fullfeed_settings-siteinfo_autopagerize_link" class="gm_fullfeed_settings-siteinfo_link">AP URL</span><span id="gm_fullfeed_settings-siteinfo_userfullfeed_link" class="gm_fullfeed_settings-siteinfo_link">FF SiteInfo</span><span id="gm_fullfeed_settings-siteinfo_userautopagerize_link" class="gm_fullfeed_settings-siteinfo_link">AP SiteInfo</span><span id="gm_fullfeed_settings-siteinfo_disableitem_link" class="gm_fullfeed_settings-siteinfo_link">disable Item</span></div><fieldset><legend>' + loc[30] + '</legend><textarea id="gm_fullfeed_settings-siteinfo_fullfeed"></textarea></fieldset><fieldset><legend>' + loc[31] + '</legend><textarea id="gm_fullfeed_settings-siteinfo_autopagerize"></textarea></fieldset><fieldset><legend>' + loc[32] + '</legend><textarea id="gm_fullfeed_settings-siteinfo_userfullfeed"></textarea></fieldset><fieldset><legend>' + loc[33] + '</legend><textarea id="gm_fullfeed_settings-siteinfo_userautopagerize"></textarea></fieldset><fieldset><legend>' + 'disable SITE_INFO Item' + '</legend><div id="gm_fullfeed_settings-siteinfo_disableitemlist"></div><textarea id="gm_fullfeed_settings-siteinfo_disableitem"></textarea></fieldset>'},
    {tab: 'Auto Load', id: 'autoload', body: '<label>' + loc[43] + ' : <select id="gm_fullfeed_settings-autoload_mode"><option>' + loc[44] + '</option><option>' + loc[77] + '</option><option>' + loc[45] + '</option><option>' + loc[46] + '</option></select></label><fieldset id="gm_fullfeed_settings-autoload_whitelist"><legend>' + loc[36] + '</legend>' + loc[37] + ' : <br><input type="text" id="gm_fullfeed_settings-autoload_whitelist_title" class="gm_fullfeed_settings-autoload_title"><input type="button" id="gm_fullfeed_settings-autoload_whitelist_add" value="' + loc[38] + '"><br><textarea id="gm_fullfeed_settings-autoload_whitelist_list" class="gm_fullfeed_settings-autoload_list"></textarea></fieldset><fieldset id="gm_fullfeed_settings-autoload_blacklist"><legend>' + loc[76] + '</legend>' + loc[37] + ' : <br><input type="text" id="gm_fullfeed_settings-autoload_blacklist_title" class="gm_fullfeed_settings-autoload_title"><input type="button" id="gm_fullfeed_settings-autoload_blacklist_add" value="' + loc[38] + '"><br><textarea id="gm_fullfeed_settings-autoload_blacklist_list" class="gm_fullfeed_settings-autoload_list"></textarea></fieldset>'},
    {tab: 'Security', id: 'security', body: '<label><input type="checkbox" id="gm_fullfeed_settings-security_noscripttag">' + loc[42] + '</label><br><label><input type="checkbox" id="gm_fullfeed_settings-security_iframetag">' + loc[52] + '</label><fieldset><legend>' + loc[65] + ' : </legend><input type="text" id="gm_fullfeed_settings-security_allowiframeurl"></fieldset><fieldset><legend>' + loc[63] + ' : </legend><input type="text" id="gm_fullfeed_settings-security_denynexturl"></fieldset><fieldset><legend>' + loc[62] + ' : </legend><input type="text" id="gm_fullfeed_settings-security_allownexturl"></fieldset>'},
    {tab: 'Social', id: 'social', body: '<fieldset><legend><label><input type="checkbox" id="gm_fullfeed_settings-social_socialicon">' + loc[55] + '</label></legend><label><input type="checkbox" id="gm_fullfeed_settings-social_twitter">Twitter</label><br><label><input type="checkbox" id="gm_fullfeed_settings-social_delicious">Delicious</label><br><label><input type="checkbox" id="gm_fullfeed_settings-social_facebook">Facebook</label><br><label><input type="checkbox" id="gm_fullfeed_settings-social_hatena">' + loc[19] + '</label><br><label><input type="checkbox" id="gm_fullfeed_settings-social_livedoor">' + loc[20] + '</label><br><label><input type="checkbox" id="gm_fullfeed_settings-social_yahoo">' + loc[56] + '</label><br><label><input type="checkbox" id="gm_fullfeed_settings-social_buzzurl">' + loc[57] + '</label><br><label><input type="checkbox" id="gm_fullfeed_settings-social_fc2">' + loc[58] + '</label></fieldset>'},
    {tab: 'Etc', id: 'etc', body: '<label><input type="checkbox" id="gm_fullfeed_settings-etc_debuglog">' + loc[50] + '</label><br><fieldset><legend>Settings Data</legend><button id="gm_fullfeed_settings-etc_settingsimport">Import</button><button id="gm_fullfeed_settings-etc_settingsexport">Export</button><button id="gm_fullfeed_settings-etc_settingsreset">Reset</button></fieldset><fieldset><legend>Cache Data</legend><button id="gm_fullfeed_settings-etc_cachereset">Reset Cache</button><button id="gm_fullfeed_settings-etc_cachedelete">Delete Cache</button></fieldset><fieldset><legend>Replace Full Feed URL : </legend><input type="text" id="gm_fullfeed_settings-etc_replacefullfeedurl"></fieldset>'}
  ];
  list.forEach(function(i) {
    var h3 = document.createElement('h3');
    h3.className = 'gm_fullfeed_settings-title';
    h3.innerHTML = i.tab;
    $ids('tab').appendChild(h3);
    var li = document.createElement('li');
    li.id = 'gm_fullfeed_settings-' + i.id;
    li.style.display = 'none';
    li.innerHTML = i.body;
    $ids('list').appendChild(li);
  });
  var div1 = document.querySelector('[tabindex]');  // Feedeen
  if (div1) {
    window.setTimeout(function() {

      if (div1) {
        var div2 = document.createElement('div');
		div2.id = 'gm_fullfeed_settings-menu';
		div2.className = div1.childNodes[0].getAttribute('class');
		div2.setAttribute('id','gm_fullfeed_settings-menu');
		div2.setAttribute('role','button');
		div2.setAttribute('style','-moz-user-select: none;');
		div2.innerHTML = 'FullFeed' + loc[21];
		div1.appendChild(div2);
      }
    }, 10000);
  }


  $ids('general_key').addEventListener('keypress', function(e1) {
    e1.preventDefault();
  }, false);
  $ids('autoload_mode').addEventListener('change', function() {
    var si = $ids('autoload_mode').selectedIndex;
    if (si === 1) {
      $ids('autoload_blacklist').style.display = 'block';
      $ids('autoload_whitelist').style.display = 'none';
    } else if (si === 2) {
      $ids('autoload_blacklist').style.display = 'none';
      $ids('autoload_whitelist').style.display = 'block';
    } else {
      $ids('autoload_blacklist').style.display = 'none';
      $ids('autoload_whitelist').style.display = 'none';
    }
  }, false);
};

FullFeed.viewSettings = function(id) {
  if ($id('gm_fullfeed_settings').style.display === 'block') {
    $id('gm_fullfeed_settings').style.display = 'none';
    return;
  }
  var tab = $ids('tab').childNodes;
  var list = $ids('list').childNodes;
  $ids('general_key').value = st.basekey;
  $ids('general_keydesc').textContent = (isNaN(st.basekey)) ? loc[24] : '(' + loc[25] + ')';
  $ids('general_autopagerize').checked = (st.autopagerize) ? true : false;
  $ids('general_apheight').value = st.apheight;
  $ids('general_autosearch').checked = (st.autosearch) ? true : false;
  $ids('general_cantdisplay').checked = (st.cantdisplay) ? true : false;
  $ids('general_notread').value = st.notread;
  $ids('general_openitem').checked = (st.openitem) ? true : false;
  var siff = $ids('siteinfo_fullfeed');
  var siap = $ids('siteinfo_autopagerize');
  var siuff = $ids('siteinfo_userfullfeed');
  var siuap = $ids('siteinfo_userautopagerize');
  var beautifier = function(str) {
    try {
      return JSON.stringify(str).replace(/^\[/g, '[\n').replace(/\{\"/g, '  {\n    "').replace(/\"\}/g, '"\n  }').replace(/\},/g, '},\n').replace(/\",/g, '",\n    ').replace(/\{\"/g, '{\n    "').replace(/\]$/g, '\n]');
    } catch(er) {
      return '';
    }
  };
  siff.value = beautifier(siteInfo);
  siap.value = beautifier(siteInfoAP);
  siuff.value = beautifier(userSiteInfo);
  siuap.value = beautifier(userSiteInfoAP);
  var chklist = '';
  itemSiteInfo.forEach(function(a) {
    chklist += '<label title="' + a.url + '"><input type="checkbox"';
    if (itemSiteInfo.length === 1) chklist += ' disabled="disabled"';
    else {
      st.disableitem.forEach(function(b) {
        if (a.url === b) chklist += ' checked';
      });
    }
    chklist += '>' + a.url + '</label><br>';
  });
  $ids('siteinfo_disableitemlist').innerHTML = chklist;
  if (st.disableitem) $ids('siteinfo_disableitem').value = st.disableitem.join('\n');
  var title;
  $ids('autoload_mode').selectedIndex = st.autoload;
  try {
    title = returnFdExpanded().querySelector('a.fd_sitename').textContent; // Feedeen
  } catch(er) {}
  if (title) {
    title = title.replace(/([*+?.()\[\]\\|\^$])/g, '\\$1').replace(/^\s*(.*?)/, '$1');
    $ids('autoload_whitelist_title').value = '^' + title + '$';
    $ids('autoload_blacklist_title').value = '^' + title + '$';
  }
  if (st.autoloadfeed) $ids('autoload_whitelist_list').value = st.autoloadfeed.join('\n');
  if (st.notloadfeed) $ids('autoload_blacklist_list').value = st.notloadfeed.join('\n');
  for (var i = 0; i < tab.length; i++) {
    if (hasClass(tab[i], 'selected')) {
      removeClass(tab[i], 'selected');
      list[i].style.display = 'none';
    }
  }
  $ids('autoload_whitelist').style.display = 'none';
  $ids('autoload_blacklist').style.display = 'none';
  if (st.autoload === 1) $ids('autoload_blacklist').style.display = 'block';
  else if (st.autoload === 2) $ids('autoload_whitelist').style.display = 'block';
  $ids('security_noscripttag').checked = (st.noscripttag) ? true : false;
  $ids('security_iframetag').checked = (st.iframetag) ? true : false;
  $ids('security_allowiframeurl').value = st.allowiframeurl;
  $ids('security_denynexturl').value = st.denynexturl;
  $ids('security_allownexturl').value = st.allownexturl;
  if ($ids('security_iframetag').checked) {
    $ids('security_allowiframeurl').disabled = false;
    $ids('security_allowiframeurl').parentNode.style.color = 'black';
  } else {
    $ids('security_allowiframeurl').disabled = true;
    $ids('security_allowiframeurl').parentNode.style.color = 'gray';
  }
  $ids('social_socialicon').checked = (st.socialicon) ? true : false;
  $ids('social_buzzurl').checked = (st.socialbuzzurl) ? true : false;
  $ids('social_delicious').checked = (st.socialdelicious) ? true : false;
  $ids('social_facebook').checked = (st.socialfacebook) ? true : false;
  $ids('social_fc2').checked = (st.socialfc2) ? true : false;
  $ids('social_hatena').checked = (st.socialhatena) ? true : false;
  $ids('social_livedoor').checked = (st.sociallivedoor) ? true : false;
  $ids('social_twitter').checked = (st.socialtwitter) ? true : false;
  $ids('social_yahoo').checked = (st.socialyahoo) ? true : false;
  ['buzzurl', 'delicious', 'facebook', 'fc2', 'hatena', 'livedoor', 'twitter', 'yahoo'].forEach(function(a) {
    if ($ids('social_socialicon').checked) {
      $ids('social_' + a).disabled = false;
      $ids('social_' + a).parentNode.style.color = 'black';
    } else {
      $ids('social_' + a).disabled = true;
      $ids('social_' + a).parentNode.style.color = 'gray';
    }
  });
  $ids('etc_replacefullfeedurl').value = st.replacefullfeedurl;
  
  if (id) {
    //※ createSettings()のlistと並び順を合わせること
    var idlist = ['general', 'siteinfo', 'autoload', 'security', 'social', 'etc'];
    idlist.forEach(function(s, i) {
      if (id === s) {
        addClass(tab[i], 'selected');
        list[i].style.display = 'block';
      }
    });
  } else {
    addClass(tab[0], 'selected');
    list[0].style.display = 'block';
  }
  $id('gm_fullfeed_settings').style.display = 'block';
};

FullFeed.checkRegister = function() {
  window.setTimeout(function() {
    var currentItem = get_active_item(true);
    if (currentItem && currentItem.url) {
      FullFeed.registerWidgets(currentItem);
      FullFeed.registerSocialIcons(currentItem);
    }
  }, 10);
};

FullFeed.registerWidgets = function() {
  var el, flag = false, c = new getCurrentItem();
  if (!c.innerContents) return;
  el = returnFdExpanded().querySelector('.fd_sitename').parentNode.querySelector('span.gm_fullfeed_checked');
  /*if (el) {
    el.some(function(i) {
      if (hasClass(i, 'gm_fullfeed_checked')) {
        flag = true;
        return true;
      }
    });
  }
  if (flag) return;*/
  if(el) return;
  var container = returnFdExpanded().querySelector('.fd_sitename').parentNode; // feedeen
  if (!container) return;
  itemSiteInfo = [];
  var description = loc[40] + ' : ' + loc[18] + ' / Ctrl+' + loc[40] + ' : ' + loc[39];
  var feed = c.feed;
  var bFound = false;
  var check = function(b) {
    bFound = true;
    var icon = document.createElement('span');
    icon.title = description;
    icon.innerHTML = 'F';
    addClass(icon, 'gm_fullfeed_checked');
    addClass(icon, 'gm_fullfeed_checked_icon');
    if (b) addClass(icon, 'gm_fullfeed_checked_icon_info');
    else addClass(icon, 'gm_fullfeed_checked_icon_noinfo');
    container.appendChild(icon);
    if (st.autoload === 0) initFullFeed();
    else if (st.autoload === 1 && feed.title) {
      if (st.notloadfeed.some(function(i) {
        if (!i) return false;
        if (new RegExp(i).test(feed.title)) return true;
      })) flag = true;
      if (!flag) initFullFeed();
    } else if (st.autoload === 2 && feed.title) {
      if (st.autoloadfeed.some(function(i) {
        if (!i) return false;
        if (new RegExp(i).test(feed.title)) return true;
      })) initFullFeed();
    }
  };
  userSiteInfo.some(function(i) {
    try {
      var reg = new RegExp(i.url);
      if (i.url && (reg.test(c.itemURL) || reg.test(feed.url))) {
        check(true);
        return true;
      }
    } catch(er1) {
      GM_log('SITEINFO Error: ' + i.url);
    }
  });
  if (!bFound) {
    if (userCacheList.some(function(i) {
      if (i === feed.url) {
        return true;
      }
    })) {
      userCache.some(function(i) {
        try {
          var reg = new RegExp(i.url);
          if (i.url && (reg.test(c.itemURL) || reg.test(feed.url))) {
            check(true);
            return true;
          }
        } catch(er2) {
          GM_log("SITEINFO Error: " + i.url);
        }
      });
    }
  }
  if (!bFound) {
    siteInfo.some(function(ctx) {
      if (cacheInfo[ctx.url]) {
        cacheInfo[ctx.url].info.some(function(i) {
          try {
            var reg = new RegExp(i.url);
            if (i.url && (reg.test(c.itemURL) || reg.test(feed.url))) {
              check(true);
              return true;
            }
          } catch(er3) {
            GM_log("SITEINFO Error: " + i.url);
          }
        });
      }
    });
  }
  if (!bFound) check();
};

FullFeed.registerSocialIcons = function() {
  if (!st.socialicon) return;
  var el, c = new getCurrentItem();
  if (!c.innerContents) return;
	el = returnFdExpanded().querySelector('span.gm_fullfeed_socialicon');
  if (el) return;
  var container = returnFdExpanded().querySelector('.fd_sitename').parentNode;
  var itemScheme = c.itemURL.slice(0, c.itemURL.indexOf("://")+3);
  var itemUrl2 = c.itemURL.slice(c.itemURL.indexOf("://")+3).replace(/#/g, '%23');
  if (!container) return;
  var twitter = {
    method: 'get',
    url: 'http://urls.api.twitter.com/1/urls/count.json?url=' + c.itemURL,
    onload: function(res) {
      if (res.status === 200) {
        var info;
        try {
          info = JSON.parse(res.responseText);
        } catch(er) {
          return;
        }
        var total = info.count;
        if (isNaN(total) || total <= 0) return;
        var str = (total > 1) ? 's' : '';
        var style = (total < 10) ? '1' :
          (total < 100) ? '2' :
          (total < 1000) ? '3' : '4';
        sT.innerHTML = '<a href="http://topsy.com/' + itemUrl2 + '" target="_blank" title="Twitter: ' + total + ' tweet' + str + '" class="gm_fullfeed_twitter gm_fullfeed_twitter' + style + '"><img src="https://twitter.com/favicon.ico"><span>' + total + '</span></a>';
      }
    }
  };
  var delicious = {
    method: 'get',
    url: 'http://badges.del.icio.us/feeds/json/url/data?url=' + encodeURIComponent(c.itemURL),
    onload: function(res) {
      if (res.status === 200) {
        var info;
        try {
          info = JSON.parse(res.responseText);
        } catch(er) {
          return;
        }
        if (!info || !info.length) return;
        var total = info[0].total_posts;
        if (isNaN(total) || total <= 0) return;
        var str = (total > 1) ? ' people' : ' person';
        var style = (total < 10) ? '1' :
          (total < 100) ? '2' :
          (total < 1000) ? '3' : '4';
        sD.innerHTML = '<a href="http://delicious.com/url?url=' + info[0].url + '" target="_blank" title="Delicious: ' + total + str + '" class="gm_fullfeed_delicious gm_fullfeed_delicious' + style + '"><img src="https://delicious.com/img/favicon.ico"><span>' + total + '</span></a>';
      }
    }
  };
  var facebook = {
    method: 'get',
    url: 'https://api.facebook.com/method/fql.query?format=json&query=select+like_count+from+link_stat+where+url=%22' + encodeURIComponent(c.itemURL) + '%22',
    onload: function(res) {
      if (res.status === 200) {
        var info;
        try {
          info = JSON.parse(res.responseText);
        } catch(er) {
          return;
        }
        var total = info[0].like_count;
        if (isNaN(total) || total <= 0) return;
        sF.innerHTML = '<span title="Facebook: ' + total + ' like" class="gm_fullfeed_facebook"><img src="https://www.facebook.com/favicon.ico"><span>' + total + '</span></span>';
      }
    }
  };
  var hatena = {
    method: 'get',
    url: 'http://api.b.st-hatena.com/entry.count?url=' + itemScheme + itemUrl2,
    onload: function(res) {
      if (res.status === 200) {
        var total = Number(res.responseText);
        if (isNaN(total) || total <= 0) return;
        var str = (total > 1) ? ' users' : ' user';
        var style = (total < 10) ? '1' :
          (total < 100) ? '2' :
          (total < 1000) ? '3' : '4';
        var ssl = (itemScheme === 'https://') ? 's/' : '';
        sH.innerHTML = '<a href="http://b.hatena.ne.jp/entry/' + ssl + itemUrl2 + '" target="_blank" title="' + loc[19] + ': ' + total + str + '" class="gm_fullfeed_hatena gm_fullfeed_hatena' + style + '"><img src="http://b.hatena.ne.jp/favicon.ico"><span>' + total + '</span></a>';
      }
    }
  };
  var livedoor = '<a href="http://clip.livedoor.com/page/' + c.itemURL + '" target="_blank"><img src="http://image.clip.livedoor.com/counter/' + c.itemURL + '" title="' + loc[20] + '"/></a>';
  var yahoo = '<a href="http://bookmarks.yahoo.co.jp/url?url=' + encodeURIComponent(c.itemURL) + '" target="_blank"><img src="http://num.bookmarks.yahoo.co.jp/image/small/' + c.itemURL + '" title="' + loc[57] + '"/></a>';
  var buzzurl = '<a href="http://buzzurl.jp/entry/' + c.itemURL + '" target="_blank"><img src="http://api.buzzurl.jp/api/counter/v1/image?url=' + encodeURIComponent(c.itemURL) + '" title="' + loc[58] + '"/></a>';
  var fc2 = '<a href="http://bookmark.fc2.com/search/detail?url=' + encodeURIComponent(c.itemURL)  + '" target="_blank"><img src="http://bookmark.fc2.com/image/users/' + c.itemURL + '" title="' + loc[59] + '"/></a>';
  var ce = function() {
    return document.createElement('span');
  };
  var sT = ce(), sD = ce(), sF = ce(), sH = ce(), sL = ce(), sY = ce(), sB = ce(), sC = ce();
  sT.className = sD.className = sF.className = sH.className = sL.className = sY.className = sB.className = sC.className = 'gm_fullfeed_socialicon';
  var ac1 = function(s, f) {
    container.appendChild(s);
    GM_xmlhttpRequest(f);
  };
  var ac2 = function(s, f) {
    s.innerHTML = f;
    container.appendChild(s);
  };
  if (st.socialtwitter) ac1(sT, twitter);
  if (st.socialdelicious) ac1(sD, delicious);
  if (st.socialfacebook) ac1(sF, facebook);
  if (st.socialhatena) ac1(sH, hatena);
  if (st.sociallivedoor) ac2(sL, livedoor);
  if (st.socialyahoo) ac2(sY, yahoo);
  if (st.socialbuzzurl) ac2(sB, buzzurl);
  if (st.socialfc2) ac2(sC, fc2);
  var inter, repeat = 0, check = function() {

    var e = returnFdExpanded().querySelectorAll('span.gm_fullfeed_socialicon > a > img'), f = true;
    repeat ++;
    if (e) {
      e.forEach(function(i) {
        if (i.clientHeight === 1) i.parentNode.parentNode.removeChild(i.parentNode);
        else if (i.clientHeight === 0 && repeat < 10) f = false;
      });
    }
    if (f) window.clearInterval(inter);
  };

  window.clearInterval(inter);
  inter = window.setInterval(function() {
 //   check();
  }, 1000);
};

FullFeed.documentFilters = [
  (function(doc) {
    var anchors = getElementsByXPath('descendant-or-self::a', doc);
    if (anchors) {
      anchors.forEach(function(i) {
        i.target = '_blank';
      });
    }
  })
];

var get_active_item = function() {
  //console.log('get_active_item');
  var item = {};
  try {
    var exp = returnFdExpanded().querySelector('a.fd_url'); // Feedeen
    item.url =  exp.href;
    item.title = returnFdExpanded().querySelector('.fd_title').innerHTML; // Feedeen
  } catch(e) {}
  return item;
};

var get_active_feed = function() {
  var feed = {};
  feed.url = ''; feed.title = '';
  try {
	var est = returnFdExpanded().querySelector('a.fd_sitename'); // Feedeen
    if (est) {
		feed.url = est.href; //feedeen 配信サイトURL
		feed.title =  returnFdExpanded().querySelector('a.fd_sitename').innerHTML; // Feedeen
    }
  } catch(e) {}
  return feed;
};

var hasClass = function(element, classname) {
  if (!element) return false;
  var cl = element.className;
  if (!cl) return false;
  var cls = cl.split(/\s+/);
  return cls.indexOf(classname) !== -1;
};

var toggleClass = function(element, classname) {
  if (!element) return;
  if (hasClass(element, classname)) removeClass(element, classname);
  else addClass(element, classname);
};

var removeClass = function(element, classname) {
  if (!element) return;
  var cl = element.className;
  var cls = cl.split(/\s+/);
  element.className = cls.remove(classname).join(' ');
};

var addClass = function(element, classname) {
  if (!element) return;
  var cl = element.className;
  if (!contain(cl, classname)) {
    element.className += ' ' + classname;
  }
};

var contain = function(self, other) {
  if (isString(self) && isString(other)) {
    return self.indexOf(other) !== -1;
  }
  if (isRegExp(other)) return other.test(self);
};

var isString = function(obj) {
  return typeof obj === 'string' || obj instanceof String;
};

var isRegExp = function(obj) {
  return obj instanceof RegExp;
};

Array.prototype.remove = function(to_remove) {
  return this.filter(function(val) { return val !== to_remove; });
};

// itemの情報を格納するobjectのconstructor
var getCurrentItem = function() {
//console.log('getCurrentItem');
	this.item = get_active_item(true);
	this.feed = get_active_feed();
	this.itemURL = this.item.url;
	this.articleContainer = returnFdExpanded(); // Feedeen
	this.innerContents = returnFdExpanded().querySelector('.fd_body'); // feedeen
	this.found = false;
};

var launchFullFeed = function(list, c, flag) {
//console.log('launchFullFeed');
  if (typeof list.some !== 'function') return;
  state = 'launch';
  itemSiteInfo = [];
  var bCache, bList;
  var check = function(lis) {
    lis.forEach(function(i) {
      try {
        var reg = new RegExp(i.url);
        if (i.url && (i.url.length <= 12 || !/^\^?https?/i.test(i.url))) {
          if (new RegExp('^://', 'i').test(i.url)) i.url = '^https?' + i.url;
          else if (new RegExp('^//', 'i').test(i.url)) i.url = '^https?:' + i.url;
          else i.url = '^https?://' + i.url;
        }
        if (reg.test(c.itemURL) && i.url.length > 12) {
          if (flag === 'cache') {
            if (userCacheList.some(function(u) {
              if (u === c.feed.url) {
                return true;
              }
            })) {
              c.found = true;
              itemSiteInfo.push(i);
            }
          } else {
            c.found = true;
            itemSiteInfo.push(i);
          }
        }
      } catch(er1) {
        GM_log("SITEINFO Error: " + i.url);
      }
    });
  };
  check(list);
  if (/^next|^search/.test(flag)) {
    if (!c.found) {
      siteInfoAP.some(function(ctx) {
        if (cacheAPInfo[ctx.url]) {
          check(cacheAPInfo[ctx.url].info);
          return c.found;
        }
      });
    }
    if (!c.found) check([{"url":nextPageLink.href, "xpath":""}]);
  }
  nextPageLink = null;
  itemSiteInfo.sort(function(a, b) {
    var reA = new RegExp(a.url);
    var reB = new RegExp(b.url);
    var a1 = (reA.test(c.itemURL)) ? reA.source.length : 0;
    var b1 = (reB.test(c.itemURL)) ? reB.source.length : 0;
    var a2 = (reA.test(c.feed.url)) ? reA.source.length : 0;
    var b2 = (reB.test(c.feed.url)) ? reB.source.length : 0;
    if (a.url.search(/\\w|\.\+|\.\*|\[\^\.?\/?\]\+/) !== -1) return true;
    else if (b.url.search(/\\w|\.\+|\.\*|\[\^\.?\/?\]\+/) !== -1) return false;
    else return ((b1 >= b2) ? b1 : b2) - ((a1 >= a2) ? a1 : a2);
  });
  var type = ['^IND', '^SUB', '^GEN'];
  itemSiteInfo.sort(function(a, b) {
    var n1 = 0, n2 = 0;
    type.forEach(function(c, i) {
      if (new RegExp(c).test(a.type)) n1 = i;
      if (new RegExp(c).test(b.type)) n2 = i;
    });
    return n1 - n2;
  });
  if (flag === 'full') {
    if (!bCache && itemSiteInfo.length > 0) {
      userCache.some(function(u) {
        if (u === itemSiteInfo[0]) {
          bCache = true;
          return true;
        }
      });
      userCacheList.some(function(u) {
        if (u === c.feed.url) {
          bList = true;
          return true;
        }
      });
      if (!bCache) {
        delete itemSiteInfo[0].base;
        delete itemSiteInfo[0].microformats;
        delete itemSiteInfo[0].priority;
        userCache.push(itemSiteInfo[0]);
        try {
          localStorage.setItem('FeedeenFullFeed_userCache', JSON.stringify(userCache));
        } catch(er2) {}
      }
      if (!bList) {
        userCacheList.push(c.feed.url);
        try {
          localStorage.setItem('FeedeenFullFeed_userCacheList', JSON.stringify(userCacheList));
        } catch(er3) {}
      }
    }
  }
  if (c.found && itemSiteInfo.length > 0) {
    var data, bool;
    if (itemSiteInfo.some(function(a) {
      data = a; bool = true;
      st.disableitem.forEach(function(b) {
        if (a.url === b) bool = false;
      });
      if (bool) return true;
    })) new FullFeed(data, c, flag);
    else new FullFeed(itemSiteInfo[0], c, flag);
  } else state = null;
};

var initFullFeed = function(scroll) {
//console.log("initFullFeed: ");
  var c = new getCurrentItem();
  if ((state && (state !== 'loaded' && state !== 'wait')) || !c.item.title || !c.innerContents) return;
  message(loc[54], -1);
  if (st.notread) {
    var re = new RegExp(st.notread);
    if (re.test(c.item.title) || re.test(c.item.url) || re.test(c.feed.title)) {
      if (st.openitem) {
        loadingStyle('open', c.articleContainer);
        window.setTimeout(function() {
          GM_openInTab(c.itemURL, true);
        }, 10);
        window.setTimeout(function() {
          loadingStyle('remove', c.articleContainer);
        }, 1000);
        return message(loc[49], 2000);
      } else return message(loc[8]);
    }
  }
  var launch = function() {
    if (hasClass(c.innerContents, 'gm_fullfeed_loaded')) {
      if (st.autopagerize) {
        FullFeed.checkNextPage(c.innerContents);
        if (nextPageLink) {
          c.itemURL = nextPageLink.href;
          launchFullFeed(userSiteInfo, c, 'set');
          if (!c.found) launchFullFeed(userCache, c, 'cache');
          if (!c.found) {
            siteInfo.some(function(ctx) {
              if (cacheInfo[ctx.url]) {
                launchFullFeed(cacheInfo[ctx.url].info, c, 'next');
                return c.found;
              }
            });
          }
          if (!c.found) launchFullFeed([], c, 'search');
          loadingStyle('add', c.articleContainer);
          return message(loc[4], -1);
        } else if (!scroll) {
          if (c.innerContents.className.split(/\s+/).filter(function(i) {
            return new RegExp(/^http/).test(i);
          }).length > 1) return message(loc[7]);
          else return message(loc[9]);
        }
      } else if (!scroll) return message(loc[9]);
    } else {
      if (scroll) return;
      launchFullFeed(userSiteInfo, c, 'set');
      if (!c.found) launchFullFeed(userCache, c, 'cache');
      if (!c.found && !siteInfo.some(function(ctx) {
        if (cacheInfo[ctx.url]) {
          launchFullFeed(cacheInfo[ctx.url].info, c, 'full');
          return c.found;
        }
      })) new FullFeed({}, c, 'search');
    }
  };
  var longurl = function(u) {
    GM_xmlhttpRequest({
      method: 'get',
      url: 'http://api.longurl.org/v2/expand?format=json&url=' + u,
      onload: function(res) {
        if (res.status === 200) {
          try {
            var longUrl = JSON.parse(res.responseText)['long-url'];
            if (longUrl && /^https?:/.test(longUrl) && longUrl.replace('\/', '/') !== c.itemURL) {
              c.itemURL = c.feed.url = longUrl;
              checkShortUrl();
            } else unshortenit(u);
          } catch(er) { unshortenit(u); }
        } else unshortenit(u);
      },
      onerror: function() {
        unshortenit(u);
      }
    });
  };
  var unshortenit = function(u) {
    GM_xmlhttpRequest({
      method: 'get',
      url: 'http://www.unshorten.it/api1.0.php?responseFormat=text&shortURL=' + u,
      onload: function(res) {
        if (res.status === 200) {
          try {
            var longUrl = res.responseText;
            if (longUrl && /^https?:/.test(longUrl)) {
              c.itemURL = c.feed.url = longUrl;
            } else checkShortUrl();
          } catch(er) {}
          checkShortUrl();
        }
      },
      onerror: function() {
        checkShortUrl();
      }
    });
  };
  var checkShortUrl = function() {
    if (c.itemURL !== tempUrl) {
      tempUrl = c.itemURL;
      GM_xmlhttpRequest({
        method: 'HEAD',
        url: c.itemURL,
        onload: function(res) {
          if (res.status === 200 && res.finalUrl) {
            if (/^https?:\/\/t.co\/.+/.test(res.finalUrl)) longurl(res.finalUrl);
            else {
              c.itemURL = c.feed.url = res.finalUrl;
              launch();
            }
          } else if (((res.status >= 301 && res.status <= 303) || res.status === 307) && res.finalUrl) {
            if (['t.co', 'bit.ly', 'goo.gl', 'is.gd', 'j.mp', 'ow.ly', 'tinyurl.com'].some(function(a) {
              if (new RegExp('^https?://' + a + '/.+').test(res.finalUrl)) return true;
            })) longurl(res.finalUrl);
            else unshortenit(res.finalUrl);
          } else launch();
        },
        onerror: function() {
          launch();
        }
      });
    } else launch();
  };
  if (!st.replacefullfeedurl) {
    launch();
    return;
  }
  var tempUrl = c.itemURL;
  var rep = st.replacefullfeedurl.replace(/\s+/g, ' ').split(' ');
  if (rep.length >= 2) {
    var excludeUrl = function(e) {
      e.some(function(a) {
        if (a.href.split('/')[2].indexOf('xn--') === -1 && /^https?:\/\/.+/.test(a.textContent)) {
          c.itemURL = c.feed.url = a.href;
        }
      });
    };
    for(var i=0; i<rep.length-1; i=i+2) {
      if (rep[i] && new RegExp(rep[i]).test(c.itemURL)) {
        if (rep[i + 1] && /^http/.test(rep[i + 1])) {
          c.itemURL = c.itemURL.replace(new RegExp(rep[i]), rep[i + 1]);
          c.feed.url = c.itemURL;
        } else if (rep[i + 1] === 'Link') {
          try {
			var u = returnFdExpanded().querySelector('iframe > a'); // 要改善。iframe内のaタグを指すようにしたい
            if (u) excludeUrl(u);
          } catch(er) {}
        }
        break;
      }
    }
  } else launch();
  checkShortUrl();
};

var loadingStyle = function(flag, elm) {
  if (!elm) return;
  var s1 = 'gm_fullfeed_loading';
  var s2 = 'gm_fullfeed_opened';
  if (flag === 'add') addClass(elm, s1);
  else if (flag === 'open') addClass(elm, s2);
  else if (flag === 'remove') {
    removeClass(elm, s1);
    removeClass(elm, s2);
  }
};

var createMessageBox = function() {
  var div = document.createElement('div');
  div.id = 'gm_fullfeed_message';
  div.className = 'gm_fullfeed_hidden';
  div.innerHTML = '';
  document.body.appendChild(div);
};

// For Feedeen
var returnFdExpanded = function() {
	return document.querySelector('.fd_expanded');
}
var returnXpathEntry = function() {
  console.log("Warning!: returnXpathEntry");
  return 'id("subscriptions_articles")/div[contains(concat(" ", @class, " "), " article_current ")]';
};


var debugLog = false;
var itemSiteInfo = [];
var messageInterval, scrollInterval, initInterval;
var nextPageLink = null, readingPageUrl = null, state = null;
var st, siteInfo, siteInfoAP, userSiteInfo, userSiteInfoAP;
var cacheInfo, cacheAPInfo, userCache, userCacheAP, userCacheList, userCacheListAP;


var init = function() {
//console.log('init:');
  FullFeed.loadSettings();
  cacheInfo = FullFeed.getCache('cache');
  cacheAPInfo = FullFeed.getCache('cacheAP');
  userCache = FullFeed.getCache('userCache');
  userCacheAP = FullFeed.getCache('userCacheAP');
  userCacheList = FullFeed.getCache('userCacheList');
  userCacheListAP = FullFeed.getCache('userCacheListAP');
  if (GM_registerMenuCommand && typeof GM_registerMenuCommand === 'function') {
    GM_registerMenuCommand('Feedeen Full Feed - reset cache', function() {
      if (window.confirm(loc[15])) FullFeed.resetCache();
    });
    GM_registerMenuCommand('Feedeen Full Feed - delete cache', function() {
      FullFeed.removeCache();
    });
  }
  GM_addStyle(CSS);
  FullFeed.createSettings();
  createMessageBox();
};
// InoReader Full Feedにはないけど保留
window.clearInterval(initInterval);
initInterval = window.setInterval(function() {
 if (document.querySelector('.fd_itemlist')) {
    window.clearInterval(initInterval);
    init();
  }
}, 500);
  document.addEventListener('keyup', function(e) {
  var key = (isNaN(st.basekey)) ? st.basekey.toUpperCase().charCodeAt(0) : Number(st.basekey);
  var el1 = $ids('general_key'), el2, flag = false;
  if (e.target.id === 'gm_fullfeed_settings-general_key') {
    el2 = $ids('general_keydesc');
    var code = e.keyCode;
    var cha = String.fromCharCode(code);
    if (/[A-Z]/.test(cha)) {
      el1.value = cha;
      el2.textContent = loc[24];
    } else if (code < 16 || code > 18) {
      el1.value = code;
      el2.textContent = loc[25];
    }
  } else if (e.keyCode === key && !/^input|^textarea/i.test(e.target.tagName)) {
    if (e.altKey && e.ctrlKey && e.shiftKey) {
      if (window.confirm(loc[15])) FullFeed.resetCache();
    } else if (e.ctrlKey && e.shiftKey) {
      el2 = returnFdExpanded().querySelector('span.gm_fullfeed_checked');
	  //console.log('el2=' + el2);
      if (el2) {
//        el2.forEach(function(i) {
//          if (hasClass(i, 'gm_fullfeed_checked')) flag = true;
//        });
		flag = true;
      }
      if (flag) FullFeed.viewSettings('autoload');
      else FullFeed.viewSettings();
    } else if (e.ctrlKey) {
      if (st.autoload === 0) st.autoload = 1;
      else if (st.autoload === 1) st.autoload = 2;
      else if (st.autoload === 2) st.autoload = 3;
      else st.autoload = 0;
      FullFeed.saveSettings();
      message('Auto Load : ' + ((st.autoload === 0) ? loc[44] : (st.autoload === 1) ? loc[77] : (st.autoload === 2) ? loc[45] : loc[46]));
    } else if (e.shiftKey) {
      st.autopagerize = !st.autopagerize;
      FullFeed.saveSettings();
      message('AutoPagerize : ' + ((st.autopagerize) ? '<span class="gm_fullfeed_ap_on">ON</span>' : '<span class="gm_fullfeed_ap_off">OFF</span>'));
    } else initFullFeed();
  }
  FullFeed.checkRegister();
  }, false);
  document.addEventListener('click', function(e) {
  if (e.button >= 2) return;
  if (e.button === 0 && e.target.id && /^gm_fullfeed_settings-/.test(e.target.id)) {
    var set = $id('gm_fullfeed_settings');
    var wlTitle = $ids('autoload_whitelist_title');
    var wlList = $ids('autoload_whitelist_list');
    var blTitle = $ids('autoload_blacklist_title');
    var blList = $ids('autoload_blacklist_list');
    if (e.target.id === 'gm_fullfeed_settings-menu') {
      FullFeed.viewSettings();
    } else if (e.target.id === 'gm_fullfeed_settings-menu2' || e.target.id === 'gm_fullfeed_settings-menu2child') {
      $id('settings-button').blur();
      FullFeed.viewSettings();
    } else if (e.target.id === 'gm_fullfeed_settings-general_keyhelpicon') {
      if (e.target.nextSibling.style.display !== 'block')
        e.target.nextSibling.style.display = 'block';
      else e.target.nextSibling.style.display = 'none';
    } else if (e.target.id === 'gm_fullfeed_settings-autoload_whitelist_add') {
      if (wlTitle.value) {
        if (wlList.value) wlList.value += '\n' + wlTitle.value;
        else wlList.value = wlTitle.value;
        wlTitle.value = null;
      }
    } else if (e.target.id === 'gm_fullfeed_settings-autoload_blacklist_add') {
      if (blTitle.value) {
        if (blList.value) blList.value += '\n' + blTitle.value;
        else blList.value = blTitle.value;
        blTitle.value = null;
      }
    } else if (e.target.className === 'gm_fullfeed_settings-siteinfo_link') {
      getElementsByXPath('id("gm_fullfeed_settings-siteinfo")//fieldset', document).forEach(function(i) {
        i.style.display = 'none';
      });
      getElementsByXPath('//span[contains(concat(" ", @class, " "), " gm_fullfeed_settings-siteinfo_link ")]', document).forEach(function(i) {
        if (hasClass(i, 'selected')) removeClass(i, 'selected');
      });
      addClass(e.target, 'selected');
      $id(e.target.id.slice(0, -5)).parentNode.style.display = 'block';
    } else if (e.target.id === 'gm_fullfeed_settings-security_iframetag') {
      if ($ids('security_iframetag').checked) {
        $ids('security_allowiframeurl').disabled = false;
        $ids('security_allowiframeurl').parentNode.style.color = 'black';
      } else {
        $ids('security_allowiframeurl').disabled = true;
        $ids('security_allowiframeurl').parentNode.style.color = 'gray';
      }
    } else if (e.target.id === 'gm_fullfeed_settings-social_socialicon') {
      ['buzzurl', 'delicious', 'facebook', 'fc2', 'hatena', 'livedoor', 'twitter', 'yahoo'].forEach(function(a) {
        if ($ids('social_socialicon').checked) {
          $ids('social_' + a).disabled = false;
          $ids('social_' + a).parentNode.style.color = 'black';
        } else {
          $ids('social_' + a).disabled = true;
          $ids('social_' + a).parentNode.style.color = 'gray';
        }
      });
    } else if (e.target.id === 'gm_fullfeed_settings-etc_settingsexport') {
      if (typeof GM_setClipboard === 'function') {
        if (window.confirm(loc[66])) {
          GM_setClipboard(JSON.stringify(st));
          message(loc[67], 3000);
        }
      } else window.confirm(loc[68] + JSON.stringify(st));
    } else if (e.target.id === 'gm_fullfeed_settings-etc_settingsimport') {
      var imp = window.prompt(loc[69]);
      try {
        if (imp && imp.length > 100 && JSON.parse(imp)) {
          FullFeed.loadSettings(JSON.parse(imp));
          FullFeed.saveSettings();
          set.style.display = 'none';
          message(loc[70], 3000);
        }
      } catch(er1) {
        message(loc[71], 3000, 'warning');
      }
    } else if (e.target.id === 'gm_fullfeed_settings-etc_settingsreset') {
      if (window.confirm(loc[72])) {
        FullFeed.loadSettings('reset');
        FullFeed.saveSettings();
        set.style.display = 'none';
        message(loc[73], 3000);
      }
    } else if (e.target.id === 'gm_fullfeed_settings-etc_cachereset') {
      if (window.confirm(loc[15])) FullFeed.resetCache();
    } else if (e.target.id === 'gm_fullfeed_settings-etc_cachedelete') {
      FullFeed.removeCache();
    } else if (e.target.id === 'gm_fullfeed_settings-ok') {
      var key = $ids('general_key'), hei = $ids('general_apheight');
      var v = key.value, h = hei.value, problem = false;
      if (v && ((isNaN(v) && v.length === 1) || (!isNaN(v) && (v < 16 || v > 18)))) st.basekey = v;
      st.autopagerize = $ids('general_autopagerize').checked;
      if (h && !isNaN(h)) st.apheight = (h < 200) ? 200 : (h > 2000) ? 2000 : h;
      st.autosearch = $ids('general_autosearch').checked;
      st.cantdisplay = $ids('general_cantdisplay').checked;
      st.notread = $ids('general_notread').value;
      st.openitem = $ids('general_openitem').checked;
      var rep = function(str) {
        return str.replace(/^(\s*\{)/g, '[$1').replace(/(\}),?(\s*)$/g, '$1$2]').replace(/\\\\/g, '\\').replace(/\\/g, '\\\\').replace(/\\\\\/\\\\\//g, '\\/\\/').replace(/"/g, "'").replace(/(\{\s*|:\s*|'\s*,\s*|\}\s*,\s*)'/g, '$1"').replace(/'(\s*:|\s*,\s*"|\s*,?\s*\})/g, '"$1').replace(/("\s*),(\s*\})/g, '$1$2').replace(/\}(\s*)\{/g, '},$1{');
      };
      var siff= $ids('siteinfo_fullfeed');
      var siap = $ids('siteinfo_autopagerize');
      var siuff= $ids('siteinfo_userfullfeed');
      var siuap = $ids('siteinfo_userautopagerize');
      if (!siff.value) siff.value = '[{"format": "JSON", "url": "http://wedata.net/databases/LDRFullFeed/items.json"}]';
      if (!siap.value) siap.value = '[{"format": "JSON", "url": "http://wedata.net/databases/AutoPagerize/items.json"}]';
      if (!siuff.value) siuff.value = '[{"url": "", "xpath": "", "type": "", "enc": ""}]';
      if (!siuap.value) siuap.value = '[{"url": "", "nextLink": "", "pageElement": ""}]';
      try {
        siteInfo = JSON.parse(rep(siff.value));
        st.siteinfo = JSON.stringify(siteInfo);
        siff.parentNode.style.backgroundColor = null;
      } catch(er2) {
        problem = true;
        siff.parentNode.style.backgroundColor = '#FCC';
      }
      try {
        siteInfoAP = JSON.parse(rep(siap.value));
        st.siteinfoap = JSON.stringify(siteInfoAP);
        siap.parentNode.style.backgroundColor = null;
      } catch(er3) {
        problem = true;
        siap.parentNode.style.backgroundColor = '#FCC';
      }
      try {
        userSiteInfo = JSON.parse(rep(siuff.value));
        st.usersiteinfo = JSON.stringify(userSiteInfo);
        siuff.parentNode.style.backgroundColor = null;
      } catch(er4) {
        problem = true;
        siuff.parentNode.style.backgroundColor = '#FCC';
      }
      try {
        userSiteInfoAP = JSON.parse(rep(siuap.value));
        st.usersiteinfoap = JSON.stringify(userSiteInfoAP);
        siuap.parentNode.style.backgroundColor = null;
      } catch(er5) {
        problem = true;
        siuap.parentNode.style.backgroundColor = '#FCC';
      }
      var sidu = $ids('siteinfo_disableitem');
      if (sidu) {
        st.disableitem = sidu.value.split('\n').filter(function(i) {
          if (i) return i;
        });
      }
      st.autoload = $ids('autoload_mode').selectedIndex;
      if (wlList) {
        st.autoloadfeed = wlList.value.split('\n').filter(function(i) {
          if (i) return i;
        });
      }
      if (blList) {
        st.notloadfeed = blList.value.split('\n').filter(function(i) {
          if (i) return i;
        });
      }
      wlTitle.value = null;
      blTitle.value = null;
      st.noscripttag = $ids('security_noscripttag').checked;
      st.iframetag = $ids('security_iframetag').checked;
      st.allowiframeurl = $ids('security_allowiframeurl').value;
      st.denynexturl = $ids('security_denynexturl').value;
      st.allownexturl = $ids('security_allownexturl').value;
      st.socialicon = $ids('social_socialicon').checked;
      st.socialbuzzurl = $ids('social_buzzurl').checked;
      st.socialdelicious = $ids('social_delicious').checked;
      st.socialfacebook = $ids('social_facebook').checked;
      st.socialfc2 = $ids('social_fc2').checked;
      st.socialhatena = $ids('social_hatena').checked;
      st.sociallivedoor = $ids('social_livedoor').checked;
      st.socialtwitter = $ids('social_twitter').checked;
      st.socialyahoo = $ids('social_yahoo').checked;
      debugLog = $ids('etc_debuglog').checked;
      st.replacefullfeedurl = $ids('etc_replacefullfeedurl').value;
      if (!problem) {
        set.style.display = 'none';
        FullFeed.saveSettings();
      }
    } else if (e.target.id === 'gm_fullfeed_settings-cancel') {
      set.style.display = 'none';
    }
  } else if (e.button === 0 && e.target.className === 'gm_fullfeed_settings-title') {
    var tab = $ids('tab').childNodes;
    var list = $ids('list').childNodes;
    for (var i = 0; i < tab.length; i++) {
      if (hasClass(tab[i], 'selected')) {
        removeClass(tab[i], 'selected');
        list[i].style.display = 'none';
      }
      if (tab[i].textContent === e.target.textContent) {
        addClass(tab[i], 'selected');
        list[i].style.display = 'block';
      }
    }
  } else if (hasClass(e.target, 'gm_fullfeed_checked_icon')) {
    if ((e.button === 0 && e.ctrlKey) || e.button === 1) FullFeed.viewSettings('autoload');
      else if (e.button === 0) initFullFeed();
  } else if (e.button === 0 && e.target.parentNode && e.target.parentNode.parentNode && e.target.parentNode.parentNode.id === 'gm_fullfeed_settings-siteinfo_disableitemlist' && e.target.nodeName === 'INPUT') {
    var temp = $ids('siteinfo_disableitem').value.split('\n');
    if (e.target.checked) {
      var chkbox = getElementsByXPath('//input', e.target.parentNode.parentNode.cloneNode(true));
      if (chkbox && !chkbox.some(function(a) {
        if (!a.checked) return true;
      })) {
        e.target.checked = false;
        return;
      } else temp.push(e.target.nextSibling.textContent);
    } else {
      temp = temp.filter(function(a) {
        return a !== e.target.nextSibling.textContent;
      });
    }
    temp = temp.filter(function(a) {
      return !/^\s*$/.test(a);
    });
    $ids('siteinfo_disableitem').value = temp.join('\n');
  } else if (e.button === 0) FullFeed.checkRegister();
  }, true);

document.addEventListener('scroll', function() {
  if (document.querySelector('.fd_itemlist')) {
    window.setTimeout(function() {
      if (st.autopagerize) FullFeed.checkScroll();
      FullFeed.checkRegister();
    }, 1000);
  } else if (st.autopagerize) {
    var c = new getCurrentItem();
      if (hasClass(c.innerContents, 'gm_fullfeed_loaded')) FullFeed.checkScroll();
  }
  }, false);
//};


// == [Utility] =================================
function removeXSSRisks(htmldoc) {
  var attr = 'allowScriptAccess';
  Array.prototype.forEach.call(htmldoc.getElementsByTagName('embed'), function(embed) {
    if (embed.hasAttribute(attr)) embed.setAttribute(attr, 'never');
  });
  Array.prototype.forEach.call(htmldoc.getElementsByTagName('param'), function(param) {
    if (param.getAttribute('name') === attr) param.setAttribute('value', 'never');
  });
}

function searchEntry(htmldoc) {
  var arM = ['hentry', 'xfolkentry', 'autopagerize_page_element'];
  var ar1 = ['articlebody', 'articlebox', 'articlesection', 'articletable', 'articlesbody', 'articlesbox', 'articlessection', 'articlestable', 'blockstory', 'blogbody', 'center', 'entlybody', 'entlytext', 'entrybody', 'entrycontent', 'entrytable', 'entrytext', 'mainarticle', 'maintext', 'maintxt', 'singlecontent', 'storycontent', 'yjmt'];
  var ar2 = ['blockleaf', 'boxcontent', 'contentbody', 'contentbox', 'contentinner', 'contenttext', 'contentsbody', 'contentsbox', 'contentsinner', 'contentstext', 'maincontent', 'mainframe', 'middlecontent', 'middlecontainer', 'newsbody', 'postbody', 'postcontent', 'textbody', 'kiji', 'newart'];
  var ar3 = ['article', 'blog', 'body', 'column', 'content', 'entry', 'main', 'middle', 'page', 'post', 'section', 'story', 'text', 'entries'];
  var s1 = '//*[contains(translate(concat(';
  var s2 = '@id, " ", @class';
  var s3 = '), "ABCDEFGHIJKLMNOPQRSTUVWXYZ-_ ", "abcdefghijklmnopqrstuvwxyz"), "';
  var s4 = '")]';
  var nM = arM.length, n1 = ar1.length, n2 = ar2.length, n3 = ar3.length;
  var makeXpath = function(ar, len, sp) {
    var x = [];
    ar.forEach(function(a, i) {
      if (sp) x.push(s1 + '" ", ' + s2 + ', " "' + s3 + ' ' + a + ' ' + s4);
      else x.push(s1 + s2 + s3 + a + s4);
      if (len > i + 1) x.push('|');
    });
    return x.join('');
  };
  var xpath = function() {
    var ar = ['date', 'foot', 'head', 'media', 'menu', 'navbar', 'navi', 'side', 'tool', 'widget'];
    var s1 = '[not((.|.//*|ancestor-or-self::*)[contains(translate(concat(@id, " ", @class), "ABCDEFGHIJKLMNOPQRSTUVWXYZ-_", "abcdefghijklmnopqrstuvwxyz"), "';
    var s2 = '")])]';
    var x = ['//*[not(.//head|ancestor-or-self::head)][not(.//link|ancestor-or-self::link)][not(.//style|ancestor-or-self::style)]'];
    ar.forEach(function(a) {
      x.push(s1 + a + s2);
    });
    return x.join('');
  };
  
  try {
    var max = 0, data;
    var elms = getElementsByXPath(makeXpath(arM, nM, true), htmldoc);
    if (!elms) elms = getElementsByXPath(makeXpath(ar1, n1, true), htmldoc);
    if (!elms) elms = getElementsByXPath(makeXpath(ar1, n1, false), htmldoc);
    if (!elms) elms = getElementsByXPath(makeXpath(ar2, n2, true), htmldoc);
    if (!elms) elms = getElementsByXPath(makeXpath(ar2, n2, false), htmldoc);
    if (!elms) elms = getElementsByXPath(makeXpath(ar3, n3, true), htmldoc);
    if (!elms) elms = getElementsByXPath(makeXpath(ar3, n3, false), htmldoc);
    if (!elms) elms = getElementsByXPath(xpath(), htmldoc);
    if (!elms) return null;
    elms.forEach(function(e) {
      if (typeof e.textContent !== 'string') return;
      var n = e.textContent.replace(/^\s+|\s+$|(?:\r?\n|\r){2,}/g, '').length;
      if (max < n) {
        max = n;
        data = e;
      }
    });
    return (data) ? [data] : null;
  } catch(e) {
    return null;
  }
}

function relativeToAbsolutePath(htmldoc, base) {
  var top = /^https?:\/\/[^\/]+/.exec(base)[0];
  var current = base.replace(/\/[^\/]+$/, '/'), url;
  Array.prototype.forEach.call(htmldoc.getElementsByTagName('a'), function(a) {
    url = a.getAttribute('href');
    if (url) {
      if (url.indexOf(' ') === 0) url = url.replace(/^\s+(.+)/, "$1");
      a.href = _rel2abs(url, top, current, base);
    }
  });
  Array.prototype.forEach.call(htmldoc.getElementsByTagName('img'), function(img) {
    url = img.getAttribute('src');
    if (url) {
      if (url.indexOf(' ') === 0) url = url.replace(/^\s+(.+)/, "$1");
      img.src = _rel2abs(url, top, current, base);
    }
  });
}

function _rel2abs(url, top, current, base) {
  return (new RegExp('^https?://').test(url)) ? url :
      (url.indexOf('/') === 0) ? top + url :
      (url.indexOf('#') === 0) ? base + url : current + url;
}

function message(mes, dur, typ) {
  var box = $id('gm_fullfeed_message');
  if (!box) return;

  var dura = (dur < 0) ? 300000 : (!dur) ? 1500 : dur;
  var type = typ;
  box.innerHTML = mes;
  if (type) addClass(box, 'gm_fullfeed_' + type);
  removeClass(box, 'gm_fullfeed_hidden');






  window.clearTimeout(messageInterval);
  messageInterval = window.setTimeout(function() {
    addClass(box, 'gm_fullfeed_hidden');

    if (type) removeClass(box, 'gm_fullfeed_' + type);
    box.innerHTML = '';
  }, dura);
}

// AutoPagerize (c) id:swdyh
function createHTMLDocumentByString(str) {
  if (document.documentElement.nodeName !== 'HTML')
    return new DOMParser().parseFromString(str, 'application/xhtml+xml');
  var html = strip_html_tag(str), htmlDoc;
  try {
    htmlDoc = document.cloneNode(false);
    htmlDoc.appendChild(htmlDoc.importNode(document.documentElement, false));
  } catch(e) {
    htmlDoc = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
  }
  var fragment = createDocumentFragmentByString(html);
  try {
    fragment = htmlDoc.adoptNode(fragment);
  } catch(e) {
    fragment = htmlDoc.importNode(fragment, true);
  }
  htmlDoc.documentElement.appendChild(fragment);
  return htmlDoc;
}

// AutoPagerize (c) id:swdyh
function getElementsByXPath(xpath, node) {
  var ss = getXPathResult(xpath, node, 7);
  var data = [];
  for (var i = 0; i < ss.snapshotLength; i++) data.push(ss.snapshotItem(i));
  return (data.length > 0) ? data : null;
}

// AutoPagerize (c) id:swdyh
function getFirstElementByXPath(xpath, node) {
  var result = getXPathResult(xpath, node, 9);
  return result.singleNodeValue;
}

// AutoPagerize (c) id:swdyh
function getXPathResult(xpath, nod, resultType) {
  var node = nod || document;
  var doc = node.ownerDocument || node;
  var resolver = doc.createNSResolver(node.documentElement || node);
  var defaultNS = null;
  try {
    if (node.nodeType === node.DOCUMENT_NODE) defaultNS = node.documentElement.lookupNamespaceURI(null);
    else defaultNS = node.lookupNamespaceURI(null);
  } catch(e) {}
  if (defaultNS) {
    var defaultPrefix = '__default__';
    xpath = addDefaultPrefix(xpath, defaultPrefix);
    var defaultResolver = resolver;
    resolver = function(prefix) {
      return (prefix === defaultPrefix) ? defaultNS : defaultResolver.lookupNamespaceURI(prefix);
    };
  }
  return doc.evaluate(xpath, node, resolver, resultType, null);
}

// AutoPagerize (c) id:swdyh
function addDefaultPrefix(xpath, prefix) {
  var tokenPattern = /([A-Za-z_\u00c0-\ufffd][\w\-.\u00b7-\ufffd]*|\*)\s*(::?|\()?|(".*?"|'.*?'|\d+(?:\.\d*)?|\.(?:\.|\d+)?|[\)\]])|(\/\/?|!=|[<>]=?|[\(\[|,=+\-])|([@$])/g;
  var TERM = 1, OPERATOR = 2, MODIFIER = 3;
  var tokenType = OPERATOR;
  prefix += ':';
  function replacer(token, identifier, suffix, term, operator) {
    if (suffix) tokenType = (suffix === ':' || (suffix === '::' && (identifier === 'attribute' || identifier === 'namespace'))) ? MODIFIER : OPERATOR;
    else if (identifier) {
      if (tokenType === OPERATOR && identifier !== '*') token = prefix + token;
      tokenType = (tokenType === TERM) ? OPERATOR : TERM;
    } else tokenType = (term) ? TERM : (operator) ? OPERATOR : MODIFIER;
    return token;
  }
  return xpath.replace(tokenPattern, replacer);
}

// AutoPagerize (c) id:swdyh
function createDocumentFragmentByString(str) {
  var range = document.createRange();
  range.setStartAfter(document.body);
  return range.createContextualFragment(str);
}

// AutoPagerize (c) id:swdyh
function strip_html_tag(str) {
  var chunks = str.split(/(<html(?:[ \t\r\n][^>]*)?>)/);
  if (chunks.length >= 3) chunks.splice(0, 2);
  str = chunks.join('');
  chunks = str.split(/(<\/html[ \t\r\n]*>)/);
  if (chunks.length >= 3) chunks.splice(chunks.length - 2);
  return chunks.join('');
}

function pathToURL(url, path) {
  var re = (path.indexOf('/') === 0) ? /^([a-zA-Z]+:\/\/[^\/]+)\/.*$/ : /^(.*\/).*$/;
  return url.replace(re, '$1' + path);
}

})();
