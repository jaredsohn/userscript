// ==UserScript==
// @name	Correct cheggit.net tabulation
// @namespace	http://cheggit.net
// @description Adds the correct order for the fields on login
// @include http://cheggit.net/index.php
// @include http://www.cheggit.net/index.php
// @match http://cheggit.net/index.php
// @match http://www.cheggit.net/index.php
// ==/UserScript==

window.addEventListener("load", function() {
	document.getElementsByName("username" )[0].setAttribute("tabindex", "1" )
	document.getElementsByName("password" )[0].setAttribute("tabindex", "2" )
	document.getElementsByName("recaptcha_response_field" )[0].setAttribute("tabindex", "3" )
		}, false)
