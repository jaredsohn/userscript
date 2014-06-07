// ==UserScript==
// @name           HV - Minor Addition EX
// @namespace      HVMAb
// @description    Effect durations, gem icon, skill hotkey, round counter, potatoes
// @match          http://hentaiverse.org/?s=Battle&ss=*
// @run-at         document-end
// ==/UserScript==

var settings = {
	monsterNumbers: true,  //怪物标号
	effectDurations: true,   //状态持续时间
	gemIcon: true,    //宝石提醒
	skillHotkey: true,  //技能施放
	turnDivider: true,  //回合分割线
	roundCounter: true,   //层数记录
	channelingAlert: 1 // 0 = nothing, 1 = change menu background, 2 = alert, 3 = both
};

// * * * * * * * * * *

if (document.getElementById('togpane_log')) {

	var style = '', channelingProcced = false;
	// replace monster letters
	if (settings.monsterNumbers) {
		var targets = document.querySelectorAll('.btm1'), i = targets.length;
		while (i --> 0)    
		{
			targets[i].querySelector('.btm2 > div').innerHTML=(i+1)%10
			//targets[i].querySelector('.btm2 ').style.cssText= 'height: 25px; font-size: 1.6em; font-family: HentaiVerse; color: black; padding-top: 0.4em;'
		}
	style +='.btm2  { height: 25px; font-size: 3em; color: black; padding-top: 0.4em;font-weight: bold }';

		}
		//alert('1')
	// effect durations

	if (settings.effectDurations) {
		var targets = document.querySelectorAll('img[onmouseover^="battle.set_infopane_effect"]'), i = targets.length;
		while (i --> 0) {
			var duration = targets[i].getAttribute('onmouseover').match(/, ([-\d]+)\)/);
			if (!duration || duration < 0) duration = 'IA';
			else duration = duration[1];
			var div = targets[i].parentNode.insertBefore(document.createElement('div'),targets[i].nextSibling);
			div.appendChild(document.createElement('div')).innerHTML = duration; div.className = 'duration';
		}
		style += '.duration { width: 30px; display: inline-block; text-align: center; position: relative; margin-left: -30px; top: -4px; }' +
		'.duration > div { background: white; border: 1px solid black; padding: 0 2px; display: inline-block; min-width: 15px; color: black; font-weight: bold; }';
	}

	// gems
if (settings.gemIcon && (gem = document.getElementById('ikey_p'))) {
		var icon;
		switch (gem.getAttribute('onmouseover').match(/'([^\s]+) Gem/)[1]) {
			case 'Mystic':
			style += '#leftpane > .btp { background-color: rgba(0,0,255,0.2); }';
			break;
			case 'Health':
			style += '#leftpane > .btp { background-color: rgba(0,255,0,0.2); }';
			break;
			case 'Mana':
			style += '#leftpane > .btp { background-color: rgba(0,0,255,0.5); }';
			break;
			case 'Spirit':
			style += '#leftpane > .btp { background-color: rgba(255,0,0,0.2); }';
			break;
		};
	}

	// hotkey


	
		document.addEventListener('keyup',function(e) {
			if (e.keyCode != 107) return;
			var target = document.querySelectorAll('#togpane_magico tr:nth-child(3) ~ tr > td > div:not([style])'), pane = document.getElementById('togpane_magico'), toggle = document.getElementById('ckey_magic');
			if (!target.length) return;
			else target = target[target.length-1];
			while (pane.style.cssText.length) toggle.onclick();
			target.onclick();
		},false);

	// zawa zawa zawa


	if (settings.turnDivider || settings.roundCounter)
		var turns = document.querySelectorAll('#togpane_log > table > tbody > tr'), n = turns.length, current = turns[0].cells[0].textContent;

	// last turn divider

	if (settings.turnDivider) {
		for (var i=0;i<n;i++) {
			if (turns[i].cells[0].textContent == current) {
				if (settings.channelingAlert > 1 && !channelingProcced && turns[i].cells[2].textContent == 'You gain the effect Channeling.') channelingProcced = true;
				continue;
			}
			turns[i].style.borderTop = '2px solid black';
			break;
		}
		style += '#togpane_log > table { border-collapse: collapse; }';
	}
	// round counter

	if (settings.roundCounter && i==n) {
			var round = null;
				var text = turns[turns.length-2].cells[2].textContent;
				if (text.indexOf('Round') != -1) localStorage.setItem('round',round = text.match(/Round ([0-9 /]+)/)[1]);
					}
				  else round = localStorage.getItem('round');
			if (round) document.querySelector('#mainpane').appendChild(document.createElement('span')).innerHTML =round;
			style +='#mainpane > span { display: block; position:relative;  top:-640px;left:-50px; float: right; font-size: 2em; font-weight: bold;  }';

	// style
	var style2 = document.createElement('style');
	style2.innerHTML = style;
	document.head.appendChild(style2);
} else if (localStorage.hasOwnProperty('round')) localStorage.removeItem('round');