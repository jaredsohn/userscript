// ==UserScript==
// @name           Adachi City Library
// @namespace      http://www.unfindable.net/
// @description    Amazon + 東京都足立区立図書館自動所蔵確認
// @include        http://www.amazon.co.jp/*
// @version         1.1
// ==/UserScript==
//
// auther          Unfindable.net http://www.unfindable.net/
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//

function getISBN() {
  var href = document.location.href;
  var index = href.indexOf('dp/');
  var asin = href.substring(index + 3, index + 13);
  if (index < 0) {
    index = href.indexOf('product');
    asin = href.substring(index + 8, index + 18);
  }
  if (index < 0) {
    index = href.indexOf('ASIN');
    asin = href.substring(index + 5, index + 15);
  }
  return asin;
}

function checkStock(url) {
  GM_xmlhttpRequest({
    method:"GET",
    url:url,
    onload:function(response){
      if (response.responseText.match(/<FONT COLOR="WHITE">No<\/FONT>/)){//所蔵館があるか調べる
        var header = document.evaluate("//span[@id='btAsinTitle']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (header) {
          var spl_link = document.createElement('a');
          spl_link.setAttribute('href', url);
          spl_link.innerHTML = '</br>&#36275;&#31435;&#21306;&#31435;'//足立区立
            +'&#x56F3;&#x66F8;&#x9928;&#x306B;&#x3042;&#x308B;&#x3088;';//図書館にあるよ
          header.parentNode.insertBefore(spl_link, header.nextSibling);
        }
      }
    }
  });
}


function checkLibrary(isbn) {
  var host = "http://www.lib.adachi.tokyo.jp/ADCLIB/servlet/";
  var url = host + "search.result?title1=&title_agree1=2&title_cond2=1&title2=&title_agree2=2&title_cond3=1&title3=&title_agree3=2&author1=&author_agree1=2&author_cond2=1&author2=&author_agree2=2&author_cond3=1&author3=&author_agree3=2&publisher1=&publisher_cond2=1&publisher2=&publisher_cond3=1&publisher3=&relation1=&relation_cond2=1&relation2=&relation_cond3=1&relation3=&class_sign1=&publish_year1=&publish_year2=&data_division1=dummy&title_kind1=dummy&library_name1=dummy&code_genre1=2&area_check1=dummy&area1=dummy&possess_division1=dummy&medium_kind1=dummy&newarvl1=dummy&tkd_poss1=dummy&classflg=0&code_value1=" + isbn;

  GM_xmlhttpRequest({
    method:"POST",
    url:url,
    onload:function(response){
      var result = response.responseText.match(/HREF="\.(.*tilcod=[0-9]*)"/);
      if (result) {
        url = host + result[1];//マッチしたカッコの中を取得
        checkStock(url);
      }
    }
  });
}

isbn = getISBN();
if (isbn) checkLibrary(isbn);
