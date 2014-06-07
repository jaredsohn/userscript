// ==UserScript==
// @name           Drag
// @description    Drag
// @include        http://dragcave.net/abandoned
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==
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
    else{
        modit.style.backgroundColor = "#FF0000";
    }
console.log(rare);

}
s("7 days",);
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
s("This egg is so tiny you almost didn't see it",2);
s("This egg radiates the heat of a fell flame",2);
s("This egg is covered in speckles",2);
s("This egg has a brilliant radiance coming off of it",2);
s("This egg has a velvety texture",2);