// ==UserScript==
// @name           yahoo photos - direct link
// @namespace      http://d.hatena.ne.jp/Cherenkov/
// @include        http://photos.yahoo.co.jp/ph/*
// @version        0.4
// @date           2011052800
// ==/UserScript==

//smile stamp
var span = document.createElement('span');
span.className = "GM_origImg";
span.innerHTML = "&#9786;"

GM_addStyle(<><![CDATA[
.GM_origImg {
  font-size: 2.5em;
  position: absolute;
  color: deepskyblue;
}
]]></>.toString());

Array.forEach(document.querySelectorAll('img[src*="yahoofs"]'), function(e) {
  var ep = e.parentNode;
  GM_xmlhttpRequest({
    method: "GET",
    url: ep.href + "&.hires=t",
    onload: function(res) {
      var re = RegExp(e.src.replace(/__tn_.+/, '(?:__hr_|__sr_)[^"]+'));
      var newHref = re.exec(res.responseText)[0];
      ep.href = newHref;
      ep.parentNode.parentNode.appendChild(span.cloneNode(true));
    }
  });
});