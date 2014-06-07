// version 0.3
// 27 marzo 2008
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ==UserScript==
// @name Galaxywars Units modified
// @author Mosaik (versione modificata by _LoEsChEr_)
// @descrizione: Aggiunta di nuovi tasti per la gestione delle unità
// @include      http://s*.galaxywars.it/space/*
// ==/UserScript==

(function()
{
	/* dove si usa: nella schermata che elenca i pianeti di un altro giocatore */
	/* cosa fa: aggiunge, davanti alle coordinate di ogni pianeta, un link per la propria schermata flotta */
	if (location.pathname.search('player.php') != -1)
	{
		var pagina = document.getElementsByTagName("a");
		for (var i = 0; i < pagina.length; i++) 
		{
			link = pagina[i].getAttribute("href")
			link = link.replace("planinfo","flotte");
			range = document.createRange();
			range.selectNode(pagina[i]);
			if (range.toString() != "Scrivi messaggio")
			{
				newDiv = document.createElement("b");
				newDiv.innerHTML =  "<b STYLE='font-size:20pt;font-family:Verdana;cursor:pointer;' onclick=\"window.location.href = \'" + link + "';\">-</b>&nbsp;";
	  			var parentDiv = pagina[i].parentNode;
				parentDiv.insertBefore(newDiv, pagina[i]);
			}		
		}
	}

	/* dove si usa: nella schermata che elenca i propri pianeti */
	/* cosa fa: aggiunge, davanti alle coordinate di ogni pianeta, un link per la propria schermata flotta */
	if (location.pathname.search('planets.php') != -1)
	{
		var pagina = document.getElementsByTagName("a");
		var celleth = document.getElementsByTagName("th");
		var coord, i, h;
		for (i = 0, h = 4; i < pagina.length; i+=3, h+=4) 
		{
			link = pagina[i].getAttribute("href");
			link = link.replace("planets","flotte");
			coord = celleth[h].innerHTML;
			coord =  "<b STYLE='font-size:10pt;font-family:Verdana;cursor:pointer;' onclick=\"window.location.href = \'" + link + "';\">-></b>&nbsp;" + coord;
			celleth[h].innerHTML = coord;
		}
	}

	/* dove si usa: cantiere navale */
	/* cosa fa: aggiunge pulsanti */
	if (location.pathname.search('prod.php') != -1 )		 
	{
		var pagina = document.getElementsByName("cnt");
		
		for (var i = 0; i < pagina.length; i++)
		{
			pagina[i].setAttribute("value", "1");
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
			pagina[i].setAttribute("value", "1");
			newDiv = document.createElement("div");
			newDiv.innerHTML =  "<input type='button'  STYLE='font-size:8pt;font-family:Verdana' value='0' onclick=\"cnt.value=0\"><input type='button'  STYLE='font-size:8pt;font-family:Verdana' value='-' onclick=\"cnt.value--\"><input type='button' value='+' STYLE='font-size:8pt;font-family:Verdana' onclick=\"cnt.value++\"><br><input type='button'  STYLE='font-size:8pt;font-family:Verdana' value='+5' onclick=\"for(i=0; i<5; i++)cnt.value++;\"><input type='button'  STYLE='font-size:8pt;font-family:Verdana' value='+10' onclick=\"for(i=0; i<10; i++)cnt.value++;\">";
  			var parentDiv = pagina[i].parentNode;
			parentDiv.insertBefore(newDiv, pagina[i]);
		}
	}

	/* dove si usa: messaggi */
	/* cosa fa: aggiunge pulsante per selezionare tutti i messaggi */
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
		var html = "<button type='button'  STYLE='font-size:8pt;font-family:Verdana' onclick='"+funzione+"'>Seleziona tutti</button>&nbsp;&nbsp;";
		var parentDiv = anchorTagsSel[0].parentNode;
		newDiv.innerHTML = html;
		parentDiv.insertBefore(newDiv, anchorTagsSel[0]);
	}
	
	/* dove si usa: flotta */
	/* cosa fa: aggiunge pulsanti */
	if (location.pathname.search('flotte.php') != -1)
	{
		var anchorTagsRis = document.getElementsByTagName("td");
		range = document.createRange();

		/* rileva il ferro disponibile sul pianeta */
		range.selectNode(anchorTagsRis[5]);
		Ferro = range.toString();
		Ferro = Ferro.replace(".","");
		Ferro = Ferro.replace(".","");
		Ferro = Ferro.replace(".","");
		
		/* rileva il lutino disponibile sul pianeta */
		range.selectNode(anchorTagsRis[6]);
		Lutino = range.toString();
		Lutino = Lutino.replace(".","");
		Lutino = Lutino.replace(".","");
		Lutino = Lutino.replace(".","");

		/* rileva l'acqua disponibile sul pianeta */
		range.selectNode(anchorTagsRis[7]);
		Acqua = range.toString();
		Acqua = Acqua.replace(".","");
		Acqua = Acqua.replace(".","");
		Acqua = Acqua.replace(".","");
		
		/* rileva l'idrogeno disponibile sul pianeta */
		range.selectNode(anchorTagsRis[8]);
		Idrogeno = range.toString();
		Idrogeno = Idrogeno.replace(".","");
		Idrogeno = Idrogeno.replace(".","");
		Idrogeno = Idrogeno.replace(".","");
		
		/* rileva la quantità di ogni risorsa finora immessa nei campi di trasporto */
		txtFerro = document.getElementsByName('r1').item(0).value;
		txtLutino = document.getElementsByName('r2').item(0).value;
		txtAcqua = document.getElementsByName('r3').item(0).value;
		txtIdrogeno = document.getElementsByName('r4').item(0).value;

		var anchorTags = document.getElementsByTagName("th");
		var casellaTesto = document.getElementsByTagName("input");
		var totalenavi = new Array(16);
		var consumo = 0;
		var maxcarico = 1000000000;
		z = 1;

		for (var i = 0; i < anchorTags.length ; i++)
		{
			text = anchorTags[i].innerHTML;

			/* rilevazione consumo (serve per il calcolo dell'idrogeno trasportabile) */
			if (text.indexOf('Consumo (Idrogeno)') != -1)
			{
				text = anchorTags[i+1].innerHTML;
				text = text.replace(".","");
				text = text.replace(".","");
				text = text.replace(".","");
				consumo = parseInt(text);
			}

			/* rilevazione capacità di carico (serve per calcolo del massimo di risorse trasportabili) */
			if (text.indexOf('di carico (-Consumo)') != -1)
			{
				text = anchorTags[i+1].innerHTML;
				text = text.replace(".","");
				text = text.replace(".","");
				text = text.replace(".","");
				text = text.replace(".","");
				maxcarico = parseInt(text)-1;
			}
			
			/* codice dei pulsanti per la selezione delle navi */
			if (text.indexOf('( ',0) != -1)
			{
				var massimo = parseInt(text.substr(text.indexOf('( ',0)+2).replace(" )",""));
				totalenavi[z-1] = massimo;
				newDiv = document.createElement("div");
				/* pulsante 0 (azzera il campo) */
				var html =  "<button type='button'  STYLE='font-size:8pt;font-family:Verdana' onclick=\"document.rs." + casellaTesto[z].getAttribute("name") + ".value=0 \">0</button>";
				/* pulsante - (decrementa di 1 il numero di navi selezionate)*/
				html += "<button type='button'  STYLE='font-size:8pt;font-family:Verdana' onclick=\"document.rs." + casellaTesto[z].getAttribute("name") + ".value--; if(document.rs." + casellaTesto[z].getAttribute("name") + ".value<0) document.rs." + casellaTesto[z].getAttribute("name") + ".value=0\">-</button>";
				/* pulsante + (incrementa di 1 il numero di navi selezionate) */
				html += "<button type='button'  STYLE='font-size:8pt;font-family:Verdana' onclick=\"document.rs." + casellaTesto[z].getAttribute("name") + ".value++; if(document.rs." + casellaTesto[z].getAttribute("name") + ".value >" + massimo + ") document.rs." + casellaTesto[z].getAttribute("name") + ".value="+massimo+";\">+</button>";
				/* pulsante +10 (incrementa di 10 il numero di navi selezionate) */
				html += "<button type='button'  STYLE='font-size:8pt;font-family:Verdana' onclick=\"document.rs." + casellaTesto[z].getAttribute("name") + ".value = parseInt(document.rs." + casellaTesto[z].getAttribute("name") + ".value)+10; if(document.rs." + casellaTesto[z].getAttribute("name") + ".value >" + massimo + ") document.rs." + casellaTesto[z].getAttribute("name") + ".value="+massimo+";\">+10</button>";
				/* pulsante +100 (incrementa di 1 il numero di navi selezionate) */
				html += "<button type='button'  STYLE='font-size:8pt;font-family:Verdana' onclick=\"document.rs." + casellaTesto[z].getAttribute("name") + ".value = parseInt(document.rs." + casellaTesto[z].getAttribute("name") + ".value)+100; if(document.rs." + casellaTesto[z].getAttribute("name") + ".value >" + massimo + ") document.rs." + casellaTesto[z].getAttribute("name") + ".value="+massimo+";\">+100</button>";
				/* pulsante MAX (seleziona tutte le navi disponibili di quel tipo) */
				html += "<button type='button'  STYLE='font-size:8pt;font-family:Verdana' onclick=\"document.rs." + casellaTesto[z].getAttribute("name") + ".value = '"+ massimo + "'\">MAX</button>";
				var parentDiv = casellaTesto[z].parentNode;
				newDiv.innerHTML = html;
				parentDiv.insertBefore(newDiv, casellaTesto[z]);
				z++;					
			}

			/* codice pulsante Seleziona tutte */
			if (text.indexOf('Totale navi',0)  != -1 || text.indexOf('Pianeta',0)  != -1)
			{
				var html = "<button type='button' STYLE='font-size:8pt;font-family:Verdana' onclick=\""
				for(var j = 0; j < z-1; j++)
					html+="document.rs."+casellaTesto[j+1].getAttribute("name")+".value = "+totalenavi[j]+"; "
				html += "\">SELEZIONA TUTTE</button>";
				anchorTags[2].innerHTML = "Numero<br><br>"+html;
			}

			/* codice pulsanti per il carico di Ferro */
			if (text.indexOf('Ferro',0) != -1)
				trasporto(anchorTags[i], "Ferro", maxcarico, Ferro, txtFerro, "r1", "r2", "r3", "r4");	

			/* codice pulsanti per il carico di Lutino */
			if (text.indexOf('Lutino',0) != -1)
				trasporto(anchorTags[i], "Lutino", maxcarico, Lutino, txtLutino, "r2", "r1", "r3", "r4");
			 
			/* codice pulsanti per il carico di Acqua */
			if (text.indexOf('Acqua',0) != -1)
				trasporto(anchorTags[i], "Acqua", maxcarico, Acqua, txtAcqua, "r3", "r1", "r2", "r4");

			/* codice pulsanti per il carico di Idrogeno */			 
			if (text.indexOf('Idrogeno',0) != -1 && text.indexOf('(Idrogeno)',0) != 8) /* per space4k.com l'8 va modificato in 12) */
				trasporto(anchorTags[i], "Idrogeno", maxcarico, Idrogeno-consumo, txtIdrogeno, "r4", "r1", "r2", "r3");
		}
	}
}) ();

