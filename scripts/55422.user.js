// ==UserScript==
// @name           PHPClubQuickPostBB
// @namespace      http://userscripts.org
// @author		   adelf
// @description    Plugin for quick posting form in http://phpclub.ru/talk/. Based in SuperHabraImagination(http://userscripts.org/scripts/show/32631)
// @include        http://phpclub.ru/talk/threads/*
// ==/UserScript==

var phpclubBBCodeEditor = function() {
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

function createDelimiter(target, func, title, src) {
    var button = document.createElement('span');
    button.innerHTML = '&nbsp;';
    return button;
}

function createButton(target, func, title, src) {
    var button = document.createElement('div');
    button.style.padding = '1px 3px 1px 3px';
    button.style.margin = '2px 2px 2px 0px';
    button.style.border = '1px solid #000000';
    button.style.display = 'inline';
    button.className = "bginput";
     
    if(title.length == 1)
    {
    	title = '&nbsp;'+title+'&nbsp;';
    }
    
    button.innerHTML = title;
        
	if(func!="")
	{
		button.style.cursor = 'pointer';
		button.addEventListener("click", func, false);
	}
    return button;
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
	var textarea =  document.getElementById("ctrl_message");
	insert_tag(textarea, "[B]", "[/B]");
}
insert_text_i = function (event){
    var textarea =  document.getElementById("ctrl_message");
	insert_tag(textarea, "[I]", "[/I]");
}
insert_text_u = function (event){
    var textarea =  document.getElementById("ctrl_message");
	insert_tag(textarea, "[U]", "[/U]");
}
insert_text_quote = function (event){
  var textarea =  document.getElementById("ctrl_message");
	insert_tag(textarea, "[QUOTE]", "[/QUOTE]");
}
insert_text_code = function (event){
   var textarea =  document.getElementById("ctrl_message");
	insert_tag(textarea, "[PHP]", "[/PHP]");
}
insert_text_image = function (event){
   var textarea =  document.getElementById("ctrl_message");
	var cur = getCursor(textarea);
		var hreff=window.prompt("Введите URL картинки", '');
		if(hreff)
		{
			var regexx = new RegExp('([A-Za-z][A-Za-z0-9+.-]{1,120}:[A-Za-z0-9/](([A-Za-z0-9$_.+!*,;/?:@&~=-])|%[A-Fa-f0-9]{2}){1,333}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*,;/?:@&~=%-]{0,1000}))?(gif|jpg|png|bmp))');
			if (hreff && hreff.match(regexx)) 
			{
				insert_tag(textarea, '<img alt="image" title="image" src="'+hreff+'" />', "");
			}
			else alert("Это не картинка, точно");
		}
}

insert_text_link = function (event){
   var textarea =  document.getElementById("ctrl_message");
	var cur = getCursor(textarea);
	var hreff=window.prompt("Введите URL ссылки", '');
	if(hreff)
	{
		var regexx = new RegExp('([A-Za-z][A-Za-z0-9+.-]{1,120}:[A-Za-z0-9/](([A-Za-z0-9$_.+!*,;/?:@&~=-])|%[A-Fa-f0-9]{2}){1,333}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*,;/?:@&~=%-]{0,1000}))?)');
			
		if (hreff && hreff.match(regexx)) 
		{
			if (cur.start!=cur.end)
					insert_tag(textarea, '[URL="'+hreff+'"]', "[/URL]");
			else
				insert_tag(textarea, '[URL="'+hreff+'"]ссылка', "[/URL]");
		}
		else alert("Это не URL, точно");
	}
}
	
	var allReply = document.getElementById("ctrl_message");
	
	if (allReply)
	{
		editDiv = document.createElement('DIV');
		editDiv.id = 'phpclubBbEditor';
		editDiv.style.padding = '2px';
		editDiv.style.width = '100%';
		
		allReply.parentNode.insertBefore(editDiv, allReply);	
		
		editDiv.appendChild(createButton(allReply, insert_text_b, 'B'));
		editDiv.appendChild(createButton(allReply, insert_text_i, 'I'));
		editDiv.appendChild(createButton(allReply, insert_text_u, 'U'));

		editDiv.appendChild(createDelimiter(allReply));
		
		editDiv.appendChild(createButton(allReply, insert_text_code, 'PHP'));
		editDiv.appendChild(createButton(allReply, insert_text_quote, 'Quote'));
		
		editDiv.appendChild(createDelimiter(allReply));
		
		editDiv.appendChild(createButton(allReply, insert_text_link, 'http://'));
		editDiv.appendChild(createButton(allReply, insert_text_image, 'IMG'));
	}
}
phpclubBBCodeEditor();