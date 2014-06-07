// ==UserScript==
// @name           AllyAgora
// @namespace      Alliance Agora
// @description    Add Alliances Agora to informations.
// @include        http://s*.ikariam.*/index.php*
// ==/UserScript==

var url = location.href;
var parse = url.split('=');
var view = parse[1];
var pageNumber1 = parse[2];
var pageNumber = parseInt(pageNumber1);
var goOptions = parse[0]+"=options&goBack";
var goAgora = parse[0]+"=informations&allyagora=1";
var parse2 = url.split('.');
var server = parse2[0].replace("http://","");
var country = parse2[1];

var value_name = server+"_"+country+"_name";
var value_id = server+"_"+country+"_id";
var value_pass = server+"_"+country+"_pass";
var value_location = server+"_"+country+"_location";

var player_id = GM_getValue(value_id);

var player_name = GM_getValue(value_name);

var msg_url = 'http://'+server+'.'+country+'.ikariam.com/index.php?view=sendIKMessage&receiverId';
var options_url = 'http://'+server+'.'+country+'.ikariam.com/index.php?view=informations&allyagora&options';


if (view == "informations&allyagora") { viewAgora(); }
if (view == "informations&allyagora&editpost") { viewEditing(); }
if (view == "informations&allyagora&options") { viewOptions(); }
if (view == "informations&allyagora&newMessage") { viewPosting(); }
if (view == "options&goBack") { getPlayerDetails(); location.href=goAgora; }
if (view == "options") { getPlayerDetails(); }

function getPlayerDetails()
{
var nameValueArray = document.getElementsByName("name");
var nameValue = nameValueArray[0].value;
GM_setValue(value_name,nameValue);
var idValueArray = document.getElementById("options_debug").innerHTML;
var parseId = idValueArray.split("td");
var playerId = parseId[1].replace("> ","").replace("</","");
GM_setValue(value_id,playerId);
}

function viewPosting()
{
if (country != "fi")
	{
	document.getElementById("breadcrumbs").innerHTML='<h3>Olet tässä:</h3><span class="textLabel">AllyAgora - Write message</span>';
	}
if (country == "fi")
	{
	document.getElementById("breadcrumbs").innerHTML='<h3>Olet tässä:</h3><span class="textLabel">AllyAgora - Kirjoita viesti</span>';
	}
var php_location = GM_getValue(value_location);
var password = GM_getValue(value_pass);

if (player_name == undefined) { alert("NO PLAYER DATA. Redirecting to options..."); location.href=goOptions; }
if (php_location == undefined) { location.href=options_url; }
if (password == undefined) { location.href=options_url; }

var agoraHTML = '';

if (country == "fi")
	{
	agoraHTML += '<div class="contentBoxMessage"><br><br><br><div id="notice"><form id="newMessage" method="post" action="'+php_location+'input.php"><div class="postMessage"><input type="hidden" name="dbwriter" value="'+player_name+'" /><input type="hidden" name="dbplid" value="'+player_id+'" /><input type="hidden" name="dbmsgurl" value="'+msg_url+'" /><input type="hidden" name="urli" value="'+goAgora+'" /><input type="hidden" name="pass" value="'+password+'" /><label for="subject">Aihe</label><br/><div class="inputDiv"><input class="textfield" id="subject" type="text" name="dbtopic" value="" maxlength="50" /></div><label for="message">Viesti</label><br/><div class="inputDiv"><textarea name="dbmessage" id="message"></textarea></div><br/><div class="inputDiv"><input class="button" type="submit" value="Lähetä viesti" /> <input class="button" id="cancel" type="button" value="Takaisin" /></div></div><div class="footer"></div></form></div></div>';
	}
if (country != "fi")
	{
	agoraHTML += '<div class="contentBoxMessage"><br><br><br><div id="notice"><form id="newMessage" method="post" action="'+php_location+'input.php"><div class="postMessage"><input type="hidden" name="dbwriter" value="'+player_name+'" /><input type="hidden" name="dbplid" value="'+player_id+'" /><input type="hidden" name="dbmsgurl" value="'+msg_url+'" /><input type="hidden" name="urli" value="'+goAgora+'" /><input type="hidden" name="pass" value="'+password+'" /><label for="subject">Aihe</label><br/><div class="inputDiv"><input class="textfield" id="subject" type="text" name="dbtopic" value="" maxlength="50" /></div><label for="message">Viesti</label><br/><div class="inputDiv"><textarea name="dbmessage" id="message"></textarea></div><br/><div class="inputDiv"><input class="button" type="submit" value="Send message" /> <input class="button" id="cancel" type="button" value="Back" /></div></div><div class="footer"></div></form></div></div>';
	}
	
document.getElementById("mainview").innerHTML=agoraHTML;

if (country == "fi")
	{
	document.getElementById("backTo").innerHTML='<h3 class="header">AllyAgora</h3><div class="content"><a href="?view=informations&allyagora=1" title="Takaisin AllyAgoraan"><span class="textLabel">Takaisin AllyAgoraan</span></a></div><div class="footer"></div>';
	}
	
if (country != "fi")
	{
	document.getElementById("backTo").innerHTML='<h3 class="header">AllyAgora</h3><div class="content"><a href="?view=informations&allyagora=1" title="Back to AllyAgora"><span class="textLabel">Back to AllyAgora</span></a></div><div class="footer"></div>';
	}
}

