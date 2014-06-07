// ==UserScript==
// @name            Meebo Chatroom Mod
// @namespace       Meebo
// @description     Meebo Chatroom Persistent Banner
// @author	    elixir101 [at] rediffmail [dot] com
// @include         http://*.meebo.com/*
// ==/UserScript==

var sessionId;
var roomId;
var userId;
var blackList=new Array();
var banNewGuests=false;
var roomWin;
var roomObj;
if (!GM_log) 
{
	alert("You need Greasemonkey 0.3 or above to use this script");
	return;
}
if("gEventMgr" in unsafeWindow)
{
	unsafeWindow.gEventMgr.oldHandleChatJoin=unsafeWindow.gEventMgr.handleChatJoin;
	unsafeWindow.gEventMgr.handleChatJoin=function(N,Q)
	{
		//GM_log("User "+Q.buddyalias+"("+Q.buddy+")"+" has joined");
		if(roomObj!=null)
		{
			var new_user=Q.buddy.substring(0,Q.buddy.length-6);
			if(banNewGuests==true)
			{
				if(new_user.substr(0,5)=="guest" && Q.buddyalias.substr(0,5)=="guest")
				{
					GM_log("New Guest "+Q.buddyalias+"("+Q.buddy+")"+" has been kicked");
					banUser(new_user);
					this.oldHandleChatJoin(N,Q);
					return;
				}
			}
			for(var i=0; i<blackList.length; i++)
				if(new_user==blackList[i])
				{
					banUser(new_user);
					GM_log("Blacklisted "+Q.buddyalias+"("+new_user+")"+" has joined");
					break;
				}
		}
		this.oldHandleChatJoin(N,Q);
	}
}
function banUser(user)
{
	unsafeWindow.gNetworkMgr.requestChatAction(null, "b", user, roomObj, roomObj.getChatId());
}
function isBlackListed(user)
{
	for(var i=0; i<blackList.length; i++)
	{
		if(blackList[i]==user)
		{
			return true;
		}
	}
	return false;
}
function blackListUser(user)
{
	if(!isBlackListed(user))
	{
		blackList[blackList.length]=user;
		GM_log(user+" blacklisted");
	}
}
function banFunc()
{
	roomWin = unsafeWindow.gWindowMgr.getActiveWindow();
	roomObj = roomWin.m_imobject;
	
	if(!roomObj.getYourself().isSubModerator() && !roomObj.getYourself().isOwner())
	{
		alert("Sorry, you need to be a moderator to access this function");
		return;
	}
	
	var context=roomWin.m_groupContextMenu.m_contextObject;
	var bUser=context.getExtra().getName();
	var bAlias=context.getPresence().getAlias();
	var warning="You are about to blacklist "+bAlias+".\nAre you sure you want to continue?";
	if(!confirm(warning))
		return;
	if(!context.getExtra().isGuestUser())
	{
		alert("Sorry, cannot blacklist registered users");
		return;
	}
	
	banUser(bUser);
	blackListUser(bUser);
}
function banGuestIDs()
{
	roomWin = unsafeWindow.gWindowMgr.getActiveWindow();
	roomObj = roomWin.m_imobject;
	if(!roomObj.getYourself().isSubModerator() && !roomObj.getYourself().isOwner())
	{
		alert("Sorry, you need to be a moderator to access this function");
		return;
	}
	
	var warning="You are about to blacklist all guests.\nAre you sure you want to continue?";
	if(!confirm(warning))
		return;
	var presences=roomObj.getPresences();
	for(i in presences)
	{	
		var p = presences[i]; 
		if(p.getAlias().substr(0,5)=="guest" && p.getBuddy().isGuestUser())
		{
			var bUser=p.getBuddy().getName();
			blackListUser(bUser);
			banUser(bUser);
		}
	}
}
function banNewGuestsFunc()
{
	roomWin = unsafeWindow.gWindowMgr.getActiveWindow();
	roomObj = roomWin.m_imobject;
	if(!roomObj.getYourself().isSubModerator() && !roomObj.getYourself().isOwner())
	{
		alert("Sorry, you need to be a moderator to access this function");
		return;
	}
	banNewGuests=true;
}
function resetFunc()
{
	blackList=new Array();
	banNewGuests=false;
}
GM_registerMenuCommand( "Ban Guests", banGuestIDs );
GM_registerMenuCommand( "Blacklist User", banFunc );
GM_registerMenuCommand( "Ban New Guests", banNewGuestsFunc );
GM_registerMenuCommand( "Reset", resetFunc );
// ==/UserScript==