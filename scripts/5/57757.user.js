// ==UserScript==
// @name        izismil
// @namespace   http://userscripts.org/users/86245
// @include     http://izismile.com/*
// @version     1
// ==/UserScript==

//don't run the script more than once by page
if (window.top != window.self) return;

var css ='.tropGrand{cursor:-Moz-Zoom-In;}';
GM_addStyle(css)
var timer,vitesse=1200,titre=document.title;
var conteurImage=1;
var image=(document.querySelectorAll('.article_head h2,.big_foto_block h1').length>1)?document.querySelectorAll('.article_head h2,.big_foto_block h1'):document.querySelectorAll('.news_div img');

document.querySelector(".all").style.margin = "0 15px";
for (var i=0; i<image.length;i++){
	if (image[i].nodeName=='IMG'&&image[i].src.indexOf('/templates/')==-1&&image[i].src.indexOf('/engine/')==-1){
		image[i].id="a"+conteurImage;
		conteurImage++;
			var s = image[i].src;
	   s = s.replace("img.","");
	   s = s.replace("/640/","/1000/");
	   s = s.replace("_640_","_");
	   image[i].src = s;
	   image[i].setAttribute('onClick','this.style.height="";')
	}
	else if (image[i].nodeName=='H2'||image[i].nodeName=='H1'){
		image[i].id="a"+conteurImage;
		conteurImage++;
	}

}

document.addEventListener("DOMMouseScroll", well, true);
document.addEventListener("keydown", toucheApui, true);
window.addEventListener("blur", toucheRelach, true);
var destro = document.querySelectorAll(".right_block,.tools,.sordering, .box");
for (var i = 0; i < destro.length; i++){
    destro[i].remove();
}
//prévent click link
var lienimage = document.querySelectorAll('.imgbox > a');
for (var i = 0; i < lienimage.length; i++){
    if (lienimage[i].parentNode.nodeName != "H1")
        lienimage[i].outerHTML = lienimage[i].innerHTML
}

function well (e){
	defil (Math.abs(e.detail)/e.detail,e);
}

function toucheRelach (){
	clearInterval(timer);
	document.addEventListener("DOMMouseScroll", well, true);
	document.removeEventListener("DOMMouseScroll", vitesseWell, true);
	document.title=titre;
}

function vitesseWell (e){
	clearInterval(timer);
	vitesse=vitesse+100*e.detail
	document.title=vitesse;
	timer = window.setInterval(function (){defil2(1);},vitesse);
	e.preventDefault();
}


function toucheApui (e){
	if(e.ctrlKey&&e.altKey){
		toucheRelach ();
		timer = window.setInterval(function (){defil2(1);},vitesse);
		document.removeEventListener("DOMMouseScroll", well, true);
		document.addEventListener("DOMMouseScroll", vitesseWell, true);
		document.addEventListener("click", toucheRelach, true);
		document.title=vitesse;
	}
	//if (!accueil&&shiftKey&&e.which==68)favoris();//shtif + d
	//if (shiftKey&&e.which==65)loraMask();//shtif + d
	else if (e.which==39||e.which==40){defil(1,e);}
	else if (e.which==37||e.which==38){defil(-1,e);}
	else if (e.which==36)window.location.hash=0;
	else if (e.which==35)window.location.hash=conteurImage;
	//alert(e.which)
}

function defil  (avAr,event){
	if (event.altKey){
		 window.scrollBy(0,avAr*100);
		 event.preventDefault();
		 return;
	}
	avAr=parseInt(avAr);
	var ancre=(window.location.hash)?parseInt(window.location.hash.substring(2)):0;
	ancre+=avAr;
	if (0<ancre&&ancre<conteurImage){
		var imageAct=document.querySelector("#a"+ancre);
		if (imageAct&&imageAct.nodeName=='IMG'&&imageAct.height>window.innerHeight){
			imageAct.height=window.innerHeight;
			imageAct.className='tropGrand';
		}
		window.location.hash='a'+ancre;
		event.preventDefault();
	}
}

function defil2  (avAr){
	var ancre=(window.location.hash)?parseInt(window.location.hash.substring(2)):0;
	ancre+=avAr;
	if (0<ancre&&ancre<conteurImage){
		var imageAct=document.querySelector("#a"+ancre);
		if (imageAct && imageAct.nodeName=='IMG'&&imageAct.height>window.innerHeight){
			imageAct.height=window.innerHeight;
			imageAct.className='tropGrand';
		}
		window.location.hash="a"+ancre;
	}
	else toucheRelach ();
}

