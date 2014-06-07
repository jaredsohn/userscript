// ==UserScript==
// @name        Medusa-kontrol-tlf
// @description Medusa-kontrol-tlf
// @include     http://medusa.regionh.dk/*
// @include     http://medusa.regionh.dk/*
// ==/UserScript==



//alert ("Script start.");
var txtAnswerToQuestionID_1    = document.getElementById ("txtAnswerToQuestionID_1");

var txtCustomerTel    = document.getElementById ("txtCustomerTel");
if (txtCustomerTel.value) {
    alert ("tlf was there!")
}
else {
    txtCustomerTel.value  = txtAnswerToQuestionID_1.value + "inserted";
}