// ==UserScript==
// @name 		Kongregate Get
// @namespace 		KongregateGet
// @description 	This script will get helpful pieces of info for you while in-chat. Commands are /avglvl, /mp, & /mostplayed (#) with optional limit
// @include 		http://www.kongregate.com/games/*
// @author 		Matthew Ammann
// @version 		1.4.3
// @date 		10/10/10
// ==/UserScript==
var dom = (typeof unsafeWindow === "undefined"?window:unsafeWindow);

function init_kongregateGet(dom){
	var holodeck = dom.holodeck;
	ChatDialogue = dom.ChatDialogue;

	if(!holodeck) return;
	
	holodeck.addChatCommand("avglvl", function(l,n)
	{
		var roomDetails = l.chatWindow().activeRoom();
		var allUsers = roomDetails.users();
		var allLevels = 0;
		
		for(var i=0; i < allUsers.length; i++)
		{
			allLevels += allUsers[i].variables.level;
		}
		
		var avgLevel = Math.round(allLevels/allUsers.length*10)/10;
		
		l.activeDialogue().displayUnsanitizedMessage("Kong Bot", "Average Level in room: " + avgLevel , {"class":"whisper received_whisper"}, {non_user: true});

		return false;
	})

	if(holodeck && ChatDialogue && !holodeck._chat_commands.mostplayed)
	{	
		//Credit goes entirely to Ventero for this command. Thanks for fixing the command after the Kongregate update, Vent :)
		holodeck.addChatCommand("mostplayed", function(l,n){
			var matchArr = n.match(/\/\S+\s+(\d+)/),
				dialog = l.activeDialogue(),
					gamesCount = 5,
					userList = dom.$A(l.chatWindow().activeRoom().users()),
					usersCount = userList.length;
			
			if(matchArr && matchArr[1]) gamesCount = matchArr[1];
			
			function p(count){
				return count == 1?"":"s";
			}

			function makeLink(user){
				return '<a href="#" onclick="holodeck.showMiniProfile(\'' + 
							 user + '\'); return false;">' + user + '</a>'; 
			}

			var games = dom.$H();
			userList.each(function(user){
				var o = user.variables.game_url;
				if(!games.get(o)){
					games.set(o, {
						title: user.variables.game_title,
						count: 0,
						user: "",
						url: o
					});
				}
				games.get(o).count++;
				games.get(o).user = user.username
			})

			var countArr = games.values().sort(function(a,b){
				return +b.count - +a.count;
			}).slice(0, gamesCount);
			var totalCount = games.size();

			dialog.unsanitizedKongBotMessage(usersCount + " user" + p(usersCount) + " playing " +
														 totalCount + " different game" + p(totalCount));

			dialog.unsanitizedKongBotMessage(gamesCount + " most played game" + p(gamesCount) + ":");
			
			countArr.each(function(obj){
				dialog.unsanitizedKongBotMessage(
					obj.count + " user" + p(obj.count) + " (" +
					(obj.count > 1 ? "" : makeLink(obj.user) + ", ") +
					(100*obj.count/usersCount).toFixed(1) + "%) " +
					(obj.count > 1 ? "are" : "is") + ' playing <a href="' +
					obj.url + '">' + obj.title + "</a>"
				);
			});

			return false;
		});
		
		holodeck._chat_commands.mp = holodeck._chat_commands.mostplayed;
		holodeck._chat_commands.getmp = holodeck._chat_commands.mostplayed;
		
		(ChatDialogue.prototype||dom.CDprototype).unsanitizedKongBotMessage = function(message){
			this.displayUnsanitizedMessage("Kong Bot", message, {class: "whisper received_whisper"}, {non_user: true});
		}
	
	}
	
}//end init()

function check(){
	var injectScript = dom.injectScript||(document.getElementById("injectScriptDiv")?document.getElementById("injectScriptDiv").onclick():0);
	if(injectScript){
		injectScript(init_kongregateGet, 0);
	} else if(!dom._promptedFramework && !/Chrome/i.test(navigator.appVersion)){
		if(confirm("You don't have the latest version of the framework-script!\n" + 
		           "Please install it, otherwise the scripts won't work.\n" +
		           "Clicking ok will open a new tab where you can install the script"))
			window.open("http://userscripts.org/scripts/show/54245", "_blank");
		dom._promptedFramework = true;
	}
}

setTimeout(check, 0);