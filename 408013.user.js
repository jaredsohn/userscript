// ==UserScript==
// @name        TLR: RWK Theme
// @namespace   Kinetic
// @include     http://www.thelostrunes.com/game.php
// @include     http://thelostrunes.com/game.php
// @version     1
// @grant       none
// ==/UserScript==

function addGlobalJS(js)
{
    var head, script;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = js;
    head.appendChild(script);
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

/*user panel variables*/
var mcname = document.getElementById('mcname').innerHTML;
var mlevel = document.getElementById('mlevel').innerHTML;
var mgold = document.getElementById('mgold').innerHTML;
var mrank = document.getElementById('mrank').innerHTML;
var mrace = document.getElementById('mrace').innerHTML;
var mexp = document.getElementById('mexp').innerHTML;
var mexplvl = document.getElementById('mexplvl').innerHTML;
var mplatinum = document.getElementById('mplatinum').innerHTML;
var mcredits = document.getElementById('mcredits').innerHTML;
var mcclass = document.getElementById('mcclass').innerHTML;
var mclan = document.getElementById('mclan').innerHTML;
var mdiamonds = document.getElementById('mdiamonds').innerHTML;
var mhonor = document.getElementById('mhonor').innerHTML;
/*land panel variables*/
var cruler = document.getElementById('cruler').innerHTML;
var cminoritems = document.getElementById('cminoritems').innerHTML;
var cminortotem1 = document.getElementById('cminortotem1').innerHTML;
var cnetworth = document.getElementById('cnetworth').innerHTML;
var cmajoritems = document.getElementById('cmajoritems').innerHTML;
var cminortotem2 = document.getElementById('cminortotem2').innerHTML;
var cpopulation = document.getElementById('cpopulation').innerHTML;
var cgold = document.getElementById('cgold').innerHTML;
var cmajortotem1 = document.getElementById('cmajortotem1').innerHTML;
var csoldiers = document.getElementById('csoldiers').innerHTML;
var ctax = document.getElementById('ctax').innerHTML;
var cmajortotem2 = document.getElementById('cmajortotem2').innerHTML;
/*misc variables*/
var playersonline = document.getElementById('playersonline').innerHTML;
var loccoords = document.getElementById('loccoords').innerHTML;
var locname = document.getElementById('locname').innerHTML;
var locationdiv = document.getElementById('locationdiv').innerHTML; //you see...
var right2 = document.getElementById('right2').innerHTML; //equipment/runes
var left1 = document.getElementById('left1').innerHTML; //attributes
var content = document.getElementById('content').innerHTML;
var chatform = document.getElementById('chatform').innerHTML;
chatform = chatform.replace(/<select/, '<select onChange="newPrefixCMD()"');
var chat = document.getElementById('chat').innerHTML;
var content = document.getElementById('content').innerHTML; //main options screen
/*layout variables*/
var rightWidth = 260;
/*layout images*/
var iSubmit = "http://i44.photobucket.com/albums/f4/Zeladin/TLR%20-%20RWK%20Theme/submit.jpg";
var iSide = "http://i44.photobucket.com/albums/f4/Zeladin/TLR%20-%20RWK%20Theme/side.jpg";
var iMr = "http://i44.photobucket.com/albums/f4/Zeladin/TLR%20-%20RWK%20Theme/mr.jpg";
var iMl = "http://i44.photobucket.com/albums/f4/Zeladin/TLR%20-%20RWK%20Theme/ml.jpg";
var iMinotaur = "http://i44.photobucket.com/albums/f4/Zeladin/TLR%20-%20RWK%20Theme/minotaur.jpg";
var iMee = "http://i44.photobucket.com/albums/f4/Zeladin/TLR%20-%20RWK%20Theme/mee.jpg";
var iDragon = "http://i44.photobucket.com/albums/f4/Zeladin/TLR%20-%20RWK%20Theme/dragon.jpg";
var iCorner = "http://i44.photobucket.com/albums/f4/Zeladin/TLR%20-%20RWK%20Theme/corner.jpg";
var iTop = "http://i44.photobucket.com/albums/f4/Zeladin/TLR%20-%20RWK%20Theme/top.jpg";
var iMfa = "http://i44.photobucket.com/albums/f4/Zeladin/TLR%20-%20RWK%20Theme/mfa.jpg";
var iWood = "http://i44.photobucket.com/albums/f4/Zeladin/TLR%20-%20RWK%20Theme/wood.jpg";
var iMfy = "http://i44.photobucket.com/albums/f4/Zeladin/TLR%20-%20RWK%20Theme/mfy.jpg";

/*start the re-building here*/
document.body.innerHTML = "";
/*style override*/
addGlobalStyle("html{height: 100% ;}");
addGlobalStyle("body { height: 100% ;margin: 0px ;padding: 3px 0px 0px 0px ;background-image:url('"+ iWood +"') !important; }");
addGlobalStyle("html,body { background-image:url('"+ iWood +"') !important; }");
addGlobalStyle("A:link, A:visited, A:active { color:#C89468 ; text-decoration: none ; }A:hover {color: #C89468 ; text-decoration: underline ;}");
addGlobalStyle("select{border-color:#fff ;background-color:#000 ;color:#fff ;}");
addGlobalStyle("input{border-color:#fff ;background-color:#000 ;color:#fff ;}");
addGlobalStyle("#right1 { background-image:none ; border: none; }");
addGlobalStyle("#right2 { background-image:none ; border: none; }");
addGlobalStyle("#right3 { background-image:none ; border: none; }");
addGlobalStyle("#left1 { background-image:none ; border: none; }");
addGlobalStyle("#recaptcha_response_field { background-color: #fff !important; color: #000 !important; border: solid 1px #000 !important; }");
addGlobalStyle("#chatform { background-color:#000 !important; background-image: none !important; border: none; }");
addGlobalStyle("#chat { background-color:#000 !important; background-image: none !important; border: none; }");
addGlobalStyle("#content { margin: 0 !important; }");
addGlobalStyle("#mainpopup { height: 470px !important; background-image: url('http://i44.photobucket.com/albums/f4/Zeladin/TLR%20-%20RWK%20Theme/mainpopup.jpg') !important; background-repeat: no-repeat !important; background-color:#000 !important; border:none !important; }");
addGlobalStyle(".drop { left: 250px !important; margin-left: 0px !important; top: 180px !important; background-image: none !important; background-color: #AAA !important; border: solid 1px #fff !important; height: 85px !important; }");
addGlobalStyle("#mainpopupnav td { background-color:#000 !important;");
addGlobalStyle(".heading1 { color: #fff !important;");
/*function override*/
addGlobalJS('function newPrefixCMD(){ var command = document.getElementById("prefixcommand").value;		if(command=="/c"){chatprefix = "/c ";}		else if(command=="/n"){chatprefix = "/n ";}		else if(command=="/s"){chatprefix = "/s ";}		else if(command=="/pe"){chatprefix = "/pe ";}		else{chatprefix = "";}	}');
addGlobalJS("function sendMisc(url, params){	$.get(url,{params:params},function(data){		var update = new Array();		if(data.indexOf('|' != -1))		{			update = data.split('|');			var totalUpdates = (update.length / 2);			var currentUpdate = 1;			var var1 = 0;			var var2 = 1;			while(currentUpdate <= totalUpdates)			{				update[var2] = update[var2].replace(/#000000\"><b>Titan/gi, '#FFF\"><b>Titan');				$(\"#\"+update[var1]).html(update[var2]);				currentUpdate = currentUpdate + 1;				var1 = var1 + 2;				var2 = var2 + 2;			}		}	});}");
addGlobalJS("function m(cname){	if(document.getElementById('chatinput').value == '/m '+cname+': ')	{		viewPlayer(cname);		document.getElementById('chatinput').value = '';		$(\"#chatinput\").css(\"color\",\"#fff\");	}	else	{		document.getElementById('chatinput').value = '/m '+cname+': ';		document.getElementById('chatinput').focus();		$(\"#chatinput\").css(\"color\",\"#FF2222\");	}}");
addGlobalJS('function handleResponse4(){	if(chat.readyState == 4)	{		var response = chat.responseText;		var update = new Array();		if(response.indexOf("|" != -1))		{			update = response.split("|");			update.shift();			var totalUpdates = update.length;			var currentUpdate = 1;			while (currentUpdate <= totalUpdates)			{        if (chatArray.length >= chatLimit) {          chatArray.shift();        }				chatArray.push(update[currentUpdate-1]);				currentUpdate += 1;			}			var chatmsg = "";			for (var i=chatArray.length-1; i>=0; --i)			{				chatArray[i] = chatArray[i].replace(/#33CCCC/g, "#EEEE44");				chatArray[i] = chatArray[i].replace(/#00FF00">PM/g, \'#FF2222">PM\');				chatArray[i] = chatArray[i].replace(/#00FF00/g, "#CC00CC");				chatArray[i] = chatArray[i].replace(/#33FFFF/g, "#FCFF11");				chatArray[i] = chatArray[i].replace(/#000000/g, "#FFFFFF"); chatArray[i] = chatArray[i].replace(/#CC00CC">Earl/g, \'#00FF00">Earl\'); chatArray[i] = chatArray[i].replace(/#CC00CC">Lady/g, \'#00FF00">Lady\'); chatArray[i] = chatArray[i].replace(/#bbbfbf/g, "#AAAAAA");				chatmsg = chatmsg + chatArray[i] + \'<br />\';			}			document.getElementById(\'chat\').innerHTML = chatmsg;		}		chatcalled = 0;				clearTimeout(disablechattimer);		clearTimeout(chatcalledtimer);	}}');
addGlobalJS('var firstCallCheck = 0;var startTimerCheck = 0;var lvlAchs = Array("20", "100", "250", "500", "1000", "2000", "3000", "5000", "7500", "10000", "15000", "20000", "25000", "30000", "35000", "40000", "45000", "50000", "60000", "70000", "80000", "90000", "100000", "120000", "140000", "160000", "180000", "200000", "225000", "250000", "275000", "300000", "325000", "350000", "375000", "400000", "425000", "450000", "475000", "500000", "550000", "600000", "650000", "700000", "750000", "800000", "850000", "900000", "950000", "1000000");function actiontimer(tvalue, updt){	/*update level bars*/	var userLvl = document.getElementById("mlevel").innerHTML;	userLvl = userLvl.replace(/,/g, "");	var userXP = document.getElementById("mexp").innerHTML;	var userXP = userXP.replace(/,/g, "");	var userXPTo = parseFloat(userLvl)*30;	var currPerc = Math.floor((parseFloat(userXP)/parseFloat(userXPTo))*100); 	var newBar = \'<table width="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td width="0" bgcolor="0"><img width="11" height="15" border="0" src="http://i44.photobucket.com/albums/f4/Zeladin/TLR%20-%20RWK%20Theme/ml.jpg"></td><td width="\'+ currPerc +\'%" background="http://i44.photobucket.com/albums/f4/Zeladin/TLR%20-%20RWK%20Theme/mfa.jpg" align="right"></td><td width="99%" background="http://i44.photobucket.com/albums/f4/Zeladin/TLR%20-%20RWK%20Theme/mee.jpg"></td><td width="0" bgcolor="0"><img width="11" height="15" border="0" src="http://i44.photobucket.com/albums/f4/Zeladin/TLR%20-%20RWK%20Theme/mr.jpg"></td></tr></tbody></table>\'; 	/*determine which ach is next*/	var count = 0; var n = 0; var nextAch = 0;	while (count < 1)	{		var currCheck = lvlAchs[n];		if (parseFloat(userLvl) < parseFloat(currCheck))		{			nextAch = lvlAchs[n];			count = 1;		}		n++;	}	var achXP = (0.5*(parseFloat(nextAch)-1)*(30+30*(parseFloat(nextAch)-1)));	var currXP = (0.5*(parseFloat(userLvl)-1)*(30+30*(parseFloat(userLvl)-1))) + parseFloat(userXP);	var achPerc = Math.floor((currXP/achXP)*100);	var newBar2 = \'<table width="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td width="0" bgcolor="0"><img width="11" height="15" border="0" src="http://i44.photobucket.com/albums/f4/Zeladin/TLR%20-%20RWK%20Theme/ml.jpg"></td><td width="\'+ achPerc +\'%" background="http://i44.photobucket.com/albums/f4/Zeladin/TLR%20-%20RWK%20Theme/mfy.jpg" align="right"></td><td width="100%" background="http://i44.photobucket.com/albums/f4/Zeladin/TLR%20-%20RWK%20Theme/mee.jpg"></td><td width="0" bgcolor="0"><img width="11" height="15" border="0" src="http://i44.photobucket.com/albums/f4/Zeladin/TLR%20-%20RWK%20Theme/mr.jpg"></td></tr></tbody></table>\';	/*update bars*/	document.getElementById(\'s_Level\').innerHTML = newBar;	document.getElementById(\'s_Exp\').innerHTML = newBar2;		if (firstCallCheck == 0) { firstCallCheck = 1; startTimerCheck = tvalue; } /*update action timer*/ var actPerc = Math.floor((parseFloat(tvalue)/parseFloat(startTimerCheck))*100); document.getElementById("s_ActionDelay").innerHTML = \'<table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td bgcolor="0" width="0"><img src="http://i44.photobucket.com/albums/f4/Zeladin/TLR%20-%20RWK%20Theme/ml.jpg" border="0" height="15" width="11"></td><td align="right" background="http://i44.photobucket.com/albums/f4/Zeladin/TLR%20-%20RWK%20Theme/mfa.jpg" width="\'+ actPerc +\'%"></td><td background="http://i44.photobucket.com/albums/f4/Zeladin/TLR%20-%20RWK%20Theme/mee.jpg" width="100%"></td><td bgcolor="0" width="0"><img src="http://i44.photobucket.com/albums/f4/Zeladin/TLR%20-%20RWK%20Theme/mr.jpg" border="0" height="15" width="11"></td></tr></tbody></table>\';	var sec = Math.floor(tvalue / 1000);	var mil = (tvalue - (sec * 1000)) / 100;		mil -= 5;		if (mil < 0)	{		mil = 5;		sec -= 1;	}		tvalue -= 500;		if ((sec == 0 && mil == 0) || sec <= -1)	{		firstCallCheck = 0; startTimerCheck = 0; 		mil = 0;		sec = 0;		actioninprogress = 0;	document.getElementById("s_ActionDelay").innerHTML = \'<table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td bgcolor="0" width="0"><img src="http://i44.photobucket.com/albums/f4/Zeladin/TLR%20-%20RWK%20Theme/ml.jpg" border="0" height="15" width="11"></td><td align="right" background="http://i44.photobucket.com/albums/f4/Zeladin/TLR%20-%20RWK%20Theme/mfa.jpg" width="0%"></td><td background="http://i44.photobucket.com/albums/f4/Zeladin/TLR%20-%20RWK%20Theme/mee.jpg" width="100%"></td><td bgcolor="0" width="0"><img src="http://i44.photobucket.com/albums/f4/Zeladin/TLR%20-%20RWK%20Theme/mr.jpg" border="0" height="15" width="11"></td></tr></tbody></table>\';	document.getElementById(\'actiontimer\').innerHTML = sec+\'.\'+mil;		if(document.getElementById(\'battlebutton\'))		{			document.getElementById(\'battlebutton\').disabled = false;			if(document.getElementById(\'autobattlebutton\'))			{				document.getElementById(\'autobattlebutton\').disabled = false;			}						if(chatfocused == 0)			{				document.getElementById(\'battlebutton\').focus();			}		}				if(autoattack == 1)		{			sendData(\'battle.php?id=\'+autoattackid+\'&autoattack=2\');		}		else if(autoattack == 2)		{			sendData(\'battle.php?id=\'+autoattackid+\'&autoattack=3\');		}		else if(autots == 1)		{			sendData(\'g_content.php?mod=tradeskills&tvar=2&ts=\'+tradeskillid)		}		else if(autots == 2)		{			document.getElementById(\'stopautotsspan\').innerHTML = \'Stopped\';		}	}	else	{		document.getElementById(\'actiontimer\').innerHTML = \'<span style="color: #FFFF00; font-weight: bold;">\'+sec+\'.\'+mil+\'</span>\';		if (document.getElementById(\'battlebutton\'))		{			if(document.getElementById(\'autobattlebutton\'))			{				document.getElementById(\'autobattlebutton\').disabled = true;			}			document.getElementById(\'battlebutton\').disabled = true;		}		atimer = setTimeout("actiontimer("+tvalue+")", 500);	}}');
/*invisible popup screen*/
var popup = '<div id="mainpopup" class="mainpopup" style="visibility: hidden;"></div>';
/*header (links)*/
var header1 = '<table border="0" cellspacing="0" cellpadding="0" width="100%" style="color:#ddd;"><tr><td>';
var headerTd1 = '[ <a href="javascript:openNav(1);">Purchase/Spend Credits</a> ] [ <a href="javascript:openNav(11);">RP Store</a> ] [ <a href="javascript:openNav(5);">Referrals</a> ]<br/>[ Rankings: <a href="javascript:openNav(3);">Overall</a> / <a href="javascript:openNav(4);">Today</a> / <a href="javascript:openNav(12);">Clans</a> ]';
var headerTd2 = '[ <a href="javascript:openNav(2);">Players Online: <span id="playersonline">'+ playersonline +'</span></a> ] [ <a href="javascript:openNav(10);">Updates</a> ] [ <a href="http://www.thelostrunes.com/index.php?logout">Logout</a> ]<br/>[ <a href="http://www.thelostrunes.com/index.php?mod=vote" target="_blank">Vote</a> / <a href="http://www.thelostrunes.com/forum/" target="_blank">Forum</a> / <a href="http://lostrunes.wikispaces.com/" target="_blank">Wiki</a> / <a href="http://lostrunes.wikispaces.com/Rules" target="_blank">Rules</a> ]';
var layout = popup + header1 + headerTd1 +'</td><td style="text-align:right;">'+ headerTd2 +'</td></tr></table>';
/*page wrap*/
var pageWrap = '<table id="pageWrap" border="0" width="100%" cellspacing="0" cellpadding="0"><tr><td valign="top">';
layout += pageWrap +'<table id="innerWrap" width="100%" cellspacing="4" cellpadding="0" border="0" style="color:#ddd;"><tr><td>';
/*user panel*/
var userPanel1 = '<table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#808080" style="color:#fff;"><tbody><tr><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td><td background="'+ iTop +'" align="center" colspan="5"><img width="44" height="10" border="0" src="'+ iTop +'"></td><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td></tr>';
var userPanelTr1 = '<tr><td background="'+ iSide +'" rowspan="3"><img width="10" height="44" border="0" src="'+ iSide +'"></td><td width="20%" bgcolor="0">&nbsp;<a href="#" target="_blank">Name</a>: <span id="mcname">'+ mcname +'</span></td><td width="20%" bgcolor="0">&nbsp;<a href="#" target="_blank">Lev</a>: <span id="mlevel">'+ mlevel +'</span></td><td width="20%" bgcolor="0">&nbsp;<a href="#" target="_blank">Gold</a>: <span id="mgold">'+ mgold +'</span></td><td width="20%" bgcolor="0">&nbsp;<a href="#" target="_blank">Rank</a>: <span id="mrank">'+ mrank +'</span></td><td width="20%" bgcolor="0"><span id="s_Exp"><table width="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td width="0" bgcolor="0"><img width="11" height="15" border="0" src="'+ iMl +'"></td><td width="0%" background="'+ iMfy +'" align="right"></td><td width="100%" background="'+ iMee +'"></td><td width="0" bgcolor="0"><img width="11" height="15" border="0" src="'+ iMr +'"></td></tr></tbody></table></span></td><td background="'+ iSide +'" rowspan="3"><img width="10" height="44" border="0" src="'+ iSide +'"></td></tr>';
var userPanelTr2 = '<tr><td width="20%" bgcolor="0">&nbsp;<a href="#" target="_blank">Race</a>: <span id="mrace">'+ mrace +'</span></td><td width="20%" bgcolor="0">&nbsp;<a href="#" target="_blank">Exp</a>: <span id="mexp">'+ mexp +'</span>/<span id="mexplvl">'+ mexplvl +'</span></td><td width="20%" bgcolor="0">&nbsp;<a href="#" target="_blank">Plat</a>: <span id="mplatinum">'+ mplatinum +'</span></td><td width="20%" bgcolor="0">&nbsp;<a href="#" target="_blank">Credits</a>: <span id="mcredits">'+ mcredits +'</span></td><td width="20%" bgcolor="0"><span id="s_Level"><table width="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td width="0" bgcolor="0"><img width="11" height="15" border="0" src="'+ iMl +'"></td><td width="1%" background="'+ iMfa +'" align="right"></td><td width="99%" background="'+ iMee +'"></td><td width="0" bgcolor="0"><img width="11" height="15" border="0" src="'+ iMr +'"></td></tr></tbody></table></span></td></tr>';
var userPanelTr3 = '<tr><td width="20%" bgcolor="0">&nbsp;<a href="#" target="_blank">Class</a>: <span id="mcclass">'+ mcclass +'</span></td><td width="20%" bgcolor="0">&nbsp;<a href="#" target="_blank">Clan</a>: <a href="javascript:sendData(\'clan.php?mod=clan\');"><span id="mclan">'+ mclan +'</span></a></td><td width="20%" bgcolor="0">&nbsp;<a href="#" target="_blank">Dmds</a>: <span id="mdiamonds">'+ mdiamonds +'</span></td><td width="20%" bgcolor="0">&nbsp;<a href="#" target="_blank">Honor</a>: <span id="mhonor">'+ mhonor +'</span></td><td width="20%" bgcolor="0">&nbsp;</td></tr>';
var userPanelTr4 = '<tr><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td><td background="'+ iTop +'" align="center" colspan="5"><img width="44" height="10" border="0" src="'+ iTop +'"></td><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td></tr>';
var userPanel2 = '</tbody></table>';
layout += userPanel1 + userPanelTr1 + userPanelTr2 + userPanelTr3 + userPanelTr4 + userPanel2 + '</td>';
/*land panel*/
layout += '</tr><tr><td valign="top" height="0">';
var landPanel1 = '<table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#808080" style="color:#fff;"><tbody><tr><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td><td background="'+ iTop +'" align="center" colspan="3"><img width="44" height="10" border="0" src="'+ iTop +'"></td><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td></tr>';
var landPanelTr1 = '<tr><td background="'+ iSide +'" rowspan="4"><img width="10" height="44" border="0" src="'+ iSide +'"></td><td width="33%" bgcolor="0">&nbsp;<a href="#" target="_blank">Ruler</a>: <span id="cruler">'+ cruler +'</span></td><td width="33%" bgcolor="0">&nbsp;<a href="#" target="_blank">Min. Essence</a>: <span id="cminoritems">'+ cminoritems +'</span></td><td width="33%" bgcolor="0">&nbsp;<a href="#" target="_blank">Minor Totem</a>: <span id="cminortotem1">'+ cminortotem1 +'</span></td><td background="'+ iSide +'" rowspan="4"><img width="10" height="44" border="0" src="'+ iSide +'"></td></tr>';
var landPanelTr2 = '<tr><td width="33%" bgcolor="0">&nbsp;<a href="#" target="_blank">Networth</a>: <span id="cnetworth">'+ cnetworth +'</span></td><td width="33%" bgcolor="0">&nbsp;<a href="#" target="_blank">Maj. Essence</a>: <span id="cmajoritems">'+ cmajoritems +'</span></td><td width="33%" bgcolor="0">&nbsp;<a href="#" target="_blank">Minor Totem</a>: <span id="cminortotem2">'+ cminortotem2 +'</span></td></tr>';
var landPanelTr3 = '<tr><td width="33%" bgcolor="0">&nbsp;<a href="#" target="_blank">Workers</a>: <span id="cpopulation">'+ cpopulation +'</span></td><td width="33%" bgcolor="0">&nbsp;<a href="#" target="_blank">Gold</a>: <span id="cgold">'+ cgold +'</span></td><td width="33%" bgcolor="0">&nbsp;<a href="#" target="_blank">Major Totem</a>: <span id="cmajortotem1">'+ cmajortotem1 +'</span></td></tr>';
var landPanelTr4 = '<tr><td width="33%" bgcolor="0">&nbsp;<a href="#" target="_blank">Soldiers</a>: <span id="csoldiers">'+ csoldiers +'</span></td><td width="33%" bgcolor="0">&nbsp;<a href="#" target="_blank">Tax</a>: <span id="ctax">'+ ctax +'</span></td><td width="33%" bgcolor="0">&nbsp;<a href="#" target="_blank">Major Totem</a>: <span id="cmajortotem2">'+ cmajortotem2 +'</span></td></tr>';
var landPanelTr5 = '<tr><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td><td background="'+ iTop +'" align="center" colspan="3"><img width="44" height="10" border="0" src="'+ iTop +'"></td><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td></tr></tbody></table>';
layout += landPanel1 + landPanelTr1 + landPanelTr2 + landPanelTr3 + landPanelTr4 + landPanelTr5;
/*left panel (attributes)*/
layout += '</td></tr><tr><td height="0" valign="top"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td valign="top" width="250">';
var leftPanel1 = '<table cellspacing="0" cellpadding="0" border="0" bgcolor="#808080" style="color:#fff;"><tbody><tr><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td><td background="'+ iTop +'" align="center" colspan="1"><img width="44" height="10" border="0" src="'+ iTop +'"></td><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td></tr>';
var leftPanelTr1 = '<tr><td background="'+ iSide +'" rowspan="1"><img width="10" height="44" border="0" src="'+ iSide +'"></td><td width="240" bgcolor="0" style="text-align:left;color:#ddd;"><div id="left1">'+ left1 +'</div></td><td background="'+ iSide +'" rowspan="1"><img width="10" height="44" border="0" src="'+ iSide +'"></td></tr>';
var leftPanelTr2 = '<tr><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td><td background="'+ iTop +'" align="center" colspan="1"><img width="44" height="10" border="0" src="'+ iTop +'"></td><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td></tr></tbody></table>';
layout += leftPanel1 + leftPanelTr1 + leftPanelTr2 +'</td><td valign="top">';
/*main content*/
var mainContent = '<table border="0" width="100%" height="175" cellspacing="0" cellpadding="0" style="background-color:#000;padding:10px;"><tr><td valign="top"><table align="left" border="0" cellspacing="0" cellpadding="0"><tr><td><span id="s_ActionDelay"><table width="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td width="0" bgcolor="0"><img width="11" height="15" border="0" src="'+ iMl +'"></td><td width="0%" background="'+ iMfa +'" align="right"></td><td width="100%" background="'+ iMee +'"></td><td width="0" bgcolor="0"><img width="11" height="15" border="0" src="'+ iMr +'"></td></tr></tbody></table></span></td></tr><tr><td><div id="content" style="text-align:left;width:624px;">'+ content +'</div></td></tr></table></td></tr></table>';
layout += mainContent + '</td></tr><tr><td colspan="2" valign="top">';
/*chat*/
var chat1 = '<table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#808080" style="color:#fff;"><tbody><tr><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td><td background="'+ iTop +'" align="center"><img width="44" height="10" border="0" src="'+ iTop +'"></td><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td></tr><tr><td background="'+ iSide +'" rowspan="2"><img width="10" height="44" border="0" src="'+ iSide +'"></td>';
var chat2 = '<td><div id="chatform">'+ chatform +'</div></td>';
var chat3 = '<td background="'+ iSide +'" rowspan="2"><img width="10" height="44" border="0" src="'+ iSide +'"></td></tr>';
var chat4 = '<tr><td width="100%" bgcolor="0"><div id="chat">'+ chat +'</div></td></tr>';
var chat5 = '<tr><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td><td background="'+ iTop +'" align="center"><img width="44" height="10" border="0" src="'+ iTop +'"></td><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td></tr></tbody></table>';
layout += chat1 + chat2 + chat3 + chat4 + chat5 +'</td></tr><tr><td valign="top" colspan="2">';
/*footer*/
var footer1 = '<table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#808080"><tbody><tr><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td><td background="'+ iTop +'" align="center" colspan="3"><img width="44" height="10" border="0" src="'+ iTop +'"></td><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td></tr><tr><td background="'+ iSide +'"><img width="10" height="44" border="0" src="'+ iSide +'"></td><td width="0" bgcolor="0"><img border="0" src="'+ iDragon +'"></td><td width="100%" bgcolor="0" style="text-align:center;color:#ddd;">';
var footer2 = '<div id="footer">Copyright &copy; 2014. All Rights Reserved. <a href="index.php?mod=terms" target="_blank">Terms</a>.</div>';
var footer3 = '</td><td width="0" bgcolor="#000000" align="right">	<img border="0" src="'+ iMinotaur +'"></td><td background="'+ iSide +'"><img width="10" height="44" border="0" src="'+ iSide +'"></td></tr><tr><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td><td background="'+ iTop +'" align="center" colspan="3"><img width="44" height="10" border="0" src="'+ iTop +'"></td><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td></tr></tbody></table>';
layout += footer1 + footer2 + footer3;
layout += '</td></tr></table>';
/*right panel*/
var pageWrap2 = '</td></tr></table><td width="275" height="0" valign="top" style="text-align:right;">';
/*right panel (map)*/
layout += pageWrap2 +'<table id="rightpanel" width="100%" border="0" cellspacing="4" cellpadding="0"><tr><td>';
var rightPanel1 = '<table align="right" cellspacing="0" cellpadding="0" border="0" bgcolor="#808080" style="color:#fff;"><tbody><tr><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td><td background="'+ iTop +'" align="center" colspan="1"><img width="44" height="10" border="0" src="'+ iTop +'"></td><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td></tr>';
var rightPanelTr1 = '<tr><td background="'+ iSide +'" rowspan="1"><img width="10" height="44" border="0" src="'+ iSide +'"></td><td width="'+ rightWidth +'" bgcolor="0" style="text-align:center;"><div id="right1">            <p style="margin-top: 4px; font-weight: bold; color:#ddd;"><span id="locname"><a href="#">'+ locname +'</a></span></p><table width="110" height="110" cellspacing="0" cellpadding="0" border="0" align="center" style="background-image: url(\'http://www.thelostrunes.com/images/template/compass_back.png\');"><tbody><tr><td valign="top" height="23" colspan="3" style="text-align:center;"><span id="locnorth"><a href="javascript:go(1);"><img src="http://www.thelostrunes.com/images/template/compass_north.png"></a></span></td></tr><tr><td height="21"></td></tr><tr><td height="22" align="left"><span id="locwest"><a href="javascript:go(4);"><img src="http://www.thelostrunes.com/images/template/compass_west.png"></a></span></td><td valign="middle" style="padding-bottom: 4px;text-align:center;"><span style="padding-right: 1px; color:#FFFFFF;" id="loccoords">'+ loccoords +'</span></td><td align="right"><span id="loceast"><a href="javascript:go(3);"><img src="http://www.thelostrunes.com/images/template/compass_east.png"></a></span></td></tr><tr><td height="21"></td></tr><tr><td valign="top" height="23" colspan="3" style="text-align:center;"><span id="locsouth"><a href="javascript:go(2);"><img src="http://www.thelostrunes.com/images/template/compass_south.png"></a></span></td></tr></tbody></table>        </div></td><td background="'+ iSide +'" rowspan="1"><img width="10" height="44" border="0" src="'+ iSide +'"></td></tr>';
var rightPanelTr2 = '<tr><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td><td background="'+ iTop +'" align="center" colspan="1"><img width="44" height="10" border="0" src="'+ iTop +'"></td><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td></tr>';
layout += rightPanel1 + rightPanelTr1 + rightPanelTr2 + '</tbody></table>';
/*right panel (see)*/
layout += '</td></tr><tr><td>';
var rightPanel2 = '<table align="right" cellspacing="0" cellpadding="0" border="0" bgcolor="#808080" style="color:#fff;"><tbody><tr><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td><td background="'+ iTop +'" align="center" colspan="1"><img width="44" height="10" border="0" src="'+ iTop +'"></td><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td></tr>';
var rightPanelTr3 = '<tr><td background="'+ iSide +'" rowspan="1"><img width="10" height="44" border="0" src="'+ iSide +'"></td><td width="'+ rightWidth +'" bgcolor="0" style="text-align:left;color:#ddd;"><div id="right3"><b>You see...</b><br><span id="locationdiv">'+ locationdiv +'</span><div align="center">[ <a href="javascript:go(5);">Look Around</a> ]</div></div></td><td background="'+ iSide +'" rowspan="1"><img width="10" height="44" border="0" src="'+ iSide +'"></td></tr>';
var rightPanelTr4 = '<tr><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td><td background="'+ iTop +'" align="center" colspan="1"><img width="44" height="10" border="0" src="'+ iTop +'"></td><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td></tr></tbody></table>';
layout += rightPanel2 + rightPanelTr3 + rightPanelTr4;
/*right panel (equipment)*/
layout += '</td></tr><tr><td>';
var rightPanel3 = '<table align="right" cellspacing="0" cellpadding="0" border="0" bgcolor="#808080" style="color:#fff;text-align:left;"><tbody><tr><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td><td background="'+ iTop +'" align="center" colspan="1"><img width="44" height="10" border="0" src="'+ iTop +'"></td><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td></tr>';
var rightPanelTr5 = '<tr><td background="'+ iSide +'" rowspan="1"><img width="10" height="44" border="0" src="'+ iSide +'"></td><td width="'+ rightWidth +'" bgcolor="0"><div id="right2">'+ right2 +'</div></td><td background="'+ iSide +'" rowspan="1"><img width="10" height="44" border="0" src="'+ iSide +'"></td></tr>';
var rightPanelTr6 = '<tr><td width="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td><td background="'+ iTop +'" align="center" colspan="1"><img width="44" height="10" border="0" src="'+ iTop +'"></td><td width="0" height="0"><img width="10" height="10" border="0" src="'+ iCorner +'"></td></tr></tbody></table>';
layout += rightPanel3 + rightPanelTr5 + rightPanelTr6;
var pageWrap3 = '</td></tr></table></td></tr></table>';
/*fill the body with new creation*/
document.body.innerHTML = layout + pageWrap3;