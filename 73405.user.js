// ==UserScript==
// @name           Llama Timer
// @namespace      nuckchorris
// @description	 adds a timer to the GiveALlamaGetALlama chatroom so you know how long you have until you can beg for llamas again.
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==

llamaTimerJS = document.createElement('script');
llamaTimerJS.appendChild(document.createTextNode((<r><![CDATA[


function llamaCountdown(){
//	llamaTimer.style.color='inherit';
	llamaS=60;
	llamaM=2;
	llama = setInterval(function(){
		llamaS--;
		if(llamaS==-1){
			llamaS=59;
				if(llamaM!=0){llamaM--}
				else{clearInterval(llama);llamaS=0;llamaTimer.style.color="red";}
			}	
		if(llamaS<10){llamaS="0"+llamaS}
		llamaTimer.innerHTML=llamaM+":"+llamaS;
	},1000);
}

addLlamaTimer=function(){
	if(dAmnChats['chat:GiveALlamaGetALlama']){
		llamaSpacer = document.createTextNode(" | ");
		llamaTimer = document.createElement('span');
		llamaTimer.id="llamaTimer";
		llamaTimer.innerHTML="3:00";
		llamaTimer.style.cursor="pointer";
		llamaTimer.title="Click to reset timer";
		llamaTimer.addEventListener('click',function(){
			if(llama){clearInterval(llama)}
			llamaTimer.style.color='inherit';
			llamaCountdown();
		},false);
		llamaBar = dAmnChats['chat:GiveALlamaGetALlama'].channels.main.iconbar_el.firstChild;
		//Append that shit!
		llamaBar.insertBefore(llamaSpacer,llamaBar.firstChild);
		llamaBar.insertBefore(llamaTimer,llamaSpacer);
		llamaCountdown();
	} else{
		window.setTimeout(addLlamaTimer,100);
	}
}

addLlamaTimer();

]]></r>).toString()));
document.getElementsByTagName('head')[0].appendChild(llamaTimerJS);