// ==UserScript==
// @name           ACSBefrog
// @namespace      Befrog
// @description    Vote ACS
// @include        http://board.ogame.fr/thread.php*
// ==/UserScript==

/*
Credits : http://www.codyx.org/snippet_compter-nombre-occurrence-chaine-dans-autre_158.aspx
*/

/*
A utiliser pour décompter les voix pour la mise en place de l'ACS.

Attention, ce script est très (trop?) rigoureux pour le contrôle des votes.
Il nécessite des votes rédigés selon les spécifications demandées par Lios dans le message initial des votes.
Toute vote n'utilisant pas exactement le même modèle que celui proposé dans le règlement des votes ne sera pas compté.

Ce script n'a rien d'officiel.
Il n'est en aucun cas utilisable pour déterminer ou valider le nombre de votes pour la mise en place de l'ACS.

utilisation :

Naviguez simplement sur les pages des votes. Le script se charge de décompter les voix et les affiche en haut de l'écran.
Le nombre de votes mal rédigés s'affiche en rouge clignotant.

*/
/*
V1.5 ?
Ajout d'une automatisation : cumul + changement de page en un seul clic.
V1.1
Commentaire du code.
Initialisation des variables la premiere fois.
V 1.0
Premiere version diffusée
*/

// Images stockées en base64
var Calc_ImgPlus = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAAAALXIZLJUeRrg+UK0kZ7BS/fn7/fv5/v7+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAukjn5wAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAABrSURBVChTXY8BDsAgCAO1oPL/D7OWqVlWE0jKQWrLn1omPspsCbdxH2iYU4LUnYYPGWvJsDKEYIaMUUbxEZ11E5gzSoRqhePSvARpjoF+VniFN5yJ3hWDdRHs+8bJboewKxGMakpbRZ/76QFbXUKL4hRORQAAAABJRU5ErkJggg%3D%3D';
var Calc_RstImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAAAALXIZLJUeK8cDTow7UK0kZts4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAq4F56gAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAABqSURBVChTNU5RFgBBBCLD/W9sC9uHqaY81kQcxE26CI1YI0oBxUjGWDbFrYjeIhoRUHURYAJV+CWZoSL5IZAGDJkJnEMq45QyNDic6HaHp3Ops0MyzxhD/ddzmOdT4vH/Lr0d0nv6YGT3B0IBcGUSd8GkAAAAAElFTkSuQmCC';

// récupération du code source de la page
var temp = document.body.innerHTML;
//verifie si on est dans la section vote (pas trés rigoureux), reste a améliorer.
var SectionVote = (new RegExp('board.php.boardid.798',"g")).test(temp);

// opération permettant d'initialiser les variables a l'installation.
if (GM_getValue("install")=="ok") { 
}
else { 
GM_setValue("install","ok");
	GM_setValue("CalcP",0);
	GM_setValue("CalcO",0);
	GM_setValue("CalcN",0);
	GM_setValue("CalcX",0);
}



if (SectionVote) { // test forum votes
//recupére la page actuelle du topic
var PageActuelle = (new RegExp("&page=(.*)","g")).exec(document.URL);
if (PageActuelle) { PageActuelle = PageActuelle[1];}
else { PageActuelle = 1;}
//récupére le numero du sujet. Inutilisé pour l'instant.
//var SujetVote = ((new RegExp("threadid=([0-9]*)","g")).exec(document.URL))[1];
// récupére le nombre de messages postés dans la page courante.
var NbreMessages = substr_count( temp, 'Prochain niveau :');
//récupére le nombre de OUI et de NON dans la page (ecrits selon les dispositions du reglement)
var NbOui = substr_count(temp,'<span style="color: limegreen;"><b>OUI</b></span>');
var NbNon = substr_count(temp,'<span style="color: red;"><b>NON</b></span>');

//lance l'affichage du boitier d'info et de la calculette de cumul
AfficheVotes(PageActuelle,NbOui,NbNon);
Calc_Display();
}// fin test forum votes

// fonction trés utile qui va nous permettre d'obtenir l'occurence d'un motif "needle" dans une chaine "haystack"
function substr_count( haystack, needle) {
    var pos = 0, cnt = 0;
    offset = 0;
    length = 0;
    offset--;
    while( (offset = haystack.indexOf(needle, offset+1)) != -1 ){
		if(length > 0 && (offset+needle.length) > length){
            return false;
        } 
		else{
            cnt++;
        }
    }
    return cnt;
}

