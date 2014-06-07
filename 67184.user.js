// ==UserScript==
// @name		  Javascript Shell
// @description  A javascript shell used for debugging your script code
// @include	  http://*userscripts*
// @include	  http://*squarefree.com*
// @include	  http://*thecface.drivehq*
// @require   http://usocheckup.dune.net/67184.js?maxage=5
// @version       0.6
// ==/UserScript==

// Release Notes
// 0.6
// -More CSS tweaks
// -Fixed Instructions, visit backup shell link
// -Removed useless setAttribute
// -Added 'Invert Colors' next to checkbox
// 0.5
// -More cross-platform fixes
// 0.4
// -Fixed Cross-Platform CSS problems with Linux
// -Removed useless variable
// -Added USO Update require
// 0.3
// -Fixed navbar link on UserScripts
// -Edited CSS on invertCSS() function
// 0.2
// -Added a Checkbox enabling the user to invert/revert shell colors.
// -Added 'clear screen' that follows you down the shell.
// -Recoded the CSS to make debugging more readable.
// 	-Errors now are in Red with black background
// 	-Font color of code typed is now gray
//	-Font type is now courier
// 	-Changed padding of input box.
//	-Changed alignment of output and input data
//  -Changed font-type, link css, etc
// -Major Code Re-Write.
// 	-Compacted the jsShell function
// 	-Removed empty table, removed pseudo-footer header.
// 0.1
// -initial code
// End Release Notes


// ----- Global Variables -----

var getRef = document.getElementById("output");
var makeInstruct = document.createElement("div");

// ----- End Global Variables -----


// ----- Functions -----

// insertAfter function
	//create function, it expects 2 values.
	function insertAfter(newElement,targetElement) 
	{
		// target is what you want it to go after. Look for this elements parent.
		var parent = targetElement.parentNode;	
		// if the parents lastchild is the targetElement...
		if(parent.lastchild == targetElement) 
		{
			// add the newElement after the target element.
			parent.appendChild(newElement);
		} 
		else 
		{
			// else the target has siblings, insert the new element between the target and it's next sibling.
			parent.insertBefore(newElement, targetElement.nextSibling);
		}
	};

var makeEl = document.createElement("li");
	makeEl.innerHTML = "<b><a href='http://www.squarefree.com/shell/shell.html'>JS Shell</a></b>";
(function() {
	var div = document.getElementsByTagName('a');
	var attribs = "";
		for (var i = div.length - 1; i >= 0; i--) {
			attribs = div[i].getAttribute('href');
			if(attribs == "/books"){
			    // Use our insertAfter function to insert our new navbar element
				insertAfter(makeEl,div[i]);
			}
		}
	}
)();

// Remove the books li element so there isn't an alignment problem
// Wonder why we can't simply add onto the navbar without it aligning weird.
(function() {
	var div = document.getElementsByTagName('a');
	var attribs = "";
		for (var i = div.length - 1; i >= 0; i--) {
			attribs = div[i].getAttribute('href');
			if(attribs == "/books"){
				div[i].parentNode.removeChild(div[i]);
			}
		}
	}
)();



// InvertCSS function
// For changing CSS of page if user clicks checkbox
// Function works but is not yet connected to the document. Having issues... 
	function invertCSS()
	{
		var newSS, styles= ''
		+' * { background: black ! important; color: #C8C8C8  ! important; font-family: courier ! important; } '
		+' .error { color: red ! important; background: #006666 ! important; font-weight: bold ! important; } '
		+' .print { color: #FFCC00; } '
		+' A:link {text-decoration: none} '
		+' A:visited {text-decoration: none} '
		+' A:active {text-decoration: none} '
		+' A:hover {text-decoration: underline ! important; color: red ! important;} ';
		if(document.createStyleSheet)
		{
			document.createStyleSheet("javascript:'"+styles+"'");
		}
		else {
			newSS=document.createElement('link');
			newSS.rel='stylesheet';
			newSS.href='data:text/css,'+escape(styles);
			document.getElementsByTagName("head")[0].appendChild(newSS);
			}
	};
	
