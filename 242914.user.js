// ==UserScript==
// @name        Double Chat
// @namespace   kongregate
// @include     *kongregate.com/games/*
// @version     0.4
// @grant       unsafeWindow
// ==/UserScript==


var CACHE = {
	rooms: []
};
unsafeWindow.CC = CACHE;
	
function gameRoomExists(){
	return document.getElementById("game_room_tab").style.display != "none";
}

function buildRoomDatas(){
	var roomName = document.getElementsByClassName("room_name h6")[0].innerHTML;
	if(chatWindow.activeRoom().name() != roomName){
		setTimeout(buidRoomDatas, 600);
	}else{
		CACHE.rooms.push( chatWindow.activeRoom().name() );
		CACHE[ chatWindow.activeRoom().name() ] = {id: chatWindow.activeRoom().getId(), posts: divToPostsList( findChat() )};
		showMessage( "Room correctly loaded." );
	}
}

function RoomName( room ){

	if( (CACHE.rooms[0] == document.getElementsByClassName("room_name h6")[0].innerHTML && room == "other") || (CACHE.rooms[0] != document.getElementsByClassName("room_name h6")[0].innerHTML && room != "other")){
		return CACHE.rooms[1];
	}else{ return CACHE.rooms[0]; }

}
	
function findChat( chat ){

	var chat_tabs = document.getElementsByClassName("chat_room_template");
	if( (chat_tabs[1].style.display == "none" && chat == "other") || (chat_tabs[1].style.display != "none" && chat != "other")){
		var chat_window = chat_tabs[1].getElementsByClassName("chat_message_window")[0];
	}else{
		var chat_window = chat_tabs[2].getElementsByClassName("chat_message_window")[0];
	}
	
	return chat_window;

}

function getPreviousPosts( room ){ // room should be 'other' (for other room) or anything else (for current room)

	return CACHE[RoomName( room )].posts;

}

function concatLists( main, toAppend ){

	for(var i = 0; i < toAppend.length; i++){
		main.push(toAppend[i]);
	}

}

function divToPostsList( div ){

	var posts_elems = Array.prototype.slice.call( div.getElementsByTagName("div") );
	var posts = [];
	
	for(var p = 0; p < posts_elems.length; p++){
		try{posts.push( posts_elems[p].getElementsByTagName("p")[0].innerHTML );}catch(e){ /* Not chat - probably script log */ }
	}
	
	return posts;

}

unsafeWindow.getPreviousPosts = getPreviousPosts;
unsafeWindow.divToPostsList = divToPostsList;
unsafeWindow.findChat = findChat;

function getLastPosts(){

	try{var allPosts = divToPostsList(findChat("other")); // http://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array

	a = getPreviousPosts();
	b = divToPostsList( findChat());
	if(a < b){
		b = b.slice( a.length - b.length );
		concatLists( a, b );
	}

	var older_posts = getPreviousPosts("other");
	if(older_posts.length < allPosts.length){ // there's a new post
	
		var new_posts = allPosts.slice( older_posts.length - allPosts.length );
		
		for(var n = 0; n < new_posts.length; n++){
		
			if(older_posts.indexOf(new_posts[n]) == -1){
				showMessage( new_posts[n], true );
				older_posts.push(new_posts[n]);
			}
		}
	
	}}catch(e){}
	
	setTimeout(function(){getLastPosts();}, 1000); 

}

function showMessage( post, isclickable ){

	var div = '<div style="margin:1px 0px;padding:1px 5px;font:11px/15px Verdana,Arial,sans-serif;background-color:#b6eca9"'
	
	if(isclickable){
		div += ' onclick="holodeck.chatWindow().insertInActiveChatInput(\'/dc \');"';
	}
	
	div += '> ' + post + ' </div>';

	chatWindow.insert(div);

}

function addCommand(){

	holodeck.addChatCommand('load-dc',function(chat,msg){
				if(CACHE.rooms.length == 2){
					chatWindow = holodeck.chatWindow();
					activeDialogue = holodeck.activeDialogue();
					try{
					if(gameRoomExists()){
						getLastPosts()
						showMessage( "Double Chat loaded successfully !" );
					}else{ showMessage( "There's no game room, Double Chat failed to load." ); }
					}
					catch(e){ // you didn't loaded the second chat
					alert(e);
					}
				}else{
					showMessage("You first need to type '/load-room' in two rooms");
				}
				
				return false;
				
	});
	
	holodeck.addChatCommand("dc", function(chat, msg){

				if(CACHE.rooms.length == 2){
					var otherRoom = CACHE[RoomName("other")].id;
					chatWindow.room( otherRoom ).sendRoomMessage( msg.replace("/dc ", "") );
					chatWindow.insertInActiveChatInput("");
				}else{
					showMessage("You first need to type '/load-room' in two rooms");
				}
				
				return false;
	});
	
	holodeck.addChatCommand("load-room", function(a,b){
		try{
		chatWindow = holodeck.chatWindow();
		activeDialogue = holodeck.activeDialogue();
		buildRoomDatas();
		}catch(e){alert(e)};
		return false;
	});

}

function runScript(){

	if(unsafeWindow.holodeck == undefined){
		setTimeout(runScript, 600);
	}else{

		holodeck = unsafeWindow.holodeck;
		
		setTimeout(addCommand, 2000);
		
	}
}

runScript();