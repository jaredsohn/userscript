// ==UserScript==
// @name           "HTTPS, please!"
//
// @namespace      http://www.sebastian-lang.net/
// @description    Automatically switch transfer protocol from HTTP to HTTPS - if available.
// @include        htt*://*
//
// @exclude        http://*.blogspot.com*
// @exclude        http://creativecommons.org*
// @exclude        http://www.dmoz.org*
// @exclude        http://www.ebay.com*
// @exclude        http://www.google.de*
// @exclude        http://wiki.greasespot.net*
// @exclude        http://*.selfhtml.org*
// @exclude        http;//sourceforge.net*
// @exclude        http://www.spiegel.de*
// @exclude        http://www.h-online.com*
// @exclude        http://userscripts.org*
// @exclude        http://widgets.userscripts.org*
// @exclude        http://*.yahoo.com*
//
// @author         Sebastian-Lang.net
// @copyright      Creative Commons Attribution-ShareAlike 3.0 Unported (CC-BY-SA 3.0)
// @license        http://creativecommons.org/licenses/by-sa/3.0/
// @version        0.1.3
// @lastupdated    2010-11-01
// 
// @history        The complete changelog can be found at: http://userscripts.org/scripts/show/87962 
//
// For more information on this script visit http://userscripts.org/scripts/show/87962
//
// ==/UserScript==
//------------------------------------------------------------------------------------------------------------------------------------
// The Script
//---------------------------------------------------------------------------
// 	Declaration of variables
	
	// For monitoring/bugtracking only
	var TimeStart = new Date();
	var Monitoring = "no";
	
	// Global Settings
	var CheckUnknownHosts = "no";
	var CheckUnknownHosts = GM_getValue("6.CheckUnknownHosts");	

	// Current Location
	var Protocol = window.location.protocol
	var CurrentURL = window.location.href;
	var CurrentHost = window.location.host;
	var CurrentPathname = window.location.pathname;
	GM_setValue("1.URL",CurrentURL);
	GM_setValue("2.host",CurrentHost);
	GM_setValue("3.pathname",CurrentPathname);
	
	// Previous Host
	var oldHostCryp = GM_getValue("oldHost");

	// Configuration/Reset of variables
	var HostOnPersonalBlacklist = "no";
	var FoundInFilterlist1 = "no";
	var FoundInFilterlist2 = "no";
	var UnknownHostChecked = "no";	
	GM_setValue("4.FoundInFilterlist1","no");
	GM_setValue("5.FoundInFilterlist2","no");
	GM_setValue("7.UnknownHostChecked","no");

//--------------------------------------------------------------------------------------------------------------		
//	Greasemonkey menu
	GM_registerMenuCommand("-----------  \"HTTPS, please!\"  -----------","");
	GM_registerMenuCommand("host: " + CurrentHost, "");
//--------------------------------------------------------------------------------------------------------------
// Personal Filterlists
//---------------------------------------------------------------------------
// Personal Blacklist

	if (!GM_getValue("PersonalBlacklist")) {
		GM_setValue("PersonalBlacklist","");
		var PersonalBlacklist = GM_getValue("PersonalBlacklist")
		}	
	else {
		var PersonalBlacklist = GM_getValue("PersonalBlacklist")
		}
	
	if (PersonalBlacklist.indexOf(CurrentHost) >-1) { 
		HostOnPersonalBlacklist = "yes"
		};

//-----------------------------------------------	
// Greasemonkey menu
		
	function AddToPersonalBlacklist (PersonalBlacklist) {
		var host = window.location.host
		var PersonalBlacklist = GM_getValue("PersonalBlacklist") + "; " + host; 
		GM_setValue("PersonalBlacklist", PersonalBlacklist)
		};

	function RemoveFromPersonalBlacklist (PersonalBlacklist) {
		var host = window.location.host
		var PersonalBlacklist = GM_getValue("PersonalBlacklist").replace("; " + host,""); 
		GM_setValue("PersonalBlacklist", PersonalBlacklist)
		};
	
	if ( GM_getValue("PersonalBlacklist").indexOf(window.location.host)>-1){
		GM_registerMenuCommand("     - Remove host from BLACKLIST", RemoveFromPersonalBlacklist);
		}
	else {
		GM_registerMenuCommand("     - Add host to BLACKLIST", AddToPersonalBlacklist);
	}	
	
