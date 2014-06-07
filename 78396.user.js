// ==UserScript==
// @name          Copie Flotte
// @namespace     http://www.rakanishu.tx.la
// @description   Ce script permet de copier/coller des flottes à partir de la vue flotte dans OGame Redesign
// @include       http://*.ogame.fr/game/index.php?page=fleet1*
// ==/UserScript==


function createTableArray(val) {
	var tbl = document.createElement('TABLE');
	var tr = document.createElement('TR')
	var tbody=document.createElement('TBODY');
	var thead=tbl.createTHead();
	var tfoot=tbl.createTFoot();

	for (var j = 0; j <=1; j++) {
		var td = document.createElement('TH');
		td.style.textAlign='center';
		td.className='headerFlotte';
		td.appendChild(document.createTextNode(val[0][j]));
		tr.appendChild(td);
	}
	thead.appendChild(tr);

	m = val.length;
	for(var i = 1; i < m; i++){
		var tr = document.createElement('TR');
		var td=document.createElement('TD');
		td.className='typeVaisseau';
		td.style.textAlign="left";
		td.appendChild(document.createTextNode(val[i][0]));
		tr.appendChild(td);
		 
		td=document.createElement('TD');
		td.style.textAlign="right";
		td.className='nbVaisseaux'
		td.appendChild(document.createTextNode(val[i][1]));
		tr.appendChild(td);

		tbody.appendChild(tr);
	}
	tbl.id='tableFlotte';
	tbl.appendChild(thead);
	tbl.appendChild(tfoot);
	tbl.appendChild(tbody);
	return tbl;
 } 

 function getTableFlotte(){
	var tableauFlotte=new Array();
	var cVaisseau; var noVaisseau; var vaisseau;
	var j=1,s;
	for (var i=202;i<=215;i++)	{
		if (i!=212){
			noVaisseau= 'button' + i;
			cVaisseau=document.getElementById(noVaisseau);
			if (cVaisseau!=null){ //on v곩fie qu'il y ait une flotte {
				tableauFlotte[0]=new Array();
				tableauFlotte[0][0]='Vaisseaux';
				tableauFlotte[0][1]='Nombre';
				
				if(cVaisseau.getAttribute('class')=='on'){
					tableauFlotte[j]=new Array();			
					vaisseau=cVaisseau.getElementsByClassName('level')[0];
					
					tableauFlotte[j][0]=vaisseau.getElementsByClassName('textlabel')[0].innerHTML;
					s=vaisseau.innerHTML;
					s=s.substr(s.lastIndexOf('>')+1,s.length);
					tableauFlotte[j++][1]=s;
				}
			}
		}
	}
	return tableauFlotte;
}

function afficherFlotte(){
	var table=createTableArray(getTableFlotte());
	var boutonContinuer=document.getElementById('continue');	

	table.style.position='relative';
	table.style.overflow='auto';

	addCSS();
	document.getElementById('allornone').getElementsByClassName('allornonewrap')[0].id='allorflotte';
	var allorflotte=document.getElementById('allorflotte');
	var div=document.createElement('div');
	
	document.getElementById('fleet1').insertBefore(div,document.getElementById('siteFooter'));
	allorflotte.insertBefore(table,document.getElementsByClassName('secondcol fleft')[0].nextSibling);
	
}

function addCSS(){
	var css = document.styleSheets[0];
	
	
	with (css){
		if (document.all){
			//Règles CSS pour IE
			//Déplacement du bouton "Continuer" sous les bouton "tous les vaisseaux" et "Aucun vaisseau"
			addRule('#continue','margin-right: 5; display: block; position: absolute; left: 13px; top: 80px;  ');
			addRule('#allorflotte','width: 700px; position: relative;');
			
			//Style du tableau de flotte
			addRule('#tableFlotte','border: 2px solid; border-collapse: collapse; position: relative; left: 50px;');
			addRule('.typeVaisseau, .nbVaisseaux','border-top: 1px solid; border-right: 2px solid; padding-left: 3px; padding-right: 3px;');
			addRule('.headerFlotte','border: 2px solid; padding-left: 3px; padding-right: 3px;');
		}
		else {	
			var cssEOF=css.cssRules.length;
			//Règles CSS pour les autres navigateurs
			//Déplacement du bouton "Continuer" sous les boutons "tous les vaisseaux" et "Aucun vaisseau"
			insertRule('#continue{margin-right: 5; display: block; position: absolute; left: 13px; top: 80px;  }',cssEOF);
			insertRule('#allorflotte{min-height: 100px;}',cssEOF);
			insertRule('#allornone, #boxBG, #box, #inhalt, #buttonz{height: auto !important;}',cssEOF);
		
			//Style du tableau de flotte
			insertRule('#tableFlotte{border: 2px solid; border-collapse: collapse; position: absolute; margin-right: 10px; margin-left: auto;}',cssEOF);
			insertRule('.typeVaisseau, .nbVaisseaux{border-top: 1px solid; border-right: 2px solid; padding-left: 3px; padding-right: 3px;}',cssEOF);
			insertRule('.headerFlotte{border: 2px solid; padding-left: 3px; padding-right: 3px;}',cssEOF);
		}
	}
}


afficherFlotte();

