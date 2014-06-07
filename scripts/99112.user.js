// Version 1.0
// ==UserScript==
// @name           Registration bot222
// @description    creates user accounts on playspan by simply pressing Cntrl Shift F
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
	else if (match(input,/email/i)) {
		input.value=email+"@suremail.info";
		GM_setValue("form filler email", email);
		}
	else if (match(input,/fname|lname?r/i)) //user or login name
		input.value=email;
	else if (match(input,/recaptcha_response_field|recaptcha_challenge_field/i)) {//CAPTCHA
		input.focus(); captcha=true;}
	else
		input.value=randomWord(7+randomInt(4))+"@suremail.info";;
	retype=input.value;
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
	else if (input.type=="radio" && input.name) {
		var r=document.getElementsByName(input.name);
		r[randomInt(r.length)].checked=true;
		}
	else if (input.type=="radio")
		input.checked=true;
	else if (input.type && input.type.match(/select/))
		makeSelection(input);
	else if (input.type=="submit" && !captcha)
		input.focus();
	}

if (GM_getValue("form filler email")!=undefined && GM_getValue("form filler email")!="") {
	var a=document.createElement("a");
	a.setAttribute("href","http://mailinator.com/mailinator/maildir.jsp?email="+GM_getValue("form filler email")+"");
	a.appendChild(document.createTextNode("Check your email for confirmation link."));
	document.body.insertBefore(a, document.body.firstChild);
	GM_setValue("form filler email", "");
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
div.appendChild(document.createTextNode("Press CTRL+SHIFT+F to fill in form."));
f.parentNode.insertBefore(div, f);

var username, password, email, captcha;
function submitForm() {
	username=randomWord(randomInt(4)+8);
	password=sbsbh12;
	email=randomWord(10)+"@suremail.info";
	captcha=false;
	for (var i=0; i<f.elements.length; i++)
		fillField(f.elements[i]);
	}

function keyPressed(e) {
   if( e.ctrlKey && e.shiftKey && e.keyCode == 70 )
        submitForm();
    
}

window.addEventListener('keydown', keyPressed, false)