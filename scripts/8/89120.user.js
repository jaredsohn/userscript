// ==UserScript==
// @name          PcLigaTools
// @namespace     http://userscripts.org
// @description   Script para mejorar las caracteristicas de PcLiga.com
// @include       http://www.pcliga.com/*
// @include       http://pcliga.com/*
// ==/UserScript==


var urlEquipoVecino="pcliga.com/clasificacion_verequipo.asp";
var urlEquipoPropio="pcliga.com/plantilla_lista.asp";
var quitarHTTP= document.location.href.replace("http://","");
var quitarWWW= quitarHTTP.replace("www.","");
var urlVisitada=quitarWWW.split("?");

//MR PLANTILLA VECINO
if(urlVisitada[0]==urlEquipoVecino)
{
	var allHTMLTags=document.getElementsByTagName("*");
	var totalMediasMR=0;
	var totalMediasME=0;
	var mediaMR=0;
	var mediaME=0;
	var numeroJugadores=0;
	var indice=0;
	
	for (var i=1; i<allHTMLTags.length; i++) 
	{

		if(allHTMLTags[i].innerHTML=="Plantilla" && allHTMLTags[i].tagName=="H2")
			indice=i;
		
		if (allHTMLTags[i].className=="textonoticias"  && allHTMLTags[i].rows.length>5 && allHTMLTags[i-1].innerHTML=="Plantilla") 
		{
				
			numeroJugadores=allHTMLTags[i].rows.length-1;
				
			for (var j=1;j<allHTMLTags[i].rows.length;j++)
			{
				var fila=allHTMLTags[i].rows[j];
				var columnaMR=fila.cells[12];  
				var columnaME=fila.cells[13];
				var valorColumnaMRarray1 = columnaMR.innerHTML.split(">");
				var valorColumnaMRarray2 =  valorColumnaMRarray1[1].split("<");
				var valorColumnaMR=valorColumnaMRarray2[0];
				var valorColumnaME = columnaME.innerHTML;
				totalMediasMR=totalMediasMR+parseInt(valorColumnaMR);	
				totalMediasME=totalMediasME+parseInt(valorColumnaME);	
			}
			mediaMR=totalMediasMR/numeroJugadores;
			mediaME=totalMediasME/numeroJugadores;
			mediaMR=mediaMR.toFixed(2);
			mediaME=mediaME.toFixed(2);
			
			if(indice>0)
				i=allHTMLTags.length;
		}
	}
	
	allHTMLTags[indice].innerHTML=allHTMLTags[indice].innerHTML+' (MR: <font color="red"><b>'+mediaMR+'</b></font>, ME: <font color="red"><b>'+mediaME+"</b></font>)";
}



//MR PLANTILLA PROPIA
if(urlVisitada[0]==urlEquipoPropio) 
{
	var allHTMLTags=document.getElementsByTagName("*");
	var InicioRojoNegrita='<font color="red"><b>';
	var FinalRojoNegrita='</b></font>';
	var totalMedias=0;
	var media=0;
	var numeroJugadores=0;
	var indice=0;
	
	for (var i=0; i<allHTMLTags.length; i++) 
	{
		

		if (allHTMLTags[i].className=="articleheader" && allHTMLTags[i].innerHTML=="Plantilla") 
			indice=i;
			
		if (allHTMLTags[i].className=="textonoticias") 
		{
			numeroJugadores=allHTMLTags[i].rows.length-1;
			
			for (var j=1;j<allHTMLTags[i].rows.length;j++)
			{
				var fila=allHTMLTags[i].rows[j];
				var columna=fila.cells[12];
				var valorColumna = columna.firstChild.nodeValue;
				totalMedias=totalMedias+parseInt(valorColumna);			
			}
			media=totalMedias/numeroJugadores;
			media=media.toFixed(2);
			
			if(indice>0)
				i=allHTMLTags.length;
		}
	}
	
	allHTMLTags[indice].innerHTML="Plantilla (MR Equipo: "+InicioRojoNegrita+media+FinalRojoNegrita+")";

}	

