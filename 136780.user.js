// ==UserScript==
// @name        honto_ui_custom
// @namespace   http://userscripts.org/users/473164
// @description ハイブリッド型総合書店hontoのUIを調整
// @include     http://honto.jp/*
// @include     https://honto.jp/*
// @version     1.36
// @grant       GM_xmlhttpRequest
// @grant       GM_log
// ==/UserScript==
(function(){
  /* ------------------------------------------------------------------------------------------ */
  // ユーザー設定項目
  /* ------------------------------------------------------------------------------------------ */
  // 欲しい本の表示件数を変更する
  const CHANGE_WISHLIST_DISPNUM = true;
  // 欲しい本のデフォルト表示件数
  const DEFAULT_DISPNUM = 50;
  // 欲しい本の表示件数のプルダウンリストに追加する値
  const WISHLIST_NUMLIST = [100, 150, 200];
  
  // 検索結果リストの各商品に「欲しい本に追加する」を表示する
  // ※欲しい本には「欲しい本の先頭に移動する」を表示する
  const ADD_WISHLIST_LINK = true;
  
  // 検索結果リスト/欲しい本 の各商品に一括選択用のチェックボックスを表示する
  const ADD_CHECKBOX = true;
  
  // 「ご注文内容の確認」画面の新刊お知らせメールのチェックボックスを全てオフにする
  const CHECK_AUTHER_OFF = true;
  
  // 買い物カゴに入れるのと同時に、欲しい本から削除する
  const PUT_CART_DEL_WISHLIST = true;
  
  // 買い物カゴのページに検索窓を表示する
  const ADD_SEARCHBOX_AT_CART = true;
  
  // 検索結果のデフォルト表示を縮小レイアウトにする
  const USE_CONPACT_VIEW_SEARCH = false;
  // 欲しい本のデフォルト表示を縮小レイアウトにする
  const USE_CONPACT_VIEW_WISHLIST = true;
  
  // 買い物カゴに商品が入っている場合、商品点数の横に価格を表示する
  const DISP_PRICE = true;
  
  // 個別商品ページにAmazonへのリンクを追加する
  const ADD_AMAZON_LINK = true;
  
  // あしあとボタンをページ表示と同時に自動的に押す
  const AUTO_CLICK_FOOTMARK = true;
  
  // ブラウザの最小フォントサイズ
  const MIN_FONTSIZE = null;
  
  // 画面右上にマイページ/欲しい本へのリンクを常に表示
  const NAVIGATION_LINK = {
    'マイページ'   : 'http://honto.jp/my.html',
    '欲しい本'     : 'http://honto.jp/my/wishlist.html',
    'あしあと'     : 'https://honto.jp/my/account/point/footmark.html',
  };
  
  // 検索ボックスの検索対象ジャンルの初期値
  // 0 : すべての商品から
  // 1 : 本
  // 2 : 電子書籍
  // 3 : Music
  // 4 : DVD
  // 5 : 雑誌
  // 6 : その他
  const DEFAULT_SEARCH_CATEGORY = 0;
  
  //買い物カゴで書影を表示する
  const SHOW_CART_IMAGE = true;
  
  //買い物カゴに10件以上入っている場合でも、1ページで全て表示する
  const SHOW_CART_ALLITEM = true;
  
  // ログインパスワードのオートコンプリートを有効にする
  const REMEMBER_PASSWORD = true;
  
  // 欲しい本に発送可能日/価格/予算/タイトル による絞込みを追加する
  const USE_FILTER = true;
  // カテゴリによるフィルタ情報をページ表示と同時に読み込む
  const AUTO_LOAD_FILTER = false;
  const MIN_SUB_CATEGORY_COUNT = 10;
  // 絞込みで、Enterを入力するまで結果を表示しない
  const ENTER_BEFORE_FILTER = false;
  
  // マイページの初期表示
  // true  : 畳む
  // false : 畳まない
  const HIDE_MYPAGE_ITEMS = {
    'おすすめの本'            : true,
    'マイ本棚 ～未評価の本～' : true,
    'お気に入り著者新刊'      : true,
    '最近チェックした本'      : false,
    '欲しい本'                : false,
    '店舗ニュース'            : false,
  }
  /* ------------------------------------------------------------------------------------------ */
  // デバッグ用
  const DEBUG = false;
  /* ------------------------------------------------------------------------------------------ */
  // カートに入る点数のシステム上限
  const CART_MAX = 100;
  // 欲しい本に入る点数のシステム上限
  const WISHLIST_MAX = 200;
  // 一度に読み込める点数のシステム上限
  const READ_MAX = 50;
  // 発送可能日の情報
  const DATE2CLASS = {
    '24時間'  : 'stIconProduct02',
    '1～3日'  : 'stIconProduct03',
    '7～21日' : 'stIconProduct03',
    '予約可'  : 'stIconProduct04',
    '近刊'    : 'stIconProduct03',
    '購入できません' : 'stIconProduct05',
  }
  var NUM2DATE = [];
  for(var i in DATE2CLASS) NUM2DATE.push(i);
  var DATE2NUM = [];
  for(var i in NUM2DATE) DATE2NUM[NUM2DATE[i]] = i;
  var ITEM_COUNT, PGNO, DSPNO, MIN_PRICE, MAX_PRICE;
  var CART_PRICE = 0;
  var POINT = 0;
  /* ------------------------------------------------------------------------------------------ */
  // 現在のページ種別を取得
  const PAGEINFO = {
    '/my/wishlist'       : 'wishlist',
    '/netstore/pd-book_' : 'item_book',
    '/ebook/pd_'         : 'item_ebook',
    '/ebook/pd-series_'  : 'item_ebook_series',
    '/netstore/search'   : 'search_book',
    '/ebook/search'      : 'search_ebook',
    '/reg/cart-ns'       : 'cart_book',
    '/reg/cart-eb'       : 'cart_ebook',
    'honto.jp/my.html'   : 'mypage',
    '/ranking/'          : 'ranking',
    '/release/'          : 'release',
    '/point/footmark'    : 'footmark'
    };
  for (var url_exp in PAGEINFO){
    if(location.href.indexOf(url_exp) != -1){
      var page_type = PAGEINFO[url_exp];
      debug_message('page type :' + page_type);
      break;
    }
  }
  
  // 追加スタイルシート
  var STYLE = [
'  .stItemCompact{',
'    display:inline-block;',
'    width:90px;',
'    height:290px;',
'    vertical-align:top;',
'    margin-top:5px;',
'    border-right:1px solid #e6e6e6;',
'    border-bottom:1px solid #e6e6e6;',
'  }',
'  ',
'  .stCoverCompact{',
'    padding-left:7px;',
'    height:120px;',
'  }',
'  ',
'  .stHeadingCompact{',
'    width: 85px;',
'    height: 64px;',
'    font-size:10px;',
'    white-spce: nowrap;',
'    overflow:hidden;',
'  }',
'  ',
'  .stDataCompact{',
'    margin-left:2px;',
'  }',
'  ',
'  .stErrorCompact{',
'    font-size:10px;',
'    color:red',
'  }',
'  ',
'  .hontoSmallCartLink{',
'    text-decoration : none ! important;',
'    font-size:10px;',
'  }',
'  ',
'  .hontoSmallWishListLink{',
'    text-decoration : none ! important;',
'    font-size:10px;',
'  }',
'  ',
'  .hontoSmallDelLink{',
'    text-decoration : none ! important;',
'    font-size:10px;',
'    color:#900 ! important;',
'  }',
'  ',
'  .stMypageAdd{',
'    padding:4px 0 4px 25px;',
'    background:url("/library/img/pc/icon_user-nav_02.png") no-repeat 0 1px;',
'  }',
'  ',
'  .stCartImage{',
'    float:left;',
'    margin-top:5px;',
'    margin-right:10px;',
'  }',
'  ',
'  .filterCheckBox{',
'    color : black !important;',
'    font-size : 12px !important;',
'    vertical-align : middle;',
'    margin-right : 4px;',
'  }',
'  ',
'  .filterAllCheck{',
'    color : black !important;',
'    font-size : 12px !important;',
'    vertical-align : middle;',
'    margin-right : 4px;',
'  }',
'  ',
'  .stNavSort01 .stIconProduct02{',
'    color : #fff !important;',
'  }',
'  ',
'  .stNavSort01 .stIconProduct03{',
'    color : #64a608 !important;',
'  }',
'  ',
'  .stNavSort01 .stIconProduct04{',
'    color : #64a608 !important;',
'  }',
'  ',
'  .priceRangeInput{',
'    width : 30%;',
'    height : 1em;',
'    margin : 2px 4px 2px 4px;',
'  }',
'  ',
'  .totalPriceInput{',
'    width : 46%;',
'    height : 1em;',
'    margin : 2px 4px 2px 4px;',
'  }',
'  ',
'  .filterTitle{',
'    width : 30%;',
'    display  : inline-block;',
'    padding-left  : 4px;',
'  }',
'  ',
'  .itemDisplaySwitch{',
'    display : block;',
'  }',
'  ',
'  .stFilterPoint{',
'    padding-left : 4px;',
'  }',
'  ',
'  .stFilterPoint strong{',
'    color:#cc0000;',
'    font-weight : bold;',
'  }',
'  ',
'  .filterProgress{',
'    border : 1px solid gray;',
'    height : 15px;',
'    color : #fff ! important;',
'    background-color:#0086cd;',
'    text-align:center;',
'  }',
'  '].join("\n")
  addGlobalStyle((STYLE).toString());
  // 最小フォントサイズに応じて縮小レイアウトのサイズを調整
  if(MIN_FONTSIZE > 10){
    var width  = MIN_FONTSIZE*9;
    var height = 100 + MIN_FONTSIZE*17;
    addGlobalStyle('.stItemCompact{ width:' + width + 'px ! important; height:'+ height + 'px ! important;}');
    var width  = Math.round(85/10*MIN_FONTSIZE);
    var height = Math.round(64/10*MIN_FONTSIZE);
    addGlobalStyle('.stHeadingCompact{ width:' + width + 'px ! important; height:'+ height + 'px ! important;}');
  }
  /* ------------------------------------------------------------------------------------------ */
  // ページ別処理
  // 欲しい本
  if(page_type == 'wishlist'){
    reload_wishlist();
  }
  // 検索
  else if(page_type == 'search_book'){
    set_compact_view();
    set_checkbox_control();
    format_items();
  }
  // ランキング
  else if(page_type == 'ranking'){
    set_checkbox_control();
    format_items();
  }
  // 新入荷
  else if(page_type == 'release'){
    set_addwishlist_all();
    format_items();
  }
  // 個別商品
  else if(page_type == 'item_book' || page_type == 'item_ebook'){
    var prdid = location.href.match(/\/(?:netstore\/pd-(?:book|magazine)|ebook\/pd)_([0-9]+)\.html/);
    if(prdid != null){
      create_amazon_link();
    }
    else{
      debug_message('item page url error:' + location.href);
    }
  }
  // カート
  else if(page_type == 'cart_book' || page_type == 'cart_ebook'){
    add_searchbox();
    check_auther_off();
    set_image();
    cart_item_pagize();
  }
  // マイページ
  else if(page_type == 'mypage'){
    format_mypage();
  }
  // あしあと
  else if(page_type == 'footmark'){
    if(AUTO_CLICK_FOOTMARK == true){
      var buttons = get_x('//a[img/@alt="あしあとをつける"]');
      for(var i in buttons) buttons[i].click();
    }
  }
  /* ------------------------------------------------------------------------------------------ */
  // 共通処理
  
  // 画面右上に常にマイページ/欲しい本へのリンクを挿入
  set_navi();
  
  // 欲しい本へのリンクにデフォルト件数を追加
  mod_wishlist_link();
  
  // 買い物カゴに入れるのと同時に、欲しい本から削除する
  mod_cart_link();
  
  // カゴに商品が入っている場合、価格を表示
  check_cart();
  
  // 検索ボックスのジャンルの初期値を指定
  set_search_category();
  
  // オートコンプリートを有効にする
  enable_autocomplete();
  /* ------------------------------------------------------------------------------------------ */
  // Functions
  
  // 縮小表示の設定
  function set_compact_view(){
    var anc = get_x('//div[@class="stTabContents01 stWide"]/div[contains(@id,"anc")]');
    var searchbox = get_x('//div[@class="stSearchBox01"]/table/tbody/tr/td[@class="stRight"]');
    if(anc.length == 1 && searchbox.length == 1){
      var anc_n = document.createElement('div');
      anc_n.id = 'anc_normal';
      while(anc[0].hasChildNodes()){
        anc_n.appendChild(anc[0].firstChild);
      }
      anc[0].appendChild(anc_n);
      
      var anc_c = document.createElement('div');
      anc_c.id = 'anc_compact';
      anc_n.parentNode.insertBefore(anc_c, anc_n.nextSibling);
      var a = document.createElement('a');
      a.setAttribute('style', 'margin-right:10px');
      a.href = 'javascript:void(0)';
      a.addEventListener('click', function(){
        check_all(false);
        var check = get_x('//p[@class="stChooseAll"]');
        if(anc_n.style.display == 'block'){
          a.innerHTML = '&raquo; 通常表示へ';
          anc_n.style.display = 'none';
          anc_c.style.display = 'block';
          for(var i in check) check[i].style.display = 'none';
        }
        else{
          a.innerHTML = '&raquo; 縮小表示へ';
          anc_n.style.display = 'block';
          anc_c.style.display = 'none';
          for(var i in check) check[i].style.display = 'block';
        }
      },false);
      var check = get_x('//p[@class="stChooseAll"]');
      if((page_type == 'search_book' && USE_CONPACT_VIEW_SEARCH) || (page_type == 'wishlist' && USE_CONPACT_VIEW_WISHLIST)){
        a.innerHTML = '&raquo; 通常表示へ';
        anc_n.style.display = 'none';
        anc_c.style.display = 'block';
        for(var i in check) check[i].style.display = 'none';
      }else{
        a.innerHTML = '&raquo; 縮小表示へ';
        anc_n.style.display = 'block';
        anc_c.style.display = 'none';
        for(var i in check) check[i].style.display = 'block';
      }
      searchbox[0].insertBefore(a, searchbox[0].firstChild);
    }
    else{
      debug_message('set_compact_view : error');
    }
  }
  
  // 一括選択チェックボックス関連の処理
  function set_checkbox_control(){
    var pb_block = document.getElementsByClassName('stTabContainer01')[0];
    if(ADD_CHECKBOX == false || !pb_block) return;
    var box_cart_common = '<li class="stChoice">\n<a id="check_all"><img height="22" width="78" alt="全て選択" src="/library/img/pc/btn_choice_01_o.png"></a>\n<a id="uncheck_all" class="stLink">解除</a></li>\n<li class="stMove">\n<img height="10" width="111" alt="選択した項目を、まとめて" src="/library/img/pc/img_boxcart02_01.png">\n<a href="javascript:void(0)" id="add_cart_all"><img height="26" width="150" alt="買い物カゴに入れる" src="http://honto.jp/library/img/pc/btn_cart_01_o.png"></a>';
    
    var box_cart_bottom = document.createElement('div');
    box_cart_bottom.setAttribute('class','stBoxCart02');
    
    if(page_type == 'wishlist'){
      box_cart_bottom.innerHTML='<div class="stBlock01" style="width:100%">\n<ul>\n' + box_cart_common + '<a class="stLink dyPreventDoubleSubmit" href="javascript:void(0)" id="add_wishlist_all">欲しい本の先頭に移動する</a><a class="stLink dyPreventDoubleSubmit" href="javascript:void(0)" id="del_wishlist_all">欲しい本から削除する</a></li>\n</ul>\n</div>\n';
    }else{
      box_cart_bottom.innerHTML='<div class="stBlock01">\n<ul>\n' + box_cart_common + '<a href="javascript:void(0)" id="add_wishlist_all"><img height="27" width="140" alt="欲しい本に移動する" src="/library/img/pc/btn_move_01_o.png"></a></li>\n</ul>\n</div>\n';
    }
    
    pb_block.appendChild(box_cart_bottom);
    
    // 選択した項目を全て買物かごに入れる
    document.getElementById('add_cart_all').addEventListener('click', function(){
      // 紙書籍のカート
      var ns_cart_url = join_cart_url(get_selected_url('http://honto.jp/reg/cart-ns.html?prdid='));
      // 電子書籍のカート
      var eb_cart_url = join_cart_url(get_selected_url('http://honto.jp/reg/cart-eb.html?prdid='));
      // 欲しい本から削除
      if(PUT_CART_DEL_WISHLIST == true){
        var url_list = get_selected_url('https://honto.jp/my/wishlist?delWant=1&prdid=');
        if(ns_cart_url){
          if(eb_cart_url) url_list.push(eb_cart_url);
          get_request(url_list, ns_cart_url);
        }
        else if(eb_cart_url){
          get_request(url_list, eb_cart_url);
        }
      }
      else if(ns_cart_url && eb_cart_url){
        get_request([eb_cart_url], ns_cart_url);
      }
      else if(ns_cart_url){
        document.location = ns_cart_url;
      }
      else if(eb_cart_url){
        document.location = eb_cart_url;
      }
    }, false);
    
    // 選択した項目を全て欲しい本に移動する
    document.getElementById('add_wishlist_all').addEventListener('click', addwishlist_all, false);
    
    // 選択した項目を全て欲しい本から削除する
    if(page_type == 'wishlist'){
      document.getElementById('del_wishlist_all').addEventListener('click', function(){
        var url_list = get_selected_url('https://honto.jp/my/wishlist?delWant=1&prdid=');
        if(url_list.length > 0){
          var wishlist_url = 'https://honto.jp/my/wishlist.html';
          if(CHANGE_WISHLIST_DISPNUM == true) wishlist_url += '?dspno=' + DEFAULT_DISPNUM;
          get_request(url_list, wishlist_url);
        }
      }, false);
    }
    
    // 全て選択
    document.getElementById('check_all').addEventListener('click', function(){
      check_all(true);
    }, false);
    // 全て選択解除
    document.getElementById('uncheck_all').addEventListener('click', function(){
      check_all(false);
    }, false);
  }
  
  function addwishlist_all(){
    var url_list = get_selected_url('https://honto.jp/my/wishlist.html?prdid=');
    if(url_list.length > 0){
      var wishlist_url = 'https://honto.jp/my/wishlist.html';
      if(USE_FILTER == true){
        wishlist_url +=  '?dspno=' + READ_MAX;
      }
      else if(CHANGE_WISHLIST_DISPNUM == true){
        wishlist_url += '?dspno=' + DEFAULT_DISPNUM;
      }
      get_request(url_list, wishlist_url);
    }
  }
  function set_addwishlist_all(){
    var target = get_x('//div[@class="stSection01"]/p[@class="stChoiceAll"]');
    for(var i in target){
      var a = document.createElement('a');
      a.innerHTML = '<img height="27" width="140" alt="欲しい本に追加する" src="/library/img/pc/btn_list_01_o.png">';
      a.setAttribute('style', 'margin-left:10px');
      a.addEventListener('click', addwishlist_all, false);
      target[i].appendChild(a);
    }
  }
  
  // 欲しい本/検索結果一覧の整形
  function format_items(){
    var items = get_x('//div[@class="stProduct02"]');
    var anc = document.getElementById('anc_compact');
    for(var i = 0; i < items.length; i++){
      // 商品IDの取得
      if(items[i].innerHTML.match(/\/cart-(ns|eb).html\?prdid=([0-9]+)/) != null){
        var store = RegExp.$1;
        var prdid = RegExp.$2;
      }
      else if(items[i].innerHTML.match(/\/(?:netstore\/pd-(?:book|magazine)|ebook\/pd)_([0-9]+)\.html/) != null){
        var prdid = RegExp.$1;
        var store = null;
      }
      else{
        debug_message('prdid error:' + items[i].innerHTML);
        continue;
      }
      var item_type = null;
      if(items[i].innerHTML.match(/<span class="stIcon[^\"]+">(?:本|雑誌|電子書籍)<\/span>/) != null){
        item_type = 'book';
      }
      if(page_type == 'wishlist'){
        if(items[i].parentNode.className == 'stBoxLine01'){
          items[i].parentNode.setAttribute('prdid', prdid);
        }else{
          debug_message('items[' + i + '] parent node error :' + items[i].parentNode.className);
        }
      }
      
      // 欲しい本に追加する
      if(ADD_WISHLIST_LINK && item_type == 'book'){
        var link = create_addwishlist_link(prdid);
        var target = items[i].getElementsByClassName('stAction');
        if(target.length > 0) target[0].appendChild(link);
      }
      // 一括選択チェックボックス
      if(ADD_CHECKBOX && page_type != 'release'){
        var select_checkbox = document.createElement('div');
        select_checkbox.setAttribute('class','stCheck');
        select_checkbox.align = 'center';
        if(store){
          select_checkbox.innerHTML = '<input type="checkbox" name="prdList" store="' + store +'" value="' + prdid + '"/>';
        }
        else{
          select_checkbox.innerHTML = '<input type="checkbox" disabled/>';
        }
        var target = items[i].getElementsByClassName('stCover');
        if(target.length > 0) target[0].insertBefore(select_checkbox,target[0].firstChild);
      }
      
      // 縮小表示用データの作成
      if(anc){
        var cover = items[i].getElementsByClassName('stCover');
        var head  = items[i].getElementsByClassName('stContents')[0].getElementsByClassName('stHeading');
        var data  = items[i].getElementsByClassName('stData');
        if(cover.length == 1 && head.length == 1 && data.length == 1){
          var item_compact = document.createElement('div');
          item_compact.setAttribute('class', 'stItemCompact');
          item_compact.setAttribute('prdid', prdid);
          item_compact.setAttribute('cart', 0);
          item_compact.id = 'itemCompact[' + i + ']';
          // 書影
          var cover_compact = document.createElement('p');
          cover_compact.setAttribute('class', 'stCoverCompact');
          cover_compact.setAttribute('title', head[0].firstChild.innerHTML);
          cover_compact.innerHTML = cover[0].innerHTML;
          var div = document.createElement('div');
          div.appendChild(cover_compact.lastChild);
          cover_compact.appendChild(div);
          div.setAttribute('align', 'center');
          // タイトル
          var head_compact = document.createElement('div');
          head_compact.setAttribute('class', 'stHeadingCompact');
          head_compact.setAttribute('title', head[0].firstChild.innerHTML);
          head_compact.innerHTML = head[0].innerHTML;
          // 価格
          var data_compact = document.createElement('ul');
          data_compact.setAttribute('class', 'stDataCompact');
          var li = document.createElement('li');
          li.id = 'itemPrice[' + i + ']';
          if(data[0].innerHTML.match(/<li(?: [^<>]+)?>税込(価格：<span class="stYen">(.+?)<\/span>)/) != null){
            li.innerHTML = RegExp.$1;
            li.value = RegExp.$2.replace(/[^0-9]/g, '');
          }
          else{
            debug_message('price error :' + data[0].innerHTML);
            li.innerHTML += '<span class="stErrorCompact">価格:ERROR</span>';
            li.value = 0;
          }
          data_compact.appendChild(li);
          // 発送可能日
          var li = document.createElement('li');
          li.id = 'shipDate[' + i + ']';
          if(data[0].innerHTML.match(/<li(?: [^<>]+)?>(?:発送可能日|近日発売)：(<span class="stIconProduct[0-9]+">(.+?)<\/span>)/) != null){
            li.innerHTML = RegExp.$1;
            if(DATE2NUM[RegExp.$2] != null){
              li.value = DATE2NUM[RegExp.$2];
            }
            else{
              debug_message('unknown ship date :' + RegExp.$2);
              li.value = 9;
            }
          }
          else if(items[i].innerHTML.match(/(<span class="stIcon[^\"]+">電子書籍<\/span>)/) != null){
            li.innerHTML = RegExp.$1;
            li.value = DATE2NUM['24時間'];
          }
          else{
            li.innerHTML += '<span class="stErrorCompact">発送日:ERROR</span>';
            li.value = 9;
          }
          data_compact.appendChild(li);
          // 買い物かごに入れる
          if(store){
            var li = document.createElement('li');
            li.appendChild(create_cart_link(prdid, store, true));
            data_compact.appendChild(li);
          }
          // 欲しい本に追加
          if(item_type == 'book'){
            var li = document.createElement('li');
            li.appendChild(create_addwishlist_link(prdid, true));
            data_compact.appendChild(li);
          }
          // 欲しい本から削除
          if(page_type == 'wishlist'){
            var li = document.createElement('li');
            li.appendChild(create_delwishlist_link(prdid));
            data_compact.appendChild(li);
          }
          
          item_compact.appendChild(cover_compact);
          item_compact.appendChild(head_compact);
          item_compact.appendChild(data_compact);
          
          anc.appendChild(item_compact);
        }else{
          debug_message('item format error : ' + items[i].innerHTML);
        }
      }
    }
  }
  
  // 商品選択チェックボックスを全て選択/解除
  function check_all(check){
    var inputs = [];
    var anc_n = document.getElementById('anc_normal');
    var anc_c = document.getElementById('anc_compact');
    if(!anc_n || !anc_c){
      inputs = document.getElementsByName('prdList');
    }
    else if(anc_n.style.display == 'block' && anc_c.style.display == 'none'){
      inputs = get_x('//div[@id="anc_normal"]//input[@name="prdList"]');
    }
    else if(anc_n.style.display == 'none' && anc_c.style.display == 'block'){
      inputs = get_x('//div[@id="anc_compact"]//input[@name="prdList"]');
    }
    for (var i = 0; i < inputs.length; i++) {
      if(check){
        inputs[i].checked = true;
      }
      else{
        inputs[i].checked = false;
      }
    }
  }
  
  // urlリストの内容をget(GM_xmlhttpRequest版)
  function get_request(url_list, next_location){
    var index = 0;
    
    if(next_location) document.title = '接続中 ... ';
    send();
    // 開始
    function send(){
      GM_xmlhttpRequest({ method: 'GET', url: url_list[index], onload: complete, });
    }
    // 完了
    function complete(){
      debug_message('complete : ' + url_list[index]);
      ++index;
      if(next_location){
        document.title = '接続中 ... ' + Math.round((index/url_list.length)*100) + '%';
      }
      // 残りがあれば繰り返し
      if (index < url_list.length) {
        return send();
      }
      // 残りがなければ終了し、ここから続行処理
      if(next_location){
        document.location = next_location;
      }
    }
  }
  
  // チェックボックスがONになっている商品のIDにurl_prefixを付与したリストを返す
  // prefixにstoreがある場合は、storeが一致するもののみ返す
  function get_selected_url(url_prefix){
    var store = url_prefix.match(/^http:\/\/honto\.jp\/reg\/cart-(eb|ns)\.html/);
    var inputs = document.getElementsByName('prdList');
    var url_list = [];
    for (var i = 0; i < inputs.length; i++) {
      if(inputs[i].checked){
        if(store != null){
          if(store[1] == inputs[i].getAttribute('store')){
            url_list.push(url_prefix + inputs[i].value);
          }
        }else{
          url_list.push(url_prefix + inputs[i].value);
        }
      }
    }
    return url_list;
  }
  
  // カートにまとめて入れるurlを生成
  function join_cart_url(url_list){
    for(var i = 0; i < url_list.length; i++){
      if(url_list[i].match(/^(http:\/\/honto\.jp\/reg\/cart-(?:eb|ns))\.html\?prdid=([0-9]+)$/) != null){
        if(i == 0){
          var url = RegExp.$1 + '?prdid[0]=' + RegExp.$2;
        }
        else{
          url += '&prdid[' + i + ']=' + RegExp.$2
        }
      }
      else{
        debug_message('join cart url error:' + url_list[i]);
        return null;
      }
    }
    return url;
  }
  
  // 欲しい本に追加するリンクを生成
  function create_addwishlist_link(prdid, small){
    // 縮小レイアウト用のリンク
    if(small){
      var link = document.createElement('a');
      link.href = 'javascript:void(0)';
      link.setAttribute('prdid',prdid);
      link.setAttribute('class', 'hontoSmallWishListLink');
      if(page_type == 'wishlist'){
        link.innerHTML = '&raquo; 先頭に移動する';
      }else{
        link.innerHTML = '&raquo; 欲しい本に追加';
      }
      link.addEventListener('click', function(){
        if(page_type == 'wishlist'){
          link.innerHTML = '移動中…';
        }else{
          link.innerHTML = '登録中…';
        }
        GM_xmlhttpRequest({
        method: 'GET',
          url: 'https://honto.jp/my/wishlist.html?prdid='+prdid,
          onload: complete,
        });
        function complete(res){
          var res_html = document.createElement('div');
          res_html.innerHTML = res.responseText;
          // 正常に追加されたか検証:リストの1件目に追加した商品があることを確認
          var first_item = get_x('//a[@id="dy_020_prdNm[0]"]', res_html);
          if(first_item[0] && first_item[0].href.match(/^http:\/\/honto\.jp\/(netstore\/pd-(?:book|magazine)|ebook\/pd)_([0-9]+)\.html/)[2] == prdid){
            if(page_type == 'wishlist'){
              link.innerHTML = '&raquo; 先頭に移動する';
              var page = location.href.match(/[?&]pgno=([0-9]+)/);
              var item_c = get_x('//div[@class="stItemCompact" and @prdid="' + prdid + '"]')[0];
              var item_n = get_x('//div[@class="stBoxLine01" and @prdid="' + prdid + '"]')[0];
              if(USE_FILTER == true){
                item_c.parentNode.insertBefore(item_c, item_c.parentNode.firstChild);
                item_n.parentNode.insertBefore(item_n, item_n.parentNode.firstChild);
                refresh_id();
                set_filter(PGNO);
              }
              else if(page != null && page[1] > 1){
                item_c.parentNode.removeChild(item_c);
                item_n.parentNode.removeChild(item_n);
              }else{
                item_c.parentNode.insertBefore(item_c, item_c.parentNode.firstChild);
                item_n.parentNode.insertBefore(item_n, item_n.parentNode.firstChild);
                refresh_id();
              }
            }else{
              link.parentNode.replaceChild(create_delwishlist_link(prdid), link);
            }
          }else{
            link_error(link,'Error:欲しい本に登録されているか確認して下さい');
            link.href = 'https://honto.jp/my/wishlist.html';
            if(CHANGE_WISHLIST_DISPNUM == true) link.href += '?dspno=' + DEFAULT_DISPNUM;
          }
        }
      },false);
    }
    // 通常のボタン
    else{
      var link = document.createElement('p');
      if(page_type == 'wishlist'){
        link.setAttribute('class', 'stLink01');
        link.innerHTML = '<a href="https://honto.jp/my/wishlist.html?prdid=' + prdid + '">欲しい本の先頭に移動する</a>';
      }else{
        link.innerHTML = '<a href="https://honto.jp/my/wishlist.html?prdid=' + prdid + '"><input type="hidden" value="' + prdid + '" name="prdid"><input id="dy_240_addWntBkBtnDisp" type="image" alt="欲しい本に追加する" src="http://honto.jp/library/img/pc/btn_list_01_o.png" name="addWntBkBtnDisp"></a>';
      }
    }
    return link;
  }
  
  // 欲しい本から削除するリンクを生成
  function create_delwishlist_link(prdid){
    var link = document.createElement('a');
    link.href = 'javascript:void(0)';
    link.setAttribute('prdid',prdid);
    link.setAttribute('class', 'hontoSmallDelLink');
    link.innerHTML = '&laquo; 欲しい本から削除';
    link.addEventListener('click', function(){
      var prdid = link.getAttribute('prdid');
      link.innerHTML = '削除中…';
      GM_xmlhttpRequest({ method: 'GET', url: 'https://honto.jp/my/wishlist.html?delWant=1&prdid='+prdid, onload: complete, });
      function complete(){
        if(page_type == 'wishlist'){
          // アイテムの削除
          var item_c = get_x('//div[@class="stItemCompact" and @prdid="' + prdid + '"]')[0];
          var item_n = get_x('//div[@class="stBoxLine01" and @prdid="' + prdid + '"]')[0];
          item_c.parentNode.removeChild(item_c);
          item_n.parentNode.removeChild(item_n);
          // アイテムIDの更新
          refresh_id();
          if(USE_FILTER == true){
            reflesh_count();
            set_filter(PGNO);
          }
        }
        else{
          link.parentNode.replaceChild(create_addwishlist_link(prdid, true), link);
        }
      }
    },false);
    return link;
  }
  
  // アイテムIDの更新
  function refresh_id(){
    var items  = get_x('//div[@class="stItemCompact"]');
    var prices = get_x('//li[contains(@id, "itemPrice")]');
    var dates  = get_x('//li[contains(@id, "shipDate")]');
    if(items.length == prices.length && items.length == dates.length){
      for(var i in items){
        items[i].id  = 'itemCompact[' + i + ']';
        prices[i].id = 'itemPrice[' + i + ']';
        dates[i].id  = 'shipDate[' + i + ']';
      }
    }
    else{
      debug_message('item count error :' + items.length + ', ' + prices.length + ', ' + dates.length);
    }
    ITEM_COUNT = items.length;
  }
  
  // 買い物カゴに入れるリンクを生成
  function create_cart_link(prdid, store, nomove){
    var link = document.createElement('a');
    link.setAttribute('class', 'hontoSmallCartLink');
    link.setAttribute('prdid', prdid);
    link.setAttribute('store', store);
    link.innerHTML = '&raquo; カゴに入れる';
    var link_url = 'http://honto.jp/reg/cart-' + store + '.html?prdid='+prdid;
    
    // 追加後にページ移動しない
    if(nomove){
      link.href = 'javascript:void(0)';
      link.addEventListener('click', function(){
        link.removeEventListener('click', arguments.callee, false);
        link.innerHTML = '&raquo; 処理中…';
        if(PUT_CART_DEL_WISHLIST == true){
          GM_xmlhttpRequest({ method: 'GET', url: 'https://honto.jp/my/wishlist?delWant=1&prdid=' + prdid, onload: put_cart, });
        }else{
          put_cart();
        }
        function put_cart(){
          GM_xmlhttpRequest({ method: 'GET', url: link_url, onload: complete, });
        }
        function complete (res){
          var res_html = document.createElement('div');
          res_html.innerHTML = res.responseText;
          // 正常にカートに入ったか検証 + 合計金額の取得
          var first_item = get_x('//a[@id="dy_prdNm[0]"]', res_html);
          if(first_item[0] && first_item[0].href.match(/^http:\/\/honto\.jp\/(netstore\/pd-(?:book|magazine)|ebook\/pd)_([0-9]+)\.html/)[2] == prdid){
            // アイテムの属性変更
            var item_c = get_x('//div[@class="stItemCompact" and @prdid="' + prdid + '"]')[0];
            var item_n = get_x('//div[@class="stBoxLine01" and @prdid="' + prdid + '"]')[0];
            item_c.setAttribute('cart', 1);
            item_c.style.background = '#ffe4c4';
            // 買い物カゴから削除リンクに差し替える
            link.parentNode.replaceChild(create_delcart_link(prdid, store), link);
            // 欲しい本の場合：リストの先頭に移動
            if(PUT_CART_DEL_WISHLIST && page_type == 'wishlist'){
              item_c.parentNode.insertBefore(item_c, item_c.parentNode.firstChild);
              item_n.parentNode.insertBefore(item_n, item_n.parentNode.firstChild);
              refresh_id();
            }
            // 価格表示を更新
            set_price(res_html, store);
          }
          else{
            link_error(link,'Error:買い物カゴに入っているか確認して下さい');
            link.href = 'http://honto.jp/reg/cart-' + store + '.html';
          }
        }
      },false);
    }
    else{
      link.href = link_url;
    }
    return link;
  }
  
  // 買い物カゴから削除するリンクを作成
  function create_delcart_link(prdid, store){
    var link = document.createElement('a');
    link.setAttribute('class', 'hontoSmallDelLink');
    link.setAttribute('prdid', prdid);
    link.setAttribute('store', store);
    link.innerHTML = '&laquo; カゴから削除';
    var cart_url = 'http://honto.jp/reg/cart-' + store + '.html';
    
    link.href = 'javascript:void(0)';
    link.addEventListener('click', function(){
      link.removeEventListener('click', arguments.callee, false);
      link.innerHTML = '処理中…';
      if(PUT_CART_DEL_WISHLIST && page_type == 'wishlist'){
        GM_xmlhttpRequest({ method: 'GET', url: 'https://honto.jp/my/wishlist?&prdid=' + prdid, onload: del_cart, });
      }else{
        del_cart();
      }
      function del_cart(){
        GM_xmlhttpRequest({ method: 'GET', url: cart_url, onload: complete, });
      }
      function complete(res){
        var res_html = document.createElement('div');
        res_html.innerHTML = res.responseText;
        var token = get_x('//input[@id="dy_ordTokenKey"]', res_html);
        if(token.length == 1){
          var del_url;
          if(store == 'eb'){
            del_url = cart_url + '?pmd=delLmp&ordTokenKey=' + token[0].value + '&checkPrd%5B%5D=' + prdid;
          }else{
            del_url = cart_url + '?pmd=del&ordTokenKey=' + token[0].value + '&selectedPrdId=' + prdid;
          }
          debug_message('del url:' + del_url);
          GM_xmlhttpRequest({ method: 'GET', url: del_url, onload: complete2, });
        }else{
          debug_message('token error:' + res_html.innerHTML);
        }
      }
      function complete2(res){
        var res_html = document.createElement('div');
        res_html.innerHTML = res.responseText;
        // アイテムの属性変更
        var item_c = get_x('//div[@class="stItemCompact" and @prdid="' + prdid + '"]')[0];
        item_c.setAttribute('cart', 0);
        item_c.removeAttribute('style');
        // 買い物カゴに入れるリンクに差し替える
        link.parentNode.replaceChild(create_cart_link(prdid, store, true), link);
        // 価格表示を更新
        set_price(res_html, store);
      }
    },false);
    
    return link;
  }
  
  // Amazonへのリンク追加
  function create_amazon_link(){
    if(ADD_AMAZON_LINK == false) return;
    var item_data = document.getElementsByClassName('stItemData');
    var target = get_x('//div[@class="stProduct01 hreview-aggregate"]/div[@class="stContents"]/ul[@class="stData"]');
    if(item_data.length == 1 && target.length == 1){
      var isbn = item_data[0].innerHTML.match(/<li>ISBN：([0-9-]+)<\/li>/);
      if(isbn != null){
        var a = document.createElement('a');
        a.innerHTML = '&raquo; Amazonで検索';
        target[0].parentNode.insertBefore(a, target[0].nextSibling);
        
        var isbn_url = 'http://www.amazon.co.jp/s?field-isbn=' + new String(isbn[1]).replace(/-/g, "");
        GM_xmlhttpRequest({
        method:'GET',
        url:isbn_url,
        onload:function(res) {
          var res_html = document.createElement('div');
          res_html.innerHTML = res.responseText;
          // 該当が1件の場合は直接商品ページにリンク
          var item_link = get_x('//div[starts-with(@id, "result_")]//h3[@class="newaps"]/a', res_html);
          debug_message(item_link.length);
          if(item_link.length == 1 && res_html.innerHTML.indexOf('<span>1件の検索結果を表示</span>') != -1 && item_link[0].href.match(/\/dp\/([0-9A-Z]{10})\//) != null){
            a.href = 'http://www.amazon.co.jp/dp/' + RegExp.$1;
          }
          else{
            a.style.color = 'red';
            a.href = isbn_url;
          }
        }
        });
      }
    }
  }
  
  // 買い物カゴのページに検索窓を表示する
  function add_searchbox(){
    if(ADD_SEARCHBOX_AT_CART == false) return;
    var searchbox = document.createElement('div');
    searchbox.id = 'stUtility';
    searchbox.innerHTML = '<div id="stSearchArea">\n<form onsubmit="searchBox(\'dy_01_\', \'https://honto.jp/netstore/search.html\'); return false;" method="get" id="dy_01_stSearchForm" action="https://honto.jp/netstore/search.html">\n<table cellspacing="0">\n<tbody>\n<tr>\n<td class="stGenre"><select name="gnrcd" id="dy_01_stGenre">\n<option value="">すべての商品から</option><option value="1">本</option>\n<option value="2">電子書籍</option>\n<option value="3">Music</option>\n<option value="4">DVD</option>\n<option value="5">雑誌</option>\n<option value="6">その他</option>\n</select><input type="hidden" name="srchGnrNm" id="dy_01_stSearchGenre"><input type="hidden" value="1" name="srchf"></td>\n<td class="stQuery"><input type="text" searchtextboxparam="sto_cls=1" pageblockid="349357" maxlength="126" id="stSearchTextBox" value="" name="k" autocomplete="off"></td>\n<td class="stSubmit"><input type="image" onclick="" alt="検索" src="/library/img/pc/btn_search_04_o.png"></td>\n</tr>\n</tbody>\n</table>\n</form>\n<!-- /#stSearchArea --></div><!-- /#stUtility -->';
    var header = document.getElementById('stHeader');
    if(header){
      header.removeAttribute('class');
      header.parentNode.insertBefore(searchbox, header.nextSibling);
    }
  }
  
  // 新刊お知らせメールのチェックボックスOff
  function check_auther_off(){
    if(CHECK_AUTHER_OFF == false) return;
    var check_authers = get_x('//input[@name="checkAthrNwInfo[]" or @name="athrList[]"]');
    for(var i = 0; i < check_authers.length; i++){
      check_authers[i].checked = false;
    }
  }
  
  // 欲しい本の初期化
  function reload_wishlist(){
    format_last_box();
    
    // ページ番号、表示件数の初期化
    if(CHANGE_WISHLIST_DISPNUM == true){
      DSPNO = DEFAULT_DISPNUM;
    }else{
      DSPNO = 10;
    }
    PGNO = 1;
    var new_args = [];
    var del_args = [];
    // パラメーターの抽出：ページ番号、表示件数、削除、追加以外は残す
    if(location.href.match(/\/my\/wishlist(?:\.html)?\?(.+)$/) != null){
      var args = RegExp.$1.split('&');
      for(var i in args){
        if(args[i].match(/^(delWant|prdid|dspno|pgno)=(.+)$/) != null){
          del_args[RegExp.$1] = RegExp.$2;
        }else{
          new_args.push(args[i]);
        }
      }
    }
    // すでに全件表示している
    var paging = get_x('//div[@class="stTabNav01 stTabBottom"]/div/table/tbody/tr/td[1]');
    if(paging.length == 1 && paging[0].innerHTML.match(/^<em>([\d]+)<\/em> 件中 <em>1<\/em> 件～ <em>\1<\/em>/) != null){
      format_wishlist();
    }
    // フィルタ使用時：システム上限値で全アイテム取得
    else if(USE_FILTER == true){
      debug_message('reload full wishlist');
      new_args.push('dspno=' + READ_MAX);
      GM_xmlhttpRequest({ method: 'GET', url: 'https://honto.jp/my/wishlist?' + new_args.join('&'), onload: complete, });
    }
    // 不足している：設定値で取得
    else if((document.referrer.match(/\/my\/wishlist/) == null || location.href.match(/prdid=[0-9]+/) != null) && !del_args['dspno'] && (!del_args['pgno'] || del_args['pgno'] == 1)){
      debug_message('reload wishlist');
      GM_xmlhttpRequest({ method: 'GET', url: 'https://honto.jp/my/wishlist?dspno=' + DEFAULT_DISPNUM, onload: complete, });
    }
    else{
      format_wishlist();
    }
    function complete(res){
      var res_html = document.createElement('div');
      res_html.innerHTML = res.responseText;
      format_last_box(res_html);
      var next_link = get_x('//li[@class="stNext"]/a',res_html);
      // エラーメッセージがあったら残す
      var err = document.getElementById('dy_errMsg');
      var tab = get_x('//div[@class="stTabNav01 stTabTop"]/ul[@class="stTabs"]', res_html);
      if(err && tab.length == 1) tab[0].parentNode.insertBefore(err, tab[0].nextSibling);
      // 設定通りに読み込み直したリストに差し替える
      var list_old = get_x('//div[@id="mainArea"]');
      var list_new = get_x('//div[@id="mainArea"]', res_html);
      if(list_old.length == 1 && list_new.length == 1){
        list_old[0].parentNode.replaceChild(list_new[0], list_old[0]);
        
      }
      if(next_link.length > 0){
        GM_xmlhttpRequest({ method: 'GET', url: next_link[0].href, onload: wishlist_pagize, });
        debug_message("next link exists." + next_link[0].href);
      }else{
        format_wishlist();
      }
    }
    
    function wishlist_pagize(res){
      var res_html = document.createElement('div');
      res_html.innerHTML = res.responseText;
      format_last_box(res_html);
      
      var next_link = get_x('//li[@class="stNext"]/a',res_html);
      // エラーメッセージがあったら残す
      var err = document.getElementById('dy_errMsg');
      var tab = get_x('//div[@class="stTabNav01 stTabTop"]/ul[@class="stTabs"]', res_html);
      if(err && tab.length == 1) tab[0].parentNode.insertBefore(err, tab[0].nextSibling);
      // 設定通りに読み込み直したリストに差し替える
      var anc = get_x('//div[@id="anc01"]');
      var new_items = get_x('//div[@class="stBoxLine01"]', res_html);
      for(var i in new_items){
        anc[0].appendChild(new_items[i]);
      }
      if(next_link.length > 0){
        GM_xmlhttpRequest({ method: 'GET', url: next_link[0].href, onload: wishlist_pagize, });
        debug_message("next link exists." + next_link[0].href);
      }else{
        format_wishlist();
      }
    }
  }
  

  
  // 後のフィルタ処理のため、最後のアイテムもstBoxLine01の中に入れる
  function format_last_box(res_html){
    var items = get_x('//div[@id="anc01"]/div[@class="stProduct02"]', res_html);
    var reviews = get_x('//div[@id="anc01"]/form/div[contains(@class,"stProductReview01")]', res_html);
    if(items.length == 1 && reviews.length == 1){
      var div = document.createElement('div');
      div.setAttribute('class','stBoxLine01');
      items[0].parentNode.insertBefore(div, items[0]);
      div.appendChild(items[0]);
      div.appendChild(reviews[0].parentNode);
    }
  }
  
  // 欲しい本リストの表示調整
  function format_wishlist(){
    // 共通処理
    format_last_box();
    del_wishlist_error();
    set_compact_view();
    set_checkbox_control();
    format_items();
    
    // 表示件数選択プルダウンリスト
    var dspno;
    if(USE_FILTER == true){
      dspno = DSPNO;
    }
    else if(location.href.match(/dspno=([0-9]+)/) != null){
      dspno = RegExp.$1;
    }
    var num_select = document.getElementById('dy_020_dispNumSel');
    for (var i in WISHLIST_NUMLIST){
      var opt = document.createElement('option');
      opt.value = 'https://honto.jp/my/wishlist?dspno=' + WISHLIST_NUMLIST[i];
      opt.innerHTML = WISHLIST_NUMLIST[i] + '件';
      num_select.appendChild(opt);
    }
    var num_selects = get_x('//select[@id="dy_020_dispNumSel"]/option');
    for (var i in num_selects){
      if(num_selects[i].value.indexOf('?dspno=' + dspno) != -1) num_selects[i].selected = true;
    }
    
    if(USE_FILTER == true){
      ITEM_COUNT = get_x('//div[@class="stItemCompact"]').length;
      create_filter();
      reflesh_count();
      set_filter();
    }
  }
  
  function get_point(){
    GM_xmlhttpRequest({ method: 'GET', url: 'https://honto.jp/my.html', onload: complete, });
    function complete(res){
      var res_html = document.createElement('div');
      res_html.innerHTML = res.responseText;
      var point = get_x('//span[@id="dy_010_balPtNum"]', res_html);
      if(point.length == 1 && point[0].innerHTML.match(/<strong>((?:(?!<\/strong>).)+)<\/strong>/) != null){
        document.getElementById('filterPoint').innerHTML = RegExp.$1;
        POINT = parseInt(RegExp.$1.replace(/[^0-9]/g, ''));
        debug_message('point : ' + POINT);
      }
    }
  }
  
  // フィルタ作成
  function create_filter(){
    var target = get_x('//div[@class="stNavSort01"]/h2');
    if(target.length == 1){
      var filter_blocks = get_x('//div[@class="stNavSort01"]//ul[li/a]');
      for (var i in filter_blocks) filter_blocks[i].appendChild(createOtherCheck());
      
      //カテゴリフィルタ
      var dd = get_x('//div[@class="stNavSort01"]/dl/dd');
      var progress = document.createElement('span');
      progress.className = 'filterProgress';
      progress.id = 'filterProgress[0]';
      progress.style.display = 'none';
      progress.style.width = '0%';
      dd[0].insertBefore(progress, dd[0].firstChild);
      
      if(AUTO_LOAD_FILTER == true){
        load_category_filter();
      }else{
        var a = document.createElement('a');
        a.href = 'javascript:void(0)';
        a.innerHTML = '<strong>&raquo;フィルタ情報読込</strong>';
        a.style.color = '#cc0000';
        dd[0].insertBefore(a, dd[0].firstChild);
        a.addEventListener('click', function(){
          this.parentNode.removeChild(this);
          load_category_filter();
        },0);
      }
      
      // 発送可能日フィルタ
      var dl = document.createElement('dl');
      dl.id = 'dateFilterBlock';
      dl.innerHTML = '<dt>発送可能日</dt><dd><ul></ul></dd>';
      for(var i in NUM2DATE){
        var li = document.createElement('li');
        var a = document.createElement('a');
        
        var check = document.createElement('span');
        check.id = 'dateFilter[' + i + ']';
        check.value = 1;
        check.innerHTML = '&#x2611;';
        check.setAttribute('class', 'filterCheckBox');
        
        var date = document.createElement('span');
        date.setAttribute('class', DATE2CLASS[NUM2DATE[i]]);
        date.innerHTML = NUM2DATE[i];
        
        var count = document.createElement('span');
        count.id = 'filterCount[' + i + ']';
        count.setAttribute('class', 'filterCount');
        
        a.appendChild(check);
        a.appendChild(date);
        a.appendChild(count);
        
        li.appendChild(a);
        dl.childNodes[1].firstChild.appendChild(li);
        a.addEventListener('click', function(){
          toggle(this.firstChild);
          set_filter();
        },0);
      }
      target[0].parentNode.insertBefore(dl, target[0].nextSibling);
      
      // 現在の保有ポイントを取得
      get_point();
      
      // 価格/予算/タイトルフィルタ
      var dl = document.createElement('dl');
      dl.id = 'priceFilterBlock';
      dl.innerHTML = '<dt>価格/予算/タイトル</dt><dd><input class="priceRangeInput" type="text" id="minPriceInput"/>～<input class="priceRangeInput" type="text" id="maxPriceInput"/>円<br/><span class="filterTitle">予算：</span><input class="totalPriceInput" type="text" id="totalPriceInput"/>円<span class="stFilterPoint" id="usePointText"></span><ul><li><a href="javascript:void(0)" id="usePoint"><span id="usePointCheck" class="filterCheckBox">&#x2611;</span>不足額にポイント使用</a></li></ul><span class="stFilterPoint">保有ポイント：<strong id="filterPoint">---</strong>ポイント</span><br/><span class="filterTitle">タイトル：</span><input class="totalPriceInput" type="text" id="titleInput"/></dd>';
      target[0].parentNode.insertBefore(dl, target[0].nextSibling);
      if(ENTER_BEFORE_FILTER == true){
        document.getElementById('minPriceInput').addEventListener('keydown', check_filter_input2, 0);
        document.getElementById('maxPriceInput').addEventListener('keydown', check_filter_input2, 0);
        document.getElementById('totalPriceInput').addEventListener('keydown', check_filter_input2, 0);
        document.getElementById('titleInput').addEventListener('keydown', check_filter_input2, 0);
      }else{
        document.getElementById('minPriceInput').addEventListener('input', check_filter_input, 0);
        document.getElementById('maxPriceInput').addEventListener('input', check_filter_input, 0);
        document.getElementById('totalPriceInput').addEventListener('input', check_filter_input, 0);
        document.getElementById('titleInput').addEventListener('input', check_filter_input, 0);
      }
      document.getElementById('usePointCheck').value = 1;
      document.getElementById('usePoint').addEventListener('click', function(){
        toggle(document.getElementById('usePointCheck'));
        set_filter();
      }, 0);
    }
    
    // 表示件数切り替えの機能を更新
    var num_select = document.getElementById('dy_020_dispNumSel');
    var num_selects = get_x('//select[@id="dy_020_dispNumSel"]/option');
    for (var i in num_selects) num_selects[i].value = num_selects[i].value.replace(/^.+\?dspno=/, '');
    num_select.addEventListener('change', function(){
      DSPNO = num_select.options[num_select.selectedIndex].value;
      set_filter();
    }, 0);
    num_select.setAttribute('onchange', 'javascript:void(0)');
    
    // カテゴリフィルタの設定
    function load_category_filter(){
      var category_links = get_x('//div[@class="stNavSort01"]//a[contains(@href, "my/wishlist")]');
      var start_index = 1;
      document.getElementById('filterProgress[0]').style.display = 'block';
      for (var i=0; i < category_links.length; i++){
        // 全項目：無意味なので削除
        if(category_links[i].innerHTML == '全項目を表示'){
          start_index++;
          category_links[i].parentNode.parentNode.removeChild(category_links[i].parentNode);
        }
        else if(category_links[i].innerHTML == 'その他'){
          setCategoryFilterLink(category_links[i], i+1);
          var list = [];
          for (var j = start_index; j <= i; j++) list.push(j);
          load_filter(list);
          start_index = i+2;
        }
        else{
          setCategoryFilterLink(category_links[i], i+1);
          category_links[i].addEventListener('click', toggle_filter, 0);
        }
      }
    }
    // 「その他」カテゴリの作成
    function createOtherCheck(){
      var a = document.createElement('a');
      a.href = 'https://honto.jp/my/wishlist?dspno=' + READ_MAX;
      a.innerHTML = 'その他';
      var li = document.createElement('li');
      li.appendChild(a);
      li.style.display = 'none';
      return li;
    }
    // フィルタ用にリンクを調整
    function setCategoryFilterLink(link, i){
      var check = document.createElement('span');
      check.id = 'categoryFilterCheck[' + i + ']';
      check.value = 0;
      check.innerHTML = '&#x25A0;';
      check.setAttribute('class', 'filterCheckBox');
      check.setAttribute('load', '1');
      
      link.setAttribute('href_', link.href);
      link.name = link.innerHTML.replace(/<span>(?:(?!<\/span>).)+?<\/span>$/,'');
      link.value = i;
      link.id = 'categoryFilterLink[' + i + ']';
      link.href = 'javascript:void(0)';
      link.style.color = '#999';
      link.insertBefore(check, link.firstChild);
    }
    // フィルタのチェック切り替え
    function toggle_filter(){
      var i = this.value;
      var check = document.getElementById('categoryFilterCheck[' + i + ']');
      var load = check.getAttribute('load');
      
      if(load == '0'){
        check.setAttribute('load', '1');
        load_filter([i], true);
      }
      else if(load == '1'){
        
      }
      else if(load == '2'){
        toggle_sub(check, check.parentNode.parentNode.getElementsByClassName('filterCheckBox'));
        set_filter();
      }
    }
    // 初回のフィルタ情報読み込み
    function load_filter(list, toggle){
      var index = 0;
      load();
      function load(){
        var i = list[index];
        var a = document.getElementById('categoryFilterLink[' + i + ']');
        var orig_span = a.getElementsByTagName('span');
        if(orig_span.length == 2 && orig_span[1].innerHTML.match(/^&nbsp;（[0-9]+）$/) != null){
          orig_span[1].parentNode.removeChild(orig_span[1]);
        }
        var span = document.createElement('span');
        span.innerHTML = '&nbsp;(読込中…)';
        span.id = 'categoryFilterInfo[' + i + ']';
        a.appendChild(span);
        GM_xmlhttpRequest({ method: 'GET', url: a.getAttribute('href_'), onload: complete, });
      }
      function complete(res){
        var i = list[index];
        var a = document.getElementById('categoryFilterLink[' + i + ']');
        debug_message('load filter complete : [' + i + '] = ' + a.name);
        var check = document.getElementById('categoryFilterCheck[' + i + ']');
        
        var res_html = document.createElement('div');
        res_html.innerHTML = res.responseText;
        a.removeAttribute('style');
        
        // フィルタに一致するアイテムに番号を付与
        var item_links = get_x('//a[contains(@id, "dy_020_prdNm")]', res_html);
        for (var j in item_links){
          if(item_links[j].href.match(/^http:\/\/honto\.jp\/(?:netstore\/pd-(?:book|magazine)|ebook\/pd)_([0-9]+)\.html/) != null){
            var item_c = get_x('//div[@class="stItemCompact" and @prdid="' + RegExp.$1 + '"]')[0];
            var key = item_c.getAttribute('category');
            if(key != null){
              item_c.setAttribute('category', key + '[' + i + ']');
            }else{
              item_c.setAttribute('category', '[' + i + ']');
            }
          }
        }
        document.getElementById('categoryFilterInfo[' + i + ']').innerHTML = '&nbsp;(' + item_links.length + ')';
        // サブカテゴリの読み込み
        var sub_category = get_x('//li[@class="current"]/ul', res_html);
        if(sub_category.length == 1 && item_links.length >= MIN_SUB_CATEGORY_COUNT){
          var sub_category_links = sub_category[0].getElementsByTagName('a');
          var sub_list = [];
          for(var j = 0; j < sub_category_links.length; j++){
            var cat_value = (i * 100) + j;
            sub_list.push(cat_value);
            setCategoryFilterLink(sub_category_links[j], cat_value);
            sub_category_links[j].addEventListener('click', toggle_filter, 0);
          }
          var other = createOtherCheck();
          setCategoryFilterLink(other.firstChild, (i * 100) + sub_category_links.length);
          sub_category[0].appendChild(other);
          a.parentNode.appendChild(sub_category[0]);
          load_filter(sub_list);
        }
        check.setAttribute('load', '2');
        update_progress();
        if(toggle == true){
          toggle_sub(check, check.parentNode.parentNode.getElementsByClassName('filterCheckBox'));
          set_filter();
        }
        ++index;
        if (index < list.length){
          return load();
        }
        else if(list.length > 1){
          // カテゴリ：その他の判定
          var items = get_x('//div[@class="stItemCompact"]');
          var count = 0;
          // カテゴリ番号：最後の番号+1
          var i = parseInt(list[list.length -1]) + 1;
          var regexp = new RegExp('\\[(?:' + list.join('|') + ')\\]');
          // サブカテゴリの場合、親カテゴリの番号あり
          if(i >= 100) var parent_regexp = new RegExp('\\[(?:' + Math.floor(i/100) + ')\\]');
          for (var j in items){
            var key = items[j].getAttribute('category');
            if(parent_regexp && (!key || key.match(parent_regexp) == null)){
              
            }
            else if(!key){
              count++;
              items[j].setAttribute('category', '[' + i + ']');
            }
            else if(key.match(regexp) == null){
              count++;
              items[j].setAttribute('category', key + '[' + i + ']');
            }
          }
          var span = document.createElement('span');
          span.innerHTML = '&nbsp;(' + count + ')';
          span.id = 'categoryFilterInfo[' + i + ']';
          var a = document.getElementById('categoryFilterLink[' + i + ']');
          var check = document.getElementById('categoryFilterCheck[' + i + ']');
          check.setAttribute('load', '2');
          check.value = 1;
          check.innerHTML = '&#x2611;';
          a.appendChild(span);
          a.removeAttribute('style');
          a.addEventListener('click', toggle_filter, 0);
          if(count > 0) a.parentNode.removeAttribute('style');
          var first = a.parentNode.parentNode.getElementsByTagName('li')[0];
          // 無効にしていたチェックボックスを全て有効に
          for(var j in list){
            var check = document.getElementById('categoryFilterCheck[' + list[j] + ']');
            check.setAttribute('load', '2');
            check.value = 1;
            check.innerHTML = '&#x2611;';
          }
          update_progress();
          // 全てオン/オフにするチェックを設定
          if(first.innerHTML == '全て'){
            var check = document.createElement('span');
            check.value = 1;
            check.innerHTML = '&#x2611;';
            check.setAttribute('class', 'filterAllCheck');
            
            var a = document.createElement('a');
            a.innerHTML = '全て';
            a.insertBefore(check, a.firstChild);
            a.href = 'javascript:void(0)';
            
            first.innerHTML = '';
            first.appendChild(a);
            
            a.addEventListener('click', function(){
              var check = this.getElementsByClassName('filterAllCheck')[0];
              var checks = this.parentNode.parentNode.getElementsByClassName('filterCheckBox');
              toggle_sub(check, checks);
              set_filter();
            },0);
          }
        }
      }
    }
    function update_progress(){
      var n1 = get_x('//span[starts-with(@id, "categoryFilterCheck") and @load="2"]').length;
      var n2 = get_x('//span[starts-with(@id, "categoryFilterCheck")]').length;
      var rate = Math.round(n1/n2*100);
      //debug_message('rate : ' + rate + '%(' + n1 + '/' + n2 + ')');
      var progress = document.getElementById('filterProgress[0]');
      progress.innerHTML = rate + '%';
      progress.style.width = rate + '%';
      if(rate == 100) progress.style.display = 'none';
    }
  }
  
  // チェックボックスの切り替え
  function toggle(check){
    if(check.value == 1){
      check.value = 0;
      check.innerHTML = '&#x2610;';
    }
    else{
      check.value = 1;
      check.innerHTML = '&#x2611;';
    }
  }
  
  // チェックボックスの切り替え(下位要素を連動)
  function toggle_sub(check, checks){
    if(check.value == 1){
      check.value = 0;
      check.innerHTML = '&#x2610;';
      for(var i = 0; i < checks.length; i++){
        checks[i].value = 0;
        checks[i].innerHTML = '&#x2610;';
      }
      // チェックが外れるときは親要素も連動
      var id = check.parentNode.value;
      while(id >= 100){
        id = Math.floor(id/100);
        var parent = document.getElementById('categoryFilterCheck[' + id + ']');
        parent.value = 0;
        parent.innerHTML = '&#x2610;';
        var check_all = parent.parentNode.parentNode.parentNode.getElementsByClassName('filterAllCheck');
        if(check_all.length == 1){
          check_all[0].value = 0;
          check_all[0].innerHTML = '&#x2610;';
        }
      }
    }
    else{
      check.value = 1;
      check.innerHTML = '&#x2611;';
      for(var i = 0; i < checks.length; i++){
        checks[i].value = 1;
        checks[i].innerHTML = '&#x2611;';
      }
      // ToDo : 全てチェックが入ったら親要素もチェックON
      var id = check.parentNode.value;
      while(id >= 100){
        id = Math.floor(id/100);
        var parent = document.getElementById('categoryFilterCheck[' + id + ']');
      }
    }
  }
  
  // フィルタ入力文字の調整
  function check_filter_input(){
    if(this.id != 'titleInput') this.value = this.value.replace(/[^0-9]/g, '');
    set_filter();
  }
  
  // フィルタ入力文字の調整(Enterで検索)
  function check_filter_input2(e){
    if(this.id != 'titleInput') this.value = this.value.replace(/[^0-9]/g, '');
    if(e.keyCode === 13) set_filter();
  }
  
  // 集計情報の更新
  function reflesh_count(){
    var date_count = [];
    for(var i in NUM2DATE) date_count[i] = 0;
    for(var i = 0; i < ITEM_COUNT; i++){
      date_count[document.getElementById('shipDate[' + i + ']').value] ++;
      var price = document.getElementById('itemPrice[' + i + ']').value;
      if(!MIN_PRICE || price < MIN_PRICE){
        MIN_PRICE = price;
      }
      if(!MAX_PRICE || price > MAX_PRICE){
        MAX_PRICE = price;
      }
    }
    for(var i in date_count){
      document.getElementById('filterCount[' + i + ']').innerHTML = '(' + date_count[i] + ')';
      document.getElementById('minPriceInput').value = MIN_PRICE;
      document.getElementById('maxPriceInput').value = MAX_PRICE;
    }
  }
  
  // フィルター条件に従って表示内容を切り替え
  function set_filter(pgno) {
    // ページ数設定：無指定の場合は1ページ目に初期化
    if(pgno){
      PGNO = pgno;
    }else{
      PGNO = 1;
    }
    // 各種フィルタ情報の取得
    var date_filter = [];
    for(var i in NUM2DATE) date_filter[i] = document.getElementById('dateFilter[' + i + ']').value;
    var filter_regexp = [];
    var filter_blocks = get_x('//div[@class="stNavSort01"]/dl/dd/ul[li/a/span/@load="2"]');
    for(var i in filter_blocks){
      var checks = filter_blocks[i].getElementsByClassName('filterCheckBox');
      var values = [];
      for(var j = 0; j < checks.length; j++){
        if(checks[j].getAttribute('load') == 2 && checks[j].value == 1) values.push(checks[j].parentNode.value);
      }
      if(values.length == 0){
        filter_regexp.push(new RegExp('NULL'));
      }else{
        filter_regexp.push(new RegExp('\\[(?:' + values.join('|') + ')\]'));
      }
    }
    for(var i in filter_regexp){
      debug_message('filter_regexp[' + i + '] = ' + filter_regexp[i]);
    }
    var min_price   = parseInt(document.getElementById('minPriceInput').value);
    var max_price   = parseInt(document.getElementById('maxPriceInput').value);
    var total_price = parseInt(document.getElementById('totalPriceInput').value);
    var point_price = 0;
    if(total_price && document.getElementById('usePointCheck').value == 1){
      debug_message('use point');
      point_price = POINT;
      if(total_price < CART_PRICE){
        var use_point = CART_PRICE - total_price;
        document.getElementById('usePointText').innerHTML = '(+<strong>' + use_point + '</strong>ポイント使用)<br/>';
      }else{
        document.getElementById('usePointText').innerHTML = '';
      }
      total_price += point_price;
    }else{
      document.getElementById('usePointText').innerHTML = '';
    }
    if(total_price) debug_message('reflesh filter price : ' + total_price);
    var num_start = DSPNO * (PGNO - 1);
    var num_end = (DSPNO * PGNO) -1;
    var items_c = get_x('//div[@class="stItemCompact"]');
    var items_n = get_x('//div[@class="stBoxLine01"]');
    var word = document.getElementById('titleInput').value;
    debug_message('reflesh filter : ITEM_COUNT=' + ITEM_COUNT + ', PGNO=' + PGNO + ', DSPNO=' + DSPNO);
    // 条件に該当するアイテムのリストを取得
    var match = [];
    for(var i = 0; i < ITEM_COUNT; i++){
      var ship_date = document.getElementById('shipDate[' + i + ']').value;
      var price = document.getElementById('itemPrice[' + i + ']').value;
      var cart = items_c[i].getAttribute('cart');
      var title = items_c[i].getElementsByClassName('stHeadingCompact')[0].getAttribute('title');
      var category = items_c[i].getAttribute('category');
      var filter_value = '';
      filter_value += (date_filter[ship_date] == 1)? '1':'0';
      filter_value += (!min_price || min_price <= price)? '1':'0';
      filter_value += (!max_price || max_price >= price)? '1':'0';
      filter_value += (!word || title.indexOf(word) != -1)? '1':'0';
      filter_value += (!total_price || CART_PRICE + price <= total_price || cart == 1)? '1':'0';
      if(category != null){
        for(var j in filter_regexp){
          if(category.match(filter_regexp[j]) != null){
            filter_value += '1';
          }else{
            filter_value += '0';
          }
        }
      }
      if(filter_value.match(/^1+$/) != null){
        //debug_message('match :' + title);
        match.push(i);
      }else{
        //debug_message('nomatch(' + filter_value + '):' + title);
        items_c[i].style.display = 'none';
        items_n[i].style.display = 'none';
      }
    }
    debug_message('match item count=' + match.length);
    // 表示件数・ページ番号に従って表示範囲を絞る
    for(var i in match){
      if(num_start <= i && i <= num_end){
        items_c[match[i]].style.display = 'inline-block';
        items_n[match[i]].style.display = 'block';
      }else{
        items_c[match[i]].style.display = 'none';
        items_n[match[i]].style.display = 'none';
      }
    }
    // ページング処理エリアの設定
    var paging = get_x('//div[@class="stSearchBox01"]//td[1]');
    for(var i in paging){
      var out_num_end;
      if(match.length <= num_end + 1){
        out_num_end = match.length;
      }
      else{
        out_num_end = num_end + 1;
      }
      paging[i].innerHTML = '<em>' + match.length + '</em> 件中 <em>' + (num_start + 1) + '</em> 件～ <em>' + out_num_end + '</em> 件を表示';
      
      if(i == 1){
        var ul = document.createElement('ul');
        ul.setAttribute('class', 'stPager');
        var page_max = Math.ceil(match.length / DSPNO);
        // 前へ
        if(PGNO == 1){
          ul.innerHTML += '<li class="stPrev"><span>前へ</span></li>';
        }
        else{
          ul.innerHTML += '<li class="stPrev"><a href="javascript:void(0)" name="movePage" pgno="' + (PGNO-1) + '">前へ</a></li>';
        }
        for(var j = 1; j <= page_max; j++){
          // 現在のページ
          if(j == PGNO){
            ul.innerHTML += '<li class="stCurrent">' + j + '</li>';
          }
          // 前後2ページ or 1ページ
          else if(j == 1 || (PGNO - 2 <= j && j <= PGNO + 2)){
            ul.innerHTML += '<li><a href="javascript:void(0)" name="movePage" pgno="' + j + '">' + j + '</a></li>';
          }
          // 前後3ページ
          else if(j == PGNO - 3 || j == PGNO + 3){
            ul.innerHTML += '<li class="stLeader">...</li>';
          }
        }
        // 次へ
        if(PGNO == page_max){
          ul.innerHTML += '<li class="stNext"><span>次へ</span></li>';
        }
        else{
          ul.innerHTML += '<li class="stNext"><a href="javascript:void(0)" name="movePage" pgno="' + (PGNO + 1) + '">次へ</a></li>';
        }
        var orig_pager = document.getElementsByClassName('stPager');
        if(orig_pager.length > 0){
          orig_pager[0].parentNode.replaceChild(ul, orig_pager[0]);
        }
        else{
          var td = document.createElement('td');
          td.appendChild(ul);
          paging[i].parentNode.insertBefore(td, paging[i].nextSibling);
        }
        // ページ移動リンクをクリックした際の動作設定
        var pagers = document.getElementsByName('movePage');
        for(var i = 0; i < pagers.length; i++) pagers[i].addEventListener('click', function(){
          set_filter(Math.ceil(this.getAttribute('pgno')));
        }, 0);
      }
    }
  }
  
  // オートコンプリートを有効にする
  function enable_autocomplete() {
    if(REMEMBER_PASSWORD == false) return;
    var form, input;
    form = document.getElementsByTagName('form');
    if(form) {
      for(i = 0; i < form.length; i++) {
        form[i].setAttribute('autocomplete', 'on');
      }
      input = document.getElementsByTagName('input');
      for(i = 0; i < input.length; i++) {
        if(input[i].type=='text') {
          input[i].setAttribute('autocomplete', 'on');
        }
      }
    }
  }
  
  // 買い物カゴに入れた後、欲しい本から削除する
  function mod_cart_link(){
    if(PUT_CART_DEL_WISHLIST == false) return;
    // 紙書籍
    var prdid = location.href.match(/\/(?:netstore\/pd-(?:book|magazine)|ebook\/pd)_([0-9]+)\.html/);
    if(page_type == 'item_book' && prdid != null){
      // 数量選択用のボックスにID埋込み
      var num_select_box = get_x('//div[@class="stBlockTop"]/form[@action="http://honto.jp/reg/cart-ns.html"]/p/select');
      if(num_select_box.length == 1){
        num_select_box[0].id = 'num_select_box';
      }
      else{
        debug_message('num_select_box_error :' + location.href);
      }
      // 本来のformのactionを無効にする
      var forms = get_x('//form[@action="http://honto.jp/reg/cart-ns.html"]');
      for(var i = 0; i < forms.length; i++){
        forms[i].action = 'javascript:void(0)';
      }
      // 欲しい本から削除→買い物カゴに追加 の処理を設定
      var cart_ids = ['dy_240_buyBtnEnableDisp','dy_240_ezBuyBtnDisp'];
      for(i = 0; i < cart_ids.length; i++){
        document.getElementById(cart_ids[i]).setAttribute('prdid',prdid[1]);
        document.getElementById(cart_ids[i]).addEventListener('click', function(){
          var cart_url = 'http://honto.jp/reg/cart-ns.html?prdid='
            + this.getAttribute('prdid') + '&qty=' + document.getElementById('num_select_box').value;
          if(this.id == 'dy_240_ezBuyBtnDisp'){
            cart_url += '&quick=true';
          }
          get_request(['https://honto.jp/my/wishlist?delWant=1&prdid='+prdid[1]], cart_url);
        },false);
      }
    }
    // 電子書籍
    else if(page_type == 'item_ebook' && prdid != null){
      var quick_form = get_x('//form/input[@name="quick" and @value="true"]');
      for(var i=0; i < quick_form.length; i++){
        quick_form[i].parentNode.setAttribute('name', 'quick');
      }
      var prdid_input = get_x('//form[@action="http://honto.jp/reg/cart-eb.html"]/input[@name="prdid"]');
      for(var i=0; i < prdid_input.length; i++){
        if(prdid_input[i].value == prdid[1]){
          var form = prdid_input[i].parentNode;
          form.setAttribute('prdid', prdid_input[i].value);
          form.setAttribute('action_', form.action);
          form.action = 'javascript:void(0)';
          form.addEventListener('click', function(){
            var cart_url = this.getAttribute('action_') + '?prdid=' + this.getAttribute('prdid');
            if(this.name == 'quick'){
              cart_url += "&quick=true";
            }
            get_request(['https://honto.jp/my/wishlist?delWant=1&prdid='+this.getAttribute('prdid')], cart_url);
          },false);
        }else{
          debug_message('ebook id error: ' + prdid[1] + ', ' + prdid_input[i].value);
        }
      }
    }
    // 検索/欲しい本
    else{
      var links = get_x('//a[contains(@href,"honto.jp/reg/")]');
      for(var i = 0; i < links.length; i++){
        var prdid = links[i].href.match(/\/reg\/cart-(ns|eb)\.html\?.*prdid=([0-9]+)/);
        if(prdid != null){
          links[i].setAttribute('class', 'cart_'+prdid[1]);
          links[i].setAttribute('prdid', prdid[2]);
          links[i].setAttribute('href_', links[i].href);
          links[i].href = 'javascript:void(0)';
          links[i].addEventListener('click', function(){
            get_request(['https://honto.jp/my/wishlist?delWant=1&prdid='+this.getAttribute('prdid')], this.getAttribute('href_'));
          },false);
        }
      }
    }
  }
  
  // 欲しい本へのリンクにデフォルト件数を追加
  function mod_wishlist_link(){
    if(CHANGE_WISHLIST_DISPNUM == false) return;
    var links = get_x('//a[contains(@href,"honto.jp/my/wishlist")]');
    for(var i = 0; i < links.length; i++){
      
      // すでに件数が入っているリンク：そのまま
      if(links[i].href.match(/[?&]dspno=([0-9])+/) != null){
        
      }
      // 他パラメータなし
      else if(links[i].href.match(/\/wishlist(?:\.html)?$/) != null){
        links[i].href += '?dspno=' + DEFAULT_DISPNUM;
      }
      // 他パラメータあり
      else if(links[i].href.match(/\/wishlist(?:\.html)?\?/) != null){
        links[i].href += '&dspno=' + DEFAULT_DISPNUM;
      }
      else{
        debug_message('unknown wishlist link :' + liks[i].href);
      }
      // フィルタ使用時は最大値で固定
      if(USE_FILTER == true) links[i].href = links[i].href.replace(/dspno=[0-9]+/, 'dspno=' + READ_MAX);
    }
  }
  
  // カゴに商品が入っている場合、価格を表示
  function check_cart(){
    if(DISP_PRICE == true || (page_type == 'wishlist' && USE_FILTER == true)){
      var cart_ns = document.getElementById('dy_01_shopCartMoRegNumStr');
      var cart_eb = document.getElementById('dy_01_shopCartEbkRegNumStr');
      if(cart_ns && cart_eb){
        cart_ns.setAttribute('price', 0);
        cart_eb.setAttribute('price', 0);
        get_price(cart_ns);
        get_price(cart_eb);
      }
    }
  }
  function get_price(count){
    if(count.innerHTML.match(/^（計<span>([0-9]+)<\/span>点）$/) != null && RegExp.$1 > 0){
      GM_xmlhttpRequest({ method: 'GET', url: count.previousSibling.href, onload: complete, });
    }
    function complete(res){
      var res_html = document.createElement('div');
      res_html.innerHTML = res.responseText;
      // 合計金額の取得
      var yen = get_x('//div[@class="stBlock02"]/p/span[@class="stYen"]/em', res_html);
      if(yen.length == 1){
        count.innerHTML += ' 合計金額:<span>' + yen[0].innerHTML + '</span>円';
        count.setAttribute('price', yen[0].innerHTML.replace(/[^0-9]/g, ''));
      }
      else{
        count.innerHTML += ' 合計金額:<span>ERROR</span>';
      }
      switch_cart_links(res_html);
      if(USE_FILTER == true && page_type == 'wishlist') set_cart_price();
    }
  }
  function set_cart_price(){
    var cart_ns = document.getElementById('dy_01_shopCartMoRegNumStr');
    var cart_eb = document.getElementById('dy_01_shopCartEbkRegNumStr');
    if(cart_ns && cart_eb){
      CART_PRICE = Math.ceil(cart_ns.getAttribute('price')) + Math.ceil(cart_eb.getAttribute('price'));
      debug_message('cart price :' + CART_PRICE);
      set_filter();
    }
  }
  
  // 買い物カゴに入っている商品のリンクを切り替え
  function switch_cart_links(res_html, id_list){
    if(!id_list) var id_list = [];
    var items = get_x('//p[@class="stMarginB00"]/a[@name="prdNm"]', res_html);
    for(var i in items){
      if(items[i].href.match(/\/(?:netstore\/pd-(?:book|magazine)|ebook\/pd)_([0-9]+)\.html/) != null) id_list.push(RegExp.$1);
    }
    var next_link = get_x('//li[@class="stNext"]/a', res_html);
    if(next_link.length > 0){
      GM_xmlhttpRequest({ method: 'GET', url: next_link[0].href, onload: complete, });
    }else{
      for(var i in id_list){
        var item = get_x('//div[@class="stItemCompact" and @prdid="' + id_list[i] + '"]');
        if(item.length == 1){
          item[0].setAttribute('cart', 1);
          item[0].style.background = '#ffe4c4';
          var cart_link = item[0].getElementsByClassName('hontoSmallCartLink');
          if(cart_link.length == 1){
            var del_link = create_delcart_link(cart_link[0].getAttribute('prdid'), cart_link[0].getAttribute('store'));
            cart_link[0].parentNode.replaceChild(del_link, cart_link[0]);
          }
        }
      }
    }
    function complete(res){
      var res_html = document.createElement('div');
      res_html.innerHTML = res.responseText;
      switch_cart_links(res_html, id_list);
    }
  }
  
  // カートのHTMLから価格と点数を抽出してセット
  function set_price(res_html, store){
    if(store == 'ns'){
      var target = document.getElementById('dy_01_shopCartMoRegNumStr');
    }
    else if(store == 'eb'){
      var target = document.getElementById('dy_01_shopCartEbkRegNumStr');
    }
    if(target){
      if(res_html.innerHTML.match(/<em>現在、買い物カゴには商品がありません。<\/em>/) != null){
        target.innerHTML = '（計<span>0</span>点）';
        target.setAttribute('price', 0);
      }
      else{
        var count = res_html.innerHTML.match(/<em>([0-9]+)<\/em> 件中 <em>1<\/em> 件～ <em>[0-9]+<\/em> 件を表示/);
        var price = get_x('//div[@class="stBlock02"]/p/span[@class="stYen"]/em', res_html);
        if(count != null && price[0]){
          target.innerHTML = '（計<span>' + count[1] + '</span>点） 合計金額:<span>' + price[0].innerHTML + '</span>円';
          target.setAttribute('price', price[0].innerHTML.replace(/[^0-9]/g, ''));
        }
      }
      if(USE_FILTER == true) set_cart_price();
    }
  }
  
  // 欲しい本の先頭に移動した際のエラーメッセージを削除
  function del_wishlist_error(){
    var error = document.getElementById('dy_errMsg');
    if(error && error.innerHTML.indexOf('<li>既に登録されています。リストの先頭に移動しました。</li>') != -1){
      error.parentNode.removeChild(error);
    }
  }
  
  // 画面右上にマイページ/欲しい本へのリンクを挿入
  function set_navi(){
    if(!document.getElementById('stHeaderBlock01')){
      var header = document.createElement('div');
      header.id ='stHeaderBlock01';
      header.appendChild(document.createElement('ul'));
      header.firstChild.id = 'stUserNav';
      var target = document.getElementById('stHeader');
      if(target) target.insertBefore(header, target.firstChild);
    }
    var user_navi = document.getElementById('stUserNav');
    if(user_navi){
      for(var name in NAVIGATION_LINK){
        var li = document.createElement('li');
        var a = document.createElement('a');
        li.appendChild(document.createElement('span'));
        li.firstChild.appendChild(a);
        if(name == 'マイページ'){
          if(document.getElementsByClassName('stMypage').length > 0) continue;
          a.setAttribute('class', 'stMypageAdd');
        }
        a.href = NAVIGATION_LINK[name];
        a.innerHTML = name;
        user_navi.appendChild(li);
      }
    }
  }
  
  // 検索対象カテゴリの初期値を指定
  function set_search_category(){
    var search_category = get_x('//select[@id="dy_01_stGenre"]/option');
    if(search_category.length > 0 && DEFAULT_SEARCH_CATEGORY > 0){
      for(var i = 0; i < search_category.length; i++){
        if(DEFAULT_SEARCH_CATEGORY == search_category[i].value){
          search_category[i].selected = "selected";
          break;
        }
      }
    }
  }
  
  // 買い物カゴでで書影を表示する
  function set_image(){
    if(SHOW_CART_IMAGE == false) return;
    var links = get_x('//a[contains(@id, "dy_prdNm")]');
    for(var i in links){
      if(document.getElementById('dy_prdImg[' + i + ']')) continue;
      var prdid = links[i].href.match(/^http:\/\/honto\.jp\/(netstore\/pd-(?:book|magazine)|ebook\/pd)_([0-9]{4})([0-9]{4})\.html/);
      if(prdid != null){
        var div = document.createElement('div');
        div.setAttribute('class', 'stCartImage');
        div.id = 'dy_prdImg[' + i + ']';
        var a = document.createElement('a');
        a.href = links[i].href;
        a.innerHTML = '<img src="http://image.honto.jp/item/1/75/' + prdid[2] + '/' + prdid[3] + '/' + prdid[2] + prdid[3] + '_1.jpg"/>' ;
        a.setAttribute('alt', links[i].innerHTML.replace(/<[^<>]+>/g, ''));
        div.appendChild(a);
        links[i].parentNode.parentNode.insertBefore(div, links[i].parentNode.parentNode.firstChild);
      }
      else{
        debug_message('item url error:' + links[i].href);
      }
    }
  }
  
  // 買い物カゴに10件以上入っている場合でも、1ページで全て表示する
  function cart_item_pagize(res_html){
    if(SHOW_CART_ALLITEM == false || document.body.innerHTML.indexOf('<em>現在、買い物カゴには商品がありません。</em>') != -1) return;
    var next_link = get_x('//li[@class="stNext"]/a', res_html);
    // 「次へ」リンクがある場合
    if(next_link.length > 0){
      var box = get_x('//div[@class="stSearchBox01"]/table/tbody');
      if(box.length == 1) box[0].innerHTML = '<tr><td>読み込み中…</td></tr>';
      GM_xmlhttpRequest({ method: 'GET', url: next_link[0].href, onload: complete, });
    }
    // 最終処理
    else{
      // チェックボックスのID更新
      var inputs = get_x('//input[contains(@id,"dy_checkPrd")]');
      for(var i in inputs){
        inputs[i].id = 'dy_checkPrd[' + i + ']';
        if(page_type == 'cart_book') inputs[i].value = i;
      }
      if(page_type == 'cart_book'){
        var inputs = get_x('//input[contains(@id,"dy_prdId")]');
        for(var i in inputs) inputs[i].id = 'dy_prdId[' + i + ']';
      }
      // チェックボックス動作の更新
      var a = document.getElementById('dy_linkSelAll');
      if(a) a.setAttribute('onclick', 'onCheckPrd(true,\'' + inputs.length + '\');Event.stop(event);');
      var a = document.getElementById('dy_linkClearAll');
      if(a) a.setAttribute('onclick', 'onCheckPrd(false,\'' + inputs.length + '\');Event.stop(event);');
      // 件数表示の修正
      var box = get_x('//div[@class="stSearchBox01"]/table/tbody');
      if(box.length == 1) box[0].innerHTML = '<tr><td><em>' + inputs.length + '</em> 件中 <em>1</em> 件～ <em>' + inputs.length + '</em> 件を表示</td></tr>';
    }
    function complete(res){
      var res_html = document.createElement('div');
      res_html.innerHTML = res.responseText;
      // アイテムの追加
      var items = get_x('//table[@class="stTableData01"]/tbody/tr', res_html);
      var target = get_x('//table[@class="stTableData01"]/tbody');
      for (var i in items) target[0].appendChild(items[i]);
      // 書影の設定
      set_image();
      // トークンの更新
      var old_token = get_x('//input[@id="dy_ordTokenKey"]');
      var new_token = get_x('//input[@id="dy_ordTokenKey"]', res_html);
      old_token[0].parentNode.replaceChild(new_token[0], old_token[0]);
      // さらに次のページがある場合
      cart_item_pagize(res_html);
    }
  }
  
  // マイページの表示アイテムを畳む
  function format_mypage(){
    var items = get_x('//div[@id="area0"]/*/div[@class="pbNested pbNestedWrapper"]');
    for(var i in items){
      var title = items[i].getElementsByTagName('h2');
      if(title.length == 1){
        var a = document.createElement('a');
        a.setAttribute('class', 'itemDisplaySwitch');
        a.name = title[0].innerHTML.replace(/<[^<>]+>/g, '');
        a.setAttribute('item_id', items[i].id);
        a.href = 'javascript:void(0)';
        a.addEventListener('click', switch_item_display, false);
        items[i].parentNode.insertBefore(a, items[i]);
        a.innerHTML = '▼';
        items[i].style.display = 'block';
        if(HIDE_MYPAGE_ITEMS[a.name] == true) setTimeout(a.click, 100);
      }
    }
  }
  function switch_item_display(){
    var item = document.getElementById(this.getAttribute('item_id'));
    if(this.innerHTML == '▼'){
      this.innerHTML = '&#x25BA;' + this.name;
      item.style.display = 'none';
    }else{
      this.innerHTML = '▼';
      item.style.display = 'block';
      // 高さ設定:とりあえず最大値に合わせる
      var li = item.getElementsByClassName('stView')[0].getElementsByTagName('li');
      var height = 0;
      for(var i = 0; i < li.length; i++){
        if(li[i].offsetHeight > height) height = li[i].offsetHeight;
      }
      for(var i = 0; i < li.length; i++){
        li[i].style.height = height + 'px';
      }
      item.getElementsByClassName('stView')[0].style.height = height + 'px';
    }
  }
  
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
    link.style.color = 'red';
    link.innerHTML = message;
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
    if(DEBUG == true){
      GM_log(text);
    }
  }
}
)();
