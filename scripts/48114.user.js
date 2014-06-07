// ==UserScript==
// @name           Facebook Apps-O-Rama helper
// @namespace      http://userscripts.org/scripts/show/48114
// @version        1.05
// @date           18-08-2009
// @creator        Steve Wilson
// @description    Find an opponent that is less powerful and challenge
// @include        http://apps.facebook.com/sendmojo/*
// @include        http://apps.facebook.com/car_madness/*
// @include        http://apps.facebook.com/cartoon_madness/*
// @include        http://apps.facebook.com/space_domination/*
// @include        http://apps.facebook.com/motorcycle_madness/*
// @include	   http://apps.facebook.com/air_war/*
// @include	   http://apps.facebook.com/car_madness_new/*
// @include 	   http://apps.facebook.com/motorcycle_new/*
// @include 	   http://apps.facebook.com/top_gun_new/*
// @include        http://*.facebook.com/common/error.html
// ==/UserScript==

var myVersion="1.05";

// This reload function is taken from http://userscripts.org/scripts/show/22241 and fixed to work.
(function(){

var delay = 5;

var interval;

// I'm hoping this will work with all the other scripts that do stuff on facebook.
try {
	ourpage=""+window.location+"";
	if (ourpage.match("error.html")) {
		history.go(-1);
	}
} catch (err) { alert(err);}

try {
	if (document.getElementById('content').childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[4].childNodes[0].childNodes[0].childNodes[0].childNodes[0].innerHTML.toLowerCase().indexOf('error while loading page from') != -1) {
		var cancelButton = document.createElement('input');
		cancelButton.type = 'button';
		cancelButton.value = 'Do Not Try Again';
		cancelButton.className = 'inputbutton';
		cancelButton.addEventListener('click', function() {
			tryAgainButton.value = 'Try Again';
			cancelButton.disabled = true;
			clearInterval(interval);
			this.style.background = "#999999";
		}, true);
		var tryAgainButton = document.getElementById('try_again_button');
		tryAgainButton.parentNode.insertBefore(cancelButton, tryAgainButton.nextSibling);
		delay++;
		interval = setInterval(function(){
			delay--;
			if (delay==0) {
				tryAgainButton.value = 'Trying Now';
				tryAgainButton.click();
				clearInterval(interval);
			} else {
				tryAgainButton.value = 'Trying in ' + delay + ' seconds';
			}
		}, 1000);
	}
} catch(x) {}

})();


// Auto-Update needs some tidying up - original reference http://userscripts.org/scripts/review/41733
var version_scriptNum = 48114;
var version_timestamp = 1250616334000; // unix timestamp + micro seconds
function updateCheck(forced) {
	if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {
		try {
			GM_xmlhttpRequest({
				method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),
				headers: {'Cache-Control': 'no-cache'},
				onload: function(xhrResponse) {
					GM_setValue("lastUpdate", new Date().getTime() + ""); 
					var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); 
					var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; 
					GM_setValue("targetScriptName", scriptName); 
					if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {
						if (confirm("There is an update available for the Apps-O-Rama Helper.\"\nWould you like to go to the install page now?")) {
							GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum+"?update");
						}
					} else if (forced) {
						alert("No update is available for \"Apps-O-Rama helper.\"");
					}
				}
			});
		} catch (err) {
			if (forced) {
				alert("An error occurred while checking for updates:\n" + err);
			}
		}
	}
} 
GM_registerMenuCommand(
	"Manual Update Check", 
		function() {
			updateCheck(true);
		}
	); 
updateCheck(false);




// Define some functions.
function chomp(raw_text)
{
  return raw_text.replace(/(\n|\r)+$/, '');
}

function pad(number, length){
    var str = "" + number;
    while(str.length<length){
       str = '0'+str;
    }
    return str;
}

	// get our app number to use as vars, may work with other apps from the same team.
	var allContainedElements = document.getElementsByTagName("div");
	for (var i = 0; i < allContainedElements.length; i++) {
		var elem = allContainedElements[i];
		if ( elem.id.match("app_content_") ) {
			ThisAppIDNum=elem.id.replace(/app_content_/, "");
	}		

	}
