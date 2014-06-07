// ==UserScript==
// @name	Binnewz Light
// @namespace	www.binnews.in 
// @description	Binnewz minimaliste - Modification du script "BinnewzExplicit" de vianney 
// @include	http://www.binnews.in/_bin/liste.php*
// @include	http://www.binnews.in/_bin/lastrefs.php*
// @include	http://www.binnews.in/_bin/search.php*
// @include http://www.binnews.in/_bin/search2.php*
// @author	ShagoY
// ==/UserScript==

// table qui contient la liste
var tabliste = document.getElementById("tabliste");

// legende du tableau (TR)
var legende = tabliste.lastChild.childNodes[2];

// check si case type
var type = (legende.innerHTML.match(/Type/) == "Type");


// body
var body = tabliste.parentNode;

// on retire tout ce qui est inutile dans la page avant tabliste
body.removeChild(document.getElementById("refer"));
body.removeChild(body.firstChild);
body.removeChild(body.firstChild);
body.removeChild(body.firstChild);
body.removeChild(body.firstChild);
body.removeChild(body.firstChild);

// on retire les infos sur les colonnes k'on va supprimer
if (type)
{
tabliste.removeChild(tabliste.childNodes[7]);
tabliste.removeChild(tabliste.childNodes[7]);
tabliste.removeChild(tabliste.childNodes[9]);
tabliste.removeChild(tabliste.childNodes[9]);
}
else
{
tabliste.removeChild(tabliste.childNodes[2]);
tabliste.removeChild(tabliste.childNodes[5]);
tabliste.removeChild(tabliste.childNodes[7]);
tabliste.removeChild(tabliste.childNodes[8]);
}

// on retire les cases de legende dont on n'a plus besoin
if (type)
{
legende.removeChild(legende.childNodes[3]);
legende.removeChild(legende.childNodes[3]);
legende.removeChild(legende.childNodes[6]);
legende.removeChild(legende.childNodes[8]);
legende.removeChild(legende.childNodes[10]);
}
else
{
legende.removeChild(legende.childNodes[2]);
legende.removeChild(legende.childNodes[5]);
legende.removeChild(legende.childNodes[7]);
legende.removeChild(legende.childNodes[9]);
}
// on redimmenssionne les colonnes

if (type)
{
tabliste.childNodes[1].width="22"; //size status
tabliste.childNodes[2].width="20"; //size lien
tabliste.childNodes[4].width="";//size film
tabliste.childNodes[5].width="40";//size lang
tabliste.childNodes[6].width="400";//size fichier
tabliste.childNodes[7].width="100";//size taille
tabliste.childNodes[8].width="20";//size nfo
tabliste.childNodes[9].width="50";//size merci
}
else
{
tabliste.childNodes[1].width="22"; //size status
tabliste.childNodes[3].width="";//size film
tabliste.childNodes[4].width="40";//size lang
tabliste.childNodes[5].width="400";//size fichier
tabliste.childNodes[6].width="100";//size taille
tabliste.childNodes[7].width="20";//size nfo
tabliste.childNodes[8].width="50";//size merci
}
// on parcours la liste des fichiers
var i;
for (i = 0; i < tabliste.lastChild.rows.length; i++)
{
    var tr = tabliste.lastChild.rows[i];
    // enleve les fichiers interdit pour free
  if (tr.innerHTML.match(/virus/)) 
    {
	tr.innerHTML = "";
	continue;
    }
    // traite les lignes correspondant a un fichier
    if (tr.innerHTML.match(/ng_id/))
    {
	if (type)
	{
	    tr.removeChild(tr.childNodes[2]);
	    tr.removeChild(tr.childNodes[4]);
	    tr.removeChild(tr.childNodes[6]);
	    tr.removeChild(tr.childNodes[8]);
	}
	else
	{
	    tr.removeChild(tr.childNodes[1]);
	    tr.removeChild(tr.childNodes[3]);
	    tr.removeChild(tr.childNodes[5]);
	    tr.removeChild(tr.childNodes[7]);
	}

	// met a jour la couleur de la ligne
	if (tr.innerHTML.match(/Complet/))
	    tr.className = "ligneclaire";
	else
	    tr.className = "lignefoncee";
    }

}