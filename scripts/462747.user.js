// ==UserScript==
// @name           Chicken Smoothie XR
// @description    Automatically collects event banners and freebies on Chicken Smoothie. Make sure to run it on the Homepage or Event page for it to work!! (In other words, just make sure it's on and keep a tab open at http://www.chickensmoothie.com/ )
// @namespace      http://kiss.the.keions.com/
// @namespace      http://deelekgolo.tumblr.com/
// @author         deeLekgolo(Modified by Koaten)
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @version        1.8.8.1
// @updateURL      https://www.dropbox.com/s/7z0i59ccq7wd9rj/CSXR.meta.js?dl=1
// @downloadURL    https://www.dropbox.com/s/mepohr5n0siwlko/CSXR.user.js?dl=1
// @include        *://www.chickensmoothie.com/
// @include        *://www.chickensmoothie.com/halloween*
// @include        *://www.chickensmoothie.com/hanukkah.php*
// @include        *://www.chickensmoothie.com/advent.php*
// @include        *://www.chickensmoothie.com/newyears.php*
// @include        *://www.chickensmoothie.com/easter-2014/*
// @run-at         document-end
// @history        1.0 first version
// @history        1.1 automatically collects 
// @history		   1.2 Added a status area, code cleanup and optimizations
// @history        1.3 Fixed jQuery collisions. Pet Item Menu should work now.
// @history        1.4 Updated scrapers. Now has embedded and minimalistic grabbers.
// @history        1.5 Fixed bug when there would be multiple give-away prize links on one page.
// @history        1.6 Disabled the auto-reload feature to avoid bot-like behavior.
// @history        1.7 [XR][ktn] Revamped design. Auto-reload is now a bit SMARTER - it will now detect if you  have to wait 20 minutes or not, and adjust the refresh time accordingly. Reload times are now randomized to reduce bot-like behavior. 
// @history        1.8 [XR][ktn] Auto-reload is now even smarter - it will now detect the EXACT amount of time remaining until the next banner is available, then use that + randomness as the refresh time. Script will now ONLY run on the HOMEPAGE and (EVENT) PAGE to avoid interfering with normal website usage.
// @history        1.8a [XR][ktn] Minor update but vital fix - strings were not matching because of comma.
// @history        1.8.3 [XR][ktn] Fixed a small error. Changed version formatting to be compatible with automatic updates.
// @history        1.8.4 [XR][ktn] Script now detects when you've reached the banner limit and notifies you/ceases reloading.
// @history        1.8.5 [XR][ktn] It should now detect when the event has ended for at least a day. (Hopefully.)
// @history        1.8.6 [XR][ktn] Prepped for Xmas event.
// @history        1.8.7 [XR][ktn] Included New Years page in automatic prize-grabbing. (Still no banners so no need for autoreload.)
// @history        1.8.8 [XR][ktn] Included Easter-2014 page. Auto-reload re-enabled and script is now ready to fetch banners!
// ==/UserScript==

//refresh rate in milliseconds
var refresh = NaN;
 //var refresh = Math.floor((Math.random()*1089752)+Math.random()+12000000); //I don't even know
 var rate = 42;//about 24 times a second
 var wait = window.find("You've found a hidden prize too recently");
//Messy variable board
var wait0 = window.find("you need to wait at least 0 minute");
var wait1 = window.find("you need to wait at least 1 minute");
var wait2 = window.find("you need to wait at least 2 minute");
var wait3 = window.find("you need to wait at least 3 minute");
var wait4 = window.find("you need to wait at least 4 minute");
var wait5 = window.find("you need to wait at least 5 minute");
var wait6 = window.find("you need to wait at least 6 minute");
var wait7 = window.find("you need to wait at least 7 minute");
var wait8 = window.find("you need to wait at least 8 minute");
var wait9 = window.find("you need to wait at least 9 minute");
var wait10 = window.find("you need to wait at least 10 minute");
var wait11 = window.find("you need to wait at least 11 minute");
var wait12 = window.find("you need to wait at least 12 minute");
var wait13 = window.find("you need to wait at least 13 minute");
var wait14 = window.find("you need to wait at least 14 minute");
var wait15 = window.find("you need to wait at least 15 minute");
var wait16 = window.find("you need to wait at least 16 minute");
var wait17 = window.find("you need to wait at least 17 minute");
var wait18 = window.find("you need to wait at least 18 minute");
var wait19 = window.find("you need to wait at least 19 minute");
var wait20 = window.find("you need to wait at least 20 minute");
var done = window.find("You've now reached the limit of the number of prizes you can find");
var eventover = window.find("Event is now over!");
var found = false;

