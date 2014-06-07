// ==UserScript==
// @name           test
// @namespace      ee
// @description    removes all current spam posts
// Author: ee
// @include        *4chan.org*
// @include        http://img.4chan.org/*
// @include        http://zip.4chan.org/*
// @include        http://cgi.4chan.org/*
// @include        http://orz.4chan.org/*
// @include        http://boards.4chan.org/*
// @license        Copyright (c) 2010 ee
// ==/UserScript==

// ==UserScript==
// @name           my 4chan antispam
// @namespace      ee
// @description    removes all current spam
// Author: ee
// @include        *4chan.org*
// @include        http://img.4chan.org/*
// @include        http://zip.4chan.org/*
// @include        http://cgi.4chan.org/*
// @include        http://orz.4chan.org/*
// @include        http://boards.4chan.org/*
// @license        Copyright (c) 2010 ee
// ==/UserScript==

(function() {
	var posts = document.getElementsByTagName("blockquote");
	for (i = 0; i < posts.length; i++)
	{
		if (          
posts[i].innerHTML.indexOf("http://www.youtube.com/watch?v=0EOc6y3Wd6U") != -1 || 
posts[i].innerHTML.indexOf("scapegoat is awesome --- subwar") != -1 ||
posts[i].innerHTML.indexOf("404 Not Found") != -1 ||
posts[i].innerHTML.indexOf("brazzers") != -1 ||
posts[i].innerHTML.indexOf(":)) super funny :))") != -1 ||
posts[i].innerHTML.indexOf("a winrar will be selected at random") != -1 ||
posts[i].innerHTML.indexOf("(visit Link)") != -1 ||
posts[i].innerHTML.indexOf("JESSIE SLAUGHTERS") != -1 ||
posts[i].innerHTML.indexOf("= VIRUS") != -1 ||
posts[i].innerHTML.indexOf("= virus") != -1 ||
posts[i].innerHTML.indexOf("--- NEW IMAGE BOARD! ---") != -1 ||
posts[i].innerHTML.indexOf("bbw-chan") != -1 ||
posts[i].innerHTML.indexOf("free 5$") != -1 ||
posts[i].innerHTML.indexOf("http://tessatheslut.com?id=heg1s2qwrkw3cqs1ghi9dtym8hup8d") != -1 ||
posts[i].innerHTML.indexOf("Free Service to send anon") != -1 ||
posts[i].innerHTML.indexOf("filebox") != -1 ||
posts[i].innerHTML.indexOf("m0neydavis") != -1 ||
posts[i].innerHTML.indexOf("emap") != -1 ||
posts[i].innerHTML.indexOf("gd/djy87") != -1 ||
posts[i].innerHTML.indexOf("Can it be time /b/?") != -1 ||
posts[i].innerHTML.indexOf("cynistergaming") != -1 ||
posts[i].innerHTML.indexOf("Lets spam for now!") != -1 ||
posts[i].innerHTML.indexOf("the Dropboxers") != -1 ||
posts[i].innerHTML.indexOf("hotgirlsofmyspace.com") != -1 ||
posts[i].innerHTML.indexOf("Free cp and") != -1 ||
posts[i].innerHTML.indexOf("DDoS'er") != -1 ||
posts[i].innerHTML.indexOf("filmz.ru") != -1 ||
posts[i].innerHTML.indexOf("2004836") != -1 ||
posts[i].innerHTML.indexOf("Free_Porn_Sex_Porno") != -1 ||
posts[i].innerHTML.indexOf("surgeon is") != -1 ||
posts[i].innerHTML.indexOf("OP is fag. download this") != -1 ||
posts[i].innerHTML.indexOf("4Chan spammer") != -1 ||
posts[i].innerHTML.indexOf("GuruForums") != -1 ||
posts[i].innerHTML.indexOf("the surgeon") != -1 ||
posts[i].innerHTML.indexOf("gay orderly") != -1 ||
posts[i].innerHTML.indexOf("sitesword") != -1 ||
posts[i].innerHTML.indexOf("Girl-blows-her-boyfriend") != -1 ||
posts[i].innerHTML.indexOf("saweeteva") != -1 ||
posts[i].innerHTML.indexOf("alexjwhite") != -1 ||
posts[i].innerHTML.indexOf("2 dollar a minute") != -1 ||
posts[i].innerHTML.indexOf("bDoS v1.2") != -1 ||
posts[i].innerHTML.indexOf("here: HUGE SUCCESSS!") != -1 ||
posts[i].innerHTML.indexOf("This was a triumph... I'm") != -1 ||
posts[i].innerHTML.indexOf("This was a triumph.. Im") != -1 ||
posts[i].innerHTML.indexOf("?? all you") != -1 ||
posts[i].innerHTML.indexOf("http://rapidshare.com/files/204581403/Frauen-Mit-Schwanz-Und-Fotze-Real-Hermaphrodite.rar") != -1 ||
posts[i].innerHTML.indexOf("FUCKING CANCER") != -1 ||
posts[i].innerHTML.indexOf("http://model.japanesecutegirl.com/meet-4-million-people/") != -1 ||
posts[i].innerHTML.indexOf("http://NotPoor.com") != -1 ||
posts[i].innerHTML.indexOf("goonflayvinations") != -1 ||
posts[i].innerHTML.indexOf("http://youyoungs.com/fr/ddos.exe") != -1 ||
posts[i].innerHTML.indexOf("call me at 949-945-4704") != -1 ||
posts[i].innerHTML.indexOf("http://www.youtube.com/watch?v=OpeLoOkZMJs") != -1 ||
posts[i].innerHTML.indexOf("http://rapidshare.com/files/204502721/brunette-fucked-roughly_video.rar") != -1 ||
posts[i].innerHTML.indexOf("money making e-book") != -1 ||
posts[i].innerHTML.indexOf("nigger bitch gets fucked in park") != -1 ||
posts[i].innerHTML.indexOf("http://rapidshare.com/files/137512436/Juan_Gotoh_-_Graduation_And_Beheading_Ceremony__guro_.zip") != -1 ||
posts[i].innerHTML.indexOf("Upload a picture in 9 seconds") != -1 ||
posts[i].innerHTML.indexOf("I wish my girl would do this to me") != -1 ||
posts[i].innerHTML.indexOf("http://rapidshare.com/files/204719651/nikita.denise_blow.and.fuck.2_privatamateure.rar") != -1 ||
posts[i].innerHTML.indexOf("I wonder what he thinks if he wake up") != -1 ||
posts[i].innerHTML.indexOf("this is how a penetrate my girl") != -1 ||
posts[i].innerHTML.indexOf("http://rapidshare.com/files/204585642/PhotoSurprise.rar") != -1 ||
posts[i].innerHTML.indexOf("http://rapidshare.com/files/204501029/blond_super_tits.rar") != -1 ||
posts[i].innerHTML.indexOf("http://rapidshare.com/files/204593014/Tight_Skinny_Teen.rar") != -1 ||
posts[i].innerHTML.indexOf("I wish I would be a student again") != -1 ||
posts[i].innerHTML.indexOf("http://rapidshare.com/files/212723407/JB.part1.rar") != -1 ||
posts[i].innerHTML.indexOf("http://rapidshare.com/files/286922424/girls_fucked_while_playing_n64.wmv.wmv") != -1 ||
posts[i].innerHTML.indexOf("http://rapidshare.com/files/204583590/little_asian_girl.rar") != -1 ||
posts[i].innerHTML.indexOf("Why should only /d/ have all the fun") != -1 ||
posts[i].innerHTML.indexOf("http://rapidshare.com/files/286921477/ASoutdoor.wmv") != -1 ||
posts[i].innerHTML.indexOf("bitch takes all the load in park") != -1 ||
posts[i].innerHTML.indexOf("free money pdf worth 650") != -1 ||
posts[i].innerHTML.indexOf("money making pdf") != -1 ||
posts[i].innerHTML.indexOf("sexianny.blogypage") != -1 ||
posts[i].innerHTML.indexOf("blogangelz") != -1 ||
posts[i].innerHTML.indexOf("sesyann90.bl0gangelz") != -1 ||
posts[i].innerHTML.indexOf("money making ebook") != -1 ||
posts[i].innerHTML.indexOf("tinychat,com/probsty") != -1 ||
posts[i].innerHTML.indexOf("http://joebiellik.co.uk/surgeon/index.html") != -1 ||
posts[i].innerHTML.indexOf("thelongdistanceloverfund@gmail.com") != -1 ||
posts[i].innerHTML.indexOf("http://www.facebook.com/pages/my-girlfriend-LOL/122260771140266") != -1 ||
posts[i].innerHTML.indexOf("tinyurl") != -1 ||
posts[i].innerHTML.indexOf("Sefernday") != -1 ||
posts[i].innerHTML.indexOf("blame Pnårp") != -1 ||
posts[i].innerHTML.indexOf("OH GOD MY MIND IS BLOWN!!!") != -1 ||
posts[i].innerHTML.indexOf("fapwall") != -1 ||
posts[i].innerHTML.indexOf("Commune with me, my sons and daughters.") != -1 ||
posts[i].innerHTML.indexOf("") != -1 ||
posts[i].innerHTML.indexOf("") != -1 ||
posts[i].innerHTML.indexOf("") != -1 ||
posts[i].innerHTML.indexOf("") != -1 ||
posts[i].innerHTML.indexOf("CANCERCANCERCANCERCANCERCANCERCANCERCANCER") != -1 ||
posts[i].innerHTML.indexOf("There are CHANGES happening, man.") != -1 ||
posts[i].innerHTML.indexOf("OMG I JUST WATCHED THE MEGAN") != -1 ||
posts[i].innerHTML.indexOf("sweetvirgincam.co.cc") != -1 ||
posts[i].innerHTML.indexOf("Untold hundreds of 4chan") != -1 ||
posts[i].innerHTML.indexOf("Want a place to blog freely") != -1 ||
posts[i].innerHTML.indexOf("DELEETE DA STUPID") != -1 ||
posts[i].innerHTML.indexOf("Love.the surgeon") != -1 ||
posts[i].innerHTML.indexOf("Love the surgeon") != -1 ||
posts[i].innerHTML.indexOf("Fail Ninja again") != -1 ||
posts[i].innerHTML.indexOf("Tom Hall") != -1 ||
posts[i].innerHTML.indexOf("DO NOT POST the contents here") != -1 ||
posts[i].innerHTML.indexOf("syystÃƒÆ’Ã‚Â¤") != -1 ||
posts[i].innerHTML.indexOf("spread the word we all need to see it") != -1 ||
posts[i].innerHTML.indexOf("SAVAGE, it's cooler than your mother") != -1 ||
posts[i].innerHTML.indexOf("M@GE3") != -1 ||
posts[i].innerHTML.indexOf("[Hop@+") != -1 ||
posts[i].innerHTML.indexOf("shut down /b/. don't let us") != -1 ||
posts[i].innerHTML.indexOf("f5 to wade through shitty") != -1 ||
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
posts[i].innerHTML.indexOf("e-castig.com") != -1 ||
posts[i].innerHTML.indexOf("tinychat()com / lolpranx") != -1 ||
posts[i].innerHTML.indexOf("wikipedia.com/w/index.php?title=User:The_Thing_That_Should_Not_Be&action=edit&section=new") != -1 ||
posts[i].innerHTML.indexOf("http://www.h8u.info/?id=h3bt6xpx3hdw4r4zpcq86ah1l2pf0m") != -1 ||
posts[i].innerHTML.indexOf("http://cheekyrevenge.com/hayley/index.php?id=558961846e4895449570eb02c1294a3a") != -1 ||
posts[i].innerHTML.indexOf("its(o)over9000.net") != -1 ||
posts[i].innerHTML.indexOf("NO SHARECASH BULLSHIT") != -1 ||
posts[i].innerHTML.indexOf("FOURCHANRAID.com") != -1 ||
posts[i].innerHTML.indexOf("FemanonChan.com") != -1 ||   
posts[i].innerHTML.indexOf("/4Spam/message.txt") != -1 ||
posts[i].innerHTML.indexOf("4changold.net") != -1 ||
posts[i].innerHTML.indexOf("2. Click a link") != -1 ||
posts[i].innerHTML.indexOf("4ChanSecrets.info") != -1 ||
posts[i].innerHTML.indexOf("ofni.stercesnahC4") != -1 ||
posts[i].innerHTML.indexOf("OFNI.STERCESNAHC4") != -1 ||
posts[i].innerHTML.indexOf("4ChanGold*net") != -1 ||
posts[i].innerHTML.indexOf("korruptz.net") != -1 ||
posts[i].innerHTML.indexOf("Join 'Single' Clan") != -1 ||
posts[i].innerHTML.indexOf("Clan chat for epic lulz") != -1 ||
posts[i].innerHTML.indexOf("arsenic.typefrag.com") != -1 ||
posts[i].innerHTML.indexOf("There are changes happening, not all of them good") != -1 ||
posts[i].innerHTML.indexOf("a n o n t a l k") != -1 ||
posts[i].innerHTML.indexOf("anontalk") != -1 ||
posts[i].innerHTML.indexOf("Anontalk") != -1 ||
posts[i].innerHTML.indexOf("5. cumdumpsters!!!!") != -1 ||
posts[i].innerHTML.indexOf("WWw.AnÃƒÂ¯Ã‚Â½Ã‚ÂNÃƒÂ¯Ã‚Â¼Ã‚Â´aÃƒÂ¯Ã‚Â¼Ã‚Â¬K.cÃƒÂ¯Ã‚Â¼Ã‚Â¯M") != -1 ||
posts[i].innerHTML.indexOf("http://www.hackthat.net/df/ddos/100970/index.hack") != -1 ||
posts[i].innerHTML.indexOf("paybackmegan.net") != -1 ||
posts[i].innerHTML.indexOf("SAGE") != -1 ||
posts[i].innerHTML.indexOf("THE 4CHAN.org/porn") != -1 ||
posts[i].innerHTML.indexOf("ÃƒÂ°Ã‚ÂÃ‚ÂÃ¢â‚¬Â") != -1 ||
posts[i].innerHTML.indexOf("ÃƒÂ°Ã‚ÂÃ¢â‚¬ÂÃ¢â€šÂ¬") != -1 ||
posts[i].innerHTML.indexOf("ð”€") != -1 ||
posts[i].innerHTML.indexOf("ð›") != -1 ||
posts[i].innerHTML.indexOf("ð‘¨") != -1 ||
posts[i].innerHTML.indexOf("𝛍") != -1 ||
posts[i].innerHTML.indexOf("𝑨") != -1 ||
posts[i].innerHTML.indexOf("user Account Excceded Bandwidth") != -1 ||
posts[i].innerHTML.indexOf("ÃƒÂ¯Ã‚Â¼Ã‚Â¹ÃƒÂ¯Ã‚Â¼Ã‚Â® k ÃƒÂ¯Ã‚Â¼Ã‚Âµ") != -1 ||
posts[i].innerHTML.indexOf("EDWARD JOHNSON RECKONS") != -1 ||
posts[i].innerHTML.indexOf("channers.ourtoolbar") != -1 ||
posts[i].innerHTML.indexOf("ÃƒÂ°Ã‚ÂÃ¢â‚¬ÂºÃ‚Â") != -1 ||
posts[i].innerHTML.indexOf("definiÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Âµes de ligaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o") != -1 ||
posts[i].innerHTML.indexOf("freeps3.tv") != -1 ||
posts[i].innerHTML.indexOf("www.envirofile") != -1 ||
posts[i].innerHTML.indexOf("Blogging | Contact") != -1 ||
posts[i].innerHTML.indexOf("votre citÃƒÆ’Ã‚Â© universitaire") != -1 ||
posts[i].innerHTML.indexOf("ÃƒÆ’Ã‚Ândices e conteÃƒÆ’Ã‚Âºdos") != -1 ||
posts[i].innerHTML.indexOf("nginx/0.6.39") != -1 ||
posts[i].innerHTML.indexOf("http://8.ly/b9d?") != -1 ||
posts[i].innerHTML.indexOf("gro.nahCnonameF") != -1 ||
posts[i].innerHTML.indexOf("freestarcraft2beta.blogspot") != -1 ||
posts[i].innerHTML.indexOf("You get 2GB just for signing up") != -1 ||
posts[i].innerHTML.indexOf("ÃƒÂ¯Ã‚Â½Ã¢â‚¬ÂÃƒÂ¯Ã‚Â¼Ã‚Â¡ÃƒÂ¯Ã‚Â½Ã…â€™ÃƒÂ¯Ã‚Â½Ã¢â‚¬Â¹.cÃƒÂ¯Ã‚Â¼Ã‚Â¯m") != -1 ||
posts[i].innerHTML.indexOf("4.chantard.org/tits") != -1 ||
posts[i].innerHTML.indexOf("(ÃƒÂ¯Ã‚Â¼Ã‚Â¡ÃƒÂ¯Ã‚Â¼Ã‚Â«a ÃƒÂ¯Ã‚Â¼Ã‚Â­ÃƒÂ¯Ã‚Â¼Ã‚Â¯oÃƒÂ¯Ã‚Â½Ã¢â‚¬Â)") != -1 ||
posts[i].innerHTML.indexOf("Ãƒâ€”Ã¢â‚¬Â¢Ãƒâ€”Ã‚ÂÃƒâ€”Ã¢â€žÂ¢Ãƒâ€”Ã‚ Ãƒâ€”Ã¢â‚¬Å“Ãƒâ€”Ã‚Â§Ãƒâ€”Ã‚Â¡") != -1 ||
posts[i].innerHTML.indexOf("Impossible d'afficher la page") != -1 ||
posts[i].innerHTML.indexOf("tits.4.chantard.org") != -1 ||
posts[i].innerHTML.indexOf("moc.nahCnonameF") != -1 ||
posts[i].innerHTML.indexOf("kan geen verbinding met") != -1 ||
posts[i].innerHTML.indexOf("Web site might be experiencing") != -1 ||
posts[i].innerHTML.indexOf("m knwq lqwmlgaqtktixlmbcwca") != -1 ||
posts[i].innerHTML.indexOf("r qonl jsf udsyn") != -1 ||
posts[i].innerHTML.indexOf("ohi gui ft3 4w") != -1 ||
posts[i].innerHTML.indexOf("Ph'nglui mglw'nafh") != -1 ||
posts[i].innerHTML.indexOf("El Servidor de nombres") != -1 ||
posts[i].innerHTML.indexOf("(DNS) does not have") != -1 ||
posts[i].innerHTML.indexOf("settings for SSL 2.0") != -1 ||
posts[i].innerHTML.indexOf("Navigation zu der Webseite") != -1 ||
posts[i].innerHTML.indexOf("No se pudo encontrar") != -1 ||
posts[i].innerHTML.indexOf("ttwilqtwwtqsajl") != -1 ||
posts[i].innerHTML.indexOf("z ef ab bbn evgd") != -1 ||
posts[i].innerHTML.indexOf("cancelada") != -1 ||
posts[i].innerHTML.indexOf("der Webseite wurde abgebrochen") != -1 ||
posts[i].innerHTML.indexOf("Navigation to the webpage was canceled") != -1 ||
posts[i].innerHTML.indexOf("L'esplorazione della pagina") != -1 ||
posts[i].innerHTML.indexOf("f nhj s qj o fzwt") != -1 ||
posts[i].innerHTML.indexOf("sq gp gb bzcutdvdforob") != -1 ||
posts[i].innerHTML.indexOf("cliudzylfiiigiiv") != -1 ||
posts[i].innerHTML.indexOf("kann nicht angezeigt werden") != -1 ||
posts[i].innerHTML.indexOf("Navigation vers la page") != -1 ||
posts[i].innerHTML.indexOf("Impossibile visualizzare la pagina") != -1 ||
posts[i].innerHTML.indexOf("PÃƒÆ’Ã‚Â¡gina nÃƒÆ’Ã‚Â£o encontrada") != -1 ||
posts[i].innerHTML.indexOf("NÃƒÆ’Ã‚Â£o ÃƒÆ’Ã‚Â© possÃƒÆ’Ã‚Â­vel localizar") != -1 ||
posts[i].innerHTML.indexOf("Ãƒâ€”Ã…â€œÃƒâ€”Ã¢â‚¬ËœÃƒâ€”Ã‚Â§Ãƒâ€”Ã‚Â¨ Ãƒâ€”Ã¢â‚¬ËœÃƒâ€”Ã‚ÂÃƒâ€”Ã‚ÂªÃƒâ€”Ã‚Â¨") != -1 ||
posts[i].innerHTML.indexOf("Ãƒâ€”Ã‚Â¨Ãƒâ€”Ã‚Â¢Ãƒâ€”Ã‚ Ãƒâ€”Ã…Â¸ Ãƒâ€”Ã‚ÂÃƒâ€”Ã‚Âª Ãƒâ€”Ã¢â‚¬ÂÃƒâ€”Ã¢â‚¬Å“Ãƒâ€”Ã‚Â£.") != -1 ||
posts[i].innerHTML.indexOf("ÃƒÂÃ¢â‚¬Å¾ÃƒÅ½Ã‚Â¿ÃƒÂÃ¢â€šÂ¬ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â¸ÃƒÅ½Ã‚ÂµÃƒÂÃ†â€™ÃƒÅ½Ã‚Â¯ÃƒÅ½Ã‚Â±") != -1 ||
posts[i].innerHTML.indexOf("(404") != -1 ||
posts[i].innerHTML.indexOf("utilisez votre identifiant client.") != -1 ||
posts[i].innerHTML.indexOf("oudipa pdoq iamvlqsua") != -1 ||
posts[i].innerHTML.indexOf("Dal menu Strumenti") != -1 ||
posts[i].innerHTML.indexOf("A navegaÃƒÆ’Ã‚Â§ÃƒÆ’Ã‚Â£o para a pÃƒÆ’Ã‚Â¡gina") != -1 ||
posts[i].innerHTML.indexOf("Archivo no encontrado") != -1 ||
posts[i].innerHTML.indexOf("ÃƒÂÃ‚ÂÃƒÂÃ‚ÂµÃƒâ€˜Ã¢â‚¬Å¡ ÃƒÂÃ‚Â´ÃƒÂÃ‚Â¾Ãƒâ€˜Ã‚ÂÃƒâ€˜Ã¢â‚¬Å¡Ãƒâ€˜Ã†â€™ÃƒÂÃ‚Â¿ÃƒÂÃ‚Â° ÃƒÂÃ‚Âº DNS-Ãƒâ€˜Ã‚ÂÃƒÂÃ‚ÂµÃƒâ€˜Ã¢â€šÂ¬ÃƒÂÃ‚Â²ÃƒÂÃ‚ÂµÃƒâ€˜Ã¢â€šÂ¬Ãƒâ€˜Ã†â€™.") != -1 ||
posts[i].innerHTML.indexOf("For information about offline") != -1 ||
posts[i].innerHTML.indexOf("Le serveur de noms") != -1 ||
posts[i].innerHTML.indexOf("Este programa") != -1 ||
posts[i].innerHTML.indexOf("Kliknij menu NarzÃƒâ€žÃ¢â€žÂ¢dzia, a nastÃƒâ€žÃ¢â€žÂ¢pnie") != -1 ||
posts[i].innerHTML.indexOf("Cherry_camel@hotmail.com") != -1 ||
posts[i].innerHTML.indexOf("Lighter_Candy@hotmail.com") != -1 ||
posts[i].innerHTML.indexOf("trashonthis") != -1 ||
posts[i].innerHTML.indexOf("h1.ripway") != -1 ||
posts[i].innerHTML.indexOf("Want to spam 4chan like me") != -1 ||
posts[i].innerHTML.indexOf("You MUST Read our Terms of Service Agreement") != -1 ||
posts[i].innerHTML.indexOf("Lawl just found a great source") != -1 ||
posts[i].innerHTML.indexOf("Here is the new 4Chan spammer") != -1 ||
posts[i].innerHTML.indexOf("investorrehablist") != -1 ||
posts[i].innerHTML.indexOf("Kliknij menu NarzÃƒâ€žÃ¢â€žÂ¢dzia") != -1 ||
posts[i].innerHTML.indexOf("Dieses Programm kann die") != -1 ||
posts[i].innerHTML.indexOf("A pÃƒÆ’Ã‚Â¡gina nÃƒÆ’Ã‚Â£o pode") != -1 ||
posts[i].innerHTML.indexOf("Tempo limite da sessÃƒÆ’Ã‚Â£o") != -1 ||
posts[i].innerHTML.indexOf("watchmygf") != -1 ||
posts[i].innerHTML.indexOf("Pour vous connecter au service FreeWiFi") != -1 ||
posts[i].innerHTML.indexOf("2. Remove Penis") != -1 ||
posts[i].innerHTML.indexOf("NewBlog.com") != -1 ||
posts[i].innerHTML.indexOf("The script even blocks this actual post!") != -1 ||
posts[i].innerHTML.indexOf("events, the version of GNU") != -1 ||
posts[i].innerHTML.indexOf("iOW3r-") != -1 ||
posts[i].innerHTML.indexOf("Steps to unlocking a 4chan Gold Account") != -1 ||
posts[i].innerHTML.indexOf("Fucking littered with bullshit holes and is comprised.") != -1 ||
posts[i].innerHTML.indexOf("Ripway Web Hosting") != -1 ||
posts[i].innerHTML.indexOf("MOOTSECRET.com") != -1 ||
posts[i].innerHTML.indexOf("mootsecret.com") != -1 ||
posts[i].innerHTML.indexOf("et souhaitez") != -1 ||
posts[i].innerHTML.indexOf("While i've got you here manually breathing, blinking") != -1 ||
posts[i].innerHTML.indexOf("It shouldn't be too long before things are on track") != -1 ||
posts[i].innerHTML.indexOf("Nawigacja do strony sieci Web zostaÃƒâ€¦Ã¢â‚¬Å¡a anulowana") != -1 ||
posts[i].innerHTML.indexOf("Megan Fox's sex tape! Fapfapfapfapfafpafpapfpap") != -1 ||
posts[i].innerHTML.indexOf("ÃƒÂÃ¢â‚¬Â¦ÃƒÂÃ¢â€šÂ¬ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â»ÃƒÅ½Ã‚Â¿ÃƒÅ½Ã‚Â³ÃƒÅ½Ã‚Â¹ÃƒÂÃ†â€™ÃƒÂÃ¢â‚¬Å¾ÃƒÅ½Ã‚Â®") != -1 ||
posts[i].innerHTML.indexOf("tossdown.com") != -1 ||
posts[i].innerHTML.indexOf("MEGAN FOX") != -1 ||
posts[i].innerHTML.indexOf("*new* spam isn't from kimmo") != -1 ||
posts[i].innerHTML.indexOf("TAZERZ AND D34TH WILL NEVER STOP") != -1 ||
posts[i].innerHTML.indexOf("hyperbolicbubble") != -1 ||
posts[i].innerHTML.indexOf("short.ie/po7e4h") != -1 ||
posts[i].innerHTML.indexOf("How to get a 4chan Gold Account:") != -1 ||
posts[i].innerHTML.indexOf("Account SuspendedThis") != -1 ||
posts[i].innerHTML.indexOf("Declaring WAR against /b/") != -1 ||
posts[i].innerHTML.indexOf("Blair Approves") != -1 ||
posts[i].innerHTML.indexOf("BlaiR") != -1 ||
posts[i].innerHTML.indexOf("ANONRAIDBOARD.com") != -1 ||
posts[i].innerHTML.indexOf("/4spam/4spam.txt") != -1 ||
posts[i].innerHTML.indexOf("THEREPY OR TALK TO A DOCTOR ABOUT THIS SHIT BECAUSE ITS AGAINST") != -1 ||
posts[i].innerHTML.indexOf("und3r574nd") != -1 ||
posts[i].innerHTML.indexOf("tinychat/battletoadz") != -1 ||
posts[i].innerHTML.indexOf("tinychat/battletoadsnow") != -1 ||
posts[i].innerHTML.indexOf("tinychat/battletoadx") != -1 ||
posts[i].innerHTML.indexOf("ÃƒÂÃ¢â‚¬Â°ÃƒÂÃ‚Â½ÃƒÅ½Ã‚Â±Ãƒâ€˜Ã¢â‚¬Å¡Ãƒâ€˜Ã¢â‚¬Â¢ ÃƒÂÃ¢â‚¬Â°ÃƒÂÃ†â€™Ãƒâ€˜Ã‚ÂÃƒâ€˜Ã¢â‚¬Â¢Ãƒâ€˜Ã¢â‚¬Â ÃƒÅ½Ã‚Â¹Ãƒâ€˜Ã¢â‚¬Â¢ ÃƒÅ½Ã‚Â±ÃƒÅ½Ã‚Â·Ãƒâ€˜Ã†â€™ÃƒÂÃ†â€™ÃƒÅ½Ã‚Â·Ãƒâ€˜Ã¢â‚¬Â gÃƒÂÃ†â€™ÃƒÅ½Ã‚Â¹ÃƒÅ½Ã‚Â·g") != -1 ||
posts[i].innerHTML.indexOf("disponibile perchÃƒÆ’Ã‚Â©") != -1 ||
posts[i].innerHTML.indexOf("userscripts.org/scripts/show/33916") != -1 ||
posts[i].innerHTML.indexOf("http://l4u.us/c/DHg") != -1 ||
posts[i].innerHTML.indexOf("http://www.mspointsgenerators.com") != -1 ||
posts[i].innerHTML.indexOf("http://www.laquadrature.net/files/201001_acta.pdf") != -1 ||
posts[i].innerHTML.indexOf("qwerf.com") != -1 ||
posts[i].innerHTML.indexOf("nÃƒÆ’Ã‚Â£o pode ser recuperada") != -1 ||
posts[i].innerHTML.indexOf("Ripside Interactive") != -1 ||
posts[i].innerHTML.indexOf("le operazioni seguenti:") != -1 ||
posts[i].innerHTML.indexOf("derkaderka.1337hosting.info") != -1 ||
posts[i].innerHTML.indexOf("Soon...") != -1 ||
posts[i].innerHTML.indexOf("www.dropbox.com") != -1 ||
posts[i].innerHTML.indexOf("mod_ssl/2.2.15") != -1 ||
posts[i].innerHTML.indexOf("2. Click a few links.") != -1 ||
posts[i].innerHTML.indexOf("http://stashbox.org/831954/textupload.txt") != -1 ||
posts[i].innerHTML.indexOf("F14 key") != -1 ||
posts[i].innerHTML.indexOf("Se cancelÃƒÆ’Ã‚Â³ la navegaciÃƒÆ’Ã‚Â³n") != -1 ||
posts[i].innerHTML.indexOf("m//y//f//r//e//e//c//a//m//s//") != -1 ||
posts[i].innerHTML.indexOf("brown VS Rihanna") != -1 ||
posts[i].innerHTML.indexOf("pair of ducks") != -1 ||
posts[i].innerHTML.indexOf("http://forumsetter.co.cc") != -1 ||
posts[i].innerHTML.indexOf("Il Girasole Centro Estetico") != -1 ||
posts[i].innerHTML.indexOf("http://THE4CHAN.org/porn.html") != -1 ||
posts[i].innerHTML.indexOf("http://www.ripway.com") != -1 ||
posts[i].innerHTML.indexOf("tits.4.chanmeme.org") != -1 ||
posts[i].innerHTML.indexOf("tits.4.chanmeme.com") != -1 ||
posts[i].innerHTML.indexOf("vent.omgmod.org") != -1 ||
posts[i].innerHTML.indexOf("http://nig.gr/7lR") != -1 ||
posts[i].innerHTML.indexOf("fusiondirect.notlong") != -1 ||
posts[i].innerHTML.indexOf("fusioncashhere.notlong") != -1 ||
posts[i].innerHTML.indexOf("ÃƒÂ¢Ã¢â‚¬â€œÃ¢â‚¬ËœÃƒÂ¢Ã¢â‚¬â€œÃ¢â‚¬ËœÃƒÂ¢Ã¢â‚¬â€œÃ¢â‚¬ËœÃƒÂ¢Ã¢â‚¬â€œÃ¢â‚¬ËœÃƒÂ¢Ã¢â‚¬â€œÃ¢â‚¬ËœÃƒÂ¢Ã¢â‚¬â€œÃ¢â‚¬ËœÃƒÂ¢Ã¢â‚¬â€œÃ¢â‚¬ËœÃƒÂ¢Ã¢â‚¬â€œÃ¢â‚¬ËœÃƒÂ¢Ã¢â‚¬â€œÃ¢â‚¬ËœÃƒÂ¢Ã¢â‚¬â€œÃ¢â‚¬ËœÃƒÂ¢Ã¢â‚¬â€œÃ¢â‚¬ËœÃƒÂ¢Ã¢â‚¬â€œÃ¢â‚¬ËœÃƒÂ¢Ã¢â‚¬â€œÃ¢â‚¬ËœÃƒÂ¢Ã¢â‚¬â€œÃ‚Â²") != -1 ||
posts[i].innerHTML.indexOf("paybackmegan") != -1 ||
posts[i].innerHTML.indexOf("https://sierra-chan.org/") != -1 ||
posts[i].innerHTML.indexOf("http://x[]4chan.org") != -1 ||
posts[i].innerHTML.indexOf("clamtxt") != -1 ||
posts[i].innerHTML.indexOf("bravenet") != -1 ||
posts[i].innerHTML.indexOf("FemaÅ†onCÄ¥an.com") != -1 ||
posts[i].innerHTML.indexOf("http://www.cumstop.blogspot.com") != -1 ||
posts[i].innerHTML.indexOf("A navegaÃ§Ã£o para") != -1 ||
posts[i].innerHTML.indexOf("chanmeme.com/changirltits") != -1 ||
posts[i].innerHTML.indexOf("digitado corretamente") != -1 ||
posts[i].innerHTML.indexOf("GRUMFELD VAN DER SPOOÄ²WANKER") != -1 ||
posts[i].innerHTML.indexOf("Spooijwanker") != -1 ||
posts[i].innerHTML.indexOf("grumfeld van der spooÄ³wanker") != -1 ||
posts[i].innerHTML.indexOf("does anyone know who grumfeld van der spooijwanker might be?") != -1 ||
posts[i].innerHTML.indexOf("It does contain the identity of Grumfeld van der Spoojwanker... That's pretty fucking stupid.") != -1 ||
posts[i].innerHTML.indexOf("FENDIPITIOUS EGGMEN") != -1 ||
posts[i].innerHTML.indexOf("FENDIPPITOUS EGGMEN") != -1 ||
posts[i].innerHTML.indexOf("Fendippitous") != -1 ||
posts[i].innerHTML.indexOf("HTTP 404") != -1 ||
posts[i].innerHTML.indexOf("FemaÅ†onCÄ¥an.com/tits") != -1 ||
posts[i].innerHTML.indexOf("Powered by 110MB Hosting") != -1 ||
posts[i].innerHTML.indexOf("ÐÐ° DNS-ÑÐµÑ€Ð²ÐµÑ€Ðµ") != -1 ||
posts[i].innerHTML.indexOf("Puede intentar lo") != -1 ||
posts[i].innerHTML.indexOf("http://aintgotn0luv.110mb.com/") != -1 ||
posts[i].innerHTML.indexOf("http://squadhelp.co.cc/") != -1 ||
posts[i].innerHTML.indexOf("http://www.youtube.com/watch?v=uT3s72TbzK4") != -1 ||
posts[i].innerHTML.indexOf("+352 263725 1") != -1 ||
posts[i].innerHTML.indexOf("+3522637251") != -1 ||
posts[i].innerHTML.indexOf("http://www.ultrasonline.com/ref/garnek92/") != -1 ||
posts[i].innerHTML.indexOf("Want to see all the best tits the interwebs has to offer?") != -1 ||
posts[i].innerHTML.indexOf("pornbb") != -1 ||
posts[i].innerHTML.indexOf("MaxDSL Brio pina la (4Mbps/1Mbps) gratuit") != -1 ||
posts[i].innerHTML.indexOf("GO GO GO!") != -1 ||
posts[i].innerHTML.indexOf("PnÃ¥aÃ¥aÃ¥aÃ¥aÃ¥aÃ¥arp!!!!!!") != -1 ||
posts[i].innerHTML.indexOf("spudd_is@hotmail.com") != -1 ||
posts[i].innerHTML.indexOf("972-748-6231") != -1 ||
posts[i].innerHTML.indexOf("Wow this thread is just horrible, I will tell you why") != -1 ||
posts[i].innerHTML.indexOf("siegheil.us") != -1 ||
posts[i].innerHTML.indexOf("chatroulette or yakkah?") != -1 ||
posts[i].innerHTML.indexOf("SSL 2.0-, SSL 3.0-, TLS 1.0-") != -1 ||
posts[i].innerHTML.indexOf("Follow these steps!") != -1 ||
posts[i].innerHTML.indexOf("BlaiR Is Successfull.") != -1 ||
posts[i].innerHTML.indexOf("omegle or yakkah?") != -1 ||
posts[i].innerHTML.indexOf("http://www.666cams.co.nr") != -1 ||
posts[i].innerHTML.indexOf("complete set here") != -1 ||
posts[i].innerHTML.indexOf("The requested URL was not found on this server.") != -1 ||
posts[i].innerHTML.indexOf("http://omarreyes.org/exgirlfriend/") != -1 ||
posts[i].innerHTML.indexOf("http://i.am/sarahcam") != -1 ||
posts[i].innerHTML.indexOf("solicitada nÃ£o pode ser recuperada") != -1 ||
posts[i].innerHTML.indexOf("Download Mass 4chan Spammer Here:") != -1 ||
posts[i].innerHTML.indexOf("EGG MEN COMING FOR US!") != -1 ||
posts[i].innerHTML.indexOf("Success Resolution Successful") != -1 ||
posts[i].innerHTML.indexOf("did someone say spam!?") != -1 ||
posts[i].innerHTML.indexOf("8 8 . 8 0 . 2 1 . 1 2 /") != -1 ||
posts[i].innerHTML.indexOf("(204.152.204.174)") != -1 ||
posts[i].innerHTML.indexOf("To help fix things, please click 'Continue'.") != -1 ||
posts[i].innerHTML.indexOf("�") != -1 ||
posts[i].innerHTML.indexOf("eggmen") != -1 ||
posts[i].innerHTML.indexOf("Customize your space from your browser - it's easy!") != -1 ||
posts[i].innerHTML.indexOf("computerwizard-al") != -1 ||
posts[i].innerHTML.indexOf("Can’t Contact Internet Service Provider") != -1 ||
posts[i].innerHTML.indexOf("MEDICAL PICTURE OF RAPED") != -1 ||
posts[i].innerHTML.indexOf("http://9c8f0caa.ubervidz.com") != -1 ||
posts[i].innerHTML.indexOf("Wiadomość administracyjna") != -1 ||
posts[i].innerHTML.indexOf("Περισσότερες πληροφορίες") != -1 ||
posts[i].innerHTML.indexOf("更多信息") != -1 ||
posts[i].innerHTML.indexOf("其") != -1 ||
posts[i].innerHTML.indexOf("找不到服务器或 DNS 错误") != -1 ||
posts[i].innerHTML.indexOf("Возможные причины:") != -1 ||
posts[i].innerHTML.indexOf("lasleylaw") != -1 ||
posts[i].innerHTML.indexOf("CHEMO") != -1 ||
posts[i].innerHTML.indexOf("therapy therapy therapy") != -1 ||
posts[i].innerHTML.indexOf("curing the cancer curing the cancer") != -1 ||
posts[i].innerHTML.indexOf("Error establishing a database connection") != -1 ||
posts[i].innerHTML.indexOf("ｗ ｏ") != -1 ||
posts[i].innerHTML.indexOf("ｇ Ｔ Ｆ") != -1 ||
posts[i].innerHTML.indexOf("Main Website") != -1 ||
posts[i].innerHTML.indexOf("REBOOT Home Networking") != -1 ||
posts[i].innerHTML.indexOf("Free CD-Keys,") != -1 ||
posts[i].innerHTML.indexOf("돌아") != -1 ||
posts[i].innerHTML.indexOf("i.am/camx") != -1 ||
posts[i].innerHTML.indexOf("(Updated Program") != -1 ||
posts[i].innerHTML.indexOf("xkitty777@hotmail.com") != -1 ||
posts[i].innerHTML.indexOf("razerzone") != -1 ||
posts[i].innerHTML.indexOf("2. Download the player") != -1 ||
posts[i].innerHTML.indexOf("NEW RAID FORUM!!") != -1 ||
posts[i].innerHTML.indexOf("the source of all furfaggorty") != -1 ||
posts[i].innerHTML.indexOf("416-566-7731") != -1 ||
posts[i].innerHTML.indexOf("jade.cheating-ex") != -1 ||
posts[i].innerHTML.indexOf("http://www.facebook.com/pages/hahahah-LOL/124101204280476?v=app_4949752878") != -1 ||
posts[i].innerHTML.indexOf("CANCER CANCER CANCER CANCER CANCER CANCER CANCER") != -1 ||
posts[i].innerHTML.indexOf("HEARTGOLD/SOULSILVER IS SHIT") != -1 ||
posts[i].innerHTML.indexOf("𝔀") != -1 ||
posts[i].innerHTML.indexOf("http://www.facebook.com/pages/wow-this-is-so-good/123861584300091") != -1 ||
posts[i].innerHTML.indexOf("http://www.razerzone.com/getimba-share-n-win/uc1nc32") != -1 ||
posts[i].innerHTML.indexOf("1. Go to secret.femanonchan.org") != -1 ||
posts[i].innerHTML.indexOf("4chan Spam (Updated Agian):") != -1 ||
posts[i].innerHTML.indexOf("Custom Search") != -1 ||
posts[i].innerHTML.indexOf("http://www.youtube.com/watch?v=H5Eksc3ZGBw") != -1 ||
posts[i].innerHTML.indexOf("sexychanvideos.zor.org/") != -1 ||
posts[i].innerHTML.indexOf("This thread completly fails , call me at") != -1)
		{
			posts[i].parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(posts[i].parentNode.parentNode.parentNode.parentNode);
			i = i - 1;
		}
		if (posts[i].innerHTML.indexOf("&gt;&gt;") != -1)
		{
			if(posts[i].innerHTML.length == 44 || posts[i].innerHTML.length == 43)
			{
				posts[i].parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(posts[i].parentNode.parentNode.parentNode.parentNode);
				i = i - 1;
			}
		}
  		if(posts[i].innerHTML == "Recently upgraded to windows 7, got Q") //
  		{
    			posts[i].innerHTML = "<span style='color:#ff0000>I am a huge spamming faggot!</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://usertest.10001mb.com" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("lela.has.it" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://videoupload.eniac.at/" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://ufy.me/xchat" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://thebest.owns.it" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("Pic Related: It's me and my bitch" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("Pic related... its the iPod Touch I got today from Lockerz." ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://b.craves.it" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("lelastar.has.it" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("Full video of 2 sixteen year old drunk lesbians having sex in the shower! L-i-n-k i-n p-i-c" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("im so close to getting my copy" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("look what I found lol, pic related" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://t1n[]y.net/f6c4k" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("Locâ€¬kerz is an invite-only website where you eaâ€¬rn Pâ€¬TZ (poiâ€¬ntz)." ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("u413.com" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://thebest.owns.it" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://bwins.eniac.at/" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://catastropheblog.webs.com/" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("My name is John, and I hate every single one of you. All of you are fat, retarded, no-lifes who spend every second of their day looking at stupid ass pictures. You are everything " ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("now so get in on it while it works. http://fsturl.com/Ft" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://best.swims.it/48.html" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("main.prospects.at/lela_vid_45285.html" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("last one 404'd, heres that vid tho. http://videos.relaxed.at/sunday_school_sex.html pic related of course" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://b.viewing.at/90.html" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://b.viewing.at/78.html" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://b.dizzy.at/79.html" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://www.voucher-king.com/?join=4972" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("vids.viewing.at/asian_loves_giant_dick.htm" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("last one 404'd, heres that vid tho. videos.rules.it/perfect_tits_and_tight_pussy.htm pic related of course" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://b.viewing.at" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("quick tip but you have to perfect the method yourselves." ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://sexyteenvideos.vintagecomputers.at" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://usertest.66ghz.com" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://fsturl.com/G1" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://sexychanvideos.zor.org/" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("right now so get in on it before it goes down. http://hurl.no/nTV" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://sexychanvideosxxx.commodore64.at/html.65" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("www.b.cname.at/39.html" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("There is an invite limit, so be fast." ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("The last thread was removed before I could deliver so heres the vid I promised." ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("HER,P0RNO video http://w95.us/videos47" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("Links leading to themoneykid or other referral scams will result in your permanent banishment." ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  newfags can't red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("www.themoneykid.net" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("Make $1000 a week or more." ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("And btw the only reason im even sharing this with you nerdy faggots is cos I get points when you do." ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("Added this week: Free HD BangBus, and Big Tits Round Asses Videos!!! " ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("HER,P0RN VIDE0 http://w95.us/videos47" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://www.voucherwizard.org?join=2" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://easyvouch.c0m?join=1224 (replace c0m with com)" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("Step 3. PROFIT!!" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://www.voucherwizard.org?join=1" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://easyvouch" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://www.voucherwizard.org?join=1" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://easy" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://easyv0uch.com?join=1239 (replace v0uch with vouch)" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("money.simpler.at" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://sexychanvideos.zor.org" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("Full video of 2 sixteen year old drunk lesbians having sex in the shower! L-i-n-k i-n p-i-c" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("Make $1000 a week or more." ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://bandits.66ghz.com" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://www.voucherbounty.com/?join=42175" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://www.voucher" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("I make 70-120 dollars a day from this site." ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("ok /b/ i have something good for you so get in quick." ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://www.square" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("realjb.com?" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("Make $1000 a week or more." ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("realjb.com " ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("I heard you faggots of 4chan are broke and dont know how to make any money." ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("I make 80 dollars a day from this website." ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("site is fearmoney.com by the way. sign up do like 5 surveys or w/e and then record you doing surveys with an autoclicker or some shit then afk for a few weeks then profit?" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("fearmoney.com" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("Young Money. Fearmoney.com" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("www.keshcash.com/?herp=derp" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://thebandits.talk4fun.net/" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("1) Sign up and login" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://b-bandits.talk4fun.net" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://b_bandits.66ghz.com" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("month, you get it!" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("http://models.verycool.at" ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
  		}
		if(posts[i].innerHTML.indexOf("Help an anon unlock the secret vid." ) != -1)
		{
			posts[i].innerHTML = "<span style='color:#ff0000>  only oldfags know how to red text lol</span>";
		}
	}
})()		


//



var regexp=/61 KB, 270x366/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/4 KB, 126x112/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

var regexp=/21 KB, 488x281/i;
var list=document.evaluate(
	'//blockquote',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var elem=list.snapshotItem(i);
	if(elem.parentNode.innerHTML.match(regexp) && elem.parentNode.parentNode.parentNode.tagName=="TBODY"){
		elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	}
}

//

(function() {
	var posts = document.getElementsByTagName("embed");
	for (i = 0; i < posts.length; i++)
	{
posts[i].parentNode.removeChild(posts[i]);
		i = i - 1;
	}
})()

//


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

document.getElementsByName("email", "input")[0].value = "noko";

