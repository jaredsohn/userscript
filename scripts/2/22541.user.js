// ==UserScript==
// @name           ::VST LINK:: better redirector
// @namespace      http://ioris.info/ioris/cgi/plink/plink.php
// @description    ::VST LINK:: 子フレーム直接表示時のTOPリダイレクト改善
// @include        http://ioris.info/ioris/cgi/plink/plink.php?url=*
// @include        http://ioris.info/ioris/cgi/plink/plink.php?catno=*
// @include        http://ioris.info/ioris/cgi/plink/plink.php?mode=frame2&*
// @include        http://ioris.info/ioris/cgi/plink/plink.php?mode=rank&*
// @include        http://ioris.info/ioris/cgi/plink/plink.php?mode=main&*
// ==/UserScript==
(function() {
  // 適用URL制限
  var baseUrl = "http://ioris.info/ioris/cgi/plink/plink.php?";
  if (location.href.indexOf(baseUrl)==0) {
    // 適用フレーム制限
    if (self==top) {
      // GETパラメータ取得
      var params;
      if (location.search) { params = getParams(location.search); }
      // リダイレクト元:子フレーム(mode=main,rank,frame2)から親URLを指定
      if(top.frames.length==0 || top.frames[0].name=="rank"){
        if (params['catno']) {
          window.location.replace(baseUrl+"catno="+escape(params['catno']));
        } else {
          window.location.replace(baseUrl+"url="+escape(location.href));
        }
      }
      // リダイレクト先:親フレーム(plink.php)から子URLを書換
      else {
        // 右フレームには Redirect元URLに相当するページを表示
        if(params['catno']){
          top.frames[1].location.replace(baseUrl+"mode=frame2&catno="+unescape(params['catno']));
        } else if (params['url']) {
          top.frames[1].location.replace(unescape(params['url']));
        }
      }
    }
  }
  // GETパラメータ取得
  function getParams(search) {
    var params = new Array();
    var i; if((i=search.indexOf('?'))>=0){search=search.substr(i+1);}
    // 呼出時の前提条件として｢引数searchにlocation.searchを渡す｣で下記不要
    if((i=search.indexOf('#'))>=0){search=search.substr(0,i);}

    var pairs = search.split('&'); 
    for(var i in pairs) {
      var pair = pairs[i].split('=', 2);
      if(pair.length == 2) { params[pair[0]] = pair[1]; }
    }
    return params;
  }
  return true;
})();
// End