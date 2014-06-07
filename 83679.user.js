// ==UserScript==
// @name           Facebook - Notification Notifier
// @namespace      Facebook - Notification Notifier
// @include        http*://*.facebook.com/*
// @exclude        http*://*.facebook.com/plugins/*
// @exclude        http*://*.facebook.com/widgets/*
// ==/UserScript==

var currentY;

addNotif();
recordbeginvalues();
GM_addStyle("#notifCounter{color:#fff; font-size:35pt; padding-top:13px; display:block; width:100%; text-align;center;}");

function addNotif(){
	var notifHolder = document.createElement("div");
	notifHolder.style.position = "fixed";
	notifHolder.style.left = "0px";
	notifHolder.style.top = "0px";
	notifHolder.style.width = "100%";

	var notifInner = document.createElement("div");
	notifInner.style.width = "980px";
	notifInner.style.margin = "auto";
	
	var notif = document.createElement("div");
	var jewelCase = document.getElementById("jewelCase");
	notif.id = "notif";
	notif.style.backgroundImage = "url(http://i37.tinypic.com/2i8x1g3.png)";
	notif.style.top = "10px";
	notif.style.marginLeft = "145px";
	notif.style.width = "85px";
	notif.style.height = "85px";
	notif.style.display = "none";
	notif.style.position = "relative";
	notif.style.opacity = "0.75";
	notif.style.cursor = "pointer";
	notif.style.textAlign = "center";
	notif.style.zIndex = "9999999";
	notif.addEventListener('click', function (event) {
				scrollTo(0,0);
			}, true);
	notif.addEventListener('mouseover', function (event) {
				notif.style.opacity = "1";
			}, true);
	notif.addEventListener('mouseout', function (event) {
				notif.style.opacity = "0.75";
			}, true);
	
	notifHolder.appendChild(notifInner);
	notifInner.appendChild(notif);
	
	document.getElementsByTagName("body")[0].appendChild(notifHolder);

}

function addListener(){
	document.getElementById("jewelCase").addEventListener("DOMNodeInserted", function() {
		document.getElementById("notif").innerHTML = "<span id='notifCounter'>" + getNotifCount() + "</span>";
	}, false);
}


function getNotifCount(){
	var jewelCase = document.getElementById("jewelCase");
	if(jewelCase.innerHTML.indexOf("jewelNew")>-1){
		var jewelCount = getElementsByClassName("jewelCount");
		//the friend,message, and notification counters

		if(jewelCount[0].parentNode.parentNode.className.indexOf("jewelNew")>-1){
			var friendCount = jewelCount[0].getElementsByTagName("span")[0].innerHTML;
		}else{
			var friendCount = 0;
		}
		//the # of friend requests
		
		if(jewelCount[1].parentNode.parentNode.className.indexOf("jewelNew")>-1){
			var messageCount = jewelCount[1].getElementsByTagName("span")[0].innerHTML;
		}else{
			var messageCount = 0;
		}
		//the # of messages
		
		if(jewelCount[2].parentNode.parentNode.className.indexOf("jewelNew")>-1){
			var notificationCount = jewelCount[2].getElementsByTagName("span")[0].innerHTML;
		}else{
			var notificationCount = 0;
		}
		//the # of notifications
		
		var jewelTotal = parseInt(friendCount) + parseInt(messageCount) + parseInt(notificationCount);
		//count up the total number of friend requests, messages, etc
		if(jewelTotal == undefined){
			return "!";
		}else{
			return jewelTotal;
		}
	}
}

var moveTimeout;
function startMoveDivY(starty, endy, div){
	div.style.top = starty + "px";
	moveDivY(starty,endy, div);
}

function moveDivY(starty, endy, div){

    var currenty = parseInt(div.style.top);

    var delay = function () {
        moveDivY(starty, endy, div);
    };

	if(endy>starty){
		if (endy > currenty) {
			div.style.top = (parseInt(div.style.top) + 5) + "px";
			clearTimeout(moveTimeout);
			moveTimeout = setTimeout(delay, 20);
		}
	}else{
		if (endy < currenty) {
			div.style.top = (parseInt(div.style.top) - 5) + "px";
			clearTimeout(moveTimeout);
			moveTimeout = setTimeout(delay, 20);
		}
	}

}

function hideNotif(){ 
	if(document.getElementById("notif").style.display == "block"){ 
		document.getElementById("notif").style.display = "none";
		startMoveDivY(10,-50,document.getElementById("notif")); 
	}
}
function showNotif(){ 
	document.getElementById("notif").innerHTML = "<span id='notifCounter'>" + getNotifCount() + "</span>";
	if(document.getElementById("notif").style.display == "none"){ 
		document.getElementById("notif").style.display = "block";
		startMoveDivY(-50,10,document.getElementById("notif")); 
	}
}

function unreadNotifs(){
	var jewelCase = document.getElementById("jewelCase");
	if(jewelCase.innerHTML.indexOf("jewelNew")>-1){
		return true;
	}else{
		return false;
	}
}
function recordbeginvalues() { startPolling(); 		  }
function startPolling() 	 { setTimeout(poll, 200); }

function poll() {
    if (document.getElementById && !document.all) {
        currentY = window.pageYOffset;
    } else {
        currentY = document.documentElement.scrollTop;
    }
	if(currentY > 41){
		if(unreadNotifs()){
			showNotif();
		}
	}else{
		hideNotif();
	}
	setTimeout(poll, 200);
}



function insertAfter(parent, node, referenceNode) {
  parent.insertBefore(node, referenceNode.nextSibling);
}


function getElementsByClassName(className, tag, elm) {
    var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
    var tag = tag || "*";
    var elm = elm || document;
    var elements = (tag == "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag);
    var returnElements = [];
    var current;
    var length = elements.length;
    for (var i = 0; i < length; i++) {
        current = elements[i];
        if (testClass.test(current.className)) {
            returnElements.push(current);
        }
    }
    return returnElements;
}