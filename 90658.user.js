// ==UserScript==
// @name          Rolia Post Expander
// @namespace     http://zhumingvictor.com/greasemonkey/
// @description   Collapse an expand rolia posts
// @include       *rolia*
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
	function collapseOthers(){
    $$('#zoom li.mExpanded').each(function(li){
        expandLi(li, false);
    });
	}
	function expandLi(li, isExpand){
        li.style.fontWeight = isExpand ? 'bold' : 'normal';
	    li.nextSiblings().each(function(sibling){
	        if(sibling.tagName == 'UL'){
	            sibling.style.display= isExpand ? 'block' : 'none';
	        }
	        else if(sibling.tagName == 'P'){
	            throw $break;
	        }
	    });
	}
	$$('#zoom > ul > ul').each(function(ul){ul.style.display = 'none';});
	$$('#zoom > ul > li').each(
	function(li){
	    if(!(li.hasClassName('hot') || li.hasClassName('c2'))){
		li.observe('click', function(e){
		    var isExpanded = this.hasClassName('mExpanded');
		    if(isExpanded){
				this.removeClassName('mExpanded');
		    }
		    else{
				this.addClassName('mExpanded');
				collapseOthers();
				this.scrollTo();
		    }
		    expandLi(this, !isExpanded);
		});
	    }
	});
 } )