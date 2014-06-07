// ==UserScript==
// @name              PrizeFrog Feedback Crack
// @namespace         http://www.prizepwr.com/
// @description       Submits Feedback On PrizeFrog Rather Quickly! 
// @author            Palguy/EvanC90
// @version           2.0
// @include           http://rewards.prizefrog.com/asp3/SurveyDetail.aspx*
// @include           http://rewards.prizefrog.com/*
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
			if((inputs[i].value.toLowerCase()=="submit feedback") || (inputs[i].name.toLowerCase()=="submit feedback"))
			{
				next = inputs[i];
				break;
			}
		}
}
if(next == null)
{
	next = document.getElementById("submitsurvey");
}
next.focus();
next.click();