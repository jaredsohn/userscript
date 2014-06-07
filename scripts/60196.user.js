// ==UserScript==
// @name           NicoVideo MetaMyList
// @namespace      http://d.hatena.ne.jp/gan2/
// @description    Save the Mylist to local settings.
// @include        http://www.nicovideo.jp/mylist/*
// @include        http://www.nicovideo.jp/my/mylist*
// @version        0.1.20091209
// @author         gan2
// ==/UserScript==

(function() {
  var NUM_DISPALY = 5; // number of display per page
  
  var w = (unsafeWindow || window), document = w.document;

  function Mylist() {
    this.initialize.apply(this, arguments);
  }
  Mylist.prototype = {
    initialize: function(id, title, registeredDate, imgUrl) {
      this.id             = id;
      this.title          = title;
      this.registeredDate = registeredDate;
      this.imgUrl         = imgUrl;
    }
  };

  function loadMetaMylist() {
    var value = GM_getValue('metaMylist');

    if (typeof value == 'undefined') {
      metaMylist = [];
    } else {
      metaMylist = eval('('+ value +')');
    }
  }
  
  function saveMetaMylist() {
    GM_setValue('metaMylist', metaMylist.toSource());
  }

  function makeButton(id, value, func) {
    var submit  = document.createElement('input');

    submit.setAttribute('type',  'button');
    submit.setAttribute('class', 'submit');
    submit.setAttribute('value', value);
    submit.setAttribute('id', id);
    submit.setAttribute('style', 'margin: 0px 10px');

    submit.addEventListener('click', func, false);

    return submit;
  }

  function displayMessage(str) {
    if ($X('//input[@id="add_to_metamylist_btn"]')) {
      target_td.removeChild(target_td.lastChild);
    }
    
    var p  = document.createElement('p');
    p.innerHTML = str;
    target_td.appendChild(p);
  }

  function $X(xpath) {
    var a = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    if (a == null) { return null; };
    return a.singleNodeValue;
  }

  function clickAddBtn() {
    //console.log("addToMetaMylist");
    
    var id = parseInt(location.href.match("/mylist/(.*)")[1]);
    var title = $X('//h1').textContent;
    var registeredDate = new Date();
    var imgUrl = $X('//img[@class="img_std96 lazyimage"]').src;
    var mylist = new Mylist(id, title, registeredDate, imgUrl);
    //console.log(mylist.toSource());
    
    if (addToMetaMylist(mylist)) {
      GM_setValue('metaMylist', metaMylist.toSource());
      displayMessage("メタマイリストに登録しました。");
    } else {
      displayMessage("すでに登録されています。");
    }
    console.log(metaMylist.length);
    saveMetaMylist();
  }
  
  function addToMetaMylist(mylist) {
    var id = mylist.id;
    for (var i = 0, len = metaMylist.length; i < len; i++) {
      if (id == metaMylist[i].id) {
        return false;
      }
    }
    metaMylist.push(mylist);
    return true;
  }
    
  function makeHeader() {
    var div    = document.createElement('div');
    var table  = document.createElement('table');
    var tbody  = document.createElement('tbody');
    var tr     = document.createElement('tr');
    var td     = document.createElement('td');
    var b      = document.createElement('b');
    var btn    = makeButton('initialize_metamylist_btn',
      'メタマイリストを初期化する', clickInitializeBtn);
    
    div.setAttribute('class', 'tool_tit_bg tool_tit');
    table.setAttribute('width', '100%');
    table.setAttribute('cellspacing', '0');
    table.setAttribute('cellpadding', '4');
    table.setAttribute('border', '0');
    b.innerHTML = 'メタマイリスト';

    td.appendChild(b);
    // td.appendChild(btn); // ボタンだと邪魔かなー
    tr.appendChild(td);
    tbody.appendChild(tr);
    table.appendChild(tbody);
    div.appendChild(table);
    
    return div;
  }

  function clickInitializeBtn() {
    initializeMetaMylist();
  }

  function makeContent() {
    var div    = document.createElement('div');

    div.setAttribute('style', 'margin: 0pt 0pt 16px');
    for (var i = 0, len = metaMylist.length; i < len; i++) {
      if (metaMylist[i]) {
        div.appendChild(makeMylistTable(metaMylist[i]));
      }
    }

    return div;
  }

  function makeMylistTable(mylist) {
    var table  = document.createElement('table');
    var tbody  = document.createElement('tbody');
    
    var tr1    = document.createElement('tr');
    var td1_1  = document.createElement('td');
    var td1_2  = document.createElement('td');
    var div    = document.createElement('div');
    
    var tr2    = document.createElement('tr');
    var td2    = document.createElement('td');
    var p2     = document.createElement('p');
    var img2   = document.createElement('img');

    table.setAttribute('width', '672');
    table.setAttribute('cellspacing', '0');
    table.setAttribute('cellpadding', '4');
    table.setAttribute('border', '0');
    table.setAttribute('summary', '');

    tr1.setAttribute('valign', 'top');
    tr1.setAttribute('hb:annotation', 'true');
    td1_1.innerHTML = '<p>'
      + '<a href="mylist/' + mylist.id + '">'
      + '<img class="video_w96 lazyimage" src="' + mylist.imgUrl + '" />'
      + '</a>'
      + '</p>';

    td1_2.setAttribute('width', '100%');
    td1_2.innerHTML = '<p class="TXT12">'
      + '<strong>' + getDateFormat(mylist.registeredDate) + '</strong>'
      + '登録 <br />'
      + '<h3>'
      + '<a class="video" href="mylist/' + mylist.id + '">'
      + mylist.title + '</a>'
      + '</h3>';
    div.setAttribute('style', 'margin: 4px 0pt 0pt;');
    div.appendChild(makeButton('delete_mylist_btn_' + mylist.id,
                                 '削除', deleteMylist));
    td1_2.appendChild(div);

    td2.setAttribute('colspan', '2');
    td2.innerHTML = '<p class="dot_2">'
      + '<img src="http://res.nimg.jp/img/_.gif" />'
      + '</p>';
 
    tr1.appendChild(td1_1);
    tr1.appendChild(td1_2);
    tr2.appendChild(td2);
    
    tbody.appendChild(tr1);
    tbody.appendChild(tr2);
    table.appendChild(tbody);

    return table;
  }

  function getDateFormat(date) {
    var _date = Array();
    _date['year']  = date.getYear();
    _date['month'] = date.getMonth() + 1;
    _date['date']  = date.getDate();
    _date['hour']  = date.getHours();
    _date['min']   = date.getMinutes();
    _date['sec']   = date.getSeconds();

    for (var key in _date) {
      if (key != 'year') {
        _date[key]  = (_date[key] < 10)? ('0'+ _date[key]) : _date[key];
      } else {
        _date[key]  = (_date[key] < 2000)? (_date[key] + 1900) : _date[key];
      }
    }

    return _date['year']  +'年'
      + _date['month'] +'月'
      + _date['date']  +'日 '
      + _date['hour']  +'：'
      + _date['min']   +'：'
      + _date['sec'];
  }

  function deleteMylist() {
    var mylist_id = this.id.substring( this.id.lastIndexOf('_') + 1 );
    
    if (w.confirm('本当に削除しますか？')) {
      for (var i = 0, len = metaMylist.length; i < len; i++) {
        if (metaMylist[i].id == mylist_id) {
          metaMylist.splice(i, 1);
          saveMetaMylist();
          updateMetaMylistDiv();
        }
      }
    } else {
      
    }
  };

  function makeMetaMylistDiv() {
    //console.log('makeMetaMylistDiv');
    var m = $X('//div[@class="content_672"]');
    var metamylist_div = document.createElement('div');
    var header_div     = document.createElement('div');
    var content_div    = document.createElement('div');
    
    metamylist_div.setAttribute('id', 'metamylist');
    
    header_div.setAttribute('style', 'padding: 4px');
    header_div.appendChild(makeHeader());

    content_div = document.createElement('div');
    content_div.setAttribute('style', 'padding: 4px');
    content_div.appendChild(makeContent());
    
    metamylist_div.appendChild(header_div);
    metamylist_div.appendChild(content_div);
    
    m.appendChild(metamylist_div);
  }

  function deleteMetaMylistDiv() {
    var md = $X('//div[@id="metamylist"]');
    md.parentNode.removeChild(md);
  }

  function updateMetaMylistDiv() {
    deleteMetaMylistDiv();
    makeMetaMylistDiv();
  }

  function initializeMetaMylist() {
    console.log("initializeMetaMylist");
    metaMylist = [];
    GM_setValue('metaMylist', metaMylist.toSource());
  }
  
  //===========================================================
  // main
  //===========================================================

  var metaMylist  = null;
  var target_td   = null;

  loadMetaMylist();
  
  if (location.href.match("http://www.nicovideo.jp/mylist/")) {
    target_td = $X('//div[@id="SYS_box_mylist_body"]/form/table/tbody/tr/td[1]');
    var btn = makeButton('add_to_metamylist_btn', 'メタマイリストに追加する', clickAddBtn);
    target_td.appendChild(btn);
  } else {
    makeMetaMylistDiv();
  }
  
  GM_registerMenuCommand('NicoVideo MetaMyList - initialize', initializeMetaMylist);
})();
