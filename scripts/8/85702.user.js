// ==UserScript==
// @name           Dollchan Extension Tools Iichan Addon
// @author         Eisfee
// @include        *iichan.ru*
// ==/UserScript==
(function() {
	var adminbar;
	var hiddenPostArea;
	var userdel;
	var desupanel;
	var refreshbtn;
	
	init();


function init() {
	
	if (document.location == 'http://iichan.ru/') {
		document.location = 'http://iichan.ru/b/';
	}
	adminbar = document.getElementsByClassName('adminbar')[0];
	hiddenPostArea = document.getElementsByClassName('postarea')[0];
	userdel = document.getElementsByClassName('userdelete')[0];
	
	desupanel = document.getElementById('DESU_panel');
	refreshbtn = document.getElementById('refresh_btn');

	desupanel.appendChild(adminbar);
	desupanel.appendChild(userdel);

	btn = document.createElement('input');
	btn.setAttribute('type', 'button');
	btn.value = 'Удалить';
	btn.addEventListener('click', handleDelButton, false);
	desupanel.insertBefore(btn, refreshbtn);

	btn = document.createElement('input');
	btn.setAttribute('type', 'button');
	btn.value = 'Доски';
	btn.addEventListener('click', handleNavButton, false);
	desupanel.insertBefore(btn, refreshbtn);

	hiddenPostArea.style.visibility = 'visible';
	hiddenPostArea.style.height = 'auto';
	userdel.style.display.visibility = 'visible';
}

function handleDelButton() {
	userdel.style.display = (userdel.style.display == 'block') ? 'none' : 'block';
}

function handleNavButton() {
	adminbar.style.display = (adminbar.style.display == 'block') ? 'none' : 'block';
}
})();
