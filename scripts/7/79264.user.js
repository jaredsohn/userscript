// ==UserScript==
// @name           GaiaOnline - Quick Reply Fixer
// @namespace      http://userscripts.org/users/126924
// @description    Fixes nonstandard characters with quick reply
// @include        http://www.gaiaonline.com/*
// @include 	   http://gaiaonline.com/*
// ==/UserScript==

if( unsafeWindow.YAHOO.gaia.app.Forum != undefined && unsafeWindow.YAHOO.gaia.app.Forum.Detail != undefined ){
	var YAHOO = unsafeWindow.YAHOO;
	var DOM = unsafeWindow.DOM;
	var qr = unsafeWindow.qr;
	var s = unsafeWindow.s;

	YAHOO.gaia.app.Forum.Detail.prototype.submitReply = function(e) {
		unsafeWindow.Event.preventDefault(e);

		var reply = DOM.get('qr_text').value;
		var captcha_vals = '';

		if ( (qr.nonce != null) && reply.length) {
			if (qr.show_captcha) {
				captcha_vals = '&recaptcha_response_field=' + escape(DOM.get('captcha_response').value) + '&recaptcha_challenge_field=' + escape(qr.captcha.challenge);
			}

			if (qr.posting) {
				return;
			}

			/* prevent multiple submit clicks */
			qr.posting = true;

			YAHOO.util.Connect.asyncRequest('POST', qr.post_url,
				{
					success: function(o) {
						var json = YAHOO.lang.JSON.parse(o.responseText);
						if (json.status) {
							/* omniture logging */
							s.pageName = qr.pageName;
							s.t();

							DOM.setStyle('qr_error', 'display', 'none');
							window.location = json.url;
						} else {
							DOM.setStyle('qr_error', 'display', 'block');
							DOM.get('qr_error').innerHTML = json.message;
							qr.nonce = json.nonce;

							qr.posting = false;
						}
					},
					failure: function() { qr.posting = false; },
					scope: this
				},
				'nonce=' + qr.nonce + '&message=' + encodeURIComponent(reply) + '&action_submit=submit' + captcha_vals
			);
		}
	}
}