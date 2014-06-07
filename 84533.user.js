// Copyright (c) 2010 , Mohammad reza Kamalifard ,1sasan.com , http://friendfeed.com/ITmaaan
// ==UserScript==
// @name           ferferion motade bidar 0.1
// @include        http://friendfeed.com/*
// @include		   http://beta.friendfeed.com/*
// @exclude	   	   http://friendfeed.com/share/bookmarklet/*
// @exclude	   	   http://beta.friendfeed.com/share/bookmarklet/*
// @version        1.52
// ==/UserScript==

var HOST_NAME = window.location.hostname;
var FFAPI = 'friendfeed-api.com/v2/';
var REFRESH_INTERVAL = GM_getValue("blRI", 60); //in seconds
var MINUTES_TILL_INACTIVE = GM_getValue("blMTI", 15); //in minutes
var userid = GM_getValue("userid", false);
var remotekey = GM_getValue("remotekey", false);
var subscriptions = GM_getValue("subscriptions", false);
var lastInfo = GM_getValue("lastInfo", 0);
var lastEtag = GM_getValue("lastEtag", 0);
var showHide = GM_getValue("showHide", 'Hide');
var leftRight = GM_getValue("leftright", 'left');
var FeedLdng;
var amLdg;
var firstRun=true;
var blHead;
var maxHeight = 357;
var Hdiff;
var friends = [];
var friends2 = [];
var Animated=false;
var Prompting=false;
var posObj;
var AniTO;
var WinW;
var WinH;
var OFY = 'scroll';
var lastUpdated;
var Terminate=false;
var TOGL;
var TOWt1;
var TOWt2;
var TOLSubs;
var TOLFeed;
var TOLFFunc;
var TOCMET;
var TOLANI;
var WFRS;
var STLoaded=false;
var GMXHR;
var cEtag;
var myEtag;
var FreeTime;
var AmWtng;
var AmGng;
var AniN=0;

//console.log(userid);
//console.log(remotekey);
//console.log(leftRight);
//
GM_addStyle("#buddylist {direction: ltr;text-align:left;z-index: 9999;background-color: #F7F9FA;background-color: rgba(255,255,255,0.8); position: fixed; bottom: 0; "+(leftRight=='right'?'left':'right')+": auto; "+leftRight+":0px; max-height: "+maxHeight+"px; padding: 1px; border: 1px solid #B3B3FF; overflow-x: auto;overflow-y: scroll;min-width:286px;font-family:Tahoma,Arial;border-radius: 6px 6px 0px 0px;-moz-border-radius: 6px 6px 0px 0px;-webkit-border-radius: 6px 6px 0px 0px;opacity:0.01;}");
GM_addStyle("#buddylist .showhide {border-radius: 3px;-moz-border-radius: 3px;-webkit-border-radius: 3px;text-align:left;z-index:99999; padding:1px; cursor:pointer; text-align:left; border:solid 1px #93BAEB;  background-color:#E8F2FF; width:100%;border-bottom-width:5px;}");//
GM_addStyle("#buddylist .blHead {text-align:left;font-size:22px;font-weight:bold;font-family:Arial;padding-left:5px;}");
GM_addStyle("#buddylist .blControl {text-align: right;padding-right:3px;font-size:13px;font-weight:bold;font-family:Arial;}");
GM_addStyle("#buddylist .blControl #leftright {font-size:15px;font-weight:normal;font-family:Tahoma;}");
GM_addStyle("#buddylist #blLoading {width:100px;margin: 10px auto;display:block;text-align:center;font-family:Arial;}");
GM_addStyle("#buddylist ul {list-style-type: none;padding-bottom:15px;margin:0;padding:3px 5px;font-size:14px;}");
GM_addStyle("#buddylist .blLi:hover{background-color: #BDF1FC;color: #000000;}");
GM_addStyle("#buddylist .name,#buddylist .showhide span{ text-decoration: none; color: #000000; text-align:right ;padding-right:3px; }");
GM_addStyle("#buddylist .showhide span {padding:1px 2px;}");
GM_addStyle("#buddylist .showhide span:hover{border-radius: 5px;-moz-border-radius: 5px;-webkit-border-radius: 5px;background-color: #BDF1FC;}");
GM_addStyle("#buddylist .lastseen { float:right;color: #666666; text-decoration: none; }");
GM_addStyle("#buddylist .lastseen a { color: #333333; text-decoration: none; }");
GM_addStyle("#buddylist ul li{border-radius: 5px;-moz-border-radius: 5px;-webkit-border-radius: 5px;padding:2px 4px;}");
GM_addStyle("#buddylist .lastseen a:hover{color: #000000;}");
GM_addStyle("#buddylist .showhide #leftright{font-family:Tahoma;}");

