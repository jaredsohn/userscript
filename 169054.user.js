// ==UserScript==
// @name        galaxieVue
// @namespace   vulca
// @include     http://*.ogame.*/game/index.php?page=galaxy
// @version     1
// ==/UserScript==

var numUni = location.href.split('/')[2];
var serveur       = document.getElementsByName('ogame-universe')[0].content;

var aff='<br/><br/><br/><center><br/><a id="G1" href="#"><img width="150px" src="http://d1jqu7g1y74ds1.cloudfront.net/wp-content/uploads/2010/06/Spiral-Galaxy-M81-580x362.jpg"></a>                                '                
aff+='.   <a id="G2" href="#"><img width="150px" src="http://topwalls.net/wallpapers/2012/03/ring-galaxy-485x728.jpg"></a>'
aff+='   <a id="G3" href="#"><img width="150px" src="http://images6.alphacoders.com/331/331048.jpg"></a>'
aff+='   <br/><a id="G4" href="#"><img width="150px" src="http://strangepaths.com/wp-content/uploads/2007/01/sombrero_spitzer2.jpg"></a>'
aff+=' <a id="G5" href="#"><img width="150px" src="http://www.linternaute.com/science/espace/photo/le-trocadero-se-met-aux-couleurs-de-l-univers/image/forme-galaxie-496958.jpg"></a>'
aff+='   <a id="G6" href="#"><img width="150px" src="http://wallpoper.com/images/00/43/61/84/blue-spiral-galaxy_00436184.jpg"></a>'
aff+='  <br/> <a id="G7" href="#"><img width="150px" src="http://media02.hongkiat.com/ww-space-galaxy-wallpapers/androdmeda-galaxy-hd.jpg"></a>'
aff+='  <a id="G8" href="#"><img width="150px" src="http://media02.hongkiat.com/ww-space-galaxy-wallpapers/Light-of-Billions.jpg"></a>'
aff+='   <a id="G9" href="#"><img width="150px" src="http://media02.hongkiat.com/ww-space-galaxy-wallpapers/Andromeda-Galaxy.jpg"></a></center>'

document.getElementById('inhalt').innerHTML=aff;


document.getElementById("G1").addEventListener("click", function(event) 
{
	var aff2='<br/><br/><br/><center><br/><a href="http://'+serveur+'/game/index.php?page=galaxy&galaxy=1&system=1"><img width="100px" src="http://lepiller.free.fr/images/formation/systeme.jpg"></a>';
	aff2+='<a href="http://'+serveur+'/game/index.php?page=galaxy&galaxy=1&system=2"><img width="100px" src="http://lepiller.free.fr/images/formation/systeme.jpg"></a>'
	aff2+='<a href="http://'+serveur+'/game/index.php?page=galaxy&galaxy=1&system=3"><img width="100px" src="http://lepiller.free.fr/images/formation/systeme.jpg"></a>'
	aff2+='<a href="http://'+serveur+'/game/index.php?page=galaxy&galaxy=1&system=4"><img width="100px" src="http://lepiller.free.fr/images/formation/systeme.jpg"></a>'				
	aff2+='<a href="http://'+serveur+'/game/index.php?page=galaxy&galaxy=1&system=5"><img width="100px" src="http://lepiller.free.fr/images/formation/systeme.jpg"></a>'
	aff2+='<a href="http://'+serveur+'/game/index.php?page=galaxy&galaxy=1&system=6"><img width="100px" src="http://lepiller.free.fr/images/formation/systeme.jpg"></a>'
	aff2+='<a href="http://'+serveur+'/game/index.php?page=galaxy&galaxy=1&system=7"><img width="100px" src="http://lepiller.free.fr/images/formation/systeme.jpg"></a>'
	aff2+='<a href="http://'+serveur+'/game/index.php?page=galaxy&galaxy=1&system=8"><img width="100px" src="http://lepiller.free.fr/images/formation/systeme.jpg"></a></center>'
	
	
	document.getElementById('inhalt').innerHTML=aff2;
}, true);

document.getElementById("G2").addEventListener("click", function(event) 
{
	var aff2='<br/><br/><br/><center><br/><a href="http://'+serveur+'/game/index.php?page=galaxy&galaxy=2&system=2"><img width="100px" src="http://lepiller.free.fr/images/formation/systeme.jpg"></a>';
	aff2+='<a href="http://'+serveur+'/game/index.php?page=galaxy&galaxy=2&system=2"><img width="100px" src="http://lepiller.free.fr/images/formation/systeme.jpg"></a>'
	aff2+='<a href="http://'+serveur+'/game/index.php?page=galaxy&galaxy=2&system=3"><img width="100px" src="http://lepiller.free.fr/images/formation/systeme.jpg"></a>'
	aff2+='<a href="http://'+serveur+'/game/index.php?page=galaxy&galaxy=2&system=4"><img width="100px" src="http://lepiller.free.fr/images/formation/systeme.jpg"></a>'				
	aff2+='<a href="http://'+serveur+'/game/index.php?page=galaxy&galaxy=2&system=5"><img width="100px" src="http://lepiller.free.fr/images/formation/systeme.jpg"></a>'
	aff2+='<a href="http://'+serveur+'/game/index.php?page=galaxy&galaxy=2&system=6"><img width="100px" src="http://lepiller.free.fr/images/formation/systeme.jpg"></a>'
	aff2+='<a href="http://'+serveur+'/game/index.php?page=galaxy&galaxy=2&system=7"><img width="100px" src="http://lepiller.free.fr/images/formation/systeme.jpg"></a>'
	aff2+='<a href="http://'+serveur+'/game/index.php?page=galaxy&galaxy=2&system=8"><img width="100px" src="http://lepiller.free.fr/images/formation/systeme.jpg"></a></center>'
	
	
	document.getElementById('inhalt').innerHTML=aff2;
}, true);