// ==UserScript==
// @name        AutoComplete ON
// @author      Sergio Abreu
// @namespace   http://software.sitesbr.net
// @description Turns autocomplete on, to allow firefox asking to save the website password
// @include     *
// @version     1
// ==/UserScript==

    window.addEventListener( "load", function(){
    
		if( document.forms){
			fos = document.forms;
			for( var i=0; i < fos.length; i++){
			
			     els = fos[i].elements;
			     for( var j=0; j < els.length; j++){
			          if( els[j].getAttribute("autocomplete"))
			              els[j].setAttribute("autocomplete", "On");
				}
			
			}
		
		}
    
    }, false);