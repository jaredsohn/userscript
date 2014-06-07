// ==UserScript==
// @name          Ogr KSU
// @namespace     mat
// @description   Ogr KSU
// @include       https://ogrenci.ksu.edu.tr/*
// ==/UserScript==

function addCss(cssString) {
	var head = document.getElementsByTagName('head')[0];
	var newCss = document.createElement('style');
	newCss.type = "text/css";
	newCss.innerHTML = cssString;
	head.appendChild(newCss);
}

addCss ('* { font-family: Arial,Helvetica,Tahoma ! important; }'); 

var scriptCode = new Array();   // this is where we are going to build our new script

// here's the build of the new script, one line at a time
scriptCode.push('  function menuplayd(gelen){'       		 		);
scriptCode.push('  AjaxMgr.refreshAreas({'                   		);
scriptCode.push('  actionName     : \'action_ogrdk\''		 		);
scriptCode.push('  ,targetAreas   : \'ana_target\''  		 		);
scriptCode.push('  ,requestParams : {SECDONEM:20112,ONAYLIMI:1}' 	);
scriptCode.push('   ,busyImage     : \'BI1\'});'  		 			);
scriptCode.push('}'                                 );

// now, we put the script in a new script element in the DOM
var script = document.createElement('script');    // create the script element
script.innerHTML = scriptCode.join('\n');         // add the script code to it
scriptCode.length = 0;                            // recover the memory we used to build the script

// this is sort of hard to read, because it's doing 2 things:
// 1. finds the first <head> tag on the page
// 2. adds the new script just before the </head> tag
document.getElementsByTagName('head')[0].appendChild(script); 
  
  
/*  
var menuCode = new Array();
menuCode.push('<h4>My menu</h4>');
menuCode.push('<li>Home</li>');
menuCode.push('<li>Forum</li>');
var menu = document.createElement('div');
menu.id = 'cheatsheet';
menu.innerHTML = menuCode.join('n');
menuCode.length = 0;
document.body.insertBefore(menu, document.body.lastChild);        
*/     
        
        
  
  
  
  
  
  
  
  
  