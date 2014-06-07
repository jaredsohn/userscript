// SSL Certificates Pro
// version 2.17
// Started 30-03-2010
//
//
// ==UserScript==
// @name	SSL Certificates Pro
// @description	Forces some websites like wikipedia, gmail, twitter or facebook to use secure connections.

// Wikipedia Secure
// @include	http://*secure.wikipedia.org*

// Google Websites
// @include	http://code.google.com*
// @include	http://*.googleusercontent.com*
// @include	http://www.google.tld/profiles*
// @include	http://mail.google.com*
// @include	http://www.google.tld/calendar*
// @include	http://ssl.scroogle.org*
// @include	http://docs.google.tld/*
// @include	http://spreadsheets.google.tld/*
// @include	http://www.google.tld/reader*
// @include	http://www.google.tld/bookmarks*
// @include	http://www.google.tld/history*
// @include	http://groups.google.tld/*
// @include	http://sites.google.tld/*
// @include	http://gmail.google.com*
// @include	http://www.google.tld/notebook*
// @include	http://www.google.tld/webmasters/tools*
// @include	http://www.google.tld/contacts
// @include	http://www.google.tld/voice*
// @include	http://www.google.tld/finance*
// @include	http://www.google.tld/dictionary*
// @include	http://spreadsheets.google.com*
// @include	http://www.google.com/accounts/ServiceLogin?service=mail*
// @include	https://www.google.com/accounts/ServiceLogin?*continue=http%3A*


// Bank Sites
// @include	http://www.banesto.es*
// @include	http://www.ceca.es*
// @include	http://www.sidenor.com*
// @include	http://www.bbvanetcash.com*
// @include	http://www.bbvanetoffice.com*
// @include	http://www.activobank.com*
// @include	http://*bancamarch.es*
// @include	http://*.ibercaja.es*
// @include	http://portal.bbk.es*
// @include	http://www.bbk.es*
// @include	http://www.cam.es*
// @include	http://www.uno-e.com*
// @include	http://www.i-banesto.com*
// @include	http://www.bancosantander.es*
// @include	http://www.lacaixa.es*
// @include	http://www.ingdirect.es*
// @include	http://www.bbva.es*
// @include	http://www.ovh.es*
// @include	http://*paypal.com*
// @include	http://*amazon.com*
// @include	http://*amazon.co.uk*
// @include	http://alipay.com*
// @include	http://www.mercadolibre.com*
// @include	http://www.mercadolibre.tld/*
// @include	http://www.todocoleccion.net*
// @include	http://www.abebooks.com*
// @include	http://www.linklift.tld/*
// @include	http://www.adpv.com*
// @include	http://chitika.com*
// @include	http://www.burstmedia.com*
// @include	http://www.linkshare.com*
// @include	http://ads.kanoodle.com*
// @include	http://*.cj.com*
// @include	http://publisher.yahoo.com*

// Social Networks
// @include	http://login.yahoo.com*
// @include	http://login.live.com*
// @include	http://twitter.com/*
// @include	http://*friendfeed.com*
// @include	http://www.facebook.com/
// @include	http://*static*.facebook.com*
// @include	http://www.facebook.com/login.php*
// @include	http://apps.facebook.com*
// @include	http://login.facebook.com*
// @include	http://orkut.com*
// @include	http://twitpic.com*
// @include	http://img.ly*
// @include	http://*sourceforge.net/projects*
// @include	http://*mail2web.com*
// @include	http://*.mail.com*
// @include	http://www.aol.com/*
// @include	http://identi.ca*
// @include	http://*.meebo.com*
// @include	http://*.openid.net*
// @include	http://*.spamgourmet.com*


