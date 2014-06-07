// ==UserScript==
// @name           Gladiatus Helper General - 修改版 v.1.0
// @description    Gladiatus小幫手 - 修改版 （此插件不為官方所認可，所有風險請自行承擔）By Acedia
// @autor          作者：Botherlong  修改者：Acedia
// @include        *.gladiatus.*
// @resource movetrans	   
// @resource moveup	   
// @resource movedown	   
// @resource delIcon	   
// @resource renameIcon	   
// @version        1.0
// ==/UserScript==

var version = "修改版 v1.0";
GM_xmlhttpRequest({
   method: 'POST',
   url: 'http://acedia0915.blogspot.com/',
   headers: {
     'Content-Type': 'application/x-www-form-urlencoded',
   },
   onload: function(responseDetails) {
   if(version.substring(4,version.length) != responseDetails.responseText)
		plugin.innerHTML += " (<span style='cursor:pointer;' onclick=window.open('http://acedia0915.blogspot.com/','_blank','')><font color=#FF9933>造訪BLOG</font></span>)";
//   	plugin.innerHTML += " (<a href='http://acedia0915.blogspot.com/' target='_blank'><font color=red>造訪BLOG</font></a>)";
   },
 });
var gameServer = top.location.host;
var current_url = window.location.href;
var sh = document.getElementById('header').getElementsByTagName('a')[0].getAttribute('href');
sh = sh.substring(sh.indexOf("sh="),sh.length);
current_url = (current_url.indexOf("sh=") == -1)?current_url.substring(current_url.indexOf("index.php?")+9,current_url.length):current_url.substring(current_url.indexOf("index.php?")+9,current_url.indexOf("sh="));
var current_mod = URL_match('mod');
var mainmenu = document.getElementById('mainmenu').getElementsByTagName('a');
var mylevel = document.getElementById('charvalues').getElementsByTagName('span')[11].innerHTML;
var now = new Date();
var underground_name = ['葛斯塔佛的偏遠住宅','魔龍堡壘','黑暗計謀洞窟','隱祕的墓穴','薩鬼斯堡壘','毀壞的神殿','皮洛的寢室','露天市場','黑暗的地下墓穴','維京營地','詭祕的研究室'];
var underground_place = ['黑暗森林','迷霧山脈','荒野之狼洞穴','古代神廟','野蠻人村莊','巫毒神殿','血腥洞穴','安破克塔部落','洞穴神殿','被詛咒的村莊','死亡之丘'];
var underground_level = [10,20,40,70,100,30,40,80,50,60,90];
var location_name =  [['迷霧山脈','黑暗森林','野蠻人村莊','強盜營地','古代神廟','海盜港口','荒野之狼洞穴'],['白色巨人','彌賽亞綠洲','安破克塔部落','旅行商隊','巫毒神殿','失落的港口','血腥洞穴','跳崖者','橋樑'],['寇曼山','綠色森林','汪達爾人村莊','條頓營地','洞穴神殿','被詛咒的村莊','礦坑','死亡之丘']];
var location_npc_I = [[['哈比鳥人'],['狼'],['野蠻人'],['強盜'],['守衛'],['海盜'],['狼'],['逃兵','哈比鳥人']],[['梅杜莎'],['豬','狼'],['野蠻人'],['逃亡奴隸'],['護衛者'],['海盜'],['狼'],['叛國者','梅杜莎','哈比鳥人']],[['幽冥犬'],['黑豹','狼'],['北歐狂戰士'],['土匪'],['傭兵'],['走私販'],['狼'],['反抗者','梅杜莎','幽冥犬']],[['邁諾斯'],['熊','狼'],['汪達爾人'],['反叛者'],['貴族總管'],['寶藏獵人'],['狼'],['異教徒','邁諾斯','幽冥犬']]];
var location_npc_A = [[['嗜血羚羊','巫毒獵人'],['尼羅河巨鱷','巫毒獵人'],['莎曼','巫毒獵人'],['莎曼','巫毒獵人'],['莎曼','巫毒獵人'],['尼羅河巨鱷','巫毒獵人'],['魔毒蜘蛛','巫毒獵人'],['巫毒獵人'],['巫毒獵人']],[['嗜血羚羊','巫毒獵人'],['尼羅河巨鱷'],['莎曼','巫毒獵人'],['莎曼','巫毒獵人'],['莎曼'],['尼羅河巨鱷','巫毒獵人'],['魔毒蜘蛛','巫毒獵人'],['巫毒獵人'],['巫毒獵人']],[['獅子','噴毒眼鏡蛇'],['獅子','噴毒眼鏡蛇'],['持幟者','噴毒眼鏡蛇'],['持幟者','噴毒眼鏡蛇','巫毒戰士'],['巫毒戰士','噴毒眼鏡蛇'],['巫毒戰士','噴毒眼鏡蛇'],['帝王蠍','噴毒眼鏡蛇'],['巫毒獵人'],['巫毒獵人']]];
var location_npc_G = [[['古代紋虎','怒牙豬'],['戰熊','怒牙豬','古代紋虎'],['汪達爾人','古代紋虎','怒牙豬'],['戰熊','怒牙豬','古代紋虎'],['沼澤僵屍','索狄克','怒牙豬','古代紋虎'],['杜克里歐','古代紋虎','怒牙豬'],['汪達爾人','古代紋虎','怒牙豬'],['戰熊']],[['古代巨角獸','魔狼群'],['狼人','魔狼群'],['狼人','魔狼群'],['日耳曼人','魔狼群'],['不死祭司','魔狼群'],['日耳曼人','魔狼群'],['魔狼群','狼人'],['戰熊']]];

// 宣告內部參數
var underground_show_switch = GM_getValue(gameServer+".underground_show_switch", true);
var attack_counter_switch = GM_getValue(gameServer+".attack_counter_switch", true);
var location_underground_level_switch = GM_getValue(gameServer+".location_underground_level_switch", true);
var hide_location_info_switch = GM_getValue(gameServer+".hide_location_info_switch", true);
var show_location_npc_switch = GM_getValue(gameServer+".show_location_npc_switch", true);
var hide_jewel_switch = GM_getValue(gameServer+".hide_jewel_switch", "[1,0,0,1,1]");
var market_food_switch = GM_getValue(gameServer+".market_food_switch", 1);
var market_food_num = GM_getValue(gameServer+".market_food_num", 0);
var checkbox_helper_switch = GM_getValue(gameServer+".checkbox_helper_switch", false);
var overview_patch_switch = GM_getValue(gameServer+".overview_patch_switch", true);
var show_quickbar_switch = GM_getValue(gameServer+".show_quickbar_switch", true);
var show_localtime_switch = GM_getValue(gameServer+".show_localtime_switch", true);
var checkbox_helper_state = GM_getValue(gameServer+".checkbox_helper_state", "[1,1,1,1,1,1,1,0,1]");
var show_notebar_switch = GM_getValue(gameServer+".show_notebar_switch", true);
var show_report_detail_switch = GM_getValue(gameServer+".show_report_detail_switch", true);
var friend_list = GM_getValue(gameServer+".friend_list", "");

// CSS修正
GM_addStyle(<><![CDATA[
.headerHighscore{left:145px;}
.headerHonor{left:280px; top:4px}
.headerRes,#rubies{left:440px;}
#txt_msg{position:absolute; width:100px; height:24px; left:590px; top:7px; margin-right:3px; color: #000; font-family:"Verdana", serif; font-weight: bold; font-size:0.6em;}
]]></>.toXMLString());
var plugin = document.createElement("span");
plugin.setAttribute('class','topmenuitem');
plugin.setAttribute('style','margin-top:8px; font-size:12px');
plugin.innerHTML = "<a href='http://" + gameServer + "/game/index.php?mod=settings&plugin=1&" + sh + "' title='插件設定'><font color=red>插件設定</font></a>";
document.getElementById('header').appendChild(plugin);
//document.getElementById('header').innerHTML += "<span class='topmenuitem' style='margin-top:8px; font-size:12px'><a href='http://" + gameServer + "/game/index.php?mod=settings&plugin=1&" + sh + "' title='插件設定'>Plugin</a></span>";
// 時間函式
function Timeformat(time,type) {
	var d,M,y,h,m,s,fulltime;
	var week = ['日','一','二','三','四','五','六'];
	w = time.getDay();
	d = ((time.getDate())<10) ? ("0"+(time.getDate())) : (time.getDate());
	M = ((time.getMonth()+1)<10) ? ("0"+(time.getMonth()+1)) : (time.getMonth()+1);
	y = time.getFullYear();
	h = (time.getHours() < 10) ? ( "0" + time.getHours()) : time.getHours();
	m = (time.getMinutes() < 10) ? ( "0" + time.getMinutes()) : time.getMinutes();
	s = (time.getSeconds() < 10) ? ( "0" + time.getSeconds()) : time.getSeconds();
	fulltime = week[w] + ", " + d + "." + M + "." + y + " - " + h + ":" + m + ":" + s;
	halftime = h + ":" + m + ":" + s;
	if(type == 0) return fulltime;
	else return halftime;
}
// 時間函式2
function parsedate(date){
	date = date.substring(5,date.length);
	date = date.replace(/\n/g, '');
	date = date.replace(/  +/g, '');
	s=date.split(' - ');
	d=s[0].split('.');t=s[1].split(':');
	var dateresult = new Date(d[2],d[1]-1,d[0],t[0],t[1],t[2]);
	return dateresult;
}
// 時間函式3 - 回傳秒數
function parsesecond(time) {
	var n = time.split(':');
	time = (n[0]*60+n[1]*1)*60+n[2]*1;
	return time;
}

