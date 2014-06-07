// ==UserScript==
// @name          Amazon to 7&y
// @namespace     http://www.hatena.ne.jp/r-west/
// @description	  Amazon to 7&y
// @include       http://*.amazon.*
// ==/UserScript==

(function(){
function libsearch() {
	var mainmatch = window.location.href.match(/\/(\d{9}[\d|X])/);
    if (!mainmatch) {
       return;
    }
    var asin = mainmatch[1];
	if (!asin){
		return;
	}
	var bs = document.getElementsByTagName('span');
	for (i in bs) {
	  if (bs[i].getAttribute('id') == 'btAsinTitle') {
	    var header = bs[i];
	    break;
	  }
	}
	if (!header) {
		return
	}
	var spl_link = document.createElement('a');
	spl_link.setAttribute('href', 'http://www.7andy.jp/all/search_result/?kword_in=' + transToIsbn13(asin));
	spl_link.innerHTML = '<span style=\"font-size:90%; background-color:#ffffcc;\">&raquo; Search 7&amp;Y! </span>';
	header.parentNode.insertBefore(spl_link, header.nextSibling);
}
function transToIsbn13(asin) {
  var isbn12 = "978" + asin.substring(0,9);
  var sum=0;
  for (var i=0 ; i<12 ; i++) {
    sum = sum + (isbn12.charAt(i)-'0') * (i%2==0 ? 1 : 3);
  }
  return isbn12 + ((10-(sum % 10))%10);
}
libsearch();
})();

