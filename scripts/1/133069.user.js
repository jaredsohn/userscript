// ==UserScript==
// @name           Skiller
// @namespace      Shane Graham, Corruptsource.ca
// @description    This tool helps users skill there accounts on http://www.outwar.com/
// @include        *corruptsource.ca/*Skiller.php*
// @include        *outwar.com/*
// ==/UserScript==

var Version = "1.0.0.7";

var Characters;
var Character;
var Crew;
var start = false;
var originalItems = new Array;
var curLocation = unsafeWindow.location.host.split(".")[1];
var challenge_key = "6LcZ-AAAAAAAANX-xwVtzow1f4RpSrbSViRUx9Js";
var recaptcha_server = "http://api.recaptcha.net/";
var demo = false;
var Skills = new Array;
var Equipment = new Array;
var EquipmentValue = new Array;
var recaptcha_challenge_field;
var recaptcha_response_field;
var toSkill = new Array;

if(curLocation == "outwar")
{
	GM_setValue("Outwar_Cookie", document.cookie);	
}

AddSkill("Empower",	"3","1");
AddSkill("Street Smarts","25","1");
AddSkill("Fortify","28","1");
AddSkill("Vitamin X","22","1");
AddSkill("on Guard","7","1");
AddSkill("Stealth","4","1");
AddSkill("Stone Skin","3007","2");
AddSkill("Bloodlust","5","2");
AddSkill("Circumspect","3008","2");
AddSkill("Masterful Looting","17","2");
AddSkill("Haste","3024","2");
AddSkill("Dark Strength","312","2");
AddSkill("Swiftness","87","2");
AddSkill("Protection","26","2");
AddSkill("Boost","9","2");
AddSkill("Accurate Strike","29","2");
AddSkill("Enchant Armor","3011","3");
AddSkill("Executioner","3025","3");
AddSkill("Elemental Power","3012","3");
AddSkill("Elemental Barrier","3006","3");
AddSkill("Blessing from Above","2","3");
AddSkill("Forcefield","3009","3");
AddSkill("Strength in Numbers","3015","3");
AddSkill("Last Stand","3010","3");
AddSkill("Markdown","3014","3");
AddSkill("Masterful Raiding","3013","3");
AddSkill("Vanish","3016","4");
AddSkill("Sunder Armor","21","4");
AddSkill("Circle of Protection","14","4");
AddSkill("Blind","10","4");
AddSkill("PoisonDart","16","4");
AddSkill("Ambush","8","4");
AddSkill("Killing Spree","35","4");
AddSkill("Uproar","33","4");
AddSkill("Hitman","36","4");
AddSkill("Tome of Shield Wall","46","5");

function AddSkill(name, id, type)
{
	var Skill;
	Skill = unsafeWindow.jQuery.parseJSON('{"name":"' + name + '","id":"' + id + '","type":"' + type + '"}');
	Skills.push(Skill);
}

function ScrollBottom(divid)
{
	var objDiv = document.getElementById(divid);
	objDiv.scrollTop = objDiv.scrollHeight;
}

function getOutwarCookie(c_name)
{
	var i,x,y,ARRcookies=Outwar_Cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name)
		{
			return unescape(y);
		}
	}
}

function uniqueArr(a) {
 temp = new Array();
 for(i=0;i<a.length;i++){
  if(!contains(temp, a[i])){
   temp.length+=1;
   temp[temp.length-1]=a[i];
  }
 }
 return temp;
}


function contains(a, e) {
 for(j=0;j<a.length;j++)if(a[j]==e)return true;
 return false;
}

function unescapeHTML(html) {
    return unsafeWindow.$("<div />").html(html).text();
}

function Log(str)
{
	var currentDate = new Date()

	unsafeWindow.$('#Log_Div').append("<div>[" + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds() + "] " + str + "</div>");
	ScrollBottom("Log_Div")
}

document.getElementById("Log_Div").addEventListener("click", function () {
	alert(unsafeWindow.$('#Log_Div').html());
}, false);


document.getElementById("Crew_Select").addEventListener("change", function () {
	unsafeWindow.$("#Character_Select").html("");
	Crew = document.getElementById("Crew_Select");	
	if(Crew.value != "")
	{
		
		unsafeWindow.$('#Character_Select').append("<option value=\"\">Please Select A Character</option>");
		for(var i in Characters)
		{
			if(unescapeHTML(Characters[i].crew) == Crew.value)
			{
				unsafeWindow.$('#Character_Select').append("<option value=\"" + i + "\">" + Characters[i].name + "</option>");
			}
		}			
	}
}, false);

