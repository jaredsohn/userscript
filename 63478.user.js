// ==UserScript==
// @name           Grooveshark Ad Remover
// @namespace      http://devintorres.com/
// @description    Removes advertisements from GrooveShark.
// @author         Devin Torres
// @version        1.0
// @include        http://listen.grooveshark.com/*
// ==/UserScript==

(function(){

  var $ = function(id) {
    return document.getElementById(id);
  };

  var container = $('mainContainer');
  var wrapper = $('mainContentWrapper');
  var adBar = $('adBar');

  container.removeChild(adBar);
  wrapper.style.marginRight = '0px !important';

})();
