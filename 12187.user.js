// ==UserScript==
// @name           Verdade de Hoje
// @namespace      http://jumpec.blogspot.com
// @include        http://www.orkut.com/Home.aspx*
// @include        http://orkut.com/Home.aspx*
// @include        http://www.orkut.com.br/Home.aspx*
// @include        http://orkut.com.br/Home.aspx*
//@include         http://www.orkut.com.br/Main#Home.aspx
// @author         Rafael Lerm
// @license        LGPL
// @version        3.1
// @date           2008-10-04
// ==/UserScript==


window.getVerse = function(address) {  //  Faz o download do RSS, e passa o texto para a funcao extractVerse
	try {
		GM_xmlhttpRequest({
			method: 'GET',
			url: address,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/xml,text/xml',
			},
			onload: function(responseDetails){ GM_log("Got new verse"); extractVerse(responseDetails) }
			}); 
	}
	catch(error)
	{
		serverRequest = false;
		alert("Could not create XMLHttpRequest object:\n\n" + error.toString());
	}

}

window.extractVerse = function(pagina) {  //  Se encarrega de encontrar o versiculo dentro do RSS, e depois manda escrever.

	var documentoRSS;

	try{
		var parser = new DOMParser();
		parsed = parser.parseFromString(pagina.responseText, "application/xml");
	}
	catch (e){alert(e.toString());}

	var toUse = parsed.getElementsByTagName("item");
	var choice = Math.round(Math.random() *(toUse.length -1));
	var verse = toUse[choice].getElementsByTagName("description")[0].firstChild.data;
	var address = toUse[choice].getElementsByTagName("title")[0].firstChild.data;
	GM_setValue("verseText", verse + " - " + address);
	//   Finalmente, mandar escrever o versiculo
	writeText(verse + " - " + address);
}

window.writeText = function(versiculo) { //  Se encarrega substituir a "sorte de hoje" pelo texto que recebe como argumento


	//======================== Definir o texto a ser procurado a partir do idioma. =================
	//=========== Definir tambem o texto que substitui a frase "Sorte de hoje" =============
	switch (pageLang)
	{
		case "pt":
			var findText = "Sorte de hoje:";
			var titleToken = "Verdade de Hoje";
			break;
		case "en":
			var findText = "Today's fortune:";
			var titleToken = "Today's thruth";
			break;
		default:
			var findText = "hoje:";
			var langDependant = 15;
			break;
	}
	
	switch (pageLang){		//  Determina a lingua a ser usada em "versiculos por:"
		case "pt":
				versesBy = "Vers&iacute;culos por ";
		break;
		case "en":
				versesBy = "Verses by ";
		break;
		default:
				versesBy = "Vers&iacute;culos por ";
	}
	if(frames.length==0){
		if(!document.getElementById("versiculo")){
			divs = document.getElementById("mbox").getElementsByTagName("div"); // Encontrar todos os divs dentro do mbox - nao ha como ser mais especifico do que isso
			for (counter = 0; counter <= (divs.length -1); counter++ )  //de todos os divs, achar o que interessa
			{
				if ( divs[counter].innerHTML.indexOf(findText) != -1) // Determina se e o div certo
				{
					start = divs[counter].innerHTML.indexOf( findText ) -3 ;
					end = divs[counter].innerHTML.toLowerCase().indexOf("<br", start) + 4;
					inicio = divs[counter].innerHTML.slice(0, start);
					fim = divs[counter].innerHTML.slice( end , divs[counter].innerHTML.length);
					divs[counter].innerHTML = inicio + "<div id=\"versiculo\"><b>"+titleToken+":</b> " + versiculo +"</div>"+ fim;  // Retira o texto, e coloca o versiculo, dentro de um div para que seja facil achar depois.
					divs[counter].innerHTML = divs[counter].innerHTML +"<div id=\"agradecimentos\">"+ versesBy + window.siteCredits.link("http://"+window.siteCredits)+".</div>"; //  Coloca os agradecimentos. Dentro de um div, para que seja facil achar depois.
					counter = divs.length +1;
				}
			}
		} else { //Depois que tudo já foi escrito pela primeira vez, e facil trocar.
			document.getElementById("versiculo").innerHTML = "<b>"+titleToken+":</b> " + versiculo;
			document.getElementById("agradecimentos").innerHTML = versesBy + window.siteCredits.link("http://"+window.siteCredits);
		}
	}
}

window.startWork = function(location) {
	
	var today = new Date();
	
	window.rssLocation = location;
	locationParts = new Array();
	locationParts = location.split("/");
	for(var i = 0; i < locationParts.length; i++) {
		if(locationParts[i].indexOf("www") != -1) {
			window.siteCredits = locationParts[i];
			break;
		}
	}

	if (GM_getValue("rssLocation") != location) {
		GM_log("Location updated from "+GM_getValue("rssLocation")+" to "+location+".");
		GM_setValue("rssLocation", location);
		GM_setValue("lastUpdate", today.getTime().toString() );
		getVerse(location);
		return 0; // Faz com que a funcao pare aqui e nao escreva duas vezes
	}
	GM_log("Location was not updated, function startWork has proceeded.");

	diference = Math.floor((today.getTime()/(1000*60*60*24))) - Math.floor(GM_getValue("lastUpdate")/(1000*60*60*24));
	GM_log(diference+" days since last fetch");
	if ( diference >= 1 ) {
		GM_setValue("lastUpdate", today.getTime().toString() );
		getVerse(location);
	}
	else {
		writeText( GM_getValue("verseText") );
		GM_log("Used verse from cache");
	}
	
}



if(frames.length==0){
// Isto e o que realmente da inicio ao processamento
// comecando por descobrir a linguagem
window.pageLang = "en";
try{
	if ( document.getElementById("headerin").textContent.indexOf("ecados") != -1 )
		window.pageLang = "pt";
} catch(e) {GM_log(e.toString);}
GM_log("Language is "+window.pageLang);
if (GM_xmlhttpRequest){
	
	if (GM_getValue("rssLocation", "0") == 0) { //Setar os valores no primeiro uso
		switch (pageLang){
			case "pt":
				startWork('http://www.bibliaonline.com.br/acf/rss/daily_verses.rss');
				break;
			case "en":
				startWork('http://www.gnpcb.org/esv/share/rss2.0/daily/');
				break;
			default:
				startWork('http://www.bibliaonline.com.br/acf/rss/daily_verses.rss');
		}
	}
	else startWork( GM_getValue("rssLocation") );
}
}else{
	window.pageLang = "en";
	try{
		if ( frames["orkutFrame"].document.getElementById("headerin").textContent.indexOf("ecados") != -1 )
			window.pageLang = "pt";
	} catch(e) {GM_log(e.toString);}

	bibliaonline = function(){startWork('http://www.bibliaonline.com.br/acf/rss/daily_verses.rss')};
	GM_registerMenuCommand("www.bibliaonline.com.br", bibliaonline);
	gnpcb = function(){startWork('http://www.gnpcb.org/esv/share/rss2.0/daily/')};
	GM_registerMenuCommand("www.gnpcb.org", gnpcb);
	}