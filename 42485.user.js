// ==UserScript==
// @name           UnPost
// @namespace       http://unsorted.me/
// @description   Добавляет дополнительную панель форматирования в область редактора записи блога (версия 2.0.17).
// @version       2.0.17
// @include       http://unsorted.ru/*
// @include       http://unsorted.me/*
// @include       http://unsorted.me/*
// @include       http://unsorted.philip.bz/playground.html
// @include       http://philip.progtech.ru/unext/playground.html
// @exclude      http://unsorted.ru/inform_submit.php*
// @exclude      http://unsorted.me/inform_submit.php*
// @include       https://unsorted.ru/*
// @include       https://unsorted.me/*
// @include       https://unsorted.me/*
// @include       https://unsorted.philip.bz/playground.html
// @include       https://philip.progtech.ru/unext/playground.html
// @exclude      https://unsorted.ru/inform_submit.php*
// @exclude      https://unsorted.me/inform_submit.php*
// ==/UserScript==


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
    img.style.margin = "2px";
    img.className = "null-image";
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
	var textarea =  document.getElementsByTagName('textarea')[0];
	insert_tag(textarea, "[b]", "[/b]");
}
insert_text_i = function (event){
	//var img = event.currentTarget;
    var textarea =  document.getElementsByTagName('textarea')[0];
	insert_tag(textarea, "[i]", "[/i]");
}
insert_text_u = function (event){
	//var img = event.currentTarget;
    var textarea =  document.getElementsByTagName('textarea')[0];
	insert_tag(textarea, "[u]", "[/u]");
}
insert_text_s = function (event){
	//var img = event.currentTarget;
	var textarea =  document.getElementsByTagName('textarea')[0];
	insert_tag(textarea, "<s>", "</s>");
}
insert_text_size = function (event){
    var textarea =  document.getElementsByTagName('textarea')[0];
	var myImg = prompt("Укажите размер шрифта (примеры ниже):\n7 - очень маленький\n9 - маленький\n18 - большой\n24 -огромный\n29 - максимально возможный","11");
	if (myImg != null) {
		insert_tag(textarea,'[size=' +myImg+ ']', "[/size]");
	}
}
insert_text_color = function (event){
    var textarea =  document.getElementsByTagName('textarea')[0];
	var myImg = prompt("Укажите цвет шрифта (примеры ниже):\nred - красный\ngreen - зелёный\nblue - синий\n...","black");
	if (myImg != null) {
		insert_tag(textarea,'[color=' +myImg+ ']', "[/color]");
	}
}
insert_align_left = function (event){
	//var img = event.currentTarget;
	var textarea =  document.getElementsByTagName('textarea')[0];
	insert_tag(textarea, "[align=left]", "[/align]");
}
insert_align_center = function (event){
	//var img = event.currentTarget;
	var textarea =  document.getElementsByTagName('textarea')[0];
	insert_tag(textarea, "[align=center]", "[/align]");
}
insert_align_right = function (event){
	//var img = event.currentTarget;
	var textarea =  document.getElementsByTagName('textarea')[0];
	insert_tag(textarea, "[align=right]", "[/align]");
}
insert_align_width = function (event){
	//var img = event.currentTarget;
	var textarea =  document.getElementsByTagName('textarea')[0];
	insert_tag(textarea, "[align=width]", "[/align]");
}
insert_quote = function (event){
    var textarea =  document.getElementsByTagName('textarea')[0];
	
	textarea.focus();
	
	var scrtop = textarea.scrollTop;
	var cursorPos=getCursor(textarea); 
	if (cursorPos.start==cursorPos.end)
	{	
		var autor = prompt("Введите автора цитаты (обязательно):","автор цитаты");
		var quote = prompt("Введите текст цитаты (либо оставьте поле пустым, чтобы добавить текст позже):","");
		if (autor != null) {
			insert_tag(textarea,'[quote="' +autor+ '"]' +quote+ '[/quote]', "");
		}
	}
	else{
		insert_tag(textarea,"[quote]","[/quote]");
	}
}
insert_off = function (event){
	//var img = event.currentTarget;
	var textarea =  document.getElementsByTagName('textarea')[0];
	insert_tag(textarea, "[off]", "[/off]");
}
insert_code = function (event){
	//var img = event.currentTarget;
	var textarea =  document.getElementsByTagName('textarea')[0];
	insert_tag(textarea, "[code]", "[/code]");
}
insert_hide = function (event){
	//var img = event.currentTarget;
	var textarea =  document.getElementsByTagName('textarea')[0];
	insert_tag(textarea, "[hide=Нажмите, чтобы увидеть скрытый текст]", "[/hide]");
}
insert_cut = function (event){
	//var img = event.currentTarget;
	var textarea =  document.getElementsByTagName('textarea')[0];
	var myCut = prompt("Введите текст (кнопка 'Отмена', вставит пустой тег):","Читать дальше...");
	if (myCut != null) {
	    insert_tag(textarea, '[cut]' +myCut+ '[/cut]', "");
	 }
	 else {
	    insert_tag(textarea, "[cut]", "");
	 }
}
insert_hr = function(event) {
	//var img = event.currentTarget;
	var textarea =  document.getElementsByTagName('textarea')[0];
	insert_tag(textarea, "<hr>", "");
}
insert_link = function(event) {
	//var img = event.currentTarget;
	var textarea =  document.getElementsByTagName('textarea')[0];
	//insert_tag(textarea, '<a href="', '" target="_blank"></a>');
	
	textarea.focus();
	
	var scrtop = textarea.scrollTop;
	var cursorPos=getCursor(textarea); 
	if (cursorPos.start==cursorPos.end)
	{	
		insert_tag(textarea, '<a href="', '" target="_blank"></a>');	
	}
	else{
		var txt_pre=textarea.value.substring (0,cursorPos.start);
		var txt_sel=textarea.value.substring(cursorPos.start,cursorPos.end);
		var txt_aft=textarea.value.substring(cursorPos.end);
		
		reg_exp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

		if(reg_exp.test(txt_sel)){
			var myCut = prompt("Введите имя веб-сайта (если поле оставить пустым,\nименем ссылки станет цель назначения):");
			if((myCut!=null)&&(myCut!="")){
				txt_sel = '<a href="'+txt_sel+'" target="_blank">'+myCut+'</a>';
			}
			else{
				var reg_exp1 = /\/$/;
				txt_sel = txt_sel.replace(reg_exp1,"");
				
				var ss1 = txt_sel.split('/');
				txt_sel = '<a href="'+txt_sel+'" target="_blank">'+ss1[ss1.length-1]+'</a>';
			}
		}
		else{
			var myCut = prompt("Введите URL:","http://");
			if((myCut!=null)&&(myCut!="")){
				txt_sel = '<a href="'+myCut+'" target="_blank">'+txt_sel+'</a>';				
			}
			else{
				txt_sel = '<a href="" target="_blank">'+txt_sel+'</a>';
			}
		}
		
		textarea.value = txt_pre+txt_sel+txt_aft;
		var nuCursorPos=String(txt_sel).length;
		setCursor(textarea,nuCursorPos,nuCursorPos);
	}
	if (scrtop) textarea.scrollTop=scrtop;
	
}
insert_linkIt = function (event){
	//var img = event.currentTarget;
	var textarea =  document.getElementsByTagName('textarea')[0];
	var myLink = prompt("Введите URL:","http://");
	var name = prompt("Введите имя веб-сайта:");
	if (myLink != null) {
		insert_tag(textarea, '<a href="' +myLink+ '" target="_blank">' +name+ '</a>', "");
	}
}
insert_linkImg = function (event){
    var textarea =  document.getElementsByTagName('textarea')[0];
	var myImg = prompt("Введите URL картинки:","http://");
	if (myImg != null) {
		insert_tag(textarea,'<img src="' +myImg+ '" />', "");
	}
}
insert_list_not_number = function (event){
	var textarea =  document.getElementsByTagName('textarea')[0];
	
	textarea.focus();
	
	var scrtop = textarea.scrollTop;
	var cursorPos=getCursor(textarea); 
	if (cursorPos.start==cursorPos.end)
	{	
		var text_add= '[list]';
		for(var b=1;b<100;b++){
			var myList1 = prompt("Введите "+b+" элемент списка","");
			if (myList1 != null) {
				text_add = text_add + '[*]' +myList1+'\n';
			}
			else {
				break;
			}
		}
		text_add = text_add + '[/list]'+'\n';
		
		var nuCursorPos=cursorPos.start+text_add.length;
		textarea.value = textarea.value.substring(0,cursorPos.start)+text_add+textarea.value.substr(cursorPos.start);
		setCursor(textarea,nuCursorPos,nuCursorPos);	
	}
	else{
		var txt_pre=textarea.value.substring (0,cursorPos.start);
		var txt_sel=textarea.value.substring(cursorPos.start,cursorPos.end);
		var txt_aft=textarea.value.substring(cursorPos.end);
		
		txt_sel = '[list]'+'[*]'+ txt_sel.replace(/\n/g,'\n'+'[*]')+'[/list]';
		
		textarea.value = txt_pre+txt_sel+txt_aft;
		var nuCursorPos=String(txt_sel).length;
		setCursor(textarea,nuCursorPos,nuCursorPos);
	}
	if (scrtop) textarea.scrollTop=scrtop;
}
insert_list_number = function (event){
	var myType_s = prompt("Выберите тип списка (1 - числовой, 2 - буквенный)","1");
	if((myType_s=='1') || (myType_s=='2')){
		var textarea =  document.getElementsByTagName('textarea')[0];
		
		textarea.focus();
		
		var scrtop = textarea.scrollTop;
		var cursorPos=getCursor(textarea); 
		if (cursorPos.start==cursorPos.end)
		{	
			var text_add;
			switch(myType_s) {
				case '1': {
					text_add = '[list=1]';
					break;
				}
				case '2': {
					text_add = '[list=a]';
					break;
				}
			}
			for(var b=1;b<100;b++){
				var myList1 = prompt("Введите "+b+" элемент списка","");
				if (myList1 != null) {
					text_add = text_add + '[*]' +myList1+'\n';
				}
				else {
					break;
				}
			}
			text_add = text_add + '[/list]'+'\n';
			
			var nuCursorPos=cursorPos.start+text_add.length;
			textarea.value = textarea.value.substring(0,cursorPos.start)+text_add+textarea.value.substr(cursorPos.start);
			setCursor(textarea,nuCursorPos,nuCursorPos);	
		}
		else{
			var txt_pre=textarea.value.substring (0,cursorPos.start);
			var txt_sel=textarea.value.substring(cursorPos.start,cursorPos.end);
			var txt_aft=textarea.value.substring(cursorPos.end);
			
			switch(myType_s) {
				case '1': {
					txt_sel = '[list=1]'+'[*]'+ txt_sel.replace(/\n/g,'\n'+'[*]')+'[/list]';
					break;
				}
				case '2': {
					txt_sel = '[list=a]'+'[*]'+ txt_sel.replace(/\n/g,'\n'+'[*]')+'[/list]';
					break;
				}
			}
			
			textarea.value = txt_pre+txt_sel+txt_aft;
			var nuCursorPos=String(txt_sel).length;
			setCursor(textarea,nuCursorPos,nuCursorPos);
		}
		if (scrtop) textarea.scrollTop=scrtop;
	}
}
insert_ver = function (event){
	var textarea =  document.getElementsByTagName('textarea')[0];
	window.open('http://unsorted.philip.bz/changelog.html');
}

