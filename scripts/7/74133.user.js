// ==UserScript==
// @name          TU Berlin Userfriendly
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Makes the TU Berlins course catalog user friendly
// @include       http://lsf.tubit.tu-berlin.de/qisserver/servlet/*
// @include       http://lsf2.tubit.tu-berlin.de/qisserver/servlet/*
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// ==/UserScript==


function getElementsByClass(elementtype,className)
{
	var result = [];
	var elements = document.getElementsByTagName(elementtype);
	for(var i = 0; i < elements.length; ++i)
		if(elements[i].className == className)
			result.push(elements[i]);

	return result;
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function stripHTML(oldString) {
  return oldString.replace(/<(?:.|\s)*?>/g, "");
}


var allTHs, thisTH;
allTHs = document.evaluate(
    "//th[@class='mod']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allTHs.snapshotLength; i++) {
    thisTH = allTHs.snapshotItem(i);
    // do something with thisDiv
    thisTH.innerHTML = stripHTML(thisTH.innerHTML);
}

var css = 'body{ font-family: Helvetica Neue,Helvetica,Arial,Verdana,tahoma,arial,helvetica,sans-serif; } a.regular:link, a.regular:visited, a.regular:focus, a.regular:hover, a.regular:active { text-decoration: none; } th.mod { border: none; font-weight: normal; background-color:#E0E0E0; } .mod_n_even { background-color:#F0F0F0; } .t_capt { font-weight: normal; color: #990000; } .abstand_veranstaltung { border-bottom: 1px solid #EFEFEF; height: 0px; margin: 15px 0; } .content h1 { color: #990000; font-size: 170%; } .functionnavi { border: none; padding: 0px; } .functionnavi ul li { border: none; padding: 0; } .functionnavi ul li:first-child { display: none; } .mikronavi { border: none; padding: 0; } .mikronavi  ul li:first-child  { display: none; } .mikronavi ul { margin: 0; padding: 0; width: 75%; } .mikronavi ul li { border: none; padding: 0; margin-right: 5px; } a.ueb:link, a.ueb:visited { font-weight: normal; } .content img { display: none; }';

addGlobalStyle ( css );











