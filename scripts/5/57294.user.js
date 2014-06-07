// ==UserScript==
// @name           dabr style for pc
// @namespace      dabr_style_for_pc
// @description    dabr.co.uk style for pc
// @include        http://*dabr.co.uk/*
// @include        http://*twa.sh/*
// ==/UserScript==

GM_addStyle('	body{padding:0 20%}\
				body>div,body>table,body>form,body>p{}\
				table.timeline tr.odd>td,table.timeline tr.even>td{padding:1em .5em;line-height:1.5;font-family:"微软雅黑"}\
				table.timeline tr.odd>td[colspan],table.timeline tr.even>td[colspan]{padding:0 1em;background-color:#FE0}\
				table.timeline tr.odd>td:last-child>br,\
				table.timeline tr.even>td:last-child>br\
				{line-height:2em;vertical-align:top}');
