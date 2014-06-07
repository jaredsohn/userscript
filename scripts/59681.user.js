// ==UserScript==
// @name KingsAge : Distance calculator
// @namespace http://userscripts.org/scripts/show/59681
// @description Why not have a more decent measure of distance to some settlement on the favorites menu?
// @date 2009-10-12
// @creator mkey
// @include http://*.kingsage.*/game.php?village=*&s=favorites&m=village
// @include http://*.kingsage.*/game.php?village=*&s=info_village&id=*
// ==/UserScript==

// !!!! Change this value if you want to change the time it takes for some unit to travel one field !!!!
var var_movement_speed = 18;

(function(){
	var table;
	var division;
	var links;
	var i;
	var j;
	var text;
	var user_coords;
	var target_coords;
	var temp_x;
	var temp_y;
	
	table = document.getElementsByClassName('ressilist');
	if (!table) return;
	
	links = table[0].getElementsByTagName('b');
	if (!links) return;
	
	// get the user settlement coords and extract numbers
	text = links[0].textContent;
	text = text.substring(text.indexOf('(') + 1);
	text = text.substring(0, text.indexOf(')'));
	user_coords = text.split('|');
	
	table = document.getElementsByClassName('borderlist');
	if (!table) return;
	
	if (document.location.href.indexOf('info_village') == -1){
		// go through the table and get the settlements coords
		for (i=1; i<table.length; i++){
			links = table[i].getElementsByTagName('tr');
			for (j=1; j<links.length; j++){
				division = links[j].getElementsByTagName('td');
				if(division[0].textContent!="x: "){
					text = division[0].textContent;
					target_coords = text.split('|');
					
					// calculate the distance
					temp_x = Number(target_coords[0]) - Number(user_coords[0]);
					temp_y = Number(target_coords[1]) - Number(user_coords[1]);
					division[0].innerHTML += '('+String(Math.round(var_movement_speed*Math.sqrt(temp_x*temp_x+temp_y*temp_y)))+'min)';
				}
			}
		}
	} else {
		links = table[2].getElementsByTagName('td')[1];  
		text = links.textContent;
		target_coords = text.split('|');
		
		// calculate the distance
		temp_x = Number(target_coords[0]) - Number(user_coords[0]);
		temp_y = Number(target_coords[1]) - Number(user_coords[1]);
		links.innerHTML += ' ('+String(Math.round(var_movement_speed*Math.sqrt(temp_x*temp_x+temp_y*temp_y)))+' min)';
	}
})()