var gmScript_url = "http://userscripts.org/scripts/source/34481.user.js";
var gmScript_name = "Friendfeed Buddy List 1.50";
var gmScript_version = 1.50;
/*
autoUpdateFromUserscriptsDotOrg(
	{
		name: gmScript_name,
		url: gmScript_url,
		version: gmScript_version,
	}
);*/

function GM_wait(){
	if(Terminate){return;}
    if(typeof unsafeWindow.jQuery == 'undefined')
    {
        TOWt1=setTimeout(GM_wait,251);
		TOWt2=setTimeout(function() {Terminate=true;console.log('JQueryIsNotReady');},60000);
    }
    else
    {
        $ = unsafeWindow.jQuery; letsJQuery();
    }
}


function letsJQuery()
{

dnow = new Date().getTime();
if(dnow-lastInfo>=15*(60000)){subscriptions=[];remotekey='';userid='';}
ShowLoading();
//mGM_SetValue("FreeTime", false);
//return;
	if(!userid || !remotekey || !subscriptions)
	{

	    $.ajax(
	    {
	        dataType: "html",
	        url: "http://friendfeed.com/account/api",
	        success: function(data, textStatus) {
				useridkey = data.match(/<td class="value">([\S\s]*?)<\/td>/gi);
				if(useridkey)
	            {
					userid = $.trim(/<td class="value">([\S\s]*?)<\/td>/gi.exec(useridkey[0])[1].toString());
					mGM_SetValue("userid", userid);
					remotekey = $.trim(/<td class="value">([\S\s]*?)<\/td>/gi.exec(useridkey[1])[1].toString());
					mGM_SetValue("remotekey", remotekey);
	                loadSubscriptions();
	            }
	        }
	    });
	}
	else
	{
		if(!subscriptions){
			loadSubscriptions();
		}else{
			
			subscriptions = subscriptions.split(',');
			startInterval();
			CheckMyEtag();
		}
	}
}

unsafeWindow.showANDHide = function(blRefresh)
{
	blHead = $('#buddylist .showhide').height()-2;
	Hdiff = $('#buddylist').height()-blHead;
	if(showHide==(blRefresh?'Show':'Hide'))
	{HideBL();}
	else
	{ShowBL();}
	
};

function HideBL(){
	if (AniTO !== null){clearTimeout(AniTO);AniTO = null;}
	if(!Animated){
		Animated=true;
		showHide = 'Show';
		$('#buddylist').css('overflowY', 'hidden');
		$('#buddylist').animate({'top': '+='+Hdiff,"opacity": "0.5"},500,function(){
			$('#buddylist').css('maxHeight',blHead+"px").css('bottom', '0').css('top', 'auto');
			$('#ashowhide').html(showHide);
			mGM_SetValue("showHide", showHide);
			Animated=false;
		});
	}else{
		AniTO=setTimeout(HideBL,200);
	}
}
function ShowBL(){
	if (AniTO !== null){clearTimeout(AniTO);AniTO = null;}
	if(!Animated){
		Animated=true;
		showHide = 'Hide';
		$('#buddylist').animate({'maxHeight': maxHeight+"px","opacity": "1"},500,function(){
			$('#buddylist').css('overflowY', OFY).css('bottom', '0').css('top', 'auto');
			$('#ashowhide').html(showHide);
			mGM_SetValue("showHide", showHide);
			Animated=false;
		});
	}else{
		AniTO=setTimeout(ShowBL,200);
	}
}

