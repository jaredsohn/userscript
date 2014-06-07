// ==UserScript==
// @name           Renewed GREE
// @version        0.2
// @namespace      http://d.hatena.ne.jp/sohei/
// @include        http://gree.jp/*
// ==/UserScript==

(function() {

var as = document.evaluate("//div[@class='content mood' or @class='content impress' or @class='content review']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
for (i = 0; i < as.snapshotLength; i++){
  a = as.snapshotItem(i);
  a.style.display='none';
  a.previousSibling.parentNode.previousSibling.parentNode.style.display='none';
}

var style = <><![CDATA[
	body, table th, table td, h1, h2, h3, h4, h5, input, textarea {
		font-family:"Hiragino Kaku Gothic Pro","ヒラギノ角ゴ Pro W3","Osaka","ＭＳ Ｐゴシック","Sans-Serif";
		font-size:small;
		font-style:normal;
		font-weight:normal;
	}
	]]></>;
GM_addStyle(style);

document.getElementById('celeb').style.display='none';

})();