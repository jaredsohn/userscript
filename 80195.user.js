// Version 2.5
// ==UserScript==
// @name           Auto Random Email Filler ZMK
// @description    Fills in Email section of forms for you, hold ctrl+shift+Z
// @include        *
// ==/UserScript==


function randomInt(max) {
	return Math.floor(Math.random()*max);
	}

function match(input, regexp) {
	return ((input.name && input.name.match(regexp)) ||
		(input.id && input.id.match(regexp)));
	}

function randomWord(length) {
	var word="";
	for (var i=0; i<length; i++)
		word+=String.fromCharCode(randomInt(26)+97);
	return word;
	}

function fillPhoneNumber(input) {
	var n=input.getAttribute("maxlength");
	if (n<=10)
		input.value=(randomInt(8)+2)+""+randomInt(1000000000);
	else if (n>10)
		input.value=(randomInt(800)+201)+"-"+(randomInt(800)+201)+"-"+(randomInt(10000));
	}

function makeSelection(select) {
	if (select.length>2)
		select.selectedIndex=randomInt(select.length-2)+2;
	else
		select.selectedIndex=0;
	}

var retype;
function fillTextBox(input) {
	
if (match(input,/retype|c(on)?fi?rm/i) && retype)
		input.value=retype;
	
else if (match(input,/e-?mail/i)) {
		input.value=email+"@gmail.com";
		GM_setValue("form filler email", email);
		}






	}

function fillField(input) {
	if (input.type=="hidden")
		return;
	else if (input.type=="password")
		input.value=password;
else if (input.type=="text")
		fillTextBox(input);
	else if (input.type=="checkbox")
		input.checked=true;


	else if (input.type=="submit" && !captcha)
		input.focus();
	}

if (!document.forms.length)
	return;

var f=document.forms[0];
for (var i=1; i<document.forms.length; i++)
	if (document.forms[i].elements.length>f.elements.length)
		f=document.forms[i];
if (f.elements.length<7)
	return;

var div=document.createElement("div");
div.appendChild(document.createTextNode("Press CTRL+SHIFT+Z to fill in form."));
f.parentNode.insertBefore(div, f);

var username, password, email, captcha;
function submitForm() {
	username=randomWord(randomInt(4)+8);
	password=randomWord(8)+randomInt(100);
	email=randomWord(randomInt(8)+randomInt(8)+5);
	captcha=false;
	for (var i=0; i<f.elements.length; i++)
		fillField(f.elements[i]);
	}

function keyPressed(e) {
   if( e.ctrlKey && e.shiftKey && e.keyCode == 90 )
        submitForm();
    
}



window.addEventListener('keydown', keyPressed, false)