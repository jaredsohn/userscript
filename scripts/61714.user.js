// ==UserScript==
// @name         amazon international shipping(USA-JP)
// @namespace    http://www.yasui-kamo.com/
// @description  amazon.com shopping is supported.
// @include      http://www.amazon.com/*
// @include      https://www.amazon.com/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

/*
--------------------------------------------------------
suggest.js - Input Suggest
Version 2.3 (Update 2012/07/01)

Copyright (c) 2006-2012 onozaty (http://www.enjoyxstudy.com)

Released under an MIT-style license.

For details, see the web site:
 http://www.enjoyxstudy.com/javascript/suggest/

--------------------------------------------------------
*/

var suggestObj;

if (!Suggest) {
  var Suggest = {};
}
/*-- KeyCodes -----------------------------------------*/
Suggest.Key = {
  TAB:     9,
  RETURN: 13,
  ESC:    27,
  UP:     38,
  DOWN:   40
};

/*-- Utils --------------------------------------------*/
Suggest.copyProperties = function(dest, src) {
  for (var property in src) {
    dest[property] = src[property];
  }
  return dest;
};

/*-- Suggest.Local ------------------------------------*/
Suggest.Local = function() {
  this.initialize.apply(this, arguments);
};
Suggest.Local.prototype = {
  initialize: function(input, suggestArea, candidateList) {

    this.input = this._getElement(input);
    this.suggestArea = this._getElement(suggestArea);
    this.candidateList = candidateList;
    this.oldText = this.getInputText();

    if (arguments[3]) this.setOptions(arguments[3]);

    // reg event
    this._addEvent(this.input, 'focus', this._bind(this.checkLoop));
    this._addEvent(this.input, 'blur', this._bind(this.inputBlur));
    this._addEvent(this.suggestArea, 'blur', this._bind(this.inputBlur));

    var keyevent = 'keydown';
    if (window.opera || (navigator.userAgent.indexOf('Gecko') >= 0 && navigator.userAgent.indexOf('KHTML') == -1)) {
      keyevent = 'keypress';
    }
    this._addEvent(this.input, keyevent, this._bindEvent(this.keyEvent));

    // init
    this.clearSuggestArea();
  },

  // options
  interval: 500,
  dispMax: 20,
  listTagName: 'div',
  prefix: false,
  ignoreCase: true,
  highlight: false,
  dispAllKey: false,
  classMouseOver: 'over',
  classSelect: 'select',
  hookBeforeSearch: function(){},

  setOptions: function(options) {
    Suggest.copyProperties(this, options);
  },

  inputBlur: function() {

    setTimeout(this._bind(function(){
      if(!document.getElementById("twotabsearchtextbox"))
      {
         this.clearSuggestArea;
         return;
      }

      if (document.activeElement == this.suggestArea
          || document.activeElement == this.input) {
        // keep suggestion
        return;
      }

      this.changeUnactive();
      this.oldText = this.getInputText();

      if (this.timerId) clearTimeout(this.timerId);
      this.timerId = null;

      setTimeout(this._bind(this.clearSuggestArea), 500);
    }, 500));
  },

  checkLoop: function() {
    var text = this.getInputText();
    if(this.input.value.length == 0)
    {
		this.clearSuggestArea;
	}
    if (text != this.oldText) {
      this.oldText = text;
//      this.search();
		//this.getSuggest();
		getSuggest(this.input.value);
    }
    if (this.timerId) clearTimeout(this.timerId);
    this.timerId = setTimeout(this._bind(this.checkLoop), this.interval);
  },
/*
  getSuggest: function() {
	var keyworddata = this.input.value;
	var url = 'http://www.google.com/complete/search?hl=ja&q='+keyworddata+'&output=toolbar';
	//new Ajax.Request( url ,{ method: 'get',  onComplete: parseSuggest } );
	GM_xmlhttpRequest({ method : 'GET', url : url, onload : parseSuggest });
  },
*/
  search: function() {
    // init
    this.clearSuggestArea();

    var text = this.getInputText();
    if (text == '' || text == null) return;

    this.hookBeforeSearch(text);
    var resultList = this._search(text);
    if (resultList.length != 0) this.createSuggestArea(resultList);
  },

  _search: function(text) {

    var resultList = [];
    var temp; 
    this.suggestIndexList = [];

    for (var i = 0, length = this.candidateList.length; i < length; i++) {
      if ((temp = this.isMatch(this.candidateList[i], text)) != null) {
        resultList.push(temp);
        this.suggestIndexList.push(i);

        if (this.dispMax != 0 && resultList.length >= this.dispMax) break;
      }
    }
    return resultList;
  },

  isMatch: function(value, pattern) {

    if (value == null) return null;

    var pos = (this.ignoreCase) ?
      value.toLowerCase().indexOf(pattern.toLowerCase())
      : value.indexOf(pattern);

    if ((pos == -1) || (this.prefix && pos != 0)) return null;

    if (this.highlight) {
      return (this._escapeHTML(value.substr(0, pos)) + '<strong>' 
             + this._escapeHTML(value.substr(pos, pattern.length)) 
               + '</strong>' + this._escapeHTML(value.substr(pos + pattern.length)));
    } else {
      return this._escapeHTML(value);
    }
  },

  clearSuggestArea: function() {
    this.suggestArea.innerHTML = '';
    this.suggestArea.style.display = 'none';
    this.suggestList = null;
    this.suggestIndexList = null;
    this.activePosition = null;
  },

  createSuggestArea: function(resultList) {
    this.suggestList = [];
    this.inputValueBackup = this.input.value;

    for (var i = 0, length = resultList.length; i < length; i++) {
      var element = document.createElement(this.listTagName);
      element.innerHTML = resultList[i];
      this.suggestArea.appendChild(element);

      this._addEvent(element, 'click', this._bindEvent(this.listClick, i));
      this._addEvent(element, 'mouseover', this._bindEvent(this.listMouseOver, i));
      this._addEvent(element, 'mouseout', this._bindEvent(this.listMouseOut, i));

      this.suggestList.push(element);
    }

    this.suggestArea.style.display = '';
    this.suggestArea.scrollTop = 0;
  },

  getInputText: function() {
    return this.input.value;
  },

  setInputText: function(text) {
    this.input.value = text;
  },

  // key event
  keyEvent: function(event) {

    if (!this.timerId) {
      this.timerId = setTimeout(this._bind(this.checkLoop), this.interval);
    }

    if (this.dispAllKey && event.ctrlKey 
        && this.getInputText() == ''
        && !this.suggestList
        && event.keyCode == Suggest.Key.DOWN) {
      // dispAll
      this._stopEvent(event);
      this.keyEventDispAll();
    } else if (event.keyCode == Suggest.Key.UP ||
               event.keyCode == Suggest.Key.DOWN) {
      // key move
      if (this.suggestList && this.suggestList.length != 0) {
        this._stopEvent(event);
        this.keyEventMove(event.keyCode);
      }
    } else if (event.keyCode == Suggest.Key.RETURN) {
      // fix
      if (this.suggestList && this.suggestList.length != 0) {
        this._stopEvent(event);
        this.keyEventReturn();
      }
    } else if (event.keyCode == Suggest.Key.ESC) {
      // cancel
      if (this.suggestList && this.suggestList.length != 0) {
        this._stopEvent(event);
        this.keyEventEsc();
      }
    } else {
      this.keyEventOther(event);
    }
  },

  keyEventDispAll: function() {

    // init
    this.clearSuggestArea();

    this.oldText = this.getInputText();

    this.suggestIndexList = [];
    for (var i = 0, length = this.candidateList.length; i < length; i++) {
      this.suggestIndexList.push(i);
    }

    this.createSuggestArea(this.candidateList);
  },

  keyEventMove: function(keyCode) {

    this.changeUnactive();

    if (keyCode == Suggest.Key.UP) {
      // up
      if (this.activePosition == null) {
        this.activePosition = this.suggestList.length -1;
      }else{
        this.activePosition--;
        if (this.activePosition < 0) {
          this.activePosition = null;
          this.input.value = this.inputValueBackup;
          this.suggestArea.scrollTop = 0;
          return;
        }
      }
    }else{
      // down
      if (this.activePosition == null) {
        this.activePosition = 0;
      }else{
        this.activePosition++;
      }

      if (this.activePosition >= this.suggestList.length) {
        this.activePosition = null;
        this.input.value = this.inputValueBackup;
        this.suggestArea.scrollTop = 0;
        return;
      }
    }

    this.changeActive(this.activePosition);
  },

  keyEventReturn: function() {

    this.clearSuggestArea();
    this.moveEnd();
  },

  keyEventEsc: function() {

    this.clearSuggestArea();
    this.input.value = this.inputValueBackup;
    this.oldText = this.getInputText();

    if (window.opera) setTimeout(this._bind(this.moveEnd), 5);
  },

  keyEventOther: function(event) {},

  changeActive: function(index) {

    this.setStyleActive(this.suggestList[index]);

    this.setInputText(this.candidateList[this.suggestIndexList[index]]);

    this.oldText = this.getInputText();
    this.input.focus();
  },

  changeUnactive: function() {

    if (this.suggestList != null 
        && this.suggestList.length > 0
        && this.activePosition != null) {
      this.setStyleUnactive(this.suggestList[this.activePosition]);
    }
  },

  listClick: function(event, index) {

    this.changeUnactive();
    this.activePosition = index;
    this.changeActive(index);

    this.clearSuggestArea();
    this.moveEnd();
  },

  listMouseOver: function(event, index) {
    this.setStyleMouseOver(this._getEventElement(event));
  },

  listMouseOut: function(event, index) {

    if (!this.suggestList) return;

    var element = this._getEventElement(event);

    if (index == this.activePosition) {
      this.setStyleActive(element);
    }else{
      this.setStyleUnactive(element);
    }
  },

  setStyleActive: function(element) {
    element.className = this.classSelect;

    // auto scroll
    var offset = element.offsetTop;
    var offsetWithHeight = offset + element.clientHeight;

    if (this.suggestArea.scrollTop > offset) {
      this.suggestArea.scrollTop = offset
    } else if (this.suggestArea.scrollTop + this.suggestArea.clientHeight < offsetWithHeight) {
      this.suggestArea.scrollTop = offsetWithHeight - this.suggestArea.clientHeight;
    }
  },

  setStyleUnactive: function(element) {
    element.className = '';
  },

  setStyleMouseOver: function(element) {
    element.className = this.classMouseOver;
  },

  moveEnd: function() {

    if (this.input.createTextRange) {
      this.input.focus(); // Opera
      var range = this.input.createTextRange();
      range.move('character', this.input.value.length);
      range.select();
    } else if (this.input.setSelectionRange) {
      this.input.setSelectionRange(this.input.value.length, this.input.value.length);
    }
  },

  // Utils
  _getElement: function(element) {
    return (typeof element == 'string') ? document.getElementById(element) : element;
  },
  _addEvent: (window.addEventListener ?
    function(element, type, func) {
      element.addEventListener(type, func, false);
    } :
    function(element, type, func) {
      element.attachEvent('on' + type, func);
    }),
  _stopEvent: function(event) {
    if (event.preventDefault) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.returnValue = false;
      event.cancelBubble = true;
    }
  },
  _getEventElement: function(event) {
    return event.target || event.srcElement;
  },
  _bind: function(func) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    return function(){ func.apply(self, args); };
  },
  _bindEvent: function(func) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    return function(event){ event = event || window.event; func.apply(self, [event].concat(args)); };
  },
  _escapeHTML: function(value) {
    return value.replace(/\&/g, '&amp;').replace( /</g, '&lt;').replace(/>/g, '&gt;')
             .replace(/\"/g, '&quot;').replace(/\'/g, '&#39;');
  }
};

