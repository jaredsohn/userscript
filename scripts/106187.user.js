// ==UserScript==
// @name universal pv
// @namespace *
// @include https://www.upv.es/pls/soalu/*
// @version 1.4
// ==/UserScript==




// removepanels
var panels = [ 'panelwrapper_426', 'elemento_415', 'elemento_410', 'elemento_5982', 'elemento_406', 'elemento_387' ];
for (var i=0; i<panels.length;i++){
	var element = document.getElementById(panels[i]);
	if (element) {
		element.parentNode.removeChild(element);
	}
}

// cambiar links
var dir = [ 
	['https://www.upv.es/pls/soalu/sic_intrages.CargaOpcion?P_FRAME=normal&P_MODO=alumno&p_id=405&p_idioma=c', 'http://s330135872.mialojamiento.es/sic_asi.notes_temaalu_asi.php'],
	['https://www.upv.es/pls/soalu/sic_intrages.CargaOpcion?P_FRAME=normal&P_MODO=alumno&p_id=387&p_idioma=c', 'http://s330135872.mialojamiento.es/sic_link.ver.htm'],
	['direccion antigua', 'direccion nueva']
];
var links = document.getElementsByTagName('a');
for( var i=0;i<links.length;i++){
	for(var j=0; j<dir.length;j++){
		if(links[i].href==dir[j][0])
		links[i].href=dir[j][1];
	}
}





/*
var allLinks, thisLink;
allLinks = document.evaluate(
'//a[@href]',
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
thisLink = allLinks.snapshotItem(i);
// notas curso actual
if(thisLink.href=="https://www.upv.es/pls/soalu/sic_intrages.CargaOpcion?P_FRAME=normal&amp;P_MODO=alumno&amp;p_id=405&amp;p_idioma=c" ){
thisLink.href="http://s330135872.mialojamiento.es/sic_asi.notes_temaalu_asi.php";}
// expediente
if(thisLink.href=="https://www.upv.es/pls/soalu/sic_intrages.CargaOpcion?P_FRAME=normal&amp;P_MODO=alumno&amp;p_id=387&amp;p_idioma=c" ){
thisLink.href="http://s330135872.mialojamiento.es/sic_link.ver.htm";}
}
*/


// s330135872.mialojamiento.es/notes.user.js

 