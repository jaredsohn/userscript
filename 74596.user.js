// ==UserScript==
// @author         rikuo
// @name           All image block
// @namespace      http://d.hatena.ne.jp/rikuo/
// @include        http://*
// ==/UserScript==

GM_addStyle(<><![CDATA[
	img,svg,canvas,object,embed{
		display: none !important;
	}
	*{
		background-image: none !important;
	}
]]></>)
