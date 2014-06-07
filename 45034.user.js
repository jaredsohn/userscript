// ==UserScript==
// @name           Google Image Hidden Features
// @namespace      #avg
// @description    Enables the hidden color search feature
// @include        http://images.google.com/images?*
// @version        primitive
// ==/UserScript==
function single(x,y) {
	return document.evaluate(x,y||document,null,9,null).singleNodeValue;
}
function remove(x) {
 if(x) x.parentNode.removeChild(x);
}
var main=single("//table[@class='t bt']//form");
remove(single("//input[@name='imgcolor']",main));

var color=document.createElement("input");
color.value="red";
color.name="imgcolor";
main.appendChild(document.createTextNode(" Color: "));
main.appendChild(color);

var f=single("//form[@name='gs']");
f.addEventListener("submit",function(e){
 e.preventDefault();
 this.appendChild(color.cloneNode(true));
 this.submit();
},false);
