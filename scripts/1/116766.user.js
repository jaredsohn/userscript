// ==UserScript==
// @name           niggerfy
// @namespace      niggerfy
// @description    niggerfy
// @include        *
// ==/UserScript==

window.addEventListener(
    "load", 
	function(){
            traverse(document.getElementsByTagName('body')[0]);
        },
	false);

function traverse(obj){
    if(obj){
        if(obj.nodeType == 3){  obj.nodeValue = obj.nodeValue.replace(/\b[A-ZÄÖÜ][A-Za-zäöüß0-9]+\b/g, "Nigger");}
        for(var i=0; i  < obj.childNodes.length; i++){
            traverse(obj.childNodes[i]);
            }
        }
    }