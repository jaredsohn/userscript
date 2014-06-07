// ==UserScript==
// @name		Last.fm - Hide Activity Box
// @namespace	http://no.name.space/
// @description	Allows user to toggle display of activity box in their own profile
// @include	http://www.last.fm/user/*
// @include	http://www.last.fm/place/*
// @include	http://www.last.fm/music/*
// @include	http://www.last.fm/home
// @include	http://www.lastfm.fr/user/*
// @include	http://www.lastfm.fr/music/*
// @include	http://www.lastfm.fr/place/*
// @include	http://www.lastfm.de/user/*
// @include	http://www.lastfm.de/music/*
// @include	http://www.lastfm.de/place/*
// @include	http://www.lastfm.es/user/*
// @include	http://www.lastfm.es/music/*
// @include	http://www.lastfm.es/place/*
// @include	http://www.lastfm.se/user/*
// @include	http://www.lastfm.it/user/*
// @include	http://www.lastfm.it/music/*
// @exclude	http://www.lastfm.se/music/*
// @include	http://www.lastfm.se/place/*
// @include	http://www.lastfm.com.br/user/*
// @exclude	http://www.lastfm.com.br/music/*
// @include	http://www.lastfm.com.br/place/*
// @exclude	http://www.last.fm/user/*/*
// @exclude	http://www.lastfm.fr/user/*/*
// @exclude	http://www.lastfm.de/user/*/*
// @exclude	http://www.lastfm.it/user/*/*
// @exclude	http://www.lastfm.es/user/*/*
// @exclude	http://www.lastfm.se/user/*/*
// @exclude	http://www.lastfm.com.br/user/*/*
// ==/UserScript==

// 26-Jul-2008 created snyde1
// 26-Sep-2008 update for more pages, languages

