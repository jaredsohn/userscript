// ==UserScript==
// @name          BeneficiosRobos
// @namespace     http://
// @description	  Permite visionar en el Vision General los beneficios obtenidos en los robos actuales.
// @include  	  http://ogame*/game/overview.php*
// ==/UserScript==

var allElements, thisElement, tooltip;
var allTr, thisTr, cabecera;
var metal=0;
var cristal=0;
var deuterio=0;
var metalE=0;
var cristalE=0;
var deuterioE=0;
var metalT=0;
var cristalT=0;
var deuterioT=0;
var metalD=0;
var cristalD=0;
var deuterioD=0;
var color='#FFFFFF';
var colorE='#FFFFFF';
var colorT='#FFFFFF';
var colorD='#FFFFFF';
var activa=false;
var activaE=false;
var activaT=false;
var activaD=false;

allElements = document.getElementsByTagName('a');
for (var i = 0; i < allElements.length; i++){
	thisElement = allElements[i];

	if (thisElement.innerHTML.substring(0,6) == 'Atacar' ||thisElement.innerHTML.substring(0,6) == 'Ataque'){
		
		tooltip = thisElement.attributes.item(1);
		
		//metal=metal+parseInt(tooltip.textContent.substring(tooltip.textContent.indexOf('Metal:')+7,tooltip.textContent.indexOf('Cristal:')-6));
		datos=tooltip.textContent.substring(tooltip.textContent.indexOf('Metal:')+7,tooltip.textContent.indexOf('Cristal:')-6).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		metal=metal+parseInt(dato);
		
		datos=tooltip.textContent.substring(tooltip.textContent.indexOf('Cristal:')+9,tooltip.textContent.indexOf('Deuterio:')-6).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		cristal=cristal+parseInt(dato);

		datos=tooltip.textContent.substring(tooltip.textContent.indexOf('Deuterio:')+10,tooltip.textContent.indexOf('")')).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		deuterio=deuterio+parseInt(dato);
		
	}
	if (thisElement.innerHTML.substring(0,10) == 'Recolectar'){
		
		tooltip = thisElement.attributes.item(1);
		
		datos=tooltip.textContent.substring(tooltip.textContent.indexOf('Metal:')+7,tooltip.textContent.indexOf('Cristal:')-6).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		metalE=metalE+parseInt(dato);
		
		datos=tooltip.textContent.substring(tooltip.textContent.indexOf('Cristal:')+9,tooltip.textContent.indexOf('Deuterio:')-6).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		cristalE=cristalE+parseInt(dato);

		datos=tooltip.textContent.substring(tooltip.textContent.indexOf('Deuterio:')+10,tooltip.textContent.indexOf('")')).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		deuterioE=deuterioE+parseInt(dato);
		
		
		
		
		/*
		metalE=metalE+parseInt(tooltip.textContent.substring(tooltip.textContent.indexOf('Metal:')+7,tooltip.textContent.indexOf('Cristal:')-6));
				
		cristalE=cristalE+parseInt(tooltip.textContent.substring(tooltip.textContent.indexOf('Cristal:')+9,tooltip.textContent.indexOf('Deuterio:')-6));
		deuterioE=deuterioE+parseInt(tooltip.textContent.substring(tooltip.textContent.indexOf('Deuterio:')+10,tooltip.textContent.indexOf('")')));
	*/
	}
	
//Transportes
	if (thisElement.innerHTML.substring(0,11) == 'Transportar'){
		
		tooltip = thisElement.attributes.item(1);
		
		datos=tooltip.textContent.substring(tooltip.textContent.indexOf('Metal:')+7,tooltip.textContent.indexOf('Cristal:')-6).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		metalT=metalT+parseInt(dato);
		
		datos=tooltip.textContent.substring(tooltip.textContent.indexOf('Cristal:')+9,tooltip.textContent.indexOf('Deuterio:')-6).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		cristalT=cristalT+parseInt(dato);

		datos=tooltip.textContent.substring(tooltip.textContent.indexOf('Deuterio:')+10,tooltip.textContent.indexOf('")')).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		deuterioT=deuterioT+parseInt(dato);
		
		
		/*
		metalT=metalT+parseInt(tooltip.textContent.substring(tooltip.textContent.indexOf('Metal:')+7,tooltip.textContent.indexOf('Cristal:')-6));
		cristalT=cristalT+parseInt(tooltip.textContent.substring(tooltip.textContent.indexOf('Cristal:')+9,tooltip.textContent.indexOf('Deuterio:')-6));
		deuterioT=deuterioT+parseInt(tooltip.textContent.substring(tooltip.textContent.indexOf('Deuterio:')+10,tooltip.textContent.indexOf('")')));
	*/
	}
//Despliegues
	if (thisElement.innerHTML.substring(0,9) == 'Desplegar'){
		
		tooltip = thisElement.attributes.item(1);
		
		datos=tooltip.textContent.substring(tooltip.textContent.indexOf('Metal:')+7,tooltip.textContent.indexOf('Cristal:')-6).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		metalD=metalD+parseInt(dato);
		
		datos=tooltip.textContent.substring(tooltip.textContent.indexOf('Cristal:')+9,tooltip.textContent.indexOf('Deuterio:')-6).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		cristalD=cristalD+parseInt(dato);

		datos=tooltip.textContent.substring(tooltip.textContent.indexOf('Deuterio:')+10,tooltip.textContent.indexOf('")')).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		deuterioD=deuterioD+parseInt(dato);
		
		/*
		metalD=metalD+parseInt(tooltip.textContent.substring(tooltip.textContent.indexOf('Metal:')+7,tooltip.textContent.indexOf('Cristal:')-6));
		cristalD=cristalD+parseInt(tooltip.textContent.substring(tooltip.textContent.indexOf('Cristal:')+9,tooltip.textContent.indexOf('Deuterio:')-6));
		deuterioD=deuterioD+parseInt(tooltip.textContent.substring(tooltip.textContent.indexOf('Deuterio:')+10,tooltip.textContent.indexOf('")')));
	*/
	}	

	
// hasta aki la obtencion de datos
}

