// ==UserScript==
// @name           Online Demonstration SGAE
// @version	   0.0.1
// @namespace      http://www.sgae.es
// @description    12-28-2006. Online demonstration in SGAE web site, again taxes on all blank media in Spain. Participate by just installing this script!!
// @include        *
// ==/UserScript==

/************************/
/******** Config ********/
/************************/

//Interval between visit (seconds)		

var interval = 300;
var random_interval = 120;

//All the December 26th, on GMT + 1 (Spain time)

//Remember that the time is set on UTC

var startYear = 2006;
var startMonth = 12;
var startDay = 27;
var startHour = 23;
var startMinute = 0;

var endYear = 2006;
var endMonth = 12;
var endDay = 28;
var endHour = 23;
var endMinute = 0;

//Urls to visit
//Referer recommended but not all webs require it.
var Visits = new Array(
{
	url: "http://www.sgae.es",
	referer: ""
},
{
	url: "http://www.sgae.es/home/es/Home.html",
	referer: ""
}
);


//End of config--->


if(top!=this)
return;

var tStart = new Date();
with(tStart)
{
	setUTCFullYear(startYear);
	setUTCDate(startDay);
	//Months-> 0-11
	startMonth--;
	setUTCMonth(startMonth);
	setUTCHours(startHour);
	setUTCMinutes(startMinute);
	setUTCSeconds(0);
}

var tFinish = new Date();
with(tFinish)
{
	setUTCFullYear(endYear);
	setUTCDate(endDay);
	//Months-> 0-11
	endMonth--;
	setUTCMonth(endMonth);
	setUTCHours(endHour);
	setUTCMinutes(endMinute);
	setUTCSeconds(0);
}

function startMsg(finish){
	unsafeWindow.document.title="[Demonstration started, finish: "+finish+"]";
}

function currentUTCTimeStamp(){
var tCurrent = new Date();
with(tCurrent)
{
	setUTCFullYear(new Date().getUTCFullYear());
	setUTCDate(new Date().getUTCDate());
	//Months-> 0-11
	setUTCMonth(new Date().getUTCMonth());
	//Hours-> 0-23
	setUTCHours(new Date().getUTCHours());
	setUTCMinutes(new Date().getUTCMinutes())
	setUTCSeconds(new Date().getUTCSeconds())
}
return tCurrent;
}

//alert("tStart->"+tStart.getTime()+"\ntFinish->"+tFinish.getTime()+"\ncurrenTime->"+currentUTCTimeStamp().getTime())


//Avoid loading the script on several opened webs
var lastActiveTime = GM_getValue("loaded");
if(lastActiveTime==null)
{
	GM_setValue("loaded","0");
}

//Avoid loading the script on several opened webs
var lastActiveTime = GM_getValue("loaded");
if(lastActiveTime==null)
{
	GM_setValue("loaded","0");
}


//Check if its demonstration time
var time = currentUTCTimeStamp().getTime();

if(time<tStart.getTime() || time>tFinish.getTime())
{
	GM_setValue("loaded","0");
	return;
}

startMsg(tFinish);

var checkActivity = setInterval(checkDemonstration,20000)

function nextVisit(){
	var ran_unrounded=Math.random()*random_interval;
	var ran_number=Math.floor(ran_unrounded);

	setTimeout(OnlineDemonstration,(interval+ran_number)*1000);
}

function checkDemonstration(){

	var time = currentUTCTimeStamp().getTime();

	//If last activity has been 20 seconds ago or more
	if(time<parseInt(GM_getValue("loaded"))+20000)
	{
		return;
	}
	if(time<tStart.getTime() || time>tFinish.getTime())
	{
		clearInterval(checkActivity)
		GM_setValue("loaded","0");
		return;
	}


	OnlineDemonstration();
}

function stopInterval(){
	clearInterval(visitings);
}

//Recursive function OnlineDemonstration
function OnlineDemonstration()
{
	var time = currentUTCTimeStamp().getTime();
	if(time>tFinish.getTime())
	{
		stopInterval();
		alert("Congratulations, demonstrations finished :)");		
	}

	//Avoid to start running at the same time of other waiting window
	//when the active window close.
	if(time<parseInt(GM_getValue("loaded"))+(interval*1000))
	{
		return;
	}
	GM_setValue("loaded",time.toString());
	//startMsg(time);

		
	for(visit in Visits)
	{
		try{
		  GM_xmlhttpRequest({
		    method: 'GET',
		    url: Visits[visit].url,
		    headers: 
			{
			'referer': Visits[visit].referer,
			//Avoid posible caching
			"If-Modified-Since": "Sat, 1 Jan 2000 00:00:00 GMT"
			},
		    onload: function(responseDetails) {
			//GM_log("visit!!\n"+responseDetails.responseText);
		    }	
		 });
		}
		catch(e){}
	}

	nextVisit();
}


if(!parseInt(GM_getValue("loaded")))
	OnlineDemonstration();
