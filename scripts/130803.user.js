// ==UserScript==
// @name           NeoGAF: AusGAF Tab
// @namespace      http://www.neogaf.com/forum/
// @match        http://www.neogaf.com/forum/*
// ==/UserScript==

// CHROME VERSION

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

(function main() {
	$(".forum-tabs").append("<li class=''><a href='http://www.neogaf.com/forum/showthread.php?t=465230&goto=newpost'>AusGAF</a></li>");
	$(".forum-tabs").append("<li class=' child'><a href='http://www.neogaf.com/forum/subscription.php'>Subscriptions</a></li>");

	$('div.controlbar table tr').append('<td><div class="imagebutton" id="customCmdSpoiler">Spoiler</div></td>');
	var butt = $('div.controlbar table tr');
	console.log(butt);
	$('div#customCmdSpoiler').click(function(){
		$('textarea#vB_Editor_001_textarea').append('[spoiler][/spoiler]');
	})
})();

addJQuery(main);