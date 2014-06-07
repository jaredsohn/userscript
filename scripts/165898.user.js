// ==UserScript==
// @name         StarsQuest : reduirePages
// @namespace    StarsQuest : reduirePages
// @description	 Permet de reduire les differentes pages du jeu en les reformatant [StarsQuest's scripts string]
// @author       Benoit485
// @version      0.4
// @date         2013-10-20 19H20
// @include      http://s*.starsquest.co.uk/game.php?page=buildings*
// ==/UserScript==
	
/*
	V_0.4 => 2013-10-20 19H20 (Ansaerys devient StarsQuest)
	V_0.3 => 2013-09-04 21H30
*/

var ansa = unsafeWindow.ansa;
eval(ansa.initScript(
{
	id: 'reduirePages',
	name: 'Formatages des pages',
	version: '0.4',
	url: 'https://userscripts.org/scripts/source/165898.user.js', 
	options: {}
}) );

if(ansa.url.get.match(/page=buildings$/) || ansa.url.get.match(/page=buildings&cp=/) || ansa.url.get.match(/page=buildings&mode=&cp=/) || ansa.url.get.match(/page=buildings&mode=research/) )
{
	var ifBatiments = (ansa.url.get.match(/page=buildings$/) ||  ansa.url.get.match(/page=buildings&cp=/) ) ? true : false;
	
	// On recupere chaque bat/rech
	var tdBats = evalPath("id('content')/table"+(getId('infobox') ? '[2]':'')+"/tbody/tr/td", document);

	var newTable = '';
	
	autoConst = false;
	if(autoConst) var lePlusRapide = [];

	// On traite chaque bats
	for(i=0,j=tdBats.snapshotLength; i<j; i++)
	{
		var tdBat = tdBats.snapshotItem(i);

		var nom = tdBat.getElementsByTagName('a')[0].innerHTML;
		var ress = tdBat.getElementsByTagName('b')[0].parentNode.innerHTML;
		var img = tdBat.getElementsByTagName('img')[0].parentNode.innerHTML.replace(/120/g, '30');
	
		var niveau, niveauTest = tdBat.getElementsByTagName('th')[0].innerHTML;
		if(niveauTest.match(/\(Niveau \d+\)/) ) niveau = /\(Niveau (\d+)\)/.exec(niveauTest)[1];
		else niveau = '0';
	
		var temps = tdBat.getElementsByTagName('td')[3].innerHTML.replace('Temps de construction : ', '');
		var formUp = tdBat.getElementsByTagName('td')[5].innerHTML;
		var onclickShowInfos = tdBat.getElementsByTagName('td')[0].getElementsByTagName('a')[0].getAttribute('onclick');
		
		if(typeof tdBat.getElementsByTagName('a')[3] != 'undefined') lienDetruire = tdBat.getElementsByTagName('a')[3].parentNode.innerHTML;
		else lienDetruire = '';
		
		if(autoConst && tdBat.getElementsByTagName('form')[0]!=undefined && notMaxlevel(nom, niveau) )
		{
			var ressAOk = tdBat.getElementsByTagName('b')[0] != undefined ? ( tdBat.getElementsByTagName('b')[0].style.color=='lime' ? true : false) : true;
			var ressBOk = tdBat.getElementsByTagName('b')[1] != undefined ? ( tdBat.getElementsByTagName('b')[1].style.color=='lime' ? true : false) : true;
			var ressCOk = tdBat.getElementsByTagName('b')[2] != undefined ? ( tdBat.getElementsByTagName('b')[2].style.color=='lime' ? true : false) : true;
			
			if(ressAOk && ressBOk && ressCOk)
			{
				var tempsMatch = temps.match(/(\d{2})h (\d{2})m (\d{2})s/); //log(parseInt('09', 10)); le , 10 permet de cxon trouner le probleme du 09
				var tempsSecondes = (parseInt(tempsMatch[1], 10)*3600 + parseInt(tempsMatch[2], 10)*60 + parseInt(tempsMatch[3], 10));
				
				if(lePlusRapide[0] == undefined || Math.min(lePlusRapide[0], tempsSecondes) == tempsSecondes ) 
				{
					lePlusRapide[0]=tempsSecondes;
					lePlusRapide[1]=nom;
					lePlusRapide[2]=formUp;
				}
			}
		}
		
		newTable += '<tr><td>'+img+'</td><td>'+formUp+'</td><td onclick="'+onclickShowInfos+';">'+nom+' (Lvl '+niveau+')</td><td>'+ress+'</td><td>Temps : '+temps+'</td>';
		if(ifBatiments) newTable += '<td>'+lienDetruire+'</td><tr>';
	}

	if(autoConst && lePlusRapide[0] != undefined) 
		var elemLePlusRapide = '<tr style="display:none;"><td id="lePlusRapide">'+lePlusRapide[2]+'</td><td>'
				                  + lePlusRapide[1]+'</td><td></td><td></td>'
				                  + (ifBatiments ? '<td></td>':'')+'</tr>';
				                  
	document.getElementById('content').setAttribute('style', 'width : 800px;');
	var tableBats = evalPath("id('content')/table"+(getId('infobox') ? '[2]':''), document).snapshotItem(0);
	tableBats.innerHTML = (elemLePlusRapide!=undefined?elemLePlusRapide:'')+newTable;
	
	if(autoConst && lePlusRapide[0] != undefined) getId('lePlusRapide').getElementsByTagName('form')[0].submit();
}
else if(ansa.url.get.match(/page=buildings&mode=fleet/) || ansa.url.get.match(/page=buildings&mode=defense/) )
{
	// On recupere chaque vaiss/def
	var tdBats = evalPath("id('content')/form/table[1]/tbody/tr/td", document);

	var newTable = '';
	
	// On traite chaque unités
	for(i=0,j=tdBats.snapshotLength; i<j; i++)
	{
		var tdBat = tdBats.snapshotItem(i);
		
		var img = tdBat.getElementsByTagName('a')[0].innerHTML.replace(/120/g, '30');
		var onclickShowInfos = tdBat.getElementsByTagName('a')[0].getAttribute('onclick');
		var nom = tdBat.getElementsByTagName('a')[1].innerHTML;
		
		var nbDispo = tdBat.getElementsByTagName('th')[0].innerHTML;
		var txtDispo = '(Disponible:  ';
		if(nbDispo.indexOf(txtDispo) == -1) 
			var nbDispo = '0';
		else 
		{
			var nbDispo = nbDispo.substring(nbDispo.indexOf(txtDispo)+txtDispo.length);
			var nbDispo = nbDispo.substring(0, nbDispo.indexOf(')') );
		}
		
		var tdData = tdBat.getElementsByTagName('td')[2].innerHTML;
		var ress = tdData.substring(0, tdData.indexOf('<br>') );
		var temps = tdData.substring(tdData.indexOf('Temps de construction : ')+24);
		var form = tdBat.getElementsByTagName('td')[3].innerHTML.replace(/<br>/g, '');
		
		newTable += '<tr><td>'+img+'</td><td onclick="'+onclickShowInfos+';">'+nom+' ('+nbDispo+')</td><td>'+ress+'</td><td>Temps : '+temps+'</td><td>'+form+'</td><tr>';
	}

	document.getElementById('content').setAttribute('style', 'width : 800px;');
	var tableBats = evalPath("id('content')/form/table[1]", document).snapshotItem(0);
	tableBats.innerHTML = newTable;
}

function notMaxlevel(nom, level)
{
	var level = parseInt(level);
	
	var data =
	{
		'Mine de rhénium' : 100,
		'Fabrique de sélénium' : 100,
		'Synthétiseur d`azote' : 100,
		'Centrale géothermique' : 25,
		'Centrale d`azote' : 0,
		'Usine de droïdes' : 20,
		'Usine de nanorobots' : 25,
		'Usine d`armement' : 20,
		'Silo de rhénium' : 20,
		'Silo de sélénium' : 20,
		'Réservoir d`azote' : 20,
		'Centre technique' : 25,
		'Dépôt d`alliance' : 10,
		'Hangar de missiles' : 10
	}
	
	if(data[nom]==undefined) return true;
	else if(data[nom]!=undefined && level<data[nom]) return true;
	return false;
}
