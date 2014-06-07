// ==UserScript==
// @name           My Prizee - Module - Color Pseudo
// @namespace      My Prizee
// @include        http://*.prizee.com/forum-jeux-gratuits-*
// ==/UserScript==



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




optionprompt("pseudo à colorier (Module)", "Veuillez entrer le pseudo à mettre en valeur :\nFormat : pseudo1;couleur1;pseudo2;couleur2 (ex : matheoland;red;Arnaudpika;#00FF00", "module-colorpseudo");
optionprompt("comment colorier (Module)", "Veuillez entrer 1 pour colorier le pseudo, et 2 pour colorier le fond des pseudo", "module-colorpseudo2");


if(GM_getValue("module-colorpseudo"))
{
if(GM_getValue("module-colorpseudo2") == 1){type="color";}else{type="background-color";}
var maReg = new RegExp(";", "g") ;
pseudocherche2 = GM_getValue("module-colorpseudo");
var resultat = pseudocherche2.split( maReg ) ;
for ( i=0; i<resultat.length; i=i+2 )
{
var maReg2 = new RegExp("<b>"+resultat[i]+"</b>", "g") ;
document.getElementById('bodyWrapper').innerHTML = document.getElementById('bodyWrapper').innerHTML.replace(maReg2, "<b style='"+type+":"+resultat[i+1]+";'>"+resultat[i]+"</b>");
}
}