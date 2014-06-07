// ==UserScript==
// @name           filter for Hatena::Bookmark
// @author         rikuo
// @namespace      http://d.hatena.ne.jp/rikuo/
// @include        http://b.hatena.ne.jp/hotentry*
// @include        http://b.hatena.ne.jp/entrylist*
// @include        http://b.hatena.ne.jp/news
// @include        http://b.hatena.ne.jp/*/favorite*
// @include        http://b.hatena.ne.jp/*/starfriends*
// @include        http://b.hatena.ne.jp/*/group*
// @exclude        http://b.hatena.ne.jp/video*
// @exclude        http://b.hatena.ne.jp/entry/*
// @exclude        http://b.hatena.ne.jp/entry?*
// ==/UserScript==
// origin 
// -http://anond.hatelabo.jp/20080302214727
// --http://anond.hatelabo.jp/20080102122736
// --http://anond.hatelabo.jp/20080302214727
// --http://anond.hatelabo.jp/20080308200619

(function(){

  var filters = [],url = [],xpath = [];

//-------------------------------------------------------------------//

  // フィルターの設定の仕方について
  // ◆正規表現が使えます 例: /これは(ひどい|すごい|えがい)/
  // ◆普通の文字列もＯＫ 例: 'http://example.com/'
  // 設定した文字列と合致した場合、そのエントリーを非表示 / 薄く表示 / 強調させることができます


  // タイトルの文字列についての設定
  filters.title = [
//	/gigazine/i,	//など

  ];


  // タグについての設定
  filters.tag = [
//	/これは(ひどい|えがい)/,
//	/neta|ネタ/i,

  ];


  // 概要部分についての設定
  filters.summary = [
//	/hoge/,

  ];

  // 上述のタイトル、タグ、概要のどれかに一つに合致すればいいという設定
  // 曖昧な条件で絞り込みたいときには便利ですが、基本的に個別で設定した方が動作が速くなります。
  filters.all = [
//	/hoge/,'foo','bar',	// など

  ];


  // エントリーのURLについての設定
  url = [
//	/http:\/\/(foo|bar|baz)\.com\//,	//
//	'http://hoge.com',			// エスケープが面倒なら、このように書いてもOK

  ];


  // これは上級者向け、XPathで条件指定も出来ます(注目・人気エントリー用)
  xpath.hotentry = [
//	例:カテゴリーが「コンピュータ・IT」の場合
//	'descendant::li[@class="category"]/a[starts-with(@href,"/hotentry/it")]',
//	例:タグ「foo」が付いていて、且つタグ「bar」もついている場合
//	'descendant::li[@class="tags" and child::a[contains(text(),"foo")] and child::a[contains(text(),"bar")]]',


  ];
  // お気に入りページ用のXPath
  xpath.favorite = [
  ];



  // 透明具合の設定：0～1 までの間の数値を設定して下さい
  var alpha = '0.5';








//-------------------------------------------------------------------//
  var _doc = document,count=1;
  var showhide = GM_getValue( 'mode', 1);
  var btnText = ['非表示','希薄化','強調']
  var chk,list,hotxpath,entrylist,xpathitem,linkxpath,setcss;

  if(location.href.match(/^http:\/\/b.hatena.ne.jp\/[a-zA-Z][\w-_]{1,30}[a-zA-Z0-9]\/(favorite|group|starfriends)/)){
    chk = 'favorite';
    list = makexpath(_doc,'descendant::div[@class="main"]').snapshotItem(0);
    hotxpath = 'ul[contains(concat(" ",@class," "),"bookmarked_user")][';
    entrylist = 'li[not(contains(concat(" ",@class," "),"chk_entry"))][../@class="bookmarked_user"]';
    xpathitem = {
      'all':'h3[@class="entry"]/a[1]/text()|descendant::span[@class="tags"]/a[@class="user-tag"]/text()',
      'title':'h3[@class="entry"]/a[1]/text()',
      'tag':'descendant::span[@class="tags"]/a[@class="user-tag"]/text()',
      'summary':''
    };
    linkxpath = 'h3[@class="entry"]/a[1]/@href';
    setcss = {
      'alpha':'li.chk_entry h3{font-weight: normal}',
      'highlight':'li.chk_entry h3{background-color: #fff8c5;font-weight: bold}li.chk_entry h3 a.domain{font-weight: normal}',
    };

  }else{

    chk = 'hotentry';
    list= e('main');
    hotxpath= 'div[contains(concat(" ",@class," "),"curvebox-body")]/descendant::ul[contains(concat(" ",@class," "),"hotentry")][';
    entrylist= 'li[not(contains(concat(" ",@class," "),"chk_entry"))][../@class="hotentry"]';
    xpathitem= {
      'all':'div/h3/a[1]/@title|div/ul[@class="entry-info"]/li[@class="tags"]/a[@class="tag"]/text()|div/blockquote/text()',
      'title':'div/h3/a[1]/@title',
      'tag':'div/ul[@class="entry-info"]/li[@class="tags"]/a[@class="tag"]/text()',
      'summary':'div/blockquote/text()'
    };
    linkxpath= 'div/h3/a[1]/@href';
    setcss= {
      'alpha':'li.chk_entry div blockquote{color: #555;}li.chk_entry h3{font-weight: normal}li.chk_entry h3 a,li.chk_entry li.tags a{color: #008400;}li.chk_entry h3 span.domain a,li.chk_entry li.category a,li.chk_entry blockquote a{color: #999;}',
      'highlight':'li.chk_entry{background-color: #fff8c5;}li.chk_entry div blockquote{color: #222;}li.chk_entry h3{font-weight: bold;}li.chk_entry h3 span.domain{font-weight: normal;}li.chk_entry h3 a{color: #00d;}li.chk_entry li.tags a{color: #008000;}li.chk_entry h3 span.domain a,li.chk_entry li.category a,li.chk_entry blockquote a{color: #999;}',
    };

  }

  setBtn();
  checkRegExp();
  addCss();
  filter();

  function setBtn(){
    var head = e('navigation');
    var ul = makexpath(head,'ul').snapshotItem(0),li = c('li');
    var df = document.createDocumentFragment();
    df.appendChild(li);
    var btn = c('a');
    btn.id = 'entryshowhidebtn';
    GM_addStyle(<><![CDATA[
      #entryshowhidebtn{
        border: 1px solid #ddd;
        padding: 3px 3px 2px 3px;
        cursor: pointer;
      }
      #hidenum{
        color: #fff;
      }
    ]]></>);
    btn.textContent = btnText[showhide];
    btn.addEventListener('click',chengeShowHide,false);
    df.firstChild.appendChild(btn);
    var span = c('span');
    span.id = 'hidenum';
    span.textContent = ':0';
    df.firstChild.firstChild.appendChild(span);
    ul.insertBefore(df ,ul.firstChild);
  }

  function chengeShowHide(){
    if(showhide == 2){
      showhide=0;
    }else if(showhide == 1){
      ++showhide;
    }else{
      ++showhide;
    }
    addCss();
    GM_setValue('mode', showhide);
    e('entryshowhidebtn').firstChild.nodeValue = btnText[showhide];
  }


  function e(id) {
    return _doc.getElementById(id);
  }

  function c(tag_name) {
    return _doc.createElement(tag_name);
  }

  function addchk(node){
    node.className = 'chk_entry';
  }

  function filter(){
    var hotentrylist = makexpath(list,hotxpath + count + ']').snapshotItem(0);

    for(var a in filters){
      var hotentry = makexpath(hotentrylist,entrylist);
      if(filters[a].length && xpathitem[a]){
        for(var i=0,h=hotentry.snapshotLength; i<h; ++i){
          var entry = makexpath(hotentry.snapshotItem(i),xpathitem[a]);
          for(var j=0,e=entry.snapshotLength; j<e; ++j){
            for(var k=0,f=filters[a].length; k<f ; ++k){
              if( entry.snapshotItem(j).textContent.match(filters[a][k])){
                addchk(hotentry.snapshotItem(i));
                break;
              }
            }
          }
        }
      }
    }

    if(url.length){
      var hotentry = makexpath(hotentrylist,entrylist);
      for(var i=0,h=hotentry.snapshotLength; i<h; ++i){
        var node = makexpath(hotentry.snapshotItem(i),linkxpath),entryurl = node.snapshotItem(0);
        for(var j=0,u=url.length; j<u; ++j){
          if( entryurl.textContent.match(url[j]) ){
            addchk(hotentry.snapshotItem(i));
            break;
          }
        }
      }
    }

    if(xpath[chk].length){
      var hotentry = makexpath(hotentrylist,entrylist);
      for(var i=0,h=hotentry.snapshotLength; i<h; ++i){
        for(var j=0,x=xpath[chk].length; j<x; ++j){
          var xpathchk = makexpath(hotentry.snapshotItem(i),xpath[chk][j]);
          if(xpathchk.snapshotLength){
            addchk(hotentry.snapshotItem(i));
            break;
          }
        }
      }
    }

    var num = makexpath(list,'descendant::li[contains(concat(" ",@class," "),"chk_entry")]').snapshotLength;
    _doc.getElementById('hidenum').firstChild.nodeValue = ':'+num;
    ++count
  }

  function makexpath(context, query){
    return _doc.evaluate(
      query, context, null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
    )
  }

  function checkRegExp(){
    for(var i in filters){
      if(filters[i].length){
        for(var j=0,f=filters[i].length; j<f ; ++j){
          var type = typeof filters[i][j];
          if( type == 'string') filters[i][j] = _r(filters[i][j]);
        }
      }
    }
    for(var i,u=url.length; i<u; ++i){
      var type = typeof url[i];
      if( type == 'string') url[i] = _r(url[i]);
    }
  }


  function _r(str) {
    var r = new RegExp( (str + '').replace(/([\/()[\]{}|*+-.,^$?\\])/g, "\\$1") , 'i');
    return r;
  }

  function addCss(){
    if(showhide == 1){
      GM_addStyle('li.chk_entry{display: list-item; -moz-opacity:' + alpha + ';}' + setcss["alpha"]);
    }else if(showhide == 2){
      GM_addStyle('li.chk_entry{display: list-item; -moz-opacity: 1;}'+setcss["highlight"]);
    }else{
      GM_addStyle('li.chk_entry{display: none; background-color: transparent;} li.chk_entry h3{background-color: transparent;}');
    }
  }

  function xpathgenURL(url){
    return 'descendant::h3[descendant::a[starts-with(@href,"'+url+'")]]'
  }

// cf. http://d.hatena.ne.jp/os0x/20081203/1228328040

	var autopager = unsafeWindow.Hatena.Bookmark.AutoPagerize.instance;
	if(autopager){
		autopager.oldAddEventListener('complete',function(){
			setTimeout(function(){
				filter();
			},10);
		});
	}

})();