function viewEditing()
{
if (country != "fi")
	{
	document.getElementById("breadcrumbs").innerHTML='<h3>Olet tässä:</h3><span class="textLabel">AllyAgora - Edit message</span>';
	}
if (country == "fi")
	{
	document.getElementById("breadcrumbs").innerHTML='<h3>Olet tässä:</h3><span class="textLabel">AllyAgora - Muokkaa viestiä</span>';
	}
var php_location = GM_getValue(value_location);
var password = GM_getValue(value_pass);

var agoraHTML = '';

if (country == "fi")
	{
	agoraHTML += '<div class="contentBoxMessage"><br><br><br><div id="notice"><form id="newMessage" method="post" action="'+php_location+'edit.php"><div class="postMessage"><input type="hidden" name="type" value="edit" /><input type="hidden" name="id" value="'+pageNumber+'" /><input type="hidden" name="urli" value="'+goAgora+'" /><input type="hidden" name="pass" value="'+password+'" /><label for="subject">Aihe</label><br/><div class="inputDiv"><input class="textfield" id="topic" type="text" name="edittopic" value="" maxlength="50" /></div><label for="message">Viesti</label><br/><div class="inputDiv"><textarea name="editmessage" id="message"></textarea></div><br/><div class="inputDiv"><input class="button" type="submit" value="Lähetä viesti" /> <input class="button" id="cancel" type="button" value="Takaisin" /></div></div><div class="footer"></div></form></div></div>';
	}
if (country != "fi")
	{
	agoraHTML += '<div class="contentBoxMessage"><br><br><br><div id="notice"><form id="newMessage" method="post" action="'+php_location+'edit.php"><div class="postMessage"><input type="hidden" name="type" value="edit" /><input type="hidden" name="id" value="'+pageNumber+'" /><input type="hidden" name="urli" value="'+goAgora+'" /><input type="hidden" name="pass" value="'+password+'" /><label for="subject">Topic</label><br/><div class="inputDiv"><input class="textfield" id="topic" type="text" name="edittopic" value="" maxlength="50" /></div><label for="message">Message</label><br/><div class="inputDiv"><textarea name="editmessage" id="message"></textarea></div><br/><div class="inputDiv"><input class="button" type="submit" value="Send message" /> <input class="button" id="cancel" type="button" value="Back" /></div></div><div class="footer"></div></form></div></div>';
	}
	
document.getElementById("mainview").innerHTML=agoraHTML;

if (country == "fi")
	{
	document.getElementById("backTo").innerHTML='<h3 class="header">AllyAgora</h3><div class="content"><a href="?view=informations&allyagora=1" title="Takaisin AllyAgoraan"><span class="textLabel">Takaisin AllyAgoraan</span></a></div><div class="footer"></div>';
	}
	
if (country != "fi")
	{
	document.getElementById("backTo").innerHTML='<h3 class="header">AllyAgora</h3><div class="content"><a href="?view=informations&allyagora=1" title="Back to AllyAgora"><span class="textLabel">Back to AllyAgora</span></a></div><div class="footer"></div>';
	}
	
getEditData(pageNumber,"message");
getEditData(pageNumber,"topic");

}