/*-- Suggest.LocalMulti ---------------------------------*/
Suggest.LocalMulti = function() {
  this.initialize.apply(this, arguments);
};
Suggest.copyProperties(Suggest.LocalMulti.prototype, Suggest.Local.prototype);

Suggest.LocalMulti.prototype.delim = ' '; // delimiter

Suggest.LocalMulti.prototype.keyEventReturn = function() {

  this.clearSuggestArea();
  this.input.value += this.delim;
  this.moveEnd();
};

Suggest.LocalMulti.prototype.keyEventOther = function(event) {

  if (event.keyCode == Suggest.Key.TAB) {
    // fix
    if (this.suggestList && this.suggestList.length != 0) {
      this._stopEvent(event);

      if (!this.activePosition) {
        this.activePosition = 0;
        this.changeActive(this.activePosition);
      }

      this.clearSuggestArea();
      this.input.value += this.delim;
      if (window.opera) {
        setTimeout(this._bind(this.moveEnd), 5);
      } else {
        this.moveEnd();
      }
    }
  }
};

Suggest.LocalMulti.prototype.listClick = function(event, index) {

  this.changeUnactive();
  this.activePosition = index;
  this.changeActive(index);

  this.input.value += this.delim;

  this.clearSuggestArea();
  this.moveEnd();
};

