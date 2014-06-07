// ==UserScript==
// @author         Tiwaz
// @name           Votebutton
// @version        0.44
// @namespace      Votebutton
// @description    Vote Buttons for erepublik
// @include        http://www.erepublik.com/*
// @include        http://economy.erepublik.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @require        http://www.littlewebthings.com/projects/countdown/demo/js/jquery.lwtCountdown-1.0.js
// @require http://sizzlemctwizzle.com/updater.php?id=101016&days=1&show
// ==/UserScript==

// ===============================================================================
// License and Disclaimer (lets make it simple :))
// ===============================================================================
// This software is open source. You are free to use it like you think you should
// do it. If you realy like it you are welcome to donate eRepublik in-game gold
// to author of this script.  The amount of gold is up to you and it reflects what
// you think author deserves for the effort of contributing to the eRepublik
// community.
// Software is provided 'AS IS' and without any warranty.
// Use on your own responsibility.
// ===============================================================================

// ===============================================================================
// Changelog:
// ===============================================================================
// v 0.44
// much better positioning of the button, should not appear on map or pay-gold
// page any more
// preparations for counter
// v 0.43
// lowered update-interval from 3 to 1 day
// v 0.42
// minor css-change for better positioning with/without eRep-Advanced
// v 0.41
// added another promising voting-page
// included update-script
// v 0.40
// changes to adopt to new interface of eRep
// ===============================================================================

// ===============================================================================
// Config
// ===============================================================================

var showCounter = false;

// ===============================================================================
// Images
// ===============================================================================
var vote_Img = 'data:image/png;base64,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';

function GM_addStyle(css) {
    var style = document.createElement('style');
    style.textContent = css;
    document.getElementsByTagName('head')[0].appendChild(style);
}

// ===============================================================================
// Style variables
// ===============================================================================
GM_addStyle(
	'.vote_options { background-image: url("http://www.erepublik.com/images/modules/sidebar/background.png"); background-repeat: repeat; border: 2px solid #EBEBEB; border-radius: 5px 5px 5px 5px; float: left; margin-right: 18px; padding: 11px 11px 8px; width: 149px; margin-top: 10px; clear: left; }' +
	'.vote_options .vote_content { -moz-border-radius: 5px 5px 5px 5px; background: url("http://www.erepublik.com/images/parts/map-erepublik-logged.png") no-repeat scroll -955px 0 transparent; width: 139px; }' +
	'.vote_options .vote_content .vote_main .vote_slider { border: none; padding: none; }' +
	'.vote_options .vote_content .vote_main .vote_slider .vote_title { background: url(' + vote_Img + ') no-repeat scroll 0px 0px transparent; width: 149px; height: 25px; }' +
	'.vote_options .vote_content .vote_main .vote_slider:hover .vote_title { background-position: -149px 0px; }' +
	'.vote_options .vote_content .vote_main .vote_slider:active .vote_title { background-position: -149px 0px; }' +
	'.vote_options .vote_content .vote_main .vote_slider .vote_sliderup { display: none; background: url(' + vote_Img + ') no-repeat scroll 0px -25px transparent; width: 149px; height: 12px; }' +
	'.vote_options .vote_content .vote_main .vote_slider:hover .vote_sliderup { background-position: -149px -25px; }' +
	'.vote_options .vote_content .vote_main .vote_slider:active .vote_sliderup { background-position: -149px -25px; }' +
	'.vote_options .vote_content .vote_main .vote_options_inner { font-size: 12px; height: 0px; overflow: hidden; padding-top: 0px; padding-bottom: 0px; padding-left: 3px; padding-right: 3px; }' +
	'.vote_options .vote_content .vote_main .vote_options_inner table tr td { cursor: default; font-size: 10px; height: 20px; padding:2px }' +
	'.vote_options .vote_content .vote_main .vote_options_inner table tr td input { vertical-align: text-bottom; }' +
	'#countdown { height: 20px; width: 149px; margin: auto;}' +
	'.dash { width: 40px; height: 20px; float: left; margin-top: 0px; margin-left: 4px; padding-left: 5px; position: relative; color: black; }' +
	'.dash .digit { font: bold 8pt Verdana; font-weight: bold; float: left; width: 16px; text-align: center; position: relative; }' +
	'}'
);

