// ==UserScript==
// @name           Stack Exchange Reputation Audit Helper
// @namespace      yijiang
// @include        http://stackoverflow.com/reputation
// @include        http://meta.stackoverflow.com/reputation
// @include        http://superuser.com/reputation
// @include        http://serverfault.com/reputation
// @include        http://askubuntu.com/reputation
// @include        http://answers.onstartups.com/reputation
// @include        http://stackapps.com/reputation
// @include        http://*.stackexchange.com/reputation
// ==/UserScript==

(function(){
	function json (data) {
		var sites = data.api_sites,
			list = document.createElement('div');
		
		list.innerHTML = "more reputation: <br>";
		list.style.position = 'absolute';
		list.style.top = 0;
		list.style.left = '40em';
		list.style.fontFamily = 'Ubuntu, Arial, sans-serif';
		list.style.lineHeight = '1.8em';
		
		document.body.appendChild(list);
		
		for(var i = 0; i < sites.length; i++) {
			// Exclude SE 2.0 linked Metas
			if(sites[i].state !== 'linked_meta') {
				var a = document.createElement('a'),
					icon = document.createElement('img');
				
				// Include the favicon in the link
				icon.src = sites[i].icon_url.replace('apple-touch-icon.png', 'favicon.ico');
				icon.style.border = '0';
				icon.style.verticalAlign = 'middle';
				icon.style.paddingRight = '3px';
				
				a.href = sites[i].site_url + '/reputation';
				a.style.color = '#999';
				a.style.display = 'block';
				
				a.appendChild(icon);
				a.innerHTML += sites[i].name;
				
				// Stick ya links in the pre element
				list.appendChild(a);
			}
		}
	}
	
	function spaces (n) {
		return new Array(n + 1).join(' ');
	}
	
	var voteTypesComplex = {
		1: {
			15: 'your answer accepted',
			2: 'answer accepted by you'
		},
		3: {
			'-1': 'downvote by you',
			'-2': 'downvote to you'
		}
	}, voteTypeSimple = {
		2: 'upvote',
		4: 'penalty for post flagged as offensive',
		8: 'bounty granted by you',
		9: 'bounty awarded to you',
		12: 'penalty for post flagged as spam'
	};
	
	var pre = document.getElementsByTagName('pre')[0],
		html = pre.innerHTML,
		lines = html.split(/\n/g),
		maxLen = Math.max.apply(Math, lines.filter(function(c){
			return !c || !!c.split(/\s/g)[1].match(/^(1|2|3|4|8|9|12)$/);
		}).map(function(c){
			return c.length;
		}));
	
	for(var i = 0; i < lines.length; i++) {
		var chunks = lines[i].split(/\s+/g);
		
		if(chunks.length > 3) {
			if(chunks[1].match(/^(1|3)$/)) {
				console.log((/^[([](-?\d+)[)\]]$/).exec(chunks[3]), chunks[3]);
				chunks.push(voteTypesComplex[chunks[1]][(/^[([](-?\d+)[)\]]$/).exec(chunks[3])[1]]);
			} else if(chunks[1].match(/^(2|4|8|9|12)$/)) {
				chunks.push(voteTypeSimple[chunks[1]]);
			}
			
			if(!isNaN(chunks[1])) {
				lines[i] = spaces(1) + chunks[1] + spaces(2) + chunks[2] + spaces(8 - chunks[2].length) + chunks[3] + spaces(maxLen - lines[i].length + 3) + chunks[4];
			}
		}
	}
	
	html = lines.join('\n');
	/*
	// explain the various status codes
	for(var i in voteTypeSimple) {
		var search = new RegExp('^(\\s*' + i + '\\s+.*$)', 'gm');
		html = html.replace(search, '$1   ' + voteTypeSimple[i]);
	}
	
	for(var i in voteTypesComplex) {
		var search = new RegExp('^(\\s*' + i + '\\s+\\d+\\s+\\(' + voteTypesComplex[i].rep + '\\)$)', 'gm');
		html = html.replace(search, '$1   ' + voteTypesComplex[i].text);
	}*/
	
	// link the question/post id
	html = html.replace(/^\s*(1|2|3|4|8|9|12)\s*(\d+)/gm, " $1   <a href='http://" + window.location.host + "/q/$2'>$2</a>");
	
	pre.innerHTML = html;
	
	// Inject json function into page
	var script = document.createElement('script');
	script.innerHTML = json.toString();
	document.getElementsByTagName('head')[0].appendChild(script);
	
	// Grab site list from StackAuth
	var jsonScript = document.createElement('script');
	jsonScript.src = 'http://stackauth.com/1.0/sites?jsonp=json';
	
	document.getElementsByTagName('head')[0].appendChild(jsonScript);
})();