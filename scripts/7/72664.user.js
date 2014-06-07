// ==UserScript==
// @name           YT: Channel Quicklist Buttons
// @namespace      http://www.userscripts.org
// @include        http://www.youtube.com/user/*
// @include        http://youtube.com/user/*
// @require        http://usocheckup.dune.net/72664.js
// ==/UserScript==
(function() {

function initQLButtons() {
	var links = document.getElementsByTagName('a');
	for (var i=0;i<links.length;i++)
	if (links[i].id.search(/^video-thumb-[0-9a-zA-Z_\-]+-\d+$/) === 0 &&
			links[i].getAttribute('gm_ytcqb') != 'true') {
		var a = links[i];
		a.setAttribute('gm_ytcqb', 'true');
		
		var ul = document.createElement('ul');
		a.parentNode.appendChild(ul);
		ul.className='yt-uix-button-menu yt-uix-button-menu-short';
		ul.style.minWidth='23px';
		ul.style.top = '54px';
		ul.style.left = '50px';
		ul.style.opacity = 0;
		ul.addEventListener('mouseover', function() { this.style.opacity = 1; }, false);
		ul.addEventListener('mouseout', function() { this.style.opacity = 0; }, false);

		var li = document.createElement('li');
		ul.appendChild(li);
		li.addEventListener('click', function() {
				var a = this.parentNode.parentNode.getElementsByTagName('a')[0];
				console.info(a);
				unsafeWindow.yt.www.watch.quicklist.clickedAddIcon_w5(a.id, null, a.id.replace(/^video-thumb-([0-9a-zA-Z_\-]+)-\d+$/,'$1'), "", "");
				console.info('queueing');
				var span = document.createElement('span');
				span.className = 'video-in-quicklist';
				span.appendChild(document.createTextNode('Added to'));
				span.appendChild(document.createElement('br'));
				span.appendChild(document.createTextNode('queue'));
				this.parentNode.removeChild(this);
				a.appendChild(span);
			}, false);

		var span = document.createElement('span');
		li.appendChild(span);
		span.className=" yt-uix-button-menu-item";
		span.appendChild(document.createTextNode('Add to queue'));
	}

	var divs = document.getElementsByTagName('div');
	for (var i=0;i<divs.length;i++)
	if (divs[i].className == 'outer-scrollbox' && 
			divs[i].getAttribute('gm_ytcqb') != 'true') {
		divs[i].setAttribute('gm_ytcqb', 'true');
		divs[i].addEventListener('scroll', timeoutInitQLButtons, false);
	}
}

function timeoutInitQLButtons() {
	window.setTimeout(initQLButtons, 2000);
}

document.addEventListener('click', timeoutInitQLButtons, false);

timeoutInitQLButtons();
})();