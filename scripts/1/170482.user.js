// ==UserScript==
// @name        Add Scrap.tf profile link to forum
// @namespace   scraptf
// @include     http://forums.jessecar96.net/showthread.php*
// @version     1
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.$jQ$=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

addJQuery(function() {
	var steamid = "";
	$(".posts .userinfo").each(function( index ) {
		steamid = $('a[title="Steam Profile"]',this).attr("href");
		steamid = steamid.replace("http://steamcommunity.com/profiles/","");
		$(this).append('<a title="scrap.tf" href="http://scrap.tf/profile?s='+steamid+'"><img src="http://media.steampowered.com/steamcommunity/public/images/avatars/7e/7e96d6bb9eaf4ed001c17f95359fe78435c99ae7_full.jpg" width="33" height="33"></img></a>');
	});
});