// ==UserScript==
// @name           Facebook Auto Like, Auto Pokes, Auto Confirm, Auto Add Friends
// @namespace      Dhelina Maryani Auto Like, Auto Pokes, Auto Confirm, Auto Add Friends
// @description    Auto Like/ Auto Pokes / Auto Add Friends 
// @icon			http://lockupmwm.webs.com/gambor/FB.png
// @include			http://www.facebook.com/*
// @include			https://www.facebook.com/*
// @exclude			htt*://developers.facebook.com/*
// @include			http://www.facebook.com/pokes
// @include 		https://www.facebook.com/pokes
// @include 		http://www.facebook.com/pokes?*
// @include 		https://www.facebook.com/pokes?*
// @version			Dhelina Maryani
// Auto Like/Pokes, And Another Function.
// ==/UserScript==

// ==Profile==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like1');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 1.00;
	div.style.bottom = "+165px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#0000FF";
	div.style.border = "1px solid #555";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://lockupmwm.webs.com/gambor/fbpage.png' width='16' height='14' align='absmiddle'div style='background-color: #0000CD; '><left><a style='color: #FF0000;'onclick='spoiler()' title='Click to Hidden Widget'>&laquo;</a> &#8226; <a href='http://www.facebook.com/dhe.maryani' style='color: #FFFFFF; 'target='_blank' onclick='alert(\'Thanks for install this script\');'>dhelina maryani</a></div> "
	div2 = document.createElement("div");
	div2.setAttribute('id','spoiler');
	div2.style.position = "fixed";
    div2.style.width = "125px";
	div2.style.opacity= 0.90;
	div2.style.bottom = "+145px";
	div2.style.left = "+6px";
	div2.style.backgroundColor = "#00BFFF";
	div2.style.border = "1px solid #555";
	div2.style.padding = "2px";
	div2.innerHTML = "<img src='http://lockupmwm.webs.com/gambor/twitter.png' width='16' height='14' align='absmiddle'div style='background-color: #00BFFF; '><left><a style='color: #FF0000;' onclick='spoiler()' title='Click to Hidden Widget'>&laquo;</a> &#8226; <a href='http://twitter.com/DhelinaMaryani' style='color: #000000; 'target='_blank' onclick='alert(\'Thanks for install this script\');'>@DhelinaMaryani</a></div> "
	div3 = document.createElement("div");
	div3.setAttribute('id','spoiler');
	div3.style.position = "fixed";
    div3.style.width = "125px";
	div3.style.opacity= 0.90;
	div3.style.bottom = "+125px";
	div3.style.left = "+6px";
	div3.style.backgroundColor = "#BFEFFF";
	div3.style.border = "1px solid #555";
	div3.style.padding = "2px";
	div3.innerHTML = "<img src='http://www.facebook.com/images/icons/poke.gif' width='16' height='14' align='absmiddle'div style='background-color:	#87CEFF; '><left><a style='color: #FF0000;' onclick='spoiler()' title='Click to Hidden Widget'>&laquo;</a> &#8226; <a href='http://www.facebook.com/pokes' style='color: #000000; 'target='_blank' onclick='alert(\'Thanks for install this script\');'>Auto Pokes</a></div> "
	
	body.appendChild(div);
	body.appendChild(div2);
	body.appendChild(div3);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div2.innerHTML = "<a onclick='spoiler()' title='Click to Hidden Widget'>&laquo;</a> &#8226; <a href='https://twitter.com/DhelinaMaryani' title='Dhelina Maryani twitter'>twitter @DhelinaMaryani</a>"
		}
		else {
			x.style.display="none";
			div2.innerHTML = "<a onclick='spoiler()' title='Click to Show Widget'> Auto Like &raquo;</a>"
		}
	}
	};
}
// ==============
// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like1');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+62px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #FF0000";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://lockupmwm.webs.com/gambor/like.png' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='AutoLaik()'>Like All Status</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLaik = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "like")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Unlike Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like2');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+42px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#FFB6C1";
	div.style.border = "1px dashed #FF0000";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://lockupmwm.webs.com/gambor/dislike.png' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='AutoUnlike()'>Unlike All Status</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoUnlike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "unlike")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Comments==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like3');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+22px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #FF0000";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://lockupmwm.webs.com/gambor/like.png' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='AutoLaikComments()'>Like Comment</a>"
	
	body.appendChild(div);
	
	//buat fungsi tunda
	function tunda(milliSeconds){
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
}


	
	unsafeWindow.AutoLaikComments = function() {

	buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("title") == "Like this comment")
					buttons[i].click();
		}
		
		
		
	};
}
// ==============
// ==Unlike Comments==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like4');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+2px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#FFB6C1";
	div.style.border = "1px dashed #FF0000";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://lockupmwm.webs.com/gambor/dislike.png' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='AutoUnlikeComments();'>Unlike  Comment</a>"
	
	body.appendChild(div);
	//buat fungsi tunda
	function tunda(milliSeconds){
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
}
	
	unsafeWindow.AutoUnlikeComments = function() {
	

			buttons = document.getElementsByTagName("button");
			for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("title") == "Unlike this comment")
					buttons[i].click();
							}

	};
}


