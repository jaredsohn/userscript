// ==UserScript==
// @name           my 4chan antispam
// @namespace      ee
// @description    removes all current spam
// @include        *4chan.org*
// @include        http://img.4chan.org/*
// @include        http://zip.4chan.org/*
// @include        http://cgi.4chan.org/*
// @include        http://orz.4chan.org/*
// @include        http://boards.4chan.org/*
// ==/UserScript==

(function() {
	var posts = document.getElementsByTagName("blockquote");
	for (i = 0; i < posts.length; i++)
	{
		if (
posts[i].innerHTML.indexOf("http://short.ie/po7e4h") != -1 ||            
posts[i].innerHTML.indexOf("http://www.youtube.com/watch?v=0EOc6y3Wd6U") != -1 || 
posts[i].innerHTML.indexOf("scapegoat is awesome --- subwar") != -1 ||
posts[i].innerHTML.indexOf("OMG I JUST WATCHED THE MEGAN FOX SEX TAPE!") != -1 ||
posts[i].innerHTML.indexOf("http://sweetvirgincam.co.cc") != -1 ||
posts[i].innerHTML.indexOf("Untold hundreds of 4chan bans") != -1 ||
posts[i].innerHTML.indexOf("Want a place to blog freely") != -1 ||
posts[i].innerHTML.indexOf("DELEETE DA STUPID") != -1 ||
posts[i].innerHTML.indexOf("Love.the surgeon") != -1 ||
posts[i].innerHTML.indexOf("Love the surgeon") != -1 ||
posts[i].innerHTML.indexOf("Fail Ninja again") != -1 ||
posts[i].innerHTML.indexOf("Tom Hall") != -1 ||
posts[i].innerHTML.indexOf("TOM HALL") != -1 ||
posts[i].innerHTML.indexOf("syystä") != -1 ||
posts[i].innerHTML.indexOf("spread the word we all need to see it") != -1 ||
posts[i].innerHTML.indexOf("SAVAGE, it's cooler than your mother") != -1 ||
posts[i].innerHTML.indexOf("M@GE3") != -1 ||
posts[i].innerHTML.indexOf("[Hop@+") != -1 ||
posts[i].innerHTML.indexOf("shut down /b/. don't let us") != -1 ||
posts[i].innerHTML.indexOf("f5 to wade through shitty threads") != -1 ||
posts[i].innerHTML.indexOf("http://www.fucktube.com/video/33459/interracial-couple-and-their-first-homemade-anal-flick") != -1 ||
posts[i].innerHTML.indexOf("http://www.fucktube.com/video/33680/cute-girlfriend-gives-a-firm-handjob-while-masturbating") != -1 ||
posts[i].innerHTML.indexOf("http://www.fucktube.com/video/33416/latina-masturbates-to-an-exhausting-orgasm") != -1 ||
posts[i].innerHTML.indexOf("http://www.fucktube.com") != -1 ||
posts[i].innerHTML.indexOf("http://www.youtube.com/watch?v=i7rlyTySAR4") != -1 ||
posts[i].innerHTML.indexOf("http://www.youtube.com/watch?v=g_7OJt8NTTo") != -1 ||
posts[i].innerHTML.indexOf("http://www.youtube.com/watch?v=9gav8zsR8KY") != -1 ||
posts[i].innerHTML.indexOf("http://www.youtube.com/watch?v=CHVhwcOg6y8") != -1 ||
posts[i].innerHTML.indexOf("http://www.youtube.com/watch?v=0EOc6y3Wd6U") != -1 ||
posts[i].innerHTML.indexOf("http://www.youtube.com/watch?v=zBbRTeLBJRQ") != -1 ||
posts[i].innerHTML.indexOf("www {dot} chan-exposed {dot} ph {dot} tc") != -1 ||
posts[i].innerHTML.indexOf("http://www.e-castig.com/index.php?") != -1 ||
posts[i].innerHTML.indexOf("tinychat()com / lolpranx") != -1 ||
posts[i].innerHTML.indexOf("wikipedia.com/w/index.php?title=User:The_Thing_That_Should_Not_Be&action=edit&section=new") != -1 ||
posts[i].innerHTML.indexOf("http://www.h8u.info/?id=h3bt6xpx3hdw4r4zpcq86ah1l2pf0m") != -1 ||
posts[i].innerHTML.indexOf("http://cheekyrevenge.com/hayley/index.php?id=558961846e4895449570eb02c1294a3a") != -1 ||
posts[i].innerHTML.indexOf("1. go to its(o)over9000.net") != -1 ||
posts[i].innerHTML.indexOf("NO SHARECASH BULLSHIT") != -1 ||
posts[i].innerHTML.indexOf("FOURCHANRAID.com") != -1 ||
posts[i].innerHTML.indexOf("FemanonChan.com") != -1 ||   
posts[i].innerHTML.indexOf("/4Spam/message.txt") != -1 ||
posts[i].innerHTML.indexOf("4changold.net") != -1 ||
posts[i].innerHTML.indexOf("2. Click a link") != -1 ||
posts[i].innerHTML.indexOf("4ChanSecrets.info") != -1 ||
posts[i].innerHTML.indexOf("4ChanGold*net") != -1 ||
posts[i].innerHTML.indexOf("korruptz.net") != -1 ||
posts[i].innerHTML.indexOf("Join 'Single' Clan chat for epic lulz!") != -1 ||
posts[i].innerHTML.indexOf("Clan chat for epic lulz") != -1 ||
posts[i].innerHTML.indexOf("arsenic.typefrag.com") != -1 ||
posts[i].innerHTML.indexOf("There are changes happening, not all of them good") != -1 ||
posts[i].innerHTML.indexOf("a n o n t a l k") != -1 ||
posts[i].innerHTML.indexOf("anontalk") != -1 ||
posts[i].innerHTML.indexOf("Anontalk") != -1 ||
posts[i].innerHTML.indexOf("WWw.AnｏNＴaＬK.cＯM") != -1 ||
posts[i].innerHTML.indexOf("user Account Excceded Bandwidth") != -1 ||
posts[i].innerHTML.indexOf("ＹＮ k Ｕ") != -1 ||
posts[i].innerHTML.indexOf("EDWARD JOHNSON RECKONS") != -1 ||
posts[i].innerHTML.indexOf("http://channers.ourtoolbar.com/") != -1 ||
posts[i].innerHTML.indexOf("𝛍") != -1 ||
posts[i].innerHTML.indexOf("definições de ligação") != -1 ||
posts[i].innerHTML.indexOf("http://www.freeps3.tv/?i=1002") != -1 ||
posts[i].innerHTML.indexOf("http://www.envirofile.org/download/25438") != -1 ||
posts[i].innerHTML.indexOf("Blogging | Contact") != -1 ||
posts[i].innerHTML.indexOf("l'accueil de votre cité universitaire") != -1 ||
posts[i].innerHTML.indexOf("Índices e conteúdos") != -1 ||
posts[i].innerHTML.indexOf("nginx/0.6.39") != -1 ||
posts[i].innerHTML.indexOf("http://8.ly/b9d?") != -1 ||
posts[i].innerHTML.indexOf("gro.nahCnonameF") != -1 ||
posts[i].innerHTML.indexOf("http://freestarcraft2beta.blogspot.com/") != -1 ||
posts[i].innerHTML.indexOf("freestarcraft2beta.blogspot.com/") != -1 ||
posts[i].innerHTML.indexOf("You get 2GB just for signing up") != -1 ||
posts[i].innerHTML.indexOf("ｔＡｌｋ.cＯm") != -1 ||
posts[i].innerHTML.indexOf("4.chantard.org/tits") != -1 ||
posts[i].innerHTML.indexOf("rapidshare.com/files/368579629/Fake_Webcam_6.1__FFF__Keygen_Included.rar ") != -1 ||
posts[i].innerHTML.indexOf("(ＡＫa ＭＯoｔ)") != -1 ||
posts[i].innerHTML.indexOf("ואינדקס") != -1 ||
posts[i].innerHTML.indexOf("Impossible d'afficher la page") != -1 ||
posts[i].innerHTML.indexOf("tits.4.chantard.org") != -1 ||
posts[i].innerHTML.indexOf("moc.nahCnonameF") != -1 ||
posts[i].innerHTML.indexOf("http://www.e-castig.com/index.php?r=X1E4x") != -1 ||
posts[i].innerHTML.indexOf("kan geen verbinding met de opgevraagde") != -1 ||
posts[i].innerHTML.indexOf("The Web site might be experiencing technical difficulties") != -1 ||
posts[i].innerHTML.indexOf("m knwq lqwmlgaqtktixlmbcwca") != -1 ||
posts[i].innerHTML.indexOf("r qonl jsf udsyn") != -1 ||
posts[i].innerHTML.indexOf("ohi gui ft3 4w") != -1 ||
posts[i].innerHTML.indexOf("Ph'nglui mglw'nafh") != -1 ||
posts[i].innerHTML.indexOf("El Servidor de nombres de dominio") != -1 ||
posts[i].innerHTML.indexOf("The Domain Name Server (DNS) does not have") != -1 ||
posts[i].innerHTML.indexOf("settings for SSL 2.0, SSL 3.0, TLS 1.0, PCT 1.0") != -1 ||
posts[i].innerHTML.indexOf("Die Navigation zu der Webseite") != -1 ||
posts[i].innerHTML.indexOf("No se pudo encontrar") != -1 ||
posts[i].innerHTML.indexOf("dq qqabhd ttwilqtwwtqsajl") != -1 ||
posts[i].innerHTML.indexOf("z ef ab bbn evgd") != -1 ||
posts[i].innerHTML.indexOf("Acción cancelada") != -1 ||
posts[i].innerHTML.indexOf("Die Navigation zu der Webseite wurde abgebrochen") != -1 ||
posts[i].innerHTML.indexOf("Navigation to the webpage was canceled") != -1 ||
posts[i].innerHTML.indexOf("L'esplorazione della pagina") != -1 ||
posts[i].innerHTML.indexOf("f nhj s qj o fzwt") != -1 ||
posts[i].innerHTML.indexOf("sq gp gb bzcutdvdforob") != -1 ||
posts[i].innerHTML.indexOf("cliudzylfiiigiiv") != -1 ||
posts[i].innerHTML.indexOf("Die Seite kann nicht angezeigt werden") != -1 ||
posts[i].innerHTML.indexOf("Navigation vers la page Web annulée") != -1 ||
posts[i].innerHTML.indexOf("Navigation vers la page Web annulée") != -1 ||
posts[i].innerHTML.indexOf("Impossibile visualizzare la pagina") != -1 ||
posts[i].innerHTML.indexOf("Página não encontrada") != -1 ||
posts[i].innerHTML.indexOf("Não é possível localizar a página da Web") != -1 ||
posts[i].innerHTML.indexOf("לבקר באתר") != -1 ||
posts[i].innerHTML.indexOf("רענן את הדף.") != -1 ||
posts[i].innerHTML.indexOf("τοποθεσία") != -1 ||
posts[i].innerHTML.indexOf("(HTTP 404 Not Found)") != -1 ||
posts[i].innerHTML.indexOf("(HTTP 404 Non trouvé)") != -1 ||
posts[i].innerHTML.indexOf("(HTTP 404 Nicht gefunden)") != -1 ||
posts[i].innerHTML.indexOf("(HTTP 404 No se encuentra)") != -1 ||
posts[i].innerHTML.indexOf("utilisez votre identifiant client.") != -1 ||
posts[i].innerHTML.indexOf("oudipa pdoq iamvlqsua") != -1 ||
posts[i].innerHTML.indexOf("Dal menu Strumenti") != -1 ||
posts[i].innerHTML.indexOf("A navegação para a página") != -1 ||
posts[i].innerHTML.indexOf("Archivo no encontrado") != -1 ||
posts[i].innerHTML.indexOf("Нет доступа к DNS-серверу.") != -1 ||
posts[i].innerHTML.indexOf("For information about offline browsing with Internet Explorer") != -1 ||
posts[i].innerHTML.indexOf("Le serveur de noms") != -1 ||
posts[i].innerHTML.indexOf("Este programa não pode exibir a página da Web") != -1 ||
posts[i].innerHTML.indexOf("Kliknij menu Narzędzia, a następnie") != -1 ||
posts[i].innerHTML.indexOf("Cherry_camel@hotmail.com") != -1 ||
posts[i].innerHTML.indexOf("Lighter_Candy@hotmail.com") != -1 ||
posts[i].innerHTML.indexOf("http://trashonthis.com/4chan/") != -1 ||
posts[i].innerHTML.indexOf("http://h1.ripway.com/taser/") != -1 ||
posts[i].innerHTML.indexOf("http://h1.ripwery.com/terser/") != -1 ||
posts[i].innerHTML.indexOf("http://www.e-castig.com/index.php?r=r1j5D") != -1 ||
posts[i].innerHTML.indexOf("Want to spam 4chan like me? Get the tool here!") != -1 ||
posts[i].innerHTML.indexOf("You MUST Read our Terms of Service Agreement") != -1 ||
posts[i].innerHTML.indexOf("Lawl just found a great source of Jailbait and epicness!") != -1 ||
posts[i].innerHTML.indexOf("Here is the new 4Chan spammer everyone is talking about.") != -1 ||
posts[i].innerHTML.indexOf("http://investorrehablist.com/DDoSer.exe") != -1 ||
posts[i].innerHTML.indexOf("Kliknij menu Narzędzia, a następnie kliknij polecenie Opcje internetowe.") != -1 ||
posts[i].innerHTML.indexOf("Dieses Programm kann die Webseite nicht anzeigen.") != -1 ||
posts[i].innerHTML.indexOf("A página não pode ser exibida") != -1 ||
posts[i].innerHTML.indexOf("Tempo limite da sessão") != -1 ||
posts[i].innerHTML.indexOf("www.watchmygf.com") != -1 ||
posts[i].innerHTML.indexOf("Pour vous connecter au service FreeWiFi") != -1 ||
posts[i].innerHTML.indexOf("2. Remove Penis From Pants") != -1 ||
posts[i].innerHTML.indexOf("NewBlog.com") != -1 ||
posts[i].innerHTML.indexOf("The script even blocks this actual post!") != -1 ||
posts[i].innerHTML.indexOf("Through a peculiar turn of events, the version of GNU") != -1 ||
posts[i].innerHTML.indexOf("iOW3r-") != -1 ||
posts[i].innerHTML.indexOf("Steps to unlocking a 4chan Gold Account") != -1 ||
posts[i].innerHTML.indexOf("Fucking littered with bullshit holes and is comprised of a forest of malware.") != -1 ||
posts[i].innerHTML.indexOf("Ripway Web Hosting") != -1 ||
posts[i].innerHTML.indexOf("MOOTSECRET.com") != -1 ||
posts[i].innerHTML.indexOf("mootsecret.com") != -1 ||
posts[i].innerHTML.indexOf("et souhaitez") != -1 ||
posts[i].innerHTML.indexOf("While i've got you here manually breathing, blinking") != -1 ||
posts[i].innerHTML.indexOf("It shouldn't be too long before things are on track") != -1 ||
posts[i].innerHTML.indexOf("Nawigacja do strony sieci Web została anulowana") != -1 ||
posts[i].innerHTML.indexOf("Megan Fox's sex tape! Fapfapfapfapfafpafpapfpap") != -1 ||
posts[i].innerHTML.indexOf("υπολογιστή") != -1 ||
posts[i].innerHTML.indexOf("http://tossdown.com/cam.php") != -1 ||
posts[i].innerHTML.indexOf("MEGAN FOX") != -1 ||
posts[i].innerHTML.indexOf("The source of the *new* spam isn't from kimmo") != -1 ||
posts[i].innerHTML.indexOf("TAZERZ AND D34TH WILL NEVER STOP") != -1 ||
posts[i].innerHTML.indexOf("www.hyperbolicbubble.com For live stream of pokemon and raid chat") != -1 ||
posts[i].innerHTML.indexOf("http://short.ie/po7e4h") != -1 ||
posts[i].innerHTML.indexOf("How to get a 4chan Gold Account:") != -1 ||
posts[i].innerHTML.indexOf("Account SuspendedThis Account Has Been Suspended") != -1 ||
posts[i].innerHTML.indexOf("Declaring WAR against /b/") != -1 ||
posts[i].innerHTML.indexOf("Blair Approves.") != -1 ||
posts[i].innerHTML.indexOf("BlaiR") != -1 ||
posts[i].innerHTML.indexOf("ANONRAIDBOARD.com") != -1 ||
posts[i].innerHTML.indexOf("The requested URL /4spam/4spam.txt was not found on this server.") != -1 ||
posts[i].innerHTML.indexOf("THEREPY OR TALK TO A DOCTOR ABOUT THIS SHIT BECAUSE ITS AGAINST") != -1 ||
posts[i].innerHTML.indexOf("und3r574nd") != -1 ||
posts[i].innerHTML.indexOf("tinychat/battletoadz") != -1 ||
posts[i].innerHTML.indexOf("tinychat/battletoadsnow") != -1 ||
posts[i].innerHTML.indexOf("tinychat/battletoadx") != -1 ||
posts[i].innerHTML.indexOf("ωнαтѕ ωσяѕє ιѕ αηуσηє gσιηg") != -1 ||
posts[i].innerHTML.indexOf("La pagina Web non è disponibile perché l'utente non è in linea") != -1 ||
posts[i].innerHTML.indexOf("HTTP 404 - File not found") != -1 ||
posts[i].innerHTML.indexOf("http://userscripts.org/scripts/show/33916") != -1 ||
posts[i].innerHTML.indexOf("http://l4u.us/c/DHg") != -1 ||
posts[i].innerHTML.indexOf("http://www.mspointsgenerators.com") != -1 ||
posts[i].innerHTML.indexOf("http://www.laquadrature.net/files/201001_acta.pdf") != -1 ||
posts[i].innerHTML.indexOf("http://www.qwerf.com/?page_id=214") != -1 ||
posts[i].innerHTML.indexOf("A URL solicitada não pode ser recuperada") != -1 ||
posts[i].innerHTML.indexOf("uploaded by our members copyright © 2002 - 2005 Ripside Interactive") != -1 ||
posts[i].innerHTML.indexOf("Provare a eseguire le operazioni seguenti:") != -1 ||
posts[i].innerHTML.indexOf("http://derkaderka.1337hosting.info/cgi-sys/suspendedpage.cgi") != -1 ||
posts[i].innerHTML.indexOf("http://derkaderka.1337hosting.info/4spammer.txt") != -1 ||
posts[i].innerHTML.indexOf("4spam/4spam.txt") != -1 ||
posts[i].innerHTML.indexOf("Soon...") != -1 ||
posts[i].innerHTML.indexOf("https://www.dropbox.com/referrals/NTE3ODQ4NTk") != -1 ||
posts[i].innerHTML.indexOf("mod_ssl/2.2.15 OpenSSL/0.9.8m DAV/2") != -1 ||
posts[i].innerHTML.indexOf("2. Click a few links.") != -1 ||
posts[i].innerHTML.indexOf("http://stashbox.org/831954/textupload.txt") != -1 ||
posts[i].innerHTML.indexOf("F14 key") != -1 ||
posts[i].innerHTML.indexOf("Se canceló la navegación") != -1 ||
posts[i].innerHTML.indexOf("m//y//f//r//e//e//c//a//m//s//") != -1 ||
posts[i].innerHTML.indexOf("Chris brown VS Rihanna") != -1 ||
posts[i].innerHTML.indexOf("pair of ducks") != -1 ||
posts[i].innerHTML.indexOf("http://forumsetter.co.cc") != -1 ||
posts[i].innerHTML.indexOf("Il Girasole Centro Estetico") != -1 ||
posts[i].innerHTML.indexOf("http://rapidshare.com/files/368579629/Fake_Webcam_6.1__FFF__Keygen_Included.rar") != -1)
		{
			posts[i].parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(posts[i].parentNode.parentNode.parentNode.parentNode);
			i = i - 1;
		}
	}
})()


