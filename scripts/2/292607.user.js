// ==UserScript==
// @name        EuroControl EAD Basic no Java
// @namespace   mamane.lu
// @description Access EuroControl EAD Basic without Java
// @include     http://www.ead.eurocontrol.int/publicuser/protect/pu/main.jsp*
// @version     2
// ==/UserScript==

// this is where we are going to build our new script
var scriptCode = new Array();
    
// here is the build of the new script, one line at a time
scriptCode.push('function processJavaOk(isJavaOk) {');
scriptCode.push('  doRedirect();');
scriptCode.push('}');
    
// now, we put the script in a new script element in the DOM
var script = document.createElement('script');    // create the script element
script.innerHTML = scriptCode.join('\n');         // add the script code to it
scriptCode.length = 0;                            // recover the memory we used to build the script
    
// 1. finds the first <head> tag on the page
// 2. add the new script just before the </head> tag
document.getElementsByTagName('head')[0].appendChild(script); 

