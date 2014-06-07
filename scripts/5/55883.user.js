// ==UserScript==
// @name           My Prizee - Message
// @namespace      My Prizee
// @include        http://*.prizee.com/view_nouv_mess_*_1_repondre.html
// @include        http://*.prizee.com/view_nouv_topic_*_1_nouveau-topic.html
// @include        http://*.prizee.com/forum_topics.php
// ==/UserScript==

//http://img17.imageshack.us/img17/4328/iconminimembers.gif$

/*
function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}*/

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



optionprompt("panel bbcode", "Tapez 1 pour afficher automatiquement le panel bbcode\nTapez 2 pour demander à chaque fois. :\n(cliquez sur annuler pour désactiver le panel bbcode)", "panelbbcode");
optionprompt("texte prédéfini", "Veuillez entrer vos textes prédéfinis :\nForme : nom1;texte1;nom2;texte2;[...]nom99;texte99;etc.\n(cliquez sur annuler pour ne pas utiliser les textes prédéfinis)", "predefini");



actuel = "Choisir";
if(GM_getValue('signature')){actuel = "Modifier";}
GM_registerMenuCommand(actuel+" signature",connexionauto);
function connexionauto()
{
defautprompt = "";
if(GM_getValue('signature')){defautprompt=GM_getValue('signature');}
prompt2 = prompt('Entrez le texte qui s\'ajoutera à la fin de votre message :\nUtilisez \\n pour les sauts à la ligne.', defautprompt);
if(!prompt2){prompt2=false;}
GM_setValue('signature', prompt2);
defautprompt = "";
if(GM_getValue('signaturedebut')){defautprompt=GM_getValue('signaturedebut');}
prompt3 = prompt('Entrez le texte qui s\'ajoutera au début de vautre emssage (optionel, utile par exemple pour colorer votre message) :\nUtilisez \\n pour les sauts à la ligne.', defautprompt);
if(!prompt3){prompt3=false;}
GM_setValue('signaturedebut', prompt3);
location.reload();
}


if(GM_getValue("panelbbcode") == 1){active()}
if(GM_getValue("panelbbcode") == 2){if(confirm("Utiliser le panel bbcode ?\n(cliquez sur annulez si vous venez de faire précédant suite a une erreur)")){active()}}



