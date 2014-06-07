// ==UserScript==
// @name         Change width of forum
// @version      v1.0
// @description  
// 
// Just a test
// 
// @include      http://*habboxforum.com*
// @author       Jack
// ==/UserScript==
function getElementsByClassName(className, tag, elm){
	var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
	var tag = tag || "*";
	var elm = elm || document;
	var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
	var returnElements = [];
	var current;
	var length = elements.length;
	for(var i=0; i<length; i++){
		current = elements[i];
		if(testClass.test(current.className)){
			returnElements.push(current);
		}
	}
	return returnElements;
}
foreach( getElementsByClassName( 'body_wrapper' ) as elm ) {
document.getElementById( elm ).style.width = "100px";
}

