// ==UserScript==
// @name        WaniKani Real Times
// @namespace   penx.scripts
// @description	Replaces WaniKani times with more exact times.
// @include     https://www.wanikani.com/*
// @exclude		https://www.wanikani.com/review*
// @exclude		https://www.wanikani.com/lesson*
// @exclude		https://www.wanikani.com/community/people/*
// @exclude		https://www.wanikani.com/account
// @exclude		https://www.wanikani.com/login
// @version     1.2
// @run-at		document-end
// @updateURL	https://userscripts.org/scripts/source/154756.meta.js
// ==/UserScript==

function main(){
	
	GM_addStyle("time1 { cursor: help; font-family: \"Ubuntu\",Helvetica,Arial,sans-serif; }");
	GM_addStyle("time2 { cursor: help; font-family: \"Ubuntu\",Helvetica,Arial,sans-serif; }");
	GM_addStyle("time3 { cursor: help; font-family: \"Ubuntu\",Helvetica,Arial,sans-serif; }");
	GM_addStyle("time4 { cursor: help; font-family: \"Ubuntu\",Helvetica,Arial,sans-serif; }");
	GM_addStyle(".dashboard section.review-status time1 { display: block; margin-bottom: 0.5em; font-size: 36px; font-weight: bold; line-height: 1em; }");
	GM_addStyle("time2 { color: rgb(153, 153, 153); text-shadow: 0px 1px 0px rgb(255, 255, 255); }");
	GM_addStyle(".dashboard section.system-alert time4 { margin-left: 1em; color: rgb(119, 0, 79); font-weight: 600; text-shadow: 0px 1px 0px rgba(255, 255, 255, 0.3); opacity: 0.45; }");

	var timeElements = document.getElementsByClassName("timeago");
	var currentTime = new Date().valueOf();
	
	for(var i=0;i<timeElements.length;i){

		if(timeElements[i].parentNode.parentNode.parentNode.className.indexOf("review-status") != -1){

			var reviewTimeHolder = timeElements[i];
			var reviewTime = new Date(reviewTimeHolder.getAttribute("datetime")*1000);
			var title = reviewTimeHolder.getAttribute("title");
			var children = reviewTimeHolder.childNodes;
			var parent = reviewTimeHolder.parentNode;
			var newNode = document.createElement("time1");
			newNode.setAttribute("title", title);
			newNode.setAttribute("datetime", reviewTime.valueOf());
			
			for(var j=0;j<children.length;j++){
				
				newNode.appendChild(children[j]);
				
			}
			
			parent.replaceChild(newNode,reviewTimeHolder);
			
		}else if(timeElements[i].parentNode.parentNode.className.indexOf("system-alert") != -1){
			
			var alertTimeHolder = timeElements[i];
			var alertTime = new Date(alertTimeHolder.getAttribute("datetime").valueOf());
			var title = alertTimeHolder.getAttribute("title");
			var children = alertTimeHolder.childNodes;
			var parent = alertTimeHolder.parentNode;
			var newNode = document.createElement("time4");
			newNode.setAttribute("title", title);
			newNode.setAttribute("datetime", alertTime.valueOf());
			
			for(var j=0;j<children.length;j++){
			
				newNode.appendChild(children[j]);
				
			}
			
			parent.replaceChild(newNode,alertTimeHolder);
			
		}else{
			
			var theTime = new Date(timeElements[i].getAttribute("datetime")).valueOf();
			
			if(theTime){
			
				var upCountHolder = timeElements[i];
				var upCountTime = new Date(upCountHolder.getAttribute("datetime")).valueOf();
				var title = upCountHolder.getAttribute("title");
				var children = upCountHolder.childNodes;
				var parent = upCountHolder.parentNode;
				var newNode = document.createElement("time3");
				newNode.setAttribute("title", upCountHolder.getAttribute("title"));
				newNode.setAttribute("datetime", upCountTime.valueOf());
				
				for(var j=0;j<children.length;j++){
				
					newNode.appendChild(children[j]);
					
				}
				
				parent.replaceChild(newNode,upCountHolder);
				
			}else{
			
				var downCountHolder = timeElements[i];
				var downCountTime = new Date(downCountHolder.getAttribute("datetime")*1000);
				var title = downCountHolder.getAttribute("title");
				var children = downCountHolder.childNodes;
				var parent = downCountHolder.parentNode;
				var newNode = document.createElement("time2");
				newNode.setAttribute("title", downCountHolder.getAttribute("title"));
				newNode.setAttribute("datetime", downCountTime.valueOf());
				
				for(var j=0;j<children.length;j++){
				
					newNode.appendChild(children[j]);
					
				}
				
				parent.replaceChild(newNode,downCountHolder);
				
			}
	
		}
		
	}

	alertCount = document.getElementsByTagName("time4");
	reviewCount = document.getElementsByTagName("time1");

	downCounters = document.getElementsByTagName("time2");
	upCounters = document.getElementsByTagName("time3");

	function newTimes(){
	
		updateUpCounters(upCounters);
		updateUpCounters(alertCount);
		updateDownCounters(downCounters);
		updateDownCounters(reviewCount);
		
	}
	
	newTimes();
	window.setInterval(newTimes,30000);

}

