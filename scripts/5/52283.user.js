// ==UserScript==
// @name           Rapid Donate
// @author         Endy
// @namespace      DeNada
// @description    Rapidly transfer money
// @include        http://www.erepublik.com/en/citizen/donate/*
// @include        http://www.erepublik.com/en/organization/donate/*
// ==/UserScript==

for(var i=0; i < 100; i++) {

var donate = 'donate_sum_'+i;

var left = 'sum_in_account_'+i+'_span';

var right = 'sum_in_account_'+i+'_sup';

document.getElementById(donate+'').value = document.getElementById(left+'').innerHTML + document.getElementById(right+'').innerHTML;
}

