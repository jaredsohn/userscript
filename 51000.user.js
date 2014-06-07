// ==UserScript==
// @name           Pfandflaschensammler
// @namespace      Ornz-zr-hc-Fpbggl
// @author         lmk
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @copyright      (c) 2009, lmk.
// @description    Nach beendetem Pfandflaschensammeln wird ein Hinweis auf der zuletzt geoeffneten Seite ausgegeben und es kann zur Pfandflaschensammelseite weitergeleited werden.
// @version        0.3.4
// @include        http://*.pennergame.de/*
// @include        http://pennergame.de/*
// @include        http://*.dossergame.co.uk/*
// @include        http://dossergame.co.uk/*
// @include        http://*.menelgame.pl/*
// @include        http://menelgame.pl/*
// ==/UserScript==


/* Automatic click on "start collecting" | Automatischer Klick auf "Sammeln" */
var autoSubmit = true; //false;

/* Alert messages */
var msgDone1 = "Das Pfandflaschensammeln wurde beendet.";	// "Collecting done";
var msgDone2 = "Klicke auf OK um die Aktionsseite zu " + unescape("%F6") + "ffnen.";	// "Click ok to open actions-page";

/* Captcha select title*/
var strTime = "Zeit: ";  // "Time: "; 


/*-*/

var intervalTime = 4000;
var done = " -/-"; // text after counter reached 0:00
var time = String(new Date().getTime());
var counter = done;
var nameHostTime = window.location.host + "-time";
var nameLastCollectTime = window.location.host + "-LastCollectTime";


try{
	counter = document.getElementById("counter2").innerHTML;
}
catch(err){
	submit();
}

if (counter != done){
	GM_setValue(nameHostTime, time); //store time for each domain to prevent multiple run in same domain
	var checkInterval = window.setInterval(check,intervalTime);
}

function submit(){

	if( (window.location.pathname == "/activities/" || window.location.pathname == "/activities/bottle/") && autoSubmit){
		
		var lastCollectTime = GM_getValue(nameLastCollectTime,0);
		
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent("change", true, true);
		
		var timeOptions = document.getElementsByName("time")[0];
		timeOptions.selectedIndex = lastCollectTime;
		timeOptions.dispatchEvent(evt);
		timeOptions.addEventListener( "change",
		                              function(){  GM_setValue(nameLastCollectTime, document.getElementsByName("time")[0].selectedIndex);
		                                           timeOptionsCaptcha.selectedIndex = timeOptions.selectedIndex; },
		                              true );
		
		var timeOptionsCaptcha = timeOptions.cloneNode(true);
		timeOptionsCaptcha.selectedIndex = timeOptions.selectedIndex;
		timeOptionsCaptcha.addEventListener( "change",
		                                     function(){ GM_setValue(nameLastCollectTime, document.getElementsByName("time")[0].selectedIndex);
		                                                 timeOptions.selectedIndex = timeOptionsCaptcha.selectedIndex;},
		                                     true);

		var captchaHolder = document.getElementById("holder");
		var infoText = captchaHolder.insertBefore(document.createElement('p'),captchaHolder.getElementsByTagName("span")[1]);
		infoText.innerHTML = strTime;
		infoText.appendChild(timeOptionsCaptcha);
		infoText.style.margin = "0px";
		infoText.style.marginTop = "8px";
		
		var cancelButton = captchaHolder.getElementsByClassName("cancel")[0];
		cancelButton.style.margin = "0px";
		cancelButton.style.marginLeft = "10px";
		infoText.appendChild(cancelButton);
		
		setTimeout("document.getElementsByName('Submit2')[0].click();", 1000); // fails often if to fast
	}
}

function check(){

	counter = document.getElementById("counter2").innerHTML;
	
	if(GM_getValue(nameHostTime) != time){ //script started somewhere else
		clearInterval(checkInterval);
		return 0;
	}

	if(counter == done){
		if(window.location.pathname == "/activities/" || window.location.pathname == "/activities/bottle/" ){
			setTimeout(reload, 1000);
		} else {
			setTimeout(refer, 1000);
		}
		clearInterval(checkInterval); // stop script
	}
}

function refer(){
	var box = window.confirm( msgDone1 + "\n" + msgDone2 );
		if(box == true){
			window.location.href = window.location.protocol + "//" + window.location.host + "/activities/";
		}
}

function reload(){
	alert(msgDone1);
	window.location.replace( window.location.protocol + "//" + window.location.host + "/activities/" );
} 

