// ==UserScript==
// @name       		BreadfishRP Messenger
// @namespace  		http://bensoft.de
// @version    		0.1 beta 4
// @update 			http://userscripts.org/scripts/source/162078.user.js
// @description  	immer noch nich
// @match      		http://*.breadfish-rp.de/*
// @copyright 		2013+, 946ben, Benjamin Hesse, bensoft.de
// @require       	http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @icon			http://bensoft.de/stuff/bm/icon.png
// @grant			GM_setValue
// @grant			GM_getValue
// @grant			GM_addStyle
// @grant			GM_xmlhttpRequest
// ==/UserScript==

$bM = jQuery.noConflict();

var fehler = 0;
var name = "";
var avatar = "http://www.breadfish-rp.de/";
var url = "";
var accept;
var chatUser = "none";

var popupStatus8 = 0;

$bM(document).ready(function () {
    initpop8();
    var nameTemp = $bM("#userNoteMenu").find("span").text().split(" ");
    name = nameTemp[0];
    if(name == "") {
        if(!GM_getValue("informedLogin")) {
            openpop8("Fehler", "Der BreadfishRP Messenger funktioniert nur, wenn du eingeloggt bist.");
            GM_setValue("informedLogin", 1);
        }
        return 1;
    }
    avatar = avatar + $bM("#userAvatar").find("img").attr("src");
    url = $bM("#userAvatar").find("a").attr("href");
    GM_setValue("informedLogin", 0);
    GM_xmlhttpRequest({
        method: "POST",
        url: "http://bensoft.de/stuff/bm/checklogin.php",
        data: "user=" + name,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        	"Cache-Control": "no-cache, must-revalidate",
        	"Expires": "Sat, 26 Jul 1997 05:00:00 GMT"
  		},
        onload: function(response) {
        	var resTemp = response.responseText;
        	var res = resTemp.split("|");
        	console.log("Login check: " + res[0]);
        	if(res[0] == 2) initMessenger();
            else {
        		if(res[0] == 0) {
        			openpop8("Registrierung", "Bevor du den Messenger mit dem Account " + name + " verwenden kannst, musst du dich mit ihm registrieren.<br>Gebe dazu einfach dein gewünschtes Passwort und deine E-Mail an.<br>Das Passwort muss <b>nicht</b> dein B:RP-Passwort sein!<br><br>\
												<table><tr><td><b>Username:</b></td><td><input type=\"name\" name=\"regUsername\" id=\"regUsername\" value=\"" + name + "\" style=\"width: 300px;\" readonly></td></tr>\
												<tr><td><b>Passwort:</b></td><td><input type=\"password\" name=\"regPW\" id=\"regPW\" style=\"width: 300px;\"></td></tr>\
												<tr><td><b>Wiederholen:</b></td><td><input type=\"password\" name=\"regWdh\" id=\"regWdh\" style=\"width: 300px;\"></td></tr>\
												<tr><td><b>E-Mail:</b></td><td><input type=\"name\" name=\"regEmail\" id=\"regEmail\" style=\"width: 300px;\"></td></tr></table>\
												<input type=\"button\" name=\"regButton\" id=\"regButton\" value=\"Registrieren\">");
					$bM("#regButton").click(function() {
						if($bM("#regPW").val() == "" || $bM("#regWdh").val() == "" || $bM("#regEmail").val() == "") {
							$bM("#regFail").remove();
							$bM("#contactArea8").prepend("<div id=\"regFail\"><font color=\"red\"><b>Es wurden nicht alle Felder ausgefüllt</b></font></div>");
						} else if($bM("#regPW").val() != $bM("#regWdh").val()) {
							$bM("#regFail").remove();
							$bM("#contactArea8").prepend("<div id=\"regFail\"><font color=\"red\"><b>Die Passwörter stimmen nicht überein</b></font></div>");
						} else {
							GM_xmlhttpRequest({
								method: "POST",
								url: "http://bensoft.de/stuff/bm/register.php",
								data: "user=" + name + "&password=" + $bM("#regPW").val() + "&email=" + $bM("#regEmail").val(),
								headers: {
									"Content-Type": "application/x-www-form-urlencoded",
									"Cache-Control": "no-cache, must-revalidate",
									"Expires": "Sat, 26 Jul 1997 05:00:00 GMT"
								},
								onload: function(response) {
									showLogin(0);
								}
							});	
						}
					});
    			}
                if(res[0] == 1) {
                	showLogin(0);   
                }
                if(res[0] == 3) {
                	GM_xmlhttpRequest({
                        method: "POST",
                        url: "http://bensoft.de/stuff/bm/login.php",
                        data: "user=" + res[1] + "&password=" + res[2] + "&md=1",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            "Cache-Control": "no-cache, must-revalidate",
                            "Expires": "Sat, 26 Jul 1997 05:00:00 GMT"
                        },
                        onload: function(response) {
                        	if(response.responseText == 0) showLogin(1);
							else initMessenger();
                    	}
                    });
                }
      		}
    	}
    });    
});

