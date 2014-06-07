// ==UserScript==
// @name        globalconstincl
// @namespace   globalconstincl
// @description test with global vars 
// @include     http://www.greasespot.net/*
// @version     1
// @grant		GM_log
// ==/UserScript==

/*
 * define global
 */
var vglobal1=1;			// global var
const cglobalconst1=10;	// global const

var gMyClass = new function(){
this.A="A";
this.B="B";
this.show=function(){
	str="\n";// string
	str+="this.A="+this.A+" this.B="+this.B+"\n";	// local  vars
	str+="vglobal1="+vglobal1+"\n";						// global var
	str+="cglobalconst1="+cglobalconst1;				// global const
	GM_log("gMyClass.show()"+str);
	}//show()	
}//gMyClass

/*
 * start after page loading finished
 */
window.addEventListener("load", function(e) {
	alert("startgMyClass.show()");	
	gMyClass.show();
	alert("result in console.log")
},false);