function URL_match(word) {
	if(current_url.indexOf(word + '=') == -1) return 0;
	var first = current_url.indexOf(word + '=')+word.length+1;
	var last_string = current_url.substring(first,current_url.length);
	return (last_string.indexOf("&") == -1)?current_url.substring(first,first+last_string.length):current_url.substring(first,first+last_string.indexOf("&"));
}
function cipher(id,times,type) { // 字串陣列編碼
	var data=[];
	for(var i=1; i<=times; i++) {
		if(type == 1) value = document.getElementById(id+i).checked?1:0;
		else value = document.getElementById(id+i).value;
		data.push(value);
	}
	return uneval(data);
}
function decipher(content) { // 字串陣列反編碼
	content = content.replace('[','').replace(']','');
	while(content.indexOf('"') != -1) {
		content = content.replace('"','');
	}
	while(content.indexOf(' ') != -1) {
		content = content.replace(' ','');
	}
	return content.split(',');
}
if(decipher(hide_jewel_switch)[0] == '1') { // 隱藏寶石商人
	for(var i=0; i< mainmenu.length; i++) {
		if(mainmenu[i].innerHTML == "寶石商人") mainmenu[i].setAttribute('style','display:none');
	}
}

var button=document.getElementsByTagName('input');
for(var i=0; i<button.length; i++) {
	if(decipher(hide_jewel_switch)[1] == '1' && button[i].getAttribute('value') == '立刻完成遠征')  //隱藏戰場寶石花費按鈕
		button[i].setAttribute('style','display:none;');
	else if(decipher(hide_jewel_switch)[2] == '1' && button[i].getAttribute('value') == '進入地下城')  //隱藏地下城寶石花費按鈕
		button[i].setAttribute('style','display:none;');
	else if(decipher(hide_jewel_switch)[3] == '1' && button[i].getAttribute('value') == '新物品上架')  //隱藏商店寶石花費按鈕
		button[i].setAttribute('style','display:none;');
	else if(decipher(hide_jewel_switch)[4] == '1' && button[i].getAttribute('value') == '買斷')  //隱藏拍賣場寶石花費按鈕
		button[i].setAttribute('style','display:none;');
}


var headerDiv1 = document.getElementById('charvalues').getElementsByTagName('div')[0];
var txt_msg = document.createElement("span");
txt_msg.setAttribute("id","txt_msg");
headerDiv1.appendChild(txt_msg);
txt_msg.innerHTML = "<font color=blue>PlugIn On</font>";

