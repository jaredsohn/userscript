// ==UserScript==
// @name        WOTPublic - WatchDog 4 eRep
// @namespace   WOTPublic - WatchDog 4 eRep
// @description A Large DB About Accounts|Gold|CC eScammers
// @include     http://www.erepublik.com/*/citizen/profile/*
// @author      I.RAPID.I
// @version     1.1
// @require	http://code.jquery.com/jquery-1.8.1.js
// ==/UserScript==

var WOT, SCAM;
	
WOT = new Array("I.Rapid.I");

SCAM = [];

SCAM = JSON.parse(GM_getValue('ScamStore'));

function Core(){

	var A, B, C, D, E, Ambassador, Elite, Index;
			
	Ambassador = $(".ambassador").remove();
	Elite = $("h2:eq(1) span:eq(1)").remove();
		
	A = $("h2:eq(1)");
	A = A.html();
	A = A.split("</span>")[1];
	Ax = A.replace(/\s+/g, "");
	
	if (jQuery.inArray(Ax, WOT) === -1) {
	
		if (jQuery.inArray(Ax, SCAM) === -1) {
		
			A = $("h2");
			B = A.append("<strong class='WOT'> ≈ Safe ≈ </strong><img original-title='≈ Safe ≈ : This eCitizen Should Be Safe' class='tips' src='http://www.erepublik.com/images/modules/_icons/small_info_icon.png' style='position:relative;bottom:9px;' alt=''>");
			C = $(".WOT");
			C.css("color", "#F4A460");
			
		}
		else {
		
			A = $("h2");
			B = A.append("<strong class='WOT'> ! Scammer ! </strong><img original-title='! Scammer ! : This eCitizen Is Not Safe' class='tips' src='http://www.erepublik.com/images/modules/_icons/small_info_icon.png' style='position:relative;bottom:9px;' alt=''>");
			C = $(".WOT");
			C.css("color", "#DC143C");
			
		}
		
	}
	else {
		A = $("h2");
		B = A.append("<strong class='WOT'> * WOT Admin * </strong> <img original-title='* WOT Admin * : This eCitizen Is Safe' class='tips' src='http://www.erepublik.com/images/modules/_icons/small_info_icon.png' style='position:relative;bottom:9px;' alt=''>");
		C = $(".WOT");
		C.css("color", "#A0CE00");
	}
	
	D = $(".WOT");
	D = D.html();
	
	if ( D === " ≈ Safe ≈ ") {
	
		$(".citizen_actions").append("<br /><a original-title='Add This eCitizen To ! Scammer ! List' id='action_friend tip' class='action_friend tip'>Add To ! Scammer ! List</a><a class='action_message tip' href='http://www.erepublik.com/en/main/messages-compose/5285945' original-title='Send This eCitizen Name To The * WOT Admin *' >Send This eCitizen Name To The * WOT Admin *</a>");

		E = document.getElementById("action_friend tip");
		
		E.onclick = function Push() {
			
			SCAM.push(Ax);
			
			GM_setValue("ScamStore",JSON.stringify(SCAM));
			
			document.location.reload(true);
			
			
		};

	}
	
	if ( D === " ! Scammer ! ") {
	
		$(".citizen_actions").append("<br /><a original-title='Remove This eCitizen From ! Scammer ! List' id='action_friend_remove tip' class='action_friend_remove tip'>Remove From ! Scammer ! List</a><a class='action_message tip' href='http://www.erepublik.com/en/main/messages-compose/5285945' original-title='Send This eCitizen Name To The * WOT Admin *' >Send This eCitizen Name To The * WOT Admin *</a>");
		
		E = document.getElementById("action_friend_remove tip");
		
		E.onclick = function Rem() {
			
			Index = SCAM.indexOf(Ax)
			
			SCAM.splice(Index);
			
			GM_setValue("ScamStore",JSON.stringify(SCAM));
			
			document.location.reload(true);
			
			
		};
		
	}

};

Core();