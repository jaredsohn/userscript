// ==UserScript==
// @name           Newsarama JScleaner
// @description    Turns Newsarama javascript links into regular links
// @include        http://www.newsarama.com/*
// @date           2006-01-19
// @version        0.1
// @GM_version     0.6.4
// ==/UserScript==

//based on Fix vgames.co.il links and images links from grease.daniboy@antichef.com

ahrefs = document.getElementsByTagName('a');
//array de elementos <a>

for (var i = 0; i < ahrefs.length; i++) {
//contador: se comprueba el cÃ³digo entre corchetes para todo elemento de ahrefs

    onclickString = ahrefs[i].getAttribute('onclick');
    hrefString = ahrefs[i].getAttribute('href');
    //para el elemento i en el array ahrefs, obtener 2 variables
    // con el valor de los atributos href y onclick respectivamente
    
    var is_JSlink = hrefString.indexOf('javascript:;');

    //comprobar si el atributo href del enlace contiene el texto javascript:;
    if (is_JSlink >= 0) {
    
		//es un enlace de javascript
		var is_MMopen = onclickString.indexOf('MM_openBrWindow');
		if (is_MMopen >= 0) {
		
			//el enlace contiene MM_openBrWindow en el atributo onclick
			//obtener la direccion del enlace autentica
			var realhrefString = onclickString.slice(is_MMopen + 17, onclickString.length -2);
			//cortar desde donde empieza MM_openBrWindow sumando 17
			// (la longitud de MM_openBrWindow(' es 17, se supone que is_MMopen sera 0)
			//hasta el antepenÃºltimo caracter (longitud -1 seÃ±ala el penÃºltimo, que no
			//se coge; acaba en ')
			ahrefs[i].setAttribute('href', realhrefString);
			//sustituir el argumento href por la direccion real
			ahrefs[i].setAttribute('onclick', "");
			//dejar los onclick vacios
			
		}
		
    }
    
    
}