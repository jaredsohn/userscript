// ==UserScript==
// @name           Muted users
// @namespace      arreloco
// @description    Check if you have still muted somebody.
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
		holodeck.addChatCommand("get_muted", function(l,n){
			var matchArr1 = n.match(/^\/\S+\s+(\d+)/),
					roomDetails = l.chatWindow(),
					countArr = [];
			var muted_people = roomDetails._mutings;
			var mutedArr = new Array();

			for(var i in muted_people){
				mutedArr.push("<a target='_blank' href='http://www.kongregate.com/accounts/"+[i]+"'>"+[i]+"</a>");
			}

			var txt = mutedArr.toString();
			for(var i in muted_people){
				txt = txt.replace(","," - ");
			}
			
			l.activeDialogue().displayUnsanitizedMessage("Muted Users", (txt?txt:"You have no one muted."), {"class":"whisper received_whisper"}, {non_user: true});
			
			return false;
			
		})
		
		holodeck._chat_commands.muted = holodeck._chat_commands.get_muted;
}//end init()

setTimeout(init,0);