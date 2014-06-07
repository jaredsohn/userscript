// ==UserScript==
// @name           Machida City Library
// @namespace      http://www.unfindable.net/
// @description    Amazon + 東京都町田市立図書館自動所蔵確認
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
  asin = asin.substr(0, 9);
  return asin;
}

function checkLibrary(isbn) {
  var host = "http://www.library.city.machida.tokyo.jp";
  var url = host+"/cgi-bin/ts2gate.exe/TG2search/TG2search?search_tech=direct&high_light=on&list_max_size=500&expanse.k=on&expanse.a=on&expanse.e=on&expanse.u=off&terms_connection=AND&search_condition.0=INDEX-F%3CTOSHO.INDEX-5%3E%3Aeq%28%27"
  +isbn+"%27%29&version=0210&server_host_name=OPAC&text_db_name=TOSHO&target_file=INDEX-F&listing_file=HEAD-F&view_file=HEAD-F";
    
  GM_xmlhttpRequest({
    method:"GET",
    url:url,
    onload:function(response) {
      var result = response.responseText.match(/HREF=".*sdid=([0-9]*).*"/);
      if (result) {
        var sdid = result[1];//マッチした中から括弧の中を取り出す
        url = host + "/cgi-bin/ts2gate.exe/TG2getdoc?sdid="
        + sdid + "&version=0210&server_host_name=OPAC&text_db_name=TOSHO&target_file=INDEX-F&search_tech=direct&search_term.0="
        + isbn + "&expanse.u=off&expanse.k=on&expanse.a=on&expanse.e=on&high_light=on&view_file=HEAD-F";

        var header = document.evaluate("//span[@id='btAsinTitle']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (header) {
          var spl_link = document.createElement('a');
          spl_link.setAttribute('href', url);
          spl_link.innerHTML = '</br>&#30010;&#30000;&#24066;&#31435;'//町田市立
          +'&#x56F3;&#x66F8;&#x9928;&#x306B;&#x3042;&#x308B;&#x3088;';//図書館にあるよ
          header.parentNode.insertBefore(spl_link, header.nextSibling);
        }
      }
    }
  });
}

isbn = getISBN();
if (isbn) checkLibrary(isbn);
