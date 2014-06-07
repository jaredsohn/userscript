// ==UserScript==
// @name    Final Test
// @description Final test results
// @include https://ekap.kik.gov.tr/*
// ==/UserScript==


alert ("Script start.");

var finTestInput    = document.getElementById ("ctl00$ContentPlaceHolder1$UcTakvim1$EkapDatePicker");
if (finTestInput) {
    finTestInput.value  = "15.08.2011";
}
else {
    alert ("The target input does not exist yet!")
}