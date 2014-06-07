// ==UserScript==
// @name           BvS_Bawg_Reporter
// @namespace      SirDuck36
// @description    Generate a Bawg Report for BvS Forum Copy/Paste
// @include        http://*animecubed.com/billy/bvs/partyhouse-pachinkoplay*
// @require        http://userscripts.org/scripts/source/74144.user.js
// @version        0.4
// @history        0.4 Fix for bawg multiplier text
// @history        0.3 Bug fix to fix the display
// @history        0.2 Bug fix thanks to kumida
// @history        0.1 Initial version by SirDuck36
// ==/UserScript==

// Script version
var scriptVersion = "0.4";


// 10.2.2011 Initial version by SirDuck36

// Library code

// Script auto updater
try{
    ScriptUpdater.check(114522, scriptVersion);
} catch(e){}

// Make infinite alerts less miserable
var displayAlerts = true;
function alert(msg) {
  if (displayAlerts) {
     if (!confirm(msg)) {
       displayAlerts = false;           
     }
  }
}


// Main script

if (document.body.innerHTML.indexOf("-- Report --") > -1)
{
    try
    {
	// Extract last winner time and name
	var lastWinnerRes = /<center><b>The Bawg<\/b><br>[^]Last won on (.*?)<br>[^]by <b>(.*?)<\/b><br>/.exec(document.body.innerHTML);
	
	var win = new Object();
	win.time = lastWinnerRes[1];
	win.name = lastWinnerRes[2];
	
	
	// Extract Report
	var reportStr = /-- Report --<br>[^](.*)[^]<\/td>/.exec(document.body.innerHTML)[1];
	var rep = {total: 0, forest: 0, gate: 0, trayone: 0, traytwo: 0, traythree: 0, jackpot: 'none'};
	rep.total = /<b>Forest of Pins:<\/b> (\d+) \/ (\d+) get through!<br>/.exec(reportStr)[2];
	rep.forest = /<b>Forest of Pins:<\/b> (\d+) \/ (\d+) get through!<br>/.exec(reportStr)[1];
	
	if (rep.forest > 0)
	    rep.gate = /<b>The Gate:<\/b> (\d+) \/ (\d+) get through!<br>/.exec(reportStr)[1];
	
	if (rep.gate > 0)
	    rep.trayone = /<b>Tray One:<\/b> (\d+) \/ (\d+) get through!<br>/.exec(reportStr)[1];
	
	if (rep.trayone > 0)
	    rep.traytwo = /<b>Tray Two:<\/b> (\d+) \/ (\d+) get through!<br>/.exec(reportStr)[1];
	
	if (rep.traytwo > 0)
	    rep.traythree = /<b>Tray Three:<\/b> (\d+) \/ (\d+) get through!<br>/.exec(reportStr)[1];
	
	if (rep.traythree > 0)
	    rep.jackpot = /<b>Jackpot:<\/b> (.*?)<br>/.exec(reportStr)[1];
	
	// Convenience report string
	var reportStr = '';
	reportStr += rep.total + ' ';
	reportStr += rep.forest + ' ';
	reportStr += rep.gate + ' ';
	reportStr += rep.trayone + ' ';
	reportStr += rep.traytwo + ' ';
	reportStr += rep.traythree + ' ';
	
	var jackpotStr = rep.jackpot;
	
	
	// Extract Bawg Settings
	var settingRes = /<tbody>(?=<tr><td>Timing:)([^]*?)<\/tbody>.*?<tbody>([^]*?)<\/tbody>/.exec(document.body.innerHTML);
	
	settingStr = settingRes[1] + settingRes[2];
	
	var sets = new Object();
	
	var setnames = 
	    [
		'tim', 'Timing',
		'flo', 'Floor Tilt',
		'tig', 'Tightness',
		'aim', 'Aim',
		'bui', 'Building Tilt',
		'pin', 'Pin Setting',
		'mag', 'Magnetism',
		'vol', 'Volume',
		'hum', 'Humidity',
		'mac', 'Machine Tilt',
		'zaw', 'Zawa'
	    ];
	
	for (var i = 0; i<22; i+=2)
	    sets[ setnames[i] ] = RegExp(setnames[i+1]+ ': <\\/td><td>(\\d+)<').exec(settingStr)[1];
	
	var bawgStr = '';
	for (var i = 0; i<22; i+=2)
	    bawgStr += sets[setnames[i]] + ' ';
	
	
	// Generate a string to post in the forum
	
	var forumStr = '';
	forumStr += 'Bawg Reporter Version ' + scriptVersion + '\n';
	forumStr += 'Last Winner: ' + win.name + ' on ' + win.time + '\n';	
	forumStr += 'Bawg Settings: ' + bawgStr + '\n';
	forumStr += 'Results: ' + reportStr + '\n';
	forumStr += 'Jackpot Message: ' + rep.jackpot + '\n';
	forumStr += '\nv' + scriptVersion + ' ' + win.name + ' -- ' + bawgStr + '-- ' +  reportStr;
	
	// Finally, insert forum string into the page for copy/paste
	
	var div=document.createElement("div");
	div.style.left = "40px";
	div.style.top = "100px";
	div.style.position = "fixed";
	div.style.width = "485px";
	div.style.height = "165px";
	div.style.background = 'none repeat scroll 0% 0% rgb(216, 100, 100)';
	
	var area=document.createElement("textarea");
	
	area.value = forumStr;
	area.rows = 7;
	area.cols = 60;
	area.addEventListener("focus", function(){this.select()}, false);
	
	div.innerHTML="<center><br>Please <a href='/billy/forum/posting.php?mode=reply&f=43&t=20077' target='_blank'>post</a>"+
	    " the below into <a href='/billy/forum/viewtopic.php?f=43&t=20077' target='_blank'>this thread</a>.<br><br></center>";
	div.appendChild(area);
	
	document.body.appendChild(div);

	
    }
    catch(err)
    {
	alert('An error has occured:\n\n' + err.message);
    }
}
    