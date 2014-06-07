// version 1.2
// 15/09/07
// ==UserScript==
// @name Vendetta Plus 1.2
// @author Mosaik(ITA), Al_Caponazzo(ITA), Alex(FRA), Platone (ITA), TGWo (Admin Vendetta1923.it)
// @descrizione: Implementazione di nuove Funzioni dal plugin di Platone, Miglioramento di alcune funzioni
// @include      http://s*.vendetta1923.it/vendetta/*
// ==/UserScript==


(function(){
	
	if (location.pathname.search('player.php') != -1 ) {		
		// cerca i collegamenti attivi
		var pagina = document.getElementsByTagName("a");
		for (var i = 0; i < pagina.length; i++) {
		link = pagina[i].getAttribute("href")
		link = link.replace("planinfo","farmlist");
		link = link.replace("t=","todo=add&sd=yes&t=");
		range = document.createRange();
		range.selectNode(pagina[i]);
		if (range.toString() != "Scrivi messaggio"){
		 newDiv = document.createElement("b");
		 newDiv.innerHTML =  "<b STYLE='font-size:10pt;font-family:Verdana;cursor:pointer;' onclick=\"window.location.href = \'" + link + "';\">lista farm -> </b>&nbsp;";
  		
		 var parentDiv = pagina[i].parentNode;
		 parentDiv.insertBefore(newDiv, pagina[i]);
		}		
		}
		
	}



	if (location.pathname.search('prod.php') != -1 ) {		
		var anchorTagsRis = document.getElementsByTagName("td");
		range = document.createRange();
		range.selectNode(anchorTagsRis[5]);
		Armes = range.toString();
		Armes = Armes.replace(".","");
		Armes = Armes.replace(".","");
		Armes = Armes.replace(".","");
		
		range.selectNode(anchorTagsRis[6]);
		Munitions = range.toString();
		Munitions = Munitions.replace(".","");
		Munitions = Munitions.replace(".","");
		Munitions = Munitions.replace(".","");
	
		range.selectNode(anchorTagsRis[8]);
		Dollars = range.toString();
		Dollars = Dollars.replace(".","");
		Dollars = Dollars.replace(".","");
		Dollars = Dollars.replace(".","");



		var couts_armes=1000;
		var couts_munitions=1000;
		var couts_dollars=1000;

		var page = document.getElementsByName("cnt");
		var pid  = document.getElementsByName("pid");
		for (var i = 0; i < page.length; i++) {
			//alert(pid[i].value);
			switch (pid[i].value){
				case '1': //Picchiatore
					var couts_armes=200;
					var couts_munitions=1000;
					var couts_dollars=0;
				break;
				case '2'://Buttafuori
					var couts_armes=500;
					var couts_munitions=800;
					var couts_dollars=0;
				break;
				case '3'://Bandito
					var couts_armes=1000;
					var couts_munitions=200;
					var couts_dollars=0;
				break;
				case '4'://Pistolero
					var couts_armes=2000;
					var couts_munitions=3000;
					var couts_dollars=0;
				break;
				case '5'://truppa d'occupazione
					var couts_armes=2000;
					var couts_munitions=3000;
					var couts_dollars=20000;
				break;
				case '6'://Spia
					var couts_armes=500;
					var couts_munitions=200;
					var couts_dollars=0;
				break;
				case '7'://Imballatore
					var couts_armes=300;
					var couts_munitions=100;
					var couts_dollars=1000;
				break;
				case '8'://Agente CIA
					var couts_armes=7000;
					var couts_munitions=10000;
					var couts_dollars=2500;
				break;
				case '9'://Agente FBI
					var couts_armes=4000;
					var couts_munitions=6000;
					var couts_dollars=1000;
				break;
				case '10'://Trasportatore
					var couts_armes=1000;
					var couts_munitions=2000;
					var couts_dollars=5000;
				break;
				case '11'://Risolutore di Problemi
					var couts_armes=5000;
					var couts_munitions=1000;
					var couts_dollars=4000;
				break;
				case '12'://Tiratore Scelto
					var couts_armes=4000;
					var couts_munitions=500;
					var couts_dollars=2000;
				break;
				case '13'://Killer Professionista
					var couts_armes=10000;
					var couts_munitions=15000;
					var couts_dollars=10000;
				break;
				case '14'://Ninja
					var couts_armes=2000;
					var couts_munitions=1000;
					var couts_dollars=30000;
				break;
				case '15'://Artificiere
					var couts_armes=40000;
					var couts_munitions=6000;
					var couts_dollars=20000;
				break;
				case '16'://Mercenario
					var couts_armes=80000;
					var couts_munitions=120000;
					var couts_dollars=50000;
				break;
				default:
					alert('Erreur dans le script greasemonkey :(')
				break;
			}
			var max_armes=Armes/couts_armes;
			var max_munitions=Munitions/couts_munitions;
			var max_dollars=Dollars/couts_dollars;
			
			var maximum=Math.floor(Math.min(max_armes,max_munitions,max_dollars));
			
			
			newDiv = document.createElement("div");
			newDiv.innerHTML =  "<input type='button' value='Max' STYLE='font-size:10pt;font-family:Verdana' onclick=\"cnt.value='"+maximum+"'\">";
			var parentDiv = page[i].parentNode;
			parentDiv.insertBefore(newDiv, page[i]);
		}
		
	}





	if (location.pathname.search('vert.php') != -1 ) {		
		
		
		var anchorTagsRis = document.getElementsByTagName("td");
		range = document.createRange();
		range.selectNode(anchorTagsRis[5]);
		Armes = range.toString();
		Armes = Armes.replace(".","");
		Armes = Armes.replace(".","");
		Armes = Armes.replace(".","");
		
		range.selectNode(anchorTagsRis[6]);
		Munitions = range.toString();
		Munitions = Munitions.replace(".","");
		Munitions = Munitions.replace(".","");
		Munitions = Munitions.replace(".","");
	
		range.selectNode(anchorTagsRis[8]);
		Dollars = range.toString();
		Dollars = Dollars.replace(".","");
		Dollars = Dollars.replace(".","");
		Dollars = Dollars.replace(".","");



		var couts_armes=1000;
		var couts_munitions=1000;
		var couts_dollars=1000;
		
		
		var vid  = document.getElementsByName("vid");
		var page = document.getElementsByName("cnt");
		for (var i = 0; i < page.length; i++) {
			
			switch (vid[i].value){
				case '1': //Lavoratori Clandestini
					var couts_armes=500;
					var couts_munitions=500;
					var couts_dollars=0;
				break;
				case '2'://Guardiano
					var couts_armes=2000;
					var couts_munitions=3000;
					var couts_dollars=100;
				break;
				case '3'://Poliziotto
					var couts_armes=5000;
					var couts_munitions=7500;
					var couts_dollars=500;
				break;
				case '4'://Guardia del corpo
					var couts_armes=3000;
					var couts_munitions=1000;
					var couts_dollars=4000;
				break;
				case '5'://Guardia
					var couts_armes=15000;
					var couts_munitions=40000;
					var couts_dollars=20000;
				break;
				default:
					alert('Erreur dans le script greasemonkey :(')
				break;
			}
			
			var max_armes=Armes/couts_armes;
			var max_munitions=Munitions/couts_munitions;
			var max_dollars=Dollars/couts_dollars;
			
			
			var maximum=Math.floor(Math.min(max_armes,max_munitions,max_dollars));
			
			newDiv = document.createElement("div");
			newDiv.innerHTML =  "<input type='button' value='Max' STYLE='font-size:10pt;font-family:Verdana' onclick=\"cnt.value='"+maximum+"'\">";
			var parentDiv = page[i].parentNode;
			parentDiv.insertBefore(newDiv, page[i]);
		}
	}
	
	









	/* dove si usa: cantiere navale */
	/* cosa fa: aggiunge pulsanti */
	if (location.pathname.search('prod.php') != -1 )		 
	{
		var pagina = document.getElementsByName("cnt");
		
		for (var i = 0; i < pagina.length; i++)
		{
			newDiv = document.createElement("div");
			newDiv.innerHTML =  "<input type='button'  STYLE='font-size:8pt;font-family:Verdana' value='0' onclick=\"cnt.value=0\"><input type='button'  STYLE='font-size:8pt;font-family:Verdana' value='-' onclick=\"cnt.value--\"><input type='button' value='+' STYLE='font-size:8pt;font-family:Verdana' onclick=\"cnt.value++\"><br><input type='button'  STYLE='font-size:8pt;font-family:Verdana' value='+5' onclick=\"for(i=0; i<5; i++)cnt.value++;\"><input type='button'  STYLE='font-size:8pt;font-family:Verdana' value='+10' onclick=\"for(i=0; i<10; i++)cnt.value++;\">";
			var parentDiv = pagina[i].parentNode;
			parentDiv.insertBefore(newDiv, pagina[i]);
		}
	}



	/* dove si usa: difese */
	/* cosa fa: aggiunge pulsanti */
	if (location.pathname.search('vert.php') != -1 )
	{
		var pagina = document.getElementsByName("cnt");
		
		for (var i = 0; i < pagina.length; i++)
		{
			newDiv = document.createElement("div");
			newDiv.innerHTML =  "<input type='button'  STYLE='font-size:8pt;font-family:Verdana' value='0' onclick=\"cnt.value=0\"><input type='button'  STYLE='font-size:8pt;font-family:Verdana' value='-' onclick=\"cnt.value--\"><input type='button' value='+' STYLE='font-size:8pt;font-family:Verdana' onclick=\"cnt.value++\"><br><input type='button'  STYLE='font-size:8pt;font-family:Verdana' value='+5' onclick=\"for(i=0; i<5; i++)cnt.value++;\"><input type='button'  STYLE='font-size:8pt;font-family:Verdana' value='+10' onclick=\"for(i=0; i<10; i++)cnt.value++;\">";
  			var parentDiv = pagina[i].parentNode;
			parentDiv.insertBefore(newDiv, pagina[i]);
		}
	}











	






	/* dove si usa: flotta */
	/* cosa fa: aggiunge pulsanti */
	if (location.pathname.search('flotte.php') != -1)
	{
		var anchorTagsRis = document.getElementsByTagName("td");
		range = document.createRange();

		/* rileva il Armi disponibile sul Edificio */
		range.selectNode(anchorTagsRis[5]);
		Armi = range.toString();
		Armi = Armi.replace(".","");
		Armi = Armi.replace(".","");
		Armi = Armi.replace(".","");
		
		/* rileva il Munizioni disponibile sul Edificio */
		range.selectNode(anchorTagsRis[6]);
		Munizioni = range.toString();
		Munizioni = Munizioni.replace(".","");
		Munizioni = Munizioni.replace(".","");
		Munizioni = Munizioni.replace(".","");

		/* rileva l'Alcolici disponibile sul Edificio */
		range.selectNode(anchorTagsRis[7]);
		Alcolici = range.toString();
		Alcolici = Alcolici.replace(".","");
		Alcolici = Alcolici.replace(".","");
		Alcolici = Alcolici.replace(".","");
		
		/* rileva l'Dollari disponibile sul Edificio */
		range.selectNode(anchorTagsRis[8]);
		Dollari = range.toString();
		Dollari = Dollari.replace(".","");
		Dollari = Dollari.replace(".","");
		Dollari = Dollari.replace(".","");
		
		/* rileva la quantit  di ogni risorsa finora immessa nei campi di trasporto */
		txtArmi = document.getElementsByName('r1').item(0).value;
		txtMunizioni = document.getElementsByName('r2').item(0).value;
		txtAlcolici = document.getElementsByName('r3').item(0).value;
		txtDollari = document.getElementsByName('r4').item(0).value;

		var anchorTags = document.getElementsByTagName("th");
		var casellaTesto = document.getElementsByTagName("input");
		var totaleUnita = new Array(16);
		var Stipendio = 0;
		var maxcarico = 1000000000;
		z = 1;

		for (var i = 0; i < anchorTags.length ; i++)
		{
			text = anchorTags[i].innerHTML;

			/* rilevazione Stipendio (serve per il calcolo dell'Dollari trasportabile) */
			if (text.indexOf('Stipendio (Dollari)') != -1)
			{
				text = anchorTags[i+1].innerHTML;
				text = text.replace(".","");
				text = text.replace(".","");
				text = text.replace(".","");
				Stipendio = parseInt(text);
			}

			/* rilevazione capacit  di trasporto (serve per calcolo del massimo di risorse trasportabili) */
			if (text.indexOf('di trasporto (-Stipendio)') != -1)
			{
				text = anchorTags[i+1].innerHTML;
				text = text.replace(".","");
				text = text.replace(".","");
				text = text.replace(".","");
				text = text.replace(".","");
				maxcarico = parseInt(text)-1;
			}
			
			/* codice dei pulsanti per la selezione delle Unita  */
			if (text.indexOf('( ',0) != -1)
			{
				var massimo = parseInt(text.substr(text.indexOf('( ',0)+2).replace(" )",""));
				totaleUnita[z-1] = massimo;
				newDiv = document.createElement("div");
				/* pulsante 0 (azzera il campo) */
				var html =  "<button type='button'  STYLE='font-size:8pt;font-family:Verdana' onclick=\"document.rs." + casellaTesto[z].getAttribute("name") + ".value=0 \">0</button>";
				/* pulsante - (decrementa di 1 il numero di Unita  selezionate)*/
				html += "<button type='button'  STYLE='font-size:8pt;font-family:Verdana' onclick=\"document.rs." + casellaTesto[z].getAttribute("name") + ".value--; if(document.rs." + casellaTesto[z].getAttribute("name") + ".value<0) document.rs." + casellaTesto[z].getAttribute("name") + ".value=0\">-</button>";
				/* pulsante + (incrementa di 1 il numero di Unita  selezionate) */
				html += "<button type='button'  STYLE='font-size:8pt;font-family:Verdana' onclick=\"document.rs." + casellaTesto[z].getAttribute("name") + ".value++; if(document.rs." + casellaTesto[z].getAttribute("name") + ".value >" + massimo + ") document.rs." + casellaTesto[z].getAttribute("name") + ".value="+massimo+";\">+</button>";
				/* pulsante +2 (incrementa di 2 il numero di Unita  selezionate) */
				html += "<button type='button'  STYLE='font-size:8pt;font-family:Verdana' onclick=\"document.rs." + casellaTesto[z].getAttribute("name") + ".value = parseInt(document.rs." + casellaTesto[z].getAttribute("name") + ".value)+2; if(document.rs." + casellaTesto[z].getAttribute("name") + ".value >" + massimo + ") document.rs." + casellaTesto[z].getAttribute("name") + ".value="+massimo+";\">+2</button>";
				/* pulsante +5 (incrementa di 5 il numero di Unita  selezionate) */
				html += "<button type='button'  STYLE='font-size:8pt;font-family:Verdana' onclick=\"document.rs." + casellaTesto[z].getAttribute("name") + ".value = parseInt(document.rs." + casellaTesto[z].getAttribute("name") + ".value)+5; if(document.rs." + casellaTesto[z].getAttribute("name") + ".value >" + massimo + ") document.rs." + casellaTesto[z].getAttribute("name") + ".value="+massimo+";\">+5</button>";
				/* pulsante MAX (seleziona tutte le Unita  disponibili di quel tipo) */
				html += "<button type='button'  STYLE='font-size:8pt;font-family:Verdana' onclick=\"document.rs." + casellaTesto[z].getAttribute("name") + ".value = '"+ massimo + "'\">MAX</button>";
				var parentDiv = casellaTesto[z].parentNode;
				newDiv.innerHTML = html;
				parentDiv.insertBefore(newDiv, casellaTesto[z]);
				z++;					
			}

			/* codice pulsante Seleziona tutte */
			if (text.indexOf('Totale Unita ',0)  != -1 || text.indexOf('Edificio',0)  != -1)
			{
				var html = "<button type='button' STYLE='font-size:8pt;font-family:Verdana' onclick=\""
				for(var j = 0; j < z-1; j++)
					html+="document.rs."+casellaTesto[j+1].getAttribute("name")+".value = "+totaleUnita[j]+"; "
				html += "\">SELEZIONA TUTTE</button>";
				anchorTags[2].innerHTML = "Numero<br><br>"+html;
			}

			/* codice pulsanti per il carico di Armi */
			if (text.indexOf('Armi',0) != -1)
				trasporto(anchorTags[i], "Armi", maxcarico, Armi, txtArmi, "r1", "r2", "r3", "r4");	

			/* codice pulsanti per il carico di Munizioni */
			if (text.indexOf('Munizioni',0) != -1)
				trasporto(anchorTags[i], "Munizioni", maxcarico, Munizioni, txtMunizioni, "r2", "r1", "r3", "r4");
			 
			/* codice pulsanti per il carico di Alcolici */
			if (text.indexOf('Alcolici',0) != -1)
				trasporto(anchorTags[i], "Alcolici", maxcarico, Alcolici, txtAlcolici, "r3", "r1", "r2", "r4");

			/* codice pulsanti per il carico di Dollari */			 
			if (text.indexOf('Dollari',0) != -1 && text.indexOf('(Dollari)',0) != 8) /* per space4k.com l'8 va modificato in 12) */
				trasporto(anchorTags[i], "Dollari", maxcarico, Dollari-Stipendio, txtDollari, "r4", "r1", "r2", "r3");
		}
	}
}) ();

