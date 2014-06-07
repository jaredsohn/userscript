// ==UserScript==
// @name           scriptSA by pook version 2.0
// @namespace      Pook
// @description    4eme version du chat spécial pour les alliés (SA et ALC dans un premier temps)
// @include        http://s*.fr.ikariam.com/index.php?view=*
// @exclude        http://fr.ikariam.com/*
// ==/UserScript==


	//pour recuperer le nom de la page où on se trouve
	var test = document.location.href;
	var testSplit =  test.split('=');
	var testSplit2 =  testSplit[1].split('&');
	// alert(testSplit2[0]);
	
	/* 
		Nom des variables de chaques vue
		ville = city
		ile = island
		monde = worldmap_iso
		conseille_ville = tradeAdvisor
		conseille_general = militaryAdvisorMilitaryMovements
		conseil_recherche = researchAdvisor
		conseil_diplomatie = diplomacyAdvisor
		deplacment_bateau_marchand = merchantNavy
		detail_finance = finances
	*/

	function creerChat(nbchat){
		var chat =  '<iframe src=http://www.i-tchat.com/shoutbox/shoutbox.php?idShoutbox='+nbchat+' border=\'0\' height=\'350\' width=\'220\'></iframe>\'<a href="http://societaonorataforum.forumactif.net/forum.htm" target="blank"><b><center>Forum de la SOCIETA ONORATA</center></a>';
		return chat;
	}
	
	
	function creerformulaire(){
		var formNumChat=GM_getValue("nbchat", '0');
		var formisChatTrue=GM_getValue("isChat", '0');
		
		if (formisChatTrue==1){
			var form1 =  '<center><form name="ee"> SA <input type="radio" name="dmc" id="1" > SA/ALC<input type="radio" name="dmc" id="2" > aucun<input type="radio" name="dmc" id="3" checked></form></center>';
		}
		else if (formNumChat==79123)	{  //79123
			var form1 =  '<center><form name="ee"> SA <input type="radio" name="dmc" id="1" checked > SA/ALC<input type="radio" name="dmc" id="2"> aucun<input type="radio" name="dmc" id="3" ></form></center>';
		}
		else if (formNumChat==102677){
			var form1 =  '<center><form name="ee"> SA <input type="radio" name="dmc" id="1" > SA/ALC<input type="radio" name="dmc" id="2" checked> aucun<input type="radio" name="dmc" id="3" ></form></center>';
		}
		else {
		var form1 =  '<center><form name="ee"> SA <input type="radio" name="dmc" id="1" > SA/ALC<input type="radio" name="dmc" id="2" > aucun<input type="radio" name="dmc" id="3" ></form></center>';
		}


		return form1;
	}

	function creerElement(chat,id1,id2){
		var newElementcity = document.createElement("div"); // On cr?e un nouvelle ?l?ment div
		newElementcity.innerHTML = chat; // On met la variable chat dans cet ?l?ment
		document.getElementById(id1).insertBefore(newElementcity, document.getElementById(id2));
		
		var choix1 = document.getElementById("1");
		choix1.addEventListener("click",function(){GM_setValue("nbchat", "79123")},false);
		choix1.addEventListener("click",function(){GM_setValue("isChat", "0")},false);
			
		var choix2 = document.getElementById("2");
		choix2.addEventListener("click",function(){GM_setValue("nbchat", "102677")},false); 
		choix2.addEventListener("click",function(){GM_setValue("isChat", "0")},false);
		
		var choix3 = document.getElementById("3");
		choix3.addEventListener("click",function(){GM_setValue("isChat", "1")},false);
		choix3.addEventListener("click",function(){GM_setValue("nbChat", "0")},false);
		
	}

	//pour la vue de la ville
	if (testSplit2[0]=="city") {
	
		var verifChat=GM_getValue('nbChat','0');
		var ischatTrue=GM_getValue('isChat','0');
		var form1=creerformulaire();
		creerElement(form1,"information","button");
		if(ischatTrue!=1){
			var chat = creerChat(GM_getValue('nbchat', '0'));
			creerElement(chat,"information","button");
			var image ='<img src="http://img43.imageshack.us/img43/2724/extensionscriptchatikar.png">';
			creerElement(image,"mainview","beachboys");
		
		}
	}

	//pour la vue du monde
	if (testSplit2[0]=="worldmap_iso") {
		var verifChat=GM_getValue('nbchat','0');
		var ischatTrue=GM_getValue('isChat','0');
		var form1=creerformulaire();
		creerElement(form1,"navigation","cityressource");
		if(ischatTrue!=1){
			var chat = creerChat(GM_getValue('nbchat', '0'));
			creerElement(chat,"navigation","cityressource");
		}
	}

	//pour la vu de l'ile
	if (testSplit2[0]=="island") {
		var verifChat=GM_getValue('nbchat','0');
		var ischatTrue=GM_getValue('isChat','0');
		var form1=creerformulaire();
		creerElement(form1,"actioncontainer","acceshint");
		if(ischatTrue!=1){
			var chat = creerChat(GM_getValue('nbchat', '0'));
			creerElement(chat,"actioncontainer","accesshint");
		}
	}

	//pour la vue du conseiller de la ville
	if (testSplit2[0]=="tradeAdvisor") { 
		var verifChat=GM_getValue('nbchat','0');
		var ischatTrue=GM_getValue('isChat','0');
		var form1=creerformulaire();
		creerElement(form1,"viewCityImperium","button");
		if(ischatTrue!=1){
			var chat = creerChat(GM_getValue('nbchat', '0'));
			creerElement(chat,"viewCityImperium","button");
		}
	}

	//pour la vue du conseiller militaire
	if (testSplit2[0]=="militaryAdvisorMilitaryMovements") {
	var verifChat=GM_getValue('nbchat','0');
	var ischatTrue=GM_getValue('isChat','0');
		var form1=creerformulaire();
		creerElement(form1,"viewMilitaryImperium","button");
		if(ischatTrue!=1){
			var chat = creerChat(GM_getValue('nbchat', '0'));
			creerElement(chat,"viewMilitaryImperium","button");
		}
	}

	//pour la vue du conseiller de recherche 
	if (testSplit2[0]=="researchAdvisor") {
	var verifChat=GM_getValue('nbchat','0');
	var ischatTrue=GM_getValue('isChat','0');
		var form1=creerformulaire();
		creerElement(form1,"viewResearchImperium","button");
		if(ischatTrue!=1){
			var chat = creerChat(GM_getValue('nbchat', '0'));
			creerElement(chat,"viewResearchImperium","button");
		}
	}	
	
	//pour la vue du conseiller de diplomatie
	if (testSplit2[0]=="diplomacyAdvisor") {
	var verifChat=GM_getValue('nbchat','0');
	var ischatTrue=GM_getValue('isChat','0');
		var form1=creerformulaire();
		creerElement(form1,"viewDiplomacyImperium","button");
		if(ischatTrue!=1){
			var chat = creerChat(GM_getValue('nbchat', '0'));
			creerElement(chat,"viewDiplomacyImperium","button");
		}
	}