here=""+window.location+"";
myloc=here.split("/");
var ThisPerson=document.getElementById('fb_menu_account').childNodes[0].innerHTML.replace(/ /,'_');
//alert(ThisPerson);
var ThisAppID="app"+ThisAppIDNum;
var ThisAppDom=myloc[3];

/* settings stored as:
	Multi|level|p_Thresh|t_Thresh|a_Thresh|Points|Paused
	defaults:
	false|higher|90|90|90|none|false
*/
var settings=GM_getValue(ThisAppDom+"."+ThisPerson+".Settings", "false|higher|90|90|90|none|false");

/*
	cache stored as:
	ourimage:
	default = empty;
*/
var cache=GM_getValue(ThisAppDom+"."+ThisPerson+".cache", "false");

// process the settings into vars for use.
st = settings.split("|");
	var Multi=st[0];
	var level=st[1];
	var p_Thresh=st[2];
	var t_Thresh=st[3];
	var a_Thresh=st[4];
	var Points=st[5];
	var Paused=st[6];
	
// fix up Paused var.
if (Paused != "true") {Paused='false';}
// fix up points.
if (Points == "") {Points='none';}
	
// process the cache
var ourimage=p_name=t_name=a_name=my_power=my_traction=my_aero=my_fans=my_stamina=url_list="";
ca = cache.split("|");
	var ourimage=ca[0];
	var p_name=ca[1];
	var t_name=ca[2];
	var a_name=ca[3];
	var my_power=ca[4];
	var my_traction=ca[5];
	var my_aero=ca[6];
	var my_fans=ca[7];
	var my_stamina=ca[8];
	var url_list=ca[9];	
	var my_balance=ca[10];
	var my_points=ca[11];
	
if (level!="higher" && Multi=="true") { level="multi_bike"; }
//alert(level);

var sell=selh='';
	if ( level == "level" || level == "multi_bike" ) 
		{ sell='selected="selected"'; }
	if ( level == "higher") 
		{selh='selected="selected"'; }

var mult=mulf='';
if ( Multi == "true" ) { 
	mult ='selected="selected"'; 
} else { 
	mulf ='selected="selected"';
}

var Ps=Pc=Pf=Pn="";
if (Points == "stamina") {
	Ps='selected="selected"';
} else if (Points == "cash") {
	Pc='selected="selected"';
} else if (Points == "fans") {
	Pf='selected="selected"';
} else {
	Pn='selected="selected"';
}

