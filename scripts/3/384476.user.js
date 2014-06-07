// ==UserScript==
// @name        Fast-Pc Alliance
// @namespace   http://psrparis.si.francetelecom.fr/allix/index.php
// @include     http://psrparis.si.francetelecom.fr/allix/index.php*
// @version     1.6
// @grant       none
// ==/UserScript==

// On prépare l'adresse de fastpc
fastpcAdr = 'http://127.0.0.1/fast-pc/';

//On traite l'url 
var urlPage = document.URL;
//On rend invisible si le code existe
if(urlPage.indexOf('TO=')!=-1){
    document.body.setAttribute("style","display:none");
}

var direction = urlPage.substring(urlPage.indexOf('TO=')+3,urlPage.indexOf('TO=')+6);
var dem = urlPage.substring(urlPage.indexOf('ND=')+3,urlPage.indexOf('ND=')+15);

//On récupére le gassi
var gassi = '';
var tr = document.getElementsByTagName("tr");
//alert("tr "+tr[9].innerHTML);
if(tr.length>=9){
	var td = tr[9].getElementsByTagName("td");
	if(td.length >=1){
		gassi = td[1].textContent;
	}
}

// Prise en charge de l'erreur de gassi
if(gassi.length<8){
	while(gassi.length<8){
		gassi = prompt("Veuillez entrer votre code Alliance");
		// if(gassi.length<8){
			// Alert("Code alliance erronné");
		// }
	}
}
if(direction =="CAP"){
    //On recupére l'adresse
    var adresse = urlPage.substring(urlPage.indexOf('ADRESSE=')+8);
    //On traite les espaces casper
    adresse = adresse.replace(/%A0/g, ' ');
    adresse = adresse.replace(/%C2/g, ' ');
    adresse = adresse.replace(/%20/g, ' ');
    //alert(adresse);

    //On recrée l'url
    var cappc ="http://cappc.reseau.francetelecom.fr/fast_pc_cap_pc.php";
    cappc = cappc+"?ND="+dem+"&ADRESSE="+adresse+"&GASSI="+gassi;
    
    //On redirige
    location.href=cappc;
    
}else if(direction=="CRA"){
    var base = urlPage.substring(urlPage.indexOf('BASE=')+5,urlPage.indexOf('BASE=')+7);
    var commune = urlPage.substring(urlPage.indexOf('COMMUNE=')+8,urlPage.indexOf('COMMUNE=')+13);
    var voie = urlPage.substring(urlPage.indexOf('VOIE=')+5,urlPage.indexOf('VOIE=')+9);
	var numero = urlPage.substring(urlPage.indexOf('NUMERO=')+7);
	var nd = urlPage.substring(urlPage.indexOf('ND=')+3,urlPage.indexOf('ND=')+15);
	
    //Adresse de fastpc du cra
    var fastpc = fastpcAdr+"Pharaon/pharaon_cra.php?&TYPE_PROCEDURE=Cra_Pharaon&GASSI="+gassi+"&ND="+nd+"&BASE="+base+"&COMMUNE="+commune+"&VOIE="+voie+"&NUMERO="+numero;
     //On redirige
    location.href=fastpc;
}else if (direction=="GIS"){
	var phrase = urlPage.substring(urlPage.indexOf("GIS")+3);
	// alert(phrase);
	
	var fastpc = fastpcAdr+"Pharaon/pharaon_gis.php?&TYPE_PROCEDURE=Gis_Pharaon&GASSI="+gassi+phrase;
    // On redirige
    location.href=fastpc;
}else if (direction=="MAA"){
	var phrase = urlPage.substring(urlPage.indexOf("MAA")+3);
	// alert(phrase);
	
	var fastpc = fastpcAdr+"maa/index.php?&Gassi="+gassi+phrase;
    // On redirige
    location.href=fastpc;
}
