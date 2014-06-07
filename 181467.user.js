// ==UserScript==
// @name            Lag test
// @author          Patricier
// @version         1.2
// @description     Test de lag die je hebt op de millisec nauwkeurig.
// @include		   	*.tribalwars.nl/game.php*screen=place*
// @grant			none
// ==/UserScript==
(function (f) {
    var d = document,
        s = d.createElement('script');
    s.textContent = '$(document).ready(' + f.toString() + ')';
    (d.body || d.head || d.documentElement).appendChild(s);
})(function () {
	var lagTest = JSON.parse(localStorage.getItem('lagTest'));
	if (lagTest==null) {
		lagTest = {on:false,lastVil:'',lastLag:[]};
	}
	function update() {
		localStorage.setItem('lagTest',JSON.stringify(lagTest));
		return false;
	}
	function timeCheck() {
		var travelSec = parseInt((typeof $('#content_value table.vis:first tr:eq(2) td:last').text().split(':')[2]=='undefined')?$('#content_value table.vis:first tr:eq(3) td:last').text().split(':')[2]:$('#content_value table.vis:first tr:eq(2) td:last').text().split(':')[2]);
		var sendSec = (travelSec==0)?0:60-travelSec;
        
		if(parseInt($('#serverTime').text().split(':')[2]) == sendSec) $('#troop_confirm_go').click();
	}
	function showScreen() {
		cleanLags();
		var screen = "<div id='lagTestScreen' style='background-color:#ecd6ad;border:2px solid #7d510f;z-index:5;top:130px;left:35%;position:absolute;width:600px; overflow-y: auto;border-radius:7px;box-shadow:0 0 25px 5px #000000;'><div style='text-align: right;padding-right: 4px;padding-top: 2px;'><a href='javascript: $(\"#lagTestScreen\").remove();void 0;'>Sluiten</a></div><div id='content_screen' style='padding: 5px;'></div>";
		$('body').append(screen);
		var html = "<h3>Lag test resultaten</h3> Hieronder staan de resultaten van het afgelopen uur.";
		html += "<table class='vis' style='width: 100%'><tbody><tr><th><img src='http://cdn2.tribalwars.net/8.16/18844/graphic/delete_small.png?1d004'/></th><th>Tijd</th><th>Lag</th><th>Verhouding (% boven/onder gemiddeld)</th></tr>";
		
		var sum = 0;
		$.each(lagTest.lastLag, function(i) {
			sum+=lagTest.lastLag[i]['lag'];
		});
		$.each(lagTest.lastLag,function(i) {
			var p = (lagTest.lastLag.length>1)?Math.round((lagTest.lastLag[i]['lag']/((sum-lagTest.lastLag[i]['lag'])/(lagTest.lastLag.length-1))) * 100 - 100):0;
			date = new Date(lagTest.lastLag[i]['time']);
			var t = ((date.getHours()<10)?'0'+date.getHours():date.getHours()) +':'+((date.getMinutes()<10)?'0'+date.getMinutes():date.getMinutes())+':'+((date.getSeconds()<10)?'0'+date.getSeconds():date.getSeconds())
			html+="<tr><td><a href='#' id='lag_"+i+"'><img src='http://cdn2.tribalwars.net/8.16/18844/graphic/delete_small.png?1d004' width='8px'/></a></td><td>"+t+"</td><td>"+lagTest.lastLag[i]['lag']+"<td"+((p<-100 || p>100)?' style=\'background-color: red;\'':'')+">"+((p>0)?"+":"")+p+"%</td></tr>";
		});
				
		html+="<tr><td colspan='3'>Gemiddelde lag:</td><td>"+Math.round(sum/lagTest.lastLag.length)+"</td></tr></tbody></table>";
		$('#content_screen').append(html);
		$('a[id*="lag_"]').click(function() {
			var i = parseInt($(this).attr('id').split('_')[1]);
			lagTest.lastLag.splice(i,1);
			update();
			$(this).closest('tr').remove();
		});
	}
	function cleanLags() {
		lagTest.lastLag = lagTest.lastLag.filter(function(el) {
			return el['time'] >= (new Date().getTime() - 3600*1000);
		});
		update();
	}
	if(document.URL.match(/&try=confirm/)) {
		var html = '<input type="button" class="btn" id="lagTest" value="Start lag test" />';
		$('#troop_confirm_go').after(html);
		var interval;
		$('#lagTest').click(function () {
			if(lagTest.on) {
				clearInterval(interval);
				lagTest.on=false;
				update();
				$(this).val('Start lag test');
				$('body').append('<div class="autoHideBox error">Lag test is geannuleerd!</div>');
				setTimeout(function () {$('.autoHideBox').hide('fast');},1000);
			} else {
				lagTest.on = true;
				lagTest.lastVil = $('.village_anchor a').text().match(/\d{3}\|\d{3}/);
				update();
				$('body').append('<div class="autoHideBox success">Lag test is gestart!</div>');
				setTimeout(function () {$('.autoHideBox').hide('fast');},1000);
				$(this).val('Annuleer lag test');
				interval = setInterval(timeCheck,1);
			}
		});
	} else {
		$('table.modemenu tr:last').after('<tr><td><a href="#" id="lagTest" title="Bekijk de laatste resultaten">Lagtest resultaten</a></td></tr>');
		$('#lagTest').click(showScreen);
		if(lagTest.on) {		
			lagTest.on=false;
			update();
			var lagTestAttacks = [];
			var lagTestTD = []
			$('img[src*="attack.png"],img[src*="support.png"]').each(function () {
				if($(this).next('span').children('a').text().indexOf(lagTest.lastVil)>-1) {
					lagTestAttacks.push($(this).closest('td').next().text().match(/\d{2}:\d{2}:\d{2}:\d{3}/)[0]);
					lagTestTD.push($(this));
				}
			});
			var lastAttack = lagTestTD.pop();
			var lag = lagTestAttacks.pop();
			lag = (parseInt(lag.split(':')[2])*1000+parseInt(lag.split(':')[3]));
			alert('Lag opgeslagen: '+lag);
			if(typeof lagTest.lastLag=='undefined') lagTest.lastLag = [{lag: lag,time:(new Date().getTime())}];
			else lagTest.lastLag.push({lag: lag,time:(new Date().getTime())});
			update();
			location.href = $(lastAttack).closest('tr').children('td:eq(3)').children('a').attr('href');
		}
	}
});