if (ThisAppDom.match("_new")) {
	BuyFans='';
} else {
	BuyFans='   <option value="fans" '+Pf+'>Fans&nbsp;&nbsp;&nbsp;&nbsp;(10)</option>';
}


		var logo = document.createElement("p");
		logo.innerHTML = '<div style="position: fixed; z-index: 1; top: 45px;' +
			' width: 175px; border: 1px solid #000000; margin-top: 5px;margin-left:930px; padding:3px;' +
			'font-size: small; background-color: #99FF99; ' +
			'color: #000000;text-align:center;">'+
			'<p style="text-align:center;margin-top: 2px;"><img id="our_image" src="'+ourimage+'" width="150" border=0></p>'+
			'<p style="margin: 2px 0 1px 0;text-align:center;font-weight:bold;color:#f00;" id="TimerP"></p>' +
			'<p style="margin: 2px 0 1px 0;text-align:center;" id="HelperTxt"> ' +
			"<span style='width:100%;'><table border=0 width='100%'>"+
			"<tr><td>Balance</td><td style='text-align:right' id='my_balance'>"+my_balance+"</td></tr>"+
			"<tr><td>Stamina</td><td style='text-align:right' id='my_stamina'>"+my_stamina+"</td></tr>"+
			"<tr><td>Units</td><td style='text-align:right' id='my_points'>"+my_points+"</td></tr>"+
			"<tr><td colspan=2><hr></td></tr>"+
			"<tr><td>"+p_name+"</td><td style='text-align:right' id='my_power'>"+my_power+"</td></tr>"+
			"<tr><td>"+t_name+"</td><td style='text-align:right' id='my_traction'>"+my_traction+"</td></tr>"+
			"<tr><td>"+a_name+"</td><td style='text-align:right' id='my_aero'>"+my_aero+"</td></tr>"+
			"</table></span>"+
			'<table border=0 width="100%">'+
			'<tr><td<b>Unit Use</b>:</td>'+
			'<td style="text-align:right">'+
			'<select id="Pnts">'+
			'<option value="none" '+Pn+'>None</option>'+
			'<option value="stamina" '+Ps+'>Stamina&nbsp;(5)</option>'+
			'   <option value="cash" '+Pc+'>Cash&nbsp;&nbsp;&nbsp;&nbsp;(10)</option>'+
			BuyFans+
			'</select></td></tr>'+
			'<tr><td<b>Multi</b>:</td>'+
			'<td style="text-align:right">'+
			'<select id="M">'+
			'<option value="true" '+mult+'>Yes</option>'+
			'<option value="false" '+mulf+'>No</option>'+
			'</select></td></tr>'+
			'<tr><td<b>Level</b>:</td>'+
			'<td style="text-align:right">'+
			'<select id="L">'+
			'<option value="level" '+sell+'>Current</option>'+
			'<option value="higher" '+selh+'>Higher</option>'+
			'</select></td></tr>'+
			'<tr><td colspan=2><br><b>Thresholds:</b></td></tr>'+
			'<tr><td>'+p_name+':</td><td style="text-align:right"><input id="P" type="text" value="'+p_Thresh+'" size=3></td></tr>'+
			'<tr><td>'+t_name+':</td><td style="text-align:right"><input id="T" type="text" value="'+t_Thresh+'" size=3></td></tr>'+
			'<tr><td>'+a_name+':</td><td style="text-align:right"><input id="A" type="text" value="'+a_Thresh+'" size=3></td></tr>'+
			'<tr><td colspan=2 style="text-align:center"></td></tr>'+
			'</table>'+
			'</p><p id="Buttons" style="text-align:center;"></p><p id="Pause" style="text-align:center;"></p>'+
			'<p id="my_version" style="text-align:center;"><a href="http://userscripts.org/scripts/show/48114" target="_new">Version '+myVersion+'</a></p></div>';
		document.body.appendChild(logo);

function page_reload() {
	window.location=curLocation;
}

function pausecomp(millis)
{
var date = new Date();
var curDate = null;

do { curDate = new Date(); }
while(curDate-date < millis);
} 

// Wierd stuff happens when we don't get what's expected.
try {

if (document.getElementById(ThisAppID + '_newApp')) {
	window.location=curLocation;
}

// Get our details
try {
my_stamina = document.getElementById(ThisAppID+"_balance").childNodes[1].childNodes[1].childNodes[0].nodeValue.replace(/\//, "");
document.getElementById('my_stamina').innerHTML = my_stamina;
my_balance = document.getElementById(ThisAppID+'_balance').childNodes[3].childNodes[1].childNodes[0].nodeValue;
document.getElementById('my_balance').innerHTML = my_balance;
my_points = document.getElementById(ThisAppID+'_balance').childNodes[3].childNodes[4].childNodes[0].nodeValue;
document.getElementById('my_points').innerHTML = my_points;
my_points_name = document.getElementById(ThisAppID+'_balance').childNodes[3].childNodes[3].nodeValue.replace(/:/,'').replace(/        /,'');
} catch(stats) {
my_balance = document.getElementById(ThisAppID+'_balance_value').childNodes[0].nodeValue;
document.getElementById('my_balance').innerHTML = my_balance;
my_stamina = parseInt(document.getElementById(ThisAppID+'_stamina_value').innerHTML);
document.getElementById('my_stamina').innerHTML = my_stamina;
my_points = document.getElementById(ThisAppID+'_units_value').innerHTML;
document.getElementById('my_points').innerHTML = my_points;
}


try {
	my_power =  document.getElementById(ThisAppID+'_my_moto_info_full').childNodes[3].childNodes[1].childNodes[2].childNodes[3].childNodes[0].nodeValue;
	document.getElementById('my_power').innerHTML = my_power;
	my_traction =  document.getElementById(ThisAppID+'_my_moto_info_full').childNodes[3].childNodes[1].childNodes[4].childNodes[3].childNodes[0].nodeValue;
	document.getElementById('my_traction').innerHTML = my_traction;
	my_aero =  document.getElementById(ThisAppID+'_my_moto_info_full').childNodes[3].childNodes[1].childNodes[6].childNodes[3].childNodes[0].nodeValue;
	document.getElementById('my_aero').innerHTML = my_aero;
} catch(motoinfofull) {
	try{
	my_power = document.getElementById(ThisAppID+'_current_moto').childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].nodeValue;
	document.getElementById('my_power').innerHTML = my_power;
	my_traction = document.getElementById(ThisAppID+'_current_moto').childNodes[2].childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].nodeValue;
	document.getElementById('my_traction').innerHTML = my_traction;
	my_aero = document.getElementById(ThisAppID+'_current_moto').childNodes[2].childNodes[0].childNodes[0].childNodes[2].childNodes[1].childNodes[0].nodeValue;
	document.getElementById('my_aero').innerHTML = my_aero;
	} catch(klurtg) {}
}
	

