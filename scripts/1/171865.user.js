// ==UserScript==
// @name           amazon_article_changer
// @namespace      wtf
// @include        *amazon*
// @exclude 	   *sellercentral*
// ==/UserScript==
box = window.document.createElement('div');
box.innerHTML = "<html><head><title></title></head><body><select onChange='changer(this.value)'><option></option><option value='de'>DE</option><option value='co.uk'>UK</option><option value='fr'>FR</option><option value='es'>ES</option><option value='it'>IT</option><option value='com'>COM</option></select></body></html>";
box.style.position = "fixed";
box.style.right = "0px";
box.style.bottom = "0px";

sc = window.document.createElement('script');
sc.type = "text/javascript";
//sc.innerHTML = "function changer(end){var url = window.location.href;var nurl = 'http://www.amazon.'+ end + url.slice(url.indexOf('/gp/'), url.length);window.location.href = nurl;}";
sc.innerHTML = "function changer(end){var nurl = '';var url = window.location.href;if (url.search('/dp/') != -1){nurl = 'http://www.amazon.'+ end + '/gp/product/' + url.slice(url.indexOf('/dp/')+4, url.indexOf('/dp/')+14);}else{nurl = 'http://www.amazon.'+ end + url.slice(url.indexOf('/gp/'), url.length);}window.location.href = nurl;}";
window.document.getElementsByTagName("head")[0].appendChild(sc);
window.document.getElementsByTagName("body")[0].appendChild(box);
