// ==UserScript==
// @name           Moar Stats Collector
// @author         livinskull
// @version        0.02
// @namespace      http://userscripts.org/users/livinskull
// @include        http://www.forumwarz.com/forums/battle/*
// @include        http://forumwarz.com/forums/battle/*
// ==/UserScript==

var debug = true;

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
		GM_log('Statistics created: '+this.forum);
	
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

		orig.innerHTML = "<ul>";
		for (i in this.moarFiles)
			orig.innerHTML += "<li>"+this.moarFiles[i].name+": "+this.moarFiles[i].partsFound+" part(s) found";//+this.moarFiles[i].missingParts()+" missing</li>";
		orig.innerHTML += "</ul>";
		orig.innerHTML += "<br/><br/><sup>Stats collected by livinskull's Moar Stats Collector</sup><br/>";
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