/* funzione ausiliaria per i pulsanti di carico delle risorse nella schermata flotta */
/*	nodo = sottonodo HTML che va sostituito 
	nomerisorsa = stringa contenente il nome della risorsa
	maxcarico = capacità di carico - consumo
	quanris = quantità di risorsa selezionata disponibile sul pianeta
	txtrisorsa = quantità di risorsa selezionata finora caricata
	pozris = posizione all'interno del documento del campo che si riferisce alla risorsa selezionata
	pozris1 = posizione all'interno del documento del campo che si riferisce alla prima della altre 3 risorse
	pozris2 = posizione all'interno del documento del campo che si riferisce alla seconda della altre 3 risorse
	pozris3 = posizione all'interno del documento del campo che si riferisce alla terza della altre 3 risorse */
function trasporto(nodo, nomerisorsa, maxcarico, quanris, txtrisorsa, pozris, pozris1, pozris2, pozris3)
{
	var parentDiv = nodo.parentNode;
	appoTH = "<th width=\"20\">"+nomerisorsa+"</th>";
	appoTH += "<th>";
	/* pulsante -100k (decrementa di 100000 la quantità della risorsa selezionata. Se il valore va sottozero, azzera il campo) */ 
	appoTH += "<button type='button' STYLE='font-size:8pt;font-family:Verdana' onclick=\"document.rs."+pozris+".value = parseInt(document.rs."+pozris+".value) - 100000; if(parseInt(document.rs."+pozris+".value)<0) document.rs."+pozris+".value = 0\">-100k</button>";
	/* pulsante -10k */
	appoTH += "<button type='button' STYLE='font-size:8pt;font-family:Verdana' onclick=\"document.rs."+pozris+".value = parseInt(document.rs."+pozris+".value) - 10000; if(parseInt(document.rs."+pozris+".value)<0) document.rs."+pozris+".value = 0\">-10k</button>";
	/* pulsante -1k */
	appoTH += "<button type='button' STYLE='font-size:8pt;font-family:Verdana' onclick=\"document.rs."+pozris+".value = parseInt(document.rs."+pozris+".value) - 1000; if(parseInt(document.rs."+pozris+".value)<0) document.rs."+pozris+".value = 0\">-1k</button>";
	/* pulsante +1k (incrementa di 1000 la quantità della risorsa selezionata. Se il valore va oltre la capacità di carico oppure oltre la quantità disponibile di quella risorsa, immette nel campo il minimo tra questi 2 valori. Se il valore va sottozero (succede quando si è immessa manualmente una quantità superando la capacità di carico) azzera il campo) */
	appoTH += "<button type='button' STYLE='font-size:8pt;font-family:Verdana' onclick=\"document.rs."+pozris+".value = parseInt(document.rs."+pozris+".value) + 1000; if(parseInt(document.rs."+pozris+".value)>";
	appoTH += "Math.min("+maxcarico+"-parseInt(document.rs."+pozris1+".value)-parseInt(document.rs."+pozris2+".value)-parseInt(document.rs."+pozris3+".value), "+quanris+")";
	appoTH += ") document.rs."+pozris+".value =";
	appoTH += "Math.min("+maxcarico+"-parseInt(document.rs."+pozris1+".value)-parseInt(document.rs."+pozris2+".value)-parseInt(document.rs."+pozris3+".value), "+quanris+"); ";
	appoTH += "if(parseInt(document.rs."+pozris+".value)<0) document.rs."+pozris+".value = 0\">+1k</button>";
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
	/* campo della risorsa. Abilitato solo se la missione è di tipo trasporto (4) */
	if(document.getElementsByName('typ').item(0).value == 4)
		appoTH += "<div><input type=text name=\""+pozris+"\" maxlength=10 size=10 value=\""+txtrisorsa+"\">";
	else
		appoTH += "<div><input type=text name=\""+pozris+"\" maxlength=10 size=10 disabled value=\""+txtrisorsa+ "\">";
	/* pulsante MAX (immette il massimo trasportabile per quella risorsa, coerentemente con la capacità di carico e la disponibilità sul pianeta della risorsa selezionata. Se il valore va sottozero azzera il campo) */
	appoTH += "<button type='button' STYLE='font-size:8pt;font-family:Verdana' onclick=\"document.rs."+pozris+".value = ";
	appoTH += "Math.min("+maxcarico+"-parseInt(document.rs."+pozris1+".value)-parseInt(document.rs."+pozris2+".value)-parseInt(document.rs."+pozris3+".value), "+quanris+"); if(parseInt(document.rs."+pozris+".value)<0) document.rs."+pozris+".value = 0\">MAX</button></div>";
	appoTH += "</th>";
	parentDiv.innerHTML = appoTH;					
}