try {
	bstats = document.getElementById(ThisAppID+'_friend_page_tabs').childNodes[1].childNodes[9].childNodes[0].nodeValue.replace(/				/,'').replace(/				/,'').replace(/				/,'');
	mySplitResult = bstats.split("\n");
	my_tmp=mySplitResult[1].split(": ");
	p_name=my_tmp[0];
	my_power=my_tmp[1];
	my_tmp=mySplitResult[2].split(": ");
	t_name=my_tmp[0];
	my_traction=my_tmp[1];
	my_tmp=mySplitResult[3].split(": ");
	a_name=my_tmp[0]
	my_aero=my_tmp[1];
} catch(argh) {
	try {
	p_name = document.getElementById(ThisAppID+'_current_moto').childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[0].nodeValue;
	t_name = document.getElementById(ThisAppID+'_current_moto').childNodes[2].childNodes[0].childNodes[0].childNodes[1].childNodes[0].nodeValue;
	a_name = document.getElementById(ThisAppID+'_current_moto').childNodes[2].childNodes[0].childNodes[0].childNodes[2].childNodes[0].nodeValue;
	} catch(kjhn) {}
}

if (my_points >= 5) {
	document.getElementById('my_points').style.fontWeight = 'bold';
	document.getElementById('my_points').style.color = '#0f0';
} else if (my_points >= 10) {
	document.getElementById('my_points').style.fontWeight = 'bold';
	document.getElementById('my_points').style.color = '#0f0';
	document.getElementById('my_points').style.textDecoration = 'blink';
} 


if ( location.href.match("/upgrade.php")) {
	// get ourimage location
	try {
		ourimage = document.getElementById(ThisAppID+'_my_moto_foto').childNodes[3].src;
	} catch(imgerr) {
		ourimage = document.getElementById(ThisAppID+'_current_moto').childNodes[1].src;
	}
	document.getElementById('our_image').src = ourimage;
}

