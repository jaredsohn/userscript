// ==UserScript==
// @name        TrainToGoogleCalendar
// @namespace   plop
// @include     http://www.voyages-sncf.com/billet-train/horaires/resultats*
// @description  Add schedule from results of SNCF train search to google calendar
// @version     1.5
// @require	  	http://code.jquery.com/jquery-1.9.0.min.js
// ==/UserScript==

$('#block-schedule-results .digital-box:has(div.entete-bloc-train)').each(function () {
	var el = $(this);
	var res = (/(Lundi|Mardi|Mercredi|Jeudi|Vendredi|Samedi|Dimanche)&nbsp;(\d{2})\/(\d{2})/g).exec(el.find('.entete-bloc-train .day-info').html());
	var duration = el.find('.duration .duration_time').html();
	var startDate = new Date();
	var endDate = new Date();
	
	var dTravelEnd = el.find('.direct .segment-depart, .via-simple .segment-arrivee, .via-multiples .segment-arrivee');

	console.info(dTravelEnd);
	var arrStartHour = (/([0-9]{1,2})h([0-9]{1,2})/g).exec(el.find('.segment-depart .departure .hour p:nth-child(2)').html());
	var arrEndHour = (/([0-9]{1,2})h([0-9]{1,2})/g).exec(dTravelEnd.find('.arrival .hour p:nth-child(2)').html());
	startDate.setMonth(res[3] - 1);
	startDate.setDate(res[2]);
	endDate.setMonth(res[3] - 1);
	endDate.setDate(res[2]);
	startDate.setHours(arrStartHour[1]);
	startDate.setMinutes(arrStartHour[2]);
	endDate.setHours(arrEndHour[1]);
	endDate.setMinutes(arrEndHour[2]);

	var startStr = startDate.toISOString().replace(/([- \:]|\.[0-9]{3})/g, '');
	var endStr   = endDate.toISOString().replace(/([- \:]|\.[0-9]{3})/g, '');
	el.append($('<button>').on('click', function () {
		var param = {
			text: 'Train '+el.find('.departure .station p:nth-child(2)').html()+" -> "+dTravelEnd.find('.arrival .station p:nth-child(2)').html(),
			dates: startStr+'/'+endStr,
			details: 'To Complete ...',
			location:el.find('.departure .station p:nth-child(2)').html(),
			trp:'false',
			sprop:'name:http%3A%2F%2Fwww.voyages-sncf.com'
		};
		var strParam = '';
		for (var p in param) {
	        if (param.hasOwnProperty(p)) {
	            strParam += '&'+p+'='+param[p];
	        }
	    }
		window.open('https://www.google.com/calendar/render?action=TEMPLATE'+strParam, 'cal', 'status=no', false);
	})
	  .append($('<img>').attr({ 'src':'http://upload.wikimedia.org/wikipedia/commons/e/e9/Google_Calendar.png' }).css('height', '30px'))
	  .append($('<img>').attr({ 'src': 'http://upload.wikimedia.org/wikipedia/commons/0/06/Farm-Fresh_add.png' }).css('height', '30px'))
  	);
});
