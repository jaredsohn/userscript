// ==UserScript==
// @name           The West Notizen
// @namespace      The West Notizen
// @description    The West Notizen
// @include        http://ru*.the-west.ru*
// ==/UserScript==
//
// Copyright 09 by Tonda

var notiz_a = document.createElement('a');
notiz_a.href = "javascript:show_notiz();"
notiz_a.innerHTML = '<img id="footer_notiz" alt="" src="http://thewestonline.de/scripte/notizen/button.gif" onmouseover="show_tt();" onmouseout="hide_tt();" />';
document.getElementById('footer_menu_right').insertBefore(notiz_a, document.getElementById('footer_menu_right').firstChild);


if (document.cookie.indexOf("notiz")==-1) 
{
	var ablauf = new Date();
	ablauf.setTime(ablauf.getTime() + (10 * 365 * 24 * 60 * 60 * 1000));
	document.cookie = "notiz=Hallo, Dein Text hier =); expires=" + ablauf.toGMTString();
}


function show_notiz() {
	if (!document.getElementById('window_notiz'))
	{
		var cookie  = document.cookie+";";
		var muster  = /notiz=.*?;/gi;
		var treffer = cookie.match(muster);
		
		var notiz = treffer[0].substring(6, treffer[0].length-1);
		
		var notiz1 = notiz.replace(/\[\[absatz\]\]/g, "\n");
		notiz1 = notiz1.replace(/\[\[semikolon\]\]/g, ";");
		
		var inhalt = "";
		inhalt += "<center><b>Notizen bearbeiten:</b></center>";
		inhalt = '<img id="bb-b" src="images/transparent.png" class="profile_bb_code_image" style="margin-left: 10px;" onclick="insert_bbcode_notiz(\'[b]\', \'[/b]\')"/>';
		inhalt += '<img id="bb-i" src="images/transparent.png" class="profile_bb_code_image" style="background-position: -20px 50%;" onclick="insert_bbcode_notiz(\'[i]\', \'[/i]\')"/>';
		inhalt += '<img id="bb-u" src="images/transparent.png" class="profile_bb_code_image" style="background-position: -40px 50%;" onclick="insert_bbcode_notiz(\'[u]\', \'[/u]\')"/>';
		inhalt += '<img id="bb-del" src="images/transparent.png" class="profile_bb_code_image" style="background-position: -60px 50%;" onclick="insert_bbcode_notiz(\'[del]\', \'[/del]\')"/>';
		inhalt += '<img id="bb-url" src="images/transparent.png" class="profile_bb_code_image" style="background-position: -160px 50%;" onclick="insert_bbcode_notiz(\'[url]\', \'[/url]\')"/>';
		inhalt += "<textarea id='notiz_text' style='width: 685px; height: 300px; background-image: url(../images/muster.jpg); border: 1px solid #000000;' onkeyup='uebrig();'>"+notiz1+"</textarea><br>";
		inhalt += "<center><a href='javascript:notiz_save()'><img alt='' src='img.php?type=button&amp;subtype=normal&amp;value=send' id='notiz_save'/></a></center>";
		inhalt += "<div id='uebrig' style='position: absolute; top: 353px; right: 30px;'>Zeichen &uuml;brig: "+(3995-notiz1.length)+"</div>";
		
		var content = "<div id='note_edit' style='display: none'><table class='shadow_table'>";
		content += "<tr><td class='edge_shadow_top_left'></td><td class='border_shadow_top'></td><td class='edge_shadow_top_right'></td></tr>";
		content += "<tr><td class='border_shadow_left'></td><td class='shadow_content' id='window_notiz_inhalt'>"+inhalt+"</td><td class='border_shadow_right'></td></tr>";
		content += "<tr><td class='edge_shadow_bottom_left'></td><td class='border_shadow_bottom'></td><td class='edge_shadow_bottom_right'></td></tr>";
		content += "</table></div>";
		
		var notiz2 = notiz.replace(/\[\[absatz\]\]/g, "<br>");
		notiz2 = notiz2.replace(/\[\[semikolon\]\]/g, ";");
		
		notiz2 = bb_code(notiz2);
		
		var inhalt2 = "";
		inhalt2 += "<center><b>Notizen:</b></center>";
		inhalt2 += "<div id='note_show2' style='width: 685px; height: 300px; background-image: url(../images/bgdark.png); border: 1px solid #000000; margin-top: 1px; margin-bottom: 1px; overflow: auto;'>"+notiz2+"</div>";
		inhalt2 += "<center><a href='javascript:notiz_edit()'><img alt='' src='img.php?type=button&amp;subtype=normal&amp;value=edit' id='notiz_save'/></a></center>";
		
		var content2 = "<div id='note_show'><table class='shadow_table'>";
		content2 += "<tr><td class='edge_shadow_top_left'></td><td class='border_shadow_top'></td><td class='edge_shadow_top_right'></td></tr>";
		content2 += "<tr><td class='border_shadow_left'></td><td class='shadow_content' id='window_notiz_inhalt'>"+inhalt2+"</td><td class='border_shadow_right'></td></tr>";
		content2 += "<tr><td class='edge_shadow_bottom_left'></td><td class='border_shadow_bottom'></td><td class='edge_shadow_bottom_right'></td></tr>";
		content2 += "</table></div>";
		
		var notiz_fenster = document.createElement('div');
		
		var notiz_id = document.createAttribute('id');
		notiz_id.nodeValue = "window_notiz";
		notiz_fenster.setAttributeNode(notiz_id);
		
		var notiz_class = document.createAttribute('class');
		notiz_class.nodeValue = "window";
		notiz_fenster.setAttributeNode(notiz_class);
		
		var notiz_style = document.createAttribute('style');
		notiz_style.nodeValue = "z-index: "+max_z()+"; left: "+Math.round((document.body.clientWidth-731)/2)+"px; top: 133px; position: absolute;";
		notiz_fenster.setAttributeNode(notiz_style);
		
		notiz_fenster.innerHTML = '<div class="window_borders"><h2 style="background-image: url(http://thewestonline.de/scripte/notizen/notiz2.gif);" class="window_title" id="window_notiz_title" onmousedown=\'dragstart(this.parentNode.parentNode)\' ondblclick=\'set_position();\'><span>notizen</span></h2><a class="window_closeall" href="javascript:AjaxWindow.closeAll(); hide_notiz();"></a><a class="window_minimize" href="javascript:AjaxWindow.toggleSize(\'notiz\', \'notiz\'); minimize();"></a><a class="window_close" href="javascript:hide_notiz();"></a><div class="window_content" id="window_notiz_content">'+content+content2+'</div></div>';
		
		document.getElementById('windows').appendChild(notiz_fenster);
	}
}


