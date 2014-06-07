// ==UserScript==
// @name           YTAPYoutubeAutoPlay
// @namespace      http://userscripts.org/users/272625
// @description    Plays Videos Automatically, trying to match the next video with the one playing
// @include        http://*.youtube.com/*
// @version        3.2.0
// ==/UserScript==

//Used as source of inspiration
// YouTube Random Video Playlist
// from JoeSimmons
//      http://userscripts.org/users/23652


// get() function by JoeSimmons
// Syntax: get('http://www.google.com/', handleResponse);

//Version 2.0.0
//Added attempt to unlock videos caught in the spinner lala land
//Added anti-drift code to prevent falling into a series of videos far
//in relativity from the originally clicked one

//Version 3.0.1
//removed the spinner/unlock video code and moved it to YTAPYoutubeSpinnerBeGone
//if the video is a response (starts with "re:") it is ignored if you decided it so from the menu
//tweaked the drift prevention

//Version 3.1.0
//Fixed to new youtube document formating

//version 3.2.0
//Better detection of end of playing that skips the youtube suggestions
//renamed functions
//added detection of selected text to force following a certain trend
//if you select some text, at the moment of automatic play next, the
//selected text will take priority in the selection of the next video
//the selected will be remembered and force the system until it is
//cleared, which happens when you go to www.youtube.com


function get(url, cb) {
GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    headers: {'Accept': 'application/atom+xml,application/xml,text/xml,text/html'},
    onload: function(r) {cb(r);}
});
}

// inArray function by JoeSimmons
Array.prototype.inArray = function (value) {
	var i;
	for (i=0; i < this.length; i++) {
		if (this[i] === value) {
			return true;
		}
	}
	return false;
};

//rest by icuurd12b42
function getSelText()
{
return document.getSelection();
   
}
var difcount = 0;
var matchcount = 0;
Array.prototype.YTAP_APFindNextMatch = function (value,def) {

	var i,j;
	var tofind = value.split(" ");
	var tolook;
	var curct = 0;
	var oldct = 0;
	var foundat = -100;
	
	var difcountat = 0;
	//alert("Find");
	var leftpart;
	for (i=0; i < this.length; i++) 
	{
		leftpart = this[i].substr(0,this[i].indexOf('<YTAP>'));
		tolook = leftpart.split(" ");
		curct = 0;
		difcountat = 0;
		for(j=0; j<tofind.length;j++)
		{
			if(tolook.inArray(tofind[j]))
			{
				curct+= 1;
			}
			else
			{
				difcountat+=1;
			}
		}
		if(curct>oldct &&  GM_getValue("YTAP_Played" + leftpart,0) == 0)
		{
			oldct = curct;
			foundat = i;
			difcount = difcountat;
		}
	}
	matchcount = oldct;
	//alert("Found AT " + foundat);
	//alert("Found This " + this[foundat].substr(0,this[foundat].indexOf('<YTAP>')));
	//alert("Looking for " + value);
	if(foundat == -100) return def;
	return foundat;
};

var s1len = 0;
function YTAP_APCountWordMatch(s1,s2) {

	var i,j;
	var ls1 = s1.toLowerCase();
	var ls2 = s2.toLowerCase();
	var f1 = ls1.split(" ");
	var f2 = ls2.split(" ");
	var curct = 0;
	
	for (i=0; i < f1.length; i++) 
	{
		for(j=0; j<f2.length;j++)
		{
			curct+= (f1[i] == f2[j]);
		}
	}
	s1len = f1.length;
	return curct;
};

