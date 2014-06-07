// ==UserScript==
// @name        JVC - Notification MP
// @namespace   mpNotify
// @description Notifie d'un MP sur JVC
// @include     http://*.jeuxvideo.com/*
// @version     1
// ==/UserScript==


$(function(){ 

	// Chargement du CSS
	$("head").append($("<link rel='stylesheet' href='//s3.amazonaws.com/moovweb-marketing/playground/harlem-shake-style.css' type='text/css'/>"));

	var header = $('#header p');
	
	
	// Tu as un MP petit coquin :coeur:
	function shakeIt()
	{
		header.addClass('mw-harlem_shake_me im_first');
		$("#logo a").attr("href","http://www.jeuxvideo.com/messages-prives/boite-reception.php").attr("target","_blank");
	}

	// Tu n'as plus de MP. :-(
	function letIt()
	{
		header.removeClass('mw-harlem_shake_me im_first');
		$("#logo a").attr("href","http://www.jeuxvideo.com/").attr("target","_self");
	}

	// Vérification des MP
	function checkMP()
	{
		$.getJSON('http://www.jeuxvideo.com/messages-prives/get_message_nonlu.php?skipmc=1',function(data){
			$.each(data,function(key,val){
					if(val)		shakeIt();
					else		letIt();
					}
				)
		});
	}
	
	if(header.length)
		setInterval(checkMP,6000);
});