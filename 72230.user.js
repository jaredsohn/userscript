// ==UserScript==
// @name           fermodif
// @namespace      pertur
// @include        http://*.tuenti.com/*
// ==/UserScript==

caja = document.createElement("div");
caja.setAttribute("id","caja");





botonpersonalizar = document.createElement("button");
botonpersonalizar.appendChild(document.createTextNode("\u00a0\u00a0\u00a0PERSONALIZAR\u00a0\u00a0\u00a0"));
botonpersonalizar.setAttribute("onclick",function(){menu()});
botonpersonalizar.addEventListener("click", function(){menu()}, true);
botonpersonalizar.setAttribute ('style', 'border-width: 2px; border-style: solid; border-color:red; font-size: 15px; color:#666666;  background-color: #FEFEFE;');

botonxat = document.createElement("button");
botonxat.appendChild(document.createTextNode("\u00a0\u00a0\u00a0CHAT\u00a0\u00a0\u00a0"));
botonxat.setAttribute("onclick",function(){xat()});
botonxat.addEventListener("click", function(){xat()}, true);
botonxat.setAttribute ('style', 'border-width: 2px; border-style: solid; border-color:red; font-size: 15px; color:#666666;  background-color: #FEFEFE;');

botonradios = document.createElement("button");
botonradios.appendChild(document.createTextNode("\u00a0\u00a0\u00a0RADIOS\u00a0\u00a0\u00a0"));
botonradios.setAttribute("onclick",function(){radios()});
botonradios.addEventListener("click", function(){radios()}, true);
botonradios.setAttribute ('style', 'border-width: 2px; border-style: solid; border-color:red; font-size: 15px; color:#666666;  background-color: #FEFEFE;');

botonjuegos = document.createElement("button");
botonjuegos.appendChild(document.createTextNode("\u00a0\u00a0\u00a0JUEGOS\u00a0\u00a0\u00a0"));
botonjuegos.setAttribute("onclick",function(){juegos()});
botonjuegos.addEventListener("click", function(){juegos()}, true);
botonjuegos.setAttribute ('style', 'border-width: 2px; border-style: solid; border-color:red; font-size: 15px; color:#666666;  background-color: #FEFEFE;');

botonautor = document.createElement("button");
botonautor.appendChild(document.createTextNode("\u00a0\u00a0\u00a0AUTOR Y CONTACTO\u00a0\u00a0\u00a0"));
botonautor.setAttribute("onclick",function(){autor()});
botonautor.addEventListener("click", function(){autor()}, true);
botonautor.setAttribute ('style', 'border-width: 2px; border-style: solid; border-color:red; font-size: 15px; color:#666666;  background-color: #FEFEFE;');

caja.appendChild(botonpersonalizar);
caja.appendChild(botonxat);
caja.appendChild(botonradios);
caja.appendChild(botonjuegos);
caja.appendChild(botonautor);
document.getElementById("css_monitors").appendChild(caja);





function xat(){
	if (document.getElementById('divxat') == null){
		divxat = document.createElement("div");
		divxat.setAttribute("id","divxat");
		divxat.setAttribute("class","container");
		divxat.setAttribute("style","border-width: 8px; border-style: solid; border-color:red; text-align: right; padding: 15px; position: absolute; display: block; z-index: 50; background-color: black !important;");


		botonxatpestaña = document.createElement("button");
		botonxatpestaña.appendChild(document.createTextNode("Abrir en una nueva pestaña"));
		botonxatpestaña.setAttribute("onclick",function(){xatpestaña()});
		botonxatpestaña.addEventListener("click", function(){xatpestaña()}, true);
botonxatpestaña.setAttribute ('style', 'border-width: 2px; border-style: solid; border-color:red; font-size: 15px; color:#666666;  background-color: #FEFEFE;');

		divxat.appendChild(botonxatpestaña);

		canvas=document.getElementById('canvas');
		canvas.parentNode.insertBefore(divxat, canvas);
		botonocultarxat = document.createElement("button");
		botonocultarxat.appendChild(document.createTextNode("Ocultar"));
		botonocultarxat.setAttribute("onclick",function(){ocultarxat()});
		botonocultarxat.addEventListener("click", function(){ocultarxat()}, true);
botonocultarxat.setAttribute ('style', 'border-width: 2px; border-style: solid; border-color:red; font-size: 15px; color:#666666;  background-color: #FEFEFE;');
		divxat.appendChild(botonocultarxat); 
		botonnoxat = document.createElement("button");
		botonnoxat.appendChild(document.createTextNode("Cerrar"));
		botonnoxat.setAttribute("onclick",function(){noxat()});
		botonnoxat.addEventListener("click", function(){noxat()}, true);
botonnoxat.setAttribute ('style', 'border-width: 2px; border-style: solid; border-color:red; font-size: 15px; color:#666666;  background-color: #FEFEFE;');
		divxat.appendChild(botonnoxat);

axat = document.createElement("div");
		axat.setAttribute("id","axat");
		axat.setAttribute("class","container");
		
              
		axat.innerHTML += '<br><center><embed  wmode="transparent" src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="728" height="426" name="chat" FlashVars="id=91996224" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><img src="http://www.contadorgratis.es/count.php?elputopertur" border="0">';
divxat.appendChild(axat);
	


}else{
		if (document.getElementById('divxat').getAttribute("style").substring(78,79) == "-"){
			divxat.setAttribute("style","border-width: 8px; border-style: solid; border-color:red; text-align: right; padding: 15px; position: absolute; display: block; z-index: 50; background-color: black !important;");
			botonxat.removeChild(botonxat.firstChild);
			botonxat.appendChild(document.createTextNode("\u00a0\u00a0\u00a0CHAT\u00a0\u00a0\u00a0"));
		}else noxat();
	};
};
function noxat(){
	document.getElementById('canvas').parentNode.removeChild(document.getElementById('divxat'));
};
function ocultarxat(){
	divxat.setAttribute("style","text-align: right; padding: 5px; position: absolute; display: block; z-index: -1; background-color: black !important; visibility:hidden !important;");
	botonxat.removeChild(botonxat.firstChild);
	botonxat.appendChild(document.createTextNode("\u00a0\u00a0\u00a0CHAT(Oculto)\u00a0\u00a0\u00a0"));
};
function xatpestaña(){
	noxat();
	GM_openInTab('http://xat.com/tmas');
};





