// version 0.1
// 11/06/07
// ==UserScript==
// @name Vendetta Plus 1
// @author Mosaik(ITA), Al_Caponazzo(ITA), Alex(FRA), x-x (SPA), 8javi8/-ARES- (SPA)
// @descrición: Traducción y testeado completado
// @incluye http://s*.vendetta.es/*
// ==/UserScript==

(function(){



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
			newDiv.innerHTML =  "<input type='button'  STYLE='font-size:10pt;font-family:Verdana' value='-' onclick=\"cnt.value--\"><input type='button' value='+' STYLE='font-size:10pt;font-family:Verdana' onclick=\"cnt.value++\"><input type='button' value='Max' STYLE='font-size:10pt;font-family:Verdana' onclick=\"cnt.value='"+maximum+"'\">";
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
			newDiv.innerHTML =  "<input type='button'  STYLE='font-size:10pt;font-family:Verdana' value='-' onclick=\"cnt.value--\"><input type='button' value='+' STYLE='font-size:10pt;font-family:Verdana' onclick=\"cnt.value++\"><input type='button' value='Max' STYLE='font-size:10pt;font-family:Verdana' onclick=\"cnt.value='"+maximum+"'\">";
			var parentDiv = page[i].parentNode;
			parentDiv.insertBefore(newDiv, page[i]);
		}
	}
	
	if (location.pathname.search('flotte.php') != -1 ) {		
	
	var anchorTagsRis = document.getElementsByTagName("td");
	
	range = document.createRange();
	range.selectNode(anchorTagsRis[5]);
	Armi = range.toString();
	Armi = Armi.replace(".","");
	Armi = Armi.replace(".","");
	Armi = Armi.replace(".","");
	
	range.selectNode(anchorTagsRis[6]);
	Munizioni = range.toString();
	Munizioni = Munizioni.replace(".","");
	Munizioni = Munizioni.replace(".","");
	Munizioni = Munizioni.replace(".","");

	range.selectNode(anchorTagsRis[7]);
	Alcool = range.toString();
	Alcool = Alcool.replace(".","");
	Alcool = Alcool.replace(".","");
	Alcool = Alcool.replace(".","");
	
	range.selectNode(anchorTagsRis[8]);
	Dollari = range.toString();
	Dollari = Dollari.replace(".","");
	Dollari = Dollari.replace(".","");
	Dollari = Dollari.replace(".","");
	
	txtArmi = document.getElementsByName('r1').item(0).value
	txtMunizioni = document.getElementsByName('r2').item(0).value
	txtAlcool = document.getElementsByName('r3').item(0).value
	txtDollari = document.getElementsByName('r4').item(0).value
			
	var anchorTags = document.getElementsByTagName("th");
	var casellaTesto = document.getElementsByTagName("input");
	z = 1 ;
	for (var i = 0; i < anchorTags.length ; i++)
	{
		range = document.createRange();
		range.selectNode(anchorTags[i]);
		text = range.toString();
		
		if (text.indexOf('( ',0) != -1){
			newDiv = document.createElement("div");
			newDiv.innerHTML =  "<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs." + casellaTesto[z].getAttribute("name") + ".value-- \"> - </b>&nbsp;<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs." + casellaTesto[z].getAttribute("name") + ".value = '"+ text.substr(text.indexOf('( ',0)+2).replace(" )","") + "'\"> MAX </b>&nbsp;<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs." + casellaTesto[z].getAttribute("name") + ".value++ \"> + </b>&nbsp;";
			var parentDiv = casellaTesto[z].parentNode;
			parentDiv.insertBefore(newDiv, casellaTesto[z]);
			z = z + 1 ;					
			 }

		if (text.indexOf('Armas',0) != -1){

			var parentDiv = anchorTags[i].parentNode;
			appoTH = "<th width=\"230\">Armas</th>"
			appoTH += "<th>"
			appoTH += "<div>&nbsp;<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r1.value = '"+ Armi + "'\"> MAX </b>&nbsp;</div>"
			appoTH += "<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r1.value = parseInt(document.rs.r1.value) - 100000\"> [ -100k ] </b>";
			appoTH += "<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r1.value = parseInt(document.rs.r1.value) - 10000\"> [ -10k ] </b>";
			if(document.getElementsByName('typ').item(0).value == 4){
			appoTH += "<input type=text name=\"r1\" maxlength=10 size=10 value=\""+ txtArmi + "\">"
			}
			else
			{
			appoTH += "<input type=text name=\"r1\" maxlength=10 size=10 disabled value=\""+ txtArmi + "\">"
			}
			appoTH += "<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r1.value = parseInt(document.rs.r1.value) + 10000\"> [ +10k ] </b>";
			appoTH += "<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r1.value = parseInt(document.rs.r1.value) + 100000\"> [ +100k ] </b>";
			appoTH += "</th>"
			parentDiv.innerHTML = appoTH
			
			z = z + 1 ;					
			 }

		if (text.indexOf('Munición',0) != -1){

			var parentDiv = anchorTags[i].parentNode;
			appoTH = "<th width=\"20\">Munición</th>"
			appoTH += "<th>"
			appoTH += "<div>&nbsp;<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r2.value = '"+ Munizioni + "'\"> MAX </b>&nbsp;</div>"
			appoTH += "<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r2.value = parseInt(document.rs.r2.value) - 100000\"> [ -100k ] </b>";
			appoTH += "<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r2.value = parseInt(document.rs.r2.value) - 10000\"> [ -10k ] </b>";
			if(document.getElementsByName('typ').item(0).value == 4){
			appoTH += "<input type=text name=\"r2\" maxlength=10 size=10 value=\""+ txtMunizioni + "\">"
			}
			else
			{
			appoTH += "<input type=text name=\"r2\" maxlength=10 size=10 disabled value=\""+ txtMunizioni + "\">"
			}
			appoTH += "<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r2.value = parseInt(document.rs.r2.value) + 10000\"> [ +10k ] </b>";
			appoTH += "<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r2.value = parseInt(document.rs.r2.value) + 100000\"> [ +100k ] </b>";
			appoTH += "</th>"
			parentDiv.innerHTML = appoTH
			
			z = z + 1 ;					
			 }
			 
		if (text.indexOf('Alcohol',0) != -1){
		
					var parentDiv = anchorTags[i].parentNode;
					appoTH = "<th width=\"20\">Alcohol</th>"
					appoTH += "<th>"
					appoTH += "<div>&nbsp;<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r3.value = '"+ Alcool + "'\"> MAX </b>&nbsp;</div>"
					appoTH += "<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r3.value = parseInt(document.rs.r3.value) - 100000\"> [ -100k ] </b>";
					appoTH += "<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r3.value = parseInt(document.rs.r3.value) - 10000\"> [ -10k ] </b>";
					if(document.getElementsByName('typ').item(0).value == 4){
					appoTH += "<input type=text name=\"r3\" maxlength=10 size=10 value=\""+ txtAlcool + "\">"
					}
					else
					{
					appoTH += "<input type=text name=\"r3\" maxlength=10 size=10 disabled value=\""+ txtAlcool + "\">"
					}
		appoTH += "<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r3.value = parseInt(document.rs.r3.value) + 10000\"> [ +10k ] </b>";
				
		appoTH += "<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r3.value = parseInt(document.rs.r3.value) + 100000\"> [ +100k ] </b>";
					appoTH += "</th>"
					parentDiv.innerHTML = appoTH
					
					z = z + 1 ;					
			 }
		

		if (text.indexOf('Dólar',0) != -1 && !(text.indexOf('(Dólar)',0) != -1)){
		
	
		
			var parentDiv = anchorTags[i].parentNode;
			appoTH = "<th width=\"20\">Dólar</th>"
			appoTH += "<th>"
			appoTH += "<div>&nbsp;<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r4.value = '"+ Dollari + "'\"> MAX </b>&nbsp;</div>"
			appoTH += "<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r4.value = parseInt(document.rs.r4.value) - 100000\"> [ -100k ] </b>";
			appoTH += "<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r4.value = parseInt(document.rs.r4.value) - 10000\"> [ -10k ] </b>";
			if(document.getElementsByName('typ').item(0).value == 4){
			appoTH += "<input type=text name=\"r4\" maxlength=10 size=10 value=\""+ txtDollari + "\">"
			}
			else
			{
			appoTH += "<input type=text name=\"r4\" maxlength=10 size=10 disabled value=\""+ txtDollari + "\">"
			}
			appoTH += "<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r4.value = parseInt(document.rs.r4.value) + 10000\"> [ +10k ] </b>";
			appoTH += "<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r4.value = parseInt(document.rs.r4.value) + 100000\"> [ +100k ] </b>";
			appoTH += "</th>"
			parentDiv.innerHTML = appoTH

			z = z + 1 ;					
		 }
	
	}
		
}
}) ();


