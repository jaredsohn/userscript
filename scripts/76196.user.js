// ==UserScript==
// @name		HSBC Virtual Keyboard Killer
// @namespace		http://www.tumbledesign.com
// @description		Replaces the crappy "virtual keyboard" for the HSBC Security Key with a simple text input box. Also adds a link on the main page that jump directly to the login page.
// @include		http://www.hsbc.com/*
// @include		https://www.us.hsbc.com/1/2/*
// @include		https://www.hsbcdirect.com/1/2/*
// ==/UserScript==

(function() { 
	// Load JQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);
    function JqWait()
    {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(JqWait,100);
        } else {
            $ = unsafeWindow.jQuery;
            GM_main();
        }
    }
    JqWait();
})();

function GM_main() {
	if ($(".containerEntity").size()) { // Detects home page
		console.log("gm homepage");
		GM_addStyle(".loginlink { background: #aaaaaa; height: 20px; padding: 5px; text-align: center; } "
			+ ".loginlink a { font-family: arial; font-size: 10pt; font-weight: bold; color: white; }");
		$(".containerEntity").prepend(
			$("<div>").addClass("loginlink").append(
				$("<a>").append("Proceed to Account Login")
					.attr("href", "https://www.us.hsbc.com/1/2/3/personal/online-services/personal-internet-banking/log-on")));
		return;
	} else if ($("#password").size()) { // Detects password page
		GM_addStyle(".securityfield { padding-top: 0 !important; } "
			+ ".securitykey { margin-left: -10px !important; margin-right: 5px !important; width: 75px !important; }");
		var key = $("<fieldset>").attr("title", "Security Key").addClass("securityfield")
				.append($("<label>").attr("for", "password").addClass("left securitykey").append("Security Key:"))
				.append($("<input>").attr({"id": "password", "type": "password", "name": "password", "value": ""}))
				.append($("<a>").addClass("assist").append("Forgot your Security Key?")
					.attr("href", "https://www.hsbcdirect.com/1/2/?idv_cmd=idv.OnlineCAMReset&OLRLink=CAM30ForgotPasswordLink"));
		$(".VKSectionBgColor").parent().remove();
		$(".id_on").remove();
		$(".id_off").remove();
		$("#memorableAnswer").parent().after(key);

	}
}