// ==UserScript==
// @name           Post this page!
// @namespace      http://yuroyoro.com/
// @description    Usage: Ctrl + Shift + I -> Post now nrowsing url on Twitter and wassr.(今見ているページのURLをTwitterとWassrにPOST)
// @include        http://*
// ==/UserScript==
(function() {

   var show_icon = true;      // ICONを表示するか
   var use_keybind = true;    // ctrl + shift + I でのkeybindを利用するか
   var use_twitter = true;    // twitterを利用するか
   var use_wassr = true;      // wassrを利用するか
   var use_hatenahike = true; // はてなハイクを利用するか
   var display_main = false;  // 現在Mainを表示しているかの状態
   var init_url = false;      // すでにTinyURLしたか
   var page_title = '';       // 表示中のページタイトル
   var page_url   = '';       // 表示中のURL
  
  
  if (self.location.href != top.location.href) {
    return;
  }
  
  // IFrame対応(CrossDomainでは効果なし…。))
  if (window != window.parent) {
    var iframes = window.parent.document.getElementsByTagName("iframe");
    for (var i=0; i<iframes.length; i++) {
      if (iframes[i].src == document.location) {
        return;
      }
    }
  }

  
  GM_addStyle(<><![CDATA[
    div#PostThisPage_icon{
      z-index: 250;
      position: fixed;
      bottom: 0px;
      left: 0px;
      overflow: hidden;
      opacity: 0.9;
      min-height: 21px;
      min-width: 21px;
      max-height: 21px;
      max-width: 21px;
      padding: 0px;
      margin : 0px;
      background-color: transparent
      border : none;
    }
    div#PostThisPage_icon img{
      border : none;
    }
    
    div#PostThisPage_main{
      z-index: 250;
      position: fixed;
      top: 20%;
      left: 0px;
      overflow: auto;
      opacity: 0.85;
      min-height: 150px;
      width: 100%;
      padding: 0px;
      margin : 0px;
      background-color: #F9E3C5;
      border : none;
      border-top : 1px solid #F47B0F;
      border-bottom : 1px solid #F47B0F;
      
      -x-system-font:none;
      font-family: Helvetica, Verdana, sans-serif;
      font-size:1.2em;
      font-size-adjust:none;
      font-stretch:normal;
      font-style:normal;
      font-variant:normal;
      font-weight:normal;
      line-height:1.1;
      color:#666666;
      text-align:center;
      text-indent:0;
      text-rendering:optimizelegibility;
      text-transform:none;
      vertical-align:text-top;
      word-spacing:normal;
    }

    div#PostThisPage_main div#PostThisPage_form div#PostThisPage_title{
       width:50%;
       text-align : left;
       margin-left:auto;
       margin-right:auto
    }
    div#PostThisPage_main div#PostThisPage_form div#PostThisPage_title h3#PostThisPage_title_text{
      font-weight:bold;
      font-size : 1.2em;
      color : #F9B25D;
      margin : 10px 0px;
      background:transparent ;
      height:auto;
      line-height:auto;
      padding :0px;
      border : none;
    }
    div#PostThisPage_main div#PostThisPage_form hr#PostThisPage_hr{
      border :none;
      width : 100%;
      border-top: 1px solid #F47B0F;
      display : block;
    }
    div#PostThisPage_main div#PostThisPage_form div#PostThisPage_content {
      text-align : left;
      width:50%;
      margin-left:auto;
      margin-right:auto
    }
    div#PostThisPage_main div#PostThisPage_form div#PostThisPage_content div#PostThisPage_info{
      width : 100%;
      vertical-align : bottom;
    }
    div#PostThisPage_main div#PostThisPage_form div#PostThisPage_content div#PostThisPage_info_container{
      width : 85%;
      float : left;
      vertical-align :bottom
    }
    
    div#PostThisPage_main div#PostThisPage_form div#PostThisPage_content div.PostThisPage_page_info{
      font-size : 0.7em;
      padding-left : 15px;
      margin : 4px ;
    }
    
    div#PostThisPage_main div#PostThisPage_form div#PostThisPage_content div#PostThisPage_message{
      clear: both;
      width : 85%;
      font-size : 0.7em;
      color : #F9B25D;
      background-color : #FFFFFF;
      border :1px solid #F47B0F;
      margin : 4px 0px;
      padding : 5px;
      display :none;
    }
    div#PostThisPage_main div#PostThisPage_form div#PostThisPage_content span#PostThisPage_counter{
      float : right;
      color:#F9B25D;
      font-size:22pt !important;
      font-family:'Georgia','Serif';
      width : 14%;
      text-align:right;
      font-size-adjust:none;
      font-style:normal;
      font-variant:normal;
      font-weight:normal;
      line-height : 1.4;
    }
    div#PostThisPage_main div#PostThisPage_form div#PostThisPage_content textarea#PostThisPage_textarea{
      -x-system-font:none;
      font-size:0.8em;
      height:5em;
      line-height:1.1;
      overflow:auto;
      margin : 2px 0px;
      padding: 5px;
      width:100%;
      -moz-appearance:textfield-multiline;
      -moz-user-select:text;
      background-color:-moz-field;
      border:1px solid #F47B0F;
      color:-moz-fieldtext;
      cursor:text;
      text-align:start;
      text-indent:0;
      text-rendering:optimizelegibility;
      text-transform:none;
      vertical-align:text-bottom;
      word-spacing:normal;
    }
    div#PostThisPage_main div#PostThisPage_form div#PostThisPage_checks{
      text-align : left;    
      padding-left : 20px;
      margin : 10px 0px;
      font-size : 0.8em;
    }
    div#PostThisPage_main div#PostThisPage_form div#PostThisPage_checks label{
      margin : 0px 8px;
    }
    
    div#PostThisPage_main div#PostThisPage_form input#update_button{
      background-color:#808080;
      border:1px solid black;
      color:#FFFFFF;
      cursor:pointer;
      font-size:0.9em;
      font-weight:bold;
      margin-top:5px;
      margin-bottom:5px;
      padding:2px 8px;
      -moz-appearance:button;
      -moz-binding:none;
      -moz-box-sizing:border-box;
      -moz-user-select:none;
      -x-system-font:-moz-button;
      font-family:-moz-use-system-font;
      font-size-adjust:-moz-use-system-font;
      font-stretch:-moz-use-system-font;
      font-style:-moz-use-system-font;
      font-variant:-moz-use-system-font;
      line-height:normal !important;
      text-align:center;
      white-space:pre;
    }

  ]]></>);
  
  // 初期化
  function init(){
    
    // Main Div生成
    var view = c('div');
    view.id = 'PostThisPage_main';
    view.style.display = 'none';
    
    var form = c('div');
    form.id = 'PostThisPage_form';
    view.appendChild(form);
    
    document.body.appendChild(view);
    init_form( form );

    // ICON用Div生成
    var icon = c('div');
    icon.id = 'PostThisPage_icon';
    var icon_img = c('img');
    icon_img.src = ICON_IMAGE;
    icon.appendChild( icon_img );
    document.body.appendChild( icon );
    
    // ICONクリックでMainをtoggleする
    icon.addEventListener('click', toggle_PostThisPage_main, false);
    
    // ICONを表示するかの設定を取得
    var config_show_icon = GM_getValue('PostThisPage_show_icon');
    if( config_show_icon != undefined) show_icon = config_show_icon;
    if( !show_icon) hide_PostThisPage_icon();

    // keybindを利用するかの設定を取得
    var config_use_keybind = GM_getValue('PostThisPage_use_keybind');
    if( config_use_keybind != undefined) use_keybind = config_use_keybind;
    if( use_keybind ){
      // ctrl + shift + i にkeybind
      addEventListener('keydown', function(e){
        var c = (e.ctrlKey)
        var s = (e.shiftKey)
        var v = (e.keyCode == 73)
        if (c && s && v) {
          toggle_PostThisPage_main();
        }
      }, true);
    }
    
    // twitterを利用するかの設定を取得
    var config_use_twitter = GM_getValue('PostThisPage_use_twitter');
    if( config_use_twitter != undefined) use_twitter = config_use_twitter;
    if( !use_twitter ){
      e('PostThisPage_check_twitter').style.display = 'none';
      e('PostThisPage_check_twitter_label').style.display = 'none';
    }
    
    // wassrを利用するかの設定を取得
    var config_use_wassr = GM_getValue('PostThisPage_use_wassr');
    if( config_use_wassr != undefined) use_wassr = config_use_wassr;
    if( !use_wassr ){
      e('PostThisPage_check_wassr').style.display = 'none';
      e('PostThisPage_check_wassr_label').style.display = 'none';
    }
    
    // はてなハイクを利用するかの設定を取得
    var config_use_hatenahike = GM_getValue('PostThisPage_use_hatenahike');
    if( config_use_hatenahike != undefined) use_hatenahike = config_use_hatenahike;
    if( !use_wassr ){
      e('PostThisPage_check_hatenahike').style.display = 'none';
      e('PostThisPage_check_hatenahike_label').style.display = 'none';
    }

  }
  
  function init_form(){
    var form = e('PostThisPage_form');
    
    var title = c('div');
    title.id = 'PostThisPage_title';
    
    var title_text = c('h3');
    title_text.id  = 'PostThisPage_title_text';
    title_text.innerHTML = 'いまここみてる';
    title.appendChild(title_text);
    
    form.appendChild( title);
    
    var hr = c('hr');
    hr.id = 'PostThisPage_hr';
    form.appendChild(hr);
    
    var content = c('div');
    content.id = 'PostThisPage_content';
    
    var info = c('div');
    info.id = 'PostThisPage_info';
    
    var info_container = c('div');
    info_container.id = 'PostThisPage_info_container';
    
    var page_title = c('div');
    page_title.id  = 'PostThisPage_page_title';
    page_title.className = 'PostThisPage_page_info';
    info_container.appendChild(page_title);
    
    var page_url = c('div');
    page_url.id  = 'PostThisPage_page_url';
    page_url.className = 'PostThisPage_page_info';
    info_container.appendChild(page_url);
    info.appendChild(info_container);

    var counter = c('span');
    counter.id = 'PostThisPage_counter';
    info.appendChild( counter );
    
    content.appendChild( info );

    var message = c('div');
    message.id = 'PostThisPage_message';
    content.appendChild( message );
    
    var text = c('textarea');
    with( text ) {
      id = 'PostThisPage_textarea';
      rows = 2;
      cols = 40;
      addEventListener('keyup' , updateStatusTextCharCounter ,false);
      addEventListener('focus' , updateStatusTextCharCounter ,false);
      addEventListener('blur' ,  updateStatusTextCharCounter ,false);
      // ctrl + enter でPOST
      addEventListener('keydown', function(e){
        var c = (e.ctrlKey)
        var v = (e.keyCode == 13)
        if (c && v) {
          post();
        }
      }, true);
    }
    content.appendChild( text );
    
    var checks = c('div');
    checks.id = 'PostThisPage_checks';
    
    var check_title = c('input');
    with(check_title){
      id   = 'PostThisPage_check_title';
      type = 'checkbox';
      checked = 'true';
      addEventListener('change' , append_title , false );
    }
    checks.appendChild( check_title );
    var check_title_label = c('label');
    with(check_title_label){
      id   = 'PostThisPage_check_title_label';
      innerHTML = 'タイトルを追加する';
    }
    check_title_label.setAttribute('for','PostThisPage_check_title');
    checks.appendChild( check_title_label );
    
    var check_twitter = c('input');
    with(check_twitter){
      id   = 'PostThisPage_check_twitter';
      type = 'checkbox';
      checked = 'true';
    }
    checks.appendChild( check_twitter );
    var check_twitter_label = c('label');
    with(check_twitter_label){
      id   = 'PostThisPage_check_twitter_label';
      innerHTML = 'Twitter';
    }
    check_twitter_label.setAttribute('for','PostThisPage_check_twitter');
    checks.appendChild( check_twitter_label );
    
    var check_wassr = c('input');
    with(check_wassr){
      id   = 'PostThisPage_check_wassr';
      type = 'checkbox';
      checked = 'true';
    }
    checks.appendChild( check_wassr );
    var check_wassr_label = c('label');
    with(check_wassr_label){
      id   = 'PostThisPage_check_wassr_label';
      innerHTML = 'Wassr';
    }
    check_wassr_label.setAttribute('for','PostThisPage_check_wassr');
    checks.appendChild( check_wassr_label );
    
    var check_hatenahike = c('input');
    with(check_hatenahike){
      id   = 'PostThisPage_check_hatenahike';
      type = 'checkbox';
      checked = 'true';
    }
    checks.appendChild( check_hatenahike );
    var check_hatenahike_label = c('label');
    with(check_hatenahike_label){
      id   = 'PostThisPage_check_hatenahike_label';
      innerHTML = 'はてなハイク';
    }
    check_hatenahike_label.setAttribute('for','PostThisPage_check_hatenahike');
    checks.appendChild( check_hatenahike_label );
    
    content.appendChild( checks );
    
    var center = c('center');
    var btn = c('input');
    with(btn){
      id = 'update_button';
      type = 'button';
      value = '投稿する';
      addEventListener('click' , post , false );
    }
    
    center.appendChild( btn );
    content.appendChild( center );
    
    form.appendChild( content );
    
  }
  
  // Title.URLをセット
  function set_page_info(){
    u('PostThisPage_page_title' , 'Title : ' +  page_title);
    u('PostThisPage_page_url', 'URL : ' + page_url);
    var text = e('PostThisPage_textarea');
    text.value = '[ ' + page_url + ' : ' + page_title + ' ]';
    // カーソル位置を先頭にしておく
    text.setSelectionRange(0,0)
    updateStatusTextCharCounter();
  }
  
  // ICONの表示切り替え
  function hide_PostThisPage_icon(){
    var icon = e('PostThisPage_icon');
    icon.style.display = 'none';
  }
  
  // ICONの表示切り替え
  function show_PostThisPage_icon(){
    var icon = e('PostThisPage_icon');
    icon.style.display = 'block';
  }
  
  // ICON表示設定の切り替え
  function setIconSetting(){
    if( show_icon ){
      hide_PostThisPage_icon();
      show_icon = false;
    }
    else{
      show_PostThisPage_icon();
      show_icon = true;
    }
    GM_setValue('PostThisPage_show_icon' , show_icon);
  }
  
  // keybind利用設定の切り替え
  function setKeybindSetting(){
    if( use_keybind ){
      use_keybind = false;
    }
    else{
      use_keybind = true;
    }
    GM_setValue('PostThisPage_use_keybind' , use_keybind);
  }

  // Twitter利用設定の切り替え
  function setTwitterSetting(){
    if( use_twitter ){
      use_twitter = false;
    }
    else{
      use_twitter = true;
    }
    GM_setValue('PostThisPage_use_twitter' , use_twitter);
  }
  
  // Wassr利用設定の切り替え
  function setWassrSetting(){
    if( use_wassr ){
      use_wassr = false;
    }
    else{
      use_wassr = true;
    }
    GM_setValue('PostThisPage_use_wassr' , use_wassr);
  }
  
  // はてなハイク利用設定の切り替え
  function setHatenaHikeSetting(){
    if( use_hatenahike ){
      use_hatenahike = false;
    }
    else{
      use_hatenahike = true;
    }
    GM_setValue('PostThisPage_use_hatenahike' , use_hatenahike);
  }
    
  // Mainの表示切り替え
  function show_PostThisPage_main(){
      var main = e('PostThisPage_main');
      main.style.display = 'block';
      display_main = true;
      // TinyURLしていないかったらやる
      if( !init_url ){
        page_title = document.title;
        createTinyURL( top.location.href,
          function(url){
            page_url = url;
            set_page_info();
          } ,
          function(){
            page_url = top.location.href;
            set_page_info();
          }
        );
        init_url = true;
      }
      // textにフォーカス
      var text = e('PostThisPage_textarea');
      text.focus();
  }
  // Mainの表示切り替え  
  function hide_PostThisPage_main(){
    var main = e('PostThisPage_main');
    if (main) {
      main.style.display = 'none';
      display_main = false;
    }
  }
  // Mainの表示切り替え
  function toggle_PostThisPage_main(){
    if( display_main ){
      hide_PostThisPage_main();
    }else{
      show_PostThisPage_main();
    }
  }
  
  // TinyURLを生成する
  function createTinyURL(url,callback,error) {
    GM_xmlhttpRequest({
      method : 'get',
      url    : 'http://tinyurl.com/api-create.php?url=' + url,
      onload : function(res) {
        if (res.responseText != 'Error') callback(res.responseText)
        else if (typeof error == 'function') error(res)
      },
      onerror: error,
    })
  }
  
  // Textareaに入力された文字数を表示する
  function updateStatusTextCharCounter() {
   var text = e('PostThisPage_textarea');

   len = text.value.length;
   var counter = e('PostThisPage_counter');
   counter.innerHTML = '' + (len);

   var t_lable = e('PostThisPage_check_twitter_label');
   var w_lable = e('PostThisPage_check_wassr_label');
   var h_lable = e('PostThisPage_check_hatenahike_label');   
   t_lable.innerHTML = 'Twitter (' + (140 - len) + ')';
   w_lable.innerHTML = 'Wassr (' + (255 - len) + ')'; 
   h_lable.innerHTML = 'はてなハイク (' + (255 - len) + ')'; 
   
   if( len > 130 ){
     t_lable.style.color = '#d40d12';
   }
   else if( len > 120 ){
     t_lable.style.color = '#5c0002';
   }
   else{
     t_lable.style.color = '#666666';
   }
   
   if( len > 255 ){
     w_lable.style.color = '#d40d12';
   }
   else if( len > 240 ){
     w_lable.style.color = '#5c0002';
   }
   else{
     w_lable.style.color = '#666666';
   }
   
   if( len > 255 ){
     h_lable.style.color = '#d40d12';
   }
   else if( len > 240 ){
     h_lable.style.color = '#5c0002';
   }
   else{
     h_lable.style.color = '#666666';
   }
  }
  
  // TextArea内にPageのTitleを付与/削除
  function append_title(){
    var chk = e('PostThisPage_check_title');
    var text = e('PostThisPage_textarea');
    var value = text.value;
    
    if( !chk.checked ){
      var s = '[ ' + page_url + ' : ' + page_title + ' ]';
      value = value.replace( s , '[ ' + page_url +  ' ]' );
      text.value = value;
    }
    else{
      var s = '[ ' + page_url +  ' ]';
      value = value.replace( s , '[ ' + page_url + ' : ' + page_title + ' ]' );
      text.value = value;
    }
  }
  
  // 発言をPOST
  function post(){
    clear_message();
    var t_chk = e('PostThisPage_check_twitter');
    var w_chk = e('PostThisPage_check_wassr');
    var h_chk = e('PostThisPage_check_hatenahike');
    var text = e('PostThisPage_textarea');
    var value = text.value;
    
    if( t_chk.checked) post_twitter( value );
    
    if( w_chk.checked) post_wassr( value );
    
    if( h_chk.checked) post_HatenaHike( value );
  }
  
  // TwitterにPost
  function post_twitter(status) {
    if( !use_twitter ) return;
    if( status.length > 140 ){
      append_message('発言が140文字を超えるため、Twitterには投稿しません。');
      return;
    }
    GM_xmlhttpRequest({
      method : 'post',
      url    : 'http://twitter.com/statuses/update.json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      data   : 'status=' + encodeURIComponent(status),
      onload : function(res) {
        append_message('Twitterに投稿しました。');
      },
      onerror: function(res) {
        append_message('Twitterへの投稿に失敗しました。- ' + status + ' - ' + res.status + ': ' + res.statusText);
      },
    });
  }
  
  // WassrにPOST
  function post_wassr(status) {
    if( !use_wassr ) return;
    if( status.length > 255 ){
      append_message('発言が255文字を超えるため、Wassrには投稿しません。');
      return;
    }

    GM_xmlhttpRequest({
      method : 'post',
      url    : 'http://api.wassr.jp/statuses/update.json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      data   : 'status=' + encodeURIComponent(status) + '&source=PostThisPage!',
      onload : function(res) {
        append_message('Wassrに投稿しました。');
      },
      onerror: function(res) {
        console.log(res);
        append_message('Wassrへの投稿に失敗しました。');
      },
    });
  }
  
  // はてなハイクにPOST
  function post_HatenaHike(status) {
    if( !use_hatenahike ) return;
    if( status.length > 255 ){
      append_message('発言が255文字を超えるため、はてなハイクには投稿しません。');
      return;
    }

    GM_xmlhttpRequest({
      method : 'post',
      url    : 'http://h.hatena.ne.jp/api/statuses/update.json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      data   : 'status=' + encodeURIComponent(status) + '&source=PostThisPage!',
      onload : function(res) {
        append_message('はてなハイクに投稿しました。');
      },
      onerror: function(res) {
        console.log(res);
        append_message('はてなハイクへの投稿に失敗しました。');
      },
    });
  }
  
  // MessageをClear
  function clear_message( ){
    var m = e('PostThisPage_message');
    m.innerHTML = "";
    m.style.display = 'none';
  }
  // Messageを出す
  function append_message( msg ){
    var m = e('PostThisPage_message');
    m.innerHTML += msg + '<br/>';
    m.style.display = 'block';
  }
  
  // Util
  function c(tag_name) {
    return document.createElement(tag_name);
  }
  
  function u(id, text) {
    e(id).innerHTML = text;
  }
  
  function e(id) {
    return document.getElementById(id);
  }
  
