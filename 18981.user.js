// ==UserScript==
// @name Classement OGame.fr
// @description Ajout d'un lien pour visualiser la progression d'un joueur grace aux "Classement OGame.fr" [http://www.classement-ogame.info/]
// @include http://uni*.ogame.*/*
// ==/UserScript==

url=location.href;
//===========================
//Variable
//===========================
var egrave = String.fromCharCode(232);
	var deuxpts = String.fromCharCode(58);
	const cnst_ranking = ' class�  ';
const cnst_posicion = ' class�e  ';
	
function getElementsByClassName(clsName, htmltag, what)
				{
					var arr = new Array();
					var elems = document.getElementsByTagName(htmltag);
					var mmm = 0;
					for (var i = 0; i < elems.length; i++)
					{
						if (elems[i].className == clsName)
						{
							if (elems[i].getAttribute('onmouseover', 0).indexOf(what) + 1)
							{
								arr[mmm] = elems[i];
								mmm++;
							}
						}
					}
					return arr;
				}
		function trim(string){
	return string.replace(/(^\s*)|(\s*$)/g,'');
}		

//===========================
// Nom de Serveur
//===========================
function GetServerName(){
	var ServerName = "";
	var sentenceIni = window.location.href;
	var sentence1 = "http://";
	var sentence2 = "/game/";
	var pos1 = sentenceIni.indexOf(sentence1,0);
	if (pos1 >= 0 ){
		var pos2 = sentenceIni.indexOf(sentence2,pos1+sentence1.length);
		ServerName = sentenceIni.substring(pos1+sentence1.length,pos2);
	}
	//alert(ServerName);
	return ServerName;
}
	function GetUniverse(){
	var ServerName = "";
	var sentenceIni = window.document.URL;
	var sentence1 = "http://uni";
	var sentence2 = ".ogame";
	var pos1 = sentenceIni.indexOf(sentence1,0);
	if (pos1 >= 0 ){
		var pos2 = sentenceIni.indexOf(sentence2,pos1+sentence1.length);
		Universe = sentenceIni.substring(pos1+sentence1.length,pos2);
	}
	return Universe;
}
var tdnode = document.getElementsByTagName('td');
	var f=0;
	while (f<tdnode.length){
		f++;
	}
//===========================
//Statiqtique
//===========================
if ((url.indexOf('/game/index.php?page=stat',0))>=0) { 
var optionnode = document.getElementsByTagName('option');
	var f=0;
	while (f<optionnode.length){
				f++;
		}
			var trnode = document.getElementsByTagName('tr');
			var j = 0;
			while (j<trnode.length){
				var thnode = trnode[j].getElementsByTagName('th');
				if (thnode.length==5){
					//===============================================
					// ajout d'un lien vers classement OGame.fr
					//===============================================
					PlayerName = thnode[1].innerHTML;
					PlayerName = PlayerName.replace("> ",">");
					PlayerName = PlayerName.replace("> ",">");
					PlayerName = PlayerName.replace('<font color="lime">','');
					PlayerName = PlayerName.replace('</font>','');
					PlayerName = PlayerName.replace('<font color="#87ceeb">','');
					PlayerName = PlayerName.replace('</font>','');
					PlayerName = PlayerName.replace('<a name="SELF" style="color'+deuxpts+' lime;">','');
					PlayerName = PlayerName.replace('<a name="SELF" style="color'+deuxpts+' rgb(135, 206, 235);">','');
					PlayerName = PlayerName.replace('</a>','');
					PlayerName = PlayerName.replace(' ','+');
					PlayerName = trim(PlayerName);
					//alert(PlayerName);
					thnode[2].innerHTML += '<a href="http://www.classement-ogame.info/?view=detail_joueur&pseudo='+escape(PlayerName)+'&uni='+GetUniverse()+'" target="Hauptframe"><img src="http://img144.imageshack.us/img144/5875/icongrowthog3.gif" alt="Evolution" border="0" width="13" Height="11"></a>';
				}
				j++;
			}
}