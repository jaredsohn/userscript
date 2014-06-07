// ==UserScript==
// @name		Adabra Charger
// @namespace	 *
// @description	Скрипт добавляет в форму комментирования на autokadabra.ru кнопки для вставки тэгов
// @include	http://autokadabra.ru/clubs/*

/*
*	Написано на основе аналогичного скрипта для habrahabr.ru
*	http://habrahabr.ru/blog/i_am_clever/36435.html#habracut
*	Автор исходного скрипта — http://va1en0k.habrahabr.ru
*	Автор этого — http://apd.autokadabra.ru
*	версия: b1 (28.02.2008)
*/

/*---------------- настройки ----------------*/
//	true — функция включена, false — выключена

//	автоматическая регулировка высоты поля ввода комментария
	var ac_auto_height = true;

/*---------------- /настройки ----------------*/

; /* UTF-8 patch by profiT, do not remove semi-colon in this row, it is necessary */
  /* how to use: add this patch to your userJS and save it with UTF-8 */
  /* then you can use utf(s) to get unicode strings */
  
function utf(s) {
function getByte(s,i) {
return s.charCodeAt(i)&255;
}

var r='';
var i=0,n=0;
while(i<s.length) {
n=getByte(s,i);
     if ((n&252)==252) n=((n&1)<<30)+((getByte(s,++i)&63)<<24)+((getByte(s,++i)&63)<<18)+((getByte(s,++i)&63)<<12)+((getByte(s,++i)&63)<<6)+(getByte(s,++i)&63)
else if ((n&248)==248) n=((n&3)<<24)+((getByte(s,++i)&63)<<18)+((getByte(s,++i)&63)<<12)+((getByte(s,++i)&63)<<6)+(getByte(s,++i)&63)
else if ((n&240)==240) n=((n&7)<<18)+((getByte(s,++i)&63)<<12)+((getByte(s,++i)&63)<<6)+(getByte(s,++i)&63)
else if ((n&224)==224) n=((n&15)<<12)+((getByte(s,++i)&63)<<6)+(getByte(s,++i)&63)
else if ((n&192)==192) n=((n&63)<<6)+(getByte(s,++i)&63);

r+=String.fromCharCode(n);
i++;
}
return r;
} /* UTF-8 patch */

