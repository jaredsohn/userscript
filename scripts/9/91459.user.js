// ==UserScript==
// @name           AdmailShortcut
// @namespace      com.wastelandwares.admailShortcut
// @include        https://www.admail.net/emailbuilder/
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
	jQuery(function($) {
		$("body").append('<div id="hidden-ct" style="display: none;"></div>');
		$("body").append('<textarea id="ct" style="position:absolute;top:5px;right:5px;font:10px/1.2em arial,sans-serif;" cols="60" rows="3" onclick="this.focus();this.select();"></textarea>');
		$("#hidden-ct").load("https://www.admail.net/emailbuilder/viewer.php?type=eBuilder", function() {
			$("#hidden-ct title").remove();
			$("#ct").text($("#hidden-ct").html().replace(/\n/g, '').replace(/\r/g, ''));
		});
	});
}

setTimeout(function() {addJQuery(main);}, 3000);