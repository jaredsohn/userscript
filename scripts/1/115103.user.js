// ==UserScript==
// @name           steamgifts.com sorter
// @include        http://www.steamgifts.com/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

(function()
{

	// Manage link
	$('a[href="/manage/entries"]').attr('href','/manage/entries/open');

	// Featured
	$('.featured').css('display','none');
	
	// Add styles
	$('<style>').text('.sortby {font-weight:normal; margin-right: 20px} .post.fade {opacity: 1; outline: thin solid orange}').appendTo('body');
	
	// Add links for sorting
	$('.sub_navigation').append('<span class="sortby">\
	<input type="radio" name="sortby" value="alphasort" />Alphanumeric\
	<input type="radio" name="sortby" value="metasort" />Metascore\
	<input type="radio" name="sortby" value="timesort" />Time left\
	<input type="radio" name="sortby" value="testsort" />Metascore / (entries * cost)\
	</span><span class="sortby">\
	<input type="radio" name="direction" value="asc" />Asc\
	<input type="radio" name="direction" value="desc" />Desc\
	</span>');
	
	// List of Humble Indie Bundle games
	// Harcoded because no dynamically available list of bundles could be found
	var bundles = {
		'Humble Indie Bundle #1': ['World of Goo', 'Aquaria', 'Gish', 'Penumbra Overture', 'Lugaru HD', 'Samorost2'],
		'Humble Indie Bundle #2': ['Braid', 'Cortex Command', 'Machinarium', 'Osmos', 'Revenge of the Titans'],
		'Humble Frozenbyte Bundle': ['Trine', 'Shadowgrounds', 'Shadowgrounds Survivor', 'Splot', 'Jack Claw'],
		'Humble Indie Bundle #3': ['Crayon Physics Deluxe', 'Cogs', 'VVVVVV', 'Hammerfight', 'And Yet It Moves', 'Steel Storm', 'Atom Zombie Smasher'],
		'Humble Frozen Synapse Bundle': ['Frozen Synapse', 'Trauma', 'SpaceChem'],
		'Humble Voxatron Debut': ['Blocks That Matter', 'The Binding of Isaac', 'Voxatron', 'Gish'],
		'Indie Royale - The Launch Bundle': ['ARES: Extinction Agenda', 'Gemini Rue', 'Sanctum', 'Nimbus'],
		'Indie Royale - The Difficult 2nd Bundle': ['NightSky', 'Fate of the World', 'Scoregasm', 'Time Gentlemen Please! and Ben There Dan That! Special Edition Double Pack', 'Irukandji', 'Bullet Candy Perfect']
	}

	$("input[name='sortby']").change(function()
	{
		switch ($("input[name='sortby']:checked").val())
		{
		case 'alphasort':
			sortAll( localStorage.getItem('sortDesc') ? desc(sortAlphanumeric) : sortAlphanumeric );
			localStorage.setItem('sortBy', 'sortAlphanumeric');
			break;
		case 'metasort':
			sortAll( localStorage.getItem('sortDesc') ? desc(sortMetascore) : sortMetascore );
			localStorage.setItem('sortBy', 'sortMetascore');
			break;
		case 'timesort':
			sortAll( localStorage.getItem('sortDesc') ? desc(sortTimeleft) : sortTimeleft );
			localStorage.setItem('sortBy', 'sortTimeleft');
			break;
		case 'testsort':
			sortAll( localStorage.getItem('sortDesc') ? desc(sortTest) : sortTest );
			localStorage.setItem('sortBy', 'sortTest');
			break;
		}
	});
	
	$("input[name='direction']").change(function()
	{
		switch ($("input[name='direction']:checked").val())
		{
		case 'asc':
			localStorage.setItem('sortDesc', '');
			break;
		case 'desc':
			localStorage.setItem('sortDesc', 'asdf');
		}
		var gifts = $('.ajax_gifts');
		$('.post').each(function(){gifts.prepend(this)});
		// Shitty workaround to get the panel back to the top
		$('.sub_navigation').prependTo(gifts);
	});


	//Filter Giveaways
	function filterGiveaways()
	{
		$('.post').each(function()
		{
			var title = $('.title a', $(this)).text();
			if ( !$(this).is('.fade') && $.titles.indexOf(title) != -1 )
				$(this).remove();
		});
	}
	
	function addMetascore()
	{
		var score = getMetascore(this);
		if (score)
		{
			//console.log("appending known score " + score + " to " + $(this).find('.title a').text());
			$('.title', $(this)).append('<span style="color:#8BC53F">'+score+'</span>');
		}
		//else
		//	console.log("No known score for " + $('.title a', $(this)).text());
	}
	
	function getMetascore(game)
	{
		// If we're currently loading metascores from steam store, don't do anything, too early
		if (pagesLeft)
			return 0;
		var title = $(game).find('.title a').text();
		if (!(title in metascores))
		{
			// First check if it's a humble bundle
			if (title in bundles)
			{
				var highest = Math.max.apply(null, $.map(bundles[title], function(e)
				{
					return metascores[e];
				}));
				if (highest > 0)
					updateScoresAndSort(title, highest);
				return highest;
			}
			
			// set it to 0 to make sure it doesn't send more requests
			metascores[title] = 0;
			localStorage.setItem('metascores', JSON.stringify(metascores));
			console.log('Unknown score for ' + title + ', requesting giveaway page');
			GM_xmlhttpRequest(
			{
				method: "GET",
				url: "http://www.steamgifts.com" + $(game).find('.title a').attr('href'),
				onload: function(response)
				{
					//console.log('Requests to steamgifts: '+ ++requests_to_steamgifts);
					var data = $(response.responseText);
					// First check if the title was shown different due to clipping
					var newTitle = $('h1.title', data).text();
					if (newTitle != title)
					{
						console.log(title+' is actually '+newTitle);
						if (newTitle in metascores)
						{
							updateScoresAndSort(title, metascores[newTitle]);
							// append the newly found metascore to each instance of the game
							$('.post .title').filter(function(){return $('a', $(this)).text() == title;}).append('<span style="color:#8BC53F">'+metascores[newTitle]+'</span>');
							return;
						}
						else
						{
							title = newTitle;
						}
					}
					// Then check if it's a DLC we don't have a base game for
					if ($('.rounded.view', data).text() == 'Missing Base Game')
					{
						console.log(title + ' is a DLC without base game, removing');
						// Remove them all from the page and blacklist the DLC by adding it to the list of games you own
						$('.post').filter(function(){return $('.title a', $(this)).text() == title;}).remove();
						$.titles.push(title);
						// remove the metascore '0' to make sure it checks again after the next sync
						delete metascores[title];
						// save immediately because we don't know when the script will finish
						localStorage.setItem('gifts_titles', JSON.stringify($.titles));
						localStorage.setItem('metascores', JSON.stringify(metascores));
						return;
					}
					// find link to steam store
					var link = $('.steam_store a', data).attr('href');
					// if it's not a subscription, then this game simply doesn't have a score
					if (link && link.split('/')[3] == 'sub')
					{
						console.log(title + ' is a package, requesting store');
						GM_xmlhttpRequest({
							method: "GET",
							url: link,
							onload: function(response)
							{
								//console.log("reached store for " + title);
								// We might have been redirected, but normally it will still be a sub
								if (response.finalUrl.indexOf('sub') < 0)
								{
									if (response.finalUrl == "http://store.steampowered.com/")
										console.log(link + ' redirected to main page');
									// If it redirected somewhere else, then I have no idea what's going on
									// Alerting hoping someone will tell me about this
									else
										alert(link + ' redirected to ' + response.finalUrl);
									return;
								}
								if (response.finalUrl.indexOf('agecheck') > -1)
								{
									// I'm not going to work around this, fuck you Steam
									console.log(title+' requires agecheck, set age and refresh');
									// Remove the placeholder metascore to force update next time
									delete metascores[title];
									// save immediately because we don't know when the script will finish
									localStorage.setItem('metascores', JSON.stringify(metascores));
									return;
								}
								var data = $(response.responseText);
								// Look at each game in it and find best
								//console.log("Requested store for sub: " + ++requests_to_store_sub);
								var highest = Math.max.apply(null, $.map($('.tab_desc h4', data), function(e)
								{
									return metascores[$(e).text()];
								}));
								if (highest > 0)
								{
									updateScoresAndSort(title, highest);
									// append the newly found metascore to each instance of the game
									//console.log("appending newly found score " + highest + " to " + title);
									$('.post .title').filter(function(){return $('a', $(this)).text() == title;}).append('<span style="color:#8BC53F">'+highest+'</span>');
								}
							}
						});
					}
				}
			});						
		}
		// zero means we don't know the metascore
		return metascores[title];
	}
	
	function updateScoresAndSort(title, score)
	{
		metascores[title] = score;
		// save immediately because we don't know when the script will finish
		localStorage.setItem('metascores', JSON.stringify(metascores));
		// resort if sorting by metascore
		if (sortBy == sortMetascore || sortBy == sortTest)
		{
			if (sortDesc)
				$('.post').sort(desc(sortBy)).appendTo('.ajax_gifts');
			else
				$('.post').sort(sortBy).appendTo('.ajax_gifts');
		}
	}
	
	// Sorting functions go here
	function sortAlphanumeric(a,b)
	{
		return $(a).find('.title a').text() > $(b).find('.title a').text() ? 1 : -1;
	}
	
	function sortTimeleft(a,b)
	{
		var units = ['minute','minutes','hour','hours','day','days','week','weeks'];
		var a_left = $(a).find('.time_remaining strong:first').text().split(' ');
		var b_left = $(b).find('.time_remaining strong:first').text().split(' ');
		var a_unit = units.indexOf(a_left[1]);
		var b_unit = units.indexOf(b_left[1]);
		return a_unit > b_unit ? 1 : b_unit > a_unit ? -1 : a_left[0] - b_left[0];
	}
	
	function sortMetascore(a,b)
	{
		var score_a = getMetascore(a);
		var score_b = getMetascore(b);
		// if we got zero, that means we don't know the metascore (yet)
		// assume 50 - neither good nor bad
		if (!score_a)
			score_a = 50;
		if (!score_b)
			score_b = 50;
		return score_a - score_b;
	}
	
	function sortTest(a,b)
	{
		var score_a = getMetascore(a);
		var score_b = getMetascore(b);
		// if we got zero, that means we don't know the metascore (yet)
		// assume 50 - neither good nor bad
		if (!score_a)
			score_a = 50;
		if (!score_b)
			score_b = 50;
		return score_a / ( parseInt($('span[style="color:#c9cdcf;"]', $(a)).text().substring(1)) * parseInt($('.entries :first', $(a)).text().replace(',','')) ) - score_b / ( parseInt($('span[style="color:#c9cdcf;"]', $(b)).text().substring(1)) * parseInt($('.entries :first', $(b)).text().replace(',','')) );
	}
	
	function desc(fun)
	{
		return function(a,b) { return -fun(a,b); }
	}
	
	function sortAll(fun)
	{
		$('.post').sort(fun).appendTo('.ajax_gifts');
	}
	
	$(document).ready(function()
	{
		unsafeWindow.$(".post.fade").unbind();
	});
	
	// check once a week
	if (new Date().getTime() - localStorage.getItem('gifts_lastupdate') < 604800000)
	{
		console.log('Cache');
		$.titles = JSON.parse(localStorage.getItem('gifts_titles'));
		filterGiveaways();
	}
	else if ($('img.login').length == 0)
	{
		console.log('Update');
		$.get("http://www.steamgifts.com/sync", function(data)
		{
			$.titles = $.map($('.code', $(data)),function(e){return $(e).text();});
			localStorage.setItem('gifts_titles', JSON.stringify($.titles));
			localStorage.setItem('gifts_lastupdate',new Date().getTime());
			filterGiveaways();
		});
	}
	else
	{
		console.log('No login');
		$.titles = [];
	}
	
	var metascores;
	var pagesToLoad;
	if (new Date().getTime() - localStorage.getItem('metascore_lastupdate') > 2592000000)
	{
		// too old data
		metascores = {};
		// set a new date
		localStorage.setItem('metascore_lastupdate',new Date().getTime());
		// on November 18 there were 45 pages with games that have scores
		// But this might have changed
		pagesToLoad = parseInt(localStorage.getItem('pages'));
		if (!pagesToLoad)
			pagesToLoad = 45;
		var pagesLeft = pagesToLoad;
		// Get metascores for ALL the games
		for (var i = 1; i <= pagesToLoad; i++)
		{
			GM_xmlhttpRequest(
			{
				method: "GET",
				url: 'http://store.steampowered.com/search/results/?sort_by=Metascore&sort_order=DESC&page='+i,
				onload: function checkpage(response)
				{
					var data = $(response.responseText);
					$('.search_result_row', data).each(function()
					{
						updateScoresAndSort
						(
							$('.search_name h4',$(this)).text().trim().replace(/[®™.,]/g,''),
							$('.search_metascore',$(this)).text()
						);
					});
					var currentPage = response.finalUrl.substring(85);
					if (currentPage == pagesToLoad)
					{
						// We're on the last page.
						if ($('.search_result_row:last .search_metascore', data).text())
						{
							// There might be more metascores
							console.log(currentPage + " is not the last page!");
							pagesLeft++;
							GM_xmlhttpRequest(
							{
								method: "GET",
								url: 'http://store.steampowered.com/search/results/?sort_by=Metascore&sort_order=DESC&page='+ ++pagesToLoad,
								onload: checkpage
							});
						}
						else
						{
						//	console.log(currentPage + " was the last page with metascores");
							localStorage.setItem('pages', currentPage)
						}
					}
					if (!--pagesLeft)
						$('.post').each(addMetascore);
				}
			});
		}
	}
	else
	{
		 metascores = JSON.parse(localStorage.getItem('metascores'));
		 $('.post').each(addMetascore);
	}
	
	var sortDesc = localStorage.getItem('sortDesc');
	(sortDesc ? $("input[value='desc']") : $("input[value='asc']")).attr("checked", "checked");
	var sortBy = eval(localStorage.getItem('sortBy'));
	if (!sortBy)
		sortBy = sortTimeleft;
	switch (sortBy)
	{
	case sortAlphanumeric:
		$("input[value='alphasort']").attr("checked", "checked");
		break;
	case sortTimeleft:
		$("input[value='timesort']").attr("checked", "checked");
		break;
	case sortMetascore:
		$("input[value='metasort']").attr("checked", "checked");
		break;
	case sortTest:
		$("input[value='testsort']").attr("checked", "checked");
		break;
	}
	
	var pages = Math.ceil(parseInt($('.results strong:last').html())/15);
	for (i = 2; i <= pages; i++)
		$.ajax({
			type: "get",
			url: "http://www.steamgifts.com/open/page/" + i,
			dataType: "html",
			success: function(data)
			{
				var new_posts = $('.post', $(data)).filter(function()
				{
					var title = $('.title a', $(this)).text();
					return $(this).is('.fade') || $.titles.indexOf(title) == -1;
				});
				if (sortDesc)
					new_posts.add($('.post')).sort(desc(sortBy)).appendTo('.ajax_gifts');
				else
					new_posts.add($('.post')).sort(sortBy).appendTo('.ajax_gifts');
				new_posts.each(addMetascore);
/*				$(".post.fade").hover(
					function ()
					{
						$(this).addClass("over");
					},
					function ()
					{
						$(this).removeClass("over");
					}
				);
*/			}
		});

	$('.pagination').remove();

})();