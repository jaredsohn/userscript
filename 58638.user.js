// ==UserScript==
// @name           Big map
// @namespace      Ikariam
// @include        http://*.ikariam.*/index.php?view=worldmap_iso*
// @author		matheod
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
option("par défaut", "l'affichage par défaut de la big map ?","defaut");

nodediv = document.createElement("div");
nodediv.setAttribute('id','bigmap');
document.body.appendChild(nodediv);
if(GM_getValue("defaut")){
document.getElementById("scrollcover").style.overflow="visible";document.getElementById("map1").style.cursor="default";document.getElementById("dragHandlerOverlay").style.border="5px solid black";document.getElementById("dragHandlerOverlay").style.opacity="0.1";
document.getElementById('bigmap').innerHTML="<div id='bigmap1' style='display:none;position:absolute;top:0px;left:0px;z-index:9999;cursor:pointer;' onclick='document.getElementById(\"bigmap1\").style.display=\"none\";document.getElementById(\"bigmap2\").style.display=\"block\";document.getElementById(\"scrollcover\").style.overflow=\"visible\";document.getElementById(\"map1\").style.cursor=\"default\";document.getElementById(\"dragHandlerOverlay\").style.border=\"5px solid black\";document.getElementById(\"dragHandlerOverlay\").style.opacity=\"0.1\";'><img src='http://img38.imageshack.us/img38/2343/redhatstarthere.png'></div><div id='bigmap2' style='position:absolute;top:0px;left:0px;z-index:9999;cursor:pointer;' onclick='document.getElementById(\"bigmap1\").style.display=\"block\";document.getElementById(\"bigmap2\").style.display=\"none\";document.getElementById(\"scrollcover\").style.overflow=\"hidden\";document.getElementById(\"map1\").style.cursor=\"move\";document.getElementById(\"dragHandlerOverlay\").style.border=\"none\";document.getElementById(\"dragHandlerOverlay\").style.opacity=\"1\";'><img src='http://img513.imageshack.us/img513/3854/redhatstarthere2.png'></div>";
}else{
document.getElementById('bigmap').innerHTML="<div id='bigmap1' style='position:absolute;top:0px;left:0px;z-index:9999;cursor:pointer;' onclick='document.getElementById(\"bigmap1\").style.display=\"none\";document.getElementById(\"bigmap2\").style.display=\"block\";document.getElementById(\"scrollcover\").style.overflow=\"visible\";document.getElementById(\"map1\").style.cursor=\"default\";document.getElementById(\"dragHandlerOverlay\").style.border=\"5px solid black\";document.getElementById(\"dragHandlerOverlay\").style.opacity=\"0.1\";'><img src='http://img38.imageshack.us/img38/2343/redhatstarthere.png'></div><div id='bigmap2' style='position:absolute;top:0px;left:0px;z-index:9999;cursor:pointer;display:none;' onclick='document.getElementById(\"bigmap1\").style.display=\"block\";document.getElementById(\"bigmap2\").style.display=\"none\";document.getElementById(\"scrollcover\").style.overflow=\"hidden\";document.getElementById(\"map1\").style.cursor=\"move\";document.getElementById(\"dragHandlerOverlay\").style.border=\"none\";document.getElementById(\"dragHandlerOverlay\").style.opacity=\"1\";'><img src='http://img513.imageshack.us/img513/3854/redhatstarthere2.png'></div>";
}