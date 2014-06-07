// ==UserScript==
// @name          Ikariam Şehir İsim Uzunlukları
// @version       1.1c
// @copyright     2009, Yoshi Toranaga
// @license       GPL v3
// @namespace     ikariam/catindicator
// @description   İkariamda şehir isimleri uzun olunca gözükmüyor yaaa işte tam bu onun için bir eklenti isimleri tam olarak göstermenize yarıyor...
// @include       http://s*.ikariam.*/index.php
// @include       http://s*.ikariam.*/index.php*view=island*
// @include       http://s*.ikariam.*/index.php*view=diplomacyAdvisor*&watch=4*
// @include       http://s*.ikariam.*/index.php*view=diplomacyAdvisorAlly*
// @include       http://s*.ikariam.*/index.php*view=museum*
// @include       http://s*.ikariam.*/index.php*view=embassy*
// @exclude       http://support*.ikariam.*/*
// @require       http://ikariamscriptresources.googlecode.com/svn/tags/Latest/AutoUpdater.js 
// @require       http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==


/*
   Thanks to Martynius && BagBag for suggestions and improvements
*/

var page = $("body").attr("id");
if (page != "museum" && page != "island" && page != "diplomacyAdvisorAlly" && page != "embassy") {
	return;
}

new IkariamUserScriptUpdater( 50376, "Ikariam CAT Indicator" );

var icti = new Object();

icti.Timer = function(name) {
	this.name = name;
	this.start = new Date().getTime();
}

icti.Timer.prototype = {
	print: function(mark) {
		GM_log( this.name + (mark?'.'+mark:'') + ": " + (new Date().getTime() - this.start) + "ms" );
	}
}

icti.CatIndicator = function(page) {
	this.MARKER = '<img src="skin/museum/icon32_culturalgood.gif" width="16" height="16" />';
	this.pattern = /.*receiverId=([0-9]*).*/;
}

icti.CatIndicator.prototype = {

	readTreatyPartners: function() {
		var partners = {};
		var part = GM_getValue("Partners" + top.location.host);
		if (part) {
			var parts = part.split(",");
			for each (var p in parts) {
				partners[p] = 1;
			}
		}
		return partners;
	},

	writeTreatyPartners: function() {
		var t = new icti.Timer('writePartners');
		var self = this;
		var partners = [];
		$("#mainview .contentBox01h:last").each( function() {
			$("table tbody tr td.actions a.writeMsg", this).each(function() {
				partners.push( $(this).attr('href').replace(/.*receiverId=([0-9]*).*/, "$1") );
			});
		});
		GM_setValue("Partners" + top.location.host, partners.join(','));
		t.print();
	},
	
	fixLongTownName: function(node) {
		var linkNode = $("a:first", node);
		if (linkNode.text().match(/\(.\)/) === null) {
			linkNode.html(
					'<span class="textLabel"><span class="before"/>' + 
					$.trim(($(".cityinfo .name:first", node).html()).replace(/<span.*?span>/g, "").replace(/<.*?>/g, "")) +
					'<span class="after"/></span>');
		}
	},
	
	getId: function(node) {
		var result = "";
		var source = "" + node.attr('href');
		if (source.length) {
			result = source.replace(this.pattern, "$1");
		}
		return result;
	},
	
	insertMarkerAfter: function(node) {
		node.after(this.MARKER);
	},

	modifyIslandView: function() {
		var t = new icti.Timer('islandView');
		var self = this;
		var partners = self.readTreatyPartners();
		t.print('afterRead');
	
		$("#cities > li[class*=level]").each(function() {
			
			self.fixLongTownName(this);

			var ownerId = self.getId($(".cityinfo .owner a.messageSend", this));
			if (partners[ownerId] == 1) {
				self.insertMarkerAfter($("a .textLabel .before", this));
			}
		});
		t.print('end');
	},
	
	modifyAllianceView: function(page) {
		var t = new icti.Timer('allianceView');
		var self = this;
		var partners = self.readTreatyPartners();
		t.print('afterRead');

		$("table#memberList").each( function() {
			$("thead > tr", this).each( function() {
				$("th:first", this).after('<th class="catHdr">CT</th>');
			});
			
			$("tbody > tr", this).each(function() {
				var cellNode = $("td:first", this);
				var cellHTML = "";
				var num = 0;
				
				var allyId = self.getId($("td.action > div > " + (page == "embassy" ? "div > " : "") + "a.message", this));
				if (partners[allyId] == 1) {
					cellHTML = self.MARKER;
					num = 1;
				}
				
				cellNode.after('<td><span style="display:none;">' + num + '</span>' + cellHTML + '</td>');
			});
		});
		t.print('end');
	},
}	

var runner = new icti.CatIndicator();
switch(page) {
case "museum":
	runner.writeTreatyPartners();
	break;
case "island":
	runner.modifyIslandView();
	break;
case "diplomacyAdvisorAlly":
case "embassy":
	runner.modifyAllianceView(page);
	break;		
}