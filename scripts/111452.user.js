// ==UserScript==
// @name        Google+ Star
// @namespace   http://yungsang.com/+
// @description Added the star functionality, pulled out from Usability Boost for Google Plus Chrome Extension
// @include     https://plus.google.com/*
// @author      YungSang
// @version     0.5.1
// ==/UserScript==

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")(jQuery.noConflict());";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

addJQuery(function($) {
/*
 * Google+ CSS
 *
 * version : 20110831
 */
	var SELECTOR = {
		individual_post : 'div[id^="update-"]',
			post_header   : '.kr, .jr', // not used
				post_icon   : '.Km img, .Nm img',
				post_info   : '.Nw, .Ex', // not used
					post_name : '.nC a, .eE a',
					post_date : '.Fl, .hl',
			post_content  : '.un.Ao, .Us.Gk',
	};

	var class_link_selected = 'NksfUe';

	function get_link_class(streamNode) {
		return streamNode.className.split(' ').slice(0, 4).join(' ');
	}

/*
 * localStorage
 */
	if (localStorage['favorites'] == null) {
		localStorage['favorites'] = JSON.stringify([]);
	}
	var favorites = JSON.parse(localStorage['favorites']);

	function storeFavorites(){
		localStorage['favorites'] = JSON.stringify(favorites);
	}
	function removeFavorite(postId) {
		for (var i = 0, len = favorites.length ; i < len ; i++) {
			if (favorites[i].id == postId) {
				favorites.splice(i,1);
				return true;
			}
		}
		return false;
	}
	function isFavorite(postId) {
		for (var i = 0, len = favorites.length ; i < len ; i++) {
			if (favorites[i].id == postId) {
				return true;
			}
		}
		return false;
	}
	function updateFavoriteCount() {
		favorites = JSON.parse(localStorage['favorites']);
		$('#favoritesLink').html('Starred <strong>(' + favorites.length + ')</strong>');
	}

/*
 * Main
 */
	var timer = null;
	function update() {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}

		$(SELECTOR.individual_post).each(function() {
			setStarToPost(this);
		});

		var $favoritesLink = $('#favoritesLink');
		if (!$favoritesLink.length) {
			var $notification = $('a[href="/notifications/all"]');

			var $favoritesLink = $('<a id="favoritesLink"/>')
				.addClass(get_link_class($notification.get(0)))
				.click(function() {
					var $this = $(this).addClass('selected');

					var $contentPane = $('#contentPane');
					$contentPane.children().each(function() {
						$(this).hide();
					});

					var $starredPane = $('#starred_pane');
					if (!$starredPane.length) {
						$contentPane.append(functionToString(starred_html));
						$starredPane = $('#starred_pane');
					}
					$starredPane.show();

					var $postContainer = $('#starred_stream').empty();

					$('a', $notification.parent()).each(function() {
						var $this = $(this);
						$this.removeClass(class_link_selected);
						$this.parent().removeClass(class_link_selected);
						$this.click(function() {
							if (this.id == 'favoritesLink') return;
							$starredPane.hide();
							$postContainer.empty();
							$favoritesLink.removeClass('selected');
							$(this).addClass(class_link_selected);
						});
					});

					updateFavoriteCount(); // changes might have been made in other tabs
					favorites.sort(function(a, b) {
						var A = new Date(a.post_date);
						var B = new Date(b.post_date);
						return B - A;
					});

					$.each(favorites, function(i, favorite) {
						addMiniPost(favorite, $postContainer);
					});

					return false;
				})
				.html('Starred <strong>(' + favorites.length + ')</strong>');

			$notification.after($favoritesLink);
		}

		updateFavoriteCount(); // changes might have been made in other tabs
		timer = setTimeout(update, 500);
	}

	function setStarToPost(elm) {
		if (elm.added_star) {
			return; // prevent addding again and again
		}
		elm.added_star = true;

		var $elm = $(elm);

		var $starHolder = $('<div class="post_star"/>')
			.hover(
				function() {
					$(this).addClass('starred');
				},
				function() {
					if (!isFavorite(elm.id)) $(this).removeClass('starred');
				}
			)
			.click(function() {
				var $this = $(this);

				if (isFavorite(elm.id)) {
					$this.removeClass('starred');
					removeFavorite(elm.id);
					storeFavorites();
				} else {
					$this.addClass('starred');

					var $nameLink   = $(SELECTOR.post_name,    $elm);
					var $contentBox = $(SELECTOR.post_content, $elm);
					var $imgElm     = $(SELECTOR.post_icon,    $elm);
					var $postLink   = $(SELECTOR.post_date,    $elm);

					favorites.push({
						id          : elm.id,
						name        : $nameLink.html(),
						post_date   : $postLink.attr('title'),
						post_url    : $postLink.attr('href'),
						text        : $contentBox.get(0).innerText.substring(0, 130) + '...',
						picture_url : $imgElm.attr('src')
					});
					storeFavorites();
				}

				updateFavoriteCount();
			});

		if (isFavorite(elm.id)) {
			$starHolder.addClass('starred');
		}

		$elm.append($starHolder);
	}

	function addMiniPost(favorite, $container){
		var $divMiniPost = $('<div/>').attr('id', favorite.id).addClass('minipost');

		$('<img/>').attr('src', favorite.picture_url).appendTo($divMiniPost);

		$('<div class="post_star"/>').click(function(event) {
			removeFavorite(favorite.id);
			storeFavorites();
			updateFavoriteCount();
			$divMiniPost.slideUp(function() {
				$(this).remove();
			});
			event.stopPropagation();
		}).appendTo($divMiniPost);

		$('<span/>').css({
			'font-weight' : 'bold',
			color         : '#36C'
		}).html(favorite.name).appendTo($divMiniPost);

		$divMiniPost.append(' - ');

		$('<span/>').css({
			color : '#999'
		}).html(favorite.post_date).appendTo($divMiniPost);

		$('<div/>').css({
			width : '90%'
		}).html(favorite.text).appendTo($divMiniPost);

		$('<div/>').css({
			clear : 'both'
		}).appendTo($divMiniPost);

		$divMiniPost.click(function() {
			window.open(favorite.post_url);
		});

		$container.append($divMiniPost);
	}

/*
 * Template & CSS
 */
	function functionToString(func) {
		return func.toString().match(/\/\*([\s\S]*)\*\//)[1].replace(/^\s+|\s+$/, '');
	}

	function starred_html() {/*
		<div id="starred_pane">
			<div class="starred_header">
				<span>Starred</span>
			</div>
			<div id="starred_body">
				<div id="starred_stream"></div>
			</div>
		</div>
	*/}

	function setCSSFromFunction(func) {
		var style = document.createElement('style');
		style.type = 'text/css';
		style.textContent = functionToString(func);
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	function starred_css() {/*
		#favoritesLink {
			background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAoCAYAAADOvcv6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAzNJREFUeNrsVUtPE1EUvvPsFNpAaGmnCU2qQuikCaHERIwQA5jgzh/AzoSk6sIEFN2zAmOILhA3/gY2LtyAxi0uWPTBQqqFQAot4dHCvNr63bGttMUGF+64TTN3zj3fnHO+c+YbhlywksmkpKrqGt0Xi8XBUCiUq/dhLwICNCkIQrcoij0sy0Yu8mHqDaurq7zP50u53W4fx3Fkb28vvbOz0zUyMmI2jSjL8gQAUmtrK5EkiWDPwfagIWIsFltmGGa8VCpJFWNnZ+eJw+Fw0v3p6ameTqfFKoBhVFy+MIlEIu1yuTxwJJdZ+XyeZDKZQxaZjB4cHBxns1mCqH8F0DP4UVAemCGLnGg06gCLKzAMeDwejuf5GpBpmmR/f7+AFc/lcsPhcPiwhtWNjY1UR0eHvz7tcnrZ3d1ducJulVVE7Uc6MmWzfrW0tNBLm9frvdnQDqQ6297eLoA16/7o6Mj609qozel08ihlrmYA4vF4AIcxv99vp46ox9A0LYkjDfUqqJun4K2tLdpXpbe3N1GJeBfjlaG1bG9v64ZhLKCeUDAY7MOsTmNyNHpmt9tTIGisGhH1DeGJnzCX33A7BcDa+RrX19e7MEVLAN2D331FUT4zzXrXbF0B/xX48+UTCf1bK78Vg9dfLV1OcwCaZBm2G33tQd8il4qYePqQt9lsKUySj46ZrulpVVO7gm8+NNccgCYAkHiOJxzL0QHnYGvUnM1nkWUM3jgpkarmiDbxBEBLczBmOgZePKeLlubw2NxGWlaEc8tZ2eBtEMvv4281KJiSruu3WKQyaujGsW7oCNpEc/CjPgDlgRmyyNl8HnGAwRUYBhCdA6O1LJeKFFCAb7xgFoZvvH5/WMPqj5nHKUEU/HVp0/QoMIta5Qq71Ucjaj/Skans16+yrc0m2ho1B6nOQncEpvw5MUzD+tPaqA0SQuVjrmYAkjOPAtjHIA12yo+mawamx9Ic1KugPVbu6plK+6oE5hf/aA4iZlA4OVPPdDxsAfWErs2/60PEaXz2NPSTsBybwtlYNVXcfC8Wii7Q/RW3dwJziy8qJGD/FtG7TcP8CB8vso5eScf/Av4SYACnRKyQdyiLMQAAAABJRU5ErkJggg==) 1px 6px no-repeat;
			margin-left: 10px;
			padding-left: 20px;
		}
		#favoritesLink.selected {
			background-position: 1px -14px;
			color: #e14b39;
			font-weight: bold;
		}

		div.post_star {
			position:absolute;
			top:38px;
			right:20px;
			width:14px;
			height:14px;
			background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAOCAYAAABKKc6PAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA7ZJREFUeNqkVV9oU1cYP+eee5Obf/2TpElcm5mipg3R2ozqZG1x2YT5INsUEbQvFhHHRCxVEB8GBZ+2hzlERRhYBg7Rh7INtodtWKWgKxY1k6SJUlqTtCEkaRObpLk3ubl+J9pAmmCDHgj35Dv3/L7f/X2/7xyMaozZ2Vk+l8tN0XmxWNzldDrT6D3G6OhRXo2bHmGMGJQWew6dvFqFx9TaCCSOcxy3WaFQbGEY5hv0nkPDNJ9oaDTamw0fbMEN/Mla71QRGR8fZzHG55uampR6vV4BRM7S2LuSGB8ZYQlhv9u6vY90be9nCGbP0di6RCwWywAhhNdoNIjneQRzArGv3pVIpG1xQKlQ8G2tbchkakEanY6LWONVeNjn8/0GCnwhyzK/GmxpaVnWarU6Os9ms2I0GlWUN2Ccg8c9IPl1e3t7bi3gzeunf8cM3luUpPKeT/o+FTZu3Kyk83B4Tpq49y8pK0GIKMvFu9jv90cNBoMJEtf1hZlMBsXj8aQkSdZaJr71y1Bs546PjTabrS68YPAF+m9y8iXUj3y2uLh4XxCEBvAE/eKaG0AxtLS0hJaXlzOwp6+zs7NmJ3FK1u3xPH4Qi0W0Pa4uBOrUxivK6MlTL5qbC61wStJbesvr9WqhS+5Ago9MJhNh2UovFQoFFIvFQARpOp1O97tcruTbvvL2lW+1KqPuLsuR7v5eF9Go+Yr1bDaH7k8+lVZyQiCREXoHB39KVtANBAJBUMW6tkxvypGIRCIWt9tdqNeoYzeGg93bbNZ2m6myHOE4mno0k9DPNFrcIyOFiq4BVbpBfgvtlrVDrVbTR6PZbO6pl8Svo0PdoL7lQ6uxaq11g566vnG+NdFT1b5QmgtwdnCrHkmlUqUf9QaN6XQ66qfv6yWi4siFrY42jpDXKQLPF5AvMF/yBo1tsplZtVpRxitlnZ6etkEyn9VqVdHE4Ic8mHcWlgTwiwN8Qw85FAqF6Lni6Ojo8L+NxM3RIRthZN/+fTtVhYKEHjx8lk+msiU8jVrp2LXDzlIyf/wFtwgjO44MXvavKrIbjvM49UI4HBbz+fxF8IMTOqML7pozCwsLAl1TqVRBMOzn66khS8XdRr0u/iIUR3/+/URMvVy52Py8wXlg4McuISed+efO/0J4PoEs5uYgLjIlPPbNxTYD94tBFMUJ+Dtst9unVkFhfsnj8YxBma4BiT2gjHfdumA8E42lDMlkdiIvisMHj10u4315+IdLN34+Nebzz18ThPweSF7CeyXAAFoogvWsxuyAAAAAAElFTkSuQmCC);
			background-position:0 0;
			background-repeat:no-repeat;
			cursor:pointer;
		}

		div.post_star.starred {
			background-position:-20px 0;
		}

		#starred_pane div.starred_header {
			margin: 16px 21px 20px 21px;
			font: 18px arial,sans-serif;
			color: #333;
			max-width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		div.minipost {
			cursor:pointer;
			margin-left:20px;
			margin-right:20px;
			padding:15px;

			background-color:#FFF;
			margin-bottom:18px;
			border-radius:4px;

			border-top:1px solid #DDD !important;
			border-left:1px solid #DDD;
			border-bottom:none !important;
			box-shadow: 1px 1px 1px #AAA;
		}
		div.minipost img {
			float:left;
			border-radius:2px;
			box-shadow: 1px 1px 1px rgba(0,0,0,.4);
			margin-right:12px;
		}
		div.minipost:hover {
			background-color:#edeff4;
		}
		div.minipost div.post_star {
			position:static;
			float:right;
			background-position:-20px 0;
		}
		div.minipost div.post_star.starred {
			display: none;
		}
*/}
	setCSSFromFunction(starred_css);

	$(update);
});