//MR JUGADOR
var urlPropio="pcliga.com/plantilla_infojugador.asp";
var urlVecino="pcliga.com/fichajes_infojugador.asp";
var urlRenovar="pcliga.com/plantilla_renovar_haceroferta.asp";
var urlEstimarValor="pcliga.com/plantilla_renovar_estimarvalor.asp";
var urlEntrenar="pcliga.com/plantilla_entrenarstats.asp";
var urlOfertaVecino="pcliga.com/fichajes_cedido_haceroferta.asp";

if(urlVisitada[0]==urlPropio || urlVisitada[0]==urlVecino || urlVisitada[0]==urlRenovar || urlVisitada[0]==urlEstimarValor || urlVisitada[0]== urlEntrenar  || urlVisitada[0]==urlOfertaVecino)
{
	var allHTMLTags=document.getElementsByTagName("*");
	var numValores=0;
	var totalValores=0;
	var mr=0;
	var salir=false;
		
	for (var i=0; i<allHTMLTags.length; i++) 
	{
		
		if(allHTMLTags[i].className=="cuadroinfojugador" && allHTMLTags[i].rows.length==11)
		{
			for(var j=0;j<6;j++)
			{
				var partesCadena=allHTMLTags[i].rows[j].innerHTML.split(";");
				var valor=partesCadena[2].split("<");
				totalValores=totalValores+parseInt(valor);
			}
				
			mr=totalValores/6;
			mr=mr.toFixed(2);
			salir=true;
		}
			
		if(allHTMLTags[i].innerHTML=="Media Real")
		{
			if(allHTMLTags[i+1].className=="cuadroinfojugador")
			{
				var cadena='<td style="font-size: 59px;" align="center" height="66" width="100%">91</td>';
				var finalCadena='</td>';
				var partesCadena=cadena.split(">");
				var primeraParte=partesCadena[0];
				var cadenaFinal=primeraParte+">"+mr+finalCadena;
				allHTMLTags[i+1].rows[0].innerHTML=cadenaFinal;
			}
			
			if(salir)
				i=allHTMLTags.length;
		}
			
	}	
}

//RENOVACION OPTIMA
if(urlVisitada[0]==urlRenovar)
{
	var rojaNegritaOn='<font color="red"><b>';
	var rojaNegritaOff='</b></font>';
	var edad=0;
	var form=document.getElementsByName("comprar");
	var clausula=parseFloat(form[0].elements[2].value.replace(",", "."));
	var ficha=parseFloat(form[0].elements[3].value.replace(",", "."));
	var allHTMLTags=document.getElementsByTagName("*");
	
	
	var salir=false;
	
	for (var i=0; i<allHTMLTags.length; i++) 
	{
		if(allHTMLTags[i].className=="cuadroinfojugador" && allHTMLTags[i].rows.length==8)
		{
			var fila=allHTMLTags[i].rows[0];
			var edadVector=allHTMLTags[i].rows[0].cells[1].innerHTML.split("&");
			edad=edadVector[0];
			salir=true;
		}
		
		if(allHTMLTags[i].className=="cuadroinfojugador" && allHTMLTags[i].rows.length==4)
		{
			var nuevaClausula=redondear(getClausulaRenovacion(edad,clausula));
			var nuevaFicha=redondear(getFichaRenovacion(edad,nuevaClausula,ficha));
			allHTMLTags[i].rows[0].cells[1].innerHTML+="  -- RENOVACION OPTIMA -->  "+rojaNegritaOn+nuevaClausula+ " Euros"+rojaNegritaOff;
			allHTMLTags[i].rows[1].cells[1].innerHTML+="  -- RENOVACION OPTIMA -->  "+rojaNegritaOn+nuevaFicha+ " Euros"+rojaNegritaOff;
			
			if(salir)
				i=allHTMLTags.length;
		}
	}
	
}




