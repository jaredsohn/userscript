// ==UserScript==
// @name           Gmail Super Clean
// @description    Cleans up Gmail. Adds Shine & Gloss.
// @author         Ganesh Rao
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// @include        http://*.mail.google.com/*
// @include        https://*.mail.google.com/*
// ==/UserScript==
var host = 'http://web.anurag.googlepages.com/';

//************************preferences begins here **********************************
//defaults
var customLogoURL = host+'gs_logo.png';
var showCustomLogo = 1;	//gmail will use its default logo when this is set to false
var showAds = 0;
var showBookmarks = 0;
var defaultFont = 'lucida grande';
//set by script
if (!GM_xmlhttpRequest) {
    alert('Please upgrade to the latest version of Greasemonkey.');
    return;
} else {
	showCustomLogo = Number(GM_getValue('showCustomLogo', showCustomLogo));
	showAds = Number(GM_getValue('showAds', showAds));
	showBookmarks = Number(GM_getValue('showBookmarks', showBookmarks));
	customLogoURL = GM_getValue('customLogoURL', customLogoURL )
	defaultFont = GM_getValue('defaultFont', defaultFont);
	GM_registerMenuCommand((showCustomLogo ? 'Hide' : 'Show') + ' Custom Logo', switchLogo);
	GM_registerMenuCommand((showAds ? 'Hide' : 'Show') + ' Advertisements', switchAds);
	GM_registerMenuCommand((showBookmarks ? 'Hide' : 'Show') + ' Bookmarks', switchBookmarks);
	GM_registerMenuCommand('Change Font (currently: '+defaultFont+')', changeDefaultFont);
	if( showCustomLogo ) { GM_registerMenuCommand('Change Custom Logo URL', getCustomURL); }
	GM_registerMenuCommand('Post GSkin Bug', postBug);
}
function changeDefaultFont() {
	defaultFont = prompt('Enter Font-Family Name ex. Arial, Verdana, Tahoma etc', defaultFont);
	GM_setValue('defaultFont', defaultFont );
	window.location.href = window.location.href; //refresh page
}
function postBug() {
	emailTo = 'artrulesmyworld@gmail.com';
	emailCC = 'rao.art@gmail.com';
	emailSubject = 'GSkin Bug';
	emailBody = '';
	mailLink = "https://mail.google.com/mail?view=cm&tf=0" + 
		(emailTo ? ("&to=" + emailTo) : "") + 
		(emailCC ? ("&cc=" + emailCC) : "") +
		(emailSubject ? ("&su=" + emailSubject) : "") +
		(emailBody ? ("&body=" + emailBody) : "");
	window.open(mailLink);
}
function switchBookmarks(){
	GM_setValue('showBookmarks', showBookmarks ? 0 : 1 );
	window.location.href = window.location.href; //refresh page
}
function switchLogo(){
	GM_setValue('showCustomLogo', showCustomLogo ? 0 : 1 );
	window.location.href = window.location.href; //refresh page
}
function switchAds(){
	GM_setValue('showAds', showAds ? 0 : 1 );
	window.location.href = window.location.href; //refresh page
}
function getCustomURL() {
	url = prompt('Custom Logo Image URL',customLogoURL);
	GM_setValue('customLogoURL', url);
	window.location.href = window.location.href; //refresh page
}
//************************preferences ends here ************************************

