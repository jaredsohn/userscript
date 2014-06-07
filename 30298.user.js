// ==UserScript==
// @name          shitstream face fix
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   normal theme for shitstream
// @include       http://shitstream.bashorgu.net.ru/*
// ==/UserScript==

function getElementsByClassName(classname, node)
{
    if(!node)
		node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
		if(re.test(els[i].className))
			a.push(els[i]);
    return a;
}




var elems = document.getElementsByClassName("ph");


var re = /0x([A-F]|[0-9])([A-F]|[0-9])([A-F]|[0-9])([A-F]|[0-9])([A-F]|[0-9])/g;

for (idx = 0; idx < elems.length; idx++)
{
	var elem = elems[idx];
	var oldhtml = elem.innerHTML;
        var newhtml = oldhtml;
alert(oldhtml);
	for(;;) 
        {
		var match = re.exec(html);
		if (!match) break;

		newhtml = "<span style='color:#ffffff'>" + oldhtml + "</span>";

	}

	elem.innerHTML = newhtml;
}