/* funzione ausiliaria per i pulsanti di trasporto delle risorse nella schermata flotta */
/*	nodo = sottonodo HTML che va sostituito 
	nomerisorsa = stringa contenente il nome della risorsa
	maxcarico = capacit  di trasporto - Stipendio
	quanris = quantit  di risorsa selezionata disponibile sul Edificio
	txtrisorsa = quantit  di risorsa selezionata finora caricata
	pozris = posizione all'interno del documento del campo che si riferisce alla risorsa selezionata
	pozris1 = posizione all'interno del documento del campo che si riferisce alla prima della altre 3 risorse
	pozris2 = posizione all'interno del documento del campo che si riferisce alla seconda della altre 3 risorse
	pozris3 = posizione all'interno del documento del campo che si riferisce alla terza della altre 3 risorse */
function trasporto(nodo, nomerisorsa, maxcarico, quanris, txtrisorsa, pozris, pozris1, pozris2, pozris3)
{
	var parentDiv = nodo.parentNode;
	appoTH = "<th width=\"20\">"+nomerisorsa+"</th>";
	appoTH += "<th>";
	/* pulsante -100k (decrementa di 100000 la quantit  della risorsa selezionata. Se il valore va sottozero, azzera il campo) */ 
	appoTH += "<button type='button' STYLE='font-size:8pt;font-family:Verdana' onclick=\"document.rs."+pozris+".value = parseInt(document.rs."+pozris+".value) - 100000; if(parseInt(document.rs."+pozris+".value)<0) document.rs."+pozris+".value = 0\">-100k</button>";
	/* pulsante -10k */
	appoTH += "<button type='button' STYLE='font-size:8pt;font-family:Verdana' onclick=\"document.rs."+pozris+".value = parseInt(document.rs."+pozris+".value) - 10000; if(parseInt(document.rs."+pozris+".value)<0) document.rs."+pozris+".value = 0\">-10k</button>";
	/* pulsante +10k */
	appoTH += "<button type='button' STYLE='font-size:8pt;font-family:Verdana' onclick=\"document.rs."+pozris+".value = parseInt(document.rs."+pozris+".value) + 10000; if(parseInt(document.rs."+pozris+".value)>";
	appoTH += "Math.min("+maxcarico+"-parseInt(document.rs."+pozris1+".value)-parseInt(document.rs."+pozris2+".value)-parseInt(document.rs."+pozris3+".value), "+quanris+")";
	appoTH += ") document.rs."+pozris+".value =";
	appoTH += "Math.min("+maxcarico+"-parseInt(document.rs."+pozris1+".value)-parseInt(document.rs."+pozris2+".value)-parseInt(document.rs."+pozris3+".value), "+quanris+"); ";
	appoTH += "if(parseInt(document.rs."+pozris+".value)<0) document.rs."+pozris+".value = 0\">+10k</button>";
	/* pulsante +100k */
	appoTH += "<button type='button' STYLE='font-size:8pt;font-family:Verdana' onclick=\"document.rs."+pozris+".value = parseInt(document.rs."+pozris+".value) + 100000; if(parseInt(document.rs."+pozris+".value)>";
	appoTH += "Math.min("+maxcarico+"-parseInt(document.rs."+pozris1+".value)-parseInt(document.rs."+pozris2+".value)-parseInt(document.rs."+pozris3+".value), "+quanris+")";
	appoTH += ") document.rs."+pozris+".value =";
	appoTH += "Math.min("+maxcarico+"-parseInt(document.rs."+pozris1+".value)-parseInt(document.rs."+pozris2+".value)-parseInt(document.rs."+pozris3+".value), "+quanris+"); ";
	appoTH += "if(parseInt(document.rs."+pozris+".value)<0) document.rs."+pozris+".value = 0\">+100k</button>";
	/* campo della risorsa. Abilitato solo se la missione   di tipo trasporto (4) */
	if(document.getElementsByName('typ').item(0).value == 4)
		appoTH += "<div><input type=text name=\""+pozris+"\" maxlength=10 size=10 value=\""+txtrisorsa+"\">";
	else
		appoTH += "<div><input type=text name=\""+pozris+"\" maxlength=10 size=10 disabled value=\""+txtrisorsa+ "\">";
	/* pulsante MAX (immette il massimo trasportabile per quella risorsa, coerentemente con la capacit  di trasporto e la disponibilit  sul Edificio della risorsa selezionata. Se il valore va sottozero azzera il campo) */
	appoTH += "<button type='button' STYLE='font-size:8pt;font-family:Verdana' onclick=\"document.rs."+pozris+".value = ";
	appoTH += "Math.min("+maxcarico+"-parseInt(document.rs."+pozris1+".value)-parseInt(document.rs."+pozris2+".value)-parseInt(document.rs."+pozris3+".value), "+quanris+"); if(parseInt(document.rs."+pozris+".value)<0) document.rs."+pozris+".value = 0\">MAX</button></div>";
	appoTH += "</th>";
	parentDiv.innerHTML = appoTH;					
}
















