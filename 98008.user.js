// ==UserScript==
// @name           RaidConverter
// @namespace      vulca
// @version        1.0
// @description   To convert OGame combat report with only one click
// @include        http://*ogame.*/game/index.php?page=showmessage*
// ==/UserScript==

if (document.getElementById('battlereport')) // Si c'est un RC
{
	var idRC = document.getElementById('shortreport').getElementsByClassName('textCenter next')[0].innerHTML.split('nID=')[1].split("','CombatReport")[0];
	var urlRC = location.href.split('&msg_id=')[0].replace('showmessage', 'combatreport')+'&nID='+idRC;
				
	var xdr = new XMLHttpRequest(); 
	xdr.onload = function() 
	{
		var aff = '<form name="upraid" action="http://vulca.projet-alternative.fr/infoCompte/index.php?page=upraid"  target="upraid" method="post">';
		var pseudo = document.getElementsByClassName('infohead')[0].getElementsByTagName('td')[1].innerHTML;
				
				
		aff+= '<textarea style="display:none;" name="export_raid" >'+xdr.responseText.split('<body id="combatreport">')[1]+'</textarea>';
		aff+= '<textarea style="display:none;"  name="pseudo" >'+pseudo+'</textarea><textarea style="display:none;"  name="serveur" >'+location.href.split('/')[2]+'</textarea>';
		aff+= '<img title="RCConv" style="position:absolute;left:3px;top:3px;cursor:pointer;" onclick="document.forms[\'upraid\'].submit();" src="http://vulca.projet-alternative.fr/images/cle.gif" ></form>';
							
		var newElement2 = document.createElement("span"); // On crée un nouvelle élément div
		newElement2.innerHTML =aff;
		document.getElementById('contentPageNavi').appendChild(newElement2); // On l'affiche
						
	}							
	xdr.open("GET",urlRC);
	xdr.send();
}
			
	