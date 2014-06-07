// ==UserScript==
// @author         Andreas Jung (sd-daken.deviantart.com)
// @name           Click Translation
// @namespace      http://www.w3.org/1999/xhtml 
// @description    Hold down the [alt]-key and click on any text you want to translate (if you want to translate a link use [alt]+[ctrl]+[click] instead).
// @include        *
// ==/UserScript==

// This file is licensed under Creative Commons Attribution License
//
// http://creativecommons.org/licenses/by/3.0/
//
// Initial Developer:
// Andreas Jung (sd-daken.deviantart.com)
//
// Contributor(s):
//

//---You may edit this values---
//Into which language do you wish to translate?
languageAfterTranslation = 'en';

//Do you want the display of the source and destination language?
displayLanguagePair = true;

//---Do not edit below this line unless you know what you're doing---

targetElement = undefined;
resultReceived = false;
API_already_loaded = false;

function createTranslationContainer() {
   translationContainer=document.createElement("div");
   var divStyle="position:absolute;display:none;z-index:1000;border:2px solid black;background-color:white;background-color:rgba(255,255,255,0.75);padding:3px;color:black;-moz-border-radius:5px;font-size:1em;max-width:400px;font-family:'Trebuchet MS',sans-serif;line-height: 100%;";
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
   API_already_loaded = true;
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
            translationContainer.style.left=(clickevt.clientX+window.scrollX+10)+"px";
            translationContainer.style.top=(clickevt.clientY+window.scrollY+10)+"px";
         }
      } else {
         //The clicked text wasn't translated yet, therefore it will be translated now
         resultReceived = false;
         targetElement = clickevt.target;
         translationContainer.innerHTML = "";
         textToTranslate = clickevt.target.textContent;

         //URLs over ca. 350 letters are not supported correctly; therefore we make several requests
         //NOTE: ca. 50 letters for base URL + 100 non ASCII letters URL-encoded = 50+100*3 = 350

var textToTranslate2 = "";
var finished = false;
var point_pos = 0;
var point_type = undefined;
var comma_type = undefined;

//Latin Punctuation
if ((textToTranslate.indexOf(".") != -1) || (textToTranslate.indexOf(",") != -1)) {
   point_type = ".";
   comma_type = ",";
}

//CJK Punctuation
if ((textToTranslate.indexOf("\u3002") != -1) || (textToTranslate.indexOf("\u3001") != -1)) {
   point_type = "\u3002";
   comma_type = "\u3001";
}

if (point_type != undefined) {
   //points were found
   while (!finished) {
      if (textToTranslate.indexOf(point_type, point_pos) == -1) {
         //the remaining text doesn't contain any more points
         if (textToTranslate2 != "") {
            //there is text in the queue that should be translated first
            unsafeWindow.google.language.translate(textToTranslate2,'',languageAfterTranslation.toString(),translateResult);
            textToTranslate2 = "";
         }
         if ((textToTranslate.length - point_pos) < 100) {
            //the remaining text is shorter than 100 chars, so it's translated right away
            textToTranslate2 = textToTranslate.slice(point_pos);
            unsafeWindow.google.language.translate(textToTranslate2,'',languageAfterTranslation.toString(),translateResult);

            //the remaining text is translated, so translation is finished
            finished = true;
         }
         else {
            //the remaining text is longer than 100 chars
            if ((textToTranslate.indexOf(comma_type) != -1) && 
                ((textToTranslate.indexOf(comma_type, point_pos) - point_pos) < 100) &&
                ((textToTranslate.indexOf(comma_type, point_pos) - point_pos) > 0)) {
               //the text between the beginning of the sentence and the first comma will be translated
               textToTranslate2 = textToTranslate.slice(point_pos, (textToTranslate.indexOf(comma_type, point_pos) + 1));
               unsafeWindow.google.language.translate(textToTranslate2,'',languageAfterTranslation.toString(),translateResult);
               textToTranslate2 = "";
               point_pos = textToTranslate.indexOf(comma_type, point_pos) + 1;
            }
            else {
               //the sentence contained no commas
               for (i = point_pos; i < textToTranslate.length; i = i + 100) {
                  textToTranslate2 = textToTranslate.slice(i, (i + 100));
                  unsafeWindow.google.language.translate(textToTranslate2,'',languageAfterTranslation.toString(),translateResult);
               }

               //the remaining text is translated, so translation is finished
               finished = true;
            }
         }
      }
      else if (((textToTranslate.indexOf(point_type, point_pos) - point_pos) < 100) &&
               ((textToTranslate.indexOf(point_type, point_pos) - point_pos) > 0)) {
         //the text between the last point and the current is shorter than 100 chars
         if (((textToTranslate.indexOf(point_type, point_pos) - point_pos) + textToTranslate2.length) < 100) {
            //the text between the points can be added to the queue without it becoming larger than 100 chars
            textToTranslate2 = textToTranslate2 + textToTranslate.slice(point_pos, (textToTranslate.indexOf(point_type, point_pos) + 1));
            //DEBUG:
            //alert(textToTranslate2);
            point_pos = textToTranslate.indexOf(point_type, point_pos) + 1;
         }
         else {
            //adding the text would make the queue to large; we don't add it, but translate the queue.
            unsafeWindow.google.language.translate(textToTranslate2,'',languageAfterTranslation.toString(),translateResult);
            textToTranslate2 = "";
         }
      }
      else {
         //the text between the last point and the current is longer than 100 chars
         if (textToTranslate2 != "") {
            //there is text in the queue that should be translated first
            unsafeWindow.google.language.translate(textToTranslate2,'',languageAfterTranslation.toString(),translateResult);
            textToTranslate2 = "";
         }
         if ((textToTranslate.slice(point_pos, (textToTranslate.indexOf(point_type, point_pos) + 1)).indexOf(comma_type) != -1) &&
             ((textToTranslate.indexOf(comma_type) - point_pos) < 100)) {
            //the text between the beginning of the sentence and the first comma will be translated
            textToTranslate2 = textToTranslate.slice(point_pos, (textToTranslate.indexOf(comma_type, point_pos) + 1));
            unsafeWindow.google.language.translate(textToTranslate2,'',languageAfterTranslation.toString(),translateResult);
            textToTranslate2 = "";
            point_pos = textToTranslate.indexOf(comma_type, point_pos) + 1;
         }
         else {
            //100 chars of the too long text are translated
            //either the sentence contained no commas or the text between the beginning of the sentence and the first comma was too long
            textToTranslate2 = textToTranslate.slice(point_pos, (point_pos + 100));
            unsafeWindow.google.language.translate(textToTranslate2,'',languageAfterTranslation.toString(),translateResult);
            textToTranslate2 = "";
            point_pos = point_pos + 100;
         }
      }
   }
}
else {
   //no points were found
   for (i=0; i<Math.ceil(textToTranslate.length/100); i++) {
      textToTranslate2 = textToTranslate.slice((i*100),((i*100)+100)).toString();
      unsafeWindow.google.language.translate(textToTranslate2,'',languageAfterTranslation.toString(),translateResult);
   }
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

var e_pending = null;
var api_wait = null;
function wait_for_API(event) {
   if(event) {
      e_pending = event;
	  api_wait = window.setInterval(function(){wait_for_API();}, 500);
   }
   else {
      if(API_already_loaded) {
	     elementClicked(e_pending);
		 window.clearInterval(api_wait);
	   }
   }
}

document.addEventListener('click', function(e){if(e.altKey){if(!API_already_loaded){load_API(); wait_for_API(e); e.preventDefault();}}}, false);