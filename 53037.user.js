// ==UserScript==
// @name OGame: Message Editor
// @description This script add new functions for write messages (Language: Italian but compatible with all OGame)
// @version 0.3
// @date 07/15/09
// @creator pincopallino (A Special Thanks Black Cat)
// @include http://uni*.ogame.*/game/index.php?page=writemessages*
// @include http://uni*.ogame.*/game/index.php?page=allianzen*&a=17*
// ==/UserScript==


(function(BBCode){

	var script = document.createElement('script');
	script.setAttribute("type","text/javascript");
	script.setAttribute("language","javascript");
	script.text =
	'function addBBCode(tag,value) {' +
		'if (value=="0") return;' +
		'var message = document.getElementsByName("text")[0];' +
		'if (value=="") ' +
			'var str1 = "[" + tag + "]";' +
		'else ' +
			'var str1 = "[" + tag + "=" + value + "]";' +
		'var str2 = "[/" + tag + "]";' +
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
	var form = document.getElementsByTagName('form')[0];
	form.parentNode.insertBefore(script,form);
	var row1 = document.createElement("tr");
	var row2 = document.createElement("tr");
	var row3 = document.getElementById("content").getElementsByTagName("textarea")[0].parentNode.parentNode;
	var cell1 = row3.getElementsByTagName('th')[0];
	var cell2 = document.createElement("th");
	var cell3 = document.createElement("th");
	cell2.innerHTML += "<select onchange='addBBCode(\"font\",this.value)'><option value='0'>Font</option><option value='arial' style='font-family: arial;'>Arial</option><option value='comic sans ms'>Comic</option><option value='courier new'>Courier New</option><option value='tahoma'>Tahoma</option><option value='times new roman'style='font:times new roman'>Times New Roman</option><option value='verdana'>Verdana</option></select> ";
	cell2.innerHTML += "<select onchange='addBBCode(\"size\",this.value)'><option value='0'>Dimensione</option><option value='7'>Piccolissimo</option><option value='10'>Piccolo</option><option value='12'>Normale</option><option value='16'>Grande</option><option value='20'>Grandissimo</option></select> ";
	cell2.innerHTML += "<select onchange='addBBCode(\"color\",this.value)'><option value='0'>Colore</option><option value='blue' style='color:blue'>Blu</option><option value='red' style='color:red'>Rosso</option><option value='purple' style='color:purple'>Porpora</option><option value='orange' style='color:orange'>Arancione</option><option value='yellow' style='color:yellow'>Giallo</option><option value='gray' style='color:gray'>Grigio</option><option value='green' style='color:green'>Verde</option> ";
	cell3.innerHTML += "<img src='http://board.ogame.it/wcf/icon/wysiwyg/separatorM.png' border='0' /> <a href='javascript:addBBCode(\"b\",\"\")'><img src='http://board.ogame.it/wcf/icon/wysiwyg/fontStyleBoldM.png' alt='Grassetto' title='Grassetto' border='0' /></a><a href='javascript:addBBCode(\"i\",\"\")'><img src='http://board.ogame.it/wcf/icon/wysiwyg/fontStyleItalicM.png' alt='Corsivo' title='Corsivo' border='0' /></a><a href='javascript:addBBCode(\"u\",\"\")'><img src='http://board.ogame.it/wcf/icon/wysiwyg/fontStyleUnderlineM.png' alt='Sottolineato' title='Sottolineato' border='0' /></a><a href='javascript:addBBCode(\"s\",\"\")'><img src='http://board.ogame.it/wcf/icon/wysiwyg/fontStyleStriketroughM.png' alt='Sbarrato' title='Sbarrato' border='0' /></a> <img src='http://board.ogame.it/wcf/icon/wysiwyg/separatorM.png' border='0' /> ";
	cell3.innerHTML += "<a href='javascript:addBBCode(\"align\",\"\left\")'><img src='http://board.ogame.it/wcf/icon/wysiwyg/textAlignLeftM.png' alt='AllineaDestra' title='AllineaDestra' border='0' /></a><a href='javascript:addBBCode(\"align\",\"\center\")'><img src='http://board.ogame.it/wcf/icon/wysiwyg/textAlignCenterM.png' alt='AllineaCentro' title='AllineaCentro' border='0' /></a><a href='javascript:addBBCode(\"align\",\"right\")'><img src='http://board.ogame.it/wcf/icon/wysiwyg/textAlignRightM.png' alt='AllineaSinistra' title='AllineaSinistra' border='0' /></a><a href='javascript:addBBCode(\"align\",\"\justify\")'><img src='http://board.ogame.it/wcf/icon/wysiwyg/textJustifyM.png' alt='Giustifica' title='Giustifica' border='0' /></a> <img src='http://board.ogame.it/wcf/icon/wysiwyg/separatorM.png' border='0' /> ";
	cell3.innerHTML += "<a href='javascript:addBBCode(\"url\",\"\http://\")'><img src='http://board.ogame.it/wcf/icon/wysiwyg/linkInsertM.png' alt='AggiungiLink' title='AggiungiLink' border='0' /></a>";
	cell3.innerHTML += "<a href='javascript:addBBCode(\"img\",\"\")'><img src='http://board.ogame.it/wcf/icon/wysiwyg/insertImageM.png' alt='InserisciImmagine' title='InserisciImmagine' border='0' /></a>";
	cell3.innerHTML += "<a href='javascript:addBBCode(\"quote\",\"\")'><img src='http://board.ogame.it/wcf/icon/wysiwyg/quoteM.png' alt='Cita' title='Cita' border='0' /></a> <img src='http://board.ogame.it/wcf/icon/wysiwyg/separatorM.png' border='0' /> ";
	cell1.setAttribute("rowSpan","3");
	row1.appendChild(cell1);
	row1.appendChild(cell2);
	row2.appendChild(cell3);
	row3.parentNode.insertBefore(row1,row3);
	row3.parentNode.insertBefore(row2,row3);
})();


