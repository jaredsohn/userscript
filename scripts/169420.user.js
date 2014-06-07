// ==UserScript==
// @name           Old Google
// @namespace      http://userscripts.org/scripts/show/29285
// @description    Out with the new, in with the old Google
// @include        http*://*.google.*/*

// ==/UserScript==

var googleLogo = document.getElementsByTagName("img");
for (var i=0; i <= googleLogo.length; i++) {
	if (googleLogo[i] && googleLogo[i].alt == "Google") {
		googleLogo[i].src="http://upload.wikimedia.org/wikipedia/commons/5/51/Google.png";
                googleLogo[i].width="310";
	}
}
// @name           Google Bar Classic Redone v.2.21
// @namespace      restoring google's classic look
// @description    Old-fashioned Google top and side bars and much more!
// @contributor    Matagus (https://addons.mozilla.org/en-US/firefox/addon/google-no-tracking-url/)
// @version        2.21
// @license        MIT License
// @include        http://*.google.*
// @include        http://google.*
// @include        https://*.google.*
// @include        https://google.*
// @include        http://*.google.tld/*
// @include        https://*.google.tld/*
// @include        http://google.tld/*
// @include        https://google.tld/*
// @include        *://*.google.com/search*
// @include        *://*.google.com.*/search*
// @grant          none

