
// ==UserScript==
// @name          Save Facebook messages [EDİTED VERSİON - THANKS to  Karthic Kumaran]
// @description   Copy entire conversations to blank page 
// @include       http://www.facebook.com/messages/*
// @include       https://www.facebook.com/messages/*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

//Code for detecting chrome from http://davidwalsh.name/detecting-google-chrome-javascript
//Code for adding jquery from http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script via http://stackoverflow.com/questions/2246901/how-can-i-use-jquery-in-greasemonkey-scripts-in-google-chrome

(function () {
	function addJQuery(callback) {
	  var script = document.createElement("script");
	  
	  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
	  script.addEventListener('load', function() {
		var script = document.createElement("script");
		
		script.textContent = "(" + callback.toString() + ")();";
		
		document.body.appendChild(script);
	  }, false);
	  
	  document.body.appendChild(script);
	}

	function main() {
		var myTimer = null;

		function repeatSearch() {
			var message_menu;
			var toolbar = null;
				
			message_menu = document.getElementById('MessagingReturnLink');
			toolbar = message_menu.parentNode;
				
			if(typeof toolbar != 'undefined' || typeof message_menu != 'undefined') {
				var save_messages = document.createElement('button');
				var head = document.head;
	
				$(save_messages).attr('class','uiToolbarItem uiButton');
				save_messages.id = 'save_messages';
				save_messages.innerHTML = 'Save Conversation';
	
				toolbar.insertBefore(save_messages,message_menu);
	
				$('#save_messages').click(function(event) {
					var newpage = window.open('');
					var messages = document.getElementById('MessagingMessages');
					var style = document.createElement('style');
	
					style.innerHTML = "<style> body { margin: 0 auto 0 auto; width: 90% } </style>";
					
					newpage.document.write(head.innerHTML);
					newpage.document.write(style.innerHTML);
					newpage.document.write(messages.innerHTML);
	
					event.preventDefault();
				});

				window.clearInterval(myTimer);
			}
		}

		myTimer = window.setInterval(repeatSearch,1000);
	}

	if((navigator.userAgent.toLowerCase().indexOf('chrome') > -1) === true) {
		addJQuery(main);
	} else {
		$(window).load(function() {
			main();
		});
	}
}) ();