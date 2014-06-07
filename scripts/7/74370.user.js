// ==UserScript==
// @name           google Enhanced BLACK  - Personal Revision -
// @namespace      http://userscripts.org/scripts/show/74370
// @description    Enhanced google BLACK
// @version        1.0.7.1
// @include        htt*://www.google.*/accounts*
// @include        htt*://services.google.*
// @include        htt*://www.google.*/voice*
// @include        htt*://www.google.*/reader*
// @include        htt*://*.googlelabs.*
// @include        htt*://*.googleratings.*
// @include        http://www.google.*
// @include        https://www.google.*/*
// @include        htt*://*.google.*/*
// @include        htt*://*google*/*
// ==/UserScript==
  
 /*
 @name		google Enhanced BLACK  - Personal Revision -
 @description		This Google Black script enhances all Google service pages with an inverted color-scheme for reduced eye fatigue; it also removes ads & clutter and improves page layout and readability by widening search results
                Little changed script based on original google Enhanced BLACK  3.0.0 (http://userscripts.org/scripts/show/12917)
                I get logo images from Google Skin (http://userscripts.org/scripts/show/24736)  @author Bloody_Angel - www.myspace.com/stojshic                
 @date		2010-04-14
 @OriginalSource		http://userscripts.org/scripts/show/12917
 @OriginalIdentifier		http://userscripts.org/scripts/source/12917.user.js
 @OriginalAuthor		gabedibble <gdibble@gmail.com>
 @OriginalNamespace		http://userscripts.org/people/24894
 @author    kram <krammod@gmail.com>
 */

// GENUINE FREEWARE <3
// (CC) BY-NC-SA: This work is licensed under a Creative Commons Attribution-Noncommercial-Share Alike 3.0 United States License. <http://creativecommons.org/licenses/by-nc-sa/3.0/us/>

// Change Log & To-Do Lists available @source (URI above)
// Feel free to leave suggestions/criticism on the UserScript Page or via email; THANX! =)

/*Reload if search page called from home*/
  if( /[\?&]fp=/.test(location.href)) {
	location.replace(location.href.replace(/[\?&]fp=[^&]*|$]/, ''));
	}

/*update function*/
function sI(w){switch(w){
	case "v":return 1280057394757;
	case "h":return "http://userscripts.org/scripts/show/74370";
	case "f":return "http://userscripts.org/scripts/source/74370.user.js";
}}//alert(Date.now());

/*main function*/
function enhanceGoogle(){
    var Gtld=location.host.substring(iO(location.host,".google.")+8,location.host.length),lH=location.href,lc=uColorLink,vl=uColorLinkVisited,gL=_gL(),gHpL=_gL("H"),rW=_rW(),$_$=

// General Google Page
	/* Global font override */	"* {font-family:"+uFontFamily+";}"+
	/* page bg */			"BODY {color:white;background: #262626 url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAENCAYAAADOoA9GAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABZSURBVHjaYmBgYPjPACP+MYFIEPEflfUflwQRSojgUiyGX4IkJTTRi5P4R39T/tFByT8qa6OJof8GPJgGPjHQI/FTki+pWFCQXlQhsZiBmBFMwLlgwAgQYAAYPe0bQ81rlgAAAABJRU5ErkJggg==') top left repeat-x !important;}"+
  /* link color CHROME */		"A,#gbar A.gb1,#gbar A.gb2,#gbar A.gb3,#guser A.gb3,#guser A.gb3 U,#guser A.gb4,SPAN.i,.linkon,#codesiteContent A,TABLE.mmhdr TBODY TR TD.mmttlinactive SPAN,TABLE TBODY TR TD TABLE TBODY TR TD A,.lk,BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section DIV#related TABLE.gf-table TH.sortable,SPAN.linkbtn,DIV#ss-status A.gb3,SPAN#rptgl SPAN,A SPAN.b,.mmttl SPAN,A > SPAN.navlink,SPAN > SPAN.link,DIV#rptgl > SPAN,DIV#tbt-expander DIV,#guser SPAN > SPAN,DIV#ss-bar DIV#ss-box > A,DIV#rpsp.rpop DIV.tl B,SPAN#zippyspan,.actbar-btn,.gtc-doclist-item-select > SPAN,.goog-tab-bar .goog-tab > DIV,UL.goog-tabpane-tabs > LI.goog-tabpane-tab,DIV.gwt-Label,#guser .gb2,DIV.n SPAN.b,.linkbtn {color:#3366CC !important;}"+
	/* link color */		"A,#gbar A.gb1,#gbar A.gb2,#gbar A.gb3,#guser A.gb3,#guser A.gb3 U,#guser A.gb4,SPAN.i,.linkon,#codesiteContent A,TABLE.mmhdr TBODY TR TD.mmttlinactive SPAN,TABLE TBODY TR TD TABLE TBODY TR TD A,.lk,BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section DIV#related TABLE.gf-table TH.sortable,SPAN.linkbtn,DIV#ss-status A.gb3,SPAN#rptgl SPAN,A SPAN.b,.mmttl SPAN,A > SPAN.navlink,SPAN > SPAN.link,DIV#rptgl > SPAN,DIV#tbt-expander DIV,#guser SPAN > SPAN,DIV#ss-bar DIV#ss-box > A,DIV#rpsp.rpop DIV.tl B,SPAN#zippyspan,.actbar-btn,.gtc-doclist-item-select > SPAN,.goog-tab-bar .goog-tab > DIV,UL.goog-tabpane-tabs > LI.goog-tabpane-tab,DIV.gwt-Label,#guser .gb2,DIV.n SPAN.b,.linkbtn {color:"+lc+" !important;}"+
	/* visitedLinx color */		"A:visited {color:"+vl+" !important;}"+
	/* results visited linx */	"DIV#res A:visited {font-size:0.8em !important;}"+
	/* google bar txt */		"#gbar SPAN {color:#999;}"+
	/* google bar txt */		"#gbar DIV.gb1 {background-color:#c9d7f1 !important;}"+
	/* google bar txt */		"#gbar DIV.gb2 {padding-top:0; padding-bottom:0; background-color:#c9d7f1 !important;}"+
	/* google bar linx */		"#gbar A.gb1,#gbar B.gb1,#gbar A.gb3 {position:relative; bottom:0.2em; font-weight:bold !important; font-size:1.15em !important;}"+
	/* google bar b-line */		"#gbh,.gbh {border-color:#777;}"+
	/* google bar bg */		"#guser,#guser *,#gbar,#gbar *,#ghead,#gog {background-color:transparent !important; font-family:"+uFontFamily+" !important; color:#ccc;}"+
	/* button container*/   ".lsbb,.ds,.lst-td,.q-inner {background-color:transparent !important;color:#ccc !important; border-style:none !important;border-width:0px !important;}"+
	/* left box*/  "#leftnav,#tbd,.lst-td,#hidden_modes,#hmp {background-color:transparent !important;color:#ccc !important; border-style:none !important;border-width:0px !important;}"+
  /* search options boxes */	"#sbl,.fade {background-color:transparent !important;}"+
	/*test remove from top logos: TABLE[width='100%'][cellpadding='2'] TBODY TR TD[width='1%'][valign='top'],*/
  /* top logos */			"#logo SPAN,DIV#regular_logo,TABLE[align='center'] TBODY TR TD DIV#logo,#search .logo,#gc-header #logo,#header #logo,TABLE[style='margin: 0px 0px -6px 0pt; padding: 0px; width: 100%;'] TD[style='width: 153px;'],TABLE[align='center'] TBODY TR TD[width='155'][rowspan='2'],TABLE[align='center'] TBODY TR[valign='middle'] TD[width='135'],BODY[bgcolor='#ffffff'][topmargin='3'] CENTER TABLE[width='725'] TBODY TR TD TABLE[cellspacing='1'] TBODY TR TD[height='1'][bgcolor='#666666'],BODY > TABLE[width='100%'][style='direction: ltr;'] > TBODY > TR > TD,BODY > TABLE[width='100%'] > TBODY > TR > TD[width='100%'][style='padding-left: 15px;'],BODY.siteowners > TABLE[width='96%'] > TBODY > TR > TD[width='1%'],BODY > CENTER > DIV > TABLE[width='739'] > TBODY > TR > TD[width='100%'],BODY[bgcolor='#ffffff'] > TABLE[cellpadding='5'][align='center'] > TBODY > TR[valign='middle'] > TD[width='1%'],TABLE[width='100%'][cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR > TD[width='1%'][valign='top'],BODY.search > TABLE[width='95%'] > TBODY > tr[valign='top'] > TD[width='1%'],BODY > DIV#container > DIV#header > DIV[style='float: left; width: 155px;'],BODY > TABLE[width='100%'][height='100%'][style='margin-bottom: 1px;'] > TBODY > TR > TD[valign='top'] > TABLE[width='100%'][cellspacing='2'] > TBODY > TR > TD[width='1%'],BODY[onload='sf()'] > CENTER > FORM > TABLE#frame > TBODY > TR > TD > TABLE[width='100%'] > TBODY > TR > TD[width='100%'] > TABLE > TBODY > TR > TD[width='100%'] > TABLE > TBODY > TR > TD > DIV[style='margin: 5px 0pt 4px 4px; background: transparent url(/images/firefox/sprite.png) no-repeat scroll 0pt -95px; "+bS('background-clip')+": "+bS('initial')+"; "+bS('background-origin')+": "+bS('initial')+"; "+bS('background-inline-policy')+": "+bS('initial')+"; height: 23px; width: 80px;'],BODY > TABLE#title-t > TBODY > TR > TD.tc,A#glogo,BODY.answer_page TABLE.header_table > TBODY > TR > TD.header_logo_td,CENTER > H1#ps-logo,BODY[marginheight='3'][bgcolor='white'][topmargin='3'] > CENTER > TABLE > TBODY TR > TD[align='left'] > TABLE > TBODY > TR > TD[valign='top'] > DIV,BODY[marginheight='3'][bgcolor='white'][topmargin='3'] > TABLE[width='100%'][cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR > TD[valign='top'] > DIV,BODY > TABLE[width='100%'][cellspacing='2'][cellpadding='0'][border='0'][style='margin-top: 1em;'] > TBODY > TR > TD[width='1%'],BODY > DIV#wrapper > DIV#header_logo,BODY.hp > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered > DIV.search > DIV#browse-header > TABLE > TBODY > TR:first-child > TD:first-child,BODY.serp > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered > DIV.search > DIV#search-header,BODY.sp > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered > DIV.search > DIV#browse-header > TABLE > TBODY > TR:first-child > TD:first-child,BODY > CENTER > DIV#videoheader > TABLE.table-header > TBODY > TR > TD.td-logo,BODY#search-results-body > DIV#videoheader > TABLE.table-header > TBODY > TR > TD.td-logo,BODY > DIV > DIV#videoheader > TABLE > TBODY > TR > TD:first-child,BODY > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered > DIV.search > DIV#page-header > TABLE > TBODY > TR > TD:first-child,BODY > FORM[name='f'] > TABLE[width='100%'][cellspacing='0'][cellpadding='0'][border='0'][style='clear: left;'] > TBODY > TR > TD:first-child,BODY > DIV#whole > TABLE[cellspacing='0'][cellpadding='0'][border='0'][style='font-size: medium;'] > TBODY > TR > TD,BODY > TABLE[cellspacing='0'][cellpadding='0'][border='0'][style='font-size: medium;'] > TBODY > TR > TD,DIV[style='background: transparent url(/intl/en_com/images/logo_plain.png) no-repeat scroll 0 0%; "+bS('background-clip')+": "+bS('initial')+"; "+bS('background-origin')+": "+bS('initial')+"; "+bS('background-inline-policy')+": "+bS('initial')+"; height: 110px; width: 276px;'],BODY > FORM > TABLE#sft > TBODY > TR > TD.tc,BODY > DIV[style='clear: both;'] > CENTER > TABLE[cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR > TD[style='padding-bottom: 8px; padding-top: 2px;'],BODY > DIV#top_search_bar > DIV[style='padding: 1px 10px 0px 6px; float: left;'],BODY#search-results-body > DIV#videoheader > TABLE.table-header > TBODY > TR > TD:first-child,BODY > DIV#body-wrapper > DIV.g-doc > DIV.g-section > DIV.g-unit > DIV.sfe-logo > A > DIV.SP_logo,BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section > DIV.g-unit > DIV.sfe-logo > A > DIV.SP_logo,BODY > DIV.g-doc > DIV.g-section > DIV.g-unit > DIV.sfe-logo > A > DIV.SP_logo,BODY DIV.g-doc DIV.g-section > DIV.g-unit > DIV.sfe-logo,BODY > FORM > DIV#advd-search-header > TABLE:first-child > TBODY > TR > TD[width='1%']:first-child,BODY > SPAN#main > DIV#header > DIV#sform > FORM#tsf > TABLE#sft > TBODY > TR > TD:first-child > H1,BODY > FORM[name='f'] > TABLE[width='99%'] > TBODY > TR:first-child > TD[width='1%'],BODY > DIV > TABLE#srch_box_t > TBODY > TR > TD:first-child,BODY[bgcolor='#ffffff'] > TABLE[width='100%'] > TBODY > TR:first-child > TD[width='143']:first-child,BODY > TABLE[style='margin: 7px 3px; clear: both;'] > TBODY > TR:first-child > TD:first-child,BODY > DIV#srp-header > FORM[name='f'] > TABLE > TBODY > TR > TD:first-child,BODY > TABLE#sft > TBODY > TR > TD.tc,BODY[bgcolor='#ffffff'] > TABLE > TBODY > TR > TD[valign='top'][rowspan='2'],BODY > DIV#h > TABLE:first-child > TBODY > TR > TD:first-child,BODY > DIV#headerdiv > TABLE[width='100%']:first-child > TBODY > TR:first-child > TD[width='1%'][valign='top'],BODY > DIV#masthead > TABLE.searchbar > TBODY > TR#logo-section > TD.searchbar-logo,BODY > DIV[style='clear: both;'] > CENTER > TABLE[cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR > TD[style='padding-bottom: 8px; padding-top: 2px;'],BODY.e > DIV.h TABLE#gn_ph > TBODY > TR:first-child > TD[align='right']:first-child,BODY > FORM[name='gs'] > TABLE#scife_hdr > TBODY > TR:first-child > TD[valign='top']:first-child,BODY > DIV#whole > DIV[style='margin: 10px 0pt 5px;'],BODY[marginheight='3'][topmargin='3'] > DIV[style='margin: 10px 0pt 5px;'],BODY TABLE#top_search_box > TBODY > TR > TD:first-child,BODY[marginheight='3'][bgcolor='#ffffff'][topmargin='3'] > DIV[style='margin: 3px 8px;'] > TABLE[style='margin: 7px 0pt 10px; clear: both;'] > TBODY > TR:first-child > TD[valign='top'][rowspan='2']:first-child,BODY[style='margin-top: 4px; cursor: default;'] > TABLE[width='100%'] > TBODY > TR:first-child > TD[valign='top']:first-child,BODY#gsr > DIV#cnt > FORM#tsf > TABLE#sft > TBODY > TR > TD > H1,BODY > SPAN#main > DIV > DIV#cnt > DIV#sform > FORM#tsf > TABLE#sft > TBODY > TR:first-child > TD:first-child > H1, a#logo {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important;  text-decoration:none !important; font-size:0; color:transparent !important;}" +
	/* intl home logo [insert] */	"BODY > SPAN#main > CENTER > SPAN#body > CENTER > DIV#logo,CENTER > DIV#lga > DIV#logo,DIV#lga{width:281px !important; height:131px !important; background:transparent url('"+gHpL+"') no-repeat scroll 0 !important;}"+
  /* beta home logo ssl/search logo*/ "DIV#lga > IMG, A#logo > IMG {width:0px; height:0px;}"+
  /* lateral ads */ "#mbEnd,#rhs_block,DIV>#rhs {visibility:hidden; border:none;}"+
  /* top menu  */ "IFRAME#gbs {background: transparent;}"+  
  /* space after submit form  */ "DIV[style='font-size: 83%; min-height: 3.5em;'] {display:none;}"+  
  /* hide logo img child */ "DIV#lga > * {display:none;}"+
  
	/* CONDITIONAL-EVALUATION related to Homepage Special Logo [exception for g.Images-home] */
	   ((($('logo')&& $('logo').alt=='Google' )||iO(lH,"images.google.")>-1) ? 
		/* insert hp-logo img */"BODY[vlink='#551a8b'] > DIV#xjsd,BODY > SPAN#main > CENTER > DIV#xjsd,BODY[vlink='#551a8b'] > CENTER > DIV#xjsd {height:131px !important;background: no-repeat scroll 0 !important;}"+
		/* intl logo mover */	"BODY[vlink='#551a8b'] > DIV#xjsd,BODY > SPAN#main > CENTER > DIV#xjsd,BODY[vlink='#551a8b'] > CENTER > DIV#xjsd {position:absolute; top:52px; left:0; width:100% !important; background-position:center !important;}" 
					: "") +
	   (($('logo')&&$('logo').alt!='Google'&&iO(lH,"images.google.")==-1) ? 
					"" : 
		/* large logo hide */	"BODY > CENTER IMG[onload='window.lol&&lol()']#logo,BODY > CENTER DIV[onload='window.lol&&lol()']#logo,BODY > SPAN#main > CENTER > SPAN#body > CENTER > IMG#logo,BODY > SPAN#main > CENTER > SPAN#body > CENTER DIV#logo {visibility:hidden; min-height:117px;}") +

	/* home special logo hider */	(uHideLogos?"BODY > SPAN#main > CENTER > SPAN#body > CENTER > A > IMG#logo {visibility:hidden;}":"")+

	/* search input */		"INPUT[type='text'],INPUT[type='password'],INPUT[name='q'] {background:#333 none !important; color:#ffffff !important; padding:2px; border:solid 1px #ccc !important; font-weight:bold; color:#ffffff !important;}"+
	/* submit btns */		"INPUT[type='submit'],BUTTON,BUTTON[type='submit'],INPUT[value='Cancel'],INPUT[value='Save'],INPUT#stxemailsend,INPUT[value='Discard'],INPUT[value='Download'],INPUT[value='Add it now'],INPUT[type='button'][value='Save changes'],INPUT[type='reset'][value='Clear All'],INPUT[type='reset'][value='Reset'],INPUT[type='button'][value='Done'],INPUT[type='button'][value='Copy'],INPUT[type='button'][value='Move'],INPUT[type='button'][value='Delete'],INPUT[type='button'][value='Compare'],INPUT[type='button'][value='Check for Updates'],DIV.gac_bt > INPUT {background-color:#333 !important; background:"+bS('gradLinear')+"0% 0%,0% 100% !important,from(#555),to(#000)) !important; border:solid 1px #ccc; "+bS('radiusAll')+":14px; color:#fff !important; cursor:pointer;}" +
	/* submit btn hover */		"INPUT[type='submit']:hover,BUTTON[type='submit']:hover,INPUT[type='reset'][value='Clear All']:hover,INPUT[type='button'][value='Done']:hover,INPUT[type='button'][value='Copy']:hover,INPUT[type='button'][value='Move']:hover,INPUT[type='button'][value='Delete']:hover,INPUT[type='button'][value='Compare']:hover,INPUT[type='reset'][value='Reset']:hover,INPUT[type='button'][value='Check for Updates']:hover,DIV.gac_bt > INPUT:first-child:hover {background-color:#36f !important; background:"+bS('gradLinear')+"0% 0%,0% 100%,from(#000),to(#36f)) !important; color:#fff;}"+
	/* go btns hover */		"INPUT#btnI:hover,INPUT[name='btnI']:hover,INPUT[value='Save']:hover,SPAN#button_0 BUTTON:hover,INPUT#stxemailsend:hover,INPUT[value='Submit Issue']:hover,INPUT[value='Download']:hover,INPUT[value='Add it now']:hover,INPUT[value='Add it now'],INPUT[value='Save Preferences']:hover,INPUT[value='Save Preferences ']:hover,INPUT#save:hover,BUTTON[name='ok']:hover,BUTTON[name='yes']:hover,BUTTON[accesskey='s']:hover,INPUT[value='Send Email']:hover,INPUT[type='button'][value='Save changes']:hover,DIV.gac_bt > INPUT:last-child:hover {background-color:#090 !important; background:"+bS('gradLinear')+"0% 0%,0% 100% !important,from(#000),to(#090)) !important; color:#fff;}"+
	/* cancel btn hover */		"INPUT[value='Cancel']:hover,SPAN#button_1 BUTTON:hover,INPUT[value='Discard']:hover,INPUT[value='Delete Group']:hover,INPUT#cancel:hover,INPUT[value='Cancel']:hover,INPUT#cancel:hover,INPUT[value='Cancel']:hover,BUTTON[name='cancel']:hover,BUTTON[onclick='_EV_Blur(this);_EF_Dismiss(true)']:hover,BUTTON[name='no']:hover {background-color:#900 !important; background:"+bS('gradLinear')+"0% 0%,0% 100%,from(#000),to(#900)) !important; color:#fff !important;}"+
	/* searchHelp btns override */	"BUTTON.wci,BUTTON.w4,BUTTON.w40,BUTTON.w5,BUTTON.w50 {display:inline !important; background:"+bS('gradLinear')+"0% 0%,0% 0%,from(transparent),to(transparent)) !important;}"+
	/* btn height */		"INPUT.lsb,#old_submit {height:1.7em !important; padding-bottom:0.2em; background:#333; border: 1px solid;}"+
	/* div btn outer */		".goog-button-base-outer-box {border-top-color:#555; border-bottom-color:#333;}"+
	/* div btn inner */		".goog-button-base-inner-box {border-left-color:#555; border-right-color:#333; background-color:#555;}"+
	/* div btn inner txt */		".goog-button-base-content,.goog-button-base-content SPAN {color:#fff !important;}"+
	/* div btn inner txtH */	".goog-button-base-content:hover {color:#fff !important;}"+
	/* div btn T-shadow */		".goog-button-base-top-shadow {background-color:#777; border-bottom-color:#555;}"+
	/* div btn restrict */		"#search-restrict {border-bottom-color:#000;}"+
	/* menu dropd folder */		"DIV.goog-menu > DIV.goog-menuitem > DIV.goog-menuitem-content {color:#ccc !important;}"+
	/* menu dropd item */		"DIV.goog-menu > DIV.goog-menuitem {background-color:#222; color:#999 !important;}"+
	/* menu dropd itemHov*/		"DIV.goog-menu > DIV.goog-menuitem:hover {background-color:#333; color:#ccc !important;}"+
	/* home international txt */	"DIV[style='background: transparent url(/intl/en_com/images/logo_plain.png) no-repeat scroll 0 0%; "+bS('background-clip')+": "+bS('initial')+"; "+bS('background-inline-policy')+": "+bS('initial')+"; height: 110px; width: 276px;'] > DIV[style='color: rgb(102, 102, 102); font-size: 16px; font-weight: bold; left: 208px; position: relative; top: 78px;'] {top:-18px !important; left:180px !important; color:#fff !important;}"+
	/* more pop layer */		"SPAN#more,#gbar .gb2 {background-color:#333 !important; border-right:solid 1px #a2bae7; border-bottom:solid 1px #a2bae7; color:#333 !important;}"+
	/* google alerts txt */		"P[style='margin-left: 9px;'],SPAN[style='font-size: medium;'] {color:#999;}"+
	/* mainbody txt */		"DIV.mainbody,TD.j,DIV.empty,DIV.empty DIV,BODY#gsr DIV,BODY#gsr TD {color:#999 !important;}"+
	/* footer bg */			"CENTER#fctr {background-color:transparent !important;}"+
	/* footers */			(uHideFooters?"#footer,#footer_promos,#footerwrap,P FONT[size='-2'],TABLE[class='t n bt'][width='100%'][cellpadding='2'],DIV[align='center'][style='white-space: nowrap;'],FONT[class='p'][size='-1'],FONT[size='-1'][color='#6f6f6f'],DIV.div-copyright,SPAN.copyr,DIV.content DIV.footer,DIV#footarea,TABLE[width='99%'][cellpadding='3'][bgcolor='#c3d9ff'][align='center'][style='margin-bottom: 5px;'],CENTER > DIV[style='padding: 2px;'] > FONT[size='-1'],CENTER > CENTER > P > FONT[size='-1'],BODY.search > DIV[align='center'] > SMALL > FONT[size='-1'][face='Arial,sans-serif'],BODY > TABLE[width='100%'][height='100%'][style='margin-bottom: 1px;'] > TBODY > TR > TD[valign='top'] > CENTER > FONT[size='-1'],BODY > CENTER > TABLE[width='100%'][cellspacing='0'][cellpadding='2'][border='0'] *,DIV[class='padt10 padb10'] > TABLE[width='100%'] > TBODY > TR > TD[class='fontsize1 padt5'][align='center'],BODY[marginheight='3'][bgcolor='#ffffff'][dir='ltr'][topmargin='3'] > CENTER > FONT[size='-1'],BODY > DIV[style='width: 100%; clear: both;'] > FORM[name='langform'] > DIV[align='center'] > FONT[size='-1'] {display:none;}":"")+

	// Preferences
		/* pre title line */	"BODY[vlink='#551a8b'][text='#000000'][link='#0000cc'][bgcolor='#ffffff'][alink='#ff0000'] > DIV[style='width: 100%; clear: both;'] > FORM > TABLE TBODY TR TD[bgcolor='#3366cc'],BODY> DIV[style='width: 100%; clear: both;'] > FORM > TABLE TBODY TR TD[bgcolor='#3366cc'] {display:none;}"+
		/* title header txt */	"BODY[vlink='#551a8b'][text='#000000'][link='#0000cc'][bgcolor='#ffffff'][alink='#ff0000'] > DIV[style='width: 100%; clear: both;'] > FORM > TABLE TBODY TR TD[bgcolor='#e5ecf9'] FONT B {color:#999 !important;}"+
		/* headers */		"BODY[vlink='#551a8b'][text='#000000'][link='#0000cc'][bgcolor='#ffffff'][alink='#ff0000'] > DIV[style='width: 100%; clear: both;'] > FORM > TABLE TBODY TR TD[bgcolor='#e5ecf9'],TABLE TBODY TR[bgcolor='#e5ecf9'],TABLE > TBODY > TR > TD[bgcolor='#e5ecf9'] {background-color:#000;}"+
		/* global borders */	"BODY[vlink='#551a8b'][text='#000000'][link='#0000cc'][bgcolor='#ffffff'][alink='#ff0000'] > DIV[style='width: 100%; clear: both;'] > FORM > TABLE > TBODY > TR > TD[bgcolor='#cbdced'] {display:none;}"+
		/* page txt */		"BODY[vlink='#551a8b'][text='#000000'][link='#0000cc'][bgcolor='#ffffff'][alink='#ff0000'] > DIV[style='width: 100%; clear: both;'] > FORM H1,BODY[vlink='#551a8b'][text='#000000'][link='#0000cc'][bgcolor='#ffffff'][alink='#ff0000'] > DIV[style='width: 100%; clear: both;'] > FORM H2,BODY[vlink='#551a8b'][text='#000000'][link='#0000cc'][bgcolor='#ffffff'][alink='#ff0000'] > DIV[style='width: 100%; clear: both;'] > FORM LABEL,TABLE#gsea_table > TBODY > TR > TD DIV {color:#ccc !important;}"+
		/* subscribed links */	"BODY[vlink='#551a8b'][text='#000000'][link='#0000cc'][bgcolor='#ffffff'][alink='#ff0000'] > DIV[style='width: 100%; clear: both;'] > FORM > TABLE > TBODY > TR > TD[valign='top'] > IFRAME[src='http://www.google.com/coop/sl/pref'] {padding-left:9px; background-color:#fff; "+bS('radiusAll')+":14px;}"+


// iGoogle Homepage
	/* header Themed BG */		"#nhdrwrap {background-color:transparent;}"+
	/* search btn spacing */	".gseain INPUT[type='submit'],INPUT[name='btnG'],INPUT[name='btnI'] {margin-top:5px; margin-right:30px; margin-left:30px;}"+
	/* setup block */		"DIV.setup_div {background-color:#333; border:solid 1px #ccc; "+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}"+
	/* setup title txt */		"DIV.setup_title_welcome,DIV.setup_promo,DIV.setup_promo_subtext,DIV#promo {color:#999 !important;}"+
	/* create cntnr */		"FORM#_setup > DIV#box {border:0 none;}"+
	/* create heading */		"FORM#_setup > DIV#box > DIV#box_heading {background-color:#222; color:#fff !important; "+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}"+
	/* create body */		"FORM#_setup > DIV#box > DIV#box_body {background-color:#333; "+bS('border-radius-bottomright')+":14px; "+bS('border-radius-bottomleft')+":14px;}"+
	/* create body txt */		"FORM#_setup > DIV#box > DIV#box_body DIV,FORM#_setup > DIV#box > DIV#box_body TD {color:#ccc !important;}"+
	/* nav top gradient 1 */	"#nhdrwrapinner > .gradient > B {background-color:#171717 !important;}"+
	/* nav top gradient 2 */	"#nhdrwrapinner > .gradient > B > B {background-color:#252525 !important;}"+
	/* nav top gradient 3 */	"#nhdrwrapinner > .gradient > B > B > B {background-color:#333 !important;}"+
	/* nav container */		"TABLE > TBODY > TR > TD#col1 {width:134px; background-color:#333; border-color:#333;}"+
	/* nav bg */			"#full_nav {background-color:#333;}"+
	/* nav tab color */		"#full_nav H2 {color:"+lc+";}"+
	/* nav separators */		"#full_nav .topline,#full_nav .bottomline {visibility:hidden;}"+
	/* nav first tab */		"#full_nav #section0_contents.selected_section_contents {margin-top:20px;}"+
	/* nav selected tab */		"#full_nav .leftselectedtab {background-color:#000; "+bS('border-radius-topleft')+":14px; "+bS('border-radius-bottomleft')+":14px;}"+
	/* nav non selected tab */	"#full_nav .leftunselectedtab {background-color:#333;}"+
	/* nav non selected tab */	"#full_nav .leftselectedtab,#full_nav .leftunselectedtab,#full_nav .bottom_nav,#col1_contents .leftborder {border:0 none;}"+
	/* nav chat separator */	"DIV#chat_nav > DIV#tab_separator_bot {visibility:hidden;}"+
	/* remove nav selection rnds */	"#full_nav B[class='rnd_tab left_rounded_only'] {visibility:hidden;}"+
	/* alert / promo box */		"DIV#undel_box,.header_promo {background-color:#333; border:1px solid #ff0; "+bS('radiusAll')+":14px; color:#ff0 !important;}"+
	/* alert / promo box link */	"DIV#undel_box A,.header_promo A {color:#f00 !important;}"+
	/* skins box title */		"H2.modtitle_s {background-color:#feffc5; border:0; "+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}"+
	/* skins box title txt */	"H2.modtitle_s B {color:#000 !important;}"+
	/* skins box body */		"DIV#skinbox_b {background-color:#000; border:solid 1px #feffc5 !important;}"+
	/* skins box themes */		"DIV.skinthsel B,DIV.skinth B {color:#000 !important;}"+
	/* dialog box */		"DIV#IG_PU_box > TABLE.dialog TBODY TR TD DIV {background-color:#333 !important; border:0 none !important; "+bS('radiusAll')+":14px;}"+
	/* dialog box txt */		"LABEL[for='share_userprefs'],TABLE#email TBODY TR TD,TABLE#email TBODY TR TD DIV {color:#999 !important;}"+
	/* dialog box btns */		"DIV#IG_PU_box > TABLE.dialog TBODY TR TD DIV#buttons {padding-bottom:10px;}"+
	/* add tab dialog */		"BODY.mozilla> DIV#IG_PU_box TABLE.dialog TBODY TR TD DIV.outerborder DIV {color:#999 !important;}"+
	/* new tab txt */		"#modules > TABLE[width='98%'][cellspacing='10'][align='center'] > TBODY > TR > TD > DIV[align='center'][style='padding-bottom: 100px;'] {color:#999 !important;}"+
	/* module border */		".modbox,.modbox_e {background-color:#000; "+bS('border-radius-bottomright')+":14px; "+bS('border-radius-bottomleft')+":14px;}"+
	/* module bg */			".modboxin,.modboxin IFRAME HTML BODY {background-color:#fff !important;}"+
	/* module border */		".modboxin,.modboxin_s,.modtitle {border:0 none !important;}"+
	/* module area container */	"TABLE > TBODY > TR > TD#col2 {background-color:#333; border:0 none;}"+
	/* module area header rndng */	"TABLE > TBODY > TR > TD#col2 > #rcbg {display:none;}"+
	/* module area bg */		"#modules {background-color:#000; "+bS('border-radius-topleft')+":20px;}"+
	/* module area btm spacing */	"#modules > .yui-b {margin-bottom:-0.3em; padding-top:0.2em;}"+
	/* module title rndng */	"B.rnd_modtitle {display:none;}"+
	/* module title bg */		".modtitle {"+bS('border-radius-topleft')+":14px; "+bS('border-radius-topright')+":14px; background-color:#333 !important;}"+
	/* module title txt */		".modtitle_text,.mtlink {position:relative; top:1px; left:1px; color:#999 !important;}"+
	/* module options buttons */	".modtitle .v2enlargebox,.modtitle .v2ddbox,.modtitle .v2dragbox {position:relative; top:2px; right:3px;}"+
	/* module settings line */	"DIV.meditbox {margin-top:0; border:0;}"+
	/* module settings txt */	"DIV.meditbox DIV,DIV.meditbox TD,DIV.meditbox SPAN,DIV.meditbox NOBR {color:#999 !important;}"+
	/* module inner detail txt */	".modboxin FONT {color:#000 !important;}"+
	/* updates header */		"BODY > DIV#doc3 > TABLE > TBODY > TR > TD#col2 > DIV#maximized_container > DIV.gititle,BODY > DIV#doc3 > TABLE > TBODY > TR > TD#col2 > DIV#maximized_container > DIV.gititle .gititle_text {background-color:#333; color:#fff;}"+

	// Theme Selection Box
		/* outer box & hdr */	"DIV#indi,DIV#indi_top {border:0 none; background-color:#333; color:#999 !important;}"+
		/* headline & selctn */	"DIV#indi H1,DIV#indi DIV SPAN.indi_current_item {color:#fff !important;}"+
		/* inner desc txt */	"DIV#indi DIV SPAN {color:#777 !important;}"+
		/* inner txt */		"DIV#indi DIV {color:#ccc !important;}"+
		/* theme select indc */	"DIV#indi DIV DIV.indi_undo {background-color:#333 !important; border:0 none !important; color:#ffaa1c !important; "+bS('radiusAll')+":8px;}"+

	// Module-specific Requests
		/* gdocs */		//module defined in Docs BF-func
		/* youtube video */	"HTML > BODY > DIV > DIV#middle,HTML > BODY > DIV > DIV#uppernav,HTML > BODY > DIV > DIV#searchFooter {background-color:#fff;}"+
		/* babelfish transl. */	"DIV#modules IFRAME#remote_iframe_140 {height:158px !important; overflow:hidden !important;}"+
		/* confucius quotes */	"DIV#modules DIV#remote_56 > IFRAME#remote_iframe_56 {height:107px !important; overflow:hidden !important;}"+
		/* quotes of the day */	"DIV.modboxin > DIV[style='padding-top: 4px; padding-bottom: 4px;'] {color:#000;}"+
		/* weather */		"DIV#modules DIV.w_box,DIV#modules DIV.w_box DIV {color:#000;}"+

	// Add Stuff / Themes Directory
		/* logo img */		"BODY > DIV#wrapper > DIV#header_logo > A > IMG.backlink_logo,TD[width='1%'] > A > IMG[src='http://img0.gmodules.com/ig/images/igoogle_logo_sm.gif'] {display:none;}"+
		/* header tabs */	"BODY > DIV#wrapper > DIV#header > UL.header_tab {margin-left:170px; border:0 none; background-color:#333; "+bS('radiusAll')+":14px;}"+
		/* header selectdTab */	"BODY > DIV#wrapper > DIV#header > UL.header_tab > LI.selected,BODY > DIV#wrapper > DIV#header > UL.header_tab > LI.selected > A {border:0 none; background-color:#333; font-weight:bold; text-decoration:none; color:#fff !important;}"+
		/* body txt */		"BODY > DIV#wrapper * {color:#ccc;}"+
		/* body header */	"BODY > DIV#wrapper > DIV.page_table > DIV.main_content > TABLE[width='99%'][cellspacing='0'] TD,DIV.main_content > DIV#promo > TABLE[width='99%'] > TBODY > TR > TD {background:none #000 !important; color:#999 !important;}"+
		/* body header line */	"BODY > DIV#wrapper > DIV.page_table > DIV.main_content > TABLE[width='99%'][cellspacing='0'] {border-bottom:6px solid #333;}"+
		/* featuredGadgetBox */	"BODY > DIV#wrapper > TABLE.page_table > TBODY > TR > TD > DIV[style='border: 1px solid rgb(214, 222, 238); padding: 1em; background: rgb(245, 247, 253) none repeat scroll 0%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; margin-bottom: 12px;'] {background-color:#181818 !important; border:0 none !important; "+bS('radiusAll')+":14px;}"+
		/* r-module boxes */	"BODY > DIV#wrapper > TABLE.page_table > TBODY > TR > TD.right_sidebar > DIV.module > H3,BODY > DIV#wrapper > TABLE.page_table > TBODY > TR > TD.right_sidebar > DIV#search {background-color:#333 !important; border:0 none !important; color:#fff; "+bS('radiusAll')+":14px;}"+
		/* r-module searchBx */	"BODY > DIV#wrapper > TABLE.page_table > TBODY > TR > TD.right_sidebar > DIV#search {padding-bottom:0.2em;}"+
		/* r-module top */	"BODY > DIV#wrapper > DIV.page_table > DIV.right_sidebar .module > H3,BODY > DIV#wrapper > DIV#sidebar > DIV.module > H3 {background-color:#333 !important; border:0 none !important; "+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px; color:#ccc !important;}"+
		/* r-module bottom */	"BODY > DIV#wrapper > DIV.page_table > DIV.right_sidebar .module,BODY > DIV#wrapper > DIV#sidebar DIV.module {min-height:34px; padding-bottom:5px; background-color:#333; border:0 none !important; "+bS('radiusAll')+":14px; color:#000 !important;}"+
		/* r-module feat */	"BODY > DIV#wrapper > DIV#sidebar DIV#featured.module {padding:0 7px 7px 7px;}"+
		/* makeyourown head */	"BODY > DIV#gm_blue_bar > TABLE > TBODY > TR > TD > TABLE > TBODY > TR > TD > DIV#bluebar   {background-color:#333; border:0 !important; "+bS('radiusAll')+":14px;}"+
		/* makeyourown title */	"BODY > CENTER > DIV#gm_sign_in > TABLE > TBODY > TR > TD#gm_sign_in_steps > DIV:first-child,BODY > CENTER > DIV#gm_desc {color:#fff !important;}"+
		/* makeyourown txt */	"BODY > CENTER > DIV#gm_sign_in > TABLE > TBODY > TR > TD#gm_sign_in_steps > DIV,BODY > CENTER > DIV#gm_sign_in > TABLE > TBODY > TR > TD#gm_sign_in_steps > DIV.gm_step,BODY > CENTER > DIV#gm_choices DIV,BODY > CENTER > DIV#gm_wizard DIV,BODY > CENTER > DIV#gm_wizard TD,BODY > CENTER > DIV#gm_send DIV,BODY > CENTER > DIV#gm_publish TD,BODY > CENTER > DIV#gm_publish DIV{color:#999 !important;}"+
		/* makeyourown num */	"BODY > CENTER > DIV#gm_sign_in > TABLE > TBODY > TR > TD#gm_sign_in_steps > DIV.gm_step > SPAN.gm_num {background:none #333; color:#fff;}"+
		/* makeyourown start */	"BODY > CENTER > DIV#gm_sign_in > TABLE > TBODY > TR > TD > DIV#gm_sign_in_box {background-color:#333 !important; border:0 none; "+bS('radiusAll')+":14px;}"+



// Google Search Results Page
	/* logo */			"BODY#gsr > DIV#header > FORM#tsf > TABLE#sft > TBODY > TR > TD > H1 > A#logo > IMG,BODY > SPAN#main > DIV#header > DIV#sform > FORM#tsf > TABLE#sft > TBODY > TR > TD:first-child > H1 > A#logo > IMG,BODY > SPAN#main > DIV DIV#sform > FORM#tsf > TABLE#sft > TBODY > TR[valign='top'] > TD[style='padding-right: 8px;'] > H1 > A#logo > IMG,BODY#gsr > DIV#cnt > FORM#tsf > TABLE#sft > TBODY > TR[valign='top']:first-child > TD:first-child > H1 > A#logo > IMG,BODY > SPAN#main > DIV >  DIV#cnt > DIV#sform > FORM#tsf > TABLE#sft > TBODY > TR[valign='top']:first-child > TD:first-child > H1 > A#logo > IMG {display:none;}"+
	/* search container */		"BODY#gsr > DIV#header > FORM#tsf > TABLE#sft > TBODY > TR > TD#sff > TABLE.ts,BODY#gsr > DIV#header > FORM#tsf > TABLE#sft > TBODY > TR > TD#sff > TABLE.ts > TBODY > TR > TD:first-child,BODY#gsr > DIV#header > FORM#tsf > TABLE#sft > TBODY > TR > TD#sff > TABLE.ts > TBODY > TR > TD > INPUT[name='q'] {width:80%;}"+
	/* search suggest bg */		"#completeTable,.gac_m,.gac_m *,.google-ac-a,.google-ac-a * {background-color:#222 !important; color:#999 !important;}"+
	/* search suggest hover */	".gac_b .gac_c,.gac_b .gac_c *,.google-ac-b,.google-ac-b *,.google-ac-e,.google-ac-e * {background-color:#444 !important; color:#fff !important;}"+
	/* notify box */		"TABLE.ts > TBODY > TR > TD[style='padding: 5px; background: rgb(255, 255, 153) none repeat scroll 0%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; text-align: center;'] {"+bS('radiusAll')+":14px;}"+
	/* search within logo */	"TABLE[width='100%'] > TBODY > TR > TD[valign='top'] > A > IMG[width='200'][height='78'][alt='Google'],A#logo IMG[src='/images/experimental_sm.gif'],A#logo > IMG[width='150'][height='105'],A#logo > IMG[src='/images/nav_logo4.png'] {display:none;}"+
	/* search within txt */		"TABLE[width='100%'] > TBODY > TR > TD[valign='top'] > CENTER > FONT > b {position:relative; top:68px;}"+
	/* search header bar */		"TABLE[class='t bt'],DIV#ssb {padding-right:0.4em; padding-left:0.7em; background-color:#333; border:0; "+bS('radiusAll')+":14px;}"+
	/* header bar experiment dd */	"DIV#cnt > DIV.std > SPAN {background-color:#000 !important;}"+
	/* search header bar */		"TABLE[class='ft t bb bt'] {border:0; border-top:1px}"+
	/* outer result cntnr */	"BODY#gsr > DIV#cnt {max-width:100%;}"+
	/* result-area width [DYNMC] */	"DIV#res {width:"+rW+"% !important;}"+
	/* remove sponsored linx */	"DIV#tads {display:none;}"+
	/* refine results txt */	"TABLE#po TBODY TR TD,TD#sff > DIV#bsb {color:#999 !important;}"+
	/* sponsored linx */		"DIV#res DIV.ta,BODY#gsr > TABLE#mbEnd {display:none;}"+
	/* result-area txt */		"DIV#res P,DIV#res .j,DIV.sml,DIV.std,DIV#res OL LI,DIV#res OL LI DIV ,BODY > SPAN#main > DIV#cnt > DIV#res > SPAN#topstuff > DIV.e > DIV.std TD {color:#999 !important;}"+
	/* description width */		"TD.j,OL > LI.g > DIV.s {width:100% !important; max-width:100% !important;}"+
	/* description color */		"FONT {color:#999;}"+
	/* result spacing */		".g {margin:0.5em 0; padding-bottom:1em; border-bottom:1px dotted #452;}"+
	/* bottom related txt */	".r,BODY > SPAN#main DIV#cnt > DIV#res > SPAN#botstuff > DIV.e > TABLE#brs > CAPTION {color:#aaa;}"+
	/* bottom related selection */	"TABLE#brs.ts > TBODY > TR > TD > A > B {color:#aaa !important;}"+
	/* nav bar */			"#navbar {position:relative; left:33%; width:400px;}"+
	/* options L-sidebar cntnr */	"DIV#tbd.med {background-color:#333; border:0; "+bS('radiusAll')+":14px;}"+
	/* options L-sidebar title */	"DIV#tbd.med DIV.tbos {color:#fff !important;}"+
	/* related searches topBx */	"BODY > DIV#cnt > DIV#tbt5 {position:relative; bottom:1px; margin-right:1.3em; background-color:#333; border:0 none; "+bS('border-radius-bottomright')+":14px; "+bS('border-radius-bottomleft')+":14px;}"+
	/* related searches topBx LH */	"BODY > DIV#cnt > DIV#tbt5 LI {line-height:1.2em;}"+
	/* r-side ads */		(uHideAds?"#rhscol,#rhsline * {display:none;}":"")+
	/* footer logo(s) */		"#navbar DIV,#navbar IMG,TABLE#nav SPAN#nf,TABLE#nav SPAN#nc,TABLE#nav SPAN.nr,TABLE#nav SPAN#nn,DIV#np,TABLE#nav > TBODY > TR[valign='top'] > TD.b > SPAN,TABLE#nav > TBODY > TR[valign='top'] > TD.cur > SPAN,TABLE#nav > TBODY > TR[valign='top'] > TD > A > SPAN.csb {height:0px; background:none;}"+
	/* footer bg */			"TABLE[class='ft t bb bt'],DIV.clr > DIV#bsf,DIV.clr > P.blk,BODY#gsr > DIV > DIV#bsf {background-color:#262626 !important; border-top:0 none; border-bottom:0 none;}"+

	// Advanced Search
		/* header bar line */	"BODY > TABLE[width='100%'][cellspacing='2'][cellpadding='0'][border='0'][style='margin-top: 1em;'] > TBODY > TR > TD > TABLE[width='100%'][style='border-top: 1px solid rgb(51,102,204);'] {border-top:0 none !important;}"+
		/* header bar L */	"BODY > TABLE[width='100%'][cellspacing='2'][cellpadding='0'][border='0'][style='margin-top: 1em;'] > TBODY > TR > TD > TABLE[width='100%'][style='border-top: 1px solid rgb(51, 102, 204);'] > TBODY > TR > TD.page-title {background-color:#333; border:0; "+bS('border-radius-topleft')+":14px; "+bS('border-radius-bottomleft')+":14px;}"+
		/* header bar R */	"TABLE[width='100%'][cellspacing='2'][cellpadding='0'][border='0'][style='margin-top: 1em;'] > TBODY > TR > TD > TABLE[width='100%'][style='border-top: 1px solid rgb(51, 102, 204);'] > TBODY > TR > TD[bgcolor='#d5ddf3'][align='right'] {background-color:#333; border:0; "+bS('border-radius-topright')+":14px; "+bS('border-radius-bottomright')+":14px;}"+
		/* title top */		"BODY > TABLE[width='100%'][cellspacing='0'][cellpadding='0'] > TBODY > TR > TD[align='center'] > TABLE[cellspacing='0'][cellpadding='0'][style='margin-top: 1em; width: 80%;'] > TBODY > TR > TD[align='left'] > DIV.outer-box > DIV.qbuilder-env,BODY > TABLE[width='100%'][cellspacing='0'][cellpadding='0'] > TBODY > TR > TD[align='center'] > TABLE[cellspacing='0'][cellpadding='0'][style='margin-top: 1em; width: 80%;'] > TBODY > TR > TD[align='left'] > DIV.outer-box > DIV.qbuilder-env *   {border-color:#333; background-color:#000 !important; font-weight:bold; color:#fff !important; "+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}"+
		/* lower form */	"BODY > TABLE[width='100%'][cellspacing='0'][cellpadding='0'] > TBODY > TR > TD[align='center'] > TABLE[cellspacing='0'][cellpadding='0'][style='margin-top: 1em; width: 80%;'] > TBODY > TR > TD[align='left'] > DIV.outer-box > FORM[name='f'].block {border-color:#333; "+bS('border-radius-bottomright')+":14px; "+bS('border-radius-bottomleft')+":14px;}"+
		/* related box */	"BODY > TABLE[width='100%'][cellspacing='0'][cellpadding='0'] > TBODY > TR > TD[align='center'] > TABLE[cellspacing='0'][cellpadding='0'][style='width: 80%;'] > TBODY > TR > TD[align='left'] > DIV#related.block {border-color:#333; "+bS('radiusAll')+":14px;}"+
		/* form & page txt */	"DIV.outer-box > FORM.block H3,DIV.outer-box > FORM.block LABEL,DIV.spec-engines > H3 {color:#999;}"+
		/* footer */		(uHideFooters?"BODY > CENTER:last-child > FONT[size='-1'] {display:none;}":"")+

	// Quality Form
		/* header bar */	"BODY[marginheight='3'][bgcolor='#ffffff'][topmargin='3'] > FORM > TABLE[width='100%'][cellpadding='2'] > TBODY > TR > TD[class='t bt'] {padding-left:10px; background-color:#333; border:0; "+bS('radiusAll')+":14px;}"+
		/* form box bg */	"BODY[marginheight='3'][bgcolor='#ffffff'][topmargin='3'] > FORM > BLOCKQUOTE > P > TABLE[cellpadding='10'][bgcolor='#cbdced'] {background-color:#000 !important;}"+
		/* bottom line */	"BODY[marginheight='3'][bgcolor='#ffffff'][topmargin='3'] > CENTER > DIV[class='t n bt'][style='padding: 2px;'] {display:none;}"+

	// Language Tools
		/* top line */		"BODY[vlink='#551a8b'][link='#0000cc'][bgcolor='#ffffff'][alink='#ff0000'][onload='ht();'] TABLE.header TD,BODY[vlink='#551a8b'][link='#0000cc'][bgcolor='#ffffff'][alink='#ff0000'] > TABLE > TBODY > TR > TD > TABLE.header > TBODY > TR > TD[bgcolor='#e5ecf9'] {border-top:0 none;}"+
		/* header bars */	"BODY[vlink='#551a8b'][link='#0000cc'][bgcolor='#ffffff'][alink='#ff0000'][onload='ht();'] H4,BODY[vlink='#551a8b'][link='#0000cc'][bgcolor='#ffffff'][alink='#ff0000'] H4 {background-color:#333; border:0; "+bS('radiusAll')+":14px;}"+
		/* search across box */	"BODY[vlink='#551a8b'][link='#0000cc'][bgcolor='#ffffff'][alink='#ff0000'][onload='ht();'] > TABLE[width='100%'][cellpadding='3'] > TBODY > TR[bgcolor='#ffffff'] > TD,BODY[vlink='#551a8b'][link='#0000cc'][bgcolor='#ffffff'][alink='#ff0000'] > TABLE[width='100%'][cellpadding='3'] > TBODY > TR[bgcolor='#ffffff'] > TD {background-color:#000;}"+

	// Feedback
		/* header bar */	"BODY > FORM > TABLE.qftbb > TBODY > TR > TD {background-color:#333; border:0; "+bS('radiusAll')+":14px;}"+
		/* form txt */		"BODY > FORM > TABLE.ts > TBODY > TR > TD > TABLE.qflhs > TBODY > TR > TD {color:#ccc !important;}"+
		/* answers box */	" BODY > FORM > TABLE.ts > TBODY > TR > TD > TABLE.qfrhs {background-color:#555; border:0; "+bS('radiusAll')+":14px;}"+

	// Help Central
		/* logo img */		"BODY.search > TABLE[width='95%'] > TBODY > tr[valign='top'] > TD[width='1%'] > A > IMG[width='143'][vspace='10'][height='59'][align='left'] {visibility:hidden;}"+
		/* header bg */		"BODY.search > TABLE[width='95%'] > TBODY > tr[valign='top'] > TD[width='99%'][valign='top'][bgcolor='#ffffff'],BODY.search > TABLE[width='95%'] > TBODY > tr[valign='top'] > TD[width='99%'][valign='top'][bgcolor='#ffffff'] > TABLE > TBODY > TR {background-color:#000;}"+

/* Web Search expanded below in BF-func */


// Custom Seach iFrame-edition
	/* iframe bgs */		"BODY[marginheight='2'][text='#000000'],BODY[marginheight='2'][text='#000000'] TABLE[width='1%'] {background-color:inherit !important;}"+
	/* iframe txt & linx */		"BODY[marginheight='2'][text='#000000'] A,BODY[marginheight='2'][text='#000000'] A B,BODY[marginheight='2'][text='#000000'] B {color:inherit !important;}"+


// Images Results
	/* logo img */			"BODY > FORM[name='gs'] > TABLE#sft > TBODY > TR > TD.tc > A > IMG {visibility:hidden; width:150px;}"+
	/* top bar */ ".rshdr,.tpblk,#guser,.gbh,#gog { background-color: black !important;}"+
  /* left bar iframe*/ "#il_m {display: none;}"+
  /* right bar iframe */ "#il_fc {margin-right: 0px;}"+
  /* page number div */ ".rgsh,#rgsh_s {background-color: rgb(51, 101, 255); color: white ! important;}"+
  /* options L-sidebar */		"DIV#rpsp.rpop {margin-left:10px; padding-top:7px !important; padding-left:2px !important; background-color:#181818; border:0 none; "+bS('radiusAll')+":14px;}"+
	/* options L-sidebar txt */	"DIV#rpsp.rpop DIV {color:#fff;}"+
	/* safe search block */		"DIV#ss-bar {position:inherit !important;}"+
	/* safe search txt */		"DIV#ss-bar DIV {color:#777 !important;}"+
	/* safe search dropdown */	"DIV#ss-bar DIV#ss-box {background-color:#222; color:#fff;}"+
	/* safe search dd link */	"DIV#ss-bar DIV#ss-box > A * {display:inline; margin:0;}"+
	/* safe search link selected */	"DIV#ss-bar DIV#ss-box A.ss-selected {color:#fff !important;}"+
	/* safe search dd hover */	"DIV#ss-bar DIV#ss-box > A:hover {color:#fff !important;}"+
	/* safe search dd selected */	"DIV#ss-bar DIV#ss-box > A.ss-selected,BODY > FORM > TABLE#sft > TBODY > TR > TD > TABLE.tb > TBODY > TR > TD.tc > FONT > DIV#ss-bar > DIV#ss-box > A.ss-selected > SPAN {background-color:#444; color:#fff !important;}"+
	/* sizes alert */		"DIV[style='padding: 16px 0pt;'] CENTER SPAN[style='padding: 4px; background-color: rgb(255, 255, 153);'],BODY > DIV#ImgCont > DIV#rstc > CENTER > SPAN {padding:2px 7px 2px 7px !important; "+bS('radiusAll')+":14px;}"+
	/* sizes alert txt */		"DIV[style='padding: 16px 0pt;'] CENTER SPAN[style='padding: 4px; background-color: rgb(255,255,153);'] FONT,BODY > DIV#ImgCont > DIV#rstc > CENTER > SPAN > FONT {color:#777;}"+
	/* sizes alert highlight */	"DIV[style='padding: 16px 0pt;'] CENTER SPAN[style='padding: 4px; background-color: rgb(255,255,153);'] FONT B,BODY > DIV#ImgCont > DIV#rstc > CENTER > SPAN > FONT > B {color:#000 !important;}"+
	/* ad bar */			(uHideAds?"DIV#ImgCont > TABLE[width='100%'][style='padding: 8px; background: rgb(255, 248, 221) none repeat scroll 0%; "+bS('background-clip')+": "+bS('initial')+"; "+bS('background-inline-policy')+": "+bS('initial')+"; margin-top: 10px;'] {display:none;}":"")+
	/* img size txt */		"DIV.std > .f,DIV.std > .m {color:#999 !important;}"+
	/* img source txt */		"DIV.std > .a {color:#090 !important;}"+
	/* g.image labeler */		"CENTER TABLE[cellpadding='10'][style='text-align: center;'] TBODY TR TD {background-color:#000;}"+
	/* Advanced Image Search expanded below in BF-func */


// Video
  /* footbar input*/ "div#searchagain {background-color: transparent !important;}"+  
  /* footbar page number*/ ".abs-page,.mail-pagi-long abs-page,.next,#current-page{background-color: #333 !important;}"+
  /* logo */ "CENTER > IMG[src='http://www.google.it/intl/it_ALL/images/logos/video_logo_lg.gif'] {visibility:hidden;}"+
  /* footer */ ".div-footer{visibility:hidden;}"+
	/* logo img */			"A#logoimg IMG,BODY > DIV#headerdiv > TABLE[width='100%']:first-child > TBODY > TR:first-child > TD[width='1%'][valign='top'] > A > IMG[height='40'] {display:none;}"+
	/* logo container */		"TD.td-logo {height:65px; background:transparent url('"+gL+"') no-repeat scroll 0 !important;}"+
	/* header/footer bgs */		"#videoheader,BODY#search-results-body DIV.div-footer {background-color:#000 !important;}"+
	/* body txt */			"#main-container DIV,#slideout-player DIV {color:#999 !important;}"+
	/* filter option txt */		"TD[style='padding: 0pt;'] SPAN.filter-prefix,TD[style='padding: 0pt;'] LABEL.filter-option {color:#999;}"+
	/* section header bg */		"BODY > DIV#headerdiv > TABLE > TBODY > TR > TD > TABLE > TBODY > TR[bgcolor='#ebeff9'] {background-color:#000;}"+
	/* section header */		"DIV.div-section-header,BODY > DIV#hotstuff > DIV.hot_videos_container > TABLE.hot_videos_title_bar,DIV.container DIV.mod_titlebar,DIV.container DIV.mod-header,BODY > DIV#headerdiv > TABLE > TBODY > TR > TD > TABLE > TBODY > TR[bgcolor='#ebeff9'] > TD[style='border-width: 1px 0pt 0pt; border-top: 1px solid rgb(107, 144, 218); padding-left: 4px; padding-bottom: 3px; padding-top: 2px; font-family: arial,sans-serif;'] {padding:0.1em 0 0.2em 0.4em !important; background-color:#333; border:0 none !important; "+bS('radiusAll')+":14px;}"+
	/* section borders */		"BODY > DIV#hotstuff > DIV.hot_videos_container > TABLE.hot_videos_body > TBODY > TR > TD.embedded_player_container,BODY > CENTER > DIV.container > DIV > DIV.mod_content {border:0 none;}"+
	/* section header txt */	"TD.td-section-header-left B {color:#000 !important;}"+
	/* home video time */		"DIV.div-video-text {color:#090 !important;}"+
	/* search type */		"TABLE.table-header TABLE[bgcolor='white'],DIV.menu-normalsb {border:0; background-color:#000;}"+
	/* results toolbelt */		"DIV#main-container > DIV#search-results-toolbelt {background-color:#222; border:0 none !important; "+bS('radiusAll')+":14px;}"+
	/* results toolbelt heading */	"DIV#main-container > DIV#search-results-toolbelt .tbos {color:#fff !important;}"+
	/* results header */		"TABLE#resultsheadertable,DIV#results-bar {padding-right:0.4em; padding-left:0.7em; background-color:#333 !important; border-top:0 none !important; "+bS('radiusAll')+":14px;}"+
	/* results header title */	"TABLE#resultsheadertable TD[valign='baseline'] B {position:relative; top:1px; left:2px; color:#000 !important;}"+
	/* result item */		"DIV.SearchResultItem {width:100%; margin:2em 0pt;}"+
	/* result W */			".rl-res .rl-metadata {max-width:none;}"+
	/* result item txt */		"DIV#search-results DIV.rl-snippet {color:#ccc !important;}"+
	/* result item domain */	"DIV#search-results DIV.rl-domain-below {color:green !important;}"+
	/* result selection */		"DIV#search-results DIV.rl-highlight {background-color:#222; border:0 none !important; color:#fff !important; "+bS('radiusAll')+":14px;}"+
	/* result item border */	"TD#search-results-td > DIV#search-results DIV.tv-res,TD#search-results-td > DIV#search-results DIV.rl-res,#hotstuff .video {border:0 none;}"+
	/* result item details */	"TD.MetaData DIV.Details,DIV.rl-metadata > DIV.rl-details {color:#999 !important;}"+
	/* result item description */	"TD.MetaData DIV.Snippet,DIV.rl-metadata > DIV.rl-snippet,DIV.rl-metadata > DIV.rl-short-snippet {color:#aaa !important;}"+
	/* result item uri */		"TD.MetaData DIV.URL,DIV.rl-metadata > SPAN.rl-domain {color:#090 !important;}"+
	/* results message */		"TD#search-results-td > DIV#search-results > DIV.message {color:#999 !important;}"+
	/* sidebar */			"DIV#main-container > DIV#slideout-player {margin-top:1em;}"+
	/* video related border */	"BODY#search-results-body > DIV#tv-table > TABLE > TBODY > TR > TD#tv-player-td > DIV#tv-player > DIV#tv-related {border:0 none;}"+
	/* video data */		"BODY#search-results-body > DIV#tv-table > TABLE > TBODY > TR > TD#tv-player-td > DIV#tv-player > DIV#video-data-spacer > DIV#video-data {background-color:#000;}"+
	/* footer nav table */		"TABLE#pagenavigatortable {width:400px !important;}"+
	/* footer logo(s) */		"TABLE#pagenavigatortable TD IMG,TABLE#pagenavigatortable TD A.imglink,TABLE#pagenavigatortable TD BR,DIV#search-results > DIV#pagi > DIV > TABLE.gooooogle > TBODY > TR > TD.prev > A > DIV.nav_previous,DIV#search-results > DIV#pagi > DIV > TABLE.gooooogle > TBODY > TR > TD.prev > DIV.nav_first,DIV#search-results > DIV#pagi > DIV > TABLE.gooooogle > TBODY > TR > TD#current-page > DIV.nav_current,DIV#search-results > DIV#pagi > DIV > TABLE.gooooogle > TBODY > TR > TD.abs-page > A > DIV.nav_page,DIV#search-results > DIV#pagi > DIV > TABLE.gooooogle > TBODY > TR > TD.next > A > DIV.nav_next {display:none;}"+
	/* search again */		"DIV#searchagain {border:0; background-color:#000;}"+
	/* advanced search bgs */	"BODY > CENTER > FORM#as_form TABLE[style='border: 3px solid rgb(213, 221, 243);'],BODY > CENTER > FORM#as_form > TABLE[style='border: 3px solid rgb(213, 221, 243);'] > TBODY > TR[bgcolor='#d5ddf3'],BODY > DIV.div-footer,BODY > DIV.div-footer > DIV.div-footer {border-color:#000 !important; border-width:20px !important; background-color:#000;}"+


// News Results
  /* footer background 1 */ "div.bottom-search {background: #262626 !important;}"+
  /* footer background 2*/ "TR[valign ='top'] > TD {background: transparent !important;}"+
  /* search */ "#search-stories > DIV, DIV.wrapper > div {background: transparent !important;}"+
  /* leftbar */ "#atd{background:transparent;}"+
	/* header Google links */	"BODY.hp > DIV#gbar > NOBR,BODY.serp > DIV#gbar > NOBR,BODY.sp > DIV#gbar > NOBR {position:relative; top:0.2em;}"+
	/* header iGoogle link */	"BODY.hp > DIV#gbar > NOBR > A.gb1:last-child,BODY.serp > DIV#gbar > NOBR > A.gb1:last-child,BODY.sp > DIV#gbar > NOBR > A.gb1:last-child {top:-1.3em !important;}"+
	/* search table */		"TABLE[width='1%'] {position:relative; top:1px; background-color:#000; width:100% !important;}"+
	/* search form cntnr */		"FORM.search-form > DIV.clearhack {display:table-cell; white-space:no-wrap;}"+
	/* search form input */		"FORM.search-form > DIV.clearhack > INPUT[name='q'] {width:28em;}"+
	/* logo imgs */			"IMG[src='/images/logo_sm.gif'],IMG[src='images/news.gif'],IMG[src='/images/news.gif'],IMG[width='150'][height='58'][alt='Go to Google News Home'],BODY.hp > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered > DIV.search > DIV#browse-header > TABLE > TBODY > TR > TD > A > IMG[width='205'][height='85'],BODY.sp > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered > DIV.search > DIV#browse-header > TABLE > TBODY > TR > TD > A > IMG[width='205'][height='85'],BODY.serp > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered > DIV.search > DIV#search-header > A > IMG[width='150'][height='58'],BODY.serp > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered > DIV.search > DIV#search-header > A > IMG[width='150'][height='55'],BODY > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered > DIV.search > DIV#page-header > TABLE > TBODY > TR > TD:first-child > A > IMG{visibility:hidden;}"+
	/* search logo adjustment */	"BODY.serp > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered > DIV.search > DIV#search-header {height:65px !important; background-position:0 10px !important;}"+
	/* news sources txt */		"BODY[marginwidth='0'][marginheight='3'][bgcolor='white'][rightmargin='0'][leftmargin='0'][topmargin='3'] > TABLE[cellspacing='0'][cellpadding='0'][border='0'][align='center'][style='clear: both;'] > TBODY > TR > TD[valign='top'][nowrap=''] > FORM[name='f'] > B > FONT[size='-1'][color='#aa0033'],BODY.hp > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered > DIV.search > DIV#browse-header > TABLE > TBODY > TR > TD > FORM.search-form > DIV.search-label {position:relative; top:5px; font-weight:normal; font-style:italic; color:#333 !important;}"+
	/* header bars */		"BODY.hp > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered > TABLE#main-table > TBODY > TR > TD > DIV.main > DIV#headline-wrapper > DIV.basic-title,BODY.hp > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered DIV.bt-border,BODY.hp > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered > TABLE#main-table > TBODY > TR > TD > DIV.main > DIV#headline-wrapper TD,BODY.serp > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered > DIV.search-sub-header > DIV#_h,BODY.serp > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered > DIV.search-sub-header > DIV#_h DIV,BODY.sp > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered > TABLE#main-table > TBODY > TR > TD > DIV.main DIV#_h,DIV.blended-section2 > TABLE.blended-section2 > TBODY > TR > TD DIV.basic-title   {padding-right:0.4em; padding-left:0.4em; background-color:#333; border:0; "+bS('radiusAll')+":14px;}"+
	/* top red line */		"BODY[marginwidth='0'][marginheight='3'][bgcolor='white'][rightmargin='0'][leftmargin='0'][topmargin='3'] > TABLE#topSection > TBODY > TR > TD[valign='top'] > TABLE[width='100%'][cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR > TD[width='100%'][bgcolor='#aa0033'][colspan='2'],BODY[marginheight='2'][bgcolor='#ffffff'][topmargin='2'] > TABLE[width='100%'][cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR > TD > TABLE[width='100%'][cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR > TD[width='100%'][bgcolor='#aa0033'][colspan='2'],BODY[marginheight='0'][bgcolor='#ffffff'][topmargin='0'] > TABLE[width='100%'][cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR > TD[width='100%'][bgcolor='#aa0033'][colspan='2'] {display:none;}"+
	/* notify box */		"DIV#notifybox {color:#000; "+bS('radiusAll')+":14px;}"+
	/* top stories dropdown */	"BODY[marginwidth='0'][marginheight='3'][bgcolor='white'][rightmargin='0'][leftmargin='0'][topmargin='3'] > TABLE#topSection > TBODY > TR > TD[valign='top'] > TABLE[width='100%'][cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR > TD[width='60%'][nowrap=''][bgcolor='#efefef'][style='padding-bottom: 0pt;'] > FONT.ks > FONT[size='-1'] > SELECT[name='ned'] {height:1.7em; background-color:#333; border: 1px solid #fff;}"+
	/* top stories headlines */	"TABLE#main-table > TBODY > TR > TD > DIV.main > DIV#headline-wrapper > DIV.blended-section2 > TABLE > TBODY > TR > TD {background-color:#000 !important;}"+
	/* right alert box */		"BODY[marginwidth='0'][marginheight='3'][bgcolor='white'][rightmargin='0'][leftmargin='0'][topmargin='3'] > TABLE#topSection > TBODY > TR > TD[valign='top'] > TABLE[width='100%'][cellspacing='0'][cellpadding='0'][border='0'][valign='top'] > TBODY > TR > TD[width='42%'][valign='top'] > DIV#cust_result > TABLE[width='100%'][cellspacing='5'][cellpadding='4'][border='0'][bgcolor='#ffff99'][align='center'][style='border: 1px solid rgb(204, 204, 204);'] {"+bS('radiusAll')+":14px;}"+
	/* more container */		"DIV#gbar DIV#gbi {left:420px !important;}"+
	/* more pop layer */		"SPAN#more,#gbar .gbard,#gbar .gb2 {background-color:#333 !important; border-right:solid 1px #a2bae7; border-bottom:solid 1px #a2bae7; color:#333 !important;}"+
	/* more pop layer link */	"DIV#gbar B.gb2 {color:#fff !important;}"+
	/* top stories txt */		"TABLE[width='100%'] .ks {color:#999 !important;}"+
	/* left nav bg */		".leftnav TABLE TABLE TBODY TR TD[nowrap=''],DIV.browse-sidebar > DIV.wrapper > DIV#left-nav-sections TABLE.nav,DIV.browse-sidebar > DIV.wrapper > DIV#left-nav-sections TABLE.nav-items,DIV.browse-sidebar > DIV.wrapper > DIV#left-nav-sections > TABLE.nav-items > TBODY > TR > TD.clickable,DIV.browse-sidebar > DIV.wrapper > DIV#left-nav-sections > TABLE.nav-items > TBODY > TR.item > TD {background-color:#000 !important;}"+
	/* left nav frontpage link */	"DIV.sidebar > DIV.back-to-frontpage > A {"+lc+" !important;}"+
	/* left nav selected bg */	"BODY > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered DIV.browse-sidebar > DIV.wrapper > DIV#left-nav-sections > TABLE.nav-items > TBODY > TR.selected > TD DIV.title {color:#fff !important;}"+
	/* left nav spacing */		".leftnav TABLE TABLE TBODY TR TD[bgcolor='#ffffff'] {display:none;}"+
	/* left nav line */		"BODY[marginwidth='0'][marginheight='3'][bgcolor='white'][rightmargin='0'][leftmargin='0'][topmargin='3'] > TABLE#topSection > TBODY > TR > TD[width='1'][height='1'][bgcolor='#cccccc'] {width:2px; background-color:#333;}"+
	/* left nav line alternate 1 */	"BODY[marginwidth='0'][marginheight='2'][bgcolor='#ffffff'][rightmargin='0'][leftmargin='0'][topmargin='2'] > TABLE[width='100%'][cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR > TD > TABLE[width='100%'][cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR > TD.leftnav > DIV[style='border-right: 1px solid rgb(204,204,204);'] {border-right:2px solid #333 !important;}"+
	/* left nav line alternate 2 */	"BODY.hp > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered > TABLE#main-table > TBODY > TR > TD > DIV.main > DIV#headline-wrapper,BODY.sp > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered > TABLE#main-table > TBODY > TR > TD > DIV.main > DIV#headline-wrapper {border-left-color:#333;}"+
	/* left nav borders (old) */	"BODY[marginwidth='0'][marginheight='3'][bgcolor='white'][rightmargin='0'][leftmargin='0'][topmargin='3'] > TABLE#topSection > TBODY > TR > TD.leftnav > TABLE[width='100%'][cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR > TD > TABLE[width='100%'][cellspacing='1'][cellpadding='0'][border='0'][bgcolor='#cccccc'],BODY[marginwidth='0'][marginheight='2'][bgcolor='#ffffff'][rightmargin='0'][leftmargin='0'][topmargin='2'] > TABLE[width='100%'][cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR > TD > TABLE[width='100%'][cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR > TD.leftnav > DIV[style='border-right: 1px solid rgb(204,204,204);'] > TABLE[width='100%'][cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR > TD > TABLE[width='100%'][cellspacing='1'][cellpadding='0'][border='0'][bgcolor='#cccccc'],.leftnav TABLE TABLE TBODY TR TD[nowrap=''] {position:relative; right:-1px; background-color:#333 !important;}"+
	/* left nav borders */	"DIV.browse-sidebar > DIV.wrapper > DIV#left-nav-sections > TABLE.nav-items > TBODY > TR > TD[height='2'][bgcolor='white'][colspan='2'] {background-color:#333;}"+
	/* left headline */		"DIV.hd {background:#333 !important; "+bS('border-radius-topleft')+":14px; "+bS('border-radius-bottomleft')+":14px;}" +
	/* header title bg */		"BODY.hp > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered DIV.basic-title {background-color:#333;}"+
	/* header color bars */		"BODY.hp > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered DIV.ls-wrapper DIV.bar {display:none;}"+
	/* section headers */		"DIV#section-header,BODY.hp > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered DIV.ls-wrapper DIV.basic-title {padding-left:0.7em; background-color:#333 !important; border:0 none !important; "+bS('radiusAll')+":14px;}"+
	/* more fewer linx (old) */	"TABLE[bgcolor='#efefef'][style='border: 1px solid rgb(0,0,153);'] {background-color:#000;}"+
	/* more fewer links new */		"BODY.hp > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered DIV.ls-wrapper DIV.more-link,BODY.hp > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered DIV.ls-wrapper DIV.fewer-link {background-color:#222; "+bS('radiusAll')+":8px;}"+
	/* search header r1col1 */	"TABLE[width='1%'] TBODY TR TD[valign='top'] TABLE TBODY TR TD,TABLE[width='100%'] TBODY TR TD[bgcolor='#efefef']{background:#000 none !important;}"+
	/* search header r1col2 */	"TABLE[width='1%'] TBODY TR TD[valign='top'] TABLE TBODY TR TD A {position:relative; top:12px;}"+
	/* search header barL */	"TABLE TBODY TR TD[width='60%'] {background-color:#333; border:0; "+bS('border-radius-topleft')+":14px; "+bS('border-radius-bottomleft')+":14px;}"+
	/* search header barL txt*/	"TABLE TBODY TR TD[width='60%'] FONT {color:#000;}"+
	/* search header barR */	"TABLE TBODY TR TD[width='40%'] {background-color:#333; border:0; "+bS('border-radius-topright')+":14px; "+bS('border-radius-bottomright')+":14px;}"+
	/* results top ad */		(uHideAds?"TABLE#main-table DIV.top-ads {display:none;}":"")+
	/* results area width */	"BODY.serp > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered > TABLE#main-table > TBODY > TR > TD > TABLE.left > TBODY > TR > TD.search-middle {width:100%;}"+
	/* results area R-nav */	"BODY.serp > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered > TABLE#main-table > TBODY > TR > TD > TABLE.left > TBODY > TR > TD.right-nav {display:none;}"+
	/* results nav r-side line */	"BODY.serp > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered > TABLE#main-table > TBODY > TR > TD.nav > DIV.sidebar {border-color:#333;}"+
	/* results nav headline */	"BODY.serp > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered > TABLE#main-table > TBODY > TR > TD.nav > DIV.sidebar DIV.filter-label {background-color:#333; padding-left:0.5em; color:#ccc !important; "+bS('border-radius-topleft')+":14px; "+bS('border-radius-bottomleft')+":14px;}"+
	/* quote box */			"DIV.qdetails DIV.qsnippet,.quote-story .quotesnippet {padding-right:1.2em !important; padding-left:1.2em !important; text-align:justify; font-weight:bold; "+bS('radiusAll')+":14px;}"+
	/* quote txt */			"#search-stories .quote-story .quotesnippet,#search-stories .quote-story .quotesnippet *,DIV[class='search-results section'] .quote-story .quotesnippet,DIV[class='search-results section'] .quote-story .quotesnippet * {color:#000 !important;}"+
	/* quote arrow */		"DIV.qdetails DIV.qarrow {border-right-color:#000; border-left-color:#000;}"+
	/* results txt */		"TABLE TBODY TR TD DIV[style='margin: 60px 22px;'],BODY > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered DIV {color:#999 !important;}"+
	/* result spacing */		"DIV.mainbody TABLE TBODY TR TD[align='left'] TABLE[cellspacing='7'][cellpadding='2'] {margin:0.5em 0pt;}"+
	/* footer search borders */	"CENTER > CENTER > TABLE[width='100%'][cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR > TD[bgcolor='#3366cc'] IMG {display:none;}"+
	/* footer search bg */		"CENTER > CENTER > TABLE[width='100%'][cellspacing='0'][cellpadding='3'][border='0'] > TBODY > TR > TD[bgcolor='#e5ecf9'][align='center'],BODY > DIV#main-wrapper > DIV.footer > DIV.bottom-search,BODY > DIV#main-wrapper > DIV.footer > DIV.bottom,BODY.serp > DIV#main-wrapper > DIV#pagination > TABLE > TBODY > TR > TD > A > DIV#start-prev,BODY.serp > DIV#main-wrapper > DIV#pagination > TABLE > TBODY > TR > TD > DIV#start,BODY.serp > DIV#main-wrapper > DIV#pagination > TABLE > TBODY > TR > TD > DIV#current,BODY.serp > DIV#main-wrapper > DIV#pagination > TABLE > TBODY > TR > TD > A > DIV.o,BODY.serp > DIV#main-wrapper > DIV#pagination > TABLE > TBODY > TR > TD > A > DIV#end-next {border:0 none; background:#000 none;}"+
	/* footer seach borders */	"CENTER > CENTER > TABLE[width='100%'][cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR > TD[bgcolor='#aa0033'] {display:none;}"+
	/* footer disclaimer */		"BODY.hp > DIV#main-wrapper > DIV.footer > DIV.footer-disclaimer {color:#333 !important;}"+
	/* personalize header */	"#cust_link_tbl {background-color:#333; border:0 none !important; "+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}"+
	/* personalize button */	"DIV.blended-section2 > DIV.column2 > SPAN > DIV#personalize {background-color:#223; border:0 none !important; "+bS('radiusAll')+":14px;}"+
	/* in the news top line */	"DIV.t-IN_THE_NEWS {border-top-color:#333 !important;}"+
	/* in the news headline */	"DIV.t-IN_THE_NEWS > DIV.basic-title {color:#ccc !important;}"+
	/* Finance R-sidebar Header */	"DIV.sp-b DIV.basic-title {background-color:#333; border:0 none !important; "+bS('radiusAll')+":14px;}"+

	// Image Version
		/* cell container */	"TD#ImageSection TABLE TBODY TR TD {padding:5px;}"+
		/* cells */		"TD#ImageSection TABLE TBODY TR TD DIV[style='border: 1px solid rgb(255, 255, 255); padding: 7px 7px 4px; white-space: nowrap; width: 104px;'] {background-color:#333; border:0 none !important; "+bS('radiusAll')+":14px;}"+
		/* img container */	"DIV.divnohighlightnoie {border:0 none !important;}"+
		/* img container */	"DIV.divnohighlightnoie IMG.centerimagenonie {position:relative; left:-5px;}"+
		/* rightBar */		"DIV#RightBarContent DIV {background-color:#000 !important;}"+

	// AP/AFP.google News
		/* body txt */		"DIV DIV#hn-content DIV {color:#999 !important;}"+
		/* article title */	"DIV DIV#hn-content DIV H1 {color:#fff;}"+
		/* footer */		(uHideFooters?"DIV DIV#hn-footer {display:none;}":"")+
		/* /hostednews/ expanded below in BF-func */


// Maps
	/* logo img */			"IMG[alt='Go to Google Maps Home'],BODY > DIV#header > DIV#search > FORM#q_form > DIV#logo IMG,DIV#main > DIV#inner > DIV#header > DIV#search > FORM#q_form > DIV#logo > A > IMG.logo-img {display:none;}"+
	/* help linx */			"DIV.helplinks DIV {background-color:#000 !important; "+bS('border-radius-bottomright')+":14px; "+bS('border-radius-bottomleft')+":14px;}"+
	/* header txt */		"DIV#header SPAN {color:#999;}"+
	/* mapping tabs */		"TABLE#paneltabs TBODY TR TD {background-color:#000 !important; "+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}"+
	/* mapping tab txt */		"TABLE#paneltabs TBODY TR TD.tabOff A DIV,TABLE#paneltabs TBODY TR TD.tabOn A DIV {font-weight:bold; color:#999 !important;}"+
	/* map popup txt */		"DIV.iw #basics DIV,DIV.gmnoprint DIV DIV DIV B{color:#000 !important;}"+
	/* send panel container */	"DIV.sdb {margin:5px; background-color:#000 !important; border:3px solid #f90 !important; "+bS('radiusAll')+":14px;}"+
	/* send panel inner */		"DIV.sdb DIV.c,DIV.sdb DIV.c DIV DIV {border:0 none !important; background-color:#000 !important; color:#999 !important;}"+
	/* link to this page panel */	"DIV#le {background-color:#000 !important; "+bS('border-radius-bottomright')+":14px; "+bS('border-radius-bottomleft')+":14px;}"+
	/* link to panel txt */		"DIV#le TABLE.letbl TBODY TR TD {color:#999 !important;}"+
	/* panel selection */		"DIV#page DIV#panel DIV.selected {background-color:#222 !important; color:#333; "+bS('border-radius-topleft')+":14px; "+bS('border-radius-bottomleft')+":14px;}"+
	/* results area */		"DIV#hp DIV,DIV#hp TABLE TR TD,DIV#panel DIV DIV,DIV#panel DIV TABLE TBODY TR TD,DIV#page DIV,DIV#page TABLE TBODY TR TD {color:#777 !important;}"+
	/* sponsored linx */		"TABLE > TBODY > TR > TD > TABLE.geoads,TABLE > TBODY > TR > TD > DIV.adsmessage,#panel .ads,#contentads,#rhsads {display:none;}"+
	/* searched term in title */	"TABLE.res TBODY TR TD DIV.name SPAN A SPAN B {color:#aaa !important;}"+
	/* phone numbers */		"TABLE.res TBODY TR TD DIV SPAN.tel {color:#090;}"+
	/* highlight */			"FONT[color='red'] {color:#f00;}"+
	/* map points */		"TABLE.ddwpt_table TD {background-color:#333;}"+
	/* my maps content */		"DIV#mmheaderpane DIV.mmboxheaderinactive {background-color:#181818;}"+
	/* search logo(s) */		"DIV.n DIV.imgn IMG {display:none;}"+
	/* legal & navtech blocks */	"DIV.legal,DIV.cprt {display:none;}"+
	/* headers */			"TABLE#titlebar,DIV#pp-maincol DIV.bar,DIV#pp-sidecol DIV.bar {border:0; background-color:#333; "+bS('radiusAll')+":14px;}"+
	/* txt-view body width */	"#contentpanel > TABLE[style='margin-top: 0.2em;'],#contentpanel > TABLE[style='margin-top: 0.2em;'] TBODY TR.lr TD TABLE {width:99%;}"+
	/* txt-view footer block */	"#localfooter TABLE TBODY TR TD {border:0; background-color:#000;}"+
	/* mymaps feat cont bg */	"DIV.mmheaderpane DIV DIV.mmboxheaderinactive,DIV.mmboxbody IFRAME HTML BODY {background-color:#000 !important;}"+
	/* lowerpanel activeselected */	"DIV#rv-content > DIV.rvitem > DIV.rvcontrols > SPAN.rvactivetitle {color:#fff !important;}"+
	/* search results notice */	"DIV#resultspanel > DIV.local > DIV#localpanelnotices {display:none;}"+
	/* place page bg */		"BODY DIV#page > DIV#wpanel {background-color:inherit;}"+
	/* place loc action bar */	"DIV#pp-headline-details DIV.actbar,DIV.actbar-lhs-wrapper > DIV.actbar {background-color:#000 !important;}"+
	/* place loc dropdown */	"#resultspanel .dropdown {background-color:#333; "+bS('radiusAll')+":14px;}"+
	/* dropdown menu item bg */	".dropdownmenu .menuitem {background-color:#222;}"+
	/* bottom search bgs */		"DIV.pp-footer > DIV.pp-footer-links,DIV#localfooter > #bsf {background-color:#000; border:0 none;}"+
	// Print-page
	/* directions txt */	"DIV.segmentdiv TABLE TBODY TR TD {background-color:#000;}"+
	/* title width */	"@media print{ #ph TD.phh {width:100%;} }"+
	/* save trees msg */	"@media print{ #pnc.untouched #gmm_msg {display:none;} }"+
  //Maps fix
  /* container input */ "#search .q_d_container {border:0px solid #CCCCCC;height:30px;padding-right:32px;}"+
  /* container button */"#search .q-button {background:#333;border: 1px solid;}"+  
  /* container button2 */"#search .q-inner,#search .q-outer  {border:0px;} "+
  /* white description */".res {color:white;}"+ 
  /* color map bar */"#topbar-startcol {background:#333;}"+  

// Gmail [basic HTML view]
  /* body color */ "BODY[bgcolor='#ffffff']{height: 100%;}"+
  /* gmail top bar*/ "TD[bgcolor='#ffffff']{background:transparent;}"+
	/* gmail */		"HTML > BODY > DIV > #modules A B {color:#36a !important;}"+
	/* gmail write container */ "BODY[g_editable='true']{background-color:rgb(219,231,232) !important;background:none !important; color:black;}"+
	/* view type headers */		"TABLE.bn > TBODY> TR > TD#bm {border:0 none; background-color:#181818; "+bS('radiusAll')+":14px;}"+
	/* logo img */			"BODY[bgcolor='#ffffff'] > TABLE[width='100%'] > TBODY > TR:first-child > TD[width='143'] > H1 > A > IMG {display:none;}"+
	/* menu selected */		"BODY > TABLE > TBODY > TR > TD > TABLE[width='100%'].m > TBODY > TR > TD[bgcolor='#c3d9ff'],BODY > TABLE > TBODY > TR > TD > TABLE[width='100%'].m > TBODY > TR > TD[bgcolor='#fad163'] {background-color:#333; "+bS('border-radius-topleft')+":14px; "+bS('border-radius-bottomleft')+":14px;}"+
	/* menu selected txt */		"BODY > TABLE > TBODY > TR > TD > TABLE[width='100%'].m > TBODY > TR > TD[bgcolor='#c3d9ff'] A,BODY > TABLE > TBODY > TR > TD > TABLE[width='100%'].m > TBODY > TR > TD[bgcolor='#fad163'] A {color:#fff !important;}"+
	/* upper alert msg box */	"BODY > TABLE[width='100%'] > TBODY > TR > TD > TABLE[cellspacing='4'][align='center'] > TBODY > TR:first-child > TD:first-child {"+bS('radiusAll')+":14px;}"+
	/* upper alert msg box txt */	"BODY > TABLE[width='100%'] > TBODY > TR > TD > TABLE[cellspacing='4'][align='center'] > TBODY > TR:first-child > TD:first-child > B {color:#000 !important;}"+
	/* search options bgs */	"BODY > TABLE[width='100%'] > TBODY > TR > TD > TABLE[width='100%'] > TBODY > TR > TD[bgcolor='#74d982'],BODY > TABLE[width='100%'] > TBODY > TR > TD > TABLE[width='100%'] > TBODY > TR > TD[bgcolor='#b5edbc'],BODY > TABLE[width='100%'] > TBODY > TR > TD > TABLE[width='100%'] > TBODY > TR > TD[bgcolor='#b5edbc'] > TABLE[bgcolor='#74d982'] {background-color:#000 !important;}"+
	/* msg-list L-spacer */		"BODY > TABLE[width='100%'] > TBODY > TR > TD[valign='top'] > TABLE[width='100%'] > TBODY > TR > TD[width='5'][bgcolor='#c3d9ff'],BODY > TABLE[width='100%'] > TBODY > TR > TD[valign='top'] > TABLE[width='100%'] > TBODY > TR > TD[width='5'][bgcolor='#74d982'],BODY > TABLE[width='100%'] > TBODY > TR > TD[valign='top'] > TABLE[width='100%'] > TBODY > TR > TD[width='5'][bgcolor='#fad163'] {background-color:#333;}"+
	/* msg-list bg */		"BODY > TABLE[width='100%'] > TBODY > TR > TD[valign='top'] > TABLE[width='100%'] > TBODY > TR > TD > FORM[name='f'] > TABLE[bgcolor='#c3d9ff'],BODY > TABLE[width='100%'] > TBODY > TR > TD[valign='top'] > TABLE[width='100%'] > TBODY > TR > TD > FORM[name='f'] > TABLE[bgcolor='#74d982'],BODY > TABLE[width='100%'] > TBODY > TR > TD > TABLE[width='100%'] > TBODY > TR > TD > TABLE[width='100%'][bgcolor='#c3d9ff'],BODY > TABLE[width='100%'] > TBODY > TR > TD > TABLE[width='100%'] > TBODY > TR > TD > TABLE[width='100%'][bgcolor='#74d982'],BODY > TABLE[width='100%'] > TBODY > TR > TD > TABLE[width='100%'] > TBODY > TR > TD > TABLE[width='100%'][bgcolor='#fad163'] {background-color:#333;}"+
	/* msg-list row normal */	"BODY > TABLE[width='100%'] > TBODY > TR > TD[valign='top'] > TABLE[width='100%'] > TBODY > TR > TD > FORM[name='f'] > TABLE.th > TBODY > TR[bgcolor='#ffffff'] {background-color:#000;}"+
	/* msg-list row Read */		"BODY > TABLE[width='100%'] > TBODY > TR > TD[valign='top'] > TABLE[width='100%'] > TBODY > TR > TD > FORM[name='f'] > TABLE.th > TBODY > TR[bgcolor='#e8eef7'] {background-color:#222;}"+
	/* msg-list row unread txt */	"BODY > TABLE[width='100%'] > TBODY > TR > TD[valign='top'] > TABLE[width='100%'] > TBODY > TR > TD > FORM[name='f'] > TABLE.th > TBODY > TR[bgcolor='#e8eef7'] > TD {color:#999 !important;}"+
	/* msg bg */			"BODY > TABLE[width='100%'] > TBODY > TR > TD > TABLE[width='100%'] > TBODY > TR > TD > TABLE[width='98%'][bgcolor='#CCCCCC'] {background-color:#000;}"+
	/* msg header */		"BODY > TABLE[width='100%'] > TBODY > TR > TD > TABLE[width='100%'] > TBODY > TR > TD > TABLE[width='100%'][bgcolor='#e0ecff'],BODY > TABLE[width='100%'] > TBODY > TR > TD > TABLE[width='100%'] > TBODY > TR > TD > TABLE[width='100%'][bgcolor='#b5edbc'] {background-color:#000;}"+
	/* msg body bg */		"BODY > TABLE[width='100%'] > TBODY > TR > TD > TABLE[width='100%'] > TBODY > TR > TD TABLE[width='100%'][bgcolor='#efefef'] {border:0 none; "+bS('border-radius-topright')+":8px; "+bS('border-radius-topleft')+":8px;}"+
	/* msg body */			"BODY > TABLE[width='100%'] > TBODY > TR > TD > TABLE[width='100%'] > TBODY > TR > TD TABLE[width='100%'][bgcolor='#efefef'] DIV.msg {color:#000; "+bS('border-radius-bottomright')+":8px; "+bS('border-radius-bottomleft')+":8px;}"+
	/* msg body uppper */		"BODY > TABLE[width='100%'] > TBODY > TR > TD > TABLE[width='100%'] > TBODY > TR > TD TABLE[width='100%'][bgcolor='#efefef'] > TBODY > TR:first-child {"+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}"+
	/* msg lowerReplyBox */		"BODY > TABLE[width='100%'] > TBODY > TR > TD > TABLE[width='100%'] > TBODY > TR > TD TABLE[width='100%'].qr TD {background-color:#000; color:#999 !important;}"+
	/* msg lowerReplyBox logoFix */	"BODY > TABLE[width='100%'] > TBODY > TR > TD > TABLE[width='100%'] > TBODY > TR > TD TABLE[width='100%'].qr > TBODY > TR > TD > TABLE > TBODY > TR > TD[colspan='2'] > TABLE[width='100%'] > TBODY > TR > TD[width='1%'] {background-image:none !important;}"+
	/* compose tbl */		"FORM[name='f'] > TABLE.compose {background-color:#000;}"+
	/* compose tbl logo fix */	"FORM[name='f'] > TABLE.compose > TBODY > TR:first-child > TD[width='1%']:first-child {width:inherit !important; height:inherit !important; font-size:0.8em; background-image:none !important;}"+
	/* contacts list header */	"BODY > TABLE[width='100%'] > TBODY > TR > TD[valign='top'] > TABLE[width='100%'] > TBODY > TR > TD > TABLE[bgcolor='#fad163'] > TBODY > TR:first-child > TD:first-child > DIV.hp > DIV.bg {background-color:#333;}"+
	/* contacts list bg */		"BODY > TABLE[width='100%'] > TBODY > TR > TD[valign='top'] > TABLE[width='100%'] > TBODY > TR > TD > TABLE[bgcolor='#ffffff'].th,BODY > TABLE[width='100%'] > TBODY > TR > TD[valign='top'] > TABLE[width='100%'] > TBODY > TR > TD[bgcolor='#fff7d7'] {background-color:#000;}"+
	/* contacts list tbl txt */	"BODY > TABLE[width='100%'] > TBODY > TR > TD[valign='top'] > TABLE[width='100%'] > TBODY > TR > TD > TABLE[bgcolor='#ffffff'].th > TBODY > TR > TD {color:#ccc !important;}"+
	/* settings selected tab */	"BODY > TABLE[width='100%'] > TBODY > TR > TD[valign='top'] > TABLE[width='100%'] > TBODY > TR > TD > TABLE[bgcolor='#ffffff'].th,BODY > TABLE[width='100%'] > TBODY > TR > TD[valign='top'] > TABLE[width='100%'] > TBODY > TR > TD[bgcolor='#fff7d7'] DIV.nav > UL > LI.on {background-color:#333; color:#fff;}"+
	/* header txt */		"BODY > TABLE[width='100%'] > TBODY > TR TD[bgcolor='#fff7d7'] > TABLE[bgcolor='#fad163']:first-child H2 {color:#fff;}"+
	/* filters bg */		"BODY > TABLE[width='100%'] > TBODY > TR TD[bgcolor='#fad163'],BODY > TABLE[width='100%'] > TBODY > TR TD[bgcolor='#fff7d7'],BODY > TABLE[width='100%'] > TBODY > TR TD[bgcolor='#fad163'],BODY > TABLE[width='100%'] > TBODY > TR TD[bgcolor='#fff7d7'],BODY > TABLE[width='100%'] > TBODY > TR TD[bgcolor='#fff7d7'] DIV.middle-container-padded,BODY > TABLE[width='100%'] > TBODY > TR TD[bgcolor='#fff7d7'] > TABLE[bgcolor='#fad163']:last-child {background-color:#000; color:#999 !important;}"+
	/* filters header */		"BODY > TABLE[width='100%'] > TBODY > TR TD[bgcolor='#fff7d7'] > TABLE[bgcolor='#fad163']:first-child {padding-left:0.5em; background-color:#000;}"+
	/* filters tab selected */	"BODY > TABLE[width='100%'] > TBODY > TR TD[bgcolor='#fff7d7'] > TABLE[bgcolor='#fad163']:first-child DIV.nav > UL > LI.on {background-color:#333; color:#fff;}"+
	/* page txt */			"BODY > TABLE > TBODY > TR > TD > TABLE.ft TD,BODY > TABLE > TBODY > TR > TD > TABLE.ft TD DIV,BODY > TABLE > TBODY > TR > TD > TABLE > TBODY > TR > TD[bgcolor='#fff7d7'] > DIV.prf TD,BODY > TABLE > TBODY > TR > TD > TABLE > TBODY > TR > TD[bgcolor='#fff7d7'] > DIV.prf DIV {color:#999 !important;}"+
	/* footer */			(uHideFooters?"BODY > TABLE > TBODY > TR > TD > TABLE.ft > TBODY > TR > TD[align='center'] > FONT[size='1'] {display:none;}":"")+
/* Gmail expanded below in BF-func */


// Docs
	/* logo img */			"BODY > DIV#masthead > TABLE.searchbar > TBODY > TR#logo-section > TD.searchbar-logo > DIV > A[href='.'] > IMG {display:none;}"+
	/* doclist borders */		"DIV#doclist > DIV.doclistappview {background:#000 none;}"+
	/* templates header */		"DIV#templates-header > DIV#templates-header-location {background-color:#333 !important; border:0 none !important; "+bS('radiusAll')+":14px;}"+
	/* templates header tabs */	"DIV#templates-header > DIV#templates-header-tabs {border:0 none; background-color:#000;}"+
	/* templates header tab sel */	".templates-list-selected {margin-bottom:1em; border:0 none !important; background-color:#000 !important; font-weight:bold; color:#fff !important;}"+
	/* settings outer box */	"FORM.settings-container-form > TABLE.roundedblock {"+bS('radiusAll')+":14px;}"+
	/* settings corner imgs */	"FORM.settings-container-form > TABLE.roundedblock TD {background-image:none;}"+
	/* templates pageTxt */		"#templates-main H3.templates-entry-name,#templates-main P.templates-entry-description,#pagination_numbers {color:#ccc !important;}"+
	/* footers */			(uHideFooters?"BODY > DIV.footer {display:none;}":"")+
/* Docs expanded below in BF-func */


// Product Search / Shopping
	/* logo img */			"A#glogo > IMG[width='150'][height='105'],CENTER > H1#ps-logo > IMG,BODY > FORM[name='f'] > TABLE[width='100%'][cellspacing='0'][cellpadding='0'][border='0'][style='clear: left;'] > TBODY > TR > TD:first-child > A#glogo > IMG,BODY > DIV#hp-cont > H1#hp-logo > IMG,BODY > DIV#srp-header > FORM[name='f'] > TABLE:first-child > TBODY > TR > TD:first-child > A#glogo > IMG,BODY > FORM > DIV#advd-search-header > TABLE:first-child > TBODY > TR > TD[width='1%']:first-child > A#advd-logo > IMG,BODY > DIV#srp-header > FORM[name='f'] > TABLE > TBODY > TR > TD > A#srp-logo > IMG {display:none;}"+
	/* Home logo img [insert] */	"BODY > DIV#hp-cont > H1#hp-logo {height:131px !important; margin-top:25px; margin-bottom:0; background:transparent url('"+gHpL+"') no-repeat scroll center !important;}"+
	/* Home search input */		"BODY > DIV#hp-cont > FORM[name='f'] > TABLE#search-input > TBODY > TR > TD[align='center'] > INPUT[name='q'].srch_box {width:28em;}"+
	/* adv search logo adjust */	"BODY > FORM > DIV#advd-search-header > TABLE:first-child > TBODY > TR > TD[width='1%']:first-child > A {width:inherit !important;}"+
	/* header bar */		"TABLE[cellspacing='0'][cellpadding='0'][style='border-top: 1px solid rgb(68, 120, 212); background: rgb(234, 239, 250) none repeat scroll 0% 0%; width: 100%; "+bS('background-clip')+": "+bS('initial')+"; "+bS('background-origin')+": "+bS('initial')+"; "+bS('background-inline-policy')+": "+bS('initial')+";'],TABLE#ps-titlebar,BODY > DIV#ps-titlebar,BODY > FORM > DIV#advd-search-header H1 {padding:0 0.3em 0.1em 0.3em; background-color:#333 !important; border:0 none !important; "+bS('radiusAll')+":14px;}"+
	/* L-menu */			"BODY > DIV#lhs-ref {padding-top:0.2em; background-color:#181818; border-right:0 none; "+bS('radiusAll')+":14px;}"+
	/* sponsored linx */		"DIV[style='padding-top: 11px;'] > DIV[style='font-size: small; background-color: rgb(255,249,221);'],BODY[vlink='#551a8b'][text='#000000'][marginheight='3'][link='#0000cc'][alink='#ff0000'][topmargin='3'] > TABLE[cellspacing='0'][cellpadding='0'][border='0'][bgcolor='#ffffff'][align='right'][style=''] {display:none;}"+
	/* top & bottom ads */		(uHideAds?"BODY > DIV#ads-top,BODY > DIV.list > DIV#ads-bot {display:none;}":"")+
	/* results width aleviater */	"BODY > DIV.rhs,BODY > DIV.list {max-width:none; margin-right:0;}"+
	/* search txt */		"TABLE.list FORM,TABLE.list SPAN.prod-detail,TABLE.list > TBODY > TR > TD.ol NOBR,TABLE.list > TBODY > TR > TD.ol SPAN,TD.bo > NOBR,BODY > DIV.list DIV,BODY > DIV.list P,BODY > DIV.grid DIV {color:#999 !important;}"+
	/* result prices */		"BODY > DIV.list > OL#results P.result-price,BODY > DIV.list > OL#results P.result-taxship,BODY > DIV.grid P.result-price,BODY > DIV.grid P.result-taxship {color:#fff !important;}"+
	/* search desc */		"TABLE.list > TBODY > TR > TD.ol {color:#fff !important;}"+
	/* vertical ads */		(uHideAds?"TABLE#ps-vertical-ads,DIV#ads-rhs {display:none;}":"")+
	/* advanced search box */	"BODY > FORM > DIV.as-table-cont,BODY > FORM > DIV.as-table-cont TD {border:0 none; color:#999 !important;}"+
	/* footer search refinement */	"DIV.main-top > DIV#attr-div > TABLE.attr-table,DIV.main-top > DIV#attr-div > TABLE.attr-table LI {color:#ccc;}"+
	/* footer logo(s) */		"TABLE DIV#nf,TABLE DIV#nc,TABLE DIV.nr,TABLE DIV#nn {height:0px; background:none;}"+
	/* footer disclaimer */		(uHideFooters?"TABLE[width='65%'][align='center'] > TBODY > TR > TD[align='center'] > SPAN.disclaimer {display:none;}":"")+
	/* footer search */		"BODY > TABLE[cellspacing='0'][cellpadding='3'][style='border-top: 1px solid rgb(68, 120, 212); border-bottom: 1px solid rgb(68, 120, 212); background: rgb(234, 239, 250) none repeat scroll 0% 0%; width: 100%; "+bS('background-clip')+": "+bS('initial')+"; "+bS('background-inline-policy')+": "+bS('initial')+";'],BODY > TABLE#ps-footer {background-color:#000 !important; border:0 none !important;}"+
	/* footer txt */		(uHideFooters?"BODY > TABLE[cellspacing='0'][cellpadding='3'][style='border-top: 1px solid rgb(68, 120, 212); border-bottom: 1px solid rgb(68, 120, 212); background: rgb(234, 239, 250) none repeat scroll 0% 0%; width: 100%; "+bS('background-clip')+": "+bS('initial')+"; "+bS('background-inline-policy')+": "+bS('initial')+";'] > TBODY > TR > TD[align='center'] > FONT[size='-1'],BODY[vlink='#551a8b'][text='#000000'][marginheight='3'][link='#0000cc'][alink='#ff0000'][topmargin='3'] > CENTER > FONT[size='-1'],BODY > TABLE#ps-footer > TBODY > TR > TD[align='center'] > FONT[size='-1'],BODY > P.as-footer {display:none;}":"")+
	/* footer pagination imgs */	"BODY > DIV.n > TABLE > TBODY > TR > TD > DIV#nl {background-image:none;}"+
	/* footer bg */			"BODY > DIV#ps-footer > DIV#ps-footer-bg {background-color:#000 !important;}"+
	/* footer disclaimer */		"BODY > DIV#ps-footer > P.ps-disclaimer {color:#777;}"+
	/* footer */			(uHideFooters?"BODY > DIV#hp-cont > P:last-child {display:none;}":"")+
/* Product Search / Shopping sub-pages expanded below in BF-func */


//Shopping List
	/* logo img */			"BODY[style='margin-top: 4px; cursor: default;'] > TABLE[width='100%'] > TBODY > TR:first-child > TD[valign='top']:first-child > A > IMG {visibility:hidden;}"+
	/* header */			"BODY[style='margin-top: 4px; cursor: default;'] > TABLE[width='100%'] > TBODY > TR:first-child > TD[style='border-top: 1px solid rgb(51, 102, 204); padding: 3px 7px; background: rgb(229, 236, 249) none repeat scroll 0%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;']:first-child {background-color:#333 !important; border:0 none !important; "+bS('radiusAll')+":14px;}"+
	/* menu r-line */		"BODY[style='margin-top: 4px; cursor: default;'] > TABLE#content > TBODY > TR:first-child > TD[style='border-right: 2px solid rgb(229, 236, 249);']:first-child {border-color:#333 !important;}"+
	/* alert block */		"#undo-all {color:#000 !important; "+bS('radiusAll')+":14px;}"+
	/* tbl brdr */			"BODY[style='margin-top: 4px; cursor: default;'] > TABLE {border:0 none !important}"+
	/* bottom search bg */		"BODY[style='margin-top: 4px; cursor: default;'] > TABLE[width='100%'][style='border-top: 1px solid rgb(51, 102, 204); border-bottom: 1px solid rgb(51, 102, 204); background: rgb(229, 236, 249) none repeat scroll 0%; margin-top: 20px; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;'] > TBODY > TR:first-child > TD[align='center']:first-child {background-color:#000 !important;}"+



// Picasa Web Albums
	/* head bar bg */		"BODY > DIV.lhcl_onebar {background-color:#000;}"+
	/* logo clip */			".lhcl_googlephotos_body #lhid_logo {position:absolute; top:34px; clip:rect(1px,178px,27px,1px);}"+
	/* top nav cntnr */		".gphoto-topnav {background:#222 none; border:0 none;}"+
	/* top nav tab-notches */	".gphoto-topnav-tab .gphoto-notch {display:none;}"+
	/* top nav tabs */		".gphoto-topnav-tab a {border:0 none; "+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}"+
	/* top nav tabBg active */	".gphoto-topnav-tab-active A {background-color:#000; color:#fff !important;}"+
	/* top nav tabBg inactive */	".gphoto-topnav-tab-inactive A {background-color:#555;}"+
	/* search header bar */		".lhcl_contextbar {width:99%; margin-left:5px; margin-right:5px; background:#333 none; border:0 none; "+bS('radiusAll')+":14px;}"+
	/* search results help box */	".lhcl_search_results_help {background:#151515 none; border:0 none; color:#999; "+bS('radiusAll')+":14px;}"+
	/* lowerPnl cntnr */		".lhcl_googlephotos_body #lhid_shell {border-color:#222;}"+
	/* lowerPnl L */		".lhcl_googlephotos_body #lhid_leftbox {background-color:#000;}"+
	/* lowerPnl L */		"#lhid_homeContextDisplay SPAN.gphoto-context-current {color:#fff;}"+
	/* lowerPnl slider */		".lhcl_googlephotos_body .lhcl_slider,.gphoto-collapsibletrayhandle {background:#222 none !important;}"+
	/* lowerPnl R */		".lhcl_googlephotos_body #lhid_rightbox,.lhcl_googlephotos_body .lhcl_sidebar, .lhcl_googlephotos_body .lhcl_tray {background-color:#151515;}"+
	/* lowerPnl R box */		".lhcl_googlephotos_body #lhid_albumprop {background-color:#222;}"+
	/* settings lowerPnl */		"BODY > DIV.lhcl_settingsdialogborder {background-color:#000; color:#000;}"+
	/* img name highlight */	".goog-icon-list-tooltip {background:#555 none; border:0 none; "+bS('radiusAll')+":8px;}"+
	/* img toolbar */		".lhcl_googlephotos_body .lhcl_toolbar {background-color:#000;}"+
	/* img toolbar lines */		".gphoto-context-box,.goog-toolbar-separator {border-color:#333;}"+
	/* img popularity info */	".lhcl_popularityinfo {background-color:#333; "+bS('radiusAll')+":14px;}"+
	/* img comment box */		"DIV.gphoto-comment-hoverable {background-color:#000; border:0 none;}"+
	/* img toolbar heading */	".lhcl_googlephotos_body .lhcl_title {color:#fff;}"+
	/* img comment boxHover */	"DIV.gphoto-comment-hoverable:hover {background-color:#222; "+bS('radiusAll')+":14px;}"+
	
/* Picasa Web Albums expanded below in BF-func */


// Finance
	/* logo img */			"BODY DIV.g-doc DIV.g-section > DIV.g-unit > DIV.sfe-logo > A > IMG {display:none;}"+
	/* left nav selected */		"BODY > DIV#body-wrapper > DIV.g-doc > DIV.g-section UL#navmenu > LI.nav-selected,BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section UL#navmenu > LI.nav-selected,BODY > DIV.g-doc > DIV.g-section UL#navmenu > LI.nav-selected {background-color:#333;}"+
	/* left nav item */		"BODY > DIV#body-wrapper > DIV.g-doc > DIV.g-section UL#navmenu > LI.nav-item,BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section UL#navmenu > LI.nav-item,BODY > DIV.g-doc > DIV.g-section UL#navmenu > LI.nav-item {background-color:#181818;}"+
	/* left nav item link */	"BODY > DIV#body-wrapper > DIV.g-doc > DIV.g-section UL#navmenu > LI.nav-item > A *,BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section UL#navmenu > LI.nav-item > A *,BODY > DIV.g-doc > DIV.g-section UL#navmenu > LI.nav-item > A * {color:#999 !important;}"+
	/* left nav sub */		"BODY > DIV#body-wrapper > DIV.g-doc > DIV.g-section UL#navmenu > LI.navsub,BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section UL#navmenu > LI.navsub,BODY > DIV.g-doc DIV.g-section UL#navmenu > LI.navsub,BODY > DIV.g-doc DIV.g-section UL#navmenu > LI.navsub DIV {background-color:#000; color:#fff !important;}"+
	/* left Recent box */		"BODY > DIV#body-wrapper > DIV.g-doc > DIV.g-section #rq-box,BODY > DIV#body-wrapper > DIV.g-doc > DIV.g-section .ra-box,BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section #rq-box,BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section .ra-box,BODY > DIV.g-doc > DIV.g-section #rq-box,BODY > DIV.g-doc > DIV.g-section .ra-box {margin-top:3em; background-color:#333 !important; border:0 none !important; "+bS('radiusAll')+":14px;}"+
	/* headers */			"BODY > DIV#body-wrapper > DIV.g-doc > DIV.g-section DIV.hdg,BODY > DIV.g-doc > DIV.g-section DIV.hdg,BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section DIV.g-wrap > DIV.g-section > DIV.hdg,BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section DIV#reorder DIV.hdg,BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section DIV.g-wrap > DIV.g-section > DIV.g-unit > DIV.g-c > DIV.hdg,BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section DIV.hdg {background-color:#333 !important; border:0 none !important; "+bS('radiusAll')+":14px;}"+
	/* header selection */		"BODY > DIV#body-wrapper > DIV.g-doc > DIV.g-section DIV.hdg A.t > B.t,BODY > DIV#body-wrapper > DIV.g-doc > DIV.g-section DIV.hdg A.t > B.t > B.t {top:0; left:0; background-color:#333; color:#fff;}"+
	/* header tabs bg */		"BODY DIV.g-doc DIV.g-section DIV.goog-tab B.t,BODY DIV.g-doc > DIV.g-section TABLE.gf-table TH,BODY DIV.g-doc > DIV.g-section DIV.add_trans_bar_border {border:0 none !important; background-color:#000 !important; color:#fff;}"+
	/* header tabs */		"BODY > DIV#body-wrapper > DIV.g-doc > DIV.g-section DIV.hdg DIV.goog-tab,BODY > DIV#body-wrapper > DIV.g-doc > DIV.g-section DIV.hdg DIV.goog-tab A.t {background-color:#333; border:0 none !important;}"+
	/* section option menu */	"BODY > DIV#body-wrapper > DIV.g-doc > DIV.g-section DIV.goog-menu {background-color:#181818; border:0 none; "+bS('border-radius-topleft')+":14px; "+bS('border-radius-bottomright')+":14px; "+bS('border-radius-bottomleft')+":14px;}"+
	/* create profile box */	"BODY > DIV#body-wrapper > DIV.g-doc > DIV.g-section DIV#p0 {padding-bottom:7px; "+bS('radiusAll')+":14px;}"+
	/* stock values */		"BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section DIV#price-panel SPAN.pr SPAN:first-child,BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section DIV#price-panel SPAN.nwp,BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section OL#snap-data > LI > SPAN.val,BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section DIV#price-panel > DIV,BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section DIV#price-panel > DIV > DIV,DIV.g-section > DIV.g-unit > DIV.g-c DIV,DIV.g-section > DIV.g-unit > DIV.g-c DIV TD,TABLE#fs-table TD {color:#fff !important;}"+
	/* price panel keys */		"BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section OL#snap-data > LI > SPAN.key {position:relative; top:0; left:0.7em; font-size:0.8em;}"+
	/* right side news item */	"BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section TD#scrollingListTd DIV.news-item {background-color:#000;}"+
	/* related header */		"BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section DIV#related DIV.hdg,BODY > DIV.g-doc DIV.g-section DIV.gf-table-control,BODY DIV.g-doc DIV.g-section TABLE#main.results > TBODY > TR > TD.highlight1,BODY DIV.g-doc DIV.g-section TABLE#main.results > TBODY > TR > TD.selected1 {background-color:#000 !important;}"+
	/* related row headers */	"BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section DIV#related TABLE.gf-table TH,BODY > DIV.g-doc > DIV.g-section DIV#related-table TABLE.gf-table TH,BODY > DIV.g-doc DIV.g-section TABLE#fs-table TH,BODY DIV.g-doc DIV.g-section TABLE#main.results > TBODY > TR.hdg > TD.hdg {border-color:#000; background-color:#333; color:#fff;}"+
	/* related company row */	"BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section DIV#related TABLE.gf-table > TBODY > TR > TD,BODY > DIV.g-doc > DIV.g-section DIV#related-table TABLE.gf-table > TBODY > TR > TD,BODY > DIV.g-doc > DIV.g-section TABLE#company_results > THEAD > TR > TH,BODY > DIV.g-doc > DIV.g-section TABLE#mf_results > THEAD > TR > TH,BODY DIV.g-doc DIV.g-section TABLE#historical_price > TBODY > TR > TH,BODY > DIV.g-doc DIV.g-section TABLE#historical_price > TBODY > TR.tptr > TD[colspan='6'].rgt,BODY > DIV.g-doc DIV.g-section TABLE#fs-table TR.hilite,BODY > DIV.g-doc DIV.g-section TABLE#fs-table TR.hilite > TD,BODY > DIV.g-doc > DIV.g-section TABLE#advanced_search_results TR.hilite > TD,BODY > DIV.g-doc > DIV.g-section TR.tptr,BODY DIV.g-doc DIV.g-section TABLE#main.results > TBODY > TR > TD.highlight2,BODY DIV.g-doc DIV.g-section TABLE#main.results > TBODY > TR > TD.selected2 {border-color:#000; background-color:#222 !important; color:#fff !important;}"+
	/* SscreenerAdd criteriaBx */	"BODY > DIV.g-doc > DIV.g-section DIV.criteria_wizard,BODY > DIV.g-doc > DIV.g-section DIV.criteria_wizard TABLE.searchtabs TD {background-color:#333 !important; border:0 none !important; "+bS('radiusAll')+":14px;}"+
	/* SscreenerAdd criteriaBxIn */	"BODY > DIV.g-doc > DIV.g-section DIV.criteria_wizard DIV.criteria_list_div,BODY > DIV.g-doc > DIV.g-section DIV.criteria_wizard DIV.criteria_list_div > DIV.criteriadiv {background-color:#000 !important; border:0 none !important; font-size:0.9em; "+bS('radiusAll')+":14px;}"+
	/* page txt */			"BODY > DIV#body-wrapper > DIV.g-doc > DIV.g-section > DIV#rt-content > DIV,BODY > DIV#body-wrapper > DIV.g-doc > DIV.g-section > DIV#rt-content TD,BODY > DIV#body-wrapper > DIV.g-doc > DIV.g-section > DIV#rt-content TD.price > SPAN,BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section DIV#rq-table DIV,BODY > DIV#body-wrapper > DIV.g-doc > DIV.g-section DIV#rq-table DIV,BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section DIV#rq-table TD SPAN,BODY > DIV.g-doc > DIV.g-section DIV#rq-table TD SPAN,BODY > DIV#body-wrapper > DIV.g-doc > DIV.g-section DIV#rq-table TD SPAN,BODY > DIV#body-wrapper > DIV.g-doc > DIV.g-section DIV#rq-toggle SPAN,BODY > DIV.g-doc > DIV.g-section DIV#rq-toggle SPAN,BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section DIV#rq-toggle SPAN,BODY > DIV#body-wrapper > DIV.g-doc > DIV.g-section UL#navmenu > LI.navsub DIV,BODY > DIV.g-doc > DIV.g-section UL#navmenu > LI.navsub DIV,BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section UL#navmenu > LI.navsub DIV,BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section DIV#price-panel SPAN.dis-large,BODY > DIV.g-doc DIV.g-section TD.price SPAN,BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section DIV.g-c DIV,BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section DIV.g-c DIV,BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section TABLE.quotes TD,BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section TABLE#cc-table TD SPAN,BODY > DIV.g-doc > DIV.g-section TABLE#cc-table TD SPAN,BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section TABLE#cc-table TD,BODY > DIV.g-doc > DIV.g-section TABLE#cc-table TD,BODY > DIV.g-doc > DIV#body-wrapper > DIV.g-section TABLE#mgmt-table TD,BODY > DIV.g-doc > DIV.g-section TABLE#company_results > TBODY > TR > TD,BODY > DIV.g-doc > DIV.g-section TABLE#company_results > TBODY > TR > TD SPAN.chb,BODY > DIV.g-doc > DIV.g-section DIV.g-unit,BODY > DIV.g-doc DIV.g-section TABLE#historical_price > TBODY > TR > TD,BODY > DIV.g-doc DIV.g-section TABLE#fs-table TD,BODY > DIV.g-doc DIV.g-section DIV#news-main DIV,BODY > DIV.g-doc DIV.g-section DIV#need-sign-in,BODY > DIV.g-doc > DIV.g-section DIV#criteria TD,BODY DIV.g-doc DIV.g-section DIV.snippet,BODY DIV.g-doc DIV.g-section DIV.byline > SPAN.date,BODY DIV.g-doc DIV.g-section TABLE.quotes TD,BODY DIV.g-doc DIV.g-section TABLE#main.results TD,BODY DIV.g-doc DIV.g-section TABLE.topmovers TD,BODY DIV.g-doc DIV.g-section DIV.event,BODY DIV.g-doc DIV.g-section DIV.event > DIV.date,BODY DIV.g-doc DIV.g-section TABLE.gf-table > TBODY > TR > TD.pf-table-lp > SPAN > SPAN {color:#999 !important;}"+
	/* ads */			(uHideAds?"DIV#ad-label,DIV#ad-target,DIV.g-c > DIV#ad {display:none;}":"")+


// Dictionary
	/* language selector */		"DIV#gs-box > DIV#gs-view {color:#fff !important;}"+
	/* language box */		"DIV#gs-box > UL#gs-opts,DIV#gs-box > UL#gs-opts UL.sub {background-color:#181818 !important; border:0 none; color:#777;}"+
	/* body cntnr */		"BODY > DIV#cnt > DIV.dct-srch-otr DIV {color:#999 !important;}"+
	/* definition txt */		"BODY > DIV#cnt > DIV.dct-srch-otr H2.wd,BODY > DIV#cnt > DIV.dct-srch-otr DIV.dct-eh SPAN,BODY > DIV#cnt > DIV.dct-srch-otr LI.dct-er SPAN {color:#fff;}"+
	/* headers */			"BODY > DIV#cnt > DIV.dct-srch-otr H3 {background-color:#333; border:0 none !important; color:#000; "+bS('radiusAll')+":14px;}"+
	/* footer */			(uHideFooters?"BODY > DIV#cnt > CENTERborder-top: 1px solid rgb(204, 204, 240); padding: 15px 2px 2px; > DIV[style='border-top: 1px solid rgb(204,204,240); padding: 15px 2px 2px;'] {display:none;}":"")+
/* Dictionary expanded below in BF-func */


// Calendar
	/* logo img [hide] */		"BODY > DIV#calcontent > DIV#topBar > DIV.noprint > TABLE > TBODY > TR > TD.logoparent > IMG#mainlogo {display:none;}"+
	/* logo img [insert] */		"BODY > DIV#calcontent > DIV#topBar > DIV.noprint > TABLE > TBODY > TR > TD.logoparent {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important; font-size:0;}"+
	/* alert box */			"DIV#nt1 > DIV > TABLE.mbox {background-color:#000 !important;}"+
	/* search options header */	"DIV#sropt > DIV.logoMargin > TABLE[width='100%'][style='background: rgb(116, 221, 130) none repeat scroll 0%; "+bS('background-clip')+": "+bS('initial')+"; "+bS('background-inline-policy')+": "+bS('initial')+";'] {position:relative; right:10px; "+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}"+
	/* search options box */	"DIV#sropt > DIV[style='border: 3px solid rgb(116, 221, 130); padding: 6px 5%; background: rgb(181, 237, 188) none repeat scroll 0%; "+bS('background-clip')+": "+bS('initial')+"; "+bS('background-origin')+": "+bS('initial')+"; "+bS('background-inline-policy')+": "+bS('initial')+"; margin-bottom: 4px;'] {margin-right:10px; margin-bottom:20px !important; "+bS('border-radius-topleft')+": 14px; "+bS('border-radius-bottomright')+": 14px; "+bS('border-radius-bottomleft')+": 14px;}"+
	/* search options I-override */	"DIV#sropt > DIV[style='border: 3px solid rgb(116, 221, 130); padding: 6px 5%; background: rgb(181, 237, 188) none repeat scroll 0%; "+bS('background-clip')+": "+bS('initial')+"; "+bS('background-origin')+": "+bS('initial')+"; "+bS('background-inline-policy')+": "+bS('initial')+"; margin-bottom: 4px;'] > FORM#advancedSearchForm TD {background-color:inherit; border:inherit; "+bS('border-radius-topright')+":inherit; "+bS('border-radius-bottomleft')+":inherit;}"+
	/* calendar header */		"DIV#tc_top > TABLE#chrome_main1 {background-color:#000 !important;}"+
	/* calendar R-side */		"BODY > DIV#calcontent > TABLE#mothertable > TBODY > TR > TD#rhstogglecell {background-color:#000;}"+
	/* r-side Tasks list name */	"DIV.sng-content {background-color:#fff;}"+
	/* r-side Tasks spacer */	"DIV.snt-wrapper > DIV.snt-spacer,DIV.snt-wrapper .snt-container {background-color:#000 !important;}"+
	/* r-side Tasks spacer hover */	"DIV.snt-wrapper .snt-focus {background-color:#e8eef7 !important;}"+
	/* item bubble */		"DIV.bubble > TABLE.bubble-table {background-color:#333; "+bS('radiusAll')+":14px;}"+
	/* item bubble corner bg */	"DIV.bubble > TABLE.bubble-table > TBODY > TR > TD DIV.bubble-sprite {background:transparent none !important;}"+
	/* item bubble cell bg */	"DIV.bubble > TABLE.bubble-table > TBODY > TR > TD.bubble-cell-main > DIV.bubble-top,DIV.bubble > TABLE.bubble-table > TBODY > TR > TD > DIV.bubble-bottom,DIV.bubble > TABLE.bubble-table > TBODY > TR > TD.bubble-mid,DIV.bubble > TABLE.bubble-table > TBODY > TR > TD.bubble-mid TH,DIV.bubble > TABLE.bubble-table > TBODY > TR > TD.bubble-mid TD,DIV.bubble > TABLE.bubble-table > TBODY > TR > TD.bubble-mid DIV {background-color:#333; border:0 none; color:#ccc !important;}"+
	/* create event page body */	"FORM#masterForm > DIV.eventpg {background-color:#000;}"+
	/* create event alert box */	"DIV.eventpg > DIV.pb-frame {color:#000; "+bS('radiusAll')+":14px;}"+
	/* table txt */			"DIV#newdirtarget TD,DIV#set H3,DIV#set TD,DIV#set TABLE#svalues DIV,DIV.module LABEL,DIV.module H3,DIV.module H4,.cal-dialog {color:#000;}"+
/* Calendar expanded below in BF-func */


// Groups
	/* mygroups panel */		"#myg_popup {border:0 none !important; background-color:#333 !important; "+bS('radiusAll')+":14px;}"+
	/* logo img */			"IMG[width='150'][height='55'][alt='Go to Google Groups Home'],IMG[width='150'][height='55'][src='/groups/img/3nb/groups_medium.gif'],IMG[width='132'][height='26'][style='position: relative; top: 1px;'][alt='Google Groups Home'],BODY[marginheight='3'][bgcolor='white'][topmargin='3'] > CENTER > TABLE > TBODY TR > TD[align='left'] > TABLE > TBODY > TR > TD[valign='top'] > DIV > A > IMG,BODY > TABLE#sft > TBODY > TR > TD.tc > A#logo,BODY > TABLE#sft > TBODY > TR > TD.tc > A#logo > IMG {visibility:hidden}"+
	/* search header */		"BODY[marginheight='3'][bgcolor='white'][topmargin='3'] > CENTER > TABLE > TBODY TR > TD[align='left'] > TABLE > TBODY > TR > TD[valign='top'] > DIV {margin:20px;}"+
	/* search header options */	"BODY > TABLE#sft > TBODY > TR > TD > FORM[name='gs'] > TABLE.tb > TBODY > TR > TD > DIV.ss {color:#777 !important;}"+
	/* top table borders */		"TABLE[width='100%'] > TBODY > TR[valign='top'] > TD[width='70%'][valign='top'][align='left'] > DIV > TABLE[width='450'][style='border-top: 1px solid rgb(119,153,221);'],BODY[bgcolor='white'] > TABLE[width='100%'] > TBODY > TR[valign='bottom'] > TD > TABLE[width='100%'] > TBODY > TR > TD[valign='center'][align='left'] > TABLE[width='100%'] > TBODY > TR > TD[bgcolor='#7799dd'] {border:0 none !important; background-color:#000 !important;}"+
	/* header bar bgs */		"TD[valign='center'][align='left'] > TABLE[width='100%'] > TBODY > TR[bgcolor='#e8eef7'] {background-color:#000;}"+
	/* header top line */		"BODY > CENTER > TABLE > TBODY > TR > TD > TABLE > TBODY > TR > TD > DIV > TABLE[style='border-top: 1px solid rgb(119, 153, 221);'] {border:0 none !important;}"+
	/* header bars */		"TD[class='padt3 padb3 padl3 padr8'][bgcolor='#e8eef7'],TD[valign='center'][align='left'] > TABLE[width='100%'] > TBODY > TR[bgcolor='#e8eef7'] > TD,BODY > TABLE.sb {padding-left:7px; background-color:#333; border:0 none; "+bS('radiusAll')+":14px;}"+
	/* right table bg */		"#GHP_compact_my_groups > TABLE TBODY TR TD {border:0 none !important; background-color:#000; color:#999 !important;}"+
	/* right headers */		"TD[class='padt3 padb3 padl7'][style='border-top: 1px solid rgb(119, 153, 221);'] {border:0 none !important; padding-left:7px; background-color:#222 !important; "+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}"+
	/* number txt & bgs */		"DIV[class='padl0 padr0'] > DIV,DIV[class='padl0 padr0'] > DIV B {background-color:#000 !important; color:#369 !important;}"+
	/* number corners */		"DIV[class='padl0 padr0'] > DIV > TABLE {display:none;}"+
	/* suggested for you bg */	"TABLE[width='450'][style='border-top: 1px solid rgb(119,153,221);'] > TBODY > TR > TD > TABLE > TBODY TR TD[width='40%'][valign='top'] {background-color:#000;}"+
	/* search page txt */		"BODY > DIV#res > TABLE#gdr > TBODY > TR > TD DIV {color:#999 !important;}"+
	/* sponsored links */		"BODY > TABLE#rhsc {display:none;visibility:hidden;}"+

	// Advanced Search
		/* logo img */		"BODY[marginheight='3'][bgcolor='#ffffff'][topmargin='3'] > TABLE[width='100%'][cellpadding='0'][border='0'] > TBODY > TR > TD[valign='middle'].tc > A#logo > IMG {display:none;}"+
		/* header blue line */	"TABLE#advsearch-t {border-top:0 none;}"+
		/* header about */	"TABLE#advsearch-t > TBODY > TR > TD.page-about {display:none;}"+
		/* borders */		"TABLE.advsearch-s > TBODY > TR > TD > DIV.outer-box > DIV.qbuilder-env,TABLE.advsearch-s > TBODY > TR > TD > DIV.outer-box > FORM[name='f'].block,TABLE.advsearch-s > TBODY > TR > TD > FORM[name='msgid'].block {background-color:#000 !important; border-color:#333;}"+
		/* top borders */	"TABLE.advsearch-s > TBODY > TR > TD > DIV.outer-box > DIV.qbuilder-env,TABLE.advsearch-s > TBODY > TR > TD > FORM[name='msgid'].block {"+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}"+
		/* bottom borders */	"TABLE.advsearch-s > TBODY > TR > TD > DIV.outer-box > FORM[name='f'].block,TABLE.advsearch-s > TBODY > TR > TD > FORM[name='msgid'].block {"+bS('border-radius-bottomright')+":14px; "+bS('border-radius-bottomleft')+":14px;}"+
		/* highlighted bgs */	"TABLE.advsearch-s > TBODY > TR > TD > DIV.outer-box > DIV.qbuilder-env > DIV#gen-query,TABLE.advsearch-s > TBODY > TR > TD > DIV.outer-box > FORM[name='f'].block > DIV > TABLE > TBODY > TR[bgcolor='#ffffff'],TABLE.advsearch-s > TBODY > TR > TD > FORM[name='msgid'].block > DIV > TABLE > TBODY > TR[bgcolor='#ffffff'] {background-color:#000; color:#fff !important;}"+

	// Browse Groups
		/* logo img */		"BODY[marginheight='3'][bgcolor='white'][topmargin='3'] > TABLE[width='100%'][cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR > TD[valign='top'] > DIV > A > IMG {display:none;}"+
		/* top line */		"BODY[marginheight='3'][bgcolor='white'][topmargin='3'] > TABLE[width='100%'][cellspacing='0'][cellpadding='0'][bgcolor='#e8eef7'].tsh {display:none;}"+
		/* search bars */	"BODY[marginheight='3'][bgcolor='white'][topmargin='3'] > TABLE[width='100%'][cellspacing='0'][cellpadding='0'][border='0'][bgcolor='#e8eef7'] {padding-left:7px; background-color:#333; "+bS('radiusAll')+":14px;}"+
		/* result txt */	"BODY[marginheight='3'][bgcolor='white'][topmargin='3'] > DIV.padl1ex {color:#ccc !important;}"+
		/* result item */	"BODY[marginheight='3'][bgcolor='white'][topmargin='3'] > DIV.padl1ex > P {padding-top:10px; border-top:1px solid #555;}"+
		/* pagination */	"BODY[marginheight='3'][bgcolor='white'][topmargin='3'] > DIV.padl1ex > TABLE#bottom_marker > TBODY > TR[valign='bottom'] > TD[width='100%'] > DIV[dir='ltr'] > TABLE > TBODY > TR > TD IMG {display:none;}"+
		/* pagination bg fix */	"BODY[marginheight='3'][bgcolor='white'][topmargin='3'] > DIV.padl1ex > TABLE#bottom_marker > TBODY > TR[valign='bottom'] > TD[width='100%'] > DIV[dir='ltr'] > TABLE > TBODY > TR > TD {background-image:none !important;}"+
		/* bottom search bg */	"BODY[marginheight='3'][bgcolor='white'][topmargin='3'] > TABLE[width='100%'][cellspacing='0'][cellpadding='0'][border='0'][bgcolor='#e8eef7'][style='margin-right: -5px;'] {background-color:#000;}"+
		/* bottom line */	"BODY[marginheight='3'][bgcolor='white'][topmargin='3'] > DIV[style='border-bottom: 1px solid rgb(119,153,221);'] {display:none;}"+

	// My Profile
		/* header bar */	"BODY[marginheight='3'][bgcolor='white'][topmargin='3'] > TABLE[width='100%'][cellspacing='0'][cellpadding='0'][bgcolor='#e8eef7'][style='padding: 1px 0px 2px;'] {background-color:#333; "+bS('radiusAll')+":14px;}"+
		/* group title */	"BODY > DIV[style='padding: 4px 10px; background-color: rgb(232, 238, 247);'] {background-color:#333 !important; "+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;"+bS('border-radius-bottomleft')+":14px;}"+
		/* gropu title lines */	"BODY > DIV[style='border-top: 1px solid rgb(119, 153, 221); z-index: 1; position: relative;'],BODY >  DIV[style='border-top: 1px solid rgb(119, 153, 221);'] {display:none;}"+
		/* r-side bg */		"BODY > TABLE.wdth100 > TBODY > TR > TD[style='background-color: rgb(232, 238, 247);'] {background-color:#333 !important;}"+
		/* recent activity */	"BODY[marginheight='3'][bgcolor='white'][topmargin='3'] > DIV.padl1ex > TABLE.padt10 > TBODY > TR > TD> TABLE > TBODY > TR#stats > TD[width='500'] * {color:#000 !important;}"+
		/* activity box */	"BODY[marginheight='3'][bgcolor='white'][topmargin='3'] > DIV.padl1ex > TABLE.padt10 > TBODY > TR > TD> TABLE > TBODY > TR#stats > TD[width='500'] TD[bgcolor='#e8eef7'],BODY[marginheight='3'][bgcolor='white'][topmargin='3'] > DIV.padl1ex > TABLE.padt10 > TBODY > TR > TD> TABLE > TBODY > TR#stats > TD[width='500'] TD[bgcolor='#e8eef7'] > DIV,BODY[marginheight='3'][bgcolor='white'][topmargin='3'] > DIV.padl1ex > TABLE.padt10 > TBODY > TR > TD> TABLE > TBODY > TR#stats > TD[width='500'] > DIV.wdth100 > DIV[style='border-top: 15px solid white; border-bottom: 10px solid white;'],BODY[marginheight='3'][bgcolor='white'][topmargin='3'] > DIV.padl1ex > TABLE.padt10 > TBODY > TR > TD> TABLE > TBODY > TR#stats > TD[width='500'] TABLE#stat_ftr > TBODY > TR > TD,DIV.wdth100 TABLE > TBODY > TR TD,DIV.wdth100 DIV {border:0 none #000 !important; background-color:#000; color:#fff !important;}"+
		/* foot block */	(uHideFooters?"BODY > DIV[style='background-color: rgb(232, 238, 247);'] > DIV[class='padt10 padb10'] {display:none;}":"")+

	// Create
		/* step num */		"DIV[style='padding: 10px 158px;'] > TABLE > TBODY > TR > TD[width='16'][height='18'][align='center'] {color:#999 !important;}"+
		/* page txt */		"TABLE.content > TBODY > TR > TD,DIV[style='padding: 10px 158px;'] > FORM[name='cr'] > DIV.boxttl,BODY[bgcolor='white'] > DIV[style='padding: 10px 158px;'],BODY[bgcolor='white'] > DIV[style='padding: 10px 158px;'] > DIV,BODY[bgcolor='white'] > DIV[style='padding: 10px 158px;'] > TABLE > TBODY > TR > TD,BODY[bgcolor='white'] > DIV[style='padding: 10px 158px;'] > TABLE > TBODY > TR > TD > DIV {color:#999 !important;}"+
		/* submit bar bg */	"TABLE.content > TBODY > TR > TD[valign='middle'][align='right'][style='background-color: rgb(232,238,247);'] {background-color:#000 !important;}"+
		/* footer bar bg */	"BODY[bgcolor='white'] > DIV[style='background-color: rgb(232,238,247);'] {background-color:#000 !important;}"+

	// Admin
		/* group name bar */	"BODY[bgcolor='white'] > DIV[style='border-top: 1px solid rgb(119,153,221);'],BODY[bgcolor='white'] > DIV[style='padding: 4px 10px; background-color: rgb(232,238,247);'],BODY[bgcolor='white'] > DIV[style='border-top: 1px solid rgb(119,153,221);'] {border:0 none !important; background-color:#000 !important;}"+
		/* title bar */		"DIV.maincontheaderbox > DIV.secttlbarwrap > DIV.secttlbar {background-color:#333; "+bS('radiusAll')+":14px;}"+
		/* spacers */		"DIV.maincontheaderbox > DIV.secttlbarwrap > DIV > TABLE[width='100%'] > TBODY > TR,DIV.maincontheaderboxatt > DIV > TABLE[width='100%'] > TBODY > TR > TD[width='100%'][height='4'][bgcolor='#e8eeff'],DIV.maincontheaderboxatt > DIV > TABLE[width='100%'] > TBODY > TR > TD[width='100%'][height='4'][bgcolor='#c3d9ff'],DIV.maincontheaderboxatt DIV[style='background: transparent url(/groups/roundedcorners?c=c3d9ff&bc=white&w=4&h=4&a=af) repeat scroll 0px; "+bS('background-clip')+": "+bS('initial')+"; "+bS('background-origin')+": "+bS('initial')+"; "+bS('background-inline-policy')+": "+bS('initial')+"; width: 4px; height: 4px;'],DIV.maincontheaderboxatt DIV[style='background: transparent url(/groups/roundedcorners?c=c3d9ff&bc=white&w=4&h=4&a=af) repeat scroll 0px 4px; "+bS('background-clip')+": "+bS('initial')+"; "+bS('background-origin')+": "+bS('initial')+"; "+bS('background-inline-policy')+": "+bS('initial')+"; width: 4px; height: 4px;'],DIV.maincontheaderboxatt DIV[style='background: transparent url(/groups/roundedcorners?c=e8eeff&bc=white&w=4&h=4&a=af) repeat scroll 0px; "+bS('background-clip')+": "+bS('initial')+"; "+bS('background-origin')+": "+bS('initial')+"; "+bS('background-inline-policy')+": "+bS('initial')+"; width: 4px; height: 4px;'],DIV.maincontheaderboxatt DIV[style='background: transparent url(/groups/roundedcorners?c=e8eeff&bc=white&w=4&h=4&a=af) repeat scroll 0px 4px; "+bS('background-clip')+": "+bS('initial')+"; "+bS('background-origin')+": "+bS('initial')+"; "+bS('background-inline-policy')+": "+bS('initial')+"; width: 4px; height: 4px;'] {display:none;}"+
		/* section headers */	"DIV.maincontheaderboxatt > DIV.sshdr {padding:5px; background-color:#333 !important; "+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}"+
		/* right panel */	"BODY[bgcolor='white'] > DIV.rf DIV {background-color:#333 !important;}"+
		/* right panel bttm */	"TABLE[class='wdth100 overflow-hide'] > TBODY > TR[valign='top'] > TD[style='background-color: rgb(232,238,247);'] {background-color:#000 !important;}"+
		/* content border */	"TABLE[class='wdth100 overflow-hide'] > TBODY > TR[valign='top'] >  TD.overflow-hide {border:0 none !important;}"+
		/* page txt */		"TD.overflow-hide > DIV.maincontheaderboxatt TABLE TBODY TR TD,TD.overflow-hide > DIV[style='text-align: center;'],DIV.mngcontentbox TABLE > TBODY > TR > TD,DIV.mngcontentbox DIV,BODY > DIV.padl1ex SPAN,TD.padt8 TD,TD > DIV#banner{color:#999 !important;}"+
		/* settings bgs */	"TABLE[class='wdth100 overflow-hide'] > TBODY > TR[valign='top'] >  TD.overflow-hide DIV.mnghdrttl,TABLE[class='wdth100 overflow-hide'] > TBODY > TR[valign='top'] >  TD.overflow-hide DIV.mngbottombox DIV,TD.padall6 > TABLE > TBODY > TR > TD > TABLE[width='500'][bgcolor='#ffffff'] {background-color:#000 !important;}"+
		/* settings spacers */	"TABLE[class='wdth100 overflow-hide'] > TBODY > TR[valign='top'] >  TD.overflow-hide > DIV.mngtabbox > DIV:first-child > TABLE[width='100%'] {display:none;}"+
		/* settings actv itm */	"DIV.mngbottombox > DIV.mnghdrbtm > DIV > SPAN {color:#fff;}"+
		/* settings o-border */	"TABLE[class='wdth100 overflow-hide'] > TBODY > TR[valign='top'] >  TD.overflow-hide > DIV.mngbottombox {border:0 none !important;}"+
		/* settings i-border */	"TABLE[class='wdth100 overflow-hide'] > TBODY > TR[valign='top'] >  TD.overflow-hide > DIV.mngbottombox > DIV.mngcontentbox {border:3px solid #333; "+bS('radiusAll')+":14px;}"+
/* Groups additionally expanded below in BF-func */	


// Books
	/* logo img */			"BODY TABLE#top_search_box > TBODY > TR > TD:first-child > A > IMG[height='40'],BODY[bgcolor='#ffffff'] > TABLE > TBODY > TR > TD[valign='top'][rowspan='2'] > A > IMG,BODY[marginheight='3'][bgcolor='#ffffff'][topmargin='3'] > DIV[style='margin: 3px 8px;'] > TABLE[style='margin: 7px 0pt 10px; clear: both;'] > TBODY > TR:first-child > TD[valign='top'][rowspan='2']:first-child > A > IMG[height='40'] {display:none;}"+
	/* announcement */		"BODY > DIV > CENTER > SPAN.announcement {color:#999;}"+
	/* headers */			"BODY > DIV > CENTER > TABLE#hp_table > TBODY > TR > TD > DIV.sbr > DIV.sub_cat_section > DIV.sub_cat_title,BODY > DIV#hp_table_wrap > TABLE#hp_table > TBODY > TR > TD.sidebar > DIV.sub_cat_section > DIV.sub_cat_title,BODY > DIV > CENTER > TABLE#hp_table > TBODY > TR > TD DIV.hpm_title,BODY > DIV#results_bar,TABLE#hp_table .hpm_title, BODY > DIV[style='margin: 3px 8px;'] > DIV#results_bar {background-color:#333 !important; border:0 none !important; font-weight:bold; color:#000 !important; "+bS('radiusAll')+":14px;}"+
	/* menu txt */			"TABLE#viewport_table > TBODY > TR > TD#menu_td > DIV#menu_container > DIV#menu TD,TABLE#viewport_table > TBODY > TR > TD#menu_td > DIV#menu_container > DIV#menu H3,TABLE#viewport_table > TBODY > TR > TD#menu_td > DIV#menu_container > DIV#menu SPAN {color:#999 !important;}"+
	/* goog-tooltip */		"BODY > DIV.goog-tooltip {background-color:#333 !important; border:0 none !important; color:#000 !important; "+bS('radiusAll')+":14px;}"+
	/* page txt */			"TABLE#viewport_table > TBODY > TR > TD#viewport_td DIV,TABLE#viewport_table > TBODY > TR > TD#viewport_td H2,BODY > DIV.scontentarea > DIV > DIV.rsiwrapper> TABLE.rsi > TBODY > TR > TD DIV {color:#999 !important;}"+
	/* buy alternate row */		"DIV#summary_content > TABLE > TBODY > TR.seller-row-alt {background-color:#181818;}"+
	/* view block */		"BODY > DIV#rhswrapper > TABLE#rhssection,BODY > DIV#rhswrapper > TABLE#rhssection TD {border:0 none; background-color:#000;}"+
	/* rate book block */		"BODY > DIV[style='border: 1px solid rgb(167,167,114); margin: 20px; padding: 20px; background-color: rgb(255,255,217); width: 50%;'],BODY > FORM[name='edit_annotations'] DIV {border:0 none !important; background-color:#000 !important; color:#999 !important;}"+
	/* right-side ads */		(uHideAds?"DIV#rhswrapper > TABLE#rhssection > TBODY > TR > TD {display:none;}":"")+
	/* right-side viewToggleCell */	"DIV#rhswrapper > TABLE#rhssection > TBODY > TR > TD#viewmodetogglecell {display:inherit;}"+
	/* hover layer */		".thumbohover {background-color:#333 !important; "+bS('radiusAll')+":14px;}"+
	/* hover layer date */		".thumbohover .thdate {color:#0c0;}"+
	/* bottom search bg */		"BODY > DIV > DIV[style='border-top: 1px solid rgb(107, 144, 218); border-bottom: 1px solid rgb(107, 144, 218); padding: 16px; background: rgb(229, 236, 249) none repeat scroll 0%; font-size: 83%; "+bS('background-clip')+": "+bS('initial')+"; "+bS('background-inline-policy')+": "+bS('initial')+";'],BODY > DIV[align='center'][style='padding: 0pt 8px;'] > DIV#banner {background-color:#000 !important; border:0 none !important;}" +
	/* footer */			(uHideFooters?"BODY > DIV[align='center'][style='padding: 0pt 8px;'] > DIV#footer_table > SPAN:last-child {display:none;}":"")+
/* Books expanded below in BF-func */


// Scholar
	/* logo imgs [hide] */		"BODY > FORM[name='f'] > TABLE[width='99%'] > TBODY > TR:first-child > TD[width='1%'] > A > IMG,BODY > FORM[name='prefform'] > CENTER > TABLE[width='100%'] > TBODY > TR:first-child > TD:first-child > A > IMG[height='40'],BODY > TABLE[style='margin: 7px 3px; clear: both;'] > TBODY > TR:first-child > TD:first-child > A > IMG[height='40'],BODY > FORM[name='gs'] > TABLE#scife_hdr > TBODY > TR:first-child > TD[valign='top']:first-child > A > IMG {display:none;}"+
	/* Home logo img [hide] */	"BODY[vlink='#551a8b'] > CENTER > TABLE[cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR:first-child > TD:first-child > IMG {visibility:hidden;}"+
	/* Home logo [insert] */	"BODY[vlink='#551a8b'] > CENTER > TABLE[cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR:first-child > TD:first-child {height:131px !important; background:transparent url('"+gHpL+"') no-repeat scroll 0 !important;}"+
	/* Home form mover */		"BODY > CENTER > FORM[name='f'][action='/scholar'] {position:relative; top:-3em;}"+
	/* Home input resizer */	"BODY > CENTER > FORM[name='f'][action='/scholar'] INPUT[name='q'] {width:29em;}"+
	/* pre header line */		"BODY > FORM[name='f'] > TABLE[width='99%'] > TBODY > TR:first-child > TD > TABLE[width='100%'] > TBODY > TR:first-child > TD[bgcolor='#008000'],BODY > FORM[name='prefform'] > CENTER > TABLE > TBODY > TR > TD > TABLE[width='100%'] > TBODY > TR:first-child > TD[bgcolor='#008000'],BODY > TABLE[width='100%'] > TBODY > TR > TD[bgcolor='#008000'] {display:none;}"+
	/* header bg */			"BODY > TABLE[width='100%'][bgcolor='#dcf6db'],BODY > FORM[name='gs'] > TABLE[width='100%'][bgcolor='#dcf6db'],BODY > FORM[name='gs'] > TABLE[width='100%'][bgcolor='#dcf6db'] TD {background-color:#000;}"+
	/* header R */			"BODY > FORM[name='f'] > TABLE[width='99%'] > TBODY > TR:first-child > TD > TABLE[width='100%'] > TBODY > TR > TD[bgcolor='#dcf6db'][align='right'],BODY > FORM[name='prefform'] > CENTER > TABLE > TBODY > TR > TD > TABLE[width='100%'] > TBODY > TR:first-child > TD[bgcolor='#dcf6db'][align='right'],BODY > TABLE[width='100%'][bgcolor='#dcf6db'] > TBODY > TR > TD[bgcolor='#dcf6db'][align='right'] {padding-right:0.5em; background-color:#333 !important; "+bS('border-radius-topright')+":14px; "+bS('border-radius-bottomright')+":14px;}"+
	/* header L */			"BODY > FORM[name='f'] > TABLE[width='99%'] > TBODY > TR:first-child > TD > TABLE[width='100%'] > TBODY > TR > TD[bgcolor='#dcf6db']:first-child,BODY > FORM[name='prefform'] > CENTER > TABLE > TBODY > TR > TD > TABLE[width='100%'] > TBODY > TR:first-child > TD[bgcolor='#dcf6db']:first-child,BODY > TABLE[width='100%'][bgcolor='#dcf6db'] > TBODY > TR > TD[bgcolor='#dcf6db']:first-child   {padding-left:0.5em; background-color:#333 !important; "+bS('border-radius-topleft')+":14px; "+bS('border-radius-bottomleft')+":14px;}"+
	/* box bgs */			"BODY > FORM[name='f'] > TABLE[width='99%'] TD,BODY > FORM[name='prefform'] > CENTER > TABLE[width='100%'] > TBODY > TR[bgcolor='#dcf6db'] {background-color:#000 !important;}"+
	/* table cell override */	"BODY > FORM[name='f'] > TABLE > TBODY > TR > TD > TABLE > TBODY > TR > TD[width='40%'] {"+bS('radiusAll')+":0px;}"+
	/* bottom search box */		"BODY > CENTER > TABLE[width='100%'] > TBODY > TR > TD.k,BODY > CENTER > TABLE[width='100%'] > TBODY > TR > TD[bgcolor='#dcf6db'] {background-color:#000;}"+
	/* bottom search page nums W */	"BODY > DIV.n > TABLE[width='1%'] {width:inherit !important; border-spacing:1em;}"+
	/* bottom search page nums */	"BODY > DIV.n > TABLE[width='1%'] > TBODY > TR > TD IMG {display:none;}"+
	/* footer */			(uHideFooters?"BODY > FORM[name='f'] > CENTER:last-child > FONT[size='-1'],BODY > FORM[name='prefform'] > CENTER > P:last-child > FONT[size='-1'] {display:none;}":"")+
/* Scholar: Support expanded below in BF-func */


// Blogs
	/* logo imgs */			"BODY > DIV > TABLE#srch_box_t > TBODY > TR > TD:first-child > A > IMG[height='40'],BODY > DIV#h > TABLE:first-child > TBODY > TR > TD:first-child > A > IMG {display:none;}"+
	/* pre header line */		"BODY TABLE[width='100%'] > TBODY > TR > TD.tpb {display:none;}"+
	/* headers */			"BODY > DIV#canvas > DIV.heading,DIV#rightHandContainer DIV.heading,BODY TABLE.ttt,BODY TABLE.ttt TD   {padding-left:0.7em; background-color:#333; border:0 none !important; color:#ccc!important; "+bS('radiusAll')+":14px;}"+
	/* menu divider */		"DIV#main > DIV#sideBarContainer > DIV#sideBarWrap {border-color:#333;}"+
	/* menu r-line */		"BODY > DIV#m > DIV.ln {border-right-color:#333;}"+
	/* menu highlights */		"UL#sideLinksList > LI.selected,DIV#sideBarWrap > DIV#feedsContainer > DIV > DIV.sbiTitle {background-color:#222 !important; color:#fff !important;}"+
	/* page txt */			"TABLE#buzzlistTable TR.clusterGroup DIV.entryText SPAN,TABLE#buzzlistTable TR.clusterGroup DIV.entryText DIV {color:#999 !important;}"+
	/* bottom search bg */		"BODY > DIV#f > CENTER > TABLE > TBODY > TR > TD.bts {background-color:#000;}"+
	/* bottom search borders */	"BODY > DIV#f > CENTER > TABLE > TBODY > TR > TD.btb {display:none;}"+
	/* footer */			(uHideFooters?"BODY > CENTER > CENTER > FONT[size='-2']:last-child,BODY > DIV#f > CENTER:last-child > FONT[size='-2'] {display:none;}":"")+
/* Blogs expanded below in BF-func */


// Code
	/* logo imgs */			"#logo IMG[src='/images/code_sm.png'],TABLE[style='margin: 0px 0px -6px 0pt; padding: 0px; width: 100%;'] TD[style='width: 153px;'] IMG[src='/hosting/images/code_sm.png'],#logo IMG[src='http://code.google.com/images/code_sm.png'] {display:none;}"+
	/* search button bg */		".gsc-search-box .gsc-search-button {background-color:#000;}"+
	/* search suggest */		".gsc-search-box .greytext {background-color:#000 !important; color:#999 !important;}"+
	/* header bars */		"#gc-topnav,#gc-topnav H1,#header #title,TABLE.mainhdr,#issueheader,#issueheader TABLE TBODY TR TD,#makechanges DIV.h4 {padding-right:10px; background-color:#333; border:0 none !important; "+bS('radiusAll')+":14px;}"+
	/* page txt */			"#gc-home DIV,#codesiteContent DIV,#body,#body DIV,#body TABLE TBODY TR TD DIV,#maincol DIV,#maincol DIV TABLE TBODY TR TD,#maincol P,#maincol H4,#issuemeta,#issuemeta TD,TABLE.issuepage TBODY TR TD[class='vt issuedescription'],DIV.content DIV,DIV.content DIV DIV DIV H2,DIV.content DIV DIV TABLE TBODY TR TD {color:#999 !important;}"+
	/* section headers */		"DIV.g-unit H2,.g-c .column-title,#gc-toc UL.treelist LI H1,#gc-toc UL.treelist LI H2,#gc-pagecontent H1,#gc-home H2   {margin-top:10px; padding-top:2px; padding-left:4px; border:0; background-color:#333 !important; "+bS('border-radius-topleft')+":14px;"+bS('border-radius-topright')+":14px;  color:#fff;}"+
	/* labels tables */		".g-c .labels-table DIV {background-color:#333;}"+
	/* box bgs */			"#products-list,#preview-box {border:0; background-color:#000 !important;}"+
	/* project tabs */		"TABLE#mt TBODY TR TH {background:#333 none; "+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}"+
	/* project tab round bg */	"TABLE#mt TBODY TR TH DIV {background-image:none !important;}"+
	/* project details */		"#codesiteContent TABLE.columns TBODY TR TD {background-color:#000; color:#999 !important;}"+
	/* docs toc bg */		"#gc-toc UL.treelist LI UL LI {background-color:inherit;}"+
	/* docs sidebar bg */		"#maincol .pmeta_bubble_bg,.rounded_ul,.rounded_ur,.rounded_ll,.rounded_lr,DIV[style='background: rgb(221, 248, 204) none repeat scroll 0%; "+bS('background-clip')+": "+bS('initial')+"; "+bS('background-inline-policy')+": "+bS('initial')+"; margin-bottom: 5px; table-layout: fixed;'],.vt DIV.tip {background:#333 none !important; border:0 none !important; "+bS('radiusAll')+":14px;}"+
	/* docs code bg */		"PRE {background-color:#ccc;}"+
	/* downloads search bar */	"TABLE.st TBODY TR TD,TABLE.st TBODY TR TD DIV,TABLE.st TBODY TR TD DIV DIV SPAN {background:#000 none !important; color:#999 !important;}"+
	/* downloads results table */	".bubble_bg,TABLE#resultstable TBODY TR TH,TABLE#resultstable TBODY TR TD {border-bottom-color:#333; border-left-color:#333; background:#000;}"+
	/* org info block */		"#body TABLE TBODY TR TD DIV.extern_app {background:#333 none; "+bS('radiusAll')+":14px;}"+
	/* org info app list */		"#body DIV TABLE.applist {background:#333 none; "+bS('radiusAll')+":14px;}"+
	/* org info app details */	"#body DIV TABLE.applist TBODY TR TD {color:#fff !important;}"+
	/* org info app text */		"#body DIV TABLE.applist TBODY TR TD DIV.app_text {padding:10px; background:#000 none; color:#fff !important; "+bS('radiusAll')+":14px;}"+
	/* alerts & messages */		"#codesiteContent P.note,#codesiteContent P.caution,#codesiteContent P.warning,#codesiteContent DIV.noticebox,#nowShowingDiv,DIV[class='bottom clearfix'] DIV.blog {padding-top:4px; padding-bottom:5px; border:0; background:#333 none; color:#fff; "+bS('radiusAll')+":14px;}"+
	/* collapsible bg */		"#gc-collapsible {border:2px solid #333; background:#333 none !important;}"+
	/* footer bg */			"DIV#gc-footer {background:#000 none;}"+
/* Code expanded below in BF-func */


// Experimental
	// These two maintained for older G.versions,expanded below and in BF-func:
	/* logo img */			"BODY > DIV#container > DIV#header > DIV[style='float: left; width: 155px;'] IMG[width='150'][height='55'] {display:none;}"+
	/* content */			"BODY > DIV#container > DIV#content {color:#999 !important;}"+

	// New web search results implementations:
	/* right side drop menu */	"BODY#gsr > DIV#header > DIV.std > SPAN[style='background: rgb(255, 255, 255) none repeat scroll 0% 0%; float: right; "+bS('background-clip')+": border; "+bS('background-origin')+": padding; "+bS('background-inline-policy')+": continuous; position: relative;'] {background-color:#555 !important; padding-right:0.25em; padding-left:0.25em; color:#fff !important; text-decoration:none; "+bS('radiusAll')+":7px;}"+
	/* right side drop menuLink */	"BODY#gsr > DIV#header > DIV.std > SPAN[style='background: rgb(255, 255, 255) none repeat scroll 0% 0%; float: right; "+bS('background-clip')+": border; "+bS('background-origin')+": padding; "+bS('background-inline-policy')+": continuous; position: relative;'] A,BODY#gsr > DIV#header > DIV.std > SPAN[style='background: rgb(255, 255, 255) none repeat scroll 0% 0%; float: right; "+bS('background-clip')+": border; "+bS('background-origin')+": padding; "+bS('background-inline-policy')+": continuous; position: relative;'] A U {color:#fff !important; text-decoration:none !important;}"+
	/* right side drop menu drop */	"BODY#gsr > DIV#header > DIV.std > SPAN[style='background: rgb(255, 255, 255) none repeat scroll 0% 0%; float: right; "+bS('background-clip')+": border; "+bS('background-origin')+": padding; "+bS('background-inline-policy')+": continuous; position: relative;'] > DIV#exp_info {background-color:#333 !important;}"+
	/* keyboardLegend bg */	"BODY DIV#cnt TABLE.mbEnd,BODY DIV#cnt TABLE.mbEnd TD {border:0 none !important; background-color:#000 !important;}"+
	/* keyboardChevron */		"BODY DIV#res > DIV > OL > LI.g > IMG[src='/images/chevron.gif'] {padding:1px; background-color:#fff;}"+
	/* keyboardExp Key title */	"BODY TABLE.mbEnd > TBODY > TR > TD.std > CENTER.f {font-weight:bold; color:#fff;}"+


// Support
	/* logo img */			"TABLE[align='center'] TBODY TR TD[width='155'][rowspan='2'] A IMG,TABLE[align='center'] TBODY TR[valign='middle'] TD[width='135'] IMG,BODY.answer_page TABLE.header_table > TBODY > TR > TD.header_logo_td > A[href='/'] > IMG[alt='Google'] {display:none;}"+
	/* header */			"TABLE[style='border-bottom: 1px solid rgb(37,71,157);'] TBODY TR TD,DIV#baseDiv > DIV.header_wrapper > TABLE.header_table * {background-color:#000; color:#fff !important;}"+
	/* page title */		"TABLE[style='border-bottom: 1px solid rgb(37,71,157);'] TBODY TR TD.header H1 {color:#fff !important;}"+
	/* headline color */		"BODY.answer_page H2,BODY.answer_page H3,BODY.answer_page H4 {color:#ccc;}"+
	/* page txt */			"TABLE[style='border-bottom: 1px solid rgb(37,71,157);'] TBODY TR TD,TABLE TBODY TR TD P,#content,BODY.answer_page OL,BODY.answer_page FORM {color:#999 !important;}"+
	/* head tabs */			"#tabs TABLE TBODY TR TD DIV {border:0; "+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}"+
	/* head tabs */			"#tabs TABLE TBODY TR TD DIV DIV.link A {color:#000 !important;}"+
	/* answer name */		"TABLE TBODY TR TD H3.answername {color:#fff !important;}"+
	/* info boxes */		"BODY.answer_page DIV.lightbulb,BODY.answer_page DIV.module {"+bS('radiusAll')+":14px;}"+
	/* info box module title bg */	"BODY.answer_page DIV.module > H2 {background-color:transparent; color:#ccc;}"+
	/* side bar headers */		"TABLE.smfont TBODY TR TD.module_hdr {border:0; background:#333 none; "+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}"+
	/* side bar header txt */	"TABLE.smfont TBODY TR TD.module_hdr H4,TABLE.smfont TBODY TR TD.module_hdr H4 LABEL,TABLE.smfont TBODY TR TD.module_hdr B {color:#000 !important;}"+
	/* side bar block bg */		"TABLE.smfont TBODY TR TD {border:0 none #000 !important; background-color:#000;}"+
	/* bottom tools */		"TABLE TBODY TBODY TR TD[style='border-bottom: 1px solid rgb(204,204,204);'] B {color:#fff !important;}"+
	/* bottom help box */		"TABLE.answerfooter {border:0 none; background:#333 none; "+bS('radiusAll')+":14px;}"+
	/* bottom help txt */		"TABLE.answerfooter TBODY TR TD DIV FONT,TABLE.answerfooter TBODY TR TD DIV FONT B,TABLE.answerfooter TBODY TR TD DIV FONT NOBR {color:#fff !important;}"+
 

// Patents
	/* logo img [hide] */		"BODY > DIV#top_search_bar > DIV[style='padding: 1px 10px 0px 6px; float: left;'] > A > IMG#logo {display:none;}"+
	/* Home logo img [hide]		"BODY > DIV[style='clear: both;'] > CENTER > TABLE:first-child > TBODY > TR > TD > IMG[height='110'] {visibility:hidden;}"+
	/* Home logo img [insert] */	"BODY > DIV[style='clear: both;'] > CENTER > TABLE:first-child > TBODY > TR > TD {height:131px !important; background:transparent url('"+gHpL+"') no-repeat scroll center !important;}"+
	/* Home form v-adjust */	"BODY > DIV[style='clear: both;'] > CENTER > FORM[name='f'][action='/patents'] {position:relative; top:-1em;}"+
	/* titlebar */			"BODY > DIV#titlebar,BODY > TABLE#results_bar {padding-left:0.5em; border:0 none !important; background-color:#333 !important; font-weight:bold; "+bS('radiusAll')+":14px;}"+
	/* titlebar txt */		"BODY > DIV#titlebar H1,BODY > DIV#titlebar SPAN {color:#fff !important;}"+
	/* menu active */		"BODY > TABLE#viewport_table > TBODY > TR > TD#menu_td > DIV#menu_container > DIV#menu DIV.menu_content > DIV > DIV.sidebarnav > SPAN.nolink {color:#fff;}"+
	/* headers */			"BODY > TABLE#viewport_table > TBODY > TR > TD#viewport_td H3 {border:0; background-color:#222 !important; color:#ccc; "+bS('radiusAll')+":14px;}"+
	/* page txt */			"BODY > TABLE#viewport_table > TBODY > TR > TD#viewport_td > DIV.vertical_module_list_row TD,BODY > TABLE#viewport_table > TBODY > TR > TD#viewport_td DD,BODY > DIV.scontentarea DIV P,BODY > DIV.scontentarea > SPAN.big {color:#ccc !important;}"+
	/* footer */			(uHideFooters?"BODY > DIV#footer_table > SPAN,BODY > DIV > DIV#footer_table > SPAN,BODY > DIV[align='center'] > TABLE[width='100%'][cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR > TD.k {display:none;}":"")+
/* Patents & Advanced Search expanded below in BF-func */
 

// Toolbar
	/* logo imgs */			"BODY[bgcolor='#ffffff'][topmargin='3'] CENTER TABLE[width='725'] TBODY TR TD IMG[width='143'][height='59'][src='../../../../common/toolbar_sm.gif'],TABLE[width='100%'][style='direction: ltr;'] TBODY TR TD A[href='http://toolbar.google.com'] IMG,BODY > TABLE[width='100%'] > TBODY > TR > TD > A[href='../../T4/'] IMG[width='143'][height='59'],BODY.siteowners > TABLE[width='96%'] > TBODY > TR > TD[width='1%'] > A > IMG,BODY.siteowners IMG[src='http://www.google.com/images/art.gif'] {display:none;}"+
	/* page title */		"BODY > TABLE[width='100%'][style='direction: ltr;'] > TBODY > TR > TD[width='100%'],BODY > TABLE[width='100%'][style='direction: ltr;'] > TBODY > TR > TD[width='100%'] TABLE TBODY TR TD {background-image:none !important; color:#fff !important;}"+
	/* download box */		"BODY[bgcolor='#ffffff'][topmargin='3'] CENTER TABLE TBODY TR TD TABLE#download TBODY TR TD {background-color:#000; border:0 !important;}"+
	/* bottom logo(s) */		"TABLE TBODY TR TD[nowrap='nowrap'] IMG[src='http://www.google.com/nav_first.gif'],TABLE TBODY TR TD[nowrap='nowrap'] IMG[src='http://www.google.com/nav_current.gif'],TABLE TBODY TR TD[nowrap='nowrap'] IMG[src='http://www.google.com/nav_page.gif'],TABLE TBODY TR TD[nowrap='nowrap'] IMG[src='http://www.google.com/nav_next.gif'] {display:none;}"+

	// API
		/* page title */	"BODY > TABLE[width='100%'] > TBODY > TR > TD[width='100%'][style='padding-left: 15px;'] TABLE TBODY TR TD FONT STRONG {padding-left:131px; color:#fff !important;}"+
		/* start making btn */	"TABLE TBODY TR TD#content DIV#start_box {border:1px solid #fff; background-color:#333; "+bS('radiusAll')+":14px;}"+ 
		/* header bars */	"TABLE TBODY TR TD#content H2.header {border:0; background:#333; "+bS('radiusAll')+":14px;}"+ 
		/* page-code */		"TABLE TBODY TR TD#content PRE {color:#000;}"+ 
		/* page block bgs */	"TABLE TBODY TR TD#content DIV,BODY.siteowners TABLE TBODY TR TD {background-color:#000 !important;}"+
/* Toolbar expanded below in BF-func */


// Firefox Tools
	/* logo img */			"BODY > CENTER > DIV > TABLE[width='739'] > TBODY > TR > TD[width='1%'] A IMG {display:none;}"+
	/* page titlebar */		"BODY > CENTER > DIV > TABLE[width='739'] > TBODY > TR > TD[width='100%'] {width:100%; padding-left:151px; color:#fff;}"+
	/* page txt */			"BODY > CENTER > DIV > TABLE[width='100%'] > TBODY > TR > TD,BODY > CENTER > DIV > TABLE[width='100%'] > TBODY > TR > TD TABLE TBODY TR TD,BODY > CENTER > DIV[style='margin: 20px 30px; text-align: left; width: 740px;'] * {color:#999 !important;}"+
	/* more header */		"BODY > CENTER > DIV > TABLE[width='100%'] > TBODY > TR > TD H3[style='border-bottom: 1px solid rgb(37, 71, 157); font-size: 17px; background-color: rgb(255, 255, 255); padding-bottom: 4px;'] {padding-left:7px; border:0 none !important; background-color:#333 !important; color:#000; "+bS('radiusAll')+":14px;}"+
	/* right col block */		"BODY > CENTER > DIV > TABLE[width='100%'] > TBODY > TR > TD DIV.rightcol {background-color:#333 !important; "+bS('radiusAll')+":14px;}"+
	/* install extension */		"BODY > CENTER > DIV[style='margin: 20px 30px; text-align: left; width: 740px;'] DIV.extension  {background-color:#333 !important; "+bS('radiusAll')+":14px;}"+
	/* extension whitelist */	"BODY > CENTER > DIV[style='margin: 20px 30px; text-align: left; width: 740px;'] DIV.whitelist{border:2px solid #fff; background-color:#000; "+bS('radiusAll')+":14px;}"+


// MonkeyBarrel Google
	/* shift down slightly */	"DIV[style='position: fixed; top: 10px; left: 10px; margin-bottom: 10px; background-color: transparent; z-index: 99999;'] {top:28px !important; left:2px !important;}"+


// Notebook
	/* logo img */			"BODY.e > DIV.h TABLE#gn_ph > TBODY > TR:first-child > TD[align='right']:first-child > A > IMG {visibility:hidden;}"+
	/* left menu border */		"BODY.e > DIV.h > TABLE.p > TBODY > TR[valign='top'] > TD[align='left'] > DIV.jc > DIV > DIV.wb   {"+bS('radiusAll')+":14px;}"+
	/* left menu header */		"BODY.e > DIV.h > TABLE.p > TBODY > TR[valign='top'] > TD[align='left'] > DIV.jc DIV.vb   {"+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}"+
	/* left menu lower-block */	"BODY.e > DIV.h > TABLE.p > TBODY > TR[valign='top'] > TD[align='left'] > DIV.jc TABLE.vb,BODY.e > DIV.h > TABLE.p > TBODY > TR > TD > DIV.jc > DIV.rc > DIV TABLE.rb{display:none;}"+
	/* left menu C-footer */	(uHideFooters?"BODY.e > DIV.h > TABLE.p > TBODY > TR[valign='top'] > TD[align='left'] > DIV.jc > DIV.bf {display:none;}":"")+
	/* labels block header */	"BODY.e > DIV.h > TABLE.p > TBODY > TR > TD > DIV.jc > DIV.rc > DIV[class='sc rb'] {"+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}"+
	/* labels lower block */	"BODY.e > DIV.h > TABLE.p > TBODY > TR > TD > DIV.jc > DIV.rc > DIV[class='wc sb'] {border-bottom:2px solid #b5edbc; "+bS('border-radius-bottomright')+":14px; "+bS('border-radius-bottomleft')+":14px;}"+
	/* tip bar */			"BODY.e TD.cb > SPAN.eb {"+bS('radiusAll')+":14px;}"+
	/* page txt */			"BODY.e > DIV.h > TABLE.p > TBODY > TR > TD > DIV > DIV.m > DIV.oa > DIV.zg > DIV.dh > DIV.hh > DIV:first-child {color:#000;}"+
	/* faq logo img */		"BODY[bgcolor='#ffffff'] > TABLE[cellpadding='5'][align='center'] > TBODY > TR[valign='middle'] > TD[width='1%'] > A[href='http://www.google.com/notebook'] > IMG {display:none;}"+
	/* faq title block */		"BODY[bgcolor='#ffffff'] > TABLE[cellpadding='5'][align='center'] > TBODY > TR[valign='middle'] > TD > TABLE[width='100%'][bgcolor='#c3d9ff'][align='center'][style='margin-bottom: 5px;'] TBODY TR TD {background-color:#000;}"+
	/* faq title block corners */	"BODY[bgcolor='#ffffff'] > TABLE[cellpadding='5'][align='center'] > TBODY > TR[valign='middle'] > TD > TABLE[width='100%'][bgcolor='#c3d9ff'][align='center'][style='margin-bottom: 5px;'] TBODY TR TD IMG {display:none;}"+
	/* faq list txt */		"OL.answers LI UL.response LI,OL.response LI {color:#999 !important;}"+
/* Notebook expanded below in BF-func */


// Translate

	/* logo img */			"BODY > DIV#whole > TABLE[cellspacing='0'][cellpadding='0'][border='0'][style='font-size: medium;'] > TBODY > TR > TD[width='1%'][height='40'] > A > IMG,BODY > TABLE[cellspacing='0'][cellpadding='0'][border='0'][style='font-size: medium;'] > TBODY > TR > TD[width='1%'][height='40'] > A > IMG,BODY > DIV#whole > DIV[style='margin: 10px 0pt 5px;'] > A > IMG[height='40'],BODY[marginheight='3'][topmargin='3'] > DIV[style='margin: 10px 0pt 5px;'] > A > IMG[height='40'],BODY > DIV#whole > DIV[style='margin: 10px 0pt 5px;'] > A > IMG[height='40'] {display:none !important;}"+
	/* logo-bar 2nd remove */	"BODY > DIV#whole > TABLE[cellspacing='0'][cellpadding='0'][border='0'][style='font-size: medium;'] > TBODY > TR > TD[width='100%'][valign='top'][align='right'],BODY > TABLE[cellspacing='0'][cellpadding='0'][border='0'][style='font-size: medium;'] > TBODY > TR > TD[width='100%'][valign='top'][align='right'] {background-image:none !important;}"+
	/* head menu */			"BODY > DIV#whole > TABLE[cellspacing='0'][cellpadding='0'][border='0'][style='font-size: medium;'] > TBODY > TR > TD > DIV[style='margin: 4px 0pt; padding: 0pt;'] > TABLE > TBODY > TR > TD,BODY > TABLE[cellspacing='0'][cellpadding='0'][border='0'][style='font-size: medium;'] > TBODY > TR > TD > DIV[style='margin: 4px 0pt; padding: 0pt;'] > TABLE > TBODY > TR > TD {background-color:#000; border:0 none;}"+
	/* head menu active */		"BODY > DIV#whole > TABLE[cellspacing='0'][cellpadding='0'][border='0'][style='font-size: medium;'] > TBODY > TR > TD > DIV[style='margin: 4px 0pt; padding: 0pt;'] > TABLE > TBODY > TR > TD.active,BODY > TABLE[cellspacing='0'][cellpadding='0'][border='0'][style='font-size: medium;'] > TBODY > TR > TD > DIV[style='margin: 4px 0pt; padding: 0pt;'] > TABLE > TBODY > TR > TD.active {color:#fff !important;}"+
	/* header bg */			"BODY > DIV#content > DIV.resulthd {background-color:#000;}"+
	/* headers */			"BODY > DIV#whole H1,BODY > DIV#whole H2,BODY > DIV#content H1,BODY[marginheight='3'][topmargin='3'] > H1,BODY > DIV#whole > DIV#middle_body DIV#autotrans,BODY > DIV#whole DIV#middle_body DIV#dict > P#dict_head {background-color:#333 !important; color:#fff; padding-left:0.7em; "+bS('radiusAll')+":14px;}"+
	/* middle body L-border */	"BODY > DIV#whole > DIV#middle_body {border-color:#333;}"+
	/* page txt */			"BODY > DIV#whole > DIV#main > DIV,BODY > DIV#whole > DIV#main > DIV DIV,BODY > DIV#whole > FORM#text_form TD,BODY > DIV#content DIV,BODY > DIV#content TABLE > TBODY > TR > TD,BODY[marginheight='3'][topmargin='3'] > DIV.section,BODY[marginheight='3'][topmargin='3'] > DIV.section LI {color:#ccc !important;}"+
	/* result txt */		"DIV#whole .almost_half_cell #result_box,DIV#whole .almost_half_cell #result_box * {background-color:#000 !important; color:#fff !important;}"+
	/* boxes */			"BODY > DIV#whole > DIV#main >  DIV#alang,BODY[marginheight='3'][topmargin='3'] > DIV.section > TABLE > TBODY > TR > TD.main,BODY[marginheight='3'][topmargin='3'] > DIV.section > DIV#toolbar_float,BODY > DIV#content > DIV.section > TABLE > TBODY > TR > TD.main {padding-top:0.7em; padding-bottom:0.5em; background-color:#262626; border:0 none; color:#ccc !important;padding-left:1em; "+bS('radiusAll')+":14px;}"+
	/* footer */			(uHideFooters?"BODY > DIV#whole > DIV#foot,BODY > DIV#whole > DIV.footer,BODY DIV.tab_footer,BODY > DIV.tab_footer {display:none;}":"")+
	/* Tookit */
	/* output box */ "#result_box > span, #result_box,.short_text{color:white;background: #262626 !important;}"+ 
		/* left nav bg */	"BODY > DIV#main > DIV#nav DIV {background-color:#333 !important;}"+
/* Translate expanded below in BF-func */


// Profile
	/* page txt */			"DIV.vcard DIV,UL.g-section > LI > B {color:#999 !important;}"+
	/* about box */			"DIV.g-section > UL.g-section {background-color:#000;}"+
	/* about tab */			"DIV.g-section > UL.g-section LI#about_tab {background-color:#000; "+bS('border-radius-topright')+":8px; "+bS('border-radius-topleft')+":8px;}"+
	/* footer logo */		(uHideFooters?"DIV.ll_footer IMG.logo {display:none;}":"")+
	/* search logo img [hide] */	"BODY.ll_page_body > DIV > DIV.profile-results-header-search > FORM[name='profilesearch'] > IMG.logo {display:none;}"+
	/* search logo img [insert] */	"BODY.ll_page_body > DIV > DIV.profile-results-header-search > FORM[name='profilesearch'] {padding:0px 0 17px 150px; background:transparent url('"+gL+"') no-repeat scroll 0 !important;}"+
	/* search header */		"BODY.ll_page_body > DIV > TABLE.profile-results-header-ribbon {border:0 none; background-color:#333 !important; color:#fff; padding-left:0.7em; "+bS('radiusAll')+":14px;}"+
	/* search B-pagination W */	"BODY.ll_page_body > DIV > DIV.profile-results-paginator > DIV.p > TABLE[width='1%'] {width:33% !important;}"+
	/* search B-pagination */	"BODY.ll_page_body > DIV > DIV.profile-results-paginator > DIV.p > TABLE[width='1%'] > TBODY > TR[valign='top'][align='center'] > TD IMG {display:none;}"+
	/* search B-searchForm */	"BODY.ll_page_body > DIV > TABLE.profile-results-footer-ribbon {border:0 none; background-color:#000;}"+
/* Profiles Main-page expanded below in BF-func */


// Firefox Start
	/* search outer */		"FORM[name='f'] > TABLE#frame {margin-top:50px; padding-left:20px; background-color:#fff; "+bS('radiusAll')+":14px;}"+
	/* search inner */		"FORM[name='f'] > TABLE#frame > TBODY > TR > TD > TABLE[width='100%'][cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR > TD[width='100%'] > TABLE[cellspacing='0'][cellpadding='0'] {margin:20px; padding: 0 13px 13px 20px; background-color:#000; "+bS('radiusAll')+":14px;}"+
	/* search inner left-col */	"FORM[name='f'] > TABLE#frame > TBODY > TR > TD > TABLE[width='100%'][cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR > TD[width='100%'] > TABLE[cellspacing='0'][cellpadding='0'] > TBODY > TR > TD > IMG[width='40'][height='1'] {display:none;}"+
	/* Google logo removal */	"BODY > CENTER > FORM > TABLE#frame > TBODY > TR > TD > TABLE > TBODY > TR > TD > TABLE > TBODY > TR > TD > TABLE > TBODY > TR > TD > DIV[title='Google'] {visibility:hidden;}"+
	/* orange search button */	"FORM[name='f'] > TABLE#frame > TBODY > TR > TD > TABLE[width='100%'][cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR > TD[width='100%'] > TABLE[cellspacing='0'][cellpadding='0'] > TBODY > TR > TD INPUT[type='submit']:hover {background-color:#f60;}"+
	/* bottom tables */		"BODY[onload='sf()'] > CENTER > FORM > TABLE#frame > TBODY > TR > TD > TABLE[width='100%'] > TBODY > TR > TD > TABLE[width='100%'][cellpadding='4'] {display:none;}"+


// Gm-Script Google Search Sidebar - http://userscripts.org/scripts/show/11888
	/* sidebar width */		"#searchPlus,DIV#gSearchSidebar {width:26% !important; float:right !important;}"+
	/* sidebar txt */		"#searchPlus DIV P,.luna-Ent TD,DIV#gSearchSidebar DUV P {color:#fff !important;}"+
	/* sidebar header */		"#searchPlus H1,DIV#gSearchSidebar H1 {margin-top:1em; background-color:#333 !important; border:0 none !important; "+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px; color:#fff;}"+
	/* sidebar header link */	"#searchPlus H1 A,DIV#gSearchSidebar H1 A {color:#000 !important;}"+
/* Gm-Script Google Search Sidebar expanded below in BF-func */



// Script Update Message Box
	/* layout */			"#gsscriptVersionMessage {position:fixed; top:0px; right:1px; width:420px; height:76px; z-index:1001; overflow:auto; padding:10px; background-color:#C00040; font-family:Trebuchet MS,Verdna; font-weight:bold; font-size:14px; color:#fff !important; text-align:center; cursor:default; "+bS('border-radius-bottomleft')+":28px;}";



// BRUTE-FORCE for "less cooperative" sites (each URI validated)
	var style=document.createElement('style');
	    style.setAttribute('id','bruteForce');
	document.getElementsByTagName('head')[0].appendChild(style);
	//stylesheet Insert Rule
	function sIR(style){$('bruteForce').sheet.insertRule(style,0);}

	// Global Styles
	function Ge(){
		/* Global font */	sIR("* {font-family:"+uFontFamily+";}");
		/* page bg */		sIR("HTML,BODY {background:#000 none !important; color:#fff;}");
		/* link color */	sIR("A,#gbar A.gb1,#gbar A.gb2,#gbar A.gb3,#gbar A.gb3 U,#gbar A.gb4,SPAN.i,.linkon,#codesiteContent A,TABLE.mmhdr TBODY TR TD.mmttlinactive SPAN,TABLE TBODY TR TD TABLE TBODY TR TD A,SPAN#show-new,SPAN#show-all,SPAN.link,SPAN[dir='ltr'] > FONT[color='blue'],FONT[color='blue'][dir='ltr'],.gc-control,.goog-flat-menu-button,.gsc-tabHeader.gsc-tabhInactive,.goog-tab-bar-top .goog-tab,DIV.search-options-header-link,.gtc-doclist-item-select > SPAN,.goog-tab-bar .goog-tab > DIV,UL.goog-tabpane-tabs > LI.goog-tabpane-tab,DIV.gwt-Label,#guser .gb2,DIV.n SPAN.b,SPAN.ae-action,.linkbtn {color:"+lc+" !important;}");
		/* visitedLinx color */	sIR("A:visited {color:"+vl+" !important;}");
		/* resultsvisitedlnx */	sIR("DIV#res A:visited {font-size:0.8em !important;}");
		/* header */		sIR("#guser,#guser *,#gbar,#gbar * {background-color:transparent !important; font-family:"+uFontFamily+" !important; color:#ccc;}");
		/* google bar txt */	sIR("#gbar SPAN {color:#999;}");
		/* google bar txt */	sIR("#gbar DIV.gb1 {background-color:#c9d7f1 !important;}");
		/* google bar txt */	sIR("#gbar DIV.gb2 {padding-top:0; padding-bottom:0; background-color:#c9d7f1 !important;}");
		/* google bar linx */	sIR("#gbar A.gb1,#gbar B.gb1,#gbar A.gb3 {font-weight:bold !important; font-size:1.15em !important;}");
		/* google bar b-line */	sIR("#gbh,.gbh {border-color:#777;}");
		/* search input */	sIR("INPUT[type='text'],INPUT[type='password'],INPUT[name='q'] {background:#333 none !important; color:#ff0; padding:2px; border:solid 1px #ccc; font-weight:bold; color:#ff0 !important;}");
		/* submit btns */	sIR("INPUT[type='submit'],INPUT[type='button'],.yt-button-primary,.manager-page .goog-flat-button, .manager-page .goog-menu-button,BUTTON.search-button,BUTTON#createBtn,BUTTON#cancelBtn,INPUT[type='button'][value='Save changes'],INPUT[type='reset'][value='Clear All'],INPUT[type='reset'][value='Reset'],INPUT[type='button'][value='Done'],INPUT[type='button'][value='Copy'],INPUT[type='button'][value='Move'],INPUT[type='button'][value='Delete'],INPUT[type='button'][value='Compare'],.modal-dialog-buttons BUTTON,.goog-custom-button,BUTTON.gwt-Button,INPUT[type='reset'][value='Cancel'],INPUT[type='button'][value='Check for Updates'] {background:#333 none !important; background:"+bS('gradLinear')+"0% 0%,0% 100%,from(#555),to(#000)) !important; border:solid 1px #ccc !important; color:#fff !important; cursor:pointer; "+bS('radiusAll')+":14px !important;}");
		/* submit btn hover */	sIR("INPUT[type='submit']:hover,BUTTON[type='submit']:hover,INPUT[type='button']:hover,.manager-page .goog-flat-button-hover, .manager-page .goog-menu-button-hover,BUTTON.search-button:hover,INPUT[type='reset'][value='Clear All']:hover,INPUT[type='button'][value='Done']:hover,INPUT[type='button'][value='Copy']:hover,INPUT[type='button'][value='Move']:hover,INPUT[type='button'][value='Delete']:hover,INPUT[type='button'][value='Compare']:hover,.goog-custom-button:hover,BUTTON#send-button:hover,INPUT[type='button'][value='Check for Updates']:hover {background-color:#36f !important; background:"+bS('gradLinear')+"0% 0%,0% 100%,from(#000),to(#36f)) !important; color:#fff;}");
		/* go btns hover */	sIR("INPUT#btnI:hover,INPUT[name='btnI']:hover,INPUT[value='Save']:hover,SPAN#button_0 BUTTON:hover,INPUT#stxemailsend:hover,INPUT[value='Submit Issue']:hover,INPUT[value='Download']:hover,INPUT[value='Add it now']:hover,INPUT[value='Add it now'],INPUT[value='Save Preferences']:hover,INPUT[value='Save Preferences ']:hover,INPUT#save:hover,BUTTON[name='ok']:hover,BUTTON[name='yes']:hover,BUTTON[accesskey='s']:hover,BUTTON#createBtn:hover,INPUT[type='submit'][value='Create an Application']:hover,INPUT[value='Send Email']:hover,INPUT[type='button'][value='Save changes']:hover,INPUT[type='reset'][value='Reset']:hover {background-color:#090 !important; background:"+bS('gradLinear')+"0% 0%,0% 100%,from(#000),to(#090)) !important; color:#fff;}");
		/* cancel btn hover */	sIR("INPUT[value='Cancel']:hover,SPAN#button_1 BUTTON:hover,INPUT[value='Discard']:hover,INPUT[value='Delete Group']:hover,INPUT#cancel:hover,INPUT[value='Cancel']:hover,INPUT#cancel:hover,INPUT[value='Cancel']:hover,BUTTON[name='cancel']:hover,BUTTON[onclick='_EV_Blur(this);_EF_Dismiss(true)']:hover,BUTTON#cancelBtn:hover,BUTTON[name='no']:hover,BUTTON#cancel-button:hover,INPUT[type='reset'][value='Cancel']:hover {background-color:#900 !important; background:"+bS('gradLinear')+"0% 0%,0% 100%,from(#000),to(#900)) !important; color:#fff !important;}");
		/* searchHelp btnsOR */	sIR("BUTTON.wci,BUTTON.w4,BUTTON.w40,BUTTON.w5,BUTTON.w50 {display:inline !important; background:"+bS('gradLinear')+"0% 0%,0% 0%,from(transparent),to(transparent)) !important;}");
		/* gCstmBtn children */	sIR(".goog-custom-button-inner-box,.goog-custom-button-outer-box {border:0 none;}");
		/* div btn outer */	sIR(".goog-button-base-outer-box {border-top-color:#555 !important; border-bottom-color:#333 !important; cursor:pointer;}");
		/* div btn inner */	sIR(".goog-button-base-inner-box {border-left-color:#555 !important; border-right-color:#333 !important; background-color:#555 !important;}");
		/* div btn disabled */	sIR(".goog-button-base-disabled .goog-button-base-inner-box, .goog-button-base-disabled .goog-button-base-top-shadow,.goog-button-base-disabled SPAN {background-color:#151515 !important; border-bottom-color:#222 !important; color:#333 !important;}");
		/* div btn inner txt */	sIR(".goog-button-base-content,.goog-button-base-content SPAN {color:#fff !important;}");
		/* div btn inner txtH*/	sIR(".goog-button-base-content:hover {color:#fff !importan;}");
		/* div btn T-shadow */	sIR(".goog-button-base-top-shadow {background-color:#777 !important; border-bottom-color:#555 !important;}");
		/* div btn restrict */	sIR("#search-restrict {border-bottom-color:#000 !important;}");
		/* menu dropd folder */	sIR("DIV.goog-menu > DIV.goog-menuitem > DIV.goog-menuitem-content {color:#ccc !important;}");
		/* menu dropd item */	sIR("DIV.goog-menu > DIV.goog-menuitem {background-color:#222 !important; color:#999 !important;}");
		/* menu dropd itemHov*/	sIR("DIV.goog-menu > DIV.goog-menuitem:hover {background-color:#333 !important; color:#ccc !important;}");
		/* more pop layer */	sIR("SPAN#more,#gbar .gb2 {background-color:#333 !important; border-right:solid 1px #a2bae7; border-bottom:solid 1px #a2bae7; color:#333 !important;}");
		/* modal box */		sIR(".modal-dialog {background-color:#222; border:0 none; color:#999; "+bS('radiusAll')+":14px;}");
		/* modal title */	sIR(".modal-dialog-title {background-color:#333; color:#fff; "+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}");
		/* modal content */	sIR("BODY > .modal-dialog .modal-dialog-content,BODY > .modal-dialog .modal-dialog-buttons {background-color:#222; border:0 none; color:#fff;}");
		/* modal content txt */	sIR("BODY#body > DIV.modal-dialog > DIV.modal-dialog-content SPAN,BODY#body > DIV.modal-dialog > DIV.modal-dialog-content P {color:#999;}");
		/* modal content s-S */	sIR("BODY#body > DIV.modal-dialog > DIV.modal-dialog-content .selected,BODY#body > DIV.modal-dialog > DIV.modal-dialog-content .selected SPAN {background-color:#555; color:#000;}");
		/* modal bottom */	sIR("BODY > .modal-dialog .modal-dialog-buttons {"+bS('border-radius-bottomright')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* 404 error header */	sIR("BODY[text='#000000'][bgcolor='#ffffff'] TABLE[width='100%'] > TBODY > TR > TD[bgcolor='#3366cc']:first-child {background-color:#000;}");
	}


	// Google Login Pages
	if((iO(lH,".google.")>-1&&(iO(lH,"/Login?")>-1||iO(lH,"/ServiceLogin?")>-1)||iO(lH,"/ServiceLoginAuth")>-1)||(iO(lH,"https%3A%2F%2Fwww.google.com%2Fvoice%2Faccount%2Fsignin%2F")>-1)){
		/* applyGlobals */	Ge();

		/* logo img [remove] */	sIR("BODY[onload='gaia_setFocus();'] > DIV#main > DIV.header > A > IMG,BODY[onload='gaia_setFocus();'] > DIV#main > DIV#maincontent > TABLE > TBODY > TR > TD > DIV#rhs > DIV#rhs_login_signup_box > FORM#gaia_loginform > DIV#gaia_loginbox > TABLE.form-noindent > TBODY > TR > TD > DIV.loginBox > TABLE#gaia_table > TBODY > TR> TD > TABLE > TBODY > TR > TD > IMG,BODY[onload='gaia_setFocus();'].compact > H1 > IMG:first-child,BODY[onload='gaia_setFocus();'].compact > DIV#main > DIV.rightside > FORM#gaia_loginform > DIV#gaia_loginbox > TABLE.form-noindent > TBODY > TR > TD > DIV.loginBox > TABLE#gaia_table > TBODY > TR > TD > TABLE > TBODY > TR > TD> IMG:first-child,BODY > DIV#main > DIV.header > IMG.logo,DIV.loginBox > TABLE#gaia_table > TBODY > TR > TD > TABLE > TBODY > TR > TD:first-child,BODY > DIV#main > DIV > DIV.logo > A > IMG.logo,BODY > DIV#main > TABLE[width='100%'][cellpadding='2'] > TBODY > TR > TD[width='150'][style='padding-right: 10px;'][rowspan='2'] > A > IMG,BODY > DIV#header > DIV#logo > A > IMG {display:none;}");
		/* logo [hide] */	sIR("BODY > TABLE[width='95%']:first-child > TBODY > TR[valign='top'] > TD[width='1%']:first-child > IMG,BODY > DIV#main > DIV.logo-header > A > IMG {visibility:hidden;}");
		/* logo img [insert] */	sIR("BODY[onload='gaia_setFocus();'] > DIV#main > DIV.header,BODY[onload='gaia_setFocus();'].compact > H1,BODY > DIV#main > DIV.header,BODY > TABLE[width='95%']:first-child > TBODY > TR[valign='top'] > TD[width='1%']:first-child,BODY > DIV#main > DIV > DIV.logo,BODY > DIV#main > TABLE[width='100%'][cellpadding='2'] > TBODY > TR > TD[width='150'][style='padding-right: 10px;'][rowspan='2'],BODY > DIV#header > DIV#logo,BODY > DIV#main > DIV.logo-header {width:150px !important; height:55px !important; border:0 none; background:transparent url('"+gL+"') no-repeat scroll 0 !important; font-size:0;}");
		/* strong txt */	sIR("BODY[onload='gaia_setFocus();'] > DIV#main > DIV#maincontent > TABLE > TBODY > TR > TD B:first-child,BODY[onload='gaia_setFocus();'].compact > DIV#main > H2,BODY[onload='gaia_setFocus();'].compact > DIV#main > P.icon > B,BODY > DIV.g-doc-800 > DIV.g-section > DIV.g-unit > DIV.header-text > DIV.productname > H1 {color:#fff;}");
		/* grey cntnrs */	sIR("BODY[onload='gaia_setFocus();'] > DIV#main > DIV#maincontent > TABLE > TBODY > TR > TD > DIV#rhs > DIV#rhs_login_signup_box > FORM#gaia_loginform > DIV#gaia_loginbox > TABLE.form-noindent,BODY[onload='gaia_setFocus();'] > DIV#main > DIV#maincontent > TABLE > TBODY > TR > TD > DIV#rhs > DIV#rhs_login_signup_box > TABLE.form-noindent,BODY[onload='gaia_setFocus();'].compact > DIV#main > DIV.tip,BODY[onload='gaia_setFocus();'].compact > DIV#main > DIV.rightside > FORM#gaia_loginform > DIV#gaia_loginbox,BODY[onload='gaia_setFocus();'].compact > DIV#main > DIV.rightside > DIV.gaia_signupbox,BODY > DIV#main > TABLE > TBODY > TR > TD > FORM#gaia_loginform > DIV#gaia_loginbox > TABLE.form-noindent,BODY > TABLE[width='95%']:first-child > TBODY > TR[valign='top'] > TD[width='99%'][bgcolor='#ffffff'] > TABLE[width='100%']:first-child > TBODY > TR > TD[nowrap='nowrap']:first-child > TABLE[bgcolor='#c3d9ff'] TR:first-child TD[style='padding: 5px 0pt; font-family: arial; text-align: left; font-weight: bold;'].bubble,DIV#login > FORM#gaia_loginform > DIV#gaia_loginbox > TABLE.form-noindent > TBODY > TR:first-child > TD[bgcolor='#e8eefa'],BODY > TABLE > TBODY > TR > TD > TABLE#links > TBODY > TR[bgcolor='#e8eefa'] > TD,BODY[onload='gaia_setFocus();'] > DIV#main > DIV#maincontent > TABLE > TBODY > TR > TD > DIV#rhs > DIV#rhs_login_signup_box > TABLE.form-noindent > TBODY > TR > TD,BODY[onload='gaia_setFocus();'].compact > DIV#main > DIV.rightside > DIV.gaia_signupbox > TABLE.form-noindent > TBODY > TR > TD,BODY > CENTER > TABLE > TBODY > TR > TD > FORM#gaia_loginform > DIV#gaia_loginbox > TABLE.form-noindent > TBODY > TR > TD[valign='top'][nowrap='nowrap'][bgcolor='#e8eefa'][style='text-align: center;'],BODY > CENTER > TABLE > TBODY > TR > TD > DIV#addbtn1 > DIV[style='margin-top: 15px; margin-bottom: 15px;'],DIV#rhs > DIV#rhs_login_signup_box > FORM#gaia_universallogin > DIV > TABLE.form-noindent,DIV#rhs > DIV#rhs_login_signup_box > FORM#gaia_universallogin > DIV > TABLE.form-noindent TD[bgcolor='#e8eefa'],DIV.gc-si-content > FORM#gaia_loginform > DIV#gaia_loginbox > TABLE.form-noindent,BODY > DIV#main > TABLE > TBODY > TR > TD > TABLE.form-noindent > TBODY > TR > TD[bgcolor='#e8eefa'],BODY > DIV#main > TABLE[width='100%'][cellpadding='2'] > TBODY > TR > TD[style='border-bottom: 1px solid rgb(204, 204, 204); padding-bottom: 2px;'],BODY > DIV.g-doc-800 > DIV.g-section > DIV.g-unit > DIV.header-text,BODY > DIV.g-doc-800 > DIV.g-section > DIV.g-first > FORM#gaia_loginform > DIV#gaia_loginbox,BODY > DIV.g-doc-800 > DIV.g-section > DIV.g-first > TABLE.form-noindent > TBODY > TR > TD[bgcolor='#e8eefa'],#right #login,#right .blue-background {padding-left:0.5em !important; background-color:#333 !important; border:0; text-align:center; color:#fff !important; "+bS('radiusAll')+":14px;}");
		/* inner boxes */	sIR("BODY[onload='gaia_setFocus();'] > DIV#main > DIV#maincontent > TABLE > TBODY > TR > TD > DIV#rhs > DIV#rhs_login_signup_box > FORM#gaia_loginform > DIV#gaia_loginbox > TABLE.form-noindent > TBODY > TR > TD,BODY[onload='gaia_setFocus();'].compact > DIV#main > DIV.rightside > FORM#gaia_loginform > DIV#gaia_loginbox > TABLE.form-noindent > TBODY > TR > TD,BODY[onload='gaia_setFocus();'].compact > DIV#main > DIV.rightside > FORM#gaia_loginform > DIV#gaia_loginbox,BODY > DIV#main > TABLE > TBODY > TR > TD > FORM#gaia_loginform > DIV#gaia_loginbox > TABLE.form-noindent,BODY > TABLE[width='95%']:first-child > TBODY > TR[valign='top'] > TD[width='99%'][bgcolor='#ffffff'],BODY > TABLE[width='95%']:first-child > TBODY > TR[valign='top'] > TD[width='99%'][bgcolor='#ffffff'] > TABLE[width='100%']:first-child > TBODY > TR > TD[nowrap='nowrap']:first-child > TABLE[bgcolor='#c3d9ff'],BODY > TABLE[width='95%']:first-child > TBODY > TR[valign='top'] > TD[width='99%'][bgcolor='#ffffff'],BODY > TABLE[width='95%']:first-child > TBODY > TR[valign='top'] > TD[width='99%'][bgcolor='#ffffff'] > TABLE[width='100%']:first-child > TBODY > TR > TD[nowrap='nowrap']:first-child > TABLE[bgcolor='#c3d9ff'] TD,BODY > TABLE[width='95%']:first-child > TBODY > TR[valign='top'] > TD[width='99%'][bgcolor='#ffffff'],BODY > TABLE[width='95%']:first-child > TBODY > TR[valign='top'] > TD[width='99%'][bgcolor='#ffffff'] > TABLE[width='100%']:first-child > TBODY > TR > TD[nowrap='nowrap']:first-child > TABLE[bgcolor='#c3d9ff'] TD DIV,BODY > TABLE[width='94%'][cellspacing='1'][cellpadding='5'][align='center'] > TBODY > TR:first-child > TD[valign='top'][style='text-align: left;']:first-child > B,DIV#login > FORM#gaia_loginform > DIV#gaia_loginbox > TABLE.form-noindent,DIV#login > FORM#gaia_loginform > DIV#gaia_loginbox > TABLE.form-noindent > TBODY > TR > TD > DIV.loginBox,BODY > TABLE > TBODY > TR > TD > TABLE#links,BODY > TABLE > TBODY > TR > TD > TABLE#links > TBODY > TR[bgcolor='#e8eefa'],BODY > TABLE > TBODY > TR > TD > TABLE#links > TBODY > TR[bgcolor='#e8eefa'] > TD > DIV > TABLE.signup_btn,BODY > TABLE > TBODY > TR > TD > TABLE#links > TBODY > TR[bgcolor='#e8eefa'] > TD > DIV > TABLE.signup_btn TD,BODY > DIV#main > TABLE > TBODY > TR > TD > FORM#gaia_loginform > DIV#gaia_loginbox > TABLE.form-noindent > TBODY > TR > TD,BODY > DIV#main > TABLE > TBODY > TR > TD > TABLE.form-noindent > TBODY > TR[bgcolor='#e8eefa'] > TD TD.btn_m,BODY[onload='gaia_setFocus();'] > DIV#main > DIV#maincontent > TABLE > TBODY > TR > TD > DIV#rhs > DIV#rhs_login_signup_box > TABLE.form-noindent > TBODY > TR[bgcolor='#e8eefa'],BODY > CENTER > TABLE > TBODY > TR > TD > FORM#gaia_loginform > DIV#gaia_loginbox > TABLE.form-noindent > TBODY > TR > TD[valign='top'][nowrap='nowrap'][bgcolor='#e8eefa'][style='text-align: center;'] > DIV.loginBox,BODY > CENTER > TABLE > TBODY > TR > TD > DIV#addbtn1 > DIV[style='margin-top: 15px; margin-bottom: 15px;'] > TABLE.DownloadButton TD[background='lh2/dl_button_middle.jpg'],BODY > DIV#main > DIV#maincontent > TABLE > TBODY > TR > TD > DIV#rhs > DIV#rhs_login_signup_box > TABLE.form-noindent > TBODY > TR > TD[bgcolor='#e8eefa'] > TABLE > TBODY > TR > TD.btn,DIV#rhs > DIV#rhs_login_signup_box > FORM#gaia_universallogin > DIV > TABLE.form-noindent > TBODY > TR > TD[bgcolor='#e8eefa'] DIV.dasherLogin > A > SPAN[style='font-size: 11px;'],DIV.gc-si-content > FORM#gaia_loginform > DIV#gaia_loginbox > TABLE.form-noindent > TBODY > TR > TD[bgcolor='#e8eefa'],BODY > DIV#main > TABLE > TBODY > TR > TD > TABLE.form-noindent > TBODY > TR > TD[bgcolor='#e8eefa'] > A,BODY > DIV.g-doc-800 > DIV.g-section > DIV.g-first > FORM#gaia_loginform > DIV#gaia_loginbox > TABLE.form-noindent > TBODY > TR > TD[bgcolor='#e8eefa'],BODY > DIV.g-doc-800 > DIV.g-section > DIV.g-first > TABLE.form-noindent > TBODY > TR > TD[bgcolor='#e8eefa'] > A,#right > .loginbox,#right > .blue-border {background:#000 none; border:0 none; color:#fff; "+bS('radiusAll')+":14px;}");
		/* footer */		if(uHideFooters)sIR("BODY[onload='gaia_setFocus();'] > DIV#main > DIV.footer,BODY[onload='gaia_setFocus();'].compact > DIV#main > DIV#about,BODY > DIV#main > DIV.hrule,BODY > TABLE[width='95%'][bgcolor='#c3d9ff'][style='margin-bottom: 5px;'],BODY > CENTER > TABLE[width='750'][cellpadding='0'][border='0'] > TBODY > TR > TD[valign='top'][align='center'][colspan='4'] {display:none;}");

		// Login-page-specific Elements
		/* iGoogle */
		/* create inner box */	sIR("BODY[onload='gaia_setFocus();'] > DIV#main > DIV#maincontent > TABLE > TBODY > TR > TD A > B:first-child {position:relative; top:3px; padding:0 7px 2px 7px; background:#000 none; border:0 none; color:#fff; "+bS('radiusAll')+":14px;}");

		// Gmail
		/* create box height */	sIR("BODY > TABLE > TBODY > TR > TD > TABLE#links,BODY > TABLE > TBODY > TR > TD > TABLE#links > TBODY > TR[bgcolor='#e8eefa'],BODY > TABLE > TBODY > TR > TD > TABLE#links > TBODY > TR[bgcolor='#e8eefa'] > TD > DIV > TABLE.signup_btn TD {height:inherit !important; padding-top:2px; padding-bottom:2px;}");

		// YouTube
		/* logo [hide] */	sIR("BODY > DIV#main > DIV#masthead-container > DIV#masthead > A.logo > IMG {visibility:hidden;}");
		/* logo [replace] */	sIR("#masthead {background:transparent url(http://i37.tinypic.com/4jrkh0_th.jpg) 23px -23px no-repeat;}");
		/* top search box */	sIR("#masthead-search {border:0 none; background-color:#000;}");
		/* login box logos */	sIR("DIV.loginBox IMG[src='youtube/youtube_google_brand.gif'] {display:none;}");
		/* login link spcng */	sIR("BODY > DIV#main > TABLE > TBODY > TR > TD > TABLE.form-noindent > TBODY > TR > TD[bgcolor='#e8eefa'] > A {padding-right:0.7em; padding-left:0.7em;}");

		// Groups
		/* createAccnt btn */	sIR("BODY[onload='gaia_setFocus();'] > DIV#main > DIV#maincontent > TABLE > TBODY > TR > TD > DIV#rhs > DIV#rhs_login_signup_box > TABLE.form-noindent > TBODY > TR[bgcolor='#e8eefa'] > TD > P > TABLE > TBODY > TR > TD {background-image:none;}");

		// Voice
		/* feat-txt */		sIR("BODY> DIV.gc-mid > TABLE#gc-features > TBODY > TR > TD > DIV.gc-item-hd {color:#fff;}}");
		/* invite bar */	sIR("BODY > DIV#gc-signup-closed {background-color:#333; border:0; color:#fff; "+bS('radiusAll')+":14px;}");

		// Calendar
		/* createAccnt cntnr */	sIR("BODY > DIV#main > TABLE > TBODY > TR > TD > TABLE.form-noindent,BODY > DIV#main > TABLE > TBODY > TR > TD > TABLE.form-noindent > TBODY > TR[bgcolor='#e8eefa'] {background-color:#000; border:0 none;}");
		/* createAccnt inner */	sIR("BODY > DIV#main > TABLE > TBODY > TR > TD > TABLE.form-noindent > TBODY > TR[bgcolor='#e8eefa'] > TD   {background-color:#333; "+bS('radiusAll')+":14px;}");
		/* createAccnt btn */	sIR("BODY > DIV#main > TABLE > TBODY > TR > TD > TABLE.form-noindent > TBODY > TR[bgcolor='#e8eefa'] > TD TD {background-image:none;}");

		// Reader
		/* create btn sides */	sIR("TABLE.form-noindent > TBODY > TR > TD > TABLE > TBODY > TR > TD > IMG[src='reader/btn_left.gif'],TABLE.form-noindent > TBODY > TR > TD > TABLE > TBODY > TR > TD > IMG[src='reader/btn_right.gif'] {display:none;}");
		/* create btn bg */	sIR("TABLE.form-noindent > TBODY > TR > TD > TABLE > TBODY > TR > TD.btn {background-image:none;}");

		// Docs
		/* createAccnt btnBg */	sIR("BODY > DIV#main > DIV#maincontent > TABLE > TBODY > TR > TD > DIV#rhs > DIV#rhs_login_signup_box > TABLE.form-noindent > TBODY > TR > TD[bgcolor='#e8eefa'] > TABLE > TBODY > TR > TD > IMG {visibility:hidden;}");

		// Checkout
		/* headttl */		sIR("BODY > DIV#content > DIV#main > H2 {margin-left:5.3em;}");
		/* seller abtTblCntn */	sIR("#tab-content-r {border-color:#333; border-left:1px solid #333; "+bS('border-radius-topright')+":14px; "+bS('border-radius-bottomright')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* seller abtTblLmB */	sIR("#empty_tab,.blue-border,.signupBottom {border:0 none !important;}");
		/* seller abtTblLmI */	sIR("UL#tab-content-list LI,UL#tab-content-list LI.menu,#tab-content-r,#tab-content-header {background:#000 none !important;}");
		/* seller abtTblLmib */	sIR("UL#tab-content-list LI,UL#tab-content-list LI.menu,#tab-content-header {border:0 none;}");
		/* seller abtTblLmS */	sIR("UL#tab-content-list LI.active {background:#333 none !important; border:0 none !important; "+bS('border-radius-topleft')+":14px; "+bS('border-radius-bottomleft')+":14px;}");

		// Sites
		/* createAccnt btn */	sIR("DIV#rhs > DIV#rhs_login_signup_box > FORM#gaia_universallogin > DIV > TABLE.form-noindent > TBODY > TR > TD[bgcolor='#e8eefa'] DIV.dasherLogin > A > SPAN[style='font-size: 11px;'] {padding:0.5em;}");

		// Profiles
		/* page txt */		sIR("BODY[dir='ltr'] > DIV#main P {color:#999;}");
		/* create button */	sIR("DIV#rhs > DIV#buttonBlock > DIV.g-button {border:0 none; background-color:#000;}");

		// App Engine
		/* hdr adj */		sIR("BODY > DIV#main > TABLE[width='100%'][cellpadding='2'] > TBODY > TR > TD[style='border-bottom: 1px solid rgb(204, 204, 204); padding-bottom: 2px;'] {border:0 none !important; vertical-align:middle;}");
		/* hdr txt */		sIR("BODY > DIV#main > TABLE[width='100%'][cellpadding='2'] > TBODY > TR > TD[style='border-bottom: 1px solid rgb(204, 204, 204); padding-bottom: 2px;'] > FONT {color:#fff;}");
		/* main adj */		sIR("BODY > DIV#main > DIV#maincontent {padding-top:1em;}");

		// Picasa Web Albums
		/* accntBoxesSpacing */	sIR("BODY > CENTER > TABLE > TBODY > TR > TD > FORM#gaia_loginform > DIV#gaia_loginbox > TABLE.form-noindent > TBODY > TR > TD[valign='top'][nowrap='nowrap'][bgcolor='#e8eefa'][style='text-align: center;'] > DIV.loginBox,BODY > CENTER > TABLE > TBODY > TR > TD > DIV#addbtn1 > DIV[style='margin-top: 15px; margin-bottom: 15px;'] {padding:0.5em;}");
		/* createAccnt btnSd */	sIR("BODY > CENTER > TABLE > TBODY > TR > TD > DIV#addbtn1 > DIV[style='margin-top: 15px; margin-bottom: 15px;'] > TABLE.DownloadButton TD IMG {visibility:hidden;}");
		/* createAccnt btnSp */	sIR("BODY > CENTER > TABLE > TBODY > TR > TD > DIV#addbtn1 > DIV[style='margin-top: 15px; margin-bottom: 15px;'] > TABLE.DownloadButton TD[background='lh2/dl_button_middle.jpg'] > DIV {padding:0.5em !important;}");

		// Knol
		/* heading txt */	sIR("BODY > DIV.g-doc-800 H2 {color:#ccc !important;}");
		/* tabs title */	sIR("#pagetabs .tabtitle {padding-left:0.5em; background-color:#333; border:0 none; "+bS('radiusAll')+":14px;}");
		/* tabs content */	sIR("#tabcontent > #tabcontent1, #tabcontent > #tabcontent2, #tabcontent > #tabcontent3, #tabcontent > #tabcontent4, #tabcontent > #tabcontent5, #tabcontent > #tabcontent6 {border:0 none; color:#999;}");
		/* tabs */		sIR("#tabmenu LI,#tabmenu LI.active {background:#000 none; border:0 none;}");
		/* tab active */	sIR("#tabmenu LI.active A {color:#fff !important;}");
		/* tab fake rBrdr */	sIR("#pagetabs #lasttab {border:0 none;}");
		/* create box */	sIR("BODY > DIV.g-doc-800 > DIV.g-section > DIV.g-first > TABLE.form-noindent > TBODY > TR > TD[bgcolor='#e8eefa'] {padding:0.5em;}");
		/* create box link */	sIR("BODY > DIV.g-doc-800 > DIV.g-section > DIV.g-first > TABLE.form-noindent > TBODY > TR > TD[bgcolor='#e8eefa'] > A {padding:0.1em 0.5em 0.2em 0.5em;}");
	}


	// Web Search
	else if(iO(lH,".google.")>-1&&(iO(lH,Gtld+"/search?")>-1||iO(lH,Gtld+"/#hl=")>-1)){
		/* RemovSrchTracking */	setTimeout(RST,1001);
		/* resultW [DYNMC] */	sIR("DIV#res {width:"+rW+"% !important;}");

		// Latest Results Panel
		/* item border */	sIR("TABLE.ts .rt1,TABLE.ts .rt2 {background:#000 none !important;}");

		// Keyboard Shortcuts Experiment
		/* keyboardLegend bg */	sIR("BODY DIV#cnt TABLE.mbEnd,BODY DIV#cnt TABLE.mbEnd TD,TABLE.mbEnd,TABLE.mbEnd TD,#mbEnd {border:0 none !important; background-color:#000 !important;}");
		/* keyboardChevron */	sIR("BODY DIV#res > DIV > OL > LI.g > IMG[src='/images/chevron.gif'] {padding:1px; background-color:#fff;}");
		/* keyboardExp KeyTl */	sIR("BODY TABLE.mbEnd > TBODY > TR > TD.std > CENTER.f {font-weight:bold; color:#fff;}");

		// Gm-Script Google Search Sidebar
		/* sidebar width */	sIR("#searchPlus,DIV#gSearchSidebar {width:26% !important; float:right !important;}");
		/* sidebar txt */	sIR("#searchPlus DIV P,.luna-Ent TD,DIV#gSearchSidebar DUV P {color:#fff !important;}");
		/* sidebar header */	sIR("#searchPlus H1,DIV#gSearchSidebar H1 {margin-top:1em; background-color:#333 !important; border:0 none !important; "+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px; color:#fff;}");
		/* sidebar hdrLink */	sIR("#searchPlus H1 A,DIV#gSearchSidebar H1 A {color:#000 !important;}");
	}

	// Web: Advanced Search
	else if(iO(lH,".google."+Gtld+"/advanced_search?")>-1){
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("BODY > TABLE[width='100%'][style='margin-top: 1em;'] > TBODY > TR:first-child > TD[width='1%']:first-child > A > IMG[width='150'],BODY > FORM[name='f'] > TABLE[width='99%'][cellspacing='2'][cellpadding='0'][border='0'] > TBODY > TR:first-child > TD:first-child > A#logo > SPAN {display:none;}");
		/* logo img [insert] */	sIR("BODY > FORM[name='f'] > TABLE[width='99%'][cellspacing='2'][cellpadding='0'][border='0'] > TBODY > TR:first-child > TD:first-child > A#logo > SPAN,BODY > TABLE[width='100%'][style='margin-top: 1em;'] > TBODY > TR:first-child > TD[width='1%']:first-child {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important; font-size:0;}");
		/* header */		sIR("BODY > FORM[name='f'] > TABLE > TBODY > TR > TD > TABLE > TBODY > TR > TD[bgcolor='#3366cc'],BODY > FORM[name='f'] > TABLE > TBODY > TR > TD > TABLE > TBODY > TR > TD[bgcolor='#d5ddf3'],BODY > TABLE[width='100%'][style='margin-top: 1em;'] > TBODY > TR:first-child > TD > TABLE[width='100%'][style='border-top: 1px solid rgb(51, 102, 204);'] {border:0 none !important; background-color:#000;};");
		/* header bar L */	sIR("BODY > TABLE[width='100%'][style='margin-top: 1em;'] > TBODY > TR:first-child > TD > TABLE[width='100%'][style='border-top: 1px solid rgb(51, 102, 204);'] > TBODY > TR > TD.page-title {padding-left:0.1em; background-color:#333 !important; color:#fff !important; "+bS('border-radius-topleft')+":9px; "+bS('border-radius-bottomleft')+":14px;}");
		/* header bar R */	sIR("BODY > TABLE[width='100%'][style='margin-top: 1em;'] > TBODY > TR:first-child > TD > TABLE[width='100%'][style='border-top: 1px solid rgb(51, 102, 204);'] > TBODY > TR > TD[bgcolor='#d5ddf3'] {padding-right:0.2em; background-color:#333; "+bS('border-radius-topright')+":9px; "+bS('border-radius-bottomright')+":14px;}");
		/* top box */		sIR("DIV.outer-box > FORM.block {border-color:#333; "+bS('border-radius-bottomright')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* top box title */	sIR("DIV.outer-box > DIV:first-child,DIV.outer-box > DIV:first-child > DIV {border-color:#333; background-color:#333 !important; font-weight:bold; color:#fff !important; "+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}");
		/* lower box */		sIR("DIV#related.block {border-color:#333; "+bS('radiusAll')+":14px;}");
		/* boxed txt */		sIR("BODY > TABLE[width='100%'] TD {color:#999;}");
		/* outer box bg */	sIR("TABLE[width='99%'] > TBODY > TR[bgcolor='#cbdced'] {background-color:#000 !important;}");
		/* lower box bg */	sIR("TABLE[width='99%'] > TBODY > TR[bgcolor='#cbdced'] > TD TABLE[width='100%'] > TBODY > TR[bgcolor='#ffffff'],TABLE[width='99%'] > TBODY > TR[bgcolor='#cbdced'] > TD > TABLE[width='100%'] > TBODY > TR[bgcolor='#ffffff'] TD,BODY > FORM[name='f'] > FONT > TABLE > TBODY > TR > TD,BODY > FORM[name='f'] > FONT > TABLE > TBODY > TR > TD TD {background-color:#000 !important; color:#ccc !important;}");
		/* top box bg */	sIR("TABLE[width='99%'] > TBODY > TR[bgcolor='#cbdced'] > TD TABLE[width='100%'] > TBODY > TR[bgcolor='#cbdced'],TABLE[width='99%'] > TBODY > TR[bgcolor='#cbdced'] > TD > TABLE[width='100%'] > TBODY > TR[bgcolor='#cbdced'] TD,BODY > FORM[name='f'] > FONT > TABLE > TBODY > TR:first-child > TD:first-child {background-color:#000 !important; color:#ccc !important;}");
		/* footer */		if(uHideFooters)sIR("BODY > FORM[name='f'] > CENTER > FONT[face='arial,sans-serif'] > FONT[size='-1'],BODY > CENTER > FONT[size='-1'] {display:none;}");
	}


	// Web: Search Within
	else if(iO(lH,".google.")>-1&&iO(lH,"/swr?")>-1){
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("BODY > FORM > TABLE[width='100%'][cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR:first-child > TD:first-child > A[href='/'] > IMG {visibility:hidden;}");
		/* logo img [insert] */	sIR("BODY > FORM > TABLE[width='100%'][cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR:first-child > TD:first-child {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important; font-size:0;}");
		/* page txt */		sIR("TD,DIV {color:#ccc;}");
		/* bold txt */		sIR("TD B,DIV B {color:#fff;}");
		/* footer */		if(uHideFooters)sIR("BODY > CENTER > DIV[class='t n bt'] {display:none;}");
	}


	// Custom Search Engine
	else if(iO(lH,".google.")>-1&&(iO(lH,Gtld+"/cse")>-1||iO(lH,Gtld+"/custom")>-1)){
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("BODY > DIV#content TD[style='padding-right: 25px; padding-top: 8px;'] > A > IMG,BODY > DIV#parent > DIV#header > DIV#title:first-child > TABLE:first-child > TBODY > TR:first-child > TD[valign='middle']:first-child > A#logo > IMG,BODY > DIV#parent > DIV#header > TABLE:first-child > TBODY > TR:first-child > TD:first-child > A > IMG,BODY > DIV#content > DIV[style='padding: 10px;']:first-child > A > IMG,BODY > DIV[align='left']:first-child > TABLE:first-child > TBODY > TR > TD[width='1'] > IMG,IMG[src='/images/poweredby_transparent/poweredby_FFFFFF.gif'] {display:none;}");
		/* logo img [insert] */	sIR("BODY > DIV#content TD[style='padding-right: 25px; padding-top: 8px;'],BODY > DIV#parent > DIV#header > DIV#title:first-child > TABLE:first-child > TBODY > TR:first-child > TD[valign='middle']:first-child,BODY > DIV#parent > DIV#header > TABLE:first-child > TBODY > TR:first-child > TD:first-child,BODY > DIV#content > DIV[style='padding: 10px;']:first-child,BODY > DIV[align='left']:first-child > TABLE:first-child > TBODY > TR > TD[width='1'] {padding-left:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important;}");
		/* r-side boxes */	sIR("TD[style='margin-left: 2em;'] > TABLE > TBODY > TR > TD,.one,.two,TD.corners .dark {background:#000 none !important; border:0 none !important;}");
		/* lower box */		sIR("DIV[style='border: 1px solid rgb(254, 233, 13); padding: 0px 8px; width: 450px; margin-top: 10px;'] {"+bS('radiusAll')+":14px;}");
		/* l-nav line */	sIR("#leftnav {border-right-color:#333 !important;}");
		/* l-nav selected */	sIR(".cse-panel-nav-selected {padding-left:0.5em; background-color:#333; "+bS('border-radius-topleft')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* l-nav box */		sIR("#cse-nav-resources {background-color:#181818; border:0 none; "+bS('radiusAll')+":14px;}");
		/* headers */		sIR(".sitetable TR.header TD,#parent H2,.bb,BODY > TABLE[class='t bb'],#cse-content H4,.bookmarklet-button {padding-left:0.5em; background-color:#333; border;0 none !important; border-bottom;0 none #000 !important; "+bS('radiusAll')+":14px;}");
		/* tblBg */		sIR("TD[style='border-top: 1px solid rgb(187, 204, 237); background-color: rgb(232, 244, 247);'],TD[style='border-top: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204);'],DIV[style='border-top: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204); padding: 2px;'],.cse-table-caption,.cse-table-toolbar,.cse .gsc-control-cse,.gsc-control-cse,.warning,.cse .gsc-webResult.gsc-result, .gsc-webResult.gsc-result {background-color:#000 !important; border:0 none !important;}");
		/* results width */	sIR(".j {width:100%;}");
		/* page txt */		sIR("#res LI DIV,TABLE.tb TD {color:#999;}");
		/* lower search bg */	sIR(".t {background-color:#000;}");
		/* footer */		if(uHideFooters)sIR("BODY > DIV#parent > DIV#footer,BODY > DIV#footer:last-child {display:none;}");
	}


	// Insights for Search
	else if(iO(lH,".google."+Gtld+"/insights/search/")>-1){
		/* applyGlobals */	Ge();

		/* logo img [replce] */	sIR("BODY > DIV#main > TABLE[style='float: left;'] > TBODY > TR:first-child > TD:first-child > A > DIV {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important;}");
		/* head search box */	sIR("DIV#controlPanel TABLE.fullPanelRow {background-color:#181818; border:0 none; "+bS('radiusAll')+":14px;}");
		/* head search boxH */	sIR("DIV#controlPanel TR#ctrlPnlTitlesRow TH {background:#333 none !important;}");
		/* head search boxHl */	sIR("DIV#controlPanel TR#ctrlPnlTitlesRow TH:first-child {"+bS('border-radius-topleft')+":14px;}");
		/* head search boxHr */	sIR("DIV#controlPanel TR#ctrlPnlTitlesRow TH:last-child {"+bS('border-radius-topright')+":14px;}");
		/* lower report */	sIR("BODY > DIV#main > DIV#reportContent,BODY > DIV#main > DIV#reportContent TD {background-color:#000; color:#999;}");
		/* lower report */	sIR("BODY > DIV#main > DIV#reportContent,BODY > DIV#main > DIV#reportContent .primaryBand TD {background-color:#333;}");
		/* lower report Btxt */	sIR("DIV#reportContent,DIV#reportContent TD B {color:#fff;}");
		/* header */		sIR("DIV H2,.totals > .totalsTitle {background-color:#333; border:0 none; "+bS('radiusAll')+":14px;}");
		/* modal box */		sIR(".embed-dialog {background-color:#222; border:0 none; "+bS('radiusAll')+":14px;}");
		/* modal title */	sIR(".embed-dialog .embed-dialog-title {"+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}");
		/* modal txt */		sIR(".embed-dialog  TD {color:#999;}");
		/* footer */		if(uHideFooters)sIR("#footer > P:last-child {display:none;}");
	}


	// Explore Google Search
	else if(iO(lH,".google."+Gtld+"/landing/searchtips/")>-1){
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("BODY > DIV.g-doc-800 > DIV.header > A[href='/'] > IMG.logo {display:none;}");
		/* logo img [insert] */	sIR("BODY > DIV.g-doc-800 > DIV.header {height:50px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important;}");
		/* r-side box */	sIR(".content .moreinfo-box {background-color:#333; border:0 none; "+bS('radiusAll')+":14px;}");
		/* footer */		if(uHideFooters)sIR("BODY > DIV.g-doc-800 > DIV.footer:last-child {display:none;}");
	}


	// Search Features
	else if(iO(lH,".google."+Gtld+"/help/features.html")>-1){
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("BODY > DIV.g-doc:first-child > DIV.g-section > DIV.g-unit:first-child > A:first-child > IMG {display:none;}");
		/* logo img [insert] */	sIR("BODY > DIV.g-doc:first-child > DIV.g-section > DIV.g-unit:first-child {height:50px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important;}");
		/* logo fix */		sIR("BODY > DIV.g-doc:first-child > DIV.g-section:last-child > DIV.g-unit:first-child {background-image:none !important;}");
		/* header */		sIR(".header .title DIV,.header .title DIV H1 {padding-left:0.2em; background-color:#333; border:0 none; color:#000; "+bS('radiusAll')+":14px;}");
		/* l-menu Hdiv */	sIR("IMG[width='146'][src='http://www.google.com/images/sidedivider.gif'] {visibility:hidden;}");
		/* l-menu rndBx */	sIR("DIV[style='border: 1px solid rgb(204, 204, 204); float: left; width: 140px; margin-right: 10px; margin-bottom: 15px;'] {background-color:#222; border:0 none !important; "+bS('radiusAll')+":14px;}");
		/* content l-brdr */	sIR("BODY > DIV.g-doc:first-child > DIV.g-section:last-child > DIV.g-unit:last-child {border-left:1px dotted #333; padding-left:2em;}");
		/* footer */		if(uHideFooters)sIR("BODY > DIV.footer:last-child {display:none;}");
	}


	// Directory
	else if(iO(lH,"directory.google.")>-1){
		/* applyGlobals */	Ge();

		/* Home logo [hide] */	sIR("BODY > CENTER:first-child > CENTER:first-child > IMG[width='276'] {visibility:hidden;}");
		/* Home logo [insrt] */	sIR("BODY > CENTER:first-child > CENTER:first-child {padding-top:20px; background:transparent url('"+gHpL+"') no-repeat scroll center top !important;}");
		/* logo img [hide] */	sIR("BODY > FORM[name='f'] > TABLE:first-child > TBODY > TR:first-child > TD[valign='top']:first-child > A > IMG {visibility:hidden;}");
		/* logo img [insert] */	sIR("BODY > FORM[name='f'] > TABLE:first-child > TBODY > TR:first-child > TD[valign='top']:first-child {height:50px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important;}");
		/* header */		sIR("BODY > FORM[name='f'] > TABLE[width='100%'][cellpadding='1'] > TBODY > TR > TD[bgcolor='green'] {padding-left:0.5em; background-color:#333; "+bS('radiusAll')+":14px;}");
		/* headerR */		sIR("BODY > FORM[name='f'] > TABLE[width='100%'][cellpadding='0'] > TBODY > TR TD[bgcolor='green']:last-child {background-color:#333; "+bS('border-radius-topright')+":14px; "+bS('border-radius-bottomright')+":14px;}");
		/* headerL */		sIR("BODY > FORM[name='f'] > TABLE[width='100%'][cellpadding='0'] > TBODY > TR TD[bgcolor='green']:first-child {padding-left:0.2em; background-color:#333; "+bS('border-radius-topleft')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* help create tbl */	sIR("TABLE[bgcolor='#336600'][align='center'] {"+bS('radiusAll')+":14px;}");
		/* help create tblL */	sIR("TABLE[bgcolor='#336600'][align='center'] > TBODY > TR > TD > TABLE[width='100%'] > TBODY > TR[bgcolor='#cccccc'] {background-color:#000; "+bS('radiusAll')+":14px;}");
	}


	// other Searches
	else if(iO(lH,".google.")>-1&&(iO(lH,Gtld+"/unclesam")>-1||iO(lH,Gtld+"/linux")>-1||iO(lH,Gtld+"/bsd")>-1||iO(lH,Gtld+"/mac/")>-1||iO(lH,Gtld+"/microsoft.html")>-1)){
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("BODY > TABLE.tb > TBODY > TR > TD.tc > A > IMG,BODY[vlink='#551a8b'] > CENTER:first-child > IMG[width='304'],BODY > FORM[name='gs'] > DIV#logo > H1 > A > IMG[width='143'] {visibility:hidden;}");
		/* Hlogo img [insrt] */	sIR("BODY > TABLE.tb > TBODY > TR > TD.tc,BODY[vlink='#551a8b'] > CENTER:first-child {width:310px; height:130px; background:transparent url('"+gHpL+"') no-repeat scroll top center !important;}");
		/* Mlogo img [insrt] */	sIR("BODY > FORM[name='gs'] > DIV#logo > H1 {height:50px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important;}");
		/* search H-spacing */	sIR("BODY > TABLE.tb > TBODY > TR:first-child > TD[width='100%'] {width:70%;}");
		/* srchM$hack */	sIR("BODY[vlink='#551a8b'] > CENTER:first-child {width:100% !important;}");
		/* srchMac R box */	sIR("BODY > DIV.rightside > DIV.g-button {background-color:#333; border:0 none; "+bS('radiusAll')+":14px;}");
		/* footer */		if(uHideFooters)sIR("BODY > CENTER > DIV[class='t n bt'][style='padding: 2px;'] {display:none;}");
	}


	// Support
	else if(iO(lH,".google.")>-1&&iO(lH,"/support/")>-1){
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("TABLE.header > TBODY > TR > TD.logo > A > IMG.logo,BODY > DIV#wmfroot > DIV.wharootCSS > FORM#whasf > A:first-child > IMG.whaclgoCSS {display:none;}");
		/* logo img [insert] */	sIR("TABLE.header > TBODY > TR > TD.logo,BODY > DIV#wmfroot > DIV.wharootCSS > FORM#whasf {height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important; font-size:0;}");
		/* headers */		sIR("DIV.header_bar,P.survey_invite_blue,DIV.article_content > TABLE[width='100%'][border='0'][bgcolor='#e5ecf9'],DIV.article_content > TABLE[width='100%'][border='0'][bgcolor='#e5ecf9'] > TBODY > TR > TD:first-child,BODY.index_page > DIV.wrapper > TABLE.layout DIV.lightbulb,H3.info,DIV.newbie_promo,#wmfroot H1,P.wsvinviteCSS,.wtrCSS H3,.hcabCSS-head {padding-right:0.3em; padding-left:0.3em; background-color:#333 !important; border:0; color:#fff; "+bS('radiusAll')+":14px;}");
		/* head row */		sIR("TABLE.lctCSS > TBODY > TR:first-child > TH {background-color:#333;}");
		/* head L */		sIR("TABLE.lctCSS > TBODY > TR:first-child > TH:first-child {background-color:#333 !important; border:0; "+bS('border-radius-topleft')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* head R */		sIR("TABLE.lctCSS > TBODY > TR:first-child > TH:last-child {background-color:#333 !important; border:0; "+bS('border-radius-topright')+":14px; "+bS('border-radius-bottomright')+":14px;}");
		/* forums header */	sIR("BODY > DIV#wmfroot > DIV.wharootCSS > FORM#whasf {padding-left:160px;}");
		/* forums alt-rowBg */	sIR(".lchlCSS {background-color:#181818;}");
		/* forums post boxH */	sIR(".wlvbdCSS {max-height:none;}");
		/* forums post tools */	sIR("#wavdet .goog-toolbar {width:80%; background-color:#ccc !important;}");
		/* forums post txtBx */	sIR("BODY#wavde {background-color:#fff !important;}");
		/* newbiePromoFix */	sIR("DIV.newbie_promo {padding-left:70px !important;}");
		/* R modules header */	sIR("TD.right_column > DIV.module > H2 {position:relative; bottom:12px; left:0; background-color:#555; border:0 none !important; color:#fff; "+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}");
		/* R modules */		sIR("TD.right_column > DIV.module {margin-top:36px; background-color:#222; border:0 none !important; "+bS('border-radius-bottomright')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* L menu forum */	sIR(".wmfnCSS {background-color:#000 !important; border-right:1px dotted #333;}");
		/* alert box */		sIR("DIV.new-ui-alert,DIV.inner_content > DIV[style='background-image: url(//adwords.google.com/select/images/bulb.gif);'].p13n_box2 {border:0 none; background:#333 none !important; "+bS('radiusAll')+":14px;}");
		/* headlines */		sIR("H2.wvangCSS {color:#fff;}");
		/* page txt */		sIR("H3,.layout .content,.layout .content .contact_form,#wmfm LI {color:#999 !important;}");
		/* drk txt */		sIR("DIV.inner_content TABLE > TBODY > TR[bgcolor='#c3d9ff'] > TH > FONT {color:#000;}");
		/* hilite txt */	sIR("DIV.inner_content H2,DIV.inner_content H3,DIV.inner_content H4,DIV.inner_content STRONG,FONT[style='font-family: Arial; background-color: rgb(255, 255, 255);'] {color:#fff !important;}");
		/* hilite txtBg */	sIR("FONT[style='font-family: Arial; background-color: rgb(255, 255, 255);'] {background-color:transparent !important;}");
		/* content tables */	sIR("DIV.inner_content > DIV.article_content > TABLE {background-color:#222;}");
		/* dynTbl cntnt */	sIR("DIV.gsg-body {border-color:#333; "+bS('border-radius-topright')+":14px; "+bS('border-radius-bottomright')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* dynTbl l-tab */	sIR("UL.gsg-tabs LI,UL.gsg-tabs LI.guide-print,UL.gsg-tabs {background-color:#000; border:0 none; border-right:1px solid #333;}");
		/* dynTbl l-tabSel */	sIR("UL.gsg-tabs LI.active {background-color:#222; border:0 none; "+bS('border-radius-topleft')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* footer line */	sIR(".wfarootCSS {border-color:#222;}");
		/* footer */		if(uHideFooters)sIR("DIV.footer-nav P.footer-second-row,DIV#wfaroot > P:last-child {display:none !important;}");
	}


	// News
	else if(iO(lH,"news.google.")>-1&&(iO(lH,"/news")>-1||iO(lH,"/image?")>-1||iO(lH,"/advanced_news_search")>-1)){
		/* applyGlobals */	Ge();

		/* header iGoogleLnk */	sIR("BODY > DIV#gbar > NOBR > A.gb1:last-child,BODY.serp > DIV#gbar > NOBR > A.gb1:last-child,BODY.sp > DIV#gbar > NOBR > A.gb1:last-child {top:-1.25em !important;}");
		/* logo img [hide] */	sIR("BODY#advanced-search DIV#logo > A > IMG,BODY > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered > DIV.search > DIV#page-header > TABLE > TBODY > TR:first-child > TD:first-child > A > IMG,BODY > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered > DIV.search > DIV#page-header > DIV.lt > A > IMG[width='170'] {display:none;}");
		/* logo img [insert] */	sIR("BODY#advanced-search DIV#logo,BODY > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered > DIV.search > DIV#page-header > TABLE > TBODY > TR:first-child > TD:first-child,BODY > DIV#main-wrapper > DIV#main > DIV.background > DIV.centered > DIV.search > DIV#page-header > DIV.lt {width:150px !important; height:50px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important; font-size:0;}");
		/* search form cntnr */	sIR("FORM.search-form > DIV.clearhack {display:table-cell; white-space:no-wrap;}");
		/* search form input */	sIR("FORM.search-form > DIV.clearhack > INPUT[name='q'] {width:28em;}");
		/* search suggest bx */	sIR(".ac-renderer,.ac-renderer DIV {background-color:#333 !important; color:#999 !important;}");
		/* search suggest Bt */	sIR(".ac-renderer,.ac-renderer B {color:#fff !important;}");
		/* headers */		sIR("BODY#advanced-search > DIV#_h,DIV.basic-title {padding-left:0.5em; border:0 none !important; background-color:#333 !important; color:#fff !important; "+bS('radiusAll')+":14px;}");
		/* init develop'hdr */	sIR("DIV#headline-gadgets > DIV:first-child > DIV[class='basic-title bt-border'] {visibility:hidden;}");
		/* menu r-line */	sIR("DIV.sidebar,DIV.main > DIV#headline-wrapper,.directory-nav {border-color:#333 !important;}");
		/* menu search title */	sIR(".sidebar .clustersearch-box .clustersearch-label,.directory-filter-label {background-color:#000;}");
		/* r-side spacing */	sIR(".column2 {padding-left:7px;}");
		/* r-side headers */	sIR(".sidepanel-search,.sidepanel-search-header,.sidepanel-header {padding-top:0.2em; padding-bottom:0.2em; background-color:#333 !important; border:0 none; "+bS('radiusAll')+":14px;}");
		/* r-side imgs */	sIR(".s-image-mosaic .image {border:0 none !important;}");
		/* hdn left nav menu */	sIR("DIV.section-menu DIV#hidden-left-nav-menu {background-color:#222; border:0 none; "+bS('radiusAll')+":14px;}");
		/* news story */	sIR(".story {margin-top:10px; border:1px dotted #222 !important; "+bS('radiusAll')+":14px;}");
		/* quote box */		sIR("DIV.qdetails DIV.qsnippet,.quote-story .quotesnippet {padding-right:1.2em !important; padding-left:1.2em !important; text-align:justify; font-weight:bold; "+bS('radiusAll')+":14px;}");
		/* quote txt */		sIR("#search-stories .quote-story .quotesnippet,#search-stories .quote-story .quotesnippet *,DIV[class='search-results section'] .quote-story .quotesnippet,DIV[class='search-results section'] .quote-story .quotesnippet * {color:#000 !important;}");
		/* page txt */		sIR("DIV#main-wrapper DIV,DIV#main-wrapper SPAN {color:#ccc;}");
		/* show more/less */	sIR("DIV.more-link,DIV.fewer-link {background-color:#333; "+bS('radiusAll')+":14px;}");
		/* notify alert */	sIR("DIV#notify-box > SPAN.notify {padding:1px 2px 1px 2px; color:#000; "+bS('radiusAll')+":14px;}");
		/* edit page panel */	sIR("#personalize-open {border:0 none; background-color:#222; "+bS('radiusAll')+":14px;}");
		/* R-side ads */	if(uHideAds)sIR("TABLE.left > TBODY > TR > TD#table-spacer-cell,TABLE.left > TBODY > TR > TD.right-nav {display:none;}");
		/* imagesVer stryBx */	sIR("TABLE#image-tiles .story {border-color:#333; "+bS('radiusAll')+":14px;}");
		/* imagesVer stryBxI */	sIR("#image-tiles .highlight {background-color:#333 !important;}");
		/* imagesVer stryBxS */	sIR(".story .hover .hide-tile-border {background-color:#333;}");
		/* imagesVer stryBxC */	sIR(".ivi-story .count-bar {background-color:transparent; font-weight:bold;}");
		/* imagesVer stryBxD */	sIR(".ivi-story .hover {background-color:#333 !important; border:0 none !important; "+bS('border-radius-topright')+":14px; "+bS('border-radius-bottomright')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* pagination bgs */	sIR("DIV#pagination DIV {background:none;}");
		/* bottom search bg */	sIR("DIV.footer > DIV.bottom-search {border:0 none; background-color:#000;}");
		/* footer */		if(uHideFooters)sIR("BODY#advanced-search > DIV.footer,DIV.footer > DIV.bottom {display:none;}");
	}
	// News: /hostednews/
	else if(iO(lH,".google.")>-1&&iO(lH,"/hostednews/")>-1){
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("FORM.search-form > SPAN.hn-attr > IMG {display:none;}");
		/* logo img [insert] */	sIR("FORM.search-form > SPAN.hn-attr {float:left; position:relative; top:-7px; padding-right:1em; width:150px !important; height:45px !important; background:transparent url('"+gL+"') no-repeat scroll center left !important; font-size:0;}");
		/* search news form */	sIR("FORM.search-form {position:relative; top:7px;}");
		/* footers */		if(uHideFooters)sIR("DIV.g-section > DIV.hn-ads,DIV.g-section > DIV.igoogle-promo,DIV#hn-footer {display:none;}");
	}


	// Images: Advanced Search
	else if(iO(lH,"images.google.")>-1&&iO(lH,"/advanced_image_search")>-1){
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("BODY > FORM > TABLE > TBODY > TR > TD[width='1%'][rowspan='2'] > A#logo > SPAN {display:none;}");
		/* logo img [insert] */	sIR("BODY > FORM > TABLE > TBODY > TR > TD[width='1%'][rowspan='2'] {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important; font-size:0;}");
		/* pre header line */	sIR("BODY > FORM > TABLE[width='99%'] > TBODY > TR > TD[rowspan='2'] > TABLE[width='100%'] > TBODY > TR > TD[bgcolor='#3366cc'] {display:none;}");
		/* header L */		sIR("BODY > FORM > TABLE[width='99%'] > TBODY > TR > TD[rowspan='2'] > TABLE[width='100%'] > TBODY > TR > TD[bgcolor='#d5ddf3']:first-child {background-color:#333; "+bS('border-radius-topleft')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* header R */		sIR("BODY > FORM > TABLE[width='99%'] > TBODY > TR > TD[rowspan='2'] > TABLE[width='100%'] > TBODY > TR > TD[bgcolor='#d5ddf3'][align='right'] {background-color:#333; "+bS('border-radius-topright')+":14px; "+bS('border-radius-bottomright')+":14px;}");
		/* outer tbl */		sIR("BODY > FORM > P > TABLE > TBODY > TR[bgcolor='#bbcced'] {background-color:#000;}");
		/* inner top */		sIR("BODY > FORM > P > TABLE > TBODY > TR[bgcolor='#bbcced'] > TD > TABLE > TBODY > TR {background-color:#000;}");
		/* inner txt */		sIR("BODY > FORM > P > TABLE > TBODY > TR[bgcolor='#bbcced'] > TD > TABLE > TBODY > TR > TD TD {color:#999;}");
		/* footer */		if(uHideFooters)sIR("BODY > FORM > CENTER > FONT[face='arial,sans-serif'] > FONT[size='-1'] {display:none;}");
	}


	// Video: Popup Widgets
	else if(iO(lH,"video.google.")>-1&&(iO(lH,"/reportproblem?")>-1||iO(lH,"/SharePopup?")>-1||iO(lH,"/ContactPicker?")>-1)){
		/* applyGlobals */	Ge();

		/* Report tblBg */	sIR("BODY > TABLE.background,BODY > TABLE.background TABLE.content {background-color:#000;}");
		/* Email tblBg */	sIR("DIV.gwt-DialogBox,DIV.gwt-DialogBox TABLE,DIV.gwt-DialogBox TD,#share-panel {background-color:#000; border:0 none; line-height:1em;}");
		/* ContctPickr tblBg */	sIR(".picker-page .main {background-color:#000;}");
		/* ContctPickr txt */	sIR("#picker-target-title,#picker-target-holder {color:#000;}");
	}


	// Contacts
	else if(iO(lH,".google."+Gtld+"/contacts")>-1){
		/* applyGlobals */	Ge();

		/* head block: node1 */	sIR(".manager-page .stand-alone {background-color:#000; border:0 none;}");
		/* logo img [replce] */	sIR("DIV.cmgr-logo {width:180px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 20px 0 !important; font-size:0;}");
		/* node2 */		sIR(".cmgr-toolbar {background-color:#222;}");
		/* group list t-line */	sIR(".group-list {border:0 none;}");
		/* group list bg */	sIR(".scrollable {background-color:#000;}");
		/* group list hdr-ln */	sIR(".group-list HR.header {background-color:#000;}");
		/* group list selctd */	sIR(".group-list .selected {background-color:#333; border-top:1px solid #555; border-bottom:1px solid #555;}");
		/* group list rowTxt */	sIR(".row {color:#999;}");
		/* contact listActns */	sIR(".cmgr-contacts-list-actions {background-color:#333; border-color:#555; color:#999;}");
		/* contct list R-bar */	sIR(".manager-page .rightsep {border-color:#555;}");
		/* edit top bar */	sIR(".cmgr-editbar {background-color:#333; border-color:#555;}");
		/* contact pane */	sIR(".cmgr-contact-pane {background-color:#000;}");
		/* contact name */	sIR(".cmgr-contact-pane .name {color:#fff;}");
		/* contact heading */	sIR(".cmgr-contact-pane SPAN {color:#ccc !important;}");
		/* contact txt */	sIR(".cmgr-contact-pane DIV {color:#999;}");
		/* disabled btn brdr */	sIR(".manager-page DIV[class='goog-flat-button goog-inline-block goog-flat-button-disabled'], .manager-page DIV[class='goog-menu-button goog-inline-block goog-menu-button-disabled'] {border-color:#555 !important;}");
		/* disabled btn txt */	sIR(".manager-page .goog-flat-button-disabled SPAN, .manager-page .goog-menu-button-disabled SPAN {color:#777;}");
	}

	// Docs
	else if(iO(lH,"//docs.google.")>-1||(iO(lH,".google.")>-1&&iO(lH,"/google-d-s/")>-1)){
		/* applyGlobals */	Ge();

		/* txt fix-override */	sIR("HTML,BODY {color:inherit !important;}");

		/* doc logo [hide] */	sIR("BODY#editPage > TABLE#encloser > TBODY > TR#navigation > TD > TABLE[width='100%'] > TBODY > TR[style='height: 40px;'] > TD[style='padding-left: 2px;'] > A[href='./'] > IMG[height='30'] {display:none;}");
		/* logo [insert] */	sIR("BODY#editPage > TABLE#encloser > TBODY > TR#navigation > TD > TABLE[width='100%'] > TBODY > TR[style='height: 40px;'] > TD[style='padding-left: 2px;'],BODY > TABLE > TBODY > TR:first-child > TD#logo {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 0% !important; font-size:0;}");
		/* doc body */		sIR("BODY#wys_frame {background-color:#fff !important;}");

		/* featS logo [hide] */	sIR("BODY > TABLE > TBODY > TR:first-child > TD#logo > A > IMG[height='40'] {visibility:hidden;}");
		/* featureSite hdngs */	sIR("BODY > TABLE > TBODY > TR > TD#content H2 {color:#fff;}");
		/* featureSite txt */	sIR("BODY > TABLE > TBODY > TR > TD#content {color:#999;}");
		/* featureSite b-txt */	sIR("BODY > TABLE > TBODY > TR > TD#content STRONG {color:#ccc;}");
		/* featureSite footr */	if(uHideFooters)sIR("BODY > TABLE > TBODY > TR > TD#content > DIV#footer {display:none;}");

		/* external excluder */	sIR("BODY > DIV#doc-contents {background-color:#fff;}");

		/* iG gdocs module */	sIR("BODY#gd-body > DIV#gd-content > DIV#gd-results,BODY#gd-body > DIV#gd-content > DIV#gd-noresults {margin:0.5em; padding:0.5em; background-color:#777; "+bS('radiusAll')+":14px;}");
	}


	// Checkout
	else if(iO(lH,"checkout.google.")>-1){
		/* applyGlobals */	Ge();

	 if(iO(lH,Gtld+"/sell/")>-1|iO(lH,Gtld+"/sell2/")>-1){ //Merchant Tools
		/* logo img [hide] */	sIR("BODY > TABLE[width='100%'] > TBODY > TR[valign='middle']:first-child > TD[width='60'][rowspan='2']:first-child > A > IMG {visibility:hidden;}");
		/* logo img [insert] */	sIR("BODY > TABLE[width='100%'] > TBODY > TR[valign='middle']:first-child > TD[width='60'][rowspan='2']:first-child {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important; font-size:0;}");
		/* tabBg */		sIR("TABLE#mainTabs DIV,.subtabs,.subtabs TD,.subtab1,.subtab2,TD[style='padding: 0px; background-color: rgb(233, 241, 255);'],TD[style='background-color: rgb(233, 241, 255);'],DIV[style='padding: 0px; background-color: rgb(233, 241, 255);'],TR.lineheader TD,DIV[style='background-color: rgb(222, 232, 250);'].submitrow {background:#000 none !important; border:0 none !important;}");
		/* tbl col-brdr */	sIR("TD.columnBorder {background-image:none !important; border-left:1px dotted #333 !important;}");
		/* compare tbl bg */	sIR("#compare {background-color:#333; border:0 none; "+bS('radiusAll')+":14px;}");
		/* compare tbl hdrs */	sIR("#compare .compare-top-header,#compare .section-header,#compare .section-header TD,.compare-top-header {background-color:#222 !important; border:0 none; "+bS('radiusAll')+":14px;}");
		/* tblBgs */		sIR(".announce,.submitcell,.buttonbarcolor,TR.lineitemhover TD,.tablebox,.shipping_tablebox,BODY > TABLE[bgcolor='#e9eef9'],.buttonbarResults,.tfootResult,.theadResult {background-color:#000; border:0 none !important; "+bS('radiusAll')+":14px;}");
		/* tblCrnrs */		sIR(".submitcell IMG[height='4'],#BB_Form TABLE[style='width: 100%;'] IMG[height='4'] {display:none;}");
		/* tbl hd/ft */		sIR("TR.shipping_lineheader TD,.tfoot,.thead {background-color:#181818; border:0 none;}");
		/* footer */		if(uHideFooters)sIR("BODY > CENTER.footer > DIV[style='border-top: 1px solid rgb(51, 102, 204); padding: 2px;'] > FONT[size='-2']:last-child {display:none;}");
	 }
	 else{ //All other normal [non-seller] pages
		/* logo img [hide] */	sIR("BODY > DIV#header > TABLE#head > TBODY > TR > TD > DIV.header-wrapper > DIV#logo > DIV.wrapper > A > IMG,BODY > TABLE[width='100%'] > TBODY > TR > TD#logoCell > IMG,BODY > TABLE[style='padding-top: 10px;']:first-child > TBODY > TR:first-child > TD:first-child > A[href='../'] > IMG,BODY > DIV.g-doc > DIV.header > A > IMG,BODY > TABLE[width='100%'] > TBODY > TR > TD[colspan='3'] > TABLE[width='100%'] > TBODY > TR > TD[width='1%'] > A > IMG,BODY > TABLE[width='100%'] > TBODY > TR[valign='middle'] > TD[width='60'][rowspan='2'] > A > IMG {visibility:hidden;}");
		/* logo img [insert] */	sIR("BODY > DIV#header > TABLE#head > TBODY > TR > TD > DIV.header-wrapper > DIV#logo > DIV.wrapper,BODY > TABLE[width='100%'] > TBODY > TR > TD#logoCell,BODY > TABLE[style='padding-top: 10px;']:first-child > TBODY > TR:first-child > TD:first-child,BODY > DIV.g-doc > DIV.header,BODY > TABLE[width='100%'] > TBODY > TR > TD[colspan='3'] > TABLE[width='100%'] > TBODY > TR > TD[width='1%'],BODY > TABLE[width='100%'] > TBODY > TR[valign='middle'] > TD[width='60'][rowspan='2'] {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important; font-size:0;}");
		/* transTbl */		sIR("TABLE.transactionList {"+bS('radiusAll')+":14px;}");
		/* transTblBg */	sIR("TABLE.transactionList,TD.transactionList {background-color:#222;}");
		/* transTblCrnrs */	sIR("TD.transactionList > IMG[width='4'] {display:none;}");
		/* transTblBody */	sIR("TABLE.transactionList TABLE.sc {background-color:#151515 !important;}");
		/* transTbl 1st/last */	sIR("TD.transactionList:first-child,TD.transactionList:last-child {display:none;}");
		/* receipt tblBgs */	sIR("BODY > TABLE[width='770'] > TBODY > TR > TD > TABLE[width='100%']:first-child > TBODY > TR:first-child > TD[width='100%']:first-child > TABLE[width='100%']:first-child,BODY > TABLE[width='770'] > TBODY > TR > TD > TABLE[width='100%'],BODY > TABLE[width='770'] > TBODY > TR > TD > TABLE[width='100%']:last-child {margin-top:5px; background-color:#333 !important; "+bS('radiusAll')+":14px;}");
		/* receipt tblSub */	sIR(".brandingBackground,.brandingTableWeb {background-color:transparent !important;}");
		/* receipt tblSubCrn */	sIR(".brandingBackground > TR:first-child IMG,.brandingBackground > TR:last-child IMG {display:none;}");
		/* receipt tblSubCi */	sIR("TBODY.brandingBackground  TABLE.brandingBackground {background-color:transparent !important;}");
		/* review hdrBg */	sIR("BODY > TABLE > TBODY > TR > TD[bgcolor='#e5ecf9'],DIV.tablebox > TABLE[bgcolor='#e5ecf9'],DIV.tablebox > TABLE[bgcolor='#e5ecf9'] TD[bgcolor='#e5ecf9'] {background-color:#000;}");
		/* review hdrCrnrs */	sIR("BODY > TABLE > TBODY > TR > TD.nopadaligntop > IMG[width='4'] {display:none;}");
		/* review tblBg */	sIR(".subtabs,TABLE#mainTabs TD.activeTab,TABLE#mainTabs DIV.active1,TABLE#mainTabs DIV.active2,TABLE#mainTabs DIV.active3,TABLE#mainTabs DIV.activeTabText,TABLE#mainTabs DIV.inactive1,TABLE#mainTabs DIV.inactive2,TABLE#mainTabs DIV.inactive3,TABLE#mainTabs DIV.inactiveTabText,TABLE.subtabs TD,.subtab1,.subtab2 {background:#000 none !important; border:0 none !important;}");
		/* review tblHdr */	sIR(".buttonbarcolor,.tablebox {background-color:#222; border:0 none;}");
		/* editBox brdr */	sIR("DIV[style='border: 1px solid rgb(195, 217, 255); padding: 3px; margin-top: 6px;'] {border:0 none !important;}");
		/* editBox cntnr */	sIR("DIV[style='border: 1px solid rgb(195, 217, 255); padding: 3px; margin-top: 6px;'] > DIV[style='padding: 6px; background-color: rgb(232, 238, 250);'] {background-color:#333 !important; border:0 none !important; "+bS('radiusAll')+":14px;}");
		/* seller pgBg */	sIR(".promo-box,#infotable TH,.bluecontain,.blue-border .brandingBackground,.blue-border .brandingBackground TD[bgcolor='#e8eefa'],BODY.brandingBackground {background-color:#000 !important; border:0 none !important;}");
		/* seller abtTblCntn */	sIR("#tab_contents_container {border-color:#333; border-left:1px solid #333; "+bS('border-radius-topright')+":14px; "+bS('border-radius-bottomright')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* seller abtTblLmB */	sIR("#empty_tab,.blue-border,.signupBottom {border:0 none !important;}");
		/* seller abtTblLmI */	sIR("TABLE#infotable > TBODY > TR > TD,.brandingBackground,.brandingBackground #yesFormNoAds,.signupBottom {background:#000 none !important;}");
		/* seller abtTblLmib */	sIR("#infotable TD.menu {border:0 none;}");
		/* seller abtTblLmS */	sIR("TABLE#infotable TD.active {background:#333 none !important; "+bS('border-radius-topleft')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* seller r-box */	sIR("#DownloadButton,.bluecontain TD,TABLE.bluecontain:last-child > TBODY > TR > TD {background-color:#333; "+bS('radiusAll')+":14px;}");
		/* seller col-brdr */	sIR("TD.columnBorder {background-image:none !important; border-left:1px dotted #333;}");
		/* seller inner Dtxt */	sIR(".blue-border {color:#333 !important;}");
		/* seller headers */	sIR("TABLE.edit_section TD.header {background-color:#333 !important; border:0 none !important; "+bS('radiusAll')+":14px;}");
		/* info window */	sIR("#google-infowindow DIV {color:#000;}");
		/* footer */		if(uHideFooters)sIR("BODY > TABLE > TBODY > TR > TD.footer,DIV[style='border-top: 1px solid rgb(51, 102, 204); margin: 2ex; padding: 2ex;'] {display:none;}");
	 }
	}
	else if(iO(lH,".google."+Gtld+"/checkout/")>-1){
		/* applyGlobals */	Ge();

		/* logo img [remove] */	sIR("BODY > DIV.g-doc:first-child > DIV.header > A > IMG {visibility:hidden;}");
		/* logo img [insert] */	sIR("BODY > DIV.g-doc:first-child > DIV.header,BODY > TABLE.tb > TBODY > TR > TD.tc > A#logo > SPAN {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important;}");
		/* logo txt fix */	sIR("BODY > TABLE.tb > TBODY > TR > TD.tc > A#logo {font-size:0;}");
		/* nav */		sIR("DIV.nav LI.selected > A {color:#fff !important;}");
		/* gadgetFeat cntnr */	sIR(".cb-gadget-featured {background-color:#000;}");
		/* header */		sIR("BODY > TABLE.t {background-color:#333 !important; border:0 none !important; "+bS('radiusAll')+":14px;}");
		/* page txt */		sIR("BODY > TABLE TD {color:#999;}");
		/* footer */		if(uHideFooters)sIR("BODY > DIV.g-doc > P.footer:last-child,BODY > CENTER > DIV[class='t n bt'] {display:none;}");
	}


	// Product Search / Shopping sub-pages
	else if(iO(lH,".google."+Gtld+"/products/")>-1){
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("BODY > TABLE[width='100%']:first-child > TBODY > TR:first-child > TD[width='1%']:first-child > A[href='/products'] > IMG {visibility:hidden;}");
		/* logo img [insert] */	sIR("BODY > TABLE[width='100%']:first-child > TBODY > TR:first-child > TD[width='1%']:first-child {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important; font-size:0;}");
		/* headers */		sIR("H1,.productsubheader {padding-left:0.5em; background-color:#333; border:0 none; color:#fff; "+bS('radiusAll')+":14px;}");
		/* header txt */	sIR(".productsubheader B,.productsubheader A {color:#fff !important;}");
		/* footer */		if(uHideFooters)sIR("BODY > TABLE[width='98%']:last-child > TBODY > TR:last-child > TD[width='1%'][valign='top']:first-child,BODY > TABLE[width='98%']:last-child > TBODY > TR:last-child > TD[valign='bottom']:last-child {display:none;}");
	}


	// Picasa Web Albums
	else if(iO(lH,"picasaweb.google.")>-1){
		/* notify box */	sIR(".lhcl_alertMessage {"+bS('border-radius-bottomright')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* img exif data */	sIR(".gphoto-exifbox-exif-field EM, .gphoto-sidebar-photoinfo EM {color:#ccc !important;}");
		/* modal boxes */	sIR("BODY > .lhcl_dialog {background-color:#555; border:0 none; "+bS('radiusAll')+":14px;}");
		/* modal content */	sIR("BODY > .lhcl_dialog .lhcl_dialog_body,DIV.mediaPicker DIV.mp_contents,.image-pick-only .mp_scroller {background-color:#000; border:0 none; color:#fff;}");
		/* modal albmCover B */	sIR(".image-pick-only .mp_border {margin:-1px 0 0 -1px;}");
		/* modal albmCover */	sIR("DIV.mediaPicker DIV.mp_pictures IMG, DIV.mediaPicker DIV.mp_pictures_theme_2 IMG {border-color:#000;}");
		/* modal uploadBrder */	sIR(".lhcl_dialog .lhcl_albumlist {overflow-x:hidden; border:0 none;}");
		/* modal uploadAlSel */	sIR(".lhcl_albumlist .lhcl_selected {background-color:#333;}");
		/* editForm bxCntnr */	sIR("#lhid_emailform,#selectphotos {background-color:#000;}");
		/* editForm bxT */	sIR("#lhid_emailform > DIV.gphotos-modal-buttons:first-child,FORM#selectphotos > DIV.gphotos-modal-buttons,.lhcl_content > TABLE[width='100%'] > TBODY > TR > TD > DIV.gphotos-modal-buttons {background-color:#222; "+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}");
		/* editForm bxBody */	sIR("#lhid_emailform > TABLE.gphoto-email-form,.lhcl_googlephotos_body #lhid_edit_frame,#lhid_batchcaptionbox,.lhcl_content > TABLE[width='100%'] > TBODY > TR > TD > DIV#lhid_edit_frame > DIV.lhcl_lighttable {background-color:#151515; border:0 none;}");
		/* editForm bxBodyB */	sIR("#lhid_ShareGroups {background-color:#222; border:0 none; "+bS('radiusAll')+":14px;}");
		/* editForm bxB */	sIR("#lhid_emailform > DIV.gphotos-modal-buttons:last-child,FORM#selectphotos > DIV.gphotos-modal-buttons:last-child {background-color:#222; "+bS('border-radius-topright')+":0; "+bS('border-radius-topleft')+":0; "+bS('border-radius-bottomright')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* upload bg */		sIR("#lhid_uploaderbox,#lhid_uploaderbox .gphotos-modal-buttons:last-child {background-color:#000;}");
		/* upload bx hdr */	sIR("#lhid_uploaderbox .gphotos-modal-buttons:first-child {background-color:#333; "+bS('radiusAll')+":14px;}");
		/* upload sideBx */	sIR(".lhcl_infobox {background-color:#222; border:0 none; "+bS('radiusAll')+":14px;}");
		/* upload sideBxTxt */	sIR(".lhcl_infobox DIV.lhcl_heading,.lhcl_infobox SPAN {color:#aaa !important;}");
		/* cart body */		sIR("BODY > DIV.lhcl_body > DIV.lhcl_cartbody {background-color:#000; color:#999;}");
		/* cart highlight */	sIR(".gphoto-context-current,#lhid_viewcartphotocount {color:#fff;}");
		/* sharing headings */	sIR("#lhid_emptyhome H2 {color:#fff;}");
		/* fav's ttl */		sIR(".gphoto-context-people-favorites-toggle SPAN > B {color:#fff;}");
		/* fav's noFavBx */	sIR("#lhid_nofavorites {background-color:#000 !important;}");
		/* ads */		if(uHideAds)sIR("#lhid_search_ad_unit {display:none;}");
	}
	// Picasa supportingPgs
	else if(iO(lH,"picasa.google.")>-1){
		/* applyGlobals */	Ge();

		/* promo top bar */	sIR("BODY > TABLE[width='100%'] > TBODY > TR > TD[bgcolor='#e6f0ff'][align='center'] {background-color:#333; "+bS('radiusAll')+":14px;}");
		/* r-side box */	sIR("#download TD[bgcolor='#cadef4'][style='border: 1px solid rgb(166, 191, 201);'] {background-color:#333 !important; border:0 none !important; "+bS('radiusAll')+":14px;}");
		/* footer */		if(uHideFooters)sIR("BODY > TABLE > TBODY > TR > TD#content > TABLE > TBODY > TR > TD > DIV#footer {display:none;}");
	}


	// Finance
	else if(iO(lH,".google."+Gtld+"/finance")>-1){
		/* logo img [hide] */	sIR("BODY DIV.g-doc DIV.g-section > DIV.g-unit > DIV.sfe-logo > A > IMG {display:none;}");
		/* search suggest bg */	sIR("#ac-list {background-color:#333;}");
		/* left nav */		sIR("DIV#left-nav {border-right:2px solid #333;}");
		/* left nav item */	sIR("DIV#left-nav .nav-item,DIV#left-nav .navsub {background-color:#000;}");
		/* left nav itemSub */	sIR("DIV#left-nav .navsub {padding-left:2em;}");
		/* left nav itemSel */	sIR("DIV#left-nav .nav-selected {background-color:#333;}");
		/* left nav boxes */	sIR("DIV#left-nav #rq-box,DIV#left-nav .ra-box {background-color:#181818;}");
		/* left nav Lrounded */	sIR("DIV#left-nav .nav-selected,DIV#left-nav #rq-box,DIV#left-nav .ra-box {"+bS('border-radius-topleft')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* R-contnent txt */	sIR("#rt-content {color:#999;}");
		/* headers */		sIR(".hdg,DIV[class='hdg top'] {background-color:#333 !important; border:0 none; "+bS('radiusAll')+":14px;}");
		/* headerTabSelcted */	sIR(".goog-tab-selected A.t {background-color:#333 !important; border:0 none !important; color:#aaa !important;}");
		/* headerTabSelctedB */	sIR(".goog-tab-selected A.t B {background-color:transparent !important; border:0 none !important;}");
		/* headerTabs */	sIR(".goog-tab {height:1.5em; background-color:#222; border:0 none;}");
		/* ads */		if(uHideAds)sIR("DIV#ad-label,DIV#ad-target,DIV#ad {display:none;}");
		/* tbl Hdr/Ftr */	sIR(".gf-table TH,.gf-table-control, .gf-table-control-lite,.add_portfolio_select_border,#searchresults .tptr,#company_results .tptr {background-color:#181818; color:#fff;}");
		/* tbl highlight */	sIR(".hilite,.hilite TD {background:#333 none !important;}");
		/* tbl cell */		sIR(".prb {color:#999 !important;}");
		/* add stock bg */	sIR(".add_trans_bar_border {background-color:#000;}");
		/* criteriaWiz cntnr */	sIR(".criteria_wizard {background-color:#222 !important; border:0 none; "+bS('radiusAll')+":14px;}");
		/* criteriaWiz selTb */	sIR(".searchtabs TD.active,.selected_tab,.selected_tab .criteriadiv {background-color:#000; border:0 none;}");
		/* criteriaWiz selTH */	sIR(".selected_tab .criteriadiv {line-height:1.3em;}");
		/* criteriaWiz insTb */	sIR(".searchtabs TD.inactive {background-color:#222; border:0 none;}");
	}


	// Spreadsheets
	else if(iO(lH,"spreadsheets.google.")>-1){
		/* applyGlobals */	Ge();

		/* body bg */		sIR("BODY > DIV.ss-form-container {background-color:#222; "+bS('radiusAll')+":14px;}");
	}


	// Notebook
	else if(iO(lH,".google.")>-1&&(iO(lH,"/notebook/")>-1||iO(lH,"/googlenotebook/")>-1)){
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("BODY.e > DIV.h TABLE#gn_ph > TBODY > TR:first-child > TD[align='right']:first-child > A > IMG {visibility:hidden;}");
		/* logo img [insert] */	sIR("BODY.e > DIV.h TABLE#gn_ph > TBODY > TR:first-child > TD[align='right']:first-child {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 20px 0 !important; font-size:0;}");
		/* left menu border */	sIR("BODY.e > DIV.h > TABLE.p > TBODY > TR[valign='top'] > TD[align='left'] > DIV.jc > DIV > DIV.wb   {"+bS('radiusAll')+":14px;}");
		/* left menu header */	sIR("BODY.e > DIV.h > TABLE.p > TBODY > TR[valign='top'] > TD[align='left'] > DIV.jc DIV.vb   {"+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}");
		/* left menu l-block */	sIR("BODY.e > DIV.h > TABLE.p > TBODY > TR[valign='top'] > TD[align='left'] > DIV.jc TABLE.vb,BODY.e > DIV.h > TABLE.p > TBODY > TR > TD > DIV.jc > DIV.rc > DIV TABLE.rb{display:none;}");
		/* leftmenu C-footer */	if(uHideFooters)sIR("BODY.e > DIV.h > TABLE.p > TBODY > TR[valign='top'] > TD[align='left'] > DIV.jc > DIV.bf {display:none;}");
		/* labelsblockheader */	sIR("BODY.e > DIV.h > TABLE.p > TBODY > TR > TD > DIV.jc > DIV.rc > DIV[class='sc rb'] {"+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}");
		/* labels lowerblock */	sIR("BODY.e > DIV.h > TABLE.p > TBODY > TR > TD > DIV.jc > DIV.rc > DIV[class='wc sb'] {border-bottom:2px solid #b5edbc; "+bS('border-radius-bottomright')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* tip bar */		sIR("BODY.e TD.cb > SPAN.eb {"+bS('radiusAll')+":14px;}");
		/* page txt */		sIR("BODY.e > DIV.h > TABLE.p > TBODY > TR > TD > DIV > DIV.m > DIV.oa > DIV.zg > DIV.dh > DIV.hh > DIV:first-child {color:#000;}");
		/* faq logo img */	sIR("BODY[bgcolor='#ffffff'] > TABLE[cellpadding='5'][align='center'] > TBODY > TR[valign='middle'] > TD[width='1%'] > A[href='http://www.google.com/notebook'] > IMG {display:none;}");
		/* faq title block */	sIR("BODY[bgcolor='#ffffff'] > TABLE[cellpadding='5'][align='center'] > TBODY > TR[valign='middle'] > TD > TABLE[width='100%'][bgcolor='#c3d9ff'][align='center'][style='margin-bottom: 5px;'] TBODY TR TD {background-color:#000;}");
		/* faqtitle bcorners */	sIR("BODY[bgcolor='#ffffff'] > TABLE[cellpadding='5'][align='center'] > TBODY > TR[valign='middle'] > TD > TABLE[width='100%'][bgcolor='#c3d9ff'][align='center'][style='margin-bottom: 5px;'] TBODY TR TD IMG {display:none;}");
		/* faq list txt */	sIR("OL.answers LI UL.response LI,OL.response LI {color:#999 !important;}");

		/* logo img [hide] */	sIR("BODY > TABLE[width='100%']:first-child > TBODY > TR[valign='middle']:first-child > TD[width='1%']:first-child > A > IMG {display:none;}");
		/* logo img [insert] */	sIR("BODY > TABLE[width='100%']:first-child > TBODY > TR[valign='middle']:first-child > TD[width='1%']:first-child {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll top left !important; font-size:0;}");
		/* header bg */		sIR("BODY > TABLE[width='100%']:first-child > TBODY > TR[valign='middle']:first-child > TD > TABLE[width='100%'][bgcolor='#c3d9ff'] TD.bubble {background-color:#000;}");
		/* header corner */	sIR("BODY > TABLE[width='100%']:first-child > TBODY > TR[valign='middle']:first-child > TD > TABLE[width='100%'][bgcolor='#c3d9ff']  TD.bubble IMG {display:none;}");
		/* menu R-border */	sIR("BODY > TABLE[width='100%'] > TBODY > TR > TD[width='1'][background='http://www.google.com/images/dot2.gif'] {border-left:1px solid #333; background-image:none;}");
		/* footer */		if(uHideFooters)sIR("BODY > TABLE[width='99%'][bgcolor='#c3d9ff'][style='margin-bottom: 5px;'] {display:none;}");
	}


	// Translate
	else if(iO(lH,"//translate.google.")>-1){
	 if(iO(lH,"/translate_n?")>-1){ //Top Frame
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("BODY > DIV[style='padding: 8px; white-space: nowrap;'] > DIV[style='float: left; font-size: 12px;'] > A > IMG,BODY > DIV[style='padding: 6px 8px; white-space: nowrap;'] > DIV[style='float: left;'] > A > IMG {display:none;}");
		/* logo img [insert] */	sIR("BODY > DIV[style='padding: 8px; white-space: nowrap;'],BODY > DIV[style='padding: 6px 8px; white-space: nowrap;'] {padding-left:160px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll top left !important; font-size:0;}");
		/* view options */	sIR("BODY > DIV[style='padding: 1px 8px; float: right; clear: right; font-size: 12px;'] {position:absolute; top:2em; right:2em;}");
	 }
	 if(iO(lH,"/toolkit/")>-1){ //T.Toolkit
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("BODY > DIV#logo > A > DIV.gtc-logo {background-image:none;}");
		/* logo img [insert] */	sIR("BODY > DIV#logo {height:55px !important; background:transparent url('"+gL+"') no-repeat scroll top left !important;}");
		/* control bg */	sIR("BODY > DIV#main > DIV.gtc-doclist-view > DIV.gtc-doclist-toolbar,BODY > DIV#main > DIV.gtc-doclist-view > DIV.gtc-doclist-selectbar {background-color:#333;}");
		/* control L-line */	sIR("BODY > DIV#main > DIV.gtc-doclist-view {border-color:#333;}");
		/* tbl-hdr */		sIR(".gtc-doclist-listview .gtc-list-header TR {background-color:#222;}");
		/* tbl-hdr */		sIR(".gtc-doclist-listview .gtc-list-body TR:hover  {background-color:#555;}");
		/* tbl-rowUL */		sIR(".gtc-doclist-listview .gtc-list-header TR > TD,.gtc-doclist-listview .gtc-list-body TR > TD,.gtc-doclist-listview .gtc-list-body TR > TD SPAN {border-color:#222; color:#999;}");
		/* menuRow selected */	sIR("DIV[class='goog-tree-row selected'] {background-color:#555;}");
		/* menuRow nohoverBg */	sIR(".gtc-tree-row-nohover {background-color:#333;}");
		/* menuRow txt */	sIR(".goog-tree-row SPAN {color:#ccc;}");
		/* menu chat */		sIR(".gtc-chat-header, .gtc-chat-border {background-color:#222; border:0 none;}");
		/* headers */		sIR(".gtc-upload-tab-bar {background-color:#333 !important; border:0 none; "+bS('radiusAll')+":14px;}");
		/* header itmSelctd */	sIR(".goog-tab-bar-top .goog-tab-selected {background-color:transparent !important; color:#fff; border:0 none;}");
		/* upLd help box */	sIR(".gtc-upload-help {background-color:#333; "+bS('radiusAll')+":14px;}");
		/* Edit Doc Mode */
			/* doc name */	sIR(".gtc-docname {color:#fff;}");
			/* hdr bar */	sIR(".gtc-top-bar {background-color:#222; border-color:#222;}");
			/* control */	sIR(".gtc-translation-outer,.gtc-document-header,.goog-splitpane-handle,.gtc-bottom-bar,.goog-tabpane {background-color:#333; border-color:#333;}");
			/* mod body */	sIR(".shd-tab-content {background-color:#222; border:0 none;}");
			/* transCO */	sIR(".gtc-trans-inline-cont {background-color:#222 !important; border:0 none; "+bS('radiusAll')+":14px;}");
			/* transCI */	sIR(".gtc-trans-inline-cont DIV {margin:2px; background-color:transparent !important;}");
			/* transCIi */	sIR(".gtc-trans-inline-text {width:97%; margin:0.5em;}");
			/* tk TabBar */	sIR(".goog-tabpane-tabs {border-bottom:0 none;}");
			/* tk Tabs */	sIR(".goog-tabpane-top .goog-tabpane-tab,.goog-tabpane-top .goog-tabpane-tab-selected {background-color:transparent; "+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}");
			/* tk TabSel */	sIR(".goog-tabpane-top .goog-tabpane-tab-selected {background-color:#000 !important; color:#fff;}");
			/* tk lower */	sIR(".goog-tabpane-cont {background-color:#000; border:0 none;}");
			/* tk l-box */	sIR(".gtc-tm-suggestion-translation-holder {width:97%; margin:1em; "+bS('radiusAll')+":14px;}");
		/* footer */		if(uHideFooters)sIR("BODY > TABLE > TBODY > TR > TD#content > DIV#footer:last-child {display:none;}");
	 }
	 else{ //other T.pages
		/* logo img [hide] */	sIR("BODY > DIV#whole > DIV[style='margin: 10px 0pt 5px;'] > A > IMG[height='40'],BODY > DIV[style='margin: 10px 0pt 5px;'] > A > IMG[height='40'] {display:none;}");
		/* layout btns */	sIR("BODY > DIV#whole > DIV[style='margin: 10px 0pt 5px;'] > A#layout_switch,BODY > DIV#whole > DIV[style='margin: 10px 0pt 5px;'] > IMG.buttons {position:relative; left:36px;}");
		/* middleBody L-brdr */	sIR("BODY > DIV#content {border-color:#333;}");
		/* headers */		sIR("BODY > DIV#whole H1,BODY > DIV#whole H2,BODY > DIV#content H1,BODY[marginheight='3'][topmargin='3'] > H1,BODY > DIV#whole DIV#middle_body DIV#autotrans,BODY > DIV#whole DIV#middle_body DIV#dict > P#dict_head {background-color:#333 !important; color:#fff; padding-left:0.7em; "+bS('radiusAll')+":14px;}");
		/* suggest txt */	sIR("#whole #suggesttable #thanks * {background-color:#000 !important; color:#fff !important;}");
		/* tools pg txt */	sIR("BODY[style='font-family: arial; font-size: 10pt; position: relative; top: 0px;'] > H2[style='border-bottom: 1px solid rgb(102, 136, 204); padding-bottom: 5px;'],BODY[style='font-family: arial; font-size: 10pt; position: relative; top: 0px;'] > TABLE TD P,BODY[style='font-family: arial; font-size: 10pt; position: relative; top: 0px;'] > TABLE TD H3 {color:#ccc !important;}");
		/* boxes */		sIR("BODY > DIV#whole > DIV#main >  DIV#alang,BODY[marginheight='3'][topmargin='3'] > DIV.section > TABLE > TBODY > TR > TD.main,BODY[marginheight='3'][topmargin='3'] > DIV.section > DIV#toolbar_float,BODY > DIV#content > DIV.section > TABLE > TBODY > TR > TD.main {padding-top:0.7em; padding-bottom:0.5em; background-color:#191919; border:0 none; color:#ccc !important;padding-left:1em; "+bS('radiusAll')+":14px;}");
		/* footer */		if(uHideFooters)sIR("BODY > DIV#whole > DIV#foot,BODY > DIV#whole > DIV.footer,BODY DIV.tab_footer,BODY > DIV.tab_footer {display:none;}");
	 }
	}


	// Profiles
	else if(iO(lH,".google."+Gtld+"/profiles")>-1){
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("BODY > DIV.g-doc-800 > DIV.g-tpl-160 > DIV.g-first > A > IMG.logo,BODY > DIV > DIV.ll_editor_heading > IMG.logo {display:none;}");
		/* logo img [insert] */	sIR("BODY > DIV.g-doc-800 > DIV.g-tpl-160 > DIV.g-first,BODY > DIV > DIV.ll_editor_heading {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important; font-size:0;}");
		/* header txt */	sIR("BODY > DIV.g-doc-800 H1 {color:#fff;}");
		/* tabs box */		sIR(".tabs,.tabs .background,TABLE.gwt-TabBar {background-color:#333; border:0 none; "+bS('radiusAll')+":14px;}");
		/* tab selected */	sIR(".tabs .slctd,.gwt-TabBarItem-wrapper .gwt-TabBarItem-selected {background-color:transparent; border:0 none;}");
		/* headers */		sIR(".profile-editor .profile_section_header {padding-left:0.5em; background-color:#333; border:0 none; "+bS('radiusAll')+":14px;}");
		/* lower box bg */	sIR(".usernames-ui {background-color:#000;}");
		/* create button bg */	sIR("BODY > DIV.g-doc-800 > DIV.g-section > DIV.layout > DIV#buttonBlock > DIV.g-button {border:0 none; background-color:#000;}");
		/* footer */		if(uHideFooters)sIR("BODY > DIV.g-doc-800 DIV.footer,BODY > DIV > DIV.ll_footer {display:none;}");
	}


	// Reader
	else if(iO(lH,".google."+Gtld+"/reader/")>-1){
		/* applyGlobals */	Ge();

		/* top linx */		sIR("DIV#gbar > NOBR {top:-2px;}");
		/* logo img [replce] */	sIR("A#logo-container > H1#logo {z-index:1000; width:145px !important; height:50px !important; background:transparent url('"+gL+"') no-repeat scroll 0 -10px !important; font-size:0;}");
		/* addSub btn */	sIR("DIV#lhn-add-subscription {position:relative; top:15px; left:0;}");
		/* addSub box */	sIR("DIV#quick-add-bubble-holder {background-color:#000; border:1px solid #777; color:#ccc !important; "+bS('border-radius-topright')+":8px; "+bS('border-radius-bottomright')+":8px; "+bS('border-radius-bottomleft')+":8px;}");
		/* border */		sIR("DIV#chrome {border:0 none;}");
		/* hdr */		sIR("DIV#chrome-header {background-color:#555; border:0; color:#fff !important; "+bS('border-radius-topleft')+":14px;}");
		/* hdr v-Linx */	sIR("DIV#chrome-header > SPAN#chrome-view-links {background-color:#555;}");
		/* menu txt */		sIR(".lhn-section a,.lhn-section a .text,.lhn-section .link,UL#your-items-tree LI,SPAN.name > SPAN,UL#friends-tree *,UL#sub-tree LI {color:#888 !important;}");
		/* menu sel/h */	sIR(".scroll-tree LI A:hover,.scroll-tree LI .tree-link-selected,.scroll-tree LI .tree-link-selected SPAN,.scroll-tree LI .tree-link-selected:hover,#lhn-selectors .selector:hover,#lhn-selectors .selected,#lhn-selectors .selected SPAN,#lhn-selectors .selected:hover {background-color:#555; color:#fff !important;}");
		/* menu spcng */	sIR("DIV#lhn-selectors,DIV#your-items-tree-container,DIV.lhn-section,DIV.friends-tree-notification-info {margin-top:1.5em;}");
		/* light grey */	sIR("TABLE#chrome-viewer-container > TBODY > TR > TD#chrome-lhn-toggle,TABLE#chrome-viewer-container > TBODY > TR > TD#chrome-viewer,DIV.setting-body,#settings #settings-navigation .selected {background-color:#555 !important;}");
		/* dark grey */		sIR("TABLE#chrome-viewer-container > TBODY > TR > TD#chrome-viewer > DIV#viewer-header,TABLE#chrome-viewer-container > TBODY > TR > TD#chrome-viewer > DIV#viewer-footer,DIV.tab-group > DIV.tab-header-selected,DIV.card-actions {background-color:#333 !important;}");
		/* black bg */		sIR("DIV#lhn-selectors,DIV#lhn-friends,DIV#lhn-subscriptions,DIV#lhn-recommendations,TABLE#chrome-viewer-container > TBODY > TR > TD#chrome-viewer > DIV#viewer-container,DIV#entries > DIV.entry,UL#your-items-tree LI,UL#friends-tree *,DIV#viewer-page-container,DIV#friends-manager,UL#sub-tree LI,DIV.preview-interruption,DIV.friend-interruption,DIV.interruption,DIV#settings > TABLE TD,DIV.tab-group,DIV.tab-group-contents,DIV#discover-container,DIV.tab-group > DIV.tab-header,DIV#directory-search-container,DIV#recommendations-tab-contents,DIV.card-common,DIV.entry-likers,DIV.fr-modal-dialog DIV,DIV.entry-comments,DIV.entry > DIV.comment-entry,.scroll-tree LI {background:#000 none !important;}");
		/* no borders */	sIR("DIV#lhn-selectors,DIV#viewer-top-controls,DIV.friends-tree-following-info,DIV.friends-tree-notification-info,DIV.entry > DIV.comment-entry {border:0 none !important;}");
		/* Vwr header */	sIR("TABLE#chrome-viewer-container > TBODY > TR > TD#chrome-viewer > DIV#viewer-header   {"+bS('border-radius-topleft')+":14px;}");
		/* Vwr cntrls */	sIR("DIV#viewer-all-new-links,DIV#entries-status {padding-left:0.5em !important; color:#ccc !important;}");
		/* note box */		sIR("DIV#overview > DIV#featured-bundles-promo {background-color:#333; color:#fff !important; "+bS('radiusAll')+":14px;}");
		/* page txt */		sIR("DIV#friends-manager DIV,DIV.results DIV,DIV#quick-add-helptext,.unselectable,DIV#viewer-container DIV,DIV#viewer-container LI,DIV#viewer-container SPAN,DIV.subscription-title,TR.data-row TD,TABLE#homepage-table TD,DIV#viewer-comments-all-links,DIV.fr-modal-dialog DIV {color:#999 !important;}");
		/* card box */		sIR("DIV.card {border-color:#333 !important; "+bS('box-shadow')+":none !important;}");
		/* R boxes */		sIR("DIV#rec-preview,DIV#tips {background-color:#222; border:0 none; color:#ccc !important; "+bS('radiusAll')+":14px;}");
		/* R bx title */	sIR("TD#right-section DIV.section-header {color:#fff !important;}");
		/* subMenu */		sIR("DIV#settings-navigation H3.selected,DIV.tab-group > DIV.tab-header {margin:0.2em; "+bS('border-radius-topright')+":8px; "+bS('border-radius-topleft')+":8px;}");
		/* rndBoxes */		sIR("DIV.setting-body,DIV.fr-modal-dialog {color:#000; "+bS('border-radius-topright')+":14px; "+bS('border-radius-bottomright')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* browse top */	sIR("DIV.tab-group-contents {padding:0;}");
		/* cmodial dlg */	sIR("DIV.fr-modal-dialog {"+bS('border-radius-topleft')+":14px;}");
		/* footer */		if(uHideFooters)sIR("DIV#footer > DIV.copyright {display:none;}");
	}


	// Dictionary
	else if(iO(lH,".google."+Gtld+"/dictionary")>-1){
		/* logo txt [hide] */	sIR("BODY > DIV#cnt > TABLE.tb > TBODY > TR > TD.tc > A#logo {font-size:0;}");
		/* headers */		sIR("BODY > DIV#cnt > DIV.dct-srch-otr H3 {background-color:#333; border:0 none !important; color:#000; "+bS('radiusAll')+":14px;}");
		/* footer */		if(uHideFooters)sIR("BODY > DIV#cnt > CENTER:last-child > DIV[style='border-top: 1px solid rgb(204, 204, 240); padding: 15px 2px 2px;'] {display:none;}");
	}


	// Calendar
	else if(iO(lH,".google."+Gtld+"/calendar/")>-1){
		/* logo img [hide] */	sIR("BODY > DIV#calcontent > DIV#topBar > DIV.noprint > TABLE > TBODY > TR > TD.logoparent > IMG#mainlogo {display:none;}");
		/* logo img [insert] */	sIR("BODY > DIV#calcontent > DIV#topBar > DIV.noprint > TABLE > TBODY > TR > TD.logoparent {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important;}");
		/* alert box */		sIR("DIV#nt1 > DIV > TABLE.mbox {background-color:#000 !important;}");
		/* search optionsHdr */	sIR("DIV#sropt > DIV.logoMargin > TABLE[width='100%'][style='background: rgb(116, 221, 130) none repeat scroll 0%; "+bS('background-clip')+": "+bS('initial')+"; "+bS('background-inline-policy')+": "+bS('initial')+";'] {position:relative; right:10px; "+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}");
		/* search optionsBox */	sIR("DIV#sropt > DIV[style='border: 3px solid rgb(116, 221, 130); padding: 6px 5%; background: rgb(181, 237, 188) none repeat scroll 0%; "+bS('background-clip')+": "+bS('initial')+"; "+bS('background-origin')+": "+bS('initial')+"; "+bS('background-inline-policy')+": "+bS('initial')+"; margin-bottom: 4px;'] {margin-right:10px; margin-bottom:20px !important; "+bS('border-radius-topleft')+": 14px; "+bS('border-radius-bottomright')+": 14px; "+bS('border-radius-bottomleft')+": 14px;}");
		/* search optionsIor */	sIR("DIV#sropt > DIV[style='border: 3px solid rgb(116, 221, 130); padding: 6px 5%; background: rgb(181, 237, 188) none repeat scroll 0%; "+bS('background-clip')+": "+bS('initial')+"; "+bS('background-origin')+": "+bS('initial')+"; "+bS('background-inline-policy')+": "+bS('initial')+"; margin-bottom: 4px;'] > FORM#advancedSearchForm TD {background-color:inherit; border:inherit; "+bS('border-radius-topright')+":inherit; "+bS('border-radius-bottomleft')+":inherit;}");
		/* calendar header */	sIR("DIV#tc_top > TABLE#chrome_main1 {background-color:#000 !important;}");
		/* calendar R-side */	sIR("BODY > DIV#calcontent > TABLE#mothertable > TBODY > TR > TD#rhstogglecell {background-color:#000;}");
		/* r-side TasksListN */	sIR("DIV.sng-content {background-color:#fff;}");
		/* r-side TasksSpcr */	sIR("DIV.snt-wrapper > DIV.snt-spacer,DIV.snt-wrapper .snt-container {background-color:#000 !important;}");
		/* r-side TasksSpcrH */	sIR("DIV.snt-wrapper .snt-focus {background-color:#e8eef7 !important;}");
		/* item bubble */	sIR("DIV.bubble > TABLE.bubble-table {background-color:#333; "+bS('radiusAll')+":14px;}");
		/* item bubbleCrnrBg */	sIR("DIV.bubble > TABLE.bubble-table > TBODY > TR > TD DIV.bubble-sprite {background:transparent none !important;}");
		/* item bubbleCellBg */	sIR("DIV.bubble > TABLE.bubble-table > TBODY > TR > TD.bubble-cell-main > DIV.bubble-top,DIV.bubble > TABLE.bubble-table > TBODY > TR > TD > DIV.bubble-bottom,DIV.bubble > TABLE.bubble-table > TBODY > TR > TD.bubble-mid,DIV.bubble > TABLE.bubble-table > TBODY > TR > TD.bubble-mid TH,DIV.bubble > TABLE.bubble-table > TBODY > TR > TD.bubble-mid TD,DIV.bubble > TABLE.bubble-table > TBODY > TR > TD.bubble-mid DIV {background-color:#333; border:0 none; color:#ccc !important;}");
		/* createEventPgBody */	sIR("FORM#masterForm > DIV.eventpg {background-color:#000;}");
		/* createEventAlrtBx */	sIR("DIV.eventpg > DIV.pb-frame {color:#000; "+bS('radiusAll')+":14px;}");
		/* table txt */		sIR("DIV#newdirtarget TD,DIV#set H3,DIV#set TD,DIV#set TABLE#svalues DIV,DIV.module LABEL,DIV.module H3,DIV.module H4,.cal-dialog {color:#000;}");
		/* modal box */		sIR(".onepick-dialog, .comment-dialog, .addgadget-dialog, .warning-dialog, .cal-dialog {background-color:#222 !important; border:0 none !important; "+bS('radiusAll')+":14px;}");
		/* modal title */	sIR(".comment-dialog-title, .addgadget-dialog-title, .cal-dialog-title {background-color:#222 !important;}");
		/* modal content */	sIR(".comment-dialog-content, .addgadget-dialog-content, .cal-dialog-content {background-color:#000 !important; color:#999 !important;}");
		/* modal buttonsBox */	sIR(".comment-dialog-buttons, .addgadget-dialog-buttons, .cal-dialog-buttons {background-color:#000 !important; "+bS('border-radius-bottomright')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
	}


	// Groups
	else if(iO(lH,"groups.google.")>-1){
		/* applyGlobals */	Ge();

		/* logo img [remove] */	sIR("BODY > TABLE > TBODY > TR[valign='bottom'] > TD[width='195'][valign='top'] > A[href='/'] > IMG,BODY > DIV.gtopbar > TABLE > TBODY > TR > TD.maincell > TABLE > TBODY > TR > TD[width='140'] > A[href='/'] > IMG,BODY > DIV.gtopbar > TABLE > TBODY > TR > TD.maincell > TABLE > TBODY > TR > TD > A > IMG,TABLE[width='100%'] > TBODY > TR > TD[valign='top'] > DIV > A[href='/'] > IMG[width='185'],BODY > DIV.wdth100 > TABLE.wdth100 TD.maincell TD[width='140'] > A > IMG[width='140'] {display:none;}");
		/* logo img [hide] */	sIR("BODY > TABLE[width='100%'] > TBODY > TR[valign='bottom'] > TD[valign='top'] > A[href='/'] > IMG[width='185'],BODY > TABLE#title-t > TBODY > TR > TD.tc > A#logo > IMG {visibility:hidden;}");
		/* logo img [insert] */	sIR("BODY > TABLE > TBODY > TR[valign='bottom'] > TD[width='195'][valign='top'],BODY > DIV.gtopbar > TABLE > TBODY > TR > TD.maincell > TABLE > TBODY > TR > TD[width='140'],BODY > DIV.wdth100 > TABLE.wdth100 TD.maincell TD[width='140'],BODY > TABLE[width='100%'] > TBODY > TR[valign='bottom'] > TD[valign='top'] {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important; font-size:0;}");
		/* header cntnr */	sIR("BODY > TABLE > TBODY > TR > TD.padt5 > TABLE > TBODY > TR > TD > TABLE > TBODY > TR[bgcolor='#e8eef7'],BODY > TABLE > TBODY > TR > TD.padt5 > TABLE > TBODY > TR > TD > TABLE > TBODY > TR > TD[bgcolor='#7799dd'],DIV.secttlbarwrap > DIV > TABLE > TBODY > TR > TD > DIV,DIV.secttlbarwrap > DIV > TABLE > TBODY > TR > TD[bgcolor='#7799dd'],DIV.maincontheaderboxatt > DIV > TABLE TD DIV,DIV.maincontheaderboxatt > DIV > TABLE TD[bgcolor='#c3d9ff'] {background:#000 none !important;}");
		/* header line */	sIR("BODY > TABLE.tsh {display:none;}");
		/* headers */		sIR("BODY > TABLE > TBODY > TR > TD.padt5 > TABLE > TBODY > TR > TD > TABLE > TBODY > TR[bgcolor='#e8eef7'] > TD[style='padding: 2px 4px 3px;'],DIV.secttlbar,BODY > CENTER > TABLE > TBODY > TR > TD > TABLE > TBODY > TR > TD[width='70%'] > DIV > TABLE[width='450'][style='border-top: 1px solid rgb(119, 153, 221);'],BODY > CENTER > TABLE > TBODY > TR > TD > TABLE > TBODY > TR > TD[width='70%'] > DIV > TABLE[width='450'][style='border-top: 1px solid rgb(119, 153, 221);'] > TBODY > TR > TD[bgcolor='#e8eef7'],DIV#GHP_profile_and_stats TD[style='border-top: 1px solid rgb(119, 153, 221);'],BODY > TABLE[width='100%'][bgcolor='#e8eef7'] {background-color:#333; color:#fff !important; border:0 none !important; "+bS('radiusAll')+":14px;}");
		/* sub-headers */	sIR("DIV.maincontheaderboxatt > DIV.sshdr {border:0 none; background-color:#222 !important; color:#fff !important; "+bS('radiusAll')+":14px;}");
		/* sub-hdr bg */	sIR("DIV.maincontheaderboxatt > DIV.sshdr DIV[class='lf sshdrtxt'] {height:1.2em; overflow:hidden; margin-top:2px; background-color:#222 !important;}");
		/* my groups box T */	sIR("DIV#GHP_compact_my_groups > TABLE > TBODY > TR:first-child > TD[bgcolor='#c6d8ff'] {background-color:#333; border:0 none !important;}");
		/* my groups box TR */	sIR("DIV#GHP_compact_my_groups > TABLE > TBODY > TR:first-child > TD[bgcolor='#c6d8ff']:last-child {"+bS('border-radius-topright')+":14px;}");
		/* my groups box TL */	sIR("DIV#GHP_compact_my_groups > TABLE > TBODY > TR:first-child > TD[bgcolor='#c6d8ff']:first-child {"+bS('border-radius-topleft')+":14px;}");
		/* my groups box B */	sIR("DIV#GHP_compact_my_groups > TABLE > TBODY > TR:last-child > TD[bgcolor='#f7f7ff'] {background-color:#222; "+bS('border-radius-bottomright')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* activity header */	sIR("#stat_hdr_bar > TD[bgcolor='#e8eef7'] {background-color:#333; border:0 none !important; "+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}");
		/* activity body */	sIR("TD.group-restricted,DIV[style='border-top: 15px solid white; border-bottom: 10px solid white;'],#stat_cal,#stat_cal TD[bgcolor='#ffffff'] {background-color:#222; border-top-color:#222 !important; border-bottom-color:#222 !important;}");
		/* activity sub */	sIR("#stat_cal TABLE[bgcolor='#ffffff'] {background-color:#151515 !important; border-top-color:#222 !important; border-bottom-color:#222 !important; "+bS('radiusAll')+":14px;}");
		/* create bottom bg */	sIR("BODY > DIV > FORM > TABLE.content > TBODY > TR > TD[style='background-color: rgb(232, 238, 247);'] {background-color:#000 !important;}");
		/* message bgs */	sIR("DIV#TH_optionsPane_botcorner DIV,DIV#TH_optionsPane_botcorner TD,TABLE.msg_meta TD,DIV.msg DIV.cb,DIV.msg DIV.cg,DIV.msg TD,TABLE.msg_meta SPAN[style='background-color: white;'] {border:0 none; background:#000 none !important;}");
		/* manage table hdr */	sIR("BODY > TABLE > TBODY > TR > TD > TABLE[bgcolor='#e8eef7'] > TBODY > TR > TD > FORM > TABLE[bgcolor='#ffffff'] > TBODY > TR[bgcolor='#e8eef7'],BODY > TABLE > TBODY > TR > TD > TABLE[bgcolor='#e8eef7'] > TBODY > TR > TD > FORM > TABLE[bgcolor='#ffffff'] > TBODY > TR[bgcolor='#e8eef7'] > TD[bgcolor='#e8eef7'] {background-color:#222 !important;}");
		/* manage table bgs */	sIR("BODY > TABLE > TBODY > TR > TD > TABLE[bgcolor='#e8eef7'],BODY > TABLE > TBODY > TR > TD > TABLE[bgcolor='#e8eef7'] > TBODY > TR > TD > FORM > TABLE[bgcolor='#ffffff'],DIV.mnghdrttl,DIV.mngtabbox > DIV > TABLE > TBODY > TR > TD,DIV.mngtabbox > DIV > TABLE > TBODY > TR > TD > DIV,DIV.mnghdrbtm,DIV.mnghdrbtmitem,DIV.mngcontentbox > TABLE > TBODY > TR > TD.padall6 > TABLE > TBODY > TR > TD TABLE[bgcolor='#ffffff'],TABLE.membertabs TD[bgcolor='#d9d9d9'],DIV.mngcontentbox > TABLE[bgcolor='#d9d9d9'],TABLE[bgcolor='#ffffff'].memlist,DIV[style='padding: 4px 4px 3px; background-color: rgb(217, 217, 217);'],TR[style='background-color: rgb(238,238,238);'],DIV[style='padding: 4px 4px 3px; background-color: rgb(217, 217, 217); display: block;'],DIV#GE_optionsPane_botcorner > DIV > TABLE > TBODY > TR > TD > DIV,DIV#GE_optionsPane_botcorner > DIV > TABLE > TBODY > TR > TD[bgcolor='#7799dd'],DIV.maincontheaderboxatt TD[bgcolor='#e8eeff'] {background:#000 none !important;}");
		/* manage table spcr */	sIR("TABLE.membertabs > TBODY > TR > TD.tl {background-image:none !important;}");
		/* manage table sel */	sIR("DIV.mnghdrbtm > DIV[class='mnghdrbtmitem mnghdrbtmsel'] {background:#333 !important; color:#fff; "+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}");
		/* manage bottom box */	sIR("DIV.mngbottombox {border:0 none;}");
		/* manage contentBx */	sIR("DIV.mngbottombox > DIV.mngcontentbox {background-color:#333; "+bS('border-radius-topright')+":14px; "+bS('border-radius-bottomright')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* manage edit page */	sIR("TR#tr_innerpage * BODY * {background-color:#fff !important; color:#000 !important;}");
		/* group viewMngBrdr */	sIR("DIV[style='background-color: rgb(232, 238, 247);'],DIV[style='padding: 4px 10px; background-color: rgb(232, 238, 247);'],TD[style='background-color: rgb(232, 238, 247);'],DIV[style='width: 32ex; background-color: rgb(232, 238, 247);'] {background-color:#181818 !important;}");
		/* group viewMngSlct */	sIR("DIV.rnsecs > DIV.selsec {background-color:#000 !important; color:#fff;}");
	//	/* group cntnr bg */	sIR("DIV[style='padding: 4px 10px; background-color: rgb(232, 238, 247);'],BODY > DIV.rf > DIV.overflow-hide > DIV[style='width: 32ex; background-color: rgb(232, 238, 247);'],TABLE.wdth100 > TBODY > TR[valign='top'] > TD[style='background-color: rgb(232, 238, 247);'],DIV[style='background-color: rgb(232, 238, 247);'] {background-color:#333 !important;}");
		/* reply form cntnr */	sIR(".msg .exh,.msg .cb2,.msg .ci {background:#000 none !important; border:0 none !important;}");
		/* about archiveTbl */	sIR("DIV.maincontbox > TABLE > TBODY > TR > TD.padb5 TD[bgcolor='#e8eef7'] {background-color:#000;}");
		/* about archiveTblI */	sIR("DIV.maincontbox > TABLE > TBODY > TR > TD.padb5 TD[bgcolor='#e8eef7'] > TABLE[bgcolor='#ffffff'] {background-color:#333;}");
		/* pagination imgs */	sIR("TABLE[width='1%'] > TBODY > TR[align='center'] > TD.sb > IMG,TABLE[width='1%'] > TBODY > TR[align='center'] > TD > IMG[src='/groups/img/nav_current.gif'],TABLE[width='1%'] > TBODY > TR[align='center'] > TD > A > IMG[src='/groups/img/nav_page.gif'],TABLE[width='1%'] > TBODY > TR[align='center'] > TD > A > IMG[src='/groups/img/nav_next.gif'] {display:none;}");
		/* pagination nxtLnk */	sIR("TABLE[width='1%'] > TBODY > TR[align='center'] > TD > A > SPAN[style='text-decoration: underline; font-size: 12pt; color: rgb(0, 0, 204); font-weight: bold;'] {color:"+lc+" !important;}");
		/* header bar line */	sIR("TABLE#advsearch-t {border:0 none;}");
		/* header barR */	sIR("TABLE#advsearch-t > TBODY > TR > TD.page-about {background-color:#333 !important; "+bS('border-radius-topright')+":14px; "+bS('border-radius-bottomright')+":14px;}");
		/* header barL */	sIR("TABLE#advsearch-t > TBODY > TR > TD.page-title {padding-left:7px; background-color:#333 !important; "+bS('border-radius-topleft')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* advSrch outerBrdr */	sIR(".block {border:0 none !important;}");
		/* advSrch genQueryC */	sIR(".qbuilder-env {background-color:#000; border:0 none;}");
		/* advSrch genQueryC */	sIR("#gen-query {padding-left:0.6em; background-color:#333; font-family:'Courier New'; color:#ff0 !important; "+bS('radiusAll')+":14px;}");
		/* advSrch tblRows */	sIR("FORM.block > DIV > TABLE > TBODY > TR[bgcolor='#ffffff'],FORM.block > DIV > TABLE > TBODY > TR[bgcolor='#ffffff'] TD,FORM.block > DIV > TABLE > TBODY > TR[bgcolor='#ffffff'] B {background-color:#000; color:#999;}");
		/* bottom srch box */	sIR("BODY > TABLE[width='100%'][bgcolor='#e8eef7'][style='margin-right: -5px;'],BODY > TABLE[width='100%'][bgcolor='#e8eef7'][style='margin-right: -5px;'] > TBODY > TR > TD[bgcolor='#7799dd'],BODY > DIV[style='border-bottom: 1px solid rgb(119, 153, 221);'] {background-color:#000 !important; border:0 none !important;}");
		/* ads */		if(uHideAds)sIR("#dir_ads_site,DIV.rnimc {display:none;}");
		/* footer */		if(uHideFooters)sIR("BODY > DIV.padt10 > TABLE > TBODY > TR > TD[class='fontsize1 padt5'][align='center'][style='color: rgb(51, 51, 51);'],BODY > DIV > DIV.padt10 > TABLE > TBODY > TR > TD[class='fontsize1 padt5'][align='center'][style='color: rgb(51, 51, 51);'] {display:none;}");
	}


	// Books
	else if(iO(lH,"books.google.")>-1){
		/* applyGlobals */	Ge();

		/* logo img [remove] */	sIR("BODY > FORM[action='/books'] > TABLE > TBODY > TR > TD[width='1%'] > A > IMG[width='174'][height='40'],BODY > DIV[style='margin: 3px 8px;'] > TABLE[style='margin: 7px 0pt 10px; clear: both;'] > TBODY > TR:first-child > TD[valign='top'][rowspan='2']:first-child > A > IMG,BODY > DIV.header > A[href='/books/'] > IMG,BODY > TABLE#top_search_box > TBODY > TR:first-child > TD[style='padding-bottom: 4px; padding-top: 1px;']:first-child > A > IMG[height='40'] {display:none;}");
		/* logo img [hide] */	sIR("BODY > DIV#top_search_bar > A:first-child > IMG#logo {visibility:hidden;}");
		/* logo img [insert] */	sIR("BODY > FORM[action='/books'] > TABLE > TBODY > TR > TD[width='1%'],BODY > DIV.header,BODY > DIV#top_search_bar {width:150px !important; height:50px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important; font-size:0;}");
		/* logo bookViewFfix */	sIR("BODY > DIV#top_search_bar > FORM {position:relative; top:10px; left:20px;}");
		/* logo bookViewTfix */	sIR("BODY > DIV#top_search_bar > SPAN {position:relative; top:20px; left:30px;}");
		/* attn box */		sIR("BODY > DIV.g-doc > DIV.g-section > DIV.g-unit > DIV.attnbox {border:0 none; background-color:#181818; "+bS('radiusAll')+":14px;}");
		/* body txt */		sIR("BODY > DIV.g-doc > DIV.g-section > DIV.g-unit > H2,BODY > DIV.g-doc > DIV.g-section > DIV.g-unit > H3 {color:#999;}");
		/* hover tooltip bg */	sIR(".goog-tooltip {background-color:#333 !important; border:0 none !important; "+bS('radiusAll')+":14px;}");
		/* headers */		sIR("BODY > DIV > CENTER > TABLE#hp_table > TBODY > TR > TD > DIV.sbr > DIV.sub_cat_section > DIV.sub_cat_title,BODY > DIV#hp_table_wrap > TABLE#hp_table > TBODY > TR > TD.sidebar > DIV.sub_cat_section > DIV.sub_cat_title,BODY > DIV > CENTER > TABLE#hp_table > TBODY > TR > TD DIV.hpm_title,BODY > DIV#results_bar,TABLE#hp_table .hpm_title, BODY > DIV[style='margin: 3px 8px;'] > DIV#results_bar,.hp_header,.header_bar,#titlebar,.about_title {background-color:#333 !important; border:0 none !important; font-weight:bold; color:#000 !important; "+bS('radiusAll')+":14px;}");
		/* pre header line */	sIR("BODY > FORM[action='/books'] > TABLE > TBODY > TR > TD[rowspan='2'] > TABLE:first-child {display:none;}");
		/* header L */		sIR("BODY > FORM[action='/books'] > TABLE > TBODY > TR > TD[rowspan='2'] > TABLE TD:first-child {border:0 none; background-color:#333; color:#fff !important; "+bS('radiusAll')+":14px;}");
		/* body bg */		sIR("BODY > FORM[action='/books'] TABLE > TBODY > TR,BODY > FORM[action='/books'] TABLE > TBODY > TR > TD,DIV[style='border: 1px solid rgb(224, 224, 224); padding: 8px; width: 735px; height: 120px; font-size: 83%; background-color: rgb(252, 252, 252); text-align: center; vertical-align: middle; display: table-cell;'] {background-color:#000 !important; border:0 none !important; color:#999;}");
		/* ads */		if(uHideAds)sIR(".lads,TD[style='width: 1px; vertical-align: top;'] > DIV#rhswrapper {display:none;}");
		/* results width */	sIR(".rsiwrapper {max-width:none;}");
		/* bottom search box */	sIR("BODY > DIV > DIV#banner {background-color:#000 !important; border:0 none !important;}");
		/* about menuSepBg */	sIR("BODY > TABLE[width='95%'][cellpadding='2'] > TBODY > TR:first-child > TD[style='background-color: rgb(255, 255, 255);'] {background-color:#000 !important;}");
		/* about menuSepLn */	sIR("BODY > TABLE[width='95%'][cellpadding='2'] > TBODY > TR:first-child > TD[background='/images/dot2.gif'] {background:#000 none !important; border-right:1px dotted #333;}");
		/* about menuHdiv */	sIR("IMG[width='130'][src='http://books.google.com/googlebooks/sidedivider_sm.gif'] {visibility:hidden;}");
		/* bookView l-menuLn */	sIR("#menu_td {border-color:#333;}");
		/* footers */		if(uHideFooters)sIR("BODY > FORM[action='/books'] > CENTER > FONT[face='arial,sans-serif'] > FONT[size='-1'],BODY > DIV.g-section > DIV.g-unit > DIV.footer,BODY > DIV.g-doc > DIV.g-section > DIV.g-unit > DIV.footer,BODY > FORM[name='f'] > CENTER:last-child > FONT[size='-1'],BODY > DIV > DIV#footer_table > SPAN:last-child {display:none;}");
	}
	// GoogleBooks
	else if(iO(lH,".google."+Gtld+"/googlebooks/")>-1){
		/* applyGlobals */	Ge();

		/* logo img [replac] */	sIR("BODY > TABLE.tb > TBODY > TR > TD.tc > A#logo > SPAN {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important;}");
		/* logo txt fix */	sIR("BODY > TABLE.tb > TBODY > TR > TD.tc > A#logo {font-size:0;}");
		/* tblBg */		sIR("TABLE,TABLE TD,.t {background-color:#000; color:#999;}");
		/* footer */		if(uHideFooters)sIR("BODY > DIV#page > DIV#footer > P:last-child,BODY > CENTER > DIV[class='t n bt'] {display:none;}");
	}


	// Scholar
	else if(iO(lH,"scholar.google.")>-1&&(iO(lH,"/scholar")>-1)){
		/* applyGlobals */	Ge();

		/* logo img [remove] */	sIR("BODY > DIV.g-doc:first-child > DIV.header > A > IMG,BODY > FORM[name='gs'] > TABLE#scife_hdr > TBODY > TR:first-child > TD[valign='top']:first-child > A > IMG {display:none;}");
		/* logo img [hide] */	sIR("BODY > CENTER > TABLE:first-child > TBODY > TR:first-child > TD:first-child > IMG[width='276'],BODY > FORM > TABLE[width='99%'][cellspacing='2'] > TBODY > TR > TD[width='1%'] > A > IMG[width='189'],BODY > FORM[name='prefform'] > CENTER > TABLE > TBODY > TR > TD[width='1%'] > A > IMG {visibility:hidden;}");
		/* logo img [insert] */	sIR("BODY > DIV.g-doc:first-child > DIV.header {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important; font-size:0;}");
		/* Home logo [insrt] */	sIR("BODY > CENTER > TABLE:first-child > TBODY > TR:first-child > TD:first-child {height:130px; background:transparent url('"+gHpL+"') no-repeat scroll center top !important;}");
		/* Home form V-Adj */	sIR("BODY > CENTER > FORM[name='f'] {position:relative; bottom:30px;}");
		/* pre header line */	sIR("BODY > FORM[name='f'] > TABLE[width='99%'] > TBODY > TR:first-child > TD > TABLE[width='100%'] > TBODY > TR:first-child > TD[bgcolor='#008000'],BODY > FORM[name='prefform'] > CENTER > TABLE > TBODY > TR > TD > TABLE[width='100%'] > TBODY > TR:first-child > TD[bgcolor='#008000'],BODY > TABLE[width='100%'] > TBODY > TR > TD[bgcolor='#008000'] {display:none;}");
		/* header bg */		sIR("BODY > TABLE[width='100%'][bgcolor='#dcf6db'],BODY > FORM[name='gs'] > TABLE[width='100%'][bgcolor='#dcf6db'],BODY > FORM[name='gs'] > TABLE[width='100%'][bgcolor='#dcf6db'] TD,BODY > FORM[name='prefform'] > CENTER > TABLE > TBODY > TR[bgcolor='#dcf6db'] {background-color:#000;}");
		/* header R */		sIR("BODY > FORM[name='f'] > TABLE[width='99%'] > TBODY > TR:first-child > TD > TABLE[width='100%'] > TBODY > TR > TD[bgcolor='#dcf6db'][align='right'],BODY > FORM[name='prefform'] > CENTER > TABLE > TBODY > TR > TD > TABLE[width='100%'] > TBODY > TR:first-child > TD[bgcolor='#dcf6db'][align='right'],BODY > TABLE[width='100%'][bgcolor='#dcf6db'] > TBODY > TR > TD[bgcolor='#dcf6db'][align='right'] {padding-right:0.5em; background-color:#333 !important; "+bS('border-radius-topright')+":14px; "+bS('border-radius-bottomright')+":14px;}");
		/* header L */		sIR("BODY > FORM[name='f'] > TABLE[width='99%'] > TBODY > TR:first-child > TD > TABLE[width='100%'] > TBODY > TR > TD[bgcolor='#dcf6db']:first-child,BODY > FORM[name='prefform'] > CENTER > TABLE > TBODY > TR > TD > TABLE[width='100%'] > TBODY > TR:first-child > TD[bgcolor='#dcf6db']:first-child,BODY > TABLE[width='100%'][bgcolor='#dcf6db'] > TBODY > TR > TD[bgcolor='#dcf6db']:first-child   {padding-left:0.5em; background-color:#333 !important; "+bS('border-radius-topleft')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* bottom search box */	sIR("BODY > CENTER > TABLE[width='100%'] > TBODY > TR > TD.k,BODY > CENTER > TABLE[width='100%'] > TBODY > TR > TD[bgcolor='#dcf6db'] {background-color:#000;}");
		/* bottomSr PgNums W */	sIR("BODY > DIV.n > TABLE[width='1%'] {width:inherit !important; border-spacing:1em;}");
		/* bottomSr PgNums */	sIR("BODY > DIV.n > TABLE[width='1%'] > TBODY > TR > TD IMG {display:none;}");
		/* advSrch lowerBody */	sIR("BODY > FORM > TABLE[width='99%'][cellpadding='3'] TR[bgcolor='#dcf6db'],BODY > FORM > TABLE[width='99%'][cellpadding='3'] TR[bgcolor='#ffffff'] {background-color:#000;}");
		/* advSrch header */	sIR("TABLE[bgcolor='#dcf6db'] {background-color:#333; "+bS('radiusAll')+":14px;}");
		/* advSrch headerLine*/	sIR("TABLE[bgcolor='#dcf6db'] > TBODY > TR[bgcolor='#008000'] {display:none;}");
		/* footer */		if(uHideFooters)sIR("BODY > DIV.g-doc > DIV.g-section > DIV.g-unit > DIV.footer,BODY > FORM[name='prefform'] > CENTER > P:last-child > FONT[size='-1'],BODY > FORM[name='f'] > CENTER:last-child > FONT[size='-1'] {display:none;}");
	}


	// Blogs
	else if(iO(lH,"blogsearch.google.")>-1){
	 if(iO(lH,"/blogsearch?")>-1){ //Search Results
		/* logo imgs */		sIR("BODY > DIV > TABLE#srch_box_t > TBODY > TR > TD:first-child > A > IMG[height='40'],BODY > DIV#h > TABLE:first-child > TBODY > TR > TD:first-child > A > IMG {display:none;}");
		/* pre header line */	sIR("BODY TABLE[width='100%'] > TBODY > TR > TD.tpb {display:none;}");
		/* headers */		sIR("BODY > DIV#canvas > DIV.heading,DIV#rightHandContainer DIV.heading,BODY TABLE.ttt,BODY TABLE.ttt TD   {padding-left:0.7em; background-color:#333; border:0 none !important; color:#ccc!important; "+bS('radiusAll')+":14px;}");
		/* menu divider */	sIR("DIV#main > DIV#sideBarContainer > DIV#sideBarWrap {border-color:#333;}");
		/* menu r-line */	sIR("BODY > DIV#m > DIV.ln {border-right-color:#333;}");
		/* menu highlights */	sIR("UL#sideLinksList > LI.selected,DIV#sideBarWrap > DIV#feedsContainer > DIV > DIV.sbiTitle {background-color:#222 !important; color:#fff !important;}");
		/* page txt */		sIR("TABLE#buzzlistTable TR.clusterGroup DIV.entryText SPAN,TABLE#buzzlistTable TR.clusterGroup DIV.entryText DIV {color:#999 !important;}");
		/* bottomSearchBg */	sIR("BODY > DIV#f > CENTER > TABLE > TBODY > TR > TD.bts {background-color:#000;}");
		/* bottomSearchBrdrs */	sIR("BODY > DIV#f > CENTER > TABLE > TBODY > TR > TD.btb {display:none;}");
		/* footer */		if(uHideFooters)sIR("BODY > CENTER > CENTER > FONT[size='-2']:last-child,BODY > DIV#f > CENTER:last-child > FONT[size='-2'] {display:none;}");
	 }
	 else if(iO(lH,"/blogsearch/advanced_blog_search")>-1){ //Advanced Search
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("BODY > DIV#h > TABLE > TBODY > TR > TD:first-child > A > IMG.l {display:none;}");
		/* logo img [insert] */	sIR("BODY > DIV#h > TABLE > TBODY > TR > TD:first-child {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important; font-size:0;}");
		/* pre header line */	sIR("BODY > DIV#h > TABLE > TBODY > TR > TD > TABLE > TBODY > TR> TD.tpb {display:none;}");
		/* header R */		sIR("BODY > DIV#h > TABLE > TBODY > TR > TD > TABLE > TBODY > TR> TD.ttb[align='right'] {padding-right:0.5em; border:0 none; background-color:#333; color:#fff !important; "+bS('border-radius-topright')+":14px; "+bS('border-radius-bottomright')+":14px; }");
		/* header L */		sIR("BODY > DIV#h > TABLE > TBODY > TR > TD > TABLE > TBODY > TR> TD.ttb:first-child {border:0 none; background-color:#333; color:#fff !important; "+bS('border-radius-topleft')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* box bgs */		sIR("DIV#asm TR.asb TD {background-color:#000 !important; color:#999;}");
		/* footer */		if(uHideFooters)sIR("BODY > FORM > CENTER > FONT[size='-2']:last-child {display:none;}");
	 }
	}


	// Voice
	else if((iO(lH,"http://www.google.com/googlevoice")>-1)||(iO(lH,"https://www.google.com/voice")>-1)||(iO(lH,"https://services.google.com/fb/forms/googlevoiceinvite/")>-1)){
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("BODY > DIV.g-doc-800 > DIV.header > A > IMG[alt='Google Voice'],BODY.compact > H1 > A > IMG[alt='Google Voice'],BODY.gc > DIV > DIV#gc-header > DIV.g-unit > DIV > DIV.g-section > DIV.g-unit > A[href='/voice'] > IMG#gc-header-logo,IMG#gc-header-logo,BODY > DIV.gc-mid > DIV[style='padding: 20px 0pt 6px;'] > A > IMG {display:none;}");
		/* logo img [insert] */	sIR("BODY > DIV.g-doc-800 > DIV.header,BODY.compact > H1,BODY.gc > DIV > DIV#gc-header > DIV.g-unit > DIV > DIV.g-section > DIV.g-unit:first-child,BODY.gc > DIV > DIV.gc-forward-logo,BODY > DIV.gc-mid > DIV[style='padding: 20px 0pt 6px;'] {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important; font-size:0;}");
		/* about header bar */	sIR("P.highlight-box {background-color:#333; border:0; color:#fff; "+bS('radiusAll')+":14px;}");
		/* invite l-linkBox */	sIR("#gc-sidebar-invite-header TD {background:transparent none !important;}");
		/* invite l-linkRndB */	sIR("#gc-sidebar-invite-header > DIV.gc-blueb-rnd > TABLE {background:#333; "+bS('radiusAll')+":14px;}");
		/* invite headline */	sIR("BODY[class='compact product']> H2 {margin-top:2em; color:#fff;}}");
		/*  footers */		if(uHideFooters)sIR("BODY.compact > DIV#about,DIV#gc-footer,BODY > DIV.g-doc > P.footer:last-child {display:none;}");

		/* admin bg */		sIR("DIV.gc-header,.gc-inbox-sidebar-menu,#gc-view-main,.gc-footer,.g-section,.g-tpl-67-33,.gc-message,#gc-splitpane,.gc-bubble-mc {background:#000 none !important; color:#ccc}");
		///*  admin buttons */	sIR(".goog-button-base-content.goog-button-base-content SPAN,.gc-text,.goog-flat-menu-button-caption {background:#333 none !important; color:#fff}");
		/* admin callout  */	sIR(".gc-message-transcript,.gc-message-callout,.gc-message-transcript-b,.gc-message-transcript-t,.gc-message-transcript-r,.gc-message-transcript-l,.gc-message-transcript-m,.gc-message-transcript-bl,.gc-message-transcript-br,.gc-message-transcript-tl,.gc-message-transcript-tr {background:#333 none !important; color:#fff}");
		/* admin c.out txt */	sIR(".goog-menuitem-content,.gc-inbox-no-items,.gc-inbox-page-range,.gc-user-tip .goog-inline-block,.goog-container,.g-section,LABEL,.gc-message-message-display *,.gc-quicksms > DIV,SPAN {color:#fff !important}");
		/* admin sidebar */	sIR(".goog-option-selected,#gc-inbox-sidebar-header,#gc-view-header,.goog-splitpane-handle,.gc-user-tip .goog-inline-block,.goog-menuitem,.gc-inbox-sidebar-main,#gc-sidebar-balance-header,TD.goog-splitpane-first-container > DIV[style='overflow: hidden;'] {background:#181818 none !important;}");
		/* admin menu */	sIR(".goog-menuitem-highlight {background:#333 none !important;}");
		/* msg bgs */		sIR("DIV.gc-message-bg > DIV,DIV.gc-message-bg > DIV > TABLE > TBODY > TR > TD,TD.gc-message-sline,DIV.gc-message-bg-callout,DIV.gc-message-sms-actions {background:#000 none !important;}");
		/* msg callout */	sIR("DIV.gc-message-unread DIV.gc-message-callout {display:none;}");
		/* msg transcrpt */	sIR("DIV.gc-message-transcript {padding:4px 7px 4px 7px; "+bS('radiusAll')+":14px;}");
		/* msg btm line */	sIR("BODY.gc > DIV.gc-forward-content > DIV.gc-forward-message {border:0 none;}");
		/* msg separator */	sIR("DIV.gc-message-bg {border-bottom:1px dotted #222;}");
		/* settings page bg */	sIR("DIV.gc-settings-description,DIV#gc-settings-tab-bar-content,DIV.gc-settings-content {color:#eee; background:#000 none !important;}");
		/* settingsPg-tblAlt */	sIR("TABLE.gc-billing-trans > TBODY > TR > TD,DIV.gc-billing-index,TR.gc-group-list-row-alt {color:#eee; background:#222 none !important;}");
		/* settingsPgBg2 */	sIR("TABLE.gc-billing-trans > TBODY > TR > TH ,TH.gc-billing-stat-hd,DIV.gc-phone-list-item > TABLE {color:#eee; background:#222 none !important;}");
		/* settingsPgTabBar1 */	sIR("DIV.goog-tab-bar-top {border-bottom:#ccc 1px solid; color:#eee; background:#000 none !important;}");
		/* settingsPgTabBar2 */	sIR("DIV.goog-tab-bar-top > DIV.goog-tab-selected {border:0 none; background:#000 none !important; color:#fff !important;}");
	}


	// Patents
	else if(iO(lH,".google."+Gtld+"/patents")>-1){
		/* applyGlobals */	Ge();

		/* Spcl HomeLogoHide */	pHl=document.getElementsByTagName("img")[0];if(iO(pHl.src,"patent_search_logo_lg.gif")>-1)pHl.style.visibility="hidden";

		/* logo img [hide] */	sIR("BODY > DIV#top_search_bar > A > IMG#logo,BODY > DIV[style='margin: 3px 8px;'] > TABLE[style='margin: 7px 0pt 10px; clear: both;'] > TBODY > TR > TD > A > IMG[height='40'] {visibility:hidden;}");
		/* logo img [insert] */	sIR("BODY > DIV#top_search_bar {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 0% !important; font-size:0;}");
		/* Home logo [insrt] */	sIR("BODY > DIV[style='clear: both;'] > CENTER > TABLE:first-child > TBODY > TR:first-child > TD:first-child {height:130px; background:transparent url('"+gHpL+"') no-repeat scroll center top !important;}");
		/* head search form */	sIR("BODY > DIV#top_search_bar > FORM[name='f'][action='/patents'][style='display: inline;'],BODY > DIV#top_search_bar > SPAN[style='vertical-align: top; font-size: 10px;']:last-child {position:relative; top:17px; margin-right:10px;}");
		/* header */		sIR("#results_bar {background-color:#333 !important; border:0 none !important; "+bS('radiusAll')+":14px;}");
		/* title block */	sIR("BODY > DIV#titlebar {background-color:#333; border:0 none; color:#fff; "+bS('radiusAll')+":14px;}");
		/* menu R-border */	sIR("BODY > TABLE#viewport_table > TBODY > TR > TD#menu_td {padding-right:0.4em; border-color:#333;}");
		/* headers */		sIR("BODY > TABLE#viewport_table .about_title {background-color:#333; border:0 none; "+bS('radiusAll')+":14px;}");
		/* footer */		if(uHideFooters)sIR("BODY > DIV#footer_table > SPAN:last-child {display:none;}");
	}

	// Patents: Advanced Search
	else if(iO(lH,".google."+Gtld+"/advanced_patent_search")>-1){
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("BODY > FORM[name='f'] > TABLE:first-child > TBODY > TR > TD:first-child > A > IMG {display:none;}");
		/* logo img [insert] */	sIR("BODY > FORM[name='f'] > TABLE:first-child > TBODY > TR > TD:first-child {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important; font-size:0;}");
		/* header line */	sIR("BODY > FORM > TABLE > TBODY > TR > TD[rowspan='2'] > TABLE:first-child > TBODY > TR > TD[bgcolor='#3366cc'] {display:none;}");
		/* header bar L */	sIR("BODY > FORM > TABLE > TBODY > TR > TD[rowspan='2'] > TABLE TD:first-child {background-color:#333; border:0 none !important; color:#ccc; "+bS('border-radius-topleft')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* header bar R */	sIR("BODY > FORM > TABLE > TBODY > TR > TD[rowspan='2'] > TABLE TD[align='right'] {padding-right:0.2em; background-color:#333; border:0 none !important; color:#ccc; "+bS('border-radius-topright')+":14px; "+bS('border-radius-bottomright')+":14px;}");
		/* body bg */		sIR("BODY > FORM > TABLE TR[bgcolor='#cbdced'] TD {background-color:#000; color:#fff;}");
		/* inner bg */		sIR("BODY > FORM > TABLE TR[bgcolor='#ffffff'] TD{background-color:#000; color:#ccc;}");
		/* footer */		if(uHideFooters)sIR("BODY > FORM > CENTER > FONT[face='arial,sans-serif'] > FONT[size='-1'],BODY > FORM[name='f'][action='/patents'] > CENTER:last-child > FONT[size='-1'] {display:none;}");
	}


	// Trends
	else if(iO(lH,".google."+Gtld+"/trends")>-1){
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("BODY > CENTER > IMG[alt='Google Trends']:first-child,BODY.product > H1 > A[href='/trends/'] > IMG,BODY > FORM[name='search'] > TABLE > TBODY > TR > TD[width='1'][rowspan='2'] > A[href='/trends'] > IMG,BODY > DIV.g-doc > DIV#trends-page > FORM#trends-search > DIV#trends-header > DIV.g-section:first-child > DIV.g-unit:first-child > DIV.g-section:first-child > DIV.g-unit:first-child > A > IMG {display:none;}");
		/* logo img [insert] */	sIR("BODY.product > H1,BODY > FORM[name='search'] > TABLE > TBODY > TR > TD[width='1'][rowspan='2'],BODY > DIV.g-doc > DIV#trends-page > FORM#trends-search > DIV#trends-header > DIV.g-section:first-child > DIV.g-unit:first-child > DIV.g-section:first-child > DIV.g-unit:first-child {width:150px; height:55px; background:transparent url('"+gL+"') no-repeat scroll top center !important; font-size:0;}");
		/* Home logo [insrt] */	sIR("BODY > CENTER > TABLE[cellspacing='0'][cellpadding='0'][border='0'] {background:transparent url('"+gHpL+"') no-repeat scroll center top !important;}");
		/* form v-adjust */	sIR("BODY > CENTER > TABLE[cellspacing='0'][cellpadding='0'][border='0'] {padding-top:131px;}");
		/* searchbar cntnr */	sIR("BODY > CENTER > TABLE[cellspacing='0'][cellpadding='0'][border='0'] > TBODY > TR > TD[align='left'] > FORM[name='search'] > TABLE > TBODY > TR > TD[align='left'] {white-space:nowrap; font-style:italic;}");
		/* pre header bar */	sIR("TABLE > TBODY > TR > TD[height='1'][bgcolor='#3366cc'],BODY > TABLE[cellpadding='2'][bgcolor='#e5ecf9'] {display:none;}");
		/* headers */		sIR("BODY > CENTER > TABLE > TBODY > TR > TD > TABLE[bgcolor='#e5ecf9'],BODY > FORM[name='search'] > TABLE[bgcolor='#e5ecf9'],TABLE.list > TBODY > TR[bgcolor='#e5ecf9']:first-child > TD,BODY > FORM[name='search'] > TABLE > TBODY > TR > TD > TABLE[bgcolor='#e5ecf9'],BODY > FORM > TABLE[width='100%'][style='padding-right: 10px;'] > TBODY > TR > TD[width='33%'] > TABLE.list > TBODY > TR[bgcolor='#e5ecf9'],BODY > TABLE.hotLayout > TBODY > TR > TD.hotSection > TABLE[bgcolor='#e5ecf9'],BODY > CENTER > TABLE[style='margin: 0em 0pt;'] > TBODY > TR > TD > TABLE[style='margin: 1em 0pt 0pt;'] > TBODY > TR > TD[width='47%'][style='min-width: 350px;'] > TABLE[bgcolor='#e5ecf9'],BODY > DIV.g-doc > DIV#trends-page > FORM#trends-search > DIV#trends-navbar,.trends-barchart-table-c H2 {padding-right:0.7em; padding-left:0.2em; background-color:#333; border:0 none !important; color:#fff; "+bS('radiusAll')+":14px;}");
		/* head/foot cntnrBg */	sIR("TABLE.list > TBODY > TR[bgcolor='#e5ecf9']:first-child,FORM#trends-search .trends-sep {background-color:#000;}");
		/* header export adj */	sIR("BODY > FORM[name='search'] > TABLE > TBODY > TR > TD > TABLE[bgcolor='#e5ecf9'] {width:inherit; padding-left:0.7em; background-color:"+lc+" !important;}");
		/* header export lnk */	sIR("BODY > FORM[name='search'] > TABLE > TBODY > TR > TD > TABLE[bgcolor='#e5ecf9'] TD A {color:#fff !important;}");
		/* story info bg */	sIR(".gs-publisher,.gs-location,.gs-relativePublishedDate {margin:0 !important; padding-right:0.2em; padding-left:0.2em; background-color:#181818 !important;}");
		/* footer */		if(uHideFooters)sIR("BODY > CENTER > P > FONT[size='-2'],BODY > FORM[name='search'] > TABLE > TBODY > TR > TD[height='1'][bgcolor='#cccccc'],BODY > FORM[name='search'] > TABLE > TBODY > TR > TD[align='center'] > FONT[size='-1'],BODY > TABLE > TBODY > TR > TD[height='1'][bgcolor='#cccccc'],BODY > TABLE[cellpadding='5'] > TBODY > TR > TD[align='center'] > FONT[size='-1'],#trends-footer #trends-footer-links {display:none;}");
	}


	// Labs
	else if(iO(lH,".googlelabs.")>-1||iO(lH,"//labs.google.")>-1){
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("BODY > DIV#g-hdr > FORM > TABLE#g-hdr-table > TBODY > TR > TD#g-hdr-logo-col > H1 > A > IMG {display:none;}");
		/* logo img [insert] */	sIR("BODY > DIV#g-hdr > FORM > TABLE#g-hdr-table > TBODY > TR > TD#g-hdr-logo-col,BODY > DIV[style='margin: 3px 5px;'] > TABLE#controls > TBODY > TR:first-child > TD[valign='top']:first-child {width:150px; height:55px; background:transparent url('"+ gL + "') no-repeat scroll top center !important; font-size:0;}");
		/* menu right bar */	sIR("DIV#left-sidebar {border-color:#777;}");
		/* menu linx */		sIR("DIV#left-sidebar > UL > LI > A > SPAN.name {padding-left:0.5em; color:#999 !important;  text-decoration:none !important;}");
		/* menu selected box */	sIR("DIV#left-sidebar > UL > LI.selected {padding-left:0.2em; background-color:#777; "+bS('border-radius-topleft')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* menu selected txt */	sIR("DIV#left-sidebar > UL > LI.selected > A > SPAN.name {padding-left:0; color:#fff !important;}");
		/* menu headings */	sIR("DIV#left-sidebar H4 {padding-left:0.6em; background-color:#222; color:#777; "+bS('border-radius-topleft')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* headers */		sIR("H3,BODY > H2,DIV#main-with-sidebar H4,.tabs,#info1,#info2 {padding-left:0.7em; background-color:#333; border:0; color:#fff; "+bS('radiusAll')+":14px;}");
		/* page txt */		sIR(".meta,.desc,.cur,DIV#main-with-sidebar DIV,DIV.g-doc P {color:#999 !important;}");
		/* comments box bg */	sIR("DIV#commentThreadNode > DIV.zzCommentThreadGadget {background-color:#000 !important;}");
		/* comments box */	sIR("DIV#commentThreadNode DIV.zzCommentList {background-color:#181818; border:0; color:#999; "+bS('radiusAll')+":14px;}");
		/* comments author */	sIR("DIV#commentThreadNode DIV.zzCommentList SPAN.zzCommentDisplayAuthorName {color:#ccc !important;}");
		/* comments btm line */	sIR("DIV#commentThreadNode DIV.zzCommentThreadSeparator {display:none;}");
		/* footer pagination */	sIR("BODY > DIV#main-with-sidebar > TABLE#nav > TBODY > TR[valign='top'] > TD SPAN {visibility:hidden;}");

		/* Fast Flip */
		/* logo img [hide] */	sIR("BODY > DIV[style='margin: 3px 5px;'] > TABLE#controls > TBODY > TR:first-child > TD[valign='top']:first-child > A#logo > IMG {visibility:hidden;}");
		/* header selection */	sIR(".tabs > .selected {border:0 none !important; background-color:#333 !important; color:#fff !important;}");
		/* list borders */	sIR(".list {border-color:#333;}");
		/* tip panel */		sIR(".tip,.tip .heading {background-color:#222; "+bS('radiusAll')+":14px;}");
		/* L-side slider */	sIR("TABLE#sbc {background-color:#333;}");
		/* share panel bg */	sIR(".share {padding:7px 7px 0 7px; background-color:#222; "+bS('radiusAll')+":14px;}");
		/* share btn */		sIR(".share .button {border:0 none !important; background-color:#000 !important; "+bS('radiusAll')+":14px;}");
		/* share dropdown */	sIR(".share .dd {padding:7px; border:0 none; background-color:#181818; "+bS('radiusAll')+":14px;}");
		/* footer */		if(uHideFooters)sIR("BODY > DIV > DIV#footer {display:none;}");
	}


	// Experimental
	else if(iO(lH,".google."+Gtld+"/experimental/")>-1){
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("BODY > DIV#container > DIV#header > DIV[style='float: left; width: 155px;'] IMG[width='150'][height='55'] {display:none;}");
		/* logo img [insert] */	sIR("BODY > DIV#container > DIV#header > DIV[style='float: left; width: 155px;'] {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important; font-size:0;}");
		/* page title */	sIR("BODY > DIV#container > DIV#header > DIV > DIV.title {color:#fff;}");
		/* header & try out */	sIR("BODY > DIV#container > DIV#content > TABLE.expheader > TBODY > TR > TD,BODY > DIV#container > DIV#content > TABLE.expheader > TBODY > TR > TD > SPAN,BODY > DIV#container > DIV#content > TABLE > TBODY > TR > TD.expdesc > TABLE > TBODY > TR[valign='middle'] > TD[bgcolor='#ffffcc'][style='padding: 5px;'],BODY > DIV#container > DIV#content > TABLE > TBODY > TR > TD.expdesc > TABLE > TBODY > TR > TD.corners_yellow > SPAN {background:#333 none !important; border:0; color:#fff;}");
		/* content */		sIR("BODY > DIV#container > DIV#content {color:#999 !important;}");
		/* footer */		if(uHideFooters)sIR("BODY > DIV#container > DIV#footer {display:none;}");
	}


	// Gmail
	else if(iO(lH,"mail.google.")>-1){
	 if(iO(lH,"/mail/help/")>-1&&(iO(lH,".html")>-1||iO(lH,"/tasks/")>-1)){ //supportingPages
		/* applyGlobals */	Ge();

		/* headers */		sIR("BODY > DIV.g-doc > DIV.g-section > DIV.g-unit > H1,DIV.nav-horz {position:relative; top:1em; padding-top:0; padding-left:0.5em; background-color:#333; border:0 none; color:#fff; "+bS('radiusAll')+":14px;}");
		/* tips body */		sIR("DIV.box-1 > DIV.box-2 {background-color:#222; "+bS('border-radius-bottomright')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* r-side Boxes */	sIR("BODY > DIV.g-doc > DIV.g-section > DIV.g-unit > DIV#print-box,.bluebox {background-color:#333; border:0 none; "+bS('radiusAll')+":14px;}");
		/* page txt */		sIR("BODY > DIV.g-doc > DIV.g-section > DIV.g-unit P {color:#999;}");
		/* hilite txt */	sIR("BODY > DIV.g-doc > DIV.g-section > DIV.g-unit H3,BODY > DIV.g-doc > DIV.g-section > DIV.g-unit H4,BODY > DIV.g-doc > DIV.g-section > DIV.g-unit STRONG,DIV.box-2 > H2 {color:#fff;}");
	 }
	 else if(iO(lH,"/mail/")>-1){ //[standard view] Loading[only]
		/* link color */	sIR("A {color:"+lc+" !important;}");
		/* visited linx */	sIR("A:visited {color:"+vl+" !important;}");
		/* page bg */		sIR("DIV#loading {background-color:#000; color:#fff;}");
		/* alternateView box */	sIR("DIV#loading DIV#stb.msgb {background-color:#181818; color:#333 !important; "+bS('radiusAll')+":14px;}");
	 }
	 else if(iO(lH,"/mail/h/")>-1&&iO(lH,"?v=ac")>-1){ //[basic HTML view] Activity Info
		/* applyGlobals */	Ge();

		/* page txt */		sIR("BODY > TABLE[style='table-layout: fixed;'] > TBODY > TR > TD[valign='top'] > TABLE[style='table-layout: fixed;'] > TBODY > TR > TD.acts,BODY > TABLE[style='table-layout: fixed;'] > TBODY > TR > TD[valign='top'] > TABLE[style='table-layout: fixed;'] > TBODY > TR > TD.acts TD,BODY > TABLE[style='table-layout: fixed;'] > TBODY > TR > TD[valign='top'] > TABLE[style='table-layout: fixed;'] > TBODY > TR > TD > TABLE[width='97%'] > TBODY > TR > TD > TABLE > TBODY > TR.thead > TD {color:#000;}");
	 }
	}


	// Code
	else if(iO(lH,"code.google.")>-1||iO(lH,".googlecode.")>-1){
		/* applyGlobals */	Ge();

		/* headMenuBg */	sIR(".menuDiv,.menuDiv .menuItem,.menuDiv HR {background-color:#444 !important; border:0 none !important; "+bS('radiusAll')+":14px;}");
		/* logo img [hide] */	sIR("BODY > DIV#gc-container > DIV#gc-header > DIV#logo > A > IMG,BODY > TABLE[style='margin: 20px 0px 0px; padding: 0px; width: 100%;'] > TBODY > TR[style='height: 58px;'] > TD[style='width: 55px; text-align: center;'] > A > IMG[width='161'] {display:none;}");
		/* logo img [insert] */	sIR("BODY > DIV#gc-container > DIV#gc-header > DIV#logo,BODY > TABLE[style='margin: 20px 0px 0px; padding: 0px; width: 100%;'] > TBODY > TR[style='height: 58px;'] > TD[style='width: 55px; text-align: center;'] {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll top left !important; font-size:0;}");
		/* search cntnr bg */	sIR("TABLE.gsc-search-box > TBODY > TR > TD {background-color:#000;}");
		/* round corners */	sIR("BODY .round1,BODY .round2,BODY .round4 {visibility:hidden;}");
		/* notify boxes */	sIR(".notice,.error {"+bS('radiusAll')+":14px;}");
		/* top menu tabs */	sIR("BODY > TABLE#mt > TBODY > TR:first-child > TH > DIV.tab {"+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}");
		/* top menu submenuR */	sIR("BODY > TABLE.st {"+bS('border-radius-topright')+":14px; "+bS('border-radius-bottomright')+":14px; "+bS('border-radius-bottomleft')+":6px;}");
		/* top menu submenuL */	sIR("BODY > TABLE.st > TBODY > TR > TD:first-child DIV.isf {"+bS('border-radius-bottomleft')+":6px;}");
		/* left separator */	sIR("DIV#gc-pagecontent > DIV#gc-collapsible {border-color:#181818 !important; background-color:#181818 !important;}");
		/* left menu select */	sIR("UL.treelist LI.selected,#gc-toc ul .selected, #gc-toc ol .selected, .treelist .selected {background-color:#181818 !important;");
		/* headers */		sIR("DIV#gc-topnav,DIV#searchControl > DIV > DIV.gsc-tabsArea,DIV#maincol DIV#nav_and_rev,DIV#maincol > DIV.bubble_bg,TABLE#cue > TBODY > TR > TD[style='border-top: 1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(255, 255, 255); background: rgb(221, 248, 204) none repeat scroll 0%; "+bS('background-clip')+": "+bS('initial')+"; "+bS('background-origin')+": "+bS('initial')+"; "+bS('background-inline-policy')+": "+bS('initial')+";'],#issueheader,.updates,#makechanges > DIV.h4,.mainhdr {background-color:#333 !important; border:0 none !important; color:#fff; padding-right:0.5em; padding-left:0.5em; "+bS('radiusAll')+":14px;}");
		/* header innerBg */	sIR("#issueheader TD {background-color:transparent;}");
		/* sub-headers */	sIR("BODY > DIV#gc-container H2,DIV#gc-pagecontent H1 {background-color:#222 !important; border:0 none !important; margin-top:1em !important; padding-top:0.2em !important; color:#fff; padding-right:0.5em; padding-left:0.5em; "+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}");
		/* sourcecode Blocks */	sIR("DIV.fc > TABLE#review_comment_area,DIV#maincol DIV.diff > PRE:first-child > TABLE[style='border-collapse: collapse;']:first-child,DIV#maincol > DIV#wikicontent > PRE.prettyprint,DIV#wikicontent > TABLE > TBODY > TR > TD#wikimaincol PRE.prettyprint {margin-top:0.5em; background-color:#fff; color:#000; "+bS('border-radius-topright')+":42px; "+bS('border-radius-bottomright')+":42px;}");
		/* sourcecode fonts */	sIR("DIV.fc > TABLE#review_comment_area *,DIV#maincol DIV.diff > PRE:first-child > TABLE[style='border-collapse: collapse;']:first-child *,DIV#maincol > DIV#wikicontent > PRE.prettyprint * {font-family:'Courier New'; font-size:0.99em; padding-right:2px;}");
		/* sourcecode Ln#s */	sIR("DIV.fc > TABLE#review_comment_area > TBODY > TR > TD#nums {background-color:#000;}");
		/* sourcecode PreLns */	sIR("DIV.fc > TABLE#review_comment_area > TBODY > TR > TD#nums > PRE:first-child,DIV.fc > TABLE#review_comment_area > TBODY > TR > TD#nums > PRE:last-child,DIV.fc > TABLE#review_comment_area > TBODY > TR > TD#lines > PRE.prettyprint:first-child,DIV.fc > TABLE#review_comment_area > TBODY > TR > TD#lines > PRE.prettyprint:last-child {visibility:hidden;}");
		/* side blocks */	sIR("DIV#maincol DIV.pmeta_bubble_bg,DIV#maincol DIV[style='background: rgb(221, 248, 204) none repeat scroll 0%; "+bS('background-clip')+": "+bS('initial')+"; "+bS('background-inline-policy')+": "+bS('initial')+"; margin-bottom: 5px; table-layout: fixed;'],DIV#whb.tip,DIV[style='background: rgb(221, 248, 204) none repeat scroll 0%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; margin-bottom: 5px; table-layout: fixed;'] {margin-top:0.5em; background-color:#333 !important; border:0 none !important; "+bS('radiusAll')+":14px;}");
		/* review nav */	sIR("DIV#maincol > DIV#diff > DIV#review_nav {background-color:#000;}");
		/* note */		sIR("DIV#gc-pagecontent P.note,DIV.g-c-gc-home P.note,DIV#gc-pagecontent P.caution   {background-color:#181818 !important; border:0 none !important; color:#fff; padding-right:0.5em; padding-left:0.5em; "+bS('radiusAll')+":8px;}");
		/* inner tbl hdr */	sIR("DIV#gc-pagecontent TH {background-color:#000 !important; color:#fff !important;}");
		/* inner tbl txt */	sIR("DIV#gc-pagecontent TABLE[style='width: 90%;'] TD,DIV#wikicontent > TABLE > TBODY > TR > TD#wikimaincol P A {color:#777 !important;}");
		/* box bgs */		sIR("DIV.g-c-gc-home DIV,DIV.g-c-gc-home DIV TABLE.columns > TBODY > TR > TD,TABLE.columns TD,TABLE#articlesArchiveTable TD,DIV.jd-descr TABLE TD,DIV.ifOpened DIV.tip,.entry H4, .entry P, .entry DIV,.t5 H4 {background-color:#000 !important; border:0 none;}");
		/* box/table bg ALT */	sIR("DIV.jd-descr TABLE TR.alt TD {background-color:#222 !important;}");
		/* userPg tabs */	sIR("TABLE#mt TH > DIV {"+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}");
		/* userPg updtsTblBg */	sIR(".bubble_bg,.activity-stream-list H4 {background-color:#222;}");
		/* userPg uddtsTblRw */	sIR("UL.activity-stream LI {background-color:#151515;}");
		/* pplTblHBg */		sIR(".results TH {background-color:#222; border-color:#181818;}");
		/* pplTblCBg */		sIR(".results TD {background-color:#151515;}");
		/* download lnkBg */	sIR("DIV[style='background: rgb(221, 248, 204) none repeat scroll 0%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; margin-bottom: 5px;'] {color:#000; "+bS('radiusAll')+":14px;}");
		/* directory navLine */	sIR("#codesiteContent .nav {border-color:#333;}");
		/* directory navSel */	sIR("#codesiteContent #productsNav .sel,#codesiteContent #resourcesNav .sel {background-color:#333; "+bS('border-radius-topleft')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* projCreate r-box */	sIR("#maincol .tip {background-color:#181818; "+bS('radiusAll')+":14px;}");
		/* bottom pagination */	sIR("DIV.gsc-cursor-box > DIV.gsc-cursor > DIV.gsc-cursor-page {color:#ccc;}");
	}


	// Knol
	else if(iO(lH,"knol.google.")>-1){
		/* applyGlobals */	Ge();

		/* site body */		sIR(".knol-doc-welcome,#knol-doc {background-color:#000 !important;}");
		/* head bar */		sIR("#knol-doc-hd,#knol-header,#knol-static-doc-hd {background-color:#000;}");
		/* head txt */		sIR("H1,H2,H3,H4,.knol-search-results-title {color:#fff;}");
		/* home top box */	sIR("#knol-home-top {background-color:#222; color:#fff; "+bS('radiusAll')+":14px;}");
		/* home Lblock Ttp */	sIR("#knol-home-tabpane-c {background-color:#333; "+bS('radiusAll')+":14px;}");
		/* home Lblock TtpT */	sIR(".goog-tabpane-tab {background-color:#333 !important;}");
		/* home Lblock TtpT */	sIR(".goog-tabpane-tab-selected {position:relative; top:1px; color:#fff !important; "+bS('border-radius-topright')+":14px !important; "+bS('border-radius-topleft')+":14px !important; "+bS('border-radius-bottomright')+":0 !important;}");
		/* home Lblock B */	sIR(".knol-doc-welcome .goog-tabpane, .knol-doc-welcome .goog-tabpane-tab, .knol-doc-welcome .goog-tabpane-tab-selected, .knol-doc-welcome .goog-tabpane-cont {padding-left:10px; background-color:#181818; "+bS('border-radius-topleft')+":8px; "+bS('border-radius-bottomright')+":14px;}");
		/* home rCol Cntnr */	sIR("#knol-home-main-collab {background-color:#222; "+bS('radiusAll')+":14px;}");
		/* home rCol innerC */	sIR("#knol-home-main-collab > DIV {padding:5px; background-color:#000; "+bS('radiusAll')+":14px;}");
		/* home rCol innerBg */	sIR("#knol-home-main-collab DIV {background-color:#000; color:#999;}");
		/* gCstmBtn create */	sIR("#knol-create-invite .goog-custom-button-inner-box {min-width:7.2em;}");
		/* advSrchHiddenBtn */	sIR("INPUT[style='border: medium none ; width: 0pt; height: 0pt;']#knol-advancedsearch-button {display:none;}");
		/* searchAdvBox */	sIR("#knol-advancedsearch-options {padding:10px; background-color:#222; "+bS('radiusAll')+":14px;}");
		/* searchResBody */	sIR(".knol-search-results,#knol-doc-bd {background:#000 none !important;}");
		/* rCol boxes */	sIR("#knol-sidebar > DIV,.knol-author-toolbox-public,.knol-author-toolbox-private {margin-top:1em; background-color:#222; border:0 none; "+bS('radiusAll')+":14px;}");
		/* rCol boxeNoBg */	sIR("#knol-sidebar > DIV:first-child,#knol-create-invite,#knol-feedlinks-knol,#knol-abuse-report {background-color:#000 !important; "+bS('radiusAll')+":0;}");
		/* rCol box title */	sIR(".knol-toolbox-message {background-color:transparent; color:#fff;}");
		/* pgTop head line */	sIR("#knol-article-top-hr {margin-bottom:1em;}");
		/* link boxes */	sIR(".knol-viewlinks-link-element,.knol-citation {background-color:#222; border:0 none; color:#ccc; "+bS('radiusAll')+":14px;}");
		/* collection box */	sIR(".knol-collection-box {background-color:#333; border:0 none !important; "+bS('radiusAll')+":14px;}");
		/* blockquote box */	sIR("[style='background-color: rgb(243, 243, 243);'],[style='background-color: rgb(243, 243, 243);'] [style='background-color: rgb(255, 255, 255);'] {padding:0.5em; background-color:#222 !important; "+bS('radiusAll')+":14px;}");
		/* author box bg */	sIR("#knol-content > #knol-author-page-tabs {background-color:#000 !important;}");
		/* author tab */	sIR("#knol-content > #knol-author-page-tabs .goog-tabpane-tab {background-color:#000 !important;}");
		/* author tab */	sIR("#knol-content > #knol-author-page-tabs .goog-tabpane-cont {color:#999; "+bS('radiusAll')+":14px;}");
		/* author knol box */	sIR("#knol-searchresults-id .knol-search-background {padding:0.5em; background-color:#333; border:0 none; "+bS('radiusAll')+":14px;}");
		/* page txt */		sIR("#knol-doc,#knol-content-body,.knol-comment-text {color:#999;}");
		/* page txtHilite */	sIR("LI > B,#knol-content-body B,.knol-search-knol-info-details,.knol-search-results-count, .knol-no-search-results, .knol-leaves-dropped {color:#ccc;}");
		/* page img bgs */	sIR("#knol-content-body IMG {padding:2px; background-color:#ccc;}");
		/* page keyBtn txt */	sIR("#knol-content-body B[style='border-style: outset; border-width: 0.2em; padding: 0.1em 0.4em; background: rgb(225, 225, 225) none repeat scroll 0%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;'] {color:#000;}}");
		/* knol page qSel Bg */	sIR("#knol-doc .knol-scores-selected {background-color:#000; "+bS('radiusAll')+":14px;}");
		/* nav tree txt */	sIR(".goog-tree-item-label {color:"+lc+";}");
		/* comment hdr */	sIR("#knol-comment-header,#knol-approved-comment-header {background-color:#333; border:0 none; "+bS('radiusAll')+":14px;}");
		/* comment signinBar */	sIR("#knol-comment-new,#knol-comment-new-sign-in {padding:15px 0 5px 0; background-color:transparent; border:0 none;}");
		/* comment */		sIR(".knol-comment {background-color:#222; border:0 none;"+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}");
		/* commentAuthorPic */	sIR(".knol-comment-author-c {background-color:#000; "+bS('radiusAll')+":14px;}");
		/* commentComment/my */	sIR(".knol-comment-replies,.knol-comment-reply-author,.knol-comment-reply-sign-in-block,.knol-comment-my-reply {background-color:#181818; border:0 none; border-bottom:1px solid #000 !important;}");
		/* editPg txtBoxes */	sIR("BODY[hidefocus='true'][g_editable='true'].editable,#knol-title-input,#knol-subtitle-input {background-color:#fff !important;}");
		/* editPg txtBoxTbox */	sIR("#knol-title-input,#knol-subtitle-input,#knol-abstract-input {color:#333 !important;}");
		/* pref box */		sIR("#knol-settings-pane {background-color:#000;}");
		/* pref content box */	sIR("#knol-settings-pane .goog-tabpane-cont {background-color:#222; "+bS('radiusAll')+":14px;}");
		/* pref tab sel */	sIR("#knol-settings-pane .goog-tabpane-tab,#knol-settings-pane .goog-tabpane-tab-selected {top:0 !important; background-color:#000 !important; border:0 none !important}");
		/* name verify box */	sIR("#idv-credit-card,#idv-submit-status {background-color:#222; "+bS('radiusAll')+":14px;}");
		/* name verify boxI */	sIR("#idv-credit-card .goog-tabpane-cont,#idv-submit-status .goog-tabpane-cont {background-color:#000; "+bS('radiusAll')+":14px;}");
		/* ads */		if(uHideAds)sIR("#knol-home-promotion,#knol-adsense-long {display:none;}");
		/* footer bg */		sIR("#knol-footer-menu {padding-bottom:0.5em; background-color:#000;}");
		/* footer (c) */	if(uHideFooters)sIR("#knol-copyright,BODY > DIV.g-doc-800 > DIV.footer {display:none;}");
	}


	// Sites
	else if(iO(lH,"sites.google.")>-1){
		/* applyGlobals */	if(iO(lH,"/site/")==-1||(iO(lH,"/site/")>-1&&$("sites-page-info-bar")!=null)||iO(lH,"/site/sites/")>-1||iO(lH,"/system/app/pages/")>-1)Ge(); //No [live] Sites

		/* head bar bgs */	sIR("DIV.sites-header-divider,DIV.sites-header-divider > DIV.sites-account {background-color:#000 !important; color:#fff !important;}");
		/* logo img [hide] */	sIR("BODY > DIV.sites-header > TABLE#sites-chrome-header > TBODY > TR:first-child > TD#sites-header-title > A > IMG.goog-ws-logo {display:none;}");
		/* sites logo [hide] */	sIR("DIV#sites-page-info-bar > TABLE:first-child > TBODY > TR:first-child > TD.sites-app-title:first-child > A > IMG#sites-logo,BODY#body > DIV#sites-system-top-bar > TABLE:first-child > TBODY > TR:first-child > TD:first-child > IMG#sites-system-logo,BODY#body > DIV#sites-page-toolbar > TABLE > TBODY > TR > TD.sites-admin-title > A#sites-admin-logo-link > IMG.goog-logo {visibility:hidden;}");
		/* logo img [insert] */	sIR("BODY > DIV.sites-header > TABLE#sites-chrome-header > TBODY > TR:first-child > TD#sites-header-title,DIV#sites-page-info-bar > TABLE:first-child > TBODY > TR:first-child > TD.sites-app-title:first-child,BODY#body > DIV#sites-system-top-bar > TABLE:first-child > TBODY > TR:first-child > TD:first-child,BODY#body > DIV#sites-page-toolbar > TABLE > TBODY > TR > TD.sites-admin-title {height:50px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important;}");
		/* site head linx */	sIR("DIV.sites-header-divider A {color:"+lc+" !important;}");
		/* site head linxV */	sIR("DIV.sites-header-divider A:visited {color:"+vl+" !important;}");
		/* site head linxM */	sIR("DIV.sites-header-divider A.gb3,DIV.sites-header-divider A.gb3:visited {color:#ccc !important;}");
		/* site head linxL */	sIR("DIV.sites-header-divider DIV#gbar DIV.gbm {background-color:#333; border:0 none; color:#fff;}");
		/* dhtml menu box */	sIR(".goog-menu {background-color:#222 !important;}");
		/* dhtml menu itmHlt */	sIR(".goog-menu .goog-menuitem-highlight {background-color:#555 !important; cursor:pointer;}");
		/* dhtml menu itm */	sIR(".goog-menu .goog-menuitem A {color:#ccc !important;}");
		/* head title */	sIR("BODY > DIV.sites-header > TABLE#sites-chrome-header > TBODY > TR:first-child > TD#sites-header-title > SPAN.sites-chrome-header-title {padding-left:155px; color:#fff;}");
		/* createPg head tlC */	sIR("BODY#body > DIV#sites-system-top-bar > TABLE:first-child > TBODY > TR:first-child > TD:first-child {width:160px;}");
		/* createPg head tl */	sIR("BODY#body > DIV#sites-system-top-bar > TABLE:first-child > TBODY > TR:first-child > TD:last-child > SPAN#sites-system-header-title {color:#fff;}");
		/* createNew boxO */	sIR("BODY#body DIV.goog-ws-wrapper DIV.sites-dash-empty-section-wrapper {border:0 none;}");
		/* createNew boxO */	sIR("BODY#body DIV.goog-ws-wrapper DIV.sites-dash-empty-section {background-color:#333; border:0 none; "+bS('radiusAll')+":14px;}");
		/* create mgrBody */	sIR("BODY#body DIV.goog-ws-wrapper DIV#goog-ws-createNewSite,BODY#body DIV#sites-chrome-everything > DIV#sites-chrome-main-wrapper > TABLE#sites-chrome-main > TBODY > TR > TD#sites-canvas {background-color:#000 !important;}");
		/* createNew selTmpl */	sIR("BODY#body .goog-ws-color,BODY#body DIV.goog-ws-wrapper DIV#goog-ws-createNewSite DIV.sites-dash-gallery,BODY#body DIV#sites-chrome-everything #sites-canvas DIV.goog-iconpicker-item {border-color:#333; cursor:pointer; "+bS('radiusAll')+":14px;}");
		/* createPg SelTitle */	sIR("BODY#body .goog-iconpicker-item-selected .goog-iconpicker-item-title {"+bS('border-radius-bottomright')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* createNew expTtl */	sIR("BODY#body DIV.goog-ws-wrapper DIV#goog-ws-createNewSite .sites-expando-title {color:#fff;}");
		/* siteAdmin hdrBar */	sIR("BODY#body DIV#sites-page-info-bar,BODY#body DIV#sites-page-info-bar .sites-app-title,BODY#body DIV#sites-page-info-bar #page-btns,BODY#body DIV.sites-editor-toolbar-menurow  {background-color:#000;}");
		/* siteAdmin hdrTtl */	sIR("BODY#body DIV#sites-page-info-bar .sites-site-name,BODY#body DIV.sites-editor-toolbar-menurow DIV,DIV#sites-chrome-main-wrapper H2 {color:#fff;}");
		/* siteAdmin hdrLtxt */	sIR("BODY#body DIV#sites-page-info-bar .sites-site-name,BODY#body DIV#sites-page-info-bar #version-history,BODY#body > DIV#sites-page-toolbar > TABLE > TBODY > TR > TD.sites-admin-title > SPAN.sites-site-name {position:relative; top:14px; left:14px; color:#fff;}");
		/* siteAdmin edtPgBg */	sIR("BODY#sites-tile-name-content-1-editing-editable-content,BODY#sites-tile-name-content-1-editing-editable-content:root {background-color:#fff !important;}");
		/* adminMngr brdrC */	sIR("TABLE#sites-chrome-main > TBODY > TR > TD.sites-admin-content-pane:last-child {"+bS('border-radius-topleft')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* adminMngr R-Boxes */	sIR(".sites-admin-content-pane-wrapper > .goog-ws-shar-right,.goog-ws-setup-wrapper .goog-ws-settings-quota {background-color:#333; border:0 none; "+bS('radiusAll')+":14px;}");
		/* adminMngr tblHdr */	sIR(".sites-admin-content-pane .sites-table TH {background-color:#555; color:#ccc;}");
		/* adminMngr tblDvdr */	sIR(".sites-admin-content-pane .sites-admin-page-templates-divider {background-color:#222 !important;}");
		/* adminMngr layoutC */	sIR("BODY#body .goog-ws-layout-boxes DIV,BODY#body #sites-theme-var-list {color:#000;}");
		/* adminMngr pageTxt */	sIR(".goog-ws-colors-table-secondary LABEL {color:#ccc !important;}");
		/* adminMngr cPicker */	sIR("BODY.picker-page > .main {background-color:#000;}");
		/* adminMngr templT */	sIR("DIV.goog-ws-wrapper #sites-admin-template-header {background-color:#333; border:0 none; "+bS('radiusAll')+":14px;}");
		/* footer */		if(uHideFooters)sIR("BODY#body > DIV.sites-dash-footer {display:none;}");
	}


	// More Products
	else if(iO(lH,".google.")>-1&&(iO(lH,Gtld+"/options/")>-1||(iO(lH,"/intl/")>-1&&iO(lH,"/options/")>-1))){
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("BODY > DIV#id > H1#logo > A > IMG,BODY.search > TABLE[width='95%'] > TBODY > TR > TD[width='1%'] > A[href='/'] > IMG[width='143'] {display:none;}");
		/* logo img [insert] */	sIR("BODY > DIV#id > H1#logo,BODY.search > TABLE[width='95%'] > TBODY > TR > TD[width='1%'] {width:150px !important; height:60px !important; background:transparent url('"+gL+"') no-repeat scroll top left !important; font-size:0;}");
		/* header line */	sIR("BODY.search > TABLE > TBODY > TR > TD > TABLE[width='100%']:first-child > TBODY > TR > TD[style='background-color: rgb(51, 102, 204);'] {display:none;}");
		/* header */		sIR("H2,BODY.search > TABLE > TBODY > TR > TD > TABLE[width='100%'] > TBODY > TR > TD[style='background-color: rgb(229, 236, 249);'],BODY.search > TABLE[width='95%'] TD[style='background-color: rgb(216, 228, 241);'] {background-color:#333 !important; border:0 !important; "+bS('radiusAll')+":14px;}");
		/* tblBg */		sIR("BODY.search > TABLE[width='95%'] > TBODY > TR > TD,BODY.search > TABLE[width='95%'] > TBODY > TR > TD > DIV.content > TABLE > TBODY > TR > TD,BODY.search TABLE.sidebarborder > TBODY > TR > TD[bgcolor='#cccccc'],TABLE.sidebar {background-color:#000 !important;}");
		/* r-side boxT */	sIR("BODY.search .sidebarborder .sidebar TR[bgcolor='#eeeeee'],BODY.search TD#sidebartitle {background-color:#333; "+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}");
		/* r-side boxB */	sIR("BODY.search .sidebarborder .sidebar TR:last-child,BODY.search TD#sidebarcontent {background-color:#222; "+bS('border-radius-bottomright')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* l-menu line */	sIR("BODY.search > TABLE[width='95%'] > TBODY > TR > TD[width='1'][style='background-color: rgb(204, 204, 204);'] {background-color:#000 !important; border-left:1px dotted #333;}");
		/* l-menu spc */	sIR("BODY.search > TABLE[width='95%'] > TBODY > TR > TD[width='10'][style='background-color: rgb(255, 255, 255);'] {background-color:#000 !important;}");
		/* l-menu srchBox */	sIR("TD[style='background-color: rgb(239, 239, 239);'] {background-color:#333 !important; "+bS('radiusAll')+":14px;}");
		/* footer */		if(uHideFooters)sIR("BODY > DIV#about,BODY.search > TABLE:last-child > TBODY > TR:last-child {display:none;}");
	}


	// Web History & Bookmarks
	else if(iO(lH,".google.")>-1&&(iO(lH,"/history")>-1||iO(lH,"/bookmarks/")>-1)){
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("BODY > TABLE[width='100%'] > TBODY > TR > TD[width='3'][valign='top']:first-child > A.lg > IMG {display:none;}");
		/* logo img [insert] */	sIR("BODY > TABLE[width='100%'] > TBODY > TR > TD[width='3'][valign='top']:first-child,BODY > TABLE[class='noborder center elem'][style='width: 750px; margin-left: auto; margin-right: auto;'] > TBODY > TR:first-child > TD:first-child {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll top left !important; font-size:0;}");
		/* header line */	sIR("BODY > TABLE[width='100%'] > TBODY > TR:first-child > TD[height='1'][bgcolor='#3366cc'][colspan='2'] {display:none;}");
		/* header */		sIR("BODY > TABLE[width='100%'] > TBODY > TR > TD[bgcolor='#e5ecf9'] {background-color:#333; border:0; color:#000; "+bS('radiusAll')+":14px;}");
		/* menu item */		sIR("TR.off TD,TR.off2 TD {background-color:#333;}");
		/* menu selected */	sIR("TR.on TD {background-color:#555 !important;}");
		/* menu r-line */	sIR("BODY > TABLE[width='100%'] > TBODY > TR > TD[width='1'][bgcolor='#b0c3e6'] {background-color:#333;}");
		/* r-Calendar box */	sIR("TD[align='center'][style='border: 1px solid rgb(201, 215, 241); padding: 6px;'] {border:5px solid #333 !important; "+bS('radiusAll')+":14px;}");
		/* r-Calendar u-row */	sIR("TD[align='center'][style='border: 1px solid rgb(201, 215, 241); padding: 6px;'] > TABLE[cellpadding='1']:first-child > TBODY > TR[bgcolor='#ffffff']:first-child {background-color:transparent;}");
		/* r-Calendar u-rnd */	sIR("TD[align='center'][style='border: 1px solid rgb(201, 215, 241); padding: 6px;'] > TABLE[cellpadding='1']:first-child > TBODY > TR[bgcolor='#ffffff']:first-child > TD {background-color:#fff; "+bS('border-radius-topright')+":8px; "+bS('border-radius-topleft')+":8px;}");
		/* r-Calendar l-row */	sIR("TD[align='center'][style='border: 1px solid rgb(201, 215, 241); padding: 6px;'] > TABLE[cellpadding='5'] > TBODY > TR:last-child {background-color:transparent;}");
		/* r-Calendar ll-rnd */	sIR("TD[align='center'][style='border: 1px solid rgb(201, 215, 241); padding: 6px;'] > TABLE[cellpadding='5'] > TBODY > TR:last-child > TD:first-child {"+bS('border-radius-bottomleft')+":8px;}");
		/* r-Calendar lr-rnd */	sIR("TD[align='center'][style='border: 1px solid rgb(201, 215, 241); padding: 6px;'] > TABLE[cellpadding='5'] > TBODY > TR:last-child > TD:last-child {"+bS('border-radius-bottomright')+":8px;}");
		/* r-Calendar u-txt */	sIR("TD[align='center'][style='border: 1px solid rgb(201, 215, 241); padding: 6px;'] TD {color:#000 !important;}");
		/* r-Calendar l-txt */	sIR("TD[align='center'][style='border: 1px solid rgb(201, 215, 241); padding: 6px;'] CENTER TD SPAN.c {color:#999 !important;}");
		/* r-Calendar tagln */	sIR("BODY > TABLE[width='100%'] > TBODY > TR > TD[width='1%'][valign='top'][align='center'] > TABLE > TBODY > TR > TD > FONT[size='-1'] > NOBR {color:#555;}");
		/* timeslot */		sIR("TABLE.res TD.ts {background-color:#131313;}");
		/* bookmark btn */	sIR("DIV[style='padding-top: 23px; font-size: smaller;'] > SPAN[style='line-height: 1.5;'] > A[style='border: 2px groove black; padding: 0px 5px 2px; background-color: rgb(221, 221, 221); color: black; font-family: sans-serif; text-decoration: none; font-size: 10pt; margin-top: 5px;'] {background-color:#333 !important; "+bS('radiusAll')+":14px;}");
		/* pagination imgs */	sIR("DIV.n DIV.nf > IMG,DIV.n DIV.nc > IMG,DIV.n DIV.nn > IMG {display:none;}");
		/* footer blocks */	sIR("TD.bl,BODY > DIV[style='border-style: solid; border-color: rgb(51, 102, 204); border-width: 1px 0pt; padding: 20px 0pt; background-color: rgb(229, 236, 249); clear: both; margin-top: 20px; text-align: center;'] {background-color:#000 !important; border:0 none !important;}");

		/* plgPg logo [hide] */	sIR("BODY > TABLE[class='noborder center elem'][style='width: 750px; margin-left: auto; margin-right: auto;'] > TBODY > TR:first-child > TD:first-child > IMG[height='55'] {visibility:hidden;}");
		/* plgPg header bg */	sIR("BODY > TABLE[class='noborder center elem'][style='width: 750px;'] > TBODY > TR > TD[colspan='3'] {background-color:#000 !important; border:0 none !important;}");
		/* plgPg header */	sIR("BODY > TABLE[class='noborder center elem'][style='width: 750px;'] > TBODY > TR > TD[colspan='3'] > DIV.textcenter {background-color:#333 !important; "+bS('radiusAll')+":14px;}");
		/* plgPg terms box */	sIR("BODY > TABLE.center {background-color:#000 !important; border:0 none !important;}");
		/* plgPg terms btns */	sIR("BODY > TABLE.center A {color:#fff !important;}");
	}


	// My Account
	else if(iO(lH,".google."+Gtld+"/accounts/")>-1){
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("BODY > DIV.header > A > IMG,BODY > TABLE[width='95%'] > TBODY > TR:first-child > TD[width='1%'] > A > IMG[width='143'] {display:none;}");
		/* logo img [insert] */	sIR("BODY > DIV.header,BODY > TABLE[width='95%'] > TBODY > TR:first-child > TD[width='1%'] {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important; font-size:0;}");
		/* boxBgs */		sIR("BODY > TABLE[width='95%'] > TBODY > TR:first-child > TD:last-child {background-color:#000 !important;}");
		/* header line */	sIR("BODY > TABLE[width='95%'] > TBODY > TR:first-child > TD:last-child TD[style='background-color: rgb(51, 102, 204);'] {display:none;}");
		/* header */		sIR("BODY > TABLE[width='95%'] > TBODY > TR:first-child > TD:last-child > TABLE[width='100%'][cellpadding='2'] > TBODY > TR > TD[style='background-color: rgb(229, 236, 249);'] {background-color:#333 !important; "+bS('radiusAll')+":14px;}");
		/* left nav */		sIR("BODY.search > TABLE > TBODY > TR[valign='top']:first-child > TD:first-child {background-color:#000; border-right:1px dotted #333;}");
		/* left nav bar */	sIR("BODY.search > TABLE > TBODY > TR[valign='top']:first-child > TD {background:#000 none !important;}");
		/* notify box */	sIR("BODY > DIV.body > TABLE > TBODY > TR > TD > SPAN[style='padding: 5px; background-color: rgb(255, 255, 153);'] {color:#000 !important; "+bS('radiusAll')+":14px;}");
		/* page txt */		sIR("TD#currPasswdDiv FONT,TD#secretQuestionDiv FONT {color:#999;}");
		/* pass strgnth box */	sIR("BODY > DIV.body FORM[action='UpdatePasswd'] > TABLE[cellpadding='2'] > TBODY > TR > TD[valign='top'] > TABLE[bgcolor='#ffffff'],TD#passwdBarDiv {background-color:#000;}");
		/* promo boxes */	sIR("#purchasebox,#eyefi_promo {padding:1px 5px 5px 5px; background-color:#333; border:0 none; "+bS('radiusAll')+":14px;}");
		/* footer */		if(uHideFooters)sIR("BODY > DIV.footer,BODY > TABLE[width='95%']:last-child > TBODY > TR:last-child {display:none;}");
	}


	// Dashboard
	else if(iO(lH,".google."+Gtld+"/dashboard/")>-1){
		/* logo img [hide] */	sIR("BODY > DIV > DIV.gwt-HTML > A > IMG,IMG.G1am5bcvA {display:none;}");
		/* logo img [insert] */	sIR("BODY > DIV > DIV.gwt-HTML:first-child {position:relative; bottom:13px; width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll top left !important; font-size:0;}");
		/* header */		sIR("BODY > DIV > DIV > DIV.gwt-Label {background-color:#333; border:0 none; color:#000; "+bS('radiusAll')+":14px;}");
		/* action boxes */	sIR("BODY > DIV > DIV > DIV > DIV > DIV > DIV > DIV {background-color:#000 !important;}");
		/* footer */		if(uHideFooters)sIR("BODY > DIV > DIV.G1am5bcvE {display:none;}");
	}


	// Alerts
	else if(iO(lH,".google."+Gtld+"/alerts")>-1){
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("BODY TABLE:first-child > TBODY > TR > TD[width='150'][rowspan='3'] > A > IMG[height='40'] {visibility:hidden;}");
		/* logo img [insert] */	sIR("BODY TABLE:first-child > TBODY > TR > TD[width='150'][rowspan='3'] {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll top left !important; font-size:0;}");
		/* head blank bar */	sIR("BODY > TABLE > TBODY > TR > TD > TABLE[cellpadding='3'] > TBODY > TR > TD[width='100%'][valign='top'] > TABLE[bgcolor='#e0e5ff'] {display:none;}");
		/* create box cntnr */	sIR("TABLE[width='320'][cellpadding='1'] > TBODY > TR:first-child > TD[bgcolor='#3366cc'] {background-color:#000;}");
		/* create box head */	sIR("TABLE[width='320'][cellpadding='1'] > TBODY > TR:first-child > TD[bgcolor='#3366cc'] > TABLE[bgcolor='#e0e5ff'] {background-color:#333; "+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}");
		/* create box body */	sIR("TABLE[width='320'][cellpadding='1'] > TBODY > TR:first-child > TD[bgcolor='#3366cc'] > TABLE[bgcolor='#ffffff'] {background-color:#222; "+bS('border-radius-bottomright')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* header line */	sIR("BODY > TABLE:first-child > TBODY > TR > TD[width='100%'][valign='top'] > TABLE[bgcolor='#3366cc']:first-child {display:none;}");
		/* header */		sIR("BODY > TABLE:first-child > TBODY > TR > TD[width='100%'][valign='top'] > TABLE[bgcolor='#e0e5ff'] {background-color:#333; border:0 none; "+bS('radiusAll')+":14px;}");
		/* listing head line */	sIR("BODY > TABLE.section {border:0 none;}");
		/* listing h/f r-bg */	sIR("BODY > TABLE.section > TBODY > TR[bgcolor='#e0e5ff'] {background-color:transparent;}");
		/* listing h/f c-bg */	sIR("BODY > TABLE.section > TBODY > TR[bgcolor='#e0e5ff'] TD {background-color:#222;}");
		/* listing head-r */	sIR("BODY > TABLE.section > TBODY > TR[bgcolor='#e0e5ff']:first-child > TD:last-child {"+bS('border-radius-topright')+":8px;}");
		/* listing head-l */	sIR("BODY > TABLE.section > TBODY > TR[bgcolor='#e0e5ff']:first-child > TD:first-child {"+bS('border-radius-topleft')+":8px;}");
		/* listing foot-r */	sIR("BODY > TABLE.section > TBODY > TR[bgcolor='#e0e5ff']:last-child > TD:last-child {"+bS('border-radius-bottomright')+":8px;}");
		/* listing foot-l */	sIR("BODY > TABLE.section > TBODY > TR[bgcolor='#e0e5ff']:last-child > TD:first-child {"+bS('border-radius-bottomleft')+":8px;}");
		/* footer */		if(uHideFooters)sIR("BODY > TABLE > TBODY > TR > TD > DIV.footer {display:none;}");
	}


	// Ratings
	else if(iO(lH,".googleratings.")>-1){
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("BODY.body > FORM#ctlform > TABLE[width='100%'] > TBODY > TR:first-child > TD[width='1']:first-child > A > IMG[height='59'],BODY > FORM[name='ctlform']:first-child > TABLE[width='100%'] > TBODY > TR:first-child > TD[width='1%'] > A > IMG[width='143'] {display:none;}");
		/* logo img [insert] */	sIR("BODY.body > FORM#ctlform > TABLE[width='100%'] > TBODY > TR:first-child > TD[width='1']:first-child,BODY > FORM[name='ctlform']:first-child > TABLE[width='100%'] > TBODY > TR:first-child > TD[width='1%'] {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 0 -5px !important; font-size:0;}");
		/* header line */	sIR("BODY > FORM[name='ctlform']:first-child > TABLE[width='100%'] > TBODY > TR:first-child > TD:last-child > TABLE[width='100%'] > TBODY > TR > TD[style='background-color: rgb(0, 102, 51);'] {display:none;}");
		/* header */		sIR("BODY.body > FORM#ctlform > TABLE[width='100%'] > TBODY > TR > TD > DIV.surveyname,BODY > FORM[name='ctlform']:first-child > TABLE[width='100%'] > TBODY > TR:first-child > TD:last-child > TABLE[width='100%'] > TBODY > TR > TD[style='background-color: rgb(222, 239, 224);'] {background-color:#333 !important; color:#fff; "+bS('radiusAll')+":14px;}");
		/* page area bg */	sIR("BODY.body > FORM#ctlform > DIV[align='center'] > DIV.pageareabg,TABLE[width='700'] TD[bgcolor='#efefef'] {background-color:#000; color:#999;}");
		/* bold txt */		sIR("BODY.body > FORM#ctlform > DIV[align='center'] > DIV.pageareabg B,BODY.body > FORM#ctlform > DIV[align='center'] > DIV.pageareabg STRONG {color:#ccc;}");
		/* q-a section txt */	sIR("BODY.body > FORM#ctlform > DIV[align='center'] > DIV.pageareabg .qtext {color:#fff;}");
		/* q-a section txtC */	sIR("BODY.body > FORM#ctlform > DIV[align='center'] > DIV.pageareabg .question .comment {color:#999;}");
		/* q-a section box */	sIR("BODY.body > FORM#ctlform > DIV[align='center'] > DIV.pageareabg .qianswersection {padding-top:5px; background-color:#222; color:#fff; "+bS('radiusAll')+":14px;}");
		/* q-a section tblC1 */	sIR("BODY.body > FORM#ctlform TABLE .qigscale,BODY.body > FORM#ctlform TABLE .qiglabelalternating1,BODY.body > FORM#ctlform TABLE .qiginputalternating1 {padding-bottom:3px; background-color:#000; border-color:#151515;}");
		/* q-a section tblC2 */	sIR("BODY.body > FORM#ctlform TABLE .qiginput,BODY.body > FORM#ctlform TABLE .qiglabelalternating2,BODY.body > FORM#ctlform TABLE .qiginputalternating2 {padding-bottom:3px; background-color:#333; border-color:#151515;}");
		/* q-a section input */	sIR("BODY.body > FORM#ctlform > DIV[align='center'] > DIV.pageareabg .qinput {background-color:transparent;}");
		/* bottom line */	sIR("BODY.body > FORM#ctlform > HR[style='border-width: 0px; width: 100%; color: rgb(212, 223, 244); height: 1px; background-color: rgb(212, 223, 244);'] {background-color:#333 !important; color:#333 !important;}");
	}


	// App Engine
	else if(iO(lH,"appengine.google.")>-1){
		/* applyGlobals */	Ge();

		/* logo img [replce] */	sIR("DIV#hd > DIV.g-unit:first-child > P > A#ae-logo {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important; font-size:0;}");
		/* head bg */		sIR("DIV#hd {background-color:#000 !important;}");
		/* head bar */		sIR("BODY > DIV.g-doc-800 > DIV#ae-appbar-sml {height:1px !important; background-color:#333 !important;}");
		/* headers */		sIR("#ae-appbar-lrg,H2#ae-billing-header,.ae-billing-budget-section H2 {background-color:#333 !important; border:0 none; "+bS('radiusAll')+":14px;}");
		/* menu selected */	sIR("#ae-nav .ae-nav-selected {background-color:#333; text-decoration:none; color:#ccc !important;}");
		/* menu r-line */	sIR("#ae-lhs-nav {border-color:#333;}");
		/* txt boxes */		sIR(".ae-input-row-group,.ae-message,.ae-nav-group,.ae-table {background-color:#222; border:0 none; "+bS('radiusAll')+":14px;}");
		/* tbl cntnr */		sIR(".ae-ie6-c {background-color:#000;}");
		/* tbl brdr */		sIR(".ae-table {border:0 none !important;}");
		/* tbl hdr */		sIR("#bd H2.ae-table-title,.ae-table-caption, .ae-table CAPTION {background-color:#222; border:0 none; color:#fff; "+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}");
		/* tbl hdr Ltxt */	sIR(".g-c > .g-section > .g-first:first-child > STRONG:first-child {padding-left:3px;}");
		/* tbl b */		sIR(".ae-table TH, .ae-table TD,.ae-table,.ae-table THEAD TH {background-color:#151515 !important; border:1px solid #222 !important;}");
		/* tbl bR */		sIR(".ae-table TH:last-child {"+bS('border-radius-bottomright')+":14px;}");
		/* tbl bL */		sIR(".ae-table TH:first-child {"+bS('border-radius-bottomleft')+":14px;}");
		/* graph tbl brdr */	sIR("#ae-dash-graph-c {padding-bottom:8px; padding-left:7px; border-color:#222; "+bS('border-radius-bottomright')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
	}


	// Product Ideas
	else if(iO(lH,"productideas.appspot.")>-1){
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("DIV.moderator-icon-panel > DIV.gwt-Hyperlink > A[href='#0'] > IMG {display:none;}");
		/* logo img [insert] */	sIR("DIV.moderator-icon-panel > DIV.gwt-Hyperlink {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important; font-size:0;}");
		/* page title */	sIR("DIV.qdb-LandingPage .LabelHeader,.qdb-CreateSessionPanel .LabelHeader {color:#fff !important;}");
		/* top box */		sIR("DIV.qdb-LandingPage > DIV:first-child > DIV:last-child {padding-left:0.5em; background-color:#151515; color:#fff; "+bS('radiusAll')+":14px;}");
		/* header */		sIR("DIV.qdb-LandingPage .fork,DIV.qdb-LandingPage .decorator {background-color:#333 !important; "+bS('radiusAll')+":14px;}");
		/* menu selected */	sIR("TABLE.qdb-QuestionDbPanel .fork,TABLE.qdb-QuestionDbPanel .decorator {background-color:#333; "+bS('border-radius-topleft')+":14px; "+bS('border-radius-bottomleft')+":14px;}");
		/* menu selectedA */	sIR("TABLE.qdb-QuestionDbPanel .fork A {color:#fff !important;}");
		/* mySignaturePnl */	sIR(".qdb-MySignaturePanel .featured {background-color:transparent; border:0 none; "+bS('radiusAll')+":14px;}");
		/* mySignaturePnlSnm */	sIR(".qdb-MySignaturePanel .text-least {color:#999 !important;}");
		/* cntnr corner imgs */	sIR("TABLE.qdb-SeriesPanel > TBODY > TR:first-child > TD:first-child > DIV > DIV > DIV DIV.top > IMG,TABLE.qdb-SeriesPanel > TBODY > TR:first-child > TD:first-child > DIV > DIV > DIV DIV.bottom > IMG,TABLE.qdb-SeriesPanel > TBODY > TR:first-child > TD.qdb-CenterPanelExtender > IMG,.qdb-AskQuestionPanel .top > IMG {visibility:hidden;}");
		/* cntnr left-bar */	sIR("TABLE.qdb-SeriesPanel > TBODY > TR:first-child > TD.qdb-CenterPanelExtender {padding-left:20px; background-color:#333; "+bS('border-radius-topleft')+":14px;}");
		/* cntnr header-bar */	sIR(".qdb-BaseTopicPanel .TopicHeader {background-color:#333 !important;}");
		/* cntnr headTtlSel */	sIR(".qdb-BaseTopicPanel .DescriptionPanel-Selected {background-color:#333 !important;}");
		/* cntnr headTtlSelT */	sIR(".qdb-BaseTopicPanel .DescriptionPanel-Selected SPAN {color:#fff !important;}");
		/* cntnr topicPnl */	sIR(".qdb-BaseTopicPanel .qdb-TopicMessagePanel,.qdb-BaseTopicPanel .border-inactive,.qdb-BaseTopicPanel .border-inactive .border-shading,.qdb-BaseTopicPanel .border-inactive .border-shading .border,.qdb-BaseTopicPanel .border-inactive .border-shading .border .featured {background-color:#222; border:0 none !important;}");
		/* cntnr topicPnlGI */	sIR("DIV[class='moderator-featured-question-inner-panel3 Gn3nb7gIC border-clear featured'] .fork {"+bS('border-radius-topright')+":14px; "+bS('border-radius-bottomright')+":14px;}");
		/* cntnr innerPnl */	sIR(".qdb-BaseTopicPanel .InnerPanel {border:0 none !important;}");
		/* cntnr bottomPnl */	sIR(".qdb-AskQuestionPanel,.qdb-AskQuestionPanel .AskMinimizedPanel {background-color:#333 !important; border:0 none !important;}");
		/* submtIdea cntnr */	sIR(".qdb-AskQuestionPanel .decorator,.qdb-AskQuestionPanel .content .fork {background-color:#222; "+bS('border-radius-topleft')+":14px;}");
		/* submtIdea cntnrBg */	sIR(".qdb-AskQuestionPanel .content .default-background,.gwt-PopupPanel TABLE {background-color:#000; border:0 none; "+bS('radiusAll')+":14px;}");
		/* page txt */		sIR(".qdb-LandingPage .qdb-RecentSeriesPanel .DescriptionText,TABLE.qdb-SeriesPanel TD,TABLE.qdb-SeriesPanel DIV {color:#999 !important;}");
	}


	// About Google
	else if(iO(lH,".google.")>-1&&(((iO(lH,"about")>-1||iO(lH,"help")>-1||iO(lH,"privacy")>-1||iO(lH,Gtld+"/sitemap")>-1||iO(lH,"dmca")>-1)&&iO(lH,".html")>-1)||($('container')!=null&&$('left-col')!=null&&$('content')!=null))){
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("BODY > DIV.about:first-child > DIV.header:first-child > H1 > A[href='/'] > IMG,BODY > H1:first-child > A > IMG {display:none;}");
		/* logo srch [hide] */	sIR("BODY.search > TABLE[width='95%'][cellspacing='2']:first-child > TBODY > TR:first-child > TD:first-child > A[href='/'] > IMG[width='143'],BODY > DIV#container > TABLE#header > TBODY > TR > TD#logo > A > IMG,BODY > TABLE[width='650'][align='left'] > TBODY > TR:first-child > TD[width='1%'] > A > IMG[width='143'] {visibility:hidden;}");
		/* logo img [insert] */	sIR("BODY.search > TABLE[width='95%'][cellspacing='2']:first-child > TBODY > TR:first-child > TD:first-child,BODY > DIV#container > TABLE#header > TBODY > TR > TD#logo,BODY > TABLE[width='650'][align='left'] > TBODY > TR:first-child > TD[width='1%'] {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important;}");
		/* logo home [insrt] */	sIR("BODY > DIV.about:first-child > DIV.header:first-child > H1 {width:215px !important; height:60px !important; background:transparent url('"+gL+"') no-repeat scroll 65px 0 !important;}");
		/* logo prvc [insrt] */	sIR("BODY > DIV.about:first-child > DIV.header:first-child > H1,BODY > H1:first-child {padding-left:160px; width:310px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important;}");
		/* l-promo borders */	sIR(".leftnav .promo {"+bS('radiusAll')+":14px;}");
		/* header line */		sIR("BODY.search > TABLE[width='95%'][cellspacing='2']:first-child > TBODY > TR:first-child > TD[width='100%']:last-child > TABLE[width='100%']:first-child > TBODY > TR > TD[style='background-color: rgb(51, 102, 204);'],BODY > TABLE[width='650'][align='left'] > TBODY > TR:first-child > TD[width='100%'] > TABLE[width='100%'] > TBODY > TR:last-child > TD,BODY.search > TABLE[width='95%'][cellspacing='2']:first-child > TBODY > TR:first-child > TD:last-child > TABLE:first-child TD[style='background-color: rgb(51, 102, 204);'] {display:none;}");
		/* headers */		sIR(".content H2,BODY.search > TABLE[width='95%'][cellspacing='2']:first-child > TBODY > TR:first-child > TD[width='100%']:last-child > TABLE[width='100%'][cellpadding='2'] > TBODY > TR:last-child > TD[style='background-color: rgb(229, 236, 249);'],BODY > DIV#container > TABLE#header > TBODY > TR:first-child > TD[width='100%'] > H1,#content H4,BODY > TABLE[width='650'][align='left'] > TBODY > TR:first-child > TD[width='100%'] > TABLE[width='100%'] > TBODY > TR[valign='top']:first-child > TD:first-child,BODY.search > TABLE[width='95%'][cellspacing='2']:first-child > TBODY > TR:first-child > TD:last-child > TABLE[width='100%'][cellpadding='2'] TD[style='background-color: rgb(229, 236, 249);'],BODY > SPAN[style='font-family: Arial;']:first-child > H2[style='font-size: 1.3em; margin-right: 0px; margin-left: 0px; color: black;'],BODY.search > TABLE > TBODY > TR > TD > H1 > TABLE > TBODY > TR > TD[style='background-color: rgb(0, 128, 0);'] {background-color:#333 !important; "+bS('radiusAll')+":14px;}");
		/* boxBgs */		sIR("BODY.search > TABLE[width='95%'][cellspacing='2']:first-child > TBODY > TR:first-child > TD[valign='top']:first-child,BODY.search > TABLE[width='95%'][cellspacing='2']:first-child > TBODY > TR:first-child > TD:last-child,BODY.search > TABLE[width='95%'][cellspacing='2']:first-child > TBODY > TR:first-child > TD[width='100%']:last-child,BODY.search > TABLE[width='95%']:last-child TD,BODY > TABLE[width='650'][align='left'] > TBODY > TR:first-child > TD,BODY.search > TABLE[width='95%'][cellpadding='2'] TD {background-color:#000 !important;}");
		/* l-menu w */		sIR("BODY.search > TABLE[width='95%']:last-child > TBODY > TR[valign='top']:first-child > TD:first-child > FORM SMALL > FONT > * {width:11em !important;}");
		/* l-menu dottedLn */	sIR("BODY.search > TABLE[width='95%']:last-child > TBODY > TR[valign='top']:first-child > TD[style='background-image: url(/images/dot2.gif);'],#left-col-divider,BODY.search > TABLE[width='95%'] > TBODY > TR:first-child > TD[style='background-image: url(images/dot2.gif);'] {background-image:none !important; border-right:1px dotted #333;}");
		/* l-menu horizDots */	sIR("FONT > IMG[width='146'][src='http://www.google.com/images/sidedivider.gif'] {visibility:hidden;}");
		/* l-menu rnd-boxes */	sIR("#left-col .side-search,BODY > DIV.g-doc > DIV.g-section > DIV.g-unit > P.love,BODY > DIV.g-doc > DIV.g-section > DIV.g-unit > DIV.c-box-more {background-color:#222; border:0 none; "+bS('radiusAll')+":14px;}");
		/* sitemap blocks */	sIR("BODY.search > TABLE[width='95%'][cellpadding='2'] TABLE[style='border: 1px solid rgb(229, 236, 249);'] {border-color:#333 !important;}");
		/* content area */	sIR("#container #content {padding-left:2em;}");
		/* content blocks */	sIR("DIV#aux PRE,.x-button,.x-button-basic,SPAN[style='background-color: rgb(255, 255, 255);'],BODY > DIV.g-doc > DIV.g-section > DIV.g-unit > DIV.warning,#download {background-color:#222 !important; border:0 none; "+bS('radiusAll')+":14px;}");
		/* page txt */		sIR(".Apple-style-span,.Apple-style-span > .Apple-style-span {color:#999 !important;}");
		/* footer */		if(uHideFooters)sIR("BODY.search > TABLE[width='95%']:last-child > TBODY > TR:last-child,BODY > DIV#container > TABLE[width='95%']:last-child,BODY > TABLE[width='750'][cellpadding='3'],BODY.search > DIV.footer,BODY > DIV.g-doc > .footer:last-child,BODY > TABLE > TBODY > TR > TD#content > DIV#footer,BODY > DIV#about:last-child,BODY > DIV > DIV#content > DIV > DIV#footer:last-child,BODY > DIV.g-doc > DIV.g-section > DIV.footer:last-child,BODY > DIV.g-doc > DIV.g-section > P.footer:last-child,BODY > TABLE > TBODY > TR > TD > DIV#footer {display:none;}");
	}


	// Make Google Your Homepage
	else if(iO(lH,".google."+Gtld+"/services/hp/")>-1){
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("BODY > DIV.g-doc-800 > DIV.header > A[href='/'] > IMG {display:none;}");
		/* logo img [insert] */	sIR("BODY > DIV.g-doc-800 > DIV.header {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important; font-size:0;}");
		/* l-side txt */	sIR("BODY > DIV.g-doc-800 > DIV.g-section > DIV.g-unit > DIV[style='padding-right: 20px;'] {color:#999;}");
		/* l-side txtS */	sIR("BODY > DIV.g-doc-800 > DIV.g-section > DIV.g-unit > DIV[style='padding-right: 20px;'] STRONG {color:#ccc;}");
		/* r-side box */	sIR("BODY > DIV.g-doc-800 > DIV.g-section > DIV.g-unit > DIV > DIV#box {background-color:#333; border:0 none; "+bS('radiusAll')+":14px;}");
		/* r-side box link */	sIR("BODY > DIV.g-doc-800 > DIV.g-section > DIV.g-unit > DIV > DIV#box A {color:"+lc+" !important;}");
		/* footer */		if(uHideFooters)sIR("BODY > DIV.g-doc-800 > P.footer {display:none;}");
	}


	// Add to Google (RSS)
	else if(iO(lH,".google.")>-1&&(iO(lH,Gtld+"/ig/add?")>-1||iO(lH,Gtld+"/ig/adde?")>-1)){
		/* applyGlobals */	Ge();

		/* logo img [remove] */	sIR("BODY > TABLE:first-child > TBODY > TR > TD[width='1%'][valign='top'] > A > IMG {display:none;}");
		/* logo img [hide] */	sIR("BODY > FORM#submit_button > TABLE[width='700'] > TBODY > TR > TD#logo > IMG {visibility:hidden;}");
		/* logo img [insert] */	sIR("BODY > TABLE:first-child > TBODY > TR > TD[width='1%'][valign='top'],BODY > FORM#submit_button > TABLE[width='700'] > TBODY > TR > TD#logo {width:150px !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll top left !important; font-size:0;}");
		/* header bgs */	sIR("TR[bgcolor='#e5ecf9'],TR[bgcolor='#3366cc'] {background-color:#000;}");
		/* headers */		sIR("TR[bgcolor='#e5ecf9'] > TD[style='padding-left: 4px; padding-bottom: 3px; padding-top: 2px; font-family: arial,sans-serif;'] {background-color:#333; border:0 none; color:#fff; "+bS('radiusAll')+":14px;}");
		/* button sides */	sIR("TD[style='background: transparent url(/ig/images/button-left.gif) repeat scroll 0% 0%; width: 8px; height: 40px; "+bS('background-clip')+": border; "+bS('background-origin')+": padding; "+bS('background-inline-policy')+": continuous;'],TD[style='background: transparent url(/ig/images/button-right.gif) repeat scroll 0% 0%; width: 8px; height: 40px; "+bS('background-clip')+": border; "+bS('background-origin')+": padding; "+bS('background-inline-policy')+": continuous;'] {background-image:none !important;}");
		/* button bodies */	sIR("TD[style='background: transparent url(/ig/images/button-center.gif) repeat-x scroll 0% 0%; padding-left: 0.5em; padding-right: 0.5em; height: 40px; "+bS('background-clip')+": border; "+bS('background-origin')+": padding; "+bS('background-inline-policy')+": continuous; color: rgb(255, 255, 255);'],TD[style='background: transparent url(/ig/images/button-center.gif) repeat-x scroll 0% 0%; padding-left: 0.5em; padding-right: 0.5em; height: 40px; "+bS('background-clip')+": border; "+bS('background-origin')+": padding; "+bS('background-inline-policy')+": continuous;'],TABLE[style='border: 1px solid rgb(166, 191, 201); padding: 5px; background: rgb(202, 222, 244) none repeat scroll 0%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;'] {background:#333 none !important; border:0 none !important; "+bS('radiusAll')+":14px;}");
		/* footer */		if(uHideFooters)sIR("BODY > TABLE > TBODY > TR > TD > DIV.footer,BODY > FORM#submit_button > TABLE:last-child > TBODY > TR > TD > DIV#footer {display:none;}");
	}


	// Toolbar
	else if((iO(lH,"tools.google.")>-1&&iO(lH,"/firefox/toolbar/")>-1)||(iO(lH,".google.")>-1&&(iO(lH,"/toolbar/ff/")>-1||iO(lH,"/toolbar/ie/")>-1))){
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("BODY > DIV > DIV.header > A > IMG.logo {display:none;}");
		/* logo img [insert] */	sIR("BODY > DIV > DIV.header {width:100% !important; height:55px !important; background:transparent url('"+gL+"') no-repeat scroll top left !important;}");
		/* boxes */		sIR("DIV.g-button,DIV.box-out,DIV.box-out > DIV.box-in {background:#333 none !important; border:0 none; "+bS('radiusAll')+":14px;}");
		/* footer */		if(uHideFooters)sIR("BODY > DIV.g-doc-800 > DIV.footer {display:none;}");
	}


	// Chrome Browser
	else if(iO(lH,".google.")>-1&&(iO(lH,Gtld+"/chrome")>-1||iO(lH,"/landing/chrome/beta/")>-1)){
		/* applyGlobals */	Ge();

		/* rndBoxes */		sIR(".blue,.features-3blurbs .more-info3 .col,.g-button,.g-button-basic {background:#333 none !important; border:0 none; "+bS('radiusAll')+":14px;}");
		/* footer */		if(uHideFooters)sIR("BODY > DIV.g-doc-800 > DIV.footer > P,BODY > DIV.g-doc > DIV.footer:last-child > P {display:none;}");
	}


	// Pack
	else if(iO(lH,"pack.google.")>-1){
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("BODY > CENTER > TABLE[width='730'][style='margin-bottom: 10px;'] > TBODY > TR:last-child > TD:first-child > A > IMG[style='border-style: none;'] {display:none;}");
		/* logo img [insert] */	sIR("BODY > CENTER > TABLE[width='730'][style='margin-bottom: 10px;'] > TBODY > TR:last-child > TD:first-child {width:150px !important; height:50px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important;}");
		/* rndBoxes */		sIR("TABLE#AvailableApplications > TBODY > TR > TD[bgcolor='#cadef4'][style='border: 0px solid rgb(166, 191, 201);'],TABLE#AvailableApplications > TBODY > TR > TD[bgcolor='#cadef4'][style='border: 0px solid rgb(166, 191, 201);'] TD[bgcolor='#ffffff'][style='border: 1px solid rgb(202, 222, 244);'],.Divider {background:#333 none !important; border:0 none !important; "+bS('radiusAll')+":14px;}");
		/* r-installdAppsBx */	sIR("#InstalledApplications TD {background-color:#000; border:0 none !important;}");
	}


	// Answers
	else if(iO(lH,"answers.google.")>-1){
		/* applyGlobals */	Ge();

		/* logo img [hide] */	sIR("TABLE.top > TBODY > TR:first-child > TD:first-child > IMG[src='answers/answers-logo-sm.gif'],BODY[bgcolor='#ffffff'] > TABLE[width='100%'][cellpadding='2']:first-child > TBODY > TR:first-child > TD[width='1%']:first-child > A > IMG[width='143'] {display:none;}");
		/* logo img [insert] */	sIR("TABLE.top > TBODY > TR:first-child > TD:first-child,BODY[bgcolor='#ffffff'] > TABLE[width='100%'][cellpadding='2']:first-child > TBODY > TR:first-child > TD[width='1%']:first-child {width:150px !important; height:50px !important; background:transparent url('"+gL+"') no-repeat scroll 0 !important;}");
		/* headers */		sIR("BODY > TABLE[width='100%'][cellpadding='2'] > TBODY > TR > TD[width='100%'][bgcolor='#49188f'][colspan='6'],BODY[bgcolor='#ffffff'] > TABLE[width='100%'][cellpadding='2']:first-child > TBODY > TR:first-child > TD > TABLE[width='100%'][cellpadding='2'] > TBODY > TR > TD[bgcolor='#49188f'],BODY[bgcolor='#ffffff'] > DIV#answers > DIV > TABLE[width='98%'] > TBODY > TR > TD[bgcolor='#eeeeee'] {padding-left:0.5em; background-color:#333; border:0 none; color:#fff; "+bS('radiusAll')+":14px;}");
		/* sResults tblT */	sIR("BODY > TABLE[width='100%'][cellpadding='2'][bgcolor='#49188f'],BODY > CENTER > TABLE[width='98%'] > TBODY > TR > TD[bgcolor='#c2bddd'] {background-color:#333; "+bS('border-radius-topright')+":14px; "+bS('border-radius-topleft')+":14px;}");
		/* sResults tblTLn */	sIR("BODY > CENTER > TABLE[width='98%'] > TBODY > TR > TD[bgcolor='#49188f'] {display:none;}");
		/* sResults tblH */	sIR("BODY > TABLE[width='100%'][cellpadding='4'] > TBODY > TR[valign='bottom'] > TD[bgcolor='#c2bddd'] {background-color:#333;}");
		/* sResults tblC */	sIR("BODY > TABLE[width='100%'][cellpadding='4'] > TBODY > TR[valign='top'] > TD[bgcolor='#ffffff'],BODY > CENTER > TABLE[width='98%'] > TBODY > TR[bgcolor='#eeeeee'],BODY > CENTER > TABLE[width='98%'] > TBODY > TR > TD[bgcolor='#eeeeee'] {background-color:#181818;}");
		/* sResults tblCalt */	sIR("BODY > TABLE[width='100%'][cellpadding='4'] > TBODY > TR[valign='top'] > TD[bgcolor='#eeeeee'] {background-color:#222;}");
		/* sResults tblBR */	sIR("BODY > TABLE[width='100%'][cellpadding='4'] > TBODY > TR[valign='top']:last-child > TD:last-child {"+bS('border-radius-bottomright')+":14px;}");
		/* sResults tblBL */	sIR("BODY > TABLE[width='100%'][cellpadding='4'] > TBODY > TR[valign='top']:last-child > TD:first-child {"+bS('border-radius-bottomleft')+":14px;}");
		/* comment-commentBx */	sIR("BODY > CENTER > TABLE[width='98%'][cellpadding='2'] > TBODY > TR[bgcolor='#c2bddd'] {background-color:#222; "+bS('radiusAll')+":14px;}");
		/* boxBgs */		sIR(".t {background-color:#000;}");
		/* ads */		if(uHideAds)sIR("IFRAME#google_ads_frame1,IFRAME#google_ads_frame2,INS[style='border: medium none ; margin: 0pt; padding: 0pt; height: 100px; position: relative; visibility: visible; width: 728px;'] {display:none;}");
	}



// Modify Google Header Bar
var uA=navigator.userAgent.toLowerCase();
gHeaderBarCntnr=$("gbar");
gHdrUsrBarCntnr=$("guser");
gHeaderBarCntnrVoice=$("gc-gaia-bar");
var gHeaderBar;
//shift header-menu right for 'iGoogle' link insertion
 if(gHeaderBarCntnr != null){
 gHeaderBar=gHeaderBarCntnr.getElementsByTagName('nobr')[0];
 if(gHeaderBar != null)
  gHeaderBar.style.position="relative";
  if(iO(uA,"chrome")==-1)gHeaderBar.style.left="4.8em";
  }
//header-menu left-side 'iGoogle'/'Web' link insertion
isiG=(iO(lH,".google.")>-1&&iO(lH,"/ig")>-1&&iO(lH,"/ig")<24);
if(isiG){
	//create new 'iGoogle' B-tag
	iGheaderInsert=document.createElement('b');

	//create new 'Web' A-tag
	WEBheaderInsert=document.createElement('a');
	 WEBheaderInsert.href="http://www.google."+Gtld+"/url?sa=p&pref=ig&pval=1&q=/webhp%3Frls%3Dig";
	 WEBheaderInsert.innerHTML="Web";
	 WEBheaderInsert.className="gb1";
	 WEBheaderInsert.setAttribute('style','float:left; position:relative; top:-1.6em; padding-left:0.15em;');

	 //hide old 'Web' B-tag
	 if(gHeaderBarCntnr.getElementsByTagName('nobr')[0].getElementsByTagName('b')[0]) gHeaderBarCntnr.getElementsByTagName('nobr')[0].getElementsByTagName('b')[0].setAttribute('style','visibility:hidden;');

	 //hide old right-side 'Classic Home' A-tag
	 if(gHdrUsrBarCntnr.getElementsByTagName('nobr')[0].getElementsByTagName('a')[0]) gHdrUsrBarCntnr.getElementsByTagName('nobr')[0].getElementsByTagName('a')[0].setAttribute('style','display:none;');

	 //shift 'account' slightly-right
	 if(gHdrUsrBarCntnr.getElementsByTagName('nobr')[0].getElementsByTagName('b')[0]) gHdrUsrBarCntnr.getElementsByTagName('nobr')[0].getElementsByTagName('b')[0].setAttribute('style','position:relative; left:1em;');
}
else{
	//create new 'iGoogle' A-tag
	iGheaderInsert=document.createElement('a');
	 iGheaderInsert.href="http://www.google."+Gtld+"/ig";
}
 iGheaderInsert.innerHTML="iGoogle";
 iGheaderInsert.className="gb1";
 if(iO(uA,"chrome")==-1)iGheaderInsert.setAttribute('style','float:left; position:relative; top:-1.55em;');
 else iGheaderInsert.setAttribute('style','float:left;');
  if(gHeaderBar != null){
  gHeaderBar.insertBefore(iGheaderInsert,parent.firstChild);
  if(isiG)gHeaderBar.insertBefore(WEBheaderInsert,parent.firstChild);
  }
//header-menu 'Sign in' link adjustments
 if(gHdrUsrBarCntnr||gHeaderBarCntnrVoice) gHdrUsrBar=gHdrUsrBarCntnr.getElementsByTagName('nobr')[0];
 if (gHdrUsrBarCntnr != null){
      if(((!gHdrUsrBarCntnr)||(gHdrUsrBarCntnr&&typeof gHdrUsrBar=="undefined"))&&(!gHdrUsrBarCntnr&&gHdrUsrBarCntnr.getElementsByTagName('a')[2])){
      	signInLink=document.createElement('a');
      		 signInLink.innerHTML="Sign in";
      	 signInLink.href="https://www.google."+Gtld+"/accounts/ServiceLogin?continue=http://www.google."+Gtld+"/ig&followup=http://www.google."+Gtld+"/ig&service=ig&passive=true";
      	 signInLink.setAttribute('style','position:absolute; top:4px; right:8px; font-family:'+uFontFamily+';');
      	  //adds Sign in link to right-side of Firefox start page (when signed out),or not News (body.hp,body.serp & body.sp)
      	  if(document.body.className!="hp"&&document.body.className!="serp"&&document.body.className!="sp"&&document.body.className!="gecko loading loaded") gHeaderBarCntnr.appendChild(signInLink);
      }
}
//header-menu right-side adjustments
if(gHdrUsrBarCntnr&&typeof gHdrUsrBar=="object"&&gHdrUsrBar.hasChildNodes()) for(iA=0; iA<gHdrUsrBar.getElementsByTagName('a').length; iA++) if(gHdrUsrBar.getElementsByTagName('a')[iA].innerHTML=="iGoogle"){
	//removes iGoogle link from right-side (when signed in)
	gHdrUsrBar.getElementsByTagName('a')[iA].style.display="none";
	//if exists,shift Account name over (when signed in)
	if(gHdrUsrBar.getElementsByTagName('b')[0]) gHdrUsrBar.getElementsByTagName('b')[0].setAttribute('style','position:relative; left:0.8em; background-color:#000 !important;')
}

// Remove Right-side Ads
if(uHideAds){
	iFs=document.getElementsByTagName("iframe");
	for(var iB=0;iB<iFs.length;iB++){if(iO(iFs[iB].src,"pagead2.googlesyndication.com/pagead/ads")!=-1){iFs[iB].height=0;iFs[iB].width=0;}}
}

// Add Style
if(typeof GM_addStyle!="undefined"){GM_addStyle($_$);}
else if(typeof addStyle!="undefined"){addStyle($_$);}
else{
	heads=document.getElementsByTagName("head");
	if(heads.length>0){
		node=document.createElement("style");
		node.type="text/css";
		node.innerHTML=$_$;
		heads[0].appendChild(node); 
	}
}

//After all else,check for updates
if(uCheckUpdates)scriptUpdateCheck(true);

}

//Remove Search Tracking 
function RST(){if(uRemoveST){
	lAs=document.getElementsByTagName("a");
	for(var iC=0;iC<lAs.length;iC++){if(lAs[iC].className=="l")lAs[iC].removeAttribute("onmousedown");}
}}

// Google Logo
function _gL(W){

  if(uHideLogos){
  
     var logmain = document.getElementById("logo");
     if(logmain != null){  	
      if(W=="H"){  	
            logmain.src = "";
       }else{
           while (logmain.firstChild){
             logmain.removeChild(logmain.firstChild);
           }   
      }
     }else{
          var logovideo;
          var elems = document.getElementsByTagName('img');
          for ( var i = 0; i < elems.length; i += 1 ) {
            if ( elems[i].hasAttribute('src') && elems[i].getAttribute('src').indexOf('video_logo') > 1 )
            logovideo = elems[i];
            break;
          }
          if(logovideo != null){
            if(uHideLogos){
              logovideo.setAttribute("style","display:none;");
            }
          }     
      }
     
     
     return "";
  }else{
	if(W=="H"){
    var lk ="data:image/png;base64,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";
    var logmain = document.getElementById("logo");
  	
    	if(logmain != null){  	
        logmain.removeAttribute('src');
        logmain.heigth='131';
      }else{
      
          var logovideo;
          var elems = document.getElementsByTagName('img');
          for ( var i = 0; i < elems.length; i += 1 ) {
          
            if ( elems[i].hasAttribute('src') && elems[i].getAttribute('src').indexOf('video_logo') > 1 )
            logovideo = elems[i];
            break;
          }
          if(logovideo != null){
            if(uHideLogos){
              logovideo.setAttribute("style","visibility:hidden");
            }else{
             logovideo.setAttribute("src",lk);
            }
          }     
      }
    	return lk;
    	
  }else{
  	var log = document.getElementById("logo");
  	
  	if(log!=null){
    	while (log.firstChild){
          log.removeChild(log.firstChild);
      }
  	}else{
    
          var logogmail;
          var elems = document.getElementsByTagName('img');
          for ( var i = 0; i < elems.length; i += 1 ) {
          
            if ( elems[i].hasAttribute('src') && elems[i].getAttribute('src') == 'https://mail.google.com/mail/help/images/logo2.gif' )
            logogmail = elems[i];
            break;
          }
          if(logogmail != null){
            logogmail.setAttribute("src","http://img156.imageshack.us/img156/4339/imagemedium.png");
          }     
    
    }
  	
    return "http://img688.imageshack.us/img688/4775/imagesmall.png";

  } 

}}

// Browser Style [injector]
function bS(typ) {
	var newStyl,uA=navigator.userAgent.toLowerCase(),bP=(iO(uA,"chrome")>-1)?"-webkit-":(iO(uA,"konqueror")>-1)?"-khtml":(iO(uA,"opera")>-1)?"":"-moz-";
	if(iO(typ,"radiusAll")>-1){
		newStyl="border-radius";
		if(bP!="-webkit-")newStyl=bP+newStyl;
	}
	else if(iO(typ,"radius")>-1){
		if(bP=="-webkit-"){ //Chrome CSS3 Rounded Corners
			if(iO(typ,"topright")>-1)newStyl="border-top-right-radius";
			else if(iO(typ,"topleft")>-1)newStyl="border-top-left-radius";
			else if(iO(typ,"bottomright")>-1)newStyl="border-bottom-right-radius";
			else if(iO(typ,"bottomleft")>-1)newStyl="border-bottom-left-radius";
		}
		else newStyl=bP+typ;
	}
	else if(iO(typ,"gradLinear")>-1){
		if(bP=="-moz-")newStyl="-moz-linear-gradient(";
		else newStyl=bP+"gradient(linear,";
	}
	else{
		newStyl=typ;
		if(bP!="-webkit-")newStyl=bP+newStyl;
	}
	return newStyl;
}

// Shortcut!
function $(id){return document.getElementById(id);}

// Shorthand indexOf
function iO(elm,str){return elm.indexOf(str);}

// Adaptive Resolution Support from 800x600 to 2560x1600 for Search Results
function _rW(){
	var rV, dW=document.all?document.body.clientWidth:window.innerWidth;
	if($('gSearchSidebar')==null)rV=96;
	else if(dW>=2532)rV=73;
	else if(dW>=1699)rV=72;
	else if(dW>=1308)rV=71;
	else if(dW>=1266)rV=70;
	else if(dW>=1226)rV=69;
	else if(dW>=1189)rV=68;
	else if(dW>=1154)rV=67;
	else if(dW>=1121)rV=66;
	else if(dW>=1090)rV=65;
	else if(dW>=1060)rV=64;
	else if(dW>=1032)rV=63;
	else if(dW>=1006)rV=62;
	else if(dW>=981) rV=61;
	else if(dW<981)  rV=60;
	return rV;
}

// Creates a new node with the given attributes and properties
function createNode(type,attributes,props){
	node=document.createElement(type);
	if(attributes)for(var attr in attributes)node.setAttribute(attr,attributes[attr]);
	if(props)for(var prop in props)if(prop in node)node[prop]=props[prop];
	return node;
}

// Runs a particular XPath expression p against the context node context (or the document, if not provided)
// If a document (docObj) is provided, its evaluate method is used instead of document.evaluate (and it's also the default context)
// Returns the results as an array
function $x(p,context,docObj){
	if(!docObj)docObj=document;
	if(!context)context=docObj;
	var arr=[],xpr=docObj.evaluate(p,context,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for(var i=0,l=xpr.snapshotLength;i<l;i++)arr.push(xpr.snapshotItem(i));
	return arr;
}

// Returns only the first element of the array returned by $x (or null if the array was empty)
function $x1(p,context,docObj) {
	var nodeArray=$x(p,context,docObj);
	return (nodeArray.length>0)?nodeArray[0]:null;
}


/* !CHECK: if script can set values,then disable Update Check if unsupported or Opera ('unsafeWindow' is GM-obj) */
try{GM_setValue("SetValTest","1")}catch(er){var noSetVal=true}
if(typeof unsafeWindow!="undefined"&&typeof noSetVal=="undefined"){

// Shows/hides an update notice to the user (according to the boolean parameter scriptShowMessage)
// The scriptNewVersion parameters is used to display the new version number/date in Date.prototype.getTime() format
function scriptShowUpdateMessage(scriptShowMessage,scriptNewVersion){
	// Shortcut to sessionStorage (saved values will be discarded at the end of the browser session)
	var sSt=unsafeWindow.sessionStorage;
	// Gets the notice box and the script new version date in UTC format
	var messageDiv=$("gsscriptVersionMessage");
	var scriptNewVersionDate=(new Date(scriptNewVersion)).toUTCString();
	// Shows/creates/hides the update notice
	// Hides the notice if it exists
	if(scriptShowMessage==false){if(messageDiv)messageDiv.style.display="none";}
	else{
		// The notice shouldn't be shown/created if the user has chosen to hide it for this session
		if(sSt.gsscriptVersionNoticeHide)return;

		// Shows the notice
		if(messageDiv)messageDiv.style.display="";
		// Creates the notice
		else{
			//styles
			var style=document.createElement('style');
			    style.setAttribute('id','bruteForce');
			document.getElementsByTagName('head')[0].appendChild(style);
			//stylesheet Insert Rule
			function sIR(style){$('bruteForce').sheet.insertRule(style,0);}

			sIR("#gsscriptVersionMessage {position:fixed; top:0px; right:1px; width:420px; height:76px; z-index:1001; overflow:auto; padding:10px; background-color:#C00040; font-family:Trebuchet MS,Verdna; font-weight:bold; font-size:14px; color:#fff !important; text-align:center; cursor:default; "+bS('border-radius-bottomleft')+":28px;}");

			//content
			messageDiv=createNode("div",{id: "gsscriptVersionMessage",title: "A new version of google Enhanced BLACK is available"});
			messageDiv.innerHTML="A new version of google Enhanced BLACK is available<br />"+
				"<span style='font-weight:normal; color:#f77; font-family:Trebuchet MS,Verdna;'>Updated: "+ scriptNewVersionDate + "</span><br /><br />"+
				"<a style='color:#fcc !important; font-size:16px; font-family:Trebuchet MS,Verdna;' id='gsscriptVersionInstallUpdate' href='"+sI("f")+"' title='Install the script update now'>INSTALL UPDATE</a>"+
				" &nbsp;&middot;&nbsp; "+
				"<a style='color:#f99 !important; font-family:Trebuchet MS,Verdna;' href='"+sI("h")+"' target='_blank' title='Go to the google Enhanced BLACK UserScript page in a new tab'>Go to UserScript page</a>"+
				" &nbsp;&middot;&nbsp; "+
				"<a style='color:#fcc !important; font-family:Trebuchet MS,Verdna;' id='gsscriptVersionMessageHide' href='javascript:void(null)' title='Hide the notice for this session'>Hide notice</a>";
			document.body.appendChild(messageDiv);
			// Adds event listeners to the hide update-notice upon Install or Hide
			$("gsscriptVersionInstallUpdate").addEventListener("click",function(evt){
				sSt.gsscriptVersionNoticeHide="1"; // Sets a sessionStorage variable to prevent the notice to be shown for this session
				scriptShowUpdateMessage(false,null);
			},false);
			$("gsscriptVersionMessageHide").addEventListener("click",function(evt){
				sSt.gsscriptVersionNoticeHide="1";
				scriptShowUpdateMessage(false,null);
			},false);
		}
	}
}
// Checks if there is a new script version according to the version information in the script homepage
// The version information is in a line in the full description of the script: "<p>#[V:00000000]#</p>" (00000000 is the version number)
// If the request is successful and there is a new version available,a message to the user is displayed
function scriptCheckVersion(returnAlert){
	GM_xmlhttpRequest({
		method:"GET",
		url:sI("h"),
		onload:function(evt){
			if((evt.readyState==4)&&(evt.status==200)){
				// Gets the remote version from the response and makes sure it is a number
				var responseMatch=evt.responseText.match(/<p>#\[V:(\d+)]#<\/p>/);
				var remoteVersion=(responseMatch===null)?NaN:parseInt(responseMatch[1],10);
				if(isNaN(remoteVersion))return;
				// Saves the more recent version according to the server and shows the update notice if the server version is newer
				GM_setValue("scriptLastRemoteVersion",remoteVersion.toString());
				if(remoteVersion>sI("v"))scriptShowUpdateMessage(true,remoteVersion);
				else if(typeof returnAlert=="boolean"&&returnAlert)alert("The script is up to date. \n\nThanks for checking ;)");
			}
		}
	});
}
// Checks for script updates
function scriptUpdateCheck(showAlert){
	// Get & Set values
	var scriptLastCheck=parseInt(GM_getValue("scriptLastCheck","0"),10);
		if(isNaN(scriptLastCheck))scriptLastCheck=0;
	var scriptLastRemoteVersion=parseInt(GM_getValue("scriptLastRemoteVersion",sI("v").toString()),10);
		if(isNaN(scriptLastRemoteVersion))scriptLastRemoteVersion=sI("v");
	// Then check
	if(Date.now()-scriptLastCheck>=86400000){ // 86400000==1 day
		// At least a day has passed since the last check. Sends a request to check for a new script version
		GM_setValue("scriptLastCheck",Date.now().toString());
		scriptCheckVersion();
	}
		// If a new version was previously detected the notice will be shown to the user
		// This is to prevent that the notice will only be shown once a day (when an update check is scheduled)
	else {if(scriptLastRemoteVersion>sI("v"))scriptShowUpdateMessage(true,scriptLastRemoteVersion);}

	if(typeof showAlert!="boolean")scriptCheckVersion(true);
}


var currentMk=1,
    uConfigMk=GM_getValue("uConfigMk",0),
    uFontFamily=GM_getValue("uFontFamily","trebuchet ms,sans-serif"),
    uColorLink=GM_getValue("uColorLink","#3366CC"),
    uColorLinkVisited=GM_getValue("uColorLinkVisited","#6e37cc"),
    uColorInputTxt=GM_getValue("uColorInputTxt","#ff0"),
    uColorButtonHover=GM_getValue("uColorButtonHover","#36f"),
    uHideLogos=GM_getValue("uHideLogos",false),
    uHideAds=GM_getValue("uHideAds",true),
    uHideFooters=GM_getValue("uHideFooters",true),
    uRemoveST=GM_getValue("uRemoveST",true),
    uForceSSL=GM_getValue("uForceSSL",true),
    uCheckUpdates=GM_getValue("uCheckUpdates",true);

// User Configuration
function configureScript(e){
	if(e=="f1rst")alert("Thank you for installing this new version of google Enhanced BLACK. This update includes a new configuration panel, which will now appear to save your initial settings. You can use this panel to change text colors and add/remove page elements. To edit these options again later, run Config in your User Script Commands menu.");

	// Gets the layers
	var maskLayer=$("gsmaskLayer");
	var dialogLayer=$("gsdialogLayer");

	// Checks the layers state
	// Creates the layers if they don't exist or displays them if they are hidden
	if(maskLayer&&dialogLayer){
		if((maskLayer.style.display=="none")&&(dialogLayer.style.display=="none")){
			setDialogInputState(true); //Makes sure the input/select fields are enabled
			maskLayer.style.display="";
			dialogLayer.style.display="";
		}
		dialogLayer.focus();
	}
	else createLayers();

	return; //Exit function


	// Creates the configuration layers
	// It is a nested function
	function createLayers(){
		var style=document.createElement('style');
		    style.setAttribute('id','bruteForce');
		document.getElementsByTagName('head')[0].appendChild(style);
		//stylesheet Insert Rule
		function sIR(style){$('bruteForce').sheet.insertRule(style,0);}

		// Script Configuration Modal
		sIR("#gsmaskLayer {position:fixed; left:0px; top:0px; width:100%; height:100%; background-color:black; opacity:0.75; z-index:100;}");
		sIR("#gsdialogLayer {overflow:auto; position:fixed; left:29%; top:19%; padding:0 1.5em 0 0; background-color:#333; border:1px solid #000; font-size:1em !important; color:#999; z-index:101; cursor:default; "+bS('radiusAll')+":14px;}");
		sIR("#gsdialogLayer > * {margin:15px 0; font-family:Trebuchet MS,Verdna;}");
		sIR("#gsdialogLayer LI {margin:15px 0px 7px; font-family:Trebuchet MS,Verdna; font-style:italic; color:#fff;}");
		sIR("#gsdialogLayer .l {float:left; font-family:Trebuchet MS,Verdna;}");
		sIR("#gsdialogLayer .lb {width:12.5em;}");
		sIR("#gsdialogLayer .aR {text-align:right;}");
		sIR("#gsdialogLayer .cL {clear:left;}");
		sIR("#gsdialogLayer INPUT,#gsdialogLayer SELECT {vertical-align:middle; font-size:0.9em; cursor:pointer;}");
		sIR("#gsdialogLayer INPUT {border-color:#777; font-family:courier new; font-weight:normal !important; color:#fff !important; text-align:center;}");
		sIR("#gsdialogLayer INPUT[type='text'] {cursor:text;}");
		sIR("#gsdialogLayer INPUT.b {color:#000 !important;}");
		sIR("#gsdialogLayer SELECT {margin-bottom:4px; margin-right:11.5em; background-color:#777; font-family:Trebuchet MS,Verdna; color:#fff;}");
		sIR("#gsdialogLayer LABEL {padding-top:3px; font-family:Trebuchet MS,Verdna; font-size:0.9em; color:#ccc; cursor:pointer;}");
		sIR("#gsdialogLayer LABEL.it {padding-right:5.2em;}");
		sIR("#gsdialogLayer LABEL.sp {margin-left:21px; color:#333;}");
		sIR("#gsconfTitle {padding-left:20px; font-size:1.4em; font-weight:bold; text-align:center; color:#ff0;}");
		sIR("#gsconfButDiv {padding-top:5px; text-align:center;}");
		sIR("#gsconfButDiv INPUT {margin:5px; margin-left:30px;}");
		sIR("#gsdialogLayer UL {padding-left:40px; list-style-type:disc;}");

		// Creates a layer to mask the page during configuration
		maskLayer=createNode("div",{id: "gsmaskLayer", title: "Click here to return to the page"});

		// Creates a layer for the configuration dialog
		dialogLayer=createNode("div",{id: "gsdialogLayer"});

		// Creates the configuration dialog HTML
		dialogLayer.innerHTML="<div id='gsconfTitle' style='font-family:"+uFontFamily+";'>google Enhanced BLACK Configuration</div>"+

		"<ul>" +
		"<li>Text Customization:</li>" +
		"<div class='aR'>"+
		"<span class='l'>Page Font:</span>" +
		 "<select id='gsconf_uFontFamily_Sel' size='1'>" +
		  "<option id='gsconf_uFontFamily' value='arial,helvetica,sans-serif'"+(uFontFamily=="arial,helvetica,sans-serif"?" selected='selected'":"")+">San Serif</option>"+
		  "<option id='gsconf_uFontFamily' value='times new roman,serif'"+(uFontFamily=="times new roman,serif"?" selected='selected'":"")+">Serif</option>"+
		  "<option id='gsconf_uFontFamily' value='arial black,sans-serif'"+(uFontFamily=="arial black,sans-serif"?" selected='selected'":"")+ ">Wide</option>"+
		  "<option id='gsconf_uFontFamily' value='arial narrow,sans-serif'"+(uFontFamily=="arial narrow,sans-serif"?" selected='selected'":"")+ ">Narrow</option>"+
		  "<option id='gsconf_uFontFamily' value='comic sans ms,sans-serif'"+(uFontFamily=="comic sans ms,sans-serif"?" selected='selected'":"")+ ">Comic Sans MS</option>"+
		  "<option id='gsconf_uFontFamily' value='courier new,monospace'"+(uFontFamily=="courier new,monospace"?" selected='selected'":"")+ ">Courier New</option>"+
		  "<option id='gsconf_uFontFamily' value='garamond,serif'"+(uFontFamily=="garamond,serif"?" selected='selected'":"")+ ">Garamond</option>"+
		  "<option id='gsconf_uFontFamily' value='georgia,serif'"+(uFontFamily=="georgia,serif"?" selected='selected'":"")+">Georgia</option>"+
		  "<option id='gsconf_uFontFamily' value='tahoma,sans-serif'"+(uFontFamily=="tahoma,sans-serif"?" selected='selected'":"")+ ">Tahoma</option>"+
		  "<option id='gsconf_uFontFamily' value='trebuchet ms,sans-serif'"+(uFontFamily=="trebuchet ms,sans-serif"?" selected='selected'":"")+ ">Trebuchet MS</option>"+
		  "<option id='gsconf_uFontFamily' value='verdana,sans-serif'"+(uFontFamily=="verdana,sans-serif"?" selected='selected'":"")+">Verdana</option>"+
		 "</select><br />"+
		"<span class='l'>Link Color:</span>"+
		 "<label for='gsconf_uColorLinkStandard_Rad' title='The new standard'><input type='radio' id='gsconf_uColorLinkStandard_Rad' name='gsconf_uColorLink'"+(uColorLink=="#3366CC"?" checked='checked'":"")+ ">Standard&nbsp;</label>"+
		 "<label for='gsconf_uColorLinkClassic_Rad' title='The oldschool'><input type='radio' id='gsconf_uColorLinkClassic_Rad' name='gsconf_uColorLink'"+(uColorLink=="#6495ed"?" checked='checked'":"")+">classic&nbsp;</label>"+
		 "<label for='gsconf_uColorLinkCustom_Rad' title='Enter valid named-colors, HEX [#336699 / #369] or RGB(204,204,255)'><input type='radio' id='gsconf_uColorLinkCustom_Rad' name='gsconf_uColorLink'"+(uColorLink!="#3366CC"&&uColorLink!="#6495ed"?" checked='checked'":"")+">custom&nbsp;</label>"+
		 "<input type='text' id='gsconf_uColorLinkCustom' title='Enter valid named-colors, HEX [#336699 / #369] or RGB(204,204,255)' style='background-color:"+uColorLink+" !important;' size='7' value='"+uColorLink+"'>"+
		"<div class='cL'></div>"+
		"<span class='l'>Visited Link Color:</span>"+
		 "<label for='gsconf_uColorLinkVisitedStandard_Rad' title='The new standard'><input type='radio' id='gsconf_uColorLinkVisitedStandard_Rad' name='gsconf_uColorLinkVisited'"+(uColorLinkVisited=="#6e37cc"?" checked='checked'":"")+">Standard&nbsp;</label>"+
		 "<label for='gsconf_uColorLinkVisitedClassic_Rad' title='The oldschool'><input type='radio' id='gsconf_uColorLinkVisitedClassic_Rad' name='gsconf_uColorLinkVisited'"+(uColorLinkVisited=="#406b80"?" checked='checked'":"")+">classic&nbsp;</label>"+
		 "<label for='gsconf_uColorLinkVisitedCustom_Rad' title='Enter valid named-colors, HEX [#336699 / #369] or RGB(204,204,255)'><input type='radio' id='gsconf_uColorLinkVisitedCustom_Rad' name='gsconf_uColorLinkVisited'"+(uColorLinkVisited!="#6e37cc"&&uColorLinkVisited!="#406b80"?" checked='checked'":"")+">custom&nbsp;</label>"+
		 "<input type='text' id='gsconf_uColorLinkVisitedCustom' title='Enter valid named-colors, HEX [#336699 / #369] or RGB(204,204,255)' style='background-color:"+uColorLinkVisited+" !important;' size='7' value='"+uColorLinkVisited+"'>"+
		"<div class='cL'></div>"+
		"<span class='l'>Input Field Color:</span>"+
		 "<label class='xit' for='gsconf_uColorInputTxtStandard_Rad'><input type='radio' id='gsconf_uColorInputTxtStandard_Rad' name='gsconf_uColorInputTxt'"+(uColorInputTxt=="#ff0"?" checked='checked'":"")+ ">Standard&nbsp;</label>"+
		 "<label class='sp'>classic&nbsp;</label>"+
		 "<label for='gsconf_uColorInputTxtCustom_Rad' title='Enter valid named-colors, HEX [#336699 / #369] or RGB(204,204,255)'><input type='radio' id='gsconf_uColorInputTxtCustom_Rad' name='gsconf_uColorInputTxt'"+(uColorInputTxt!="#ff0"?" checked='checked'":"")+">custom&nbsp;</label>"+
		 "<input class='b' type='text' id='gsconf_uColorInputTxtCustom' title='Enter valid named-colors, HEX [#336699 / #369] or RGB(204,204,255)' style='background-color:"+uColorInputTxt+" !important;' size='7' value='"+uColorInputTxt+"'>"+
		"<div class='cL'></div>"+
		"<span class='l'>Button Hover Color:</span>"+
		 "<label for='gsconf_uColorButtonHoverStandard_Rad' title='The new standard'><input type='radio' id='gsconf_uColorButtonHoverStandard_Rad' name='gsconf_uColorButtonHover'"+(uColorButtonHover=="#36f"?" checked='checked'":"")+ ">Standard&nbsp;</label>"+
		 "<label for='gsconf_uColorButtonHoverClassic_Rad' title='The oldschool'><input type='radio' id='gsconf_uColorButtonHoverClassic_Rad' name='gsconf_uColorButtonHover'"+(uColorButtonHover=="#6495ed"?" checked='checked'":"")+">classic&nbsp;</label>"+
		 "<label for='gsconf_uColorButtonHoverCustom_Rad' title='Enter valid named-colors, HEX [#336699 / #369] or RGB(204,204,255)'><input type='radio' id='gsconf_uColorButtonHoverCustom_Rad' name='gsconf_uColorButtonHover'"+(uColorButtonHover!="#36f"&&uColorButtonHover!="#6495ed"?" checked='checked'":"")+">custom&nbsp;</label>"+
		 "<input type='text' id='gsconf_uColorButtonHoverCustom' title='Enter valid named-colors, HEX [#336699 / #369] or RGB(204,204,255)' style='background-color:"+uColorButtonHover+" !important;' size='7' value='"+uColorButtonHover+"'>"+
		"</div>"+
		"<div class='l lb'>"+
		"<li class='cL'>Hide Page Objects:</li>"+
		"<label for='gsconf_uHideLogos' title='Removes all home & search Google logos, even the special-logos'><input type='checkbox' id='gsconf_uHideLogos'"+(uHideLogos?" checked='checked'":"")+"> All Google Logos</label><br />"+
		"<label for='gsconf_uHideAds' title='Really clean-up & simplity the layout with wider results for more productivity'><input type='checkbox' id='gsconf_uHideAds'"+(uHideAds?" checked='checked'":"")+"> Advertisements</label><br />"+
		"<label for='gsconf_uHideFooters' title='Extraneous data-ink removed'><input type='checkbox' id='gsconf_uHideFooters'"+(uHideFooters?" checked='checked'":"")+"> Most Footers</label>"+
		"</div>"+
		"<li>Features:</li>"+
		"<label for='gsconf_uRemoveST' title='Restore search links to their less-creepy nature'><input type='checkbox' id='gsconf_uRemoveST'"+(uRemoveST?" checked='checked'":"")+"> Remove Search Tracking</label><br />"+
		"<label for='gsconf_uForceSSL' title='Make sure your data is safe when & where it counts'><input type='checkbox' id='gsconf_uForceSSL'"+(uForceSSL?" checked='checked'":"")+"> Force Secure Connection</label><br />"+
		"<label for='gsconf_uCheckUpdates' title='Once a day, the script will look for an update'><input type='checkbox' id='gsconf_uCheckUpdates'"+(uCheckUpdates?" checked='checked'":"")+"> Auto-Check For Updates</label>"+
		"</ul>"+
		"<div id='gsconfButDiv' class='cL'>" +
		"<input type='button' id='gsconfOKBut' value='Save' title='Save the current configuration'>"+
		"<input type='button' id='gsconfCancelBut' value='Cancel' title='Return to the page without saving'>"+
		"<input type='button' id='gsconfUpdateBut' value='Check for Updates' title='Manually check for script updates'>"+
		"</div>";

		// Appends the layers to the document
		document.body.appendChild(maskLayer);
		document.body.appendChild(dialogLayer);

		// Adds the necessary event listeners
		maskLayer.addEventListener("click",hideLayers,false);

		$("gsconf_uFontFamily_Sel").addEventListener("mouseup",cfgWinFont,false);
		$("gsconf_uFontFamily_Sel").addEventListener("keyup",cfgWinFont,false);

		$("gsconf_uColorLinkStandard_Rad").addEventListener("click",cfgLc,false);
		$("gsconf_uColorLinkClassic_Rad").addEventListener("click",cfgLc,false);
		$("gsconf_uColorLinkCustom_Rad").addEventListener("click",cfgLc,false);
		$("gsconf_uColorLinkCustom").addEventListener("focus",cfgLcF,false);
		$("gsconf_uColorLinkCustom").addEventListener("blur",cfgLcB,false);

		$("gsconf_uColorLinkVisitedStandard_Rad").addEventListener("click",cfgLv,false);
		$("gsconf_uColorLinkVisitedClassic_Rad").addEventListener("click",cfgLv,false);
		$("gsconf_uColorLinkVisitedCustom_Rad").addEventListener("click",cfgLv,false);
		$("gsconf_uColorLinkVisitedCustom").addEventListener("focus",cfgLvF,false);
		$("gsconf_uColorLinkVisitedCustom").addEventListener("blur",cfgLvB,false);

		$("gsconf_uColorInputTxtStandard_Rad").addEventListener("click",cfgIt,false);
		$("gsconf_uColorInputTxtCustom_Rad").addEventListener("click",cfgIt,false);
		$("gsconf_uColorInputTxtCustom").addEventListener("focus",cfgItF,false);
		$("gsconf_uColorInputTxtCustom").addEventListener("blur",cfgItB,false);

		$("gsconf_uColorButtonHoverStandard_Rad").addEventListener("click",cfgBh,false);
		$("gsconf_uColorButtonHoverClassic_Rad").addEventListener("click",cfgBh,false);
		$("gsconf_uColorButtonHoverCustom_Rad").addEventListener("click",cfgBh,false);
		$("gsconf_uColorButtonHoverCustom").addEventListener("focus",cfgBhF,false);
		$("gsconf_uColorButtonHoverCustom").addEventListener("blur",cfgBhB,false);

		$("gsconfOKBut").addEventListener("click",saveConfiguration,false);
		$("gsconfCancelBut").addEventListener("click",hideLayers,false);
		$("gsconfUpdateBut").addEventListener("click",scriptUpdateCheck,false);

		$("gsconf_uFontFamily_Sel").focus();
	}

	// ConfigWin Font change title-preview
	function cfgWinFont(){$("gsconfTitle").style.fontFamily=$("gsconf_uFontFamily_Sel").value;}

	// ConfigWin Color radio/txtbox selection
	function _cfgC(w,s,c,b){
		if(typeof b=="boolean"){
			if(b==true){ //onBlur
				if($("gsconf_"+w+"Custom").value==s)$("gsconf_"+w+"Standard_Rad").click();
				else if($("gsconf_"+w+"Custom").value==c)$("gsconf_"+w+"Classic_Rad").click();
				else $("gsconf_"+w+"Custom").style.setProperty("background-color",$("gsconf_"+w+"Custom").value,"important");
			}
			else if(b==false)$("gsconf_"+w+"Custom_Rad").checked=true; //onFocus

		}
		else if($("gsconf_"+w+"Standard_Rad").checked){
			$("gsconf_"+w+"Custom").style.setProperty("background-color",s,"important");
			$("gsconf_"+w+"Custom").value=s;
		}
		else if($("gsconf_"+w+"Classic_Rad")&&$("gsconf_"+w+"Classic_Rad").checked){
			$("gsconf_"+w+"Custom").style.setProperty("background-color",c,"important");
			$("gsconf_"+w+"Custom").value=c;
		}
		else if($("gsconf_"+w+"Custom_Rad").checked){
			$("gsconf_"+w+"Custom").focus();
			$("gsconf_"+w+"Custom").select();
		}
	}
	function cfgLc(b){_cfgC("uColorLink","#3366CC","#6495ed",b)} function cfgLcF(){cfgLc(false)} function cfgLcB(){cfgLc(true)}
	function cfgLv(b){_cfgC("uColorLinkVisited","#6e37cc","#406b80",b)} function cfgLvF(){cfgLv(false)} function cfgLvB(){cfgLv(true)}
	function cfgIt(b){_cfgC("uColorInputTxt","#ff0","",b)} function cfgItF(){cfgIt(false)} function cfgItB(){cfgIt(true)}
	function cfgBh(b){_cfgC("uColorButtonHover","#36f","#6495ed",b)} function cfgBhF(){cfgBh(false)} function cfgBhB(){cfgBh(true)}

	// Changes the enabled state of all input/select fields of the dialog layer. If newState is undefined or not boolean, it does nothing
	function setDialogInputState(newState){
		if(typeof(newState)!="boolean")return;
		var allInputs=$x(".//input|.//select",dialogLayer);
		allInputs.forEach(function(i){i.disabled=!newState;});
	}

	// Exits the configuration by hiding the layers
	function hideLayers(evt){
		dialogLayer.style.display="none";
		maskLayer.style.display="none";
	}

	// Implements a master/slave logic to two following sibling checkboxes. The first is the master one and the following is the slave one
	//  The slave checkbox is disabled and unchecked when the master one is unchecked. It is called by the master checkbox event listener
	function chkDependantLogic(evt){
		var chkMasterState=evt.target.checked;
		var chkSlave=$x1("following-sibling::input[@type='checkbox']",evt.target);
		if(!chkSlave)return;
		if(chkMasterState===false)chkSlave.checked=false;
		chkSlave.disabled=!chkMasterState;
	}

	// Checks and saves the configuration to the configuration variables
	function saveConfiguration(evt){
		setDialogInputState(false); //Disables the input/select fields

		GM_setValue("uConfigMk",currentMk); //scriptConfig SettingsRevision
		GM_setValue("uFontFamily",$("gsconf_uFontFamily_Sel").value);
		GM_setValue("uColorLink",$("gsconf_uColorLinkCustom").value);
		GM_setValue("uColorLinkVisited",$("gsconf_uColorLinkVisitedCustom").value);
		GM_setValue("uColorInputTxt",$("gsconf_uColorInputTxtCustom").value);
		GM_setValue("uColorButtonHover",$("gsconf_uColorButtonHoverCustom").value);
		GM_setValue("uHideLogos",$("gsconf_uHideLogos").checked);
		GM_setValue("uHideAds",$("gsconf_uHideAds").checked);
		GM_setValue("uHideFooters",$("gsconf_uHideFooters").checked);
		GM_setValue("uRemoveST",$("gsconf_uRemoveST").checked);
		GM_setValue("uForceSSL",$("gsconf_uForceSSL").checked);
		GM_setValue("uCheckUpdates",$("gsconf_uCheckUpdates").checked);

		window.location.reload(); //Reloads page/script
	}
}
// Registers the configuration menu command
GM_registerMenuCommand("google Enhanced BLACK Configuration",configureScript);

// Check if first-run (settings insufficient/out-of-date)
if(typeof uConfigMk=="number"&&uConfigMk<currentMk)configureScript("f1rst");

}
/* /!CHECK */

// Force Secure Connection
function FSC(){var Gtld=location.host.substring(iO(location.host,".google.")+8,location.host.length),lH=location.href,sL=[
	"mail.google.",
	".google."+Gtld+"/calendar/",
	"docs.google.",
	"spreadsheets.google.",
	"www.google."+Gtld+"/reader/",
	"www.google."+Gtld+"/bookmarks/",
	"www.google."+Gtld+"/history/",
	"groups.google."+Gtld+"/",
	"sites.google."+Gtld+"/",
//	"knol.google.",
	".google."+Gtld+"/notebook/",
	".google."+Gtld+"/webmasters/tools/",
	".google."+Gtld+"/contacts",
	".google."+Gtld+"/voice/",
	".google."+Gtld+"/finance",
	".google."+Gtld+"/dictionary"];

	for(iE in sL)if(iO(lH,"http:")>-1&&iO(lH,sL[iE])>1)location.replace(location.href.replace("http:","https:"));
}
if(uForceSSL)FSC();


// RUN!!!
enhanceGoogle();


//Create quick icon --Kram-- (Thanks Mikado)
var FRAMEDELAY = 50,
	names = ['Facebook','Gmail', 'Calendar', 'Blogger', 'Documents', 'Picasa Album', 'YouTube', 'Notebook'],
	urls = ['http://www.facebook.com/','http://mail.google.com/', 'http://www.google.com/calendar', 'http://blogger.com/', 'http://docs.google.com/', 'http://picasaweb.google.com/', 'http://youtube.com/', 'http://www.google.com/notebook'];
try {

var place = document.getElementById('footer').parentNode.insertBefore(document.createElement('div'),document.getElementById('footer'));

var tabic = document.createElement('table');
tabic.setAttribute('style','font-size:13px');
place.appendChild(tabic);

var tric = document.createElement('tr');
tric.setAttribute('valign','bottom');
tric.setAttribute('align','center');
tabic.appendChild(tric);

place = place.firstChild.rows[0];

for (var i = 0; i < 7; i++) {
	new icon(names[i], urls[i], i);
}

}catch(e){};
function icon(name, url, index) {
	this.name = name;
	this.url = url;
	this.x = 0;
	this.y = 'px ' + index * -37 + 'px';
	this.moving = false;
	
	var alink = document.createElement('a');
	alink.setAttribute('href',url);
  alink.setAttribute('style','display:block;margin:0 6px 0 6px;');

  var divic = document.createElement('div');
  divic.setAttribute('style','width:52px;height:37px;background:transparent url(http://img580.imageshack.us/img580/7946/test3q.png) no-repeat scroll 0 0;');
  
  var nameic = document.createTextNode(name);
  
  
	with (place.insertCell(-1)) {
	  appendChild(alink);
    alink.appendChild(divic);
    alink.appendChild(nameic);
    
	  //innerHTML = '<a href="' + url + '" style="display:block;margin:0 6px 0 6px;"><div style="width:52px;height:37px;background:transparent url(http://img580.imageshack.us/img580/7946/test3q.png) no-repeat scroll 0 0;"></div>' + name + '</a>';
		alink.addEventListener('mouseover', animstart(this), true);
		alink.addEventListener('mouseout', animend(this), true);
		this.obj = divic;
	}
    
	this.obj.style.backgroundPosition = '0' + this.y;
}

function animstart(ico) {
	return function(e) {
		if (ico.moving) clearInterval(ico.moving);
		ico.moving = setInterval(movebg, FRAMEDELAY, ico, 1);
	}
}

function animend(ico) {
	return function(e) {
		if (ico.moving) clearInterval(ico.moving);
		ico.moving = setInterval(movebg, FRAMEDELAY, ico, -1);
	}
}

function movebg(ico, dir) {
	if ((dir == 1 && ico.x == 6) || (dir == -1 && ico.x == 0)) { clearTimeout(ico.moving); return; }
	ico.x += dir;
	ico.obj.style.backgroundPosition = -ico.x * 52 + ico.y;
}

// Googlenlarge
// @description   Enlarges pictures when you roll over them
// @include       http://images.google.com/*
// ==/UserScript==
//
// By: Ian Williams
// Email: iamtotus@gmail.com
// Last Update:  3.9.2007
/*
imagepreview();
//if there are async change recall function
var te = document.getElementById('ImgContent');
if(te!=null){
te.addEventListener('DOMNodeInserted', function(event) {imagepreview();}, true);
}

function imagepreview(){

var allDiv = document.getElementById('ttallpre');
if(allDiv != null){
    while (allDiv.firstChild){
      allDiv.removeChild(allDiv.firstChild);
    }
}else{
  allDiv = document.createElement('div');
  allDiv.setAttribute("id","ttallpre");
  document.body.appendChild(allDiv);
}

var allImages, thisImage;
var allLinks, thisLink;
var globalTimer;
allLinks = document.evaluate( '//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
allImages = document.evaluate('//img', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// Holds paths of all the enlarged images
imgArray = new Array( allImages.snapshotLength * 2);

var i=0;
var Swidth;
var Sheight;
while (i < allImages.snapshotLength) {

	thisImage = allImages.snapshotItem(i);

	// Get the image URL from the Google URL
	var src = thisImage.src;
	var fileName = src.substring(src.lastIndexOf('http:') , src.length );

	//Get the image width and length for possible resizing
	if(fileName.search(/http/) != -1 && fileName.search(/google.com/) == -1) {
		for(var j=0; j < allLinks.snapshotLength; j++) {
			thisLink = allLinks.snapshotItem(j);
			a = String(thisLink);
			var located = a.indexOf(fileName);
			
			if ( located != -1) {
			  
				a = a.substring(a.lastIndexOf('&h='), a.length);
				Sheight = a.substring(3, a.indexOf('&w') );
				Swidth = a.substring(a.indexOf('&w') + 3, a.indexOf('&sz=') );
				j = allLinks.snapshotLength;
			}
		}
	}


	// Fix an error javascript has with handling spaces
	while (fileName.search(/%2520/) != -1) {
		fileName = fileName.replace(/%2520/, "%20");
	}
	
	var Zwidth = parseInt(Swidth);
	var Zheight = parseInt(Sheight);
	
	if(Zwidth > 0 && Zheight > 0) {
		if( Zwidth > window.innerWidth/2) {
			var ratio = ((window.innerWidth/2)/Zwidth) * .9;
			Zwidth *= ratio; Zwidth = parseInt(Zwidth);
			Zheight *= ratio; Zheight = parseInt(Zheight);
		}
		if( Zheight > window.innerHeight) {
			var ratio = (window.innerHeight/Zheight) * .9;
			Zwidth *= ratio; Zwidth = parseInt(Zwidth);
			Zheight *= ratio; Zheight = parseInt(Zheight);
		}
	}

	thisImage.alt = i;
	imgArray[i] = fileName;
	imgArray[i + allImages.snapshotLength] = src;
	  
	var newDiv = document.createElement('div');
	newDiv.setAttribute("id","t" + i);
	newDiv.setAttribute("class","tip");
	newDiv.setAttribute("style","font:10px/12px Arial,Helvetica,sans-serif;border:0;padding:3px 3px 1px 3px;visibility:hidden;position:fixed;z-index:100;color:#333333;top:20px;left:90px;background-color:#3B5998;");
	allDiv.appendChild(newDiv);

	var newImg = document.createElement("img");
	newImg.setAttribute("id","i" + i);
	newImg.setAttribute("src",fileName);
	newImg.setAttribute("width",Zwidth);
	newImg.setAttribute("height",Zheight);
	newImg.setAttribute("alt",i);
	//newImg.setAttribute("visibility",'hidden');
	newImg.setAttribute("style","border:2px solid white;")
	newDiv.appendChild(newImg);
	
	thisImage.addEventListener( 'mouseover', function(event) {var x = event.pageX; var y = event.pageY; var z = 't' + this.alt; globalTimer = window.setTimeout( function() { popUp(x,y,z); }, 500);}, true);
	thisImage.addEventListener( 'mouseout', function(event) {window.clearTimeout(globalTimer); document.getElementById('t' + this.alt).style.visibility = "hidden"; }, true);
	newImg.addEventListener('click', function(event) {window.clearTimeout(globalTimer);document.getElementById('t' + this.alt).style.visibility = "hidden"; }, true);
	i++;
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.tip {font:10px/12px Arial,Helvetica,sans-serif;border:0;padding:3px 3px 1px 3px;visibility:hidden;position:fixed;z-index:100;color:#333333;top:20px;left:90px;background-color:#3B5998;}');
addGlobalStyle('.tip img {border:2px solid white;}');


function popUp(pgX,pgY,oi) {
	var winWidth = window.innerWidth;
	var winHeight = window.innerHeight;
	objStyle = document.getElementById(oi).style;
	obj = document.getElementById(oi);
	objWidth = obj.offsetWidth;
	objHeight = obj.offsetHeight;

	objStyle.visibility = "hidden";

	objStyle.top = '5px';
	if (pgX < (winWidth/2) ) {
		var spacing = winWidth - objWidth - 30;
		spacing += 'px'
		objStyle.left = spacing;
	}
	else {
		objStyle.left = '5px';
	}

	if ( (5 + objHeight) < winHeight ) {
		objStyle.visibility = "visible";
	}
}
}
*/
// ==UserScript==
// @@name          Google Link Preview
// @@namespace     http://loucypher.wordpress.com/
// @@include       http://www.google.tld/search?*
// @@include       http://www.google.tld/custom?*
// @@include       http://www.google.tld/search%3F*
// @@@include       http://www.google.tld/custom%3F*
// @@include       http://www.google.com/blogsearch*
// @@description	  Adds Clusty.com-like magnifiers on web and news search results to preview a link in a frame
// ==/UserScript==

// Last updated: 2007-08-03

  var links = document.evaluate( '//a[@class="l"]', document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  if (links.snapshotLength != 0) {

  for (var i = 0; i < links.snapshotLength; i++) {
    var link = links.snapshotItem(i);
    if(link.hasAttribute("onmousedown")) link.removeAttribute("onmousedown");
  
    var pLink = link.parentNode.insertBefore(document.createElement("a"),
                                             link.nextSibling)
    pLink.href = link.href;
    pLink.title = "preview";
    pLink.style.marginLeft = "1em";
    pLink.addEventListener("click", function(e) {
      e.preventDefault();
      var pClosed = "data:image/gif;base64,\iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAACXBIWXMAAArwAAAK8AFCrDSYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAGRSURBVHjahJHNahRREEbPvbd7QquDjiGjYCABEVGXosSdL+DWnc+h4BO48THcuHTjAwgyieLGxAzGxBASZ+yYdLCn/+5PuRhxbEHybWpRnDoflErTFICDMpHj2lBZwfkAQC+uuTYflKIdlaYp2/lZiYyhd2a2dj6wd1gxKSpWlk0L1PtlIsZo+ucUlfVkhSMrHHkdWF5IMFHE+91a/jbpo1JzMVH8rD1FIwSBxgmNE9LccWU+Yed73aqniyZgNBTN9Jj1ggCNFxovdGLDyaRpQVFjHUFiXJhC/04vUFvXNqngqGwg0orGCfK7nghEWlFUlg6+DfXmPF/HBd05TccorJ8aYqO4kBg+fjnk/MkH6mw0g25d1iqfFKzvZsQG+t2Ifjeio4XVjRH5jxH3L31j/eVTKY/2Z38CeLs1ke1xRVZYnPV0DCw0n7kTrbJ44y4HwzV2NgbcfvRc/YH+l+GrZ6LqjKWb99jbHLD1aYDmlFx/8FiVErP57jX9xavkx2NONQEEb1l78UTGwzcsrTzk1wCva9rYkVccDgAAAABJRU5ErkJggg==";
      var pOpen = "data:image/gif;base64,\iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAACXBIWXMAAArwAAAK8AFCrDSYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAHMSURBVHjafNHBahNhFMXx/zeTpFWQEEMxCo0xEBqxrmxN4koLgoh9BN2KT6DgE7jQfZeCVCHLLgRBV2LTRFCo1YampmmNbUhqok4nk5lv5rrQJm70bA+/u7hH1ZkWQP3YLkl3YOJ4gvYDAGLhAZl4oBSjWBNXJAQoQDRhkrFRrf2AnY6mtOVJPmUq9QekZFWp99uWaELEkzP0dys4ngxhdNxkvfkTw3fIzlwjJasKQL2q2pI6buLogCMnZ9lvlNH+CI6HIJrMDQGAYbsBpgG2K+w3ysRPX0QA1xdcX4gmczwrFodHOp0OhutpAgEdCDoQvtRKJNI5dCBMZvJYX98y8PQQABgq0DheQMhQuFoQgc/ry5yZKrCzUcJ2PCL4QwBgxMZ8tlo2x8YMIqbC84V09jeYzOT5sNkh+v0dg97eCJ1LGMo6sFlr9AibkM4WsJoVIobw8sUSc1fnuXxil7Xifel/awKg2u02AMu1AzlfuMHjxadozydiwoS7wWyoTPzWc7pPrlP/uMKFm4/UEB0O9/eXAKpLD0QNepy6U2Jv4RK1TysY/wMAU/N3VV/CbD48S+L2G6xuC1Vn+p/gMIHvUVm8J63qa+YWjvJrAGOK9wK3jTMuAAAAAElFTkSuQmCC";
      this.firstChild.src = this.firstChild.src == pOpen ? pClosed : pOpen;
      this.title = this.title == "preview"?"close preview":"preview";
      this.nextSibling.style.display = this.nextSibling
                                           .style.display == "none" ? "" : "none";
      if (!this.nextSibling.hasAttribute("src"))
        this.nextSibling.src = this.previousSibling.href;
    }, false);

    var img = pLink.appendChild(document.createElement("img"));
    img.alt = "preview";
    img.border = "none";
    img.align = "absmiddle";
    img.src = "data:image/gif;base64,\iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAACXBIWXMAAArwAAAK8AFCrDSYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAGRSURBVHjahJHNahRREEbPvbd7QquDjiGjYCABEVGXosSdL+DWnc+h4BO48THcuHTjAwgyieLGxAzGxBASZ+yYdLCn/+5PuRhxbEHybWpRnDoflErTFICDMpHj2lBZwfkAQC+uuTYflKIdlaYp2/lZiYyhd2a2dj6wd1gxKSpWlk0L1PtlIsZo+ucUlfVkhSMrHHkdWF5IMFHE+91a/jbpo1JzMVH8rD1FIwSBxgmNE9LccWU+Yed73aqniyZgNBTN9Jj1ggCNFxovdGLDyaRpQVFjHUFiXJhC/04vUFvXNqngqGwg0orGCfK7nghEWlFUlg6+DfXmPF/HBd05TccorJ8aYqO4kBg+fjnk/MkH6mw0g25d1iqfFKzvZsQG+t2Ifjeio4XVjRH5jxH3L31j/eVTKY/2Z38CeLs1ke1xRVZYnPV0DCw0n7kTrbJ44y4HwzV2NgbcfvRc/YH+l+GrZ6LqjKWb99jbHLD1aYDmlFx/8FiVErP57jX9xavkx2NONQEEb1l78UTGwzcsrTzk1wCva9rYkVccDgAAAABJRU5ErkJggg==";
      

    var iframe = link.parentNode.insertBefore(document.createElement("iframe"),pLink.nextSibling);
    iframe.style.display = "none";
    iframe.width = "100%";
    iframe.height = "250";
    iframe.appendChild(document.createTextNode(""));
  }
  }