unsafeWindow.BuddyListPos = function(posOBJ){
	posObj=posOBJ;
	if(leftRight=='left')
	{PosBLR();}
	else
	{PosBLL();}
};
function PosBLR(){
	if (AniTO !== null){clearTimeout(AniTO);AniTO = null;}
	if(!Animated){
		Animated=true;
		$('#buddylist').fadeOut(function(){
			$('#buddylist').css('left', 'auto').css('right', '0px');
			if(posObj){posObj.innerHTML='&lt;';}
			$('#buddylist').fadeIn(function(){
			leftRight='right';
			Animated=false;
			mGM_SetValue("leftright",leftRight);
			});
		});
	}else{
		AniTO=setTimeout(PosBLR,200);
	}
}
function PosBLL(){
	if (AniTO !== null){clearTimeout(AniTO);AniTO = null;}
	if(!Animated){
		Animated=true;
		$('#buddylist').fadeOut(function(){
			Animated=true;
			$('#buddylist').css('right', 'auto').css('left', '0px');
			if(posObj){posObj.innerHTML='&gt;';}
			$('#buddylist').fadeIn(function(){
			leftRight='left';
			Animated=false;
			mGM_SetValue("leftright",leftRight);
			});
		});
	}else{
		AniTO=setTimeout(PosBLL,200);
	}
}

unsafeWindow.PromtSettings = function(){
	var blPRI;
	var blMTI;
	if (!Prompting){
		Prompting=true;
		blPRI = prompt("Set the timeout duration for 'Refreshing' :\n(in seconds, minimum: 15, default: 60)",REFRESH_INTERVAL);
		blMTI = prompt("Set the timeout duration for 'Online Buddies' :\n(in minutes, minimum: 5, default: 15)",MINUTES_TILL_INACTIVE);
		if(blPRI){
			if (blPRI <15){REFRESH_INTERVAL=15;}else{REFRESH_INTERVAL=blPRI;}
			mGM_SetValue('blRI',REFRESH_INTERVAL);
		}

		if(blMTI){
			if (blMTI <5){MINUTES_TILL_INACTIVE=5;}else{MINUTES_TILL_INACTIVE=blMTI;}
			mGM_SetValue('blMTI',MINUTES_TILL_INACTIVE);
		}
		Prompting=false;
	}
};

function startInterval()
{
	loadFeed();
}

function loadSubscriptions()
{
	if (TOLSubs !== null){clearTimeout(TOLSubs);TOLSubs = null;}
	TOLSubs=setTimeout(function() {
		if(!userid||!remotekey){return;}
		var base64string = Base64.encode(userid + ":" + remotekey);
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://'+FFAPI+'feedinfo/'+userid,
			headers: {
			'Accept': 'application/json',
			'Authorization':'Basic ' +base64string
			},
			onload: function(respDetails) {
				var data = JSON.parse(respDetails.responseText);
				subscriptions = [];
				$.each(data['subscriptions'], function(){
					subscriptions.push(this['id']);
				});
				dnow = new Date().getTime();
				mGM_SetValue("lastInfo", dnow.toString());
				mGM_SetValue("subscriptions", subscriptions.join(','));
				mGM_SetValue("FreeTime", false);
				startInterval();
				CheckMyEtag();
			},
			onerror: function(respDetails) {
				TOLSubs=setTimeout(function(){loadSubscriptions();}, 15*1000);
					//alert('status:\n'+respDetails.status+'\n'+respDetails.statusText);
			}
		});
	},0);

}

