// ==UserScript==
// @name        Trabalhar de hora a hora
// @namespace   Trabalhar de hora a hora
// @include     http://www.osreinos.com
// @include     http://www.osreinos.com/*
// @version     v1
// ==/UserScript==

function setCookie(c_name,value,exdays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}


function Navigation(){
    if (document.querySelector("div.zonePubDroiteContenant")) {
         Menu = document.querySelector("div.zonePubDroiteContenant");
    }
    else {
        Menu = document.querySelector("div.zonePubDroite");
        console.log('ok');
    }
    Menu.innerHTML = '<form id="frm2" action="Action.php?action=338&amp;n=1162&amp;t=mine" method="POST"><input type="hidden" name="duree" value="1" id="Mine1162"><button name="travail" type="submit" class="boutonsGeneral" value="submit"></button></form>';
}


function Login_function(flogin,fpass){
    Login_div = document.querySelector("div.blocContent");

    Login_div.innerHTML = '<form id="frm1" method="post" action="ConnexionKC.php"><input size="17" class="fv_login" id="login" name="login" value="' + flogin + '"maxlength="30" type="text"><input size="17" class="fv_rempli fv_egalite_reference" value="' + fpass + '" id="pass" name="password" maxlength="30" type="password"><input value="ok" type="submit"></form>'            
    document.forms["frm1"].submit();
}

function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {	 
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1){    	 
        c_value = null;
    }
    else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = 
    	unescape(c_value.substring(c_start,c_end));
    }
    return c_value;
}
    
function checkCookie(cookie) {
    var username=getCookie(cookie);
    if (username!=null && username!=""){
        return username;
    }
    else {
        username=prompt("Please enter your" + cookie +'"',"");
        if (username!=null && username!="") {
            setCookie(cookie,username,365);
        }
    }
}
var login=checkCookie("username");
var pass=checkCookie("password");

if(window.location.href == "http://www.osreinos.com/" ){
    Login_function(login,pass);
    window.location.href = "http://www.osreinos.com/EcranPrincipal.php?l=8&a=4";
}
else if(window.location.href == "http://www.osreinos.com/EcranPrincipal.php?l=8&a=4"){
    Navigation();
    document.getElementById("frm2").submit();
    window.location.href = "http://www.osreinos.com/EcranPrincipal.php";
}
else {    
    Navigation();
    setInterval(" window.location.href = 'http://www.osreinos.com/';",36000000 );
}