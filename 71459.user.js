// ==UserScript==
// @name           Wowhead Utilities
// @namespace      Neutronimity
// @include        http://*.wowhead.com/?achievement*
// @include        http://*.wowhead.com/?faction*
// @include        http://*.wowhead.com/?item*
// @include        http://*.wowhead.com/?npc*
// @include        http://*.wowhead.com/?object*
// @include        http://*.wowhead.com/?quest*
// @include        http://*.wowhead.com/?spell*
// @include        http://*.wowhead.com/?zone*
// ==/UserScript==

//General variables
	var url = window.location.href;
	var id = url.split('=')[1];
	var key = '';
	var key2 = '';
//Minibox table
	var table = document.getElementsByTagName('table')[0]
	var table_row = document.createElement('tr');
	var table_cell_db = document.createElement('td');
	var table_cell_id = document.createElement('td');
	var smallfont_db = document.createElement('small');
	var smallfont_id = document.createElement('small');
	var smallfont = document.createElement('small');
	var boldfont = document.createElement('b');
	var table_cell_db_ul = document.createElement('ul');
	var table_cell_id_ul = document.createElement('ul');
//Linking to external databases
//MMO-Champion
	if( location.href.match(/item=(\d+)/) ) {
		key = 'i/';
	} else if ( location.href.match(/achievement=(\d+)/) ) {
		key = 'a/';
	} else if ( location.href.match(/quest=(\d+)/) ) {
		key = 'q/';
	} else if ( location.href.match(/npc=(\d+)/) ) {
		key = 'c/';
	} else if ( location.href.match(/object=(\d+)/) ) {
		key = 'o/';
	} else if ( location.href.match(/spell=(\d+)/) ) {
		key = 's/';
	} else if ( location.href.match(/faction=(\d+)/) ) {
		key = 'f/';
	} else if ( location.href.match(/zone=(\d+)/) ) {
		key = 'z/';
	} else {
		key = '';
	}
	if ( key != '' ) {
		var mmoc_li = document.createElement('li');
		var mmoc_db = document.createElement('a');
			mmoc_db.setAttribute('href', 'http://db.mmo-champion.com/' + key + parseInt(id));
		var mmoc_text = document.createTextNode('MMO-Champion');
		mmoc_db.appendChild(mmoc_text);
		mmoc_li.appendChild(mmoc_db);
		table_cell_db_ul.appendChild(mmoc_li);
		}
//WoWArmory
	if( location.href.match(/item=(\d+)/) ) {
		key = 'item-info.xml?i=';
	} else if ( location.href.match(/npc=(\d+)/) ) {
		key = 'search.xml?fl[source]=dungeon&fl[boss]=';
		key2 = '&fl[difficulty]=all&fl[type]=all&searchType=items'
	} else {
		key = '';
		key2 = '';
	}
	if ( key != '' ) {
		var armory_li = document.createElement('li');
		var armory_db = document.createElement('a');
			armory_db.setAttribute('href', 'http://www.wowarmory.com/' + key + parseInt(id) + key2);
		var armory_text = document.createTextNode('WoWArmory');
		armory_db.appendChild(armory_text);
		armory_li.appendChild(armory_db);
		table_cell_db_ul.appendChild(armory_li);
		}
//Thottbot
	if( location.href.match(/item=(\d+)/) ) {
		key = 'i';
	} else if ( location.href.match(/achievement=(\d+)/) ) {
		key = 'ach';
	} else if ( location.href.match(/quest=(\d+)/) ) {
		key = 'q';
	} else if ( location.href.match(/npc=(\d+)/) ) {
		key = 'c';
	} else if ( location.href.match(/object=(\d+)/) ) {
		key = 'o';
	} else if ( location.href.match(/spell=(\d+)/) ) {
		key = 's';
	} else if ( location.href.match(/faction=(\d+)/) ) {
		key = 'f';
	} else if ( location.href.match(/zone=(\d+)/) ) {
		key = 'z';
	} else {
		key = '';
	}
	if ( key != '' ) {
		var thott_li = document.createElement('li');
		var thott_db = document.createElement('a');
			thott_db.setAttribute('href', 'http://www.thottbot.com/' + key + parseInt(id));
		var thott_text = document.createTextNode('Thottbot');
		thott_db.appendChild(thott_text);
		thott_li.appendChild(thott_db);
		table_cell_db_ul.appendChild(thott_li);
		}
