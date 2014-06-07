// ==UserScript==
// @name           vkMP3download
// @namespace      su.gornostaev
// @description    Vkontakte audio download helper
// @version        0.2
// @author         Sergey TheDeadOne Gornostaev
// @license        GPL
// @include        http://vkontakte.ru/*
// @include        http://vk.com/*
// @include        https://vkontakte.ru/*
// @include        https://vk.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @updateURL      http://userscripts.org/scripts/source/160467.user.js
// @downloadURL    http://userscripts.org/scripts/source/160467.user.js
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
  jQuery('div.audio').live({
    'mouseenter': function() {
      fileId = jQuery(this).attr('id');
      jQuery('input#' + fileId.replace('audio', 'audio_info')).each(function() {
        fileHref = jQuery(this).attr('value').split(',')[0];
        if(jQuery('a#download_' + fileId).length == 0) {
          jQuery('div#' + fileId + ' span.title').parent().parent().children('div.actions').append(jQuery('<div class="fl_r"><a id="download_' + fileId + '" href="' + fileHref + '">↓↓↓</a></div>'));
        }
      });
    },
    'mouseleave ': function() {
      fileId = jQuery(this).attr('id');
      jQuery('a#download_' + fileId).remove();
    }
  });
}

addJQuery(main);