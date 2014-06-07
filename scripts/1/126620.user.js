// ==UserScript==
// @name           Congress Tracker
// @namespace      asasasasasas
// @version		   1.5.5
// @description    son todos patitos
// @include        http://www.erepublik.com/en/elections/country-*-election-congress*
// @exclude        http://www.erepublik.com/en/elections/country-*-election-president*
// ==/UserScript==
var formulario = document.createElement('form');
formulario.setAttribute('method','POST');
formulario.setAttribute('action','http://prueba.la-tiza.com.ar/cacho/congress.php');
formulario.setAttribute('target','_blank');
formulario.setAttribute('name','cachoTracker');
formulario.setAttribute('id','cachoTracker')
var entra1 = document.createElement('input');
var entra2 = document.createElement('input');
var votoEntra1 = document.createElement('input');
var votoEntra2 = document.createElement('input');
var cantidadWildcards = document.createElement('input');
var wildcard1 = document.createElement('input');
var wildcard2 = document.createElement('input');
var wildcard3 = document.createElement('input');
var wildcard4 = document.createElement('input');
var wildcard5 = document.createElement('input');
var wildcard6 = document.createElement('input');
var votoWildcard1 = document.createElement('input');
var votoWildcard2 = document.createElement('input');
var votoWildcard3 = document.createElement('input');
var votoWildcard4 = document.createElement('input');
var votoWildcard5 = document.createElement('input');
var votoWildcard6 = document.createElement('input');
var noEntra1 = document.createElement('input');
var noEntra2 = document.createElement('input');
var noEntra3 = document.createElement('input');
var votoNoEntra1 = document.createElement('input');
var votoNoEntra2 = document.createElement('input');
var votoNoEntra3 = document.createElement('input');
var region = document.createElement('input');
var cerrar = document.createElement('input');
entra1.setAttribute('name','entra1');
entra2.setAttribute('name','entra2');
votoEntra1.setAttribute('name','votoEntra1');
votoEntra2.setAttribute('name','votoEntra2');
cantidadWildcards.setAttribute('name','cantWildcards');
wildcard1.setAttribute('name','wildcard1');
wildcard2.setAttribute('name','wildcard2');
wildcard3.setAttribute('name','wildcard3');
wildcard4.setAttribute('name','wildcard4');
wildcard5.setAttribute('name','wildcard5');
wildcard6.setAttribute('name','wildcard6');
votoWildcard1.setAttribute('name','votoWildcard1');
votoWildcard2.setAttribute('name','votoWildcard2');
votoWildcard3.setAttribute('name','votoWildcard3');
votoWildcard4.setAttribute('name','votoWildcard4');
votoWildcard5.setAttribute('name','votoWildcard5');
votoWildcard6.setAttribute('name','votoWildcard6');
noEntra1.setAttribute('name','noEntra1');
noEntra2.setAttribute('name','noEntra2');
noEntra3.setAttribute('name','noEntra3');
votoNoEntra1.setAttribute('name','votoNoEntra1');
votoNoEntra2.setAttribute('name','votoNoEntra2');
votoNoEntra3.setAttribute('name','votoNoEntra3');
region.setAttribute('name','regionName');
cerrar.setAttribute('name','cerrar');
entra1.setAttribute('type','hidden');
entra2.setAttribute('type','hidden');
votoEntra1.setAttribute('type','hidden');
votoEntra2.setAttribute('type','hidden');
cantidadWildcards.setAttribute('type','hidden');
wildcard1.setAttribute('type','hidden');
wildcard2.setAttribute('type','hidden');
wildcard3.setAttribute('type','hidden');
wildcard4.setAttribute('type','hidden');
wildcard5.setAttribute('type','hidden');
wildcard6.setAttribute('type','hidden');
votoWildcard1.setAttribute('type','hidden');
votoWildcard2.setAttribute('type','hidden');
votoWildcard3.setAttribute('type','hidden');
votoWildcard4.setAttribute('type','hidden');
votoWildcard5.setAttribute('type','hidden');
votoWildcard6.setAttribute('type','hidden');
noEntra1.setAttribute('type','hidden');
noEntra2.setAttribute('type','hidden');
noEntra3.setAttribute('type','hidden');
votoNoEntra1.setAttribute('type','hidden');
votoNoEntra2.setAttribute('type','hidden');
votoNoEntra3.setAttribute('type','hidden');
region.setAttribute('type','hidden');
cerrar.setAttribute('type', 'hidden');
formulario.appendChild(entra1);
formulario.appendChild(entra2);
formulario.appendChild(votoEntra1);
formulario.appendChild(votoEntra2);
formulario.appendChild(cantidadWildcards);
formulario.appendChild(wildcard1);
formulario.appendChild(wildcard2);
formulario.appendChild(wildcard3);
formulario.appendChild(wildcard4);
formulario.appendChild(wildcard5);
formulario.appendChild(wildcard6);
formulario.appendChild(votoWildcard1);
formulario.appendChild(votoWildcard2);
formulario.appendChild(votoWildcard3);
formulario.appendChild(votoWildcard4);
formulario.appendChild(votoWildcard5);
formulario.appendChild(votoWildcard6);
formulario.appendChild(noEntra1);
formulario.appendChild(noEntra2);
formulario.appendChild(noEntra3);
formulario.appendChild(votoNoEntra1);
formulario.appendChild(votoNoEntra2);
formulario.appendChild(votoNoEntra3);
formulario.appendChild(region);
var punteroTablas = document.getElementsByClassName('electiondetails');
var entraNombres = punteroTablas[0].getElementsByClassName('nameholder');
var entraVotos = punteroTablas[0].getElementsByClassName('special');
var wildcardNombres = punteroTablas[1].getElementsByClassName('nameholder');
var wildcardVotos = punteroTablas[1].getElementsByClassName('special');
var noEntraNombres = punteroTablas[2].getElementsByClassName('nameholder');
var noEntraVotos = punteroTablas[2].getElementsByClassName('special');
var cantWildcards = punteroTablas[1].firstChild.nextSibling.firstChild.firstChild.nextSibling.firstChild.nextSibling.innerHTML;
var cantNoEntra = punteroTablas[2].childNodes[1].childNodes[0].childNodes[1].childNodes[1].innerHTML;
entra1.value = entraNombres[0].firstChild.nextSibling.innerHTML;
entra2.value = entraNombres[1].firstChild.nextSibling.innerHTML;
votoEntra1.value = entraVotos[0].innerHTML;
votoEntra2.value = entraVotos[1].innerHTML;
cantidadWildcards.value = cantWildcards;
regionName = document.getElementById('region_name').innerHTML;
region.value = regionName.toLowerCase();
var southern = document.URL.split('-');
southern = southern[9];
if (southern == "153") {
  cerrar.value = true;
} else {
  cerrar.value = false;
}
formulario.appendChild(cerrar);
switch (cantWildcards) {
  case "1":
    wildcard1.value = wildcardNombres[0].firstChild.nextSibling.innerHTML;
    votoWildcard1.value = wildcardVotos[0].innerHTML;
    break;
  case "2":
    wildcard1.value = wildcardNombres[0].firstChild.nextSibling.innerHTML;
    votoWildcard1.value = wildcardVotos[0].innerHTML;
    wildcard2.value = wildcardNombres[1].firstChild.nextSibling.innerHTML;
    votoWildcard2.value = wildcardVotos[1].innerHTML;
    break;
  case "3":
    wildcard1.value = wildcardNombres[0].firstChild.nextSibling.innerHTML;
    votoWildcard1.value = wildcardVotos[0].innerHTML;
    wildcard2.value = wildcardNombres[1].firstChild.nextSibling.innerHTML;
    votoWildcard2.value = wildcardVotos[1].innerHTML;
    wildcard3.value = wildcardNombres[2].firstChild.nextSibling.innerHTML;
    votoWildcard3.value = wildcardVotos[2].innerHTML;
    break;
  case "4":
    wildcard1.value = wildcardNombres[0].firstChild.nextSibling.innerHTML;
    votoWildcard1.value = wildcardVotos[0].innerHTML;
    wildcard2.value = wildcardNombres[1].firstChild.nextSibling.innerHTML;
    votoWildcard2.value = wildcardVotos[1].innerHTML;
    wildcard3.value = wildcardNombres[2].firstChild.nextSibling.innerHTML;
    votoWildcard3.value = wildcardVotos[2].innerHTML;
    wildcard4.value = wildcardNombres[3].firstChild.nextSibling.innerHTML;
    votoWildcard4.value = wildcardVotos[3].innerHTML;
    break;
  case "5":
    wildcard1.value = wildcardNombres[0].firstChild.nextSibling.innerHTML;
    votoWildcard1.value = wildcardVotos[0].innerHTML;
    wildcard2.value = wildcardNombres[1].firstChild.nextSibling.innerHTML;
    votoWildcard2.value = wildcardVotos[1].innerHTML;
    wildcard3.value = wildcardNombres[2].firstChild.nextSibling.innerHTML;
    votoWildcard3.value = wildcardVotos[2].innerHTML;
    wildcard4.value = wildcardNombres[3].firstChild.nextSibling.innerHTML;
    votoWildcard4.value = wildcardVotos[3].innerHTML;
    wildcard5.value = wildcardNombres[4].firstChild.nextSibling.innerHTML;
    votoWildcard5.value = wildcardVotos[4].innerHTML;
    break;
  case "6":
    wildcard1.value = wildcardNombres[0].firstChild.nextSibling.innerHTML;
    votoWildcard1.value = wildcardVotos[0].innerHTML;
    wildcard2.value = wildcardNombres[1].firstChild.nextSibling.innerHTML;
    votoWildcard2.value = wildcardVotos[1].innerHTML;
    wildcard3.value = wildcardNombres[2].firstChild.nextSibling.innerHTML;
    votoWildcard3.value = wildcardVotos[2].innerHTML;
    wildcard4.value = wildcardNombres[3].firstChild.nextSibling.innerHTML;
    votoWildcard4.value = wildcardVotos[3].innerHTML;
    wildcard5.value = wildcardNombres[4].firstChild.nextSibling.innerHTML;
    votoWildcard5.value = wildcardVotos[4].innerHTML;
    wildcard6.value = wildcardNombres[5].firstChild.nextSibling.innerHTML;
    votoWildcard6.value = wildcardVotos[5].innerHTML;
    break;
  default:
    wildcard1.value = '';
    votoWildcard1.value = '';
    wildcard2.value = '';
    votoWildcard2.value = '';
    wildcard3.value = '';
    votoWildcard3.value = '';
    wildcard4.value = '';
    votoWildcard4.value = '';
    wildcard5.value = '';
    votoWildcard5.value = '';
    wildcard6.value = '';
    votoWildcard6.value = '';
    break;
}
switch (cantNoEntra) {
  case "1":
    noEntra1.value = noEntraNombres[0].firstChild.nextSibling.innerHTML;
	votoNoEntra1.value = noEntraVotos[0].innerHTML;
	break;
  case "2":
    noEntra1.value = noEntraNombres[0].firstChild.nextSibling.innerHTML;
	votoNoEntra1.value = noEntraVotos[0].innerHTML;
    noEntra2.value = noEntraNombres[1].firstChild.nextSibling.innerHTML;
	votoNoEntra2.value = noEntraVotos[1].innerHTML;
	break;
  case "3":
    noEntra1.value = noEntraNombres[0].firstChild.nextSibling.innerHTML;
	votoNoEntra1.value = noEntraVotos[0].innerHTML;
    noEntra2.value = noEntraNombres[1].firstChild.nextSibling.innerHTML;
	votoNoEntra2.value = noEntraVotos[1].innerHTML;
    noEntra3.value = noEntraNombres[2].firstChild.nextSibling.innerHTML;
	votoNoEntra3.value = noEntraVotos[2].innerHTML;
	break;
  default:
    noEntra1.value = '';
	votoNoEntra1.value = '';
    noEntra2.value = '';
	votoNoEntra2.value = '';
    noEntra3.value = '';
	votoNoEntra3.value = '';
	break;
}
var enviar = document.createElement('a');
enviar.setAttribute('href','Javascript: document.forms.cachoTracker.submit();');
enviar.innerHTML = "Trackear";
formulario.appendChild(enviar);
var div = document.getElementById('content');
/*var totalVotes = document.getElementById('number_of_votes').innerHTML;
inputId.value = totalVotes;*/
div.appendChild(formulario);