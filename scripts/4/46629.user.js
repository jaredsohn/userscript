// ==UserScript==
// @name          	Inbox reWrite
// @description    	Moves buttons to the top of the page. It also adds a delete read messages feature and a compose message button.
// @namespace      	http://goallinebliz.com
// @include        	http://goallineblitz.com/game/inbox*
// @creator		garrettfoster
// @version    		09.04.13
// ==/UserScript==


window.setTimeout( function() 
{

	//find the origonal button
	origonal = document.getElementById('delete').firstChild

	//create a div to put the new buttons in
	var newDiv = document.createElement('div');
	newDiv.align = 'right';
	newDiv.id = 'newDelete';
	buttons = document.getElementById('messages');
	buttons.parentNode.insertBefore(newDiv, buttons);

	//================Delete Button======================//

	// build a delete button
	var deleteButton = document.createElement("input");
	deleteButton.setAttribute("type", "button");
	deleteButton.setAttribute("id", "delete")
	deleteButton.setAttribute("value", "Delete");
	deleteButton.addEventListener("click", deleteMessages,false);
	
	// insert the button into the div
	buttons = document.getElementById('newDelete');
	buttons.appendChild(deleteButton);


	//funtion to delete messages
	function deleteMessages(){
		origonal.click();
		window.location.reload();
	}

	//==============Delete Read Messages Button==============//


	// build delete read messages button
	var deleteReadButton = document.createElement("input");
	deleteReadButton.setAttribute("type", "button");
	deleteReadButton.setAttribute("id", "deleteRead")
	deleteReadButton.setAttribute("value", "Delete Read Messages");
	deleteReadButton.addEventListener("click", deleteReadMessages,false);
	
	// insert the button into the div
	buttons = document.getElementById('newDelete');
	buttons.appendChild(deleteReadButton);

	//function to execute when the Delete Read Messages button is clicked
	function deleteReadMessages(){
	
		//get both types of read messages
		var readMessages1 = document.getElementsByClassName('alternating_color1 message_read');	
		var readMessages2 = document.getElementsByClassName('alternating_color2 message_read');

		readMessagesCount = readMessages1.length + readMessages2.length;
	
		//make sure there are messages to be deleted		
		if (readMessagesCount == 0) {
			alert('No messages have been read.');
			button = document.getElementById('deleteRead');
		} else {
			//loop through messages and check each box
			for (var i = 0; i<readMessages1.length; i++) {
				//mark each checkbox	
				readMessages1[i].childNodes[1].childNodes[0].checked = true;		
			}

			for (var i = 0; i<readMessages2.length; i++) {
				//mark each checkbox	
				readMessages2[i].childNodes[1].childNodes[0].checked = true;		
			}
		

			//delete the messages and reload the window
			origonal.click();
			window.location.reload();

		}
	
	}

	//========================Compose New Message Button==========================//

	// build a compose new message button
	var composeNewButton = document.createElement("input");
	composeNewButton.setAttribute("type", "button");
	composeNewButton.setAttribute("id", "composeNew")
	composeNewButton.setAttribute("value", "Compose New Message");
	composeNewButton.addEventListener("click", composeNewMessage,false);
	
	// insert the button into the div
	buttons.appendChild(composeNewButton);

	//function to transfer you to the new message page
	function composeNewMessage(){
		window.location = "http://goallineblitz.com/game/new_message.pl"
	}

},100);

