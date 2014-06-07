// ==UserScript==
// @name		donkey4u_no_crab
// @namespace		donkey4u_no_crab
// @version		0.1
// @include		http://donkey4u.com/*
// author		admin@donkey4u.com
// 2012-09-19		initial version
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
$('img.thumbimg').each( function(){ $(this).attr('src', 'http://thumb.donkey4u.com/'+$(this).attr('hash')+'/thumb.jpg' ); } );
$('a[usage=ed2k]').each( function(){ $(this).css("visibility", "visible");} )
}

addJQuery(main);

