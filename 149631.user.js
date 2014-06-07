// ==UserScript==
//
// @name           Facepunch Ticker Watcher (chrome notifications)
//
// @description    Pops up notifications for you when someone dares to speak your name (request by Turing, kinda)
//
// @author         neokabuto
//
// @version        1.1
//
// @match http://*.facepunch.com/fp_ticker.php
// @match http://facepunch.com/fp_ticker.php
//
// @history        1.1 bugfix
// @history        1.0 first version
//
// ==/UserScript==

//add button for enabling notifications
	var flipButton = document.createElement("input");
	flipButton.setAttribute("type", "button");
	flipButton.setAttribute("value", "Turn desktop notifications on");

	//on click, if we need to request notifications, do it
	flipButton.onclick = function(e){

			if (window.webkitNotifications.checkPermission() != 0) {
				window.webkitNotifications.requestPermission();
			}

	};
	
var finddest = document.getElementsByTagName('p')[0];
finddest.appendChild(flipButton);



var script = document.createElement('script');

function newAddTickerPost(post) {
	
	//if this is a "mentioned" post
	if(post.attributes.getNamedItem( "html" ).value.indexOf("mentioned</div>") != -1 && window.webkitNotifications.checkPermission() == 0){
		var postitem = document.createElement("div");
		postitem.innerHTML = post.attributes.getNamedItem("html").value;
		var note;
		
		//Winner lived up to his name and helped out with this part
		if (postitem.getElementsByTagName("div").length == 6){
			note = window.webkitNotifications.createNotification(
				"http://www.facepunch.com/favicon.ico", "Mentioned on Facepunch",
				postitem.getElementsByTagName("a")[2].innerText);
	  
	  
			note.onclick = function() {
				window.open(postitem.getElementsByTagName("a")[2].href);
				event.currentTarget.cancel();
			};
	  
			note.show();
		}
	}
	
	alt = !alt;
	
	if ( alt ){
		$('#TickerBox').prepend( "<div class='ticker_item' style='background-color: #f0f0f0; display: none;'>" + post.attributes.getNamedItem( "html" ).value + "</div>" );
	} else{
		$('#TickerBox').prepend( "<div class='ticker_item' style='background-color: #fefefe; display: none;'>" + post.attributes.getNamedItem( "html" ).value + "</div>" );
	}
	
};

script.innerHTML = newAddTickerPost.toString().replace("newAddTickerPost","AddTickerPost");

document.getElementsByTagName('head')[0].appendChild(script);