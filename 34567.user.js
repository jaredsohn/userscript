// ==UserScript==
// @name           kkk
// @namespace      orkut
// @description    kkk
// @include        http://www.orkut.com.br/CommMsgPost.aspx?cmm=70549841*
// ==/UserScript==

//
// author Evangelino Malena
//

function getElementById(id)
{
	var a = document.getElementById(id);
	if (a == null)
	{
		var orkutFrame = document.getElementById('orkutFrame');
		if (orkutFrame == null) return false;
		a = orkutFrame.contentDocument.getElementById(id);
	}
	return a;
}

var subject = getElementById('subject');
var messageBody = getElementById('messageBody');
if ((subject == null) || (messageBody == null)) return;

var tmp = '';
for (i = 0; i < 50; ++i) tmp += 'k';
subject.value = tmp;
subject.focus();

tmp = '';
for (i = 0; i < 2048; ++i) tmp += 'k';
messageBody.value = tmp;
messageBody.focus();