function show_quickbar(){ // This script was made by EnigmaBrand, modified by Botherlong
	moveup = GM_getResourceURL('moveup');
	movedown = GM_getResourceURL('movedown');
	movetrans = GM_getResourceURL('movetrans');
	delIcon = GM_getResourceURL('delIcon');
	renameIcon = GM_getResourceURL('renameIcon');

	unsafeWindow.places = GM_getValue(gameServer+".quickbar","0");
	var opened=0;

	// Create my div and append it to the body tag
	vquickbar = document.createElement("div");
	vquickbar.setAttribute("id", "quickbar");
	var body = document.getElementsByTagName("body");
	body[0].appendChild(vquickbar);

	// this function shows the tab when you mouseover it
	unsafeWindow.showquick = function() {
		if(document.getElementById("quickbar").style.left == "-252px") {
			document.getElementById("quickbar").style.left = "0px;"
			unsafeWindow.qbbuildinterior();
		}
		if(opened==0) {
			unsafeWindow.qbbuildinterior();
			opened=1;
		}
	}

	// this function closes the tab
	unsafeWindow.hidequick = function() {
		document.getElementById("quickbar").style.left = "-252px;"
	}

	// this function deletes a quickmark
	unsafeWindow.qbdeleteentry = function(deleteme) {
		deleteme = deleteme.slice(0,-1);
		var splitplaces = unsafeWindow.places.split(/;/);
		for(i = 0; i < splitplaces.length-1; i++){
			if(splitplaces[i] == deleteme){
				splitplaces.splice(i,1);
				break;
			}
		}
		if(splitplaces.length-1 > 0) unsafeWindow.places = splitplaces.join(';');
		else unsafeWindow.places = "0";
		window.setTimeout(GM_setValue, 0, gameServer+".quickbar", unsafeWindow.places);
		unsafeWindow.qbbuildinterior();
	}

	// this function renames one of your quickmarks
	unsafeWindow.qbrenameentry = function(renameme) {
		var renameto = prompt("重新命名捷徑:","");
		if((renameto == '') || (renameto == '^') || (renameto == ';')) {
			alert("無效名稱! 不能空白或有 ^ 或 ; 符號!");
			return;
		}
		renameme = renameme.slice(0,-1);
		var splitplaces = unsafeWindow.places.split(/;/);
		var splitpiece = '';
		for(i = 0; i < splitplaces.length-1; i++){
			if(splitplaces[i] == renameme) {
				splitpiece = splitplaces[i].split('|');
				splitplaces[i] = renameto + '|' + splitpiece[1];
				break;
			}
		}
		if(splitplaces.length-1 > 0) unsafeWindow.places = splitplaces.join(';');

		window.setTimeout(GM_setValue, 0, gameServer+".quickbar", unsafeWindow.places);
		unsafeWindow.qbbuildinterior();
	}

	// this function adds a new entry to your quickmark list
	unsafeWindow.qbaddentry = function() {
		
		var addname = prompt("你想要取什麼名字?","");
		if((addname.search(/\|/) != -1) || (addname.search(/;/) != -1)) {
			alert('無效名稱! 不能空白或有 | 或 ; 符號!');
			exit;
		}
		var addlocation = window.location.href;
		if(addlocation.indexOf('sh=') != -1) addlocation = addlocation.substring(0,addlocation.indexOf('sh='));
		while(addname.indexOf('null') != -1) {
			addname = addname.replace('null','');
		}
		if(unsafeWindow.places != "0") unsafeWindow.places += addname + '|' + addlocation + ';';
		else unsafeWindow.places = addname + '|' + addlocation + ';';
		window.setTimeout(GM_setValue, 0, gameServer+".quickbar", unsafeWindow.places);
		unsafeWindow.qbbuildinterior();
	}

	// this function deletes all of your quickmarks
	unsafeWindow.qbdeleteall = function() {
		if(confirm("你確定要刪除全部的捷徑?")) {
			unsafeWindow.places = "0";
			window.setTimeout(GM_setValue, 0, gameServer+".quickbar", "0");		
		}
		unsafeWindow.qbbuildinterior();
	}

	// this function moves one of your quickmarks down 1 in the list
	unsafeWindow.qbmovedown = function(moveitdown) {
		moveitdown = moveitdown.slice(0,-1);
		var splitplaces = unsafeWindow.places.split(/;/);
		for(i = 0; i < splitplaces.length-1; i++){
			if(splitplaces[i] == moveitdown) {
				if(i<splitplaces.length-1) {
					splitplaces[i] = splitplaces[i+1];
					splitplaces[i+1] = moveitdown;
					break;
				} else {
					alert("這個捷徑已經是最後一個了.");
					break;
				}
			}
		}
		unsafeWindow.places = splitplaces.join(';');
		window.setTimeout(GM_setValue, 0, gameServer+".quickbar", unsafeWindow.places);
		unsafeWindow.qbbuildinterior();
	}


	// this function moves one of your quickmarks up 1 in the list
	unsafeWindow.qbmoveup = function(moveitup) {
		moveitup = moveitup.slice(0,-1);
		var splitplaces = unsafeWindow.places.split(/;/);
		var moveitdown = '';
		for(i = 0; i < splitplaces.length-1; i++){
			if(splitplaces[i] == moveitup) {
				if(i<splitplaces.length-1) {
					splitplaces[i] = splitplaces[i-1];
					splitplaces[i-1] = moveitup;
					break;
				}
				else {
					alert("這個捷徑已經是第一個了.");
					break;
				}
			}
		}
		unsafeWindow.places = splitplaces.join(';');
		window.setTimeout(GM_setValue, 0, gameServer+".quickbar", unsafeWindow.places);
		unsafeWindow.qbbuildinterior();
	}

	// this function builds the innerHTML of the tab without a page reload
	unsafeWindow.qbbuildinterior = function()
	{
		var qbHTML = '<div id="quicktab" onmouseover="javascript:showquick()" onclick="javascript:hidequick()"></div>';
		qbHTML += '<div id="qhead"><a style="border-bottom:1px #542C0F dotted; color: #542C0F;" href="http://userscripts.org/users/55264/scripts" title="本script修改自Ikiariam Quickbar v1.6">本script修改自IQ v1.6</a></div>';
		qbHTML += '<div id="qplaces">';

		// Build the places list
		if(unsafeWindow.places != "0") {
			qbHTML += '<div style="border-bottom:1px #F3DDB5 solid; width:216px; margin-top:3px; height:265px; overflow-y:auto; overflow-x:hidden;"><table style="width:215px; border: none;">';
			var placepiece = '';
			var splitplaces = unsafeWindow.places.split(";");
			for(i = 0; i < splitplaces.length-1; i++){
				placepiece = splitplaces[i].split("|");
				qbHTML += '<tr>';
				qbHTML += '<td width="30%" align="right" valign="bottom">';
				if(i>0) qbHTML += '<a title="上移" href="javascript:qbmoveup(\'' + placepiece[0] + '|' + placepiece[1] + ';\');"><img src="' + moveup + '" border="0"></a>';
				else qbHTML += '<img src="' + movetrans + '" width="10" height="10" border="0">';

				if(i<splitplaces.length-2) qbHTML += '<a title="下移" href="javascript:qbmovedown(\'' + placepiece[0] + '|' + placepiece[1] + ';\');"><img src="' + movedown + '" border="0"></a>';
				else qbHTML += '<img src="' + movetrans + '" height="10" width="10" border="0">';

				qbHTML += '<a title="刪除捷徑" href="javascript:qbdeleteentry(\'' + placepiece[0] + '|' + placepiece[1] + ';\');"><img src="' + delIcon + '" border="0"></a>';
				qbHTML += ' <a title="變更捷徑" href="javascript:qbrenameentry(\'' + placepiece[0] + '|' + placepiece[1] + ';\');"><img src="' + renameIcon + '" border="0"></a> - </td>';
				qbHTML += '<td align="left" width="80%" valign="bottom">&nbsp;<a href="' + placepiece[1] + sh + '">' + placepiece[0] + '</a></td>';
				qbHTML += '</tr>';
			}
			qbHTML += '</table></div>';
		}
		else qbHTML += '<div style="border-bottom:1px #F3DDB5 solid; width:216px; height:265px; overflow-y:auto; overflow-x:hidden;"><table style="width:215px; border: none;"><tr><td align="center">沒有任何資料</td></tr></table></div>';

		qbHTML += '<font size=2><a href="javascript:qbaddentry();">將此頁面加入捷徑</a>　　<a href="javascript:qbdeleteall();">刪除全部捷徑</a></font>';
		qbHTML += '<br><span onclick=window.open("http://acedia0915.blogspot.com/","_blank","") style="cursor:pointer; color:#735227; text-decoration:none; font-size:16px;"><b>>造訪BLOG<</b></span></div>';
		qbHTML += '<div id="qfoot"></div>';
		document.getElementById("quickbar").innerHTML = qbHTML;
	}

	// Add the style
	GM_addStyle("#quickbar { width:250px; position:fixed; left:-252px; height:350px; top:215px; z-index: 500; background:url(http://botherlong.net/gladiatus/img/bgnotebarmid.gif); background-repeat:repeat-y; border:1px black solid;}");
	GM_addStyle("#qhead { height:30px; width:250px; position:absolute; left:0px; top:0px; background:url(http://botherlong.net/gladiatus/img/bgnotebartop.gif); line-height:38px; font-weight:bold; font-size:11px;} ");
	GM_addStyle("#quickbar:hover { left:0px; }");
	GM_addStyle("#qfoot { width:250px; height:3px; background:url(http://botherlong.net/gladiatus/img/bgnotebarbot.gif); position:absolute; bottom:0px; left:0px;}");
	GM_addStyle("#quicktab { z-index:496; background:url(http://botherlong.net/gladiatus/img/tabquickbar.png); width:26px; height:100px; position:absolute; right:-26px; top:0px; } ");
	GM_addStyle("#quicktab:hover { cursor: pointer; } ");
	GM_addStyle("#qplaces { position:absolute; top:30px; bottom:3px; left:15px; overflow:auto; } ");

	document.getElementById("quickbar").innerHTML = '<div id="quicktab" onmouseover="showquick()" onclick="hidequick()"></div>';
}
if(show_quickbar_switch) show_quickbar();
function show_notebar() {
	var mynotes = GM_getValue(gameServer+".notebar", "按此寫入筆記!");
	vnotebar = document.createElement("div");
	vnotebar.setAttribute("id", "notebar");
	var body = document.getElementsByTagName("body");
	body[0].appendChild(vnotebar);
	
	unsafeWindow.savenotes = function() {
		window.setTimeout(GM_setValue, 0, gameServer+".notebar", document.getElementById("notes").value);
	}
	unsafeWindow.startnotes = function() {
		if(document.getElementById("notes").value == "按此寫入筆記!") document.getElementById("notes").value = "";
	}
	unsafeWindow.shownotes = function() {
		if(document.getElementById("notebar").style.left == "-252px") document.getElementById("notebar").style.left = "0px";
	}
	unsafeWindow.hidenotes = function() {
		document.getElementById("notebar").style.left = "-252px";
	}

	// Add the style to the notebar and put the code into it
	GM_addStyle("#notebar { width:250px; position:fixed; left:-252px; height:350px; top:115px; z-index: 50; background:url(http://botherlong.net/gladiatus/img/bgnotebarmid.gif); background-repeat:repeat-y; border:1px black solid;}");
	GM_addStyle("#nhead { height:30px; width:250px; position:absolute; left:0px; top:0px; background:url(http://botherlong.net/gladiatus/img/bgnotebartop.gif); line-height:38px; font-weight:bold; font-size:11px;} ");
	GM_addStyle("#notebar:hover { left:0px; }");
	GM_addStyle("#nfoot { width:250px; height:3px; background:url(http://botherlong.net/gladiatus/img/bgnotebarbot.gif); position:absolute; bottom:0px; left:0px;}");
	GM_addStyle("#notes { position: absolute; top:31px; left:29px; right:3px; bottom:3px; background: #FDF7DD; border:none; font-size: 11px; padding:3px; } ");
	GM_addStyle("#notetab { background:url(http://botherlong.net/gladiatus/img/tabnotebar.png); width:26px; height:100px; position:absolute; right:-26px; top:0px; z-index:495; } ");
	GM_addStyle("#notetab:hover { cursor: pointer; } ");

	var nbHTML = '<div id="notetab" onmouseover="shownotes()" onclick="hidenotes()"></div>';
	nbHTML += '<div id="nhead"><a style="border-bottom:1px #542C0F dotted; color: #542C0F;" href="http://userscripts.org/users/55264/scripts" title="本script修改自Ikiariam Notebar v1.9">本script修改自IN v1.9</a></div>';
	nbHTML += '<textarea id="notes" cols="25" wrap="soft" rows="21" onkeyup="savenotes()" onclick="startnotes()">'+mynotes+'</textarea>';
	nbHTML += '<span onclick=window.open("http://acedia0915.blogspot.com/","_blank","") style="cursor:pointer; color:#735227; text-decoration:none; font-size:16px; position:absolute; bottom:3px; left:80px;"><b>>造訪BLOG<</b></span></div>';
	nbHTML += '<div id="nfoot"></div>';
	document.getElementById("notebar").innerHTML = nbHTML;
}
if(show_notebar_switch) show_notebar();

switch(current_mod){
	case "overview": //概況
		if(URL_match('submod') == 'stats' && underground_show_switch) underground_show();
		if(!URL_match('submod') && (!URL_match('doll') || URL_match('doll') == 1) && overview_patch_switch) overview_patch();
		break;
	case "messages": // 訊息
		if(show_localtime_switch) localtime_show();
		if(checkbox_helper_switch && document.getElementsByTagName('form')[0].innerHTML.indexOf('沒有訊息') == -1 && (!URL_match('submod') || URL_match('submod') == 'show')) checkbox_helper();
		if(attack_counter_switch) attack_counter();
		break;
	case "packages": // 包裹
		break;
	case "report": // 戰鬥報告
		break;
	case "ally": // 公會
		break;
	case "highscore": // 排行榜
		if(URL_match('t') > 1 && underground_show_switch) underground_show();
		if(!URL_match('t') && !URL_match('submod')) prominent_friend_list();
		break;
	case "map": // 地圖
		break;
	case "work": // 馬廄
		break;
	case "arena": // 競技場
		break;
	case "player": //玩家
		if(!URL_match('submod') && (!URL_match('doll') || URL_match('doll') == 1) && overview_patch_switch) overview_patch();
		break;
	case "tavern": // 酒館
		break;
	case "training": // 訓練
		break;
	case "inventory": // 商店
		break;
	case "premium": //寶石商人
		break;
	case "auction": // 拍賣
		prominent_friend_list();
		break;
	case "market": // 市場
		if(market_food_switch != '0') market_food();
		prominent_friend_list();
		break;
	case "location": // 探險
		if(URL_match('&d')) upload_npc();
		if(location_underground_level_switch) location_underground_level();
		if(!URL_match('dungeon') && document.getElementsByTagName('label')[0].innerHTML.substring(0,4) == '遠征點數') location_show_npc();
		break;
	case "underground": // 遁世者
		break;
	case "powerups": // 契約
		break;
	case "settings": // 個人資料
		if(URL_match('plugin')) plugin_setting();
		break;
	default:
		return;
}