if ( (location.href.match("/challenge.php"))|| (location.href.match("/mchallenge.php")) ) {
// if something's not right take us back to find another opponent.
if (Paused != "true"){
	reloaddelay=setTimeout("window.location='http://apps.facebook.com/"+ThisAppDom+"/friend.php?mode="+level+"'",10000);
}
	// run the race
	raceform = document.getElementById(ThisAppID+'_race_form');
	if (raceform) {
		//alert('race form found.');
		raceform.submit();
		exit;
	}
	
	try {
	// detect race complete
	result = document.getElementById(ThisAppID+'_result');
	mresult = document.getElementById(ThisAppID+'_mchallenge');
	if (result) {
		//alert("result");
		raceagain = result.childNodes[3].childNodes[5].childNodes[3].childNodes[1].childNodes[0].childNodes[0];
		if (!raceagain) {
		raceagain = result.childNodes[3].childNodes[5].childNodes[3].childNodes[1].childNodes[0];
		}
		if (raceagain) {
		//	alert("raceagain");
			if ( raceagain.nodeValue.match("again") ) {
				window.location = result.childNodes[3].childNodes[5].childNodes[3].childNodes[1].href;
				clearTimeout(reloaddelay);
				exit;
			} else {
				if (Paused != "true"){
				 window.location="http://apps.facebook.com/"+ThisAppDom+"/friend.php?mode="+level;
				 exit;
				}
			}
		} else {
			if (Paused != "true"){
			window.location="http://apps.facebook.com/"+ThisAppDom+"/friend.php?mode="+level;
			exit;
			}
		}
	} else if (mresult) {
		raceagain = mresult.childNodes[1].childNodes[18].childNodes[1].childNodes[3].childNodes[0].childNodes[0];
		if ( raceagain.nodeValue.match("again") ) {
			if (Paused != "true"){
				window.location = mresult.childNodes[1].childNodes[18].childNodes[1].childNodes[3].href;
				exit;
			}
		} else {
			if (Paused != "true"){
				window.location="http://apps.facebook.com/"+ThisAppDom+"/friend.php?mode="+level;
				exit;
			}
		}
	} else {
		if (Paused != "true"){
			window.location="http://apps.facebook.com/"+ThisAppDom+"/friend.php?mode="+level;
			exit;
		}
	}
	// end old style catch
	} catch(err) {
	// detect race complete
	var result = document.getElementById(ThisAppID+'_content_box').childNodes[7].childNodes[7].childNodes[1];
	mresult = document.getElementById(ThisAppID+'_mchallenge');
	if (result) {
		
	//	alert(result.href);
		window.location = result.href;
		clearTimeout(reloaddelay);

	} else if (mresult) {
		raceagain = mresult.childNodes[1].childNodes[18].childNodes[1].childNodes[3].childNodes[0].childNodes[0];
		if ( raceagain.nodeValue.match("again") ) {
			if (Paused != "true"){
				window.location = mresult.childNodes[1].childNodes[18].childNodes[1].childNodes[3].href;
				exit;
			}
		} else {
			if (Paused != "true"){
				window.location="http://apps.facebook.com/"+ThisAppDom+"/friend.php?mode="+level;
				exit;
			}
		}
	} else {
		if (Paused != "true"){
			window.location="http://apps.facebook.com/"+ThisAppDom+"/friend.php?mode="+level;
			exit;
		}
	}
	// end new style catch.
	}
}