//Buffed
	if( location.href.match(/item=(\d+)/) ) {
		key = '?i=';
	} else if ( location.href.match(/achievement=(\d+)/) ) {
		key = '?a=';
	} else if ( location.href.match(/quest=(\d+)/) ) {
		key = '?q=';
	} else if ( location.href.match(/npc=(\d+)/) ) {
		key = '?n=';
	} else if ( location.href.match(/spell=(\d+)/) ) {
		key = '?s=';
	} else if ( location.href.match(/faction=(\d+)/) ) {
		key = '?faction=';
	} else if ( location.href.match(/zone=(\d+)/) ) {
		key = '?zone=';
	} else {
		key = '';
	}
	if ( key != '' ) {
		var buffed_li = document.createElement('li');
		var buffed_db = document.createElement('a');
			buffed_db.setAttribute('href', 'http://wowdata.buffed.de/' + key + parseInt(id));
		var buffed_text = document.createTextNode('Buffed');
		buffed_db.appendChild(buffed_text);
		buffed_li.appendChild(buffed_db);
		table_cell_db_ul.appendChild(buffed_li);
		}
//Adding external database links
	smallfont_db.appendChild(table_cell_db_ul);
	table_cell_db.appendChild(smallfont_db);
	table_row.appendChild(table_cell_db);
	table.insertBefore(table_row,table.firstChild);
//Prev2
//Prev 2
	if( location.href.match(/item=(\d+)/) ) {
		key = 'item=';
	} else if ( location.href.match(/achievement=(\d+)/) ) {
		key = 'achievement=';
	} else if ( location.href.match(/quest=(\d+)/) ) {
		key = 'quest=';
	} else if ( location.href.match(/npc=(\d+)/) ) {
		key = 'npc=';
	} else if ( location.href.match(/object=(\d+)/) ) {
		key = 'object=';
	} else if ( location.href.match(/spell=(\d+)/) ) {
		key = 'spell=';
	} else if ( location.href.match(/faction=(\d+)/) ) {
		key = 'faction=';
	} else if ( location.href.match(/zone=(\d+)/) ) {
		key = 'zone=';
	} else {
		key = '';
	}
	if ( key != '' ) {
	var prev2 = parseInt(id) - 2;
	var prev2_li = document.createElement('li');
	var prev2_id = document.createElement('a');
		prev2_id.setAttribute('href', 'http://www.wowhead.com/?' + key + prev2);
	var prev2_text = document.createTextNode(key + prev2);
	prev2_id.appendChild(prev2_text);
	prev2_li.appendChild(prev2_id);
	table_cell_id_ul.appendChild(prev2_li);
	}
//Prev 1
	if( location.href.match(/item=(\d+)/) ) {
		key = 'item=';
	} else if ( location.href.match(/achievement=(\d+)/) ) {
		key = 'achievement=';
	} else if ( location.href.match(/quest=(\d+)/) ) {
		key = 'quest=';
	} else if ( location.href.match(/npc=(\d+)/) ) {
		key = 'npc=';
	} else if ( location.href.match(/object=(\d+)/) ) {
		key = 'object=';
	} else if ( location.href.match(/spell=(\d+)/) ) {
		key = 'spell=';
	} else if ( location.href.match(/faction=(\d+)/) ) {
		key = 'faction=';
	} else if ( location.href.match(/zone=(\d+)/) ) {
		key = 'zone=';
	} else {
		key = '';
	}
	if ( key != '' ) {
	var prev1 = parseInt(id) - 1;
	var prev1_li = document.createElement('li');
	var prev1_id = document.createElement('a');
		prev1_id.setAttribute('href', 'http://www.wowhead.com/?' + key + prev1);
	var prev1_text = document.createTextNode(key + prev1);
	prev1_id.appendChild(prev1_text);
	prev1_li.appendChild(prev1_id);
	table_cell_id_ul.appendChild(prev1_li);
	}
