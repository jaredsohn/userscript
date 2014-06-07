// CleanSozluk
// version 2.0.32
// 24.11.2009
// Copyleft Tanaydın 'Huzursuz' Şirin
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ChangeLog
// 2.0.32  24.11.2009
// sol frame'e gelen yeni banner'i kapatacak hale getirdim
// 2.0.31  19.11.2008
// Son eklediğim şeyden sonra FireFox'da çalışmaz olmuş, çalışır hale getirdim. (Cenabet Version)
// 2.0.3  16.11.2008
// DOM tamamlanır tamamlanmaz script'in çalışmasını sağladım. Böylece reklamların tamamı yüklenmeden kapanacak hale geldi. Über, süper, fantastik
// 2.0.2  02.03.2008
// DönBebeğim tuşuna düzgün olarak tıklamasını sağladım
// 2.0.1  02.03.2008
// 2.0 version'undaki bir bug yüzünden normal kullanıcıların reklamlarını kapatmıyordu, onu kapatacak hale getirdim
// Artık gereksiz olan ufak bir şeyi kaldırdım.
// 2.0  25.02.2008
// okurlar'da reklamsız theme dönüşü çalışmıyordu onu çalışır hale getirdim.
// 1.9	17.09.2007
// id'leri "ad" olan her şeyi kapatacak hale getirdim toptan yallah...
// 1.8	22.08.2007
// id'ler daskapital'den ad'a dönmüş, ben de ona uyarladım...
// 1.7	18.08.2007
// Google reklamlarını da kapatacak kodu ekledim öyle güzel oldu ki.
// 1.6	08.07.2007
// Allahım ne kadar akıllıyım, hayvan ara altındaki sprite tuşunu da siktir ettim, "don bebeğim" tuşuna otomatik olarak basacak hale getirdim,
// bütün reklam iframe'lerini XPATH ile bulup kapattırdım. #29 kere Maşallah tü tü tü tü.
// böylece sol sağ üst alt demeden her yerde çalışacak hale getirdim tam süper oldu.
// 1.5	07.07.2007
// XPATH denen güzel teknolojiyi neden kullanmıyorum dedim, kullandım. Comment'lerin (şu anda okuduğunuz) script'in kendisinden uzun olduğunu fark ettim güldüm.
// TODO: Solda hayvan aranın altında çıkan o reklamı da kapatmadan release etmeyeceğim.
// 1.4	03.07.2007
// show.asp'de çalışacak hale getirdim
// 1.3	01.07.2007
// optimize ettim.
// 1.2	21.06.2007
// daskapital'i remove etmek yerine, "no kitty"'ye basılmış gibi yok etmesi sağlandı. sanırım diğer metod yüzünden zaman zaman linkler çalışmıyordu çünkü.
// 1.1	19.06.2007
// Tam DOM desteği, daskapital ve daskapital2'i bir arada yakalasın diye script takla attırıldı
// soldaki hayvan ara altındaki reklam tuşunu kaybetmek için de takla attırdım ama olmadı bir sonraki sürüme artık
// 1.0
// ilk sürüm. leziz bişi...
// --------------------------------------------------------------------
// ==UserScript==
// @name			CleanSozluk
// @description	    		Removes ads from ek$isözlük
// @author		    	HuzursuZ
// @version		    	2.0.32
// @include		    	http://www.eksisozluk.com/*
// @include		    	http://eksisozluk.com/*
// @include		    	http://sozluk.sourtimes.org/*
// @include		    	http://sourtimes.org/*
// @include		    	http://www.sourtimes.org/*
// @include		    	http://84.44.114.44/*

// ==/UserScript==

var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var XPIter  = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;

function find(xpath, xpres){
	var ret = document.evaluate(xpath, document, null, xpres, null);
	return xpres == XPFirst ? ret.singleNodeValue : ret;
}
function cleanSozluk() {
	var donBebegim = find("//button", XPFirst);
	if ((donBebegim) && (donBebegim.firstChild.data == 'dön bebeğim')) {
		donBebegim.click();
	}
	var elemToHide = find("//*[@id='ad' or @id='as']", XPFirst);
	if (elemToHide) {
		elemToHide.style.display = 'none';
	}
}

document.addEventListener('DOMNodeInserted', cleanSozluk ,false);
window.addEventListener('load', cleanSozluk ,false);