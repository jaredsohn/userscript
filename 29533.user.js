// ==UserScript==
// @name           Hyper Estraier Document Registrar
// @namespace      http://d.hatena.ne.jp/youpy/
// @require        http://www.onicos.com/staff/iz/amuse/javascript/expert/md5.txt
// @require        http://svn.coderepos.org/share/lang/javascript/jsdeferred/trunk/jsdeferred.userscript.js
// @include        *
// @exclude        ^http://.+search_ui
// ==/UserScript==

(function() {
  if(window == window.parent) {
    with (D()) {
      // edit here
      var username = 'admin';
      var password = 'admin';
      var endpoint = 'http://localhost:1978/node/webhistory/put_doc';

      next(function () {
	return xhttp.get("http://badges.del.icio.us/feeds/json/url/data?hash=" + MD5_hexhash(location.href));
      }).
      next(function (d) {
	return eval('(' + d.responseText + ')');
      }).
      next(function (d) {
	GM_xmlhttpRequest({
	  method: 'post',
	  url: endpoint,
	  headers: {
	      'Authorization' : 'Basic ' + btoa([username, password].join(':')),
	      'Content-Type': 'text/x-estraier-draft'
	  },
	  data: "@uri="
	    + location.href
	    + "\n@title="
	    + document.title
	    + "\n@weight="
	    + (d.length == 0 ? '' : d[0].total_posts)
	    + "\n\n"
	    + document.body.textContent.replace(/\s+/g, "\n"),
	  onload: function(res) {}
	});
      });
    }
  }
})();
