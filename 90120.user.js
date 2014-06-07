// Version 1.1
// ==UserScript==
// @name           zmk
// @description    Fills registration forms automatically and in ways that will look real.
// @include           http://www.eltpath.com/*
// @include           http://*.smileymedia.com/*
// @include           http://lgn*.coolsavings.com/*
// @include           http://lnktrckr.com/*
// @include           http://*quizjungle.com/?act_id=*
// @include           http://www.quizjumper.com/*
// @include           http://www.modpath.com/*
// @include           http://www.tnmtechnology.com/*
// @include           http://www.brandarama.com/*
// @include           http://www.topconsumergifts.com/*
// @include           http://offers.slwpath.com/*
// @include           http://us.quizrocket.com/*
// @include           http://www*.recipe4living.com/default*
// @include           http://www.premiumproductsonline.com/*
// @include           https://mysmokingrewards.com/*
// @include           http://www.eversave.com/*
// @include           http://www.thelaptopsaver.com/*
// @include           http://track.rewards-confirmation.info/*
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

function fillAREA(input) {
	var n=input.getAttribute("maxlength");
	if (n<=3)
		input.value=(randomInt(8)+2)+""+randomInt(100);
	else if (n>3)
		input.value=(randomInt(800)+201)+"-"+(randomInt(800)+201)+"-"+(randomInt(100));
	}
function fillPREFIX(input) {
	var n=input.getAttribute("maxlength");
	if (n<=3)
		input.value=(randomInt(1)+2)+""+randomInt(100);
	else if (n>3)
		input.value=(randomInt(800)+201)+"-"+(randomInt(800)+201)+"-"+(randomInt(100));
	}
		
function fillSUFFIX(input) {
	var n=input.getAttribute("maxlength");
	if (n<=4)
		input.value=(randomInt(1)+2)+""+randomInt(1000);
	else if (n>4)
		input.value=(randomInt(800)+201)+"-"+(randomInt(800)+201)+"-"+(randomInt(1000));
	
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
	else if (match(input,/login|use?r/i)) //user or login name
		input.value=username;
	else if (match(input,/AREA/i)) //phone number
		fillAREA(input);
	else if (match(input,/PREFIX/i)) //phone number
		fillPREFIX(input);
	else if (match(input,/SUFFIX/i)) //phone number
		fillSUFFIX(input);
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

//function keyPressed(e) {
//   if( e.ctrlKey && e.shiftKey && e.keyCode == 70 )
        submitForm();
    
//}

//window.addEventListener('keydown', keyPressed, false)