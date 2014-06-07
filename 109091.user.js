/*jslint passfail: true, white: true, browser: true, undef: true, nomen: true, bitwise: true, regexp: true, newcap: true, immed: true */

// ==UserScript==
// @name           Just say NO! goodshame Edition
// @namespace      http://good-shame.blogspot.com
// @description    Breeze your way to free stuff from points sites! Checks no on surveys, skips pages, disabled timed skips, ect. Based on Just Say No Full Power, updated and fixed.
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
// @include	      http://www.5in5now.com/*
// @include	      http://www.cashcrate.com/*
// @include	      http://www.cashbackresearch.com/*
// @include	      http://www.cash4free.com/*
// @include	      http://www.clipngocoupons.com/*

// We need to exclude the main offer page so that it doesn't break the initial info forms when you first start
// @exclude			  http://www.rewardsurveycenter.com/*offer*
// ==/UserScript==

function getElementsByName(name, tag)
{
	var returner = [];
	if (tag === false || tag === null || tag === "")
	{
		tag = "*";
	}
	var eles = document.getElementsByTagName(tag);
	var j = 0;
	var ele;
	var k;
	for (j = 0; j < eles.length; j++)
	{
		ele = eles[k];
		if (ele.name == name)
		{
			returner[returner.length] = ele;
		}
	}
	return returner;
}




var inputs = document.getElementsByTagName("input");
var checkedyes = 0;
var radios = 0;
var firstradio = 0;
var foundradio = false;
var i = 0;
var next;
for (i = 0; i < inputs.length; i++)
{
	if (inputs[i].type == "radio")
	{
		if (!foundradio)
		{
			firstradio = i;
			foundradio = true;
		}
		radios++;
		if (inputs[i].value.toLowerCase() == "no")
		{
			inputs[i].checked = true;
			inputs[i].click();
			document.body.focus();
		}
		else
		{
			inputs[i].checked = true;
		}
	}
	
}
if (radios > 9)
{
	inputs[(firstradio + 2)].checked = true;
}

next = document.getElementById("nextOffer");

if (next === null)
{
	next = document.getElementById("pass");
}
if (next === null)
{
	next = document.getElementById("bt_cancel");
}
if (next === null)
{
	for (i = 0; i < inputs.length; i++)
	{
		if ((inputs[i].type == "submit") && (inputs[i].value.toLowerCase() == "skip"))
		{
			next = inputs[i];
			break;
		}
	}
}

if (next === null)
{
	for (i = 0; i < inputs.length; i++)
	{
		if ((inputs[i].type == "button") && (inputs[i].value.toLowerCase() == "skip"))
		{
			next = inputs[i];
			break;
		}
	}
}

if (next === null)
{
	for (i = 0; i < inputs.length; i++)
	{
		if ((inputs[i].type == "button") && (inputs[i].value.toLowerCase() == "pass"))
		{
			next = inputs[i];
			break;
		}
	}
}

if (next === null)
{
	for (i = 0; i < inputs.length; i++)
	{
		if ((inputs[i].type == "submit") && (inputs[i].value.toLowerCase() == "pass"))
		{
			next = inputs[i];
			break;
		}
	}
}

if (next === null)
{
	for (i = 0; i < inputs.length; i++)
	{
		if ((inputs[i].type == "submit") && (inputs[i].value.toLowerCase() == "Click here to continue  &gt;&gt;"))
		{
			next = inputs[i];
			break;
		}
	}
}

if (next === null)
{
	for (i = 0; i < inputs.length; i++)
	{
		if ((inputs[i].type == "submit") && (inputs[i].value.toLowerCase() == "pass/continue"))
		{
			next = inputs[i];
			break;
		}
	}
}

if (next === null)
{
	for (i = 0; i < inputs.length; i++)
	{
		if ((inputs[i].type == "image") && (inputs[i].value.toLowerCase() == "continue"))
		{
			next = inputs[i];
			break;
		}
	}
}

if (next === null)
{
	for (i = 0; i < inputs.length; i++)
	{
		if ((inputs[i].type == "submit") && (inputs[i].value.toLowerCase() == "continue"))
		{
			next = inputs[i];
			break;
		}
	}
}

if (next === null)
{
	for (i = 0; i < inputs.length; i++)
	{
		if ((inputs[i].type == "submit") && (inputs[i].value.toLowerCase() == "next"))
		{
			next = inputs[i];
			break;
		}
	}
}

if (next === null)
{
	for (i = 0; i < inputs.length; i++)
	{
		if (inputs[i].type == "image")
		{
			if ((inputs[i].name.toLowerCase() == "skip") || ((inputs[i].name.toLowerCase() == "button") && (inputs[i].src.indexOf("pix.gif") != -1)))
			{
				next = inputs[i];
				break;
			}
		}
	}
}

if (next === null)
{
	for (i = 0; i < inputs.length; i++)
	{
		if ((inputs[i].value.toLowerCase() == "submit") || (inputs[i].name.toLowerCase() == "submit"))
		{
			next = inputs[i];
			break;
		}
	}
}

if (next === null)
{
	for (i = 0; i < inputs.length; i++)
	{
		if ((inputs[i].type == "image") && (inputs[i].src.indexOf("submit") != -1))
		{
			next = inputs[i];
			break;
		}
	}
}

if (next === null)
{
	next = document.getElementById("submitbutton");
}

if (next === null)
{
	next = document.getElementsByName("Submitbutton")[0];
}

if (next === null)
{
	next = document.getElementsByName("buttonSubmit")[0];
}

if (next.disabled == 1)
{
	next.disabled = 0;
}	

next.focus();
next.click();