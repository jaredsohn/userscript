// ==UserScript==
// @name	Auto Close Tag for NGI
// @include	http://gaming.ngi.it/showthread.php*
// @include http://gaming.ngi.it/newreply.php*
// @version	0.5
// MadeBy	Nanomad@NGI, Nemo@NGI
//--->contenuto libero,modificabile, etc.. basta che manteniate il nome del/egli autori >_>
// ==/UserScript==
//:::::Shu::::::

var openedTags = new RegExp(/(\[([a-z]+)[^\[\]]*\])$/);

var customTags = [];
var vbTags = ["b","i","u","color","size","font","highlight","left","right","center","indent","email","url","thread","post","list","img","code","php","html","quote","noparse","attach","align","floatright","high","hr","imglft","imgrft","minicode","name","pre","rft","s"];
var ngiTags = ["yt", "vimeo"];

var textAreas = ["vB_Editor_QR_textarea", "vB_Editor_001_textarea"];

function isAllowed(tag) {
	return isIn(tag,customTags) || isIn(tag,vbTags) || isIn(tag,ngiTags);
}

function isIn(elem,arr) {
	return (arr.indexOf(elem) != -1);
}

function isBalanced(text) {
	var openedTags = new RegExp(/\[[a-z]+[^\[\]]*\]/gim);
	var closedTags = new RegExp(/\[\/[a-z]+[^\[\]]*\]/gim);
	var closed = text.match(closedTags);
	var opened = text.match(openedTags);
	if(!closed || !opened) {
		return false;
	}
	return (text.match(closedTags).length == text.match(openedTags).length);
}

function getCaret (ctrl) {
	var CaretPos = 0;	// IE Support
	if (document.selection) {
	ctrl.focus ();
		var Sel = document.selection.createRange ();
		Sel.moveStart ('character', -ctrl.value.length);
		CaretPos = Sel.text.length;
	}
	// Firefox support
	else if (ctrl.selectionStart || ctrl.selectionStart == '0')
		CaretPos = ctrl.selectionStart;
	return (CaretPos);
}

function setCaret(ctrl, pos){
	if(ctrl.setSelectionRange)
	{
		ctrl.focus();
		ctrl.setSelectionRange(pos,pos);
	}
	else if (ctrl.createTextRange) {
		var range = ctrl.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
}

function autoComplete(e)
{
	var t = e.target;
	if(!e.shiftKey && (e.keyCode == 32 || e.keyCode == 13)) {
		var start = getCaret( e.target );
		var text = e.target.value;
		var before = text.substr(0,start-1);
		var after = text.substr(start);
		var lastOpened = openedTags.exec(before);
		if(lastOpened && lastOpened.length == 3 && isAllowed(lastOpened[2]) && !isBalanced(text)) {
			var closedTag = "[/" + lastOpened[2] + "]";
			if(after.indexOf(closedTag) == 0) {
				return;
			}
			if(e.keyCode == 13) {
				before = before + "\n";
				closedTag = " \n" + closedTag;
			} else {
				closedTag = "  " + closedTag;
			}
			e.target.value = before + closedTag + after;
			setCaret(e.target, before.length+1);
		}
	}
}


for(var i=0;i<textAreas.length;i++) {
	var area = document.getElementById(textAreas[i]);
	if(area) {
		area.addEventListener("keyup", autoComplete, true);
	}
}