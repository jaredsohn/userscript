// ==UserScript==
// @name           Chiba Institute of Technology Library
// @namespace      http://www.unfindable.net/
// @description    Amazon + 千葉工業大学図書館自動所蔵確認
// @include        http://www.amazon.co.jp/*
// @version        1.20
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
  if (asin.match(/[0-9X]{10}$/i)) {
    return asin;
  } else {
    return false;
  }
}

function toISBN13(isbn10) {
  var digits = [9, 7, 8];
  for (var i = 0; i < 9; i++) {
    digits.push(parseInt(isbn10[i]));
  }
  var s = 0;
  var isbn13 = "";
  for (var i = 0; i < 12; i++) {
    isbn13 += digits[i];
    s += (i%2 == 0 ? 1 : 3) * digits[i];
  }
  var c = s % 10;
  if (c == 0) {
    isbn13 += '0';
  } else {
    isbn13 += 10 - c;
  }
  return isbn13;
}

function checkLibrary(isbn) {
  var url = "http://opac.lib.it-chiba.ac.jp/cgi-bin/exec_cgi/ibibser.cgi?CGILANG=japanese&U_CHARSET=euc-jp&SFORM=1&submit.x=68&submit.y=18&CATTP_WORK=&WORDS_PRMKEY_bib=&TITLE_PRMKEY_bib=&AUTH_PRMKEY_bib=&PUB_PRMKEY_bib=&YEAR_bib=&ISBN_PRMKEY_bib="+isbn+"&ISSN_PRMKEY_bib=&SORTKEY=STITLE&SORTDIR=ASC&KEYREP_bib=TITLE_PRMKEY_bib&KEYREP_bib=AUTH_PRMKEY_bib&KEYREP_bib=PUB_PRMKEY_bib&KEYREP_bib=SH_PRMKEY_bib&KEYREP_bib=PLACE_bib&CATTP_CD_bib=";
    
  GM_xmlhttpRequest({
    method:"GET",
    url:url,
    onload:function(response) {
      //console.log(isbn);
      if (response.responseText.match(/bs_error/i)) {
        if (isbn.length == 10) {
          var isbn13 = toISBN13(isbn);
          checkLibrary(isbn13);
        }
      } else {
        var header = document.evaluate("//span[@id='btAsinTitle']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (header) {
          var spl_link = document.createElement('a');
          spl_link.setAttribute('href', url);
          spl_link.innerHTML = '</br>&#x5343;&#x8449;&#x5DE5;&#x696D;&#22823;&#23398;&#22259;&#26360;&#39208;&#x306B;&#x3042;&#x308B;&#x3088;';
          header.parentNode.insertBefore(spl_link, header.nextSibling);
        }
      }
    }
  });
}

isbn = getISBN();
if (isbn) checkLibrary(isbn);