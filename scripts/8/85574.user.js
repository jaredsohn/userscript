// ==UserScript==
// @name           Omnius Encrypter
// @namespace      http://www.war-facts.com/message.php?player=9972
// @description    Encrypter
// @include        http://www.war-facts.com/*
// ==/UserScript==


//Variables

var Ostring = "Omnius Encrypter";
var pw = "Ancient Llama Hum";

const markS = ">O";
const markE = "O<";
const fontS = "<font color=#FFFF00>";
const fontE = "</font>";
const base = 12;
const p3=Math.pow(base,3);
const p2=Math.pow(base,2);
const p1=Math.pow(base,1);

//random number parametres
var seed = 0;
var c = 0;
const m = Math.pow(2,32);
const b = Math.pow(2,31);
const a = 2147483085;

var page = window.location.href;
page = page.substring(page.indexOf("com") + 4);
page = page.substring(0, page.indexOf("."));

//Functions

function Omnius(x) {
	if (x > 11) {
		x = x - 12;
	}
	switch (x) {
		case 0:
			return 'O';
		case 1:
			return 'o';
		case 2:
			return 'M';
		case 3:
			return 'm';
		case 4:
			return 'N';
		case 5:
			return 'n';
		case 6:
			return 'I';
		case 7:
			return 'i';
		case 8:
			return 'U';
		case 9:
			return 'u';
		case 10:
			return 'S';
		case 11:
			return 's';
		case 'O':
			return 0;
		case 'o':
			return 1;
		case 'M':
			return 2;
		case 'm':
			return 3;
		case 'N':
			return 4;
		case 'n':
			return 5;
		case 'I':
			return 6;
		case 'i':
			return 7;
		case 'U':
			return 8;
		case 'u':
			return 9;
		case 'S':
			return 10;
		case 's':
			return 11;
		default:
			return ' ';
	}

}

function liner(line) {
	var part = "";
	rNum(true);

	for (var i = 0; i < line.length; ++i) {
		var uni = line.charCodeAt(i);
		//var digit3 = Math.floor(uni/p3);
		//uni = uni-digit3*p3;
		var digit2 = Math.floor(uni/p2);
		uni = uni-digit2*p2;
		var digit1 = Math.floor(uni/p1);
		uni = uni-digit1*p1;
		part = part+Omnius(digit2+rNum(false))+Omnius(digit1+rNum(false))+Omnius(uni+rNum(false));
	}
	return part;
}

function bliner(line) {
	var part = "";
	rNum(true);

	for (var i = 0; i < line.length; i=i+3) {
		var num = bRnum(Omnius(line.charAt(i)))*p2+bRnum(Omnius(line.charAt(i+1)))*p1+bRnum(Omnius(line.charAt(i+2)));
		var uni = parseInt(num);
		part += String.fromCharCode(uni);
	}
	return part;
}

function rNum(clear) {
	if (clear) {
		seed = GM_getValue("GKey",1555);
		c = 2*seed-1;
	}
	else {
		var Xn = (a*seed - 2*seed-1)%b;
		seed = Xn;
		c = (a*Xn - c) / b;
		return Math.ceil(Xn/4300000000*24);
	}

}

function bRnum(num) {
	num = num - rNum(false);
	if (num < 0) {
		num = num + 12;
	}
	return num;
}

function encrypt() {
	tString = tArea.value;
	var i1 = tString.indexOf("/O");
	var i2 = tString.indexOf("O/");
	if (i1 != -1 && i2 != -1 && i1+2 < i2) {
		var tBefore = tString.substring(0,i1);
		var tAfter = tString.substring(i2+2);
		tArea.value = tBefore+markS+liner(tString.substring(i1+2,i2))+markE+tAfter;
	}
	else {
		alert("Invalid tags. /O [text] O/");
	}
}

function decrypt() {
	tString = tArea.value;
	temp = "";
	var i1 = 0;
	var i2 = 0;
	while (tString.length > 4 && i1 != -1 && i2 != -1) {
		var i1 = tString.indexOf(">O");
		var i2 = tString.indexOf("O<");
		if ( i1 != -1 && i2 != -1 && i1+2 < i2) {
			temp = temp + tString.substring(0,i1) +"/O"+ bliner(tString.substring(i1+2,i2))+"O/";
			tString = tString.substring(i2+2);
		}
	}
	tArea.value = temp+tString;
}

function msgDecrypt(msg) {
	var temp = "";
	var i1 = 0;
	var i2 = 0;
	while (msg.length > 10 && i1 != -1 && i2 != -1) {
		var i1 = msg.indexOf("&gt;O");
		var i2 = msg.indexOf("O&lt;");
		if ( i1 != -1 && i2 != -1 && i1+5 < i2) {
			temp = temp + msg.substring(0,i1) +fontS+ bliner(msg.substring(i1+5,i2))+fontE;
			msg = msg.substring(i2+5);
		}
	}
	return temp + msg;
}

function setKey() {
	var key = this.previousSibling.value;
	var temp = 0;
	if (!key || key == "") {
		GM_deleteValue("GKey");
	}
	else {
		for (var i = 0; i < key.length; ++i) {
			temp = temp + key.charCodeAt(i);
		}
		GM_setValue("GKey",temp);
	}
}

//main
var tArea;

