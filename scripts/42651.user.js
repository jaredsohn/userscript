// ==UserScript==
// @name           tmp
// @namespace      speil
// @description    wooot
// @include        https://*.woot.com/Member/Order.aspx
// ==/UserScript==
// uses njkrut's auto select 3 boc as a template
var doMyPostBack = function()
{
	if(theForm && buyitbutton)
	{
		eventTarget.value = 'ctl00$ctl00$ContentPlaceHolderMainContent$ContentPlaceHolderSecondaryContent$BuyButton';
		eventArgument.value = '';
		theForm.submit();
	} else {
		alert('Could Not Perform');
	}
}

var securityBox = document.getElementById('ctl00_ctl00_ContentPlaceHolderMainContent_ContentPlaceHolderSecondaryContent_SecurityCodeTextBox');
var passwordBox = document.getElementById('ctl00_ctl00_ContentPlaceHolderMainContent_ContentPlaceHolderSecondaryContent_WootPasswordTextBox');
var giftcouponBox = document.getElementById('ctl00_ctl00_ContentPlaceHolderMainContent_ContentPlaceHolderSecondaryContent_DiscountTextBox');


//var pageItem = document.getElementById('TitleHeader');
var total = document.getElementById('ctl00_ctl00_ContentPlaceHolderMainContent_ContentPlaceHolderPrimaryContent_ShoppingCartControl_TotalTableCell');
//var item = document.getElementById('ctl00_ctl00_ContentPlaceHolderMainContent_ContentPlaceHolderPrimaryContent_ShoppingCartControl_SaleTitleLabel');

var eventTarget = document.getElementById('__EVENTTARGET');
var eventArgument = document.getElementById('__EVENTARGUMENT');
var buyitbutton = document.getElementById('ctl00_ctl00_ContentPlaceHolderMainContent_ContentPlaceHolderSecondaryContent_BuyButton');
var theForm = document.getElementById('aspnetForm');

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

//CLICKS THE BUY 8.00 ITEM

//IMPORTANT DOES NOT CHECK FOR BOC ONLY FOR PRICE TO BE 8.00!!!!! COULD BUY UNWANTED $8 items if buy page is open
if (total.innerHTML.substring(0, 5) == "$8.00" && buyitbutton)
doMyPostBack();

