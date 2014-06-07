// ==UserScript==
// @name           Promedio Kardex UANL
// @description    Script para obtener el promedio del kardex de la UANL, en http://www.uanl.mx/enlinea
// @include        http://deimos.dgi.uanl.mx/cgi-bin/wspd_cgi.sh/*conkdx01.htm?HTMLUsuario=*&HTMLtrim=*&HTMLCve_Dependencia=*&HTMLCve_Unidad=*&HTMLCve_Nivel_Academico=*&HTMLCve_Grado_Academico=*&HTMLCve_Modalidad=*&HTMLCve_Plan_Estudio=*&HTMLCve_Carrera=*&HTMLTipCve=*
// @include        http://deimos.dgi.uanl.mx/cgi-bin/wspd_cgi.sh/sso-s.htm
// ==/UserScript==

/*
    Script hecho por Otamay (Matt d0t Pikaflash at gmail d0t c0m) y
    liberado bajo la licencia GNU GPLv3, es decir que puedes modificarlo
    y utilizarlo para los propósitos que desees, siempre y cuando el
    resultado siga siendo libre.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

function generarPromediosUANL(){
    var tablaKardex=document.getElementsByTagName('table')[1];
    var materias = tablaKardex.getElementsByTagName('tr');
    
    var calificacion = function(materia,oportunidad){
	
	var celdas = materias[materia].getElementsByTagName('td');
	
	var calificacionOportunidad = function(oportunidad){
	    if(celdas[oportunidad+3]){
		var valorCelda = celdas[oportunidad+3].getElementsByTagName('b')[0];
		if(!valorCelda.firstChild)
		    return false;
		
		valorCelda=valorCelda.firstChild.nodeValue.trim();

		if(isNaN(valorCelda)){ // Si el valor es AC o NP o NA, etc.
		    if(valorCelda=='AC')
			return 100;
		    if(valorCelda=='NP' || valorCelda=='NA' || valorCelda=='SD'){
			return 0;
		    }
		    else
			return false;
		}
		else if(valorCelda=="") // Si no hay valor
		    return false;

		return parseInt(valorCelda);
	    }else{ //Si la celda no existe
		return false;
	    }
	}
	return calificacionOportunidad(oportunidad);
    }

     var calificacionMateria = function(materia) {
	var calificacionMateria=new Array();
	var oportunidad=1;
	var celdas = materias[materia].getElementsByTagName('td');
	while(oportunidad<=(celdas.length - 4)){
	    calificacionMateria[oportunidad-1]=calificacion(materia,oportunidad);
	    oportunidad++;
	}
	return calificacionMateria;
    }

    var promedio = function(tipo,externo){
	var sumaMaterias=0;
	var numeroMaterias=0;
	
	if(externo){
	    var calificacionMateriaActual=0;
	    for(var materia=1;materia<materias.length;materia++){
	    calificacionMateriaActual=0;
		for(var oportunidad=1;oportunidad<=6;oportunidad++){
		    if(tipo(materia)[oportunidad-1]===false)
			break;
		    calificacionMateriaActual=tipo(materia)[oportunidad-1];
		}
		if(calificacionMateriaActual){
		    sumaMaterias=sumaMaterias+calificacionMateriaActual;
		    numeroMaterias++;
		}
	    }
	}else{
	    for(var materia=1;materia<materias.length;materia++){
		for(var oportunidad=1;oportunidad<=tipo(materia).length;oportunidad++){
		    if(tipo(materia)[oportunidad-1]!==false){
			sumaMaterias=sumaMaterias+tipo(materia)[oportunidad-1];
			numeroMaterias++;
		    }
		}
	    }
	}
	
    var promedio = parseInt((sumaMaterias/numeroMaterias)*100);
	
	if(isNaN(promedio))
	    return false;
	return promedio/100;
    }
    
    function mostrarPromedio(){
	
	var tipoKardex=location.pathname.split('/');
	tipoKardex=tipoKardex[tipoKardex.length-1]; // 'idconkdx01.htm' o 'econkdx01.htm'

	var filas=document.getElementsByTagName('table')[0].getElementsByTagName('tr');
	
	var celdasInformacion=filas[2].getElementsByTagName('td');
	var nodoNuevo=filas[1].childNodes[1].firstChild.cloneNode(true);
	nodoNuevo.firstChild.firstChild.nodeValue='\xa0Promedio: '+promedio(calificacionMateria);
	celdasInformacion[0].firstChild.nodeValue='';
	if(celdasInformacion[0])
	    celdasInformacion[0].appendChild(nodoNuevo);
	
	if(tipoKardex=='econkdx01.htm'){ //Si es un kardex normal, no uno de Idiomas
	    var promedioExterno=promedio(calificacionMateria,true);

	    nodoNuevo=filas[1].childNodes[1].firstChild.cloneNode(true);
	    nodoNuevo.firstChild.firstChild.nodeValue='\xa0Promedio Externo: '+promedioExterno;
	    celdasInformacion[1].firstChild.nodeValue='';
	    if(celdasInformacion[1])
		celdasInformacion[1].appendChild(nodoNuevo);

	}

    }

    function esconderKardexNoOficial()
    {
	divKardexNoOficial=document.getElementById('noof');
	if(divKardexNoOficial)
	    divKardexNoOficial.style.visibility='hidden';
    }
    
    esconderKardexNoOficial();
    mostrarPromedio();
}

if(document.location.href=='http://deimos.dgi.uanl.mx/cgi-bin/wspd_cgi.sh/sso-s.htm'){
    document.getElementsByTagName('input')[2].focus();
}else{
    generarPromediosUANL();
}