// bottoni per la gestione dei messaggi
	if (location.pathname.search('msgshow.php') != -1 ) {		
		var page = document.getElementsByTagName("input").item(0);
		newDiv = document.createElement("span");
		newDiv.innerHTML =  '<br> <input type="button" name="Submit" value="Seleziona Tutto" onClick="var inputs = document.getElementsByTagName(\'input\');for (var i = 0; i < inputs.length; i++) {blnEtat=true;if (inputs[i].checked==false) inputs[i].checked=blnEtat;}"> <input type="button" name="Submit2" value="Deseleziona tutto" onClick="var inputs = document.getElementsByTagName(\'input\');for (var i = 0; i < inputs.length; i++) {blnEtat=false;if (inputs[i].checked==true) inputs[i].checked=blnEtat;}"> <input type="button" name="Submit3" value="Inverti Selezione" onClick="var inputs = document.getElementsByTagName(\'input\');for (var i = 0; i < inputs.length; i++) {inputs[i].checked=!inputs[i].checked;}"> <input name="submit" type=submit value="Procedi!">';
		var parentDiv = page.parentNode;
		parentDiv.insertBefore(newDiv, page);
	}


/* dove si usa: messaggi */
	/* cosa fa: aggiunge pulsante per selezionare tutti i messaggi in basso */
	if(location.pathname.search('msgshow.php') != -1)
	{
		var anchorTagsSel = document.getElementsByTagName("select");
		var anchorTagsInp = document.getElementsByTagName("input");
		var leninp = anchorTagsInp.length;

		funzione = "";
		for(var i = 0; i < leninp; i++)
			if(anchorTagsInp[i].getAttribute("type").indexOf("checkbox") != -1)
				funzione += "document.forms[0]." + anchorTagsInp[i].getAttribute("name") + ".checked = true;";

		var newDiv = document.createElement("font");
		var html = "<button type='button'  STYLE='font-size:8pt;font-family:Verdana' onclick='"+funzione+"'>Seleziona Tutto</button>&nbsp;&nbsp;";
		var parentDiv = anchorTagsSel[0].parentNode;
		newDiv.innerHTML = html;
		parentDiv.insertBefore(newDiv, anchorTagsSel[0]);
	}