if (page == "starlog") {
	var starMsgs = document.evaluate('//div[@id]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var span = document.getElementById('head1');

	var newInput = document.createElement('input');
	newInput.type = "text";
	newInput.value = "";
	newInput.size = "10";
	newInput.maxlength = "20";
	span.parentNode.insertBefore(newInput, span.nextSibling);	

	var newInput = document.createElement('input');
	newInput.type = "button";
	newInput.value = "Encryption password";
	newInput.addEventListener("click", setKey, false);
	span.parentNode.insertBefore(newInput, span.nextSibling.nextSibling);
/*
	var newbr = document.createElement('br');
	newbr.type = "br";
	span.parentNode.insertBefore(newbr, span.nextSibling.nextSibling.nextSibling);
	var newbr = document.createElement('br');
	newbr.type = "br";
	span.parentNode.insertBefore(newbr, span.nextSibling.nextSibling.nextSibling);
*/
	for (var i = 0; i < starMsgs.snapshotLength; i++) {
    		thisMsg = starMsgs.snapshotItem(i);
   		thisMsg = thisMsg.getElementsByTagName('div')[3];
		var temp2 = msgDecrypt(thisMsg.innerHTML);
		thisMsg.innerHTML = temp2;
	}
}
else if (page == "forum_view" || page == "forum_empires") {
	var tArea = document.getElementsByTagName('textarea')[0];
	if (tArea) {
		var input = document.getElementsByTagName('input');
		input = input[input.length-2];
		var newInput = document.createElement('input');
		newInput.type = "button";
		newInput.value = "Encrypt";
		newInput.addEventListener("click", encrypt, false);
		input.parentNode.insertBefore(newInput,input.nextSibling);

		var newInput = document.createElement('input');
		newInput.type = "text";
		newInput.value = "";
		newInput.size = "10";
		newInput.maxlength = "20";
		input.parentNode.insertBefore(newInput,input.nextSibling.nextSibling.nextSibling);	

		var newInput = document.createElement('input');
		newInput.type = "button";
		newInput.value = "Encryption password";
		newInput.addEventListener("click", setKey, false);
		input.parentNode.insertBefore(newInput,input.nextSibling.nextSibling.nextSibling.nextSibling);

		var newbr = document.createElement('br');
		newbr.type = "br";
		input.parentNode.insertBefore(newbr,input.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling);
		var newbr = document.createElement('br');
		newbr.type = "br";
		input.parentNode.insertBefore(newbr,input.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling);
		var newbr = document.createElement('br');
		newbr.type = "br";
		input.parentNode.insertBefore(newbr,input.nextSibling.nextSibling.nextSibling);
		var newbr = document.createElement('br');
		newbr.type = "br";
		input.parentNode.insertBefore(newbr,input.nextSibling.nextSibling.nextSibling);
		
		var ftable = document.getElementsByTagName('table')[0];

		for (var i = 1; ftable.rows[i+1]; i+=2) {
			var post = ftable.rows[i].cells[1];
			if (page == "forum_view") {
				post = post.firstChild;
			}
			post.innerHTML = msgDecrypt(post.innerHTML);
		}
	}
}
else if (page == "message") {
	var tArea = document.getElementsByTagName('textarea')[0];
	if (tArea) {
		var input = document.getElementsByTagName('input');
		input = input[input.length-1];
		var newInput = document.createElement('input');
		newInput.type = "button";
		newInput.value = "Encrypt";
		newInput.addEventListener("click", encrypt, false);
		input.parentNode.insertBefore(newInput,input.nextSibling);

		var newInput = document.createElement('input');
		newInput.type = "text";
		newInput.value = "";
		newInput.size = "10";
		newInput.maxlength = "20";
		input.parentNode.insertBefore(newInput,input.nextSibling.nextSibling.nextSibling);	

		var newInput = document.createElement('input');
		newInput.type = "button";
		newInput.value = "Encryption password";
		newInput.addEventListener("click", setKey, false);
		input.parentNode.insertBefore(newInput,input.nextSibling.nextSibling.nextSibling.nextSibling);

		var newbr = document.createElement('br');
		newbr.type = "br";
		input.parentNode.insertBefore(newbr,input.nextSibling.nextSibling.nextSibling);
		var newbr = document.createElement('br');
		newbr.type = "br";
		input.parentNode.insertBefore(newbr,input.nextSibling.nextSibling.nextSibling);

		
	}
}
else if (page == "view_colony") {
	var tArea = document.getElementsByTagName('textarea')[0];
	if (tArea) {
		var input = document.getElementsByTagName('input');
		input = input[input.length-2];
		var newInput = document.createElement('input');
		newInput.type = "button";
		newInput.value = "Encrypt";
		newInput.addEventListener("click", encrypt, false);
		input.parentNode.insertBefore(newInput,input.nextSibling);

		var newInput = document.createElement('input');
		newInput.type = "button";
		newInput.value = "Decrypt";
		newInput.addEventListener("click", decrypt, false);
		input.parentNode.insertBefore(newInput,input.nextSibling.nextSibling);

		var newInput = document.createElement('input');
		newInput.type = "text";
		newInput.value = "";
		newInput.size = "10";
		newInput.maxlength = "20";
		input.parentNode.insertBefore(newInput,input.nextSibling.nextSibling.nextSibling);	

		var newInput = document.createElement('input');
		newInput.type = "button";
		newInput.value = "Encryption password";
		newInput.addEventListener("click", setKey, false);
		input.parentNode.insertBefore(newInput,input.nextSibling.nextSibling.nextSibling.nextSibling);

		var newbr = document.createElement('br');
		newbr.type = "br";
		input.parentNode.insertBefore(newbr,input.nextSibling.nextSibling.nextSibling);
		var newbr = document.createElement('br');
		newbr.type = "br";
		input.parentNode.insertBefore(newbr,input.nextSibling.nextSibling.nextSibling);
	}
}
