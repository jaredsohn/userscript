// ==UserScript==
// @name         NucleaGame : reduirePages
// @namespace    NucleaGame : reduirePages
// @description	 Permet de reduire les differentes pages du jeu en les reformatant [NucleaGame's scripts string]
// @author       Néo
// @version      0.3.2
// @date         2013-07-21 17H50
// @include      http://www.nucleagame.fr/uni1/game.php?page=buildings*
// @include      http://www.nucleagame.fr/uni1/game.php?page=research*
// @include      http://www.nucleagame.fr/uni/game.php?page=shipyard*
// ==/UserScript==
	
var ansa = unsafeWindow.ansa;
eval(ansa.initScript(
{
	id: 'reduirePages',
	name: 'Formatages des pages',
	version: '0.3.2',
	url: 'http://userscripts.org/scripts/source/173844.user.js', 
	options: {}
}) );

if(ansa.url.get.match(/page=buildings/) || ansa.url.get.match(/page=research/))
{
	// On recupere chaque bat/rech
	var trsPage = evalPath("id('content')/table"+(getId('infobox') ? '[2]':'')+"/tbody/tr", document);

	var newTable = '';
	
	// On traite chaque bats
	for(i=0,j=trsPage.snapshotLength; i<j; i+=3)
	{
		var trPage = trsPage.snapshotItem(i);		
		var trRess = trsPage.snapshotItem(i+1);
		var trTemps = trsPage.snapshotItem(i+2);
		
		var img = trPage.getElementsByTagName('img')[0].src;
		var nom = trPage.getElementsByTagName('a')[1].innerHTML;
		var onclickShowInfos = trPage.getElementsByTagName('a')[1].getAttribute('onclick');
		
		var niveau, niveauTest = trPage.getElementsByTagName('th')[0].innerHTML;
		if(niveauTest.match(/\(Niveau \d+\)/) ) niveau = /\(Niveau (\d+)\)/.exec(niveauTest)[1]; else niveau = '0';
		
		var ress = checkRessources(trRess);
		var tit = ress[0];
		var carb = ress[1];
		var trit = ress[2];
		var energie = ress[6];
		
		var formUp = trRess.getElementsByTagName('td')[2].innerHTML;
		var temps = trTemps.getElementsByTagName('td')[(ansa.url.get.match(/page=buildings/) ? '3' : '4')].innerHTML.replace(/\s+Durée de construction :<br>/, '');
		
		if(ansa.url.get.match(/page=buildings/) )
		{
			var lienDetruire = '';	
			if(typeof trTemps.getElementsByTagName('a')[0] != 'undefined') 
			{
				lienDetruire = trTemps.getElementsByTagName('a')[0].parentNode.innerHTML;
				lienDetruire = lienDetruire.substring(lienDetruire.indexOf('Energie de plus<br>')+20 );
				lienDetruire = lienDetruire.substring(lienDetruire.indexOf('<br>')+4 );
			}
		}
		
		newTable += '<tr><td><img onclick="'+onclickShowInfos+';" src="'+img+'" width="30px"></td><td>'+formUp+'</td>'
		          + '<td onclick="'+onclickShowInfos+';">'+nom+' (Lvl '+niveau+')</td><td>';
		if(tit!='0') newTable += '['+tit+']';
		if(carb!='0') newTable += (tit!='0' ? ' ' : '')+'['+carb+']';
		if(trit!='0') newTable += ((tit!='0' || carb!='0') ? ' ' : '')+'['+trit+']';
		if(energie!='0') newTable += ((tit!='0' || carb!='0' || trit!='0') ? ' ' : '')+'['+energie+']';
		newTable += '</td><td>Temps :<br>'+temps+'</td>';
		if(ansa.url.get.match(/page=buildings/) ) newTable += '<td>'+lienDetruire+'</td><tr>';
	}
	
	var tableBats = evalPath("id('content')/table"+(getId('infobox') ? '[2]':'')+"", document).snapshotItem(0);
	tableBats.innerHTML = newTable;
}
else if(ansa.url.get.match(/page=shipyard&mode=fleet/) || ansa.url.get.match(/page=shipyard&mode=defense/) )
{
	// On recupere chaque vaiss/def
	var trsPage = evalPath("id('content')/form/table/tbody/tr", document);

	var newTable = '';
	
	// On traite chaque unités
	for(i=0,j=(trsPage.snapshotLength-1); i<j; i+=3)
	{
		var trPage = trsPage.snapshotItem(i);		
		var trRess = trsPage.snapshotItem(i+1);
		var trTemps = trsPage.snapshotItem(i+2);

		var img = trPage.getElementsByTagName('img')[0].src;
		var nom = trPage.getElementsByTagName('a')[1].innerHTML;
		var onclickShowInfos = trPage.getElementsByTagName('a')[1].getAttribute('onclick');
			
		var nbDispo = trPage.getElementsByTagName('th')[0].innerHTML;
		var txtDispo = '(Disponible :  ';
		
		if(nbDispo.indexOf(txtDispo) == -1) 
			var nbDispo = '0';
		else 
		{
			var nbDispo = nbDispo.substring(nbDispo.indexOf(txtDispo)+txtDispo.length);
			var nbDispo = nbDispo.substring(0, nbDispo.indexOf(')') );
		}
		
		var ress = checkRessources(trRess);
		var tit = ress[0];
		var carb = ress[1];
		var trit = ress[2];
		
		var temps = trTemps.getElementsByTagName('td')[(ansa.url.get == 'page=buildings' ? '3' : '4')].innerHTML.replace(/\s+Durée de construction :<br>/, '');
		var maxUnits = trTemps.getElementsByTagName('td')[3].innerHTML;
		maxUnits = maxUnits.substring(maxUnits.indexOf('<span style="font-weight:700">')+30);
		maxUnits = maxUnits.substring(0, maxUnits.indexOf('</span>'));
		
		var inputs = trRess.getElementsByTagName('input');
		if(inputs[0] != undefined)
		{
			var inputQte = inputs[0].parentNode.innerHTML.replace('size="7" maxlength="7"', 'size="10" maxlength="10"');
			var inputMax = inputs[1].parentNode.innerHTML.replace('value="max"', 'value="max ('+maxUnits+')"');
		}
		else {var inputQte='';var inputMax='';}
		
		newTable += '<tr><td><img onclick="'+onclickShowInfos+';" src="'+img+'" width="30px"></td><td onclick="'+onclickShowInfos+';">'+nom+' ('+nbDispo+')</td><td>';
		if(tit!='0') newTable += '['+tit+']';
		if(carb!='0') newTable += (tit!='0' ? ' ' : '')+'['+carb+']';
		if(trit!='0') newTable += ((tit!='0' || carb!='0') ? ' ' : '')+'['+trit+']';
		newTable += '</td><td>Temps :<br>'+temps+'</td><td>'+inputQte+' '+inputMax+'</td><tr>';
	}
	
	newTable += '<tr><th colspan="5"><center>'+trsPage.snapshotItem(trsPage.snapshotLength-1).getElementsByTagName('th')[0].innerHTML+'</center></th></tr>';
	
	var tableBats = evalPath("id('content')/form/table", document).snapshotItem(0);
	tableBats.innerHTML = newTable;
}

