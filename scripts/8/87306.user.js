<html>
<head>
<meta content="text/html; charset=ISO-8859-1"
http-equiv="content-type">
<title>evolution</title>
</head>
<body>
<br>
// ==UserScript==
// @name Progression
// @namespace unknown
// @include http://beta*.e-univers.org/*
// @include http://beta*/index.php?action=*
// ==/UserScript==
version = '1' ;
var serveur = location.href.split('/')[2]; // recuperation du nom du
serveur
var pseudo =
document.getElementById('playerName').getElementsByClassName('textBeefy')[0].innerHTML;
// récupération du pseudo
if (navigator.userAgent.indexOf('Firefox')&gt;-1) // Identification du
navigateur
{ var FireFox = true; var nomScript='';
}
else { var FireFox = false; var nomScript='myProg';
}
//********
//__________________________
//__________________________
//------------------------
// Définition des fonctions GM_getValue et GM_setValue pour Google
Chrome
//------------------------ // Google Chrome &amp; Opéra if(!FireFox) {
function GM_getValue(key,defaultVal) // déclaration des fonctions : {
var retValue = localStorage.getItem(key+nomScript); if ( !retValue ) {
return defaultVal; } return retValue; } function GM_setValue(key,value)
{ localStorage.setItem(key+nomScript, value); } }
//*******
function insertAfter(elem, after) // @copyright KOBB
{ var dad = after.parentNode; if(dad.lastchild == after)
dad.appendChild(elem); else dad.insertBefore(elem, after.nextSibling);
} function getPMCoords() // recupere les coordonées de la PM grace à la
taille des planètes, si le diamétre est de 17.321, c'est la PM
{ // les cas où une autre planète serait de même diamétre sont très
rare, ainsi on demande confirmation à chaque changement de pseudo var
coordPM=''; var i=0; while (coordPM != '17.321') // On recherche la
planète de Diamétre 17.321 { coordPM =
document.getElementsByClassName('smallplanet')[i].innerHTML ; coordPM =
coordPM.split('km')[0].split('&gt;')[3]; i++; }
coordPM=document.getElementsByClassName('planet-koords')[i-1].innerHTML
; var res =confirm('Les coordonées de votre Planéte mère sont bien : '+
coordPM + ' ?'); // on vérifies que ce sont les bonnes if (!res) {
coordPM = prompt('Quelles sont les coordonnées de votre Planéte mère
?',coordPM); } alert('Les coordononées de votre PM seront : ' +
coordPM); GM_setValue('coord'+serveur+pseudo , coordPM);
}
function getPoints_And_Rank() // @copyright KOBB
{ var tdnode = document.getElementsByTagName('script'); var sentence1 =
"<a
href="index.php?action=stats&amp;subaction=score&amp;part=%22;%0A%09%09var%20sentence2%20=%20%22%28%22;%0A%09%09var%20sentence3%20=%20%22%29%22;%0A%09%09var%20nbJoueur="
for="" (var="" ;="" i="0"><tdnode.length ;="" i++)="" {=""
pos1="(tdnode[i].innerHTML).indexOf(sentence1,10);" var=""
pos3="(tdnode[i].innerHTML).indexOf(sentence2,10);" if="" (pos1="">=0)
{ var pos2 =
(tdnode[i].innerHTML).indexOf(sentence2,pos1+sentence1.length); var
pos4 = (tdnode[i].innerHTML).indexOf(sentence3 , pos2); var points =
(tdnode[i].innerHTML).substring(pos1+sentence1.length +14,pos2); var
rank = ((tdnode[i].innerHTML).substring(pos2,pos4)); rank =
rank.split('sur')[0].split('Place')[1];
//points=parseInt(points.replace( /[^0-9-]/g, "")); var prog = new
Array(); prog.day = { points : points, rank : rank, player : pseudo, }
return prog.day; } }
}
function getDaTe() // Récupère et formate la date du jour de la forme
xx-xx-xxxx (pas de 0X mais X )
{ date =new Date(); // recup date actuelle date = date.getDate() +'-'+
(date.getMonth()+1) +'-'+ date.getFullYear(); // date formatée return
date;
}
//*******************************
function saveProg()
{ var prog = getPoints_And_Rank(); // recup point et classement var
coordPM = GM_getValue('coord'+serveur+pseudo, -1) ; // recup coord de
la PM var date= new Date(); date = date.getDate() +' - '+
(date.getMonth()+1) +' - '+ date.getFullYear() + ' à ' +
date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(); //
date actuelle formatée avec l'heure
GM_setValue('progPoints'+getDaTe()+serveur+coordPM , prog.points); //
sauvegarde points du jour
GM_setValue('progRank'+getDaTe()+serveur+coordPM , prog.rank); //
sauvegarde classement du jour
GM_setValue('progPseudo'+getDaTe()+serveur+coordPM , prog.player); //
sauvegarde pseudo du jour if (
GM_getValue('progDateEnr'+serveur+coordPM , 0) == 0 ) // si la date
d'installation n'a pas encore été définie, on la sauvegarde {
GM_setValue('progDateEnr'+serveur+coordPM , date); // sauvegarde ... }
}
//**********************
function addButton() // @Copyright Terminator By Lame Noire
{ var buttonPosition = document.getElementById("links");
if(!buttonPosition) { return; } //buttonPosition =
document.getElementById("links").getElementsByTagName("ul")[0].getElementsByTagName("li")[1];
// <span class="" menu_icon=""><img
src="http://img808.imageshack.us/img808/23/improgressioncopie.png"></span>
// URL Image :
http://img808.imageshack.us/img808/23/improgressioncopie.png var button
= document.createElement("li"); button.innerHTML = '<span
class="menu_icon"><img
src="http://img808.imageshack.us/img808/23/improgressioncopie.png"></span></tdnode.length></a><a
target="_self" accesskey="" href="%27%20+%20location.href%20+%20"
&progression="" +="" class="menubutton"><span class="textlabel">Progression</span></a>';
buttonPosition =
document.getElementById("links").getElementsByTagName("ul")[0].getElementsByTagName("li")[10];
insertAfter(button, buttonPosition);
}
//*****
function parseNB(value) // converti un nombre de la forme xxx.xxx.xxx
en xxxxxxxxx
{ var result = 0; var val=String(value); // récupération de la chaine
de caractère corespondant au param var tmp; if ( val.split('.')[1] ==
undefined) // si le nombre est inferieur à 1000 ( donc pas de .
séparateur) { result = parseInt(value); // on retourne ce nombre } else
{ for (i=0 ; i&lt;5 ; i++ ) // { if( val.split('.')[i] != undefined) //
récupération du paquet de 3 ciffres à la position i {
tmp=value.split('.')[i]; if (tmp[0] == '0') // si le nombre est de la
forme 0XX ( correction nécessaire pour éviter que parseInt() retourne 0
{ if (tmp[1] == '0') // si le nombre esy de la forme 00X { tmp=tmp[2];
} else { tmp=tmp[1]+tmp[2]; } } result = ( 1000* result) + (
parseInt(tmp) ) ; // On multiplie l'existant par 1000 et on rajoute le
paquet suivant. } } } return ( result ); }
//*******************
function MiN(tab) // calcule la valeur minimale du tableau table
{ var mini = tab[0]; for ( i=1 ; i&lt; tab.length ; i++ ) { if ( tab[i]
&lt; mini) // si le nombre actuel est inférieur au précédent minimum
... mini = tab[i]; } return ( mini ); }
//******
function MaX(tab) // calcule la valeur maximale du tableau table
{ var maxi = tab[0]; for ( i=1 ; i&lt; tab.length ; i++ ) { if ( tab[i]
&gt; maxi ) // si le nombre actuel est supérieur au précédent maximum
... maxi = tab[i]; } return ( maxi );
}
//********
function tabPoint(month,year) // Création dun tableau contenant
l'ensembles des points du mois, ceux qui n'existe pas sont remplacés
par leur suivant le plus proche, s'il n'y en a pas, par leur précédent.
{ var date = getDaTe(); var day ='1'; date = day+'-'+month+'-'+year; //
on part de la date 1-xx-xxxx var table = new Array(); var day2=day; //
initialisation de la date de secours (si à la date day il n'y pas de
donnée sauvegardée while (day &lt; (String(nbJoursM(month,year)+1)) )
// tant que l'on est pas à la fin du mois { if (
GM_getValue('progPoints'+date+serveur+coordPM , -1) == -1) // si la
donnée n'est pas sauvegardée { day2=day; while
(GM_getValue('progPoints'+date+serveur+coordPM , -1) == -1 &amp;&amp;
day2 != (String(nbJoursM(month,year)+1)) ) // tant que l'on a pas
trouvée une autre donnée valide plus loin { day2++; date =
day2+'-'+month+'-'+year; } if
(GM_getValue('progRank'+date+serveur+coordPM , -1) == -1) // si pas de
donnée trouvée plus loin, on cherche avant { day2 == day; while
(GM_getValue('progRank'+date+serveur+coordPM , -1) == -1 &amp;&amp;
day2 != '0') { day2--; date = day2+'-'+month+'-'+year; } } }
table.push(parseNB(GM_getValue('progPoints'+date+serveur+coordPM , -1))
); // ajout de la nouvelle donnée day++; date = day+'-'+month+'-'+year;
} return ( table );
}
//*******
function tabRank(month,year) // idem fonction précédente avec le
classement
{ var date = getDaTe(); var day ='1'; date = day+'-'+month+'-'+year;
var table = new Array(); var day2=day; while (day &lt;
(String(nbJoursM(month,year)+1)) ) { if (
GM_getValue('progRank'+date+serveur+coordPM , -1) == -1) { day2 = day;
while (GM_getValue('progRank'+date+serveur+coordPM , -1) == -1
&amp;&amp; day2 != (String(nbJoursM(month,year)+1))) { day2++; date =
day2+'-'+month+'-'+year; } if
(GM_getValue('progRank'+date+serveur+coordPM , -1) == -1) { day2 ==
day; while (GM_getValue('progRank'+date+serveur+coordPM , -1) == -1
&amp;&amp; day2 != '0') { day2--; date = day2+'-'+month+'-'+year; } } }
table.push(GM_getValue('progRank'+date+serveur+coordPM , -1) ); day++;
date = day+'-'+month+'-'+year; } return ( table );
}
//*******
function anBiss(year) // test si l'année est bissextile
{
var biss=false;
var an = parseInt(year); // récupération de l'année en entier
if(eval(an%4)==0) { if(eval(an%100)==0) { if(eval(an%400)==0) { biss =
true; } else { biss = false; } } else { biss = true; } }
else { biss = false; } return ( biss );
}
//******
function nbJoursM(month,year) // retourne le nombre de jour du mois
month de l'année year
{ var listeNbrJours = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31,
30, 31); if (anBiss(year)) { listeNbrJours[1]++ } return (
listeNbrJours[(parseInt(month)) -1 ] )
}
//**********************
//**** CREATION DU GRAPHIQUE DES POINTS ET CLASSEMENT
//********************** function graphM(month,year)
{ var day = nbJoursM(month,year);; // recup du nombre de jour du mois à
afficher if( getDaTe().split('-')[1] == month &amp;&amp;
getDaTe().split('-')[2] == year) // si le mois a afficher est l'actuel,
on récupère le jour actuel { day = getDaTe().split('-')[0] } var url =
'http://chart.apis.google.com/chart?chxr=0,'+parseInt(MiN(tabRank(month,year)))+','+parseInt(MaX(tabRank(month,year)))+'|1,'+MiN(tabPoint(month,year))+','+MaX(tabPoint(month,year))+'|2,1,'+day+'&amp;chxs=0,FF0000,11.5,0,lt,FF0000|1,3072F3,11.5,0,lt,3072F3&amp;chxt=r,y,x&amp;chs=666x200&amp;cht=lxy&amp;chco=3072F3,FF0000&amp;chds=1,'+day+','+MiN(tabPoint(month,year))+','+parseNB(MaX(tabPoint(month,year)))+',1,'+day+','+parseInt(MiN(tabRank(month,year)))+','+parseInt(MaX(tabRank(month,year)))+'&amp;chd=t:';
// préparation de l'url du graphique (début) for ( i=1 ; i &lt;
((parseInt(day) )+1) ; i++) // ajout des données correspondant aux
jours { url += i; if (i != day) { url += ','; } else { url+='|'; } }
var table=tabPoint(month,year) // recup du tableau des points for ( i=1
; i &lt; ((parseInt(day) )+1) ; i++) // ajout des données relatives aux
points { url += table[i-1]; if (i != day) { url += ','; } else {
url+='|'; } } for ( i=1 ; i &lt; ((parseInt(day) )+1) ; i++) // ajout
des données correspondants aux jours, encore { url += i; if (i != day)
{ url += ','; } else { url+='|'; } } var table2=tabRank(month,year) //
recup du tableau du classement for ( i=1 ; i &lt; ((parseInt(day) )+1)
; i++) // ajout des données du classement { url +=
parseInt(table2[i-1]); if (i != day) { url += ','; } } url
+='&amp;chdl=Points|Rank&amp;chdlp=b&amp;chls=2,4,1|1&amp;chma=5,5,5,25&amp;chtt=Progression&amp;chts=BB1010,11.5';
// ajout des derniers élements de l'url //result.innerHTML +='
<p align="center"><img
src="%27+url+%27/%3E%3Cbr%3E%3Ci%3EProgression%20de%20%27+convMonth2%28month%29+%27%20%27+year+%27.%3C/i%3E%3C/p%3E%27;%20//%20mise%20en%20place%20du%20graphique%20dans%20le%20bloc%20HTML%0A%09return%20%28%20url%20%29;%0A%0A%7D%09%0A%09%0A//****%0A%0Afunction%20affDet%28month,year%29%20//+affiche+le+d%E9tail+des+points+du+mois+choisis%0A%7B%0Avar+dayF+=%20parseInt%28nbJoursM%28month,year%29%29;%20//+recup+du+nombre+de+jour+du+mois+%E0+afficher%0A%09if%28+getDaTe%28%29.split%28%27-%27%29%5B1%5D+==%20month%20&amp;&amp;%20getDaTe%28%29.split%28%27-%27%29%5B2%5D%20==%20year%29%20//%20si%20le%20mois%20a%20afficher%20est%20l%27actuel,+on+r%E9cup%E8re+le+jour+actuel%0A%09%7B%0A%09%09%0A%09%09dayF+=%20getDaTe%28%29.split%28%27-%27%29%5B0%5D%0A%09%7D%0Avar%20day%20=%20%271%27;%20%0Avar%20date%20=%20day+%27-%27+month+%27-%27+year;%0Avar%20tableP%20=%20tabPoint%28month,year%29;%20//%20recup%20tableau%20points%0Avar%20tableR%20=%20tabRank%28month,year%29;%20//%20recup%20tableau%20rank%0Avar%20progPTotale%20=%20tableP%5B%20dayF-1%5D%20-%20tableP%5B0%5D;%20//%20calcul%20progression%20en%20points%0Avar%20progRTotale%20=%20tableR%5B%20dayF-1%5D%20-%20tableR%5B0%5D;%20//%20calcul%20progression%20au%20classement%0Avar%20textP=%27%27;%0Avar%20textR=%27%27;%0Aif%20%28%20progPTotale%20==%200%29%20//+affection+d%27une+couleur+diff%E9rent+selon+si+positif+%28+vert+%29++n%E9gatif+%28rouge%29+ou+nul+%28blanc%29%0A%09%7B%0A%09%09textP=%27%3Cfont%20color=white%3E%27+parseString%28progPTotale%29+%27%3C/font%3E%27;%0A%09%7D%0Aif%20%28%20progPTotale%20%3E%200%29%0A%09%7B%0A%09%09textP=%27%3Cfont%20color=green%3E+%20%27+parseString%28progPTotale%29+%27%3C/font%3E%27;%0A%09%7D%0Aif%20%28%20progPTotale%20%3C%200%29%0A%09%7B%0A%09%09textP=%27%3Cfont%20color=red%3E-%20%27+parseString%28-1*progPTotale%29+%27%3C/font%3E%27;%0A%09%7D%0Aif%20%28%20progRTotale%20==%200%29%0A%09%7B%0A%09%09textR+=%27%3Cfont%20color=white%3E%27+parseString%28progRTotale%29+%27%3C/font%3E%27;%0A%09%7D%0Aif%20%28%20progRTotale%20%3C%200%29%0A%09%7B%0A%09%09textR=%27%3Cfont%20color=green%3E+%20%27+parseString%28%28-1*%20progRTotale%29%29+%27%3C/font%3E%27;%0A%09%7D%0Aif%20%28%20progRTotale%20%3E%200%29%0A%09%7B%0A%09%09textR=%27%3Cfont%20color=red%3E-%20%27+parseString%28progRTotale%29+%27%3C/font%3E%27;%0A%09%7D%0Aif%20%28parseInt%28dayF%29%20==%201%29%0A%7B%0A%09var%20moyenneP%20=%20Math.round%28progPTotale%20/%20dayF%29;%20//%20calcul%20moyenne%20progression%20points%0A%09var%20moyenneR%20=%20progRTotale%20/%20dayF;%20//%20calcul%20moyenne%20progression%20rank%0A%7D%0A%09else%0A%7B%0A%09var%20moyenneP%20=%20Math.round%28progPTotale%20/%20%28dayF-1%29%29;%20//%20calcul%20moyenne%20progression%20points%0A%09var%20moyenneR%20=%20progRTotale%20/%20%28dayF-1%29;%20//%20calcul%20moyenne%20progression%20rank%0A%7D%0Avar%20textP2=%27%27;%0Avar%20textR2=%27%27;%0AmoyenneR%20=%20%28parseInt%28100*moyenneR%29%29/100;%0Aif%20%28%20moyenneP%20==%200%29%20//+affection+d%27une+couleur+diff%E9rent+selon+si+positif+%28+vert+%29++n%E9gatif+%28rouge%29+ou+nul+%28blanc%29%0A%09%7B%0A%09%09textP2=%27%3Cfont%20color=white%3E%27+parseString%28moyenneP%29+%27%3C/font%3E%27;%0A%09%7D%0Aif%20%28%20moyenneP%20%3E%200%29%0A%09%7B%0A%09%09textP2=%27%3Cfont%20color=green%3E+%20%27+parseString%28moyenneP%29+%27%3C/font%3E%27;%0A%09%7D%0Aif%20%28%20moyenneP%20%3C%200%29%0A%09%7B%0A%09%09textP2=%27%3Cfont%20color=red%3E-%20%27+parseString%28-1*moyenneP%29+%27%3C/font%3E%27;%0A%09%7D%0Aif%20%28%20moyenneR%20==%200%29%0A%09%7B%0A%09%09textR2=%27%3Cfont%20color=white%3E%27+moyenneR+%27%3C/font%3E%27;%0A%09%7D%0Aif%20%28%20moyenneR%20%3C%200%29%0A%09%7B%0A%09%09textR2=%27%3Cfont%20color=green%3E+%20%27+-1*%20moyenneR+%27%3C/font%3E%27;%0A%09%7D%0Aif%20%28%20moyenneR%20%3E%200%29%0A%09%7B%0A%09%09textR2=%27%3Cfont%20color=red%3E-%20%27+moyenneR+%27%3C/font%3E%27;%0A%09%7D%0Avar%20text=%27%3Cbr%3E%3Cp%20align=center%3E%3Cu%3E%3Cb%3ED%E9tails+des+points+de+%27++%20convMonth2%28month%29%20+%20%27%20%27%20+%20year%20+%27%20%3C/b%3E%3C/u%3E%3Cbr%3E%3Cbr%3E%3Cu%3EBILAN%20:%3C/u%3E%3Cbr%3E%3Cbr%3E%20%3Cu%3EPoints%20:%3C/u%3E%3Cbr%3E%27+parseString%28tableP%5B0%5D%29+%27%3Cfont%20color=red%3E-%3E%3C/font%3E%27%20+parseString%28tableP%5B%20%28dayF-1%29%5D%29+%27%20=%20%27+textP+%27%3Cbr%3E%3Cbr%3E%3Cu%3E%20Rank%20:%20%3C/u%3E%3Cbr%3E%27+tableR%5B0%5D+%27%3Cfont%20color=red%3E-%3E%3C/font%3E%27%20+tableR%5B%20dayF%20-%201%5D+%27%20=%20%27+textR+%27%3Cbr%3E%20Moyenne%20:%20%3Cbr%3E%3Cbr%3E%20Points%20:%20%27+textP2+%27%20pts/jour%20%3Cbr%3ERank%20:%20%27+textR2+%27%20place/jour%20%3Cbr%3E%20%3Cfont%20color=#cccc00%3E%3Ctable%3E%27;%0A//+D%E9but+du+bloc+HTML+des+d%E9tails+des+points+%28+titre++%20bilan%20+%20moyennes%20%29%0A%09%09while%20%28day%20%3C%20%28String%28nbJoursM%28month,year%29+1%29%29%20%29%20//+tant+que+pas+%E0+la+fin+du+mois,+ajout+des+donn%E9es+de+chaque+jour%0A%09%09%7B%0A%09%09if+%28+GM_getValue%28%27progPoints%27+date+serveur+coordPM%20,%20-1%29%20==%20-1%29%20//+si+donn%E9e+non+connue%0A%09%09%7B%0A%0A%09%09%09text+=%27%3Ctr%3E%3Ctd%3E%3Cfont%20color=red%3E%27+%20date+%20%27%3C/font%3E%3C/td%3E%20%3Ctd%3E%3Cfont%20color=red%3E%3Ci%3E-%20%27%20+%27Non+d%E9fini%3C/i%3E%3C/font%3E%3C/td%3E%3C/tr%3E%27;%0A%09%09%0A%09%09%7D%0A%09%09else%0A%09%09%7B%0A%09%09text%20+=%20%27%3Ctr%3E%3Ctd%3E%27+date%20+%20%27%3C/td%3E%20%3Ctd%3E-%20%27%20+%20GM_getValue%28%27progPoints%27+date+serveur+coordPM%20,%20-1%29%20+%27%20%3C/td%3E%3Ctd%3E%27+calcProg%28date%29.split%28%27_%27%29%5B0%5D+%27%3C/td%3E%3Ctd%3E--%20%27+%20GM_getValue%28%27progRank%27+date+serveur+coordPM%20,%20-1%29++%27%3Csup%3E%E8me%3C/sup%3E%3C/td%3E%3Ctd%3E%27+calcProg%28date%29.split%28%27_%27%29%5B1%5D+%27%3C/td%3E%3C/tr%3E%27;%0A%09%09%7D%0A%09%09day++;%0A%09%09date%20=%20day+%27-%27+month+%27-%27+year;%0A%09%09%0A%09%7D%0A%09text+=%27%3C/table%3E%3C/font%3E%27;%20//%20fin%20du%20texte%0A%09result.innerHTML%20+=%27%3Cb%3E%27+%20text+%27%3C/b%3E%3C/p%3E%27;%20//%20fin%20du%20bloc%20HTML%0A%0A%7D%0A%0A//*****%0A%0Afunction%20convMonth%28month%29%20//+Convertit+le+nom+d%27un+mois+%28Anglais%29+en+son+num%E9ro%0A%7B%0A%09var+country+=%20location.href.split%28%27ogame.%27%29%5B1%5D.split%28%27/%27%29%5B0%5D;%0A%0A%09if%20%28country%20==%20%27fr%27%29%0A%09%7B%0A%09%09switch%20%28%20month%20%29%0A%09%09%7B%0A%09%09%09case%20%27Janvier%27%20:%20return%20%271%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27Fevrier%27%20:%20return%20%272%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27Mars%27%20:%20return%20%273%27;%0A%09%09%09%09break;%09%0A%09%09%09case%20%27Avril%27%20:%20return%20%274%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27Mai%27%20:%20return%20%275%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27Juin%27%20:%20return%20%276%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27Juillet%27%20:%20return%20%277%27;%0A%09%09%09%09break;%0A%09%09%09case+%27Ao%FBt%27+:%20return%20%278%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27Septembre%27%20:%20return%20%279%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27Octobre%27%20:%20return%20%2710%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27Novembre%27%20:%20return%20%2711%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27Decembre%27%20:%20return%20%2712%27;%0A%09%09%09%09break;%0A%09%09%7D%0A%09%7D%0A%09else%0A%09%7B%0A%09%09switch%20%28%20month%20%29%0A%09%09%7B%0A%09%09%09case%20%27January%27%20:%20return%20%271%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27February%27%20:%20return%20%272%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27March%27%20:%20return%20%273%27;%0A%09%09%09%09break;%09%0A%09%09%09case%20%27April%27%20:%20return%20%274%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27May%27%20:%20return%20%275%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27June%27%20:%20return%20%276%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27July%27%20:%20return%20%277%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27August%27%20:%20return%20%278%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27September%27%20:%20return%20%279%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27October%27%20:%20return%20%2710%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27November%27%20:%20return%20%2711%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27December%27%20:%20return%20%2712%27;%0A%09%09%09%09break;%0A%09%09%7D%0A%09%7D%0A%0A%7D%0A%0A//******%0A%0Afunction%20convMonth2%28month%29%20//+Convertit+le+num%E9ro+d%27un+mois+en+son+nom+%28Anglais%29%0A%7B%0A%09var+country+=%20location.href.split%28%27ogame.%27%29%5B1%5D.split%28%27/%27%29%5B0%5D;%0A%0A%09if%20%28country%20==%20%27fr%27%29%0A%09%7B%0A%09%09switch%20%28%20month%20%29%0A%09%09%7B%0A%09%09%09case%20%271%27:%20return%20%27Janvier%27;%0A%09%09%09%09break;%0A%09%09%09case%20%272%27%20:%20return%20%27Fevrier%27;%0A%09%09%09%09break;%0A%09%09%09case%20%273%27%20:%20return%20%27Mars%27;%0A%09%09%09%09break;%09%0A%09%09%09case%20%274%27%20:%20return%20%27Avril%27;%0A%09%09%09%09break;%0A%09%09%09case%20%275%27%20:%20return%20%27Mai%27;%0A%09%09%09%09break;%0A%09%09%09case%20%276%27%20:%20return%20%27Juin%27;%0A%09%09%09%09break;%0A%09%09%09case%20%277%27%20:%20return%20%27Juillet%27;%0A%09%09%09%09break;%0A%09%09%09case%20%278%27%20:+return+%27Ao%FBt%27;%0A%09%09%09%09break;%0A%09%09%09case%20%279%27%20:%20return%20%27Septembre%27;%0A%09%09%09%09break;%0A%09%09%09case%20%2710%27%20:%20return%20%27Octobre%27;%0A%09%09%09%09break;%0A%09%09%09case%20%2711%27%20:%20return%20%27Novembre%27;%0A%09%09%09%09break;%0A%09%09%09case%20%2712%27%20:%20return%20%27Decembre%27;%0A%09%09%09%09break;%0A%09%09%7D%0A%09%7D%0A%09else%0A%09%7B%0A%09%09switch%20%28%20month%20%29%0A%09%09%7B%0A%09%09%09case%20%271%27:%20return%20%27January%27;%0A%09%09%09%09break;%0A%09%09%09case%20%272%27%20:%20return%20%27February%27;%0A%09%09%09%09break;%0A%09%09%09case%20%273%27%20:%20return%20%27March%27;%0A%09%09%09%09break;%09%0A%09%09%09case%20%274%27%20:%20return%20%27April%27;%0A%09%09%09%09break;%0A%09%09%09case%20%275%27%20:%20return%20%27May%27;%0A%09%09%09%09break;%0A%09%09%09case%20%276%27%20:%20return%20%27June%27;%0A%09%09%09%09break;%0A%09%09%09case%20%277%27%20:%20return%20%27July%27;%0A%09%09%09%09break;%0A%09%09%09case%20%278%27%20:%20return%20%27August%27;%0A%09%09%09%09break;%0A%09%09%09case%20%279%27%20:%20return%20%27September%27;%0A%09%09%09%09break;%0A%09%09%09case%20%2710%27%20:%20return%20%27October%27;%0A%09%09%09%09break;%0A%09%09%09case%20%2711%27%20:%20return%20%27November%27;%0A%09%09%09%09break;%0A%09%09%09case%20%2712%27%20:%20return%20%27December%27;%0A%09%09%09%09break;%0A%09%09%7D%0A%09%7D%0A%0A%7D%0A%0A//***%0A%0Afunction%20compareDate%28month%29%20//+test+si+la+date+faite+avec+le+mois+%28+et+la+date+r%E9cup%E9r%E9e%29+pass%E9+en+param%E8tre+est+compris+entre+la+date+d%27installation+et+la+date+actuelle+%28signifie+donc+que+en+dehors+de+ces+bornes+aucune+donn%E9es+n%27existe+%29,+retourne+3+nombre+diff%E9rents+:%201=+pass%E9+,%202%20=%20futur,%20%200=Ok%0A%7B%0A%09var%20year%20=%20parseInt%28document.getElementById%28%27textYear%27%29.value%29;%20//+ann%E9e+saisie+dans+le+champs+de+texte%0A%09var+dateEnr=%20GM_getValue%28%27progDateEnr%27+serveur+coordPM%20,%20-1%29;%20//%20recup%20date%20installation%0A%09var%20yearEnr%20=+parseInt%28dateEnr.split%28%27-%27%29%5B2%5D.split%28%27+%E0%27%29%5B0%5D%29;%20//+recup+ann%E9e+instal%0A%09var+monthEnr+=%20parseInt%28dateEnr.split%28%27-%27%29%5B1%5D%29;%20//%20recup%20moins%20install%0A%09var%20monthNow%20=%20parseInt%28getDaTe%28%29.split%28%27-%27%29%5B1%5D%29;%20//%20recup%20mois%20actuel%0A%09var%20yearNow%20=%20parseInt%28getDaTe%28%29.split%28%27-%27%29%5B2%5D%29;%20//+recup+ann%E9e+actuelle%0A%09if+%28+yearEnr+%3E+year%29++//+si+l%27ann%E9e+choisie+est+avant+l%27ann%E9e+d%27install%0A%09%7B%0A%09%09return+1;%0A%09%7D%0A%09if%20%28%20yearEnr%20==%20year%20&amp;&amp;%20monthEnr%20%3E%20month%29%20//+si+c%27est+dans+l%27ann%E9e+actuelle+et+que+le+mois+choisis+est+ant%E9rieur+au+moins+d%27install%0A%09%7B%0A%09%09return+1;%0A%09%7D%0A%09if%20%28%20yearNow%20%3C%20year%20%29%20//+si+l%27ann%E9e+choisie+est+post%E9rieure+%E0+celle+actuelle%0A%09%7B%0A%09%09return+2;%0A%09%7D%0A%09if%20%28%20yearNow%20==%20year%20&amp;&amp;%20monthNow%20%3C%20month%29%20//+si+l%27ann%E9e+saisie+est+celle+en+cours+et+que+le+mois+est+apr%E8s+celui+actuel%0A%09%7B%0A%09%09return+2;%0A%09%7D%0A%09else%20//%20si%20tout%20est%20ok%0A%09%7B%0A%09%09return%200;%0A%09%7D%0A%7D%0A%0A//*******%0A%0Afunction%20detYear%28year%29%0A%7B%0A%09var%20yearNow%20=%20getDaTe%28%29.split%28%27-%27%29%5B2%5D;%0A%09var%20month%20=%20%2712%27;%0A%09if%20%28%20year%20==%20yearNow%20%29%0A%09%7B%0A%09%09month%20=%20getDaTe%28%29.split%28%27-%27%29%5B1%5D;%0A%09%7D%0A%0A%0A%7D%0A%0A//*******%0A%0Afunction%20afficher%28%29%20//+affiche+les+donn%E9es+relatives+au+mois+saisi,+d%E9clench%E9+par+le+bouton"
go="" document.getelementbyid(="" sel="" ).value="" !="------------"
month="convMonth(document.getElementById('sel').value);" mois="" }=""
year="document.getElementById('textYear').value;" année="" var=""
recup="" validité="" de="" la="" date="" if="" (=""
res="compareDate(month);" 0="" )="" si="" ok="" {=""
result.innerhtml="&lt;br&gt;&lt;br&gt;&lt;h2 align=center&gt;Progression de "
+gm_getvalue(="" progpseudo="" +getdate()+serveur+coordpm="" ,=""
-1)="" +=""><br>
</p>
<h6 align="center"> Installé le '+dateEnr+'.</h6>
<br>
<br>
'; // affichage titre if ( document.getElementById('sel').value !=
'------------') { selectMonth.value=convMonth2(month); var
url=graphM(month,year); // affichage graphique result.innerHTML +='
<p align="center"><img src="%27+url+%27"><br>
<i>Progression de '+convMonth2(month)+' '+year+'.</i></p>
'; // mise en place du graphique dans le bloc HTML affDet(month,year);
// affichage détails du mois } else { detYear(year); } } if ( res == 1)
// si date passée { alert("Date antérieure à l'installation"); } if (
res == 2) // Si date future à celel actuelle { alert("Date future"); }
}
//****
function nextPage() // affiche les données relative au mois suivant,
idem que afficher() mais pour le mois suivant, déclanché par le bouton
&gt;&gt;
{ var month =
String(parseInt(convMonth(document.getElementById('sel').value))+1);
var year = document.getElementById('textYear').value; if (
parseInt(month) &gt; 12) { month = '1'; year =
String(parseInt(year)+1); } var res = compareDate(month); if ( res == 0
) { //alert('OK'); result.innerHTML='<br>
<br>
<h2 align="center">Progression de '
+GM_getValue('progPseudo'+getDaTe()+serveur+coordPM , -1) +'</h2>
<br>
<h6 align="center"> Installé le '+dateEnr+'.<br>
<br>
'; selectMonth.value=convMonth2(month);
document.getElementById('textYear').value=year; var
url=graphM(month,year); // affichage graphique result.innerHTML +='
<p align="center"><img src="%27+url+%27"><br>
<i>Progression de '+convMonth2(month)+' '+year+'.</i></p>
'; // mise en place du graphique dans le bloc HTML affDet(month,year);
} if ( res == 1) { alert("Date antérieure à l'installation"); } if (
res == 2) { alert("Date future"); }
}
//******
function prevPage() // affiche les données relative au mois précedant,
idem que afficher() mais pour le mois précedant, déclanché par le
bouton &lt;&lt;
{ var month =
String(parseInt(convMonth(document.getElementById('sel').value))-1);
var year = document.getElementById('textYear').value; if (
parseInt(month) &lt; 1) { month = '12'; year =
String(parseInt(year)-1); } var res = compareDate(month); if ( res == 0
) { //alert('OK'); result.innerHTML='<br>
<br>
</h6>
<h2 align="center">Progression de '
+GM_getValue('progPseudo'+getDaTe()+serveur+coordPM , -1) +'</h2>
<br>
<h6 align="center"> Installé le '+dateEnr+'.<br>
<br>
'; selectMonth.value=convMonth2(month);
document.getElementById('textYear').value=year; var
url=graphM(month,year); // affichage graphique result.innerHTML +='
<p align="center"><img src="%27+url+%27"><br>
<i>Progression de '+convMonth2(month)+' '+year+'.</i></p>
'; // mise en place du graphique dans le bloc HTML affDet(month,year);
} if ( res == 1) { alert("Date antérieure à l'installation"); } if (
res == 2) { alert("Date future"); }
}
//***
function calcProg(date) // Calcule la progression en point et
classement entre la date passée en param et la veille, formaté de la
forme " progPoint_ProgRank "
{ var text=' _ '; // texte de base si aucune opération à faire if (
parseInt(date.split('-')[0]) &gt; 1 ) // si la date est autre au
premier jour { var datePrev =
String(parseInt(date.split('-')[0])-1)+'-'+date.split('-')[1]+'-'+date.split('-')[2];
// création chaine de caractère de la date de la veille var point1 =
GM_getValue('progPoints'+datePrev+serveur+coordPM , -1); // recup
points du jour précedant var point2 =
GM_getValue('progPoints'+date+serveur+coordPM , -1); // recup points du
jour date var rank1 =
parseNB(GM_getValue('progRank'+datePrev+serveur+coordPM , -1)); //
recup rank du jour précedant var rank2 =
parseNB(GM_getValue('progRank'+date+serveur+coordPM , -1)); // recup
rank du jour date if ( point1 != -1 &amp;&amp; point2 != -1 &amp;&amp;
rank1 != -1 &amp;&amp; rank2 != -1) // si toutes les données existent {
point1 = parseNB(point1); // conversion en entier point2 =
parseNB(point2);// conversion en entier var diff = point2 - point1 ; //
calcul progression points var diffRank = parseInt(rank2) -
parseInt(rank1); // calcul progression classment if ( diff == 0) //
affection d'une couleur différent selon si positif ( vert ) négatif
(rouge) ou nul (blanc) { text='<font color="white">'+parseString(diff)+'</font>';
} if ( diff &gt; 0) { text='<font color="green">+ '+parseString(diff)+'</font>';
} if ( diff &lt; 0) { text='<font color="red">- '+parseString(-1*diff)+'</font>';
} text +='_'; // ajout séparateur if ( diffRank == 0) { text+='<font
color="white">'+parseString(diffRank)+'</font>'; } if ( diffRank &lt;
0) { text+='<font color="green">+ '+parseString((-1* diffRank))+'</font>';
} if ( diffRank &gt; 0) { text+='<font color="red">-
'+parseString(diffRank)+'</font>'; } } } return (text);
}
//****
function calcProg2(date) // Calcule la progression en point et
classement entre la date passée en param et la veille, formaté de la
forme " progPoint_ProgRank "
{ var text=' _ '; // texte de base si aucune opération à faire if (
parseInt(date.split('-')[0]) &gt; 1 ) // si la date est autre au
premier jour { var datePrev =
String(parseInt(date.split('-')[0])-1)+'-'+date.split('-')[1]+'-'+date.split('-')[2];
// création chaine de caractère de la date de la veille var point1 =
GM_getValue('progPoints'+datePrev+serveur+coordPM , -1); // recup
points du jour précedant var point2 =
GM_getValue('progPoints'+date+serveur+coordPM , -1); // recup points du
jour date var rank1 = GM_getValue('progRank'+datePrev+serveur+coordPM ,
-1); // recup rank du jour précedant var rank2 =
GM_getValue('progRank'+date+serveur+coordPM , -1); // recup rank du
jour date if ( point1 != -1 &amp;&amp; point2 != -1 &amp;&amp; rank1 !=
-1 &amp;&amp; rank2 != -1) // si toutes les données existent { point1 =
parseNB(point1); // conversion en entier point2 = parseNB(point2);//
conversion en entier var diff = point2 - point1 ; // calcul progression
points var diffRank = parseInt(rank2) - parseInt(rank1); // calcul
progression classment if ( diff == 0) // affection d'une couleur
différent selon si positif ( vert ) négatif (rouge) ou nul (blanc) {
text='[color=white]'+parseString(diff)+'[/color]'; } if ( diff &gt; 0)
{ text='[color=green]+ '+parseString(diff)+'[/color]'; } if ( diff &lt;
0) { text='[color=red]- '+parseString(-1*diff)+'[/color]'; } text
+='_'; // ajout séparateur if ( diffRank == 0) {
text+='[color=white]'+parseString(diffRank)+'[/color]'; } if ( diffRank
&lt; 0) { text+='[color=green]+ '+parseString((-1*
diffRank))+'[/color]'; } if ( diffRank &gt; 0) { text+='[color=red]-
'+parseString(diffRank)+'[/color]'; } } } return (text);
}
//****
function parseString(val) // converti un entier de la fome xxxxxx en
xxx.xxx, pour personnalisation du nombre de chiffre par paquet, il
suffit de remplacer 3 par le nombre voulu dans la ligne suivante : if (
((lg-1) - i)%3 == 0 &amp;&amp; i != (lg-1) )
{ var nb = String(val); // conversion nombre en chaine de caractère var
lg = nb.length; // recup longueur de la chaine var res=''; for ( i=0 ;
i &lt; lg ; i++) { res += nb[i]; // ajout du ième chiffre du nombre if
( ((lg-1) - i)%3 == 0 &amp;&amp; i != (lg-1) ) // ajout du séparateur
'.' si nécessaire { res +='.'; } } return res; }
//*******
function exportBBCode()
{ var month =
String(parseInt(convMonth(document.getElementById('sel').value))); var
year = document.getElementById('textYear').value; var text=
'[center][size=18][color=#009999][i]Progression de '
+GM_getValue('progPseudo'+getDaTe()+serveur+coordPM , -1)+' de
'+convMonth2(month)+' '+year+'.[/i][/color][/size] \n
[img]'+graphM(month,year)+'[/img][/center]'; var dayF =
parseInt(nbJoursM(month,year)); // recup du nombre de jour du mois à
afficher if( getDaTe().split('-')[1] == month &amp;&amp;
getDaTe().split('-')[2] == year) // si le mois a afficher est l'actuel,
on récupère le jour actuel { dayF = getDaTe().split('-')[0] }
var day = '1'; var date = day+'-'+month+'-'+year;// ==UserScript==
// @name myProgression
// @namespace unknown
// @include http://*.ogame.*/game/index.php?page=overview&amp;session=*
// @include http://*.ogame.*/game/index.php?page=*
// ==/UserScript==
var version = '1.3.1' ; // Version du script
var serveur = location.href.split('/')[2]; // recuperation du nom du
serveur
var pseudo =
document.getElementById('playerName').getElementsByClassName('textBeefy')[0].innerHTML;
// récupération du pseudo
if (navigator.userAgent.indexOf('Firefox')&gt;-1) // Identification du
navigateur
{ var FireFox = true; var nomScript='';
}
else { var FireFox = false; var nomScript='myProg';
}
//********
//__________________________
var URL='http://userscripts.org/scripts/show/84119';
var Instal ='http://userscripts.org/scripts/source/84119.user.js';
//__________________________
//------------------------
// Définition des fonctions GM_getValue et GM_setValue pour Google
Chrome
//------------------------ // Google Chrome &amp; Opéra if(!FireFox) {
function GM_getValue(key,defaultVal) // déclaration des fonctions : {
var retValue = localStorage.getItem(key+nomScript); if ( !retValue ) {
return defaultVal; } return retValue; } function GM_setValue(key,value)
{ localStorage.setItem(key+nomScript, value); } }
//*******
function insertAfter(elem, after) // @copyright Terminator By Lame
Noire
{ var dad = after.parentNode; if(dad.lastchild == after)
dad.appendChild(elem); else dad.insertBefore(elem, after.nextSibling);
} function getPMCoords() // recupere les coordonées de la PM grace à la
taille des planètes, si le diamétre est de 12.800, c'est la PM
{ // les cas où une autre planète serait de même diamétre sont très
rare, ainsi on demande confirmation à chaque changement de pseudo var
coordPM=''; var i=0; while (coordPM != '12.800') // On recherche la
planète de Diamétre 12.800 { coordPM =
document.getElementsByClassName('smallplanet')[i].innerHTML ; coordPM =
coordPM.split('km')[0].split('&gt;')[3]; i++; }
coordPM=document.getElementsByClassName('planet-koords')[i-1].innerHTML
; var res =confirm('Les coordonées de votre Planéte mère sont bien : '+
coordPM + ' ?'); // on vérifies que ce sont les bonnes if (!res) {
coordPM = prompt('Quelles sont les coordonnées de votre Planéte mère
?',coordPM); } alert('Les coordononées de votre PM seront : ' +
coordPM); GM_setValue('coord'+serveur+pseudo , coordPM);
}
function getPoints_And_Rank() // @copyright InfoCompte3 By Vulca { var
tdnode = document.getElementsByTagName('script'); var sentence1 = "<a
href="index.php?page=statistics&amp;session=%22;%0A%09%09var%20sentence2%20=%20%22%28%22;%0A%09%09var%20sentence3%20=%20%22%29%22;%0A%09%09var%20nbJoueur="
for="" (var="" ;="" i="0"><tdnode.length ;="" i++)="" {=""
pos1="(tdnode[i].innerHTML).indexOf(sentence1,10);" var=""
pos3="(tdnode[i].innerHTML).indexOf(sentence2,10);" if="" (pos1="">=0)
{ var pos2 =
(tdnode[i].innerHTML).indexOf(sentence2,pos1+sentence1.length); var
pos4 = (tdnode[i].innerHTML).indexOf(sentence3 , pos2); var points =
(tdnode[i].innerHTML).substring(pos1+sentence1.length +14,pos2); var
rank = ((tdnode[i].innerHTML).substring(pos2,pos4)); rank =
rank.split('sur')[0].split('Place')[1];
//points=parseInt(points.replace( /[^0-9-]/g, "")); var prog = new
Array(); prog.day = { points : points, rank : rank, player : pseudo, }
return prog.day; } }
}
function getDaTe() // Récupère et formate la date du jour de la forme
xx-xx-xxxx (pas de 0X mais X )
{ date =new Date(); // recup date actuelle date = date.getDate() +'-'+
(date.getMonth()+1) +'-'+ date.getFullYear(); // date formatée return
date;
}
//*******************************
function saveProg()
{ var prog = getPoints_And_Rank(); // recup point et classement var
coordPM = GM_getValue('coord'+serveur+pseudo, -1) ; // recup coord de
la PM var date= new Date(); date = date.getDate() +' - '+
(date.getMonth()+1) +' - '+ date.getFullYear() + ' à ' +
date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(); //
date actuelle formatée avec l'heure
GM_setValue('progPoints'+getDaTe()+serveur+coordPM , prog.points); //
sauvegarde points du jour
GM_setValue('progRank'+getDaTe()+serveur+coordPM , prog.rank); //
sauvegarde classement du jour
GM_setValue('progPseudo'+getDaTe()+serveur+coordPM , prog.player); //
sauvegarde pseudo du jour if (
GM_getValue('progDateEnr'+serveur+coordPM , 0) == 0 ) // si la date
d'installation n'a pas encore été définie, on la sauvegarde {
GM_setValue('progDateEnr'+serveur+coordPM , date); // sauvegarde ... }
}
//**********************
function addButton() // @Copyright Terminator By Lame Noire
{ var buttonPosition = document.getElementById("links");
if(!buttonPosition) { return; } //buttonPosition =
document.getElementById("links").getElementsByTagName("ul")[0].getElementsByTagName("li")[1];
// <span class="" menu_icon=""><img
src="http://img808.imageshack.us/img808/23/improgressioncopie.png"></span>
// URL Image :
http://img808.imageshack.us/img808/23/improgressioncopie.png var button
= document.createElement("li"); button.innerHTML = '<span
class="menu_icon"><img
src="http://img808.imageshack.us/img808/23/improgressioncopie.png"></span></tdnode.length></a><a
target="_self" accesskey="" href="%27%20+%20location.href%20+%20"
&progression="" +="" class="menubutton"><span class="textlabel">Progression</span></a>';
buttonPosition =
document.getElementById("links").getElementsByTagName("ul")[0].getElementsByTagName("li")[10];
insertAfter(button, buttonPosition);
}
//*****
function parseNB(value) // converti un nombre de la forme xxx.xxx.xxx
en xxxxxxxxx
{ var result = 0; var val=String(value); // récupération de la chaine
de caractère corespondant au param var tmp; if ( val.split('.')[1] ==
undefined) // si le nombre est inferieur à 1000 ( donc pas de .
séparateur) { result = parseInt(value); // on retourne ce nombre } else
{ for (i=0 ; i&lt;5 ; i++ ) // { if( val.split('.')[i] != undefined) //
récupération du paquet de 3 ciffres à la position i {
tmp=value.split('.')[i]; if (tmp[0] == '0') // si le nombre est de la
forme 0XX ( correction nécessaire pour éviter que parseInt() retourne 0
{ if (tmp[1] == '0') // si le nombre esy de la forme 00X { tmp=tmp[2];
} else { tmp=tmp[1]+tmp[2]; } } result = ( 1000* result) + (
parseInt(tmp) ) ; // On multiplie l'existant par 1000 et on rajoute le
paquet suivant. } } } return ( result ); }
//*******************
function MiN(tab) // calcule la valeur minimale du tableau table
{ var mini = tab[0]; for ( i=1 ; i&lt; tab.length ; i++ ) { if ( tab[i]
&lt; mini) // si le nombre actuel est inférieur au précédent minimum
... mini = tab[i]; } return ( mini ); }
//******
function MaX(tab) // calcule la valeur maximale du tableau table
{ var maxi = tab[0]; for ( i=1 ; i&lt; tab.length ; i++ ) { if ( tab[i]
&gt; maxi ) // si le nombre actuel est supérieur au précédent maximum
... maxi = tab[i]; } return ( maxi );
}
//********
function tabPoint(month,year) // Création dun tableau contenant
l'ensembles des points du mois, ceux qui n'existe pas sont remplacés
par leur suivant le plus proche, s'il n'y en a pas, par leur précédent.
{ var date = getDaTe(); var day ='1'; date = day+'-'+month+'-'+year; //
on part de la date 1-xx-xxxx var table = new Array(); var day2=day; //
initialisation de la date de secours (si à la date day il n'y pas de
donnée sauvegardée while (day &lt; (String(nbJoursM(month,year)+1)) )
// tant que l'on est pas à la fin du mois { if (
GM_getValue('progPoints'+date+serveur+coordPM , -1) == -1) // si la
donnée n'est pas sauvegardée { day2=day; while
(GM_getValue('progPoints'+date+serveur+coordPM , -1) == -1 &amp;&amp;
day2 != (String(nbJoursM(month,year)+1)) ) // tant que l'on a pas
trouvée une autre donnée valide plus loin { day2++; date =
day2+'-'+month+'-'+year; } if
(GM_getValue('progRank'+date+serveur+coordPM , -1) == -1) // si pas de
donnée trouvée plus loin, on cherche avant { day2 == day; while
(GM_getValue('progRank'+date+serveur+coordPM , -1) == -1 &amp;&amp;
day2 != '0') { day2--; date = day2+'-'+month+'-'+year; } } }
table.push(parseNB(GM_getValue('progPoints'+date+serveur+coordPM , -1))
); // ajout de la nouvelle donnée day++; date = day+'-'+month+'-'+year;
} return ( table );
}
//*******
function tabRank(month,year) // idem fonction précédente avec le
classement
{ var date = getDaTe(); var day ='1'; date = day+'-'+month+'-'+year;
var table = new Array(); var day2=day; while (day &lt;
(String(nbJoursM(month,year)+1)) ) { if (
GM_getValue('progRank'+date+serveur+coordPM , -1) == -1) { day2 = day;
while (GM_getValue('progRank'+date+serveur+coordPM , -1) == -1
&amp;&amp; day2 != (String(nbJoursM(month,year)+1))) { day2++; date =
day2+'-'+month+'-'+year; } if
(GM_getValue('progRank'+date+serveur+coordPM , -1) == -1) { day2 ==
day; while (GM_getValue('progRank'+date+serveur+coordPM , -1) == -1
&amp;&amp; day2 != '0') { day2--; date = day2+'-'+month+'-'+year; } } }
table.push(GM_getValue('progRank'+date+serveur+coordPM , -1) ); day++;
date = day+'-'+month+'-'+year; } return ( table );
}
//*******
function anBiss(year) // test si l'année est bissextile
{
var biss=false;
var an = parseInt(year); // récupération de l'année en entier
if(eval(an%4)==0) { if(eval(an%100)==0) { if(eval(an%400)==0) { biss =
true; } else { biss = false; } } else { biss = true; } }
else { biss = false; } return ( biss );
}
//******
function nbJoursM(month,year) // retourne le nombre de jour du mois
month de l'année year
{ var listeNbrJours = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31,
30, 31); if (anBiss(year)) { listeNbrJours[1]++ } return (
listeNbrJours[(parseInt(month)) -1 ] )
}
//**********************
//**** CREATION DU GRAPHIQUE DES POINTS ET CLASSEMENT
//********************** function graphM(month,year)
{ var day = nbJoursM(month,year);; // recup du nombre de jour du mois à
afficher if( getDaTe().split('-')[1] == month &amp;&amp;
getDaTe().split('-')[2] == year) // si le mois a afficher est l'actuel,
on récupère le jour actuel { day = getDaTe().split('-')[0] } var url =
'http://chart.apis.google.com/chart?chxr=0,'+parseInt(MiN(tabRank(month,year)))+','+parseInt(MaX(tabRank(month,year)))+'|1,'+MiN(tabPoint(month,year))+','+MaX(tabPoint(month,year))+'|2,1,'+day+'&amp;chxs=0,FF0000,11.5,0,lt,FF0000|1,3072F3,11.5,0,lt,3072F3&amp;chxt=r,y,x&amp;chs=666x200&amp;cht=lxy&amp;chco=3072F3,FF0000&amp;chds=1,'+day+','+MiN(tabPoint(month,year))+','+parseNB(MaX(tabPoint(month,year)))+',1,'+day+','+parseInt(MiN(tabRank(month,year)))+','+parseInt(MaX(tabRank(month,year)))+'&amp;chd=t:';
// préparation de l'url du graphique (début) for ( i=1 ; i &lt;
((parseInt(day) )+1) ; i++) // ajout des données correspondant aux
jours { url += i; if (i != day) { url += ','; } else { url+='|'; } }
var table=tabPoint(month,year) // recup du tableau des points for ( i=1
; i &lt; ((parseInt(day) )+1) ; i++) // ajout des données relatives aux
points { url += table[i-1]; if (i != day) { url += ','; } else {
url+='|'; } } for ( i=1 ; i &lt; ((parseInt(day) )+1) ; i++) // ajout
des données correspondants aux jours, encore { url += i; if (i != day)
{ url += ','; } else { url+='|'; } } var table2=tabRank(month,year) //
recup du tableau du classement for ( i=1 ; i &lt; ((parseInt(day) )+1)
; i++) // ajout des données du classement { url +=
parseInt(table2[i-1]); if (i != day) { url += ','; } } url
+='&amp;chdl=Points|Rank&amp;chdlp=b&amp;chls=2,4,1|1&amp;chma=5,5,5,25&amp;chtt=Progression&amp;chts=BB1010,11.5';
// ajout des derniers élements de l'url //result.innerHTML +='
<p align="center"><img
src="%27+url+%27/%3E%3Cbr%3E%3Ci%3EProgression%20de%20%27+convMonth2%28month%29+%27%20%27+year+%27.%3C/i%3E%3C/p%3E%27;%20//%20mise%20en%20place%20du%20graphique%20dans%20le%20bloc%20HTML%0A%09return%20%28%20url%20%29;%0A%0A%7D%09%0A%09%0A//****%0A%0Afunction%20affDet%28month,year%29%20//+affiche+le+d%E9tail+des+points+du+mois+choisis%0A%7B%0Avar+dayF+=%20parseInt%28nbJoursM%28month,year%29%29;%20//+recup+du+nombre+de+jour+du+mois+%E0+afficher%0A%09if%28+getDaTe%28%29.split%28%27-%27%29%5B1%5D+==%20month%20&amp;&amp;%20getDaTe%28%29.split%28%27-%27%29%5B2%5D%20==%20year%29%20//%20si%20le%20mois%20a%20afficher%20est%20l%27actuel,+on+r%E9cup%E8re+le+jour+actuel%0A%09%7B%0A%09%09%0A%09%09dayF+=%20getDaTe%28%29.split%28%27-%27%29%5B0%5D%0A%09%7D%0Avar%20day%20=%20%271%27;%20%0Avar%20date%20=%20day+%27-%27+month+%27-%27+year;%0Avar%20tableP%20=%20tabPoint%28month,year%29;%20//%20recup%20tableau%20points%0Avar%20tableR%20=%20tabRank%28month,year%29;%20//%20recup%20tableau%20rank%0Avar%20progPTotale%20=%20tableP%5B%20dayF-1%5D%20-%20tableP%5B0%5D;%20//%20calcul%20progression%20en%20points%0Avar%20progRTotale%20=%20tableR%5B%20dayF-1%5D%20-%20tableR%5B0%5D;%20//%20calcul%20progression%20au%20classement%0Avar%20textP=%27%27;%0Avar%20textR=%27%27;%0Aif%20%28%20progPTotale%20==%200%29%20//+affection+d%27une+couleur+diff%E9rent+selon+si+positif+%28+vert+%29++n%E9gatif+%28rouge%29+ou+nul+%28blanc%29%0A%09%7B%0A%09%09textP=%27%3Cfont%20color=white%3E%27+parseString%28progPTotale%29+%27%3C/font%3E%27;%0A%09%7D%0Aif%20%28%20progPTotale%20%3E%200%29%0A%09%7B%0A%09%09textP=%27%3Cfont%20color=green%3E+%20%27+parseString%28progPTotale%29+%27%3C/font%3E%27;%0A%09%7D%0Aif%20%28%20progPTotale%20%3C%200%29%0A%09%7B%0A%09%09textP=%27%3Cfont%20color=red%3E-%20%27+parseString%28-1*progPTotale%29+%27%3C/font%3E%27;%0A%09%7D%0Aif%20%28%20progRTotale%20==%200%29%0A%09%7B%0A%09%09textR+=%27%3Cfont%20color=white%3E%27+parseString%28progRTotale%29+%27%3C/font%3E%27;%0A%09%7D%0Aif%20%28%20progRTotale%20%3C%200%29%0A%09%7B%0A%09%09textR=%27%3Cfont%20color=green%3E+%20%27+parseString%28%28-1*%20progRTotale%29%29+%27%3C/font%3E%27;%0A%09%7D%0Aif%20%28%20progRTotale%20%3E%200%29%0A%09%7B%0A%09%09textR=%27%3Cfont%20color=red%3E-%20%27+parseString%28progRTotale%29+%27%3C/font%3E%27;%0A%09%7D%0Aif%20%28parseInt%28dayF%29%20==%201%29%0A%7B%0A%09var%20moyenneP%20=%20Math.round%28progPTotale%20/%20dayF%29;%20//%20calcul%20moyenne%20progression%20points%0A%09var%20moyenneR%20=%20progRTotale%20/%20dayF;%20//%20calcul%20moyenne%20progression%20rank%0A%7D%0A%09else%0A%7B%0A%09var%20moyenneP%20=%20Math.round%28progPTotale%20/%20%28dayF-1%29%29;%20//%20calcul%20moyenne%20progression%20points%0A%09var%20moyenneR%20=%20progRTotale%20/%20%28dayF-1%29;%20//%20calcul%20moyenne%20progression%20rank%0A%7D%0Avar%20textP2=%27%27;%0Avar%20textR2=%27%27;%0AmoyenneR%20=%20%28parseInt%28100*moyenneR%29%29/100;%0Aif%20%28%20moyenneP%20==%200%29%20//+affection+d%27une+couleur+diff%E9rent+selon+si+positif+%28+vert+%29++n%E9gatif+%28rouge%29+ou+nul+%28blanc%29%0A%09%7B%0A%09%09textP2=%27%3Cfont%20color=white%3E%27+parseString%28moyenneP%29+%27%3C/font%3E%27;%0A%09%7D%0Aif%20%28%20moyenneP%20%3E%200%29%0A%09%7B%0A%09%09textP2=%27%3Cfont%20color=green%3E+%20%27+parseString%28moyenneP%29+%27%3C/font%3E%27;%0A%09%7D%0Aif%20%28%20moyenneP%20%3C%200%29%0A%09%7B%0A%09%09textP2=%27%3Cfont%20color=red%3E-%20%27+parseString%28-1*moyenneP%29+%27%3C/font%3E%27;%0A%09%7D%0Aif%20%28%20moyenneR%20==%200%29%0A%09%7B%0A%09%09textR2=%27%3Cfont%20color=white%3E%27+moyenneR+%27%3C/font%3E%27;%0A%09%7D%0Aif%20%28%20moyenneR%20%3C%200%29%0A%09%7B%0A%09%09textR2=%27%3Cfont%20color=green%3E+%20%27+-1*%20moyenneR+%27%3C/font%3E%27;%0A%09%7D%0Aif%20%28%20moyenneR%20%3E%200%29%0A%09%7B%0A%09%09textR2=%27%3Cfont%20color=red%3E-%20%27+moyenneR+%27%3C/font%3E%27;%0A%09%7D%0Avar%20text=%27%3Cbr%3E%3Cp%20align=center%3E%3Cu%3E%3Cb%3ED%E9tails+des+points+de+%27++%20convMonth2%28month%29%20+%20%27%20%27%20+%20year%20+%27%20%3C/b%3E%3C/u%3E%3Cbr%3E%3Cbr%3E%3Cu%3EBILAN%20:%3C/u%3E%3Cbr%3E%3Cbr%3E%20%3Cu%3EPoints%20:%3C/u%3E%3Cbr%3E%27+parseString%28tableP%5B0%5D%29+%27%3Cfont%20color=red%3E-%3E%3C/font%3E%27%20+parseString%28tableP%5B%20%28dayF-1%29%5D%29+%27%20=%20%27+textP+%27%3Cbr%3E%3Cbr%3E%3Cu%3E%20Rank%20:%20%3C/u%3E%3Cbr%3E%27+tableR%5B0%5D+%27%3Cfont%20color=red%3E-%3E%3C/font%3E%27%20+tableR%5B%20dayF%20-%201%5D+%27%20=%20%27+textR+%27%3Cbr%3E%20Moyenne%20:%20%3Cbr%3E%3Cbr%3E%20Points%20:%20%27+textP2+%27%20pts/jour%20%3Cbr%3ERank%20:%20%27+textR2+%27%20place/jour%20%3Cbr%3E%20%3Cfont%20color=#cccc00%3E%3Ctable%3E%27;%0A//+D%E9but+du+bloc+HTML+des+d%E9tails+des+points+%28+titre++%20bilan%20+%20moyennes%20%29%0A%09%09while%20%28day%20%3C%20%28String%28nbJoursM%28month,year%29+1%29%29%20%29%20//+tant+que+pas+%E0+la+fin+du+mois,+ajout+des+donn%E9es+de+chaque+jour%0A%09%09%7B%0A%09%09if+%28+GM_getValue%28%27progPoints%27+date+serveur+coordPM%20,%20-1%29%20==%20-1%29%20//+si+donn%E9e+non+connue%0A%09%09%7B%0A%0A%09%09%09text+=%27%3Ctr%3E%3Ctd%3E%3Cfont%20color=red%3E%27+%20date+%20%27%3C/font%3E%3C/td%3E%20%3Ctd%3E%3Cfont%20color=red%3E%3Ci%3E-%20%27%20+%27Non+d%E9fini%3C/i%3E%3C/font%3E%3C/td%3E%3C/tr%3E%27;%0A%09%09%0A%09%09%7D%0A%09%09else%0A%09%09%7B%0A%09%09text%20+=%20%27%3Ctr%3E%3Ctd%3E%27+date%20+%20%27%3C/td%3E%20%3Ctd%3E-%20%27%20+%20GM_getValue%28%27progPoints%27+date+serveur+coordPM%20,%20-1%29%20+%27%20%3C/td%3E%3Ctd%3E%27+calcProg%28date%29.split%28%27_%27%29%5B0%5D+%27%3C/td%3E%3Ctd%3E--%20%27+%20GM_getValue%28%27progRank%27+date+serveur+coordPM%20,%20-1%29++%27%3Csup%3E%E8me%3C/sup%3E%3C/td%3E%3Ctd%3E%27+calcProg%28date%29.split%28%27_%27%29%5B1%5D+%27%3C/td%3E%3C/tr%3E%27;%0A%09%09%7D%0A%09%09day++;%0A%09%09date%20=%20day+%27-%27+month+%27-%27+year;%0A%09%09%0A%09%7D%0A%09text+=%27%3C/table%3E%3C/font%3E%27;%20//%20fin%20du%20texte%0A%09result.innerHTML%20+=%27%3Cb%3E%27+%20text+%27%3C/b%3E%3C/p%3E%27;%20//%20fin%20du%20bloc%20HTML%0A%0A%7D%0A%0A//*****%0A%0Afunction%20convMonth%28month%29%20//+Convertit+le+nom+d%27un+mois+%28Anglais%29+en+son+num%E9ro%0A%7B%0A%09var+country+=%20location.href.split%28%27ogame.%27%29%5B1%5D.split%28%27/%27%29%5B0%5D;%0A%0A%09if%20%28country%20==%20%27fr%27%29%0A%09%7B%0A%09%09switch%20%28%20month%20%29%0A%09%09%7B%0A%09%09%09case%20%27Janvier%27%20:%20return%20%271%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27Fevrier%27%20:%20return%20%272%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27Mars%27%20:%20return%20%273%27;%0A%09%09%09%09break;%09%0A%09%09%09case%20%27Avril%27%20:%20return%20%274%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27Mai%27%20:%20return%20%275%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27Juin%27%20:%20return%20%276%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27Juillet%27%20:%20return%20%277%27;%0A%09%09%09%09break;%0A%09%09%09case+%27Ao%FBt%27+:%20return%20%278%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27Septembre%27%20:%20return%20%279%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27Octobre%27%20:%20return%20%2710%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27Novembre%27%20:%20return%20%2711%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27Decembre%27%20:%20return%20%2712%27;%0A%09%09%09%09break;%0A%09%09%7D%0A%09%7D%0A%09else%0A%09%7B%0A%09%09switch%20%28%20month%20%29%0A%09%09%7B%0A%09%09%09case%20%27January%27%20:%20return%20%271%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27February%27%20:%20return%20%272%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27March%27%20:%20return%20%273%27;%0A%09%09%09%09break;%09%0A%09%09%09case%20%27April%27%20:%20return%20%274%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27May%27%20:%20return%20%275%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27June%27%20:%20return%20%276%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27July%27%20:%20return%20%277%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27August%27%20:%20return%20%278%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27September%27%20:%20return%20%279%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27October%27%20:%20return%20%2710%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27November%27%20:%20return%20%2711%27;%0A%09%09%09%09break;%0A%09%09%09case%20%27December%27%20:%20return%20%2712%27;%0A%09%09%09%09break;%0A%09%09%7D%0A%09%7D%0A%0A%7D%0A%0A//******%0A%0Afunction%20convMonth2%28month%29%20//+Convertit+le+num%E9ro+d%27un+mois+en+son+nom+%28Anglais%29%0A%7B%0A%09var+country+=%20location.href.split%28%27ogame.%27%29%5B1%5D.split%28%27/%27%29%5B0%5D;%0A%0A%09if%20%28country%20==%20%27fr%27%29%0A%09%7B%0A%09%09switch%20%28%20month%20%29%0A%09%09%7B%0A%09%09%09case%20%271%27:%20return%20%27Janvier%27;%0A%09%09%09%09break;%0A%09%09%09case%20%272%27%20:%20return%20%27Fevrier%27;%0A%09%09%09%09break;%0A%09%09%09case%20%273%27%20:%20return%20%27Mars%27;%0A%09%09%09%09break;%09%0A%09%09%09case%20%274%27%20:%20return%20%27Avril%27;%0A%09%09%09%09break;%0A%09%09%09case%20%275%27%20:%20return%20%27Mai%27;%0A%09%09%09%09break;%0A%09%09%09case%20%276%27%20:%20return%20%27Juin%27;%0A%09%09%09%09break;%0A%09%09%09case%20%277%27%20:%20return%20%27Juillet%27;%0A%09%09%09%09break;%0A%09%09%09case%20%278%27%20:+return+%27Ao%FBt%27;%0A%09%09%09%09break;%0A%09%09%09case%20%279%27%20:%20return%20%27Septembre%27;%0A%09%09%09%09break;%0A%09%09%09case%20%2710%27%20:%20return%20%27Octobre%27;%0A%09%09%09%09break;%0A%09%09%09case%20%2711%27%20:%20return%20%27Novembre%27;%0A%09%09%09%09break;%0A%09%09%09case%20%2712%27%20:%20return%20%27Decembre%27;%0A%09%09%09%09break;%0A%09%09%7D%0A%09%7D%0A%09else%0A%09%7B%0A%09%09switch%20%28%20month%20%29%0A%09%09%7B%0A%09%09%09case%20%271%27:%20return%20%27January%27;%0A%09%09%09%09break;%0A%09%09%09case%20%272%27%20:%20return%20%27February%27;%0A%09%09%09%09break;%0A%09%09%09case%20%273%27%20:%20return%20%27March%27;%0A%09%09%09%09break;%09%0A%09%09%09case%20%274%27%20:%20return%20%27April%27;%0A%09%09%09%09break;%0A%09%09%09case%20%275%27%20:%20return%20%27May%27;%0A%09%09%09%09break;%0A%09%09%09case%20%276%27%20:%20return%20%27June%27;%0A%09%09%09%09break;%0A%09%09%09case%20%277%27%20:%20return%20%27July%27;%0A%09%09%09%09break;%0A%09%09%09case%20%278%27%20:%20return%20%27August%27;%0A%09%09%09%09break;%0A%09%09%09case%20%279%27%20:%20return%20%27September%27;%0A%09%09%09%09break;%0A%09%09%09case%20%2710%27%20:%20return%20%27October%27;%0A%09%09%09%09break;%0A%09%09%09case%20%2711%27%20:%20return%20%27November%27;%0A%09%09%09%09break;%0A%09%09%09case%20%2712%27%20:%20return%20%27December%27;%0A%09%09%09%09break;%0A%09%09%7D%0A%09%7D%0A%0A%7D%0A%0A//***%0A%0Afunction%20compareDate%28month%29%20//+test+si+la+date+faite+avec+le+mois+%28+et+la+date+r%E9cup%E9r%E9e%29+pass%E9+en+param%E8tre+est+compris+entre+la+date+d%27installation+et+la+date+actuelle+%28signifie+donc+que+en+dehors+de+ces+bornes+aucune+donn%E9es+n%27existe+%29,+retourne+3+nombre+diff%E9rents+:%201=+pass%E9+,%202%20=%20futur,%20%200=Ok%0A%7B%0A%09var%20year%20=%20parseInt%28document.getElementById%28%27textYear%27%29.value%29;%20//+ann%E9e+saisie+dans+le+champs+de+texte%0A%09var+dateEnr=%20GM_getValue%28%27progDateEnr%27+serveur+coordPM%20,%20-1%29;%20//%20recup%20date%20installation%0A%09var%20yearEnr%20=+parseInt%28dateEnr.split%28%27-%27%29%5B2%5D.split%28%27+%E0%27%29%5B0%5D%29;%20//+recup+ann%E9e+instal%0A%09var+monthEnr+=%20parseInt%28dateEnr.split%28%27-%27%29%5B1%5D%29;%20//%20recup%20moins%20install%0A%09var%20monthNow%20=%20parseInt%28getDaTe%28%29.split%28%27-%27%29%5B1%5D%29;%20//%20recup%20mois%20actuel%0A%09var%20yearNow%20=%20parseInt%28getDaTe%28%29.split%28%27-%27%29%5B2%5D%29;%20//+recup+ann%E9e+actuelle%0A%09if+%28+yearEnr+%3E+year%29++//+si+l%27ann%E9e+choisie+est+avant+l%27ann%E9e+d%27install%0A%09%7B%0A%09%09return+1;%0A%09%7D%0A%09if%20%28%20yearEnr%20==%20year%20&amp;&amp;%20monthEnr%20%3E%20month%29%20//+si+c%27est+dans+l%27ann%E9e+actuelle+et+que+le+mois+choisis+est+ant%E9rieur+au+moins+d%27install%0A%09%7B%0A%09%09return+1;%0A%09%7D%0A%09if%20%28%20yearNow%20%3C%20year%20%29%20//+si+l%27ann%E9e+choisie+est+post%E9rieure+%E0+celle+actuelle%0A%09%7B%0A%09%09return+2;%0A%09%7D%0A%09if%20%28%20yearNow%20==%20year%20&amp;&amp;%20monthNow%20%3C%20month%29%20//+si+l%27ann%E9e+saisie+est+celle+en+cours+et+que+le+mois+est+apr%E8s+celui+actuel%0A%09%7B%0A%09%09return+2;%0A%09%7D%0A%09else%20//%20si%20tout%20est%20ok%0A%09%7B%0A%09%09return%200;%0A%09%7D%0A%7D%0A%0A//*******%0A%0Afunction%20detYear%28year%29%0A%7B%0A%09var%20yearNow%20=%20getDaTe%28%29.split%28%27-%27%29%5B2%5D;%0A%09var%20month%20=%20%2712%27;%0A%09if%20%28%20year%20==%20yearNow%20%29%0A%09%7B%0A%09%09month%20=%20getDaTe%28%29.split%28%27-%27%29%5B1%5D;%0A%09%7D%0A%0A%0A%7D%0A%0A//*******%0A%0Afunction%20afficher%28%29%20//+affiche+les+donn%E9es+relatives+au+mois+saisi,+d%E9clench%E9+par+le+bouton"
go="" document.getelementbyid(="" sel="" ).value="" !="------------"
month="convMonth(document.getElementById('sel').value);" mois="" }=""
year="document.getElementById('textYear').value;" année="" var=""
recup="" validité="" de="" la="" date="" if="" (=""
res="compareDate(month);" 0="" )="" si="" ok="" {=""
result.innerhtml="&lt;br&gt;&lt;br&gt;&lt;h2 align=center&gt;Progression de "
+gm_getvalue(="" progpseudo="" +getdate()+serveur+coordpm="" ,=""
-1)="" +=""></p>
</h6>
<br>
<h6 align="center"> Installé le '+dateEnr+'.</h6>
<br>
<br>
'; // affichage titre if ( document.getElementById('sel').value !=
'------------') { selectMonth.value=convMonth2(month); var
url=graphM(month,year); // affichage graphique result.innerHTML +='
<p align="center"><img src="%27+url+%27"><br>
<i>Progression de '+convMonth2(month)+' '+year+'.</i></p>
'; // mise en place du graphique dans le bloc HTML affDet(month,year);
// affichage détails du mois } else { detYear(year); } } if ( res == 1)
// si date passée { alert("Date antérieure à l'installation"); } if (
res == 2) // Si date future à celel actuelle { alert("Date future"); }
}
//****
function nextPage() // affiche les données relative au mois suivant,
idem que afficher() mais pour le mois suivant, déclanché par le bouton
&gt;&gt;
{ var month =
String(parseInt(convMonth(document.getElementById('sel').value))+1);
var year = document.getElementById('textYear').value; if (
parseInt(month) &gt; 12) { month = '1'; year =
String(parseInt(year)+1); } var res = compareDate(month); if ( res == 0
) { //alert('OK'); result.innerHTML='<br>
<br>
<h2 align="center">Progression de '
+GM_getValue('progPseudo'+getDaTe()+serveur+coordPM , -1) +'</h2>
<br>
<h6 align="center"> Installé le '+dateEnr+'.<br>
<br>
'; selectMonth.value=convMonth2(month);
document.getElementById('textYear').value=year; var
url=graphM(month,year); // affichage graphique result.innerHTML +='
<p align="center"><img src="%27+url+%27"><br>
<i>Progression de '+convMonth2(month)+' '+year+'.</i></p>
'; // mise en place du graphique dans le bloc HTML affDet(month,year);
} if ( res == 1) { alert("Date antérieure à l'installation"); } if (
res == 2) { alert("Date future"); }
}
//******
function prevPage() // affiche les données relative au mois précedant,
idem que afficher() mais pour le mois précedant, déclanché par le
bouton &lt;&lt;
{ var month =
String(parseInt(convMonth(document.getElementById('sel').value))-1);
var year = document.getElementById('textYear').value; if (
parseInt(month) &lt; 1) { month = '12'; year =
String(parseInt(year)-1); } var res = compareDate(month); if ( res == 0
) { //alert('OK'); result.innerHTML='<br>
<br>
</h6>
<h2 align="center">Progression de '
+GM_getValue('progPseudo'+getDaTe()+serveur+coordPM , -1) +'</h2>
<br>
<h6 align="center"> Installé le '+dateEnr+'.<br>
<br>
'; selectMonth.value=convMonth2(month);
document.getElementById('textYear').value=year; var
url=graphM(month,year); // affichage graphique result.innerHTML +='
<p align="center"><img src="%27+url+%27"><br>
<i>Progression de '+convMonth2(month)+' '+year+'.</i></p>
'; // mise en place du graphique dans le bloc HTML affDet(month,year);
} if ( res == 1) { alert("Date antérieure à l'installation"); } if (
res == 2) { alert("Date future"); }
}
//***
function calcProg(date) // Calcule la progression en point et
classement entre la date passée en param et la veille, formaté de la
forme " progPoint_ProgRank "
{ var text=' _ '; // texte de base si aucune opération à faire if (
parseInt(date.split('-')[0]) &gt; 1 ) // si la date est autre au
premier jour { var datePrev =
String(parseInt(date.split('-')[0])-1)+'-'+date.split('-')[1]+'-'+date.split('-')[2];
// création chaine de caractère de la date de la veille var point1 =
GM_getValue('progPoints'+datePrev+serveur+coordPM , -1); // recup
points du jour précedant var point2 =
GM_getValue('progPoints'+date+serveur+coordPM , -1); // recup points du
jour date var rank1 =
parseNB(GM_getValue('progRank'+datePrev+serveur+coordPM , -1)); //
recup rank du jour précedant var rank2 =
parseNB(GM_getValue('progRank'+date+serveur+coordPM , -1)); // recup
rank du jour date if ( point1 != -1 &amp;&amp; point2 != -1 &amp;&amp;
rank1 != -1 &amp;&amp; rank2 != -1) // si toutes les données existent {
point1 = parseNB(point1); // conversion en entier point2 =
parseNB(point2);// conversion en entier var diff = point2 - point1 ; //
calcul progression points var diffRank = parseInt(rank2) -
parseInt(rank1); // calcul progression classment if ( diff == 0) //
affection d'une couleur différent selon si positif ( vert ) négatif
(rouge) ou nul (blanc) { text='<font color="white">'+parseString(diff)+'</font>';
} if ( diff &gt; 0) { text='<font color="green">+ '+parseString(diff)+'</font>';
} if ( diff &lt; 0) { text='<font color="red">- '+parseString(-1*diff)+'</font>';
} text +='_'; // ajout séparateur if ( diffRank == 0) { text+='<font
color="white">'+parseString(diffRank)+'</font>'; } if ( diffRank &lt;
0) { text+='<font color="green">+ '+parseString((-1* diffRank))+'</font>';
} if ( diffRank &gt; 0) { text+='<font color="red">-
'+parseString(diffRank)+'</font>'; } } } return (text);
}
//****
function calcProg2(date) // Calcule la progression en point et
classement entre la date passée en param et la veille, formaté de la
forme " progPoint_ProgRank "
{ var text=' _ '; // texte de base si aucune opération à faire if (
parseInt(date.split('-')[0]) &gt; 1 ) // si la date est autre au
premier jour { var datePrev =
String(parseInt(date.split('-')[0])-1)+'-'+date.split('-')[1]+'-'+date.split('-')[2];
// création chaine de caractère de la date de la veille var point1 =
GM_getValue('progPoints'+datePrev+serveur+coordPM , -1); // recup
points du jour précedant var point2 =
GM_getValue('progPoints'+date+serveur+coordPM , -1); // recup points du
jour date var rank1 = GM_getValue('progRank'+datePrev+serveur+coordPM ,
-1); // recup rank du jour précedant var rank2 =
GM_getValue('progRank'+date+serveur+coordPM , -1); // recup rank du
jour date if ( point1 != -1 &amp;&amp; point2 != -1 &amp;&amp; rank1 !=
-1 &amp;&amp; rank2 != -1) // si toutes les données existent { point1 =
parseNB(point1); // conversion en entier point2 = parseNB(point2);//
conversion en entier var diff = point2 - point1 ; // calcul progression
points var diffRank = parseInt(rank2) - parseInt(rank1); // calcul
progression classment if ( diff == 0) // affection d'une couleur
différent selon si positif ( vert ) négatif (rouge) ou nul (blanc) {
text='[color=white]'+parseString(diff)+'[/color]'; } if ( diff &gt; 0)
{ text='[color=green]+ '+parseString(diff)+'[/color]'; } if ( diff &lt;
0) { text='[color=red]- '+parseString(-1*diff)+'[/color]'; } text
+='_'; // ajout séparateur if ( diffRank == 0) {
text+='[color=white]'+parseString(diffRank)+'[/color]'; } if ( diffRank
&lt; 0) { text+='[color=green]+ '+parseString((-1*
diffRank))+'[/color]'; } if ( diffRank &gt; 0) { text+='[color=red]-
'+parseString(diffRank)+'[/color]'; } } } return (text);
}
//****
function parseString(val) // converti un entier de la fome xxxxxx en
xxx.xxx, pour personnalisation du nombre de chiffre par paquet, il
suffit de remplacer 3 par le nombre voulu dans la ligne suivante : if (
((lg-1) - i)%3 == 0 &amp;&amp; i != (lg-1) )
{ var nb = String(val); // conversion nombre en chaine de caractère var
lg = nb.length; // recup longueur de la chaine var res=''; for ( i=0 ;
i &lt; lg ; i++) { res += nb[i]; // ajout du ième chiffre du nombre if
( ((lg-1) - i)%3 == 0 &amp;&amp; i != (lg-1) ) // ajout du séparateur
'.' si nécessaire { res +='.'; } } return res; }
//*******
function exportBBCode()
{ var month =
String(parseInt(convMonth(document.getElementById('sel').value))); var
year = document.getElementById('textYear').value; var text=
'[center][size=18][color=#009999][i]Progression de '
+GM_getValue('progPseudo'+getDaTe()+serveur+coordPM , -1)+' de
'+convMonth2(month)+' '+year+'.[/i][/color][/size] \n
[img]'+graphM(month,year)+'[/img][/center]'; var dayF =
parseInt(nbJoursM(month,year)); // recup du nombre de jour du mois à
afficher if( getDaTe().split('-')[1] == month &amp;&amp;
getDaTe().split('-')[2] == year) // si le mois a afficher est l'actuel,
on récupère le jour actuel { dayF = getDaTe().split('-')[0] }
var day = '1'; var date = day+'-'+month+'-'+year;
var tableP = tabPoint(month,year); // recup tableau points
var tableR = tabRank(month,year); // recup tableau rank
var progPTotale = tableP[ dayF-1] - tableP[0]; // calcul progression en
points
var progRTotale = tableR[ dayF-1] - tableR[0]; // calcul progression au
classement
var textP='';
var textR='';
if ( progPTotale == 0) // affection d'une couleur différent selon si
positif ( vert ) négatif (rouge) ou nul (blanc) {
textP='[color=white]'+parseString(progPTotale)+'[/color]'; }
if ( progPTotale &gt; 0) { textP='[color=green]+
'+parseString(progPTotale)+'[/color]'; }
if ( progPTotale &lt; 0) { textP='[color=red]-
'+parseString(-1*progPTotale)+'[/color]'; }
if ( progRTotale == 0) {
textR+='[color=white]'+parseString(progRTotale)+'[/color]'; }
if ( progRTotale &lt; 0) { textR='[color=green]+ '+parseString((-1*
progRTotale))+'[/color]'; }
if ( progRTotale &gt; 0) { textR='[color=red]-
'+parseString(progRTotale)+'[/color]'; }
if (parseInt(dayF) == 1)
{ var moyenneP = Math.round(progPTotale / dayF); // calcul moyenne
progression points var moyenneR = progRTotale / dayF; // calcul moyenne
progression rank
} else
{ var moyenneP = Math.round(progPTotale / (dayF-1)); // calcul moyenne
progression points var moyenneR = progRTotale / (dayF-1); // calcul
moyenne progression rank
}
var textP2='';
var textR2='';
moyenneR = (parseInt(100*moyenneR))/100;
if ( moyenneP == 0) // affection d'une couleur différent selon si
positif ( vert ) négatif (rouge) ou nul (blanc) {
textP2='[color=white]'+parseString(moyenneP)+'[/color]'; }
if ( moyenneP &gt; 0) { textP2='[color=green]+
'+parseString(moyenneP)+'[/color]'; }
if ( moyenneP &lt; 0) { textP2='[color=red]-
'+parseString(-1*moyenneP)+'[/color]'; }
if ( moyenneR == 0) { textR2='[color=white]'+moyenneR+'[/color]'; }
if ( moyenneR &lt; 0) { textR2='[color=green]+ '+-1*
moyenneR+'[/color]'; }
if ( moyenneR &gt; 0) { textR2='[color=red]- '+moyenneR+'[/color]'; }
var text2 ='\n [center][u][b]Détails des points de ' +
convMonth2(month) + ' ' + year +' [/b][/u] \n \n [u]BILAN :[/u] \n \n
[u]Points :[/u] \n '+parseString(tableP[0])+'[color=red]-&gt;[/color]'
+parseString(tableP[ (dayF-1)])+' = '+textP+'\n \n [u] Rank : [/u]\n
'+tableR[0]+'[color=red]-&gt;[/color]' +tableR[ dayF - 1]+' = '+textR+'
\n \n Moyenne : \n \n Points : '+textP2+' pts/jour \n Rank : '+textR2+'
place/jour \n [color=#cccc00]';
// Début du bloc HTML des détails des points ( titre + bilan + moyennes
) while (day &lt; (String(nbJoursM(month,year)+1)) ) // tant que pas à
la fin du mois, ajout des données de chaque jour { if (
GM_getValue('progPoints'+date+serveur+coordPM , -1) == -1) // si donnée
non connue { text2 +='[color=red]'+ date+ '[/color][color=red][i]- '
+'Non défini[/i][/color] \n '; } else { text2 += date + '-- ' +
GM_getValue('progPoints'+date+serveur+coordPM , -1) +' --
'+calcProg2(date).split('_')[0]+' -- '+
GM_getValue('progRank'+date+serveur+coordPM , -1)+
'ème'+calcProg2(date).split('_')[1]+'\n'; } day++; date =
day+'-'+month+'-'+year; } text2 +='[/color]'; // fin du texte text
+='[b]'+ text2+'[/b][/center]'; // fin du bloc HTML
//------------------------ BBCode.textContent=text; //alert('All Right
! ');
}
//-------------------------------------------------
// MISE A JOUR
//-------------------------------------------------
function checkUpDate() // Copyright Lame Noire(author)
{ GM_xmlhttpRequest( { method: 'GET', url: URL, onload:
function(answers) { var page = answers.responseText; var
versionOfScript = page.substring(page.indexOf('<b>Version</b> : ')+17,
page.length); versionOfScript = versionOfScript.substring(1,
versionOfScript.indexOf("]")); if(version != versionOfScript) {
MaJ.innerHTML = "<br>
<a href="%22+%20Instal%20+%22"><font color="orange"> Mise à jour
disponible </font></a><br>
"; } } });
} //*********************************************************
//******* SCRIPT
//*********************************************************
if ( (location.href.split('page=')[1].split('&amp;')[0]) == 'overview')
// Si on est en Vue Gé.
{ if ( GM_getValue('coord'+serveur+pseudo, -1) == -1) // Si les coord
de la PM du compte avec le pseudo donné ne sont pas connues {
getPMCoords(); }
//document.getElementsByClassName('planet-koords')[i-1].innerHTML var
nbColo=
parseInt((document.getElementById('countColonies').textContent).split('/')[0]);
var found=false; for (i=0 ; i &lt; nbColo ; i++) { var coo =
GM_getValue('coord'+serveur+pseudo, -1); if ( coo ==
document.getElementsByClassName('planet-koords')[i].innerHTML ) { found
= true; break; } } if(!found) { alert('Vous avez déplacé votre planéte
mère'); getPMCoords(); } saveProg(); // sauvegarder de la progression
du jour
}
var coordPM = GM_getValue('coord'+serveur+pseudo, -1) ; // recup coord
de la PM sauvergadées
addButton(); //ajout du bouton dans la colonne de gauche
if ( (location.href.split('&amp;')[2]) == 'Progression') // si dans la
partie 'Progression'
{ //----------- BOUTON GO var submit = document.createElement("input");
submit.setAttribute('type','submit');
submit.setAttribute('id','submit'); submit.setAttribute('value','Go');
submit.addEventListener("click", afficher, false ); //-----------
BOUTON &lt;&lt; var prev = document.createElement("input");
prev.setAttribute('type','submit'); prev.setAttribute('id','prevP');
prev.setAttribute('value','&lt;&lt;'); prev.addEventListener("click",
prevPage, false ); //----------- BOUTON &gt;&gt; var next =
document.createElement("input"); next.setAttribute('type','submit');
next.setAttribute('id','nextP'); next.setAttribute('value','&gt;&gt;');
next.addEventListener("click", nextPage, false ); //----------- CHAMP
DE SAISIE DU MOIS ( LISTE DEFILANTE ) var selectMonth =
document.createElement("select");
selectMonth.setAttribute('name','month'); var country =
location.href.split('ogame.')[1].split('/')[0]; if (country == 'fr') {
selectMonth.innerHTML =
'JanvierFevrierMarsAvrilMaiJuinJuilletAoûtSeptembreOctobreNovembreDecembre------------';
} else { selectMonth.innerHTML =
'JanuaryFebruaryMarchAprilMayJuneJulyAugustSeptemberOctoberNovemberDecember------------';
} selectMonth.setAttribute('id','sel');
selectMonth.value=convMonth2(getDaTe().split('-')[1]); //----------- //
CHAMP DE SAISIE DE L'ANNÉE var textYear =
document.createElement("input"); textYear.setAttribute('type','text');
textYear.setAttribute('id','textYear');
textYear.setAttribute('value',getDaTe().split('-')[2]); //-----------
var dateEnr=GM_getValue('progDateEnr'+serveur+coordPM , -1); // recup
date installation //----------- ELEMENT HTML COMPORTANT LE GRAPHIQUE ET
LES DETAILS var result = document.createElement('div');
result.setAttribute('id','textProg'); result.innerHTML = '<br>
<br>
</h6>
<h2 align="center">Progression de '
+GM_getValue('progPseudo'+getDaTe()+serveur+coordPM , -1) +'</h2>
<br>
<h6 align="center"> Installé le '+dateEnr+'.<br>
<br>
'; //----------- BOUTON EXPORT BBCode var exportBB =
document.createElement("div"); exportBB.addEventListener("click",
exportBBCode, false ); exportBB.innerHTML='<br>
<p align="center"> &gt;&gt; Export BBCode &lt;&lt; </p>
'; //----------- TEXTAREA CONTENANT LE BBCODE var BBCode =
document.createElement('textarea'); BBCode.setAttribute("cols",83);
BBCode.setAttribute("rows",10); var
url=graphM(getDaTe().split('-')[1],getDaTe().split('-')[2]); //
affichage par défaut du graph du mois en cours result.innerHTML +='
<p align="center"><img src="%27+url+%27"><br>
<i>Progression de '+convMonth2(getDaTe().split('-')[1])+'
'+getDaTe().split('-')[2]+'.</i></p>
'; // mise en place du graphique dans le bloc HTML
affDet(getDaTe().split('-')[1],getDaTe().split('-')[2]); // affichage
des détails du mois en cours
document.getElementById('inhalt').innerHTML=''; // on efface le contenu
central de la page
//*** TEXTE PRECEDANT LES CHAMPS DE SAISIE (LEGENDE)
var text1 = document.createElement('div');
result.setAttribute('id','text1');
text1.innerHTML='<font size="1">----Month: --------------- Year-------
Submit-Prev-Next</font>';
document.getElementById('inhalt').insertBefore(text1,
document.getElementById('planet')); // Affichage de la légende des
champs de saisie
document.getElementById('inhalt').insertBefore(selectMonth,
document.getElementById('textProg')); // Affichage de la liste
défilantes des mois
document.getElementById('inhalt').insertBefore(textYear,
document.getElementById('textProg')); // Affichage du champ de saisie
de l'année document.getElementById('inhalt').insertBefore(submit,
document.getElementById('textProg')); // Affichage du bouton GO
document.getElementById('inhalt').insertBefore(prev,
document.getElementById('textProg')); // Affichage du bouton &lt;&lt;
document.getElementById('inhalt').insertBefore(next,
document.getElementById('textProg')); // Affichage du bouton &gt;&gt;
document.getElementById('inhalt').insertBefore(result,
document.getElementById('planet')); // Affichage du texte
document.getElementById('inhalt').insertBefore(exportBB,
document.getElementById('textProg')); // Affichage du bouton d'export
document.getElementById('inhalt').insertBefore(BBCode,
document.getElementById('textProg'));
//*********** MISE A JOUR **************// var MaJ =
document.createElement("div"); // création d'un élément HTML
MaJ.setAttribute("style","font-weight:bold;"); // Affectation des
attributs : Gras document.getElementById('inhalt').insertBefore(MaJ,
document.getElementById('textProg')); // On l'affiche entre la page
galaxie et le pied de page. //MaJ.innerHTML = '<font color="orange">Test</font>';
checkUpDate();
}
var tableP = tabPoint(month,year); // recup tableau points
var tableR = tabRank(month,year); // recup tableau rank
var progPTotale = tableP[ dayF-1] - tableP[0]; // calcul progression en
points
var progRTotale = tableR[ dayF-1] - tableR[0]; // calcul progression au
classement
var textP='';
var textR='';
if ( progPTotale == 0) // affection d'une couleur différent selon si
positif ( vert ) négatif (rouge) ou nul (blanc) {
textP='[color=white]'+parseString(progPTotale)+'[/color]'; }
if ( progPTotale &gt; 0) { textP='[color=green]+
'+parseString(progPTotale)+'[/color]'; }
if ( progPTotale &lt; 0) { textP='[color=red]-
'+parseString(-1*progPTotale)+'[/color]'; }
if ( progRTotale == 0) {
textR+='[color=white]'+parseString(progRTotale)+'[/color]'; }
if ( progRTotale &lt; 0) { textR='[color=green]+ '+parseString((-1*
progRTotale))+'[/color]'; }
if ( progRTotale &gt; 0) { textR='[color=red]-
'+parseString(progRTotale)+'[/color]'; }
if (parseInt(dayF) == 1)
{ var moyenneP = Math.round(progPTotale / dayF); // calcul moyenne
progression points var moyenneR = progRTotale / dayF; // calcul moyenne
progression rank
} else
{ var moyenneP = Math.round(progPTotale / (dayF-1)); // calcul moyenne
progression points var moyenneR = progRTotale / (dayF-1); // calcul
moyenne progression rank
}
var textP2='';
var textR2='';
moyenneR = (parseInt(100*moyenneR))/100;
if ( moyenneP == 0) // affection d'une couleur différent selon si
positif ( vert ) négatif (rouge) ou nul (blanc) {
textP2='[color=white]'+parseString(moyenneP)+'[/color]'; }
if ( moyenneP &gt; 0) { textP2='[color=green]+
'+parseString(moyenneP)+'[/color]'; }
if ( moyenneP &lt; 0) { textP2='[color=red]-
'+parseString(-1*moyenneP)+'[/color]'; }
if ( moyenneR == 0) { textR2='[color=white]'+moyenneR+'[/color]'; }
if ( moyenneR &lt; 0) { textR2='[color=green]+ '+-1*
moyenneR+'[/color]'; }
if ( moyenneR &gt; 0) { textR2='[color=red]- '+moyenneR+'[/color]'; }
var text2 ='\n [center][u][b]Détails des points de ' +
convMonth2(month) + ' ' + year +' [/b][/u] \n \n [u]BILAN :[/u] \n \n
[u]Points :[/u] \n '+parseString(tableP[0])+'[color=red]-&gt;[/color]'
+parseString(tableP[ (dayF-1)])+' = '+textP+'\n \n [u] Rank : [/u]\n
'+tableR[0]+'[color=red]-&gt;[/color]' +tableR[ dayF - 1]+' = '+textR+'
\n \n Moyenne : \n \n Points : '+textP2+' pts/jour \n Rank : '+textR2+'
place/jour \n [color=#cccc00]';
// Début du bloc HTML des détails des points ( titre + bilan + moyennes
) while (day &lt; (String(nbJoursM(month,year)+1)) ) // tant que pas à
la fin du mois, ajout des données de chaque jour { if (
GM_getValue('progPoints'+date+serveur+coordPM , -1) == -1) // si donnée
non connue { text2 +='[color=red]'+ date+ '[/color][color=red][i]- '
+'Non défini[/i][/color] \n '; } else { text2 += date + '-- ' +
GM_getValue('progPoints'+date+serveur+coordPM , -1) +' --
'+calcProg2(date).split('_')[0]+' -- '+
GM_getValue('progRank'+date+serveur+coordPM , -1)+
'ème'+calcProg2(date).split('_')[1]+'\n'; } day++; date =
day+'-'+month+'-'+year; } text2 +='[/color]'; // fin du texte text
+='[b]'+ text2+'[/b][/center]'; // fin du bloc HTML
//------------------------ BBCode.textContent=text; //alert('All Right
! ');
}
//-------------------------------------------------
// MISE A JOUR
//-------------------------------------------------
function checkUpDate() // Copyright Lame Noire(author)
{ GM_xmlhttpRequest( { method: 'GET', url: URL, onload:
function(answers) { var page = answers.responseText; var
versionOfScript = page.substring(page.indexOf('<b>Version</b> : ')+17,
page.length); versionOfScript = versionOfScript.substring(1,
versionOfScript.indexOf("]")); if(version != versionOfScript) {
MaJ.innerHTML = "<br>
<a href="%22+%20Instal%20+%22"><font color="orange"> Mise à jour
disponible </font></a><br>
"; } } });
} //*********************************************************
//******* SCRIPT
//*********************************************************
if ( (location.href.split('page=')[1].split('&amp;')[0]) == 'overview')
// Si on est en Vue Gé.
{ if ( GM_getValue('coord'+serveur+pseudo, -1) == -1) // Si les coord
de la PM du compte avec le pseudo donné ne sont pas connues {
getPMCoords(); }
//document.getElementsByClassName('planet-koords')[i-1].innerHTML var
nbColo=
parseInt((document.getElementById('countColonies').textContent).split('/')[0]);
var found=false; for (i=0 ; i &lt; nbColo ; i++) { var coo =
GM_getValue('coord'+serveur+pseudo, -1); if ( coo ==
document.getElementsByClassName('planet-koords')[i].innerHTML ) { found
= true; break; } } if(!found) { alert('Vous avez déplacé votre planéte
mère'); getPMCoords(); } saveProg(); // sauvegarder de la progression
du jour
}
var coordPM = GM_getValue('coord'+serveur+pseudo, -1) ; // recup coord
de la PM sauvergadées
addButton(); //ajout du bouton dans la colonne de gauche
if ( (location.href.split('&amp;')[2]) == 'Progression') // si dans la
partie 'Progression'
{ //----------- BOUTON GO var submit = document.createElement("input");
submit.setAttribute('type','submit');
submit.setAttribute('id','submit'); submit.setAttribute('value','Go');
submit.addEventListener("click", afficher, false ); //-----------
BOUTON &lt;&lt; var prev = document.createElement("input");
prev.setAttribute('type','submit'); prev.setAttribute('id','prevP');
prev.setAttribute('value','&lt;&lt;'); prev.addEventListener("click",
prevPage, false ); //----------- BOUTON &gt;&gt; var next =
document.createElement("input"); next.setAttribute('type','submit');
next.setAttribute('id','nextP'); next.setAttribute('value','&gt;&gt;');
next.addEventListener("click", nextPage, false ); //----------- CHAMP
DE SAISIE DU MOIS ( LISTE DEFILANTE ) var selectMonth =
document.createElement("select");
selectMonth.setAttribute('name','month'); var country =
location.href.split('ogame.')[1].split('/')[0]; if (country == 'fr') {
selectMonth.innerHTML =
'JanvierFevrierMarsAvrilMaiJuinJuilletAoûtSeptembreOctobreNovembreDecembre------------';
} else { selectMonth.innerHTML =
'JanuaryFebruaryMarchAprilMayJuneJulyAugustSeptemberOctoberNovemberDecember------------';
} selectMonth.setAttribute('id','sel');
selectMonth.value=convMonth2(getDaTe().split('-')[1]); //----------- //
CHAMP DE SAISIE DE L'ANNÉE var textYear =
document.createElement("input"); textYear.setAttribute('type','text');
textYear.setAttribute('id','textYear');
textYear.setAttribute('value',getDaTe().split('-')[2]); //-----------
var dateEnr=GM_getValue('progDateEnr'+serveur+coordPM , -1); // recup
date installation //----------- ELEMENT HTML COMPORTANT LE GRAPHIQUE ET
LES DETAILS var result = document.createElement('div');
result.setAttribute('id','textProg'); result.innerHTML = '<br>
<br>
</h6>
<h2 align="center">Progression de '
+GM_getValue('progPseudo'+getDaTe()+serveur+coordPM , -1) +'</h2>
<br>
<h6 align="center"> Installé le '+dateEnr+'.<br>
<br>
'; //----------- BOUTON EXPORT BBCode var exportBB =
document.createElement("div"); exportBB.addEventListener("click",
exportBBCode, false ); exportBB.innerHTML='<br>
<p align="center"> &gt;&gt; Export BBCode &lt;&lt; </p>
'; //----------- TEXTAREA CONTENANT LE BBCODE var BBCode =
document.createElement('textarea'); BBCode.setAttribute("cols",83);
BBCode.setAttribute("rows",10); var
url=graphM(getDaTe().split('-')[1],getDaTe().split('-')[2]); //
affichage par défaut du graph du mois en cours result.innerHTML +='
<p align="center"><img src="%27+url+%27"><br>
<i>Progression de '+convMonth2(getDaTe().split('-')[1])+'
'+getDaTe().split('-')[2]+'.</i></p>
'; // mise en place du graphique dans le bloc HTML
affDet(getDaTe().split('-')[1],getDaTe().split('-')[2]); // affichage
des détails du mois en cours
document.getElementById('inhalt').innerHTML=''; // on efface le contenu
central de la page
//*** TEXTE PRECEDANT LES CHAMPS DE SAISIE (LEGENDE)
var text1 = document.createElement('div');
result.setAttribute('id','text1');
text1.innerHTML='<font size="1">----Month: --------------- Year-------
Submit-Prev-Next</font>';
document.getElementById('inhalt').insertBefore(text1,
document.getElementById('planet')); // Affichage de la légende des
champs de saisie
document.getElementById('inhalt').insertBefore(selectMonth,
document.getElementById('textProg')); // Affichage de la liste
défilantes des mois
document.getElementById('inhalt').insertBefore(textYear,
document.getElementById('textProg')); // Affichage du champ de saisie
de l'année document.getElementById('inhalt').insertBefore(submit,
document.getElementById('textProg')); // Affichage du bouton GO
document.getElementById('inhalt').insertBefore(prev,
document.getElementById('textProg')); // Affichage du bouton &lt;&lt;
document.getElementById('inhalt').insertBefore(next,
document.getElementById('textProg')); // Affichage du bouton &gt;&gt;
document.getElementById('inhalt').insertBefore(result,
document.getElementById('planet')); // Affichage du texte
document.getElementById('inhalt').insertBefore(exportBB,
document.getElementById('textProg')); // Affichage du bouton d'export
document.getElementById('inhalt').insertBefore(BBCode,
document.getElementById('textProg'));
//*********** MISE A JOUR **************// var MaJ =
document.createElement("div"); // création d'un élément HTML
MaJ.setAttribute("style","font-weight:bold;"); // Affectation des
attributs : Gras document.getElementById('inhalt').insertBefore(MaJ,
document.getElementById('textProg')); // On l'affiche entre la page
galaxie et le pied de page. //MaJ.innerHTML = '<font color="orange">Test</font>';
checkUpDate();
}
</h6>
</body>
</html>