if (metal>0 || cristal>0 || deuterio>0){
	var color='#FF0000';
	var activa=true;
}
if (metalE>0 || cristalE>0 || deuterioE>0){
	var colorE='#FF0000';
	var activaE=true;
}
//Transportes
if (metalT>0 || cristalT>0 || deuterioT>0){
	var colorT='#FF0000';
	var activaT=true;	
}
//Despliegues
if (metalD>0 || cristalD>0 || deuterioD>0){
	var colorD='#FF0000';
	var activaD=true;	
}

////////////////////////////////////////////////////////////////////////
// based in a function from 					      //
// http://www.forosdelweb.com/showthread.php?postid=265553#post265553 //
// put dot as separator :)					      //
////////////////////////////////////////////////////////////////////////

function formatNmb(num){
    var sRes = "";
    var sign = "";
    if (parseInt(num) < 0) {	
	sign = "-";
	num = parseInt(num) * -1	
    }
    //Convert to string and remove espaces
    nNmb = '' + parseInt(num) + '';

    for (var j, i = nNmb.length - 1, j = 0; i >= 0; i--, j++)
     sRes = nNmb.charAt(i) + ((j > 0) && (j % 3 == 0)? ".": "") + sRes;

    return sign + sRes;
} 

// Ahora creamos la tabla

