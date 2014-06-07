// ==UserScript==
// @name           PyWeek entry counter
// @namespace      http://userscripts.org/scripts/show/57450
// @include        http://pyweek.org/*/entries/
// ==/UserScript==

var xp = document.evaluate(
	'//tr/th/span', 
	document.getElementById('content'), 
	null,
	6,
	null)
var rated = 0, unrated = 0, total = 0

for (var i = 0; row = xp.snapshotItem(i); i++) {
	total++
	if (row.innerHTML == 'not rated')
		unrated++
	if (row.innerHTML == 'rated')
		rated++
}

elem = document.createElement('div')
elem.innerHTML = rated + '/' + unrated + ' (' + total + ')'
with (elem.style) {
	position = 'fixed'
	top = 0
	right = 0
	padding = '0.5em'
	margin = '0.5em'
	border = '1px solid black'
	backgroundColor = '#ffdd77'
}
body = document.getElementsByTagName('BODY')[0]
body.appendChild(elem)