function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
function drudgeWork (myNode, myId, myKey) {
	if (!document.getElementById(myId)) {
		myNode.nextSibling.nextSibling.setAttribute("id",myId);
	}
	var myTempStr = "<A style=\"color: #D51007;\" HREF=\"javascript:(hydeSnyde('"+myId+"','"+myKey+"'))\">+/&ndash;</A> / ";
	if (myId != "player") {
		myNode.firstChild.innerHTML = myTempStr + myNode.firstChild.innerHTML;
	}
	if(document.cookie.match(/HydeVSJekyll=/)) {
		var oldCookie = document.cookie.match(/HydeVSJekyll=([^;]*)[;$]/)[1];
		var keyThere = new RegExp(myKey);
		if (oldCookie.match(keyThere)) {
			document.getElementById(myId).setAttribute('style','display: none;  visibility: hidden;');
		}
	} else {
		var myDte = new Date((new Date()).getTime() + (2*365*24*3600*1000));
		var myStr = "HydeVSJekyll=RA; "+"expires="+myDte.toGMTString();
		document.cookie = myStr;
	}
}
function getLastfmUsername() {
	var usernameLink = xpath("//a[contains(@class,'user-badge')]");
	if (usernameLink.snapshotLength > 0) {
		return(usernameLink.snapshotItem(1).innerHTML);
	} else {
		usernameLink = xpath("//a[@id='idBadgerUser']");
		if (usernameLink.snapshotLength > 0) {
			var userNameLoc = usernameLink.snapshotItem(0).innerHTML;
			userNameLoc = userNameLoc.replace(/<[^<>]*>/g,"").replace(/^\s*/m,"").replace(/\s*$/,"");
			return(userNameLoc);
		} else {
			return("");
		}
	}
}
(function () {
//	username = getLastfmUsername();
//	if (username == "") { return; }
//	var re2 = new RegExp("\/"+username+"$", "i");	// Is it my page or another's?
//	if (! location.href.match(re2)) { return; }

// Matches for English
var raRE = new RegExp(/Recent Activity/i);
var rvRE = new RegExp(/Recent Visitors/i);
var amRE = new RegExp(/About Me/i);
var frRE = new RegExp(/Friends/);
var lbfrRE = new RegExp(/(Your friends in common|You are connected through)/);
var arRE = new RegExp(/Journals/i);
var grRE = new RegExp(/Groups/i);
var evRE = new RegExp(/Events/i);
var neRE = new RegExp(/Neighbours/i);
var libRE = new RegExp(/ Library/i);
var retRE = new RegExp(/Recently Listened Tracks/i);
var sbRE = new RegExp(/ShoutBox/i);
var taRE = new RegExp(/Top Artists/i);
var ttRE = new RegExp(/Top Tracks/i);
var talRE = new RegExp(/Top Albums/i);
var rarRE = new RegExp(/Related Journals/i);
var pliRE = new RegExp(/More Information/i);
var liRE = new RegExp(/Top Listeners/i);
var lnRE = new RegExp(/Listening Now/i);
var ltRE = new RegExp(/Listening Trend/i);
var emnRE = new RegExp(/Email Newsletter/i);
var simRE = new RegExp(/Similar/i);
var vidRE = new RegExp(/Videos/i);
// for French
if (location.href.match(/www.lastfm.fr/i)) {
	raRE = new RegExp(/Activit. r.cente/i);
	rvRE = new RegExp(/Visiteurs r.cents/i);
	amRE = new RegExp(/propos de moi/i);
	frRE = new RegExp(/Amis/);
	lbfrRE = new RegExp(/(Vos amis en commun|Vous .tes connect. via)/);
	arRE = new RegExp(/Articles/i);
	grRE = new RegExp(/Groupes/i);
	evRE = new RegExp(/Concerts/i);
	neRE = new RegExp(/Voisins/i);
	libRE = new RegExp(/Biblioth.que de /i);
	retRE = new RegExp(/Morceaux .cout.s r.cemment/i);
	taRE = new RegExp(/Top Artistes/i);
	ttRE = new RegExp(/Top Titres/i);
	rarRE = new RegExp(/Articles li.s/i);
	pliRE = new RegExp(/Plus d.infos/i);
	liRE = new RegExp(/Auditeurs/i);
	lnRE = new RegExp(/coutent en ce moment/i);
	ltRE = new RegExp(/Tendance d..coute/i);
	emnRE = new RegExp(/Newsletter par email/i);
	simRE = new RegExp(/similaires/i);
	vidRE = new RegExp(/Vid.os/i);
} // for German
if (location.href.match(/www.lastfm.de/i)) {
	raRE = new RegExp(/Letzte Aktivit.ten/i);
	rvRE = new RegExp(/Letzte Besucher/i);
	amRE = new RegExp(/.ber mich/i);
	frRE = new RegExp(/[^ ]Freunde /i);
	lbfrRE = new RegExp(/(Eure gemeinsamen Freunde|Ihr seid verbunden durch)/);
	arRE = new RegExp(/Blogeintr.ge/i);
	grRE = new RegExp(/Gruppen/i);
	neRE = new RegExp(/Nachbarn/i);
	libRE = new RegExp(/ Musiksammlung/i);
	retRE = new RegExp(/K.rzlich angeh.rte Titel/i);
	taRE = new RegExp(/Top-K.nstler/i);
	talRE = new RegExp(/Top.Alben/i);
	ttRE = new RegExp(/Top-Titel/i);
//	rarRE = new RegExp(/Blogeintr.ge/i);
	pliRE = new RegExp(/Weitere Informationen/i);
	liRE = new RegExp(/Top-H.rer/i);
	lnRE = new RegExp(/Aktuelle.H.rer/i);
//	ltRE = new RegExp(/H.rtrend/i);
	simRE = new RegExp(/.hnliche K.nstler/i);
} // Spanish
if (location.href.match(/www.lastfm.es/i)) {
	raRE = new RegExp(/Actividad reciente/i);
	rvRE = new RegExp(/Visitas recientes/i);
	amRE = new RegExp(/Con.ceme/i);
	frRE = new RegExp(/Amigos/i);
	arRE = new RegExp(/Blogs/i);
	grRE = new RegExp(/Grupos/i);
	neRE = new RegExp(/Vecinos/i);
	libRE = new RegExp(/Colecci.n de /i);
	retRE = new RegExp(/Temas escuchados recientemente/i);
	taRE = new RegExp(/Artistas m.s escuchados/i);
	talRE = new RegExp(/.lbumes m.s escuchados/i);
	ttRE = new RegExp(/Temas m.s escuchados/i);
	rarRE = new RegExp(/Blogs relacionados/i);
	pliRE = new RegExp(/M.s informaci.n/i);
	liRE = new RegExp(/Oyentes/i);
	simRE = new RegExp(/Artistas similares/i);
	sbRE = new RegExp(/Notas/i);
	evRE = new RegExp(/Eventos/i);
	vidRE = new RegExp(/V.deos/i);
} // Swedish
if (location.href.match(/www.lastfm.se/i)) {
	raRE = new RegExp(/Senaste aktiviteter/i);
	rvRE = new RegExp(/Senaste bes.karna/i);
	amRE = new RegExp(/Om mig/i);
	frRE = new RegExp(/V.nner/i);
	arRE = new RegExp(/Bloggar/i);
	grRE = new RegExp(/Grupper/i);
	neRE = new RegExp(/Grannar/i);
	libRE = new RegExp(/ bibliotek/i);
	retRE = new RegExp(/Senast spelade l.tar/i);
	taRE = new RegExp(/Toppartister/i);
	talRE = new RegExp(/Toppalbum/i);
	ttRE = new RegExp(/Toppl.tar/i);
	rarRE = new RegExp(/Relaterade bloggar/i);
	pliRE = new RegExp(/Mer information/i);
	liRE = new RegExp(/Lyssnare/i);
	simRE = new RegExp(/Liknande artister/i);
	sbRE = new RegExp(/Hojtl.da/i);
	evRE = new RegExp(/Spelningar/i);
	vidRE = new RegExp(/Videor/i);
} // Italian
if (location.href.match(/www.lastfm.it/i)) {
	raRE = new RegExp(/Attivit. recenti/i);
	rvRE = new RegExp(/Visitatori recenti/i);
	amRE = new RegExp(/Descrizione/i);
	frRE = new RegExp(/Amici/i);
	arRE = new RegExp(/Articoli /i);
	grRE = new RegExp(/Gruppi/i);
	neRE = new RegExp(/Grannar/i);
	libRE = new RegExp(/Libreria di /i);
	retRE = new RegExp(/Brani ascoltati di recente/i);
	taRE = new RegExp(/Artisti pi. ascoltati/i);
	talRE = new RegExp(/Album pi. ascoltati/i);
	ttRE = new RegExp(/Brani pi. ascolta/i);
	rarRE = new RegExp(/Articoli correlati/i);
	pliRE = new RegExp(/Ulteriori informazioni/i);
	liRE = new RegExp(/Ascoltatori/i);
	simRE = new RegExp(/Artisti simili/i);
	sbRE = new RegExp(/Bacheca/i);
	evRE = new RegExp(/Eventi/i);
	vidRE = new RegExp(/Video/i);
} // Portuguese
if (location.href.match(/www.lastfm.com.br/i)) {
	raRE = new RegExp(/Atividade recente/i);
	rvRE = new RegExp(/Visitantes recentes/i);
	amRE = new RegExp(/Sobre mim/i);
	frRE = new RegExp(/Amigos/i);
	arRE = new RegExp(/Posts /i);
	grRE = new RegExp(/Grupos/i);
	neRE = new RegExp(/Vizinhos/i);
	libRE = new RegExp(/Biblioteca de /i);
	retRE = new RegExp(/.ltimas faixas/i);
	taRE = new RegExp(/Principais artistas/i);
	talRE = new RegExp(/Principais .lbuns/i);
	ttRE = new RegExp(/As faixas mais tocadas/i);
	rarRE = new RegExp(/Blogs relacionados/i);
	pliRE = new RegExp(/Mais informa..es/i);
	liRE = new RegExp(/Ouvintes/i);
	simRE = new RegExp(/Parecidos/i);
	sbRE = new RegExp(/Caixa de mensagens/i);
	evRE = new RegExp(/Eventos/i);
	vidRE = new RegExp(/V.deos/i);
}
	writeHideSnyde();

	if (document.getElementById("player")) {
		var plyrNode = document.getElementById("player");
		var prePlyr = document.createElement("DIV");
		prePlyr.innerHTML = "<H2 Class='heading'><span class='h2Wrapper'><A style=\"color: #ff0000;\" HREF=\"javascript:(hydeSnyde('player','P'))\">+/&ndash;</A> / Player</span></H2>";
		plyrNode.parentNode.insertBefore(prePlyr,plyrNode);
		drudgeWork(plyrNode,"player","P");
	}
	var activityHdr = xpath("//H2"); // xpath("//H2[contains(@Class, 'heading')]");
	for (var i=0; i<activityHdr.snapshotLength; i++) {
		if (activityHdr.snapshotItem(i).innerHTML.match(raRE)){
			var myNode=activityHdr.snapshotItem(i);
			if (myNode.nextSibling.nextSibling.nextSibling.nextSibling.tagName.match(/UL/i)) {
				myNode.nextSibling.nextSibling.nextSibling.nextSibling.setAttribute("id","MyActivityBox");
			} else {
				myNode.nextSibling.nextSibling.setAttribute("id","MyActivityBox");
			}
			drudgeWork(myNode,"MyActivityBox","R");
		}
		if (activityHdr.snapshotItem(i).innerHTML.match(rvRE)){
			drudgeWork(activityHdr.snapshotItem(i),"MyRVisitorsBox","V");
		}
		if (activityHdr.snapshotItem(i).innerHTML.match(amRE)){
			drudgeWork(activityHdr.snapshotItem(i),"MyMeBox","A");
		}
		if (activityHdr.snapshotItem(i).innerHTML.match(liRE)){
			drudgeWork(activityHdr.snapshotItem(i),"MyHearYa","H");
		}
		if (activityHdr.snapshotItem(i).innerHTML.match(lnRE)){
			drudgeWork(activityHdr.snapshotItem(i),"MyHearNow","h");
		}
		if (activityHdr.snapshotItem(i).innerHTML.match(ltRE)){
			drudgeWork(activityHdr.snapshotItem(i),"MyHearTrnd","d");
		}
//		if (activityHdr.snapshotItem(i).innerHTML.match(emnRE)){
//			drudgeWork(activityHdr.snapshotItem(i),"MyEmailNews","e");
//		}
		if (activityHdr.snapshotItem(i).innerHTML.match(rarRE)){
			drudgeWork(activityHdr.snapshotItem(i),"ArtJournalsBox","Q");
		}
		if (activityHdr.snapshotItem(i).innerHTML.match(pliRE)){
			drudgeWork(activityHdr.snapshotItem(i),"ArtInfoBox","I");
		}
		if (activityHdr.snapshotItem(i).innerHTML.match(frRE)){
			drudgeWork(activityHdr.snapshotItem(i),"MyFriendsBox","F");
		}
		if (activityHdr.snapshotItem(i).innerHTML.match(lbfrRE)){
			drudgeWork(activityHdr.snapshotItem(i),"MyFriendsLab","f");
		}
		if (activityHdr.snapshotItem(i).innerHTML.match(arRE) && !location.href.match(/\/music\//) ){
			drudgeWork(activityHdr.snapshotItem(i),"MyJournalsBox","J");
		}
		if (activityHdr.snapshotItem(i).innerHTML.match(grRE)){
			drudgeWork(activityHdr.snapshotItem(i),"MyGroupsBox","G");
		}
		if (activityHdr.snapshotItem(i).innerHTML.match(evRE)){
			drudgeWork(activityHdr.snapshotItem(i),"MyEventBox","E");
		}
		if (activityHdr.snapshotItem(i).innerHTML.match(neRE)){
			drudgeWork(activityHdr.snapshotItem(i),"MyNeighboursBox","N");
		}
		if (activityHdr.snapshotItem(i).innerHTML.match(libRE)){
			drudgeWork(activityHdr.snapshotItem(i),"MyLibraryBox","L");
		}
		if (activityHdr.snapshotItem(i).innerHTML.match(sbRE)){
			drudgeWork(activityHdr.snapshotItem(i),"MyYelling","Y");
		}
		if (activityHdr.snapshotItem(i).innerHTML.match(retRE)){
			var nodeIWant = activityHdr.snapshotItem(i).parentNode.getElementsByTagName("TABLE");
			if (nodeIWant.length > 0) {
				nodeIWant[0].setAttribute("id","MyTracksBox");
				drudgeWork(activityHdr.snapshotItem(i),"MyTracksBox","T");
			}
		}
		if (activityHdr.snapshotItem(i).innerHTML.match(taRE)){
			var nodeIWant = activityHdr.snapshotItem(i).parentNode.getElementsByTagName("DIV");
			if (nodeIWant.length > 2) {
				var nodeNum = 2; if (location.href.match(/\/place\//)) {nodeNum=1; }
				nodeIWant[nodeNum].setAttribute("id","MyTopBands");
				drudgeWork(activityHdr.snapshotItem(i),"MyTopBands","B");
			}
		}
		if (activityHdr.snapshotItem(i).innerHTML.match(ttRE)){
			var nodeIWant = activityHdr.snapshotItem(i).parentNode.getElementsByTagName("DIV");
			if (location.href.match(/\/music\//) || location.href.match(/\/place\//)) {
				if (nodeIWant.length > 1) {
					nodeIWant[1].setAttribute("id","MyTopSongs");
					drudgeWork(activityHdr.snapshotItem(i),"MyTopSongs","S");
				}
			} else {
				if (nodeIWant.length > 2) {
					nodeIWant[2].setAttribute("id","MyTopSongs");
					drudgeWork(activityHdr.snapshotItem(i),"MyTopSongs","S");
				}
			}
		}
		if (activityHdr.snapshotItem(i).innerHTML.match(talRE)){
			var nodeIWant = activityHdr.snapshotItem(i).parentNode.getElementsByTagName("DIV");
			if (!document.getElementById("MyTopAlbums")) {
				drudgeWork(activityHdr.snapshotItem(i),"MyTopAlbums","W");
			} else {
				if (location.href.match(/\/music\//) || location.href.match(/\/place\//)) {
					if (nodeIWant.length > 1) {
						nodeIWant[1].setAttribute("id","MyTopAlbums");
						drudgeWork(activityHdr.snapshotItem(i),"MyTopAlbums","W");
					}
				} else {
					if (nodeIWant.length > 2) {
						nodeIWant[2].setAttribute("id","MyTopAlbums");
						drudgeWork(activityHdr.snapshotItem(i),"MyTopAlbums","W");
					}
				}
			}
		}
		if (activityHdr.snapshotItem(i).innerHTML.match(simRE)){
			drudgeWork(activityHdr.snapshotItem(i),"ArtPretend","D");
		}
		if (activityHdr.snapshotItem(i).innerHTML.match(vidRE)){
			drudgeWork(activityHdr.snapshotItem(i),"MyTopVideo","X");
		}
	}
}) ();
function writeHideSnyde() { if (! document.getElementById('HydeVSJekyll') ) {
//	var contextElem = document.getElementById("content");
//	var contextElem = document.getElementById("fauxHeaderContainer");
	var contextElem = document.getElementById("page");
	var theScriptText = "";
	theScriptText += "function hydeSnyde(drJekyll,jsLab) { var Jekyll = document.getElementById(drJekyll);";
	theScriptText += "var myDte = new Date((new Date()).getTime() + (2*365*24*3600*1000)); ";
	theScriptText += " if (document.cookie.match(/HydeVSJekyll=/)) {";
	theScriptText += " var oldCookie = document.cookie.match(/HydeVSJekyll=([^;]*)[;$]/)[1];";
	theScriptText += " } else {var oldCookie = ''; }";
	theScriptText += "if (Jekyll.getAttribute('style') == null) ";
	theScriptText += "{Jekyll.setAttribute('style','display: none; visibility: hidden;'); ";
	theScriptText += " oldCookie += jsLab;";
	theScriptText += "} else { Jekyll.removeAttribute('style'); var jsLabRE = new RegExp(jsLab,'g'); oldCookie = oldCookie.replace(jsLabRE,'');} ";
	theScriptText += " var myCke = 'HydeVSJekyll='+oldCookie+'; expires='+myDte.toGMTString()+';';";
	theScriptText += " document.cookie = myCke;";
	theScriptText += "};";
	var theScript = document.createElement("script");  theScript.setAttribute('language','JavaScript'); theScript.setAttribute('id','HydeVSJekyll');
	theScript.innerHTML =  theScriptText;
	contextElem.insertBefore(theScript,contextElem.firstChild);
}}