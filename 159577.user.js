// ==UserScript==
// @name       		BreadfishRP PM-Notification
// @namespace  		http://bensoft.de/
// @version    		2.2
// @description  	Werde über die Webkit Notification API über neue PMs informiert
// @match    		http://www.breadfish-rp.de/*
// @require       	http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @copyright  		2013+, bensoft.de, 946ben, Benjamin Hesse
// ==/UserScript==

$bJ = jQuery.noConflict();

var popupStatus8 = 0;
var not;
var checkInterval;

$bJ(document).ready(function () {
    initpop8();
    if(!unsafeWindow.webkitNotifications) {
    	openpop8("Kein Webkit", "Die BreadfishRP PM-Notification basiert auf der Notifications API der Webkit HTML Rendering Engine.<br>Scheinbar verwendet dein Browser kein Webkit oder ist stark veraltet. Deshalb kannst du mit diesem Browser dieses Script nicht nutzen.<br>Gängige Browser, die Webkit verwenden, sind bspw. Google Chrome und Safari.");
        return 1;
    }
    if(unsafeWindow.webkitNotifications.checkPermission() != 0) {
        openpop8("Warte auf Berechtigung", "<center><img src=\"http://bensoft.de/pmcloud/loadbig.gif\"></center><br>Herzlichen Glückwunsch, du hast das PM-Notification Script erfolgreich installiert.<br>Dein Browser erwartet allerdings zunächst noch eine Bestätigung, ob du BreadfishRP<br>die Berechtigung geben möchtest, die Webkit Notification API zu nutzen.<br><center><input type=\"button\" id=\"getPerm\" value=\"Berechtigung anfordern\"></center>");
        requestPerm();
        $bJ("#getPerm").click(function() {
            GM_setValue("hadUpdate2", 1);
            GM_setValue("pmActive", 1);
            GM_setValue("soundActive", 1);
       		unsafeWindow.webkitNotifications.requestPermission(); 
    	});
  		return 1;
    }
    if(!GM_getValue("hadUpdate2")) {
        openpop8("Update", "<center><img src=\"http://bensoft.de/pmcloud/loadbig.gif\"></center><br>Das Update auf Version verlangt einige Variablen. Bitte warte, während diese erstellt werden.");
        GM_setValue("hadUpdate2", "1");
        GM_setValue("pmActive", 1);
        GM_setValue("soundActive", 1);
        disablePopup8();
    }
    startUp();
});

function requestPerm() {
    if(unsafeWindow.webkitNotifications.checkPermission() == 0) {
    	startUp();
    } else {
        unsafeWindow.setTimeout(requestPerm, 1000);
    }
    return 1;
}

function checkPMs() {
    GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.breadfish-rp.de/breadfish-roleplay.html",
		onload: function(resp) {
			var content = resp.responseText;
            var text = $bJ(content).find("#pmOutstandingNotifications").find("p").text().replace(":", "");
            if(text != GM_getValue("notText")) {
                if(text != "") {
                    not.show();
                    not.cancel();	
                    if(GM_getValue("soundActive") == 1) document.getElementById('messageAudio').play();
                    not = unsafeWindow.webkitNotifications.createNotification('http://bensoft.de/pmcloud/message.png', 'PM-Benachrichtigung', text);
                    not.show();
                }
                GM_setValue("notText", text);
            }
		}
	});
}

