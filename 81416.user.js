// ==UserScript==
// @name           GLB Post Buttons Fix
// @namespace      GLB
// @description   Fixes the selection range of text areas in firefox when using the buttons
// @include        http://goallineblitz.com/game/forum_thread.pl?thread_id=*
// @include        http://goallineblitz.com/game/forum_edit_post.pl?post_id=*
// ==/UserScript==

function addChar2(txtId, before, after) {
 var txtarea = document.getElementById(txtId);
 var theTop = txtarea.scrollTop;

 var selection = getSelection(txtarea);

 var intEnd = selection.end;
 var intStart = selection.start;

 var Start = (txtarea.value).substring(0,intStart);
 var End = (txtarea.value).substring(intEnd);

 var text = before;
 text += (txtarea.value).substring(intStart,intEnd);
 text += after;

 txtarea.value = Start + text + End;
 txtarea.selectionStart = intStart;
 txtarea.selectionEnd = intStart + text.length;
 txtarea.scrollTop = theTop;
 txtarea.focus();
 hideElement('smileys'); 
};


function getSelection(inputBox) {
 if ("selectionStart" in inputBox) {
 return {
 start: inputBox.selectionStart,
 end: inputBox.selectionEnd
 }
 }

 // IE is dumb
 var bookmark = document.selection.createRange().getBookmark()
 var selection = inputBox.createTextRange()
 selection.moveToBookmark(bookmark)

 var before = inputBox.createTextRange()
 before.collapse(true)
 before.setEndPoint("EndToStart", selection)

 var beforeLength = before.text.length
 var selLength = selection.text.length

 return {
 start: beforeLength,
 end: beforeLength + selLength
 }
} 

var smileyAppended = false;
function smileyPopup(e) {
 var smileyBox = document.getElementById('smileys');
 if (!smileyAppended) {
 document.getElementById('contexMenuContainer').appendChild(smileyBox);
 smileyAppended = true;
 }

 smileyBox.style.left = (e.clientX - 20) + 'px';
 smileyBox.style.top = (e.clientY + 30) + 'px';
 showElement('smileys');
}

function hideElement(name) {
 var elem = document.getElementById(name);
 if (elem) {
 elem.style.visibility = 'hidden';
 elem.style.display = 'none';
 }
}

function showElement(name) {
 var elem = document.getElementById(name);
 if (elem) {
 elem.style.visibility = 'visible';
 elem.style.display = 'block';
 }
}
 

window.setTimeout(function(){
	var elm = document.getElementById('edit_icons');
	elm.innerHTML = '';
	
	var temp = document.createElement('A');
	temp.setAttribute('class','edit_icon');
	temp.href = 'javascript:void(0);';
	temp.innerHTML = '<b>B</b>';
	temp.addEventListener('click', function(){ addChar2('reply_box','[b]','[/b]');},false);
	elm.appendChild(temp);
	
	var temp = document.createElement('A');
	temp.setAttribute('class','edit_icon');
	temp.href = 'javascript:void(0);';
	temp.innerHTML = '<i>I</i>';
	temp.addEventListener('click', function(){ addChar2('reply_box','[i]','[/i]');},false);
	elm.appendChild(temp);
	
	var temp = document.createElement('A');
	temp.setAttribute('class','edit_icon');
	temp.href = 'javascript:void(0);';
	temp.innerHTML = '<u>U</u>';
	temp.addEventListener('click', function(){ addChar2('reply_box','[u]','[/u]');},false);
	elm.appendChild(temp);
	
	var temp = document.createElement('A');
	temp.setAttribute('class','edit_icon');
	temp.href = 'javascript:void(0);';
	temp.innerHTML = '<img src="/images/game/forum/smileys/smile.gif" />';
	temp.addEventListener('click', function(e){ smileyPopup(e);},false);
	elm.appendChild(temp);
	

},0);