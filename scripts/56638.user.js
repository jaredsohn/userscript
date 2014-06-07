// ==UserScript==
// @name CC For Poland Chat Tab
// @namespace Coolperson1414
// @description Adds the For Poland Chat Tab to your sidebar on the Casual Collective!
// @include http://www.casualcollective.com/*
// ==/UserScript==


function CloseChat(event)
{
   event.preventDefault()

   if (document.getElementById('meebo2').height != "0")
   {
      document.getElementById('meebo2').height="0";
      document.getElementById('ChatButton').className = "usel usel-gray";
      document.getElementById('sb-tabs').style.display = "block";
      document.getElementById('sb-tabs').style.height = "100%";
      
   }
}


function OpenChat(event)
{
    if (document.getElementById('meebo2').height != "402")
   {
      document.getElementById('meebo2').height="402";
      document.getElementById('ChatButton').className = "usel usel-grayon";
      document.getElementById('sb-tabs').style.display = "none";
      document.getElementById('sb-tabs').style.height = "0px";
      
   }
}




var toggleDiv = document.createElement('div');

   toggleDiv.innerHTML = '<div style = "padding-bottom: 15px"><span class="usel usel-gray" id="ChatButton"><span>Chat</span></span></div>';

   

toggleDiv.id = 'toggleDiv';

CcPlusCheck = document.getElementById('CCplusMenu');


if (CcPlusCheck)
{
   var chatSpan = toggleDiv.firstChild.firstChild;
   var CCPMenu = document.getElementById('CCplusMenu');
   CCPMenu.appendChild(chatSpan);
}

else	
{
var elmExtra = document.getElementById('sb-twitter');
	elmExtra.parentNode.insertBefore(toggleDiv, elmExtra);
}

var chatDiv = document.createElement('div');

	chatDiv.innerHTML = '<div><div style="width:300px"><style>.mcrmeebo { display: block; background:url("http://widget.meebo.com/r.gif") no-repeat top right; } .mcrmeebo:hover { background:url("http://widget.meebo.com/ro.gif") no-repeat top right; } </style><object id="Meebo1" width="300" height="400"><param name="movie" value="http://widget.meebo.com/mcr.swf?id=ZVIxXlfSzE"></param><embed id="meebo2" src="http://widget.meebo.com/mcr.swf?id=ZVIxXlfSzE" type="application/x-shockwave-flash" width="300" height="0" /></object></div></div>';
	chatDiv.id = 'embedChat';
 


	
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

  var eg = document.getElementById('CCPlusOpen5');
      eg.addEventListener("click", CloseChat, false);

}