(function(Smile){

	var smilies = new Array();
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/smile.png[/img]","http://board.ogame.it/wcf/images/smilies/smile.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/sad.png[/img]","http://board.ogame.it/wcf/images/smilies/sad.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/wink.png[/img]","http://board.ogame.it/wcf/images/smilies/wink.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/tongue.png[/img]","http://board.ogame.it/wcf/images/smilies/tongue.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/cool.png[/img]","http://board.ogame.it/wcf/images/smilies/cool.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/biggrin.png[/img]","http://board.ogame.it/wcf/images/smilies/biggrin.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/crying.png[/img]","http://board.ogame.it/wcf/images/smilies/crying.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/rolleyes.png[/img]","http://board.ogame.it/wcf/images/smilies/rolleyes.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/huh.png[/img]","http://board.ogame.it/wcf/images/smilies/huh.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/unsure.png[/img]","http://board.ogame.it/wcf/images/smilies/unsure.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/love.png[/img]","http://board.ogame.it/wcf/images/smilies/love.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/angry.png[/img]","http://board.ogame.it/wcf/images/smilies/angry.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/blink.png[/img]","http://board.ogame.it/wcf/images/smilies/blink.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/confused.png[/img]","http://board.ogame.it/wcf/images/smilies/confused.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/cursing.png[/img]","http://board.ogame.it/wcf/images/smilies/cursing.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/mellow.png[/img]","http://board.ogame.it/wcf/images/smilies/mellow.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/thumbdown.png[/img]","http://board.ogame.it/wcf/images/smilies/thumbdown.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/thumbsup.png[/img]","http://board.ogame.it/wcf/images/smilies/thumbsup.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/thumbup.png[/img]","http://board.ogame.it/wcf/images/smilies/thumbup.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/w00t.png[/img]","http://board.ogame.it/wcf/images/smilies/w00t.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/pinch.png[/img]","http://board.ogame.it/wcf/images/smilies/pinch.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/sleeping.png[/img]","http://board.ogame.it/wcf/images/smilies/sleeping.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/wacko.png[/img]","http://board.ogame.it/wcf/images/smilies/wacko.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/whistling.png[/img]","http://board.ogame.it/wcf/images/smilies/whistling.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/evil.png[/img]","http://board.ogame.it/wcf/images/smilies/evil.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/squint.png[/img]","http://board.ogame.it/wcf/images/smilies/squint.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/question.png[/img]","http://board.ogame.it/wcf/images/smilies/question.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/attention.png[/img]","http://board.ogame.it/wcf/images/smilies/attention.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/beer.gif[/img]","http://board.ogame.it/wcf/images/smilies/beer.gif"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/dash.gif[/img]","http://board.ogame.it/wcf/images/smilies/dash.gif"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/evilgrin.png[/img]","http://board.ogame.it/wcf/images/smilies/evilgrin.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/gamer.gif[/img]","http://board.ogame.it/wcf/images/smilies/gamer.gif"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/grumble.gif[/img]","http://board.ogame.it/wcf/images/smilies/grumble.gif"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/hail.gif[/img]","http://board.ogame.it/wcf/images/smilies/hail.gif"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/ill.png[/img]","http://board.ogame.it/wcf/images/smilies/ill.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/pillepalle.gif[/img]","http://board.ogame.it/wcf/images/smilies/pillepalle.gif"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/pump.gif[/img]","http://board.ogame.it/wcf/images/smilies/pump.gif"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/blackeye.png[/img]","http://board.ogame.it/wcf/images/smilies/blackeye.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/censored.png[/img]","http://board.ogame.it/wcf/images/smilies/censored.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/dead.png[/img]","http://board.ogame.it/wcf/images/smilies/dead.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/minigun.gif[/img]","http://board.ogame.it/wcf/images/smilies/minigun.gif"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/missilelauncher.gif[/img]","http://board.ogame.it/wcf/images/smilies/missilelauncher.gif"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/ninja.png[/img]","http://board.ogame.it/wcf/images/smilies/ninja.png"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/rocketlauncher.gif[/img]","http://board.ogame.it/wcf/images/smilies/rocketlauncher.gif"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/sniper.gif[/img]","http://board.ogame.it/wcf/images/smilies/sniper.gif"));
	smilies.push(new Array("[img]http://board.ogame.it/wcf/images/smilies/stick.gif[/img]","http://board.ogame.it/wcf/images/smilies/stick.gif"));


	if (document.location.href.indexOf('=messages') != -1) {
		function sort_smilies(a,b) { return b[0].length-a[0].length; }
		smilies.sort(sort_smilies);
		var rows = document.getElementById("content").getElementsByTagName("table")[1].getElementsByTagName("tbody")[0].childNodes;
		for (var i = 0; i < smilies.length; i++) {
			var smiley = smilies[i][0];
			smiley = smiley.replace(/\\/g,"\\\\");
			smiley = smiley.replace(/\[/g,"\\\[").replace(/\]/g,"\\\]");
			smiley = smiley.replace(/\(/g,"\\\(").replace(/\)/g,"\\\)");
			smiley = smiley.replace(/\{/g,"\\\{").replace(/\}/g,"\\\}");
			smiley = smiley.replace(/\./g,"\\\.").replace(/\+/g,"\\\+").replace(/\*/g,"\\\*").replace(/\?/g,"\\\?");
			smiley = smiley.replace(/\^/g,"\\\^").replace(/\$/g,"\\\$").replace(/\|/g,"\\\|").replace(/\-/g,"\\\-");
			var expression = new RegExp("(^|[^\"'=])"+smiley+"([^\"']|$)","gi");
			for (var j = 0; j < rows.length; j++) {
				var row = rows.item(j);
				if (row.nodeName.toLowerCase() == "tr") {
					var cell = row.getElementsByTagName("td")[1];
					if (cell && row.getElementsByTagName("table").length==0) { // Replace twice
						cell.innerHTML = cell.innerHTML.replace(expression,"$1<img src='"+smilies[i][1]+"' alt='"+smilies[i][0]+"' border='0' />$2");
						cell.innerHTML = cell.innerHTML.replace(expression,"$1<img src='"+smilies[i][1]+"' alt='"+smilies[i][0]+"' border='0' />$2");
					}
				}
			}
		}
	} else {
		var script = document.createElement('script');
		script.setAttribute("type","text/javascript");
		script.setAttribute("language","javascript");
		script.text =
		'function addSmiley(smiley) {' +
			'var message = document.getElementsByName("text")[0];' +
			'var str = " " + smiley;' +
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
		var form = document.getElementsByTagName('form')[0];
		form.parentNode.insertBefore(script,form);
		var cell = document.getElementById("cntChars").parentNode;
		var div = document.createElement("div");
		for (var i = 0; i < smilies.length; i++) {
			div.innerHTML += "<a href=\"javascript:addSmiley('"+smilies[i][0]+"')\"><img src='"+smilies[i][1]+"' alt='"+smilies[i][0]+"' border='0' /></a> ";
		}
		cell.style.width = "150px";
		div.setAttribute("align","center");
		div.style.width = "100%";
		div.style.height = "200px";
		div.style.overflow = "auto";
		cell.appendChild(document.createElement("br"));
		cell.appendChild(document.createElement("br"));
		cell.appendChild(div);
	}
})();