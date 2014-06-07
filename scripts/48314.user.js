// ==UserScript==
// @name           Friends' menu
// @description    Change the online and idle information about the friends with a small image
// @include        http://www*.cs-manager.com/csm/*
// ==/UserScript==

// simple function for adding css to the window
function addCSS(A){var _,$;_=document.getElementsByTagName("head")[0];if(!_)return;$=document.createElement("style");$.type="text/css";$.innerHTML=A;_.appendChild($)}

if(typeof Event=="undefined")Event=new Object();Event.domReady={add:function(C){if(Event.domReady.loaded)return C();var A=Event.domReady.observers;if(!A)A=Event.domReady.observers=[];A[A.length]=C;if(Event.domReady.callback)return;Event.domReady.callback=function(){if(Event.domReady.loaded)return;Event.domReady.loaded=true;if(Event.domReady.timer){clearInterval(Event.domReady.timer);Event.domReady.timer=null}var _=Event.domReady.observers;for(var B=0,$=_.length;B<$;B++){var A=_[B];_[B]=null;A()}Event.domReady.callback=Event.domReady.observers=null};var _=!!(window.attachEvent&&!window.opera),$=navigator.userAgent.indexOf("AppleWebKit/")>-1;if(document.readyState&&$)Event.domReady.timer=setInterval(function(){var $=document.readyState;if($=="loaded"||$=="complete")Event.domReady.callback()},50);else if(document.readyState&&_){var B=(window.location.protocol=="https:")?"://0":"javascript:void(0)";document.write("<script type=\"text/javascript\" defer=\"defer\" src=\""+B+"\" "+"onreadystatechange=\"if (this.readyState == 'complete') Event.domReady.callback();\""+"></script>")}else if(window.addEventListener){document.addEventListener("DOMContentLoaded",Event.domReady.callback,false);window.addEventListener("load",Event.domReady.callback,false)}else if(window.attachEvent)window.attachEvent("onload",Event.domReady.callback);else{var C=window.onload;window.onload=function(){Event.domReady.callback();if(C)C()}}}}


function circle(iAction)
{
	return (Math.floor(((unsafeWindow.oNow.getTime()/1000)-iAction)/60)>5)?'idle':'online';
}

document.getElementById("friend").id="friendlist"; // we need to trick out csm



addCSS([
	'#s_idle{height:5px;width:5px;background-color: transparent !important;background-image:url(\"http://img18.imageshack.us/img18/7350/offncw.png\") !important;background-repeat: no-repeat !important;color: transparent !important;}',
	'#s_online{height:5px;width:5px;background-color: transparent !important;background-image:url(\"http://img21.imageshack.us/img21/4685/39711051.png\") !important;background-repeat: no-repeat !important;color: transparent !important;}'
].join(''));

var oFriend = [];
function initFriend()
{
	var oList = document.getElementById('friendlist');
	if (oList != null)
	{
		var oItems = oList.getElementsByTagName('li');
		for (var i = 0; i < oItems.length; i++)
		{
			oFriend[oFriend.length] = new Array(oItems[i].getAttribute('nick'), parseInt(oItems[i].getAttribute('id')), parseInt(oItems[i].getAttribute('idle')));
		}
		oFriend.sort(unsafeWindow.sortFriend);

		oList.innerHTML = '';
		for (var i = 0; i < oFriend.length; i++) {
			oList.innerHTML += '<li><a href="/csm/other/?p=other_info&s=manager&u=' + oFriend[i][1] + '" title="' + unsafeWindow.formatIdleTime(unsafeWindow.oNow.getTime() / 1000, oFriend[i][2]) + '">' + ((oFriend[i][2] > 0) ? '<span id="s_'+circle(oFriend[i][2])+'"></span>' : '') + oFriend[i][0] + '</a></li>';
		}
	}
	
	document.getElementById("friendlist").id="friend";
}


Event.domReady.add(initFriend); // init
