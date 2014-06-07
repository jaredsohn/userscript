// ==UserScript==
// @name          Larger Netflix Silverlight Player
// @namespace     http://www.chrisdanford.com/
// @description   Eliminate the black margin around the edges of the Netflix Silverlight player.
// @include       http://movies.netflix.com/WiPlayer*
// @version       1.0
// @icon          http://movies.netflix.com/favicon.ico
// ==/UserScript==

console.log("larger-netflix-silverlight-player here 1");

// Define addStyle here and don't use GM_addStyle so that we can paste the entire
// source code into Firebug and it works.
function addStyle(style) {
	var head = document.getElementsByTagName("HEAD")[0];
	var ele = head.appendChild(window.document.createElement('style'));
	ele.innerHTML = style;
	return ele;
}

// Add height:100% to all parents of #SLPLayer so that we can use a percentage height
// on #SLPlayer.
addStyle("#SLPlayerWrapper { margin: 0 auto; height:100%; }\n" +
		 "html { height:100%; }\n" +
		 "body { height:100%; }\n" +
		 "#page-content { height:100%; }\n" );

console.log("larger-netflix-silverlight-player here 3");

// http://wiki.greasespot.net/Content_Script_Injection
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

// Loop to unhook the lister on window.resize and to restore our desired CSS.
// Netflix JavaScript hooks up the event listener and sets inline styles once it 
// knows the dimensions of the movie.  We don't have an easy way to hook 
// the event or prevent it, so just poll continuously and override its side effects.
window.setInterval(function() {
	console.log("larger-netflix-silverlight-player interval 1");

	contentEval(function() {
		jQuery(window).unbind("resize");
		// clobber already-set inline styles
		jQuery("#SLPlayerWrapper").css({width:"auto"});
		jQuery("#SLPlayer").css({width:"100%",height:"99%"});
	});

	console.log("larger-netflix-silverlight-player interval 2");
}, 200);

console.log("larger-netflix-silverlight-player end");

