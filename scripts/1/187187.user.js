// ==UserScript==
// @name       faceguydb Chat Box Notify
// @namespace  com.douglashuck.ogame.forum.chat.notify
// @version    0.2.0
// @description  enter something useful
// @include      *tradefederation2.forumotion.com/chatbox/index.forum*
// @include      *quantumhaven.forumotion.com/chatbox/index.forum*
// @updateURL      http://userscripts.org/scripts/source/187187.user.js
// @downloadURL    https://userscripts.org/scripts/source/187187.user.js
// @grant          GM_getValue
// @grant          GM_setValue
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @copyright  2013 Douglas Huck - NO WARRENTY - Public Domain
// ==/UserScript==
if (typeof jQuery !== "undefined") {
	main ($);
} else {
	add_jQuery (main, "1.7.2");
}

function add_jQuery (callbackFn, jqVersion) {
	var jqVersion   = jqVersion || "1.7.2";
	var D           = document;
	var targ        = D.body || D.documentElement;
	var scriptNode  = D.createElement ('script');
	scriptNode.src  = 'http://ajax.googleapis.com/ajax/libs/jquery/' + jqVersion + '/jquery.min.js';
	scriptNode.addEventListener ("load", function () {
		var scriptNode          = D.createElement ("script");
		scriptNode.textContent  =  'var gm_jQuery  = jQuery.noConflict (true);\n' + '(' + callbackFn.toString () + ')(gm_jQuery);';
		targ.appendChild (scriptNode);
	}, false);
	targ.appendChild (scriptNode);
	main ($);
}
var lastSize = 0;

var timer="";
var startTitle=document.title;
var isBlurred=false;
var newMessage=false;
var userName="faceguydb";
var checkboxDisable = "";
var keepAliveCheckbox = "";
var userNameField = "";
var soundUrlField = "";
var newSound = new Audio('http://douglashuck.com/temp/aim.mp3');
function main ($) {
	GM_getValue = function(name, defaultValue) {
		var value = localStorage.getItem(name);
		if (!value)
			return defaultValue;
		var type = value[0];
		value = value.substring(1);
		switch (type) {
			case 'b':
				return value == 'true';
			case 'n':
				return Number(value);
			default:
				return value;
		}
	}
	GM_setValue = function(name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(name, value);
	}
	soundUrlField = $('<span class="gen"><label>Sound Url: <input type="text" id="soundUrlField" name="soundUrlField" value="'+GM_getValue('soundUrlField', 'http://douglashuck.com/temp/aim.mp3')+'" /></label></span>');
	$('#chatbox_main_options').prepend("&nbsp;|&nbsp;");
	$('#chatbox_main_options').prepend(soundUrlField);
	checkboxDisable = $('<span class="gen"><label>Enable Sound: <input type="checkbox" id="enableSound" name="enableSound" value="" '+GM_getValue('enableSound', 'checked')+'></label></span>');
	$('#chatbox_main_options').prepend("&nbsp;|&nbsp;");
	$('#chatbox_main_options').prepend(checkboxDisable);
	keepAliveCheckbox = $('<span class="gen"><label>Keep Alive: <input type="checkbox" id="keepAliveCheckbox" name="keepAliveCheckbox" value=""'+GM_getValue('keepAliveCheckbox', 'checked')+'></label></span>');
	$('#chatbox_main_options').prepend("&nbsp;|&nbsp;");
	$('#chatbox_main_options').prepend(keepAliveCheckbox);
	userNameField = $('<span class="gen"><label>Username: <input type="text" id="userNameField" name="userNameField" value="'+GM_getValue('userNameField', 'faceguydb')+'" /></label></span>');
	$('#chatbox_main_options').prepend("&nbsp;|&nbsp;");
	$('#chatbox_main_options').prepend(userNameField);
	//$('#chatbox_messenger_form table table tr').prepend(userNameField);
    tradeLink = $('<a class="cattitle" id="tradeLinkA">Trade Calc</a>');
    tradeLink.click(function(){
        if($('#tradeLink').length != 0){
            $('#tradeLink').remove();
        }else{
       		$('#chatbox').parent().append('<iframe style="position:relative;width:100%;height:600px;" id="tradeLink" src="http://proxyforgame.com/us/ogame/calc/trade.php"></iframe>');
        }
    });
    $('.cattitle').parent().append("&nbsp;|&nbsp;");
    $('.cattitle').parent().append(tradeLink);
	$('#enableSound').change(function(){
		if($('#enableSound').attr('checked')){
			GM_setValue('enableSound', 'checked');
		}else{
			GM_setValue('enableSound', '');
		}
	});
	$('#keepAliveCheckbox').change(function(){
		if($('#keepAliveCheckbox').attr('checked')){
			GM_setValue('keepAliveCheckbox', 'checked');
		}else{
			GM_setValue('keepAliveCheckbox', '');
		}
	});
	$('#userNameField').change(function(){
		GM_setValue('userNameField', $('#userNameField').val());
	});
	$('#soundUrlField').change(function(){
		GM_setValue('soundUrlField', $('#soundUrlField').val());
		newSound = new Audio($('#soundUrlField').val());
	});
	$('#message').attr('size', '100');
	$('#soundUrlField').change();
	setTimeout(function(){
		$('#soundUrlField').change();
		refresh();
		setInterval(checkForChange,50);
	},3000);

	$(window).on("blur",function() {
		isBlurred = true;
		timer=window.setInterval(function() {
			if(newMessage){document.title = (document.title == startTitle ? "New Message!" : startTitle);}
		}, 1000);
	}).on("focus",function() {
		isBlurred = false;
		document.title = startTitle;
		clearInterval(timer);
		newMessage = false;
	});
	setUpKeepAlive();
	$('[name="post"]').submit(setUpKeepAlive);
}

var keepAliveTimer = "";
function setUpKeepAlive(){
	clearInterval(keepAliveTimer);
	keepAliveTimer = setInterval(keepAlive,(Math.floor((Math.random()*(4*60))+(10*60))*1000));//Mins*Seconds*Milliseconds
}
function checkForChange(){
	if($('#chatbox').html().length != lastSize && lastSize > 0){
		if($('#chatbox').children().last().find('.user a').text() == $('#userNameField').val() || $('#chatbox').children().last().find('.msg').text() == "."){

		}else{
			if($('#enableSound').attr('checked')){
				newSound.play();
			}
			newMessage = true;
		}
	}
	lastSize = $('#chatbox').html().length;
}
function refresh(){
	$("#chatbox_main_options a:contains('Refresh')").click();
}
function keepAlive(){
	if($('#keepAliveCheckbox').attr('checked')){
		$('#message').val('.');
		$('#submit_button').click();
	}
}