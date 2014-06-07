// ==UserScript==
// @name           Amazon Width
// @namespace      localhost
// @include        http://www.amazon.*
// ==/UserScript==

// remove click tracking
var links, a;
links = document.links;
for (var i = 0; i < links.length; i++) {
	a = links[i];
	a.href = a.href.replace(/\/ref=[^\?]*(.|$)/g,"$1");
	a.href = a.href.replace(/(\?|&)ie=([^&]*.|$)/gi,"$1");
	a.href = a.href.replace(/(\?|&)sr=([^&]*.|$)/gi,"$1");
	a.href = a.href.replace(/(\?|&)s=([^&]*.|$)/gi,"$1");
	a.href = a.href.replace(/(\?|&)qid=([^&]*.|$)/gi,"$1");
	a.href = a.href.replace(/(\?|&)$/g,"");
}


GM_addStyle(<><![CDATA[
	body {
	  width: 1% !important;
	  display: inline !important;
	  padding-left: 100px !important;
	}
	.singlecolumnminwidth {
	  width: 90% !important;
	  margin-left: auto !important;
	  margin-right: auto !important;
	  display: inline !important;
	}
	.content {
	  width: 95% !important;
	  margin-left: 2% !important;
	}
	#productDescription, #productReviews TABLE > TBODY > TR > TD {
	  max-width: 500px !important;
	  margin-left: auto !important;
	  margin-right: auto !important;
	  padding-left: 10% !important;
	  display: block !important;
	}

	.bucket {
	  width: 95% !important;
	  margin-left: auto !important;
	  margin-right: auto !important;
	  display: block !important;
	}
	#handleBuy {
	  width: 98% !important;
	}
]]></>.toString());