document.getElementsByName("email", "input")[0].value = "noko";
CheckScriptForUpdate = {
              // 
 id: '71271', // 
 days: 1,     // 
 
 // 
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
 time: new Date().getTime(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  onload: function(xpr) {AnotherAutoUpdater.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      this.xversion = this.xversion[1].replace(/\./g, '');
      this.xname = this.xname[1];
    } else {
      if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
	GM_setValue('updated_'+this.id, 'off');
      return false;
    }
    if ( (+this.xversion > +this.version) && (confirm('There is a new update to '+this.xname+' . Do you want to update? Please give a positive review if you like it.')) ) {
      GM_setValue('updated_'+this.id, this.time+'');
      top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
    } else if ( (this.xversion) && (+this.xversion > +this.version) ) {
      if(confirm('Are you sure you want to turn off auto updating for this script?')) {
	GM_setValue('updated_'+this.id, 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated_'+this.id, new Date().getTime()+''); AnotherAutoUpdater.call(true);});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
	GM_setValue('updated_'+this.id, this.time+'');
      }
    } else {
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated_'+this.id, this.time+'');
    }
  },
 check: function() {
    if (GM_getValue('updated_'+this.id, 0) == 0) GM_setValue('updated_'+this.id, this.time+'');
    if ( (GM_getValue('updated_'+this.id, 0) != 'off') && (+this.time > (+GM_getValue('updated_'+this.id, 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated_'+this.id, 0) == 'off') {
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    } else {
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    }
    }
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AnotherAutoUpdater.check();