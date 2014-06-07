// ==UserScript==
// @name           IMDb: Colorful Vote History + Rating Statistics
// @description    Colorizes lists based on ratings and adds stats to the sidebar. Does only work in compact/tabular view.
// @author         kuehlschrank
// @version        2011.8.14
// @include        http://www.imdb.com/list/*
// @include        http://www.imdb.com/user/*/ratings*
// ==/UserScript==


(function()
{

	function colorize() {

		var numGood = 0, numAverage = 0, numBad = 0, numHigher = 0, numLower = 0, numStrong = 0;

		var items = document.querySelectorAll('.list_item');

		for(var i = 0, len = items.length, item; i < len && (item = items[i]); i++)	{

			var userRating, imdbRating;
			try {
				// own lists
				userRating = parseFloat(item.querySelector('.your_ratings').textContent);
				imdbRating = Math.round(parseFloat(item.querySelector('.user_rating').textContent));
			} catch(ex) {
				// other lists
				userRating = Math.round(parseFloat(item.querySelector('.user_rating').textContent));				
			}
			
			if(isNaN(userRating)) {
				continue;
			}

			if(userRating > 6) {
				numGood++;
				item.className += ' good';
			} else if(userRating > 4) {
				numAverage++;
				item.className += ' average';
			} else {
				numBad++;
				item.className += ' bad';
			}

			if(isNaN(imdbRating)) {
				continue;
			}

			var a = item.querySelector('.title a');
			if(Math.abs(userRating - imdbRating) > 2) {
				a.className += ' highlight';
				numStrong++;
			}

			if(userRating > imdbRating) {
				numHigher++;
			} else if(userRating < imdbRating) {
				numLower++;
			}

		}

		var numRatings = numGood + numAverage + numBad;

		if(numRatings > 0) {

			var sidebar = document.getElementById('sidebar');

			var rStats = document.createElement('div');
			rStats.id = 'rStats';
			rStats.className = 'aux-content-widget-2';
			rStats.innerHTML = '<h4>Ratings:</h4><span class="stat good"><b>' + numGood + '</b> (' + Math.round(numGood/numRatings*100) + '%)</span> <span class="stat average"><b>' + numAverage + '</b> (' + Math.round(numAverage/numRatings*100) + '%)</span> <span class="stat bad"><b>' + numBad + '</b> (' + Math.round(numBad/numRatings*100)  + '%)</span>';
			sidebar.appendChild(rStats);

			if(numHigher + numLower > 0) {
				var dStats = document.createElement('div');
				dStats.id = 'dStats';
				dStats.className = 'aux-content-widget-2';
				dStats.innerHTML = '<h4>Deviations from IMDb ratings:</h4><b>' + numHigher + ' higher</b> (' + Math.round(numHigher/numRatings*100)  + '%) and <b>' + numLower + ' lower</b> (' + Math.round(numLower/numRatings*100)  + '%),<br/>thereof ' + numStrong + ' stronger than 2 stars (' + Math.round(numStrong/numRatings*100)  + '%)';
				sidebar.appendChild(dStats);
			}

		}

	}

	function reset() {
		var items = document.querySelectorAll('.list_item');
		for(var i = 0, len = items.length, item; i < len && (item = items[i]); i++)	{
			item.className = item.className.replace(/good|average|bad/, '');
			var a = item.querySelector('.title a');
			if(a) {
				a.className = a.className.replace('highlight', '');
			}
		}
		var rStats = document.getElementById('rStats');
		if(rStats) {
			rStats.parentNode.removeChild(rStats);
		}
		var dStats = document.getElementById('dStats');
		if(dStats) {
			dStats.parentNode.removeChild(dStats);
		}
	}

	function onNodeInserted(e) {
		if(e.target.nodeType == 1 && e.target.textContent.indexOf('Filtered list.') != -1) {
			reset();
			colorize();
		}
	}

	var style = document.createElement('style');
	style.appendChild(document.createTextNode('.list a { color: #000000 !important; } .list .title a.highlight { font-weight: bold !important; } span.stat { padding: 1px 8px 1px 8px !important; } span.good, tr.good td { background-color: #ccffcc !important; } span.average, tr.average td { background-color: #fff8cc !important; } span.bad, tr.bad td { background-color: #ffcccc !important; }'));
	document.getElementsByTagName('head')[0].appendChild(style);
	colorize();
	document.addEventListener('DOMNodeInserted', onNodeInserted, false);

 })();