// ==UserScript==
// @name           Credit Card Helper
// @namespace      MyPRGenie Forms Helpers
// @description    Automatically fill in form of Credit Card
// @include        https://staging.myprgenie.com/payment/subscribe?subscription_package=*
// @include        https://localhost:3000/payment/subscribe?subscription_package=*
// @include        https://myprgenie.com/payment/subscribe?subscription_package=*
// ==/UserScript====


document.getElementById("payment_detail_user_first_name").value = "testing";
document.getElementById("payment_detail_user_last_name").value = "testing";
document.getElementById("payment_detail_email").value = "abc@abc.com";
document.getElementById("payment_detail_first_name").value = "testing";
document.getElementById("payment_detail_last_name").value = "testing";
document.getElementById("payment_detail_credit_card_number").value = "4111111111111111";
document.getElementById("payment_detail_verification_code").value = "4234";
document.getElementById("payment_detail_expiration_date_2i").selectedIndex = 2;
document.getElementById("payment_detail_expiration_date_1i").selectedIndex = 2;
document.getElementById("address_address_1").value = "test address";
document.getElementById("address_city").value = "asdasdsadas";
document.getElementById("address_state_province").value = "asdasdsadas";
document.getElementById("address_zip_postal_code").value = "asdasdsadas";
document.getElementById("address_country").selectedIndex = 2;
document.getElementById("payment_detail_telephone_no").value = "11-1112112121";
