// ==UserScript==
// @name          Bei-uns.de Chat
// @description   Fuegt einen ChatButton hinzu
// @include       *bei-uns.de*
// ==/UserScript==

//
// By Madboy 2008
//

function showhide_2(){
  ebenenX = document.getElementsByTagName('div')
  if(document.getElementById('chatanzeigen2342').style.visibility=='hidden'){
    document.getElementById('chatanzeigen2342').style.visibility='visible';
    document.getElementById('chatanzeigen2344').style.visibility='visible';
    document.getElementById('chatanzeigen2345').style.visibility='visible';
  }
  else{
    document.getElementById('chatanzeigen2342').style.visibility='hidden';
    document.getElementById('chatanzeigen2344').style.visibility='hidden';
    document.getElementById('chatanzeigen2345').style.visibility='hidden';
  }
}

function openPimpChat(){
  var nicknam3url = document.getElementById('fo').href;
  var nicknam3url2 = nicknam3url.length - 20;
  var nicknam3 = nicknam3url.slice(7, nicknam3url2);
  var neu_url_chat = 'http://ssn1.ss.funpic.de/chat/index.php?nick=' + nicknam3;
  window.open(neu_url_chat, 'chat', 'resizable=yes,width=680,height=440,left=50,top=50,toolbar=no,status=no,menubar=no,scrollbars=no');
}

function allgemBox(){
  GM_xmlhttpRequest({
    method: "GET",
		url: "http://irc.bei-uns.de:8033/bei-uns.de/onchan/",
		onload: function(xhr6) {
		  xhr6.responseText;		
			var chat2 = xhr6.responseText;
      var anline233 = '</th></tr>';
      var ppx1231 = chat2.indexOf(anline233, ppx1231);
      ppx1231 += anline233.length;
      var ppx2231 = chat2.indexOf('</table></center>', ppx1231);
      neuneu2 = chat2.substring(ppx1231, ppx2231);
      var elm = document.getElementById("sa");
      var elm_parent = elm.parentNode;
      //ErstelleBox Allgemein:
      var div231 = document.createElement("div");
      elm_parent.insertBefore(div231, elm);
      div231.innerHTML = '<div id="chatanzeigen2345" style="position: absolute; width: 150px; height: 20px; z-index: 156; left:630px; top:105px"><div align="left"><table border="0" width="150" cellpadding="0" align="left" style="border-collapse: collapse" bgcolor="#A6A6A6"><tr><td bgcolor="#A6A6A6" width="150"><font face="Verdana" size="1" color="#FFFFFF">' + neuneu2 + '</font></td></tr></table></div></div>';
    }
  });
}

function ChatBox(){
	if(fluck2==0){
		GM_xmlhttpRequest({
      method: "GET",
			url: "http://irc.bei-uns.de:8033/pimp-my-bu/onchan/",
			onload: function(xhr5) {
				xhr5.responseText;		
				var ch_t = xhr5.responseText;
        var anline23 = '</th></tr>';
        var ppx123 = ch_t.indexOf(anline23, ppx123);
        ppx123 += anline23.length;
        var ppx223 = ch_t.indexOf('</table></center>', ppx123);
        neuneu = ch_t.substring(ppx123, ppx223);
        var elm = document.getElementById("sa");
        var elm_parent = elm.parentNode;
        //MainBox:
        var div27a = document.createElement("div");
        elm_parent.insertBefore(div27a, elm);
        div27a.innerHTML = '<div id="chatanzeigen2344" style="position: absolute; width: 300px; height: 20px; z-index: 156; left:480px; top:65px"><div align="left"><table border="0" width="300" cellpadding="0" align="left" bgcolor="#A6A6A6" style="border-collapse: collapse"><tr><td bgcolor="#000000" width="4">&nbsp;</td><td width="150"><b><font face="Verdana" size="1" color="#FFFFFF">Pimp-my-BU-Chat</font></b></td><td width="150"><b><font face="Verdana" size="1" color="#FFFFFF">Offizielle BU-Chat</font></b></td></tr><tr><td bgcolor="#000000" width="4">&nbsp;</td><td width="150"><font face="Verdana" size="1"><a href="javascript:openPimpChat();">Webchat starten...</a></font></td><td width="150"><font face="Verdana" size="1"><a href="javascript:openChat();">Webchat starten...</a></font></td></tr><tr><td bgcolor="#000000" width="4">&nbsp;</td><td width="150"><i><font face="Verdana" size="1" color="#FFFFFF">Online User:</font></i></td><td width="150"><i><font face="Verdana" size="1" color="#FFFFFF">Online User:</font></i></td></tr></table></div></div>';
        div27a.addEventListener("click", openPimpChat, false);
        //ErstelleBox Pimp my BU:
        var div23 = document.createElement("div");
        elm_parent.insertBefore(div23, elm);
        div23.innerHTML = '<div id="chatanzeigen2342" style="position: absolute; width: 146px; height: 20px; z-index: 156; left:484px; top:105px"><div align="left"><table border="0" width="146" cellpadding="0" align="left" style="border-collapse: collapse" bgcolor="#A6A6A6"><tr><td bgcolor="#A6A6A6" width="146"><font face="Verdana" size="1" color="#FFFFFF">' + neuneu + '</font></td></tr></table></div></div>';
        //ErstelleBox Allgemein BU:
        allgemBox();
      }
    });
    fluck2 = 1;
  }
  else{
    showhide_2();
  }
}

var fluck2 = 0;
var elm = document.getElementById("sa");
var elm_parent = elm.parentNode;
var div = document.createElement("div");
elm_parent.insertBefore(div, elm);
div.innerHTML = '<div id="chatsymbol" style="position: absolute; width: 20px; height: 20px; z-index: 155; left:480px; top:40px"><a href="javascript:ChatBox();" target=""><img border="0" src="http://home.arcor.de/fh-ingolstadt/bei-uns/ch.png" alt="WebChat starten"></a>';
div.addEventListener("click", ChatBox, false);
