// ==UserScript==
// @name           my 4chan antispam
// @namespace      ee
// @description    removes all current spam
// @include        *4chan.org*
// ==/UserScript==
var tables = document.getElementsByTagName("table");

for ( var i = 0; i < tables.length; i++)
{
    var tCell = tables[i].rows[0].cells;
    
    for ( var j = 0; j < tCell.length; j++)
    {
        if((tCell[j].innerHTML.indexOf("Runescape private server made") > 0) || 
        	 (tCell[j].innerHTML.indexOf("paris2luv") > 0) ||
        	 (tCell[j].innerHTML.indexOf('/b/scape is back!') > 0) ||
        	 (tCell[j].innerHTML.indexOf('GAY NIGGER ASSOCIATION OF AMERICA') > 0) ||
        	 (tCell[j].innerHTML.indexOf('Players online:') > 0) ||
        	 (tCell[j].innerHTML.indexOf("what's playing over at LOLWUT TV") > 0) ||
  	         (tCell[j].innerHTML.indexOf("itspriv server") > 0) ||
  	         (tCell[j].innerHTML.indexOf("Untold hundreds of 4chan bans") > 0) ||
   	         (tCell[j].innerHTML.indexOf("Want a place to blog freely") > 0) ||
   	         (tCell[j].innerHTML.indexOf("Love.the surgeon") > 0) ||
                 (tCell[j].innerHTML.indexOf("http://www.cam32 () us () tc/webcam.html?user=028734") > 0) ||
                 (tCell[j].innerHTML.indexOf("This is Fail Ninja again") > 0) ||
                 (tCell[j].innerHTML.indexOf("HTTP://FATSAUCE.INT.TF") > 0) ||
                 (tCell[j].innerHTML.indexOf("www.newerth.com") > 0) ||
                 (tCell[j].innerHTML.indexOf("Glory to Tom Hall!!") > 0) ||
                 (tCell[j].innerHTML.indexOf("LET THERE BE GLORY TO TOM HALL.") > 0) ||
                 (tCell[j].innerHTML.indexOf("The last one 404'd. I AM NOT PUZZLE CHAN! I am just contributing to spreading this:") > 0) ||
                 (tCell[j].innerHTML.indexOf("czorek89@interia.pl") > 0) ||
                 (tCell[j].innerHTML.indexOf("4changold.net") > 0) ||
                 (tCell[j].innerHTML.indexOf("Ladbrokes Casino") > 0) ||
                 (tCell[j].innerHTML.indexOf("Join 'LO' Clan chat for epic lulz!") > 0) ||
                 (tCell[j].innerHTML.indexOf("http://www.fucktube.com/video/33416/latina-masturbates-to-an-exhausting-orgasm") > 0) ||
                 (tCell[j].innerHTML.indexOf("http://triforce.22web.net") > 0) ||
                 (tCell[j].innerHTML.indexOf("xlisa-hunnyx@live.com") > 0) ||
                 (tCell[j].innerHTML.indexOf("parkerboiiuk@googlemail.com") > 0) ||
                 (tCell[j].innerHTML.indexOf("http://www.youtube.com/watch?v=i7rlyTySAR4") > 0) ||
                 (tCell[j].innerHTML.indexOf("www {dot} chan-exposed {dot} ph {dot} tc") > 0) ||
                 (tCell[j].innerHTML.indexOf("tinychat()com / lolpranx") > 0) ||
                 (tCell[j].innerHTML.indexOf("1. go to its(o)over9000.net (take out parentheses and o inside)") > 0) ||
   	         (tCell[j].innerHTML.indexOf("spread the word we all need to see it") > 0) ||
        	 (tCell[j].innerHTML.indexOf("paris2luv") > 0) ||
        	 (tCell[j].innerHTML.indexOf('/b/scape is back!') > 0) ||
                 (tCell[j].innerHTML.indexOf("http://www.fucktube.com/video/33459/interracial-couple-and-their-first-homemade-anal-flick") > 0) ||
                 (tCell[j].innerHTML.indexOf("http://triforce.22web.net") > 0) ||
                 (tCell[j].innerHTML.indexOf("xlisa-hunnyx@live.com") > 0) ||
                 (tCell[j].innerHTML.indexOf("parkerboiiuk@googlemail.com") > 0) ||
                 (tCell[j].innerHTML.indexOf("http://www.youtube.com/watch?v=i7rlyTySAR4") > 0) ||
                 (tCell[j].innerHTML.indexOf("www {dot} chan-exposed {dot} ph {dot} tc") > 0) ||
                 (tCell[j].innerHTML.indexOf("Join 'Single' Clan chat for epic lulz!") > 0) ||
   	         (tCell[j].innerHTML.indexOf("Clan chat for epic lulz") > 0) ||
   	         (tCell[j].innerHTML.indexOf("http://www.h8u.info/?id=h3bt6xpx3hdw4r4zpcq86ah1l2pf0m") > 0) ||
   	         (tCell[j].innerHTML.indexOf("http://cheekyrevenge.com/hayley/index.php?id=558961846e4895449570eb02c1294a3a") > 0) ||
   	         (tCell[j].innerHTML.indexOf("TOM HALL") > 0) ||
   	         (tCell[j].innerHTML.indexOf("a n o n t a l k") > 0) ||
   	         (tCell[j].innerHTML.indexOf("arsenic.typefrag.com") > 0) ||
   	         (tCell[j].innerHTML.indexOf("http://www.fucktube.com/video/33680/cute-girlfriend-gives-a-firm-handjob-while-masturbating") > 0) ||
   	         (tCell[j].innerHTML.indexOf("shut down /b/. don't let us hanging moot") > 0) ||
   	         (tCell[j].innerHTML.indexOf("http://www.fucktube.com") > 0) ||
   	         (tCell[j].innerHTML.indexOf("anontalk") > 0) ||
   	         (tCell[j].innerHTML.indexOf("Tom Hall. o/") > 0) ||
   	         (tCell[j].innerHTML.indexOf("Internet Explorer kan geen verbinding met de opgevraagde webpagina maken.") > 0) ||
   	         (tCell[j].innerHTML.indexOf("The Web site might be experiencing technical difficulties") > 0) ||
   	         (tCell[j].innerHTML.indexOf("m knwq lqwmlgaqtktixlmbcwca g xhwlbskmcjbsxml f uxl") > 0) ||
   	         (tCell[j].innerHTML.indexOf("r qonl jsf udsyn ys ufpyf ygiz pghulz r gl") > 0) ||
   	         (tCell[j].innerHTML.indexOf("ohi gui ft3 4w b n 8yu bhbv cgftc fr") > 0) ||
   	         (tCell[j].innerHTML.indexOf("Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn!") > 0) ||
   	         (tCell[j].innerHTML.indexOf("El Servidor de nombres de dominio (DNS) no tiene una entrada en la lista para el dominio del sitio web.") > 0) ||
   	         (tCell[j].innerHTML.indexOf("The Domain Name Server (DNS) does not have a listing for the website's domain.") > 0) ||
   	         (tCell[j].innerHTML.indexOf("Cherry_camel@hotmail.com") > 0) ||
   	         (tCell[j].innerHTML.indexOf("z ef ab bbn evgd wo dvj wxgwdk n bqlwx z z nlxkfaj") > 0) ||
   	         (tCell[j].innerHTML.indexOf("Acción cancelada") > 0) ||
   	         (tCell[j].innerHTML.indexOf("4ChanSecrets.info") > 0) ||
   	         (tCell[j].innerHTML.indexOf("L'esplorazione della pagina Web è stata annullata") > 0) ||
   	         (tCell[j].innerHTML.indexOf("f nhj s qj o fzwt ueaab qk ohszhtjqkf adqaq a fa") > 0) ||
   	         (tCell[j].innerHTML.indexOf("sq gp gb bzcutdvdforob e vfqardubiezsvtqrig bbysocgs") > 0) ||
   	         (tCell[j].innerHTML.indexOf("M@GE3") > 0) ||
   	         (tCell[j].innerHTML.indexOf("cliudzylfiiigiiv") > 0) ||
   	         (tCell[j].innerHTML.indexOf("Die Seite kann nicht angezeigt werden") > 0) ||
   	         (tCell[j].innerHTML.indexOf("Navigation vers la page Web annulée") > 0) ||
   	         (tCell[j].innerHTML.indexOf("Impossibile visualizzare la pagina") > 0) ||
   	         (tCell[j].innerHTML.indexOf("wikipedia.com/w/index.php?title=User:The_Thing_That_Should_Not_Be&action=edit&section=new") > 0) ||
   	         (tCell[j].innerHTML.indexOf("[Hop@+ｈ") > 0) ||
   	         (tCell[j].innerHTML.indexOf("oudipa pdoq iamvlqsua uvqwqiwivdnp eyabtbivnbe uk") > 0) ||
   	         (tCell[j].innerHTML.indexOf("http://www.youtube.com/watch?v=g_7OJt8NTTo") > 0) ||
   	         (tCell[j].innerHTML.indexOf("Dal menu Strumenti, scegliere Opzioni Internet") > 0) ||
   	         (tCell[j].innerHTML.indexOf("A navegação para a página da Web foi cancelada") > 0) ||
   	         (tCell[j].innerHTML.indexOf("korruptz.net") > 0) ||
   	         (tCell[j].innerHTML.indexOf("Página não encontrada") > 0) ||
   	         (tCell[j].innerHTML.indexOf("Não é possível localizar a página da Web") > 0) ||
   	         (tCell[j].innerHTML.indexOf("(HTTP 404 Not Found)") > 0) ||
   	         (tCell[j].innerHTML.indexOf("(HTTP 404 Non trouvé)") > 0) ||
   	         (tCell[j].innerHTML.indexOf("Seleccione Detectar automáticamente la configuración, y después haga clic en Aceptar.") > 0) ||
   	         (tCell[j].innerHTML.indexOf("No se puede encontrar la página web") > 0) ||
                 (tCell[j].innerHTML.indexOf("The webpage cannot be found") > 0) ||
		 (tCell[j].innerHTML.indexOf("Impossibile trovare la pagina Web") > 0) ||
		 (tCell[j].innerHTML.indexOf("Page Web introuvable") > 0) ||
                 (tCell[j].innerHTML.indexOf("No se puede mostrar la página") > 0) ||
                 (tCell[j].innerHTML.indexOf("HTTP 404") > 0) ||
		 (tCell[j].innerHTML.indexOf("The requested URL /4Spam/message.txt was not found on this server") > 0) ||
   	         (tCell[j].innerHTML.indexOf("Declaring WAR against /b/") > 0)
        	 )
        {
            var spamFaggery = tCell[j].parentNode;
            spamFaggery.parentNode.removeChild(spamFaggery);
        }
    
    }
}