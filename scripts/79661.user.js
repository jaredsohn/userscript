// ==UserScript==
// @name OGame Redesign: Message Editor
// @description This script add new functions for write messages
// @version 0.3
// @date 06/22/2010 (mm/dd/yy)
// @creator pincopallino (A Special Thanks Black Cat and vpascoal)
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
  
  var script = document.createElement("script");
	script.setAttribute("type","text/javascript");
	script.setAttribute("language","javascript");
	script.text = 
	'function addImm() {' +
	'var tag = arguments[0];' +
		'var message = document.getElementsByName("text")[0];' +
		'message.focus();' +
		'if (message.isTextEdit) {' +
			'var sel = document.selection;' +
			'var rng = sel.createRange();' +
			'var seltext = rng.text;' +
			'rng.text = tag + seltext;' +
			'rng.collapse(false);' +
			'rng.move("character",-str2.length);' +
			'rng.moveStart("character",-seltext.length);' +
			'rng.select();' +
		'} else {' +
			'var start = message.selectionStart;' +
			'var starttext = message.value.substring(0,start);' +
			'var seltext = message.value.substring(start,message.selectionEnd);' +
			'var endtext = message.value.substring(message.selectionEnd,message.textLength);' +
			'message.value = starttext + tag + seltext + endtext;' +
			'message.selectionStart = start + tag.length;' +
			'message.selectionEnd = start + tag.length + seltext.length;' +
		'}' +
		'message.focus();' +
	'}';

	document.body.appendChild(script);
	

	function funcBBCode() {
		var form = document.getElementsByTagName("form")[0];
		if (!form) return;
		var ta = document.getElementsByName("text")[0];
		var div = document.createElement("div");
		div.innerHTML += "<select class='dropdown' onchange='addBBCode(\"font\",this.value)'><option value='0'>Font</option><option value='arial'>Arial</option><option value='comic sans ms'>Comic</option><option value='courier new'>Courier New</option><option value='tahoma'>Tahoma</option><option value='times new roman'>Times New Roman</option><option value='verdana'>Verdana</option></select> ";
		div.innerHTML += "<select class='dropdown' onchange='addBBCode(\"size\",this.value)'><option value='0'>Size</option><option value='7'>Tiny</option><option value='10'>Small</option><option value='12'>Normal</option><option value='16'>Big</option><option value='20'>Huge</option></select> ";
		div.innerHTML += "<select class='dropdown' onchange='addBBCode(\"color\",this.value)'><option value='0'>Color </option><option value='black' style='color:black'>Black</option><option value='silver' style='color:silver'>Silver</option><option value='gray' style='color:gray'>Gray</option><option value='maroon' style='color:maroon'>Maroon</option><option value='brown' style='color:brown'>Brown</option><option value='red' style='color:red'>Red</option><option value='orange' style='color:orange'>Orange</option><option value='yellow' style='color:yellow'>Yellow</option><option value='lime' style='color:lime'>Lime</option><option value='green' style='color:green'>Green</option><option value='olive' style='color:olive'>Olive</option><option value='teal' style='color:teal'>Teal</option><option value='aqua' style='color:aqua'>Aqua</option><option value='blue' style='color:blue'>Blue</option><option value='navy' style='color:navy'>Navy</option><option value='purple' style='color:purple'>Purple</option><option value='fuchsia' style='color:fuchsia'>Fuchsia</option><option value='pink' style='color:pink'>Pink</option><option value='white' style='color:white'>White</option></select> ";
	//	if (document.location.href.indexOf("page=alliance") != -1)
		div.innerHTML += "<br />";
		div.innerHTML += "<br />";
		div.innerHTML += "<img src='http://board.ogame.it/wcf/icon/wysiwyg/separatorM.png' border='0' /> <a href='javascript:addBBCode(\"b\")'><img src='http://board.ogame.it/wcf/icon/wysiwyg/fontStyleBoldM.png' alt='Bold' title='Bold' border='0' /></a> ";
		div.innerHTML += "<a href='javascript:addBBCode(\"i\")'><img src='http://board.ogame.it/wcf/icon/wysiwyg/fontStyleItalicM.png' alt='Italic' title='Italic' border='0' /></a> ";
		div.innerHTML += "<a href='javascript:addBBCode(\"u\")'><img src='http://board.ogame.it/wcf/icon/wysiwyg/fontStyleUnderlineM.png' alt='Underline' title='Underline' border='0' /></a> ";
		div.innerHTML += "<a href='javascript:addBBCode(\"s\")'><img src='http://board.ogame.it/wcf/icon/wysiwyg/fontStyleStriketroughM.png' alt='Strike through' title='Strike through' border='0' /></a> <img src='http://board.ogame.it/wcf/icon/wysiwyg/separatorM.png' border='0' />";
		div.innerHTML += "<a href='javascript:addBBCode(\"align\",\"\left\")'><img src='http://board.ogame.it/wcf/icon/wysiwyg/textAlignLeftM.png' alt='Align Left' title='Align Left' border='0' /></a> <a href='javascript:addBBCode(\"align\",\"\center\")'> <img src='http://board.ogame.it/wcf/icon/wysiwyg/textAlignCenterM.png' alt='Align Center' title='Align Center' border='0' /></a> <a href='javascript:addBBCode(\"align\",\"right\")'><img src='http://board.ogame.it/wcf/icon/wysiwyg/textAlignRightM.png' alt='Align Right' title='Align Right' border='0' /></a> <a href='javascript:addBBCode(\"align\",\"\justify\")'><img src='http://board.ogame.it/wcf/icon/wysiwyg/textJustifyM.png' alt='Justify' title='Justify' border='0' /></a> <img src='http://board.ogame.it/wcf/icon/wysiwyg/separatorM.png' border='0' /> ";
		div.innerHTML += "<a href='javascript:addBBCode(\"list\")'><img src='http://board.ogame.it/wcf/icon/wysiwyg/listStyleUnorderedM.png' alt='List' title='List' border='0' /></a> ";
		div.innerHTML += "<a href='javascript:addBBCode(\"url\",\"\http://\")'><img src='http://board.ogame.it/wcf/icon/wysiwyg/linkInsertM.png' alt='Add Link' title='Add Link' border='0' /> ";
		div.innerHTML += "<a href='javascript:addImm(\"<img src=http://>\")'<img src='http://board.ogame.it/wcf/icon/wysiwyg/insertImageM.png' alt='Add Image' title='Add Image' border='0' /></a> <img src='http://board.ogame.it/wcf/icon/wysiwyg/separatorM.png' border='0' />";
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
  if (document.location.href.indexOf("page=messages&session") != -1) {
				var messageBox = document.getElementById("messagebox");
				messageBox.style.height = "6000px";
				ta.style.height = "70px";
			}
  if (document.location.href.indexOf("page=overview&session") != -1) {
				var messageBox = document.getElementById("messagebox");
				messageBox.height = "500px";
			}     
  
})();


