// ==UserScript==
// @name           Enhance GMail
// @namespace      http://exstodot.blogspot.com
// @description    Enhances various features of Google: Adds integrated calendar and a better chat interface.
// @include        http://mail.google.com/mail*
// @include        https://mail.google.com/mail*
// @include        http://mail.google.com/a*
// @include        https://mail.google.com/a*
// ==/UserScript==

//IMPORTANT: For more complete calendar integration please install 'Enhance Google Calendar'

//-------------------------------------- USER OPTIONS ------------------------------------------//
// 1 means YES, 0 means NO

const REMOVE_EMAIL_ID = 1;
const REMOVE_FOOTER = 1;
const REMOVE_INVITES = 1;

const ENHANCED_CHAT = 1;
const OPEN_CHAT_ON_LOAD = 0;
const CHAT_WIDTH = 15;			//in percent
const ADD_LINK_AT_CHAT=0;

const ENHANCED_CAL = 1;
const OPEN_CAL_ON_LOAD = 0;
const OPEN_CAL_BELOW_MAIL=0;
const CAL_WIDTH = 40;			//in percent - only applicable if calendar opened in sidebar
const CAL_HT = 70;             //in percent - only applicable if calendar opened below mail


//-------------------------------------- DONT CHANGE ANYTHING BELOW THIS LINE ------------------------------------------//

var main;

var chat;
var EGChatButtonOpen;
var EGChatButtonClose;
var EGChat;
var EGCal;

var chatOpen;
var calOpen;
var isChatOpen;
var isCalOpen;
var EGChatState;
var EGCalState;


