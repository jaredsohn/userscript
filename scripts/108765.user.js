// ==UserScript==
// @name           FWZ: 1212
// @namespace      WAT
// @description    Plays the game for you
// @include        http://*.forumwarz.com/forums/battle/*
// @include        http://forumwarz.com/forums/battle/*
// ==/UserScript==

// really that's all you need to count how many fucking threads in the forum jegus christ why can't brainfreeze count?
document.title = (document.getElementById('thread_list').children[0].children[0].children.length-1)+" threads";

function one_two(){
	disabled = 0;attacks = 0;
	if(document.getElementById('thread_list')!=undefined && document.getElementById('thread_list').style.display != "none"){
		unsafeWindow.Toolbar.select_thread_by_id(document.getElementById('thread_list').children[0].children[0].children[1].getAttribute("thread_id")+"");
	}
	
	// If I killed the thread then go to the next one dumbass
	if(document.getElementById('thread_killed') != undefined){
		document.getElementById('THREAD_DEAD_OMG').click();
		return;
	}
	//check health
	health_percent = Math.round(eval(document.getElementById("player_property_bar_ego_values").innerHTML)*100)+"%";
	items = document.getElementById('toolbar_items').children[0].children[0].children;
	var secondary_stat = get_secondary_stat();
	for(i=0; i<items.length; i++){
		if(items[i].className == "item-cell"){
			attacks++
			var info = get_attack_info(i);
			if(items[i].children[0].className != "item disabled" && (!info[2] || Number(info[2].split(/ -/)[1]) <= Number(secondary_stat))){
				document.getElementById("i_am_in_brainfreaze_and_i_cant_count").value = i;break;
			}
			else{disabled++;}
		}
	}
	//alert(disabled+" "+attacks);
	if(disabled!=attacks) document.getElementById("one_two_one_two").click();
	document.title = (document.getElementById('thread_list').children[0].children[0].children.length-1)+" threads "+health_percent;
}

function get_attack_info(attack){
	var items = document.getElementById('toolbar_items').children[0].children[0].children,
	    info = items[attack].children[0].children[1].children[0].getAttribute("alt");
	info = info.split(/   ?/);
	info.pop();info.pop();
	return info;
}

function get_secondary_stat(){
	var douchebaggery = document.getElementById("player_property_bar_douchebaggery"),
	    sexiness = document.getElementById("player_property_bar_sexiness"),
	    proc_power = document.getElementById("player_property_bar_processing_power");
	if(douchebaggery) return douchebaggery.getAttribute("current_value");
	if(sexiness) return sexiness.getAttribute("current_value");
	if(proc_power) return proc_power.getAttribute("current_value");
	return 0;
}

where = document.getElementById('toolbar_items');
if (where) {
	unsafeWindow.next_thread = function(){unsafeWindow.Battle.another_thread();}
	unsafeWindow.attack = function(){unsafeWindow.Toolbar.select_toolbar(document.getElementById("i_am_in_brainfreaze_and_i_cant_count").value);}

	// Attack Button
	newElement = document.createElement('input');
	newElement.setAttribute("value", "clickpost");
	newElement.setAttribute("id", "one_two_one_two");
	newElement.setAttribute("onclick", "attack()");
	newElement.setAttribute("type", "button");
	newElement.setAttribute("style", "visibility:hidden");
	where.parentNode.insertBefore(newElement, where.nextSibling);
	
	// Next thread button
	newElement = document.createElement('input');
	newElement.setAttribute("value", "clickpost");
	newElement.setAttribute("id", "THREAD_DEAD_OMG");
	newElement.setAttribute("onclick", "next_thread()");
	newElement.setAttribute("type", "button");
	newElement.setAttribute("style", "visibility:hidden");
	where.parentNode.insertBefore(newElement, where.nextSibling);
	
	// Button for having the value to whatever attack that needs to be done
	newElement = document.createElement('input');
	newElement.setAttribute("value", "clickpost");
	newElement.setAttribute("id", "i_am_in_brainfreaze_and_i_cant_count");
	newElement.setAttribute("type", "hidden");
	where.parentNode.insertBefore(newElement, where.nextSibling);

	// Button for choosing which attack to do	
	newElement = document.createElement('input');
	newElement.setAttribute("value", "brainfreaze");
	newElement.setAttribute("id", "HURF_DURF_MEDALZ");
	newElement.setAttribute("type", "button");
	newElement.addEventListener('click', one_two, false)
	newElement.setAttribute("style", "visibility:hidden");
	where.parentNode.insertBefore(newElement, where.nextSibling);
	
	// Do it automagically button
	newElement = document.createElement('input');
	newElement.setAttribute("value", "Do it automatically");
	newElement.setAttribute("id", "NIGGER_NIGGER");
	newElement.setAttribute("type", "button");
	do_automagically = function() { setInterval(function(){document.getElementById('HURF_DURF_MEDALZ').click();},1000); }//else{document.getElementById('NEXT_FORUM_BUTTON').click();}
	newElement.addEventListener('click', do_automagically, false)
	where.parentNode.insertBefore(newElement, where.nextSibling);
}

function forum_pwned(){
	document.title='0 threads (FORUM PWNED)';
	//document.getElementById('NEXT_FORUM_BUTTON').click();/**/
}

//Uncomment this at own risk
//document.getElementById("NIGGER_NIGGER").click();