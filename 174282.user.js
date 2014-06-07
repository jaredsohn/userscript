// ==UserScript==
// @name       Steam Community Chat functions
// @namespace  http://use.i.E.your.homepage/
// @version    1.1.0
// @description  Adds sendMessage() and broadcastMessage()
// @match      http://steamcommunity.com/chat/*
// @copyright  2013+, Andrew Silver
// ==/UserScript==

/*!
* To run:
* broadcastMessage(who, message in quotes)
* who will be either:
* -1 - All groups except recent and offline (Will still work if nobody in recent chats or offline)
* any other number - the group to send to (0 is recent chats, goes up from 0, not 1. Basically... position in list -1)
*/

sendMessage = function(strMessage)
{
	if ( !Chat.m_ActiveFriend )
		return;

	//var strMessage = $J.trim( $J('#chatmessage').val() );

	if ( strMessage.length == 0 )
		return;

	var ulSteamIDActive = Chat.m_ActiveFriend.m_ulSteamID;

	var rgParams = {
		umqid: Chat.m_umqid,
		type: 'saytext',
		steamid_dst: ulSteamIDActive,
		text: strMessage
	};

	var _chat = Chat;
	var Friend = Chat.m_ActiveFriend; //capture friend at time of sending

	Chat.AddToRecentChats( Friend );

	// echo immediately
	var elMessage = _chat.m_rgChatDialogs[ Friend.m_unAccountID ].AppendChatMessage( _chat.m_User, new Date(), strMessage, CWebChat.CHATMESSAGE_TYPE_LOCALECHO );
	$J('#chatmessage').focus();

	Chat.m_WebAPI.ExecJSONP( 'ISteamWebUserPresenceOAuth', 'Message', rgParams, true ).done( function(data) {

	}).fail( function () {
		$J('#chatmessage').val( strMessage );
		alert( 'Failed to send chat message' );
	});
};

broadcastMessage = function(a,message) {
	if(a===-1) {
		for(var list=1;list<Chat.m_rgFriendLists.length-1;list++) {
			for(var friend in Chat.m_rgFriendLists[list].m_elGroup[0].getElementsByClassName('friendslist_entry')) {
				try{
					Chat.m_rgFriendLists[list].m_elGroup[0].getElementsByClassName('friendslist_entry')[friend].click();
                    if(typeof(message) == "function")
                        message && message();
                    else
						sendMessage(message);
				} catch(e) {}
			}
		}
	} else {
		for(var friend in Chat.m_rgFriendLists[a].m_elGroup[0].getElementsByClassName('friendslist_entry')) {
			try{
				Chat.m_rgFriendLists[a].m_elGroup[0].getElementsByClassName('friendslist_entry')[friend].click();
                if(typeof(message) == "function")
                    message && message();
                else
					sendMessage(message);
			} catch(e) {}
		}
	}
};