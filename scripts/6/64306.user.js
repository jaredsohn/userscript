// ==UserScript==
// @name          Shinsei Wand mod
// @namespace     http://www.tymy.net/~matsu/blog/
// @include       https://*.shinseibank.co.jp/*
// @version       0.2
// @license       MIT License
// @inspire       http://xxsionxx.blog17.fc2.com/blog-entry-1060.html
// ==/UserScript==


(function() {
	/*** AT YOUR OWN RISK ***/
	var id    = 'xxxxxxxxxx';
	var numid = 'xxxx';
	var psw = 'xxxxxxxxxxxx';
	var table = {
		//   0    1    2    3    4
		A: ['', '', '', '', ''],
		B: ['', '', '', '', ''],
		C: ['', '', '', '', ''],
		D: ['', '', '', '', ''],
		E: ['', '', '', '', ''],
		F: ['', '', '', '', ''],
		G: ['', '', '', '', ''],
		H: ['', '', '', '', ''],
		I: ['', '', '', '', ''],
		J: ['', '', '', '', '']
	};

	var w = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
	if (document.title != '\u30ed\u30b0\u30a4\u30f3\u30b9\u30af\u30ea\u30fc\u30f3') return;
	try {
		$('securitykeyboard').checked = false;
		
		
		if ($$('fldUserPass')) {
		// page 1
			w.addEventListener('load', function() {
				$$('fldUserID').value = id;
				$$('fldUserNumId').value = numid;
				$$('fldUserPass').value = psw;
				w.CheckLogonInputs();
			}, false);
		}
		else {
		// page 2
			var strongs = document.getElementsByTagName('strong');
			var p = [];
			for (var i = 0, size = strongs.length; i < size; i++) {
				if (strongs[i].innerHTML.length == 2) {
					p.push({
						x: strongs[i].innerHTML[0],
						y: strongs[i].innerHTML[1]
					});
				}
			}
			for (var i = 0; i < 3; i++) {
				$('fldGridChg' + (i + 1)).value = table[p[i].x][p[i].y];
			}
			w.CheckLogonInputs();
		}
	}
	catch(e) {
//		console.info(e);
	}

	function $$(name) {
		return document.getElementsByName(name).item(0);
	}

	function $(id) {
		return document.getElementById(id);
	}
})();
