// ==UserScript==
// @name           Affichage direct des dates de dernière connexion des membres de la bande
// @author         LeonBuzz
// @namespace      LeonBuzz
// @description    Dates de connexion des membres de la bande affichées directement
// @version        0.2 tri possible (sur les jours)
// @include        http://*pennergame.de/gang/memberlist*
// @include        http://*clodogame.fr/gang/memberlist*
// @include        http://*mendigogame.es/gang/memberlist*
// @include        http://*menelgame.pl/gang/memberlist*
// @include        http://*dossergame.co.uk/gang/memberlist*
// @include        http://*serserionline.com/gang/memberlist*
// @include        http://*bumrise.com/gang/memberlist*
// @include        http://*faveladogame.com.br/gang/memberlist*
// ==/UserScript==


var tab = document.getElementById('pgmemberlist-table');
tab.setAttribute('style', 'width:525px;');
var rows = tab.getElementsByTagName('tr');

for(var i=1;i<=rows.length;i++)
{	var col = rows[i].getElementsByTagName('td')[4];
	var a = col.getElementsByTagName('a')[0];
	a.setAttribute('style','text-decoration: none; text-indent:19px;')
	var dat = a.innerHTML.match(/([0-9]{2}\.[0-9]{2})\. ([0-9]{1,2}:[0-9]{2})/);
	a.innerHTML = '<b>'+dat[1]+'</b>&nbsp;'+dat[2]+a.innerHTML;

	// si l'utilisateur est admin/co-admin
	if(col.getElementsByTagName('a').length>1)
	{	col.getElementsByTagName('a')[1].setAttribute('style','margin-left:65px;');
		col.setAttribute('width','130');	}
	// si l'utilisateur est membre
	else	{	col.setAttribute('width','80');	}
}
