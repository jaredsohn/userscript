// ==UserScript==
// @name CC Chat Tab Testing
// @namespace Coolperson1414
// @description Adds a Chat Tab to your sidebar on the Casual Collective!
// @include http://www.casualcollective.com/*
// ==/UserScript==

function ResetChat(event)
{
event.preventDefault()

document.getElementById('embedChat').innerHTML = '<div class="groupblock"><h1 id="chooseChatHeader" style="border-bottom: medium none; margin-left: -10px; display :none;" class="active"><span style="float: left; height: 30px;">Choose a Chat</span></h1><div class="ccplus-sb-a-line" style="margin-right: 10px;"><div class="sb-a-title">Social Chats</div><div class="but but-gray"><a id="CCRadiobutton"><span>CC Radio</span></a><a id="GDbutton"><span>General Discussion</span></a><br><br><a id="HASbutton"><span>Help & Support</span></a><a id="CCPbutton"><span>CC +</span>/a></div></div><div class="ccplus-sb-a-line" style="margin-right: 10px;"><div class="sb-a-title">Game Chats</div><div class="but but-gray"><a id="DTLbutton"><span>DTL</span></a><a id="BCCupbutton"><span>BC Cup</span>/a></div></div></div>';

document.getElementById('embedChat').style.marginTop = "-10px";
document.getElementById('chooseChatHeader').style.display = "block";


var launchDTLbutton = document.getElementById('DTLbutton');
launchDTLbutton.addEventListener("click", LaunchDTLChat, false);


var launchCCRadiobutton = document.getElementById('CCRadiobutton');
launchCCRadiobutton.addEventListener("click", LaunchCCR, false);

var launchGDbutton = document.getElementById('GDbutton');
launchGDbutton.addEventListener("click", LaunchGD, false);

var launchHASbutton = document.getElementById('HASbutton');
launchHASbutton.addEventListener("click", LaunchHAS, false);

var launchBCCbutton = document.getElementById('BCCupbutton');
launchBCCbutton.addEventListener("click", LaunchBCC, false);

var launchCCPbutton = document.getElementById('CCPbutton');
launchCCPbutton.addEventListener("click", LaunchCCP, false);
}

function LaunchDTLChat(event)
{
   event.preventDefault()

  document.getElementById('embedChat').innerHTML = '<div><div style="width:300px"><style>.mcrmeebo { display: block; background:url("http://widget.meebo.com/r.gif") no-repeat top right; } .mcrmeebo:hover { background:url("http://widget.meebo.com/ro.gif") no-repeat top right; } </style><object id="Meebo1" width="300" height="400"><param name="movie" value="http://widget.meebo.com/mcr.swf?id=RnKmDSQDxC"></param><embed id="meebo2" src="http://widget.meebo.com/mcr.swf?id=RnKmDSQDxC" type="application/x-shockwave-flash" width="300" height="375" /></object></div></div><div id="resetChat" class="but but-gray"><a><span>Chat Menu</span></a></div>';

document.getElementById('embedChat').style.height = "400px";
document.getElementById('embedChat').style.paddingBottom = "22px";
document.getElementById('embedChat').style.marginTop = "0px";

var ResetButton = document.getElementById('resetChat');
ResetButton.addEventListener("click", ResetChat, false);

}

function LaunchCCP(event)
{
   event.preventDefault()

  document.getElementById('embedChat').innerHTML = '<div><div style="width:300px"><style>.mcrmeebo { display: block; background:url("http://widget.meebo.com/r.gif") no-repeat top right; } .mcrmeebo:hover { background:url("http://widget.meebo.com/ro.gif") no-repeat top right; } </style><object id="Meebo1" width="300" height="400"><param name="movie" value="http://widget.meebo.com/mcr.swf?id=WyuhwpblyC"></param><embed id="meebo2" src="http://widget.meebo.com/mcr.swf?id=WyuhwpblyC" type="application/x-shockwave-flash" width="300" height="375" /></object></div></div><div id="resetChat" class="but but-gray"><a><span>Chat Menu</span></a></div>';

document.getElementById('embedChat').style.height = "400px";
document.getElementById('embedChat').style.paddingBottom = "22px";
document.getElementById('embedChat').style.marginTop = "0px";

var ResetButton = document.getElementById('resetChat');
ResetButton.addEventListener("click", ResetChat, false);

}

