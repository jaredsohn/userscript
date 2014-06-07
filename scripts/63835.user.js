// ==UserScript==
// @name           BetterReading
// @author         alian
// @namespace      http://alian.info
// @description    Script for better reading pages, based odn PlainPager
// @include        http://*
// @include        *
// ==/UserScript==
(function(){var newSS, styles='* { background: white ! important; color: #0D0000 !important; font-size:17px; line-height:1.6em; font-family:Times; text-align:left; margin-bottom: 1em; border-bottom:1px solid gray; } :link, :link * { color: #0000EE !important } :visited, :visited * { color: #551A8B !important }'; if(document.createStyleSheet) { document.createStyleSheet("javascript:'"+styles+"'"); } else { newSS=document.createElement('link'); newSS.rel='stylesheet'; newSS.href='data:text/css,'+escape(styles); document.getElementsByTagName("head")[0].appendChild(newSS); } })()





