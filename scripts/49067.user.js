// ==UserScript==
// @name           Duslar Blog AutoCutter
// @namespace      www.duslar.ru
// @description    Long post cutter. Version for Opera
// @author         Rashid
// @version        0.0.0.3
// @include http://www.duslar.ru/Blog/*
// ==/UserScript==


// Hiding top ad
document.getElementById('ctl00_wtcHeader_divTopBanner').innerHTML = '';
// Hiding ad block
var blocks = document.getElementById('rightColumn').childNodes;
for( var i = 0; i < blocks.length; i++){

     if( blocks[i].nodeName == 'TABLE' ){
          if(  blocks[i].innerHTML.indexOf('tdBanner')>0 ) { blocks[i].innerHTML = ' ';}
     }
};

var post = document.getElementsByClassName('blogEntry3c');

for(var j=0; j <post.length; j++){
 var anounce = post[j].innerHTML;

 if(  anounce.replace(new RegExp('<.+?>','gi'),'').length > 600 && anounce.indexOf('blogEntry3c') < 0){
      document.getElementsByClassName('blogEntry3c')[j].innerHTML = anounce.replace(new RegExp('<.+?>','gi'),'');
      document.getElementsByClassName('blogEntry3c')[j].innerHTML = document.getElementsByClassName('blogEntry3c')[j].innerHTML.substr(0,500).concat('... (Autocat)');
 }
}


/** Удаление object`ов **/


if( strpos( window.location.href, 'ViewPost.aspx', 0) === false ){
	var all_objs = document.getElementsByTagName("object");
	for( var i=0; i < allParas.length; i++){ allParas[i].style.display='none'; } 
}

function strpos( haystack, needle, offset){	// Find position of first occurrence of a string
	// 
	// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

	var i = haystack.indexOf( needle, offset ); // returns -1
	return i >= 0 ? i : false;
}
