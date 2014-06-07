// ==UserScript==
// @name           Thumbshare Timer
// @namespace      realillusions
// @description	 adds a timer to the TS chatroom so you know how long you have until you can post your thumbs again.
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==

timerjs = document.createElement('script');
timerjs.appendChild(document.createTextNode((<r><![CDATA[


function countdown(){
seconds=60
minutes=4;
dodo = setInterval(function(){
		seconds--;
		if(seconds==-1){
			seconds=59;
				if(minutes!=0){minutes--}
				else{clearInterval(dodo);seconds=0;}
			}	
		if(seconds<10){seconds="0"+seconds}
		tstimer.innerHTML=minutes+":"+seconds
		},1000);
}

addTimer=function(){
if(dAmnChats['chat:Thumbsshare']){

	spacer = document.createTextNode(" | ");
	tstimer = document.createElement('span');
	tstimer.id="tstimer";
	tstimer.innerHTML="5:00";
	tstimer.style.cursor="pointer";
	tstimer.title="Click to reset timer"
	tstimer.addEventListener('click',function(){if(dodo){clearInterval(dodo)};countdown();},false);
	thebar = dAmnChats['chat:Thumbsshare'].channels.main.iconbar_el.firstChild;
	//Append that shit!
	thebar.insertBefore(spacer,thebar.firstChild);
	thebar.insertBefore(tstimer,spacer);
	countdown();
		}
else{
	window.setTimeout(addTimer,100);
	}
}

addTimer();

]]></r>).toString()));
document.getElementsByTagName('head')[0].appendChild(timerjs)