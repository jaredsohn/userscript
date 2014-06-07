// ==UserScript==
// @name        Translator for alpha.app.net
// @namespace   https://alpha.app.net/yungsang
// @description Add Google Translate Gadget
// @include     https://alpha.app.net/*
// @author      YungSang
// @version     0.3.0
// ==/UserScript==

var language = navigator.browserLanguage || navigator.language || navigator.userLanguage || '';
if (language) language = language.split('-')[0];
var LANG = language || 'en';

var style = document.createElement("style");
style.textContent = ".goog-trans-control {display: none;}";
document.getElementsByTagName("head")[0].appendChild(style);

var script = document.createElement("script");
script.textContent = [
  "var translator = null;",
  "function googleSectionalElementInit() {",
  "  console.log('googleSectionalElementInit');",
  "  translator = new google.translate.SectionalElement({",
  "    sectionalNodeClassName: 'goog-trans-section',",
  "    controlNodeClassName: 'goog-trans-control',",
  "    background: '#ffffaa'",
  "  });",
  "//  console.log(translator);",
  "}"].join("\n");
document.body.appendChild(script);

script = document.createElement("script");
script.setAttribute("src", "//translate.google.com/translate_a/element.js?cb=googleSectionalElementInit&ug=section&hl=" + LANG);
document.body.appendChild(script);

function addJQuery(callback) {
  script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")(jQuery.noConflict());";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

addJQuery(function($) {
console.log('start');

  var SETTINGS = {
    individual_post : 'div.post-container',
      post_content  : 'div.post-text',
      post_control  : 'div.post-footer ul.footer-bottom',
      control_item  : '<li class="yui3-u show-on-hover pull-right"><a class="post-translate">Translate</a></div>',
      prepend       : false
  };

/*
 * Main
 */
  var timer = null;
  function update() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    if (translator && translator.update) {
      $(SETTINGS.individual_post).each(function() {
        setTranslateToPost(this);
      });

      translator.update();
    }

    timer = setTimeout(update, 500);
  }

  function setTranslateToPost(elm) {
    if (elm.added_translate) {
      return; // prevent addding again and again
    }
    elm.added_translate = true;

    var $elm = $(elm);

    $(SETTINGS.post_content, $elm).addClass('goog-trans-section').append('<div class="goog-trans-control"/>');

    var $control_item = $(SETTINGS.control_item);
    var $button = $('a.post-translate', $control_item);
    if (!$button.length) {
      $button = $control_item;
    }
    $button.click(function() {
      fireClickEvent($('a.goog-te-gadget-link', $elm).get(0));
      var text = $('.goog-te-sectional-gadget-link-text', $elm).text();
      $button.empty().append(text);
      event.preventDefault();
      return false;
    });
    if (SETTINGS.prepend) {
      $(SETTINGS.post_control, $elm).prepend($control_item);
    }
    else {
      $(SETTINGS.post_control, $elm).append($control_item);
    }
  }

  function fireClickEvent(elem) {
    if (elem.fireEvent) {
      elem.fireEvent('onclick');
    }
    else {
      var evt = document.createEvent('MouseEvents');
      if (evt.initMouseEvent) { // Safari
        evt.initMouseEvent('click', false, true, document.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
      }
      else {
        evt.initEvent('click', false, true);
        evt.shiftKey = evt.metaKey = evt.altKey = evt.ctrlKey = false;
      }
      elem.dispatchEvent(evt);
    }
  }

  $(update);
});