// friend.php racer search
if ( (location.href.match("friend.php")) && (location.href.match(level)) ) {

	try {
	my_power=document.getElementById(ThisAppID+'_content_box').childNodes[3].childNodes[1].childNodes[9].childNodes[0].nodeValue;
	my_traction=document.getElementById(ThisAppID+'_content_box').childNodes[3].childNodes[1].childNodes[5].childNodes[0].nodeValue;
	my_aero=document.getElementById(ThisAppID+'_content_box').childNodes[3].childNodes[1].childNodes[1].childNodes[0].nodeValue;
	document.getElementById('my_power').innerHTML = my_power;
	document.getElementById('my_traction').innerHTML = my_traction;
	document.getElementById('my_aero').innerHTML = my_aero;
	} catch(jhbv) {}
	if ( my_stamina < 3 ) {
		var myDate=new Date();
		myDate.setMinutes(myDate.getMinutes()+10);
		ReloadTime = pad(myDate.getHours(),2)+":"+pad(myDate.getMinutes(),2)+":"+pad(myDate.getSeconds(),2);
		if (Paused != "true"){
			document.getElementById('TimerP').innerHTML = 'Not enough Stamina<br>Reloading at '+ReloadTime+'.';
			reloaddelay=setTimeout("window.location=location.href",600000); // delay time in miliseconds.
		}
		if (my_stamina == 0){
			if (my_points >= 5 && Points == "stamina") { 
				// http://apps.facebook.com/space_domination/school.php?get=fullStamina
				url_list="http://apps.facebook.com/"+ThisAppDom+"/school.php?get=fullStamina;"+document.location.href;
			} else if (my_points >= 10) {
				if (Points == "cash"){
					url_list="http://apps.facebook.com/"+ThisAppDom+"/school.php?get=money;"+document.location.href;
				} else if (Points == "fans") {
					url_list="http://apps.facebook.com/"+ThisAppDom+"/school.php?get=fansForPoints;"+document.location.href;
				}
			}
		}

	} else {
		if (Paused != "true"){
			reloaddelay=setTimeout("window.location=location.href",5000); // reload if we're still here in 5 seconds.
		}
		
		var t_power = (my_power/100)*p_Thresh;
		var t_trac = (my_traction/100)*t_Thresh;
		var t_aero = (my_aero/100)*a_Thresh;
		
		try {
		find_racers = document.getElementById(ThisAppID+'_races_list').childNodes[0].childNodes[1];
			for ( i=0 ; i<5 ; i++) {
				var node=((i+1)*2)-2;
			
				power_in=find_racers.childNodes[node].childNodes[5].childNodes[5].childNodes[5].nodeValue;
				power_splt=power_in.split(": ");
				var power=power_splt[1];
			
				trac_in=find_racers.childNodes[node].childNodes[5].childNodes[5].childNodes[7].nodeValue.split(": ");
				trac=trac_in[1];
			
				aero_in=find_racers.childNodes[node].childNodes[5].childNodes[5].childNodes[9].nodeValue.split(": ");
				aero=aero_in[1];
			
				fans_in=find_racers.childNodes[node].childNodes[5].childNodes[5].childNodes[11].nodeValue.split(": ");
				fans=fans_in[1];
			
				if ( (power <= t_power) && (trac <= t_trac) && (aero <= t_aero) && (find_racers.childNodes[node].childNodes[5].childNodes[7].className != "error") ) {
					//alert("Match: "+ i +" :"+power+"|"+trac+"|"+aero+"|"+fans);
					//alert(find_racers.childNodes[node].childNodes[5].childNodes[6].childNodes[1].href);
					if ( Multi.match("true") && find_racers.childNodes[node].childNodes[5].childNodes[6].childNodes[3].href.match("/mchallenge") ) {
						if (Paused != "true"){
							window.location = find_racers.childNodes[node].childNodes[5].childNodes[6].childNodes[3].href;
							exit;
						}
					} else {
						if (Paused != "true"){
							window.location = find_racers.childNodes[node].childNodes[5].childNodes[6].childNodes[1].href;
							exit;
						}
					
				}
				} else {
					find_racers.childNodes[node].childNodes[5].childNodes[5].style.color = "#f00";
				}
			}
			if (Paused != "true"){
				window.location=location.href;
			}
			
		} catch(kjdghg) 
		{
		try {
		find_racers = document.getElementById(ThisAppID+'_races_list').childNodes[0].childNodes[1];
			for ( i=0 ; i<10 ; i++) {
				var node=((i+1)*2)-2;
			
				power=find_racers.childNodes[node].childNodes[5].childNodes[1].childNodes[3].childNodes[0].nodeValue;
				trac=find_racers.childNodes[node].childNodes[5].childNodes[1].childNodes[7].childNodes[0].nodeValue;
				aero=find_racers.childNodes[node].childNodes[5].childNodes[1].childNodes[11].childNodes[0].nodeValue;
				if ( (power <= t_power) && (trac <= t_trac) && (aero <= t_aero) && (find_racers.childNodes[node].childNodes[7].childNodes[3].className != "error") ) {
					if ( Multi.match("true") && find_racers.childNodes[node].childNodes[7].childNodes[3].href.match("/mchallenge") ) {
						if (Paused != "true"){
							HaveRace="true";
							window.location = find_racers.childNodes[node].childNodes[7].childNodes[3].href;
							exit;
						}
					} else {
						if (Paused != "true"){
							HaveRace="true";
							window.location = find_racers.childNodes[node].childNodes[7].childNodes[1].href;
							exit;
						}
					
					}
				} else {
					find_racers.childNodes[node].childNodes[5].style.color = "#f00";
				}
			}
			if (Paused != "true" && HaveRace != "true"){
			window.location=location.href;
			}

		} catch(sdhgfksj) {}
		}
	}	
	
} else if ( location.href.match("friend.php") ) {
	if (Paused != "true"){
		window.location="http://apps.facebook.com/"+ThisAppDom+"/friend.php?mode="+level;
	}
}
	
} catch(eek) { }

function b(cb, name) {
   var b=document.createElement('button');
   b.innerHTML=name;
   b.addEventListener('click', cb, false);
   if (name == "Un-Pause") {
   //
   b.style.color="#f00";
   b.style.fontWeight="bold";
   }
   if (name == "Save"){
   b.style.marginBottom="20px";
   }
   b.style.marginLeft="20px";
   b.style.marginRight="20px";

   document.getElementById('Buttons').appendChild(b);
}

