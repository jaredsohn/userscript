// ==UserScript==
// @name           Rajout suivante/precedente notice
// @namespace      Snaquekiller
// @include        http://*.ogame.*/game/index.php?page=notices*
//@description rajout un petit lien suivant et precedent dans les notes^^.
// ==/UserScript==

var url = location.href;
var session = document.location.href.replace(/^.*&session=([0-9a-f]*).*$/i,"$1");// id of the sesions

function rajouter_suivant_precedent()
{
	if(document.getElementsByClassName('last-tr')[0])
	{
		var numero_page_cours = parseInt(document.getElementsByClassName('last-tr')[0].getElementsByClassName('undermark')[0].innerHTML.replace( /[^0-9-]/g, ""));
		if(numero_page_cours != '1'){
			var ajout_precedent = '<a href="index.php?page=notices&session='+ session +'&site='+ (numero_page_cours -1)+'"> Précedent</a>';
			var sp1 = document.createElement('span');
				sp1.setAttribute('style','align:left;position:relative;left:80px;text-decoration:underline;');
				sp1.innerHTML = ajout_precedent;
				document.getElementsByClassName('last-tr')[0].getElementsByTagName('td')[0].appendChild(sp1);
 		}
		
		var nombre_dernier = document.getElementsByClassName('last-tr')[0].getElementsByTagName('td')[1].getElementsByTagName('a').length;
		if((nombre_dernier + 1) > numero_page_cours)
		{
			var ajout_suivant = '<a style="text-decoration:underline;" href="index.php?page=notices&session='+ session +'&site='+ (numero_page_cours + 1)+'"> Suivant</a>';
				var sp1 = document.createElement('span');
				sp1.innerHTML = ajout_suivant;
				document.getElementsByClassName('last-tr')[0].getElementsByTagName('td')[1].appendChild(sp1);
		}	
	}
}

function retour_page(){
	var numero_page_cours = parseInt(document.getElementsByClassName('last-tr')[0].getElementsByClassName('undermark')[0].innerHTML.replace( /[^0-9-]/g, ""));
	var nombre = document.getElementsByTagName('tbody')[0].getElementsByClassName('subject').length;
	var lien ='';
	for(var i=1; i<nombre; i++)
	{
		lien = document.getElementsByTagName('tbody')[0].getElementsByClassName('subject')[i].getElementsByTagName('a')[0].href
		document.getElementsByTagName('tbody')[0].getElementsByClassName('subject')[i].getElementsByTagName('a')[0].href = lien +'&page_demander='+numero_page_cours;	
	}	
}
function retour_sur_la_page(){
	var page = url.split('page_demander=')[1];
	
	//document.getElementsByClassName('buttonSave')[1].EventListener("click",  "document.location = 'index.php?page=notices&session="+ session +"&site="+ page +"';" , true);
	document.getElementsByClassName('buttonSave')[1].setAttribute('onclick' , 'document.location = "index.php?page=notices&session='+ session +'&site='+ page +'";');
	
	//document.getElementsByClassName('buttonSave')[1].style.display =none;
	//<input type="button" onclick="document.location = 'index.php?page=notices&amp;session=0f911b9acc70';" value="Retour" class="buttonSave">

}

if(url.indexOf('show=1') == -1){
	rajouter_suivant_precedent();
	retour_page();
}
else{
	retour_sur_la_page();
}