// bottoni per la gestione dei messaggi
	if (location.pathname.search('msgshow.php') != -1 ) {		
		var page = document.getElementsByTagName("input").item(0);
		newDiv = document.createElement("span");
		newDiv.innerHTML =  '<br> <input type="button" name="Submit" value="Selecciona Todo" onClick="var inputs = document.getElementsByTagName(\'input\');for (var i = 0; i < inputs.length; i++) {blnEtat=true;if (inputs[i].checked==false) inputs[i].checked=blnEtat;}"> <input type="button" name="Submit2" value="Deselecciona todo" onClick="var inputs = document.getElementsByTagName(\'input\');for (var i = 0; i < inputs.length; i++) {blnEtat=false;if (inputs[i].checked==true) inputs[i].checked=blnEtat;}"> <input type="button" name="Submit3" value="Invierte Seleción" onClick="var inputs = document.getElementsByTagName(\'input\');for (var i = 0; i < inputs.length; i++) {inputs[i].checked=!inputs[i].checked;}"> <input name="submit" type=submit value="Proceder">';
		var parentDiv = page.parentNode;
		parentDiv.insertBefore(newDiv, page);
	}


// changement de bat simplifiï¿½
	if (location.pathname.search('nav.php') != -1 ) {

		var page = document.getElementsByTagName("select").item(0);

		var last  = ''  ;

		content=document.getElementsByTagName("a").item(0).getAttribute("href");
   		var tmp1=content.indexOf("?q=",0)+3;
   		var tmp2=content.indexOf("x",tmp1);
		var id=content.substring(tmp1,tmp2);
		
		
		for (var i = 0; i < page.length; i++) {
			
			if (page[i].selected) {
				//bat prï¿½cï¿½dent
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