function showLogin(val) {
	var addText = "";
	if(val == 1) addText = "<font color=\"red\"><b>Die eingegebenen Daten waren falsch</b></font><br><br>";
	openpop8("Login", addText + "Bitte gibt unten dein Passwort für " + name + " ein:<br><input type=\"password\" name=\"loginPassword\"	id=\"loginPassword\" style=\"width: 300px;\">&nbsp;&nbsp;&nbsp;&nbsp;<input type=\"button\" name=\"loginButton\" id=\"loginButton\" value=\"Einloggen\">");
	$bM("#loginButton").click(function() {
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://bensoft.de/stuff/bm/login.php",
			data: "user=" + name + "&password=" + $bM("#loginPassword").val(),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"Cache-Control": "no-cache, must-revalidate",
				"Expires": "Sat, 26 Jul 1997 05:00:00 GMT"
			},
			onload: function(response) {
				if(response.responseText == 0) showLogin(1);
				else {
					initMessenger();
					disablePopup8();
				}
			}
		});
	});
}

function initMessenger() {
	sendInstallation();
    addStyles();
    if(fehler == 1) openpop8("Fehler", "Beim Aufrufen einer für den Messenger benötigten Datei ist ein Fehler aufgetreten.<br>Der BreadfishRP Messenger kann deher nicht genutzt werden.");
    else {
        $bM("#headerContainer").before("<div id=\"bmSidePanel\"></div>");
        $bM("#headerContainer").before("<div id=\"bmSlideOut\"><img src=\"http://bensoft.de/stuff/bm/arrow.png\" id=\"slideOut\"></div>");
        $bM("#headerContainer").before("<div id=\"bmChatBox\" style=\"display: none;\"><div id=\"bmChatHead\">Test</div></div>");
        $bM("#headerContainer").before("<div id=\"bmInfoBox\" style=\"display: none;\"></div>");
        loadUserList();
        sendInfo();
        unsafeWindow.setInterval(sendInfo, 5000);
        unsafeWindow.setInterval(loadUserList, 5000);
    }   
}

function sendInfo() {
    GM_xmlhttpRequest({
        method: "POST",
        url: "http://bensoft.de/stuff/bm/sendinfo.php",
        data: "username=" + name + "&avatar=" + avatar + "&url=" + $bM("#userAvatar").find("a").attr("href"),
        headers: {
    		"Content-Type": "application/x-www-form-urlencoded",
        	"Cache-Control": "no-cache, must-revalidate",
        	"Expires": "Sat, 26 Jul 1997 05:00:00 GMT"
  		}
    });
}


function loadUserList() {
    loadChat();
    checkContacts();
    GM_xmlhttpRequest({
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cache-Control": "no-cache, must-revalidate",
            "Expires": "Sat, 26 Jul 1997 05:00:00 GMT"
		},
        data: "user=" + name,
        url: "http://bensoft.de/stuff/bm/userlist.php",
        onload: function(response) {
        	$bM("#bmSidePanel").html(response.responseText);
            $bM(".bmSidePanelItem").click(function() {
                if($bM(this).attr("user") == -2) showAddMenu();
                else if($bM(this).attr("user") == -1) showRemMenu();
                else showChat($bM(this).attr("user"));
            });
        }
    });
}

