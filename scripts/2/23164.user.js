// ==UserScript==
// @name           HabraImagination2
// @namespace      *
// @description    © va1en0k
// @include        http://habrahabr.ru/blog/*
// @include        http://*.habrahabr.ru/blog/*
// @exclude        http://habrahabr.ru/blog/*/edit/*
// @exclude        http://*.habrahabr.ru/blog/*/edit/*

/*
*	ляляля
*	весь js либо написан мной, либо стырен с хабра, либо с учебника по грейсманки
*	юз ит он ё оун риск
*	спасибо можно сказать кармой http://va1en0k.habrahabr.ru
*	и не только кармой ;)
*/

function setCursor(txtarea, start, end){
   if(txtarea.createTextRange) {
        var range = txtarea.createTextRange();
        range.move("character", start);
        range.select();
    } else if(txtarea.selectionStart) {
        txtarea.setSelectionRange(start, end);
    }

}

function getCursor(input)
{
  var result = { start: 0, end: 0 };
  if (input.setSelectionRange)
  {
    result.start= input.selectionStart;
    result.end = input.selectionEnd;
  }
  else if (!document.selection) { return 0; }
  else if (document.selection && document.selection.createRange)
  {
    var range = document.selection.createRange();
    var stored_range = range.duplicate();
    stored_range.moveToElementText(input);
    stored_range.setEndPoint('EndToEnd', range);
    result.start = stored_range.text.length - range.text.length;
    result.end = result.start + range.text.length;
  }
  return result;
} 

function createButton(target, func, title, src) {
    var img, button;
    img = document.createElement('img');
    //img.style.borderTop = img.style.borderLeft = "1px solid #ccc";
    //img.style.borderRight = img.style.borderBottom = "1px solid #888";
    img.style.margin = "3px";
    img.src = src;
	img.alt = title;
	img.style.border = 'solid #F0F0F0 1px';
	img.style.cursor = 'pointer';
	img.setAttribute('_target', target.id);
    img.addEventListener('click', func, false);
	img.addEventListener('mouseover', function(event){event.target.style.borderColor = '#CCCCCC'}, false);
	img.addEventListener('mouseout', function(event){event.target.style.borderColor = '#F0F0F0'}, false);
    return img;
}
 
insert_tag = function(txtarea,starttag,endtag){
	txtarea.focus();
	var scrtop = txtarea.scrollTop;
	var cursorPos=getCursor(txtarea); 
	if (cursorPos.start==cursorPos.end)
	{
		var nuCursorPos=cursorPos.start+starttag.length;
		txtarea.value = txtarea.value.substring(0,cursorPos.start)+starttag+endtag+txtarea.value.substr(cursorPos.start );
		setCursor(txtarea,nuCursorPos,nuCursorPos);
	}else{
		var txt_pre=txtarea.value.substring (0,cursorPos.start);
		var txt_sel=txtarea.value.substring(cursorPos.start,cursorPos.end);
		var txt_aft=txtarea.value.substring(cursorPos.end);
		txtarea.value = txt_pre+starttag+txt_sel+endtag+txt_aft;
		var nuCursorPos=String(txt_pre+starttag+txt_sel+endtag).length;
		setCursor(txtarea,nuCursorPos,nuCursorPos);
	}
	if (scrtop) txtarea.scrollTop=scrtop;
}
var quote=false;
insert_text_quote = function(event){
	var img = event.currentTarget;
    var textarea = document.getElementById(img.getAttribute('_target'));
	var cur = getCursor(textarea);
	if (cur.start!=cur.end){
		insert_tag(textarea, "&laquo;", "&raquo;");
	}
	else
	{
		img.src=quote?"http://habrahabr.ru/i/ta/raquo.gif":"http://habrahabr.ru/i/ta/laquo.gif";
		insert_tag(textarea, "", quote?"&laquo;":"&raquo;");
		quote=!quote;
	}
}
insert_text_b = function(event) {
	var img = event.currentTarget;
    var textarea = document.getElementById(img.getAttribute('_target'));
	insert_tag(textarea, "<strong>", "</strong>");
}
insert_text_i = function (event){
	var img = event.currentTarget;
    var textarea = document.getElementById(img.getAttribute('_target'));
	insert_tag(textarea, "<em>", "</em>");
}
insert_text_u = function (event){
	var img = event.currentTarget;
    var textarea = document.getElementById(img.getAttribute('_target'));
	insert_tag(textarea, "<u>", "</u>");
}
insert_text_blockquote = function (event){
	var img = event.currentTarget;
    var textarea = document.getElementById(img.getAttribute('_target'));
	insert_tag(textarea, "<blockquote>", "</blockquote>");
}
insert_text_s = function (event){
	var img = event.currentTarget;
    var textarea = document.getElementById(img.getAttribute('_target'));
	insert_tag(textarea, "<s>", "</s>");
}
insert_text_mdash = function (event){
	var img = event.currentTarget;
    var textarea = document.getElementById(img.getAttribute('_target'));
	insert_tag(textarea, "", "&mdash;");
}
insert_text_user = function (event){
	var img = event.currentTarget;
    var textarea = document.getElementById(img.getAttribute('_target'));
	var cur = getCursor(textarea);

	var username=window.prompt("Кто?", '');
	if (username){
		if (cur.start!=cur.end){
			insert_tag(textarea, '<hh user="'+username+'">', '</hh>');
		}
		else
		{
			insert_tag(textarea, '', '<hh user="'+username+'" />');
		}
	}
}

