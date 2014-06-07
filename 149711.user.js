// ==UserScript==
// @name           Send torrent to ruTorrent WebUI
// @namespace      auspexpt - http://userscripts.org/users/67937
// @include        *
// @require        http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==

//TODO: magnets, clean code, use more jquery, ajaxSendRequest

$(document).ready(function () {
	if (unsafeWindow.console) {
		var GM_log = unsafeWindow.console.log;
	}
	var rutorrent_url = ""; // for example : "https://example.net:8081"
	var username = "";
	var password = "";
	var start_stopped = true;

	var sites = {
		'isohunt': 'isohunt\\.com/download/',
		'bt-chat': 'bt-chat\\.com/download1\\.php\\?',
		'torrentreactor': 'dl\\.torrentreactor\\.net/download.php\\?',
		'mininova': 'mininova\\.org/get/',
		'mininova-tor': 'mininova\\.org/tor/',
		'torrentspy': 'torrentspy\\.com/download.asp\\?',
		'mybittorrent': 'mybittorrent\\.com/dl/',
		'bushtorrent': 'bushtorrent\\.com/download\\.php\\?',
		'partis': 'partis\\.si/torrent/prenesi/',
		'thebox': 'thebox\\.bz/download.php/',
		'tvtorrents': 'tvtorrents\\.com/loggedin/torrent\\.do\\?info_hash=',
		'demonoid': 'demonoid\\.com/files/download/',
		'slobytes': 'slobytes\\.net/download\\.php/',
		'hdbits': 'hdbits\\.org/download\\.php\\?',
		'sdbits': 'sdbits\\.org/download\\.php\\?',
		'acehd': 'acehd\\.net/download\\.php\\?',
		'sceneaccess': 'sceneaccess\\.eu/download/',
		'tribalmixes': 'tribalmixes\\.com/download\\.php\\?',
		'scenerush': 'scene-rush\\.com/download\\.php\\?',
		'torrentleech': 'torrentleech\\.org/download/',
		'general': '\\.torrent$',
	};
	var cookies = {
		'partis': { 
			'auth_token': null 
		},
		'thebox': { 
			'uid': null, 'pass': null 
		},
		'demonoid': {
			'uid': null, 'uhsh': null
		},
		'slobytes': {
			'uid': null, 'pass': null
		},
		'hdbits': {
			'uid': null, 'pass': null
		},
		'sdbits': {
			'uid': null, 'pass': null
		},
		'acehd': {
			'uid': null, 'pass': null
		},
		'tribalmixes': {
			'PHPSESSID': null, 'uid': null, 'pass': null
		},
		'sceneaccess': {
			'uid': null, 'pass': null
		},
		'scenerush': {
			'uid': null, 'pass': null
		},
		'torrentleech': {
			'PHPSESSID': null, 'member_id': null, 'pass_hash': null
		},
	};

	var images = {
		'base': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAANCAYAAACZ3F9/AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDcvMzAvMTJrz/NTAAACAUlEQVQokXWPPUxTYRiFn6/3tnjb4ICFFChoUoFKSGSzagJKojHBCSY2VxdlYGGRQXeDi4ORqIsmhtloYhQVBkkIOCCgplKJGEGh/PTv9t7jICbF6LO9J+85Ocfcul3sXk7bdz+nTaJQEJ5vcF3wPKiuNoRCYmsbSkVwHKg+WJ7HvLtk1cWuvZqYsA+/njAmm4WgDfUxEW8UMzMlpiZtmhqhvV1sbvgsLdmH7KB1lhOnSkq0SEND0uSkp1zOl+RL8jQy8l69vbsql7VHSVeubvotyXWRaHV1/caOpJIq8X1pbW1XuZy3T19Y+OofbX1ZDtTUWDx6uMPY2AcqMQaiUQfHKe3Tv6ysUCisGrp7XIGrVCorya3I9jQ6+kL9/U+0sbEuqajZ2SmlTj7wW5Jpz5bADtpYVgRQRbZIp0OMj3cyPb1Cbe1zPn0MgXWRtqSFvfeDZfmA2VcrHLaBIJlMB5lMBwCxBvD9NQIA5bKoqwN+n39WEotVAQX+gQJbWeg6YxgeDv5lDNDXl2Bw0CEer3Bor2Jbu6d797f1f3IaGHgjKAik+gb5p7uyMj3ntpctk493Hl8MJI9BOGJjBK7rk83mmJ37zrOnR8jnU1h2QPWNniKRtz9Nd8/N88XihTur36qad7YWMSYLxkeygDCO00w02oRt5wlVHRCa+7E4f/nxLypMPev0B8piAAAAAElFTkSuQmCC',
		'ok': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAANCAYAAACZ3F9/AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDcvMzAvMTJrz/NTAAACEklEQVQokWWMO0xTYRxHz/fd294LNC2PFgIiKqQJGh2MJkocIDHxMbg6qpsuxsS4OrhoZDBuDmp0cEENmhhdJK6SqCgoGHmoQBtaeZVSmrb33u/vhICc8eR3fmpw6UH3CumHOTPb4ZkyYAjwEAIcHUETomIK+OIRUi4hUzP257t3QfVnr0zPyXDrH39C16g4UauFWqsVV9Xya+09OT3NLucICSvJkjdDXlLGXk5M2fP+ZJuvK3RFLtLpnKI5vJ+QckHg+XQvtY3fOBd/jFYWgSe8ylxX4+pdkrupLnmbuSN+xchmjDGyvLogZb+4xf9M/TBXXxz2dbVdx6eFlwyMPmEzSiliNfVoz93i06lZctmi0ra4FCKTTET7ML78G4gR+gbucfv1eZYWlwkqwsfBzzwdusWeQ1FsQbBtG8extzyLwKqeJb93gN6vxylORcnp37T3uNQ7HWysRfM/jl2NDkE4mcVJZqkDIroOL2fQAIH4RHQctalVCmJVjfhl2XYIiF0yBdqdo3THLqO02gi14ljnGVQxzQRvyAdz6w0gaKNK7OMsLeED227j0RZOx26ghg/il9etxnEcy3YrTTND+f7WkS+jOhHqwLWrERS+8Sis5ZnKjLCQ+ECT04CtLYmQkPlxf1FdunnyxO4edb9kzbelJ1corwoYUJYQqlI07IjQvDNOULJw3bBkxrzFR9eGnv0F+cj4+Cl2nLsAAAAASUVORK5CYII=',
		'nok': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAANCAYAAACZ3F9/AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDcvMzAvMTJrz/NTAAACGUlEQVQokWWNPUxTURiGn3Puae9twRJqqQEVUQJCogPRQSchJioxOhjj6E8cjIOLYXVwkcSBxIkBTTRxIQ46qHEgDBoVB0F+hGhqLH+BxgIFSi1t7/lclIA84/u97/OpxScPT5CafWTnputtYR18C6Ui+D66rBwCAWw2i5SKKNfDhsrGJ3LFq87t5v1v/aGBfYUvn5RdW0UZg66Ko3dVszYxgj/6GVNTgznQiJ9dRqZ+7nSMaTOlZKJWFwuUX76B23aGYNMhlOshwOSD+8QTY8QePEY5DkUR5jvvKPWuv4GZ9uMy390lBWtlM9ZaWU2npfQ7tyWf+f7NPm89WtKmopL0mxd87X3KZpRSlEWjFIPelnxmeppUNqe0eB7lyQSRl72URDYKVoS+nm5e3bzCwtISBSsMDA0x2NXJkWgEgwjGGFxjtpgF0HPTNH/sY/TCSX6EIujZJK1hD7euno22aM3/mFCYgIKGTIqGTAo06HAlGd+iAcQvoaMxNk8VEIrFWbeyTQiIsbksbssxKq7fQiu1cdFK0dR+jlx6Fvpf46fm/k4ERNAqn4fzlwg2H96mjVTXUNFxl+HGFtb/PXY0rus6Knnt4mRe6z1TdQd1oK4e44VBK2ypyNrKCvNjI1QNvqfFWLR2hGhchq1ZVPfOnj7V6qkeZ+FXbSKzzKoVrICDENKK3TvK2VsVI68dvEBQxvPFhY4Pg8/+AA5G+DlOhmXOAAAAAElFTkSuQmCC',
		'loading':'data:image/png;base64,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',
	};


	$('a').each(function (index) {
		var href = $(this).prop("href");
		var validLink = checkLink(href);
		if (validLink) {
			$(this).parent().append($("<a>")
				.css({verticalAlign: 'middle', lineHeight: '20px', marginLeft: '5px'})
				.attr("title", 'Download using ruTorrent WebUI')
				.attr("href", "#")
				.append($("<img>")
					.attr("src", images['base'])
					.css({border: 'none',})
					.click(function (event) {
						$(event.target).attr("src", images['loading']);
						event.preventDefault();
						GM_xmlhttpRequest({
							method: "GET",
							url: validLink,
							onload: function (response) {
								if(response.responseText.match(/success/gi)){
									$(event.target).attr("src", images['ok']);
								}else{
									$(event.target).attr("src", images['nok']);
									$(event.target).attr("title", "Error while sending torrent to ruTorrent: " + response.responseText);
								}
							},
							onerror: function (response) {
								$(event.target).attr("src", images['nok']);
								$(event.target).attr("title", "Error while sending torrent to ruTorrent: " + response.responseText);
							}
						});
					})
				)
			);
		}
	});


	function checkLink(link) {
		var matched = false;
		var sitefound = false;
		for (var site in sites) {
			var regex = new RegExp(sites[site]);
			if (link.match(regex)) {
				matched = link;
				console.log("URL %s matched regex %s!", link, regex);
				sitefound = site;
				break;
			}
		}
		if (matched) {
			var url = rutorrent_url + "/php/addtorrent.php?url=" + link;
			url = url.replace(/http?s/g, "http");
			url+=getCookies(sitefound);
			if (start_stopped) url += "&torrents_start_stopped=1";
			console.log("Cookies for site %s are: %s", sitefound, getCookies(sitefound));
			console.log("Full url: " + url);
			return url;
		} else {
			return false;
		}
	}


	function getCookies(site) {

		var names = cookies[site];
		if (!names) return '';
		var sitecookies = {};
		var exist = false;
		for (var name in names) {
			var value = names[name];
			if (!value) value = readCookie(name);
			if (value) {
				sitecookies[name] = value;
				exist = true;
			}

		}
		if (!exist) return '';
		var first = true;
		var result = ':COOKIE:';
		for (var name in sitecookies) {
			var value = sitecookies[name];
			var cookie = name + '=' + value;
			if (!first) result += ';';
			result += cookie;
			first = false;
		}
		return result;
	}

	function readCookie(name) {
		name += '=';
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
		}
		return null;
	}

});