function checkContacts() {
    GM_xmlhttpRequest({
        method: "POST", 
        url: "http://bensoft.de/stuff/bm/checkcontactrequest.php",
        data: "user=" + name,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cache-Control": "no-cache, must-revalidate",
            "Expires": "Sat, 26 Jul 1997 05:00:00 GMT"
		},
        onload: function(response) {
        	var text = response.responseText;
        	if(text != 0) {
                var info = text.split("|");
                $bM("#bmInfoBox").html("<div id=\"bmInfoHead\">&nbsp;Neue Kontaktanfrage</div><center>" + info[0] + "<br><img src=\"http://bensoft.de/stuff/bm/accept.png\" id=\"accept\" title=\"Annehmen\" style=\"cursor: pointer;\">&nbsp;&nbsp;<img src=\"http://bensoft.de/stuff/bm/cancel.png\" style=\"cursor: pointer;\" id=\"cancel\" title=\"Ablehnen\"></center>");
                accept = info[1];
                $bM("#bmInfoBox").fadeIn();
                $bM("#accept").click(function() {
                	acceptContact(); 
                });
                $bM("#cancel").click(function() {
                	cancelContact(); 
                });
            }
    	}
    });
}

function acceptContact() {
	GM_xmlhttpRequest({
        method: "POST", 
        url: "http://bensoft.de/stuff/bm/editcontactrequest.php",
        data: "edit=accept&from=" + accept + "&to=" + name,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cache-Control": "no-cache, must-revalidate",
            "Expires": "Sat, 26 Jul 1997 05:00:00 GMT"
		},
        onload: function(response) {
        	$bM("#bmInfoBox").fadeOut();
        	loadUserList();
    	}
    });
}
function cancelContact() {
    GM_xmlhttpRequest({
        method: "POST", 
        url: "http://bensoft.de/stuff/bm/editcontactrequest.php",
        data: "edit=cancel&from=" + accept + "&to=" + name,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cache-Control": "no-cache, must-revalidate",
            "Expires": "Sat, 26 Jul 1997 05:00:00 GMT"
		},
        onload: function(response) {
        	$bM("#bmInfoBox").fadeOut();
        	loadUserList();
    	}
    });
}

function showChat(user) {
    GM_xmlhttpRequest({
        method: "POST",
        url: "http://bensoft.de/stuff/bm/getusername.php",
        data: "id=" + user,
        headers: {
        	"Content-Type": "application/x-www-form-urlencoded",
        	"Cache-Control": "no-cache, must-revalidate",
        	"Expires": "Sat, 26 Jul 1997 05:00:00 GMT"
        },
        onload: function(response) {
        	chatUser = response.responseText;
        	$bM("#bmChatBox").html("<div id=\"bmChatHead\">&nbsp;<a href=\"javascript: void();\" id=\"closeChatBox\" class=\"bmLink\">X</a>&nbsp;&nbsp;&nbsp;" + chatUser + "</div>");
        	$bM("#bmChatBox").append("<div id=\"bmChatArea\"></div><div id=\"bmTextArea\"><input class=\"chatInput\" type=\"text\" name=\"chatText\" id=\"chatText\">&nbsp;<img title=\"Senden\" src=\"http://bensoft.de/stuff/bm/send.png\" id=\"sendChat\"></div>");
       		loadChat();
        	$bM("#bmChatBox").fadeIn();
        	$bM("#closeChatBox").click(function() {
                $bM("#bmChatBox").fadeOut();
                chatUser = "none";
            });
            $bM("#sendChat").click(function() {
                clickedSendChat();
            });
        	$bM("#chatText").on("keydown", function(e) {
                if(e.which == 13) clickedSendChat();
            });
        }
    });
}

function loadChat() {
    if(chatUser != "none") {
        GM_xmlhttpRequest({
            method: "POST",
            url: "http://bensoft.de/stuff/bm/loadchat.php",
            data: "from=" + name + "&with=" + chatUser,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control": "no-cache, must-revalidate",
                "Expires": "Sat, 26 Jul 1997 05:00:00 GMT"
            },
            onload: function(response) {
                $bM("#bmChatArea").html(response.responseText);
                $bM("#bmChatArea").scrollTop($bM("#bmChatArea")[0].scrollHeight);
            }
        });	  
	}
}