var intv = -100;
function YTAP_Listen()
{
	var sd;
	//alert('Listen PState:' + unsafeWindow._gel('movie_player').getPlayerState());
	if((unsafeWindow._gel('movie_player').getPlayerState()==0)
		|| (Math.round(unsafeWindow._gel('movie_player').getCurrentTime()) >= 
		Math.round(unsafeWindow._gel('movie_player').getDuration()))) 
	{
	//alert(getSelText());
	
		unsafeWindow._gel('movie_player').pauseVideo();
		
		//alert("Done Playing")
		clearInterval(intv);
		inv = -100;
		if(GM_getValue("YTAP_Autoplay",false) == false)
		{
			return;
		}
		if(getSelText() != "")
			GM_setValue("YTAP_SelText",getSelText());
		//alert('Listen PState:' + unsafeWindow._gel('movie_player').getPlayerState());
		//alert(window.location);
		get
		(window.location, 
			function(r)
			{
				videos=new Array();
		//alert("Function r");
		//alert(r.responseText);
				var start;
				var at; at = 0;
				var end;
				var tfound;
				var vfound;
				var data;
				var done = false;
				var lp;
				start = r.responseText.indexOf('<title>');
				at = start+7;
				start = r.responseText.indexOf('- ',at);
				at = start+2;
				end = r.responseText.indexOf('\n',at);
				at = end;
				lp = r.responseText.substring(start+2,end);
				lp = lp.toLowerCase();
				GM_setValue("YTAP_LastPlayedBefore",GM_getValue("YTAP_LastPlayed",""));
				GM_setValue("YTAP_LastPlayed",lp);
		//alert ("Title '" + lp +"'");
				
				while(!done)
				{
					done = true;
					sd = 'class="yt-uix-button-group addto-container short video-actions" data-video-ids="';
					start = r.responseText.indexOf(sd,at);
		//alert("start '" + start +"'");
					at = start+sd.length;
					if(start>1)
					{
						end = r.responseText.indexOf('"', at);
						at = end;
						if(end>1)
						{
							vfound = r.responseText.substring(start+sd.length,end);
							
		//alert("vfound '" + vfound +"'");
							sd = '<span dir="ltr" class="title" title="';
							start = r.responseText.indexOf(sd, at);
							at = start+sd.length;
							if(start>1)
							{
								end = r.responseText.indexOf('"', at);
								at = end;
								if(end>1)
								{
									tfound = r.responseText.substring(start+sd.length,end);
									tfound = tfound.toLowerCase();
		//alert("tfound '" + tfound +"'");
									at = end;
									data = tfound + "<YTAP>" + vfound;
		//alert("Data '" + data +"'");
									
									if(!videos.inArray(data)) 
									{
										if(GM_getValue('YTAP_IgnoreResponse','yes') == "yes")
										{
											//if(!data.substring(0,3) == "re:")
											{
												videos.push(data);
											}
										}
										else
											videos.push(data);
									}
									done = false;
								}
							}
						}
					}
				}
				//alert("NumItems:" + videos.length);
				videos.sort();
				/*
				var st = "";
				var i;
				for(i = 0; i<videos.length; i++)
				{
					st+=videos[i];
					st += "\r\n";
				}
				alert(st);
				*/
				var lastplayed = GM_getValue("YTAP_LastPlayed","");
				var next = videos.YTAP_APFindNextMatch(lastplayed,0);
				var thiscount = difcount;
				var thismatchct=matchcount;
				var lastbefore = GM_getValue("YTAP_LastPlayedBefore",GM_getValue("YTAP_LastPlayed",""));
				GM_setValue("YTAP_Played"+lastbefore,1);
				//drift prevention
				var nextbefore = videos.YTAP_APFindNextMatch(lastbefore,-100);
				var nextcount = difcount;
				if(nextbefore !=-100 && nextcount < thiscount) 
				{
					//GM_setValue("YTAP_LastPlayed",GM_getValue("YTAP_LastPlayedBefore",""));
					next = nextbefore;
					thismatchct=matchcount;
				}
				//alert(GM_getValue("YTAP_SelText","") + " " + videos[next]);
				if(GM_getValue("YTAP_SelText","") != "")
				{
					if(
						YTAP_APCountWordMatch(
							GM_getValue("YTAP_SelText",""),
							videos[next])
						== 0
					)
					
					{
						//alert(GM_getValue("YTAP_SelText",""));
						var snext = videos.YTAP_APFindNextMatch(GM_getValue("YTAP_SelText",""),-100);
						if(snext!=-100) next = snext;
					}
				}
				
				GM_setValue("YTAP_Played"+lastplayed,1);
				
				var url = "http://www.youtube.com/watch?v="+videos[next].slice(videos[next].indexOf('<YTAP>')+6)+GM_getValue('YTAP_Arguments','');
		//alert("OK, onto " + videos[next]);
				window.location = url;
				return;
			}
		);
	}
	
	return;
}

		
function YTAP_OnLoad()
{
	
	if(""+window.location == "www.youtube.com")
			GM_setValue("YTAP_SelText","")
	if(!document.getElementById('movie_player')) 
	{
		return;
	}
	//alert('Load');
	intv=setInterval(function(){YTAP_Listen();}, 500);
	
}
function YTAP_OnUnload()
{
	//alert('Unload');
	if(intv != -100) 
	{
		clearInterval(intv);
	}
}

window.addEventListener('load', function(){YTAP_OnLoad();}, false);
window.addEventListener('unload', function(){YTAP_OnUnload();}, false);


function YTAP_APAutoplayStart() {
	GM_setValue("YTAP_Autoplay",true);
	alert("The feature will be enabled now and everytime you return to youtube and click a video!\r\nDon't forget to end the autoplaying with the menu when you no longer need the feature.\r\nThe Played list will also be remembered from session to session, you can clear it in the menu.");
}


function YTAP_APAutoplayEnd() {
	GM_setValue("YTAP_Autoplay",false);
	alert("The feature will be disabled for now on.\r\nThe played list will be remembered though.");
}

function YTAP_APArguments() {
	GM_setValue('YTAP_Arguments',prompt('Enter Extra Arguments. (eg &feature=related&fmt=18)', GM_getValue('YTAP_Arguments','')));
}

function YTAP_APIgnoreResponse() {
	GM_setValue('YTAP_IgnoreResponse',prompt('Ignore video responses when detecting next video\r\nType yes or no, lowercase', GM_getValue('YTAP_IgnoreResponse','yes')));
}

function YTAP_APReset()
{
	var vals = [];
	var ct = 0;
	for each (var val in GM_listValues()) {
		vals.push(val);
	}	
	for(var i = 0; i<vals.length; i++)
	{
		//alert("At " + vals[i]);
		//alert("if " + vals[i].indexOf("TAP_Played",1));
		if(vals[i].indexOf("TAP_Played",1) == 1)
		{
			//alert("DELETING "+vals[i]);
			GM_deleteValue(vals[i]);
			ct+=1;
		}
	}
	GM_deleteValue("YTAP_LastPlayed");
	GM_deleteValue("YTAP_LastPlayedBefore");
	
	alert("Played list Cleared... " + ct + " items removed.");

}

GM_registerMenuCommand('YTAP Start Youtube Autoplay', function(){YTAP_APAutoplayStart();});
GM_registerMenuCommand('YTAP End Youtube Autoplay', function(){YTAP_APAutoplayEnd();});
GM_registerMenuCommand('YTAP Autoplay Extra Arguments', function(){YTAP_APArguments();});
GM_registerMenuCommand('YTAP Autoplay Ignore Response', function(){YTAP_APIgnoreResponse();});
GM_registerMenuCommand('YTAP Reset Flagged as Played', function(){YTAP_APReset();});



