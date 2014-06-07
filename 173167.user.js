// ==UserScript==
// @name Twitter Read Mark
// @namespace AQM
// @description Scroll to the marked tweet
// @include https://twitter.com/
// @grant GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==


function SaveLocationfunction(sinder) // function that store the id of selected tweet in a variable called TP for future use
{
tweetpointer=sinder.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id; // find the tweet id 
// bug here ?? nodes order change when tweet expand
// note to self : write code to get tweet id when it is expanded
GM_setValue("TP", tweetpointer); // store the tweet id
TweetID=GM_getValue("TP");
// bug here ?? stored value lost when firefox close unexpectedly
// note to self : try to use IndexedDB
alert(tweetpointer.substring(18)); // display stored tweet id for debugging purboses
console.log(tweetpointer.substring(18)); // display stored tweet id or debugging purboses
}

function ScrollToTweetfunction(TweetID) // this function will be activitaed when pressing 'Go to read mark' button
{
// future work : add event lisnter (dom node added)
GTRMP=true;
timelineaddittion();
	
}

function CreateMarks()
{
	var RMall=document.getElementsByClassName("MyMarks");
	if (RMall != undefined)
	{	
		RMl=RMall.length
		for (var i=0;i<RMl-1;i++)
		{
		RMall[0].parentNode.removeChild(RMall[0]);
		}
	
	}
	L=document.getElementsByClassName("js-stream-item stream-item stream-item expanding-stream-item").length;
	Q=document.getElementsByClassName("dropdown-menu");
	for (var i=2;i<L+3;i++)
	{
	var RM = document.createElement("a");//Create Marks
	RM.className="MyMarks";
	RM.onclick=function(){SaveLocationfunction(this.parentNode);};
	var t=document.createTextNode("Read Mark");
	RM.appendChild(t);
	Q[i].appendChild( RM );
	}
	
}

function timelineaddittion()
{
	var SelectedTweet=document.getElementById(TweetID);
	
	
	if (GTRMP)
	{
		if (SelectedTweet == undefined) // selected tweet is not displayed, scroll to bottom to load more tweets
		{
		document.getElementsByClassName("stream-footer ")[0].scrollIntoView(false);
		}
		else
		{
		GTRMP=false;
		SelectedTweet.scrollIntoView(false);
		}
	}	
	CreateMarks();
	
}

var aa=document.getElementsByTagName( 'body' ) [0].className;
var t=document.title;

if (t=="Twitter" && aa[10]=="i")	//check if you logged in first, then procced
  {
	   
	var RMPB = document.createElement("input");//Create button
	RMPB.type = "button";
 	RMPB.id = "TRM"
	RMPB.value = "Go to read mark";
	TweetID=GM_getValue("TP");
	RMPB.onclick=function(){ScrollToTweetfunction(GM_getValue("TP"));};
	document.getElementsByClassName("header-inner")[0].appendChild( RMPB );//Add the button to the page
	CreateMarks();
	var tweetsbox=document.getElementsByClassName("stream-container")[0];
	GTRMP=false;
	tweetsbox.addEventListener("DOMAttrModified", function(){timelineaddittion();}, false);
		
  }
else
  {
  // you are not logged in
  }