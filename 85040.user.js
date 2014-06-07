// ==UserScript==
// @name            UAXFix
// @description        Arregla el portal de la uax
// @include         http://campus.uax.es/*
// @include         https://campus.uax.es/*
// ==/UserScript==
 
//Name:            UAXFix
//Version:         0.1
//Author:          Joaquin Moran 
//Last update :    29/04/2010
 
(function()
{

var scriptCode = new Array();   // this is where we are going to build our new script
   
    // here's the build of the new script, one line at a time
    scriptCode.push('function elegir(codigo,nombre) {');
    scriptCode.push('  if (codigo != ""){');
    scriptCode.push('    document.formulario.cod_apl_acl.value = codigo;');
    scriptCode.push('    document.formulario.nombre_apl.value = nombre;');
    scriptCode.push('    document.formulario.action = "pasa_entrada.php";');
    scriptCode.push('    document.formulario.target = "contenido";');
    scriptCode.push('    document.formulario.submit();');
    scriptCode.push('  }');
    scriptCode.push('}');
   
    // now, we put the script in a new script element in the DOM
    var script = document.createElement('script');    // create the script element
    script.innerHTML = scriptCode.join('\n');         // add the script code to it
    scriptCode.length = 0;                            // recover the memory we used to build the script
   
    // this is sort of hard to read, because it's doing 2 things:
    // 1. finds the first <head> tag on the page
    // 2. adds the new script just before the </head> tag
    document.getElementsByTagName('head')[0].appendChild(script);

 
})();