// ==UserScript==
// @name          Duck Duck Go insta-bang
// @namespace     qwerjk
// @description   Hitting "g" focuses search and appends an !
// @include       https://www.duckduckgo.com/*
// @include       https://duckduckgo.com/*
// @include       http://duckduckgo.com/*
// ==/UserScript==
 
 
(function(){
  var searchBox = document.getElementById("search_form_input")
               || document.getElementById("search_form_input_homepage");
  document.addEventListener( 'keydown', function(e){
    switch(e.keyCode){
      case 71:
        if(document.activeElement !== searchBox){
          searchBox.value = searchBox.value + " !";
          var len = searchBox.value.length;
          searchBox.setSelectionRange(len, len);
          searchBox.focus();
          e.stopPropagation();
          e.preventDefault();
        }
        break;
    }
  }, false);
})();

