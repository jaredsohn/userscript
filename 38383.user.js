// ==UserScript==
// @name NHL All-stars Voter
// @namespace nhl
//@description This script votes for all Pens players players.
// @include http://ca.fanballoting.nhl.com/vote
// ==/UserScript==

/*
var players = Array('8459442','8458529','8467338','8469460','8467496','8471679');
for (var i = 7; i < 13; i++)
{
var id = "player_"+str(i);
alert(id);
document.getElementById(id).value = players[i-7];
}
*/
function GetXmlHttpObject()
{
var xmlHttp=null;
try
{
// Firefox, Opera 8.0+, Safari
xmlHttp=new XMLHttpRequest();
}
catch (e)
{
// Internet Explorer
try
{
xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
}
catch (e)
{
xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
}
}
return xmlHttp;
}

function vote2(p)
{

xmlHttp=GetXmlHttpObject();
if (xmlHttp==null)
{
alert ("Your browser does not support AJAX!");
return;
}

xmlHttp.onreadystatechange=function()
{
if(xmlHttp.readyState==4)
{
location.reload(true);
}
}
xmlHttp.open("POST","vote",true);
xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
xmlHttp.send(p);

}
try{
var post = "player_1=&player_2=&player_3=&player_4=&player_5=&player_6=&player_7=8459442&player_8=8458529&player_9=8467338&player_10=8469460&player_11=8467496&player_12=8471679";
var build = document.getElementsByName('form_build_id')[0].value;
var token = document.getElementsByName('form_token')[0].value;
var form = document.getElementsByName('form_id')[0].value;
var x = Math.round(Math.random()*270);
var y = Math.round(Math.random()*34);

var rest = "&vote_button.x="+x+"&vote_button.y="+y;
rest += "&form_build_id="+build;
rest += "&form_token="+token;
rest += "&form_id="+form;

post += rest;

vote2(post);
}
catch(e)
{
location.reload(true);
}