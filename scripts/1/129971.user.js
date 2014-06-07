// ==UserScript==
// @name           Google Bar Classic Redone v.2.21
// @namespace      restoring google's classic look
// @description    Old-fashioned Google top and side bars and much more!
// @version        2.21
// @license        MIT License
// @include        http://*.google.*
// @include        http://google.*
// @include        https://*.google.*
// @include        https://google.*
// @include        https://accounts.google.*
// ==/UserScript==
var newStyle = document.createElement('style');
newStyle.type = 'text/css';
newStyle.innerHTML = '\
    #gbx3,#gbx4{line-height:2!important;height:29px!important;color:black!important;background-color:#fff!important;border-bottom:0!important;background-image:url(//ssl.gstatic.com/gb/images/b_8d5afc09.png)!important;background-position:0 -138px!important;}\
	.gbts,span.gbts {height:29px!important;line-height:2!important;color:#2A5DB0!important;background-image:none!important;font-weight:normal!important;}\
    .gbmt-hvr{background-color:#ecf0f8!important;height:27px!important;}\
	#gb_1{height:28px!important;}\.gbz0l,.gbzt-hvr{background-color:#242424!important;height:28px!important;}\
	.gbtsa{text-decoration:none;}\#gbz .gbz0l .gbts,#gbz .gbzt-hvr,#gbz .gbzt:focus,#gbz .gbgt-hvr,#gbz .gbgt:focus{color:#000!important;}\
	.gbz0l .gbtb2{border-top:2px solid #1a54e1!important;}\.gbmt{font-weight:normal!important;}\
	#gbx1,#gbx2{height:0!important;background-color:transparent!important;border-bottom:0!important;}\
	.ab_dropdownlnk,#gbz .gbto .gbts,#gbd a.gbmt,li.gbmtc,#gbztms1,.fjfe-nav-selected,.g-first div,h2.appname,#gbztm,#gbi4t:first-of-type,#gbd{color:#2A5DB0!important;}\
	.gbz0l .gbts{text-decoration:none;color:#000!important;font-weight:bold!important;}\#gb_23.gbzt.gbz0l.gbp1{display:none!important;}\
	#gbz .gbzt,#gbz .gbgt,#gbg .gbgt{color:white!important;}\#gbi5{background-position:-6px -22px!important;}\
	#gbql{margin-top:1em!important;}\.ab_dropdownlnk:hover{background-color:#ecf0f8!important;}\
	.gbmtc{width:100%!important;}\input.gbqfif{margin-left:-6px!important;}\
	.gbqfsf table{padding-left:0!important;margin-left:-6px!important;}\
	#leftnav h2,.tbos,.tbots,.tbotu,.tbt li,.ng,.sel span,#lc a,.tbou > a.q,#tbpi,#tbtro,.tbt label,#prc_opt,#set_location_section a,.tbtctlabel,#swr a,.msel,.mitem > .kl, #ms > .kl{color:#2200C1!important;}\
	#leftnav h2{font-weight:bold;}\.appbar-snippet-primary span{display:block;margin-top:4px!important;}\
	.appbar-snippet-secondary span{display:block;margin-top:6px!important;}\
	.spell{padding-right:.2em!important;font-size:85%!important;}\
	.ssp{display:block;padding-bottom:.5em!important;}\#leftnav{margin-top:0!important;width:125px!important;margin-right:0!important;}\
	li.mitem:hover,nojsb:hover,mitem:hover,.kl:hover,.kls:hover{background-color:#fff!important;color:#2200C1!important;text-decoration:underline!important;}\
	.didyou{color:#000!important;}\.mitem{margin-bottom:-.4em!important;}\
	.kl,.kls{display:inline-block!important;position:static!important;margin-bottom:inherit!important;margin-top:inherit!important;}\
	.kls{font-weight:bold!important;}\.errortips{margin-top:1em;padding-right:5px!important;}\
	#logo img,.lsbb{background-color:transparent;}\
	#c-doc #logo,#logocont,.scheme7 #logo,#gc-header #logo,#g,span#gbql{margin-left:-8px!important;margin-top:-5px!important;}\
	.glogo{margin-left:1em!important;}\.logohref{padding-top:0!important;}\
	.header-logo,.google-header-bar{background:none!important;border:0!important;}\
	.no-maps-mini .logohref{padding-top:0!important;}\.skunk-head{display:inline-block;width:100%;background-color:#f5f5f5;}\
	h1 a:link{color:rgb(255, 255, 255);text-indent:-999em!important;}\
	.gbem#gbql,.gbemi#gb #gbql,.gbes#gbql,.gbesi#gb #gbql{background-position:0 -5px;height:38px;width:115px;margin-left:-8px;margin-bottom:-10px;}\
	.micon{margin-left:1.8em;}\.tbo #gb_1,.sfbg,.sfbgg{background:transparent!important;border-bottom:0;}\
	#nqsbq{border:1px solid #ccc;padding:1px;}\#center_col div,#leftnav div{line-height:1.3;}\#xjs{display:block;margin-left:-10px!important;}\
	.bkgi div{width:553px!important;}\.jhp .tsf-p{margin-right:0!important;}\
	div#Res{margin-top:0!important;}\#gbz li,#gbg li{margin-right:3px;}\
	#bfl{margin-left:0!important;}\	.ksfccl,#sflas{margin-left:4.3em!important;}\
	#fll{margin-left:0!important;}\	p > ul li {font-size:70%!important;}\
	#fblrss1 img{vertical-align:top!important;padding-top:1px;}\
	#whv_{text-decoration:none;margin-top:1.2em;}\.tbos{clear:both;margin-left:0;}\
	#img_1{margin-top:.2em!important;}\#tbpi,.tbt,.tbou{margin-top:.3em!important;}\
	#tbtro{display:block;margin-top:1.8em!important;clear:both!important;}\
	#showmodes{float:left;margin-bottom:.5em;font-style:oblique;}\
	.lnsep{visibility:hidden;float:left;margin-bottom:.5em;margin-top:.5em;}\
	#topstuff{display:block;clear:both;margin-left:-.55em;margin-top:1.2em!important;margin-bottom:-.5em!important;}\
	#topstuff,#botstuff{font-size:105%;}\#pslocdisp{margin-bottom:-6em;}\
	#pslocform,#taw{display:block;width:553px!important;padding-top:0;padding-bottom:2.5em!important;}\
	#taw{margin-top:-1.4em!important;width:553px!important;}\
	.nwd{display:block;margin-bottom:-3em;}\#fblmi{margin-right:-3.5em!important;}\
	.kvm{margin-bottom:.5em;clear:both;}\#tads{display:block;margin-bottom:1em!important;}\
	#rhs_block h2{padding-bottom:2em!important;}\cite,.kvm,.kv a,.bc a{color:#2A5DB0!important;}\
	#ptst_ai{clear:both;padding-bottom:2em;}\#rso{clear:both;margin-top:.5em!important;display:block;}\
	#sblsbb{display:block;margin-top:.3em;}\#sbds #sblsbb{margin-top:0!important;}\
	#newsbox .r{padding-top:.5em!important;padding-bottom:.5em!important;}\
	.nasld{margin-top:0!important;margin-left:.2em;padding-bottom:1em;}\
	.psot{padding-top:.5em;padding-bottom:.5em;}\#gbqff{max-width:471px!important;min-width:471px!important;}\
	#tbbc{display:block!important;background:none!important;padding:0!important;padding-top:.2em!important;margin-bottom:1em!important;}\
	#sftr{margin-top:0;width:101%!important;}\.r span{font-size:85%;}\
	.ti b span{font-size:90%!important;}\.ti span span{font-size:90%!important;}\
	.std img{margin-top:2px!important;}\table.ti{display:inline-table;margin-top:-11px!important;}\
	.obp{margin-bottom:26px!important;}\.r a{font-size:100%!important;text-decoration:underline!important;}\
	.e .ti{color:#2200C1!important;}\h3.r{text-overflow:ellipsis-word!important;}\
	.e .r{display:block;margin-top:0!important;}\#cttpd{margin-top:1.8em;height:55px!important;}\
	.tqref{margin-bottom:2em;font-size:80%;}\
	#prs{margin-top:-.1em!important;margin-bottom:2em;font-size:80%;}\
	#mss{margin-top:0!important;}\.ng{padding-right:.2em!important;font-size:85%;}\
	#botstuff nobr{margin:0;padding:0;}\#mss_col{font-size:80%!important;}\
	#brs{display:block;clear:both!important;margin-top:-1em!important;margin-bottom:2em!important;}\
	#smc,#smb{border:0!important;}\#smc{display:block;margin-left:12em!important;}\
	#smc,#smb,.sld,.vsc.div.st,.nv-152093521377474139{border:0!important;}\
	#botstuff{clear:both!important;margin-bottom:0!important;margin-left:-.5em!important;}\
	.med p {margin-top:.5em!important;padding-top:0!important;font-size:1.05em!important;}\
	.med .med{display:inline-block!important;margin-top:1em!important;padding-top:0!important;padding-right:.3em!important;margin-bottom:.5em!important;}\
	#topstuff div.nasld {display:block;position:static; margin-top:-3.5em!important;}\
	#botstuff .med{margin-top:1em!important;margin-bottom:0!important;}\
	#botstuff div p{font-size:100%!important;}\#res{display:block;margin-top:-3.3em!important;}\
	#brs > .med{display:block!important;clear:both!important;}\
	#left-nav-wrapper{margin-left:-1em;margin-top:-.2em!important;}\
	.tl .r{display:block;margin-top:.5em!important;}\
	#brs ul{list-style-type:none!important;}\.dir-sub-cntn{position:static!important;height:20px!important;}\
	#d_launch{display:inline-block;margin-top:1.2em!important;}\.header-buttons{padding-top:13px!important;}\
	#appbar_b,#kd-googlebar{display:none!important;}\
	.kd-appbar{visibility:hidden;height:0!important;}\
	.hp .kd-appbar{display:block;visibility:visible!important;padding-top:1em!important;}\
	.pinning-enabled .kd-appbar{visibility:visible!important;height:1em!important;}\
	.in-header{display:block!important;margin-top:-2.5em!important;}\
	#main-wrapper{margin-top:2em!important;}\#cnt #center_col,#center_col,#cnt #foot,#cnt .ab_center_col{max-width:553px!important;}\
	.psli{width:810px!important;}\#topads_contents,#bottomads_contents{margin-left:1.3em!important;}\
	#ires{display:block;margin-left:-.5em;padding-top:3px!important;margin-top:0!important;padding-bottom:.5em;}\
	.ab_ps_pic,#ab_ps_c,#ab_ctls,#sslock,.ab_name,.ab_center_col{}\
	.ibk, .cpb, .ksb{line-height:2.5!important;}\	#resultStats{clear:both;background:white!important;margin-top:-3.6em!important;left:-7px!important;color:#000;font-size:85%;text-align:left;font-style:oblique;padding-top:0;}\
	.sel{margin-left:.3em;font-size:1.2em!important;}\#appbar{border:0!important;height:.1em!important;}\
	#appbar > div{border:0!important;height:.1em!important;}\
	#arcntc,#rcnt{top:-17px!important;}\
	.fjfe-bodywrapper #appbar,.fjfe-bodywrapper #appbar div{height:2.5em!important;}\
	.kv cite:after,.vshid:after{content: ".."!important;color:#fff!important;}\
	.vshid{display:inline-block!important;}\
	.persistentblue span{display:block;margin-left:8px!important;}\
	.nv-FRONTPAGE span{margin-left:3px!important;color:#000!important;}\
	.nv-FRONTPAGE{padding-bottom:1em!important;}\.topic{padding-top:5px!important;padding-bottom:5px!important;}\
	.persistentblue{border-bottom:1px solid#ddd!important;}\.g-first div,.g-first ul li{line-height:2!important;}\
	.vspib{top:1em;left:40em;}\
	.tal div.vspib,.tam div.vspib,.taf div.vspib,.tas div.vspib{margin-top:0!important;left:39.3em;}\
	.vsc .vsta{top:-1em!important;left:-40em!important;}\
	#fll>a:last-of-type,.header-bar{display:none!important;}\.left-mod-container{margin-top:1px!important;}\
	div#gbz > ol > li:first-child > a#gb_119,#lc,#ab_name,.kd-appname{display:none!important;}\
	#tbt5{margin-left:-.6em!important;}\#center_col > #rho{margin-left:15%!important;}\
	.spell_orig,.spell_orig a,.st em{color:#000!important;}\.sp_cnt{font-size:80%!important;}\
	#botstuff p {font-weight:normal!important;}\#botstuff li a{font-size:.9em!important;}\
	#topstuff > div {margin-bottom:1em!important;}\#gbu{display:block;top:-1.5em!important;z-index:1005!important;right:0!important;}\
	.gecko #gbu,#body #gbu,.jfk-scrollbar #gbu,.hp #gbu,.pinning-enabled #gbu,.gc #gbu,.fjfe-bodywrapper #gbu,.loc-en #gbu,.dragdrop-boundary #gbu,.gC #gbu,.kui #gbu,.qp #gbu,.e_sm #gbu,.K1XLjb #gbu,.inHBkf #gbu{display:block!important;padding-top:0!important;top:.1em!important;z-index:1005!important;}\
	li.gbt:nth-of-type(5),span.gbsup{display:none!important;}\#gbgs4{border:0!important;background:transparent!important;}\.vsh #gbq,.tbo #gbq{max-width:712px!important;}\
	#qbc .lst-d{display:block;padding:1px!important;margin-bottom:2px!important;border:1px solid#ddd!important;}\
	.sp_cnt a:link{text-decoration:underline;font-style:italic;}\#ab_ctls{display:block!important;top:-48px!important;margin-right:-5px!important;}\
	#ab_ctl_ps,#ab_ctl_ss,#abar_ps_on,#abar_ps_off,#abar_button_ss,.ab_ctl,.ab_button,.left .kbtn-small,.selected{margin:0!important;padding:0!important;}\
	#gbgs4 #gbi4i{border:1px solid #ccc!important;}\.left,.right,.ab_button,#abar_ps_on,#abar_ps_off{border:0!important;background:transparent!important;}\
	.vsh #ss-status,#abar_button_ss{padding:0!important;margin:0!important;}\
	.brs_col p{font-size:.9em!important;margin-left:2px!important;}\#ss-status u,#gbg6{display:none!important;}\
	#gbqfbw{margin:0!important;margin-left:7px!important;display:inline-block!important;}\
	#gbu span#gbi1a,#gbu #gbgs3,#gbu #gbg4,#gbi4id,#gbi4i,#gbgs4{display:block!important;max-height:24px!important;height:24px!important;}\
	#topstuff > p{margin-top:-3.1em!important;padding-bottom:.5em!important;}\
	#gbu .gbmc,#gbu #gbd1,#gbu #gbd3{border:0!important;height:0!important;display:inline!important;}\
	#nycp{border-top:1px solid #eee!important;}\#bb_pp_tos_ack,#pmocntr2,.infomsg{display:none!important;}\
	';
	document.getElementsByTagName('head')[0].appendChild(newStyle);