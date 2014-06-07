// ==UserScript==

	// @name		iBlackle
	// @description		iBlackle Theme for iGoogle
	// @version		1.0.0
	// @date		2007-11-28
	// @source		http://userscripts.org/scripts/show/38546
	// @identifier		http://userscripts.org/scripts/source/38546.user.js

	// @author		metapsyche
	// @namespace		http://userscripts.org/users/38546

	// @include		http://*.google.*/*

	// @exclude		http://*.google.*/custom*
	// @exclude		http://www.google.com/cse
        // @exclude		http://mail.google.com/mail/*


// ==/UserScript==
var SCRIPT = {
	name:		"iBlackle",
	namespace:	"http://userscripts.org/users/38546",
	description:	"iBlackle Theme for iGoogle",
	source:		"http://userscripts.org/scripts/show/14915",
	identifier:	"http://userscripts.org/scripts/source/14915.user.js",
	version:	"1.0.0",
	date: (new Date( 2007,11,28 )).valueOf()
};


// Change Log:
	// Version 1.0.0	Initial Release



// To Do:
	// Add Theme Background


var iBlackle; 

function iBlackleize() { iBlackle =


// General Google Page Enhancements
	/* page bg */			"BODY   {background-color:#000 !important; color:#fff;}" +
	/* link color */		"A, SPAN.i, .linkon, #codesiteContent A, TABLE.mmhdr TBODY TR TD.mmttlinactive SPAN, TABLE TBODY TR TD TABLE TBODY TR TD A   {color:#cbcbcb !important;}" +
	/* visited link color */	"A:visited   {color:#369 !important;}" +
	/* inner txt color */		"DIV, TD { color:#grey !important; border: 0}" +
	/* bold txt color */		"B { color:#fff !important;}" +
	/* google bar */		"DIV#gbar .gbard {background-color: Black;}" +
	/* google bar */		"DIV#gbar, #guser, #gbarc {background-color: Black;}" +
	/* google bar.table*/		"DIV#gbar tabke {background-color: Black;}" +
	/* google bar txt */		"DIV#gbar SPAN   {color:#999;}" +
	/* top logos */			"#logo SPAN, DIV#regular_logo, TABLE[align='center'] TBODY TR TD DIV#logo, #search .logo, #wrapper #header, TABLE[width='100%'][cellpadding='2'] TBODY TR TD[width='1%'][valign='top'], #gc-header #logo, #header #logo, TABLE[style='margin: 0px 0px -6px 0pt; padding: 0px; width: 100%;'] TD[style='width: 153px;'], TABLE[align='center'] TBODY TR TD[width='155'][rowspan='2'], TABLE[align='center'] TBODY TR[valign='middle'] TD[width='135'], BODY[bgcolor='#ffffff'][topmargin='3'] CENTER TABLE[width='725'] TBODY TR TD TABLE[cellspacing='1'] TBODY TR TD[height='1'][bgcolor='#666666'], BODY > TABLE[width='100%'][style='direction: ltr;'] > TBODY > TR > TD, BODY > TABLE[width='100%'] > TBODY > TR > TD[width='100%'][style='padding-left: 15px;'], BODY.siteowners > TABLE[width='96%'] > TBODY > TR > TD[width='1%'], BODY > CENTER > DIV > TABLE[width='739'] > TBODY > TR > TD[width='100%'], BODY[bgcolor='#ffffff'] > TABLE[cellpadding='5'][align='center'] > TBODY > TR[valign='middle'] > TD[width='1%']   {width:240px; height:55px; background:transparent url('" + iBlackleLogo + "') no-repeat scroll 0% !important;}" +
	/* search input */		"INPUT[type='text'], INPUT[name='q']   { background: #1B1B1B none !important; color:#fff; padding:2px; border:solid 1px #ccc; font-weight:bold; color:Green; font-size: 14px;text-align:center; !important;}" +
	/* submit btns */		"INPUT[type='submit'], INPUT[value='Cancel'], INPUT[value='Save'], BUTTON, INPUT#stxemailsend, INPUT[value='Discard'], BUTTON[type='submit'], INPUT[value='Download'], INPUT[value='Add it now']   {background-color:#333; border:solid 1px #ccc; -moz-border-radius-topright:6px; -moz-border-radius-topleft:6px; -moz-border-radius-bottomright:6px; -moz-border-radius-bottomleft:6px; color:#fff !important; cursor:pointer;}" +
	/* submit btn hover */		"INPUT[type='submit']:hover, BUTTON[type='submit']:hover   {background-color: Green; color:#fff;}" +
	/* home & images logo img */	"IMG[width='276']   {height:0px; padding-top:65px; background:transparent url('" + iBlackleLogo + "') no-repeat scroll bottom center !important;}" +
	/* more pop layer */		"SPAN#more, #gbar .gb2   {background-color:#333 !important; border-right:solid 1px #a2bae7; border-bottom:solid 1px #a2bae7; color:#333 !important;}" +
	/* google alerts txt */		"P[style='margin-left: 9px;'], SPAN[style='font-size: medium;']   {color:#999;}" +
	/* mainbody txt */		"DIV.mainbody, TD.j, DIV.empty, DIV.empty DIV   {color:#999 !important;}" +
	/* remove footers */		"#footer, #footer_promos, #footerwrap, P FONT[size='-2'], TABLE[class='t n bt'][width='100%'][cellpadding='2'], DIV[align='center'][style='white-space: nowrap;'], FONT[class='p'][size='-1'], FONT[size='-1'][color='#6f6f6f'], DIV.div-copyright, SPAN.copyr, DIV.content DIV.footer, DIV#footarea, TABLE[width='99%'][cellpadding='3'][bgcolor='#c3d9ff'][align='center'][style='margin-bottom: 5px;']   {display:none;}" +

	// Preferences
		/* pre title line */	"TABLE TBODY TR TD[bgcolor='#3366cc']   {display:none;}" +
		/* title header txt */	"TABLE TBODY TR TD[bgcolor='#e5ecf9'] FONT B   {color:#999 !important;}" +
		/* headers */		"TABLE TBODY TR TD[bgcolor='#e5ecf9'], TABLE TBODY TR[bgcolor='#e5ecf9']   {background-color:#000;}" +


// iGoogle Homepage Enhancements
	/* search btn spacing */	".gseain INPUT[type='submit'], INPUT[name='btnG'], INPUT[name='btnI']   {margin-top:5px; margin-right:30px; margin-left:30px;}" +
	/* go btns hover */		"INPUT#btnI:hover, INPUT[name='btnI']:hover, INPUT[value='Save']:hover, SPAN#button_0 BUTTON:hover, INPUT#stxemailsend:hover, INPUT[value='Submit Issue']:hover, INPUT[value='Download']:hover, INPUT[value='Add it now']:hover   {background-color:#090; color:#fff;}" +
	/* setup block */		"DIV.setup_div   {background-color:#333; border:solid 1px #ccc; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px;}" +
	/* setup title txt */		"DIV.setup_title_welcome, DIV.setup_promo, DIV.setup_promo_subtext   {color:#999 !important;}" +
	/* tabs */			".selectedtab { background-color: #2e2e2e;}" +
	/* tabs */			"#tabs UL LI   { -moz-border-radius-topright:6px; -moz-border-radius-topleft:6px;}" +
	/* module delete conf.box */	"DIV#undel_box   {background-color:#333; border:1px solid #ff0; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px; -moz-border-radius-bottomright:14px; -moz-border-radius-bottomleft:14px; color:#ff0 !important;}" +
	/* skins box title */		"H2.modtitle_s   {background-color:#feffc5; border:0; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px;}" +
	/* skins box title txt */	"H2.modtitle_s B   {color:#000 !important;}" +
	/* skins box body */		"DIV#skinbox_b   {background-color:#000; border:solid 1px #feffc5 !important;}" +
	/* skins box themes */		"DIV.skinthsel B, DIV.skinth B   {color:#000 !important;}" +
	/* dialog box */		"TABLE.dialog TBODY TR TD DIV   {background-color:#333 !important; border:0 !important; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px; -moz-border-radius-bottomright:14px; -moz-border-radius-bottomleft:14px;;}" +
	/* dialog box txt */		"LABEL[for='share_userprefs'], TABLE#email TBODY TR TD, TABLE#email TBODY TR TD DIV   {color:#999 !important;}" +
	/* dialog box btns */		"TABLE.dialog TBODY TR TD DIV#buttons   {padding-bottom:10px;}" +
	/* add tab dialog */		"BODY.mozilla> DIV#IG_PU_box TABLE.dialog TBODY TR TD DIV.outerborder DIV   {color:#999 !important;}" +
	/* new tab txt */		"#modules > TABLE[width='98%'][cellspacing='10'][align='center'] > TBODY > TR > TD > DIV[align='center'][style='padding-bottom: 100px;']   {color:#999 !important;}" +
	/* module border */		".modbox, .modbox_e   {background-color:#000; -moz-border-radius-bottomright:14px; -moz-border-radius-bottomleft:14px;}" +
	/* module bg */			".modboxin, .modboxin IFRAME HTML BODY   { background-color:#131313 !important; }" +
	/* module border */		".modboxin, .modboxin_s, .modtitle   {border:1px solid #1B1B1B !important; border-top: 0 }" +
	/* module innards */		".modboxin div, .modboxin td {border: 0 !important }" +
	/* module area bg */		"#modules   {background-color:#000;}" +
	/* module title bg */		".modtitle   {-moz-border-radius-topleft:6px; -moz-border-radius-topright:6px; background-color:#333;}" +
	/* module title txt */		".modtitle_text,.mtlink   {color:#999 !important;}" +
	/* module settings line */	"DIV.meditbox   {margin-top:0; border:0;}" +
	/* module settings txt */	"DIV.meditbox DIV, DIV.meditbox TD, DIV.meditbox SPAN, DIV.meditbox NOBR   {color:#999 !important;}" +
	/* module inner detail txt */	".modboxin FONT   {color:#000 !important;}" +
	/* cancel btn hover */		"INPUT[value='Cancel']:hover, SPAN#button_1 BUTTON:hover, INPUT[value='Discard']:hover   {background-color:#990000 !important; color:#fff !important;}" +

	// Module-specific Requests
		/* gmail */		"HTML > BODY > DIV > #modules A B   {color:#36a !important;}" +
		/* youtube video */	"HTML > BODY > DIV > DIV#middle, HTML > BODY > DIV > DIV#uppernav, HTML > BODY > DIV > DIV#searchFooter   {background-color:#fff;}" +

	// Add Stuff
		/* header */		"#wrapper #header   {width:inherit;}" +
		/* header box */	"#wrapper #header .header_title   {background-color:#333; border:0 !important; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px; -moz-border-radius-bottomright:14px; -moz-border-radius-bottomleft:14px; color:#000 !important;}" +
		/* menu headers */	"#wrapper #container #nav LI.navhead   {margin-top:25px; padding:0 3px 0 3px; background-color:#333; border:0 !important; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px; color:#000;}" +
		/* gadget txt */	"#wrapper #container #gadget-info TABLE TBODY TR TD, #wrapper #container #comments DIV, #wrapper #container #pagehead, #wrapper #container #search_main DIV, #wrapper #container UL#nav, #wrapper #container DIV#main DIV   {color:#999 !important;}" +
		/* added msg */		"#wrapper #container #main DIV DIV DIV[class='added fixedwidth'][style='display: block;']    {-moz-border-radius-topright:14px; -moz-border-radius-topleft:14px; -moz-border-radius-bottomright:14px; -moz-border-radius-bottomleft:14px;}" +
		/* screenshot border */	"#wrapper #container #gadget-info TABLE TBODY TR TD.screenshot-box IMG   {border:0;}" +
		/* sidebar item head */	"#wrapper #sidebar DIV.module H3   {background:#333; padding-bottom:5px; border:0; -moz-border-radius-topleft:14px; -moz-border-radius-topright:14px; color:#000;}" +
		/* sidebar item */	"#wrapper #sidebar DIV.module   {background:#000; padding-bottom:20px; border:0; moz-border-radius-bottomleft:14px; -moz-border-radius-bottomright:14px; color:#999 !important;}" +
		/* makeyourown logo */	"IMG[src='http://img2.gmodules.com/ig/images/igoogle_logo_sm.gif']   {display:none;}" +
		/* makeyourown head */	"TABLE TBODY TR TD DIV#bluebar   {background-color:#333; border:0 !important; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px; -moz-border-radius-bottomright:14px; -moz-border-radius-bottomleft:14px;}" +
		/* makeyourown txt */	"CENTER DIV#gm_choices DIV, CENTER DIV#gm_choices TABLE TBODY TR TD, CENTER DIV#gm_wizard DIV.gm_intro DIV, CENTER DIV#gm_wizard TABLE TBODY TR TD, CENTER DIV#gm_wizard TABLE TBODY TR TD DIV   {color:#999 !important;}" +


// Google Search Results Page Enhancements
	/* search header bar */		"TABLE[class='t bt']   {background-color:#333; border:0; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px; -moz-border-radius-bottomright:14px; -moz-border-radius-bottomleft:14px;}" +
	/* search header bar */		"TABLE[class='ft t bb bt']   {border:0; border-top:1px}" +
	/* result-area width */		"DIV#res   {width:73% !important;}" +
	/* remove sponsored linx */	"DIV#tads   {display:none;}" +
	/* refine results txt */	"TABLE#po TBODY TR TD   {color:#999 !important;}" +
	/* sponsored linx */		"DIV#res DIV.ta   {display:none;}" +
	/* result-area txt */		"DIV#res P, DIV#res .j   {color:#999 !important;}" +
	/* description width */		"TD.j   {width:100% !important;}" +
	/* description color */		"FONT   {color:#999;}" +
	/* result spacing */		".g   {margin:2em 0pt;}" +
	/* bottom related txt */	".r   {color:#aaa;}" +
	/* nav bar */			"#navbar   {position:relative; left:33%; width:400px;}" +
	/* footer logo(s) */		"#navbar DIV,#navbar IMG   {height:0px; background:none;}" +
	/* footer bg */			"CENTER TABLE[class='ft t bb bt'] TD[align='center']   {background-color:#000 !important;}" +


// Custom Seach iFrame-edition
	/* iframe bgs */		"BODY[marginheight='2'][text='#000000'], BODY[marginheight='2'][text='#000000'] TABLE[width='1%']   {background-color:inherit !important;}" +
	/* iframe txt & linx */		"BODY[marginheight='2'][text='#000000'] A, BODY[marginheight='2'][text='#000000'] A B, BODY[marginheight='2'][text='#000000'] B   {color:inherit !important;}" +


// Images Results Enhancements
	/* sizes alert */		"DIV[style='padding: 16px 0pt;'] CENTER SPAN[style='padding: 4px; background-color: rgb(255, 255, 153);']   {padding:5px !important; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px; -moz-border-radius-bottomright:14px; -moz-border-radius-bottomleft:14px;}" +
	/* sizes alert txt */		"DIV[style='padding: 16px 0pt;'] CENTER SPAN[style='padding: 4px; background-color: rgb(255, 255, 153);'] FONT   {color:#333;}" +
	/* sizes alert highlight */	"DIV[style='padding: 16px 0pt;'] CENTER SPAN[style='padding: 4px; background-color: rgb(255, 255, 153);'] FONT B   {color:#000 !important;}" +


// Video Results Enhancements
	/* logo img */			"A#logoimg IMG   {display:none;}" +
	/* logo container */		"TD.td-logo   {height:65px; background:transparent url('" + iBlackleLogo + "') no-repeat scroll 0% !important;}" +
	/* filter option txt */		"TD[style='padding: 0pt;'] SPAN.filter-prefix, TD[style='padding: 0pt;'] LABEL.filter-option   {color:#999;}" +
	/* section header */		"DIV.div-section-header   {background-color:#333; border:0 !important; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px; -moz-border-radius-bottomright:14px; -moz-border-radius-bottomleft:14px;}" +
	/* section header txt */	"TD.td-section-header-left B   {color:#000 !important;}" +
	/* home video time */		"DIV.div-video-text   {color:#090 !important;}" +
	/* search type */		"TABLE.table-header TABLE[bgcolor='white'], DIV.menu-normalsb   {border:0; background-color:#000;}" +
	/* results header */		"TABLE#resultsheadertable   {background-color:#333; border:0; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px; -moz-border-radius-bottomright:14px; -moz-border-radius-bottomleft:14px;}" +
	/* results header title */	"TABLE#resultsheadertable TD[valign='baseline'] B   {position:relative; top:1px; left:2px; color:#000 !important;}" +
	/* result item */		"DIV.SearchResultItem   {width:100%; margin:2em 0pt;}" +
	/* result item details */	"TD.MetaData DIV.Details   {color:#999 !important;}" +
	/* result item description */	"TD.MetaData DIV.Snippet   {color:#aaa !important;}" +
	/* result item uri */		"TD.MetaData DIV.URL   {color:#090 !important;}" +
	/* footer nav table */		"TABLE#pagenavigatortable   {width:400px !important;}" +
	/* footer logo(s) */		"TABLE#pagenavigatortable TD IMG, TABLE#pagenavigatortable TD A.imglink, TABLE#pagenavigatortable TD BR   {display:none;}" +
	/* search again */		"DIV#searchagain   {border:0; background-color:#000;}" +


// News Results Enhancements
	/* search table */		"TABLE[width='1%']   {position:relative; top:1px; background-color:#000; width:100% !important;}" +
	/* logo img */			"IMG[src='/images/logo_sm.gif'], IMG[src='images/news.gif'], IMG[width='150'][height='58'][alt='Go to Google News Home']   {visibility:hidden;}" +
	/* logo img link */		"TABLE[width='1%'] TBODY TR TD[valign='top'],TABLE[align='center'] TBODY TR TD TABLE TBODY TR TD[valign='bottom']   {height:65px; background:transparent url('" + iBlackleLogo + "') no-repeat scroll 0% !important;}" +
	/* more pop layer */		"SPAN#more, #gbar .gbard, #gbar .gb2   {background-color:#333 !important; border-right:solid 1px #a2bae7; border-bottom:solid 1px #a2bae7; color:#333 !important;}" +
	/* top stories txt */		"TABLE[width='100%'] .ks   {color:#999 !important;}" +
	/* left nav bg */		".leftnav TABLE TABLE TBODY TR TD[nowrap='']   {background-color:#000;}" +
	/* left nav spacing */		".leftnav TABLE TABLE TBODY TR TD[bgcolor='#fff']   {display:none;}" +
	/* left headline */		"DIV.hd   {background:#333; -moz-border-radius-topleft:14px; -moz-border-radius-bottomleft:14px;}" +
	/* show morefewer linx */	"TABLE[bgcolor='#efefef'][style='border: 1px solid rgb(0, 0, 153);']   {background-color:#000;}" +
	/* section headers */		"DIV#section-header   {background-color:#333 !important; border:0 !important; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px; -moz-border-radius-bottomright:14px; -moz-border-radius-bottomleft:14px;}" +
	/* search header r1col1 */	"TABLE[width='1%'] TBODY TR TD[valign='top'] TABLE TBODY TR TD,TABLE[width='100%'] TBODY TR TD[bgcolor='#efefef']    {background:#000 none !important;}" +
	/* search header r1col2 */	"TABLE[width='1%'] TBODY TR TD[valign='top'] TABLE TBODY TR TD A   {position:relative; top:12px;}" +
	/* search header barL */	"TABLE TBODY TR TD[width='60%']   {background-color:#333; border:0; -moz-border-radius-topleft:14px; -moz-border-radius-bottomleft:14px;}" +
	/* search header barL txt*/	"TABLE TBODY TR TD[width='60%'] FONT   {color:#000;}" +
	/* search header barR */	"TABLE TBODY TR TD[width='40%']   {background-color:#333; border:0; -moz-border-radius-topright:14px; -moz-border-radius-bottomright:14px;}" +
	/* result spacing */		"DIV.mainbody TABLE TBODY TR TD[align='left'] TABLE[cellspacing='7'][cellpadding='2']   {margin:0.5em 0pt;}" +
	/* personalize header */	"#cust_link_tbl {background-color:#333; border:0 !important; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px;}" +

	// Image Version
		/* cell container */	"TD#ImageSection TABLE TBODY TR TD   {padding:5px;}" +
		/* cells */		"TD#ImageSection TABLE TBODY TR TD DIV[style='border: 1px solid rgb(255, 255, 255); padding: 7px 7px 4px; white-space: nowrap; width: 104px;']   {background-color:#333; border:0 !important; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px; -moz-border-radius-bottomright:14px; -moz-border-radius-bottomleft:14px;}" +
		/* img container */	"DIV.divnohighlightnoie   {border:0 none !important;}" +
		/* img container */	"DIV.divnohighlightnoie IMG.centerimagenonie   {position:relative; left:-5px;}" +
		/* rightBar */		"DIV#RightBarContent DIV   {background-color:#000 !important;}" +


	// AP/AFP.google News Enhancements
		/* body txt */		"DIV DIV#hn-content DIV   {color:#999 !important;}" +
		/* article title */	"DIV DIV#hn-content DIV H1   {color:#fff;}" +
		/* footer */		"DIV DIV#hn-footer   {display:none;}" +


// Maps Enhancements
	/* logo img */			"IMG[alt='Go to Google Maps Home']   {display:none;}" +
	/* help linx */			"DIV.helplinks DIV   {background-color:#000 !important; -moz-border-radius-bottomright:14px; -moz-border-radius-bottomleft:14px;}" +
	/* mapping tabs */		"TABLE#paneltabs TBODY TR TD   {background-color:#000 !important; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px;}" +
	/* mapping tab txt */		"TABLE#paneltabs TBODY TR TD.tabOff A DIV, TABLE#paneltabs TBODY TR TD.tabOn A DIV   {font-weight:bold; color:#999 !important;}" +
	/* map popup txt */		"DIV.iw #basics DIV, DIV.gmnoprint DIV DIV DIV B  {color:#000 !important;}" +
	/* send panel container */	"DIV.sdb   {margin:5px; background-color:#000 !important; border:3px solid #f90 !important; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px; -moz-border-radius-bottomright:14px; -moz-border-radius-bottomleft:14px;}" +
	/* send panel inner */		"DIV.sdb DIV.c, DIV.sdb DIV.c DIV DIV   {border:0 !important; background-color:#000 !important; color:#999 !important;}" +
	/* link to this page panel */	"DIV#le   {background-color:#000 !important; -moz-border-radius-bottomright:14px; -moz-border-radius-bottomleft:14px;}" +
	/* link to panel txt */		"DIV#le TABLE.letbl TBODY TR TD   {color:#999 !important;}" +
	/* results area */		"DIV#hp DIV, DIV#hp TABLE TR TD, DIV#panel DIV DIV, DIV#panel DIV TABLE TBODY TR TD, DIV#page DIV, DIV#page TABLE TBODY TR TD   {color:#777 !important;}" +
	/* sponsored linx */		"#panel DIV[class='ads topads noprint'], TABLE > TBODY > TR > TD > TABLE.geoads, TABLE > TBODY > TR > TD > DIV.adsmessage   {display:none;}" +
	/* searched term in title */	"TABLE.res TBODY TR TD DIV.name SPAN A SPAN B   {color:#aaa !important;}" +
	/* phone numbers */		"TABLE.res TBODY TR TD DIV SPAN.tel   {color:#090;}" +
	/* highlight */			"FONT[color='red']   {color:#f00;}" +
	/* map points */		"TABLE.ddwpt_table TD   {background-color:#333;}" +
	/* search logo(s) */		"DIV.n DIV.imgn IMG   {display:none;}" +
	/* legal & navtech blocks */	"DIV.legal, DIV.cprt   {display:none;}" +
	/* txt-view header */		"TABLE#titlebar   {border:0; background-color:#333; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px; -moz-border-radius-bottomright:14px; -moz-border-radius-bottomleft:14px;}" +
	/* txt-view body width */	"#contentpanel > TABLE[style='margin-top: 0.2em;'], #contentpanel > TABLE[style='margin-top: 0.2em;'] TBODY TR.lr TD TABLE, #contentpanel > TABLE[style='margin-top: 0.2em;'] TBODY TR.lr TD TABLE TBODY TR TD:nth-child(3)    {width:99%;}" +
	/* txt-view footer block */	"#localfooter TABLE TBODY TR TD   {border:0; background-color:#000;}" +
	/* mymaps feat cont bg */	"DIV.mmheaderpane DIV DIV.mmboxheaderinactive, DIV.mmboxbody IFRAME HTML BODY   {background-color:#000 !important;}" +

	// Print-page
		/*directions txt */	"DIV.segmentdiv TABLE TBODY TR TD   {background-color:#000;}" +
		/* title width */	"@media print{ #ph TD.phh   {width:100%;} }" +
		/* save trees msg */	"@media print{ #pnc.untouched #gmm_msg   {display:none;} }" +


// Code Enhancements
	/* logo imgs */			"#logo IMG[src='/images/code_sm.png'], TABLE[style='margin: 0px 0px -6px 0pt; padding: 0px; width: 100%;'] TD[style='width: 153px;'] IMG[src='/hosting/images/code_sm.png'], #logo IMG[src='http://code.google.com/images/code_sm.png']   {display:none;}" +
	/* search button bg */		".gsc-search-box .gsc-search-button   {background-color:#000;}" +
	/* search suggest */		".gsc-search-box .greytext   {background-color:#000; color:#999 !important;}" +
	/* header bars */		"#gc-topnav, #gc-topnav H1, #header #title, TABLE.mainhdr, #issueheader, #issueheader TABLE TBODY TR TD, #makechanges DIV.h4   {padding-right:10px; background-color:#333; border:0 !important; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px; -moz-border-radius-bottomright:14px; -moz-border-radius-bottomleft:14px; color:#000 !important;}" +
	/* page txt */			"#gc-home DIV, #codesiteContent DIV, #body, #body DIV, #body TABLE TBODY TR TD DIV, #maincol DIV, #maincol DIV TABLE TBODY TR TD, #maincol P, #maincol H4, #issuemeta, #issuemeta TD, TABLE.issuepage TBODY TR TD[class='vt issuedescription'], DIV.content DIV, DIV.content DIV DIV DIV H2, DIV.content DIV DIV TABLE TBODY TR TD   {color:#999 !important;}" +
	/* section headers */		"DIV.g-unit H2, .g-c .column-title, #gc-toc UL.treelist LI H1, #gc-toc UL.treelist LI H2, #gc-pagecontent H1   {margin-top:10px; padding-top:2px; padding-left:4px; border:0; background-color:#333; -moz-border-radius-topleft:14px;-moz-border-radius-topright:14px;  color:#fff;}" +
	/* labels tables */		".g-c .labels-table DIV   {background-color:#333;}" +
	/* box bgs */			"#products-list, #preview-box   {border:0; background-color:#000;}" +
	/* project tabs */		"TABLE#mt TBODY TR TH   {background:#333 none; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px;}" +
	/* project tab round bg */	"TABLE#mt TBODY TR TH DIV   {background-image:none !important;}" +
	/* project details */		"#codesiteContent TABLE.columns TBODY TR TD   {background-color:#000; color:#999 !important;}" +
	/* docs toc bg */		"#gc-toc UL.treelist LI UL LI   {background-color:inherit;}" +
	/* docs sidebar bg */		"#maincol .pmeta_bubble_bg, .rounded_ul, .rounded_ur, .rounded_ll, .rounded_lr, DIV[style='background: rgb(221, 248, 204) none repeat scroll 0%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; margin-bottom: 5px; table-layout: fixed;'], .vt DIV.tip   {background:#333 none !important; border:0 !important; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px; -moz-border-radius-bottomright:14px; -moz-border-radius-bottomleft:14px;}" +
	/* docs code bg */		"PRE   {background-color:#ccc;}" +
	/* downloads search bar */	"TABLE.st TBODY TR TD, TABLE.st TBODY TR TD DIV, TABLE.st TBODY TR TD DIV DIV SPAN   {background:#000 none !important; color:#999 !important;}" +
	/* downloads results table */	".bubble_bg, TABLE#resultstable TBODY TR TH, TABLE#resultstable TBODY TR TD   {border-bottom-color:#333; border-left-color:#333; background:#000;}" +
	/* org info block */		"#body TABLE TBODY TR TD DIV.extern_app   {background:#333 none; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px; -moz-border-radius-bottomright:14px; -moz-border-radius-bottomleft:14px;}" +
	/* org info app list */		"#body DIV TABLE.applist   {background:#333 none; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px; -moz-border-radius-bottomright:14px; -moz-border-radius-bottomleft:14px;}" +
	/* org info app details */	"#body DIV TABLE.applist TBODY TR TD   {color:#fff !important;}" +
	/* org info app text */		"#body DIV TABLE.applist TBODY TR TD DIV.app_text   {padding:10px; background:#000 none; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px; -moz-border-radius-bottomright:14px; -moz-border-radius-bottomleft:14px; color:#fff !important;}" +
	/* alerts & messages */		"#codesiteContent P.note, #codesiteContent P.caution, #codesiteContent P.warning, #codesiteContent DIV.noticebox, #nowShowingDiv, DIV[class='bottom clearfix'] DIV.blog   {padding-top:4px; padding-bottom:5px; border:0; background:#333 none; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px; -moz-border-radius-bottomright:14px; -moz-border-radius-bottomleft:14px; color:#fff;}" +
	/* collapsible bg */		"#gc-collapsible   {border:2px solid #333; background:#333 none !important;}" +
	/* footer bg */			"DIV#gc-footer   {background:#000 none;}" +


// Support Enhancements
	/* logo img */			"TABLE[align='center'] TBODY TR TD[width='155'][rowspan='2'] A IMG, TABLE[align='center'] TBODY TR[valign='middle'] TD[width='135'] IMG   {display:none;}" +
	/* header bg */			"TABLE[style='border-bottom: 1px solid rgb(37, 71, 157);'] TBODY TR TD   {background-color:#000;}" +
	/* page title */		"TABLE[style='border-bottom: 1px solid rgb(37, 71, 157);'] TBODY TR TD.header H1   {color:#fff !important;}" +
	/* page txt */			"TABLE[style='border-bottom: 1px solid rgb(37, 71, 157);'] TBODY TR TD, TABLE TBODY TR TD TABLE TBODY TR TD *, TABLE TBODY TR TD P, #content   {color:#999 !important;}" +
	/* head tabs */			"#tabs TABLE TBODY TR TD DIV   {border:0; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px;}" +
	/* head tabs */			"#tabs TABLE TBODY TR TD DIV DIV.link A   {color:#000 !important;}" +
	/* answer name */		"TABLE TBODY TR TD H3.answername   {color:#fff !important;}" +
	/* side bar headers */		"TABLE.smfont TBODY TR TD.module_hdr   {border:0; background:#333 none; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px;}" +
	/* side bar header txt */	"TABLE.smfont TBODY TR TD.module_hdr H4, TABLE.smfont TBODY TR TD.module_hdr H4 LABEL, TABLE.smfont TBODY TR TD.module_hdr B   {color:#000 !important;}" +
	/* side bar block bg */		"TABLE.smfont TBODY TR TD   {border:0 none #000 !important; background-color:#000;}" +
	/* bottom tools */		"TABLE TBODY TBODY TR TD[style='border-bottom: 1px solid rgb(204, 204, 204);'] B   {color:#fff !important;}" +
	/* bottom help box */		"TABLE.answerfooter   {border:0; background:#333 none; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px; -moz-border-radius-bottomright:14px; -moz-border-radius-bottomleft:14px;}" +
	/* bottom help txt */		"TABLE.answerfooter TBODY TR TD DIV FONT, TABLE.answerfooter TBODY TR TD DIV FONT B, TABLE.answerfooter TBODY TR TD DIV FONT NOBR   {color:#fff !important;}" +
 

// Toolbar Enhancements
	/* logo imgs */			"BODY[bgcolor='#ffffff'][topmargin='3'] CENTER TABLE[width='725'] TBODY TR TD IMG[width='143'][height='59'][src='../../../../common/toolbar_sm.gif'], TABLE[width='100%'][style='direction: ltr;'] TBODY TR TD A[href='http://toolbar.google.com'] IMG, BODY > TABLE[width='100%'] > TBODY > TR > TD > A[href='../../T4/'] IMG[width='143'][height='59'], BODY.siteowners > TABLE[width='96%'] > TBODY > TR > TD[width='1%'] > A > IMG, BODY.siteowners IMG[src='http://www.google.com/images/art.gif']   {display:none;}" +
	/* page title */		"BODY > TABLE[width='100%'][style='direction: ltr;'] > TBODY > TR > TD[width='100%'], BODY > TABLE[width='100%'][style='direction: ltr;'] > TBODY > TR > TD[width='100%'] TABLE TBODY TR TD   {background-image:none !important; color:#fff !important;}" +
	/* download box */		"BODY[bgcolor='#ffffff'][topmargin='3'] CENTER TABLE TBODY TR TD TABLE#download TBODY TR TD   {background-color:#000; border:0 !important;}" +
	/* bottom logo(s) */		"TABLE TBODY TR TD[nowrap='nowrap'] IMG[src='http://www.google.com/nav_first.gif'], TABLE TBODY TR TD[nowrap='nowrap'] IMG[src='http://www.google.com/nav_current.gif'], TABLE TBODY TR TD[nowrap='nowrap'] IMG[src='http://www.google.com/nav_page.gif'], TABLE TBODY TR TD[nowrap='nowrap'] IMG[src='http://www.google.com/nav_next.gif']   {display:none;}" +

	// API
		/* page title */	"BODY > TABLE[width='100%'] > TBODY > TR > TD[width='100%'][style='padding-left: 15px;'] TABLE TBODY TR TD FONT STRONG   {padding-left:131px; color:#fff !important;}" +
		/* start making btn */	"TABLE TBODY TR TD#content DIV#start_box   {border:1px solid #fff; background-color:#333; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px; -moz-border-radius-bottomright:14px; -moz-border-radius-bottomleft:14px;}" + 
		/* header bars */	"TABLE TBODY TR TD#content H2.header   {border:0; background:#333; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px; -moz-border-radius-bottomright:14px; -moz-border-radius-bottomleft:14px;}" + 
		/* page-code */		"TABLE TBODY TR TD#content PRE   {color:#000;}" + 
		/* page block bgs */	"TABLE TBODY TR TD#content DIV, BODY.siteowners TABLE TBODY TR TD   {background-color:#000 !important;}" +


// Firefox Tools Enhancements
	/* logo img */			"BODY > CENTER > DIV > TABLE[width='739'] > TBODY > TR > TD[width='1%'] A IMG   {display:none;}" +
	/* page titlebar */		"BODY > CENTER > DIV > TABLE[width='739'] > TBODY > TR > TD[width='100%']   {width:100%; padding-left:151px; color:#fff;}" +
	/* page txt */			"BODY > CENTER > DIV > TABLE[width='100%'] > TBODY > TR > TD, BODY > CENTER > DIV > TABLE[width='100%'] > TBODY > TR > TD TABLE TBODY TR TD, BODY > CENTER > DIV[style='margin: 20px 30px; text-align: left; width: 740px;'] *   {color:#999 !important;}" +
	/* more header */		"BODY > CENTER > DIV > TABLE[width='100%'] > TBODY > TR > TD H3[style='border-bottom: 1px solid rgb(37, 71, 157); font-size: 17px; background-color: rgb(255, 255, 255); padding-bottom: 4px;']   {padding-left:7px; border:0 !important; background-color:#333 !important; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px; -moz-border-radius-bottomright:14px; -moz-border-radius-bottomleft:14px; color:#000;}" +
	/* right col block */		"BODY > CENTER > DIV > TABLE[width='100%'] > TBODY > TR > TD DIV.rightcol   {background-color:#333 !important; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px; -moz-border-radius-bottomright:14px; -moz-border-radius-bottomleft:14px;}" +
	/* install extension */		"BODY > CENTER > DIV[style='margin: 20px 30px; text-align: left; width: 740px;'] DIV.extension  {background-color:#333 !important; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px; -moz-border-radius-bottomright:14px; -moz-border-radius-bottomleft:14px;}" +
	/* extension whitelist */	"BODY > CENTER > DIV[style='margin: 20px 30px; text-align: left; width: 740px;'] DIV.whitelist  {border:2px solid #fff; background-color:#000; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px; -moz-border-radius-bottomright:14px; -moz-border-radius-bottomleft:14px;}" +


// Notebooks Enhancements
	/* faq logo img */		"BODY[bgcolor='#ffffff'] > TABLE[cellpadding='5'][align='center'] > TBODY > TR[valign='middle'] > TD[width='1%'] > A[href='http://www.google.com/notebook'] > IMG   {display:none;}" +
	/* faq title block */		"BODY[bgcolor='#ffffff'] > TABLE[cellpadding='5'][align='center'] > TBODY > TR[valign='middle'] > TD > TABLE[width='100%'][bgcolor='#c3d9ff'][align='center'][style='margin-bottom: 5px;'] TBODY TR TD   {background-color:#000;}" +
	/* faq title block corners */	"BODY[bgcolor='#ffffff'] > TABLE[cellpadding='5'][align='center'] > TBODY > TR[valign='middle'] > TD > TABLE[width='100%'][bgcolor='#c3d9ff'][align='center'][style='margin-bottom: 5px;'] TBODY TR TD IMG   {display:none;}" +
	/* faq list txt */		"OL.answers LI UL.response LI, OL.response LI   {color:#999 !important;}" +


// Trends Enhancements
	/*  */			"   {}" +


// Gm-Script Google Search Sidebar Enhancements - http://userscripts.org/scripts/show/11888
	/* sidebar width */		"#searchPlus   {width:26% !important; float:right !important;}" +
	/* sidebar txt */		"#searchPlus DIV P, .luna-Ent td   {color:#fff !important;}" +
	/* sidebar header */		"#searchPlus H1   {background-color:#333; border:0; -moz-border-radius-topright:14px; -moz-border-radius-topleft:14px; color:#fff;}" +
	/* floater */			"#floater { white-space: nowrap; position: absolute; top: 45px; left: 0px; width: 100%; height: 80px; padding-top: 0px; text-align: center; background-color: Black }" +
	/* floater */			"#queryer { position: relative; top: 0px; left: 0px; }" +
	/* floater */			"#submitter { position: relative; top: -18px; left: 76px; font-size: 15px; font-weight: bold; width: 150px; }" +
	/* floater */			"#submitter2 { position: relative; top: -18px; left: 150px; font-size: 15px; font-weight: bold; width: 150px;  }" +
	/* sidebar header link */	"#searchPlus H1 A   {color:#000 !important;}";




// Remove Right-side Ads
iframe=document.getElementsByTagName("iframe");
for(var iii=0; iii<iframe.length; iii++){if(iframe[iii].src.indexOf("pagead2.googlesyndication.com/pagead/ads")!=-1){iframe[iii].height=0;iframe[iii].width=0;};};

// Add Style
if (typeof GM_addStyle != "undefined") {GM_addStyle(iBlackle);}
else if (typeof addStyle != "undefined") {addStyle(iBlackle);}
else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.innerHTML = iBlackle;
		heads[0].appendChild(node); 
	};
};


}; var iBlackleLogo = "data:image/jpeg;base64,"+
	"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";


