// ==UserScript==
// @name           Donatert (english version)
// @version        1.1
// @author         Teckna
// @description    Hi, here you have a free donation code | Set game language as english and it should work on every version
// @include        http://*barafranca.*/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js
// ==/UserScript==

// Get version (thanks kredu)
var url = location.href + ''
if (url.match('dm.barafranca')) { var version = 'dm'; }
else if (url.match('deathmatch.barafranca')) { var version = 'dm'; }
else if (url.match('.barafranca.com.pt')) { var version = 'pt'; }
else if (url.match('.barafranca.com.br')) { var version = 'br'; }
else if (url.match('.barafranca.com')) { var version = 'com'; }
else if (url.match('.barafranca.nl')) { var version = 'nl'; }
else if (url.match('.barafranca.de')) { var version = 'de'; }
else if (url.match('.barafranca.gen.tr')) { var version = 'tr'; }
else if (url.match('.barafranca.fr')) { var version = 'fr'; }
else if (url.match('.barafranca.no')) { var version = 'nd'; }
else { var version = 'wth'; }

if (window.location.pathname == "/mid.php") {
	// Refresh the page @ 90 secs
	timedRefresh(90000);
	
	// check if acc already has dc+
	var data = document.getElementsByTagName('html')[0].innerHTML
	if (data.indexOf('nowrap="nowrap"') == -1) {
		// collect position & points info
		if (data.indexOf('<b>P</b>osition:') != -1) {
			var pos = data.indexOf('<b>P</b>osition:');
			var pos1 = data.indexOf('<td align="right" valign="bottom">',pos)+34;
			var pos2 = data.indexOf('</td>',pos1);
			GM_setValue(version+'positie',data.substring(pos1,pos2));
		}
		if (data.indexOf('<b>P</b>oints:') != -1) {
			var pos = data.indexOf('<b>P</b>oints:');
			var pos1 = data.indexOf('<td align="right" valign="top">',pos)+31;
			var pos2 = data.indexOf('</td>',pos1);
			GM_setValue(version+'punten',data.substring(pos1,pos2));
		}
		
		// collect general info
		$.get('/information.php', function(b) {
			if (b.indexOf('You reached your click limit.')==-1) {
				// waiting for cars
				var cars_tot = 0;
				var cars_min = 0;
				var cars_sec = 0;
				if (b.indexOf('<span id="counter_nca_minutes_value">') != -1) {
					var pos1 = b.indexOf('<span id="counter_nca_minutes_value">')+37;
					var pos2 = b.indexOf('</span>',pos1);
					var cars_min = parseInt(b.substring(pos1,pos2));
				}
				if (b.indexOf('<span id="counter_nca_seconds_value">') != -1) {
					var pos1 = b.indexOf('<span id="counter_nca_seconds_value">')+37;
					var pos2 = b.indexOf('</span>',pos1);
					var cars_sec = parseInt(b.substring(pos1,pos2));
				}
				var cars_tot = (cars_min * 60) + cars_sec;
				
				// waiting for crime
				var crime_tot = 0;
				var crime_min = 0;
				var crime_sec = 0;
				if (b.indexOf('<span id="counter_nc_minutes_value">') != -1) {
					var pos1 = b.indexOf('<span id="counter_nc_minutes_value">')+36;
					var pos2 = b.indexOf('</span>',pos1);
					var crime_min = parseInt(b.substring(pos1,pos2));
				}
				if (b.indexOf('<span id="counter_nc_seconds_value">') != -1) {
					var pos1 = b.indexOf('<span id="counter_nc_seconds_value">')+36;
					var pos2 = b.indexOf('</span>',pos1);
					var crime_sec = parseInt(b.substring(pos1,pos2));
				}
				var crime_tot = (crime_min * 60) + crime_sec;
				
				// waiting for next flight
				var flight_tot = 0;
				var flight_hou = 0;
				var flight_min = 0;
				var flight_sec = 0;
				if (b.indexOf('<span id="counter_nf_hours_value">') != -1) {
					var pos1 = b.indexOf('<span id="counter_nf_hours_value">')+34;
					var pos2 = b.indexOf('</span>',pos1);
					var flight_hou = parseInt(b.substring(pos1,pos2));
				}
				if (b.indexOf('<span id="counter_nf_minutes_value">') != -1) {
					var pos1 = b.indexOf('<span id="counter_nf_minutes_value">')+36;
					var pos2 = b.indexOf('</span>',pos1);
					var flight_min = parseInt(b.substring(pos1,pos2));
				}
				if (b.indexOf('<span id="counter_nf_seconds_value">') != -1) {
					var pos1 = b.indexOf('<span id="counter_nf_seconds_value">')+36;
					var pos2 = b.indexOf('</span>',pos1);
					var flight_sec = parseInt(b.substring(pos1,pos2));
				}
				var flight_tot = (flight_hou * 3600) + (flight_min * 60) + flight_sec;
				
				// waiting for bullets
				var bullet_tot = 0;
				var bullet_min = 0;
				var bullet_sec = 0;
				if (b.indexOf('<span id="counter_nbd_minutes_value">') != -1) {
					var pos1 = b.indexOf('<span id="counter_nbd_minutes_value">')+37;
					var pos2 = b.indexOf('</span>',pos1);
					var bullet_min = parseInt(b.substring(pos1,pos2));
				}
				if (b.indexOf('<span id="counter_nbd_seconds_value">') != -1) {
					var pos1 = b.indexOf('<span id="counter_nbd_seconds_value">')+37;
					var pos2 = b.indexOf('</span>',pos1);
					var bullet_sec = parseInt(b.substring(pos1,pos2));
				}
				var bullet_tot = (bullet_min * 60) + bullet_sec;
				
				// money
				if (b.indexOf('Cash') != -1) {
					var pos = b.indexOf('Cash');
					var pos1 = b.indexOf('<td>',pos)+4;
					var pos2 = b.indexOf('</td>',pos1);
					GM_setValue(version+'geld',b.substring(pos1,pos2).replace("$ ","$"));
				}
				
				// bullets
				if (b.indexOf('<b>Bullets</b>') != -1) {
					var pos = b.indexOf('<b>Bullets</b>');
					var pos1 = b.indexOf('<td>',pos)+4;
					var pos2 = b.indexOf('</td>',pos1);
					GM_setValue(version+'kogels',b.substring(pos1,pos2));
				}
				
				// rank progress
				if (b.indexOf('Rank progress') != -1) {
					var posbegin = b.indexOf('Rank progress');
					var poseinde = b.indexOf('Health');
					var temp_rv = b.substring(posbegin,poseinde);
					if (temp_rv.indexOf("<span style='color:black;'>") != -1) {
						var pos1 = temp_rv.indexOf("<span style='color:black;'>")+27;
						var pos2 = temp_rv.indexOf("</span>",pos1)
						GM_setValue(version+'rv',temp_rv.substring(pos1,pos2));
					}
					else { GM_setValue(version+'rv',"0%"); }
				}
				
				// health / life
				if (b.indexOf('Health') != -1) {
					var posbegin = b.indexOf('Health');
					var poseinde = b.indexOf('Jailbusting Skill');
					var temp_life = b.substring(posbegin,poseinde);
					if (temp_life.indexOf("<span style='color:black;'>") != -1) {
						var pos1 = temp_life.indexOf("<span style='color:black;'>")+27;
						var pos2 = temp_life.indexOf("</span>",pos1)
						GM_setValue(version+'life',temp_life.substring(pos1,pos2));
					}
					else { GM_setValue(version+'life',"0%"); }
				}
				
				// Jailbusting Skill 
				if (b.indexOf('Jailbusting Skill') != -1) {
					var posbegin = b.indexOf('Jailbusting Skill');
					var poseinde = b.indexOf('Race form');
					var temp_bust = b.substring(posbegin,poseinde);
					if (temp_bust.indexOf("<span style='color:black;'>") != -1) {
						var pos1 = temp_bust.indexOf("<span style='color:black;'>")+27;
						var pos2 = temp_bust.indexOf("</span>",pos1)
						GM_setValue(version+'bust',temp_bust.substring(pos1,pos2));
					}
					else { GM_setValue(version+'bust',"0%"); }
				}
				
				//collect bodyguard info
				$.get('/BeO/webroot/index.php?module=Bodyguards', function(b) {
					if (b.indexOf('You reached your click limit.')==-1) {
						if (b.indexOf('You are in jail')==-1){
							
							var allbgs = 0;
							if (b.indexOf('Level') != -1) {
								var pos = b.indexOf('Level');
								var bgs = true;
								
								while (bgs) {
									var pos1 = b.indexOf('Level',pos)+5;
									var pos2 = b.indexOf(' </h2>',pos1);
									var level = parseInt(b.substring(pos1,pos2));
									allbgs += level;
									
									if (b.indexOf('Level',pos2) == -1) { bgs = false; }
									else { var pos = b.indexOf('Level',pos2); }
								}
							}
							GM_setValue(version+'bg_rv',(parseInt(allbgs) / 50) * 100);
							
							// call function
							show(cars_tot,crime_tot,flight_tot,bullet_tot);
						}
						else {
							//jail @ bodyguards page
							show(cars_tot,crime_tot,flight_tot,bullet_tot);
						}
					}
					else {
						//click limit @ bodyguards page
						show(cars_tot,crime_tot,flight_tot,bullet_tot);
					}
				});
			}
			else {
				//click limit @ my acc page
				show(0,0,0,0);
			}
		});
	}
}
function show(cars_tot,crime_tot,flight_tot,bullet_tot) {
	// show collected data
	$("table:last").html(' \
		<table> \
			<tbody> \
				<tr> \
					<td align="left" class="name" valign="top" nowrap="nowrap"><b>P</b>osition:</td> \
					<td nowrap="nowrap" align="right">'+GM_getValue(version+'positie','#10000+')+'</td> \
					<td nowrap="nowrap" align="left" class="name"><a href="./BeO/webroot/index.php?module=Crimes" target="main"><b>C</b>rime:</a></td> \
					<td nowrap="nowrap" align="right" id="crime" width="40">&nbsp;</td> \
					<td nowrap="nowrap" align="left" class="name"><b>R</b>ank progress:</td> \
					<td nowrap="nowrap" align="right"><dl class="progress"><dd><span style="width: '+GM_getValue(version+'rv',"0%")+';">&nbsp;</span></dd><dt>'+GM_getValue(version+'rv',"0%")+'</dt></dl></td> \
				</tr> \
				<tr> \
					<td nowrap="nowrap" align="left" class="name"><b>P</b>oints:</td> \
					<td nowrap="nowrap" align="right">'+GM_getValue(version+'punten',"0")+'</td> \
					<td nowrap="nowrap" align="left" class="name"><a href="./BeO/webroot/index.php?module=Cars" target="main"><b>C</b>ars:</a></td> \
					<td nowrap="nowrap" align="right" id="car" width="40">&nbsp;</td> \
					<td nowrap="nowrap" align="left" class="name"><b>L</b>ife:</td> \
					<td nowrap="nowrap" align="right"><dl class="progress"><dd><span style="width: '+GM_getValue(version+'life',"0%")+';">&nbsp;</span></dd><dt>'+GM_getValue(version+'life',"0%")+'</dt></dl></td> \
				</tr> \
				<tr> \
					<td nowrap="nowrap" align="left" class="name"><b>C</b>ash:</td> \
					<td nowrap="nowrap" align="right"><a href="./bank.php" target="main">'+GM_getValue(version+'geld',"$0")+'</a></td> \
					<td nowrap="nowrap" align="left" class="name"><a href="./BeO/webroot/index.php?module=Travel" target="main"><b>T</b>ravel:</a></td> \
					<td nowrap="nowrap" align="right" id="flight" width="40">&nbsp;</td> \
					<td nowrap="nowrap" align="left" class="name"><b>B</b>usting skills:</td> \
					<td nowrap="nowrap" align="right"><dl class="progress"><dd><span style="width: '+GM_getValue(version+'bust',"0%")+';">&nbsp;</span></dd><dt>'+GM_getValue(version+'bust',"0%")+'</dt></dl></td> \
				</tr> \
				<tr> \
					<td nowrap="nowrap" align="left" class="name"><b>B</b>ullets:</td> \
					<td nowrap="nowrap" align="right">'+GM_getValue(version+'kogels',"0")+'</td> \
					<td nowrap="nowrap" align="left" class="name"><a href="./bullets2.php" target="main"><b>B</b>ullet Deal:</a></td> \
					<td nowrap="nowrap" align="right" id="bullet" width="40">&nbsp;</td> \
					<td nowrap="nowrap" align="left" class="name"><b>B</b>odyguards:</td> \
					<td nowrap="nowrap" align="right"><dl class="progress"><dd><span style="width: '+GM_getValue(version+'bg_rv',"0%")+'%;">&nbsp;</span></dd><dt>'+GM_getValue(version+'bg_rv',"0%")+'%</dt></dl></td> \
				</tr> \
			</tbody> \
		</table> \
		<script type="text/javascript"> \
			var timers = {crime: '+crime_tot+', car: '+cars_tot+', flight: '+flight_tot+', bullet: '+bullet_tot+'}; \
			var interval = window.setInterval(function() { updateTimers(); }, 1000); \
			function updateTimers() { \
				for(var timer in timers) { \
					if(timers[timer] < 0) continue; \
					if(timers[timer] == 0) { \
						document.getElementById(timer).innerHTML = "Nu"; \
						continue; \
					} \
					timers[timer]--; \
					document.getElementById(timer).innerHTML = timers[timer] + "Sec."; \
				} \
			} \
		</script>');
}
function timedRefresh(timeoutPeriod) { setTimeout("location.reload(true);",timeoutPeriod); }