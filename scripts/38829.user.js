// ==UserScript==
// @name           Google Reader "Share on facebook" button
// @namespace      googlereader
// @description    Add to google reader a button "Share on facebook"
// @include        http://www.google.fr/reader/view/*
// ==/UserScript==

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

function initButton()
{
   var linksContainer = document.getElementById('viewer-footer');
   
   if (!linksContainer) {
      window.setTimeout(function() { initButton() }, 1000);
      return;
   }
   button=document.createElement('div');
   button.addEventListener("click", function() { facebookit(document.getElementById('current-entry')) }, false);

   button.innerHTML ='<div role="wairole:button" tabindex="0" class="goog-button goog-button-base unselectable goog-inline-block goog-button-float-left goog-button-tight" id="entries-down"><div class="goog-button-base-outer-box goog-inline-block"><div class="goog-button-base-inner-box goog-inline-block"><div class="goog-button-base-pos"><div class="goog-button-base-top-shadow">&nbsp;</div><div class="goog-button-base-content"><div class="goog-button-body"><div class="text">Share on facebook</div></div></div></div></div></div></div>';

   linksContainer.appendChild(button);
}

function facebookit(elmt)
{
  if(!elmt){ alert("Please select one entry first"); }
  else{
	var paramPopUp='location=no,toolbar=no,scrollbars=yes,width=350,height=450,status=no';
	var data=getElementsByClassName('entry-title-link','a',elmt);
	var t=encodeURIComponent(data[0].text);
	var h=encodeURIComponent(data[0].href);
	
	var f='http://www.facebook.com/share',p='.php?src=bm&u='+h+'&t='+t;
	window.open(f+'r'+p,'sharer','toolbar=0,status=0,resizable=1,width=626,height=436');
	
  }
}

initButton();