function checkRessources(trRess)
{
	var pRess = trRess.getElementsByTagName('p');
	var pRessHTML = pRess[1].innerHTML;
			
	var tit='0';
	if(pRessHTML.match(/Métal: <b>(<span style="color:(\w+)">((\d|\.)+)<\/span>)<\/b>/) ) 
		tit = pRessHTML.match(/Métal: <b>(<span style="color:(\w+)">((\d|\.)+)<\/span>)<\/b>/)[0];

	var carb='0';
	if(pRessHTML.match(/Cristal: <b>(<span style="color:(\w+)">((\d|\.)+)<\/span>)<\/b>/) ) 
		carb = pRessHTML.match(/Cristal: <b>(<span style="color:(\w+)">((\d|\.)+)<\/span>)<\/b>/)[0];

	var trit='0';
	if(pRessHTML.match(/Deutérium: <b>(<span style="color:(\w+)">((\d|\.)+)<\/span>)<\/b>/) ) 
		trit = pRessHTML.match(/Deutérium: <b>(<span style="color:(\w+)">((\d|\.)+)<\/span>)<\/b>/)[0];

	var energie='0';
	if(pRessHTML.match(/Energie: <b>(<span style="color:(\w+)">((\d|\.)+)<\/span>)<\/b>/) ) 
		energie = pRessHTML.match(/Energie: <b>(<span style="color:(\w+)">((\d|\.)+)<\/span>)<\/b>/)[0];
	
	var titManquant = '0';
	var carbManquant = '0';
	var tritManquant = '0';
	var energieManquant = '0';

	if(tit.match(/red/) || carb.match(/red/) || trit.match(/red/) || energie.match(/red/) )
	{
		var tdRessManquanteHTML = trTemps.getElementsByTagName('td')[1].innerHTML;
		
		if(tdRessManquanteHTML.match(/Métal: <span style="font-weight:700">((\d|\.)+)<\/span>/) ) 
			if(tdRessManquanteHTML.match(/Métal: <span style="font-weight:700">((\d|\.)+)<\/span>/)[1] != '0')
			{
				titManquant = tdRessManquanteHTML.match(/Métal: <span style="font-weight:700">((\d|\.)+)<\/span>/)[1]
				tit = tit.replace('<span', '<span onmouseover="this.style.textDecoration=\'underline\';" onmouseout="this.style.textDecoration=\'none\';"'
					  + 'title="Manque : '+(titManquant)+'"')
				    	.replace('style="', 'style="cursor:pointer;');
			}  
			
		if(tdRessManquanteHTML.match(/Cristal: <span style="font-weight:700">((\d|\.)+)<\/span>/) ) 
			if(tdRessManquanteHTML.match(/Cristal: <span style="font-weight:700">((\d|\.)+)<\/span>/)[1] != '0')
			{
				carbManquant = tdRessManquanteHTML.match(/Cristal: <span style="font-weight:700">((\d|\.)+)<\/span>/)[1];
				carb = carb.replace('<span', '<span onmouseover="this.style.textDecoration=\'underline\';" onmouseout="this.style.textDecoration=\'none\';"'
					  + 'title="Manque : '+(carbManquant)+'"')
				    	.replace('style="', 'style="cursor:pointer;');
			}
	
		if(tdRessManquanteHTML.match(/Deutérium: <span style="font-weight:700">((\d|\.)+)<\/span>/) ) 
			if(tdRessManquanteHTML.match(/Deutérium: <span style="font-weight:700">((\d|\.)+)<\/span>/)[1] != '0')
			{
				tritManquant = tdRessManquanteHTML.match(/Deutérium: <span style="font-weight:700">((\d|\.)+)<\/span>/)[1];
				trit = trit.replace('<span', '<span onmouseover="this.style.textDecoration=\'underline\';" onmouseout="this.style.textDecoration=\'none\';"'
					  + 'title="Manque : '+(tritManquant)+'"')
				    	.replace('style="', 'style="cursor:pointer;');
			} 
	
		if(tdRessManquanteHTML.match(/Energie: <span style="font-weight:700">((\d|\.)+)<\/span>/) ) 
			if(tdRessManquanteHTML.match(/Energie: <span style="font-weight:700">((\d|\.)+)<\/span>/)[1] != '0')
			{
				energieManquant = tdRessManquanteHTML.match(/Energie: <span style="font-weight:700">((\d|\.)+)<\/span>/)[1];
				energie = energie.replace('<span', '<span onmouseover="this.style.textDecoration=\'underline\';" onmouseout="this.style.textDecoration=\'none\';"'
					      + 'title="Manque : '+(energieManquant)+'"')
				    	.replace('style="', 'style="cursor:pointer;');
			} 
	}
	
	return [tit,carb,trit, parseInt(titManquant), parseInt(carbManquant), parseInt(tritManquant), energie, energieManquant];
}