function viewAgora()
{
if (country != "fi")
	{
	document.getElementById("breadcrumbs").innerHTML='<h3>Olet tässä:</h3><span class="textLabel">AllyAgora - Page '+pageNumber+'</span>';
	}
if (country == "fi")
	{
	document.getElementById("breadcrumbs").innerHTML='<h3>Olet tässä:</h3><span class="textLabel">AllyAgora - Sivu '+pageNumber+'</span>';
	}
if (player_name == undefined) { alert("NO PLAYER DATA. Redirecting to options..."); location.href=goOptions; }

var php_location = GM_getValue(value_location);

var pageNext = pageNumber + 1;
var pagePrevious = pageNumber - 1;

if (pageNumber == 1) { var pagePrevious = "1"; }

var agoraHTML = '<br><br><br><div class="contentBoxMessage"><a href="?view=informations&allyagora&newMessage" class="button">Uusi viesti</a><br><br></div>';

agoraHTML += '<div class="contentBox01h"><h3 class="header"><span class="textLabel"><font size="1"><a href="?view=informations&allyagora='+pagePrevious+'"><</a></font> Agora <font size="1"><a href="?view=informations&allyagora='+pageNext+'">></a></font></span></h3><div class="content">'
agoraHTML += '<div id="messagesArea"></div>'
agoraHTML += '</div><div class="footer"></div></div><center><div class="pageBrowser"><a href="?view=informations&allyagora='+pagePrevious+'"><img src="skin/img/resource/btn_min.gif"></a><a href="?view=informations&allyagora='+pageNext+'"><img src="skin/img/resource/btn_max.gif"></a></div></center><br>'

document.getElementById("mainview").innerHTML=agoraHTML;

if (php_location == undefined) {
location.href=options_url;
}

getMessages(pageNumber);

	
if (country == "fi")
	{
	document.getElementById("backTo").innerHTML='<h3 class="header">Asetukset</h3><div class="content"><a href="?view=informations&allyagora&options" title="Muuta AllyAgoran asetuksia"><span class="textLabel">AllyAgoran Asetukset</span></a></div><div class="footer"></div>';
	}
	
if (country != "fi")
	{
	document.getElementById("backTo").innerHTML='<h3 class="header">Options</h3><div class="content"><a href="?view=informations&allyagora&options" title="Change AllyAgora-options"><span class="textLabel">AllyAgora Options</span></a></div><div class="footer"></div>';
	}

}