document.getElementById("start_skilling").addEventListener("click", function () {
	if(start == false)
	{
		start = true;
		startSkilling();
		Log(test);
	}
}, false);

function startSkilling()
{
	for(var i in Skills)
	{
		var chkSkills = document.getElementById("chkSkill_" + Skills[i].id);
		if(chkSkills.checked == true)
		{
			toSkill.push(i);
		}
	}	
		
	castSkills(0);
}

function castSkills(i)
{
	
	var skillInfo = Skills[toSkill[i]];
	Log("Equiping items for " + skillInfo.name);
	equip(toSkill[i], 0, skillInfo, i);
}

function equip(numSkill, orb, skillInfo, index)
{
	var Equipments = Equipment;
	if(numSkill == -1) Equipments = originalItems;
	var nextOrb = orb + 1;	
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.outwar.com/profile.php?equipitem[]=" + Equipments[numSkill][0] + "&equipitem[]=" + Equipments[numSkill][1] + "&equipitem[]=" + Equipments[numSkill][2] + "&equipitem[]=" + Equipments[numSkill][3],
		headers: {
			"Accept": "text/xml"            // If not specified, browser defaults will be used.
		},
			onload: function(response) {
				var data = response.responseText;
				if(data.indexOf("Unable to obtain lock") > -1)
				{
					Log(Equipments[numSkill][orb]);
					equip(numSkill, orb, skillInfo, index);
				}
				else
				{
					castSkill(numSkill, skillInfo, index);
				}
			}
		}
	);
}

function removeEquip(numSkill, orb, skillInfo, index)
{

	remove(Equipment[numSkill][0], -2);
	remove(Equipment[numSkill][1], -2);
	remove(Equipment[numSkill][2], -2);
	remove(Equipment[numSkill][3], index);
	

}

function equipOriginal()
{
	Equipments = originalItems;
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.outwar.com/profile.php?equipitem[]=" + Equipments[0] + "&equipitem[]=" + Equipments[1] + "&equipitem[]=" + Equipments[2] + "&equipitem[]=" + Equipments[3],
		headers: {
			"Accept": "text/xml"            // If not specified, browser defaults will be used.
		},
			onload: function(response) {
				var data = response.responseText;
				if(data.indexOf("Unable to obtain lock") > -1)
				{
					equipOriginal();
				}
				else
				{
					Log("Finished Skilling");
					Equipment = new Array;
					EquipmentValue = new Array;
					start = false;
					originalItems = new Array;
					toSkill = new Array;
				}
			}
		}
	);
}

function castSkill(numSkill, skillInfo, index)
{
	Log("Casting " + skillInfo.name);
	
	var PostVars = "castskillid=" + skillInfo.id;
	//var PostVars;
	GM_xmlhttpRequest({
	method: "POST",
	url: "http://www.outwar.com/cast_skills.php",
	data: PostVars,
	headers: {
	"Content-Type":	"application/x-www-form-urlencoded",
	"Accept": "text/xml"            // If not specified, browser defaults will be used.
	},
	onload: function(response) {
		var data = response.responseText;
		removeEquip(numSkill, 0, skillInfo, index)
	}});
}

document.getElementById("Character_Select").addEventListener("change", function () {
	Character = document.getElementById("Character_Select").value;
	Equipment = new Array;
	EquipmentValue = new Array;
	start = false;
	originalItems = new Array;
	unsafeWindow.$("#Char_Table").html("<tbody width=\"100%\" ><tr style=\"background-color:#666;\" width=\"100%\"  ><th>&nbsp;</th><th style=\"width:20px;overflow:auto;\">Skill</th><th>Level</th><th width=\"10px\">Items</th><th width=\"10px\">&nbsp;</th></tr></tbody>");
	for(var i in Skills)
	{
		
		Equipment.push([0,0,0,0]);	
		EquipmentValue.push([0,0,0,0]);	
		unsafeWindow.$("#Char_Table tr:last").after("<tr id=\"Skill_" + Skills[i].id + "\" style=\"display:none;\"><td><input type=\"checkbox\" id=\"chkSkill_" + Skills[i].id + "\" \></td>" +
													"<td><div id=\"name_" + Skills[i].id + "\" style=\"width:115px;overflow:auto;color:#000;\">" + 
													Skills[i].name + "</div></td><td style=\"color:#000;\"><div id=\"level_" + Skills[i].id + "\"></div></td>" + 
													"<td style=\"color:#000;\"><div id=\"orb_" + Skills[i].id + "\"></div></td><td>" + 
													"<img src=\"\" id=\"status_" + Skills[i].id + "\" width=\"15px\" height=\"15px\" /></td></tr>");
	}	
	
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.outwar.com/world.php?suid=" + Characters[Character].suid,
		headers: {
			"Accept": "text/xml"            // If not specified, browser defaults will be used.
		},
			onload: function(response) {	
				loadEquipment(Characters[Character].suid);
			}
		}
	);	

}, false);

