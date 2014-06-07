// ==UserScript==
// @name           Kill People Burn Shit Fuck School
// @namespace      eskil
// @description    Used for killing flash and image elements.
// @version        1.0
// @include        *
// ==/UserScript==

  /*
   * Many thanks to Erik Vold who wrote the stuff for including jQuery. 
   * I found his work here: http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
   *
   * Ctrl+Alt+Click = DEATH
   *
   * Erik Kinding
   */
   
   /*
	* Load jQuery:
	*/
	// a function that loads jQuery and calls a callback function when jQuery has finished loading
	function addJQuery(callback) {
	  var script = document.createElement("script");
	  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js");
	  script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	  }, false);
	  document.body.appendChild(script);
	}

	// load jQuery and execute the main function
	addJQuery(bindShitToClickEvent);
	   
	   
	function bindShitToClickEvent()
	{	
		$('img, object').click(function (event) {
			if (event.altKey && event.ctrlKey) {
				event.preventDefault();
				$(this).fadeOut(100);
			}
		});
	}