// Pulsanti di scorrimento Edifici
	if (location.pathname.search('nav.php') != -1 ) {		
		var page = document.getElementsByTagName("select").item(0);
		
		var last  = ''  ;

		// r�cup�ration de l'id de session dans le 1er lien..
		var content=document.getElementsByTagName("a").item(1).getAttribute("href");
   		var tmp1=content.indexOf("?q=",0)+3;
   		var tmp2=content.indexOf("x",tmp1);
		var id=content.substring(tmp1,tmp2);
		
		
		for (var i = 0; i < page.length; i++) {
			
			if (page[i].selected) {
				//bat pr�c�dent
				if (last!='') {
					newDiv = document.createElement("span");
					newDiv.innerHTML =  '<a href="javascript:void(0);" onclick="parent.w.location= chto+\'?q='+id+'x'+last+'\';location=\'nav.php?q='+id+'x'+last+'&w=\'+chto"><img src="http://img464.imageshack.us/img464/1949/precqo0.gif" border="0"></a>&nbsp;';
					var parentDiv = page.parentNode;
					parentDiv.insertBefore(newDiv, page);
					var last='';
				}
				
				// bat suivant
				if (i < page.length) {
					newDiv = document.createElement("span");
					newDiv.innerHTML =  '&nbsp;<a href="javascript:void(0);" onclick="parent.w.location= chto+\'?q='+id+'x'+page[i+1].value+'\';location=\'nav.php?q='+id+'x'+page[i+1].value+'&w=\'+chto"><img src="http://img464.imageshack.us/img464/4351/succit5.gif" border="0"></a>';
					var parentDiv = page.parentNode;
					parentDiv.appendChild(newDiv);
				}
			}else{
				var last=page[i].value;
			}
			
		}
		
	}


