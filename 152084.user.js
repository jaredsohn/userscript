// ==UserScript==
// @name        GreenPage
// @namespace   http://userscripts.org/users/novagenesis
// @include     http://trac/
// @grant       none
// @version     1
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  $('input[name="owner"]').val('cmartin@liaison-intl.com'); //Set it to me...
  $('input:radio[name="service"]')[2].checked = true;

  //enter=13
  //space=32
  $(document).keypress(function(e) {
    if(e.shiftKey && (e.which == 13) ) {
      $('form').submit();
    }
  });
}

// load jQuery and execute the main function
addJQuery(main);