// ==/UserScript==
    var newStyle = document.createElement('style');
    newStyle.type = 'text/css';
    newStyle.innerHTML = '\
    #gbx1,#gbx2{height:0!important;background-color:transparent;border-bottom:0!important;}\
	#gbx3,#gbx4{line-height:2;height:29px!important;color:black;background-color:#fff!important;border-bottom:0!important;background:url(//ssl.gstatic.com/gb/images/b_8d5afc09.png) 0 -138px!important;}\
	.gbts,span.gbts{height:29px!important;line-height:2!important;color:#2A5DB0;background-image:none!important;}\
    .gbmt-hvr{height:27px!important;}\
	#gbztms.gbts.gbtsa:hover{background-color:white!important;height:27px!important;}\
	.gbmpiw .gbmt-hvr{height:15px!important;}\
	#gb_1,.gbz0l{height:27px!important;}\
	.gbtsa,#whv_{text-decoration:none;}\
	#gbz .gbz0l .gbts,#gbz .gbzt-hvr,#gbz .gbzt:focus,#gbz .gbgt-hvr,#gbz .gbgt:focus,.nv-FRONTPAGE span,.spell_orig,.spell_orig a,.st em,.ng,.didyou,#gs_gb_lt,#gs_gb_lt a:hover,#gs_gb_lt a:focus,#gs_gb_lt a:active,#gs_gb_rt a:hover,#gs_gb_rt a:focus,#gs_gb_rt a:active{color:#000!important;}\
	.gbz0l .gbtb2,.gbp1{border-top:2px solid #1a54e1!important;}\
	.gbts,span.gbts,.gbmt,#gbi4s1{font-weight:normal!important;}\
	#gbz .gbto .gbts,#gbd a.gbmt,li.gbmtc,#gbztms1,.fjfe-nav-selected,.g-first div,h2.appname,#gbztm,#gbi4t:first-of-type,#gbd,.ab_button span,span#gbgs4dn,cite,.kvm,.kv a,.bc a,.ab_dropdownlnk,.ab_dropdownlnk div,.gbqfbb{color:#2A5DB0!important;}\
	.gbz0l .gbts{text-decoration:none;color:#000;font-weight:bold!important;line-height:23px!important;}\
	#gbz .gbzt,#gbz .gbgt,#gbg .gbgt{color:white;}\
	#gbz li,#gbg li{margin-right:3px;}\
	.gbmt-hvr,.gbz0l,.gbzt-hvr,.ab_dropdownlnk:hover,.ab_dropdownitem:hover,.gsq_a td:hover,.gbqfsf:hover{background:#ecf0f8!important;}\
	.gbzt:focus,.gbgt-hvr,.gbgt:focus{background-color:transparent;background-image:none;height:29px;border:0!important;}\
    .tbo.vsh #top_nav{display:none!important;}\
	#leftnav h2,#showmodes,.msm,span.msl,.tbos,.tbots,.tbotu,.tbt li,.sel span,#lc a,.tbou > a.q,#tbpi,#tbtro,.tbt label,#prc_opt,#set_location_section a,.tbtctlabel,#swr a,.msel,.mitem > .kl, #ms > .kl,.e .ti{color:#2200C1;}\
	#leftnav h2,#leftnav .kls{font-weight:bold;}\
	#leftnav{margin-top:0;width:125px;margin-right:0;}\
	#leftnav .kl,#leftnav .kls{display:inline-block;position:static;margin-bottom:inherit;margin-top:inherit;}\
	.mitem{margin-bottom:-.4em;}\
	li.mitem:hover,nojsb:hover,mitem:hover,.kl:hover,.kls:hover{background:#fff!important;color:#2200C1;text-decoration:underline;}\
	.micon{margin-left:1.8em;}\
	#showmodes{float:left;margin-bottom:.5em;font-style:italic;}\
	.lnsep{visibility:hidden;float:left;margin-bottom:.5em;margin-top:.5em;}\
	.errortips{margin-top:1em;padding-right:5px;}\
	#gbmm{width:102.5%!important;}\
	input.gbqfif{margin-left:-6px!important;}\
	.gbqfsf table{padding-left:0!important;margin-left:-6px!important;}\
    #tsf div table,#gbqff{max-width:471px!important;min-width:451px!important;}\
	#gbqfbw{margin:0!important;margin-left:7px!important;display:inline-block!important;}\
	.gbqfbb,#gb_71,.gbgs{background:transparent;border:0;color:#2A5DB0;font-weight:normal;}\
	.gbgs{display:block;margin-right:-1em!important;}\
	#logo img,.lsbb{background-color:transparent!important;}\
	#c-doc #logo,.scheme7 #logo,#gc-header #logo,#g{margin-top:-5px;}\
	.glogo{margin-left:1em;}\
	.header-logo,#google-bar,.google-header-bar,#maia-header{background:none!important;border:0!important;}\
	.skunk-head{display:inline-block;width:100%;background-color:#f5f5f5;}\
	.vsh h1 a:link,.tbo h1 a:link{color:rgb(255, 255, 255);text-indent:-999em;}\
	.vsh #logocont{max-height:142px;}\
	#gs_gb,#gbq,#gb,div.mgoh-header,.play-bar,.play-bar-container,#play-header,#nhdrwrap{background-color:white!important;border-bottom:0;}\
    .vsh #gbq,.tbo #gbq{max-width:672px;}\
	#gbq1{left:0;background:url(//ssl.gstatic.com/gb/images/j_e6a6aca6.png);background-repeat:no-repeat;background-position:-45px 0;top:1.2em;height:45px;width:115px;opacity:1!important;}\
    .tbo.vsh #logocont{left:9px!important;background:url(//ssl.gstatic.com/gb/images/j_e6a6aca6.png);background-repeat:no-repeat;top:0;background-position:-242px 0px;opacity:1!important;width:94px!important;padding:0!important;}\
	.jfk-scrollbar #gbqlw,.wIa #gbqlw,#gbqlw,.gC #gbqlw,.no-maps-mini #gbqlw,.fjfe-bodywrapper #gbqlw,.nojsv img{opacity:0!important;}\
	.jfk-scrollbar #gbq1,.wIa #gbq1,.gC #gbq1,.no-maps-mini .gbt#gbq1,.fjfe-bodywrapper .gbt#gbq1{display:block;left:0;background-repeat: no-repeat;background-position:-242px 0;height:35px;width:94px;}\
	.gbt#gbq1,.tbo #gbq1,.hp #gbq1,.K1XLjb #gbq1,.jfk-scrollbar #gbq1{left:0;}\
	.tbo #gbq1{left:0px;}\
	#gbu{display:block;top:-1.5em!important;z-index:1005;right:0!important;}\
	.kui .small #gbu,.jfk-tiny #gbu{left:95%!important;}\
	.wIa #gbu,.me #gbu,.gecko #gbu,#body #gbu,.jfk-scrollbar #gbu,.hp #gbu,.qp #gbu,.pinning-enabled #gbu,.gc #gbu,.fjfe-bodywrapper #gbu,.loc-en #gbu,.dragdrop-boundary #gbu,.gC #gbu,.kui #gbu,.e_sm #gbu,.K1XLjb #gbu,.inHBkf #gbu,.Co6tNc-purZT #gbu{top:2em!important;}\
	#gbu .gbmc,#gbu #gbd1,#gbu #gbd3{border:0;height:0!important;display:inline;}\
	#gbu span#gbi1a,#gbu #gbgs3{display:block;max-height:24px;}\
	#ab_ctls{display:block;top:-52px!important;margin:0 auto!important;}\
	#ab_ctl_ps,#ab_ctl_ss,#abar_ps_on,#abar_ps_off,.left .kbtn-small,#botstuff nobr{margin:0!important;}\
	.tbo #abar_ps_on,.tbo #abar_ps_off{padding-left:3px!important;padding-right:3px!important;}\
	.ab_icon{background:url(//ssl.gstatic.com/gb/images/b_8d5afc09.png)no-repeat!important;display:inline-block;opacity:1!important;vertical-align:middle;	background-position:-6px -22px!important;height:17px;margin-top:-3px!important;width:17px!important;}\
	#abar_button_ss *{background-image:none!important;}\
	#ss-status{width:120px!important;white-space:pre!important;}\
	#gbgs4 span#gbi4id{border:1px solid #ccc;}\
	#gbi5{background-position:-6px -22px;}\
	span#gbgs4{height:25px!important;}\
	.gC .gbg4p{margin-top:-2px;}\
	.vsh #gb_1{background:auto;}\
	.sfbg,.sfbgg{background:transparent;border-bottom:0;}\
	.header-buttons{padding-top:13px;}\
	.kd-appbar{visibility:hidden;height:0;}\
	#topabar > div{height:0;border:0;}\
	.hp .kd-appbar{display:block;visibility:visible;padding-top:1em;}\
	.pinning-enabled .kd-appbar{visibility:visible;height:1em;}\
	.appbar-snippet-primary span{display:block;margin-top:4px;}\
	.appbar-snippet-secondary span{display:block;margin-top:6px;}\
	.fjfe-bodywrapper #appbar,.fjfe-bodywrapper #appbar div{height:2.5em;}\
	.in-header{display:block;margin-top:-2.5em;}\
	#nqsbq{border:1px solid #ccc;padding:1px;}\
	#center_col div,#leftnav div,.ksb,.kpgb,.cpss.,ksb.gb-button{line-height:1.3!important;}\
	#center_col > #rho{margin-left:15%!important;}\
	.bkgi div{width:553px;}\
	.jhp .tsf-p{margin-right:0;}\
	#tbtro{display:block;margin-top:1.8em;clear:both;}\
	#topstuff{display:block;clear:both;margin-top:1.2em;margin-bottom:-1em;}\
	#topstuff div.nasld{display:block;position:static;padding-top:.3em!important;}\
	#topstuff > div{margin-bottom:1em;}\
	#topstuff > p{padding-top:.5em!important;}\
	#topstuff,#topstuff .ssp,.med .ssp,.med .sp_cnt,.med > #mss{margin-left:-.5em;}\
	#pslocdisp{margin-bottom:-6em;}\
	#pslocform,#taw{display:block;width:553px;padding-top:0;padding-bottom:2.5em;}\
	#taw{padding-bottom:.5em;margin-top:-1.4em;}\
	.nwd{display:block;margin-bottom:-3em;}\
	#fblmi{margin-right:-3.5em;}\
	.kvm{margin-bottom:.5em;clear:both;}\
	#tads{clear:both!important;padding-bottom:1.4em!important;width:87%;}\
	#topads_contents,#bottomads_contents{margin-left:1.3em;}\
	#center_col .c{margin-left:0;width:92.5%;}\
	#center_col .c{clear:both!important;margin-bottom:2em!important;}\
	#center_col .c#tadsb{margin-top:-1em;margin-bottom:2em;margin-left:0;}\
	#trev div{display:block;margin-top:4.1em;}\
	#mbEnd{margin-left:5px;}\
	#ptst_ai{clear:both;padding-bottom:2em;}\
	#rso{clear:both;margin-top:1em;display:block;}\
	#sblsbb{display:block;margin-top:.3em;}\
	.nasld{margin-top:0;margin-left:.2em;padding-bottom:1em;}\
	.psot{padding-top:.5em;padding-bottom:.5em;}\
	#tbbc{display:block;padding-left:0;background:none!important;margin-bottom:2em!important;margin-left:-8px;}\
	#taw .std{display:inline-block;padding-left:0;background:none!important;margin-bottom:0;}\
	#sftr{margin-top:0;width:101%;}\
	.ksfccl,#sflas{margin-left:4.3em;}\
	p > ul li {font-size:70%;}\
	#fblrss1 img{vertical-align:top;padding-top:1px;}\
	#whv_{margin-top:1.2em;}\
	.tbos{clear:both;}\
	#img_1{margin-top:.2em;}\
	#tbpi,.tbt,.tbou{margin-top:.3em;}\
	.r span,#resultStats{font-size:85%;}\
	.gbqfbb,#gb_71,.gbgs,.ti b span,.ti span span{font-size:90%;}\
	.std img{margin-top:2px;}\
	#GOOG_finance_chart{padding-top:4px;}\
	.obp{margin-bottom:26px;}\
	.r a{text-decoration:underline;}\
	h3.r{text-overflow:ellipsis-word;}\
	#cttpd{margin-top:1.8em;height:55px;}\
	.tqref{font-size:80%;}\
	.e .r,#sbds #sblsbb,#mssp,.ssp,#brs,#ires{margin-top:0;}\
	#center_col #topstuff .med .med{display:inline-block;margin-top:0;padding-top:0;padding-right:.3em;}\
	#res{display:block;margin-top:-3.3em;}\
	#rcnt{top:-17px;}\
	.tbo.vsh .lshdr div{z-index:101;}\
	#res p.std {margin-top:-.1em;}\
	#prs{margin-left:.1em;margin-top:-.1em;margin-bottom:2em;}\
	.spell,.spell_orig{padding-right:.2em;}\
	.mss_col p,.ssp,.spell_orig{display:inline-block;padding-bottom:1em;}\
	.sp_cnt a:link{text-decoration:underline;font-style:italic;}\
	.ng{padding-right:.05em;padding-top:.4em;}\
	.brs_col p,#prs,.ng,.mss_col,#center_col .med p, #center_col .med ul,.sp_cnt,#botstuff .med,#botstuff li a{font-size:95%;}\
	#brs,#brs > .med{clear:both;}\
	.e .r,#brs,#brs > .med,#brs .med .med,.persistentblue span{display:block;}\
	#brs ul{list-style-type:none;}\
	.brs_col p{margin-left:2px;}\
	#smc{display:block;margin-left:12em;}\
	#smc,#smb,.sld,.vsc.div.st,.nv-152093521377474139,#latitude-app-bar{border:0;}\
	#botstuff{clear:both;margin-bottom:0;margin-left:-.5em;}\
	.r a,.spell,#botstuff div p,#tbt5 h3{font-size:100%;}\
	#botstuff .med{margin-top:1em;margin-bottom:0;}\
	#botstuff i{font-style:normal;}\
	.tl .r{display:block;margin-top:.5em;}\
	.dir-sub-cntn{position:static;height:20px;}\
	#d_launch{display:inline-block;margin-top:1.2em;}\
	#main-wrapper{margin-top:2em;}\
	#cnt #center_col,#center_col,#cnt #foot,#cnt .ab_center_col{max-width:95%;}\
	.psli{width:810px;}\
	#ires{display:block;width:533px;margin-left:-.5em;}\
	#resultStats{top:-1.5em!important;left:-7px;color:#000;font-style:italic;}\
	.Co6tNc-hJDwNd{background:transparent;border:0;}\
	.Xeb,.XUa{background:#f0f0f0;border:1px solid #d0d0d0;bottom:2em;}\
	.ZaPDOe {padding-left:0px!important;}\
	.sel{margin-left:.3em;font-size:125%;}\
	.kv cite:after,.vshid:after{content: "..";color:#fff;}\
	.vshid{display:inline-block;}\
	.ibk,.cpb,#rhs .ibk,#rhs .cpb,#rhs .ksb,#rhs .kpgb,#rhs .cpss{line-height:2.5;}\
	#taw .std,.tbos,#bfl,#fll,.tbo #topstuff .ssp,.tbo .med .sp_cnt,.flt-actionblock,.esw{margin-left:0;}\
	#left-nav-wrapper{margin-top:-.2em;}\
	.nv-FRONTPAGE{padding-bottom:1em;}\
	.topic{padding-top:5px;padding-bottom:5px;}\
	.persistentblue{border-bottom:1px solid#ddd;}\
	.g-first div,.g-first ul li{line-height:2;}\
	#nycp{border-top:1px solid#e6e6e6;}\
	.vspib{top:0;left:40em;}\
	.c .vspib{left:39.3em;}\
	.nrgt .vspib{left:18em;}\
	.tal div.vspib,.tam div.vspib,.taf div.vspib,.tas div.vspib{margin-top:0;left:39.3em;}\
	.vsc .vsta{top:-1em;left:-40em;}\
	.sld{display:inline-block;margin-right:.6em;}\
	.left-mod-container{margin-top:1px;}\
	#tbt5{margin-left:-.6em;}\
	#qbc .lst-d{display:block;padding:1px;margin-bottom:2px;border:1px solid#ddd;}\
	a:visited{color:#9F3941;}\
	#prm, #prm font,#prm p,.gbtb2,#gb_23.gbzt.gbz0l.gbp1,.gbqfh#gbq1,#appbar_b,#kd-googlebar,#fll>a:last-of-type,.header-bar,div#gbz > ol > li:first-child > a#gb_119,#lc,#ab_name,.kd-appname,.gC #gbvg li.gbt:nth-of-type(5),span.gbsup,.gbmh,#ss-status u,#gbg6,#gb_78.gbzt{display:none!important;}\
	#bb_pp_tos_ack,#pmocntr2,.infomsg,.jfk-butterBar.jfk-butterBar-info.jfk-butterBar-shown,#pushdown{display:none!important;}\
	';
	document.getElementsByTagName('head')[0].appendChild(newStyle);	
	
    var resultLinks = document.querySelectorAll("#search ol li a");
    var forEach = Array.prototype.forEach; // see https://developer.mozilla.org/en/DOM/NodeList
    var removeRedirects = function (resultLinks) {
    forEach.call(resultLinks, function(link){
    link.removeAttribute("onmousedown");
    });
    };
    removeRedirects(resultLinks);  
    var main = document.querySelector("#main");
    if (main) {
    main.addEventListener("DOMSubtreeModified", function(n) {
    var resultLinks = document.querySelectorAll("#search ol li a");
    removeRedirects(resultLinks);
    });
    }