// ==UserScript==
// @name         MyAnimeList - Precise Scores
// @namespace    https://github.com/DakuTree/various/tree/master/experiments/mal/mal_precise
// @author       Daku (admin@codeanimu.net)
// @description  Enables you to set scores with one decimal place (9.6, 8.5, 7.4 etc.) on MAL.
// @include      /^http[s]?:\/\/myanimelist\.net\/(anime|manga)list\/.*$/
// @updated      2013-10-26
// @version      1.2.0
// ==/UserScript==

/* MAL is using an older version of jQuery (1.5.2), where a fair amount of shiny features included in newer versions (.on / .attr etc.) do not exist.
   We could add a more recent version ourselves, but it is a bit unneccessary. */

var mploc = "http://codeanimu.net/mal/mal_precise"; //Location of MAL Precise script.
var fontsize = "9px"; //Change this if you are using a non-standard font-size (This font-size only applies to scores you have just changed).

$(document).ready(function() {
	var userid = $('#listUserId').attr('value');
	var type = $('#listType').attr('value');
	var rejs = {'onclick="manga_updateScore\\(':'data-info="precise(', 'onclick="anime_updateScore\\(':'data-info="precise(',
				'onkeydown="manga_checkEnter\\(event,3,':'data-info="entercheck(event,', 'onkeydown="anime_checkScoreEnter':'data-info="entercheck',
	};

	/* CHECK: This method feels..clunky? */
	var new_html = $('#list_surround').html();
	$.each(rejs, function(k, v){
		var re = new RegExp(k, 'g');
		new_html = new_html.replace(re, v);
	});
	$('#list_surround').html(new_html);

	if(/mal_css\/style\.php.*userid/.test($('style').eq(1).text()) === false){ //If custom MAL_Precise CSS exists, don't load scores again.
		$.getJSON(mploc+"/index.php?userid="+userid+"&type="+type, function(data) {
			$.each(data, function(){
				$('#score' + (type == "anime" ? "val" : "") + $(this)[0]['db_id']).text($(this)[0]['score_precise']);
			});
		});
	}

	$('input[id^="scoretext"]').bind("keypress", function(e) {
		var key =  e.keyCode || e.which;
		if (key == 13){
			var args = $(this).data('info').slice(11, -2).split(',');
			precise($.trim(args[1]), (typeof args[2] !== 'undefined' ? $.trim(args[2]) : 0));
		}else{
			return true;
		}
	});

	$('input[type="button"]').bind("click", function(e) {
		e.preventDefault();
		var args = $(this).data('info').slice(8, -2).split(',');
		precise($.trim(args[0]), (typeof args[1] !== 'undefined' ? $.trim(args[1]) : 0));
	});

	function precise(id, dbid) {
		var newScore = Number($('#scoretext'+id).attr('value'));

		if (isNaN(newScore) || (newScore>10) || (newScore<0)){
			alert('Invalid score value, must be between 1 and 10');
		}else{
			var roundScore = Math.floor(newScore); //We use .floor here rather than .round as to avoid rounding up. As, for example, a 9.5+ should never equal a 10.
			var preciseScore = newScore.toFixed(1);

			$('#scorediv'+id).css('display', 'none');
			var am = {'anime': ['63', 'id', id, 'scoreval'], 'manga': ['33', 'mid', dbid, 'score']};
			var pobj = {};
			pobj[am[type][1]] = am[type][2];
			pobj['score'] = roundScore;

			$.post("/includes/ajax.inc.php?t="+am[type][0], pobj, function(data){
				$('#scoretext'+id).attr('value', '');
				//This feels extremely ugly, but it has to be done so it plays nice with the custom MAL_Precise CSS.
				$('head').append("<style>#"+am[type][3]+id+" { font-size: 0; }\n#"+am[type][3]+id+":after { content: '"+preciseScore+"'; font-size: "+fontsize+"; }");

				$.get(mploc+"/update.php?user_id="+userid+"&score_precise="+preciseScore+"&db_id="+id+"&type="+type);
			});
		}
	}
});
