// ==UserScript==
// @name           Room Details
// @namespace      arreloco
// @description    Shows you some stats
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
		holodeck.addChatCommand("get_details", function(l,n){
			var matchArr1 = n.match(/^\/\S+\s+(\d+)/),
					roomDetails = l.chatWindow().activeRoom(),
					countArr = [];

			var room_name = roomDetails._room.name;
			var room_owner = roomDetails._room.owner;
			var userList = roomDetails.users();
			var total_level = 0;
			var max_level = 0;
			var best_user;
			var developers = 1;
			var moderators = 0;
			var admins = 0;
			var user_points = document.getElementById('welcome_box_user_points_link').innerHTML;
			user_points = user_points.replace(" Points","");

			for(var i=0;i<userList.length;i++){
				total_level += userList[i].variables.level;
				if(userList[i].variables.level>max_level){
					best_user = userList[i].variables.username;
					max_level = userList[i].variables.level;
					if(userList[i].variables.developer){
						developers+=1;
					}
					if(userList[i].variables.moderator){
						moderators+=1;
					}
					if(userList[i].variables.admin){
						admins+=1;
					}
				}
			}

			var average_level = Math.round(total_level/userList.length*10)/10;
			l.activeDialogue().displayUnsanitizedMessage("Stats","<br /> Room name: "+room_name+"<br />Room owner: "+room_owner+"<br />Total level: "+total_level+"<br />Average level: "+average_level+"<br />Best user: "+best_user+(developers>0?"<br />Developers: "+developers:"")+(moderators>0?"<br />Mods: "+moderators:"")+(admins>0?"<br />Admins: "+admins:"")+"<br />Your points: "+user_points , {"class":"whisper received_whisper"}, {non_user: true});
			
			return false;
			
		})
		
		holodeck._chat_commands.stats = holodeck._chat_commands.get_details;
}//end init()

setTimeout(init,0);