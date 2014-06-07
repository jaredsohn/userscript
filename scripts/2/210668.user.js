// ==UserScript==
// @name        Customizing the Gordy Club forum
// @author      BrainFucker <retratserif@gmail.com>
// @namespace   GordigyClub
// @description Some customizings of the forum
// @include     http://forum.theprodigy.ru/*
// @version     1.3
// @grant       none
// ==/UserScript==


///// Written by BrainFucker <retratserif@gmail.com>

// Redirect to main page after logining in:
if (document.location.href=='http://forum.theprodigy.ru/index.php?board=;action=login2'){
    document.location.href = '/';
}

// Disabling fucking snow flackes by removing canvas:
if (document.getElementById('canvas')){ 
  jQuery("canvas").remove();
  // Have to undefine animation functions because they still load cpu
  unsafeWindow.fall = unsafeWindow.checkFlakesPosition = unsafeWindow.draw = unsafeWindow.animation = function(){return false;}
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