//---------------------------------------------------------------------------
// Personal Whitelist

	if (!GM_getValue("PersonalWhitelist")) {
		GM_setValue("PersonalWhitelist","");
		var PersonalWhitelist = GM_getValue("PersonalWhitelist")}	
	else{
		var PersonalWhitelist = GM_getValue("PersonalWhitelist")}
	
	if (Protocol == "http:" && PersonalWhitelist.indexOf(CurrentHost) >-1) { 
		window.location.href=window.location.href.replace(/http:\/\//, "https://")	
		};

//-----------------------------------------------	
// Greasemonkey menu
		
	function AddToPersonalWhitelist (PersonalWhitelist) {
		var host = window.location.host
		var PersonalWhitelist = GM_getValue("PersonalWhitelist") + "; " + host; 
		GM_setValue("PersonalWhitelist", PersonalWhitelist)
		};
	
	function RemoveFromPersonalWhitelist (PersonalWhitelist) {
		var host = window.location.host
		var PersonalWhitelist = GM_getValue("PersonalWhitelist").replace("; " + host,""); 
		GM_setValue("PersonalWhitelist", PersonalWhitelist)
		};
	
	if ( GM_getValue("PersonalWhitelist").indexOf(window.location.host)>-1){
		GM_registerMenuCommand("     - Remove host from WHITELIST", RemoveFromPersonalWhitelist);
		}
	else {
		GM_registerMenuCommand("     - Add host to WHITELIST", AddToPersonalWhitelist);
	}
	
//--------------------------------------------------------------------------------------------------------------
// Predefined Filterlists
//---------------------------------------------------------------------------
// Predefined Filterlist #1
// 	Filterlist #1 is for known sites whose http and https paths are identical.

	var Sites1 = new Array(

	// Bank Sites ... and stuff like that
	"www.aib.ie"						,
	"www.alipay.com"					,
	"www.axisbank.com"					,
	"www.bankofamerica.com"				,
	"www.bankofscotland.co.uk"			,
	"www.barclaycard.com"				,
	"www.barclaycard.co.uk"				,
	"www.barclaycard.de"				,
	"www.barclaycard.es"				,
	"www.barclaycard.it"				,
	"www.bbt.com"						,
	"bmo.com"							,
	"www.capitalone.com"				,
	"www.chase.com"						,
	"www.citizensbank.com"				,
	"www.comdirect.de"					,
	"www.credit-suisse.com"				,
	"www.dkb.de"						,
	"www.ecb.int"						,
	"bank.hangseng.com"					,
	"www.hdfcbank.com"					,
	"www.hsbc.com"						,
	"www.hypovereinsbank.de"			,
	"home.ingdirect.com"				,
	"www.kartensicherheit.de"			,
	"www.kiwibank.co.nz"				,
	"www.nab.com.au"					,
	"www.netbank.de"					,
	"www.norisbank.de"					,
	"www.mastercard.com"				,
	"www.morganstanley.com"				,
	"www.paypal.com"					,
	"www.scotiabank.com"				,
	"www.sparkasse.de"					,
	"www.tdcanadatrust.com"				,
	"www.ubs.com"						,
	"www.unicreditgroup.eu"				,
	"www.visa.co.uk"					,
	"www.wellsfargo.com"				,
	"www.westernunion.co.uk"			,
	"www.westernunion.de"				,
	"www.westernunion.es"				,
	"www.westernunion.fr"				,
	"www.westernunion.it"				,
	"www.westernunion.pt"				,

	// Computer Manufacturer
	"www.apple.com"						,
	"www.cisco.com"						,
	"www.shopping.hp.com"				,
	"www.ibm.com"						,

	// Email Provider
	"gmx.co.uk"							,
	"www.gmx.co.uk"						,
	"gmx.com"							,
	"www.gmx.com"						,
	"www.gmx.net"						,
	"www.hushmail.com"					,
	"lavabit.com"						,
	"login.live.com"					,
	"web.de"							,
	
	// Insurance Companies
	"www.allianzworldwidecare.com"		,
	"www.aok.de"						,
	"www.barmer-gek.de"					,
	"www.huk24.de"						,
	"www.kkh-allianz.de"				,
	"www.statefarm.com"					,
	"www.tk.de"							,
	
	// NGOs
	"www.amnesty.de"					,
	"www.amnesty.org"					,
	"www.amnesty.org.uk"				,
	"es.amnesty.org"					,
	"cpj.org"							,
	"www.eff.org"						,
	"www.liberty-human-rights.org.uk"	,

	// Newspapers & Magazines
	"www.aftenposten.no"				,
	"einestages.spiegel.de"				,
	"www.economist.com"					,
	"www.faz.net"						,
	"event.faz.net"						,
	"kfz-versicherung.faz.net"			,
	"www.fazfinance.net"				,
	"www.focus.de"						,
	"www.freiepresse.de"				,
	"www.ftd.de"						,
	"www.geo.de"						,
	"www.handelsblatt.com"				,
	"www.harvardbusinessmanager.de"		,
	"www.manager-magazin.de"			,
	"www.merian.de"						,
	"shop.merian.de"					,
	"www.morgenpost.de"					,
	"www.nydailynews.com"				,
	"nytimes.com"						,
	"www.pm-gehirntrainer.de"			,
	"stern.de"							,
	"www.stuttgarter-zeitung.de"		,
	"www.taz.de"						,
	"www.weeklystandard.com"			,
	"www.vn.nl"							,
	"www.washingtonpost.com"			,
	"voices.washingtonpost.com"			,
	"www.washpost.com"					,
	"www.wiwo.de"						,

	// Search Engines
	"duckduckgo.com"					,
	"eu.ixquick."						,
	"ixquick."							,
	"www.google.com"					,
	"code.google.com"					,
	"docs.google.com"					,
	"maps.google.co.uk"					,
	"maps.google.com"					,
	"maps.google.de"					,
	"maps.google.es"					,
	"maps.google.fr"					,
	"news.google.com"					,
	"news.google.de"					,
	"pack.google.com"					,
	"metager2.de"						,
	"www.startpage.com"					,

	// Shopping
	"www.amazon.co.uk"					,
	"www.amazon.cn"						,
	"www.amazon.de"						,
	"www.amazon.fr"						,
	"aws.amazon.com"					,
	"www.safer-shopping.com"			,
	"www.safer-shopping.de"				,
	"shop.canonical.com"				,
	"www.markt.de"						,
	"www.printfection.com"				,

	// Social Networks ... and stuff like that
	"www.facebook.com"					,
	"identi.ca"							,
	"mixi.jp"							,
	"www.myspace.com"					,
	"www.newsvine.com"					,
	"www.stumbleupon.com"				,
	"twitter.com"						,
	"twitpic.com"						,
	"www.xing.com"						,
	"yfrog.com"							,
	"www.yigg.de"						,

	// Software Producers
	"www.adobe.com"						,
	"blogs.adobe.com"					,
	"www.macromedia.com"				,
	"maven.apache.org"					,
	"www.avg.com.au"					,
	"www.avira.com"						,
	"www.comodo.com"					,
	"personalfirewall.comodo.com"		,
	"support.comodo.com"				,
	"www.drumbeat.org"					,
	"fedoraproject.org"					,
	"www.gdata.de"						,
	"www.gdatasoftware.com"				,
	"www.icq.com"						,
	"www.java.com"						,
	"www.mcafee.com"					,
	"home.mcafee.com"					,
	"www.microsoft.com"					,
	"www.mozdev.org"					,
	"mozilla.com"						,
	"blog.mozilla.com"					,
	"support.mozilla.com"				,
	"www.mozilla.org"					,
	"bugzilla.mozilla.org"				,
	"developer.mozilla.org"				,
	"guides.mozilla.org"				,
	"hg.mozilla.org"					,
	"mxr.mozilla.org"					,
	"planet.mozilla.org"				,
	"quality.mozilla.org"				,
	"wiki.mozilla.org"					,
	"addons.mozilla.org"				,
	"mozillalabs.com"					,
	"mozillamessaging.com"				,
	"www.mozillamessaging.com"			,
	"de.norton.com"						,
	"uk.norton.com"						,
	"us.norton.com"						,
	"www.pgp.com"						,
	"www.pgp.de"						,
	"keyserver.pgp.com"					,
	"www.scientificlinux.org"			,
	"security.symantec.com"				,
	"typo3.org"							,
	"webkit.org"						,
	"wordpress.com"						,
	"wordpress.org"						,
	
	// Trade Unions
	"www.dgb.de"						,
	"www.gew.de"						,
	"www.igbce.de"						,
	"www.igmetall.de"					,
	"www.transnet.org"					,
	"www.verdi.de"						,
	"dju.verdi.de"						,
	"aktive.verdi.de"					,
	"archiv.verdi.de"					,
	"branchen.verdi.de"					,
	"international.verdi.de"			,
	"jugend.verdi.de"					,
	"presse.verdi.de"					,
	"service.verdi.de"					,
	
	// Travel & Transportation
	"www.ab-in-den-urlaub.de"			,
	"www.airfrance.com"					,
	"www.airfrance.de"					,
	"www.airfrance.us"					,
	"www.alltours.de"					,
	"auspost.com.au"					,
	"www.bahn.de"						,
	"www.britishairways.com"			,
	"www.canadapost.ca"					,
	"www.deutschepost.de"				,
	"www.dhl.de"						,
	"www.dhl-usa.com"					,
	"www.eurostar.com"					,
	"www.expedia.com"					,
	"www.fluege.de"						,
	"www.gatwickexpress.com"			,
	"www.greyhound.com"					,
	"www.hinundweg.de"					,
	"www.hotelreservation.com"			,
	"www.hotelreservierung.de"			,
	"www.itsbilla.at"					,
	"www.kuoni.at"						,
	"www.lastminute.de"					,
	"de.lastminutetravel.com"			,
	"www.lufthansa.com"					,
	"www.post.ch"						,
	"www.postdanmark.dk"				,
	"www.raileurope.co.uk"				,
	"www.reisegeier.de"					,
	"reisen.de"							,
	"hotel.reisen.de"					,
	"www.spanair.com"					,
	"www.stanstedexpress.com"			,
	"www.swisspost.ch"					,
	"www.tui.at"						,
	"www.urlaubstours.de"				,
	"www.usps.com"						,

	// Yellow Pages
	"www.192.com"						,
	"www.11880.com"						,
	"www.colourpages.com"				,
	"www.gelbeseiten.de"				,
	"www.ukphonebook.com"				,

	
	// uncategorized
	"www.4shared.com"					,
	"www.addthis.com"					,
	"andappstore.com"					,
	"www.aol.com"						,
	"www.appstorehq.com"				,
	"www.bfdi.bund.de"					,
	"www.bigbrotherawards.de"			,
	"bit.ly"							,
	"www.booking.com"					,
	"www.bt.com"						,
	"www.productsandservices.bt.com"	,
	"www.btplc.com"						,
	"www.careerbuilder.com"				,
	"www.comcast.com"					,
	"www.datenschutz.de",
	"www.datenschutz-ist-buergerrecht.de",
	"www.datenschutzzentrum.de"			,
	"www.ehow.com"						,
	"ezinearticles.com"					,
	"www.financescout24.de"				,
	"www.foebud.org"					,
	"www.freelancer.com"				,
	"www.godaddy.com"					,
	"www.grc.com"						,
	"gulli.com"							,
	"www.gulli.com"						,
	"www.herold.at"						,
	"hotfile.com"						,
	"imgur.com"							,
	"isohunt.com"						,
	"www.jobscout24.de"					,
	"www.jondos.org"					,
	"www.karriere.de"					,
	"www.ldi.nrw.de"					,
	"www.mapquest.com"					,
	"www.mturk.com"						,
	"www.nybooks.com"					,
	"www.odesk.com"						,
	"www.opendns.com"					,
	"www.orange.fr"						,
	"www.ovi.com"						,
	"contactsui.ovi.com"				,
	"mail.ovi.com"						,
	"maps.ovi.com"						,
	"store.ovi.com"						,
	"www.pandora.com"					,
	"www.pantone.com"					,
	"thepiratebay.org"					,
	"www.preisvergleich.de"				,
	"insurance.preisvergleich.de"		,
	"www.presidentialelection.com"		,
	"proxify.co.uk"						,
	"proxy.org"							,
	"www.rapidshare.com"				,
	"www.redhat.com"					,
	"ripe.net"							,
	"www.scribd.com"					,
	"www.security-forums.com"			,
	"www.share-online.biz"				,
	"www.stepstone.at"					,
	"www.stepstone.be"					,
	"www.stepstone.de"					,
	"www.stepstone.dk"					,
	"www.stepstone.fr"					,
	"www.stepstone.se"					,
	"www.telekom.com"					,
	"www.test.de"						,
	"www.thecapitol.net"				,
	"www.theplanet.com"					,
	"member.thinkfree.com"				,
	"www.torproject.org"				,
	"blog.torproject.org"				,
	"www.typepad.com"					,
	"www.tv.com"						,	
	"www.varnish-cache.org"				,
	"www.verisign.com"					,
	"sealinfo.verisign.com"				,
	"www.virustotal.com"				,
	"www.votesmart.org"					,
	"www.youtube.com"					,
	"www.zoho.com"						,
	"www.zynga.com"
	
	);
	
	for (var i = 0; i < Sites1.length; i++) {
		if (Protocol == "http:" && HostOnPersonalBlacklist != "yes" && CurrentHost == Sites1[i]) { 
			window.location.href=window.location.href.replace(/http:\/\//, "https://");			
			FoundInFilterlist1 = "yes";
			GM_setValue("4.FoundInFilterlist1",FoundInFilterlist1);			
			};
		}; 				

		
//---------------------------------------------------------------------------
// Predefined Filterlist #2 
// 	The second Filterlist is required for a small number of sites whose http and https paths are different.

	var Sites2 = new Array();
	Sites2[0] = new Object();	Sites2[0]["http"] = "http://www.scroogle.org/cgi-bin/scraper.htm";	Sites2[0]["https"] = "https://ssl.scroogle.org";		
	
	if (FoundInFilterlist1 == "no") {
		for (var i = 0; i < Sites2.length; i++) { 
			if (Protocol == "http:" && HostOnPersonalBlacklist != "yes" && CurrentURL == Sites2[i].http) 
				{window.location.href=window.location.href.replace(/.+/, Sites2[i].https + CurrentPathname); 
				FoundInFilterlist2 = "yes";
				GM_setValue("5.FoundInFilterlist2",FoundInFilterlist2);
				};
			}
		};
		
//-----------------------------------------------
//	Wikipedia
		
	var Sites3 = new Array(
	"en","de","fr","pl","it","ja","es","nl","pt","ru","sv","ca","no","fi","uk","hu","cs","ro","tr","ko","vi","da","ar","eo",
	"sr","id","lt","vo","sk","he","bg","fa","sl","war","hr","et","ms","new","simple"
	);

	for (var i = 0; i < Sites3.length; i++) {
			if (Protocol == "http:" && HostOnPersonalBlacklist != "yes" && CurrentHost == Sites3[i]+".wikipedia.org") { 
				window.location.href=window.location.href.replace(/.+/, "https://secure.wikimedia.org/wikipedia/"+Sites3[i] + CurrentPathname);					
				};
			}; 			
				
			
//--------------------------------------------------------------------------------------------------------------
// 	Check host (Make a request) if not found in filterlists - and if host was not checked shortly before (redirect).

	var CurrentHostCryp = CurrentHost.charCodeAt(0)+CurrentHost.charCodeAt(1)*2+CurrentHost.charCodeAt(4)*2+CurrentHost.charCodeAt(CurrentHost.lenght-5)*2;

	if (Protocol == "http:" && CheckUnknownHosts == "yes" && HostOnPersonalBlacklist != "yes" && oldHostCryp != CurrentHostCryp && FoundInFilterlist1 == "no" && FoundInFilterlist2 == "no") {
		GM_xmlhttpRequest({
			method: "GET",
			url: "https://" + CurrentHost,
			onload: function(response) {
				GM_setValue("8.Status",response.status);
				var Status = GM_getValue("8.Status");
		if (Status == "200") 
			{window.location.href=window.location.href.replace(/^http:/,'https:');
			UnknownHostChecked = "yes";
			GM_setValue("7.UnknownHostChecked",UnknownHostChecked);
			};
		}})};
		
//-----------------------------------------------	
// Greasemonkey menu

	function TurnOnCheckUnknownHosts (CheckUnknownHosts) {
		var CheckUnknownHosts = "yes";
		GM_setValue("6.CheckUnknownHosts",CheckUnknownHosts)
		};
		
	function TurnOffCheckUnknownHosts (CheckUnknownHosts) {
		var CheckUnknownHosts = "no";
		GM_setValue("6.CheckUnknownHosts",CheckUnknownHosts)
		};
		
	if (CheckUnknownHosts == "yes"){
		GM_registerMenuCommand("automatic request enabled", "");
		GM_registerMenuCommand("     - DO NOT CHECK unknown hosts", TurnOffCheckUnknownHosts)
		}
	else {
		GM_registerMenuCommand("automatic request disabled", "");
		GM_registerMenuCommand("     - CHECK unknown hosts", TurnOnCheckUnknownHosts)}

		
//--------------------------------------------------------------------------------------------------------------	
	GM_registerMenuCommand("----------------------------------------------", "");
//--------------------------------------------------------------------------------------------------------------
// Convert protocol of links on current page whose hosts are booked in a filterlist
// Predefined Filterlist 1

	for (var i = 0, link; (link=document.links[i]); i++) {
				for (var j = 0; j < Sites1.length; j++) { 
					if (link.host == Sites1[j]) {
						link.href = link.href.replace(/http:\/\//, "https://");
						};
				 };		
		};
	
// Predefined Filterlist 2

	for (var i = 0, link; (link=document.links[i]); i++) {
				for (var j = 0; j < Sites2.length; j++) { 
					if (link.href.indexOf(Sites2[j].http)>-1) {
						link.href = link.href.replace(/.+/, Sites2[j].https);
						};
				 };		
		};	

	for (var i = 0, link; (link=document.links[i]); i++) {
		for (var j = 0; j < Sites3.length; j++) { 
			if (link.href.indexOf(Sites3[j]+".wikipedia.org")>-1) {
				link.href = link.href.replace(/.+/, "https://secure.wikimedia.org/wikipedia/"+Sites3[j] + link.pathname);
				};
			};		
		};
		

//--------------------------------------------------------------------------------------------------------------
// Workaround for issue on continous redirects and to avoid multiple checking the same host

		GM_setValue("oldHost",CurrentHostCryp);	

//--------------------------------------------------------------------------------------------------------------
//	Delete variables which are no longer required

	if (Monitoring !="yes"){
		GM_setValue("1.URL","");
		GM_setValue("2.host","");
		GM_setValue("3.pathname","");	
		GM_setValue("4.FoundInFilterlist1","");
		GM_setValue("5.FoundInFilterlist2","");
		GM_setValue("7.UnknownHostChecked","");
		GM_setValue("8.Status","");
	};

	if (Monitoring =="yes"){
		var TimeEnd = new Date();
		var TimeTotal= TimeEnd - TimeStart + " ms";
	};	
	
//--------------------------------------------------------------------------------------------------------------
// The End
//------------------------------------------------------------------------------------------------------------------------------------