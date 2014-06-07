// ==UserScript==
// @name          5ips cleanup
// @namespace     http://zhumingvictor.com/greasemonkey/
// @description   cleanup 5ips page
// @include       *5ips*
// ==/UserScript==
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
contentEval( function() {
	if(typeof Prototype != 'object'){
	   var script = document.createElement('script');
	   script.src = 'http://prototypejs.org/assets/2009/8/31/prototype.js';
	   document.getElementsByTagName('head')[0].appendChild(script);
        }
	//------------------------------------------------------------
	// suppress all error messages and do nothing with them:
	//
	window.onerror = function () {return true;}
	
	$$('div.main > div').each(function (div){
		if(!div.hasClassName('tong') || div.readAttribute('align') == 'center'){
			div.remove();
		}
	});
	$$('div.bottom').each(function(div){
		div.nextSiblings().each(function(sibling){sibling.remove()});
		div.remove();
	});
	$$('a[target="_blank"]').each(function(a){a.remove();});	
	
	$$('body > div').each(function (div){
		if(!div.hasClassName('main')){
			div.remove();
		}
	});
	
	$$('div.main > div.tong > div')[2].remove();
	$$('body script')[0].remove();
	
	$$('body')[0].style.background = 'none';
	$$('div.tong')[0].style.width = 'auto';
	
	$$('body').observ('mouseover', function(){
		$$('body > div').each(function (div){
			if(!div.hasClassName('main')){
				div.remove();
			}
		});	
	});
	

} );

//------------------------------------------------------------
