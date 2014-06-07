// ==UserScript==
// @name           HB Full title
// @namespace      http://d.hatena.ne.jp/rikuo/
// @include        http://b.hatena.ne.jp/hotentry*
// @include        http://b.hatena.ne.jp/entrylist*
// @include        http://b.hatena.ne.jp/news*
// @exclude        http://b.hatena.ne.jp/video*
// @exclude        http://b.hatena.ne.jp/entry/*
// @exclude        http://b.hatena.ne.jp/entry?*
// ==/UserScript==

(function(){

  var _doc = document,count=1,entrylist = e('main'),
  ul = 'descendant::ul[contains(concat(" ",@class," "),"hotentry")]',
  h3 = 'li/div/h3/a[1][substring(text(),string-length(text())-2)="..."]';

  fulltitle();

  function fulltitle(){
    var hotentry = makexpath(entrylist, ul + '[' + count + ']').snapshotItem(0);
    var entries = makexpath(hotentry, h3 );
    for(var i=0,e=entries.snapshotLength; i<e ; ++i){
      var text = entries.snapshotItem(i);
      text.firstChild.nodeValue = text.title;
    }
    ++count
  }


  function e(id) {
    return _doc.getElementById(id);
  }

  function makexpath(context, query){
    return _doc.evaluate(
      query, context, null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
    )
  }


// cf. http://d.hatena.ne.jp/os0x/20081203/1228328040

  var autopager = unsafeWindow.Hatena.Bookmark.AutoPagerize.instance;
  if(autopager){
    autopager.oldAddEventListener('complete',function(){
      setTimeout(function(){
	fulltitle();
      },10);
    });
  }

})();

