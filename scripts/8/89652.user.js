// ==UserScript==
// @name           bbcode
// @namespace      Mimix
// @include        http://beta*.e-univers.org/index.php?action=ecriremessages&dest=*
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
		div.innerHTML += "<select class='dropdown' style='font-size:10pt;height:1.7em' onchange='var value=this.value;this.selectedIndex=0;addBBCode(\"color\",value)'><option value='0'>COLOR</option><option value='black' style='color:black;font-size:9pt'>black</option><option value='silver' style='color:silver;font-size:9pt'>silver</option><option value='gray' style='color:gray;font-size:9pt'>gray</option><option value='maroon' style='color:maroon;font-size:9pt'>maroon</option><option value='brown' style='color:brown;font-size:9pt'>brown</option><option value='red' style='color:red;font-size:9pt'>red</option><option value='orange' style='color:orange;font-size:9pt'>orange</option><option value='yellow' style='color:yellow;font-size:9pt'>yellow</option><option value='lime' style='color:lime;font-size:9pt'>lime</option><option value='green' style='color:green;font-size:9pt'>green</option><option value='olive' style='color:olive;font-size:9pt'>olive</option><option value='teal' style='color:teal;font-size:9pt'>teal</option><option value='aqua' style='color:aqua;font-size:9pt'>aqua</option><option value='blue' style='color:blue;font-size:9pt'>blue</option><option value='navy' style='color:navy;font-size:9pt'>navy</option><option value='purple' style='color:purple;font-size:9pt'>purple</option><option value='fuchsia' style='color:fuchsia;font-size:9pt'>fuchsia</option><option value='pink' style='color:pink;font-size:9pt'>pink</option><option value='white' style='color:white;font-size:9pt'>white</option></select> ";
		if (document.location.href.indexOf("page=alliance") != -1)
			div.innerHTML += "<br />";
				div.innerHTML += "<a href='javascript:addBBCode(\"i\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAA3NCSVQICAjb4U/gAAAAY1BMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD39/fu7u7n5+fe3t7S0tLMzMzDw8O+vr61tbWvr6+kpKSZmZmQkJB6enpjY2NXV1dTU1M6OjooKCggICAREREAAACW3aPzAAAAIXRSTlMAESIzRGZ3iJmqu//////////////////////////////ewDs2AAAACXBIWXMAAAsSAAALEgHS3X78AAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjSeAAAAJdJREFUKJG10MsSgjAMBVDaIvJKX6FYlcL9/6+UcSPYbrmLLHJmkkyq6qo0aIr9Fhqlfo1hgChACsNYgtvbj1SAeuNIugDdTNAmh3skLNpnoDajtTacQWJy1rnpD2SKlIAXz2dowfbZ94j8OP1ErmS8XUBu8ozj4tWFwAv2OoXjLNFhT/etaI4g1B4plaqVPF8lfsk+cl0+nUwKek1swHwAAAAASUVORK5CYII=' alt='Italic' title='Italic' border='0' /></a>";
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
			GM_addStyle("select.dropdown{border:1px solid #141A1E;background-color:#274650;color:#848484}");
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