function active()
{
document.body.appendChild(document.createElement('script')).innerHTML="function bbcode(bbdebut, bbfin){var input = window.document.formu.message_rep;input.focus();var start = input.selectionStart;var end = input.selectionEnd;var insText = input.value.substring(start, end);input.value = input.value.substr(0, start) + bbdebut + insText + bbfin + input.value.substr(end);var pos;if (insText.length == 0){pos = start + bbdebut.length;}else{pos = start + bbdebut.length + insText.length + bbfin.length;}input.selectionStart = pos;input.selectionEnd = pos;}";
/*document.getElementById('bodyWrapper').innerHTML= '<form name="formu" method="post" action="forum_posts.php">'+document.getElementById('bodyWrapper').innerHTML.replace("Charte de Qualité","</a><span style='float:right;'><a href='http://autre.prizee.123.fr/bbcode.php'>Version 2.1</a></span><div id='bbcode'><b>BBcode : </b> <a style='cursor:pointer;' onclick=\"bbcode('[b]','[/b]');\">Gras</a> <a style='cursor:pointer;' onclick=\"bbcode('[i]','[/i]');\">Italique</a> <a style='cursor:pointer;' onclick=\"bbcode('[u]','[/u]');\">Souligné</a> <a style='cursor:pointer;' onclick=\"bbcode('[img]','[/img]');\">Image</a> <a style='cursor:pointer;' onclick=\"bbcode('[url]','[/url]');\">Lien</a> <a  style='cursor:pointer;' onclick=\"window.open('http://autre.prizee.123.fr/code.php','Mettre du Code','top=200,left=200,width=500,height=150');\">Code</a> <a style='cursor:pointer;' onclick=\"if(document.getElementById('panelcouleur').style.display == 'none'){document.getElementById('panelcouleur').style.display = 'block';}else{document.getElementById('panelcouleur').style.display = 'none';}\">Couleur</a> <a style='cursor:pointer;' onclick=\"if(document.getElementById('panelsmiley').style.display == 'none'){document.getElementById('panelsmiley').style.display = 'block';}else{document.getElementById('panelsmiley').style.display = 'none';}\">Smiley</a></div><div style='display:none;' id='panelcouleur'><span style='cursor:pointer;' onclick=\"document.getElementById('panelcouleur').style.display = 'none';\"><a style='color:#ffffff;' onclick=\"bbcode('[color=#ffffff]','[/color]');\">&#9608;</a><a style='color:#ffff80;' onclick=\"bbcode('[color=#ffff80]','[/color]');\">&#9608;</a><a style='color:#ff80ff;' onclick=\"bbcode('[color=#ff80ff]','[/color]');\">&#9608;</a><a style='color:#ff8080;' onclick=\"bbcode('[color=#ff8080]','[/color]');\">&#9608;</a><a style='color:#ffff00;' onclick=\"bbcode('[color=#ffff00]','[/color]');\">&#9608;</a><a style='color:#ff00ff;' onclick=\"bbcode('[color=#ff00ff]','[/color]');\">&#9608;</a><a style='color:#ff0000;' onclick=\"bbcode('[color=#ff0000]','[/color]');\">&#9608;</a><a style='color:#ff8000;' onclick=\"bbcode('[color=#ff8000]','[/color]');\">&#9608;</a><a style='color:#ff0080;' onclick=\"bbcode('[color=#ff0080]','[/color]');\">&#9608;</a><a style='color:#80ffff;' onclick=\"bbcode('[color=#80ffff]','[/color]');\">&#9608;</a><a style='color:#80ff80;' onclick=\"bbcode('[color=#80ff80]','[/color]');\">&#9608;</a><a style='color:#8080ff;' onclick=\"bbcode('[color=#8080ff]','[/color]');\">&#9608;</a><a style='color:#808080;' onclick=\"bbcode('[color=#808080]','[/color]');\">&#9608;</a><a style='color:#80ff00;' onclick=\"bbcode('[color=#80ff00]','[/color]');\">&#9608;</a><a style='color:#8000ff;' onclick=\"bbcode('[color=#8000ff]','[/color]');\">&#9608;</a><a style='color:#800000;' onclick=\"bbcode('[color=#800000]','[/color]');\">&#9608;</a><a style='color:#808000;' onclick=\"bbcode('[color=#808000]','[/color]');\">&#9608;</a><a style='color:#800080;' onclick=\"bbcode('[color=#800080]','[/color]');\">&#9608;</a><a style='color:#00ffff;' onclick=\"bbcode('[color=#00ffff]','[/color]');\">&#9608;</a><a style='color:#00ff00;' onclick=\"bbcode('[color=#00ff00]','[/color]');\">&#9608;</a><a style='color:#0000ff;' onclick=\"bbcode('[color=#0000ff]','[/color]');\">&#9608;</a><a style='color:#008080;' onclick=\"bbcode('[color=#008080]','[/color]');\">&#9608;</a><a style='color:#000080;' onclick=\"bbcode('[color=#000080]','[/color]');\">&#9608;</a><a style='color:#008000;' onclick=\"bbcode('[color=#008000]','[/color]');\">&#9608;</a><a style='color:#000000;' onclick=\"bbcode('[color=#000000]','[/color]');\">&#9608;</a><a style='color:#0080ff;' onclick=\"bbcode('[color=#0080ff]','[/color]');\">&#9608;</a><a style='color:#00ff80;' onclick=\"bbcode('[color=#00ff80]','[/color]');\">&#9608;</a><a style='color:#b0b0b0;' onclick=\"bbcode('[color=#b0b0b0]','[/color]');\">&#9608;</a><a style='color:#404040;' onclick=\"bbcode('[color=#404040]','[/color]');\">&#9608;</a><a style='color:#eeeeee;' onclick=\"bbcode('[color=#eeeeee]','[/color]');\">&#9608;</a><a style='color:#ffffc0;' onclick=\"bbcode('[color=#ffffc0]','[/color]');\">&#9608;</a><a style='color:#c0c090;' onclick=\"bbcode('[color=#c0c090]','[/color]');\">&#9608;</a><a style='color:#906060;' onclick=\"bbcode('[color=#906060]','[/color]');\">&#9608;</a><a style='color:#c0ffc0;' onclick=\"bbcode('[color=#c0ffc0]','[/color]');\">&#9608;</a><a style='color:#909060;' onclick=\"bbcode('[color=#909060]','[/color]');\">&#9608;</a></span></div><div style='display:none;' id='panelsmiley'><span style='cursor:pointer;' onclick=\"document.getElementById('panelsmiley').style.display = 'none';\"><img src='http://autre.prizee.123.fr/modulesmiley/confused.png' onclick=\"bbcode('[img]http://autre.prizee.123.fr/modulesmiley/confused.png[/img]','');\"> <img src='http://autre.prizee.123.fr/modulesmiley/dizzy.png' onclick=\"bbcode('[img]http://autre.prizee.123.fr/modulesmiley/dizzy.png[/img]','');\"> <img src='http://autre.prizee.123.fr/modulesmiley/omg.png' onclick=\"bbcode('[img]http://autre.prizee.123.fr/modulesmiley/omg.png[/img]','');\"> <img src='http://autre.prizee.123.fr/modulesmiley/neutral.png' onclick=\"bbcode('[img]http://autre.prizee.123.fr/modulesmiley/neutral.png[/img]','');\"> <img src='http://autre.prizee.123.fr/modulesmiley/lol.png' onclick=\"bbcode('[img]http://autre.prizee.123.fr/modulesmiley/lol.png[/img]','');\"> <img src='http://autre.prizee.123.fr/modulesmiley/smile.png' onclick=\"bbcode('[img]http://autre.prizee.123.fr/modulesmiley/smile.png[/img]','');\"> <img src='http://autre.prizee.123.fr/modulesmiley/tongue.png' onclick=\"bbcode('[img]http://autre.prizee.123.fr/modulesmiley/tongue.png[/img]','');\"> <img src='http://autre.prizee.123.fr/modulesmiley/wink.png' onclick=\"bbcode('[img]http://autre.prizee.123.fr/modulesmiley/wink.png[/img]','');\"> <img src='http://autre.prizee.123.fr/modulesmiley/sad.png' onclick=\"bbcode('[img]http://autre.prizee.123.fr/modulesmiley/sad.png[/img]','');\"> <img src='http://autre.prizee.123.fr/modulesmiley/cry.png' onclick=\"bbcode('[img]http://autre.prizee.123.fr/modulesmiley/cry.png[/img]','');\"> <img src='http://autre.prizee.123.fr/modulesmiley/happy.png' onclick=\"bbcode('[img]http://autre.prizee.123.fr/modulesmiley/happy.png[/img]','');\"> <img src='http://autre.prizee.123.fr/modulesmiley/caca.png' onclick=\"bbcode('[img]http://autre.prizee.123.fr/modulesmiley/caca.png[/img]','');\"></span></div>")+"</form>";
*/

  document.getElementById("master_footer_liens_V2").innerHTML += "<div style='position:relative;bottom:450px;left:45%;'><div id='bbcode'><b>BBcode : </b> <a style='cursor:pointer;' onclick=\"bbcode('[b]','[/b]');\">Gras</a> <a style='cursor:pointer;' onclick=\"bbcode('[i]','[/i]');\">Italique</a> <a style='cursor:pointer;' onclick=\"bbcode('[u]','[/u]');\">Souligné</a> <a style='cursor:pointer;' onclick=\"bbcode('[img]','[/img]');\">Image</a> <a style='cursor:pointer;' onclick=\"bbcode('[url]','[/url]');\">Lien</a> <a  style='cursor:pointer;' onclick=\"window.open('http://autre.prizee.123.fr/code.php','Mettre du Code','top=200,left=200,width=500,height=150');\">Code</a> <a style='cursor:pointer;' onclick=\"if(document.getElementById('panelcouleur').style.display == 'none'){document.getElementById('panelcouleur').style.display = 'block';}else{document.getElementById('panelcouleur').style.display = 'none';}\">Couleur</a> <a style='cursor:pointer;' onclick=\"if(document.getElementById('panelsmiley').style.display == 'none'){document.getElementById('panelsmiley').style.display = 'block';}else{document.getElementById('panelsmiley').style.display = 'none';}\">Smiley</a></div><div style='display:none;' id='panelcouleur'><span style='cursor:pointer;' onclick=\"document.getElementById('panelcouleur').style.display = 'none';\"><a style='color:#ffffff;' onclick=\"bbcode('[color=#ffffff]','[/color]');\">&#9608;</a><a style='color:#ffff80;' onclick=\"bbcode('[color=#ffff80]','[/color]');\">&#9608;</a><a style='color:#ff80ff;' onclick=\"bbcode('[color=#ff80ff]','[/color]');\">&#9608;</a><a style='color:#ff8080;' onclick=\"bbcode('[color=#ff8080]','[/color]');\">&#9608;</a><a style='color:#ffff00;' onclick=\"bbcode('[color=#ffff00]','[/color]');\">&#9608;</a><a style='color:#ff00ff;' onclick=\"bbcode('[color=#ff00ff]','[/color]');\">&#9608;</a><a style='color:#ff0000;' onclick=\"bbcode('[color=#ff0000]','[/color]');\">&#9608;</a><a style='color:#ff8000;' onclick=\"bbcode('[color=#ff8000]','[/color]');\">&#9608;</a><a style='color:#ff0080;' onclick=\"bbcode('[color=#ff0080]','[/color]');\">&#9608;</a><a style='color:#80ffff;' onclick=\"bbcode('[color=#80ffff]','[/color]');\">&#9608;</a><a style='color:#80ff80;' onclick=\"bbcode('[color=#80ff80]','[/color]');\">&#9608;</a><a style='color:#8080ff;' onclick=\"bbcode('[color=#8080ff]','[/color]');\">&#9608;</a><a style='color:#808080;' onclick=\"bbcode('[color=#808080]','[/color]');\">&#9608;</a><a style='color:#80ff00;' onclick=\"bbcode('[color=#80ff00]','[/color]');\">&#9608;</a><a style='color:#8000ff;' onclick=\"bbcode('[color=#8000ff]','[/color]');\">&#9608;</a><a style='color:#800000;' onclick=\"bbcode('[color=#800000]','[/color]');\">&#9608;</a><a style='color:#808000;' onclick=\"bbcode('[color=#808000]','[/color]');\">&#9608;</a><a style='color:#800080;' onclick=\"bbcode('[color=#800080]','[/color]');\">&#9608;</a><a style='color:#00ffff;' onclick=\"bbcode('[color=#00ffff]','[/color]');\">&#9608;</a><a style='color:#00ff00;' onclick=\"bbcode('[color=#00ff00]','[/color]');\">&#9608;</a><a style='color:#0000ff;' onclick=\"bbcode('[color=#0000ff]','[/color]');\">&#9608;</a><a style='color:#008080;' onclick=\"bbcode('[color=#008080]','[/color]');\">&#9608;</a><a style='color:#000080;' onclick=\"bbcode('[color=#000080]','[/color]');\">&#9608;</a><a style='color:#008000;' onclick=\"bbcode('[color=#008000]','[/color]');\">&#9608;</a><a style='color:#000000;' onclick=\"bbcode('[color=#000000]','[/color]');\">&#9608;</a><a style='color:#0080ff;' onclick=\"bbcode('[color=#0080ff]','[/color]');\">&#9608;</a><a style='color:#00ff80;' onclick=\"bbcode('[color=#00ff80]','[/color]');\">&#9608;</a><a style='color:#b0b0b0;' onclick=\"bbcode('[color=#b0b0b0]','[/color]');\">&#9608;</a><a style='color:#404040;' onclick=\"bbcode('[color=#404040]','[/color]');\">&#9608;</a><a style='color:#eeeeee;' onclick=\"bbcode('[color=#eeeeee]','[/color]');\">&#9608;</a><a style='color:#ffffc0;' onclick=\"bbcode('[color=#ffffc0]','[/color]');\">&#9608;</a><a style='color:#c0c090;' onclick=\"bbcode('[color=#c0c090]','[/color]');\">&#9608;</a><a style='color:#906060;' onclick=\"bbcode('[color=#906060]','[/color]');\">&#9608;</a><a style='color:#c0ffc0;' onclick=\"bbcode('[color=#c0ffc0]','[/color]');\">&#9608;</a><a style='color:#909060;' onclick=\"bbcode('[color=#909060]','[/color]');\">&#9608;</a></span></div><div style='display:none;' id='panelsmiley'><span style='cursor:pointer;' onclick=\"document.getElementById('panelsmiley').style.display = 'none';\"><img src='http://autre.prizee.123.fr/modulesmiley/confused.png' onclick=\"bbcode('[img]http://autre.prizee.123.fr/modulesmiley/confused.png[/img]','');\"> <img src='http://autre.prizee.123.fr/modulesmiley/dizzy.png' onclick=\"bbcode('[img]http://autre.prizee.123.fr/modulesmiley/dizzy.png[/img]','');\"> <img src='http://autre.prizee.123.fr/modulesmiley/omg.png' onclick=\"bbcode('[img]http://autre.prizee.123.fr/modulesmiley/omg.png[/img]','');\"> <img src='http://autre.prizee.123.fr/modulesmiley/neutral.png' onclick=\"bbcode('[img]http://autre.prizee.123.fr/modulesmiley/neutral.png[/img]','');\"> <img src='http://autre.prizee.123.fr/modulesmiley/lol.png' onclick=\"bbcode('[img]http://autre.prizee.123.fr/modulesmiley/lol.png[/img]','');\"> <img src='http://autre.prizee.123.fr/modulesmiley/smile.png' onclick=\"bbcode('[img]http://autre.prizee.123.fr/modulesmiley/smile.png[/img]','');\"> <img src='http://autre.prizee.123.fr/modulesmiley/tongue.png' onclick=\"bbcode('[img]http://autre.prizee.123.fr/modulesmiley/tongue.png[/img]','');\"> <img src='http://autre.prizee.123.fr/modulesmiley/wink.png' onclick=\"bbcode('[img]http://autre.prizee.123.fr/modulesmiley/wink.png[/img]','');\"> <img src='http://autre.prizee.123.fr/modulesmiley/sad.png' onclick=\"bbcode('[img]http://autre.prizee.123.fr/modulesmiley/sad.png[/img]','');\"> <img src='http://autre.prizee.123.fr/modulesmiley/cry.png' onclick=\"bbcode('[img]http://autre.prizee.123.fr/modulesmiley/cry.png[/img]','');\"> <img src='http://autre.prizee.123.fr/modulesmiley/happy.png' onclick=\"bbcode('[img]http://autre.prizee.123.fr/modulesmiley/happy.png[/img]','');\"> <img src='http://autre.prizee.123.fr/modulesmiley/caca.png' onclick=\"bbcode('[img]http://autre.prizee.123.fr/modulesmiley/caca.png[/img]','');\"></span></div></div>";

}


