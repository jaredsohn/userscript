// ==UserScript==
// @name              Add To-Booklog Links
// @namespace         http://www.kagitaku.com/
// @description       Adds links to submit for Booklog beside Amazon links.
// @include           *
// @exclude           http*://*booklog.*
// @exclude           http*://*amazon.*
// @exclude           http*://*google.*
// @exclude           http*://*gmail.*
// @version           0.6
// ==/UserScript==

(function() {

//変数たち
var REGEXP_AMAZON  = new RegExp('http?:\/\/[^/]*?amazon\.', 'i');
var REGEXP_ASIN    = new RegExp('asin.([a-z0-9]{10})', 'i');
var REGEXP_DP      = new RegExp('\/dp\/([a-z0-9]{10})', 'i');
var REGEXP_BOOKLOG = new RegExp('booklog.jp', 'i');
var REGEXP_TAG     = new RegExp('<');
var BOOKLOG_URI    = 'http://booklog.jp/blet?s=';
var ICON_DATA      = 'data:image/x-icon;base64,'+ 
  'R0lGODlhEAAQALMAAEBAQDExMaClgOvibfqCnniad2mhsrJpj6/6gmmEsqh9UIqApQAAAAAAAAAA'+ 
  'AAAAACH5BAAAAAAALAAAAAAQABAAAARVMMhJawA4643XAggCJAkgCMBxdF84lme6Ah4okiaqsvab'+ 
  'yzwXLrazGCecpEahABAIgEIBYDAABgMM0wmVUq1YbfMZnVavWcCW7D2H1eOuGZw92u+VCAA7';

//取得したaタグを検証
var aTagIsInvalid = function(aTag) {
  return !aTag || aTag == '' || aTag == 0 || REGEXP_TAG.test(aTag.innerHTML);
};

//aタグ中のURIを検証
var aUriIsValid = function(aUri) {
  return !REGEXP_BOOKLOG.test(aUri) && REGEXP_AMAZON.test(aUri);
};

//送信先URIを返す
var returnSubmitUri = function(aTag, aUri) {
  var matchedDp   = aUri.match(REGEXP_DP);
  var matchedAsin = aUri.match(REGEXP_ASIN);
  
  if (matchedDp) {
    return BOOKLOG_URI + matchedDp[1];
  } else if (matchedAsin) {
    return BOOKLOG_URI + matchedAsin[1];
  } else {
    return BOOKLOG_URI + encodeURIComponent(aTag.innerHTML);
  };
};

//メイン関数：ブクログへのリンクを追加
var addBooklogLinks = function(doc) {
  var aTags = doc.getElementsByTagName('a');
  var aTagsSize = aTags.length;
  
  for (var i = 0, aTag, aUri, parentTag, newTag, newImg, submitUri; i < aTagsSize; i++) {
    aTag = aTags[i];
    if (aTagIsInvalid(aTag)) continue;
    aUri = aTag.getAttribute('href');
    
    if (aUriIsValid(aUri)) {
      submitUri = returnSubmitUri(aTag, aUri);
      
      newImg = doc.createElement('img');
      newImg.setAttribute('src', ICON_DATA);
      newImg.setAttribute('style', 'margin-bottom:-3px;border:none;');
      
      newTag = doc.createElement('a');
      newTag.setAttribute('href', submitUri);
      //newTag.setAttribute('target', '_blank');
      newTag.appendChild(newImg);
      
      parentTag = aTag.parentNode;
      parentTag.insertBefore(newTag, aTag.nextSibling);
    };
  };
};

//読み込みを待つ
window.addEventListener('load', addBooklogLinks(document), false);

//AutoPagerizeで挿入された要素にも適用
//動かないorz　むむむ……
//setTimeout(function() {
//  var autoPagerized = window.AutoPagerize;
//  if (autoPagerized) {
//    autoPagerized.addFilter(function(nodes) {
//      for (var i = 0, nodesLength = nodes.length; i < nodesLength; i++) {
//        addBooklogLinks(nodes[i]);
//      };
//    });
//  };
//}, 0);

})();
