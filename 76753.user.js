scr_meta=<><![CDATA[
// ==UserScript==
// @name           AUTO NPC
// @namespace      http://userscripts.org/
// @description    auto npc during the nigth
// @version        0.4.1
// @include        http://s*.travian.*
// @include        http://www.travian.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==
]]></>.toString();


// change village url here
const villageToCheck = 'http://speed.travian.pt/dorf2.php?newdid=144489';

const cssStyle = "#infonpc { padding: 4px; position: absolute; top: 0px; left: 0px; background-color: white; font-weight: bold; width: auto; }";


var AnotherAutoUpdater = { // update script by sizzlemctwizzle THANKS! http://userscripts.org/scripts/show/38017
 
	id: '76753', 
	days: 1, 
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
		if ((this.xversion) && (this.xname[1] == this.name)) {
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


function npcSubmit() {
	$("table#npc tbody tr td.sel:nth-child(4) input[name*='m2']").val('0');
	GM_deleteValue('autonpc');
	unsafeWindow.portionOut();
//	unsafeWindow.document.snd.submit();
}


function makeNPC() {
	if (typeof GM_getValue('autonpc') == 'undefined') {
		GM_setValue('autonpc','running');
		window.location.href = 'http://speed.travian.pt/build.php?gid=17&t=3';
	} 
}

	
function checkIfIsFull() {
	var recursos = [];
	var $cereal, cereal, producao, timeToFillWorked, data, millisecondsOfNext, dataOfNext, timeToFill;
	
	$('#infonpc').text('Checking...');
	$.get(villageToCheck, function (response) {
		$cereal = $(response).find('#l1');
		cereal = $cereal.text();
		if ((!cereal) && ($(response).find('#login_form'))) { 
			if ($('#login_form')) {
				unsafeWindow.document.snd.submit();
			} else {
				window.location.href = villageToCheck;
			}
		}
		recursos = cereal.split('/');
		if (typeof otherTimer == 'undefined') { 
			producao = $cereal.attr('title');
			timeToFill = parseInt(((recursos[1] - recursos[0]) / producao) *60*60*1000);
			if (timeToFill < 300000) {
				timeToFillWorked = timeToFill + 60000;
				otherTimer = setTimeout(checkIfIsFull,timeToFillWorked);
			} else { 
				timeToFillWorked = parseInt(timeToFill / 3);
				otherTimer = setTimeout(checkIfIsFull,timeToFillWorked);
			}
			data = new Date().getTime();              // BUGGY
			millisecondsOfNext = data + timeToFillWorked;
			dataOfNext = new Date(millisecondsOfNext);
		}
		if (recursos[0] == recursos[1]) { 
			$('#infonpc').text('FULL - Calling NPC...');
			makeNPC();
		} else {
			$('#infonpc').text('Not full - Next Check : ' + dataOfNext.toLocaleString());
		}
	});
}


$(function() {
	AnotherAutoUpdater.check();
	GM_addStyle(cssStyle);
	$('<div id="infonpc></div>').appendTo('body');
	if (typeof GM_getValue('autonpc') != 'undefined') {
		npcSubmit();
	} else {
		checkIfIsFull();
	}
});

$(window).unload(function () { 
	if (typeof otherTimer != 'undefined') {
		clearTimeout(otherTimer);
	}		
});