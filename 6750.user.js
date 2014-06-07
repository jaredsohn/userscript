// ==UserScript==
// @name          Meebo Status message changer
// @author        Parashuram
// @namespace     http://status.meebo.user.js
// @description   Updates the meebo status messages every 'n' seconds
// @include       http://www*.meebo.com/*
// @include       https://www*.meebo.com/*
// ==/UserScript==


var meeboMessageChanger=
{
	refreshInterval  : 300,
	currentCount	 : 300,
	/**
	 * Function that is to be called when ever the status message is to 
	 * changed
	 */
	changeStatus : function(newStatus)
	{
		meeboMessageChanger.currentCount++;
		if (unsafeWindow.gBuddyList && 	unsafeWindow.gBuddyList.setWindowCaption)
		{
			unsafeWindow.gBuddyList.setWindowCaption("Buddy list [" + (meeboMessageChanger.refreshInterval - meeboMessageChanger.currentCount) + "]");
		}
		
		if (meeboMessageChanger.currentCount < meeboMessageChanger.refreshInterval && typeof(newStatus) == "undefined")
		{
			return ;
		}
		
		meeboMessageChanger.currentCount = 0;
		if (typeof(newStatus) == "undefined")
		{
			// as i have no status message, ask for the new status message
			GM_log("Asking for the new status message");
			meeboMessageChanger.getNewStatusMessage();
		}
		else 
		{
			// someone sent me the new status message, so set it.
			GM_log("Setting the new status message : " + newStatus);
			meeboMessageChanger.setMeeboStatus(newStatus);
		}
	},
	
	/**
	 * Makes a XHR for getting a new status message
	 */
	getNewStatusMessage : function()
	{
		// Scores : http://www.cricinfo.com/rss/livescores.xml
		// Quotes : http://www.mises.org/quote.aspx
		
		GM_xmlhttpRequest(
		{
			onload 	: meeboMessageChanger.newStatusCallback,
			method 	: 'GET',
			headers: 
		    {
		        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		        'Accept': 'application/atom+xml,application/xml,text/xml',
		    },
			url		: 'http://www.cricinfo.com/rss/livescores.xml'
		});
	},
	
	
	/**
	 * Callback when the new status message is got via a XHR
	 */
	newStatusCallback : function(response)
	{
		GM_log("Got Response for new request");
		var statusText = response.responseText;

		// start processing page
		var parser=new DOMParser();
		var doc=parser.parseFromString(statusText,"text/xml");
		var x = doc.documentElement;
		unsafeWindow.MeeboStatus = x; 
		
		unsafeWindow.rssXML = x;
		statusText = eval("(" + unsafeWindow.statusXPath + ")");
		console.log("New Status message " + statusText);
		meeboMessageChanger.changeStatus(escape(statusText).replace(/\+/g, '%2B').replace(/\"/g,'%22').replace(/\'/g, '%27'));
	},
	
	/**
	 * Actually change the status message of meebo, in meebo specific way
	 */
	setMeeboStatus : function(statusMessage)
	{
		if (!unsafeWindow.gAjax)
		{
			console.log("No gAJAX found !! ");
			return;
		}
		var sessionKey = unsafeWindow.gAjax.getSessionKey();	
		GM_log("Into Status Changer");
		GM_xmlhttpRequest(
		{
		    method: 'POST',
		    url: 'http://' + document.domain + '/mcmd/setstatus',
		    headers: 
		    {
		        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		        'Accept': 'application/atom+xml,application/xml,text/xml',
		        'Content-type' : 'application/x-www-form-urlencoded'
		    },
		    
		    data : 'sessionKey=' + sessionKey + meeboMessageChanger.getUserString(statusMessage),
		    onload: meeboMessageChanger.meeboCallback
	    });
  	    GM_log("Making POST call : " + meeboMessageChanger.getUserString(statusMessage));

	},
	
	/**
	 * Constructs the status data based on the user array and the status message
	 */
	getUserString : function(statusMessage)
	{
		if (!unsafeWindow.gLogon)
		{
			console.log("gLogon Not found");
		}
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
	
	/**
	 * Called when the status message is set correctly be meebo
	 */
	meeboCallback : function(responseDetails) 
    {
       GM_log("Status message changed " + responseDetails.statusText);
	},
	
	/**
	 * Entry point, that allow setting timers erc.
	 */
	init : function()
	{
		GM_log("Starting the meebo message changer");
		if (!GM_getValue('refreshInterval')) 
		{
			meeboMessageChanger.refreshInterval = prompt("Enter status message refresh Interval [in seconds]");
			GM_setValue('refreshInterval', meeboMessageChanger.refreshInterval);
		} 
		else 
		{
			meeboMessageChanger.refreshInterval = GM_getValue('refreshInterval');
		}

		if (meeboMessageChanger.refreshInterval == 0)
		{
			var staticStatusMessage  = "";
			if (!GM_getValue('staticStatusMessage'))
			{
				GM_log("No Static message found, so getting one.")
				staticStatusMessage= prompt("Enter status message");
				GM_setValue('staticStatusMessage', staticStatusMessage);
			}
			else 
			{
				staticStatusMessage = GM_getValue('staticStatusMessage');
			}
			GM_log("Setting static message ... " + staticStatusMessage);
			window.setTimeout(function() { meeboMessageChanger.setMeeboStatus(staticStatusMessage);},5000);	
		}
		else 
		{
			window.setTimeout(function() { meeboMessageChanger.changeStatus();},5000); // for the first call
			window.setInterval(function() { meeboMessageChanger.changeStatus();}, 1000); // then keep repeating this
		}

	}
}

meeboMessageChanger.init();

unsafeWindow.old_GM_log = GM_log;
GM_log = function(message)
{
	if (console && console.log)
	{
		console.log(message);
	}
	unsafeWindow.old_GM_log(message);
}

unsafeWindow.statusXPath = "x.childNodes[1].childNodes[15].childNodes[1].childNodes[0].nodeValue"