var header = document.getElementsByTagName('head');
var node = document.createElement('style');
node.type = 'text/css';
node.innerHTML = 'div div,div table,div td,span,input,button,select,option{font-family:'+defaultFont+' !important;font-size:12px !important}.p{margin-top:5px;color:#aaa;font-weight:400}.q{color:#888 !important}.ct{color:#369}.ct:hover{color:#FFF}a,a:link,a:active,a:visited,span.lk,.lk,.lkw,.l,.setl,span.lk#prf_g{text-decoration:none !important;color:#369 !important}a:hover,span.lk:hover,div.cs:hover,span.lkw:hover,.l:hover,.setl:hover,span.lk#prf_g:hover{color:red !important;text-decoration:none !important}#ds_trash{color:#c00;background:transparent url(http://pages.google.com/-/images/trash.gif) right no-repeat !important;padding-right:20px !important}span.lk#ds_spam{color:#999}.an td b.lk{color:Red !important}span.lk#refresh{text-decoration:none;font-style:normal}#nb_0{font-size:12px}#nb_0 table td.s{padding-top:2px;padding-bottom:2px;font-size:12px;color:#148;font-weight:700}input,button,textarea,select{padding:3px !important}' + (showCustomLogo ? 'div.h#ds_inbox{background:url('+customLogoURL+') no-repeat top left !important;width:200px !important;height:59px !important}' : '') + 'table.tlc tr.ur{color:#000 !important;background:#fff url('+host+'gs_labelsbg.gif) repeat-x top !important}table.tlc tr.ur td{border:none !important;border-bottom:1px solid #eee !important}table.tlc tr.rr td{background-color:transparent !important;border:none !important;border-bottom:1px solid #eee !important;line-height:1em;height:15px}.rr,.ur{color:#000 !important;background-color:transparent !important}div#nav{margin-top:5px;width:180px !important}#tamu{color:#000;height:24px;line-height:1.5em;font-weight:700;border:1px solid red !important}span:hover,.mxh{text-decoration:none !important}.urlc,.gr,.ct,.cs,.mxh{color:#148;text-decoration:none}.urlc:hover,.gr:hover,.mxh:hover,.cs:hover,span.l:hover,span.setl:hover{color:red !important;text-decoration:none}div.tbc,div.fs,div.tbcs,div.thc,div#co{background:transparent !important;border:none !important}div#co{margin-left:180px !important;padding-top:20px !important;padding-bottom:20px !important}div.tbc,div.fs,div.tbcs{margin-left:20px !important;margin-right:20px !important}#fi table,table .ctb,.ctb,.cbotn,.ctopn,.stln,cb,#compose_form .cbn2 .stln,.strn,.ctln,.ctrn,.cbtln,.cbtrn,.cbln,.cbrn,.cbrn2,.cbln2,td.cbrn,td.cbrn2,.rct,table .rct tbody tr td,.mb{background-color:transparent !important;background-image:none !important;padding:0 !important}#fi{background-color:#fff;padding:5px !important}#msgs,#fic{width:90% !important;padding:0 !important}form#compose_form,.cg table{background:transparent !important;padding:4px 0 0 !important}.msg{background:transparent url('+host+'gs_mailbg.gif) repeat-x top !important;border:1px solid #eee !important;width:100% !important;padding:0 5px 2px !important}.cbln2 div table{background:transparent !important;width:100%}.msg .msg{border:none !important;width:auto !important;padding:0 !important}div.ma{border:none !important;background-color:transparent !important}div.mb{padding-top:10px !important;background-image:none !important}.msg div,.msg td{background-image:none !important}tr.mht td{visibility:hidden !important}.tbb{background-color:#eee !important;border:1px solid #ccc !important}.ob{background-color:#fff !important;border:1px solid #eee !important}.hb{background-color:#ccc !important;border:1px solid #aaa !important}iframe.ef{border:1px solid #aaa !important;background:#fff !important;margin:0 !important;padding:0 !important}iframe.ef>body{background:#fff !important;margin:0 !important}img.thi,img.pc{border:1px solid #eee !important;padding:5px}body{background:#fff url('+host+'gs_bg.jpg) no-repeat top left !important;/*border-bottom:2px solid #e2efff !important;*/padding-bottom:20px !important;margin:20px !important}#hc_compose{background:transparent}.nm,td.nm{background-color:#FFE4B5 !important;border:0 !important}.nb{background:transparent url('+host+'gs_labelsbg.gif) repeat-x top !important;border:1px solid #eee}div#pop{background:#fff url('+host+'gs_popbg.gif) repeat-x !important;border:1px solid #eee !important}div#pop table,div#pop table td{background-color:transparent !important;border:none !important}div.bz_mestri_over{background-color:#ccc !important}form#s.s{margin-right:20px !important}div.mxf,div.mxs{background-color:#e2efff !important}div#mt2{background:#fff url('+host+'gs_popbg.gif) repeat-x !important;border:1px solid #e2efff !important;border-top:none !important;margin-bottom:10px !important}div#lo{background-color:#ccc !important;text-transform:uppercase !important}.ctfd{border:1px solid #eee !important}.clc td{background-color:transparent !important;border-bottom:1px solid #eee !important}.pr{background:#fff url('+host+'gs_popbg.gif) repeat-x !important}.pe td.pr{border-bottom:1px solid #000 !important}div#g,div#g div,div#a,div#a div,div#l,div#l div,div#c,div#c div,div#f,div#f div,div#u,div#d,div#d div{background-color:#fff !important;border:1px solid #e2efff !important;border-top:none !important}div#u table.pct{background-color:#fff !important;border:none !important}.psm{background-color:#fff !important;border:1px solid #e2efff !important;border-bottom:none !important}form#compose_form{margin-left:80px !important;padding:5px !important}.msg form#compose_form{margin-left:0 !important;width:98% !important}form#compose_form .ctb{width:75% !important}div.dvm{background:#fff !important;border:1px solid #eee}span.spo:hover{background-color:#eee !important;color:#000 !important}div#co,form#compose_form{background:#fff url('+host+'gs_popbg.gif) repeat-x !important;border:1px solid #e2efff !important}.an,.an td,.cbln2 div table td,.cg td,.cg div,.cg,div.cd,div.cdc,td.cdr,table.nc,div#nvq,div#nb_2,div#nav,div.s,div#aca,div#bzmesmnu,table#nt_2,div#mt2 div,div#mt2 table,div#mt2 div table tbody tr td,div#mt1,div#mt2,div.mxf,div#mt2 div,div.mxs,form#as_f,div#co,div#co div,div#co table td,div.clfd,.clc,.pr div,.pr td,.pum,div.ci,div.smb,td.ci,span.spo{background-color:transparent !important}div.nl,.cg{background:transparent !important}#nb_0 img,'+ (showCustomLogo ? 'div.h#ds_inbox img,' : '') + '#rc{display:none}table.tlc tr.ur:hover,table.tlc tr.rr:hover,.bz_pma:hover,div.bz_rr:hover,div#bzstatmenutri,.tbo{background-color:#eee !important}div#ft,#il,input.iv,/*hide the compose mail input box*/b .rnd,b .rnd1,b .rnd2,/*hide rounded corners*/div#nvl > table,div#nvq > table,div#nvi > table,div#tcb > table,div#tct > table,div#nds .rnd,div#nds .rnd2,div#nb_1 img,div#nb_2 td .s h img,.ctopn,.ctrn,.ctln,,#mm table,#rh .rhh,td.s img,.bz_meca,b .rnd,b .rnd1l,b .rnd2l,.rnd1r,.rnd2r{display:none !important}.ctb,.msg form#compose_form .ctb{width:100% !important}div.s,div.clfd,.pcl,.pfs,.pf,.pch,.pfs div{border:none !important}form#compose_form table,form#compose_form table div{padding:2px !important}b.rnd1l,b.rnd2l,b.rnd1,b.rnd2,.bookmarks,.rhh,#rp{display:none !important}#fb,#ra{'+(showAds ? '': 'display:none !important')+'}#fbm{background:transparent !important}#bzmesmnu{background:#fff !important}.msg{width:100% !important;margin:0 !important}#fi{width:100% !important}#fic{width:90% !important;margin:0 !important}#rh{float:right !important;width:100px !important}.mhc{width:98% !important;overflow:auto}.bookmarks{background:transparent !important;font-size:11px !important;display:'+(showBookmarks ? 'block' : 'none')+ '!important}div#bzmesmnu,.bz_pm{background-color:#fff!important}';
if(header)header[0].appendChild(node);
