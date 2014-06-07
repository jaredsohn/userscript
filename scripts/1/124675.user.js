// ==UserScript==
// @name           abcHackMb
// @namespace      #avg
// @description    appending url's with a user-specified literal
// @include        *
// ==/UserScript==


var userString='?abc.co.in/';

if(location.href=='http://www.google.co.in/'||location.href=='http://www.google.com/') {
	var scriptContents = "<br/><h1 align='center'>My Google <script></script>\
			 	<br/><br/><br/><br/><br/> \
				<input type='text' style='background-color:#FFFF00;font-family:Arial, Helvetica, sans-serif; font-size:14px; font-weight:bold' id='searchInputField' onkeypress='if (event.keyCode == 13) document.getElementById(\"searchButton\").click();' size=140/> \
				<input type='button' style='font-family:Arial, Helvetica, sans-serif; font-size:14px; font-weight:bold' value='Google It' id='searchButton' \
				onclick='var userString=\"&?abc.co.in/\";var targetLoc=\"http://www.google.com/search?q=\"+document.getElementById(\"searchInputField\").value+userString;window.open(targetLoc)'></h1>"
	document.body.innerHTML=scriptContents;

} else {
	if(document.getElementsByTagName('a')!=null) {
		var allLinks = document.getElementsByTagName('a');	
		for(var i=0;i<allLinks.length;i++) {
			allLinks[i].href += userString;
		}
	}
}
var googleIt = function() {
	var targetLoc = 'http://www.google.com/search?q='
	searchQuery = document.getElementById('searchInputField').value;
	targetLoc += searchQuery;
	alert(targetLoc);
}



//contact me at mohit.blue@gmail.com