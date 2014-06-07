// ==UserScript==
// @name           eRep Flavor Package version .1
// @namespace      http://www.erepublik.com/en/citizen/profile/1309629 //[http://www.erepublik.com/en/citizen/profile/3345790]
// @include        http://economy.erepublik.com/*
// @require		     http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// ==/UserScript==

//Special thanks to JCFC http://www.erepublik.com/en/citizen/profile/1618260
//who wrote the original version of this greasemonkey script http://userscripts.org/scripts/show/81311
//This is JGutenberg's crappy adaptation to include historic figures rather than male sluts instead. 

//URL settings
var currURL = location.href;
var arrURL = currURL.split('/');
BASE_URL = arrURL[0] + '/' + arrURL[1] + '/' + arrURL[2] + '/';


// The fun stuff...
function replace_Lisa()
{
	GM_addStyle('.extended.entertainment_bg  {background-image:url("http://i1037.photobucket.com/albums/a455/JGutenberg/nice-bedroom.jpg") !important;}');
	// Change the name in the tooltip
	document.body.innerHTML= document.body.innerHTML.replace("Lisa","This is your bedroom. How long do you wish to sleep?");
}
function replace_Emma()
{
	GM_addStyle('.extended.work_bg  {background-image:url("http://www.maispace.com/ac/images/office-furniture-01.jpg") !important;}');
	// Initial message
	document.body.innerHTML= document.body.innerHTML.replace("Hi JGutenberg! I'm Emma, the company's secretary. You look like you will be very productive today!","This is your office.");
}
function replace_Lana()
{
	GM_addStyle('.extended.train_bg  {background-image:url("http://i1037.photobucket.com/albums/a455/JGutenberg/bootcamp.jpg") !important;}');
	// Change the name in the tooltip
	document.body.innerHTML= document.body.innerHTML.replace("You cannot train as you do not have enough hours.","Training closed hours ago soldier!");
document.body.innerHTML= document.body.innerHTML.replace("Welcome, JGutenberg! I am Lana. Ready for a few hours of military training? You will deal more damage if you train every day.","This is bootcamp soldier! Get down an gimme 20!");

}
function replace_Gina()
{
	GM_addStyle('.extended.learn_bg  {background-image:url("http://i1037.photobucket.com/albums/a455/JGutenberg/eRepLibrary.jpg?") !important;');
	// Initial message
	document.body.innerHTML= document.body.innerHTML.replace("Hi JGutenberg! I am Gina, your tutor. You seem to be in great shape today. Ready for a few hours of studying? It will be great for your career and salary.","Welcome to the University of Ireland Library. Please remain quiet at all times.");
//Not enough hours
	document.body.innerHTML= document.body.innerHTML.replace("You cannot learn as you do not have enough hours.","Sorry, the Library is closed. Please come back tomorrow.");
}

// Other crap...
function MsgBox (textstring) {
alert (textstring) }

//Main function
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