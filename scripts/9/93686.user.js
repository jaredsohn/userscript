// ==UserScript==
// @name          eve-kill onclick event to normal link
// @author	  Slotos
// @description	  Name tells it all. Eve-kill is a good killboard with ugly decision of handling navigation via onclick events. I hate being unable to open link in new tab. This script should fix that.
// @include	  http://eve-kill.net/*
// @include	  http://*eve-kill.net/*
// @include	  http://*killmail.org/*
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  test = true;
 $('tr.[class^="kb-table-row-"][onclick]').each(
    function(){
      clicker = $(this).attr('onclick')+"";
      ref = clicker.replace(/[\s\S]*\.href='(.*)';[\s\S]*/, "$1");
      $(this).children().each( function() {
        ship = $(this);
        linq = '<a href="' + ref + '">' + ship.html() + '</a>';
        ship.html(linq);
      });
    });
  $('tr.[class^=kb-table-row-][onclick] a').css({'display' : 'block', 'color':'inherit', 'text-color':'inherit', 'background':'inherit', 'text-decoration':'none', 'height':'100%'});

  $('tr.[class^=kb-table-row-][onclick]').removeAttr('onclick');
  $('tr.[class^=kb-table-row-]').css('cursor', 'none');
}

// load jQuery and execute the main function
addJQuery(main);