// ==UserScript==
// @name          FacebookMessageSaver
// @description   script to prevent loss of unsent facebook messages by inadvertent redirection -- when navigating away from a message page a popup will ask whether this was intentional. If not, the page will reappear with the unsent message still intact.
// @include       *facebook.com/inbox/readmessage.php*
// @include       *facebook.com/inbox/?compose*
// ==/UserScript==

	var bod = document.body;
	
	//if the user navigates away from the page, ask if they really want to leave
	//if not, set a short-lived cookie with the message typed so far, to restore when the page reloads
	var onUnloadCode = 
	//get the message typed so far
	"var msg = document.getElementById('message').value; var proceed = true; "+
	//check to see that there are non-whitespace characters in the message
        //otherwise do not do the popup
	"if (msg.search(/\\S/) != -1) { "+
		"proceed=confirm('Do you really want to navigate away from this page? "+
		"If not, press cancel and the page will reload with your message still intact. "+
		"Press OK when you are sending a newly composed message, as opposed to a message you are replying to. "+
		"'); "+
		
	"} "+ 
	"if (proceed != true) { "+
		//replace newlines in the message with special chars
		//so that the cookie does not lose that information
		"msg = msg.replace(/\\n/g, 'THIS REPRESENTS A NEWLINE'); "+ 
		//replace semicolons in the message with special chars
                //so that the cookie does not lose that information
                "msg = msg.replace(/;/g, 'THIS REPRESENTS A SEMICOLON'); "+

		//set a cookie with the message information 
		"var eDate = new Date(); "+
		"eDate.setTime(eDate.getTime()+(10*1000)); "+
		"var expires = '; expires=' + eDate.toGMTString(); "+  
		"var cookieString = 'msgCookie=' + msg + expires + '; path=/'; "+
		"document.cookie = cookieString; "+
		"window.history.go(0); "+
	"}";

	bod.setAttribute('onUnload',onUnloadCode);

	//when the page is loaded, if there exists a cookie with the message saved from an accidental redirection
	//restore the text of that message to the message textarea on the page
	var onLoadCode = "var restoreMsg = ''; "+
	"var nameEQ = 'msgCookie='; "+
        "var ca = document.cookie.split(';'); "+
        "for(var i=0;i < ca.length;i++) { "+
                "var c = ca[i]; "+
                "while (c.charAt(0)==' ') c = c.substring(1,c.length); "+
                "if (c.indexOf(nameEQ) == 0) {restoreMsg = c.substring(nameEQ.length,c.length);} "+
         "} "+
	//restore all the original newlines that were converted to chars to avoid being lost in the cookie
	"restoreMsg = restoreMsg.replace(/THIS REPRESENTS A NEWLINE/g, '\\n'); "+
	//restore all the original semicolons that were converted to chars to avoid being lost in the cookie
        "restoreMsg = restoreMsg.replace(/THIS REPRESENTS A SEMICOLON/g, ';'); "+

	//"alert(document.cookie); alert('message is:' + restoreMsg); "+ 
	"if (restoreMsg != '') {document.getElementById('message').value = restoreMsg;}";
	bod.setAttribute('onLoad',onLoadCode); 