if (metal>0 || cristal>0 || deuterio>0 || metalE>0 || cristalE>0 || deuterioE>0 || metalT>0 || cristalT>0 || deuterioT>0 || metalD>0 || cristalD>0 || deuterioD>0){
	
	allTr = document.getElementsByTagName('tbody');
	thisTr = allTr[5];
	//GM_log(thisTr.firstChild.innerHTML.substring(0,19));
	if (thisTr.firstChild.innerHTML.substring(0,19) == '<td align="center">'){
		thisTr=allTr[6];
	}
	cabecera=thisTr.childNodes.item(4);
	
	if (thisTr.childNodes.item(2).textContent.substring(16,22) == 'Tienes'){
		cabecera=thisTr.childNodes.item(6);
	}

	//GM_log(cabecera.textContent);
	//Creamos una nueva fila
	var myRow = document.createElement('tr');
		myRow.setAttribute("height","20");

	//creamos dos celdas para los enlaces
	var myCell = document.createElement('th');
	var myCell2 = document.createElement('th');
		myCell2.setAttribute("colspan","3");
	
	myCell.innerHTML='';
	myCell2.innerHTML='';
	if (activa){
		myCell.innerHTML+='Robos:<br>';
		myCell2.innerHTML += 'Metal: <font color='+color+'>'+formatNmb(metal)+'</font>   Cristal: <font color='+color+'>'+formatNmb(cristal)+'</font>   Deuterio: <font color='+color+'>'+formatNmb(deuterio)+'</font><BR>';
	}
	if (activaE){
		myCell.innerHTML+='Escombros:<br>';
		myCell2.innerHTML += 'Metal: <font color='+colorE+'>'+formatNmb(metalE)+'</font>   Cristal: <font color='+colorE+'>'+formatNmb(cristalE)+'</font>   Deuterio: <font color='+colorE+'>'+formatNmb(deuterioE)+'</font><br>';
	}
	if (activaT){
		myCell.innerHTML+='Transportes:<br>';
		myCell2.innerHTML += 'Metal: <font color='+colorT+'>'+formatNmb(metalT)+'</font>   Cristal: <font color='+colorT+'>'+formatNmb(cristalT)+'</font>   Deuterio: <font color='+colorT+'>'+formatNmb(deuterioT)+'</font><br>';
	}
		if (activaD){
		myCell.innerHTML+='Despliegues:';
		myCell2.innerHTML += 'Metal: <font color='+colorD+'>'+formatNmb(metalD)+'</font>   Cristal: <font color='+colorD+'>'+formatNmb(cristalD)+'</font>   Deuterio: <font color='+colorD+'>'+formatNmb(deuterioD)+'</font>';
	}
	


	//Pongo los enlaces dentro de las celdas
	//myCell.innerHTML = 'Robos:<br>Escombros:<br>Transportes:<br>Despliegues:';
	//myCell2.innerHTML = 'Metal: <font color='+color+'>'+formatNmb(metal)+'</font>   Cristal: <font color='+color+'>'+formatNmb(cristal)+'</font>   Deuterio: <font color='+color+'>'+formatNmb(deuterio)+'</font><BR>Metal: <font color='+colorE+'>'+formatNmb(metalE)+'</font>   Cristal: <font color='+colorE+'>'+formatNmb(cristalE)+'</font>   Deuterio: <font color='+colorE+'>'+formatNmb(deuterioE)+'</font><br>Metal: <font color='+colorT+'>'+formatNmb(metalT)+'</font>   Cristal: <font color='+colorT+'>'+formatNmb(cristalT)+'</font>   Deuterio: <font color='+colorT+'>'+formatNmb(deuterioT)+'</font><br>Metal: <font color='+colorD+'>'+formatNmb(metalD)+'</font>   Cristal: <font color='+colorD+'>'+formatNmb(cristalD)+'</font>   Deuterio: <font color='+colorD+'>'+formatNmb(deuterioD)+'</font>';
	//Pongo las celdas dentro de las filas
	myRow.appendChild(myCell);
	myRow.appendChild(myCell2);
	//Pongo la fila en la p�gina
	thisTr.insertBefore(myRow,cabecera.previousSibling);

	//barra de titulo
	var myRowt = document.createElement('td');
		myRowt.setAttribute("class","c");
		myRowt.setAttribute("colspan","4");
	//Pongo los enlaces dentro de las celdas
	myRowt.innerHTML = 'Recursos Robados';
	//Pongo la fila en la p�gina
	thisTr.insertBefore(myRowt,myRow);
}