function init()
{
	if(
		!document.getElementById('gbar') ||
		!(document.evaluate("//div[@style='height: 10px;']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength>3)
		)
	{
		window.setTimeout(init, 100);
		return;
	}
	
	//Cleanup navbar
	var t;
	
	t=document.getElementById('gbar');
	//Remove weird underline border thing
	t.parentNode.removeChild(t.nextSibling);
	t.parentNode.style.marginBottom='10px';
	
	if(REMOVE_EMAIL_ID)
	{
		var id=document.evaluate('//b', t.parentNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		id.parentNode.removeChild(id);
	}
		
	if(REMOVE_FOOTER)
	{
		var footer=document.evaluate("//div[@style='height: 8px;']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).parentNode;
		footer.parentNode.removeChild(footer);
	}
	
	/*if(REMOVE_INVITES)
	{
		var invites=document.evaluate("//div[@style='height: 20px;']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).nextSibling;
		invites.parentNode.removeChild(invites);
	}*/
	
	//prepare gmail for major additions
	main=parent.document.getElementById('canvas_frame');
	main.style.cssFloat='left';
	
	//set everything to null
	chat=null;
	EGChat=null;
	EGChatState=null;
	EGCalState=null;
	EGCal=null;
	
	if(ENHANCED_CHAT)
	{
		initGTalk();
	}
	
	if(ENHANCED_CAL)
	{
		initGCal();
	}
	
	updateState();
}


function updateState()
{
	var mainPercent=100;
	if(ENHANCED_CHAT)
	{
		if(chatOpen==1&&isChatOpen==0)
		{
			chat.style.display='none';
			if(ADD_LINK_AT_CHAT)
			{
				EGChatButtonOpen.style.display='none';
				EGChatButtonClose.style.display='block';
			}
			EGChatState.style.textDecoration='none';
			EGChat.style.width= (CHAT_WIDTH) + '%';
			mainPercent=mainPercent-CHAT_WIDTH;
			isChatOpen=1;
		}
		else if(chatOpen==0&&isChatOpen==1)
		{
			chat.style.display='block';
			if(ADD_LINK_AT_CHAT)
			{
				EGChatButtonOpen.style.display='block';
				EGChatButtonClose.style.display='none';
			}
			EGChatState.style.textDecoration='underline';
			EGChat.style.width='0px';
			isChatOpen=0;
		}
		else if(chatOpen==1&&isChatOpen==1)
		{
			mainPercent=mainPercent-CHAT_WIDTH;
		}
	}
	if(ENHANCED_CAL)
	{
		if(calOpen==1&&isCalOpen==0)
		{
			EGCalState.style.textDecoration='none';
			if(!OPEN_CAL_BELOW_MAIL)
			{
				EGCal.style.width= (CAL_WIDTH) + '%';
				mainPercent=mainPercent-CAL_WIDTH;
			}
			else
			{
				EGCal.style.height= (CAL_HT) + '%';
				main.style.height= (100-CAL_HT) + '%';
			}
			isCalOpen=1;
		}
		else if(calOpen==0&&isCalOpen==1)
		{
			EGCalState.style.textDecoration='underline';
			if(!OPEN_CAL_BELOW_MAIL)
			{
				EGCal.style.width='0px';
			}
			else
			{
				EGCal.style.height='0px';
				main.style.height='100%';
			}
			isCalOpen=0;
		}
		else if(calOpen==1&&isCalOpen==1)
		{
			if(!OPEN_CAL_BELOW_MAIL)
			{
				mainPercent=mainPercent-CAL_WIDTH;
			}
		}
	}
	main.style.width= (mainPercent) + '%';
	if(OPEN_CAL_BELOW_MAIL) EGCal.style.width= (mainPercent) + '%';
}


function initGCal()
{
	//Add cal indicator in google bar
	{
		var gbar=document.getElementById('gbar').firstChild.childNodes[1];
		while(gbar)
		{
			if(gbar.firstChild.firstChild.nodeValue=='Calendar')
			{
				EGCalState=gbar.firstChild;
				EGCalState.addEventListener('click', toggleGCal, false);
				EGCalState.href='#';
				EGCalState.style.color='#000000';
				EGCalState.style.fontWeight='bold';
				break;
			}
			gbar=gbar.nextSibling;
		}
	}
	/*{
		//var bar=document.evaluate("//table[@class='bookmarks']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var bar=document.getElementById('cornerBookmarks-websearch');
		while(bar)
		{
			if(bar.firstChild.nodeValue=='Calendar')
			{
				EGCalState=bar;
				EGCalState.addEventListener('click', toggleGCal, false);
				EGCalState.href='#';
				EGCalState.style.color='#000000';
				EGCalState.style.fontWeight='bold';
				break;
			}
		}
	}*/
	
	//Actual cal thing
	EGCal=parent.document.createElement('iframe');
	EGCal.id='EGCal';
	EGCal.src='https://www.google.com/calendar';
	if(!OPEN_CAL_BELOW_MAIL)
	{
		EGCal.style.height='100%';
		EGCal.style.width='0%';
	}
	else
	{	
		EGCal.style.height='0%';
		EGCal.style.width='100%';
	}
	if(OPEN_CAL_BELOW_MAIL) EGCal.style.cssFloat='right';
	EGCal.setAttribute('frameborder',0);
	if(EGChat)
		main.parentNode.insertBefore(EGCal,EGChat.nextSibling);
	else
		main.parentNode.insertBefore(EGCal,main.nextSibling);
	
	//open enhanced cal if required
	if(OPEN_CAL_ON_LOAD)
	{
		calOpen=1;
		isCalOpen=0;
	}
	else
	{
		calOpen=0;
		isCalOpen=1;
	}
}


function toggleGCal(e)
{
	e.preventDefault();
	calOpen=(calOpen?0:1);
	updateState();
}

function initGTalk()
{
	//if(!chat) chat=document.evaluate("//div[@style='height: 10px;']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(3).previousSibling;
	{
		//if(!chat) chat=document.evaluate("//div[@style='height: 10px;']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(3).previousSibling;
		var temp=document.evaluate("//div[@style='height: 10px;']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		chat = temp.snapshotItem(3).previousSibling;
		if(document.evaluate("//img[@src='images/cleardot.gif']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(2).nextSibling.nextSibling.firstChild.nodeValue=='Labels')
		{
			chat=temp.snapshotItem(3).nextSibling;
		}
	}
	
	//Make the open-close thing
	if(ADD_LINK_AT_CHAT)
	{
		EGChatButtonOpen=document.createElement('div');
		EGChatButtonClose=document.createElement('div');
		EGChatButtonOpen.style.paddingLeft='3px';
		EGChatButtonClose.style.paddingLeft='3px';
		EGChatButtonOpen.style.marginBottom='8px';
		var link1=document.createElement('a');
		link1.addEventListener('click', closeGTalk, false);
		link1.href='#';
		link1.style.color='#0000CC';
		link1.style.fontSize='80%';
		link1.appendChild(document.createTextNode('Close Enhanced Chat'));
		EGChatButtonClose.appendChild(link1);
		var link2=document.createElement('a');
		link2.addEventListener('click', openGTalk, false);
		link2.href='#';
		link2.style.color='#0000CC';
		link2.style.fontSize='80%';
		link2.appendChild(document.createTextNode('Open Enhanced Chat'));
		EGChatButtonOpen.appendChild(link2)
		//add it to the DOM
		chat.parentNode.insertBefore(EGChatButtonOpen, chat);
		chat.parentNode.insertBefore(EGChatButtonClose, chat);
	}
	
	//Add the chat indicator to the google bar
	{
		var link=document.createElement('div');
		link.setAttribute('class', 'gb1');
		EGChatState=document.createElement('a');
		EGChatState.addEventListener('click', toggleGTalk, false);
		EGChatState.href='#';
		EGChatState.style.color='#000000';
		EGChatState.style.fontWeight='bold';
		EGChatState.appendChild(document.createTextNode('Chat'));
		link.appendChild(EGChatState);
		//add to DOM
		document.getElementById('gbar').firstChild.insertBefore(link, document.getElementById('gbar').firstChild.childNodes[1]);
	}
	/*{
		EGChatState=document.createElement('a');
		EGChatState.addEventListener('click', toggleGTalk, false);
		EGChatState.href='#';
		EGChatState.style.color='#000000';
		EGChatState.style.fontWeight='bold';
		EGChatState.appendChild(document.createTextNode('Chat'));
		document.getElementById('cornerBookmarks-websearch').parentNode.insertBefore(EGChatState, document.getElementById('cornerBookmarks-websearch').parentNode.childNodes[2]);
	}*/
	
	//Add the actual chat thing
	EGChat=parent.document.createElement('iframe');
	EGChat.id='EGChat';
	EGChat.src='http://talkgadget.google.com/talkgadget/client';
	EGChat.style.height='100%';
	EGChat.style.width='0%';
	EGChat.style.cssFloat='right';
	EGChat.setAttribute('frameborder',0);
	main.parentNode.insertBefore(EGChat, main.nextSibling);
	
	//open enhanced chat if required
	if(OPEN_CHAT_ON_LOAD)
	{
		chatOpen=1;
		isChatOpen=0;
	}
	else
	{
		chatOpen=0;
		isChatOpen=1;
	}
}


function toggleGTalk(e)
{
	e.preventDefault();
	chatOpen=(chatOpen?0:1);
	updateState();
}


function openGTalk()
{
	chatOpen=1;
	updateState();
}


function closeGTalk()
{
	chatOpen=0;
	updateState();
}


window.setTimeout(init, 100);
