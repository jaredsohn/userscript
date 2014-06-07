// ==UserScript==
// @name          Spread Firefox Japan Workaround
// @namespace     http://taken.s101.xrea.com/
// @include       http://www.spreadfirefox.com/*
// @description	  Some fix up for Spread Firefox Japan.
// ==/UserScript==
(function() {
  var jsfxURI = "http://japan.spreadfirefox.com/";
  var jsfxLogoURI = "http://www.spreadfirefox.com/themes/spreadfirefox/logo-jp.png";
  var xpath = '(/descendant::a[@href=""] | /descendant::img[@src="themes/spreadfirefox/logo.png"])';
  var type = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
  var targetElms = document.evaluate(xpath, document, null, type, null);
  var i = 0;
  var targetElm;
  for (i; i < targetElms.snapshotLength; i++) {
    targetElm = targetElms.snapshotItem(i);
    if (targetElm.nodeName == "A" ) {
      targetElm.href = jsfxURI;
    } else {
      targetElm.src = jsfxLogoURI;
    }
  }

 var loginHTML = '<h2 class="title"><span>\u30E6\u30FC\u30B6\u30FC\u30ED\u30B0\u30A4\u30F3</span></h2><div class="content"><div class="item-list"><ul><li><a href="user">\u30ED\u30B0\u30A4\u30F3</a></li><li><a href="user/register">\u30A2\u30AB\u30A6\u30F3\u30C8\u306E\u4F5C\u6210</a></li><li><a href="user/password">\u65B0\u898F\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u767A\u884C</a></li></ul></div></div>';
  var blockDiv = document.getElementById("block-og-0");
  if (blockDiv && blockDiv.getElementsByTagName("LI").length == 1) {
    loginDiv = document.createElement("DIV");
    loginDiv.setAttribute('class', 'block block-user');
    loginDiv.setAttribute('id', 'block-user-0');
    loginDiv.innerHTML = loginHTML;
    blockDiv.parentNode.replaceChild(loginDiv, blockDiv);
  }
})();
