// ==UserScript==
// @author         rikuo
// @name           Haiku Search
// @namespace      http://d.hatena.ne.jp/rikuo/
// @description    add Hatena Haiku search form
// @include        http://h.hatena.ne.jp/*
// ==/UserScript==
//
//
// cf. http://hhs.trashsuite.org/


//---------------------------------------------------------------//
//  表示位置の設定 ( top or bottom )
//  top : キーワードなどの上 / bottom : キーワードなどの下

var SearchBoxPosition = 'top';

//---------------------------------------------------------------//


(function() {

  var _doc = document;
  var rightbox = e('rightbar');

  if(!rightbox) return;

  var w = (this.unsafeWindow || window);
  var HatenaHaikuSearchURL = 'http://hhs.trashsuite.org/';
  var DescriptionText = { 
    haiku_search_id_form : 'IDの指定' ,
    haiku_search_keyword_form : 'キーワードの指定' ,
    haiku_search_word_form : '検索語'
  };
  var IDArray = [ 'haiku_search_id_form' , 'haiku_search_keyword_form' , 'haiku_search_word_form' ];

  makebox();
  setValue();
  setDefultDescription();

  w.SearchHatenaHaiku = 
  function(){
    var search_userid = e('haiku_search_id_form').value;
    if(search_userid.match(/([a-zA-Z][\w-]{1,30}[a-zA-Z0-9])/)){
      search_userid = RegExp.$1;
    }else{
      search_userid = '';
    }

    var search_keyword = e('haiku_search_keyword_form').value;
    if(search_keyword == 'キーワードの指定') search_keyword = '';
    search_keyword = encodeURIComponent(search_keyword);

    var search_word = e('haiku_search_word_form').value;
    if(search_word == '検索語') search_word = '';
    search_word = encodeURIComponent(search_word).replace(/(%20|%E3%80%80)+/ig,"+");;

    if(search_userid == '' && search_keyword == '' && search_word == '')return;

    search_userid = '?id=' + search_userid;
    search_keyword = '&keyword=' + search_keyword;
    search_word = '&query=' + search_word;

    window.open(HatenaHaikuSearchURL + search_userid + search_keyword + search_word);

  };

  w.setFocus = 
  function(id){
    var formID = e(id);
    if(formID.value == DescriptionText[id]){
      formID.style.color = '#000000';
      formID.style.backgroundColor = '#ffffff';
      formID.value = '';
    }
  };

  w.setDescription = 
  function(id){
    var formID = e(id);
    if(formID.value == ''){
      formID.style.color = '#75aa68';
      formID.style.backgroundColor = '#eaf4e2';
      formID.value = DescriptionText[id];
    }
  };


  function c(tag_name) {
    return _doc.createElement(tag_name);
  }

  function e(id) {
    return _doc.getElementById(id);
  }

  function xpath(context, query){
    return _doc.evaluate(
      query, context, null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
    ).snapshotItem(0);
  }

  function setValue(){
    var url = location.href;
    if(url.match(/^http:\/\/h.hatena.ne.jp\/(asin\/|http\/\/\/)/i)){
      return;
    }else if(url.match(/^http:\/\/h.hatena.ne.jp\/keyword\/[^\?]+/)){
      var keywordTitle = _doc.getElementsByTagName('H1')[0].firstChild;
      e(IDArray[1]).value = keywordTitle.textContent;
    }else if(url.match(/^http:\/\/h.hatena.ne.jp\/([a-zA-Z][\w-]{1,30}[a-zA-Z0-9])\/\d+/)){
      e(IDArray[0]).value = RegExp.$1;
      var entryTitle = xpath(_doc,'descendant::h2/a[contains(concat(" ",@class," ")," title-anchor ")]');
      if(entryTitle.href.match(/^http:\/\/h.hatena.ne.jp\/keyword\/[^\?]+/)){
        e(IDArray[1]).value = entryTitle.textContent;
      }
    }else if(url.match(/^http:\/\/h.hatena.ne.jp\/(?:id\/)?([a-zA-Z][\w-]{1,30}[a-zA-Z0-9])/)){
      var userName = RegExp.$1;
      if(userName == 'following'){
        var headerID = xpath(_doc,'descendant::div[contains(concat(" ",@class," ")," header-image-id ")]/a');
        userName = (headerID.href.match(/^http:\/\/h.hatena.ne.jp\/([a-zA-Z][\w-]{1,30}[a-zA-Z0-9])/)) ? RegExp.$1 :'' ;

      }

      e(IDArray[0]).value = userName;
    }
  }

  function setDefultDescription(){
    for(var i = 0 ; i < IDArray.length ; i ++){
      if(e(IDArray[i]).value == ''){
        e(IDArray[i]).style.color = '#75aa68';
        e(IDArray[i]).style.backgroundColor = '#eaf4e2';
        e(IDArray[i]).value = DescriptionText[IDArray[i]];
      }
    }
  }


  function makebox(){

    var df = document.createDocumentFragment();

    var search_box = c('div');
    search_box.className = 'box';

    df.appendChild(search_box);

    var search_title = c('div');
    search_title.className = 'box-title';

    var box = df.firstChild;

    box.appendChild(search_title);

    var search_title_text = c('a');
    search_title_text.textContent = 'Haiku::Search';
    search_title_text.title = 'Hatena::Haiku::Search';
    search_title_text.href = HatenaHaikuSearchURL;
    box.childNodes[0].appendChild(search_title_text);

    var search_body = c('div');
    search_body.className = 'box-body';
    box.appendChild(search_body);

    var search_ul = c('ul');
    search_ul.className = 'list-keyword';
    box.childNodes[1].appendChild(search_ul);

    var search_li = c('li');
    box.childNodes[1].childNodes[0].appendChild(search_li);

    var li = box.childNodes[1].childNodes[0].childNodes[0];

    var search_form = c('form');
    search_form.className = 'search-keyword';
    search_form.action = 'javascript:void(0);';

    li.appendChild(search_form);

    var form = li.childNodes[0];

    var search_id_form = c('input');
    search_id_form.className = 'text';
    search_id_form.type = 'text';
    search_id_form.id = IDArray[0];
    search_id_form.title = 'ユーザーID を入力してください';
    search_id_form.setAttribute('onfocus','setFocus(this.id)');
    search_id_form.setAttribute('onblur','setDescription(this.id)');

    var search_keyword_form = c('input');
    search_keyword_form.className = 'text';
    search_keyword_form.type = 'text';
    search_keyword_form.id = IDArray[1];
    search_keyword_form.title = 'キーワードを入力してください';
    search_keyword_form.setAttribute('onfocus','setFocus(this.id)');
    search_keyword_form.setAttribute('onblur','setDescription(this.id)');
    var search_word_form = c('input');
    search_word_form.className = 'text';
    search_word_form.type = 'text';
    search_word_form.id = IDArray[2];
    search_word_form.title = '検索語を入力してください';
    search_word_form.setAttribute('onfocus','setFocus(this.id)');
    search_word_form.setAttribute('onblur','setDescription(this.id)');

    var search_submit = c('input');
    search_submit.className = 'submit';
    search_submit.title = 'Hatena::Haiku::Search で検索することができます';
    search_submit.type = 'submit';
    search_submit.value = 'Search';
    search_submit.setAttribute('onclick', 'SearchHatenaHaiku()');

    form.appendChild(search_id_form);
    form.appendChild(search_keyword_form);
    form.appendChild(search_word_form);
    form.appendChild(search_submit);

    if(SearchBoxPosition == "bottom"){
      rightbox.appendChild( df );
    }else{
      rightbox.insertBefore( df ,rightbox.firstChild);
    }

  }

})();
