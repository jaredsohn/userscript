// ==UserScript==
// @name       		OG Autologin
// @version    		0.2
// @description  	enter something useful
// @match      		http://si.ogame.gameforge.com/*
// @copyright  		NoBody
// ==/UserScript==

var username = "";
var password = "";
var localpath = window.location.pathname;

//EDIT PAGE
var registerform = document.getElementById("subscribeForm");
registerform.innerHTML = registerform.innerHTML.replace('IGRAJ BREZPLAČNO!',"AutoLogin");
document.getElementsByClassName("input-wrap first")[0].remove();
document.getElementsByClassName("input-wrap")[7].remove();
document.getElementsByClassName("input-wrap")[6].remove();
document.getElementsByClassName("input-wrap")[5].remove();
document.getElementById("submitWrap");

var labels = document.getElementsByTagName('label');
for (var i = 0; i < labels.length; i++) {
    if (labels[i].innerHTML.indexOf("Sprejmem") != -1) {
         labels[i].remove();
    }
}
var chkbtodel = document.getElementById("agb").remove();
var submitWrap = document.getElementById("submitWrap").remove()

var savebutt = document.createElement("button");
var savebuttxt = document.createTextNode("Shrani");
savebutt.appendChild(savebuttxt);
document.getElementById("subscribe").appendChild(savebutt);
savebutt.addEventListener("click", writeSaved, false);
//// EDIT PAGE



readSaved();


if (localpath == "/"){
	var logbutt = document.getElementById("loginSubmit");
	logbutt.click();
}




function readSaved(){
    var fromcookie = readCookie("ogAutoLogin");
    var splituser = fromcookie.split(",");
    username = decodeURIComponent(splituser[0]);
    password = decodeURIComponent(splituser[1]);
    
	var userlog = document.getElementById("usernameLogin");
	var passlog = document.getElementById("passwordLogin");
	var oguserbox = document.getElementById("username");
    var ogpassbox = document.getElementById("password");
    
	userlog.value = username;
	passlog.value = password;
    oguserbox.value = username;
	ogpassbox.value = password;
}

function writeSaved(){
    var alll = readCookie("ogAutoLogin");
    var oguserbox = document.getElementById("username");
    var ogpassbox = document.getElementById("password");
    var oguser = encodeURIComponent($.trim(oguserbox.value));
    var ogpass = encodeURIComponent($.trim(ogpassbox.value));
    var newcookie = oguser + "," + ogpass;
   
	createCookie("ogAutoLogin", newcookie, 20*365);
    window.location.href = "http://si.ogame.gameforge.com";
}


function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}