// ==UserScript==
// @name           Alt+click to change url fragment to #id
// @namespace      http://e404.eu/
// @description    Retrieves the ID of an alt+clicked element and changes window.location.hash to #id
// @include        *
// ==/UserScript==

document.addEventListener('click', function(event){
  if(event.altKey && event.target.id){
    window.location.hash = event.target.id;
  };
});