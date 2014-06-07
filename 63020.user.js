// ==UserScript==
// @name           Multispende HAMBURG Skript
// @namespace      multispende.net
// @description    Ermittelt ob der Penner schon die Spenden fuer heute voll hat, der Becher voll ist und ob die RefID unbekannt ist und deaktiviert ihn anschliessend in der multispende.
// @include        *pennergame.de/change_please/*
// @exclude				 http://anonym.to/*
// @exclude				 http://*berlin.pennergame.de/*
// ==/UserScript==

var quelltext = document.getElementById("content").innerHTML;
quelltext.search(/\/headline\/(\w.+)\/\"/);
nickname = unescape(RegExp.$1);
quelltext.search(/\/profil\/id\:(\d+)\/\"\>Profil/);
profilid = RegExp.$1;

if(quelltext.match(/hat heute schon genug Spenden erhalten/)){
  var settingpoint = "<div class=\"ref\"><div style=\"padding-top: 10px;text-align: center;\" class=\"settingpoint\"><img src=\"http://i33.tinypic.com/axk3mx.jpg\" /><br><h1>...sagt Danke!</h1><br>";
	settingpoint += nickname+" hat heute schon genug Spenden erhalten.<br />";
	settingpoint += "Das <a href=\"http://www.pennergame.de/profil/id:" + profilid + "/\">Profil</a> von " + nickname + "<br /><br />";
	document.URL.replace(/pennergame.de\/change_please\/(\d+)\//g, '$1');
	var refid = RegExp.$1;
	var refids = GetCookie('spenden');
  if((refids == null) || (refids == "")){
	  SetCookie('spenden',refid,null,'/','.pennergame.de');
		settingpoint += "Du hast schon 1 von 10 Penner deaktiviert.<br />Du musst noch 9 Penner deaktiveren damit du einen Punkt bekommst.";
  }else{
	  var part = refids.split("#");
		if (part.length < 9){
		  for (var i = 0; i<part.length; i++){
  	 		if(refid==part[i]){
  	 		  var exist = 'TRUE';
					break;
  		  }	
			}
			if ( exist != 'TRUE' ){
		    SetCookie('spenden',refids+"#"+refid,null,'/','.pennergame.de');
				settingpoint += "Du hast schon " + (part.length + 1) + " von 10 Penner deaktiviert.<br />Du musst noch " + (9 - part.length) + " Penner deaktiveren damit du einen Punkt bekommst.";
			}else{
				settingpoint += "Du hast diesen Penner schon deaktiviert.<br />";
				settingpoint += "Du musst noch " + (10 - part.length) + " Penner deaktiveren damit du einen Punkt bekommst.";
			}
		}
		if (part.length == 9){
		  for (var i = 0; i<part.length; i++){
  	 		if(refid==part[i]){
  	 		  var exist = 'TRUE';
					break;
  		  }	
			}
			if ( exist != 'TRUE' ){
				settingpoint += "Du hast jetzt 10 Penner gefunden die keine Spenden mehr bekommen kï¿½nnen.<br />Du bekommst jetzt in der multispende einen Punkt gutgeschrieben.";
				sendRequest(refids+"#"+refid,1);
			  SetCookie('spenden','',null,'/','.pennergame.de');

			}else{
				settingpoint += "Du hast diesen Penner schon deaktiviert.";
			}
		}
	}
	document.getElementById('content').innerHTML = settingpoint;
	document.getElementById('content').innerHTML += "</div></div>";
}
if(quelltext.match(/ist bereits bis zum Rand/)){
	document.getElementById('content').innerHTML = "bitte warten....";
	document.URL.replace(/pennergame.de\/change_please\/(\d+)\//g, '$1');
	var refid = RegExp.$1;
	sendRequest(refid,2,nickname,profilid);
}
if((quelltext.match(/Refid ist nicht bekannt/)) || (quelltext.match(/Error Unknown User/))  || (quelltext.match(/Error Unkown User/))){
  document.getElementById('content').innerHTML = "bitte warten....";
	document.URL.replace(/pennergame.de\/change_please\/(\d+)\//g, '$1');
	var refid = RegExp.$1;
	sendRequest(refid,3);
}


function sendRequest(refid,action,nickname,profilid) {
  GM_xmlhttpRequest({
      method: 'POST',
      url: 'http://www.multispende.net/check_neu.php',
      headers: {'Content-type': 'application/x-www-form-urlencoded'},
  		data: encodeURI('refid='+refid+'&action='+action+'&nick='+nickname+'&profilid='+profilid),
      onload: function(responseDetails) {
  				var content = responseDetails.responseText;
  			  document.getElementById('content').innerHTML = content;
      }
  });
};

function GetCookie (name) { 
  var arg = name + "="; 
  var alen = arg.length; 
  var clen = document.cookie.length; 
  var i = 0; 
  while (i < clen) { 
    var j = i + alen; 
    if (document.cookie.substring(i, j) == arg) 
    return getCookieVal (j); 
    i = document.cookie.indexOf(" ", i) + 1; 
    if (i == 0) break; 
  } 
  return null;
}
function SetCookie (name, value) { 
  var argv = SetCookie.arguments; 
  var argc = SetCookie.arguments.length; 
  var expires = (argc > 2) ? argv[2] : null; 
  var path = (argc > 3) ? argv[3] : null; 
  var domain = (argc > 4) ? argv[4] : null; 
  var secure = (argc > 5) ? argv[5] : false; 
  document.cookie = name + "=" + escape (value) + 
  ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + 
  ((path == null) ? "" : ("; path=" + path)) + 
  ((domain == null) ? "" : ("; domain=" + domain)) + 
  ((secure == true) ? "; secure" : "");
}

function getCookieVal (offset) { 
var endstr = document.cookie.indexOf (";", offset); 
if (endstr == -1) 
endstr = document.cookie.length; 
return unescape(document.cookie.substring(offset, endstr));
}

function DeleteCookie (name) { 
var exp = new Date(); 
exp.setTime (exp.getTime() - 1000000); 
var cval = GetCookie (name); 
document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}