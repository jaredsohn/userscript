// ==UserScript==
// @name OGame : BBCode
// @namespace http://userscripts.org/users/36331
// @description OGame : BBCode in messages
// @version        0.1
// @date 2008-07-05
// @creator Black Cat
// @include http://uni*.ogame.*/game/index.php?page=writemessages*
// @include http://uni*.ogame.*/game/index.php?page=allianzen*&a=17*
// @exclude
// ==/UserScript==

(function(){

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
	cell2.innerHTML += "<select onchange='addBBCode(\"letra\",this.value)'><option value='0'>Fuente</option><option value='arial'>Arial</option><option value='comic sans ms'>Comic</option><option value='courier new'>Courier New</option><option value='tahoma'>Tahoma</option><option value='times new roman'>Times New Roman</option><option value='verdana'>Verdana</option></select> ";
	cell2.innerHTML += "<select onchange='addBBCode(\"tamaÃƒÆ’Ã‚Â±o\",this.value)'><option value='0'>Tamaño</option><option value='7'>Muy pequeña</option><option value='10'>Pequeña</option><option value='12'>Normal</option><option value='16'>Grande</option><option value='20'>Enorme</option></select> ";
	cell2.innerHTML += "<select onchange='addBBCode(\"color\",this.value)'><option value='0'>Color</option><option value='black' style='color:black'>Negro</option><option value='silver' style='color:silver'>Plateado</option><option value='gray' style='color:gray'>Gris</option><option value='maroon' style='color:maroon'>Granate</option><option value='#A52A2A' style='color:brown'>Marrón</option><option value='red' style='color:red'>Rojo</option><option value='orange' style='color:orange'>Naranja</option><option value='yellow' style='color:yellow'>Amarillo</option><option value='lime' style='color:lime'>Lima</option><option value='green' style='color:green'>Verde</option><option value='olive' style='color:olive'>Olivo</option><option value='teal' style='color:teal'>Teal</option><option value='aqua' style='color:aqua'>Cian</option><option value='blue' style='color:blue'>Azul</option><option value='navy' style='color:navy'>Turquí</option><option value='purple' style='color:purple'>Morado</option><option value='fuchsia' style='color:fuchsia'>Fucsia</option><option value='#FFC0CB' style='color:pink'>Rosado</option><option value='white' style='color:white'>Blanco</option></select> ";
	cell3.innerHTML += "<a href='javascript:addBBCode(\"b\",\"\")'><img src='http://board.ogame.org/en_images_ogame/bbcode_bold.gif' alt='Negrita' title='Negrita' border='0' /></a><a href='javascript:addBBCode(\"i\",\"\")'><img src='http://board.ogame.org/en_images_ogame/bbcode_italic.gif' alt='Cursiva' title='Cursiva' border='0' /></a><a href='javascript:addBBCode(\"u\",\"\")'><img src='http://board.ogame.org/en_images_ogame/bbcode_underline.gif' alt='Subrayado' title='Subrayado' border='0' /></a> ";
	cell3.innerHTML += "<a href='javascript:addBBCode(\"center\",\"\")'><img src='http://board.ogame.org/en_images_ogame/bbcode_center.gif' alt='Centrado' title='Centrado' border='0' /></a> ";
	cell3.innerHTML += "<a href='javascript:addBBCode(\"url\",\"\")'><img src='http://board.ogame.org/en_images_ogame/bbcode_url.gif' alt='Añadir enlace' title='Añadir enlace' border='0' /></a>";
	if (document.location.href.indexOf('page=allianzen') != -1)
		cell3.innerHTML += "<a href='javascript:addBBCode(\"img\",\"\")'><img src='http://board.ogame.org/en_images_ogame/bbcode_image.gif' alt='Añadir imagen' title='Añadir imagen' border='0' /></a>";
	cell1.setAttribute("rowSpan","3");
	row1.appendChild(cell1);
	row1.appendChild(cell2);
	row2.appendChild(cell3);
	row3.parentNode.insertBefore(row1,row3);
	row3.parentNode.insertBefore(row2,row3);
})();