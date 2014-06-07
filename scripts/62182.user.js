// ==UserScript==
// @name           woot!  Fill Order Screen (CID/PayPal/Gift/Coupon)
// @namespace      vpoet
// @description    Fills CID or PayPal information, as well as coupons or gift certificates, on order screen for *.woot.com.
// @include        https://*.woot.com/Member/Order.aspx
// ==/UserScript==
// uses njkrut's auto select 3 boc as a template

var securityBox = document.getElementById('ctl00_ctl00_ContentPlaceHolderMainContent_ContentPlaceHolderSecondaryContent_SecurityCodeTextBox');
var passwordBox = document.getElementById('ctl00_ctl00_ContentPlaceHolderMainContent_ContentPlaceHolderSecondaryContent_WootPasswordTextBox');
var giftcouponBox = document.getElementById('ctl00_ctl00_ContentPlaceHolderMainContent_ContentPlaceHolderSecondaryContent_DiscountTextBox');

// Put your CID code here for CC orders:
var myCode = '';

// Put your woot! password here for PayPal orders (I know, this sucks being in plain text):
var myPassword = '';

// Put your woot! coupon or gift certificate here:
var myGiftCoupon = '';

if (securityBox && myCode != '')
securityBox.value = myCode; 

if (passwordBox && myPassword != '')
passwordBox.value = myPassword; 

if (giftcouponBox && myGiftCoupon != '')
giftcouponBox.value = myGiftCoupon;