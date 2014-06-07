scr_meta=<><![CDATA[
// ==UserScript==
// @name           Village Changer and Cellebration Maker
// @namespace      http://userscripts.org/
// @description    Cycle villages and make cellebrations from your keyboard
// @version        2.1
// @include        http://s*.travian.*
// @include        http://www.travian.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==
]]></>.toString();

var AnotherAutoUpdater = { // update script by sizzlemctwizzle THANKS! http://userscripts.org/scripts/show/38017
 
	id: '72210', 
	days: 2, 
	name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
	version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
	time: new Date().getTime(),
	call: function(response) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
			onload: function(xpr) {AnotherAutoUpdater.compare(xpr,response);}
		});
	},
	compare: function(xpr,response) {
		this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
		this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
		if ( (this.xversion) && (this.xname[1] == this.name) ) {
			this.xversion = this.xversion[1].replace(/\./g, '');
			this.xname = this.xname[1];
		} else {
			if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
			GM_setValue('updated_'+this.id, 'off');
			return false;
		}
		if ( (+this.xversion > +this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
			GM_setValue('updated_'+this.id, this.time+'');
			top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
		} else if ( (this.xversion) && (+this.xversion > +this.version) ) {
			if(confirm('Do you want to turn off auto updating for this script?')) {
				GM_setValue('updated_'+this.id, 'off');
				GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated_'+this.id, new Date().getTime()+''); AnotherAutoUpdater.call(true);});
				alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
			} else {
				GM_setValue('updated_'+this.id, this.time+'');
			}
		} else {
			if(response) alert('No updates available for '+this.name);
			GM_setValue('updated_'+this.id, this.time+'');
		}
	},
	check: function() {
		if (GM_getValue('updated_'+this.id, 0) == "off")
			GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true)});
		else {
			if (+this.time > (+GM_getValue('updated_'+this.id, 0) + 1000*60*60*24*this.days)) {
			GM_setValue('updated_'+this.id, this.time+'');
			this.call();
		}
		GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true)});
		}
	}
};

var VillageChanger = {

	init: function() { // checks selected village & total villages
		VillageChanger._totalVillages = $('div#side_info table#vlist tbody tr td:first-child').each(function(index) {
			if ($(this).hasClass('hl')) {
				VillageChanger._currentVillage = index;
				return false;
			} 
		}).length - 1;
                VillageChanger.registerEvents();
	},
	navigateTo: function(url) { // shortcut for window.location
		window.location = url;
	},
	registerEvents: function() { 
		$("form").keypress(function(event){ // prevents keypress from bubbling in forms
			event.stopPropagation();
		});  
		$(document).keypress(function(event) { // main keypress listener
			switch (event.charCode) {
				case 111: // key 'k'
					VillageChanger._currentVillage > 0 ? VillageChanger._currentVillage-- : VillageChanger._currentVillage = VillageChanger._totalVillages ;
					VillageChanger.navigateTo($('div#side_info table#vlist tbody tr td.link:eq(' + VillageChanger._currentVillage + ') a').attr('href'));
					break;
				case 107: // key 'o'
					VillageChanger._currentVillage < VillageChanger._totalVillages ? VillageChanger._currentVillage++ : VillageChanger._currentVillage = 0;
					VillageChanger.navigateTo($('div#side_info table#vlist tbody tr td.link:eq(' + VillageChanger._currentVillage + ') a').attr('href'));		
					break;
				case 113: // key 'w'
					VillageChanger.navigateTo('build.php?gid=24&a=2');
					break;
				case 119: // key 'q'
					VillageChanger.navigateTo('build.php?gid=24&a=1');
					break;
			}
		});
	}
};

$(function(){
	VillageChanger.init();
	AnotherAutoUpdater.check();
}); 