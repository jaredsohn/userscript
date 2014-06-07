// ==UserScript==
// @name           hirak99 FB MH/MM essential
// @namespace      hirak99
// @description    hirak99 FB MH/MM essential
// @include        http://apps.facebook.com/mousehunt/*
// @include        http://apps.facebook.com/mythmonger/*
// @exclude        http://apps.facebook.com/mousehunt/traderequest.php*
// @exclude        http://apps.facebook.com/mousehunt/organizeparty.php*
// @version        v1.5 - Fixed it as some current changes broke it
// @version        v1.4 - Captcha prediction and evasion algorithm
// @version        v1.3 - Alerts when bait reaches zero + experimenting with playing a sound on puzzle (uncomment a line in the puzzleAlert function)
// @version        v1.20002 - Works now with Mousehunt: Better Title script
// @version        v1.2 - Fixed time remaining for MythMonger
// @version        v1.11001 - No longer depends on stupid timer for keeping time
// @version        v1.1 - Combined with MH
// @version        v1.0 - Initial Release
// ==/UserScript==

(function(){
// Note: Mousehunt alert comes up every 3 hours of continuous playing.
var titleOriginal = document.title;
var idlePeriod = 5 + (Math.random()<0.65 ? Math.floor(Math.random()*5) : Math.floor(Math.random()*60*2));
var idling = false;
var mousehunt = document.location.toString().indexOf('http://apps.facebook.com/mousehunt')==0;
var mythmonger = document.location.toString().indexOf('http://apps.facebook.com/mythmonger')==0;

var MaintenanceSecs = 20;

var CaptchaInterval = 3*60+10;
// Captcha forgets after how many minutes of idle since it is due?
var MHCaptchaWait = 120;

var playLocation;
if (mousehunt) playLocation = 'http://apps.facebook.com/mousehunt/soundthehorn.php';
else if (mythmonger) playLocation = 'http://apps.facebook.com/mythmonger/turn.php';


var cheesePref = [];	// Note: This will be referred only when trap runs out of cheese
cheesePref['Meditation Room'] = ['Combat','Glutter','Susheese'];
cheesePref['Dojo'] = ['Maki','Swiss'];

if (document.getElementById('headNavOut')==null) return;	// Ensure it is FB (and not JShell window for example)

function maintenance() {
	if (!mousehunt) return false;	// Only works with MH for now
	return (document.getElementsByClassName('hudstatlabel').length==0);
}
if (maintenance()) {
	document.title = 'Maintenance - Reloading every '+MaintenanceSecs+' secs';
	setTimeout(function() {window.location.href='http://apps.facebook.com/'+(mousehunt?'mousehunt':'mythmonger');},MaintenanceSecs*1000);
	return;
}

var remainingBait = null;

function getStat(statname) {
	var labels = document.getElementsByClassName('hudstatlabel');
	for (var i=0; i<labels.length; ++i) {
		if (labels[i].innerHTML==statname+':') {
			var x=labels[i].parentNode.innerHTML;
			var y=x.lastIndexOf('&nbsp;');
			var z = x.substr(y+6);
			if (z.indexOf('None!')>-1) return 'None! (0)';
			else return z;
		}
	}
	return null;
}

// Set better title
function getFullStat(statname) {
	return statname + ': ' + getStat(statname);
}
function shortCheese() {
	var cheese = getStat('Cheese').match('[^(]+').toString().trim().split(' ');
	if (cheese.length>1) return cheese.map(function(x) {return x[0]}).join('');
	else return cheese[0].substr(0,2);
}
if (mousehunt) {
titleOriginal = getStat('Gold')+'g - '
	+getStat('Cheese').match('[0-9,]+')
	+'c['+shortCheese()+'] - '
	+getStat('Points')+'p - '
	+getStat('Location')
	;
}

// Check continuous hunts and decieve captcha in MH
String.prototype.beginsWith = function(s) {return this.length>=s.length && this.substr(0,s.length)==s;}

function parseJrnHour(timeStr) {
	if (timeStr.substr(1,1)==':') timeStr=' '+timeStr;
	var hours = parseInt(timeStr.substr(0,2));
	if (hours==12) hours=0;
	var result = hours*60 + parseInt(timeStr.substr(3,2));
	if (timeStr.substr(5,2)=='pm') result+=12*60;
	if (timeStr.indexOf('yester')>=0) result-=24*60;
	return result;
}
/*
print([parseJrnHour('9:56am'),
parseJrnHour('11:56am'),
parseJrnHour('12:01pm')].join(','));
*/

function huntsSinceCaptcha() {
	var times=JSON.parse(GM_getValue('huntsSinceCaptcha','[]'));
	
	if (window.location.href!=playLocation &&
		window.location.href!='http://apps.facebook.com/mousehunt/index.php' &&
		window.location.href!='http://apps.facebook.com/mousehunt/'
		) return times;
	
	var jrns = document.getElementsByClassName('journalbody');
	if (jrns.count==0) return times;
	
	//times=[];
	var prev;
	if (times.length==0) prev=null;
	else prev=times[0][1];
	
	var now = (new Date());
	now = Math.floor(now.getTime()/(1000*60)) - now.getTimezoneOffset();;
	var today = Math.floor(now/(24*60))*(24*60);
	
	var result=[];
	for (var i = 0; i<jrns.length; ++i) {
		var jrn = jrns[i].getElementsByClassName('journaltext')[0];
		var entry = jrn.innerHTML;
		entry = entry.replace(/<.*?>/g,'');
		if (entry.beginsWith('I sounded') || entry.beginsWith('I claimed')) {
			var jrnTime = jrns[i].getElementsByClassName('journaldate')[0].innerHTML;
			var time = parseJrnHour(jrnTime) + today;
			if (Math.abs(prev-time)==0) {
				//alert('Match found at '+i+': '+jrnTime+'; breaking');
				break;
			}
			else result.push([jrnTime,time]);
			if (entry.beginsWith('I claimed')) {
				times=[];
				break;
			}
		}
	}
	result=result.concat(times);
	GM_setValue('huntsSinceCaptcha',JSON.stringify(result));
	return result;
}

function getCaptcha() {
	var hunts = huntsSinceCaptcha();
	var now = new Date();
	now = Math.floor(now.getTime()/(1000*60)) - now.getTimezoneOffset();
	var nHunts = 0;
	for (var i=0; i<hunts.length; ++i)
		if ((i==0?now:hunts[i-1][1]) - hunts[i][1] > (MHCaptchaWait+15)) break;
		else nHunts++;
	var result = {};
	result.hunts = (nHunts==hunts.length?nHunts-1:nHunts);
	if (nHunts==0) result.next=CaptchaInterval*60;
	else result.next = (hunts[nHunts-1][1] + CaptchaInterval - now)*60;
	return result;
}

var captcha;
if (mousehunt) captcha = getCaptcha();

if (mythmonger) {
	var x = document.getElementsByClassName('overbar-c');
	if (x.length>0)
		remainingBait = parseInt(x[0].innerHTML.match('[0-9]+'));
}
else if (mousehunt) {
	var cheeseStat = getStat('Cheese');
	if (cheeseStat!=null)
		remainingBait = parseInt(cheeseStat.replace(/,/g,'').match('[0-9]+'));
}

function armCheese(cheese) {
	var page = 'http://apps.facebook.com/mousehunt/inventory.php?tab=invCheese';
	if (document.location.href.indexOf(page)!=0) {
		document.location.href=page;
		return -1;	// Loading cheese inventory page
	}
	var items = document.getElementsByClassName('inventoryrowitem');
	for (var i = 0; i<items.length; ++i) {
		var itemName = items[i].getElementsByClassName('itemname');
		if (itemName.length==0) return 0;
		itemName = itemName[0];
		itemName = itemName.innerHTML;
		itemName = itemName.substr(0, itemName.indexOf('&nbsp'));
		if (itemName==cheese) break;
	}
	if (i>=items.length) return 0;
	var armButton = items[i].getElementsByClassName('armbutton')[0];
	var href = armButton.getElementsByTagName('a');
	if (href.length==0) return 2;	// Already equipped
	href = href[0].href;
	document.location.href = href;
	//alert(href);
	return 1;	// Success
}

function armCheesePref() {
	cheeses = cheesePref[getStat('Location')];
	if (cheeses==undefined) return false;
	for (var i = 0; i<cheeses.length; ++i) {
		var cheese = cheeses[i];
		if (armCheese(cheese)!=0) return true;
	}
	return false;
}


if (remainingBait==0) {
	if (mousehunt) {
		if (armCheesePref()) return;
	}
	if (document.location == playLocation)
		alert('Need to replace bait now!!!');
	return;
}


var whenStarted = (new Date()).getTime();
var timeAlotted = 2*60;
if (mythmonger) {
//	var x = unsafeWindow.a79378246206_remainingActiveTurnWaitSeconds;
//	if (x>=0) timeAlotted = x;
/*
	var x = document.getElementById('js_buffer').innerHTML.split(/[= ;]/);
	var p = x.indexOf('a79378246206_remainingActiveTurnWaitSeconds');
	if (p!=-1) {
		for (var i = 1; ; ++i) {
			var t = x[p+i].trim();
			if (t.length>0) {timeAlotted=parseFloat(t); break;}
		}
	}*/
	var x = document.getElementById("app79378246206_turnprogbar");
	var x = x.style.getPropertyValue("background-position");
	var x = parseFloat(x.substr(0,x.indexOf("%")));
	timeAlotted=x*6+5;
}
else if (mousehunt) {
	var inputs = document.getElementsByTagName("input");
	if(inputs)
	{
	   //loop through and find the horn timer hidden input box and get it's value
	   for(var i = 0; i < inputs.length; i++)
		  if(inputs[i].id.indexOf("hornWaitValue") != -1) {
				timeAlotted = inputs[i].value;
				break;
			}
	}
}

function remainingNow() {
	return Math.floor(timeAlotted - ((new Date()).getTime() - whenStarted)/1000);
}

function dd(n) {
	return n<10?"0"+n:""+n;
}

function minSecs(secs) {
	mins=Math.floor(secs/60);
	secs=secs % 60;
	return dd(mins)+":"+dd(secs);
}

function playNow() {
	document.location = playLocation;
}

function warn(message,fontsize,color) {
	if (!mousehunt) return;
	var container = document.getElementById('captchaWarning');
	if (container==null) {
		container = document.createElement('div');
		container.setAttribute('id','captchaWarning');
	}
	var header = document.getElementById('app10337532241_contentcontainer');
	header.parentNode.insertBefore(container,header);
	container.innerHTML='<p style="font-size:'+fontsize+';color:'+color+';">'+message+'</p>';
}

var AwaitingCaptcha = false;
if (mousehunt) {
	var captchaAt = new Date(new Date().getTime()+captcha.next*1000);
	titleOriginal += ' - ' + captcha.hunts + (captcha.hunts>1?' hunts':' hunt')
		//+' - Captcha in '+minSecs(Math.floor(captcha.next/100))+':00'
		+' - Captcha @ '+minSecs(60*captchaAt.getHours()+captchaAt.getMinutes())+' ('+captcha.next+' secs)';
	//alert([captcha.next,remainingNow(),idlePeriod].join(','));
	// Two minutes before time to be safe
	// Also captcha.next>120 ensures that the next captcha is actually in the future (o.w. negative waiting time may cause page to refresh)
	if (captcha.next>120 && captcha.next-120<(remainingNow()+idlePeriod)) {
		timeAlotted = captcha.next;
		idlePeriod += (MHCaptchaWait+1)*60;
		AwaitingCaptcha = true;
	}
}

function update() {
	var remaining = remainingNow();
	if (remaining>-idlePeriod) {
		if (AwaitingCaptcha) {
			var message, size, color;
			var maxSize=500,minSize=60;
			if (remaining<=0) {
				message = 'Refresh page for the CAPTCHA!!!';
				size = maxSize;
				color = 'red';
			} else {
				message = 'Waiting for CAPTCHA: ' + minSecs(remaining);
				size = maxSize - (remaining/(10*60)*(maxSize-minSize));
				if (size<minSize) size=minSize;
				size = Math.floor(size/25)*25;
				color = 'blue';
			}
			warn(message,size+"%",color);
		}
		if (remaining>0)
			document.title = "["+minSecs(remaining)+"+"+(AwaitingCaptcha?"***CAPTCHA***":"")+idlePeriod+"] "+titleOriginal;
		else {
//			document.title = (AwaitingCaptcha?((remaining+idlePeriod)%2==0?"***CAPTCHA!!!***":"***Refresh***"):"")
			document.title = (AwaitingCaptcha?"***CAPTCHA!!!***":"")
				+"["+minSecs(remaining+idlePeriod)+"] "+titleOriginal;
		}
		//setTimeout(function() {update(remaining-1);},1000);
		setTimeout(update,1000);
	}
	else playNow();
}

function setCountdown(secs) {
	timeAlotted = 0;
	idlePeriod = secs;
	update();
}

function puzzleAlert(msg) {
	var div = document.createElement('div');
	//div.innerHTML = '<audio id="ogg_player_1_obj" controls="" autoplay="" src="http://upload.wikimedia.org/wikipedia/commons/e/e0/Fonotipia39088.mp3.ogg" height="35" width="200" tabindex="0"/>';
	//div.innerHTML = '<audio id="ogg_player_1_obj" controls="" autoplay="" src="http://upload.wikimedia.org/wikipedia/commons/6/61/Alarm_-_Missile_Jettison.ogg" height="35" width="200" tabindex="0"/>';
	document.body.insertBefore(div,document.body.children[0]);
	alert(msg+"\n"+(new Date()));
}

//if (document.title.search("King's Reward")!=-1){
if (document.getElementsByClassName('puzzleanswer').length>0) {
	if (document.getElementsByClassName('huntwarn')[0].innerHTML!="Your reward has been added to your stats!")
		puzzleAlert("Claim King's Reward!");
}
else if (document.getElementsByClassName('huntwarn').length>0) {
	AwaitingCaptcha=false;
	setCountdown(5);
}
else if (document.getElementById("captcha_session") != null)
{
	puzzleAlert('Aciton required!');
}
else
{
	//remaining = getRemaining();
	//alert(remaining);
	update();
	//setCountdown(50);
	//alert(remainingNow());
}
})()