// ==UserScript==
// @name		mlbtvtimeconvert
// @description		mlb.tv: converts EasternTime to MEZ/ESZ (scoreboard, schedule and mlb.tv)
// @author		Sven Kalkbrenner
// @email		gm@sven.kalkbrenner.de
// @require		http://code.jquery.com/jquery-1.7.2.min.js
// @namespace		http://gm.svenkalkbrenner.de/mlbtvtimeconvert.js
// @updateURL		http://gm.svenkalkbrenner.de/mlbtvtimeconvert.js
// @include		http://mlb.mlb.com/mediacenter/*
// @include		http://mlb.mlb.com/mlb/scoreboard/*
// @include		http://mlb.mlb.com/mlb/schedule/*
// @include		http://*.mlb.com/schedule/*
// @version		1.4
// @history		1.4	07.05.2012: bugfixing
// @history		1.3	05.05.2012: add converting schedule
// @history		1.2	05.04.2012: now converting scoreboard
// @history		1.1	05.04.2012: fixing errors in metadata
// @history		1.0	05.04.2012: use jquery for converting
// @history		0.1	04.04.2012: first version
// ==/UserScript==

var mlb={
	convertTime:function(dom,lf) {
		$(dom).each(function() {
			var now = new Date();
			// get EasternTime
			et=$(this).html();

			et=et.replace('<!-- BEGIN: status -->','');
			et=et.replace('<!-- END: status -->','');
			et=$.trim(et);

			// change columnname
			if(et.indexOf('Time') > -1) {
				now.getTimezoneOffset() == -120 ? et='MESZ' : et='MEZ';
				$(this).html('<div style="font-size:90%">' + et + ' (ET)</div>');
			}

			// convert EasternTime to MEZ
			if( (et.indexOf('pm') > -1 || et.indexOf('PM') > -1 || et.indexOf('AM') > -1 || et.indexOf('am') > -1) && et.indexOf('Uhr') == -1) {
				now.getTimezoneOffset() == -120 ? timezone=6 : timezone=5;
				et.indexOf('PM') > -1 || et.indexOf('pm') > -1 ? hour=12 : hour=0;
				hour += parseInt(et.substr(0,et.indexOf(':'))) + timezone;
				minutes = et.substr(et.indexOf(':')+1,2);
				if (hour >= 24) hour -= 24;
				lf == true ? br='<br>' : br=' ';
				$(this).html('<span style="font-weight:bold;">' + hour + ':' + minutes + ' Uhr</span>' + br + '<span style="font-size:70%;">(' + et + ')</span>');
			}
		});
	}	
}


window.setInterval(
	function() {
		// mlb.tv (watch/listen, list view)
		mlb.convertTime('.mediagrid-info-time',true);
		// mlb-tv (watch/listen, expanded view)
		mlb.convertTime('.mediagrid-expanded-time',false);

		// Scoreboard (detailed view)
		mlb.convertTime('.summary.before',false);
		// Scroreboard (compact view)
		mlb.convertTime('.status.before',true);

		// Schedule (today)
		mlb.convertTime('[title="Game Preview"]',true);
		// Schedule (next 3 days)
		mlb.convertTime('.time_result',true);
		// Schedule (Team-by-Team, Regular Season Schedule)
		mlb.convertTime('.game-statusS',false);
	},500
);