function startUp() {
    disablePopup8();
    $bJ("#main").before("<audio id=\"messageAudio\"><source src=\"http://bensoft.de/pmcloud/messagesound.mp3\" type=\"audio/mpeg\"></audio>");
    not = unsafeWindow.webkitNotifications.createNotification('http://bensoft.de/pmcloud/message.png', 'dummy', 'dummy');
    checkInterval = unsafeWindow.setInterval(checkPMs, 10000);
    $bJ("#userMenu > ul").append("<li  id=\"togglePMNot\"><a href=\"javascript: void();\"><img src=\"http://bensoft.de/pmcloud/nomessage.png\" id=\"togglePMNotImg\" alt=\"\" height=\"16px\" /> <span id=\"togglePMNotText\">PM-Notification ausschalten</span></a></li>");   
	$bJ("#userMenu > ul").append("<li  id=\"togglePMSound\"><a href=\"javascript: void();\"><img src=\"http://bensoft.de/pmcloud/nosound.png\" id=\"togglePMSoundImg\" alt=\"\" height=\"16px\" /> <span id=\"togglePMSoundText\">PM-Sound ausschalten</span></a></li>");   
	if(GM_getValue("pmActive") == 0) {
        $bJ("#togglePMNotImg").attr("src", "http://bensoft.de/pmcloud/message.png");
        $bJ("#togglePMNotText").html("PM-Notification einschalten");
        unsafeWindow.clearInterval(checkInterval);
    }
    if(GM_getValue("soundActive") == 0) {
        $bJ("#togglePMSoundImg").attr("src", "http://bensoft.de/pmcloud/sound.png");
        $bJ("#togglePMSoundText").html("PM-Sound einschalten");
    }
    
    $bJ("#togglePMNot").click(function () {
        if(GM_getValue("pmActive") == 0) {
            checkInterval = unsafeWindow.setInterval(checkPMs, 10000);
        	$bJ("#togglePMNotImg").attr("src", "http://bensoft.de/pmcloud/nomessage.png");
        	$bJ("#togglePMNotText").html("PM-Notification ausschalten");
            GM_setValue("pmActive", 1);
        } else {
            unsafeWindow.clearInterval(checkInterval);
        	$bJ("#togglePMNotImg").attr("src", "http://bensoft.de/pmcloud/message.png");
        	$bJ("#togglePMNotText").html("PM-Notification einschalten");
            GM_setValue("pmActive", 0);
        }
    });
    $bJ("#togglePMSound").click(function () {
        if(GM_getValue("soundActive") == 0) {
        	$bJ("#togglePMSoundImg").attr("src", "http://bensoft.de/pmcloud/nosound.png");
            $bJ("#togglePMSoundText").html("PM-Sound ausschalten");
            GM_setValue("soundActive", 1);
        } else {
        	$bJ("#togglePMSoundImg").attr("src", "http://bensoft.de/pmcloud/sound.png");
       		$bJ("#togglePMSoundText").html("PM-Sound einschalten");
            GM_setValue("soundActive", 0);
        }
    });
}


//Die Fenster. Die habe ich von Trooper geklaut, sorry :( Soweit ich weiß, hat er sie aber von irgendwo anders geklaut :D Habs ein wenig angepasst ;)
function openpop8(titel,text,istext)
{
	$bJ("#popupContact8 > h1").html(titel);
	if(!istext) $bJ("#contactArea8").html(text);
	else $bJ("#contactArea8").text(text);
	centerPopup8();
	loadPopup8(); 
}

function initpop8()
{	
	GM_addStyle("#backgroundPopup8{  \
display:none;  \
position:fixed;  \
_position:absolute;   \
height:500%;  \
width:500%;  \
top:-15px;  \
left:-15px;  \
background:#000000;  \
border:1px solid #cecece;  \
z-index:98;  \
}  \
#popupContact8{  \
display:none;  \
position:fixed;  \
_position:fixed;   \
min-width:408px;  \
max-width:80%; \
max-height:80%; \
background:#FFFFFF;  \
border:2px solid #cecece;  \
z-index:99;  \
padding:12px;  \
font-size:13px;  \
}  \
#popupContact8 h1{  \
text-align:left;  \
color:#C92034;  \
font-size:22px;  \
font-weight:700;  \
border-bottom:1px dotted #D3D3D3;  \
padding-bottom:2px;  \
margin-bottom:20px;  \
}  \
#popupContactClose8{  \
font-size:14px;  \
line-height:14px;  \
right:6px;  \
top:4px;  \
position:absolute;  \
color:#C92034;  \
font-weight:700;  \
display:block;  \
}  \
");

	$bJ("#main").before(''+
	'<div id="popupContact8">  '+
    '    <a id="popupContactClose8">x</a> '+ 
    '    <h1></h1>  '+
    '    <p id="contactArea8">  '+
    '    </p>  '+
    '</div> '+
	'<div id="backgroundPopup8"></div>');
	
	$bJ("#popupContactClose8").click(function() {  
		disablePopup8();  
	});  
	
	$bJ("#backgroundPopup8").click(function() {  
		disablePopup8();  
	});  
	
	$bJ(document).keypress(function(e) {  
		if(e.keyCode==27 && popupStatus8==1)
		{  
			disablePopup8();  
		}  
	});
}

function loadPopup8()
{  
	if(popupStatus8==0)
	{  
		$bJ("#backgroundPopup8").css({  
		"opacity": "0.7"  
		});  
		$bJ("#backgroundPopup8").fadeIn("fast");  
		$bJ("#popupContact8").fadeIn("fast");  
		popupStatus8 = 1;  
	}  
}  

function disablePopup8(){   
if(popupStatus8==1){  
$bJ("#backgroundPopup8").fadeOut("fast");  
$bJ("#popupContact8").fadeOut("fast");  
popupStatus8 = 0;  
}  
}  

function centerPopup8(){
var windowWidth = document.documentElement.clientWidth;
var windowHeight = document.documentElement.clientHeight;
var popupHeight = $bJ("#popupContact8").height();
var popupWidth = $bJ("#popupContact8").width();
//centering
$bJ("#popupContact8").css({
"position": "fixed",
"top": windowHeight/2-popupHeight/2,
"left": windowWidth/2-popupWidth/2
});
}