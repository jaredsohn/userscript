// ==UserScript==
// @name           Clean Demon v2
// @author	        AnonY-Mice
// @namespace      AnonY-Mice
// @version        1.0.7b
// @description    Tries to detect & remove the stolen script warnings :)
// @include        http://apps.facebook.com/inthemafia/*
// @include        https://apps.facebook.com/inthemafia/*
// @include        http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include        https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          http://apps.facebook.com/inthemafia/*
// @match          https://apps.facebook.com/inthemafia/*
// @match          http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// ==/UserScript==




var my_timeout;
var second_timeout;
var countdown = '';


if (typeof $ == 'undefined') {
	$ = unsafeWindow.$;
}
function log2div(txt){
	var CurrentDate=new Date();
	var hours=CurrentDate.getHours();
	var minutes=CurrentDate.getMinutes();
	if (minutes <=9){
	  minutes ='0'+minutes;
	}	
	var seconds=CurrentDate.getSeconds();
	if (seconds <=9){
	  seconds ='0'+seconds;
	}
	out='CleanDemon v2 <span style="font-size: 8px; background-color: black;">['+hours+':'+minutes+':'+seconds+']:'+txt+'<span>';
	document.getElementById('mice_cleand').innerHTML =out;
}
if ($(document).ready()){	 
      my_timeout = waitForFnc();
}	
function waitForFnc(){
  if (document.getElementById('clanXpResetTimer') == null || $.trim($('#clanXpResetTimer').text()) == ''){	  
	  my_timeout = window.setTimeout(waitForFnc,5000);
	}
	else{
		var div = document.createElement("div");
		div.id = 'mice_cleand';
		div.style.fontSize ='8px';
		div.style.paddingLeft='10px';
		div.style.borderTop='1px solid white';
		div.innerHTML="CleanDemon v2 ";
		var game = document.getElementById('menubar');
		game.insertBefore(div,game.firstChild);

		countdown = $('#clanXpResetTimer').text();
		clearTimeout(my_timeout);
		log2div('Running...');
		start_stuff();
	}

}

function start_stuff(){  
$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
	var originalbeforeSend = options.beforeSend;
	var originalSuccess = options.success;
       options.beforeSend = function (jqXHR,originalOptions) {
	     if (originalOptions && originalOptions.url){	
			//console.info('CD: '+originalOptions.url);		 			
				if (originalOptions.url.indexOf('log10.php') != -1 
				|| originalOptions.url.indexOf('log11.php') != -1 
				|| originalOptions.url.indexOf('pastebin.com') != -1
				|| originalOptions.url.indexOf('RealMedia') != -1
				|| originalOptions.url.indexOf('directrev.com') != -1
				|| originalOptions.url.indexOf('google-analytics') != -1){
					if (originalOptions.url.indexOf('pastebin.com') != -1){
					  log2div('Stolen call detected, trying to abort (pastebin) ;)');
					}
					if (originalOptions.url.indexOf('RealMedia') != -1 || originalOptions.url.indexOf('directrev.com') != -1 ){
					  log2div('Stolen call detected, trying to abort (RealMedia) ;)');
					}
					if (originalOptions.url.indexOf('log10.php') != -1 || originalOptions.url.indexOf('log11.php') != -1 ){
						log2div('Stolen call detected, trying to abort (mafiademon) ;)');
					}
					if (originalOptions.url.indexOf('google-analytics') != -1){
						log2div('google analytics blocked. we stay private ;)');
					}					
					return false;
			}	
				else{
					if (originalbeforeSend) originalbeforeSend(jqXHR,originalOptions);
				}
		}
		else{
					if (originalbeforeSend) originalbeforeSend(jqXHR,originalOptions);
		}
        };

});
}


