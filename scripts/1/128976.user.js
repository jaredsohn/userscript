// ==UserScript==
// @name           Video Popup
// @namespace      popup.video
// @description    Enables to move any embedded video (or other objects) to a popup window. To use it, shift-double click on a blank space on the page and select an area which is highlighted in a red frame which contains a flash video, it will automatically pick the video and open it in a popup window.
// @author         sanilunlu
// @version	   1.7.1
// @include        *
// ==/UserScript==

function openPopup(vobjHtml, w, h) {
	myWin = window.open('', 'popupWin', 'width=' + w + ',height=' + h + ',status=no,toolbar=no,menubar=no');
    if(myWin) {
	myWin.document.open();
	
	myWin.document.write("<html>\r\n"+
"	<head>\r\n" + 
"		<title>Video Popup</title>\r\n" +
"	</head>\r\n" +
"	<body style='margin: 0px; padding: 0px; border: none;'>\r\n" +
"		<div>\r\n" +
"			" + vobjHtml + "\r\n" +
"		</div>\r\n" +
"	</body>\r\n" +
"</html>");
	myWin.document.close();
    } else alert("Couldn't launch popup window!");
}

function DIOnMouseOver(evt) {
	element = evt.target;
	
	if (!evt.target.borderStyleOld)
		evt.target.borderStyleOld = evt.target.borderStyle;

	element.style.borderWidth = '2px';
	element.style.borderStyle = 'solid';
	element.style.borderColor = '#f00';
}

function DIOnMouseOut(evt) {
	evt.target.style.borderStyle = evt.target.style.borderStyleOld ? evt.target.style.borderStyleOld : 'none';
}

function DIOnClick(e) {
	//var targ = e.target;
	var targ = document.elementFromPoint(e.clientX, e.clientY);
	document.removeEventListener("mouseover", DIOnMouseOver, true);
	document.removeEventListener("mouseout", DIOnMouseOut, true);
	document.removeEventListener("click", DIOnClick, true);
	if (targ) {
		e.target.style.borderStyle = 'none';
		var obs = targ.getElementsByTagName('object');
		if(obs.length == 0)
			obs = targ.getElementsByTagName('embed');
		if(obs.length == 0)
			obs = targ.getElementsByTagName('video');
		if(obs.length == 0)
			obs = targ.getElementsByTagName('audio');
		for(var i = 0; i < obs.length; i++) {
			var ob = obs[i];
			if(ob.style.display != 'none') {
				ob.style.width = '100%';
				ob.style.height = '100%';
				openPopup(ob.outerHTML, ob.width, ob.height);
				break;
			}
		}
	}
	return false;
}

function dblClick(e) {
	if(e && e.button == 0 && e.shiftKey && !e.altKey && !e.ctrlKey) {
		document.addEventListener("mouseover", DIOnMouseOver, true);
		document.addEventListener("mouseout", DIOnMouseOut, true);
		document.addEventListener("click", DIOnClick, true);
	}
}

document.addEventListener("dblclick", dblClick, true);
