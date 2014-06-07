// ==UserScript==
// @name           Travian Message Help BBCODE
// @namespace      http://userscripts.org/users/60390
// @description    Agrega un menu en los mensajes para usar el codigo. The Script adds a menu in the messages to use the color Code.
// @include        http://*.travian.*/allianz.php*
// @include        http://*.travian.*/nachrichten.php*
// ==/UserScript==


(function(){

	var script = document.createElement('script');
	script.setAttribute("type","text/javascript");
	script.setAttribute("language","javascript");
	script.text = 
	'function addBBCode(tag,value) {' +
		'if (value=="0") return;' +
		'var message = document.getElementsByName("message")[0];' +
		'if (value=="") ' +
			'var str1 = "{" + tag + "}";' +
		'else ' +
			'var str1 = "{" + tag + "=" + value + "}";' +
		'var str2 = "{/" + tag + "}";' +
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
	var form = document.getElementsByTagName("form")[1];
	form.parentNode.insertBefore(script, form);
	var igm = document.getElementById("igm");
	var logo = document.createElement("tr");
	var logo1 = document.createElement("tr");
	logo.innerHTML += "<select onchange='addBBCode(\"font\",this.value)'><option value='0'>FONT</option><option value='arial'>Arial</option><option value='comic sans ms'>Comic</option><option value='courier new'>Courier New</option><option value='tahoma'>Tahoma</option><option value='times new roman'>Times New Roman</option><option value='verdana'>Verdana</option></select> ";
	logo.innerHTML += "<select onchange='addBBCode(\"size\",this.value)'><option value='0'>SIZE</option><option value='7'>tiny</option><option value='10'>small</option><option value='12'>normal</option><option value='16'>big</option><option value='20'>huge</option></select> ";
	logo.innerHTML += "<select onchange='addBBCode(\"color\",this.value)'><option value='0'>COLOR</option><option value='black' style='color:black'>black</option><option value='silver' style='color:silver'>silver</option><option value='gray' style='color:gray'>gray</option><option value='maroon' style='color:maroon'>maroon</option><option value='#A52A2A' style='color:brown'>brown</option><option value='red' style='color:red'>red</option><option value='orange' style='color:orange'>orange</option><option value='yellow' style='color:yellow'>yellow</option><option value='lime' style='color:lime'>lime</option><option value='green' style='color:green'>green</option><option value='olive' style='color:olive'>olive</option><option value='teal' style='color:teal'>teal</option><option value='aqua' style='color:aqua'>aqua</option><option value='blue' style='color:blue'>blue</option><option value='navy' style='color:navy'>navy</option><option value='purple' style='color:purple'>purple</option><option value='fuchsia' style='color:fuchsia'>fuchsia</option><option value='#FFC0CB' style='color:pink'>pink</option><option value='white' style='color:white'>white</option></select> ";
	logo1.innerHTML += "<a href='javascript:addBBCode(\"b\",\"\")'><img src='http://board.ogame.org/en_images_ogame/bbcode_bold.gif' alt='Bold Text' title='Bold Text' border='0' /></a><a href='javascript:addBBCode(\"i\",\"\")'><img src='http://board.ogame.org/en_images_ogame/bbcode_italic.gif' alt='Italic Text' title='Italic Text' border='0' /></a><a href='javascript:addBBCode(\"u\",\"\")'><img src='http://board.ogame.org/en_images_ogame/bbcode_underline.gif' alt='Underlined Text' title='Underlined Text' border='0' /></a> ";
	logo1.innerHTML += "<a href='javascript:addBBCode(\"center\",\"\")'><img src='http://board.ogame.org/en_images_ogame/bbcode_center.gif' alt='Center Text' title='Center Text' border='0' /></a> ";
	logo1.innerHTML += "<a href='javascript:addBBCode(\"url\",\"\")'><img src='http://board.ogame.org/en_images_ogame/bbcode_url.gif' alt='Add Link' title='Add Link' border='0' /></a>";
	logo1.innerHTML += "<a href='javascript:addBBCode(\"img\",\"\")'><img src='http://board.ogame.org/en_images_ogame/bbcode_image.gif' alt='Insert Image' title='Insert Image' border='0' /></a>";
	igm.parentNode.insertBefore(logo, igm);
	igm.parentNode.insertBefore(logo1, igm);
})();