Suggest.LocalMulti.prototype.getInputText = function() {

  var pos = this.getLastTokenPos();

  if (pos == -1) {
    return this.input.value;
  } else {
    return this.input.value.substr(pos + 1);
  }
};

Suggest.LocalMulti.prototype.setInputText = function(text) {

  var pos = this.getLastTokenPos();

  if (pos == -1) {
    this.input.value = text;
  } else {
    this.input.value = this.input.value.substr(0 , pos + 1) + text;
  }
};

Suggest.LocalMulti.prototype.getLastTokenPos = function() {
  return this.input.value.lastIndexOf(this.delim);
};

function getSuggest(keyworddata)
{
	//全角チェチE
	//keyworddata = keyworddata.replace(/　/g, " ");
	var zenkakuFlg = 0;
	for(var i=0; i<keyworddata.length; i++)
	{
		if(iszenkaku(keyworddata.charAt(i)) == true)
		{
			zenkakuFlg = 1;
			break;
		}
	}
	//半角縺E場蜷 
	if(zenkakuFlg == 0)
	{
		return;
	}

	var url = 'http://www.google.com/complete/search?hl=ja&q='+keyworddata+'&output=toolbar';
	//new Ajax.Request( url ,{ method: 'get',  onComplete: parseSuggest } );
	GM_xmlhttpRequest({ method : 'GET', url : url, onload : parseSuggest });
}

function parseSuggest(val)
{
	var data = val.responseText;

	var keyObj = document.getElementById('twotabsearchtextbox');
	var position = cumulativeOffset(keyObj);
	document.getElementById('popSuggest').style.backgroundColor =  "white";
	document.getElementById('popSuggest').style.left =  position[0] + "px";
	document.getElementById('popSuggest').style.top = position[1] + 23 + "px";

	//parse data
	var keyList = [];
	var startpos = 0;
	var endpos = 0;
	var index = 0;
	while(startpos != -1)
	{
		startpos = data.indexOf("suggestion data", startpos);
		if(startpos == -1)
		{
			continue;
		}
		startpos = data.indexOf("=", startpos) + 2;
		endpos = data.indexOf("\"", startpos);
		var keyword = data.substring(startpos, endpos);
		keyList[index] = keyword;
		index++;
	}
	suggestObj.candidateList = keyList;
	suggestObj.search();
}

/* ---------------- translate data ---------------- */
//search list
var transList = new Array();
transList["All Departments"]				= "すべてのカテゴリー";
transList["Amazon Instant Video"]			= "Amazonインスタントビデオ";
transList["Appliances"]						= "家電";
transList["Apps for Android"]				= "Android用アプリ";
transList["Arts, Crafts &amp; Sewing"]		= "アート、工芸＆裁縫";
transList["Automotive"]						= "自動車";
transList["Baby"]							= "ベビー";
transList["Beauty"]							= "ビューティー";
transList["Books"]							= "本";
transList["Cell Phones &amp; Accessories"]	= "携帯電話、アクセサリ";
transList["Clothing &amp; Accessories"]		= "服＆ファッション小物";
transList["Computers"]						= "コンピュータ";
transList["Electronics"]					= "エレクトロニクス";
transList["Gift Cards Store"]				= "ギフトカード";
transList["Gift Cards"]						= "ギフトカード";
transList["Grocery &amp; Gourmet Food"]		= "食料品＆グルメフード";
transList["Health &amp; Personal Care"]		= "健康＆医療";
transList["Home &amp; Kitchen"]				= "ホーム＆キッチン";
transList["Industrial &amp; Scientific"]	= "スポーツ＆アウトドア";
transList["Jewelry"]						= "ジュエリー";
transList["Kindle Store"]					= "Kindleストア";
transList["Magazine Subscriptions"]			= "雑誌";
transList["Movies &amp; TV"]				= "映画＆テレビ";
transList["MP3 Downloads"]					= "MP3ダウンロード";
transList["Musical Instruments"]			= "楽器";
transList["MP3 Music"]						= "MP3";
transList["Music"]							= "音楽";
transList["Office Products"]				= "Office製品";
transList["Patio, Lawn &amp; Garden"]		= "中庭、芝生＆庭";
transList["Pet Supplies"]					= "ペット用品";
transList["Shoes"]							= "靴";
transList["Software"]						= "ソフトウェア";
transList["Sports &amp; Outdoors"]			= "スポーツ＆アウトドア";
transList["Tools &amp; Home Improvement"]	= "ツール＆ホーム";
transList["Toys &amp; Games"]				= "おもちゃ＆ゲーム";
transList["Video Games"]					= "TVゲーム";
transList["Watches"]						= "時計";
transList["Collectibles"]					= "グッズ";
transList["Credit Cards"]					= "クレジットカード";
transList["MP3 Music"]						= "MP3";

