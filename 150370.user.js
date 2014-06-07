// ==UserScript==
// @name              facedown
// @namespace         http://www.incompossible.net
// @description       Add markdown support to facebook
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           https://facebook.com/*
// @include           http://facebook.com/*
// @require           https://raw.github.com/evilstreak/markdown-js/master/lib/markdown.js
// @require           http://pagedown.googlecode.com/hg/Markdown.Converter.js
// @require           http://code.jquery.com/jquery-1.8.2.min.js
// ==/UserScript==	

(function() {
  var converter;

  converter = new Markdown.Converter();

  $(function() {
    return $('span.userContent,li.UFIRow UFIRow UFIComment').html(function(index, content) {
      return converter.makeHtml(content);
    });
  });

}).call(this);
