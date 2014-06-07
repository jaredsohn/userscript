// ==UserScript==
// @name         Noscripts
// @namespace    tHeKiNg
// @description  Alerts you via a popup when the bot check is on screen
// @include      http://api.recaptcha.net/*

// ==/UserScript==

	<noscript>
  		<iframe src="'. $server . '/noscript?k=' . $pubkey . $errorpart . '" height="300" width="500" frameborder="0"></iframe><br />
  		<textarea name="recaptcha_challenge_field" rows="3" cols="40"></textarea>
  		<input type="hidden" name="recaptcha_response_field" value="manual_challenge" />
	</noscript>';