// User Script Updates - http://userscripts.org/scripts/show/2296
function updateCheck() {try {(unsafeWindow || window.wrappedJSObject || window).UserScriptUpdates.requestAutomaticUpdates(SCRIPT);} catch (ex) {};};

function float() { 

var logo = document.createElement('img');
logo.src = iBlackleLogo;
var vfloater = document.createElement('div');
vfloater.setAttribute('id','floater');
var theForm = document.createElement('form');
theForm.setAttribute('id','searchbox_005451225522983698504:zagxlwkyn5g');
theForm.setAttribute('action','http://www.google.com/cse');
var qinput = document.createElement('input');
qinput.name = "q";
qinput.id = "queryer";
qinput.type = "text";
qinput.size = "50";
var breaker = document.createElement('br');
var submitter = document.createElement('input');
submitter.name = "sa";
submitter.id = "submitter";
submitter.type = "submit";
submitter.value = "search";
var submitter2 = document.createElement('input');
submitter2.id = "submitter2";
submitter2.name = "sa";
submitter2.type = "submit";
submitter2.value = "I'm Feeling Green";
theForm.innerHTML = "<input type='hidden' name='cx' value='005451225522983698504:zagxlwkyn5g' /><input type='hidden' name='cof' value='FORID:1' />";
theForm.appendChild(qinput);
theForm.appendChild(breaker);
theForm.appendChild(submitter);
theForm.appendChild(submitter2);
vfloater.appendChild(logo);
vfloater.appendChild(theForm);
document.body.appendChild(vfloater);
document.getElementById('queryer').focus();
};

// SAVE THE PLANET!!!
iBlackleize();
updateCheck();
if (document.location == "http://www.google.com/ig") float();
if (document.location == "http://www.google.com/ig?hl=en") float();