// ==============





// ==============
// ==Confirm Semua==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like8');
	div.style.position = "fixed";
	div.style.display = "block"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+2px";
	div.style.left = "+135px";
	div.style.backgroundColor = "#54FF9F";
	div.style.border = "1px dashed #FF0000";
	div.style.padding = "2px";
	div.innerHTML = "&#8226;&nbsp;<a onclick='AutoConfirm();' >All Confirm</a>&nbsp; &#8226;&nbsp;<a onclick='AutoDisable();' >Unconfirm All</a>"
	
	body.appendChild(div);
	//buat fungsi tunda
	function tunda(milliSeconds){
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
}
	
	unsafeWindow.AutoConfirm = function() {
		var x=document.getElementsByName("actions[accept]"); for (i=0;i<x.length;i++) { x[i].click();}
		};
	
	
	unsafeWindow.AutoDisable = function() {
			var x=document.getElementsByName("actions[hide]"); for (i=0;i<x.length;i++) { x[i].click();}
			};
}

// ==============
//add friends
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like1');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+82px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#FFB6C1";
	div.style.border = "1px dashed #FF0000";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://lockupmwm.webs.com/gambor/like.png' width='16' height='14' align='absmiddle' />&nbsp;&nbsp; <a href=\"JavaScript:AutoAddFriends()\">Add Friends</a>"
    //div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoAddFriends()\">Add Friends</a>"

    body.appendChild(div);

    unsafeWindow.AutoAddFriends = function() {

        buttons = document.getElementsByTagName("label");
        for(i = 0; i < buttons.length; i++) {
            myClass = buttons[i].getAttribute("class");
            if(myClass != null && myClass.indexOf("FriendRequestAdd") >= 0)
                    buttons[i].click();
        }

    };
}
//akhir add friend

// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like1');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+102px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #FF0000";
	div.style.padding = "2px";
	div.innerHTML = "<img src='http://lockupmwm.webs.com/gambor/like.png' width='16' height='14' align='absmiddle' />&nbsp;&nbsp; <a href=\"JavaScript:AutoExpand()\">Expand comment</a>"

    body.appendChild(div);

    unsafeWindow.AutoExpand = function() {

        buttons = document.getElementsByTagName("input");
        for(i = 0; i < buttons.length; i++) {
            myClass = buttons[i].getAttribute("class");
            if(myClass != null && myClass.indexOf("") >= 0)
                if(buttons[i].getAttribute("name") == "view_all[1]")
                    buttons[i].click();
        }

    };
}

// ====Autopoke=====

console.log("Facebook Autopoke Lightweight - Loading");
function fb_ap_lw(){
	if(typeof(Arbiter) == "undefined"){
		window.setTimeout(fb_ap_lw,100);
	}else{
		function p(){
			console.log("Facebook Autopoke Lightweight - Finding Pokes");
			var links = document.getElementsByClassName("pokesDashboard")[0].getElementsByClassName("uiIconText"), event;
			console.log(links);
			for(i in links){
				if(links.hasOwnProperty(i)){
					try{
						links[i].click();
					}catch(e){
						try{
							event = document.createEvent("MouseEvents");
							event.initMouseEvent("click",true,true,window,0,0,0,0,0,false,false,false,false,0,null);
							links[i].dispatchEvent(event);
						}catch(f){
							if(f.message != "Object 1 has no method 'dispatchEvent'"){
								console.error(e.message);
								console.error(f.message);
							}
						}
					}
				}
			}
		}
		Arbiter.subscribe("channel/message:live_poke",function(){
			//The big script actually does the AJAX itself. This script is designed to be lightweight. 
			window.setTimeout(p,500);
		});
		p();
		console.log("Facebook Autopoke Lightweight - Successful Load");
		window.setTimeout(function(){
			window.location.reload();
		}, 600000);
	}
}
function fb_ap_lw_dt(){
	if(typeof(DocumentTitle) == "undefined"){
		window.setTimeout(fb_ap_lw_dt,100);
	}else{
		DocumentTitle.set(DocumentTitle.get() + " (Automatic)");
	}
}
var s = document.createElement("script");
s.textContent = String(fb_ap_lw) + "\n" + String(fb_ap_lw_dt) + "\nfb_ap_lw();fb_ap_lw_dt();";
document.head.appendChild(s);
document.head.removeChild(s);