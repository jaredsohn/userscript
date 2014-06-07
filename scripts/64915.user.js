// ==UserScript==
// @name           Moar Stats Collector2
// @author         kraigu
// @version        0.02
// @namespace      http://userscripts.org/users/kraigu
// @include        http://www.forumwarz.com/forums/battle/*
// @include        http://forumwarz.com/forums/battle/*
// @include        http://*.forumwarz.com/forums/battle/*
// ==/UserScript==
// Originally developed based on livinskull's Moar Stats Collector 0.2
// Allow *.forumwarz.com as well, so can test on beta servers
// output in CSV format so it's useful for collecting stats
//  be nice if we could output CSV to a file... maybe a Jetpack version.
// Thanks to livinskull for the original code:
//  http://userscripts.org/scripts/show/56136
// v0.02: add a timestamp of sorts.

var debug = true;

var d = new Date();
var tstamp = "";
var j = d.getUTCFullYear();
tstamp += j.toString();
j = d.getUTCMonth();
tstamp += j.toString();
j = d.getUTCDay();
tstamp += j.toString();
j = d.getUTCHours();
tstamp += j.toString();
j = d.getUTCMinutes();
tstamp += j.toString();
j = d.getUTCSeconds();
tstamp += j.toString();
j = d.getUTCMilliseconds();
tstamp += j.toString();
// This gives us a date+timestamp in j, which we can use to more or less
//  uniquely identify this run later.

function moarFile(filename, totalparts) {
	this.name = filename;
	this.partsFound = 1;
	this.partsTotal = totalparts;
	
	this.foundPart = function() {
		this.partsFound++;
	}
	
	this.missingParts = function() {
		return this.partsTotal - this.partsFound;
	}
}


function Statistics(location) {
	this.forum = location.match(/^.*\/forums\/battle\/([0-9]+-?.*)$/)[1];
	this.moarFiles = new Array();
	
	if (debug)
		GM_log('Statistics created: '+tstamp+' '+this.forum);
	
	this.collect = function(moarRaw) {
		moarStuff = moarRaw.match(/picked up piece <b>#[0-9]+<\/b> \(of ([0-9]+)\) of the file <b>(.*)<\/b>/i);
		moarId = -1;
		
		if (debug)
			GM_log('Found '+moarStuff[2]);
		
		if (this.moarFiles.length) {
			for (i in this.moarFiles) {
				if (this.moarFiles[i].name == moarStuff[2]) {
					moarId = i;
					break;
				}
			}
		} 
		
		if (moarId > -1)
			this.moarFiles[moarId].foundPart();
		else
			this.moarFiles.push(new moarFile(moarStuff[2], moarStuff[1]));
		
	}
	
	this.output = function() {
		var orig = document.getElementById("cred").getElementsByTagName('blockquote')[0];
		document.getElementById("cred").getElementsByTagName('cite')[0].innerHTML = 'Moar File Statistics:';
    if (debug)
      GM_log('Collecting stats');
		orig.innerHTML = "<ul>";
		for (i in this.moarFiles)
			orig.innerHTML += "<li>"+this.moarFiles[i].name+": "+this.moarFiles[i].partsFound+" part(s) found";
		orig.innerHTML += "</ul>";
		orig.innerHTML += "CSV output (for C&P and easy spading):<br />";
    for (i in this.moarFiles)
      orig.innerHTML += '"'+tstamp+'","'+this.forum+'","'+this.moarFiles[i].name+'","'+this.moarFiles[i].partsFound+'"<br />';
		orig.innerHTML += "<br />";
    if (debug)
      GM_log('Stat output complete');
	}
}

var Stats = new Statistics(document.location.toString());
unsafeWindow['Battle'].watch('in_thread', watcher);

function watcher(prop, oldval, newval) {
	if (newval == false) {
		var moarDiv = document.getElementById("moar");

		if (moarDiv) {
			if (debug)
				GM_log('calling collector');
			Stats.collect(moarDiv.innerHTML);	
		}
		
		if (document.getElementById("pwned_forum")) {
			if (debug)
				GM_log('output called');
			Stats.output();
			delete Stats;
		}
	}
	return newval;
}
