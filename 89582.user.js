// ==UserScript==
// @name           What.BB remake
// @namespace      what.cd
// @description    What.BB remake
// @include        http*://*what.cd/*
// @exclude        http*://*what.cd/requests.php*
// ==/UserScript==
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
		GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
			window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		letsJQuery();
	}
}

// All your GM code must be inside this function
function letsJQuery() {
	var smileyIMG = [ // img urls
		// format: [filename]###[BBcode tag]
		'smile.gif###:)',
		'sad.gif###:(',
		'ohshit.gif###:o',
		'biggrin.gif###:D',
		'laughing.gif###:lol:',
		'omg.gif###:omg:',
		'tongue.gif###:P',
		'blank.gif###:|',
		'frown.gif###:frown:',
		'angry.gif###:angry:',
		'paddle.gif###:paddle:',
		'ohnoes.gif###:ohnoes:',
		'worried.gif###:worried:',
		'wink.gif###:wink:',
		'creepy.gif###:creepy:',
		'cool.gif###:cool:',
		'wtf.gif###:wtf:',
		'hmm.gif###:unsure:',
		'no.gif###:no:',
		'nod.gif###:nod:',
		'eyesright.gif###>.>',
		'wave.gif###:wave:',
		'sick.gif###:sick:',
		'blush.gif###:blush:',
		'wub.gif###:wub:',
		'heart.gif###<3',
		'shifty.gif###:shifty:',
		'ninja.gif###:ninja:'
	];
	var BBtag = [
		// format:
		// [button value]###[bbcode open tag]###[bbcode close tag]
		'b###[b]###[/b]',
		'i###[i]###[/i]',
		'u###[u]###[/u]',
		's###[s]###[/s]',
		'img###[img]###[/img]',
		'url###[url]###[/url]',
		'ªa###[size=]###[/size]',
		'“„###[quote]###[/quote]',
		'align###[align=]###[/align]',
		'pre###[pre]###[/pre]',
		'RBG###[color=]###[/color]',
		'[*]###[*]###',
		'artist###[artist]###[/artist]',
		'wiki###[[###]]'
	];
	var textarea = document.getElementsByTagName("textarea");

	function sendSmiley() {
		var ID = this.id.split("smiley")[1];
		var tID = this.className;
		var ta = textarea[tID];

		if (ta.selectionStart) {
			var startPos = ta.selectionStart;
		} else {
			var startPos = ta[0];
		}
		var endPos = ta.selectionEnd;
		ta.value = ta.value.substring(0, startPos) + smileyIMG[ID].split("###")[1] + ta.value.substring(endPos,ta.value.length);
		return;
	}
	function sendBB() {
		var ID = this.id.split("bb")[1];
		var tID = this.className;

		var openTag = BBtag[ID].split("###")[1];
		var closeTag = BBtag[ID].split("###")[2];
		var ta = textarea[tID];

		if (ta.selectionStart) {
			var startPos = ta.selectionStart;
		} else {
			var startPos = ta[0];
		}
		var endPos = ta.selectionEnd;
		var str = ta.value.substring(startPos, endPos);
		ta.value = ta.value.substring(0, startPos) + openTag + str + closeTag + ta.value.substring(endPos,ta.value.length);
		return;
	}
	for (var y = 0; y < textarea.length; y++) {
		var textarea = document.getElementsByTagName("textarea");

		function open () {
			var ID = this.id.split("getSmileys")[1];
			$('#smileyDiv'+ID).slideToggle('slow');
		}
		function open2 () {
			var ID = this.id.split("getbb")[1];
			$('#bbDiv'+ID).slideToggle('slow');
		}

		smileyDiv = [];
		getSmileys = [];
		getSmileysDiv = [];

		(function creSmileyDiv() {
		// create smiley stuff
			function createButton(bb) {
				var make = document.createElement("img");
				make.id = bb;
				make.className = y;
				make.type = "button";
				var ID = bb.split("smiley")[1];
				make.src = "http://what.cd/static/common/smileys/"+smileyIMG[ID].split("###")[0];
				make.addEventListener("click", sendSmiley, false);
				return make;
			}
			smileyDiv[y] = document.createElement("div");
			smileyDiv[y].id = "smileyDiv"+y;
			smileyDiv[y].style.display = "none";
			for (var e = 0; e < smileyIMG.length; e++) {
				smileyDiv[y].appendChild(createButton(y+"smiley" + e));
			}
			textarea[y].parentNode.appendChild(smileyDiv[y]);

			getSmileys[y] = document.createElement("input");
			getSmileys[y].value = "Smileys";
			getSmileys[y].type = "button";
			getSmileys[y].id = "getSmileys"+y;
			getSmileys[y].addEventListener('click',open,false);

			getSmileysDiv[y] = document.createElement("div");
			getSmileysDiv[y].id = "getSmileysDiv";
			getSmileysDiv[y].className = "getSmileysDiv";
			getSmileysDiv[y].innerHTML = "";
			textarea[y].parentNode.appendChild(document.createElement("br"));
			textarea[y].parentNode.appendChild(getSmileys[y]);
			textarea[y].parentNode.appendChild(getSmileysDiv[y]);
		// create smiley stuff
		})();

		bbDiv = [];
		getbb = [];
		getbbDiv = [];

		(function creTagDiv() {
		// create bb stuff
			function createButton(bb,bbName) {
				var make = document.createElement("input");
				make.id = bb;
				make.className = y;
				make.name = bbName;
				make.type = "button";
				var ID = bb.split("bbtag")[1];
				make.value = bbName;
				make.addEventListener("click", sendBB, false);
				return make;
			}
			bbDiv[y] = document.createElement("div");
			bbDiv[y].id = "bbDiv"+y;
			bbDiv[y].style.display = "none";
			for (var e = 0; e < BBtag.length; e++) {
				bbDiv[y].appendChild(createButton(y+"bb" + e,BBtag[e].split("###")[0]));
			}
			textarea[y].parentNode.appendChild(bbDiv[y]);

			getbb[y] = document.createElement("input");
			getbb[y].value = "BBcode";
			getbb[y].type = "button";
			getbb[y].id = "getbb"+y;
			getbb[y].addEventListener('click',open2,false);

			getbbDiv[y] = document.createElement("div");
			getbbDiv[y].id = "getbbDiv";
			getbbDiv[y].className = "getbbDiv";
			getbbDiv[y].innerHTML = "";
			textarea[y].parentNode.appendChild(getbb[y]);
			textarea[y].parentNode.appendChild(getbbDiv[y]);
		// create bb stuff
		})();

	}
	function edit() {
		//add box
	}
	/*
	function find() {
		var a = document.getElementsByTagName("a");
		for (var e = 0; e < a.length; e++) {
			if (a[e].innerHTML == "[Edit]") {
				return a[e];
			}
		}
	}
	find().addEventListener('click',edit,false);
	*/
}
