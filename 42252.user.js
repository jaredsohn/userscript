// ==UserScript==
// @name         Speed Racing Bot 4.03 RC1 [by Kovajj (C) 2009]
// @description  Facebook Speed Racing Bot
// @author       Kovajj
// @include      *facebook*speedracer*
// ==/UserScript==


var racerealcar = "1"; // race real car? 1 - yes / 0 - no !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


var seznamrealcars = new Array("293012","291659","291662","293471","293472","293473","293474","292826","292829","292827"); // Toyota Prius (3) & Honda Fit (4) & Ford Focus (3) // random new car !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



var nahodnyrealcar = seznamrealcars[Math.floor(Math.random()*seznamrealcars.length)];




document.title = document.title + " (>>>>>>>>>> bot by Kovajj <<<<<<<<<<)";




if (document.body.innerHTML.indexOf("No Friend Selected") > 0) {
window.location.href = "http://apps.facebook.com/speedracer/friends.php?ref=oem";
}









if ((document.body.innerHTML.indexOf("You have reached the maximum") > 0 || document.body.innerHTML.indexOf("You have run out of fuel") > 0) && racerealcar == "1") {
window.location.href = "http://apps.new.facebook.com/speedracer/race.php?trim=" + nahodnyrealcar;
}


if (document.body.innerHTML.indexOf("You can only race each trim") > 0 && racerealcar == "1") {
window.location.href = "http://apps.new.facebook.com/speedracer/race.php?trim=" + nahodnyrealcar;
}



















var adresa1 = "http://apps.new.facebook.com/speedracer/?ref=side"; // z tadyma presmeruj na vyber souperu
var adresa2 = "http://apps.new.facebook.com/speedracer/race.php?ref=home";
var adresa3 = "http://apps.new.facebook.com/speedracer/race.php";
var adresa4 = "http://apps.new.facebook.com/speedracer/?ref=side&ref=ts";




if (window.location.href == adresa1 || window.location.href == adresa2 || window.location.href == adresa3 || window.location.href == adresa4) {
window.location.href = "http://apps.facebook.com/speedracer/friends.php?ref=oem";
}



if (document.body.innerHTML.indexOf("Race result against a 2008") > 0 && racerealcar == "1") {
window.location.href = "http://apps.new.facebook.com/speedracer/race.php?trim=" + nahodnyrealcar;
}






if (window.location.href == "http://apps.facebook.com/speedracer/friends.php?ref=oem") {




	var ccc = document.body.innerHTML.split('<a class="inputsubmit" href="race.php?friend=');
	var pocetsouperu = ccc.length - 1;
	var pole = "";

	for (i=1; i <= pocetsouperu; i++) {
	var pole = pole + ccc[i].substr(0, 10) + ","; 
	}


var promenna = pole.split(',');
var nahodnyracer = promenna[Math.floor(Math.random()*promenna.length)];
window.location.href = "http://apps.new.facebook.com/speedracer/race.php?friend=" + nahodnyracer + "&ref=friends";
}





if (window.location.href.indexOf("race.php?friend=") > 0 || window.location.href.indexOf("race.php?trim=") > 0) {
document.forms[1].submit();}




if (window.location.href.indexOf("race.php?trim=") > 0 && document.body.innerHTML.indexOf("against new cars for today") > 0 && racerealcar == "1") {
window.location.href = "http://www.seznam.cz/"; // ma se to tady zastavit, bohuzel to tak nedela :-(((((((((((((
alert("You have raced all 21 races against your friends and also all 15 races against new cars.\nTry it again tommorow! ;-)\n\n\nKovajj");
}



