// ==UserScript==
// @name            RPGForEvery1 Thumb Timer 5-mins
// @namespace       RPGForEvery1
// @description    Adds a 5 min timer to  RPGForEvery1 channel
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
if(dAmnChats['chat:RPGForEvery1']){

	spacer = document.createTextNode(" | ");
	tstimer = document.createElement('span');
	tstimer.id="tstimer";
	tstimer.innerHTML="5:00";
	tstimer.style.cursor="pointer";
	tstimer.title="Click to reset timer"
	tstimer.addEventListener('click',function(){if(dodo){clearInterval(dodo)};countdown();},false);
	thebar = dAmnChats['chat:RPGForEvery1'].channels.main.iconbar_el.firstChild;
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