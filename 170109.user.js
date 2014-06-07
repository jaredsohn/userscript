// ==UserScript==
// @name        replace S1 domain
// @namespace   net.keakon.readersharer
// @include     http://220.196.42.172/*
// @include     http://www.stage1st.com/*
// @include     http://bbs.stage1st.com/*
// @include     http://www.saraba1st.com/*
// @include     http://bbs.saraba1st.com/*
// @author      KyoHiroki
// @description replace S1 domain in URL to IP
// @version     1
// @grant       none
// ==/UserScript==

(function(){
        var ip = '220.196.42.172';
		items = document.getElementsByTagName('a');
		for (var i = 0; i < items.length; i++) {
			items[i].href = items[i].href.replace(/(bbs|www)\.(stage1st|saraba1st)\.com/, ip);
		}
})();