/************************************************************/
/*********************** 全域函式結束 ***********************/
/************************************************************/

function savesetting(){ // 插件設定儲存
	var server = document.getElementById('hiddenserver').value;
	GM_setValue((server+".underground_show_switch"), (document.getElementById('underground_show_switch').checked));
	GM_setValue((server+".attack_counter_switch"), (document.getElementById('attack_counter_switch').checked));
	GM_setValue((server+".location_underground_level_switch"), (document.getElementById('location_underground_level_switch').checked));
	GM_setValue((server+".hide_location_info_switch"), (document.getElementById('hide_location_info_switch').checked));
	GM_setValue((server+".show_location_npc_switch"), (document.getElementById('show_location_npc_switch').checked));
	GM_setValue((server+".hide_jewel_switch"), cipher('hide_jewel_switch',5,1));
	GM_setValue((server+".market_food_switch"), (document.getElementById('market_food_switch').value));
	GM_setValue((server+".market_food_num"), (document.getElementById('market_food_num').value));
	GM_setValue((server+".checkbox_helper_switch"), (document.getElementById('checkbox_helper_switch').checked));
	GM_setValue((server+".overview_patch_switch"), (document.getElementById('overview_patch_switch').checked));
	GM_setValue((server+".show_quickbar_switch"), (document.getElementById('show_quickbar_switch').checked));
	GM_setValue((server+".show_localtime_switch"), (document.getElementById('show_localtime_switch').checked));
	GM_setValue((server+".show_notebar_switch"), (document.getElementById('show_notebar_switch').checked));
	GM_setValue((server+".checkbox_helper_state"), cipher('checkbox_helper_state',9,1));
	GM_setValue((server+".show_report_detail_switch"), (document.getElementById('show_report_detail_switch').checked));

	window.location.href = window.location.href;
}
function resetsetting(){ // 插件回覆原始設定
	var server = document.getElementById('hiddenserver').value;
	GM_setValue((server+".underground_show_switch"), true);
	GM_setValue((server+".attack_counter_switch"), true);
	GM_setValue((server+".location_underground_level_switch"), true);
	GM_setValue((server+".hide_location_info_switch"), true);
	GM_setValue((server+".show_location_npc_switch"), true);
	GM_setValue((server+".hide_jewel_switch"), "[1,0,0,1,1]");
	GM_setValue((server+".market_food_switch"), 1);
	GM_setValue((server+".market_food_num"), 0);
	GM_setValue((server+".checkbox_helper_switch"), false);
	GM_setValue((server+".overview_patch_switch"), true);
	GM_setValue((server+".show_quickbar_switch"), true);
	GM_setValue((server+".show_localtime_switch"), true);
	GM_setValue((server+".checkbox_helper_state"), "[1,1,1,1,1,1,1,0,1]");
	GM_setValue((server+".show_notebar_switch"), true);
	GM_setValue((server+".show_report_detail_switch"), true);
	
	window.location.href = window.location.href;
}
function savesetting2(){ // 插件設定儲存2
	var server = document.getElementById('hiddenserver').value;
	var friend_name = document.getElementById('friend_name').value;
	var friend_type = document.getElementById('friend_type').value;
	if(!friend_name || friend_name.indexOf(',') != -1 || friend_name.indexOf(':') != -1 || friend_name.indexOf(' ') != -1) {
		alert('無效名稱! 不能空白或有 , 或 : 符號!');
		return;
	}
	var check = 0;
	var friend_list_name = new Array();
	var friend_list_type = new Array();
	var friend_list = GM_getValue(gameServer+".friend_list", "");
	var friend_lists = friend_list.split(',');
	for(var i=0; i<friend_lists.length; i++) {
		friend_list_name.push(friend_lists[i].split(':')[0]);
		friend_list_type.push(friend_lists[i].split(':')[1]);
	}
	for(var i=0; i<friend_list_name.length; i++) {
		if(friend_name == friend_list_name[i]) {
			if(friend_type == friend_list_type[i]) return;
			else {
				friend_list = friend_list.substring(0,friend_list.indexOf(friend_name)+friend_name.length+1)+friend_type+friend_list.substring(friend_list.indexOf(friend_name)+friend_name.length+2,friend_list.length);
				check = 1;
			}
		}
	}
	if(!friend_list) friend_list = friend_name+':'+friend_type;
	else if(check == 0) friend_list = friend_list+','+friend_name+':'+friend_type;
	GM_setValue((server+".friend_list"), friend_list);
	window.location.href = window.location.href;
}

