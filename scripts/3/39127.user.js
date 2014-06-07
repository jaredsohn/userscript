// ==UserScript==
// @name           Additional Lepro Buttons
// @namespace      http://*.leprosorium.ru/*
// @include        http://*.leprosorium.ru/*
// ==/UserScript==
function getCursor(input){
	var result = {start: 0, end: 0};
	if (input.setSelectionRange){
		result.start= input.selectionStart;
		result.end = input.selectionEnd;
	} else if (!document.selection) {
		return false;
	} else if (document.selection && document.selection.createRange) {
		var range = document.selection.createRange();
		var stored_range = range.duplicate();
		stored_range.moveToElementText(input);
		stored_range.setEndPoint('EndToEnd', range);
		result.start = stored_range.text.length - range.text.length;
		result.end = result.start + range.text.length;
	}
	return result;
}

function setCursor(txtarea, start, end){
	if(txtarea.createTextRange) {
		var range = txtarea.createTextRange();
		range.move("character", start);
		range.select();
	} else if(txtarea.selectionStart) {
		txtarea.setSelectionRange(start, end);
	}
}

function urlencode( str ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: AJ
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // %          note: info on what encoding functions to use from: http://xkr.us/articles/javascript/encode-compare/
    // *     example 1: urlencode('Kevin van Zonneveld!');
    // *     returns 1: 'Kevin+van+Zonneveld%21'
    // *     example 2: urlencode('http://kevin.vanzonneveld.net/');
    // *     returns 2: 'http%3A%2F%2Fkevin.vanzonneveld.net%2F'
    // *     example 3: urlencode('http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a');
    // *     returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a'

    var histogram = {}, histogram_r = {}, code = 0, tmp_arr = [];
    var ret = str.toString();

    var replacer = function(search, replace, str) {
        var tmp_arr = [];
        tmp_arr = str.split(search);
        return tmp_arr.join(replace);
    };

    // The histogram is identical to the one in urldecode.
    histogram['!']   = '%21';
    histogram['%20'] = '+';

    // Begin with encodeURIComponent, which most resembles PHP's encoding functions
    ret = encodeURIComponent(ret);

    for (search in histogram) {
        replace = histogram[search];
        ret = replacer(search, replace, ret) // Custom replace. No regexing
    }

    // Uppercase for full PHP compatibility
    return ret.replace(/(\%([a-z0-9]{2}))/g, function(full, m1, m2) {
        return "%"+m2.toUpperCase();
    });

    return ret;
}

function insertFignyu(color,fig_color,figTxt1){
		bl = document.getElementById('reply_form');
		container = bl.appendChild(document.createElement("A"));
		container.style.cursor = 'pointer';
		container.style.color = fig_color;
		container.appendChild(document.createTextNode(figTxt1));
		container.addEventListener("click", function(event) {
			var src = prompt('Введите текст ' + figTxt1+' (меньше 80 букв): ' );
			if(src){
			if (src.length>80) {
				alert('Очень длинная фигня, надо меньше 80');
				return false;
			}

			src = urlencode( src );
			var txtarea = document.getElementById("comment_textarea");
			txtarea.focus();
			var scrtop = txtarea.scrollTop;
		    var txt_str = '<img src="http://93.188.36.94/fignya/magic.php?cvet_figni=' + color + '&fignya=' + src + '" alt="' + src + '">';
			var cursorPos = getCursor(txtarea);
			var txt_pre = txtarea.value.substring(0, cursorPos.start);
			var txt_sel = txtarea.value.substring(cursorPos.start, cursorPos.end);
			var txt_aft = txtarea.value.substring(cursorPos.end);
			if (cursorPos.start == cursorPos.end){
				var nuCursorPos = cursorPos.start;
			}else{
				var nuCursorPos=String(txt_pre + txt_str + txt_sel).length;
			}
			txtarea.value = txt_pre +  txt_sel + txt_str + txt_aft;
			if (scrtop) txtarea.scrollTop=scrtop;
            }
    return false;
	}, false);

}


function addSimpleButton(but_color,but_text, but_texareatext){
	bl = document.getElementById('reply_form');
	container = bl.appendChild(document.createElement("A"));
	container.style.cursor = 'pointer';
	container.style.color = but_color;
	container.appendChild(document.createTextNode(but_text));
	container.addEventListener("click", function(event) {
	var txtarea = document.getElementById("comment_textarea");
	txtarea.focus();
	var scrtop = txtarea.scrollTop;
    var txt_str = but_texareatext;
	var cursorPos = getCursor(txtarea);
	var txt_pre = txtarea.value.substring(0, cursorPos.start);
	var txt_sel = txtarea.value.substring(cursorPos.start, cursorPos.end);
	var txt_aft = txtarea.value.substring(cursorPos.end);
	if (cursorPos.start == cursorPos.end){
		var nuCursorPos = cursorPos.start;
	}else{
		var nuCursorPos=String(txt_pre + txt_str + txt_sel).length;
	}
	txtarea.value = txt_pre +  txt_sel + txt_str + txt_aft;
	//setCursor(txtarea,nuCursorPos,nuCursorPos);
	if (scrtop) txtarea.scrollTop=scrtop;
    return false;
	}, false);
}
insertFignyu('seraya','#999999','серой фигнёй ')
insertFignyu('sinyaya','#326ccd','синей фигнёй ')
insertFignyu('ukropchikom','#009900','укропчиком ')


addSimpleButton('#666666','[x] ','[x]');
addSimpleButton('#aa0000','Сука, взрыв ', 'И ТУТ СУКА ВЗРЫВ НАХУЙ КИШКИ В СТЕНУ БЛЯДЬ МОЗГИ ГОВНО РАСЧЛЕНЕНКА ПРОЕБАШИЛО БЕШЕНО РАЗДРЮЧИЛО В ГОВНО СУКА РАСПИДОРАСИЛО БЛЯТЬ В ДЕРЬМО');
addSimpleButton('#880088','Заебали со своим... ', 'Заебали со своим ');
addSimpleButton('#888800','Превосходство Лепрозория ', 'Пост доказывающий превосходство Лепрозория над другими жалкими коллективными блогами');