function loadFeed()
{
	REFRESH_INTERVAL = GM_getValue("blRI", 60); //in seconds
	MINUTES_TILL_INACTIVE = GM_getValue("blMTI", 15); //in minutes

	
	if(!AmGng){
	console.log('RI: '+REFRESH_INTERVAL+'   MTI: '+MINUTES_TILL_INACTIVE);
	//console.log('Cached?');
	lastUpdated=GM_getValue("lastUpdated", 0);
	dnow = new Date().getTime();
	differ=dnow-lastUpdated;
	differ = Math.round(differ/(1000));
	if (differ< REFRESH_INTERVAL){
		friends=JSON.parse(GM_getValue("friends", ''));
		if(friends){
			AmWtng=false;
			if (TOLFeed !== null){clearTimeout(TOLFeed);TOLFeed = null;}
			TOLFeed=setTimeout(loadFeed, REFRESH_INTERVAL*1000);
			parseEntries('',true);
			return;
		}
	}
	lastEtag=GM_getValue("lastEtag", 0);
	differ=dnow-lastEtag;
	if(differ>=15*60000){
	cEtag='';
	mGM_SetValue('cEtag',cEtag);
	mGM_SetValue('lastEtag',0);
	}

	if(GM_getValue("FeedLdng", false)&&(!AmWtng)){
		//console.log('IsLoading--Waiting   '+AmWtng+'   '+GM_getValue("FreeTime", false));
		if (TOLFeed !== null){clearTimeout(TOLFeed);TOLFeed = null;}
		if (TOGL !== null){clearTimeout(TOGL);TOGL = null;}
		if(!GM_getValue("WFRS", false)&&GM_getValue("FeedLdng", false)){
		mGM_SetValue("WFRS", true);
		TOLFeed=setTimeout(function(){mGM_SetValue("WFRS", false);mGM_SetValue("FreeTime", false);loadFeed();}, REFRESH_INTERVAL*1000);
		}else{
		TOLFeed=setTimeout(function(){loadFeed();}, REFRESH_INTERVAL*1000);//mGM_SetValue('FeedLdng',false);
		}
		TOGL=setTimeout(GetLoadedFeed, 5*1000);
		AmWtng=true;
		return;
	}else{
	if(AmWtng){
		if(!mGM_SetValue("FreeTime", false)&&GM_getValue("FeedLdng", false)){
		//console.log('Wait!');
		AmGng=true
		mGM_SetValue("FreeTime", true);
		if (TOLFeed !== null){clearTimeout(TOLFeed);TOLFeed = null;}
		TOLFeed=window.setTimeout(function(){AmGng=false;mGM_SetValue("FreeTime", false);loadFeed();}, 10*1000);
		}else{
		if (TOLFeed !== null){clearTimeout(TOLFeed);TOLFeed = null;}
		TOLFeed=setTimeout(function(){AmGng=false;AmWtng=false;loadFeed();}, REFRESH_INTERVAL*1000);
		return;
		}
	}else{
		AmGng=true;
		mGM_SetValue("FreeTime", true);
		TOLFeed=setTimeout(function(){mGM_SetValue("FreeTime", false);AmGng=false;}, 10*1000);
	}
		//FeedLdng=true;
		//TOLFeed=setTimeout(function(){mGM_SetValue('FeedLdng',false);loadFeed();}, REFRESH_INTERVAL*1000);
	}
	}//else{console.log('Lets Go!');}
	mGM_SetValue('FeedLdng',true);
	//mGM_SetValue("FreeTime", false);
	//AmGng=false;
	AmWtng=false;
	TOLFeed=setTimeout(function(){GMXHR.abort();if (TOLFeed !== null){clearTimeout(TOLFeed);TOLFeed = null;}TOLFeed=setTimeout(loadFeed, REFRESH_INTERVAL*1000);}, 2*REFRESH_INTERVAL*1000);//
	amLdg=true;
	//console.log('Loading:  '+userid+':'+remotekey);
	if (TOLFFunc !== null){clearTimeout(TOLFFunc);TOLFFunc = null;}
	TOLFFunc=setTimeout(function() {
		if(!userid||!remotekey){return;}
		cEtag=GM_getValue("cEtag", '');
		var base64string = Base64.encode(userid + ":" + remotekey);
		var GMXHRHead={
				'Accept': 'application/json',
				'Authorization':'Basic ' +base64string
			};
		if (cEtag){GMXHRHead['If-None-Match']=cEtag;}
		GMXHR=GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://'+FFAPI+'feed/home',
			headers: GMXHRHead,
			onload: function(respDetails) {
				mGM_SetValue('FeedLdng',false);
				if(respDetails.status==200){
					var entries = JSON.parse(respDetails.responseText);
					parseEntries(entries['entries'],false);
				}else if(respDetails.status==304){
					parseEntries('',true);
					lastUpdated=new Date().getTime();
					mGM_SetValue('lastUpdated',lastUpdated.toString());

				}
				if(respDetails.responseHeaders){
				cEtag=GetRespHead(respDetails.responseHeaders,'Etag');
				if (cEtag){
				myEtag=cEtag;
				mGM_SetValue('cEtag',cEtag);}
				dnow = new Date().getTime();
				mGM_SetValue('lastEtag',dnow.toString());
				}
				amLdg=false;
				if (TOLFeed !== null){clearTimeout(TOLFeed);TOLFeed = null;}
				TOLFeed=setTimeout(loadFeed, REFRESH_INTERVAL*1000);	
			},
			onerror: function(respDetails) {
				mGM_SetValue('FeedLdng',false);
				amLdg=false;
				TOLFeed=setTimeout(loadFeed, REFRESH_INTERVAL*1000);	
				//alert('status:\n'+respDetails.status+'\n'+respDetails.statusText);
			}
		});
	},0);

}
function GetLoadedFeed(){
	if(amLdg){return;}
	FeedLdng=GM_getValue("FeedLdng", false);
	if(FeedLdng){
		TOGL=setTimeout(GetLoadedFeed, 3*1000);
		return;
	}else{
		amWtng=false;
		friends=JSON.parse(GM_getValue("friends", ''));
		if(friends){parseEntries('',true);}
	}
}
function parseEntries(entries,cached)
{
	//if(!unsafeWindow){return;}
	console.log(cached);
    dnow = new Date().getTime();
	if(!cached){
	if(!entries){return;}
	friends = [];
    $.each(entries, function(){
		entryurl=this['url'];
		if($.inArray(this['from']['id'], subscriptions)!=-1){
			updated = convertAtomDateString(this['date']).getTime();
			friends.push({name: this['from']['name'], userid: this['from']['id'], time:updated, type:'/',"url":entryurl});
		}
		if(this['comments']){$.each(this['comments'], function(){
			if($.inArray(this['from']['id'], subscriptions)!=-1){
			updated = convertAtomDateString(this['date']).getTime();
			friends.push({name: this['from']['name'], userid: this['from']['id'], time:updated, type:'/comments',"url":entryurl});
			}
		});}
		if(this['likes']){$.each(this['likes'], function(){
			if($.inArray(this['from']['id'], subscriptions)!=-1){
			updated = convertAtomDateString(this['date']).getTime();
			friends.push({name: this['from']['name'], userid: this['from']['id'], time:updated, type:'/likes',"url":entryurl});
			}
		});}
    });
	}
	if (!friends){return;}

	friends.sort(function(a, b)
    {
        var keyA = a.time;
        var keyB = b.time;
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    });
    friends = unique(friends);
    if (!friends){return;}else{var friends2 = new clone(friends);}

	toSplice = [];
    $.each(friends2, function(i,val){
        difference = dnow - this['time'];
        minutes = Math.round(difference/(1000*60));
        this['minutes'] = minutes;
        if(minutes > MINUTES_TILL_INACTIVE)
        {toSplice.push(i);}
    });
	toSplice = toSplice.reverse();
    $.each(toSplice, function(){
        friends2.splice(this,1);
    });
	/*
    friends.sort(function(a, b)
    {
        var keyA = a.name.toUpperCase();
        var keyB = b.name.toUpperCase();
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
	*/
	if (!friends2){return;}
	if(!cached){
	lastUpdated=new Date().getTime();
	mGM_SetValue('lastUpdated',lastUpdated.toString());

	var strFriends=JSON.stringify(friends);
	mGM_SetValue('friends',strFriends);
	}
    if(!document.getElementById("buddylist")){$('#body').prepend('<div id="buddylist" />');}
	
	html = '';
	html += '<table class="showhide"  >';
	html += '<td class="blHead" valign="middle" onclick="showANDHide()">فرفریون معتاده بیدار : ' + friends2.length + '&nbsp;</td>' ;
	html += '<td class="blControl" valign="middle" align="right"><span id="ashowhide" onclick="showANDHide();">' + showHide + '</span>&nbsp;<span id="pSettings" onclick="PromtSettings();">Settings</span>&nbsp;<span id="leftright" onclick="BuddyListPos(this);">'+(leftRight=='right'?'&lt;':'&gt;')+'</span></td></table>';
    html += '<ul>'+$.map(friends2, function(x){return '<li class="blLi"><a style="font-weight:bold;" href="/' + x.userid + '" class="name">' + x.name + '</a>&nbsp;<span class="lastseen">&nbsp;&nbsp;&nbsp;&nbsp;<a href="'+x.url+'">' + (x.type=='/'?'Post':(x.type=='/likes'?'Like':'Comm'))+'</a>&nbsp;' + (x.minutes===0?'just&nbsp;now':x.minutes + '&nbsp;min&nbsp;ago') + '</span></li>';}).join('') + '</ul>';
    $('#buddylist').html(html);
	if ((maxHeight-($('#buddylist ul').outerHeight()+$('#buddylist .showhide').outerHeight()))<0) {OFY='scroll';}else{OFY='hidden';}
	if (showHide=='Hide'){$('#buddylist').css('overflowY', OFY);}
	if(firstRun){
		disableSelection(document.getElementById('buddylist'));
		unsafeWindow.showANDHide(true);
		$('#buddylist').fadeIn();
		firstRun=false;
	}
}
function ShowLoading(){
	if(firstRun){
    if(!document.getElementById("buddylist")){$('#body').prepend('<div id="buddylist" />');}
	if(firstRun){$('#buddylist').fadeOut();}
	html = '';
	html += '<table class="showhide"  >';
	html += '<td class="blHead" valign="middle" onclick="showANDHide()">liste dostan : 0&nbsp;</td>' ;
	html += '<td class="blControl" valign="middle" align="right"><span id="ashowhide" onclick="showANDHide();">' + showHide + '</span>&nbsp;<span id="pSettings" onclick="PromtSettings();">Settings</span>&nbsp;<span id="leftright" onclick="BuddyListPos(this);">'+(leftRight=='right'?'&lt;':'&gt;')+'</span></td></table>';
    html += '<div id="blLoading" > -- Loading -- </div>'
    $('#buddylist').html(html);
	OFY='hidden';
	if (showHide=='Hide'){$('#buddylist').css('overflowY', OFY);}
		disableSelection(document.getElementById('buddylist'));
		unsafeWindow.showANDHide(true);
		$('#buddylist').fadeIn();
	}
}
function CheckMyEtag(){
	FreeTime=GM_getValue("FreeTime", false);
	if(FreeTime&&!AmGng){AmWtng=false;if(GMXHR){GMXHR.abort();}}
	cEtag=GM_getValue("cEtag", '');
	if (cEtag){
		if(myEtag!==cEtag){
			if (TOLFeed !== null){clearTimeout(TOLFeed);TOLFeed = null;}
			TOLFeed=setTimeout(loadFeed, REFRESH_INTERVAL*1000);	
			AmWtng=false;
			myEtag=cEtag;
			friends=JSON.parse(GM_getValue("friends", ''));
			if(friends){
				parseEntries('',true);
			}
		}
	}
	TOCMET=setTimeout(CheckMyEtag, 5*1000);
}
function mGM_SetValue(mName,mVal){
window.setTimeout(function() {GM_setValue(mName,mVal);},0);
}
function unique(a) {
   var r = new Array();
   o:for(var i = 0, n = a.length; i < n; i++) {
      for(var x = 0, y = r.length; x < y; x++){if(r[x]['name']==a[i]['name']) continue o;}
      r[r.length] = a[i];
   }
   return r;
}

