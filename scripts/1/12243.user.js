// ==UserScript==
// @name		  OGame Espiar lunas y recoger escombros desde la vista de galaxia
// @author	  Pnia
// @description   Permite espiar las lunas y recoger los escombros desde la vista de galaxia. Solo ogame.com.es
// @include	   http://*ogame.com.es/game/index.php?page=galaxy*
// ==/UserScript==    

 function xpath(query) {
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
var element=xpath("//input[@name='galaxy']").snapshotItem(0);
var galaxia = element.value;
var element=xpath("//input[@name='system']").snapshotItem(0);
var sistema = element.value;
var element=xpath("//img[@alt='Espiar']").snapshotItem(0);
var sondas = element.parentNode.parentNode.innerHTML.match(/(\d+)/gi)[5];
var element=xpath("//table[@width='569']").snapshotItem(0);
var tablagalaxia = element;

for(var i=2;i<17;i++){ //recorro todas las filas de la tabla
	if(tablagalaxia.rows[i].cells[2].innerHTML.indexOf("Luna")!=-1){	//en este planeta hay luna
		var html=tablagalaxia.rows[i].cells[2].innerHTML;
		var posi=html.indexOf("Espiar")
		if(posi!=-1){
			var nuevo=html.substr(0, posi);
			var viejo="Espiar";
			nuevo+="<a style=\\'cursor:pointer\\' onclick=\\'javascript:doit(6, "+galaxia+","+sistema+","+(i-1)+",3,"+sondas+");\\'>Espiar</a>";
			nuevo+=html.substr(posi+6,html.length-posi+6);
			tablagalaxia.rows[i].cells[2].innerHTML=nuevo;
		}
	}
	if(tablagalaxia.rows[i].cells[3].innerHTML.indexOf("Recolectar")!=-1){	//en este planeta hay escombros
		var html=tablagalaxia.rows[i].cells[3].innerHTML;
		var metal=html.match(/Metal:<\/th><th>([0-9.]+)<\/th>/)[0].match(/([0-9.]+)/)[0].replace(/\./g, '');
		var cristal=html.match(/Cristal:<\/th><th>([0-9.]+)<\/th>/)[0].match(/([0-9.]+)/)[0].replace(/\./g, '');
		var escombros=parseInt(metal)+parseInt(cristal);
		var recicladores=Math.ceil(escombros/20000);
		var posi=html.indexOf("Recolectar")
		var nuevo=html.substr(0, posi);
		nuevo+="<a style=\\'cursor:pointer\\' onclick=\\'javascript:doit(8, "+galaxia+","+sistema+","+(i-1)+",2,"+recicladores+");\\'>Recolectar</a>";
		nuevo+=html.substr(posi+10,html.length-posi+10);
		tablagalaxia.rows[i].cells[3].innerHTML=nuevo;
	}
}
