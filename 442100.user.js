// ==UserScript==
// @name           Google Redone  
// @namespace      alpha
// @description    redesigns page (1st license), restores sidebar (2nd license), stops redirects (under original copyright; used w/permission)
// @contributor    Matagus (https://addons.mozilla.org/en-US/firefox/addon/google-no-tracking-url/)
// @contributor    100の人 (http://userstyles.org/styles/78857/google#view-code) - see second @license for distro info
// @version        4.0
// @license        MIT License
// @license        http://creativecommons.org/licenses/by-nc-sa/3.0/ Creative Commons Attribution 3.0 Unported License
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
// @exclude        https://www.google.com/webhp?hl=en&tab=vv&ei=GZkKU8_zBIXIyAG6moDIBQ&ved=0CBQQ1S4#hl=en&q=google&tbm=shop
// @exclude        *://*.google.com/flights*
// @exclude        https://news.google.com/
// @exclude        https://news.google.com/news?pz=1&hl=en&tab=nn
// @exclude        http://groups.google.com/
// @exclude        https://groups.google.com/forum/#!overview
// @grant          none
    
// ==/UserScript==
    var newStyle = document.createElement('style');
    newStyle.type = 'text/css';
    newStyle.innerHTML = '\
    #gbx1,#gbx2{height:0!important;background-color:transparent;border:0!important;}\
    #gbx3,#gbx4{line-height:2;height:29px!important;color:black;background-color:#fff!important;border:0!important;background:url(//ssl.gstatic.com/gb/images/b_8d5afc09.png) 0 -138px!important;}\
    .gbts,span.gbts{height:29px!important;line-height:2!important;color:#2A5DB0;background-image:none!important;}\
    #gb_1,.gbz0l{height:25px!important;}\
    #gbztms{padding-top:1px!important;}\
    #gbztms.gbts.gbtsa:hover{background-color:white!important;}\
    .gbmpiw .gbmt-hvr{height:15px!important;}\
    .gbtsa,#whv_{text-decoration:none;}\
    #gbz .gbz0l .gbts,#gbz .gbzt-hvr,#gbz .gbzt:focus,#gbz .gbgt-hvr,#gbz .gbgt:focus,.nv-FRONTPAGE span,.spell_orig,.spell_orig a,.st em,.ng,.didyou,#gs_gb_lt,#gs_gb_lt a:hover,#gs_gb_lt a:focus,#gs_gb_lt a:active,#gs_gb_rt a:hover,#gs_gb_rt a:focus,#gs_gb_rt a:active{color:#000!important;}\
    .gbz0l .gbtb2,.gbp1{border-top:2px solid #1a54e1!important;}\
    .gbts,span.gbts,.gbmt,#gbi4s1{font-weight:normal!important;}\
    #gbz .gbto .gbts,#gbd a.gbmt,li.gbmtc,#gbztms1,.fjfe-nav-selected,.g-first div,h2.appname,#gbztm,#gbi4t:first-of-type,#gbd,.ab_button span,span#gbgs4dn,cite,.kvm,.kv a,.bc a,.ab_dropdownlnk,.ab_dropdownlnk div,.gbqfbb,a.q,.qs,#hdtb_more,#hdtb_tls,.hdtb-mn-hd,#qdr_,#whv_,.hdtbSel,#cdrlnk,.fmob_title,span.vk_bk,.vk_txt div,.vk_ftr a:link,.mini,.kno-ecr-pt,.abupt,.abupst,div.lxhdrtxt.ellip,lxhdrtxt.ellip b,a#lxshow_filters.ksb.ab_button.ellip,div.lxhdrtxt.ellip,lxhdrtxt.ellip b,.kltat,.lxhdrbox.ellip{color:#2A5DB0!important;}\
    .gbtc{max-height:29px!important;}\
    .gbz0l .gbts{text-decoration:none;color:#000;font-weight:bold!important;}\
    #gbz .gbzt,#gbz .gbgt,#gbg .gbgt{color:white!important;}\
    #gbz li,#gbg li{margin-right:3px;}\
    .gbmt-hvr,.gbmtc a:hover,.gbz0l,.gbzt-hvr,.ab_dropdownlnk:hover,.ab_dropdownitem:hover,.gsq_a td:hover,.gbqfsf:hover,#hdtb_more_mn a.q.qs:hover,.hdtbItm a.q.qs:hover,.hdtbItm.hdtbSel:hover,#cdrlnk:hover,.hdtbItm .fl:hover,.gbqfbb:hover,a#kxsb.ksb.ab_button:hover,a#abar_button_opt.ab_button:hover,a.kloptd.kloptd-sl:hover,a.kloptd.kloptd:hover,.klitem:hover,span.gbts:hover,.gbzt:hover{background:#ecf0f8!important;}\
    span.gbgs,span.gbgs:hover{background:none!important;padding-right:1em!important;}\
    .gbzt:focus,.gbgt-hvr,.gbgt:focus{background-color:transparent;background-image:none;height:29px;}\
    #epbar{display:block;margin-top:4.5em!important;}\
    .cv_v.vk_gy.vk_c._o{margin-left:.5em!important;}\
	.cv_v{margin-left:-1.2em!important;}\
    #fmob_cb_container{display:block;margin-left:-1em!important;}\
    .fmob_pl.vk_h{margin-left:.1em!important;}\
    .fmob_title{text-decoration:underline!important;text-transform:uppercase!important;line-height:2!important;}\
    .fmob_title{display:inline!important;padding-left:.05em!important;padding-right:.5em!important;}\
    .cv_cb{display:block;margin-top:-.5em!important;}\
    .fmob_rd_ct{display:block;margin-top:-1.7em!important;}\
    .fmob_rd_ct.vk_txt{margin-top:-1.2em!important;}\
    span.vk_bk,span.vk_gn,div.vk_h.fmob_title,.fmob_rd_it div,.vk_rd{font-weight:bold!important;}\
    span.vk_gn,.vk_rd{color:#008048!important;}\
    .cv_ch{color:#000!important;}\
    .cv_ch span{color:#666!important;}\
    span.vk_gn,.vk_rd,.cv_ch.vk_sh div,.cv_ch.vk_sh div span{font-size:110%!important;}\
    .vasq .rhsvw,.vasq .kp-blk,.vasq .g.g-blk,.vasq .kp-blk.rhsvw.vk_rhsc.vk_c{margin-top:2em!important;}\	.vk_c,#cwmcwd.vk_c,.vk_cxp,div.cv_v,.vk_ans,.vk_c.vk_gy.vk_sh,.vk_cxp.vk_gy.vk_sh,#wob_wc.vk_c,ol.dict,.rhsvw.vk_rhsc,#knop,.kno-mc,a#lxshow_filters.ksb.ab_button.ellip,#lxhdr .ab_button{box-shadow:none!important;}\
    .vk_c,.vk_cxp,#cwmcwd.vk_c,.vk_cxp,#wob_wc.vk_c,ol.dict,.knop.kno-fb-ctx.kno-ma,.s.rbt,#qbc .lst-d,a#lxshow_filters.ksb.ab_button.ellip,#lxhdr .ab_button{border:1px solid#e4e4e4!important;}\
    .vk_c{max-width:100%!important;margin-left:0!important;}\
    .g.tpo.knavi.obcontainer{margin-left:-.3em!important;top:0!important;}\
    .mod.g.tpo.knavi.obcontainer{margin-left:-.3em!important;}\
    .s.rbt{margin-left:0!important;}\
    .vk_cxp.vk_gy.vk_sh{margin-left:0!important;}\
    .cv_v.vk_gy.vk_c{margin-top:0!important;}\
    ol.dict{margin-left:-.5em!important;}\
    ol.dict td{padding-left:1.4em!important;}\
    li.g.tpo{margin-left:0!important;display:block!important;}\
    li.g.no-sep.tpo{max-width:98%!important;margin-top:2.5em!important;}\
    .g.no-sep .vk_c img#lu_map{margin-left:.4em!important;margin-top:.7em!important;}\
    .dir img#lu_map{padding-top:1em!important;height:186px!important;}\
    .obcontainer td,.s.rbt div h3.r,.s.rbt div.a{padding-left:.5em!important;}\
    .e.obp{margin-left:0!important;clear:both!important;}\
    .e.obp td{padding:0!important;}\
    .obp div:not(:last-child){font-size:98%!important;margin-top:1.4em!important;}\
    ._x.flt-actionblock,.flt-actionblock{margin-left:0!important;}\
    .flt-dates{max-width:96.5%!important;}\
    .flt-airlinelist{max-width:90%!important;padding-right:2em!important;}\
    table.ts td{padding:0 10px!important;font-size:95%!important;}\
    .currency .vk_ans{clear:both!important;padding-top:1em!important;padding-bottom:0!important;}\
    .currency select{padding-top:.5em!important;padding-bottom:.5em!important;}\
    div.s{display:block;margin-left:0!important;}\
    img#lu_map{margin-left:1em!important;}\
    #kno-result{margin-top:-1.4em!important;}\
    .knop{display:block;margin-top:1.3em!important;}\
    .kno-fs.ts td div{margin-left:-.4em!important;}\
    .rhsvw.vk_rhsc,#knop,.kno-mcl{left:0!important;}\
    #rhscol{display:block;position:static;margin-top:2.5em!important;}\
	#rhs{left:1.7em!important;right:.6em!important;}\
    #kno-result{margin-top:3.5em!important;}\
    #lu_pinned_rhs{display:block;margin-top:0!important;}\
    img#lu_map{width:94%!important;}\
    .ibk,.cpb,#rhs .ibk,#rhs .cpb,#rhs .ksb,#rhs .kpgb,#rhs .cpss{line-height:2.5!important;}\
    .knop.kno-fb-ctx.kno-ma{top:-2.4em!important;}\
    #topstuff{display:block;clear:both;}\
    #topstuff div.nasld{display:block;position:static;padding-top:1.8em!important;}\
    #topstuff > div{margin-bottom:1em;}\
    #topstuff > p{padding-top:.5em!important;}\
    #topstuff p:first-of-type{padding-top:1.5em!important;}\
    #topstuff .ssp,.med .ssp, .sp_cnt,.med > #mss{margin-left:-.55em!important;}\
    .med .med{margin-bottom:0!important;}\
    .nasld{margin-top:1.8em;margin-left:0;padding-bottom:0;}\
    div#ifbc.prc{margin-left:-1.55em!important;}\
	#top_nav{position:absolute;min-width:0!important;width:138px;top:1.2em!important;}\
	#hdtbSum{height:auto!important;padding-top:5px!important;}\
	#hdtbSum{display:block;margin-left:.3em!important;}\
	.hdtbU.hdtb-mn-c{display:block;margin-left:.8em!important;}\
	#hdtb_msb{display:block!important;float:none!important;}\
	#hdtb_msb .hdtb_mitem{display:block!important;margin-left:0!important;height:auto!important;line-height:30px;}\
	#hdtb_msb .q{padding-left:16px!important;}\
	#hdtb_msb .hdtb_msel{border-left:6px solid transparent;border-bottom:0!important;padding-left:9px!important;color:#2A5DB0!important;}\
	#hdtb_msb .q{display:block!important;margin-left:0!important;color:#2A5DB0!important;}\
	#hdtb_msb .q:hover{background:#eee;}\
	#hdtb_msb .q:active{color:#2A5DB0!important;}\
	#hdtbMenus .hdtb-mn-cont a.q.qs{line-height:25px!important;}\
	#hdtb_more{position:absolute!important;bottom:5px;left:17px;border:solid 1px #ddd;background:linear-gradient(to bottom,#fff, #f5f5f5);border-radius:4px;padding:0 12px 0 5px!important;line-height:25px;}\
	#hdtb_more::after{content:"..."!important;}\
	#hdtb_more:hover{border-color:#bbb;}\
	#hdtb_msb{padding-bottom:40px;}\
	#hdtb_more .mn-hd-txt{color:#2A5DB0!important;}\
	#hdtb_more .mn-dwn-arw{border-top-color:#909090!important;border-bottom-color:#909090!important;top:50%!important;margin-top:-2px;}\	#hdtb_more_mn{position:static!important;border:none!important;box-shadow:none!important;}\
	#gb .gb_yb{display:inline-block!important;}\
	#isz_lt .tnv-lt-m {padding-right:15px!important;position:relative;}\
	#isz_lt .tnv-lt-m::after{content:"";display:block;width:0;height:0;border:4px 0px 4px 4px solid transparent;position:absolute;top:50%;right:10px;margin-top:-4px;}\
	#isz_ex .exylnk{display:inline-block!important;color:#2A5DB0!important;border:1px solid #ddd;border-radius:5px;padding:3px !important;background:linear-gradient(to bottom,#fff,#f5f5f5)!important;margin-top:3px!important;margin-left:8px!important;}\
	#isz_ex .exylnk:hover{border-color:#bbb;text-decoration:none!important;}\
	#hdtbMenus{display:block!important;height:auto!important;position:static!important;padding-top:0!important;}\
	#hdtbMenus .hdtb-mn-cont{height:auto!important;}\
	#hdtbMenus .mn-hd-txt{white-space:normal!important;}\
	#hdtbMenus .hdtb-mn-hd[aria-label*=" – "]{display:block!important;}\
	#hdtbMenus .hdtbU{display:block!important;position:static!important;border:none!important;box-shadow:none!important;margin-bottom:10px!important;white-space:normal!important;}\
	#hdtbMenus .hdtb-msel,#hdtbMenus .hdtbSel,#hdtbMenus .q{padding:1px 0 1px 10px!important;background:transparent!important;}\
	#hdtbMenus .hdtb-msel,#hdtbMenus .hdtbSel{color:#2A5DB0!important;font-weight:bold;}\
	#hdtbMenus .q{color:#2A5DB0!important;}\
	#hdtbMenus .q:hover{text-decoration:underline!important;}\
	#cdr_opt #cdrlnk{display:inline-block!important;color:#2A5DB0!important;border:1px solid #ddd;border-radius:5px;padding:3px !important;background:linear-gradient(to bottom,#fff,#f5f5f5)!important;margin-top:3px!important;margin-left:8px!important;}\
	#cdr_opt #cdrlnk:hover{border-color:#bbb;text-decoration:none!important;}\
	#autodetected_location{padding:1px 0!important;}\
	#set_location_section{padding-left:10px!important;}\
	#set_location_section .fl{display:inline!important;padding:0!important;text-decoration:underline!important;background:transparent!important;}\
	#set_location_section .hdtb-loc{padding-top:5px!important;padding-left:0!important;border:none!important;}\
	#lc-input{width:100%;margin-bottom:2px!important;}\
	#hdtb_tls,#hdtbMenus .hdtb-mn-hd,#hdtbMenus .mn-dwn-arw,#cdr_opt .cdr_sep{display:none!important;}\
    #kappbar{top:-1.4em;left:-.8em!important;}\
    .vasq #kappbar{top:-.5em!important;}\
    #lx{top:.5em!important;}\
    .abup,.klbar,.appcenter,#kappbar{background:transparent!important;}\
    #kxsb{background:#f4f4f4!important;}\
    .klcar{margin-left:1.75em!important;}\
    .lxhdrbox.ellip{margin-left:1.85em!important;margin-top:.55em!important;}\
    .klcc,.klcar{opacity:.85!important;}\
    .tbo #lx.klbar.klmap{margin-left:2.7em!important;}\
    a#lxshow_filters.ksb.ab_button.ellip,#lxhdr .ab_button{background:#f0f0f0!important;}\
    #appbar .ab_tnav_wrp,.ab_tnav_wrp,.mw #center_col,#cnt #center_col{margin-left:135px;}\
    #nyc,x:-moz-any-link{top:1px!important;}\
    #leftnav h2,#leftnav #showmodes,.msm,span.msl,.tbos,.tbots,.tbotu,.tbt li,.sel span,#lc a,.tbou > a.q,#tbpi,#tbtro,.tbt label,#prc_opt,#set_location_section a,.tbtctlabel,#swr a,#leftnav .msel,#leftnav .mitem > .kl, #ms > .kl,.e .ti{color:#2200C1!important;}\
    #leftnav h2,#leftnav .kls{font-weight:bold;}\
    #leftnav{visibility:visible!important;background:transparent!important;margin-top:2em;width:125px;margin-right:0;}\
    #leftnav .kl,#leftnav .kls{display:inline-block;position:static;margin-bottom:inherit;margin-top:inherit;}\
    #leftnav .mitem{margin-bottom:-.4em;}\
    #leftnav li.mitem:hover,#leftnav nojsb:hover,mitem:hover,#leftnav .kl:hover,#leftnav .kls:hover,a.q:hover,.qs:hover{background:transparent!important;color:#2200C1;text-decoration:underline!important;}\
    #leftnav .micon{margin-left:1.8em;}\
    #leftnav #showmodes{float:left;margin-bottom:.5em;font-style:italic;}\
    #leftnav .lnsep{visibility:hidden;float:left;margin-bottom:.5em;margin-top:.5em;}\
    .errortips{margin-top:1em;padding-right:5px;}\
    span.gbit{display:block;margin-right:0!important;}\
    .vsh #gbq,.tbo #gbq{max-width:672px;}\
    .vasq.srp #gbq{margin-left:-11.2em!important;}\
    #gb,div.mgoh-header,.play-bar,.play-bar-container,#play-header,#nhdrwrap{background-color:white!important;border-bottom:0!important;}\
    #logo img,.lsbb{background-color:transparent!important;}\
    #c-doc #logo,.scheme7 #logo,#gc-header #logo,#g{margin-top:-5px;}\
    .header-logo,#google-bar,.google-header-bar,#maia-header,#gs_hdr_bg{background:none!important;border:0!important;}\
    .skunk-head{display:inline-block;width:100%;background-color:#f5f5f5;}\
    .vsh h1 a:link,.tbo h1 a:link{color:rgb(255, 255, 255);text-indent:-999em;}\
    .vsh #logocont{max-height:142px;}\
    .srp.tbo.vsh #logo{background:url(//ssl.gstatic.com/gb/images/j_e6a6aca6.png)!important;background-position:-45px 0!important;width:115px;min-width:115px!important;max-width:115px!important;opacity:1!important;left:-2em!important;height:45px!important;}\
    .gbt#gbq1,.tbo #gbq1,.hp #gbq1,.K1XLjb #gbq1,.jfk-scrollbar #gbq1,#gbq1.gb_ba.gb_f{left:0;}\
    #gbq1,.srp.tbo #gbq1,#gsr.srp.tbo.vsh .gbt#gbq1,#gbq1.gb_aa.gb_f.gb_ca,#gbq1.gb_ca.gb_f{left:1.2em;background:url(//ssl.gstatic.com/gb/images/j_e6a6aca6.png)!important;background-repeat:no-repeat;background-position:-45px 0!important;top:1.2em;height:45px;width:115px!important;min-width:115px!important;max-width:115px!important;opacity:1!important;}\
    .srp.tbo.vasq.vsh #gbq1.gb_8.gb_f,.srp.tbo.vasq.vsh #gbq1.gb_ba.gb_f{max-width:115px!important;min-width:115px!important;border:0!important;}\
    .no-maps-mini #gbq1,.vasq #gbq1,#gbq1.gb_ha.gb_j,.jfk-normal.news-normal #gbq1{top:.8em!important;}\
	#gbq1.gb_ha.gb_j,.jfk-normal.news-normal #gbq1{left:.8em!important;}\
    #gbmm{width:102.5%!important;}\
    .jfk-scrollbar #gbqlw,.wIa #gbqlw,#gbqlw,.gC #gbqlw,.no-maps-mini #gbqlw,.fjfe-bodywrapper #gbqlw,.nojsv img{opacity:0!important;}\
    .tbo #gbfwa,.vsh #gbfwa{display:block;margin-left:-15px!important;}\
    .vasq #gbfwa{display:block;margin-left:0!important;}\
    input.gbqfif{margin-left:-6px!important;}\
    .gbqfsf table{padding-left:0!important;margin-left:-6px!important;}\
    #tsf div table,#gbqff,.news-normal.jfk-normal #gbqff,#onegoogbar #gbqff,.news-normal #gbq2.gbt{max-width:456px!important;min-width:451px!important;}\
    .hp #tsf div table,.hp #gbqff{max-width:100%!important;min-width:100%!important;}\
    #gbqff,.tbo #gbqff,.vsh #gbqff,.no-maps-mini #gbqff,#gbqff.gbqff.gb_f,.jfk-scrollbar .gb_f.gb_Sa{display:block!important;margin-left:19px!important;margin-right:15px!important;}\
    #fjfe-real-body #gbqff.gbqff{display:block!important;margin-left:0!important;margin-right:0!important;}\
    #gbqff,#gbqff:active,FIELDSET#gbqff.gbqff.gb_f:hover{border-right:1px solid #ccc!important;}\
    .tbo #gbqfbw,.vsh #gbqfbw{margin:0!important;margin-left:-7px!important;display:inline-block!important;}\
    .no-maps-mini #gbqfw,.aAU #gbqfw,.jfk-normal.news-normal #gbqfw{margin-left:7px!important;}\
    #fjfe-real-body #gbqfw{margin-top:1em!important;}\
    .vsh #gbq2,.tbo #gbq2{left:44px!important;}\
    .tbo.vasq #gbq2,.vasq.srp #gbq2{margin-left:167px!important;}\
    #gbu{display:block;top:-.5em;z-index:1005;right:0!important;}\
    #gsr #gbu,.vsh #gbu,.tbo #gbu{display:block;top:-1.5em!important;z-index:1005;right:0!important;}\
	#gb *{flex:none!important;justify-content:none!important;align-items:none!important;}\
	.ab_wrp{margin-top:-1.5em!important;margin-left:-72px!important;}\
    #ab_ctls{display:block;clear:both!important;margin:0 auto;left:-3em!important;margin-top:-5.05em!important;}\
    .vasq #ab_ctls{position:absolute!important;top:-11px!important;left:910px!important;}\
    #ab_ctl_ps,#abar_ps_on,#abar_ps_off,.left .kbtn-small,#botstuff nobr{margin-left:0!important;}\
	#ab_ctl_ss{margin-left:1.3em!important;}\
    #gbwa.gb_m.gb_xa.gb_f{max-width:0!important;}\
    .gb_aa.gb_xb.gb_f.gb_wb{max-height:40px!important;margin-top:.9em!important;}\
    .left .kbtn-small,#botstuff nobr{margin:0!important;}\
    .tbo #abar_ps_on,.tbo #abar_ps_off{padding-left:3px!important;}\
    #ab_ss.ab_dropdown{left:0!important;margin-right:0!important;width:152px;}\
    #ss_box .ab_dropdownlnkinfo.ab_dropdownchecklist{padding-left:7px;}\
    #ss_box .ab_dropdownitem a:last-of-type{padding-left:7px;}\
    .ab_icon,#gbi5{background:url(//ssl.gstatic.com/gb/images/b_8d5afc09.png)no-repeat!important;opacity:1!important;background-position:-6px -22px!important;height:18px;width:17px!important;}\
    #abar_button_ss *{background-image:none!important;width:0!important;}\
    #gbu .gbmc,#gbu #gbd1,#gbu #gbd3{border:0;height:0!important;display:inline;}\
    #gbu span#gbi1a,#gbu #gbgs3{display:block;max-height:24px;}\
    span.gbgs{background:transparent!important;text-transform:none!important;font-size:1.1em!important;}\
    .gsib_b{display:inline-block;margin-left:-1em!important;}\
    #gs_tti0.gsib_a{margin-left:-2.5em!important;}\
    #ss-status{width:82px!important;white-space:pre!important;}\
    #gbgs4,#gbi4i{max-height:30px!important;}\
    #gbgs4 span#gbi4id{border:1px solid #ccc;}\
    #gbi5{background-position:-6px -21px!important;}\
    span#gbgs4{height:25px!important;}\
    .gC .gbg4p{margin-top:-2px;}\
    .vsh #gb_1{background:auto;}\
    .sfbg,.sfbgg,div.searchbar{background:transparent!important;border-bottom:0!important;}\
    .header-buttons{padding-top:13px;}\
    #appbar{margin-top:2.9em!important;}\
    .vasq #appbar{margin-top:0!important;}\
    .kd-appbar{visibility:hidden;height:0;}\
    .main-appbar{margin-left:-2.5em;}\
    #topabar > div{height:0;margin-top:-2.5em;}\
    .vasq #topabar > div{height:auto!important;margin-top:auto!important;}\
    div div.klbar{clear:both!important;top:2em!important;margin-left:11.5em!important;}\
    .hp .kd-appbar{display:block;visibility:visible;padding-top:1em;}\
    .jfk-normal.news-normal .kd-appbar{visibility:visible;height:3em;margin-top:-1em!important;left:2.5em!important;}\
    .appbar-snippet-primary span{display:block;margin-top:4px;}\
    .appbar-snippet-secondary span{display:block;margin-top:6px;}\
    .fjfe-bodywrapper #appbar,.fjfe-bodywrapper #appbar div{margin-top:0!important;}\
    #slim_appbar{height:0!important;}\
    .in-header{display:block;margin-top:-2.5em;}\
    .pr_preview{left:-115px!important;}\
    #nqsbq{border:1px solid #ccc;padding:1px;}\
    #center_col div,#leftnav div,.ksb,.kpgb,.cpss.,ksb.gb-button{line-height:1.3!important;}\
    #center_col > #rho{margin-left:15%!important;}\
    #center_col{margin-top:-3.9em!important;}\
    .vasq #center_col,#gsr.srp.tbo.vasq.vsh #center_col{margin-top:-2.5em!important;}\
	#lhshdr{margin-top:1em!important;}\
    #taw{display:block;width:543px;margin-top:2.3em;padding-top:0;padding-bottom:0!important;}\
    .bkgi div{width:543px;}\
    .jhp .tsf-p{margin-right:0;}\
    .srp.tbo.vsh .tsf-p{display:block;margin-left:2.2em!important;}\
    .srp.tbo.vsh #searchform.big.big{display:block;top:38px!important;}\
    #tbtro{display:block;margin-top:1.8em;clear:both;}\
    div #pstt{margin-left:-1.9em!important;padding-top:1.6em!important;display:block!important;}\
    .nwd{display:block;margin-bottom:-3em;}\
    .kvm{margin-bottom:.5em;clear:both;}\
    #sx{padding-top:1.2em!important;margin-top:3em!important;}\
    #rso{clear:both;margin-top:1.3em!important;display:block;}\
    #mbEnd{margin-left:5px;margin-top:1.3em!important;}\
    #ptst_ai{clear:both;padding-bottom:2em;}\
    #sblsbb{display:block;margin-top:.3em;}\
    .psot{padding-top:.5em;padding-bottom:.5em;}\
    #tbbc{display:block;padding-left:0;background:none!important;margin-bottom:2em!important;margin-left:-8px;}\
    #taw .std{display:inline-block;padding-left:0;background:none!important;margin-bottom:0;}\
    .std img{margin-top:2px;}\
    #sftr{margin-top:0;width:101%;}\
    .ksfccl,#sflas{margin-left:4.3em;}\
    p > ul li,.vk_bk.fmob_pr,.vk_fin_up{font-size:70%;}\
    #fblrss1 img{vertical-align:top;padding-top:1px;}\
    #mss{clear:both;padding-top:1.2em!important;padding-bottom:0!important;margin-bottom:-1.5em!important;}\
    .tbos{clear:both;}\
    #img_1{margin-top:.2em;}\
    #tbpi,.tbt,.tbou{margin-top:.3em;}\
    .r span,#resultStats,.vk_h.fmob_title{font-size:85%!important;}\
    .gbqfbb,#gb_71,.gbgs,.ti b span,.ti span span{font-size:90%;}\
    .r a{text-decoration:underline;}\
    h3.r{text-overflow:ellipsis-word;}\
    #cttpd{margin-top:1.8em;height:55px;}\
    .tqref{font-size:80%;display:none!important;}\
    #sbds #sblsbb,#mssp,.ssp,#brs,#ires{margin-top:0;}\
    .ssp{margin-bottom:-2em!important;}\
    .e .r{margin-top:.9em!important;}\
    #rcnt,.mdm#cnt{background:#fff!important;}\
    #center_col #topstuff .med .med{display:inline-block;margin-top:0;padding-top:0;padding-right:.3em;}\
    #center_col .med{margin-top:1em!important;}\
    #res{display:block;margin-top:-1.6em!important;}\
    .tbo.vsh .lshdr div{z-index:101;}\
    #tphdr{display:block;margin-top:-.8em!important;}\
	#rshdr.rshdr{display:block;clear:both;margin-top:.7em!important;padding-bottom:.1em!important;}\
    #res .std.stp{display:block;padding-top:2em!important;margin-left:-.5em!important;}\
    .ts.std{margin-left:-.5em!important;}\
    #res p.std{margin-top:-.1em;}\
    #prs{margin-left:.1em;margin-bottom:0;}\
    .spell,.spell_orig{padding-right:.2em;}\
    .mss_col p,.ssp,.spell_orig{display:inline-block;padding-bottom:0;}\
    .sp_cnt{display:block;padding-top:1.8em!important;margin-bottom:-1.3em!important;}\
    p.sp_cnt br > br {display:none!imortant;}\
    p.ssp{padding-top:1.8em!important;margin-bottom:0!important;padding-bottom:0!important;}\
    .sp_cnt a:link{text-decoration:underline;font-style:italic;}\
    .ng{padding-right:.05em;padding-top:.4em;}\
    .brs_col p,#prs,.ng,.mss_col,#center_col .med p, #center_col .med ul,.sp_cnt,#botstuff .med,#botstuff li a{font-size:95%;}\
    #brs,#brs > .med{clear:both;}\
    #trev div,.e .r,#brs,#brs > .med,#brs .med .med,.persistentblue span{display:block;}\
    #trev{margin-left:-5px!important;padding-top:1.7em!important;}\
    #brs ul{list-style-type:none;}\
    .brs_col p{margin-`left:2px;}\
    #smc{display:block;margin-left:12em;}\
    #smc,#smb,.sld,.vsc.div.st,.nv-152093521377474139,#latitude-app-bar,span#gbztms1:hover,.cdr_sep,.Co6tNc-hJDwNd,#gbmm .gbp1,.gbqfb.gbiba.gbp1,.NvmfAe,.g-v,span.gbgs,span.gbgs:hover,.gbzt:focus,.gbgt-hvr,.gbgt:focus,#hdtb_msb #hdtb_more_mn.hdtb-mn-c,.gbqfbb,#gb_71,.gbgs,.header-logo,#google-bar,.google-header-bar,#maia-header,#gs_hdr_bg,#gbu .gbmc,#gbu #gbd1,#gbu #gbd3,#topabar > div,#hdtbSum,.hdtb-mn-cont .hdtbU,.cdr_sep,#lx,.klbar{border:0!important;}\
    #botstuff{clear:both;margin-bottom:0;margin-left:-.5em;}\
    .r a,.spell,#botstuff div p,#tbt5 h3{font-size:100%;}\
    #botstuff .med{margin-top:1em;margin-bottom:0;}\
    #botstuff i{font-style:normal;}\
    .tl .r{display:block;margin-top:.5em;}\
    .authorship_link{margin-bottom:-.25em!important;}\
    .dir-sub-cntn{position:static;height:20px;}\
    #d_launch{display:inline-block;margin-top:1.2em;}\
    #wrapper{margin-top:2em;}\
    .butterbar-container{background:#fff!important;}\
    #main-wrapper{margin-top:2em;}\
    #cnt #center_col,#center_col,#cnt .ab_center_col{padding-left:20px!important;}\
    #cnt{background:transparent!important;}\
    .g.psli{width:810px!important;display:block;margin-left:-.5em!important;margin-top:-5em!important;margin-bottom:5em!important;}\
    .g.psgi{display:block;margin-left:-1.7em!important;}\
    .psclear{display:block;position:static;margin-bottom:2em!important;margin-top:2em!important;}\
    .ps-ambb{display:block;margin-left:-1em!important;margin-top:-4em!important;margin-bottom:5em!important;}\
    .srb__bar.std{display:block;margin-left:-.8em!important;margin-top:2em!important;margin-bottom:1em!important;}\
    #ires{display:block;margin-left:-.5em;}\
	#ires a:visited{color:#CB4437;}\
    #resultStats,.ab_tnav_wrp{z-index:2!important;padding-left:.85em!important;top:-3.1em!important;margin-bottom:0!important;color:#000;font-style:italic;}\
    .vasq #resultStats,.vasq .ab_tnav_wrp{top:-2.3em!important;}\
    #ab_ps_rl{margin-left:-.7em!important;}\
    .Co6tNc-hJDwNd{background:transparent;}\
    .Xeb,.XUa{background:#f0f0f0!important;border:1px solid #d0d0d0;bottom:2em;}\
    .ZaPDOe{padding-left:0!important;}\
    .sel{margin-left:.3em;font-size:125%;}\
    .kv cite:after,.vshid:after{content: "..";color:#fff;}\
    .vshid{display:inline-block;}\
    #taw .std,.tbos,#bfl,#fll,.tbo #topstuff .ssp,.esw{margin-left:0;}\
    #left-nav-wrapper{margin-top:-.2em;}\
    .nv-FRONTPAGE{padding-bottom:1em;}\
    .topic{padding-top:5px;padding-bottom:5px;}\
    .persistentblue{border-bottom:1px solid#ddd;}\
    .g-first div,.g-first ul li{line-height:2;}\
    .sld{display:inline-block;margin-right:.7em;}\
    .left-mod-container{margin-top:1px;}\
    .vspib{top:0;left:40em;}\
    .c .vspib{left:39.4em;}\
    .nrgt .vspib{left:18em;}\
    .vspib{margin-top:0;left:37.9em!important;}\
    #tbt5{margin-left:-.6em;}\
    #qbc .lst-d{display:block;padding:1px;margin-bottom:2px;}\
    #ifb{left:25px!important;}\
    #ifbc.prc{top:1.5em!important;}\
    #prt *,#tvcap,#prm, #prm font,#prm p,.prcmg,#ifbd,.gbtb2,#gb_23.gbzt.gbz0l.gbp1,.gbqfh#gbq1,#appbar_b,#kd-googlebar,#fll>a:last-of-type,.header-bar,div#gbz > ol > li:first-child > a#gb_119,#lc,#ab_name,.kd-appname,.gC #gbvg li.gbt:nth-of-type(5),span.gbsup,.gbmh,#ss-status u,#gbg6,#gb_78.gbzt,#ab_shopping span{display:none!important;}\ div.mq,#bb_pp_tos_ack,#pmocntr2,.infomsg,.jfk-butterBar.jfk-butterBar-info.jfk-butterBar-shown,#pushdown,.appleft,.hdtbU.hdtb-mn-c:last-of-type li.hdtbItm.hdtbSel,.hdtbItm.hdtb-loc,#hdtb_tls,#hdtbMenus .hdtb-mn-hd,#hdtbMenus .mn-dwn-arw,#cdr_opt .cdr_sep,#hdtb_more .mn-dwn-arw,#set_location_section,.location-change.lc-srp,.tnv-lt-arw{display:none!important;}\
    #gbq1 span{background:none!important;}\
    #gb-main #search{margin-left:65px!important;margin-top:1em!important;}\
	#gb div:nth-of-type(1){background-color:transparent!important;}\
    .gb_q.gb_g{background:transparent!important;}\
	.gb_S,.gb_s,A.gb_T.gb_Ab{background:auto!important;}\
    .gb_cb{display:inline-block!important;position:absolute!important;top:-2.2em!important;left:0!important;}\
	.gb_eb.gb_g{display:none!important;}\
	.tbo.vasq .gb_vb.gb_Cb.gb_j,.vasq.vsh .gb_vb.gb_Cb.gb_j{left:-9em!important;}\
	.gb_ga.gb_Pb.gb_j.gb_Ob{left:-7.8em!important;}\
	.hp .gb_ga.gb_Pb.gb_j.gb_Ob.gb_Qb,.gb_ga.gb_Pb.gb_j.gb_Ob.gb_Nb{position:absolute;right:0!important;}\
			 }   ';
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