//Menu List
var transListNew2 = new Array();
transListNew2["Unlimited Instant Videos"]			= "インスタントビデオ";
transListNew2["Kindle"]								= "Kindle";
transListNew2["Digital Games &amp; Software"]		= "ゲーム＆ソフトウェア";
transListNew2["Audible Audiobooks"]					= "オーディオブック";
transListNew2["Books"]								= "本";
transListNew2["Movies, Music &amp; Games"]			= "映画、音楽＆ゲーム";
transListNew2["Electronics &amp; Computers"]		= "エレクトロニクス コンピュータ";
transListNew2["Home, Garden &amp; Tools"]			= "ホーム＆キッチンツール";
transListNew2["Home, Garden &amp; Pets"]			= "ホーム＆ペット";
transListNew2["Tools, Home Improvement"]			= "ツール、家の修繕";
transListNew2["Grocery, Health &amp; Beauty"]		= "食料品、健康＆美容";
transListNew2["Toys, Kids &amp; Baby"]				= "おもちゃ、キッズ＆ベビー";
transListNew2["Clothing, Shoes &amp; Jewelry"]		= "衣類、靴、ジュエリー";
transListNew2["Sports &amp; Outdoors"]				= "スポーツ＆アウトドア";
transListNew2["Automotive &amp; Industrial"]		= "自動車";
transListNew2["MP3s &amp; Cloud Player"]			= "MP3 クラウドプレイヤー";
transListNew2["Amazon Cloud Drive"]					= "Amazon クラウドドライブ";
transListNew2["Appstore for Android"]				= "Android用アプリストア";
transListNew2["Electronics"]						= "エレクトロニクス";
transListNew2["Computers"]							= "コンピュータ";
transListNew2["MP3s &amp; Cloud Player<div class=\"nav_tag\">20 million songs, play anywhere</div>"]	= "MP3 クラウドプレイヤー<div class=\"nav_tag\">18 million songs, play anywhere</div>";
transListNew2["Amazon Cloud Drive<div class=\"nav_tag\">5 GB of free storage</div>"]	= "Amazon クラウドドライブ<div class=\"nav_tag\">5 GB of free storage</div>";
transListNew2["Appstore for Android<div class=\"nav_tag\">Get Velocispider for free today</div>"]	= "Android用アプリストア<div class=\"nav_tag\">Get Velocispider for free today</div>";
transListNew2["Automotive"]							= "自動車";
transListNew2["Industrial &amp; Scientific"]		= "工業関連";

