// ==UserScript==
// @name        Customizing the Gordy Club forum (Chrome version)
// @namespace   GordigyClub
// @description Some customizings of the forum
// @author      BrainFucker <retratserif@gmail.com>
// @match       http://forum.theprodigy.ru/*
// @version     1.3
// @grant       none
// ==/UserScript==


///// Written by BrainFucker <retratserif@gmail.com>

// Adding jquery for Google Chrome
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//forum.theprodigy.ru/includes/jquery-latest.js");
  script.addEventListener('load', function() {
  var script = document.createElement("script");
  script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
  document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main(){
  // Redirect to main page after logining in:
  if (document.location.href=='http://forum.theprodigy.ru/index.php?board=;action=login2'){
    document.location.href = '/';
  }

  //// Duplicating new comments notify and scrolling to the last messages list
  if (document.title == "Форум фанов Prodigy - Index"){
    // Creating new container for notifies
    jQuery("table.bordercolor:nth-child(2)").after('<div id="Notify"></div>');
    // Copying notify content
    jQuery('#Notify').append($("#instantMessages").parent().html());
    // Removing new lines
    jQuery('#Notify > br:eq(1)').replaceWith(' ');
    // document.location.hash=document.location.hash
    document.location.hash = "#Notify";
  }
  
  // Disabling fucking snow flackes by removing canvas:
  if (document.getElementById('canvas')){
  jQuery("canvas").remove();
  // Have to undefine animation functions because they still load cpu
  fall = checkFlakesPosition = draw = animation = function(){return false;}
  }
}

if (typeof jQuery == 'undefined'){
    addJQuery(main);
}
else {
    main();
}