var contain = document.createElement('div');
contain.className = "navbar";
contain.id = "Status";
contain.style = "margin-top:4px;";

//top round corners
var spantop = document.createElement('span');
spantop.className = "corners-top";
spantop.appendChild(document.createElement('span'));
contain.appendChild(spantop);

//About
var About = document.createElement('ul');
About.className = "linklist navlinks";
var Info = document.createElement('li');
Info.innerHTML = "Chicken Smoothie XR:";
About.appendChild(Info);
contain.appendChild(About);


	//Status and info
	var Elements = document.createElement("ul");
	Elements.className = "linklist rightside";
	contain.appendChild(Elements);

	//Auto-refresh countdown timer.
	 var refreshtime = document.createElement('li');
	 Elements.appendChild(refreshtime);

	//Prize Grabber
	var prizestatus = document.createElement('li');
	Elements.appendChild(prizestatus);




//bottom round corners
var spanbottom = document.createElement('span');
spanbottom.className = "corners-bottom";
spanbottom.appendChild(document.createElement('span'));
contain.appendChild(spanbottom);

var header = document.querySelector('div[id="page-header"]');
header.appendChild(contain);
/////////////////////////////////////////////


 setTimeout(Tick,rate);
 function Tick(){
	refresh -= rate;
	//refresh when the refreshtime reaches 0
	if (refresh <= 0){
		refreshtime.innerHTML = "Refreshing...";
		window.location.reload(1);
	}
     else if (done == true){
    refreshtime.innerHTML = "<font color='orange'>You can't get any more banners!</font>";
     refresh = NaN;
     }
    else if (eventover == true) {
        refreshtime.innerHTML = "<font color='#0f0' style='font-weight:800;'>The event has ended! Please disable CSXR until next time. I hope you had fun!</font>";
		refresh = NaN;
    }   
     
 	else{
 		refreshtime.innerHTML = "Refreshing in: " + (refresh/60000).toFixed(2) + " minute(s)";
 		setTimeout(Tick,rate);
 	}
 	return true;
 }




function ScanPrize(){
	prizestatus.innerHTML = '<font color="black">Prize Grabber: </font>';
	var find = document.querySelector('a[href*="getgiveaway.php"]');
    if (done == true) {
    prizestatus.innerHTML += "<font color='yellow'>Limit Reached!</font>";
        return -1;
    }
	else if (find == null) 
		{
			prizestatus.innerHTML += '<font color="red">No prizes found</font>';
			return -1;
		};
	prizestatus.innerHTML += '<font color="green">Prize found!</font>';
    var found = true;
	var collect = document.querySelectorAll('a[href*="getgiveaway.php"]');

	for (var i = 0; i < collect.length; i++) {
		var link = collect[i].getAttribute("href");

		//scrape collection page
		var message = null;
		$.ajax({
			url: link,
			type: 'get',
			dataType: 'html',
			async: false,
			success: function(data)
			{
				var dom = document.createElement('div');
				dom.innerHTML = data;
				message = dom.querySelector('div[id="message"]').querySelector('div[class="inner"]');
				message.className = "prizegrab";
				var cleanup = message.querySelectorAll('span,h2,p:empty,a');
				for (var i = 0 ; i < cleanup.length; i++) 
				{
					cleanup[i].parentNode.removeChild(cleanup[i]);
				};
                message.style = "background-color: #bdd097; padding: 16px; border-radius: 0px !important; opacity: 0.9;"
			}
		});
		$(".prizegrab").wrap('<ul class="linklist navlinks"><li></li></ul>');
		contain.insertBefore(message,contain.lastChild);
		collect[i].parentNode.removeChild(collect[i]);
	};
	return 1;
}