//Menu List(child)
var transListNew3 = new Array();
transListNew3["Prime Instant Videos"]					= "インスタントビデオ";
transListNew3["Learn More About Amazon Prime"]			= "Amazonプライムの詳細";
transListNew3["Amazon Instant Video Store"]				= "Amazonインスタントビデオストア";
transListNew3["Your Video Library"]						= "あなたのビデオライブラリ";
transListNew3["Watch Anywhere"]							= "様々な場所で見る";
transListNew3["Watch On Your TV"]						= "お使いのテレビで見る";
transListNew3["MP3 Music Store"]						= "MP3ミュージックストア";
transListNew3["Music on Kindle Fire"]					= "Kindle用ミュージック";
transListNew3["Cloud Player for Web"]					= "Web用のクラウドプレイヤー";
transListNew3["Cloud Player for Android"]				= "Android用クラウドプレイヤー";
transListNew3["Cloud Drive Photos for iPhone"]			= "iPhoneの写真用クラウドドライプ";
transListNew3["Amazon MP3 for Mobile"]					= "モバイル用AmazonMP3";
transListNew3["Your Cloud Drive"]						= "クラウドドライブ";
transListNew3["Learn More About Cloud Drive"]			= "クラウドドライブの詳細";
transListNew3["Accessories"]							= "アクセサリー";
transListNew3["Kindle Owners' Lending Library"]			= "Kindle オーナーズ貸出ライブラリ";
transListNew3["Kindle Cloud Reader"]					= "Kindleクラウドリーダー";
transListNew3["Free Kindle Reading Apps"]				= "無料のKndleアプリ";
transListNew3["Kindle E-reader Accessories"]			= "Kindle E-reader アクセサリ";
transListNew3["Kindle Fire Accessories"]				= "Kindle Fire アクセサリ";
transListNew3["Kindle Books"]							= "Kindleブック";
transListNew3["Newsstand"]								= "ニューススタンド";
transListNew3["Kindle Store"]							= "Kindleストア";
transListNew3["Manage Your Kindle"]						= "あなたのKindleを管理";
transListNew3["Apps"]									= "アプリ";
transListNew3["Games"]									= "ゲーム";
transListNew3["Test Drive Apps"]						= "テストドライブアプリ";
transListNew3["Amazon Apps"]							= "Amazonアプリ";
transListNew3["Your Apps and Devices"]					= "あなたのアプリとデバイス";
transListNew3["Game Downloads"]							= "ゲームのダウンロード";
transListNew3["Free-to-Play Games"]						= "フリーゲーム";
transListNew3["Software Downloads"]						= "ソフトウェアのダウンロード";
transListNew3["Your Games &amp; Software Library"]		= "あなたのゲーム＆ソフトウェア·ライブラリ";
transListNew3["Audible Membership"]						= "会員";
transListNew3["Audible Audiobooks &amp; More"]			= "オーディオブック＆詳細情報";
transListNew3["Bestsellers"]							= "ベストセラー";
transListNew3["New &amp; Notable"]						= "注目";
transListNew3["Listener Favorites"]						= "リスナーのお気に入り";
transListNew3["Whispersync for Voice"]					= "Whispersync for Voice";
transListNew3["Books"]									= "本";
transListNew3["Kindle Books"]							= "Kindleブック";
transListNew3["Children's Books"]						= "子供の本";
transListNew3["Textbooks"]								= "教科書";
transListNew3["Audiobooks"]								= "オーディオブック";
transListNew3["Magazines"]								= "雑誌";
transListNew3["Movies &amp; TV"]						= "映画＆テレビ";
transListNew3["Blu-ray"]								= "ブルーレイ";
transListNew3["Amazon Instant Video"]					= "Amazonインスタントビデオ";
transListNew3["MP3 Downloads"]							= "MP3ダウンロード";
transListNew3["Musical Instruments"]					= "楽器";
transListNew3["Music"]									= "音楽";
transListNew3["Video Games"]							= "TVゲーム";
transListNew3["Entertainment Collectibles"]				= "エンターテイメントグッズ";
transListNew3["Game Downloads"]							= "ゲーム ダウンロード";
transListNew3["TV &amp; Video"]							= "テレビ＆ビデオ";
transListNew3["Home Audio &amp; Theater"]				= "ホームオーディオ＆シアター";
transListNew3["Camera, Photo &amp; Video"]				= "カメラ、写真＆ビデオ";
transListNew3["Cell Phones &amp; Accessories"]			= "携帯電話アクセサリ";
transListNew3["Video Games"]							= "TVゲーム";
transListNew3["MP3 Players &amp; Accessories"]			= "MP3プレーヤー＆アクセサリー";
transListNew3["Car Electronics &amp; GPS"]				= "カーエレクトロニクス＆GPS";
transListNew3["Appliances"]								= "家電";
transListNew3["Musical Instruments"]					= "楽器";
transListNew3["Electronics Accessories"]				= "アクセサリ";
transListNew3[" Laptops, Ultrabooks &amp; Tablets"]		= "ノートPC＆タブレット";
transListNew3["Laptops, Tablets &amp; Netbooks"]		= "ラップトップ、タブレット＆ワークステーション";
transListNew3["Desktops &amp; Servers"]					= "デスクトップ＆サーバ";
transListNew3["Computer Accessories &amp; Peripherals"]	= "コンピュータアクセサリー＆周辺機器";
transListNew3["Computer Parts &amp; Components"]		= "コンピュータパーツ＆コンポーネント";
transListNew3["Software"]								= "ソフトウェア";
transListNew3["PC Games"]								= "PCゲーム";
transListNew3["Printers &amp; Ink"]						= "プリンタ＆インク";
transListNew3["Office &amp; School Supplies"]			= "オフィス＆スクール用品";
transListNew3["Kitchen &amp; Dining"]					= "キッチン＆ダイニング";
transListNew3["Furniture &amp; Décor"]					= "家具＆インテリア";
transListNew3["Bedding &amp; Bath"]						= "ベッド＆バス";
transListNew3["Appliances"]								= "家電";
transListNew3["Patio, Lawn &amp; Garden"]				= "中庭、芝生＆庭";
transListNew3["Home Improvement"]						= "ホーム";
transListNew3["Power &amp; Hand Tools"]					= "パワー＆ハンドツール";
transListNew3["Lamps &amp; Light Fixtures"]				= "ランプ·照明器具";
transListNew3["Kitchen &amp; Bath Fixtures"]			= "キッチン＆バス備品";
transListNew3["Hardware"]								= "ハードウェア";
transListNew3["Building Supplies"]						= "建設資材";
transListNew3["Arts, Crafts &amp; Sewing"]				= "アート、工芸＆裁縫";
transListNew3["Pet Supplies"]							= "ペット用品";
transListNew3["Grocery &amp; Gourmet Food"]				= "食料品＆グルメフード";
transListNew3["Natural &amp; Organic"]					= "ナチュラル＆オーガニック";
transListNew3["Wine"]									= "ワイン";
transListNew3["Health &amp; Personal Care"]				= "健康＆医療";
transListNew3["Beauty"]									= "美容";
transListNew3["Toys &amp; Games"]						= "おもちゃ＆ゲーム";
transListNew3["Baby"]									= "ベビー";
transListNew3["Clothing (Kids &amp; Baby)"]				= "ファッション（キッズ＆ベビー）";
transListNew3["Kids' Clothing"]							= "ファッション（キッズ）";
transListNew3["Baby Clothing"]							= "ファッション（ベビー）";
transListNew3["Video Games for Kids"]					= "子供のTVゲーム";
transListNew3["Amazon Mom"]								= "Amazonママ";
transListNew3["Baby Registry"]							= "Amazonベビーレジストリ";
transListNew3["Clothing"]								= "衣類";
transListNew3["Shoes"]									= "靴";
transListNew3["Handbags"]								= "ハンドバッグ";
transListNew3["Accessories"]							= "アクセサリー";
transListNew3["Luggage"]								= "かばん";
transListNew3["Jewelry"]								= "ジュエリー";
transListNew3["Watches"]								= "時計";
transListNew3["Exercise &amp; Fitness"]					= "エクササイズ＆フィットネス";
transListNew3["Outdoor Recreation"]						= "アウトドア";
transListNew3["Hunting &amp; Fishing"]					= "狩り＆釣り";
transListNew3["Cycling"]								= "サイクリング";
transListNew3["Athletic &amp; Outdoor Clothing"]		= "アスレチック＆アウトドア服";
transListNew3["Team Sports"]							= "チームスポーツ";
transListNew3["Bikes &amp; Scooters"]					= "バイク＆スクーター";
transListNew3["Golf"]									= "ゴルフ";
transListNew3["Boating &amp; Water Sports"]				= "ボート＆ウォータースポーツ";
transListNew3["Fan Shop"]								= "ファンショップ";
transListNew3["Sports Collectibles"]					= "スポーツグッズ";
transListNew3["All Sports &amp; Outdoors"]				= "すべてのスポーツ＆アウトドア";
transListNew3["Automotive Parts &amp; Accessories"]		= "自動車部品＆アクセサリー";
transListNew3["Automotive Tools &amp; Equipment"]		= "自動車用ツール＆機器";
transListNew3["Car Electronics &amp; GPS"]				= "カーエレクトロニクス＆GPS";
transListNew3["Tires &amp; Wheels"]						= "タイヤ＆ホイール";
transListNew3["Motorcycle &amp; ATV"]					= "オートバイATV";
transListNew3["Industrial &amp; Scientific"]			= "スポーツ＆アウトドア";
transListNew3["Full Store Directory"]					= "フルストアディレクトリ";
transListNew3["Your Watchlist"]							= "あなたのウォッチリスト";
transListNew3["Cloud Player for iOS"]					= "iOS用クラウドプレイヤー";
transListNew3["Cloud Player for Home"]					= "Home用クラウドプレイヤー";
transListNew3["Get the Desktop App"]					= "デスクトップアプリを取得";
transListNew3["Get the Desktop App"]					= "デスクトップアプリを取得";
transListNew3["Cloud Drive Photos for Android"]			= "Android用クラウドの写真";
transListNew3["Industrial Supplies"]					= "産業用品";
transListNew3["Lab &amp; Scientific"]					= "研究関連";
transListNew3["Janitorial"]								= "清掃用品";
transListNew3["Safety"]									= "安全用品";
transListNew3["Janitorial &amp; Sanitation Supplies"]	= "清掃＆衛生用品";
transListNew3["Occupational Health &amp; Safety"]		= "健康＆安全";
transListNew3["Desktops &amp; Monitors"]				= "デスクトップ＆ディスプレイ";