function convertAtomDateString(str)
{
    //2008-08-27T04:59:19Z
    var year, month, date, hour, minute, second, offset;
    year = str.slice(0,4);
    month = str.slice(5,7)-1;        //00-11
    if(month<10)
        month = '0'+month;
    date = str.slice(8,10);        //01-31
    hour = str.slice(11,13);    //00-23
    minute = str.slice(14,16);    //00-59
    second = str.slice(17,19);    //00-59
    d = new Date();
    d.setUTCMonth(month,date);
    d.setUTCFullYear(year);
    d.setUTCHours(hour);
    d.setUTCMinutes(minute);
    d.setUTCSeconds(second);
    return d;
}

function autoUpdateFromUserscriptsDotOrg(SCRIPT) {
  try {
    if (!GM_getValue) return; // Older version of Greasemonkey. Can't run.
    // avoid a flood of dialogs e.g. when opening a browser with multiple tabs set to homepage
    // and a script with * includes or opening a tabgrop
    var DoS_PREVENTION_TIME = 2 * 60 * 1000;
    var isSomeoneChecking = GM_getValue('CHECKING', null);
    var now = new Date().getTime();
    GM_setValue('CHECKING', now.toString());

    if (isSomeoneChecking && (now - isSomeoneChecking) < DoS_PREVENTION_TIME) return;

    // check daily
    var ONE_DAY = 24 * 60 * 60 * 1000;
    var ONE_WEEK = 7 * ONE_DAY;
    var TWO_WEEKS = 2 * ONE_WEEK;
    var lastChecked = GM_getValue('LAST_CHECKED', null);
    if (lastChecked && (now - lastChecked) < TWO_WEEKS) return;

    GM_xmlhttpRequest({
      method: 'GET',
	  url: SCRIPT.url + '?source', // don't increase the 'installed' count just for update checks
	  onload: function(result) {
	  if (!result.responseText.match(/@version\s+([\d.]+)/)) return;     // did not find a suitable version header

	  var theOtherVersion = parseFloat(RegExp.$1);
	  if (theOtherVersion <= parseFloat(SCRIPT.version)) return;      // no updates or older version on userscripts.orge site

	  if (window.confirm('A new version ' + theOtherVersion + ' of greasemonkey script "' + SCRIPT.name + '" is available.\nYour installed version is ' + SCRIPT.version + ' .\n\nUpdate now?\n')) {
	    GM_openInTab(SCRIPT.url);   // better than location.replace as doing so might lose unsaved data
	  }
	}
      });
    GM_setValue('LAST_CHECKED', now.toString());
  } catch (ex) {
  }
}