// revertCSS function
// Can revert back from inverted CSS. Used as standard CSS with script.
function revertCSS()
	{		// Remove old style
		GM_addGlobalStyle=function(css) 
		{
			var sel = document.createElement('style');
				sel.setAttribute('type','text/css');
				sel.appendChild(document.createTextNode(css));
			var hel=document.documentElement.firstChild;
			while(hel && hel.nodeName!='HEAD') 
			{ 
				hel=hel.nextSibling; 
			}
			if(hel && hel.nodeName=='HEAD') 
			{ 
				hel.appendChild(sel); 
			}
			else 
			{
			document.body.insertBefore(sel,document.body.firstChild); 
			}
		}	
		// Add new style
		GM_addGlobalStyle(''
			+' body { background: white; color: black; } '
			+' * { background: white ! important; color: black  ! important } '
			+' #output { white-space: pre; white-space: -moz-pre-wrap; } '
			+' body { font-family: courier; } '
			+' A:link {text-decoration: none} '
			+' A:visited {text-decoration: none} '
			+' A:active {text-decoration: none} '
			+' A:hover {text-decoration: underline; color: red ! important;} '
			+' h3 { margin-top: 0; margin-bottom: 0em; } '
			+' h3 + div { margin: 0; } '
			+' form { margin: 5px ! important; padding: 35px ! important; } '
			+' #input { width: 100%; border: 2px; padding: 35px; overflow: auto; } '
			+' .input { color: #404040 ! important; background: white; font: inherit; font-weight: bold; margin-top: .5em; /* background: #E6E6FF; */ } '
			+' .normalOutput { color: black; background: white; } '
			+' .print { color: brown; background: white; } '
			+' .error { color: red ! important; background: black ! important; font-weight: bold ! important; } '
			+' .propList { color: green; background: white; } '
			+' .message { color: green; background: white; } '
			+' .tabcomplete { color: purple; background: white; } '
			);
	};

// create condition to give link based on shell link
			makeInstruct.innerHTML = (window.location.href == "http://www.squarefree.com/shell/shell.html") ? "<br><b>Instructions:</b> Type or Paste your JavaScript code and <i>press enter</i> to have it debugged.<br>Visit the <a href='http://thecface.drivehq.com/jsshell.html'>Backup Shell</a>.<p>" : ((window.location.href == "http://thecface.drivehq.com/jsshell.html") ? "<br><b>Instructions:</b> Type or Paste your JavaScript code and <i>press enter</i> to have it debugged.<br>Visit the <a href='http://www.squarefree.com/shell/shell.html'>Backup Shell</a>.<p>" : "");


getRef.parentNode.insertBefore(makeInstruct, getRef);

// jsShell function
// Changes CSS, adds Instructions, and 'Clear Terminal' link
	function jsShell()
	{
		// create p element...
		var makeP = document.createElement("p");
		// create div element and put HTML in it.
		var makeClear = document.createElement("a");
			makeClear.setAttribute("href", "javascript:go('clear()')");	
			makeClear.innerHTML = "Clear Terminal";
				// Use insertAfter function and insertBefore method to add data to page...
				insertAfter(makeClear, getRef);
				makeClear.parentNode.insertBefore(makeP, makeClear);
	};
// createButton
// Makes the checkbox input button for inverting CSS
		var makeButton = document.createElement("input");
			makeButton.setAttribute("type", "checkbox");
			makeButton.addEventListener('click',function(){
    dothecheck();
    },false);
insertAfter(makeButton, makeInstruct);
		// function to check to see if checkbox is checked 
		// and inverts/reverts based on that
		function dothecheck()
		{
		if(makeButton.checked)
		{
			invertCSS();
		}
		else
		{
			revertCSS();
		}
		}
var text = document.createTextNode(" Invert Colors?");

insertAfter(text, makeButton);

// loadShell function
// determine url location of window and add jsShell
// This way the CSS removing doesnt affect userscripts
		function loadShell()
		{
			if(window.location.href == "http://www.squarefree.com/shell/shell.html") 
			{
				revertCSS();
				jsShell();
			}
			else if(window.location.href == "http://thecface.drivehq.com/jsshell.html") 
			{
				revertCSS();
				jsShell();
				
			}
		};
		
// ---- End Functions ----


// ---- Run Functions ----

loadShell();

// ---- End Run Functions ----

// End JavaScript Shell Script