//Current
	if( location.href.match(/item=(\d+)/) ) {
		key = 'item=';
	} else if ( location.href.match(/achievement=(\d+)/) ) {
		key = 'achievement=';
	} else if ( location.href.match(/quest=(\d+)/) ) {
		key = 'quest=';
	} else if ( location.href.match(/npc=(\d+)/) ) {
		key = 'npc=';
	} else if ( location.href.match(/object=(\d+)/) ) {
		key = 'object=';
	} else if ( location.href.match(/spell=(\d+)/) ) {
		key = 'spell=';
	} else if ( location.href.match(/faction=(\d+)/) ) {
		key = 'faction=';
	} else if ( location.href.match(/zone=(\d+)/) ) {
		key = 'zone=';
	} else {
		key = '';
	}
	if ( key != '' ) {
	var current = parseInt(id);
	var current_li = document.createElement('li');
	var current_text = document.createTextNode(key + current);
	boldfont.appendChild(current_text);
	current_li.appendChild(boldfont);
	table_cell_id_ul.appendChild(current_li);
	}
//Next 1
	if( location.href.match(/item=(\d+)/) ) {
		key = 'item=';
	} else if ( location.href.match(/achievement=(\d+)/) ) {
		key = 'achievement=';
	} else if ( location.href.match(/quest=(\d+)/) ) {
		key = 'quest=';
	} else if ( location.href.match(/npc=(\d+)/) ) {
		key = 'npc=';
	} else if ( location.href.match(/object=(\d+)/) ) {
		key = 'object=';
	} else if ( location.href.match(/spell=(\d+)/) ) {
		key = 'spell=';
	} else if ( location.href.match(/faction=(\d+)/) ) {
		key = 'faction=';
	} else if ( location.href.match(/zone=(\d+)/) ) {
		key = 'zone=';
	} else {
		key = '';
	}
	if ( key != '' ) {
	var next1 = parseInt(id) + 1;
	var next1_li = document.createElement('li');
	var next1_id = document.createElement('a');
		next1_id.setAttribute('href', 'http://www.wowhead.com/?' + key + next1);
	var next1_text = document.createTextNode(key + next1);
	next1_id.appendChild(next1_text);
	next1_li.appendChild(next1_id);
	table_cell_id_ul.appendChild(next1_li);
	}
//Next 2
	if( location.href.match(/item=(\d+)/) ) {
		key = 'item=';
	} else if ( location.href.match(/achievement=(\d+)/) ) {
		key = 'achievement=';
	} else if ( location.href.match(/quest=(\d+)/) ) {
		key = 'quest=';
	} else if ( location.href.match(/npc=(\d+)/) ) {
		key = 'npc=';
	} else if ( location.href.match(/object=(\d+)/) ) {
		key = 'object=';
	} else if ( location.href.match(/spell=(\d+)/) ) {
		key = 'spell=';
	} else if ( location.href.match(/faction=(\d+)/) ) {
		key = 'faction=';
	} else if ( location.href.match(/zone=(\d+)/) ) {
		key = 'zone=';
	} else {
		key = '';
	}
	if ( key != '' ) {
	var next2 = parseInt(id) + 2;
	var next2_li = document.createElement('li');
	var next2_id = document.createElement('a');
		next2_id.setAttribute('href', 'http://www.wowhead.com/?' + key + next2);
	var next2_text = document.createTextNode(key + next2);
	next2_id.appendChild(next2_text);
	next2_li.appendChild(next2_id);
	table_cell_id_ul.appendChild(next2_li);
	}
//Adding Prev2Next2 links
	smallfont_id.appendChild(table_cell_id_ul);
	table_cell_id.appendChild(smallfont_id);
	table_row.appendChild(table_cell_id);
	table.insertBefore(table_row,table.firstChild);