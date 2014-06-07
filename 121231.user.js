// ==UserScript==
// @name          	DAP Script Facebook (Dibuat Oleh Dipo Alam P)
// @namespace      	DAP Project
// @description     Autolike statusdan komentar. Auto terima dan tolak teman. Pergantian emotion ke kaskus. Chat bar emotion. Chat online rapih. No Iklan.
// @include			http://facebook.com/*
// @include			http://*.facebook.com/*
// @include			https://facebook.com/*
// @include			https://*.facebook.com/*
// @require   	 	http://dapserver.net/dapscript/dapchat.user.js
// @require   	 	http://dapserver.net/dapscript/dapemo.user.js
// @exclude			http://*.channel.facebook.com/*
// @exclude			https://*.channel.facebook.com/*
// @author			Dipo Alam P
// @version			4.0
// ==/UserScript==

var viewLogButton = document.createElement("div");viewLogButton.innerHTML="<a href=\"#\" onclick=\"window.open('http://www.kaskus.us/misc.php?do=getsmilies','popup','width=500,height=500,scrollbars=yes,resizable=no,toolbar=no,directories=no,location=no,menubar=no,status=no,left=100,top=60'); return false\"><img src=\"\" border=\"0\"/></a>";viewLogButton.setAttribute("style", "position: fixed; left: 0px; bottom: -2px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");document.body.appendChild(viewLogButton);window=unsafeWindow;document=window.document;
replaceElement(document, yemo);
function listen(evt){
var node = evt.target;if (node.nodeType == document.ELEMENT_NODE) replaceElement(node, yemo); if (node.nodeType == document.TEXT_NODE) {var parent = node.parentNode;var span = replaceTextNode(node, yemo);if (span) parent.replaceChild(span, node);}}document.body.addEventListener('DOMNodeInserted', listen, true);


/////////////////////////////////////

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+193px";
	div.style.left = "+2px";
	div.style.backgroundColor = "";
	div.style.border = "0px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a href=\"#\" onclick=\"window.open('http://dapmedia.in/dapscript/','popup','width=500,height=500,scrollbars=yes,resizable=no,toolbar=no,directories=no,location=no,menubar=no,status=no,left=100,top=60'); return false\"><img src=\"\" border=\"0\"/></a>"
// DONOT EDITED by Dipo Alam P :D
	body.appendChild(div);
// DONOT EDITED by Dipo Alam P :D
}

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+160px";
	div.style.left = "+2px";
	div.style.backgroundColor = "";
	div.style.border = "0px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a href=\"#\" onclick=\"window.open('http://dapserver.net/dapscript/emotionlist.php','popup','width=500,height=500,scrollbars=yes,resizable=no,toolbar=no,directories=no,location=no,menubar=no,status=no,left=100,top=60'); return false\"><img src=\"http://dapserver.net/dapscript/emotionlist.jpg\" border=\"0\"/></a>"
// DONOT EDITED by Dipo Alam P :D
	body.appendChild(div);
// DONOT EDITED by Dipo Alam P :D
}

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+133px";
	div.style.left = "+2px";
	div.style.backgroundColor = "";
	div.style.border = "0px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#000000\" TARGET='_blank' href='http://www.facebook.com/ddipo'><img src='http://dapserver.net/dapscript/dipo.jpg' height='22' width='200'></img></a>"
// DONOT EDITED by Dipo Alam P :D
	body.appendChild(div);
// DONOT EDITED by Dipo Alam P :D
}

// DONOT EDITED by Dipo Alam P :D
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+107px";
	div.style.left = "+2px";
	div.style.backgroundColor = "";
	div.style.border = "0px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoExpand()\"><img src='http://dapserver.net/dapscript/komentar.jpg' height='22' width='200'</img></a>"
	body.appendChild(div);
// DONOT EDITED by Dipo Alam P :D
	unsafeWindow.AutoExpand = function() {
// DONOT EDITED by Dipo Alam P :D
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("name") == "view_all[1]")
					buttons[i].click();
		}
		
	};
}
// DONOT EDITED by Dipo Alam P :D
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+84px";
	div.style.left = "+2px";
	div.style.backgroundColor = "";
	div.style.border = "0px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#FFFFFF\" href=\"JavaScript:AutoLike()\"><img src='http://dapserver.net/dapscript/lstatus.jpg' height='22' width='200'</img></a>"
	
// DONOT EDITED by Dipo Alam P :D	
	body.appendChild(div);
// DONOT EDITED by Dipo Alam P :D	
	unsafeWindow.AutoLike = function() {
// DONOT EDITED by Dipo Alam P :D	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "like")
					buttons[i].click();
		}
		
	};
}
// DONOT EDITED by Dipo Alam P :D
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+61px";
	div.style.left = "+2px";
	div.style.backgroundColor = "";
	div.style.border = "0px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#FFFFFF\" href=\"JavaScript:AutoUnLike()\"><img src='http://dapserver.net/dapscript/ulstatus.jpg' height='22' width='200'</img></a>"
	
	body.appendChild(div);
// DONOT EDITED by Dipo Alam P :D
	unsafeWindow.AutoUnLike = function() {
// DONOT EDITED by Dipo Alam P :D	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "unlike")
					buttons[i].click();
		}
