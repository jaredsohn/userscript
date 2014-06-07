// ==UserScript==
// @name          Hide "The Full Page Ad"  v1.2 by Wim Claeys
// @namespace     http://wclaeys.blogspot.com
// @description	  Hides Adbrites "Full Page Ad"
// @version 1.2
// @include	  http://www.adbrite.com/mb/country_tabs.php
// ==/UserScript==
 
  function blockAdbrite(elt) {
	    if (elt.hasAttribute('id')) {
		    if (match = elt.getAttribute('id').match(/AdBriteIntermissionOuterSpan_(.*)/i)) {
			setTimeout(function(){ hide_it(elt.id);  },2300);
			//to be sure!
			setTimeout(function(){ hide_it(elt.id);  },3000);

		    }
	    }
  }

  function  hide_it(id) {
	  	if(!done){
	  		var node = document.getElementById(id);
			
			var form = document.createElement('form');
			var input = document.createElement('input');
			input.setAttribute("type", "button");
			input.setAttribute("id", the_ID);
			input.setAttribute("value", "DELETE ADBRITE");
			input.setAttribute("onclick", "ADBRITE.INTERMISSION.fade_out_interval = function (){};ADBRITE.INTERMISSION.change_opacity = function () {};ADBRITE.INTERMISSION.hide_intermission(); return false;");

			form.appendChild(input);
	 		node.appendChild(form);
	  		
	  		document.getElementById(the_ID).click()
	  		done = true;
	  	}	    		
  }
  var done = false;
  var the_ID = "button_adbrite_go";
  
  document.addEventListener('DOMNodeInserted', function(event) { blockAdbrite(event.target); }, true);