// ==UserScript==
// @name           Just say NO by loveland_bmt
// @namespace      http://lovelandbmt.blogspot.com
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
// @include           http://www.your-gift-zone.com/*
// @include           http://www.reward-aisle.com/*
// @include           http://www.clashmediausa.com/*
// @include           http://adserve.freebrandalert.com/*
// @include           http://adserve.brandgivewaycentre.com/*
// @include           http://www.my-rewardsvault.com/*
// @include           http://track.opinion-reward-center.net/*
// @include           http://adserve.internetgiveawaygroup.com/*
// @include           http://www.rewardsurveycenter.com/*.php*
// @include           http://www.coregmedia.com/*
// @include	      http://www.clashmediausa.com/*
// @include	      http://adserve.brandsamplecenter.com/*
// @include           http://lgn6.coolsavings.com/*
// @include           http://track.tester-rewards.com/*
// @include           http://www.rewardsflow.com/*
// @include           http://gtoffers.com/*
// @include           http://www.silver-path.com/*
// @include           http://ec2-174-129-32-167.compute-1.amazonaws.com/*
// @include           http://tr.freebie-fusion.net/*
// @include           http://www.em3trker.com/* 
// @include           http://www.shopperdealsdirect.com/*   
// @include           http://my.amazingfreerewards.com/*
// @include           http://select.freeprizerewards.com/*  
// @include           http://www.eversave.com/*  
// @include           http://track.wincoolgifts.com/*  
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
{
	if(inputs[i].type=="radio")
		{
			if(!foundradio)
			{
				firstradio = i;
				foundradio = true;
			}
			radios++;
			if(inputs[i].value.toLowerCase()=="No")
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
{
	if(inputs[i].type=="radio")
		{
			if(!foundradio)
			{
				firstradio = i;
				foundradio = true;
			}
			radios++;
			if(inputs[i].value.toLowerCase()=="NO")
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
	next = document.getElementById("PASS");
}
if (next == null)
{
	next = document.getElementById("Pass");
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
{
	for(i=0;i<inputs.length;i++)
	{
		if((inputs[i].type=="Submit") && (inputs[i].value.toLowerCase()=="Skip"))
		{
			next = inputs[i];
			break;
		}
	}
}
{
	for(i=0;i<inputs.length;i++)
	{
		if((inputs[i].type=="SUBMIT") && (inputs[i].value.toLowerCase()=="SKIP"))
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
for(i=0;i<inputs.length;i++)
	{
		if((inputs[i].type=="submit") && (inputs[i].value.toLowerCase()=="skip"))
		{
			next = inputs[i];
			break;
		}
	}
}
{
	for(i=0;i<inputs.length;i++)
	{
		if((inputs[i].type=="Submit") && (inputs[i].value.toLowerCase()=="no thanks"))
		{
			next = inputs[i];
			break;
		}
	}
}
{
	for(i=0;i<inputs.length;i++)
	{
		if((inputs[i].type=="SUBMIT") && (inputs[i].value.toLowerCase()=="no thanks "))
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


