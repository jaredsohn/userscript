// ==UserScript==
// @name Ogame NucleaR Messager modified by Fleety
// @description NucleaR Messager modified by Fleety
// @creator by Black Cat, modified by Fleety
// @version 0.6 Works on the new Ogame
// @include http://*.ogame.*/game/index.php?page=showmessage*
// @include http://*.ogame.*/game/index.php?page=writemessage*
// @include http://*.ogame.*/game/index.php?page=alliance*
// ==/UserScript==

(function(){

	if(typeof GM_addStyle === 'undefined') {
		//GM_addStyle by TarquinWJ
		GM_addStyle = function (css) {
			var NSURI = 'http://www.w3.org/1999/xhtml';
			var hashead = document.getElementsByTagName('head')[0];
			var parentel = hashead || document.documentElement;
			var newElement = document.createElementNS(NSURI,'link');
			newElement.setAttributeNS(NSURI,'rel','stylesheet');
			newElement.setAttributeNS(NSURI,'type','text/css');
			newElement.setAttributeNS(NSURI,'href','data:text/css,'+encodeURIComponent(css));
			if( hashead ) {
				parentel.appendChild(newElement);
			} else {
				parentel.insertBefore(newElement,parentel.firstChild);
			}
		}
	}

	var script = document.createElement("script");
	script.setAttribute("type","text/javascript");
	script.setAttribute("language","javascript");
	script.text = 
	'function addBBCode() {' +
		'var tag = arguments[0];' +
		'var value = arguments[1];' +
		'var str1;' +
		'if (value) {' +
			'if (value=="0") return;' +
			'str1 = "[" + tag + "=" + value + "]";' +
		'} else {' +
			'str1 = "[" + tag + "]";' +
		'}' +
		'var str2 = "[/" + tag + "]";' +
		'if (tag == "list") {' +
			'str1 += "[*]";' +
			'str2 = "\\n" + str2;' +
		'}' +
		'var message = document.getElementsByName("text")[0];' +
		'message.focus();' +
		'if (message.isTextEdit) {' +
			'var sel = document.selection;' +
			'var rng = sel.createRange();' +
			'var seltext = rng.text;' +
			'rng.text = str1 + seltext + str2;' +
			'rng.collapse(false);' +
			'rng.move("character",-str2.length);' +
			'rng.moveStart("character",-seltext.length);' +
			'rng.select();' +
		'} else {' +
			'var start = message.selectionStart;' +
			'var starttext = message.value.substring(0,start);' +
			'var seltext = message.value.substring(start,message.selectionEnd);' +
			'var endtext = message.value.substring(message.selectionEnd,message.textLength);' +
			'message.value = starttext + str1 + seltext + str2 + endtext;' +
			'message.selectionStart = start + str1.length;' +
			'message.selectionEnd = start + str1.length + seltext.length;' +
		'}' +
		'message.focus();' +
	'}';
	document.body.appendChild(script);

	function funcBBCode() {
		var form = document.getElementsByTagName("form")[0];
		if (!form) return;
		var ta = document.getElementsByName("text")[0];
		var div = document.createElement("div");
		div.innerHTML += "<select class='dropdown' onchange='addBBCode(\"size\",this.value)'><option value='0'>Size</option><option value='7'>1</option><option value='10'>2</option><option value='12'>3</option><option value='16'>4</option><option value='20'>5</option></select> ";
		div.innerHTML += "<select class='dropdown' onchange='addBBCode(\"color\",this.value)'><option value='0'>Colore</option><option value='black' style='color:black'>Nero</option><option value='silver' style='color:silver'>Argento</option><option value='gray' style='color:gray'>Grigio</option><option value='maroon' style='color:maroon'>Castagna</option><option value='brown' style='color:brown'>Marrone</option><option value='red' style='color:red'>Rosso</option><option value='orange' style='color:orange'>Arancio</option><option value='yellow' style='color:yellow'>Giallo</option><option value='lime' style='color:lime'>Vrd chx</option><option value='green' style='color:green'>Verde</option><option value='olive' style='color:olive'>Oliva</option><option value='teal' style='color:teal'>Teal</option><option value='aqua' style='color:aqua'>Azzurro</option><option value='blue' style='color:blue'>Blu</option><option value='navy' style='color:navy'>Blu scx</option><option value='purple' style='color:purple'>Viola</option><option value='fuchsia' style='color:fuchsia'>Fuchsia</option><option value='pink' style='color:pink'>Rosa</option><option value='white' style='color:white'>Bianco</option></select> ";
		if (document.location.href.indexOf("page=alliance") != -1)
			div.innerHTML += "<br />";
		div.innerHTML += "<a href='javascript:addBBCode(\"b\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAA3NCSVQICAjb4U/gAAAAZlBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////39/fu7u7l5eXf39/W1tbMzMzFxcW9vb21tbWtra2lpaWZmZmKioqCgoJ8fHx1dXVfX19VVVUcHBwQEBAAAABvQ4WDAAAAInRSTlMAESIzRFVmd4iZqrv/////////////////////////////erKVdwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAB90RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAACtSURBVCiRvY3XEsIgFERDsRAN4dJuFNv+/0+KJY6jvOp5WWaXA133C5TBujmYyUI2eo3ttpjG0PMwtBSNwVrbUHq2Y+VLkbDBOTd+KebgTjsich+KvLiAsw+eDuZD8N5RiDEQ1Fu/AtUuporf4+0+UjiiUnJOdMTi2S/gQo57bEpi5kQZryEy54K+ZJ4mzhPEYxD97Rlo/UhgOQ9SKa2kqKkr9TR/Lu7MKUT3J66l/Q2irNMvNQAAAABJRU5ErkJggg==' alt='Bold' title='Bold' border='0' /></a>";
		div.innerHTML += "<a href='javascript:addBBCode(\"i\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAA3NCSVQICAjb4U/gAAAAY1BMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD39/fu7u7n5+fe3t7S0tLMzMzDw8O+vr61tbWvr6+kpKSZmZmQkJB6enpjY2NXV1dTU1M6OjooKCggICAREREAAACW3aPzAAAAIXRSTlMAESIzRGZ3iJmqu//////////////////////////////ewDs2AAAACXBIWXMAAAsSAAALEgHS3X78AAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjSeAAAAJdJREFUKJG10MsSgjAMBVDaIvJKX6FYlcL9/6+UcSPYbrmLLHJmkkyq6qo0aIr9Fhqlfo1hgChACsNYgtvbj1SAeuNIugDdTNAmh3skLNpnoDajtTacQWJy1rnpD2SKlIAXz2dowfbZ94j8OP1ErmS8XUBu8ozj4tWFwAv2OoXjLNFhT/etaI4g1B4plaqVPF8lfsk+cl0+nUwKek1swHwAAAAASUVORK5CYII=' alt='Italic' title='Italic' border='0' /></a>";
		div.innerHTML += "<a href='javascript:addBBCode(\"u\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAA3NCSVQICAjb4U/gAAAAaVBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////4+Pjv7+/n5+ff39/W1tbMzMzFxcW8vLy1tbWtra2mpqacnJyRkZGFhYV/f39mZmZSUlJDQ0MzMzMREREAAAAvziwyAAAAI3RSTlMAESIzRFVmd4iZqrvu/////////////////////////////6saOpIAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAAAtElEQVQokbWR3RaCIBCEQzD/UthFyErT5v0fMr1RIG/7bjjMnDOzC5fLX6hQnerF1M75iS7gW9+cGGqhrkP2a9SPQXe+PEliDJpuIjWub1vORi9pvZj9BLDxc2JIGKM1EX2S+mokJmamZxHpOdyIlQc7hPUF7haNUg0sT5CHsd6tQXYFu56eCHbwzlmIHL33/Sswyi2/FqLeTqhjJMTUe5I2EYiSAvb/ElJKdZAFy4uQ9H1jvp0jEWFcRQbjAAAAAElFTkSuQmCC' alt='Underline' title='Underline' border='0' /></a>";
		div.innerHTML += "<a href='javascript:addBBCode(\"s\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAA3NCSVQICAjb4U/gAAAAYFBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////29vbu7u7m5ube3t7V1dXMzMzCwsKzs7Otra2lpaWZmZmOjo58fHxmZmZRUVFDQ0M7OzszMzMAAABWp2jsAAAAIHRSTlMAESIzRFVmd4iZqu7//////////////////////////5UxFAAAAAAJcEhZcwAACvAAAArwAUKsNJgAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAAAo0lEQVQokbVQ7Q6CMBDjtqEw2MfBmIJK3/8tncYgyBJ/0WS7pM2u7YriENSos/x5au9lhidwG5AR1OxNC7EX9MU4O1a5TXN0DPoVTjfTPLzDzh48oel83NjX2GKpA2OtdS4dny5r8PcFVYgdtJQazIBakqWozA6ihO97vmIlDEPsQSVCjGH8BkurEjSRfluoVW0hpSR6DSXFunwi6TNo9ymH4QksEA2GU5CXhAAAAABJRU5ErkJggg==' alt='Strike through' title='Strike through' border='0' /></a> ";
		div.innerHTML += "<a href='javascript:addBBCode(\"align\",\"center\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYAgMAAACdGdVrAAAAA3NCSVQICAjb4U/gAAAACVBMVEX///////8AAACO9MPsAAAAA3RSTlMA//9EUNYhAAAACXBIWXMAAArwAAAK8AFCrDSYAAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjSeAAAADNJREFUCJljYMAGmFYBQQMDYygQOCCLNgApRjQxLCoZuBaAKdYAQmYyrFoFpkJDsToEDgBeyRP8DhwWwQAAAABJRU5ErkJggg==' alt='Align center' title='Align center' border='0' /></a> ";
		div.innerHTML += "<a href='javascript:addBBCode(\"list\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYAgMAAACdGdVrAAAAA3NCSVQICAjb4U/gAAAACVBMVEX///////8AAACO9MPsAAAAA3RSTlMA//9EUNYhAAAACXBIWXMAAAsSAAALEgHS3X78AAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjSeAAAABh0RVh0Q3JlYXRpb24gVGltZQAxNC4xMS4yMDA3+XeAJAAAACVJREFUCJljYEAFDWCSKWHVqlUNDIwTQkNDHRgYHBhwA9prAAMA3f4QUeGCZkAAAAAASUVORK5CYII=' alt='List' title='List' border='0' /></a> ";
		div.innerHTML += "<a href='javascript:addBBCode(\"url\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAA3NCSVQICAjb4U/gAAAAhFBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////4+Pjw8PDm5ube3t7X19fMzMzFxcW8vLy1tbWtra2np6ecnJyUlJSEhIR+fn5zc3NsbGxmZmZXV1dNTU1AQEA5OTkzMzMpKSkVFRUQEBAGBgYAAACU9KEpAAAALHRSTlMAESIzRFVmd4iZqrvM3e7///////////////////////////////////////+D3T4AAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAABA0lEQVQokWXR2ZKDIBAFUNFoWAxhs3GNmphl0v//f8NMVSqo/cDDuTTVQJJsqqA021oohiPAJPKtU7Tn89nWYutSK2WVUo91C8PgiwzruoWgVXoR+Qk0lCSe56r10sz8rfVE44ANpg+bURmD2Sq4dN6Ypzbmxb+eU8okWNsZY18i/QQMb8MgnXW1cy5yilqbtrLuOU0zRi6NdUPjqpfgnB2ic4yDewvQjDxLU/JxgqaCRw9+gJGRaMziWvl7OXcP72e6eqHRt7IQCLXH+CcIG4OIt/PND4/vmxT3pobeBv/O+V9peWlrqHeekGO5DP0Ntx6SjJ0kP+w8JGmWpWTvf9GefwHM/BUabF+V+wAAAABJRU5ErkJggg==' alt='Insert link' title='Insert link' border='0' /></a>";

		div.innerHTML += "<br />";
		ta.parentNode.insertBefore(div,ta);
		if (document.location.href.indexOf("page=writemessage") != -1 || document.location.href.indexOf("page=showmessage") != -1) {
			if (document.location.href.indexOf("page=showmessage") != -1) {
				var messageBox = document.getElementById("messagebox");
				messageBox.style.height = "508px";
				ta.style.height = "70px";
			}
			if (document.location.href.indexOf("page=writemessage") != -1) {
				ta.parentNode.style.height="99%";
			}
			GM_addStyle("select.dropdown{border:1px solid #000;background-color:#141E26;color:#848484}");
		}
	}

	if (document.location.href.indexOf("page=alliance") != -1) {
		var $;
		try { $ = unsafeWindow.$; }
		catch(e) { $ = window.$; }
		$("#eins").ajaxSuccess(function(e,xhr,settings){
			if (settings.url.indexOf("page=allianceBroadcast") == -1) return;

			funcBBCode();
		});
	} else {
		funcBBCode();
	}

})();