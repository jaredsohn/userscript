// ==UserScript==
// @name           Robot Unicorn Attack CHEAT for facebook
// @namespace      http://ksit.org/RUACheatFB
// @description   Vergrößert das Spielfenster von "Robot Unicorn Attack" auf Facebook, sodass man die Plattformen früher sieht. // Increase the gamwindow' size from "Robot Unicorn Attack" on facebook, so you can see the platforms earlier.
// @version       1.0 Alpha
// @contributor   ksitorg
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.js
// @include        http://apps.facebook.com/robotunicorn/play.html*
// @include		http://games.adultswim.com/fb-game-files/robotunicornattack/play_frame.html*
// ==/UserScript==

var thisversion = "10a";
var $ = jQuery.noConflict(true);
     	
if($('#app_content_112594238780474')) //Facebook
{
    $('div[class="UIStandardFrame_Container clearfix"]').css('width','100%');
    $('div[class="UIStandardFrame_Content"]').css('width','100%');
    $('#app_content_112594238780474').css('width','100%');
    $('iframe[width="760"]').width('100%');
}
		 
if($('#title_bar')) //Frame
{
	GM_xmlhttpRequest({ //Updatecheck
	method: 'GET',
    url: 'http://ksit.org/RUACheatFB/version.php',
    headers: 
	{
	 	'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		'Accept': 'application/atom+xml,application/xml,text/xml'
    },
    onload: function(version) 
	{
		if(version.responseText!=thisversion)
		{
			$('#title_bar').after('<div align="center"><h1 style="color:red;">PLEASE UPDATE YOUR VERSION OF THE CHEAT</h1><br><a href="http://ksit.org/RUACheatFB"><h2 style="color:white;">click here to download the new version</h2></a></div>');
		}
	}
	});


    $('#title_bar').after('<h1 id="startcheat" align="center" style="color:red;">START CHEAT</h1>'); //Start
    $('#startcheat').click(function() 
	{
     	$('#content').css('width','100%');
     	$('#flashContainer').css('width','100%');
     	$('#altFlashContent').width('100%');
     	$('#startcheat').html("");
	});
}