function LaunchBCC(event)
{
   event.preventDefault()

  document.getElementById('embedChat').innerHTML = '<div><div style="width:300px"><style>.mcrmeebo { display: block; background:url("http://widget.meebo.com/r.gif") no-repeat top right; } .mcrmeebo:hover { background:url("http://widget.meebo.com/ro.gif") no-repeat top right; } </style><object id="Meebo1" width="300" height="400"><param name="movie" value="http://widget.meebo.com/mcr.swf?id=UFMQoejWpI"></param><embed id="meebo2" src="http://widget.meebo.com/mcr.swf?id=UFMQoejWpI" type="application/x-shockwave-flash" width="300" height="375" /></object></div></div><div id="resetChat" class="but but-gray"><a><span>Chat Menu</span></a></div>';

document.getElementById('embedChat').style.height = "400px";
document.getElementById('embedChat').style.paddingBottom = "22px";
document.getElementById('embedChat').style.marginTop = "0px";

var ResetButton = document.getElementById('resetChat');
ResetButton.addEventListener("click", ResetChat, false);

}

function LaunchHAS(event)
{
   event.preventDefault()

  document.getElementById('embedChat').innerHTML = '<div><div style="width:300px"><style>.mcrmeebo { display: block; background:url("http://widget.meebo.com/r.gif") no-repeat top right; } .mcrmeebo:hover { background:url("http://widget.meebo.com/ro.gif") no-repeat top right; } </style><object id="Meebo1" width="300" height="400"><param name="movie" value="http://widget.meebo.com/mcr.swf?id=pGpYMxLjwr"></param><embed id="meebo2" src="http://widget.meebo.com/mcr.swf?id=pGpYMxLjwr" type="application/x-shockwave-flash" width="300" height="375" /></object></div></div><div id="resetChat" class="but but-gray"><a><span>Chat Menu</span></a></div>';

document.getElementById('embedChat').style.height = "400px";
document.getElementById('embedChat').style.paddingBottom = "22px";
document.getElementById('embedChat').style.marginTop = "0px";

var ResetButton = document.getElementById('resetChat');
ResetButton.addEventListener("click", ResetChat, false);

}

function LaunchGD(event)
{
   event.preventDefault()

  document.getElementById('embedChat').innerHTML = '<div><div style="width:300px"><style>.mcrmeebo { display: block; background:url("http://widget.meebo.com/r.gif") no-repeat top right; } .mcrmeebo:hover { background:url("http://widget.meebo.com/ro.gif") no-repeat top right; } </style><object id="Meebo1" width="300" height="400"><param name="movie" value="http://widget.meebo.com/mcr.swf?id=LlaCdgxTWw"></param><embed id="meebo2" src="http://widget.meebo.com/mcr.swf?id=LlaCdgxTWw" type="application/x-shockwave-flash" width="300" height="375" /></object></div></div><div id="resetChat" class="but but-gray"><a><span>Chat Menu</span></a></div>';

document.getElementById('embedChat').style.height = "400px";
document.getElementById('embedChat').style.paddingBottom = "22px";
document.getElementById('embedChat').style.marginTop = "0px";

var ResetButton = document.getElementById('resetChat');
ResetButton.addEventListener("click", ResetChat, false);

}

function LaunchCCR(event)
{
   event.preventDefault()

  document.getElementById('embedChat').innerHTML = '<div><div style="width:300px"><style>.mcrmeebo { display: block; background:url("http://widget.meebo.com/r.gif") no-repeat top right; } .mcrmeebo:hover { background:url("http://widget.meebo.com/ro.gif") no-repeat top right; } </style><object id="Meebo1" width="300" height="400"><param name="movie" value="http://widget.meebo.com/mcr.swf?id=IrzGrKnMZR"></param><embed id="meebo2" src="http://widget.meebo.com/mcr.swf?id=IrzGrKnMZR" type="application/x-shockwave-flash" width="300" height="375" /></object></div></div><div id="resetChat" class="but but-gray"><a><span>Chat Menu</span></a></div>';

document.getElementById('embedChat').style.height = "400px";
document.getElementById('embedChat').style.paddingBottom = "22px";
document.getElementById('embedChat').style.marginTop = "0px";

var ResetButton = document.getElementById('resetChat');
ResetButton.addEventListener("click", ResetChat, false);


}