function setCursor(txtarea, start, end)
{
	if(txtarea.createTextRange)
	{
		var range = txtarea.createTextRange();
		range.move("character", start);
		range.select();
	} else if(txtarea.selectionStart)
		txtarea.setSelectionRange(start, end);
}
function getCursor(input)
{
	var result = { start:0, end:0 };
	if (input.setSelectionRange)
	{
		result.start = input.selectionStart;
		result.end = input.selectionEnd;
	}  else if (!document.selection)
		return 0;
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
function createButton(target, func, title, src)
{
	var img, button;
	img = document.createElement('img');
	img.style.margin = "1px 5px";
	img.src = src;
	img.alt = title;
	img.setAttribute('align', 'middle');
	img.addEventListener('click', func, false);
	return img;
}
insert_tag = function(txtarea,starttag,endtag)
{
	txtarea.focus();
	var scrtop = txtarea.scrollTop;
	var cursorPos = getCursor(txtarea); 
	if (cursorPos.start == cursorPos.end)
	{
		var nuCursorPos = cursorPos.start+starttag.length;
		txtarea.value = txtarea.value.substring(0,cursorPos.start) + starttag + endtag + txtarea.value.substr(cursorPos.start);
		setCursor(txtarea, nuCursorPos, nuCursorPos);
	} else
	{
		var txt_pre = txtarea.value.substring(0, cursorPos.start);
		var txt_sel = txtarea.value.substring(cursorPos.start, cursorPos.end);
		var txt_aft = txtarea.value.substring(cursorPos.end);
		txtarea.value = txt_pre + starttag + txt_sel + endtag + txt_aft;
		var nuCursorPos = String(txt_pre + starttag + txt_sel + endtag).length;
		setCursor(txtarea, nuCursorPos, nuCursorPos);
	}
	if (scrtop) txtarea.scrollTop = scrtop;
}
insert_text_b = function(event)
{
    var textarea = document.getElementsByTagName('textarea')[0];
	insert_tag(textarea, "<strong>", "</strong>");
}
insert_text_i = function (event)
{
    var textarea = document.getElementsByTagName('textarea')[0];
	insert_tag(textarea, "<em>", "</em>");
}
insert_text_u = function (event)
{
    var textarea = document.getElementsByTagName('textarea')[0];
	insert_tag(textarea, "<u>", "</u>");
}
insert_text_blockquote = function (event)
{
    var textarea = document.getElementsByTagName('textarea')[0];
	insert_tag(textarea, "<blockquote>", "</blockquote>");
}
insert_text_s = function (event)
{
    var textarea = document.getElementsByTagName('textarea')[0];
	insert_tag(textarea, "<s>", "</s>");
}
insert_text_mdash = function (event)
{
    var textarea = document.getElementsByTagName('textarea')[0];
	insert_tag(textarea, "", "&mdash;");
}
insert_text_user_male = function (event)
{
    var textarea = document.getElementsByTagName('textarea')[0];
	var cur = getCursor(textarea);
	var username = window.prompt(utf("Кто это?"), '');
	if (username)
	{
		if (cur.start != cur.end)
			insert_tag(textarea, '<a href="http://'+username+'.autokadabra.ru/">', '</a>');
		else
			insert_tag(textarea, '', '<a href="http://'+username+'.autokadabra.ru/">'+username+'</a>');
	}
}
/*insert_text_user_male = function (event)
{
    var textarea = document.getElementsByTagName('textarea')[0];
	var cur = getCursor(textarea);
	var username=window.prompt("Кто это?", '');
	if (username)
	{
		if (cur.start != cur.end)
			insert_tag(textarea, '<a href="http://'+username+'.autokadabra.ru/" class="icon userpic male"><img src="http://autokadabra.ru/i/0.gif" alt="">', '</a>');
		else
			insert_tag(textarea, '', '<a href="http://'+username+'.autokadabra.ru/" class="icon userpic male"><img src="http://autokadabra.ru/i/0.gif" alt="">'+username+'</a>');
	}
}
insert_text_user_female = function (event)
{
    var textarea = document.getElementsByTagName('textarea')[0];
	var cur = getCursor(textarea);
	var username=window.prompt("Кто эта прекрасная дама?", '');
	if (username)
	{
		if (cur.start != cur.end)
			insert_tag(textarea, '<a href="http://'+username+'.autokadabra.ru/" class="icon userpic female"><img src="http://autokadabra.ru/i/0.gif" alt="">', '</a>');
		else
			insert_tag(textarea, '', '<a href="http://'+username+'.autokadabra.ru/" class="icon userpic female"><img src="http://autokadabra.ru/i/0.gif" alt="">'+username+'</a>');
	}
}
insert_text_user_unknown = function (event)
{
    var textarea = document.getElementsByTagName('textarea')[0];
	var cur = getCursor(textarea);
	var username=window.prompt("Кто это?", '');
	if (username)
	{
		if (cur.start != cur.end)
			insert_tag(textarea, '<a href="http://'+username+'.autokadabra.ru/" class="icon userpic unknown"><img src="http://autokadabra.ru/i/0.gif" alt="">', '</a>');
		else
			insert_tag(textarea, '', '<a href="http://'+username+'.autokadabra.ru/" class="icon userpic unknown"><img src="http://autokadabra.ru/i/0.gif" alt="">'+username+'</a>');
	}
}
*/
insert_text_link = function (event)
{
	var textarea = document.getElementsByTagName('textarea')[0];
	var cur = getCursor(textarea);
	if (cur.start != cur.end)
	{
		var hreff = window.prompt(utf("Введите URL ссылки"), '');
		var regexx = new RegExp('([A-Za-z][A-Za-z0-9+.-]{1,120}:[A-Za-z0-9/](([A-Za-z0-9$_.+!*,;/?:@&~=-])|%[A-Fa-f0-9]{2}){1,333}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*,;/?:@&~=%-]{0,1000}))?)');
		if (hreff && hreff.match(regexx))
			insert_tag(textarea, '<a href="'+hreff+'">', "</a>");
		else
			alert(utf("Это не URL"));
	} else
		alert(utf("Сначала выделите текст, который вы желаете сделать ссылкой"));
}
insert_image = function (event)
{
	var textarea = document.getElementsByTagName('textarea')[0];
	var hreff = window.prompt(utf("Введите URL картинки"), '');
	var regexx = new RegExp('([A-Za-z][A-Za-z0-9+.-]{1,120}:[A-Za-z0-9/](([A-Za-z0-9$_.+!*,;/?:@&~=-])|%[A-Fa-f0-9]{2}){1,333}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*,;/?:@&~=%-]{0,1000}))?)');
	if (hreff && hreff.match(regexx))
		insert_tag(textarea, '', '<img src="'+hreff+'" />');
	else
		alert(utf("Это не URL"));
}
insert_quote = function(event)
{
	var textarea = document.getElementsByTagName('textarea')[0];
	if (window.getSelection)
		selected = window.getSelection().toString();      
	else if (document.getSelection)
		selected = document.getSelection();                
	else if (document.selection)
		selected = document.selection.createRange().text; 
   
	if (selected)
		insert_tag(textarea, '<blockquote>' + selected, '</blockquote>');
	else
		alert(utf("Выделите цитируемый текст"));
}
resize_textarea = function(event)
{
	var textarea = event.currentTarget;
	var rowsCount = textarea.value.replace(/[^\n]/g,'').length + 1;
	if (rowsCount > 6)
		textarea.style.height = 128 + (rowsCount - 6)*16 + 'px';
}
var func = function()
{
	reply = document.getElementsByTagName('textarea')[0];
	if (reply.previousSibling.className != '__apd__editorMenu')
	{
		editDiv = document.createElement('DIV');
		editDiv.className = '__apd__editorMenu';
		editDiv.style.backgroundColor = '#FFECA5';
		editDiv.style.marginBottom = '5px';
		editDiv.style.height = '25px';

		if(ac_auto_height == true)
		{
			reply.addEventListener('keyup', resize_textarea, false);
			reply.style.height = '128px';
			reply.style.fontSize = '14px';
			reply.style.lineHeight = '16px';
		}
		reply.parentNode.insertBefore(editDiv, reply);
		editDiv.appendChild(createButton(reply, insert_text_b, 'жирный', 'http://habrahabr.ru/i/ta/bold_ru.gif'));
		editDiv.appendChild(createButton(reply, insert_text_i, 'курсив', 'http://habrahabr.ru/i/ta/italic_ru.gif'));
		editDiv.appendChild(createButton(reply, insert_text_u, 'подчеркнутый', 'http://habrahabr.ru/i/ta/underline_ru.gif'));
		editDiv.appendChild(createButton(reply, insert_text_s, 'зачеркнутый', 'http://habrahabr.ru/i/ta/strikethrough.gif'));
		editDiv.appendChild(createButton(reply, insert_text_mdash, 'тире', 'http://habrahabr.ru/i/ta/mdash.gif'));
		editDiv.appendChild(createButton(reply, insert_text_blockquote, 'отступ', 'http://habrahabr.ru/i/ta/indent.gif'));
		editDiv.appendChild(createButton(reply, insert_quote, 'цитировать', 'http://autokadabra.ru/i/icons/icon_comment.png'));
		editDiv.appendChild(createButton(reply, insert_text_link, 'ссылка', 'http://habrahabr.ru/i/ta/link.gif'));
		editDiv.appendChild(createButton(reply, insert_image, 'картинка', 'http://habrahabr.ru/i/ta/image.gif'));
		editDiv.appendChild(createButton(reply, insert_text_user_male, 'кадабраюзер', 'http://autokadabra.ru/i/icons/icon_male.png'));
//	в комментах у тэгов режутся классы, так что пока полоориентированных иконок не будет
//		editDiv.appendChild(createButton(reply, insert_text_user_female, 'кадабраюзерша', 'http://autokadabra.ru/i/icons/icon_female.png'));
//		editDiv.appendChild(createButton(reply, insert_text_user_unknown, 'НЛО', 'http://autokadabra.ru/i/icons/icon_hui.png'));
	}
}

func();

// ==/UserScript==