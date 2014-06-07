// ==UserScript==
// @name          itü sözlük v3 / nigra
// @namespace     http://userstyles.org
// @description	  itü sözlük v3'ün siyah temasını adama çevirir.
// @author        thedewil
// @homepage      http://www.thedewil.com
// @include       http://www.itusozluk.com/*
// @include       http://itusozluk.com/*
// @exclude       http://www.itusozluk.com/duyurular/*
// @exclude       http://www.itusozluk.com/blog/*
// @exclude       http://www.itusozluk.com/kovan/*
// @exclude       http://www.itusozluk.com/gorseller/*
// ==/UserScript==
(function() {
var css = ".main{color:#999 !important;}BODY{background-color:#050505 !important;}.icon{background-color:#1C1C1C !important;background-image:none !important;color:#FFF;}.right .kanka a{color:#939393 !important;}TEXTAREA{background-color:#141414 !important;color:#B5B5B5 !important;}#msjlamba a,#maillamba a,#coplamba a,#canlamba a,#olaylamba a,#forumlamba a,#ispiklamba a,.solfbutons A,.menubutons A,.gorunumbuton A{color:#BFBFBF !important;}.tipsy-inner{background-color:#DBDBDB;color:#000;}.kankalist table tr td,.ayarsec{color:#939393;}#extra a,#yoklama a{color:#BABABA !important;}.yazarinfo{background-color:#141414 !important;}.yazarinfo li a{color:#CCC !important;}.msjcopolay ol li,.right .kanka,.highlight,#yoklama,#extra{background-color:#000 !important;}.duyurular.sagsec{background-color:#141414 !important;border:1px solid gray !important;border-radius:5px 5px 0 10px !important;box-shadow:1px 1px 1px #AAA !important;color:#666 !important;font-size:12px;padding:5px;}.duycontent a{color:#2E2E2E !important;}body{color:#3E3E3E;}input[type='button'],input[type='submit']{background-color:#212121;background-image:none !important;background-repeat:repeat-x;border:1px solid #000;color:#BFBFBF !important;}.butover{background-position:0 -5px !important;}.yanik{background-color:#212121 !important;background-image:url('http://cdn.itusozluk.net/css/custom/iberia_black/but.png') !important;background-repeat:repeat-x;color:#FFF;}.kanka a{color:#212121 !important;}.top{background-image:url('http://files.thedewil.com/itustil/top.png') !important;background-position:0 0;background-repeat:no-repeat;height:140px !important;}.logo{background-image:url('http://cdn.itusozluk.net/css/custom/iberia_black/logo.png');left:40px;position:absolute;top:14px;}.searchinact{color:#A4A4A4;}.solfbutons,.menubutons{position:absolute;}.solfbutons{left:5px;top:110px;}.menubutons{left:390px;top:105px;}.solfbutons a,.menubutons a,.gorunumbuton a{color:#FFF;font-family:Arial;font-size:12px;margin-right:8px;}.menubutons a{margin-right:20px;}#gtrfrm{left:5px;position:absolute;top:70px;}#sbar{width:240px;}#bottombar{background-color:transparent;background-image:none !important;background-position:0 -3px;background-repeat:repeat-x;border:0 none;padding-top:11px;}#modal{-moz-border-bottom-colors:none;-moz-border-image:none;-moz-border-left-colors:none;-moz-border-right-colors:none;-moz-border-top-colors:none;background-color:#050505 !important;color:#BFBFBF !important;z-index:999;border-color:#DAD0D0 #DAD0D0 #-moz-use-text-color;border-style:solid solid none;border-width:1px 1px 0;}#bottombar .icon:hover,.icon.selectedicon{background-color:#000;background-image:none !important;color:#FFF;}#icon_up{background-color:#1C1C1C !important;}.aratara{color:#686767;font-family:Arial;font-size:11px;font-weight:700;}.aratara input[type='text']{border:1px solid #D0D0D0;border-radius:5px 5px 5px 5px;}#gor,#ykl,#ext{background-image:url('http://cdn.itusozluk.net/images/icons/menuwhite.gif');background-position:right center;background-repeat:no-repeat;padding-right:10px;}.toploading{background-image:url('http://cdn.itusozluk.net/images/loading.gif') !important;}a{color:#000;}a:hover,.title a:hover{color:#212121;}.top a:hover{color:#FFF;}#bgleft a,.title a,.pager,.dateauthor a,a{color:#5B5B5B !important;}.dateauthor a:hover{color:#DBDBDB !important;text-decoration:none;}table.chart tbody tr:hover td,table.chart tbody tr.open td{background:none repeat scroll 0 0 #5B5B5B;color:#FFF;}div.chartbar span{background:none repeat scroll 0 0 #5B5B5B;}.notif a{font-weight:700;}.notif li.okunmadi{background-color:#171717 !important;}#icon_kacir{background-image:url('http://cdn.itusozluk.net/css/custom/iberia_black/left.png');background-position:5px 2px !important;background-repeat:no-repeat !important;width:23px !important;}.gorunumbuton{display:inline !important;}.yazarinfo li,.duyurular.sagsec a{color:#AAA !important;}.solfbutons a:hover,.menubutons a:hover,.entries a:hover{text-decoration:underline;}.radyo.sagsec{background-color:#141414 !important;border:1px solid gray !important;border-radius:5px 5px 0 10px !important;box-shadow:1px 1px 1px 1px #AAA !important;color:#BBB !important;padding:5px !important;}.radyo.sagsec a{color:#FFF !important;}.curtit{color:gray !important;font-size:12.5px !important;font-weight:700;text-decoration:underline !important;};"
if (typeof GM_addStyle != 'undefined') {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != 'undefined') {
	PRO_addStyle(css);
} else if (typeof addStyle != 'undefined') {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName('head');
	if (heads.length > 0) {
		var node = document.createElement('style');
		node.type = 'text/css';
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
