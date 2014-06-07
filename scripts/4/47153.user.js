// ==UserScript==
// @name           Google Books Add Amazon
// @namespace      http://rono23.blogspot.com
// @description    Add google books data to Amazon.
// @include        http://www.amazon.tld/*
// @version        1.0
// ==/UserScript==

(function(){
  function getISBN(str){
    if(str.match(/[\/\=]([\d]{9}[\dX])[^&]?/)) return RegExp.$1;
  }

  function getXPathRes(str){
    return document.evaluate('//*[@id="prodImageCaption"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  }

  function showGoogleBook(rst){
    var gBook, html;
    eval(rst);
    for(var i in _GBSBookInfo){ gBook = _GBSBookInfo[i]; }

    var res = getXPathRes(document.location.href);
    var resElem = res.snapshotItem(0);
    if(!resElem){ return; }

    var div = document.createElement('div');
    div.style.borderTop = '1px dashed #999999';
    div.style.borderBottom = '1px dashed #999999';
    div.style.margin = '1em 0 0 0';
    div.style.fontSize = 'small';

    if(gBook){
      if(gBook.embeddable && gBook.preview != 'noview'){
        var preview_btn = 'http://books.google.com/intl/en/googlebooks/images/gbs_preview_button1.gif';
        html = '<p><a href="' + gBook.preview_url + '" target="_blank"><img style="border:none" src="' + preview_btn + '" /></a></p>';
      }else{
        html = '<p>No Preview in Google Books</p>';
      }
      html += '<p><a href="' + gBook.info_url + '" target="_blank">Detail</a> | ' + gBook.preview + '</p>';
    }else{
      html = '<p>Not Found in Google Books</p>';
    }

    div.innerHTML = html;
    resElem.parentNode.insertBefore(div, resElem.nextSibling);
  }

  var requestGoogleBook = function(){
    var isbn = getISBN(document.location.href);
    var url = 'http://books.google.com/books?bibkeys=ISBN:' + isbn + '&jscmd=viewapi'
    if(!isbn){ return; }

    var opt = {
      method: 'get',
      url: url,
      onload: function(res){
         showGoogleBook(res.responseText);
      }
    }
    GM_xmlhttpRequest(opt);
  }

  window.addEventListener('load', requestGoogleBook, true);
})();
