// ==UserScript==
// @name           President Tracker
// @namespace      asasasasasas
// @version		   1.5.5
// @description    son todos patitos
// @include        http://www.erepublik.com/en/elections/country-*-election-president*
// @exclude        http://www.erepublik.com/en/elections/country-*-election-congress*
// ==/UserScript==
function calcularVotos(cn) {
  var texto = candidatosVotos[cn].firstChild.nextSibling.childNodes[3].innerHTML;
  var votos2 = parseFloat(texto);
  var votos1 = votosTotales / 100 * votos2;
  var votos = Math.round(votos1);
  return votos;
}
var formulario = document.createElement('form');
formulario.setAttribute('method','POST');
formulario.setAttribute('action','http://prueba.la-tiza.com.ar/cacho/presidente/presidente.php');
formulario.setAttribute('target','_blank');
formulario.setAttribute('name','cachoTracker');
formulario.setAttribute('id','cachoTracker')
var candidato1 = document.createElement('input');
var candidato2 = document.createElement('input');
var candidato3 = document.createElement('input');
var candidato4 = document.createElement('input');
var candidato5 = document.createElement('input');
var votosCandidato1 = document.createElement('input');
var votosCandidato2 = document.createElement('input');
var votosCandidato3 = document.createElement('input');
var votosCandidato4 = document.createElement('input');
var votosCandidato5 = document.createElement('input');
var cantCandidatos = document.createElement('input');
var pais = document.createElement('input');
candidato1.setAttribute('name','candidato1');
candidato2.setAttribute('name','candidato2');
candidato3.setAttribute('name','candidato3');
candidato4.setAttribute('name','candidato4');
candidato5.setAttribute('name','candidato5');
votosCandidato1.setAttribute('name','votosCandidato1');
votosCandidato2.setAttribute('name','votosCandidato2');
votosCandidato3.setAttribute('name','votosCandidato3');
votosCandidato4.setAttribute('name','votosCandidato4');
votosCandidato5.setAttribute('name','votosCandidato5');
cantCandidatos.setAttribute('name','cantCandidatos');
pais.setAttribute('name','pais');
candidato1.setAttribute('type','hidden');
candidato2.setAttribute('type','hidden');
candidato3.setAttribute('type','hidden');
candidato4.setAttribute('type','hidden');
candidato5.setAttribute('type','hidden');
votosCandidato1.setAttribute('type','hidden');
votosCandidato2.setAttribute('type','hidden');
votosCandidato3.setAttribute('type','hidden');
votosCandidato4.setAttribute('type','hidden');
votosCandidato5.setAttribute('type','hidden');
cantCandidatos.setAttribute('type','hidden');
pais.setAttribute('type','hidden');
formulario.appendChild(candidato1);
formulario.appendChild(candidato2);
formulario.appendChild(candidato3);
formulario.appendChild(candidato4);
formulario.appendChild(candidato5);
formulario.appendChild(votosCandidato1);
formulario.appendChild(votosCandidato2);
formulario.appendChild(votosCandidato3);
formulario.appendChild(votosCandidato4);
formulario.appendChild(votosCandidato5);
formulario.appendChild(cantCandidatos);
formulario.appendChild(pais);
var candidatosVotos = document.getElementsByClassName('vote_block');
var candidatosNombres = document.getElementsByClassName('el_candidate');
var vt = document.getElementsByClassName('vote_totals')[0].childNodes[1].childNodes[1].childNodes[1].innerHTML;
var votosTotales = parseInt(vt);
var candidatos = document.getElementById('numberOfCandidates');
var cantidadCandidatos = candidatos.value;
cantCandidatos.value = cantidadCandidatos;
pais.value = document.getElementById('country_flag').childNodes[1].title;
switch (cantidadCandidatos) {
  case "1":
    candidato1.value = candidatosNombres[0].innerHTML;
    votosCandidato1.value = calcularVotos(0);
    break;
  case "2":
    candidato1.value = candidatosNombres[0].innerHTML;
    votosCandidato1.value = calcularVotos(0);
    candidato2.value = candidatosNombres[1].innerHTML;
    votosCandidato2.value = calcularVotos(1);
    break;
  case "3":
    candidato1.value = candidatosNombres[0].innerHTML;
    votosCandidato1.value = calcularVotos(0);
    candidato2.value = candidatosNombres[1].innerHTML;
    votosCandidato2.value = calcularVotos(1);
    candidato3.value = candidatosNombres[2].innerHTML;
    votosCandidato3.value = calcularVotos(2);
    break;
  case "4":
    candidato1.value = candidatosNombres[0].innerHTML;
    votosCandidato1.value = calcularVotos(0);
    candidato2.value = candidatosNombres[1].innerHTML;
    votosCandidato2.value = calcularVotos(1);
    candidato3.value = candidatosNombres[2].innerHTML;
    votosCandidato3.value = calcularVotos(2);
    candidato4.value = candidatosNombres[3].innerHTML;
    votosCandidato4.value = calcularVotos(3);
    break;
  case "5":
    candidato1.value = candidatosNombres[0].innerHTML;
    votosCandidato1.value = calcularVotos(0);
    candidato2.value = candidatosNombres[1].innerHTML;
    votosCandidato2.value = calcularVotos(1);
    candidato3.value = candidatosNombres[2].innerHTML;
    votosCandidato3.value = calcularVotos(2);
    candidato4.value = candidatosNombres[3].innerHTML;
    votosCandidato4.value = calcularVotos(3);
    candidato5.value = candidatosNombres[4].innerHTML;
    votosCandidato5.value = calcularVotos(4);
    break;
  default:
    candidato1.value = '';
    votosCandidato1.value = '';
    candidato2.value = '';
    votosCandidato2.value = '';
    candidato3.value = '';
    votosCandidato3.value = '';
    candidato4.value = '';
    votosCandidato4.value = '';
    candidato5.value = '';
    votosCandidato5.value = '';
    break;
}
var enviar = document.createElement('a');
enviar.setAttribute('href','Javascript: document.forms.cachoTracker.submit();');
enviar.innerHTML = "Trackear";
formulario.appendChild(enviar);
var div = document.getElementById('content');
div.appendChild(formulario);