function plugin_setting() { // 插件設定
	var butjava = "\"javascript: this.value = !this.value\"";
	function togglecheck(str) {
		return (str == true)?"checked=\"checked\"":"";
	}
	function optioncheck(value,str) {
		return (value == str)?"selected='selected'":"";
	}
	document.getElementById('contentBox').getElementsByTagName('td')[1].getElementsByTagName('span')[0].innerHTML = "插件設定";
	document.getElementById('contentBox').getElementsByTagName('td')[1].getElementsByTagName('div')[1].setAttribute('class','tab');
	document.getElementById('contentBox').getElementsByTagName('td')[1].getElementsByTagName('div')[1].setAttribute('style','');
	document.getElementById('contentBox').getElementsByTagName('td')[1].getElementsByTagName('div')[1].innerHTML = '<a href="index.php?mod=settings&plugin=2&' + sh + '" style="height:22px">好友名單設定</a>';
	document.getElementsByTagName('form')[0].getElementsByTagName('div')[0].setAttribute('style','display:none;');
	
	var settingtable = document.createElement('table');
	settingtable.width = "92%";
	settingtable.setAttribute('style','margin:20px;');
  if(URL_match('plugin') == 1) {
	settingtable.innerHTML = 
	"<tr><td class=\"c\" colspan=\"2\"><h1>插件</h1><div style='text-align:right;'>版本："+version+"</div></td></tr>"+
	"<tr><td class=\"c\" colspan=\"2\"><h2>基礎功能設定</h2></td></tr>"+
	"<tr><th>概況頁面補強<br>詳細說明：在概況頁面直接顯示生命、經驗、防禦</th><th><input type=\"checkbox\" id=\"overview_patch_switch\" value=\""+overview_patch_switch+"\" "+togglecheck(overview_patch_switch)+" onclick="+butjava+"></th></tr>"+
	"<tr><td class=\"c\" colspan=\"2\"><hr></td></tr>"+
	"<tr><th>攻擊次數統計<br>詳細說明：在訊息頁面加入攻擊次數的統計</th><th><input type=\"checkbox\" id=\"attack_counter_switch\" value=\""+attack_counter_switch+"\" "+togglecheck(attack_counter_switch)+" onclick="+butjava+"></th></tr>"+
	"<tr><td class=\"c\" colspan=\"2\"><hr></td></tr>"+
	"<tr><th>顯示戰報細節<br>詳細說明：在訊息頁面加入戰報中獲得的金錢和經驗</th><th><input type=\"checkbox\" id=\"show_report_detail_switch\" value=\""+show_report_detail_switch+"\" "+togglecheck(show_report_detail_switch)+" onclick="+butjava+"></th></tr>"+
	"<tr><td class=\"c\" colspan=\"2\"><hr></td></tr>"+
	"<tr><th>訊息頁顯示本地時間</th><th><input type=\"checkbox\" id=\"show_localtime_switch\" value=\""+show_localtime_switch+"\" "+togglecheck(show_localtime_switch)+" onclick="+butjava+"></th></tr>"+
	"<tr><td class=\"c\" colspan=\"2\"><hr></td></tr>"+
	"<tr><th>訊息頁面加入全部選取按鈕<br>"+checkbox_list()+"<br>詳細說明：勾選的選項會被選取</th><th><input type=\"checkbox\" id=\"checkbox_helper_switch\" value=\""+checkbox_helper_switch+"\" "+togglecheck(checkbox_helper_switch)+" onclick="+butjava+"></th></tr>"+
	"<tr><td class=\"c\" colspan=\"2\"><hr></td></tr>"+
	"<tr><th>地下城說明<br>詳細說明：在概況統計頁面和排行榜地下城頁面加入地下城位置和等級</th><th><input type=\"checkbox\" id=\"underground_show_switch\" value=\""+underground_show_switch+"\" "+togglecheck(underground_show_switch)+" onclick="+butjava+"></th></tr>"+
	"<tr><td class=\"c\" colspan=\"2\"><hr></td></tr>"+
	"<tr><th>探險地圖顯示地下城等級</th><th><input type=\"checkbox\" id=\"location_underground_level_switch\" value=\""+location_underground_level_switch+"\" "+togglecheck(location_underground_level_switch)+" onclick="+butjava+"></th></tr>"+
	"<tr><td class=\"c\" colspan=\"2\"><hr></td></tr>"+
	"<tr><th>隱藏地圖敘述</th><th><input type=\"checkbox\" id=\"hide_location_info_switch\" value=\""+hide_location_info_switch+"\" "+togglecheck(hide_location_info_switch)+" onclick="+butjava+"></th></tr>"+
	"<tr><td class=\"c\" colspan=\"2\"><hr></td></tr>"+
	"<tr><th>顯示地圖怪物</th><th><input type=\"checkbox\" id=\"show_location_npc_switch\" value=\""+show_location_npc_switch+"\" "+togglecheck(show_location_npc_switch)+" onclick="+butjava+"></th></tr>"+
	"<tr><td class=\"c\" colspan=\"2\"><hr></td></tr>"+
	"<tr><th>怪物資料上傳（已停止）<br>詳細說明：戰鬥時自動將怪物資料上傳，並蒐集資訊</th><th><input type=\"checkbox\" checked disabled></th></tr>"+
	"<tr><td class=\"c\" colspan=\"2\"><hr></td></tr>"+
	"<tr><th>市場顯示食物的比例<br>詳細說明：狀態一：補血量除以價位(越高越好)<br>　　　　　狀態二：價位除以補血量(越低越好)<br><font color=blue>狀態一的過濾功能是高於數值變色，狀態二是低於數值變色</font></th><th><select id='market_food_switch'><option value=0 "+optioncheck(0,market_food_switch)+">關閉</option><option value=1 "+optioncheck(1,market_food_switch)+">狀態一</option><option value=2 "+optioncheck(2,market_food_switch)+">狀態二</option></select><div align=center style='font-size:12px; font-weight: 100;'>過濾：<input type='text' id='market_food_num' value="+market_food_num+" size=2 maxlength=4></div></th></tr>"+
	"<tr><td class=\"c\" colspan=\"2\"><hr></td></tr>"+
	"<tr><th>顯示捷徑選單</th><th><input type=\"checkbox\" id=\"show_quickbar_switch\" value=\""+show_quickbar_switch+"\" "+togglecheck(show_quickbar_switch)+" onclick="+butjava+"></th></tr>"+
	"<tr><td class=\"c\" colspan=\"2\"><hr></td></tr>"+
	"<tr><th>顯示筆記選單</th><th><input type=\"checkbox\" id=\"show_notebar_switch\" value=\""+show_notebar_switch+"\" "+togglecheck(show_notebar_switch)+" onclick="+butjava+"></th></tr>"+
	"<tr><td class=\"c\" colspan=\"2\"><hr></td></tr>"+
		
	"<tr><td class=\"c\" colspan=\"2\"><h2>隱藏寶石花費設定</h2></td></tr>"+jewel_list()+

	"<tr><th colspan=\"2\" align='center'><input type=\"button\" id=\"savesetting\" class='button2' value=\"儲存\">　　<input type=\"button\" id=\"resetsetting\" class='button2' value=\"回覆原始設定\"></th></tr><input id=\"hiddenserver\" type=\"hidden\" value=\""+gameServer+"\"></th></tr>;";

	document.getElementsByTagName('form')[0].appendChild(settingtable);
	document.getElementById("savesetting").addEventListener("click", savesetting, false);
	document.getElementById("resetsetting").addEventListener("click", resetsetting, false);
  	} else if(URL_match('plugin') == 2) {
	document.getElementById('contentBox').getElementsByTagName('td')[1].getElementsByTagName('div')[0].setAttribute('class','tab');
	document.getElementById('contentBox').getElementsByTagName('td')[1].getElementsByTagName('div')[0].innerHTML = '<a href="index.php?mod=settings&plugin=1&' + sh + '" style="height:22px">插件設定</a>';
	document.getElementById('contentBox').getElementsByTagName('td')[1].getElementsByTagName('div')[1].setAttribute('class','tab_aktive');
	document.getElementById('contentBox').getElementsByTagName('td')[1].getElementsByTagName('div')[1].innerHTML = '<span>好友名單設定</span>';
 	settingtable.innerHTML = 
	"<tr><td class=\"c\" colspan=\"4\"><h1>插件</h1><div style='text-align:right;'>版本: "+version+"</div></td></tr>"+
	"<tr><td class=\"c\" colspan=\"4\"><h2>好友名單設定<font color=blue>(好友顯示紫色，壞人顯示紅色)</font></h2></td></tr>"+show_friend_list()+
	"<tr><td class=\"c\" colspan=\"4\"><font color=blue>PS:此程式不會自己判斷名單內玩家是否存在，建議不要隨意輸入不存在的角色，名單越多會造成讀取越慢！已經是同盟的將不會有影響</font></td></tr>"+
	"<tr><td class=\"c\" colspan=\"4\"><hr></td></tr>"+
	"<tr><th colspan=\"4\" align='center'>加入名單：<input type='text' id='friend_name' size=20 maxlength=20>　<select id='friend_type'><option value=1>好友</option><option value=2>壞人</option></select>　　<input type=\"button\" id=\"savesetting2\" class='button2' value=\"加入\"></th></tr><input id=\"hiddenserver\" type=\"hidden\" value=\""+gameServer+"\"></th></tr>";
	document.getElementsByTagName('form')[0].appendChild(settingtable);
	document.getElementById("savesetting2").addEventListener("click", savesetting2, false);
  }
	function jewel_list() {
		var content = '';
		var explain = ['隱藏寶石商人選項','隱藏戰場寶石花費按鈕','隱藏地下城寶石花費按鈕','隱藏商店寶石花費按鈕','隱藏拍賣場寶石花費按鈕'];
		var state = decipher(hide_jewel_switch);
		for(var i=1; i<=5; i++) {
			content += "<tr><th>"+explain[i-1]+"</th><th><input type=\"checkbox\" id=\"hide_jewel_switch"+i+"\" value=\""+state[i-1]+"\" "+togglecheck(state[i-1])+" onclick="+butjava+"></th></tr>"+
			"<tr><td class=\"c\" colspan=\"2\"><hr></td></tr>";
		}
		return content;
	}
	function checkbox_list() {
		var content = '';
		var checkbox_state=['玩家','公會','市場','拍賣場','遠征','打工','地下城','PK','其它'];
		var state = decipher(checkbox_helper_state);
		for(var i=1; i<=9; i++) {
			content += checkbox_state[i-1]+" <input type=\"checkbox\" id=\"checkbox_helper_state"+i+"\" value=\""+state[i-1].replace(' ','')+"\" "+togglecheck(state[i-1].replace(' ',''))+" onclick="+butjava+">　　";
		}
		return content;
	}
	function show_friend_list() {
		var friend_list = GM_getValue(gameServer+".friend_list", "");
		if(!friend_list) return '無好友名單！';
		unsafeWindow.delfriend = function(name) {
			if(friend_list.indexOf(',') == -1) unsafeWindow.new_friend_list = friend_list.replace(name,"");
			else if(friend_list.indexOf(name) == 0) unsafeWindow.new_friend_list = friend_list.replace(name+",","");
			else unsafeWindow.new_friend_list = friend_list.replace(","+name,"");
			window.setTimeout(GM_setValue, 0, gameServer+".friend_list", unsafeWindow.new_friend_list);
			window.location.href = window.location.href;
		}
		var friend_list_name = new Array();
		var friend_list_type = new Array();
		friend_lists=friend_list.split(',');
		for(var i=0; i<friend_lists.length; i++) {
			friend_list_name.push(friend_lists[i].split(':')[0]);
			friend_list_type.push(friend_lists[i].split(':')[1]);
		}
		var content = '';
		for(var i=0; i<friend_list_name.length; i++) {
			if(i%2 == 0) content += '<tr>';
			if(friend_list_type[i] == 1) content += '<td width=40%><span style="color:purple;font-weight:bold;">'+friend_list_name[i]+'</td><td width=10%><a title="刪除名單" href="javascript:delfriend(\'' + friend_list_name[i] + ':' + friend_list_type[i] + '\');">刪除</a></td>';
			else content += '<td width=40%><span style="color:red;font-weight:bold;">'+friend_list_name[i]+'</td><td width=10%><a title="刪除名單" href="javascript:delfriend(\'' + friend_list_name[i] + ':' + friend_list_type[i] + '\');">刪除</a></td>';
		}
		return content;
	}
}

