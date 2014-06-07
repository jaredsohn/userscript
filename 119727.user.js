// ==UserScript==
// @name           WebCentralModButton
// @namespace      http://userscripts.org/scripts/review/119727
// @include        http://webcentral.pl/*
// @include        http://www.webcentral.pl/*
// ==/UserScript==
window.unsafeWindow || (
	unsafeWindow = (function() {
		var el = document.createElement('p');
		el.setAttribute('onclick', 'return window;');
		return el.onclick();
	}())
);

unsafeWindow.textarea = document.getElementById('postform').elements['message'];
if(document.selection)
{
    unsafeWindow.Selection = document.selection.createRange();
    unsafeWindow.SelectionlLength = unsafeWindow.Selection.text.length;
    unsafeWindow.Selection.moveStart('character', -unsafeWindow.textarea.value.length);
    unsafeWindow.textarea.selectionStart = unsafeWindow.Selection.text.length - unsafeWindow.SelectionlLength;
    unsafeWindow.textarea.selectionEnd = unsafeWindow.textarea.selectionStart + unsafeWindow.electionlLength;
}
unsafeWindow.setCaretPos = function(pos) {
    if(document.selection) {
        unsafeWindow.textarea.focus();
        unsafeWindow.Selection.moveStart ('character', pos);
        unsafeWindow.Selection.moveEnd ('character', 0);
        unsafeWindow.Selection.select ();
    }else {       
        unsafeWindow.textarea.selectionStart = pos;
        unsafeWindow.textarea.selectionEnd = pos;
        unsafeWindow.textarea.focus();
    }
}

unsafeWindow.insertBB = function(tagName, promptMsg) {
    var openTag = '';
    if(promptMsg != false) {
        var attribute = prompt(promptMsg);
        openTag = '[' + tagName + '=' + attribute + ']';
    } else
        openTag = '[' + tagName + ']';
    var closeTag = '[/' + tagName + ']';

    var txt = new Array();
    if(typeof(unsafeWindow.textarea.selectionStart) == 'number' && typeof(unsafeWindow.textarea.selectionEnd) == 'number')
    {
        txt[0] = unsafeWindow.textarea.value.substring(0, unsafeWindow.textarea.selectionStart);
        txt[1] = openTag + unsafeWindow.textarea.value.substring(unsafeWindow.textarea.selectionStart, unsafeWindow.textarea.selectionEnd) + closeTag;
        txt[2] = unsafeWindow.textarea.value.substring(unsafeWindow.textarea.selectionEnd);
        unsafeWindow.textarea.value = txt[0] + txt[1] + txt[2];
    }

    unsafeWindow.textarea.focus();
}
var tag = document.getElementById('format-buttons');
tag.innerHTML += '<input type="button" class="button2" name="addbbcode22" value="Mod" style="width: 50px" onclick="location.assign(\'javascript:insertBB(\\\'mod\\\', false);void 0\');" />';
tag.innerHTML += '&nbsp;<input type="button" class="button2" name="addbbcode16" value="Url=" style="width: 50px" onclick="location.assign(\'javascript:insertBB(\\\'url\\\', \\\'Podaj URL\\\');void 0\');" />';
endsWith = function(string, suffix) {
    return string.indexOf(suffix, string.length - suffix.length) !== -1;
}
unsafeWindow.textarea['onkeypress'] = function(e) {
    var evt = e || window.event;
    if(evt.keyCode == 9) {
        evt.preventDefault();
        var s = unsafeWindow.textarea.selectionStart;
        if(evt.shiftKey) {
            if(endsWith(unsafeWindow.textarea.value.substring(0, unsafeWindow.textarea.selectionStart), '\t'))
            var txt = new Array();
            txt[0] = unsafeWindow.textarea.value.substring(0, unsafeWindow.textarea.selectionStart-1);
            txt[1] = unsafeWindow.textarea.value.substring(unsafeWindow.textarea.selectionStart);
            unsafeWindow.textarea.value = txt[0] + txt[1];
        }else {
            var txt = new Array();
            txt[0] = unsafeWindow.textarea.value.substring(0, unsafeWindow.textarea.selectionStart);
            txt[1] = '\t';
            txt[2] = unsafeWindow.textarea.value.substring(unsafeWindow.textarea.selectionStart);
            unsafeWindow.textarea.value = txt[0] + txt[1] + txt[2];
        }
        unsafeWindow.setCaretPos(s+1);
    }
}