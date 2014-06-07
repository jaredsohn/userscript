// ==UserScript==
// @name           Icons CSM
// @namespace      By Tiago with some support
// @include        http://www*.cs-manager.com/csm/*
// ==/UserScript==



function addStatus(sType, iNum){


if (iNum != 0){ /** ICONS A PISCAR **/
		if (sType == 'guestbook'){
			document.getElementById('status_gb').src = 'http://img520.imageshack.us/img520/7618/chat01uu2.png';
			document.getElementById('status_gb').setAttribute('title', iNum + ' new');
		} else if (sType == 'mail') {
			document.getElementById('status_mail').setAttribute("src", 'http://img369.imageshack.us/img369/9577/emailxt7.png');
		} else if (sType == 'pcw') {
			document.getElementById('status_pcw').src = 'http://img369.imageshack.us/img369/3738/charts01xc6.png';
			document.getElementById('status_pcw').setAttribute('title', iNum + ' new');
		} else if (sType == 'news') {
			var oObj = document.getElementById('clan_news');
			if (oObj != null) {
				oObj.innerHTML += ' (' + iNum + ')';
			}
		}

	} else if(iNum==0){ /** ICONS SEM PISCAR **/
		if(sType=="guestbook"){
			document.getElementById("status").getElementsByTagName("img")[0].setAttribute("src","http://img376.imageshack.us/img376/1/chat01tz8.png");
		} else if(sType=="mail"){
			document.getElementById("status").getElementsByTagName("img")[1].setAttribute("src","http://img72.imageshack.us/img72/9691/emailua5.png");
		} else if(sType=="pcw"){
			document.getElementById("status").getElementsByTagName("img")[2].setAttribute("src","http://img376.imageshack.us/img376/984/charts01si6.png");
		}
		document.getElementById("status").getElementsByTagName("img")[3].setAttribute("src","http://img376.imageshack.us/img376/3466/windowshx6.png");
		document.getElementById("status").getElementsByTagName("img")[4].setAttribute("src","http://img206.imageshack.us/img206/1820/doordh4.png");
	}


}

function embedFunction(s) {
	document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
	var allimgs = document.getElementsByTagName("img");
	

	

	var oServerTime = new Date();
	var oMenu = document.getElementById('game_tournament');
	var oBet = document.getElementById('community_betting');

	if (oMenu != null && oServerTime != null && ((oServerTime.getUTCDay() == 5 && oServerTime.getUTCHours() >= 15) || oServerTime.getUTCDay() > 5 || oServerTime.getUTCDay() == 0)){
		document.body.appendChild(document.createElement("style")).innerHTML="#game_tournament{background-image:url('http://users.telenet.be/tim.daminet/csm/online.png') !important;padding-top: 0px !important;background-repeat: no-repeat !important;background-position: top right !important;}";
	}
	
	if(oMenu != null && oServerTime != null && ((oServerTime.getUTCDay() == 3 && oServerTime.getUTCHours() >= 12) || (oServerTime.getUTCDay() == 4 && oServerTime.getUTCHours() <= 11))){
		document.body.appendChild(document.createElement("style")).innerHTML="#community_betting{background-image:url('http://i296.photobucket.com/albums/mm187/csmpresentations/misc/s9.gif') !important; padding-top: 0px !important;background-repeat: no-repeat !important;background-position: top right !important;}";
	}

	for(i=0; i<=allimgs.length; i++){
		if(allimgs[i].getAttribute("src")=="/images/notes.png"){
			allimgs[i].setAttribute('src','http://users.telenet.be/tim.daminet/csm/icon/notes.png');
		}

	}
}



embedFunction(addStatus);