function attack_counter() { // 顯示24小時內攻擊與被攻擊的次數
	var page=current_url.substring(current_url.indexOf("p=")+2,current_url.indexOf("&sh"));
	if(current_url.indexOf("p=")!=-1 && page != 1) return; //除第一頁其餘不判斷

	var players = new Array();
	var counts = new Array();
	var checks = new Array();
	players[0] = new Array(); players[1] = new Array();
	counts[0] = new Array(); counts[1] = new Array();
	checks[0] = new Array(); checks[1] = new Array();

	function playeradd(name, type) {	// 紀錄被攻擊者姓名次數
		for(var n=0;n<players[type].length;n++) {
			if(players[type][n] == name) {
				counts[type][n]++;
				checks[type][n]++;
				return;
			}
		}
		players[type].push(name);
		counts[type].push(1);
		checks[type].push(1);
	}

	function requestLevel(href,onload) {// 回傳對方等級
	    GM_xmlhttpRequest({
	      method:'POST',
	      url:'http://' + gameServer + '/game/index.php?' + href,
	      headers: {
	        'Content-type': 'application/x-www-form-urlencoded',
	      },
	      onload:onload
		});
	}

	var reports = document.getElementsByTagName('form')[0].getElementsByTagName('tr');

	for(var i=1; i<reports.length-3; i++) { //統計次數
		var cells = reports[i].getElementsByTagName('td');
		var date = cells[1].innerHTML;
		if(cells[1].innerHTML.indexOf('<div') != -1) date = cells[1].innerHTML.substring(0,cells[1].innerHTML.indexOf('<div'));
		date = parsedate(date,0);
		now = new Date();
		if((now.getTime() - (1000*60*60*6) - date.getTime()) < (1000*60*60*24)) {
			if(reports[i].innerHTML.indexOf('<textarea') != -1) {
				i += 3;
				continue;
			}
			else if(cells[2].innerHTML.indexOf('工會訊息來自：') != -1) continue;
			else if(cells[2].innerHTML.indexOf("競技場內") != -1) {
				name=cells[2].getElementsByTagName('a')[0].innerHTML;
				name=name.substring(name.indexOf(" ")+1,name.lastIndexOf(" "));
				if(cells[2].innerHTML.indexOf("指名") == -1) playeradd(name,0);
				else playeradd(name,1);
				cells[1].innerHTML = "<b>" + cells[1].innerHTML + "</b>";
			}
		} else break;
	}
	var rows=i;
	for(var i=1;i<rows;i++) {	// 寫入結果
		if(reports[i].getElementsByTagName('td').length != 3) continue;
		var cell = reports[i].getElementsByTagName('td')[2];
		if(!cell.getElementsByTagName('a')[0]) continue;
		
		string=cell.getElementsByTagName('a')[0].innerHTML;
		name=string.substring(string.indexOf(" ")+1,string.lastIndexOf(" "));
		href=cell.getElementsByTagName('a')[0].getAttribute('href');
		href=href.substring(10,href.length);
		
		var type=(cell.innerHTML.indexOf("指名") == -1)?0:1;
		var fonttype = ["b","i"];

		for(var n=0;n<players[type].length;n++) {
			if(players[type][n] == name) {
				if(counts[type][n]<2) cell.innerHTML += "<" + fonttype[type] +"><font color=green>[ " + counts[type][n] + " ]</font></" + fonttype[type] +">";
				else if(counts[type][n]<5) cell.innerHTML += "<" + fonttype[type] +"><font color=blue>[ " + counts[type][n] + " ]</font></" + fonttype[type] +">";
				else cell.innerHTML += "<" + fonttype[type] +"><font color=red>[ " + counts[type][n] + " ]</font></" + fonttype[type] +">";
				if(checks[type][n] == counts[type][n]) {
					requestLevel(href,function(response) {
					  	var all = document.createElement("div");
						all.innerHTML = response.responseText;
						href1 = response.finalUrl.substring(response.finalUrl.indexOf('?')+1,response.finalUrl.length);
						for(var i=1;i<rows+1;i++) {
							if(reports[i].getElementsByTagName('td').length != 3) continue;
							var cell = reports[i].getElementsByTagName('td')[2];
							if(!cell.getElementsByTagName('a')[0]) continue;
							href2 = cell.innerHTML.substring(cell.innerHTML.indexOf('?')+1,cell.innerHTML.indexOf('">'));
							while(href2.indexOf('amp;') != -1) {
								href2 = href2.replace('amp;','');
							}
							if(href1 == href2) {
								if(cell.innerHTML.indexOf("指名") == -1) {
									namecolor="purple";
									var enemyname = all.getElementsByTagName('span')[21].innerHTML; // 戰報中對手(防禦方)姓名的位置
									var enemylevel = all.getElementsByTagName('span')[53].innerHTML; // 戰報中對手(防禦方)等級的位置
								} else {
									namecolor="#196D8C";
								  	var enemyname = all.getElementsByTagName('span')[20].innerHTML; // 戰報中對手(攻擊方)姓名的位置
									var enemylevel = all.getElementsByTagName('span')[23].innerHTML; // 戰報中對手(攻擊方)等級的位置
								}
								string = cell.getElementsByTagName('a')[0].innerHTML;
								name = string.substring(string.indexOf(" ")+1,string.lastIndexOf(" "));
								var abslevel = Math.abs(enemylevel-mylevel);
								newstring=string.substring(0,string.indexOf(" ")+1) + "<b><font color=" + namecolor +">" + name + "</font></b> (" + enemylevel + ",<font color=black><b>" + abslevel + "</b></font>)" + string.substring(string.lastIndexOf(" "),string.length);
								var count = cell.innerHTML.substring(cell.innerHTML.lastIndexOf("[ ")+2,cell.innerHTML.lastIndexOf(" ]"));
								if(abslevel > 9) {
									newstring=string.substring(0,string.indexOf(" ")+1) + "<b><font color=" + namecolor +">" + name + "</font></b> (" + enemylevel + ",<font color=red><b>" + abslevel + "</b></font>)" + string.substring(string.lastIndexOf(" "),string.length);
									if(count >= 2) cell.innerHTML = cell.innerHTML.replace("blue","red");
									if(count > 2) cell.innerHTML = cell.innerHTML.substring(0,cell.innerHTML.lastIndexOf("[ ")+2) + "過度" + cell.innerHTML.substring(cell.innerHTML.lastIndexOf(" ]"),cell.innerHTML.length);
								} else{
									if(count > 5) cell.innerHTML = cell.innerHTML.substring(0,cell.innerHTML.lastIndexOf("[ ")+2) + "過度" + cell.innerHTML.substring(cell.innerHTML.lastIndexOf(" ]"),cell.innerHTML.length);
								}
								cell.getElementsByTagName('a')[0].innerHTML=newstring;
								break;
							}
						}
					});
					checks[type][n] = 0;
				}
				if(show_report_detail_switch) {
					requestLevel(href,function(response) {
					  	var all = document.createElement("div");
						all.innerHTML = response.responseText;
						href1 = response.finalUrl.substring(response.finalUrl.indexOf('?')+1,response.finalUrl.length);
						for(var i=1;i<rows+1;i++) {
							if(reports[i].getElementsByTagName('td').length != 3) continue;
							var cell = reports[i].getElementsByTagName('td')[2];
							if(!cell.getElementsByTagName('a')[0]) continue;
							href2 = cell.innerHTML.substring(cell.innerHTML.indexOf('?')+1,cell.innerHTML.indexOf('">'));
							while(href2.indexOf('amp;') != -1) {
								href2 = href2.replace('amp;','');
							}
							if(href1 == href2) {
								var exp = 0;
								var money = 0;
								if(cell.innerHTML.indexOf("指名") == -1) {
									var table = all.getElementsByTagName('table')[5];
									if(table.innerHTML.indexOf('掠奪了: ') != -1) {
										money = table.innerHTML.substring(table.innerHTML.indexOf('掠奪了: ')+5,table.innerHTML.indexOf(' <img '));
										cell.innerHTML += '<br><font color=#3C3CA0>掠奪了: '+money+' <img src="img/res2.gif" alt="黃金" title="黃金" align="absmiddle" border="0"></font>';
									}
									if(table.innerHTML.indexOf('獲得 ') != -1) {
										exp = table.innerHTML.substring(table.innerHTML.indexOf('獲得 ')+3,table.innerHTML.indexOf(' 經驗值'));
										if(table.innerHTML.indexOf('掠奪了: ') != -1) cell.innerHTML += '<font color=#3C3CA0> 獲得 '+exp+' 經驗值</font>';
										else cell.innerHTML += '<br><font color=#3C3CA0>獲得 '+exp+' 經驗值</font>';
									}
								}else {
									var table = all.getElementsByTagName('table')[5];
									if(table.innerHTML.indexOf('掠奪了: ') != -1) {
										enemy = table.getElementsByTagName('a')[0].innerHTML;
										money = table.innerHTML.substring(table.innerHTML.indexOf('掠奪了: ')+5,table.innerHTML.indexOf(' <img '));
										cell.innerHTML += '<br><font color=#3C3CA0>'+enemy+' 掠奪了: '+money+' <img src="img/res2.gif" alt="黃金" title="黃金" align="absmiddle" border="0"></font>';
									}
								}
								break;
							}
						}
					});
				}
				break;
			}
		}
	}
}
function localtime_show() {
	var reports = document.getElementsByTagName('form')[0].getElementsByTagName('tr');
	for(var i=0; i<reports.length; i++) {
		if(reports[i].getElementsByTagName('input').length != 2) continue;
		var cells = reports[i].getElementsByTagName('td');
		var date = cells[1].innerHTML.replace('<b>','').replace('</b>','');
		date = parsedate(date,0);
		var localdate = new Date();
		localdate.setTime( date.getTime() + (1000*60*60*7) );
		cells[1].innerHTML += "<div class='tdn' style=' padding-right:10px; color:rgb(60,60,160); text-decoration:underline; text-align:right;'><b>" + Timeformat(localdate,0) + "</b></div>";
	}
}
function underground_show() { // 地下城排名顯示
	var reports = document.getElementsByTagName('option');
	for(var i=0; i<reports.length; i++) {
		for(var j=0; j<underground_name.length; j++) {
			if(reports[i].innerHTML == underground_name[j]) {
				reports[i].innerHTML += "(" + underground_place[j] + "["+ underground_level[j] + "])";
				break;
			}
		}
	}
}
function location_underground_level() { // 地下城等級顯示
	var place, underground;
	var reports = document.getElementsByTagName('table')[1].getElementsByTagName('td')[1];
	if(reports.getElementsByTagName('span')[0].innerHTML == "地下城") {
		place = reports.getElementsByTagName('a')[0].innerHTML;
		for(var i=0; i<underground_place.length; i++) {
			if(place == underground_place[i]) {
				reports.getElementsByTagName('span')[0].innerHTML += "["+ underground_level[i] + "]";
				break;
			}
		}
	} else {
		place = reports.getElementsByTagName('span')[0].innerHTML;
		for(var i=0; i<underground_place.length; i++) {
			if(place == underground_place[i]) {
				reports.getElementsByTagName('a')[0].innerHTML += "["+ underground_level[i] + "]";
				break;
			}
		}
	}
}
function location_show_npc() { // 探險地圖顯示可見npc
	var place = document.getElementsByTagName('table')[1].getElementsByTagName('td')[1].getElementsByTagName('span')[0].innerHTML;
	var blod = parseInt((mylevel-1)/20);
	var stop = 0;
	for(var i=0; i<3 && stop==0; i++) {
		for(var j=0; j< location_name[i].length; j++) {
			if(place == location_name[i][j]) {
				var loc = i;
				if(loc == 0) { var level_show = ['Lv01~20','Lv21~40','Lv41~60','Lv61 Up']; var location_npc = location_npc_I}
				else if(loc == 1) { var level_show = ['Lv21~40','Lv41~60','Lv61 Up']; var location_npc = location_npc_A}
				else { var level_show = ['Lv41~60','Lv61 Up']; var location_npc = location_npc_G}
				stop = 1;
				break;
			}
		}
	} 
	var reports = document.getElementById('content').getElementsByTagName('div')[2];
	if(reports.getAttribute('class') == 'error') reports = document.getElementById('content').getElementsByTagName('div')[3];
	if(hide_location_info_switch) reports.innerHTML = ""; // 隱藏地圖敘述
	var leveltable = document.createElement('div');
	leveltable.innerHTML = "<h2>怪物列表</h2><br>";
	for(var i=0; i<level_show.length; i++) {
		if(blod == (i + 4-level_show.length)) leveltable.innerHTML += ("<b><font color=red>" + level_show[i] + ":<span style='margin-left:20px;'></font></b>");
		else leveltable.innerHTML += (level_show[i] + ":<span style='margin-left:20px;'>");
		for(var j=0; j<location_npc[i][URL_match('loc')-1].length; j++) {
			leveltable.innerHTML += location_npc[i][URL_match('loc')-1][j];
			if(j != location_npc[i][URL_match('loc')-1].length-1) leveltable.innerHTML += ", ";
		}
		if(location_npc[i].length > location_name[loc].length) {
			leveltable.innerHTML += "<span style='margin-left:20px;'><font color=blue>隨機出現：</font></span>";
			for(var j=0; j<location_npc[i][location_name[loc].length].length; j++) {
				leveltable.innerHTML += location_npc[i][location_name[loc].length][j];
				if(j != location_npc[i][location_name[loc].length].length-1) leveltable.innerHTML += ", ";
			}
		}
		leveltable.innerHTML += "</span><br>";
	} 
	if(show_location_npc_switch) { // 顯示地圖怪物
		if(reports.getAttribute('class') == 'error') document.getElementById('content').getElementsByTagName('div')[3].appendChild(leveltable);
		else document.getElementById('content').getElementsByTagName('div')[2].appendChild(leveltable); 
	}
}
function upload_npc() {
	var server = gameServer.substring(1,2);
	if(document.getElementsByTagName('table')[0].innerHTML.indexOf('你的生命值低於25') != -1) return;
	var reports = document.getElementsByTagName('table')[2];
	if(reports.innerHTML.indexOf('祝好運！') != -1) return;
	var loc = URL_match('loc');
	var player = reports.getElementsByTagName('span')[0].innerHTML;
	var time = parsesecond(reports.getElementsByTagName('span')[1].innerHTML);
	var enemy = reports.getElementsByTagName('span')[2].innerHTML; 
	var place = reports.innerHTML.substring(reports.innerHTML.indexOf('img/npc/')+8,(reports.innerHTML.indexOf('img/npc/')+9));
	var d = URL_match('&d');
	if(d == 1) var sec = (5*60-time*1)<0?(10*60-time*1):(5*60-time*1);
	else if(d == 2) var sec = (10*60-time*1)<0?(20*60-time*1):(10*60-time*1);
	else var sec = (15*60-time*1)<0?(30*60-time*1):(51*60-time*1);

	if(sec <5) {
	  GM_xmlhttpRequest({
	    method: 'POST',
	    url: 'http://acedia0915.blogspot.com/',
	    headers: {
	      'Content-Type': 'application/x-www-form-urlencoded',
	    },
	    data: 'server='+server+'&player='+player+'&level='+mylevel+'&place='+place+'&loc='+'loc'+loc+'&enemy='+enemy+'&version='+version,
	    onload: function(responseDetails) {
	    eval(responseDetails.responseText);
	    },
	  });
    }
}
function market_food() { // 市場加入食物比例
	var reports = document.getElementsByTagName('script')[4].innerHTML;
	var item = document.getElementById('market_table').getElementsByTagName('tr');
	var ratio = document.createElement('th');
	item[0].insertBefore(ratio,item[0].lastChild);
	if(market_food_switch==1) {
		ratio.title = '數值越大越划算';
		ratio.innerHTML = '比例(1)';
	}
	else if(market_food_switch==2) {
		ratio.title = '數值越小越划算';
		ratio.innerHTML = '比例(2)';
	}
	var contents = new Array();
	var ids = new Array();
	var a,b;
	for(var i=0;; i++) {
		if(reports.indexOf('</tr></table>') == -1) break;
		a = reports.substring(reports.indexOf('AddCharDiv('),reports.indexOf('</tr></table>'));
		b = reports.substring(reports.indexOf('AddCharDiv(')+12,reports.indexOf('\','));
		if(a.length > 300) {
			contents.push(a);
			ids.push(b);
		}
		reports = reports.substring(reports.indexOf('</tr></table>')+14,reports.length);
	}
	for(var i=1; i<item.length; i++) {
		ratio = document.createElement('td');
		var id = item[i].getElementsByTagName('div')[0].getAttribute('id');
		var money = item[i].getElementsByTagName('td')[2].innerHTML;
		money = money.substring(0,money.indexOf(' '));
		money = money.replace('.','');
		for(var j= 0; j<contents.length; j++) {
			if(id == ids[j]) {
				if(contents[j].indexOf('使用: 治癒') == -1) ratio.innerHTML = '　*';
				else {
					var hp = contents[j].substring(contents[j].indexOf('使用: 治癒 ')+7, contents[j].indexOf(' 生命值'));
					if(market_food_switch==1) {
						var ratios = (hp*1)/(money*1) + '';
						if(market_food_num != '0' && ratios*1 > market_food_num*1) ratio.innerHTML = '<font color=red><b>'+ratios.substring(0,5)+'</b></font>';
						else ratio.innerHTML = ratios.substring(0,5);
						ratio.title = '生命值/金錢';
					}
					else if(market_food_switch==2) {
						var ratios = (money*1)/(hp*1) + '';
						if(market_food_num != '0' && ratios*1 < market_food_num*1) {
							if(ratios.indexOf('.') != -1) ratio.innerHTML = '<font color=red><b>'+ratios.split('.')[0]+'.'+ratios.split('.')[1].substring(0,1)+'</b></font>';
							else ratio.innerHTML = '<font color=red><b>'+ratios+'</b></font>';
						}
						else {
							if(ratios.indexOf('.') != -1) ratio.innerHTML = ratios.split('.')[0]+'.'+ratios.split('.')[1].substring(0,1);
							else ratio.innerHTML = ratios;
						}
						ratio.title = '金錢/生命值';
					}
				}
				break;
			}
		}	
		item[i].insertBefore(ratio,item[i].lastChild);
	}
}
function checkbox_helper() {
	var reports = document.getElementsByTagName('form')[0].getElementsByTagName('tr');
	var patch = document.createElement('span');
	patch.innerHTML=" <input type='checkbox' id='choose' value='"+choose+"' "+togglecheck(choose)+" onclick="+butjava+"> 全選按鈕";
	document.getElementsByTagName('form')[0].getElementsByTagName('td')[0].appendChild(patch);
	var butjava = "'javascript: this.value = !this.value'";
	function togglecheck(str) {
		return (str == true)?"checked":"";
	}
	function choose(){
		for(var i=0; i<reports.length; i++) {
			if(reports[i].getElementsByTagName('input').length != 2) continue;
			var checkbox = reports[i].getElementsByTagName('input')[0];
			if(reports[i].innerHTML.indexOf('<textarea') != -1) checked(checkbox,0);
			else if(reports[i].getElementsByTagName('td')[2].innerHTML.indexOf('工會訊息來自') != -1) checked(checkbox,1);
			else if(reports[i].getElementsByTagName('td')[2].innerHTML.indexOf('你在市場內販售') != -1) checked(checkbox,2);
			else if(reports[i].getElementsByTagName('td')[2].innerHTML.indexOf('你在拍賣建築物') != -1 || reports[i].getElementsByTagName('td')[2].innerHTML.indexOf('你贏得競標。') != -1) checked(checkbox,3);
			else if(reports[i].getElementsByTagName('td')[2].innerHTML.indexOf('遠征：') != -1) checked(checkbox,4);
			else if(reports[i].getElementsByTagName('td')[2].innerHTML.indexOf('你成功的擔任') != -1) checked(checkbox,5);
			else if(reports[i].getElementsByTagName('td')[2].innerHTML.indexOf('地下城') != -1) checked(checkbox,6);
			else if(reports[i].getElementsByTagName('td')[2].innerHTML.indexOf('競技場內') != -1) checked(checkbox,7);
			else checked(checkbox,8);
		}
	}
	function checked(checkbox,type) {
		var state = decipher(checkbox_helper_state);
		if(state[type] == '1') checkbox.checked = (checkbox.checked == false)?true:false;
	}
	document.getElementById("choose").addEventListener("click", choose, false);
}
function overview_patch() {
	var leben = document.getElementById('char_leben_tt').getAttribute('onMouseOver');
	leben = leben.substring(leben.indexOf(' / ')-10,leben.indexOf(' / ')+20);
	leben = leben.substring(leben.indexOf('>')+1,leben.indexOf('</td>'));
	leben = leben.split(' / ');
	var diff = (leben[1]*1-leben[0]*1)==0?'':'<font color=red>-'+(leben[1]*1-leben[0]*1)+'</font>';
	document.getElementById('char_leben_tt').getElementsByTagName('span')[0].innerHTML += '('+leben[0]+' / '+leben[1]+') '+diff;

	var exp = document.getElementById('char_exp_tt').getAttribute('onMouseOver');
	exp = exp.substring(exp.indexOf(' / ')-10,exp.indexOf(' / ')+20);
	exp = exp.substring(exp.indexOf('>')+1,exp.indexOf('</td>'));
	exp = exp.split(' / ');
	var diff = (exp[1]*1-exp[0]*1)==0?'':'<font color=red>-'+(exp[1]*1-exp[0]*1)+'</font>';
	document.getElementById('char_exp_tt').getElementsByTagName('span')[0].innerHTML += '('+exp[0]+' / '+exp[1]+') '+diff;

	var reports = document.getElementById('charstats').getElementsByTagName('div');
	for(var i=0; i<reports.length; i++) {
		if(!reports[i].getAttribute('onMouseOver')) continue;
		else if(reports[i].getAttribute('onMouseOver').indexOf('格檔率:') != -1) break;
	}
	var panzer = reports[i].getAttribute('onMouseOver');
	panzer = panzer.substring(panzer.indexOf(' - ')-10,panzer.indexOf(' - ')+20);
	panzer = panzer.substring(panzer.indexOf('>')+1,panzer.indexOf('</td>'));
	panzer = panzer.split(' - ');
	reports[i].getElementsByTagName('span')[0].innerHTML += '('+panzer[0]+' - '+panzer[1]+')';
}
function prominent_friend_list() {
	var friend_list_name = new Array();
	var friend_list_type = new Array();
	var username = document.getElementById('content').getElementsByTagName('a');
	var friend_list = GM_getValue(gameServer+".friend_list", "");
	friend_lists=friend_list.split(',');
	for(var i=0; i<friend_lists.length; i++) {
		friend_list_name.push(friend_lists[i].split(':')[0]);
		friend_list_type.push(friend_lists[i].split(':')[1])
	}
	for(var i=0; i<username.length; i++) {
		for(var j=0; j<friend_list.length; j++) {
			if(username[i].innerHTML == friend_list_name[j]){
				if(friend_list_type[j] == 1) username[i].innerHTML = '<span style="color:purple;font-weight:bold;">'+username[i].innerHTML+'</span>';
				else username[i].innerHTML = '<span style="color:red;font-weight:bold;">'+username[i].innerHTML+'</span>';
				break;
			}
		}
	}
}