// fonction qui affiche le resultat des votes pour la page actuelle.
function AfficheVotes(Page,Oui,Non) {
	var Defauts = NbreMessages - Oui - Non;
	if (Page==1) {Defauts = Defauts-1;}
	var tableau = document.createElement("txt");
	var Affichage = '<table id="votes" style="z-index : 9999;position: fixed; right : 50%; top : 0px;"><tr>';
	Affichage += '<table><tr>';
	Affichage += '<td name="Page" class="page">P'+Page+'</td><td name="NbX" class="nuls">'+Defauts+'</td></tr><tr>';
	Affichage += '<td class="voteO">Oui</td>';
	Affichage += '<td name="NbO" class="voteO">'+Oui+'</td>';
	Affichage += '</tr><tr>';
	Affichage += '<td class="voteN">Non</td>';
	Affichage += '<td name="NbN" class="voteN">'+Non+'</td>';
	Affichage += '</tr><tr>';
	Affichage += '<td colspan="2" name="Ajouter" style="text-align : center;"><img src="'+Calc_ImgPlus+'"></td>';
	Affichage += '</tr></table>';
	tableau.innerHTML = Affichage;

	document.body.insertBefore(tableau,document.body.firstChild);
	GM_addStyle('body > txt {border : 1px grey solid; -moz-border-radius : 5px;background : #4C4C4C; opacity : 0.9;z-index : 9999;position: fixed; left : 30%; top : 5px;} .voteO{text-align:center;font-size:14px;color : #FFEB6C;font-weight : bold;} .voteN{text-align:center;font-size:14px; color : #FFFFFF;font-weight : bold;} .page {color: black; font-weight : bold;} .nuls {color : red; text-decoration : blink;}');
	
	var temp = document.getElementsByName("Ajouter")[0];
	temp.addEventListener("click",Calc_Add,false);
}

// fonction permettant de cumuler les votes page apres page, et de garder en memoire la derniere page visitée.
function Calc_Add() {
	var page = document.getElementsByName("Page")[0].innerHTML;
	var Oui = parseInt(document.getElementsByName("NbO")[0].innerHTML)+parseInt(GM_getValue("CalcO"));
	var Non = parseInt(document.getElementsByName("NbN")[0].innerHTML)+parseInt(GM_getValue("CalcN"));
	var Nuls = parseInt(document.getElementsByName("NbX")[0].innerHTML)+parseInt(GM_getValue("CalcX"));
	GM_setValue("CalcP",page);
	GM_setValue("CalcO",Oui);
	GM_setValue("CalcN",Non);
	GM_setValue("CalcX",Nuls);
	Calc_Refresh();
}

//fonction permettant d'afficher la calculette cumul, avec les valeurs cumulées connues.
function Calc_Display() {
	var Calculette = document.createElement("th");
	var Affichage = '<table><tr class="Ligne1"><td colspan="3">Cumul</td><td name="reset"><img src="'+Calc_RstImage+'"></td></tr><tr class="Ligne1">';
	Affichage += '<td>Oui</td><td>Non</td><td>Last</td><td>Nuls</td>';
	Affichage += '<tr></tr>';
	Affichage += '<td class="voteO" name="CalcO">'+GM_getValue("CalcO")+'</td>';
	Affichage += '<td class="voteN" name="CalcN">'+GM_getValue("CalcN")+'</td>';
	Affichage += '<td class="page" name="CalcP">'+GM_getValue("CalcP")+'</td>';
	Affichage += '<td class="nuls" name="CalcX">'+GM_getValue("CalcX")+'</td>';
	Affichage += '<td></td>';
	Affichage += '</tr></table>';
	Calculette.innerHTML = Affichage;
	
	document.body.insertBefore(Calculette,document.body.firstChild);
	GM_addStyle('body > th {border : 1px grey solid;-moz-border-radius : 5px;background : #4C4C4C; opacity : 0.9;z-index : 9999;position: fixed; left : 40%; top : 5px;} .Ligne1 td{ font-size: 14px;color : black; font-weight : normal;}');

	var Calc_Button = document.getElementsByName("reset")[0];
	Calc_Button.addEventListener("click",Calc_Reset,false);
}

function Calc_Reset() {
	GM_setValue("CalcP",0);
	GM_setValue("CalcO",0);
	GM_setValue("CalcN",0);
	GM_setValue("CalcX",0);
	Calc_Refresh();
}
function Calc_Refresh() {
	document.getElementsByName("CalcO")[0].innerHTML = GM_getValue("CalcO");
	document.getElementsByName("CalcN")[0].innerHTML = GM_getValue("CalcN");
	document.getElementsByName("CalcP")[0].innerHTML = GM_getValue("CalcP");
	document.getElementsByName("CalcX")[0].innerHTML = GM_getValue("CalcX");
}

