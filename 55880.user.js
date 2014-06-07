// ==UserScript==
// @name           My Prizee
// @namespace      My Prizee
// @include        http://*.prizee.com/*
// ==/UserScript==

//document.getElementById('headerMenu').innerHTML += "<li class='menuItem'><a class='lienMenu' title='FORUM' href='http://www.prizee.com/forum.php'>FORUM</a><ul id='subMenu7' class='headerSubMenu' style='display: none;'></ul></li>";


// javascript:document.body.innerHTML = document.body.innerHTML.replace(/\[a\](.*)\[\/a\]/g, '<a style="font-size:500%;">$1</a>');void(0);
// javascript:document.body.innerHTML = document.body.innerHTML.replace(/\[a\]([\s\S]*?)\[\/a\]/g, '<a style="font-size:500%;">$1</a>');void(0);
//	field = field.replace(/\[img\]([\s\S]*?)\[\/img\]/ig, '<img src="$1" class="images_postees" alt="Image" />');



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


option("Lien Rapide Forum", "le lien rapide vers le forum ? (attention : bloque les sous menu du menu !)", "activeforum");
optionprompt("header prizee", "Veuillez entrer l'url du header prizee que vous souhaitez utiliser.\nEx : http://media.prizee.com/pz2/images/common/header/2009-08HeaderEte5.png\nVous pouvez aussi mettre une coleur, ex : blue, red, etc.", "headerurl");
optionprompt("fond prizee", "Veuillez entrer l'url de fond que vous souhaitez utiliser.\nEx : http://media.prizee.com/pz2/images/common/ciel.jpg\nVous pouvez aussi mettre une coleur, ex : blue, red, etc.", "fondurl");



if(GM_getValue("connexionauto_pseudo"))
{if(document.getElementById('identification')){document.getElementById('pseudo0_V2').value = GM_getValue("connexionauto_pseudo");document.getElementById('pass0_V2').value = GM_getValue("connexionauto_passe");;document.getElementById('souvenir0_V2').checked=true;document.getElementById('identification0_V2').submit();}
}

document.getElementById('barreProgression').title=document.getElementById('progressionEnCours').title;


if(GM_getValue("activeforum"))
{
document.getElementById('headerMenu').innerHTML += "<li class='menuItem'><a class='lienMenu' title='FORUM' href='http://www.prizee.com/forum.php'>FORUM</a><ul id='subMenu7' class='headerSubMenu' style='display: none;'></ul></li>";
}		
if(GM_getValue("fondurl"))
{
if(GM_getValue("fondurl").search('http') != -1)
{
document.body.style.background = "url("+GM_getValue("fondurl")+")";
}
else
{
document.body.style.background = GM_getValue("fondurl");
}
}	
if(GM_getValue("headerurl"))
{
if(GM_getValue("headerurl").search('http') != -1)
{
document.getElementById('bgHeader').style.background = "url("+GM_getValue("headerurl")+")";
}
else
{
document.getElementById('bgHeader').style.background = GM_getValue("headerurl");
}
}	
document.getElementById('nbConnectes').innerHTML += " - <a href='http://serv195.fr.prizee.com/forum-jeux-gratuits-8149_26_1306674_0_0_1_MyPrizee---Ameliorez-votre-navigation-sur-prizee.html'>My Prizee</a> version 1.4 créé par matheod";


actuel = "Choisir";
if(GM_getValue('connexionauto_pseudo')){actuel = "Modifier";}
GM_registerMenuCommand(actuel+" connexion auto",connexionauto);
function connexionauto()
{
defautprompt = "";
if(GM_getValue('connexionauto_pseudo')){defautprompt=GM_getValue('connexionauto_pseudo');}
prompt2 = prompt('Votre pseudo :', defautprompt);
if(!prompt2){prompt2=false;}
GM_setValue('connexionauto_pseudo', prompt2);
prompt3 = prompt('Votre mot de passe :', '');
if(!prompt3){prompt3=false;}
GM_setValue('connexionauto_passe', prompt3);
location.reload();
}

GM_registerMenuCommand("Credits",Credits);
function Credits()
{
alert("Script créé par matheod (matheoland)\nTout droit réservé.\nMerci à Voxran d'avoir accépté de créer un topic pour moi\nVous pouvez me contacter à l'adresse suivante :\nmathe"+"oland.pri"+"z"+"ee"+"@gm"+"ail"+".com\nSi vous rencontez un bug, ou avez une suggestion,\nn'hésitez pas à laisser un message sur le topic ou à m'envoyer un email.");
}

// easter eggs
if(!GM_getValue("eastereggs"))
{
if(new Date().getHours() == 0)
{
if(new Date().getMinutes() == 0)
{
alert("Ta vu l'heure !\nIl est minuit et tu es toujours pas couché !\nAllez, file au lit !");
GM_setValue(n="eastereggs", true);
}
}
}