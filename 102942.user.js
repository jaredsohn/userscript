// ==UserScript==
	// @name		justdial.com Enhanced Productivity
	// @description		some description here
	// @version		1.0.0
	// @date		16-05-2011
	// @source		http://userscripts.org/scripts/review/102942
	// @identifier		http://userscripts.org/scripts/source/102942.user.js
	// @author		Colin Thomas <ti.colinthomas@gmail.com>
	// @namespace		http://userscripts.org/scripts/show/102942
	// @include		http://*.justdial.com/*
	// @include		http://www.ninjamanager.com/*
// ==/UserScript==
drawCopyDataButton();

function drawCopyDataButton()	{
	var container = document.getElementById('detailPage');
	var saveDataButton = document.createElement('input');
	saveDataButton.type = 'button';
	saveDataButton.value = 'Copy Data';
	saveDataButton.addEventListener('click', copyData, false);
	saveDataButton.style.left = '800px';
	container.appendChild(saveDataButton);
}

function copyData()	{
alert("foo");
}