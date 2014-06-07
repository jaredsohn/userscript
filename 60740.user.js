// ==UserScript==
// @name           NecronProfile
// @namespace      zsom
// @include        http://csont.php-script.hu/memberlist.php?mode=viewprofile*
// ==/UserScript==

var userName = getUserName();
var allElements = document.getElementsByTagName("*");


var searchText = "Profil megtekintése: " + userName;
var targetElement;

for(i = 0; i < allElements.length; i++){
	var element = allElements.item(i);
	var elementText = "";	
	if(element.childNodes.length > 0){
		elementText = element.childNodes[0].nodeValue;
	}

	if(elementText != null && elementText.indexOf(searchText) >= 0){		
		targetElement = element;
	}	
}

setLink(userName);


function setLink(player){
       var randX = Math.round(Math.random() * 40 + 5);
       var randY = Math.round(Math.random() * 10 + 7);
       var postData = "name=" + player + "&rank=1&submit=submit&submit.x=" + randX + "&submit.y=" + randY;
       var url = "http://s1.travian.hu/statistiken.php?id=31";
       post(url, postData);
}

function post(url, data) {
	GM_xmlhttpRequest({
		method: "POST",
		url: url,
		headers:{'Content-type':'application/x-www-form-urlencoded'},
		data:encodeURI(data),
		onload: function(responseDetails) {
					var text = responseDetails.responseText;
					var start = text.indexOf("uid=",text.indexOf('<td class="ra  fc" >')) + 4;
					var end = text.indexOf('"',start);

					var uid = text.substring(start, end);					
					var profileLink = document.createElement("a");
					var linkText =  document.createTextNode("[travian profil]");
					profileLink.setAttribute("href","http://s1.travian.hu/spieler.php?uid=" + uid);
					profileLink.setAttribute("target","_blank");
					profileLink.appendChild(linkText);
					targetElement.appendChild(profileLink);
				}
       });
}


function getUserName(){
   var titleText = document.title;
   var userNameStart = titleText.indexOf("egtekintése:");
   return titleText.substring(userNameStart + 13)
}