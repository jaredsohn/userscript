// ==UserScript==
// @name        Stack Messenger
// @namespace   http://userscripts.org/
// @include     http://*.pardus.at/main.php
// @version     1.01
// ==/UserScript==


var getOtherships = document.getElementById('otherships_content');
var getLinks = getOtherships.getElementsByTagName('td');

var nameList = "";


var x = 0;
var position = 0;
var first = true;

//alert(getLinks.length);
while(x < getLinks.length){

	//alert("Loop: " + x);
	var links = getLinks[x].getElementsByTagName('a');
	var fontCheck;
	
	if(links.length > 0){
		if(links[0].getElementsByTagName('font')[0] != null){
			
			//alert("Links Says if: " + links[0].innerHTML);
			
			if(first == true){
				nameList += links[0].getElementsByTagName('font')[0].innerHTML;
				first = false;
			}
			else{
				nameList += ", " + links[0].getElementsByTagName('font')[0].innerHTML;
			}
			position += 1;
		}
		else{
			//alert("Links Says else: " + links[0].innerHTML);
			
			if(first == true){
				nameList += links[0].innerHTML;
				first = false;
			}
			else{
				nameList += ", " + links[0].innerHTML;
			}
			position += 1;
		}
	}
	
	x += 1;
}
//alert(nameList);
if(nameList != ""){
	var otherShipsClick = document.getElementById('otherships_image');
	
	otherShipsClick.setAttribute("onclick", "javascript:sendmsg(\"" + nameList + "\")");	
}
