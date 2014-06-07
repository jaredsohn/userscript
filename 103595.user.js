// ==UserScript==
// @name           scriptGeneral
// @namespace      Pook
// @description    vue des attaques pour le général sur la vue de la ville
// @include        http://s*.fr.ikariam.com/index.php?view=*
// @exclude        http://fr.ikariam.com/*
// ==/UserScript==


	//pour recuperer le nom de la page où on se trouve
	var test = document.location.href;
	var testSplit =  test.split('=');
	var testSplit2 =  testSplit[1].split('&');
        var IDville =79404;

// ID andgie : 134471
// ID Pook : 12671
// ID Ricky : 79404
// ID loup : 207107
// ID loup : 297741
// ID totalA : 12821
// ID generalTotal : 162617

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

	function creerVueGeneral(){
		var chat =  '<iframe src=http://s2.fr.ikariam.com/index.php?view=embassyGeneralAttacksToAlly&id='+IDville+' border=\'0\' height=\'0\' width=\'0\' align="left" scrolling=no vspace=\'100\'></iframe>\'';
		return chat;
	}
	
	function imageBeach(lvl){
	
		if (lvl==1){
			var image ='<img src="http://img6.imageshack.us/img6/6730/imagescriptgenerallvl1.png">';
		}
		else if(lvl==2){
			var image ='<img src="http://img233.imageshack.us/img233/6678/imagescriptgenerallvl2b.png">';
		}
		else if(lvl==3){
			var image ='<img src="http://img339.imageshack.us/img339/1809/imagescriptgenerallvl3b.png">';
		}
		else if(lvl==4){
			var image ='<img src="http://img863.imageshack.us/img863/1718/imagescriptgenerallvl4b.png">';
		}	
		var newElementcityImg = document.createElement("div"); // On cr?e un nouvelle ?l?ment div
		newElementcityImg.innerHTML = image;// On met la variable chat dans cet ?l?ment
		parent.document.getElementById("mainview").insertBefore(newElementcityImg, document.getElementById("beachboys"));
	}
	function creerElement(chat,id1,id2){
		var newElementcity = document.createElement("div"); // On cr?e un nouvelle ?l?ment div
		newElementcity.innerHTML = chat; // On met la variable chat dans cet ?l?ment
		document.getElementById(id1).insertBefore(newElementcity, document.getElementById(id2));
		
	}

	//pour la vue de la ville
	if (testSplit2[0]=="city") {
			var chat = creerVueGeneral();
			creerElement(chat,"footer","copyright");
	}
	
	/*
	if (testSplit2[0]=="island") {
			var chat = creerVueGeneral();
			creerElement(chat,"footer","copyright");
	}
	if (testSplit2[0]=="worldmap_iso") {
			var chat = creerVueGeneral();
			creerElement(chat,"footer","copyright");
	}*/
	
	if (testSplit2[0]=="embassyGeneralAttacksToAlly") {
	
		var newElementcity3 = document.createElement("div"); // On cr?e un nouvelle ?l?ment div
		newElementcity3.innerHTML = '<a href="http://s2.fr.ikariam.com/index.php?view=embassyGeneralAttacksToAlly&id='+IDville+'"><b><center>Page Attaque</center></a>'
		parent.document.getElementById("information").insertBefore(newElementcity3, document.getElementById("button"));
		
		for (i=0;i<5;i++){
			var tempsA = document.getElementById("mainview").getElementsByClassName('rowRanks')[i].getElementsByClassName('type')[0].innerHTML;
			var pseudoA = document.getElementById("mainview").getElementsByClassName('rowRanks')[i].getElementsByTagName('a')[0].innerHTML;
			var lienVilleA = document.getElementById("mainview").getElementsByClassName('rowRanks')[i].getElementsByTagName('a')[0].href;
			var actionA = document.getElementById("mainview").getElementsByClassName('rowRanks')[i].getElementsByTagName('td')[1].innerHTML;
			var nbUnite = document.getElementById("mainview").getElementsByClassName('rowRanks')[i].getElementsByTagName('td')[2].innerHTML;
			var pseudoD = document.getElementById("mainview").getElementsByClassName('rowRanks')[i].getElementsByTagName('a')[1].innerHTML;
			var lienVilleD = document.getElementById("mainview").getElementsByClassName('rowRanks')[i].getElementsByTagName('a')[1].href;
						
			//?view=island&cityId=133669
			/////////////definition du temps restant///////////////
			var testTemps = document.getElementById("mainview").getElementsByClassName('rowRanks')[i].getElementsByClassName('time')[0].innerHTML;
			if(testTemps.indexOf("m")>=0){
				tempsBis=testTemps;
			}
			else{
				tempsBis="en cours";
			}
			////////////fin de definition du temps restant/////////////
			
			var newElementcity2 = document.createElement("div"); // On cr?e un nouvelle ?l?ment div
			newElementcity2.innerHTML = "attaque dans : "+ tempsBis+"<br> par : <a href="+lienVilleA+"><b>"+pseudoA+"</b></a><br>"+actionA+'('+nbUnite+")<br>cible :  <a href="+lienVilleD+"><font color='red'><b>"+pseudoD+"</b></font></a><br/><br/><br/>"; // On met la variable chat dans cet ?l?ment
			parent.document.getElementById("information").insertBefore(newElementcity2, document.getElementById("button"));
			imageBeach(i+1)
		}	
	}
