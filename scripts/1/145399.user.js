// ==UserScript==
// @name           mrhai777 mmo4vn v1.0
// @namespace      
// @description    mrhai777 mmo4vn v1.0
// @include           http://www.eltpath.com/*
// @include           http://*.smileymedia.com/*
// @include           http://lgn*.coolsavings.com/*
// @include           http://lgn6.coolsavings.com/*
// @include           https://register.remedylife.com/*
// @include           http://register.remedylife.com/*
// @include           http://remedylife.com/*
// @include           http://claim.millionairesurveys.com/*
// @include           http://millionairesurveys.com/*
// @include           http://press.eatgoodfood.info/*
// @include           http://eatgoodfood.info/*
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
// @include           http://lsa.lifescript.com/*
// @include           http:/*.lifescript.com/*
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
// @include           http://www.eversave.com/*     
// @include           http://my.amazingfreerewards.com/*
// @include           http://select.freeprizerewards.com/*  
// @include           http://track.wincoolgifts.com/*
// @include           http://www.flu23.com/*
// @include           http://reg.winningsurveys.com/*
// @include           http://*winningsurveys.com/*
// @include           http://reg.bigbucksurveys.com/*
// @include           http://*bigbucksurveys.com/*
// @include           http://reg.consumerexpressions.com/*
// @include           http://*consumerexpressions.com/*
// @include           http://reg.clipngocoupons.com/*
// @include	      http://www.5in5now.com/*
// @include	      http://www.cashcrate.com/*
// @include	      http://www.cashbackresearch.com/*
// @include	      http://www.cash4free.com/*
// @include           http://*clipngocoupons.com/*
// @include           http://reg.cool-surveys.com/*
// @include           http://*cool-surveys.com/*
// @include           http://track.superb-rewards.net/
// @include           http://www.freeyoutubesubscribers.com/
// @include           http://fileme.us/
// @include           http://www.minecraftaccounts.com/members.php#
// @include           http://www.minecraftaccounts.com/members.php
// ==/UserScript==

inputs = document.getElementsByTagName("input");
var checkedyes = 0;
var radios=0;
var firstradio=0;
var foundradio=false;
var ztiming=0;
if(ztiming<=20){ztiming+=1;}
else
var i=0;
var next;
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
	next = document.getElementById("Pass");
}
if (next == null)
{
	next = document.getElementById("PASS");
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
if(next == null)
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
if(next == null)
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
if(next == null)
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
if(next == null)
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
		if ((inputs[i].type == "submit") && (inputs[i].value.toLowerCase() == "Pass"))
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
		if ((inputs[i].type == "submit") && (inputs[i].value.toLowerCase() == "PASS"))
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
		if ((inputs[i].type == "submit") && (inputs[i].value.toLowerCase() == "Continue"))
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
		if ((inputs[i].type == "submit") && (inputs[i].value.toLowerCase() == "CONTINUE"))
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
		if ((inputs[i].type == "submit") && (inputs[i].value.toLowerCase() == "Next"))
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
		if ((inputs[i].type == "submit") && (inputs[i].value.toLowerCase() == "NEXT"))
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
		if ((inputs[i].value.toLowerCase() == "submit") || (inputs[i].name.toLowerCase() == "submit"))
		{
			next = inputs[i];
			break;
		}
	}
}
if (radios>9)
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
	next = document.getElementById("Pass");
}
if (next == null)
{
	next = document.getElementById("PASS");
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
if(next == null)
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
if(next == null)
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
if(next == null)
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
if(next == null)
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
		if ((inputs[i].type == "submit") && (inputs[i].value.toLowerCase() == "Pass"))
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
		if ((inputs[i].type == "submit") && (inputs[i].value.toLowerCase() == "PASS"))
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
		if ((inputs[i].type == "submit") && (inputs[i].value.toLowerCase() == "Continue"))
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
		if ((inputs[i].type == "submit") && (inputs[i].value.toLowerCase() == "CONTINUE"))
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
		if ((inputs[i].type == "submit") && (inputs[i].value.toLowerCase() == "Next"))
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
		if ((inputs[i].type == "submit") && (inputs[i].value.toLowerCase() == "NEXT"))
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
		if ((inputs[i].value.toLowerCase() == "submit") || (inputs[i].name.toLowerCase() == "submit"))
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

next.focus();
next.click();