// ==UserScript==
// @name			Barn Buddy Auto Add
// @namespace		http://www.barnbuddyautoadd.tk
// @description		By Ashmotif200
// @include			http://apps.facebook.com/barnbuddy/leaderboard.php
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version			1.1
// ==/UserScript==

const currentVersion = '1.1';

var BB = {
	strangers : null,
	
	index : 0,
	
	init : function() {
		BB.addButtons();
	},
	
	addButtons : function() {
		$('<div><input type="button" value="Auto Add Neighbor" id="bbAutoAdd" /> <a target="_blank" href="http://facebook.com/redphx">Add me</a></div><div id="bbLogs"></div>').insertBefore('#app60884004973_page_h');
		$('#bbAutoAdd').click(function() {
			$('#bbAutoAdd').attr('disabled','disabled');
			$('#bbLogs').html('<h2>ADDED :</h2>');
			BB.start();
		});
	},
	
	start : function() {
		BB.findStrangers();
		
		if (BB.strangers != null) {
			BB.addNeighbor();
		}
		
		
	},
	
	findStrangers : function() {
		BB.strangers = $('#app60884004973_ltable tr:has("td form")').find('td:eq(1) a:eq(1)');
	},
	
	parseID : function(href) {
		return href.match('id=([0-9]+)')[1];
	},
	
	updateLog : function(type) {
		var parent = BB.strangers.eq(BB.index).parent().parent();
		switch (type) {
			case 'adding':
				$('#bbAutoAdd').val('Adding '+ (BB.index+1) + '/' + BB.strangers.length);
				parent.find('td:eq(4)').html('<h3>adding ...</h3>');
				break;
			case 'added':
				$('<div>' + BB.strangers.eq(BB.index).html() + '</div>').appendTo('#bbLogs');
				
				parent.find('td:eq(4)').html('<h3>ADDED !!!</h3>');
				
				
				break;
		}
	},
	
	addNeighbor : function() {
		if (BB.index > BB.strangers.length - 1) {
			alert('DONE brought to you by Ashmotif200');
			return;
		}
		
		var uID = BB.parseID(BB.strangers.eq(BB.index).attr('href'));
		var url = 'http://apps.facebook.com/barnbuddy/farm.php?src=nab_b_add&r='+ uID +'&inv_type=9';
		
		BB.updateLog('adding');
		
		GM_xmlhttpRequest(
		{
			method:"GET", 
			url: url, 
			onload : function(responseDetails)
			{
				BB.updateLog('added');
				
				++BB.index;
				BB.addNeighbor();
			},
			onerror : function(responseDetails)
			{
				BB.addNeighbor();
			}
		});
	}
}

$(function() {
	BB.init();
});