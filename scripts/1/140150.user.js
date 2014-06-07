// ==UserScript==
// @name           UnPost Ext (for Opera)
// @namespace       http://unsorted.me/
// @description   Добавляет дополнительную панель форматирования к дополнительной панели в область редактора записи блога (версия 1.0).
// @version       1.1
// @include       http://unsorted.ru/*
// @include       http://unsorted.me/*
// @include       http://unsorted.philip.bz/playground.html
// @include       http://philip.progtech.ru/unext/playground.html
// @exclude      http://unsorted.ru/inform_submit.php*
// @exclude      http://unsorted.me/inform_submit.php*
// @include       https://unsorted.ru/*
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
    img.style.margin = "3px";
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

insert_magnet = function (event){
    var textarea =  document.getElementsByTagName('textarea')[0];
	
	textarea.focus();
	
	var scrtop = textarea.scrollTop;
	var cursorPos=getCursor(textarea); 
	if (cursorPos.start==cursorPos.end)
	{	
		var myLink = prompt("Введите URL клипа:","");
		var name = prompt("Введите имя:");
		if (myLink != null) {
			insert_tag(textarea, '[magnet=' +myLink+ ']' +name+ '[/magnet]', "");
		}
	}
	else{
		insert_tag(textarea,"[magnet=","]magnet-ссылка[/magnet]");
	}
}
insert_flv = function (event){
    var textarea =  document.getElementsByTagName('textarea')[0];
	
	textarea.focus();
	
	var scrtop = textarea.scrollTop;
	var cursorPos=getCursor(textarea); 
	if (cursorPos.start==cursorPos.end)
	{	
		var mytube = prompt("Введите URL <a href='#'>клипа</a>:","");
		if (mytube != null) {
			insert_tag(textarea,"[flv=320.240]" +mytube+ "[/flv]", "");
		}
	}
	else{
		insert_tag(textarea,"[flv=320.240]","[/flv]");
	}
}
insert_youtube = function (event){
    var textarea =  document.getElementsByTagName('textarea')[0];
	
	textarea.focus();
	
	var scrtop = textarea.scrollTop;
	var cursorPos=getCursor(textarea); 
	if (cursorPos.start==cursorPos.end)
	{	
		var mytube = prompt("Введите URL клипа:","");
		if (mytube != null) {
			insert_tag(textarea,"[youtube]" +mytube+ "[/youtube]", "");
		}
	}
	else{
		insert_tag(textarea,"[youtube]","[/youtube]");
	}
}
insert_ppt = function (event){
	//var img = event.currentTarget;
	var textarea =  document.getElementsByTagName('textarea')[0];
	var myPPT = prompt("Введите ID-трека:\nhttp://prostopleer.com/tracks/<ID-трека>","");
	if (myPPT != null) {
		insert_tag(textarea, '[flash width=411 height=28 loop=false]http://embed.prostopleer.com/track?id=' +myPPT+ '[/flash]', "");
	}
}
insert_ppp = function (event){
	//var img = event.currentTarget;
	var textarea =  document.getElementsByTagName('textarea')[0];
	var myPPP = prompt("Введите ID-плейлиста:\nhttp://prostopleer.com/#/list<ID-плейлиста>","");
	if (myPPP != null) {
		insert_tag(textarea, '[flash width=419 height=115 loop=false]http://embed.prostopleer.com/list?id=' +myPPP+ '[/flash]', "");
	}
}

