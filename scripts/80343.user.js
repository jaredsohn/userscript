// ==UserScript==
// @name           Legacy ZMK
// @namespace      Ryuu
// @description    Fills in pages with even proper phone parts

// @version        	0.0.3
// @author         	Ryuu
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
	var n=input.getAttribute(3);
	if (n<=10)
		input.value=1+randomInt(1000);
//	 if (n<10) input.value=(randomInt(800)+201)+"-"+(randomInt(800)+201)+"-"+(randomInt(10000));
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
		input.value=email+"@mailinator.com";
		GM_setValue("form filler email", email);
		}
	else if (match(input,/login|use?r/i)) //user or login name
		input.value=username;
	else if (match(input,/phone/i)) //phone number
		fillPhoneNumber(input);
	else if (match(input,/zip/i) || input.getAttribute("maxlength")==5) //zip code
		input.value=randomInt(90000)+10000;
	else if (match(input,/code|ima?ge?/i)) {//CAPTCHA
		input.focus(); captcha=true;}
	else if (match(input,/year/i) || input.getAttribute("maxlength")==4) //year of birth
		input.value=1926+randomInt(60);
	else if (match(input,/day|date/i) || input.getAttribute("maxlength")==2) //date of birth
		input.value=randomInt(28)+1;
	else if (match(input,/nu?m?be?r/i))
		input.value=randomInt(10000000)+42;
	else
		input.value=randomWord(7+randomInt(4));
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
	password=randomWord(8)+randomInt(100);
	email=randomWord(10);
	captcha=false;
	for (var i=0; i<f.elements.length; i++)
		fillField(f.elements[i]);
	}

function keyPressed(e) {
   if( e.ctrlKey && e.shiftKey && e.keyCode == 70 )
        submitForm();
    
}

window.addEventListener('keydown', keyPressed, false)










function keyPressed(e) {
   if( e.ctrlKey && e.shiftKey && e.keyCode == 90 )
        submitForm();
    
}



window.addEventListener('keydown', keyPressed, false)