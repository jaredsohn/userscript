// ==UserScript==
// @name           Stämme - Gebäude
// @namespace      Stämme - Gebäude
// @description    Ein GM-Script für http://die-staemme.de, das auf der Hauptgebäude-Seite anzeigt, wenn bestimmte Gebäude schon zu einer gewünschten Stufe ausgebaut wurden.
// @include        http://de*.die-staemme.de/game.php?*&screen=main
// @include        http://de*.die-staemme.de/game.php?*&screen=main&mode=build
// ==/UserScript==

//Hier die gewünschte maximale Ausbaustufe angeben
//Wenn ein Gebäude nicht durchgecheckt werden soll, einfach den entsprechenden Eintrag auskommentieren(// davorsetzen)
Festlegung={
          "main":10,
          "barracks":25,
          "stable":20,
          "garage":15,
          "snob":1,
          "smith":20,
          "place":1,
          "statue":1,
          "market":20,
          "wood":30,
          "stone":30,
          "iron":30,
          "farm":30,
          "storage":30,
          "hide":10,
          "wall":20
};
//Hier festlegen, welcher Text angezeigt werden soll, wenn die Ausbaustufe erreicht wurde/überschritten wurde
txtErreicht="weit genug ausgebaut";
txtUeberschritten="schon zu weit ausgebaut";


//Ab hier nichts mehr verändern
node=document.getElementsByClassName("vis")[document.getElementsByClassName("vis").length-1].getElementsByTagName("tr");
buildings=new Array();
for(i=1;i<node.length;i++){
Stufe=node[i].getElementsByTagName("span")[0].firstChild.data.search(/(\d+)/);
Stufe=(Stufe!=-1)?RegExp.$1:0;
ind=node[i].getElementsByTagName("a")[0].href.replace(/.*&screen=(.)/g, "$1");
for(Ziel in Festlegung){
    if(Ziel==ind){
        if(Festlegung[Ziel]<=Stufe){
            Knoten=document.createElement("td");
            Knoten.setAttribute("align", "center");
            Knoten.setAttribute("class", "inactive");
            Knoten.setAttribute("colspan", "6");
            TextKnoten=(Festlegung[Ziel]==Stufe)?document.createTextNode(txtErreicht):document.createTextNode(txtUeberschritten);
            for(a=1;a<node[i].getElementsByTagName("td").length;a=1){
                node[i].removeChild(node[i].getElementsByTagName("td")[a]);
            }
            Knoten.appendChild(TextKnoten);
            node[i].appendChild(Knoten);
        }
    }
}
}
allElements = document.evaluate(
		'//table[@class="vis"]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		for(var i = 0; i < allElements.snapshotLength; i++) {
			thisElement = allElements.snapshotItem(i);
		}