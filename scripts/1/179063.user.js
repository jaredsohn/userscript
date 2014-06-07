// ==UserScript==
// @name    Web Stagram - Auto Liker
// @namespace    http://bit.ly/14VCzbr
// @description Auto Liker
// @include    http://web.stagram.com/*
// @version 1.0
// @author  Joshiii98
// @copyright	2013+ , Joshiii98
// ==/UserScript==

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','profile');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+65px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a href='http://web.stagram.com/n/joshiii98/'>My Web Stagram</a>";
	body.appendChild(div);
}

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','likeall');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+42px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='https://lh4.googleusercontent.com/-D1HYuLwPnNQ/TxPK6cm_THI/AAAAAAAAAIE/ynATGaxGbv0/s16/Facebook%252520Like%252520Small.jpg' width='14' height='13' align='absmiddle' />&nbsp;&nbsp;<a onclick='LikeAll()'>Click to like all!</a>"	
	body.appendChild(div);

unsafeWindow.LikeAll = function() {
    document.getElementById('likeall').innerHTML = "<img src='http://www.onlinewelten.com/img/global/icons/dislike.png' width='14' height='13'/>&nbsp;<a onclick='DisLikeAll()'>Click to Dislike all!</a>";
    document.getElementsByClassName("like_button")[0].click();
    document.getElementsByClassName("like_button")[1].click();
    document.getElementsByClassName("like_button")[2].click();
    document.getElementsByClassName("like_button")[3].click();
    document.getElementsByClassName("like_button")[4].click();
    document.getElementsByClassName("like_button")[5].click();
    document.getElementsByClassName("like_button")[6].click();
    document.getElementsByClassName("like_button")[7].click();
    document.getElementsByClassName("like_button")[8].click();
    document.getElementsByClassName("like_button")[9].click();
    document.getElementsByClassName("like_button")[10].click();
    document.getElementsByClassName("like_button")[11].click();
    document.getElementsByClassName("like_button")[12].click();
    document.getElementsByClassName("like_button")[13].click();
    document.getElementsByClassName("like_button")[14].click();
    document.getElementsByClassName("like_button")[15].click();
    document.getElementsByClassName("like_button")[16].click();
    document.getElementsByClassName("like_button")[17].click();
    document.getElementsByClassName("like_button")[18].click();
    document.getElementsByClassName("like_button")[19].click();
    document.getElementsByClassName("like_button")[20].click();
    };
    unsafeWindow.DisLikeAll = function() {
    document.getElementById('likeall').innerHTML = "<img src='https://lh4.googleusercontent.com/-D1HYuLwPnNQ/TxPK6cm_THI/AAAAAAAAAIE/ynATGaxGbv0/s16/Facebook%252520Like%252520Small.jpg' width='14' height='13'/>&nbsp;<a onclick='LikeAll()'>Click to like all!</a>";
    document.getElementsByClassName("dislike_button")[0].click();
    document.getElementsByClassName("dislike_button")[1].click();
    document.getElementsByClassName("dislike_button")[2].click();
    document.getElementsByClassName("dislike_button")[3].click();
    document.getElementsByClassName("dislike_button")[4].click();
    document.getElementsByClassName("dislike_button")[5].click();
    document.getElementsByClassName("dislike_button")[6].click();
    document.getElementsByClassName("dislike_button")[7].click();
    document.getElementsByClassName("dislike_button")[8].click();
    document.getElementsByClassName("dislike_button")[9].click();
    document.getElementsByClassName("dislike_button")[10].click();
    document.getElementsByClassName("dislike_button")[11].click();
    document.getElementsByClassName("dislike_button")[12].click();
    document.getElementsByClassName("dislike_button")[13].click();
    document.getElementsByClassName("dislike_button")[14].click();
    document.getElementsByClassName("dislike_button")[15].click();
    document.getElementsByClassName("dislike_button")[16].click();
    document.getElementsByClassName("dislike_button")[17].click();
    document.getElementsByClassName("dislike_button")[18].click();
    document.getElementsByClassName("dislike_button")[19].click();
    document.getElementsByClassName("dislike_button")[20].click();
    };
}
    
    body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','Follow');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+18px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "+ &nbsp;&nbsp;<a onclick='followone()'>Click to Follow!</a>"	
	body.appendChild(div);
	
	unsafeWindow.followone = function() {
    document.getElementsByClassName("follow_button")[0].click();
    document.getElementById('Follow').innerHTML = "- &nbsp;<a onclick='unfollowone()'>Click to Unfollow!</a>";
	};
	unsafeWindow.unfollowone = function() {
    document.getElementsByClassName("unfollow_button")[0].click();
    document.getElementById('Follow').innerHTML = "+ &nbsp;&nbsp;<a onclick='followone()'>Click to Follow!</a>";
	};
}