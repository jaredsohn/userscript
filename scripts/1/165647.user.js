// ==UserScript==
// @name        multicolore
// @namespace   http://dev.webnaute.net
// @include     http://forum.lesroyaumes.com/posting.php*
// @exclude     http://forum.lesroyaumes.com/posting.php?mode=topicreview*
// @include     http://forum2.lesroyaumes.com/posting.php*
// @exclude     http://forum2.lesroyaumes.com/posting.php?mode=topicreview*
// @version     1
// ==/UserScript==
//
unsafeWindow.mycolorize = function(txtarea)
{
	var selLength = txtarea.textLength;
	var selStart = txtarea.selectionStart;
	var selEnd = txtarea.selectionEnd;
	if (selEnd == 1 || selEnd == 2)
		selEnd = selLength;
    if (selStart == selEnd) selStart = 0;

	var s1 = (txtarea.value).substring(0,selStart);
	var s3 = (txtarea.value).substring(selEnd, selLength);
    var balise = 0;


    var i;
    var color;
    for (i = selStart ; i < selEnd ; ++i) {
        var c = txtarea.value.charAt(i);
        if (balise) {
            if (c == ']') balise = 0;
            s1 += c;
            continue;
        }
        switch (c) {
            case '[': balise = 1; s1 += '['; break;
            case ' ': s1 += ' '; break;
            default:
                color = Math.floor (((Math.random()*0xffffff) & 0xff7f7f) | 0xc04080);
                s1 += "[color=#" + color.toString(16) + "]" + c + "[/color]";
                break;
        }
    }
	txtarea.value = s1 + s3;
	return;
}


var hrp = document.getElementsByName("addbbcode20")[0].parentNode.parentNode;
hrp.innerHTML += '<input type="button" value="Haha" onclick="mycolorize(document.post.message)" />';

