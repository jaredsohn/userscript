// ==UserScript==
// @name           MarkMyDomain
// @namespace      http://zahlenzerkleinerer.de/551/domain-in-der-suche-markieren.html
// @description    give color to your domain in the google search resulute, add a link with position count. If you want send the position to a server and record it there
// @include        *google*
// ==/UserScript==
GM_log('start mark Domain');
var Farbe = "#FF0000";
var SDomain = /zahlenzerkleinerer/g;
var Host = window.location.host;								
var SucheS = /.*(google).*/;
var Domain = SucheS.exec(Host);
var count = 0;
var cfgServer   = "localhost";
var cfgPort     = "80";
GM_setValue('QValue','Nur Zum Testen');
var ZumTesten = "";

function setQValue(value) {
	GM_log('setter QValue '+value);
	GM_setValue('QValue',value);
	upText = document.getElementById('sendResponse');
	upText.innerHTML = value;
	GM_log(giveGoogleQ().value);
}

function sendlink (linkget) {
	linkget += "&searchText="+giveGoogleQ().value;
	linkget += "&searchPos="+document.getElementById('posSearch').innerHTML;
	GM_log('link gesendet '+linkget);
	// build link to your server
	submit_url = 'http://' + cfgServer + ':' + cfgPort +
	'/checkgoogle.php' + linkget;
	// and send a request to p2p     
	GM_xmlhttpRequest({
         method: 'GET',
         url: submit_url,
         headers: {
             'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
             'Accept': 'application/atom+xml,application/xml,text/xml,*',
         }, 
         onload: function(responseDetails) {
				setQValue(responseDetails.responseText);
				}

     	});
 }

function NeuesElement(Tag, Inhalt)
{
  var Neu = document.createElement(Tag);
  if (Inhalt.indexOf("<") != -1 || Inhalt.indexOf("&") != -1) 
  	Neu.innerHTML = Inhalt;
  else if (Inhalt.length > 0)
  	 	Neu.appendChild(document.createTextNode(Inhalt));

  if (NeuesElement.arguments.length > 2) {
  	for (var i = 2; i < NeuesElement.arguments.length-1; i += 2) {
  		if (!NeuesElement.arguments[i+1].length) continue;
  		Neu.setAttribute(NeuesElement.arguments[i], NeuesElement.arguments[i+1]);
  	}
  }

  return Neu;
}


function giveGoogleQ() {
	var textElements = document.getElementsByTagName('input');
	for (var i=0;i<textElements.length;i++) {
 	// INPUT type TEXT
   	if (textElements[i].type == 'text') {
			if ("q" == textElements[i].name.toLowerCase()) {
				return textElements[i];		
			}
		}
	}
}

/* Logik zum aufspalten der Funktionen*/
var googleHead = document.getElementById("prs");
var Text = NeuesElement("p", "", "align", "center");
	
	//Nummer.style.fontSize = "42px;";					
	codeText = '<a href="#foundPos" id="posSearch" style="background:#00FF00;color:#000000;padding:5px;margin:3px;float:right;z-index:99;">--</a>';
	codeText += '<div id="sendResponse" style="background:#FFFF00;color:#000000;padding:5px;margin:3px;float:right;z-index:99;">Response From Server</div>';
	Text.innerHTML=codeText;
	
	var Send = NeuesElement("link", "");
	sendLinkText = '<div id="sendSearch" style="background:#FF0000;color:#000000;padding:5px;margin:3px;float:right;z-index:99;">Send Link</div>';
	
	Send.innerHTML=sendLinkText;	
	Send.addEventListener('click',function(){sendlink("?do=new")},true);	
	Text.appendChild(Send);	
	
	//Text.appendChild(linkOK);
	googleHead.appendChild(Text);


if(Domain != null) { 
	var divz = document.getElementsByTagName("li");
	
	for(a=0;a<divz.length;a++) {
			if(divz[a].className == "g" && divz[a].style.marginLeft == "") {			
				count++;
				if(divz[a].innerHTML.match(SDomain)) {
					divz[a].style.backgroundColor = "#FFff00";
					var Nummer = NeuesElement("div", "", "align", "right","bgcolor","#000033");
					code = '<a name="foundPos" style="font-Size:42px;float:right;"> '+count+"</a>";
					Nummer.innerHTML=code;
					document.getElementById("posSearch").innerHTML = count;				
					divz[a].appendChild(Nummer);
					break;
				}
			}
	}
}

GM_log('end mark Domain');