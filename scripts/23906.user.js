// ==UserScript==
// @name          Google+SBM
// @namespace     http://wildlifesanctuary.blog38.fc2.com/
// @description   Show SBM count in Google search result
// @include       http://*.google.*/*q=*
// ==/UserScript==

// this script based on
// http://d.hatena.ne.jp/kusigahama/20051207#p1
// http://la.ma.la/blog/diary_200607281316.htm

/*
@2008-04-09
- rokuroxさんのガクガク対策で画像の高さを指定するようにした（http://d.hatena.ne.jp/rokurox/20080408）
- 画像のスタイルを各画像単位でなく纏めて指定するようにした
*/

(function() {

  const USE_AUTOPAGER = true;

  var sbms = [
    {
      label: "hatena",
      entry: "http://b.hatena.ne.jp/entry/",
      image: "http://b.hatena.ne.jp/entry/image/",
      imageHeight: "13px"
    },
    {
      label: "livedoor",
      entry: "http://clip.livedoor.com/page/",
      image: "http://image.clip.livedoor.com/counter/",
      imageHeight: "12px"
    },
    /*
    {
      label: "Yahoo",
      entry: "http://bookmarks.yahoo.co.jp/url/",
      image: "http://num.bookmarks.yahoo.co.jp/image/shortsmall/",
      imageHeight: "13px"
    }
    */
  ];

  function setBookmarkCounter(uri) {
    var a, img;
    var uri = uri.replace(/#/, '%23');
    var span = document.createElement("span");
    span.setAttribute("class", "sbm")
    
    for (var i = 0; i < sbms.length; i++) {
      var sbm = sbms[i];
      a = document.createElement("a");
      img = document.createElement("img");

      a.setAttribute("title", sbm.label);
      a.setAttribute("href", sbm.entry + uri);
      img.setAttribute('src', sbm.image + uri);
      img.style.maxHeight = sbm.imageHeight;
      //img.setAttribute('style', 'border:none;margin:0 2px;vertical-align:baseline;');

      a.appendChild(img);
      span.appendChild(a);
    }
    return span;
  }

  var load = function(context) {
    //Autopagerize
    if(!context){
      root = document;
    }else{
      root = context;
    } 
    var links = document.evaluate(
            '//a[@class="l"][not(following-sibling::span[@class="sbm"])]', root, null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
    if (!links.snapshotLength) return;
    for (var i = 0; i < links.snapshotLength; ++i) {
      var link = links.snapshotItem(i);
      var uri = link.href;
      link.parentNode.appendChild(setBookmarkCounter(uri));
    }
  }
  
  // for AutoPagerize
  function addFilter(filter, i) {
    i = i || 4
    if (window.AutoPagerize && window.AutoPagerize.addFilter) {
      //window.AutoPagerize.addFilter(filter);
      window.AutoPagerize.addFilter(function(elements) {
        for (var i = 0; i < elements.length; ++i)
          filter(elements[i]);
      });
    }
    else if (i > 1) {
      setTimeout(arguments.callee, 500, filter, i - 1)
    }
  }
  
  var style = document.createElement("style");
  style.type = "text/css";
  style.appendChild(document.createTextNode('span.sbm img {border:none;margin:0 2px;vertical-align:baseline;}'));
  document.getElementsByTagName('head')[0].appendChild(style);
  
  load();
  if (USE_AUTOPAGER) addFilter(load);
})();