var func = function() {
	
	var url_name = document.location.href;
	
	var allReply = document.getElementsByTagName('textarea')[0];
	
	if (allReply != null) {
		editDiv = document.createElement('DIV');
		editDiv.style.marginTop = '0px';
		editDiv.style.paddingRight = '4px';
		editDiv.style.width = '100%';
		
		allReply.parentNode.appendChild(editDiv);
		
		editDiv.appendChild(createButton(allReply, "insert_magnet", 'Magnet-ссылка', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAgxJREFUeNqcU01LG1EUvS+TaONoog1kRqkasxMRVEpsS1fdCH5Ad130B/gHXLhwoXsRBBHjXoMrBRfixqUtpcWFLZFCm8bUkZivEZmvjON4byZRYxIXHri8N/ece959b95jtm0DYYMx4HB0AbQxgCmcjmGEwcFfjH1U7t4AXFn48blc54ZqdNqMLfa8e/2m720kyPvbWyipXMpDiS/f3icPv0+Abc9g6rxSwB500MYYiw5/+vhB6O4R9HShyvmF0AHp1Gn6aGvnAGumsYOrqg6wtanQ6MioPygKF39SN7/icSmRTOaJ6+vtfTnQ39/lfyUK3aj59/UHbXETnC07wH2NdQ4NBjOJ/3B0fCz9jMdjiqqOU9CccsSRxnLOBx4bhJmLa1FVFU5TKVp5GeOsHMuUI4401v3h3htcA3hN03TpKNJ13SwXVnBGOeKKRtFF2noGcK2oYOk6NAJxlqaVtHUNmKpBE67SCMSRpqFBs6IA/4QBcaSpa0CbbtYNaDWMhgbEkcZ8kLu7B9uRSHR8ZW395OQC9pbmYjzPl/I+n680SpK0Prm6Gv0tabBTnInNPjbI5/N3rrIsmxoeVukaY8uEQqFgV3icmzUdZLNZbyAQAJ5XIJfLuTmOcwRuR4K/0SuKInISZDIZd42BYRhyKBRawPfAPB5PDgfnsZRHy7KIn8dvjviax/Rc3AowAJLO/Bu3+ARvAAAAAElFTkSuQmCC'));
		editDiv.appendChild(createButton(allReply, "insert_flv", 'FLV видео', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAjBJREFUeNqMU8uKE0EUPdXVr6Q7yYzzYIwSccaJCxeuxKX/EBIIhGzFjRtx48ZPcCEuJFmGgUBi/sEfEGYhMwZRcFQIIkmMSZvpVJW32k7o6MJpuH2rbp9z6/SpKqaUgmEYDwDsx3GR54MOKeVLMy7s93q9YqlUEs/bb0pCKioxKJ2gIGmgqMYY8Lh+pxdjI+KygUGF95QPwBSC8zAi6ga6h1apx9PxzyTWwPKlc7fbPaTMlZS0EqGZJkmIMEQwneHdySecnp5pLI+xxpqCcrn8kfKNYBJiMp1DLASYIZHLGfglA4RyQWrYEvuvgk6nc113F4rBcixktz3kL2dwLcNxczeFfD4LL+tHCmLsuoJKpaL1HaZzLjitrv95PJtDcgXT4uCmjcLBpSR2rQFvt9tXqtUqf/Xi4YkuDAYD0e/353/vH2NMYwuE/RLN43PQiL8XnzaO7wnJMJ4uIIRaETVOSoHGk7uvadrXNToH91ceHB0d7WklbsoBt0w4roW0Z6/C8x34mVSkNsaumchrtdp3naE4zgMFzgw4jh2FZZpaKkR0PhLYZINWq7WjPZlPZNQgGIUYfp3g29kQw8EIri2xtWVHvsVYnjTRrNfrPyhfJc/JE1LAGVzfhb+Rwo5voLgJzP5g7RhrrhSQQV6z2dygnCEqUkTcLWxiey8H16VVDROfiT0K9f1QmRjrrXaBtuYZjW9R3L7gbTymeEvcR8sGaSpkE57875EUE+JOfwswAK7793iUwCwFAAAAAElFTkSuQmCC'));
		editDiv.appendChild(createButton(allReply, "insert_youtube", 'YouTube видео', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB7klEQVR42p2SyyvEURTHPz+yMULDWJBopjyyEDMksVFjo8RiLP0bZmOFmknZUJrlLJDZUDZ2ylIzRApppmy8YkYeJRH33ENehZzNPbd7zud+z8N5NoYxx3EQ9+38qzkCyGQy+Hw+IpEI4XCYdDqN1+v9O0AcSYxGo4RCIWKxGIFAAAELSICiLJlMEgwGyWaz3wG5XA63222D/H6/VSS+nIlEwib+CHjrw08AKVFU/goQ2V9LkHsqlbJxH5v8CfAfU8DyMoyMwMUlFLugzAP5+ZCXByfHUFIKjY3Q0gydXeZeAgcHmI6/AiorYW0N6usV29AAZ2dwdQXX19DdDdvbUFcH9/cwOQlSjumHAkx97OzAwwP09SlEFJyewuIi7O7CxAQcHsLMjPpmYqyvvwLa2mBzE25vjcwWVbO6ClVVCunvh40NU84J9PTA0xNmPPZ8V7C/r5I7OmB6WiHV1VBYCEtLMDgILpcmirrWVhv/Dtjbg7s7rJrZWVhYwCyEJq2swMAAVFTA1BTImktpsqEWIE2SEgQgsHgcmppgfh7Ky6G3V1VIzNgYHB1Be7tttAKGh2FrCzwerbPUjK2oCM7PVW5trf3NJg4NaX/k07m5D4s0Pg7HZuYFBXBzo+Mym2nt8dHsR7FC5a2mBkZH7dMLe74Q4FLr3WEAAAAASUVORK5CYII='));
		editDiv.appendChild(createButton(allReply, "", '', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAQCAYAAADedLXNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACRJREFUeNpi/P//PwM6YGLAAuCCJSUl/4lTOWwEGYkOJYAAAwAPIwh0s3BVXwAAAABJRU5ErkJggg=='));
		editDiv.appendChild(createButton(allReply, "insert_ppt", 'Вставить трек из prostopleer', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACYElEQVR42mNkoBAwkqJYWVmZ9+7du5+JNgCoQRVIvYBp0tXVbfv27ZsQkJ9B0ACgZlc2NrY+T09P740bNz4Gavp/7ty5zvz8/MRnz551Afk9OA0AarZlZmbewcfHx7pw4UIpPz+/IqDw02PHjq0AajyQmZkp9eXLF32g2CtGLJrtgJo3//37l09KSuqPhIQEb1hY2NSmpqYgoPNdgYZ8bG1tPXP8+PGFW7ZsKWGEapoEpKRAbKBmN6BmXhBbUlLyt5qammR7e7vc3Llz92/YsOH4qVOnPBcsWLAR6DL9/fv3K4AN0NfXB7roCze6a0AGeHl5yVVVVb0AhkPvpEmT4h48eCA5efJk376+vgX3798XBRtgZ2f3++nTpyzYDHBzc5Otq6t72d/f77Bnz56NoqKiMs7OzkKLFy++Ig8EYANMTU1/v3v3Dq8BqampHo8ePVpZUFAgPW/ePOmPHz+eAQamHNiApUuXvv3586cQ0P8MwEBiANqEYYCNjc0yAwMDh9raWtmkpKQEDg6OnmnTpomBDXj58mUQkOIH4j///v3zAYZy2Pbt2xmAMfC7ra1NFKjBQ0BAYOaUKVPWWlpaJgMNOwY0mB9osDZGNAINY/r9+/cCYLTFnj59+q+JiQkvOzt7j7e3d4CRkZGZlZWVvpiY2Aqg7W0hISF9WBMS0BCWHz9+LF+0aJHnmTNn1GfNmuUMFL4D1MwENGx9Y2Pjd2DA6wHFvuFMykBD2IFU2fv372dpaGi8BInFxcU1ubi4ZLm7u0eLi4vvJJiZYF4CKv4HZUcDqV9A/mogWwNI3wAADygVDmLYCFoAAAAASUVORK5CYII='));
		editDiv.appendChild(createButton(allReply, "insert_ppp", 'Вставить плейлист из prostopleer', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACbUlEQVR42mNkoBAwkqJYWVmZ9+7du5+JNgCoQRVIvYBp0tXVbfv27ZsQkJ9B0ACgZlc2NrY+T09P740bNz4Gavp/7ty5zvz8/MRnz551Afk9OA0AarZlZmbewcfHx7pw4UIpPz+/IqDw02PHjq0AajyQmZkp9eXLF32g2CtGLJrtgJo3//37l09KSuqPhIQEb1hY2NSmpqYgoPNdgYZ8bG1tPXP8+PGFW7ZsKWGEapoEpKRAbKBmN6BmXhBbUlLyt5qammR7e7vc3Llz92/YsOH4qVOnPBcsWLAR6DL9/fv3K4AN0NfXB7roCze6a0AGeHl5yVVVVb0AhkPvpEmT4h48eCA5efJk376+vgX3798XBRtgZ2f3++nTpyzYDHBzc5Otq6t72d/f77Bnz56NoqKiMs7OzkKLFy++Ig8EYANMTU1/v3v3Dq8BqampHo8ePVpZUFAgPW/ePOmPHz+eAQamHNiApUuXvv3586cQ0P8MwEBiANqEYYCNjc0yAwMDh9raWtmkpKQEDg6OnmnTpomBDXj58mUQkOIH4j///v3zAYZy2Pbt2xmAMfC7ra1NFKjBQ0BAYOaUKVPWWlpaJgMNOwY0mB9osDbIgP9oKfP/kydPFgOjLfb06dN/TUxMeNnZ2Xu8vb0DjIyMzKysrPTFxMRWAG1vCwkJ6YMZgEIDXcT648eP5YsWLfI8c+aM+qxZs5yB4neAmpmAhq1vbGz8Dgx4PaDYN2QXwBIV2CCgIexAuuz9+/ezNDQ0XoIk4uLimlxcXLLc3d2jxcXFdzKg2cyAZADcQKBBTEDF/6DsaCD1C8hfDWRrAOkbAKUeGw73fGlGAAAAAElFTkSuQmCC'));
	}

}
func();

document.addEventListener("click2", function(event)
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