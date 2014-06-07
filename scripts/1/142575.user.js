// ==UserScript==
// @name        Use Chosen JQuery Plugin on DropDowns
// @namespace   com.carelearning.www
// @description Use Chosen JQuery Plugin to Search and Filter large form selects
// @include     *://*
// @matches     *://*
// @version     1
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addStuff() {  
	var link = document.createElement('LINK');
	link.rel = 'stylesheet';
	link.href = 'http://harvesthq.github.com/chosen/chosen/chosen.css';
	link.type = 'text/css';
	document.body.insertBefore(link, null);
	addJQuery(addChosen);
}

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
	addChosen(startChosen);
  }, false);
  document.body.appendChild(script);
}

function addChosen(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://raw.github.com/harvesthq/chosen/master/chosen/chosen.jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function startChosen()
{
	$('select').each(function() {
		$(this).chosen();
		//Can't get the on change event to fire. Grrr!
		//var select = $(this);
		//$(select).chosen().change( function() {
		//	if (document.getElementById(this.id).onchange)
		//		document.getElementById(this.id).onchange();
		//});
	});
}
// load jQuery and execute the main function
addStuff();