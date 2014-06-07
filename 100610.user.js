// ==UserScript==
// This is a Greasemonkey user script.
//
// To install in firefox, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
//
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Doit.im add links Script", and click Uninstall.
//
// For Chrome install Blank Canvas Script handler add-on 
//
// 
// @name           Doit.im add links Script
// @description    turns links found in doit.im items into html links, & stops truncating item text
// @author         Claire Martinez
// @include        https://i.doit.im/*
// @include        https://beta.doit.im/*
// @version        2.0
// 

// ==/UserScript==


$ = unsafeWindow.jQuery;

//runs a function in the document context
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
  script.setAttribute("type", "application/javascript");;
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);

  //comment out to debug
  document.body.removeChild(script);
}


// in doit.im pages turns text containing urls to links	
function fixupTaskLinks()
{
	function replaceURLWithHTMLLinks(text) {
 	 	var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
 	 	return text.replace(exp,"<a href='$1'>$1</a>"); 
	}

	function makeLinks(){
		$('.title span').each(
		function(indx,elt){
			var mytxt = jQuery(elt).html(); 
			mytxt = mytxt.replace(/\"/g, "");
			if (mytxt.search(/\<a href/) == -1)
				$(elt).html(replaceURLWithHTMLLinks(mytxt))
		});
	}

	//make links on initial page and all task updates
	jQuery(document).ajaxComplete(function(ev,req,opt) 	
		{			
			if (opt.url.search(/tasks/) != -1 || 
			    opt.url.search(/today_resources/) != -1)
				setTimeout(makeLinks, 500);
		})
}


// call the code to turn txt to links
contentEval(fixupTaskLinks);


// redefines cutText to stop the truncating and ellipsing
function noTrucate(){
	var oldcut = Do.cutText;
	Do.cutText = function(c){return c};
}
setTimeout(function(){
	contentEval(noTrucate);
}, 200)