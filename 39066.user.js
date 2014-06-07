// ==UserScript==
// @name           Popodeus Repair Locales
// @description    Quickly repair a locale in Popmundo.com from the locales overview page
// @namespace      http://popodeus.com
// @include        http://www*.popmundo.com/Common/Company.asp?action=ListLocales&CompanyID=*&SortCriteria=Condition
// @version        2
// @copyright      Seppo Vuolteenaho
// ==/UserScript==

var version = 2;
var MSG_IMPROVE = 'Improve quality';
var MSG_DONE = 'Done!';

window.addEventListener('load', function() {
	function backgroundClick(evt) {
		var target = this;
		if (target.innerHTML != MSG_DONE) {
			var r = new XMLHttpRequest();
			r.open('GET', this.href, true);
			r.onreadystatechange = function() {
				if (r.readyState == 4 && r.status == 200) {
					target.innerHTML = MSG_DONE;
				}
			}
			r.send(null);
		}
		evt.stopPropagation();
		evt.preventDefault();
	}

	for (var index = 1; index < document.links.length; index++) {
		var a = document.links[index];
		var previous_a = document.links[index - 1];
		// Scoring link is
		//http://www*.popmundo.com/Common/Rules.asp?action=Scoring&Word=21
		var valid = (a.href.indexOf('Rules.asp?action=Scoring&Word=') >= 0);
		if (valid) {
			var score = a.href.match(/Word=(\d+)/)[1];
			if (score <= 21) {
				// Previous link
				// http://www*.popmundo.com/Common/Locale.asp?action=view&LocaleID=*
				var locale_id = previous_a.href.match(/LocaleID=(\d+)/)[1];
				a.href = 'Company.asp?action=ImproveStateConfirm&LocaleID='+locale_id
				a.innerHTML = MSG_IMPROVE;
				a.addEventListener('click', backgroundClick, true);
			}
		}
	}
}, true);