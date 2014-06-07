// ==UserScript==
// @name         Macro testing Script
// @author       TechSeeker
// @description  This script is still under early development. Installing now would be pointless.
// @version      0.10
// @include      *
// ==/UserScript==


//--need to re-code all add functions and JQuesy injection so code is injected into new div tag for easy find and removal during DOM copy.
//--option two is to find a way to detect code in running in the new window

//----Set up JQuery----------------------------
function contentJQuery() {
  var script = document.createElement('script');
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");  
  document.body.appendChild(script);
}
contentJQuery();


//------Create common functions to add code to DOM -----------------

//Use to execute a script and remove it
function contentEval(source) {
  if ('function' == typeof source) { source = '(' + source + ')();' }
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;
  document.body.appendChild(script);
  document.body.removeChild(script);
}

//Use to add a function to the page 
function contentAddFunction(source) {
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = '\n'+source+'\n';
  document.body.appendChild(script);
}

//Use to add a Style to the page
function contentAddStyle(source) {
	var script = document.createElement('style');
	script.textContent = '\n'+source+'\n';
	document.body.appendChild(script);
}

//--Set up navigation------------------

function addMainNav() {
  var ni = document.body
  var newdiv = document.createElement('div');
  var divIdName = 'myNavDiv';
  newdiv.setAttribute('id',divIdName);
  newdiv.innerHTML = 'GM Macro Menu:<a id="GmMacro" href=\'#\' onclick=\'gmMacro()\'>Load DOM"</a>';
  ni.appendChild(newdiv);
}
addMainNav();

//contentAddFunction( function alertMyElement() {  alert("This function is running in the page scope."); } );

contentAddStyle(" #myNavDiv{ background-color: #FF0; position: absolute; top: 0px; left: 0px; font-family: Arial; font-size: 12px; padding: 2px; } ")

//------------------------------------

//add function to load new page with preset DOM values for iMacros access 
contentAddFunction( function gmMacro() {  
	var pageDOM = $("html").html();	
	myWindow=window.open();
	myWindow.document.write(pageDOM);
	myWindow.focus();
	myWindow.stop();
} );