insert_text_link = function (event){
	var img = event.currentTarget;
    var textarea = document.getElementById(img.getAttribute('_target'));
	var cur = getCursor(textarea);
	if (cur.start!=cur.end){
		var hreff=window.prompt("Введите URL ссылки", '');
		var regexx = new RegExp('([A-Za-z][A-Za-z0-9+.-]{1,120}:[A-Za-z0-9/](([A-Za-z0-9$_.+!*,;/?:@&~=-])|%[A-Fa-f0-9]{2}){1,333}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*,;/?:@&~=%-]{0,1000}))?)');
		if (hreff && hreff.match(regexx)) {
			insert_tag(textarea, '<a href="'+hreff+'">', "</a>");
		}
		else alert("Это не URL");
	}
	else{
		alert("Сначала выделите текст, который вы желаете сделать ссылкой");
	}
}

picture_load = function (event)
{
	var img = event.currentTarget;
    var id = img.getAttribute('_target');
	width = 600;
	height = 220;
	
	var left = Math.round((document.body.clientWidth - width) / 2);
	var top = Math.round((document.body.clientHeight - height) / 2);

	var win = window.open('http://habrahabr.ru/misc/pictures_addict.html?ta=' + id,
	'',
	'toolbar=no,' +
	'scrollbars=yes,' +
	'status=no,' +
	'height=' + height + ',' +
	'width=' + width + ',' +
	'top=' + top + ',' +
	'left=' + left);

	win.focus();
}

resize_textarea = function(event) {
    var textarea = event.currentTarget;
    var cols = textarea.clientWidth/8;
    var rowsCount = Math.floor(textarea.value.length / cols) + textarea.value.split("\n").length +1;
    if (rowsCount > 2) textarea.rows = rowsCount;
}

var func = function() {
	allReply = document.getElementsByTagName('textarea');
	for (var i = 0; i < allReply.length; i++) {
		if (allReply[i].previousSibling.className != '__valen0k__editorMenu') {
		
			allReply[i].addEventListener('keyup', resize_textarea, false);
			editDiv = document.createElement('DIV');
			editDiv.className = '__valen0k__editorMenu';
			editDiv.style.backgroundColor = '#F0F0F0';
			editDiv.style.marginTop = '12px';
			editDiv.style.paddingRight = '4px';
			editDiv.style.width = '98.2%';
			allReply[i].parentNode.insertBefore(editDiv, allReply[i]);
			editDiv.appendChild(createButton(allReply[i], insert_text_b, 'жирный', 'http://habrahabr.ru/i/ta/bold_ru.gif'));
			editDiv.appendChild(createButton(allReply[i], insert_text_i, 'курсив', 'http://habrahabr.ru/i/ta/italic_ru.gif'));
			editDiv.appendChild(createButton(allReply[i], insert_text_u, 'подчеркнутый', 'http://habrahabr.ru/i/ta/underline_ru.gif'));
			editDiv.appendChild(createButton(allReply[i], insert_text_s, 'зачеркнутый', 'http://habrahabr.ru/i/ta/strikethrough.gif'));
			editDiv.appendChild(createButton(allReply[i], insert_text_link, 'ссылка', 'http://habrahabr.ru/i/ta/link.gif'));
			editDiv.appendChild(createButton(allReply[i], insert_text_blockquote, 'отступ', 'http://habrahabr.ru/i/ta/indent.gif'));
			editDiv.appendChild(createButton(allReply[i], insert_text_quote, 'кавычки', 'http://habrahabr.ru/i/ta/raquo.gif'));
			editDiv.appendChild(createButton(allReply[i], insert_text_mdash, 'тире', 'http://habrahabr.ru/i/ta/mdash.gif'));
			editDiv.appendChild(createButton(allReply[i], insert_text_user, 'хабраюзер', 'http://habrahabr.ru/i/ta/user.gif'));
			editDiv.appendChild(createButton(allReply[i], picture_load, 'картинка', 'http://habrahabr.ru/i/ta/image.gif'));
		}
	}
	window.setTimeout( func, 1000);
}
func();

// ==/UserScript==