function checkCaptcha()
{
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.outwar.com/cast_skills.php",
		headers: {
		"Accept": "text/xml"            // If not specified, browser defaults will be used.
		},
		onload: function(response) {
			var data = response.responseText;
			if(data.indexOf("This is here to prevent automated programs. Thanks!") > -1) 
			{
				Log("Please fill out the captcha");
				GM_xmlhttpRequest({
					method: "GET",
					url: recaptcha_server + "challenge?k=" + challenge_key,
					headers: {
					"Accept": "text/xml"            // If not specified, browser defaults will be used.
					},
					onload: function(response) {
						var captchaData = response.responseText;
						pattern = /challenge\s:\s'(.*?)',/g;
						matches = captchaData.match(pattern);
						recaptcha_challenge_field =  matches[0].replace("challenge : '","").replace("',","");
						
						GM_xmlhttpRequest({
						method: "GET",
						url: recaptcha_server + "image?c=" + recaptcha_challenge_field,
						headers: {
						"User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
						"referer": "http://www.outwar.com/",
						"Accept": "image/jpeg" 
						},
						onload: function(response) {		
							var Captcha_Image = document.getElementById("captcha_image");
							var Responce = document.getElementById("recaptcha_response_field");
							Responce.value = "";
							Captcha_Image.data = recaptcha_server + "image?c=" + recaptcha_challenge_field;										
						}});
					}
				});					
			}
			else
			{
				Log("Captcha already filled out");
			}			
		}
	});	
}

function loadEquipment(Character_id)
{
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.outwar.com/equipment.php?suid=" + Character_id,
		headers: {
			"Accept": "text/xml"            // If not specified, browser defaults will be used.
		},
		onload: function(response) {
			
			var data = response.responseText;
			pattern = /removeItem\('(.*?)slot8/ig;
			matches = data.match(pattern);
			for( var i in matches )
			{
				match = matches[i].replace("removeItem('", '');
				match = match.split("',")[0];
				originalItems.push(match);
				remove(match);
				getOrb(match);
			}
			pattern = /removeItem\('(.*?)slot9/ig;
			matches = data.match(pattern);
			for( var i in matches )
			{
				match = matches[i].replace("removeItem('", '');
				match = match.split("',")[0];
				originalItems.push(match);
				getPants(match);				
			}
			getRegular(Character);
			loadBackpack(Character);			
			getSkills();
			checkCaptcha();
		}			
	});
}


function remove(item_id, index)
{
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.outwar.com/profile.php?removeitem=" + item_id,
		headers: {
			"Accept": "text/xml"            // If not specified, browser defaults will be used.
		},
		onload: function(response) {
			var data = response.responseText;
			
			if(index == -2) return false;			
			
			if(index >= (toSkill.length - 1))
			{							
				Log("Equiping Original Items");
				equipOriginal();
				return true;
			}
			
			castSkills(index + 1);
			
		}
	});
}

function loadBackpack(Character_id)
{
	//.outwar.com/backpack.php?orb=1&id=
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.outwar.com/backpack.php?orb=1&suid=" + Characters[Character].suid,
		headers: {
			"Accept": "text/xml"            // If not specified, browser defaults will be used.
		},
			onload: function(response) {
				var data = response.responseText;
				pattern = /itempopup\(event,'(.*?)'\)/ig;
				matches = data.match(pattern);
				for( var i in matches )
				{
					match = matches[i].replace(/[^0-9]/g, '');
					getOrb(match);
				}
			}
		}
	);
}