function radios(){
	if (document.getElementById('divradios') == null){
		divradios = document.createElement("div");
		divradios.setAttribute("id","divradios");
		divradios.setAttribute("class","container");
		divradios.setAttribute("style","border-width: 8px ; border-style: solid; border-color:red; text-align: right; padding: 15px; position: absolute; display: block; z-index: 50; background-color: black !important;");



		canvas=document.getElementById('canvas');
		canvas.parentNode.insertBefore(divradios, canvas);
		botonocultarradios = document.createElement("button");
		botonocultarradios.appendChild(document.createTextNode("Ocultar"));
		botonocultarradios.setAttribute("onclick",function(){ocultarradios()});
		botonocultarradios.addEventListener("click", function(){ocultarradios()}, true);
botonocultarradios.setAttribute ('style', 'border-width: 2px; border-style: solid; border-color:red; font-size: 15px; color:#666666;  background-color: #FEFEFE;');
		divradios.appendChild(botonocultarradios); 
		botonnoradios = document.createElement("button");
		botonnoradios.appendChild(document.createTextNode("Cerrar"));
		botonnoradios.setAttribute("onclick",function(){noradios()});
		botonnoradios.addEventListener("click", function(){noradios()}, true);
botonnoradios.setAttribute ('style', 'border-width: 2px; border-style: solid; border-color:red; font-size: 15px; color:#666666;  background-color: #FEFEFE;');
		divradios.appendChild(botonnoradios);

aradios = document.createElement("div");
		aradios.setAttribute("id","aradios");
		aradios.setAttribute("class","container");
		
              aradios.innerHTML += '<center><br><iframe  src="http://tmas.xp3.biz/radios.html" frameborder="0" framespacing="0" scrolling="auto" border="0" width=728 height=426></iframe></center>';
divradios.appendChild(aradios);



}else{
		if (document.getElementById('divradios').getAttribute("style").substring(78,79) == "-"){
			divradios.setAttribute("style","border-width: 8px ; border-style: solid; border-color:red; text-align: right; padding: 15px; position: absolute; display: block; z-index: 50; background-color: black !important;");
			botonradios.removeChild(botonradios.firstChild);
			botonradios.appendChild(document.createTextNode("\u00a0\u00a0\u00a0RADIOS\u00a0\u00a0\u00a0"));
		}else noradios();
	};
};
function noradios(){
	document.getElementById('canvas').parentNode.removeChild(document.getElementById('divradios'));
};
function ocultarradios(){
	divradios.setAttribute("style","text-align: right; padding: 5px; position: absolute; display: block; z-index: -1; background-color: black !important; visibility:hidden !important;");
	botonradios.removeChild(botonradios.firstChild);
	botonradios.appendChild(document.createTextNode("\u00a0\u00a0\u00a0RADIOS(Oculto)\u00a0\u00a0\u00a0"));
};








