// ==UserScript==
// @name           Mas emoticones para Teisespor
// @namespace      http://www.mcodina.com.ar
// @description    Agrega mas emoticones a teisespor
// @include        http://teisespor.activo-foro.com/post.forum?mode=*
// @include        http://teisespor.activo-foro.com/posting.forum
// @include        http://teisespor.activo-foro.com/msg.forum?mode=*
// @include        http://teisespor.activo-foro.com/privmsg.forum
// ==/UserScript==
function mostrarCapa() {
	var capa = document.getElementById('capaOculta');
	var mas = document.createElement('span');
	mas.innerHTML = "| Ocultar Emoticones";
	mas.addEventListener("click", ocultarCapa, false);
	mas.style.cursor = "pointer";
	mas.style.color = "blue";
	mas.id = "textoOcultar";
	capa.parentNode.insertBefore(mas, capa);
	capa.style.display = "block";
}
function ocultarCapa() {
	var cont = document.getElementById('capaContenedora');
	var capa = document.getElementById('capaOculta');
	var mas = document.getElementById('textoOcultar');
	cont.removeChild(mas);
	capa.style.display = "none";
}
var texto = document.getElementsByName('message');
var capa = document.createElement('div');
capa.style.padding = "5px";
capa.style.margin = "5px";
capa.style.border = "1px solid #CCC";
capa.id = "capaContenedora";
var oculta = document.createElement('div');
oculta.id = "capaOculta";
oculta.style.display = "none";
oculta.innerHTML = "<a href='javascript:emoticonp(\"[img]http://i42.tinypic.com/i38460.jpg[/img]\")'><img src='http://i42.tinypic.com/i38460.jpg' /></a> <a href='javascript:emoticonp(\"[img]http://i44.tinypic.com/2ibm49f.jpg[/img]\")'><img src='http://i44.tinypic.com/2ibm49f.jpg' /></a> <a href='javascript:emoticonp(\"[img]http://s5.tinypic.com/2626wrt.gif[/img]\")'><img src='http://s5.tinypic.com/2626wrt.gif' /></a> <a href='javascript:emoticonp(\"[img]http://s5.tinypic.com/ra2j9f.gif[/img]\")'><img src='http://s5.tinypic.com/ra2j9f.gif' /></a> <a href='javascript:emoticonp(\"[img]http://i44.tinypic.com/nvzbti.gif[/img]\")'><img src='http://i44.tinypic.com/nvzbti.gif' /></a> <a href='javascript:emoticonp(\"[img]http://i39.tinypic.com/14akew0.jpg[/img]\")'><img src='http://i39.tinypic.com/14akew0.jpg' /></a> <a href='javascript:emoticonp(\"[img]http://i39.tinypic.com/2lsh56q.jpg[/img]\")'><img src='http://i39.tinypic.com/2lsh56q.jpg' /></a> <a href='javascript:emoticonp(\"[img]http://i39.tinypic.com/11w7mgg.jpg[/img]\")'><img src='http://i39.tinypic.com/11w7mgg.jpg' /></a> <a href='javascript:emoticonp(\"[img]http://i41.tinypic.com/2hzlnd2.jpg[/img]\")'><img src='http://i41.tinypic.com/2hzlnd2.jpg' /></a> <a href='javascript:emoticonp(\"[img]http://s5.tinypic.com/2z5q0c8.gif[/img]\")'><img src='http://s5.tinypic.com/2z5q0c8.gif' /></a> <a href='javascript:emoticonp(\"[img]http://s5.tinypic.com/2uhl7xk.gif[/img]\")'><img src='http://s5.tinypic.com/2uhl7xk.gif' /></a> <a href='javascript:emoticonp(\"[img]http://s5.tinypic.com/2vn3w2b.gif[/img]\")'><img src='http://s5.tinypic.com/2vn3w2b.gif' /></a> <a href='javascript:emoticonp(\"[img]http://i41.tinypic.com/1zxldoo.jpg[/img]\")'><img src='http://i41.tinypic.com/1zxldoo.jpg' /></a> <a href='javascript:emoticonp(\"[img]http://i39.tinypic.com/1zzorvq.jpg[/img]\")'><img src='http://i39.tinypic.com/1zzorvq.jpg' /></a> <a href='javascript:emoticonp(\"[img]http://i43.tinypic.com/24yu807.jpg[/img]\")'><img src='http://i43.tinypic.com/24yu807.jpg' /></a> <a href='javascript:emoticonp(\"[img]http://i41.tinypic.com/213neyp.jpg[/img]\")'><img src='http://i41.tinypic.com/213neyp.jpg' /></a> <a href='javascript:emoticonp(\"[img]http://i40.tinypic.com/2qa3fgl.jpg[/img]\")'><img src='http://i40.tinypic.com/2qa3fgl.jpg' /></a> <a href='javascript:emoticonp(\"[img]http://i41.tinypic.com/qye3pd.jpg[/img]\")'><img src='http://i41.tinypic.com/qye3pd.jpg' /></a> ";
var mas = document.createElement('span');
mas.innerHTML = "Mostrar mas emoticones ";
mas.addEventListener("click", mostrarCapa, false);
mas.style.cursor = "pointer";
mas.style.color = "blue";
mas.id = "textoOcultarMostrar";

capa.appendChild(mas);
capa.appendChild(oculta);
texto[0].parentNode.insertBefore(capa, texto[0]);