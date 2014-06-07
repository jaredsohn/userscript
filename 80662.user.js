// ==UserScript==
// @name           Aoyama Gakuin University Library
// @namespace      http://www.unfindable.net/
// @description    Amazon + 青山学院大学図書館自動所蔵確認
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


function checkLibrary(isbn) {
  var url = "http://www.agulin.aoyama.ac.jp/opac/opac_list.cgi?lang=0&key=&smode=1&appname=Netscape&version=5&NII_BOOK_CD=10&NII_SERIAL_CD=20&local=on&vfile=10%2C11%2C12%2C19&jf=&vfile=10&jf=1&vfile=10&jf=2&vfile=20%2C21%2C29&jf=&vfile=20&jf=1&vfile=20&jf=2&vfile=11%2C21&jf=&vfile=12&jf=&vfile=19&jf=&dpmc=0&kywd=&sort=3&order=1&disp=2&local_exp=on&vfile_exp=10%2C11%2C12%2C19&jf_exp=&vfile_exp=10&jf_exp=1&vfile_exp=10&jf_exp=2&vfile_exp=20%2C21%2C29&jf_exp=&vfile_exp=20&jf_exp=1&vfile_exp=20&jf_exp=2&vfile_exp=11%2C21&jf_exp=&vfile_exp=12&jf_exp=&vfile_exp=19&jf_exp=&dpmc_exp=0&kywd1_exp=" + isbn + "&con1_exp=6&op2_exp=0&kywd2_exp=&con2_exp=3&op3_exp=0&kywd3_exp=&con3_exp=4&year1_exp=&year2_exp=&cntry_exp=0&txtl_exp=0&cls_exp=0&lgmd_exp=0&place_exp=&hndl_exp=&sort_exp=3&order_exp=1&disp_exp=2";
    
  GM_xmlhttpRequest({
    method:"GET",
    url:url,
    onload:function(response){
      if (!response.responseText.match(/errormsg/i)){
        var header = document.evaluate("//span[@id='btAsinTitle']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (header) {
          var spl_link = document.createElement('a');
          spl_link.setAttribute('href', url);
          spl_link.innerHTML = '</br>&#38738;&#23665;&#23398;&#38498;&#22823;&#23398;&#22259;&#26360;&#39208;&#x306B;&#x3042;&#x308B;&#x3088;';
          header.parentNode.insertBefore(spl_link, header.nextSibling);
        }
      }
    }
  });
}

isbn = getISBN();
if (isbn) checkLibrary(isbn);
