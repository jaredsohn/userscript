// ==UserScript==
// @name           Liste des soldats
// @namespace      Ikariam
// @include        http://*.ikariam.*/liste.php*
// ==/UserScript==
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
        valeur[i] = decodeURI(second[1]);
    } //Le tableau nom contient le nom des paramètres et le tableau valeur contient les valeurs de ces paramètres.
url = document.referrer.substr(0,22);

imax = parseInt(valeur[0]);
texte = "";
for(i=1;i<=imax;i++)
{
texte += '<b>'+valeur[i]+' :</b><div style="overflow: auto; width: 700px; height: 530px;" id="nid'+i+'"><iframe width="2000px" height="2000px" scrolling="no" src="'+url+'/?view=cityMilitary-army&amp;id='+nom[i]+'" onload="document.getElementById(\'nid'+i+'\').scrollTop=\'282\';document.getElementById(\'nid'+i+'\').scrollLeft=\'768\';"></iframe></div>';
}

document.body.innerHTML = texte;