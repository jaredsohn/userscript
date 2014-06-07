// ==UserScript==
// @name           AutoKOC
// @namespace      AutoKOC
// @description    AutoKOC
// @include        http://*.kingdomsofcamelot.com/*main_src.php*
// ==/UserScript==

/*
Testing AutoKOC

*/

var AUTOKOC_MESSAGE_DIV_NAME = 'autokoc_div_messages'; 


function contentEval(source) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();'
  }

  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}


var m = document.getElementById('AUTOKOC_MESSAGE_DIV_NAME'); 

if (m != null){
    m.parentNode.removeChild(m);
}


		ml=document.createElement('div'); 

		ml.id='modal_msg_list'; 
		
		m = document.createElement('div'); 

		m.id = AUTOKOC_MESSAGE_DIV_NAME;

		m.style.position='absolute';
		m.style.right='0px';
		m.style.top='0px';
		m.style.width='100px';
                m.style.height='100px'
		m.style.zIndex='900000';
		m.style.border='5px solid #000';
		m.style.backgroundColor='#fee';


		
		var center=document.createElement('center'); 

		m.appendChild(center);
		m.appendChild(ml);
                
                m.style.display='block';

                document.body.appendChild(m);

				

GM_log("aha!");
var AutoKOC={
	SaveBarbs:function(e){
		GM_log("Added map node: " + e.target.id);
		GM_log(e.target.onmouseover.toString());
	},


	Listen:function() {
		var me=this;
		document.body.addEventListener('DOMNodeInserted',function(e) {
		//GM_log(e.target.className);
		if(e.target.className != null && e.target.className.indexOf("bcity") == 0 ) {
			// changed city
			setTimeout(function() {
				me.SaveBarbs(e);
			},0);
		} 
	},false);
},



}

AutoKOC.Listen();

