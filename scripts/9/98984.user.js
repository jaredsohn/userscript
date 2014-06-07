// ==UserScript==
// @name           No empty assigned to
// @namespace      redmine.lo.lan
// @include        https://redmine.lo.lan/projects/mambaru/issues/new
// @include        https://redmine.lo.lan/projects/mamba-uk/issues/new
// @include        https://redmine.lo.lan/projects/mambawap/issues/new
// ==/UserScript==

function initRedminePlugin(e, isChrome) {
	document.getElementById('issue-form').addEventListener('submit', function preSubitCheck(e) {
		var select = document.getElementById('issue_assigned_to_id');		
		if (!select.selectedIndex){
			if (!isChrome && confirm('Assign issue to you?')) {
				var id = document.getElementById('loggedas').lastChild.getAttribute('href').replace('/users/', '')
				for (i in select.options) {
					if (select.options[i].getAttribute && select.options[i].getAttribute('value') == id) {
						select.selectedIndex = i;
					}
				}
			} else {
				if (isChrome) {
					alert('Empty assigned to!');
				}
				e.preventDefault();
			}
		}
	}, false);
}

if (/chrome/.test( navigator.userAgent.toLowerCase())) {
	initRedminePlugin(null, true);
} else {
	document.addEventListener("DOMContentLoaded", initRedminePlugin, false);
}
