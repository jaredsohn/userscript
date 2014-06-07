// ==UserScript==
// @name                Nukezone Forums Reply Tool
// @namespace           Nukezone
// @description         Adds quick tags on the reply page
// @include             http://*.nukezone.nu/forum/*
// ==/UserScript==

if (document.location.href.search('Action=PostReply') != -1 || document.location.href.search('Action=Edit') != -1)
{
	
var txtarea = document.getElementsByTagName('textarea')[0];    

var newscript = document.createElement('script');
newscript.setAttribute('type', 'text/javascript');
newscript.setAttribute('language', 'Javascript');
newscript.innerHTML = 'function mozWrap(tag) {' +
''	+
'   var txtarea = document.getElementsByTagName(\'textarea\')[0];' +
'	var lft = \'[\' + tag + \']\';' +
'	var rgt = \'[/\' + tag + \']\';' +
'	var selLength = txtarea.textLength;'+
'	var selStart = txtarea.selectionStart;'+
'	var selEnd = txtarea.selectionEnd;'+
'	if (selEnd==1 || selEnd==2) selEnd=selLength;'+
'	var s1 = (txtarea.value).substring(0,selStart);'+
'	var s2 = (txtarea.value).substring(selStart, selEnd);'+
'	var s3 = (txtarea.value).substring(selEnd, selLength);'+
'	txtarea.value = s1 + lft + s2 + rgt + s3;'+
'   txtarea.focus()'+
'}' +
'function weeefocus() {' +
'  document.getElementsByTagName(\'textarea\')[0].focus()' +
'}';

document.getElementsByTagName('head')[0].appendChild(newscript);

var insertpoint;
var bs = document.getElementsByTagName('b');
for (var i=0; i < bs.length; i++)
{
	var b = bs[i];
	if (b.innerHTML.search('Message:') != -1)
	{
		insertpoint = b;
	}
}

createTag('[Bold] ', 'b');
createTag('[Italic] ', 'i');
createTag('[Underline] ', 'u');
createTag('[Slashed] ', 's');
createTag('[Image] ', 'img');

txtarea.parentNode.insertBefore(document.createElement('br'), insertpoint);
txtarea.parentNode.insertBefore(document.createElement('br'), insertpoint);

}

function createTag(tagname, tagshort)
{
	var newlink = document.createElement('a');
	newlink.setAttribute('onclick', 'mozWrap(\'' + tagshort + '\')');
	newlink.setAttribute('onmouseup', 'weeefocus()');
	newlink.innerHTML = tagname;
	txtarea.parentNode.insertBefore(newlink, insertpoint);
}