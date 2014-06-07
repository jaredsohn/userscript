// ==UserScript==
// @name           Script eColombia
// @namespace      parce http://www.erepublik.com/es/citizen/profile/824471 
// @include        http://economy.erepublik.com/*
// @require		   http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// ==/UserScript==

//Special thanks to JCFC http://www.erepublik.com/en/citizen/profile/1618260 and Elisa Vorimberg http://www.erepublik.com/es/citizen/profile/1309629
//who wrote the original version of this greasemonkey script http://userscripts.org/scripts/show/81311
//Gracias a The Dark Leviathan por la idea :D

//URL settings
var currURL = location.href;
var arrURL = currURL.split('/');
BASE_URL = arrURL[0] + '/' + arrURL[1] + '/' + arrURL[2] + '/';


// Reemplazando...
function replace_Lisa()
{
	GM_addStyle('.extended.entertainment_bg  {background-image:url("http://i34.tinypic.com/6y2w6s.jpg") !important;}');
	// Change the name in the tooltip
	document.body.innerHTML= document.body.innerHTML.replace("Soy Lisa, tu vecina. Te deseo un buen día. ¡Hora de relajarse!","Soy Andres Lopez, vamos a reirnos hasta más no poder para que seas más feliz!");
}
function replace_Emma()
{
	GM_addStyle('.extended.work_bg  {background-image:url("http://i38.tinypic.com/15eehbs.jpg") !important;}');
	// Change the name in the tooltip
	document.body.innerHTML= document.body.innerHTML.replace("I'm Emma, the company's secretary. You look like you will be very productive today!","Quiuvo pues,a trabajar, trabajar y trabajar! Y no me vaya a trabajar con bajita vitalidad que lo hecho. Y encuentre pues otro.");
}
function replace_Lana()
{
	GM_addStyle('.extended.train_bg  {background-image:url("http://i37.tinypic.com/9764jn.jpg") !important;}');
	// Change the name in the tooltip
	document.body.innerHTML= document.body.innerHTML.replace("Soy Lana. ¿Preparado/a para unas cuantas horas de entrenamiento militar? Pegarás más fuerte si entrenas todos los días.","Haber soldado,lo veo muy flojo, no haces ni cosquillas! Hay que entranar bastante,1000 lagartijas y 50 vueltas al campo. FMC Rules!");
}
function replace_Gina()
{
	GM_addStyle('.extended.learn_bg  {background-image:url("http://i37.tinypic.com/5qi5x.jpg") !important;');
	// Change the name in the tooltip
	document.body.innerHTML= document.body.innerHTML.replace("Soy Gina, tu tutora. Se te ve en buena forma hoy. ¿Estás listo/a para estudiar unas cuantas horas? Sería genial para tu carrera profesional y tu sueldo.","Soy un nerd que te ayudará en tus estudios, me dijeron que andabas muy flojo, sacar 1 de 10 es muy mal puntaje, vas a perder el semestre. ESTUDIE HABER!");
}

// Por si lo necesito xD
function MsgBox (textstring) {
alert (textstring) }

//La función principal
function Main() {

	var subURL = currURL.substr(BASE_URL.length);
	LOCALE = subURL.substring(0, 2) + '/';
	BASE_URL += LOCALE;
	subURL = currURL.substr(BASE_URL.length);
	
	//Acá irían las página con imágenes para reemplazar
	var pagesFunctions = [
		//{p: 'badges',	 	f: ModifyTools},
		//{p: 'rss_menu',  	f: ModifyTools},
		{p: 'work',			f: replace_Emma},
		{p: 'train',		f: replace_Lana},
		{p: 'study',		f: replace_Gina},
		{p: 'entertain',	f: replace_Lisa}
	];
	
	pagesFunctions.forEach(function(v) {
		if ((subURL.substr(0, v.p.length) == v.p))
			v.f();
			});	
};

//Llamando a la función...
window.addEventListener('load',Main(), false);