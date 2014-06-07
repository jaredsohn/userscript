// ==UserScript==
// @name           Ikariam Connexion (version légal)
// @namespace      Ikariam
// @author         matheod
// @include        http://www.ikariam.*/
// @include        http://www.ikariam.*/index.php
// @include        http://www.ikariam.*/index.php#
// @include        http://ikariam.*/
// @include        http://ikariam.*/index.php
// @include        http://ikariam.*/index.php#
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


optionprompt('serveur','Veuillez entrer le numéro de serveur (Alpha:1;Beta:2,Gamma:3,Delta:4,Epsilon:5,Zeta:6,Etha:7,Theta:8,Lota:9,Kappa:10,Lambda:11','serveur');
optionprompt('pseudo','Veuillez entrer votre pseudo.','pseudo');
optionprompt('passe','Veuillez entrer votre passe.','passe');

if(GM_getValue('serveur')){document.getElementById('universe').getElementsByTagName('option')[GM_getValue('serveur')-1].selected=true;}
if(GM_getValue('pseudo')){document.getElementById('login').value=GM_getValue('pseudo');}
if(GM_getValue('passe')){document.getElementById('pwd').value=GM_getValue('passe');}