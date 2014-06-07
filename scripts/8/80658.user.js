// ==UserScript==
// @name           University of Tokyo Library
// @namespace      http://www.unfindable.net/
// @description    Amazon + 東京大学付属図書館自動所蔵確認
// @include        http://www.amazon.co.jp/*
// @version         1.1
// ==/UserScript==
//
// auther          Unfindable.net http://www.unfindable.net/
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//

function getISBN(){
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


function checkLibrary(isbn){
  var url = "http://libsv.dl.itc.u-tokyo.ac.jp/iecats/cgi-bin/iecats-query?kywd1="
    + isbn + "&file=1&dpmc=0&jf=&jf=&jf=&appVersion=&gamen=%8Ag%92%A3%8C%9F%8D%F5&appName=&mode=2&moji=&key=&vfile=1&vfile=2&vfile=4&I_ENC=utf8&disp=1&local=on&con1=0&op1=0&con2=3&kywd2=&op2=0&con2=4&year1=&year2=&sort=&place=";
  
  GM_xmlhttpRequest({
    method:"GET",
    url:url,
    onload:function(response){
      if(response.responseText.match(/TEXTAREA/)){
        var header = document.evaluate("//span[@id='btAsinTitle']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if(header){
          var spl_link = document.createElement('a');
          spl_link.setAttribute('href', url);
          spl_link.innerHTML = '</br>&#26481;&#20140;&#22823;&#23398;&#38468;&#23646;'
            +'&#x56F3;&#x66F8;&#x9928;&#x306B;&#x3042;&#x308B;&#x3088;';
          header.parentNode.insertBefore(spl_link, header.nextSibling);
        }
      }
    }
  });
}

isbn = getISBN();
if (isbn) checkLibrary(isbn);
