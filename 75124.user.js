// ==UserScript==
// @name           Anti Troll Barrapunto
// @namespace      Jefry Lagrange
// @description    Anti Troll Barrapunto
// @include        http://barrapunto.com/journal.pl?op=top
// ==/UserScript==



function getjournal_url(user){
	fuser = user.replace(/ /g, "+");
	return "http://barrapunto.com/~"+ fuser +"/journal/";
}

function ban_troll(){
	nickname = prompt("Input the name of the troll to be banned"); 
	var nextval = GM_listValues().length + 1;
	GM_setValue(nextval, nickname);  
}

function unban_all_trolls(){
	for each (var id in GM_listValues()) {
		GM_deleteValue(id); 
	}
}

function swap(id1,id2) {
		
	var val1 = GM_getValue( id1);
	var val2 = GM_getValue( id2);
	GM_setValue(id1, val2 );
	GM_setValue(id2, val1 );
}

function unban_troll(){

	if(GM_listValues() == "") {
		alert("There are no trolls banned");
		return;
	}

	var msg = "Please input the id of the troll you want to unban \n";
	for each (var id in GM_listValues()) { // List the id values of the trolls
		msg = msg + "id : " + id + " " + GM_getValue(id) + "\n";
	}
	var trollid = prompt(msg);
	
	if(GM_getValue( trollid, undefined ) != undefined) {
		var i = Number(trollid);
		while(GM_getValue( i+1, undefined ) != undefined) {
			swap(i, i+1);
			i = i + 1;
		}
		GM_deleteValue(i);
		
	}
	else {
		alert("Wrong id");
	}
}

GM_registerMenuCommand("Barrapunto Anti Troll > Ban Troll", ban_troll);
GM_registerMenuCommand("Barrapunto Anti Troll > Unban Troll", unban_troll);
GM_registerMenuCommand("Barrapunto Anti Troll > Unban all Trolls", unban_all_trolls);


var columns =  document.getElementsByTagName('td');


for (var i = 0;i < columns.length; i++) {

	for each (var id in GM_listValues()) {

		var nickname = GM_getValue(id);
		if (columns[i].childNodes[0] == getjournal_url(nickname)){
			var row = columns[i].parentNode;
			var pp = row.parentNode;
			pp.removeChild(row);
			i = 0; //Start from the beginning

		}
		
	}
	
}



