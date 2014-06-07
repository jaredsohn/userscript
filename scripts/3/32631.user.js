// ==UserScript==
// @name           SuperHabraImagination
// @namespace       http://userscripts.org
// @description	  Improve comment's textarea with insert tags. Authors: va1en0k, marapper, dinamyte
// @author        va1en0k, marapper, dinamyte
// @include        http://habrahabr.ru/blogs/*
// @include        http://*.habrahabr.ru/blogs/*
// @include        http://habrahabr.ru/blog/*
// @include        http://*.habrahabr.ru/blog/*
// @exclude        http://habrahabr.ru/blog/*/edit/*
// @exclude        http://*.habrahabr.ru/blog/*/edit/*
// ==/UserScript==

/*
*	вставляет. быстро. удобно. теги в комментарии.
*	код стырен с разрешения автора и переделан под новую верстку СуперХабра
*	оригинально-необычный автор (уже забаненный в ходе Священной Войны Леммингов) - Валя, http://va1en0k.net
*	переделано кривыми руками святого отца Мараппера, http://iskariot.ru
*	под умелой редакцией (очень большой, да) Дина, http://web-zine.org/
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
    img.style.margin = "3px";
    img.className = "js-bundle-key";
    img.src = src;
	img.alt = title;
	img.title = title;
	//img.style.border = 'solid #F0F0F0 1px';
	if(func!="")
		{
		img.style.cursor = 'pointer';
		img.setAttribute("_func", func);
		img.setAttribute('_target', target.id);
		}
	//img.addEventListener('click', func, false);
    return img;
}
 
insert_tag = function(txtarea,starttag,endtag){
	//echo txtarea;
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

insert_text_b = function(event) {
	//var img = event.currentTarget;
	var textarea =  document.getElementById("js-field-comment");
	insert_tag(textarea, "<strong>", "</strong>");
}
insert_text_i = function (event){
	//var img = event.currentTarget;
    var textarea =  document.getElementById("js-field-comment");
	insert_tag(textarea, "<em>", "</em>");
}
insert_text_blockquote = function (event){
	//var img = event.currentTarget;
  var textarea =  document.getElementById("js-field-comment");
	insert_tag(textarea, "<blockquote>", "</blockquote>");
}
insert_text_sub = function (event){
	//var img = event.currentTarget;
   var textarea =  document.getElementById("js-field-comment");
	insert_tag(textarea, "<sub>", "</sub>");
}
insert_text_sup = function (event){
	//var img = event.currentTarget;
   var textarea =  document.getElementById("js-field-comment");
	insert_tag(textarea, "<sup>", "</sup>");
}
insert_text_s = function (event){
	//var img = event.currentTarget;
   var textarea =  document.getElementById("js-field-comment");
	insert_tag(textarea, "<strike>", "</strike>");
}
insert_text_code = function (event){
	//var img = event.currentTarget;
   var textarea =  document.getElementById("js-field-comment");
	insert_tag(textarea, "<pre>", "</pre>");
}
insert_text_video = function (event){
	//var img = event.currentTarget;
   var textarea =  document.getElementById("js-field-comment");
	insert_tag(textarea, "<video>", "</video>");
}
insert_text_user = function (event){
	//var img = event.currentTarget;
   var textarea =  document.getElementById("js-field-comment");
	var cur = getCursor(textarea);

	var username=window.prompt("Кого вставить хотите?", '');
	if (username){
			insert_tag(textarea, '', '<hh user="'+username+'" />');
	}
}

insert_text_image = function (event){
	//var img = event.currentTarget;
   var textarea =  document.getElementById("js-field-comment");
	var cur = getCursor(textarea);
		var hreff=window.prompt("Введите URL картинки", '');
		var regexx = new RegExp('([A-Za-z][A-Za-z0-9+.-]{1,120}:[A-Za-z0-9/](([A-Za-z0-9$_.+!*,;/?:@&~=-])|%[A-Fa-f0-9]{2}){1,333}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*,;/?:@&~=%-]{0,1000}))?(gif|jpg|png|bmp))');
		if (hreff && hreff.match(regexx)) {
			insert_tag(textarea, '<img alt="image" title="image" src="'+hreff+'" />', "");
		}
		else alert("Это не картинка, точно");
}

insert_text_link = function (event){
	//var img = event.currentTarget;
   var textarea =  document.getElementById("js-field-comment");
	var cur = getCursor(textarea);
	var hreff=window.prompt("Введите URL ссылки", '');
		var regexx = new RegExp('([A-Za-z][A-Za-z0-9+.-]{1,120}:[A-Za-z0-9/](([A-Za-z0-9$_.+!*,;/?:@&~=-])|%[A-Fa-f0-9]{2}){1,333}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*,;/?:@&~=%-]{0,1000}))?)');
	if (hreff && hreff.match(regexx)) {
	if (cur.start!=cur.end)
				insert_tag(textarea, '<a href="'+hreff+'">', "</a>");
	else
			insert_tag(textarea, '<a href="'+hreff+'">ссылка', "</a>");
	}
		else alert("Это не URL, точно");
}



/*
resize_textarea = function(event) {
    var textarea = event.currentTarget;
    var cols = textarea.clientWidth/8;
    var rowsCount = Math.floor(textarea.value.length / cols) + textarea.value.split("\n").length +1;
    if (rowsCount > 2) textarea.rows = rowsCount;
}
*/


