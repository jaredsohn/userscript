// ==UserScript==
// @name           hi-pda font tweak
// @namespace      http://www.hi-pda.com/
// @include        http://www.hi-pda.com/forum/*
// ==/UserScript==
function getElementsByClassName(clsName,htmltag){   
    var arr = new Array();   
    var elems = document.getElementsByTagName(htmltag);  
    for ( var i = 0; ( elem = elems[i] ); i++ ){  
		if ( elem.className == clsName ){ //只能取到className完全相等的情况，为考虑有多个class的情况  
		arr[arr.length] = elem;  
		}  
    }  
    return arr;  
}  

var searchEle = getElementsByClassName('line','td');  
for ( var i = 0; ( elem = searchEle[i] ); i++ ){ 
	var divnode = elem.childNodes[elem.childNodes.length-2];
	divnode.style.fontSize = "18px"; //主文本大小
} 
searchEle = getElementsByClassName('signature','div'); 
for ( var i = 0; ( elem = searchEle[i] ); i++ ){ 
	elem.style.fontSize = "18px";  //签名区文本大小
} 


