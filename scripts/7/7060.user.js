// Auto-Community-Spam-Deleter [orkut]
// version 1.0 
// This is a Greasemonkey user script to detect and delete spam messages in orkut communities,
// saving your time in finding and deleting these messages. This detects most of the automated 
// spam we get in orkut. That is usually the spam containing brazilian porn website links.
//
// Release date: 11-January-2007
//
// -----------------------------------------------------------------------
// ________________________How To Install____________________________________________
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// -----------------------------------------------------------------------
// ______________________How To Use This Script______________________________________
//
// To use this script, simply go to your community, and click on "view all topics" button.
// It will start searching for spam messages and prompt you to delete if it finds any.
// For a shortcut, just enter this URL:  http://www.orkut.com/CommTopics.aspx?cmm=xxxx
// Replace xxxx with your community ID.
//
// -----------------------------------------------------------------------
//________________________How To Uninstall__________________________________________
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Auto-community-Spam-deleter V1.0", and click Uninstall.
//
// -----------------------------------------------------------------------
//
// ==UserScript==
// @name          Auto-community-Spam-deleter V1.0
// @namespace     http://technowise.blogspot.com
// @description   Finds spam message topics and prompts for deletion.
// @include       http://www.orkut.com/*
// ==/UserScript==
window.addEventListener("load", function(e) {

if(document.location.href.indexOf('CommTopics.aspx')>=0)
{
	for(var i=0;i<document.links.length;i++)
	{
		var linkIsProfile=/Profile/.test(document.links[i]);
		if(linkIsProfile)
		{
			var userName=document.links[i].innerHTML;
			var userNameValidate=userName.search(/[0-9]/);
			var moderatorRightsAvailable=/manage/.test(document.links[i+1].innerHTML);
			var topic_id=document.links[i-1].href.split("&tid=")[1];
			var topicTitle=document.links[i-1].innerHTML;
			var topicTitleValidate=topicTitle.search(/[\x7F-\xFF]/);
			var postIsSpam=userNameValidate != -1|| topicTitleValidate != -1;
			if(  postIsSpam && moderatorRightsAvailable )
			{
				var toBeDeleted=confirm("Auto-Spam-Deleter Found a message:\n\nTopic Title:  "+topicTitle+"\nUser name:  "+userName+"\nTopic ID:  "+topic_id+"\n\n Would you like to delete this topic?");
				if(toBeDeleted)
				{
					for(var j=0;j<document.forms.length;j++)
					{
						if(document.forms[j].action.split("&tid=")[1]==topic_id)
						{	
							document.location.href="javascript:submitForm(document.forms["+j+"].getElementsByTagName('tr').item(0), 'delete_entire_topic', true);";
						}
						
					}
		
				}

			}
		}
	}
}

},false);