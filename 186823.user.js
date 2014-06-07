// ==UserScript==
// @name        Neige blog
// @author      Ilysoft
// @include     *://*.ilysoft.info/*
// @grant       none
// @Neige blogger
// @version     1
// ==/UserScript==

// Format jj/mm uniquement pour les dates de dÃ©but et fin d'activation du script
var dateDebut = "01/12"; // Date de dÃ©part
var dateFin = "31/01"; // Date d'arrÃªt (incluse)

var urlImage="http://img15.hostingpics.net/pics/232391floconn.png"; //url de l'image
$(document).ready(function(){
tombeImage(dateDebut,dateFin);
});


var images=new Array();
var nbImagesMax=120;
var nbImages=0;
var imagetimeout;
var majtimeout;
var scrollY=0;
function createImages() {
	var posDX=4+Math.random()*wScreen;
	var posDY=1+scrollY;
	idimage=images.length;
	var sizeimage=3+Math.random()*13;
	var image=createDiv(posDX,posDY,idimage,sizeimage);
	images[images.length]= new Array(image,posDX,posDY,sizeimage);
	nbImages++;
	imagetimeout= setTimeout("createImages()", 250);
}
function majImages() {
var incposy=1;
var limiteecran=(scrollY+hScreen)-3;
for (i=0; i<images.length; i++) {
var incposx=0;
incposy=parseInt(images[i][3]/3);
var sensposx=parseInt(1+Math.random()*3);
   switch (sensposx) {
   case 1: incposx= -1;
   break;
   case 2: incposx=0;
   break;
   case 3: incposx=1;
   }
  if (images[i][2]<limiteecran) { 
  var Fposx=images[i][1]+incposx;
  if (Fposx>wScreen) { Fposx=wScreen; }
  images[i][1]=Fposx;
  images[i][2]=images[i][2]+incposy;
  }
  else {
  var posDX=1+Math.random()*wScreen;
  images[i][1]=posDX;
  images[i][2]=scrollY;
    if (imagetimeout) {
	clearTimeout(imagetimeout);
    }
  }
  images[i][0].style.left=images[i][1]+"px";
  images[i][0].style.top=images[i][2]+"px";
}
  majtimeout=setTimeout("majImages()", 35);
}
function createDiv(posx,posy,id,sizeImage) {
  var div=document.createElement("div");
  var pzindex=1000+id;
  div.style.position="absolute";
  div.style.zIndex="10000"
  div.id="flc"+id;
  div.name="flc"+id;
  div.style.border="none";
  div.style.display="block";
  div.style.backgroundColor="transparent";
  div.style.left=posx+"px";
  div.style.top=posy+"px";  
  div.style.zindex=pzindex;
  document.body.appendChild(div);
  //document.getElementById('header').appendChild(div);
  var retour =document.getElementById("flc"+id);
  var imagetype="<img border='0' src='"+ urlImage + "' style='width:"+sizeImage+"px;' />";
  retour.innerHTML=imagetype;
  return (retour);
}
function tombeImage(dateDebut,dateFin) {
	$('body').css('height',$('html').height());
	if ((dateDebut != "") && (dateFin != "")) {
		var debutJour = dateDebut.substring(0,dateDebut.indexOf("/"));
		var debutMois = dateDebut.substring(dateDebut.indexOf("/")+1,dateDebut.length)-1;
		var finJour = dateFin.substring(0,dateFin.indexOf("/"));
		var finMois = dateFin.substring(dateFin.indexOf("/")+1,dateFin.length)-1;
		var date = new Date();
		var annee = date.getFullYear();
		if (finMois-debutMois < 0) {
			var annee2 = annee + 1 
		}
		else {
			var annee2 = annee
		}
		var dateDebut = new Date(annee,debutMois,debutJour)
		var dateFin = new Date(annee2,finMois,finJour)
		var dateFin = dateFin.setDate(dateFin.getDate() +1)
		if ((date > dateDebut) && (date < dateFin)) {
			wScreen=$("body").width() -17;
			hScreen=$("body").height() -17;
			createImages();
			majImages();
		}
	}
}