function hide_notiz() {
	if (!document.getElementById('window_notiz')) return;
	
	document.getElementById('windows').removeChild(document.getElementById('window_notiz'));
	
	if (document.getElementById('window_bar_notiz'))
	{
		document.getElementById('window_bar_notiz').parentNode.removeChild(document.getElementById('window_bar_notiz'));
	}
}


function notiz_save() {
	var notiz = document.getElementById('notiz_text').value;
	
	notiz = notiz.replace(/\n/g, "[[absatz]]");
	notiz = notiz.replace(/;/g, "[[semikolon]]");
	
	var ablauf = new Date();
	ablauf.setTime(ablauf.getTime() + (365 * 24 * 60 * 60 * 1000));
	document.cookie = "notiz="+notiz+"; expires=" + ablauf.toGMTString();
	
	notiz = notiz.replace(/\[\[absatz\]\]/g, "<br>");
	notiz = notiz.replace(/\[\[semikolon\]\]/g, ";");
	
	notiz = bb_code(notiz);
	
	
	document.getElementById('note_show2').innerHTML = notiz;
	
	document.getElementById('note_edit').style.display = "none";
	document.getElementById('note_show').style.display = "block";
}


function notiz_edit() {
	document.getElementById('note_edit').style.display = "block";
	document.getElementById('note_show').style.display = "none";
}


function minimize() {
	document.getElementById('window_bar_notiz').style.backgroundImage = "url(http://thewestonline.de/scripte/notizen/minimize.gif)";
	document.getElementById('window_bar_notiz').firstChild.nextSibling.href = 'javascript:hide_notiz();';
}


