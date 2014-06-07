// ==UserScript==
// @name           Delicious for Google Reader
// @namespace      http://delicious.com/userscripts
// @description    Delicious button for Google Reader
// @include        http://www.google.com/reader/*
// ==/UserScript==

function initButton()
{
   var linksContainer = document.getElementById('viewer-footer');
   
   if (!linksContainer) {
      window.setTimeout(function() { initButton() }, 1000);
      return;
   }
   button=document.createElement('div');
   button.addEventListener("click", function() { postBookmark() }, false);

   button.innerHTML ='<div role="wairole:button" tabindex="0" class="goog-button goog-button-base unselectable goog-inline-block goog-button-float-left goog-button-tight" id="entries-down"><div class="goog-button-base-outer-box goog-inline-block"><div class="goog-button-base-inner-box goog-inline-block"><div class="goog-button-base-pos"><div class="goog-button-base-top-shadow">&nbsp;</div><div class="goog-button-base-content"><div class="goog-button-body"><div class="text"><img src="http://delicious.com/favicon.ico" style="width:10px;height:10px;" />&nbsp;Add to del.icio.us</div></div></div></div></div></div></div>';

   linksContainer.appendChild(button);
}

function keyPressed(event){
    // Get the keycode for the keypress
    var kcode = (event.keyCode)?event.keyCode:event.which;
    // Get the key pressed in string format
    var k = String.fromCharCode(kcode);
    // If we move away from a Google Reader item, reset the link offset
    if (k=="d"){    
        var elementName=event.target.nodeName.toLowerCase();
        var typing=true;
        if(elementName=='input'){typing = (element.type=='text') || (element.type=='password');} 
        else{typing=(elementName=='textarea');}
        if( typing ){return true;}
        postBookmark();
    } 
}

function getElementsByClassName(className, tag, elm){
	var testClass = new RegExp("(^|s)" + className + "(s|$)");
	var tag = tag || "*";
	var elm = elm || document;
	var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
	var returnElements = [];
	var current;
	var length = elements.length;
	for(var i=0; i<length; i++){
		current = elements[i ];
		if(testClass.test(current.className)){
			returnElements.push(current);
		}
	}
	return returnElements;
}

function postBookmark(){
	var data=getElementsByClassName('entry-title-link','a',document.getElementById('current-entry'));
	var t=encodeURIComponent(data[0].text);
	var h=encodeURIComponent(data[0].href);
	if(document.selection)d=document.selection.createRange().text;
	else if(window.getSelection)d=window.getSelection();
	d=encodeURIComponent(d);
	
    window.open('http://delicious.com/save?v=5&amp;noui&amp;jump=close&amp;url='+h+'&amp;title='+t+'&amp;notes='+d, 'delicious','toolbar=no,width=550,height=550');
}

initButton();
document.addEventListener("keypress", keyPressed, true);