var w = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
var baseASIN;


//get cur price
function getCurPrice()
{
	//save price
	var priceObj = document.getElementById("priceBlock");
	if(priceObj)
	{
		var listObj = priceObj.getElementsByTagName("b");
		for(var i=0; i<listObj.length; i++)
		{
			var className = listObj[i].getAttribute("class");
			if(className == "priceLarge")
			{
				var curPrice = listObj[i].innerHTML;
				if(curPrice.indexOf('円') == -1)
				{
					return curPrice;
				}
				break;
			}
		}
	}
	//フォーマットが異なる画面
	if(document.getElementById("addToCart"))
	{
		var priceObj = document.getElementById("price");
		var listObj = priceObj.getElementsByTagName("span");
		for(var i=0; i<listObj.length; i++)
		{
			var curPrice = listObj[i].innerHTML;
			if(curPrice.indexOf('$') != -1 && curPrice.indexOf('円') == -1)
			{
				return curPrice;
			}
			break;
		}
	}

	return "none";
}

//get date
function getCurDate()
{
	var curDate = new Date();
	var year = curDate.getFullYear();
	var month = curDate.getMonth() + 1;
	var day = curDate.getDate();

	return year+'/'+month+'/'+day;
}

//get price
function getPrice()
{
	var savePrice = GM_getValue('savePrice', 'none');
	var curDate = getCurDate();
	var saveDate = GM_getValue('saveDate', curDate);

	if(savePrice != 'none' && curDate == saveDate && isNaN(savePrice) == false)
	{
		writePrice(parseFloat(savePrice));
	}
	else
	{
		//get FX Rate USD/JPY
		var script = document.createElement('script');
		script.type = "text/javascript";
		script.charset = "UTF-8"; 
		script.src = 'http://www.yasui-kamo.com/cgi/getPrice_jsonp.cgi?callback=getUSDJPY&country=us';
		document.body.appendChild(script);
	}
}

