// ==UserScript==
// @name           Flames NHL All-stars Voter
// @namespace      nhl
//@description	This script votes for all Calgary Flames players.
// @include        http://ca.fanballoting.nhl.com/vote
// ==/UserScript==

/*
var players = Array('8462042','8462036','8459444','8470602','8467344','8462147');
for (var i = 1; i < 7; i++)
{
	var id = "player_"+str(i);
	alert(id);
	document.getElementById(id).value = players[i-1];
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
var post = "player_1=8462042&player_2=8462036&player_3=8459444&player_4=8470602&player_5=8467344&player_6=8462147&player_7=&player_8=&player_9=&player_10=&player_11=&player_12=";
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
