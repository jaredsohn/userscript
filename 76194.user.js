// ==UserScript==// @name		Kontianzeige// @version    1.0// @description  Berechnet mit Hilfe der Koords den Konti// @author		--virus--// @include	  http://de18.die-staemme.de/game.php?*&screen=info_player&*
// @include	  http://de18.die-staemme.de/game.php?screen=info_player&*// ==/UserScript==
var search=false; // true=suchen; false=nicht suchen
var search_konti="04"; // für Kontinente die Kontinente von 0 bis 9 immer eine führende 0 davor setzen; K0=00; K5=05
var fcolor=""; //http://de.selfhtml.org/helferlein/farben.htm

// Don't change sth. below
cell=document.createElement("th");
node=document.createTextNode("K");
cell.appendChild(node);
table=findByInner(document,"Koordinaten");
table[0].parentNode.appendChild(cell);
table=findByInner(document,"Koordinaten");

public_table=table[0].parentNode.parentNode.getElementsByTagName("tr");
counter=public_table.length;
for(row_counter=1;row_counter<counter;row_counter++){
	koords=public_table[row_counter].getElementsByTagName("td")[1].firstChild.nodeValue;
	koords=koords.split("|");
	x=koords[0];
	y=koords[1];
	for(silbing_counter=x.length; silbing_counter<3;silbing_counter++){
		x="0"+x;
	}
	for(silbing_counter=y.length; silbing_counter<3;silbing_counter++){
		y="0"+y;
	}
	cell=document.createElement("th");
	konti=y[0]+""+x[0];
	node=document.createTextNode(konti);
	public_table[row_counter].appendChild(cell).appendChild(node);
	
	if(search==true){
		if(konti!=search_konti){
			public_table[row_counter].style.visibility="collapse";
		}
	}
}


/* findByInner from c1b1 */
function findByInner(obj,value) {
    var len = obj.getElementsByTagName('*').length;
    var list = new Object();
    var  a = 0;
    for(var i = 0; i < len; i++) {
      if(obj.getElementsByTagName('*')[i].firstChild) {
        if(obj.getElementsByTagName('*')[i].firstChild.data) {
          if(obj.getElementsByTagName('*')[i].firstChild.data.indexOf(value) != -1) {
            list[a] = obj.getElementsByTagName('*')[i];
            a++; } } } }
    list['length'] = a;
    return list; }