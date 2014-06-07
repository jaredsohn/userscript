// version 1.0 13 Avril 2007
// ==UserScript==
// @name Vendetta
// @author Mosaik, Alex
// @descrizione: 
// @include      http://*/vendetta/*
// ==/UserScript==

(function(){
	
	// suppression de la pub, décalage 1pixel ressources ....
	if (location.pathname.search('uebersicht.php') != -1 || location.pathname.search('konst.php') != -1 || location.pathname.search('prod.php') != -1 || location.pathname.search('vert.php') != -1 ) {		
		/*
		forschung.php
		planets.php
		suche.php
		technik.php
		ally.php
		res.php
		map.php
		flotte.php
		msg.php
		highscore.php
		*/
		// on décale d'un px le bandeau
		var table = document.getElementsByTagName("table");
		for (var i = 0; i < table.length; i++) {
			style=table[i].getAttribute("style");
			if (style=="position: fixed; left: 47px;") {
				table[i].setAttribute("style",'position: fixed; left:48px;')
			}
		}


		// on supprime la pub ..
		var table = document.getElementsByTagName("table");
		for (var i = 0; i < table.length; i++) {
			width=table[i].getAttribute("width");
			if (width==519) {
				table[i].innerHTML='';
			}
		}
	}
	


	if (location.pathname.search('player.php') != -1 ) {		
		// met un lien vers le joueur
		var page = document.getElementsByTagName("a");
		for (var i = 0; i < page.length; i++) {
			link = page[i].getAttribute("href")
			link = link.replace("planinfo","flotte");
			range = document.createRange();
			range.selectNode(page[i]);
			if (range.toString() != "Ecrire un message"){
				newDiv = document.createElement("b");
				newDiv.innerHTML =  "<b STYLE='font-size:10pt;font-family:Verdana;cursor:pointer;' onclick=\"window.location.href = \'" + link + "';\">-></b>&nbsp;";
				var parentDiv = page[i].parentNode;
				parentDiv.insertBefore(newDiv, page[i]);
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
				case '1': //Casseur
					var couts_armes=200;
					var couts_munitions=1000;
					var couts_dollars=0;
				break;
				case '2'://Videur
					var couts_armes=500;
					var couts_munitions=800;
					var couts_dollars=0;
				break;
				case '3'://Bandit
					var couts_armes=1000;
					var couts_munitions=200;
					var couts_dollars=0;
				break;
				case '4'://Héro de la gâchette
					var couts_armes=2000;
					var couts_munitions=3000;
					var couts_dollars=0;
				break;
				case '5'://troupe d'occupation
					var couts_armes=2000;
					var couts_munitions=3000;
					var couts_dollars=20000;
				break;
				case '6'://Espion
					var couts_armes=500;
					var couts_munitions=200;
					var couts_dollars=0;
				break;
				case '7'://Emballeur
					var couts_armes=300;
					var couts_munitions=100;
					var couts_dollars=1000;
				break;
				case '8'://Agent CIA
					var couts_armes=7000;
					var couts_munitions=10000;
					var couts_dollars=2500;
				break;
				case '9'://Agent FBI
					var couts_armes=4000;
					var couts_munitions=6000;
					var couts_dollars=1000;
				break;
				case '10'://Transporteur
					var couts_armes=1000;
					var couts_munitions=2000;
					var couts_dollars=5000;
				break;
				case '11'://Débloqueur de situation
					var couts_armes=5000;
					var couts_munitions=1000;
					var couts_dollars=4000;
				break;
				case '12'://Tireur d´élite
					var couts_armes=4000;
					var couts_munitions=500;
					var couts_dollars=2000;
				break;
				case '13'://Tueur profesionel
					var couts_armes=10000;
					var couts_munitions=15000;
					var couts_dollars=10000;
				break;
				case '14'://Ninja
					var couts_armes=2000;
					var couts_munitions=1000;
					var couts_dollars=30000;
				break;
				case '15'://Déposeur de bombes
					var couts_armes=40000;
					var couts_munitions=6000;
					var couts_dollars=20000;
				break;
				case '16'://Mercenaire
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
				case '1': //Travailleurs
					var couts_armes=500;
					var couts_munitions=500;
					var couts_dollars=0;
				break;
				case '2'://Gardes des objets
					var couts_armes=2000;
					var couts_munitions=3000;
					var couts_dollars=100;
				break;
				case '3'://Policiers
					var couts_armes=5000;
					var couts_munitions=7500;
					var couts_dollars=500;
				break;
				case '4'://Gardes du corps
					var couts_armes=3000;
					var couts_munitions=1000;
					var couts_dollars=4000;
				break;
				case '5'://Gradien
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


	// boutons cocher décocher pour les messages
	if (location.pathname.search('msgshow.php') != -1 ) {		
		var page = document.getElementsByTagName("input").item(0);
		newDiv = document.createElement("span");
		newDiv.innerHTML =  '<br> <input type="button" name="Submit" value="Tout cocher" onClick="var inputs = document.getElementsByTagName(\'input\');for (var i = 0; i < inputs.length; i++) {blnEtat=true;if (inputs[i].checked==false) inputs[i].checked=blnEtat;}"> <input type="button" name="Submit2" value="Tout d&eacute;cocher" onClick="var inputs = document.getElementsByTagName(\'input\');for (var i = 0; i < inputs.length; i++) {blnEtat=false;if (inputs[i].checked==true) inputs[i].checked=blnEtat;}"> <input type="button" name="Submit3" value="inverser la selection" onClick="var inputs = document.getElementsByTagName(\'input\');for (var i = 0; i < inputs.length; i++) {inputs[i].checked=!inputs[i].checked;}"> <input name="submit" type=submit value="en avant!">';
		var parentDiv = page.parentNode;
		parentDiv.insertBefore(newDiv, page);
	}

	
	
	// changement de bat simplifié
	if (location.pathname.search('nav.php') != -1 ) {		
		var page = document.getElementsByTagName("select").item(0);
		
		var last  = ''  ;

		// récupération de l'id de session dans le 1er lien..
		var content=document.getElementsByTagName("a").item(1).getAttribute("href");
   		var tmp1=content.indexOf("?q=",0)+3;
   		var tmp2=content.indexOf("x",tmp1);
		var id=content.substring(tmp1,tmp2);
		
		
		for (var i = 0; i < page.length; i++) {
			
			if (page[i].selected) {
				//bat précédent
				if (last!='') {
					newDiv = document.createElement("span");
					newDiv.innerHTML =  '<a href="javascript:void(0);" onclick="parent.w.location= chto+\'?q='+id+'x'+last+'\';location=\'nav.php?q='+id+'x'+last+'&w=\'+chto"><img src="http://www.justalex.org/vendetta_user_js/precedant.gif" border="0"></a>&nbsp;';
					var parentDiv = page.parentNode;
					parentDiv.insertBefore(newDiv, page);
					var last='';
				}
				
				// bat suivant
				if (i < page.length) {
					newDiv = document.createElement("span");
					newDiv.innerHTML =  '&nbsp;<a href="javascript:void(0);" onclick="parent.w.location= chto+\'?q='+id+'x'+page[i+1].value+'\';location=\'nav.php?q='+id+'x'+page[i+1].value+'&w=\'+chto"><img src="http://www.justalex.org/vendetta_user_js/suivant.gif" border="0"></a>';
					var parentDiv = page.parentNode;
					parentDiv.appendChild(newDiv);
				}
			}else{
				var last=page[i].value;
			}
			
		}
		
	}
	
	
	
	if (location.pathname.search('flotte.php') != -1 ) {		
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
	
		range.selectNode(anchorTagsRis[7]);
		Alcool = range.toString();
		Alcool = Alcool.replace(".","");
		Alcool = Alcool.replace(".","");
		Alcool = Alcool.replace(".","");
		
		range.selectNode(anchorTagsRis[8]);
		Dollars = range.toString();
		Dollars = Dollars.replace(".","");
		Dollars = Dollars.replace(".","");
		Dollars = Dollars.replace(".","");
		
		txtArmes = document.getElementsByName('r1').item(0).value
		txtMunitions = document.getElementsByName('r2').item(0).value
		txtAlcool = document.getElementsByName('r3').item(0).value
		txtDollars = document.getElementsByName('r4').item(0).value
			
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
	
			if (text.indexOf('Armes',0) != -1){
	
				var parentDiv = anchorTags[i].parentNode;
				appoTH = "<th width=\"230\">Armes</th>"
				appoTH += "<th>"
				appoTH += "<div>&nbsp;<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r1.value = '"+ Armes + "'\"> MAX </b>&nbsp;</div>"
				appoTH += "<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r1.value = parseInt(document.rs.r1.value) - 100000\"> [ -100k ] </b>";
				appoTH += "<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r1.value = parseInt(document.rs.r1.value) - 10000\"> [ -10k ] </b>";
			if(document.getElementsByName('typ').item(0).value == 4){
			appoTH += "<input type=text name=\"r1\" maxlength=10 size=10 value=\""+ txtArmes + "\">"
			}
			else
			{
			appoTH += "<input type=text name=\"r1\" maxlength=10 size=10 disabled value=\""+ txtArmes + "\">"
			}
			appoTH += "<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r1.value = parseInt(document.rs.r1.value) + 10000\"> [ +10k ] </b>";
			appoTH += "<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r1.value = parseInt(document.rs.r1.value) + 100000\"> [ +100k ] </b>";
			appoTH += "</th>"
			parentDiv.innerHTML = appoTH
			
			z = z + 1 ;					
			 }

		if (text.indexOf('Munitions',0) != -1){


			var parentDiv = anchorTags[i].parentNode;
			appoTH = "<th width=\"20\">Munitions</th>"
			appoTH += "<th>"
			appoTH += "<div>&nbsp;<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r2.value = '"+ Munitions + "'\"> MAX </b>&nbsp;</div>"
			appoTH += "<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r2.value = parseInt(document.rs.r2.value) - 100000\"> [ -100k ] </b>";
			appoTH += "<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r2.value = parseInt(document.rs.r2.value) - 10000\"> [ -10k ] </b>";
			if(document.getElementsByName('typ').item(0).value == 4){
			appoTH += "<input type=text name=\"r2\" maxlength=10 size=10 value=\""+ txtMunitions + "\">"
			}
			else
			{
			appoTH += "<input type=text name=\"r2\" maxlength=10 size=10 disabled value=\""+ txtMunitions + "\">"
			}
			appoTH += "<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r2.value = parseInt(document.rs.r2.value) + 10000\"> [ +10k ] </b>";
			appoTH += "<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r2.value = parseInt(document.rs.r2.value) + 100000\"> [ +100k ] </b>";
			appoTH += "</th>"
			parentDiv.innerHTML = appoTH
			
			z = z + 1 ;					
			 }
			 
		if (text.indexOf('Alcool',0) != -1){
		
					var parentDiv = anchorTags[i].parentNode;
					appoTH = "<th width=\"20\">Alcool</th>"
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
			 
		if (text.indexOf('Dollar',0) != -1 && text.indexOf('(Dollar)',0) != 8){
			var parentDiv = anchorTags[i].parentNode;
			appoTH = "<th width=\"20\">Dollar</th>"
			appoTH += "<th>"
			appoTH += "<div>&nbsp;<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r4.value = '"+ Dollars + "'\"> MAX </b>&nbsp;</div>"
			appoTH += "<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r4.value = parseInt(document.rs.r4.value) - 100000\"> [ -100k ] </b>";
			appoTH += "<b style=\"font-size:8pt;cursor:pointer;\" onclick=\"document.rs.r4.value = parseInt(document.rs.r4.value) - 10000\"> [ -10k ] </b>";
			if(document.getElementsByName('typ').item(0).value == 4){
			appoTH += "<input type=text name=\"r4\" maxlength=10 size=10 value=\""+ txtDollars + "\">"
			}
			else
			{
			appoTH += "<input type=text name=\"r4\" maxlength=10 size=10 disabled value=\""+ txtDollars + "\">"
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