var func = function() {
	
	var url_name = document.location.href;
	
	var allReply = document.getElementsByTagName('textarea')[0];
	
	if (allReply != null) {
		editDiv = document.createElement('DIV');
		editDiv.style.marginTop = '0px';
		editDiv.style.paddingRight = '4px';
		editDiv.style.width = '100%';
		
		allReply.parentNode.insertBefore(editDiv, allReply);
		
		editDiv.appendChild(createButton(allReply, "insert_text_b", "Жирный", 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALxJREFUeNpi/P//PwMlgImBQjDwBrDATWICm6UNxI041L4G4nogfgXi/Pv3D6sLrgLxNCBmhuIGIA4B4jVALAHETjhdgATeADErmheZoGJMxBjAiGRANxYXEgxEkAFsUNwPxOVAvAzKrwBiLkIGMCEZAAqwC0B8GcqXA2INrF4ApUhGRpDlDDJAzA4zDCqOLPYJxbmwpAxUxAmkrIB4Hp5onw/EM4H4G1DfR2wG8CAFIC7wH6sBQzcvAAQYAFMGMSibVtAlAAAAAElFTkSuQmCC'));
		editDiv.appendChild(createButton(allReply, "insert_text_i", 'Курсив', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJlJREFUeNpi/P//PwMlgImBQjDwBrBgmMgEN1MbiBvRpOv//ft3FUUEFIjImJGRERnrAPF6IO6BiaGrZyLCi6xAvJDcMLAA4j9AfJlcA/yBeCe5sWAExAJAfAI5vAjGAiwggaAIiNmBfGa8bkQPVSCwBeKHaNgdiMWhBqLGGrqzgLZzAyk+EBPNrr9A/AGo/ieK+qGfmQACDABdr1fBOdq53gAAAABJRU5ErkJggg=='));
		editDiv.appendChild(createButton(allReply, "insert_text_u", 'Подчеркнутый', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALRJREFUeNpi/P//PwMlgImBQkCxASwopjExhQGpMCSheijdiCz279+/q3AeKAxgmJGREYSdgHgdlIaJ6SCLIevB5oXXUJe9RhK7gkUMZxgwAjEzlEYG2MRwGsCKRTErKQawYFHMQqwBn6G2qSCJGULFPmPYhpwSgdEIY6YCcTKa2rlAPBvEAEYjdgNAUYRMowOYWmQ9LGhq+IH4KoH8oQPEH3AZAAJGOMRB4C/eMBiQzAQQYABWeD2iSgCteAAAAABJRU5ErkJggg=='));
		editDiv.appendChild(createButton(allReply, "insert_text_s", 'Зачеркнутый', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAANpJREFUeNpi/P//PwMlgImBQkCxASwopjHBzbMB4nQg5oTyrwKxNhAXAfGjf//+EXRBFhC/BOI0KAapYwZpxusCJPASquEdlD8FiHWwKWREjgUkL4gDcQ0QfwfiXqiBcIDsBXQD9hATcEADXOAckAEwzMjIiI4lgHgiEM8GYkmYOLIeXAZ4I2sA4vlQjGEASiDCDAGCFiA+B+RXgP3JyMgBpORgavDFAidQASi0RYBYEmQIVNNXINUDxEJA/AmI/2ANRKBNoITDB41CbOAHyACgHuwGDM3MBBBgANhbZ2CYxiPdAAAAAElFTkSuQmCC'));
		editDiv.appendChild(createButton(allReply, "", '', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAQCAYAAADedLXNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACRJREFUeNpi/P//PwM6YGLAAuCCJSUl/4lTOWwEGYkOJYAAAwAPIwh0s3BVXwAAAABJRU5ErkJggg=='));
		editDiv.appendChild(createButton(allReply, "insert_text_size", 'Размер текста', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAMlJREFUeNpi/P//PwMlgImBQjDwBrCATWHCMGc6lM7EpfHfv384XSAPxL+AWALKRgY6QLweSuM0wAWITwIxK5SNDDqA+D2UhgBQNDIyMiLjRUCsCMS1UDYDNgzSB8LoLlAC4t9AzA/Ej4FYFioGA/uBeDmUxuqCXCA+ioZzkeQNoWKGMBcwwFIiVMFmIFZB0tAFFUNWg+IFmAGcQLwKiB9CaSkgdofyYWJcyIbADGCEeoETqoAdR7SDwuUrEH9D9jrYwKGfmQACDABnjk+ft8DnfwAAAABJRU5ErkJggg=='));
		editDiv.appendChild(createButton(allReply, "insert_text_color", 'Цвет шрифта', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAOhJREFUeNpi/P//PwMlgImBQkCxAYxAgE9+OpTOJMcF8kD8C4gloGySDXAB4pNAzAplk2yAPRAfhxpiT6oBSkD8G4j5gfgxEMtCxTAN+Jc6gwGUFtDSgzcQawDxVCBOBWI2qBgYwNT/cylHdQGSIW5AHA/E1lB8FCqGbhGGFziBClYBsR4QtwGxFBC7A3E4VGwVUA0XsgYWEHHAp4ih4ewWhgPPb8HinB1JzWUgtoSyQeHC4CAkz9CgbAtJSP/TZoLcxcDw7x8q/vsXgtHZaBjkhQMgr5GJDzDhi2MigD3IgIMUGHAQIMAA7Yp6h4QulgwAAAAASUVORK5CYII='));
		editDiv.appendChild(createButton(allReply, "", '', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAQCAYAAADedLXNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACRJREFUeNpi/P//PwM6YGLAAuCCJSUl/4lTOWwEGYkOJYAAAwAPIwh0s3BVXwAAAABJRU5ErkJggg=='));
		editDiv.appendChild(createButton(allReply, "insert_align_left", 'Выравнивание по левому краю', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAKdJREFUeNpi/P//PwMlgImBQsACNoUJbE4jEGsBMSMUM2FhM0HxZSAu/ffvHwMjyAtQA0gGIANYkPhrsdiGbKsHNkOo6oKNaDYis7Fha6q7YBsBW22pEgbICQ/ERnbBbgJ+BmE2IGYHYg4gViDZBejJHu4CIIOfkZGxF8hUx2IrK1D+HpDOgekD4p9A/AWIf4FdANTMD+RwEpk34AYA9UIMGNDcCBBgALGuSQpQmm4MAAAAAElFTkSuQmCC'));
		editDiv.appendChild(createButton(allReply, "insert_align_center", 'Выравнивание по центру', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAKxJREFUeNpi/P//PwMlgImBQsACNoUJbE4jEGsBMSMUM2FhM0HxZSAu/ffvHwMjyAtQA0gGIANYsIhvwGErjO2KrJiqLtiIw0Zc2JrqLoCBnQRstqQoDJATHoiN7ILdBGwGYTYgZgdiDiBWINkF6Mke7gIggxlI8QIxJyMjYzuQVkeylRUozwG19SYQJwLxHyD+DMTfwS4AaoIbAI0+QgBsAFAvxIABzY0AAQYAM/NHCj6ujcIAAAAASUVORK5CYII='));
		editDiv.appendChild(createButton(allReply, "insert_align_right", 'Выравнивание по правому краю', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAK1JREFUeNpi/P//PwMlgImBQsACNoUJbE4jEGsBMSMUM2FhM0HxZSAu/ffvHwMjyAtQA0gGIANY8MhvRrMVmQ3CjiBFVHXBRgI2omNrqrsAHezFYzszEJtQ5AKQPhBGdsFuAn4GYTagJnYgzQHECiS7AD3Zw10AZIBM4AJibljqZGRk7ARS6kDMCpTngNoKsp0VmhJDgfgN2AVAxRgGEHIMEP8C6oUYMKC5ESDAAGKlSAddqurDAAAAAElFTkSuQmCC'));
		editDiv.appendChild(createButton(allReply, "insert_align_width", 'Выравнивание по ширине', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALBJREFUeNpi/P//PwMlgImBQsACNoUJbE4jEGsBMSMUM2FhM0HxZSAu/ffvHwMjyAtQA0gGIANYkPhrsdiGbCsyG4QdQZqo6oKNBGxEx9ZUd8E2ImyFYWYgNqHIBSB9IIzsgt1E2MwG1MQOpDmAWIFkF6Ane7gLgAxmRkbGyUCmLhZbWYHyHFBbQbazAvEFIPYF4u9gFwA1gwKFF4g5oQFJCPwB4s9AvRADBjQ3AgQYAIOVSAdZa5U/AAAAAElFTkSuQmCC'));
		editDiv.appendChild(createButton(allReply, "", '', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAQCAYAAADedLXNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACRJREFUeNpi/P//PwM6YGLAAuCCJSUl/4lTOWwEGYkOJYAAAwAPIwh0s3BVXwAAAABJRU5ErkJggg=='));
		editDiv.appendChild(createButton(allReply, "insert_quote", 'Цитата', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAKFJREFUeNpi/P//PwMlgImBQjAMDGAABSIIMzMzw7AEEO8F4ngcfLgeEMbmgnggfgnEC3HwCXrBG4h3I0UvnA/C//79Q1HMCFMIchoUnIDS54A4C52PbggLjAESZGICO4gdKmQJpVH46AkP2QvMQEP4gfRaIOYF4nVAvhSIRuILIluK4gVGRkaQH3iAmAvExRFp34H4M1DPHwwDRnBSBggwAOBZUhm1ZXdkAAAAAElFTkSuQmCC'));
		editDiv.appendChild(createButton(allReply, "insert_off", 'Оффтоп', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAP5JREFUeNrE08FKAlEUxvG5Q5tU6BGicuWihVBgBSIuXLkSfA13QqsKeo0epE2LFhIELSICF4L5CqKunOl/5Bu82DgJs/DAD87cmXuY+zHj4jgO8lQY5KzcAw5WU8LUOV2xmuIeP/4DURQFgWXgnNt0jDvv+gL9zeds77YjXOIbh/KFU/U7ZXCDd5zLAhP1/w44UTZjtMTqxeszB1xhgAKqYv0nyurXlRLiE85SgjWPuM4KsazXH6GHN7nV/We0/xzBJumTbuAVRTQ9Ne7b2gcq1ie/QOgNKrHYwQOGGONILNCh1i2TerLXKYNQ4RSSrzOjlphhzt7I7f1v/BVgALUnZu8gK13GAAAAAElFTkSuQmCC'));
		editDiv.appendChild(createButton(allReply, "insert_code", 'Код', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAANZJREFUeNrUk70KwjAUhRMpgoK6NZa+hE8jpbiUDr6GvkRBcOjq4tjJ3ScSQYV4IseSxoYOmQx8tPfv9N5wK7XWIuSMROAJFhBmBCmlyxpUll3R18n7jN8jkIEDiC1fTF82JJCDI1A9XSnGcp/ABtSeYlukZm5HYAUufIoB2ly3gwKcQGJs9zAnYU7hu4MSnE1ij0DCWPlzB85XtqCBmVr1qfEx1lkBWyACM6DAHlzBHCz4vgNL2lG7Q98R6JyAKTf0CR6mMcbGpgbcwQ28WoH//pneAgwAE6VdVO+LqWsAAAAASUVORK5CYII='));
		editDiv.appendChild(createButton(allReply, "insert_hide", 'Скрытый текст', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAdhJREFUeNrUk01LAlEUhu845QdRUxZBhIIWtFBso2AwRAVNLqKltHCb63b9A/9AixZCELhyYdAmEyYCBcOlNa1CSQoxog/DMY3x9p5B27Zw1YGH8XrO+55759wROOdsmLCwIWNoAwFh/ugfZQKsAQV4gbNf9woqIAeuQHOgGxgIMNix2Wx7iqIsxmKxWU3TxgqFgpWSsix3fT5fK5VKPedyuftOp5OE7oz60hHsYD8UCh3k83k5k8ksGYYx5XK5rK2WzgiIrPQf5aiGakljakVRjKDrZaPR6Oi6zglVVTlFMnnMZXmdK8o2x674IE+1pCHtCFx2w+GwE9u3drtd81yJRAKdDXZ4eGSuFxb87PHxjg3yVEsaNNolg5NSqTTVbDaX7Agq8Hg8TFWLbGVl0xTY7TY2Our5NfhCQPNAWtFisdSr1WqvWCwawWBwRpKkcZyXadoN83qXmSQ50V1jGxurpnGlUqnH4/FzvItTmoo5ApjQNMIOh2MrEon4o9Gov1arzZXL5XHKBwKBT7fbXU+n07fZbPa23W5f4BVd93o9TgYimATTMHHCbB5PN9ZSf0LmrsEHRDWInvB8w/oFvAv920iFDkBzF/64fHTjvoFOxsL//5h+BBgAwjbgRLl5ImwAAAAASUVORK5CYII='));
		if (url_name.search("entry") != -1) {
		editDiv.appendChild(createButton(allReply, "insert_cut", 'Разрыв страницы', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAflJREFUeNqMU78vQ1EUPvf1Vv16IkGiJO0kIUgkYhGhSmwmC4uZf4BJJBgwGqSDSYJFYhRpNK1NhDwxGBCig0Q0RUv7ft3nnOuVLuKd5Nzbc975vp5z73dZ7+QklNnc2d7emhACHAyE44CDTjvlhPvbxzlEpqfnsWSdW5ZVTsAYLgquVCh3iumLgqsQsojyiKNS4IWPj3IC/s3CJOgvEkIiTtbywIQOz1ufJYLAbytMgmkE5u6SFEkY+ls2K2t5RVgBp9mAwp1JRenazs5V8GBIkiZi1hsfBbNYhNdjHZP0T+DJ5GFRB44QBBmuHwkkfX5/ElmHvBBgtynERlj7ft8DxmEipXzHYLenDq5PrmQj/D2TCVfW1AxTZOp66vQg6akD1EJK8fmAG7rOkACCmQ6wTTNi29a/4PuqC6igWyUCSrSlB0AtNNF1jWMY/AefCOV7btPq5TdBvRmE2s9GlK6Ubcv24mLMsG0wyVE0titnMk3TYDsen6HZW1+7bqQ2ujNjILDYdUaax1GkG3i9pNR8Pg+5XE7u+0tLMawbocbBPXlpjaEQ9E9Nze4uL28aCCYZUxdFIsL3YiFxIpH4mWNjZ2fh6fx8hZcSL4+PDcisKK6Eyfw4448hSTQaleOoqgpHmpa9OTxsYmWHU41eV3o3HozeWO5LgAEAi8wAg/6EZTsAAAAASUVORK5CYII='));
		}
		editDiv.appendChild(createButton(allReply, "", '', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAQCAYAAADedLXNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACRJREFUeNpi/P//PwM6YGLAAuCCJSUl/4lTOWwEGYkOJYAAAwAPIwh0s3BVXwAAAABJRU5ErkJggg=='));
		editDiv.appendChild(createButton(allReply, "insert_list_not_number", 'Список', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAM5JREFUeNpi/P//PwNFAGQAIyNjGBCvgdIMpGAWqDkRZWVlgV1dXUxA9iqo2BogZkTCTGjsK0BcDnNBBBBvgNIkuYARZAATExPZQcDEQCGAGRALxDuhNEkAFojxGRl5zjNmTGIGshdDxbYhBRgubA0LxEQgPgCl6RuILNgSFgiATMclhy0Q04H4DJQmPSkDwc2wsHQQ4yZUWADogiNAfAyITwDxKSA+C019d4D4CRDvAWJBRmggFgM5INwLxQJAzEWE/d8ZKc2NFKdEgAADAFgJQrQzuJasAAAAAElFTkSuQmCC'));
		editDiv.appendChild(createButton(allReply, "insert_list_number", 'Нумерованный список', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAMxJREFUeNpi/P//PwNFAGQAIyNjIxCvAWJBIGYgCYMMYGJiApm1DohTgPgd1Ow1QMyIhJnQ2FeAuJwFyTFMaI4LIcYHME1tUHYJqUGA7AWyAExnFxDvgNJku8AJiJOAOAYqtw0pwHBha1g0JgDxDCCWIDUaYV4wBGJNIF4JZdMmELGlWlg6mA7EklBsDvUWUYbCDJgLxI1AHAjlCwDxFrQAYwZidiDmgOIbQBzKiGQbSHM+EDtADeAiwgHfYf5aC8TPgbiYrHRACQAIMABAHzmmSdUHSAAAAABJRU5ErkJggg=='));
		editDiv.appendChild(createButton(allReply, "", '', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAQCAYAAADedLXNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACRJREFUeNpi/P//PwM6YGLAAuCCJSUl/4lTOWwEGYkOJYAAAwAPIwh0s3BVXwAAAABJRU5ErkJggg=='));
		editDiv.appendChild(createButton(allReply, "insert_hr", 'Горизонтальная линия (xhtml)', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAZZJREFUeNpi/P//PwMTExMDEmgEYi0gZsSCrwJxNUzhv3//GBixGEA0ABnAgkV8LZqtTFDaF6aAX8KCwdBrA4QDckFq+1sGSUVrBkZGRqKwvEEhg2PyS7BeuAv07AsZXjw4BmJuQLIV5gImJLYrv7g53LlwA8TkLRgCi28wXDzQF/Dr10+G379/M/z58wfoz/9gfUxMrAzMzGwMsnr5DBwcvBgGHABiexBDyTiV4cuXTwxfv35j+PHjB9CQ/0BnszCwsHAysLHxIofVQSB2gBlgnxogAqREiI6B+ikf7ZFdcHD2hjf2X79+Zfj8+TNeF7Cz84K9wMrKdRDZAAcQ8fbJaYYndw4zYAsDHlFjBjZxKwyXwAPx1cMTDIdWxoKY+5BCHo7f31tp8VM9iUFQ0oaBQ9YBYQIoLo1dygmmA2QgIGHJoGhUCtYLTspoio5gcQErUB07kOYAYgVky+EGgAC6TcgKcYnDwgBkCxdQgAtoSB+QrYFm600gTgTi30D8E4p/gcyAuQBsABSz4Il+FAOAev8DBBgAzcWoij98aXYAAAAASUVORK5CYII='));
		editDiv.appendChild(createButton(allReply, "", '', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAQCAYAAADedLXNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACRJREFUeNpi/P//PwM6YGLAAuCCJSUl/4lTOWwEGYkOJYAAAwAPIwh0s3BVXwAAAABJRU5ErkJggg=='));
		editDiv.appendChild(createButton(allReply, "insert_link", 'Выделенный текст в ссылку и наоборот (xhtml)', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVBJREFUeNpi/P//PwMlgImBQjDwBrD4+fkxsLGxGTMyMuoA+RxIcj+A4XMFxMAl9+vXr7MsQIapiIiIR3x8fJy4uLgS0DCmv3///nvx4sWDysrKeSDVra2tCehy8+fPX/D06VMmRldX19Ta2pryffv2vZw0afKpT58+/W5paSkVFBREcer79+8Zampquvn4+Fjz8nLNnJycxJubWzpZvn79yisoKCQDNHHJx48fG4DO7bKysmQAugqIRUHOB2t+8+YN2CCgmkKg2obg4JAKkF6QAX/u33/6PD4+1WzSpN6iz58/f9y6dRvWAAN69yMvL28RSC1ID0gvI1DASVZWPqSoqNJXQ0NHUkBAiPnr1y9/r1698Lynp3UzSCMuucePH65hBMoLMTMzuwKdqo0lpG9CY0Edi9xVYIDuBhnACcS8oCglMQn8AeLPjKN5gQEgwAAKfLCMgdNQ/QAAAABJRU5ErkJggg=='));
		editDiv.appendChild(createButton(allReply, "insert_linkIt", 'Ссылка с именем (xhtml)', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAexJREFUeNpi/P//PwMlgImBQjDwBrD4+fkxsLGxGTMyMuoA+RxIcj+A4XMFxMAl9+vXr7MsQIapiIiIR3x8fJy4uLgS0DCmv3///nvx4sWDysrKeSDVra2tCehy8+fPX/D06VMmRldX19Ta2pryffv2vZw0afKpT58+/W5paSkVFBREcer79+8Zampquvn4+Fjz8nLNnJycxJubWzpZvn79yisoKCQDNHHJx48fG4DO7bKysmQAugqIRUHOB2t+8+YN2CCgmkKg2obg4JAKkF6QAX/u33/6PD4+1WzSpN6iz58/f9y6dRvWAAN69yMvL28RSC1ID0gvI1DASVZWPqSoqNJXQ0NHUkBAiPnr1y9/r1698Lynp3UzSCNMburv2cznP15gkP4j/vt53c05jx8/XMMIlBdiZmZ2BTpVG0tI34TGgjpI7k8PX1xKXLL4nCVznzMXfiwEBuhuFqDEdyBjP5A+jDOyS3j9GNRYNICeePnx70dxBo7/r/9O56tiuP3HnZFgSingYWBQZTnjGORkjC61f92+s/gNcGeH4P8MM4EYbIBOmL7xlVUXz4LlGRnOshCVXv8zpDP8Aeba3//PvPv7DujpfwwMrIwmDCyMDCxEJ/qXvxiAhpx91nULmAEYz4I0M0izMwAEGAD1+eDu3JbpnQAAAABJRU5ErkJggg=='));
		editDiv.appendChild(createButton(allReply, "insert_linkImg", 'Ссылка на изображение (xhtml)', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAaRJREFUeNqkk7tKA0EYhc/Mzm5MNFnBa+IFiSlFBa3FSrGwMSD4BvoQgmDpA/gU2gRfwMrCRglqFUIKIcZL1kvU3ZlZ/1nvaKHJFDuw7Pft4cw/LAxDtLI4WlxieWNjkfZMk/y5UEoN7GxubjdD59fX14SSkmnq4Wi351/wxFINhhVSSq5I4DjOL58xMEZPzj7ehDqE6d0whhUyCCLBcbEfQ4M+MunHT5xobnGINhvcEdC+hHwKoJV+FRAbCaTWKBTaIOwk5ucamJ15eBVwguMxuNksnJQL/9aDVypBPj7DMJEgMAKyVcpluK6LvUIS3k0c6QzD4BBH33ASPalRkimSpODEL8AkwcQEkcD3uSLb9HSd/lmHZVmoVjtQq3GcnlnoHfCw0BVH/4iLakXjcN9Du+1hclzDsB8J8vnYl/Ke3jsk4R2qJ1e4Pxd4qEt0dygohW8JLE0JDg4aP8+A2qdAyI5xuJLBuwxRKupIkMtHCSxRv752LNvGytbVn85/6m03jGFZey63yhOJ4WYmUTcaFTMhZoI6zb34Jy9N66zV6/wiwABLmM1wKAsCqwAAAABJRU5ErkJggg=='));
		editDiv.appendChild(createButton(allReply, "", '', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAQCAYAAADedLXNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACRJREFUeNpi/P//PwM6YGLAAuCCJSUl/4lTOWwEGYkOJYAAAwAPIwh0s3BVXwAAAABJRU5ErkJggg=='));
		editDiv.appendChild(createButton(allReply, "insert_ver", 'Версия скрипта: 2.0.17', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAotJREFUeNqkU0toE1EUvW++SfPppI1daJvGJBKLuvJXhGrBT1s/ULpy46orXRZciAtB3AldunMhguuCn6JZ6EqwIKJF/EIbE0zTNiZpkzBN5s3z3plJGtc+OMOb+9459865d5gQAv5nKc7jyHMASQZgkgKMncDQZUQK0efd+4P4iXgGQiyBsC2wOVjLl1wBbxkAYi4+aEydPDoUi/YFenVN0enANK2d9VKtuvQhd/5XvrKIoXlEpVMBLh+q3hobTcwcSg8karWmlF39DQvzB53D6bmvumEYAxdOp6LLX9aMd++zJHyHtCWXb59Lp6ITqbiRLBbLUr1ex6xmpzTaU6xUqkjJeDi5f8iYIM5uBTafPDwyECsUNlnbVNu2IT21AJxzUFUVLMtyTVMUFo30x1ZW+SR54ggIbiU1BcLlZhMvcqhUa5ixBk/uDaGnDK7ezoPk2gE2otVqhonTVYGFQQsaZguq2yZmx6aoukP2+/0gaz6QJLXzSTaoDqdbYGV9s75db8qGrAUAGwrcMh1yMBgEResBWfF1ebKzTRzauyZyvvjtcz4XChtC84WAoKg9DjkQCDj7dlzVg6KY28wRp7uCzFq+MO5Hxt5EapjjRJGZRKbPoApUPUTG2vkf37OVjY0MTl2GqI7r8vBD6kQE3bzZG91zcTA9si8YiYZU3UdGdEr/9PrVx63Sxgtg8n2c3DLPzroClIWFrwALTiiYZhSHahrvH0D0UxIij1+7cerN4wdv0YwzovbSEltPweG2BdqLafgLqMndARe2DGzwLJZ513lvPBoVrn//CDDPD+qV5kH3oDqQx46BdPw6tOZn8b2MKCG30S0geZA9KF379hnd49RJqgW5rb8CDADJ7ROEbmxrGAAAAABJRU5ErkJggg=='));
	}

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