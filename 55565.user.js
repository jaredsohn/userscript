// ==UserScript==
// @name           Pictures Only
// @namespace      LeproImg2
// @description    Friday Nothing_Else_Matters Script
// @include        http://leprosorium.ru/my/inbox/*
// @include        http://leprosorium.ru/comments/*
// @include        http://*.leprosorium.ru/comments/*
// ==/UserScript==
function strstr( haystack, needle, bool ) {
    var pos = 0;
    pos = haystack.indexOf( needle );
    if( pos == -1 ){
        return false;
    } else{
        if( bool ){
            return haystack.substr( 0, pos );
        } else{
            return haystack.slice( pos );
        }
    }
}


function onlyImages(){
var allElements, thisElement,needed;
var needed='<img';
allElements = document.getElementsByTagName('div');
for(i = 0; i < allElements.length; i++) {
    	thisElement=allElements[i];
   	 if (strstr(thisElement.className,'post tree')&&!strstr(thisElement.innerHTML,needed)) {
			thisElement.innerHTML='';
			thisElement.className='';
		}
	}
}
function onlyText(){
var allElements, thisElement,needed;
var needed='<img';
allallElements = document.getElementById('js-commentsHolder');
allElements = allallElements.getElementsByTagName('div');
for(i = 0; i < allElements.length; i++) {
    	thisElement=allElements[i];
   	 if (strstr(thisElement.className,'dt')&&strstr(thisElement.innerHTML,needed)) {
			thisElement.innerHTML='<b>MISSED IMAGE!</b>';
		}
	}
}


function AddButton(){
	var str='';
	if (strstr(document.URL,'onlyImages')) onlyImages();
	if (strstr(document.URL,'onlyText')) onlyText();
	str='<a href="?onlyText" >Show Text Only</a>' ;
	str=str+'<br><a href="?onlyImages" >Show Images Only</a>' ;
	str=str+'<br><a href="?" >Show All</a>';
    	document.getElementById('cellar').innerHTML=str+document.getElementById('cellar').innerHTML;
}

AddButton();