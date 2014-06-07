// ==UserScript==
// @name         Kenny Translator
// @namespace    https://userscripts.org/people/5587
// @description  Translates text into what Kenny from South Park would say and back again. A translation window appears when you click selected text with the alt key pressed.
// @downloadURL  https://userscripts.org/scripts/source/15987.user.js
// @grant        none
// @exclude      http://www.namesuppressed.com/kenny/
// @include      *
// @updateURL    https://userscripts.org/scripts/source/15987.meta.js
// @version      1.0
// @date         2013-03-23
// @creator      Arne Dieckmann (aka "Mithrandir")
// ==/UserScript==

(function () {
 function kenny_it(text){
   kenny="";
   for(i=0;i<text.length;i++){
     item=text.charAt(i);
     if((item>="a" && item<="z")||(item>="A" && item<="Z")){
       if(item>="a"){
         offset=97;
         }else{
         offset=65;
        }
        char=((item.charCodeAt(0)-offset).toString(3));
        if(char.length<3){
          do {
            char="0"+char;
          } while (char.length<3);
        }
        for(j=0;j<3;j++){
          n=char.charAt(j);
          if(j==0 && offset==65){     
            kenny=kenny+["M","P","F"][n];
            }else{
            kenny=kenny+["m","p","f"][n];
          }
        }
        }else{
          kenny=kenny+item;
      }
    }
  return (kenny);
}


function kenny_said(text){
  output="";
  upper=false;
  do{
    item=text.charAt(0);
    n="mpfMPF".indexOf(item);
    if(n != -1){
      if(n>2){
        upper=true;
        n-=3;
      }
      for(i=0;i<2;i++){            
        text=text.substring(1,text.length);
        char=text.charAt(0);
        n=n*10+"mpf".indexOf(char);
      }
      item=String.fromCharCode(parseInt(n,3)+97);
      if(upper){
        item=item.toUpperCase();
        upper=false;
      }
    }
    text=text.substring(1,text.length);
    output=output+item;
    }while(text != "")
  return(output);
}


var from, to;
from = "K";
to = "O";
var defaultTranslation = from + "_" + to;


//provides to make visible kenny fish box only when mouse up and alt key pressed
//or provides to hide kenny fish box when user click out of box
window.addEventListener('mouseup', function(mouseEvent) {
	var boxLeft = window.kennySpeak.offsetLeft;
	var boxRight = boxLeft + window.kennySpeak.offsetWidth;
	var boxTop = window.kennySpeak.offsetTop;
	var boxBottom = boxTop + window.kennySpeak.offsetHeight;

	if (window.kennySpeak.style.display == "inline"
			&& (mouseEvent.pageX < boxLeft
					|| mouseEvent.pageX > boxRight
					|| mouseEvent.pageY < boxTop
					|| mouseEvent.pageY > boxBottom)) {
		window.kennySpeak.stopCapture();
	} else if (window.getSelection() != '' && mouseEvent.altKey) {
		window.kennySpeak.psychicalWavesCapture(mouseEvent, window.getSelection());
	}
}, true);

//create kenny fish object and box instance. make it unvisible on start
function engagekennySpeak() {
	//set global css
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { alert('ugh'); }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = "span.gmkennyTranslatorToolBar {margin: 1px; border: 1px dotted gray; padding: 0px 5px 0px 5px;}";
	head.appendChild(style);

	var kennySpeak = document.createElement("div");
	kennySpeak.id = "gmkennySpeak";
	kennySpeak.translationFrom = from;
	kennySpeak.translationTo = to;
	kennySpeak.fish_imgSrc = "data:image/gif;base64,R0lGODlhEAAQAOe8AHRDIXRFI3VFI3RGJHZGI3dGIndGJHZHI3VHJnpHI3dIJnlIJHZJKH1HInxOLo5KG45LG5VPG5VPHJhQHINXN55RGIhaNqNTGahTFqlUF4deP41fOrBVE7NVEb9UDYlmSrhYFbpYE8JXDb9YEMFaEYtsVctbC71gHM1cDsVgGddcCdZdCNxbBthdCNRfCttcB9ZeCtNgC9xdCN9cBtVhCd1fB99eCOBeBuBeB91gBt1gB9xhB%2BBgCONfBsFqLN9iCelgBehiBehjBuVlCO1iBfBjBOpmBe9kBaJ8V%2FBkBO1mBfJkA%2FNkA%2FFlBPNkBOtoBvBmBPJlBPNlA%2FNlBO5oBPJmBPFnBPNmBPJnBPJoBPJoBfNoBfJpA%2FJpBPNpBPJpB%2FNpBfJqA%2FJqBPNqA%2FNqBPJqB%2FJrA%2FJrBPNrA%2FJrBvJsBvJsCPFtC%2FJsDvJsD%2FFuEfJwD%2B14IOp6J%2FB7K%2FJ7KvJ%2BLfKALPKAMbmTbLuUbqyXiPOEMfGFObCZhemRTrKglPOQRvORS%2FKVTfSWVu2aXvWhZ%2FSmbPSnb%2FWnb%2FSob%2FSocfWpc%2FWsdPWsdcm7sdu6jsDAw9HFvMjIyuzMn%2FfJqerRsPLTp%2B%2FTvfHat%2Fjaxvzesvzfsfrft%2F7gsf7hsvnfzf3itvnj0vnj0%2Fnk1Pbn0Pnm1%2FPs5%2F3u1vHw7%2FHx8fjy5vjy6Pzy4fry6%2Fvz5fT09fr28Pv49fv49vv59vn6%2Bvr6%2Bvv7%2Bvv7%2B%2Fz7%2Bvz8%2FP39%2Ff7%2B%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FyH5BAEAAP8ALAAAAAAQABAAAAj%2BAP8JFLjozhs3dRANXPhP0RcsWbBogVjmEMNAWTJq1OLFSxZAAxt16aJlyIgTKWCIMYMGjSGBa7o8qXAAiaVJGx7QQEMmzT9GYqhAGNCHFCdNlSg0cMFlTKI9aEwAKEEr1ypVuRwhuGCEjB04ZjoQ%2BJMLUqpcklAxmKBDDJs2YDgE0JMrlytcr2o5iJADjRo6W0QI%2BACLFahTuSIZyLBjTJxCV15IUJCnUydPmDQUiFFDC6F%2FToiowLAAz6ZHFhKEWDFGjMBBS4CwEILCBwgSP1ooCeNn4JwpUWbg8MDDxo0tY%2BQs5FNkipQeMqowqRLFiqCBlLRoOXIESpAmUZIHHNFy5tO%2FgAA7";
	kennySpeak.supportedTranslations = {
		"O_K" : "Text in Kenny",
		"K_O" : "Kenny in Text"
	}

	//hides the kennyspeak box
	kennySpeak.stopCapture = function() {
		this.style.display = "none";
	}

	//capture selected text and show the kennyspeak box near the pointer
	kennySpeak.psychicalWavesCapture = function(mouseEvent, selectedText) {
		if (this.style.display == "none") {
			this.style.display = "inline";
			this.kennySpeakImage.style.display = "inline";
			this.style.left = (mouseEvent.pageX - 20).toString(10) + 'px';
			this.style.top  = (mouseEvent.pageY - 5).toString(10) + 'px';
			this.kennyTextSpan.value = selectedText;
		}
	}

	//translate the code and after set box properties
	kennySpeak.defecates = function () {
		this.kennySpeakImage.src = this.fish_imgSrc;
		if (kennySpeak.translationFrom == "K") {
	   	var t= kenny_said(this.kennyTextSpan.value);
	    } else {
		  var t= kenny_it(this.kennyTextSpan.value);
	  }

	  window.kennySpeak.kennyTextSpan.value = t;
		window.kennySpeak.kennySpeakImage.src = window.kennySpeak.fish_imgSrc;
	}

	// kenny fish box style properties 
	kennySpeak.style.border = "1px solid #006699";
	kennySpeak.style.display = "none";
	kennySpeak.style.position = "absolute";
	kennySpeak.style.backgroundColor = "#F4F4F4";
	kennySpeak.style.padding = "2px";
	kennySpeak.style.MozBorderRadius = "4px";
	kennySpeak.style.font = "arial";
	kennySpeak.style.fontSize = "12px";
	kennySpeak.style.color = "black";
	kennySpeak.style.textAlign = "left";
	kennySpeak.style.zIndex = "100";

	//image button to translate text
	var kennySpeakImg = document.createElement("img");
	kennySpeakImg.src = kennySpeak.fish_imgSrc;
	kennySpeakImg.title = "Click to translate";
	kennySpeakImg.style.border = "none";
	kennySpeakImg.style.cursor = "pointer";
	kennySpeakImg.style.marginBottom = "-3px";
	kennySpeakImg.style.marginLeft = "20px";
	kennySpeakImg.addEventListener('click', function() {kennySpeak.defecates();}, true);

	//text to translate/translated text span
	var kennyTextSpan = document.createElement("textarea");
	kennyTextSpan.cols = "40";
	kennyTextSpan.rows = "7";

	//close button
	var closeButton = document.createElement("span");
	closeButton.innerHTML = "x";
	closeButton.style.cursor = "pointer";
	closeButton.className = "gmkennyTranslatorToolBar";
	closeButton.title = "Close Kenny Translator";
	closeButton.addEventListener('click', function() {kennySpeak.stopCapture();}, true);

	//translation from and to source
	var langsSpan = document.createElement("span");
	langsSpan.refreshData = function() {
	langsSpan.innerHTML = kennySpeak.supportedTranslations[kennySpeak.translationFrom + "_" + kennySpeak.translationTo];
	langsSpan.title = "Click to change direction";
	langsSpan.style.cursor = "pointer";
	}
	langsSpan.className = "gmkennyTranslatorToolBar";
	langsSpan.style.cursor = "default";
	langsSpan.addEventListener('click', function() {
		var temp = kennySpeak.translationTo;
		kennySpeak.translationTo = kennySpeak.translationFrom;
		kennySpeak.translationFrom = temp;
		langsSpan.refreshData();
	}, true);
	langsSpan.refreshData();

	//toolbar
	var toolBarDiv = document.createElement("div");
	toolBarDiv.style.borderBottom = "1px solid #cccccc";
	toolBarDiv.style.margin = "2px 0px";
	toolBarDiv.style.paddingBottom = "2px";

	//append objects to toolbar
	toolBarDiv.appendChild(closeButton);	
	toolBarDiv.appendChild(langsSpan);
	toolBarDiv.appendChild(kennySpeakImg);

	//put html objects into kennyspeak box
	kennySpeak.appendChild(toolBarDiv);
	kennySpeak.appendChild(kennyTextSpan);

	//set objects into kennyspeak instance
	kennySpeak.kennySpeakImage = kennySpeakImg
	kennySpeak.kennyTextSpan = kennyTextSpan;
	kennySpeak.kennyLangLabel = langsSpan;

	window.kennySpeak = kennySpeak;
	document.body.insertBefore(window.kennySpeak, document.body.firstChild);
}

engagekennySpeak();

})();