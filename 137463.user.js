// ==UserScript==
// @name        Amazon to honto
// @namespace   http://userscripts.org/users/473164
// @description Amazonにhontoへの商品リンクを追加
// @include     http://*.amazon.*
// @version     1.0.1
// @grant       GM_xmlhttpRequest
// @grant       GM_log
// ==/UserScript==

/*
既知の問題：
・hontoに商品はあるが、ISBN検索で該当しないものがある
・hontoのISBN検索は、電子書籍が優先的に表示される
  →電子書籍のページ中に'紙書籍の紹介ページを見る'のリンクがないものは紙書籍の情報を取得できない
 */
(function(){
  /* ------------------------------------------------------------------------------------------ */
  // ユーザー設定項目
  /* ------------------------------------------------------------------------------------------ */
  // ページ表示後、自動的にhontoからの情報取得を開始する
  AUTO_LOAD = true;
  
  // 紙書籍と電子書籍がある場合、可能ならば紙書籍の情報を優先する
  const PRIOR_PAPERBOOK = true;
  
  // 18歳以上ならtrue
  const ADULT_AUTH = true;
  
  // 「カートに入れる」を押した後、カートのページにに移動しない
  const NOMOVE_TO_CART = true;
  // 「欲しい本に追加する」を押した後、欲しい本のページに移動しない
  const NOMOVE_TO_WISHLIST = true;
  /* ------------------------------------------------------------------------------------------ */
  // デバッグ用
  const DEBUG = true;
  
  // リンク抽出・挿入位置情報
  var PAGEINFO = [
    {
    type: 'wishlist_compact',
    urlExp: 'layout=compact',
    insertAfter: '//span[@class="small productTitle"]/parent::td/span[last()]',
    asinLink: '//span[@class="small productTitle"]/strong/a',
    },
    {
    type: 'wishlist',
    urlExp: 'wishlist',
    insertAfter: '//tbody[@class="itemWrapper"]/tr[3]/td[2]/div[last()]',
    asinLink: '//span[@class="small productTitle"]/strong/a',
    },
    {
    type: 'search',
    urlExp: 'keywords=',
    insertAfter: '//div[starts-with(@id, "result_")]/*[last()]',
    asinLink: '//div[starts-with(@id, "result_")]//h3/a',
    },
    {
    type: 'bestsell',
    urlExp: '/bestsellers/',
    insertAfter: '//div[@class="zg_itemInfo"]/*[last()]',
    asinLink: '//div[@class="zg_itemInfo"]/div[@class="zg_title"]/a',
    },
    {
    type: 'newrelease',
    urlExp: '/new-releases/',
    insertAfter: '//div[@class="zg_itemInfo"]/*[last()]',
    asinLink: '//div[@class="zg_itemInfo"]/div[@class="zg_title"]/a',
    },
    {
    type: 'recommend',
    urlExp: '/yourstore/',
    insertAfter: '//table[@class="priceBox"]/tbody/tr[last()]',
    asinLink: '//td[@width="100%"]/a',
    },
    {
    type: 'listmania',
    urlExp: '/lm/',
    insertAfter: '//td[@class="listItem"]/table/*[last()]',
    asinLink: '//td[@class="listItem"]/a',
    },
    {
    type: 'history',
    urlExp: '/history/',
    insertAfter: '//table[@class="priceBox"]/tbody/tr[last()]',
    asinLink: '//td[@width="100%"]/a',
    },
    {
    type: 'author',
    urlExp: 'author',
    insertAfter: '//div[@class="data"]/*[last()]',
    asinLink: '//div[@class="data"]/h3[@class="title"]/a[@class="title"]',
    }
    ];
  
  // 追加スタイルシート
  var STYLE = ['.stIconProductNew{',
'margin-left:5px;',
'margin-right:2px;',
'font-size:10px ! important;',
'font-weight:bold;',
'display:inline-block;',
'text-align:center;',
'line-height:1 ! important;',
'vertical-align:top;',
'word-wrap:break-word;',
'word-break:break-all;',
'background:#ff8d00;',
'padding:3px 1px ! important;',
'width:37px;',
'color:#fff;',
'}',
  
'.stIconProduct01{',
'margin-left:5px;',
'margin-right:2px;',
'font-size:10px ! important;',
'display:inline-block;',
'text-align:center;',
'line-height:1 ! important;',
'vertical-align:top;',
'word-wrap:break-word;',
'word-break:break-all;',
'background:#eee;',
'border:1px solid #ddd;',
'padding:2px 1px ! important;',
'width:56px;',
'color:#7f7f7f;',
'}',
  
'.stIconProduct02{',
'margin-left:5px;',
'margin-right:2px;',
'font-size:10px ! important;',
'/*font-weight:bold;*/',
'display:inline-block;',
'text-align:center;',
'line-height:1 ! important;',
'vertical-align:top;',
'word-wrap:break-word;',
'word-break:break-all;',
'background:#64a608;',
'padding:3px 1px ! important;',
'width:58px;',
'color:#fff;',
'}',
  
'.stIconProduct03{',
'margin-left:5px;',
'margin-right:2px;',
'font-size:10px ! important;',
'display:inline-block;',
'text-align:center;',
'line-height:1 ! important;',
'vertical-align:top;',
'word-wrap:break-word;',
'word-break:break-all;',
'background:#fff;',
'border:1px solid #64a608;',
'padding:2px 1px ! important;',
'width:56px;',
'color:#64a608;',
'}',
  
'.stIconProduct04{',
'margin-left:5px;',
'margin-right:2px;',
'font-size:10px ! important;',
'/*font-weight:bold;*/',
'display:inline-block;',
'text-align:center;',
'line-height:1 ! important;',
'vertical-align:top;',
'word-wrap:break-word;',
'word-break:break-all;',
'background:#ffc;',
'border:1px solid #64a608;',
'padding:2px 1px ! important;',
'width:56px;',
'color:#64a608;',
'}',
  
'.stIconProduct05{',
'font-size:10px ! important;',
'display:inline-block;',
'min-width:67px;',
'margin-left:5px;',
'/*margin-right:2px;',
'text-align:center;',
'line-height:1 ! important;',
'vertical-align:top;',
'word-wrap:break-word;',
'word-break:break-all;',
'background:#adadad;',
'padding:3px 1px ! important;',
'width:67px;',
'color:#fff;*/',
'}',

'.stIconProduct06{',
'margin-left:5px;',
'margin-right:2px;',
'font-size:10px ! important;',
'display:inline-block;',
'text-align:center;',
'line-height:1 ! important;',
'vertical-align:top;',
'word-wrap:break-word;',
'word-break:break-all;',
'background:#fff;',
'border:1px solid #bfbfbf;',
'padding:2px 1px ! important;',
'width:86px;',
'color:#666;',
'}',

'.stIconProduct07{',
'position:relative;',
'margin-left:5px;',
'margin-right:2px;',
'font-size:10px ! important;',
'display:inline-block;',
'line-height:1.1;',
'vertical-align:middle;',
'word-wrap:break-word;',
'word-break:break-all;',
'background:#ffc;',
'border:1px solid #64a608;',
'padding:1px 6px ! important;',
'width:31px;',
'height:41px;',
'color:#64a608;',
'}',

'.hontoLinkBlock{',
'margin-top:3px;',
'}',
'.hontoLink{',
'margin-right:2px;',
'display:inline-block;',
'text-align:center;',
'line-height:1 ! important;',
'padding:2px 1px ! important;',
'background:#6baee5;',
'text-decoration : none ! important;',
'color:#fff ! important;',
'font-size:12px ! important;',
'min-width:60px;',
'vertical-align:top;',
'}',
'.hontoText{',
'padding:2px 1px ! important;',
'font-size:12px ! important;',
'vertical-align:top;',
'}',
'.hontoError{',
'font-size:12px ! important;',
'font-weight:bold;',
'margin-left:5px;',
'color:red ! important;',
'vertical-align:top;',
'}',
'.hontoSmallLink01{',
'text-decoration : none ! important;',
'font-size:10px ! important;',
'margin-left:5px;',
'vertical-align:top;',
'}',
'.hontoSmallLink02{',
'text-decoration : none ! important;',
'font-size:10px ! important;',
'color:#900 ! important;',
'margin-left:5px;',
'vertical-align:top;',
'}',
  ].join('\n');
  
  /* ------------------------------------------------------------------------------------------ */
  // Main process
  addGlobalStyle((STYLE).toString());
  run();
  // ページ更新対応
  var timer = 0;
  document.addEventListener('DOMNodeInserted', function() {
    if(timer) return;
    timer = setTimeout(function() {
      run();
      timer = 0;
    }, 100);
  }, false);
  /* ------------------------------------------------------------------------------------------ */
  // Functions
  function run(){
    if(AUTO_LOAD){
      auto_start();
    }else{
      pre_start();
    }
  }
  
  // 検索開始リンクの生成
  function pre_start(){
    var pinfo = getPageType(document.location.href);
    if(pinfo && !document.getElementById('honto_pre_start')){
      var targets = get_x(pinfo.insertAfter);
      var links = get_x(pinfo.asinLink);
      for(var i = 0; i < targets.length; i++){
        if(pinfo.type == 'singleitem'){
          var isbn = links[i].value;
        }else{
          var isbn = getISBN(links[i].href);
        }
        if(targets[i].parentNode.getElementsByClassName('hontoLinkBlock').length == 0 && isbn){
          debug_message('honto pre start');
          var start = document.createElement('div');
          start.setAttribute('class', 'hontoLinkBlock');
          start.setAttribute('id','honto_pre_start');
          
          var start_link = document.createElement('a');
          start_link.setAttribute('class', 'hontoLink');
          start_link.innerHTML = '&raquo; hontoで検索する';
          start_link.href = 'javascript:void(0)';
          
          start.appendChild(start_link);
          start_link.addEventListener('click', function(){
            debug_message('start');
            this.removeEventListener('click', arguments.callee, false);
            start.parentNode.removeChild(start);
            auto_start();
          },false);
          
          targets[i].parentNode.insertBefore(start, targets[0].nextSibling);
          break;
        }
      }
    }
  }
  
  // 検索開始
  function auto_start(){
    var pinfo = getPageType(document.location.href);
    if(pinfo){
      var targets = get_x(pinfo.insertAfter);
      var links = get_x(pinfo.asinLink);
      // リンクと挿入位置の数が一致しているかチェック
      if(targets.length != links.length){
        debug_message('target/isbn count error :' + targets.length + ', ' + links.length);
      }
      else{
        for(var i = 0; i < links.length; i++){
          if(pinfo.type == 'singleitem'){
            var isbn = links[i].value;
            var title = format_title(document.getElementById('btAsinTitle').innerHTML);
          }else{
            var isbn = getISBN(links[i].href);
            var title = format_title(links[i].innerHTML);
          }
          if(isbn && targets[i].parentNode.getElementsByClassName('hontoLinkBlock').length == 0){
            if(i == 0) debug_message('page type :' + pinfo.type);
            var honto_search = create_honto_search(conv2ISBN13(isbn).substr(0,12), title);
            targets[i].parentNode.insertBefore(honto_search, targets[i].nextSibling);
          }else{
            //debug_message('no isbn :' + links[i].href);
          }
        }
      }
    }
  }
  
  // hontoの情報表示ブロックを作成
  function create_honto_search(isbn, title){
    var info_url = 'http://honto.jp/redirect.html?bookno=' + isbn;
    
    var honto_search = document.createElement('div');
    honto_search.setAttribute('class', 'hontoLinkBlock');
    if(title) honto_search.title = title;
    
    var item_link = document.createElement('a');
    item_link.setAttribute('class', 'hontoLink');
    item_link.innerHTML = 'honto';
    item_link.href = info_url;
    
    var sub_text = document.createElement('span');
    sub_text.setAttribute('class', 'hontoText');
    sub_text.innerHTML = '：検索中…';
    
    honto_search.appendChild(item_link);
    honto_search.appendChild(sub_text);
    
    get_item_info(honto_search, info_url);
    
    return honto_search;
  }
  
  // hontoの商品情報を取得
  function get_item_info(block, info_url){
    var item_link = block.getElementsByClassName('hontoLink')[0];
    var sub_text  = block.getElementsByClassName('hontoText')[0];
    
    GM_xmlhttpRequest({
      method:'GET',
      url:info_url,
      onload:function(res) {
        var res_html = document.createElement('div');
        res_html.innerHTML = res.responseText;
        var title = res_html.getElementsByTagName('title');
        // 該当商品なし
        if(title[0].innerHTML == 'honto - お探しのページが見つかりませんでした'){
          block.removeChild(sub_text);
          var isbn_search = document.createElement('a');
          isbn_search.href = info_url;
          link_error(isbn_search, 'ISBN検索に該当なし');
          block.appendChild(isbn_search);
          
          debug_message('no hit by isbn search :' + block.title);
          var keyword_search = document.createElement('a');
          keyword_search.setAttribute('class', 'hontoSmallLink01');
          keyword_search.href = 'https://honto.jp/netstore/search_10' + block.title + '.html';
          keyword_search.innerHTML = '&raquo; タイトルで検索';
          block.appendChild(keyword_search);
        }
        // アダルト商品の認証ページをYesにして飛ばす
        else if(title[0].innerHTML == 'hontoネットストア - アダルト認証' && ADULT_AUTH){
          GM_xmlhttpRequest({
            method:'GET',
            url:'http://honto.jp/netstore/adult-auth.html?certify=1',
            onload:get_item_info(block, info_url),
          });
        }
        else{
          var prdurl = get_x('//meta[@property="og:url"]', res_html);
          if(prdurl[0]){
            var prdid = prdurl[0].content.match(/^http:\/\/honto\.jp\/(netstore\/pd-book|ebook\/pd)_([0-9]+)\.html/);
            item_link.href = prdurl[0].content;
            // 紙書籍
            if(prdid[1] == 'netstore/pd-book'){
              var send = get_x('//li[@class="stSend"]/span[contains(@class, "stIconProduct")]', res_html);
              if(send[0]){
                block.removeChild(sub_text);
                block.appendChild(send[0]);
                // stIconProduct02 24時間
                // stIconProduct03 1～3日/7～21日
                // stIconProduct04 予約可
                // stIconProduct05 購入できません
                if(send[0].getAttribute('class').match(/^stIconProduct0[2-4]$/) != null){
                  block.appendChild(create_buy_link(prdid[2], 'ns', NOMOVE_TO_CART));
                  block.appendChild(create_addwishlist_link(prdid[2], NOMOVE_TO_WISHLIST));
                }
              }else{
                link_error(sub_text, 'Error：発送可能日の取得に失敗');
              }
            }
            // 電子書籍
            else if(prdid[1] == 'ebook/pd'){
              var book_url = get_x('//a[text()="紙書籍の紹介ページを見る"]', res_html);
              // 紙書籍のページがあり、紙書籍優先
              if(book_url[0] && PRIOR_PAPERBOOK){
                debug_message('book info search : ' + book_url[0].href);
                get_item_info(block, book_url[0].href);
              }else{
                block.removeChild(sub_text);
                var icon = document.createElement('span');
                icon.setAttribute('class', 'stIconProduct01');
                icon.innerHTML = '電子書籍';
                block.appendChild(icon);
                block.appendChild(create_buy_link(prdid[2], 'eb', NOMOVE_TO_CART));
                block.appendChild(create_addwishlist_link(prdid[2], NOMOVE_TO_WISHLIST));
              }
            }
            else{
              link_error(sub_text, 'Error：商品IDの取得に失敗');
            }
          }
          else{
            link_error(sub_text, 'Error：商品urlの取得に失敗');
          }
        }
      }
    });
  }
  
  // 買い物カゴに入れるリンクを生成
  function create_buy_link(prdid, store, nomove){
    var link = document.createElement('a');
    link.setAttribute('class', 'hontoSmallLink01');
    var link_url = 'http://honto.jp/reg/cart-' + store + '.html?prdid='+prdid;
    
    // 追加後にページ移動しない
    if(nomove){
      link.href = 'javascript:void(0)';
      link.innerHTML = '&raquo; 買い物カゴに入れる';
      link.addEventListener('click', function(){
        link.removeEventListener('click', arguments.callee, false);
        link.innerHTML = '&raquo; 買い物カゴに入れています…';
        GM_xmlhttpRequest({
          method: 'GET',
          url: link_url,
          onload: function(res){
            var res_html = document.createElement('div');
            res_html.innerHTML = res.responseText;
            // 正常にカートに入ったか検証 + 合計金額の取得
            var yen = get_x('//div[@class="stBlock02"]/p/span[@class="stYen"]/em', res_html);
            var first_item = get_x('//a[@id="dy_prdNm[0]"]', res_html);
            if(yen[0] && first_item[0] && first_item[0].href.match(/^http:\/\/honto\.jp\/(netstore\/pd-book|ebook\/pd)_([0-9]+)\.html/)[2] == prdid){
              link.setAttribute('class', 'hontoSmallLink02');
              link.innerHTML = '&raquo; 買い物カゴに入れました(合計金額:' + yen[0].innerHTML + '円)';
            }
            else{
              link_error(link,'Error:買い物カゴに入っているか確認して下さい');
            }
            link.href = 'http://honto.jp/reg/cart-' + store + '.html';
          },
        });
      },false);
    }
    else{
      link.href = link_url;
      link.innerHTML = '&raquo; 買い物カゴに入れる';
    }
    return link;
  }
  
  // 欲しい本に追加するリンクを生成
  function create_addwishlist_link(prdid, nomove){
    var link = document.createElement('a');
    link.setAttribute('class', 'hontoSmallLink01');
    var link_url = 'https://honto.jp/my/wishlist.html?prdid='+prdid;
    
    // 追加後にページ移動しない
    if(nomove){
      link.href = 'javascript:void(0)';
      link.innerHTML = '&raquo; 欲しい本に登録する';
      link.addEventListener('click', function(){
        link.removeEventListener('click', arguments.callee, false);
        link.innerHTML = '&raquo; 欲しい本に登録しています…';
        GM_xmlhttpRequest({
          method: 'GET',
          url: link_url,
          onload: function(res){
            var res_html = document.createElement('div');
            res_html.innerHTML = res.responseText;
            // 正常に追加されたか検証
            var first_item = get_x('//a[@id="dy_020_prdNm[0]"]', res_html);
            if(first_item[0] && first_item[0].href.match(/^http:\/\/honto\.jp\/(netstore\/pd-book|ebook\/pd)_([0-9]+)\.html/)[2] == prdid){
              link.setAttribute('class', 'hontoSmallLink02');
              link.innerHTML = '&raquo; 欲しい本に登録済';
            }else{
              link_error(link,'Error:欲しい本に登録されているか確認して下さい');
            }
            link.href = 'https://honto.jp/my/wishlist.html';
          },
        });
      },false);
    }
    else{
      link.href = link_url;
      link.innerHTML = '&raquo; 欲しい本に登録する';
    }
    return link;
  }
  
  /* ------------------------------------------------------------------------------------------ */
  // XPATHのクエリにマッチする要素を返す
  function get_x(query, parent_element){
    var ary = [];
    var results = document.evaluate(query, parent_element || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < results.snapshotLength; i++){
      ary.push(results.snapshotItem(i));
    }
    return ary;
  }
  
  // エラーメッセージ出力
  function link_error(link, message){
    link.setAttribute('class', 'hontoError');
    link.innerHTML = message;
  }
  
  // タイトルの文字列整形
  function format_title(title){
    
    // 末尾の括弧は中身ごと削除
    //title = title.replace(/(?:\([^\(\)]+\)|<span[^<>]*>[^<>]+<\/span>| )+$/g, '');
    title = title.replace(/(?:<span[^<>]*>[^<>]+<\/span>| )+$/g, '');
    // タグは全て削除
    title = title.replace(/<[^<>]+>/g, '');
    
    return title;
  }
  
  // ページ種別を取得
  function getPageType(url) {
    // 個別商品ページ
    if(document.getElementById('ASIN')){
      return {
        type: 'singleitem',
        insertAfter: '//form[@id="handleBuy"]/*[last()]',
        asinLink: '//input[@id="ASIN"]',
      };
    }
    // その他ページ
    else{
      for (i = 0, len = PAGEINFO.length; i < len; i++) {
        var pinfo = PAGEINFO[i];
        if (url.indexOf(pinfo.urlExp) != -1) return pinfo;
      }
    }
  }
  
  // ISBNを取得
  function getISBN(str) {
    if(str.match(/\/([\d]{9}[\dX])\//)) return RegExp.$1;
  }
  function conv2ISBN13(str) {
    var result = '978' + str.substr(0,9);
    var checkDigit = 38;
    for (var i = 0; i < 9; i++) {
      var c = str.charAt(i);
      checkDigit += ( i % 2 == 0 )? c * 3 : c * 1;
    }
    checkDigit = (10 - (checkDigit % 10)) % 10;
    result += checkDigit;
    return result;
  }
  
  // スタイルシートを追加
  function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
  }
  
  // DEBUG=trueのときにメッセージを表示
  function debug_message(text){
    if(DEBUG){
      GM_log(text);
    }
  }  
})();
