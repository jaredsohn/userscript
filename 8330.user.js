// ==UserScript==
// @name          Twitter with Meebo
// @author        Parashuram
// @namespace     http://twittermeebo.parash.says.it
// @description   Integrating Twitter window with meebo
// @include       http://www*.meebo.com/*
// ==/UserScript==


/**
 * A generic Logger utility. Writes to a DIV that is created, 
 * or to GM_log / FireBug Console
 */
var Logger = 
{
	DEBUG : 3,
	INFO  : 2,
	ERROR : 1,
	NONE  : 0,

	logLevel : 3,
	logOnFirebug : true,
	loggerDiv : null,
	className : null,
	
	/**
	 * Used to initialise the Logger Dialog
	 */
	init : function(className)
	{
		if (typeof(unsafeWindow.console) != "undefined" && typeof(unsafeWindow.console.clear) != "undefined")
		{
			unsafeWindow.console.clear();
		}
		Logger.console = unsafeWindow.console;
		Logger.className = className;
	},
	
	/**
	 * Shows a message to the user.
	 */
	log : function(message,level)
	{
		if (typeof(level) == "undefined")
		{
			level = Logger.DEBUG;
		}

		message = "[" + Logger.className + "] " + level  + " : " + message;
		// write the debug message to the unsafeWindow.console
		if (Logger.logLevel >= level)
		{
			if (typeof(unsafeWindow.console) != "undefined" && Logger.logOnFirebug == true)
			{
				Logger.console.log(message)	
			}
			if (typeof(GM_log) != "undefined")
			{
				GM_log(message);
			}
		}
	}
}
Logger.init();
Logger.init("Twitter-Meebo")

/**
 * Class for Sending Messages from MEebo
 */
var meeboBuddySend=
{
	senderEscape : function(text)
	{
		var result = text;
		result = escape(result);
		result = result.replace('@','%40');
		result = result.replace('/','%2F');
		return result;
	},
	
	sendMessage : function(message,protocol,fromUser,toUser)
	{
		var sessionKey = unsafeWindow.gAjax.getSessionKey();
		//message = '<span style="font-family: arial;"><span style="color: #000000;">' +  message  + " </span></span>"
		
		var postData = "";
		
		// changing the toUser to the format that Meebo wants 
	
		postData += "sessionKey=" + sessionKey;
		postData += "&sender=" + meeboBuddySend.senderEscape(fromUser);
		postData += "&receiver=" + meeboBuddySend.senderEscape(toUser);
		postData += "&protocol=" + (protocol);
		postData += "&msg=" + escape(message);
		postData += "&mt=k";
		
		GM_xmlhttpRequest(
		{
		    method: 'POST',
		    url: 'http://' + document.domain + '/mcmd/send',
		    headers: 
		    {
		        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		        'Accept': 'application/atom+xml,application/xml,text/xml',
		        'Content-type' : 'application/x-www-form-urlencoded'
		    },
		    onload: meeboCallback,
		    data : postData
	    });
	}
}

var meeboMessageChanger=
{
	/**
	 * Actually change the status message of meebo, in meebo specific way
	 */
	setMeeboStatus : function(statusMessage)
	{
		var sessionKey = unsafeWindow.gAjax.getSessionKey();	
		Logger.log("Into Status Changer");
		GM_xmlhttpRequest(
		{
		    method: 'POST',
		    url:  'http://' + document.domain + '/mcmd/setstatus',
		    headers: 
		    {
		        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		        'Accept': 'application/atom+xml,application/xml,text/xml',
		        'Content-type' : 'application/x-www-form-urlencoded'
		    },
		    
		    data : 'sessionKey=' + sessionKey + meeboMessageChanger.getUserString(statusMessage),
		    onload: meeboCallback,
		    onerror : meeboErrorCallBack
	    });
  	    //Logger.log("Making POST call : " + 'sessionKey=' + sessionKey + meeboMessageChanger.getUserString(statusMessage));
		if (unsafeWindow.gBuddyList.setStatusMenuTitle)
		{
			unsafeWindow.gBuddyList.setStatusMenuTitle(statusMessage);
		}
	},
	
	/**
	 * Constructs the status data based on the user array and the status message
	 */
	getUserString : function(statusMessage)
	{
		var userList = unsafeWindow.gLogon.getLogons();

		var userNameArray = new Array();
		var i = 0 ;
		for (userItem in userList)
		{
			userNameArray[i] = new Object();
			userNameArray[i].user     = escape(userList[userItem].m_name);
			userNameArray[i].protocol = escape(userList[userItem].m_protocol);
			userNameArray[i].state    = "away";
			userNameArray[i].message  = statusMessage;
			i++;
		}
		
		// creating the user String
		var result = "";
		for (var i = 0 ; i < userNameArray.length; i++)
		{
			result	+= "&" + (i+1) + "user=" 	+ (userNameArray[i].user)
			result	+= "&" + (i+1) + "protocol="+ (userNameArray[i].protocol)
			result	+= "&" + (i+1) + "state=" 	+ (userNameArray[i].state)
			result	+= "&" + (i+1) + "message=" + (userNameArray[i].message)
		}
		result +="&num=" + (i); 
		return result;
	},
}
/**
 * Called when the status message is set correctly be meebo
 */