function ScanGiveawayItem(){
	var forms = document.querySelectorAll('form[action="/getgiveaway.php"]');
	if (forms == null){
		return -1;
	};
	//loop through all forms
	for (var i = 0; i < forms.length; i++) {
		//parent node to iframe
		var parent = forms[i].parentNode;
		//get all hidden form inputs
		var inputs = forms[i].querySelectorAll('input[type="hidden"]');
		//generate the POST link
		var POST = "/getgiveaway.php?";
		//loop through all form inputs
		for (var x = 0; x < inputs.length; x++) {
			var name = inputs[x].getAttribute("name");
			var value = inputs[x].getAttribute("value");
			//skip empty inputs
			if (name.length == 0 || value.length == 0) {continue;};
			POST += (((x==0) ? "":"&") + name + "=" + value);
		};
		//scrape collection page
		var message = null;
		$.ajax({
			url: POST,
			type: 'get',
			dataType: 'html',
			async: false,
			success: function(data)
			{
				var dom = document.createElement('div');
				dom.innerHTML = data;
				message = dom.querySelector('div[id="message"]').querySelector('div[class="inner"]');
				message.className = "autograb";
				var cleanup = message.querySelectorAll('span,h2,p:empty');
				for (var i = 0 ; i < cleanup.length; i++) {
					cleanup[i].parentNode.removeChild(cleanup[i]);
				};
				message.style = "background-color: #bdd097; padding: 16px; border-radius: 0px; opacity: 0.9;"
			}
		});
		parent.replaceChild(message,forms[i]);
	};
}

//Reload Handler (Re-enabled for Easter!)
if (done == true) {
var refresh = NaN;
prizestatus.innerHTML += "<font color='yellow'>You've reached the limit!</font>";
}
else if (found == true) {
var refresh = Math.floor((Math.random()*8234)+Math.random()+25000);
}
else {
if (wait == true) {
    if (wait0 == true) {
        var refresh = Math.floor((Math.random()*8234)+Math.random()+5000);
    }
    else if (wait1 == true) {
        var refresh = Math.floor((Math.random()*10123)+Math.random()+6000);
    }
    else if (wait2 == true) {
        var refresh = Math.floor((Math.random()*12234)+Math.random()+120000);
    }
    else if (wait3 == true) {
        var refresh = Math.floor((Math.random()*17345)+Math.random()+180000);
    }
    else if (wait4 == true) {
        var refresh = Math.floor((Math.random()*21456)+Math.random()+240000);
    }
    else if (wait5 == true) {
        var refresh = Math.floor((Math.random()*25567)+Math.random()+300000);
    }
    else if (wait6 == true) {
        var refresh = Math.floor((Math.random()*29678)+Math.random()+360000);
    }
    else if (wait7 == true) {
        var refresh = Math.floor((Math.random()*34789)+Math.random()+420000);
    }
    else if (wait8 == true) {
        var refresh = Math.floor((Math.random()*39890)+Math.random()+480000);
    }
    else if (wait9 == true) {
        var refresh = Math.floor((Math.random()*48901)+Math.random()+540000);
    }
    else if (wait10 == true) {
        var refresh = Math.floor((Math.random()*55012)+Math.random()+600000);
    }
    else if (wait11 == true) {
        var refresh = Math.floor((Math.random()*103123)+Math.random()+660000);
    }
    else if (wait12 == true) {
        var refresh = Math.floor((Math.random()*110234)+Math.random()+720000);
    }
    else if (wait13 == true) {
        var refresh = Math.floor((Math.random()*117345)+Math.random()+780000);
    }
    else if (wait14 == true) {
        var refresh = Math.floor((Math.random()*125456)+Math.random()+840000);
    }
    else if (wait15 == true) {
        var refresh = Math.floor((Math.random()*133567)+Math.random()+900000);
    }
    else if (wait16 == true) {
        var refresh = Math.floor((Math.random()*140678)+Math.random()+960000);
    }
    else if (wait17 == true) {
        var refresh = Math.floor((Math.random()*148789)+Math.random()+1020000);
    }
    else if (wait18 == true) {
        var refresh = Math.floor((Math.random()*156890)+Math.random()+1080000);
    }
    else if (wait19 == true) {
        var refresh = Math.floor((Math.random()*165901)+Math.random()+1140000);
    }
    else if (wait20 == true) {
        var refresh = Math.floor((Math.random()*175012)+Math.random()+1200000);
    }
    else {
        var refresh = NaN; //FAILSAFE
    }
}
else {
var refresh = Math.floor((Math.random()*4482)+Math.random()+38);
}
}


ScanGiveawayItem();

ScanPrize();

// GreaseMonkey/Tampermonkey/etc only
GM_addStyle ( "                         \
    #Status {                         \
border: 1px solid RGBa(250,250,250,0.6) !important;    \
opacity: 0.8 !important;  border-radius: 0px !important;              \
}  \
" );