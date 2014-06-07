// ==UserScript==
// @name           Gestionnaire de coordonées
// @namespace      Ikariam
// @include        http://*.ikariam.*/index.php?view=worldmap_iso*
// @author         matheod
// ==/UserScript==

serveur = location.toString().substr(8,2);

if(!GM_getValue(serveur+'liste')){GM_setValue(serveur+'liste','');}

    var nom=new Array();
    var valeur=new Array();

    // On enlève le ?
    param = window.location.search.slice(1,window.location.search.length);

    // On sépare le paramètres....
    // first[0] est de la forme param=valeur

    first = param.split("&");

    for(i=0;i<first.length;i++){
        second = first[i].split("=");
        nom[i] = second[0];
        valeur[i] = second[1];
    } //Le tableau nom contient le nom des paramètres et le tableau valeur contient les valeurs de ces paramètres.

action = valeur[1];
if(action=="ajouter"){GM_setValue(serveur+'liste',GM_getValue(serveur+'liste')+'|'+decodeURI(valeur[2])+'|'+valeur[3]+'|'+valeur[4]);url=location.toString();location.replace(url.substr(0,url.length-location.search.length)+'?view=worldmap_iso');}
if(action=="editer"){
textetableau=GM_getValue(serveur+'liste').split('|');
textetableau[valeur[2]] = decodeURI(valeur[3]);
GM_setValue(serveur+'liste',textetableau.join("|"));
url=location.toString();location.replace(url.substr(0,url.length-location.search.length)+'?view=worldmap_iso');}
if(action=="supprimer"){
textetableau=GM_getValue(serveur+'liste').split('|');
delete textetableau[valeur[2]];
delete textetableau[(parseInt(valeur[2])+1)];
delete textetableau[(parseInt(valeur[2])+2)];
GM_setValue(serveur+'liste',textetableau.join("|").replace("|||",""));
url=location.toString();location.replace(url.substr(0,url.length-location.search.length)+'?view=worldmap_iso');}
	
var node = document.getElementById("navigation");
//var node = node.parentNode;
var nodediv = document.createElement("div")
nodediv.setAttribute('id','gestioncoordonnees');
//node.insertBefore(nodediv,document.getElementById("navigation").firstChild);
node.appendChild(nodediv);
textetableau=GM_getValue(serveur+'liste').split('|');
texte="";
for(i=0;i<textetableau.length-1;i++){
i++;
texte+='<span style="float:right;position:relative;top:5px;"><img src="http://img34.imageshack.us/img34/7495/018nkr.png" style="display:inline;cursor:pointer;" onclick="if(titre=prompt(\'Veuillez entre le nouveau nom de la position :\',\''+textetableau[i]+'\')){url=location.toString();if(url.substr(-1)==\'#\'){url=url.substr(0,url.length-1);}location.replace(url+\'&action=editer&id='+i+'&titre=\'+encodeURIComponent(titre));}"> <b style="color:red;cursor:pointer;" onclick="if(confirm(\'Voulez vous vraiment supprimer la position suivante :\\nNom : '+textetableau[i]+'\\nX : '+textetableau[i+1]+'\\nY : '+textetableau[i+2]+'\')){url=location.toString();if(url.substr(-1)==\'#\'){url=url.substr(0,url.length-1);}location.replace(url+\'&action=supprimer&id='+i+'\');}">X</b>&nbsp;</span><span class="cordliste1" onclick="map.jumpToXY('+textetableau[i+1]+','+textetableau[i+2]+')"><img src="http://www.chaudron-empoisonne.fr/icons/bullet_orange.png" style="display:inline;position:relative;top:3px;"><span class="cordliste2" >'+textetableau[i]+' ('+textetableau[i+1]+','+textetableau[i+2]+')</span></span><br />';
i++;
}
document.getElementById('gestioncoordonnees').innerHTML='<h3 class="header" id="coordtitre">Mes coordonnées favorites</h3><div class="content"> <a href="#" style="color:#542C0F;font-size:11px;font-weight:bold;" onclick="if(titre=prompt(\'Veuillez donner un nom à la position (\'+document.navInputForm.xcoord.value+\',\'+document.navInputForm.ycoord.value+\')\',\'\')){url=location.toString();if(url.substr(-1)==\'#\'){url=url.substr(0,url.length-1);}location.replace(url+\'&action=ajouter&titre=\'+encodeURIComponent(titre)+\'&x=\'+document.navInputForm.xcoord.value+\'&y=\'+document.navInputForm.ycoord.value);}"><img src="http://www.chaudron-empoisonne.fr/icons/world_add.png" style="display:inline;position:relative;top:3px;"> Ajouter ces coordonnées</a><br /><style type="text/css">.cordliste1{cursor:pointer;}.cordliste2:hover{text-decoration:underline;}</style>'+texte+'</div><div class="footer"/>';