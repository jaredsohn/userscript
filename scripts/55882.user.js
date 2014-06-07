// ==UserScript==
// @name           My Prizee - Topic
// @namespace      My Prizee
// @include        http://*.prizee.com/forum-jeux-gratuits-*
// ==/UserScript==

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




option("Topic élargie", "l'élargissement des topics ?", "forumelargie");
optionprompt("pseudo à colorier", "Veuillez entrer le pseudo à mettre en valeur :\n(cliquez sur annuler pour ne rien mettre en valeur)", "colorpseudo");



if(GM_getValue("forumelargie"))
{
document.getElementById('espacePerso').style.display='none';
document.getElementById('bodyWrapper').innerHTML = document.getElementById('bodyWrapper').innerHTML.replace("background: rgb(255, 204, 51) none repeat scroll 0% 0%; height: 0px;","background: rgb(255, 204, 51) none repeat scroll 0% 0%; height: 0px;width:900px;margin-left:10px;");
while(document.getElementById('bodyWrapper').innerHTML.search('abus.html">') != -1){document.getElementById('bodyWrapper').innerHTML = document.getElementById('bodyWrapper').innerHTML.replace('abus.html">', 'abus.html" style="position:relative;left:315px;top:3px;"');}
}

if(GM_getValue("colorpseudo"))
{
pseudocherche = GM_getValue("colorpseudo");
while(document.getElementById('bodyWrapper').innerHTML.search("<b>"+pseudocherche+"</b>") != -1){document.getElementById('bodyWrapper').innerHTML = document.getElementById('bodyWrapper').innerHTML.replace("<b>"+pseudocherche+"</b>", "<b style='background-color:yellow;color:red;'>"+pseudocherche+"</b>");}
}