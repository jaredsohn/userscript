// ==UserScript==
// @name               JumpGate_Availability
// @description    Marquage des lune avec porte de saut non disponible,...
// @author             Hatake Kakashi
// @namespace      KakashiScripts
// @version        2.2.3
// @date             2011-06-27
// @include        http://*.ogame.*/game/index.php?page=*
// @exclude       http://*.ogame.*/game/index.php?page=eventList*
// ==/UserScript==


/**** function de vulca et mushrorn pour autre navigateur que firefox ***/
/****  Browser compatibility function By Vulca And Mushrorn ***/

var FireFox = navigator.userAgent.indexOf("Firefox") > -1 || navigator.userAgent.indexOf("Iceweasel") > -1;
var nomScript = FireFox? '' : 'jumptgate';
var Opera = navigator.userAgent.indexOf('Opera')>-1;

	// Google Chrome  
	if(!FireFox){

			GM_getValue = function(key, defaultValue) {
			var retValue = localStorage.getItem(key);
				if (!retValue) {
					retValue = defaultValue;
				}
				return retValue;
			}
			GM_setValue = function(key, value) {
				localStorage.setItem(key, value);
			}
			GM_deleteValue = function(key) {
				localStorage.removeItem(key);
			}
			GM_addStyle = function (css) {
				var NSURI = 'http://www.w3.org/1999/xhtml';
				var hashead = document.getElementsByTagName('head')[0];
				var parentel = hashead || document.documentElement;
				var newElement = document.createElementNS(NSURI,'link');
				newElement.setAttributeNS(NSURI,'rel','stylesheet');
				newElement.setAttributeNS(NSURI,'type','text/css');
				newElement.setAttributeNS(NSURI,'href','data:text/css,'+encodeURIComponent(css));
				if( hashead ) {
					parentel.appendChild(newElement);
				} else {
					parentel.insertBefore(newElement,parentel.firstChild);
				}
			}
	
	}




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
case "uni40_com.es":  UniSpeedFactor	= 2 ; break;
case "uni50_com.es":  UniSpeedFactor	= 2 ; break;
case "uni106_com.es": UniSpeedFactor	= 4 ; break;

// FR
case "uni50_fr":  UniSpeedFactor	= 2 ; break;
case "uni60_fr":  UniSpeedFactor	= 2 ; break;
case "uni106_fr": UniSpeedFactor	= 4 ; break;
case "uni107_fr": UniSpeedFactor	= 2 ; break;
case "uni112_fr": UniSpeedFactor	= 2 ; break;

//HU
case "uni5_hu":  UniSpeedFactor	        = 2 ; break;

//IT
case "uni25_it": UniSpeedFactor        = 2 ; break;
case "uni30_it": UniSpeedFactor        = 2 ; break;
case "uni35_it": UniSpeedFactor        = 2 ; break;
case "uni40_it": UniSpeedFactor        = 2 ; break;
case "uni105_it": UniSpeedFactor      = 2 ; break;
case "uni104_it": UniSpeedFactor        = 4 ; break;

//NL
case "uni10_nl": UniSpeedFactor        = 2 ; break;

// ORG
case "uni30_org": UniSpeedFactor        = 2 ; break;
case "uni35_org": UniSpeedFactor        = 5 ; break;
case "uni40_org": UniSpeedFactor        = 2 ; break;
case "uni42_org": UniSpeedFactor        = 2 ; break;
case "uni105_org": UniSpeedFactor      = 4 ; break;

//RU
case "uni10_ru" : UniSpeedFactor        = 2 ; break;
case "uni103_ru": UniSpeedFactor        = 4 ; break;
case "uni107_ru": UniSpeedFactor        = 2 ; break;

//PL
case "uni50_pl":  UniSpeedFactor        = 2 ; break;
case "uni60_pl":  UniSpeedFactor        = 2 ; break;

//PT
case "uni20_com.pt":  UniSpeedFactor        = 2 ; break;
case "uni103_com.pt":  UniSpeedFactor        = 4 ; break;

//TR
case "uni50.tr_org":  UniSpeedFactor        = 2 ; break;

//TW
case "uni10_tw":  UniSpeedFactor        = 2 ; break;

//US
case "uni5_us":  UniSpeedFactor         = 2 ; break;
case "uni102_us":  UniSpeedFactor        = 3 ; break;

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
var ArrayMoonTitle = new Array();
var ListPlan = document.getElementsByClassName("smallplanet");
for( i=0; i < ListPlan.length ; i++){
	CodeMoon = GetMoonCode(ListPlan[i]);
	if(ListPlan[i].getElementsByClassName("active")[0] != null){
		GM_setValue("SelectedMoon"+server, CodeMoon);
	}
	if (CodeMoon != 0){
		ArrayMoonTitle[i] = ListPlan[i].getElementsByClassName("moonlink")[0].title;
	}else{
		ArrayMoonTitle[i] = "" ;
	}
	if(GM_getValue("Moon"+CodeMoon,null) != null){
	TimeMoon = GM_getValue("Moon"+CodeMoon,0);
		if (currentTime.getTime() < parseInt(TimeMoon) + (3600 * 1000)/UniSpeedFactor){
			ListPlan[i].getElementsByClassName("moonlink")[0].getElementsByTagName("img")[0].style.border="2px solid red" ;
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
		page = page + "&cp="+GM_getValue("JumpGateDest"+server,0);
		currentTime = new Date();
		GM_setValue("Moon"+GM_getValue("SelectedMoon"+server,0),currentTime.getTime().toString());
		GM_setValue("Moon"+GM_getValue("JumpGateDest"+server,0),currentTime.getTime().toString());
		window.location = page;
	}, true);
}

if(document.getElementById("slot01") != null){	
	OpenJG = document.getElementById("slot01").getElementsByTagName("a")[0];
	txtButton = OpenJG.innerHTML;
}


setInterval(AddCountDown,1000);


function AddCountDown(){
	
	currentTime = new Date();
	
	for( i=0; i < ListPlan.length ; i++){
		CodeMoon = GetMoonCode(ListPlan[i]);
		if(GM_getValue("Moon"+CodeMoon,null) != null){
			TimeMoon = parseInt(GM_getValue("Moon"+CodeMoon,0));
			if (currentTime.getTime() < TimeMoon + (3600 * 1000)/UniSpeedFactor){
				CountDownTime = (TimeMoon + (3600 * 1000)/UniSpeedFactor) - currentTime.getTime()
				var d = new Date(CountDownTime);
				var min = d.getMinutes();
				var sec = d.getSeconds();
				ListPlan[i].getElementsByClassName("moonlink")[0].title = ArrayMoonTitle[i]+"  "+min+":"+sec ; 
			}
		}
	}
	if(document.getElementById("slot01") != null){	
		var LastJumpTime = parseInt(GM_getValue("Moon"+GM_getValue("SelectedMoon"+server,0),0));
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
}