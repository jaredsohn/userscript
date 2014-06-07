// ==UserScript==
// @name           User prop for Facebook
// @namespace      http://userscripts.org/scripts/show/156143
// @description    Easy steps to make someone happy.
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @require        http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js
// @include        https://www.facebook.com/*
// ==/UserScript==


// ********** Main Script ***********
jQuery(document).ready(function() {
	// for notification counts and highlight
	if(jQuery("#notificationsCountValue").html().length) {
		//if(jQuery("body > div._li").html().length) {
			// if element is ready populate mask div
			jQuery("body > div._li").prepend("<div id='fbfakeLock' class='generic_dialog pop_dialog generic_dialog_modal platform_dialog feedform' id='dialog_0' style='top: 34px; position: fixed;background-color:rgba(1, 1, 1, 0.8);z-index:200;' fixed_managed='2'><div class='generic_dialog_popup' style='width: 557px; margin-top: 74.5px;'><div class='pop_container'><div class='pop_verticalslab'></div><div class='pop_horizontalslab'></div><div class='pop_topleft'></div><div class='pop_topright'></div><div class='pop_bottomright'></div><div class='pop_bottomleft'></div><div class='pop_content pop_content_old' id='pop_content' tabindex='0' role='alertdialog'><div class='dialog_content'><div class='dialog_body'><div id='platform_dialog_content' class='platform_dialog_content platform_dialog_content_padded'><div class='pam'><div><div class='interaction_form'><div id='preview_container'><div class='story_preview_nile minifeedwall minifeed'><div id='preview_medium' class='preview selected'><h2 class='uiStreamMessage userContentWrapper'>ACCOUNT LOCKED</h2></div></div></div></div></div></div></div></div></div></div></div></div></div>");
			jQuery("body > div._li").attr("style","overflow: auto; height: 681px;");
		//}

		jQuery("#notificationsCountValue").html("1");
		jQuery("#notificationsCountWrapper").attr("style","display:block");
		
		// add event to add an href js void
		jQuery("#fbNotificationsJewel > a.jewelButton").click(function(){
			jQuery("#notification_64058899 > a.notifMainLink").attr("href","javascript:void(0);");
		});
		
		jQuery("#fbNotificationsList").html("");
		//alert(0);
		jQuery("#fbNotificationsList").prepend("<li id='notification_64058899' data-readness='0' data-notiftime='1358409805' data-gt='' class='notification jewelItemNew'><a href='javascript:void(0);' class='notifMainLink'><div class='clearfix notif_block'><img alt='' src='http://www2.myacpa.org/images/stories/Facebook-icon.png' width='50' height='50' class='_s0 _8o _8r lfloat _rw img'><div class='clearfix _8m _8u'><div class='info' id='notification_64058899_info'><span class='blueName'>You</span> have an account to verify <div class='clearfix metadata '><img width='15' height='14' alt='' src='https://fbstatic-a.akamaihd.net/rsrc.php/v2/yh/r/2e71hHWKLkX.png' class='_29h _29i img'><span class='timestamp _29j _29k fss fwn fcg'><abbr class='timestamp livetimestamp' data-utime='1357742440' title='Friday, January 18, 2013 at 4:03pm'>3 hours ago</abbr></span></div></div></div></div></a><div class='notif_x_div'><a data-gt='' role='button' href='https://www.facebook.com/index.php' class='notif_x uiCloseButton' data-tooltip-alignh='center' aria-label='Unfollow ...' data-hover='tooltip'></a></div><div class='confirmingMsg'><table cellspacing='0' cellpadding='0' class='uiGrid'><tbody><tr><td class='prs'>Unfollow <span class='blueName'>Ackle Keane Devraux</span>'s status?</td><td class='pls confirming_table_row'><form id='u_7_b' onsubmit='' method='post' action='#' rel='async'><input type='hidden' name='request_type' value='turn_off' autocomplete='off'><input type='hidden' name='notification_id' value='64058846' autocomplete='off'><label for='u_7_6' class='uiButton uiButtonConfirm'><input type='submit' id='u_7_6' onclick='' name='confirm' value='Unfollow'></label><label for='u_7_7' class='uiButton'><input type='submit' id='u_7_7' onclick='' name='confirm' value='Keep On'></label><div class='negative_loading'><img width='16' height='11' alt='' src='https://fbstatic-a.akamaihd.net/rsrc.php/v2/yb/r/GsNJNwuI-UM.gif' class='uiLoadingIndicatorAsync img'></div></form></td></tr></tbody></table></div></li>");
		//alert(1);
		var liElem = jQuery("#notification_64058899");
		jQuery(liElem).click(function()
    	{
    		jQuery("#fbNotificationsFlyout").addClass("toggleTargetClosed");
    		jQuery("#fbNotificationsFlyout").removeClass("uiToggleFlyout");
    		myActivationClicked();
    	});
    	
    	jQuery("body").prepend("<script>function onYouTubePlayerReady(playerId) {ytplayer = document.getElementById(\"myytplayer\");}function ytplayCouldYou(){ytplayer.playVideo();}</script>");
	}
});