var Base64 = {
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = Base64._utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
		}
		return output;
	},
	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
		return utftext;
	}
};

function disableSelection(target){
	if (typeof target.onselectstart!="undefined"){ //IE route
		target.onselectstart=function(){return false;};
	}else if (typeof target.style.MozUserSelect!="undefined"){ //Firefox route
		target.style.MozUserSelect="none";
	}else{ //All other route (ie: Opera)
		target.onmousedown=function(){return false;};
	}
		target.style.cursor = "default";
}
window.addEventListener("unload", function(e) {
if(GMXHR){mGM_SetValue('FeedLdng',false);GMXHR.abort();}
if (TOGL !== null){clearTimeout(TOGL);TOGL = null;}
if (TOWt1 !== null){clearTimeout(TOWt1);TOWt1 = null;}
if (TOWt2 !== null){clearTimeout(TOWt2);TOWt2 = null;}
if (TOLSubs !== null){clearTimeout(TOLSubs);TOLSubs = null;}
if (TOLFeed !== null){clearTimeout(TOLFeed);TOLFeed = null;}
if (TOLFFunc !== null){clearTimeout(TOLFFunc);TOLFFunc = null;}
if (TOCMET !== null){clearTimeout(TOCMET);TOCMET = null;}
if (TOLANI !== null){clearTimeout(TOLANI);TOLANI = null;}
}, false);
function GetRespHead(strHead,sHpn){
	if (strHead.trim()===''||sHpn.trim()===''){return '';}
	var sHSplit=strHead.split('\n');
	if (sHSplit.length===0){return '';}
	var sHp;
	for(var i = 0;i < sHSplit.length; i++) {
		if(sHSplit[i].trim()!==''){
			sHp=sHSplit[i].split(':');
			if (sHp[0].trim()==sHpn.trim()){return sHp[1].trim();}
		}
	}
}
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}
function clone(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = obj.constructor(); // changed

    for(var key in obj)
        temp[key] = clone(obj[key]);
    return temp;
}


GM_wait();