var leben = 0;
var start = window.location.href.substring(0,window.location.href.indexOf('mod='))+'mod=overview&sh=';
var end = window.location.href.substring(window.location.href.indexOf('sh=')+3,window.location.href.length);
ajax2(start+end,0);

function getStats(code, id, num, stat)
{
	var ex = ".//span[@id='"+id+"']";
	tag = document.evaluate( 
  	ex,
    	code,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);

	if (tag.snapshotLength) 
	{ 
  	return(tag.snapshotItem(0).innerHTML)
  	}
}

function ajax2(url, num)
{
  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function(responseDetails) 
    {
	pulled = document.createElement('div');
    	pulled.innerHTML = responseDetails.responseText; 
    	leben = getStats(pulled, 'char_leben');

prnt(leben)
    }
});

}
function prnt(prt)
{
var ert1 = document.body.innerHTML.substring(document.body.innerHTML.indexOf('<div><span class="charvaluesPre">'),document.body.innerHTML.length);
var ert2 = ert1;
ert1 = ert1.substring(33,ert1.indexOf(':</span><span class="charvaluesSub">'));
ert2 = ert2.substring(ert2.indexOf(':</span><span class="charvaluesSub">')+36,ert2.indexOf('</span></div>'));

var ert3 = document.body.innerHTML.substring(document.body.innerHTML.indexOf('><div><span class="charvaluesPre">'),document.body.innerHTML.length);
var ert4 = ert3;
ert3 = ert3.substring(34,ert3.indexOf(':</span><span class="charvaluesSub">'));
ert4 = ert4.substring(ert4.indexOf(':</span><span class="charvaluesSub">')+36,ert4.indexOf('</span></div></div>'));

var xx1 = document.body.innerHTML.substring(0,document.body.innerHTML.indexOf('<div class="headerHighscore">'));
var xx2 = document.body.innerHTML.substring(document.body.innerHTML.indexOf('<div class="headerHonor">'),document.body.innerHTML.length);
var xx3 = '<div class="headerHighscore">';
	xx3 += '<div style="margin-top:-4px;"><div><span class="charvaluesPre">'+ert1+':</span><span class="charvaluesSub">'+ert2+'</span></div>';
	xx3 += '<div><span class="charvaluesPre">'+ert3+':</span><span class="charvaluesSub">'+ert4+'</span></div>';
	xx3 += '<div><span class="charvaluesPre">HP Now:</span><span class="charvaluesSub">'+prt+'</span></div>';
	xx3 += '</div></div>'

var xx4 = document.body.innerHTML.substring(document.body.innerHTML.indexOf('<div class="headerHonor">'),document.body.innerHTML.indexOf('<div id="main">'));
	var xx5 = document.body.innerHTML.substring(document.body.innerHTML.indexOf('<div class="headerDiv1">'),document.body.innerHTML.indexOf('<div class="headerHighscore">'));
	var nn = document.getElementById('charvalues'); 
	nn.innerHTML = xx5+xx3+xx4;

}