function viewOptions()
{
if (country != "fi")
	{
	document.getElementById("breadcrumbs").innerHTML='<h3>Olet tässä:</h3><span class="textLabel">AllyAgora - Options</span>';
	}
if (country == "fi")
	{
	document.getElementById("breadcrumbs").innerHTML='<h3>Olet tässä:</h3><span class="textLabel">AllyAgora - Asetukset</span>';
	}

var php_location = GM_getValue(value_location);
var password = GM_getValue(value_pass);

var agoraHTML = '';

if (country != "fi")
	{
	agoraHTML += '<br><br><br><div class="contentBox01h"><h3 class="header"><span class="textLabel">Settings</span></h3><div class="content">'
	agoraHTML += "<br><div style='padding:3px 7px 6px 7px; background-color:#ffffff;'>AllyAgora-folder URL:<br><input id='php_loc' type='text' value='"+php_location+"' size='50'></div><br><div style='padding:3px 7px 6px 7px; background-color:#ffffff;'>AllyAgora-password:<br><input id='pass_form' type='password' value='"+password+"' size='50'></div><br><center><a class='button' id='save'>Save settings</a></center><br>";
	agoraHTML += '</div><div class="footer"></div></div>'
	}

if (country == "fi")
	{
	agoraHTML += '<br><br><br><div class="contentBox01h"><h3 class="header"><span class="textLabel">Asetukset</span></h3><div class="content">'
	agoraHTML += "<br><div style='padding:3px 7px 6px 7px; background-color:#ffffff;'>AllyAgora-kansion URL:<br><input id='php_loc' type='text' value='"+php_location+"' size='50'></div><br><div style='padding:3px 7px 6px 7px; background-color:#ffffff;'>AllyAgoran-salasana:<br><input id='pass_form' type='password' value='"+password+"' size='50'></div><br><center><a class='button' id='save'>Tallenna asetukset</a></center><br>";
	agoraHTML += '</div><div class="footer"></div></div>'
	}

document.getElementById("mainview").innerHTML=agoraHTML;

if (country == "fi")
	{
	document.getElementById("backTo").innerHTML='<h3 class="header">AllyAgora</h3><div class="content"><a href="?view=informations&allyagora=1" title="Takaisin liittouman agoraan"><span class="textLabel">Takaisin AllyAgoraan</span></a></div><div class="footer"></div>';
	}
	
if (country != "fi")
	{
	document.getElementById("backTo").innerHTML='<h3 class="header">AllyAgora</h3><div class="content"><a href="?view=informations&allyagora=1" title="Back to AllyAgora"><span class="textLabel">Back to AllyAgora</span></a></div><div class="footer"></div>';
	}

document.getElementById("save").addEventListener("click", function()
	{
	var get_php = document.getElementById("php_loc").value;
	var get_pass = document.getElementById("pass_form").value;
	GM_setValue(value_pass,get_pass)
	GM_setValue(value_location,get_php)
	location.href="http://"+server+"."+country+".ikariam.com/index.php?view=informations&allyagora=1";
	}
	, false);
}

function getMessages(page){
	
	if (country != "fi")
		{
		var lang_writer = "by";
		}
	else
		{
		var lang_writer = "Kirjoittaja:";
		}

	var php_location = GM_getValue(value_location);
	var pass = GM_getValue(value_pass);
	
	GM_xmlhttpRequest({
	  method: "POST",
	  url: php_location+"messages.php",
	  data: "lang_writer="+lang_writer+"&pass="+pass+"&php="+php_location+"&page="+page,
	  
	  headers: {
		"Content-Length": pass.length,
		"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
	  },
	  
	  onload: function(response) {
		var messages = response.responseText;
		document.getElementById("messagesArea").innerHTML="<br>"+messages+"<br>";
		if (messages.length < "200")
		{ document.getElementById("messagesArea").innerHTML="<br><center><b>Tällä sivulla ei ole viestejä.</b></center><br>"; }

		}
	
	});
}

function getEditData(id,get){

	var php_location = GM_getValue(value_location);
	var pass = GM_getValue(value_pass);
	
	GM_xmlhttpRequest({
	  method: "POST",
	  url: php_location+"edit.php",
	  data: "pass="+pass+"&id="+id+"&type=getdata&get="+get,
	  
	  headers: {
		"Content-Length": pass.length,
		"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
	  },
	  
	  onload: function(response) {
		var messages = response.responseText;
		if (get == "message")
			{
			document.getElementById("message").innerHTML=messages;
			}
		if (get == "topic")
			{
			document.getElementById("topic").value=messages;
			}
		}
	
	});
}

function boxTo(element) {

var element = document.getElementById(element);

var box = document.createElement('div');
var innerHTML = '<div class="dynamic" id="allyagora">';
innerHTML += '<h3 class="header">AllyAgora</h3>';
innerHTML += '<div class="content">';
innerHTML += '<br><center><a class="button" href="?view=informations&allyagora=1">Alliance Agora</a></center><br>';
innerHTML += '</div><div class="footer"></div></div>';

box.innerHTML = innerHTML;
element.parentNode.insertBefore(box, element.nextSibling);

}

function main() {
	
	var	view = document.getElementsByTagName("body")[0].id;
	switch (view) {


	case "embassy":
		boxTo('embassyMenu');
		break;

	case "diplomacyAdvisorAlly":
		boxTo('viewDiplomacyImperium');
		break;
	}
}

main();







