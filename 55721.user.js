
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          TFLN remove @
// @namespace     http://textsfromlastnight.com
// @description   Removes adds and reclaims space for posts
// @include       http://textsfromlastnight.com*
// ==/UserScript==

document.getElementById('advertisement').style.display='none';
document.getElementById('colad').style.display='none';
changecss("#col1",'width','70%');
changecss(".post_wrap",'width','100%');


//Thanks to Shawn Olson, for the following function, I have commented the change I made to his function.  Basically poorly formed Style sheet made it throw an error that I catch and discard.
//Copyright 2006-2008
//http://www.shawnolson.net
//If you copy any functions from this page into your scripts, you must provide credit to Shawn Olson & http://www.shawnolson.net
//*******************************************


	function changecss(theClass,element,value) {
	//Last Updated on June 23, 2009
	//documentation for this script at
	//http://www.shawnolson.net/a/503/altering-css-class-attributes-with-javascript.html
	 var cssRules;

	 var added = false;
	 for (var S = 0; S < document.styleSheets.length; S++){

 	 try{ // <- change form original function 
	 if (document.styleSheets[S]['rules']) {
	  cssRules = 'rules';
	 } else if (document.styleSheets[S].cssRules[0]) {
	  cssRules = 'cssRules';
	 } 
	

	  for (var R = 0; R < document.styleSheets[S][cssRules].length; R++) {
	   if (document.styleSheets[S][cssRules][R].selectorText == theClass) {
	    if(document.styleSheets[S][cssRules][R].style[element]){
	    document.styleSheets[S][cssRules][R].style[element] = value;
	    added=true;
		break;
	    }
	   }
	  }
	  if(!added){
	  if(document.styleSheets[S].insertRule){
			  document.styleSheets[S].insertRule(theClass+' { '+element+': '+value+'; }',document.styleSheets[S][cssRules].length);
			} else if (document.styleSheets[S].addRule) {
				document.styleSheets[S].addRule(theClass,element+': '+value+';');
			}
	  }
	  } // <- another change to original function
	  catch(e){  /* do nothing */ } // <- last chagne to original funciton
	 }
	}