function clickedSendChat() {
	GM_xmlhttpRequest({
        method: "POST",
        url: "http://bensoft.de/stuff/bm/sendchat.php",
        data: "from=" + name + "&to=" + chatUser + "&message=" + $bM("#chatText").val(),
        headers: {
        	"Content-Type": "application/x-www-form-urlencoded",
        	"Cache-Control": "no-cache, must-revalidate",
        	"Expires": "Sat, 26 Jul 1997 05:00:00 GMT"
        },
        onload: function(response) {
        	$bM("#chatText").val("");
        	loadChat();
        }
    });
}

function showAddMenu() {
    openpop8("Kontakt hinzufügen", "Welchen Kontakt möchtest du hinzufügen? Dieser muss erst natürlich noch zustimmen.<br><b>Name:</b> <input type=\"text\" name=\"inputUsername\" id=\"inputUsername\">&nbsp;&nbsp;&nbsp;<input type=\"button\" id=\"addButton\" name=\"addButton\" value=\"Anfragen\">");
    $bM("#addButton").click(function() {
        var tUser = $bM("#inputUsername").val();
        openpop8("Bitte warten", "<center><img src=\"http://bensoft.de/stuff/bm/load.gif\"></center>");
        GM_xmlhttpRequest({
            method: "POST",
            url: "http://bensoft.de/stuff/bm/sendcontactrequest.php",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control": "no-cache, must-revalidate",
                "Expires": "Sat, 26 Jul 1997 05:00:00 GMT"
            },
            data: "from=" + name + "&to=" + tUser,
            onload: function(response) {
            	var ret = response.responseText;
            	if(ret == 2) openpop8("Fehler", "Du hast diesem User bereits eine Anfrage geschickt, oder er hat dir eine geschickt, die du noch nicht beantwortet hast.");
            	if(ret == 3) openpop8("Fehler", "Der Nutzer " + tUser + " ist bereits in deiner Kontaktliste.");
            	if(ret == 4) openpop8("Fehler", "Der Nutzer " + tUser + " existiert entweder nicht, oder verwendet den BreadfishRP Messenger nicht.");
            	if(ret == 1) openpop8("Gesendet", "Du hast dem Nutzer " + tUser + " eine Kontaktanfrage geschickt.");
        	}
        });
    });
}

function addStyles() {
    console.log("Rufe bmSlideOut.css auf...");
    GM_xmlhttpRequest({
        method: "GET",
        synchronous: false,
        headers: {
        	"Cache-Control": "no-cache, must-revalidate",
        	"Expires": "Sat, 26 Jul 1997 05:00:00 GMT"
  		},
        url: "http://bensoft.de/stuff/bm/bmSlideOut.css",
        onload: function(response) {
            var data = response.responseText;
            console.log("-> Erfolgreich.");
            var left = document.documentElement.clientWidth;
			var top = document.documentElement.clientHeight;
            top = top - 110;
            left = left - 10;
            data = data.replace(/%top%/g, top);
            data = data.replace(/%left%/g, left);
            GM_addStyle(data);
            subStyle1();
        },
        onerror: function() {
            console.log("-> Fehlgeschlagen");
            fehler = 1;
        }
    });
}

function subStyle1() {
   	console.log("Rufe bmSidePanel.css auf...");
    GM_xmlhttpRequest({
        method: "GET",
        headers: {
        	"Cache-Control": "no-cache, must-revalidate",
        	"Expires": "Sat, 26 Jul 1997 05:00:00 GMT"
  		},
        synchronous: false,
        url: "http://bensoft.de/stuff/bm/bmSidePanel.css",
        onload: function(response) {
            var data = response.responseText;
            console.log("-> Erfolgreich.");
            var left = document.documentElement.clientWidth;
			var height = document.documentElement.clientHeight;
            left = left - 170;
            data = data.replace(/%height%/g, height);
            data = data.replace(/%left%/g, left);
            GM_addStyle(data);
            subStyle2();
        },
        onerror: function() {
            console.log("-> Fehlgeschlagen");
            fehler = 1;
        }
    }); 
}

