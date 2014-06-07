// ==UserScript==
// @name           HappyTools
// @namespace      happiest
// @description    Happie.st Tools
// @include        http://happie.st/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// ==/UserScript==

GM_log("Happyscript 2");

//Move content up.
$('div#main').css('margin-top', '0px');

//Execute graphing functionality in content scope:
location.href = "javascript:(" + encodeURI( 

	function() {

		function updateGraph() {

			var gratitude = 0;
			var journal = 0; 
			var wisdom = 0; 
			var getphysical = 0; 
			var eathealthy = 0; 
			var mantra = 0; 
			var meditation = 0;

			$.each(habits, function(i,e){

				switch (e.habit) {

					case "gratitude": gratitude++; break;
					case "journal": journal++; break;
					case "wisdom": wisdom++; break;
					case "getphysical": getphysical++; break;
					case "eathealthy": eathealthy++; break;
					case "mantra": mantra++; break;
					case "meditation": meditation++; break;

				}

			});

			$('div#graph').empty();

			$('div#graph').append(bar('Gratitude',gratitude, habits.length, '#FFDA8D'));
			$('div#graph').append(bar('Journal', journal, habits.length, '#B9595D'));
			$('div#graph').append(bar('Wisdom', wisdom, habits.length, '#AF97CB'));
			$('div#graph').append(bar('Eat Healthy', eathealthy, habits.length, '#AECB82'));
			$('div#graph').append(bar('Get Physical', getphysical, habits.length, '#E0807A'));
			$('div#graph').append(bar('Mantra', mantra, habits.length, '#F9B16D'));
			$('div#graph').append(bar('Meditation', meditation, habits.length, '#99E0F5'));

		}

		function bar(t, n, l, c) {
		
			var barLength = ((n/l)*200);

			return $('<div style="width: 100%; margin-bottom: 5px; padding: 2px;">'+
				 '<div style="float: left; margin-right: 5px; width: '+barLength+'px; height: 10px; color: #FFF; background-color: '+c+';"></div>'+
				 t+' ('+n+')'+
				 '</div>');

		}

		hpi.system.realcomplete = hpi.system.complete;

		var happydb = localStorage;
		happydb.clear();

		if (happydb['habits']) {
			var habits = $.evalJSON(happydb['habits']);
		} else {
			var habits = new Array;
		}

		var myComplete = function(XMLHTTPRequest, textStatus, cbf_success, cbf_error, additional) {

		    this.realcomplete (XMLHTTPRequest, textStatus, cbf_success, cbf_error, additional);

		    var rObj = $.evalJSON(XMLHTTPRequest.responseText);

		    if (rObj.meta.passthrough.endpoint=='stream/feed') {

			$.each(rObj.nodes, function(i,e){

				habits.push({id:e.id, habit:e.habit, date: e.date});

			});

			happydb['habits'] = $.toJSON(habits);

			updateGraph(habits);

		    }

		}  

		hpi.system.complete = myComplete;

	})

+ ")()";

//Execute GM scope 2s after the page is loaded.
window.setTimeout(function() {

	$('div.entry_text').each(function(i){

		var fParagraph = $(this).find('p:first');

		if (fParagraph.height() < 400) {
			fParagraph.show().siblings('p').hide();

		}

	});
	
	$('ul#entry_habits').prepend($('a.journal').parent());

	var journal = $('a.journal');

	var evt = document.createEvent("HTMLEvents");
	evt.initEvent("click", true, true);
	journal[0].dispatchEvent(evt);

	var graph = $('<div id="graph" style="">Calculating graph</div>');
	graph.insertAfter('div#profile_data');
	
}, 2000);