function showCounterEval(){
   var counterCode = '';
   if(showCounter){
      counterCode = '<div id="countdown">' +
                       '<div class="dash hours_dash">' +
                          '<div class="digit">2</div><div class="digit">3</div>' +
                       '</div>' +
                       '<div class="dash minutes_dash">' +
                          '<div class="digit">5</div><div class="digit">9</div>' +
                       '</div>' +
                       '<div class="dash seconds_dash">' +
                          '<div class="digit">5</div><div class="digit">9</div>' +
                       '</div>' +
                    '</div>';
	}
	return counterCode;
}

function Main()  {
  
	$('#content').css('float', 'right');

	$('#content').after(
		'<div class="vote_options">' +
			'<div class="vote_content">' +
				'<div class="vote_main">' +
					'<table border="0" cellspacing="0" cellpadding="0">' +
					   '<tr>' +
							'<td style="font-size: 1px;">' +
								'<a class="vote_slider" href="javascript:;">' +
									'<div class="vote_title"></div>' +
								'</a>' +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td>' +
								'<div class="vote_options_inner">' +
									'<table border="0" cellspacing="0" cellpadding="5">' +
										'<tr>' +
											'<td><a href="http://bit.ly/aH9UuZ" target="_blank"><img src="http://bit.ly/b9Y5yR" style="border:0;" height="23" width="65"></a></td>' +
											'<td><a href="http://bit.ly/bPmfAJ" target="_blank"><img src="http://bit.ly/bGCi3Y" style="border:0;" height="23" width="65"></a></td>' +
										'</tr>' +
										'<tr>' +
											'<td><a href="http://bit.ly/eRDep3" target="_blank"><img src="http://bit.ly/gk0lKR" style="border:0;" height="23" width="65" title="Klicke in den nicht ganz geschlossenen Kreis / Click in the circle which is not closed"></a></td>' +
											'<td><a href="http://bit.ly/acJn2P" target="_blank"><img src="http://bit.ly/91tgIv" style="border:0;" height="23" width="65"></a></td>' +
										'</tr>' +
										'<tr>' +
											'<td><a href="http://bit.ly/lF0Rkd" target="_blank"><img src="http://bit.ly/jFIVQH" style="border:0;" height="23" width="65"></a></td>' +
											'<td><a href="http://bit.ly/lq70Us" target="_blank"><img src="http://bit.ly/mfyYBj" style="border:0;" height="23" width="65"></a></td>' +
										'</tr>' +
										'<tr>' +
											'<td><a href="http://bit.ly/j97ow3" target="_blank"><img src="http://bit.ly/j9gUTD" style="border:0;" height="23" width="65"></a></td>' +
											'<td></td>' +
										'</tr>' +
									'</table>' +
									showCounterEval() +
								'</div>' +
								'<a class="vote_slider" href="javascript:;">' +
									'<div class="vote_sliderup"></div>' +
								'</a>' +
							'</td>' +
						'</tr>' +
					'</table>' +
				'</div>' +
			'</div>' +
		'</div>'
	);

	$('.vote_slider').click(function() {
		if($('.vote_options_inner').css('overflow') != "visible") {
			$('.vote_options_inner').css('overflow', 'visible');
		} else {
		   $('.vote_options_inner').css('overflow', 'hidden');
		}
		if($('.vote_options_inner').css('height') != '130px') {
			$('.vote_options_inner').animate({ 'height': '130px', 'paddingTop': '5px', 'paddingBottom': '5px' }, 'fast' );
		} else {
			$('.vote_options_inner').animate({ 'height': '0px', 'paddingTop': '0px', 'paddingBottom': '0px' }, 'fast' );
		}
		$('.vote_sliderup').css('display',$('.vote_sliderup').css('display')=='none'?'block':'none');
	});
};

$(document).ready(function() {

	if (jQuery('#large_sidebar').html() == undefined) {
		return;
	}
	
	Main();
	
	$('#countdown').stopCountDown();
	$('#countdown').setCountDown({
		targetOffset: {
				'hour': 23,
				'min':  59,
				'sec':  59
		}
	});	
	$('#countdown').startCountDown();
});