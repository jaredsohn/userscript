// ==UserScript==
// @name					 Punch Fansub - Fast Download Links
// @namespace			 http://userscripts.org/users/wilkerlucio
// @description		 Show download links direct in page (no need to open a popup page to see download links)
// @include				 http://www.punch-fansub.com.br/paginas/projetos/*
// ==/UserScript==

run_script = function() {
	var download_list = [];
	var total = 0;
	var loaded = 0;
	var check = function() {
		if (total > 0 && loaded == total) {
			display_download_list(download_list);
		}
	};
	
	$("div#epBox").each(function() {
		total++;
		var self = $(this);
		var content = self.html();
		var url = content.match(/http:\/\/www\.punch-fansub\.com\.br\/download\.php\?id=\d+&amp;tipo=[^']+/)[0].replace("&amp;", "&");
		var episode = self.find("div.epNumero").html();
		
		$.ajax({
			url: url,
			
			success: (function() {
				var current_box = self;
				
				return function(data) {
					var tmp = document.createElement("div");
					tmp.innerHTML = data;
					
					var hosts = [];
					var links_row = [];
					var matches = null;
					
					$(tmp).find("#links div div div").each(function() {
						var host_name = this.innerHTML;
						var download_url = $(this).next("ul").find("a").attr("href");
						matches = null;
						
						if (matches = download_url.match(/.+(http[^&]+)/)) {
							download_url = matches[1];
						}
						
						links_row.push({host: host_name, url: download_url});
						
						hosts.push('<a href="' + download_url + '">' + host_name + '</a>');
					});
					
					download_list.push({name: episode, links: links_row});
					
					loaded++;
					check();
				}
			})(),
			
			dataType: 'text'
		})
	});
};

display_download_list = function(episodes) {
	var tabs = {};
	
	episodes = episodes.sort(function(a, b) {
		return a.name > b.name ? 1 : (a.name < b.name ? -1 : 0);
	});
	
	for(var i = 0; i < episodes.length; i++) {
		var episode = episodes[i];
		
		for (var x=0; x < episode.links.length; x++) {
			var link = episode.links[x];
			var h = link.host.toLowerCase();
			
			if (!tabs[h]) tabs[h] = [];
			tabs[h].push({name: episode.name, url: link.url});
		};
	}
	
	for (host in tabs) {
		var container = document.createElement("div");
		container.innerHTML = "<b>" + host + "</b><br /><br />";
		container.style.marginBottom = "13px";
		
		for (var k=0; k < tabs[host].length; k++) {
			var ep = tabs[host][k];
			
			container.innerHTML += ep.name + ' - <a href="' + ep.url + '">' + ep.url + '</a><br />';
		};
		
		$("div#center:last").append(container);
	}
};

// load jquery and run when its loaded
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-1.4.2.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

GM_wait = function() {
	if(typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait,100);
	} else {
		$ = unsafeWindow.jQuery;
		run_script();
	}
}

GM_wait();