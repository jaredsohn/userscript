// ==UserScript==
// @name          Link Warning
// @namespace     http://menno.b10m.net/greasemonkey/
// @description   Append a small icon to PDF and mailto links
// @include       http://*
// @include       https://*
// ==/UserScript==


var links, link;
links = document.evaluate(
   '//a[@href]',
   document,
   null,
   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
   null);

var re_pdf  = new RegExp("\.pdf$");
var re_mail = new RegExp("^mailto:");
for (var i = 0; i < links.snapshotLength; i++) {
   a = links.snapshotItem(i);

   if(a.href.match(re_pdf)) {
      icon = document.createElement('img');
      a.parentNode.insertBefore(icon, a.nextSibling);
      icon.src    = 'data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0C%00%00%00%0C%08%03%00%00%00a%AB%AC%D5%00%00%00%BDPLTE%FF%FF%FFgbe%BD%B7%BD%B7%AF%B4%B8%B2%B7%B6%B4%B7%86%87%89%EF%82%85%EFef%EEqs%F8oq%FDtv%FBeg%FD%3C%3F%BESV%D4%DB%DC%9C%9D%9D%FF%9C%9D%F8%8B%8C%FF%A1%A3%FCWY%EF%00%00%A512%C4%D0%D0%F246%F3AD%E8AB%D0%0A%0B%B6%BD%C0%B9%B9%BCe01%A2ik%9DEE%B0%94%96%DC%DC%DF%CC%CC%D2%BE%BE%C4stu%F5%FB%FE%EC%F5%F7%EC%E8%E9%F1%F2%F4%D4%D6%DA%F0%D4%D6%ED%B2%B3%EE%A4%A5%E4%9A%9C%D6%BE%C2uvz%F9%F8%FA%EA%9E%A0%DD%AF%B1%D8%D6%D8%D4%CF%D2%CE%B2%B7xz%7B%F9%BB%BD%EE%BA%BB%91%92%94%8D%8F%94%C7%C9%CB%9C%9C%A1%96%96%9B%05%10%85D%00%00%00%83IDAT%08%99c%60%40%03%8CL%CC%2C%AC%ACl%40%16%3B%07\'%177%17%0F%2F%1F%BF%00%03%037%AF%A0%10%AF%B0%88%A8%988%83%00%03%8F%84%88%A4%84%94%B4%B4%98%8C%AC%2CH%8F%9C%BC%BC%BC%82%A2%92%B2%0A%88%A3%AA%A6%AE!%A4%A9%A1%A5%0C%E6hjj%EB%E8h(iAd4t%B5ut%F5%F4A%1C%03C%23c%25%13S33%10%C7%DC%C2R%86%CD%8A%CD%C0%1A%C4ac%D0%B4%B1%B2%B56%B0%03%00%AF%B8%0C%99%F4%1B%91S%00%00%00%00IEND%AEB%60%82';
      icon.alt    = 'PDF';
      icon.height = 12;
      icon.width  = 12;
   }
   if(a.href.match(re_mail)) {
      icon = document.createElement('img');
      a.parentNode.insertBefore(icon, a.nextSibling);
      icon.src    = 'data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0C%00%00%00%0C%08%06%00%00%00Vu%5C%E7%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D5%0A%09%0D%22%0F%86J%B8%F5%00%00%00%D0IDAT(%CF%B5%D1!N%03a%18%84%E1%A7%A4j%1BJBKBH(%14QB%82B%10%108Tm%2F%C0%098%09%8A%13%90%A0%F0%DC%00WQ%8B%86%0AT%13%A8!%EC%EE%FF%7F%08BA%D6t%E4d%5E13%ACZ%8D%B7%C9M%2C%1B%9E%B5F%9A0%9F%BD%80%DE%C55%B9%24U%E4R%D4%A5%E9%E4%01%B4%3B%7B%F0%03t%8F%86Dx%7D%BA%05%BB%A7W%A6%E3%7B%D0%E9%9D%88%5C%A9%3F%E7%7F%40%D1%1D%10%B5%EE%E0R%E4%DAt%7C%A7%D3%3F%23W%8A%F5-R%E9%E3%3F%40%26%92bs%9FTrp%AEho%8BT%92%BFDN%8B%1Ek%20%12%91%C9%89%A8%15%1B%3B%E4Z%23%AA%85%F7%AB%26%BC%3F%3F.%3Dks%D6%1A-%1D%3E%3E%EC7V~%B4o%15oR%F2MA%04%09%00%00%00%00IEND%AEB%60%82';
      icon.alt    = 'mail';
      icon.height = 12;
      icon.width  = 12;
   }
}
