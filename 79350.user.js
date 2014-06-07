// ==UserScript==
// @name           Mobile Bridges Logs
// @namespace      mobileBridgesLogs
// @description    Logs moderators activities
// @include        http://www.airborne.itv.mobilebridges.com/*
// ==/UserScript==

//login
var elmLink = document.getElementById('ActionForm');
	elmLink.addEventListener("submit", createSession, true);

//chat topic
var btnSaveMeta = document.getElementById('SaveMetaData');
if(btnSaveMeta != null)
{
	var lastTopic = getCurrentTopic();
	
	//alert("lastTopic = " + lastTopic);
	btnSaveMeta.addEventListener("click", logTopic, true);
}

//moderator messages
var elmModMsg = document.getElementById('InsertNewModeration');
if(elmModMsg != null)
{
	elmModMsg.addEventListener("click", logModMessages, true);
}

//user msg
var elmUserMsgAppr = document.getElementById('Approve');
var elmUserMsgRem = document.getElementById('RemoveSelected');

if(elmUserMsgAppr != null)
{
	elmUserMsgAppr.addEventListener("click", logUserMessagesAppr, true);
}

if(elmUserMsgRem != null)
{
	elmUserMsgRem.addEventListener("click", logUserMessagesRem, true);
}


function createSession()
{
	//GreaseMonkey requires to put nameItem to get an input value. Nees to do in 3 steps.
	var form = document.forms.namedItem("ActionForm");
	var text = form.elements.namedItem("Username");
	var userName = text.value;
	var text = form.elements.namedItem("Password");
	var pass = text.value;
	
	//Coldfusion creates cookie
	GM_xmlhttpRequest({
		  method: "POST",
		  url: "http://ws.txttv.ca/moderators_log.cfm",
		  data: "userName="+userName+"&pass="+pass,
		  headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		  }
	});
}

function getCurrentTopic(){
	var form = document.forms.namedItem("ActionForm");
	var selectedTopicIndex = form.elements.namedItem("FilterModerationQueueId").selectedIndex;
	var selectedItem = form.elements.namedItem("FilterModerationQueueId").options[selectedTopicIndex].value;
	//var program_id = selectedItem;
	//PATCH: bug in mobile bridge interface, the input box for confessional is 11 instead of 10; vise versa for txtual therapy
	if(selectedItem == 10)
	{
		selectedItem = 11;
		
	}
	else if(selectedItem == 11)
	{
		selectedItem = 10;
	}
	
	var text = form.elements.namedItem("MetaData["+selectedItem+"]");
	return text.value;

}

function logTopic()
{
	var form = document.forms.namedItem("ActionForm");
	var selectedTopicIndex = form.elements.namedItem("FilterModerationQueueId").selectedIndex;
	var selectedItem = form.elements.namedItem("FilterModerationQueueId").options[selectedTopicIndex].value;
	var program_id = selectedItem;
	//PATCH: bug in mobile bridge interface, the input box for confessional is 11 instead of 10; vise versa for txtual therapy
	if(selectedItem == 10)
	{
		selectedItem = 11;
		
	}
	else if(selectedItem == 11)
	{
		selectedItem = 10;
	}
	
	var text = form.elements.namedItem("MetaData["+selectedItem+"]");
	var topic = text.value;
	
	if(topic != lastTopic || confirm('You are resubmitting the same topic without modifying it! Are you sure?')){	
		GM_xmlhttpRequest({
			  method: "POST",
			  url: "http://ws.txttv.ca/moderators_log.cfm",
			  data: "progId="+program_id+"&chatTopic="+topic,
			  headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			  }
		});
	}
}

function logModMessages()
{
	var form = document.forms.namedItem("ActionForm");
	var selectedTopicIndex = form.elements.namedItem("FilterModerationQueueId").selectedIndex;
	var selectedItem = form.elements.namedItem("FilterModerationQueueId").options[selectedTopicIndex].value;
	var text = form.elements.namedItem("Incoming");
	var msg = text.value;

	GM_xmlhttpRequest({
		  method: "POST",
		  url: "http://ws.txttv.ca/moderators_log.cfm",
		  data: "progId="+selectedItem+"&modMsg="+escape(msg),
		  headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		  }
	});

}

//incoming user msg approved
function logUserMessagesAppr()
{
	var form = document.forms.namedItem("ActionForm");
	var selectedTopicIndex = form.elements.namedItem("FilterModerationQueueId").selectedIndex;
	var selectedItem = form.elements.namedItem("FilterModerationQueueId").options[selectedTopicIndex].value;
	
	for(var i = 0; i < form.elements.length; i++)
	{
		if(form.elements[i].type == "checkbox")
		{
			if(form.elements[i].checked)
			{
				var chkBoxName = form.elements[i].name;
				if(chkBoxName.search("SelectedContent") != -1)
				{
					var txtArea = form.elements.namedItem("NewIncoming["+form.elements[i].value+"]").value;
					GM_xmlhttpRequest({
						  method: "POST",
						  url: "http://ws.txttv.ca/moderators_log.cfm",
						  data: "progId="+selectedItem+"&userMsg="+escape(txtArea)+"&status=1",
						  headers: {
							"Content-Type": "application/x-www-form-urlencoded"
						  }
					});
				}
			}
		}
	}	
}

//incoming user msg removed
function logUserMessagesRem()
{
	var form = document.forms.namedItem("ActionForm");
	var selectedTopicIndex = form.elements.namedItem("FilterModerationQueueId").selectedIndex;
	var selectedItem = form.elements.namedItem("FilterModerationQueueId").options[selectedTopicIndex].value;
	
	for(var i = 0; i < form.elements.length; i++)
	{
		if(form.elements[i].type == "checkbox")
		{
			if(form.elements[i].checked)
			{
				var chkBoxName = form.elements[i].name;
				if(chkBoxName.search("SelectedContent") != -1)
				{
					var txtArea = form.elements.namedItem("NewIncoming["+form.elements[i].value+"]").value;
					GM_xmlhttpRequest({
						  method: "POST",
						  url: "http://ws.txttv.ca/moderators_log.cfm",
						  data: "progId="+selectedItem+"&userMsg="+escape(txtArea)+"&status=0",
						  headers: {
							"Content-Type": "application/x-www-form-urlencoded"
						  }
					});
				}
			}
		}
	}	
}