//write price
function writePrice(money)
{
	var priceObj = document.getElementById("priceBlock");
	if(priceObj)
	{
		var listObj = priceObj.getElementsByTagName("b");
		for(var i=0; i<listObj.length; i++)
		{
			var className = listObj[i].getAttribute("class");
			if(className == "priceLarge")
			{
				var curPrice = listObj[i].innerHTML;
				if(curPrice.indexOf('円') == -1 && curPrice.indexOf('-') == -1)
				{
					var usdPrice = curPrice.replace('$', '');
					usdPrice = usdPrice.replace(',', '');
					if(curPrice == "FREE") { usdPrice = "0"; }
					var jpyPrice = parseInt(usdPrice * money);
					listObj[i].innerHTML = curPrice+"("+jpyPrice+"円)";
					return;
				}
			}
		}
	}
	//フォーマットが異なる画面
	if(document.getElementById("addToCart"))
	{
		var priceObj = document.getElementById("price");
		var listObj = priceObj.getElementsByTagName("span");
		for(var i=0; i<listObj.length; i++)
		{
			var curPrice = listObj[i].innerHTML;
			if(curPrice.indexOf('$') != -1 && curPrice.indexOf('円') == -1 && curPrice.indexOf('-') == -1)
			{
				var usdPrice = curPrice.replace('$', '');
				usdPrice = usdPrice.replace(',', '');
				var jpyPrice = parseInt(usdPrice * money);
				listObj[i].innerHTML = curPrice+"("+jpyPrice+"円)";
				return;
			}
		}
	}
}

//callback money from jsonp
w.getUSDJPY = function(money){
	window.setTimeout(function(){GM_setValue('savePrice', money.toString());}, 0);
	window.setTimeout(function(){GM_setValue('saveDate', getCurDate());}, 0);
	writePrice(money);
};

//全角ならtrueを返す
function iszenkaku(c)
{
	var str = escape(c);
	
	if(str.charAt(0) != "%")
		return false;
	if(str.charAt(1) == "u")
		return true;
	else
		return false;
}

//translate keyword
function submitChange(event)
{
	//cancel event;
	event.preventDefault();

	//get form obj
	var listObj = document.getElementsByTagName('form');
	var formObj;
	for(var i=0; i< listObj.length; i++) {
		if(listObj[i].name == "site-search") {
			formObj = listObj[i];
		}
	}

	//translate key & submit
	var key = document.getElementById('twotabsearchtextbox').value;

	key = key.replace(/　/g, " ");

	//全角チェック
	var zenkakuFlg = 0;
	for(var i=0; i<key.length; i++)
	{
		if(iszenkaku(key.charAt(i)) == true)
		{
			zenkakuFlg = 1;
			break;
		}
	}

	//半角の場合
	if(zenkakuFlg == 0)
	{
		if(document.getElementById("ags_param_tag"))
		{
			document.getElementById("ags_param_tag").innerHTML = "";
		}
		document.getElementById('twotabsearchtextbox').value = key;
		formObj.submit();
		return;
	}

	var encstr = encodeURI(key);
	var url = 'http://translate.google.com/translate_t?ie=UTF-8&hl=ja&oe=UTF-8&langpair=ja|en&gtrans=&text='+encstr;
	GM_xmlhttpRequest({
		method : 'GET',
		url : url,
		onload : submitData
	});

	return;
}

//w.submitData = function(val){
function submitData(val)
{
	var data = val.responseText;
	var retdata = parseData(data);

	//get form obj
	var listObj = document.getElementsByTagName('form');
	var formObj;
	for(var i=0; i< listObj.length; i++) {
		if(listObj[i].name == "site-search") {
			formObj = listObj[i];
		}
	}

	document.getElementById('twotabsearchtextbox').value = retdata;
	formObj.submit();

	return;
}

function parseData(val)
{
	var startPos = val.indexOf("<span id=result_box") + 19;
	startPos = val.indexOf("backgroundColor=", startPos) + 16;
	startPos = val.indexOf(">", startPos) + 1;
	var endPos = val.indexOf("</span>", startPos);
	var keyword = val.substring(startPos, endPos);

	return keyword;
}

//get element position
function cumulativeOffset(element) {
	var valueT = 0, valueL = 0;
	do {
		valueT += element.offsetTop  || 0;
		valueL += element.offsetLeft || 0;
		element = element.offsetParent;
	} while (element);
	return [valueL, valueT];
}

//check key press
function checkKeyPress(event)
{
	//check ESC
	if(event.keyCode == 27)
	{
		document.getElementById('popSuggest').innerHTML = "";
	}
	//Enter
	else if(event.keyCode == 13)
	{
		submitChange(event);
	}
}

//translate menu
function translateCategory2()
{
	var value = GM_getValue('translateonoff', "on");
	if(value == "off")
	{
		return;
	}

	//translate search category
	var transListObj = document.getElementById("searchDropdownBox");
	var listObj = transListObj.getElementsByTagName('option');
	for(var i=0; i< listObj.length; i++) {
		var key = listObj[i].innerHTML;
		for (tranKey in transList) {
			if(key.indexOf(tranKey) != -1) {
				listObj[i].innerHTML = transList[tranKey];
				break;
			}
		}
	}

	//translate search menu and child menu
	//translate search menu
	var listObj = document.getElementsByClassName("nav_pop_li");
	for(var i=0; i< listObj.length; i++) {
		var key = listObj[i].innerHTML;
		for (tranKey in transListNew2) {
			if(key == tranKey) {
			//if(key.indexOf(tranKey) != -1) {
				listObj[i].innerHTML = transListNew2[tranKey];
				//listObj[i].innerHTML = key.replace(tranKey, transListNew2[tranKey]);
				break;
			}
		}
	}

	//translate search menu child
	var listObj = document.getElementsByClassName("nav_a");
	for(var i=0; i< listObj.length; i++) {
		var key = listObj[i].innerHTML;
		for (tranKey in transListNew3) {
			if(key == tranKey) {
				listObj[i].innerHTML = transListNew3[tranKey];
				break;
			}
		}
	}
}

