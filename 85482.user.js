//
// ==UserScript==
// @name          HabraFormatHelper
// @namespace     http://habrahabr.ru/
// @description   Formatting helper for habrahabr.ru
// @author        crea7or
// @include       http://habrahabr.ru/blogs/*
// @include       http://habrahabr.ru/qa/*
// @include       http://habrahabr.ru/post/*
// @include       http://habrahabr.ru/company/*
// @include       http://www.habrahabr.ru/blogs/*
// @include       http://www.habrahabr.ru/post/*
// @include       http://www.habrahabr.ru/qa/*
// @include       http://www.habrahabr.ru/company/*
// @require       http://crea7or.spb.ru/scripts/user.js.updater.php?id=85482&days=7
// @version       1.0.11
// ==/UserScript==
//

function vHB_GC(input)
{
	var result = {start: 0, end: 0};
	if (input.setSelectionRange)
	{
		result.start= input.selectionStart;
		result.end = input.selectionEnd;
	} else if (!document.selection) 
	{
		return false;
	} else if (document.selection && document.selection.createRange) 
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

function vHB_SC(txtarea, start, end)
{
	if(txtarea.createTextRange) 
	{
		var range = txtarea.createTextRange();
		range.move("character", start);
		range.select();
	} 
	else if (txtarea.selectionStart) 
	{
		txtarea.setSelectionRange(start, end);
	}
}

function vHB_tag(startTag, endTag, txtArId )
{
	var txtarea = document.getElementById( txtArId );
	txtarea.focus();
	var scrtop = txtarea.scrollTop;
	var cursorPos = vHB_GC(txtarea);
	var txt_pre = txtarea.value.substring(0, cursorPos.start);
	var txt_sel = txtarea.value.substring(cursorPos.start, cursorPos.end);
	var txt_aft = txtarea.value.substring(cursorPos.end);
	if (cursorPos.start == cursorPos.end)
	{
		var nuCursorPos = cursorPos.start + startTag.length;
	}
	else
	{
		var nuCursorPos=String(txt_pre + startTag + txt_sel + endTag).length;
	}
	txtarea.value = txt_pre + startTag + txt_sel + endTag + txt_aft;
	vHB_SC(txtarea,nuCursorPos,nuCursorPos);
	if (scrtop) txtarea.scrollTop=scrtop;
}

function vHB_text(tagName, txtArId)
{
	var startTag = '<' + tagName + '>';
	var endTag = '</' + tagName + '>';
	vHB_tag(startTag, endTag, txtArId);
	return false;
}

function vHB_specialInsert( txtArId, startTag, endTag, addQuotes )
{
	var txt_sel_doc= '';
	if (window.getSelection)
	{
		txt_sel_doc= new String( window.getSelection());
	}
	else if (document.getSelection)
	{
		txt_sel_doc= new String( document.getSelection());
	}
	else if (document.selection)
	{
		txt_sel_doc= new String( document.selection.createRange().text );
	}   

	var txtarea = document.getElementById( txtArId );
	txtarea.focus();

	if ( addQuotes == 1 )
	{
		startTag += "\"";
		endTag = "\"" + endTag;
	}
	
	var scrtop = txtarea.scrollTop;
	var cursorPos = vHB_GC(txtarea);
	var txt_pre = txtarea.value.substring(0, cursorPos.start);
	var txt_sel = txtarea.value.substring(cursorPos.start, cursorPos.end);
	var txt_extrn = 0;
	if ( txt_sel.length == 0 )
	{
	   	txt_sel = txt_sel_doc;
		if ( txt_sel.length != 0 )
		{
			txt_extrn = 1;
		}
	}
	var txt_aft = txtarea.value.substring(cursorPos.end);
	if (( cursorPos.start == cursorPos.end ) && ( txt_extrn == 0 ))
	{
		var nuCursorPos = cursorPos.start + startTag.length;
	}
	else
	{
		var nuCursorPos=String(txt_pre +startTag + txt_sel + endTag ).length;
	}
	txtarea.value = txt_pre + startTag + txt_sel + endTag + txt_aft;
	vHB_SC(txtarea,nuCursorPos,nuCursorPos);
	if (scrtop) txtarea.scrollTop=scrtop;
	return false;
}

function vHB_irony( txtArId )
{
	var startTag = '<i><font color="#cc3333">';
	var endTag = '</font></i>';
	vHB_tag(startTag, endTag, txtArId);
	return false;
}

function vHB_image( txtArId )
{
	var src = prompt('Адрес картинки пожалуйста', 'http://');
	if(src)
	{
		vHB_tag('<img src="' + src + '" alt="image">', '', txtArId );
	}
}

function vHB_link( txtArId )
{
	var href = prompt('URL пожалуйста', 'http://');
	if(href)
	{
		vHB_tag('<a href="' + href + '">', '</a>', txtArId );
	}
}

function vHB_insLang( selectSource, txtArId )
{
	var startTag = "<source lang='" + selectSource.value + "'>\n";
	var endTag = "\n</source>\n";
	vHB_tag(startTag, endTag, txtArId );
	selectSource.value = 'none';
}


var panelNafig = document.querySelectorAll('div.panel');
if (panelNafig)
{
	for (cnt = 0; cnt < panelNafig.length; cnt++)
	{
		panelNafig[cnt].setAttribute('style', 'display: none;');
	}
}

var butDis = document.querySelector('input.preview');
if (butDis)
{
	butDis.removeAttribute('disabled');
}
var butDis = document.querySelector('input.submit');
if (butDis)
{
	butDis.removeAttribute('disabled');
}


if( document.location.href.indexOf("habrahabr.ru/qa/add") == -1 )
{
	var vHB_qa = document.location.href.indexOf("habrahabr.ru/qa");
	var vHB_Scr=document.createElement("script");
	vHB_Scr.type="application/javascript";
	vHB_Scr.textContent = vHB_GC + "\n" + vHB_SC + "\n" + vHB_tag + "\n" + vHB_text + "\n" + vHB_image + "\n" + vHB_link + "\n" + vHB_irony  + "\n" +  vHB_specialInsert + "\n" + vHB_insLang;
	document.body.appendChild( vHB_Scr );

	if ( vHB_qa != -1 )
	{
		vHB_Inputs = document.getElementsByTagName('fieldset');
		for (vHBi = 0; vHBi < vHB_Inputs.length; vHBi++)
		{
			vHB_txtar = vHB_Inputs[vHBi].getElementsByTagName('textarea');
			if ( vHB_txtar.length > 0 )
			{
				vHB_nm = 'vhb_txtarea' + vHBi;
				vHB_newdiv = document.createElement('div');
				vHB_newdiv.innerHTML = "<a onclick=\"return vHB_text('b','" + vHB_nm + "');\" href=\"#\" title=\"Жирный\"><img src=\"http://habrahabr.ru/i/panel/bold_ru.gif\"></a>&nbsp;<a onclick=\"return vHB_text('i','" + vHB_nm + "');\" href=\"#\" title=\"Наклонный\"><img src=\"http://habrahabr.ru/i/panel/italic_ru.gif\"></a>&nbsp;<a onclick=\"return vHB_text('u','" + vHB_nm + "');\" href=\"#\" title=\"Подчёркнутый\"><img src=\"http://habrahabr.ru/i/panel/underline_ru.gif\"></a>&nbsp;<a onclick=\"return vHB_text('s','" + vHB_nm + "');\" href=\"#\" title=\"Перечёркнутый\"><img src=\"http://habrahabr.ru/i/panel/strikethrough.gif\"></a>&nbsp;<a onclick=\"return vHB_text('code','" + vHB_nm + "');\" href=\"#\" title=\"CODE\"><img src=\"http://habrahabr.ru/i/panel/code.gif\"></a>&nbsp;<a onclick=\"return vHB_text('sup','" + vHB_nm + "');\" href=\"#\" title=\"Верхний индекс\"><img src=\"http://habrastorage.org/storage/28af5a97/9fb69094/6794bdb6/f1b50cd7.gif\"></a>&nbsp;<a onclick=\"return vHB_text('sub','" + vHB_nm + "');\" href=\"#\" title=\"Нижний индекс\"><img src=\"http://habrastorage.org/storage/2f675168/65ca003c/43a6b172/f12c77da.gif\"></a>&nbsp;<a onclick=\"return vHB_specialInsert('" + vHB_nm + "', '<blockquote>','</blockquote>', 0 );\" href=\"#\" title=\"Цитирование\"><img src=\"http://habrastorage.org/storage/aa3b425f/7756fb9b/8262fc6e/0ecccac7.gif\"></a>&nbsp;<a onclick=\"return vHB_irony('" + vHB_nm + "');\" href=\"#\" title=\"Ирония\"><img src=\"http://habrastorage.org/storage/eba3ef2a/f6b03d94/3e242d34/60d110e8.gif\"></a>&nbsp;<a onclick=\"vHB_link('" + vHB_nm + "'); return false;\" href=\"#\" title=\"Вставка ссылки\"><img src=\"http://habrahabr.ru/i/panel/link.gif\"></a>&nbsp;<a onclick=\"vHB_image('" + vHB_nm + "'); return false;\" href=\"#\" title=\"Вставка картинки\"><img src=\"http://habrahabr.ru/i/panel/image.gif\"></a>";
				vHB_newdiv.innerHTML += "&nbsp;<a onclick=\"vHB_text('video','" + vHB_nm + "'); return false;\" href=\"#\" title=\"Ссылка на видео\"><img src=\"http://habrahabr.ru/i/panel/video.gif\"></a>";
				vHB_newdiv.innerHTML += "&nbsp;<select name=\"lang\" onchange=\"vHB_insLang(this,'" + vHB_nm + "');\" tabindex=\"-1\" style=\"vertical-align: top;\"><option value=\"none\" class=\"title\">Языки:</option><option value=\"bash\">bash</option><option value=\"cpp\">cpp</option><option value=\"cs\">cs</option><option value=\"xml\">xml</option><option value=\"html\">html</option><option value=\"java\">java</option><option value=\"javascript\">javascript</option><option value=\"lisp\">lisp</option><option value=\"lua\">lua</option><option value=\"php\">php</option><option value=\"perl\">perl</option><option value=\"python\">python</option><option value=\"ruby\">ruby</option><option value=\"sql\">sql</option><option value=\"scala\">scala</option><option value=\"tex\">tex</option></select>&nbsp;";
				vHB_InsertBefore = vHB_Inputs[vHBi].firstChild;
				vHB_Inputs[vHBi].insertBefore(vHB_newdiv, vHB_InsertBefore);
				vHB_txtar[0].setAttribute('id', vHB_nm);
			}
		}
	}
	else
	{
		vHB_Inputs = document.querySelectorAll( 'div.editor');
		for ( vHBi = 0; vHBi < vHB_Inputs.length; vHBi ++ )
		{
			vHB_txtar = vHB_Inputs[vHBi].getElementsByTagName('textarea');
			if ( vHB_txtar.length > 0 )
			{
   			vHB_nm = 'js-field-comment';
		    vHB_newdiv = document.createElement('div');
		    vHB_newdiv.innerHTML = "<a onclick=\"return vHB_text('b','" + vHB_nm + "');\" href=\"#\" title=\"Жирный\"><img src=\"http://habrahabr.ru/i/panel/bold_ru.gif\"></a>&nbsp;<a onclick=\"return vHB_text('i','" + vHB_nm + "');\" href=\"#\" title=\"Наклонный\"><img src=\"http://habrahabr.ru/i/panel/italic_ru.gif\"></a>&nbsp;<a onclick=\"return vHB_text('u','" + vHB_nm + "');\" href=\"#\" title=\"Подчёркнутый\"><img src=\"http://habrahabr.ru/i/panel/underline_ru.gif\"></a>&nbsp;<a onclick=\"return vHB_text('s','" + vHB_nm + "');\" href=\"#\" title=\"Перечёркнутый\"><img src=\"http://habrahabr.ru/i/panel/strikethrough.gif\"></a>&nbsp;<a onclick=\"return vHB_text('code','" + vHB_nm + "');\" href=\"#\" title=\"CODE\"><img src=\"http://habrahabr.ru/i/panel/code.gif\"></a>&nbsp;<a onclick=\"return vHB_text('sup','" + vHB_nm + "');\" href=\"#\" title=\"Верхний индекс\"><img src=\"http://habrastorage.org/storage/28af5a97/9fb69094/6794bdb6/f1b50cd7.gif\"></a>&nbsp;<a onclick=\"return vHB_text('sub','" + vHB_nm + "');\" href=\"#\" title=\"Нижний индекс\"><img src=\"http://habrastorage.org/storage/2f675168/65ca003c/43a6b172/f12c77da.gif\"></a>&nbsp;<a onclick=\"return vHB_specialInsert('" + vHB_nm + "', '<blockquote>','</blockquote>', 0 );\" href=\"#\" title=\"Цитирование\"><img src=\"http://habrastorage.org/storage/aa3b425f/7756fb9b/8262fc6e/0ecccac7.gif\"></a>&nbsp;<a onclick=\"return vHB_irony('" + vHB_nm + "');\" href=\"#\" title=\"Ирония\"><img src=\"http://habrastorage.org/storage/eba3ef2a/f6b03d94/3e242d34/60d110e8.gif\"></a>&nbsp;<a onclick=\"vHB_link('" + vHB_nm + "'); return false;\" href=\"#\" title=\"Вставка ссылки\"><img src=\"http://habrahabr.ru/i/panel/link.gif\"></a>&nbsp;<a onclick=\"vHB_image('" + vHB_nm + "'); return false;\" href=\"#\" title=\"Вставка картинки\"><img src=\"http://habrahabr.ru/i/panel/image.gif\"></a>";
   			vHB_newdiv.innerHTML += "&nbsp;<a onclick=\"return vHB_specialInsert('" + vHB_nm + "', '<hh user=','/>', 1 );\" href=\"#\" title=\"Ссылка на хабраюзера\"><img src=\"http://habrahabr.ru/i/panel/user.gif\"></a>";
   		    vHB_newdiv.innerHTML += "&nbsp;<select name=\"lang\" onchange=\"vHB_insLang(this,'" + vHB_nm + "');\" tabindex=\"-1\" style=\"vertical-align: top;\"><option value=\"none\" class=\"title\">Языки:</option><option value=\"bash\">bash</option><option value=\"cpp\">cpp</option><option value=\"cs\">cs</option><option value=\"xml\">xml</option><option value=\"html\">html</option><option value=\"java\">java</option><option value=\"javascript\">javascript</option><option value=\"lisp\">lisp</option><option value=\"lua\">lua</option><option value=\"php\">php</option><option value=\"perl\">perl</option><option value=\"python\">python</option><option value=\"ruby\">ruby</option><option value=\"sql\">sql</option><option value=\"scala\">scala</option><option value=\"tex\">tex</option></select>&nbsp;";
		    vHB_InsertBefore = vHB_Inputs[vHBi].firstChild;
		    vHB_Inputs[vHBi].insertBefore( vHB_newdiv, vHB_InsertBefore );
   			vHB_txtar[0].setAttribute('id', vHB_nm);
			}
		}
	}
}