function getRegular(Character_id)
{
	//.outwar.com/backpack.php?orb=1&id=
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.outwar.com/backpack.php?suid=" + Characters[Character].suid,
		headers: {
			"Accept": "text/xml"            // If not specified, browser defaults will be used.
		},
			onload: function(response) {
				var data = response.responseText;
				pattern = /itempopup\(event,'(.*?)'\)/ig;
				matches = data.match(pattern);
				for( var i in matches )
				{
					match = matches[i].replace(/[^0-9]/g, '');
					getPants(match);
				}
			}
		}
	);
}

function getSkills()
{
	for(var i in Skills)
	{
		getSkillInfo(i);
	}
}

function getSkillInfo(i)
{
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.outwar.com/skills_info.php?id=" + Skills[i].id,
		headers: {
			"Accept": "text/xml"            // If not specified, browser defaults will be used.
		},
			onload: function(response) {
				var data = response.responseText;
				if(data.indexOf("You have not learned this skill yet") != -1)
				{
					//Log(Skills[i].name + ' Has Not Been Trained');
				}
				else
				{
					unsafeWindow.$("#Skill_" + Skills[i].id).show();
					pattern = /Level(.*?)</ig;
					matches = data.match(pattern);
					match = matches[0].replace(/[^0-9]/g, '');
					unsafeWindow.$("#level_" + Skills[i].id).html(match);
				}
			}
		}
	);	
}

function getOrb(item_id)
{
	
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.outwar.com/item_rollover.php?id=" + item_id,
		headers: {
			"Accept": "text/xml"            // If not specified, browser defaults will be used.
		},
			onload: function(response) {
				var data = response.responseText;
				for(var i in Skills)
				{
					pattern = new RegExp('\\+[0-9]\\s' + Skills[i].name, 'i');
					matches = data.match(pattern);
					if(matches != null)
					{
						var orb = unsafeWindow.jQuery.parseJSON('{"id":"' + item_id + '","type":"' + Skills[i].name + '","value":"' + matches[0].substr(1,1) + '"}');
						
						for(j = 1;j <= 3; j++)
						{							
							if(Equipment[i][j] == 0 || EquipmentValue[i][j] < parseInt(orb.value))
							{
								
								Equipment[i][j] = orb.id;
								EquipmentValue[i][j] = parseInt(orb.value);
								j = 4;
							}
						}
						var current = EquipmentValue[i][0] + EquipmentValue[i][1] + EquipmentValue[i][2] + EquipmentValue[i][3];
						unsafeWindow.$("#orb_" + Skills[i].id).html(current)						
					}
				}
			}
		}
	);
}

function getPants(item_id)
{
	
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.outwar.com/item_rollover.php?id=" + item_id,
		headers: {
			"Accept": "text/xml"            // If not specified, browser defaults will be used.
		},
			onload: function(response) {
				var data = response.responseText;
				for(var i in Skills)
				{
					pattern = new RegExp('\\+[0-9]\\s' + Skills[i].name, 'i');
					matches = data.match(pattern);
					
					if(matches != null)
					{
						var pant = unsafeWindow.jQuery.parseJSON('{"id":"' + item_id + '","type":"' + Skills[i].name + '","value":"' + matches[0].substr(1,1) + '"}');
													
						if(EquipmentValue[i][0] < parseInt(pant.value))
						{
							Equipment[i][0] = pant.id;
							EquipmentValue[i][0] = parseInt(pant.value);
						}
					}
					var current = EquipmentValue[i][0] + EquipmentValue[i][1] + EquipmentValue[i][2] + EquipmentValue[i][3];
					unsafeWindow.$("#orb_" + Skills[i].id).html(current)
				}
			}
		}
	);
}

function KeyCheck(e)
{
	if(e.keyCode == 13)
	{
		
		recaptcha_response_field = this.value;
		submitCaptcha();
	}
}
document.getElementById("recaptcha_response_field").addEventListener('keydown', KeyCheck, true);

function submitCaptcha()
{
	var postVars = "recaptcha_challenge_field=" + recaptcha_challenge_field + "&recaptcha_response_field=" + recaptcha_response_field + "&submitBtn=Submit"
	GM_xmlhttpRequest({
	method: "POST",
	url: "http://www.outwar.com/cast_skills.php",
	data: postVars,
	headers: {
	"Content-Type":	"application/x-www-form-urlencoded",
	"referer": "http://www.outwar.com/"
	},
	onload: function(response) {	
		var data = response.responseText;	
		if(data.indexOf("This is here to prevent automated programs. Thanks!") == -1)
		{
			Log("Captcha Submitted you can now skill");	
			var Captcha_Image = document.getElementById("captcha_image");
			var Responce = document.getElementById("recaptcha_response_field");
			Responce.value = "";
			Captcha_Image.data = "";			
		}
		else
		{
			Log("Invalid captcha.");
			checkCaptcha();	
		}
	}});
}


