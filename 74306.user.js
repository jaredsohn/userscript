// ==UserScript==

// @name           GTranslator

// @namespace      http://www.betterprogramming.com

// @include        *

// @require        http://www.google.com/jsapi

// ==/UserScript==



// Florentin Sardan http://www.betterprogramming.com



var targetLanguage = "en";


function load_jsapi() {

  //Google AJAX Language API loader

  var elem = document.createElement("script");

  elem.type = "text/javascript";

  elem.id = "google-jsapi";

  elem.src = "http://www.google.com/jsapi?callback=jsapi_loaded";

  document.getElementsByTagName('head')[0].appendChild(elem); //document.body.appendChild(elem);

}



unsafeWindow.jsapi_loaded = function() {

    unsafeWindow.google.load("language", "1", { "callback": function() {} });

}



function translate_recurse(element) {

  for (var i=0; i<element.childNodes.length; i++) {

      var child = element.childNodes[i]

      if(child.nodeName == "#text") {

          translate_content(child);

      }

      else if (child.nodeName.toLowerCase() != 'script') {

          translate_recurse(child);

      }

  };

}



function trim(str) {

    return str.replace(/^\s+|\s+$/g, "");

}



function stripTags(str) {

    return str.replace(/<\/?[^>]+>/gi, "");

}


var cache = []
var separator = '| | |';


function translate_content(element) {
  var element_text_length = element.textContent.trim().length;

  if (element_text_length < 3)

    return false;

    

  if (element_text_length > 999) {

    translate_cache([element]);

  }

  else {

    if (get_joined_text(cache).length + element_text_length > 999) {

      translate_cache(cache);

      cache = []

    }

    cache.push(element);

  }

}

function get_joined_text(elements) {
  var text = [];
  for(var i=0;i<elements.length;i++) {
    text.push(elements[i].textContent);
  }
  return text.join(separator);
}

function translate_cache(mycache) {

  if (!mycache.length) {

    return false;

  }

  var text = get_joined_text(mycache);

  //console.debug(text);
  unsafeWindow.google.language.translate(text, "", targetLanguage, function (result) {

      if (!result.translation) {

        return true;

      }

      var translations = result.translation.split(separator);

      for(var j=0; j<translations.length;j++) {
        mycache[j].textContent = translations[j];

      }
    } // end function
  );
}

function translate() {
  translate_recurse(document.body);

  translate_cache(cache);
}

function setAuto() {

	GM_setValue("autoTranslator", !GM_getValue("autoTranslator", false));
	alert("Auto Translate is set to "+GM_getValue("autoTranslator", false));

}

function autoTranslate() {
  if(GM_getValue("autoTranslator", true)) {

		translate();

	}
}

function so_captureKeyDownEvent(e) {
  var keyCode = document.all?window.event.keyCode:e.keyCode;
  switch(keyCode) {
    case 120: // F9 (F9 translates the current page)
      translate();
      break;
    case 121: // F10 (use F10 to set or unset Auto Translate, by default is "false"
      setAuto();
      break;
    case 119: // F8 (F8 redirects to translate.google.com)

      var translation_url = "http://translate.google.com/translate?js=y&prev=_t&hl=en&ie=UTF-8&layout=1&eotf=1&sl=auto&tl=en&u=" + document.location.href
      document.location.href = translation_url;
      break;
  }
};



(function() {

    load_jsapi();

    document.addEventListener('keydown', so_captureKeyDownEvent, false);
    window.addEventListener("load", autoTranslate, true);

}) ();