window.addEventListener("load", main, false);

function updateUpCounters(up){

	var currentTime = new Date();
	
	for(var i=0;i<up.length;i++){
	
		var diff = currentTime - up[i].getAttribute("datetime");
		var x = diff / 60000;
		var minutes = parseInt(x % 60);
		
		if(minutes == 0){
		
			minutes = "";
			
		}else if(minutes > 1){
		
			minutes += " minutes ";
			
		}else{
		
			minutes += " minute ";
			
		}
		
		x /= 60;
		var hours = parseInt(x % 24);
		
		if(hours == 0){
		
			hours = "";
			
		}else if(hours > 1){
		
			hours += " hours ";
			
		}else{
		
			hours += " hour ";
			
		}
		
		x /= 24;
		var days = parseInt(x % 30);
		
		if(days == 0){
		
			days = "";
			
		}else if(days > 1){
		
			days += " days ";
			
		}else{
		
			days += " day ";
			
		}
		
		x /= 30;
		var months = parseInt(x);
		
		if(months == 0){
		
			months = "";
			
		}else if(months > 1){
		
			months += " months ";
			
		}else{
		
			months += " month ";
			
		}
		
		var output = "";
		
		if(diff > 7776000000){
		
			output = months + "ago";
			
		}else if(diff > 2592000000){
		
			output = months + days + "ago";
			
		}else if(diff > 259200000){
		
			output = days + "ago";
			
		}else if(diff > 86400000){
		
			output = days + hours + "ago";
			
		}else if(diff > 3600000){
		
			output = hours + minutes + "ago";
			
		}else if(diff > 60000){
		
			output = minutes + "ago";
			
		}else{
		
			output = "Just now";
			
		}
		
		up[i].innerHTML = output;
		
	}
	
}

function updateDownCounters(down){

	var currentTime = new Date();
	
	for(var i=0;i<down.length;i++){
	
		var diff = down[i].getAttribute("datetime") - currentTime;
		var x = diff / 60000;
		var minutes = parseInt(x % 60);
		
		if(minutes == 0){
		
			minutes = "";
			
		}else if(minutes > 1){
		
			minutes += " minutes ";
			
		}else{
		
			minutes += " minute ";
			
		}
		
		x /= 60;
		var hours = parseInt(x % 24);
		
		if(hours == 0){
		
			hours = "";
			
		}else if(hours > 1){
		
			hours += " hours ";
			
		}else{
		
			hours += " hour ";
			
		}
		
		x /= 24;
		var days = parseInt(x % 30);
		
		if(days == 0){
		
			days = "";
			
		}else if(days > 1){
		
			days += " days ";
			
		}else{
		
			days += " day ";
		}
		
		x /= 30;
		var months = parseInt(x);
		
		if(months == 0){
		
			months = "";
			
		}else if(months > 1){
		
			months += " months ";
			
		}else{
		
			months += " month ";
			
		}
		
		var output = "";
		
		if(diff < 0 || (window.location.href.indexOf("dashboard") != -1 && document.getElementsByClassName("reviews")[0].getElementsByTagName("span")[0].innerHTML != "0")){
		
			output = "Available Now";
			
		}else if(diff > 7776000000){
		
			output = months;
			
		}else if(diff > 2592000000){
		
			output = months + days;
			
		}else if(diff > 259200000){
		
			output = days;
			
		}else if(diff > 86400000){
		
			output = days + hours;
			
		}else if(diff > 3600000){
		
			output = hours + minutes;
			
		}else if(diff > 60000){
		
			output = minutes;
			
		}else{
		
			output = "Soon&#8482;";
			
		}
		
		down[i].innerHTML = output;
		
	}
	
}