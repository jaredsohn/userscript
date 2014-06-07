// ==UserScript==
// @name           DinoRPG info
// @namespace      DinoRPG
// @description    Making DinoRPG simpler...
// @include        http://en.dinorpg.com/dino/*
// @include        http://www.dinorpg.com/dino/*
// @include        http://es.dinorpg.com/dino/*
// @include        http://www.dinorpg.de/dino/*
// @author         I I I
// ==/UserScript==

var bars = 0;

function details(param) {
	var a = split(param);
	this.current = Number(a[0]);
	this.total = Number(a[1]);
	this.missing = Number(a[1]) - Number(a[0]);
	var p = Number(a[0] * 100 / a[1]).toFixed(2);
	if (p == Math.round(p))
		p = Number(p).toFixed(0);
	this.percentage = p;
}

var hpBar = document.getElementsByClassName('life ')[0];
var hp = new details(hpBar);
var xpBar = document.getElementsByClassName('xp')[0];
var xp = new details(xpBar);

if (!GM_getValue('dinorpg_config_display_hp'))
	GM_setValue('dinorpg_config_display_hp', promptDisplay('HP', 1));
if (!GM_getValue('dinorpg_config_display_xp'))
	GM_setValue('dinorpg_config_display_xp', promptDisplay('XP', 1));
hpBar.appendChild(newBar(GM_getValue('dinorpg_config_display_hp').replace('%c', hp.current).replace('%t', hp.total).replace('%m', hp.missing).replace('%p', hp.percentage + '%')));
xpBar.appendChild(newBar(GM_getValue('dinorpg_config_display_xp').replace('%c', xp.current).replace('%t', xp.total).replace('%m', xp.missing).replace('%p', xp.percentage + '%')));

function promptDisplay(param1, param2) {
	var display = new Array();
//	display[0] = '%c left';
//	display[1] = '%m to go';
	display[2] = '%c / %t';
	display[3] = '%c / %t : %p';
	display[4] = '%c / %t : %m';
	display[5] = '%c : %p';
	display[6] = '%p';
	display[7] = '%p : %m';
	display[8] = '%m';
	var choices = '';
	for (i = 2; i != display.length; ++i) {
		if (choices.length > 0)
			choices += '\n';
		choices += (i - 1) + '\t' + display[i];
	}
	var c = prompt('How to display ' + param1 + '?\n' +
						'\t%c\t\tcurrent\n' + 
						'\t%t\t\ttotal\n' +
						'\t%m\t\tmissing\n' +
						'\t%p\t\tpercentage\n\n' + choices, param2);

	if (c == null || c.length < 1 || Number(c) < 1 || Number(c) >= display.length - 1)
		c = param2;
	return display[Number(c) + 1];
}

function split(param) {
	return param.innerHTML.split('</strong>')[1].split('</div>')[0].replace(/ /g, '').split('/');
}

function newBar(param) {
	var nBar = document.createElement('div');
	nBar.innerHTML = '<b>&nbsp;' + param + '</b>';
	nBar.style.position = 'absolute';
	nBar.style.top = Number(bars * 15 - 1) + 'px';
	nBar.style.color = '#000000';
	nBar.style.fontSize = '11px';
	nBar.style.textAlign = 'left';
	++bars;
	return nBar;
}
