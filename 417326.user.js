// ==UserScript==
// @name       DD Fiat
// @require    http://code.jquery.com/jquery-latest.min.js
// @match      https://doge-dice.com/*
// @copyright  2014+, 1@wa.vg
// @version    2.7.8
// @updateURL  http://userscripts.org/scripts/source/417326.user.js
// ==/UserScript==
// 17AKDJCyzrRMERYxpgsfCcALrvKh4XmSoT for btc donations
// DDdDDdnka1qobRnqBXU1PzRvcw9k9PStxR for doge donations
scriptx = document.createElement("script"),
scriptx.innerHTML = update_investment;
document.body.appendChild(scriptx);

script = document.createElement("script"),
script.innerHTML = update_my_stats;
document.body.appendChild(script);


sym="$" ;
cur='USD'; // change to your currency


$($($('.chatstat').children(0)[0]).children(0)[0]).append('<tr><th>Bter</th><td><span class="investment1">Loading...</span></td><td><span class="invest_pft1">Loading...</span></td><td></td><td><span class="worth1">Loading...</span></td><td><span class="wagered1">Loading...</span></td><td><span class="myprofit1">Loading...</span></td></tr>');

$($($('.chatstat').children(0)[0]).children(0)[0]).append('<tr><th>Cryptsy</th><td><span class="investment3">Loading...</span></td><td><span class="invest_pft3">Loading...</span></td><td></td><td><span class="worth2">Loading...</span></td><td><span class="wagered3">Loading...</span></td><td><span class="myprofit3">Loading...</span></td></tr>');


function upd1() {
	$.get('http://tilde.pw/bot/dogecny.php', function (data) {
		var j = parseFloat(data.last);
		z = j;
        $.get('http://tilde.pw/bot/json.php', function (data) {
            var j = parseFloat(data[cur])/parseFloat(data.CNY);
            z *= j;
        });
	});
}
setInterval(upd1, 30000);
upd1();


sym2='฿';
function upd2() {
	$.get('http://tilde.pw/bot/capi.php', function (data) {
		var j = parseFloat(data.return.markets.DOGE.lasttradeprice);
		y = j;
	});
}

setInterval(upd2, 30000);
upd2();
function update_investment(i, p, pft) {
	$(".investment1").html(sym + commaify((parseFloat(z) * investment).toFixed(8)));
	if (pft !== null) $(".invest_pft1").html(sym + commaify((parseFloat(z) * pft).toFixed(8)));
	$(".investment3").html(sym2 + commaify((parseFloat(y) * investment).toFixed(8)));
	if (pft !== null) $(".invest_pft3").html(sym2 + commaify((parseFloat(y) * pft).toFixed(8)));
	$(".investment").html(commaify((investment = i).toFixed(8)));
	if (pft !== null) $(".invest_pft").html(commaify((pft).toFixed(8)));
    $(".invest_pct").html(commaify((invest_pct=p).toFixed(6)+"%"));
	$(".worth2").html((parseFloat(1000000*y).toFixed(2)).toString()+ 'μ' + sym2 + '/Ɖ');
	$(".worth1").html(sym + (parseFloat(1000*z).toFixed(6)).toString()+'/kƉ');
}
function update_my_stats(bets, wins, losses, luck, wagered, profit) {
	$(".bets").html(commaify(bets));
	$("#luck").html(luck);
	$(".wagered").html(commaify(wagered));
	$(".myprofit").html(commaify(profit));
	$(".wagered1").html(sym + commaify((parseFloat(z) *wagered).toFixed(8)));
	$(".wagered3").html(sym2 + commaify((parseFloat(y) *wagered).toFixed(8)));
	$(".myprofit1").html(sym + commaify((parseFloat(z) *profit).toFixed(8)));
	$(".myprofit3").html(sym2 + commaify((parseFloat(y) *profit).toFixed(8)));
	if (wins !== null) {
		$("#wins,#wins2").html(commaify(wins));
		$("#losses,#losses2").html(commaify(losses))
	}
}