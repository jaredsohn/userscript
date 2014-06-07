// ==UserScript==
// @name           GIZMODO Large Article Image
// @namespace      http://steecky.com
// @description    GIZMODO Large Article Image
// @include        http://gizmodo.com/
// ==/UserScript==

var a = getElementsByClassName("spimage", "a", document.getElementById("main"));
var e;
var cimg;

for (var i = 0; i < a.length; i++) {
    cimg = a[i].childNodes[0];
    cimg.src = cimg.src.replace('110x82_','');
    e = document.createElement('img');
    e.src = cimg.src;
    a[i].appendChild(e);
    cimg.style.display ='none';
}


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