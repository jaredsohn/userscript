// ==UserScript==
// @name      SFR WiFi Auto Connect
// @version    0.1b
// @description  AutoConnect and redirecting to the webpage requested
// @include      http*://hotspot.wifi.sfr.fr/*
// @exclude		 http*://hotspot.wifi.sfr.fr/nb4_crypt.php
// @copyright  2013+, PanDoreS
// ==/UserScript==

var Username = ""
var Password = ""

function GetUrlValue(VarSearch){
    var SearchString = window.location.search.substring(1);
    var VariableArray = SearchString.split('&');
    for(var i = 0; i < VariableArray.length; i++){
        var KeyValuePair = VariableArray[i].split('=');
        if(KeyValuePair[0] == VarSearch){
            return KeyValuePair[1];
        }
    }
}

function lit_cook(nom) {
      var deb,fin
      deb = document.cookie.indexOf(nom + "=")
      if (deb >= 0) {
         deb += nom.length + 1
         fin = document.cookie.indexOf(";",deb)
         if (fin < 0) fin = document.cookie.length
         return unescape(document.cookie.substring(deb,fin))
         }
      return ""
   }
if(lit_cook("PostSended")=="true"){
	document.cookie="PostSended=false; expires=Thu, 2 Aug 2010 20:47:11 UTC;domain=sfr.fr;path=/";
    if(GetUrlValue("res")=="failed"){
        //Identification failed :/
    	document.getElementsByClassName("infosBloc")[0].innerHTML = '<!doctype html><html lang="en"><head><meta charset="UTF-8"><title>Error !</title><style>html body * {visibility:hidden;}html font{visibility:visible;}body {	text-align: center;	font-family: Arial;}#contour {	visibility:visible;border-radius:5px;	border:1px solid #EAA250;width: 650px;margin: 0 auto;margin-left:25%;height: auto;-moz-box-shadow: 3px 3px 4px #838383; /* Mozilla, WebKit (Chrome, Opéra), box IE */-webkit-box-shadow: 3px 3px 4px #838383;box-shadow: 3px 3px 4px #838383;padding-top: 15px;padding-bottom: 15px;padding-right: 10px;padding-left: 10px;} </style></head><body><div id="contour"><img style="visibility:visible;" src="https://hotspot.wifi.sfr.fr/i/sfrWifi.png"></br></br>Error !</br>You username or password are incorrect, please check your username/password in the script ...</br></br><font size=2 color=#6E6E6E>PanDoreS 2013</font></div></body></html>';
    }else{
        if(GetUrlValue("res")=="already"){
            //Already connected :)
            document.getElementsByClassName("infosBloc")[0].innerHTML = '<!doctype html><html lang="en"><head><meta charset="UTF-8"><title>Already connected !</title><style>html body * {visibility:hidden;}html font{visibility:visible;}body {	text-align: center;	font-family: Arial;}#contour {	visibility:visible;border-radius:5px;	border:1px solid #EAA250;width: 650px;margin: 0 auto;margin-left:25%;height: auto;-moz-box-shadow: 3px 3px 4px #838383; /* Mozilla, WebKit (Chrome, Opéra), box IE */-webkit-box-shadow: 3px 3px 4px #838383;box-shadow: 3px 3px 4px #838383;padding-top: 15px;padding-bottom: 15px;padding-right: 10px;padding-left: 10px;} </style></head><body><div id="contour"><img style="visibility:visible;" src="https://hotspot.wifi.sfr.fr/i/sfrWifi.png"></br></br>You\'re already connected ... !</br>Redirecting to Google...</br></br><font size=2 color=#6E6E6E>PanDoreS 2013</font></div></body></html>';
            document.location.href = 'http://www.google.com';
        }else{
            if(GetUrlValue("res")=="success"){
                //Yay connected :)
        		document.getElementsByClassName("infosBloc")[0].innerHTML = '<!doctype html><html lang="en"><head><meta charset="UTF-8"><title>Success !</title><style>html body * {visibility:hidden;}html font{visibility:visible;}body {	text-align: center;	font-family: Arial;}#contour {	visibility:visible;border-radius:5px;	border:1px solid #EAA250;width: 650px;margin: 0 auto;margin-left:25%;height: auto;-moz-box-shadow: 3px 3px 4px #838383; /* Mozilla, WebKit (Chrome, Opéra), box IE */-webkit-box-shadow: 3px 3px 4px #838383;box-shadow: 3px 3px 4px #838383;padding-top: 15px;padding-bottom: 15px;padding-right: 10px;padding-left: 10px;} </style></head><body><div id="contour"><img style="visibility:visible;" src="https://hotspot.wifi.sfr.fr/i/sfrWifi.png"></br></br>Success !</br>Redirecting ...</br></br>If you\'re not redirected, <a style="visibility:visible;" href="http://google.com">click here to redirect to Google</a></br></br><font size=2 color=#6E6E6E>PanDoreS 2013</font></div></body></html>';
    			var userurl = "http://www.google.com";
                if (urlParams['userurl']){
            		var myString = new String(unescape(urlParams['userurl']));
            		var myArray = myString.split(';');
            		userurl = myArray[0];
            		if (myArray[4]) userurl = myArray[4];
        		}
                document.location.href = userurl;
            }else{
                if(GetUrlValue("res")=="notyet"){
               		document.getElementsByClassName("infosBloc")[0].innerHTML = '<!doctype html><html lang="en"><head><meta charset="UTF-8"><title>Device non ready !</title><style>html body * {visibility:hidden;}html font{visibility:visible;}body {	text-align: center;	font-family: Arial;}#contour {	visibility:visible;border-radius:5px;	border:1px solid #EAA250;width: 650px;margin: 0 auto;margin-left:25%;height: auto;-moz-box-shadow: 3px 3px 4px #838383; /* Mozilla, WebKit (Chrome, Opéra), box IE */-webkit-box-shadow: 3px 3px 4px #838383;box-shadow: 3px 3px 4px #838383;padding-top: 15px;padding-bottom: 15px;padding-right: 10px;padding-left: 10px;} </style></head><body><div id="contour"><img style="visibility:visible;" src="https://hotspot.wifi.sfr.fr/i/sfrWifi.png"></br></br>The device is not ready...</br></br>Waiting 10 seconds for a retry (and redirect to Google if success)...</br></br><font size=2 color=#6E6E6E>PanDoreS 2013</font></div></body></html>';
            		setTimeout("document.location.href = 'http://www.google.com'", 10000);
                }else{
                	//Non reconized :(
            		document.getElementsByClassName("infosBloc")[0].innerHTML = '<!doctype html><html lang="en"><head><meta charset="UTF-8"><title>Wait ...</title><style>html body * {visibility:hidden;}html font{visibility:visible;}body {	text-align: center;	font-family: Arial;}#contour {	visibility:visible;border-radius:5px;	border:1px solid #EAA250;width: 650px;margin: 0 auto;margin-left:25%;height: auto;-moz-box-shadow: 3px 3px 4px #838383; /* Mozilla, WebKit (Chrome, Opéra), box IE */-webkit-box-shadow: 3px 3px 4px #838383;box-shadow: 3px 3px 4px #838383;padding-top: 15px;padding-bottom: 15px;padding-right: 10px;padding-left: 10px;} </style></head><body><div id="contour"><img style="visibility:visible;" src="https://hotspot.wifi.sfr.fr/i/sfrWifi.png"></br></br>The script cannot understand the response !</br></br><font size=2 color=#6E6E6E>PanDoreS 2013</font></div></body></html>';
                }
             }
        }
    }
}else{
    if(Username=='' || Password==''){
    	document.getElementsByClassName("infosBloc")[0].innerHTML = '<!doctype html><html lang="en"><head><meta charset="UTF-8"><title>Error !</title><style>html body * {visibility:hidden;}html font{visibility:visible;}body {	text-align: center;	font-family: Arial;}#contour {	visibility:visible;border-radius:5px;	border:1px solid #EAA250;width: 650px;margin: 0 auto;margin-left:25%;height: auto;-moz-box-shadow: 3px 3px 4px #838383; /* Mozilla, WebKit (Chrome, Opéra), box IE */-webkit-box-shadow: 3px 3px 4px #838383;box-shadow: 3px 3px 4px #838383;padding-top: 15px;padding-bottom: 15px;padding-right: 10px;padding-left: 10px;} </style></head><body><div id="contour"><img style="visibility:visible;" src="https://hotspot.wifi.sfr.fr/i/sfrWifi.png"></br></br>Error !</br>You username or password are empty, please type them in the script ...</br></br><font size=2 color=#6E6E6E>PanDoreS 2013</font></div></body></html>';
    }else{
	    document.getElementsByClassName("infosBloc")[0].innerHTML = '<!doctype html><html lang="en"><head><meta charset="UTF-8"><title>Connection in progress ...</title><style>html body * {visibility:hidden;}html font{visibility:visible;}body {	text-align: center;	font-family: Arial;}#contour {	visibility:visible;border-radius:5px;	border:1px solid #EAA250;width: 650px;margin: 0 auto;margin-left:25%;height: auto;-moz-box-shadow: 3px 3px 4px #838383; /* Mozilla, WebKit (Chrome, Opéra), box IE */-webkit-box-shadow: 3px 3px 4px #838383;box-shadow: 3px 3px 4px #838383;padding-top: 15px;padding-bottom: 15px;padding-right: 10px;padding-left: 10px;} </style></head><body><div id="contour"><img style="visibility:visible;" src="https://hotspot.wifi.sfr.fr/i/sfrWifi.png"></br></br>Connection in progress ...</br></br><font size=2 color=#6E6E6E>PanDoreS 2013</font></div></body></html>';
		document.forms['connect'].conditions.checked=true;
		document.forms['connect'].username.value=Username;
		document.forms['connect'].password.value=Password;
        validForm();
		document.cookie="PostSended=true; expires=Thu, 2 Aug 2020 20:47:11 UTC;domain=sfr.fr;path=/";
        document.forms['connect'].submit();
    }   
}