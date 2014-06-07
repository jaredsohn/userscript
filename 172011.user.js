// ==UserScript==
// @name           Custom Google Navigation Bar New
// @grant          none
// @namespace      GoogleScript
// @description    New google bar customization
// @include        http://*.google.*
// @include        https://*.google.*
// @exclude        https://accounts.google.*
// @version        2.6
// ==/UserScript==


var links = [];

// Class names
var navbarButtonClass = 'navbarButtonCustomClass'; 
var navbarElementsClass = 'navbarElementsCustomClass'; 
var ulClass = 'ulCustomClass'; 
var liClass = 'liCustomClass'; 

// Custom link examples

// Links with custom icon and custom color
links.push(createElement ('https://www.facebook.com', '<img style=\"background-color:#000;\" src=\"https://www.facebook.com/favicon.ico"/> Facebook</span>', '#000'));
links.push(createElement ('http://cloud.feedly.com', '<img src=\"http://cloud.feedly.com/favicon.ico\"/> Feedly</span>', '#A4D252'));

// Link with embedded image
var embeddedImage = '<img alt="" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAQABYDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAcICf/EACYQAAECBQMDBQAAAAAAAAAAAAECBAADBhESBQchEzFhFSNRVIH/xAAXAQADAQAAAAAAAAAAAAAAAAAEBQYI/8QAHxEAAgICAQUAAAAAAAAAAAAAAQIAAwQFBhESIUFC/9oADAMBAAIRAxEAPwBy7aVIwVWtItw3b9VT1kjPopzyK0X573vze/eLF3TnpbbZ1ZNWkLRL0l0pSVAEECUrg34jNTaR51d3aJVmLHWmJN1Dj35YjRTfV3JOylf4zpZV6A/sAsfXXAiE9jGTfFLXyLWFo+wJAet1Swd6fZvIkS1iak5N5SUEghXwAbePAghGNdTLTMlaRlYWyB7fsEIMe1zWCZrDaa7FpyiisOnj3P/Z" />';
links.push(createElement ('https://www.google.com/search?lr=lang_it', embeddedImage + ' Search IT</span>'));

// Links to original google services
links.push(createElement ('http://maps.google.com', 'Maps'));
links.push(createElement ('https://play.google.com/', 'Play'));
links.push(createElement ('https://mail.google.com/', 'Gmail'));
links.push(createElement ('https://www.google.com/contacts/', 'Contacts'));
links.push(createElement ('https://drive.google.com/', 'Drive'));
links.push(createElement ('http://translate.google.com', 'Translate'));
links.push(createElement ('https://calendar.google.com', 'Calendar'));
links.push(createElement ('https://photos.google.com', 'Photo'));
links.push(createElement ('https://picasaweb.google.com/lh/myphotos?noredirect=1', 'Photo no G+'));
links.push(createElement ('https://www.google.com/android/devicemanager', 'Device Manager'));
links.push(createElement ('https://www.google.com/settings/dashboard', 'Dashboard'));
links.push(createElement ('http://www.google.com/about/products/', 'More from Google'));

// Defines custom classes
var cssCustomClass = '.navbarElementsCustomClass {top:28px; opacity: 0.75; background: #fff; border: 1px solid #ccc; box-shadow: 0 2px 10px rgba(0,0,0,.2); position: absolute; right: 0;} \n';
cssCustomClass += '.navbarElementsCustomClass:hover {opacity: .95;} \n';
cssCustomClass += '.ulCustomClass {background: #fff;margin: 0;min-height: 100px;padding: 28px;padding-right: 27px;text-align: left;white-space: normal;width: 265px;} \n';
cssCustomClass += '.navbarButtonCustomClass {display: inline-block; height: 30px; width: 30px; opacity: .55; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAWdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjA76PVpAAAAU0lEQVRIS+3QIQ7AQAwDwfz/0y06UsmKBlyRRwpZYJCpqr88nzu0szSknaUh7SwNaa9Vep12loa0szSknaUh7bVKr9PO0pB2loa0szSkvapumXkBZZ6PcaknYdsAAAAASUVORK5CYII=);} \n';
cssCustomClass += '.navbarButtonCustomClass:hover {opacity: .95;} \n';
cssCustomClass += '.liCustomClass {display: inline-block; font-size: 13px; margin: 8px 2px; text-align: center; outline: none;}';


// Initialize the new navigation bar
function initNavBar(){

	if (top !== self) { 
		// Checks if it is inside an iframe
		return;
	}
	
	var navbarDiv = document.getElementById("gbwa");
	var navbarUL = null;
	var navbarButton = null;
	
	if(navbarDiv == null){
		window.setTimeout(initNavBar,500);
		return;
	}
	
	// navbarButton is the applications button that makes the menu appear or disappear
	// navbarElements is the box container of the applications
	// ul is the unordered list for the applications
	navbarDiv.innerHTML = "<a id='navbarButton' class='" + navbarButtonClass + "'></a>" +
		"<div id='navbarElements' class='" + navbarElementsClass + "' style='display:none;'>" +
		"<ul class='" + ulClass + "'></ul></div>";
	
	navbarButton = document.getElementById('navbarButton');
	navbarElements = document.getElementById('navbarElements');
	navbarUL = navbarElements.getElementsByTagName('ul')[0];

	
	// Add hover event
	navbarDiv.setAttribute('onmouseover','showDiv()');
	navbarElements.setAttribute('onmouseout', 'hideDiv()');

	// Append custom elements
	for(var i=0; i<links.length; i++) {
		navbarUL.appendChild(links[i]);
	}
}


// JS functions to call outside greasemonkey
var headTag = document.getElementsByTagName("head")[0];
var scriptNode = document.createElement('script');
var scriptCode="";
scriptNode.type = 'text/javascript';
scriptCode=""+

		"var navbarElements = null;\n" +

		"function showDiv() {\n" +
			"if(navbarElements === null){navbarElements = document.getElementById('navbarElements');};\n" +
			"navbarElements.setAttribute('style', 'display:block;');\n" +
			"var ilTag = navbarElements.getElementsByTagName('a');\n" +

			"for(var i=0; i<ilTag; i++) {\n" +
			"	ilTag[i].addEventListener('click', launchLink);\n" +
			"}\n" +
		"};\n" +

		"function hideDiv() {\n" +
			"navbarElements.setAttribute('style', 'display:none;');\n" +
		"};\n"; 

// Inject functions
scriptNode.innerHTML=scriptCode;
headTag.appendChild(scriptNode);

var styleNode = document.createElement('style');
styleNode.type = 'text/css';
styleNode.innerHTML = cssCustomClass;
headTag.appendChild(styleNode);


// The element creator
function createElement (url, name, textColor){
	var liElement = document.createElement('li');
	liElement.setAttribute('class', liClass);
	liElement.setAttribute('onclick', 'javascript:window.open("' + url + '", "_blank")');
	var style = 'margin:0 5px; padding:0; height:30px; width:auto;cursor: pointer;';
	if(typeof(textColor)!=='undefined'){
		style += 'color:' + textColor;
	}

	liElement.setAttribute('style', style);
	liElement.innerHTML = name;
	return liElement;
	}

initNavBar();
