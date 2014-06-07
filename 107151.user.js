// ==UserScript==
// @name           KoC+ UserScript
// @namespace      Saturate
// @description	You can now see some extra stats and browse the battle field by the arrow keys
// @website			http://saturate.dk
// @version			0.1
// @include        http://www.kingsofchaos.com/*
// @exclude        http://www.kingsofchaos.com/login.php
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

// Support Google Chrome
if (typeof jQuery != 'undefined') {
   // console.log("jQuery library is loaded!");
    // Run main
    main();
 }else{
 	console.log("jQuery library is not there! Trying to add it.");
	function addJQuery(callback) {
	  var script = document.createElement("script");
	  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js");
	  script.addEventListener('load', function() {
	    var script = document.createElement("script");
	    script.textContent = "(" + callback.toString() + ")();";
	    document.body.appendChild(script);
	  }, false);
	  document.body.appendChild(script);
	}
	// load jQuery and execute the main function
	addJQuery(main);
 }

// All the magic!
function main() {
	
	
	// Array for holding infomation we get
	var debug = 1;
	var stats = new Array();
	
	if(localStorage.getItem("settings.firstrun") != 'no') {
		console.log('Running script for the frist time...');
		localStorage.setItem("settings.firstrun", 'no');
		// set default values
		localStorage.setItem("settings.highlightGold", '200000');
		localStorage.setItem("settings.autologin", '0');
	}
		
	var settings = new Array();
	settings['user'] = localStorage.getItem("settings.autologin.user");
	settings['pass'] = localStorage.getItem("settings.autologin.pass");
	settings['diableAds'] = localStorage.getItem("settings.disableAds");
	
	
	if( settings['diableAds'] == '1') {
		// Hide Get Firefox, we have firefox already
		$('[href="http://www.spreadfirefox.com/?q=affiliates&id=8415&t=71"]').parent().hide();
		$('.textad').hide();
	}
	
	function currentPage () {
		var sPath = window.location.pathname;
		var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
		//console.log(sPage);
		return sPage;
	}
	
	// Retrive page
	function getData()
	{
		  var result = null;
		  var scriptUrl = "armory.php";
		  $.ajax({
			  url: scriptUrl,
			  type: 'get',
			  dataType: 'html',
			  async: false,
			  success: function(data) {
					result = data;
			  } 
		  });
		  return result;
	}
	
	function getCurrentGold() {
		var pagehtml = $('body').html();
		
		var patt =/Strike Action<\/b><\/td>(\t+|\s+)(:?<td align="right">)([0-9\,])+/gi;
		var s = pagehtml.match(patt);
		s = $.trim(s);
		s = s.replace(/Strike Action<\/b><\/td>(\t+|\s+)<td align="right">/gi, '');
		return s
	
	}
	stats['gold'] = getCurrentGold()
	
	
	// Add some stats to the status box
	function addMilStats() {	
		var militaryStats = '<strong>Military:</strong>' + '<br>Attack: '+ stats['strike'] + '<br>Defence: ' + stats['defence'] + '<br>Spy: ' + stats['spy'] + '<br>Sentry: '+ stats['sentry'];
		$('.menu_cell').append('<table cellspacing="0" cellpadding="0"><tr><td><img src="/images/menubar/skyscraper_top.gif"></td></tr><tr><td class="menu_cell_repeater_vert" style="padding:5px 5px 5px 14px; color:#000; font-size: 8pt;">'+militaryStats+'</td></tr><tr><td><img src="/images/menubar/skyscraper_bottom.gif"></td></tr></table>');
		console.log('Done!');
	}
	
	
	
	if(currentPage() != 'armory3.php' && currentPage() != 'error.php') {
		var data = getData();
		
		// Get Attackt
		var patt =/Strike Action<\/b><\/td>(\t+|\s+)(:?<td align="right">)([0-9\,])+/gi;
		var statStrikeAction = data.match(patt);
		statStrikeAction = $.trim(statStrikeAction);
		stats['strike'] = statStrikeAction.replace(/Strike Action<\/b><\/td>(\t+|\s+)<td align="right">/gi, '');
		
		// Get defence 
		var patt =/Defensive Action<\/b><\/td>(\t+|\s+)(:?<td align="right">)([0-9\,])+/gi;
		var statDefenciveAction = data.match(patt);
		statDefenciveAction = $.trim(statDefenciveAction);
		stats['defence'] = statDefenciveAction.replace(/Defensive Action<\/b><\/td>(\t+|\s+)<td align="right">/gi, '');
		
		// Get Spy 
		var patt =/Spy Rating<\/b><\/td>(\t+|\s+)(:?<td align="right">)([0-9\,])+/gi;
		var statSpyRating = data.match(patt);
		statSpyRating = $.trim(statSpyRating);
		stats['spy'] = statSpyRating.replace(/Spy Rating<\/b><\/td>(\t+|\s+)<td align="right">/gi, '');
		
		// Get Sentry Rating 
		var patt =/Sentry Rating<\/b><\/td>(\t+|\s+)(:?<td align="right">)([0-9\,])+/gi;
		var statSentryRating = data.match(patt);
		statSentryRating = $.trim(statSentryRating);
		stats['sentry'] = statSentryRating.replace(/Sentry Rating<\/b><\/td>(\t+|\s+)<td align="right">/gi, '');
		
		// Add the stats
		addMilStats();
	}
	
	// Browse Battlefield by Arrow Keys
	if(currentPage() == 'battlefield.php') {
		$(document).keydown(function(event) {
			if (event.keyCode == '39') {
				event.preventDefault();
				//nextHref = $('.nav td[align="right"] a').attr('href');
				
				$.get($('.nav td[align="right"] a').attr('href'), function(data){
					$('table.battlefield tr:first').nextAll().remove()
					$('table.battlefield tr:first').after(data)
					highlightBattleGold();
					battlefield_players();
					battlefield_nav();
				})
				
			}
			if (event.keyCode == '37') {
				event.preventDefault();
				//prevHref = $('.nav td:first a').attr('href');
				
				$.get($('.nav td:first a').attr('href'), function(data){
					$('table.battlefield tr:first').nextAll().remove();
					$('table.battlefield tr:first').after(data);
					highlightBattleGold();
					battlefield_players();
					battlefield_nav();
					
				})
			}
		});
		highlightBattleGold()
		
		$('.battlefield *').bind('ready', function(){
			console.log('Why you press buttons?!');
			highlightBattleGold()
		})
		
		
		// Vary bad hack for when the user clicks the links
		$('table.battlefield tr.nav a').click(function(){
			t = setInterval(highlightBattleGold,500);
		})
		
		
	}
	
	// suspense battle "animation"
	if(currentPage() == 'detail.php') {
		currentUrl = location.href;
		regex = /suspense=1/gi;
		
		if(regex.test(currentUrl)) {
			newlocation = location.href.replace("suspense=1", "suspense=0")
			location.replace(newlocation);		
		}
		
		$("table.battle tr:last td > *").show();
	}
	
	
	$(document).ready(function() {
		
		
		if(localStorage.getItem('settings.autologin') == '1') {
			
			if($('.login_input[type="submit"]').length == 1) {
				$.post("login.php", { peeword: settings['pass'], usrname: settings['user'] } );
				window.location.reload()
			}
			
			if(currentPage() == 'error.php') {
				console.log('Err: try to login again!');
				$.post("login.php", { peeword: settings['pass'], usrname: settings['user'] } );
				history.back(-1);
			}
		}
			
				
		var styles = 
			['<style>',
			 '#kocSettings {position:absolute; text-decoration:underline; top:10px; left:10px;}',
			 '#kocDialog {position:absolute; background: #003300; border:1px solid #008800; display:none; width:300px; font-size: 10px; padding:10px; top:40px; left:10px;}',
			 '#saveSettings {position:absolute; right:5px; bottom:5px;}',
			 '.highlightGold td:nth-child(6) {font-weight: 700; color:#d6e03d;}',
			 '</style>'
			].join('\n');

		function isChecked(name) {
			if(localStorage.getItem(name) == '1') {
				return 'checked';
			}
		}
		
		var dialog = 
			['<div id="kocDialog">',
				'Hide Ads: <input id="kocSetting1" type="checkbox" ' + isChecked('settings.disableAds') + ' /><br>',
				'Autologin: <input id="kocSetting2" type="checkbox" ' + isChecked('settings.autologin') + ' /><br>',
				'Username: <input id="kocSetting3" type="text" value="' + localStorage.getItem("settings.autologin.user") + '"><br>',
				'Password: <input id="kocSetting4" type="password" value="' + localStorage.getItem("settings.autologin.pass") + '"><br>',
				'HighGold Val: <input id="kocSetting5" type="text" value="' + localStorage.getItem("settings.highlightGold") + '"><br>',
				'<button id="saveSettings">Save</button>',
			 '</div>'
			].join('\n');
			
		// Make the settings dialog and link
		$('body').prepend(styles);
		$('script[type="text/javascript"]').append('window.battlefield_nav = "0";$(document).ready(function() {$("table.battlefield tr.nav a").unbind("click");console.log("Unbind")}');
		$('body').prepend('<a id="kocSettings" href="#">Script Settings</a>');
		$('body').prepend(dialog)
		$('#kocSettings').click(function() {
			$('#kocDialog').toggle();
			return false;
		});
		$('#saveSettings').click(function() {saveSettings()});
		
		function saveSettings() {
			
			// Ads
			if($('#kocSetting1').attr('checked') == 'checked') { temp = '1' } else { temp = '0' }
			localStorage.setItem("settings.disableAds", temp);
			console.log(temp);
			
			// Auto login
			if($('#kocSetting2').attr('checked') == 'checked') { temp = '1' } else { temp = '0' }
			localStorage.setItem("settings.autologin", temp);
			console.log(temp);
			
			temp = $('#kocSetting3').val();
			localStorage.setItem("settings.autologin.user", temp);
			console.log(temp);
			
			temp = $('#kocSetting4').val();
			localStorage.setItem("settings.autologin.pass", temp);
			console.log(temp);
			
			// Highlight Gold amount
			temp = $('#kocSetting5').val();
			localStorage.setItem("settings.highlightGold", temp);
			console.log(temp);
			
			$('#kocDialog').hide();
			window.location.reload()
					
		}
		
	});
	
	// Highlight Gold
	function highlightBattleGold() {
		$('.table_lines.battlefield .player').each(function(index) {
			playerGold = $('td:eq(5)', this).text();
			playerGold = playerGold.replace("???", "");
			playerGold = playerGold.replace(" Gold", "");
			playerGold = playerGold.replace(/,/gi, "");
			playerGold = parseInt(playerGold);
			console.log(index+': '+playerGold);
			if(playerGold > localStorage.getItem("settings.highlightGold")) {
				$(this).addClass('highlightGold');
			}
		});
	}
	
}