// ==UserScript==
// @name               JumpGate_Availability
// @description    Marquage des lune avec porte de saut non disponible,...
// @author             Hatake Kakashi
// @namespace      KakashiScripts
// @version        2.1.2
// @date             2010-11-27
// @include        http://*.ogame.*/game/index.php?page=*
// @exclude       http://*.ogame.*/game/index.php?page=eventList*
// ==/UserScript==



// *********************************  JumpGate_Availability **********************************

var UniSpeedFactor ;
var server = location.href.split('/')[2];
var txtButton;
server = server.replace(".ogame.","_");
switch(server)
{
// DE 
case "uni50_de":  UniSpeedFactor	= 2 ; break;
case "uni60_de":  UniSpeedFactor	= 2 ; break;
case "uni70_de": UniSpeedFactor	        = 4 ; break;

// DK
case "uni10_dk":  UniSpeedFactor	= 2 ; break;

// ES
case "uni40_es":  UniSpeedFactor	= 2 ; break;
case "uni50_es":  UniSpeedFactor	= 2 ; break;

// FR
case "uni50_fr":  UniSpeedFactor	= 2 ; break;
case "uni60_fr":  UniSpeedFactor	= 2 ; break;
case "fornax_fr": UniSpeedFactor	= 4 ; break;
case "gemini_fr": UniSpeedFactor	= 2 ; break;

//HU
case "uni5_hu":  UniSpeedFactor	        = 2 ; break;

//IT
case "uni25_it": UniSpeedFactor        = 2 ; break;
case "uni30_it": UniSpeedFactor        = 2 ; break;
case "uni35_it": UniSpeedFactor        = 2 ; break;
case "uni40_it": UniSpeedFactor        = 2 ; break;
case "electra_it": UniSpeedFactor      = 2 ; break;
case "draco_it": UniSpeedFactor        = 4 ; break;

//NL
case "uni10_nl": UniSpeedFactor        = 2 ; break;

// ORG
case "uni30_org": UniSpeedFactor        = 2 ; break;
case "uni35_org": UniSpeedFactor        = 5 ; break;
case "uni40_org": UniSpeedFactor        = 2 ; break;
case "uni42_org": UniSpeedFactor        = 2 ; break;
case "electra_org": UniSpeedFactor      = 4 ; break;

//RU
case "uni10_ru" : UniSpeedFactor        = 2 ; break;
case "capela_ru": UniSpeedFactor        = 4 ; break;

//PL
case "uni50_pl":  UniSpeedFactor        = 2 ; break;
case "uni60_pl":  UniSpeedFactor        = 2 ; break;

//PT
case "uni20_pt":  UniSpeedFactor        = 2 ; break;

//TR
case "uni50.tr_org":  UniSpeedFactor        = 2 ; break;

//TW
case "uni10_tw":  UniSpeedFactor        = 2 ; break;

//US
case "uni5_us":  UniSpeedFactor         = 2 ; break;
case "barym_us":  UniSpeedFactor        = 3 ; break;

// DEFAULT
default: 		  UniSpeedFactor	= 1 ;
}

function GetMoonCode(smallplanet){
var MoonLink = smallplanet.getElementsByClassName("moonlink")[0] ;
	if(MoonLink != null){
		MoonLinkParams =  MoonLink.href.split("&");
		return MoonLinkParams[MoonLinkParams.length - 1].substr(3);
	}
	else{
		return 0 ;
	}
}

var currentTime = new Date();
var TimeMoon;
var ArrayMoon = new Array();
var ListColo = document.getElementsByClassName("smallplanet");
for( i=0; i < ListColo.length ; i++){
	ArrayMoon[i] = GetMoonCode(ListColo[i]);
	if(ListColo[i].getElementsByClassName("active")[0] != null){
		GM_setValue("SelectedMoon"+server, ArrayMoon[i]);
	//	alert(ArrayMoon[i]);
	}
	
	if(GM_getValue("Moon"+ArrayMoon[i]) != null){
	TimeMoon = GM_getValue("Moon"+ArrayMoon[i]);
		if (currentTime.getTime() < parseInt(TimeMoon) + (3600 * 1000)/UniSpeedFactor){
			ListColo[i].getElementsByClassName("moonlink")[0].getElementsByTagName("img")[0].style.border="2px solid red" ;

		}
	}
}


var JumpGateForm = document.getElementById('jumpgateForm');
if(JumpGateForm != null){
	SelectDest = JumpGateForm.getElementsByTagName('select')[0];
	if(SelectDest != null){
		var val = SelectDest.value;
		GM_setValue("JumpGateDest"+server,val);
		SelectDest.addEventListener("change", function(event) {
			val = SelectDest.value;
			GM_setValue("JumpGateDest"+server,val);
		}, true);
	}
}

var page = document.location.href;
var NotifBox = document.getElementById('errorBoxNotify');

if(page.indexOf("page=station")> -1){
NotifBox.innerHTML = "<div id='wrapper'><h4 id='errorBoxNotifyHead'>-</h4><p id='errorBoxNotifyContent'>-</p><div id='response'><div><a href='#' class='ok'><span id='errorBoxNotifyOk'>.</span></a></div><br class='clearfloat'></div></div>";
var OKResponse = document.getElementById('errorBoxNotifyOk');
OKResponse.addEventListener("click", function(event) {

		page = page.replace("station", "overview");
		page = page.replace("&openJumpgate=1", "");
		if(page.indexOf("&cp=") > -1){
			var CpParam = page.substr(page.indexOf("&cp="),page.length - 1);
			page = page.replace(CpParam,"");
		}
		page = page + "&cp="+GM_getValue("JumpGateDest"+server);
		currentTime = new Date();
		GM_setValue("Moon"+GM_getValue("SelectedMoon"+server),currentTime.getTime().toString());
		GM_setValue("Moon"+GM_getValue("JumpGateDest"+server),currentTime.getTime().toString());
		window.location = page;
	}, true);
}

if(document.getElementById("slot01") != null){	
	OpenJG = document.getElementById("slot01").getElementsByTagName("a")[0];
	txtButton = OpenJG.innerHTML;
	if(OpenJG != null){
		currentTime = new Date();
		var LastJumpTime = parseInt(GM_getValue("Moon"+GM_getValue("SelectedMoon"+server)));
		if (currentTime.getTime() < LastJumpTime + (3600 * 1000)/UniSpeedFactor){
			setInterval(AddCountDown,1000);
		}
	}
}

function AddCountDown(){
	currentTime = new Date();
	var LastJumpTime = parseInt(GM_getValue("Moon"+GM_getValue("SelectedMoon"+server)));
	var OpenJG = document.getElementById("slot01").getElementsByTagName("a")[0];
	if (currentTime.getTime() < LastJumpTime + (3600 * 1000)/UniSpeedFactor){
		var CountDownTime = (LastJumpTime + (3600 * 1000)/UniSpeedFactor) - currentTime.getTime()
		var d = new Date(CountDownTime);
		var min = d.getMinutes();
		var sec = d.getSeconds();
		OpenJG.innerHTML = txtButton+"  "+min+":"+sec ;  
	}
	else{
		OpenJG.innerHTML = txtButton;
	}
}