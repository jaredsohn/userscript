// ==UserScript==
// @name           Hobowars Hospital Script
// @namespace      Hobowars Hospital Script
// @description    Hobowars Hospital Script
// @include        http://www.hobowars.com/game/*
// @include        http://www.hobowars2.com/game/*
// ==/UserScript==

var macroCheck = false;
var img_Array = document.getElementsByTagName('img');

for(var image = 0; image < img_Array.length; image++)
{
	if(img_Array[image].src.indexOf("captcha") != -1)
	{
		macroCheck = true
	}
}



if(macroCheck)
{
	return;
}

var gangHealTimer = (1*1000) + Math.round(Math.random()*(1*1000));
var notDeadTimer = (1*1000) + Math.round(Math.random()*(1*1000));

var s_href = document.location.href;
var cmd_str = s_href.substring(s_href.indexOf("?")+1);
var cmd = cmd_str.split("&");
var args = {};

for(k in cmd){

	var pair = cmd[k].split("=");
	args[pair[0]]=pair[1];
}

var a_Array = document.getElementsByTagName('a');
var a_num = a_Array.length;

var whiteBox = document.getElementById("whitebox");

if(args["cmd"] == "hospital")
{
	
	var heal_str = "@ Hospital";

	var heal_link = null;
	var heal_RegExp;
	var hospital_link;

	var hospital_RegExp = /Hospital/;
	var heal_RegExp = /Let my gang cover part of the cost/;

	for(var j = a_num-1; j > 0; j--)
	{
		var hospital_found = a_Array[j].text.search(hospital_RegExp);
		var heal_found = a_Array[j].text.search(heal_RegExp);
			
			
		if(hospital_found != -1)
		{
			hospital_link = a_Array[j].href;
		
			heal_str += ("\n" + "hospital_link : " + hospital_link);
		}

		if(heal_found != -1)
		{
			heal_link = a_Array[j].href;

			heal_str += ("\n" + "heal_link : " + heal_link);
		}
	}
	
	if(heal_link == null)
	{
		heal_str += ("\n" + "heal_link == null");

		heal_link = hospital_link;		
		
		heal_str += ("\n" + "setTimeout(gangHeal,notDeadTimer : " + notDeadTimer + ")")

		setTimeout(gangHeal , notDeadTimer);
	}
	else
	{
		heal_str += ("\n" + "setTimeout(gangHeal,gangHealTimer : " + gangHealTimer + ")")
		setTimeout(gangHeal , gangHealTimer);
	}
	
	//alert(heal_str);
}

function gangHeal()
{
	document.location = heal_link;
}