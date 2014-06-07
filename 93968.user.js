// ==UserScript==
// @name           party poker popup blocker
// @namespace      
// @description    This blocks the party poker popup
// @include        *
// @version        1.2
// @changes        lol
// ==/UserScript==


if (window.location.hostname.match("partycasino.com") ||
    window.location.hostname.match("partypoker.com")) ||
    window.location.hostname.match("fr.888.com")) ||
    window.location.hostname.match("groupon.be")) ||
    window.location.hostname.match("fr.partypoker.com")) ||
    window.location.hostname.match("")) ||
    window.location.hostname.match("")) ||
    window.location.hostname.match("")) ||
    window.location.hostname.match("")) ||
    window.location.hostname.match("")) ||
window.close();

Update.check()

var Update = {};

// You only need to change the following three variables.
Update.id         = 93968;
Update.curVersion = 1.2;
Update.callback   = function () {
// Place your custom code here.
}

Update.check = function () {
   if (!Update.id)         { return; }
   if (!Update.curVersion) { return; }
   if (Update.keys && Update.keys['version'])  { Update.callback(); }
   var url = 'http://userscripts.org/scripts/source/'+Update.id+'.meta.js';
   XHR.get(url, Update.onXHR);
}
Update.onXHR = function (response) {
  var splat = response.responseText.split(/[\r\n]/),
  keys = {};
  for (var i in splat) {
    if (!splat[i]) continue;
    var matches = splat[i].match(/@([\w:]+)\s+(.+)/);
    if (!matches) continue;
    keys[matches[1]] = matches[2];
  }
  // set update keys
  Update.keys = keys;
  Update.url = 'http://userscripts.org/scripts/source/' + Update.id + '.user.js';
  if (keys['version'] && (keys['version'] != Update.curVersion)) {
    Update.callback();
  }
};

var XHR = {};

XHR.createQueryString = function (obj) {
   var ret = [];
   for (var i in obj) {
      ret.push([i, encodeURIComponent(obj[i])].join('='));
   }
   return ret.join('&');
}

XHR.createDoc = function (r, callback) {
  var doc = document.implementation.createDocument('','',null);
  var html = document.createElement('html');
  html.innerHTML = r.responseText;
  doc.appendChild(html);
  r.doc = doc;
  callback(r);
}

XHR.post = function (url, callback, data) {
   GM_xmlhttpRequest({
         method: 'POST',
         url: url,
         headers: {
            'User-Agent': navigator.userAgent,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': XHR.createQueryString(data).length,
         },
         data: XHR.createQueryString(data),
         onload: function (r) { XHR.createDoc(r, callback) }
      });
}

XHR.get = function (url, callback) {
   GM_xmlhttpRequest({
         method: 'GET',
         url: url,
         headers: {
            'User-Agent': navigator.userAgent,
            'Content-Type': 'application/x-www-form-urlencoded',
         },
         onload: function (r) { XHR.createDoc(r, callback) }
      });
}