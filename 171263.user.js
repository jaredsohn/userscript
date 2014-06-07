// ==UserScript==
// @name           twitter-add-mylist-navigation
// @namespace      http://twitter.com/hongo
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @version        0.3
// @description    Add my list navigation on Twitter
// ==/UserScript==
(function(){
	
	var myListHtml = '';
	var oldTitle = '';
	var timer;
	
	function watch(){
		if (oldTitle == window.document.title){
			return;
		} else {
			writeMyListHtml();
			oldTitle = window.document.title;
		}
	}
	
	function createMyListHtml(){
		var listInfoUrl = document.body.innerHTML.match(/<a href="(.+?)" data-nav="all_lists"/);
		if (!listInfoUrl || 0 == listInfoUrl.length){
			return;
		}
		GM_xmlhttpRequest({
			method: "GET",
			url: listInfoUrl[1],
			headers: {
				"Accept": "text/html"
			},
			onload: function(response){
				var res;
				var listInfo = [];
				var regexp = /<a class="ProfileListItem-name js-list-link js-nav" href="(.+?)">(.+?)<\/a>|<a class="js-list-link js-nav" href="(.+?)">[^<]*<strong>(.+?)</mg;
				while(res = regexp.exec(response.responseText)){
					listInfo.push({'url':res[1],'name':res[2]});
				}
				if (0 == listInfo.length){
					return;
				}
				var navHtml = [];
				navHtml.push('<div class="module" id="____mylistnavi">');
				navHtml.push('<div class="flex-module">');
				navHtml.push('<div class="flex-module-header">');
				navHtml.push('<h3>My Lists</h3>');
				navHtml.push('</div>');
				navHtml.push('<div class="flex-module-inner">');
				var listHtml = [];
				for(i=0,max=listInfo.length;i<max;i++){
					listHtml.push('<a href="'+listInfo[i].url+'">'+listInfo[i].name+'</a>');
				}
				navHtml.push(listHtml.join(', '));
				navHtml.push('</div>');
				navHtml.push('</div>');
				navHtml.push('</div>');
				myListHtml = navHtml.join('');
				//writeMyListHtml();
				timer = setInterval(watch, 700);
			}
		});
	};
	
	function writeMyListHtml(){
		if (document.getElementById('____mylistnavi')){
			return;
		}
		var newDiv = document.createElement('div');
		newDiv.innerHTML = myListHtml;
		var d = document.getElementsByClassName('dashboard');
		d[0].insertBefore(newDiv, d[0].children[1]);
	};
	
	createMyListHtml();
})();