var console = {
  _defined: false,
  log: function(object) {
    if (!console._defined) {
      console._defined = true;
      location.href = "javascript:" + uneval(function() {
        document.addEventListener("consoleData",
        function(event) {
          console.log.apply(this, event.getData("object"));
        },
        false);
      }) + "()";
    }
    setTimeout(send, 100, arguments);
    function send(object) {
      var event = document.createEvent("DataContainerEvent");
      event.initEvent("consoleData", true, false);
      event.setData("object", object);
      document.dispatchEvent(event);
    }
  }
};

  
  var ICON_IMAGE = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ'+
    'bWFnZVJlYWR5ccllPAAAAJNQTFRF+a1K+KAr+ac79ZU895cY95wk+NOi//nx+Lpp+MSA97BS+8J3'+
    '+8mG9Igl98mX+M6X/NCW+MmL96Ev/vLi+Ny596Y7+N25+L909q9q97Vd+rRZ/uvS9Y8x9pYk+Niu'+
    '9IEa9o0N+Nau9ZtH9rBp9rV1+rto9I4x97yA97x0/d20+Jkc95IN/Nal/eTD9HsP+ePF////7+nb'+
    '2wAAADF0Uk5T////////////////////////////////////////////////////////////////'+
    'AB+aTiEAAADLSURBVHjabNHZcsIwDAVQObGDQxL2tS3QslPZvvz/11U4YGagepLPg65Gpmsqnzp6'+
    'mvoHid0belOqN6Q5jHtBr2cosxckC8Bc7o+xrytSPNotFvuzYUVV7cnx1PYLIGzyJpxQ9K3O6Oq0'+
    'kGCOSdNI0806MrNVQeQhWgxyehixF7bR2nTHBYJUPlne7L7S7xrh2PsBbJ327HA7ExhSQj8V/JoL'+
    'FirhoIvZ6jszJcAJq6XVh7Fc1JQj/0Bi+oyBTvHggR/Pn3C38/0JMAA9ZzpShQk06wAAAABJRU5E'+
    'rkJggg==';
  
  init();
  

  GM_registerMenuCommand('Post this page! - icon', setIconSetting);
  GM_registerMenuCommand('Post this page! - keybind', setKeybindSetting);
  GM_registerMenuCommand('Post this page! - Twitter', setTwitterSetting);
  GM_registerMenuCommand('Post this page! - Wassr', setWassrSetting);
  GM_registerMenuCommand('Post this page! - はてなハイク', setHatenaHikeSetting);
})();