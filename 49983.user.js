// ==UserScript==
// @author         LouderThanBoom.
// @name           Click Translation
// @namespace      Francais 
// @description    Hold down the [alt]-key and click on any text you want to translate (if you want to translate a link use [alt]+[ctrl]+[click] instead).
// @include        *
// ==/UserScript==

// This file is licensed under Creative Commons Attribution License
//
// http://creativecommons.org/licenses/by/3.0/
//
// Initial Developer:
// LouderThanBoom
//
// Contributor(s):
// 

//---You may edit this values---
//Into which language do you wish to translate?
languageAfterTranslation = 'fr';

//Do you want the display of the source and destination language?
displayLanguagePair = true;

//---Do not edit below this line unless you know what you're doing---

targetElement = undefined;
resultReceived = false;

function createTranslationContainer() {
   translationContainer=document.createElement("div");
   var divStyle="position:absolute;display:none;z-index:1000;border:2px solid black;background-color:white;background-color:rgba(255,255,255,0.75);padding:3px;color:black;-moz-border-radius:5px;font-size:1em;max-width:400px;font-family:'Trebuchet MS',sans-serif;";
   translationContainer.setAttribute("style",divStyle);
   document.body.appendChild(translationContainer);
}

function load_API() {
   var script = document.createElement('script'); 
   document.getElementsByTagName('head')[0].appendChild(script); 
   script.setAttribute("type","text/javascript");

   if(window.location.protocol=="https:") {
      script.src = 'https://www.google.com/jsapi?callback=API_Loaded';
   } else {
      script.src = 'http://www.google.com/jsapi?callback=API_Loaded';
   }
}

unsafeWindow.API_Loaded = function() {
   unsafeWindow.google.load('language','1', {"callback" : langAPI_Loaded}); 
}

function langAPI_Loaded() {
   createTranslationContainer();
   document.addEventListener("click", function(e){elementClicked(e)}, false);
}

function elementClicked(clickevent){
   clickevt=clickevent;
   //Only do something if the click wasn't on the results-box and the alt-key is hold down
   if ((!(clickevt.target==translationContainer))&&(clickevt.altKey)) {
      //Add an eventlistener to remove the results-box on mouseout
      clickevt.target.addEventListener("mouseout", function(){translationContainer.style.display="none";}, false);
      //If the last click was on the same text we don't need to translate it, but display the translation again
      if (clickevt.target==targetElement) {
         //Check if any results were received yet, if not there is nothing to be done here, the results-box will
         //be displayed as soon as results are received.
         if (resultReceived) {
            translationContainer.style.display="inline";
         }
      } else {
         //The clicked text wasn't translated yet, therefore it will be translated now
         resultReceived = false;
         targetElement = clickevt.target;
         translationContainer.innerHTML = "";
         textToTranslate=clickevt.target.textContent;

         //URLs over ca. 350 letters are not supported correctly; therefore we make several requests
         //NOTE: ca. 50 letters for base URL + 100 non ASCII letters URL-encoded = 50+100*3 = 350
         for (i=0; i<Math.ceil(textToTranslate.length/100); i++) {
            textToTranslate2 = textToTranslate.slice((i*100),((i*100)+100)).toString();
            unsafeWindow.google.language.translate(textToTranslate2,'',languageAfterTranslation.toString(),translateResult);
         }
      }
      //if the crtl-key is hold down we prevent the default action
      if (clickevt.ctrlKey) {
         clickevt.preventDefault();
      }
   }
}
							
function translateResult(result){
   if (result.translation) {
      resultReceived = true;
      //Show from which and into which language the text was translated, but only on the top (i.e. only on the first part).
      if ( (translationContainer.innerHTML == "") && (result.detectedSourceLanguage) && (displayLanguagePair) ) {
         translationContainer.innerHTML = "<a style='font-size: 80%; font-weight: bold;'>" + result.detectedSourceLanguage + " =&gt; " + languageAfterTranslation + ":</a><br>";
      }
      translationContainer.innerHTML=translationContainer.innerHTML + result.translation;
      translationContainer.style.left=(clickevt.clientX+window.scrollX+10)+"px";
      translationContainer.style.top=(clickevt.clientY+window.scrollY+10)+"px";
      translationContainer.style.display="inline";
   }
}

load_API();