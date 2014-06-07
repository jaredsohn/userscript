// ==UserScript==
// @name           newMods
// @description    select only the new mods
// @include        http://www.minecraftforum.net/forum/51-released-mods/
// @include        http://www.minecraftforum.net/forum/51-released-mods/*
// ==/UserScript==

//http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
// not very intuitive, but it's a start

  $(".topic_title:contains(1.7)").parent().parent().addClass('current');
  $(".topic_title").parent().parent().not('.current').hide();

}

// load jQuery and execute the main function
addJQuery(main);