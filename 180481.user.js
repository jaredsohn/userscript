// ==UserScript==
// @name         eSim Friendlist Remover
// @namespace    eSim Friendlist Remover
// @description  This script make you easy to remove your dead friend from list.
// @version      1
// @author       calin
// @include      http://*.e-sim.org/profile.html?id=*
// @icon         http://e-sim.home.pl/eworld/img/favicon.png
// ==/UserScript==

var main = function () {
	// eSim Friendlist Remover
	$(document).ready(function(){
		if ($('.testDivred').length == 1 && $('#container .column-margin-both > .testDivblue:first > div:last > a').length == 0) {
			var fr=$('#container tbody tr td[valign="top"] .testDivwhite:eq(2):has(b.biggerFont)');
			for (j=0; j<fr.find('div[style^="float:"]').length; j++) {
				var t=fr.find('div[style^="float:"]').eq(j);
					t.append('<div class="hitInfl rmFriend" title="Remove Friend" style="cursor:pointer;">Remove</div>');
			}
			$(".hitInfl.rmFriend").click(function() {removeFriends($(this))});			
		}
		function removeFriends(element) {
			var tp=element.parent(),
				tName=tp.find('a[href^="profile.html?id="]:first')[0].textContent,
				tId=tp.find('a[href^="profile.html?id="]:first').attr('href').split('?id=')[1];
			var rmUrl='friends.html?action=DELETE&id='+tId;
			if (confirm('Are you sure to REMOVE this friend, '+tName+' ?')) {
				var win=window.open(rmUrl, '_blank'); win.focus();
			}
		}
	})
}
var script = document.createElement('script');
	script.type = "text/javascript";
	script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);