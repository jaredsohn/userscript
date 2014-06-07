// ==UserScript==
// @name        SteamGifts All in One
// @description Edited scripts to my preferences, that you may like
// @updateURL      http://userscripts.org/scripts/source/137970.meta.js
// @downloadURL    https://userscripts.org/scripts/source/137970.user.js
// @include        http://*steamgifts.com/
// @include        http://*steamgifts.com/open*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==



$ = unsafeWindow.$;
console = unsafeWindow.console;
var urlSteam = "http://www.steamgifts.com";
var idTempOriginal = "xpath-temp";
var img = "http://www.fillow.com/AfcIcon/Icons/Ajaxloader.gif";
var loader = $(document.createElement("img")).attr("src", img).css({"float": "left", "width": "16px", "height" : "16px"});

function get(url, elemento) {
	setTimeout(function() {
		GM_xmlhttpRequest({
			method: "GET",
			url: url,
			onload: function(xhr) {
				generarBotonEnterToWin(url, xhr.responseText, elemento);
			}
		});
	}, 0);
}

function post(url, data, elemento) {
	setTimeout(function() {
		GM_xmlhttpRequest({
			method: "POST",
			url: url,
			data: data,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function() {
				wearConLosPuntos(elemento);
				get(url, elemento);
			}
		});
	}, 0);
}

function wearConLosPuntos(elemento) {
	var elemento_puntos_total = $('#navigation>ol>li:eq(2)>a');
	var puntos_totales_texto = elemento_puntos_total.text();
	var puntos_juego_texto = elemento.text()
	var puntos_total = parseFloat(puntos_totales_texto.match(/\d+/));
	var puntos_juego = parseFloat(puntos_juego_texto.match(/\d+/));
	nuevos_puntos = esBotonEnter(puntos_juego_texto) ? puntos_total-puntos_juego : puntos_total+puntos_juego;
	if (nuevos_puntos >= 0) elemento_puntos_total.text(puntos_totales_texto.replace(/\d+/, nuevos_puntos));
}

function crearDocumentTemporal(html, idTemp) {
	var div = document.createElement("div");
	div.id = idTemp ? idTemp : idTempOriginal; 
	div.innerHTML = html;
	div.style.display = "none";
	document.body.appendChild(div);
}

function obtenerKeyJuego(frase) {
	return frase.split("/")[4];
}

function removerDocumentTemporal(idTemp) {
	var idTemp = idTemp ? idTemp : idTempOriginal;
	$("#" + idTemp).remove();
}

function esBotonEnter(nombreBoton) {
	return nombreBoton.indexOf("Enter to Win!") != -1;
}

function esBotonRemove(nombreBoton) {
	return nombreBoton.indexOf("Remove Entry") != -1;
}

function esBoton(nombreBoton) {
	return esBotonEnter(nombreBoton) || esBotonRemove(nombreBoton);
}

function generarEfectosContenedorJuego(contenedorJuego, nombreBoton) {
	if (esBotonRemove(nombreBoton)) {
		contenedorJuego.addClass("fade");
		contenedorJuego.hover(function() { contenedorJuego.addClass("over"); }, function() { contenedorJuego.removeClass("over"); })
	} else if (esBotonEnter(nombreBoton)) {
		contenedorJuego.removeClass("fade");
		contenedorJuego.hover(function(){}, function(){})
	}
}

function generarBotonEnterToWin(url, html, elemento) {

	var keyJuego = obtenerKeyJuego(url);
	var idTemp = idTempOriginal + "-" + keyJuego;
	
	crearDocumentTemporal(html, idTemp);
	var formulario = xpath(".//div[@id='" + idTemp + "']//*[@id='form_enter_giveaway']");
	removerDocumentTemporal(idTemp);
	if (!formulario[0]) {
		return false;
	}
	var f = $(formulario[0]).attr("id", "form-" + keyJuego).attr("action", url).css("float", "left");
	var enterToWin = $("a", f).first();
	
	var nombreBoton = enterToWin.text();
	var agregarClick = esBoton(nombreBoton);
	
	if (agregarClick) {
		enterToWin.click(function(e) {
			elemento.append(loader);
			post(url, f.serialize(), elemento);
			return false;
		});
	}

	var contenedorJuego = elemento.parents(".post");
	generarEfectosContenedorJuego(contenedorJuego, nombreBoton);

	$("form", elemento).remove();
	elemento.html(f);
}

function sesionIniciada() {
	var login = $("#navigation ol a:eq(6)").attr("href");
	return login.indexOf("/?login") == -1;
}

function doMagic(elemento) {
	var contenedor = $(document.createElement("div")).css("float", "right").append(loader);
	var title = $(".left .title:eq(0)", elemento);
	title.append(contenedor);
	var urlJuego = $("a:eq(0)", title).attr("href");
	if (!urlJuego) {
		return false;
	}
	get(urlSteam + urlJuego, contenedor);
}

if (sesionIniciada()) {
	$(".content .post").each(function(index, elemento) { doMagic(elemento) });
}

function xpath() {
	var elements = new Array();
	for (var i = 0; i < arguments.length; i++) {
		try {
			var iterator = document.evaluate(arguments[i], document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
			for (var i = 0; i < iterator.snapshotLength; i++) {
				elements.push(iterator.snapshotItem(i));
			}
		} catch(e) {
			continue;
		}
	}
	return elements;
}

(function()
{

	// Manage link
	$('a[href="/manage/entries"]').attr('href','/manage/entries/open');

	// Featured
	$('.featured').css('display','none');
	
	// Add styles
	$('<style>').text('.post.fade {opacity: 1; outline: thin solid orange}').appendTo('body');


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
	
	function updateScores(title, score)
	{
		metascores[title] = score;
		// save immediately because we don't know when the script will finish
		localStorage.setItem('metascores', JSON.stringify(metascores));
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
						updateScores
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

	var sortBy = eval(localStorage.getItem('sortBy'));
	if (!sortBy)
		sortBy = sortTimeleft;
	
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
					new_posts.add($('.post')).appendTo('.ajax_gifts');
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