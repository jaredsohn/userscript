// ==UserScript==
// @name        War of 2012 Tweaks
// @namespace   http://userscripts.org/scripts/source/152064.user.js
// @description Nothing special at all
// @include     *.war.caplay.com/app.php?m=*
// @version     1.1
// ==/UserScript==

var gs = unsafeWindow || window; // global scope

function addGlobalStyle(css) {
    var head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// let's animate the game a bit
function _Show (element, callback)
{
	if (typeof callback != "function") callback = function(){};
	element.fadeIn(200, function(){element.show(); callback();});
}

function _Hide (element, callback)
{
	if (typeof callback != "function") callback = function(){};
	element.fadeOut(200, function(){element.hide()});
}

// market and castle related city lists ** begin

var my_city_list_offset = 0;

gs.soldierTraffic = function () // Military transport troops
{
	my_city_list_offset = 120-2;
	new gs.GameAjax("app:dialog:soldier_traffic");
}

gs.resourceTraffic = function() // Market transport resources
{
	my_city_list_offset = 160;
	new gs.GameAjax("app:dialog:resource_traffic");
}

gs.show_mycitylist = function()
{
	if (gs.$('#my_city_list').css("display") == "none")
	{
		var MyPos = gs.$('#targetCity').offset().top - my_city_list_offset;
		gs.$('#my_city_list').css("top", MyPos + "px");
		_Show(gs.$('#my_city_list'));
	} else _Hide(gs.$('#my_city_list'));
}

// market and castle related city lists ** end
//
// main city list ** start

gs.show_citylist = function() // animate
{
	if(gs.$('#citylist').css("display") == "none") {
		var position = 0 - gs.$('#citylist').outerHeight();
		gs.$('#citylist').css({'top': position});
		_Show(gs.$('#citylist'), function(){});
	} else _Hide(gs.$('#citylist'));
}

var _change_city = gs.change_city;
gs.change_city = function(id) 
{
	if (gs.$("#button_return").html() != null) gs.map_switch_city(); // Bug fix: if you change the city while in Conquest Map then the game loses functions 
	var octid = gs.city.id;
	gs.city.id = id;
	new gs.GameAjax2("app:main:change_city",{octid:octid}, gs.UpdateButtons);
	gs.$('#citylist').css("display", "none");

	if(gs.dialog_user_info!=null && gs.dialog_user_info.isShow())
		gs.dialog_user_info.close();

	if(gs.dialog_userinfo_pro!=null && gs.dialog_userinfo_pro.isShow())
		gs.dialog_userinfo_pro.close();
 
}

gs.update_city_list = function()
{
	var tCity = gs.city.name + " ("+gs.city.pos_x + "," + gs.city.pos_y + ")";
	gs.$('#label_city_info').html("<table class = 'citynamebutton' style = 'table-layout: fixed; border-collapse: collapse'> <tr onclick='javascript:show_citylist();'> <td style ='width:160px; max-width: 160px; text-align: center; text-overflow: ellipsis !important; white-space: nowrap !important; overflow: hidden !important; padding-left: 4px'>" + tCity + "</td> <td style = 'width: 10px'> &#9660 </td> </tr> </table>");
	gs.$('#label_city_info').attr('title', 'The current city is: ' + tCity); // showing city name as tooltip too
	
	var cityhtml = "<table class = 'citylisttable' style = 'border-collapse: collapse;cellspacing: 0; cellpadding:0 '>"; // a table looks better
	for (var i = 0; i<gs.character.citynum; i++) // citynum doesn´t count garbage npc's owned by the player :)
	{
		if (gs.character.city_list[i].id != gs.city.id)
			cityhtml += "<tr onclick='javascript:change_city(" 
						+ gs.character.city_list[i].id + ");'> <td style ='padding-left: 2px'> " 
						+ gs.character.city_list[i].name + "</td> <td style = 'text-align: right;'>(" 
						+ gs.character.city_list[i].pos_x + ",</td> <td style = 'padding-right: 2px'>" 
						+ gs.character.city_list[i].pos_y + ") </td> </tr>";
	}
	cityhtml += "</table>";
	gs.$('#citylist').html(cityhtml);
}

// main city list end

gs.update_soldiers_ui = function()
{
	var n=0;
	var content="";
	var seal = 0;

	for(var i in gs.city.soldiers)
	{
		var Soldier = gs.city.soldiers[i];
		if(Soldier.count>0 && Soldier.category<13)
		{
			if ((n%3)==0)
			{
				seal = 0;
				content+='<ul style = "margin-top: 3px; margin-bottom: 2px">';
			}

			var m_soldier = gs.slg_object[Soldier.type];
			var nSoldiers = Soldier.count;
			var SoldierText = nSoldiers;
			if (parseInt(nSoldiers) > 100000) SoldierText = parseInt(nSoldiers/1000).toFixed(0) + "K";
			var _title = nSoldiers.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ' ' + gs.slg_object[Soldier.type].name; // tooltip text

			content += '<li class="city_armed_forces" onclick="soldiers_dialog(' + Soldier.type +
					   ');" onmouseover="ddrivetip(soldier_tooltip(' + Soldier.type + 
					   '))" onmouseout="hideddrivetip();"><img src="images/soldier/c_' + Soldier.category + 
					   '.gif" width="15" height="15" alt="' + gs.slg_object[Soldier.type].name + '" title="' + _title + 
					   '"/></li><li class="city_armed_forces_amount font_light_blue" title = "' + _title + '">'+ SoldierText +'</li>';

			if (((n+1)%3)==0)
			{
				seal = 1;
				content+="</ul>";
			}
			n++;
		}
	}

	if(seal == 0)
		content+="</ul>";

	gs.$("#soldier_info").html(content);
	gs.$(".city_house_army_amount").html(gs.city.hero_count);
}

// bug fix: hero/equipment tooltips are very big and many times they are shown partially
// still buggy when the game window is bigger than the browser's window

var BorderSize = 10; // minimum tooltip distance from the window border

function TooltipEvent(e){ 
	if (!gs.enabletip) return;

	var CurX = 0;
	var CurY = 0;
	var tooltipPosX = -1; // -1 left side (default), +1 for right side
	var tooltipPosY = -1; // -1 above the mouse (default), +1 below the mouse
	var windowWidth = gs.window.innerWidth // 990 ????
	var windowHeight = gs.window.innerHeight // 600 ???

	// placing the tooltip depending on the mouse position
	if (e.clientX < (windowWidth / 2)) tooltipPosX = 1; //tooltip on the right side of the mouse
	if (e.clientY < (windowHeight / 2)) tooltipPosY = 1; //tooltip below the mouse
		
	if (tooltipPosX == 1) CurX = e.clientX + BorderSize;
		else CurX = e.clientX - gs.tipobj.offsetWidth - BorderSize;

	if (tooltipPosY == 1){
		CurY = e.clientY;
		if ((CurY + gs.tipobj.offsetHeight) > windowHeight) CurY = windowHeight - gs.tipobj.offsetHeight - BorderSize;
	}else{
		CurY = e.clientY - gs.tipobj.offsetHeight;
		if (CurY < BorderSize) CurY = BorderSize;
	}
	gs.tipobj.style.left = CurX + "px";
	gs.tipobj.style.top = CurY + "px"; 
	gs.tipobj.style.visibility = "visible";
}

gs.document.onmousemove=TooltipEvent; // replacing the old tooltip positioning function

// tooltips end //

gs.change_map = function()
{
	// originally designed to change between world map and city 
	// when the domain was added the function became useless and buggy
}

var $map_switch_world = gs.map_switch_world;
gs.map_switch_world = function()
{	
	if (!gs.is_world_map) $map_switch_world();
}

var $map_switch_domain = gs.map_switch_domain;
gs.map_switch_domain = function()
{
	$map_switch_domain();
	gs.is_world_map = false;
}

// instant complete daily tasks
// we use coupons always and no confirmation button
gs.instantDailyTask = function(id) 
{
	var mm = "2";
	new gs.GameAjax("app:tasks:speedup_daily_task",{id:id,mm:mm});
	// automatic rewards ???
	//new gs.GameAjax("app:tasks:daily_task_reward",{id:id});
}

// showing a clock in Conquest Map with some useful information
function AddConquestButton(){
	gs.$("#bg_content").append('<div style = "margin: 295px 0 0 5px; position: absolute;"><img src="exedra_image/clock.gif" onmouseout="StopHours();" onmouseover="ConquestMapHours();"></div>');
	addGlobalStyle  ('#selectMenu {position: absolute !important}');	
}

var _conquestMapInit = gs.conquestMapInit; 
gs.conquestMapInit = function(){
	_conquestMapInit();
	AddConquestButton();
}


gs.conquest_change_map = function(map_id){
	new gs.GameAjax("app:conquest:change_map",{map_id:map_id}, AddConquestButton);
}

var _Timer = 0;
var LastTime;
var Hours = ['00:00','09:00','14:00','19:00','21:00']; 

function MakeTooltip(){
	var _message = "The NPCs attacking number will automatically refresh at 00:00, 09:00, 14:00, 19:00, and 21:00 each day; The available attacking times will be recovered to max after the refreshing.";
	var cHour = LastTime.getHours() * 3600 + LastTime.getMinutes() * 60 + LastTime.getSeconds();
	for (var i=0; i<Hours.length; i++){
		var tHour = parseInt(Hours[i].substr(0,2)) * 3600 + parseInt(Hours[i].substr(3,2)) * 60;
		if (tHour > cHour) {break;}
	}
	_message+="<br/><br/> Next refresh will be at " + Hours[i];
	i--; if (i<0) {i = Hours.length - 1;}
	_message+="<br/><br/> Last refresh was at " + Hours[i];
	_message+="<br/><br/>" + LastTime.toLocaleString();
	return ('<span style=\"color:#FF9900;\">' + _message + '</span>');
}
gs.ConquestMapHours = function(){
	LastTime = gs.current_server_time_en;
	gs.ddrivetip('<table><tr><td><div id="tanchu_A">' + MakeTooltip() + '</div></td></tr></table>');
	_Timer = setInterval(RefreshConquestTooltip, 100);
}

gs.StopHours = function(){
	gs.hideddrivetip();
	clearInterval(_Timer);
}

function RefreshConquestTooltip(){
	if (LastTime == gs.current_server_time_en) return;
	LastTime = gs.current_server_time_en;
	gs.$("#tanchu_A").html(MakeTooltip());
}
// NPC Assistant, provides an easy table with npc positions

var NPCvar = 8; // for the dropdown list
var NPCData = {"NPC12": {xInit:-382, yInit:-386, Rate:40},
			   "NPC11": { xInit:-361, yInit:-363, Rate:40},
			   "NPC10": {xInit:-363, yInit:-381, Rate:40},
			   "NPC9": {xInit:-380, yInit:-360, Rate:40},
			   "NPC8": {xInit:-391, yInit:-391, Rate:20},
			   "NPC7": {xInit:-388, yInit:-388, Rate:20},
			   "NPC6 - 1": {xInit:-391, yInit:-388, Rate:20},
			   "NPC6 - 2": {xInit:-388, yInit:-391, Rate:20}};
var currentNPC = GM_getValue("_currentNPC","NPC8");
var $null = 999999999;			   
function NearestNPC(NPCType, xPos, yPos)
{
	var nRate = NPCData[NPCType].Rate;
	var ax = $null;
	var ay = $null;
	var dist = $null;
	for (var temp = NPCData[NPCType].xInit; temp<400; temp+=nRate) // nearest x pos
	{
		if (Math.abs(xPos-temp) < dist) { ax = temp; dist = Math.abs(xPos-temp); }
	}
	dist = $null;
	for (var temp = NPCData[NPCType].yInit; temp<400; temp+=nRate) // nearest y pos
	{
		if (Math.abs(yPos-temp) < dist) { ay = temp; dist = Math.abs(yPos-temp);}
	}
	return {x:ax, y:ay};
}

var currentCity = "";
var currentPosX = $null;
var currentPosY = $null;

function npcTable()
{

	var xyPos = NearestNPC(currentNPC, currentPosX, currentPosY);
	var html_out = "";
	for (var x=-3; x<4; x++)
	{
		html_out+='<tr>';
		for (var y=-3; y<4; y++)
		{
			var tempx = xyPos.x + x * NPCData[currentNPC].Rate;
			var tempy = xyPos.y + y * NPCData[currentNPC].Rate; 
			if ((tempx>-400) && (tempx<400) && (tempy>-400) && (tempy<400)){
			var npcDist = gs.computeSpyTime(tempx,tempy);
			var bkcolor = "red";
            if (npcDist < 120*60) bkcolor = "white";
			if (npcDist < 90*60) bkcolor = "yellow";
			if (npcDist < 60*60) bkcolor = "green";
				if (npcDist < 30*60) bkcolor = "blue";

			html_out+='<td><table style = "border: 2px solid ' + bkcolor + '; width: 60px; width: 100%; table-layout: fixed;">';
			html_out+='<tr><td class = "tableNPCbutton"><a style = "color:#49B7FD;font-weight:bold;" href="javascript:spyOperation(' + tempx.toString() + ',' + tempy.toString() + ",'" + currentNPC + "');" + '">Scout</a></td>';
			html_out+='<td class = "tableNPCinfo">(' + tempx.toString() + ', ' + tempy.toString() + ')</td></tr>';
			html_out+='<tr><td class = "tableNPCbutton"><a style="color:#FF520D;font-weight:bold;" href="javascript:militaryOperation(' + tempx.toString() + ',' + tempy.toString() + ",'" + currentNPC + "',0);" + '">Attack</a></td>';
			html_out+= '<td class = "tableNPCinfo">' + gs.second2time(npcDist) + '</td></tr>';
			html_out+='</table></td>';}
			else {html_out+='<td style = "background-color: black; border: none; text-align:center; color: red; font-weight:bold;"><div style="height: 20px; width: 115px">Out of the map</div><img src="images/icons/18.gif" style="height: 21px; border-color: rgb(238, 238, 238);"></td>'}
		}
		html_out+='</tr>'
	}
	return html_out;
}

gs.npcList = function()
{
	currentNPC = gs.$("#currentNPC").val();
	//GM_setValue("_currentNPC", currentNPC); not working, see next line 
	setTimeout(function() { GM_setValue("_currentNPC", currentNPC); }, 0); //	
	gs.$("#myNPCTable").html(npcTable());
}

gs.FindNPC = function(x,y) // optional console call with custom position
{
	if ((x != null) && (y != null)){
		currentCity = "position";
		currentPosX = x;
		currentPosY = y;
	}else{
		currentCity = gs.city.name;
		currentPosX = parseInt(gs.city.pos_x);
		currentPosY = parseInt(gs.city.pos_y);
	}
	var html_out= '<div id="myNPCwindow" style="background-color: rgb(1,37,35); width:870px; height:380px; border-width: 4px; border-style: ridge; border-color: rgb(94,83,31); ">';
	html_out+='<div style = "margin-left: 8px; margin-top: 5px"><img class="arms_title_L_R_bg" src="exedra_image/arms_title_left_bg.jpg"><div style="width:830px;" class="arms_title_center_bg">';
	html_out+='<div style = "font-size: 20px; margin-top: 6px; width: auto">-> Scouting ';
	var mKeys = Object.keys(NPCData);

	html_out+='<select style = "border: none; background-color: rgba(0,0,0,0.5); color: white; font-size: 15px;" id ="currentNPC" onchange = "npcList();">';
	for (var i=0; i<mKeys.length; i++)
		{
		if (currentNPC == mKeys[i]) html_out+='<option selected="selected">'+ mKeys[i] +'</option>';
			else html_out+='<option>'+ mKeys[i] +'</option>';
		}
	html_out+='</select>';	
	html_out+=' from <b>' + currentCity + ' (' + currentPosX.toString() + ', ' + currentPosY.toString() + ')</b></div>';
	html_out+='<a class="closeDialog" href="#"><img style="top:8px;right:1px; position:absolute;" src="exedra_image/arms_close.jpg"></a>			</div> <img class="arms_title_L_R_bg" src="exedra_image/arms_title_right_bg.jpg"></div>';
	
	html_out+='<div style = "height: 48px;"></div><table id = "myNPCTable" style = "max-width: 850px; margin:auto; border: 1px solid white; border-collapse: collapse;cellspacing: 0; cellpadding:0;">'
	html_out+=npcTable();
	html_out+='</table>';
	html_out+='</div>';
	Instant_task_box = new gs.DialogBox(870, 380, html_out);
	Instant_task_box.show();
	addGlobalStyle	('.tableNPCinfo {border: none; text-align: right; width: 100px; white-space: nowrap;cellspacing: 0; cellpadding:0;}');
	addGlobalStyle	('.tableNPCbutton {border: none; text-align: left; width: 100%; min-width: 100%; white-space: nowrap;cellspacing: 0; cellpadding:0;}');
}

var $update_character_ui=gs.update_character_ui; // morale with 2 decimals ? wtf? remove it....
gs.update_character_ui = function()
{
	gs.character.exploit = parseInt(gs.character.exploit);
	$update_character_ui();
}

/*gs.dialog_inviteNewHero = function(pos){
	new gs.GameAjax("app:dialog:invite_new_hero",{pos:pos}, function(){
	gs.$("#label_city_info").clone(true).appendTo("#treasury_coat");
	gs.$("#citylist").clone(true).appendTo("#treasury_coat");});
}
*/
function ExtraWork()
{
	// city list in Market and Castle
	addGlobalStyle  ('div#my_city_list {padding-left: 2px !important; padding-right: 2px !important; width: auto !important; margin-top: 60px !important;}');

	addGlobalStyle	('.custombtn:hover {cursor:pointer !important}'); // changes cursor on hover
	addGlobalStyle	('.custombtn {height:60px; text-align: center; line-height: 30px; font-weight: bold; color: rgb(80, 255, 0); text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;}'); // changes cursor on hover
// styling the main city tab

	addGlobalStyle	('.city_info_leftside {margin-left: 0px; margin-top: 0px; width: 185px; height: 95px}'); // left pane
	addGlobalStyle	('#city_info_rightside {margin-left: 0px; margin-top: 0px; width: 185px; height: 95px}'); // right pane
	addGlobalStyle  ('div#citylist {width: auto !important; height: auto; left: 7px !important;)');
 	addGlobalStyle  ('.citylisttable tr:hover td {background-color: rgb(24, 22, 23) !important; cursor: pointer !important}'); // default background color is rgb(49, 45, 46)
	addGlobalStyle  ('.citynamebutton tr:hover td { cursor: pointer !important; color: yellow}');			
	gs.$('.city_info_leftside dl:eq(0) dt:eq(0)').remove(); // Overview text and Buy resource button
	gs.$('.city_term_3').remove();  // the button that makes the city list appear
	addGlobalStyle  ('dd.city_term_1 {display: none}'); // let´s hide the "City:", more space for city name
	addGlobalStyle	('dd#label_city_info {background-image:none; height: auto; width:180px; margin-top: 3px; color: #50FF00; font-weight:bold}');
	addGlobalStyle	('#city_info_rightside dt {margin-left: 5px !important; margin-top: 4px !important;}');

addGlobalStyle	('.city_house_army {margin-left: 110px !important; margin-top: -14px !important;}'); //Heroes: label
	addGlobalStyle	('.city_house_army_amount {margin-left: 160px !important; margin-top: -17px !important;}'); // the number of heroes	
	
//	addGlobalStyle	('.city_house_army {margin-left: 100px !important; margin-top: -14px !important;}'); //Heroes: label
//	addGlobalStyle	('.city_house_army_amount {margin-left: 150px !important; margin-top: -17px !important;}'); // the number of heroes
	addGlobalStyle	('div.city_natural_amount.left {width: 200px; margin-left: -10px; margin-top: 1px;}'); // army container
	addGlobalStyle	('li.city_armed_forces {margin-left: 0px; width: 19px; text-align: right}'); // soldier images
	addGlobalStyle	('li.city_armed_forces_amount.font_light_blue {padding-left: 2px; margin-left: 0px; width: 40px;}'); // soldier amount
	// tweaking the 3 Ancient Maps, we hide the title above cause it can be seen in bottom-right side and we move everything else down...
	// ... so military information won't interfere with Map information
	addGlobalStyle	('.conquest_map_name {visibility: hidden;}'); // no map name in the top-middle of the map
	addGlobalStyle	('.conquest_energy_container {top: 35px; left: 518px; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;}');
	addGlobalStyle	('#button_return {top: 20px;}'); // and finished tweaking ancient map
	// resource overview
	gs.$('#label_city_info').after('<div style = "margin-left: 10px; margin-top: 25px; color: #E4C678">Resource production</div>');
	//addGlobalStyle	('li.city_natural_1 {margin: 2px 0 0 -10px !important;}');
	
	addGlobalStyle	('.city_natural_all {margin: 0 0 2px 5px;}');
	gs.$('.city_natural_all').parent().append('<a style="margin-left:10px;color:#50FF00;font-weight:bold; margin-top: 77px;" href="javascript:buy_resource()">Buy Resource</a><a style="color:#50FF00;font-weight:bold; margin-left:15px" href="javascript:get_salary();" title = "Daily Salary">Salary</a>')
	gs.$('#person_info_left_part a:eq(1)').remove(); // removing Daily Salary button from Profile tab
	addGlobalStyle	('#city_natural {margin-top: 4px; margin-bottom: 1px}');
	
	// Hero equipment button is replaced with another buton providing more functions
	gs.$("#cityandmap").replaceWith("<div id = 'bFindNPC' onclick = 'UpdateButtons()'>Btn switch</div>");
	addGlobalStyle	("#bFindNPC {background-image: url('exedra_image/button0.gif'); background-size: 100% 100%; width: 85px; height: 24px; text-align: center; line-height: 24px; font-weight: bold; color: rgb(80, 255, 0);}");
	addGlobalStyle  ('#bFindNPC:hover {cursor: pointer !important}'); 
	
	// Military affair -> troops tab
	addGlobalStyle	(".armsAdmin_infoline {white-space: nowrap;}");
}

var _initGameData = gs.initGameData; 
gs.initGameData = function() {
	ExtraWork();
	_initGameData();
}

var xtraButtons = '<div class="bottom_right_operate left"><ul style="display:none" id="page_0" class="showPage">' +
		'<li><div class = "custombtn" style = "background-image: ' + "url('images/button/bt_1011.gif')" + '; " onclick = "FindNPC()">Find NPC</div></li>' + 
		'<li><div class = "custombtn" style = "background-image: ' + "url('images/button/bt_1009.gif')" + '; " onclick = "heroInfo(0)">Hero Equip</div></li>' +
		'<li><a class="custombtn" onclick="javascript:dialog_inviteNewHero(0)"><img border="0" src="images/button/bt_1007.gif" title = "Command Center"></a></li></ul></div>'; 
var tempButtons = '';

gs.UpdateButtons = function(){
	if (gs.$(".custombtn").html() == null){ // no extra buttons yet, we save the current layout and we place our stuff 
		gs.$("#bottom_right_partner").find("input:text").each(function(){gs.$(this).attr('tag',gs.$(this).val());}); // save input into tag
		tempButtons = gs.$("#bottom_right_partner").html(); // html() doesn't return values from input boxes
		gs.$("#bottom_right_partner").html(xtraButtons);
	}else if (tempButtons != ''){
		gs.$("#bottom_right_partner").html(tempButtons);
		gs.$("#bottom_right_partner").find("input:text").each(function(){gs.$(this).val(gs.$(this).attr("tag"));}); // restore input from tag
	}
}

gs.clear_button = function(){
	gs.$("#bottom_right_partner").html(xtraButtons);
	tempButtons = "";
	gs.hideddrivetip();
}

gs.armyHeroManage = function()
{
	gs.Dialog_armyHeroManage_script="armyHeroManage()";
	new gs.GameAjax("app:dialog:army_hero_manage", null, RedHeroes);
}

function RedHeroes()
{
	var textkey1 = "show_queue_detail('";
	var mKeys = Object.keys(gs.Dialog_armyHeroManage.soldiers);
	gs.$("[id^='hero_']", gs.Dialog_armyHeroManage.obj).each(function(){
		var cHero = gs.$(this).attr("id");
		var refObj = gs.$("div:contains('CP')", gs.$(this));
		var tempStr = refObj.prev().children("div:last").html();
		var j = tempStr.indexOf(textkey1);
		if (j>-1) {
			var tempStr1 = tempStr.substr(j + textkey1.length);
			j = tempStr1.indexOf("');");
			tempStr = tempStr1.substr(0,j);
			for (var i=0; i<mKeys.length; i++){
				if (gs.Dialog_armyHeroManage.soldiers[mKeys[i]].name == tempStr) {var unitCP = parseInt(gs.Dialog_armyHeroManage.soldiers[mKeys[i]].keep); break;}
			}
			tempStr = refObj.next().html();
			var j=tempStr.indexOf("/");
			var loadedUnits = parseInt(tempStr.substr(0,j));
			var maxUnits = parseInt(tempStr.substr(j+1));
			if ((loadedUnits + unitCP) <= maxUnits) {refObj.next().css("color","#FF0033");}
		} else {refObj.next().css("color","#FF0033");}
	});
}

gs.armyHeroManage_hero = function(hero)
{
	if(hero!=null && hero>0)
		gs.GameAjax("app:dialog:army_hero_manage_hero",{id:hero}, RedHeroes);
}

var functionID = 0;
var searchID = "";
var addHTML = "";
var checkVal = "";
var _item_operate = gs.item_operate;
gs.item_operate = function(item_id, img_url, item_type)
{
	searchID = "";
	addHTML = "";
	checkVal = ""; // clearing them from previous use
	if (item_id == 114){ // combat flags
		searchID = "#treasuty_plate01 .treasuty_plate_R :first";
		addHTML = '<input type="button" onclick="Dialog_union2._close(); do_discard_tool(114, 10, ' + "'box'" + ');" style="top:40px;right:1px;" class="my_leftButton" value="Discard all">';
		checkVal = "Donate";
	}
	if (item_id == 37){ // Armistice Agreement 10h
		searchID = "#conscription_coat .conscription_RightP :first"
		addHTML = '<input type="button" onclick="confirm_item_box._close(); do_discard_tool(37, 10, ' + "'box'" + ');" style="top:104px;left:10px;" class="my_leftButton"  value="Discard all">';
		checkVal = "Use Truce";
	}
	if (checkVal != "") functionID = setInterval(UpdatePage, 50); // 1000 is 1 second
	_item_operate(item_id, img_url, item_type);
}

function UpdatePage()
{
	var temp = gs.$(searchID);
	if (temp.val() == checkVal){ 
		temp.after(addHTML);
		clearInterval(functionID);
	}	
}
var ___show_army_status = gs.__show_army_status;
gs.__show_army_status = function() // i don't want to see when my spies return, only army :)
{
	for (var i in gs.city.army){
		var tmp_army = gs.city.army[i];
		if(tmp_army.status == 7 || tmp_army.status == 107){
		gs.city.army[i].status = 0;
		}
		
	}
	___show_army_status(); 
	if (gs.$('#attack_info').html() != ""){
		gs.$('#attack_info :contains("View")').remove();
		var temp = gs.$('#attack_info').html();
	//	temp+= '<a href="javascript:militaryInfo(1);"> View</a>&nbsp;&nbsp;';
		gs.$('#attack_info').html('&nbsp;&nbsp;<a href="javascript:militaryInfo(1);"> View</a>&nbsp;&nbsp;' + temp);}
}

var _army_timer_callback = gs.army_timer_callback;

gs.army_timer_callback = function()
{
	var ttt = gs.time2second(gs.$('#fl_spied').html());
	if(ttt > 0) gs.$('#fl_spied').html(gs.second2time(ttt-1));
	var ttt = gs.time2second(gs.$('#fl_spyreturn').html());
	if(ttt > 0) gs.$('#fl_spyreturn').html(gs.second2time(ttt-1));
	_army_timer_callback();
}

var mActions = {"1": "Attack", 
				"2": "Army return", 
				"3": "Garrison",
			    "4": "Reinforce",
			    "5": "Player attack",
			    "6": "Scout",
			    "7": "Scout return", 
			    "8": "Doing quest", 
			    "9": "Garrisoned armies",
			    "101": "Domain attack", 
			    "102": "Domain army return", 
			    "106": "Domain scout",
			    "107": "Domain scout return"};

var ___show_army_status = gs.__show_army_status;
gs.__show_army_status = function(){
	
	var nAttack = 0;
	var timeAttack= Infinity;
	var msgAttack ="";
	
	var nHelp = 0;
	var msgHelp="";
	var timeHelp=Infinity;

	var nAttacked = 0;	
	var timeAttacked= Infinity;
	var msgAttacked ="";
	
	var nHelped = 0;
	var msgHelped="";
	var timeHelped=Infinity;

	var nSpy = 0;
	var msgSpy = "";
	var timeSpy = Infinity;
	
	var nSpied = 0;
	var msgSpied = "";
	var timeSpied = Infinity;
	
	var nSpyReturn = 0;
	var msgSpyReturn = "";
	var timeSpyReturn = Infinity;

	var nReturn = 0;
	var msgReturn = "";
	var timeReturn = Infinity;

	var nDailyQuest = 0; 
	var msgDailyQuest = "";
	var timeDailyQuest = Infinity;
	
	var nGarrisoned = 0;
	var msgGarrisoned = "";

	var display = 0;

	for (var i in gs.city.army)
	{
		var tmp_army = gs.city.army[i];
		if (gs.character.attacked_info == 0){ // Telegraph 1 is on, 0 is off
			if (tmp_army.city_id != gs.city.id && tmp_army.target_id != gs.city.id) continue;
		}
		if (tmp_army.status == 9) { // Garrisoned armies status = 9
			nGarrisoned++;
			continue;
		}
		if (tmp_army.status == 8) { // Daily quest status = 8
			nDailyQuest++;
			if (tmp_army.end_time < timeDailyQuest) timeDailyQuest = tmp_army.end_time;
			continue;
		}
		if (tmp_army.status == 6 || tmp_army.status == 106){ // Spy status = 6, domain spy status = 106
			if (tmp_army.target_character == gs.city.owner_id){
					nSpied++; // we are being spied !!!!!
					if (tmp_army.end_time < timeSpied) timeSpied=tmp_army.end_time;
			}else{
					nSpy++;
					if(tmp_army.end_time < timeSpy)	timeSpy=tmp_army.end_time;	
			}
			continue;
		}
		if (tmp_army.status == 7 || tmp_army.status == 107){ // Spy return status = 7, domain spy return status = 107
			nSpyReturn++;
			if (tmp_army.end_time < timeSpyReturn) timeSpyReturn = tmp_army.end_time;
			continue;
		}
		if (tmp_army.status == 1 || tmp_army.status == 5 || tmp_army.status == 101){ // 1 world attack, 5 player attack, 101 domain attack
			if (tmp_army.target_character == gs.city.owner_id){
					nAttacked++; // we are being attacked !!!!!
					if (tmp_army.end_time < timeAttacked) timeAttacked=tmp_army.end_time;
			}else{
					nAttack++;
					if(tmp_army.end_time < timeAttack)	timeAttack=tmp_army.end_time;	
			}
			continue;
		}
		if (tmp_army.status == 2 || tmp_army.status == 102){ // 2 army world return, 102 army domain return	
			nReturn++;
			if (tmp_army.end_time < timeReturn) timeReturn=tmp_army.end_time;
			continue;
		}
		if (tmp_army.status == 3 || tmp_army.status == 4){ // 3 transport, 4 reinforce
			if (tmp_army.target_id == gs.city.id){
				nHelped++;
				if (tmp_army.end_time < timeHelped) timeHelped=tmp_army.end_time;
			}else{
				nHelp++;
				if (tmp_army.end_time < timeHelp) timeHelp=tmp_army.end_time;
			}
			continue;
		}
	}
	
	if (nAttack != 0){ // Attack
		display = 1;
		timeAttack = parseInt(timeAttack-(gs.current_server_time.getTime()/1000));
		if (timeAttack > 0) msgAttack="&nbsp;&nbsp;<font color=red>Attack</font><font color=white>×" + nAttack + " <span id=fl_attack>" + gs.second2time(timeAttack)+"</span></font>";
	}
	if (nHelp!=0){ // Reinforce
		display = 1;
		timeHelp = parseInt(timeHelp-(gs.current_server_time.getTime()/1000));
		if(timeHelp > 0) msgHelp="&nbsp;&nbsp;<font color=green>Reinforce</font><font color=white>×" + nHelp + " <span id=fl_help>" + gs.second2time(timeHelp) + "</span></font>";
	}
	if (nAttacked !=0){ // Be attacked
		display = 1;
		timeAttacked = parseInt(timeAttacked-(gs.current_server_time.getTime()/1000));
		if(timeAttacked > 0) msgAttacked="&nbsp;&nbsp;<font color=red>Be attacked</font><font color=white>×" + nAttacked + " <span id=fl_attacked>" + gs.second2time(timeAttacked)+"</span></font>";
	}
	if (nHelped!=0){ // Be reinforced
		display = 1;
		timeHelped = parseInt(timeHelped-(gs.current_server_time.getTime()/1000));
		if(timeHelped > 0) msgHelped="&nbsp;&nbsp;<font color=green>Be reinforced</font><font color=white>×" + nHelped + " <span id=fl_helped>" + gs.second2time(timeHelped) + "</span></font>";
	}
	if (nReturn != 0){
		display = 1;
		timeReturn = parseInt(timeReturn-(gs.current_server_time.getTime()/1000));
		if(timeReturn > 0) msgReturn="&nbsp;&nbsp;<font color=yellow>Return</font><font color=white>×" + nReturn + " <span id=fl_return>" + gs.second2time(timeReturn)+"</span></font>";
	}

	if (nSpy != 0) // Scout
	{
		display = 1;
		timeSpy = parseInt(timeSpy-(gs.current_server_time.getTime()/1000));
		if(timeSpy > 0)
			msgSpy="&nbsp;&nbsp;<font color=yellow>Spy</font><font color=white>×"+nSpy+" <span id=fl_spy>"+gs.second2time(timeSpy)+"</span></font>";
	}
	if (nSpied != 0) // Being scouted
	{
		display = 1;
		timeSpied = parseInt(timeSpied-(gs.current_server_time.getTime()/1000));
		if(timeSpied > 0)
			msgSpied="&nbsp;&nbsp;<font color=Red>Being spied</font><font color=white>×"+nSpied+" <span id=fl_spied>"+gs.second2time(timeSpied)+"</span></font>";
	}
	if (nSpyReturn != 0) // Returning scouts
	{
		display = 1;
		timeSpyReturn = parseInt(timeSpyReturn-(gs.current_server_time.getTime()/1000));
		if(timeSpyReturn > 0)
			msgSpyReturn="&nbsp;&nbsp;<font color=yellow>Spy return</font><font color=white>×"+nSpyReturn+" <span id=fl_spy>"+gs.second2time(timeSpyReturn)+"</span></font>";
	}
	msgSpyReturn = "";

	if(nDailyQuest != 0) // Doing Quest
	{
		display = 1;
		timeDailyQuest = parseInt(timeDailyQuest-(gs.current_server_time.getTime()/1000));
		if	(timeDailyQuest > 0)
			msgDailyQuest="&nbsp;&nbsp;<font color=green>Doing Quest</font><font color=white>×" + nDailyQuest + " <span id=fl_task>" + gs.second2time(timeDailyQuest) + "</span></font>";
	}
	
	if(nGarrisoned != 0) // Garrison
	{
		display = 1;
		msgGarrisoned="&nbsp;&nbsp;<font color=green>Garrisoned</font><font color=white>×" + nGarrisoned + "</font>";
	}

		var tooltip = "";
	var actionCount = new Array(500);

	for (var i1=0; i1<actionCount.length; i1++) actionCount[i1]=0;
	for (var itemp in gs.city.army)
	{
		var tmparmy = gs.city.army[itemp].status;
		actionCount[tmparmy]++;
		
	}

	for (i1 = 0; i1<actionCount.length; i1++)
	{
		if (actionCount[i1] == 0) continue;
		if (mActions[i1] == undefined) {
		tooltip+="Action " + i1 + " x " + actionCount[i1] + " times&#13;";
		}else{		tooltip+=mActions[i1] + " x " + actionCount[i1] + "&#13;";}
	}
	if(display == 1)
	{
		if(gs.$('#attack_info').css("display") == "none") gs.$("#attack_info").css("display", "");
		var menut = ""//'<div style = "background-color:black"><ul><li><a href="#">item1</a></li><li><a href="#">item2</a></li><li><a href="#">item3</a></li></ul></div>'
		gs.$("#attack_info").html("&nbsp;&nbsp;<a title = '" + tooltip + "' href='javascript:militaryInfo(1);'>View</a>"
			+"&nbsp;&nbsp;<a href='javascript:ShowArmyDetail(1);'>Details</a>"
			+msgAttack+msgHelp+msgAttacked+msgHelped+msgReturn+msgSpy+msgSpied+msgSpyReturn+msgDailyQuest+msgGarrisoned+"&nbsp;&nbsp;" + menut);
	}
	else
	{
		gs.$("#attack_info").html('');
		gs.$('#attack_info').css("display", "none");
	}

}

gs.changeArmyOption = function()
{
}

function sortObj(object, sortFunc) {
  var rv = [];
  for (var k in object) {
    if (object.hasOwnProperty(k)) rv.push({key: k, value:  object[k]});
  }
  rv.sort(function(o1, o2) {
    return sortFunc(o1.key, o2.key);
  });
  return rv;
} 

gs.checkedImageRefresh = function()
{

	if (gs.$("#telegraph input").is(":checked")) gs.character.attacked_info = 1;
		else gs.character.attacked_info = 0;
	gs.__show_army_status();
//	GMsetValue("skipImageRefresh", skipImageRefresh); 	
}

gs.ShowArmyDetail = function(type) // optional console call with custom position
{
	var opList = sortObj(gs.city.army, function(o1,o2){
		var currentTime = gs.current_server_time.getTime()/1000;
//		console.log(o1,o2);
		if (gs.city.army[o1].end_time-currentTime>gs.city.army[o2].end_time-currentTime) {return 1} else {return -1;}});
//	console.log(opList);
	var html_out= '<div id="myNPCwindow" style="background-color: rgb(1,37,35); width:870px; height:380px; border-width: 4px; border-style: ridge; border-color: rgb(94,83,31); ">';
	html_out+='<div style = "margin-left: 8px; margin-top: 5px"><img class="arms_title_L_R_bg" src="exedra_image/arms_title_left_bg.jpg"><div style="width:800px;" class="arms_title_center_bg">';
	html_out+='<div style = "font-size: 20px; margin-top: 6px; width: auto">Military operation ';
	var mKeys = Object.keys(mActions);

	html_out+='<select style = "border: none; background-color: rgba(0,0,0,0.5); color: white; font-size: 15px;" id ="currentNPC" onchange = "changeArmyOption();">';
	for (var i=0; i<mKeys.length; i++)
		{
		if (type == mKeys[i]) html_out+='<option selected="selected">'+ mActions[mKeys[i]] +'</option>';
			else html_out+='<option>'+ mActions[mKeys[i]] +'</option>';
		}
	html_out+='</select>';	
	var status = " checked";
	if (gs.character.attacked_info == 0) status = "";
	html_out+="<label id = 'telegraph' style = 'position: absolute; top: 10px; font-size: 12px; font-weight: bold'><input type='checkbox' style = 'position: relative; top: 2px' onchange = 'checkedImageRefresh()'"
		+ status +">Telegraph</input></label>";
//<input type="checkbox" name="option3" value="Cheese"> Cheese<br></input>
//	html_out+=' from <b>' + currentCity + ' (' + currentPosX.toString() + ', ' + currentPosY.toString() + ')</b></div>';
	html_out+='<a class="closeDialog" href="#"><img style="top:8px;right:1px; position:absolute;" src="exedra_image/arms_close.jpg"></a></div></div> <img class="arms_title_L_R_bg" src="exedra_image/arms_title_right_bg.jpg"></div>';
	
	html_out+='<div style = "height: 48px;"></div><div style="width:800px;height:320px; position:absolute;overflow-x:hidden; overflow-y:scroll;"><table id = "militaryTable" style = "max-width: 850px; margin:auto; border: 1px solid white; border-collapse: collapse;cellspacing: 0; cellpadding:0;">'
		html_out+="<tr><td>from Player</td><td>from City</td><td>Spy count</td><td>to Player</td><td>to City</td><td>ID</td><td>Time left</td>"
			+"<td><img src='images/001_head_2.gif' style='width:23px;height:17px;top:6px;left:10px;' title='Food'></td>"
			+"<td><img src='images/001_head_1.gif' style='width:23px;height:17px;top:6px;left:10px;' title='Wood'></td>"
			+"<td><img src='images/001_head_3.gif' style='width:23px;height:17px;top:6px;left:10px;' title='Stone'</td>"
			+"<td><img src='images/001_head_4.gif' style='width:23px;height:17px;top:6px;left:10px;' title='Gold'></td><td>Status</td><td>Visible</td></tr>"	
	for (var i=0; i<opList.length; i++)
	{

		html_out+="<tr style = 'border: 1px solid white'>";

		var tmp_army = opList[i].value;

		if (tmp_army.status == 8) { // Daily quest status = 8
			nDailyQuest++;
			if (tmp_army.end_time < timeDailyQuest) timeDailyQuest = tmp_army.end_time;
			continue;
		}
	//	if ((tmp_army.status == 2) || (tmp_army.status == 1)){
		{	var msg1 = "";
		//	if (tmp_army.status == 1) msg1 = " Attack";
			html_out+="<td class = 'militaryTableCell'><a class = 'militaryTableButton' href = 'javascript:user_info_(" + tmp_army.owner_id + ")'>" + tmp_army.owner_name + msg1 + "</a></td>";
			html_out+="<td class = 'militaryTableCell'>" + tmp_army.city_name + "</td>";
			html_out+="<td class = 'militaryTableCell'>" + tmp_army.count + "</td>"; 
			html_out+="<td class = 'militaryTableCell'>" + tmp_army.target_character_name + "</td>";
			html_out+="<td class = 'militaryTableCell'>" + tmp_army.target_name + "</td>" ;
			html_out+="<td class = 'militaryTableCell'>" + tmp_army.target_character + "</td>";
			var timeLeft = parseInt(tmp_army.end_time-(gs.current_server_time.getTime()/1000));			
			html_out+="<td class = 'militaryTableCell'>" + gs.second2time(timeLeft) + "</td>" ;
			html_out+="<td class = 'militaryTableCell'>" + tmp_army.food + "</td>";
			html_out+="<td class = 'militaryTableCell'>" + tmp_army.wood + "</td>";
			html_out+="<td class = 'militaryTableCell'>" + tmp_army.stone + "</td>";
			html_out+="<td class = 'militaryTableCell'>" + tmp_army.gold + "</td>";
			if (mActions[tmp_army.status] == undefined){ msg1 = "unknown military operation (status " + tmp_army.status + ")";}
				else msg1 = mActions[tmp_army.status];
			html_out+="<td class = 'militaryTableCell'>" + msg1 + "</td>";
			msg1 = "yes";
	if (gs.character.attacked_info == 0){ // Telegraph 1 is on, 0 is off
			if (tmp_army.city_id != gs.city.id && tmp_army.target_id != gs.city.id) msg1 = "no";

		}
					html_out+="<td class = 'militaryTableCell'>" + msg1 + "</td>";}
	/*	if (tmp_army.status == 6 || tmp_army.status == 106){ // Spy status = 6, domain spy status = 106
			html_out+="<td class = 'militaryTableCell'><a class = 'militaryTableButton' href = 'javascript:user_info_(" + tmp_army.owner_id + ")'>" + tmp_army.owner_name + "</a></td>";
			html_out+="<td class = 'militaryTableCell'>" + tmp_army.city_name + "</td>"
			html_out+="<td class = 'militaryTableCell'>" + tmp_army.count + "</td>" 
			html_out+="<td class = 'militaryTableCell'>" + tmp_army.target_character_name + "</td>"
			html_out+="<td class = 'militaryTableCell'>" + tmp_army.target_name + "</td>" 
			html_out+="<td class = 'militaryTableCell'>" + tmp_army.target_character + "</td>"
			var timeLeft = parseInt(tmp_army.end_time-(gs.current_server_time.getTime()/1000));			
			html_out+="<td class = 'militaryTableCell'>" + gs.second2time(timeLeft) + "</td>" 
			if (tmp_army.target_character == gs.city.owner_id){
					//nSpied++; 
				//	if (tmp_army.end_time < timeSpied) timeSpied=tmp_army.end_time;
			}else{
					//nSpy++;
			//		if(tmp_army.end_time < timeSpy)	timeSpy=tmp_army.end_time;	
			}
		}*/
		html_out+="</tr>"
	}
	//html_out+=npcTable();
	html_out+='</table></div>';
	html_out+='</div>';
	Instant_task_box = new gs.DialogBox(870, 380, html_out);
	Instant_task_box.show();
	addGlobalStyle	('.militaryTableCell {margin: 1px; border: 1px solid white; text-align: center; width: 100%; white-space: nowrap;cellspacing: 0; cellpadding:0;}');
	addGlobalStyle	('.militaryTableButton {border: none; text-align: left; width: 100%; min-width: 100%; white-space: nowrap;cellspacing: 0; cellpadding:0;}');
}
/*{
	for (var i in gs.city.army){
		var tmp_army = gs.city.army[i];
		if(tmp_army.status == 7 || tmp_army.status == 107){
		gs.city.army[i].status = 0;
		}
		
	}
	___show_army_status(); 
	if (gs.$('#attack_info').html() != ""){
		gs.$('#attack_info :contains("View")').remove();
		var temp = gs.$('#attack_info').html();
		temp+= '<a href="javascript:militaryInfo(1);"> View</a>&nbsp;&nbsp;';
		gs.$('#attack_info').html(temp);}
}*/