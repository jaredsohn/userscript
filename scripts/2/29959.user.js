// ==UserScript==
// @name           Google Search Filter Ultimate + latest definitions (Tue, Oct 07th 2008)
// @description    completely removes a list of bad urls results from appearing in google searches
// @version        1.0.0
// @author         Thomas Joy / ecstasyware
// @namespace      http://ecstasylove.org/
// @homepage       
// @include        http://www.google.*/search*
// @Note           
// ==/UserScript==



/* == Modified Script =========
 * name           Google Search Filter
 * description    Selected web-sites aren't displayed from Google search result.
 * version        2.2.6
 * Written by Shinya.
 * http://www.code-404.net/
 *
 * http://userscripts.org/scripts/show/12643
/* ======================================= */


/* == The Original Script Copyright =========
 * Written by leva.
 * http://note.openvista.jp/212/
 * 
 * Released under the CCL by-nc-na ja license.
 * http://creativecommons.org/licenses/by-nc-sa/2.1/jp/
/* ======================================= */

// Therefore, the license of this script is under the CCL by-nc-na ja license, too.


(function(){
  var SearchFilter = {
    // == Config ==================
    
    // Default blocked sites
    // CAUTION: Script DO NOT use this list if you used "Filters Editor".
    filters: [
     // "del.icio.us",
     // "buzzurl.jp",
     // "(a|b|r|mgw).hatena.ne.jp",
     // "1470.net",
     // "pookmark.jp",
     // "bookmarks.yahoo.co.jp",
     // "clip.(nifty|livedoor).com",
     // "(esearch|tag|pt.afl).rakuten.co.jp",
     // "psearch.yahoo.co.jp"

	//regexpCase:http://gov.*\\.com/
	
	
	 "www.bbc.co.uk"
	 "news.bbc.co.uk"
	 "www.bbcworldwide.com"
	 "www.bbcshop.com"
	 "backstage.bbc.co.uk"
	 "jobs.bbc.co.uk"
	 "www.bbcmotiongallery.com"
	 "creativearchive.bbc.co.uk"
	 "newsrss.bbc.co.uk"
	 "www.bbcworld.com"
	 "www.bbcamerica.com"
	 "www.bbcgoodfood.com"
	 "www.bbctraining.com"
	 "www.ebid.net"
	 "uk.ebid.net"
	 "helpdesk.ebid.net"
	 "us.ebid.net"
	 "www.wikipedia.org"
	 "en.wikipedia.org"
	 "id.wikipedia.org"
	 "sr.wikipedia.org"
	 "ms.wikipedia.org"
	 "sw.wikipedia.org"
	 "simple.wikipedia.org"
	 "rm.wikipedia.org"
	 "la.wikipedia.org"
	 "www.talktofrank.com"
	 "drugs.homeoffice.gov.uk"
	 "www.drugs.org.uk"
	 "www.homeoffice.gov.uk"
	 "www.fco.gov.uk"
	 "www.guardian.co.uk"
	 "www.nhsdirect.nhs.uk"
	 "www.hse.gov.uk"
	 "www.opsi.gov.uk"
	 "www.teachernet.gov.uk"
	 "www.rcpsych.ac.uk"
	 "www.sdea.police.uk"
	 "www.thinkroadsafety.gov.uk"
	 "www.direct.gov"
	 "www.erowid.org"
	 "news.sky.com"
	 "www.mirror.co.uk"
	 "www.dailymail.co.uk"
	 "www.telegraph.co.uk"
	 "www.independent.co.uk"
	 "www.channel4.com/news"
	 "www.newsoftheworld.co.uk"
	 "books.guardian.co.uk"
	 "www.sky.com"
	 "itn.co.uk"
	 "www.thesun.co.uk"
	 "uk.reuters.com"
	 "film.guardian.co.uk"
	 "news.aol.co.uk"
	 "www.defra.gov.uk"
	 "uk.news.yahoo.com"
	 "www.scotland.gov.uk"
	 "www.msnbc.msn.com"
	 "www.newsinternational.co.uk"
	 "www.cnn.com"
	 "www.tiscali.co.uk/news"
	 "www.timesonline.co.uk"
	 "news.yahoo.com"
	 "www.dh.gov.uk"
	 "blogs.guardian.co.uk"
	 "www.nme.com"
	 "www.gm.tv"
	 "www.dfes.gov.uk"
	 "www.foxnews.com"
	 "www.royal.gov.uk"
	 "news.zdnet.co.uk"
	 "www.priory.com"
	 "www.blackwellpublishing.com"
	 "www.psych.ox.ac.uk"
	 "bjp.rcpsych.org"
	 "www.iop.kcl.ac.uk"
	 "www.gpnotebook.co.uk"
	 "www.psychiatry.cam.ac.uk"
	 "www.psychiatricconsultations.co.uk"
	 "bubl.ac.uk"
	 "pn.bmj.com"
	 "www.tesco.com"
	 "direct.tesco.com"
	 "www.tesco.net"
	 "www.tescocorporate.com"
	 "www.tesco-careers.com"
	 "www.tescodvdrental.com"
	 "www.clothingattesco.com"
	 "www.tescofinance.com"
	 "www.tescointernetphone.com"
	 "www.tescodiets.com"
	 "www.tescophoto.com"
	 "www.tescocompare.com"
	 "www.tescosoftware.com"
	 "www.tescoopticians.com"
	 "www.computersforschools.co.uk"
	 "www.asda.co.uk"
	 "www.george.com"
	 "www.asdafinance.com"
	 "www.asda-electricals.co.uk"
	 "www.asda.jobs"
	 "www.walmart.com"
	 "www.cnet.co.uk"
	 "www.download.com"
	 "www.cnet.com"
	 "crave.cnet.co.uk"
	 "techrepublic.com.com"
	 "blogs.techrepublic.com.com"
	 "articles.techrepublic.com.com"
	 "content.techrepublic.com.com"
	 "search.techrepublic.com.com"
	 "whitepapers.zdnet.com"
	 "www.zdnet.co.uk"
	 "www.getafreelancer.com"
	 //"www.microsoft.com"
	 //"support.microsoft.com"
	 "www.apple.com"
	 "store.apple.com"
	 "www.apple.co.uk"
	 "support.apple.com"
	 "www.info.apple.com"
	 "www.aol.com"
	 "music.aol.co.uk"
	 "video.aol.co.uk"
	 "www.aolbroadband.co.uk"
	 "info.aol.co.uk"
	 "search.aol.com"
	 "business.timesonline.co.uk"
	 "games.aol.co.uk"
	 "www.aol.co.uk"
	 "www.bbc.com"
	 "www.bbcnews.co.uk"
	 "www.usa.gov"
	 "abc.go.com"
	 "www.bitesites.com"
	 "bitesites.com"
	 "www.garnier.co.uk"
	 "www.garnier.com"
	 "www.made-in-china.com"
	 "www.bbcentertainment.com"
	 "www.bbcmagazines.com"
	 "www.bbckids.ca"
	 "www.skyatnightmagazine.com"
	 "downloads.bbc.co.uk"
	 "blogs.bbc.co.uk"
	 "www.bebo.com"
	 "digg.com"
	 "open.bbc.co.uk"
	 "news.scotsman.com"
	 "www.nytimes.com"
	 "www.yell.com"
	 "jam.bbc.co.uk"
	 "edition.cnn.com"
	 "www.bbcworldnews.com"
	 "www.topgear.com"
	 "www.bbcamericashop.com"
	 "www.bbcprime.com"
	 "www.gardenersworld.com"
	 "www.bbcwild.com"
	 "www.bbcfood.com"
	 "www.bbc.uk.com"
	 "technology.timesonline.co.uk"
	 "www.bbcresources.com"
	 "www.bbcwildlifemagazine.com"
	 "www.bbcmusicmagazine.com"
	 "www.bbccharterreview.org.uk"
	 "www.bbcactive.com"
	 "www.open2.net"
	 "www.bbchistorymagazine.com"
	 "www.bbccanada.com"
	 "www.radiotimes.com"
	 "www.bbcfocusmagazine.com"
	 "www.bbcgoodfoodshow.com"
	 "www.bbcaudiobooksamerica.com"
	 "entertainment.timesonline.co.uk"
	 "www.bbc.net.uk"
	 "www.bbclearning.com"
	 "www.londonbbcgoodfoodshow.com"
	 "www.bbcaudiobooks.com"
	 "www.monitor.bbc.co.uk"
	 "www.bbcpictures.com"
	 "stephenfry.com"
	 
	 

////////////////////////////////////////////////////////

////////beginning of updates 
	 "www.washingtonpost.com" 
	 "www.time.com"
 	 "mobile.time.com"
	 "thepage.time.com"
	 "www.timeinc.com"
	 "www.timewarner.com"
	 "news.cnet.com"
	 "www.timeforkids.com"
	 "www.scientology.org"
	 "www.channel4.com"
     "www.channel4learning.com"
	 "www.skysports.com"
	 "showbiz.sky.com"
	 "www.skyone.co.uk"
	 "broadband.sky.com"
	 "jobs.sky.com"
	 "anytime.sky.com"
	 "tv.sky.com"
	 "www.skynews.com.au"
	 "www.bbclifestyle.com"
   	 "bbc.cpdn.org"
	 "tiny.planlos.org/p7yzpu"
	 "home.skysports.com"
	 "forums.skysports.com"
	 "msn.skysports.com"
	 "allyours.virginmedia.com"
	 "msnsport.skysports.com"
	 "pda.sky.com"
	 "music.guardian.co.uk"
	 "newsvote.bbc.co.uk"
	 "advertisewithus.bbc.com"
	 "www.ofcom.org.uk"
	 "www.hmrc.gov.uk"
	 "disney.go.com"
	 "home.disney.co.uk"
	 "disneystore-shopping.disney.co.uk"
	 "www.disneyinternational.com"
	 "disneyworld.disney.go.com"
	 "www.disney.co.uk"
	 "www.monsanto.com"
	 "www.monsanto.co.uk"
	 "www.whitehouse.gov"
	 "www.georgebush.com"
	 "www.derekacorah.org"
	 "uktv.co.uk"
	 "www.hollywood.com"
	 "hollywoodrecords.go.com"
	 "www.warnerbros.com"
	 "www.warnerbros.co.uk"
	 "warnerbrosrecords.com"
	 "harrypotter.warnerbros.com"
	 "www2.warnerbros.com"
	 "www.sixfeetundertv.co.uk"
	 "www.virgin.com"
	 "www.virgin-atlantic.com"
	 "www.virginmedia.com"
	 "www.virgintrains.co.uk"
	 "www.virginradio.co.uk"
	 "www.virginmobile.com"
	 "www.virgin.co.uk"
	 "uk.virginmoney.com"
	 "www.virginholidays.co.uk"
	 "www.virginactive.co.uk"
	 "www.virginrecords.com"
	 "www.virginbooks.com"
	 "www.virgindrinks.com"
	 "www.virginradio.com"
	 "www.virginmoney.com"
	 "www.virginwines.com"
	 "www.virgintrainsfares.co.uk"
	 "www.virginunite.com"
	 "movies.nytimes.com"
	 "nytimes.com"
	 "www.art.com"
	 "everything2.com"
	 "www.everything2.com"
	 "www.everything2.org"
	 "www.bbc.co.uk/drama/spooks"
	 "www.teachingenglish.org.uk"
	 "www.christian.org.uk"
	 "www.direct.gov.uk"
	 "www.berr.gov.uk"
	 "www.lga.gov.uk"
	 "www.communities.gov.uk"
	 "www.dwp.gov.uk"
	 "www.number10.gov.uk"
	 "www.statistics.gov.uk"
	 "www.gov.im"
	 "topics.nytimes.com"
	 "www.globalwarming.org"
	 "www.savetodaysavetomorrow.com"
	 "www.edfenergy.com"
	 "www.archbishopofcanterbury.org"
	 "www.nhm.ac.uk"
	 "www.bbcgreen.com"
	 
	 ////2008.07.25
	 "info.bbcmusicmagazine.com"
	 "www.nowmagazine.co.uk"
	 "www.itv.com/news"
	 "www.howstuffworks.com"
	 "www.skynews.co.uk"
	 "www.usatoday.com"
	 "reg.e.usatoday.com"
	 "asp.usatoday.com"
	 "blogs.usatoday.com"
	 "m.usatoday.com"
	 "puzzles.usatoday.com"
	 "online.wsj.com"
	 "interactive.wsj.com"
	 "blogs.wsj.com"
	 "info.wsj.com"
	 "www.ap.org"
	 "hosted.ap.org"
	 "www.upi.com"
	 "about.upi.com"
	 "www.reuters.com"
	 "uk.mobile.reuters.com"
	 "today.reuters.co.uk"
	 "secondlife.reuters.com"
	 "football.uk.reuters.com"
	 "www.microsite.reuters.co.uk"
	 "africa.reuters.com"
	 "investing.reuters.co.uk"
	 "in.reuters.com"
	 "travel.uk.reuters.com"
	 "www.cbs.com"
	 "www.cbsnews.com"
	 "www.sportsline.com"
	 "www.eveningnews.com"
	 "www.cbsradio.com"
	 "www.nbc.com"

	 ////2008.07.25 pt.2
	 "www.irs.gov"
	 "www.ogc.gov.uk"
	 "www.wales.gov.uk"
	 "www.ico.gov.uk"
	 "www.tfl.gov.uk"
	 "www.gateway.gov.uk"
	 "www.jobcentreplus.gov.uk"
	 "www.ukvisas.gov.uk"
	 "www.food.gov.uk"
	 "www.dfid.gov.uk"
	 "www.northernireland.gov.uk"
	 "www.fsa.gov.uk"
	 "www.businesslink.gov.uk"
	 "www.ipo.gov.uk"
	 "www.familyrecords.gov.uk"
	 "www.doh.gov.uk"
	 "www.nationalarchives.gov.uk"
	 "www.cabinetoffice.gov.uk"
	 "www.workingintheuk.gov.uk"
	 "www.ofsted.gov.uk"
	 "www.dft.gov.uk"


	 ///"www.companieshouse.gov.uk"
	 "www.london.gov.uk"
	 "nds.coi.gov.uk"
	 "www.info4local.gov.uk"
	 "www.environment-agency.gov.uk"
	 "www.gchq.gov.uk"
	 "www.culture.gov.uk"
	 "www.hm-treasury.gov.uk"
	 "www.idea.gov.uk"
	 "www.oft.gov.uk"
	 "www.metoffice.gov.uk"
	 "www.surestart.gov.uk"
	 "www.lsc.gov.uk"
	 "www.forestry.gov.uk"
	 "www.mhra.gov.uk"
	 "www.scotlandspeople.gov.uk"
	 "www.gos.gov.uk"
	 "www.sustainable-development.gov.uk"
	 "www.uktradeinvest.gov.uk"
	 "www.childcarelink.gov.uk"
	 ///"www.dvla.gov.uk"
	 "www.equalities.gov.uk"
	 "www.ips.gov.uk"
	 "www.gad.gov.uk"
	 "www.crb.gov.uk"
	 "www.pro.gov.uk"
	 "www.eatwell.gov.uk"
	 "www.envirowise.gov.uk"
	 "www.foodstandards.gov.uk"
	 "www.thepensionservice.gov.uk"
	 "www.tradingstandards.gov.uk"
	 "www.govtalk.gov.uk"
	 "www.go-se.gov.uk"
	 "www.hmcourts-service.gov.uk"
	 "www.everychildmatters.gov.uk"
	 "www.audit-commission.gov.uk"
	 "www.tda.gov.uk"
	 "www.cityoflondon.gov.uk"
	 "www.consumerdirect.gov.uk"
	 "www.housingcorp.gov.uk"
	 "www.curriculumonline.gov.uk"
	 "www.jncc.gov.uk"
	 "www.tiger.gov.uk"
	 "www.glasgow.gov.uk"
	 "www.cheshire.gov.uk"
	 "www.mla.gov.uk"
	 "www.digitaltelevision.gov.uk"
	 "www.goem.gov.uk"
	 "www.csl.gov.uk"
	 "www.planningportal.gov.uk"
	 "www.connexions.gov.uk"
	 "www.ngfl.gov.uk"
	 "www.birmingham.gov.uk"
	 "www.healthyschools.gov.uk"
	 "www.dca.gov.uk"
	 "www.gosw.gov.uk"
	 "www.foresight.gov.uk"
	 "www.agepositive.gov.uk"
	 "www.ofgem.gov.uk"
	 "new.wales.gov.uk"
	 
	 "www.supply2.gov.uk"
	 "www.parentscentre.gov.uk"
	 "www.nationalschool.gov.uk"
	 "www.govconnect.gov.uk"
	 "www.csr.gov.uk"
	 "www.cio.gov.uk"
	 "www.leeds.gov.uk"
	 "www.ges.gov.uk"
	 "www.highways.gov.uk"
	 "www.gls.gov.uk"
	 "www.landregistry.gov.uk"
	 "www.gsr.gov.uk"
	 "www.manchester.gov.uk"
	 "www.lda.gov.uk"
	 "www.lgiu.gov.uk"
	 "www.local.gov.uk"
	 "www.wlga.gov.uk"
	 "www.historic-scotland.gov.uk"
	 "www.bia.homeoffice.gov.uk"
	 "www.edinburgh.gov.uk"
	 "www.preparingforemergencies.gov.uk"
	 "www.uksport.gov.uk"
	 "www.westminster.gov.uk"
	 "www.liverpool.gov.uk"
	 "www.mcga.gov.uk"
	 "www.deni.gov.uk"
	 "www.dclg.gov.uk"
	 "www.kent.gov.uk"
	 "www.vosa.gov.uk"
	 "www.nio.gov.uk"
	 "www.newcastle.gov.uk"
	 "www.princeofwales.gov.uk"
	 "www.dsa.gov.uk"
	 "www.gro.gov.uk"
	 "www.ons.gov.uk"
	 "www.camden.gov.uk"
	 "www.carers.gov.uk"
	 "www.justice.gov.uk"
	 "www.delni.gov.uk"
	 "www.ccw.gov.uk"
	 "www.respect.gov.uk"
	 "www.southampton.gov.uk"
	 "www.euro.gov.uk"
	 "www.swansea.gov.uk"
	 "www.hfea.gov.uk"
	 "www.voa.gov.uk"
	 "www.insolvency.gov.uk"
	 "www.netregs.gov.uk"
	 "www.wakefield.gov.uk"
	 "www.comms.gov.uk"
	 "www.hants.gov.uk"
	 "www.hmprisonservice.gov.uk"	 
	 "www.sefton.gov.uk"
	 "petitions.pm.gov.uk"
	 "www.ofwat.gov.uk"
	 "www.legalservices.gov.uk"
	 "www.student-support-saas.gov.uk"
	 ///"www.intellectual-property.gov.uk"
	 "www.gibraltar.gov.uk"
	 "www.traintogain.gov.uk"
	 "www.dius.gov.uk"
	 "www.nottinghamcity.gov.uk"
	 ///"www.mi6.gov.uk"
	 "www.cardiff.gov.uk"
	 "www.neighbourhood.gov.uk"
	 "www.cps.gov.uk"
	 "www.eu2005.gov.uk"
	 "www.rbkc.gov.uk"
	 "www.bristol.gov.uk"	 
	 "www.csa.gov.uk"
	 "www.nas.gov.uk"
	 "www.cornwall.gov.uk"
	 "www.lge.gov.uk"
	 "www.greenwich.gov.uk"
	 "www.government-skills.gov.uk"
	 "www.plymouth.gov.uk"
	 "www.ceop.gov.uk"
	 "www.belfastcity.gov.uk"
	 "www.gamblingcommission.gov.uk"
	 "www.ukho.gov.uk"
	 "www.oxfordshire.gov.uk"
	 "www.countrysideaccess.gov.uk"
	 "www.lincolnshire.gov.uk"
	 "www.oftel.gov.uk"
	 "www.gro-scotland.gov.uk"
	 "www.statutelaw.gov.uk"	 
	 "www.exeter.gov.uk"
	 "www.foi.gov.uk"
	 "www.rohs.gov.uk"
	 "www.thepensionsregulator.gov.uk"
	 "www.islington.gov.uk"
	 "www.york.gov.uk"
	 "www.halton.gov.uk"
	 "www.medway.gov.uk"
	 "www.lambeth.gov.uk"
	 "www.orkney.gov.uk"
	 "www.towerhamlets.gov.uk"
	 "www.oxford.gov.uk"
	 "www.hullcc.gov.uk"
	 "www.ogcbuyingsolutions.gov.uk"
	 "www.pesticides.gov.uk"
	 "www.surreycc.gov.uk"
	 "www.g8.gov.uk"	 
	 "www.niassembly.gov.uk"
	 "www.bradford.gov.uk"
	 "www.mybusinessrates.gov.uk"
	 "www.brent.gov.uk"
	 "www.childtrustfund.gov.uk"
	 "www.cambridge.gov.uk"
	 "www.aberdeencity.gov.uk"
	 "www.torfaen.gov.uk"
	 "www.proni.gov.uk"
	 "www.southwark.gov.uk"
	 "www.durham.gov.uk"
	 "www.salford.gov.uk"
	 "www.leicester.gov.uk"
	 "www.cpni.gov.uk"
	 "www.buckscc.gov.uk"
	 "www.merseytravel.gov.uk"
	 "www.millenniumvolunteers.gov.uk"	 
	 "www.devon.gov.uk"
	 "www.lawcom.gov.uk"
	 "www.sheffield.gov.uk"
	 "www.norfolk.gov.uk"
	 "www.haringey.gov.uk"	 
	 "www.civilservice.gov.uk"
	 "www.bnsc.gov.uk"
	 "www.gloucestershire.gov.uk"
	 "www.esf.gov.uk"	 
	 "www.hgc.gov.uk"
	 "www.wmlga.gov.uk"
	 "www.harrogate.gov.uk"
	 "www.aberdeenshire.gov.uk"
	 "www.communitiesscotland.gov.uk"
	 "www.wandsworth.gov.uk"
	 "www.bexley.gov.uk"
	 "www.lewisham.gov.uk"	 
	 "www.learningcurve.gov.uk"
	 "www.scotcourts.gov.uk"
	 "www.lake-district.gov.uk"
	 "www.lbhf.gov.uk"	 	 
	 "www.cambridgeshire.gov.uk"
	 "www.hackney.gov.uk"
	 "www.barnet.gov.uk"
	 "www.soca.gov.uk"
	 "www.westsussex.gov.uk"
	 "www.walthamforest.gov.uk"
	 "www.coventry.gov.uk"
	 "www.peoplesnetwork.gov.uk"	 
	 "www.bournemouth.gov.uk"
	 "www.newham.gov.uk"
	 "www.cosla.gov.uk"
	 "www.dardni.gov.uk"	 	 
	 "www.gcda.gov.uk"
	 "www.salt.gov.uk"
	 "www.croydon.gov.uk"
	 "www.dcsf.gov.uk"
	 "www.norwich.gov.uk"
	 "www.eca.gov.uk"
	 "www.local.odpm.gov.uk"
	 "www.newport.gov.uk"	 
	 "www.ashford.gov.uk"
	 "www.nottinghamshire.gov.uk"
	 "www.kingston.gov.uk"
	 "www.dundeecity.gov.uk"	 	 
	 "www.bromley.gov.uk"
	 "www.essex.gov.uk"
	 "www.eastriding.gov.uk"
	 "www.homeinformationpacks.gov.uk"
	 "www.leics.gov.uk"
	 "www.cesg.gov.uk"
	 "www.brighton-hove.gov.uk"
	 "www.lancashire.gov.uk"	 
	 "www.eastsussex.gov.uk"
	 "www.itsafe.gov.uk"
	 "www.blackpool.gov.uk"
	 "www.innovation.gov.uk"	 	 
	 "www.sunderland.gov.uk"
	 "www.swindon.gov.uk"
	 "www.highland.gov.uk"
	 "www.ipcc.gov.uk"
	 "www.richmond.gov.uk"
	 "www.portsmouth.gov.uk"
	 "www.ealing.gov.uk"
	 "www.dstl.gov.uk"	 
	 "www.middlesbrough.gov.uk"
	 "www.staffordshire.gov.uk"
	 "www.radio.gov.uk"
	 "www.industry.visitwales.co.uk"	
	 "www.falkirk.gov.uk"
	 "www.employmenttribunals.gov.uk"
	 "www.gwynedd.gov.uk"
	 "www.londonprepared.gov.uk"
	 "www.bathnes.gov.uk"
	 "www.wirral.gov.uk"
	 "www.derbyshire.gov.uk"
	 "www.herefordshire.gov.uk"	 
	 "www.yjb.gov.uk"
	 "www.forensic.gov.uk"
	 "www.reading.gov.uk"
	 "www.faststream.gov.uk"	 	 
	 "www.ukresilience.gov.uk"
	 "www.pfgbudgetni.gov.uk"
	 "www.bseinquiry.gov.uk"
	 "www.northumberland.gov.uk"
	 "www.stoke.gov.uk"
	 "www.detini.gov.uk"
	 "www.northamptonshire.gov.uk"
	 "www.barnsley.gov.uk"	 
	 "www.somerset.gov.uk"
	 "www.number-10.gov.uk"
	 "www.tameside.gov.uk"
	 "www.bolton.gov.uk"	 	 
	 "www.nisra.gov.uk"
	 "www.dptac.gov.uk"
	 "www.derby.gov.uk"
	 "jobseekers.direct.gov.uk"
	 "www.ecgd.gov.uk"
	 "www.walsall.gov.uk"
	 "www.socitm.gov.uk"
	 "www.hounslow.gov.uk"	 
	 "www.stirling.gov.uk"
	 "www.osni.gov.uk"
	 "www.wiltshire.gov.uk"
	 "www.redbridge.gov.uk"	 	 
	 "www.blackburn.gov.uk"
	 "www.landregisteronline.gov.uk"
	 "www.windsor.gov.uk"
	 "www.merton.gov.uk"
	 "www.pkc.gov.uk"
	 "www.wrexham.gov.uk"
	 "www.sutton.gov.uk"
	 "www.northlan.gov.uk"	 
	 "www.northyorks.gov.uk"
	 "www.doeni.gov.uk"
	 "www.cumbria.gov.uk"
	 "www.groni.gov.uk"	 	 
	 "www.gateshead.gov.uk"
	 "www.rbwm.gov.uk"
	 "www.dfpni.gov.uk"
	 "www.wired-gov.net"
	 "www.ceredigion.gov.uk"
	 "www.wolverhampton.gov.uk"
	 "www.bedfordshire.gov.uk"
	 "www.dudley.gov.uk"	 
	 "www.northlincs.gov.uk"
	 "www.enfield.gov.uk"
	 "www.lacors.gov.uk"
	 "www.doncaster.gov.uk"	 	 
	 "www.cjsonline.gov.uk"
	 "www.westberks.gov.uk"
	 "www.4ps.gov.uk"
	 "www.luton.gov.uk"
	 "www.fife.gov.uk"
	 "www.rochdale.gov.uk"
	 "www.harrow.gov.uk"
	 "www.rcahms.gov.uk"	 
	 "www.goeast.gov.uk"
	 ///"www.nationalparks.gov.uk"
	 "www.flintshire.gov.uk"
	 "www.hmie.gov.uk"	 	 
	 "www.oisc.gov.uk"
	 "www.dumgal.gov.uk"
	 "www.southlanarkshire.gov.uk"
	 "www.vca.gov.uk"
	 "www.havering.gov.uk"
	 "www.hillingdon.gov.uk"
	 "www.angus.gov.uk"
	 "www.pembrokeshire.gov.uk"	 
	 "archive.cabinetoffice.gov.uk"
	 "www.solihull.gov.uk"
	 "www.cafcass.gov.uk"
	 "www.nda.gov.uk"	
	 "www.renfrewshire.gov.uk"
	 "www.scotborders.gov.uk"
	 "www.slough.gov.uk"
	 "www.telford.gov.uk"
	 "www.eastdunbarton.gov.uk"
	 "www.nhspa.gov.uk"
	 "www.magic.gov.uk"
	 "www.chester.gov.uk"
	 "www.sfo.gov.uk"
	 "www.shropshire.gov.uk"
	 "www.taxcredits.inlandrevenue.gov.uk"
	 "www.valuingpeople.gov.uk"
	 "www.nelincs.gov.uk"
	 "www.rotherham.gov.uk"
	 "www.fire.gov.uk"
	 "www.eastlothian.gov.uk"
	 "www.councillor.gov.uk"
	 "www.dwi.gov.uk"
	 "www.torbay.gov.uk"
	 "www.officefordisability.gov.uk"
	 "www.bridgend.gov.uk"
	 "www.lincoln.gov.uk"
	 "www.wigan.gov.uk"
	 "www.hartlepool.gov.uk"
	 "www.moneyclaim.gov.uk"
	 "www.warwickshire.gov.uk"
	 "www.calderdale.gov.uk"
	 "www.lowpay.gov.uk"
	 "www.sthelens.gov.uk"	 
	 "www.denbighshire.gov.uk"
	 "www.publicguardian.gov.uk"
	 "www.lancaster.gov.uk"
	 "www.sandwell.gov.uk"
	 "www.wokingham.gov.uk"
	 "www.lifeintheuktest.gov.uk"
	 "www.cheltenham.gov.uk"
	 "www.bury.gov.uk"
	 "www.conwy.gov.uk"
	 "www.gla.gov.uk"
	 "www.darlington.gov.uk"
	 "www.rail-reg.gov.uk"
	 "www.hta.gov.uk"
	 "www.warrington.gov.uk"	 
	 "www.kirklees.gov.uk"
	 "www2.cst.gov.uk"
	 "www.careers.civil-service.gov.uk"
	 "www.southglos.gov.uk"
	 "www.london-fire.gov.uk"
	 "www.oldham.gov.uk"
	 "www.lgyh.gov.uk"
	 "www.peterborough.gov.uk"
	 "www.planning-inspectorate.gov.uk"
	 "www.lgbc-scotland.gov.uk"
	 "www.cica.gov.uk"
	 "www.southeast-ra.gov.uk"
	 "www.midlothian.gov.uk"
	 "www.chichester.gov.uk"
	 "www.colchester.gov.uk"
	 "www.ukinvest.gov.uk"
	 "www.neighbourhood.statistics.gov.uk"
	 "www.valeofglamorgan.gov.uk"
	 "www.anglesey.gov.uk"
	 "www.ruralcommunities.gov.uk"
	 "www.southend.gov.uk"
	 "www.moneyscotland.gov.uk"
	 "www.caerphilly.gov.uk"
	 "www.trafford.gov.uk"
	 "www.northtyneside.gov.uk"
	 "www.millennium.gov.uk"
	 "www.dartmoor-npa.gov.uk"
	 "www.hastings.gov.uk"
	 "www.visitisleofman.com"
	 "www.eastrenfrewshire.gov.uk"
	 "www.miap.gov.uk"
	 "www.barking-dagenham.gov.uk"
	 "www.shetland.gov.uk"
	 "www.dmo.gov.uk"
	 "www.betterregulation.gov.uk"
	 "www.londoncouncils.gov.uk"
	 "www.estyn.gov.uk"
	 "www.coi.gov.uk"
	 "www.broads-authority.gov.uk"
	 "www.bracknell-forest.gov.uk"
	 "www.employmentappeals.gov.uk"
	 "www.sholland.gov.uk"
	 "ufos.nationalarchives.gov.uk"
	 "www.hsl.gov.uk"	 
	 "www.childcarecareers.gov.uk"
	 "www.poole.gov.uk"
	 "www.stockton.gov.uk"
	 "www.monmouthshire.gov.uk"
	 "www.intelligence.gov.uk"
	 "www.psc.gov.uk"
	 "www.cultureonline.gov.uk"
	 "www.ofmdfmni.gov.uk"
	 "www.healthyliving.gov.uk"
	 "www.therentservice.gov.uk"
	 "www.chas.gov.uk"
	 "www.transportscotland.gov.uk"
	 "www.knowsley.gov.uk"
	 "www.cotswold.gov.uk"
	 "www.dcalni.gov.uk/"	 
	 "www.thurrock.gov.uk"
	 "www.powys.gov.uk"
	 "www.cicregulator.gov.uk"
	 "www.forestserviceni.gov.uk"
	 "www.weymouth.gov.uk"
	 "www.sps.gov.uk"
	 "www.merthyr.gov.uk"
	 "www.hedgehogs.gov.uk"
	 "www.vmd.gov.uk"
	 "www.cleanersafergreener.gov.uk"
	 "www.courtsni.gov.uk"
	 "www.bedford.gov.uk"
	 "www.caradon.gov.uk"
	 "www.guildford.gov.uk"
	 "www.preston.gov.uk"	 
	 "www.argyll-bute.gov.uk"
	 "www.canterbury.gov.uk"
	 "www.estonia.gov.uk"
	 "www.derrycity.gov.uk"
	 "www.exmoor-nationalpark.gov.uk"
	 "www.woking.gov.uk"
	 "www.barrowbc.gov.uk"
	 "www.crimereduction.homeoffice.gov.uk"
	 "www.worthing.gov.uk"
	 "www.audit-scotland.gov.uk"
	 "www.cfit.gov.uk"
	 "www.tribunals.gov.uk"
	 "www.nihe.gov.uk"
	 "www.teignbridge.gov.uk"
	 "www.communicationswhitepaper.gov.uk"	 
	 "www.lisburncity.gov.uk"
	 "www.saa.gov.uk"
	 "www.armagh.gov.uk"
	 "www.aebc.gov.uk"
	 "www.horsham.gov.uk"
	 "www.north-ayrshire.gov.uk"
	 "www.colerainebc.gov.uk"
	 "www.college-of-arms.gov.uk"
	 "www.inspiringlearningforall.gov.uk"
	 "www.southsomerset.gov.uk"
	 "www.fermanagh.gov.uk"
	 "www.omagh.gov.uk"
	 "www.7stanes.gov.uk"
	 ///"www.vehiclelicence.gov.uk"
	 "www.broadland.gov.uk"	 
	 "www.east-ayrshire.gov.uk"
	 "www.south-ayrshire.gov.uk"
	 "www.chelmsford.gov.uk"
	 "www.hmgcc.gov.uk"
	 "www.hambleton.gov.uk"
	 "greenbook.treasury.gov.uk"
	 "www.easthants.gov.uk"
	 "www.newforest.gov.uk"
	 "www.northampton.gov.uk"
	 "publications.teachernet.gov.uk"
	 "www.kennet.gov.uk"
	 "www.lewes.gov.uk"
	 "www.trafficpenaltytribunal.gov.uk"
	 "www.tunbridgewells.gov.uk"
	 "www.burnley.gov.uk"	 
	 "www.breckland.gov.uk"
	 "www.newtownabbey.gov.uk"
	 "www.corby.gov.uk"
	 "www.ros.gov.uk"
	 "www.n-somerset.gov.uk"
	 "www.official-documents.gov.uk"
	 "www.scambs.gov.uk"
	 "www.commonsleader.gov.uk"
	 "www.downdc.gov.uk"
	 "www.northwilts.gov.uk"
	 "www.neath-porttalbot.gov.uk"
	 "www.winchester.gov.uk"
	 "www.stroud.gov.uk"
	 "www.openscotland.gov.uk"
	 "www.tass.gov.uk"
	 "www.arun.gov.uk"
	 "www.waveney.gov.uk"
	 "www.warwickdc.gov.uk"
	 "www.forestresearch.gov.uk"
	 "www.ocpa.gov.uk"	 
	 "www.scottishchildcare.gov.uk"
	 "www.tauntondeane.gov.uk"
	 "www.sedgemoor.gov.uk"
	 "www.harlow.gov.uk"
	 "www.middevon.gov.uk"
	 "www.sacn.gov.uk"
	 "www.scrol.gov.uk"
	 "www.sasa.gov.uk/"
	 "www.scotlandoffice.gov.uk"	 
	 "www.copfs.gov.uk"
	 "www.antrim.gov.uk"
	 "www.ncdc.gov.uk"
	 "www.emra.gov.uk"
	 "www.craigavon.gov.uk"
	 "www.ballymena.gov.uk"
	 "www.eastbourne.gov.uk"
	 "www.sevenoaks.gov.uk"
	 ///"www.parsol.gov.uk"	 
	 "www.braintree.gov.uk"
	 "www.macclesfield.gov.uk"
	 "www.isb.gov.uk"
	 "www.stats4schools.gov.uk"
	 "www.broxbourne.gov.uk"
	 ///"www.motinfo.gov.uk"
	 "www.gravesham.gov.uk"
	 "www.dartford.gov.uk"
	 "www.improvementnetwork.gov.uk"	 
	 "www.selby.gov.uk"
	 "www.ipswich.gov.uk"
	 "www.stevenage.gov.uk"
	 "www.valeroyal.gov.uk"
	 "www.sns.gov.uk"
	 "www.dover.gov.uk"
	 "www.rpani.gov.uk"
	 "www.edubase.gov.uk"
	 "www.yourlondon.gov.uk"	 
	 "www.scarborough.gov.uk"
	 "www.stratford.gov.uk"
	 "www.lichfielddc.gov.uk"
	 "www.ryedale.gov.uk"
	 "www.nwml.gov.uk"
	 "www.fenland.gov.uk"
	 "www.blythvalley.gov.uk"
	 "www.gosport.gov.uk"
	 "www.aylesburyvaledc.gov.uk"	 
	 "www.iggi.gov.uk"
	 "www.public-standards.gov.uk"
	 "www.gac.culture.gov.uk"
	 "www.ccrc.gov.uk"
	 "www.charnwood.gov.uk"
	 "www.kerrier.gov.uk"	 
	 "www.assetsrecovery.gov.uk"
	 "www.rugby.gov.uk"
	 "www.purbeck.gov.uk"	 
	 "www.snh.gov.uk"
	 "www.northdown.gov.uk"
	 "www.wearvalley.gov.uk"	 
	 "www.basildon.gov.uk"
	 "www.fylde.gov.uk"
	 "www.shrewsbury.gov.uk"	 
	 "www.hantsfire.gov.uk"
	 "www.procurementsolutions.gov.uk"
	 "www.swale.gov.uk"	 
	 "www.westoxon.gov.uk"
	 "www.whitehorsedc.gov.uk"
	 "www.iwight.gov.uk"	 
	 "www.thanet.gov.uk"
	 "www.adjudicatorsoffice.gov.uk"
	 "www.alnwick.gov.uk"	 
	 "www.eera.gov.uk"
	 "www.dungannon.gov.uk"
	 "www.ait.gov.uk"	 
	 "www.uttlesford.gov.uk"
	 "www.sentencing-guidelines.gov.uk"
	 "www.cookstown.gov.uk"
	 "fp6uk.ost.gov.uk"
	 "www.larne.gov.uk"
	 "www.eastcambs.gov.uk"	 
	 "www.southlakeland.gov.uk"
	 "www.biodiversityscotland.gov.uk"
	 "www.south-hams-dc.gov.uk"	 
	 "www.scilly.gov.uk"
	 "www.milton-keynes.gov.uk"
	 "www.scotlawcom.gov.uk"	 
	 "www.ynysmon.gov.uk"
	 "www.boston.gov.uk"
	 "www.cpdni.gov.uk"	 
	 "www.limavady.gov.uk"
	 "www.epcollege.gov.uk"
	 "www.niprisonservice.gov.uk"	 
	 "www.standardsboard.gov.uk"
	 "www.cgma.gov.uk"
	 "www.foodvision.gov.uk"	 
	 "www.broxtowe.gov.uk"
	 "www.bolsover.gov.uk"
	 "www.sedgefield.gov.uk"	 
	 "www.congleton.gov.uk"
	 "www.ambervalley.gov.uk"
	 "www.tamworth.gov.uk"	 	 
	 "www.appeals-service.gov.uk"
	 "www.nuneatonandbedworth.gov.uk"
	 "www.ards-council.gov.uk"
	 "www.threerivers.gov.uk"
	 "www.britishembassy.gov.uk"
	 "www.epcollege.gov.uk"	 
	 "www.runnymede.gov.uk"
	 "www.niprisonservice.gov.uk"
	 "www.southwest-ra.gov.uk"	 
	 "www.standardsboard.gov.uk"
	 "www.cgma.gov.uk"
	 "www.foodvision.gov.uk"	 
	 "www.bolsover.gov.uk"
	 "www.sedgefield.gov.uk"
	 "www.congleton.gov.uk"	 
	 "www.manchesterfire.gov.uk"
	 "www.tamworth.gov.uk"
	 "www.ambervalley.gov.uk"	 
	 "ofreg.nics.gov.uk"
	 "www.appeals-service.gov.uk"
	 "www.nuneatonandbedworth.gov.uk"	 
	 "www.ards-council.gov.uk"
	 "www.magherafelt.gov.uk"
	 "www.threerivers.gov.uk"	 
	 "www.myguide.gov.uk"
	 "www.britishembassy.gov.uk"
	 "ema.direct.gov.uk"	 	 
	 "www.moneymadeclear.fsa.gov.uk"
	 "www.standards.dfes.gov.uk"
	 "tre.ngfl.gov.uk"
	 "www.museums.norfolk.gov.uk"
	 "www.visa4uk.fco.gov.uk"
	 "collage.cityoflondon.gov.uk"	 
	 "easytide.ukho.gov.uk"
	 "thegfp.treasury.gov.uk"
	 "www.ygt.dcsf.gov.uk"	 
	 "www.cst.gov.uk"
	 "darwin.defra.gov.uk"
	 "wsgfl.westsussex.gov.uk"	 
	 "online.ogcbuyingsolutions.gov.uk"
	 "inourhands.lsc.gov.uk"
	 "ngfl.northumberland.gov.uk"	 
	 "www.schools.audit-commission.gov.uk"
	 "inclusion.ngfl.gov.uk"
	 "www.sustainable.scotland.gov.uk"	 
	 "www.cadw.wales.gov.uk"
	 "kids.direct.gov.uk"
	 "www.aaib.dft.gov.uk"	 
	 "www.beacons.idea.gov.uk"
	 "www.1901census.nationalarchives.gov.uk"
	 "statistics.defra.gov.uk"	 
	 "www.countryside.wales.gov.uk"
	 "ukinkenya.fco.gov.uk"
	 "actonco2.direct.gov.uk"	
	 "www.cymal.wales.gov.uk"
	 "yp.direct.gov.uk"
	 "www.housing.wales.gov.uk"
	 "www.hmso.gov.uk"
	 "police.homeoffice.gov.uk"
	 "www.careandsupport.direct.gov.uk"
	 "www.advisorybodies.doh.gov.uk"
	 "www.wefo.wales.gov.uk"
	 "www.probation.homeoffice.gov.uk"
	 "unimoney.direct.gov.uk"
	 "www.word.wales.gov.uk"
	 "www.ltg.ca.gov"
	 "nuclearpower2007.direct.gov.uk"
	 "www.hpw.wales.gov.uk"
	 "bluebadge.direct.gov.uk"	 
	 "interactive.cabinetoffice.gov.uk"
	 "wales.gov.uk"
	 "www.childrenfirst.wales.gov.uk"
	 "www.mi5.gov.uk"
	 
	 ////2008.07.25 pt.3
	 "www.gov.my"
	 "www.australia.gov.au"
	 "www.gov.za"
	 "www.gov.sg"
	 "www.cia.gov"
	 "www.grants.gov"
	 "www.ca.gov"
	 "www.gov.ph"
	 "www.nasa.gov"
	 "www.irlgov.ie"
	 "www.gov.mu"
	 "www.fedworld.gov"
	 "www.recreation.gov"
	 "www.ed.gov"
	 "www.healthfinder.gov"
	 "www.gov.au"
	 "www.gao.gov"
	 "india.gov.in"
	 "www.fbi.gov"
	 "www.hud.gov"
	 "www.gov.nf.ca"
	 "www.gov.il"
	 "www.epa.gov"
	 "www.export.gov"
	 "www.fda.gov"
	 "www.gov.bc.ca"	 
	 "www.usability.gov"
	 "www.qld.gov.au"
	 "www.cancer.gov"
	 "www.gov.on.ca"
	 "thomas.loc.gov"
	 "www.gov.hk"
	 "www.info.gov.za"
	 "www.sec.gov"
	 "www.business.gov"
	 "www.house.gov"
	 "www.kids.gov"
	 "www.ready.gov"
	 "www.gov.si"	 
	 "www.maharashtra.gov.in"
	 "clinicaltrials.gov"
	 "www.pakistan.gov.pk"
	 "www.senate.gov"
	 "www.science.gov"
	 "www.mypyramid.gov"
	 "www.nutrition.gov"
	 "www.medicare.gov"
	 "www.governmentofbelize.gov.bz"
	 "www.disabilityinfo.gov"
	 "www.pandemicflu.gov"
	 "www.vic.gov.au"
	 "www.gov.sk.ca"
	 "www.cdc.gov"
	 "www.ssa.gov"
	 "www.students.gov"
	 "www.ustr.gov"
	 "www.regulations.gov"
	 "www.consumer.gov"
	 "www.gov.uz"
	 "jobsearch.gov.au"
	 "www.oregon.gov"
	 "www.census.gov"
	 "www.in.gov"
	 "www.imi.gov.my"
	 "www.gpo.gov"
	 "www.nsw.gov.au"
	 "www.tourism.gov.my"	
	 "www.studentjobs.gov"
	 "www.govbenefits.gov"
	 "www.fedbizopps.gov"
	 "www.act.gov.au"
	 "www.fueleconomy.gov"
	 "www.usajobs.gov"	
	 "www.energystar.gov"
	 "www.ftc.gov"
	 "www.sba.gov"	
	 "travel.state.gov"
	 "www.fema.gov"
	 "www.labour.gov.za"
	 "www.recalls.gov"
	 ///"www.uspto.gov"
	 "www.gov.sz"
	 "www.gov.ns.ca"
	 "csrc.nist.gov"
	 "www.mymoney.gov"	
	 "www.foodsafety.gov"
	 "english.gov.cn"
	 "www.fcc.gov"
	 "www.nlm.nih.gov"	
	 "www.osha.gov"
	 "www.nps.gov"
	 "www.gov.bw"
	 "www.smokefree.gov"	
	 "www.pak.gov.pk"
	 "www.womenshealth.gov"
	 "www.va.gov"
	 ///"www.copyright.gov"	
	 "www.nyc.gov"
	 "www.buenosaires.gov.ar"
	 "www.dol.gov"
	 "www.doe.gov"	
	 "www.nla.gov.au"
	 "www.nt.gov.au"
	 "www.gpoaccess.gov"
	 "childstats.gov"	
	 "www.statssa.gov.za"
	 "www.mass.gov"
	 "www.bangladesh.gov.bd"
	 "www.usda.gov"	
	 "www.noaa.gov"
	 "www.tsa.gov"
	 "www.nsf.gov"
	 "www.usdoj.gov"	
	 "www.customs.gov"
	 "www.gov.mt"
	 "www.cpsc.gov"
	 "www.usgs.gov"	
	 "www.bls.gov"
	 "www.archives.gov"
	 "www.healthierus.gov"
	 "www.fedstats.gov"	
	 "www.donotcall.gov"
	 "www.sweden.gov.se"
	 "www.gov.rw"
	 "www.michigan.gov"	
	 "www.hhs.gov"
	 "www.us-cert.gov"
	 "www.weather.gov"
	 "www.faa.gov"	
	 "www.gsa.gov"
	 "www.uscis.gov"
	 "www.floodsmart.gov"
	 "www.section508.gov"	
	 "www.geodata.gov"
	 "www.dhs.gov"
	 "www.pmis.gov.mn"
	 "www.usaid.gov"	
	 "www.safercar.gov"
	 "www.doh.gov.za"
	 "www.eeoc.gov"
	 "www.governor.wa.gov"	
	 "www.america.gov"
	 "www.federalreserve.gov"
	 "www.nationalatlas.gov"
	 "www.health.gov"
	 "www.fiji.gov.fj"
	 "www.unitedstatesvisas.gov"
	 "www.girlshealth.gov"
	 "www.aoa.gov"
	 "www.commerce.gov"
	 "www.cybercrime.gov"
	 ///"www.dot.gov"
	 "www.georgia.gov"
	 "www.ustreas.gov"
	 "www.dc.gov"
	 "www.maryland.gov"
	 "onguardonline.gov"
	 "www.usaspending.gov"
	 "www.afterschool.gov"
	 "www.peacecorps.gov"
	 "www.ahrq.gov"
	 "www.ecitizen.gov.sg"
	 "www.govexec.com"
	 "www.gov.tt"
	 "www.ada.gov"
	 "kentucky.gov"
	 "www.immi.gov.au"
	 "www.samhsa.gov"
	 "www.ohio.gov"
	 "catalog.loc.gov"
	 "www.dtv.gov"
	 "www.sss.gov"
	 "www.time.gov"
	 "www.bea.gov"
	 "www.virginia.gov"
	 "www.workplace.gov.au"
	 "www.ic3.gov"
	 "www.colorado.gov"
	 "www.fdic.gov"
	 "nihseniorhealth.gov"
	 "www.ct.gov"
	 "www.alabama.gov"
	 "www.earthday.gov"
	 "maine.gov"
	 "www.wisconsin.gov"
	 "www.organdonor.gov"
	 "www.info.gov"
	 "www.gio.gov.tw"
	 "www.bt.cdc.gov"
	 "www.nga.gov"
	 "www.treasurydirect.gov"
	 "www.ccr.gov"
	 "www.gpg.gov.za"
	 "bensguide.gpo.gov"
	 "www.ita.doc.gov"
	 "brunei.gov.bn"
	 "www.supremecourtus.gov"
	 "www.dtv2009.gov"
	 "www.serbia.sr.gov.yu"
	 "www.genome.gov"
	 "www.guideline.gov"
	 "www.state.gov"
	 "www.hawaii.gov"
	 "www.phila.gov"
	 "www.fec.gov"
	 "www.sa.gov.au"
	 "www.wa.gov.au"
	 "www.invasivespeciesinfo.gov"
	 "www.utah.gov"
	 "www.tas.gov.au"
	 "www.fws.gov"
	 "www.uscourts.gov"
	 "www.opm.gov"
	 "www.kansas.gov"
	 "www.illinois.gov"
	 "agingstats.gov"
	 "www.aids.gov"
	 "www.eldercare.gov"
	 "www.business.gov.au"
	 "www.homesales.gov"
	 "vermont.gov"
	 "www.disasterhelp.gov"
	 "www.economicindicators.gov"
	 "www.nsa.gov"
	 "www.louisiana.gov"
	 "www.usafreedomcorps.gov"
	 "www.nrel.gov"
	 "www.firesafety.gov"
	 "www.womenbiz.gov"
	 "www.sc.gov"
	 "www.ghana.gov.gh"
	 "www.nrc.gov"
	 "www.fitness.gov"
	 "www.govloans.gov"
	 "delaware.gov"
	 "www.healthypeople.gov"
	 "www.nih.gov"
	 "www.ri.gov"
	 "usasearch.gov"
	 "www.mida.gov.my"
	 "www.plainlanguage.gov"
	 "www.globalhealth.gov"
	 "www.bart.gov"
	 "www.fafsa.ed.gov"
	 "www.drugabuse.gov"
	 "www.globe.gov"
	 "www.fedforms.gov"
	 "www.smallstep.gov"
	 "www.doi.gov"
	 "www.nano.gov"
	 "www.nh.gov"
	 "www.ice.gov"
	 "www.lesotho.gov.ls"
	 "www.environment.gov.za"
	 "mt.gov"
	 "www.eere.energy.gov"
	 "www.nebraska.gov"
	 "www.airnow.gov"
	 "www.doleta.gov"
	 "www.ato.gov.au"
	 "www.udall.gov"
	 "mymedicare.gov"
	 "mpa.gov"
	 "www.citizencorps.gov"
	 "www.mo.gov"
	 "www.ntis.gov"
	 "www.bahamas.gov.bs"
	 "www.surgeongeneral.gov"
	 "www.whitehousedrugpolicy.gov"
	 "www.methresources.gov"
	 "www.sandia.gov"
	 "www.usoge.gov"
	 "www.bom.gov.au"
	 "www.ihs.gov"
	 "www.ntsb.gov"
	 "www.lanl.gov"
	 "www.5aday.gov"
	 "www.ausaid.gov.au"
	 "www.truman.gov"
	 "www.sgdi.gov.sg"
	 "www.agoa.gov"
	 "www.careervoyages.gov"
	 "www.panynj.gov"
	 "www.volunteer.gov"
	 "www.lbl.gov"
	 "www.reginfo.gov"
	 "www.gov.ky"
	 "www.malawi.gov.mw"
	 "www.llnl.gov"
	 "www.consumeraction.gov"
	 "www.nea.gov"
	 "www.seattle.gov"
	 "www.cns.gov"
	 "www.access-board.gov"
	 "www.bam.gov"
	 "www.ornl.gov"
	 "www.gsaadvantage.gov"
	 "www.exim.gov"
	 "english.www.gov.tw"
	 "www.gta.gov.zw"
	 "www.usitc.gov"
	 "www.environment.gov.au"
	 "www.cftc.gov"
	 "www.nigeria.gov.ng"
	 "www.gov.nt.ca"
	 "www.az.gov"
	 "www.pay.gov"
	 "www.golearn.gov"
	 "www.dfat.gov.au"
	 "www.nist.gov"
	 "www.abs.gov.au"
	 "www.anl.gov"
	 "www.ncua.gov"
	 "www.hrsa.gov"
	 "www.results.gov"
	 "www.stlucia.gov.lc"
	 "www.dest.gov.au"
	 "www.omhrc.gov"
	 "www.usmint.gov"
	 "www.mfa.gov.il"
	 "www.health.gov.au"
	 "www.wv.gov"
	 "www.eia.doe.gov"
	 "www.blm.gov"
	 "www.guidelines.gov"
	 "www.cityofboston.gov"
	 "www.cbo.gov"
	 "www.bts.gov"
	 "www.stopalcoholabuse.gov"
	 "www.mbda.gov"
	 "www.nsopr.gov"
	 "globalchange.gov"
	 "www.childcare.gov"
	 "www.stat-usa.gov"
	 "www.ncd.gov"
	 "www.sandiego.gov"
	 "www.nd.gov"
	 "www.moe.gov.sg"
	 "www.bioethics.gov"
	 "www.gold.gov.au"
	 "www.centrelink.gov.au"
	 "www.fnal.gov"
	 "www.austrade.gov.au"
	 "www.poland.gov.pl"
	 "www.nlrb.gov"
	 "www.bop.gov"
	 "www.infrastructure.gov.au"
	 "www.ferc.gov"
	 "www.buyusa.gov"
	 "www.americorps.gov"
	 "www.neh.gov"
	 "www.nifl.gov"
	 "www.fvap.gov"
	 "www.matrade.gov.my"
	 "www.pbgc.gov"
	 "www.visitnh.gov"
	 "www.fincen.gov"
	 "www.ourdocuments.gov"
	 "americansamoa.gov"
	 "www.4parents.gov"
	 "www.childwelfare.gov"
	 "www.energysavers.gov"
	 "www.mississippi.gov"
	 "www.education.gov.au"
	 "www.occ.treas.gov"
	 "www.grnnet.gov.na"
	 "www.fedcenter.gov"
	 "www.privacy.gov.au"
	 "www.fgdc.gov"
	 "www.opic.gov"
	 "www.lep.gov"
	 "wyoming.gov"
	 "www.telework.gov"
	 "www.smartraveller.gov.au"
	 "www.montgomerycountymd.gov"
	 "uscode.house.gov"
	 "www.ag.gov.au"
	 "www.idaho.gov"
	 "www.macautourism.gov.mo"
	 "www.houstontx.gov"
	 "www.nv.gov"
	 "www.usbr.gov"
	 "www.epls.gov"
	 "www.msha.gov"
	 "www.ica.gov.sg"
	 "www.treasury.gov.au"
	 "www.defence.gov.au"
	 "www.idtheft.gov"
	 "www.customs.gov.au"
	 "www.fruitsandveggiesmatter.gov"
	 "www.ipaustralia.gov.au"
	 "www.aph.gov.au"
	 "www.energycodes.gov"
	 "www.pnl.gov"
	 "www.flsenate.gov"
	 "www.collegedrinkingprevention.gov"
	 "www.indianrail.gov.in"
	 "www.climatescience.gov"
	 "www.insurekidsnow.gov"
	 "www.facsia.gov.au"
	 "www.tsp.gov"
	 "www.vanuatugovernment.gov.vu"
	 "www.dewr.gov.au"
	 "www.bnl.gov"
	 "www.loc.gov"
	 "www.nhtsa.dot.gov"
	 "www.jis.gov.jm"
	 "www.greenhouse.gov.au"
	 "www.aoc.gov"
	 "www.vetbiz.gov"
	 "www.tva.gov"
	 "www.nifc.gov"
	 "www.osti.gov"
	 "www.ok.gov"
	 "nationalmap.gov"
	 "www.fbijobs.gov"
	 "www.mypyramidtracker.gov"
	 "www.finance.gov.au"
	 "www.cyprus.gov.cy"
	 "www.ilga.gov"
	 "www.atf.gov"
	 "www.mfa.gov.tr"
	 "www.acqnet.gov"
	 "www.kingcounty.gov"
	 "www.newmexico.gov"
	 ///"gsaauctions.gov"
	 "www.imls.gov"
	 "www.medicareaustralia.gov.au"
	 "www.inl.gov"
	 "transit.metrokc.gov"
	 "www.ginniemae.gov"
	 "www.aqmd.gov"
	 "access.wa.gov"
	 "www.ema.gov.au"
	 "www.stopfakes.gov"
	 "www.gop.gov"
	 "www.lsc.gov"
	 "www.cio.gov"
	 "www.finance.gov.ie"
	 "www.fjc.gov"
	 "locatorplus.gov"
	 "www.ussc.gov"
	 "www.iowa.gov"
	 "www.digitalpreservation.gov"
	 "www.mms.gov"
	 "postcalc.usps.gov"
	 "www.hydrogen.gov"
	 "www.abmc.gov"
	 "www.seniors.gov.au"
	 "www.nhc.noaa.gov"
	 "www.access.gpo.gov"
	 "www.attorneygeneral.gov"
	 "www.timor-leste.gov.tl"
	 "www.ebeijing.gov.cn"
	 "www.accc.gov.au"
	 "www.medicalreservecorps.gov"
	 "www.chemsafety.gov"
	 "www.americaslibrary.gov"
	 "www.hirevetsfirst.gov"
	 "www.paiz.gov.pl"
	 "www.pueblo.gsa.gov"
	 "www.affa.gov.au"
	 "www.cms.hhs.gov"
	 "www.tradeagreements.gov"
	 "www.pmo.gov.to"
	 "ori.dhhs.gov"
	 "www.ustda.gov"
	 "www.eda.gov"
	 "www.ga.gov.au"
	 "www.ab.gov.ag"
	 "www.ffiec.gov"
	 "www.ostp.gov"
	 "www.maricopa.gov"
	 "www.sis.gov.eg"
	 "www.usgcrp.gov"
	 "www.eftps.gov"
	 "aviationweather.gov"
	 "www.gov.vc"
	 "www.arnet.gov"
	 "www.usccr.gov"
	 "www.thedti.gov.za"
	 "www.unicor.gov"
	 "www.mspb.gov"
	 "www.estuaries.gov"
	 "earthquake.usgs.gov"
	 "www.eac.gov"
	 "www.hreoc.gov.au"
	 "www.rba.gov.au"
	 "www.usmarshals.gov"
	 "www.biometrics.gov"
	 "www.sanjoseca.gov"
	 "www.mca.gov"
	 "www.osmre.gov"
	 "www.usbg.gov"
	 "www.drought.gov"
	 "www.awm.gov.au"
	 "www.gibill.va.gov"
	 "factfinder.census.gov"
	 "visibleearth.nasa.gov"
	 "www.leginfo.ca.gov"
	 "www.nal.usda.gov"
	 "grc.ntis.gov"
	 "toxnet.nlm.nih.gov"
	 "genomics.energy.gov"
	 "www.cfsan.fda.gov"
	 "studentaid.ed.gov"
	 "www.ntia.doc.gov"
	 "www.uspto.gov"
	 "www.ojp.usdoj.gov"
	 "hes.lbl.gov"
	 "www.usfa.dhs.gov"
	 "edsitement.neh.gov"
	 "obama.senate.gov"
	 "www.publicdebt.treas.gov"
	 "www.parkweb.vic.gov.au"
	 "budget.australia.gov.au"
	 "hawaii.gov"
	 "www.tenders.tas.gov.au"
	 "ncadi.samhsa.gov"
	 "jobsearch.usajobs.opm.gov"
	 "teens.drugabuse.gov"
	 "www.qgm.qld.gov.au"
	 "www.dlg.nsw.gov.au"
	 "www.jobs.wa.gov.au"
	 "www.eta.immi.gov.au"
	 "dataweb.usitc.gov"
	 "mass.gov"
	 "oversight.house.gov"
	 "www.jpl.nasa.gov"
	 "www.aphis.usda.gov"
	 "www.parks.ca.gov"
	 "bookstore.gpo.gov"
	 "www.ndep.nih.gov"
	 "water.usgs.gov"
	 "www.fhwa.dot.gov"
	 "nvd.nist.gov"
	 "pin.ed.gov"
	 "blog.usa.gov"
	 "www.oig.hhs.gov"
	 "www.ocrwm.doe.gov"
	 "www07.grants.gov"
	 "www.ncdc.noaa.gov"
	 "supcourt.ntis.gov"
	 "www.cr.nps.gov"
	 "www.cbp.gov"
	 "jobsearch.studentjobs.gov"
	 "prsinfo.clinicaltrials.gov"
	 "training.fema.gov"
	 "pro-net.sba.gov"
	 "findtreatment.samhsa.gov"
	 "seer.cancer.gov"
	 "jobcorps.dol.gov"
	 "www.pmf.opm.gov"
	 "www.treas.gov"
	 "www.bis.doc.gov"
	 "www.doh.wa.gov"
	 "www.cem.va.gov"
	 "www.cityofsydney.nsw.gov.au"
	 "www.thegov.com.au"
	 "memory.loc.gov"
	 "earthobservatory.nasa.gov"
	 "plants.usda.gov"
	 "gov.ca.gov"
	 "www.educationusa.state.gov"
	 "www.atsdr.cdc.gov"
	 "volcanoes.usgs.gov"
	 "quickfacts.census.gov"
	 "www.acf.hhs.gov"
	 "webbook.nist.gov"
	 "clinton.senate.gov"
	 "www.sec.noaa.gov"
	 "www.eric.ed.gov"
	 "www.er.doe.gov"
	 "www.atf.treas.gov"
	 "www.directory.nsw.gov.au"
	 "science.nasa.gov"
	 "www.fsis.usda.gov"
	 "www.nypost.com"
	 "www.edd.ca.gov"
	 "www.human.gov.az"
	 "edc.usgs.gov"
	 "nccam.nih.gov"
	 "www.fta.dot.gov"
	 "wonder.cdc.gov"
	 "clerk.house.gov"
	 "www.photolib.noaa.gov"
	 "feinstein.senate.gov"
	 "www.deadiversion.usdoj.gov"
	 "trec.nist.gov"
	 "www.ots.treas.gov"
	 "spaceflight.nasa.gov"
	 "www.rurdev.usda.gov"
	 "seamless.usgs.gov"
	 "evisaforms.state.gov"
	 "www.ftb.ca.gov"
	 "authorities.loc.gov"
	 "dms.dot.gov"
	 "www.ngdc.noaa.gov"
	 "www.pubmedcentral.nih.gov"
	 "nces.ed.gov"
	 "www.fas.usda.gov"
	 "worldwind.arc.nasa.gov"
	 "www.sos.ca.gov"
	 "education.usgs.gov"
	 "exchanges.state.gov"
	 "www.fmcsa.dot.gov"
	 "www.ncbi.nlm.nih.gov"
	 "free.ed.gov"
	 "fnic.nal.usda.gov"
	 "sohowww.nascom.nasa.gov"
	 "www.energy.ca.gov"
	 "quake.usgs.gov"
	 "mepi.state.gov"
	 "www.nimh.nih.gov"
	 "hsgac.senate.gov"
	 "www.nrcs.usda.gov"
	 "www.nslds.ed.gov"
	 "education.nasa.gov"
	 "www.cde.ca.gov"
	 "neic.usgs.gov"
	 "careers.state.gov"
	 "www.nhlbi.nih.gov"
	 "www.spc.noaa.gov"
	 "www.fns.usda.gov"
	 "fsa.ed.gov"
	 "nasascience.nasa.gov"
	 "www.dmv.ca.gov"
	 "geonames.usgs.gov"
	 "www.nia.nih.gov"
	 "www.ars.usda.gov"
	 "www.loanconsolidation.ed.gov"
	 "kids.msfc.nasa.gov"
	 "www.csac.ca.gov"
	 "toxtown.nlm.nih.gov"
	 "www.cnpp.usda.gov"
	 "space.jpl.nasa.gov"
	 "www.meganslaw.ca.gov"
	 "www.ombudsman.ed.gov"
	 "www.aidsinfo.nih.gov"
	 "www.ers.usda.gov"
	 "www.insurance.ca.gov"
	 "www.dlenote.ed.gov"
	 "health.nih.gov"
	 "www.nass.usda.gov"
	 "www.arb.ca.gov"
	 "quest.nasa.gov"
	 "www.dl.ed.gov"
	 "www.niaaa.nih.gov"
	 "www.fsa.usda.gov"
	 "www.dot.ca.gov"
	 "mars.jpl.nasa.gov"
	 "www3.niaid.nih.gov"
	 "www.oes.ca.gov"
	 "photojournal.jpl.nasa.gov"
	 "soils.usda.gov"
	 "www.niddk.nih.gov"
	 "www.dhs.ca.gov"
	 "gcmd.nasa.gov"
	 "www.ams.usda.gov"
	 "www.ninds.nih.gov"
	 "www.spb.ca.gov"
	 "aqua.nasa.gov"
	 "www.nei.nih.gov"
	 "www.boe.ca.gov"
	 "hubble.nasa.gov"
	 "www.nichd.nih.gov"
	 "www.dir.ca.gov"
	 ///"stemcells.nih.gov"
	 "www.cpuc.ca.gov"
	 "www.nidcd.nih.gov"
	 "www.ciwmb.ca.gov"
	 "publicaccess.nih.gov"
	 "www.fire.ca.gov"
	 "consensus.nih.gov"
	 "www.driveclean.ca.gov"
	 "videocast.nih.gov"
	 "ods.od.nih.gov"
	 "www.niehs.nih.gov"
	 "grants.nih.gov"
	 "www.nimh.nih.gov"
	 "www.nhlbi.nih.gov"
	 "www.niaid.nih.gov"

	/////////Saturday Aug 2nd 2008 + sky.com correction
	 "drugs.greenparty.org.uk"
	 "www.nhs.uk"
	 "www.mailonsunday.co.uk"
	 "www.police.uk"
	 "www.tvlicensing.co.uk"
	 "sky.com"
	 
	 /////Saturday Aug 2nd 2008 - part 2
	 "perks.sky.com"
	 "style.sky.com"
	 "communaltv.sky.com"
	 "gladiators.sky.com"
	 "yourphotos.sky.com"
	 "video.news.sky.com"
	 "nightskylive.net"
	 "packages.sky.com"
	 "money.sky.com"
	 "apod.nasa.gov"
	 "skyplayer.sky.com"
	 "skyview.gsfc.nasa.gov"
	 "free-animation-sky.qarchive.org"
	 "www.qarchive.org"
	 "www.download3k.com"
	 "nightsky.jpl.nasa.gov"
	 "screensaver-rippling-sky.qarchive.org"
	 "heasarc.gsfc.nasa.gov"
	 "games.sky.com"
	 "friend.sky.com"
	 "skyscape.sky.com"
	 "oscars.sky.com"
	 "mobile.sky.com"
	 "www.skycard.com"
	 "www.skymedia.co.uk"
	 "www.skynewspanel.com"
	 "www.skyoneonline.co.uk"
	 "mysky.sky.com"
	 "www.sharewareplaza.com"
	 "ipod-video-converter.sharewareplaza.com"
	 "www.fightglobalwarming.com"
	 
	 ///Google Adsense: File Sharing Scam Sites List. Last update: January 4th 2006
	 "247downloads.com"
"bearsharehq.com"
"freemusicnow.cc"
"myfreetvshow.net"
"getmusicfree-jump.com"
"memarkmp3.com"
"moviedownloadpro.com"
"freedownloadaccess.com"
"multimedia4me.com"
"ad2006.com"
"wherecanidownload.com"
"mp3musicaccess.com"
"allmediadownload.com"
"mp3.101soho.com"
"freemovienow.com"
"cinemadownload.com"
"moviedownloadworld.com"
"123moviedownload.com"
"top-download-sites.com"
"freemovieslover.com"
"lightspeedmovies.com"
"movieadvanced.com"
"moviedownloadnow.com"
"moviedownloadpro.com"
"moviesdirectpro.com"
"moviesharehq.com"
"myfreetvshow.com"
"allcoolmusic.com"
"allemule.com"
"allshareaza.com"
"archivoscompartidos.com"
"best-download-sites.com"
"betterbusinessratings.org"
"betterbusinessreviews.org"
"betterbusinessreviewsonline.org"
"bittorrentreviews.com"
"bittorrents.com"
"bittorrentsoftwaredownload.com"
"bt-now.com"
"clickbank.net"
"completemovies.com"
"consumerincentivepromotions.com"
"copy-dvdz.com"
"dldemon.com"
"dmipartners.com"
"download-it-free.com"
"download-legal.com"
"downloadlegal.com"
"downloadmusicfast.com"
"downloadshield.com"
"e-kazaam.com"
"e-softwaresource.com"
"emule-downloading.com"
"emule-muzic.com"
"emusic.com"
"etomihq.com"
"ez-tracks.com"
"ezmp3s.com"
"file-sharing-music-downloads.com"
"filesharesoftware.com"
"filesharingcenter.com"
"free-music.com"
"freedownloadnetwork.com"
"freemovienow.com"
"freemp3access.com"
"freemusicreviews.com"
"freesoftwareoutlet.com"
"getanysong.com"
"getsongsnow.com"
"go.trkrlnx.com"
"grokster-download.com"
"grokster.ws"
"imoviesearch.com"
"imusicsearch.com"
"incentiverewardcenter.com"
"internetdownloads.org"
"ipesquire.org/directory/file-sharing.htm"
"k-lite-legal.com"
"k-litetk.com"
"kazaa-lite-express.com"
"kazaa.com"
"kazaa.net.cn"
"kazaamate.com"
"kazza-lite.net"
"kincan.com"
"legalmusicaccess.com"
"lightspeedmovies.com"
"limewire2005.com"
"limewirehq.com"
"mediataskmaster.com"
"memcco.com"
"mirra.com"
"morpheusultra.com"
"mp3advance.com"
"mp3-download-reviews.com"
"mp3-downloadhq.com"
"mp3-downloading.net"
"mp3-downloads.j-vmarketing.com"
"mp3-review.net"
"mp3downloadhq.com"
"mp3downloading.com"
"mp3downloadreview.com"
"mp3kassa.com"
"mp3motherload.com"
"mp3musiclive.com"
"mp3review.biz"
"mp3review.visualsavings.com"
"mp3reviewsource.com"
"mp3sharing.us"
"mp3sunlimited.net"
"mpfree.com"
"moviedownloadreview.biz"
"music-movie-downloads.com"
"music-sharing.net"
"my-free-music.com"
"myfilesharing.com"
"mymusicinc.com"
"namimedia.com"
"netmp3downloads.com"
"netmusicmania.com"
"oldfatman.net"
"pricetool.com"
"qckjmp.com"
"rebrandsoftware.com"
"revolutionarystuff.com"
"sarisaristor.com"
"sharedmovies.com"
"sharemusic.org"
"sharing-file.com"
"sneakyprograms.com"
"soft4kids.com"
"soulseekhq.com"
"spyzooka.com"
"stompsoft.com"
"store.yahoo.com/onecentcomputer"
"stroompje.nl"
"suprnova.com"
"tinyurl.com/cmj4t"
"tkqlhce.com"
"top-rated-mp3-sites.com"
"torrentandp2p.com"
"tunu.com"
"tv.org"
"ultimatemoviedownload.com"
"unlimited-mp3s.in-my-cart.com"
"unlimitedmusicdownloads.com"
"vinpad.com"
"whichmp3.com"
"www-360share.com"
"downloadshield.org"
"getmusicfree.com"
"mediataskmaster.com/co/emarketresearch/01/"
"netcitydownloads.com/MP3Safe"
"winmxhq.com"

///09.02.2008 update 3
"yoursongsite.com"
"www.247downloads.com"
"www.bearsharehq.com"
"www.freemusicnow.cc"
"www.myfreetvshow.net"
"www.getmusicfree-jump.com"
"www.memarkmp3.com"
"www.moviedownloadpro.com"
"www.freedownloadaccess.com"
"www.multimedia4me.com"
"www.ad2006.com"
"www.wherecanidownload.com"
"www.mp3musicaccess.com"
"www.allmediadownload.com"
"www.mp3.101soho.com"
"www.freemovienow.com"
"www.cinemadownload.com"
"www.moviedownloadworld.com"
"www.123moviedownload.com"
"www.top-download-sites.com"
"www.freemovieslover.com"
"www.lightspeedmovies.com"
"www.movieadvanced.com"
"www.moviedownloadnow.com"
"www.moviedownloadpro.com"
"www.moviesdirectpro.com"
"www.moviesharehq.com"
"www.myfreetvshow.com"
"www.allcoolmusic.com"
"www.allemule.com"
"www.allshareaza.com"
"www.archivoscompartidos.com"
"www.best-download-sites.com"
"www.betterbusinessratings.org"
"www.betterbusinessreviews.org"
"www.betterbusinessreviewsonline.org"
"www.bittorrentreviews.com"
"www.bittorrents.com"
"www.bittorrentsoftwaredownload.com"
"www.bt-now.com"
"www.clickbank.net"
"www.completemovies.com"
"www.consumerincentivepromotions.com"
"www.copy-dvdz.com"
"www.dldemon.com"
"www.dmipartners.com"
"www.download-it-free.com"
"www.download-legal.com"
"www.downloadlegal.com"
"www.downloadmusicfast.com"
"www.downloadshield.com"
"www.e-kazaam.com"
"www.e-softwaresource.com"
"www.emule-downloading.com"
"www.emule-muzic.com"
"www.emusic.com"
"www.etomihq.com"
"www.ez-tracks.com"
"www.ezmp3s.com"
"www.file-sharing-music-downloads.com"
"www.filesharesoftware.com"
"www.filesharingcenter.com"
"www.free-music.com"
"www.freedownloadnetwork.com"
"www.freemovienow.com"
"www.freemp3access.com"
"www.freemusicreviews.com"
"www.freesoftwareoutlet.com"
"www.getanysong.com"
"www.getsongsnow.com"
"www.go.trkrlnx.com"
"www.grokster-download.com"
"www.grokster.ws"
"www.imoviesearch.com"
"www.imusicsearch.com"
"www.incentiverewardcenter.com"
"www.internetdownloads.org"
"www.ipesquire.org/directory/file-sharing.htm"
"www.k-lite-legal.com"
"www.k-litetk.com"
"www.kazaa-lite-express.com"
"www.kazaa.com"
"www.kazaa.net.cn"
"www.kazaamate.com"
"www.kazza-lite.net"
"www.kincan.com"
"www.legalmusicaccess.com"
"www.lightspeedmovies.com"
"www.limewire2005.com"
"www.limewirehq.com"
"www.mediataskmaster.com"
"www.memcco.com"
"www.mirra.com"
"www.morpheusultra.com"
"www.mp3advance.com"
"www.mp3-download-reviews.com"
"www.mp3-downloadhq.com"
"www.mp3-downloading.net"
"www.mp3-downloads.j-vmarketing.com"
"www.mp3-review.net"
"www.mp3downloadhq.com"
"www.mp3downloading.com"
"www.mp3downloadreview.com"
"www.mp3kassa.com"
"www.mp3motherload.com"
"www.mp3musiclive.com"
"www.mp3review.biz"
"www.mp3review.visualsavings.com"
"www.mp3reviewsource.com"
"www.mp3sharing.us"
"www.mp3sunlimited.net"
"www.mpfree.com"
"www.moviedownloadreview.biz"
"www.music-movie-downloads.com"
"www.music-sharing.net"
"www.my-free-music.com"
"www.myfilesharing.com"
"www.mymusicinc.com"
"www.namimedia.com"
"www.netmp3downloads.com"
"www.netmusicmania.com"
"www.oldfatman.net"
"www.pricetool.com"
"www.qckjmp.com"
"www.rebrandsoftware.com"
"www.revolutionarystuff.com"
"www.sarisaristor.com"
"www.sharedmovies.com"
"www.sharemusic.org"
"www.sharing-file.com"
"www.sneakyprograms.com"
"www.soft4kids.com"
"www.soulseekhq.com"
"www.spyzooka.com"
"www.stompsoft.com"
"www.store.yahoo.com/onecentcomputer"
"www.stroompje.nl"
"www.suprnova.com"
"www.tinyurl.com/cmj4t"
"www.tkqlhce.com"
"www.top-rated-mp3-sites.com"
"www.torrentandp2p.com"
"www.tunu.com"
"www.tv.org"
"www.ultimatemoviedownload.com"
"www.unlimited-mp3s.in-my-cart.com"
"www.unlimitedmusicdownloads.com"
"www.vinpad.com"
"www.whichmp3.com"
"www.www-360share.com"
"www.downloadshield.org"
"www.getmusicfree.com"
"www.mediataskmaster.com/co/emarketresearch/01/"
"www.netcitydownloads.com/MP3Safe"
"www.winmxhq.com"
"www.yoursongsite.com"	 
	 
	 ///////Sunday August 10th 2008
	 "www.dhsspsni.gov.uk"
	 "www.wbshop.com"
	 "www.wbwebcards.com"
	 "www.wbie.com"
	 "whv.warnerbros.com"
	 "harrypotter.warnerbros.co.uk"
	 "www.warnerbroscareers.com"
	 "movies.warnerbros.com"
	 "www.warnerbros.de"
	 "ellen.warnerbros.com"
	 "movieworld.myfun.com.au"
	 "getsmartmovie.warnerbros.com"
	 "batmanbegins.warnerbros.com"
	 "www.friendsontv.co.uk"
	 "www.wbitv.com"
	 "sisterhoodofthetravelingpants2.warnerbros.com"
	 "www.harrypotterorderofthephoenix.com"
	 "rss.warnerbros.com"
	 "constantinemovie.warnerbros.com"
	 "www.warnerbroscanada.com"
	 "tyrashow.warnerbros.com"
	 "naic.acf.hhs.gov"
	 "diabetes.niddk.nih.gov"
	 "digestive.niddk.nih.gov"
	 "kidney.niddk.nih.gov"
	 "sbsc.wr.usgs.gov"
	 "nris.mt.gov"
	 "www.healthandwelfare.idaho.gov"
	 "www.longtermcare.gov"
	 "www.dnr.mo.gov"
	 "www.preserveamerica.gov"
	 "www.wsdot.wa.gov"
	 "www.gmtvsurveys.com"
	 "www.nick.com"
	 "www.nick.co.uk"
	 "dsc.discovery.com"
	 "www.discoverychannel.co.uk"
	 "community.discoverychannel.co.uk"
	 "www.discoverychannel.ca"
	 "shopping.discovery.com"
	 "kids.discovery.com"
	 "school.discoveryeducation.com"
	 "video.discovery.com"
	 "health.discovery.com"
	 "watch.discoverychannel.ca"
	 "www.discovery.ca"
	 "www.discovery.com"
	 "www.discoveryhd.ca"
	 "www.discoveryportuguese.com"
	 "videos.howstuffworks.com"
	 "www.discoverychannel.com.au"
	 "www.discoverychannelbookclub.com"
	 
	 /////Monday August 11th 2008
	 "www.boots.com"
	 "www.allianceboots.com"
	 "www.boots-the-chemists.co.uk"
	 "www.bootskitchenappliances.com"
	 "www.bootsphoto.com"
	 "www.bootsparentingclub.com"
	 "www.bootshealthclub.com"
	 "bootslearningstore.com"
	 "www.bootsopticians.com"
	 "www.bootsjobs.com"
	 "www.bootschangeonething.com"
	 "www.bootsinnovation.com"
	 "www.bootsflowers.co.uk"
	 "www.bootscommittoquit.com"
	 "www.computerweekly.com"
	 "www.computer-weekly.com"
	 "www.kelloggs.co.uk"
	 "www.kelloggs.com"
	 "www.kelloggs-alarabi.com"
	 "www2.kelloggs.com"
	 "www.kelloggs.com.au"
	 "www.kelloggs.ca"
	 "www.kelloggcompany.com"
	 "www.kfoodservice.co.uk"
	 "www.kelloggnutrition.com"
	 "www.specialk.com"
	 "www.varndean.co.uk"
	 "www.akrotirischool.org.uk"
	 "www.argylehouseschool.co.uk"
	 "www.met.police.uk"
	 "www.policecouldyou.co.uk"
	 "www.sussex.police.uk"
	 "www.thamesvalley.police.uk"
	 "www.hampshire.police.uk"
	 "www.avonandsomerset.police.uk"
	 "www.merseyside.police.uk"
	 "www.strathclyde.police.uk"
	 "www.west-midlands.police.uk"
	 "www.lincs.police.uk"
	 "www.staffordshire.police.uk"
	 "www.gmp.police.uk"
	 "www.kent.police.uk"
	 "www.psni.police.uk"
	 "www.wiltshire.police.uk"
	 "www.herts.police.uk"
	 "www.southyorks.police.uk"
	 "www.surrey.police.uk"
	 "www.westyorkshire.police.uk"
	 "www.cleveland.police.uk"
	 "www.derbyshire.police.uk"
	 "www.lancashire.police.uk"
	 "www.scottish.police.uk"
	 "www.nottinghamshire.police.uk"
	 "www.cheshire.police.uk"
	 "www.grampian.police.uk"
	 "ww1.northumbria.police.uk"
	 "www.btp.police.uk"
	 "www.dyfed-powys.police.uk"
	 "www.northants.police.uk"
	 "www.lbp.police.uk"
	 "www.essex.police.uk"
	 "www.acpo.police.uk"
	 "www.bedfordshire.police.uk"
	 "www.suffolk.police.uk"
	 "www.cambs.police.uk"
	 "www.warwickshire.police.uk"
	 "ww2.northumbria.police.uk"
	 "www.devon-cornwall.police.uk"
	 "www.mpa.gov.uk"
	 "www.leics.police.uk"
	 "www.npia.police.uk"
	 "www.cumbria.police.uk"
	 "www.humberside.police.uk"
	 "www.tayside.police.uk"
	 "www.gloucestershire.police.uk"
	 "www.gay.police.uk"
	 "www.south-wales.police.uk"
	 "www.northyorkshire.police.uk"
	 "www.north-wales.police.uk"
	 "www.durham.police.uk"
	 "www.northern.police.uk"
	 "www.centralscotland.police.uk"
	 "www.cityoflondon.police.uk"
	 "lancspa.gov.uk"
	 "www.gwent.police.uk"
	 "www.dorset.police.uk"
	 "www.tulliallan.police.uk"
	 "www.apa.police.uk"
	 "www.sussexpoliceauthority.gov.uk"
	 "www.gmpa.gov.uk"
	 "www.norfolk.police.uk"
	 "www.surreypa.gov.uk"
	 "www.acpos.police.uk"
	 "www.spsa.police.uk"
	 "www.askthe.police.uk"
	 "www.dumfriesandgalloway.police.uk"
	 "www.westmercia.police.uk"
	 "online.met.police.uk"
	 "www.police.nsw.gov.au"
	 "www.police.vic.gov.au"
	 "www.police.qld.gov.au"
	 "www.police.wa.gov.au"
	 "www.sapolice.sa.gov.au"
	 "www.tempe.gov"
	 "www.afp.gov.au"
	 "mpdc.dc.gov"
	 "www.police.tas.gov.au"
	 "phoenix.gov"
	 "www.saps.gov.za"
	 "www.fairfaxcounty.gov"
	 "www.police.nt.gov.au"
	 "www.dubaipolice.gov.ae"
	 "tpdinternet.tucsonaz.gov"
	 "www.police.gov.hk"
	 "www.cabq.gov"
	 "www.pnp.gov.ph"
	 "www.cincinnati-oh.gov"
	 "www.pfes.nt.gov.au"
	 "alexandriava.gov"
	 "www.cambridgema.gov"
	 "www.riversideca.gov"
	 "www.urbandictionary.com"
	 "www.fife.police.uk"
	 "www.communityengagement.police.uk"
	 "www.cnc.police.uk"
	 "www.dcpa.police.uk"
	 "www.nwcu.police.uk"
	 "www.tvpa.police.uk"
	 "www.jersey.police.uk"
	 "www.gwentpa.police.uk"
	 "www.cambs-police.co.uk"
	 "www.pentameter.police.uk"
	 "www.spis.police.uk"
	 "www.cheshirepa.police.uk"
	 "www.avsom.police.uk"
	 "www.leics-pa.police.uk"
	 "www.west-midlands-pa.gov.uk"
	 "www.cnpa.police.uk"
	 "reportacrime.kent.police.uk"
	 "onlinenews.warwickshire.police.uk"
	 "kentpa.kent.police.uk"
	 "policedirect.suffolk.police.uk"
	 "www.adur.gov.uk"
	 "www.cambs-pa.gov.uk"
	 "www.britishhighcommission.gov.uk"
	 "www.lincolnshire-pa.gov.uk"
	 "cms.met.police.uk"
	 "neighbourhood.southyorks.police.uk"
	 "webcontact.sussex.police.uk"
	 "eforms.suffolk.police.uk"
	 "press.homeoffice.gov.uk"
	 "cordm.npia.police.uk"
	 "www3.hants.gov.uk"
	 "www.drdni.gov.uk"
	 "jobs.guardian.co.uk"
	 
	 ///////Sat, Aug 16th 2008
	 "www.coca-cola.co.uk"
	 "www.coca-cola.com"
	 "www.cokecce.co.uk"
	 "www.mycokemusic.com"
	 "www.thecoca-colacompany.com"
	 "www.cfr.org"
	 "www.chrysler.co.uk"
	 "www.chrysler.com"
	 "www.texaco.co.uk"
	 "www.texaco.com"
	 "www.rnc.org"
	 "europa.eu"
	 "www.eurostar.com"
	 "pentagon.afis.osd.mil"
	 "www.adobe.com"
	 "www.acrobat.com"
	 "labs.adobe.com"
	 "searchpdf.adobe.com"
	 "events.adobe.co.uk"
	 "www.photoshop.com"
	 "opensource.adobe.com"
	 "blogs.adobe.com"
	 "get.adobe.com"
	 "tv.adobe.com"
	 "feeds.adobe.com"
	 "alist.adobe.co.uk"
	 "www.mtv.com"
	 "www.sonypictures.com"
	 "www.columbiatristar.co.uk"
	 "www.mi5careers.gov.uk"
	 "www.dvla.gov.uk"
	 "www.io.com"
	 "msc.fema.gov"
	 "pubs.usgs.gov"
	 "www.gismaps.fema.gov"
	 "www.riema.ri.gov"
	 "www.fbo.gov"
	 "www.achp.gov"
	 "www.emd.wa.gov"
	 "www.msa.md.gov"
	 "www.paramount.com"
	 "www.paramountcomedy.com"
	 "www.paramountpictures.co.uk"
	 "www.paramountpicturesinternational.com"
	 "www.mitsubishi-cars.co.uk"
	 "www.mitsubishi-motors.com"
	 "www.toyota.co.uk"
	 "www.toyota.com"
	 "www.corusgroup.com"
	 "www.sagem.com"
	 "www.lucasarts.com"
	 "www.timewarnercable.com"
	 "www.endemoluk.com"
	 "www.endemol.com"
	 "www.daysinn.com"
	 "msnbc.com"
	 "nbcsports.msnbc.com"
	 "firstread.msnbc.msn.com"
	 "cosmiclog.msnbc.msn.com"
	 "cosmiclog.msnbc.msn.com"
	 "moneycentral.msn.com"
	 "photoblog.msnbc.msn.com"
	 "video.msn.com"
	 "www.shell.com"
	 "www.shell.co.uk"
	 "www.bp.com"
	 "online.vodafone.co.uk"
	 "www.vodafone.com"
	 "maps.vodafone.co.uk"
	 "www.vodafone.net"
	 "www.vodafonemusic.co.uk"
	 "www.vodafonebusinessshop.co.uk"
	 "help.vodafone.co.uk"
	 "devicehelp.vodafone.co.uk"
	 "www.national-lottery.co.uk"
	 "www.lottery.culture.gov.uk"
	 "www.frostbank.com"
	 
	 "family.go.com"
	 "movies.nytimes.com"
	 "www.everything2.net"
	 "everything2.org"
	 "everything2.com"
	 
	 
	 ///////////////////////////////////////////////////////////////////////////////////2008-10-07
	 "foxnews.com"
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
    ],
    
    // Default blocked hidden mode
    hidden: true,
    
    // Font color(CSS's value)
    fontColor: "#999",
    
    // Font size(CSS's value)
    characterSize: "90%",
    
    // Use "Filters Editor"
    useEditor: false,
    
    // == Config end ==============
    
    
    list: [],
    
    init: function(){
      Language.init();
      
      SearchFilter.hidden = GM_getValue("mode", SearchFilter.hidden);
      SearchFilter.list = eval(GM_getValue("filter")) || SearchFilter.filters.sort();
      
      if(SearchFilter.useEditor) EditFilter.init();
      
      SearchFilter.doFiltering($X("//div[@class='g']"));
      addFilter(function(elm){
        for(var i = 0, l = elm.length; i < l; i++){
          if(elm[i].firstChild.className != "g") continue;
          SearchFilter.doFiltering($X(".//div[@class='g']", elm[i]));
          break;
        }
      });
    },
    
    doFiltering: function(results){
      for(var i = 0, l = results.length; i < l; i++){
        var anchor = $X(".//a[@class='l']", results[i])[0];
        if(SearchFilter.useEditor) EditFilter.createLink(results[i], anchor);
        for(var j = 0, b = SearchFilter.list.length; j < b; j++){
          var regexp = SearchFilter.createRegExp(SearchFilter.list[j]);
          if(anchor.href.match(regexp) != null){
            if(SearchFilter.hidden){
              results[i].style.display = "none";
            }
            else{
              anchor.style.color = SearchFilter.fontColor; // for other scripts
              var headline = $X("./h2[@class='r']", results[i])[0];
              headline.style.color = SearchFilter.fontColor;
              headline.style.fontSize = SearchFilter.characterSize;
              $X("./table[last()]", results[i])[0].style.display = "none";
            }
          }
        }
      }
    },
    
    createRegExp: function(filter){
      return new RegExp("^https?:\/\/" + filter.replace(/\./g, "\.") + "\/", "i");
    },
  }
  
  var EditFilter = {
    list: [],
    filter: "",
    timer: null,
    
    init: function(){
      EditFilter.list = eval(SearchFilter.list.toSource());
      
      var place = document.getElementById("ap");
      place.parentNode.style.position = "relative";
      place.appendChild(document.createElement("br"));
      place.innerHTML += "&nbsp;&nbsp;";
      
      var link = document.createElement("a");
      link.setAttribute("href", "#");
      link.appendChild(document.createTextNode(Language[Language.lang].config));
      link.addEventListener("click", EditFilter.toggleDisplayList, false);
      place.appendChild(link);
      
      var field = document.createElement("div");
      field.id = "google-search-filter";
      field.style.position = "absolute";
      field.style.top = place.parentNode.offsetTop + place.parentNode.offsetHeight + 10;
      field.style.right = "8px";
      field.style.width = place.parentNode.offsetWidth - 26;
      field.style.maxWidth = place.parentNode.offsetWidth - 26;
      field.style.minWidth = "250";
      field.style.padding = "8px";
      field.style.border = "1px solid #000";
      field.style.backgroundColor = "#eee";
      field.style.display = "none";
      
      var input = document.createElement("input");
      input.id = "filter-edit-area";
      input.setAttribute("name", "filter-edit-area");
      input.setAttribute("type", "text");
      input.addEventListener("focus", EditFilter.setTimer, false);
      input.addEventListener("blur", EditFilter.clearTimer, false);
      input.style.width = Math.abs(place.parentNode.offsetWidth * 2 / 3);
      input.style.minWidth = "150px";
      input.style.fontFamily = "'Lucida Console', 'Courier New', Courier, Monaco, monospace";
      input.style.fontSize = "80%";
      field.appendChild(input);
      field.appendChild(document.createElement("br"));
      
      var select = document.createElement("select");
      select.id = "filter-list";
      select.setAttribute("name", "filter-list");
      select.setAttribute("size", 7);
      select.addEventListener("change", EditFilter.selectFilter, false);
      select.style.width = Math.abs(place.parentNode.offsetWidth * 2 / 3);
      select.style.minWidth = "150px";
      select.style.cssFloat = "left";
      
      var option = document.createElement("option");
      select.appendChild(option);
      EditFilter.list.forEach(function(value){
        option = document.createElement("option");
        option.appendChild(document.createTextNode(value));
        select.appendChild(option);
      });
      
      field.appendChild(select);
      
      ["add", "edit", "remove", "reset"].forEach(function(value){
        var button = document.createElement("input");
        button.id = "filter-" + value;
        button.setAttribute("name", "filter-" + value);
        button.setAttribute("type", "button");
        button.setAttribute("value", Language[Language.lang][value]);
        if(value != "reset"){
          button.setAttribute("disabled", "disabled");
        }
        button.addEventListener("click", EditFilter[value + "Filter"], false);
        button.style.width = "60px";
        button.style.marginLeft = "8px";
        button.style.marginBottom = "4px";
        field.appendChild(button);
        field.appendChild(document.createElement("br"));
      });
      
      var mode = document.createElement("label");
      mode.style.clear = "left";
      mode.style.cssFloat = "left";
      mode.style.fontSize = "90%";
      var check = document.createElement("input");
      check.id = "filter-mode";
      check.setAttribute("name", "filter-mode");
      check.setAttribute("type", "checkbox");
      if(SearchFilter.hidden) check.setAttribute("checked", "checked");
      mode.appendChild(check);
      mode.appendChild(document.createTextNode(" " + Language[Language.lang].mode));
      field.appendChild(mode);
      
      var p = document.createElement("p");
      p.style.clear = "left";
      p.style.margin = "0";
      p.style.paddingTop = "8px";
      p.style.borderTop = "1px solid #ccc";
      p.style.textAlign = "right";
      ["ok", "cancel"].forEach(function(value){
        var button = document.createElement("input");
        button.id = "filter-" + value;
        button.setAttribute("name", "filter-" + value);
        button.setAttribute("type", "button");
        button.setAttribute("value", Language[Language.lang][value]);
        button.addEventListener("click", EditFilter[value + "Editing"], false);
        button.style.width = "75px";
        button.style.height = "27px";
        p.appendChild(button);
        p.appendChild(document.createTextNode(" "));
      });
      field.appendChild(p);
      
      place.parentNode.appendChild(field);
    },
    
    createLink: function(result, anchor){
      var span = document.createElement("span");
      span.className = "bl";
      var link = document.createElement("a");
      link.className = "fl2";
      link.setAttribute("href", "#" + anchor.host);
      link.appendChild(document.createTextNode(Language[Language.lang].block));
      link.addEventListener("click", EditFilter.addFromLink, false);
      span.appendChild(document.createTextNode(" - "));
      span.appendChild(link);
      var position = $X(".//td/div/nobr", result)[0] || $X(".//td/font[boolean(span[@class='a'])]", result)[0];
      position.appendChild(span);
    },
    
    addFromLink: function(event){
      var filter = event.target.href.match(/#([\w.-]+)$/)[1];
      if(confirm(Language[Language.lang].addPrefix + filter + Language[Language.lang].addSuffix)){
        EditFilter.addList(filter);
        event.target.removeEventListener("click", EditFilter.addFromLink, false);
        event.target.addEventListener("click", function(event){
          alert(Language[Language.lang].addedPrefix + filter + Language[Language.lang].addedSuffix);
        }, false);
        event.target.replaceChild(document.createTextNode(
          Language[Language.lang].blocked
        ), event.target.firstChild);
      }
      event.preventDefault();
    },
    
    addList: function(filter){
      if(EditFilter.isFilterAdded(filter) == null) return;
      EditFilter.list.push(filter);
      EditFilter.updateFilterList();
      SearchFilter.list = eval(EditFilter.list.toSource());
      GM_setValue("filter", SearchFilter.list.toSource());
    },
    
    addFilter: function(event){
      var filter = EditFilter.filter = EditFilter.getEditedFilter();
      if(EditFilter.isFilterAdded(filter) == null) return;
      EditFilter.list.push(filter);
      EditFilter.updateFilterList(filter);
      EditFilter.resetEnableButton();
    },
    
    isFilterAdded: function(filter){
      for(var i = 0, l = EditFilter.list.length; i < l; i++){
//        var regexp = SearchFilter.createRegExp(EditFilter.list[i]);
//        if(("http://" + filter + "/").match(regexp) != null){
        if(filter == EditFilter.list[i]){
          alert(Language[Language.lang].addedPrefix + filter + Language[Language.lang].addedSuffix);
          return null;
        }
      }
      return 1;
    },
    
    editFilter: function(event){
      var filter = EditFilter.getEditedFilter();
      if(EditFilter.filter == filter){
        alert("'" + filter + "' " + Language[Language.lang].notEdited);
        return;
      }
      for(var i = 0, l = EditFilter.list.length; i < l; i++){
        if(EditFilter.filter == EditFilter.list[i]){
          EditFilter.list[i] = filter;
          break;
        }
      }
      EditFilter.filter = filter;
      EditFilter.updateFilterList(filter);
      EditFilter.resetEnableButton();
    },
    
    removeFilter: function(event){
      var filter = EditFilter.getEditedFilter();
      for(var i = 0, l = EditFilter.list.length; i < l; i++){
        if(filter == EditFilter.list[i]){
          EditFilter.list.splice(i, 1);
          EditFilter.updateFilterList();
          EditFilter.filter = document.getElementById("filter-edit-area").value = "";
          event.target.setAttribute("disabled", "disabled");
          return;
        }
      }
      alert("'" + filter + "' " + Language[Language.lang].notFound);
    },
    
    getEditedFilter: function(){
      return document.getElementById("filter-edit-area").value;
    },
    
    resetFilter: function(event){
      if(confirm(Language[Language.lang].init)){
        EditFilter.list = SearchFilter.filters.sort()
        SearchFilter.list = eval(EditFilter.list.toSource());
        EditFilter.updateFilterList();
        EditFilter.filter = document.getElementById("filter-edit-area").value = "";
      }
    },
    
    okEditing: function(event){
      SearchFilter.list = eval(EditFilter.list.toSource());
      GM_setValue("filter", SearchFilter.list.toSource());
      GM_setValue("mode", document.getElementById("filter-mode").checked);
      EditFilter.toggleDisplayList(event);
    },
    
    cancelEditing: function(event){
      EditFilter.list = eval(SearchFilter.list.toSource());
      EditFilter.updateFilterList();
      EditFilter.toggleDisplayList(event);
    },
    
    updateFilterList: function(filter){
      EditFilter.list.sort();
      var list = document.getElementById("filter-list");
      while(list.firstChild){
        list.removeChild(list.firstChild);
      }
      var option = document.createElement("option");
      list.appendChild(option);
      EditFilter.list.forEach(function(value){
        var option = document.createElement("option");
        option.appendChild(document.createTextNode(value));
        list.appendChild(option);
      });
      if(filter){
        for(var i = 0, l = list.childNodes.length; i < l; i++){
          if(filter == list.childNodes[i].value){
            list.childNodes[i].selected = true;
            return;
          }
        }
      }
    },
    
    selectFilter: function(event){
      EditFilter.filter = document.getElementById("filter-edit-area").value = event.target.value;
      EditFilter.resetEnableButton();
      if(event.target.value == "")
        document.getElementById("filter-remove").setAttribute("disabled", "disabled");
    },
    
    setTimer: function(event){
      EditFilter.timer = setInterval(EditFilter.checkValue, 250);
    },
    
    clearTimer: function(event){
      clearInterval(EditFilter.timer);
      EditFilter.timer = null;
    },
    
    checkValue: function(){
      var add = document.getElementById("filter-add");
      var edit = document.getElementById("filter-edit");
      var filter = document.getElementById("filter-edit-area").value;
      if(filter == ""){
        [add, edit].forEach(function(button){
          button.setAttribute("disabled", "disabled");
        });
      }
      else if(EditFilter.filter == "" && filter != ""){
        add.removeAttribute("disabled");
      }
      else if(filter != EditFilter.filter){
        [add, edit].forEach(function(button){
          button.removeAttribute("disabled");
        });
      }
      else{
        [add, edit].forEach(function(button){
          if(!button.hasAttribute("disabled")) button.setAttribute("disabled", "disabled");
        });
      }
    },
    
    resetEnableButton: function(){
      ["add", "edit"].forEach(function(value){
        var button = document.getElementById("filter-" + value);
        if(!button.hasAttribute("disabled")){
          button.setAttribute("disabled", "disabled");
        }
      });
      button = document.getElementById("filter-remove");
      if(button.hasAttribute("disabled")){
        button.removeAttribute("disabled");
      }
    },
    
    toggleDisplayList: function(event){
      var list = document.getElementById("google-search-filter");
      list.style.display = list.style.display == "none" ? "block" : "none";
      event.preventDefault();
    },
  }
  
  var Language = {
    lang: "en",
    
    init: function(){
      var lang = navigator.language.substring(0,2);
      Language.lang = Language[lang] ? lang : "en";
    },
    
    ja: {
      config     : "\u30d5\u30a3\u30eb\u30bf\u8a2d\u5b9a",
      add        : "\u8ffd\u52a0",
      edit       : "\u7de8\u96c6",
      remove     : "\u524a\u9664",
      reset      : "\u521d\u671f\u5024",
      mode       : "\u30d5\u30a3\u30eb\u30bf\u306b\u30de\u30c3\u30c1\u3057\u305f\u7d50\u679c\u3092\u975e\u8868\u793a",
      ok         : "OK",
      cancel     : "\u30ad\u30e3\u30f3\u30bb\u30eb",
      block      : "\u30d6\u30ed\u30c3\u30af",
      blocked    : "\u30d6\u30ed\u30c3\u30af\u6e08!",
      addPrefix  : "'",
      addSuffix  : "' \u3092\u30d5\u30a3\u30eb\u30bf\u306b\u8ffd\u52a0\u3057\u307e\u3059\u304b?",
      addedPrefix: "'",
      addedSuffix: "' \u306f\u65e2\u306b\u30d5\u30a3\u30eb\u30bf\u306b\u8ffd\u52a0\u3055\u308c\u3066\u3044\u307e\u3059\u3002",
      notEdited  : "\u306f\u7de8\u96c6\u3055\u308c\u3066\u3044\u307e\u305b\u3093\u3002",
      notFound   : "\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093\u3002",
      init       : "\u30d5\u30a3\u30eb\u30bf\u30ea\u30b9\u30c8\u3092\u521d\u671f\u5316\u3057\u307e\u3059\u304b\uff1f",
    },
    
    en: {
      config     : "Config Filters",
      add        : "Add",
      edit       : "Edit",
      remove     : "Delete",
      reset      : "Reset",
      mode       : "Hide the filter matched result",
      ok         : "OK",
      cancel     : "Cancel",
      block      : "Block",
      blocked    : "Blocked!",
      addPrefix  : "Add '",
      addSuffix  : "' to filter?",
      addedPrefix: "Added '",
      addedSuffix: "' to filter already.",
      notEdited  : "isn't edited.",
      notFound   : "isn't found.",
      init       : "Do you initialize the list of filters?",
    },
  }
  
  /*
   * $X function from nulog
   * http://lowreal.net/logs/2006/03/16/1
   *
   * Thanks, cho45.
   */
  function $X (exp, context) {
    if (!context) context = document;
    var resolver = function(prefix){
      var o = document.createNSResolver(context)(prefix);
      return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
    }
    var exp = document.createExpression(exp, resolver);
    
    var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
    switch(result.resultType){
      case XPathResult.STRING_TYPE : return result.stringValue;
      case XPathResult.NUMBER_TYPE : return result.numberValue;
      case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
      case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
        result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var ret = [];
        for(var i = 0, len = result.snapshotLength; i < len ; i++){
          ret.push(result.snapshotItem(i));
        }
        return ret;
      }
    }
    return null;
  }
  
  // For Autopagerize 0.0.12
  function addFilter(filter, i) {
    i = i || 4;
    if(window.AutoPagerize && window.AutoPagerize.addFilter){
      window.AutoPagerize.addFilter(filter);
    }
    else if(i > 1){
      setTimeout(arguments.callee, 1000, filter, i - 1);
    }
  }
  
  if(document.body) SearchFilter.init();
})();





















