// ==UserScript==
// @name          GitHub Show Repo Issues
// @namespace     github-show-repo-issues
// @description   Show repo issues count on the repositories page (https://github.com/:user)
// @version       1.2
// @include       https://github.com/*
// @author        Rob Garrison >> http://github.com/Mottie
// ==/UserScript==

var main = function () {
	"use strict";
	// look for repo tab
	if ( $ && $('.tabnav-tabs').find('li[data-tab="repo"]').length ) {
		var flag = false, getIssues = function(){
			if ( $('.repolist').length && !$('li.issues').length ){
				flag = true;
				// api v3: https://api.github.com/repos/:user/:repo/issues?state=open
				var api = 'https://api.github.com/repos',
					style = 'ul.repo-stats li.issues { padding-left: 18px; background: url("https://github.com/Mottie/Github-show-repo-issues/raw/master/images/bug.png") no-repeat 5px 1px !important; }',
					// don't include the .simple lists (the ones without the participation graph)
					forks = $('.repolist').find('li.public:not(.simple)').find('li.forks'),
					len = forks.length - 1;
				$('body').append('<style>' + style + '</style>');
				forks.each(function(i){
					var $this = $(this),
					// <li class="forks"><a href="/:user/:repo/network" title="Forks"><span class="mini-icon fork"></span> 1 </a></li>
					repo = $this.find('a').attr('href').replace(/network/g,'');
					$.getJSON(api + repo + 'issues?state=open&callback=?', function(data) {
						if (data && data.data) {
							$this.after('<li class="issues"><a href="' + repo + 'issues" title="Issues">' + (data.data.length || 0) + '</a></li>');
						}
						// clear flag so ajaxStop will work again
						if (i >= len) { flag = false; }
					});
				});
			}
		};
		$(document).ajaxStop(function() {
			// check for selected repo tab
			if (/tab=repositories/.test(window.location.search) && !flag) {
				getIssues();
			}
		});
		getIssues();
	}
};

// Inject our main script
// Chrome seems to inject the script on all pages, so lets check first
if (/github\.com/.test(window.location.href)) {
	var script = document.createElement('script');
	script.textContent = '(' + main.toString() + ')();';
	document.body.appendChild(script);
}
