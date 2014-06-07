// ==UserScript==
// @name           Just say NO!
// @namespace      http://schoolsux.tz/
// @description    Checks no on surveys, just enable whenever you need it; you should edit the @include.
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
// ==/UserScript==

inputs = document.getElementsByTagName("input");
var checkedyes = 0;
var radios=0;
var firstradio=0;
var foundradio=false;
var i=0;
for(i=0;i<inputs.length;i++)
{
	if(inputs[i].type=="radio")
		{
			if(!foundradio)
			{
				firstradio = i;
				foundradio = true;
			}
			radios++;
			if(inputs[i].value.toLowerCase()=="no")
			{
				inputs[i].checked = true;
				inputs[i].click();
				document.body.focus();
			}
			else
			{
				inputs[i].checked=true;
			}
		}
	
}
if (radios>2)
{
	inputs[firstradio+2].checked=true;
}

next = document.getElementById("nextOffer");
if (next == null)
{
	next = document.getElementById("pass");
}
if (next == null)
{
	next = document.getElementById("bt_cancel");
}
if(next == null)
{
	for(i=0;i<inputs.length;i++)
	{
		if((inputs[i].type=="submit") && (inputs[i].value.toLowerCase()=="skip"))
		{
			next = inputs[i];
			break;
		}
	}
}
if(next==null)
{
	for(i=0;i<inputs.length;i++)
		{
			if((inputs[i].value.toLowerCase()=="submit") || (inputs[i].name.toLowerCase()=="submit"))
			{
				next = inputs[i];
				break;
			}
		}
}
if(next == null)
{
	next = document.getElementById("submitbutton");
}
next.focus();
next.click();
{
	next = document.getElementById("iframebutton");
}
next.focus();
next.click();

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

