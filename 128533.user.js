// ==UserScript==
// @name           4chan Tripcode Manager
// @version        1.2
// @namespace      http://userscripts.org/users/441036
// @author         TheAlbinoEthiopian
// @description    Allows storing and toggling of multiple names/tripcodes
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include        http://boards.4chan.org/*
// @exclude        http://boards.4chan.org/b/
// @exclude        http://boards.4chan.org/b/*
// @downloadURL    https://gitorious.org/4chan-tripcode-manager/4chan-tripcode-manager/blobs/raw/master/128533.user.js
// @updateURL      https://gitorious.org/4chan-tripcode-manager/4chan-tripcode-manager/blobs/raw/master/128533.user.js
// ==/UserScript==

//Button icons
var add_icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAQAAABuBnYAAAAAGUlEQVQImWNggIANQIgC8AlsQIOYAiQbCgAUMxNBUqWR0wAAAABJRU5ErkJggg%3D%3D";
var del_icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAQAAABuBnYAAAAAEklEQVQIW2NgIANsQIOYAiQDAOcmCwGcy16yAAAAAElFTkSuQmCC";

//Retrieve stored tripcodes
var trips=GM_getValue("4tm_trips");
if(trips==null || trips==""){
	trips=new Array();
	trips[0]=0;
}
else trips=eval(trips);

//Update stored JSONed list
function update_list(){
	var trips_s=JSON.stringify(trips);
	GM_setValue("4tm_trips", trips_s);
}

//Shift array right
function shift_arr(arr){
	var newarr=new Array();
	for(i=0;i<arr.length;i++){
		newarr[i+1]=arr[i];
	}
	return newarr;
}

//Search array
function search(str){
	arr=trips.slice(0);
	arr.splice(0,1);
	arr.sort();
	var min=0;
	var max=arr.length-1;
	var i;
	while(max>=min){
		i=Math.floor((min+max)/2);
		if(arr[i]<str)
			min=i+1;
		else if(arr[i]>str)
			max=i-1;
		else if(arr[i]==str)
			return i+1;
	}
	return false;
}

//Add tripcode
function add_trip(tc){
	tc_search=search(tc);
	if(tc_search!=false){
		alert("'" + tc + "' already in list!");
		return;
	}
	trips[trips.length]=tc;
	del_trip(0);
	trips.sort();
	trips=shift_arr(trips);
	trips[0]=search(tc);
	update_list();
}

//Delete tripcode
function del_trip(i){
	trips.splice(i,1);
	if(i!=0) trips[0]--;
	update_list();
}

//Add HTML code
function html_replace(){
	var in_field=document.getElementsByName('name');
	in_field=in_field[0].parentNode;
	var input_replace="<select name=\"name\" style=\"width:208px;\">\n";
	input_replace+="<option value=\"\">Anonymous</option>";
	for(i=1;i<trips.length;i++){
		if(trips[0]==i) input_replace+="<option selected=\"selected\" value=\"" + trips[i] + "\">" + trips[i] + "</option>";
		else input_replace+="<option value=\"" + trips[i] + "\">" + trips[i] + "</option>";
	}
	input_replace+="</select>\n";
	input_replace+="<button type=\"button\" id=\"add_button\"><img src=\"" + add_icon + "\"></button>\n";
	input_replace+="<button type=\"button\" id=\"del_button\"><img src=\"" + del_icon + "\"></button>\n";
	
	var comment_field=document.getElementsByName('com')[0];
	var comment=comment_field.value; //Get content of comment field
	in_field.innerHTML=input_replace;
	comment_field.value=comment;
	add_listener(); //start add button listener
	del_listener(); //start delete button listener
	trip_listener(); //start selector listener
}

//Add button listener
function add_listener(){
	var add_button=document.getElementById('add_button');
	add_button.addEventListener('click', function(){
		var new_trip=prompt("Enter Name/Trip","");
		add_trip(new_trip);
		html_replace();
	}, false);
}

//Delete button listener
function del_listener(){
	var del_button=document.getElementById('del_button');
	del_button.addEventListener('click', function(){
		var trip_select=document.getElementsByName('name')[0];
		var trip_index=trip_select.selectedIndex;
		var trip_value=trip_select.options[trip_index].value;
		if(trip_index==0) alert("Cannot delete 'Anonymous'!");
		else{
			if(confirm("Delete '" + trip_value + "'?")){
				del_trip(trip_index);
				html_replace();
			}
		}
	}, false);
}

//Trip selector listener
function trip_listener(){
	var trip_select=document.getElementsByName('name')[0];
	trip_select.addEventListener('change', function(){
		var def=trip_select.selectedIndex;
		trips[0]=def;
		update_list();
	}, false);
}

html_replace(); //Initiate