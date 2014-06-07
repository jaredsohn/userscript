// ==UserScript==
// @name           MusicBrainz: Show full annotation
// @version        1.0
// @namespace      28a2f36e-a31e-4be2-8f98-3159497068cc
// @author         pankkake
// @description    
// @include        http://*musicbrainz.org/*
// ==/UserScript==

unsafeWindow.jQuery(function(j){
  j(".annotation-collapsed")
  .removeClass("annotation-collapsed")
  .addClass("annotation-collapse");
  j(".annotation-toggle").remove();
});