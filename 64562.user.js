// ==UserScript==
// @name           SI - convertir les RC en BBcode
// @namespace      SpaceInvasion
// @description   Convertisseur de RC en BBcode pour SpaceInvasion 
// @version       0.1
// @date          19-12-2009
// @include        *.spaceinvasion.*/indexInternal.es?action=internalBattleReport*
// @include        http://spaceinvasion.*/indexInternal.es?action=internalBattleReport*
// ==/UserScript==

function BattleReport() { 


MyRC = document.getElementsByTagName("div")[0].innerHTML ;
MyRC = MyRC.replace(/<table border=\"0\" cellpadding=\"4\" cellspacing=\"0\">/g, '[table border=1]');
MyRC = MyRC.replace(/<td class=\"nachricht\">/g, '[td]');
MyRC = MyRC.replace(/<th class=\"rahmen\" width=\"50\">/g, '[td width=50]');
MyRC = MyRC.replace(/<th class=\"rahmen\">/g, '[td]');
MyRC = MyRC.replace(/<a class=\"bau\">/g, ''); 
MyRC = MyRC.replace(/<hr width=\"50%\">/g, ''); 
MyRC = MyRC.replace(/<b><font color=\"red\">/g, '[b][color=#ff0000]');  
MyRC = MyRC.replace(/<font color=\"#cc9900\">/g, '[color=#cc9900]');
MyRC = MyRC.replace(/<\/font>/g, '[/color]'); 
MyRC = MyRC.replace(/<\/b>/g, '[/b]'); 
MyRC = MyRC.replace(/<\/td>/g, '[/td]');
MyRC = MyRC.replace(/<\/th>/g, '[/td]');
MyRC = MyRC.replace(/<tr>/g, '[tr]');
MyRC = MyRC.replace(/<\/tr>/g, '[/tr]');
MyRC = MyRC.replace(/<\/table>/g, '[/table]');
MyRC = MyRC.replace(/<tbody>/g, '');
MyRC = MyRC.replace(/<\/tbody>/g, '');
MyRC = MyRC.replace(/<br>&nbsp;<br>/g, '\n');
MyRC = MyRC.replace(/]<br>/g, ']\n');
MyRC = MyRC.replace(/<br>/g, '');
MyRC = MyRC.replace(/<\/a>/g, ''); 
MyRC = MyRC.replace(/&nbsp;/g, ' '); 
MyRC = MyRC.replace(/&/g, '&amp;'); 
MyRC = MyRC.replace(/</g, '&lt;'); 
MyRC = MyRC.replace(/>/g, '&gt;'); 
MyRC = MyRC.replace(/\t/g, ''); 

        xtb0 = document.createElement("div");
	xtb0.innerHTML = '<form action="noaction"><center><textarea id="bbcode" cols="80" rows="6">[center]'+MyRC+'[/center]</textarea><br /><br /><input type="button"  class="planet" value="Sélectionner tout le bbCode" onClick="javascript:bbcode.focus();bbcode.select();">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input  class="planet" type="button" value="Fermer" onClick="self.close()" name="button"></center></form>' ;

 	insertAfter(xtb0, document.getElementsByTagName("div")[0]);  

}

function insertAfter(newNode, node) {return node.parentNode.insertBefore(newNode, node.nextSibling);}
BattleReport();