if(GM_getValue("predefini"))
{
var maReg = new RegExp("'", "g") ;
tableaujs2 = GM_getValue("predefini").replace(maReg,"\\'");
tableaujs = "favliste=new Array();";
listejs = "";
var maReg = new RegExp(";", "g") ;
var resultat = tableaujs2.split( maReg ) ;
for ( i=0; i<resultat.length; i=i+2 )
{
tableaujs += "favliste["+(i/2+1)+"] = '"+resultat[i+1]+"';";
}
for ( i=0; i<resultat.length; i=i+2 )
{
listejs += (i/2+1)+" : "+resultat[i]+"\\n";
}
document.body.appendChild(document.createElement('script')).innerHTML="function bbcode(bbdebut, bbfin){var input = window.document.formu.message_rep;input.focus();var start = input.selectionStart;var end = input.selectionEnd;var insText = input.value.substring(start, end);input.value = input.value.substr(0, start) + bbdebut + insText + bbfin + input.value.substr(end);var pos;if (insText.length == 0){pos = start + bbdebut.length;}else{pos = start + bbdebut.length + insText.length + bbfin.length;}input.selectionStart = pos;input.selectionEnd = pos;}";

document.getElementById("master_footer_liens_V2").innerHTML +="<div style='position:relative;bottom:420px;left:45%;'><div id='bbcode'><a href='#' onclick=\""+tableaujs+"bbcode('', favliste[prompt('Entrez le numéro du texte prédéfini auquel vous souhaitez accéder.\\n"+listejs+"','')]);return false;\" style='text-decoration:none;color:blue;'><img src='http://img17.imageshack.us/img17/4328/iconminimembers.gif'> Textes Prédéfinis</a></div>";
}

