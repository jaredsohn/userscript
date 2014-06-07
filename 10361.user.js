// ==UserScript==
// @name Gmail Multi-User Login
// @description Dropdown menu of multiple user accounts for Gmail.
// @include http*://www.google.com/accounts/ServiceLogin?service=m*
// @version 1.2
// ==/UserScript==

var users = ['your.mom', 'your.dad', 'your.fish', 'your.sockpuppet']; //add users through the array variable

var target = document.getElementById('Email');

if (target) {

	var dpdwn = document.createElement('select');
	dpdwn.setAttribute('name', 'Email');
	dpdwn.setAttribute('id', 'Email');
	dpdwn.setAttribute('class', 'gaia le val');
	dpdwn.setAttribute('size', '1');
	dpdwn.setAttribute('style', 'width:' + target.offsetWidth + 'px');

	function populate() {
		for (var i = 0; i < users.length; i++) {
			var opt = document.createElement('option');
			opt.setAttribute('value', users[i]);
			var optxt = document.createTextNode(users[i]);
			opt.appendChild(optxt);
			dpdwn.appendChild(opt);
		}
	}
	populate();

	target.parentNode.replaceChild(dpdwn, target);
}

window.getElementByID('Passwd').focus();