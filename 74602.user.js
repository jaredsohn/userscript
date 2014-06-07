// ==UserScript==
// @name           Average level
// @namespace      arreloco
// @description    Returns the average level of the current chat room
// @include        http://www.kongregate.com/games/*
// ==/UserScript==
function init()
{
	var dom;

	try{
		if(unsafeWindow){
			dom = unsafeWindow;
		} else {
			dom = this;
		}
	}catch(e){
		dom = this;
	}

	var holodeck = dom.holodeck;
	
		//Credit goes partially to Ventero for this command
		holodeck.addChatCommand("average", function(l,n){
			var matchArr = n.match(/^\/\S+\s+(\d+)/),
					userList = l.chatWindow().activeRoom().users(),
					countArr = [];
					
			var total_level = 0;
			var max_level = 0;
			var best_user = "";
			var plus_40_users = [];

			for(var i=0;i<userList.length;i++){
				total_level += userList[i].variables.level;
				if(userList[i].variables.level>max_level){
					best_user = userList[i].variables.username;
					max_level = userList[i].variables.level;
				}
				if(userList[i].variables.level>39){
					plus_40_users.push("\n <a href=\"http://www.kongregate.com/accounts/"+userList[i].variables.username+"\" target=\"_blank\">"+userList[i].variables.username+"</a>");
				}
			}
			
			var average_level = Math.round(total_level/userList.length*10)/10;
			l.activeDialogue().displayUnsanitizedMessage("Kong Bot", "The average level of this room is "+average_level+" and the best user is <a href=\"http://www.kongregate.com/accounts/"+best_user+"/\" target=\"_blank\">"+best_user+"</a> (lvl "+max_level+").", {"class":"whisper received_whisper"}, {non_user: true});
			l.activeDialogue().displayUnsanitizedMessage("Kong Bot", "Here are all the users who are > or equal to 40:"+plus_40_users, {"class":"whisper received_whisper"}, {non_user: true});
			
			return false;
		})
		
		holodeck._chat_commands.media = holodeck._chat_commands.average;
}//end init()

setTimeout(init,0);