function CloseChat(event)
{
   event.preventDefault()
      document.getElementById('embedChat').style.visibility = "hidden";
      document.getElementById('embedChat').style.height="0px";
      document.getElementById('ChatButton').className = "usel usel-gray";
      document.getElementById('sb-tabs').style.display = "block";
      document.getElementById('sb-tabs').style.height = "400px";
      document.getElementById('chooseChatHeader').style.display = "none";
      
   
}


function OpenChat(event)
{
    
      document.getElementById('embedChat').style.visibility = "visible";
      document.getElementById('embedChat').style.height="400px";
      document.getElementById('ChatButton').className = "usel usel-grayon";
      document.getElementById('sb-tabs').style.display = "none";
      document.getElementById('sb-tabs').style.height = "0px";
      document.getElementById('chooseChatHeader').style.display = "block";
   
}



var toggleDiv = document.createElement('div');

   toggleDiv.innerHTML = '<div><span class="usel usel-gray" id="ChatButton"><span>Chat</span></span></div>';


toggleDiv.id = 'toggleDiv';

CcPlusCheck = document.getElementById('CCplusMenu');


if (CcPlusCheck)
{
   
   CcPlusCheck.appendChild(toggleDiv);
}

else	
{
var elmExtra = document.getElementById('sb-twitter');
	elmExtra.parentNode.insertBefore(toggleDiv, elmExtra);
}

var chatDiv = document.createElement('div');

	chatDiv.innerHTML = '<div class="groupblock"><h1 id="chooseChatHeader" style="border-bottom: medium none; margin-left: -10px; display :none;" class="active"><span style="float: left; height: 30px;">Choose a Chat</span></h1><div class="ccplus-sb-a-line" style="margin-right: 10px;"><div class="sb-a-title">Social Chats</div><div class="but but-gray"><a id="CCRadiobutton"><span>CC Radio</span></a><a id="GDbutton"><span>General Discussion</span></a><br><br><a id="HASbutton"><span>Help & Support</span></a><a id="CCPbutton"><span>CC +</span>/a></div></div><div class="ccplus-sb-a-line" style="margin-right: 10px;"><div class="sb-a-title">Game Chats</div><div class="but but-gray"><a id="DTLbutton"><span>DTL</span></a><a id="BCCupbutton"><span>BC Cup</span>/a></div></div></div>';
	chatDiv.id = 'embedChat';
        chatDiv.style.visibility = "hidden";
        chatDiv.style.height = "0px";
        chatDiv.style.paddingBottom = "22px";
        chatDiv.style.marginTop = "-10px";
        chatDiv.style.borderStyle = "solid";
        chatDiv.style.borderColor = "#A4C0DB";
        chatDiv.style.borderBottomWidth = "thin";
        chatDiv.style.borderLeftWidth = "thin";
        chatDiv.style.borderRightWidth = "thin";
 


	
	var elmExtra2 = document.getElementById('sb-tabs');
	elmExtra2.parentNode.insertBefore(chatDiv, elmExtra2);




var el = document.getElementById('ChatButton');
el.addEventListener("click", OpenChat, false);


var eb = document.getElementById('sb-selectors');
eb.addEventListener("click", CloseChat, false);


CcButtonCheck = document.getElementById('CCplusMenu');

if (CcButtonCheck)
{
   var en = document.getElementById('CCPlusOpenMain');
   en.addEventListener("click", CloseChat, false);


}

var launchDTLbutton = document.getElementById('DTLbutton');
launchDTLbutton.addEventListener("click", LaunchDTLChat, false);


var launchCCRadiobutton = document.getElementById('CCRadiobutton');
launchCCRadiobutton.addEventListener("click", LaunchCCR, false);

var launchGDbutton = document.getElementById('GDbutton');
launchGDbutton.addEventListener("click", LaunchGD, false);

var launchHASbutton = document.getElementById('HASbutton');
launchHASbutton.addEventListener("click", LaunchHAS, false);

var launchCCPbutton = document.getElementById('CCPbutton');
launchCCPbutton.addEventListener("click", LaunchCCP, false);

var launchBCCbutton = document.getElementById('BCCupbutton');
launchBCCbutton.addEventListener("click", LaunchBCC, false);