(function(){

	var smilies = new Array();
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/smile.png>","http://board.ogame.it/wcf/images/smilies/smile.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/sad.png>","http://board.ogame.it/wcf/images/smilies/sad.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/wink.png>","http://board.ogame.it/wcf/images/smilies/wink.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/tongue.png>","http://board.ogame.it/wcf/images/smilies/tongue.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/cool.png>","http://board.ogame.it/wcf/images/smilies/cool.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/biggrin.png>","http://board.ogame.it/wcf/images/smilies/biggrin.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/crying.png>","http://board.ogame.it/wcf/images/smilies/crying.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/rolleyes.png>","http://board.ogame.it/wcf/images/smilies/rolleyes.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/huh.png>","http://board.ogame.it/wcf/images/smilies/huh.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/unsure.png>","http://board.ogame.it/wcf/images/smilies/unsure.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/love.png>","http://board.ogame.it/wcf/images/smilies/love.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/angry.png>","http://board.ogame.it/wcf/images/smilies/angry.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/blink.png>","http://board.ogame.it/wcf/images/smilies/blink.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/confused.png>","http://board.ogame.it/wcf/images/smilies/confused.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/cursing.png>","http://board.ogame.it/wcf/images/smilies/cursing.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/mellow.png>","http://board.ogame.it/wcf/images/smilies/mellow.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/thumbdown.png>","http://board.ogame.it/wcf/images/smilies/thumbdown.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/thumbsup.png>","http://board.ogame.it/wcf/images/smilies/thumbsup.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/thumbup.png>","http://board.ogame.it/wcf/images/smilies/thumbup.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/w00t.png>","http://board.ogame.it/wcf/images/smilies/w00t.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/pinch.png>","http://board.ogame.it/wcf/images/smilies/pinch.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/sleeping.png>","http://board.ogame.it/wcf/images/smilies/sleeping.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/wacko.png>","http://board.ogame.it/wcf/images/smilies/wacko.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/whistling.png>","http://board.ogame.it/wcf/images/smilies/whistling.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/evil.png>","http://board.ogame.it/wcf/images/smilies/evil.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/squint.png>","http://board.ogame.it/wcf/images/smilies/squint.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/question.png>","http://board.ogame.it/wcf/images/smilies/question.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/attention.png>","http://board.ogame.it/wcf/images/smilies/attention.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/beer.gif>","http://board.ogame.it/wcf/images/smilies/beer.gif"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/dash.gif>","http://board.ogame.it/wcf/images/smilies/dash.gif"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/evilgrin.png>","http://board.ogame.it/wcf/images/smilies/evilgrin.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/gamer.gif>","http://board.ogame.it/wcf/images/smilies/gamer.gif"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/grumble.gif>","http://board.ogame.it/wcf/images/smilies/grumble.gif"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/hail.gif>","http://board.ogame.it/wcf/images/smilies/hail.gif"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/ill.png>","http://board.ogame.it/wcf/images/smilies/ill.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/pillepalle.gif>","http://board.ogame.it/wcf/images/smilies/pillepalle.gif"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/pump.gif>","http://board.ogame.it/wcf/images/smilies/pump.gif"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/blackeye.png>","http://board.ogame.it/wcf/images/smilies/blackeye.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/censored.png>","http://board.ogame.it/wcf/images/smilies/censored.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/dead.png>","http://board.ogame.it/wcf/images/smilies/dead.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/minigun.gif>","http://board.ogame.it/wcf/images/smilies/minigun.gif"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/missilelauncher.gif>","http://board.ogame.it/wcf/images/smilies/missilelauncher.gif"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/ninja.png>","http://board.ogame.it/wcf/images/smilies/ninja.png"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/rocketlauncher.gif>","http://board.ogame.it/wcf/images/smilies/rocketlauncher.gif"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/sniper.gif>","http://board.ogame.it/wcf/images/smilies/sniper.gif"));
	smilies.push(new Array("<img src=http://board.ogame.it/wcf/images/smilies/stick.gif>","http://board.ogame.it/wcf/images/smilies/stick.gif"));
	
	var script = document.createElement("script");
	script.setAttribute("type","text/javascript");
	script.setAttribute("language","javascript");
	script.text = 
	'function addSmiley(smiley) {' +
		'var message = document.getElementsByName("text")[0];' +
		'var str = "" + smiley;' +
		'message.focus();' +
		'if (message.isTextEdit) {' +
			'var sel = document.selection;' +
			'var rng = sel.createRange();' +
			'rng.text = str;' +
			'rng.collapse(false);' +
			'rng.select();' +
		'} else {' +
			'var start = message.selectionStart;' +
			'var starttext = message.value.substring(0,start);' +
			'var endtext = message.value.substring(message.selectionEnd,message.textLength);' +
			'message.value = starttext + str + endtext;' +
			'start += str.length;' +
			'message.selectionStart = start;' +
			'message.selectionEnd = start;' +
		'}' +
		'message.focus();' +
	'}';
	document.body.appendChild(script);

	function funcSmilies() {
		var form = document.getElementsByTagName("form")[0];
		if (!form) return;
		var div = document.createElement("div");
		for (var i = 0; i < smilies.length; i++) {
			div.innerHTML += "<a href=\"javascript:addSmiley('"+smilies[i][0].replace(/'/g,"\\'")+"')\"><img src=\""+smilies[i][1]+"\" alt=\""+smilies[i][0]+"\" border='0' /></a> ";
		}
		div.style.textAlign = "center";
		div.style.height = "220px";
		div.style.overflow = "auto";
				
		var cell = document.getElementsByName("text")[0].parentNode;
		do {
			cell = cell.previousSibling;
		}while(cell && cell.nodeType != 1);
		if (cell) {
			div.style.width = "99%";
			cell.appendChild(document.createElement("br"));
			cell.appendChild(document.createElement("br"));
			cell.appendChild(div);
		} else {
			var message = document.getElementsByName("text")[0];
			var message_div = message.parentNode;
			var parentDiv = message_div;
			do {
				parentDiv = parentDiv.parentNode;
			}while(parentDiv && parentDiv.nodeName.toLowerCase() != "div");
			parentDiv.style.position = "relative";
			div.style.position = "absolute";
			div.style.width = "175px";
			div.style.marginLeft = "8px";
			if (parentDiv.className == "textWrapperSmall") {
				div.style.top = "5px";
			} else {
				div.style.top = "0%";
				div.style.marginTop = "80px";
			}
			message.style.width = "540px";
			message_div.style.width = "550px";
			message_div.style.marginLeft = "170px";
			message_div.parentNode.insertBefore(div, message_div);
		}
	}
  
	if (document.location.href.indexOf("page=alliance") != -1) {
		 
    var $;
		try { $ = unsafeWindow.$; }
		catch(e) { $ = window.$; }
		$("#eins").ajaxSuccess(function(e,xhr,settings){
			if (settings.url.indexOf("page=allianceBroadcast") == -1) return;

			funcSmilies();
		});
	} else {
		funcSmilies();
	}

	if (document.location.href.indexOf("page=showmessage") != -1) {
		function rep_smilies(value,index) {
			var text = value;
			for (var i = index; i < smilies.length; i++) {
				var smiley = smilies[i][0];
				smiley = smiley.replace(/([\\\[\](){}.+*?^$|-])/g,"\\$1");
				var expression = new RegExp(smiley,"i");
				var pos = value.search(expression);
				if (pos != -1) {
					var part1 = value.substring(0,pos);
					var part2 = value.substring(pos+smilies[i][0].length,value.length);
					text = rep_smilies(part1,i) + "<img src=\""+smilies[i][1]+"\" alt=\""+smilies[i][0]+"\" border='0' />" + rep_smilies(part2,i);
					break;
				}
			}
			return text;
		}

		function sort_smilies(a,b) { return b[0].length-a[0].length; }
		smilies.sort(sort_smilies);
		var divs = document.getElementById("messagebox").getElementsByTagName("div");
		var message;
		var i = 0;
		do {
			message = divs[i];
			i++;
		}while(message.className != "note");
		message.innerHTML = rep_smilies(message.innerHTML,0);
	}
})();
