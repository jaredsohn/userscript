// ==UserScript==
// @name         MyAnimeList - Extended Favourites
// @namespace    https://github.com/DakuTree
// @author       Daku (admin@codeanimu.net)
// @description  Adds the ability to have more favourites than the current limit allows.
// @include      /^http[s]?:\/\/myanimelist\.net\/(anime|manga|people|character|profile)(\/|\.php).*$/
// @updated      2014-04-01
// @updateURL    https://raw.githubusercontent.com/DakuTree/various/master/experiments/mal/mal_favourites/mal_favourites.user.js
// @version      1.3.0
// ==/UserScript==

$(document).ready(function() {
	function C(k){return(document.cookie.match('(^|; )'+k+'=([^;]*)')||0)[2]} //http://stackoverflow.com/questions/5639346

	var userID = C('Y') || 0;
	var mploc = "http://codeanimu.net/mal/mal_favourites"; //Location of MAL Favourites script (If you want to host your own DB)

	var idtype = location.pathname.match(/([a-z]+)\/([0-9]*)/);
	if(/^profile$/.test(idtype[1])){
		var profileID = $('.floatRightHeader a:contains("All Comments")').attr('href').split('?id=')[1]; //This feels ugly
		$.getJSON(mploc+"/index.php?user_id="+profileID, function(data) {
			var anime = $('.profile_leftcell .normal_header:contains("Favorite Anime")').next('table').find('tbody');
			var manga = $('.profile_leftcell .normal_header:contains("Favorite Manga")').next('table').find('tbody');
			var characters = $('.profile_leftcell .normal_header:contains("Favorite Characters")').next('table').find('tbody');
			var people = $('.profile_leftcell .normal_header:contains("Favorite People")').next('table').find('tbody');

			$.each(data, function(){
				var type = $(this)[0]['type'];
				type = (type == 0 ? "anime" : (type == 1 ? "manga" : (type == 2 ? "character" : (type == 6 ? "people" : null))))
				var type_id = $(this)[0]['type_id'];
				var name = $(this)[0]['name'];
				var url = 'http://myanimelist.net/'+type+'/'+type_id;
				var preview_url = $(this)[0]['preview_url'];
				var series_title = $(this)[0]['series_title'];
				var series_url = $(this)[0]['series_url'];

				$('<tr/>', {style: 'background-color: #D5E4FF'}).append(
					$('<td/>', {valign: 'top', width: 25, class: 'borderClass'}).append(
						$('<div/>', {class: 'picSurround'}).append(
							$('<a/>', {href: 'http://myanimelist.net/'+type+'/'+type_id}).append(
								$('<img/>', {src: preview_url, border: 0, alt: name}))))
				).append(
					$('<td/>', {valign: 'top', class: 'borderClass'}).append(
						$('<a/>', {href: url, text: name})).append(
						(type == "character" ? $('<div/>', {style: 'padding-top:2px;'}).append($('<a/>', {href: series_url, class: 'lightLink', text: series_title})) : ""))
				).appendTo($('.profile_leftcell .normal_header:contains("Favorite '+type.substr(0, 1).toUpperCase()+type.substr(1)+'")').next('table').find('tbody'));
			});
		});
	}else if(/^(anime|manga|character|people)$/.test(idtype[1])){
		var type = (idtype[1] == "anime" ? 0 : (idtype[1] == "manga" ? 1 : (idtype[1] == "character" ? 2 : (idtype[1] == "people" ? 6 : 0))));
		var id = idtype[2];

		$('#profileRows a:contains("Favorites")').after(
			$('<a/>', {href: 'javascript:void(0);', style: 'font-weight: normal;'}).append(
				$('<span/>', {id: 'favOutputExtended', text: 'Add/Remove ExFavorites'})
			)
		);

		$('#favOutputExtended').click(function(){
			var name = $('h1').get(0).innerText.replace(/^Ranked #[0-9]+/, '');
			var thumbURL = $('tbody tr:eq(0) div:eq(0) img').attr('src');
			thumbURL = (type == 2 ? thumbURL.replace('.jpg', 't.jpg') : thumbURL.replace('.jpg', 'v.jpg'));

			var ajaxURL = 'user_id='+userID+'&type='+type+'&type_id='+id;
			ajaxURL += '&name='+name+'&preview_url='+thumbURL.replace('http://', ''); //This stores/adds the character/anime/person/manga data if doesn't exist
			if(type == 2){
				var series = $('table:eq(1) a:eq(1), table:eq(2) a:eq(1)').get(0);
				ajaxURL += '&series_title='+series.innerText+'&series_url='+series.href.replace('http://', '');
			}
			console.log("AJAXurl: "+ajaxURL);
			$.get(mploc+"/update.php?"+ajaxURL, function(data){
				document.getElementById("favOutputExtended").innerHTML = data;
			});
		});
	}

	/* Change search to current page type */
	//$('#topSearchValue').val((idtype[1] == "anime" ? 0 : (idtype[1] == "manga" ? 1 : (idtype[1] == "character" ? 2 : (idtype[1] == "people" ? 6 : 0)))));
});
