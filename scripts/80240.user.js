// ==UserScript==
// @name           nico ad
// @namespace      nico ad
// @include        http://www.nicovideo.jp/watch/sm*
// ==/UserScript==

GM_addStyle(<><![CDATA[

	body { background: none #000000; }
	body.mode_2 { padding-top: 40px; }
	.body_984 { width: 555px; overflow: hidden; }
	#flvplayer_container { padding: 0; }
	#flvplayer_container.player3 { padding: 0; }
	
	#PAGEHEADMENU,
	#PAGEHEADER,
	#WATCHHEADER,
	#WATCHFOOTER,
	#PAGEFOOTER { display: none; }

]]></>);