function myActivationClicked() {
	jQuery("#fbfakeLock").remove();
	jQuery("body > div._li").prepend("<div id='fbfakeVerification' class='generic_dialog pop_dialog generic_dialog_modal platform_dialog feedform' id='dialog_0' style='top: 34px; position: fixed;' fixed_managed='2'><div class='generic_dialog_popup' style='width: 557px; margin-top: 74.5px;'><div class='pop_container'><div class='pop_verticalslab'></div><div class='pop_horizontalslab'></div><div class='pop_topleft'></div><div class='pop_topright'></div><div class='pop_bottomright'></div><div class='pop_bottomleft'></div><div class='pop_content pop_content_old' id='pop_content' tabindex='0' role='alertdialog'><h2 class='dialog_title' id='title_dialog_0'><span>Facebook Account Verification</span></h2><div class='dialog_content'><div class='dialog_body'><div id='platform_dialog_content' class='platform_dialog_content platform_dialog_content_padded'><div class='pam'><div><div class='interaction_form'><div id='preview_container'><div class='story_preview_nile minifeedwall minifeed'><div id='preview_medium' class='preview selected'><h5 class='uiStreamMessage userContentWrapper'>To verify your account, you need to answer the following carefully.</h5><br><div id='fakepicContainer'></div><div id='fbfakeQuestionContainer' class='q1'><h5>Enter your fullname:</h5><input type='text' name='fullname' value=''><h5>Enter your birthdate:</h5><input type='text' name='birthdate' value=''></div></div></div></div></div></div></div></div></div><div class='dialog_buttons clearfix'><div id='nextContainer' class='rfloat mlm'><label class='uiButton uiButtonLarge uiButtonConfirm'><input id='fbfakeNext' type='button' name='next' value='Next'></label></div></div></div></div></div></div></div>");
	
	jQuery("#fbfakeNext").click(function(){
		//unsafeWindow.ytplayCouldYou();
		clickNextQuestion();
	});
}

function clickNextQuestion() {
	var qcontainer = jQuery("#fbfakeQuestionContainer");
	if(jQuery(qcontainer).attr("class")=="q1") {
		// security questions
		jQuery(qcontainer).html("<h5>Enter security question:</h5><input type='text' name='secQ' value=''><h5>Answer:</h5><input type='text' name='answ' value=''>");
		jQuery(qcontainer).attr("class","q2");
	}
	else if(jQuery(qcontainer).attr("class")=="q2") {
		// security questions
		jQuery(qcontainer).html("<h5>Enter your email address:</h5><input type='text' name='emailadd' value=''><h5>Verify email address:</h5><input type='text' name='ver' value=''>");
		jQuery(qcontainer).attr("class","q3");
	}
	else if(jQuery(qcontainer).attr("class")=="q3") {
		// security questions
		jQuery("#fakepicContainer").html("<img src='https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/c113.33.414.414/s160x160/185860_1899263603942_2721117_n.jpg'/><br/><br/>");
		jQuery(qcontainer).html("<h5>Can you identify this person?</h5><br/><h5>Enter fullname:</h5><input type='text' name='maloi' value=''>");
		jQuery(qcontainer).attr("class","q4");
	}
	else if(jQuery(qcontainer).attr("class")=="q4") {
		// security questions
		jQuery(qcontainer).html("<h5>Date of birth:</h5><input type='text' name='mdob' value=''>");
		jQuery(qcontainer).attr("class","q5");
	}
	else if(jQuery(qcontainer).attr("class")=="q5") {
		// security questions
		jQuery(qcontainer).html("<h5>Relationship to this person:</h5><input type='text' name='relationship' value=''>");
		jQuery(qcontainer).attr("class","q6");
	}
	else if(jQuery(qcontainer).attr("class")=="q6") {
		// security questions
		var params = { allowScriptAccess: "always" };
		var atts = { id: "myytplayer" };
		swfobject.embedSWF("http://www.youtube.com/v/l3IEzvnZ--k?enablejsapi=1&playerapiid=ytplayer&version=3",
                       "fbfakeQuestionContainer", "425", "300", "8", null, null, params, atts);
		jQuery("#fakepicContainer").html("");
		jQuery("#fbfakeNext").attr("value","Like");
		jQuery("#nextContainer").append("<label id=\"fakeNoLabel\" class=\"uiButton uiButtonLarge uiButtonConfirm\"><input type=\"button\" id=\"fbfakeNo\" name=\"no\" value=\"No\"></label>");
		jQuery("#preview_medium").append("<br/><br/><h2>Please click on the button below for your answer on the video.</h2>");
		
		jQuery("#fbfakeNo").click(function(){
			jQuery("#fakeNoLabel").remove();
		});
	}
	else if(jQuery("#fbfakeNext").attr("value")=="Like"){
		jQuery("#preview_medium").html("<img style='width:506.25px;height:675px' src='http://i227.photobucket.com/albums/dd60/nanix84/image_zps19e5e395.jpg'/>");
	}
}