// DONOT EDITED by Dipo Alam P :D		
	};
}
// DONOT EDITED by Dipo Alam P :D
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+35px";
	div.style.left = "+2px";
	div.style.backgroundColor = "";
        div.style.border = "0px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoLikeComments()\"><img src='http://dapserver.net/dapscript/lkomentar.jpg' height='22' width='200'</img></a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLikeComments = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("title") == "Like this comment")
					buttons[i].click();			
															
		}
		
	};
}
// DONOT EDITED by Dipo Alam P :D
// DONOT EDITED by Dipo Alam P :D
// DONOT EDITED by Dipo Alam P :D
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+12px";
	div.style.left = "+2px";
	div.style.backgroundColor = "";
	div.style.border = "0px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoUnLikeComments()\"><img src='http://dapserver.net/dapscript/ulkomentar.jpg' height='22' width='200'</img></a>"
	
	body.appendChild(div);
// DONOT EDITED by Dipo Alam P :D	
	unsafeWindow.AutoUnLikeComments = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("title") == "Unlike this comment")
					buttons[i].click();
		}
		
	};
}

//////////////////////////////////////////

// DONOT EDITED by Dipo Alam P :D
(function() {
  function appendStyle(h) {
    var head = h || document.getElementsByTagName('head')[0], 
        style = document.createElement('style');
    if (!head || self.location != top.location) {return}
    style.type = 'text/css';
    style.textContent = '#right_column { width: 77% !important; }' +
                    ' .ad_capsule, #sidebar_ads, .adcolumn, .emu_sponsor' +
                    ', div[id^="emu_"], .social_ad, .sponsor, .footer_ad,' +
                    ' #home_sponsor, .house_sponsor, #home_sponsor_nile, ' +
                    '.PYMK_Reqs_Sidebar, .ego_header, .ego_unit, ' +
                    '.UIStandardFrame_SidebarAds { display:' +
                    ' none !important; } #wallpage { width: 700px !important; }' +
                    '.LSplitView_ContentWithNoLeftColumn, ' +
                    '.FN_feedbackview { width: 100% !important; }';
    head.appendChild(style);
  }
// DONOT EDITED by Dipo Alam P :D
  function nodeInserted(e) {
    if (e.relatedNode.tagName == "HEAD") {
      document.removeEventListener('DOMNodeInserted', nodeInserted, true);
      appendStyle(e.relatedNode);
    }
  }

  // Url matching for Opera
  if (window.opera && 
      !/http:\/\/.*\.facebook\.com\/.*/.test(window.location.href))
    return;

  // Early injection support
  if (document.body === null)
    document.addEventListener('DOMNodeInserted', nodeInserted, true);
  else
    appendStyle();
})();

// DONOT EDITED by Dipo Alam P :D
// DONOT EDITED by Dipo Alam P :D
// DONOT EDITED by Dipo Alam P :D

function doAllTheHardWork()
{
  // Remove "regular" ticker
  var tickerDiv = null;
  if (tickerDiv = document.getElementById('pagelet_ego_pane_m'))
  {
    var reg = new RegExp('(\\s|^)tickerOnTop(\\s|$)');
    tickerDiv.parentNode.parentNode.className = tickerDiv.parentNode.parentNode.className.replace(reg, ' ');
    tickerDiv.parentNode.removeChild(tickerDiv);
  }

  // Remove ticker above chat sidebar
  var sidebarTickerDiv = null;
  if (sidebarTickerDiv = document.getElementById('pagelet_chbox'))
  {
    sidebarTickerDiv.parentNode.removeChild(sidebarTickerDiv);
      }

  if (document.addEventListener)
  {
    document.addEventListener("DOMNodeInserted", doAllTheHardWork, false);
  }
}
// DONOT EDITED by Dipo Alam P :D
// DONOT EDITED by Dipo Alam P :D
// DONOT EDITED by Dipo Alam P :D
// DONOT EDITED by Dipo Alam P :D
window.onload = doAllTheHardWork();

///////////////////////////////////////////

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like8');
	div.style.position = "fixed";
	div.style.display = "block"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+0px";
	div.style.left = "+2px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
// DONOT EDITED by Dipo Alam P :D
// DONOT EDITED by Dipo Alam P :D
	div.innerHTML = "&#8226;&nbsp;<a onclick='OtomatisKonfirm();' >Terima Semua Teman</a>&nbsp; &#8226;&nbsp; <a onclick='OtomatisAbaikan();' >Tolak Semua Teman</a>"
// DONOT EDITED by Dipo Alam P :D	
	body.appendChild(div);
	//buat fungsi tunda
	function tunda(milliSeconds){
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
}
	
	unsafeWindow.OtomatisKonfirm = function() {
		var x=document.getElementsByName("actions[accept]"); for (i=0;i<x.length;i++) { x[i].click();}
		};
	
	
	unsafeWindow.OtomatisAbaikan = function() {
			var x=document.getElementsByName("actions[hide]"); for (i=0;i<x.length;i++) { x[i].click();}
			};
}

// DON'T EDIT THIS SCRIPT
// UNTUK MENGGANTI MENJADI NAMA ANDA CUKUP 3$ HUBUNGI http://facebook.com/ddipo