if(GM_getValue("signature"))
{
// le .action ne marche pas car il est reservé (type d'envoie)
// esseyer avec act2 ca devrais marcher
if(document.location.toString().search("repondre") == -1){position='511';}
if(document.location.toString().search("nouveau") == -1){position='541';}
// quand on fait != -1 les 2 conditions été executé, bizarre, j'ai donc fait == -1 et inversé les positiobs


var maReg = new RegExp("'", "g") ;
signa2 = GM_getValue("signature").replace(maReg,"\\'");
signa3 = GM_getValue("signaturedebut").replace(maReg,"\\'");
document.getElementById("master_footer_liens_V2").innerHTML +="<div style='position:relative;bottom:"+position+"px;left:72%;'> <input class='button_forum' style='font-weight: bold;' name='bout_previ' value='Envoyer avec signature' type='button' onclick=\"document.formu.message_rep.value='"+signa3+"'+document.formu.message_rep.value+'"+signa2+"';document.formu.type.name='bout_envoyer';document.formu.bout_envoyer.value='Envoyer';document.formu.submit();\"></div>";
//var input = document.createElement('input');input.setAttribute('type','hidden');input.setAttribute('name','envoyer');input.setAttribute('value','bout_envoyer');document.formu.act2.appendChild(input);document.formu.submit();
}