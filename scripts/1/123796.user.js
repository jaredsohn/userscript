// ==UserScript==
// @name           NS-trein login
// @namespace      http://userscripts.org/users/dsonck92
// @description    Autologin for T-Mobile Free internet
// @include        http://www.nstrein.ns.nl/*
// ==/UserScript==

window.addEventListener(
  "load",
  function() {
    // We'll search for the checkbox. This is easy because it always has the same name.
    document.getElementsByName("conditionsCheckbox").item(0).checked = true;
    // Then we will search the button. We can easily search for the class name as it is
    // the only button on the page.
    var tests = Array.filter( document.getElementsByClassName('button'), function(elem){  
    elem.click();
    });
  },
  false
);