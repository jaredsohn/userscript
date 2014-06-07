// ==UserScript==
// @name           My Prizee - Forum
// @namespace      My Prizee
// @include        http://*.prizee.com/forum-jeux-*
// @exclude        http://*.prizee.com/forum-jeux-gratuits-*
// ==/UserScript==

//http://www.iconfinder.net/icondetails/10854/16/?q=favorite
//http://img168.imageshack.us/img168/10/favorite16x16.png

function option(titre, message, nom)
{
actuel = "Activer";
if(GM_getValue(nom)){actuel="Désactiver";}
GM_registerMenuCommand(actuel+" "+titre,fonction);
function fonction()
{
if(confirm("Voulez vous vraiment "+actuel+" "+message))
{
if(GM_getValue(nom)){GM_setValue(nom, false);}else{GM_setValue(nom, true);}
}
location.reload();
}
}

function optionprompt(titre, message, nom)
{
actuel = "Choisir";
if(GM_getValue(nom)){actuel = "Modifier";}
GM_registerMenuCommand(actuel+" "+titre,fonction);
function fonction()
{
defautprompt = "";
if(GM_getValue(nom)){defautprompt=GM_getValue(nom);}
prompt = prompt(message, defautprompt);
if(!prompt){prompt=false;}
GM_setValue(nom, prompt);
location.reload();
}
}


option("Survol ligne forum", "la coloration des lignes survolés ?",  "forumsurvolcolor");
optionprompt("keywords", "Veuillez entrer les keywords (= mot clef) à mettre en valeur (séparez avec ;) :\n(cliquez sur annuler pour ne rien mettre en valeur)", "keywords");
optionprompt("favoris", "Veuillez entrer vos url favorites :\n(cliquez sur annuler pour ne pas utiliser les favoris)", "favoris");


if(GM_getValue("forumsurvolcolor"))
{
document.body.appendChild(document.createElement('style')).innerHTML= "table.prizee tr:hover { background-color: rgb(240,240,240) !important;}";
}

if(GM_getValue("keywords"))
{
topicsprefere = GM_getValue("keywords");
var maReg = new RegExp(";", "g") ;
var resultat = topicsprefere.split( maReg ) ;
for ( i=0; i<resultat.length; i++ )
{
// correctif bug bizarre : si mot clef composé plusieur mots -> marche sinon ne marche pas sauf si on met des espace avant et après
if(resultat[i].search(' ') == -1){resultat[i] = " "+resultat[i]+" ";}
if(document.getElementById('bodyWrapper').innerHTML.search(resultat[i]) != -1)
{
document.getElementById('bodyWrapper').innerHTML = document.getElementById('bodyWrapper').innerHTML.replace(resultat[i], "<b>"+resultat[i]+"</b>");
}
}
}

if(GM_getValue("favoris"))
{
tableaujs2 = GM_getValue("favoris");
tableaujs = "favliste=new Array();";
listejs = "";
var maReg = new RegExp(";", "g") ;
var resultat = tableaujs2.split( maReg ) ;
for ( i=0; i<resultat.length; i++ )
{
tableaujs += "favliste["+i+"] = '"+resultat[i]+"';";
}
for ( i=0; i<resultat.length; i++ )
{
listejs += i+" : "+resultat[i]+"\\n";
}

document.getElementById('bodyWrapper').innerHTML = document.getElementById('bodyWrapper').innerHTML.replace('<a href="view_aide_',"<a href='#' onclick=\""+tableaujs+"location.replace(favliste[prompt('Entrez le numéro du favoris auquel vous souhaitez accéder.\\n"+listejs+"','')]);return false;\" style='text-decoration:none;color:blue;'><img src='http://img168.imageshack.us/img168/10/favorite16x16.png' style='position:relative;top:3px;'> Favoris</a>&nbsp;&nbsp;<a href=\"view_aide_");
}