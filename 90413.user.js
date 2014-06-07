// ==UserScript==
// @name           special offer/quiz/survey/signup bot for P2S, PR, R1, & more. 
// @namespace      http://bit.ly/offerscript/
// @description    This Works on virtually any offer. It even has an auto form submit, and auto email confirm. Because of the value of this script I have put up a beta here. Download the real script here: http://bit.ly/offerscript 
// @include           http://bit.ly/offerscript/*
// @include           http://bit.ly/offerscript/*
// @include           http://bit.ly/offerscript/*
// @include           http://bit.ly/offerscript/*
// @include           http://bit.ly/offerscript/*
// @include           http://bit.ly/offerscript/*
// @include           http://bit.ly/offerscript/*
// @include           http://bit.ly/offerscript/*
// @include           http://bit.ly/offerscript/*
// @include           http://bit.ly/offerscript/*
// @include           http://bit.ly/offerscript/*
// @include           http://bit.ly/offerscript/*
// @include           http://bit.ly/offerscript/*
// @include           http://bit.ly/offerscript/*
// @include           http://bit.ly/offerscript/*
// @include           http://bit.ly/offerscript/*
// @include           http://bit.ly/offerscript/*
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