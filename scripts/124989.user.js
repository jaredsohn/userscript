// ==UserScript==
// @name         Ansaerys : ReduirePagesBatiments
// @namespace    Ansaerys : ReduirePagesBatiments
// @description	 Permet de reduire la page des batiments en les affichant sur une ligne
// @author       Hackdeluxe
// @version 	 0.1
// @include      http://*.ansaerys.net/game.php?page=buildings*
// ==/UserScript==
	

// On recupere chaque bat
bats = evalPath("id('content')/table/tbody/tr/td", document);

newT = '';

// On traite chaque bats
for(i=0,j=bats.snapshotLength; i<j; i++)
{
	bat = bats.snapshotItem(i);

	nom = bat.getElementsByTagName('a')[0].innerHTML;
	ress = bat.getElementsByTagName('b')[0].parentNode.innerHTML;
	
	niveauTest = bat.getElementsByTagName('th')[0].innerHTML;
	if(niveauTest.match(/\(Niveau \d+\)/) ) niveau = /\(Niveau (\d+)\)/.exec(niveauTest)[1];
	else niveau = '0';
	
	temps = bat.getElementsByTagName('td')[3].innerHTML.replace('Temps de construction : ', '');
	formUp = bat.getElementsByTagName('td')[5].innerHTML;
	if(typeof bat.getElementsByTagName('a')[3] != 'undefined') lienDetruire = bat.getElementsByTagName('a')[3].parentNode.innerHTML;
	else lienDetruire = '';
	
	newT += '<tr><td>'+formUp+'</td><td>'+nom+' (Lvl '+niveau+')</td><td>'+ress+'</td><td>Temps : '+temps+'</td><td>'+lienDetruire+'</td><tr>';
}

// On recupere la table contenant les bats
tableBats = evalPath("id('content')/table", document).snapshotItem(0);

document.getElementById('content').setAttribute('style', 'width : 800px;');
tableBats.innerHTML = newT;

//################################################################\\

function formatNumber(str) 
{
	var separator = ' ';
	
	if(arguments.length==2)separator=arguments[1]; // Dans le casou il y a un deuxieme argument dans le chaergement de la fonction, alors celui-ci est le separateur, on le modifie
	
	str += '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(str)) 
	{
		str = str.replace(rgx, '$1' + separator + '$2');
	}
	return str;
}

function log(txt)
{
	unsafeWindow.console.log(txt);
}

function getValue(key, defaultValue)
{
	var retValue = localStorage.getItem(key);
		
	/**/ if ( !retValue ) return defaultValue; /**/
	
	return retValue;
}

function setValue(key, val)	
{
	localStorage.setItem(key, val);
}
	
function evalPathNode(path, document, node) 
{
	var ret = document.evaluate(path,node,null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	return ret;

}

function evalPath(path, document) 
{
	return evalPathNode(path,document,document);
}