// Other
// @include	http://www.box.net*
// @include	http://www.instantssl.com
// @include	http://www.virustotal.com*
// @include	http://*.nytimes.com*
// @include	http://help.ubuntu.com*
// @include	http://secure.wikileaks.org*
// @include	http://*.wordpress.com*
// @include	http://*.mozilla.org*
// @include	http://microsoft.com*
// @include	http://www.microsoft.com*
// @include	http://thepiratebay.org*
// @include	http://static.thepiratebay.org*
// @include	http://rss.thepiratebay.org*
// @include	http://addons.mozilla.org*
// @include	http://*isohunt.com*
// @include	http://*evernote.com*
// @include	http://*binsearch.info*
// @include	http://*binsearch.net*
// @include	http://*.opendns.com*
// @include	http://*.zoho.com*
// @include	http://*.xmarks.com*
// @include	http://*.proxy.org*
// @include	http://proxy.org*
// @include	http://*proxify.com*
// @include	http://bugs.kde.org*
// @include	http://members.webs.com*
// @include	http://members.freewebs.com*
// @include	http://*.last.fm*
// @include	http://*.godaddy.com*
// @include	http://www.apple.com*
// @include	http://www.adobe.com*
// @include	http://*.inbox.com*
// @include	http://*.ezpzemail.com*
// @include	http://*mybloglog.com*
// @include	http://addthis.com*
// @include	http://login.passport.net*
// @include	http://bugs.gentoo.org*
// @include	http://forums.gentoo.org*
// @include	http://*mcafeesecure.com*
// @include	http://*authorize.net*
// @include	http://*versapay.com/*
// @include	http://canalonline.vodafone.es*
// @include	http://online.vodafone.tld/dispatch*
// @include	http://www.yoigo.com/index.php
// @include	http://www.yoigo.com/
// @include	http://tickets.vueling.com*
// @include	http://*infojobs.net*
// @include	http://www.verisign.tld/*
// @include	http://*.4shared.com*
// @include	http://*.tv.com*
// @include	http://bugs.gentoo.org*
// @include	http://bugs.kde.org*
// @include	http://*101distribution.com*
// @include	http://*1040now.net*
// @include	http:/*10kscholarship.com*
// @include	http://*123cheapdomains.com*
// @include	http://*.192.com*
// @include	http://*1stfinancialfcu.org*
// @include	http://*2mcctv.com*
// @include	http://www.2sms.com*
// @include	http://*4mybenefits.com*
// @include	http://*4structures.com*
// @include	http://*877myjuicer.com*
// @include	http://*authorize.net*
// @include	http://members.webs.com*
// @include	http://members.freewebs.com*
// @include	http://*godaddy.com*
// @include	http://*esignforms.com*
// @include	http://*stealthmessage.com*
// @include	http://*securenym.net*
// @include	http://*keptprivate.com*
// @include	http://*filefortress.com*
// @include	http://*securecomputing.com*
// @include	http://*bluebottle.com*
// @include	http://*vfemail.net*
// @include	http://*fastmail.ca*
// @include	http://*hushmail.com*
// @include	http://*proxify.com*
// @include	http://*psdata.no*
// @include	http://www.ps.no*
// @include	http://*qxl.no*
// @include	http://*netshop.no*
// @include	http://*allegro.pl*
// @include	http://cache.addthiscdn.com*
// @include	http://www.rapidshare.com*
// @include	http://rapidshare.com*
// @include	http://login.passport.net/uilogin.srf*
// @include	http://login.passport.net*
// @include	http://www.certisur.com.ve*
// @include	http://*.openssl.org*
// @include	http://www.hi5.com*
// @include	http://www.bbc.co.uk*
// @include	http://www.linkedin.com/secure*
// @include	http://cdn.gaggle.net*
// @include	http://download.entraction.com*
// @include	http://static-cache.tp-global.net*
// @include	http://images.vrbo.com*
// @include	http://www.goldstar.com*
// @include	http://images.goldstar.com*
// @include	http://static.woopra.com*
// @include	http://*.iseatz.com*
// @include	http://iseatz.com*
// @include	http://www.adbrite.com*
// @include	http://content.truste.com*
// @include	http://e1.boxcdn.net*
// @include	http://e2.boxcdn.net*
// @include	http://e3.boxcdn.net*
// @include	http://cdn.psw.net*
// @include	http://www.psw.net*
// @include	http://secure.comodo.com*
// @include	http://vwww.comodo.com*
// @include	http://*.fileburst.com*
// @include	http://policy.truste.com*
// @include	http://typekit.com/images*
// @include	http://wordpress.com*
// @include	http://*.wordpress.com*
// @include	http://*.ovi.com*

// Exclude
// @exclude	http://mail.ovi.com/r/mail/listing*
// @exclude	http://share.ovi.com*
// @exclude	http://www.linklift.com*
// @exclude	http://www.bbc.co.uk/
// @exclude	http://images.google.tld/*
// @exclude	http://www.google.tld/search*
// @exclude	http://www.google.tld/#*
// @exclude	http://*&q=*
// @exclude	http://*?q=*
// @exclude	http://*&p=*
// @exclude	http://*?p=*
// @exclude	http://*query=*
// @exclude	http://*imgres*imgurl=*
// @exclude	http://*search.yahoo.com*
// @exclude	http://*.*/*?*.*
// @exclude	http://*.*/*&*.*
// @exclude	http://*.*/*&continue=*


//Note: .tld extension dosent works if is .tld*

// ==/UserScript==

// ###### Start of Wikipedia secure script

//Secure a given link
function fixlink(link){
	var special='commons,species,meta'
	var keyword = special.split(',');
	var original = ''; 
	original = original + link;
	original = original.replace(/^http\:\/\/(.+)/, "$1");
	var words = original.split('.');
	var newurl='https://secure.wikimedia.org/'+words[1]+'/'+words[0];
	for (var i=0; i<keyword.length;i++) {
		if (words[0]==(keyword[i])) {
			newurl=original.replace(keyword

[i]+'.wikimedia.org/','https://secure.wikimedia.org/wikipedia/'+keyword[i]+'/')
			if ((original == keyword[i]+'.wikimedia.org')||(original == keyword

[i]+'.wikimedia.org/'))
				newurl=newurl+'wiki/';
			return newurl;
		}
	}
	words[2] = words[2].replace(/^org(.+)/, "$1");
	if(words[2].length==1) words[2]='/wiki';
	for (var i=2;i<words.length;i++) {
		newurl = newurl + (i==2?'':'.') + words[i];
	}
	return newurl;
}

//Check whether a given link need to be fixed or not
function needtofix(link){
	//the set of wikipedia sister projects that support secure http
	var keywords =	

'wikipedia,wiktionary,wikinews,wikibooks,wikiquote,wikisource,wikiversity,commons,species,meta';
	var keyword = keywords.split(',');
	var linkslash =link.split('/');
	var domainlevel = '';


	if (linkslash[0]=='https:')
		return false;
	if (linkslash.length > 1)
		domainlevel = linkslash[2].split('.');
	if (domainlevel[0]=='www')
		return false;
	for(var i=0; i < keyword.length; i++){
		if (keyword[i] == domainlevel[1] || keyword[i] == domainlevel[0])
			return true;
	}
	return false;
}


if (needtofix(location.href))
	location.replace( fixlink(location.href) );

var allLinks, thisLink;
allLinks = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
 thisLink = allLinks.snapshotItem(i);
 if (needtofix(thisLink.href))
	 thisLink.href = fixlink(thisLink.href);
}

// ###### End of Wikipedia secure script

if (window.location.protocol == "http:") {
if (window.location.hostname != "en.wikipedia.org") {
loc = window.location + "";
loc = loc.replace(/http/,"https");
window.location = loc;
}
}