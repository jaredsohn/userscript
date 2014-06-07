// ==UserScript==
// @name          Cleaner weather network 
// @namespace    http://gm.bigbytetech.ca/
// @description   Cleaner interface the weather network. Removes Ads. Use at your own risk! The author assumes no responsibility.
// @include        http://www.theweathernetwork.com/weather/*
// @version    0.4
// @copyright  2011+, Paul Moss
// @Updated		Last updated Saturday, October 20 2012
// ==/UserScript==
var $;

// Add jQuery
(function(){
	GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 200);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		letsJQuery();
	}
}

// All your GM code must be inside this function
function letsJQuery() {
   cleanIt();
}

function setTempButtonCss($btn, imgName){
	$btn.css({'background-attachment' : 'scroll', 'background-clip' : 'border-box', 'background-color' : 'transparent', 'background-image' : 'url(/common/images/global/' + imgName + ')', 'background-origin' : 'padding-box', 'background-position' : '0 0', 	'background-repeat' : 'no-repeat', 'background-size' : 'auto auto', 'text-indent' : '-1000000px'});
}

function setTempLinkCss($jqe){
	$jqe.css({
		'display': 'block',
		'height' : '15px',
		'margin-left' : '-17px',
	   'width' : '15px'
	});
}

function setTempToggleCss(){
	var $far = $('#fahr');
	if ($far.length){
		setTempButtonCss($far, 'btn_fahr_off.gif');
		
		var fahrA = $('#fahr a')[0]; // set css for link to switch
		var $eFahrA = $(fahrA);
		setTempLinkCss($eFahrA);
	}
	var $farOn = $('#fahr_on');
	if ($farOn.length){
		setTempButtonCss($farOn, 'btn_fahr_on.gif');
	}
	var $celc = $('#celc');
	if ($celc.length){
		setTempButtonCss($celc, 'btn_celc_off.gif');
		
		var celcA = $('#celc a')[0]; // set css for link to switch
		var $eCelcA = $(celcA);
		setTempLinkCss($eCelcA);
	}
	var $celcOn = $('#celc_on');
	if ($celcOn.length){
		setTempButtonCss($celcOn, 'btn_celc_on.gif');
	}
}
function moveObs(){
	var $obs = $('div#obs');
	if ($obs.length){
		var obsC = $obs.children();
		var $cw = $(obsC[0]);	//H2 element
		$cw.appendTo('div#rightads'); // move H2 element to right
		
		var $obsConds = $('div#obs_conds');
		$obsConds.css('text-align', 'left');
		setTempToggleCss();
		$obsConds.appendTo('div#rightads'); // move current weather conditions to the right

		//var uls = $('#obs_lists ul');
		var uls = $('#obs_conds ul');
		for (var i = 0; i < uls.length; i++) {
			$eUl= $(uls[i]);
			$eUl.css('display', 'block');
		}
		
		//set ul css for tempswitch
		$('ul#tempswitch').css({'float' : 'left', 'list-style-image' : 'none', 'list-style-position' : 'outside', 'list-style-type' : 'none', 'margin-bottom' : '0', 'margin-left' : '20px', 'margin-right' : '0', 'margin-top' : '12px', 'width' : '15px',});

		var $satradvod = $('div#satradvod_buttons'); // move radar map and video forcast to right side
		if ($satradvod.length){
			$satradvod.css('overflow', 'visible');
			$satradvod.css('width', '280px');
			$satradvod.css('height', '420px');
			$satradvod.css('background-image', 'url()');
			$satradvod.appendTo('div#rightads');
		}
	}
	
	// set css on current tempature
	var currentTemp = $('div#obs_currtemp p')[0];
	$currentTemp = $(currentTemp );

	// for unknow reason at this time setting font family is giveing me a hard time
	//$currentTemp.css('fontFamily', '\"Century Gothic\",Arial,Helvetica,sans-serif');

	$currentTemp.css({'-moz-font-feature-settings' : 'normal', '-moz-font-language-override' : 'normal', '-x-system-font' : 'none', 'font-size' : '4em', 'font-size-adjust' : 'none', 'font-stretch' : 'normal', 'font-style' : 'normal', 'font-variant' : 'normal', 'font-weight' : 'normal', 'letter-spacing' : '-1px', 'line-height' : 'normal'});
	
	// set css for the current temp symbol
	$('p#tempunit').css({'-moz-font-feature-settings' : 'normal', '-moz-font-language-override' : 'normal',  '-x-system-font' : 'none', 'font-family' : '\"Century Gothic\"\,Arial\,Helvetica\,sans-serif', 'font-size' : '2em', 'font-size-adjust' : 'none', 'font-stretch' : 'normal', 'font-style' : 'normal', 'font-variant' : 'normal', 'font-weight' : 'normal', 'letter-spacing' : 'normal', 'line-height' : 'normal','margin-bottom' : '0', 'margin-left' : '3px', 'margin-right' : '0', 'margin-top' : '7px'});
	
	// set css for current condtitions
	$('p#conddesc').css( {'-moz-font-feature-settings' : 'normal', '-moz-font-language-override' : 'normal', '-x-system-font' : 'none', 'clear' : 'left', 'font-size' : '2em', 'font-size-adjust' : 'none', 'font-stretch' : 'normal', 'font-style' : 'normal', 'font-variant' : 'normal', 'font-weight' : 'normal', 'letter-spacing' : 'normal', 'line-height' : 'normal', 'width' : '175px'});
	
	// set the Float left of p elemts of obs
	var obsPs = $('div#obs_currtemp p');
	for (var i = 0; i < obsPs.length; i++) {
		var $obsP= $(obsPs[i]);
		$obsP.css({'float' : 'left', 'display' : 'block'});
	}
}

function cleanIt(){
	$('div#wrap_spo_bg').hide(); // hide the entire page until updates are done
	$('div#inner_ad').hide(); // Flash banners at top of page added Thursday, October 4 2012
	$('div#ccb_container').hide();
	$('div#workopolis').hide();
	$('div#bottomad').hide();
	$('p#promobutton').hide();
	$('div#promowrap-vertical').hide();
	$('div#quickpoll').hide();
	$("div#ugc").appendTo("#ltermfx");
	$('div#wrap_spo_bg').css('background-color', 'white');
	$('div#wrap_spo_bg').css('background-image', 'url()');
	var $rtAd = $('div#rightads');
	$rtAd.html('');
	$rtAd.css('background-color', 'white');
	$('div#logo_en').parent().appendTo('div#rightads');
	$('div#logo_en').css('background-image', 'url(/common/images/global/logos/twn_web_logo.jpg)'); // make certain simple version of logo is being displayed
	$('div#masthead_blue').hide();
	$('div#ypg_box').hide();
	$('div#outer_wrapper').css('background-image', 'url()');
	$('div#logo_en').show();
	$('div#masthead_ad').hide();
	$("[id^=cbox-fn]").hide(); // wildcard selection for iframe starting with cbox-fn
	var $topStories = $('div#wrap_ccb');
	if ($topStories.length){
		$topStories.hide();
	}
	
	moveObs();
	
	$('div#wrap_spo_bg').show(); // show the entire page not that the updates are done
}
