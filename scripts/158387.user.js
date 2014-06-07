// ==UserScript==
// @id             radio.krautchan.net-ad97f4b8-30a3-4720-8dd3-17a7c22db3fa@KC
// @name           RFK Notifier
// @version        1.1
// @namespace      RFK
// @author         andras1024
// @description    Shows notification about shows
// @include        http://radio.krautchan.net/*
// @run-at         document-start
// ==/UserScript==


//TODO: üzenet: nextshow változás (állítható időtartomány), előtte, kezdetekor
//TODO: nincs ajax 1 percen belül
//*TODO: több üzenet bezárása: array-ba velük, bezáráskor eltávolítás
//-TODO: látványos HTML üzenet
//TODO: onclick showthread
//TODO: naptár frissítés és színezés

//----- Config -----
var key = "92e3779b112afa1adf1da5158e2f73b9e11107f6";
var timeout = 0;	//notification timeout in seconds, 0: no autoclose
var pollinterval = 5;	//time between refreshing data in minutes
var hourdiff = 24;	//don't show next show if it isn't in specified hours from now
//---- /Config -----


//----- Notification -----
var notifications = [];
var lastnotifications = {};

function notify2(title, text) {
	if (window.webkitNotifications.checkPermission() == 0) {
		var notification = window.webkitNotifications.createNotification(null, title, text);
		notifications.push(notification);
		notification.onclick = function () {
			notification.close();
			var index = notifications.indexOf(notification);
			if(index != -1)
            {
				notifications.splice(index, 1);
            }
		};
		notification.show();
		if(timeout != 0){
			window.setTimeout(function () {
				notification.close();
				var index = notifications.indexOf(notification);
                if(index != -1){
					notifications.splice(index, 1);
                }
			}, 1000*timeout);
		}
	}else{
		window.webkitNotifications.requestPermission();
	}
}

function notify7(id, name, dj, showbegin, showend, description, type)
{
	if(!(lastnotifications[type] && (lastnotifications[type] == id))){
		lastnotifications[type] = id;
		var start = "";
        if(type == "c"){
			start = "Current show: ";
        }else if(type == "n"){
			start = "Next show: ";
        }else if(type == "u"){
			start = "Next show (u): ";
        }
		var begin = new Date(showbegin*1000);
		var end = new Date(showend*1000);
		notify2(
			start + name + " by " + dj,
			"(" + begin.toLocaleTimeString() + "-" + end.toLocaleTimeString() + ") " + description
		);
	}
}

window.onunload=function(){
	//GM_log("Unloading notifications: " + notifications.length);
	for(var i=0; i<notifications.length; i++){
		notifications[i].close();
	}
};  

//----- Ajax -----
var xmlhttp = new XMLHttpRequest();

function refreshShow(){
	xmlhttp.open("GET","api/?apikey=" + key + "&w=dj,show,nextshows&c=1",true);
	xmlhttp.send();
}

function showData(datastring){
	var data = JSON.parse(datastring);
	if(data.errid){
		notify2("Error: " + data.errid, data.error);
	}else{
		if(data.showid){
			notify7(data.showid, data.showname, data.showdj, data.showbegin, data.showend, data.showdescription, "c");
		}
		if(data.ushowid){
			notify7(data.ushowid, data.ushowname, data.ushowdj, data.ushowbegin, data.ushowend, data.ushowdescription, "u");
		}
		if((data.shows) && (data.shows.length > 0)){
			var nextdata = data.shows[0];
			var begin = new Date(nextdata.showbegin*1000);
			var now = new Date();
			//var hours = Math.floor((begin-now)/1000/60/60);
			var hours = (begin-now)/1000/60/60;
            if(hours < hourdiff){
				notify7(nextdata.showid, nextdata.showname, nextdata.showdj, nextdata.showbegin, nextdata.showend, nextdata.showdescription, "n");
            }
		}
	}
}

xmlhttp.onreadystatechange=function(){
	if (xmlhttp.readyState==4 && xmlhttp.status==200){
		showData(xmlhttp.responseText);
    }
};

//----- Main -----
if (window.webkitNotifications) {
    if (window.webkitNotifications.checkPermission() != 0){
		window.webkitNotifications.requestPermission();
    }
	refreshShow();
	setInterval(refreshShow, 1000*60*pollinterval);
}else{
	alert("Notifications are not supported for this Browser/OS version yet.");
}