function subStyle2() {
    console.log("Rufe bmChatBox.css auf...");
    GM_xmlhttpRequest({
        method: "GET",
        synchronous: false,
        headers: {
        	"Cache-Control": "no-cache, must-revalidate",
        	"Expires": "Sat, 26 Jul 1997 05:00:00 GMT"
  		},
        url: "http://bensoft.de/stuff/bm/bmChatBox.css",
        onload: function(response) {
            var data = response.responseText;
            console.log("-> Erfolgreich.");
            var left = document.documentElement.clientWidth;
			var top = document.documentElement.clientHeight;
            left = left - 430;
            top = top - 310;
            data = data.replace(/%top%/g, top);
            data = data.replace(/%left%/g, left);
            GM_addStyle(data);
            subStyle3();
        },
        onerror: function() {
            console.log("-> Fehlgeschlagen");
            fehler = 1;
        }
    }); 
}

function subStyle3() {
    console.log("Rufe bmInfoBox.css auf...");
    GM_xmlhttpRequest({
        method: "GET",
        headers: {
        	"Cache-Control": "no-cache, must-revalidate",
        	"Expires": "Sat, 26 Jul 1997 05:00:00 GMT"
  		},
        synchronous: false,
        url: "http://bensoft.de/stuff/bm/bmInfoBox.css",
        onload: function(response) {
            var data = response.responseText;
            console.log("-> Erfolgreich.");
			var top = document.documentElement.clientHeight;
            top = top - 100;
            data = data.replace(/%top%/g, top);
            GM_addStyle(data);
        },
        onerror: function() {
            console.log("-> Fehlgeschlagen");
            fehler = 1;
        }
    }); 
}

function sendInstallation() {
    if(GM_getValue("postedInstall") == 1) return 1;
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://bensoft.de/stuff/bm/countUp.php",
        onload: function(response) {
            GM_setValue("postedInstall", 1);
        }
    });
}



function openpop8(titel,text,istext)
{
	$bM("#popupContact8 > h1").html(titel);
	if(!istext) $bM("#contactArea8").html(text);
	else $bM("#contactArea8").text(text);
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
color:#2450FF;  \
font-size:22px;  \
font-weight:700;  \
border-bottom:1px dotted #ACABB3;  \
padding-bottom:2px;  \
margin-bottom:20px;  \
}  \
#popupContactClose8{  \
font-size:14px;  \
line-height:14px;  \
right:6px;  \
top:4px;  \
position:absolute;  \
color:#2450FF;  \
font-weight:700;  \
display:block;  \
}  \
");

	$bM("#main").before(''+
	'<div id="popupContact8">  '+
    '    <a id="popupContactClose8">x</a> '+ 
    '    <h1></h1>  '+
    '    <p id="contactArea8">  '+
    '    </p>  '+
    '</div> '+
	'<div id="backgroundPopup8"></div>');
	
	$bM("#popupContactClose8").click(function() {  
		disablePopup8();  
	});  
	
	$bM("#backgroundPopup8").click(function() {  
		disablePopup8();  
	});  
	
	$bM(document).keypress(function(e) {  
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
		$bM("#backgroundPopup8").css({  
		"opacity": "0.7"  
		});  
		$bM("#backgroundPopup8").fadeIn("fast");  
		$bM("#popupContact8").fadeIn("fast");  
		popupStatus8 = 1;  
	}  
}  

function disablePopup8(){   
if(popupStatus8==1){  
$bM("#backgroundPopup8").fadeOut("fast");  
$bM("#popupContact8").fadeOut("fast");  
popupStatus8 = 0;  
}  
}  

function centerPopup8(){
var windowWidth = document.documentElement.clientWidth;
var windowHeight = document.documentElement.clientHeight;
var popupHeight = $bM("#popupContact8").height();
var popupWidth = $bM("#popupContact8").width();
//centering
$bM("#popupContact8").css({
"position": "fixed",
"top": windowHeight/2-popupHeight/2,
"left": windowWidth/2-popupWidth/2
});
}