// ==UserScript==
// @name           FaceBook WestWars
// @namespace      FBWestWars
// @include        https://fb.westwars.com/game/*
// ==/UserScript==


// @include        https://apps.facebook.com/westwarsgame/*

alert('line zero');

function fCalculate()
{
alert('Start fCalculate');
var myButtons = document.getElementsByTagName('a');
if (myButtons)
	{
	for (i = 0; i < myButtons.length; i++)
		{
		myCost = 0;
		myReward = 0;
		myButton = myButtons[i];
		if (myButton.className.indexOf("button_fight") != -1)
			{
			myCost = parseFloat(myButton.innerHTML);
			myParent = myButton.parentNode;
			if (myParent)
				{
				myDivs = myParent.getElementsByTagName('div');
				if (myDivs)
					{
					for (j = 0; j < myDivs.length; j++)
						{
						if (myDivs[j].className == 'rewards')
							{
							myDiv = myDivs[j];
							myRewards = myDiv.getElementsByTagName('div');
							if (myRewards)
								{
								for (k = 0; k < myRewards.length; k++)
									{
									if (myRewards[k].className == 'reward job_exp')
										{
										myReward = parseFloat(myRewards[k].innerHTML);
										}
									}
								}
							}
						
						}
					}
				}
			}
			//console.log ('myCost: ' + myCost + ', myReward:' + myReward);
			if (myCost != 0 && myReward != 0;)
				{
				myRatio = myReward / myCost;
				myButton.innerHTML += '<br />' + myRatio;
				}
		}
	}
}

function fStart()
{
//setTimeout(function(){helloworld();}, maxCheckInterval);
alert('Start');
Calculate();
}

if (document.body) fCalculate();
else window.addEventListener('DOMContentLoaded', fCalculate, false);

//if (document.body) fStart();
//else window.addEventListener('DOMContentLoaded', fStart, false);

//fStart();
//alert('aaa');
