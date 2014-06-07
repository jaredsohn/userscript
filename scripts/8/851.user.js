// ==UserScript==
// @name          amazon2melvyl
// @namespace     http://aeshin.org/userscripts
// @description	  Inserts a link to Melvyl after each link to Amazon
// @include       *
// ==/UserScript==

(

function() {
  // Find links to books at Amazon.
  var links = document.evaluate(
    '//a', document, null, XPathResult.ANY_TYPE, null); 
  var amazon_links = new Array();
  var current_link = links.iterateNext();
  while (current_link) {
    var href = current_link.getAttribute('href');
    if (href) {
      // http://www.amazon.com/exec/obidos/redirect?tag=citeulike-20&path=ASIN/0520058380
      if ((    href.indexOf('/exec/obidos/ASIN')         >= 0
            || href.indexOf('/exec/obidos/redirect')     >= 0
            || href.indexOf('/exec/obidos/tg/detail/-/') >= 0
            || href.indexOf('/dp/') >= 0)
        && current_link.textContent.length > 0) {
        amazon_links.push(current_link);
      }
    }
    current_link = links.iterateNext();
  }
  // Augment them with links to Melvyl.
  var melvyl_links = {};
  for (var i = 0; i < amazon_links.length; i++) {
    var amazon_link = amazon_links[i];
    var has_isbn = amazon_link.getAttribute('href').match(/\/\d{9}[\d|X]/);
    if (has_isbn) {
      // Insert Melvyl link.
      var melvyl_link = document.createElement('a');
      melvyl_link.setAttribute('title', 'Look this up on Melvyl');
      amazon_link.parentNode.insertBefore(melvyl_link, amazon_link);
      amazon_link.parentNode.insertBefore(amazon_link, melvyl_link);
      var isbn = has_isbn[0].slice(1).toLowerCase();
      if (! melvyl_links[isbn]) {
        melvyl_links[isbn] = [];
      }
      melvyl_links[isbn].push(melvyl_link);
      // Get alias ISBNs from OCLC.
      var xisbn_url = 'http://labs.oclc.org/xisbn/' + isbn;
      GM_xmlhttpRequest({ 
        method: "GET",
        url: xisbn_url,
        onload: function(details) {
          // Would be nice to use XPath here, but we can't since 
          // GM_xmlhttprequest doesn't support responseXML due to
          // security restrictions.
          var isbns = details.responseText.match(/\d{9}[\d|X]/gi);
          var melvyl_url = 'http://melvyl.cdlib.org/F/?func=find-c&ccl_term=';
          for (var count = 0; count < isbns.length; count++) {
            if (count == 21) { // Melvyl's limit
              break;
            }
            if (count > 0) {
              melvyl_url += '+or+';
            }
            melvyl_url += '020=' + isbns[count];
          }
          var proxy_problem = false;
          if (details.responseText.match('UCB Library Proxy Server Authentication')) {
            proxy_problem = true;
          }
          // Set HREF on links.
          for (var j = 0; j < melvyl_links[isbns[0]].length; j++) {
            var next_link =  melvyl_links[isbns[0]][j];
            next_link.setAttribute('href', melvyl_url);
            if (proxy_problem) {
              next_link.setAttribute('title', 'Look this up on Melvyl (login to UCB library proxy for better results)');
              next_link.innerHTML 
                = '<img src="data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D5%04%02%04%2B%2C%92%0Fp!%00%00%01%1AIDATx%DAcd%80%82\'k%D7%FE%97%94%96f%60%60%60%60%60%B6%B0%60d%C0%02%FE%9E8%F1%1F%C6%86%A9a%81%09%EC_%BA%94%81%81%81%81!%AA%AC%0C%AE%10%A6%08Y%E3%B5K%97P%0CeB%B7eYW%17%8A%8D0%CD%D7.%5D%C2%D0%8C%E2%02l%86%C8hi1%C8kj2%7C%FD%FA%95%01%17%40qA%C4%D4%A9%0CQ%CB%97%C3%F9O%AE%5DC%D1%AC%93%9A%CA%A0%93%9A%8A%DB%05%7Fn%DD%82%1B%F4%5BP%94amT%18%5C%23.%80%D5%0B%7Fn%DDb%60d%B8%C5%10%B3v-%03!%C0%84Mp%CD%C4%89%0C%1Cvv%0C%3F%0E%1D%82%8B%1Dil%24%DE%00%06%06%06%86%25%C1%C1%0C%3FTU%19%3E%3C%7F%8ES3N%2F%C0%C0%96%9C%1C%06%05%3D%3D%D2%BD%40%0A%80%1B%10%BBn%1D%23%B1%9At%D3%D2%18%B1%BA%60%07%11%A1%BE%15)%A52000%60%B5uqP%10%3C%ED%23%87%81mC%03%23Qa%F0%E2%D3\'%0C%B1%5B7o%92%1E%40%5D%9E%9E%FF%97%25\'%FF%C7%A7%06%00%D7GdA%7C%25d%B9%00%00%00%00IEND%AEB%60%82"'
                + ' style="border: 0; margin: 0 0 0 2px; padding: 0; vertical-align: middle"'
                + ' alt="Melvyl warning icon" />';
            } else {
              next_link.innerHTML 
                = '<img src="data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%03%00%00%00(-%0FS%00%00%00%C0PLTE%3AQ%82%E7%EB%FB%89%96%B4n~%AF%BF%C6%D6Yl%9D%E6%E9%EFI%5E%8A%CC%D2%DE%7D%8C%AB%D9%DD%E6%2FGy%FF%FF%FF%CC%D1%FF%9A%AA%D3_n%AA%A2%AC%DBRc%A3%80%8E%C3x%87%B8%C1%CD%F7%C8%D3%FDDY%8B%AD%B5%E4%C2%C8%F6Nc%94cu%A6%8D%9A%C9%97%A3%BC%83%91%C0%B7%BF%ED%98%A3%D2%F3%F4%F7%B2%BA%CDVj%92%A4%AF%C5p%81%A3cu%9B%F9%FA%FD3K%7D%7C%8C%BF%9D%AC%D7%A5%B2%DE%DB%E1%F5%F3%F5%FD%8E%9C%C4%A1%B0%D7%5Eq%9D%88%97%C6%88%95%CA%AB%B4%D5%99%A5%C9%C6%CD%E3%91%9E%CFq%7F%B6%AD%B8%DE%F6%F8%FCkz%B2%C8%D2%F8%D5%DD%FA%CF%D8%F9%CC%D2%E7%CD%D7%F9Yi%A3%20%F5%BA%11%00%00%00%01tRNS%00%40%E6%D8f%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D5%02%1B%01%1A2%0A%C7e%AE%00%00%00hIDATx%DA%7D%C8A%0E%80%20%0CD%D1Q%23n%9A6%10%D0%C4%03%18%F5%04z%FF%8BY%01%057%FEE%D3y%00%A6%10%10%0B%F9%11%89%9F%1E%E6%0Cr%EA%0A%1B%17%10Yw%E6%17%9AEE%17Q%06%EF%9BCx%A1%0A%BC%A7%D8%0B%96T%5C%0D%D6%18%F7%05%EB~%00%05%D2F%F7%40%8B%A7%04(%8D7%F4%A8%1B%E6%FC%5CM%AE%0A%8B%40f%F1%FA%00%00%00%00IEND%AEB%60%82"'
                + ' style="border: 0; margin: 0 0 0 2px; padding: 0; vertical-align: middle"'
                + ' alt="Melvyl icon" />';
            }
          }
        }
      });
    }
  }
}

)();
