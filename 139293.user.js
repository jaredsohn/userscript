// ==UserScript==
// @name           Test22
// @namespace      
// @description    None so far
// @include        http://www.naruto-arena.com/clan/management/*
// ==/UserScript==
//

var user_array = [
		"[Offline]User1",
		"[Offline]User2",
		"[Online]User3",
		"[Offline]User4",
		"[Online]User5",
		"[Online]User6",
		"[Online]User7",
		"[Offline]User8"
	];
	var div = document.createElement("div");
		div.innerHTML = "<ul id='online_users'></ul><ul id='offline_users'></ul>";
	document.body.appendChild(div);
	
	for (i=0; i<user_array.length; i++) {
		li = document.createElement("li");
		li.innerHTML = user_array[i];
		id = "offline_users";
		if (/\[Online\]/.test(user_array[i]))
			id = "online_users";
		document.getElementById(id).appendChild(li);
	}



function findStatus(){
	var spans = document.getElementsByTagName("span");
	for(var i= 0;i < spans.length;i++){
		if(spans[i].innerHTML.indexOf("online")==1){
			return 0;	

var findStatus = 0;
Status = findStatus();

<input type="text" name="Status" id="Status"><span id="Status"></span>
Status.innerHTML = Status;