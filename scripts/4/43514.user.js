// LeproUserInfo user script
// version 1.3
// Copyright (c) 2008-2009, mcm69, tender
// ReDesign by tender
// Released under the GPL license
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Inline UserInfo Ex
// @namespace     http://leprosorium.ru/*
// @description   show user info.
// @include       http://*.leprosorium.ru/*
// @include       http://leprosorium.ru/*
// ==/UserScript==

// all patch by //tender

var div_obj = null;
var c_link = null;
var hid = 0;
var tid = 0;

function mouseOver(e) {
  e = e || window.event

  if (e.pageX == null && e.clientX != null ) { 
    var html = document.documentElement
    var body = document.body

    e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0)
    e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0)
  }
 
  //
   div_obj.style.left = e.pageX  + 'px';
   div_obj.style.top = e.pageY + 'px';

//	alert("Балет!");

   clearInterval(hid);
   tid = setInterval(hoverInfo, 1500);

   c_link = this;
 
}

function mouseOut(e) {
 clearInterval(tid);
 hid = setInterval(hideDiv, 500);
}

//..........................................
function hoverDiv() {
 clearInterval(hid);
}

function hideDiv(e) {
 var t = e.relatedTarget;
 if(t && (t.id == "inline_userlink" || t.id == "hoverinfo" || t.id == "user_pic" || t.id == "user_pic_link" ||t.id == "user_post"||t.id == "user_comm")) {
  return;
 } 
 div_html="";
 div_obj.style.display="none";
 clearInterval(hid);
}

var div_html = "";

function parse_APIUserInfo(usernum, user, response){
 var eblozor = "http://faces.leprosorium.com/image.php?cat=&image=";
 var eblozor_full = "http://faces.leprosorium.com/full.php?cat=&img=";
 var s0 = '<a id=\"user_pic_link\" href=\"'+eblozor_full+user+'.jpg'+'\" target=\"_new\"> <img id=\"user_pic\" src=\"'+eblozor+user+'.jpg\" alt=\"Это я в боулинге!"> <\/a>'+'<br/>';
 div_html +=s0;
 
 div_html +="С нами с "+response.regdate+"<br> По приглашению <a id=user_post target=\"_new\" href=\"http://leprosorium.ru/users/"+response.invited_by+"\">"+response.invited_by+"</a><br><br>"

 var link_comm = "http://leprosorium.ru/users/"+user+"/comments/";
 var link_post = "http://leprosorium.ru/users/"+user+"/posts/";
 div_html +='Написав <a id=user_post target=\"_new\" href=\"'+link_post+'\">'+response.posts+'</a> постов и <a id=user_comm target=\"_new\" href=\"'+link_comm+'\">'+response.comments+'</a> комментариев<br>';
 div_html +="Он имеет карму "+response.karma+" и рейтинг "+response.rating+"<br>";
 div_html +="Вес голоса "+response.voteweight+"<br><br>";
 
 div_html +="Ваше отношение: "+response.karmavote+"<br>";
 div_html +="Его отношение к Вам: "+response.hiskarmavote+"<br>";
    
 div_obj.style.background = "#fff";
 div_obj.innerHTML = div_html;
 
 clearInterval(tid);
}

function get_LepraAPI_UserInfo(usernum, user){
 var xmlhttp = new XMLHttpRequest();
 xmlhttp.open("GET", "http://leprosorium.ru/api/lepropanel/"+usernum, true);
 xmlhttp.onreadystatechange = function() {
  var ready = false;
  try {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    	ready = true;
    }
  } catch (e) {
  }
  if (ready) {
    var response = eval("(" + xmlhttp.responseText + ")");
    parse_APIUserInfo(usernum, user, response);
    return;
  }
 }
 
 xmlhttp.send(null);
 return; 
}

function parse_BaseInfo(html, user){
 var m;

 //реальное имя, город
 m = html.match(/<div class=\"userbasicinfo\">\s*<h3>(.+)\s*<\/h3>\s*<div class=\"userego\">\s*(.+)\s*<\/div>/);

 var extinfo = "";
 if (m) {
   if (m[1])
   extinfo+=m[1];
   extinfo+="&nbsp;";
   if (m[2])
    extinfo+=m[2];
 }

 // лепрономер
 var uid = 0;
 m = html.match(/<div class=\"vote\"\s*uid=\"(.+)\">/);
 if (m) {
  uid = m[1];
 }

 // жопка для юзера
 var ugopka = "Жопок нет";
 m = html.match(/<div class=\"usernote_inner\"\s*id=\"js-usernote_inner\">(.+)<\/div>/);
 if (m)
 {
  ugopka = m[1];
  ugopka +="<br/>";
 }

 div_html += "<strong><a id=\"inline_userlink\" href=\"http://leprosorium.ru/users/"+user+"\" target=\"_new\">"+user+"</a></strong> #"+uid+ "<br/>";
 div_html += "["+extinfo+"]"+"<br>";
 div_html +="[X] "+ugopka;
 
 return uid; 
}

function get_UserInfo(user){
 div_html="";

 var xmlhttp = new XMLHttpRequest();
 xmlhttp.open("GET", "http://leprosorium.ru/users/"+user, true);
 xmlhttp.onreadystatechange = function() {
  var ready = false;
  try {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    	ready = true;
    }
  } catch (e) {
  }
  if (ready) {
     var response = xmlhttp.responseText;

     var uid = parse_BaseInfo(response, user);

     get_LepraAPI_UserInfo(uid, user);
     return;
  }
 }

 xmlhttp.send(null);
}

function hoverInfo() {
 var login = c_link.getAttribute("usernum");
 div_html="";
 div_obj.innerHTML = "...";
 div_obj.style.display= "block";
 div_obj.style.background = "#fff url(http://www.picamatic.com/show/2008/10/14/02/54/1181194_16x16.gif) center center no-repeat";

 // получим всю нужную информацию из профайла....
 get_UserInfo(login);
}

//..........................................
function onLoad(){
 // create a hidden div
 div_obj = document.createElement("div");
 div_obj.id = "hoverinfo";
 div_obj.style.display="none";
 div_obj.style.position="absolute";
 div_obj.style.border="1px dotted #aaa";
 div_obj.style.minWidth="200px";
 div_obj.style.minHeight="100px";
 div_obj.style.zIndex="99";
 div_obj.style.color="#999";
 div_obj.style.fontSize="10px";
 div_obj.style.padding="10px";
 div_obj.style.whiteSpace="nowrap";
 div_obj.addEventListener("mouseover", hoverDiv, false);
 div_obj.addEventListener("mouseout", hideDiv, false);
 div_obj.style.background = "#fff url(http://www.picamatic.com/show/2008/10/14/02/54/1181194_16x16.gif) center center no-repeat";
 document.body.appendChild(div_obj);

  for (i=0;i<document.links.length;i++){
   var a=document.links[i].getAttribute("href")
   var u = a.match(/\/users\/(.+)/); //
   if (u){
	  var l = document.links[i];
	  l.setAttribute("usernum", u[1]);
          l.addEventListener('mouseover', mouseOver, false);
          l.addEventListener('mouseout', mouseOut, false);
   }
  }

}

(function() {
   window.addEventListener("load", function(e) {
     onLoad();
   }, false);
})();
