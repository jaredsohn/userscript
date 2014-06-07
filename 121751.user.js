// ==UserScript==
// @name	MegaUploadForum.net Helper
// @namespace	http://userscripts.org/users/45791
// @description	Automatically decrypts the links on megauploadforum.net
// @include	http://www.megauploadforum.net/viewtopic.php*
// @version	1.0
// @author	xxbeanxx   
// @require	http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==


var timeout = 10000;

if (!("console" in window) || !("firebug" in console)) {
	var names = [
		"log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group",
		"groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"
	];

	window.console = {};

	for (var i = 0; i < names.length; i++) {
		window.console[names[i]] = function() {};
	}
}

console.info("Starting MegaUploadForum.net helper...");

var $codeBoxes = jQuery("dl[class=codebox]");
var nCodeBoxes = $codeBoxes.length;
console.debug("Found " + nCodeBoxes + " codeboxes...");

$codeBoxes.each(function(index) {
	console.debug("Processing codeBox " + (index+1) + "/" + nCodeBoxes);

	var $codeBox = jQuery(this);
	$codeBox.prepend(
		jQuery("<button>")
			.html("+")
			.css("float", "right")
			.click(function() {
				console.debug("Button " + (index+1) + " clicked...");
				var $button = jQuery(this);
				buttonClick($button, $codeBox);
			})
	);
});


function buttonClick($button, $codeBox) {
	var $encryptedLinks = jQuery("a[href^=redirect.php]:contains('DOWNLOADS')", $codeBox);
	var nEncryptedLinks = $encryptedLinks.length;
	console.debug("Found " + nEncryptedLinks + " in selected codebox");
	$encryptedLinks.each(function(index) {
		var $encryptedLink = jQuery(this);
		setTimeout(function() {
			var finalLink = (index+1) === nEncryptedLinks;
			$button.html((index+1) + "/" + nEncryptedLinks);
			decrypt($button, $encryptedLink, finalLink);
		}, timeout * index);
	});
}

function decrypt($button, $encryptedLink, finalLink) {
	GM_xmlhttpRequest({
		method: "GET",
		url: $encryptedLink.attr("href"),
		onload: function(responseDetails) {
			$encryptedLink.attr("href", responseDetails.finalUrl);
			$encryptedLink.html(
				jQuery("<span>")
					.html(responseDetails.finalUrl)
					.css("color", "#009000")
					.css("margin-left", "1em")
			);
			if (finalLink === true) {
				$button.remove();
			}
		}
	});
}