//check select item
function checkSellerInfo()
{
	//display price
	var curPrice = getCurPrice();
	if(curPrice != "none")
	{
		getPrice();
	}

	setTimeout(checkSellerInfo, 1000);
}

function getASIN()
{
	var asin = "";
	if(document.getElementById('ASIN'))
	{
		asin = document.getElementById('ASIN').value;
	}
	else if(document.getElementById('addToCart'))
	{
	    var form = document.getElementById('addToCart');
	    asin = form.ASIN.value;
	}
	return asin;
}

function sendTensoPage()
{
	var url = "http://www.yasui-kamo.com/forward/?asin="+getASIN();
	window.open(url, url);
}

function sendShupinPage()
{
	var url = "http://www.yasui-kamo.com/shiprate/?asin="+getASIN();
	window.open(url, url);
}

function translateonoff()
{
	var value = GM_getValue('translateonoff', "on");
	if(value == "off")
	{
		window.setTimeout(function(){GM_setValue('translateonoff', "on");}, 0);
	}
	else
	{
		window.setTimeout(function(){GM_setValue('translateonoff', "off");}, 0);
	}
	location.href = location.href;
}

//main
(function(){
	//google translate api
	var listObj = document.getElementsByTagName('form');
	for(var i=0; i< listObj.length; i++)
	{
		if(listObj[i].name == "site-search")
		{
			//listObj[i].addEventListener("submit", function(){submitChange(arguments[0]);}, false);

			//keyword
			var keyObj = document.getElementById('twotabsearchtextbox');
			keyObj.addEventListener("keypress", function(){checkKeyPress(arguments[0])}, false);

			//Go button
			if(document.getElementById('navGoButton'))
			{
				var gobuttondivObj = document.getElementById('navGoButton');
				var submitObj = document.getElementsByClassName("input");
				submitObj[0].addEventListener("click", function(){submitChange(arguments[0]);}, false);
			}
			else
			{
				var submitObj = document.getElementsByClassName("nav-submit-input");
				submitObj[0].addEventListener("click", function(){submitChange(arguments[0]);}, false);
			}

			//create suggest area
			var suggetArea = document.createElement('div');
			suggetArea.id = "popSuggest";
			suggetArea.style.position = "absolute";
			suggetArea.style.zIndex = "1000";
			suggetArea.style.background = "white";
			var objBody = document.getElementsByTagName("body").item(0);
			objBody.appendChild(suggetArea);

			// add style
			var element = document.createElement('style');
			element.appendChild(document.createTextNode(''));
			document.getElementsByTagName('head')[0].appendChild(element);
			var sheet = element.sheet;
			sheet.insertRule("#popSuggest div.select{color: #FFFFFF;background-color: #3366FF;}", sheet.cssRules.length);
			sheet.insertRule("#popSuggest div.over{background-color: #99CCFF;}", sheet.cssRules.length);

			//suggest
			suggestObj = new Suggest.Local( "twotabsearchtextbox", "popSuggest", "");

			//add translate on/off
			//new design
			if(document.getElementById('nav-search-label'))
			{
				//start translate
				translateCategory2();
			}
			break;
		}
	}

	//check delivery
	if( document.getElementById('ASIN') || document.getElementById('addToCart'))
	{
		var loadArea = document.createElement('div');
		loadArea.style.border = "solid 1px #6DAEE1";
		loadArea.style.fontSize = "1.1em";
		loadArea.style.textAlign = "center";
		loadArea.style.verticalAlign = "middle";
		loadArea.style.borderRadius = "4px";
		loadArea.style.marginTop = "5px";

		if(document.getElementById('ASIN'))
		{
			var trObj = document.createElement('tr');
			var tdObj = document.createElement('td');
			var tableObj = document.getElementsByTagName("table");
			for(var i=0; i<tableObj.length; i++)
			{
				if(tableObj[i].className == "buyingDetailsGrid")
				{
					var tbodyObj = tableObj[i].getElementsByTagName("tbody").item(0);
					tbodyObj.appendChild(trObj);
					trObj.appendChild(tdObj);
					tdObj.appendChild(loadArea);
					break;
				}
			}
		}
		else if(document.getElementById('rightCol'))
		{
			document.getElementById('rightCol').appendChild(loadArea);
		}

		var displayData = "<div style=\"background-color:#D6E7F8; font-size:0.8em; font-weight:bold; height:24px;\">送料を確認</div>";
		var value = GM_getValue('translateonoff', "on");
		if(value == "on")
		{
			displayData += "<div style=\" height:24px;\"><a id='translateonoff' style=\"text-decoration: underline; color:red;\" href=\"javascript:void(0);\" title=\"クリックでメニュー翻訳のON/OFF切り替え\">翻訳:ON</a></div>";
		}
		else
		{
			displayData += "<div style=\" height:24px;\"><a id='translateonoff' style=\"text-decoration: underline; color:grey;\" href=\"javascript:void(0);\" title=\"クリックでメニュー翻訳のON/OFF切り替え\">翻訳:OFF</a></div>";
		}
		displayData += "<div style=\" height:24px;\"><a id='tenso' style=\"text-decoration: underline;\" href=\"javascript:void(0);\" >転送サービスの送料を確認</a></div>";
		displayData += "<div style=\" height:24px;\"><a id='shupin' style=\"text-decoration: underline;\" href=\"javascript:void(0);\" >出品者の送料を確認</a></div>";
		loadArea.innerHTML = displayData;
		document.getElementById("tenso").addEventListener("click", sendTensoPage, false);
		document.getElementById("shupin").addEventListener("click", sendShupinPage, false);
		document.getElementById("translateonoff").addEventListener("click", translateonoff, false);

		checkSellerInfo();
	}
}
)();
