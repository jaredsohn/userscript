// Facebook - Farmville, Select an animal to adopt // 
// ==UserScript==
//  
// @name value  Facebook - Farmville, Select an animal to adopt 
// @namespace http://userscripts.org/users/109606 
// @description Gives you a choice of what type of animal you want to adopt 
// @include *.facebook.com* 
// ==/UserScript== function ShowSelections(){ linkslength = document.links.length; 
// @description  link chooser for farmville

for (i=0; i < linkslength; i++) {if(document.links[i].href.indexOf("http://apps.facebook.com/onthefarm/track.php?creative&cat=lonely_cow&subcat=")
 > 1 && document.links[i].innerHTML.indexOf("Adopt the") > -1){ link = document.links[i].href; document.links[i].id = "farmville" + i; var vars = link.split("%3D");
 
if(document.links[i].href.indexOf("http://apps.facebook.com/onthefarm/index.php?giftCow=not_owned:")("Adopt")
 > 1 && document.links[i].innerHTML.indexOf("Adopt the") > -1){ link = document.links[i].href; document.links[i].id = "farmville" + i; var vars = link.split("%3D")
; type = vars[4]

; CowLink = link.replace(type,"cow_brown&key=nf")
; PinkCowLink = link.replace(type,"cow_pink&rkeyef=nf")
;UglyDuckLink = link.replace(type,"uglyduck&key=nf")
;BlackSheepLink = link.replace(type,"sheep_black&key=nf"); BrownCalfLink = link.replace(type,"calf_brown&key=nf")
; document.links[i].innerHTML = "Adopt it!"
; renderText("farmville" + i,"
or pick a different animal you would like to adopt instead:
")
; createAnchor("farmville" + i,CowLink,"Brown Cow"); renderText("farmville" + i," · ")
; createAnchor("farmville" + i,PinkCowLink,"Pink Cow"); renderText("farmville" + i," · ")
; createAnchor("farmville" + i,UglyDuckLink,"Ugly Duck"); renderText("farmville" + i," · ")
; createAnchor("farmville" + i,BlackSheepLink,"Black Sheep"); renderText("farmville" + i," · ")
; createAnchor("farmville" + i,BrownCalfLinkk,"Brown Calf") ;

  
	}

}
}


function createAnchor(e,link,name){
var newP;
newP = document.createElement("a"); 
newP.innerHTML = name;
newP.setAttribute("href",link);
var p2 = document.getElementById(e);
p2.parentNode.appendChild(newP,p2);
}


function renderText(e,text){
var newP;
newP = document.createElement("span"); 
newP.innerHTML = text;
var p2 = document.getElementById(e);
p2.parentNode.appendChild(newP,p2);
}

function checkForUpdate() {
  document.documentElement.removeEventListener('DOMNodeInserted', checkForUpdate, false);
  setTimeout(ShowSelections, 0);
  document.documentElement.addEventListener("DOMNodeInserted", checkForUpdate, false);
}

checkForUpdate();