// Camden Conference QA Tweaks
// version 0.2
// 2012-02-17
// Copyright (c) 2012, Adam Courtemanche
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// ==UserScript==
// @name          Camden Conference QA Tweaks
// @namespace     http://agileadam.com
// @description   Basic tweaks for the Camden Conference QA system
// @include       http://qa.camdenconference.org*
// @exclude       
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// jquery goodies here
function main() {
  // Change Portland to Ellsworth in the table listing current entries
  $('table.q-list tr').each(function(){
    if ($(this).children(':first').html() == '<b>Portland</b>') {
      $(this).children(':first').html('<b>Ellsworth</b>');
    }
  });

  // Change Portland to Ellsworth in the radio group on the "edit" page
  $('input[name="location"][value="2"]').each(function(){
    $(this).parent().html($(this).parent().html().replace('Portland', 'Ellsworth'));
  });
}

// load jQuery and execute the main function
addJQuery(main);
