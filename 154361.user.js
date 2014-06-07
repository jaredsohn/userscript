// ==UserScript==
// @name  Dragcave Helper
// @include http://dragcave.net/abandoned
// @include http*://dragcave.net/locations/*
// @include http*://dragcave.wikia.com/wiki/Which_egg_is_which*
// @grant none
// @description Highlight Rare/Uncommon eggs, and input your own!
// @version 1.0
// ==/UserScript==
document.write("<form method=\"post\"><input type=\"button\" value=\"Reload Window\" onclick=\"window.location.reload()\"></form>");
function findString (str) {
 var strFound;
 if (window.find) {

  strFound=self.find(str);
  if (!strFound) {
   strFound=self.find(str,0,1)

   while (self.find(str,0,1)) continue
  }
 }
}
function searchFor(x, rare, elem) {
console.log(rare);

	if(elem == null) {
		var elem = document.getElementsByTagName("body") [0];
	}
	
	if (elem.nodeType == 3) {
		if((elem.nodeValue).search(x) >= 0) {
			console.log("changing style");
			styleChange(elem.parentNode,rare);
		}
	} else {
		for (var i=0; i<elem.childNodes.length; i++) {
			console.log("recursing");
			searchFor(x,rare, elem.childNodes[i]);
		}
	}
}
function s(x,rare){
console.log(rare);
       searchFor(x,rare,null);
}
function styleChange(modit,rare) { 
    if(rare==2){
	modit.style.backgroundColor = "#FFFF00";
    }
    else/* if(rare==3)*/{
        modit.style.backgroundColor = "#FF0000";
    }/*
    else{
        modit.style.backgroundColor = "#00CCFF";
    }*/
console.log(rare);

}
s("This egg is soft and smells uncannily like cheese",3);
s("This egg is very reflective, almost metallic looking",3);
s("This egg gives off a beautiful glow",3);
s("This egg looks like it doesn't belong",3);
s("This egg is tiny and made out of several pieces of paper folded together",3);
s("This egg is a third the size of the other eggs",3);
s("This egg has icicles forming on it",3);
s("This egg is almost too hot to touch",3);
s("Whenever you go near this egg your hair stands on end",3);
s("This egg has a faint green glow around it",3);
s("Oh my. There is a Leetle Tree among the eggs",3);
s("This egg has a brilliant radiance coming off of it",2);
s("This egg is split down the middle into two colours",2);
s("This egg has brightly colored markings on it",2);
s("This egg changes colors in the sunlight",2);
s("This egg radiates the heat of a fell flame",2);
s("This egg is covered in speckles",2);
s("This egg has a brilliant radiance coming off of it",2);
s("This egg has a velvety texture",2);
s("This egg smells faintly like brine",2);
s("This egg has bright orange and green markings",2);
s("This egg shines brightly in the sunlight",2);
s("This egg displays the colors of both dawn and dusk",2);
s("This egg has bright orange and green markings",2);
s("This heavy egg feels slightly warm",2);
s("This egg has an orange aura radiating from it",2);
s("This egg shines brightly in the sunlight",2);
//pygmies
/*s("This egg is so tiny you almost didn't see it",4);
s("This tiny egg has crazy swirls on it",4);
s("This tiny egg is heavier than you expected",4);
s("This egg is tiny and brightly colored",4);
s("This tiny egg is mysterious and dark",4);
s("This tiny egg shines like a pearl",4;*/