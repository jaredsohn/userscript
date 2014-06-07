// ==UserScript==
// @name           Google Reader Readability
// @namespace      http://thinlight.org/
// @include        http://www.google.com/reader/view/*
// @include        https://www.google.com/reader/view/*
// ==/UserScript==

var scripts = [
  '//cdnjs.cloudflare.com/ajax/libs/jquery/1.7/jquery.min.js',
  '//www.readability.com/embed.js'
];

var numScripts = scripts.length, loadedScripts = 0;

GM_addStyle('.rdbWrapper{float:right;height:20px;width:170px;overflow:hidden;margin-top:-3px;}');

function main() {
  jQuery.noConflict();

  jQuery('#viewer-entries-container').scroll(function() {
      var needInit = false;
      jQuery('.entry-actions:not(.readability-enabled)').each(function() {
          var share = jQuery('<div class="rdbWrapper" data-show-read="0" data-show-send-to-kindle="1" data-show-print="0" data-show-email="0" data-orientation="0" data-version="1"></div>');
          var url = jQuery(this).parentsUntil('#entries').find('.entry-title-link').attr('href');
          share.attr('data-url', url);
          jQuery(this).prepend(share).addClass('readability-enabled');
          needInit = true;
        });
      if (needInit) {
        rdbEmbed.reInitialize(true);
        rdbEmbed.init();
      }
    });
}

var i, protocol = document.location.protocol;
for (i = 0; i < numScripts; i++) {
  var script = document.createElement("script");
  script.setAttribute("src", protocol + scripts[i]);
  script.addEventListener('load', function() {
      loadedScripts += 1;
      if (loadedScripts < numScripts) {
        return;
      }
      var script = document.createElement("script");
      script.textContent = "(" + main.toString() + ")();";
      document.body.appendChild(script);
    }, false);
  document.body.appendChild(script);
  console.log(script);
}