// My_Settings=ThisAppDom+"."+ThisPerson+".Settings", settings;

b(function(){
	var Multi=document.getElementById('M').options[document.getElementById('M').selectedIndex].value;
	var level=document.getElementById('L').options[document.getElementById('L').selectedIndex].value;
	var p_Thresh=document.getElementById('P').value;
	var t_Thresh=document.getElementById('T').value;
	var a_Thresh=document.getElementById('A').value;
	var Points=document.getElementById('Pnts').options[document.getElementById('Pnts').selectedIndex].value
	settings=Multi+"|"+level+"|"+p_Thresh+"|"+t_Thresh+"|"+a_Thresh+"|"+Points;
	GM_setValue(ThisAppDom+"."+ThisPerson+".Settings", settings);
	alert("Settings Saved.");
}, 'Save');

if (Paused != "true") {
	// pause	
	b(function(){
	var Multi=document.getElementById('M').options[document.getElementById('M').selectedIndex].value;
	var level=document.getElementById('L').options[document.getElementById('L').selectedIndex].value;
	var p_Thresh=document.getElementById('P').value;
	var t_Thresh=document.getElementById('T').value;
	var a_Thresh=document.getElementById('A').value;
	var Points=document.getElementById('Pnts').options[document.getElementById('Pnts').selectedIndex].value
	settings=Multi+"|"+level+"|"+p_Thresh+"|"+t_Thresh+"|"+a_Thresh+"|"+Points+"|";

		GM_setValue(ThisAppDom+"."+ThisPerson+".Settings", settings+"true");
		window.location=document.location.href;
	}, 'Pause');
} else {
	// unpause	
	b(function(){
	var Multi=document.getElementById('M').options[document.getElementById('M').selectedIndex].value;
	var level=document.getElementById('L').options[document.getElementById('L').selectedIndex].value;
	var p_Thresh=document.getElementById('P').value;
	var t_Thresh=document.getElementById('T').value;
	var a_Thresh=document.getElementById('A').value;
	var Points=document.getElementById('Pnts').options[document.getElementById('Pnts').selectedIndex].value
	settings=Multi+"|"+level+"|"+p_Thresh+"|"+t_Thresh+"|"+a_Thresh+"|"+Points+"|";

		GM_setValue(ThisAppDom+"."+ThisPerson+".Settings", settings+"false");
		window.location=document.location.href;
	}, 'Un-Pause');
}


// b(function(){alert(GM_getValue(My_Settings))}, 'get');

// if no image get it.
if (!ourimage.match("http") && !location.href.match("/upgrade.php")) {
	//alert("No Image:"+document.location.href);
	url_list="http://apps.facebook.com/"+ThisAppDom+"/upgrade.php;"+document.location.href;
}


try {	
	urls=url_list.split(';');
	if (url_list.match("http") ) {
		redirecturl=urls[0];
		if (window.location.href == urls[0])  {
			urls.shift();
			url_list = urls.join(';');
		}
		redirecturl=urls[0];
		if (redirecturl.match("http")) {	
			reloaddelay=setTimeout("window.location='"+redirecturl+"'",4000);
		}
	}
} catch(oops) {}

/*  settings stored as:
	Multi:level:p_Thresh:t_Thresh:a_Thresh
	defaults:
	false:higher:90:90:90
*/
settings=Multi+"|"+level+"|"+p_Thresh+"|"+t_Thresh+"|"+a_Thresh+"|"+Points+"|"+Paused;
GM_setValue(ThisAppDom+"."+ThisPerson+".Settings", settings);

/*  cache stored as:
	ourimage|p_name|t_name|a_name|power|trac|aero|fans|stamina
	default = empty;
*/
cache=ourimage+"|"+p_name+"|"+t_name+"|"+a_name+"|"+my_power+"|"+my_traction+"|"+my_aero+"|"+my_fans+"|"+my_stamina+"|"+url_list+"|"+my_balance+"|"+my_points;
GM_setValue(ThisAppDom+"."+ThisPerson+".cache", cache);
