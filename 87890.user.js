// ==UserScript==
// @name           OGame Redesign Speedup
// @namespace      ogamespeedup
// @description    Speeds up OGame Redesign on old PCs
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

//Add a global style to the page
function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return;}
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}



//Disable 'typing effect' on OGame's overview
unsafeWindow.initType = function(){
	for(i=0;i!=8;i++)
	{
		var destination = document.getElementById(unsafeWindow.textDestination[i]);
		destination.innerHTML = unsafeWindow.textContent[i];		
	}
}

//Refresh the counters every 3 seconds, uses less CPU on old PCs
try { //Don't fail on pages like writemessage
	unsafeWindow.timerHandler.stopTimer();
	unsafeWindow.timerHandler._interval = 3000;
	unsafeWindow.timerHandler.startTimer();
}catch(e){}

//Disable CPU-hungry stars and background
addGlobalStyle('body { background: #000 !important; }');
addGlobalStyle('#star, #star1, #star2 { background: none !important; }');

//Disable hover effects
unsafeWindow.initMouseOverImageSwitch = function(){};
unsafeWindow.initHovers = function(){};

//Disable opacity on floating windows
addGlobalStyle('#TB_overlay, .TB_overlayBG { background:#000 !important; opacity: 1 !important; }');

//Disable message char counter (ally/galaxy/friends page)
unsafeWindow.cntchar = function(){}
addGlobalStyle('form[name=asdf] td[class=desc], #writemessage #messagebox.write .fleft.count.textBeefy { visibility: hidden !important; }');
 