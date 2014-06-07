// ==UserScript==
// @name           RTL dabr style for pc 
// @namespace      dabr_style_for_pc
// @description    RTL dabr.co.uk style for pc
// @include        http://*dabr.co.uk/*
// @author         http://twitter.com/egza
// ==/UserScript==

GM_addStyle('	body{color: #556270 font: normal 11px Tahoma; padding:0 20%}\
				body>table,body>form{\ndirection: rtl;\n}\
				::selection {background: #F0F0F0; }\
				#status { border: 1px solid #781351; font-family: Tahoma; font-size: 11px; padding:0.5em; float: none; margin-right: 30px; }\
				small{direction: ltr; display: list; list-style: none; text-align: left;  height: 10%; margin-bottom=-12px;  }\
				tr.reply td,tr.reply.even td{background:none repeat scroll 0 0 #ADD8C7;}\
				table.timeline tr.odd>td,table.timeline tr.even>td\
				{padding:1em .5em;line-height:1.5;}\
				tr.even td {background:none repeat scroll 0 0 #F0F0F0;}\
				tr.odd td {background:none repeat scroll 0 0 #FFFFFF;}\
				table.timeline tr.odd>td:last-child>br,\
				table.timeline tr.even>td:last-child>br\
				{line-height:2em;vertical-align:top;');