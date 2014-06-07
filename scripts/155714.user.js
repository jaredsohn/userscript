// ==UserScript==
// @name			Rescreatu User Profile Button
// @include			http://www.rescreatu.com/profile.php?*
// @description		Adds a button to user profiles that allows you to remove user custom styles
// @version			1.3.1
// ==/UserScript==

(function () {
"use strict";
	var buffer = document.body.innerHTML, btn = document.createElement('div'), elements = document.getElementsByTagName("*"), i, zlen, hzindex,
	stylescount = document.getElementById('content').getElementsByTagName('style').length,
	titles = stylescount > 0 ? [
		'Click to Remove Custom Styles\nCtrl + Click to Remove Content',
		'Click to Restore Custom Styles\nCtrl + Click to Remove Content',
		'Click to Restore Content\nCtrl + Click to Revert to Previous'
	] : [
		'Click to Remove Content',
		null,
		'Click to Restore Content'
	];

	for (i = 0, zlen = 1; i < elements.length; ++i) if (elements[i].style.zIndex.length > zlen) zlen = elements[i].style.zIndex.length;
	for (i = 0, hzindex = '1'; i < zlen; ++i) hzindex = hzindex + '0';

	document.body.style.display = 'block';
	document.body.appendChild(btn);

	btn.title = titles[0];
	btn.setAttribute('style','background:#ccc url(http://img27.imageshack.us/img27/4464/gear32.png) center center no-repeat; border:2px solid #999; border-radius:5px; cursor:pointer; height:28px; left:10px; opacity:0.4; position:fixed; top:10px; width:28px; z-index:'+hzindex);

	btn.onclick = (function () {
		var fragments = [], now = 0, prev = 0,
		scan = stylescount > 0 ? function () {
			var elem = document.getElementById('content').getElementsByTagName('style');
			for (var i = elem.length-1; i>-1; --i) elem[i].parentNode.removeChild(elem[i]);
			prev = now;
			now = 1;
			btn.title = titles[now];
		} : generic;

		fragments.push(
			document.body.innerHTML.substring(
				0,
				document.body.innerHTML.indexOf('<div id="body">')+15
			)
		);
		fragments.push(
			document.body.innerHTML.substring(
				document.body.innerHTML.indexOf('<div id="body">')+15,
				document.body.innerHTML.indexOf('<table width="600" cellspacing="0" cellpaddding="0" align="center" border="0">')
			)
		);
		fragments.push(
			document.body.innerHTML.substr(
				document.body.innerHTML.indexOf('<table width="600" cellspacing="0" cellpaddding="0" align="center" border="0">')
			)
		);

		if (fragments[1].length < 4) document.body.removeChild(btn);

		btn.onmouseover = function () {
			this.style.opacity = '0.9';
		};

		btn.onmouseout = function () {
			if (now < 1) this.style.opacity = '0.4';
		};

		return function (event) {
			if (now > 0) {
				if (event.ctrlKey == true) {
					if (now > 1) {
						if (prev == 1) {
							restore();
							scan();
							return;
						}
						restore();
						return;
					}

					generic();
					return;
				}

				restore();
				return;
			}

			if (event.ctrlKey == true) {
				generic();
				return;
			}

			scan();
		};

		function generic () {
			document.body.removeChild(btn);
			document.body.innerHTML = fragments[0]+fragments[2];
			document.body.appendChild(btn);
			prev = now;
			now = 2;
			btn.title = titles[now];
		}

		function restore () {
			document.body.removeChild(btn);
			document.body.innerHTML = fragments.join('');
			document.body.appendChild(btn);
			prev = now;
			now = 0;
			btn.title = titles[now];
		}
	})();
})();