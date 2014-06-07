// ==UserScript==
// @name           Neopets - Quick Deposit / Withdrawal
// @namespace      Backslash
// @description    Adds a button to automatically deposit NPs on hand or withdraw NPs in bank
// @include        *neopets.com/bank*
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/56533.user.js
// ==/UserScript==
var theButton = "There is no limit to the amount of Neopoints you can deposit at once (except for the amount of Neopoints you actually have on hand, of course).";
document.body.innerHTML = document.body.innerHTML.replace(theButton, '<div align="center" style="padding: 4px; background-color: #e4e4e4;"><input type="submit" value="Deposit NP on hand" id="depositGo"></div>');

var theButton2 = "If you withdraw Neopoints too many times a day, the bank staff may get angry and refuse to serve you! Withdraw wisely.";
document.body.innerHTML = document.body.innerHTML.replace(theButton2, '<div align="center" style="padding: 4px; background-color: #e4e4e4;"><input type="submit" value="Withdraw NP in bank" id="withdrawGo"></div>');

var depositButton = document.getElementById('depositGo')
var withdrawButton = document.getElementById('withdrawGo')

depositButton.addEventListener('click', depositClick, false);
withdrawButton.addEventListener('click', withdrawClick, false);

function depositClick()
{
var npsOnHand = getBetween(document.body.innerHTML,'NP: <a href="/objects.phtml?type=inventory">','</a>');
npsOnHand = npsOnHand.replace(',', '');
Bank.deposit({	
	"amount" : npsOnHand
});
setTimeout(function(){document.location = location.href}, 250);
}

function withdrawClick()
{
var yourFullbalance = window.document.evaluate("//td[@class='content']/div[@align='center']/table/tbody/tr/td[2]/table/tbody/tr[2]/td[2]", document, null, 8, null).singleNodeValue.innerHTML;
var finalbalance = yourFullbalance.replace(",", "")
finalbalance = finalbalance.replace(" NP", "")
if (document.body.innerHTML.match('<b>Enter your'))
{
Bank.withdraw({
	"amount" : finalbalance,
	"pin" : document.getElementById('pin_field').value,
	"onsuccess" : function(params)
	{
		if (!params.error || params.message)
		{
			alert(params.message && params.message.textContent || "NPs in bank were successfully withdrawed.") || setTimeout(function(){document.location = location.href}, 250);
		}
		else
			alert('Unknown error');
	}
});

}
else
{
Bank.withdraw({
	"amount" : finalbalance,
	"pin" : "1234",
	"onsuccess" : function(params)
	{
		if (!params.error || params.message)
		{
			alert(params.message && params.message.textContent || "NPs in bank were successfully withdrawed.") || setTimeout(function(){document.location = location.href}, 250);
		}
		else
			alert('Unknown error');
	}
});
}
}

function getBetween(target_str, start_str, end_str, start_pos, include_str) {
	if (!start_pos) 0;
	if (!include_str) false;

	var result_str = target_str.substr(start_pos);
	result_str = result_str.substr(result_str.indexOf(start_str) + start_str.length);
	result_str = result_str.substr(0, result_str.indexOf(end_str));

	if (include_str == true) {
		result_str = start_str + result_str + end_str
	}

	return result_str;
}