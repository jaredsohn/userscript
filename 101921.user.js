// ==UserScript==
// @name           homeMoney
// @namespace      homeMoney
// @description    homeMoney
// @include        http://homemoney.ua/*
// ==/UserScript==
var total = document.getElementById('ctl00_ctl00_Main_Main_accountView_lbAccountTotal');
var totalBox = total.parentNode.parentNode;
var plan = document.getElementById('ctl00_ctl00_Main_Main_lbPlanTransTotal');
var planVal = getVal(plan.innerHTML);
var sum = getVal(total.innerHTML) + planVal;
var box = document.createElement('div');
box.setAttribute("id","AccountTotalWithPlan");
box.className = "balance-box";
box.innerHTML = '<div class="name">Баланс с планом</div>' +
				'<div class="balance ' + (sum > 0 ? 'positive' : 'negative') + '">' +
				'<span>' + sum.toString().replace('.', ',') + ' </span>' +
				'<span class="cy">UAH</span>' +
				'</div>';
if(planVal != 0) {
	totalBox.parentNode.insertBefore(box, totalBox);
}

function getVal(val) {
	return parseFloat(val.replace(/[&nbsp;' ']/g, "").replace(',', '.'));
}