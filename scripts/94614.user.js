// ==UserScript==
// @name           Avg Lvl
// @namespace      arreloco
// @include        http://www.kongregate.com/games/*
// ==/UserScript==

function chupala(){
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
	actual_room = holodeck.chatWindow().activeRoom().name();
	userList = holodeck.chatWindow().activeRoom().users();
	var total_level = 0;
	var max_level = 0;
	for(var i=0;i<userList.length;i++){
		total_level += userList[i].variables.level;
	}
	var average_level = Math.round(total_level/userList.length*10)/10;
	var secondTab = document.getElementById("chat_tab_pane").lastElementChild.style.display;
	if(secondTab != "none"){		document.getElementById("chat_tab_pane").lastChild.firstElementChild.innerHTML = "Room: <span class='room_name'>"+actual_room+"</span><span style='float: right;'>Avg lvl: "+average_level+"</span>";
	}else{		document.getElementById("chat_tab_pane").lastChild.previousSibling.firstElementChild.innerHTML = "Room: <span class='room_name'>"+actual_room+"</span><span style='float: right;'>Avg lvl: "+average_level+"</span>";
	}
}
setInterval(chupala,15000);