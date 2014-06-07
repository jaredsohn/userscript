// ==UserScript==
// @name            Typekit Project Scroller
// @description     Changes the project dropdown menu on Typkit to have a scrollbar
// @include         *://typekit.com*
// @version         1
// ==/UserScript==

var dropdownStyles = ".global-kit-menu-dropdown { margin: 0 !important; width: 300px !important; overflow-y: scroll; max-height: 400px; -webkit-overflow-scrolling: touch; }"

GM_addStyle(dropdownStyles);

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  // Note, jQ replaces $ to avoid conflicts.
  var mylist = jQ('.global-kit-menu-dropdown');
  
  var listitems = mylist.children('li:not(:last-child)').get();
  listitems.sort(function(a, b) {
  	 //console.log(jQ(a));
     //console.log(jQ(b));
     var compA = jQ(a).find('.global-kit-menu-item').attr('value').toUpperCase();
     var compB = jQ(b).find('.global-kit-menu-item').attr('value').toUpperCase();
     return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
  });
  jQ.each(listitems, function(idx, itm) { mylist.append(itm); });
  jQ('.global-kit-menu-dropdown').children('li:first-child').appendTo('.global-kit-menu-dropdown');
}

// load jQuery and execute the main function
addJQuery(main);
