// ==UserScript==
// @name    Lepro smileys2
// @include http://leprosorium.ru/*
// @include http://*.leprosorium.ru/*
// ==/UserScript==
var textarea = false;
var toolbar = false;

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

function insert_tag(startTag, endTag){
	var txtarea = document.getElementById("comment_textarea") || document.getElementById("comments-textarea");
	txtarea.focus();
 
	var scrtop = txtarea.scrollTop;
 
	var cursorPos = getCursor(txtarea);
	var txt_pre = txtarea.value.substring(0, cursorPos.start);
	var txt_sel = txtarea.value.substring(cursorPos.start, cursorPos.end);
	var txt_aft = txtarea.value.substring(cursorPos.end);
 
	if (cursorPos.start == cursorPos.end){
		var nuCursorPos = cursorPos.start + startTag.length;
	}else{
		var nuCursorPos=String(txt_pre + startTag + txt_sel + endTag).length;
	}
	txtarea.value = txt_pre + startTag + txt_sel + endTag + txt_aft;
	setCursor(txtarea,nuCursorPos,nuCursorPos);
 
	if (scrtop) txtarea.scrollTop=scrtop;
}


if (window.location.href.indexOf("comments") != - 1 || window.location.href.indexOf("inbox") != - 1) {
    textarea = document.getElementById('comment_textarea');
    if (textarea) toolbar = textarea.parentNode.previousSibling.previousSibling;
}

if (window.location.href.indexOf("write") != - 1) {
    textarea = document.getElementById('comment_textarea');
    toolbar = document.querySelector('.textarea_editor');
}

if (window.location.href.indexOf("asylum") != - 1) {
    textarea = document.getElementById('comment_textarea');
    toolbar = textarea.parentNode.parentNode.parentNode.rows[0].cells[0];
}

var smileys = [
"http://www.junglemassive.org.ua/style_emoticons/default/blaine.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/bobmarley.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/carey.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/doom.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/Fallout.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/goldie.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/gopnik.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/Hannibal.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/Homer.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/jesus.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/john.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/monro.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/chak.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/omg.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/powers.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/rambo.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/shevchenko.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/shvarc.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/Sparta.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/Trollface.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/Vegas.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/yakunovich.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/Borat.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/boyarskiy.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/enstaine.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/franklin.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/Griffin.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/hitler.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/kenny.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/komatoz.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/mario.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/ment.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/neferstvo.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/pedobear.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/petrosyan.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/Pikachu.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/Pushkin.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/telepuz.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/timaty.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/who.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/yakubovich.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/zoidberg.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/onotole.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/gipnojaba.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/krug.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/gipnojaba.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/moiseev.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/ukupnik.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/house.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/djamshut.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/terminator.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/yakunovich.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/Trollface.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/omg.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/yakubovich.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/hitler.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/ukupnik.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/shvarc.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/ph34r.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/boyarskiy.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/yakunovich.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/krug.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/dali.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/B&B.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/fantomas.gif",
"http://www.junglemassive.org.ua/style_emoticons/default/jackson.gif"
]
if (textarea) {
    var d = document.createElement('a');

    d.innerHTML = "<b>:)</b>";
    d.href = "#";
    d.addEventListener("click", function(e){
        var div = document.createElement("div");

        div.style.position = "absolute";
        div.style.zIndex = "9999";
        div.style.left = e.pageX + 'px';
        div.style.top = e.pageY + 'px';
        div.style.border = "1px solid #aaa";
        div.style.backgroundColor = "white";
        for(var i = 0, n = smileys.length; i < n; i += 1){
            var img = document.createElement("img");

            img.src = smileys[i];
            img.style.margin = "5px";
            img.height = "50";
            img.addEventListener("click", function(evt){
                insert_tag('<img src="' + evt.target.src + '" alt="image">', '');
                document.body.removeChild(div);
            }, false);
            div.appendChild(img);
            if((i + 1) % 12 == 0){
                var br = document.createElement("br");

                div.appendChild(br);
            }
        }
        document.body.appendChild(div);
        e.stopPropagation();
        e.preventDefault();
        return false;
    }, false);
    toolbar.appendChild(d);  
} 

