// ==UserScript==
// @name           http://hatak.pl/
// @namespace      http://hatak.pl/
// @description    http://hatak.pl/ poprawki
// @include        http://hatak.pl/*
// @version 1.4
// @grant none
// ==/UserScript==

var $ = unsafeWindow.jQuery;

var style =  
'.rest{background-color: #5C08AD;  border: 1px solid #321E8C; } .rest:hover { background-color: #6C0FBB;}' +
'form.comment input.button { width: 170px;}' +
'input.button[type="submit"], input.medium.button[type="submit"], input.button[type="button"] {margin-right: 5px; padding: 8px 20px 9px;}' ;

var theStyle=document.createElement("style");
theStyle.setAttribute('type','text/css');
document.getElementsByTagName('head')[0].appendChild(theStyle).innerHTML= style;



var textArea = $("#comment_body");
textArea[0].style.width = "520px";
textArea[0].rows = 8;


var pp = $("#new_comment");
//pp.children()[1].value = "Reset";

 
 $('<input id="spoiler" class="button rest" style=""  type="button" value="Spoiler" />').appendTo(pp);
 $('<input id="q"  class="button rest" style="" type="button" value="Cytuj" />').appendTo(pp);
 
 var s = $('#spoiler'); var q = $('#q');
 
s.click(function(){
 var len = textArea.val().length;
    var start = textArea[0].selectionStart;
    var end = textArea[0].selectionEnd;
    var selectedText = textArea.val().substring(start, end);
    var replacement = '[spoiler]' + selectedText + '[/spoiler]';
    textArea.val(textArea.val().substring(0, start) + replacement + textArea.val().substring(end, len));
});
q.click(function(){
	var qq = getSelected();
			 var len = textArea.val().length;
			 var start = textArea[0].selectionStart;
    var end = textArea[0].selectionEnd;
    var add = '[quote]' + qq + '[/quote]\n';
    textArea.val(textArea.val().substring(0, start) + add + textArea.val().substring(end, len));
	textArea.focus();
	 textArea[0].selectionStart = start + add.length;
	textArea[0].selectionEnd = start + add.length;
	
});

function getSelected() {
    if(window.getSelection) { return window.getSelection(); }
        else if(document.getSelection) { return document.getSelection(); }
                    else {
                            var selection = document.selection && document.selection.createRange();
                            if(selection.text) { return selection.text; }
                return false;
            }
            return false;
        };