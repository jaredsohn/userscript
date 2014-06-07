// ==UserScript==
// @name           Staemme-Berichte-Erweiterung
// @namespace      Jodli (momentan auf Welt 19)
// @description    Durch anklicken der Uhrzeit eines Berichtes, in der �bersicht der Berichte, wird dieser bericht und alle weiteren mit demselben Titel markiert, wodurch (zB) Farmberichte sofort hervorstechen und durch einen Klick gel�scht werden k�nnen. Der rote Button bei jedem Bericht l�scht diesen sofort (kleine Funktion, durch die ein Bericht mit nur einem Klick, anstatt 2 gel�scht werden kann). Kritik, Lob und Anregungen sind immer gerne gesehen. W�re erfreut, wenn mein Name in dem Script erhalten bleibt
// @include        http://*.die-staemme.de/game.php*screen=report*
// ==/UserScript==

/*
Dieser Scriptteil, wurde einmal verwendet um bei den Mails einen l�sch-Button einzuf�gen. Vielleicht will einer die n�tigen if-Anweisungen in das Script hauen um das Script auch f�r Mails verwendbar zu machen

var allElements, thisElement;
allElements = document.evaluate(
'//input[@type="checkbox"]',
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null);
for (var i = 0; i < allElements.snapshotLength && i < 30; i++) {
	thisElement = allElements.snapshotItem(i);
	if(thisElement.name.match(/id.+/) !== null) {
		newElement = document.createElement('input');
		newElement.type = "image";
		newElement.src = "graphic/dots/red.png";
		newElement.name = "del";
		newElement.style.marginRight = "5px";
		newElement.style.marginBottom = "3px";
		newElement.alt = "Del";
		newElement.value = "Del";
		
		eval("newElement.addEventListener('click', function() {document.getElementsByName('" + thisElement.name + "')[0].checked = 'checked';}, true);");
		
		thisElement.parentNode.insertBefore(newElement, thisElement);
	}
}
*/

if(window.location.href.search(/view=/) == -1) {

	
	input = document.evaluate(
	'//input[@type="checkbox"][@name="all"]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	
	
	tabelle = input.snapshotItem(0).parentNode.parentNode.parentNode
	for(i = 1; i < tabelle.getElementsByTagName("tr").length - 1; i++) {
		if(GM_getValue("filter_" + tabelle.getElementsByTagName("tr")[i].getElementsByTagName("span")[1].innerHTML, false) == true) {
			tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].style.backgroundColor = "#DED3B9";
			tabelle.getElementsByTagName("tr")[i].getElementsByTagName("input")[0].checked = true;
		}
		tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].addEventListener('click', function() {
			if(this.parentNode.getElementsByTagName("td")[0].style.backgroundColor == "rgb(222, 211, 185)") {
				this.parentNode.getElementsByTagName("td")[0].style.backgroundColor = "";
				GM_setValue("filter_" + this.parentNode.getElementsByTagName("span")[1].innerHTML, false);
			}
			else {
				this.parentNode.getElementsByTagName("td")[0].style.backgroundColor = "rgb(222, 211, 185)";
				this.parentNode.getElementsByTagName("input")[1].checked = true;
				GM_setValue("filter_" + this.parentNode.getElementsByTagName("span")[1].innerHTML, true);
			}
		}, true);
		
		
		
		newElement = document.createElement('input');
		newElement.type = "image";
		newElement.src = "graphic/dots/red.png";
		newElement.name = "del";
		newElement.style.marginRight = "5px";
		newElement.style.marginBottom = "3px";
		newElement.alt = "Del";
		newElement.value = "Del";
		
		newElement.addEventListener('click', function() {
			document.getElementsByName(this.parentNode.getElementsByTagName("input")[1].name)[0].checked = 'checked';
		}, true);
		tabelle.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].insertBefore(newElement, tabelle.getElementsByTagName("tr")[i].getElementsByTagName("input")[0]);
		
	}
}