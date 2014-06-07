// ==UserScript==
// @name           Facebook Translate
// @namespace      http://example.com
// @description    Translate status updates for Facebook
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// ==/UserScript==

var lang = "sv";
var ignoreEvents = false;

function languageLoaded() { 
  // Ajax: new image
  document.addEventListener("DOMNodeInserted",
   function(evt) { 
     if(! ignoreEvents) { 
       updateStories();
     }
   }, true);

  updateStories();
}

function updateStories() {
  var stories = $x("//*[@class='GenericStory_Body' or contains(@class, 'UIIntentionalStory ')]");
  ignoreEvents = true;
  for(var i in stories) {
    var story = stories[i];

    var storyLinks = $X("*//*[contains(@class, 'UIActionLinks')]", story);
    var item = $X("*[@class='GenericStory_Message' or @class='UIIntentionalStory_Header']", story);
    if(! storyLinks || ! item || !! $X("*[@class='translate-story']", storyLinks)) {
       continue;
    }

    var a = document.createElement('a');
    a.className = "translate-story";
    a.textContent = "Translate to " + lang.toUpperCase();
    a.addEventListener("click", function(e) {
      var story = e.target.parentNode.parentNode.parentNode;
      var item = $X("*[@class='GenericStory_Message' or @class='UIIntentionalStory_Header']", story);
      var text = $X("string(*[@class='GenericStory_Message' or @class='UIIntentionalStory_Header'])", story);

      unsafeWindow.google.language.translate(text, "", lang, function(result) {
        var translated;
        var d = document.createElement("div");
        if (!result.error) {
	  if(result.detectedSourceLanguage == lang)
            d.innerHTML = "Languages match, no translation performed";
          else
            d.innerHTML = result.translation;
        } else {
          d.innerHTML = "Translation failed";
        }
        item.appendChild(d);        
      });

    }, true);
    storyLinks.appendChild(document.createTextNode(" · "));
    storyLinks.appendChild(a);
  }
  ignoreEvents = false;
} 



function $x( xpath, root ) {

  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;

  var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];

  switch (got.resultType) {

    case got.STRING_TYPE:

      return got.stringValue;

    case got.NUMBER_TYPE:

      return got.numberValue;

    case got.BOOLEAN_TYPE:

      return got.booleanValue;

    default:

      while (next = got.iterateNext())

	result.push( next );

      return result;

  }

}



function $X( xpath, root ) {

  var got = $x( xpath, root );

  return got instanceof Array ? got[0] : got;

}

unsafeWindow.doneLoadingJSAPI = function() { 
  unsafeWindow.google.load('language','1', {"callback" : languageLoaded}); 
} 

var script = document.createElement('script'); 
script.src = 'http://www.google.com/jsapi?callback=doneLoadingJSAPI'; 
script.type = "text/javascript"; 
document.getElementsByTagName('head')[0].appendChild(script); 