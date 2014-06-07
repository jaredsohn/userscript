// ==UserScript==
// @name           Feed Purchase
// @description    Feed Purchase
// @include        http://apps.facebook.com/friendsforsale/users/buy_from_feed_form/*
// ==/UserScript==
var _petID = "0";
var _curID = "0";

//alert('DEBUG -->' + document.location.href);
 {

	var petProfile = document.getElementsByClassName("profile_photo");
	var petLink = petProfile[0].getElementsByTagName("a")[0].href;
	_petID = petLink.substring(petLink.lastIndexOf("/")+1); 

	var iCurID = document.body.innerHTML.indexOf(" id: ");
	_curID = document.body.innerHTML.substring(iCurID + 5, document.body.innerHTML.indexOf(",", iCurID + 6));
	
	 {
		var forceBuyHTML = 
			"<form method=\"POST\" action=\"/friendsforsale/users/buy/" + _petID + "\" id=\"app7019261521_buy_form\">" +
				"<input type=\"hidden\" value=\"" + _curID + "\" name=\"buyer_id\" id=\"app7019261521_buyer_id\">" +               
					"<div class=\"sliding_window_left\" id=\"app7019261521_purchase_button\">" +
						"<div class=\"sliding_window_right\">" +
							"<div class=\"sliding_window_bottom\">" +
								"<div class=\"sliding_window_corner\">" +
									"<a class=\"buy_dialog_button \" id=\"app7019261521_buy_submit\" clickthrough=\"true\" clicktotoggle=\"buy_submit,submitting\" onclick=\"(new Image()).src = '/ajax/ct.php?app_id=7019261521&amp;action_type=3&amp;post_form_id=c04ddce7a4c0a57672e5eebb0b7f8f6d&amp;position=3&amp;' + Math.random();FBML.clickToToggle(&quot;app7019261521_buy_submit&quot;);FBML.clickToToggle(&quot;app7019261521_submitting&quot;);fbjs_sandbox.instances.a7019261521.bootstrap();return fbjs_dom.eventHandler.call([fbjs_dom.get_instance(this,7019261521),function(a7019261521_event) {a7019261521_$('#buy_form').submit(); return false;},7019261521],new fbjs_event(event));return true;\" href=\"#\">Force Buy</a>" +
								"</div>" +
							"</div>" +
						"</div>" +
					"</div>" +
				"</input>" +
			"</form>";
		
		
		document.body.innerHTML = document.body.innerHTML.replace("<div class=\"profile_photo\">",
        <div class=\"profile_photo\">" +
        <div class=\"sliding_window_left\">", 
  
			
			"");

	}
}

		