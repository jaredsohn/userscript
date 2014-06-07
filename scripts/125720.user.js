// ==UserScript==
// @name				League of Legeneds Avatar (jQuery injected)
// @description			Allows for custom forum Avatars
// @namespace			http://twitter.com/DrHendersonPhD
// @author				Aaron K. Henderson
// @include				http*://*.leagueoflegends.com/board/showthread.php*
// ==/UserScript==
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
$(document).ready( function() {
	
	$('.avatar').each(function (i) {
		var _self = $(this);
		var username = _self.children('big').text();
		var avatar = _self.find('.user_summoner_icon');
		

		/* ====== Edit BELOW This Line ====== */
		
		// Group 1
		var Names1 = ["viemmsakh","Phreak"];
		var Avatar1 = "http://i1232.photobucket.com/albums/ff371/DrHendersonPhD/tstportrait.gif"
		
		var check = $.inArray(username, Names1);
		if (check != '-1') {
			avatar.attr('src',Avatar1);													// Changes Avatar
			//_self.closest('tr').css('display','none');  								// Hide Thread belonging too
			//_self.closest('tr').css('opacity','.3');									// Changes Opacity of thread
			//_self.closest('tr').css('background-color','#817339');					// Changes Background Color of thread
		};	
		
		// Group 2
		var Names2 = [""];
		var Avatar2 = ""
		
		var check = $.inArray(username, Names2);
		if (check != '-1') {
			avatar.attr('src',Avatar2);													// Changes Avatar
			//_self.closest('tr').css('display','none');  								// Hide Thread belonging too
			//_self.closest('tr').css('opacity','.3');									// Changes Opacity of thread
			//_self.closest('tr').css('background-color','#817339');					// Changes Background Color of thread
		};



		/* ====== Edit ABOVE This Line ====== */
	
	});			
});
}

// load jQuery and execute the main function
addJQuery(main);