var func = function() {
	
	var allReply = document.getElementById("js-field-comment");
	
	if (allReply.previousSibling.id != '__SH__editorMenu')
	{
		editDiv = document.createElement('DIV');
		editDiv.id = '__SH__editorMenu';
		editDiv.style.backgroundColor = '#eaecea';
		editDiv.style.marginTop = '12px';
		editDiv.style.paddingRight = '4px';
		editDiv.style.width = '100%';
		
		allReply.parentNode.insertBefore(editDiv, allReply);	
		
		editDiv.appendChild(createButton(allReply, "insert_text_b", "жирный", 'http://habrahabr.ru/i/panel/bold_ru.gif'));
		editDiv.appendChild(createButton(allReply, "insert_text_i", 'курсив', 'http://habrahabr.ru/i/panel/italic_ru.gif'));
		editDiv.appendChild(createButton(allReply, "insert_text_s", 'зачеркнутый', 'http://habrahabr.ru/i/panel/strikethrough.gif'));
		editDiv.appendChild(createButton(allReply, "insert_text_sup", 'верхний индекс', 'http://www.picamatic.com/show/2008/08/27/08/05/907040_20x20.gif'));
		editDiv.appendChild(createButton(allReply, "insert_text_sub", 'нижний индекс', 'http://www.picamatic.com/show/2008/08/27/08/05/907038_20x20.gif'));
		
		editDiv.appendChild(createButton(allReply, "", '', 'http://www.picamatic.com/show/2008/08/27/07/28/906841_11x20.gif'));
		
		editDiv.appendChild(createButton(allReply, "insert_text_blockquote", 'цитата', 'http://www.picamatic.com/show/2008/08/26/04/45/898953_20x20.gif'));
		editDiv.appendChild(createButton(allReply, "insert_text_code", 'код', 'http://habrahabr.ru/i/panel/code.gif'));
		
		editDiv.appendChild(createButton(allReply, "", '', 'http://www.picamatic.com/show/2008/08/27/07/28/906841_11x20.gif'));
		
		editDiv.appendChild(createButton(allReply, "insert_text_user", 'хабрачеловек', 'http://habrahabr.ru/i/panel/user.gif'));
		editDiv.appendChild(createButton(allReply, "insert_text_link", 'ссылка', 'http://habrahabr.ru/i/panel/link.gif'));
		
		editDiv.appendChild(createButton(allReply, "", '', 'http://www.picamatic.com/show/2008/08/27/07/28/906841_11x20.gif'));
		
		editDiv.appendChild(createButton(allReply, "insert_text_image", 'картинка', 'http://habrahabr.ru/i/panel/image.gif'));
		editDiv.appendChild(createButton(allReply, "insert_text_video", 'видео', 'http://habrahabr.ru/i/panel/video.gif'));
	}/**/
/*
	allReply = document.getElementsByName('comment[message]');
	
	if (allReply.previousSibling.className != '__SH__editorMenu')
	{
		editDiv = document.createElement('DIV');
		editDiv.className = '__SH__editorMenu';
		editDiv.style.backgroundColor = '#eaecea';
		editDiv.style.marginTop = '12px';
		editDiv.style.paddingRight = '4px';
		editDiv.style.width = '100%';
	
		allReply.parentNode.insertBefore(editDiv, allReply);	
		
		editDiv.appendChild(createButton(allReply, insert_text_b, "жирный", 'http://habrahabr.ru/i/panel/bold_ru.gif'));
		editDiv.appendChild(createButton(allReply, insert_text_i, 'курсив', 'http://habrahabr.ru/i/panel/italic_ru.gif'));
		
		editDiv.appendChild(createButton(allReply, insert_text_blockquote, 'цитата', 'http://www.picamatic.com/show/2008/08/26/04/45/898953_20x20.gif'));
		editDiv.appendChild(createButton(allReply, insert_text_s, 'код', 'http://habrahabr.ru/i/panel/code.gif'));
		
		editDiv.appendChild(createButton(allReply, insert_text_link, 'ссылка', 'http://habrahabr.ru/i/panel/link.gif'));
		editDiv.appendChild(createButton(allReply, insert_text_user, 'хабраюзер', 'http://habrahabr.ru/i/panel/user.gif'));
	}/**/
	/*
	//allReply = document.getElementsByTagName('textarea');
	allReply = document.getElementsByName('comment[message]');
	for (var i = 0; i < allReply.length; i++) {
		if (allReply[i].previousSibling.className != '__SH__editorMenu') {
		
		
			//allReply[i].addEventListener('keyup', resize_textarea, false);
			editDiv = document.createElement('DIV');
			editDiv.className = '__SH__editorMenu';
			editDiv.id = "__SH__editor";
			editDiv.style.backgroundColor = '#eaecea';
			editDiv.style.marginTop = '12px';
			editDiv.style.paddingRight = '4px';
			editDiv.style.width = '100%';
			allReply[i].parentNode.insertBefore(editDiv, allReply[i]);
			editDiv.appendChild(createButton(allReply[i], insert_text_b, i, 'http://habrahabr.ru/i/panel/bold_ru.gif'));
			editDiv.appendChild(createButton(allReply[i], insert_text_i, 'курсив', 'http://habrahabr.ru/i/panel/italic_ru.gif'));
			
			editDiv.appendChild(createButton(allReply[i], insert_text_blockquote, 'цитата', 'http://www.picamatic.com/show/2008/08/26/04/45/898953_20x20.gif'));
			editDiv.appendChild(createButton(allReply[i], insert_text_s, 'код', 'http://habrahabr.ru/i/panel/code.gif'));
			
			editDiv.appendChild(createButton(allReply[i], insert_text_link, 'ссылка', 'http://habrahabr.ru/i/panel/link.gif'));
			editDiv.appendChild(createButton(allReply[i], insert_text_user, 'хабраюзер', 'http://habrahabr.ru/i/panel/user.gif'));
		
		}
	}*/
}
func();

document.addEventListener("click", function(event)
{
	var c_target = event.originalTarget ? event.originalTarget : event.target;
		
	try
	{
		if (c_target.getAttribute("_target") == null)
				return;
			
		var func = c_target.getAttribute("_func");
		
		eval(func + "();");
	}
	catch(e)
	{
	//alert(e);
	}
}, false);