document.getElementById("Start_Skilling").addEventListener("click", function () {
var className = unsafeWindow.$('#Start_Skilling').attr('class');
if(className == "tab")
{
	document.getElementById("Start_Skilling").setAttribute("class", "tab_selected");
	document.getElementById("Submit_Captcha").setAttribute("class", "tab");
	unsafeWindow.$("#tab_Start").show();
	unsafeWindow.$("#tab_Captcha").hide();
}

	
}, false);

document.getElementById("Submit_Captcha").addEventListener("click", function () {
	var className = unsafeWindow.$('#Submit_Captcha').attr('class');
	if(className == "tab")
	{
		document.getElementById("Submit_Captcha").setAttribute("class", "tab_selected");
		document.getElementById("Start_Skilling").setAttribute("class", "tab");
		unsafeWindow.$("#tab_Captcha").show();
		unsafeWindow.$("#tab_Start").hide();
	}
	
}, false);




function splitAccounts(strHTML)
{

	Log("Getting account information...");
	var data = new Array;
	var parcedData = new Array;
	var crews = new Array;
	parcedData = strHTML.split('<font color="#FFFF00" face="Verdana, Arial, Helvetica, sans-serif" size="1">');

	for(var i  = 1; i < parcedData.length; i++)
	{
		
		pattern = /<b>(.*?)<\/b>/g;
		matches = parcedData[i].match(pattern);
		var name = matches[0].replace("<b>", "");
		var level = matches[1].replace("<b>", "");
		var crew = matches[2].replace("<b>", "");
		name = name.replace("</b>", "");
		level = level.replace("</b>", "");
		crew = crew.replace("</b>", "");
		pattern = /suid=(.*?)&serverid/;
		matches = parcedData[i].match(pattern);
		var suid = matches[0].replace("suid=", "");
		suid = suid.replace("&serverid", "");
		
		if(crew != "")
		{
			crews.push(crew);
		} else 
		{
			crews.push("No Crew");
			crew = "No Crew";
		}
		

		var jsonData = unsafeWindow.jQuery.parseJSON('{ "name": "' + name + '", "level": "' + level + '", "crew": "' + crew + '", "suid": "' + suid + '" }');
				
		data.push(jsonData);
		
	}

	crews = uniqueArr(crews);
	
	for( var i in crews ) unsafeWindow.$('#Crew_Select').append("<option value=\"" + crews[i] + "\">" + crews[i] + "</option>");
	
	
	
	return data;

}

function setAccounts()
{

	GM_xmlhttpRequest({
	method: "GET",
	url: "http://www.outwar.com/accounts.php?ac_serverid=" + getOutwarCookie("ow_serverid"),
	headers: {
	"Accept": "text/xml"            // If not specified, browser defaults will be used.
	},
		onload: function(response) {
			
			var data = response.responseText;

			Characters = splitAccounts(data);
			
			Log("Finished getting account information...<br><p style=\"color:red;\"><b>Please select a crew from option box.</b></p>");	
			
		}
	});	
}

function refreshStats() 
{
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.outwar.com/userstats.php",
		headers: {
		"User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
		"Accept": "text/xml"            // If not specified, browser defaults will be used.
		},
		onload: function(response) {

			if(response.responseText.indexOf("You must be logged in to use this page") != -1)
			{
				unsafeWindow.$('#error_login').show()
				unsafeWindow.$('#semi-arj_content').hide();
				return;
			}
			else{
				unsafeWindow.$('#semi-arj_content').show();
			}
		}
	});
}

function checkVersion()
{

	var curVersion = unsafeWindow.$('#version').html();
	if(Version != curVersion)
	{
		unsafeWindow.$('#semi_version').show();
	}	
}

if(curLocation != "outwar")
{
	var Outwar_Cookie = GM_getValue("Outwar_Cookie");

	unsafeWindow.onload = function(){

		setAccounts();
		unsafeWindow.$('#skiller_content').show();
		unsafeWindow.$('.error').hide()
		refreshStats();
		checkVersion();

	}
}
