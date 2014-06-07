// ==UserScript==
// @name          Ikariam Ally Distance
// @version       1.0
// @copyright     2009, Yoshi Toranaga
// @license       GPL v3
// @namespace     ikariam/allydistance
// @description   Shows the shipping distance from selected town to ally towns in embassy and alliance views
// @include       http://s*.ikariam.*/index.php
// @include       http://s*.ikariam.*/index.php*view=diplomacyAdvisor*&watch=4*
// @include       http://s*.ikariam.*/index.php*view=diplomacyAdvisorAlly*
// @include       http://s*.ikariam.*/index.php*view=embassy*
// @exclude       http://support*.ikariam.*/*
// @require       http://ikariamscriptresources.googlecode.com/svn/tags/Latest/AutoUpdater.js 
// @require       http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

var page = $("body").attr("id");
if (page != "diplomacyAdvisorAlly" && page != "embassy") {
	return;
}

new IkariamUserScriptUpdater( 50979, "Ikariam CAT Indicator" );

var iad = new Object();

iad.Timer = function(name) {
	this.name = name;
	this.start = new Date().getTime();
}

iad.Timer.prototype = {
	print: function(mark) {
		GM_log( this.name + (mark?'.'+mark:'') + ": " + (new Date().getTime() - this.start) + "ms" );
	}
}

iad.Location = function (xCoord, yCoord) {
	this.X = xCoord;
	this.Y = yCoord;
}

iad.Location.prototype = {		
	toString: function() {
		return "[" + this.X + ":" + this.Y + "]";
	},
}

iad.AllyDistanceViewer = function() {
	GM_addStyle(
		"#mainview .cityInfo ul li ul li { padding: 4px; width: 240px; } " +
		"#mainview .allyDistance { float: right; clear: none; }");
	
	this.locRegex = /.*\[(\d+):(\d+)\].*/;
}

iad.AllyDistanceViewer.prototype = {

	extractLocation: function(html) {
		var match = this.locRegex.exec(html);
		return new iad.Location(match[1], match[2]);
	},
	
	fmt: function(n, unit) {
		return (n>0 ? n + unit : "");
	},
	
	getDistance: function(p1, p2) {
		// compute duration to ship goods from p1 to p2
		if (p1.X == p2.X && p1.Y == p2.Y) {
			return "10m";
		}
		
		var distance = Math.ceil(1200*Math.sqrt(Math.pow(Math.abs(p1.X-p2.X), 2) + Math.pow(Math.abs(p1.Y-p2.Y), 2)));
		var days = Math.floor(distance/86400); distance = distance - days*86400;
		var hours = Math.floor(distance/3600); distance = distance - hours*3600;
		var minutes = (days > 0) ? 0 : Math.floor(distance/60);
		var seconds = (days + hours > 0) ? 0 : distance - minutes*60;
		return this.fmt(days, 'D') + this.fmt(hours, 'h') + this.fmt(minutes, 'm') + this.fmt(seconds, 's');
	},


	modifyAllianceView: function(page) {
		var t = new iad.Timer('allianceView');
		var self = this;
		
		var myLocation = self.extractLocation($("#changeCityForm option[class*=coords][selected=selected]").text());
		
		$("table#memberList > tbody > tr > td.cityInfo > ul > li > ul > li > a").each(function() {
			$(this).before($('<div class="allyDistance">' + self.getDistance(myLocation, self.extractLocation($(this).text())) + '</div>'));
		});
		t.print();
	},
}	

new iad.AllyDistanceViewer().modifyAllianceView(page);