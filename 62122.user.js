// ==UserScript==
// @name            SU V4 Preview HTML
// @version	    	0.2
// @namespace       http://www.foresthippy.com
// @description     John
// @include         http://www.stumbleupon.com/favorites/*
// @include         http://www.stumbleupon.com/url/*
// @license         Who knows
// ==/UserScript==

var ls = document.getElementsByClassName ('listStumble');
var liststumble = ls[ls.length-1];
var stumbles = new Array ();
var undobuffer = '';
var undoflag = false;
var i;

function replaceCRwithBR (inpstr) {
	inpstr = escape(inpstr); //encode all characters in text area to find carriage return character

	for(i=0; i < inpstr.length; i++) {
		//loop through string, replacing carriage return encoding with HTML break tag
		if(inpstr.indexOf("%0D%0A") > -1) {
			//Windows encodes returns as \r\n hex
			inpstr=inpstr.replace("%0D%0A",'<br />');
		}
		else if(inpstr.indexOf("%0A") > -1) {
			//Unix encodes returns as \n hex
			inpstr=inpstr.replace("%0A",'<br />');
		}
		else if(inpstr.indexOf("%0D") > -1) {
			//Macintosh encodes returns as \r hex
			inpstr=inpstr.replace("%0D",'<br />');
		}
	}	
	return unescape (inpstr);
}



for (i=0; i<liststumble.childNodes.length; i++) {
	if (liststumble.childNodes[i].nodeName.toLowerCase() == 'li') {
		stumbles.push (liststumble.childNodes[i]);
	}
}

for (i=0; i<stumbles.length; i++) {
	var rdiv = stumbles[i].getElementsByClassName ('review');
	if (rdiv.length == 0) {
		var tdiv = document.createElement ('div');
		tdiv.className = 'review';
		var sthumb = stumbles[i].getElementsByClassName ('showThumbUp');
		if (sthumb.length == 0) {
			var pelem = stumbles[i].getElementsByClassName ('wrapperInput')[0].parentNode;
			pelem.insertBefore(tdiv, pelem.firstChild);
			stumbles[i].style.height = 'auto';
		} else {
			sthumb[0].parentNode.insertBefore (tdiv, sthumb[0].nextSibling);
		}
	}
	
	var tli = document.createElement ('li');
	var tinput = document.createElement ('a');
	
	tinput.href = 'javascript:void(0);';
	tinput.textContent = 'Preview';
	tinput.addEventListener ('click', function () {
		var editparent = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
		var textarea = editparent.getElementsByTagName ('textarea')[0];
		var supreview = editparent.getElementsByClassName ('review');
		if (supreview != null) {
			undobuffer = supreview[0].innerHTML;
			undoflag = true;
			supreview[0].innerHTML = replaceCRwithBR(textarea.value);
		}
	}, false);
	tli.appendChild (tinput);
	
	var savebtn = stumbles[i].getElementsByClassName ('submit btnWhite')[0];
	savebtn.parentNode.parentNode.insertBefore (tli, savebtn.parentNode.nextSibling);
		
	var cancelbtn = stumbles[i].getElementsByClassName ('cancel')[0];
	cancelbtn.addEventListener ('click', function () {
		var editparent = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
		var supreview = editparent.getElementsByClassName ('review');
		if (supreview != null) {
			if (undoflag) {
				supreview[0].innerHTML = undobuffer;
				undobuffer = '';
			}
		}
	}, false);
}