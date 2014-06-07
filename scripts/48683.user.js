// ==UserScript==
// @name           Google Reader "Share on facebook" button (stay on page)
// @namespace      googlereader
// @description    Add to google reader a button "Share on facebook" that opens a div overlay so you don't have to leave the page.
// @include        http://www.google.com/reader/view/*
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
	
	iframe=document.createElement('div');
	iframe.style.position = 'absolute';
	iframe.style.top = '0px';
	iframe.style.width = '625px';
	iframe.style.height = '436px';
	iframe.style.display = 'block';
	iframe.style.background = 'white';
	iframe.style.border ='2px solid black';
	iframe.style.zIndex = '100000';
	button=document.createElement('div');
	button.innerHTML = 'CLOSE';
	button.addEventListener("click", function() { iframe.style.display='none'; }, false);
	button.style.float = 'right';
	button.style.paddingRight = '20px';
	tempIFrame=document.createElement('iframe');
	tempIFrame.setAttribute('id','RSIFrame');
	tempIFrame.setAttribute('src',f+'r'+p);
    tempIFrame.style.border='0px';
    tempIFrame.style.width='625px';
    tempIFrame.style.height='400px';
    
	iframe.appendChild(tempIFrame);
	iframe.appendChild(button);
	document.body.appendChild(iframe);
	
	
  }
}

initButton();