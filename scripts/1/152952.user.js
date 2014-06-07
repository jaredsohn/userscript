// ==UserScript==
// @name              Just say NO! fork
// @namespace         http://www.meeek.com/
// @description       Fork: Checks no on surveys, just enable whenever you need it. You should edit the @include if you find a site not working.
// @author            meeekus
// @version           1.0.2
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
// @include           http://track.superb-rewards.net/*
// @include           http://dkr1.ssisurveys.com/*
// @include           http://ups.surveyrouter.com/*
// @include           http://surveyhead.com/*
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