function meeboCallback(responseDetails) 
{
	Logger.log("Message for callback " + responseDetails.statusText);
	Twitterrer.showMessage(responseDetails.statusText);
}

function meeboErrorCallBack(response)
{
	Twitterrer.showMessage(responseDetails.statusText);
}

var Twitterrer =
{
	
	BUDDY_GTALK : 'twitter@twitter.com',
	BUDDY_AIM   : 'twitterIM',
	
	PROTOCOL_GTAIK : "gtalk",
	PROTOCOL_AIM   : "aim",
	
	timerHandle : null,
	messageDiv : null,
	
	myScreenName : null,
	twitterScreenName : null,
	twitterProtocol : null,
	
	
	setTwitter : function()
	{
		Logger.log("Setting the Twitterrer Function");
		var messageText = document.getElementById("twitMsg").value;
		Twitterrer.populateScreenNames();
		
		meeboMessageChanger.setMeeboStatus(messageText);
		meeboBuddySend.sendMessage(messageText,Twitterrer.twitterProtocol, Twitterrer.myScreenName,Twitterrer.twitterScreenName);
		
		Twitterrer.showMessage("Posting to Twitter....")
		return false;
	},

	/**
	 * Populates the screen names and the protocol required for twitter
	 */
	populateScreenNames : function()
	{
		// Getting the protocol used to talk to TWITTER
		if (!GM_getValue('twitProtocol')) 
		{
			Twitterrer.twitterProtocol = prompt("Please choos one of [aim / gtalk] as the TWITTER protocol", Twitterrer.PROTOCOL_GTAIK);
			GM_setValue('twitProtocol', Twitterrer.twitterProtocol);
		} 
		else 
		{
			Twitterrer.twitterProtocol = GM_getValue('twitProtocol');
		}
		Logger.log("Twitter Protocol is " + Twitterrer.twitterProtocol);
		
		// Getting the screenNames based on the Twitter Protocol
		var userList = unsafeWindow.gLogon.getLogons();
		for (userItem in userList)
		{
			if (userList[userItem].m_protocol == Twitterrer.PROTOCOL_AIM)
			{
				Twitterrer.myScreenName = userList[userItem].m_name 
				Twitterrer.twitterScreenName = Twitterrer.BUDDY_AIM;
				break;
			}
			else if (userList[userItem].m_protocol == Twitterrer.PROTOCOL_GTAIK)
			{
				Twitterrer.myScreenName = userList[userItem].m_name 
				Twitterrer.twitterScreenName = Twitterrer.BUDDY_GTALK;
				break;
			}
		}
		Logger.log("My Screen Name   : " + Twitterrer.myScreenName);
		Logger.log("Twitter Screen Name :" + Twitterrer.twitterScreenName);
	},
	
	/**
	 * This function is responsible for setting the twitter message as the status message and
	 * sending it
	 */
	init : function()
	{
		var mainDiv = document.getElementById('widgets-console');
		if (!mainDiv)
		{
			Logger.log("No Widgets Console Found, trying again");
			setTimeout(Twitterrer.init,10000);
		}
		else 
		{
			mainDiv = mainDiv.wrappedJS || mainDiv;
			Logger.log("Creating the twitter DIV "+mainDiv);
			
			// creating the twitter DIV
			var twiterDiv = document.createElement("DIV");
			twiterDiv.style.backgroundColor = "#ABCDEF";
			twiterDiv.style.padding = '4px';
			twiterDiv.style.border = 'SOLID 1px';
			
			twiterDiv.innerHTML = "<form id = '_gm_twitForm' onsubmit = 'return false;'>" +
					"<center>" +
					"Twit Box " +
					"<BR>" +
					"<input type='text' name = 'twitMsg' id = 'twitMsg' border = '1'>" +
					"<br><input type='submit' value = 'Tiwt'>" +
					"<br>" +
					"<span id = '_gm_twit_messageBox'></span>" +
					"</center>" + 
					"</form>";
					
			
			mainDiv.parentNode.appendChild(twiterDiv);
			var twitForm = document.getElementById("_gm_twitForm");
			twitForm.addEventListener("submit",Twitterrer.setTwitter, true);
		
			// setting the shortcut key for the twitter Box on meebo
			window.addEventListener('keyPress',Twitterrer.twitterFocus,true);
		
			Twitterrer.messageDiv = document.getElementById("_gm_twit_messageBox");
		}
	},
	
	twitterFocus : function(event)
	{
		var keynum;
		if(window.event){keynum = e.keyCode} else if(e.which) {keynum = e.which;}
		alert("AXE" + keynum);
	},
			
	showMessage : function(message)
	{
		if (Twitterrer.messageDiv != null)
		{
			Twitterrer.messageDiv.innerHTML = message;
		}
		// Setting timer to clear this message
		if (Twitterrer.timerHandle != null)
		{
			window.clearTimeout(Twitterrer.timerHandle);
		}
		Twitterrer.timerHandle = window.setTimeout(function(){Twitterrer.messageDiv.innerHTML = "";}, 5000);
	}
}
setTimeout(Twitterrer.init,10000);

Logger.init("Twitter-Meebo");
