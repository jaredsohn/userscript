// ==UserScript==
// @name        MegaTypers.com Improved
// @namespace   MegaTyperz
// @description improvements for megatypers.com
// @include     http://www.megatypers.com/*
// @version     1.7
// @datecreated		2013-01-22
// @lastupdated		2013-01-30
// @author			Volkan KIRIK
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

/* UserScript Settings */
var allow_r_message_hide = true; // Allow to hide random messages on click
var change_captcha_font = true; // Use 'PT Serif' instead of 'PT Sans' in captcha input.
var always_show_refresh = true; // Always show refresh button in Work page
var enable_sound_notice = true; // Add sound notice option for captcha work
var sound_notice_checked = true; // Activate sound notice option by default
var sound_notice_volume = 1; // Number : (Default: 0.8) : Defines the initial volume as a value from 0 to 1. ( Silence: 0 , Half: 0.5 , Maximum: 1 )
var interval_millisec = 500; // The intervals (in milliseconds) on how often to execute the code. Tip: 1000 ms = 1 second. ( Recommended range: 100-1000 ms)
/* End of UserScript Settings */

if ( !(allow_r_message_hide==false) ) {
var mrandom = document.getElementById('messages-random');

if (mrandom) {
	mrandom.onclick=function(){ 
		$("#messages-random").fadeOut(); 
		if ( ($('#captcha')[0]) && ($('#captcha').is(':visible')) ) {
			$('#captcha').focus();
		}
	};
}
}

var captcha_font_js = '' + "\r\n"
+'$("head").append("<link href=\'http://fonts.googleapis.com/css?family=PT+Serif\' rel=\'stylesheet\' type=\'text/css\'>");' + "\r\n"
+'' + "\r\n"
+'old_font_family=$("#captcha").css("font-family");' + "\r\n"
+'$("#captcha").css("font-family", "\'PT Serif\', "+old_font_family);' + "\r\n"
+'//alert($("#captcha").css("font-family")); // for debug' + "\r\n"
+'';

var refresh_js = '' + "\r\n"
+'show_refresh_button = function(){' + "\r\n"
+"	if ( $('#lgn').is(':hidden') ) {" + "\r\n"
+"		$('#lgn').html('Refresh');" + "\r\n"
+"		$('#lgn').fadeIn();" + "\r\n"
+'	}' + "\r\n"
+'}' + "\r\n"
+'setInterval(show_refresh_button,'+interval_millisec+');' + "\r\n"
+'';

var sound_alert_js = '' + "\r\n"
+'function play_sound(){' + "\r\n"
+'	$("#jquery_jplayer").jPlayer("setMedia", {' + "\r\n"
+'		mp3: "http://www.9kw.eu/grafik/test.mp3"' + "\r\n"
+'	});' + "\r\n"
+'	$("#jquery_jplayer").jPlayer("play");' + "\r\n"
+'	//alert("ton?");' + "\r\n"
+'	return 1;' + "\r\n"
+'}' + "\r\n"
+'' + "\r\n"
+'var captcha_arrived = function(event) {' + "\r\n"
+'	current_captcha_img = $("#captcha_img").attr("src");' + "\r\n"
+'	if (window.last_captcha_img != current_captcha_img){' + "\r\n"
+'		if( $("#sound").attr("checked")){' + "\r\n"
+'			//alert("SOUND PLAYS!"); // for debug' + "\r\n"
+'			play_sound();' + "\r\n"
+'		}' + "\r\n"
+'		//alert("CAPTCHA ARRIVED!"); // for debugging' + "\r\n"
+'		window.last_captcha_img = current_captcha_img;' + "\r\n"
+'	}' + "\r\n"
+'}' + "\r\n"
+'$("#captcha").bind("focus", captcha_arrived);' + "\r\n"
+'';

if ( /^\/work(?:\?.*)?$/i.test(window.location.pathname) ){
	if ( !(change_captcha_font==false) ) {
		// inject captcha text font change js
		addScript(document.body,captcha_font_js);
	}
	if ( !(always_show_refresh==false) ) {
		// inject refresh button js
		addScript(document.body,refresh_js);
	}
	// find work_cnt div so we can append to it
	work_cnt = false;
	if ( !(enable_sound_notice==false) ) {
		work_cnt = document.getElementById('work_cnt');
	}
	if (work_cnt) {
		// sound checkbox
		my_widget=document.createElement('div');
		my_widget.setAttribute("class", 'widget');
		my_widget.setAttribute("style", 'padding: 5px;');
		work_cnt.appendChild(my_widget);
		sound_checkbox=document.createElement('input');
		sound_checkbox.setAttribute("type", 'checkbox');
		sound_checkbox.setAttribute("name", 'sound');
		sound_checkbox.setAttribute("id", 'sound');
		sound_checkbox.setAttribute("value", 1);
		if ( !(sound_notice_checked==false) ) {
			sound_checkbox.setAttribute("checked", 'checked');
		}
		my_widget.appendChild(sound_checkbox);
		// sound checkbox - text node
		addScript('', 'add_sound_checkbox_text=setInterval( function(){ if ( ($("input#sound")[0]) && ($("input#sound").is(\':visible\')) ) {$("input#sound").after(\'<label for="sound"><strong> Sound</strong></label>\'); $(\'input:checkbox\').checkbox(); clearInterval(add_sound_checkbox_text); } }, '+interval_millisec+');'); 
		// jquery_jplayer div
		jquery_jplayer=document.createElement('div');
		jquery_jplayer.setAttribute("id", 'jquery_jplayer');
		work_cnt.appendChild(jquery_jplayer);
		// jquery jplayer plugin
		addScript(work_cnt, '', 'http://www.9kw.eu/grafik/js/jquery.jplayer.min.js');
		// jquery jplayer init js
		jplayer_init_js=''
		+'function init_jplayer() { $("#jquery_jplayer").jPlayer({ swfPath: "http://www.9kw.eu/grafik/js", supplied: "mp3", wmode: "window", volume: '+sound_notice_volume+' }); }' + "\r\n"
		+'function is_function(obj) { return !!(obj && obj.constructor && obj.call && obj.apply); }' + "\r\n"
		+'initing_jplayer=setInterval(function(){ if (is_function($("#jquery_jplayer").jPlayer) ) { init_jplayer(); clearInterval(initing_jplayer); } }, '+interval_millisec+');' + "\r\n";
		addScript(work_cnt, jplayer_init_js);
		// inject play sound function and onfocus listener
		addScript(document.body,sound_alert_js);
	}
}

if ( /^\/register(?:\?.*)?$/i.test(window.location.pathname) ){
	var affiliate_id_elem = document.getElementById('affiliate_id');

	if (affiliate_id_elem) {
		old_aff_id = affiliate_id_elem.getAttribute("value");
		if ( (old_aff_id==null) || (old_aff_id.length==0) ){
			affiliate_id_elem.setAttribute("value","5GI3");
		}
	}
}


/*
################################################
#   INTERNAL USERSCRIPT FUNCTIONS
################################################
*/

// Function : addScript()
// Source: http://userscripts.org/groups/51

function addScript(body, js, link) {
	if (!body){
		var body = document.body; 
	}
	script = document.createElement('script');
    if (!body) return;
    script.type = 'text/javascript';
	if ( (js=='') && (link!='') ){
		script.src = link;
	} else {
		script.textContent = js;
	}
    body.appendChild(script);
	//return script;
}