function getFichaRenovacion(edad,clausula,fichaActual)
{
	var nuevaFicha=0;
		
	if(edad<=27)
	{
		if(clausula<=30000000)
		{
			nuevaFicha=fichaActual+((fichaActual*18)/100);
		}
		if(clausula>30000000 && clausula<=50000000)
		{
			nuevaFicha=fichaActual+((fichaActual*23)/100);
		}
		if(clausula>50000000 && clausula<=70000000)
		{
			nuevaFicha=fichaActual+((fichaActual*28)/100);
		}
		if(clausula>70000000 && clausula<=90000000)
		{
			nuevaFicha=fichaActual+((fichaActual*33)/100);
		}
		if(clausula>90000000)
		{
			nuevaFicha=fichaActual+((fichaActual*38)/100);
		}
	}
	if(edad>27 && edad<=30)
	{
		nuevaFicha=fichaActual;
	}
	if(edad>30)
	{
		nuevaFicha=fichaActual-((fichaActual*10)/100);
	}
	
	return nuevaFicha;
}

function getClausulaRenovacion(edad,clausulaActual)
{
	var nuevaClausula=0;
	
	if(edad<=27)
		nuevaClausula=clausulaActual+(((clausulaActual*15)/100)-0.01);
	else
		nuevaClausula=clausulaActual;
		
	return nuevaClausula;
}



function redondear(num)
{ 		
	var original=parseFloat(num);
	if ((original*100%100)>=0.5)
	{
		var result=Math.round(original*100)/100+0.01;
	}
	else
	{
		var result=Math.round(original*100)/100; 		
	}
	
	result=result.toFixed(2);
	return result;
}




// FICHAJE OPTIMO

var urlFichaje="pcliga.com/fichajes_haceroferta.asp";


if(urlVisitada[0]==urlFichaje)
{

	var rojaNegritaOn='<font color="red"><b>';
	var rojaNegritaOff='</b></font>';
	var allHTMLTags=document.getElementsByTagName("*");
	
	for (var i=1; i<allHTMLTags.length; i++) 
	{
		if(allHTMLTags[i].className=="cuadroinfojugador" && allHTMLTags[i].rows.length==6 && allHTMLTags[i-1].tagName=="INPUT")
		{
			var filaClausula=allHTMLTags[i].rows[2];
			var filaFicha=allHTMLTags[i].rows[1];
			
			//alert(filaFicha.cells[1].value);
			//alert(filaClausula.cells[1].innerHTML);
			
			var form=document.getElementsByName("comprar");
			
			
			
			var ficha=parseFloat(form[0].elements[2].value.replace(",", "."));
			var clausula=parseFloat(form[0].elements[3].value.replace(",", "."));
			
			
			var fichaNueva=redondear(getFichaFichaje(ficha));
			var clausulaNueva=redondear(getClausulaFichaje(clausula));
			
			//alert(filaFicha.cells[1].innerHTML);
			filaFicha.cells[1].innerHTML+="  -- FICHAJE OPTIMO -->  "+rojaNegritaOn+fichaNueva+ " Euros"+rojaNegritaOff;
			filaClausula.cells[1].innerHTML+="  -- FICHAJE OPTIMO -->  "+rojaNegritaOn+clausulaNueva+ " Euros"+rojaNegritaOff;
			
			i=allHTMLTags.length;
		}
	}
}



function getFichaFichaje(fichaActual)
{
	return (fichaActual+((fichaActual*10)/100));
}

function getClausulaFichaje(clausulaActual)
{
	return (clausulaActual+((clausulaActual*4)/100));
}





function doSomeRequest(servletName, servletArguments1,servletArguments2,servletArguments3){
	
    var servlet = servletName;                
    var arg1 = servletArguments1; 
	var arg2 = servletArguments2; 
	var arg3 = servletArguments3; 	
    var req = servlet + "?sctEdad=" + arg1+"&inpClausulaActual="+arg2+"&inpFichaActual="+arg3;            
    request=addrequest(req);                          
    request.onreadystatechange = function(){  
        
		//alert(request);
		//alert(req.responseText);
    }
}

function addrequest(req) {
    try {                                     //create a request for netscape, mozilla, opera, etc.
        request = new XMLHttpRequest();
    }catch (e) {

        try {                                 //create a request for internet explorer
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }catch (e) {                           //do some error-handling
            alert("XMLHttpRequest Error");
        }
    }

    request.open("GET", req, true);       //prepare the request
    request.send(null);  
	alert(request.responseText);
    return request;                           //return the request
}