function doSomethingWithClasses(theClass) {
a = 0;
x = new Array();
var allPageTags=document.getElementsByTagName("div");
for (i=0; i<allPageTags.length; i++) {
if (allPageTags[i].className==theClass) {

x[a] = allPageTags[i];
a++;
}
}
return x;
}

//
// ChangeLog
// 2008-09-15 - 1.0 - 一般版建立(CSS修正,地下城顯示等級,攻擊次數計算,本地時間,隱藏寶石商人,隱藏地圖資訊,顯示npc,NPC資料上傳)
// 2008-09-19 - 1.1 - 修正薩鬼斯堡壘等級為100 新版本提示
// 2008-09-21 - 1.2 - 加入寶石按鈕隱藏
// 2008-09-22 - 1.3 - 修正寶石設定 修正本地日期錯誤 加入市場食物比例 修正連結成開新視窗
// 2008-09-24 - 1.4 - 加入市場食物比例狀態選擇 上傳版本資訊
// 2008-09-25 - 1.5 - 修正email未啟動地圖資訊的問題 加入訊息全選按鈕(除玩家戰報外) 加入市場比例強調
// 2008-09-28 - 1.6 - 本地日期函式獨立 修正刪除或移動訊息造成本地時間失效的問題 加入概況頁面補強 加入捷徑選單
// 2008-10-03 - 1.7 - 修正本地日期顯示的bug 加入訊息全選按鈕的選單 加入筆記選單 修正攻擊次數統計的bug NPC列表修正 修正補品的過濾功能位數
// 2008-10-05 - 1.8 - 加入戰報顯示掠奪金錢和經驗 筆記字體變更 加入好友名單 修正攻擊次數統計bug
// 2008-12-31 - 1.0 - 將原版改成修改版，並加入血量抬頭顯示器