function juegos(){
	if (document.getElementById('divjuegos') == null){
		divjuegos = document.createElement("div");
		divjuegos.setAttribute("id","divjuegos");
		divjuegos.setAttribute("class","container");
		divjuegos.setAttribute("style","border-width: 8px; border-style: solid; border-color:red; text-align: right; padding: 15px; position: absolute; display: block; z-index: 50; background-color: black !important;");



		canvas=document.getElementById('canvas');
		canvas.parentNode.insertBefore(divjuegos, canvas);
		botonocultarjuegos = document.createElement("button");
		botonocultarjuegos.appendChild(document.createTextNode("Ocultar"));
		botonocultarjuegos.setAttribute("onclick",function(){ocultarjuegos()});
		botonocultarjuegos.addEventListener("click", function(){ocultarjuegos()}, true);
botonocultarjuegos.setAttribute ('style', 'border-width: 2px; border-style: solid; border-color:red; font-size: 15px; color:#666666;  background-color: #FEFEFE;');
		divjuegos.appendChild(botonocultarjuegos); 
		botonnojuegos = document.createElement("button");
		botonnojuegos.appendChild(document.createTextNode("Cerrar"));
		botonnojuegos.setAttribute("onclick",function(){nojuegos()});
		botonnojuegos.addEventListener("click", function(){nojuegos()}, true);
botonnojuegos.setAttribute ('style', 'border-width: 2px; border-style: solid; border-color:red; font-size: 15px; color:#666666;  background-color: #FEFEFE;');
		divjuegos.appendChild(botonnojuegos);

ajuegos = document.createElement("div");
		ajuegos.setAttribute("id","ajuegos");
		ajuegos.setAttribute("class","container");
		
              ajuegos.innerHTML += '<center><br><iframe  src="http://tmas.xp3.biz/juegos.html" frameborder="0" framespacing="0" scrolling="auto" border="0" width=728 height=426></iframe></center>';
divjuegos.appendChild(ajuegos);



}else{
		if (document.getElementById('divjuegos').getAttribute("style").substring(78,79) == "-"){
			divjuegos.setAttribute("style","border-width: 8px; border-style: solid; border-color:red; text-align: right; padding: 15px; position: absolute; display: block; z-index: 50; background-color: black !important;");
			botonjuegos.removeChild(botonjuegos.firstChild);
			botonjuegos.appendChild(document.createTextNode("\u00a0\u00a0\u00a0JUEGOS\u00a0\u00a0\u00a0"));
		}else nojuegos();
	};
};
function nojuegos(){
	document.getElementById('canvas').parentNode.removeChild(document.getElementById('divjuegos'));
};
function ocultarjuegos(){
	divjuegos.setAttribute("style","text-align: right; padding: 5px; position: absolute; display: block; z-index: -1; background-color: black !important; visibility:hidden !important;");
	botonjuegos.removeChild(botonjuegos.firstChild);
	botonjuegos.appendChild(document.createTextNode("\u00a0\u00a0\u00a0JUEGOS(Oculto)\u00a0\u00a0\u00a0"));
};







function autor(){
	if (document.getElementById('divautor') == null){
		divautor = document.createElement("div");
		divautor.setAttribute("id","divautor");
		divautor.setAttribute("class","container");
		divautor.setAttribute("style","border-width: 8px; border-style: solid; border-color:red; text-align: right; padding: 15px; position: absolute; display: block; z-index: 50; background-color: black !important;");



		canvas=document.getElementById('canvas');
		canvas.parentNode.insertBefore(divautor, canvas);
		botonocultarautor = document.createElement("button");
		botonocultarautor.appendChild(document.createTextNode("Ocultar"));
		botonocultarautor.setAttribute("onclick",function(){ocultarautor()});
		botonocultarautor.addEventListener("click", function(){ocultarautor()}, true);
botonocultarautor.setAttribute ('style', 'border-width: 2px; border-style: solid; border-color:red; font-size: 15px; color:#666666;  background-color: #FEFEFE;');
		divautor.appendChild(botonocultarautor); 
		botonnoautor = document.createElement("button");
		botonnoautor.appendChild(document.createTextNode("Cerrar"));
		botonnoautor.setAttribute("onclick",function(){noautor()});
		botonnoautor.addEventListener("click", function(){noautor()}, true);
botonnoautor.setAttribute ('style', 'border-width: 2px; border-style: solid; border-color:red; font-size: 15px; color:#666666;  background-color: #FEFEFE;');
		divautor.appendChild(botonnoautor);

aautor = document.createElement("div");
		aautor.setAttribute("id","aautor");
		aautor.setAttribute("class","container");
		
              aautor.innerHTML += '<center><br><iframe  src="http://tmas.xp3.biz/contacto.htm" frameborder="0" framespacing="0" scrolling="auto" border="0" width=728 height=426></iframe></center>';
divautor.appendChild(aautor);



}else{
		if (document.getElementById('divautor').getAttribute("style").substring(78,79) == "-"){
			divautor.setAttribute("style","border-width: 8px; border-style: solid; border-color:red; text-align: right; padding: 15px; position: absolute; display: block; z-index: 50; background-color: black !important;");
			botonautor.removeChild(botonautor.firstChild);
			botonautor.appendChild(document.createTextNode("\u00a0\u00a0\u00a0AUTOR Y CONTACTO\u00a0\u00a0\u00a0"));
		}else noautor();
	};
};
function noautor(){
	document.getElementById('canvas').parentNode.removeChild(document.getElementById('divautor'));
};
function ocultarautor(){
	divautor.setAttribute("style","text-align: right; padding: 5px; position: absolute; display: block; z-index: -1; background-color: black !important; visibility:hidden !important;");
	botonautor.removeChild(botonautor.firstChild);
	botonautor.appendChild(document.createTextNode("\u00a0\u00a0\u00a0AUTOR Y CONTACTO(Oculto)\u00a0\u00a0\u00a0"));
};