function bb_code(text) {
	text = text.replace(/\[b\](.*?)\[\/b\]/g, "<b>$1</b>");
	text = text.replace(/\[u\](.*?)\[\/u\]/g, "<u>$1</u>");
	text = text.replace(/\[i\](.*?)\[\/i\]/g, "<i>$1</i>");
	text = text.replace(/\[del\](.*?)\[\/del\]/g, "<del>$1</del>");
	text = text.replace(/\[url\]((?:http:\/\/)?(.*?))\[\/url\]/g, "<a href='http://$2'>$1</a>");
	text = text.replace(/\[url=(?:http:\/\/)?(.*?)\](.*?)\[\/url\]/g, "<a href='http://$1'>$2</a>");
	
	return text
}


function max_z() {
	var fenster = document.getElementById('windows').childNodes;
	var max_z_index = 101;
	
	for (var i = 0; i < fenster.length; i++)
	{
		if (fenster[i].style.zIndex >= max_z_index)
		{
			max_z_index = (1*fenster[i].style.zIndex) + 1;
		}
	}
	
	return max_z_index;
}


function uebrig() {
	if (3995-document.getElementById('notiz_text').value.length<0)
	{
		document.getElementById('notiz_text').value = document.getElementById('notiz_text').value.substring(0, 3995);
	}
	
	document.getElementById('uebrig').innerHTML = "Zeichen &uuml;brig: " + (3995-document.getElementById('notiz_text').value.length);
}


var dragobjekt = null;
var dragx = 0;
var dragy = 0;
var posx = 0;
var posy = 0;
document.onmousemove = drag;
document.onmouseup = dragstop;
function dragstart(element) {
	document.getElementById('window_notiz').style.zIndex = max_z();
	dragobjekt = element;
	dragx = posx - dragobjekt.offsetLeft;
	dragy = posy - dragobjekt.offsetTop;
}
function dragstop() {
	dragobjekt=null;
}

var move = false;
var popup = document.getElementById('popup_div');
function show_tt() {
	move = true;
	popup.innerHTML = ".";
	popup.style.zIndex = 150;
	window.setTimeout("popup.style.visibility = 'visible'", 100);
}
function hide_tt() {
	move = false;
	popup.style.visibility = "hidden";
}

function drag(ereignis) {
	posx = document.all ? window.event.clientX : ereignis.pageX;
	posy = document.all ? window.event.clientY : ereignis.pageY;
	if (dragobjekt != null) {
		dragobjekt.style.left = (posx - dragx) + "px";
		dragobjekt.style.top  = (posy - dragy) + "px";
	}
	if (move) {
		popup.style.left = (1*posx) + 20 + "px";
		popup.style.top  = (1*posy) + 10 + "px";
	}
	check_x();
}


function check_x() {
	var fenster = document.getElementById('windows').childNodes;
	
	for (var i = 0; i < fenster.length; i++)
	{
		fenster[i].firstChild.childNodes[1].href = 'javascript:AjaxWindow.closeAll(); hide_notiz();';
	}
}


function set_position() {
	document.getElementById('window_notiz').style.top  = "133px";
	document.getElementById('window_notiz').style.left = "474px";
}

function insert_bbcode_notiz(starttag, endtag) {
	var textarea = document.getElementById('notiz_text');
	
	if (typeof document.selection != 'undefined') {
		var range = document.selection.createRange();
		var insert = range.text;
		if (starttag=='[url]') starttag = '[url='+insert+']';
		range.text = starttag + insert + endtag;
	} else if (typeof textarea.selectionStart != 'undefined') {
		var start  = textarea.selectionStart;
		var end    = textarea.selectionEnd;
		var insert = textarea.value.substring(start, end);
		if (starttag=='[url]') starttag = '[url='+insert+']'
		textarea.value = textarea.value.substring(0, start) + starttag + insert + endtag + textarea.value.substring(end, textarea.value.length);
		if (insert.length==0) var pos = (1*start) + starttag.length;
		else var pos = (1*start) + starttag.length + insert.length + endtag.length;
		textarea.focus();
		textarea.selectionStart = pos;
		textarea.selectionEnd   = pos;
	} else {
		
	}
}