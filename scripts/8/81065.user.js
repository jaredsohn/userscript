// ==UserScript== 
// @name          EOLHOYGAN 
// @version       0.3.1
// @namespace     -
// @description   HOYGANIZA HEOL
// @run-at 	  	  document-end
// @include       http://www.elotrolado.net/* 
// @exclude              

// ==/UserScript== 

function to_hoygan(str) {
	str=str.replace(/resistencia/gi, 'recistor');
	str=str.replace(/resistencias/gi, 'recistores');
	str=str.replace(/condensador/gi, 'capacitor');
	str=str.replace(/condensadores/gi, 'capacitores');
	str=str.replace(/potencia/gi, 'poder');
	str=str.replace(/(fuente de )alimentacion/gi, '$1poder');
	str=str.replace(/embrague/gi, 'clutch');
	str=str.replace(/embragar/gi, 'clutchear');
	str=str.replace(/ordenador/gi, 'la pesé');
	str=str.replace(/corriente/gi, 'caudal elctrico');
	str=str.replace(/conmutar/gi, 'suichear');
	str=str.replace(/conmutada/gi, 'suicheada');
	str=str.replace(/ojos/gi, 'ogos');
	str=str.replace(/diez/gi, 'dies');
	str=str.replace(/pero/gi, 'xo');
	str=str.replace(/conmutada/gi, 'suicheada');
	str=str.replace(/ os /gi, ' les ');
	str=str.replace(/telefono/gi, 'celular');
	str=str.replace(/el internet/gi, 'la internet');
	str=str.replace(/guay/gi, 'bakano');
	
	

	

	
	str=str.replace(/á/gi, 'a');
	str=str.replace(/é/gi, 'e');
	str=str.replace(/í/gi, 'i');
	str=str.replace(/ó/gi, 'o');
	str=str.replace(/ú/gi, 'u');
	//str=str.replace(/yo/gi, 'io');
	str=str.replace(/m([pb])/gi, 'n$1');
	str=str.replace(/qu([ei])/gi, 'k$1');
	str=str.replace(/ct/gi, 'st');
	str=str.replace(/cc/gi, 'cs');
	str=str.replace(/ll([aeou])/gi, 'y$1');
	//str=str.replace(/ya/gi, 'ia');
	//str=str.replace(/yo/gi, 'io');
	str=str.replace(/g([ei])/gi, 'j$1');
	str=str.replace(/^([aeiou][a-z]{3,})/gi, 'h$1');
	str=str.replace(/ ([aeiou][a-z]{3,})/gi, ' h$1');
	str=str.replace(/[zc]([ei])/gi, 's$1');
	str=str.replace(/z([aou])/gi, 's$1');
	str=str.replace(/c([aou])/gi, 'k$1');
	str=str.replace(/s([ei])/gi, 'c$1');
	str=str.replace(/b([aeio])/gi, 'vvv;$1');
	str=str.replace(/v([aeio])/gi, 'bbb;$1');
	str=str.replace(/(.)je/gi, '$1ge');
	str=str.replace(/ch([u])/gi, 'sh$1');
	//str=str.replace(/gu([ei]) /gi, 'g$1');
	str=str.replace(/vvv;/gi, 'v');
	str=str.replace(/bbb;/gi, 'b');
	str=str.replace(/oi/gi, 'oy');
	str=str.replace(/xp([re])/gi, 'sp$1');
	str=str.replace(/(^| )h([ae]) /gi, '$1$2 ');
	str=str.replace(/aho/gi, 'ao');
	str=str.replace(/a ver /gi, 'haber ');
	//str=str.replace(/ por /gi, ' x ');
	//str=str.replace(/ñ/gi, 'ny');
	//str=str.replace(/we/gi, 'güe');
	//str=str.replace(/bu([aeio]) /gi, 'w ');
	//str=str.replace(/gu([aeio]) /gi, 'g$1 ');
	str=str.replace(/,/gi, ' ');
	str=str.replace(/hola/gi, 'ola');
	str=str.replace(/gratis/gi, 'gratix');
	str=str.replace(/\n/gi, '<br>');
	return str.toUpperCase();
}

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null ){
		node = document;
	}
	if ( tag == null ){
		tag = '*';
	}
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}


function recorrerPosts(){

	var posts1 = getElementsByClass("post columfixed bg1");
	posts1=posts1.concat(getElementsByClass("post columfixed bg2"));
	posts1=posts1.concat(getElementsByClass("post pm"));
	posts1=posts1.concat(getElementsByClass("post bg1"));
	posts1=posts1.concat(getElementsByClass("post bg2"));
	
	var i;
	for(i=0;i<posts1.length;i++){
		reemplazar(posts1[i].getAttribute("id"));
	}
}


function reemplazar(id) {
   var post = document.getElementById(id);
   var contenido = getElementsByClass("content",post);
   var texto = contenido[0].innerHTML;
   

   var splittedText = texto.split(/<[^<>]*?>/);
   var obj = texto.match(/<[^<>]*?>/gi);
   texto = to_hoygan( splittedText[0] );
   
   for( var i=1; i<splittedText.length; i++ ){

      texto += obj[i-1] + to_hoygan( splittedText[i] );
   }
   
   contenido[0].innerHTML = texto;
}

recorrerPosts();