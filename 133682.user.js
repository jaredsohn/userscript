// ==UserScript==
// @id             NoGoogleBar
// @name           Hide/disable/remove the black google bar
// @version        1.0.7
// @namespace      https://userscripts.org/scripts/show/133682
// @author         Bengt Lüers
// @description    Hides/disables/removes the black google bar
// @include        http://*.google.*/*
// @include        https://*.google.*/*
// @exclude
// @run-at         document-start
// ==/UserScript==

GM_addStyle([
'#calcontent{margin-top:-30px}',
'#content{margin-top:-30px}',
'#footer{margin-top:30px}',
'#gb.gbes{margin-bottom:0px; margin-top:0}',
'#gbg{margin-top:-30px}',
'#gb.header-wrapper{margin-top:30px;margin-bottom:0}',
'#gb{margin-bottom:0px; margin-top:-30px}',
'#gbq1 {margin-top:-30px}',
'#gbq1.gbt {margin-top:-30px}',
'#gbq2{margin-top:-30px}',
'#gbq{margin-top:0}',
'#gbvg{margin-top:-30px}',
'#gbx1{margin-top:0}',
'#gbx1 {margin-top:-30px}',
'#gbx3 {display:none}',
'#gbx3{margin-top:0}',
'#gbx4{display:none}',
'#gbz{margin-top:-30px}',
'#gbzw{margin-top:-30px}',
'#gs_hp_ftr{bottom:-30px}',
'#kd-googlebar{margin-top:0}',
'#new_groups_butterbar{margin-top:-30px}',
'.google-footer-bar{bottom:-30px}',
'.kba.SSb.o8a{margin-top:-30px}',
'.nH.oy8Mbf.qp{margin-bottom:-30px}',
'.onegoogle.noprint{margin-top:30px;margin-bottom:-30px}',
'.sites-dash-appbar{margin-top:-30px}',
'center.ctr-p{margin-top:30px}'
].join(''));
