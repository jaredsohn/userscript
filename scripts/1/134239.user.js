// ==UserScript==
// @name        TableSummator
// @namespace   userscripts.org
// @include     https://fx-trend.com/my/pamm_investor/accounts/
// @include     https://fx-trend.com/my/pamm2_investor/accounts/
// @version     1
// ==/UserScript==

var bl = document.getElementById('investors_block')
bl.style.display = 'block'
var table = bl.getElementsByClassName('my_accounts_table')[0]
var trs = table.getElementsByTagName('tr')

var total = {
	deposit: 0,
	availsum: 0
}
for(var i=1; i<trs.length; i++) {
	if(~~i%2==1) {
		var tds = trs[i].getElementsByTagName('td')
        	total.deposit += parseFloat(tds[6].innerHTML)
        	total.availsum += parseFloat(tds[7].innerHTML)
	}
}
var row = table.insertRow(-1).innerHTML = "<td></td><td></td><td></td><td></td><td></td><td></td><td><b>"+total.deposit.toFixed(2)+"</b></td><td><b>"+total.availsum.toFixed(2)+"</b></td><td><b>"+(total.availsum/total.deposit*100-100).toFixed(2)+"</b></td>"