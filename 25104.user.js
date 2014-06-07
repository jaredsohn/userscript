// ==UserScript==
// @name          BinnewzExplicit
// @namespace      
// @description   Ajout de Newsleech, tri en cours/complet, retrait des element inutile et des posts interdit free
// @include        http://www.binnews.in/*


var defaultStyles = {
    color : '#F5F5F5',
    textDecoration : ''
}

function initializeStyles(styles) {

    return styles;
}

function generateLink(elm, str, label, title, url, styles)
{
    elm.innerHTML = "";
    //initialize les styles du lien
    styles = styles || {};
    for (var i in defaultStyles) {
        if (!styles[i]) styles[i] = defaultStyles[i];
    }

    elm.appendChild(document.createTextNode(' ')); //espace
    var a = document.createElement('a');
    for (var i in styles) { //applique les styles
        a.style[i] = styles[i];
    }
    a.target = '_blank';
    a.title = title;
    a.innerHTML = label;
    var str = str.replace(/ /g, "+");
    a.href = url.replace(/\$\$STR\$\$/g,str);
    elm.appendChild(a);
}

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
body.removeChild(document.getElementById("filtre"));
body.removeChild(body.firstChild);
body.removeChild(body.firstChild);
body.removeChild(body.firstChild);
body.removeChild(body.firstChild);
body.removeChild(body.firstChild);
body.removeChild(body.firstChild);
body.removeChild(body.firstChild);

/*if (type)
{
    tabliste
    tabliste.insertRow(
    }*/
// on retire les infos sur les colonnes k'on va supprimer
if (type)
{
tabliste.removeChild(tabliste.childNodes[2]);
tabliste.removeChild(tabliste.childNodes[7]);
tabliste.removeChild(tabliste.childNodes[9]);
tabliste.removeChild(tabliste.childNodes[9]);
tabliste.removeChild(tabliste.childNodes[9]);
}
else
{
tabliste.removeChild(tabliste.childNodes[2]);
tabliste.removeChild(tabliste.childNodes[5]);
tabliste.removeChild(tabliste.childNodes[7]);
tabliste.removeChild(tabliste.childNodes[8]);
tabliste.removeChild(tabliste.childNodes[8]);
}

// on retire les cases de legende dont on n'a plus besoin
if (type)
{
legende.removeChild(legende.childNodes[2]);
legende.removeChild(legende.childNodes[7]);
legende.removeChild(legende.childNodes[9]);
legende.removeChild(legende.childNodes[10]);
legende.removeChild(legende.childNodes[10]);
}
else
{
legende.removeChild(legende.childNodes[2]);
legende.removeChild(legende.childNodes[5]);
legende.removeChild(legende.childNodes[7]);
legende.removeChild(legende.childNodes[8]);
legende.removeChild(legende.childNodes[8]);

}
// on redimmenssionne les colonnes

if (type)
{
tabliste.childNodes[1].width="20"; //size status
tabliste.childNodes[3].width="30"; //size type
tabliste.childNodes[4].width="";//size film
tabliste.childNodes[5].width="20";//size lang
tabliste.childNodes[6].width="100";//size fichier
tabliste.childNodes[7].width="80";//size taille
tabliste.childNodes[8].width="20";//size nfo
}
else
{
tabliste.childNodes[1].width="20"; //size status
tabliste.childNodes[3].width="";//size film
tabliste.childNodes[4].width="20";//size lang
tabliste.childNodes[5].width="100";//size fichier
tabliste.childNodes[6].width="80";//size taille
tabliste.childNodes[7].width="20";//size nfo
}
// on parcours la liste des fichiers
var i;
for (i = 0; i < tabliste.lastChild.rows.length; i++)
{
    var tr = tabliste.lastChild.rows[i];
    // enleve les fichiers interdit pour free
  if (tr.innerHTML.match(/notfree/))
    {
	tr.innerHTML = "";
	continue;
    }
    // traite les lignes correspondant a un fichier
    if (tr.innerHTML.match(/ng_id/))
    {
	if (type)
	{
	    tr.removeChild(tr.childNodes[1]);
	    tr.removeChild(tr.childNodes[4]);
	    tr.removeChild(tr.childNodes[6]);
	    tr.removeChild(tr.childNodes[7]);
	    tr.removeChild(tr.childNodes[7]);
	}
	else
	{
	    tr.removeChild(tr.childNodes[1]);
	    tr.removeChild(tr.childNodes[3]);
	    tr.removeChild(tr.childNodes[5]);
	    tr.removeChild(tr.childNodes[6]);
	    tr.removeChild(tr.childNodes[6]);

	}
	if (type)
generateLink(tr.childNodes[4], tr.childNodes[4].innerHTML, 'Newzleech', 'Newzleech', 'http://www.newzleech.com/usenet/?group=&minage=&age=&min=min&max=max&q=$$STR$$&mode=usenet&adv=', {color: '#FF8800'});
	else
generateLink(tr.childNodes[3], tr.childNodes[3].innerHTML, 'Newzleech', 'Newzleech', 'http://www.newzleech.com/usenet/?group=&minage=&age=&min=min&max=max&q=$$STR$$&mode=usenet&adv=', {color: '#FF8800'});
	// met a jour la couleur de la ligne
	if (tr.innerHTML.match(/Complet/))
	    tr.className = "ligneclaire";
	else
	    tr.className = "lignefoncee";
    }

}
